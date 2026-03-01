# Section 11 - S3 Advanced 연습문제 해설

---

### Q1. A company stores application logs in S3 Standard. Logs are actively accessed for 30 days, then rarely accessed for 90 days, after which they must be deleted. Which S3 configuration?

**한글 번역:** 회사가 S3 Standard에 애플리케이션 로그를 저장합니다. 로그는 30일 동안 활발히 접근되고, 이후 90일 동안 거의 접근되지 않으며, 그 후에는 삭제되어야 합니다. 어떤 S3 구성을 사용해야 합니까?

**선지:**
- A) S3 Intelligent-Tiering → S3 Intelligent-Tiering
- B) Lifecycle rule to transition to S3 Standard-IA after 30 days and delete after 120 days → 30일 후 S3 Standard-IA로 전환하고 120일 후 삭제하는 수명 주기 규칙
- C) Lifecycle rule to transition to Glacier after 30 days and delete after 120 days → 30일 후 Glacier로 전환하고 120일 후 삭제하는 수명 주기 규칙
- D) Store all in S3 One Zone-IA → 모두 S3 One Zone-IA에 저장

**정답:** B

**선지별 해설:**
- **A) Intelligent-Tiering:** Intelligent-Tiering은 접근 패턴이 예측 불가능할 때 적합합니다. 이 시나리오에서는 접근 패턴이 명확하므로(30일 활발 → 90일 비빈번 → 삭제), 수명 주기 규칙이 더 적합하고 비용 효율적입니다. Intelligent-Tiering은 모니터링 비용도 발생합니다.
- **B) Standard-IA로 전환 + 삭제 (정답):** 접근 패턴이 명확하므로 수명 주기 규칙이 최적입니다. 30일 후 Standard-IA로 전환하여 저장 비용을 줄이고, 120일(30+90) 후 삭제합니다. "거의 접근되지 않는" 90일간 Standard-IA가 적합합니다.
- **C) Glacier로 전환 + 삭제:** Glacier로 전환하면 저장 비용은 더 저렴하지만, "거의 접근되지 않는" 것은 완전히 접근하지 않는 것이 아닙니다. Glacier는 검색에 시간이 소요되어 간헐적 접근이 필요할 때 불편합니다. Standard-IA가 밀리초 접근을 제공하므로 더 적합합니다.
- **D) 모두 One Zone-IA:** 처음 30일 동안 활발히 접근하는 데이터를 One Zone-IA에 저장하면 검색 비용이 높아집니다. 또한 단일 AZ에만 저장하여 가용성이 낮습니다. 수명 주기 전환이 없어 비용 최적화가 안 됩니다.

**핵심 개념:** S3 Lifecycle Rules — 명확한 접근 패턴에 대한 자동 스토리지 클래스 전환 및 만료

---

### Q2. A company needs to generate thumbnail images whenever a photo is uploaded to S3. Event-driven. LEAST operational overhead?

**한글 번역:** 회사가 S3에 사진이 업로드될 때마다 썸네일 이미지를 생성해야 합니다. 이벤트 기반이며, 운영 부담이 가장 적은 솔루션은 무엇입니까?

**선지:**
- A) S3 Event Notification to invoke Lambda → Lambda를 호출하는 S3 이벤트 알림
- B) EC2 instance to poll S3 → S3를 폴링하는 EC2 인스턴스
- C) SQS to queue then process with EC2 → SQS로 큐잉 후 EC2로 처리
- D) Step Functions to orchestrate Lambda → Lambda를 오케스트레이션하는 Step Functions

**정답:** A

**선지별 해설:**
- **A) S3 Event Notification → Lambda (정답):** 가장 운영 부담이 적은 서버리스 솔루션입니다. S3에 객체가 업로드되면 자동으로 Lambda 함수가 트리거됩니다. 서버 관리, 스케일링, 폴링 로직이 모두 불필요합니다. 이벤트 기반 썸네일 생성의 대표적인 패턴입니다.
- **B) EC2 폴링:** EC2 인스턴스를 상시 실행하면서 S3를 주기적으로 폴링하는 것은 운영 부담이 큽니다. EC2 관리, 폴링 로직 구현, 확장성 관리가 모두 필요합니다.
- **C) SQS + EC2:** SQS로 메시지를 큐잉하고 EC2로 처리하면 확장성은 개선되지만, EC2 인스턴스 관리와 SQS 소비자(consumer) 구현이 필요하여 운영 부담이 있습니다.
- **D) Step Functions + Lambda:** Step Functions은 복잡한 워크플로우 오케스트레이션에 적합합니다. 단순한 썸네일 생성 작업에는 과도한 솔루션이며, 추가적인 비용과 복잡성이 발생합니다.

