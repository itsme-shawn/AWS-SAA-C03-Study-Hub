# Serverless Overview

## 개요
서버리스는 개발자가 서버를 관리하지 않고 코드/함수를 배포하는 패러다임이다. AWS Lambda, DynamoDB, API Gateway, Cognito, Step Functions 등 핵심 서버리스 서비스를 다루며, 시험에서 매우 빈번하게 출제된다. Lambda의 제한 사항, DynamoDB의 용량 모드, API Gateway 엔드포인트 타입, Cognito의 User Pools vs Identity Pools 구분이 핵심이다.

## 핵심 개념

### 서버리스란?
- 개발자가 서버를 관리/프로비저닝하지 않음 (서버가 없는 것이 아님)
- 초기에는 FaaS(Function as a Service) = AWS Lambda
- 현재는 관리형 DB, 메시징, 스토리지 등도 서버리스에 포함
- 주요 서버리스 서비스: Lambda, DynamoDB, Cognito, API Gateway, S3, SNS/SQS, Kinesis Data Firehose, Aurora Serverless, Step Functions, Fargate

### AWS Lambda

#### Lambda 실행 모델

```text
 Lambda 함수 호출 흐름
 ─────────────────────
                         ┌──────────────────────────────┐
 [이벤트 소스]            │      AWS Lambda               │
                         │                              │
 API Gateway ──┐         │  ┌────────┐  ┌────────────┐  │
 S3 Event    ──┤         │  │ Init   │─▶│  Handler   │  │
 SQS Message ──┼────────▶│  │(Cold   │  │ (함수 실행) │──▶ 응답/결과
 DynamoDB    ──┤         │  │ Start) │  │ 최대 15분  │  │
 EventBridge ──┘         │  └────────┘  └────────────┘  │
                         │                              │
                         │  ┌───────────────────────┐   │
                         │  │ 자동 스케일링:         │   │
                         │  │ 동시 요청 수에 따라    │   │
                         │  │ 인스턴스 자동 생성     │   │
                         │  │ (기본 한도: 1,000)    │   │
                         │  └───────────────────────┘   │
                         └──────────────────────────────┘

 과금: 요청 수 + 실행 시간(ms) + 할당 메모리(GB)
```

#### EC2 vs Lambda
| EC2 | Lambda |
|-----|--------|
| 가상 서버, RAM/CPU 제한 | 가상 함수, 서버 관리 불필요 |
| 지속적으로 실행 | 온디맨드 실행 |
| 수동 스케일링 | 자동 스케일링 |

#### Lambda의 장점
- **과금**: 요청 수 + 컴퓨팅 시간 기반
- Free Tier: 월 1,000,000 요청 + 400,000 GB-초
- 전체 AWS 서비스와 통합
- 다양한 프로그래밍 언어 지원
- CloudWatch로 간편한 모니터링
- 최대 10GB RAM (RAM 증가 시 CPU/네트워크도 향상)

#### 지원 언어
- Node.js, Python, Java, C#/.NET Core/PowerShell, Ruby
- Custom Runtime API (Rust, Golang 등)
- Lambda Container Image (Lambda Runtime API 구현 필수)
- **임의의 Docker 이미지 실행에는 ECS/Fargate 권장**

#### 주요 통합 서비스
- API Gateway, Kinesis, DynamoDB, S3, CloudFront, CloudWatch Events/EventBridge, CloudWatch Logs, SNS, SQS, Cognito

#### Lambda 요금 예시
- 요청: 첫 1,000,000 무료, 이후 $0.20/1M 요청
- 시간: 400,000 GB-초 무료, 이후 $1.00/600,000 GB-초
- 1ms 단위 과금

#### Lambda Limits (리전당)
**실행 제한:**
- 메모리: 128 MB ~ 10 GB (1 MB 증분)
- **최대 실행 시간: 900초 (15분)**
- 환경 변수: 4 KB
- /tmp 디스크: 512 MB ~ 10 GB
- **동시 실행: 1,000** (증가 요청 가능)

**배포 제한:**
- 압축 배포 패키지: 50 MB
- 비압축 코드+종속성: 250 MB
- 환경 변수: 4 KB

#### Lambda Concurrency (동시성) & Throttling
- 동시 실행 제한: 기본 1,000
- **Reserved Concurrency**: 함수별 동시성 제한 설정
- 초과 시 Throttle 발생:
  - 동기 호출: ThrottleError 429
  - 비동기 호출: 자동 재시도 -> DLQ
- 비동기 호출 재시도: 최대 6시간, 1초~5분 지수 백오프

