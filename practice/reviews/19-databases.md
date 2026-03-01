# Section 19 - Databases 연습문제 해설

---

### Q1. A company needs to migrate an on-premises MongoDB database to AWS with minimal code changes. The database stores JSON documents and requires high availability across multiple AZs. Which service should they use?

**한글 번역:** 회사가 온프레미스 MongoDB 데이터베이스를 최소한의 코드 변경으로 AWS로 마이그레이션해야 합니다. 데이터베이스는 JSON 문서를 저장하며 다중 AZ에 걸친 고가용성이 필요합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon RDS for MongoDB → Amazon RDS for MongoDB
- B) Amazon DynamoDB → Amazon DynamoDB
- C) Amazon DocumentDB → Amazon DocumentDB
- D) Amazon Neptune → Amazon Neptune

**정답:** C

**선지별 해설:**
- **A) Amazon RDS for MongoDB:** 오답. Amazon RDS는 MongoDB를 지원하지 않습니다. RDS가 지원하는 엔진은 MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2입니다. 존재하지 않는 서비스이므로 오답입니다.
- **B) Amazon DynamoDB:** 오답. DynamoDB는 JSON 문서를 저장할 수 있지만, MongoDB와 API 호환성이 없습니다. "최소한의 코드 변경"이라는 조건을 충족하지 못합니다. MongoDB에서 DynamoDB로 마이그레이션하면 데이터 모델과 쿼리 패턴을 대폭 변경해야 합니다.
- **C) Amazon DocumentDB:** 정답. DocumentDB는 MongoDB와 호환되는 완전 관리형 문서 데이터베이스입니다. MongoDB 3.6/4.0 API와 호환되므로 기존 MongoDB 코드를 최소한의 변경으로 마이그레이션할 수 있습니다. 자동으로 3개 AZ에 걸쳐 6개의 데이터 복제본을 저장하여 고가용성을 제공합니다.
- **D) Amazon Neptune:** 오답. Neptune은 그래프 데이터베이스로, 관계(relationship) 데이터를 저장하고 쿼리하는 데 최적화되어 있습니다. JSON 문서 저장소로 적합하지 않으며, MongoDB와의 호환성도 없습니다.

**핵심 개념:** Amazon DocumentDB - MongoDB 호환 문서 데이터베이스

---

### Q2. A startup is building a serverless application. They need a database with single-digit millisecond latency. Traffic is unpredictable. They want to avoid capacity planning. Which configuration should they use?

**한글 번역:** 스타트업이 서버리스 애플리케이션을 구축하고 있습니다. 한 자릿수 밀리초 지연 시간의 데이터베이스가 필요합니다. 트래픽이 예측 불가능합니다. 용량 계획을 피하고 싶습니다. 어떤 구성을 사용해야 할까요?

**선지:**
- A) Amazon RDS with Multi-AZ → Amazon RDS 다중 AZ 구성
- B) Amazon Aurora Serverless → Amazon Aurora Serverless
- C) Amazon DynamoDB with on-demand capacity → Amazon DynamoDB 온디맨드 용량 모드
- D) Amazon ElastiCache with Redis → Redis를 사용한 Amazon ElastiCache

**정답:** C

**선지별 해설:**
- **A) Amazon RDS with Multi-AZ:** 오답. RDS Multi-AZ는 고가용성을 제공하지만, 서버리스가 아니며 인스턴스 크기를 미리 선택해야 하므로 용량 계획이 필요합니다. 예측 불가능한 트래픽에 자동으로 대응하지 못합니다.
- **B) Amazon Aurora Serverless:** 오답. Aurora Serverless는 자동 스케일링을 제공하지만, 관계형 데이터베이스입니다. 문제에서 "서버리스 앱"과 "용량 계획 회피"를 강조하고 있으며, DynamoDB 온디맨드가 이 요구사항에 더 적합합니다. Aurora Serverless도 최소 ACU(Aurora Capacity Unit)를 설정해야 합니다.
- **C) DynamoDB with on-demand capacity:** 정답. DynamoDB 온디맨드 모드는 용량 계획이 전혀 필요 없습니다. 트래픽에 따라 자동으로 확장/축소되며, 사용한 읽기/쓰기 요청에 대해서만 비용을 지불합니다. 한 자릿수 밀리초 지연 시간을 제공하며, 완전한 서버리스 서비스입니다.
- **D) Amazon ElastiCache with Redis:** 오답. ElastiCache는 캐시 서비스로 매우 낮은 지연 시간을 제공하지만, 주 데이터베이스로 사용하기에는 적합하지 않습니다. 또한 노드 크기와 수를 미리 지정해야 하므로 용량 계획이 필요합니다.

