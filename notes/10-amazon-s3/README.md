# Amazon S3

## 개요
Amazon S3(Simple Storage Service)는 AWS의 핵심 객체 스토리지 서비스로, "무한 확장" 스토리지를 제공한다. SAA-C03 시험에서 S3는 가장 많이 출제되는 서비스 중 하나이며, 스토리지 클래스, 버저닝, 복제, 보안 정책을 정확히 이해해야 한다.

## 핵심 개념

### S3 사용 사례
- 백업 및 스토리지
- 재해 복구
- 아카이브
- 하이브리드 클라우드 스토리지
- 애플리케이션 호스팅
- 미디어 호스팅
- 데이터 레이크 & 빅데이터 분석
- 소프트웨어 전달
- 정적 웹사이트 호스팅

### S3 버킷 (Bucket)
> **초보자 포인트**: S3는 "무한 용량의 USB 드라이브"처럼 생각하면 쉽다. 버킷(Bucket)은 USB 드라이브 자체이고, 객체(Object)는 그 안에 저장된 파일이다. 단, 실제 폴더 구조가 없고 파일 경로 전체가 파일 이름(Key)이 된다.

- 객체(파일)를 저장하는 컨테이너 (디렉터리 개념)
- **전역적으로 고유한 이름** (모든 리전, 모든 계정에서 - 전 세계에서 단 하나뿐인 이름이어야 함)
- **리전 레벨**에서 생성 (글로벌 서비스처럼 보이지만 버킷은 특정 리전에 속함)
- 명명 규칙:
  - 대문자, 밑줄 불가
  - 3~63자
  - IP 형식 불가
  - 소문자 또는 숫자로 시작
  - `xn--` 접두사, `-s3alias` 접미사 불가

### S3 객체 (Object)
- **Key**: 객체의 전체 경로 (예: `s3://my-bucket/folder/file.txt`)
  - Key = Prefix + Object Name
  - 예) `s3://my-bucket/images/2024/photo.jpg` 에서 Key는 `images/2024/photo.jpg` 전체
  - S3 콘솔에서 폴더처럼 보이지만, 실제로는 슬래시(`/`)가 포함된 긴 파일 이름일 뿐임. 진짜 폴더 구조가 아님
- S3에 "디렉터리" 개념은 없음 (슬래시를 포함한 긴 키 이름으로 폴더처럼 보이게 만드는 것)
- **최대 객체 크기: 5TB** (약 5,000GB)
- **5GB 초과 업로드 시 Multi-Part Upload 필수** (파일을 여러 조각으로 나눠 병렬 업로드)
- Metadata: 텍스트 키/값 쌍
- Tags: Unicode 키/값 쌍 (최대 10개), 보안/수명주기에 유용
- Version ID: 버저닝 활성화 시

### S3 보안

#### 사용자 기반 (User-Based)
- **IAM Policy**: 특정 사용자에 대한 API 호출 허용/거부

#### 리소스 기반 (Resource-Based)
- **Bucket Policy**: 버킷 전체 규칙, 크로스 계정 허용 가능
- **Object ACL**: 세밀한 제어 (비활성화 가능)
- **Bucket ACL**: 덜 일반적 (비활성화 가능)

#### 접근 규칙
- IAM 권한이 허용 **또는** 리소스 정책이 허용
- **명시적 DENY가 없어야** 함

### S3 Bucket Policy
- JSON 기반 정책
- 구성 요소: Resources, Effect (Allow/Deny), Actions, Principal
- 사용 사례:
  - 버킷 공개 접근 허용
  - 업로드 시 암호화 강제
  - 크로스 계정 접근 허용

### Block Public Access
- 회사 데이터 유출 방지용
- 버킷이 절대 공개되면 안 되는 경우 활성화
- **계정 레벨**에서도 설정 가능

### S3 정적 웹사이트 호스팅
- S3에서 정적 웹사이트 호스팅 가능
- URL 형식:
  - `http://bucket-name.s3-website-aws-region.amazonaws.com`
  - `http://bucket-name.s3-website.aws-region.amazonaws.com`