#### Cold Start & Provisioned Concurrency
> **직관적 비유:**
> - **Cold Start(콜드 스타트):** 오래 쉬었던 식당을 다시 여는 것처럼, Lambda 함수가 오랫동안 호출되지 않았다면 다음 호출 시 "준비(초기화)" 시간이 필요하다. 이 지연이 수백 ms ~ 수 초에 달할 수 있다.
> - **Warm Start(웜 스타트):** 이미 돌아가고 있는 함수 인스턴스를 재사용하는 것. 준비 시간 없이 즉시 실행된다.
> - **Provisioned Concurrency:** "손님이 올 때를 대비해 식당을 항상 열어두는 것". 비용이 들지만 Cold Start가 절대 발생하지 않는다. 지연에 민감한 API(사용자 요청 처리 등)에 적합하다.

- **Cold Start**: Lambda가 새 인스턴스를 시작할 때 초기화(init 코드 실행, 패키지 로드 등)에 시간이 걸림
- **Warm Start**: 이미 실행 중인 인스턴스를 재사용 — 초기화 없이 즉시 실행
- **Provisioned Concurrency(미리 준비된 동시성)**: 지정한 수의 Lambda 인스턴스를 항상 준비 상태로 유지 → Cold Start 완전 제거, 모든 호출 저지연
- Application Auto Scaling으로 동시성 관리 (스케줄/타겟 사용률)

#### Lambda SnapStart
- Java, Python, .NET에서 성능 10배 향상 (추가 비용 없음)
- 새 버전 게시 시 초기화된 함수의 메모리/디스크 스냅샷을 캐싱
- 사전 초기화된 상태에서 호출 (init 단계 건너뜀)

### CloudFront Functions & Lambda@Edge

#### Edge Function 개요
- CloudFront 배포에 연결하여 사용자에 가까운 위치에서 실행
- 서버 관리 불필요, 글로벌 배포, 사용량 기반 과금
- 사용 사례: CDN 콘텐츠 커스터마이징, 보안, A/B 테스트, 인증

#### CloudFront Functions
- **JavaScript**로 작성된 경량 함수
- **수백만 요청/초**, sub-ms 시작 시간
- **Viewer Request/Response만** 처리
- CloudFront 내에서 코드 관리

#### Lambda@Edge
- **Node.js 또는 Python**
- **수천 요청/초**
- **Viewer Request/Response + Origin Request/Response** 모두 처리
- us-east-1에서 작성, CloudFront가 전 세계 복제

#### CloudFront Functions vs Lambda@Edge
| 항목 | CloudFront Functions | Lambda@Edge |
|------|---------------------|-------------|
| 런타임 | JavaScript | Node.js, Python |
| 요청 처리량 | 수백만/초 | 수천/초 |
| 트리거 | Viewer Request/Response | Viewer + Origin Request/Response |
| 최대 실행 시간 | < 1ms | 5-10초 |
| 최대 메모리 | 2 MB | 128 MB ~ 10 GB |
| 패키지 크기 | 10 KB | 1-50 MB |
| 네트워크/파일 접근 | 불가 | 가능 |
| 요청 본문 접근 | 불가 | 가능 |
| 가격 | Free tier 있음, Lambda@Edge의 1/6 | Free tier 없음 |

#### CloudFront Functions 사용 사례
- 캐시 키 정규화, 헤더 조작, URL 리다이렉트, 요청 인증/인가 (JWT 검증)

#### Lambda@Edge 사용 사례
- 긴 실행 시간 필요, 3rd party 라이브러리/AWS SDK 사용, 외부 서비스 호출, HTTP 요청 본문 접근

### Lambda in VPC
- 기본적으로 AWS 소유 VPC에서 실행 -> **사용자 VPC 리소스(RDS, ElastiCache) 접근 불가**
- VPC에 Lambda 배포: VPC ID, 서브넷, 보안 그룹 지정 -> ENI 생성

#### Lambda with RDS Proxy
- Lambda가 DB에 직접 접근 시 고부하에서 연결 과다 문제
- **RDS Proxy**: 연결 풀링/공유로 확장성 향상, 장애 조치 시간 66% 감소, IAM 인증 + Secrets Manager
- **Lambda는 VPC에 배포 필수** (RDS Proxy는 퍼블릭 접근 불가)

#### Lambda에서 RDS/Aurora 호출
- DB 인스턴스에서 Lambda 함수 호출 가능 (데이터 이벤트 처리)
- RDS for PostgreSQL, Aurora MySQL 지원
- DB -> Lambda 아웃바운드 트래픽 허용 필요 (Public, NAT GW, VPC Endpoints)

