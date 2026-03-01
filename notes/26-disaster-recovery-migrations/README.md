# Disaster Recovery & Migrations

## 개요
재해 복구(DR)와 마이그레이션은 SAA-C03 시험에서 자주 출제되는 영역이다. RPO/RTO 개념, 4가지 DR 전략, DMS, AWS Backup, Application Migration Service 등 다양한 서비스를 이해해야 한다.

## 핵심 개념

### 재해 복구 기본 개념
- **재해(Disaster)**: 회사의 비즈니스 연속성이나 재무에 부정적 영향을 미치는 이벤트
- DR 유형:
  - 온프레미스 → 온프레미스: 전통적 DR (비용 높음)
  - 온프레미스 → AWS Cloud: 하이브리드 복구
  - AWS Region A → AWS Region B

### RPO와 RTO
- **RPO (Recovery Point Objective, 복구 목표 시점)**: 재해 발생 시 허용 가능한 **데이터 손실량** (시간 단위)
  - "마지막 백업으로부터 현재까지 허용할 데이터 손실 기간"
  - 예: RPO = 1시간 → 최대 1시간 전 백업으로 복구해도 괜찮음 (그 1시간 치 데이터는 잃어도 됨)
  - RPO가 짧을수록 = 최신 데이터를 보존, 더 잦은 백업 필요 = 비용 증가
- **RTO (Recovery Time Objective, 복구 목표 시간)**: 재해 발생 후 서비스 복구까지의 **다운타임**
  - "장애 발생 후 서비스를 다시 정상화하기까지 허용되는 최대 시간"
  - 예: RTO = 4시간 → 장애 발생 후 4시간 안에 서비스를 복구해야 함
  - RTO가 짧을수록 = 빠른 복구, 대기 인프라가 필요 = 비용 증가
- RPO ← [데이터 손실] ← 재해 → [다운타임] → RTO

```text
  RPO / RTO 스펙트럼

  시간 ◄──────────────────────────────────────────────────────► 시간
       │                        │                        │
       │     데이터 손실 구간     │      다운타임 구간      │
       │   (이 기간의 데이터 유실)  │  (서비스 중단 시간)      │
       │                        │                        │
  ◄────┼────────────────────────┼────────────────────────┼────►
  마지막 백업                  재해 발생                서비스 복구
       │                        │                        │
       ◄──── RPO (작을수록 좋다) ──►◄──── RTO (작을수록 좋다) ──►

  전략별 RPO/RTO 비교:
  ┌──────────────────┬──────────────┬──────────────┬─────────┐
  │ 전략              │ RPO          │ RTO          │ 비용     │
  ├──────────────────┼──────────────┼──────────────┼─────────┤
  │ Backup & Restore │ 시간~일       │ 시간~일       │ $       │
  │ Pilot Light      │ 분~시간       │ 분~시간       │ $$      │
  │ Warm Standby     │ 초~분         │ 분            │ $$$     │
  │ Multi Site       │ 거의 0        │ 거의 0        │ $$$$    │
  └──────────────────┴──────────────┴──────────────┴─────────┘
```

### 4가지 DR 전략 (빠른 RTO 순)

> **직관적 비유 — 집이 불탔을 때 복구 방법으로 이해하기**:
> 1. **Backup & Restore**: 보험 사진만 찍어둔 후 불나면 새로 구매 (제일 싸지만 제일 오래 걸림)
> 2. **Pilot Light**: 집 뼈대(핵심 구조)만 다른 곳에 세워두고, 불나면 나머지를 빠르게 채움
> 3. **Warm Standby**: 작은 예비 집을 항상 준비해두고, 불나면 더 크게 확장해서 이사
> 4. **Multi Site/Hot Site**: 동일한 집 두 채를 동시에 유지 (제일 비싸지만 즉시 이사 가능)

