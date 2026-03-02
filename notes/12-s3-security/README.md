# Amazon S3 - Security

## 개요
S3의 보안 관련 기능을 종합적으로 다루는 섹션이다. 서버 측/클라이언트 측 암호화, CORS, MFA Delete, 액세스 로그, Pre-Signed URL, Object Lock, Access Points 등을 포함한다. SAA-C03 시험에서 암호화 방식 비교(SSE-S3 vs SSE-KMS vs SSE-C vs Client-Side), Object Lock의 Compliance vs Governance 모드가 핵심 출제 포인트이다.

## 핵심 개념

### S3 객체 암호화 - 4가지 방법

> **왜 암호화가 필요한가?** S3에 저장된 파일은 올바른 권한이 있으면 누구나 읽을 수 있다. 암호화는 설령 권한을 우회하거나 물리적 디스크가 탈취되더라도 데이터를 읽지 못하게 막는 2차 보호막이다. "누가 암호화 키를 관리하느냐"에 따라 4가지 방식이 나뉜다.

#### 1. SSE-S3 (Server-Side Encryption with S3-Managed Keys)
- AWS가 관리하는 키로 서버 측 암호화 (사용자는 키를 신경 쓸 필요 없음)
- 암호화 타입: **AES-256** (현재 가장 널리 쓰이는 대칭키 암호화 표준)
- 헤더: `"x-amz-server-side-encryption": "AES256"`
- **새 버킷/객체에 기본 활성화**
- 사용자가 키를 관리할 필요 없음

#### 2. SSE-KMS (Server-Side Encryption with KMS Keys)
- **AWS KMS** (Key Management Service — AWS의 키 관리 전용 서비스)로 키 관리
- 장점: 사용자 키 제어 + **CloudTrail** (AWS 활동 감사 로그 서비스)로 "누가 언제 어떤 키를 썼는지" 추적 가능
- 헤더: `"x-amz-server-side-encryption": "aws:kms"`
- **KMS API 호출 제한 주의**:
  - 업로드 시: `GenerateDataKey` API 호출 (데이터 암호화 키 생성)
  - 다운로드 시: `Decrypt` API 호출 (키 복호화)
  - KMS 할당량: 리전별 **5,500 / 10,000 / 30,000 요청/초** — 대량 업/다운로드 시 이 한도를 초과할 수 있음
  - Service Quotas Console에서 할당량 증가 요청 가능

#### 3. SSE-C (Server-Side Encryption with Customer-Provided Keys)
- **고객이 직접 만든 키**로 서버 측 암호화 — AWS가 키를 대신 만들어주지 않음
- S3는 암호화 후 키를 **저장하지 않음** (사용자가 분실하면 복구 불가)
- **HTTPS 필수** (키가 네트워크를 통해 전달되므로 평문 전송 불가)
- 매 HTTP 요청 시 헤더에 키 포함 필수
- AWS 콘솔에서 사용 불가 (CLI/SDK만 — 콘솔은 HTTPS 헤더에 키를 직접 넣는 방식 지원 안 함)

#### 4. Client-Side Encryption (클라이언트 측 암호화)
- 클라이언트(내 컴퓨터/서버)에서 **S3에 올리기 전에 직접 암호화**, 내려받은 후 직접 복호화
- S3는 이미 암호화된 데이터를 저장할 뿐, 평문을 전혀 알지 못함
- Amazon S3 Client-Side Encryption Library 사용 가능
- 고객이 키와 암호화 주기를 완전 관리

### S3 암호화 방식 비교 (SSE-S3 / SSE-KMS / SSE-C / Client-Side)

