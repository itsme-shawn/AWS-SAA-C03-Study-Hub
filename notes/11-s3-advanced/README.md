# Amazon S3 - Advanced

## 개요
S3의 고급 기능을 다루는 섹션으로, Lifecycle Rules, 성능 최적화, 이벤트 알림, Batch Operations, Storage Lens 등을 포함한다. SAA-C03 시험에서 Lifecycle Rules 시나리오, S3 성능 관련 수치, EventBridge 통합이 자주 출제된다.

## 핵심 개념

### S3 Lifecycle Rules (수명주기 규칙)

```text
[ S3 Lifecycle 전환 흐름 ]

  ┌────────────┐     ┌──────────────┐     ┌───────────────────┐
  │  Standard   │────▶│ Standard-IA   │────▶│ Intelligent-      │
  │             │     │              │     │ Tiering           │
  └────────────┘     └──────────────┘     └─────────┬─────────┘
                                                    │
                                                    ▼
                                          ┌───────────────────┐
                                          │  One Zone-IA       │
                                          └─────────┬─────────┘
                                                    │
                                                    ▼
                                          ┌───────────────────┐
                                          │ Glacier Instant    │
                                          │ Retrieval          │
                                          └─────────┬─────────┘
                                                    │
                                                    ▼
                                          ┌───────────────────┐
                                          │ Glacier Flexible   │
                                          │ Retrieval          │
                                          └─────────┬─────────┘
                                                    │
                                                    ▼
                                          ┌───────────────────┐
                                          │ Glacier Deep       │
                                          │ Archive            │
                                          └───────────────────┘

  * Transition Action: 클래스 간 자동 이동 (위에서 아래로만)
  * Expiration Action: 일정 기간 후 객체 삭제
```

#### 스토리지 클래스 간 이동
- Standard -> Standard IA -> Intelligent-Tiering -> One-Zone IA -> Glacier Instant -> Glacier Flexible -> Glacier Deep Archive

#### Transition Actions (전환 작업)
- 객체를 다른 스토리지 클래스로 이동하도록 설정
- 예: 생성 후 60일에 Standard IA(비용이 낮지만 읽기 빈도가 낮을 때 적합)로 이동, 6개월 후 Glacier(장기 아카이브용)로 이동
- **왜 필요한가?** 파일을 처음엔 자주 조회하다 시간이 지날수록 조회가 줄어드는 경우, 비싼 Standard 클래스에 계속 두는 것은 낭비다. Lifecycle Rule을 설정하면 자동으로 저렴한 클래스로 이동시켜 비용을 절감할 수 있다.

#### Expiration Actions (만료 작업)
- 일정 기간 후 객체 삭제
- 액세스 로그 파일: 365일 후 삭제
- 이전 버전의 파일 삭제 (버저닝 활성화 시)
- **불완전한 Multi-Part Upload 삭제**

#### 규칙 범위
- 특정 **접두사** (prefix)에 적용: `s3://mybucket/mp3/*`
- 특정 **객체 태그**에 적용: `Department: Finance`

### Lifecycle Rules 시나리오

#### 시나리오 1: 이미지 썸네일
- **원본 이미지**: S3 Standard -> 60일 후 Glacier로 전환 (6시간 내 검색 허용)
- **썸네일**: One-Zone IA -> 60일 후 삭제 (재생성 가능하므로)

#### 시나리오 2: 삭제된 객체 복구
- S3 Versioning 활성화
- 삭제된 객체: "delete marker"로 숨김 -> 즉시 복구 가능
- **비현행 버전** -> Standard IA로 전환 (30일간 즉시 복구)
- 이후 Glacier Deep Archive로 전환 (48시간 내 복구, 365일까지)

### S3 Analytics - Storage Class Analysis
- 적절한 스토리지 클래스로 전환할 시기를 결정하는 데 도움
- **Standard 및 Standard IA**에 대한 추천 제공
- **One-Zone IA 또는 Glacier에는 작동하지 않음**
- 보고서 매일 업데이트
- 데이터 분석 시작까지 **24~48시간** 소요
- Lifecycle Rules 설정의 첫 단계로 활용

