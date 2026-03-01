# Section 10 - Amazon S3 연습문제 해설

---

### Q1. A company needs to store 10TB of data in S3. Data is accessed once a quarter and must be retrieved within milliseconds. Which storage class?

**한글 번역:** 회사가 S3에 10TB의 데이터를 저장해야 합니다. 데이터는 분기에 한 번 접근하며, 밀리초 이내에 검색할 수 있어야 합니다. 어떤 스토리지 클래스를 사용해야 합니까?

**선지:**
- A) S3 Standard → S3 Standard
- B) S3 Standard-IA → S3 Standard-IA (비빈번 접근)
- C) S3 Glacier Instant Retrieval → S3 Glacier Instant Retrieval (즉시 검색)
- D) S3 Glacier Flexible Retrieval → S3 Glacier Flexible Retrieval (유연한 검색)

**정답:** C

**선지별 해설:**
- **A) S3 Standard:** S3 Standard는 자주 접근하는 데이터에 최적화되어 있습니다. 분기에 한 번만 접근하는 데이터에 사용하면 불필요하게 높은 저장 비용이 발생합니다.
- **B) S3 Standard-IA:** Standard-IA는 비빈번 접근 데이터에 적합하지만, Glacier Instant Retrieval보다 저장 비용이 더 높습니다. 분기 1회 접근 패턴에서는 Glacier Instant Retrieval이 더 비용 효율적입니다.
- **C) S3 Glacier Instant Retrieval (정답):** 분기에 1회 정도 접근하는 데이터에 최적화된 스토리지 클래스입니다. Standard-IA보다 저장 비용이 최대 68% 저렴하면서도 밀리초 단위의 즉시 검색을 지원합니다. 이 시나리오의 요구사항(드문 접근 + 밀리초 검색)에 완벽히 부합합니다.
- **D) S3 Glacier Flexible Retrieval:** Glacier Flexible Retrieval은 검색에 수 분에서 수 시간이 소요됩니다(Expedited: 1-5분, Standard: 3-5시간, Bulk: 5-12시간). 밀리초 이내 검색 요구사항을 충족하지 못합니다.

**핵심 개념:** S3 Glacier Instant Retrieval — 분기별 접근 + 밀리초 검색이 필요한 데이터에 최적

---

### Q2. A company has an S3 bucket in us-east-1 and needs to replicate data to eu-west-1 for DR. What prerequisites must be met? (Select TWO)

**한글 번역:** 회사가 us-east-1에 S3 버킷을 보유하고 있으며, DR을 위해 eu-west-1로 데이터를 복제해야 합니다. 충족해야 하는 전제 조건은 무엇입니까? (2개 선택)

**선지:**
- A) Both buckets must have versioning enabled → 두 버킷 모두 버전 관리가 활성화되어야 한다
- B) Both buckets must be in the same AWS account → 두 버킷이 동일한 AWS 계정에 있어야 한다
- C) S3 must be given proper IAM permissions → S3에 적절한 IAM 권한이 부여되어야 한다
- D) Both buckets must use the same storage class → 두 버킷이 동일한 스토리지 클래스를 사용해야 한다
- E) Server-side encryption must be enabled → 서버 측 암호화가 활성화되어야 한다

**정답:** A, C

**선지별 해설:**
- **A) 버전 관리 활성화 (정답):** S3 복제(CRR/SRR)의 필수 전제 조건입니다. 소스 버킷과 대상 버킷 모두 버전 관리(Versioning)가 활성화되어 있어야 합니다.
- **B) 동일 AWS 계정:** S3 교차 리전 복제(CRR)는 같은 계정 내에서뿐만 아니라 서로 다른 AWS 계정 간에도 가능합니다. 필수 조건이 아닙니다.
- **C) IAM 권한 (정답):** S3가 소스 버킷에서 객체를 읽고 대상 버킷에 쓸 수 있도록 적절한 IAM 역할과 정책이 구성되어야 합니다. 이는 복제의 필수 전제 조건입니다.
- **D) 동일 스토리지 클래스:** 소스와 대상 버킷이 서로 다른 스토리지 클래스를 사용해도 됩니다. 복제 규칙에서 대상 스토리지 클래스를 별도로 지정할 수도 있습니다.
- **E) 서버 측 암호화:** 암호화는 복제의 필수 조건이 아닙니다. 비암호화 객체도 복제 가능하며, SSE-S3, SSE-KMS로 암호화된 객체도 복제할 수 있습니다(SSE-KMS는 추가 설정 필요).

