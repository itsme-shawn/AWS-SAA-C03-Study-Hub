# RDS, Aurora & ElastiCache

## 개요
AWS의 관리형 관계형 데이터베이스(RDS), 고성능 독자 데이터베이스(Aurora), 인메모리 캐시(ElastiCache) 서비스를 다루는 섹션이다. SAA-C03 시험에서 데이터베이스 관련 문제는 매우 빈번하게 출제되며, 특히 Read Replica vs Multi-AZ, Aurora의 특징, ElastiCache의 Redis vs Memcached 비교가 핵심이다.

## 핵심 개념

### Amazon RDS (Relational Database Service)
- **지원 엔진**: PostgreSQL, MySQL, MariaDB, Oracle, MS SQL Server, IBM DB2, Aurora
- **관리형 서비스 특징**:
  - 자동 프로비저닝, OS 패칭
  - 지속적 백업 및 특정 시점 복원 (Point in Time Restore)
  - 모니터링 대시보드
  - Read Replica, Multi-AZ 지원
  - 수직/수평 스케일링
  - EBS 기반 스토리지
- **SSH 접속 불가** (RDS Custom 제외)

### RDS Storage Auto Scaling
- 여유 스토리지가 할당 스토리지의 **10% 미만**일 때 자동 확장
- 저장소 부족이 **최소 5분** 지속되어야 함
- 마지막 수정 후 **6시간** 경과 필요
- **Maximum Storage Threshold** 설정 필수

### RDS Read Replicas

```text
                    ┌──────────────┐
                    │  Application  │
                    └──────┬───────┘
                           │
               ┌───────────┴───────────┐
               │ Writes                 │ Reads
               ▼                        ▼
        ┌──────────┐           ┌──────────────┐
        │  Master   │──ASYNC──▶│ Read Replica  │ (동일 AZ / Cross AZ / Cross Region)
        │   DB      │──ASYNC──▶│ Read Replica  │ (최대 15개)
        └──────────┘           └──────────────┘
               │
               │  승격 (Promote)
               ▼
        ┌──────────────┐
        │  독립 DB로     │  ← 승격 후 복제 중단,
        │  승격된 Replica │    독립적인 DB로 운영
        └──────────────┘
```

- 최대 **15개** Read Replica
- **동일 AZ, Cross AZ, Cross Region** 가능
- **비동기(ASYNC)** 복제 -> 읽기 최종 일관성 (Eventually Consistent)
  - **ASYNC vs SYNC 비유**:
    - **ASYNC(비동기) = 편지**: 마스터 DB에 데이터를 쓴 다음, 나중에 여유가 생기면 Read Replica에도 전달. 쓰기 응답이 빠르지만 잠시 동안 Replica가 최신 데이터가 아닐 수 있음 (Read Replica에서 사용)
    - **SYNC(동기) = 전화통화**: 마스터 DB에 쓰는 동시에 Standby에도 동시에 반영. 두 곳 모두 성공해야 쓰기 완료. 항상 동일한 데이터가 보장되지만 쓰기 속도가 약간 느려짐 (Multi-AZ에서 사용)
  - **Eventually Consistent(최종 일관성)**: ASYNC 복제 특성상, 방금 마스터에 쓴 데이터를 Read Replica에서 즉시 읽으면 아직 반영되지 않아 이전 데이터가 보일 수 있음. 하지만 시간이 지나면(보통 밀리초~수초) 결국 동일한 데이터로 맞춰짐. 즉 "지금 당장은 틀릴 수 있지만, 결국에는 일치한다"는 의미
- Replica를 독립 DB로 승격 가능
- 애플리케이션이 연결 문자열을 업데이트해야 함
- **SELECT(읽기)** 전용 (INSERT/UPDATE/DELETE 불가)
- **같은 리전 내 Cross AZ 복제는 네트워크 비용 무료**, Cross Region은 유료

### RDS Multi-AZ (재해 복구)