### S3 Requester Pays (요청자 지불)
> **직관적 비유:** 도서관 책을 빌릴 때 보통은 도서관(버킷 소유자)이 배송비를 부담한다. Requester Pays는 "택배비는 빌리는 사람이 내세요"라고 설정하는 것이다. 대용량 공공 데이터셋(수십 TB 규모)을 여러 파트너와 공유할 때 비용을 분담할 수 있다.

- 기본: 버킷 소유자가 스토리지 + 데이터 전송 비용 지불
- Requester Pays: **요청자**가 요청 및 데이터 다운로드 비용 지불
- 대용량 데이터셋 공유에 유용
- **요청자는 AWS에 인증되어야 함** (익명 불가) — 익명 사용자에게 비용을 청구할 수 없으므로

### S3 Event Notifications (이벤트 알림)

```text
[ S3 Event Notification 흐름 ]

                          ┌──────────┐
                          │  SNS      │──▶ Email / HTTP
                          └──────────┘
                               ▲
                               │
  ┌──────────┐   Event    ┌───┴──────┐
  │  S3       │──────────▶│  SQS      │──▶ Consumer
  │  Bucket   │           └──────────┘
  │           │                │
  │ ObjectCreated              │
  │ ObjectRemoved   ┌─────────┴──┐
  │ ObjectRestore   │  Lambda     │──▶ 썸네일 생성 등
  └──────────┘     └────────────┘

  [ EventBridge 통합 (고급) ]

  ┌──────────┐           ┌─────────────┐     ┌──────────────┐
  │  S3       │──Event──▶│ EventBridge  │────▶│ Step Functions│
  │  Bucket   │           │              │────▶│ Kinesis       │
  └──────────┘           │ 고급 필터링   │────▶│ 18+ 서비스    │
                         │ 아카이브/재생  │     └──────────────┘
                         └─────────────┘
```

- 지원 이벤트: `S3:ObjectCreated`, `S3:ObjectRemoved`, `S3:ObjectRestore`, `S3:Replication` 등
- 객체 이름 필터링 가능 (예: `*.jpg`)
- 대상: **SNS, SQS, Lambda Function**
- 이벤트 전달: 보통 수초, 최대 1분 이상 소요
- IAM Permissions: 각 대상에 Resource Policy 설정 필요
  - SNS Resource (Access) Policy
  - SQS Resource (Access) Policy
  - Lambda Resource Policy

#### EventBridge 통합
- S3 이벤트를 **Amazon EventBridge**로 전송 가능
- **18개 이상** AWS 서비스를 대상으로 지원
- **고급 필터링**: JSON 규칙 (메타데이터, 객체 크기, 이름 등)
- **다중 대상**: Step Functions, Kinesis Streams/Firehose 등
- **EventBridge 기능**: 아카이브, 이벤트 재생, 안정적 전달

### S3 Baseline Performance (기본 성능)
- 자동으로 높은 요청 속도에 맞게 스케일링
- 지연 시간: **100~200ms**
- **접두사(prefix)당**:
  - **3,500** PUT/COPY/POST/DELETE 요청/초
  - **5,500** GET/HEAD 요청/초
- 접두사 수에 제한 없음
- 4개 접두사에 분산 시 GET: **22,000** 요청/초 달성 가능

### S3 Performance 최적화

```text
[ S3 Transfer Acceleration ]

  ┌──────────┐                ┌────────────────┐              ┌──────────┐
  │  Client   │───Upload─────▶│ Edge Location   │──Private────▶│  S3      │
  │  (Asia)   │   (Public)    │ (가까운 위치)    │  AWS Net     │  Bucket  │
  └──────────┘                └────────────────┘              │(us-east-1)│
                                                              └──────────┘

[ Multi-Part Upload ]

  ┌──────────┐     Part 1 ───────▶ ┌──────────┐
  │  대용량    │     Part 2 ───────▶ │  S3      │──▶ 조합 ──▶ 완성된 객체
  │  파일      │     Part 3 ───────▶ │  Bucket  │
  │ (>5GB)    │     ...   ───────▶  └──────────┘
  └──────────┘     (병렬 업로드)

[ Byte-Range Fetches ]

  ┌──────────┐     GET bytes=0-999 ◀────────┐
  │  Client   │     GET bytes=1000-1999 ◀───┤  S3 Object
  │           │     GET bytes=2000-2999 ◀───┤  (병렬 다운로드)
  └──────────┘     (병렬 GET)         ◀────┘
```