**핵심 개념:** S3 복제(CRR) 전제 조건 — 버전 관리 활성화 + 적절한 IAM 권한

---

### Q3. A company hosts a static website on S3 and receives a 403 Forbidden error. What is the MOST likely cause?

**한글 번역:** 회사가 S3에 정적 웹사이트를 호스팅하고 있으며, 403 Forbidden 오류가 발생합니다. 가장 가능성이 높은 원인은 무엇입니까?

**선지:**
- A) Bucket doesn't have versioning → 버킷에 버전 관리가 없다
- B) Bucket policy doesn't allow public read access → 버킷 정책이 퍼블릭 읽기 접근을 허용하지 않는다
- C) Bucket is not in the correct region → 버킷이 올바른 리전에 없다
- D) Objects are encrypted with SSE-KMS → 객체가 SSE-KMS로 암호화되어 있다

**정답:** B

**선지별 해설:**
- **A) 버전 관리 없음:** 버전 관리는 정적 웹사이트 호스팅이나 접근 권한과 관련이 없습니다. 버전 관리가 없어도 정적 웹사이트는 정상 작동합니다.
- **B) 퍼블릭 읽기 접근 미허용 (정답):** S3 정적 웹사이트는 퍼블릭 접근이 필요합니다. 버킷 정책에서 `s3:GetObject`를 허용하지 않거나, S3 Block Public Access 설정이 활성화되어 있으면 403 Forbidden 오류가 발생합니다. 이것이 S3 정적 웹사이트의 가장 흔한 오류 원인입니다.
- **C) 잘못된 리전:** S3 버킷의 리전은 웹사이트 접근 가능 여부에 영향을 주지 않습니다. 리전이 다르면 지연 시간이 다를 수 있지만, 403 오류의 원인은 아닙니다.
- **D) SSE-KMS 암호화:** SSE-KMS로 암호화된 객체는 추가적인 KMS 복호화 권한이 필요하여 퍼블릭 정적 웹사이트에 문제가 될 수 있지만, 가장 흔한 원인은 버킷 정책 미설정입니다.

**핵심 개념:** S3 정적 웹사이트 403 오류 — 버킷 정책 퍼블릭 읽기 허용 및 Block Public Access 확인

---

### Q4. A company wants to automatically move objects to a cheaper storage class after they become infrequently accessed. Access pattern is unpredictable. Which storage class?

**한글 번역:** 회사가 객체가 비빈번하게 접근되면 자동으로 더 저렴한 스토리지 클래스로 이동하려고 합니다. 접근 패턴이 예측 불가능합니다. 어떤 스토리지 클래스를 사용해야 합니까?

**선지:**
- A) S3 Standard-IA → S3 Standard-IA
- B) S3 One Zone-IA → S3 One Zone-IA
- C) S3 Intelligent-Tiering → S3 Intelligent-Tiering (지능형 계층화)
- D) S3 Glacier Flexible Retrieval → S3 Glacier Flexible Retrieval

**정답:** C