```text
  방식        키 관리 주체      키 저장 위치      암호화 위치     특이사항
 ─────────  ───────────────  ──────────────  ────────────  ─────────────────────
  SSE-S3     AWS (자동)       AWS 내부        S3 서버       기본 활성화, AES-256
  SSE-KMS    사용자 (KMS)     AWS KMS         S3 서버       CloudTrail 감사, 할당량 주의
  SSE-C      고객 (직접)      고객이 보관      S3 서버       HTTPS 필수, S3가 키 미저장
  Client     고객 (직접)      고객이 보관      클라이언트     전송 전 암호화

  +----------+    PUT Object     +-----------+
  |          | ----------------> |           |
  |  Client  |  + 암호화 헤더     |   S3      |
  |          | <---------------- |           |
  +----------+    GET Object     +-----------+

  SSE-S3:   Client --[ obj ]-->  S3 --[ S3 Key로 암호화 ]--> 저장
  SSE-KMS:  Client --[ obj ]-->  S3 --[ KMS GenerateDataKey ]--> Data Key로 암호화 --> 저장
  SSE-C:    Client --[ obj + key ]--> S3 --[ 고객 Key로 암호화 ]--> 저장 (키 폐기)
  Client:   Client --[ 직접 암호화한 obj ]--> S3 --> 저장 (S3는 평문 모름)
```

### Encryption in Transit (전송 중 암호화)
- SSL/TLS 암호화
- S3는 두 가지 엔드포인트 노출:
  - **HTTP**: 비암호화
  - **HTTPS**: 암호화 (권장)
- **SSE-C 사용 시 HTTPS 필수**
- 버킷 정책으로 `aws:SecureTransport` 조건으로 HTTPS 강제 가능

### S3 접근 제어 흐름 (Bucket Policy + IAM + ACL 평가)

```text
                         S3 API Request (GET/PUT/DELETE)
                                    |
                                    v
                    +-------------------------------+
                    |  1. Bucket Policy 평가         |
                    |  (Explicit DENY 있으면 즉시 거부) |
                    +-------------------------------+
                                    |
                         Explicit DENY 없음
                                    v
                    +-------------------------------+
                    |  2. IAM Policy 평가            |
                    |  (사용자/역할에 Allow 있는가?)    |
                    +-------------------------------+
                           |                |
                        Allow            No Allow
                           |                |
                           v                v
                       +-------+   +-------------------+
                       | 허용   |   | 3. Bucket ACL /   |
                       +-------+   |    Object ACL 평가 |
                                   +-------------------+
                                      |            |
                                   Allow       No Allow
                                      |            |
                                      v            v
                                  +-------+   +--------+
                                  | 허용   |   | 거부    |
                                  +-------+   +--------+

  ※ 최종 결정 규칙:
     - Explicit DENY가 하나라도 있으면 → 거부
     - Bucket Policy OR IAM Policy OR ACL 중 Allow → 허용
     - 아무 Allow도 없으면 → 기본 거부 (Implicit DENY)
```

### Default Encryption vs Bucket Policy
- SSE-S3가 새 객체에 **자동 적용**
- Bucket Policy로 암호화 헤더 없는 PUT 요청 거부 가능 (SSE-KMS, SSE-C 강제)
- **Bucket Policy가 Default Encryption보다 먼저 평가됨**

### CORS (Cross-Origin Resource Sharing, 교차 출처 리소스 공유)
> **왜 필요한가?** 웹 브라우저는 보안상 "다른 도메인의 서버에 JavaScript로 직접 요청하는 것"을 기본으로 막는다. 예를 들어 `shop.example.com`의 JavaScript가 `images.example.com`에서 이미지를 가져오려 하면 브라우저가 차단한다. CORS는 "이 도메인에서 오는 요청은 허용해도 돼"라고 서버(S3)가 브라우저에게 알려주는 메커니즘이다.

- **Origin** = 프로토콜 + 도메인 + 포트 (이 세 가지 중 하나라도 다르면 "다른 Origin")
- 웹 브라우저 기반 보안 메커니즘으로 다른 Origin에 대한 요청 허용 여부를 서버가 선언
- **Same Origin(같은 출처)**: `http://example.com/app1` & `http://example.com/app2` (프로토콜, 도메인, 포트 모두 같음)
- **Different Origin(다른 출처)**: `http://www.example.com` & `http://other.example.com` (도메인이 다름)
- 다른 Origin의 요청 허용: 서버가 **CORS Headers** 응답에 포함시켜야 함 (`Access-Control-Allow-Origin: http://허용할도메인.com`)

