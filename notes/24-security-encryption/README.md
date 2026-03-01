# Section 24: AWS Security & Encryption

## 개요
AWS의 보안 및 암호화 서비스를 포괄적으로 다룬다. KMS, CloudHSM, ACM, WAF, Shield, GuardDuty, Inspector, Macie 등은 SAA-C03 시험에서 매우 자주 출제되는 영역이다. 암호화 유형(전송 중/저장 시/클라이언트 측), 키 관리, DDoS 방어, 취약점 탐지 등을 정확히 이해해야 한다.

## 핵심 개념

### 암호화 기본 개념

#### Encryption in Flight (전송 중 암호화)
- 전송 전 암호화, 수신 후 복호화
- **TLS/SSL 인증서** 사용 (HTTPS)
- **MITM (Man-in-the-Middle Attack, 중간자 공격)** 방지
  - MITM: 내가 서버에 데이터를 보낼 때 중간에 누군가가 몰래 데이터를 가로채거나 변조하는 공격. HTTPS 암호화가 이를 방지함.

#### Server-Side Encryption at Rest (서버 측 저장 시 암호화)
- 서버가 수신 후 암호화, 전송 전 복호화
- **Data Key**로 암호화/복호화
- 키 관리 필요 (서버가 접근 가능해야 함)

#### Client-Side Encryption (클라이언트 측 암호화)
- 클라이언트가 암호화 후 전송, 수신 클라이언트가 복호화
- **서버는 데이터를 복호화할 수 없음**
- **Envelope Encryption** 활용 가능

### AWS KMS (Key Management Service)
- "암호화" = 대부분 KMS
- AWS가 암호화 키 관리
- IAM과 완전 통합 (인가)
- **CloudTrail**로 키 사용 감사
- 대부분의 AWS 서비스와 원활한 통합 (EBS, S3, RDS, SSM 등)
- API (SDK, CLI)를 통한 키 암호화 가능

#### KMS Key 유형
- **Symmetric (AES-256)**: 단일 키로 암호화/복호화, AWS 서비스 통합에 사용, 키 자체에 접근 불가 (API만)
- **Asymmetric (RSA & ECC)**: 퍼블릭 키(암호화) + 프라이빗 키(복호화), 퍼블릭 키 다운로드 가능, KMS API 호출 불가한 외부 사용자용

#### KMS Envelope Encryption 흐름
> **왜 이중 구조인가?** — KMS에서 직접 대용량 데이터를 암호화하면 느리고 비용도 크다. 대신 빠른 로컬 Data Key로 데이터를 암호화하고, 그 Data Key만 KMS로 암호화해서 보관한다. 마치 "귀중품은 금고(Data Key)에 넣고, 금고 열쇠(Data Key)만 은행(KMS)에 맡기는" 방식이다.

```text
  ※ Envelope Encryption: 데이터를 Data Key로 암호화하고,
    Data Key를 KMS Master Key(CMK)로 암호화하는 이중 구조

  [ 암호화 과정 ]

  Client                          KMS                        S3/EBS/etc
    |                              |                              |
    |-- GenerateDataKey(CMK ID) -->|                              |
    |                              |                              |
    |<-- Plaintext Data Key -------|                              |
    |<-- Encrypted Data Key -------|                              |
    |                              |                              |
    | 1) Plaintext Data Key로                                     |
    |    데이터 암호화                                              |
    |                                                             |
    | 2) Plaintext Data Key 폐기                                   |
    |    (메모리에서 제거)                                          |
    |                                                             |
    | 3) Encrypted Data Key +      |                              |
    |    암호화된 데이터 저장 ---------------------------------->    |
    |                              |                         [저장됨]

  [ 복호화 과정 ]

  Client                          KMS                        S3/EBS/etc
    |                              |                              |
    | <------------------------------------- Encrypted Data Key + |
    |                              |         암호화된 데이터 읽기  |
    |                              |                              |
    |-- Decrypt(Encrypted Key) --->|                              |
    |                              |                              |
    |<-- Plaintext Data Key -------|                              |
    |                              |                              |
    | Plaintext Data Key로                                        |
    | 데이터 복호화                                                 |
    |                              |                              |
    | Plaintext Data Key 폐기                                      |
```

#### KMS Key 종류 및 비용
| 키 종류 | 비용 |
|--------|------|
| AWS Owned Keys (SSE-S3, SSE-SQS, SSE-DDB) | 무료 |
| AWS Managed Key (aws/service-name) | 무료 |
| Customer Managed Key (KMS 생성) | $1/월 |
| Customer Managed Key (임포트) | $1/월 |
| API 호출 | $0.03 / 10,000건 |

#### Key Rotation
- **AWS Managed Key**: 자동 1년마다
- **Customer Managed Key**: 활성화 필요, 자동 및 온디맨드
- **Imported Key**: **수동 회전만 가능** (alias 사용)

