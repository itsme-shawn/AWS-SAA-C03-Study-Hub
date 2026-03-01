# Amazon EC2 - Associate Level

## 개요
EC2 Associate 레벨에서는 네트워킹(IP 주소), Placement Groups, ENI(Elastic Network Interface), Hibernate 등 중급 수준의 EC2 개념을 다룬다. SAA-C03 시험에서 아키텍처 설계 문제와 함께 자주 출제되는 내용이다.

## 핵심 개념

### IP 주소 (IPv4)

#### Public IP vs Private IP
| 구분 | Public IP | Private IP |
|------|-----------|------------|
| 식별 범위 | 인터넷 전체 | 사설 네트워크 내부만 |
| 고유성 | 전 세계 유일 | 사설 네트워크 내에서 유일 |
| 특징 | 지리적 위치 추적 가능 | NAT + Internet Gateway로 인터넷 연결 |
| 범위 | 공인 IP 대역 | 특정 사설 IP 대역만 가능 |

#### EC2 IP 기본 동작
- EC2 인스턴스는 기본적으로 **Private IP + Public IP** 할당
- **인스턴스 중지 후 재시작 시 Public IP 변경 가능**
- SSH 접속 시 Public IP 사용 (같은 네트워크가 아니므로 Private IP 사용 불가)

### Elastic IP
- 고정 Public IPv4 주소 (삭제 전까지 소유)
- 한 번에 하나의 인스턴스에만 연결 가능
- 계정당 **최대 5개** (증가 요청 가능)
- **사용을 지양해야 함** (나쁜 아키텍처 패턴)
  - 대안: 랜덤 Public IP + DNS 등록
  - 대안: Load Balancer 사용 (Public IP 불필요)
- 장애 시 다른 인스턴스로 빠르게 재매핑 가능

### Placement Groups (배치 그룹)

| 전략 | 설명 | 장점 | 단점 | 사용 사례 |
|------|------|------|------|---------|
| **Cluster** | 단일 AZ 내 저지연 그룹 | 10Gbps 네트워크, 극도의 저지연 | AZ 장애 시 전체 실패 | 빅데이터 작업, HPC, 고성능 네트워크 |
| **Spread** | 서로 다른 하드웨어에 분산 | Multi-AZ 가능, 동시 장애 위험 감소 | **AZ당 최대 7개 인스턴스** | 고가용성, 크리티컬 앱 |
| **Partition** | 파티션(랙 단위)별 분산 | Multi-AZ 가능, 100s of 인스턴스 | 파티션 내 다수 인스턴스 영향 가능 | HDFS, HBase, Cassandra, Kafka |

```text
Placement Group 3종 배치 구조 비교
===================================

1) Cluster - 단일 AZ, 초저지연
┌─── AZ-1 (같은 랙/근접 하드웨어) ────┐
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐       │
│  │ i1 │ │ i2 │ │ i3 │ │ i4 │       │
│  └──┬─┘ └──┬─┘ └──┬─┘ └──┬─┘       │
│     └───┬──┴──┬───┴──┬───┘          │
│         │ 10Gbps 초저지연 │           │
│         └────────────────┘           │
└──────────────────────────────────────┘
  장점: 극도의 저지연    단점: AZ 장애=전체 실패

2) Spread - 각 인스턴스가 별도 하드웨어
┌─── AZ-1 ─────┐ ┌─── AZ-2 ─────┐ ┌─── AZ-3 ─────┐
│ Rack1  Rack2  │ │ Rack3  Rack4  │ │ Rack5  Rack6  │
│ ┌────┐┌────┐ │ │ ┌────┐┌────┐ │ │ ┌────┐┌────┐ │
│ │ i1 ││ i2 │ │ │ │ i3 ││ i4 │ │ │ │ i5 ││ i6 │ │
│ └────┘└────┘ │ │ └────┘└────┘ │ │ └────┘└────┘ │
└──────────────┘ └──────────────┘ └──────────────┘
  AZ당 최대 7개!     각 인스턴스 = 별도 랙 = 장애 격리

3) Partition - 파티션(랙 그룹) 단위 분산
┌─── AZ-1 ──────────────────────────────────┐
│ Partition 1    Partition 2    Partition 3   │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│ │┌──┐ ┌──┐│  │┌──┐ ┌──┐│  │┌──┐ ┌──┐│  │
│ ││i1│ │i2││  ││i3│ │i4││  ││i5│ │i6││  │
│ │└──┘ └──┘│  │└──┘ └──┘│  │└──┘ └──┘│  │
│ │┌──┐     │  │┌──┐     │  │┌──┐     │  │
│ ││i3│     │  ││i5│     │  ││i7│     │  │
│ │└──┘     │  │└──┘     │  │└──┘     │  │
│ └──────────┘  └──────────┘  └──────────┘  │
└───────────────────────────────────────────┘
  AZ당 최대 7개 파티션, 파티션 간 랙 비공유
  HDFS, Cassandra, Kafka에 적합
```