#### Multi-Part Upload
- **100MB 초과**: 권장
- **5GB 초과**: 필수
- 병렬 업로드로 전송 속도 향상

#### S3 Transfer Acceleration
- AWS **Edge Location**으로 파일 전송 -> 프라이빗 AWS 네트워크를 통해 S3 버킷으로 전달
- Multi-Part Upload와 호환

#### S3 Byte-Range Fetches
- 특정 바이트 범위를 병렬로 GET 요청
- 다운로드 속도 향상
- 파일의 일부(예: 헤더)만 검색 가능
- 실패 시 복원력 향상

### S3 Batch Operations
- 단일 요청으로 기존 S3 객체에 대한 대량 작업 수행
- 작업 예시:
  - 객체 메타데이터/속성 수정
  - S3 버킷 간 객체 복사
  - **암호화되지 않은 객체 암호화**
  - ACL, 태그 수정
  - Glacier에서 객체 복원
  - 각 객체에 Lambda 함수 호출
- 재시도 관리, 진행 추적, 완료 알림, 보고서 생성
- **S3 Inventory**로 객체 목록 획득 + **Athena**로 필터링 -> Batch Operations 실행

### S3 Storage Lens
- **AWS 전체 Organization**에 걸쳐 스토리지 이해, 분석, 최적화
- 30일 사용량 및 활동 메트릭
- Organization, 계정, 리전, 버킷, 접두사별 데이터 집계
- 기본 또는 사용자 정의 대시보드
- 메트릭을 S3 버킷으로 일일 내보내기 가능 (CSV, Parquet)

#### Storage Lens 메트릭 종류
| 메트릭 유형 | 설명 |
|------------|------|
| Summary | StorageBytes, ObjectCount 등 일반 인사이트 |
| Cost-Optimization | 불완전 멀티파트 업로드, 저비용 클래스 전환 대상 식별 |
| Data-Protection | 버저닝, MFA Delete, SSE-KMS 활성화 상태 |
| Access-management | Object Ownership 설정 |
| Event | Event Notification 활성화 버킷 식별 |
| Performance | Transfer Acceleration 활성화 버킷 |
| Activity | AllRequests, GetRequests, BytesDownloaded 등 |
| Detailed Status Code | 200OK, 403Forbidden, 404NotFound 등 |

#### Free vs Paid
| 구분 | Free Metrics | Advanced Metrics |
|------|-------------|------------------|
| 메트릭 수 | ~28개 사용량 메트릭 | 추가 유료 메트릭 |
| 데이터 보존 | **14일** | **15개월** |
| 추가 기능 | 없음 | CloudWatch 게시, 접두사 집계, Activity/Status Code 메트릭 |

## 시험 포인트
- **Lifecycle Rules**: Transition Actions(이동)과 Expiration Actions(삭제) 구분
- **불완전 Multi-Part Upload 삭제**: Expiration Action으로 설정 가능
- **S3 Analytics**: Standard/Standard-IA에만 작동, One-Zone IA/Glacier 미지원
- **S3 성능 수치**: 접두사당 3,500 PUT + 5,500 GET/초
- **Transfer Acceleration**: Edge Location -> Private AWS Network -> S3
- **Byte-Range Fetches**: 병렬 다운로드, 파일 헤더만 검색 가능
- **EventBridge**: 고급 필터링, 다중 대상, 아카이브/재생 지원
- **S3 Batch Operations**: 대량 작업, S3 Inventory + Athena와 함께 사용
- **Requester Pays**: 요청자가 비용 부담, AWS 인증 필수
- **Storage Lens**: Organization 전체 스토리지 분석, Free(14일) vs Advanced(15개월)

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Lifecycle Transition | 스토리지 클래스 간 자동 이동 |
| Lifecycle Expiration | 일정 기간 후 객체 자동 삭제 |
| S3 Analytics | Standard/Standard-IA 전환 시기 추천 |
| Requester Pays | 요청자가 네트워크/요청 비용 부담 |
| Event Notification | SNS, SQS, Lambda로 이벤트 전달 |
| EventBridge | 고급 필터링, 18+ 서비스 대상, 아카이브/재생 |
| 성능 기준 | 접두사당 3,500 PUT + 5,500 GET/초 |
| Multi-Part Upload | 100MB 권장, 5GB 필수, 병렬 업로드 |
| Transfer Acceleration | Edge Location 경유, 프라이빗 네트워크 |
| Byte-Range Fetches | 병렬 GET, 부분 검색 가능 |
| S3 Batch Operations | 대량 객체 작업, Inventory + Athena 연동 |
| Storage Lens | Organization 전체 스토리지 분석/최적화 |

