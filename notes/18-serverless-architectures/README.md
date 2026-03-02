# Serverless Architectures

## 개요
이 섹션은 실제 서버리스 아키텍처 설계 패턴을 다룬다. 모바일 앱(MyTodoList), 서버리스 웹사이트(MyBlog.com), 마이크로서비스 아키텍처, CloudFront를 활용한 소프트웨어 업데이트 오프로딩 등의 솔루션 아키텍처를 통해 여러 서비스를 조합하는 방법을 학습한다. 시험에서 아키텍처 설계 문제에서 매우 자주 출제되는 핵심 패턴들이다.

## 핵심 개념

### 아키텍처 1: 모바일 앱 (MyTodoList)

#### 요구사항
- REST API (HTTPS), 서버리스 아키텍처
- 사용자가 S3에서 자신의 폴더에 직접 접근
- 관리형 서버리스 서비스로 인증
- To-do 읽기/쓰기 (읽기가 대부분)
- 확장 가능한 DB, 높은 읽기 처리량

#### 아키텍처 구성

```text
 ┌───────────┐     ┌─────────────┐     ┌──────────┐     ┌───────────────┐
 │  Mobile   │────▶│ API Gateway │────▶│  Lambda  │────▶│  DynamoDB     │
 │  Client   │REST │             │     │          │     │  ┌─────────┐  │
 └─────┬─────┘ API │  [캐싱]     │     │          │     │  │  DAX    │  │
       │           └─────────────┘     └──────────┘     │  │ (캐시)  │  │
       │                                                │  └─────────┘  │
       │  ┌──────────────────────────────┐              └───────────────┘
       │  │      Amazon Cognito          │
       ├─▶│  ┌────────────┐             │
       │  │  │ User Pools │ (인증/토큰)  │
       │  │  └──────┬─────┘             │
       │  │         ▼                   │
       │  │  ┌──────────────┐           │
       │  │  │Identity Pools│ (임시 AWS │
       │  │  │              │  자격증명) │
       │  │  └──────┬───────┘           │
       │  └─────────┼───────────────────┘
       │            ▼
       │     ┌────────────┐
       └────▶│  Amazon S3 │ (사용자별 폴더 직접 접근)
             └────────────┘
```

#### 핵심 설계 포인트
1. **REST API**: API Gateway + Lambda + DynamoDB (완전 서버리스) — 서버 관리 없이 HTTP API 제공
2. **인증**: Amazon Cognito (User Pools로 "이 사람이 누구인지" 인증, Identity Pools로 "AWS 서비스에 직접 접근할 임시 자격증명" 발급)
3. **S3 직접 접근**: Cognito Identity Pools → 임시 자격증명 + 제한된 IAM 정책 — Lambda를 거치지 않고 클라이언트가 직접 S3에 업로드하므로 서버 부하 없음
4. **읽기 캐싱**: DynamoDB DAX (DB 레벨 캐시) — 자주 읽는 데이터를 메모리에 저장해 DynamoDB 호출 횟수 감소
5. **API 캐싱**: API Gateway 응답 캐싱 — 동일한 API 요청이 반복될 때 Lambda를 다시 호출하지 않고 캐시에서 응답

### 아키텍처 2: 서버리스 웹사이트 (MyBlog.com)

#### 요구사항
- 글로벌 확장 웹사이트
- 블로그는 쓰기 적고 읽기 많음
- 정적 파일 + 동적 REST API
- 캐싱 최대한 활용
- 새 사용자 가입 시 환영 이메일
- 사진 업로드 시 썸네일 생성

#### 아키텍처 구성

**정적 콘텐츠 전송:**
```
Client -> CloudFront (글로벌 배포) -> Amazon S3
                                      (OAC + 버킷 정책: CloudFront에서만 접근)
```

**동적 REST API:**
```
Client -> CloudFront -> API Gateway -> Lambda -> DynamoDB (DAX 캐싱)
                                                 |
                                        DynamoDB Global Tables (글로벌)
```

**사용자 환영 이메일:**
```
DynamoDB -> DynamoDB Stream -> Lambda (IAM Role) -> Amazon SES (이메일 전송)
```