#### RDS Event Notifications
- DB 인스턴스 자체 이벤트 (생성, 중지, 시작 등) -> SNS 또는 EventBridge
- **데이터 자체에 대한 정보가 아님** (데이터 변경은 Lambda에서 DB 호출로 처리)

### Amazon DynamoDB

#### 기본 특성
- 완전 관리형 NoSQL, Multi-AZ 복제, 트랜잭션 지원
- 수백만 요청/초, 수조 행, 수백 TB 스토리지
- 한 자릿수 밀리초 지연, IAM 통합, 저비용, 자동 스케일링
- Standard & IA (Infrequent Access) 테이블 클래스

#### DynamoDB 기본 구조
- 테이블 -> Primary Key(파티션 키 + 선택적 정렬 키) -> 아이템(행) -> 속성(열)
- 아이템 최대 크기: **400 KB**
- 스키마를 빠르게 변경 가능 (속성 추가 자유)

#### Read/Write Capacity Modes
- **Provisioned Mode (기본)**: RCU/WCU 사전 설정, Auto-scaling 가능
- **On-Demand Mode**: 자동 스케일링, 용량 계획 불필요, 더 비싸지만 예측 불가한 워크로드에 적합

#### DynamoDB Accelerator (DAX)
- DynamoDB용 완전 관리형 인메모리 캐시
- **마이크로초 지연**, 기존 DynamoDB API 호환 (앱 코드 변경 불필요)
- 기본 TTL: 5분
- **DAX vs ElastiCache**: DAX는 개별 객체/쿼리/스캔 캐시, ElastiCache는 집계 결과 저장

#### DynamoDB Streams
> **왜 필요한가?** DynamoDB 테이블에 새 데이터가 추가되거나 변경될 때 "이 사실을 다른 서비스에도 알리고 싶다"면? 예를 들어 새 사용자가 가입하면 환영 이메일을 자동 발송하고 싶을 때, DynamoDB Streams를 켜두면 데이터 변경 이벤트가 스트림에 기록되고, Lambda 등이 이를 구독하여 처리한다. 데이터베이스의 변경 이력을 실시간으로 이벤트로 변환하는 역할이다.

- 테이블의 아이템 변경(생성/수정/삭제) 이벤트의 순서가 보장된 스트림 (변경 이력 로그)
- 사용 사례: 실시간 반응(신규 가입 → 이메일 발송), 분석, 파생 테이블, Cross-Region 복제, Lambda 트리거

| DynamoDB Streams | Kinesis Data Streams (신규) |
|-----------------|---------------------------|
| 24시간 보존 | 1년 보존 |
| Consumer 수 제한 | 다수 Consumer |
| Lambda Triggers, KCL Adapter | Lambda, Analytics, Firehose, Glue |

#### DynamoDB Global Tables
- 다중 리전에서 저지연으로 테이블 접근
- **Active-Active 복제** (모든 리전에서 읽기/쓰기)
- **DynamoDB Streams 활성화 필수** (사전 조건)

#### DynamoDB TTL (Time To Live)
- 만료 타임스탬프 기반 자동 아이템 삭제
- 사용 사례: 현재 데이터만 유지, 규정 준수, 웹 세션 관리

#### DynamoDB Backups
- **PITR (Point-in-Time Recovery)**: 최근 35일 이내 특정 시점 복구, 새 테이블 생성
- **On-demand Backups**: 장기 보존, 성능 영향 없음, AWS Backup으로 Cross-Region 복사

#### DynamoDB S3 통합
- **Export (PITR 필요)**: 35일 이내 특정 시점 -> S3, 읽기 용량 미영향, DynamoDB JSON/ION
- **Import**: CSV/JSON/ION -> S3에서 새 테이블 생성, 쓰기 용량 미사용

### AWS API Gateway
> **왜 필요한가?** Lambda 함수는 직접 인터넷에 노출될 수 없다. API Gateway는 클라이언트(앱, 웹)가 Lambda를 HTTP/HTTPS로 호출할 수 있도록 연결해주는 "현관문" 역할이다. 인증, 요청 제한(스로틀링), 캐싱, API 버전 관리 등 API 서버에 필요한 공통 기능을 코드 없이 설정만으로 제공한다.