---

## Practice Questions

### Q1. A company stores application logs in S3 Standard. Logs are actively accessed for the first 30 days, then rarely accessed for 90 days, after which they must be deleted. Which S3 configuration meets these requirements with the LOWEST cost?
**Options:**
- A) Use S3 Intelligent-Tiering
- B) Create a lifecycle rule to transition to S3 Standard-IA after 30 days and delete after 120 days
- C) Create a lifecycle rule to transition to S3 Glacier after 30 days and delete after 120 days
- D) Store all logs in S3 One Zone-IA from the start

**Answer:** B

**해설:**

> **문제:** 회사가 S3 Standard에 애플리케이션 로그를 저장하고 있다. 로그는 처음 30일간 활발히 접근되고, 이후 90일간 드물게 접근되며, 그 후에는 삭제해야 한다. 가장 낮은 비용으로 이 요구사항을 충족하는 S3 구성은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 Intelligent-Tiering을 사용한다 |
| B | 30일 후 S3 Standard-IA로 전환하고 120일 후 삭제하는 수명주기 규칙을 생성한다 |
| C | 30일 후 S3 Glacier로 전환하고 120일 후 삭제하는 수명주기 규칙을 생성한다 |
| D | 처음부터 모든 로그를 S3 One Zone-IA에 저장한다 |

**상세 풀이:** 로그가 30일 후에도 "드물게 접근"되므로 빠른 접근이 가능한 Standard-IA가 적합하며, 120일(30+90) 후 Expiration Action으로 자동 삭제하는 Lifecycle Rule이 가장 비용 효율적이다. Intelligent-Tiering(A)은 접근 패턴을 자동으로 분석하지만 소액의 월별 모니터링 비용이 추가로 발생하고, 명확한 접근 패턴(30일 활발, 이후 드문 접근)이 이미 알려져 있으므로 불필요한 비용이다. Glacier(C)로 전환하면 스토리지 비용은 더 낮지만 검색 시간이 최소 1분에서 최대 12시간이므로 "드물지만 접근이 필요한" 90일 기간에 부적합하다. One Zone-IA(D)에 처음부터 저장하면 처음 30일간의 빈번한 접근에 검색 비용이 추가로 발생하여 비효율적이며, 단일 AZ 저장으로 가용성도 낮다.

**핵심 개념:** S3 Lifecycle Rules

---

### Q2. A company needs to generate thumbnail images whenever a photo is uploaded to their S3 bucket. The thumbnail generation should be event-driven. Which solution requires the LEAST operational overhead?
**Options:**
- A) Configure S3 Event Notification to invoke a Lambda function
- B) Use an EC2 instance to poll the S3 bucket for new objects
- C) Use Amazon SQS to queue upload events and process with EC2
- D) Use AWS Step Functions to orchestrate the thumbnail generation

**Answer:** A

**해설:**

> **문제:** 회사가 S3 버킷에 사진이 업로드될 때마다 썸네일 이미지를 생성해야 한다. 썸네일 생성은 이벤트 기반이어야 한다. 가장 적은 운영 오버헤드가 필요한 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 Event Notification을 구성하여 Lambda 함수를 호출한다 |
| B | EC2 인스턴스를 사용하여 S3 버킷의 새 객체를 폴링한다 |
| C | Amazon SQS를 사용하여 업로드 이벤트를 대기열에 넣고 EC2로 처리한다 |
| D | AWS Step Functions를 사용하여 썸네일 생성을 오케스트레이션한다 |

