# Section 07 - RDS, Aurora, ElastiCache 연습문제 해설

---

### Q1. A company runs a production MySQL database on Amazon RDS. The database experiences heavy read traffic during business hours. The company wants to offload read traffic without affecting write performance. What should a solutions architect recommend?

**한글 번역:** 회사가 Amazon RDS에서 프로덕션 MySQL 데이터베이스를 운영하고 있습니다. 데이터베이스는 업무 시간 동안 많은 읽기 트래픽을 경험합니다. 회사는 쓰기 성능에 영향을 주지 않고 읽기 트래픽을 분산하고자 합니다. 솔루션 아키텍트는 무엇을 추천해야 합니까?

**선지:**
- A) Enable Multi-AZ deployment → Multi-AZ 배포를 활성화한다
- B) Create Read Replicas and direct read traffic to the replica endpoints → Read Replica를 생성하고 읽기 트래픽을 레플리카 엔드포인트로 보낸다
- C) Increase the instance size → 인스턴스 크기를 늘린다
- D) Enable RDS Storage Auto Scaling → RDS 스토리지 Auto Scaling을 활성화한다

**정답:** B

**선지별 해설:**
- **A) Multi-AZ 배포:** Multi-AZ는 고가용성(HA)을 위한 기능으로, 장애 발생 시 자동 장애 조치(failover)를 제공합니다. 대기(standby) 인스턴스는 읽기 트래픽을 처리하지 않으므로 읽기 부하 분산에는 적합하지 않습니다.
- **B) Read Replica (정답):** Read Replica는 읽기 전용 복제본으로, 읽기 트래픽을 분산하는 데 최적의 솔루션입니다. 최대 15개(Aurora) 또는 5개(RDS)의 Read Replica를 생성할 수 있으며, 마스터 DB의 쓰기 성능에 영향을 주지 않습니다.
- **C) 인스턴스 크기 증가:** 수직 확장(vertical scaling)은 일시적으로 성능을 개선하지만, 읽기와 쓰기 트래픽을 분리하지 않으며 비용 효율적이지 않습니다. 또한 크기 변경 시 다운타임이 발생할 수 있습니다.
- **D) Storage Auto Scaling:** 스토리지 Auto Scaling은 저장 공간이 부족할 때 자동으로 확장하는 기능입니다. 읽기 성능이나 트래픽 분산과는 관련이 없습니다.

**핵심 개념:** RDS Read Replicas를 통한 읽기 확장(Read Scaling)

---

### Q2. A company wants to migrate its on-premises Microsoft SQL Server database to AWS with the ability to customize the underlying operating system. Which AWS service should they use?

**한글 번역:** 회사가 온프레미스 Microsoft SQL Server 데이터베이스를 AWS로 마이그레이션하면서 기본 운영 체제를 커스터마이즈할 수 있기를 원합니다. 어떤 AWS 서비스를 사용해야 합니까?

**선지:**
- A) Amazon RDS for SQL Server → Amazon RDS for SQL Server
- B) Amazon Aurora → Amazon Aurora
- C) Amazon RDS Custom for SQL Server → Amazon RDS Custom for SQL Server
- D) Amazon EC2 with SQL Server installed → SQL Server가 설치된 Amazon EC2

**정답:** C

**선지별 해설:**
- **A) RDS for SQL Server:** RDS는 완전 관리형 서비스로 OS 수준의 커스터마이즈가 불가능합니다. 패치, 백업 등은 자동화되지만 OS 접근이 제한됩니다.
- **B) Amazon Aurora:** Aurora는 MySQL과 PostgreSQL만 호환됩니다. SQL Server는 지원하지 않으므로 선택할 수 없습니다.
- **C) RDS Custom for SQL Server (정답):** RDS Custom은 RDS의 관리형 이점(자동 백업, 모니터링 등)을 유지하면서 OS 및 데이터베이스 커스터마이즈가 가능한 서비스입니다. SQL Server와 Oracle을 지원하며, SSH/RDP를 통해 OS에 접근할 수 있습니다.
- **D) EC2에 SQL Server 설치:** EC2에 직접 설치하면 OS를 완전히 제어할 수 있지만, 백업, 패치, 고가용성 등 모든 관리를 직접 해야 합니다. RDS Custom이 더 적은 운영 부담으로 동일한 커스터마이즈를 제공합니다.

