# Section 20: Data & Analytics

## 개요
AWS의 데이터 분석 서비스 생태계를 다루며, 시험에서는 데이터 수집, 변환, 분석, 시각화 파이프라인을 설계하는 능력이 중요하다. Athena, Redshift, OpenSearch, EMR, Glue, Lake Formation, QuickSight, MSK 등의 서비스 특성과 적합한 사용 사례를 구분할 수 있어야 한다.

## 핵심 개념

### 데이터 분석 서비스 한눈에 보기 (초보자용)
> AWS 데이터 분석 생태계는 처음엔 복잡해 보이지만, 역할로 나누면 명확하다:
> - **수집:** Kinesis, MSK (Kafka) — 실시간 데이터를 받아들임
> - **변환(ETL):** Glue — 데이터를 분석에 맞게 가공
> - **분석:** Athena (S3 직접 SQL), Redshift (대규모 데이터 웨어하우스), EMR (Hadoop/Spark 빅데이터)
> - **검색:** OpenSearch — 텍스트 부분 검색
> - **시각화:** QuickSight (BI 대시보드)
> - **거버넌스:** Lake Formation — 데이터 레이크 통합 관리 및 보안

---

### Amazon Athena

```text
┌─────────────────────────────────────────────────────────────────────┐
│            AWS 데이터 분석 서비스 파이프라인 개요                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [수집]           [변환/카탈로그]      [분석]          [시각화]        │
│                                                                     │
│  Kinesis ──┐                                                        │
│  IoT ──────┤      ┌───────────┐    ┌───────────┐   ┌────────────┐  │
│  App Logs ─┼─────▶│ AWS Glue  │───▶│ Athena    │──▶│ QuickSight │  │
│  DB ───────┤      │ (ETL)     │    │ (SQL/S3)  │   │ (BI)       │  │
│            │      └─────┬─────┘    └───────────┘   └────────────┘  │
│            │            │                                           │
│            │      ┌─────▼─────┐    ┌───────────┐                   │
│            │      │ Glue Data │    │ Redshift  │                   │
│            └─────▶│ Catalog   │───▶│ (OLAP)    │                   │
│                   └───────────┘    └───────────┘                   │
│                         │                                           │
│                   ┌─────▼─────┐    ┌───────────┐                   │
│                   │ S3        │───▶│ Redshift  │                   │
│                   │ (Parquet) │    │ Spectrum   │                   │
│                   └───────────┘    └───────────┘                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

> **왜 필요한가?** S3에 쌓아둔 로그 파일이나 CSV 데이터를 분석하고 싶은데, DB에 넣고 싶지 않을 때. Athena는 S3 파일에 직접 SQL을 실행한다. 서버 없이 사용하고, 스캔한 데이터 양만큼만 과금되므로 간헐적 분석에 매우 저렴하다.

- **서버리스** SQL 쿼리 서비스, S3에 저장된 데이터를 별도 로딩 없이 직접 분석
- Presto(오픈소스 분산 SQL 쿼리 엔진) 기반, 표준 SQL 사용
- 지원 형식: CSV, JSON, ORC, Avro, Parquet
- **가격**: 스캔된 데이터 TB당 $5.00 (컬럼형 형식 사용 시 스캔량을 줄여 비용 절감)
- Amazon QuickSight와 연동하여 리포팅/대시보드
- 사용 사례: BI/분석/리포팅, VPC Flow Logs(네트워크 흐름 로그)/ELB Logs/CloudTrail(API 감사 로그) 분석

#### Athena 성능 최적화
- **컬럼형 데이터** 사용 (Parquet, ORC) - 스캔량 감소로 비용 절감
- Glue를 사용하여 Parquet/ORC로 변환
- **데이터 압축** (bzip2, gzip, lz4, snappy 등)
- **S3 파티셔닝**: 가상 컬럼으로 쿼리 최적화 (예: year=1991/month=1/day=1/)
- **대용량 파일 사용** (128MB 이상) - 오버헤드 최소화

#### Athena Federated Query
- S3 외 다양한 데이터 소스에 SQL 쿼리 실행
- **Data Source Connectors**: Lambda에서 실행 (CloudWatch Logs, DynamoDB, RDS 등)
- 결과를 S3에 저장

### Amazon Redshift
> **Athena와의 차이:** Athena는 간헐적·임시 쿼리에 적합한 서버리스 쿼리 서비스, Redshift는 복잡한 쿼리가 매일 대량으로 실행되는 기업 데이터 웨어하우스에 적합하다. Redshift는 클러스터를 항상 가동하므로 고정 비용이 있지만, 빈번하고 복잡한 집계/조인 쿼리에서 Athena보다 훨씬 빠르다.
>
> - **OLAP(Online Analytical Processing):** 대규모 데이터를 집계·분석하는 워크로드. "지난 3년간 지역별 매출 합계" 같은 쿼리가 해당. RDS처럼 실시간 트랜잭션(OLTP)이 아님.

- PostgreSQL 기반이지만 **OLTP(트랜잭션 처리)가 아닌 OLAP(대규모 분석/데이터 웨어하우징)**
- 다른 데이터 웨어하우스 대비 10배 성능, PB(페타바이트) 규모 확장
- **컬럼형 스토리지** (필요한 컬럼만 읽어 분석 쿼리 최적화) + 병렬 쿼리 엔진
- 두 가지 모드: **Provisioned** (클러스터 크기 직접 지정) 또는 **Serverless** 클러스터
- BI 도구 통합 (QuickSight, Tableau)
- **vs Athena**: 인덱스 덕분에 더 빠른 쿼리/조인/집계, 하지만 클러스터 비용이 발생함

#### Redshift 클러스터 구조

```text
┌──────────────────────────────────────────────────┐
│              Redshift 클러스터 구조                 │
├──────────────────────────────────────────────────┤
│                                                  │
│  Client (JDBC/ODBC)                              │
│       │                                          │
│       ▼                                          │
│  ┌──────────────┐                                │
│  │ Leader Node  │  쿼리 계획, 결과 집계            │
│  │              │                                │
│  └──┬───┬───┬───┘                                │
│     │   │   │                                    │
│     ▼   ▼   ▼                                    │
│  ┌────┐┌────┐┌────┐                              │
│  │ C1 ││ C2 ││ C3 │  Compute Nodes              │
│  │    ││    ││    │  (쿼리 실행, 로컬 스토리지)     │
│  └────┘└────┘└────┘                              │
│                                                  │
│  ┌──────────────────────────────────┐            │
│  │ Redshift Spectrum               │            │
│  │ (S3 데이터 직접 쿼리, 로딩 불필요) │            │
│  │                                  │            │
│  │  ┌────┐┌────┐┌────┐  (수천개)   │            │
│  │  │ S1 ││ S2 ││ S3 │  노드      │            │
│  │  └──┬─┘└──┬─┘└──┬─┘            │            │
│  │     └──┬──┘     │              │            │
│  │        ▼        ▼              │            │
│  │     [ Amazon S3 ]              │            │
│  └──────────────────────────────────┘            │
│                                                  │
└──────────────────────────────────────────────────┘
```

- **Leader Node**: 쿼리 계획, 결과 집계
- **Compute Nodes**: 쿼리 실행, 결과를 리더에 전송
- Provisioned 모드: 인스턴스 타입 선택, Reserved Instances로 비용 절감

#### Redshift Snapshots & DR
- 스냅샷: 클러스터의 포인트 인 타임 백업 (S3 내부 저장)
- **증분식** (변경된 부분만 저장)
- 자동: 8시간/5GB마다 또는 스케줄, 보존 1-35일
- 수동: 삭제할 때까지 유지
- **다른 리전으로 스냅샷 자동 복사** 가능

#### Redshift 데이터 로딩
- S3 COPY 명령 사용 (Kinesis Data Firehose 경유 가능)
- **Enhanced VPC Routing**: VPC를 통한 데이터 전송
- **대량 삽입이 훨씬 효율적**

#### Redshift Spectrum
- S3의 데이터를 로딩 없이 직접 쿼리
- Redshift 클러스터 필요 (쿼리 시작점)
- 쿼리를 수천 개의 Redshift Spectrum 노드에 제출

### Amazon OpenSearch Service
- ElasticSearch 후속 서비스
- **모든 필드 검색 가능** (부분 매칭 포함) - DynamoDB 보완용
- 두 가지 모드: 관리형 클러스터 또는 서버리스
- SQL 네이티브 미지원 (플러그인으로 활성화 가능)
- 수집 소스: Kinesis Data Firehose, AWS IoT, CloudWatch Logs
- 보안: Cognito, IAM, KMS, TLS
- **OpenSearch Dashboards** 포함

#### OpenSearch 통합 패턴
- **DynamoDB + OpenSearch**: DynamoDB Stream -> Lambda -> OpenSearch (검색 보완)
- **CloudWatch Logs -> OpenSearch**: Subscription Filter -> Lambda (실시간) 또는 Kinesis Data Firehose (근실시간)
- **Kinesis Data Streams -> OpenSearch**: Lambda (실시간) 또는 Kinesis Data Firehose (근실시간)

### Amazon EMR (Elastic MapReduce)
> **왜 필요한가?** Hadoop/Spark 같은 빅데이터 프레임워크를 직접 EC2에 설치·운영하는 것은 복잡하다. EMR은 수백 개 EC2 인스턴스로 구성된 Hadoop/Spark 클러스터를 클릭 몇 번으로 생성·관리해준다. 대규모 머신 러닝 데이터 전처리, 로그 집계, 복잡한 ETL 파이프라인 등에 적합하다.

- **Hadoop(하둡) 클러스터** 생성 (수백~수천 대의 서버에 데이터를 분산 저장·처리하는 빅데이터 프레임워크)
- Apache Spark(분산 데이터 처리), HBase(NoSQL), Presto(SQL), Flink(스트리밍) 번들
- 수백 개 EC2 인스턴스 클러스터 가능
- 자동 스케일링 + Spot Instances(저렴한 경매형 인스턴스) 통합

#### EMR 노드 타입 & 구매 옵션
- **Master Node**: 클러스터 관리/조정 - 장기 실행
- **Core Node**: 태스크 실행 + 데이터 저장 - 장기 실행
- **Task Node** (선택): 태스크만 실행 - 보통 Spot
- 구매 옵션: On-Demand, Reserved (1년+), Spot
- **장기 실행 클러스터** 또는 **일시적(transient) 클러스터**

### Amazon QuickSight
- 서버리스 ML 기반 BI 서비스 (대화형 대시보드)
- 자동 확장, 임베딩 가능, **세션당 과금**
- **SPICE 엔진**: 데이터 가져오기 시 인메모리 계산
- Enterprise 에디션: **Column-Level Security (CLS)**
- 통합: RDS, Aurora, Athena, Redshift, S3, OpenSearch, Timestream 등
- **Users** (Standard) 및 **Groups** (Enterprise) - IAM이 아닌 QuickSight 자체 관리
- 대시보드: 분석의 읽기 전용 스냅샷, 공유 가능 (먼저 게시 필요)

### AWS Glue
> **ETL이란?** Extract(추출) - Transform(변환) - Load(적재)의 약자.
> - **추출:** 여러 곳(S3, RDS, DB 등)에서 데이터를 가져옴
> - **변환:** CSV → Parquet, 컬럼명 변경, 필터링, 정리 등
> - **적재:** 변환된 데이터를 Redshift, S3 등에 저장
>
> Glue는 이 파이프라인을 코드 최소화 + 서버리스로 처리해준다.

- 관리형 서버리스 **ETL (Extract, Transform, Load)** 서비스
- 데이터 분석용 준비 및 변환

#### Glue 주요 기능
- **Glue Data Catalog**: 데이터셋 카탈로그 (Crawler가 메타데이터 수집)
  - Athena, Redshift Spectrum, EMR에서 활용
- **Glue Job Bookmarks**: 이전 데이터 재처리 방지
- **Glue DataBrew**: 사전 구축된 변환으로 데이터 정리/정규화
- **Glue Studio**: ETL 작업 생성/실행/모니터링 GUI
- **Glue Streaming ETL**: Apache Spark Structured Streaming 기반, Kinesis/Kafka/MSK 호환
- **데이터를 Parquet 형식으로 변환** (S3 PUT -> Lambda/EventBridge -> Glue ETL -> Parquet -> Athena 분석)

### AWS Lake Formation
- **데이터 레이크**를 며칠 만에 구축하는 관리형 서비스
- 데이터 수집, 정리, 변환, 카탈로그화 자동화 + ML 기반 중복 제거
- **Row/Column 수준 세밀한 접근 제어**
- AWS Glue 위에 구축
- 소스: S3, RDS, Aurora, 온프레미스 DB
- 소비자: Athena, Redshift, EMR, QuickSight

### Amazon Managed Service for Apache Flink
- 이전 명칭: Kinesis Data Analytics for Apache Flink
- Flink (Java, Scala, SQL)로 데이터 스트림 처리
- 소스: Kinesis Data Streams, Amazon MSK
- 관리형 클러스터, 자동 스케일링, 애플리케이션 백업
- **중요: Firehose에서 읽지 않음**

### Amazon MSK (Managed Streaming for Apache Kafka)
- 관리형 Apache Kafka
- Kafka 브로커 및 Zookeeper 노드 관리
- VPC 내 배포, Multi-AZ (최대 3개 AZ)
- 데이터를 EBS 볼륨에 무기한 저장
- **MSK Serverless**: 용량 자동 프로비저닝/스케일링

#### Kinesis Data Streams vs MSK

```text
┌─────────────────────────────────────────────────────────────────┐
│         Kinesis Data Streams vs Firehose vs MSK 비교             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Kinesis Data Streams]        [Kinesis Data Firehose]          │
│  ┌──────────┐                  ┌──────────────┐                 │
│  │ Producer │──▶ Shard 1 ──┐   │ Producer     │                 │
│  │          │──▶ Shard 2 ──┼──▶│──▶ Buffer ───┼──▶ S3           │
│  │          │──▶ Shard N ──┘   │   (60초/1MB) │──▶ Redshift     │
│  └──────────┘    │             │              │──▶ OpenSearch    │
│       실시간      │             └──────────────┘                 │
│     커스텀 소비자  ▼              근실시간 (배치 전송)              │
│  ┌──────────────────┐          관리형, 자동 스케일링              │
│  │ Lambda / Flink / │                                           │
│  │ KCL App / Firehose│                                          │
│  └──────────────────┘                                           │
│                                                                 │
│  [Amazon MSK]                                                   │
│  ┌──────────┐                                                   │
│  │ Producer │──▶ Topic ──▶ Partition 1 ──┐                      │
│  │          │            ──▶ Partition 2 ──┼──▶ Consumer         │
│  │          │            ──▶ Partition N ──┘    (Flink/Lambda)   │
│  └──────────┘                                                   │
│     Apache Kafka 호환, 메시지 >1MB 가능                          │
│     EBS 저장, 무기한 보존                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