#### 1. Backup and Restore (높은 RPO)
- S3에 데이터 백업, Snowball로 대량 전송
- Storage Gateway 활용
- AMI, EBS 스냅샷, RDS 스냅샷 정기 생성
- **가장 저렴하지만 RPO/RTO가 가장 높음** (복구에 시간~일 단위 소요)

#### 2. Pilot Light (파일럿 라이트 — "불씨만 살려둔다")
- 핵심 시스템의 소규모 버전이 클라우드에 항상 실행
- 예: RDS는 실행 중, EC2는 중지 상태 (불씨 = DB, 나머지는 꺼져 있음)
- Backup and Restore보다 빠름 (핵심 시스템이 이미 가동)
- Route 53으로 장애 조치

#### 3. Warm Standby (웜 스탠바이 — "소규모로 항상 켜둔다")
- 전체 시스템이 최소 크기로 실행 (저사양으로 항상 대기 중)
- 재해 시 프로덕션 부하로 스케일 업 (규모를 키워서 실제 서비스로 전환)
- ELB + EC2 Auto Scaling (최소) + RDS Secondary (실행 중)
- Route 53 failover

#### 4. Multi Site / Hot Site (가장 낮은 RTO)
- **매우 낮은 RTO** (분 또는 초) - **매우 비쌈**
- 전체 프로덕션 규모가 AWS와 온프레미스 양쪽에서 **active-active** 실행 (두 곳 모두 동시에 실제 트래픽 처리)
- Route 53 + ELB + EC2 Auto Scaling (프로덕션) + Aurora Global

```text
  4가지 DR 전략 비교

  비용 낮음 ◄─────────────────────────────────────────────► 비용 높음
  RTO 높음  ◄─────────────────────────────────────────────► RTO 낮음

  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
  │ 1. Backup   │  │ 2. Pilot    │  │ 3. Warm     │  │ 4. Multi    │
  │  & Restore  │  │    Light    │  │   Standby   │  │    Site     │
  │             │  │             │  │             │  │             │
  │  ┌───┐      │  │  ┌───┐      │  │  ┌───┐      │  │  ┌───┐      │
  │  │AMI│      │  │  │RDS│ Run  │  │  │ELB│      │  │  │ELB│      │
  │  │EBS│      │  │  │   │      │  │  │EC2│ Min  │  │  │EC2│ Full │
  │  │S3 │ 저장  │  │  │EC2│ Stop │  │  │RDS│      │  │  │RDS│      │
  │  └───┘      │  │  └───┘      │  │  └───┘      │  │  └───┘      │
  │             │  │             │  │             │  │             │
  │ 재해 시:     │  │ 재해 시:     │  │ 재해 시:     │  │ Active-     │
  │ 전체 복원    │  │ EC2 시작    │  │ Scale Up    │  │  Active     │
  │ (시간~일)    │  │ (분~시간)    │  │ (분)         │  │ (초~분)     │
  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
        $                $$               $$$              $$$$
```

### DR 팁
- **백업**: EBS 스냅샷, RDS 백업, S3/Glacier + Lifecycle Policy, Cross Region Replication, Snowball/Storage Gateway
- **고가용성**: Route53 DNS failover, RDS Multi-AZ, ElastiCache Multi-AZ, EFS, S3, S2S VPN as DX backup
- **복제**: RDS Cross Region Replication, Aurora Global Databases, Storage Gateway
- **자동화**: CloudFormation/Elastic Beanstalk, CloudWatch 알람으로 EC2 복구, Lambda 자동화
- **카오스 엔지니어링**: Netflix "simian-army" (EC2 랜덤 종료)

### AWS Elastic Disaster Recovery (DRS)
- 이전 이름: CloudEndure Disaster Recovery
- 물리/가상/클라우드 서버를 AWS로 빠르게 복구
- **연속 블록 레벨 복제** (초 단위)
- 스테이징: 저비용 EC2 + EBS → 장애 시: 프로덕션 EC2 + EBS로 failover (분 단위)
- 사용 사례: 중요 DB(Oracle, MySQL, SQL Server), 엔터프라이즈 앱(SAP), 랜섬웨어 방어

