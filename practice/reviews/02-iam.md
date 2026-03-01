# Section 02 - IAM 연습문제 해설

---

### Q1. A company wants to allow an EC2 instance to access an S3 bucket. What is the MOST secure way to grant this access?

**한글 번역:** 한 회사가 EC2 인스턴스가 S3 버킷에 접근할 수 있도록 허용하려고 합니다. 이 접근 권한을 부여하는 가장 안전한 방법은 무엇입니까?

**선지:**
- A) Store AWS access keys in the EC2 instance's environment variables → EC2 인스턴스의 환경 변수에 AWS 액세스 키 저장
- B) Attach an IAM Role with appropriate S3 permissions to the EC2 instance → 적절한 S3 권한이 있는 IAM 역할(Role)을 EC2 인스턴스에 연결
- C) Create an IAM user and hardcode the credentials in the application → IAM 사용자를 생성하고 자격 증명을 애플리케이션에 하드코딩
- D) Use the root account credentials on the EC2 instance → EC2 인스턴스에서 루트 계정 자격 증명 사용

**정답:** B

**선지별 해설:**
- **A) 환경 변수에 액세스 키 저장:** 액세스 키를 환경 변수에 저장하는 것은 키가 노출될 위험이 있습니다. 인스턴스에 접근할 수 있는 사람이라면 환경 변수를 조회하여 키를 탈취할 수 있습니다. IAM Role보다 보안 수준이 낮습니다.
- **B) IAM Role 연결:** 정답입니다. IAM Role은 EC2 인스턴스에 임시 자격 증명(temporary credentials)을 자동으로 제공합니다. 자격 증명이 자동으로 교체되며, 어디에도 키를 저장할 필요가 없으므로 가장 안전한 방법입니다. AWS 모범 사례에서 항상 권장하는 방식입니다.
- **C) 자격 증명 하드코딩:** 자격 증명을 코드에 하드코딩하는 것은 최악의 보안 관행 중 하나입니다. 소스 코드가 유출되면 자격 증명도 함께 유출됩니다. 절대 사용하면 안 됩니다.
- **D) 루트 계정 사용:** 루트 계정은 모든 권한을 가지고 있어 최소 권한 원칙에 위배됩니다. 루트 계정 자격 증명은 절대 EC2 인스턴스에 사용해서는 안 되며, 일상 작업에도 사용하지 말아야 합니다.

**핵심 개념:** EC2를 위한 IAM Role 사용 (임시 자격 증명, AWS 보안 모범 사례)

---

### Q2. Which IAM security tool provides a report that lists all IAM users and the status of their various credentials?

**한글 번역:** 모든 IAM 사용자와 그들의 다양한 자격 증명 상태를 나열하는 보고서를 제공하는 IAM 보안 도구는 무엇입니까?

**선지:**
- A) IAM Access Advisor → IAM 액세스 어드바이저
- B) IAM Credentials Report → IAM 자격 증명 보고서
- C) AWS CloudTrail → AWS CloudTrail
- D) AWS Config → AWS Config

**정답:** B

**선지별 해설:**
- **A) IAM Access Advisor:** Access Advisor는 개별 사용자 수준에서 마지막으로 접근한 서비스 정보를 보여줍니다. 전체 사용자 목록과 자격 증명 상태를 보여주는 보고서가 아닙니다. 최소 권한 적용 시 사용합니다.
- **B) IAM Credentials Report:** 정답입니다. Credentials Report는 계정 수준(account-level)의 보고서로, 모든 IAM 사용자의 비밀번호, 액세스 키, MFA 상태 등 자격 증명 상태를 CSV 형식으로 제공합니다.
- **C) AWS CloudTrail:** CloudTrail은 AWS 계정의 API 호출을 기록하고 추적하는 서비스입니다. 자격 증명 상태 보고서를 제공하지 않습니다.
- **D) AWS Config:** AWS Config는 AWS 리소스의 구성 변경을 추적하고 규정 준수를 평가하는 서비스입니다. IAM 자격 증명 보고서와는 다른 목적입니다.

**핵심 개념:** IAM Credentials Report (계정 수준 보고서) vs IAM Access Advisor (사용자 수준)

---

### Q3. An IAM user belongs to two groups. Group A has a policy that allows S3 read access, and Group B has a policy that denies all S3 access. What happens when the user tries to read from S3?

