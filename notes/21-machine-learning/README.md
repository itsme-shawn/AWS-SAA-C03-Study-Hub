# Section 21: Machine Learning

## 개요
AWS는 다양한 관리형 ML 서비스를 제공하며, SAA-C03 시험에서는 각 서비스의 목적과 사용 사례를 정확히 구분하는 것이 중요하다. 직접 ML 모델을 구축하는 것이 아니라, 적절한 AWS ML 서비스를 선택하는 능력을 테스트한다.

## 핵심 개념

```text
┌─────────────────────────────────────────────────────────────────────┐
│                  AWS ML 서비스 선택 가이드                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  입력 데이터 유형은?                                                  │
│       │                                                             │
│       ├── 이미지/비디오 ──────────────▶ Rekognition                  │
│       │    (얼굴, 객체, 콘텐츠 검열)     + A2I (수동 리뷰)            │
│       │                                                             │
│       ├── 음성 ──▶ 텍스트로 변환? ────▶ Transcribe                   │
│       │                                                             │
│       ├── 텍스트 ──┬▶ 음성으로 변환? ──▶ Polly                       │
│       │            ├▶ 다른 언어로? ────▶ Translate                   │
│       │            ├▶ 감정/핵심 분석? ─▶ Comprehend                  │
│       │            └▶ 의료 텍스트? ───▶ Comprehend Medical           │
│       │                                                             │
│       ├── 문서/스캔 이미지 ──────────▶ Textract                      │
│       │    (폼, 테이블, 필기 추출)                                    │
│       │                                                             │
│       ├── 대화형 인터페이스 ─────────▶ Lex (챗봇)                     │
│       │    + 컨택 센터                  + Connect (전화)              │
│       │                                                             │
│       ├── 문서에서 답변 검색 ────────▶ Kendra                        │
│       │                                                             │
│       ├── 개인화 추천 ──────────────▶ Personalize                    │
│       │                                                             │
│       └── 커스텀 ML 모델 구축 ──────▶ SageMaker                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Amazon Rekognition
- ML을 사용하여 이미지/비디오에서 **객체, 사람, 텍스트, 장면** 인식
- **얼굴 분석**: 성별, 나이 범위, 감정 등
- **얼굴 검색/인증**: 익숙한 얼굴 DB 생성, 셀러브리티 인식
- 사용 사례: 라벨링, 텍스트 탐지, 얼굴 탐지/분석, 셀러브리티 인식, 경로 추적 (스포츠 분석)

#### Rekognition Content Moderation
- 부적절/불쾌한 콘텐츠 탐지 (이미지/비디오)
- **최소 신뢰도 임계값** 설정으로 플래그 기준 조정
- **Amazon Augmented AI (A2I)**로 수동 리뷰 플래그 지정
- 규제 준수 지원

### Amazon Transcribe
- **음성을 텍스트로** 자동 변환 (ASR: Automatic Speech Recognition, 자동 음성 인식 기반)
- **PII 자동 제거** (Redaction: 전화통화 녹음 속 주민번호, 신용카드 번호 같은 개인정보를 자동으로 가림)
- 다국어 오디오 **자동 언어 식별**
- 사용 사례: 고객 서비스 통화 전사, 자동 자막, 미디어 메타데이터 생성

### Amazon Polly
- **텍스트를 음성으로** 변환 (딥 러닝 기반) — "글을 읽어주는 서비스"
- **Pronunciation Lexicons**: 단어 발음 커스터마이징 (예: "AWS"를 "에이더블유에스"가 아닌 "아마존웹서비스"로 읽도록 설정)
- **SSML (Speech Synthesis Markup Language, 음성 합성 마크업 언어)**: 강조, 음성 발음, 속삭임, 뉴스캐스터 스타일 등 고급 커스터마이징

### Amazon Translate
- 자연스럽고 정확한 **언어 번역** 서비스
- 웹사이트/애플리케이션 현지화, 대량 텍스트 번역

### Amazon Lex & Connect

```text
┌─────────────────────────────────────────────────────────────┐
│            Amazon Lex + Connect 통합 아키텍처                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────┐     ┌───────────┐     ┌──────────┐               │
│  │ 고객 │────▶│  Amazon   │────▶│  Amazon  │               │
│  │ 전화 │     │  Connect  │     │  Lex     │               │
│  └──────┘     │ (컨택센터) │     │ (챗봇)   │               │
│               └───────────┘     └────┬─────┘               │
│                                      │                      │
│                               NLU (의도 인식)                │
│                                      │                      │
│                                      ▼                      │
│                                ┌──────────┐                 │
│                                │  Lambda  │                 │
│                                │ (비즈니스 │                 │
│                                │  로직)   │                 │
│                                └────┬─────┘                 │
│                                     │                       │
│                                     ▼                       │
│                               ┌──────────┐                  │
│                               │  CRM     │                  │
│                               │  시스템   │                  │
│                               └──────────┘                  │
│                                                             │
│  기존 컨택 센터 대비 80% 비용 절감                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- **Amazon Lex** (Alexa와 동일 기술):
  - ASR (음성->텍스트) + NLU (Natural Language Understanding, 자연어 이해 — 사용자의 말에서 "의도"를 파악)
  - **챗봇, 콜센터 봇** 구축
