# Section 12 - S3 Security 연습문제 해설

---

### Q1. A company needs to encrypt objects in S3 while maintaining full control over encryption keys and being able to audit key usage in CloudTrail. Which encryption method?

**한글 번역:** 회사가 S3에서 객체를 암호화하면서 암호화 키에 대한 완전한 제어권을 유지하고, CloudTrail에서 키 사용을 감사할 수 있어야 합니다. 어떤 암호화 방법을 사용해야 합니까?

**선지:**
- A) SSE-S3 → SSE-S3 (S3 관리형 키)
- B) SSE-KMS → SSE-KMS (KMS 관리형 키)
- C) SSE-C → SSE-C (고객 제공 키)
- D) Client-Side Encryption → 클라이언트 측 암호화

**정답:** B

**선지별 해설:**
- **A) SSE-S3:** SSE-S3는 AWS가 키를 완전히 관리하며, 사용자는 키에 대한 제어권이 없습니다. CloudTrail에서 개별 키 사용을 감사할 수 없습니다. 가장 간단하지만 키 제어 요구사항을 충족하지 못합니다.
- **B) SSE-KMS (정답):** SSE-KMS는 AWS KMS에서 관리되는 키를 사용합니다. 사용자가 CMK(Customer Managed Key)를 생성하여 키 정책, 교체 주기 등을 제어할 수 있습니다. 모든 키 사용(암호화/복호화)이 CloudTrail에 기록되어 감사가 가능합니다. 키 제어 + 감사 요구사항을 모두 충족합니다.
- **C) SSE-C:** SSE-C는 고객이 직접 암호화 키를 제공하고 관리합니다. 키 제어는 가능하지만, 키가 AWS에 저장되지 않으므로 CloudTrail에서 키 사용 감사가 불가능합니다. 키 관리 부담도 큽니다.
- **D) Client-Side Encryption:** 클라이언트 측 암호화는 데이터가 S3로 전송되기 전에 클라이언트에서 암호화합니다. 완전한 키 제어는 가능하지만, CloudTrail을 통한 AWS 측 키 사용 감사가 불가능합니다.

**핵심 개념:** SSE-KMS — 키 제어(CMK) + CloudTrail 감사 = SSE-KMS

---

### Q2. A company uses SSE-KMS and is experiencing throttling during peak uploads. KMS quota being exceeded. What are TWO solutions?

**한글 번역:** 회사가 SSE-KMS를 사용 중이며, 피크 업로드 시 스로틀링을 경험하고 있습니다. KMS 할당량이 초과되고 있습니다. 두 가지 해결책은 무엇입니까? (2개 선택)

**선지:**
- A) Switch to SSE-S3 → SSE-S3로 전환한다
- B) Request a KMS quota increase → KMS 할당량 증가를 요청한다
- C) Enable S3 Transfer Acceleration → S3 Transfer Acceleration을 활성화한다
- D) Use S3 Byte-Range Fetches → S3 Byte-Range Fetches를 사용한다
- E) Implement exponential backoff → 지수 백오프를 구현한다

**정답:** A, B

**선지별 해설:**
- **A) SSE-S3로 전환 (정답):** SSE-S3는 S3가 자체적으로 키를 관리하므로 KMS API 호출이 발생하지 않습니다. KMS 할당량 문제를 완전히 해결합니다. 다만 키 제어와 CloudTrail 감사 기능을 포기해야 합니다. KMS 감사가 필수가 아니라면 효과적인 해결책입니다.
- **B) KMS 할당량 증가 요청 (정답):** AWS Service Quotas를 통해 KMS API 호출 할당량(초당 요청 수)을 증가시킬 수 있습니다. SSE-KMS를 계속 사용하면서 스로틀링을 해결할 수 있습니다. 리전에 따라 5,500~30,000 요청/초까지 증가 가능합니다.
- **C) Transfer Acceleration:** Transfer Acceleration은 업로드 전송 속도를 높이지만, KMS API 호출 할당량 문제와는 무관합니다. 오히려 더 빠른 업로드로 KMS 호출이 더 집중될 수 있습니다.
- **D) Byte-Range Fetches:** Byte-Range Fetches는 다운로드(GET) 최적화 기능이며, 업로드 시 KMS 스로틀링과는 관련이 없습니다.
- **E) 지수 백오프:** 지수 백오프는 재시도 전략으로 일시적 오류를 완화할 수 있지만, 근본적인 할당량 문제를 해결하지 못합니다. 스로틀링이 지속적으로 발생하면 백오프만으로는 부족합니다.

