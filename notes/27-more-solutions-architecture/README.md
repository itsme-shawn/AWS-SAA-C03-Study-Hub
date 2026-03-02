# More Solutions Architecture

## 개요
다양한 아키텍처 패턴과 솔루션을 다루는 섹션으로, 이벤트 기반 아키텍처, 캐싱 전략, IP 차단 방법, HPC(고성능 컴퓨팅), 고가용성 EC2 구성 등 시험에 자주 등장하는 실전 아키텍처를 학습한다.

## 핵심 개념

### Lambda, SNS & SQS 패턴
- **SQS + Lambda**: SQS 큐에서 Lambda가 폴링(polling: 주기적으로 메시지 있는지 확인), 실패 시 재시도, DLQ(Dead Letter Queue: 처리 실패 메시지 보관소)로 전달
- **SNS + Lambda**: SNS가 Lambda를 직접 호출, 비동기 방식, 실패 시 DLQ
- **SQS FIFO + Lambda**: 순서 보장, 실패 시 블로킹 (같은 메시지 그룹의 다음 메시지는 현재 메시지 처리 완료까지 대기), DLQ

### Fan Out 패턴
- **하나의 메시지를 여러 SQS 큐에 전달**하는 패턴
- Option 1: SDK로 각 SQS에 개별 PUT (비추천 - 단일 장애점)
- Option 2: **SNS → 여러 SQS 구독** (Fan Out - 추천)

```text
  Fan Out 패턴: SNS → 여러 SQS

  ✗ 비추천 (단일 장애점)          ✓ 추천 (Fan Out)

  ┌─────┐  PUT  ┌──────┐       ┌─────┐       ┌──────┐  ┌──────────┐
  │ App │──────►│ SQS1 │       │ App │──────►│ SNS  │─►│ SQS 1    │──► Consumer A
  │     │──┐   └──────┘       │     │ 1 PUT │Topic │  └──────────┘
  │     │  │   ┌──────┐       └─────┘       │      │  ┌──────────┐
  │     │  └──►│ SQS2 │                     │      │─►│ SQS 2    │──► Consumer B
  │     │──┐   └──────┘                     │      │  └──────────┘
  │     │  │   ┌──────┐                     │      │  ┌──────────┐
  │     │  └──►│ SQS3 │                     │      │─►│ SQS 3    │──► Consumer C
  └─────┘      └──────┘                     └──────┘  └──────────┘
  3번 PUT, 실패 위험                1번 PUT, SNS가 분배
```

### S3 Event Notifications
- 이벤트 유형: S3:ObjectCreated, S3:ObjectRemoved, S3:ObjectRestore, S3:Replication 등
- 객체 이름 필터링 가능 (예: `*.jpg`)
- 대상: SNS, SQS, Lambda Function
- 일반적으로 초 단위로 이벤트 전달 (가끔 1분+ 소요)

### S3 Event Notifications with Amazon EventBridge
- S3 → EventBridge → 18개 이상의 AWS 서비스 대상
- **고급 필터링**: JSON 규칙 (메타데이터, 객체 크기, 이름 등)
- **다중 대상**: Step Functions, Kinesis Streams/Firehose 등
- **EventBridge 기능**: 이벤트 아카이브, 리플레이, 안정적 전달

### Amazon EventBridge - API 호출 인터셉트
- CloudTrail이 모든 API 호출을 로깅 → EventBridge가 이벤트 감지 → SNS 알림
- 예: DynamoDB DeleteTable API 호출 감지 후 알림

### API Gateway - AWS 서비스 통합
- 클라이언트 → API Gateway → Kinesis Data Streams → Kinesis Data Firehose → S3
- API Gateway가 AWS 서비스의 프록시 역할

### 캐싱 전략
- **CloudFront**: Edge 캐싱, TTL, 네트워크 지연 최소화
- **API Gateway**: 캐싱 기능 내장
- **ElastiCache/DAX**: 애플리케이션 레벨 캐싱 (Redis, Memcached, DAX)
- **S3**: 정적 콘텐츠 스토리지
- 캐싱 레이어: CloudFront → API Gateway → App Logic (EC2/Lambda) → Cache (Redis/Memcached/DAX) → Database

