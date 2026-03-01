# Section 20 - Data Analytics 연습문제 해설

---

### Q1. A company stores application logs in S3 in CSV format. They want to run ad-hoc SQL queries without managing infrastructure. They need a cost-effective approach. Which approach should they use?

**한글 번역:** 회사가 애플리케이션 로그를 S3에 CSV 형식으로 저장합니다. 인프라를 관리하지 않고 임시(ad-hoc) SQL 쿼리를 실행하고 싶습니다. 비용 효율적인 접근 방식이 필요합니다. 어떤 접근 방식을 사용해야 할까요?

**선지:**
- A) Load into Redshift and query → Redshift에 로드하고 쿼리
- B) Use Amazon Athena to query directly in S3 → Amazon Athena를 사용하여 S3에서 직접 쿼리
- C) Set up EMR with Hive → Hive를 사용한 EMR 설정
- D) Use Amazon RDS to import and query → Amazon RDS로 가져와서 쿼리

**정답:** B

**선지별 해설:**
- **A) Load into Redshift and query:** 오답. Redshift는 대규모 분석에 강력하지만, 클러스터를 프로비저닝하고 관리해야 합니다. 데이터를 별도로 로드해야 하며, 임시 쿼리에 비해 비용이 높습니다. 인프라 관리가 필요하므로 요구사항에 맞지 않습니다.
- **B) Amazon Athena to query directly in S3:** 정답. Athena는 서버리스 쿼리 서비스로, S3에 저장된 데이터를 직접 SQL로 쿼리할 수 있습니다. 인프라 관리가 불필요하고, 스캔한 데이터 양에 대해서만 비용을 지불합니다. 임시(ad-hoc) 쿼리에 가장 비용 효율적이며 적합한 서비스입니다.
- **C) Set up EMR with Hive:** 오답. EMR은 빅데이터 처리 프레임워크로 강력하지만, 클러스터를 설정하고 관리해야 합니다. 단순한 SQL 쿼리를 위해서는 과도한 솔루션이며, 인프라 관리가 필요합니다.
- **D) Amazon RDS to import and query:** 오답. RDS는 관계형 데이터베이스로, 대량의 로그 데이터를 가져와서 분석하는 용도에 적합하지 않습니다. 인스턴스를 관리해야 하고, 데이터 로드에 시간이 걸리며, 분석 쿼리에 최적화되어 있지 않습니다.

**핵심 개념:** Amazon Athena - S3 데이터 직접 쿼리, 서버리스, 스캔 기반 과금

---

### Q2. A data team uses Athena to query large datasets. They want to reduce query costs significantly. What is the most effective approach?

**한글 번역:** 데이터 팀이 Athena를 사용하여 대규모 데이터셋을 쿼리합니다. 쿼리 비용을 크게 줄이고 싶습니다. 가장 효과적인 접근 방식은 무엇일까요?

**선지:**
- A) Use larger EC2 instances for Athena → Athena에 더 큰 EC2 인스턴스 사용
- B) Convert data to Parquet format using AWS Glue → AWS Glue를 사용하여 데이터를 Parquet 형식으로 변환
- C) Enable S3 Transfer Acceleration → S3 Transfer Acceleration 활성화
- D) Use S3 Intelligent-Tiering → S3 Intelligent-Tiering 사용

**정답:** B

**선지별 해설:**
- **A) Use larger EC2 instances for Athena:** 오답. Athena는 서버리스 서비스로, EC2 인스턴스를 선택하거나 관리하지 않습니다. Athena에 인스턴스 크기라는 개념 자체가 없으므로 잘못된 선지입니다.
- **B) Convert data to Parquet format using AWS Glue:** 정답. Athena는 스캔한 데이터 양에 따라 비용이 청구됩니다. CSV를 Parquet(열 기반 형식)으로 변환하면 컬럼 압축 및 열 기반 스캔이 가능하여 스캔 데이터 양이 대폭 줄어듭니다. 일반적으로 30~90%의 비용 절감이 가능합니다. AWS Glue ETL을 사용하면 이 변환을 자동화할 수 있습니다.
- **C) Enable S3 Transfer Acceleration:** 오답. S3 Transfer Acceleration은 클라이언트와 S3 버킷 간의 데이터 전송 속도를 높이는 기능입니다. Athena 쿼리 비용이나 성능과는 관련이 없습니다.
- **D) Use S3 Intelligent-Tiering:** 오답. S3 Intelligent-Tiering은 접근 패턴에 따라 데이터를 자동으로 스토리지 계층 간 이동하여 저장 비용을 최적화하는 기능입니다. Athena 쿼리 비용(스캔 비용)을 줄이는 것과는 관련이 없습니다.

**핵심 개념:** Athena 비용 최적화 - 열 기반(columnar) 형식(Parquet, ORC) 사용, 데이터 파티셔닝