**핵심 개념:** DynamoDB On-Demand Capacity Mode - 서버리스, 예측 불가능한 워크로드

---

### Q3. A social media company needs to store and query user relationships (friends, followers, shared content). Queries involve traversing multiple levels of connections. Which database service is most appropriate?

**한글 번역:** 소셜 미디어 회사가 사용자 관계(친구, 팔로워, 공유 콘텐츠)를 저장하고 쿼리해야 합니다. 쿼리는 여러 단계의 연결을 탐색합니다. 가장 적합한 데이터베이스 서비스는 무엇일까요?

**선지:**
- A) Amazon DynamoDB → Amazon DynamoDB
- B) Amazon RDS for PostgreSQL → Amazon RDS for PostgreSQL
- C) Amazon Neptune → Amazon Neptune
- D) Amazon DocumentDB → Amazon DocumentDB

**정답:** C

**선지별 해설:**
- **A) Amazon DynamoDB:** 오답. DynamoDB는 키-값 및 문서 데이터베이스로, 단순한 키 기반 조회에 최적화되어 있습니다. 다단계 관계 탐색(graph traversal)에는 비효율적이며, 복잡한 조인이 필요한 관계형 쿼리를 지원하지 않습니다.
- **B) Amazon RDS for PostgreSQL:** 오답. PostgreSQL은 관계형 데이터베이스로 조인을 지원하지만, 여러 단계의 관계를 탐색하는 그래프 쿼리는 복잡한 재귀 쿼리가 필요하며 성능이 크게 저하됩니다. 소셜 네트워크와 같은 깊은 관계 탐색에는 적합하지 않습니다.
- **C) Amazon Neptune:** 정답. Neptune은 완전 관리형 그래프 데이터베이스로, 관계(relationship) 데이터의 저장과 탐색에 최적화되어 있습니다. 소셜 네트워크, 추천 엔진, 사기 탐지 등 관계 중심 쿼리에 이상적입니다. Apache TinkerPop Gremlin과 SPARQL 쿼리 언어를 지원하여 다단계 관계 탐색을 효율적으로 수행합니다.
- **D) Amazon DocumentDB:** 오답. DocumentDB는 JSON 문서 데이터베이스(MongoDB 호환)로, 문서 저장에 최적화되어 있습니다. 관계 탐색 기능이 내장되어 있지 않으며, 그래프 쿼리에는 적합하지 않습니다.

**핵심 개념:** Amazon Neptune - 그래프 데이터베이스, 관계 탐색(graph traversal)

---

### Q4. A company runs Oracle on-premises and needs to migrate to AWS. The DBA requires OS-level access. Which service should they use?

**한글 번역:** 회사가 온프레미스에서 Oracle을 운영하고 있으며 AWS로 마이그레이션해야 합니다. DBA가 OS 수준의 접근이 필요합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon RDS for Oracle → Amazon RDS for Oracle
- B) Amazon RDS Custom for Oracle → Amazon RDS Custom for Oracle
- C) Amazon Aurora → Amazon Aurora
- D) Oracle on Amazon EC2 → Amazon EC2에서 Oracle 운영

**정답:** B