**썸네일 생성:**
```
S3 (사진 업로드, Transfer Acceleration) -> CloudFront (업로드)
S3 -> trigger -> Lambda (썸네일 생성) -> S3 (썸네일 저장)
                                      -> SQS / SNS (알림)
```

#### 핵심 설계 포인트
1. **정적 콘텐츠**: CloudFront + S3 + OAC (보안) — HTML/CSS/JS 파일을 전 세계 Edge에 캐싱해 빠르게 제공, OAC로 S3 직접 접근 차단
2. **글로벌 데이터**: DynamoDB Global Tables — 여러 리전에서 동시에 읽기/쓰기 가능(active-active), 전 세계 사용자가 가까운 리전에서 저지연 접근
3. **이벤트 기반 처리**: DynamoDB Streams -> Lambda -> SES — "사용자 등록"이라는 DB 이벤트가 자동으로 Lambda를 깨워 환영 이메일을 보냄. 직접 코드로 이메일을 보내는 것보다 느슨하게 결합되어 유지보수가 쉬움
4. **S3 이벤트**: S3 -> Lambda/SQS/SNS 트리거 — 이미지 업로드 즉시 Lambda가 자동 실행되어 썸네일 생성
5. **Aurora Global Database**도 DynamoDB Global Tables 대안으로 사용 가능 (단, Aurora Global은 단일 리전 쓰기)

### 아키텍처 3: 마이크로서비스

#### 구성 패턴

```text
 ┌─────────────────────────────────────────────────────────────────┐
 │                      마이크로서비스 아키텍처                      │
 │                                                                 │
 │  service1.example.com                                           │
 │  ┌─────────┐   ┌─────┐   ┌─────┐   ┌──────────┐               │
 │  │Route 53 │──▶│ ELB │──▶│ ECS │──▶│ DynamoDB │               │
 │  └─────────┘   └─────┘   └─────┘   └──────────┘               │
 │                                                                 │
 │  service2.example.com                                           │
 │  ┌─────────┐   ┌─────────────┐   ┌────────┐   ┌────────────┐  │
 │  │Route 53 │──▶│ API Gateway │──▶│ Lambda │──▶│ElastiCache │  │
 │  └─────────┘   └─────────────┘   └────────┘   └────────────┘  │
 │                                                                 │
 │  service3.example.com                                           │
 │  ┌─────────┐   ┌─────┐   ┌──────────┐   ┌─────┐              │
 │  │Route 53 │──▶│ ELB │──▶│ EC2 ASG  │──▶│ RDS │              │
 │  └─────────┘   └─────┘   └──────────┘   └─────┘              │
 │                                                                 │
 │  동기: API Gateway / ALB     비동기: SQS / SNS / Kinesis       │
 └─────────────────────────────────────────────────────────────────┘
```

#### 핵심 설계 포인트
- 각 마이크로서비스를 자유롭게 설계 가능
- **동기 패턴**: API Gateway, Load Balancers
- **비동기 패턴**: SQS, Kinesis, SNS, Lambda triggers (S3)
- 마이크로서비스 과제: 서비스 생성 오버헤드, 서버 밀도 최적화, 다수 버전 관리, 클라이언트 코드 복잡성
- **서버리스가 해결하는 문제**: API Gateway/Lambda 자동 스케일링 + 사용량 과금, API 복제/환경 재현 용이, Swagger를 통한 SDK 생성

### 아키텍처 4: 소프트웨어 업데이트 오프로딩

#### 문제
- EC2에서 소프트웨어 업데이트를 배포하는 앱
- 업데이트 릴리스 시 대량 요청 -> 비용 및 CPU 부담
- 앱 변경 없이 비용/CPU 최적화 필요

#### 솔루션