| 특성 | Kinesis Data Streams | Amazon MSK |
|------|---------------------|------------|
| 메시지 크기 | 1MB 제한 | 기본 1MB, 설정 가능 (예: 10MB) |
| 데이터 구조 | Shards | Kafka Topics + Partitions |
| 스케일링 | Shard Splitting & Merging | Partition 추가만 가능 |
| 전송 암호화 | TLS | PLAINTEXT 또는 TLS |
| 저장 암호화 | KMS | KMS |

### Big Data Ingestion Pipeline

```text
┌─────────────────────────────────────────────────────────────────────┐
│                   Big Data Ingestion Pipeline                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────┐   ┌─────────┐   ┌──────────┐   ┌─────┐   ┌───────────┐  │
│  │ IoT │──▶│ Kinesis │──▶│ Kinesis  │──▶│ S3  │──▶│ SQS       │  │
│  │     │   │ Data    │   │ Data     │   │     │   │ (trigger) │  │
│  └─────┘   │ Streams │   │ Firehose │   └──┬──┘   └─────┬─────┘  │
│             └─────────┘   └──────────┘      │           │         │
│              실시간         근실시간 전송      │           ▼         │
│                                             │     ┌──────────┐    │
│                                             │     │ Lambda   │    │
│                                             │     │ (trigger)│    │
│                                             │     └────┬─────┘    │
│                                             │          ▼          │
│                                             │    ┌──────────┐     │
│                                             └───▶│ Athena   │     │
│                                                  │ (SQL)    │     │
│                                                  └────┬─────┘     │
│                                        ┌──────────────┼────────┐  │
│                                        ▼              ▼        │  │
│                                  ┌──────────┐  ┌───────────┐   │  │
│                                  │ S3       │  │ QuickSight│   │  │
│                                  │ (Report) │  │ (BI)      │   │  │
│                                  └──────────┘  └───────────┘   │  │
│                                                                │  │
│  모든 컴포넌트가 서버리스 = 관리 부담 최소                        │  │
└─────────────────────────────────────────────────────────────────────┘
```