```text
┌──────────────────────────────────────────────────────┐
│                    AWS Region                         │
│                                                      │
│  ┌─────────────────┐       ┌─────────────────┐       │
│  │   AZ-a           │       │   AZ-b           │       │
│  │                  │       │                  │       │
│  │  ┌────────────┐ │ SYNC  │ ┌────────────┐  │       │
│  │  │  RDS Master │─┼──────▶│ │ RDS Standby │  │       │
│  │  └──────┬─────┘ │       │ └────────────┘  │       │
│  │         │        │       │       ▲          │       │
│  └─────────┼────────┘       └───────┼──────────┘       │
│            │                        │                  │
│     ┌──────┴────────────────────────┘                  │
│     │                                                  │
│  ┌──┴──────────────────┐                               │
│  │  하나의 DNS Endpoint  │  ← 자동 장애 조치 (Failover)  │
│  └─────────────────────┘                               │
└──────────────────────────────────────────────────────┘
         ▲
         │
   ┌─────┴─────┐
   │ Application │
   └───────────┘
```

- **동기(SYNC)** 복제
- **하나의 DNS 이름** -> 자동 장애 조치(failover)
- 가용성 향상 목적 (스케일링 아님)
- Read Replica도 Multi-AZ로 설정 가능
- Single-AZ에서 Multi-AZ 전환 시 **다운타임 없음** (스냅샷 -> 복원 -> 동기화)

### RDS Custom
- Oracle 및 MS SQL Server 전용
- 기본 OS 및 DB에 대한 **전체 관리자 접근** 가능
- SSH 또는 SSM Session Manager로 EC2 인스턴스 접근 가능
- 커스터마이징 시 Automation Mode 비활성화 권장 (스냅샷 먼저 생성)

### Amazon Aurora
- AWS 독자 기술 (PostgreSQL, MySQL 호환)
- MySQL 대비 **5배**, PostgreSQL 대비 **3배** 성능 향상
- 스토리지 자동 확장: **10GB ~ 128TB** (256TB까지)
- 최대 **15개 Read Replica** (10ms 미만 복제 지연)
- **즉각적 장애 조치** (HA 네이티브)
- RDS 대비 **20% 비용 증가**

### Aurora 고가용성 및 스토리지

```text
┌───────────────────────────────────────────────────────────────┐
│                       Aurora Cluster                           │
│                                                               │
│   ┌───────────┐    ┌───────────┐    ┌───────────┐            │
│   │   AZ-a     │    │   AZ-b     │    │   AZ-c     │            │
│   │            │    │            │    │            │            │
│   │ ┌───────┐ │    │ ┌───────┐ │    │ ┌───────┐ │            │
│   │ │ Copy 1│ │    │ │ Copy 3│ │    │ │ Copy 5│ │            │
│   │ │ Copy 2│ │    │ │ Copy 4│ │    │ │ Copy 6│ │            │
│   │ └───────┘ │    │ └───────┘ │    │ └───────┘ │            │
│   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘            │
│         └────────────────┼────────────────┘                   │
│                          │                                     │
│            ┌─────────────┴─────────────┐                       │
│            │  Shared Storage Volume     │                       │
│            │  (자가 치유, 자동 확장)       │                       │
│            │  10GB ~ 128TB              │                       │
│            └───────────────────────────┘                       │
│                          │                                     │
│         ┌────────────────┼────────────────┐                   │
│         ▼                ▼                ▼                    │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐               │
│   │  Writer   │    │  Reader  │    │  Reader  │  (최대 15개)  │
│   │ (Master)  │    │ Replica  │    │ Replica  │               │
│   └──────────┘    └──────────┘    └──────────┘               │
│         │                ▲                ▲                    │
│         │                │                │                    │
│  Writer Endpoint    Reader Endpoint (로드밸런싱)               │
└───────────────────────────────────────────────────────────────┘
```

