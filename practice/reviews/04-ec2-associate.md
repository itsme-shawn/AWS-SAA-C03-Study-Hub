# Section 04 - EC2 Associate 연습문제 해설

---

### Q1. A company is deploying an HPC application that requires extremely low latency and high network throughput between EC2 instances. Which placement group strategy should they use?

**한글 번역:** 한 회사가 EC2 인스턴스 간 매우 낮은 지연 시간과 높은 네트워크 처리량이 필요한 HPC(고성능 컴퓨팅) 애플리케이션을 배포하고 있습니다. 어떤 배치 그룹 전략을 사용해야 합니까?

**선지:**
- A) Spread → 분산
- B) Partition → 파티션
- C) Cluster → 클러스터
- D) Default → 기본

**정답:** C

**선지별 해설:**
- **A) Spread:** 분산 배치 그룹은 각 인스턴스를 서로 다른 물리적 하드웨어에 배치하여 장애를 격리합니다. 고가용성이 목적이며, 인스턴스 간 최저 지연 시간을 제공하지 않습니다. AZ당 최대 7개 인스턴스로 제한됩니다.
- **B) Partition:** 파티션 배치 그룹은 인스턴스를 논리적 파티션으로 나누어 파티션 간 하드웨어를 공유하지 않도록 합니다. Hadoop, Cassandra 같은 분산 시스템에 적합하지만, 최저 지연 시간이 목적이 아닙니다.
- **C) Cluster:** 정답입니다. 클러스터 배치 그룹은 모든 인스턴스를 동일한 AZ의 동일한 랙(rack)에 가깝게 배치합니다. 이를 통해 인스턴스 간 10Gbps 네트워크를 활용한 매우 낮은 지연 시간과 높은 처리량을 제공합니다. HPC, 빅데이터 작업에 이상적입니다. 단, 랙 장애 시 모든 인스턴스가 영향을 받는 리스크가 있습니다.
- **D) Default:** 기본 배치는 AWS가 인스턴스를 자동으로 분배하며, 특별한 네트워크 최적화를 제공하지 않습니다.

**핵심 개념:** Cluster Placement Group - 동일 AZ/랙, 최저 지연 시간, 최고 네트워크 처리량, HPC용

---

### Q2. An application requires high availability where each EC2 instance must be isolated from hardware failure of other instances. The application runs on 6 instances across 3 AZs. Which placement group is MOST appropriate?

**한글 번역:** 애플리케이션이 고가용성을 요구하며, 각 EC2 인스턴스가 다른 인스턴스의 하드웨어 장애로부터 격리되어야 합니다. 애플리케이션은 3개 AZ에 걸쳐 6개 인스턴스에서 실행됩니다. 가장 적합한 배치 그룹은 무엇입니까?

**선지:**
- A) Cluster → 클러스터
- B) Spread → 분산
- C) Partition → 파티션
- D) No placement group → 배치 그룹 없음

**정답:** B

**선지별 해설:**
- **A) Cluster:** 클러스터는 모든 인스턴스를 같은 하드웨어 근처에 배치하므로, 하드웨어 장애 격리 목적에 정반대입니다.
- **B) Spread:** 정답입니다. 분산 배치 그룹은 각 인스턴스를 서로 다른 물리적 하드웨어(랙)에 배치합니다. 한 랙의 장애가 다른 인스턴스에 영향을 주지 않습니다. AZ당 최대 7개 인스턴스까지 지원하므로, 3개 AZ에 6개 인스턴스(AZ당 2개)는 제한 범위 내입니다. 소규모 크리티컬 애플리케이션에 적합합니다.
- **C) Partition:** 파티션은 인스턴스를 그룹(파티션) 단위로 격리합니다. 개별 인스턴스 수준의 격리가 아닌 파티션 수준의 격리를 제공하므로, "각 인스턴스"가 격리되어야 하는 요구 사항에는 Spread가 더 적합합니다.
- **D) 배치 그룹 없음:** 배치 그룹 없이는 AWS가 인스턴스를 최적화하여 배치하지만, 하드웨어 격리를 보장하지 않습니다.