#### S3 CORS
- S3 버킷에 대한 **Cross-Origin 요청 시** 올바른 CORS 헤더 활성화 필요
- 특정 Origin 또는 `*` (모든 Origin) 허용 가능
- **CORS 설정은 "요청을 받는 쪽(두 번째 S3 버킷)"에 해야 함** — 요청을 보내는 쪽이 아님
- **시험 빈출 주제**

### MFA Delete
- 중요 S3 작업 전 MFA(Multi-Factor Authentication) 강제
- **MFA 필요 작업**:
  - 객체 버전 **영구 삭제**
  - 버킷 **버저닝 일시 중지**
- **MFA 불필요 작업**:
  - 버저닝 활성화
  - 삭제된 버전 목록 조회
- 전제 조건: **버저닝 활성화** 필수
- **오직 버킷 소유자(root 계정)**만 MFA Delete 활성화/비활성화 가능

### S3 Access Logs (액세스 로그)
- S3 버킷에 대한 모든 요청을 다른 S3 버킷에 로깅
- 인증/비인증, 허용/거부 요청 모두 기록
- 로깅 버킷은 **같은 AWS 리전**에 있어야 함
- **경고: 모니터링 버킷을 로깅 버킷으로 설정하지 말 것!** -> 로깅 루프 발생, 버킷 크기 기하급수적 증가

### S3 Pre-Signed URLs
- 미리 서명된 URL 생성으로 임시 접근 권한 부여
- **생성 도구**: S3 Console, AWS CLI, SDK
- **URL 만료 시간**:
  - S3 Console: 1분 ~ **720분** (12시간)
  - AWS CLI: `--expires-in` 파라미터, 기본 3600초, 최대 **604,800초** (168시간, 7일)
- URL을 받은 사용자는 **URL 생성자의 권한**을 상속 (GET/PUT)
- 사용 사례:
  - 로그인 사용자만 프리미엄 비디오 다운로드
  - 동적 사용자 목록에 파일 다운로드 허용
  - 특정 S3 위치에 임시 파일 업로드 허용

### S3 Glacier Vault Lock
- **WORM (Write Once Read Many)** 모델 적용
- Vault Lock Policy 생성 후 **잠금** (변경/삭제 불가)
- 규정 준수 및 데이터 보존에 유용

### S3 Object Lock (버저닝 활성화 필수)
- **WORM** 모델 적용
- 지정 기간 동안 객체 버전 삭제 차단

```text
  ┌─────────────────────── Object Lock 모드 비교 ───────────────────────┐
  │                                                                     │
  │   Compliance Mode              Governance Mode        Legal Hold    │
  │  ┌───────────────┐           ┌───────────────┐    ┌──────────────┐  │
  │  │ 가장 엄격      │           │ 유연한 보호    │    │ 무기한 보호   │  │
  │  │               │           │               │    │              │  │
  │  │ root 포함     │           │ 대부분 삭제불가 │    │ 보존기간 무관 │  │
  │  │ 누구도 삭제불가│           │               │    │              │  │
  │  │               │           │ 특별 권한 가진  │    │ IAM 권한으로 │  │
  │  │ 모드 변경 불가 │           │ 사용자는 삭제  │    │ 설정/해제    │  │
  │  │ 기간 단축 불가 │           │ 가능           │    │              │  │
  │  │               │           │               │    │ PutObject    │  │
  │  │ 기간 연장 가능 │           │ 기간 연장 가능 │    │ LegalHold    │  │
  │  └───────────────┘           └───────────────┘    └──────────────┘  │
  │                                                                     │
  │   삭제 시도:                   삭제 시도:           삭제 시도:        │
  │   root ------> DENIED         일반 --> DENIED      Legal Hold 설정  │
  │   admin -----> DENIED         특별권한 -> OK        중이면 --> DENIED │
  │   anyone ----> DENIED                                               │
  │                                                                     │
  │   규정 준수 필수 시 사용       테스트/유연성 필요 시  소송/조사 중     │
  │   (금융, 의료 기록)           사용                   데이터 보존 시    │
  └─────────────────────────────────────────────────────────────────────┘
```

