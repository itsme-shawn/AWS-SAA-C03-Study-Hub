# Section 23 - Advanced Identity 연습문제 해설

---

### Q1. A company wants to prevent any IAM user/role in dev accounts from launching EC2 instances in us-west-1. They use AWS Organizations. What is the best approach?

**한글 번역:** 회사가 개발 계정의 모든 IAM 사용자/역할이 us-west-1에서 EC2 인스턴스를 시작하는 것을 방지하고 싶습니다. AWS Organizations를 사용합니다. 가장 좋은 접근 방식은 무엇일까요?

**선지:**
- A) Create IAM policies in each dev account → 각 개발 계정에 IAM 정책 생성
- B) Apply SCP to Development OU denying EC2 in us-west-1 → Development OU에 us-west-1에서 EC2를 거부하는 SCP 적용
- C) Use AWS Config rules → AWS Config 규칙 사용
- D) Create Permission Boundary for all users → 모든 사용자에 대한 Permission Boundary 생성

**정답:** B

**선지별 해설:**
- **A) Create IAM policies in each dev account:** 오답. 각 계정에 개별적으로 IAM 정책을 만드는 것은 가능하지만, 관리가 어렵고 확장성이 없습니다. 새 개발 계정이 추가될 때마다 수동으로 정책을 적용해야 하며, 관리자가 정책을 삭제할 수 있어 보안이 보장되지 않습니다.
- **B) Apply SCP to Development OU:** 정답. SCP(Service Control Policy)는 AWS Organizations에서 OU(Organizational Unit) 또는 개별 계정에 적용할 수 있는 권한 가드레일입니다. Development OU에 SCP를 적용하면 해당 OU의 모든 계정에 일괄 적용되며, 개별 계정의 관리자도 이 제한을 우회할 수 없습니다. 가장 효율적이고 안전한 방법입니다.
- **C) Use AWS Config rules:** 오답. Config 규칙은 비준수 리소스를 감지(detective control)할 수 있지만, 리소스 생성을 차단(preventive control)하지는 않습니다. 인스턴스가 생성된 후에야 비준수를 감지하므로, "방지"라는 요구사항에 맞지 않습니다.
- **D) Permission Boundary for all users:** 오답. Permission Boundary는 IAM 사용자/역할의 최대 권한을 제한하는 기능입니다. 하지만 각 계정에서 모든 사용자/역할에 수동으로 적용해야 하며, 새 사용자가 생성될 때 적용이 누락될 수 있습니다. SCP가 조직 수준에서 일괄 적용되므로 더 효과적입니다.

**핵심 개념:** SCP(Service Control Policy) - Organizations OU 수준 권한 가드레일, 예방적 제어

---

### Q2. A user in Account A needs to scan DynamoDB in Account A and write to S3 in Account B. They must maintain DynamoDB permissions while accessing S3. What is the best approach?

**한글 번역:** 계정 A의 사용자가 계정 A의 DynamoDB를 스캔하고 계정 B의 S3에 쓰기를 해야 합니다. S3에 접근하면서 DynamoDB 권한을 유지해야 합니다. 가장 좋은 접근 방식은 무엇일까요?

**선지:**
- A) Create IAM role in Account B and assume it → 계정 B에서 IAM 역할을 생성하고 위임(assume)
- B) Use resource-based policy (S3 bucket policy) on Account B's bucket → 계정 B의 버킷에 리소스 기반 정책(S3 버킷 정책) 사용
- C) Create cross-account IAM user → 교차 계정 IAM 사용자 생성
- D) Use AWS Organizations consolidated access → AWS Organizations 통합 접근 사용

**정답:** B

