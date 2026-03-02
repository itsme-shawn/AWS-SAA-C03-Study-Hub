# Section 23: Advanced Identity in AWS

## 개요
AWS의 고급 자격 증명 및 접근 관리를 다룬다. AWS Organizations, SCP, IAM Identity Center, Directory Services, Control Tower 등 다중 계정 환경에서의 보안 관리와 권한 제어가 핵심이다. SAA-C03 시험에서는 조직 구조 설계, 권한 경계, SSO, 크로스 계정 접근 등이 자주 출제된다.

## 핵심 개념

### AWS Organizations
- **글로벌 서비스**, 여러 AWS 계정 관리
- **Management Account** (메인 계정) + **Member Accounts**
- Member 계정은 하나의 조직에만 소속 가능
- **Consolidated Billing**: 모든 계정에 대한 단일 결제
- **집약 사용량 할인**: EC2, S3 등 볼륨 디스카운트
- **Reserved Instances 및 Savings Plans** 계정 간 공유
- API로 AWS 계정 자동 생성

#### OU (Organizational Units) 구조

```text
┌─────────────────────────────────────────────────────────────┐
│             Organizations + SCP 계층 구조                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────┐           │
│  │ Root OU  (FullAWSAccess SCP)                 │           │
│  │                                              │           │
│  │  ┌────────────────┐                          │           │
│  │  │ Management Acct│  * SCP 적용 안됨          │           │
│  │  └────────────────┘                          │           │
│  │                                              │           │
│  │  ┌─────────────────────────────────────┐     │           │
│  │  │ Prod OU  (SCP: Deny DeleteTable)    │     │           │
│  │  │                                     │     │           │
│  │  │  ┌──────────┐  ┌──────────┐         │     │           │
│  │  │  │ Account  │  │ Account  │         │     │           │
│  │  │  │ A        │  │ B        │         │     │           │
│  │  │  └──────────┘  └──────────┘         │     │           │
│  │  └─────────────────────────────────────┘     │           │
│  │                                              │           │
│  │  ┌─────────────────────────────────────┐     │           │
│  │  │ Dev OU  (SCP: Deny us-west-1)      │     │           │
│  │  │                                     │     │           │
│  │  │  ┌──────────┐  ┌──────────┐         │     │           │
│  │  │  │ Account  │  │ Account  │         │     │           │
│  │  │  │ C        │  │ D        │         │     │           │
│  │  │  └──────────┘  └──────────┘         │     │           │
│  │  └─────────────────────────────────────┘     │           │
│  │                                              │           │
│  └──────────────────────────────────────────────┘           │
│                                                             │
│  SCP 규칙:                                                  │
│  - Root에서 대상까지 명시적 Allow 필요                        │
│  - Deny는 하위에서 재허용 불가                                │
│  - Management Account에는 미적용                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- 비즈니스 단위별, 환경 수명주기별, 프로젝트별 등 다양한 구조
- Root OU > Management Account > 하위 OU (Dev, Prod, HR, Finance 등) > Member Accounts

#### Organizations 장점
- Multi Account vs One Account Multi VPC
- 태깅 표준 (빌링), CloudTrail 중앙화 (S3), CloudWatch Logs 중앙화
- Cross Account Roles (관리용)

### Service Control Policies (SCP)
- OU 또는 Accounts에 적용되는 **IAM 정책**으로 Users/Roles 제한
- **Management Account에는 적용되지 않음** (전체 관리 권한 유지)
- Root부터 대상 계정까지 **명시적 Allow 필요** (기본 허용 없음, IAM과 동일)
- **Blocklist** 전략: FullAWSAccess + 특정 서비스 Deny
- **Allowlist** 전략: 허용할 서비스만 명시적 Allow

#### SCP 계층 구조 예시
- Root OU (FullAWSAccess) > Sandbox OU (Deny S3) > Account A: S3 사용 불가
- Deny는 계층을 따라 상속되며, 하위에서 재허용 불가

### AWS Organizations - Tag Policies
- 조직 내 리소스의 **태그 표준화**
- 태그 키 및 허용 값 정의
- 비준수 태깅 작업 방지 (태그 없는 리소스에는 영향 없음)
- 비준수 리소스 보고서 생성
- EventBridge로 비준수 태그 모니터링

### IAM Conditions
- **aws:SourceIp**: 클라이언트 IP 제한
- **aws:RequestedRegion**: API 호출 리전 제한
- **ec2:ResourceTag**: 태그 기반 접근 제한
- **aws:MultiFactorAuthPresent**: MFA 강제
- **aws:PrincipalOrgID**: Organization 멤버 계정만 접근 허용 (리소스 정책에서)

### IAM for S3
- **s3:ListBucket**: 버킷 수준 (arn:aws:s3:::bucket-name)
- **s3:GetObject/PutObject/DeleteObject**: 객체 수준 (arn:aws:s3:::bucket-name/*)

### IAM Roles vs Resource-Based Policies

```text
┌─────────────────────────────────────────────────────────────────┐
│          IAM Role Assume vs Resource-Based Policy 비교           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [방법 1: Role Assume]                                          │
│  ┌──────────┐  AssumeRole  ┌──────────┐                        │
│  │ Account A│─────────────▶│ Account B│                        │
│  │ User     │              │ IAM Role │                        │
│  └──────────┘              └────┬─────┘                        │
│   원래 권한 포기 X                │                              │
│                                 ▼                               │
│                          ┌──────────┐                           │
│                          │ Account B│                           │
│                          │ S3 접근  │  (Account A 리소스 접근 X) │
│                          └──────────┘                           │
│                                                                 │
│  [방법 2: Resource-Based Policy]                                │
│  ┌──────────┐              ┌──────────────────┐                │
│  │ Account A│──────────────▶│ Account B S3    │                │
│  │ User     │  버킷 정책에   │ Bucket Policy:  │                │
│  └────┬─────┘  의해 허용     │ Allow Account A │                │
│       │                     └──────────────────┘                │
│       │ 원래 권한 유지 O                                        │
│       ▼                                                         │
│  ┌──────────┐                                                   │
│  │ Account A│  (Account A DynamoDB도 동시 접근 가능)             │
│  │ DynamoDB │                                                   │
│  └──────────┘                                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

