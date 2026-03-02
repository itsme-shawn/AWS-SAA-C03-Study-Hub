import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NOTES_DIR = path.resolve(__dirname, '../../notes');
const DUMPS_DIR = path.resolve(__dirname, '../../practice/dumps');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/content.json');
const NOTE_LINKS_FILE = path.resolve(__dirname, '../src/data/note-links.json');

const SECTION_TITLES = {
  '01-getting-started': 'Getting Started with AWS',
  '02-iam': 'IAM (Identity & Access Management)',
  '03-ec2-basics': 'EC2 Basics',
  '04-ec2-associate': 'EC2 Associate',
  '05-ec2-instance-storage': 'EC2 Instance Storage',
  '06-high-availability-scalability': 'High Availability & Scalability',
  '07-rds-aurora-elasticache': 'RDS, Aurora & ElastiCache',
  '08-route-53': 'Route 53',
  '09-classic-solutions-architecture': 'Classic Solutions Architecture',
  '10-amazon-s3': 'Amazon S3',
  '11-s3-advanced': 'S3 Advanced',
  '12-s3-security': 'S3 Security',
  '13-cloudfront-global-accelerator': 'CloudFront & Global Accelerator',
  '14-storage-extras': 'Storage Extras',
  '15-integration-messaging': 'Integration & Messaging',
  '16-containers': 'Containers on AWS',
  '17-serverless-overview': 'Serverless Overview',
  '18-serverless-architectures': 'Serverless Architectures',
  '19-databases': 'Databases in AWS',
  '20-data-analytics': 'Data & Analytics',
  '21-machine-learning': 'Machine Learning',
  '22-monitoring-audit-performance': 'Monitoring, Audit & Performance',
  '23-advanced-identity': 'Advanced Identity',
  '24-security-encryption': 'Security & Encryption',
  '25-vpc': 'Amazon VPC',
  '26-disaster-recovery-migrations': 'Disaster Recovery & Migrations',
  '27-more-solutions-architecture': 'More Solutions Architecture',
  '28-other-services': 'Other Services',
  '29-white-papers-architectures': 'White Papers & Architectures',
  '30-exam-preparation': 'Exam Preparation',
};

const SECTION_GROUPS = {
  'Foundations':             ['01-getting-started', '02-iam'],
  'EC2':                     ['03-ec2-basics', '04-ec2-associate', '05-ec2-instance-storage'],
  'Scalability & Database':  ['06-high-availability-scalability', '07-rds-aurora-elasticache'],
  'DNS & Architecture':      ['08-route-53', '09-classic-solutions-architecture'],
  'Storage':                 ['10-amazon-s3', '11-s3-advanced', '12-s3-security', '13-cloudfront-global-accelerator', '14-storage-extras'],
  'Integration & Serverless':['15-integration-messaging', '16-containers', '17-serverless-overview', '18-serverless-architectures'],
  'Databases & Analytics':   ['19-databases', '20-data-analytics', '21-machine-learning'],
  'Security & Monitoring':   ['22-monitoring-audit-performance', '23-advanced-identity', '24-security-encryption'],
  'VPC & Migration':         ['25-vpc', '26-disaster-recovery-migrations', '27-more-solutions-architecture'],
  'Exam Prep':               ['28-other-services', '29-white-papers-architectures', '30-exam-preparation'],
};

function parseQuestions(text) {
  const questions = [];
  const qRegex = /### Q(\d+)\.\s*([\s\S]*?)(?=### Q\d+\.|$)/g;
  let match;

  while ((match = qRegex.exec(text)) !== null) {
    const num = parseInt(match[1]);
    const block = match[2].trim();

    // Extract question text (before Options)
    const qTextMatch = block.match(/^([\s\S]*?)(?=\*\*Options:\*\*|\n- [A-Z]\))/);
    const questionText = qTextMatch ? qTextMatch[1].trim() : '';

    // Extract options
    const options = [];
    const optRegex = /- ([A-Z])\)\s*(.*)/g;
    let optMatch;
    while ((optMatch = optRegex.exec(block)) !== null) {
      options.push({ label: optMatch[1], text: optMatch[2].trim() });
    }

    // Extract answer
    const answerMatch = block.match(/\*\*Answer:\*\*\s*([^\n]+)/);
    let answer = '';
    if (answerMatch) {
      const raw = answerMatch[1].trim().toUpperCase();
      const labels = [];
      const tokenRegex = /(?:^|[^A-Z])([A-Z])(?=[^A-Z]|$)/g;
      let token;
      while ((token = tokenRegex.exec(raw)) !== null) {
        labels.push(token[1]);
      }
      if (labels.length === 0 && /^[A-Z]+$/.test(raw)) {
        labels.push(...raw.split(''));
      }
      answer = [...new Set(labels)].sort().join(',');
    }

    // Extract explanation
    const explMatch = block.match(/\*\*해설:\*\*\s*([\s\S]*?)(?=\*\*핵심 개념:\*\*|$)/);
    const explanation = explMatch ? explMatch[1].trim() : '';

    // Extract key concept
    const conceptMatch = block.match(/\*\*핵심 개념:\*\*\s*([^\n]*)/);
    const keyConcept = conceptMatch ? conceptMatch[1].trim() : '';

    // Extract note links: **관련 노트:** [label](url), [label](url)
    const noteLinksMatch = block.match(/\*\*관련 노트:\*\*\s*([^\n]+)/);
    let noteLinks;
    if (noteLinksMatch) {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const links = [];
      let lm;
      while ((lm = linkRegex.exec(noteLinksMatch[1])) !== null) {
        links.push({ label: lm[1], url: lm[2] });
      }
      if (links.length > 0) noteLinks = links;
    }

    if (questionText && options.length > 0 && answer) {
      const q = { id: `q${num}`, number: num, text: questionText, options, answer, explanation, keyConcept };
      if (noteLinks) q.noteLinks = noteLinks;
      questions.push(q);
    }
  }

  return questions;
}