**선지별 해설:**
- **A) S3 Standard-IA:** Standard-IA는 비빈번 접근에 적합하지만, 접근 패턴이 예측 불가능한 경우 적합하지 않습니다. 자주 접근하면 검색 비용이 높아집니다. 자동 계층 전환 기능이 없습니다.
- **B) S3 One Zone-IA:** One Zone-IA는 단일 AZ에만 저장하여 비용이 더 저렴하지만, AZ 장애 시 데이터 손실 위험이 있습니다. 접근 패턴 자동 감지 기능이 없습니다.
- **C) S3 Intelligent-Tiering (정답):** Intelligent-Tiering은 접근 패턴을 자동으로 모니터링하여 객체를 적절한 계층으로 이동합니다. Frequent Access, Infrequent Access(30일 미접근), Archive Instant Access(90일 미접근), 선택적으로 Archive Access(90일)와 Deep Archive Access(180일) 계층이 있습니다. 검색 비용이 없으며, 예측 불가능한 접근 패턴에 최적입니다.
- **D) S3 Glacier Flexible Retrieval:** Glacier는 아카이브 스토리지로, 검색에 시간이 소요됩니다. 비빈번하지만 즉시 접근이 필요할 수 있는 데이터에는 적합하지 않습니다.

**핵심 개념:** S3 Intelligent-Tiering — 예측 불가능한 접근 패턴에 자동 비용 최적화

---

### Q5. A company needs to upload a 10GB file to S3. Which upload method is REQUIRED?

**한글 번역:** 회사가 10GB 파일을 S3에 업로드해야 합니다. 어떤 업로드 방법이 필수입니까?

**선지:**
- A) Single PUT operation → 단일 PUT 작업
- B) Multi-Part Upload → Multi-Part Upload (멀티파트 업로드)
- C) S3 Transfer Acceleration → S3 Transfer Acceleration
- D) AWS Snowball → AWS Snowball

**정답:** B

**선지별 해설:**
- **A) 단일 PUT 작업:** S3의 단일 PUT 작업은 최대 5GB까지만 지원합니다. 10GB 파일은 단일 PUT으로 업로드할 수 없습니다.
- **B) Multi-Part Upload (정답):** 5GB를 초과하는 파일은 반드시 Multi-Part Upload를 사용해야 합니다. 파일을 여러 파트로 나누어 병렬로 업로드하며, 최대 5TB까지 지원합니다. 100MB 이상의 파일에는 사용을 권장합니다. 업로드 실패 시 해당 파트만 재전송할 수 있어 안정적입니다.
- **C) S3 Transfer Acceleration:** Transfer Acceleration은 CloudFront 엣지 로케이션을 활용하여 업로드 속도를 높이는 기능입니다. 속도 향상 옵션이지 필수 업로드 방법이 아닙니다.
- **D) AWS Snowball:** Snowball은 대규모 데이터 마이그레이션(테라바이트~페타바이트)을 위한 물리적 디바이스입니다. 10GB 파일 하나에는 과도한 솔루션입니다.

**핵심 개념:** S3 Multi-Part Upload — 5GB 초과 파일의 필수 업로드 방법

---

### Q6. An organization has S3 Replication: Bucket A → Bucket B. Bucket B → Bucket C. An object is uploaded to Bucket A. Where will it exist?

**한글 번역:** 조직이 S3 복제를 설정했습니다: 버킷 A → 버킷 B, 버킷 B → 버킷 C. 객체가 버킷 A에 업로드됩니다. 객체는 어디에 존재합니까?

**선지:**
- A) A, B, and C → A, B, C 모두
- B) A and B only → A와 B만
- C) A only → A만
- D) All three with different version IDs → 세 곳 모두 다른 버전 ID로

**정답:** B

**선지별 해설:**
- **A) A, B, C 모두:** S3 복제는 체이닝(chaining)을 지원하지 않습니다. A에서 B로 복제된 객체가 자동으로 B에서 C로 다시 복제되지 않습니다.
- **B) A와 B만 (정답):** S3 복제에는 체이닝이 없습니다. A → B 복제 규칙에 의해 객체는 A에서 B로 복제됩니다. 그러나 B → C 복제 규칙은 B에서 직접 업로드되거나 생성된 객체에만 적용되며, A에서 복제로 도착한 객체는 다시 복제되지 않습니다.
- **C) A만:** A → B 복제가 설정되어 있으므로, 객체는 B에도 복제됩니다.
- **D) 세 곳 모두 다른 버전 ID:** 체이닝이 지원되지 않으므로 C에는 복제되지 않습니다. 복제된 객체는 소스와 동일한 버전 ID를 유지합니다.

