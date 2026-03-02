/**
 * generate-note-links.mjs
 * dump 문제 해설과 notes-index의 heading을 매핑.
 * 결과: web/src/data/note-links.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTES_INDEX_FILE = path.resolve(__dirname, '../src/data/notes-index.json');
const CONTENT_FILE = path.resolve(__dirname, '../src/data/content.json');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/note-links.json');

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY 환경변수가 필요합니다.');
  console.error('  ANTHROPIC_API_KEY=sk-... node scripts/generate-note-links.mjs');
  process.exit(1);
}

// CLI args
const args = process.argv.slice(2);
const targetDump = args[args.indexOf('--dump') + 1] || null;
const resumeMode = args.includes('--resume');
const dryRun = args.includes('--dry-run');

// Load index
const notesIndex = JSON.parse(fs.readFileSync(NOTES_INDEX_FILE, 'utf-8'));
const content = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));

// Load existing output (for resume mode)
let existing = {};
if (fs.existsSync(OUTPUT_FILE)) {
  existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
}

// Build compact index text for the prompt (to save tokens)
// Format: "sectionId#headingId | Section Title > Heading Text"
const indexLines = notesIndex.map(h =>
  `${h.sectionId}#${h.headingId} | ${h.sectionTitle} > ${h.text}`
);
const indexText = indexLines.join('\n');

async function callClaude(questionText, explanation, keyConcept) {
  const prompt = `You are an AWS exam study assistant. Given a practice question's explanation and key concept, identify the 1-3 most relevant note sections from the index below.

## Notes Index
Each line: "sectionId#headingId | Section Title > Heading Text"
${indexText}

## Question Info
Key Concept: ${keyConcept || '(none)'}
Explanation (excerpt): ${explanation.substring(0, 600)}

## Task
Return a JSON array of 1-3 objects with the most relevant note sections.
Each object must have:
- "label": short display text (the Heading Text or a shorter version, in English or Korean as-is)
- "sectionId": the sectionId part before #
- "headingId": the headingId part after #

Rules:
- Pick sections that are directly relevant to understanding this question
- Return [] if no notes are clearly relevant
- Never invent sectionIds or headingIds not in the index
- Return ONLY the JSON array, no explanation

Example output:
[{"label":"NAT Gateway","sectionId":"25-vpc","headingId":"nat-gateway"},{"label":"Internet Gateway","sectionId":"25-vpc","headingId":"internet-gateway-igw"}]`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const text = data.content[0]?.text?.trim() || '[]';

  // Parse JSON from response
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) return [];

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    // Validate: only keep entries with valid sectionId#headingId from index
    const validSet = new Set(notesIndex.map(h => `${h.sectionId}#${h.headingId}`));
    return parsed
      .filter(item => item.sectionId && item.headingId && validSet.has(`${item.sectionId}#${item.headingId}`))
      .map(item => ({
        label: item.label,
        url: `/section/${item.sectionId}#${item.headingId}`,
      }));
  } catch {
    return [];
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processDump(dump) {
  const dumpId = dump.id;
  const questions = dump.questions;

  if (!existing[dumpId]) existing[dumpId] = {};

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const q of questions) {
    // Resume: skip already processed
    if (resumeMode && existing[dumpId][q.id] !== undefined) {
      skipped++;
      continue;
    }

    if (!q.explanation && !q.keyConcept) {
      existing[dumpId][q.id] = [];
      skipped++;
      continue;
    }

    if (dryRun) {
      console.log(`  [dry-run] ${dumpId}/${q.id}: "${q.keyConcept}"`);
      processed++;
      continue;
    }

    try {
      const links = await callClaude(q.text, q.explanation, q.keyConcept);
      existing[dumpId][q.id] = links;
      processed++;

      if (processed % 10 === 0) {
        // Save progress every 10 questions
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existing, null, 2));
        process.stdout.write(`\r  ${dumpId}: ${processed + skipped}/${questions.length} (${processed} new, ${errors} errors)`);
      }

      // Rate limit: ~3 req/sec for Haiku
      await sleep(350);
    } catch (err) {
      console.error(`\n  Error on ${dumpId}/${q.id}: ${err.message}`);
      existing[dumpId][q.id] = [];
      errors++;
      await sleep(1000);
    }
  }

  // Final save for this dump
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existing, null, 2));
  console.log(`\n  Done ${dumpId}: ${processed} new, ${skipped} skipped, ${errors} errors`);
}

async function main() {
  console.log(`Notes index: ${notesIndex.length} headings`);
  console.log(`Mode: ${resumeMode ? 'resume' : 'fresh'}${dryRun ? ' (dry-run)' : ''}`);
  if (targetDump) console.log(`Target dump: ${targetDump}`);
  console.log('');

  const dumps = targetDump
    ? content.dumps.filter(d => d.id === targetDump)
    : content.dumps;

  if (dumps.length === 0) {
    console.error(`No dump found${targetDump ? ` with id "${targetDump}"` : ''}`);
    process.exit(1);
  }

  const totalQuestions = dumps.reduce((s, d) => s + d.questions.length, 0);
  console.log(`Processing ${dumps.length} dumps, ${totalQuestions} questions total`);
  if (!dryRun) {
    const estimatedSeconds = totalQuestions * 0.4;
    console.log(`Estimated time: ~${Math.ceil(estimatedSeconds / 60)} minutes`);
  }
  console.log('');

  for (const dump of dumps) {
    console.log(`Processing dump: ${dump.id} (${dump.questions.length} questions)`);
    await processDump(dump);
  }

  console.log(`\nOutput saved: ${OUTPUT_FILE}`);

  // Summary
  let total = 0, withLinks = 0;
  for (const dumpId of Object.keys(existing)) {
    for (const qId of Object.keys(existing[dumpId])) {
      total++;
      if (existing[dumpId][qId].length > 0) withLinks++;
    }
  }
  console.log(`Summary: ${withLinks}/${total} questions have note links (${Math.round(withLinks/total*100)}%)`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