- **403 Forbidden**: 버킷 정책에서 공개 읽기 허용 필요

### S3 Versioning (버저닝)

```text
[ S3 버전 관리 흐름 ]

  PUT photo.jpg (v1)     PUT photo.jpg (v2)     DELETE photo.jpg
       │                       │                       │
       ▼                       ▼                       ▼
  ┌──────────┐           ┌──────────┐           ┌──────────────┐
  │ photo.jpg │           │ photo.jpg │           │ Delete Marker │ ← 최신
  │ Version:1 │           │ Version:2 │ ← 최신    │ (삭제 표시)    │
  └──────────┘           │ Version:1 │           │ Version:2     │
                         └──────────┘           │ Version:1     │
                                                └──────────────┘

  * 버저닝 활성화 전 업로드 파일: Version = "null"
  * Delete Marker 제거 → 이전 버전 복원 가능
  * 버저닝 일시 중지 → 이전 버전은 삭제되지 않음
```

- **버킷 레벨**에서 활성화
- 같은 키로 덮어쓰기 시 버전 1, 2, 3... 생성
- 모범 사례: 버저닝 활성화 권장
  - 실수 삭제 방지 (버전 복원 가능)
  - 이전 버전으로 쉬운 롤백
- 참고:
  - 버저닝 활성화 전 파일은 version **"null"**
  - 버저닝 일시 중지해도 이전 버전은 삭제되지 않음

### S3 Replication (복제)

```text
[ S3 Cross-Region Replication (CRR) ]

  ┌─────────────────┐         ASYNC          ┌─────────────────┐
  │  Source Bucket    │─────────────────────▶│  Target Bucket    │
  │  (us-east-1)     │      복제 규칙         │  (eu-west-1)     │
  │  Versioning: ON  │                       │  Versioning: ON  │
  └─────────────────┘                       └─────────────────┘

  [ 복제 체이닝 불가 ]

  Bucket A ──복제──▶ Bucket B ──복제──▶ Bucket C
     │                  │                  │
     │    객체 존재      │   객체 존재       │   객체 없음!
     ▼                  ▼                  ▼
   Object ✓          Object ✓          Object ✗
```

- **버저닝 활성화 필수** (소스 + 대상 모두)
- **CRR (Cross-Region Replication)**: 크로스 리전 복제
  - 사용 사례: 규정 준수, 낮은 지연 접근, 계정 간 복제
- **SRR (Same-Region Replication)**: 같은 리전 복제
  - 사용 사례: 로그 집계, 프로덕션/테스트 간 실시간 복제
- 서로 다른 AWS 계정 간 가능
- **비동기** 복제
- IAM 권한 필요

#### 복제 참고사항
- 활성화 후 **새 객체만** 복제 (기존 객체는 S3 Batch Replication 사용)
- DELETE 작업:
  - Delete Marker 복제 가능 (선택적)
  - **Version ID 삭제는 복제되지 않음** (악의적 삭제 방지)
- **복제 체이닝 없음**: Bucket1 -> Bucket2 -> Bucket3에서 Bucket1 객체가 Bucket3로 복제되지 않음

### S3 Storage Classes (스토리지 클래스)

```text
[ S3 스토리지 클래스 티어 다이어그램 ]

  접근 빈도 높음                                          비용 낮음
  ◀──────────────────────────────────────────────────────▶

  ┌──────────────┐
  │  S3 Standard  │  자주 접근, 99.99% 가용성
  │  (범용)       │
  └──────┬───────┘
         │
         ▼
  ┌──────────────────┐   ┌──────────────────┐
  │  Standard-IA      │   │  One Zone-IA      │
  │  (드문 접근)       │   │  (단일 AZ, 저비용) │
  │  99.9% 가용성     │   │  99.5% 가용성     │
  └──────┬───────────┘   └──────────────────┘
         │
         ▼
  ┌──────────────────────┐
  │  Glacier Instant      │  분기 1회, 밀리초 검색
  │  Retrieval (90일 min) │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │  Glacier Flexible     │  1분~12시간 검색
  │  Retrieval (90일 min) │
  └──────┬───────────────┘
         │
         ▼
  ┌──────────────────────┐
  │  Glacier Deep Archive │  12~48시간 검색
  │  (180일 min)          │  ← 최저 비용
  └──────────────────────┘

  [별도] Intelligent-Tiering: 자동 계층 이동, 검색 비용 없음
  [별도] Express One Zone:   10x 성능, 단일 AZ, AI/ML/HPC
```

