# AWS Integration & Messaging (SQS, SNS, Kinesis)

## 개요
애플리케이션 간 통신을 위한 디커플링(Decoupling) 서비스들을 다룬다. SQS(큐 모델), SNS(Pub/Sub 모델), Kinesis(실시간 스트리밍)는 시험에서 매우 빈번하게 출제되며, 세 서비스의 차이점과 적합한 사용 사례를 구분하는 것이 핵심이다.

## 핵심 개념

### 동기 vs 비동기 통신

```text
 동기 (Synchronous)                    비동기 (Asynchronous)
 ─────────────────────                 ─────────────────────
 ┌─────┐     ┌─────┐                  ┌─────┐  ┌─────┐  ┌─────┐
 │App A│────▶│App B│                  │App A│─▶│Queue│─▶│App B│
 └─────┘     └─────┘                  └─────┘  │/Topic│  └─────┘
    │           │                               └─────┘
    │  장애 시  │                         ✓ 디커플링
    │  전파됨!  │                         ✓ 트래픽 급증 흡수
    ▼           ▼                         ✓ 독립적 스케일링
  ╳ 장애      ╳ 장애

 SQS = Queue 모델    SNS = Pub/Sub 모델    Kinesis = Streaming 모델
```

- **동기(Synchronous)**: 애플리케이션 -> 애플리케이션 (직접 호출)
- **비동기(Asynchronous/Event-based)**: 애플리케이션 -> 큐 -> 애플리케이션
- 갑작스런 트래픽 급증 시 동기 방식은 문제가 됨 -> 디커플링 필요

### Amazon SQS (Simple Queue Service)

#### Standard Queue
- 10년 이상된 AWS 최초 서비스 중 하나, 완전 관리형
- **무제한 처리량**, 큐에 무제한 메시지 수
- 메시지 보존: 기본 4일, 최대 14일
- 저지연: 발행/수신 < 10ms
- 메시지 크기 제한: **최대 1,024 KB (1 MB)**
- **중복 메시지 가능** (at least once delivery)
- **순서 보장 없음** (best effort ordering)

#### FIFO Queue

```text
 SQS FIFO 순서 보장 흐름 (Message Group ID)

 Producer                    SQS FIFO Queue                  Consumer
 ────────                    ──────────────                  ────────
 Msg1 (Group=A) ──┐     ┌──────────────────────┐
 Msg2 (Group=A) ──┤     │ Group A: [1] [2] [3] │──순서대로──▶ Consumer A
 Msg3 (Group=A) ──┘     │                      │
                         │                      │
 Msg1 (Group=B) ──┐     │ Group B: [1] [2]     │──순서대로──▶ Consumer B
 Msg2 (Group=B) ──┘     └──────────────────────┘

 ✓ 같은 Group ID 내에서 순서 보장 (FIFO)
 ✓ Deduplication ID로 중복 제거 (Exactly-once)
 ✓ 다른 Group ID는 병렬 처리 가능
```

- **선입선출 순서 보장**
- 처리량 제한: 배치 없이 300 msg/s, 배치 시 3,000 msg/s
- **Exactly-once 전송** (Deduplication ID로 중복 제거)
- **Message Group ID**로 그룹 내 순서 보장 (필수 파라미터)

#### 메시지 생산/소비
- **Producer**: SDK의 SendMessage API로 메시지 전송
- **Consumer**: Poll 방식으로 메시지 수신 (최대 10개씩), 처리 후 DeleteMessage API로 삭제
- Consumer를 수평 확장하여 처리량 증가 가능

#### SQS + Auto Scaling Group
- CloudWatch Metric **ApproximateNumberOfMessages** (큐에 쌓인 메시지 수) 모니터링
- 큐가 길어지면 CloudWatch Alarm → ASG(Auto Scaling Group)가 EC2 인스턴스를 추가하여 처리 속도를 높임

