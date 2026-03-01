# Section 24 - Security & Encryption 연습문제 해설

---

### Q1. A company needs to encrypt data at rest with keys they fully control. They need FIPS 140-2 Level 3 compliance and dedicated hardware. Which service should they use?

**한글 번역:** 회사가 완전히 통제하는 키로 저장 데이터를 암호화해야 합니다. FIPS 140-2 Level 3 규정 준수와 전용 하드웨어가 필요합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) AWS KMS with Customer Managed Keys → 고객 관리형 키를 사용한 AWS KMS
- B) AWS CloudHSM → AWS CloudHSM
- C) AWS KMS with AWS Managed Keys → AWS 관리형 키를 사용한 AWS KMS
- D) SSE-S3 → SSE-S3

**정답:** B

**선지별 해설:**
- **A) KMS with Customer Managed Keys:** 오답. KMS CMK(Customer Managed Keys)는 키에 대한 높은 수준의 제어를 제공하지만, FIPS 140-2 Level 2까지만 인증되어 있습니다(Level 3 아님). 또한 KMS는 다중 테넌트 환경에서 운영되므로 "전용 하드웨어"라는 요구사항을 충족하지 못합니다.
- **B) AWS CloudHSM:** 정답. CloudHSM은 AWS 클라우드에서 전용 하드웨어 보안 모듈(HSM)을 제공합니다. FIPS 140-2 Level 3 인증을 받았으며, 고객이 키를 완전히 제어합니다(AWS도 키에 접근 불가). 전용 하드웨어에서 실행되므로 모든 요구사항을 충족합니다.
- **C) KMS with AWS Managed Keys:** 오답. AWS Managed Keys는 AWS가 생성하고 관리하는 키입니다. 고객이 키를 "완전히 통제"할 수 없으며, 키 순환 정책이나 키 정책을 직접 관리할 수 없습니다. FIPS 140-2 Level 3도 아닙니다.
- **D) SSE-S3:** 오답. SSE-S3는 S3가 관리하는 키로 서버 측 암호화를 수행합니다. 고객이 키를 제어할 수 없으며, S3에 특화된 암호화 옵션입니다. FIPS 140-2 Level 3이나 전용 하드웨어와는 관련이 없습니다.

**핵심 개념:** AWS CloudHSM - 전용 HSM, FIPS 140-2 Level 3, 고객이 키 완전 제어

---

### Q2. A company wants to share an encrypted AMI with another account. The AMI is encrypted with a Customer Managed KMS Key. What steps are required? (Select TWO)

**한글 번역:** 회사가 암호화된 AMI를 다른 계정과 공유하려고 합니다. AMI는 고객 관리형 KMS 키로 암호화되어 있습니다. 어떤 단계가 필요할까요? (2개 선택)

**선지:**
- A) Add Launch Permission for target account on AMI → AMI에 대상 계정의 시작 권한 추가
- B) Share AWS Managed KMS Key with target account → AWS 관리형 KMS 키를 대상 계정과 공유
- C) Share Customer Managed KMS Key via KMS Key Policy → KMS 키 정책을 통해 고객 관리형 KMS 키 공유
- D) Create unencrypted copy and share it → 비암호화 복사본을 생성하고 공유
- E) Target account needs no additional permissions → 대상 계정에 추가 권한이 필요 없음

**정답:** A, C

**선지별 해설:**
- **A) Add Launch Permission for target account on AMI:** 정답. AMI를 다른 계정과 공유하려면 해당 AMI에 대상 계정의 시작 권한(Launch Permission)을 추가해야 합니다. 이를 통해 대상 계정이 AMI를 사용하여 EC2 인스턴스를 시작할 수 있습니다.
- **B) Share AWS Managed KMS Key with target account:** 오답. 문제에서 AMI는 "고객 관리형 KMS 키(Customer Managed Key)"로 암호화되어 있다고 명시합니다. AWS Managed Key는 다른 계정과 공유할 수 없으며, 여기서는 해당되지 않습니다.
- **C) Share Customer Managed KMS Key via KMS Key Policy:** 정답. 암호화된 AMI를 공유할 때, 대상 계정이 AMI의 암호화에 사용된 KMS 키에 접근할 수 있어야 합니다. KMS 키 정책을 수정하여 대상 계정에 kms:Decrypt, kms:CreateGrant 등의 권한을 부여해야 합니다. 그래야 대상 계정이 AMI의 데이터를 복호화할 수 있습니다.
- **D) Create unencrypted copy and share it:** 오답. 보안상 암호화를 제거하는 것은 바람직하지 않습니다. 또한 이 방법은 불필요한 추가 단계이며, 규정 준수 요구사항을 위반할 수 있습니다.
- **E) Target account needs no additional permissions:** 오답. 대상 계정은 KMS 키에 대한 접근 권한이 필요합니다. 권한 없이는 암호화된 AMI를 사용할 수 없습니다.