### IP 주소 차단 방법

```text
  IP Blocking - 아키텍처별 차단 계층

  1) EC2만 사용
  ┌────────┐     ┌──────┐     ┌──────────┐     ┌──────┐
  │Client  │────►│ NACL │────►│    SG     │────►│ EC2  │
  │(악성IP) │     │ DENY │     │ Allow만   │     │      │
  └────────┘     └──────┘     └──────────┘     └──────┘
                  ▲ 차단!

  2) ALB 사용 시
  ┌────────┐  ┌──────┐  ┌─────┐  ┌────┐  ┌──────┐
  │Client  │─►│ NACL │─►│ ALB │─►│ SG │─►│ EC2  │
  │(악성IP) │  │ DENY │  │     │  │    │  │      │
  └────────┘  └──────┘  └──┬──┘  └────┘  └──────┘
               ▲ 차단       │
                            └──► WAF (IP 필터) ← 가장 효과적!

  3) CloudFront + ALB 사용 시
  ┌────────┐  ┌──────────┐  ┌────┐  ┌──────┐  ┌────┐  ┌──────┐
  │Client  │─►│CloudFront│─►│NACL│─►│ ALB  │─►│ SG │─►│ EC2  │
  │(악성IP) │  │          │  │    │  │      │  │    │  │      │
  └────────┘  └────┬─────┘  └────┘  └──────┘  └────┘  └──────┘
                   │         ▲ CF IP만 보임 (무용!)
                   │
                   ├──► WAF (IP 필터) ← 여기서 차단!
                   └──► Geo Restriction (국가별 차단)
```

#### EC2만 사용
- **NACL**: 서브넷 레벨에서 Deny 규칙으로 차단
- **Security Group**: Allow 규칙만 지원 (직접 차단 불가)
- EC2에 방화벽 소프트웨어 설치 (선택적)

#### ALB 사용 시
- **NACL**: ALB 서브넷에서 차단
- ALB는 연결을 종료(Connection Termination) → EC2 SG는 ALB의 Private IP만 봄
- **AWS WAF**: ALB에 연결하여 IP 주소 필터링 (가장 효과적)

#### NLB 사용 시
- NLB는 트래픽을 통과시킴 → EC2 SG에서 클라이언트 IP 확인 가능
- **NACL**: 서브넷 레벨에서 차단

#### CloudFront + ALB 사용 시
- **NACL은 도움 안 됨** (CloudFront의 Public IP가 요청함)
- **CloudFront Geo Restriction**: 국가별 차단
- **AWS WAF**: CloudFront에 연결하여 IP 필터링

### High Performance Computing (HPC)

```text
  HPC 아키텍처 개요

  ┌─ 데이터 전송 ──────────────────────────────────────────────┐
  │  Direct Connect (Gbps) / Snowball (PB) / DataSync          │
  └────────────────────────────┬────────────────────────────────┘
                               ▼
  ┌─ 컴퓨팅 ──────────────────────────────────────────────────┐
  │                                                            │
  │  ┌── Cluster Placement Group (같은 Rack, 같은 AZ) ──────┐ │
  │  │                                                       │ │
  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
  │  │  │EC2 (GPU) │  │EC2 (GPU) │  │EC2 (GPU) │   ...      │ │
  │  │  │  + EFA   │  │  + EFA   │  │  + EFA   │            │ │
  │  │  └────┬─────┘  └────┬─────┘  └────┬─────┘            │ │
  │  │       └──────── MPI 통신 ─────────┘                   │ │
  │  │         (OS 우회, 저지연, Linux만)                      │ │
  │  └───────────────────────────────────────────────────────┘ │
  │  자동화: AWS Batch / ParallelCluster                        │
  └────────────────────────────────────────────────────────────┘
                               │
                               ▼
  ┌─ 스토리지 ────────────────────────────────────────────────┐
  │  Instance Store (수백만 IOPS) │ EBS io2 (256K IOPS)        │
  │  FSx for Lustre (수백만 IOPS, S3 백업) │ EFS / S3          │
  └────────────────────────────────────────────────────────────┘
```