- IoT -> Kinesis Data Streams -> Kinesis Data Firehose -> S3 -> SQS -> Lambda -> Athena -> S3 (리포팅) -> QuickSight/Redshift
- 핵심: 서버리스, 실시간 수집, 변환, SQL 쿼리, 대시보드

## 시험 포인트
- **"S3에서 서버리스 SQL 분석"** = Athena
- **"데이터 웨어하우스/OLAP"** = Redshift
- **"검색/부분 매칭"** = OpenSearch
- **"Hadoop/Spark 빅데이터"** = EMR
- **"ETL/데이터 변환"** = Glue
- **"데이터 레이크 + 세밀한 접근 제어"** = Lake Formation
- **"BI 대시보드/시각화"** = QuickSight
- **"Apache Kafka 관리형"** = MSK
- Athena 비용 절감: Parquet/ORC 형식 + 파티셔닝 + 압축
- Redshift vs Athena: 자주 복잡한 쿼리 = Redshift, 간헐적 S3 쿼리 = Athena
- Glue Data Catalog은 Athena, Redshift Spectrum, EMR이 공유
- Lake Formation은 Glue 위에 구축되어 중앙 집중식 보안 관리 추가
- Flink는 Firehose에서 읽지 않음 (Kinesis Data Streams/MSK만 소스)

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Athena | 서버리스 SQL on S3, $5/TB 스캔, Parquet 추천 |
| Redshift | OLAP 데이터 웨어하우스, 컬럼형, Leader+Compute 노드 |
| Redshift Spectrum | S3 데이터 직접 쿼리 (로딩 불필요), 클러스터 필요 |
| OpenSearch | 자유 텍스트 검색, DynamoDB 보완, Dashboards 포함 |
| EMR | Hadoop/Spark 클러스터, Master/Core/Task 노드 |
| QuickSight | 서버리스 BI, SPICE 엔진, CLS (Enterprise), 세션당 과금 |
| Glue | 서버리스 ETL, Data Catalog, Parquet 변환, Streaming ETL |
| Lake Formation | 데이터 레이크 구축, 행/열 수준 접근 제어, Glue 기반 |
| Flink | 스트림 처리 (Kinesis/MSK 소스), Firehose 미지원 |
| MSK | 관리형 Kafka, EBS 저장, MSK Serverless 옵션 |

