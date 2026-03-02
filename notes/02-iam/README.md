# AWS Identity and Access Management (IAM)

## 개요
IAM은 AWS 리소스에 대한 접근을 안전하게 제어하는 글로벌 서비스이다. 사용자, 그룹, 역할, 정책을 통해 "누가 무엇을 할 수 있는지"를 관리한다. SAA-C03 시험에서 매우 중요한 기초 서비스이며, 거의 모든 아키텍처 문제에서 IAM 관련 지식이 필요하다.

## 핵심 개념

### Users & Groups
- **Root 계정**: 기본 생성, 사용/공유하지 말 것 (계정 설정 시에만 사용)
- **Users**: 조직 내 실제 사람에 매핑, AWS Console용 비밀번호 보유
- **Groups**: 사용자만 포함 가능 (그룹 안에 그룹 불가)
- 사용자는 그룹에 속하지 않아도 되고, 여러 그룹에 속할 수 있음
- **원칙: One physical user = One AWS user**

```text
IAM Users, Groups, Roles 관계도
================================

  ┌─── AWS Account ──────────────────────────────────────────────┐
  │                                                              │
  │  Root Account (초기 설정만 사용!)                              │
  │                                                              │
  │  ┌─── Group: Developers ───┐   ┌─── Group: Ops ────────┐   │
  │  │                          │   │                        │   │
  │  │  ┌────────┐ ┌────────┐  │   │  ┌────────┐           │   │
  │  │  │ User A │ │ User B │  │   │  │ User B │ ← 복수    │   │
  │  │  └────────┘ └────────┘  │   │  │(동일)  │   그룹    │   │
  │  │                          │   │  └────────┘   소속    │   │
  │  │  Policy: S3 Read/Write   │   │                        │   │
  │  └──────────────────────────┘   │  ┌────────┐           │   │
  │                                  │  │ User C │           │   │
  │  ┌────────┐                      │  └────────┘           │   │
  │  │ User D │ ← 그룹 미소속        │                        │   │
  │  │        │   인라인 정책 부여    │  Policy: EC2 Full      │   │
  │  └────────┘                      └────────────────────────┘   │
  │                                                              │
  │  ┌─── IAM Roles (서비스에 권한 부여) ──────────────────────┐ │
  │  │                                                          │ │
  │  │  EC2 Role ──▶ S3 접근        Lambda Role ──▶ DynamoDB   │ │
  │  │                                                          │ │
  │  └──────────────────────────────────────────────────────────┘ │
  └──────────────────────────────────────────────────────────────┘

  * 그룹에는 사용자만 포함 (그룹 중첩 불가)
  * User B처럼 여러 그룹에 동시 소속 가능
  * User D처럼 그룹 없이 인라인 정책만 가질 수도 있음
```

### IAM Policies (정책)
- JSON 문서로 권한을 정의
- 사용자 또는 그룹에 할당
- **최소 권한 원칙 (Least Privilege Principle)** 적용

#### 정책 구조
| 요소 | 설명 | 필수 여부 |
|------|------|---------|
| Version | 정책 언어 버전 ("2012-10-17") | 필수 |
| Id | 정책 식별자 | 선택 |
| Statement | 하나 이상의 개별 명세 | 필수 |
| Sid | Statement 식별자 | 선택 |
| Effect | Allow 또는 Deny | 필수 |
| Principal | 정책이 적용되는 계정/사용자/역할 | 필수 |
| Action | 허용/거부할 작업 목록 | 필수 |
| Resource | Action이 적용되는 리소스 목록 | 필수 |
| Condition | 정책 적용 조건 | 선택 |

### 정책 상속
- 그룹에 부여된 정책은 그룹 내 모든 사용자에게 상속
- 사용자에게 직접 부여하는 **인라인 정책(Inline Policy)** 도 가능
- 사용자가 여러 그룹에 속하면 모든 그룹의 정책을 상속받음