#### Retention Mode - Compliance (규정 준수)
- **root 사용자를 포함**하여 어떤 사용자도 덮어쓰기/삭제 불가
- 보존 모드 변경 불가, 보존 기간 단축 불가
- **가장 엄격한 모드**

#### Retention Mode - Governance (거버넌스)
- **대부분의 사용자**는 덮어쓰기/삭제 불가
- **특별 권한을 가진 사용자**는 보존 변경 또는 삭제 가능
- Compliance보다 유연

#### Retention Period (보존 기간)
- 고정 기간 동안 객체 보호
- **연장 가능**

#### Legal Hold (법적 보존)
- 보존 기간과 **무관하게** 무기한 보호
- `s3:PutObjectLegalHold` IAM 권한으로 자유롭게 설정/제거

### S3 Access Points
- S3 버킷의 보안 관리를 단순화
- 각 Access Point 구성:
  - 자체 **DNS 이름** (Internet Origin 또는 VPC Origin)
  - **Access Point Policy** (Bucket Policy와 유사)
- 사용 예: Finance, Sales, Analytics 부서별로 별도 Access Point 설정

#### VPC Origin Access Point
- VPC 내부에서만 접근 가능하도록 설정
- **VPC Endpoint** 생성 필수 (Gateway 또는 Interface)
- VPC Endpoint Policy에서 대상 버킷 및 Access Point 접근 허용 필요

### S3 Object Lambda
- Lambda 함수로 객체를 **검색 전 변환**
- 단일 S3 버킷 위에 S3 Access Point + S3 Object Lambda Access Point 생성
- 사용 사례:
  - 분석/비프로덕션 환경에서 **PII(개인 식별 정보) 삭제**
  - **데이터 형식 변환** (XML -> JSON)
  - 호출자별 **이미지 크기 조절 및 워터마크** 추가

## 시험 포인트
- **SSE-S3**: 기본 암호화, AES-256, 키 관리 불필요
- **SSE-KMS**: 키 제어 + CloudTrail 감사, **KMS 할당량 주의** (고처리량 시나리오)
- **SSE-C**: 고객 키, HTTPS 필수, S3가 키 미저장
- **Client-Side**: 전송 전 암호화, 고객이 완전 관리
- **Bucket Policy는 Default Encryption보다 먼저 평가됨**
- **CORS**: Cross-Origin 요청 시 S3 버킷에 CORS 헤더 설정 필요 (빈출)
- **MFA Delete**: root 계정만 활성화 가능, 버저닝 필수
- **Access Logs**: 모니터링 버킷 != 로깅 버킷 (로깅 루프 주의)
- **Pre-Signed URL**: URL 생성자의 권한 상속, CLI 최대 7일
- **Object Lock Compliance vs Governance**: Compliance는 root도 삭제 불가, Governance는 특별 권한으로 삭제 가능
- **Legal Hold**: 보존 기간과 무관, `s3:PutObjectLegalHold` 권한으로 관리
- **Glacier Vault Lock**: 정책 잠금 후 변경 불가
- **S3 Object Lambda**: 검색 시 실시간 객체 변환

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| SSE-S3 | AWS 관리 키, AES-256, 기본 활성화 |
| SSE-KMS | KMS 키, CloudTrail 감사, API 할당량 주의 |
| SSE-C | 고객 제공 키, HTTPS 필수, S3 키 미저장 |
| Client-Side | 클라이언트 암호화/복호화, 키 완전 관리 |
| CORS | Cross-Origin 요청 허용, S3 웹사이트 간 통신 |
| MFA Delete | 영구 삭제/버저닝 중지 시 MFA, root만 설정 |
| Access Logs | 모든 요청 로깅, 같은 리전, 로깅 루프 주의 |
| Pre-Signed URL | 임시 접근, Console 12시간, CLI 7일 |
| Glacier Vault Lock | WORM, 정책 잠금 후 변경 불가 |
| Object Lock Compliance | root도 삭제 불가, 기간 단축 불가 |
| Object Lock Governance | 특별 권한으로 삭제 가능 |
| Legal Hold | 무기한 보호, 보존 기간과 무관 |
| Access Points | 부서별 접근 관리, DNS + Policy |
| VPC Origin | VPC 내부 전용, VPC Endpoint 필수 |
| S3 Object Lambda | 검색 시 Lambda로 객체 변환 |