#### Partition 상세
- AZ당 최대 7개 파티션
- 같은 리전 내 여러 AZ에 걸쳐 배포 가능
- 파티션 간 랙을 공유하지 않음
- EC2 인스턴스가 메타데이터를 통해 파티션 정보 접근 가능

### Elastic Network Interface (ENI)
- VPC(Virtual Private Cloud - AWS의 가상 사설 네트워크)의 논리적 네트워크 카드 구성 요소
- 비유: 컴퓨터에 꽂는 **LAN 카드(네트워크 어댑터)**와 같은 개념. 물리적 컴퓨터에서 LAN 카드를 교체하면 IP 주소·MAC 주소 등 네트워크 설정이 바뀌듯이, EC2에서 ENI를 다른 인스턴스에 꽂으면 IP 주소·보안 그룹 등 네트워크 설정이 그대로 따라감
- **속성**:
  - 기본 Private IPv4 + 보조 IPv4
  - Private IPv4당 하나의 Elastic IP
  - 하나의 Public IPv4
  - 하나 이상의 Security Group
  - MAC 주소
- **독립적으로 생성하여 EC2 인스턴스에 동적 연결/이동 가능** (장애 조치용)
- **특정 AZ에 종속**

```text
ENI 이동을 통한 장애 조치 (Failover) 개념
==========================================

  정상 상태:
  ┌─── AZ-1a ──────────────────────────────┐
  │                                         │
  │  ┌──────────┐    ┌─────────────────┐   │
  │  │  ENI     │───▶│  EC2 Instance A │   │
  │  │          │    │  (Primary)      │   │
  │  │ Private: │    │  [Running]      │   │
  │  │ 10.0.1.5 │    └─────────────────┘   │
  │  │ EIP:     │                           │
  │  │ 3.1.2.3  │    ┌─────────────────┐   │
  │  │ SG: web  │    │  EC2 Instance B │   │
  │  └──────────┘    │  (Standby)      │   │
  │                   │  [Running]      │   │
  │                   └─────────────────┘   │
  └─────────────────────────────────────────┘

  장애 발생 → ENI 이동:
  ┌─── AZ-1a ──────────────────────────────┐
  │                                         │
  │  ┌──────────┐    ┌─────────────────┐   │
  │  │  ENI     │ ╳  │  EC2 Instance A │   │
  │  │          │    │  (Primary)      │   │
  │  │ Private: │    │  [FAILED]       │   │
  │  │ 10.0.1.5 │    └─────────────────┘   │
  │  │ EIP:     │                           │
  │  │ 3.1.2.3  │───▶┌─────────────────┐   │
  │  │ SG: web  │    │  EC2 Instance B │   │
  │  └──────────┘    │  (New Primary)  │   │
  │                   │  [Running]      │   │
  │                   └─────────────────┘   │
  └─────────────────────────────────────────┘

  * ENI는 같은 AZ 내에서만 이동 가능
  * IP, SG, MAC 주소 모두 유지됨
```

