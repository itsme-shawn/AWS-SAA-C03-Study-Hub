# AWS SAA-C03 Study Hub

AWS Solutions Architect Associate (SAA-C03) 시험 준비를 위한 강의 노트 & 퀴즈 웹 앱입니다.

**[🌐 배포 사이트 바로가기](https://aws-saa-c03-study-hub.vercel.app/)**

---

## 개요

- Udemy — [Ultimate AWS Certified Solutions Architect Associate](https://www.udemy.com/course/best-aws-certified-solutions-architect-associate/) (Stephane Maarek) 강의 기반
- 31개 섹션 강의 노트 + 섹션별 연습 문제
- Vite + React + TypeScript 웹 뷰어로 열람 가능

---

## 저장소 구조

```
aws-saa-c03-study-hub/
├── notes/               # 섹션별 강의 노트 (Markdown)
│   ├── 01-getting-started/
│   ├── 02-iam/
│   └── ...              # 31개 섹션
├── practice/            # 연습 문제
│   ├── reviews/         # 섹션별 Q&A
│   ├── all-questions.md # 전체 문제 통합
│   └── questions-only.md
└── web/                 # 웹 뷰어 앱
    ├── scripts/
    │   └── generate-data.mjs   # 노트 → JSON 변환 스크립트
    └── src/
```

---

## 웹 동작 구조

```
notes/**/*.md
      ↓
generate-data.mjs   ← notes/ 디렉토리를 읽어 파싱
      ↓
web/src/data/content.json   ← 섹션 노트 + 퀴즈 데이터 통합
      ↓
Vite + React 앱   ← content.json을 기반으로 UI 렌더링
```

각 섹션의 `notes/<section>/README.md` 안에 `## Practice Questions` 섹션이 있으면 자동으로 퀴즈로 파싱됩니다.

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 강의 노트 열람 | 31개 섹션 Markdown 노트 |
| 섹션 퀴즈 | 각 섹션 연습 문제 풀기 |
| Mock Exam | 전체 섹션 랜덤 시험 모드 |
| 오답 노트 | 틀린 문제 자동 저장 |
| 북마크 | 중요 문제 즐겨찾기 |
| 검색 | 노트/문제 전문 검색 |
| 다크모드 | 라이트/다크 테마 전환 |

---

## 로컬 실행

```bash
cd web
npm install
npm run dev
```

---

## 시험 도메인 가중치 (SAA-C03)

| Domain | Weight |
|--------|--------|
| Design Resilient Architectures | 26% |
| Design High-Performing Architectures | 24% |
| Design Secure Architectures | 30% |
| Design Cost-Optimized Architectures | 20% |