**한글 번역:** IAM 사용자가 두 그룹에 속해 있습니다. 그룹 A에는 S3 읽기 접근을 허용하는 정책이 있고, 그룹 B에는 모든 S3 접근을 거부하는 정책이 있습니다. 이 사용자가 S3에서 읽기를 시도하면 어떻게 됩니까?

**선지:**
- A) The user can read from S3 because Allow takes precedence → Allow가 우선하므로 사용자가 S3에서 읽을 수 있음
- B) The user cannot read from S3 because Deny always takes precedence → Deny가 항상 우선하므로 사용자가 S3에서 읽을 수 없음
- C) The request is evaluated based on which group was created first → 먼저 생성된 그룹을 기준으로 요청이 평가됨
- D) The user receives an error because of conflicting policies → 충돌하는 정책 때문에 사용자가 오류를 받음

**정답:** B

**선지별 해설:**
- **A) Allow가 우선:** 틀립니다. AWS IAM 정책 평가에서 Allow는 Deny보다 우선하지 않습니다. 정반대입니다.
- **B) Deny가 항상 우선:** 정답입니다. AWS IAM의 핵심 규칙은 "명시적 Deny는 항상 우선한다(Explicit Deny always wins)"입니다. 어떤 정책에서 Allow가 있더라도, 다른 정책에 명시적 Deny가 있으면 해당 작업은 거부됩니다. 이를 통해 보안을 강화할 수 있습니다.
- **C) 그룹 생성 순서 기준:** IAM 정책 평가는 그룹 생성 순서와 무관합니다. 모든 관련 정책이 동시에 평가됩니다.
- **D) 충돌 오류:** 정책 충돌 시 오류가 발생하는 것이 아니라, Deny가 우선 적용되어 접근이 거부됩니다. 이는 정상적인 정책 평가 프로세스입니다.

**핵심 개념:** IAM 정책 평가 로직 - 명시적 Deny가 항상 우선 (Explicit Deny > Allow > Implicit Deny)

---

### Q4. Which of the following statements about IAM Groups is correct?

**한글 번역:** IAM 그룹에 대한 다음 설명 중 올바른 것은 무엇입니까?

**선지:**
- A) Groups can contain other groups for nested permissions → 그룹은 중첩된 권한을 위해 다른 그룹을 포함할 수 있음
- B) A user must belong to at least one group → 사용자는 최소 하나의 그룹에 속해야 함
- C) Groups can only contain IAM users, not other groups → 그룹은 IAM 사용자만 포함할 수 있으며 다른 그룹은 포함할 수 없음
- D) Groups can contain both users and roles → 그룹은 사용자와 역할을 모두 포함할 수 있음

**정답:** C

**선지별 해설:**
- **A) 그룹 중첩 가능:** 틀립니다. IAM 그룹은 다른 그룹을 포함할 수 없습니다. 그룹 중첩(nesting)은 지원되지 않습니다.
- **B) 최소 하나의 그룹 필수:** 틀립니다. IAM 사용자는 어떤 그룹에도 속하지 않을 수 있습니다. 그룹 소속은 선택 사항입니다.
- **C) 사용자만 포함 가능:** 정답입니다. IAM 그룹은 오직 IAM 사용자만 포함할 수 있습니다. 다른 그룹이나 IAM 역할(Role)은 포함할 수 없습니다. 이것은 시험에서 자주 출제되는 개념입니다.
- **D) 사용자와 역할 모두 포함:** 틀립니다. IAM 그룹에는 IAM Role을 추가할 수 없습니다. 그룹은 사용자만 멤버로 가질 수 있습니다.

**핵심 개념:** IAM 그룹 특성 - 사용자만 포함 가능, 중첩 불가, 그룹 소속 선택 사항

---

### Q5. A Solutions Architect wants to review which AWS services an IAM user has accessed to apply the least privilege principle. Which tool should they use?

**한글 번역:** Solutions Architect가 최소 권한 원칙을 적용하기 위해 IAM 사용자가 어떤 AWS 서비스에 접근했는지 검토하려고 합니다. 어떤 도구를 사용해야 합니까?

**선지:**
- A) IAM Credentials Report → IAM 자격 증명 보고서
- B) AWS CloudTrail Logs → AWS CloudTrail 로그
- C) IAM Access Advisor → IAM 액세스 어드바이저
- D) AWS Trusted Advisor → AWS Trusted Advisor

**정답:** C