---

## Practice Questions

### Q1. A company needs to encrypt objects in S3 while maintaining full control over encryption keys and being able to audit key usage in AWS CloudTrail. Which encryption method should they use?
**Options:**
- A) SSE-S3
- B) SSE-KMS
- C) SSE-C
- D) Client-Side Encryption

**Answer:** B

**해설:**

> **문제:** 회사가 암호화 키에 대한 완전한 제어를 유지하면서 S3 객체를 암호화하고, AWS CloudTrail에서 키 사용을 감사할 수 있어야 한다. 어떤 암호화 방법을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | SSE-S3 |
| B | SSE-KMS |
| C | SSE-C |
| D | Client-Side Encryption |

**(A)** : SSE-S3는 AWS가 키를 완전히 자동으로 관리하므로 사용자가 키에 대한 제어권이 없다. CloudTrail에서 개별 키 사용을 감사할 수 없다.

**(B) 정답** : SSE-KMS는 AWS KMS를 통해 키에 대한 사용자 제어(키 생성, 회전, 비활성화 등)를 제공하고, CloudTrail을 통해 키의 모든 사용 내역을 감사할 수 있다. "키 제어"와 "CloudTrail 감사" 두 가지를 모두 충족하는 유일한 방법이다.

**(C)** : SSE-C는 고객이 직접 제공한 키로 암호화하지만 키가 AWS에 저장되지 않는다. 따라서 CloudTrail에서 키 사용을 감사할 수 없다.

**(D)** : Client-Side Encryption은 클라이언트에서 암호화를 수행하므로 AWS CloudTrail을 통한 키 사용 감사가 불가능하다.

**핵심 개념:** SSE-KMS

---

### Q2. A company uses SSE-KMS to encrypt objects in S3 and is experiencing throttling during peak upload periods. The KMS quota is being exceeded. What are TWO possible solutions?
**Options:**
- A) Switch to SSE-S3 encryption
- B) Request a KMS quota increase through the Service Quotas Console
- C) Enable S3 Transfer Acceleration
- D) Use S3 Byte-Range Fetches
- E) Implement exponential backoff and retry logic

**Answer:** A, B

**해설:**

> **문제:** 회사가 SSE-KMS를 사용하여 S3 객체를 암호화하고 있으며, 피크 업로드 기간에 스로틀링이 발생하고 있다. KMS 할당량이 초과되고 있다. 두 가지 가능한 해결책은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | SSE-S3 암호화로 전환한다 |
| B | Service Quotas Console을 통해 KMS 할당량 증가를 요청한다 |
| C | S3 Transfer Acceleration을 활성화한다 |
| D | S3 Byte-Range Fetches를 사용한다 |
| E | 지수 백오프 및 재시도 로직을 구현한다 |

**(A) 정답** : SSE-S3로 전환하면 KMS API 호출이 필요 없어져 스로틀링 문제가 근본적으로 해결된다. SSE-S3는 KMS 할당량 제한이 없다.

**(B) 정답** : Service Quotas Console에서 KMS 할당량 증가를 요청하면 현재 암호화 방식(SSE-KMS)을 유지하면서 더 높은 처리량을 확보할 수 있다.

**(C)** : Transfer Acceleration은 장거리 업로드 속도를 높이는 기능이다. KMS API 호출 제한과는 전혀 무관하다.

**(D)** : Byte-Range Fetches는 다운로드 병렬화 기능으로 KMS 할당량 문제를 해결하지 않는다. 오히려 더 많은 KMS Decrypt 호출을 유발할 수 있다.

**(E)** : 지수 백오프는 일시적 스로틀링에 대한 임시 대응이다. 근본적인 할당량 문제를 해결하지 못한다.

**핵심 개념:** SSE-KMS Limitation