---

### Q3. A company needs to run complex joins and aggregations on petabytes of structured data for BI reporting. Queries run frequently. Which service is most appropriate?

**한글 번역:** 회사가 BI 리포팅을 위해 페타바이트 규모의 구조화된 데이터에서 복잡한 조인과 집계를 실행해야 합니다. 쿼리가 자주 실행됩니다. 가장 적합한 서비스는 무엇일까요?

**선지:**
- A) Athena → Athena
- B) Redshift → Redshift
- C) DynamoDB → DynamoDB
- D) EMR with Hive → Hive를 사용한 EMR

**정답:** B

**선지별 해설:**
- **A) Athena:** 오답. Athena는 임시(ad-hoc) 쿼리에 적합하지만, 자주 실행되는 복잡한 쿼리에는 Redshift가 더 효율적입니다. Athena는 스캔 기반 과금이므로 쿼리가 자주 실행되면 비용이 높아지고, 페타바이트 규모의 복잡한 조인에서는 성능이 떨어질 수 있습니다.
- **B) Redshift:** 정답. Redshift는 페타바이트 규모의 데이터 웨어하우스로, 복잡한 SQL 조인과 집계에 최적화되어 있습니다. MPP(Massively Parallel Processing) 아키텍처를 사용하여 빠른 쿼리 성능을 제공하며, 열 기반 저장으로 분석 워크로드에 적합합니다. BI 도구와의 연동이 뛰어나고, 자주 실행되는 쿼리에 비용 효율적입니다.
- **C) DynamoDB:** 오답. DynamoDB는 NoSQL 키-값 데이터베이스로, 복잡한 SQL 조인과 집계를 지원하지 않습니다. 분석 쿼리가 아닌 트랜잭션 처리에 적합합니다.
- **D) EMR with Hive:** 오답. EMR with Hive는 대규모 데이터 처리가 가능하지만, 클러스터를 직접 관리해야 하며 BI 리포팅 워크로드에는 Redshift가 더 적합합니다. Hive는 배치 처리에 더 적합하고, 자주 실행되는 대화형 쿼리에는 덜 최적화되어 있습니다.

**핵심 개념:** Amazon Redshift - 페타바이트 규모 데이터 웨어하우스, 복잡한 분석 쿼리, MPP 아키텍처

---

### Q4. A company uses DynamoDB. They need a search feature allowing partial text matching across multiple fields. Which architecture is most appropriate?

**한글 번역:** 회사가 DynamoDB를 사용합니다. 여러 필드에 걸쳐 부분 텍스트 매칭을 허용하는 검색 기능이 필요합니다. 가장 적합한 아키텍처는 무엇일까요?

**선지:**
- A) DynamoDB GSI → DynamoDB 글로벌 보조 인덱스(GSI)
- B) DynamoDB with DynamoDB Streams to sync to OpenSearch → DynamoDB Streams를 사용하여 OpenSearch와 동기화
- C) Switch to RDS with full-text search → 전체 텍스트 검색이 가능한 RDS로 전환
- D) Use Athena to query DynamoDB → Athena를 사용하여 DynamoDB 쿼리

**정답:** B

**선지별 해설:**
- **A) DynamoDB GSI:** 오답. GSI(Global Secondary Index)는 다른 파티션 키/정렬 키로 쿼리할 수 있게 해주지만, 부분 텍스트 검색(partial text matching)이나 전체 텍스트 검색을 지원하지 않습니다. GSI는 정확한 키 값 일치 또는 범위 쿼리만 가능합니다.
- **B) DynamoDB Streams to sync to OpenSearch:** 정답. DynamoDB Streams를 통해 데이터 변경 사항을 실시간으로 OpenSearch(Elasticsearch)에 동기화하면, OpenSearch의 강력한 전체 텍스트 검색 기능을 활용할 수 있습니다. 부분 텍스트 매칭, 퍼지 검색, 여러 필드에 걸친 검색 등을 효율적으로 수행할 수 있습니다. DynamoDB는 메인 데이터 저장소로 유지하면서 검색 기능만 OpenSearch로 오프로드하는 일반적인 패턴입니다.
- **C) Switch to RDS with full-text search:** 오답. 기존 DynamoDB를 RDS로 완전히 전환하는 것은 과도한 변경입니다. 데이터 모델과 애플리케이션 코드를 전면 재작성해야 하며, DynamoDB의 확장성 이점을 잃게 됩니다. 또한 RDS의 전체 텍스트 검색은 OpenSearch만큼 강력하지 않습니다.
- **D) Athena to query DynamoDB:** 오답. Athena는 S3 데이터를 쿼리하는 서비스로, DynamoDB를 직접 쿼리하는 데 적합하지 않습니다. Athena 커넥터를 통해 DynamoDB를 쿼리할 수 있지만, 부분 텍스트 검색에 최적화되어 있지 않으며 실시간 검색 용도로는 부적합합니다.