```text
 기존 아키텍처 (높은 비용, 높은 부하):
 ┌────────┐     ┌─────┐     ┌──────────────┐     ┌─────┐
 │ Client │────▶│ ALB │────▶│ EC2 ASG      │────▶│ EFS │
 │(수천명)│     └─────┘     │ (고부하!!)   │     └─────┘
 └────────┘                 │ $$$$$$       │
                            └──────────────┘

 개선 아키텍처 (CloudFront 오프로딩):
 ┌────────┐     ┌────────────┐     ┌─────┐     ┌──────────┐     ┌─────┐
 │ Client │────▶│ CloudFront │────▶│ ALB │────▶│ EC2 ASG  │────▶│ EFS │
 │(수천명)│     │ (Edge 캐시)│     └─────┘     │ (저부하) │     └─────┘
 └────────┘     │ Cache HIT  │                 │ $        │
                │ ──▶ 즉시응답│                 └──────────┘
                └────────────┘
                대부분의 요청을
                Edge에서 처리!
```

#### 핵심 설계 포인트
- **아키텍처 변경 없음**: 기존 EC2 앱 앞에 CloudFront만 추가 — 코드 수정 불필요
- 소프트웨어 업데이트 파일은 정적(한 번 배포하면 변경되지 않음) → 캐싱에 최적
- 대부분의 다운로드 요청을 Edge가 처리 → EC2 요청 수 급감 → 부하 감소
- ASG(Auto Scaling Group)가 적은 인스턴스로도 운영 가능 → EC2 비용 절감
- 네트워크 대역폭 비용 절감, 가용성 향상
- **기존 앱이 서버리스가 아니어도 CloudFront로 확장성/비용 개선 가능** — 완전 서버리스 전환 없이도 즉각적인 효과

## 시험 포인트
- **모바일 앱 -> Cognito (User Pools + Identity Pools) + API Gateway + Lambda + DynamoDB + DAX**
- **S3 직접 접근은 Cognito Identity Pools의 임시 자격증명**으로 제공
- 읽기 많은 워크로드: **DAX (DB 캐시) + API Gateway 캐싱 (API 캐시)** 이중 캐싱
- **정적 웹사이트**: CloudFront + S3 + OAC
- **DynamoDB Global Tables**: 글로벌 저지연 데이터 접근
- **DynamoDB Streams -> Lambda**: 이벤트 기반 처리 (환영 이메일 등)
- **S3 이벤트 -> Lambda**: 이미지 처리 (썸네일 생성)
- **마이크로서비스**: 서비스별 다른 아키텍처 가능 (ECS, Lambda, EC2)
- **CloudFront 오프로딩**: 기존 앱 변경 없이 정적 콘텐츠 캐싱으로 비용/성능 개선
- SES(Simple Email Service)는 서버리스 이메일 전송 서비스

## 치트시트
| 패턴 | 구성 |
|------|------|
| 서버리스 REST API | API Gateway + Lambda + DynamoDB |
| 모바일 인증 | Cognito User Pools (인증) + Identity Pools (AWS 자격증명) |
| S3 직접 접근 | Cognito Identity Pools -> 임시 자격증명 + IAM 정책 |
| 읽기 최적화 | DAX (DB 캐시) + API Gateway 캐싱 |
| 정적 웹사이트 | CloudFront + S3 + OAC |
| 글로벌 데이터 | DynamoDB Global Tables |
| 이벤트 기반 처리 | DynamoDB Streams -> Lambda |
| 이미지 처리 | S3 이벤트 -> Lambda (썸네일 생성) |
| 환영 이메일 | DynamoDB Streams -> Lambda -> SES |
| 마이크로서비스 동기 | API Gateway / ALB |
| 마이크로서비스 비동기 | SQS / SNS / Kinesis / S3 Lambda triggers |
| 정적 콘텐츠 오프로딩 | 기존 앱 앞에 CloudFront 배치 |

---

## Practice Questions

### Q1. A company is building a mobile application where users need to authenticate and then directly upload files to their own folder in an S3 bucket. The solution must be serverless and scalable. Which combination of services should the solutions architect use?
**Options:**
- A) IAM users for each mobile user with S3 bucket policies
- B) Amazon Cognito User Pools for authentication and Cognito Identity Pools for temporary AWS credentials to access S3
- C) API Gateway with Lambda to proxy all S3 uploads
- D) CloudFront signed URLs for S3 access

**Answer:** B

**해설:**