- **Role Assume**: 원래 권한을 **포기**하고 역할 권한만 사용
- **Resource-Based Policy**: 원래 권한을 **유지**하면서 리소스 접근
- 예: Account A 사용자가 Account A DynamoDB 스캔 + Account B S3 덤프 -> Resource-Based Policy 필요
- Resource-Based Policy 지원: S3, SNS, SQS 등

#### EventBridge 보안
- Resource-Based Policy: Lambda, SNS, SQS, S3, API Gateway
- IAM Role: EC2 Auto Scaling, SSM Run Command, ECS Task

### IAM Permission Boundaries

```text
┌─────────────────────────────────────────────────────────┐
│        IAM Policy 평가 로직 (유효 권한 = 교집합)          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Organizations SCP (계정 수준 최대 권한)            │    │
│  │                                                 │    │
│  │  ┌──────────────────────────────────────────┐   │    │
│  │  │ Permission Boundary (사용자 최대 권한)     │   │    │
│  │  │                                          │   │    │
│  │  │   ┌──────────────────────────────┐       │   │    │
│  │  │   │ IAM Identity Policy          │       │   │    │
│  │  │   │ (실제 부여된 권한)             │       │   │    │
│  │  │   │                              │       │   │    │
│  │  │   │   ┌──────────────────┐       │       │   │    │
│  │  │   │   │ *** 유효 권한 *** │       │       │   │    │
│  │  │   │   │ (모든 계층의     │       │       │   │    │
│  │  │   │   │  교집합)         │       │       │   │    │
│  │  │   │   └──────────────────┘       │       │   │    │
│  │  │   └──────────────────────────────┘       │   │    │
│  │  └──────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  * Explicit Deny는 어떤 계층에서든 최우선 적용             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Users/Roles에 적용 (Groups 미지원)
- 관리형 정책으로 **IAM 엔티티의 최대 권한** 설정
- Permission Boundary + IAM Policy의 **교집합**만 유효
- Organizations SCP와 조합 가능

#### Permission Boundaries 사용 사례
- 비관리자에게 IAM 사용자 생성 등 위임 (경계 내에서만)
- 개발자가 자체 정책 관리하되 권한 상승(admin 탈취) 방지
- **특정 사용자** 제한 (Organizations SCP는 전체 계정)

### IAM Policy Evaluation Logic
- 평가 순서: Explicit Deny > Organizations SCP > Resource-Based Policy > Permission Boundaries > Session Policies > Identity-Based Policy

### AWS IAM Identity Center (AWS SSO 후속)
> **왜 필요한가?** — 회사에 AWS 계정이 10개, Salesforce, M365 등 앱이 여러 개 있을 때, 직원이 각각 따로 로그인하면 불편하고 보안 관리도 어렵다. IAM Identity Center는 "한 번 로그인하면 모든 계정/앱에 접근" 가능하게 해주는 서비스다.

- **단일 로그인(SSO: Single Sign-On)** 서비스
- 대상: AWS 계정 (Organizations), 비즈니스 앱 (Salesforce, Box, M365), SAML2.0 앱, EC2 Windows
- **Identity Providers (신원 공급자)**: Built-in Identity Store, Active Directory, OneLogin, Okta 등

#### IAM Identity Center 구성
- **Permission Sets**: IAM Policies 모음으로 AWS 접근 정의 (Users/Groups에 할당)
- **Multi-Account Permissions**: Organizations 내 계정 간 접근 관리
- **Application Assignments**: SAML 2.0 비즈니스 앱 SSO
  - **SAML 2.0 (Security Assertion Markup Language)**: "신원 정보를 다른 시스템에 전달하는 표준 프로토콜". 예를 들어 회사 AD에 로그인했다는 사실을 Salesforce에게 안전하게 전달해 Salesforce가 별도 로그인 없이 허용하게 함.
- **ABAC (Attribute-Based Access Control, 속성 기반 접근 제어)**: 사용자 속성(cost center, title, locale 등) 기반 세밀한 권한

### Microsoft Active Directory (AD)
- Windows Server의 AD Domain Services
- 객체 DB: 사용자, 컴퓨터, 프린터, 파일 공유, 보안 그룹
- 중앙 집중식 보안 관리, 트리/포레스트 구조

### AWS Directory Services
| 서비스 | 설명 |
|--------|------|
| **AWS Managed Microsoft AD** | AWS에서 AD 생성, 로컬 사용자 관리, MFA, 온프레미스 AD와 **trust** 연결 |
| **AD Connector** | 온프레미스 AD로의 **프록시**(게이트웨이), MFA 지원, 사용자는 온프레미스에서 관리 |
| **Simple AD** | AWS에서 AD 호환 관리형 디렉터리, 온프레미스 AD와 **연결 불가** |

#### IAM Identity Center - AD 설정

```text
┌─────────────────────────────────────────────────────────────┐
│        Directory Services 연결 방식 비교                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [방법 1: AWS Managed AD + Trust]                           │
│  ┌──────────────┐  Two-way Trust  ┌──────────────┐         │
│  │ On-Premises  │◀═══════════════▶│ AWS Managed  │         │
│  │ Active       │                 │ Microsoft AD │         │
│  │ Directory    │                 └──────┬───────┘         │
│  └──────────────┘                        │                  │
│                                          ▼                  │
│                                  ┌──────────────┐          │
│                                  │ IAM Identity │          │
│                                  │ Center (SSO) │          │
│                                  └──────────────┘          │
│                                                             │
│  [방법 2: AD Connector (프록시)]                              │
│  ┌──────────────┐   Proxy     ┌──────────────┐             │
│  │ On-Premises  │◀════════════│ AD Connector │             │
│  │ Active       │             │ (프록시/     │             │
│  │ Directory    │             │  게이트웨이)  │             │
│  └──────────────┘             └──────┬───────┘             │
│   사용자 관리는 여기서                  │                     │
│                                      ▼                      │
│                               ┌──────────────┐             │
│                               │ IAM Identity │             │
│                               │ Center (SSO) │             │
│                               └──────────────┘             │
│                                                             │
│  [방법 3: Simple AD]                                        │
│  ┌──────────────┐                                          │
│  │ Simple AD    │  독립형, 온프레미스 연결 불가               │
│  │ (AWS 전용)   │──▶ IAM Identity Center                   │
│  └──────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- **AWS Managed AD**: 직접 연결 (out of the box)
- **Self-Managed AD 연결 방법**:
  1. AWS Managed AD와 **Two-way Trust Relationship** 생성
  2. **AD Connector** 사용 (프록시)