**선지별 해설:**
- **A) Create IAM role in Account B and assume it:** 오답. 계정 B의 역할을 위임(AssumeRole)하면 계정 B의 권한을 얻지만, 계정 A의 원래 권한(DynamoDB 접근)을 잃게 됩니다. 역할을 위임하면 해당 역할의 권한만 사용할 수 있기 때문입니다. 문제에서 "DynamoDB 권한을 유지하면서" S3에 접근해야 하므로, 이 방식은 적합하지 않습니다.
- **B) Resource-based policy (S3 bucket policy):** 정답. S3 버킷 정책(리소스 기반 정책)을 사용하면 계정 A의 사용자/역할에 직접 교차 계정 접근 권한을 부여할 수 있습니다. 리소스 기반 정책을 통한 교차 계정 접근에서는 역할을 위임하지 않으므로, 원래 계정의 권한(DynamoDB 접근)을 유지하면서 다른 계정의 리소스에 접근할 수 있습니다.
- **C) Cross-account IAM user:** 오답. 교차 계정 IAM 사용자라는 개념은 AWS에 존재하지 않습니다. IAM 사용자는 특정 계정에 속하며, 다른 계정에서 직접 사용할 수 없습니다.
- **D) AWS Organizations consolidated access:** 오답. AWS Organizations는 통합 결제(Consolidated Billing)를 제공하지만, "통합 접근"이라는 기능은 없습니다. Organizations 자체가 교차 계정 리소스 접근을 자동으로 허용하지 않습니다.

**핵심 개념:** 리소스 기반 정책 vs IAM 역할 위임 - 리소스 기반 정책은 원래 권한을 유지, 역할 위임은 원래 권한을 포기

---

### Q3. A company wants SSO for employees to access multiple AWS accounts and third-party SaaS applications (Salesforce). Which service should they use?

**한글 번역:** 회사가 직원들이 여러 AWS 계정과 서드파티 SaaS 애플리케이션(Salesforce)에 접근할 수 있는 SSO를 원합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon Cognito → Amazon Cognito
- B) AWS IAM with cross-account roles → 교차 계정 역할을 사용한 AWS IAM
- C) AWS IAM Identity Center → AWS IAM Identity Center
- D) AWS Directory Service → AWS Directory Service

**정답:** C

**선지별 해설:**
- **A) Amazon Cognito:** 오답. Cognito는 웹/모바일 애플리케이션의 최종 사용자(고객) 인증을 위한 서비스입니다. 직원의 AWS 계정 접근이나 기업 SSO 용도로는 적합하지 않습니다.
- **B) IAM with cross-account roles:** 오답. 교차 계정 IAM 역할로 여러 계정에 접근할 수 있지만, 중앙 집중식 SSO 포털, 서드파티 SaaS 통합, SAML/OIDC 기반 SSO 등을 제공하지 않습니다. 관리가 복잡하고 사용자 경험이 좋지 않습니다.
- **C) AWS IAM Identity Center:** 정답. IAM Identity Center(구 AWS SSO)는 AWS Organizations의 여러 계정과 서드파티 SaaS 애플리케이션(Salesforce, Microsoft 365 등)에 대한 중앙 집중식 SSO를 제공합니다. 한 번 로그인으로 할당된 모든 계정과 애플리케이션에 접근할 수 있으며, 기존 Active Directory와도 통합할 수 있습니다.
- **D) AWS Directory Service:** 오답. Directory Service는 AWS에서 Active Directory를 관리하는 서비스입니다. SSO 기능 자체를 제공하지는 않으며, IAM Identity Center의 ID 소스로 사용될 수 있지만 단독으로 SSO를 구현하지는 못합니다.

**핵심 개념:** AWS IAM Identity Center - 다중 계정/SaaS SSO, 중앙 집중식 접근 관리

---

### Q4. A company has an on-premises Active Directory. They want users to authenticate against it for AWS resources. They do NOT want to manage AD infrastructure in AWS. Which Directory Service option should they use?

**한글 번역:** 회사가 온프레미스 Active Directory를 보유하고 있습니다. 사용자가 이를 통해 AWS 리소스에 인증하기를 원합니다. AWS에서 AD 인프라를 관리하고 싶지 않습니다. 어떤 Directory Service 옵션을 사용해야 할까요?

**선지:**
- A) AWS Managed Microsoft AD → AWS 관리형 Microsoft AD
- B) AD Connector → AD Connector
- C) Simple AD → Simple AD
- D) Amazon Cognito User Pool → Amazon Cognito 사용자 풀

**정답:** B

