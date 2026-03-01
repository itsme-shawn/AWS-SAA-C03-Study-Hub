# Section 15 - Integration & Messaging 연습문제 해설

---

### Q1. E-commerce app processes orders. Each order must be processed by three separate services: inventory, payment, shipping. Each service must receive every order. What architecture?

**한글 번역:** 전자상거래 앱이 주문을 처리합니다. 각 주문은 재고, 결제, 배송의 세 가지 별도 서비스에서 처리되어야 합니다. 각 서비스는 모든 주문을 수신해야 합니다. 어떤 아키텍처를 사용해야 합니까?

**선지:**
- A) SQS with three consumers polling same queue → 동일한 큐를 폴링하는 세 개의 소비자가 있는 SQS
- B) SNS topic with three SQS queue subscriptions (Fan Out) → 세 개의 SQS 큐 구독이 있는 SNS 토픽 (팬아웃)
- C) Kinesis Data Streams with three consumers → 세 개의 소비자가 있는 Kinesis Data Streams
- D) Amazon MQ with three queue consumers → 세 개의 큐 소비자가 있는 Amazon MQ

**정답:** B

**선지별 해설:**
- **A) SQS with three consumers polling same queue:** SQS에서 하나의 큐를 여러 소비자가 폴링하면, 각 메시지는 하나의 소비자만 처리합니다(경쟁 소비자 패턴). "각 서비스가 모든 주문을 받아야 한다"는 요구사항을 충족하지 못합니다.
- **B) SNS topic + three SQS queues (Fan Out):** 정답입니다. SNS-SQS 팬아웃 패턴은 하나의 SNS 토픽에 메시지를 발행하면, 구독된 모든 SQS 큐에 메시지가 복사됩니다. 각 서비스가 자체 SQS 큐에서 독립적으로 모든 주문을 처리할 수 있습니다. 디커플링과 확장성 모두 충족하는 이상적인 아키텍처입니다.
- **C) Kinesis Data Streams with three consumers:** Kinesis는 실시간 스트리밍 데이터 처리에 적합하지만, 주문 처리와 같은 메시지 큐잉 패턴에는 SNS+SQS가 더 적합합니다. 샤드 관리, 데이터 보존 기간 등 불필요한 복잡성이 추가됩니다.
- **D) Amazon MQ with three queue consumers:** Amazon MQ는 기존 메시지 브로커(RabbitMQ, ActiveMQ) 마이그레이션용입니다. 새로운 클라우드 네이티브 애플리케이션에는 SNS/SQS가 권장됩니다. 또한 동일한 큐의 소비자는 SQS와 마찬가지로 경쟁 소비자 패턴이 됩니다.

**핵심 개념:** SNS + SQS Fan Out 패턴 — 하나의 메시지를 여러 서비스가 모두 수신해야 할 때

---

### Q2. Processing real-time clickstream data. Store for 7 days. Multiple consumers need to replay data. Which service?

**한글 번역:** 실시간 클릭스트림 데이터를 처리합니다. 7일간 저장해야 합니다. 여러 소비자가 데이터를 재생(replay)해야 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) SQS Standard Queue → SQS 표준 큐
- B) Amazon SNS → Amazon SNS
- C) Amazon Kinesis Data Streams → Amazon Kinesis Data Streams
- D) Amazon Data Firehose → Amazon Data Firehose

**정답:** C

**선지별 해설:**
- **A) SQS Standard Queue:** SQS는 메시지가 소비되면 삭제되므로 데이터 재생(replay)이 불가능합니다. 또한 메시지 보존 기간이 최대 14일이지만, 여러 소비자가 같은 데이터를 반복 읽는 것은 지원하지 않습니다.
- **B) Amazon SNS:** SNS는 메시지를 저장하지 않는 푸시 기반 서비스입니다. 메시지 보존이나 재생 기능이 없습니다.
- **C) Amazon Kinesis Data Streams:** 정답입니다. Kinesis Data Streams는 (1) 실시간 스트리밍 데이터 처리에 최적화되어 있고, (2) 기본 24시간에서 최대 365일까지 데이터 보존이 가능하며(7일 요구사항 충족), (3) 여러 소비자가 독립적으로 같은 데이터를 읽고 재생할 수 있습니다.
- **D) Amazon Data Firehose:** Firehose는 데이터를 S3, Redshift 등 대상으로 전달하는 서비스로, 데이터 저장이나 재생 기능이 없습니다. 소비자가 직접 데이터를 읽는 것이 아니라 대상으로 전달만 합니다.

**핵심 개념:** 실시간 스트리밍 + 데이터 보존 + 재생(replay) + 다중 소비자 = Kinesis Data Streams

---

### Q3. Company migrating app that uses RabbitMQ with AMQP protocol. Minimal code changes. Which service?

**한글 번역:** 회사가 AMQP 프로토콜로 RabbitMQ를 사용하는 앱을 마이그레이션합니다. 최소한의 코드 변경이 필요합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) Amazon SQS → Amazon SQS
- B) Amazon SNS → Amazon SNS
- C) Amazon Kinesis → Amazon Kinesis
- D) Amazon MQ → Amazon MQ