```text
 API Gateway -> Lambda -> DynamoDB 서버리스 아키텍처
 ─────────────────────────────────────────────────────
 ┌────────┐     ┌─────────────┐     ┌──────────┐     ┌───────────┐
 │ Client │────▶│ API Gateway │────▶│  Lambda  │────▶│ DynamoDB  │
 │(Mobile/│ REST│             │Invoke│          │CRUD │           │
 │ Web)   │ API │ ┌─────────┐ │     │ (비즈니스│     │ ┌───────┐ │
 └────────┘     │ │캐싱     │ │     │  로직)   │     │ │ DAX   │ │
                │ │인증/인가│ │     │          │     │ │(캐시) │ │
                │ │스로틀링 │ │     │          │     │ └───────┘ │
                │ └─────────┘ │     └──────────┘     └───────────┘
                └─────────────┘
                      │
                ┌─────┴─────┐
                │  Cognito  │ (사용자 인증)
                └───────────┘

 Endpoint Types:
 ┌─────────────────┐  ┌──────────┐  ┌───────────────┐
 │ Edge-Optimized  │  │ Regional │  │   Private     │
 │ (CloudFront     │  │ (같은    │  │ (VPC 내부     │
 │  Edge 경유)     │  │  리전)   │  │  전용)        │
 └─────────────────┘  └──────────┘  └───────────────┘
```

- Lambda + API Gateway: 완전 서버리스 REST API
- WebSocket, API 버전 관리, 환경 관리, 보안(인증/인가), API 키, 요청 스로틀링
- Swagger/OpenAPI import, 요청/응답 변환/검증, SDK/API 사양 생성, 응답 캐싱

#### API Gateway 통합
- **Lambda Function**: REST API를 Lambda로 노출
- **HTTP**: 온프레미스 HTTP API, ALB 등에 인증/캐싱/스로틀링 추가
- **AWS Service**: SQS, Step Functions 등 AWS API를 공개적으로 노출

#### Endpoint Types
- **Edge-Optimized (기본)**: 글로벌 클라이언트, CloudFront Edge를 통해 라우팅
- **Regional**: 같은 리전 클라이언트, CloudFront와 수동 결합 가능
- **Private**: VPC 내에서만 접근 (Interface VPC Endpoint + Resource Policy)

#### API Gateway 보안
- 인증: IAM Roles (내부), Cognito (외부/모바일), Custom Authorizer
- HTTPS: ACM 통합
  - Edge-Optimized -> 인증서 **us-east-1** 필수
  - Regional -> API Gateway 리전에 인증서
- Route 53에 CNAME 또는 A-alias 레코드 설정

### AWS Step Functions

```text
 Step Functions 워크플로우 예시 (주문 처리)
 ─────────────────────────────────────────
                  [Start]
                     │
                     ▼
              ┌──────────────┐
              │ 주문 검증     │ ◀── Lambda
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐    실패 ──▶ [오류 처리]
              │ 재고 확인     │ ◀── Lambda
              └──────┬───────┘
                     │ 성공
            ┌────────┴────────┐  (병렬 실행)
            ▼                 ▼
     ┌────────────┐   ┌────────────┐
     │ 결제 처리   │   │ 배송 준비   │ ◀── Lambda/ECS
     └──────┬─────┘   └──────┬─────┘
            └────────┬────────┘
                     ▼
              ┌──────────────┐
              │ 알림 전송     │ ◀── SNS / SES
              └──────┬───────┘
                     ▼
                   [End]
```

- Lambda 함수를 오케스트레이션하는 서버리스 시각적 워크플로우
- 순차, 병렬, 조건, 타임아웃, 오류 처리
- EC2, ECS, 온프레미스, API Gateway, SQS 등과 통합
- 인간 승인 기능 구현 가능
- 사용 사례: 주문 처리, 데이터 처리, 웹 앱, 워크플로우

### Amazon Cognito

#### Cognito User Pools (CUP)
- 웹/모바일 앱 사용자의 **서버리스 사용자 데이터베이스**
- 사용자명/이메일 + 비밀번호 로그인, 비밀번호 재설정, MFA
- 이메일/전화번호 인증
- 페더레이션 인증: Facebook, Google, SAML
- **API Gateway 및 ALB와 통합**

#### Cognito Identity Pools (Federated Identity)
- 사용자에게 **임시 AWS 자격증명** 제공
- 소스: Cognito User Pools, 3rd party 로그인 등
- AWS 서비스에 직접 접근 (API Gateway 또는 직접)
- IAM 정책은 Cognito에서 정의, user_id 기반 세밀한 제어
- 인증/게스트 사용자별 기본 IAM 역할

#### Cognito vs IAM
- **"수백 명의 사용자", "모바일 사용자", "SAML 인증"** -> Cognito 사용