- **3개 AZ에 걸쳐 6개 데이터 복사본**
  - 쓰기: 6개 중 4개 필요
  - 읽기: 6개 중 3개 필요
- 자가 치유(Self Healing), 피어 투 피어 복제
- 스토리지가 수백 개 볼륨에 걸쳐 스트라이핑
- 마스터 자동 장애 조치: **30초 이내**

### Aurora 엔드포인트
- **Writer Endpoint**: 마스터를 가리킴
- **Reader Endpoint**: 읽기 복제본 간 연결 로드 밸런싱
- **Custom Endpoint**: 특정 복제본 서브셋 지정 (분석 쿼리 등)

### Aurora Serverless
- 실제 사용량 기반 자동 인스턴스 생성 및 오토스케일링
- 간헐적/예측 불가능한 워크로드에 적합
- 용량 계획 불필요, 초당 과금

### Aurora Global Database
- 1개 Primary Region (읽기/쓰기)
- 최대 **5개 Secondary Region** (읽기 전용), 복제 지연 **1초 미만**
- Secondary Region당 최대 **16개 Read Replica**
- 재해 복구 승격 RTO: **1분 미만**

### Aurora Machine Learning
- SQL을 통해 ML 예측 통합
- Amazon SageMaker, Amazon Comprehend 지원
- 사기 탐지, 감성 분석, 제품 추천 등

### Babelfish for Aurora PostgreSQL
- Aurora PostgreSQL에서 MS SQL Server 명령(T-SQL) 이해 가능
- MS SQL Server 기반 애플리케이션을 코드 변경 없이 Aurora PostgreSQL로 마이그레이션

### RDS & Aurora 백업
- **RDS 자동 백업**: 1~35일 보존, 5분마다 트랜잭션 로그 백업, 0으로 설정하면 비활성화
- **Aurora 자동 백업**: 1~35일 (비활성화 불가)
- **수동 DB 스냅샷**: 원하는 기간 동안 보존
- 팁: 중지된 RDS DB도 스토리지 비용 발생 -> 장기 중지 시 스냅샷 후 삭제 권장

### RDS & Aurora 복원
- 백업/스냅샷 복원 시 **새 데이터베이스 생성**
- MySQL RDS: S3에서 백업 복원 가능
- MySQL Aurora: **Percona XtraBackup**으로 S3에서 복원

### Aurora Database Cloning
- 기존 Aurora 클러스터에서 새 클러스터 생성
- **Copy-on-Write** 프로토콜 사용 (빠르고 비용 효율적)
- 프로덕션에서 스테이징 DB 생성에 유용

### RDS & Aurora 보안
- **저장 시 암호화**: AWS KMS, 마스터 미암호화 시 Replica도 암호화 불가
- **전송 중 암호화**: TLS (기본 지원)
- **IAM 인증**: IAM 역할로 DB 연결 가능
- **보안 그룹**: 네트워크 접근 제어
- **감사 로그**: CloudWatch Logs로 전송 가능

### Amazon RDS Proxy
- RDS용 완전 관리형 데이터베이스 프록시
- DB 연결 풀링으로 리소스 부담 감소
- 서버리스, 오토스케일링, Multi-AZ
- RDS/Aurora **장애 조치 시간 66% 단축**
- IAM 인증 강제, Secrets Manager로 자격 증명 저장
- **VPC 내부에서만 접근 가능** (공개 접근 불가)
- Lambda 함수와의 연동에 특히 유용

### Amazon ElastiCache
- **관리형 Redis 또는 Memcached**
- 인메모리 DB로 고성능, 저지연
- 읽기 집중 워크로드에서 DB 부하 감소
- 애플리케이션 무상태(Stateless)화에 기여
- **애플리케이션 코드 변경 필요**

### ElastiCache 아키텍처 패턴
- **DB Cache**: Cache Hit -> ElastiCache에서 반환, Cache Miss -> RDS에서 읽고 캐시에 저장
- **User Session Store**: 세션 데이터를 ElastiCache에 저장하여 인스턴스 간 상태 공유