**핵심 개념:** Spread Placement Group - 인스턴스별 하드웨어 격리, AZ당 최대 7개 인스턴스

---

### Q3. A Solutions Architect needs to preserve the in-memory state of an EC2 instance to speed up subsequent boots. Which feature should they use?

**한글 번역:** Solutions Architect가 이후 부팅 속도를 높이기 위해 EC2 인스턴스의 인메모리 상태를 보존해야 합니다. 어떤 기능을 사용해야 합니까?

**선지:**
- A) EC2 User Data script → EC2 사용자 데이터 스크립트
- B) EC2 Hibernate → EC2 최대 절전 모드
- C) EBS Snapshots → EBS 스냅샷
- D) AMI creation → AMI 생성

**정답:** B

**선지별 해설:**
- **A) EC2 User Data:** 사용자 데이터 스크립트는 인스턴스가 처음 시작될 때 실행되는 부트스트랩 스크립트입니다. 인메모리 상태를 보존하지 않으며, 매번 스크립트를 실행하므로 부팅 속도를 크게 단축하지 못합니다.
- **B) EC2 Hibernate:** 정답입니다. EC2 Hibernate(최대 절전 모드)는 인스턴스의 RAM(인메모리) 내용을 루트 EBS 볼륨에 저장합니다. 인스턴스를 다시 시작하면 RAM 내용이 복원되어 이전 상태에서 빠르게 재개됩니다. OS를 처음부터 부팅하지 않으므로 시작 시간이 크게 단축됩니다.
- **C) EBS Snapshots:** EBS 스냅샷은 디스크 볼륨의 시점별 백업이며, 인메모리(RAM) 상태는 포함하지 않습니다.
- **D) AMI 생성:** AMI는 인스턴스의 디스크 이미지를 저장하지만, RAM의 현재 상태는 포함하지 않습니다.

**핵심 개념:** EC2 Hibernate - RAM 상태를 EBS에 저장하여 빠른 재시작 가능

---

### Q4. What is a prerequisite for using EC2 Hibernate?

**한글 번역:** EC2 Hibernate를 사용하기 위한 전제 조건은 무엇입니까?

**선지:**
- A) The instance must use an Instance Store root volume → 인스턴스가 Instance Store 루트 볼륨을 사용해야 함
- B) The root EBS volume must be encrypted → 루트 EBS 볼륨이 암호화되어야 함
- C) The instance RAM must be at least 150 GB → 인스턴스 RAM이 최소 150GB여야 함
- D) The instance must be a bare metal instance → 인스턴스가 베어 메탈 인스턴스여야 함

**정답:** B

**선지별 해설:**
- **A) Instance Store 루트 볼륨:** 틀립니다. 정반대입니다. Hibernate는 RAM 내용을 루트 볼륨에 저장해야 하므로, 영구적인 EBS 볼륨이 필요합니다. Instance Store는 임시 스토리지이므로 사용할 수 없습니다.
- **B) 루트 EBS 볼륨 암호화:** 정답입니다. EC2 Hibernate의 필수 조건 중 하나는 루트 EBS 볼륨이 암호화되어야 한다는 것입니다. RAM 내용에는 민감한 데이터가 포함될 수 있으므로, 디스크에 저장할 때 암호화가 필요합니다. 추가 조건: RAM 크기 150GB 이하, 최대 절전 기간 60일 이하.
- **C) RAM 최소 150GB:** 틀립니다. 150GB는 최대 제한입니다. Hibernate는 RAM이 150GB 이하인 인스턴스에서만 지원됩니다.
- **D) 베어 메탈 인스턴스:** 베어 메탈 인스턴스는 Hibernate의 요구 사항이 아닙니다. 다양한 인스턴스 패밀리에서 지원됩니다.