**핵심 개념:** SSE-KMS 스로틀링 — KMS 할당량 증가 요청 또는 SSE-S3 전환으로 해결

---

### Q3. Two S3 static websites. First website makes JavaScript requests to second. Users getting cross-origin errors. What to configure?

**한글 번역:** 두 개의 S3 정적 웹사이트가 있습니다. 첫 번째 웹사이트가 두 번째 웹사이트에 JavaScript 요청을 보냅니다. 사용자가 교차 오리진(cross-origin) 오류를 겪고 있습니다. 무엇을 구성해야 합니까?

**선지:**
- A) Enable versioning on both → 두 버킷 모두 버전 관리를 활성화한다
- B) Configure CORS headers on the second S3 bucket → 두 번째 S3 버킷에 CORS 헤더를 구성한다
- C) Create an S3 bucket policy for cross-account → 교차 계정용 S3 버킷 정책을 생성한다
- D) Enable S3 Transfer Acceleration on both → 두 버킷 모두 Transfer Acceleration을 활성화한다

**정답:** B

**선지별 해설:**
- **A) 버전 관리 활성화:** 버전 관리는 객체의 여러 버전을 관리하는 기능으로, CORS 오류와는 전혀 관련이 없습니다.
- **B) 두 번째 버킷에 CORS 구성 (정답):** CORS(Cross-Origin Resource Sharing)는 브라우저가 한 오리진에서 다른 오리진으로 리소스를 요청할 때 필요한 보안 메커니즘입니다. 요청을 받는 쪽(두 번째 버킷)에서 CORS 헤더를 설정하여 첫 번째 웹사이트의 오리진을 허용해야 합니다. `AllowedOrigins`, `AllowedMethods`, `AllowedHeaders`를 구성합니다.
- **C) 교차 계정 버킷 정책:** 교차 계정 접근은 IAM/버킷 정책의 문제이며, 브라우저의 CORS 오류와는 다릅니다. CORS는 브라우저 보안 정책이고, 버킷 정책은 AWS 접근 제어입니다.
- **D) Transfer Acceleration:** Transfer Acceleration은 데이터 전송 속도를 높이는 기능으로, CORS 오류 해결과는 무관합니다.

**핵심 개념:** S3 CORS — 교차 오리진 요청은 대상 버킷에서 CORS 헤더를 구성하여 허용

---

### Q4. A financial services company must store regulatory records in S3 for 7 years. No user including root user should be able to delete or modify during retention. Which configuration?

**한글 번역:** 금융 서비스 회사가 규제 기록을 S3에 7년간 저장해야 합니다. 보존 기간 동안 루트 사용자를 포함한 어떤 사용자도 삭제하거나 수정할 수 없어야 합니다. 어떤 구성을 사용해야 합니까?

**선지:**
- A) S3 Object Lock with Governance mode → Governance 모드의 S3 Object Lock
- B) S3 Object Lock with Compliance mode → Compliance 모드의 S3 Object Lock
- C) S3 Glacier Vault Lock → S3 Glacier Vault Lock
- D) S3 bucket policy denying delete actions → 삭제 작업을 거부하는 S3 버킷 정책

**정답:** B

**선지별 해설:**
- **A) Governance 모드:** Governance 모드는 대부분의 사용자가 객체를 삭제/수정하지 못하도록 보호하지만, 특별한 권한(`s3:BypassGovernanceRetention`)이 있는 사용자는 보존을 우회할 수 있습니다. 루트 사용자도 우회 가능하므로 요구사항을 충족하지 못합니다.
- **B) Compliance 모드 (정답):** Compliance 모드는 가장 엄격한 보호를 제공합니다. 보존 기간 동안 루트 사용자를 포함한 어떤 사용자도 객체를 삭제하거나 보존 기간을 단축할 수 없습니다. AWS 계정 자체를 삭제해도 보존됩니다. 규제 준수(compliance) 요구사항에 적합합니다.
- **C) Glacier Vault Lock:** Glacier Vault Lock은 Glacier 볼트에 대한 잠금 정책으로, S3 버킷이 아닌 Glacier 전용입니다. S3에 저장하라는 요구사항과 맞지 않습니다. (다만 규제 아카이브에는 적합한 대안입니다.)
- **D) 버킷 정책으로 삭제 거부:** 버킷 정책은 루트 사용자가 변경할 수 있습니다. 루트가 정책을 수정하여 삭제를 허용할 수 있으므로, "루트도 삭제 불가"라는 요구사항을 충족하지 못합니다.

**핵심 개념:** S3 Object Lock Compliance Mode — 루트 사용자도 우회할 수 없는 불변 보존