### Redis vs Memcached
| 특성 | Redis | Memcached |
|------|-------|-----------|
| 고가용성 | Multi-AZ, Auto-Failover | 없음 |
| Read Replica | 지원 | 미지원 |
| 데이터 영속성 | AOF persistence | 비영속적 |
| 백업/복원 | 지원 | 서버리스만 지원 |
| 데이터 구조 | Sets, Sorted Sets 등 | 단순 키-값 |
| 아키텍처 | 복제 | 멀티 스레드, 샤딩 |

### ElastiCache 보안
- Redis: IAM 인증 지원, Redis AUTH (비밀번호/토큰), SSL 암호화
- Memcached: SASL 기반 인증

### ElastiCache 캐싱 패턴

```text
[ Lazy Loading (Cache-Aside) ]

  Application ──1. GET──▶ ElastiCache
       │                     │
       │              Cache Hit? ──Yes──▶ 2. 데이터 반환
       │                     │
       │                    No (Cache Miss)
       │                     │
       │◀──3. DB에서 읽기────┘
       │
       ▼
     RDS DB ──4. 데이터 반환──▶ Application ──5. 캐시에 저장──▶ ElastiCache


[ Write Through ]

  Application ──1. DB에 쓰기──▶ RDS DB
       │
       └──────2. 캐시 업데이트──▶ ElastiCache
                                    │
                                    ▼
                           항상 최신 데이터 유지
                           (쓰기 지연 증가)
```

- **Lazy Loading**: 읽기 데이터 캐싱, 데이터 오래될 수 있음
- **Write Through**: DB 쓰기 시 캐시도 업데이트 (오래된 데이터 없음)
- **Session Store**: TTL을 활용한 임시 세션 데이터 저장

### Redis 사용 사례
- **Gaming Leaderboard**: Redis Sorted Sets로 실시간 순위표 구현

## 시험 포인트
- **Read Replica vs Multi-AZ**: Read Replica는 읽기 성능 향상(ASYNC), Multi-AZ는 재해 복구(SYNC)
  - **언제 뭘 쓰나요?** → 읽기 트래픽이 많아서 DB가 느릴 때: Read Replica 추가 / 장애 발생 시 자동으로 서비스를 유지해야 할 때: Multi-AZ 설정 / 둘 다 필요하면 동시에 사용 가능
- **같은 리전 내 Read Replica 복제 비용은 무료**, Cross Region은 유료
- **Aurora는 자동 백업을 비활성화할 수 없음** (RDS는 0으로 설정 가능)
- **RDS Proxy는 VPC 내부에서만 접근 가능** -> Lambda + RDS 조합에서 자주 출제
- **Aurora Global Database**: RTO < 1분, 복제 지연 < 1초
- **Redis vs Memcached**: 고가용성/영속성 필요 -> Redis, 단순 캐싱/멀티스레드 -> Memcached
- **암호화되지 않은 DB 암호화**: 스냅샷 생성 -> 암호화된 상태로 복원
- **ElastiCache는 코드 변경이 필요**하지만 RDS Proxy는 코드 변경 불필요
- **Aurora Cloning**은 스냅샷 복원보다 빠름 (copy-on-write)

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| RDS Read Replica | 최대 15개, ASYNC, 읽기 성능 향상, 같은 리전 무료 |
| RDS Multi-AZ | SYNC 복제, 자동 장애 조치, 재해 복구 목적 |
| RDS Storage Auto Scaling | 10% 미만 시 자동 확장, Maximum Threshold 설정 |
| RDS Custom | Oracle/MS SQL Server, OS/DB 관리자 접근, SSH 가능 |
| Aurora | MySQL/PostgreSQL 호환, 5x/3x 성능, 6개 복사본/3AZ |
| Aurora Serverless | 예측 불가 워크로드, 초당 과금, 자동 스케일링 |
| Aurora Global DB | 5개 Secondary Region, < 1초 복제, RTO < 1분 |
| Aurora Cloning | Copy-on-Write, 스냅샷보다 빠름, 스테이징 DB 생성 |
| RDS Proxy | 연결 풀링, 장애 조치 66% 단축, VPC 내부 전용 |
| ElastiCache Redis | Multi-AZ, AOF, Sorted Sets, IAM 인증 |
| ElastiCache Memcached | 멀티스레드, 샤딩, 비영속적, SASL 인증 |