**핵심 개념:** S3 복제 — 체이닝(chaining) 미지원, 복제는 한 단계만 수행

---

### Q7. A company needs to store long-term archive data for 7 years with lowest cost. Retrieval can tolerate up to 48 hours. Which storage class?

**한글 번역:** 회사가 7년간 장기 아카이브 데이터를 최저 비용으로 저장해야 합니다. 검색은 최대 48시간까지 허용됩니다. 어떤 스토리지 클래스를 사용해야 합니까?

**선지:**
- A) S3 Glacier Instant Retrieval → S3 Glacier Instant Retrieval
- B) S3 Glacier Flexible Retrieval → S3 Glacier Flexible Retrieval
- C) S3 Glacier Deep Archive → S3 Glacier Deep Archive
- D) S3 Standard-IA → S3 Standard-IA

**정답:** C

**선지별 해설:**
- **A) S3 Glacier Instant Retrieval:** 밀리초 검색을 지원하지만, Deep Archive보다 저장 비용이 높습니다. 48시간 검색 허용이므로 즉시 검색이 불필요하여 비용 낭비입니다.
- **B) S3 Glacier Flexible Retrieval:** Flexible Retrieval은 Expedited(1-5분), Standard(3-5시간), Bulk(5-12시간) 검색 옵션을 제공합니다. Deep Archive보다 저장 비용이 높으므로 최저 비용이 아닙니다.
- **C) S3 Glacier Deep Archive (정답):** S3에서 가장 저렴한 스토리지 클래스입니다. Standard 검색은 12시간, Bulk 검색은 48시간 이내입니다. 48시간 허용이라는 요구사항을 충족하며 최저 비용을 제공합니다. 장기 아카이브(7-10년 이상)에 이상적입니다.
- **D) S3 Standard-IA:** Standard-IA는 비빈번 접근에 적합하지만, 아카이브 스토리지가 아니므로 Glacier보다 저장 비용이 훨씬 높습니다. 최저 비용 요구사항을 충족하지 못합니다.

**핵심 개념:** S3 Glacier Deep Archive — 최저 비용 장기 아카이브 (12-48시간 검색)

---

### Q8. Which statement about S3 versioning is TRUE?

**한글 번역:** S3 버전 관리에 대해 올바른 설명은 무엇입니까?

**선지:**
- A) Versioning can be enabled at the object level → 버전 관리는 객체 수준에서 활성화할 수 있다
- B) Files uploaded before versioning was enabled will have version "null" → 버전 관리 활성화 전에 업로드된 파일은 버전 "null"을 가진다
- C) Suspending versioning deletes all previous versions → 버전 관리를 일시 중지하면 모든 이전 버전이 삭제된다
- D) Versioning is enabled by default on all new buckets → 버전 관리는 모든 새 버킷에서 기본으로 활성화된다

**정답:** B

**선지별 해설:**
- **A) 객체 수준 버전 관리:** 버전 관리는 버킷 수준에서 활성화됩니다. 개별 객체에 대해 선택적으로 활성화/비활성화할 수 없습니다. 버킷 전체에 적용됩니다.
- **B) 버전 "null" (정답):** 올바른 설명입니다. 버전 관리가 활성화되기 전에 이미 버킷에 존재하던 파일은 버전 ID가 "null"입니다. 버전 관리 활성화 이후 업로드되는 파일부터 고유한 버전 ID가 할당됩니다.
- **C) 일시 중지 시 이전 버전 삭제:** 버전 관리를 일시 중지(Suspend)해도 이미 존재하는 이전 버전은 삭제되지 않습니다. 일시 중지 후에는 새로 업로드되는 객체에 버전 ID가 "null"로 할당됩니다.
- **D) 기본 활성화:** 새 S3 버킷에서는 버전 관리가 기본적으로 비활성화(disabled)되어 있습니다. 명시적으로 활성화해야 합니다. 한번 활성화하면 비활성화는 불가능하고 일시 중지(Suspend)만 가능합니다.

**핵심 개념:** S3 Versioning — 버킷 수준 설정, 활성화 전 파일은 version "null"

---