### DMS (Database Migration Service, 데이터베이스 마이그레이션 서비스)

```text
  DMS 마이그레이션 흐름

  ── 동종 (Homogeneous) 마이그레이션: SCT 불필요 ──

  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │ Source DB     │         │  EC2 Instance │         │ Target DB     │
  │ (Oracle)      │────────►│  DMS 복제     │────────►│ (Oracle RDS)  │
  └──────────────┘  읽기    │  태스크       │  쓰기    └──────────────┘
                           └──────────────┘

  ── 이종 (Heterogeneous) 마이그레이션: SCT 필요 ──

  ┌──────────────┐   ┌─────────┐   ┌──────────────┐   ┌──────────────┐
  │ Source DB     │   │  AWS    │   │  EC2 Instance │   │ Target DB     │
  │ (SQL Server)  │──►│  SCT    │──►│  DMS 복제     │──►│ (Aurora PG)   │
  └──────────────┘   │ 스키마  │   │  태스크       │   └──────────────┘
                     │ 변환    │   │  + CDC        │
                     └─────────┘   └──────────────┘
                                     (연속 복제)
```

- 데이터베이스를 AWS로 안전하고 빠르게 마이그레이션
- 소스 DB가 마이그레이션 중에도 사용 가능 (서비스 중단 없음)
- **동종(Homogeneous) 마이그레이션**: 같은 DB 엔진 간 이동 (Oracle → Oracle, MySQL → MySQL) — SCT 불필요
- **이종(Heterogeneous) 마이그레이션**: 다른 DB 엔진 간 이동 (SQL Server → Aurora) — SCT로 스키마 변환 먼저 필요
- **CDC (Change Data Capture, 변경 데이터 캡처)**: 마이그레이션 중 소스 DB에서 발생하는 변경사항을 실시간으로 캡처해 타겟 DB에 반영 → 최소 다운타임 마이그레이션 가능
- EC2 인스턴스에서 복제 작업 수행

#### DMS 소스
- 온프레미스/EC2: Oracle, SQL Server, MySQL, MariaDB, PostgreSQL, MongoDB, SAP, DB2
- Azure SQL Database
- Amazon RDS (Aurora 포함), S3, DocumentDB

#### DMS 타겟
- 온프레미스/EC2 DB, Amazon RDS, Redshift, DynamoDB, S3
- OpenSearch, Kinesis Data Streams, Apache Kafka
- DocumentDB, Neptune, Redis, Babelfish

#### DMS Multi-AZ
- 동기식 대기 복제본을 다른 AZ에 프로비저닝
- 데이터 이중화, I/O 프리즈 제거, 레이턴시 스파이크 최소화

### AWS Schema Conversion Tool (SCT)
- DB 스키마를 한 엔진에서 다른 엔진으로 변환
- OLTP: SQL Server/Oracle → MySQL/PostgreSQL/Aurora
- OLAP: Teradata/Oracle → Redshift
- **같은 DB 엔진 간 마이그레이션에는 SCT 불필요** (예: PostgreSQL → RDS PostgreSQL)

### RDS & Aurora MySQL 마이그레이션
- RDS MySQL → Aurora MySQL:
  - Option 1: RDS MySQL 스냅샷을 Aurora MySQL로 복원
  - Option 2: Aurora Read Replica 생성 후 replication lag 0에서 승격
- 외부 MySQL → Aurora MySQL:
  - Option 1: Percona XtraBackup → S3 → Aurora MySQL
  - Option 2: mysqldump 유틸리티 (느림)
  - 양쪽 DB 실행 중이면 DMS 사용

### RDS & Aurora PostgreSQL 마이그레이션
- RDS PostgreSQL → Aurora PostgreSQL:
  - Option 1: 스냅샷 복원
  - Option 2: Aurora Read Replica → 승격