---

## Practice Questions

### Q1. A company runs a production MySQL database on Amazon RDS. The database experiences heavy read traffic during business hours. The company wants to offload read traffic without affecting write performance. What should a solutions architect recommend?
**Options:**
- A) Enable Multi-AZ deployment for the RDS instance
- B) Create Read Replicas and direct read traffic to the replica endpoints
- C) Increase the instance size of the RDS instance
- D) Enable RDS Storage Auto Scaling

**Answer:** B

**해설:**

> **문제:** 회사가 Amazon RDS에서 프로덕션 MySQL 데이터베이스를 운영하고 있다. 업무 시간 동안 데이터베이스에 무거운 읽기 트래픽이 발생한다. 쓰기 성능에 영향을 주지 않으면서 읽기 트래픽을 분산하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | RDS 인스턴스에 Multi-AZ 배포를 활성화한다 |
| B | Read Replica를 생성하고 읽기 트래픽을 복제본 엔드포인트로 보낸다 |
| C | RDS 인스턴스의 인스턴스 크기를 늘린다 |
| D | RDS Storage Auto Scaling을 활성화한다 |

**상세 풀이:** Read Replica는 비동기(ASYNC) 복제를 통해 읽기 트래픽을 분산하여 메인 DB의 부하를 줄이는 데 사용되며, 최대 15개까지 생성할 수 있어 읽기 성능을 크게 향상시킬 수 있다. Multi-AZ(A)는 동기(SYNC) 복제를 사용하여 재해 복구 목적으로만 사용되며, Standby 인스턴스는 읽기 트래픽을 처리하지 않으므로 읽기 분산에 적합하지 않다. 인스턴스 크기 증가(C)는 수직 스케일링으로 일시적인 성능 향상은 가능하지만 근본적인 읽기 분산 해결책이 아니며 비용도 크다. Storage Auto Scaling(D)은 스토리지 용량 부족 문제를 해결하는 기능이지 읽기 트래픽 분산과는 무관하다.

**핵심 개념:** RDS Read Replicas

---

### Q2. A company wants to migrate its on-premises Microsoft SQL Server database to AWS with the ability to customize the underlying operating system. Which AWS service should they use?
**Options:**
- A) Amazon RDS for SQL Server
- B) Amazon Aurora
- C) Amazon RDS Custom for SQL Server
- D) Amazon EC2 with SQL Server installed

**Answer:** C

**해설:**

> **문제:** 회사가 온프레미스 Microsoft SQL Server 데이터베이스를 기본 운영 체제를 커스터마이징할 수 있는 상태로 AWS로 마이그레이션하려 한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon RDS for SQL Server |
| B | Amazon Aurora |
| C | Amazon RDS Custom for SQL Server |
| D | SQL Server가 설치된 Amazon EC2 |

**상세 풀이:** RDS Custom은 Oracle과 MS SQL Server에 대해 OS 및 DB에 대한 전체 관리자 접근을 제공하면서도 자동 백업, 패칭 등 RDS의 관리형 서비스 이점을 유지한다. SSH 또는 SSM Session Manager로 기본 EC2 인스턴스에 접근할 수 있어 OS 수준의 커스터마이징이 가능하다. 일반 RDS for SQL Server(A)는 관리형 서비스이지만 OS에 대한 접근이 불가하여 커스터마이징 요구사항을 충족하지 못한다. Aurora(B)는 MySQL과 PostgreSQL만 호환하며 SQL Server를 지원하지 않는다. EC2에 SQL Server 설치(D)는 OS 접근과 커스터마이징이 가능하지만, 백업/패칭/고가용성 등 모든 관리를 직접 해야 하므로 운영 부담이 크다.