---

## Practice Questions

### Q1. A company stores application logs in Amazon S3 in CSV format. They want to run ad-hoc SQL queries to analyze the logs without managing any infrastructure. The solution should be cost-effective. Which approach should they use?
**Options:**
- A) Load data into Amazon Redshift and query using SQL
- B) Use Amazon Athena to query data directly in S3
- C) Set up an Amazon EMR cluster with Hive
- D) Use Amazon RDS to import and query the data

**Answer:** B

**해설:**

> **문제:** 한 회사가 애플리케이션 로그를 Amazon S3에 CSV 형식으로 저장하고 있다. 인프라를 관리하지 않고 임시 SQL 쿼리로 로그를 분석하고 싶다. 비용 효율적인 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Amazon Redshift에 데이터를 로드하고 SQL로 쿼리 |
| B | Amazon Athena로 S3의 데이터를 직접 쿼리 |
| C | Apache Hive를 사용한 Amazon EMR 클러스터 설정 |
| D | Amazon RDS에 데이터를 임포트하고 쿼리 |

**상세 풀이:** Athena는 서버리스 SQL 쿼리 서비스로 S3에 저장된 데이터를 직접 분석할 수 있으며 인프라 관리가 불필요하고, 스캔한 데이터에 대해서만 과금되므로 비용 효율적이다. A) Redshift는 데이터 웨어하우스로 클러스터 프로비저닝과 관리가 필요하다. C) EMR도 Hadoop 클러스터 설정과 관리가 필요하여 임시 쿼리에는 과도하다. D) RDS는 OLTP용 관계형 데이터베이스로 로그 분석 용도에 적합하지 않다.