**정답:** D

**선지별 해설:**
- **A) Amazon SQS:** SQS는 AWS 네이티브 메시지 큐 서비스로, AMQP 프로토콜을 지원하지 않습니다. SQS로 마이그레이션하려면 코드를 상당히 변경해야 합니다.
- **B) Amazon SNS:** SNS는 Pub/Sub 서비스로, AMQP 프로토콜과 호환되지 않습니다. 코드 변경이 필수적입니다.
- **C) Amazon Kinesis:** Kinesis는 스트리밍 데이터 처리 서비스로, RabbitMQ/AMQP와는 완전히 다른 패러다임입니다. 대규모 코드 변경이 필요합니다.
- **D) Amazon MQ:** 정답입니다. Amazon MQ는 Apache ActiveMQ와 RabbitMQ를 관리형으로 제공하는 서비스입니다. RabbitMQ 엔진을 선택하면 AMQP, MQTT, STOMP 등 기존 프로토콜을 그대로 사용할 수 있어 최소한의 코드 변경으로 마이그레이션이 가능합니다. "기존 메시지 브로커 마이그레이션"이 키워드입니다.

**핵심 개념:** 기존 메시지 브로커(RabbitMQ/ActiveMQ) + AMQP/MQTT/STOMP + 최소 코드 변경 = Amazon MQ

---

### Q4. Load streaming data into S3 and Redshift. Minor transformations (CSV to JSON). Fully managed with automatic scaling. Which service?

**한글 번역:** S3와 Redshift로 스트리밍 데이터를 로드합니다. 사소한 변환(CSV에서 JSON으로)이 필요합니다. 완전 관리형이고 자동 확장이 됩니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) Kinesis Data Streams with Lambda → Lambda를 사용하는 Kinesis Data Streams
- B) Amazon Data Firehose with Lambda transformation → Lambda 변환을 사용하는 Amazon Data Firehose
- C) SQS with EC2 consumer → EC2 소비자를 사용하는 SQS
- D) SNS with S3 subscription → S3 구독을 사용하는 SNS

**정답:** B

**선지별 해설:**
- **A) Kinesis Data Streams with Lambda:** Kinesis Data Streams는 완전 관리형이 아닌 반관리형으로, 샤드 수를 직접 관리해야 합니다(On-Demand 모드 제외). S3와 Redshift로의 직접 전달 기능도 기본 제공하지 않으며, 추가 코드 작성이 필요합니다.
- **B) Amazon Data Firehose with Lambda transformation:** 정답입니다. Data Firehose(구 Kinesis Data Firehose)는 (1) S3, Redshift 등으로 직접 데이터를 전달하고, (2) Lambda를 이용한 데이터 변환(CSV→JSON)을 지원하며, (3) 완전 관리형으로 자동 확장됩니다. 모든 요구사항을 정확히 충족합니다.
- **C) SQS with EC2 consumer:** EC2 소비자는 관리형이 아니며 직접 확장을 관리해야 합니다. "완전 관리형 + 자동 확장" 요구사항에 부합하지 않습니다.
- **D) SNS with S3 subscription:** SNS는 S3를 구독 대상으로 직접 지원하지 않으며, 데이터 변환 기능도 없습니다. Redshift로의 전달도 지원하지 않습니다.

**핵심 개념:** 스트리밍 데이터 → S3/Redshift 전달 + 변환 + 완전 관리형 = Amazon Data Firehose

---

### Q5. Application uses SQS Standard Queue. Messages sometimes processed more than once, causing duplicates. Need exactly-once processing and ordering. What to do?

**한글 번역:** 애플리케이션이 SQS 표준 큐를 사용합니다. 메시지가 때때로 두 번 이상 처리되어 중복이 발생합니다. 정확히 한 번 처리(exactly-once)와 순서 보장이 필요합니다. 어떻게 해야 합니까?

**선지:**
- A) Enable Long Polling → 롱 폴링 활성화
- B) Increase Visibility Timeout → 가시성 타임아웃 증가
- C) Migrate to SQS FIFO Queue → SQS FIFO 큐로 마이그레이션
- D) Use SNS instead → 대신 SNS 사용

**정답:** C

**선지별 해설:**
- **A) Enable Long Polling:** 롱 폴링은 빈 응답을 줄여 API 호출 비용을 절감하는 기능입니다. 메시지 중복 처리나 순서 보장과는 무관합니다.
- **B) Increase Visibility Timeout:** 가시성 타임아웃을 늘리면 처리 중인 메시지가 다른 소비자에게 보이지 않는 시간이 길어지지만, 중복 전달 자체를 방지하지는 못합니다. SQS Standard Queue의 "at-least-once delivery" 특성은 변하지 않습니다.
- **C) Migrate to SQS FIFO Queue:** 정답입니다. SQS FIFO(First-In-First-Out) 큐는 (1) 정확히 한 번 처리(exactly-once processing)를 보장하고, (2) 메시지 순서(FIFO)를 보장합니다. 중복 제거와 순서 보장 두 가지 요구사항을 모두 충족합니다. 단, 처리량이 Standard보다 제한적입니다(초당 3,000건 또는 배치 시 30,000건).
- **D) Use SNS instead:** SNS는 Pub/Sub 서비스로, 메시지 큐잉 기능을 제공하지 않습니다. 중복 제거나 순서 보장과도 무관합니다.