**핵심 개념:** DynamoDB Streams + OpenSearch - 전체 텍스트 검색 패턴

---

### Q5. A company wants a data lake with fine-grained access control at row and column level for different teams using Athena and Redshift. Which service should they use?

**한글 번역:** 회사가 Athena와 Redshift를 사용하는 다양한 팀을 위해 행 및 열 수준의 세밀한 접근 제어가 가능한 데이터 레이크를 원합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) AWS Glue with IAM → IAM을 사용한 AWS Glue
- B) Amazon S3 with bucket policies → 버킷 정책을 사용한 Amazon S3
- C) AWS Lake Formation → AWS Lake Formation
- D) Amazon Redshift with row-level security → 행 수준 보안을 사용한 Amazon Redshift

**정답:** C

**선지별 해설:**
- **A) AWS Glue with IAM:** 오답. Glue는 ETL 서비스이며 데이터 카탈로그를 제공하지만, 행/열 수준의 세밀한 접근 제어를 제공하지 않습니다. IAM 정책만으로는 테이블 내의 행과 열 단위 권한 관리가 어렵습니다.
- **B) Amazon S3 with bucket policies:** 오답. S3 버킷 정책은 객체(파일) 수준의 접근 제어만 가능합니다. 파일 내의 행이나 열 단위로 접근을 제어할 수 없으므로, 세밀한 데이터 접근 제어에는 적합하지 않습니다.
- **C) AWS Lake Formation:** 정답. Lake Formation은 데이터 레이크 구축 및 관리를 위한 서비스로, 행 수준 및 열 수준의 세밀한 접근 제어(Fine-Grained Access Control)를 중앙에서 관리할 수 있습니다. Athena, Redshift Spectrum, EMR 등 다양한 분석 서비스와 통합되며, 팀별로 서로 다른 데이터 접근 권한을 설정할 수 있습니다.
- **D) Redshift with row-level security:** 오답. Redshift의 행 수준 보안은 Redshift 내부에서만 작동하며, Athena 쿼리에는 적용되지 않습니다. 문제에서 Athena와 Redshift 모두에 대한 접근 제어를 요구하고 있으므로, 중앙 집중식으로 여러 서비스에 적용할 수 있는 Lake Formation이 더 적합합니다.

**핵심 개념:** AWS Lake Formation - 데이터 레이크 접근 제어, 행/열 수준 세밀한 권한 관리

---

### Q6. A company needs to process real-time streaming data from Apache Kafka using Apache Flink. They want a fully managed solution. Which service should they use?

**한글 번역:** 회사가 Apache Kafka에서 오는 실시간 스트리밍 데이터를 Apache Flink를 사용하여 처리해야 합니다. 완전 관리형 솔루션을 원합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Kinesis Data Firehose → Kinesis Data Firehose
- B) Amazon Managed Service for Apache Flink with Amazon MSK as source → Amazon MSK를 소스로 사용하는 Amazon Managed Service for Apache Flink
- C) AWS Glue Streaming ETL → AWS Glue 스트리밍 ETL
- D) Amazon EMR with Apache Flink → Apache Flink를 사용한 Amazon EMR

**정답:** B

**선지별 해설:**
- **A) Kinesis Data Firehose:** 오답. Firehose는 스트리밍 데이터를 S3, Redshift, OpenSearch 등의 대상에 전달하는 서비스입니다. Apache Flink를 사용한 복잡한 실시간 처리를 지원하지 않으며, Apache Kafka를 직접 소스로 사용하지도 않습니다.
- **B) Managed Service for Apache Flink with Amazon MSK:** 정답. Amazon Managed Service for Apache Flink(구 Kinesis Data Analytics for Apache Flink)는 Apache Flink 애플리케이션을 완전 관리형으로 실행할 수 있는 서비스입니다. Amazon MSK(Managed Streaming for Apache Kafka)를 소스로 사용하여 Kafka 데이터를 Flink로 처리할 수 있습니다. 두 서비스 모두 완전 관리형이므로 요구사항에 정확히 부합합니다.
- **C) AWS Glue Streaming ETL:** 오답. Glue Streaming은 스트리밍 ETL을 지원하지만, Apache Flink가 아닌 Apache Spark Streaming을 기반으로 합니다. 문제에서 명시적으로 Apache Flink를 요구하고 있으므로 적합하지 않습니다.
- **D) Amazon EMR with Apache Flink:** 오답. EMR에서 Apache Flink를 실행할 수 있지만, EMR 클러스터를 직접 관리해야 합니다. "완전 관리형(fully managed)" 요구사항을 충족하지 못합니다.