**핵심 개념:** S3 Event Notification + Lambda — 이벤트 기반 서버리스 이미지 처리 패턴

---

### Q3. A company's S3 bucket receives 20,000 GET requests per second. Performance is an issue. What to recommend?

**한글 번역:** 회사의 S3 버킷이 초당 20,000 GET 요청을 받고 있습니다. 성능이 문제입니다. 무엇을 추천해야 합니까?

**선지:**
- A) Enable S3 Transfer Acceleration → S3 Transfer Acceleration을 활성화한다
- B) Distribute objects across multiple prefixes → 객체를 여러 접두사(prefix)에 분산한다
- C) Enable S3 versioning → S3 버전 관리를 활성화한다
- D) Switch to S3 Express One Zone → S3 Express One Zone으로 전환한다

**정답:** B

**선지별 해설:**
- **A) Transfer Acceleration:** Transfer Acceleration은 전 세계에서 S3로의 데이터 전송 속도를 높이는 기능입니다. 초당 요청 처리량(TPS) 문제와는 관련이 없습니다.
- **B) 여러 접두사에 분산 (정답):** S3는 접두사(prefix)당 초당 5,500 GET 요청과 3,500 PUT 요청을 처리할 수 있습니다. 객체를 여러 접두사에 분산하면 처리량이 선형으로 증가합니다. 예: 4개의 접두사를 사용하면 초당 22,000 GET이 가능합니다.
- **C) 버전 관리:** 버전 관리는 객체의 여러 버전을 유지하는 기능으로, 성능 향상과는 관련이 없습니다.
- **D) S3 Express One Zone:** Express One Zone은 단일 AZ에서 매우 낮은 지연 시간을 제공하지만, 이 시나리오의 핵심 문제는 처리량(throughput)입니다. 접두사 분산이 더 직접적이고 비용 효율적인 해결책입니다.

**핵심 개념:** S3 Performance — 접두사(prefix)당 요청 제한 및 멀티 프리픽스 분산 전략

---

### Q4. A company wants S3 event notifications with advanced filtering based on object metadata and send to multiple downstream services including Step Functions and Kinesis Data Firehose. Which solution?

**한글 번역:** 회사가 객체 메타데이터를 기반으로 한 고급 필터링과 Step Functions, Kinesis Data Firehose 등 여러 다운스트림 서비스로 전송하는 S3 이벤트 알림을 원합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) S3 Event Notifications to SNS → SNS로의 S3 이벤트 알림
- B) S3 Event Notifications to SQS → SQS로의 S3 이벤트 알림
- C) S3 Event Notifications with Amazon EventBridge → Amazon EventBridge와 S3 이벤트 알림
- D) S3 Event Notifications to Lambda → Lambda로의 S3 이벤트 알림

**정답:** C

**선지별 해설:**
- **A) SNS로 이벤트 알림:** SNS는 여러 구독자에게 메시지를 팬아웃할 수 있지만, 객체 메타데이터 기반 고급 필터링을 지원하지 않습니다. 또한 Step Functions이나 Kinesis Data Firehose로 직접 전달하는 것이 제한적입니다.
- **B) SQS로 이벤트 알림:** SQS는 단일 큐로의 전달만 가능하며, 여러 다운스트림 서비스로 동시에 전달하는 기능이 없습니다. 고급 필터링도 지원하지 않습니다.
- **C) Amazon EventBridge (정답):** EventBridge는 S3 이벤트에 대해 고급 필터링(객체 메타데이터, 객체 크기 등), JSON 기반 규칙, 그리고 18개 이상의 AWS 서비스(Step Functions, Kinesis Data Firehose, Lambda, SQS, SNS 등)를 대상으로 직접 전달할 수 있습니다. 가장 유연하고 강력한 이벤트 라우팅 솔루션입니다.
- **D) Lambda로 이벤트 알림:** Lambda는 단일 함수 호출이며, 고급 메타데이터 필터링이 제한적입니다. Lambda에서 다시 여러 서비스로 전달하는 코드를 작성해야 하므로 운영 부담이 큽니다.