- AWS는 HPC에 이상적: 대규모 리소스 생성, 빠른 결과, 사용한 만큼만 지불
- 사용 사례: 유전체학, 전산 화학, 금융 리스크 모델링, 기상 예측, ML/DL, 자율주행

#### 데이터 관리 및 전송
- **Direct Connect**: GB/s 데이터 이동
- **Snowball & Snowmobile**: PB 데이터 이동
- **DataSync**: 온프레미스 ↔ S3, EFS, FSx for Windows

#### 컴퓨팅 및 네트워킹
- **EC2**: CPU/GPU 최적화 인스턴스, Spot Instances/Fleet으로 비용 절감
- **Placement Groups - Cluster**: 같은 Rack, 같은 AZ, 저지연, 10Gbps 네트워크
- **EC2 Enhanced Networking (SR-IOV)**:
  - **ENA (Elastic Network Adapter)**: 최대 100 Gbps
  - Intel 82599 VF: 최대 10 Gbps (레거시)
- **EFA (Elastic Fabric Adapter)**:
  - HPC용 개선된 ENA, **Linux만 지원**
  - 노드 간 통신, 밀접 결합 워크로드
  - **MPI (Message Passing Interface)** 표준 활용
  - Linux OS를 우회하여 저지연 전송

#### 스토리지
- **EBS**: io2 Block Express로 최대 256,000 IOPS
- **Instance Store**: 수백만 IOPS, 저지연
- **S3**: 대규모 Blob (파일 시스템 아님)
- **EFS**: 크기 기반 IOPS 스케일링 또는 Provisioned IOPS
- **FSx for Lustre**: HPC 최적화 분산 파일 시스템, 수백만 IOPS, S3 백업

#### 자동화 및 오케스트레이션
- **AWS Batch**: 다중 노드 병렬 작업, EC2 인스턴스 자동 실행
- **AWS ParallelCluster**: 오픈소스 HPC 클러스터 관리, EFA 지원

### 고가용성 EC2 구성

#### CloudWatch Event 기반
- Public EC2 모니터링 → CloudWatch Event/Alarm → Standby EC2 시작 + Elastic IP 연결

#### Auto Scaling Group 기반
- ASG: min 1, max 1, desired 1, 2개 이상 AZ
- EC2 User Data로 Elastic IP 연결
- EC2 인스턴스 역할로 Elastic IP 연결 API 호출 허용

#### ASG + EBS 기반
- ASG Terminate lifecycle hook → EBS 스냅샷 생성 + 태그
- ASG Launch lifecycle hook → 태그로 EBS 스냅샷 찾기 → EBS 볼륨 생성 + 연결

## 시험 포인트
- **Fan Out 패턴**: SNS → 여러 SQS 구독이 정답
- **S3 이벤트**: EventBridge 사용 시 고급 필터링 + 다중 대상 가능
- **IP 차단**: ALB 사용 시 **WAF**, CloudFront 사용 시 **WAF + Geo Restriction**
- **NACL은 CloudFront 앞에서는 무용** (CloudFront IP가 요청)
- **HPC**: Cluster Placement Group + EFA + FSx for Lustre 조합
- **EFA**: Linux만 지원, MPI 표준, 저지연 노드간 통신
- **고가용성 EC2**: ASG(1/1/1) + Elastic IP + User Data 패턴

## 치트시트

| 기능/서비스 | 설명 |
|------------|------|
| Fan Out | SNS → 여러 SQS 구독 |
| S3 → EventBridge | 고급 필터링, 다중 대상, 아카이브/리플레이 |
| NACL | IP 차단 (서브넷 레벨), CloudFront 뒤에서는 무용 |
| WAF | ALB/CloudFront에서 IP 필터링 |
| Cluster Placement | 같은 Rack/AZ, 10Gbps, 저지연 |
| ENA | Enhanced Networking, 최대 100 Gbps |
| EFA | HPC용, Linux만, MPI, OS 우회 |
| FSx for Lustre | HPC 분산 파일 시스템, 수백만 IOPS |
| AWS Batch | 다중 노드 병렬 작업, Spot Instance |
| ParallelCluster | 오픈소스 HPC 클러스터 관리 |