**선지별 해설:**
- **A) Amazon RDS for Oracle:** 오답. 일반 RDS for Oracle은 완전 관리형 서비스로, OS 수준의 접근 권한을 제공하지 않습니다. AWS가 패치, 백업, OS 관리를 모두 처리하며, 사용자는 데이터베이스 수준의 접근만 가능합니다.
- **B) Amazon RDS Custom for Oracle:** 정답. RDS Custom은 RDS의 관리 편의성과 EC2의 커스터마이징 유연성을 결합한 서비스입니다. OS 및 데이터베이스 수준의 접근이 가능하며, SSH를 통해 인스턴스에 접속할 수 있습니다. 동시에 자동 백업, 패치 등 RDS의 관리 기능도 활용할 수 있습니다. Oracle과 SQL Server를 지원합니다.
- **C) Amazon Aurora:** 오답. Aurora는 MySQL 및 PostgreSQL과 호환되는 AWS 자체 데이터베이스 엔진입니다. Oracle을 지원하지 않으므로 Oracle 마이그레이션에 사용할 수 없습니다.
- **D) Oracle on Amazon EC2:** 오답이지만 가능한 옵션입니다. EC2에 Oracle을 직접 설치하면 완전한 OS 접근이 가능하지만, 모든 관리(백업, 패치, 고가용성 등)를 직접 수행해야 합니다. RDS Custom이 관리 부담을 줄이면서 OS 접근을 제공하므로 더 나은 선택입니다.

**핵심 개념:** Amazon RDS Custom - OS 수준 접근이 가능한 관리형 데이터베이스 (Oracle, SQL Server)

---

### Q5. An IoT company collects sensor data from millions of devices. They need time-stamped readings for real-time analytics. The solution should automatically manage data lifecycle. Which service should they use?

**한글 번역:** IoT 회사가 수백만 대의 장치에서 센서 데이터를 수집합니다. 실시간 분석을 위한 타임스탬프가 있는 데이터가 필요합니다. 솔루션이 자동으로 데이터 수명 주기를 관리해야 합니다. 어떤 서비스를 사용해야 할까요?

**선지:**
- A) Amazon DynamoDB with TTL → TTL을 사용한 Amazon DynamoDB
- B) Amazon Timestream → Amazon Timestream
- C) Amazon Redshift → Amazon Redshift
- D) Amazon RDS with partitioning → 파티셔닝을 사용한 Amazon RDS

**정답:** B

**선지별 해설:**
- **A) DynamoDB with TTL:** 오답. DynamoDB TTL은 만료된 항목을 삭제할 수 있지만, 시계열 데이터에 최적화된 서비스가 아닙니다. 시계열 쿼리(시간 범위 조회, 집계 등)를 효율적으로 수행하기 어렵고, 데이터 수명 주기 관리도 단순 삭제에 그칩니다.
- **B) Amazon Timestream:** 정답. Timestream은 IoT 및 운영 애플리케이션을 위한 완전 관리형 시계열 데이터베이스입니다. 자동으로 데이터를 메모리 스토어(최근 데이터)에서 마그네틱 스토어(오래된 데이터)로 이동하여 데이터 수명 주기를 관리합니다. 시계열 분석 함수가 내장되어 있으며, 관계형 데이터베이스 대비 1/10의 비용과 1000배 빠른 쿼리 속도를 제공합니다.
- **C) Amazon Redshift:** 오답. Redshift는 데이터 웨어하우스로 대규모 분석 쿼리에 적합하지만, 시계열 데이터에 특화되어 있지 않습니다. 실시간 데이터 수집에 최적화되어 있지 않으며, 자동 데이터 수명 주기 관리 기능이 없습니다.
- **D) Amazon RDS with partitioning:** 오답. RDS에서 시간 기반 파티셔닝을 사용할 수 있지만, 수백만 대의 IoT 장치에서 오는 대량의 시계열 데이터를 처리하기에는 확장성이 부족합니다. 또한 데이터 수명 주기 관리를 직접 구현해야 합니다.

**핵심 개념:** Amazon Timestream - 시계열 데이터베이스, 자동 데이터 수명 주기 관리

---

### Q6. A company uses DynamoDB for e-commerce. There is high read traffic during sales events. They need to reduce read latency from milliseconds to microseconds. What should they implement?

**한글 번역:** 회사가 전자상거래에 DynamoDB를 사용합니다. 세일 이벤트 중 높은 읽기 트래픽이 발생합니다. 읽기 지연 시간을 밀리초에서 마이크로초로 줄여야 합니다. 무엇을 구현해야 할까요?

**선지:**
- A) DynamoDB Read Replicas → DynamoDB 읽기 전용 복제본
- B) Amazon ElastiCache in front of DynamoDB → DynamoDB 앞에 Amazon ElastiCache 배치
- C) DynamoDB Accelerator (DAX) → DynamoDB Accelerator (DAX)
- D) DynamoDB On-Demand capacity mode → DynamoDB 온디맨드 용량 모드