### AWS Control Tower
- 안전하고 규정 준수하는 **다중 계정 AWS 환경** 자동 구축
- AWS Organizations를 사용하여 계정 생성
- 기능: 환경 자동 설정, 정책 관리 자동화, 정책 위반 탐지/교정, 규정 준수 대시보드

#### Control Tower Guardrails
- **Preventive Guardrail**: **SCP** 사용 (예: 모든 계정의 리전 제한)
- **Detective Guardrail**: **AWS Config** 사용 (예: 태그 없는 리소스 식별)
  - 비준수 발견 -> SNS 알림 -> Lambda 호출 -> 자동 교정 (예: 태그 추가)

## 시험 포인트
- SCP는 **Management Account에 적용되지 않음**
- SCP는 **명시적 Allow가 필요** (Root에서 대상까지 경로상 모든 OU)
- SCP Deny는 하위에서 재허용 불가 (Deny 우선)
- **Role Assume vs Resource-Based Policy**: 크로스 계정 시 원래 권한 유지 여부
- Permission Boundaries: IAM Policy와의 **교집합**만 유효
- **aws:PrincipalOrgID**: Organization 멤버만 리소스 접근 허용
- IAM Identity Center: "SSO", "단일 로그인", "여러 AWS 계정 접근" 키워드
- **AWS Managed AD**: 온프레미스 AD와 trust 연결 필요 시
- **AD Connector**: 온프레미스 AD를 그대로 사용 (프록시)
- **Simple AD**: 온프레미스 연결 불필요한 간단한 AD
- Control Tower Preventive = SCP, Detective = Config
- Tag Policies: 태그 없는 리소스에는 영향 없음

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Organizations | 다중 계정 관리, Consolidated Billing, RI/SP 공유 |
| SCP | OU/Account 수준 권한 제한, Management Account 미적용 |
| Tag Policies | 태그 표준화, 비준수 태깅 방지 |
| IAM Permission Boundaries | User/Role 최대 권한 설정, IAM Policy와 교집합 |
| IAM Identity Center | SSO, Permission Sets, ABAC, Multi-Account 접근 |
| AWS Managed AD | AWS에서 AD 생성, 온프레미스 trust 연결 |
| AD Connector | 온프레미스 AD 프록시 |
| Simple AD | 독립형 AD 호환 디렉터리, 온프레미스 연결 불가 |
| Control Tower | 다중 계정 환경 자동 구축, Preventive (SCP) + Detective (Config) Guardrails |
| aws:PrincipalOrgID | Organization 멤버만 리소스 접근 허용 조건 |