---

## Practice Questions

### Q1. A company wants to process S3 object uploads by sending notifications to multiple independent consumers. Each consumer must receive every message. What is the BEST architecture?
**Options:**
- A) Configure S3 event notifications to send to multiple SQS queues directly
- B) Configure S3 event notifications to an SNS topic, then subscribe multiple SQS queues to the topic
- C) Use S3 event notifications with Lambda to write to multiple SQS queues
- D) Configure S3 event notifications to EventBridge, then send to multiple SQS queues

**Answer:** B

**해설:**

> **문제:** 한 회사가 S3 객체 업로드를 처리하기 위해 여러 독립적인 소비자에게 알림을 보내려 한다. 각 소비자는 모든 메시지를 수신해야 한다. 가장 좋은 아키텍처는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 이벤트 알림을 여러 SQS 큐에 직접 전송하도록 구성한다 |
| B | S3 이벤트 알림을 SNS 토픽으로 전송하고, 여러 SQS 큐를 토픽에 구독시킨다 |
| C | S3 이벤트 알림과 Lambda를 사용하여 여러 SQS 큐에 쓴다 |
| D | S3 이벤트 알림을 EventBridge로 구성하고, 여러 SQS 큐로 전송한다 |

**(A)** : S3 이벤트 알림은 같은 이벤트 타입에 대해 하나의 대상만 설정할 수 있다. 여러 SQS 큐에 직접 전송이 제한적이다.

**(B) 정답** : SNS 토픽에 S3 이벤트를 전송하고 여러 SQS 큐가 구독하면 각 소비자가 모든 메시지를 수신할 수 있다. Fan Out 패턴의 전형적인 사용 사례이다.

**(C)** : Lambda를 중간에 두어 각 SQS에 개별적으로 메시지를 전송하는 것은 가능하지만 불필요한 복잡성이 추가된다.

**(D)** : EventBridge도 기술적으로 가능하지만 단순한 팬아웃 시나리오에서는 SNS가 더 간단하고 직접적인 해결책이다.

**핵심 개념:** Fan Out Pattern - SNS + SQS

---

### Q2. A company needs to block traffic from specific IP addresses to their web application running behind an Application Load Balancer and CloudFront. Which combination provides the MOST effective solution?
**Options:**
- A) Configure NACL rules to deny the IP addresses
- B) Configure Security Group rules on the ALB to deny the IP addresses
- C) Configure AWS WAF with IP-based rules on CloudFront
- D) Configure Security Group rules on the EC2 instances

**Answer:** C

**해설:**

> **문제:** 한 회사가 Application Load Balancer와 CloudFront 뒤에서 실행되는 웹 애플리케이션에 대해 특정 IP 주소의 트래픽을 차단해야 한다. 가장 효과적인 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | NACL 규칙을 구성하여 해당 IP 주소를 거부한다 |
| B | ALB의 Security Group 규칙을 구성하여 해당 IP 주소를 거부한다 |
| C | CloudFront에 IP 기반 규칙이 있는 AWS WAF를 구성한다 |
| D | EC2 인스턴스의 Security Group 규칙을 구성한다 |

**(A)** : NACL은 CloudFront 뒤에서 무용하다. ALB가 받는 요청은 CloudFront의 Public IP에서 오기 때문에 원본 클라이언트 IP를 기반으로 차단할 수 없다.

**(B)** : Security Group은 Allow 규칙만 지원하고 Deny 규칙을 지원하지 않는다. ALB SG에서 특정 IP를 차단하는 것이 불가능하다.