## 시험 포인트
- Lambda **최대 실행 시간 15분** -> 15분 이상 필요하면 ECS/Fargate/Step Functions
- Lambda **동시 실행 기본 1,000** -> Reserved/Provisioned Concurrency
- Lambda **Provisioned Concurrency**: Cold Start 제거
- **CloudFront Functions**: 경량, Viewer 요청/응답만, sub-ms
- **Lambda@Edge**: Origin 요청/응답도 처리, 네트워크/파일 접근 가능
- Lambda VPC 배포 시 ENI 생성, **RDS Proxy는 퍼블릭 불가**
- DynamoDB: **400 KB** 아이템 크기 제한, **DAX는 마이크로초 캐시**
- DynamoDB Global Tables: **Streams 활성화 필수**
- API Gateway Edge-Optimized: ACM 인증서 **us-east-1** 필수
- **Cognito User Pools**: 사용자 인증 (토큰 발행)
- **Cognito Identity Pools**: AWS 자격증명 제공 (S3, DynamoDB 직접 접근)

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Lambda | 서버리스 함수, 최대 15분, 10GB RAM, 1000 동시실행 |
| Lambda Provisioned Concurrency | Cold Start 제거, 사전 동시성 할당 |
| Lambda SnapStart | Java/Python/.NET 성능 10x 향상, 스냅샷 캐싱 |
| CloudFront Functions | JS, sub-ms, Viewer만, 수백만/초 |
| Lambda@Edge | Node.js/Python, 5-10초, Viewer+Origin, 수천/초 |
| Lambda in VPC | ENI 생성, RDS/ElastiCache 접근 |
| RDS Proxy | 연결 풀링, 장애조치 66% 감소, VPC 필수 |
| DynamoDB | NoSQL, 400KB 아이템, Provisioned/On-demand |
| DAX | DynamoDB 인메모리 캐시, 마이크로초, API 호환 |
| DynamoDB Streams | 변경 이벤트 스트림, 24시간 보존 |
| DynamoDB Global Tables | Active-Active, 다중 리전, Streams 필수 |
| API Gateway | REST API, 3가지 엔드포인트 타입, 캐싱/인증 |
| Step Functions | Lambda 워크플로우 오케스트레이션 |
| Cognito User Pools | 사용자 인증, 토큰 발행, API GW/ALB 통합 |
| Cognito Identity Pools | 임시 AWS 자격증명, S3/DynamoDB 직접 접근 |

---

## Practice Questions

### Q1. A company has a Lambda function that processes files uploaded to S3. During peak hours, users report that some files are not processed. The function takes about 2 minutes to complete. CloudWatch logs show ThrottleError (429). What should the solutions architect do?
**Options:**
- A) Increase the Lambda function timeout to 15 minutes
- B) Request a concurrency limit increase through AWS Support
- C) Switch to Amazon EC2 instances for processing
- D) Reduce the Lambda function memory allocation

**Answer:** B

**해설:**

> **문제:** 회사에 S3에 업로드된 파일을 처리하는 Lambda 함수가 있다. 피크 시간 동안 일부 파일이 처리되지 않는다고 사용자가 보고한다. 함수는 완료까지 약 2분이 걸린다. CloudWatch 로그에 ThrottleError (429)가 표시된다. 솔루션 아키텍트는 무엇을 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Lambda 함수 타임아웃을 15분으로 증가 |
| B | AWS Support를 통해 동시성 제한 증가 요청 |
| C | 처리를 위해 Amazon EC2 인스턴스로 전환 |
| D | Lambda 함수 메모리 할당 감소 |

**(A)** : 타임아웃 증가는 실행 시간이 2분으로 이미 충분하므로 스로틀링 문제와 무관하다. 타임아웃이 아니라 동시 실행 제한이 문제이다.

**(B) 정답** : ThrottleError 429는 동시 실행 제한(기본 리전당 1,000)에 도달했음을 의미한다. AWS Support에 동시성 제한 증가를 요청하거나 Reserved Concurrency/Provisioned Concurrency를 설정해야 한다. → [📖 AWS Lambda](/section/17-serverless-overview#aws-lambda)

**(C)** : EC2 전환은 서버리스의 자동 스케일링, 사용량 기반 과금 등의 이점을 포기하는 것이다. 근본적 해결책이 아니다.

**(D)** : 메모리 감소는 오히려 처리 시간을 늘려 동시 실행을 더 많이 사용하게 되어 문제를 악화시킬 수 있다.

**핵심 개념:** Lambda Concurrency, Throttling

**관련 노트:** [AWS Lambda](/section/17-serverless-overview#aws-lambda), [서버리스란?](/section/17-serverless-overview#서버리스란)

### Q2. A company needs to run a data processing job that takes 30 minutes to complete. They want a serverless solution. Which service should they use?
**Options:**
- A) AWS Lambda
- B) AWS Fargate with Amazon ECS
- C) Amazon EC2 Spot Instances
- D) AWS Batch on EC2