#### SQS as Buffer to Database Writes (SQS를 DB 쓰기 버퍼로 사용)
> **왜 필요한가?** 이벤트 발생 시 수천 개의 요청이 동시에 DB에 쓰려 하면 DB가 감당하지 못해 요청이 실패할 수 있다. SQS를 사이에 두면 요청이 큐에 쌓이고, Consumer가 DB가 감당할 속도로 꺼내서 처리하므로 데이터 유실 없이 안정적으로 처리된다.

- 직접 DB에 쓰면 부하 시 트랜잭션 유실 가능
- SQS를 버퍼(완충재)로 사용하여 안정적으로 처리

#### 보안
- **전송 중 암호화**: HTTPS API
- **저장 시 암호화**: KMS 키
- **클라이언트 측 암호화**: 직접 수행
- **IAM 정책**: SQS API 접근 제어
- **SQS Access Policy**: 크로스 계정 접근, 다른 서비스(SNS, S3)의 SQS 쓰기 허용

#### Message Visibility Timeout (메시지 가시성 타임아웃)
> **직관적 비유:** 도서관 대출 시스템을 생각하자. 누군가 책을 대출(poll)하면 그 책은 다른 사람에게 "대출 중"으로 표시된다. 30초 안에 반납(삭제)하지 않으면 다시 "반납"된 것으로 표시되어 다른 사람이 빌릴 수 있다. 처리가 긴 작업은 "ChangeMessageVisibility"로 대출 기간을 연장해야 한다.

- Consumer가 메시지를 poll(수신)하면 해당 메시지는 다른 Consumer에게 **비가시(보이지 않음)** 상태가 됨 (기본 30초)
- 시간 내에 처리 완료 후 DeleteMessage를 호출하지 않으면 다시 가시화되어 중복 처리 가능
- **ChangeMessageVisibility API**로 처리 중 타임아웃 시간 연장 가능
- 너무 길면 장애 시 다른 Consumer가 재처리하기까지 오래 기다려야 함, 너무 짧으면 중복 처리 발생

#### Long Polling
- 큐에 메시지가 없으면 메시지 도착을 **대기** (1~20초, 20초 권장)
- API 호출 수 감소, 효율성 증가, 지연 감소
- 큐 레벨 또는 API 레벨(WaitTimeSeconds)에서 설정

### Amazon SNS (Simple Notification Service)

#### 기본 개념
- **Pub/Sub 모델**: 하나의 메시지를 다수의 수신자에게 전송
- 최대 **12,500,000 구독/토픽**, **100,000 토픽** 제한
- 구독자: SQS, Lambda, Kinesis Data Firehose, Email, SMS, HTTP(S) Endpoint

#### SNS + SQS: Fan Out 패턴
> **왜 필요한가?** 주문 하나가 발생했을 때 재고 관리, 결제, 배송 알림 세 곳에 동시에 알려야 한다고 하자. Producer가 세 곳에 각각 메시지를 보내면 코드가 복잡하고, 한 곳이 실패하면 나머지도 영향을 받을 수 있다. Fan Out 패턴은 SNS 토픽에 한 번만 보내면(Publish) SNS가 구독 중인 모든 SQS 큐에 자동으로 전달해준다. 각 SQS 큐는 독립적으로 처리하므로 서로 영향을 주지 않는다.

```text
                              ┌──────────┐    ┌──────────────┐
                         ┌───▶│  SQS #1  │───▶│ 재고 관리     │
                         │    └──────────┘    └──────────────┘
 ┌──────────┐    ┌───────┴──┐
 │ Producer │───▶│   SNS    │ ┌──────────┐    ┌──────────────┐
 │ (1번     │    │  Topic   │─▶│  SQS #2  │───▶│ 결제 처리     │
 │ publish) │    │          │ └──────────┘    └──────────────┘
 └──────────┘    └───────┬──┘
                         │    ┌──────────┐    ┌──────────────┐
                         └───▶│  SQS #3  │───▶│ 배송 알림     │
                              └──────────┘    └──────────────┘

 S3 이벤트 Fan Out 예시:
 ┌────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
 │ S3 │───▶│ SNS Topic│───▶│  SQS #1  │───▶│ 이미지 처리   │
 │Event│    │          │───▶│  SQS #2  │───▶│ 메타데이터    │
 └────┘    └──────────┘───▶│  Lambda  │───▶│ 알림 전송     │
                           └──────────┘    └──────────────┘
```