- 외부 PostgreSQL → Aurora PostgreSQL:
  - 백업을 S3에 저장 → `aws_s3` Aurora 확장으로 임포트

### 온프레미스 전략
- **VM Import/Export**: 기존 애플리케이션을 EC2로 마이그레이션, EC2에서 온프레미스로 내보내기 가능
- **AWS Application Discovery Service**: 온프레미스 서버 정보 수집, 마이그레이션 계획
  - Agentless Discovery (Connector): VM 인벤토리, 설정, 성능 이력 (에이전트 설치 불필요)
  - Agent-based Discovery: 시스템 설정/성능, 프로세스, 네트워크 연결 상세 (에이전트 설치 필요, 더 상세)
  - AWS Migration Hub에서 결과 확인
- **AWS Application Migration Service (MGN, 구 CloudEndure Migration)**: 리프트-앤-시프트(rehost) 방식으로 온프레미스 서버를 통째로 AWS로 이전. 연속 복제로 최소 다운타임 마이그레이션.
  - **리프트-앤-시프트(Lift-and-Shift)**: 앱을 재개발하지 않고 그대로 들어올려 AWS로 옮기는 방식

### VMware Cloud on AWS
- VMware vSphere 기반 워크로드를 AWS로 마이그레이션
- 프로덕션 워크로드를 하이브리드 환경에서 실행
- DR 전략으로 활용

### AWS Backup
- **완전 관리형** 중앙 백업 서비스
- 지원 서비스: EC2, EBS, S3, RDS, Aurora, DynamoDB, DocumentDB, Neptune, EFS, FSx, Storage Gateway
- 크로스 리전/크로스 계정 백업 지원
- PITR(Point-in-Time Recovery) 지원
- 온디맨드 + 스케줄 백업
- 태그 기반 백업 정책
- Backup Plan: 빈도, 백업 윈도우, Cold Storage 전환, 보존 기간

#### AWS Backup Vault Lock
- **WORM** (Write Once Read Many) 상태 적용
- 백업 보호: 실수/악의적 삭제, 보존 기간 변경 방지
- **root 사용자도 삭제 불가**

### 대량 데이터 전송 비교
- 200TB 데이터, 100 Mbps 인터넷:
  - 인터넷/S2S VPN: **~185일**
  - Direct Connect 1Gbps: **~18.5일** (설정에 1개월+)
  - Snowball: **~1주일**
- 지속적 복제: S2S VPN 또는 DX + DMS/DataSync

## 시험 포인트
- **RPO vs RTO** 차이를 명확히 이해
- **4가지 DR 전략**의 비용/속도 순서: Backup & Restore < Pilot Light < Warm Standby < Multi Site
- **DMS**: 동종 마이그레이션에는 SCT 불필요
- **AWS Backup Vault Lock**: root도 삭제 불가
- **MGN**: 리프트-앤-시프트 마이그레이션
- **DRS**: 재해 복구용 연속 복제
- 대량 데이터 전송 시 Snowball vs DX vs 인터넷 비교

## 치트시트

| 기능/서비스 | 설명 |
|------------|------|
| RPO | 허용 가능한 데이터 손실량 |
| RTO | 서비스 복구까지의 다운타임 |
| Backup & Restore | 가장 저렴, 높은 RPO/RTO |
| Pilot Light | 핵심만 실행, 빠른 복구 |
| Warm Standby | 최소 크기 전체 시스템 실행 |
| Multi Site/Hot Site | Active-Active, 가장 빠른 RTO, 가장 비쌈 |
| DMS | DB 마이그레이션, CDC, EC2 복제 인스턴스 |
| SCT | 이종 DB 스키마 변환 |
| DRS | 연속 블록 레벨 복제, 분 단위 failover |
| MGN | 리프트-앤-시프트, 연속 복제, 최소 다운타임 |
| AWS Backup | 중앙 관리형 백업, 크로스 리전/계정 |
| Backup Vault Lock | WORM, root도 삭제 불가 |
| Application Discovery | Agentless(Connector) / Agent-based |