**선지별 해설:**
- **A) AWS Managed Microsoft AD:** 오답. Managed Microsoft AD는 AWS에서 완전한 Microsoft Active Directory를 실행합니다. 온프레미스 AD와 신뢰(trust) 관계를 설정할 수 있지만, AWS에서 별도의 AD 인프라를 관리해야 합니다. 문제에서 "AWS에서 AD 인프라를 관리하고 싶지 않다"고 했으므로 적합하지 않습니다.
- **B) AD Connector:** 정답. AD Connector는 디렉터리 요청을 온프레미스 Active Directory로 프록시(전달)하는 서비스입니다. AWS에 별도의 AD를 생성하지 않으며, 모든 인증 요청을 기존 온프레미스 AD로 리다이렉트합니다. AWS에서 AD 인프라를 관리할 필요가 없으면서도 온프레미스 AD를 활용할 수 있습니다.
- **C) Simple AD:** 오답. Simple AD는 Samba 4 기반의 독립형 디렉터리로, AWS에서 새로운 디렉터리를 생성합니다. 온프레미스 AD와 통합되지 않으며, AWS에서 디렉터리 인프라를 운영해야 합니다.
- **D) Amazon Cognito User Pool:** 오답. Cognito User Pool은 웹/모바일 앱의 사용자 인증을 위한 서비스입니다. 온프레미스 Active Directory와 직접 통합하여 AWS 리소스 접근을 관리하는 용도로는 적합하지 않습니다.

**핵심 개념:** AD Connector - 온프레미스 AD로 프록시, AWS에 AD 인프라 불필요

---

### Q5. A company allows developers to create their own IAM policies. They want to ensure developers cannot escalate their privileges to admin access. Which feature should they use?

**한글 번역:** 회사가 개발자들이 자체 IAM 정책을 생성하도록 허용합니다. 개발자가 관리자 접근 권한으로 권한을 상승시킬 수 없도록 하려고 합니다. 어떤 기능을 사용해야 할까요?

**선지:**
- A) SCP → SCP
- B) IAM Permission Boundaries → IAM Permission Boundaries
- C) AWS Config Rules → AWS Config 규칙
- D) IAM Access Analyzer → IAM Access Analyzer

**정답:** B

**선지별 해설:**
- **A) SCP:** 오답. SCP(Service Control Policy)는 AWS Organizations에서 계정 수준의 권한을 제한합니다. 개별 개발자가 자신의 권한을 상승시키는 것을 방지하는 세밀한 제어에는 Permission Boundary가 더 적합합니다. SCP는 전체 계정에 적용되므로 개별 사용자의 권한 상승 방지에 직접적이지 않습니다.
- **B) IAM Permission Boundaries:** 정답. Permission Boundary는 IAM 사용자/역할이 가질 수 있는 최대 권한을 정의합니다. 개발자에게 IAM 정책 생성 권한을 부여하되, Permission Boundary를 설정하면 개발자가 아무리 넓은 권한의 정책을 만들어도 Permission Boundary에서 허용한 범위를 초과할 수 없습니다. 유효 권한 = IAM 정책 ∩ Permission Boundary입니다.
- **C) AWS Config Rules:** 오답. Config Rules는 리소스 구성의 규정 준수를 감지하는 기능입니다. IAM 정책 생성을 실시간으로 차단하거나 권한 상승을 방지하는 예방적 제어(preventive control)가 아닙니다.
- **D) IAM Access Analyzer:** 오답. Access Analyzer는 외부 접근이 가능한 리소스를 식별하거나 IAM 정책을 분석하는 도구입니다. 유용한 분석 도구이지만, 권한 상승을 능동적으로 방지하는 기능은 아닙니다.

**핵심 개념:** IAM Permission Boundaries - 최대 권한 제한, 권한 상승(privilege escalation) 방지

---

### Q6. An organization wants to restrict S3 bucket access to only accounts within their AWS Organization. Which IAM condition key should they use in the bucket policy?

**한글 번역:** 조직이 S3 버킷 접근을 AWS Organization 내의 계정으로만 제한하고 싶습니다. 버킷 정책에서 어떤 IAM 조건 키를 사용해야 할까요?

