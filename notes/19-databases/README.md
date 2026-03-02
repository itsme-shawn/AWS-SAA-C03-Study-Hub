# Section 19: Databases in AWS

## 개요
AWS는 다양한 관리형 데이터베이스 서비스를 제공하며, SAA-C03 시험에서는 워크로드 특성에 따라 올바른 데이터베이스를 선택하는 능력이 핵심이다. 읽기/쓰기 패턴, 데이터 모델, 지연 시간 요구사항, 스키마 유연성 등을 기반으로 적합한 서비스를 판단해야 한다.

## 핵심 개념

### 데이터베이스 유형별 분류
> **초보자 핵심 가이드:**
> - 표처럼 생긴 데이터(고객, 주문 등) + JOIN + SQL이 필요 → **RDS / Aurora**
> - 스키마가 자주 바뀌거나 서버리스로 NoSQL이 필요 → **DynamoDB**
> - 빠른 캐시(세션, 자주 쓰는 데이터) → **ElastiCache**
> - "A가 B를 팔로우한다" 같은 관계망 → **Neptune**
> - MongoDB 기존 코드 그대로 → **DocumentDB**
> - Cassandra 기존 코드 그대로 → **Keyspaces**
> - IoT 센서 시간별 데이터 → **Timestream**
> - "2024-01-15 14:32:00에 온도가 23.5도였다" 같은 시계열 → **Timestream**
> - 대규모 분석·리포팅(OLAP) → **Redshift**
> - 키워드 부분 검색 → **OpenSearch**

- **RDBMS (SQL/OLTP)**: RDS, Aurora — 조인이 필요한 관계형 데이터, 트랜잭션 지원
- **NoSQL**: DynamoDB (JSON/키-값), ElastiCache (인메모리 키/값), Neptune (그래프), DocumentDB (MongoDB 호환), Keyspaces (Cassandra 호환)
- **Object Store**: S3 (대용량 객체), Glacier (백업/아카이브)
- **Data Warehouse (OLAP, 대용량 분석용)**: Redshift, Athena, EMR
- **Search**: OpenSearch — 자유 텍스트, 부분 매칭 검색
- **Graph**: Neptune — 데이터 간 관계망 탐색
- **Ledger (원장)**: Amazon QLDB — 변경 불가(immutable) 감사 로그
- **Time Series (시계열)**: Amazon Timestream — 타임스탬프 기반 데이터

```text
┌─────────────────────────────────────────────────────────────────────┐
│                   AWS 데이터베이스 유형별 선택 가이드                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  워크로드 특성은?                                                     │
│       │                                                             │
│       ├── 관계형 데이터 + SQL + 트랜잭션 ──▶ RDS / Aurora            │
│       │                                                             │
│       ├── 키/값 + 서버리스 + ms 지연 ──────▶ DynamoDB                │
│       │                                                             │
│       ├── 인메모리 캐시 + sub-ms 지연 ────▶ ElastiCache              │
│       │                                                             │
│       ├── 문서(JSON) + MongoDB 호환 ──────▶ DocumentDB              │
│       │                                                             │
│       ├── 그래프 + 관계/소셜 네트워크 ────▶ Neptune                   │
│       │                                                             │
│       ├── 시계열 + IoT 센서 데이터 ───────▶ Timestream               │
│       │                                                             │
│       ├── Cassandra 호환 ─────────────────▶ Keyspaces               │
│       │                                                             │
│       ├── 검색 + 부분 매칭 ───────────────▶ OpenSearch               │
│       │                                                             │
│       ├── OLAP + 데이터 웨어하우스 ───────▶ Redshift                 │
│       │                                                             │
│       └── 대용량 객체 저장 ───────────────▶ S3                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Amazon RDS
- PostgreSQL, MySQL, Oracle, SQL Server, DB2, MariaDB, Custom 지원
- 프로비저닝된 인스턴스 크기 및 EBS 볼륨 타입/크기 선택
- **Storage Auto-Scaling** 기능
- **Read Replicas** 및 **Multi-AZ** 지원
- 보안: IAM, Security Groups, KMS, SSL in transit
- 자동 백업: 최대 35일까지 PITR (Point in Time Restore)
- 수동 DB Snapshot: 장기 보존
- **RDS Custom**: Oracle 및 SQL Server에서 기반 인스턴스 접근/커스터마이징 가능
- 사용 사례: 관계형 데이터셋 (RDBMS/OLTP), SQL 쿼리, 트랜잭션

### Amazon Aurora

```text
┌──────────────────────────────────────────────────────────────┐
│                  RDS vs Aurora 아키텍처 비교                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [Amazon RDS]                                                │
│  ┌──────────┐     ┌──────────┐                               │
│  │ Primary  │────▶│ Standby  │  (Multi-AZ, 동기 복제)        │
│  │ Instance │     │ Instance │                               │
│  └────┬─────┘     └──────────┘                               │
│       │                                                      │
│       ├──── Read Replica 1 (비동기)                           │
│       └──── Read Replica 2 (비동기)                           │
│                                                              │
│  [Amazon Aurora]                                             │
│  ┌──────────┐  Writer Endpoint                               │
│  │ Writer   │◀────────────────────┐                          │
│  │ Instance │                     │                          │
│  └────┬─────┘              ┌──────┴──────┐                   │
│       │                    │ Shared       │                   │
│       │   6 copies/3 AZs  │ Distributed  │                   │
│       └──────────────────▶│ Storage      │                   │
│                            │ (Auto-Scaling)│                  │
│  ┌──────────┐  Reader     └──────┬──────┘                    │
│  │ Reader 1 │◀── Endpoint ───────┘                           │
│  │ Reader 2 │  (Auto-Scaling)                                │
│  │ Reader N │                                                │
│  └──────────┘                                                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- PostgreSQL/MySQL 호환, 스토리지와 컴퓨트 분리
- **스토리지**: 3개 AZ에 걸쳐 6개 복제본, 자동 복구, 자동 스케일링
- **컴퓨트**: 다중 AZ DB 인스턴스 클러스터, Read Replicas 자동 스케일링
- Writer/Reader용 커스텀 엔드포인트
- **Aurora Serverless**: 예측 불가/간헐적 워크로드, 용량 계획 불필요
- **Aurora Global**: 각 리전당 최대 16개 Read 인스턴스, 1초 미만 스토리지 복제
- **Aurora ML**: SageMaker 및 Comprehend와 연동
- **Aurora Database Cloning**: 스냅샷 복원보다 빠름