> **문제:** 회사가 사용자가 인증 후 S3 버킷의 자신의 폴더에 직접 파일을 업로드해야 하는 모바일 애플리케이션을 구축하고 있다. 솔루션은 서버리스이고 확장 가능해야 한다. 솔루션 아키텍트는 어떤 서비스 조합을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 각 모바일 사용자에 대한 IAM 사용자와 S3 버킷 정책 |
| B | 인증을 위한 Amazon Cognito User Pools와 S3 접근을 위한 임시 AWS 자격증명을 제공하는 Cognito Identity Pools |
| C | 모든 S3 업로드를 프록시하는 API Gateway와 Lambda |
| D | S3 접근을 위한 CloudFront 서명된 URL |

**(A)** : IAM 사용자는 모바일 앱에서 수많은 사용자에 대해 확장이 불가능하다. 장기 자격증명 관리 부담도 크다.

**(B) 정답** : Cognito User Pools로 사용자 인증 후 Cognito Identity Pools에서 임시 AWS 자격증명을 발급받아 user_id 기반으로 S3 폴더 접근 권한을 제한할 수 있다. AWS의 권장 서버리스 패턴이다. → [📖 Amazon Cognito](/section/17-serverless-overview#amazon-cognito)

**(C)** : Lambda 프록시는 불필요한 복잡성을 추가한다. 모든 업로드 트래픽이 Lambda를 거쳐야 하므로 비효율적이다.

**(D)** : CloudFront 서명된 URL은 S3 직접 업로드가 아닌 콘텐츠 다운로드 접근 제어에 사용된다. 업로드 요구사항에 맞지 않는다.

**핵심 개념:** Cognito User Pools + Identity Pools, S3 직접 접근

**관련 노트:** [아키텍처 1: 모바일 앱 MyTodoList](/section/18-serverless-architectures#아키텍처-1-모바일-앱-mytodolist), [Amazon Cognito](/section/17-serverless-overview#amazon-cognito)

### Q2. A serverless blog website uses DynamoDB as the database. Most operations are reads, and users report slow response times. The architecture uses API Gateway -> Lambda -> DynamoDB. What TWO caching strategies should be implemented to improve performance? (Select TWO)
**Options:**
- A) Enable ElastiCache Redis cluster
- B) Enable DynamoDB Accelerator (DAX) for database caching
- C) Enable API Gateway response caching
- D) Use S3 as a caching layer
- E) Increase DynamoDB read capacity units

**Answer:** B, C

**해설:**

> **문제:** 서버리스 블로그 웹사이트가 DynamoDB를 데이터베이스로 사용하고 있다. 대부분의 작업이 읽기이며, 사용자가 느린 응답 시간을 보고한다. 아키텍처는 API Gateway -> Lambda -> DynamoDB이다. 성능을 개선하기 위해 어떤 두 가지 캐싱 전략을 구현해야 하는가? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | ElastiCache Redis 클러스터 활성화 |
| B | 데이터베이스 캐싱을 위한 DynamoDB Accelerator (DAX) 활성화 |
| C | API Gateway 응답 캐싱 활성화 |
| D | S3를 캐싱 레이어로 사용 |
| E | DynamoDB 읽기 용량 단위 증가 |

**(A)** : ElastiCache Redis도 캐싱을 제공하지만 DynamoDB API와 직접 통합되지 않아 코드 변경이 필요하다. DAX가 더 적합하다.