- SNS에 1번 publish(발행) -> 구독된 모든 SQS 큐로 전달
- 완전 디커플링, 데이터 유실 없음
- SQS의 데이터 영속성, 지연 처리, 재시도 활용
- Cross-Region Delivery 지원
- **S3 이벤트**: 동일 이벤트 타입+프리픽스에 하나의 규칙만 가능 -> Fan Out으로 여러 큐에 전달

#### SNS FIFO Topic
- SQS FIFO와 유사: Message Group ID로 순서 보장, Deduplication
- SQS Standard/FIFO 큐를 구독자로 사용 가능
- 처리량 제한 (SQS FIFO와 동일)
- **Fan Out + 순서 보장 + 중복 제거**: SNS FIFO + SQS FIFO 조합

#### SNS Message Filtering
- **Filter Policy (JSON)**: 구독별로 수신할 메시지 필터링
- Filter Policy가 없으면 모든 메시지 수신

#### 보안
- SQS와 동일: HTTPS, KMS, 클라이언트 측 암호화, IAM, SNS Access Policy

### 언제 무엇을 쓰는가? (SQS / SNS / Kinesis 한눈에 비교)
| 상황 | 선택 |
|------|------|
| 작업 목록을 큐에 넣고 Worker가 하나씩 처리 | SQS |
| 하나의 이벤트를 여러 구독자에게 동시 전달 | SNS |
| 클릭 로그 / 센서 데이터 등 실시간 스트리밍 | Kinesis Data Streams |
| 실시간 데이터를 S3 / Redshift에 자동으로 저장 | Kinesis Data Firehose |
| SNS 메시지를 여러 SQS에 동시 전달 (Fan Out) | SNS + SQS |

---

### Amazon Kinesis Data Streams
- 실시간 데이터 스트리밍 수집 및 저장
- 보존 기간: 최대 365일, **데이터 재처리(replay) 가능**
- 데이터 만료 전 삭제 불가
- **Partition ID**가 같은 데이터의 순서 보장
- KMS 저장 암호화, HTTPS 전송 암호화

#### 용량 모드
- **Provisioned**: 샤드 수 선택, 샤드당 1MB/s 입력 + 2MB/s 출력, 수동 스케일링
- **On-demand**: 자동 용량 관리, 기본 4MB/s 입력, 최근 30일 피크 기반 자동 스케일링

### Amazon Data Firehose (구 Kinesis Data Firehose)
> **Kinesis Data Streams와의 차이:** Data Streams는 데이터를 저장하고 여러 Consumer가 직접 읽는 "파이프"라면, Firehose는 데이터를 받자마자 목적지(S3 등)에 자동으로 배달해주는 "배달부"다. Consumer 코드를 짤 필요 없고, 데이터를 저장·재처리할 필요도 없는 단순 배달 목적에 적합하다.

- 완전 관리형 스트리밍 데이터 로드 서비스 (코드 없이 스트리밍 데이터를 목적지로 전달)
- 대상: S3, Redshift, OpenSearch, Splunk, MongoDB, Datadog, HTTP Endpoint
- 자동 스케일링, 서버리스, 사용량 기반 과금
- **Near Real-Time (거의 실시간)** (일정 크기 또는 시간이 차야 배치로 전송 — 즉시 전송이 아님)
- Lambda로 커스텀 데이터 변환 가능 (CSV -> JSON 등)
- **데이터 저장 없음**, **재처리 불가** (한 번 보내면 끝, 다시 읽을 수 없음)

### Kinesis Data Streams vs Data Firehose