**핵심 개념:** 암호화된 AMI 공유 - AMI Launch Permission + KMS Key Policy 공유 필요

---

### Q3. A company wants to protect a web application behind an ALB from SQL injection and XSS attacks. They also need to block requests from specific countries. Which service should they use?

**한글 번역:** 회사가 ALB 뒤에 있는 웹 애플리케이션을 SQL 인젝션과 XSS 공격으로부터 보호하고 싶습니다. 또한 특정 국가의 요청을 차단해야 합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) AWS Shield Standard → AWS Shield Standard
- B) AWS Network Firewall → AWS Network Firewall
- C) AWS WAF → AWS WAF
- D) Security Groups → 보안 그룹

**정답:** C

**선지별 해설:**
- **A) AWS Shield Standard:** 오답. Shield Standard는 모든 AWS 고객에게 자동으로 제공되는 DDoS 보호 서비스입니다. Layer 3/4 DDoS 공격을 방어하지만, SQL 인젝션, XSS 같은 Layer 7(애플리케이션 계층) 공격이나 지역 기반 차단 기능은 제공하지 않습니다.
- **B) AWS Network Firewall:** 오답. Network Firewall은 VPC 수준의 네트워크 보안 서비스로, IPS/IDS 기능을 제공합니다. 하지만 SQL 인젝션, XSS 같은 웹 애플리케이션 공격 방어와 지역 기반 차단에는 WAF가 더 직접적이고 적합합니다.
- **C) AWS WAF:** 정답. WAF(Web Application Firewall)는 웹 애플리케이션을 SQL 인젝션, XSS 등의 일반적인 웹 공격으로부터 보호합니다. ALB, CloudFront, API Gateway에 연결할 수 있으며, 관리형 규칙 그룹(SQL 인젝션, XSS 방어)과 지리적 일치(Geo Match) 조건을 사용하여 특정 국가의 요청을 차단할 수 있습니다.
- **D) Security Groups:** 오답. 보안 그룹은 인스턴스 수준의 방화벽으로, IP 주소와 포트 기반의 접근 제어만 가능합니다. SQL 인젝션이나 XSS와 같은 애플리케이션 계층 공격을 감지하거나 차단할 수 없으며, 국가 기반 차단 기능도 없습니다.

**핵심 개념:** AWS WAF - 웹 애플리케이션 방화벽, SQL 인젝션/XSS 방어, 지리적 차단

---

### Q4. A company experiences DDoS attacks frequently. They need 24/7 DDoS experts, automatic Layer 7 mitigation, and protection against billing spikes from DDoS. Which solution should they use?

**한글 번역:** 회사가 DDoS 공격을 자주 받습니다. 24/7 DDoS 전문가, 자동 Layer 7 완화, DDoS로 인한 요금 급증 보호가 필요합니다. 어떤 솔루션을 사용해야 할까요?

**선지:**
- A) AWS Shield Standard with AWS WAF → AWS WAF와 함께 사용하는 AWS Shield Standard
- B) AWS Shield Advanced → AWS Shield Advanced
- C) AWS Firewall Manager → AWS Firewall Manager
- D) Amazon GuardDuty → Amazon GuardDuty

**정답:** B

**선지별 해설:**
- **A) Shield Standard with AWS WAF:** 오답. Shield Standard는 기본 DDoS 보호를 무료로 제공하고, WAF는 Layer 7 규칙 기반 보호를 제공합니다. 하지만 이 조합은 24/7 DDoS 전문가 팀(Shield Response Team/SRT) 접근, DDoS 비용 보호(cost protection), 자동 Layer 7 완화 기능을 제공하지 않습니다.
- **B) AWS Shield Advanced:** 정답. Shield Advanced는 향상된 DDoS 보호를 제공하며, 다음 기능을 포함합니다: (1) AWS Shield Response Team(SRT)에 24/7 접근하여 DDoS 전문가의 지원을 받을 수 있습니다. (2) 자동 애플리케이션 계층(Layer 7) DDoS 완화 기능이 있습니다. (3) DDoS 공격으로 인한 비용 급증에 대해 비용 보호(DDoS cost protection)를 제공합니다. 모든 요구사항을 충족합니다.
- **C) AWS Firewall Manager:** 오답. Firewall Manager는 여러 계정에 걸쳐 WAF, Shield Advanced, 보안 그룹 등의 보안 규칙을 중앙에서 관리하는 서비스입니다. DDoS 보호 자체를 제공하는 것이 아니라 보안 규칙의 관리 도구입니다.
- **D) Amazon GuardDuty:** 오답. GuardDuty는 위협 탐지 서비스로, VPC Flow Logs, DNS 로그, CloudTrail 이벤트 등을 분석하여 악성 활동을 감지합니다. DDoS 완화 기능이나 DDoS 전문가 접근, 비용 보호를 제공하지 않습니다.