**핵심 개념:** Amazon Athena

### Q2. A data engineering team uses Amazon Athena to query large datasets in S3. They want to reduce query costs significantly. What is the MOST effective approach?
**Options:**
- A) Use larger EC2 instances for Athena
- B) Convert data to Apache Parquet format using AWS Glue
- C) Enable S3 Transfer Acceleration
- D) Use S3 Intelligent-Tiering storage class

**Answer:** B

**해설:**

> **문제:** 데이터 엔지니어링 팀이 Amazon Athena로 S3의 대규모 데이터셋을 쿼리하고 있다. 쿼리 비용을 크게 줄이고 싶다. 가장 효과적인 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Athena에 더 큰 EC2 인스턴스를 사용 |
| B | AWS Glue를 사용하여 데이터를 Apache Parquet 형식으로 변환 |
| C | S3 Transfer Acceleration 활성화 |
| D | S3 Intelligent-Tiering 스토리지 클래스 사용 |

**상세 풀이:** Athena는 스캔된 데이터 양에 따라 과금(TB당 $5)되므로 컬럼형 형식인 Parquet/ORC로 변환하면 필요한 컬럼만 스캔하여 비용을 크게 절감할 수 있으며, Glue ETL을 사용하면 데이터를 Parquet으로 쉽게 변환할 수 있다. A) Athena는 서버리스이므로 EC2 인스턴스를 선택하는 개념이 아니다. C) S3 Transfer Acceleration은 데이터 전송 속도를 높이는 것이지 쿼리 비용과 무관하다. D) S3 Intelligent-Tiering은 스토리지 비용 최적화이지 Athena 쿼리 비용과 관련이 없다.