**핵심 개념:** EC2 Hibernate 조건 - 암호화된 루트 EBS 볼륨 필수, RAM 150GB 이하, 60일 이하

---

### Q5. An application requires a fixed public IP address that can be quickly remapped to another EC2 instance in case of failure. What should the Solutions Architect use?

**한글 번역:** 애플리케이션이 장애 시 다른 EC2 인스턴스로 빠르게 재매핑할 수 있는 고정 공용 IP 주소가 필요합니다. Solutions Architect는 무엇을 사용해야 합니까?

**선지:**
- A) A public IP address assigned by AWS → AWS가 할당한 공용 IP 주소
- B) An Elastic IP address → 탄력적 IP 주소
- C) A private IP address with NAT Gateway → NAT 게이트웨이가 있는 프라이빗 IP 주소
- D) An Application Load Balancer → Application Load Balancer

**정답:** B

**선지별 해설:**
- **A) AWS 할당 공용 IP:** AWS가 자동으로 할당하는 공용 IP는 인스턴스를 중지했다가 시작하면 변경됩니다. 고정 IP가 아니므로 장애 시 다른 인스턴스로 재매핑할 수 없습니다.
- **B) Elastic IP:** 정답입니다. Elastic IP는 AWS 계정에 할당되는 고정 공용 IPv4 주소입니다. 한 인스턴스에서 분리하여 다른 인스턴스에 즉시 연결할 수 있어 장애 시 빠른 장애 조치(failover)가 가능합니다. 계정당 기본 5개까지 사용 가능합니다.
- **C) NAT Gateway + 프라이빗 IP:** NAT Gateway는 프라이빗 서브넷의 인스턴스가 인터넷에 접근할 수 있게 해주지만, 고정 공용 IP를 인스턴스에 직접 매핑하는 것과는 다릅니다.
- **D) ALB:** ALB는 트래픽 분산에 사용되며, 고정 IP를 제공하지 않습니다(NLB는 고정 IP 제공). 또한 단순한 IP 재매핑보다 복잡한 솔루션입니다.

**핵심 개념:** Elastic IP - 고정 공용 IPv4, 인스턴스 간 빠른 재매핑, 장애 조치용

---

### Q6. A company is running a Cassandra database cluster on EC2 and needs to distribute instances across multiple isolated partitions to prevent correlated hardware failures. Which placement group should they use?

**한글 번역:** 한 회사가 EC2에서 Cassandra 데이터베이스 클러스터를 실행하고 있으며, 상관 하드웨어 장애를 방지하기 위해 여러 격리된 파티션에 인스턴스를 분산해야 합니다. 어떤 배치 그룹을 사용해야 합니까?

**선지:**
- A) Cluster → 클러스터
- B) Spread → 분산
- C) Partition → 파티션
- D) Default placement → 기본 배치

**정답:** C

**선지별 해설:**
- **A) Cluster:** 클러스터는 모든 인스턴스를 가까이 배치하므로, 하드웨어 장애 격리 목적에 적합하지 않습니다.
- **B) Spread:** 분산은 개별 인스턴스 수준의 격리를 제공하지만, AZ당 7개 인스턴스로 제한됩니다. Cassandra 클러스터처럼 많은 수의 인스턴스가 필요한 경우 적합하지 않습니다.
- **C) Partition:** 정답입니다. 파티션 배치 그룹은 인스턴스를 논리적 파티션으로 나누며, 각 파티션은 서로 다른 랙의 하드웨어를 사용합니다. AZ당 최대 7개 파티션을 지원하며, 파티션당 인스턴스 수에는 제한이 없습니다. Cassandra, Hadoop, Kafka 같은 대규모 분산 시스템에 이상적입니다. 인스턴스가 어떤 파티션에 속하는지 메타데이터로 확인할 수 있어 토폴로지 인식(topology-aware) 애플리케이션에 유용합니다.
- **D) Default:** 기본 배치는 하드웨어 격리를 보장하지 않습니다.