**핵심 개념:** S3 + Amazon EventBridge — 고급 필터링 및 다중 대상 이벤트 라우팅

---

### Q5. A company needs to encrypt millions of unencrypted objects in an existing S3 bucket. Most efficient approach?

**한글 번역:** 회사가 기존 S3 버킷에 있는 수백만 개의 비암호화 객체를 암호화해야 합니다. 가장 효율적인 접근 방식은 무엇입니까?

**선지:**
- A) Write a script to download/encrypt/re-upload → 다운로드/암호화/재업로드 스크립트를 작성한다
- B) Use S3 Batch Operations → S3 Batch Operations를 사용한다
- C) Enable default encryption and wait → 기본 암호화를 활성화하고 기다린다
- D) Create a new bucket with encryption and copy all → 암호화된 새 버킷을 만들고 모두 복사한다

**정답:** B

**선지별 해설:**
- **A) 스크립트 작성:** 수백만 개의 객체를 다운로드/암호화/재업로드하는 커스텀 스크립트는 개발 시간이 많이 들고, 오류 처리, 재시도 로직, 병렬 처리 등을 직접 구현해야 합니다. 네트워크 비용(데이터 전송)도 발생합니다.
- **B) S3 Batch Operations (정답):** S3 Batch Operations는 수십억 개의 객체에 대해 대규모 작업을 효율적으로 수행하도록 설계된 기능입니다. COPY 작업으로 같은 버킷에 암호화를 적용하며 복사할 수 있습니다. 진행 상황 추적, 재시도, 완료 보고서를 자동으로 제공합니다.
- **C) 기본 암호화 활성화:** 기본 암호화를 활성화하면 새로 업로드되는 객체만 암호화됩니다. 이미 존재하는 비암호화 객체에는 소급 적용되지 않습니다.
- **D) 새 버킷에 복사:** 새 버킷을 만들어 복사하는 것은 가능하지만, 버킷 이름 변경, 모든 참조 업데이트 등 추가 작업이 필요합니다. S3 Batch Operations로 같은 버킷 내에서 처리하는 것이 더 효율적입니다.

**핵심 개념:** S3 Batch Operations — 대규모 객체에 대한 일괄 작업 (암호화, 태깅, 복사 등)

---

### Q6. A data analytics company wants to share a large dataset in S3 with partners. Company doesn't want to pay for partner's data transfer costs. What to configure?

**한글 번역:** 데이터 분석 회사가 S3의 대규모 데이터셋을 파트너와 공유하려고 합니다. 파트너의 데이터 전송 비용을 회사가 부담하고 싶지 않습니다. 무엇을 구성해야 합니까?

**선지:**
- A) S3 Cross-Region Replication → S3 교차 리전 복제
- B) S3 Requester Pays → S3 요청자 지불
- C) S3 Pre-Signed URLs → S3 사전 서명된 URL
- D) S3 Access Points → S3 액세스 포인트

**정답:** B

**선지별 해설:**
- **A) Cross-Region Replication:** CRR은 데이터를 다른 리전에 복제하는 기능으로, 비용 분담과는 관련이 없습니다. 오히려 복제 비용이 추가로 발생합니다.
- **B) S3 Requester Pays (정답):** Requester Pays 버킷을 설정하면 데이터 다운로드(전송) 비용이 요청자(파트너)에게 청구됩니다. 버킷 소유자는 저장 비용만 부담합니다. 파트너는 AWS 계정을 가지고 있어야 하며, 요청 시 인증이 필요합니다.
- **C) Pre-Signed URLs:** Pre-Signed URL은 임시 접근을 제공하지만, 데이터 전송 비용은 여전히 버킷 소유자에게 청구됩니다. 비용 전가 기능이 아닙니다.
- **D) S3 Access Points:** Access Points는 버킷에 대한 접근을 세분화하여 관리하는 기능입니다. 권한 관리에 유용하지만, 비용 분담 기능은 제공하지 않습니다.

