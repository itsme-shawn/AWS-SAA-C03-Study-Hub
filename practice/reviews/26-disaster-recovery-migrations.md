# Section 26 - Disaster Recovery & Migrations 연습문제 해설

---

### Q1. Company requires DR strategy with RTO < 1 minute. Can tolerate minimal data loss. Willing to pay for full production environment. Which DR strategy?

**한글 번역:** 회사가 RTO 1분 미만의 DR 전략이 필요합니다. 최소한의 데이터 손실은 허용됩니다. 전체 프로덕션 환경 비용을 지불할 의향이 있습니다. 어떤 DR 전략을 사용해야 합니까?

**선지:**
- A) Backup and Restore → 백업 및 복원
- B) Pilot Light → 파일럿 라이트
- C) Warm Standby → 웜 스탠바이
- D) Multi Site / Hot Site → 멀티 사이트 / 핫 사이트

**정답:** D

**선지별 해설:**
- **A) Backup and Restore:** 가장 저렴하지만 RTO가 가장 깁니다(수 시간). 백업에서 전체 인프라를 복원해야 하므로 1분 미만의 RTO를 충족할 수 없습니다.
- **B) Pilot Light:** 핵심 시스템의 최소 버전만 항상 실행합니다. 장애 시 나머지 인프라를 프로비저닝해야 하므로 RTO가 수십 분에서 수 시간입니다. 1분 미만은 불가능합니다.
- **C) Warm Standby:** 축소된 프로덕션 환경이 항상 실행되며, 장애 시 스케일업합니다. RTO는 수 분이지만, 1분 미만을 보장하기는 어렵습니다.
- **D) Multi Site / Hot Site:** 정답입니다. 전체 프로덕션 환경이 Active-Active로 동시에 실행됩니다. 장애 시 즉시 트래픽을 전환할 수 있어 RTO가 거의 0에 가깝습니다(1분 미만 충족). 비용이 가장 높지만, 문제에서 전체 프로덕션 비용 지불 의향을 명시했습니다.

**핵심 개념:** DR 전략별 RTO/RPO 비교 (Backup & Restore < Pilot Light < Warm Standby < Multi Site)

---

### Q2. Company needs to migrate on-premises Oracle database to Amazon Aurora PostgreSQL. Which services?

**한글 번역:** 회사가 온프레미스 Oracle 데이터베이스를 Amazon Aurora PostgreSQL로 마이그레이션해야 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) AWS DMS only → AWS DMS만 사용
- B) AWS DMS with AWS SCT → AWS DMS와 AWS SCT 함께 사용
- C) AWS SCT only → AWS SCT만 사용
- D) AWS Application Migration Service → AWS Application Migration Service

**정답:** B

**선지별 해설:**
- **A) DMS만:** DMS는 데이터 마이그레이션을 수행하지만, Oracle에서 PostgreSQL로의 전환은 이기종(heterogeneous) 마이그레이션입니다. 스키마, 저장 프로시저, 데이터 타입 변환이 필요하므로 DMS만으로는 충분하지 않습니다.
- **B) DMS + SCT:** 정답입니다. AWS SCT(Schema Conversion Tool)는 소스 데이터베이스의 스키마, 뷰, 저장 프로시저 등을 대상 데이터베이스 엔진에 맞게 변환합니다. AWS DMS는 실제 데이터를 마이그레이션합니다. Oracle → Aurora PostgreSQL은 이기종 마이그레이션이므로 두 서비스가 모두 필요합니다.
- **C) SCT만:** SCT는 스키마 변환만 수행하며, 실제 데이터를 이동시키지 않습니다. 데이터 마이그레이션을 위해 DMS가 필요합니다.
- **D) Application Migration Service:** 이 서비스(구 CloudEndure Migration)는 서버 마이그레이션(리프트 앤 시프트)을 위한 것이며, 데이터베이스 마이그레이션 및 엔진 변환에는 적합하지 않습니다.

**핵심 개념:** 이기종 DB 마이그레이션 = SCT(스키마 변환) + DMS(데이터 마이그레이션)

---

### Q3. Company wants to ensure AWS backups cannot be deleted by anyone including root user to protect against ransomware. Which feature?

**한글 번역:** 회사가 랜섬웨어로부터 보호하기 위해 루트 사용자를 포함하여 누구도 AWS 백업을 삭제할 수 없도록 하려 합니다. 어떤 기능을 사용해야 합니까?

**선지:**
- A) S3 Object Lock → S3 Object Lock
- B) AWS Backup Vault Lock → AWS Backup Vault Lock
- C) AWS KMS key rotation → AWS KMS 키 교체
- D) IAM deny policies on backup deletion → 백업 삭제에 대한 IAM 거부 정책

**정답:** B