**핵심 개념:** AWS Shield Advanced - 24/7 SRT 접근, 자동 Layer 7 완화, DDoS 비용 보호

---

### Q5. A company needs to automatically detect if S3 buckets contain PII (credit card numbers, SSNs). Which service should they use?

**한글 번역:** 회사가 S3 버킷에 PII(신용카드 번호, 사회보장번호)가 포함되어 있는지 자동으로 감지해야 합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon GuardDuty → Amazon GuardDuty
- B) Amazon Inspector → Amazon Inspector
- C) Amazon Macie → Amazon Macie
- D) AWS Config → AWS Config

**정답:** C

**선지별 해설:**
- **A) Amazon GuardDuty:** 오답. GuardDuty는 위협 탐지 서비스로, 악성 활동(비정상적인 API 호출, 의심스러운 네트워크 트래픽 등)을 감지합니다. S3 버킷의 데이터 내용을 스캔하여 PII를 탐지하는 기능은 없습니다. (GuardDuty S3 Protection은 S3에 대한 의심스러운 접근 패턴을 감지하는 것이지, 데이터 내용을 분석하지 않습니다.)
- **B) Amazon Inspector:** 오답. Inspector는 EC2 인스턴스, Lambda 함수, ECR 컨테이너 이미지의 소프트웨어 취약점과 네트워크 노출을 자동으로 스캔합니다. S3 데이터 내용의 PII 감지와는 관련이 없습니다.
- **C) Amazon Macie:** 정답. Macie는 S3에 저장된 민감한 데이터를 자동으로 발견, 분류, 보호하는 서비스입니다. ML과 패턴 매칭을 사용하여 PII(신용카드 번호, 사회보장번호, 이메일 주소, API 키 등)를 자동으로 탐지합니다. S3 버킷의 데이터를 스캔하고 민감 데이터가 포함된 객체를 식별하여 보고합니다.
- **D) AWS Config:** 오답. Config는 AWS 리소스의 구성을 추적하고 규정 준수를 평가합니다. S3 버킷의 구성(암호화 설정, 퍼블릭 접근 등)을 확인할 수 있지만, 버킷에 저장된 데이터 내용을 분석하여 PII를 감지하지는 않습니다.

**핵심 개념:** Amazon Macie - S3 민감 데이터(PII) 자동 탐지 및 분류

---

### Q6. A company stores secrets for RDS connections. They need automatic rotation every 30 days. Which service should they use?

**한글 번역:** 회사가 RDS 연결을 위한 시크릿을 저장합니다. 30일마다 자동 순환이 필요합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) AWS SSM Parameter Store Advanced → AWS SSM Parameter Store Advanced
- B) AWS Secrets Manager → AWS Secrets Manager
- C) AWS KMS → AWS KMS
- D) AWS CloudHSM → AWS CloudHSM

**정답:** B

**선지별 해설:**
- **A) SSM Parameter Store Advanced:** 오답. Parameter Store Advanced는 시크릿을 저장할 수 있고 만료 정책을 설정할 수 있지만, 내장된 자동 시크릿 순환(automatic rotation) 기능이 없습니다. 순환을 구현하려면 Lambda 함수를 직접 작성해야 합니다. Secrets Manager처럼 RDS와의 네이티브 통합 순환을 제공하지 않습니다.
- **B) AWS Secrets Manager:** 정답. Secrets Manager는 시크릿(데이터베이스 자격 증명, API 키 등)을 저장하고 자동으로 순환하는 서비스입니다. RDS, Aurora, Redshift, DocumentDB에 대한 내장 순환 기능을 제공하며, 순환 주기를 설정하면 자동으로 Lambda 함수가 실행되어 데이터베이스 비밀번호를 변경합니다. 30일 자동 순환 요구사항에 완벽히 부합합니다.
- **C) AWS KMS:** 오답. KMS는 암호화 키를 생성하고 관리하는 서비스입니다. 데이터베이스 비밀번호와 같은 시크릿을 저장하거나 순환하는 기능이 없습니다. KMS 키의 자동 순환은 가능하지만, 이는 암호화 키의 순환이지 시크릿(자격 증명)의 순환이 아닙니다.
- **D) AWS CloudHSM:** 오답. CloudHSM은 전용 하드웨어 보안 모듈로, 암호화 키를 관리합니다. 시크릿 저장이나 자동 순환 기능을 제공하지 않습니다.

