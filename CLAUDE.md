# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is an AWS Solutions Architect Associate (SAA-C03) exam preparation workspace. Reference course: [Udemy — Ultimate AWS Certified Solutions Architect Associate](https://www.udemy.com/course/best-aws-certified-solutions-architect-associate/) by Stephane Maarek.

You are an exam preparation assistant. Your two primary roles are:

1. **Lecture note creation** — Summarize and organize course content into structured Markdown notes.
2. **Practice question assistant** — Help work through dump/practice exam questions, explain answers, and reinforce understanding.

## Repository Structure (Conventions)

```
aws-saa-03/
├── notes/           # Lecture notes organized by domain/section
│   ├── 01-iam/
│   ├── 02-ec2/
│   └── ...
├── practice/        # Practice exam questions and answer explanations
│   ├── dumps/       # Raw dump question sets (.md or .txt)
│   └── reviews/     # Per-topic Q&A review sessions
└── CLAUDE.md
```

Create directories as needed when generating new notes or practice files.

## Note-Taking Format

Lecture notes should follow this structure:

```markdown
# [Service Name]

## Overview
One-sentence summary of what the service does and its exam relevance.

## Key Concepts
- Bullet points of core concepts

## Important for Exam
- Gotchas, limits, comparisons frequently tested

## Cheat Sheet
| Feature | Detail |
|---------|--------|
```

## Practice Question Format

When working through dump questions:

```markdown
### Q[N]. [Question text]

**Options:**
- A) ...
- B) ...
- C) ...
- D) ...

**Answer:** [Letter]

**Explanation:** Why the correct answer is right, and why distractors are wrong.

**Key concept:** [Service/feature this tests]
```

## Exam Domain Weights (SAA-C03)

| Domain | Weight |
|--------|--------|
| Design Resilient Architectures | 26% |
| Design High-Performing Architectures | 24% |
| Design Secure Architectures | 30% |
| Design Cost-Optimized Architectures | 20% |

## Key Services to Master

High-frequency exam topics: EC2, S3, RDS/Aurora, VPC, IAM, Lambda, ELB/ASG, CloudFront, Route 53, SQS/SNS, DynamoDB, ECS/EKS, CloudWatch, KMS, Direct Connect/VPN.

## Assistant Behavior

- When asked to create notes for a section, produce a complete Markdown file saved under `notes/`.
- When working through practice questions, explain both the correct answer and why each wrong answer is incorrect.
- Always tie explanations back to the SAA-C03 exam objectives.
- Prefer concise, scannable notes with tables and bullet points over dense paragraphs.
- When comparing services (e.g., SQS vs SNS vs Kinesis), use comparison tables.

## 프로젝트 스킬 (Slash Commands)

이 프로젝트에는 자주 쓰는 작업을 자동화하는 커스텀 스킬이 있습니다.

| 스킬 | 트리거 예시 | 설명 |
|------|------------|------|
| `/aws-saa:note` | "EC2 노트 써줘", "섹션 25 정리해줘" | 강의 노트 생성/업데이트 |
| `/aws-saa:dump` | "이 덤프 해설 써줘", "Q5 해설 추가해줘" | 덤프 문제 해설 작성/보완 |
| `/aws-saa:note-links` | "노트 링크 생성해줘", "noteLinks 자동화" | noteLinks 자동화 워크플로우 |
| `/aws-saa:web` | "웹앱 기능 추가해줘", "content.json 재생성해줘" | 웹앱 개발/유지보수 |
| `/gitcommit` | "커밋해줘", "변경사항 커밋" | Git 커밋 계획 수립 및 실행 |

스킬 상세 내용: `.claude/skills/[스킬명]/SKILL.md`

## 웹앱 개요

`web/` 디렉토리에 React 학습 웹앱이 있습니다.

- **스택**: React 19 + Vite + Tailwind CSS 4
- **데이터**: `web/scripts/generate-data.mjs` → `web/src/data/content.json` 생성
- **노트 또는 덤프 수정 후**: `cd web && node scripts/generate-data.mjs` 실행 필요
- **개발 서버**: `cd web && npm run dev`

### NotePopup 기능
마크다운 해설 내 `/section/:id#heading` 링크를 클릭하면 해당 노트 섹션이 팝업으로 표시됩니다.
페이지 이동 없이 관련 개념을 빠르게 확인할 수 있습니다.

### noteLinks 자동화 (진행 중)
덤프 719문제 해설에 관련 강의 노트 링크를 자동으로 붙이는 파이프라인 (B방식).
- `content.json`의 question 객체에 `noteLinks` 필드로 별도 저장
- Step 1: `web/scripts/generate-notes-index.mjs` (미완성)
- Step 2: `web/scripts/generate-note-links.mjs` (미완성)
- Step 3: `QuizEngine.tsx` noteLinks 칩 UI (미완성)