```text
 Kinesis Data Streams                    Amazon Data Firehose
 ─────────────────────                   ─────────────────────
 ┌──────────┐  ┌───────────────┐         ┌──────────┐  ┌───────────────┐
 │Producers │─▶│  Data Streams │         │Producers │─▶│   Firehose    │
 │(SDK,     │  │  ┌─────────┐  │         │(SDK,     │  │               │
 │ Agent,   │  │  │ Shard 1 │  │──▶      │ Streams, │  │  [버퍼링]     │
 │ Kinesis) │  │  │ Shard 2 │  │ Consumers│ etc.)   │  │  (크기/시간)  │
 └──────────┘  │  │ Shard N │  │         └──────────┘  │               │
               │  └─────────┘  │                       │  [Lambda 변환]│
               │               │                       │               │
               │ 최대 365일 보존│                       │  저장 없음    │
               │ Replay 가능   │                       │  Replay 불가  │
               └───────────────┘                       └───────┬───────┘
                      │                                        │
                      ▼                                        ▼
               ┌─────────────┐                    ┌─────────────────────┐
               │  Consumer   │                    │ S3 / Redshift /     │
               │  (Lambda,   │                    │ OpenSearch / Splunk │
               │   KCL, SDK) │                    │ HTTP Endpoint       │
               └─────────────┘                    └─────────────────────┘

               Real-time                          Near Real-time
```

| Kinesis Data Streams | Amazon Data Firehose |
|---------------------|---------------------|
| 스트리밍 데이터 수집 | 스트리밍 데이터 로드 (S3/Redshift 등) |
| Producer/Consumer 코드 작성 | 완전 관리형 |
| Real-time | Near real-time |
| Provisioned/On-demand | 자동 스케일링 |
| 최대 365일 데이터 저장 | 데이터 저장 없음 |
| Replay 가능 | Replay 불가 |

### Amazon MQ
- 온프레미스에서 MQTT, AMQP, STOMP 등 오픈 프로토콜을 사용하는 기존 애플리케이션을 위한 관리형 메시지 브로커
- SQS/SNS로 재설계하지 않고 클라우드로 마이그레이션할 때 사용
- SQS/SNS만큼 확장되지 않음
- 서버에서 실행, **Multi-AZ + 장애 조치** (Active/Standby, EFS 스토리지)
- 큐 기능(~SQS) + 토픽 기능(~SNS) 모두 제공

## 시험 포인트
- SQS Standard: 무제한 처리량, 중복/순서 없음 vs FIFO: 순서 보장, 300/3000 msg/s
- **Fan Out 패턴**: SNS + SQS = 하나의 메시지를 여러 서비스에 전달
- **S3 이벤트를 여러 대상에 전달**: SNS Fan Out 사용
- Kinesis Data Streams: **실시간, 재처리 가능, 데이터 보존**
- Data Firehose: **Near real-time, 재처리 불가, S3/Redshift 로드**
- **Amazon MQ**: 기존 온프레미스 앱이 MQTT/AMQP 등 사용 시 마이그레이션용
- SQS 큐 길이 기반 Auto Scaling: ApproximateNumberOfMessages 메트릭
- Long Polling은 Short Polling보다 항상 선호

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| SQS Standard | 무제한 처리량, at-least-once, best-effort 순서 |
| SQS FIFO | 순서 보장, exactly-once, 300/3000 msg/s |
| SNS | Pub/Sub, 12.5M 구독/토픽, 100K 토픽 |
| SNS + SQS Fan Out | 1 메시지 -> 다수 SQS 큐 전달 |
| SNS FIFO + SQS FIFO | Fan Out + 순서 + 중복 제거 |
| SNS Message Filtering | JSON Filter Policy로 구독별 필터링 |
| Kinesis Data Streams | 실시간 스트리밍, 재처리 가능, 최대 365일 보존 |
| Data Firehose | Near real-time, S3/Redshift 로드, 관리형 |
| Amazon MQ | MQTT/AMQP 호환 관리형 브로커, Multi-AZ |
| Long Polling | 1-20초 대기, API 호출 감소, 효율 향상 |
| Visibility Timeout | 기본 30초, 중복 처리 방지 |