```text
IAM 정책 평가 흐름 (Policy Evaluation Logic)
=============================================

  [요청 수신: User가 Action 수행 시도]
              │
              ▼
  ┌───────────────────────┐
  │  명시적 Deny가 있는가? │
  └───────────┬───────────┘
         예   │   아니오
         │    │      │
         ▼    │      ▼
  ┌──────────┐│ ┌───────────────────────┐
  │  DENY!   ││ │  명시적 Allow가 있는가? │
  │ (최종)   ││ └───────────┬───────────┘
  └──────────┘│        예   │   아니오
              │        │    │      │
              │        ▼    │      ▼
              │ ┌──────────┐│ ┌──────────┐
              │ │  ALLOW!  ││ │  DENY!   │
              │ │ (허용)   ││ │ (묵시적) │
              │ └──────────┘│ └──────────┘
              │             │
              └─────────────┘

  핵심: Deny는 항상 Allow보다 우선한다!

  정책 소스들 (모두 합산 평가):
  ┌──────────┐  ┌──────────────┐  ┌──────────────┐
  │ 그룹 A   │  │ 그룹 B       │  │ 인라인 정책   │
  │ 정책     │  │ 정책         │  │ (직접 부여)   │
  └────┬─────┘  └──────┬───────┘  └──────┬───────┘
       └───────────────┼─────────────────┘
                       ▼
              ┌────────────────┐
              │ 최종 권한 결정  │
              │ (합집합 + Deny │
              │  우선 적용)    │
              └────────────────┘
```

### Password Policy (비밀번호 정책)
- 최소 비밀번호 길이 설정
- 특정 문자 유형 요구 (대문자, 소문자, 숫자, 특수문자)
- 사용자의 자체 비밀번호 변경 허용
- 비밀번호 만료 설정 (주기적 변경 강제)
- 비밀번호 재사용 방지

### MFA (Multi Factor Authentication)
- **비밀번호 + 보안 장치 = 이중 인증**
- 비밀번호가 유출되어도 계정이 보호됨
- MFA 장치 옵션:
  - **Virtual MFA**: Google Authenticator, Authy (하나의 장치에 여러 토큰)
  - **U2F Security Key**: YubiKey (하나의 키로 여러 루트/IAM 사용자 지원)
  - **Hardware Key Fob**: Gemalto 제공
  - **Hardware Key Fob for GovCloud**: SurePassID 제공

### AWS 접근 방법
| 접근 방법 | 보호 수단 | 용도 |
|----------|---------|------|
| AWS Management Console | 비밀번호 + MFA | 웹 UI |
| AWS CLI | Access Key | 명령줄 |
| AWS SDK | Access Key | 프로그래밍 |

- **Access Key ID** = 사용자명 역할
- **Secret Access Key** = 비밀번호 역할
- Access Key는 절대 공유하지 말 것

```text
AWS 접근 방법 3가지
===================

  ┌────────────┐     Password + MFA      ┌──────────────────────┐
  │            │ ───────────────────────▶ │  AWS Management      │
  │            │                          │  Console (웹 UI)     │
  │            │                          └──────────────────────┘
  │            │
  │   사용자   │     Access Key           ┌──────────────────────┐
  │  (IAM      │ ───────────────────────▶ │  AWS CLI             │
  │   User)    │  (Access Key ID          │  (명령줄 인터페이스)  │
  │            │   + Secret Access Key)   └──────────────────────┘
  │            │
  │            │     Access Key           ┌──────────────────────┐
  │            │ ───────────────────────▶ │  AWS SDK             │
  └────────────┘  (동일한 키 쌍 사용)      │  (프로그래밍 접근)    │
                                          └──────────────────────┘
```

### IAM Roles (역할)
- AWS 서비스에 권한을 부여하기 위한 것
- 주요 역할:
  - EC2 Instance Roles
  - Lambda Function Roles
  - CloudFormation Roles

### IAM Security Tools
- **IAM Credentials Report (계정 수준)**: 모든 사용자와 자격 증명 상태 목록
- **IAM Access Advisor (사용자 수준)**: 서비스 권한 및 마지막 접근 시간 표시 → 정책 검토에 활용

## 시험 포인트
- IAM은 **글로벌 서비스** (리전에 종속되지 않음)
- Root 계정은 초기 설정 외에 사용하지 말 것
- 그룹에는 사용자만 포함 가능 (그룹 중첩 불가)
- **Deny는 항상 Allow보다 우선**
- EC2에서 AWS 서비스 접근 시 → Access Key가 아닌 **IAM Role** 사용
- Credentials Report vs Access Advisor 구분: 계정 전체 감사 vs 개별 사용자 권한 검토
- AWS CLI는 Python용 AWS SDK(boto3) 기반으로 빌드됨

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| IAM User | 실제 사용자 1:1 매핑, Console 비밀번호 |
| IAM Group | 사용자만 포함, 그룹 중첩 불가 |
| IAM Policy | JSON 형식 권한 문서 |
| IAM Role | AWS 서비스에 권한 부여 |
| MFA | 비밀번호 + 보안 장치 이중 인증 |
| Access Key | CLI/SDK 접근용 (Key ID + Secret Key) |
| Credentials Report | 계정 수준 - 전체 사용자 자격 증명 감사 |
| Access Advisor | 사용자 수준 - 서비스별 마지막 접근 시간 |
| Least Privilege | 필요한 최소한의 권한만 부여 |

