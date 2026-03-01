# Section 21 - Machine Learning 연습문제 해설

---

### Q1. A media company needs to automatically generate subtitles for video content in multiple languages. Which combination of services should they use?

**한글 번역:** 미디어 회사가 여러 언어로 비디오 콘텐츠의 자막을 자동으로 생성해야 합니다. 어떤 서비스 조합을 사용해야 할까요?

**선지:**
- A) Amazon Polly and Amazon Translate → Amazon Polly와 Amazon Translate
- B) Amazon Transcribe and Amazon Translate → Amazon Transcribe와 Amazon Translate
- C) Amazon Rekognition and Amazon Translate → Amazon Rekognition과 Amazon Translate
- D) Amazon Comprehend and Amazon Polly → Amazon Comprehend와 Amazon Polly

**정답:** B

**선지별 해설:**
- **A) Polly and Translate:** 오답. Polly는 텍스트를 음성으로 변환(TTS)하는 서비스입니다. 자막 생성을 위해서는 먼저 음성을 텍스트로 변환해야 하는데, Polly는 그 반대 기능을 합니다. 음성에서 텍스트 추출이 불가능합니다.
- **B) Transcribe and Translate:** 정답. Amazon Transcribe는 음성을 텍스트로 변환(STT, Speech-to-Text)하는 서비스로, 비디오의 음성에서 자막 텍스트를 추출합니다. Amazon Translate는 텍스트를 다른 언어로 번역합니다. 이 조합으로 원본 언어 자막 생성 → 다국어 번역의 워크플로우를 구현할 수 있습니다.
- **C) Rekognition and Translate:** 오답. Rekognition은 이미지 및 비디오에서 객체, 얼굴, 텍스트 등을 감지하는 컴퓨터 비전 서비스입니다. 음성을 텍스트로 변환하는 기능이 없으므로 자막 생성에 적합하지 않습니다.
- **D) Comprehend and Polly:** 오답. Comprehend는 자연어 처리(NLP) 서비스로 텍스트의 감정, 핵심 구문, 엔티티 등을 분석합니다. Polly는 텍스트를 음성으로 변환합니다. 두 서비스 모두 음성에서 텍스트를 추출하는 기능이 없어 자막 생성에 적합하지 않습니다.

**핵심 개념:** Amazon Transcribe(음성→텍스트) + Amazon Translate(다국어 번역) 조합

---

### Q2. A company wants a cloud-based contact center with conversational AI before routing to human agents. Which combination of services should they use?

**한글 번역:** 회사가 인간 상담원에게 연결하기 전에 대화형 AI를 갖춘 클라우드 기반 컨택 센터를 원합니다. 어떤 서비스 조합을 사용해야 할까요?

**선지:**
- A) Amazon Polly and Amazon SQS → Amazon Polly와 Amazon SQS
- B) Amazon Lex and Amazon Connect → Amazon Lex와 Amazon Connect
- C) Amazon Comprehend and Amazon SNS → Amazon Comprehend와 Amazon SNS
- D) Amazon Transcribe and Amazon SES → Amazon Transcribe와 Amazon SES

**정답:** B

**선지별 해설:**
- **A) Polly and SQS:** 오답. Polly는 텍스트를 음성으로 변환하는 서비스이고, SQS는 메시지 큐 서비스입니다. 어느 것도 컨택 센터 기능이나 대화형 AI를 제공하지 않습니다.
- **B) Lex and Connect:** 정답. Amazon Connect는 AWS의 클라우드 기반 컨택 센터 서비스입니다. Amazon Lex는 대화형 챗봇을 구축하는 서비스로, Alexa와 동일한 기술을 사용합니다. Connect에 Lex 봇을 통합하면, 고객이 전화를 걸었을 때 AI가 먼저 대화를 처리하고 필요시 인간 상담원에게 라우팅할 수 있습니다.
- **C) Comprehend and SNS:** 오답. Comprehend는 텍스트 분석(감정 분석 등) 서비스이고, SNS는 알림 서비스입니다. 대화형 AI나 컨택 센터 기능을 제공하지 않습니다.
- **D) Transcribe and SES:** 오답. Transcribe는 음성을 텍스트로 변환하는 서비스이고, SES(Simple Email Service)는 이메일 서비스입니다. 컨택 센터나 대화형 AI 기능과는 관련이 없습니다.

**핵심 개념:** Amazon Connect(클라우드 컨택 센터) + Amazon Lex(대화형 AI 봇)

---

### Q3. A healthcare company needs to analyze medical records to extract Protected Health Information (PHI) for compliance. Which service should they use?

**한글 번역:** 의료 회사가 규정 준수를 위해 의료 기록에서 보호 대상 건강 정보(PHI)를 추출하기 위해 분석해야 합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon Comprehend → Amazon Comprehend
- B) Amazon Comprehend Medical → Amazon Comprehend Medical
- C) Amazon Textract → Amazon Textract
- D) Amazon Kendra → Amazon Kendra

**정답:** B