#### 내구성과 가용성
- **내구성**: 99.999999999% (11 9's) - 모든 클래스 동일
- **가용성**: 클래스마다 다름

#### S3 Standard (범용)
- 99.99% 가용성
- 자주 접근하는 데이터용
- 낮은 지연, 높은 처리량
- 2개 동시 시설 장애 견딤
- 사용 사례: 빅데이터 분석, 모바일/게임, 콘텐츠 배포

#### S3 Standard-IA (Infrequent Access)
- 99.9% 가용성
- 드물게 접근하지만 빠른 접근이 필요한 데이터
- S3 Standard보다 낮은 비용
- 사용 사례: 재해 복구, 백업

#### S3 One Zone-IA
- 99.5% 가용성
- 단일 AZ에 저장 (AZ 파괴 시 데이터 손실)
- 11 9's 내구성 (단일 AZ 내)
- 사용 사례: 보조 백업, 재생성 가능한 데이터

#### S3 Glacier Instant Retrieval
- **밀리초** 검색
- 분기 1회 접근하는 데이터에 적합
- **최소 보관 기간: 90일**

#### S3 Glacier Flexible Retrieval
- 검색 옵션:
  - **Expedited**: 1~5분
  - **Standard**: 3~5시간
  - **Bulk**: 5~12시간 (무료)
- **최소 보관 기간: 90일**

#### S3 Glacier Deep Archive
- 장기 보관용
- **Standard**: 12시간, **Bulk**: 48시간
- **최소 보관 기간: 180일**

#### S3 Intelligent-Tiering
- 소액의 월별 모니터링 및 자동 계층 이동 비용
- **검색 비용 없음**
- 자동 계층:
  - Frequent Access (기본)
  - Infrequent Access (30일 미접근)
  - Archive Instant Access (90일 미접근)
- 선택적 계층:
  - Archive Access (90~700+ 일)
  - Deep Archive Access (180~700+ 일)

### S3 Express One Zone
- 고성능, **단일 AZ** 스토리지
- **Directory Bucket**에 객체 저장
- **초당 수십만 요청**, 한 자릿수 밀리초 지연
- S3 Standard 대비 **10배 성능**, **50% 낮은 비용**
- 99.999999999% 내구성, 99.95% 가용성
- 컴퓨팅과 스토리지를 같은 AZ에 배치하여 지연 감소
- 사용 사례: AI/ML 훈련, 금융 모델링, 미디어 처리, HPC
- SageMaker, Athena, EMR, Glue와 통합

### 스토리지 클래스 비교표
| 클래스 | 가용성 | AZ 수 | 최소 보관 | 검색 시간 |
|--------|--------|--------|-----------|-----------|
| Standard | 99.99% | >= 3 | 없음 | 즉시 |
| Intelligent-Tiering | 99.9% | >= 3 | 없음 | 즉시 |
| Standard-IA | 99.9% | >= 3 | 30일 | 즉시 |
| One Zone-IA | 99.5% | 1 | 30일 | 즉시 |
| Glacier Instant | 99.9% | >= 3 | 90일 | 밀리초 |
| Glacier Flexible | 99.99% | >= 3 | 90일 | 1분~12시간 |
| Glacier Deep Archive | 99.99% | >= 3 | 180일 | 12~48시간 |
| Express One Zone | 99.95% | 1 | 없음 | 한 자릿수 ms |

## 시험 포인트
- **S3는 글로벌 서비스처럼 보이지만 버킷은 리전에 생성**된다
- **최대 객체 크기 5TB**, 5GB 초과 시 **Multi-Part Upload 필수**
- **버킷 이름은 전역적으로 고유**해야 함
- **버저닝 활성화 전 파일은 version "null"**
- **복제 시 버저닝 필수**, 기존 객체는 S3 Batch Replication
- **복제 체이닝 없음**
- **Version ID 삭제는 복제되지 않음** (악의적 삭제 방지)
- **IAM 정책 OR 리소스 정책 허용 + 명시적 DENY 없음** = 접근 허용
- **403 Forbidden**: 버킷 정책에서 공개 읽기 미허용 시 정적 웹사이트에서 발생
- **Glacier Deep Archive가 가장 저렴**, 최소 180일 보관
- **S3 Intelligent-Tiering은 검색 비용 없음**
- **One Zone-IA**: AZ 파괴 시 데이터 손실 -> 재생성 가능한 데이터에만 사용

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| S3 Standard | 자주 접근, 99.99% 가용성, 범용 |
| S3 Standard-IA | 드문 접근, 빠른 검색, 재해 복구/백업 |
| S3 One Zone-IA | 단일 AZ, 99.5%, 재생성 가능 데이터 |
| Glacier Instant | 분기 1회 접근, 밀리초 검색, 90일 최소 |
| Glacier Flexible | Expedited 1-5분, Standard 3-5시간, 90일 최소 |
| Glacier Deep Archive | 12-48시간 검색, 180일 최소, 최저 비용 |
| Intelligent-Tiering | 자동 계층 이동, 검색 비용 없음 |
| Express One Zone | 10x 성능, 단일 AZ, AI/ML/HPC |
| Versioning | 버킷 레벨, 실수 삭제 방지, null 버전 |
| CRR | 크로스 리전 복제, 규정 준수/지연 감소 |
| SRR | 같은 리전 복제, 로그 집계 |
| Multi-Part Upload | 5GB 초과 시 필수, 100MB 초과 시 권장 |

---

## Practice Questions

### Q1. A company needs to store 10TB of data in Amazon S3. The data is accessed once a quarter for reporting purposes and must be retrieved within milliseconds when needed. Which storage class is MOST cost-effective?
**Options:**
- A) S3 Standard
- B) S3 Standard-IA
- C) S3 Glacier Instant Retrieval
- D) S3 Glacier Flexible Retrieval