### EC2 Hibernate (최대 절전 모드)
> **초보자 포인트**: 노트북의 "절전 모드(Hibernate)"와 동일한 개념이다. 노트북을 닫으면(Hibernate) 현재 열려 있는 프로그램·작업 내용이 모두 하드디스크에 저장되고, 다시 열면 끊김 없이 이전 상태 그대로 돌아온다. EC2 Hibernate도 RAM에 올라 있는 실행 중인 데이터를 EBS(디스크)에 저장해 두었다가, 다음 시작 시 OS를 처음부터 부팅하지 않고 저장된 RAM을 그대로 복원하여 매우 빠르게 이전 작업 상태로 되돌아간다.

```text
EC2 Hibernate vs Stop 동작 비교
================================

  ── 일반 Stop ──────────────────────────
  ┌──────────────┐         ┌──────────────┐
  │  EC2 Running │  Stop   │  EC2 Stopped │
  │              │ ──────▶ │              │
  │  RAM: [데이터]│         │  RAM: [소멸] │
  │  EBS: [데이터]│         │  EBS: [유지] │
  └──────────────┘         └──────┬───────┘
                                  │ Start (OS 재부팅)
                                  ▼
                           ┌──────────────┐
                           │  EC2 Running │  느린 부팅
                           │  RAM: [비어있음]│
                           └──────────────┘

  ── Hibernate ──────────────────────────
  ┌──────────────┐ Hibernate ┌──────────────┐
  │  EC2 Running │ ────────▶ │  EC2 Stopped │
  │              │           │              │
  │  RAM: [데이터]│──dump──▶ │  EBS: [유지] │
  │  EBS: [데이터]│          │  + RAM 덤프  │
  └──────────────┘          └──────┬───────┘
                                   │ Start (RAM 복원)
                                   ▼
                            ┌──────────────┐
                            │  EC2 Running │  빠른 부팅!
                            │  RAM: [복원됨]│  OS 재시작 없음
                            └──────────────┘

  * Root EBS 암호화 필수
  * RAM < 150GB
  * 최대 60일 유지
```

#### 일반 중지 vs Hibernate
| 동작 | 일반 Stop | Hibernate |
|------|----------|-----------|
| RAM 상태 | 소멸 | **보존** (Root EBS에 저장) |
| 부팅 속도 | OS 재부팅 필요 | **매우 빠름** (OS 재시작 없음) |
| EBS 데이터 | 유지 | 유지 |
| User Data | 최초 시작 시만 실행 | 실행 안 됨 |

#### Hibernate 제약 조건
- 지원 인스턴스 패밀리: C3, C4, C5, I3, M3, M4, R3, R4, T2, T3 등
- **RAM 크기: 150GB 미만**
- Bare Metal 인스턴스 미지원
- **Root 볼륨: EBS, 암호화 필수, Instance Store 불가, 충분한 크기**
- On-Demand, Reserved, Spot 인스턴스에서 사용 가능
- **최대 60일까지만** Hibernate 유지 가능

#### 사용 사례
- 장기 실행 프로세스
- RAM 상태 보존
- 초기화에 시간이 오래 걸리는 서비스

## 시험 포인트
- **Elastic IP는 5개 제한**이며 사용을 권장하지 않음 → Load Balancer 사용 권장
- Placement Group 3가지 전략 비교는 반드시 외워야 함
  - Cluster: 성능, Spread: 가용성(7개 제한), Partition: 대규모 분산 시스템
- ENI는 **AZ에 종속**되며, 장애 조치를 위해 인스턴스 간 이동 가능
- Hibernate의 **Root EBS 암호화 필수** 조건을 기억
- Hibernate **최대 60일** 제한
- EC2 인스턴스 중지 후 재시작 시 Public IP 변경됨 → 고정 필요 시 Elastic IP 또는 LB
- Spread Placement Group의 **AZ당 7개 인스턴스 제한** 자주 출제

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Elastic IP | 고정 Public IPv4, 계정당 5개, 사용 지양 |
| Cluster Placement | 단일 AZ, 10Gbps, 최저 지연, HPC |
| Spread Placement | Multi-AZ, AZ당 7개 제한, 고가용성 |
| Partition Placement | Multi-AZ, AZ당 7파티션, HDFS/Kafka |
| ENI | 가상 네트워크 카드, AZ 종속, 이동 가능 |
| Hibernate | RAM→EBS 저장, 빠른 부팅, 60일 제한 |
| Hibernate Root EBS | 암호화 필수, 충분한 크기 |