#### KMS Key Policies
- KMS 키 접근 제어 (S3 버킷 정책과 유사)
- **Default Policy**: 미지정 시 생성, root 사용자(= 전체 계정)에 완전 접근
- **Custom Policy**: 특정 사용자/역할 접근, 관리자 정의, **크로스 계정 접근**에 유용

#### KMS 크로스 리전/크로스 계정
- **스냅샷 크로스 리전 복사**: 원본 리전 KMS Key A로 암호화 -> 대상 리전에서 KMS Key B로 Re-Encrypt
- **스냅샷 크로스 계정 공유**: CMK로 암호화 -> KMS Key Policy로 크로스 계정 허용 -> 공유 -> 대상 계정에서 자체 CMK로 복사

#### KMS Multi-Region Keys
- 서로 다른 AWS 리전에서 **상호 교환 가능**한 동일 KMS 키
- 동일 Key ID, Key Material, 자동 회전
- 한 리전에서 암호화, 다른 리전에서 복호화 (Re-Encrypt/크로스 리전 API 불필요)
- **글로벌 키가 아님** (Primary + Replicas, 독립 관리)
- 사용 사례: 글로벌 클라이언트 측 암호화, DynamoDB Global Tables, Global Aurora

#### DynamoDB/Aurora + KMS Multi-Region Keys
- **DynamoDB**: DynamoDB Encryption Client로 특정 속성 클라이언트 측 암호화 -> Global Tables 복제 -> 대상 리전에서 Replica MRK로 저지연 복호화
- **Aurora**: AWS Encryption SDK로 특정 컬럼 클라이언트 측 암호화 -> Global Aurora 복제 -> DB 관리자로부터도 특정 필드 보호 가능

#### S3 Replication과 암호화
- SSE-S3, 비암호화: 기본 복제
- SSE-C: 복제 가능
- **SSE-KMS**: 옵션 활성화 필요, 대상 KMS Key 지정, IAM Role에 source kms:Decrypt + target kms:Encrypt 필요
- KMS 스로틀링 에러 시 Service Quotas 증가 요청
- Multi-Region KMS Keys: S3는 독립 키로 취급 (복호화 후 재암호화)

#### AMI 크로스 계정 공유 (KMS 암호화)
1. Source Account의 KMS Key로 AMI 암호화
2. AMI에 Launch Permission 추가 (대상 계정 지정)
3. KMS Key를 대상 계정/IAM Role과 공유
4. 대상 계정: DescribeKey, ReEncrypt*, CreateGrant, Decrypt 권한 필요
5. 대상 계정에서 자체 KMS Key로 볼륨 Re-Encrypt 가능

### SSM Parameter Store
- 구성 및 시크릿의 **안전한 저장소**
- KMS 암호화 (선택), 서버리스, 확장 가능
- 버전 추적, IAM 보안, EventBridge 알림, CloudFormation 통합
- **계층적 구조**: /department/app/env/parameter

#### Standard vs Advanced
| 특성 | Standard | Advanced |
|------|----------|----------|
| 파라미터 수 | 10,000 | 100,000 |
| 최대 크기 | 4 KB | 8 KB |
| 파라미터 정책 | 미지원 | 지원 |
| 비용 | 무료 | $0.05/파라미터/월 |

#### Parameter Policies (Advanced)
- **TTL** 할당 (만료일): 민감 데이터 업데이트/삭제 강제
- 정책 유형: Expiration, ExpirationNotification (EventBridge), NoChangeNotification (EventBridge)

### SSM Parameter Store vs Secrets Manager 비교

```text
  ┌──────────────────────────────────────────────────────────────────────┐
  │          SSM Parameter Store          Secrets Manager               │
  │  ┌─────────────────────────┐   ┌─────────────────────────┐         │
  │  │  구성값 + 시크릿 저장     │   │  시크릿 전문 저장         │         │
  │  │                         │   │                         │         │
  │  │  계층적 구조:            │   │  자동 회전:              │         │
  │  │  /dept/app/env/param    │   │  Lambda로 X일마다        │         │
  │  │                         │   │                         │         │
  │  │  Standard: 무료          │   │  RDS 통합 특화:          │         │
  │  │    - 4KB, 10,000개      │   │  MySQL/PostgreSQL/Aurora │         │
  │  │  Advanced: 유료          │   │                         │         │
  │  │    - 8KB, 100,000개     │   │  Multi-Region Secrets:   │         │
  │  │    - TTL 정책 지원       │   │  읽기 복제본 동기화       │         │
  │  │                         │   │                         │         │
  │  │  KMS 암호화 (선택)       │   │  KMS 암호화 (필수)       │         │
  │  │  버전 추적 지원          │   │  버전 추적 지원           │         │
  │  └─────────────────────────┘   └─────────────────────────┘         │
  │                                                                     │
  │  선택 기준:                                                          │
  │  ┌────────────────────────────────┬─────────────────────────────┐   │
  │  │ SSM Parameter Store 선택       │ Secrets Manager 선택         │   │
  │  ├────────────────────────────────┼─────────────────────────────┤   │
  │  │ - 일반 구성값 저장              │ - DB 자격증명 관리            │   │
  │  │ - 비용 최소화 (무료 티어)       │ - 시크릿 자동 회전 필요       │   │
  │  │ - 간단한 시크릿 저장            │ - RDS/Aurora 통합             │   │
  │  │ - CloudFormation 통합           │ - 크로스 리전 시크릿 복제     │   │
  │  └────────────────────────────────┴─────────────────────────────┘   │
  └──────────────────────────────────────────────────────────────────────┘
```