**Answer:** C

**해설:**

> **문제:** 회사가 10TB의 데이터를 Amazon S3에 저장해야 한다. 데이터는 보고 목적으로 분기에 한 번 접근하며, 필요할 때 밀리초 이내에 검색해야 한다. 가장 비용 효율적인 스토리지 클래스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 Standard |
| B | S3 Standard-IA |
| C | S3 Glacier Instant Retrieval |
| D | S3 Glacier Flexible Retrieval |

**상세 풀이:** S3 Glacier Instant Retrieval은 분기에 한 번 정도 접근하는 데이터에 최적화된 스토리지 클래스로, 밀리초 단위의 검색 성능을 제공하면서도 Standard-IA보다 낮은 스토리지 비용을 제공한다. 최소 보관 기간은 90일이다. S3 Standard(A)는 자주 접근하는 데이터에 적합하며 분기 1회 접근 패턴에는 스토리지 비용이 불필요하게 높다. Standard-IA(B)도 드문 접근 데이터에 사용 가능하지만 Glacier Instant Retrieval보다 스토리지 비용이 높다. Glacier Flexible Retrieval(D)은 스토리지 비용은 더 낮지만 검색에 최소 1분에서 최대 12시간이 소요되므로 "밀리초 이내 검색"이라는 요구사항을 충족하지 못한다.

**핵심 개념:** S3 Glacier Instant Retrieval

---

### Q2. A company has an S3 bucket in us-east-1 and needs to replicate data to a bucket in eu-west-1 for disaster recovery. What prerequisites must be met? (Select TWO)
**Options:**
- A) Both buckets must have versioning enabled
- B) Both buckets must be in the same AWS account
- C) S3 must be given proper IAM permissions
- D) Both buckets must use the same storage class
- E) Server-side encryption must be enabled