**선지별 해설:**
- **A) S3 Object Lock:** S3 Object Lock은 S3 객체에 대한 WORM(Write Once Read Many) 보호를 제공하지만, AWS Backup 전체에 적용되는 것은 아닙니다. AWS Backup으로 관리되는 모든 리소스 백업을 보호하려면 Backup Vault Lock이 더 적합합니다.
- **B) AWS Backup Vault Lock:** 정답입니다. AWS Backup Vault Lock은 백업 볼트에 WORM 정책을 적용하여 보존 기간 동안 백업을 삭제하거나 수정할 수 없게 합니다. 루트 사용자조차 삭제할 수 없으므로 랜섬웨어 방어에 최적입니다.
- **C) KMS 키 교체:** KMS 키 교체는 암호화 키를 주기적으로 교체하는 보안 기능이며, 백업 삭제 방지와는 관련이 없습니다.
- **D) IAM 거부 정책:** IAM 정책으로 삭제를 제한할 수 있지만, 루트 사용자는 IAM 정책의 영향을 받지 않습니다. 따라서 루트 사용자의 삭제를 차단할 수 없습니다.

**핵심 개념:** AWS Backup Vault Lock — WORM 정책으로 루트 사용자도 백업 삭제 불가

---

### Q4. Solutions architect needs to migrate large MySQL database on-premises to Aurora MySQL with minimal downtime. Both databases running simultaneously. Which approach?

**한글 번역:** 솔루션 아키텍트가 대규모 온프레미스 MySQL 데이터베이스를 최소 다운타임으로 Aurora MySQL로 마이그레이션해야 합니다. 두 데이터베이스가 동시에 실행되어야 합니다. 어떤 접근 방식을 사용해야 합니까?

**선지:**
- A) Percona XtraBackup to S3 and restore → Percona XtraBackup으로 S3에 백업 후 복원
- B) mysqldump export/import → mysqldump로 내보내기/가져오기
- C) AWS DMS with continuous data replication → AWS DMS를 사용한 연속 데이터 복제
- D) Create RDS MySQL Read Replica and promote → RDS MySQL 읽기 복제본 생성 후 승격

**정답:** C

**선지별 해설:**
- **A) Percona XtraBackup:** Percona XtraBackup은 MySQL 백업에 사용할 수 있고 Aurora로 복원도 가능하지만, 백업 시점 이후의 변경 사항에 대한 연속적인 복제를 지원하지 않습니다. 최소 다운타임과 동시 실행 요구사항을 완전히 충족하지 못합니다.
- **B) mysqldump:** mysqldump는 논리적 백업으로 대규모 데이터베이스에서는 매우 느리며, 데이터 내보내기/가져오기 중 다운타임이 필요합니다. 연속 복제를 지원하지 않으므로 최소 다운타임 요구사항에 부적합합니다.
- **C) DMS 연속 복제:** 정답입니다. AWS DMS는 초기 전체 로드(full load)를 수행한 후 CDC(Change Data Capture)를 통해 변경 사항을 지속적으로 복제합니다. 소스와 대상 데이터베이스가 동시에 실행되며, 동기화가 완료되면 짧은 컷오버로 전환할 수 있어 최소 다운타임을 달성합니다.
- **D) RDS Read Replica 생성 후 승격:** 온프레미스 MySQL에서 직접 RDS 읽기 복제본을 생성할 수 없습니다. 이 방법은 이미 RDS에 있는 데이터베이스에만 적용 가능합니다.

**핵심 개념:** AWS DMS의 CDC(Change Data Capture)를 통한 최소 다운타임 마이그레이션

---

### Q5. Company needs to transfer 200 TB as quickly as possible. Internet connection is 100 Mbps. FASTEST method?

**한글 번역:** 회사가 200TB의 데이터를 가능한 한 빨리 전송해야 합니다. 인터넷 연결은 100Mbps입니다. 가장 빠른 방법은 무엇입니까?

**선지:**
- A) AWS Direct Connect 1 Gbps → AWS Direct Connect 1 Gbps
- B) AWS Site-to-Site VPN → AWS Site-to-Site VPN
- C) AWS Snowball → AWS Snowball
- D) S3 Transfer Acceleration → S3 Transfer Acceleration

**정답:** C