---

## Practice Questions

### Q1. A company is deploying a high-performance computing (HPC) application that requires extremely low latency and high network throughput between EC2 instances. Which placement group strategy should they use?
**Options:**
- A) Spread
- B) Partition
- C) Cluster
- D) Default (no placement group)

**Answer:** C

**해설:**

> **문제:** 한 회사가 EC2 인스턴스 간 극도의 저지연과 높은 네트워크 처리량이 필요한 고성능 컴퓨팅(HPC) 애플리케이션을 배포하고 있다. 어떤 배치 그룹 전략을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Spread |
| B | Partition |
| C | Cluster |
| D | Default (배치 그룹 없음) |

**상세 풀이:** Cluster Placement Group은 단일 AZ 내에서 인스턴스를 근접한 하드웨어에 그룹화하여 10Gbps 대역폭과 최저 지연을 제공하며, HPC와 같이 극도의 네트워크 성능이 필요한 워크로드에 적합하다. A의 Spread는 각 인스턴스를 별도 하드웨어에 분산하여 가용성을 높이는 전략으로 성능보다 장애 격리에 초점이 맞춰져 있고, B의 Partition은 HDFS, Cassandra 등 대규모 분산 시스템을 위한 전략으로 파티션(랙) 단위 분산에 초점이 있으며, D의 배치 그룹 없음은 AWS가 인스턴스를 임의로 배치하므로 저지연을 보장하지 않는다.

**핵심 개념:** Placement Groups - Cluster

### Q2. An application requires high availability where each EC2 instance must be isolated from hardware failure of other instances. The application runs on 6 instances across 3 Availability Zones. Which placement group strategy is MOST appropriate?
**Options:**
- A) Cluster
- B) Spread
- C) Partition
- D) No placement group is needed

**Answer:** B

**해설:**

> **문제:** 각 EC2 인스턴스가 다른 인스턴스의 하드웨어 장애로부터 격리되어야 하는 고가용성 애플리케이션이 있다. 3개 Availability Zone에 걸쳐 6개 인스턴스에서 실행된다. 가장 적합한 배치 그룹 전략은?

| 선지 | 번역 |
|------|------|
| A | Cluster |
| B | Spread |
| C | Partition |
| D | 배치 그룹 필요 없음 |

**상세 풀이:** Spread Placement Group은 각 인스턴스를 서로 다른 하드웨어에 배치하여 개별 인스턴스의 하드웨어 장애 격리를 보장한다. AZ당 최대 7개 인스턴스 제한이 있으므로, 3개 AZ에 6개 인스턴스는 AZ당 2개로 제한 내에서 충분하다. A의 Cluster는 단일 AZ에 근접 배치하여 AZ 장애 시 전체 실패 위험이 있어 고가용성에 부적합하고, C의 Partition은 파티션(랙 그룹) 단위 분산으로 개별 인스턴스 수준의 격리가 아닌 파티션 수준의 격리를 제공하며, D의 배치 그룹 없음은 하드웨어 장애 격리를 보장하지 않는다.

**핵심 개념:** Placement Groups - Spread

### Q3. A Solutions Architect needs to preserve the in-memory state of an EC2 instance to speed up subsequent boots. Which feature should they use?
**Options:**
- A) EC2 User Data script
- B) EC2 Hibernate
- C) EBS Snapshots
- D) AMI creation

**Answer:** B

**해설:**