---

## Practice Questions

### Q1. A company wants to allow an EC2 instance to access an S3 bucket. What is the MOST secure way to grant this access?
**Options:**
- A) Store AWS access keys in the EC2 instance's environment variables
- B) Attach an IAM Role with appropriate S3 permissions to the EC2 instance
- C) Create an IAM user and hardcode the credentials in the application
- D) Use the root account credentials on the EC2 instance

**Answer:** B

**해설:**

> **문제:** 한 회사가 EC2 인스턴스에서 S3 버킷에 접근하도록 허용하려 한다. 이 접근을 부여하는 가장 안전한 방법은?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스의 환경 변수에 AWS 액세스 키를 저장 |
| B | 적절한 S3 권한이 있는 IAM Role을 EC2 인스턴스에 연결 |
| C | IAM 사용자를 생성하고 애플리케이션에 자격 증명을 하드코딩 |
| D | EC2 인스턴스에서 루트 계정 자격 증명 사용 |

**(A)** : 환경 변수에 액세스 키를 저장하면 키가 노출될 위험이 있다. 하드코딩보다는 낫지만 IAM Role에 비해 안전하지 않다. → [📖 AWS 접근 방법](/section/02-iam#aws-접근-방법)

**(B) 정답** : IAM Role은 임시 자격 증명을 자동으로 발급·순환시켜 키 관리가 필요 없다. EC2에서 AWS 서비스에 접근하는 가장 안전한 방법이다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(C)** : 자격 증명을 소스 코드에 하드코딩하면 소스 코드 유출 시 민감 정보가 함께 노출된다. 가장 위험한 방법이다.

**(D)** : 루트 계정은 모든 권한을 가지므로 일반 작업에 사용하면 최소 권한 원칙에 위배된다. 절대 사용해서는 안 된다.

**핵심 개념:** IAM Roles for Services

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할)

### Q2. Which IAM security tool provides a report that lists all IAM users and the status of their various credentials?
**Options:**
- A) IAM Access Advisor
- B) IAM Credentials Report
- C) AWS CloudTrail
- D) AWS Config

**Answer:** B

**해설:**

> **문제:** 모든 IAM 사용자와 자격 증명 상태를 나열하는 보고서를 제공하는 IAM 보안 도구는?

| 선지 | 번역 |
|------|------|
| A | IAM Access Advisor |
| B | IAM Credentials Report |
| C | AWS CloudTrail |
| D | AWS Config |

**(A)** : IAM Access Advisor는 사용자 수준에서 서비스별 마지막 접근 시간을 보여주는 도구로, 최소 권한 원칙 적용에 활용된다. 모든 사용자의 자격 증명 상태 목록을 제공하지는 않는다. → [📖 IAM Security Tools](/section/02-iam#iam-security-tools)

**(B) 정답** : IAM Credentials Report는 계정 수준의 보고서로, 모든 사용자와 비밀번호·액세스 키·MFA 등 자격 증명 상태를 나열한다. → [📖 IAM Security Tools](/section/02-iam#iam-security-tools)

**(C)** : CloudTrail은 AWS API 호출 이력을 감사하는 서비스이다. 자격 증명 상태 보고서가 아닌 API 활동 기록을 제공한다.

**(D)** : AWS Config는 AWS 리소스의 구성 변경을 추적하고 감사하는 서비스이다. IAM 자격 증명 상태 보고와는 용도가 다르다.

**핵심 개념:** IAM Security Tools

**관련 노트:** [IAM Security Tools](/section/02-iam#iam-security-tools)

### Q3. An IAM user belongs to two groups. Group A has a policy that allows S3 read access, and Group B has a policy that denies all S3 access. What happens when the user tries to read from S3?
**Options:**
- A) The user can read from S3 because Allow takes precedence
- B) The user cannot read from S3 because Deny always takes precedence
- C) The request is evaluated based on which group was created first
- D) The user receives an error because of conflicting policies