---

## Practice Questions

### Q1. A company requires a disaster recovery strategy with an RTO of less than 1 minute and can tolerate minimal data loss. The company is willing to pay for maintaining a full production environment. Which DR strategy should they implement?
**Options:**
- A) Backup and Restore
- B) Pilot Light
- C) Warm Standby
- D) Multi Site / Hot Site

**Answer:** D

**해설:**

> **문제:** 한 회사가 1분 미만의 RTO와 최소한의 데이터 손실을 허용하는 재해 복구 전략이 필요하다. 회사는 전체 프로덕션 환경을 유지하는 비용을 감수할 수 있다. 어떤 DR 전략을 구현해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Backup and Restore |
| B | Pilot Light |
| C | Warm Standby |
| D | Multi Site / Hot Site |

**상세 풀이:** 1분 미만의 RTO와 전체 프로덕션 환경 유지 비용을 감수할 수 있다는 조건에서 정답은 D의 Multi Site/Hot Site이다. 이 전략은 AWS와 온프레미스 양쪽에서 전체 프로덕션 규모가 active-active로 실행되어 가장 낮은 RTO(초~분)를 제공한다. C의 Warm Standby는 전체 시스템이 최소 크기로 실행되어 재해 시 스케일 업이 필요하므로 RTO가 분 단위이다. B의 Pilot Light는 핵심 시스템만 실행하고 나머지는 중지 상태이므로 EC2 시작 등의 시간이 필요하여 RTO가 분~시간이다. A의 Backup and Restore는 전체를 복원해야 하므로 RTO가 시간~일로 가장 높다.

**핵심 개념:** DR Strategy - Multi Site/Hot Site

---

### Q2. A company needs to migrate an on-premises Oracle database to Amazon Aurora PostgreSQL. Which AWS services should they use?
**Options:**
- A) AWS DMS only
- B) AWS DMS with AWS SCT
- C) AWS SCT only
- D) AWS Application Migration Service

**Answer:** B

**해설:**

> **문제:** 한 회사가 온프레미스 Oracle 데이터베이스를 Amazon Aurora PostgreSQL로 마이그레이션해야 한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS DMS만 사용 |
| B | AWS DMS와 AWS SCT 사용 |
| C | AWS SCT만 사용 |
| D | AWS Application Migration Service |

**상세 풀이:** Oracle에서 Aurora PostgreSQL로의 마이그레이션은 서로 다른 DB 엔진 간의 이종(heterogeneous) 마이그레이션이므로 스키마 변환을 위한 SCT와 실제 데이터 마이그레이션을 위한 DMS가 모두 필요하여 정답은 B이다. A의 DMS만 사용하면 데이터는 이동할 수 있지만 Oracle 스키마를 PostgreSQL 형식으로 변환하는 과정이 빠지게 된다. C의 SCT만 사용하면 스키마 변환만 가능하고 실제 데이터 이동은 수행할 수 없다. D의 Application Migration Service(MGN)는 서버 전체를 리프트-앤-시프트 방식으로 마이그레이션하는 서비스이며, 데이터베이스 마이그레이션 전용 도구가 아니다.

**핵심 개념:** DMS + SCT (Heterogeneous Migration)

---

### Q3. A company wants to ensure that their AWS backups cannot be deleted by anyone, including the root user, to protect against ransomware attacks. Which feature should they enable?
**Options:**
- A) S3 Object Lock
- B) AWS Backup Vault Lock
- C) AWS KMS key rotation
- D) IAM deny policies on backup deletion

**Answer:** B

**해설:**

> **문제:** 한 회사가 랜섬웨어 공격으로부터 보호하기 위해 root 사용자를 포함하여 누구도 AWS 백업을 삭제할 수 없도록 하려 한다. 어떤 기능을 활성화해야 하는가?