**상세 풀이:** S3 Event Notification으로 S3:ObjectCreated 이벤트를 Lambda 함수에 직접 연결하면 사진 업로드 시 자동으로 Lambda가 호출되어 썸네일을 생성한다. Lambda는 서버리스이므로 인프라 관리가 필요 없고, S3 이벤트와의 네이티브 통합으로 설정도 간단하여 운영 오버헤드가 가장 적다. EC2 폴링(B)은 EC2 인스턴스를 지속적으로 운영하고 관리해야 하며, 폴링 스크립트 개발 및 유지보수가 필요하다. SQS + EC2(C)도 SQS 큐 관리와 EC2 인스턴스 운영이 필요하여 운영 부담이 크다. Step Functions(D)는 복잡한 워크플로우 오케스트레이션에 적합하지만, 단순한 이벤트 기반 썸네일 생성에는 과도한 솔루션이며 추가 비용과 구성 복잡도가 발생한다.

**핵심 개념:** S3 Event Notifications

---

### Q3. A company's S3 bucket receives 20,000 GET requests per second. Performance is becoming an issue. What should a solutions architect recommend to improve performance?
**Options:**
- A) Enable S3 Transfer Acceleration
- B) Distribute objects across multiple prefixes
- C) Enable S3 versioning
- D) Switch to S3 Express One Zone

**Answer:** B

**해설:**

> **문제:** 회사의 S3 버킷이 초당 20,000개의 GET 요청을 받고 있다. 성능이 문제가 되고 있다. 성능을 개선하기 위해 솔루션 아키텍트는 무엇을 권장해야 하는가?

| 선지 | 번역 |
|------|------|
| A | S3 Transfer Acceleration을 활성화한다 |
| B | 객체를 여러 접두사에 분산한다 |
| C | S3 버저닝을 활성화한다 |
| D | S3 Express One Zone으로 전환한다 |

**상세 풀이:** S3는 접두사(prefix)당 5,500 GET/HEAD 요청/초를 지원한다. 20,000 GET/초를 처리하려면 최소 4개 접두사에 객체를 분산해야 한다(4 x 5,500 = 22,000). 예를 들어 `/images/`, `/videos/`, `/docs/`, `/logs/` 등의 접두사로 객체를 나누면 각 접두사가 독립적으로 성능 한도를 가지므로 전체 처리량이 증가한다. Transfer Acceleration(A)은 원거리에서 S3로의 전송 속도를 높이는 기능이지 초당 요청 수 제한을 해결하지 않는다. 버저닝(C)은 객체 버전 관리 기능으로 성능 향상과 무관하다. Express One Zone(D)은 10배 성능을 제공하지만 기존 아키텍처를 Directory Bucket으로 전환해야 하며 단일 AZ에만 저장되므로 접두사 분산이 더 간단하고 효과적인 해결책이다.

**핵심 개념:** S3 Baseline Performance / Prefix

---

### Q4. A company wants to receive S3 event notifications with advanced filtering based on object metadata and send them to multiple downstream services including Step Functions and Kinesis Data Firehose. Which solution is MOST appropriate?
**Options:**
- A) S3 Event Notifications to SNS with message filtering
- B) S3 Event Notifications to SQS with message attributes
- C) S3 Event Notifications with Amazon EventBridge
- D) S3 Event Notifications to Lambda for custom routing

**Answer:** C

**해설:**

> **문제:** 회사가 객체 메타데이터 기반의 고급 필터링이 적용된 S3 이벤트 알림을 받아 Step Functions와 Kinesis Data Firehose를 포함한 여러 다운스트림 서비스로 전송하려 한다. 가장 적합한 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 메시지 필터링이 있는 SNS로의 S3 Event Notification |
| B | 메시지 속성이 있는 SQS로의 S3 Event Notification |
| C | Amazon EventBridge와의 S3 Event Notification |
| D | 커스텀 라우팅을 위한 Lambda로의 S3 Event Notification |