---

## Practice Questions

### Q1. A company wants to prevent any IAM user or role in their development accounts from launching EC2 instances in the us-west-1 region, while allowing all other regions. They use AWS Organizations. What is the BEST approach?
**Options:**
- A) Create IAM policies in each development account to deny us-west-1
- B) Apply a Service Control Policy (SCP) to the Development OU that denies EC2 actions in us-west-1
- C) Use AWS Config rules to detect EC2 instances in us-west-1
- D) Create a Permission Boundary for all users in development accounts

**Answer:** B

**해설:**

> **문제:** 한 회사가 개발 계정의 모든 IAM 사용자와 역할이 us-west-1 리전에서 EC2 인스턴스를 시작하지 못하도록 하면서 다른 모든 리전은 허용하고 싶다. AWS Organizations를 사용하고 있다. 가장 좋은 접근 방식은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 각 개발 계정에서 us-west-1을 거부하는 IAM 정책 생성 |
| B | Development OU에 us-west-1에서 EC2 작업을 거부하는 SCP 적용 |
| C | us-west-1의 EC2 인스턴스를 탐지하는 AWS Config 규칙 사용 |
| D | 개발 계정의 모든 사용자에 대해 Permission Boundary 생성 |

**(A)** : 개별 IAM 정책은 모든 개발 계정에서 각각 관리해야 한다. 확장성이 떨어지고 누락될 위험이 있다.