### AWS Secrets Manager
- **시크릿 저장 전문** 서비스 (SSM Parameter Store보다 최신)
- **시크릿 자동 회전** (X일마다, Lambda 사용)
- **RDS 통합** (MySQL, PostgreSQL, Aurora)에 특화
- KMS 암호화
- **Multi-Region Secrets**: 리전 간 읽기 복제본 동기화, 독립 시크릿으로 승격 가능

### AWS Certificate Manager (ACM)
- TLS 인증서 **프로비저닝, 관리, 배포**
- HTTPS 전송 중 암호화
- 퍼블릭/프라이빗 TLS 인증서 지원
- **퍼블릭 TLS 인증서 무료**
- **자동 갱신**

#### ACM 통합
- **ELB** (CLB, ALB, NLB)
- **CloudFront Distributions**
- **API Gateway**
- **EC2에는 사용 불가** (추출 불가)

#### ACM 퍼블릭 인증서 요청
1. 도메인 이름 지정 (FQDN 또는 와일드카드)
2. 검증 방법: **DNS 검증** (자동화에 선호, Route 53 CNAME) 또는 이메일 검증
3. 검증 완료까지 수시간
4. **자동 갱신**: 만료 60일 전

#### ACM 인증서 임포트
- 외부 생성 인증서 가져오기 (자동 갱신 없음)
- **만료 45일 전**부터 EventBridge로 일일 만료 이벤트
- AWS Config: `acm-certificate-expiration-check` 규칙

#### ACM + API Gateway
- **Edge-Optimized**: 인증서가 **us-east-1** (CloudFront 리전)에 있어야 함
- **Regional**: 인증서가 **API Stage와 동일 리전**에 있어야 함
- Route 53에서 CNAME 또는 A-Alias 레코드 설정

### CloudHSM
> **KMS vs CloudHSM 직관적 비교**:
> - **KMS**: AWS가 운영하는 공동 아파트 단지의 공용 금고. 저렴하고 편하지만, 열쇠 관리는 AWS가 함.
> - **CloudHSM**: 나만 사용하는 개인 금고 장비를 AWS 데이터센터에 설치. 비싸지만 열쇠는 내가 100% 관리. 금융/의료처럼 규정상 직접 키를 관리해야 할 때 사용.

- AWS가 하드웨어 프로비저닝, **사용자가 키 관리**
- **전용 하드웨어** (HSM = Hardware Security Module, 하드웨어 보안 모듈: 암호화 키를 안전하게 생성·저장·관리하는 전용 물리 장치)
- **FIPS 140-2 Level 3** 준수 (미국 국립표준기술연구소의 암호화 모듈 보안 표준 — Level 3은 물리적 탬퍼링 방지까지 포함한 높은 수준)
- Symmetric + Asymmetric 암호화 지원 (SSL/TLS 키)
- **무료 티어 없음**
- CloudHSM Client Software 필요
- Redshift: CloudHSM으로 DB 암호화/키 관리 지원
- **SSE-C 암호화**와 적합

#### CloudHSM 고가용성
- **Multi-AZ** 클러스터 분산
- VPC 내 배포, VPC Peering으로 공유 가능

#### CloudHSM + AWS 서비스 통합
- **KMS Custom Key Store**로 CloudHSM 연결
- EBS, S3, RDS 등 KMS 통합 서비스에서 사용

#### CloudHSM vs KMS
| 특성 | KMS | CloudHSM |
|------|-----|----------|
| 테넌시 | Multi-Tenant | **Single-Tenant** |
| FIPS | 140-2 Level 3 | 140-2 Level 3 |
| 키 유형 | Symmetric, Asymmetric, Digital Signing | Symmetric, Asymmetric, Digital Signing & **Hashing** |
| 키 접근 | AWS 리전 내 | VPC 내, VPC Peering |
| 암호화 가속 | 없음 | **SSL/TLS, Oracle TDE** |
| 인증 | AWS IAM | 자체 사용자 관리 |
| HA | AWS 관리 | 사용자가 Multi-AZ HSM 추가 |
| 감사 | CloudTrail, CloudWatch | CloudTrail, CloudWatch, **MFA** |
| 무료 티어 | 있음 | 없음 |