**핵심 개념:** Amazon RDS Custom — OS 커스터마이즈가 필요한 RDS 워크로드

---

### Q3. An application uses Amazon Aurora MySQL as its database. The company needs to create a copy of the production database for testing purposes with minimal cost and time. What is the MOST efficient approach?

**한글 번역:** 애플리케이션이 Amazon Aurora MySQL을 데이터베이스로 사용합니다. 회사는 최소 비용과 시간으로 테스트 목적의 프로덕션 데이터베이스 복사본을 만들어야 합니다. 가장 효율적인 접근 방식은 무엇입니까?

**선지:**
- A) Create a manual snapshot and restore it → 수동 스냅샷을 생성하고 복원한다
- B) Use Aurora Database Cloning → Aurora 데이터베이스 클로닝을 사용한다
- C) Create a Read Replica and promote it → Read Replica를 생성하고 승격한다
- D) Use AWS DMS → AWS DMS를 사용한다

**정답:** B

**선지별 해설:**
- **A) 스냅샷 생성 및 복원:** 스냅샷 복원은 가능하지만, 전체 데이터를 복사하므로 시간이 오래 걸리고 저장 비용이 즉시 발생합니다. Aurora Cloning보다 비효율적입니다.
- **B) Aurora Database Cloning (정답):** Aurora Cloning은 copy-on-write 프로토콜을 사용하여 거의 즉시 데이터베이스 복사본을 생성합니다. 초기에는 원본과 동일한 스토리지를 공유하며, 변경된 데이터만 추가 저장 공간을 사용하므로 비용과 시간 모두 최소화됩니다.
- **C) Read Replica 승격:** Read Replica를 생성하고 승격하면 독립적인 DB가 되지만, 복제 과정에서 시간이 소요되며 Cloning보다 비효율적입니다.
- **D) AWS DMS:** DMS는 서로 다른 데이터베이스 엔진 간 마이그레이션이나 지속적 복제에 적합합니다. 동일한 Aurora 환경 내 복사에는 과도한 솔루션입니다.

**핵심 개념:** Aurora Database Cloning — copy-on-write 기반의 빠르고 비용 효율적인 DB 복제

---

### Q4. A company has a serverless application using Lambda functions that frequently connect to an RDS MySQL database. During peak hours, the database runs out of connections. What should a solutions architect recommend?

**한글 번역:** 회사가 Lambda 함수를 사용하는 서버리스 애플리케이션을 운영하고 있으며, RDS MySQL 데이터베이스에 자주 연결합니다. 피크 시간대에 데이터베이스 연결이 부족해집니다. 솔루션 아키텍트는 무엇을 추천해야 합니까?

**선지:**
- A) Increase the RDS instance size → RDS 인스턴스 크기를 늘린다
- B) Use Amazon RDS Proxy → Amazon RDS Proxy를 사용한다
- C) Switch to Aurora Serverless → Aurora Serverless로 전환한다
- D) Add Read Replicas → Read Replica를 추가한다

**정답:** B

**선지별 해설:**
- **A) RDS 인스턴스 크기 증가:** 인스턴스 크기를 늘리면 연결 수 한도가 약간 증가하지만, Lambda의 동시 실행으로 인한 연결 폭증 문제를 근본적으로 해결하지 못합니다.
- **B) RDS Proxy (정답):** RDS Proxy는 데이터베이스 연결을 풀링(pooling)하고 공유하여 연결 수를 크게 줄여줍니다. Lambda처럼 빈번하게 연결을 생성/종료하는 서버리스 환경에 최적입니다. 연결 다중화(multiplexing)를 통해 수천 개의 Lambda 호출이 소수의 DB 연결을 공유할 수 있습니다.
- **C) Aurora Serverless 전환:** Aurora Serverless는 자동 스케일링을 제공하지만, 연결 풀링 문제를 직접 해결하지는 않습니다. 또한 마이그레이션 비용과 노력이 필요합니다.
- **D) Read Replica 추가:** Read Replica는 읽기 트래픽을 분산하지만, 연결 부족 문제 자체를 해결하지는 않습니다. 쓰기 연결 부족에는 도움이 되지 않습니다.

**핵심 개념:** Amazon RDS Proxy — Lambda와 RDS 간 연결 풀링

---

### Q5. A company needs a caching solution that supports data persistence, high availability with automatic failover, and complex data types like sorted sets for a real-time leaderboard. Which solution should they choose?