**핵심 개념:** Athena Performance Improvement / AWS Glue

### Q3. A company needs to perform complex joins and aggregations on petabytes of structured data for their business intelligence reporting. The queries run frequently throughout the day. Which service is MOST appropriate?
**Options:**
- A) Amazon Athena
- B) Amazon Redshift
- C) Amazon DynamoDB
- D) Amazon EMR with Apache Hive

**Answer:** B

**해설:**

> **문제:** 한 회사가 비즈니스 인텔리전스 리포팅을 위해 페타바이트 규모의 구조화된 데이터에서 복잡한 조인과 집계를 수행해야 한다. 쿼리는 하루 종일 빈번하게 실행된다. 가장 적합한 서비스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Amazon Athena |
| B | Amazon Redshift |
| C | Amazon DynamoDB |
| D | Apache Hive를 사용한 Amazon EMR |

**상세 풀이:** Redshift는 OLAP 데이터 웨어하우스로 PB 규모의 데이터에서 복잡한 조인과 집계를 수행하는 데 최적화되어 있으며, 인덱스를 활용하여 빈번한 복잡한 쿼리에 빠르다. A) Athena는 서버리스로 간헐적 S3 쿼리에 적합하지만 빈번한 복잡한 쿼리에는 Redshift보다 느리다. C) DynamoDB는 NoSQL 트랜잭션 DB로 OLAP 분석용이 아니다. D) EMR은 Hadoop 클러스터로 분석이 가능하지만 클러스터 관리 부담이 크고, Redshift만큼 BI 쿼리에 최적화되어 있지 않다.

**핵심 개념:** Amazon Redshift vs Athena

### Q4. A company uses DynamoDB as their primary database. They need to implement a search feature that allows users to search across multiple fields with partial text matching. Which architecture should they implement?
**Options:**
- A) Use DynamoDB Global Secondary Indexes
- B) Use DynamoDB with DynamoDB Streams to sync data to Amazon OpenSearch
- C) Switch to Amazon RDS with full-text search
- D) Use Amazon Athena to query DynamoDB