### AWS WAF (Web Application Firewall)
- **Layer 7 (HTTP)** 웹 애플리케이션 보호
- 배포 대상: **ALB, API Gateway, CloudFront, AppSync, Cognito User Pool**
- **NLB는 미지원** (Layer 4) -> Global Accelerator + ALB에 WAF 적용

#### Web ACL Rules
- **IP Set**: 최대 10,000 IP (다수 Rule로 추가 가능)
- SQL Injection, XSS 보호
- Size constraints, **Geo-match** (국가 차단)
- **Rate-based rules**: DDoS 방어
- Web ACL은 **리전별** (CloudFront 제외)
- **Rule Group**: 재사용 가능한 규칙 모음

### AWS Shield
- **DDoS 보호**

#### Shield Standard
- **무료**, 모든 AWS 고객 자동 활성화
- SYN/UDP Floods, Reflection 공격, Layer 3/4 공격 보호

#### Shield Advanced
- **$3,000/월/조직**
- EC2, ELB, CloudFront, Global Accelerator, Route 53 보호
- **24/7 DDoS Response Team (DRP)**
- DDoS로 인한 **요금 급증 보호**
- **자동 Layer 7 DDoS 완화** (WAF 규칙 자동 생성/배포)

### AWS Firewall Manager
- AWS Organization 전체 계정의 **보안 규칙 중앙 관리**
- 관리 대상: WAF, Shield Advanced, Security Groups, Network Firewall, Route 53 Resolver DNS Firewall
- 리전별 정책
- **새 리소스에 자동 적용** (규정 준수)

#### WAF vs Firewall Manager vs Shield — 초보자 비유
> - **WAF (Web Application Firewall)**: 건물 입구의 보안요원. 방문자(요청)를 하나씩 검사해서 나쁜 사람(SQL 인젝션, XSS)을 막음.
> - **Shield**: 건물 전체를 둘러싼 방어막. 대규모 공격(DDoS — 수백만 명이 동시에 몰려오는 공격)을 막음. Standard는 무료로 자동 제공.
> - **Firewall Manager**: 여러 건물(계정)을 가진 기업의 보안 총괄 관리자. 모든 건물에 동일한 보안 규칙을 한 번에 배포.

- **WAF**: 리소스별 세밀한 보호 (HTTP 요청 내용 검사)
- **Firewall Manager**: 여러 계정에 WAF 자동 적용, 새 리소스 자동 보호
- **Shield Advanced**: 전용 DDoS 지원팀, 고급 보고, Layer 7 자동 완화

### WAF / Shield / Firewall Manager 방어 계층

```text
                        인터넷 트래픽
                             |
                             v
  ┌──────────────────────────────────────────────────────────┐
  │                  AWS Shield Standard                      │
  │              (Layer 3/4 DDoS 자동 방어, 무료)              │
  │                                                          │
  │   SYN Flood, UDP Flood, Reflection 공격 차단              │
  └──────────────────────────┬───────────────────────────────┘
                             |
                             v
  ┌──────────────────────────────────────────────────────────┐
  │               AWS Shield Advanced (선택)                  │
  │            ($3,000/월, 고급 DDoS 방어)                     │
  │                                                          │
  │   - 24/7 DDoS Response Team (DRP)                        │
  │   - Layer 7 공격 자동 완화 (WAF 규칙 자동 생성)             │
  │   - DDoS 요금 급증 보호                                    │
  └──────────────────────────┬───────────────────────────────┘
                             |
                             v
  ┌──────────────────────────────────────────────────────────┐
  │                    AWS WAF (Layer 7)                       │
  │           (HTTP 레벨 필터링, 리소스에 직접 부착)             │
  │                                                          │
  │   배포 위치: ALB | API Gateway | CloudFront | AppSync     │
  │                                                          │
  │   Web ACL Rules:                                         │
  │   ├── IP Set (최대 10,000 IP)                             │
  │   ├── SQL Injection / XSS 보호                            │
  │   ├── Geo-match (국가 차단)                                │
  │   ├── Rate-based (초당 요청 제한)                           │
  │   └── Size constraints                                    │
  └──────────────────────────┬───────────────────────────────┘
                             |
                             v
                     +---------------+
                     | ALB / CF /    |
                     | API Gateway   |
                     +---------------+
                             |
                             v
                     +---------------+
                     | Application   |
                     +---------------+

  ┌──────────────────────────────────────────────────────────┐
  │              AWS Firewall Manager (중앙 관리)              │
  │                                                          │
  │   - AWS Organization 전체 계정에 WAF/Shield 규칙 배포      │
  │   - 새 리소스/계정에 자동 적용                              │
  │   - 리전별 정책 관리                                       │
  │                                                          │
  │   Account A ──┐                                          │
  │   Account B ──┼── Firewall Manager ── WAF Rules          │
  │   Account C ──┘                    ── Shield Advanced    │
  │   (new acct) --> 자동 적용                                 │
  └──────────────────────────────────────────────────────────┘
```