**(B) 정답** : SCP를 Development OU에 적용하면 해당 OU 내 모든 계정의 모든 사용자/역할에게 us-west-1에서의 EC2 작업을 일괄 차단할 수 있다.

**(C)** : AWS Config은 사후 탐지만 가능하다. 리소스 생성을 차단하지 않는다.

**(D)** : Permission Boundary는 개별 사용자/역할에 하나씩 적용해야 한다. OU 수준의 일괄 제한에 비해 관리가 복잡하다.

**핵심 개념:** Service Control Policies (SCP)

### Q2. A user in Account A needs to scan a DynamoDB table in Account A and write the results to an S3 bucket in Account B. The user needs to maintain their DynamoDB permissions while accessing the S3 bucket. What is the BEST approach?
**Options:**
- A) Create an IAM role in Account B and have the user assume it
- B) Use a resource-based policy (S3 bucket policy) on Account B's S3 bucket
- C) Create a cross-account IAM user in Account B
- D) Use AWS Organizations consolidated access

**Answer:** B

**해설:**

> **문제:** Account A의 사용자가 Account A의 DynamoDB 테이블을 스캔하고 결과를 Account B의 S3 버킷에 쓰기해야 한다. DynamoDB 권한을 유지하면서 S3 버킷에 접근해야 한다. 가장 좋은 접근 방식은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Account B에 IAM 역할을 생성하고 사용자가 assume |
| B | Account B의 S3 버킷에 리소스 기반 정책(버킷 정책) 사용 |
| C | Account B에 크로스 계정 IAM 사용자 생성 |
| D | AWS Organizations 통합 접근 사용 |

**(A)** : IAM Role을 assume하면 원래 권한을 포기하게 된다. Account A의 DynamoDB에 동시에 접근할 수 없어 요구사항을 충족하지 못한다.

**(B) 정답** : S3 버킷의 resource-based policy(버킷 정책)를 사용하여 Account A 사용자에게 접근을 허용하면 사용자가 원래 권한(Account A DynamoDB 접근)을 유지하면서 Account B의 S3에 접근할 수 있다.

**(C)** : 크로스 계정 IAM 사용자라는 개념은 존재하지 않는다. IAM 사용자는 해당 계정 내에서만 생성된다.

**(D)** : AWS Organizations의 통합 접근(consolidated access)이라는 기능은 존재하지 않는다.

**핵심 개념:** IAM Roles vs Resource-Based Policies

### Q3. A company wants to implement single sign-on for their employees to access multiple AWS accounts in their AWS Organization and third-party SaaS applications like Salesforce. Which service should they use?
**Options:**
- A) Amazon Cognito
- B) AWS IAM with cross-account roles
- C) AWS IAM Identity Center
- D) AWS Directory Service