> **문제:** Solutions Architect가 후속 부팅 속도를 높이기 위해 EC2 인스턴스의 인메모리 상태를 보존해야 한다. 어떤 기능을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | EC2 User Data 스크립트 |
| B | EC2 Hibernate |
| C | EBS 스냅샷 |
| D | AMI 생성 |

**상세 풀이:** EC2 Hibernate는 RAM 상태를 암호화된 Root EBS 볼륨에 저장하고, 재시작 시 OS를 재부팅하지 않고 RAM을 복원하여 빠르게 이전 상태로 돌아간다. A의 User Data 스크립트는 인스턴스 최초 시작 시에만 한 번 실행되며 RAM 상태를 보존하지 않고, C의 EBS Snapshot은 디스크 데이터만 백업하며 RAM 내용은 포함하지 않으며, D의 AMI 생성도 디스크 상태(OS, 소프트웨어, 설정)만 캡처하고 실행 중인 메모리 상태는 저장하지 않는다.

**핵심 개념:** EC2 Hibernate

### Q4. What is a prerequisite for using EC2 Hibernate?
**Options:**
- A) The instance must use an Instance Store root volume
- B) The root EBS volume must be encrypted
- C) The instance RAM must be at least 150 GB
- D) The instance must be a bare metal instance

**Answer:** B

**해설:**

> **문제:** EC2 Hibernate를 사용하기 위한 전제 조건은?

| 선지 | 번역 |
|------|------|
| A | 인스턴스가 Instance Store 루트 볼륨을 사용해야 한다 |
| B | 루트 EBS 볼륨이 암호화되어야 한다 |
| C | 인스턴스 RAM이 최소 150GB여야 한다 |
| D | 인스턴스가 bare metal 인스턴스여야 한다 |

**상세 풀이:** EC2 Hibernate를 사용하려면 Root EBS 볼륨이 암호화되어야 하며, RAM 내용이 EBS에 저장되므로 충분한 크기도 필요하다. A의 Instance Store는 루트 볼륨으로 사용할 수 없고 Hibernate에서는 반드시 EBS를 사용해야 하며, C의 RAM 150GB는 반대로 틀린 설명으로 RAM이 150GB 미만이어야 Hibernate를 사용할 수 있고(최소가 아닌 최대 제한), D의 Bare Metal 인스턴스는 Hibernate를 지원하지 않는다.

**핵심 개념:** EC2 Hibernate 요구사항

### Q5. An application requires a fixed public IP address that can be quickly remapped to another EC2 instance in case of failure. What should the Solutions Architect use?
**Options:**
- A) A public IP address assigned by AWS
- B) An Elastic IP address
- C) A private IP address with NAT Gateway
- D) An Application Load Balancer

**Answer:** B

**해설:**

> **문제:** 애플리케이션에 고정 Public IP 주소가 필요하며, 장애 시 다른 EC2 인스턴스로 빠르게 재매핑할 수 있어야 한다. Solutions Architect는 무엇을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS가 할당한 Public IP 주소 |
| B | Elastic IP 주소 |
| C | NAT Gateway를 사용한 Private IP 주소 |
| D | Application Load Balancer |

**상세 풀이:** Elastic IP는 고정 Public IPv4 주소로, 장애 시 다른 인스턴스로 빠르게 재매핑할 수 있어 문제의 요구사항에 정확히 부합한다. A의 AWS가 할당한 Public IP는 인스턴스 중지 후 재시작 시 변경될 수 있어 고정 IP가 아니고, C의 NAT Gateway를 사용한 Private IP는 인바운드 연결을 직접 받을 수 없으며, D의 ALB는 일반적으로 더 나은 아키텍처이지만 고정 Public IP를 제공하지 않는다(고정 IP가 필요하면 NLB + Elastic IP 조합을 사용). 문제에서 "고정 Public IP + 빠른 재매핑"을 명시했으므로 Elastic IP가 정답이다.

**핵심 개념:** Elastic IP

### Q6. A company is running a Cassandra database cluster on EC2 and needs to distribute instances across multiple isolated partitions to prevent correlated hardware failures. Which placement group strategy should they use?
**Options:**
- A) Cluster
- B) Spread
- C) Partition
- D) Default placement