### DDoS 복원력 모범 사례
- **Edge 보호 (BP1, BP3)**: CloudFront, Global Accelerator, Route 53
- **인프라 보호 (BP1, BP3, BP6)**: ELB, Auto Scaling
- **애플리케이션 보호 (BP1, BP2)**: CloudFront 캐시, WAF 필터링, Rate-based 규칙
- **공격 표면 축소 (BP1, BP4, BP6)**: CloudFront/API Gateway/ELB로 백엔드 숨기기, Security Groups/NACL, WAF + API Gateway

### GuardDuty vs Inspector vs Macie — 초보자 비유
> - **GuardDuty**: AWS 계정 전체의 "수상한 행동" 탐지 CCTV. 누군가 이상한 곳에서 API를 호출하거나, 암호화폐 채굴 코드가 돌아가는 등 이상 징후를 ML로 자동 탐지.
> - **Inspector**: EC2/컨테이너/Lambda의 "취약점 스캐너". 소프트웨어에 알려진 보안 취약점(CVE)이 있는지 자동으로 검사하는 건강검진.
> - **Macie**: S3 버킷 속 "민감 데이터 탐지기". 신용카드 번호, 주민번호 같은 개인정보(PII)가 S3에 저장되어 있으면 ML로 찾아냄.

### Amazon GuardDuty
- **지능형 위협 탐지** (ML, 이상 탐지, 3rd party 데이터)
- **원클릭 활성화** (30일 평가판), 소프트웨어 설치 불필요
- 입력 데이터:
  - **CloudTrail Events Logs** (비정상 API, Management Events, S3 Data Events)
  - **VPC Flow Logs** (비정상 트래픽, IP)
  - **DNS Logs** (DNS 쿼리 내 인코딩된 데이터)
  - **Optional**: EKS Audit Logs, RDS & Aurora, EBS, Lambda, S3 Data Events
- EventBridge 규칙으로 알림 (Lambda, SNS)
- **CryptoCurrency 공격** 전용 finding 보유

### Amazon Inspector
- **자동화된 보안 평가**
- 대상:
  - **EC2 인스턴스**: SSM Agent 사용, 네트워크 접근성 + OS 취약점
  - **ECR Container Images**: 푸시 시 평가
  - **Lambda Functions**: 코드/패키지 의존성 취약점, 배포 시 평가
- **CVE 데이터베이스** 기반 패키지 취약점 스캔
- **Risk Score** 할당 (우선순위 지정)
- AWS Security Hub + EventBridge 연동

### Amazon Macie
- **데이터 보안/프라이버시** 관리형 서비스
- ML + 패턴 매칭으로 **민감한 데이터 (PII)** 탐지/보호
- S3 버킷 분석
- EventBridge와 통합