---

### Q5. A company wants to allow a partner to temporarily upload files to a specific path in their private S3 bucket without creating IAM users. Which solution?

**한글 번역:** 회사가 IAM 사용자를 생성하지 않고 파트너에게 프라이빗 S3 버킷의 특정 경로에 임시로 파일을 업로드할 수 있도록 허용하려고 합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) Create a bucket policy allowing partner's account → 파트너 계정을 허용하는 버킷 정책을 생성한다
- B) Generate a pre-signed URL for PUT operations → PUT 작업을 위한 사전 서명된 URL을 생성한다
- C) Make the S3 bucket public temporarily → S3 버킷을 임시로 퍼블릭으로 만든다
- D) Create an S3 Access Point for the partner → 파트너용 S3 액세스 포인트를 생성한다

**정답:** B

**선지별 해설:**
- **A) 파트너 계정 허용 버킷 정책:** 버킷 정책으로 교차 계정 접근을 허용할 수 있지만, 이는 "임시" 접근이 아닌 영구적 설정입니다. 또한 파트너가 AWS 계정을 가지고 있어야 합니다. "IAM 사용자를 생성하지 않고"라는 조건에 부합하지만, 임시성이 부족합니다.
- **B) Pre-Signed URL for PUT (정답):** Pre-Signed URL은 버킷 소유자의 자격 증명을 사용하여 생성되며, 만료 시간을 설정할 수 있어 임시 접근을 제공합니다. 특정 경로(키)에 대한 PUT 작업으로 생성하면, 파트너는 AWS 계정이나 IAM 자격 증명 없이도 해당 URL로 파일을 업로드할 수 있습니다.
- **C) 버킷을 퍼블릭으로 변경:** 버킷을 퍼블릭으로 만들면 누구나 접근할 수 있어 심각한 보안 위험이 됩니다. 특정 파트너에게만 접근을 허용하는 것이 아니며, 프라이빗 데이터가 노출될 수 있습니다.
- **D) S3 Access Point:** Access Point는 버킷에 대한 네트워크 경로와 접근 정책을 세분화하는 기능입니다. 유용하지만 파트너에게 AWS 자격 증명이 필요하며, 임시 접근 제공에는 Pre-Signed URL이 더 간단합니다.

**핵심 개념:** S3 Pre-Signed URL — IAM 없이 임시 접근을 제공하는 방법 (GET/PUT 모두 가능)

---

### Q6. A company wants to ensure all S3 API requests use HTTPS (encrypted in transit). How to enforce?

**한글 번역:** 회사가 모든 S3 API 요청이 HTTPS(전송 중 암호화)를 사용하도록 보장하려고 합니다. 어떻게 강제할 수 있습니까?

**선지:**
- A) Enable SSE-S3 encryption → SSE-S3 암호화를 활성화한다
- B) Create a bucket policy with condition denying requests where aws:SecureTransport is false → aws:SecureTransport가 false인 요청을 거부하는 조건이 있는 버킷 정책을 생성한다
- C) Enable S3 Transfer Acceleration → S3 Transfer Acceleration을 활성화한다
- D) Configure the S3 bucket to only expose the HTTPS endpoint → S3 버킷이 HTTPS 엔드포인트만 노출하도록 구성한다

**정답:** B

**선지별 해설:**
- **A) SSE-S3 암호화:** SSE-S3는 저장 시 암호화(encryption at rest)로, 디스크에 저장된 데이터를 암호화합니다. 전송 중 암호화(encryption in transit, HTTPS)와는 다른 개념입니다.
- **B) aws:SecureTransport 조건 (정답):** 버킷 정책에서 `"Condition": {"Bool": {"aws:SecureTransport": "false"}}` 조건으로 Deny 문을 추가하면, HTTP(비암호화) 요청을 거부합니다. HTTPS만 허용하는 표준 방법입니다. 이는 전송 중 암호화를 강제합니다.
- **C) Transfer Acceleration:** Transfer Acceleration은 업로드/다운로드 속도를 높이는 기능입니다. HTTPS는 Transfer Acceleration과 무관하게 별도로 강제해야 합니다.
- **D) HTTPS 엔드포인트만 노출:** S3는 HTTP와 HTTPS 엔드포인트를 모두 제공하며, HTTPS만 노출하도록 구성하는 옵션은 없습니다. 버킷 정책을 통해 HTTP를 거부해야 합니다.

**핵심 개념:** S3 전송 중 암호화 — aws:SecureTransport 조건을 사용한 HTTPS 강제

---