**(B) 정답** : DAX는 DynamoDB 전용 인메모리 캐시로 마이크로초 지연을 제공한다. DB 읽기 부하를 줄이고 기존 DynamoDB API와 호환되어 코드 변경이 불필요하다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C) 정답** : API Gateway 응답 캐싱은 API 레벨에서 반복 요청을 캐싱한다. DB까지 도달하는 요청 수 자체를 줄여준다. → [📖 AWS API Gateway](/section/17-serverless-overview#aws-api-gateway)

**(D)** : S3는 객체 스토리지이지 캐싱 레이어가 아니다. API 응답 캐싱에 적합하지 않다.

**(E)** : RCU 증가는 캐싱보다 비용이 높고 지연 시간을 근본적으로 줄이지 못한다.

**핵심 개념:** DAX + API Gateway 캐싱 (이중 캐싱)

**관련 노트:** [아키텍처 2: 서버리스 웹사이트 MyBlog.com](/section/18-serverless-architectures#아키텍처-2-서버리스-웹사이트-myblogcom), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [AWS API Gateway](/section/17-serverless-overview#aws-api-gateway)

### Q3. A company wants to build a globally distributed serverless website. Static content (HTML, CSS, JS) must be served with low latency worldwide. The S3 bucket must not be publicly accessible. Which architecture should the solutions architect implement?
**Options:**
- A) S3 with static website hosting enabled and public access
- B) CloudFront distribution with S3 as origin, using Origin Access Control (OAC) and S3 bucket policy
- C) S3 Cross-Region Replication to multiple regions
- D) Global Accelerator pointing to S3 buckets in multiple regions

**Answer:** B

**해설:**

> **문제:** 회사가 전 세계에 분산된 서버리스 웹사이트를 구축하려 한다. 정적 콘텐츠(HTML, CSS, JS)는 전 세계적으로 저지연으로 제공되어야 한다. S3 버킷은 공개적으로 접근할 수 없어야 한다. 솔루션 아키텍트는 어떤 아키텍처를 구현해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 정적 웹사이트 호스팅이 활성화되고 퍼블릭 접근이 가능한 S3 |
| B | S3를 오리진으로 하고 Origin Access Control(OAC)과 S3 버킷 정책을 사용하는 CloudFront 배포 |
| C | 여러 리전으로의 S3 Cross-Region Replication |
| D | 여러 리전의 S3 버킷을 가리키는 Global Accelerator |

**(A)** : S3 퍼블릭 접근을 허용하면 S3 버킷이 퍼블릭이 된다. "공개 접근 불가" 요구사항에 위배된다.

**(B) 정답** : CloudFront + S3 + OAC 조합은 서버리스 정적 웹사이트의 표준 패턴이다. OAC를 설정하면 S3 버킷은 퍼블릭이 아니면서 전 세계 Edge Location에서 저지연으로 콘텐츠를 제공할 수 있다. → [📖 아키텍처 2: 서버리스 웹사이트 MyBlog.com](/section/18-serverless-architectures#아키텍처-2-서버리스-웹사이트-myblogcom)

**(C)** : Cross-Region Replication은 리전별로 S3 접근을 분산할 수 있지만 글로벌 저지연 CDN 기능이 없다.

**(D)** : Global Accelerator는 S3 정적 웹사이트 배포용이 아니다. HTTP/비HTTP 애플리케이션 가속화용이다.

**핵심 개념:** CloudFront + S3 + OAC, 정적 웹사이트

**관련 노트:** [아키텍처 2: 서버리스 웹사이트 MyBlog.com](/section/18-serverless-architectures#아키텍처-2-서버리스-웹사이트-myblogcom)

### Q4. A company runs an application on EC2 instances that periodically distributes large software updates. During releases, the traffic spikes cause high EC2 costs. The company wants to reduce costs WITHOUT modifying the application. What should the solutions architect recommend?
**Options:**
- A) Migrate the application to AWS Lambda
- B) Place Amazon CloudFront in front of the existing application
- C) Use S3 Transfer Acceleration for faster downloads
- D) Scale up to larger EC2 instances during releases

**Answer:** B

**해설:**

> **문제:** 회사가 EC2 인스턴스에서 대규모 소프트웨어 업데이트를 주기적으로 배포하는 애플리케이션을 실행하고 있다. 릴리스 시 트래픽 급증으로 높은 EC2 비용이 발생한다. 회사는 애플리케이션을 수정하지 않고 비용을 줄이려 한다. 솔루션 아키텍트는 무엇을 추천해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 애플리케이션을 AWS Lambda로 마이그레이션 |
| B | 기존 애플리케이션 앞에 Amazon CloudFront 배치 |
| C | 더 빠른 다운로드를 위해 S3 Transfer Acceleration 사용 |
| D | 릴리스 시 더 큰 EC2 인스턴스로 스케일 업 |

