# Section 18 - Serverless Architectures 연습문제 해설

---

### Q1. Company building mobile app. Users authenticate then upload files to their own S3 folder. Must be serverless and scalable. Which combination?

**한글 번역:** 회사가 모바일 앱을 구축하고 있습니다. 사용자가 인증한 후 자신의 S3 폴더에 파일을 업로드합니다. 서버리스이고 확장 가능해야 합니다. 어떤 조합을 사용해야 합니까?

**선지:**
- A) IAM users for each mobile user with S3 bucket policies → 각 모바일 사용자에 대한 IAM 사용자와 S3 버킷 정책
- B) Cognito User Pools for authentication and Cognito Identity Pools for temporary AWS credentials to access S3 → 인증을 위한 Cognito User Pools와 S3 접근을 위한 임시 AWS 자격 증명을 제공하는 Cognito Identity Pools
- C) API Gateway with Lambda to proxy all S3 uploads → 모든 S3 업로드를 프록시하는 API Gateway와 Lambda
- D) CloudFront signed URLs → CloudFront 서명된 URL

**정답:** B

**선지별 해설:**
- **A) IAM users for each mobile user:** IAM 사용자를 모바일 사용자마다 생성하는 것은 확장이 불가능합니다. IAM에는 계정당 사용자 수 제한이 있으며(기본 5,000명), 장기 자격 증명 관리는 보안 위험이 큽니다. 수백만 명의 앱 사용자에게는 절대 적합하지 않습니다.
- **B) Cognito User Pools + Cognito Identity Pools:** 정답입니다. (1) Cognito User Pools가 사용자 인증(가입, 로그인)을 처리하고, (2) Cognito Identity Pools가 인증된 사용자에게 임시 AWS 자격 증명(STS 토큰)을 발급합니다. IAM 정책 변수를 사용하여 각 사용자가 자신의 S3 폴더에만 접근하도록 제한할 수 있습니다. 완전 서버리스이고 수백만 사용자로 자동 확장됩니다.
- **C) API Gateway + Lambda to proxy S3 uploads:** Lambda를 통해 모든 업로드를 프록시하면 Lambda가 병목이 되고, 큰 파일 전송 시 Lambda의 페이로드 크기 제한(6MB 동기)과 타임아웃에 걸릴 수 있습니다. 사용자가 S3에 직접 업로드하는 것이 훨씬 효율적입니다.
- **D) CloudFront signed URLs:** 서명된 URL은 콘텐츠 다운로드 제어에 주로 사용되며, 사용자 인증 체계를 제공하지 않습니다. 업로드 시나리오에서도 Cognito 기반 접근이 더 적합합니다.

**핵심 개념:** 모바일 앱 서버리스 인증 + S3 직접 접근 = Cognito User Pools + Identity Pools

---

### Q2. Serverless blog with DynamoDB. Most operations are reads. Users report slow response. Architecture: API Gateway -> Lambda -> DynamoDB. What TWO caching strategies?

**한글 번역:** DynamoDB를 사용하는 서버리스 블로그입니다. 대부분의 작업이 읽기입니다. 사용자가 느린 응답을 보고합니다. 아키텍처: API Gateway -> Lambda -> DynamoDB. 두 가지 캐싱 전략은 무엇입니까?

**선지:**
- A) ElastiCache Redis → ElastiCache Redis
- B) DynamoDB Accelerator (DAX) for database caching → 데이터베이스 캐싱을 위한 DynamoDB Accelerator (DAX)
- C) API Gateway response caching → API Gateway 응답 캐싱
- D) S3 as caching layer → 캐싱 레이어로서의 S3
- E) Increase DynamoDB read capacity units → DynamoDB 읽기 용량 단위 증가

**정답:** B, C