**핵심 개념:** Partition Placement Group - 대규모 분산 시스템(HDFS, Cassandra, Kafka)용, AZ당 7개 파티션

---

### Q7. What happens to the public IP address of an EC2 instance when it is stopped and then started again?

**한글 번역:** EC2 인스턴스가 중지된 후 다시 시작되면 공용 IP 주소는 어떻게 됩니까?

**선지:**
- A) The public IP address remains the same → 공용 IP 주소가 동일하게 유지됨
- B) The public IP address may change → 공용 IP 주소가 변경될 수 있음
- C) The instance loses both public and private IP addresses → 인스턴스가 공용 및 프라이빗 IP 주소를 모두 잃음
- D) The private IP address changes but public stays the same → 프라이빗 IP 주소가 변경되지만 공용은 동일하게 유지됨

**정답:** B

**선지별 해설:**
- **A) 공용 IP 동일 유지:** 틀립니다. AWS가 자동 할당한 공용 IP는 인스턴스 중지/시작 시 변경됩니다. 고정 IP가 필요하면 Elastic IP를 사용해야 합니다.
- **B) 공용 IP 변경 가능:** 정답입니다. EC2 인스턴스를 중지(Stop)했다가 시작(Start)하면, AWS가 자동으로 할당한 공용 IP 주소는 변경됩니다. 새로운 공용 IP가 할당됩니다. 단, 프라이빗 IP 주소는 변경되지 않고 유지됩니다. 재부팅(Reboot)의 경우에는 공용 IP가 유지됩니다.
- **C) 두 IP 모두 손실:** 틀립니다. 프라이빗 IP 주소는 인스턴스가 종료(Terminate)되기 전까지 유지됩니다. 중지/시작으로는 프라이빗 IP가 변경되지 않습니다.
- **D) 프라이빗 IP 변경, 공용 유지:** 정반대입니다. 프라이빗 IP는 유지되고 공용 IP가 변경됩니다.

**핵심 개념:** EC2 중지/시작 시 공용 IP 변경, 프라이빗 IP 유지 (Elastic IP로 고정 가능)

---

### Q8. An ENI created in us-east-1a can be attached to an EC2 instance in which AZ?

**한글 번역:** us-east-1a에서 생성된 ENI(Elastic Network Interface)는 어떤 AZ의 EC2 인스턴스에 연결할 수 있습니까?

**선지:**
- A) Any AZ in us-east-1 → us-east-1의 모든 AZ
- B) Only us-east-1a → us-east-1a만
- C) Any AZ in any Region → 모든 리전의 모든 AZ
- D) Any AZ in the same VPC → 같은 VPC의 모든 AZ

**정답:** B

**선지별 해설:**
- **A) us-east-1의 모든 AZ:** 틀립니다. ENI는 특정 AZ에 바인딩되며, 다른 AZ로 이동할 수 없습니다.
- **B) us-east-1a만:** 정답입니다. ENI(Elastic Network Interface)는 특정 가용 영역(AZ)에 바인딩됩니다. us-east-1a에서 생성된 ENI는 오직 us-east-1a에 있는 EC2 인스턴스에만 연결할 수 있습니다. 하지만 같은 AZ 내에서는 다른 인스턴스로 이동(detach/attach)할 수 있어 장애 조치에 유용합니다.
- **C) 모든 리전의 AZ:** 틀립니다. ENI는 리전은 물론 AZ도 넘나들 수 없습니다.
- **D) 같은 VPC의 모든 AZ:** 틀립니다. VPC는 여러 AZ에 걸쳐 있지만, ENI는 생성된 AZ에만 바인딩됩니다.

**핵심 개념:** ENI는 AZ에 바인딩됨 - 같은 AZ 내에서만 인스턴스 간 이동 가능

---