**한글 번역:** 회사가 데이터 지속성, 자동 장애 조치를 통한 고가용성, 그리고 실시간 리더보드를 위한 정렬된 집합(sorted sets)과 같은 복잡한 데이터 타입을 지원하는 캐싱 솔루션이 필요합니다. 어떤 솔루션을 선택해야 합니까?

**선지:**
- A) ElastiCache for Memcached → ElastiCache for Memcached
- B) ElastiCache for Redis → ElastiCache for Redis
- C) DynamoDB DAX → DynamoDB DAX
- D) Amazon CloudFront → Amazon CloudFront

**정답:** B

**선지별 해설:**
- **A) ElastiCache for Memcached:** Memcached는 단순한 키-값 캐시로, 데이터 지속성(persistence)을 지원하지 않고, 자동 장애 조치가 없으며, 복잡한 데이터 타입(sorted sets 등)을 지원하지 않습니다. 단순 캐싱과 멀티스레드 성능에 적합합니다.
- **B) ElastiCache for Redis (정답):** Redis는 데이터 지속성(AOF, RDB 스냅샷), 자동 장애 조치(Multi-AZ with Auto-Failover), 그리고 Sorted Sets, Lists, Hashes 등 다양한 복잡한 데이터 타입을 지원합니다. 리더보드에는 Sorted Sets가 이상적입니다.
- **C) DynamoDB DAX:** DAX는 DynamoDB 전용 캐싱 레이어로, DynamoDB를 사용하지 않는 환경에서는 적합하지 않습니다. 또한 sorted sets 같은 복잡한 데이터 타입을 지원하지 않습니다.
- **D) Amazon CloudFront:** CloudFront는 CDN(콘텐츠 전송 네트워크)으로, 정적 콘텐츠 캐싱에 사용됩니다. 애플리케이션 레벨의 데이터 캐싱이나 복잡한 데이터 구조를 지원하지 않습니다.

**핵심 개념:** ElastiCache for Redis vs Memcached — Redis의 고급 기능(지속성, 장애 조치, 복잡한 데이터 타입)

---

### Q6. A company has an unencrypted Amazon RDS database and needs to enable encryption. What is the correct approach?

**한글 번역:** 회사가 암호화되지 않은 Amazon RDS 데이터베이스를 보유하고 있으며, 암호화를 활성화해야 합니다. 올바른 접근 방식은 무엇입니까?

**선지:**
- A) Enable encryption directly on the existing RDS instance → 기존 RDS 인스턴스에서 직접 암호화를 활성화한다
- B) Create a snapshot, copy as encrypted, and restore from encrypted snapshot → 스냅샷을 생성하고, 암호화된 복사본을 만들어, 암호화된 스냅샷에서 복원한다
- C) Enable AWS KMS encryption on the EBS volumes attached to RDS → RDS에 연결된 EBS 볼륨에서 AWS KMS 암호화를 활성화한다
- D) Use SSL/TLS connections to encrypt the database → SSL/TLS 연결을 사용하여 데이터베이스를 암호화한다

**정답:** B

**선지별 해설:**
- **A) 기존 인스턴스에서 직접 암호화:** RDS에서는 이미 생성된 암호화되지 않은 인스턴스에 직접 암호화를 활성화할 수 없습니다. 암호화는 인스턴스 생성 시에만 설정할 수 있습니다.
- **B) 스냅샷 → 암호화 복사 → 복원 (정답):** 올바른 절차입니다. ① 비암호화 DB의 스냅샷을 생성 → ② 스냅샷을 암호화된 복사본으로 복사 → ③ 암호화된 스냅샷에서 새 DB 인스턴스를 복원 → ④ 애플리케이션을 새 인스턴스로 전환합니다.
- **C) EBS 볼륨 암호화:** RDS의 EBS 볼륨은 AWS가 관리하므로 사용자가 직접 EBS 볼륨에 접근하여 암호화를 설정할 수 없습니다. RDS 암호화는 RDS 서비스를 통해 관리해야 합니다.
- **D) SSL/TLS 연결:** SSL/TLS는 전송 중 암호화(encryption in transit)로, 데이터가 네트워크를 통해 이동할 때 보호합니다. 저장 시 암호화(encryption at rest)와는 다른 개념이며, 디스크에 저장된 데이터를 보호하지 않습니다.