**Answer:** C

**해설:**

> **문제:** 한 회사가 EC2에서 Cassandra 데이터베이스 클러스터를 실행하고 있으며, 상관된 하드웨어 장애를 방지하기 위해 인스턴스를 여러 격리된 파티션에 분산해야 한다. 어떤 배치 그룹 전략을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Cluster |
| B | Spread |
| C | Partition |
| D | Default placement |

**상세 풀이:** Partition Placement Group은 인스턴스를 서로 다른 파티션(랙)에 분산하여 상관된 하드웨어 장애를 방지하며, Cassandra, Kafka, HDFS, HBase와 같은 대규모 분산 시스템에 적합하다. A의 Cluster는 단일 AZ에 근접 배치하여 성능에 초점이 맞춰져 있으며 장애 격리에는 부적합하고, B의 Spread는 AZ당 최대 7개 인스턴스 제한이 있어 수십~수백 개 노드로 구성되는 Cassandra 클러스터에는 부적합하며, D의 Default placement는 하드웨어 장애 격리를 보장하지 않는다.

**핵심 개념:** Placement Groups - Partition

### Q7. What happens to the public IP address of an EC2 instance when it is stopped and then started again?
**Options:**
- A) The public IP address remains the same
- B) The public IP address may change
- C) The instance loses both public and private IP addresses
- D) The private IP address changes but public stays the same

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스를 중지한 후 다시 시작하면 Public IP 주소는 어떻게 되는가?

| 선지 | 번역 |
|------|------|
| A | Public IP 주소가 동일하게 유지된다 |
| B | Public IP 주소가 변경될 수 있다 |
| C | 인스턴스가 Public과 Private IP 주소 모두 잃는다 |
| D | Private IP 주소는 변경되지만 Public은 동일하게 유지된다 |

**상세 풀이:** EC2 인스턴스를 중지 후 재시작하면 Public IP가 변경될 수 있다. Private IP는 유지된다. A는 틀린 설명으로 일반 Public IP는 인스턴스 재시작 시 변경되며(Elastic IP를 사용하지 않는 한), C는 Private IP도 잃는다고 했지만 실제로 Private IP는 유지되므로 틀렸고, D는 Private IP가 변경된다고 했지만 실제로는 Private IP가 유지되고 Public IP가 변경되므로 정반대이다. 고정 Public IP가 필요하면 Elastic IP를 사용하거나, Load Balancer를 사용하여 Public IP 의존성을 제거해야 한다.

**핵심 개념:** EC2 Public/Private IP

### Q8. An ENI (Elastic Network Interface) created in us-east-1a can be attached to an EC2 instance in which Availability Zone?
**Options:**
- A) Any Availability Zone in us-east-1
- B) Only us-east-1a
- C) Any Availability Zone in any Region
- D) Any Availability Zone in the same VPC

**Answer:** B

**해설:**

> **문제:** us-east-1a에서 생성된 ENI(Elastic Network Interface)는 어느 Availability Zone의 EC2 인스턴스에 연결할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | us-east-1의 모든 Availability Zone |
| B | us-east-1a만 |
| C | 모든 Region의 모든 Availability Zone |
| D | 같은 VPC의 모든 Availability Zone |

**상세 풀이:** ENI는 특정 AZ에 종속되므로, us-east-1a에서 생성된 ENI는 us-east-1a의 인스턴스에만 연결할 수 있다. A의 us-east-1의 모든 AZ는 틀린 설명으로 ENI는 생성된 AZ에서만 사용 가능하고, C의 모든 Region의 모든 AZ는 ENI가 리전은 물론 AZ에도 종속되므로 틀렸으며, D의 같은 VPC의 모든 AZ도 VPC가 여러 AZ에 걸칠 수 있지만 ENI는 여전히 생성된 특정 AZ에 종속된다.

**핵심 개념:** Elastic Network Interface (ENI) - AZ 종속