/**
 * generate-notes-index.mjs
 * notes/ 디렉토리의 README.md에서 heading을 추출해 notes-index.json 생성
 * 출력: web/src/data/notes-index.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NOTES_DIR = path.resolve(__dirname, '../../notes');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/notes-index.json');

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

// toc.ts의 generateHeadingId와 동일한 로직
function generateHeadingId(text) {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, '')
    .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();
}

function extractHeadings(content, sectionId) {
  const lines = content.split('\n');
  const items = [];
  const idCounts = {};

  // Practice Questions 이후는 제외 (노트 본문만)
  const practiceIdx = content.indexOf('## Practice Questions');
  const noteLines = practiceIdx !== -1
    ? content.substring(0, practiceIdx).split('\n')
    : lines;

  for (const line of noteLines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/); // h2, h3만
    if (!match) continue;

    const level = match[1].length;
    const rawText = match[2];
    const text = rawText.replace(/[`*_~[\]()]/g, '').trim();
    const baseId = generateHeadingId(rawText);
    if (!baseId) continue;

    const count = idCounts[baseId] ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count}`;
    idCounts[baseId] = count + 1;

    items.push({
      sectionId,
      sectionTitle: SECTION_TITLES[sectionId] || sectionId,
      headingId: id,
      text,
      level,
    });
  }

  return items;
}

function buildIndex() {
  if (!fs.existsSync(NOTES_DIR)) {
    console.error(`Notes directory not found: ${NOTES_DIR}`);
    process.exit(1);
  }

  const dirs = fs.readdirSync(NOTES_DIR)
    .filter(d => fs.statSync(path.join(NOTES_DIR, d)).isDirectory() && /^\d{2}-/.test(d))
    .sort();

  const index = [];

  for (const dir of dirs) {
    const filePath = path.join(NOTES_DIR, dir, 'README.md');
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf-8');
    const headings = extractHeadings(content, dir);
    index.push(...headings);
  }

  return index;
}

const index = buildIndex();
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));

console.log(`Generated notes-index.json: ${index.length} headings from ${new Set(index.map(i => i.sectionId)).size} sections`);
console.log(`Output: ${OUTPUT_FILE}`);