**Answer:** B

**해설:**

> **문제:** IAM 사용자가 두 그룹에 속해 있다. 그룹 A는 S3 읽기 접근을 허용하는 정책이 있고, 그룹 B는 모든 S3 접근을 거부하는 정책이 있다. 사용자가 S3에서 읽기를 시도하면 어떻게 되는가?

| 선지 | 번역 |
|------|------|
| A | Allow가 우선하므로 사용자가 S3에서 읽기 가능 |
| B | Deny가 항상 우선하므로 사용자가 S3에서 읽기 불가 |
| C | 어떤 그룹이 먼저 생성되었는지에 따라 평가됨 |
| D | 정책 충돌로 인해 사용자가 오류를 수신 |

**(A)** : Allow가 우선한다는 설명은 IAM 정책 평가 규칙과 정반대이다. IAM에서는 명시적 Deny가 항상 Allow보다 우선한다.

**(B) 정답** : Deny는 항상 Allow보다 우선하므로 그룹 B의 Deny 정책으로 인해 S3 읽기 접근이 거부된다. IAM은 모든 정책을 합산 평가하여 Deny가 하나라도 있으면 해당 작업을 거부한다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(C)** : 그룹 생성 순서는 정책 평가에 전혀 영향을 미치지 않는다. IAM은 어떤 그룹이 먼저 생성되었는지와 무관하게 모든 정책을 합산 평가한다.

**(D)** : 정책 충돌 오류라는 개념은 IAM에 존재하지 않는다. IAM은 오류를 반환하는 것이 아니라 명시적 Deny 우선 규칙에 따라 최종 결과를 결정한다.

**핵심 개념:** IAM Policy Evaluation - Deny 우선

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [정책 상속](/section/02-iam#정책-상속)

### Q4. Which of the following statements about IAM Groups is correct?
**Options:**
- A) Groups can contain other groups for nested permissions
- B) A user must belong to at least one group
- C) Groups can only contain IAM users, not other groups
- D) Groups can contain both users and roles

**Answer:** C

**해설:**

> **문제:** IAM 그룹에 대한 다음 설명 중 올바른 것은?

| 선지 | 번역 |
|------|------|
| A | 그룹은 중첩된 권한을 위해 다른 그룹을 포함할 수 있다 |
| B | 사용자는 최소 하나의 그룹에 속해야 한다 |
| C | 그룹은 IAM 사용자만 포함할 수 있으며 다른 그룹은 포함할 수 없다 |
| D | 그룹은 사용자와 역할 모두를 포함할 수 있다 |

**(A)** : 그룹 중첩(그룹 안에 그룹 포함)은 IAM에서 지원하지 않는 기능이다. 그룹에는 사용자만 포함할 수 있다.

**(B)** : 사용자는 어떤 그룹에도 속하지 않아도 된다. 최소 하나의 그룹 소속 요건은 없으며, 인라인 정책만으로도 권한을 부여받을 수 있다.

**(C) 정답** : IAM 그룹에는 IAM 사용자만 포함할 수 있으며, 다른 그룹을 중첩하는 것은 불가능하다. 이것이 IAM 그룹의 핵심 제약 사항이다. → [📖 Users & Groups](/section/02-iam#users-groups)

**(D)** : 그룹에 역할(Role)을 포함하는 것은 불가능하다. IAM Role은 그룹에 속하는 것이 아니라 서비스나 사용자가 직접 assume하는 독립적인 엔티티이다.

**핵심 개념:** IAM Users & Groups

**관련 노트:** [Users & Groups](/section/02-iam#users-groups)

### Q5. A Solutions Architect wants to review which AWS services an IAM user has accessed to apply the least privilege principle. Which tool should they use?
**Options:**
- A) IAM Credentials Report
- B) AWS CloudTrail Logs
- C) IAM Access Advisor
- D) AWS Trusted Advisor

**Answer:** C

**해설:**

> **문제:** Solutions Architect가 최소 권한 원칙을 적용하기 위해 IAM 사용자가 접근한 AWS 서비스를 검토하려 한다. 어떤 도구를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | IAM Credentials Report |
| B | AWS CloudTrail Logs |
| C | IAM Access Advisor |
| D | AWS Trusted Advisor |