**핵심 개념:** S3 Requester Pays — 데이터 전송 비용을 요청자에게 전가

---

### Q7. A company wants S3 Storage Lens with data retained for 15 months and published to CloudWatch. Which tier?

**한글 번역:** 회사가 15개월간 데이터를 보존하고 CloudWatch에 게시하는 S3 Storage Lens를 원합니다. 어떤 티어를 사용해야 합니까?

**선지:**
- A) Free Metrics → 무료 메트릭
- B) Advanced Metrics and Recommendations → 고급 메트릭 및 권장 사항
- C) S3 Analytics → S3 Analytics
- D) S3 Inventory → S3 Inventory

**정답:** B

**선지별 해설:**
- **A) Free Metrics:** 무료 티어는 28개의 사용량 메트릭을 제공하며, 데이터 보존 기간이 14일로 제한됩니다. 15개월 보존이나 CloudWatch 게시를 지원하지 않습니다.
- **B) Advanced Metrics and Recommendations (정답):** 고급 티어는 추가 비용이 발생하지만, 15개월 데이터 보존, CloudWatch 게시, 접두사 수준 메트릭, 활동 메트릭, 상세 상태 코드 메트릭 등 고급 기능을 제공합니다. 15개월 보존과 CloudWatch 게시 요구사항을 충족합니다.
- **C) S3 Analytics:** S3 Analytics는 스토리지 클래스 분석 도구로, Storage Lens와는 별개의 기능입니다. 접근 패턴을 분석하여 적절한 스토리지 클래스를 권장하지만, 조직 전체의 메트릭 대시보드는 제공하지 않습니다.
- **D) S3 Inventory:** S3 Inventory는 버킷 내 객체 목록과 메타데이터를 주기적으로 생성하는 보고서 기능입니다. Storage Lens의 메트릭/분석 기능과는 다른 용도입니다.

**핵심 개념:** S3 Storage Lens Advanced Tier — 15개월 보존, CloudWatch 게시, 고급 메트릭

---

### Q8. A company needs to upload large files from Asia to us-east-1. Maximize upload speed. Which TWO solutions?

**한글 번역:** 회사가 아시아에서 us-east-1로 대용량 파일을 업로드해야 합니다. 업로드 속도를 최대화하려면 어떤 두 가지 솔루션을 사용해야 합니까? (2개 선택)

**선지:**
- A) S3 Multi-Part Upload → S3 Multi-Part Upload (멀티파트 업로드)
- B) S3 Transfer Acceleration → S3 Transfer Acceleration
- C) S3 Byte-Range Fetches → S3 Byte-Range Fetches (바이트 범위 가져오기)
- D) S3 Requester Pays → S3 요청자 지불
- E) S3 Cross-Region Replication → S3 교차 리전 복제

**정답:** A, B

**선지별 해설:**
- **A) Multi-Part Upload (정답):** 대용량 파일을 여러 파트로 나누어 병렬로 업로드하여 처리량을 극대화합니다. 네트워크 대역폭을 최대한 활용할 수 있으며, 실패한 파트만 재전송할 수 있어 안정적입니다. 100MB 이상 파일에 권장됩니다.
- **B) S3 Transfer Acceleration (정답):** 아시아의 가장 가까운 CloudFront 엣지 로케이션을 통해 데이터를 수신하고, AWS의 최적화된 백본 네트워크를 통해 us-east-1의 S3 버킷으로 전송합니다. 장거리(아시아→미국) 전송에서 현저한 속도 향상을 제공합니다. Multi-Part Upload와 함께 사용 가능합니다.
- **C) Byte-Range Fetches:** Byte-Range Fetches는 다운로드(GET) 시 특정 바이트 범위만 가져오는 기능으로, 업로드 속도와는 관련이 없습니다.
- **D) Requester Pays:** Requester Pays는 비용 분담 기능으로, 업로드 속도와는 관련이 없습니다.
- **E) Cross-Region Replication:** CRR은 버킷 간 자동 복제 기능이며, 클라이언트에서 S3로의 업로드 속도를 개선하는 기능이 아닙니다.

**핵심 개념:** S3 Transfer Acceleration + Multi-Part Upload — 장거리 대용량 업로드 속도 최적화

---