**Answer:** C

**해설:**

> **문제:** 한 회사가 직원들이 AWS Organization의 여러 AWS 계정과 Salesforce 같은 서드파티 SaaS 애플리케이션에 단일 로그인(SSO)으로 접근하도록 하고 싶다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Cognito |
| B | 크로스 계정 역할과 함께 AWS IAM |
| C | AWS IAM Identity Center |
| D | AWS Directory Service |

**(A)** : Cognito는 외부 사용자(모바일/웹 앱 사용자) 인증용이다. 기업 직원 SSO에 적합하지 않다.

**(B)** : 크로스 계정 IAM 역할은 개별 역할 전환이 필요하다. SSO 경험을 제공하지 않는다.

**(C) 정답** : AWS IAM Identity Center(AWS SSO 후속)는 AWS Organizations의 여러 계정과 Salesforce 같은 SAML 2.0 비즈니스 앱에 대한 단일 로그인을 제공한다. Permission Sets로 각 계정에 대한 접근 권한을 중앙에서 관리할 수 있다.

**(D)** : Directory Service는 Active Directory 관리용이다. SSO 서비스가 아니다.

**핵심 개념:** AWS IAM Identity Center

### Q4. A company has an on-premises Active Directory and wants to allow their users to authenticate against it when accessing AWS resources. They do NOT want to manage any AD infrastructure in AWS. Which AWS Directory Service option should they use?
**Options:**
- A) AWS Managed Microsoft AD
- B) AD Connector
- C) Simple AD
- D) Amazon Cognito User Pool

**Answer:** B

**해설:**

> **문제:** 한 회사가 온프레미스 Active Directory를 보유하고 있으며, AWS 리소스 접근 시 이를 사용하여 인증하고 싶다. AWS에서 AD 인프라를 관리하고 싶지 않다. 어떤 AWS Directory Service 옵션을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Managed Microsoft AD |
| B | AD Connector |
| C | Simple AD |
| D | Amazon Cognito User Pool |

**(A)** : AWS Managed Microsoft AD는 AWS에 완전한 AD를 생성한다. AWS에서 AD 인프라를 관리해야 한다.

**(B) 정답** : AD Connector는 온프레미스 AD로의 프록시(게이트웨이)이다. AWS에 AD 인프라를 생성하지 않고 온프레미스 AD로 인증 요청을 리다이렉트하므로 AWS에서 AD 관리가 불필요하다.

**(C)** : Simple AD는 독립형 AD 호환 디렉터리이다. 온프레미스 AD와 연결이 불가하다.

**(D)** : Cognito User Pool은 모바일/웹 앱 사용자 인증용이다. 기업 AD 통합에 적합하지 않다.

**핵심 개념:** AWS Directory Services / AD Connector

### Q5. A company allows developers to create their own IAM policies. However, they want to ensure developers cannot escalate their privileges to administrator access. Which feature should they use?
**Options:**
- A) Service Control Policies (SCP)
- B) IAM Permission Boundaries
- C) AWS Config Rules
- D) IAM Access Analyzer

**Answer:** B

**해설:**

> **문제:** 한 회사가 개발자들에게 자체 IAM 정책 생성을 허용하고 있다. 그러나 개발자들이 관리자 접근 권한으로 권한을 상승시킬 수 없도록 하고 싶다. 어떤 기능을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Service Control Policies (SCP) |
| B | IAM Permission Boundaries |
| C | AWS Config Rules |
| D | IAM Access Analyzer |

**(A)** : SCP는 전체 계정/OU 수준의 제한이다. 개별 사용자의 권한 상승 방지에는 세밀하지 않다.