---

### Q3. A company hosts two S3 static websites. The first website needs to make JavaScript requests to the second website's S3 bucket. Users are getting cross-origin errors. What should be configured?
**Options:**
- A) Enable versioning on both S3 buckets
- B) Configure CORS headers on the second S3 bucket (the one being requested)
- C) Create an S3 bucket policy allowing cross-account access
- D) Enable S3 Transfer Acceleration on both buckets

**Answer:** B

**해설:**

> **문제:** 회사가 두 개의 S3 정적 웹사이트를 호스팅하고 있다. 첫 번째 웹사이트가 두 번째 웹사이트의 S3 버킷으로 JavaScript 요청을 보내야 한다. 사용자에게 Cross-Origin 에러가 발생하고 있다. 무엇을 구성해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 두 S3 버킷 모두에서 버저닝을 활성화한다 |
| B | 두 번째 S3 버킷(요청을 받는 쪽)에 CORS 헤더를 구성한다 |
| C | 크로스 계정 접근을 허용하는 S3 버킷 정책을 생성한다 |
| D | 두 버킷 모두에서 S3 Transfer Acceleration을 활성화한다 |

**(A)** : 버저닝은 객체 버전 관리 기능이다. CORS 에러와는 전혀 관련이 없다.

**(B) 정답** : Cross-Origin 에러를 해결하려면 요청을 받는 쪽(두 번째 S3 버킷)에 CORS 헤더를 설정해야 한다. `Access-Control-Allow-Origin` 헤더에 첫 번째 웹사이트의 Origin을 지정하거나 `*`로 모든 Origin을 허용하면 된다.

**(C)** : 크로스 계정 버킷 정책은 AWS 계정 간 접근 권한 부여 문제를 해결한다. 같은 계정 내 다른 Origin 간의 브라우저 CORS 에러와는 다른 문제이다.

**(D)** : Transfer Acceleration은 전송 속도 향상 기능이다. CORS와는 전혀 무관하다.

**핵심 개념:** S3 CORS

---

### Q4. A financial services company must store regulatory records in S3 for 7 years. No user, including the root user, should be able to delete or modify these records during the retention period. Which configuration meets this requirement?
**Options:**
- A) S3 Object Lock with Governance mode
- B) S3 Object Lock with Compliance mode
- C) S3 Glacier Vault Lock
- D) S3 bucket policy denying delete actions

**Answer:** B

**해설:**

> **문제:** 금융 서비스 회사가 규제 기록을 S3에 7년간 저장해야 한다. root 사용자를 포함하여 어떤 사용자도 보존 기간 동안 이 기록을 삭제하거나 수정할 수 없어야 한다. 이 요구사항을 충족하는 구성은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Governance 모드의 S3 Object Lock |
| B | Compliance 모드의 S3 Object Lock |
| C | S3 Glacier Vault Lock |
| D | 삭제 작업을 거부하는 S3 버킷 정책 |

**(A)** : Governance 모드는 대부분의 사용자가 삭제할 수 없지만 특별 IAM 권한(`s3:BypassGovernanceRetention`)을 가진 사용자는 보존을 우회하여 삭제할 수 있다. "어떤 사용자도 삭제 불가"라는 요구사항에 부합하지 않는다.

**(B) 정답** : S3 Object Lock의 Compliance 모드는 root 사용자를 포함하여 누구도 보존 기간 동안 객체를 덮어쓰거나 삭제할 수 없다. 보존 모드와 기간을 단축할 수 없으므로 금융 규제 요구사항을 완벽히 충족한다.

**(C)** : Glacier Vault Lock은 Glacier 전용 WORM 정책이다. S3 Standard나 다른 스토리지 클래스에 저장된 객체에는 적용되지 않는다.

**(D)** : 버킷 정책은 관리자가 언제든 수정하거나 삭제할 수 있다. 규정 준수 수준의 변경 불가성을 보장하지 않는다.

**핵심 개념:** S3 Object Lock - Compliance Mode

---