**핵심 개념:** exactly-once 처리 + 메시지 순서 보장 = SQS FIFO Queue

---

### Q6. Consumers making too many empty API calls to SQS, increasing costs. How to reduce API calls?

**한글 번역:** 소비자가 SQS에 너무 많은 빈 API 호출을 수행하여 비용이 증가하고 있습니다. API 호출을 줄이는 방법은 무엇입니까?

**선지:**
- A) Increase message visibility timeout → 메시지 가시성 타임아웃 증가
- B) Enable Long Polling with WaitTimeSeconds of 20 seconds → WaitTimeSeconds를 20초로 설정하여 롱 폴링 활성화
- C) Use SQS FIFO instead → 대신 SQS FIFO 사용
- D) Decrease batch size to 1 → 배치 크기를 1로 줄임

**정답:** B

**선지별 해설:**
- **A) Increase message visibility timeout:** 가시성 타임아웃은 메시지 처리 중 다른 소비자에게 보이지 않는 시간을 설정합니다. 빈 API 호출 횟수와는 관련이 없습니다.
- **B) Enable Long Polling (WaitTimeSeconds=20):** 정답입니다. 롱 폴링을 활성화하면 큐에 메시지가 없을 때 최대 20초까지 대기한 후 응답합니다. 빈 응답(empty responses)을 크게 줄여 API 호출 횟수와 비용을 절감합니다. WaitTimeSeconds 최대값인 20초가 가장 효과적입니다. 기본값인 Short Polling(0초)은 즉시 빈 응답을 반환하므로 불필요한 호출이 많아집니다.
- **C) Use SQS FIFO instead:** FIFO 큐로 변경하는 것은 순서 보장과 중복 제거를 위한 것이며, 빈 API 호출 문제와는 관련이 없습니다.
- **D) Decrease batch size to 1:** 배치 크기를 줄이면 오히려 API 호출 횟수가 증가합니다. 비용을 줄이는 것이 아니라 늘리는 방향입니다.

**핵심 개념:** SQS 빈 API 호출 비용 절감 = Long Polling (WaitTimeSeconds 1~20초)

---

### Q7. S3 event notifications to three different SQS queues for parallel processing. For a specific event type/prefix combination, S3 only supports one event rule. How?

**한글 번역:** 병렬 처리를 위해 세 개의 다른 SQS 큐로 S3 이벤트 알림을 보내야 합니다. 특정 이벤트 유형/접두사 조합에 대해 S3는 하나의 이벤트 규칙만 지원합니다. 어떻게 해야 합니까?

**선지:**
- A) Create three separate S3 event rules → 세 개의 별도 S3 이벤트 규칙 생성
- B) Use S3 event notification to SNS topic which fans out to three SQS queues → S3 이벤트 알림을 SNS 토픽으로 보내고 세 개의 SQS 큐로 팬아웃
- C) Use Lambda triggered by S3 to send to three queues → S3에 의해 트리거되는 Lambda를 사용하여 세 개의 큐로 전송
- D) Use EventBridge to route S3 events → EventBridge를 사용하여 S3 이벤트 라우팅

**정답:** B

**선지별 해설:**
- **A) Create three separate S3 event rules:** 문제에서 명시적으로 동일한 이벤트 유형/접두사 조합에 대해 S3는 하나의 이벤트 규칙만 지원한다고 했습니다. 세 개의 별도 규칙을 생성할 수 없습니다.
- **B) S3 event → SNS topic → three SQS queues (Fan Out):** 정답입니다. S3 이벤트 알림을 하나의 SNS 토픽으로 보내고, 해당 SNS 토픽에 세 개의 SQS 큐를 구독시키면 팬아웃 패턴으로 모든 큐가 동일한 이벤트를 수신합니다. 하나의 S3 이벤트 규칙으로 여러 대상에 메시지를 전달하는 표준 패턴입니다.
- **C) Lambda triggered by S3 to send to three queues:** Lambda를 사용하면 기술적으로는 가능하지만, SNS 팬아웃에 비해 추가 코드 작성과 관리가 필요합니다. Lambda 함수 오류, 동시성 제한 등의 고려사항도 있어 최적 솔루션이 아닙니다.
- **D) EventBridge to route S3 events:** EventBridge도 S3 이벤트를 여러 대상으로 라우팅할 수 있지만, 이 시나리오에서는 SNS+SQS 팬아웃이 가장 간단하고 표준적인 패턴입니다. 시험에서는 SNS 팬아웃이 정답으로 출제됩니다.

**핵심 개념:** S3 이벤트 → SNS → 다중 SQS 큐 (Fan Out 패턴)