### Q7. A company has different departments needing access to specific prefixes in the same S3 bucket with different permissions. They want to simplify management. Which feature?

**한글 번역:** 회사의 여러 부서가 동일한 S3 버킷의 특정 접두사에 각각 다른 권한으로 접근해야 합니다. 관리를 단순화하고 싶습니다. 어떤 기능을 사용해야 합니까?

**선지:**
- A) S3 bucket policy with multiple statements → 여러 구문이 있는 S3 버킷 정책
- B) S3 Access Points with separate policies for each department → 각 부서별 별도 정책이 있는 S3 액세스 포인트
- C) IAM groups with different S3 permissions → 다른 S3 권한을 가진 IAM 그룹
- D) S3 Object Lambda Access Points → S3 Object Lambda 액세스 포인트

**정답:** B

**선지별 해설:**
- **A) 다중 구문 버킷 정책:** 하나의 버킷 정책에 여러 부서의 권한을 모두 정의할 수 있지만, 정책이 복잡해지고 관리가 어려워집니다. 버킷 정책 크기 제한(20KB)에 도달할 수도 있습니다.
- **B) S3 Access Points (정답):** S3 Access Points는 버킷에 대한 명명된 네트워크 엔드포인트로, 각각 고유한 접근 정책을 가집니다. 부서별로 Access Point를 생성하고, 각 Access Point에 해당 부서의 접두사에 대한 권한만 부여하면 됩니다. 관리가 단순하고 확장 가능합니다.
- **C) IAM 그룹:** IAM 그룹으로 부서별 권한을 관리할 수 있지만, 여러 팀이 같은 버킷에 접근하는 경우 IAM 정책이 복잡해질 수 있습니다. S3 Access Points가 S3 접근 관리에 특화되어 더 간단합니다.
- **D) S3 Object Lambda Access Points:** Object Lambda Access Points는 객체를 반환하기 전에 Lambda 함수로 데이터를 변환하는 기능입니다. 접근 권한 관리가 아닌 데이터 변환 용도이므로 이 시나리오에 적합하지 않습니다.

**핵심 개념:** S3 Access Points — 대규모 공유 버킷의 접근 권한을 부서/팀별로 단순화

---

### Q8. A company uses S3 and wants different applications to receive modified versions of the same object. Analytics needs PII redacted, marketing needs enriched data. Which solution requires only ONE S3 bucket?

**한글 번역:** 회사가 S3를 사용하며, 서로 다른 애플리케이션이 동일한 객체의 수정된 버전을 받기를 원합니다. 분석팀은 PII가 삭제된 데이터가 필요하고, 마케팅팀은 보강된 데이터가 필요합니다. 하나의 S3 버킷만 필요한 솔루션은 무엇입니까?

**선지:**
- A) Create two separate buckets → 두 개의 별도 버킷을 생성한다
- B) Use S3 Object Lambda with different Lambda functions → 다른 Lambda 함수를 사용하는 S3 Object Lambda를 사용한다
- C) Use S3 replication → S3 복제를 사용한다
- D) Use S3 Batch Operations → S3 Batch Operations를 사용한다

**정답:** B

**선지별 해설:**
- **A) 두 개의 별도 버킷:** 별도 버킷을 생성하면 데이터를 복제하고 각각 변환해야 합니다. 저장 비용이 증가하고, 데이터 동기화 관리가 필요합니다. "하나의 버킷만"이라는 조건에 부합하지 않습니다.
- **B) S3 Object Lambda (정답):** S3 Object Lambda Access Points는 S3 GET 요청 시 Lambda 함수를 실행하여 객체를 실시간으로 변환합니다. 하나의 버킷에 원본 데이터를 저장하고, 분석팀용 Access Point(PII 삭제 Lambda)와 마케팅팀용 Access Point(데이터 보강 Lambda)를 별도로 생성합니다. 각 애플리케이션은 자신의 Access Point를 통해 맞춤 변환된 데이터를 받습니다.
- **C) S3 복제:** 복제는 데이터를 다른 버킷에 복사하는 기능으로, 데이터 변환을 수행하지 않습니다. 또한 하나의 버킷이라는 조건에 부합하지 않습니다.
- **D) S3 Batch Operations:** Batch Operations는 대규모 객체에 대한 일괄 작업을 수행하지만, 실시간으로 애플리케이션별 맞춤 변환을 제공하는 기능이 아닙니다. 일회성 작업에 적합합니다.

**핵심 개념:** S3 Object Lambda — 단일 버킷에서 애플리케이션별 맞춤 데이터 변환 제공

---