**선지별 해설:**
- **A) ElastiCache Redis:** ElastiCache는 범용 캐시이지만, DynamoDB에는 전용 캐시인 DAX가 있어 더 적합합니다. ElastiCache를 사용하면 캐시 로직을 직접 구현해야 하며, DAX처럼 DynamoDB API와 투명하게 통합되지 않습니다.
- **B) DynamoDB Accelerator (DAX):** 정답입니다. DAX는 DynamoDB 앞에 배치되는 인메모리 캐시로, 읽기 요청을 마이크로초 단위로 처리합니다. 코드 변경 최소화로 DynamoDB 읽기 성능을 크게 개선할 수 있습니다. 데이터베이스 계층의 캐싱 솔루션입니다.
- **C) API Gateway response caching:** 정답입니다. API Gateway에서 응답 캐싱을 활성화하면, 동일한 API 요청에 대해 Lambda와 DynamoDB를 호출하지 않고 캐시된 응답을 직접 반환합니다. API 계층의 캐싱 솔루션으로, DAX와 함께 사용하면 두 단계에서 캐싱이 적용되어 성능이 크게 향상됩니다.
- **D) S3 as caching layer:** S3는 오브젝트 스토리지로, 캐싱 레이어로 사용하기에 적합하지 않습니다. 밀리초~마이크로초 수준의 캐싱 성능을 제공하지 못합니다.
- **E) Increase DynamoDB read capacity units:** 읽기 용량을 늘리면 처리량은 증가하지만, 지연 시간 자체는 크게 개선되지 않습니다. 캐싱을 통한 성능 개선이 더 효과적이고 비용 효율적입니다.

**핵심 개념:** 서버리스 블로그 캐싱 = DAX(DB 캐싱) + API Gateway 캐싱(API 캐싱) — 두 계층 캐싱

---

### Q3. Globally distributed serverless website. Static content must be served with low latency. S3 bucket must not be publicly accessible. Which architecture?

**한글 번역:** 전역으로 분산된 서버리스 웹사이트입니다. 정적 콘텐츠가 저지연으로 제공되어야 합니다. S3 버킷은 공개적으로 접근할 수 없어야 합니다. 어떤 아키텍처를 사용해야 합니까?

**선지:**
- A) S3 with static website hosting and public access → 정적 웹사이트 호스팅과 퍼블릭 접근이 있는 S3
- B) CloudFront with S3 origin using OAC and S3 bucket policy → OAC와 S3 버킷 정책을 사용하여 S3 오리진이 있는 CloudFront
- C) S3 Cross-Region Replication → S3 교차 리전 복제
- D) Global Accelerator pointing to S3 buckets → S3 버킷을 가리키는 Global Accelerator

**정답:** B

**선지별 해설:**
- **A) S3 with static website hosting and public access:** S3 정적 웹사이트 호스팅은 퍼블릭 접근을 요구합니다. "S3 버킷이 공개적으로 접근할 수 없어야 한다"는 요구사항에 직접적으로 위배됩니다.
- **B) CloudFront + S3 origin + OAC + S3 bucket policy:** 정답입니다. (1) CloudFront가 전 세계 엣지 로케이션에서 정적 콘텐츠를 저지연으로 제공하고, (2) OAC(Origin Access Control)를 통해 CloudFront만 S3에 접근할 수 있도록 제한하며, (3) S3 버킷 정책에서 직접적인 퍼블릭 접근을 차단합니다. 모든 요구사항을 충족하는 표준 아키텍처입니다.
- **C) S3 Cross-Region Replication:** 교차 리전 복제는 데이터를 다른 리전에 복사하지만, CDN처럼 엣지에서 캐싱하여 저지연 서비스를 제공하지 않습니다. 또한 각 리전의 버킷에 대한 접근 제어 문제도 별도로 해결해야 합니다.
- **D) Global Accelerator pointing to S3:** Global Accelerator는 S3를 직접 오리진으로 지원하지 않으며, 정적 콘텐츠 캐싱 기능도 없습니다. 정적 웹사이트 배포에는 CloudFront가 적합합니다.

**핵심 개념:** 서버리스 정적 웹사이트 + 전역 저지연 + S3 비공개 = CloudFront + S3 + OAC

---

### Q4. App runs on EC2 distributing large software updates. Release traffic spikes cause high EC2 costs. Want to reduce costs without modifying app. What to recommend?

**한글 번역:** EC2에서 대용량 소프트웨어 업데이트를 배포하는 앱이 실행됩니다. 릴리스 트래픽 급증으로 EC2 비용이 높아집니다. 앱을 수정하지 않고 비용을 줄이려면 무엇을 권장해야 합니까?

**선지:**
- A) Migrate to Lambda → Lambda로 마이그레이션
- B) Place CloudFront in front of existing application → 기존 애플리케이션 앞에 CloudFront 배치
- C) Use S3 Transfer Acceleration → S3 Transfer Acceleration 사용
- D) Scale up to larger EC2 instances → 더 큰 EC2 인스턴스로 확장

**정답:** B