**핵심 개념:** RDS Custom

---

### Q3. An application uses Amazon Aurora MySQL as its database. The company needs to create a copy of the production database for testing purposes with minimal cost and time. What is the MOST efficient approach?
**Options:**
- A) Create a manual snapshot and restore it to a new Aurora cluster
- B) Use Aurora Database Cloning
- C) Create a Read Replica and promote it
- D) Use AWS Database Migration Service (DMS)

**Answer:** B

**해설:**

> **문제:** 애플리케이션이 Amazon Aurora MySQL을 데이터베이스로 사용하고 있다. 회사가 최소 비용과 시간으로 테스트 목적의 프로덕션 데이터베이스 복사본을 생성해야 한다. 가장 효율적인 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 수동 스냅샷을 생성하고 새 Aurora 클러스터로 복원한다 |
| B | Aurora Database Cloning을 사용한다 |
| C | Read Replica를 생성하고 승격한다 |
| D | AWS Database Migration Service (DMS)를 사용한다 |

**상세 풀이:** Aurora Database Cloning은 copy-on-write 프로토콜을 사용하여 초기에는 원본과 동일한 데이터 볼륨을 공유하므로 데이터 복사가 즉시 이루어지고 변경된 데이터만 추가 스토리지를 사용하여 매우 빠르고 비용 효율적이다. 스냅샷 복원(A)은 전체 데이터를 복사해야 하므로 Aurora Cloning보다 시간이 더 걸리고 비용도 높다. Read Replica 승격(C)은 프로덕션에서 지속적인 복제 트래픽이 발생하고, 승격 과정이 필요하여 비효율적이다. DMS(D)는 이기종 데이터베이스 간 마이그레이션 도구로 동일 Aurora 환경 내 복제에는 불필요하게 복잡하다.

**핵심 개념:** Aurora Database Cloning

---

### Q4. A company has a serverless application using AWS Lambda functions that frequently connect to an Amazon RDS MySQL database. During peak hours, the database runs out of connections. What should a solutions architect recommend?
**Options:**
- A) Increase the RDS instance size
- B) Use Amazon RDS Proxy
- C) Switch to Amazon Aurora Serverless
- D) Add Read Replicas

**Answer:** B

**해설:**

> **문제:** 회사가 AWS Lambda 함수를 사용하는 서버리스 애플리케이션을 운영하고 있으며, Lambda 함수가 Amazon RDS MySQL 데이터베이스에 자주 연결한다. 피크 시간에 데이터베이스의 연결이 부족해진다. 솔루션 아키텍트는 무엇을 권장해야 하는가?

| 선지 | 번역 |
|------|------|
| A | RDS 인스턴스 크기를 늘린다 |
| B | Amazon RDS Proxy를 사용한다 |
| C | Amazon Aurora Serverless로 전환한다 |
| D | Read Replica를 추가한다 |

**상세 풀이:** RDS Proxy는 DB 연결을 풀링하여 공유함으로써 동시 연결 수를 대폭 줄이고 DB 리소스 부담을 감소시킨다. Lambda 함수는 호출될 때마다 새로운 DB 연결을 생성하므로 동시 실행 수가 많아지면 연결 수가 급증하는데, RDS Proxy가 이를 효과적으로 관리한다. 또한 RDS Proxy는 장애 조치 시간을 66% 단축하고 IAM 인증을 지원한다. 인스턴스 크기 증가(A)는 연결 수 제한을 약간 높일 수 있지만 근본적인 해결책이 아니며 비용 대비 효과가 낮다. Aurora Serverless(C)로 전환하면 스케일링은 자동화되지만 연결 풀링 문제를 직접 해결하지 않으며 마이그레이션 비용이 든다. Read Replica(D)는 읽기 트래픽 분산용이지 연결 수 문제 해결과는 무관하다.