## 시험 포인트
- **"암호화"** = 대부분 KMS
- **KMS Symmetric**: AWS 서비스 통합에 항상 사용, 키 직접 접근 불가
- **KMS Asymmetric**: KMS API 호출 불가한 외부 사용자용
- **Customer Managed Key**: $1/월, 회전 활성화 필요
- **Imported Key**: 수동 회전만 가능 (alias 사용)
- **CloudHSM**: "FIPS 140-2 Level 3", "전용 하드웨어", "자체 키 관리" 키워드
- **CloudHSM + SSE-C**: 자체 키 관리 + S3 암호화
- **ACM + EC2**: 불가! EC2에서는 인증서 추출 불가
- **ACM Edge-Optimized API**: 인증서 us-east-1에 있어야 함
- **WAF**: Layer 7, ALB/API Gateway/CloudFront에 배포, NLB 미지원
- **Shield Standard**: 무료, 자동 활성화, Layer 3/4
- **Shield Advanced**: 유료, Layer 7 자동 완화, DRP, 요금 보호
- **Firewall Manager**: Organization 전체 WAF/Shield 중앙 관리
- **GuardDuty**: 위협 탐지, CloudTrail/VPC Flow/DNS 분석, CryptoCurrency
- **Inspector**: EC2/ECR/Lambda 취약점 스캔, CVE 기반
- **Macie**: S3의 PII/민감 데이터 탐지
- Secrets Manager vs SSM Parameter Store: 시크릿 자동 회전 + RDS 통합 = Secrets Manager
- KMS Multi-Region Keys: 글로벌 키 아님, 독립 관리

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| KMS | 암호화 키 관리, Symmetric/Asymmetric, CloudTrail 감사 |
| KMS Multi-Region Keys | 리전 간 동일 키, 클라이언트 측 암호화, DynamoDB/Aurora Global |
| SSM Parameter Store | 구성/시크릿 저장, 계층적, Standard(무료)/Advanced |
| Secrets Manager | 시크릿 저장 + 자동 회전 (Lambda), RDS 통합 특화 |
| ACM | TLS 인증서 관리, ELB/CloudFront/API Gateway, EC2 미지원 |
| CloudHSM | 전용 HSM, 자체 키 관리, FIPS 140-2 L3, Single-Tenant |
| WAF | Layer 7 방화벽, SQL Injection/XSS, Rate-based, ALB/CF/APIGW |
| Shield Standard | 무료 DDoS 보호 (Layer 3/4) |
| Shield Advanced | 유료 DDoS 보호, DRP, Layer 7 자동 완화, 요금 보호 |
| Firewall Manager | Organization 전체 WAF/Shield/SG 중앙 관리 |
| GuardDuty | ML 기반 위협 탐지, CloudTrail/VPC Flow/DNS 분석 |
| Inspector | EC2/ECR/Lambda 취약점 스캔, CVE, Risk Score |
| Macie | S3 PII/민감 데이터 탐지 (ML + 패턴 매칭) |

---

## Practice Questions

### Q1. A company needs to encrypt data at rest using encryption keys that they fully control. They require FIPS 140-2 Level 3 compliance and dedicated hardware. Which service should they use?
**Options:**
- A) AWS KMS with Customer Managed Keys
- B) AWS CloudHSM
- C) AWS KMS with AWS Managed Keys
- D) Server-Side Encryption with S3 Managed Keys (SSE-S3)

**Answer:** B

**해설:**

> **문제:** 한 회사가 완전히 제어하는 암호화 키를 사용하여 저장 데이터를 암호화해야 한다. FIPS 140-2 Level 3 규정 준수와 전용 하드웨어가 필요하다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Customer Managed Keys를 사용한 AWS KMS |
| B | AWS CloudHSM |
| C | AWS Managed Keys를 사용한 AWS KMS |
| D | S3 Managed Keys를 사용한 서버 측 암호화 (SSE-S3) |

**상세 풀이:** CloudHSM은 전용 하드웨어(Single-Tenant)에서 FIPS 140-2 Level 3 규정 준수를 제공하며, 사용자가 암호화 키를 완전히 관리한다. A) KMS Customer Managed Keys도 FIPS 140-2 Level 3이지만 Multi-Tenant 환경이고 AWS가 하드웨어를 관리하므로 "전용 하드웨어"와 "완전한 키 관리" 요구사항을 충족하지 않는다. C) AWS Managed Keys는 AWS가 키를 관리하므로 사용자가 키를 완전히 제어할 수 없다. D) SSE-S3는 AWS가 키를 완전히 관리하는 가장 기본적인 암호화로 사용자의 키 제어가 불가하다.

**핵심 개념:** CloudHSM vs KMS

### Q2. A company wants to share an encrypted AMI with another AWS account. The AMI is encrypted with a Customer Managed KMS Key. What steps are required? (Select TWO)
**Options:**
- A) Add a Launch Permission for the target account on the AMI
- B) Share the AWS Managed KMS Key with the target account
- C) Share the Customer Managed KMS Key with the target account via KMS Key Policy
- D) Create a new unencrypted copy of the AMI and share it
- E) The target account needs no additional permissions

**Answer:** A, C

**해설:**

> **문제:** 한 회사가 Customer Managed KMS Key로 암호화된 AMI를 다른 AWS 계정과 공유하려 한다. 어떤 단계가 필요한가? (두 개 선택)

| 선지 | 번역 |
|------|------|
| A | AMI에 대상 계정의 Launch Permission 추가 |
| B | AWS Managed KMS Key를 대상 계정과 공유 |
| C | KMS Key Policy를 통해 Customer Managed KMS Key를 대상 계정과 공유 |
| D | AMI의 비암호화 복사본을 새로 생성하여 공유 |
| E | 대상 계정에 추가 권한이 필요하지 않음 |

**상세 풀이:** KMS 암호화된 AMI를 다른 계정과 공유하려면 (1) AMI에 대상 계정의 Launch Permission을 추가하고, (2) AMI 암호화에 사용된 Customer Managed KMS Key를 KMS Key Policy를 통해 대상 계정과 공유해야 한다. B) AWS Managed Key는 계정 간 공유가 불가능하며, 크로스 계정 공유에는 반드시 Customer Managed Key를 사용해야 한다. D) 비암호화 복사본을 만들면 보안이 약해지며, 암호화가 필요한 요구사항을 위반한다. E) 대상 계정에서는 DescribeKey, ReEncrypt, CreateGrant, Decrypt 등의 권한이 필요하다.