**Answer:** A, C

**해설:**

> **문제:** 회사가 us-east-1에 S3 버킷을 가지고 있으며, 재해 복구를 위해 eu-west-1의 버킷으로 데이터를 복제해야 한다. 어떤 전제 조건을 충족해야 하는가? (두 개 선택)

| 선지 | 번역 |
|------|------|
| A | 두 버킷 모두 버저닝이 활성화되어야 한다 |
| B | 두 버킷이 같은 AWS 계정에 있어야 한다 |
| C | S3에 적절한 IAM 권한이 부여되어야 한다 |
| D | 두 버킷이 같은 스토리지 클래스를 사용해야 한다 |
| E | 서버 측 암호화가 활성화되어야 한다 |

**상세 풀이:** S3 Cross-Region Replication(CRR)의 필수 전제 조건은 소스와 대상 버킷 모두 버저닝이 활성화(A)되어야 하며, S3 복제 서비스가 소스 버킷에서 읽고 대상 버킷에 쓸 수 있는 적절한 IAM 권한(C)이 설정되어야 한다. S3 복제는 서로 다른 AWS 계정 간에도 가능하므로 같은 계정일 필요가 없다(B 오답). 소스와 대상 버킷이 서로 다른 스토리지 클래스를 사용해도 복제가 가능하며, 복제 규칙에서 대상의 스토리지 클래스를 별도로 지정할 수도 있다(D 오답). 서버 측 암호화는 복제의 필수 조건이 아니며, 암호화되지 않은 객체도 복제할 수 있다(E 오답).

**핵심 개념:** S3 Replication Prerequisites

---

### Q3. A company hosts a static website on S3 and receives a 403 Forbidden error when accessing the site. What is the MOST likely cause?
**Options:**
- A) The S3 bucket does not have versioning enabled
- B) The S3 bucket policy does not allow public read access
- C) The S3 bucket is not in the correct region
- D) The objects are encrypted with SSE-KMS

**Answer:** B

**해설:**

> **문제:** 회사가 S3에서 정적 웹사이트를 호스팅하고 있으며, 사이트에 접근할 때 403 Forbidden 에러가 발생한다. 가장 가능성 높은 원인은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 버킷에 버저닝이 활성화되지 않았다 |
| B | S3 버킷 정책이 공개 읽기 접근을 허용하지 않는다 |
| C | S3 버킷이 올바른 리전에 있지 않다 |
| D | 객체가 SSE-KMS로 암호화되어 있다 |

**상세 풀이:** S3 정적 웹사이트 호스팅에서 403 Forbidden 에러가 발생하는 가장 흔한 원인은 버킷 정책에서 공개 읽기(s3:GetObject)를 허용하지 않았거나, Block Public Access 설정이 활성화되어 공개 접근이 차단된 경우이다. 정적 웹사이트는 익명 사용자의 읽기 접근이 필요하므로 버킷 정책에서 Principal을 "*"로 설정하여 공개 읽기를 허용해야 한다. 버저닝(A)은 정적 웹사이트 호스팅의 필수 요건이 아니며 403 에러와 무관하다. 리전(C)은 S3 웹사이트 URL에 반영되므로 잘못된 리전 접근이라면 다른 에러가 발생한다. SSE-KMS 암호화(D)가 403을 유발할 수 있는 경우도 있지만, 정적 웹사이트에서 가장 일반적인 원인은 버킷 정책 미설정이다.

**핵심 개념:** S3 Static Website Hosting

---

### Q4. A company wants to automatically move objects to a cheaper storage class after they become infrequently accessed, without manual intervention. The access pattern is unpredictable. Which storage class should they use?
**Options:**
- A) S3 Standard-IA
- B) S3 One Zone-IA
- C) S3 Intelligent-Tiering
- D) S3 Glacier Flexible Retrieval

**Answer:** C

**해설:**

