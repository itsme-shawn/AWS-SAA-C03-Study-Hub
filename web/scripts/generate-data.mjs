import fs from 'fs';
import path from 'path';

const NOTES_DIR = path.resolve(import.meta.dirname, '../../notes');
const OUTPUT_FILE = path.resolve(import.meta.dirname, '../src/data/content.json');

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
  'Foundations': ['01-getting-started', '02-iam'],
  'Compute': ['03-ec2-basics', '04-ec2-associate', '05-ec2-instance-storage'],
  'Load Balancing & Scaling': ['06-high-availability-scalability'],
  'Databases': ['07-rds-aurora-elasticache', '19-databases'],
  'DNS & Networking': ['08-route-53', '25-vpc'],
  'Architecture': ['09-classic-solutions-architecture', '27-more-solutions-architecture'],
  'Storage': ['10-amazon-s3', '11-s3-advanced', '12-s3-security', '14-storage-extras'],
  'Content Delivery': ['13-cloudfront-global-accelerator'],
  'Integration': ['15-integration-messaging'],
  'Containers & Serverless': ['16-containers', '17-serverless-overview', '18-serverless-architectures'],
  'Analytics & ML': ['20-data-analytics', '21-machine-learning'],
  'Monitoring & Security': ['22-monitoring-audit-performance', '23-advanced-identity', '24-security-encryption'],
  'Migration & DR': ['26-disaster-recovery-migrations'],
  'Exam Prep': ['28-other-services', '29-white-papers-architectures', '30-exam-preparation'],
};

function parseQuestions(text) {
  const questions = [];
  const qRegex = /### Q(\d+)\.\s*([\s\S]*?)(?=### Q\d+\.|$)/g;
  let match;

  while ((match = qRegex.exec(text)) !== null) {
    const num = parseInt(match[1]);
    const block = match[2].trim();

    // Extract question text (before Options)
    const qTextMatch = block.match(/^([\s\S]*?)(?=\*\*Options:\*\*|\n- [A-D]\))/);
    const questionText = qTextMatch ? qTextMatch[1].trim() : '';

    // Extract options
    const options = [];
    const optRegex = /- ([A-D])\)\s*(.*)/g;
    let optMatch;
    while ((optMatch = optRegex.exec(block)) !== null) {
      options.push({ label: optMatch[1], text: optMatch[2].trim() });
    }

    // Extract answer
    const answerMatch = block.match(/\*\*Answer:\*\*\s*([A-D])/);
    const answer = answerMatch ? answerMatch[1] : '';

    // Extract explanation
    const explMatch = block.match(/\*\*해설:\*\*\s*([\s\S]*?)(?=\*\*핵심 개념:\*\*|$)/);
    const explanation = explMatch ? explMatch[1].trim() : '';

    // Extract key concept
    const conceptMatch = block.match(/\*\*핵심 개념:\*\*\s*(.*)/);
    const keyConcept = conceptMatch ? conceptMatch[1].trim() : '';

    if (questionText && options.length > 0 && answer) {
      questions.push({
        id: `q${num}`,
        number: num,
        text: questionText,
        options,
        answer,
        explanation,
        keyConcept,
      });
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

// Main
const sections = [];
const dirs = fs.readdirSync(NOTES_DIR).filter(d => {
  return fs.statSync(path.join(NOTES_DIR, d)).isDirectory() && /^\d{2}-/.test(d);
}).sort();

for (const dir of dirs) {
  const section = processSection(dir);
  if (section) {
    sections.push(section);
  }
}

const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);

const output = {
  sections,
  groups: SECTION_GROUPS,
  totalQuestions,
  generatedAt: new Date().toISOString(),
};

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

console.log(`Generated ${sections.length} sections with ${totalQuestions} questions`);
console.log(`Output: ${OUTPUT_FILE}`);

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('\nWatching for changes in notes/...');

  let debounceTimer = null;

  const rebuild = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      try {
        const newSections = [];
        const newDirs = fs.readdirSync(NOTES_DIR).filter(d => {
          return fs.statSync(path.join(NOTES_DIR, d)).isDirectory() && /^\d{2}-/.test(d);
        }).sort();

        for (const dir of newDirs) {
          const section = processSection(dir);
          if (section) newSections.push(section);
        }

        const newTotal = newSections.reduce((sum, s) => sum + s.questions.length, 0);
        const newOutput = {
          sections: newSections,
          groups: SECTION_GROUPS,
          totalQuestions: newTotal,
          generatedAt: new Date().toISOString(),
        };

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newOutput, null, 2));
        console.log(`[${new Date().toLocaleTimeString()}] Regenerated: ${newSections.length} sections, ${newTotal} questions`);
      } catch (err) {
        console.error('Rebuild error:', err.message);
      }
    }, 300);
  };

  fs.watch(NOTES_DIR, { recursive: true }, (event, filename) => {
    if (filename && filename.endsWith('.md')) {
      console.log(`[${new Date().toLocaleTimeString()}] Changed: ${filename}`);
      rebuild();
    }
  });
}