### Q5. A company wants to allow a partner organization to temporarily upload files to a specific path in their private S3 bucket without creating IAM users for them. Which solution is MOST appropriate?
**Options:**
- A) Create a bucket policy allowing the partner's AWS account
- B) Generate a pre-signed URL for PUT operations
- C) Make the S3 bucket public temporarily
- D) Create an S3 Access Point for the partner

**Answer:** B

**해설:**

> **문제:** 회사가 파트너 조직에게 IAM 사용자를 생성하지 않고 프라이빗 S3 버킷의 특정 경로에 임시로 파일을 업로드할 수 있도록 허용하려 한다. 가장 적합한 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 파트너의 AWS 계정을 허용하는 버킷 정책을 생성한다 |
| B | PUT 작업용 Pre-Signed URL을 생성한다 |
| C | S3 버킷을 일시적으로 공개한다 |
| D | 파트너를 위한 S3 Access Point를 생성한다 |

**(A)** : 버킷 정책은 파트너의 AWS 계정에 대한 영구적인 접근 권한을 부여한다. "임시" 접근 요구사항에 맞지 않으며 파트너가 AWS 계정이 없을 수도 있다.

**(B) 정답** : Pre-Signed URL을 PUT 작업용으로 생성하면 특정 S3 경로에 대한 임시 업로드 권한을 URL 형태로 부여할 수 있다. URL에는 만료 시간이 설정되어 있으며(CLI 최대 7일), 받은 사람은 IAM 사용자 없이도 파일을 업로드할 수 있다.

**(C)** : 버킷을 일시적으로 공개하는 것은 모든 사람이 접근할 수 있게 하는 심각한 보안 위험이다. 절대 권장되지 않는 방법이다.

**(D)** : S3 Access Point는 계정/부서 수준의 지속적인 접근 관리를 위한 기능이다. 일회성 임시 접근에는 과도하며 파트너가 AWS 계정 없이는 사용할 수 없다.

**핵심 개념:** S3 Pre-Signed URLs

---

### Q6. A company wants to ensure that all S3 API requests use HTTPS (encrypted in transit). How should they enforce this?
**Options:**
- A) Enable SSE-S3 encryption on the bucket
- B) Create a bucket policy with a condition denying requests where aws:SecureTransport is false
- C) Enable S3 Transfer Acceleration
- D) Configure the S3 bucket to only expose the HTTPS endpoint

**Answer:** B

**해설:**

> **문제:** 회사가 모든 S3 API 요청이 HTTPS(전송 중 암호화)를 사용하도록 보장하려 한다. 어떻게 강제해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 버킷에 SSE-S3 암호화를 활성화한다 |
| B | aws:SecureTransport가 false인 요청을 거부하는 조건이 있는 버킷 정책을 생성한다 |
| C | S3 Transfer Acceleration을 활성화한다 |
| D | S3 버킷이 HTTPS 엔드포인트만 노출하도록 구성한다 |

**(A)** : SSE-S3는 서버에 저장된 데이터의 저장 시 암호화(encryption at rest)를 제공한다. 클라이언트와 S3 간 네트워크 전송 암호화(encryption in transit)와는 완전히 다른 개념이다.

**(B) 정답** : 버킷 정책에서 `aws:SecureTransport` 조건 키를 사용하여 값이 `false`인(HTTP를 사용하는) 요청을 Deny하면 HTTPS를 강제할 수 있다. 암호화되지 않은 HTTP 요청은 모두 거부되고 HTTPS 요청만 허용된다.

**(C)** : Transfer Acceleration은 Edge Location을 통한 전송 속도 향상 기능이다. HTTPS 강제와는 전혀 무관하다.

**(D)** : S3는 HTTP와 HTTPS 엔드포인트를 모두 제공하며 HTTP 엔드포인트만 개별적으로 비활성화하는 설정이 없다. 버킷 정책을 통해 HTTP 요청을 거부하는 것이 올바른 방법이다.

**핵심 개념:** S3 Encryption in Transit

---