**정답:** C

**선지별 해설:**
- **A) DynamoDB Read Replicas:** 오답. DynamoDB에는 "Read Replicas"라는 기능이 존재하지 않습니다. 이는 RDS/Aurora의 개념입니다. DynamoDB는 글로벌 테이블(Global Tables)을 통해 다른 리전에 복제본을 만들 수 있지만, 이는 읽기 복제본과는 다른 개념입니다.
- **B) ElastiCache in front of DynamoDB:** 오답. ElastiCache를 DynamoDB 앞에 배치하면 캐싱을 통해 지연 시간을 줄일 수 있지만, 애플리케이션 코드에서 캐시 로직(cache invalidation, cache aside 패턴 등)을 직접 구현해야 합니다. DAX가 DynamoDB에 특화된 더 간편한 솔루션입니다.
- **C) DynamoDB Accelerator (DAX):** 정답. DAX는 DynamoDB 전용 인메모리 캐시로, 마이크로초 단위의 읽기 지연 시간을 제공합니다. DynamoDB API와 완벽하게 호환되므로 애플리케이션 코드를 거의 변경하지 않아도 됩니다. 읽기 집중 워크로드에 이상적이며, 핫 키 문제도 해결합니다.
- **D) DynamoDB On-Demand capacity mode:** 오답. 온디맨드 모드는 트래픽 증가에 따라 자동으로 용량을 확장하여 스로틀링을 방지하지만, 읽기 지연 시간을 마이크로초 수준으로 줄이지는 못합니다. 지연 시간이 아닌 처리량 문제를 해결하는 옵션입니다.

**핵심 개념:** DynamoDB Accelerator (DAX) - DynamoDB 전용 인메모리 캐시, 마이크로초 지연 시간

---

### Q7. A company needs a globally distributed database that allows read and write in multiple regions simultaneously. Which solution provides active-active multi-region capability?

**한글 번역:** 회사가 여러 리전에서 동시에 읽기 및 쓰기가 가능한 전 세계에 분산된 데이터베이스가 필요합니다. 액티브-액티브 다중 리전 기능을 제공하는 솔루션은 무엇일까요?

**선지:**
- A) Amazon Aurora Global Database → Amazon Aurora 글로벌 데이터베이스
- B) Amazon RDS Multi-AZ → Amazon RDS 다중 AZ
- C) Amazon DynamoDB Global Tables → Amazon DynamoDB 글로벌 테이블
- D) Amazon ElastiCache Global Datastore → Amazon ElastiCache 글로벌 데이터스토어

**정답:** C

**선지별 해설:**
- **A) Aurora Global Database:** 오답. Aurora Global Database는 크로스 리전 읽기 전용 복제본을 제공하지만, 기본적으로 **액티브-패시브** 구조입니다. 하나의 프라이머리 리전에서만 쓰기가 가능하고, 세컨더리 리전은 읽기 전용입니다. (Aurora에 Write Forwarding 기능이 있지만 이는 진정한 액티브-액티브가 아닙니다.)
- **B) Amazon RDS Multi-AZ:** 오답. Multi-AZ는 같은 리전 내에서 고가용성을 제공하는 기능으로, 스탠바이 인스턴스는 읽기/쓰기에 사용되지 않습니다. 다중 리전과는 관련이 없습니다.
- **C) DynamoDB Global Tables:** 정답. DynamoDB Global Tables는 여러 AWS 리전에 걸쳐 완전한 **액티브-액티브** 복제를 제공합니다. 모든 리전에서 읽기와 쓰기가 가능하며, 리전 간 변경 사항이 자동으로 복제됩니다. 충돌 해결은 "last writer wins" 방식으로 처리됩니다.
- **D) ElastiCache Global Datastore:** 오답. ElastiCache Global Datastore는 크로스 리전 복제를 제공하지만 액티브-패시브 구조입니다. 하나의 프라이머리 클러스터에서만 쓰기가 가능하고, 세컨더리 클러스터는 읽기 전용입니다.

**핵심 개념:** DynamoDB Global Tables - 액티브-액티브 다중 리전 복제

---