> **문제:** 회사가 객체가 드물게 접근되기 시작하면 수동 개입 없이 자동으로 더 저렴한 스토리지 클래스로 이동하려 한다. 접근 패턴은 예측 불가능하다. 어떤 스토리지 클래스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | S3 Standard-IA |
| B | S3 One Zone-IA |
| C | S3 Intelligent-Tiering |
| D | S3 Glacier Flexible Retrieval |

**상세 풀이:** S3 Intelligent-Tiering은 객체의 접근 패턴을 자동으로 모니터링하고 접근 빈도에 따라 Frequent Access, Infrequent Access(30일 미접근), Archive Instant Access(90일 미접근) 등 적절한 계층으로 자동 이동한다. 예측 불가능한 접근 패턴에 가장 적합하며, 검색 비용이 없고 소액의 월별 모니터링 비용만 부과된다. Standard-IA(A)는 드문 접근 데이터용이지만 객체를 처음부터 이 클래스에 저장하거나 Lifecycle Rule을 수동으로 설정해야 하며, 접근 패턴이 예측 불가능하면 비용이 최적화되지 않을 수 있다. One Zone-IA(B)도 마찬가지로 수동 설정이 필요하며 단일 AZ에만 저장되어 가용성이 낮다. Glacier Flexible Retrieval(D)은 검색 시간이 1분에서 12시간으로 길어 빈번한 접근이 간헐적으로 발생하는 데이터에는 부적합하다.

**핵심 개념:** S3 Intelligent-Tiering

---

### Q5. A company needs to upload a 10GB file to Amazon S3. Which upload method is REQUIRED?
**Options:**
- A) Single PUT operation
- B) Multi-Part Upload
- C) S3 Transfer Acceleration
- D) AWS Snowball

**Answer:** B

**해설:**

> **문제:** 회사가 10GB 파일을 Amazon S3에 업로드해야 한다. 어떤 업로드 방법이 필수인가?

| 선지 | 번역 |
|------|------|
| A | 단일 PUT 작업 |
| B | Multi-Part Upload |
| C | S3 Transfer Acceleration |
| D | AWS Snowball |

**상세 풀이:** S3의 단일 PUT 작업은 최대 5GB까지만 지원하므로, 10GB 파일은 단일 PUT으로 업로드할 수 없어(A 불가) Multi-Part Upload를 반드시 사용해야 한다. Multi-Part Upload는 5GB 초과 시 필수이며, 100MB 초과 시에도 권장된다. 파일을 여러 부분으로 나누어 병렬로 업로드하므로 전송 속도도 향상되고, 일부 파트 실패 시 해당 파트만 재전송할 수 있어 안정성도 높다. S3 Transfer Acceleration(C)은 Edge Location을 경유하여 장거리 전송 속도를 높이는 기능이지만 업로드 방법의 필수 요건이 아니다. AWS Snowball(D)은 테라바이트/페타바이트 규모의 대량 데이터 물리적 마이그레이션용으로 10GB 파일 하나를 업로드하는 데는 과도하다.

**핵심 개념:** Multi-Part Upload

---

### Q6. An organization has S3 Replication configured from Bucket A to Bucket B. Bucket B has replication configured to Bucket C. An object is uploaded to Bucket A. Where will this object exist?
**Options:**
- A) Bucket A, Bucket B, and Bucket C
- B) Bucket A and Bucket B only
- C) Bucket A only
- D) All three buckets, but with different version IDs

**Answer:** B

**해설:**

> **문제:** 조직이 Bucket A에서 Bucket B로 S3 복제를 구성했다. Bucket B에는 Bucket C로의 복제가 구성되어 있다. Bucket A에 객체가 업로드되면 이 객체는 어디에 존재하게 되는가?

| 선지 | 번역 |
|------|------|
| A | Bucket A, Bucket B, Bucket C 모두 |
| B | Bucket A와 Bucket B에만 |
| C | Bucket A에만 |
| D | 세 버킷 모두, 단 서로 다른 버전 ID를 가짐 |