**선지별 해설:**
- **A) Amazon Comprehend:** 오답. Comprehend는 범용 자연어 처리(NLP) 서비스로, 일반적인 엔티티(인물, 장소, 조직 등)를 추출할 수 있습니다. 하지만 의료 전문 용어, 약품명, 진단 코드, PHI 등 의료 관련 엔티티를 정확하게 인식하는 데는 한계가 있습니다.
- **B) Amazon Comprehend Medical:** 정답. Comprehend Medical은 의료 텍스트에 특화된 NLP 서비스입니다. 의료 기록, 임상 노트에서 PHI(환자 이름, 주소, 생년월일 등), 의료 상태, 약품, 투여량, 검사 결과 등을 자동으로 추출할 수 있습니다. HIPAA 적격 서비스로 의료 규정 준수에 적합합니다.
- **C) Amazon Textract:** 오답. Textract는 문서(이미지, PDF)에서 텍스트, 표, 양식 데이터를 추출하는 OCR 서비스입니다. 텍스트를 추출할 수는 있지만, 추출된 텍스트에서 PHI를 의미적으로 식별하고 분류하는 기능은 없습니다. 스캔된 문서에서 텍스트를 추출한 후 Comprehend Medical로 분석하는 파이프라인은 가능합니다.
- **D) Amazon Kendra:** 오답. Kendra는 지능형 검색 서비스로, 문서에서 정보를 검색하는 데 사용됩니다. PHI 추출이나 의료 텍스트 분석 기능이 없습니다.

**핵심 개념:** Amazon Comprehend Medical - 의료 텍스트 NLP, PHI 추출, HIPAA 적격

---

### Q4. A social media platform needs to detect inappropriate content in user-uploaded images. When the system is unsure, it should route for human review. Which approach is best?

**한글 번역:** 소셜 미디어 플랫폼이 사용자가 업로드한 이미지에서 부적절한 콘텐츠를 감지해야 합니다. 시스템이 확실하지 않을 때 사람의 검토를 위해 라우팅해야 합니다. 가장 좋은 접근 방식은 무엇일까요?

**선지:**
- A) Amazon Textract with manual review queue → 수동 검토 대기열을 사용한 Amazon Textract
- B) Amazon Rekognition Content Moderation with Amazon A2I → Amazon A2I와 함께 사용하는 Amazon Rekognition 콘텐츠 모더레이션
- C) Amazon Comprehend with SNS notifications → SNS 알림을 사용한 Amazon Comprehend
- D) Amazon SageMaker with custom model → 맞춤 모델을 사용한 Amazon SageMaker

**정답:** B

**선지별 해설:**
- **A) Textract with manual review queue:** 오답. Textract는 문서에서 텍스트를 추출하는 OCR 서비스입니다. 이미지 콘텐츠의 적절성을 판단하는 기능이 없으므로, 부적절한 이미지 감지에 사용할 수 없습니다.
- **B) Rekognition Content Moderation with Amazon A2I:** 정답. Rekognition의 콘텐츠 모더레이션 API는 이미지에서 부적절한 콘텐츠(성인물, 폭력 등)를 자동으로 감지합니다. Amazon A2I(Augmented AI)는 ML 예측의 신뢰도가 낮을 때 자동으로 사람의 검토 워크플로우를 트리거합니다. 이 조합은 자동화된 콘텐츠 모더레이션과 사람의 검토를 원활하게 통합합니다.
- **C) Comprehend with SNS notifications:** 오답. Comprehend는 텍스트 분석 서비스로, 이미지 분석 기능이 없습니다. 또한 SNS 알림만으로는 체계적인 사람의 검토 워크플로우를 구현하기 어렵습니다.
- **D) SageMaker with custom model:** 오답. SageMaker로 맞춤 콘텐츠 모더레이션 모델을 구축할 수 있지만, 이는 불필요하게 복잡합니다. Rekognition이 이미 사전 훈련된 콘텐츠 모더레이션 기능을 제공하므로, 맞춤 모델을 구축할 필요가 없습니다. 또한 사람의 검토 워크플로우도 직접 구축해야 합니다.

**핵심 개념:** Amazon Rekognition Content Moderation + Amazon A2I(Augmented AI) - 이미지 모더레이션 + 사람의 검토 워크플로우

---

### Q5. A company wants natural language search for an internal knowledge base. Users ask questions in plain English. Documents are stored in S3 and SharePoint. Which service should they use?

**한글 번역:** 회사가 내부 지식 베이스에 대한 자연어 검색을 원합니다. 사용자는 일반 영어로 질문합니다. 문서는 S3와 SharePoint에 저장되어 있습니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon OpenSearch Service → Amazon OpenSearch Service
- B) Amazon Kendra → Amazon Kendra
- C) Amazon Comprehend → Amazon Comprehend
- D) Amazon Athena → Amazon Athena

**정답:** B