**상세 풀이:** Amazon EventBridge는 S3 이벤트에 대해 JSON 규칙 기반의 고급 필터링(메타데이터, 객체 크기, 이름 등)을 지원하고, Step Functions, Kinesis Streams/Firehose, Lambda 등 18개 이상의 AWS 서비스를 대상으로 직접 지원한다. 또한 이벤트 아카이브, 재생, 안정적 전달 등의 고급 기능도 제공한다. SNS(A)는 메시지 필터링을 지원하지만 S3 이벤트의 메타데이터 기반 고급 필터링 수준에는 미치지 못하며, Step Functions이나 Kinesis Firehose로의 직접 전달을 지원하지 않는다. SQS(B)는 단일 소비자 모델이며 다중 대상 라우팅에 적합하지 않다. Lambda(D)로 커스텀 라우팅을 구현하면 가능하지만 Lambda 함수의 코드 작성, 유지보수, 에러 처리 등 추가 운영 부담이 발생한다.

**핵심 개념:** S3 Event Notifications with EventBridge

---

### Q5. A company needs to encrypt millions of unencrypted objects in an existing S3 bucket. What is the MOST efficient approach?
**Options:**
- A) Write a script to download each object, encrypt it, and re-upload it
- B) Use S3 Batch Operations to encrypt the objects
- C) Enable default encryption on the bucket and wait for objects to be encrypted
- D) Create a new bucket with encryption and copy all objects

**Answer:** B

**해설:**

> **문제:** 회사가 기존 S3 버킷에 있는 수백만 개의 암호화되지 않은 객체를 암호화해야 한다. 가장 효율적인 접근 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 각 객체를 다운로드하고 암호화한 후 다시 업로드하는 스크립트를 작성한다 |
| B | S3 Batch Operations를 사용하여 객체를 암호화한다 |
| C | 버킷에 기본 암호화를 활성화하고 객체가 암호화되기를 기다린다 |
| D | 암호화가 설정된 새 버킷을 생성하고 모든 객체를 복사한다 |

**상세 풀이:** S3 Batch Operations은 단일 요청으로 수백만 개의 기존 객체에 대한 대량 작업(암호화 포함)을 효율적으로 수행할 수 있다. S3 Inventory로 암호화되지 않은 객체 목록을 획득하고 Athena로 필터링한 후 Batch Operations으로 암호화를 적용하면 된다. 재시도 관리, 진행 추적, 완료 알림, 보고서 생성 등 운영 기능도 내장되어 있다. 스크립트 작성(A)은 수백만 객체에 대해 비효율적이며, 에러 처리, 재시도 로직, 동시성 관리 등을 직접 구현해야 한다. 기본 암호화 활성화(C)는 새로 업로드되는 객체에만 적용되며, 이미 존재하는 객체는 자동으로 암호화되지 않는다. 새 버킷으로 전체 복사(D)는 가능하지만 수백만 객체에 대한 불필요한 데이터 전송 비용이 발생하고, 버킷 이름 변경에 따른 애플리케이션 수정도 필요하다.

**핵심 개념:** S3 Batch Operations

---

### Q6. A data analytics company wants to share a large dataset stored in S3 with partner companies. The company does not want to pay for the data transfer costs when partners download the data. What should they configure?
**Options:**
- A) S3 Cross-Region Replication to the partner's bucket
- B) S3 Requester Pays
- C) S3 Pre-Signed URLs
- D) S3 Access Points for each partner

**Answer:** B

**해설:**

> **문제:** 데이터 분석 회사가 S3에 저장된 대용량 데이터셋을 파트너 회사들과 공유하려 한다. 파트너가 데이터를 다운로드할 때 데이터 전송 비용을 지불하고 싶지 않다. 무엇을 구성해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 파트너의 버킷으로 S3 Cross-Region Replication |
| B | S3 Requester Pays |
| C | S3 Pre-Signed URL |
| D | 각 파트너를 위한 S3 Access Points |

**상세 풀이:** Requester Pays 설정을 버킷에 활성화하면 데이터 요청 및 다운로드 비용을 요청자(파트너)가 부담하고, 버킷 소유자는 스토리지 비용만 지불한다. 대용량 데이터셋을 여러 파트너와 공유할 때 비용을 효과적으로 분담할 수 있다. 단, 요청자는 반드시 AWS에 인증된 사용자여야 하며 익명 접근은 불가능하다. CRR(A)은 파트너의 버킷에 데이터 복사본을 생성하는 것으로, 복제 자체의 전송 비용과 파트너 버킷의 스토리지 비용이 별도로 발생하며 비용 분담 메커니즘이 아니다. Pre-Signed URL(C)은 임시 접근 권한을 부여하는 것이지만 데이터 전송 비용은 여전히 버킷 소유자가 부담한다. Access Points(D)는 부서별/사용자별 접근 관리를 단순화하는 보안 기능이며 비용 분담과는 무관하다.