function processSection(dirName) {
  const filePath = path.join(NOTES_DIR, dirName, 'README.md');
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const num = parseInt(dirName.split('-')[0]);

  // Split at Practice Questions
  const splitIdx = content.indexOf('## Practice Questions');
  let noteContent, questionsRaw;

  if (splitIdx !== -1) {
    noteContent = content.substring(0, splitIdx).trim();
    questionsRaw = content.substring(splitIdx);
  } else {
    noteContent = content.trim();
    questionsRaw = '';
  }

  const questions = parseQuestions(questionsRaw);

  return {
    id: dirName,
    number: num,
    title: SECTION_TITLES[dirName] || dirName,
    noteContent,
    questions,
  };
}

function processDump(fileName) {
  const filePath = path.join(DUMPS_DIR, fileName);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, 'utf-8');
  const questions = parseQuestions(content);
  if (questions.length === 0) return null;

  const id = fileName.replace(/\.md$/i, '');
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const sourceMatch = content.match(/^>\s*출처:\s*(.+)$/m);
  const sourceUrlMatch = content.match(/^>\s*(https?:\/\/\S+)$/m);

  return {
    id,
    title: titleMatch ? titleMatch[1].trim() : id,
    source: sourceUrlMatch ? sourceUrlMatch[1].trim() : (sourceMatch ? sourceMatch[1].trim() : ''),
    questions,
  };
}

function loadSections() {
  const sections = [];
  if (!fs.existsSync(NOTES_DIR)) return sections;

  const dirs = fs.readdirSync(NOTES_DIR).filter(d => {
    return fs.statSync(path.join(NOTES_DIR, d)).isDirectory() && /^\d{2}-/.test(d);
  }).sort();

  for (const dir of dirs) {
    const section = processSection(dir);
    if (section) sections.push(section);
  }

  return sections;
}

function loadDumps() {
  const dumps = [];
  if (!fs.existsSync(DUMPS_DIR)) return dumps;

  const files = fs.readdirSync(DUMPS_DIR)
    .filter(file => file.toLowerCase().endsWith('.md'))
    .sort();

  for (const fileName of files) {
    const dump = processDump(fileName);
    if (dump) dumps.push(dump);
  }

  return dumps;
}

function loadNoteLinks() {
  if (!fs.existsSync(NOTE_LINKS_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(NOTE_LINKS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function mergeNoteLinks(dumps, noteLinks) {
  if (!noteLinks || Object.keys(noteLinks).length === 0) return dumps;
  return dumps.map(dump => {
    const dumpLinks = noteLinks[dump.id];
    if (!dumpLinks) return dump;
    return {
      ...dump,
      questions: dump.questions.map(q => {
        const links = dumpLinks[q.id];
        if (!links || links.length === 0) return q;
        return { ...q, noteLinks: links };
      }),
    };
  });
}

function buildOutput() {
  const sections = loadSections();
  const noteLinks = loadNoteLinks();
  const rawDumps = loadDumps();
  const dumps = mergeNoteLinks(rawDumps, noteLinks);
  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const totalDumpQuestions = dumps.reduce((sum, d) => sum + d.questions.length, 0);

  return {
    sections,
    dumps,
    groups: SECTION_GROUPS,
    totalQuestions,
    totalDumpQuestions,
    generatedAt: new Date().toISOString(),
  };
}

function writeOutput() {
  const output = buildOutput();
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  return output;
}

const initial = writeOutput();
console.log(`Generated ${initial.sections.length} sections (${initial.totalQuestions} questions)`);
console.log(`Generated ${initial.dumps.length} dumps (${initial.totalDumpQuestions} questions)`);
console.log(`Output: ${OUTPUT_FILE}`);

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('\nWatching for changes in notes/ and practice/dumps/ ...');

  let debounceTimer = null;

  const rebuild = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      try {
        const next = writeOutput();
        console.log(
          `[${new Date().toLocaleTimeString()}] Regenerated: `
          + `${next.sections.length} sections (${next.totalQuestions} questions), `
          + `${next.dumps.length} dumps (${next.totalDumpQuestions} questions)`
        );
      } catch (err) {
        console.error('Rebuild error:', err.message);
      }
    }, 300);
  };

  const watchTargets = [NOTES_DIR, DUMPS_DIR].filter(target => fs.existsSync(target));

  for (const target of watchTargets) {
    fs.watch(target, { recursive: true }, (event, filename) => {
      if (filename && filename.toLowerCase().endsWith('.md')) {
        console.log(`[${new Date().toLocaleTimeString()}] Changed: ${filename}`);
        rebuild();
      }
    });
  }
}