- **Amazon Connect**:
  - 클라우드 기반 **가상 컨택 센터**
  - 전화 수신, 컨택 플로우 생성
  - CRM 시스템/AWS와 통합
  - 초기 비용 없음, 기존 컨택 센터 대비 **80% 저렴**
- 통합 흐름: 전화 -> Connect -> Lex (의도 인식) -> Lambda -> CRM

### Amazon Comprehend
- **NLP (Natural Language Processing, 자연어 처리)** 서비스 (관리형, 서버리스)
  - "컴퓨터가 사람의 글을 읽고 의미를 파악하는 기술"
- 기능: 언어 감지, 핵심 구문 추출, 감정 분석 (긍정/부정), 토큰화, 주제별 자동 분류
- 사용 사례: 고객 이메일 분석 (긍정/부정 경험), 주제별 기사 그룹화

#### Amazon Comprehend Medical
- 비정형 임상 텍스트(의사 소견서, 처방전 등 구조화되지 않은 의료 글)에서 유용한 정보 추출
- **PHI (Protected Health Information, 보호 건강 정보)** 탐지 - DetectPHI API
  - PHI: 환자 이름, 진단명, 처방약 등 개인을 식별할 수 있는 의료 정보
- S3, Kinesis Data Firehose, Transcribe와 연동

### Amazon SageMaker AI