**핵심 개념:** Amazon RDS Proxy

---

### Q5. A company needs a caching solution that supports data persistence, high availability with automatic failover, and complex data types like sorted sets for a real-time leaderboard. Which solution should they choose?
**Options:**
- A) Amazon ElastiCache for Memcached
- B) Amazon ElastiCache for Redis
- C) Amazon DynamoDB DAX
- D) Amazon CloudFront

**Answer:** B

**해설:**

> **문제:** 회사가 데이터 영속성, 자동 장애 조치를 포함한 고가용성, 실시간 리더보드를 위한 정렬된 집합(sorted sets) 같은 복잡한 데이터 타입을 지원하는 캐싱 솔루션이 필요하다. 어떤 솔루션을 선택해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon ElastiCache for Memcached |
| B | Amazon ElastiCache for Redis |
| C | Amazon DynamoDB DAX |
| D | Amazon CloudFront |

**상세 풀이:** Redis는 AOF persistence를 통한 데이터 영속성, Multi-AZ Auto-Failover를 통한 고가용성, Sorted Sets를 포함한 복잡한 데이터 구조를 모두 지원하여 문제의 모든 요구사항을 충족한다. 특히 Redis Sorted Sets는 실시간 게이밍 리더보드 구현에 최적화되어 있다. Memcached(A)는 멀티스레드와 샤딩을 지원하지만 데이터 영속성이 없고, Multi-AZ 고가용성을 지원하지 않으며, 단순 키-값 구조만 제공하여 Sorted Sets를 사용할 수 없다. DynamoDB DAX(C)는 DynamoDB 전용 인메모리 캐시로 DynamoDB 이외의 데이터베이스에서는 사용할 수 없다. CloudFront(D)는 CDN 서비스로 정적 콘텐츠 배포용이며 데이터 캐싱 솔루션이 아니다.

**핵심 개념:** ElastiCache Redis vs Memcached

---

### Q6. A company has an unencrypted Amazon RDS database and needs to enable encryption. What is the correct approach?
**Options:**
- A) Enable encryption directly on the existing RDS instance
- B) Create a snapshot of the unencrypted DB, copy the snapshot as encrypted, and restore from the encrypted snapshot
- C) Enable AWS KMS encryption on the EBS volumes attached to RDS
- D) Use SSL/TLS connections to encrypt the database

**Answer:** B

**해설:**

> **문제:** 회사가 암호화되지 않은 Amazon RDS 데이터베이스를 가지고 있으며 암호화를 활성화해야 한다. 올바른 접근 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 기존 RDS 인스턴스에서 직접 암호화를 활성화한다 |
| B | 암호화되지 않은 DB의 스냅샷을 생성하고, 암호화된 상태로 스냅샷을 복사한 후, 암호화된 스냅샷에서 복원한다 |
| C | RDS에 연결된 EBS 볼륨에 AWS KMS 암호화를 활성화한다 |
| D | SSL/TLS 연결을 사용하여 데이터베이스를 암호화한다 |

**상세 풀이:** 기존에 암호화되지 않은 RDS 인스턴스에는 직접 암호화를 활성화할 수 없으므로(A 불가), 스냅샷을 생성한 후 해당 스냅샷을 암호화된 상태로 복사하고, 이 암호화된 스냅샷에서 새 RDS 인스턴스를 복원하는 것이 올바른 절차이다. RDS는 기본 EBS 볼륨을 관리형으로 제공하므로 사용자가 직접 EBS 볼륨에 접근하여 암호화를 설정할 수 없다(C 불가). SSL/TLS(D)는 클라이언트와 데이터베이스 간 전송 중 암호화(encryption in transit)를 제공하는 것이지, 디스크에 저장된 데이터의 저장 시 암호화(encryption at rest)와는 다른 개념이다.