**(A)** : Lambda로 마이그레이션은 앱 재작성이 필요하다. "앱 수정 없이" 요구사항에 위배된다.

**(B) 정답** : CloudFront를 기존 앱 앞에 배치하면 정적 소프트웨어 업데이트 파일을 Edge에서 캐싱하여 EC2 부하를 크게 줄인다. 앱 변경이 필요 없으며 ASG 스케일링 감소로 비용이 절감된다. → [📖 아키텍처 4: 소프트웨어 업데이트 오프로딩](/section/18-serverless-architectures#아키텍처-4-소프트웨어-업데이트-오프로딩)

**(C)** : S3 Transfer Acceleration은 S3 업로드 가속화 기능이다. EC2 기반 앱에는 적용되지 않는다.

**(D)** : 스케일 업은 비용을 절감하는 것이 아니라 오히려 증가시킨다. 문제의 방향과 반대이다.

**핵심 개념:** CloudFront 오프로딩, 기존 앱 변경 없이 비용 최적화

**관련 노트:** [아키텍처 4: 소프트웨어 업데이트 오프로딩](/section/18-serverless-architectures#아키텍처-4-소프트웨어-업데이트-오프로딩)

### Q5. A serverless application uses DynamoDB Global Tables for multi-region data access. When a new user registers, the application should send a welcome email. What is the BEST serverless approach to trigger the email?
**Options:**
- A) Use a CloudWatch Event rule to monitor DynamoDB
- B) Enable DynamoDB Streams and trigger a Lambda function that sends email via Amazon SES
- C) Use API Gateway to trigger an SNS notification after user registration
- D) Schedule a Lambda function to periodically scan the DynamoDB table for new users

**Answer:** B

**해설:**

> **문제:** 서버리스 애플리케이션이 다중 리전 데이터 접근을 위해 DynamoDB Global Tables를 사용하고 있다. 새 사용자가 등록하면 애플리케이션은 환영 이메일을 보내야 한다. 이메일을 트리거하는 가장 좋은 서버리스 접근 방식은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | DynamoDB를 모니터링하는 CloudWatch Event 규칙 사용 |
| B | DynamoDB Streams를 활성화하고 Amazon SES를 통해 이메일을 보내는 Lambda 함수 트리거 |
| C | 사용자 등록 후 SNS 알림을 트리거하는 API Gateway 사용 |
| D | 새 사용자를 찾기 위해 DynamoDB 테이블을 주기적으로 스캔하는 Lambda 함수 예약 |

**(A)** : CloudWatch Event는 DynamoDB 테이블의 데이터 변경을 직접 감지하지 못한다. 관리 이벤트(API 호출 등)만 감지할 수 있다.

**(B) 정답** : DynamoDB Streams는 테이블의 아이템 변경(생성/수정/삭제)을 순서대로 캡처한다. 새 사용자 등록(INSERT) 이벤트가 Stream에 기록되면 Lambda 함수가 트리거되어 Amazon SES를 통해 환영 이메일을 보낼 수 있다. 완전 서버리스 이벤트 기반 패턴이다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C)** : API Gateway 방식은 등록 로직과 이메일 전송이 결합되어 디커플링 원칙에 위배된다. DynamoDB Streams가 더 느슨한 결합을 제공한다.

**(D)** : 주기적 스캔은 비효율적이고 실시간이 아니다. 불필요하게 RCU를 소비한다.

**핵심 개념:** DynamoDB Streams -> Lambda -> SES

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [아키텍처 1: 모바일 앱 MyTodoList](/section/18-serverless-architectures#아키텍처-1-모바일-앱-mytodolist)

### Q6. A company is designing a microservices architecture. Service A processes orders synchronously, Service B handles analytics asynchronously from order events, and Service C sends email notifications for each order. What is the BEST architecture?
**Options:**
- A) Service A sends messages directly to Service B and Service C
- B) Service A publishes to an SNS topic, Service B subscribes via SQS queue, Service C subscribes via SQS queue
- C) Service A writes to a Kinesis Data Stream consumed by Service B and Service C
- D) Service A stores data in S3, Service B and Service C poll S3 for new files

**Answer:** B

**해설:**