**핵심 개념:** AMI Sharing Process Encrypted via KMS

### Q3. A company wants to protect their web application running behind an Application Load Balancer from SQL injection and cross-site scripting attacks. They also want to block requests from specific countries. Which service should they use?
**Options:**
- A) AWS Shield Standard
- B) AWS Network Firewall
- C) AWS WAF
- D) Security Groups

**Answer:** C

**해설:**

> **문제:** 한 회사가 Application Load Balancer 뒤에서 실행되는 웹 애플리케이션을 SQL injection과 크로스 사이트 스크립팅 공격으로부터 보호하고 싶다. 또한 특정 국가의 요청을 차단하고 싶다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Shield Standard |
| B | AWS Network Firewall |
| C | AWS WAF |
| D | Security Groups |

**상세 풀이:** AWS WAF는 Layer 7(HTTP) 웹 애플리케이션 방화벽으로 SQL Injection, XSS 보호와 Geo-match(국가 차단)를 지원하며 ALB에 직접 배포할 수 있다. A) Shield Standard는 Layer 3/4 DDoS 보호로 HTTP 콘텐츠(SQL Injection, XSS)를 검사하지 않는다. B) Network Firewall은 VPC 수준의 네트워크 방화벽으로 HTTP 애플리케이션 레벨 보호에 특화되어 있지 않다. D) Security Groups는 IP/포트 기반의 네트워크 접근 제어이며 HTTP 요청 콘텐츠를 검사하지 않으므로 SQL Injection이나 XSS를 차단할 수 없다.

**핵심 개념:** AWS WAF

### Q4. A company frequently experiences DDoS attacks on their application. They need 24/7 access to AWS DDoS experts and automatic Layer 7 attack mitigation. They also want protection against DDoS-related billing spikes. Which solution should they choose?
**Options:**
- A) AWS Shield Standard with AWS WAF
- B) AWS Shield Advanced
- C) AWS Firewall Manager
- D) Amazon GuardDuty

**Answer:** B

**해설:**

> **문제:** 한 회사가 애플리케이션에 대한 DDoS 공격을 자주 겪고 있다. AWS DDoS 전문가에 대한 24/7 접근과 자동 Layer 7 공격 완화가 필요하다. 또한 DDoS 관련 요금 급증으로부터 보호받고 싶다. 어떤 솔루션을 선택해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS WAF와 함께 AWS Shield Standard |
| B | AWS Shield Advanced |
| C | AWS Firewall Manager |
| D | Amazon GuardDuty |

**상세 풀이:** AWS Shield Advanced는 24/7 DDoS Response Team(DRP) 접근, Layer 7 공격 자동 완화(WAF 규칙 자동 생성/배포), DDoS로 인한 요금 급증 보호를 모두 제공한다. A) Shield Standard는 무료이고 기본 Layer 3/4 보호만 제공하며, WAF를 함께 사용해도 24/7 전문가 지원이나 요금 보호 기능이 없다. C) Firewall Manager는 Organization 전체에 보안 규칙을 배포하는 중앙 관리 도구이지 DDoS 전문 방어 서비스가 아니다. D) GuardDuty는 ML 기반 위협 탐지 서비스로 DDoS 방어 기능이 아니다.

**핵심 개념:** AWS Shield Advanced

### Q5. A company needs to automatically detect if any of their S3 buckets contain personally identifiable information (PII) such as credit card numbers or social security numbers. Which service should they use?
**Options:**
- A) Amazon GuardDuty
- B) Amazon Inspector
- C) Amazon Macie
- D) AWS Config

**Answer:** C

**해설:**

> **문제:** 한 회사가 S3 버킷에 신용카드 번호나 주민등록번호 같은 개인 식별 정보(PII)가 포함되어 있는지 자동으로 탐지해야 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon GuardDuty |
| B | Amazon Inspector |
| C | Amazon Macie |
| D | AWS Config |

**상세 풀이:** Amazon Macie는 ML과 패턴 매칭을 사용하여 S3 버킷에서 PII(신용카드 번호, 주민등록번호 등)와 같은 민감한 데이터를 자동 탐지하고 보호한다. A) GuardDuty는 CloudTrail/VPC Flow Logs/DNS 분석을 통한 위협 탐지 서비스로 S3 데이터 내용을 분석하지 않는다. B) Inspector는 EC2/ECR/Lambda의 소프트웨어 취약점(CVE)을 스캔하는 서비스로 데이터 내용 분석이 아니다. D) AWS Config은 리소스 구성 규정 준수를 평가하는 서비스로 S3 버킷 내 데이터 콘텐츠를 검사하지 않는다.