---

## Practice Questions

### Q1. A company has an e-commerce application that processes orders. When a new order is placed, it must be processed by three separate services: inventory management, payment processing, and shipping notification. Each service must receive every order. What architecture should the solutions architect recommend?
**Options:**
- A) Use Amazon SQS with three consumers polling the same queue
- B) Use Amazon SNS topic with three SQS queue subscriptions (Fan Out pattern)
- C) Use Amazon Kinesis Data Streams with three consumers
- D) Use Amazon MQ with three queue consumers

**Answer:** B

**해설:**

> **문제:** 회사에 주문을 처리하는 전자상거래 애플리케이션이 있다. 새 주문이 접수되면 재고 관리, 결제 처리, 배송 알림의 세 가지 별도 서비스가 처리해야 한다. 각 서비스는 모든 주문을 수신해야 한다. 솔루션 아키텍트는 어떤 아키텍처를 추천해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 같은 큐를 폴링하는 3개의 Consumer가 있는 Amazon SQS 사용 |
| B | 3개의 SQS 큐 구독이 있는 Amazon SNS 토픽 사용 (Fan Out 패턴) |
| C | 3개의 Consumer가 있는 Amazon Kinesis Data Streams 사용 |
| D | 3개의 큐 Consumer가 있는 Amazon MQ 사용 |

**상세 풀이:** SNS + SQS Fan Out 패턴을 사용하면 SNS 토픽에 한 번 publish하고 구독된 3개의 SQS 큐 모두 메시지를 수신하므로 정답은 B이다. A의 SQS 하나에 3개 Consumer를 두면 각 메시지가 하나의 Consumer에만 전달되므로 "각 서비스가 모든 주문을 수신"하는 요구사항을 충족하지 못한다. C의 Kinesis도 가능하지만 이 단순한 메시지 전달 시나리오에서는 SNS+SQS가 더 적합하고 비용 효율적이다. D의 Amazon MQ는 확장성이 SQS/SNS보다 낮으며 레거시 프로토콜 마이그레이션용이다.

**핵심 개념:** SNS + SQS Fan Out 패턴

### Q2. A company is processing real-time clickstream data from their website. They need to store the data for 7 days and allow multiple consumers to replay the data for analysis. Which service should they use?
**Options:**
- A) Amazon SQS Standard Queue
- B) Amazon SNS
- C) Amazon Kinesis Data Streams
- D) Amazon Data Firehose

**Answer:** C

**해설:**

> **문제:** 회사가 웹사이트에서 실시간 클릭스트림 데이터를 처리하고 있다. 데이터를 7일 동안 저장하고 여러 Consumer가 분석을 위해 데이터를 재처리(replay)할 수 있어야 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon SQS Standard Queue |
| B | Amazon SNS |
| C | Amazon Kinesis Data Streams |
| D | Amazon Data Firehose |

**상세 풀이:** Kinesis Data Streams는 최대 365일 데이터 보존, 실시간 처리, 데이터 재처리(replay) 기능을 제공하므로 정답은 C이다. A의 SQS는 메시지가 소비 후 삭제되어 replay가 불가능하다. B의 SNS는 데이터를 저장하지 않으므로 7일 보존과 replay 요구사항을 충족하지 못한다. D의 Data Firehose는 데이터를 저장하지 않으며 replay를 지원하지 않는 Near real-time 로드 서비스이다.

**핵심 개념:** Kinesis Data Streams, 데이터 보존, Replay

### Q3. A company wants to migrate their on-premises application to AWS. The application uses RabbitMQ with AMQP protocol. The company wants minimal code changes. Which AWS service should they use?
**Options:**
- A) Amazon SQS
- B) Amazon SNS
- C) Amazon Kinesis
- D) Amazon MQ

**Answer:** D

**해설:**