**(C) 정답** : AWS WAF를 CloudFront에 연결하면 엣지 레벨에서 원본 클라이언트 IP를 확인하고 필터링할 수 있다. IP 기반 규칙으로 특정 IP를 효과적으로 차단할 수 있다.

**(D)** : Security Group은 Allow 규칙만 지원한다. EC2 인스턴스 SG에서 특정 IP를 Deny하는 것이 불가능하다.

**핵심 개념:** CloudFront + WAF IP Filtering

---

### Q3. A company is running a tightly coupled High Performance Computing (HPC) workload that requires low-latency, high-throughput inter-node communication on Linux instances. Which combination of AWS features should they use?
**Options:**
- A) Spread Placement Group with Enhanced Networking (ENA)
- B) Cluster Placement Group with Elastic Fabric Adapter (EFA)
- C) Partition Placement Group with ENA
- D) Cluster Placement Group with Enhanced Networking (ENA)

**Answer:** B

**해설:**

> **문제:** 한 회사가 Linux 인스턴스에서 저지연, 고처리량의 노드 간 통신이 필요한 밀접 결합(tightly coupled) HPC 워크로드를 실행하고 있다. 어떤 AWS 기능 조합을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Spread Placement Group과 Enhanced Networking (ENA) |
| B | Cluster Placement Group과 Elastic Fabric Adapter (EFA) |
| C | Partition Placement Group과 ENA |
| D | Cluster Placement Group과 Enhanced Networking (ENA) |

**(A)** : Spread Placement Group은 인스턴스를 서로 다른 하드웨어에 분산하여 고가용성을 위한 것이다. 저지연 통신용이 아니다.

**(B) 정답** : Cluster Placement Group은 인스턴스를 같은 Rack, 같은 AZ에 배치하여 10Gbps 네트워크와 최저 지연을 제공한다. EFA는 HPC 전용으로 MPI 표준을 활용하고 Linux OS를 우회하여 초저지연 노드 간 통신을 가능하게 한다.

**(C)** : Partition Placement Group은 대규모 분산 워크로드(Hadoop, Cassandra 등)의 장애 격리용이다. 저지연 통신용이 아니다.

**(D)** : ENA도 최대 100Gbps를 지원하지만 EFA가 HPC 워크로드에 더 특화되어 있다. EFA는 OS 우회 기능을 추가로 제공한다.

**핵심 개념:** HPC - Cluster Placement Group + EFA

---

### Q4. A solutions architect needs to design a highly available single EC2 instance with a static IP address that automatically recovers if the instance fails. The solution must also preserve the data on the attached EBS volume. What approach should be used?
**Options:**
- A) Use CloudWatch alarms to reboot the instance and reassign the Elastic IP
- B) Use an Auto Scaling group with min/max/desired of 1 across multiple AZs with lifecycle hooks to manage EBS snapshots and Elastic IP attachment
- C) Use EC2 Auto Recovery feature with an Elastic IP
- D) Use a Network Load Balancer with a single target instance

**Answer:** B

**해설:**

> **문제:** 솔루션스 아키텍트가 정적 IP 주소를 가진 고가용성 단일 EC2 인스턴스를 설계해야 하며, 인스턴스 장애 시 자동 복구되어야 한다. 연결된 EBS 볼륨의 데이터도 보존해야 한다. 어떤 접근 방식을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | CloudWatch 알람을 사용하여 인스턴스를 재부팅하고 Elastic IP를 재할당한다 |
| B | 여러 AZ에 걸쳐 min/max/desired가 1인 Auto Scaling 그룹을 사용하고, lifecycle hook으로 EBS 스냅샷과 Elastic IP 연결을 관리한다 |
| C | EC2 Auto Recovery 기능과 Elastic IP를 사용한다 |
| D | 단일 대상 인스턴스와 Network Load Balancer를 사용한다 |

**(A)** : CloudWatch alarm은 같은 AZ 내에서만 복구가 가능하다. AZ 장애에 대응할 수 없다.