**선지별 해설:**
- **A) Direct Connect 1 Gbps:** Direct Connect 설정에만 수 주에서 수 개월이 소요됩니다. 설정 후에도 1 Gbps로 200TB를 전송하면 약 18일 이상 걸립니다. 설정 시간을 포함하면 가장 빠른 방법이 아닙니다.
- **B) Site-to-Site VPN:** VPN은 100 Mbps 인터넷 연결을 사용하므로 이론적으로 200TB 전송에 약 185일(약 6개월)이 걸립니다. 매우 느립니다.
- **C) Snowball:** 정답입니다. AWS Snowball(현재 Snow Family)은 물리적 디바이스로 대량 데이터를 전송합니다. Snowball Edge는 80TB 용량이므로 3대가 필요하며, 배송 및 데이터 로드/언로드를 포함해도 약 1~2주면 완료됩니다. 100 Mbps 인터넷으로 200TB를 전송하는 것보다 훨씬 빠릅니다.
- **D) S3 Transfer Acceleration:** S3 Transfer Acceleration은 인터넷 연결 속도에 의존합니다. 100 Mbps 제한이 있으므로 근본적인 병목을 해결하지 못하며, 200TB 전송에 여전히 수개월이 걸립니다.

**핵심 개념:** AWS Snow Family — 대용량 데이터의 물리적 전송 (네트워크 병목 우회)

---

### Q6. Company using DMS to migrate database. Want to ensure HA of replication instance. What to enable?

**한글 번역:** 회사가 DMS를 사용하여 데이터베이스를 마이그레이션하고 있습니다. 복제 인스턴스의 고가용성을 보장하려면 무엇을 활성화해야 합니까?

**선지:**
- A) DMS Read Replicas → DMS 읽기 복제본
- B) DMS Multi-AZ deployment → DMS Multi-AZ 배포
- C) DMS Auto Scaling → DMS Auto Scaling
- D) DMS Cross-Region replication → DMS 교차 리전 복제

**정답:** B

**선지별 해설:**
- **A) DMS Read Replicas:** DMS에는 "읽기 복제본" 개념이 없습니다. 이것은 RDS의 기능입니다. DMS 복제 인스턴스에는 적용되지 않는 선택지입니다.
- **B) DMS Multi-AZ:** 정답입니다. DMS 복제 인스턴스를 Multi-AZ로 배포하면 대기(standby) 복제본이 다른 AZ에 생성됩니다. 주 복제 인스턴스에 장애가 발생하면 자동으로 대기 인스턴스로 장애 조치(failover)되어 마이그레이션이 중단되지 않습니다.
- **C) DMS Auto Scaling:** DMS 복제 인스턴스에는 Auto Scaling 기능이 없습니다. 인스턴스 크기는 수동으로 변경해야 합니다.
- **D) DMS Cross-Region 복제:** DMS 복제 인스턴스의 교차 리전 복제 기능은 존재하지 않습니다. DMS는 소스에서 대상으로 데이터를 복제하는 서비스이지, DMS 인스턴스 자체를 복제하는 것은 아닙니다.

**핵심 개념:** DMS Multi-AZ 배포로 복제 인스턴스 고가용성 확보

---

### Q7. Company wants to plan large-scale migration. Need detailed info about on-premises servers including running processes and network connections between systems. Which service and method?

**한글 번역:** 회사가 대규모 마이그레이션을 계획하려 합니다. 실행 중인 프로세스와 시스템 간 네트워크 연결을 포함한 온프레미스 서버에 대한 상세 정보가 필요합니다. 어떤 서비스와 방법을 사용해야 합니까?

**선지:**
- A) Application Discovery Service - Agentless Discovery → Application Discovery Service - 에이전트리스 검색
- B) Application Discovery Service - Agent-based Discovery → Application Discovery Service - 에이전트 기반 검색
- C) AWS Migration Hub → AWS Migration Hub
- D) AWS Application Migration Service → AWS Application Migration Service

**정답:** B

**선지별 해설:**
- **A) Agentless Discovery:** 에이전트리스 검색은 VMware 환경에서 VM 인벤토리, 구성, 성능 데이터를 수집합니다. 그러나 실행 중인 프로세스나 서버 간의 네트워크 종속성(dependency) 정보는 수집하지 않습니다. 상세 정보 요구사항을 충족하지 못합니다.
- **B) Agent-based Discovery:** 정답입니다. 에이전트 기반 검색은 각 서버에 Discovery Agent를 설치하여 실행 중인 프로세스, 네트워크 연결, 시스템 성능 데이터 등 상세 정보를 수집합니다. 서버 간의 종속성 매핑이 가능하여 마이그레이션 계획에 필수적인 정보를 제공합니다.
- **C) Migration Hub:** AWS Migration Hub는 마이그레이션 진행 상황을 추적하는 중앙 대시보드입니다. Discovery 데이터를 통합하여 보여주지만, 직접 서버 정보를 수집하지는 않습니다. 수집을 위해서는 Application Discovery Service가 필요합니다.
- **D) Application Migration Service:** Application Migration Service(구 CloudEndure Migration)는 실제 마이그레이션을 수행하는 서비스이며, 서버 검색 및 종속성 분석 도구가 아닙니다.

**핵심 개념:** Application Discovery Service — Agentless(기본 정보) vs Agent-based(상세 프로세스/네트워크 정보)