> **문제:** 회사가 온프레미스 애플리케이션을 AWS로 마이그레이션하려 한다. 이 애플리케이션은 AMQP 프로토콜로 RabbitMQ를 사용한다. 회사는 최소한의 코드 변경을 원한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon SQS |
| B | Amazon SNS |
| C | Amazon Kinesis |
| D | Amazon MQ |

**상세 풀이:** Amazon MQ는 AMQP, MQTT, STOMP 등 오픈 프로토콜을 지원하는 관리형 메시지 브로커로, 기존 온프레미스 RabbitMQ 애플리케이션을 코드 변경 없이 마이그레이션할 수 있으므로 정답은 D이다. A의 SQS와 B의 SNS는 AWS 고유 프로토콜/API를 사용하므로 AMQP를 지원하지 않아 코드 재작성이 필요하다. C의 Kinesis는 실시간 스트리밍 서비스로 메시지 큐 대체 용도가 아니며 AMQP를 지원하지 않는다.

**핵심 개념:** Amazon MQ, 오픈 프로토콜 마이그레이션

### Q4. A company wants to load streaming data into Amazon S3 and Amazon Redshift. The data needs minor transformations (CSV to JSON). The solution must be fully managed with automatic scaling. Which service should they use?
**Options:**
- A) Amazon Kinesis Data Streams with Lambda consumer
- B) Amazon Data Firehose with Lambda transformation
- C) Amazon SQS with EC2-based consumer application
- D) Amazon SNS with S3 subscription

**Answer:** B

**해설:**

> **문제:** 회사가 스트리밍 데이터를 Amazon S3와 Amazon Redshift에 로드하려 한다. 데이터에 간단한 변환(CSV에서 JSON)이 필요하다. 솔루션은 자동 스케일링이 가능한 완전 관리형이어야 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Lambda Consumer가 있는 Amazon Kinesis Data Streams |
| B | Lambda 변환이 있는 Amazon Data Firehose |
| C | EC2 기반 Consumer 애플리케이션이 있는 Amazon SQS |
| D | S3 구독이 있는 Amazon SNS |

**상세 풀이:** Amazon Data Firehose는 완전 관리형으로 S3, Redshift, OpenSearch 등에 스트리밍 데이터를 로드할 수 있으며, Lambda를 사용한 커스텀 데이터 변환(CSV->JSON)을 지원하고, 자동 스케일링과 서버리스이므로 정답은 B이다. A의 Kinesis Data Streams + Lambda는 Consumer 코드를 직접 관리해야 하므로 "완전 관리형" 요구사항에 부합하지 않는다. C의 SQS + EC2는 서버 관리가 필요하다. D의 SNS는 S3에 직접 스트리밍 데이터를 로드하는 기능이 없다.

**핵심 개념:** Amazon Data Firehose, Lambda 변환, 서버리스

### Q5. An application uses Amazon SQS Standard Queue. Messages are sometimes processed more than once, causing duplicate records in the database. The company needs messages to be processed exactly once and in order. What should they do?
**Options:**
- A) Enable Long Polling on the SQS Standard Queue
- B) Increase the Visibility Timeout to prevent duplicates
- C) Migrate to an SQS FIFO Queue
- D) Use SNS instead of SQS

**Answer:** C

**해설:**

> **문제:** 애플리케이션이 Amazon SQS Standard Queue를 사용하고 있다. 메시지가 때때로 두 번 이상 처리되어 데이터베이스에 중복 레코드가 발생한다. 회사는 메시지가 정확히 한 번만, 순서대로 처리되어야 한다. 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | SQS Standard Queue에서 Long Polling 활성화 |
| B | 중복 방지를 위해 Visibility Timeout 증가 |
| C | SQS FIFO Queue로 마이그레이션 |
| D | SQS 대신 SNS 사용 |

**상세 풀이:** SQS FIFO 큐는 exactly-once 전송(Deduplication ID로 중복 제거)과 순서 보장을 제공하므로 정답은 C이다. A의 Long Polling은 빈 응답의 API 호출을 줄이는 기능으로 중복 처리나 순서 보장과는 무관하다. B의 Visibility Timeout 증가는 중복 가능성을 줄일 수 있지만 완전히 제거하지 못하며 순서도 보장하지 않는다. D의 SNS는 Pub/Sub 모델로 큐 기능이 아니며 exactly-once 처리를 보장하지 않는다.