**선지:**
- A) aws:SourceIp → aws:SourceIp
- B) aws:RequestedRegion → aws:RequestedRegion
- C) aws:PrincipalOrgID → aws:PrincipalOrgID
- D) aws:MultiFactorAuthPresent → aws:MultiFactorAuthPresent

**정답:** C

**선지별 해설:**
- **A) aws:SourceIp:** 오답. SourceIp는 요청의 소스 IP 주소를 기반으로 접근을 제한합니다. Organization 멤버십과는 관련이 없으며, IP 주소로 Organization 소속 여부를 판단할 수 없습니다.
- **B) aws:RequestedRegion:** 오답. RequestedRegion은 AWS API 호출이 대상으로 하는 리전을 기반으로 접근을 제한합니다. 예를 들어, 특정 리전에서만 리소스 생성을 허용하는 데 사용됩니다. Organization 멤버십과는 관련이 없습니다.
- **C) aws:PrincipalOrgID:** 정답. aws:PrincipalOrgID 조건 키는 요청을 보내는 주체(principal)가 특정 AWS Organization에 속하는지 확인합니다. S3 버킷 정책에서 이 조건을 사용하면, 같은 Organization 내의 모든 계정에서의 접근만 허용하고 외부 계정의 접근을 차단할 수 있습니다. 새 계정이 Organization에 추가되면 자동으로 접근이 허용됩니다.
- **D) aws:MultiFactorAuthPresent:** 오답. MultiFactorAuthPresent는 요청이 MFA 인증을 통해 이루어졌는지 확인합니다. Organization 멤버십과는 관련이 없습니다.

**핵심 개념:** aws:PrincipalOrgID 조건 키 - Organization 내 계정으로만 접근 제한

---

### Q7. A company is setting up a multi-account environment. They need automated provisioning with preventive controls (blocking) and detective controls (identifying non-compliant resources). Which service should they use?

**한글 번역:** 회사가 다중 계정 환경을 설정하고 있습니다. 예방적 제어(차단)와 탐지적 제어(비준수 리소스 식별)를 갖춘 자동화된 프로비저닝이 필요합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) AWS Organizations with SCPs only → SCP만 사용하는 AWS Organizations
- B) AWS Control Tower → AWS Control Tower
- C) AWS Config with CloudFormation → CloudFormation을 사용한 AWS Config
- D) AWS IAM Identity Center → AWS IAM Identity Center

**정답:** B

**선지별 해설:**
- **A) AWS Organizations with SCPs only:** 오답. Organizations와 SCP는 예방적 제어를 제공하지만, 탐지적 제어(비준수 리소스 식별)는 제공하지 않습니다. 또한 자동화된 계정 프로비저닝이나 가드레일 자동 적용 기능이 없습니다. Control Tower가 Organizations 위에 구축되어 이러한 기능을 모두 제공합니다.
- **B) AWS Control Tower:** 정답. Control Tower는 다중 계정 AWS 환경을 설정하고 관리하는 서비스입니다. Account Factory를 통해 새 계정을 자동 프로비저닝하며, 가드레일(Guardrails)을 통해 예방적 제어(SCP 기반, 차단)와 탐지적 제어(Config Rules 기반, 비준수 감지)를 모두 제공합니다. Landing Zone을 자동으로 구성하여 모범 사례에 맞는 다중 계정 환경을 쉽게 만들 수 있습니다.
- **C) AWS Config with CloudFormation:** 오답. Config는 탐지적 제어를, CloudFormation은 인프라 자동화를 제공하지만, 예방적 제어(차단)를 직접 제공하지 않습니다. 또한 이 조합을 직접 구성하면 복잡하며, Control Tower가 이 모든 것을 통합하여 제공합니다.
- **D) AWS IAM Identity Center:** 오답. IAM Identity Center는 SSO(Single Sign-On) 서비스입니다. 접근 관리를 제공하지만, 계정 프로비저닝, 예방적/탐지적 제어와 같은 거버넌스 기능은 제공하지 않습니다.

**핵심 개념:** AWS Control Tower - 다중 계정 거버넌스, 예방적/탐지적 가드레일, Account Factory

---