**Answer:** B

**해설:**

> **문제:** 한 회사가 DynamoDB를 기본 데이터베이스로 사용하고 있다. 사용자가 여러 필드에서 부분 텍스트 매칭으로 검색할 수 있는 검색 기능을 구현해야 한다. 어떤 아키텍처를 구현해야 하는가?

| 선지 | 번역 |
|------|------|
| A | DynamoDB Global Secondary Indexes 사용 |
| B | DynamoDB Streams를 사용하여 Amazon OpenSearch로 데이터 동기화 |
| C | Amazon RDS로 전환하여 전문 검색(full-text search) 사용 |
| D | Amazon Athena로 DynamoDB 쿼리 |

**상세 풀이:** DynamoDB는 기본 키/인덱스로만 쿼리가 가능하여 부분 텍스트 매칭을 지원하지 않으며, OpenSearch는 모든 필드에서 부분 매칭 검색이 가능하여 DynamoDB Streams -> Lambda -> OpenSearch 패턴으로 데이터를 동기화하면 DynamoDB를 보완할 수 있다. A) GSI(Global Secondary Index)는 정확한 값 매칭은 가능하지만 부분 텍스트 매칭은 불가하다. C) RDS로 전환하면 기존 DynamoDB 기반 아키텍처를 완전히 변경해야 하므로 비효율적이다. D) Athena는 S3 데이터 분석용 SQL 서비스로 DynamoDB 실시간 검색에 적합하지 않다.

**핵심 개념:** OpenSearch + DynamoDB 통합 패턴

### Q5. A company wants to build a centralized data lake on AWS. They need fine-grained access control at the row and column level for different teams accessing the data through Athena and Redshift. Which service should they use?
**Options:**
- A) AWS Glue with IAM policies
- B) Amazon S3 with bucket policies
- C) AWS Lake Formation
- D) Amazon Redshift with row-level security

**Answer:** C

**해설:**

> **문제:** 한 회사가 AWS에 중앙 집중식 데이터 레이크를 구축하려 한다. Athena와 Redshift를 통해 데이터에 접근하는 여러 팀에 대해 행(row)과 열(column) 수준의 세밀한 접근 제어가 필요하다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | IAM 정책과 함께 AWS Glue 사용 |
| B | 버킷 정책과 함께 Amazon S3 사용 |
| C | AWS Lake Formation |
| D | 행 수준 보안과 함께 Amazon Redshift 사용 |

**상세 풀이:** AWS Lake Formation은 데이터 레이크 구축을 위한 관리형 서비스로, 행(row)과 열(column) 수준의 세밀한 접근 제어를 중앙 집중적으로 관리할 수 있으며, Athena, Redshift, EMR 등 여러 소비자에 대한 보안을 통합 관리한다. A) Glue는 ETL에 초점을 맞추며 세밀한 접근 제어 기능이 없다. B) S3 버킷 정책은 객체/버킷 수준이지 행/열 수준 제어를 지원하지 않는다. D) Redshift 행 수준 보안은 Redshift 내에서만 작동하며 Athena 등 다른 서비스에 대한 중앙 집중식 접근 제어를 제공하지 않는다.

**핵심 개념:** AWS Lake Formation

### Q6. A company needs to process real-time streaming data from Apache Kafka topics using Apache Flink. They want a fully managed solution. Which service should they use?
**Options:**
- A) Amazon Kinesis Data Firehose
- B) Amazon Managed Service for Apache Flink with Amazon MSK as source
- C) AWS Glue Streaming ETL
- D) Amazon EMR with Apache Flink

**Answer:** B

**해설:**

> **문제:** 한 회사가 Apache Kafka 토픽에서 실시간 스트리밍 데이터를 Apache Flink로 처리해야 한다. 완전 관리형 솔루션을 원한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Kinesis Data Firehose |
| B | Amazon MSK를 소스로 한 Amazon Managed Service for Apache Flink |
| C | AWS Glue Streaming ETL |
| D | Apache Flink를 사용한 Amazon EMR |