**선지별 해설:**
- **A) Amazon OpenSearch Service:** 오답. OpenSearch는 강력한 검색 엔진이지만, 키워드 기반 검색에 더 적합합니다. 자연어 질문을 이해하고 문맥에 맞는 답변을 제공하는 기능이 Kendra만큼 강력하지 않습니다. 또한 S3와 SharePoint 커넥터를 직접 구성해야 합니다.
- **B) Amazon Kendra:** 정답. Kendra는 ML 기반의 지능형 검색 서비스로, 자연어 질문을 이해하고 문서에서 정확한 답변을 찾아줍니다. S3, SharePoint, Salesforce, ServiceNow 등 다양한 데이터 소스에 대한 내장 커넥터를 제공합니다. FAQ 스타일의 질의응답과 문서 검색 모두 지원합니다.
- **C) Amazon Comprehend:** 오답. Comprehend는 텍스트 분석(감정 분석, 엔티티 추출 등) 서비스입니다. 검색 기능을 제공하지 않으므로, 지식 베이스 검색에 직접 사용할 수 없습니다.
- **D) Amazon Athena:** 오답. Athena는 S3 데이터에 대한 SQL 쿼리 서비스입니다. 구조화된 데이터에 SQL을 실행하는 것이며, 비정형 문서에 대한 자연어 검색과는 완전히 다른 용도입니다.

**핵심 개념:** Amazon Kendra - ML 기반 지능형 검색, 자연어 질의, 다양한 데이터 소스 커넥터

---

### Q6. An e-commerce company wants personalized product recommendations using the same technology as Amazon.com. Which service should they use?

**한글 번역:** 전자상거래 회사가 Amazon.com과 같은 기술을 사용하여 개인화된 상품 추천을 원합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) SageMaker with custom model → 맞춤 모델을 사용한 SageMaker
- B) Amazon Personalize → Amazon Personalize
- C) Amazon Comprehend → Amazon Comprehend
- D) Amazon Kendra → Amazon Kendra

**정답:** B

**선지별 해설:**
- **A) SageMaker with custom model:** 오답. SageMaker로 추천 모델을 직접 구축할 수 있지만, 데이터 과학 전문 지식이 필요하고 모델 개발에 시간이 많이 걸립니다. Amazon Personalize가 같은 기능을 훨씬 간편하게 제공하므로 비효율적인 접근입니다.
- **B) Amazon Personalize:** 정답. Amazon Personalize는 Amazon.com에서 사용하는 것과 동일한 ML 기술을 기반으로 한 실시간 개인화 추천 서비스입니다. 사용자 행동 데이터(클릭, 구매 등)를 입력하면 자동으로 추천 모델을 구축하고, 개인화된 상품 추천, 맞춤형 랭킹, 관련 항목 추천 등을 제공합니다. ML 전문 지식 없이도 사용할 수 있습니다.
- **C) Amazon Comprehend:** 오답. Comprehend는 텍스트 분석 서비스(감정 분석, 엔티티 추출 등)입니다. 상품 추천 기능을 제공하지 않습니다.
- **D) Amazon Kendra:** 오답. Kendra는 지능형 검색 서비스로, 문서 검색에 사용됩니다. 개인화된 상품 추천과는 완전히 다른 용도입니다.

**핵심 개념:** Amazon Personalize - Amazon.com 동일 기술 기반 개인화 추천 서비스

---

### Q7. A government agency needs to process tax forms and extract structured data including handwritten fields. Which service should they use?

**한글 번역:** 정부 기관이 세금 양식을 처리하고 필기 입력 필드를 포함한 구조화된 데이터를 추출해야 합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon Rekognition → Amazon Rekognition
- B) Amazon Comprehend → Amazon Comprehend
- C) Amazon Textract → Amazon Textract
- D) Amazon Transcribe → Amazon Transcribe

**정답:** C

**선지별 해설:**
- **A) Amazon Rekognition:** 오답. Rekognition은 이미지에서 객체, 얼굴, 장면 등을 인식하는 컴퓨터 비전 서비스입니다. 이미지 내 텍스트를 감지하는 기능이 있지만, 양식의 구조(키-값 쌍, 테이블)를 이해하고 추출하는 데는 적합하지 않습니다.
- **B) Amazon Comprehend:** 오답. Comprehend는 이미 추출된 텍스트를 분석하는 NLP 서비스입니다. 문서 이미지에서 텍스트를 추출하는 OCR 기능이 없으므로, 양식 처리에 직접 사용할 수 없습니다.
- **C) Amazon Textract:** 정답. Textract는 문서(스캔, PDF, 이미지)에서 텍스트, 양식(키-값 쌍), 테이블을 자동으로 추출하는 OCR+문서 분석 서비스입니다. 인쇄된 텍스트뿐만 아니라 손글씨(handwriting)도 인식할 수 있습니다. AnalyzeDocument API를 통해 양식의 구조화된 데이터를 추출하며, 세금 양식과 같은 정형 문서 처리에 이상적입니다.
- **D) Amazon Transcribe:** 오답. Transcribe는 음성을 텍스트로 변환(STT)하는 서비스입니다. 문서 이미지나 양식에서 데이터를 추출하는 기능과는 전혀 관련이 없습니다.

**핵심 개념:** Amazon Textract - 문서 OCR, 양식 데이터 추출, 손글씨 인식

---