**핵심 개념:** Amazon Macie

### Q6. A company stores secrets for their RDS database connections and needs automatic rotation of these secrets every 30 days. Which service is MOST appropriate?
**Options:**
- A) AWS Systems Manager Parameter Store (Advanced)
- B) AWS Secrets Manager
- C) AWS KMS
- D) AWS CloudHSM

**Answer:** B

**해설:**

> **문제:** 한 회사가 RDS 데이터베이스 연결을 위한 시크릿을 저장하고 30일마다 자동 회전해야 한다. 가장 적합한 서비스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | AWS Systems Manager Parameter Store (Advanced) |
| B | AWS Secrets Manager |
| C | AWS KMS |
| D | AWS CloudHSM |

**상세 풀이:** AWS Secrets Manager는 시크릿 자동 회전 기능을 제공하며 Lambda를 사용하여 X일마다 시크릿을 자동 생성하고, 특히 RDS(MySQL, PostgreSQL, Aurora)와의 통합이 특화되어 있어 DB 자격증명 관리에 최적이다. A) SSM Parameter Store Advanced는 TTL(만료일) 정책은 있지만 자동 회전 기능은 Secrets Manager만큼 강력하지 않으며, RDS 특화 통합이 없다. C) KMS는 암호화 키 관리 서비스이지 시크릿(비밀번호, 자격증명) 저장 및 회전 서비스가 아니다. D) CloudHSM은 전용 하드웨어 암호화 모듈로 시크릿 관리와 무관하다.

**핵심 개념:** AWS Secrets Manager

### Q7. A company uses an edge-optimized API Gateway and needs to attach a TLS certificate from ACM. In which region must the ACM certificate be created?
**Options:**
- A) The same region as the API Gateway
- B) us-east-1
- C) Any region, as ACM certificates are global
- D) The region closest to the majority of users

**Answer:** B

**해설:**

> **문제:** 한 회사가 edge-optimized API Gateway를 사용하고 있으며 ACM에서 TLS 인증서를 연결해야 한다. ACM 인증서를 어떤 리전에서 생성해야 하는가?

| 선지 | 번역 |
|------|------|
| A | API Gateway와 동일한 리전 |
| B | us-east-1 |
| C | ACM 인증서는 글로벌이므로 어떤 리전이든 가능 |
| D | 대다수 사용자에게 가장 가까운 리전 |

**상세 풀이:** Edge-Optimized API Gateway는 CloudFront Edge 위치를 통해 요청을 라우팅하므로, TLS 인증서는 CloudFront와 동일한 리전인 us-east-1에 있어야 한다. A) API Gateway와 동일한 리전에 인증서를 생성하는 것은 Regional API Gateway의 경우이며, edge-optimized에서는 us-east-1이 필요하다. C) ACM 인증서는 글로벌이 아니라 리전별 서비스이므로 특정 리전에 생성해야 한다. D) 사용자 위치와 무관하게 edge-optimized API Gateway의 인증서는 반드시 us-east-1에 있어야 한다.

**핵심 개념:** ACM + API Gateway Integration

### Q8. A company wants to manage WAF rules, Shield Advanced protections, and security group configurations across all accounts in their AWS Organization. New accounts should automatically inherit these security rules. Which service should they use?
**Options:**
- A) AWS Config
- B) AWS WAF with cross-account rules
- C) AWS Firewall Manager
- D) AWS Organizations SCPs

**Answer:** C

**해설:**

> **문제:** 한 회사가 AWS Organization의 모든 계정에서 WAF 규칙, Shield Advanced 보호, 보안 그룹 구성을 관리하고 싶다. 새 계정이 추가되면 자동으로 이 보안 규칙을 상속해야 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Config |
| B | 크로스 계정 규칙과 함께 AWS WAF |
| C | AWS Firewall Manager |
| D | AWS Organizations SCP |

**상세 풀이:** AWS Firewall Manager는 AWS Organization 전체 계정에서 WAF 규칙, Shield Advanced, Security Groups, Network Firewall 등의 보안 규칙을 중앙에서 관리하며, 새 리소스와 새 계정에 자동으로 규칙이 적용되어 규정 준수를 보장한다. A) AWS Config은 리소스 구성 규정 준수를 평가하는 서비스이지 보안 규칙을 배포하는 것이 아니다. B) AWS WAF 자체에는 크로스 계정 규칙 배포 기능이 없으며, 여러 계정에 규칙을 자동 적용하려면 Firewall Manager가 필요하다. D) SCP는 IAM 수준의 권한 제한이지 WAF/Shield/보안 그룹 규칙을 배포하는 것이 아니다.

**핵심 개념:** AWS Firewall Manager