### Amazon ElastiCache
- 관리형 Redis/Memcached (인메모리 데이터 스토어)
- **Sub-millisecond 지연 시간**
- Redis: 클러스터링, Multi AZ, Read Replicas (샤딩)
- 보안: IAM, Security Groups, KMS, Redis Auth
- **애플리케이션 코드 변경 필요**
- 사용 사례: 키/값 저장, DB 쿼리 캐시, 세션 데이터 저장, SQL 사용 불가

### Amazon DynamoDB

```text
┌─────────────────────────────────────────────────────────────┐
│               DynamoDB + DAX + Global Tables 구조            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌─────────┐    ┌──────────────┐           │
│  │  App     │───▶│  DAX    │───▶│  DynamoDB    │           │
│  │          │    │ (Cache) │    │  Table       │           │
│  └──────────┘    └─────────┘    └──────┬───────┘           │
│                   us 지연시간      ms 지연시간  │             │
│                                        │                    │
│         ┌──────────────────────────────┤                    │
│         │                              │                    │
│         ▼                              ▼                    │
│  ┌──────────────┐           ┌──────────────────┐           │
│  │ DynamoDB     │           │ Global Table     │           │
│  │ Streams      │           │ (다른 리전)       │           │
│  │              │           │ active-active     │           │
│  └──────┬───────┘           │ 읽기+쓰기 가능    │           │
│         │                   └──────────────────┘           │
│         ▼                                                   │
│  ┌──────────────┐                                          │
│  │ Lambda /     │                                          │
│  │ Kinesis      │                                          │
│  └──────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- AWS 독자 기술, 관리형 서버리스 NoSQL, **밀리초 지연 시간**
- 용량 모드: 프로비저닝 (자동 스케일링 옵션) 또는 온디맨드
- ElastiCache 대체 가능 (세션 데이터 저장, TTL 기능)
- Multi AZ 기본 지원, 트랜잭션 기능
- **DAX**: 읽기 캐시, **마이크로초** 읽기 지연 시간
- **DynamoDB Streams**: Lambda 또는 Kinesis Data Streams와 통합
- **Global Table**: active-active 설정
- 자동 백업 최대 35일 PITR, 온디맨드 백업
- S3 Export (RCU 미사용), S3 Import (WCU 미사용)
- 사용 사례: 서버리스 앱 개발 (100KB 이하 문서), 분산 서버리스 캐시

### Amazon S3 (데이터베이스 관점)
- 키/값 객체 스토어
- 대용량 객체에 적합, 소형 객체 다수에는 비적합
- 서버리스, 무한 확장, 최대 객체 크기 5TB, 버전 관리
- 다양한 스토리지 티어 및 라이프사이클 정책
- 다양한 암호화 옵션: SSE-S3, SSE-KMS, SSE-C, 클라이언트 측

### Amazon DocumentDB
> **왜 필요한가?** MongoDB를 온프레미스에서 쓰다가 AWS로 이전하려는데, 코드를 바꾸기 싫을 때. DocumentDB는 MongoDB API와 호환되어 기존 MongoDB 클라이언트/드라이버를 그대로 사용할 수 있다. AWS가 직접 관리하므로 MongoDB 서버를 직접 운영하는 것보다 편하다.

- MongoDB 호환 관리형 NoSQL 데이터베이스
- Aurora와 유사한 배포 개념 (스토리지와 컴퓨트 분리)
- 3개 AZ에 걸친 복제(고가용성), 10GB 단위 자동 스토리지 증가
- 초당 수백만 요청 자동 확장

### Amazon Neptune
> **왜 필요한가?** "A의 친구의 친구 중 B와 공통 관심사가 있는 사람을 찾아줘"처럼 관계를 타고 탐색하는 쿼리는 관계형 DB에서 JOIN을 여러 번 걸어야 해서 매우 느리다. 그래프 DB는 이런 관계 탐색에 특화되어 있어 SNS 팔로워, 추천 시스템, 사기 탐지(공범 관계)에 적합하다.

- 관리형 **그래프 데이터베이스** (노드=개체, 엣지=관계로 데이터를 표현)
- 3개 AZ에 걸쳐 고가용성, 최대 15개 Read Replicas
- 수십억 관계 저장, 밀리초 지연 시간 쿼리
- **Neptune Streams**: 그래프 데이터 변경의 실시간 순서화된 시퀀스 (HTTP REST API)
- 사용 사례: 소셜 네트워크, 지식 그래프(Wikipedia), 사기 탐지, 추천 엔진

### Amazon Keyspaces (Apache Cassandra 호환)
- 관리형 Apache Cassandra 호환 서비스
- 서버리스, 확장 가능, 고가용성
- CQL (Cassandra Query Language) 사용
- 싱글 디지트 밀리초 지연 시간
- 온디맨드 또는 프로비저닝 모드 (자동 스케일링)
- 사용 사례: IoT 디바이스 정보, 시계열 데이터

### Amazon Timestream
- 관리형 서버리스 **시계열 데이터베이스**
- RDBMS 대비 1000배 빠르고 1/10 비용
- SQL 호환, 스케줄 쿼리, 다중 측정 레코드
- **데이터 스토리지 티어링**: 최근 데이터는 메모리, 과거 데이터는 비용 최적화 스토리지
- 내장 시계열 분석 함수
- 사용 사례: IoT 앱, 운영 애플리케이션, 실시간 분석

## 시험 포인트

```text
┌───────────────────────────────────────────────────────────────────┐
│             DynamoDB vs ElastiCache vs DAX 비교                    │
├──────────────┬──────────────────┬──────────────┬─────────────────┤
│              │   DynamoDB       │ ElastiCache  │ DynamoDB DAX    │
├──────────────┼──────────────────┼──────────────┼─────────────────┤
│ 유형          │ NoSQL DB         │ 인메모리 캐시 │ DynamoDB 캐시   │
│ 지연 시간     │ 밀리초 (ms)      │ sub-ms       │ 마이크로초 (us)  │
│ 서버리스      │ O                │ X            │ X (클러스터)     │
│ 코드 변경     │ DynamoDB API     │ 필요         │ 최소 (호환 API)  │
│ 용도          │ 범용 NoSQL       │ 범용 캐시     │ DynamoDB 전용   │
│ 세션 저장     │ O (TTL)         │ O            │ X               │
│ Global       │ Global Tables    │ Global       │ X               │
│              │ (active-active)  │ Datastore    │                 │
└──────────────┴──────────────────┴──────────────┴─────────────────┘
```

- RDS vs Aurora: Aurora는 더 높은 성능, 더 적은 관리, 더 많은 기능 (Serverless, Global, ML, Cloning)
- DynamoDB vs ElastiCache: 둘 다 키/값 저장 가능하지만, DynamoDB는 서버리스이고 ElastiCache는 코드 변경 필요
- DynamoDB DAX vs ElastiCache: DAX는 DynamoDB 전용 읽기 캐시 (마이크로초), ElastiCache는 범용 캐시
- Neptune: "그래프", "관계", "소셜 네트워크" 키워드 시 선택
- Timestream: "시계열", "IoT 센서 데이터" 키워드 시 선택
- Keyspaces: "Cassandra" 키워드 시 선택
- DocumentDB: "MongoDB" 키워드 시 선택
- RDS Custom: Oracle/SQL Server에서 OS 수준 접근이 필요할 때
- DynamoDB Global Table은 active-active (읽기/쓰기 모두 가능), Aurora Global은 1개 리전만 쓰기

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| RDS | 관리형 RDBMS, Multi-AZ, Read Replicas, 최대 35일 PITR |
| Aurora | RDS 호환 + 6 복제본/3 AZ, Serverless/Global/ML/Cloning |
| ElastiCache | 인메모리 캐시 (Redis/Memcached), sub-ms 지연, 코드 변경 필요 |
| DynamoDB | 서버리스 NoSQL, ms 지연, DAX (us 지연), Global Table, Streams |
| DocumentDB | MongoDB 호환, 3 AZ 복제, 자동 스토리지 증가 |
| Neptune | 그래프 DB, 소셜 네트워크/사기 탐지, Streams 지원 |
| Keyspaces | Cassandra 호환, 서버리스, CQL, IoT 데이터 |
| Timestream | 시계열 DB, 서버리스, 스토리지 티어링, IoT/실시간 분석 |
| QLDB | 원장(Ledger) DB, 변경 불가 |
| S3 | 객체 스토어, 대용량 파일, 무한 확장 |

---

## Practice Questions

### Q1. A company needs to migrate their on-premises MongoDB database to AWS with minimal application code changes. The database stores JSON documents and requires high availability across multiple Availability Zones. Which AWS database service should they use?
**Options:**
- A) Amazon RDS for MongoDB
- B) Amazon DynamoDB
- C) Amazon DocumentDB
- D) Amazon Neptune

**Answer:** C

**해설:**

> **문제:** 한 회사가 온프레미스 MongoDB 데이터베이스를 최소한의 애플리케이션 코드 변경으로 AWS로 마이그레이션하려 한다. 데이터베이스는 JSON 문서를 저장하며 여러 가용 영역에 걸친 고가용성이 필요하다. 어떤 AWS 데이터베이스 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon RDS for MongoDB |
| B | Amazon DynamoDB |
| C | Amazon DocumentDB |
| D | Amazon Neptune |

**(A)** : Amazon RDS for MongoDB는 존재하지 않는 서비스이다. RDS는 MySQL, PostgreSQL, Oracle 등을 지원하지만 MongoDB는 지원하지 않는다.

**(B)** : DynamoDB는 NoSQL이지만 MongoDB API와 호환되지 않는다. 코드 변경이 많이 필요하다.

**(C) 정답** : Amazon DocumentDB는 MongoDB 호환 관리형 데이터베이스 서비스이다. MongoDB API와 호환되므로 최소한의 코드 변경으로 마이그레이션할 수 있으며 3개 AZ에 걸친 복제로 고가용성을 제공한다.

**(D)** : Neptune은 그래프 데이터베이스이다. JSON 문서 저장과는 용도가 다르다.

**핵심 개념:** Amazon DocumentDB

### Q2. A startup is building a serverless application that requires a database with single-digit millisecond latency. The application traffic is unpredictable, and the team wants to avoid capacity planning. Which database configuration is MOST suitable?
**Options:**
- A) Amazon RDS with Multi-AZ
- B) Amazon Aurora Serverless
- C) Amazon DynamoDB with on-demand capacity
- D) Amazon ElastiCache with Redis

**Answer:** C

**해설:**

> **문제:** 한 스타트업이 한 자릿수 밀리초 지연 시간이 필요한 서버리스 애플리케이션을 구축하고 있다. 애플리케이션 트래픽은 예측 불가능하며 팀은 용량 계획을 피하고 싶어한다. 가장 적합한 데이터베이스 구성은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Amazon RDS (Multi-AZ) |
| B | Amazon Aurora Serverless |
| C | Amazon DynamoDB (온디맨드 용량) |
| D | Amazon ElastiCache (Redis) |

**(A)** : RDS Multi-AZ는 프로비저닝된 인스턴스가 필요하다. 서버리스가 아니며 용량 계획이 필요하다.

**(B)** : Aurora Serverless도 서버리스이지만 RDBMS이다. 서버리스 + 밀리초 지연 + 용량 계획 불필요 조건에는 DynamoDB가 더 적합하다.

**(C) 정답** : DynamoDB는 서버리스 NoSQL 데이터베이스로 밀리초 지연 시간을 제공한다. 온디맨드 용량 모드를 사용하면 용량 계획이 불필요하고 트래픽에 따라 자동 확장된다.

**(D)** : ElastiCache는 서버리스가 아니며 클러스터를 관리해야 한다. 애플리케이션 코드 변경도 필요하다.

**핵심 개념:** DynamoDB On-Demand Capacity

### Q3. A social media company needs to store and query user relationships, including friends, followers, and shared content. The queries involve traversing multiple levels of connections. Which database is BEST suited?
**Options:**
- A) Amazon DynamoDB
- B) Amazon RDS for PostgreSQL
- C) Amazon Neptune
- D) Amazon DocumentDB

**Answer:** C

**해설:**

> **문제:** 한 소셜 미디어 회사가 친구, 팔로워, 공유 콘텐츠를 포함한 사용자 관계를 저장하고 쿼리해야 한다. 쿼리는 여러 단계의 연결을 탐색하는 것을 포함한다. 가장 적합한 데이터베이스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Amazon DynamoDB |
| B | Amazon RDS for PostgreSQL |
| C | Amazon Neptune |
| D | Amazon DocumentDB |

**(A)** : DynamoDB는 키/값 NoSQL이다. 그래프 탐색 쿼리(다단계 연결 탐색)에 적합하지 않다.

**(B)** : RDS PostgreSQL은 관계형 DB이다. 다단계 관계 탐색은 기술적으로 가능하지만 매우 비효율적이다.

**(C) 정답** : Amazon Neptune은 관리형 그래프 데이터베이스이다. 소셜 네트워크, 사기 탐지, 추천 엔진 등 데이터 간 관계를 저장하고 수십억 관계를 밀리초 지연으로 쿼리할 수 있다.

**(D)** : DocumentDB는 JSON 문서 저장용 MongoDB 호환 데이터베이스이다. 그래프 쿼리에 최적화되어 있지 않다.

**핵심 개념:** Amazon Neptune

### Q4. A company runs an Oracle database on-premises and needs to migrate to AWS. Their DBA requires OS-level access to customize the database configuration. Which service should they use?
**Options:**
- A) Amazon RDS for Oracle
- B) Amazon RDS Custom for Oracle
- C) Amazon Aurora
- D) Oracle on Amazon EC2

**Answer:** B

**해설:**

> **문제:** 한 회사가 온프레미스에서 Oracle 데이터베이스를 운영하고 있으며 AWS로 마이그레이션해야 한다. DBA가 데이터베이스 구성을 커스터마이징하기 위해 OS 수준 접근이 필요하다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon RDS for Oracle |
| B | Amazon RDS Custom for Oracle |
| C | Amazon Aurora |
| D | Amazon EC2에 Oracle 설치 |

**(A)** : 일반 RDS for Oracle은 관리형이지만 OS 수준 접근을 제공하지 않는다. DBA의 커스터마이징 요구사항을 충족하지 못한다.

**(B) 정답** : RDS Custom for Oracle은 RDS의 관리형 기능(자동 백업, 패치 등)을 유지하면서 기반 인스턴스에 대한 OS 수준 접근과 커스터마이징을 허용한다. 관리 편의성과 커스터마이징 두 가지를 모두 제공한다.

**(C)** : Aurora는 PostgreSQL/MySQL만 호환한다. Oracle을 지원하지 않는다.

**(D)** : EC2에 직접 설치하면 OS 접근은 가능하지만 모든 관리(백업, 패치, HA)를 직접 해야 하므로 관리 부담이 크다.

**핵심 개념:** RDS Custom

### Q5. An IoT company collects sensor data from millions of devices and needs to store time-stamped readings for real-time analytics. The solution should automatically manage data lifecycle, keeping recent data in fast storage and older data in cost-optimized storage. Which service is MOST appropriate?
**Options:**
- A) Amazon DynamoDB with TTL
- B) Amazon Timestream
- C) Amazon Redshift
- D) Amazon RDS with partitioning

**Answer:** B

**해설:**

> **문제:** 한 IoT 회사가 수백만 디바이스에서 센서 데이터를 수집하며 실시간 분석을 위해 타임스탬프가 찍힌 측정값을 저장해야 한다. 솔루션은 데이터 생명주기를 자동으로 관리하여 최근 데이터는 빠른 스토리지에, 오래된 데이터는 비용 최적화 스토리지에 보관해야 한다. 가장 적합한 서비스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Amazon DynamoDB (TTL 사용) |
| B | Amazon Timestream |
| C | Amazon Redshift |
| D | Amazon RDS (파티셔닝 사용) |

**(A)** : DynamoDB TTL은 만료된 데이터를 삭제하는 것이지 스토리지 티어링이 아니다. 오래된 데이터를 비용 최적화 스토리지로 자동 이동하는 기능이 없다.

**(B) 정답** : Amazon Timestream은 시계열 데이터베이스로 자동 스토리지 티어링(최근 데이터는 메모리, 과거 데이터는 비용 최적화 스토리지)을 제공한다. IoT 앱과 실시간 분석에 최적화되어 있고 서버리스로 자동 확장된다.

**(C)** : Redshift는 OLAP 데이터 웨어하우스이다. 시계열 데이터 특화 기능이나 자동 스토리지 티어링이 없다.

**(D)** : RDS 파티셔닝은 수동 관리가 필요하다. 자동 스토리지 티어링을 제공하지 않는다.

**핵심 개념:** Amazon Timestream

### Q6. A company uses DynamoDB for their e-commerce application and experiences extremely high read traffic during sales events. They need to reduce read latency from milliseconds to microseconds. What should they implement?
**Options:**
- A) DynamoDB Read Replicas
- B) Amazon ElastiCache in front of DynamoDB
- C) DynamoDB Accelerator (DAX)
- D) DynamoDB On-Demand capacity mode

**Answer:** C

**해설:**

> **문제:** 한 회사가 이커머스 애플리케이션에 DynamoDB를 사용하고 있으며 세일 이벤트 중 매우 높은 읽기 트래픽을 겪고 있다. 읽기 지연 시간을 밀리초에서 마이크로초로 줄여야 한다. 무엇을 구현해야 하는가?

| 선지 | 번역 |
|------|------|
| A | DynamoDB Read Replicas |
| B | DynamoDB 앞에 Amazon ElastiCache 배치 |
| C | DynamoDB Accelerator (DAX) |
| D | DynamoDB 온디맨드 용량 모드 |

**(A)** : DynamoDB에는 Read Replicas 개념이 존재하지 않는다. 존재하지 않는 기능이다.

**(B)** : ElastiCache도 캐시로 사용 가능하지만 애플리케이션 코드 변경이 더 많이 필요하다. DAX만큼 DynamoDB와 원활하게 통합되지 않는다.

**(C) 정답** : DAX(DynamoDB Accelerator)는 DynamoDB 전용 인메모리 읽기 캐시로 마이크로초 수준의 읽기 지연 시간을 제공한다. DynamoDB API와 호환되어 최소한의 코드 변경으로 통합할 수 있다.

**(D)** : 온디맨드 용량 모드는 처리량 확장을 위한 것이다. 지연 시간을 줄이지 않는다.

**핵심 개념:** DynamoDB DAX

### Q7. A company needs a globally distributed database that allows read and write operations in multiple AWS regions simultaneously. Which solution provides active-active multi-region capability?
**Options:**
- A) Amazon Aurora Global Database
- B) Amazon RDS Multi-AZ
- C) Amazon DynamoDB Global Tables
- D) Amazon ElastiCache Global Datastore

**Answer:** C

**해설:**

> **문제:** 한 회사가 여러 AWS 리전에서 동시에 읽기와 쓰기 작업이 가능한 글로벌 분산 데이터베이스가 필요하다. active-active 다중 리전 기능을 제공하는 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Amazon Aurora Global Database |
| B | Amazon RDS Multi-AZ |
| C | Amazon DynamoDB Global Tables |
| D | Amazon ElastiCache Global Datastore |

**(A)** : Aurora Global Database는 1개의 Primary 리전에서만 쓰기가 가능하다. 다른 리전은 읽기 전용이므로 active-active가 아니다.

**(B)** : RDS Multi-AZ는 단일 리전 내 장애 조치(failover)용이다. 다중 리전을 지원하지 않는다.

**(C) 정답** : DynamoDB Global Tables는 active-active 설정으로 여러 리전에서 동시에 읽기와 쓰기가 가능하다. 진정한 다중 리전 active-active 기능을 제공한다.

**(D)** : ElastiCache Global Datastore는 active-passive 방식이다. 하나의 리전에서만 쓰기가 가능하여 active-active가 아니다.

**핵심 개념:** DynamoDB Global Tables