| 선지 | 번역 |
|------|------|
| A | S3 Object Lock |
| B | AWS Backup Vault Lock |
| C | AWS KMS 키 순환 |
| D | 백업 삭제에 대한 IAM deny 정책 |

**상세 풀이:** root 사용자를 포함한 누구도 백업을 삭제할 수 없도록 하려면 AWS Backup Vault Lock이 필요하므로 정답은 B이다. Backup Vault Lock은 WORM(Write Once Read Many) 정책을 적용하여 백업 삭제와 보존 기간 변경을 완전히 방지하며, root 사용자도 이를 우회할 수 없다. A의 S3 Object Lock은 S3 객체에만 적용되며 AWS Backup 전체를 보호하는 것이 아니다. C의 KMS 키 순환은 암호화 키를 주기적으로 교체하는 보안 기능이지 백업 삭제 방지와는 관련이 없다. D의 IAM deny 정책은 IAM 사용자와 역할에 적용되지만, root 사용자에게는 적용되지 않으므로 요구사항을 충족하지 못한다.

**핵심 개념:** AWS Backup Vault Lock - WORM

---

### Q4. A solutions architect needs to migrate a large MySQL database running on-premises to Amazon Aurora MySQL with minimal downtime. Both databases will be running simultaneously during migration. Which approach is MOST appropriate?
**Options:**
- A) Use Percona XtraBackup to create a backup in S3 and restore to Aurora
- B) Use mysqldump to export and import the data
- C) Use AWS DMS with continuous data replication
- D) Create an RDS MySQL Read Replica and promote it

**Answer:** C

**해설:**

> **문제:** 솔루션스 아키텍트가 온프레미스에서 실행 중인 대규모 MySQL 데이터베이스를 최소 다운타임으로 Amazon Aurora MySQL로 마이그레이션해야 한다. 마이그레이션 중 양쪽 데이터베이스가 동시에 실행된다. 가장 적합한 접근 방식은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Percona XtraBackup을 사용하여 S3에 백업을 만들고 Aurora로 복원한다 |
| B | mysqldump를 사용하여 데이터를 내보내고 가져온다 |
| C | AWS DMS를 연속 데이터 복제와 함께 사용한다 |
| D | RDS MySQL Read Replica를 생성하고 승격한다 |

**상세 풀이:** 양쪽 데이터베이스가 동시에 실행 중이며 최소 다운타임이 요구되는 시나리오에서는 DMS의 CDC(Change Data Capture)를 사용한 연속 데이터 복제가 가장 적합하므로 정답은 C이다. A의 Percona XtraBackup은 초기 데이터 로드에 사용할 수 있지만 마이그레이션 중 소스 DB에서 발생하는 변경사항을 연속으로 복제하지 못한다. B의 mysqldump는 데이터 내보내기/가져오기 방식으로 속도가 느리고 연속 복제를 지원하지 않아 다운타임이 길어진다. D의 Read Replica 생성 후 승격은 RDS MySQL에서 Aurora MySQL로 마이그레이션하는 방법이며, 온프레미스 MySQL에는 적용할 수 없다.

**핵심 개념:** DMS - Continuous Data Replication (CDC)

---

### Q5. A company needs to transfer 200 TB of data to AWS as quickly as possible. Their internet connection is 100 Mbps. What is the FASTEST method?
**Options:**
- A) Use AWS Direct Connect with 1 Gbps capacity
- B) Use AWS Site-to-Site VPN
- C) Use AWS Snowball
- D) Use S3 Transfer Acceleration

**Answer:** C

**해설:**

> **문제:** 한 회사가 200TB의 데이터를 가능한 한 빠르게 AWS로 전송해야 한다. 인터넷 연결 속도는 100 Mbps이다. 가장 빠른 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 1 Gbps 용량의 AWS Direct Connect 사용 |
| B | AWS Site-to-Site VPN 사용 |
| C | AWS Snowball 사용 |
| D | S3 Transfer Acceleration 사용 |