**핵심 개념:** RDS & Aurora 암호화

---

### Q7. A global company needs a relational database solution that provides sub-second replication across regions and can promote a secondary region in under 1 minute for disaster recovery. Which solution meets these requirements?
**Options:**
- A) Amazon RDS with Cross-Region Read Replicas
- B) Amazon Aurora Global Database
- C) Amazon RDS Multi-AZ deployment
- D) Amazon Aurora with Cross-Region Read Replicas

**Answer:** B

**해설:**

> **문제:** 글로벌 기업이 리전 간 1초 미만의 복제와 재해 복구를 위해 1분 이내에 보조 리전을 승격할 수 있는 관계형 데이터베이스 솔루션이 필요하다. 어떤 솔루션이 이 요구사항을 충족하는가?

| 선지 | 번역 |
|------|------|
| A | Cross-Region Read Replica가 있는 Amazon RDS |
| B | Amazon Aurora Global Database |
| C | Amazon RDS Multi-AZ 배포 |
| D | Cross-Region Read Replica가 있는 Amazon Aurora |

**상세 풀이:** Aurora Global Database는 1초 미만의 크로스 리전 복제 지연과 1분 미만의 RTO(Recovery Time Objective)로 재해 복구 승격을 제공하여 문제의 두 가지 핵심 요구사항을 모두 정확히 충족한다. 최대 5개 Secondary Region을 지원하고 각 Region당 최대 16개 Read Replica를 생성할 수 있다. RDS Cross-Region Read Replica(A)는 비동기 복제 지연이 1초보다 훨씬 높으며 자동 승격 기능이 없어 수동 개입이 필요하다. RDS Multi-AZ(C)는 같은 리전 내에서만 작동하므로 크로스 리전 복제와 승격을 지원하지 않는다. Aurora Cross-Region Read Replica(D)도 가능하지만 Aurora Global Database의 전용 복제 인프라에 비해 복제 지연이 더 크고 승격 시간이 1분 이내를 보장하지 않는다.

**핵심 개념:** Aurora Global Database

---

### Q8. A company stores user session data in ElastiCache and wants to ensure users remain logged in even if an EC2 instance fails. Which caching strategy best supports this use case?
**Options:**
- A) Lazy Loading
- B) Write Through
- C) Session Store with TTL
- D) Cache-aside pattern

**Answer:** C

**해설:**

> **문제:** 회사가 사용자 세션 데이터를 ElastiCache에 저장하고 있으며, EC2 인스턴스가 장애가 나더라도 사용자가 로그인 상태를 유지할 수 있도록 하려 한다. 이 사용 사례를 가장 잘 지원하는 캐싱 전략은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Lazy Loading |
| B | Write Through |
| C | TTL이 있는 Session Store |
| D | Cache-aside 패턴 |

**상세 풀이:** Session Store 패턴은 세션 데이터를 ElastiCache에 중앙 집중식으로 저장하고 TTL(Time To Live)을 활용하여 세션 만료를 관리한다. 사용자가 다른 EC2 인스턴스로 연결되어도 ElastiCache에서 세션 데이터를 조회하여 로그인 상태를 유지할 수 있으므로 EC2 인스턴스 장애에 영향을 받지 않는다. Lazy Loading(A)은 데이터베이스 읽기 캐싱을 위한 패턴으로, Cache Miss 시 DB에서 데이터를 읽어 캐시에 저장하는 방식이며 세션 관리와는 용도가 다르다. Write Through(B)도 DB 쓰기 시 캐시를 동시에 업데이트하는 데이터 캐싱 패턴이지 세션 관리 목적이 아니다. Cache-aside(D)는 Lazy Loading과 동일한 개념으로 역시 DB 캐싱 패턴이다.

**핵심 개념:** ElastiCache Session Store