**핵심 개념:** RDS 암호화 — 비암호화 DB를 암호화하는 스냅샷 기반 프로세스

---

### Q7. A global company needs a relational database solution that provides sub-second replication across regions and can promote a secondary region in under 1 minute for DR. Which solution?

**한글 번역:** 글로벌 회사가 리전 간 1초 미만의 복제를 제공하고, DR을 위해 보조 리전을 1분 이내에 승격할 수 있는 관계형 데이터베이스 솔루션이 필요합니다. 어떤 솔루션을 선택해야 합니까?

**선지:**
- A) Amazon RDS with Cross-Region Read Replicas → 교차 리전 Read Replica가 있는 Amazon RDS
- B) Amazon Aurora Global Database → Amazon Aurora Global Database
- C) Amazon RDS Multi-AZ deployment → Amazon RDS Multi-AZ 배포
- D) Amazon Aurora with Cross-Region Read Replicas → 교차 리전 Read Replica가 있는 Amazon Aurora

**정답:** B

**선지별 해설:**
- **A) RDS 교차 리전 Read Replica:** RDS의 교차 리전 복제는 비동기식이며, 복제 지연(lag)이 수 초에서 수 분까지 발생할 수 있습니다. 승격도 수동이며 1분 이내 보장이 어렵습니다.
- **B) Aurora Global Database (정답):** Aurora Global Database는 전용 스토리지 레벨 복제를 사용하여 일반적으로 1초 미만의 복제 지연을 제공합니다. 보조 리전 승격(cross-region failover)은 1분 이내에 완료됩니다. 최대 5개의 보조 리전을 지원합니다.
- **C) RDS Multi-AZ:** Multi-AZ는 동일 리전 내 가용 영역 간 장애 조치를 제공합니다. 리전 간 복제 기능이 아니므로 글로벌 DR 요구사항을 충족하지 못합니다.
- **D) Aurora 교차 리전 Read Replica:** Aurora Read Replica의 교차 리전 복제도 비동기식이지만, Aurora Global Database의 전용 스토리지 복제보다 지연이 더 클 수 있습니다. 1분 이내 승격 보장은 Aurora Global Database만의 특징입니다.

**핵심 개념:** Aurora Global Database — 1초 미만 교차 리전 복제 및 1분 미만 DR 장애 조치

---

### Q8. A company stores user session data in ElastiCache and wants to ensure users remain logged in even if an EC2 instance fails. Which caching strategy?

**한글 번역:** 회사가 사용자 세션 데이터를 ElastiCache에 저장하고 있으며, EC2 인스턴스가 장애가 발생하더라도 사용자가 로그인 상태를 유지하도록 하고 싶습니다. 어떤 캐싱 전략을 사용해야 합니까?

**선지:**
- A) Lazy Loading → Lazy Loading (지연 로딩)
- B) Write Through → Write Through (즉시 쓰기)
- C) Session Store with TTL → TTL이 있는 Session Store (세션 저장소)
- D) Cache-aside pattern → Cache-aside 패턴

**정답:** C

**선지별 해설:**
- **A) Lazy Loading:** Lazy Loading은 캐시 미스 시에만 데이터를 로드하는 패턴입니다. 데이터베이스 쿼리 결과를 캐싱하는 데 적합하지만, 세션 관리 전략으로 설계된 것이 아닙니다.
- **B) Write Through:** Write Through는 데이터가 DB에 기록될 때 동시에 캐시에도 기록하는 패턴입니다. 데이터 일관성에는 좋지만, 세션 관리와는 직접적인 관련이 없습니다.
- **C) Session Store with TTL (정답):** ElastiCache를 세션 저장소로 사용하면 세션 데이터가 EC2 인스턴스와 독립적으로 저장됩니다. EC2 인스턴스가 장애가 나더라도 세션 데이터는 ElastiCache에 남아있어 사용자가 로그인 상태를 유지합니다. TTL(Time-To-Live)을 설정하여 세션 만료를 자동으로 관리할 수 있습니다.
- **D) Cache-aside 패턴:** Cache-aside는 Lazy Loading과 유사한 패턴으로, 애플리케이션이 캐시를 확인하고 없으면 DB에서 가져오는 방식입니다. 세션 관리에 최적화된 전략이 아닙니다.

**핵심 개념:** ElastiCache를 Session Store로 활용 — 상태 비저장(stateless) 애플리케이션 아키텍처

---