**상세 풀이:** Amazon Managed Service for Apache Flink는 관리형 Flink 서비스로 MSK(관리형 Kafka)와 Kinesis Data Streams를 소스로 사용할 수 있으며, 완전 관리형이므로 클러스터를 직접 관리할 필요가 없다. A) Kinesis Data Firehose는 Flink의 소스로 사용할 수 없으며(중요 시험 포인트), 배치 전송 서비스이다. C) Glue Streaming ETL은 Apache Spark Structured Streaming 기반으로 Flink가 아니다. D) EMR에 Flink를 설치하면 클러스터를 직접 관리해야 하므로 완전 관리형이 아니다.

**핵심 개념:** Amazon Managed Service for Apache Flink / Amazon MSK

### Q7. A company wants to create interactive business dashboards that can be embedded in their web application. They need per-session pricing and want to leverage in-memory computation for fast performance. Which service should they use?
**Options:**
- A) Amazon Athena with custom visualization
- B) Amazon QuickSight with SPICE engine
- C) Amazon Redshift with a BI tool
- D) Amazon OpenSearch Dashboards

**Answer:** B

**해설:**

> **문제:** 한 회사가 웹 애플리케이션에 임베딩할 수 있는 대화형 비즈니스 대시보드를 만들고 싶다. 세션당 과금이 필요하며 빠른 성능을 위해 인메모리 계산을 활용하고 싶다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 커스텀 시각화를 사용한 Amazon Athena |
| B | SPICE 엔진을 사용한 Amazon QuickSight |
| C | BI 도구를 사용한 Amazon Redshift |
| D | Amazon OpenSearch Dashboards |

**상세 풀이:** Amazon QuickSight는 서버리스 BI 서비스로 임베딩이 가능하고 세션당 과금이 적용되며, SPICE 엔진은 데이터를 가져올 때 인메모리 계산을 제공하여 빠른 성능을 보장한다. A) Athena는 SQL 쿼리 엔진이지 시각화/대시보드 도구가 아니다. C) Redshift는 데이터 웨어하우스로 별도의 BI 도구가 필요하며 자체적으로 임베딩 가능한 대시보드를 제공하지 않는다. D) OpenSearch Dashboards는 검색/로그 데이터 시각화에 특화되어 있으며 범용 BI 대시보드가 아니다.

**핵심 개념:** Amazon QuickSight / SPICE

### Q8. A data team needs to discover metadata about datasets stored across S3, RDS, and DynamoDB, and make this metadata available for querying with Athena and Redshift Spectrum. Which service provides this capability?
**Options:**
- A) AWS Lake Formation
- B) AWS Glue Data Catalog
- C) Amazon Athena Data Source Connectors
- D) AWS Config

**Answer:** B

**해설:**

> **문제:** 데이터 팀이 S3, RDS, DynamoDB에 걸쳐 저장된 데이터셋의 메타데이터를 발견하고, 이 메타데이터를 Athena와 Redshift Spectrum에서 쿼리에 활용할 수 있도록 해야 한다. 어떤 서비스가 이 기능을 제공하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Lake Formation |
| B | AWS Glue Data Catalog |
| C | Amazon Athena Data Source Connectors |
| D | AWS Config |

**상세 풀이:** AWS Glue Data Catalog은 Data Crawler를 사용하여 S3, RDS, DynamoDB 등에서 메타데이터를 자동으로 수집하고 카탈로그화하며, 이 카탈로그는 Athena, Redshift Spectrum, EMR에서 공유하여 데이터 디스커버리에 활용된다. A) Lake Formation은 Glue 위에 구축되지만 데이터 레이크 보안/거버넌스에 초점이 있으며, 메타데이터 카탈로그 자체는 Glue Data Catalog의 역할이다. C) Athena Data Source Connectors는 Athena의 페더레이티드 쿼리(S3 외 소스 쿼리)용이지 메타데이터 카탈로그가 아니다. D) AWS Config은 리소스 구성 변경 추적 서비스로 데이터 메타데이터와 무관하다.

**핵심 개념:** AWS Glue Data Catalog