**(B) 정답** : 여러 AZ에 걸친 ASG(1/1/1)는 AZ 장애 시 다른 AZ에서 자동으로 새 인스턴스를 시작한다. Lifecycle hook으로 EBS 스냅샷 생성 및 복원, Elastic IP 연결을 관리하여 세 가지 요구사항을 모두 충족한다.

**(C)** : EC2 Auto Recovery는 동일 호스트 또는 같은 AZ 내에서만 동작한다. AZ 장애 시 복구가 불가능하다.

**(D)** : NLB는 고정 IP를 제공한다. 그러나 EBS 데이터 보존이나 AZ 장애 시 자동 복구 메커니즘을 제공하지 않는다.

**핵심 개념:** Highly Available EC2 with ASG + EBS

---

### Q5. A company wants to use Amazon S3 event notifications with advanced filtering based on object metadata and the ability to send events to AWS Step Functions. What should they use?
**Options:**
- A) S3 Event Notifications directly to Step Functions
- B) S3 Event Notifications to SNS, then to Step Functions
- C) S3 Event Notifications with Amazon EventBridge
- D) S3 Event Notifications to Lambda, then to Step Functions

**Answer:** C

**해설:**

> **문제:** 한 회사가 객체 메타데이터 기반 고급 필터링과 AWS Step Functions으로의 이벤트 전송 기능을 갖춘 Amazon S3 이벤트 알림을 사용하려 한다. 무엇을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | S3 Event Notifications를 Step Functions에 직접 전송 |
| B | S3 Event Notifications를 SNS로 보낸 후 Step Functions으로 전송 |
| C | Amazon EventBridge와 함께 S3 Event Notifications 사용 |
| D | S3 Event Notifications를 Lambda로 보낸 후 Step Functions으로 전송 |

**(A)** : S3 Event Notifications는 Step Functions을 직접 대상으로 지원하지 않는다. 불가능한 구성이다.

**(B)** : SNS에서 Step Functions으로의 직접 통합이 없다. 불가능한 구성이다.

**(C) 정답** : Amazon EventBridge는 메타데이터, 객체 크기, 이름 등에 대한 고급 JSON 규칙 필터링을 지원하며 Step Functions을 포함한 18개 이상의 AWS 서비스에 직접 전송할 수 있다.

**(D)** : Lambda를 중간에 두어 Step Functions으로 전달하는 것은 기술적으로 가능하다. 그러나 EventBridge가 제공하는 네이티브 통합에 비해 불필요한 복잡성과 관리 오버헤드를 추가한다.

**핵심 개념:** S3 Event Notifications with EventBridge

---

### Q6. For a High Performance Computing workload, which storage solution provides millions of IOPS and is optimized for distributed file systems backed by S3?
**Options:**
- A) Amazon EFS with Provisioned Throughput
- B) Amazon EBS io2 Block Express
- C) Amazon FSx for Lustre
- D) Amazon S3 with Transfer Acceleration

**Answer:** C

**해설:**

> **문제:** HPC 워크로드에서 수백만 IOPS를 제공하고 S3로 백업되는 분산 파일 시스템에 최적화된 스토리지 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Provisioned Throughput가 있는 Amazon EFS |
| B | Amazon EBS io2 Block Express |
| C | Amazon FSx for Lustre |
| D | Transfer Acceleration이 있는 Amazon S3 |

**(A)** : EFS는 범용 파일 시스템으로 HPC에 특화되지 않았다. 수백만 IOPS를 제공하지 못한다.

**(B)** : EBS io2 Block Express는 최대 256,000 IOPS로 수백만 IOPS에는 미치지 못한다. 단일 인스턴스에 연결되는 블록 스토리지이다.

**(C) 정답** : FSx for Lustre는 HPC, ML, 미디어 처리 등 고성능 워크로드를 위해 설계된 분산 파일 시스템이다. 수백만 IOPS를 제공하고 S3로 백업된다.

**(D)** : S3는 객체 스토리지이지 파일 시스템이 아니다. HPC 워크로드에서 파일 시스템으로 직접 사용할 수 없다.

**핵심 개념:** FSx for Lustre - HPC Storage