**Answer:** B

**해설:**

> **문제:** 회사가 완료까지 30분이 걸리는 데이터 처리 작업을 실행해야 한다. 서버리스 솔루션을 원한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Lambda |
| B | Amazon ECS가 있는 AWS Fargate |
| C | Amazon EC2 Spot 인스턴스 |
| D | EC2 기반 AWS Batch |

**(A)** : Lambda의 최대 실행 시간은 15분이다. 30분 작업을 실행할 수 없다. → [📖 AWS Lambda](/section/17-serverless-overview#aws-lambda)

**(B) 정답** : Fargate + ECS는 서버리스이면서 실행 시간 제한이 없다. 30분 이상의 긴 작업을 서버리스로 처리할 수 있는 적합한 솔루션이다. → [📖 서버리스란?](/section/17-serverless-overview#서버리스란)

**(C)** : EC2 Spot 인스턴스는 서버리스가 아니다. 인스턴스를 직접 관리해야 한다.

**(D)** : AWS Batch on EC2도 서버리스가 아닌 EC2 기반이다. 서버리스 요구사항을 충족하지 못한다.

**핵심 개념:** Lambda 최대 실행 시간 15분 제한

**관련 노트:** [AWS Lambda](/section/17-serverless-overview#aws-lambda), [서버리스란?](/section/17-serverless-overview#서버리스란)

### Q3. A company has a DynamoDB table that is used globally. Users in the US and Europe need low-latency read and write access. What feature should they enable?
**Options:**
- A) DynamoDB DAX
- B) DynamoDB Global Tables
- C) DynamoDB On-Demand capacity mode
- D) DynamoDB Point-in-Time Recovery

**Answer:** B

**해설:**

> **문제:** 회사에 전 세계적으로 사용되는 DynamoDB 테이블이 있다. 미국과 유럽의 사용자가 저지연 읽기 및 쓰기 접근이 필요하다. 어떤 기능을 활성화해야 하는가?

| 선지 | 번역 |
|------|------|
| A | DynamoDB DAX |
| B | DynamoDB Global Tables |
| C | DynamoDB On-Demand 용량 모드 |
| D | DynamoDB Point-in-Time Recovery |

**(A)** : DAX는 단일 리전 인메모리 캐시이다. 다른 리전 사용자에게 저지연 접근을 제공하지 못한다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(B) 정답** : DynamoDB Global Tables는 다중 리전에서 Active-Active 복제를 제공하여 US와 Europe 사용자 모두 가장 가까운 리전에서 저지연 읽기/쓰기가 가능하다. DynamoDB Streams 활성화가 사전 조건이다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C)** : On-Demand 용량 모드는 트래픽 예측이 어려울 때의 용량 관리 방식이다. 글로벌 접근과는 무관하다.

**(D)** : PITR(Point-in-Time Recovery)은 데이터 백업/복구 기능이다. 글로벌 저지연 접근과 무관하다.

**핵심 개념:** DynamoDB Global Tables, Active-Active 복제

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

### Q4. A company has a public-facing REST API using API Gateway. They need to authenticate mobile app users. The users sign up with email/password and can also log in with their Facebook accounts. Which service should they use for authentication?
**Options:**
- A) IAM Users and Groups
- B) Amazon Cognito User Pools
- C) API Gateway API Keys
- D) AWS IAM Identity Center (SSO)

**Answer:** B

**해설:**

> **문제:** 회사에 API Gateway를 사용하는 공개 REST API가 있다. 모바일 앱 사용자를 인증해야 한다. 사용자는 이메일/비밀번호로 가입하고 Facebook 계정으로도 로그인할 수 있다. 인증에 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | IAM 사용자 및 그룹 |
| B | Amazon Cognito User Pools |
| C | API Gateway API 키 |
| D | AWS IAM Identity Center (SSO) |

**(A)** : IAM Users/Groups는 AWS 내부 사용자용이다. 모바일 앱의 수많은 외부 사용자 관리에 적합하지 않으며 소셜 로그인을 지원하지 않는다.