**상세 풀이:** S3 복제는 체이닝(chaining)을 지원하지 않는다. Bucket A에 업로드된 객체는 복제 규칙에 의해 Bucket B로 복제되지만, Bucket B의 복제 규칙에 의해 Bucket C로 다시 복제되지 않는다. 이는 복제된 객체가 대상 버킷에서 다시 복제 이벤트를 트리거하지 않도록 설계된 것이다. 따라서 객체는 Bucket A와 Bucket B에만 존재한다. 만약 Bucket A의 객체를 Bucket C에도 복제하고 싶다면, Bucket A에서 Bucket C로의 별도 복제 규칙을 직접 구성해야 한다.

**핵심 개념:** S3 Replication Chaining

---

### Q7. A company needs to store long-term archive data for 7 years with the lowest possible cost. Data retrieval is very rare and can tolerate a wait time of up to 48 hours. Which S3 storage class should they use?
**Options:**
- A) S3 Glacier Instant Retrieval
- B) S3 Glacier Flexible Retrieval
- C) S3 Glacier Deep Archive
- D) S3 Standard-IA

**Answer:** C

**해설:**

> **문제:** 회사가 7년간 장기 아카이브 데이터를 가장 낮은 비용으로 저장해야 한다. 데이터 검색은 매우 드물며 최대 48시간까지의 대기 시간을 허용할 수 있다. 어떤 S3 스토리지 클래스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | S3 Glacier Instant Retrieval |
| B | S3 Glacier Flexible Retrieval |
| C | S3 Glacier Deep Archive |
| D | S3 Standard-IA |

**상세 풀이:** S3 Glacier Deep Archive는 모든 S3 스토리지 클래스 중 가장 저렴한 스토리지 비용을 제공하며, 장기 아카이브에 최적화되어 있다. Standard 검색(12시간)과 Bulk 검색(48시간)을 제공하므로 48시간 대기 시간 허용 요구사항을 충족한다. 최소 보관 기간은 180일이며 7년 장기 보관에 적합하다. Glacier Instant Retrieval(A)은 밀리초 검색을 제공하지만 스토리지 비용이 Deep Archive보다 높으므로 검색이 매우 드문 경우 불필요한 비용이 든다. Glacier Flexible Retrieval(B)도 Deep Archive보다 스토리지 비용이 높으며, 검색 속도가 빠른 옵션이 필요하지 않으므로 비용 최적화 관점에서 적합하지 않다. Standard-IA(D)는 즉시 접근이 가능한 스토리지로 아카이브 데이터에는 비용이 과도하다.

**핵심 개념:** S3 Glacier Deep Archive

---

### Q8. Which of the following statements about S3 versioning is TRUE?
**Options:**
- A) Versioning can be enabled at the object level
- B) Files uploaded before versioning was enabled will have version "null"
- C) Suspending versioning deletes all previous versions
- D) Versioning is enabled by default on all new buckets

**Answer:** B

**해설:**

> **문제:** S3 버저닝에 대한 다음 설명 중 올바른 것은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 버저닝은 객체 수준에서 활성화할 수 있다 |
| B | 버저닝 활성화 전에 업로드된 파일은 버전 "null"을 갖는다 |
| C | 버저닝을 일시 중지하면 이전 버전이 모두 삭제된다 |
| D | 버저닝은 모든 새 버킷에 기본적으로 활성화되어 있다 |

**상세 풀이:** 버저닝이 활성화되기 전에 이미 버킷에 업로드되어 있던 파일은 버전 ID가 "null"로 표시된다. 이후 같은 키로 새 파일을 업로드하면 새로운 버전 ID가 부여되지만, 기존 파일은 "null" 버전으로 유지된다. 버저닝은 객체 수준이 아닌 버킷 수준에서 활성화/비활성화하므로 A는 오답이다. 버저닝을 일시 중지(suspend)하면 새로운 버전 생성이 중단되지만, 이미 존재하는 이전 버전들은 삭제되지 않고 그대로 보존되므로 C도 오답이다. S3 버킷은 기본적으로 버저닝이 비활성화된 상태로 생성되며 사용자가 명시적으로 활성화해야 하므로 D도 오답이다.

**핵심 개념:** S3 Versioning