**선지별 해설:**
- **A) Migrate to Lambda:** Lambda로 마이그레이션하면 앱 수정이 필요합니다. "앱을 수정하지 않고"라는 요구사항에 위배됩니다. 또한 Lambda의 페이로드 크기 제한으로 대용량 파일 배포에 적합하지 않습니다.
- **B) CloudFront in front of existing application:** 정답입니다. CloudFront를 EC2 앞에 배치하면 (1) 소프트웨어 업데이트 파일이 엣지 로케이션에 캐싱되어 반복 다운로드가 EC2에 도달하지 않고, (2) EC2의 부하와 데이터 전송 비용이 크게 줄어들며, (3) 기존 앱 코드를 전혀 수정할 필요가 없습니다. DNS만 CloudFront로 변경하면 됩니다.
- **C) S3 Transfer Acceleration:** Transfer Acceleration은 S3로의 업로드 속도를 향상시키는 것이며, 다운로드 배포 비용 절감과는 무관합니다.
- **D) Scale up to larger EC2 instances:** 더 큰 인스턴스로 확장하면 비용이 더 증가합니다. 비용 절감 요구사항에 정반대되는 조치입니다.

**핵심 개념:** 정적 콘텐츠 배포 비용 절감 + 앱 수정 없음 = CloudFront 캐싱

---

### Q5. Serverless app uses DynamoDB Global Tables. When new user registers, send welcome email. BEST serverless approach?

**한글 번역:** 서버리스 앱이 DynamoDB 글로벌 테이블을 사용합니다. 새 사용자가 등록하면 환영 이메일을 보내야 합니다. 최선의 서버리스 접근 방식은 무엇입니까?

**선지:**
- A) CloudWatch Event rule to monitor DynamoDB → DynamoDB를 모니터링하는 CloudWatch 이벤트 규칙
- B) Enable DynamoDB Streams and trigger Lambda to send email via SES → DynamoDB Streams를 활성화하고 Lambda를 트리거하여 SES로 이메일 전송
- C) Use API Gateway to trigger SNS after registration → 등록 후 SNS를 트리거하는 API Gateway 사용
- D) Schedule Lambda to periodically scan DynamoDB for new users → 새 사용자를 찾기 위해 주기적으로 DynamoDB를 스캔하는 Lambda 예약

**정답:** B

**선지별 해설:**
- **A) CloudWatch Event rule to monitor DynamoDB:** CloudWatch Events(EventBridge)는 DynamoDB 테이블의 개별 항목 변경을 직접 모니터링하지 않습니다. DynamoDB의 데이터 변경 이벤트를 캡처하려면 DynamoDB Streams를 사용해야 합니다.
- **B) DynamoDB Streams + Lambda + SES:** 정답입니다. (1) DynamoDB Streams는 테이블의 항목 변경(INSERT, MODIFY, REMOVE)을 실시간으로 캡처하고, (2) 새 사용자 등록(INSERT) 이벤트가 Lambda를 트리거하며, (3) Lambda가 Amazon SES를 통해 환영 이메일을 발송합니다. 완전 서버리스이며 이벤트 기반의 모범 아키텍처입니다.
- **C) API Gateway to trigger SNS after registration:** API Gateway에서 직접 SNS를 트리거하면 등록 로직과 이메일 로직이 결합됩니다. 또한 DynamoDB에 직접 데이터가 추가되는 경우(다른 리전의 글로벌 테이블 복제 등)에는 이메일이 발송되지 않습니다. DynamoDB Streams가 더 안정적입니다.
- **D) Schedule Lambda to periodically scan DynamoDB:** 주기적 스캔은 (1) 실시간이 아니므로 이메일 발송이 지연되고, (2) 전체 테이블을 스캔하면 비용이 높으며, (3) 어떤 사용자가 새로운지 추적하는 추가 로직이 필요합니다. 비효율적인 폴링 방식입니다.

**핵심 개념:** DynamoDB 데이터 변경 이벤트 처리 = DynamoDB Streams + Lambda

---

### Q6. Microservices architecture. Service A processes orders sync, Service B handles analytics async, Service C sends email notifications. BEST architecture?

**한글 번역:** 마이크로서비스 아키텍처입니다. Service A는 주문을 동기적으로 처리하고, Service B는 분석을 비동기적으로 처리하며, Service C는 이메일 알림을 보냅니다. 최선의 아키텍처는 무엇입니까?