**핵심 개념:** AWS Secrets Manager - 시크릿 자동 순환, RDS 네이티브 통합

---

### Q7. A company uses an edge-optimized API Gateway and needs a TLS certificate from ACM. In which region must the ACM certificate be created?

**한글 번역:** 회사가 엣지 최적화 API Gateway를 사용하며 ACM에서 TLS 인증서가 필요합니다. ACM 인증서를 어느 리전에서 생성해야 할까요?

**선지:**
- A) Same region as API Gateway → API Gateway와 같은 리전
- B) us-east-1 → us-east-1
- C) Any region (ACM is global) → 아무 리전 (ACM은 글로벌)
- D) Region closest to users → 사용자와 가장 가까운 리전

**정답:** B

**선지별 해설:**
- **A) Same region as API Gateway:** 오답. 엣지 최적화 API Gateway의 경우, API Gateway 리소스가 배포된 리전이 아닌 us-east-1에서 인증서를 생성해야 합니다. (참고: Regional API Gateway의 경우에는 API Gateway와 같은 리전에서 인증서를 생성합니다.)
- **B) us-east-1:** 정답. 엣지 최적화(Edge-Optimized) API Gateway는 내부적으로 CloudFront 배포를 사용합니다. CloudFront와 마찬가지로, 엣지 최적화 API Gateway의 커스텀 도메인에 사용하는 ACM 인증서는 반드시 us-east-1(버지니아 북부) 리전에서 생성해야 합니다. 이는 CloudFront가 us-east-1의 ACM 인증서만 지원하기 때문입니다.
- **C) Any region (ACM is global):** 오답. ACM은 글로벌 서비스가 아닙니다. ACM 인증서는 리전별로 생성되며, 해당 리전의 리소스에서만 사용할 수 있습니다. CloudFront/엣지 최적화 API Gateway의 경우 반드시 us-east-1에서 생성해야 합니다.
- **D) Region closest to users:** 오답. 사용자 위치와 인증서 리전은 관련이 없습니다. 엣지 최적화 API Gateway는 CloudFront를 통해 전 세계 엣지 로케이션에서 서비스되지만, 인증서는 us-east-1에서만 생성하면 됩니다.

**핵심 개념:** Edge-Optimized API Gateway + ACM = us-east-1 필수 (CloudFront와 동일)

---

### Q8. A company wants to manage WAF rules, Shield Advanced, and security groups across all accounts in an AWS Organization. New accounts should automatically inherit these settings. Which service should they use?

**한글 번역:** 회사가 AWS Organization의 모든 계정에서 WAF 규칙, Shield Advanced, 보안 그룹을 관리하고 싶습니다. 새 계정이 자동으로 이러한 설정을 상속해야 합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) AWS Config → AWS Config
- B) AWS WAF with cross-account rules → 교차 계정 규칙을 사용한 AWS WAF
- C) AWS Firewall Manager → AWS Firewall Manager
- D) AWS Organizations SCPs → AWS Organizations SCP

**정답:** C

**선지별 해설:**
- **A) AWS Config:** 오답. AWS Config는 리소스 구성을 추적하고 규정 준수를 평가하는 서비스입니다. WAF 규칙, Shield Advanced, 보안 그룹을 여러 계정에 일괄 배포하고 관리하는 기능은 없습니다.
- **B) WAF with cross-account rules:** 오답. WAF에는 "교차 계정 규칙"이라는 네이티브 기능이 없습니다. WAF 규칙은 개별 계정에서 관리되며, 여러 계정에 자동으로 배포하는 기능이 내장되어 있지 않습니다.
- **C) AWS Firewall Manager:** 정답. Firewall Manager는 AWS Organizations와 통합되어 여러 계정과 리소스에 걸쳐 보안 규칙을 중앙에서 관리하는 서비스입니다. WAF 규칙, Shield Advanced 보호, 보안 그룹, Network Firewall 정책 등을 모든 계정에 일괄 적용할 수 있습니다. 새 계정이 Organization에 추가되면 자동으로 보안 정책이 적용됩니다.
- **D) AWS Organizations SCPs:** 오답. SCP는 계정의 최대 권한을 제한하는 정책입니다. WAF 규칙이나 Shield Advanced 보호를 배포하거나 보안 그룹을 관리하는 기능이 아닙니다. SCP는 "무엇을 할 수 없는지"를 정의하지, 보안 서비스 설정을 자동 배포하지 않습니다.

**핵심 개념:** AWS Firewall Manager - 다중 계정 보안 정책 중앙 관리 (WAF, Shield, 보안 그룹)

---