**핵심 개념:** SQS FIFO, Exactly-once, 순서 보장

### Q6. A development team is using Amazon SQS. Consumers are making too many empty API calls, increasing costs. What should the team implement to reduce the number of API calls?
**Options:**
- A) Increase the message visibility timeout
- B) Enable Long Polling with WaitTimeSeconds of 20 seconds
- C) Use SQS FIFO Queue instead
- D) Decrease the batch size to 1 message

**Answer:** B

**해설:**

> **문제:** 개발팀이 Amazon SQS를 사용하고 있다. Consumer가 너무 많은 빈 API 호출을 하여 비용이 증가하고 있다. 팀이 API 호출 수를 줄이기 위해 무엇을 구현해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 메시지 Visibility Timeout 증가 |
| B | WaitTimeSeconds 20초로 Long Polling 활성화 |
| C | SQS FIFO Queue로 전환 |
| D | 배치 크기를 1개 메시지로 줄이기 |

**상세 풀이:** Long Polling은 큐에 메시지가 없을 때 메시지 도착을 대기(1-20초)하므로 빈 응답(empty receive)에 대한 API 호출 수를 크게 줄여 정답은 B이다. 20초가 권장값이다. A의 Visibility Timeout은 메시지가 다른 Consumer에게 보이지 않는 시간 설정으로 API 호출 수와는 무관하다. C의 FIFO Queue 전환은 순서 보장/중복 제거를 위한 것이며 빈 API 호출 문제를 해결하지 않는다. D의 배치 크기를 1로 줄이면 오히려 API 호출이 증가한다.

**핵심 개념:** SQS Long Polling, WaitTimeSeconds

### Q7. A company receives S3 event notifications when objects are created. They need to send each event to three different SQS queues for parallel processing. For a specific event type and prefix combination, S3 only supports one event rule. How should this be designed?
**Options:**
- A) Create three separate S3 event notification rules for each queue
- B) Use S3 event notification to send to an SNS topic, which fans out to three SQS queues
- C) Use Lambda function triggered by S3 to send messages to three queues
- D) Use Amazon EventBridge to route S3 events to three queues

**Answer:** B

**해설:**

> **문제:** 회사가 객체 생성 시 S3 이벤트 알림을 받고 있다. 각 이벤트를 병렬 처리를 위해 3개의 서로 다른 SQS 큐에 보내야 한다. 특정 이벤트 타입과 프리픽스 조합에 대해 S3는 하나의 이벤트 규칙만 지원한다. 어떻게 설계해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 각 큐에 대해 3개의 별도 S3 이벤트 알림 규칙 생성 |
| B | S3 이벤트 알림을 SNS 토픽으로 보내고, 3개의 SQS 큐로 Fan Out |
| C | S3에 의해 트리거되는 Lambda 함수를 사용하여 3개의 큐에 메시지 전송 |
| D | Amazon EventBridge를 사용하여 S3 이벤트를 3개의 큐로 라우팅 |

**상세 풀이:** 동일 이벤트 타입+프리픽스 조합에 S3 이벤트 규칙은 하나만 가능하므로, SNS 토픽으로 보낸 후 3개의 SQS 큐를 구독시키는 Fan Out 패턴이 가장 적합하여 정답은 B이다. A는 동일 이벤트 타입+프리픽스 조합에 3개 규칙을 만들 수 없으므로 기술적으로 불가능하다. C의 Lambda 방식도 가능하지만 Lambda 코드를 관리해야 하는 추가 복잡성이 있다. D의 EventBridge도 가능하지만 SNS Fan Out이 이 패턴에서 가장 일반적이고 단순한 솔루션이다.

**핵심 개념:** S3 Events + SNS Fan Out