**선지별 해설:**
- **A) IAM Credentials Report:** Credentials Report는 자격 증명 상태(비밀번호, 액세스 키, MFA)를 보여주지만, 어떤 서비스에 접근했는지는 보여주지 않습니다.
- **B) AWS CloudTrail Logs:** CloudTrail은 API 호출의 상세한 로그를 제공하지만, 서비스 접근 요약을 간편하게 보여주는 도구가 아닙니다. 최소 권한 적용을 위한 서비스 접근 확인에는 Access Advisor가 더 적합합니다.
- **C) IAM Access Advisor:** 정답입니다. Access Advisor는 사용자 수준(user-level)의 도구로, 각 IAM 사용자가 마지막으로 접근한 서비스와 접근 시간을 보여줍니다. 이를 통해 사용하지 않는 권한을 식별하고 제거하여 최소 권한 원칙을 적용할 수 있습니다.
- **D) AWS Trusted Advisor:** Trusted Advisor는 비용 최적화, 성능, 보안, 내결함성 등에 대한 전반적인 권장 사항을 제공합니다. 개별 사용자의 서비스 접근 이력을 보여주는 도구가 아닙니다.

**핵심 개념:** IAM Access Advisor - 최소 권한 원칙(Least Privilege) 적용을 위한 서비스 접근 확인 도구

---

### Q6. Which of the following is a valid MFA device option for AWS?

**한글 번역:** 다음 중 AWS에서 유효한 MFA(다중 인증) 디바이스 옵션은 무엇입니까?

**선지:**
- A) SMS text message to a mobile phone → 휴대폰으로의 SMS 문자 메시지
- B) Email verification code → 이메일 인증 코드
- C) U2F security key such as YubiKey → YubiKey와 같은 U2F 보안 키
- D) Biometric fingerprint scanner → 생체 지문 스캐너

**정답:** C

**선지별 해설:**
- **A) SMS 문자 메시지:** AWS IAM에서는 SMS를 MFA 방법으로 지원하지 않습니다. (참고: AWS 루트 계정에서는 과거에 SMS MFA를 지원했지만, IAM 사용자에게는 지원하지 않으며 현재는 권장하지 않습니다.)
- **B) 이메일 인증 코드:** 이메일 인증은 AWS의 MFA 옵션에 포함되지 않습니다. 이메일은 보안 수준이 낮아 MFA로 적합하지 않습니다.
- **C) U2F 보안 키 (YubiKey):** 정답입니다. AWS에서 지원하는 MFA 옵션에는 가상 MFA 디바이스(Google Authenticator, Authy), U2F 보안 키(YubiKey), 하드웨어 TOTP 토큰이 있습니다. YubiKey는 물리적 보안 키로 매우 안전한 MFA 방법입니다.
- **D) 생체 지문 스캐너:** AWS IAM에서 생체 인식을 직접적인 MFA 방법으로 지원하지 않습니다.

**핵심 개념:** AWS MFA 옵션 - 가상 MFA, U2F 보안 키(YubiKey), 하드웨어 TOTP 토큰

---

### Q7. What are the components of an IAM Policy Statement? (Select the REQUIRED components)

**한글 번역:** IAM 정책 Statement의 구성 요소는 무엇입니까? (필수 구성 요소를 선택하세요)

**선지:**
- A) Effect, Action, Resource → Effect, Action, Resource
- B) Sid, Effect, Action, Resource, Condition → Sid, Effect, Action, Resource, Condition
- C) Version, Id, Statement → Version, Id, Statement
- D) Principal, Sid, Condition → Principal, Sid, Condition

**정답:** A

**선지별 해설:**
- **A) Effect, Action, Resource:** 정답입니다. IAM 정책 Statement의 필수 구성 요소는 Effect(허용/거부), Action(수행할 작업), Resource(대상 리소스)입니다. 이 세 가지가 없으면 정책이 유효하지 않습니다.
- **B) Sid, Effect, Action, Resource, Condition:** Sid(Statement ID)와 Condition은 선택적(optional) 요소입니다. 유용하지만 필수는 아닙니다.
- **C) Version, Id, Statement:** Version, Id, Statement는 정책 자체의 최상위 요소이지, Statement 내부의 구성 요소가 아닙니다. Version은 정책 언어 버전이고, Statement는 실제 권한 정의 블록입니다.
- **D) Principal, Sid, Condition:** Principal은 리소스 기반 정책에서 사용되며 모든 정책에 필수는 아닙니다. Sid와 Condition도 선택 사항입니다.

**핵심 개념:** IAM 정책 구조 - Statement 필수 요소: Effect, Action, Resource / 선택 요소: Sid, Principal, Condition

---