**(B) 정답** : Cognito User Pools는 이메일/비밀번호 로그인과 Facebook, Google 등 소셜 로그인(페더레이션 인증)을 지원하며 API Gateway와 직접 통합된다. 두 요구사항을 모두 충족한다. → [📖 Amazon Cognito](/section/17-serverless-overview#amazon-cognito)

**(C)** : API Keys는 인증이 아닌 API 사용량 제어/추적용이다. 사용자 신원 확인 기능이 없다.

**(D)** : IAM Identity Center(SSO)는 기업 내부 직원의 AWS 서비스 접근을 위한 것이다. 외부 모바일 사용자 인증용이 아니다. → [📖 AWS IAM Identity Center AWS SSO 후속](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**핵심 개념:** Cognito User Pools, 페더레이션 인증

**관련 노트:** [Amazon Cognito](/section/17-serverless-overview#amazon-cognito)

### Q5. A mobile application needs to allow authenticated users to upload files directly to their own folder in an S3 bucket. Users authenticate through Cognito User Pools. How should the solutions architect provide S3 access?
**Options:**
- A) Generate IAM users for each mobile app user
- B) Use Cognito Identity Pools to provide temporary AWS credentials with IAM policies scoped to the user's folder
- C) Create pre-signed URLs for each upload
- D) Make the S3 bucket public with folder-level ACLs

**Answer:** B

**해설:**

> **문제:** 모바일 애플리케이션에서 인증된 사용자가 S3 버킷의 자신의 폴더에 직접 파일을 업로드할 수 있어야 한다. 사용자는 Cognito User Pools를 통해 인증된다. 솔루션 아키텍트는 S3 접근을 어떻게 제공해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 각 모바일 앱 사용자를 위한 IAM 사용자 생성 |
| B | Cognito Identity Pools를 사용하여 사용자 폴더로 범위가 지정된 IAM 정책과 함께 임시 AWS 자격증명 제공 |
| C | 각 업로드에 대해 사전 서명된 URL 생성 |
| D | S3 버킷을 퍼블릭으로 설정하고 폴더 수준 ACL 적용 |

**(A)** : 각 모바일 앱 사용자를 위해 IAM 사용자를 생성하는 것은 수백만 명의 사용자에 대해 확장이 불가능하다. 장기 자격증명 관리 부담도 크다.

**(B) 정답** : Cognito Identity Pools는 Cognito User Pools로 인증된 사용자에게 임시 AWS 자격증명을 제공한다. user_id 기반으로 S3 폴더 접근 권한을 세밀하게 제어할 수 있어 "자신의 폴더에만 접근" 요구사항에 적합하다. → [📖 Amazon Cognito](/section/17-serverless-overview#amazon-cognito)

**(C)** : Pre-signed URLs도 가능하지만 Lambda 등의 백엔드가 필요하다. Cognito Identity Pools가 더 직접적이고 확장 가능한 솔루션이다.

**(D)** : 퍼블릭 버킷으로 설정하는 것은 심각한 보안 위험이다. 모든 사람이 다른 사용자의 파일에도 접근할 수 있게 된다.

**핵심 개념:** Cognito Identity Pools, 임시 AWS 자격증명

**관련 노트:** [Amazon Cognito](/section/17-serverless-overview#amazon-cognito)

### Q6. A company wants to customize CloudFront responses by adding security headers to every response. The function must handle millions of requests per second with sub-millisecond latency. Which solution is MOST appropriate?
**Options:**
- A) Lambda@Edge function triggered on Viewer Response
- B) CloudFront Functions triggered on Viewer Response
- C) AWS WAF custom rules on CloudFront
- D) Origin server middleware to add headers

**Answer:** B

**해설:**

> **문제:** 회사가 모든 응답에 보안 헤더를 추가하여 CloudFront 응답을 커스터마이징하려 한다. 함수는 sub-millisecond 지연으로 초당 수백만 요청을 처리해야 한다. 가장 적절한 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Viewer Response에서 트리거되는 Lambda@Edge 함수 |
| B | Viewer Response에서 트리거되는 CloudFront Functions |
| C | CloudFront의 AWS WAF 커스텀 규칙 |
| D | 헤더를 추가하는 오리진 서버 미들웨어 |