**핵심 개념:** S3 Requester Pays

---

### Q7. A company wants to use S3 Storage Lens to analyze storage usage across their AWS Organization with data retained for 15 months and published to CloudWatch. Which tier of S3 Storage Lens is required?
**Options:**
- A) Free Metrics (default)
- B) Advanced Metrics and Recommendations
- C) S3 Analytics
- D) S3 Inventory

**Answer:** B

**해설:**

> **문제:** 회사가 S3 Storage Lens를 사용하여 AWS Organization 전체의 스토리지 사용량을 분석하려 하며, 15개월간 데이터를 보존하고 CloudWatch에 게시하려 한다. 어떤 S3 Storage Lens 티어가 필요한가?

| 선지 | 번역 |
|------|------|
| A | Free Metrics (기본) |
| B | Advanced Metrics and Recommendations |
| C | S3 Analytics |
| D | S3 Inventory |

**상세 풀이:** Free Metrics는 약 28개의 사용량 메트릭을 제공하지만 데이터 보존 기간이 14일로 제한되며 CloudWatch 게시 기능을 지원하지 않는다. 15개월 데이터 보존과 CloudWatch 게시는 Advanced Metrics and Recommendations(유료 티어)에서만 제공되는 기능이다. Advanced 티어는 추가로 접두사 수준 집계, Activity 메트릭, Detailed Status Code 메트릭 등도 제공한다. S3 Analytics(C)는 Standard와 Standard-IA 간 스토리지 클래스 전환 시기를 추천하는 별도의 기능이며, Storage Lens와는 다른 서비스이다. S3 Inventory(D)는 버킷 내 객체 목록과 메타데이터를 제공하는 기능으로 스토리지 사용량 분석 대시보드와는 용도가 다르다.

**핵심 개념:** S3 Storage Lens Free vs Paid

---

### Q8. A company needs to upload large files from their office in Asia to an S3 bucket in us-east-1. They want to maximize upload speed. Which TWO solutions should they use together?
**Options:**
- A) S3 Multi-Part Upload
- B) S3 Transfer Acceleration
- C) S3 Byte-Range Fetches
- D) S3 Requester Pays
- E) S3 Cross-Region Replication

**Answer:** A, B

**해설:**

> **문제:** 회사가 아시아 사무실에서 us-east-1의 S3 버킷으로 대용량 파일을 업로드해야 한다. 업로드 속도를 최대화하려 한다. 함께 사용해야 하는 두 가지 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 Multi-Part Upload |
| B | S3 Transfer Acceleration |
| C | S3 Byte-Range Fetches |
| D | S3 Requester Pays |
| E | S3 Cross-Region Replication |

**상세 풀이:** Multi-Part Upload(A)은 대용량 파일을 여러 부분으로 나누어 병렬로 업로드하여 전송 속도를 크게 향상시킨다. 5GB 초과 시 필수이며 100MB 초과 시에도 권장된다. Transfer Acceleration(B)은 아시아 사무실에서 가장 가까운 AWS Edge Location으로 파일을 전송한 후, AWS의 최적화된 프라이빗 네트워크를 통해 us-east-1의 S3 버킷으로 전달하여 장거리 전송 속도를 향상시킨다. 이 두 기능은 호환되며 함께 사용하면 업로드 속도를 최대화할 수 있다. Byte-Range Fetches(C)는 다운로드(GET) 속도를 높이는 기능이지 업로드와는 무관하다. Requester Pays(D)는 데이터 전송 비용 분담 기능이며 속도와 관련이 없다. Cross-Region Replication(E)은 버킷 간 자동 복제 기능으로 업로드 속도 최적화와는 목적이 다르다.

**핵심 개념:** S3 Transfer Acceleration + Multi-Part Upload