```text
┌─────────────────────────────────────────────────────────────┐
│              SageMaker ML 워크플로우                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌─────────┐ │
│  │  데이터   │──▶│  모델    │──▶│  모델    │──▶│  배포   │ │
│  │  준비    │   │  학습    │   │  튜닝    │   │ (추론)  │ │
│  │          │   │          │   │          │   │         │ │
│  │ S3에서   │   │ 학습     │   │ 하이퍼   │   │ Endpoint│ │
│  │ 데이터   │   │ 인스턴스 │   │ 파라미터 │   │ 생성    │ │
│  │ 로드     │   │ 에서 실행│   │ 최적화   │   │         │ │
│  └──────────┘   └──────────┘   └──────────┘   └────┬────┘ │
│                                                     │      │
│                                                     ▼      │
│                                               ┌──────────┐ │
│                                               │  예측    │ │
│                                               │ (실시간/ │ │
│                                               │  배치)   │ │
│                                               └──────────┘ │
│                                                             │
│  SageMaker: ML 프로세스 전체를 한 곳에서 관리                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- 개발자/데이터 사이언티스트를 위한 **ML 모델 구축** 관리형 서비스
- ML 프로세스 전체를 한 곳에서: 데이터 준비 -> 모델 학습/튜닝 -> 배포 -> 예측
- 서버 프로비저닝 처리

### Amazon Kendra
- ML 기반 **문서 검색** 서비스
- 문서 내에서 **답변 추출** (텍스트, PDF, HTML, PowerPoint, Word, FAQ)
- **자연어 검색** 기능
- **증분 학습**: 사용자 상호작용/피드백으로 선호 결과 개선
- 수동 검색 결과 미세 조정 가능 (중요도, 신선도, 커스텀)
- 데이터 소스: S3, RDS, Google Drive, SharePoint, OneDrive 등

### Amazon Personalize
- **실시간 개인화 추천** ML 서비스
- Amazon.com과 동일 기술
- 사용 사례: 상품 추천/재순위, 개인화 마케팅
- 기존 웹사이트, 앱, SMS, 이메일에 통합
- **수개월이 아닌 수일** 만에 구현

### Amazon Textract
- AI/ML로 스캔 문서에서 **텍스트, 필기, 데이터** 자동 추출
- **폼과 테이블** 데이터 추출
- 사용 사례: 금융 (인보이스, 재무 보고서), 의료 (의료 기록, 보험 청구), 공공 (세금 양식, ID, 여권)

## 시험 포인트
- **"이미지/비디오 분석, 얼굴 인식"** = Rekognition
- **"음성 -> 텍스트"** = Transcribe
- **"텍스트 -> 음성"** = Polly
- **"번역"** = Translate
- **"챗봇, 대화형 인터페이스"** = Lex
- **"컨택 센터"** = Connect
- **"자연어 처리, 감정 분석"** = Comprehend
- **"ML 모델 직접 구축"** = SageMaker
- **"문서에서 답변 검색"** = Kendra
- **"개인화 추천"** = Personalize
- **"문서에서 텍스트/데이터 추출"** = Textract
- Comprehend Medical: PHI 탐지, 임상 텍스트 분석
- Rekognition Content Moderation + A2I: 콘텐츠 검열 + 수동 리뷰
- Lex + Connect 조합: 클라우드 기반 콜센터 자동화

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Rekognition | 이미지/비디오 분석, 얼굴 인식, 콘텐츠 검열 |
| Transcribe | 음성 -> 텍스트 (ASR), PII 제거, 자동 언어 식별 |
| Polly | 텍스트 -> 음성, Lexicon, SSML 지원 |
| Translate | 언어 번역, 현지화 |
| Lex | 챗봇/대화형 봇 (Alexa 기술), ASR + NLU |
| Connect | 클라우드 컨택 센터, Lex 통합, 80% 비용 절감 |
| Comprehend | NLP, 감정 분석, 핵심 구문 추출, 주제 분류 |
| Comprehend Medical | 임상 텍스트 분석, PHI 탐지 |
| SageMaker | ML 모델 구축/학습/배포 플랫폼 |
| Kendra | ML 기반 문서 검색, 자연어 검색, 증분 학습 |
| Personalize | 실시간 개인화 추천 (Amazon.com 기술) |
| Textract | 문서에서 텍스트/폼/테이블 데이터 추출 |

---

## Practice Questions

### Q1. A media company needs to automatically generate subtitles for their video content in multiple languages. Which combination of AWS services should they use?
**Options:**
- A) Amazon Polly and Amazon Translate
- B) Amazon Transcribe and Amazon Translate
- C) Amazon Rekognition and Amazon Translate
- D) Amazon Comprehend and Amazon Polly

**Answer:** B

**해설:**

> **문제:** 한 미디어 회사가 비디오 콘텐츠에 대해 여러 언어로 자동 자막을 생성해야 한다. 어떤 AWS 서비스 조합을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Polly + Amazon Translate |
| B | Amazon Transcribe + Amazon Translate |
| C | Amazon Rekognition + Amazon Translate |
| D | Amazon Comprehend + Amazon Polly |

**상세 풀이:** Amazon Transcribe는 음성을 텍스트로 변환(ASR)하여 자막을 생성하고, Amazon Translate는 생성된 텍스트를 다국어로 번역하므로 이 조합이 다국어 자막 생성에 적합하다. A) Polly는 텍스트를 음성으로 변환하는 서비스이므로 자막 생성과 무관하다. C) Rekognition은 이미지/비디오의 시각적 객체 인식 서비스로 음성 처리를 하지 않는다. D) Comprehend는 텍스트 감정/의미 분석용이며 Polly는 음성 합성이므로 자막 생성과 관련이 없다.

**핵심 개념:** Amazon Transcribe / Amazon Translate

### Q2. A company wants to build a cloud-based contact center that can automatically handle customer inquiries using conversational AI before routing to human agents. Which combination of AWS services provides this capability?
**Options:**
- A) Amazon Polly and Amazon SQS
- B) Amazon Lex and Amazon Connect
- C) Amazon Comprehend and Amazon SNS
- D) Amazon Transcribe and Amazon SES

**Answer:** B

**해설:**

> **문제:** 한 회사가 클라우드 기반 컨택 센터를 구축하여 대화형 AI로 고객 문의를 자동 처리한 후 필요시 사람 상담원에게 라우팅하고 싶다. 어떤 AWS 서비스 조합이 이 기능을 제공하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Polly + Amazon SQS |
| B | Amazon Lex + Amazon Connect |
| C | Amazon Comprehend + Amazon SNS |
| D | Amazon Transcribe + Amazon SES |

**상세 풀이:** Amazon Connect는 클라우드 기반 가상 컨택 센터 서비스이고, Amazon Lex는 대화형 AI 봇(Alexa와 동일 기술)을 구축하여 고객 문의를 자동 처리할 수 있으며, Lex가 의도를 인식하고 Lambda로 비즈니스 로직을 수행한 후 필요시 사람 상담원에게 라우팅할 수 있다. A) Polly는 텍스트->음성 변환이고 SQS는 메시지 큐로 컨택 센터 기능이 아니다. C) Comprehend는 텍스트 분석이고 SNS는 알림 서비스로 컨택 센터와 무관하다. D) Transcribe는 음성->텍스트 변환이고 SES는 이메일 서비스로 컨택 센터 자동화를 제공하지 않는다.

**핵심 개념:** Amazon Lex & Connect

### Q3. A healthcare company needs to analyze medical records stored as unstructured text to extract Protected Health Information (PHI) for compliance purposes. Which service should they use?
**Options:**
- A) Amazon Comprehend
- B) Amazon Comprehend Medical
- C) Amazon Textract
- D) Amazon Kendra

**Answer:** B

**해설:**

> **문제:** 한 헬스케어 회사가 비정형 텍스트로 저장된 의료 기록을 분석하여 규정 준수를 위해 보호 건강 정보(PHI)를 추출해야 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Comprehend |
| B | Amazon Comprehend Medical |
| C | Amazon Textract |
| D | Amazon Kendra |

**상세 풀이:** Amazon Comprehend Medical은 비정형 임상 텍스트에서 PHI(Protected Health Information)를 탐지하는 전문 서비스로 DetectPHI API를 제공하며 의료 데이터 규정 준수에 특화되어 있다. A) 일반 Comprehend는 범용 NLP 서비스로 의료 텍스트 특화가 아니며 PHI 탐지 기능이 없다. C) Textract는 문서/이미지에서 텍스트와 데이터를 추출하는 서비스이지 텍스트 내용을 분석하여 PHI를 식별하는 것이 아니다. D) Kendra는 ML 기반 문서 검색 서비스로 의료 데이터 분석과 무관하다.

**핵심 개념:** Amazon Comprehend Medical

### Q4. A social media platform needs to automatically detect and flag inappropriate content in user-uploaded images. When the system is unsure, it should route the content for human review. Which approach should they take?
**Options:**
- A) Amazon Textract with manual review queue
- B) Amazon Rekognition Content Moderation with Amazon Augmented AI (A2I)
- C) Amazon Comprehend with SNS notifications
- D) Amazon SageMaker with custom model

**Answer:** B

**해설:**

> **문제:** 한 소셜 미디어 플랫폼이 사용자가 업로드한 이미지에서 부적절한 콘텐츠를 자동으로 탐지하고 플래그해야 한다. 시스템이 확신이 없을 때는 사람이 검토하도록 라우팅해야 한다. 어떤 접근 방식을 취해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 수동 검토 큐와 함께 Amazon Textract 사용 |
| B | Amazon Augmented AI(A2I)와 함께 Amazon Rekognition Content Moderation 사용 |
| C | SNS 알림과 함께 Amazon Comprehend 사용 |
| D | 커스텀 모델과 함께 Amazon SageMaker 사용 |

**상세 풀이:** Amazon Rekognition의 Content Moderation 기능은 이미지/비디오에서 부적절한 콘텐츠를 탐지하고 최소 신뢰도 임계값을 설정하여 불확실한 경우 Amazon Augmented AI(A2I)로 수동 리뷰를 위해 플래그할 수 있다. A) Textract는 문서에서 텍스트/데이터 추출용이지 콘텐츠 검열 기능이 아니다. C) Comprehend는 텍스트 감정/의미 분석용으로 이미지 콘텐츠 검열과 무관하다. D) SageMaker로 커스텀 모델을 구축하는 것은 Rekognition이 이미 제공하는 기능을 다시 만드는 것으로 불필요하게 복잡하다.

**핵심 개념:** Amazon Rekognition Content Moderation / A2I

### Q5. A company wants to add a natural language search capability to their internal knowledge base. Users should be able to ask questions in plain English and get precise answers from documents stored in S3 and SharePoint. Which service is BEST suited?
**Options:**
- A) Amazon OpenSearch Service
- B) Amazon Kendra
- C) Amazon Comprehend
- D) Amazon Athena

**Answer:** B

**해설:**

> **문제:** 한 회사가 내부 지식 기반에 자연어 검색 기능을 추가하려 한다. 사용자가 평이한 영어로 질문하면 S3와 SharePoint에 저장된 문서에서 정확한 답변을 얻을 수 있어야 한다. 가장 적합한 서비스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Amazon OpenSearch Service |
| B | Amazon Kendra |
| C | Amazon Comprehend |
| D | Amazon Athena |

**상세 풀이:** Amazon Kendra는 ML 기반 문서 검색 서비스로 자연어 검색 기능을 제공하며, S3, SharePoint, Google Drive 등 다양한 데이터 소스에서 문서를 인덱싱하고 질문에 대한 정확한 답변을 추출하며, 사용자 피드백을 통한 증분 학습도 지원한다. A) OpenSearch는 범용 텍스트 검색으로 키워드 기반이며, 자연어 질의응답(Q&A) 기능은 제공하지 않는다. C) Comprehend는 텍스트 감정/의미 분석 서비스로 검색 기능이 아니다. D) Athena는 S3 데이터에 대한 SQL 쿼리 서비스로 자연어 검색과 무관하다.

**핵심 개념:** Amazon Kendra

### Q6. An e-commerce company wants to provide personalized product recommendations to users on their website. They want to use the same technology that Amazon.com uses. Which service should they implement?
**Options:**
- A) Amazon SageMaker with custom recommendation model
- B) Amazon Personalize
- C) Amazon Comprehend
- D) Amazon Kendra

**Answer:** B

**해설:**

> **문제:** 한 이커머스 회사가 웹사이트에서 사용자에게 개인화된 상품 추천을 제공하고 싶다. Amazon.com이 사용하는 것과 동일한 기술을 사용하고 싶다. 어떤 서비스를 구현해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 커스텀 추천 모델과 함께 Amazon SageMaker |
| B | Amazon Personalize |
| C | Amazon Comprehend |
| D | Amazon Kendra |

**상세 풀이:** Amazon Personalize는 Amazon.com과 동일한 기술을 사용하는 실시간 개인화 추천 ML 서비스로, 기존 웹사이트, 앱, SMS, 이메일에 통합할 수 있으며 수일 만에 구현 가능하다. A) SageMaker로 직접 추천 모델을 구축하는 것은 Personalize가 이미 제공하는 기능을 처음부터 개발하는 것으로 불필요하게 복잡하고 시간이 많이 걸린다. C) Comprehend는 NLP(자연어 처리) 서비스로 상품 추천과 무관하다. D) Kendra는 문서 검색 서비스로 개인화 추천 기능이 아니다.

**핵심 개념:** Amazon Personalize

### Q7. A government agency needs to process thousands of tax forms and extract structured data from them, including handwritten fields. Which AWS service should they use?
**Options:**
- A) Amazon Rekognition
- B) Amazon Comprehend
- C) Amazon Textract
- D) Amazon Transcribe

**Answer:** C

**해설:**

> **문제:** 한 정부 기관이 수천 개의 세금 양식을 처리하고 필기 필드를 포함한 구조화된 데이터를 추출해야 한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Rekognition |
| B | Amazon Comprehend |
| C | Amazon Textract |
| D | Amazon Transcribe |

**상세 풀이:** Amazon Textract는 AI/ML을 사용하여 스캔된 문서에서 텍스트, 필기, 폼 및 테이블 데이터를 자동 추출하며, 세금 양식, ID, 여권 등 공공 부문 문서 처리에 특화되어 있다. A) Rekognition은 이미지/비디오의 시각적 객체(얼굴, 사물, 장면) 인식용으로 문서의 구조화된 데이터 추출에 적합하지 않다. B) Comprehend는 텍스트의 의미/감정 분석 서비스로 문서에서 데이터를 추출하는 것이 아니다. D) Transcribe는 음성을 텍스트로 변환하는 서비스로 문서 이미지 처리와 무관하다.

**핵심 개념:** Amazon Textract