> **문제:** 회사가 마이크로서비스 아키텍처를 설계하고 있다. Service A는 주문을 동기적으로 처리하고, Service B는 주문 이벤트에서 비동기적으로 분석을 처리하며, Service C는 각 주문에 대해 이메일 알림을 보낸다. 가장 좋은 아키텍처는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Service A가 Service B와 Service C에 직접 메시지 전송 |
| B | Service A가 SNS 토픽에 publish, Service B는 SQS 큐로 구독, Service C는 SQS 큐로 구독 |
| C | Service A가 Kinesis Data Stream에 쓰고 Service B와 Service C가 소비 |
| D | Service A가 S3에 데이터 저장, Service B와 Service C가 S3에서 새 파일 폴링 |

**(A)** : Service A가 직접 연결하면 서비스 간 결합도가 높아진다. 하나의 서비스 장애가 전체에 영향을 미친다.

**(B) 정답** : SNS + SQS Fan Out 패턴을 사용하면 Service A가 SNS에 한 번 publish하고 Service B와 C가 각각의 SQS 큐를 통해 독립적으로 처리한다. 완전 디커플링으로 서비스 추가/제거가 용이하고 SQS의 재시도/영속성도 활용할 수 있다. → [📖 아키텍처 3: 마이크로서비스](/section/18-serverless-architectures#아키텍처-3-마이크로서비스)

**(C)** : Kinesis는 실시간 스트리밍에 더 적합하다. 이 단순한 메시지 전달 시나리오에는 과도한 솔루션이다.

**(D)** : S3 폴링은 실시간이 아니고 비효율적이다. 이벤트 기반 아키텍처와 맞지 않는다.

**핵심 개념:** 마이크로서비스, SNS + SQS Fan Out

**관련 노트:** [아키텍처 3: 마이크로서비스](/section/18-serverless-architectures#아키텍처-3-마이크로서비스)

### Q7. A company needs to process images uploaded to S3 by generating thumbnails. The processing takes about 30 seconds per image. During peak hours, thousands of images are uploaded per minute. Which serverless architecture is MOST appropriate?
**Options:**
- A) S3 Event Notification -> Lambda function to generate thumbnails
- B) S3 Event Notification -> SQS Queue -> EC2 instances to process
- C) CloudWatch Events -> Step Functions -> Lambda
- D) S3 Event Notification -> SNS -> Email notification

**Answer:** A

**해설:**

> **문제:** 회사가 S3에 업로드된 이미지의 썸네일을 생성하여 처리해야 한다. 이미지당 처리 시간은 약 30초이다. 피크 시간에는 분당 수천 개의 이미지가 업로드된다. 가장 적절한 서버리스 아키텍처는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 이벤트 알림 -> 썸네일을 생성하는 Lambda 함수 |
| B | S3 이벤트 알림 -> SQS 큐 -> 처리하는 EC2 인스턴스 |
| C | CloudWatch Events -> Step Functions -> Lambda |
| D | S3 이벤트 알림 -> SNS -> 이메일 알림 |

**(A) 정답** : S3 이벤트로 Lambda 함수를 트리거하여 썸네일을 생성하는 것이 표준 서버리스 패턴이다. 30초 실행 시간은 Lambda의 15분 제한 내이며 Lambda는 자동으로 수천 개의 동시 호출로 스케일링된다. → [📖 AWS Lambda](/section/17-serverless-overview#aws-lambda)

**(B)** : SQS + EC2는 서버리스가 아니다. EC2 인스턴스 관리가 필요하여 서버리스 요구사항을 충족하지 못한다.

**(C)** : CloudWatch Events + Step Functions는 단순 이미지 처리에 불필요한 복잡성을 추가한다. 오버엔지니어링이다.

**(D)** : SNS + 이메일은 알림 전송만 한다. 실제 썸네일 생성 처리가 없어 요구사항을 충족하지 못한다.

**핵심 개념:** S3 이벤트 -> Lambda, 이미지 처리

**관련 노트:** [AWS Lambda](/section/17-serverless-overview#aws-lambda), [서버리스란?](/section/17-serverless-overview#서버리스란)