**(A)** : Lambda@Edge도 Viewer Response에서 헤더를 추가할 수 있지만 처리량이 낮고 실행 시간이 길어 비용이 CloudFront Functions보다 약 6배 높다. "수백만 요청/초" 요구사항에 비용 효율적이지 않다. → [📖 CloudFront Functions & Lambda@Edge](/section/17-serverless-overview#cloudfront-functions-lambdaedge)

**(B) 정답** : CloudFront Functions는 수백만 요청/초를 sub-ms 지연으로 처리할 수 있다. 보안 헤더 추가와 같은 헤더 조작은 CloudFront Functions의 대표적 사용 사례로 비용 효율적이다. → [📖 CloudFront Functions & Lambda@Edge](/section/17-serverless-overview#cloudfront-functions-lambdaedge)

**(C)** : WAF는 요청 필터링/차단용이다. 응답 헤더 추가 기능이 없다.

**(D)** : 오리진 서버 미들웨어는 모든 요청이 오리진까지 도달해야 한다. Edge 캐싱의 이점이 없고 지연이 증가한다.

**핵심 개념:** CloudFront Functions, Viewer Response, 헤더 조작

**관련 노트:** [CloudFront Functions & Lambda@Edge](/section/17-serverless-overview#cloudfront-functions-lambdaedge)

### Q7. A Lambda function needs to connect to an RDS PostgreSQL database in a VPC. During traffic spikes, the database becomes overwhelmed with too many connections. What is the BEST solution?
**Options:**
- A) Increase the RDS instance size
- B) Deploy the Lambda function in the VPC and use RDS Proxy
- C) Use DynamoDB instead of RDS
- D) Implement connection caching in the Lambda function code

**Answer:** B

**해설:**

> **문제:** Lambda 함수가 VPC 내의 RDS PostgreSQL 데이터베이스에 연결해야 한다. 트래픽 급증 시 너무 많은 연결로 데이터베이스가 과부하된다. 가장 좋은 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | RDS 인스턴스 크기 증가 |
| B | VPC에 Lambda 함수를 배포하고 RDS Proxy 사용 |
| C | RDS 대신 DynamoDB 사용 |
| D | Lambda 함수 코드에서 연결 캐싱 구현 |

**(A)** : RDS 인스턴스 크기 증가는 비용이 높고 연결 수 문제를 근본적으로 해결하지 못한다. 연결이 많으면 큰 인스턴스도 결국 한계에 도달한다.

**(B) 정답** : RDS Proxy는 연결 풀링/공유로 DB 연결 수를 대폭 줄이고 장애 조치 시간을 66% 감소시킨다. Lambda는 VPC에 배포되어야 하며 RDS Proxy는 퍼블릭 접근이 불가능하다. → [📖 Lambda in VPC](/section/17-serverless-overview#lambda-in-vpc)

**(C)** : DynamoDB 전환은 기존 관계형 데이터 모델의 재설계가 필요하다. 현실적이지 않은 선택이다.

**(D)** : Lambda 코드 내 연결 캐싱은 각 Lambda 인스턴스가 독립적이므로 인스턴스마다 별도 연결을 생성한다. 효과가 매우 제한적이다.

**핵심 개념:** Lambda + RDS Proxy, VPC 배포

**관련 노트:** [Lambda in VPC](/section/17-serverless-overview#lambda-in-vpc), [AWS Lambda](/section/17-serverless-overview#aws-lambda)

### Q8. A DynamoDB table has many read operations but few write operations. The application requires microsecond latency for read operations. Which caching solution should be used?
**Options:**
- A) Amazon ElastiCache Redis
- B) DynamoDB Accelerator (DAX)
- C) Amazon CloudFront
- D) API Gateway caching

**Answer:** B

**해설:**

> **문제:** DynamoDB 테이블에 읽기 작업은 많지만 쓰기 작업은 적다. 애플리케이션은 읽기 작업에 마이크로초 지연이 필요하다. 어떤 캐싱 솔루션을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon ElastiCache Redis |
| B | DynamoDB Accelerator (DAX) |
| C | Amazon CloudFront |
| D | API Gateway 캐싱 |

**(A)** : ElastiCache Redis도 캐싱을 제공하지만 DynamoDB API와 직접 호환되지 않아 코드 변경이 필요하다. 집계 결과 저장에 더 적합한 솔루션이다. → [📖 Amazon ElastiCache](/section/19-databases#amazon-elasticache)

**(B) 정답** : DAX는 DynamoDB 전용 인메모리 캐시로 마이크로초 지연을 제공한다. 기존 DynamoDB API와 완벽히 호환되어 앱 코드 변경 없이 사용할 수 있다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C)** : CloudFront는 HTTP 응답을 Edge에서 캐싱하는 CDN이다. DynamoDB DB 레벨 캐싱이 아니다.

**(D)** : API Gateway 캐싱은 API 응답 레벨 캐싱이다. DynamoDB 읽기를 직접 최적화하지 않는다.

**핵심 개념:** DynamoDB Accelerator (DAX), 마이크로초 캐시

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Amazon DynamoDB](/section/19-databases#amazon-dynamodb)