**상세 풀이:** 100 Mbps 인터넷으로 200TB를 전송하는 경우 인터넷 경유 시 약 185일이 소요되며, Snowball을 사용하면 약 1주일(end-to-end)로 가장 빠르므로 정답은 C이다. A의 Direct Connect 1Gbps는 전송 자체에 약 18.5일이 걸리지만, 물리적 회선 설정에 1개월 이상의 리드타임이 필요하여 총 소요 시간이 더 길어진다. B의 Site-to-Site VPN은 100 Mbps 인터넷 대역폭에 제한되므로 약 185일이 소요된다. D의 S3 Transfer Acceleration도 인터넷 대역폭의 제한을 받아 근본적인 전송 속도 향상이 어렵다.

**핵심 개념:** Large Data Transfer - Snowball

---

### Q6. A company is using AWS DMS to migrate their database. They want to ensure high availability of the replication instance. What should they enable?
**Options:**
- A) DMS Read Replicas
- B) DMS Multi-AZ deployment
- C) DMS Auto Scaling
- D) DMS Cross-Region replication

**Answer:** B

**해설:**

> **문제:** 한 회사가 AWS DMS를 사용하여 데이터베이스를 마이그레이션하고 있다. 복제 인스턴스의 고가용성을 보장하려면 무엇을 활성화해야 하는가?

| 선지 | 번역 |
|------|------|
| A | DMS Read Replicas |
| B | DMS Multi-AZ 배포 |
| C | DMS Auto Scaling |
| D | DMS Cross-Region 복제 |

**상세 풀이:** DMS 복제 인스턴스의 고가용성을 위해서는 Multi-AZ 배포를 활성화해야 하므로 정답은 B이다. DMS Multi-AZ 배포는 다른 AZ에 동기식 대기 복제본을 프로비저닝하여 데이터 이중화, I/O 프리즈 제거, 레이턴시 스파이크 최소화를 제공한다. A의 DMS Read Replicas, C의 DMS Auto Scaling, D의 DMS Cross-Region replication은 DMS에 존재하지 않는 기능들이다.

**핵심 개념:** DMS Multi-AZ Deployment

---

### Q7. A company wants to plan a large-scale migration to AWS and needs to gather detailed information about their on-premises servers, including running processes and network connections between systems. Which service and discovery method should they use?
**Options:**
- A) AWS Application Discovery Service - Agentless Discovery
- B) AWS Application Discovery Service - Agent-based Discovery
- C) AWS Migration Hub
- D) AWS Application Migration Service

**Answer:** B

**해설:**

> **문제:** 한 회사가 대규모 AWS 마이그레이션을 계획하고 있으며, 온프레미스 서버에 대해 실행 중인 프로세스와 시스템 간 네트워크 연결을 포함한 상세 정보를 수집해야 한다. 어떤 서비스와 검색 방법을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Application Discovery Service - Agentless Discovery |
| B | AWS Application Discovery Service - Agent-based Discovery |
| C | AWS Migration Hub |
| D | AWS Application Migration Service |

**상세 풀이:** 실행 중인 프로세스와 시스템 간 네트워크 연결 상세 정보가 필요하므로 Agent-based Discovery가 정답인 B이다. Agent-based Discovery는 서버에 에이전트를 설치하여 시스템 설정, 성능, 실행 중인 프로세스, 시스템 간 네트워크 연결 상세 정보를 수집할 수 있다. A의 Agentless Discovery(Connector)는 VM 인벤토리, 설정, 성능 이력만 제공하며 프로세스와 네트워크 연결 정보는 포함하지 않는다. C의 Migration Hub는 Discovery 결과를 시각화하고 마이그레이션 진행 상황을 추적하는 대시보드 도구이다. D의 Application Migration Service(MGN)는 실제 리프트-앤-시프트 마이그레이션을 수행하는 도구이며 정보 수집 도구가 아니다.

**핵심 개념:** Application Discovery Service - Agent-based vs Agentless