**(B) 정답** : IAM Permission Boundaries는 IAM 엔티티(사용자/역할)의 최대 권한을 설정한다. 개발자가 자체 정책을 관리하더라도 경계를 넘는 권한을 획득할 수 없게 하며, 유효 권한은 IAM Policy와 Permission Boundary의 교집합만 적용된다.

**(C)** : AWS Config Rules는 리소스 구성 규정 준수 평가 도구이다. IAM 권한 상승 방지와 직접적으로 무관하다.

**(D)** : IAM Access Analyzer는 외부 접근 분석 도구이다. 권한 상승을 방지하는 제어 수단이 아니다.

**핵심 개념:** IAM Permission Boundaries

### Q6. An organization wants to restrict access to an S3 bucket so that only accounts within their AWS Organization can access it. Which IAM condition key should they use in the S3 bucket policy?
**Options:**
- A) aws:SourceIp
- B) aws:RequestedRegion
- C) aws:PrincipalOrgID
- D) aws:MultiFactorAuthPresent

**Answer:** C

**해설:**

> **문제:** 한 조직이 S3 버킷에 대한 접근을 AWS Organization 내 계정만 접근할 수 있도록 제한하고 싶다. S3 버킷 정책에서 어떤 IAM 조건 키를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | aws:SourceIp |
| B | aws:RequestedRegion |
| C | aws:PrincipalOrgID |
| D | aws:MultiFactorAuthPresent |

**(A)** : aws:SourceIp는 클라이언트 IP 주소 기반 제한이다. Organization 멤버십과 무관하다.

**(B)** : aws:RequestedRegion은 API 호출이 수행되는 리전을 제한하는 것이다. 계정 소속 여부 제한이 아니다.

**(C) 정답** : aws:PrincipalOrgID 조건 키를 리소스 정책(S3 버킷 정책)에 사용하면 AWS Organization의 멤버 계정에서만 접근을 허용할 수 있다. 새로운 계정이 Organization에 추가되어도 자동으로 접근이 허용된다.

**(D)** : aws:MultiFactorAuthPresent는 MFA 인증 여부 확인 조건이다. Organization 소속 여부와 무관하다.

**핵심 개념:** aws:PrincipalOrgID

### Q7. A company is setting up a new multi-account AWS environment and wants to automate the provisioning of accounts with guardrails for security and compliance. They need both preventive controls (blocking certain actions) and detective controls (identifying non-compliant resources). Which service should they use?
**Options:**
- A) AWS Organizations with SCPs only
- B) AWS Control Tower
- C) AWS Config with AWS CloudFormation
- D) AWS IAM Identity Center

**Answer:** B

**해설:**

> **문제:** 한 회사가 보안과 규정 준수를 위한 가드레일과 함께 새로운 다중 계정 AWS 환경의 프로비저닝을 자동화하려 한다. 특정 작업을 차단하는 예방적 제어와 비준수 리소스를 식별하는 탐지적 제어가 모두 필요하다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | SCP만 사용하는 AWS Organizations |
| B | AWS Control Tower |
| C | AWS CloudFormation과 함께 AWS Config |
| D | AWS IAM Identity Center |

**(A)** : AWS Organizations에 SCP만 사용하면 예방적 제어는 가능하다. 그러나 탐지적 제어(비준수 리소스 식별)가 부족하다.

**(B) 정답** : AWS Control Tower는 다중 계정 AWS 환경을 자동 구축하고 Preventive Guardrails(SCP 기반 차단)와 Detective Guardrails(AWS Config 기반 탐지)를 모두 제공한다. 규정 준수 대시보드로 전체 환경을 모니터링할 수 있다.

**(C)** : AWS Config + CloudFormation 조합으로 유사한 기능을 구현할 수 있지만 Control Tower보다 설정과 관리가 훨씬 복잡하다.

**(D)** : IAM Identity Center는 SSO(단일 로그인) 서비스이다. 계정 프로비저닝이나 가드레일과 무관하다.

**핵심 개념:** AWS Control Tower / Guardrails