**핵심 개념:** Amazon Managed Service for Apache Flink + Amazon MSK - 완전 관리형 Kafka + Flink 스트리밍 처리

---

### Q7. A company wants interactive business dashboards embeddable in a web application. They need per-session pricing and in-memory computation. Which service should they use?

**한글 번역:** 회사가 웹 애플리케이션에 임베드할 수 있는 대화형 비즈니스 대시보드를 원합니다. 세션당 가격 책정과 인메모리 연산이 필요합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Athena with custom visualization → 맞춤 시각화가 있는 Athena
- B) Amazon QuickSight with SPICE engine → SPICE 엔진을 사용한 Amazon QuickSight
- C) Redshift with a BI tool → BI 도구를 사용한 Redshift
- D) Amazon OpenSearch Dashboards → Amazon OpenSearch 대시보드

**정답:** B

**선지별 해설:**
- **A) Athena with custom visualization:** 오답. Athena는 쿼리 엔진이며 시각화 기능이 내장되어 있지 않습니다. 맞춤 시각화를 구축하려면 별도의 프런트엔드 개발이 필요하며, 세션당 가격 책정이나 인메모리 연산 기능을 제공하지 않습니다.
- **B) Amazon QuickSight with SPICE engine:** 정답. QuickSight는 AWS의 완전 관리형 BI 서비스로, 대화형 대시보드를 웹 앱에 임베드할 수 있습니다. SPICE(Super-fast, Parallel, In-memory Calculation Engine)는 인메모리 연산을 제공하며, 세션당 가격 책정(per-session pricing)을 지원하여 비용 효율적입니다. 모든 요구사항에 정확히 부합합니다.
- **C) Redshift with a BI tool:** 오답. Redshift는 데이터 웨어하우스이며, BI 도구를 별도로 구매하고 관리해야 합니다. 세션당 가격 책정이 아니며, 임베딩 기능이 Redshift 자체에 포함되어 있지 않습니다.
- **D) Amazon OpenSearch Dashboards:** 오답. OpenSearch Dashboards는 로그 및 검색 데이터의 시각화에 적합하지만, 범용 BI 대시보드 용도로는 적합하지 않습니다. 세션당 가격 책정을 제공하지 않으며, 웹 앱 임베딩 기능이 QuickSight만큼 유연하지 않습니다.

**핵심 개념:** Amazon QuickSight - BI 대시보드, SPICE 인메모리 엔진, 세션당 가격, 임베딩 지원

---

### Q8. A data team needs to discover metadata about datasets across S3, RDS, and DynamoDB. They want to make metadata available for Athena and Redshift Spectrum. Which service should they use?

**한글 번역:** 데이터 팀이 S3, RDS, DynamoDB에 걸친 데이터셋의 메타데이터를 발견해야 합니다. Athena와 Redshift Spectrum에서 메타데이터를 사용할 수 있게 하려고 합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) AWS Lake Formation → AWS Lake Formation
- B) AWS Glue Data Catalog → AWS Glue 데이터 카탈로그
- C) Amazon Athena Data Source Connectors → Amazon Athena 데이터 소스 커넥터
- D) AWS Config → AWS Config

**정답:** B

**선지별 해설:**
- **A) AWS Lake Formation:** 오답. Lake Formation은 데이터 레이크 구축 및 접근 제어에 중점을 둔 서비스입니다. 내부적으로 Glue Data Catalog를 사용하지만, 문제의 핵심은 메타데이터 발견(discovery)과 카탈로그화입니다. Lake Formation은 접근 제어가 주요 기능이므로, 메타데이터 관리 자체에는 Glue Data Catalog가 더 직접적인 답변입니다.
- **B) AWS Glue Data Catalog:** 정답. Glue Data Catalog는 AWS의 중앙 메타데이터 저장소입니다. Glue 크롤러를 사용하여 S3, RDS, DynamoDB 등의 데이터 소스를 자동으로 스캔하고 스키마를 발견하여 메타데이터를 카탈로그에 등록합니다. Athena와 Redshift Spectrum은 Glue Data Catalog를 기본 메타스토어로 사용합니다.
- **C) Athena Data Source Connectors:** 오답. Athena 커넥터는 Athena에서 다양한 데이터 소스를 쿼리할 수 있게 해주지만, 메타데이터 발견 및 카탈로그 관리 도구가 아닙니다. 또한 Redshift Spectrum에는 적용되지 않습니다.
- **D) AWS Config:** 오답. AWS Config는 AWS 리소스의 구성(configuration) 변경을 추적하고 규정 준수를 모니터링하는 서비스입니다. 데이터 내용의 메타데이터(스키마, 테이블 구조 등)를 발견하는 것과는 완전히 다른 목적의 서비스입니다.

**핵심 개념:** AWS Glue Data Catalog - 중앙 메타데이터 저장소, Athena/Redshift Spectrum 통합

---