### Q7. A company has different departments (Finance, Sales, Analytics) that need access to specific prefixes in the same S3 bucket with different permissions. They want to simplify permission management. Which feature should they use?
**Options:**
- A) S3 bucket policy with multiple statements
- B) S3 Access Points with separate policies for each department
- C) IAM groups with different S3 permissions
- D) S3 Object Lambda Access Points

**Answer:** B

**해설:**

> **문제:** 회사에 서로 다른 부서(Finance, Sales, Analytics)가 같은 S3 버킷의 특정 접두사에 서로 다른 권한으로 접근해야 한다. 권한 관리를 단순화하려 한다. 어떤 기능을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 여러 문(statement)이 있는 S3 버킷 정책 |
| B | 각 부서별 별도 정책이 있는 S3 Access Points |
| C | 서로 다른 S3 권한을 가진 IAM 그룹 |
| D | S3 Object Lambda Access Points |

**(A)** : 단일 버킷 정책에 여러 부서의 권한을 모두 담으면 정책이 커지고 관리가 어려워지며 실수의 가능성도 높아진다. 권한 관리가 단순화되지 않는다.

**(B) 정답** : S3 Access Points는 각 부서별로 별도의 DNS 이름과 Access Point Policy를 가진 독립적인 진입점을 제공하여 권한 관리를 대폭 단순화한다. Finance, Sales, Analytics 각각의 Access Point에 해당 부서만을 위한 간단한 정책을 설정하면 된다.

**(C)** : IAM 그룹으로도 가능하지만 사용자 측면의 관리이므로 S3 리소스(접두사)별 세밀한 접근 제어에는 Access Points가 더 직관적이고 관리가 쉽다.

**(D)** : Object Lambda Access Points는 객체를 검색할 때 Lambda 함수로 실시간 변환하는 기능이다. 권한 관리 단순화와는 용도가 다르다.

**핵심 개념:** S3 Access Points

---

### Q8. A company uses S3 to store objects and wants different applications to receive modified versions of the same object. For example, an analytics application needs PII redacted, while a marketing application needs enriched data from an external database. Which solution requires only ONE S3 bucket?
**Options:**
- A) Create two separate S3 buckets with different object versions
- B) Use S3 Object Lambda with different Lambda functions per application
- C) Use S3 replication to create modified copies
- D) Use S3 Batch Operations to create different versions

**Answer:** B

**해설:**

> **문제:** 회사가 S3에 객체를 저장하고 있으며, 서로 다른 애플리케이션이 같은 객체의 수정된 버전을 받기를 원한다. 예를 들어 분석 애플리케이션은 PII가 삭제된 데이터가 필요하고, 마케팅 애플리케이션은 외부 데이터베이스에서 보강된 데이터가 필요하다. 하나의 S3 버킷만 필요한 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 서로 다른 객체 버전이 있는 두 개의 별도 S3 버킷을 생성한다 |
| B | 애플리케이션별 다른 Lambda 함수와 함께 S3 Object Lambda를 사용한다 |
| C | S3 복제를 사용하여 수정된 복사본을 생성한다 |
| D | S3 Batch Operations를 사용하여 다른 버전을 생성한다 |

**(A)** : 별도 버킷을 생성하면 데이터가 중복 저장되어 비용이 증가하고 각 버킷의 데이터를 동기화해야 하는 관리 부담이 발생한다. "하나의 버킷만" 조건에도 부합하지 않는다.

**(B) 정답** : S3 Object Lambda를 사용하면 단일 S3 버킷 위에 여러 Object Lambda Access Point를 생성하여 각 애플리케이션이 다른 Lambda 함수를 통해 실시간으로 변환된 객체를 받을 수 있다. PII 삭제, 데이터 보강 등을 애플리케이션별로 적용하면서 원본은 하나의 버킷에만 저장된다.

**(C)** : S3 복제는 별도 버킷에 복사본을 만든다. 하나의 버킷만 사용하라는 조건에 부합하지 않는다.

**(D)** : Batch Operations은 일괄 처리로 다른 버전을 생성할 수 있지만 실시간 변환이 아니다. 변환된 복사본을 별도로 저장해야 하므로 추가 스토리지 비용이 발생한다.

**핵심 개념:** S3 Object Lambda