**(A)** : Credentials Report는 자격 증명 상태(비밀번호 마지막 사용, 액세스 키 상태 등)를 보여주는 계정 수준 보고서이다. 서비스별 접근 내역이 아니므로 최소 권한 적용에 직접 활용하기 어렵다.

**(B)** : CloudTrail은 AWS API 호출 이력을 기록하지만, 최소 권한 적용을 위한 서비스별 마지막 접근 시간 요약을 제공하지는 않는다.

**(C) 정답** : IAM Access Advisor는 사용자 수준에서 부여된 서비스 권한과 마지막 접근 시간을 보여준다. 사용하지 않는 권한을 확인하고 정책을 축소하는 데 최적의 도구이다. → [📖 IAM Security Tools](/section/02-iam#iam-security-tools)

**(D)** : Trusted Advisor는 비용 최적화, 보안, 성능 등 전반적인 모범 사례를 점검하는 서비스이다. IAM 사용자별 서비스 접근 내역을 제공하지 않는다.

**핵심 개념:** IAM Access Advisor, 최소 권한 원칙

**관련 노트:** [IAM Security Tools](/section/02-iam#iam-security-tools)

### Q6. Which of the following is a valid MFA device option for AWS?
**Options:**
- A) SMS text message to a mobile phone
- B) Email verification code
- C) U2F security key such as YubiKey
- D) Biometric fingerprint scanner

**Answer:** C

**해설:**

> **문제:** 다음 중 AWS에서 유효한 MFA 장치 옵션은?

| 선지 | 번역 |
|------|------|
| A | 휴대폰으로의 SMS 문자 메시지 |
| B | 이메일 인증 코드 |
| C | YubiKey와 같은 U2F 보안 키 |
| D | 생체 지문 스캐너 |

**(A)** : SMS 문자 메시지는 AWS IAM MFA 옵션으로 공식 지원되지 않는다. 보안 수준이 낮아 권장되지 않는 방식이다.

**(B)** : 이메일 인증 코드는 AWS IAM MFA 방식으로 지원되지 않는다. AWS는 이메일 기반 OTP를 MFA 장치로 인정하지 않는다.

**(C) 정답** : YubiKey와 같은 U2F 보안 키는 AWS에서 공식 지원하는 MFA 장치이다. 하나의 키로 여러 루트/IAM 사용자를 지원할 수 있다. → [📖 MFA Multi Factor Authentication](/section/02-iam#mfa-multi-factor-authentication)

**(D)** : 생체 지문 스캐너는 AWS IAM MFA 옵션에 포함되지 않는다. AWS가 지원하는 MFA 장치는 Virtual MFA, U2F 보안 키, Hardware Key Fob 등이다.

**핵심 개념:** MFA devices options

**관련 노트:** [MFA Multi Factor Authentication](/section/02-iam#mfa-multi-factor-authentication)

### Q7. What are the components of an IAM Policy Statement? (Select the REQUIRED components)
**Options:**
- A) Effect, Action, Resource
- B) Sid, Effect, Action, Resource, Condition
- C) Version, Id, Statement
- D) Principal, Sid, Condition

**Answer:** A

**해설:**

> **문제:** IAM Policy Statement의 구성 요소는 무엇인가? (필수 구성 요소를 선택)

| 선지 | 번역 |
|------|------|
| A | Effect, Action, Resource |
| B | Sid, Effect, Action, Resource, Condition |
| C | Version, Id, Statement |
| D | Principal, Sid, Condition |

**(A) 정답** : Effect(Allow/Deny), Action(작업 목록), Resource(리소스 목록)가 IAM Policy Statement의 핵심 필수 구성요소이다. 이 세 가지가 없으면 Statement를 정의할 수 없다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(B)** : Sid와 Condition은 선택사항이므로 "필수 구성요소" 조합으로는 부적합하다. Effect, Action, Resource는 올바르지만 불필요한 선택 요소가 포함되어 있다.

**(C)** : Version과 Id는 Policy 전체 수준의 요소이지 개별 Statement 수준의 요소가 아니다. Statement 안에 들어가는 구성요소가 아니다.

**(D)** : Principal은 리소스 기반 정책에서만 필수이며, Sid와 Condition은 모두 선택사항이다. 세 요소 모두 Statement의 필수 구성요소가 아니다.

**핵심 개념:** IAM Policies Structure

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책)