**선지:**
- A) Service A sends directly to B and C → Service A가 B와 C에 직접 전송
- B) Service A publishes to SNS topic, B subscribes via SQS, C subscribes via SQS → Service A가 SNS 토픽에 발행, B는 SQS로 구독, C는 SQS로 구독
- C) Service A writes to Kinesis consumed by B and C → Service A가 Kinesis에 기록, B와 C가 소비
- D) Service A stores in S3, B and C poll S3 → Service A가 S3에 저장, B와 C가 S3를 폴링

**정답:** B

**선지별 해설:**
- **A) Service A sends directly to B and C:** 직접 통신은 서비스 간 강한 결합(tight coupling)을 만듭니다. B나 C가 다운되면 A에도 영향을 줄 수 있으며, 새 서비스 추가 시 A를 수정해야 합니다. 마이크로서비스의 디커플링 원칙에 위배됩니다.
- **B) SNS topic + SQS subscriptions (Fan Out):** 정답입니다. (1) Service A가 주문 처리 후 SNS 토픽에 이벤트를 발행하고, (2) Service B와 C가 각각 자체 SQS 큐를 통해 독립적으로 이벤트를 수신합니다. 이 패턴은 서비스 간 완전한 디커플링을 제공하며, 각 서비스가 자체 속도로 비동기 처리할 수 있습니다. 새 서비스 추가 시 SNS에 구독만 추가하면 됩니다.
- **C) Kinesis consumed by B and C:** Kinesis는 실시간 스트리밍 데이터 처리에 적합하지만, 주문 이벤트와 같은 메시지 기반 통신에는 SNS+SQS가 더 간단하고 적절합니다. 샤드 관리 등 불필요한 복잡성이 추가됩니다.
- **D) S3 poll by B and C:** S3를 폴링하는 것은 매우 비효율적입니다. 실시간 처리가 불가능하고, 폴링 간격에 따라 지연이 발생하며, S3 API 호출 비용도 증가합니다.

**핵심 개념:** 마이크로서비스 디커플링 + 다중 소비자 비동기 처리 = SNS + SQS Fan Out

---

### Q7. Process images uploaded to S3 by generating thumbnails. Processing takes ~30 seconds per image. Thousands of images during peak hours. MOST appropriate serverless architecture?

**한글 번역:** S3에 업로드된 이미지를 처리하여 썸네일을 생성합니다. 이미지당 처리 시간은 약 30초입니다. 피크 시간에 수천 개의 이미지가 업로드됩니다. 가장 적절한 서버리스 아키텍처는 무엇입니까?

**선지:**
- A) S3 Event Notification -> Lambda → S3 이벤트 알림 -> Lambda
- B) S3 Event Notification -> SQS -> EC2 → S3 이벤트 알림 -> SQS -> EC2
- C) CloudWatch Events -> Step Functions -> Lambda → CloudWatch Events -> Step Functions -> Lambda
- D) S3 Event Notification -> SNS -> Email notification → S3 이벤트 알림 -> SNS -> 이메일 알림

**정답:** A

**선지별 해설:**
- **A) S3 Event Notification -> Lambda:** 정답입니다. (1) S3 이벤트 알림이 이미지 업로드를 감지하고, (2) Lambda가 자동으로 트리거되어 썸네일을 생성합니다. 처리 시간 30초는 Lambda의 최대 실행 시간(15분) 이내이며, 수천 건의 동시 처리도 Lambda의 자동 확장으로 처리할 수 있습니다. 완전 서버리스이며 가장 간단한 아키텍처입니다.
- **B) S3 Event Notification -> SQS -> EC2:** EC2를 사용하므로 서버리스가 아닙니다. EC2 인스턴스를 관리하고 확장해야 하므로 운영 부담이 증가합니다.
- **C) CloudWatch Events -> Step Functions -> Lambda:** Step Functions는 복잡한 워크플로우 오케스트레이션에 적합하지만, 단순한 이미지 썸네일 생성에는 과도한 구성입니다. S3 이벤트 -> Lambda가 훨씬 간단합니다.
- **D) S3 Event Notification -> SNS -> Email notification:** 이메일 알림만 보내고 실제 이미지 처리(썸네일 생성)를 수행하지 않습니다. 요구사항과 맞지 않습니다.

**핵심 개념:** S3 업로드 이벤트 기반 이미지 처리 = S3 Event Notification + Lambda (15분 이내 처리)
