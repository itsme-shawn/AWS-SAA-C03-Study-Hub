# Ditectrev SAA-C03 Practice Questions — Batch 07 (Q301-Q350)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q301. You have deployed a three-tier web application in a VPC with a CIDR block of 10.0.0.0/28. You initially deploy two web servers, two application servers, two database servers and one NAT instance for a total of seven EC2 instances. The web, application and database servers are deployed across two Availability Zones (AZs). You also deploy an ELB in front of the two web servers, and use Route 53 for DNS. Web traffic gradually increases in the first few days following the deployment, so you attempt to double the number of instances in each tier of the application to handle the new load. Unfortunately some of these new instances fail to launch. Which of the following could be the root cause? (Choose 2 answers)

**Options:**
- A) AWS reserves the first and the last private IP address in each subnet's CIDR block so you do not have enough addresses left to launch all of the new EC2 instances.
- B) The Internet Gateway (IGW) of your VPC has scaled-up, adding more instances to handle the traffic spike, reducing the number of available private IP addresses for new instance launches.
- C) The ELB has scaled-up, adding more instances to handle the traffic spike, reducing the number of available private IP addresses for new instance launches.
- D) AWS reserves one IP address in each subnet's CIDR block for Route 53 so you do not have enough addresses left to launch all of the new EC2 instances.
- E) AWS reserves the first four and the last IP address in each subnet's CIDR block so you do not have enough addresses left to launch all of the new EC2 instances.

**Answer:** C, E

**해설:**

> **문제:** 10.0.0.0/28 CIDR 블록을 가진 VPC에 3티어 웹 애플리케이션을 배포했습니다. 초기 7개의 EC2 인스턴스를 배포한 후, 트래픽 증가로 인스턴스 수를 늘리려 했으나 일부 인스턴스 시작에 실패했습니다. 근본 원인으로 올바른 것은?

| 선지 | 번역 |
|------|------|
| A | AWS는 서브넷 CIDR 블록에서 첫 번째와 마지막 IP 주소를 예약하므로 새 인스턴스를 시작할 주소가 부족합니다. |
| B | VPC의 IGW가 스케일업되어 사용 가능한 프라이빗 IP 주소 수가 줄었습니다. |
| C | ELB가 스케일업되어 트래픽 급증을 처리하기 위해 인스턴스를 추가함으로써 사용 가능한 프라이빗 IP 주소 수가 줄었습니다. |
| D | AWS는 Route 53을 위해 서브넷 CIDR 블록의 IP 주소 1개를 예약하므로 주소가 부족합니다. |
| E | AWS는 서브넷 CIDR 블록에서 첫 4개와 마지막 1개의 IP 주소를 예약하므로 새 인스턴스를 시작할 주소가 부족합니다. |

**(A)** : 틀렸습니다. AWS는 첫 번째와 마지막만이 아니라 처음 4개(네트워크, VPC 라우터, DNS, 예약)와 마지막 1개(브로드캐스트)를 예약합니다. → [📖 틀렸습니다. AWS는 첫 번째와 마지막만이 아니라 처음 4개(네트워크, VPC 라우터, DNS, 예약)와 마지막 1개(브로드캐스트)를 예약합니다...](/section/25-vpc#vpc-전체-구조)

**(B)** : IGW는 관리형 서비스로 프라이빗 IP 주소를 소비하지 않습니다. 틀린 설명입니다. → [📖 IGW는 관리형 서비스로 프라이빗 IP 주소를 소비하지 않습니다. 틀린 설명입니다.](/section/25-vpc#internet-gateway-igw)

**(C) 정답** : ELB는 트래픽 증가 시 내부적으로 스케일업되며 VPC 내 프라이빗 IP 주소를 소비합니다. /28 서브넷은 총 16개 주소 중 5개가 예약되어 11개만 사용 가능하므로 ELB 스케일업으로 가용 주소가 부족해질 수 있습니다. → [📖 ELB는 트래픽 증가 시 내부적으로 스케일업되며 VPC 내 프라이빗 IP 주소를 소비합니다. /28 서브넷은 총 16개 주소 중 5개가 예약되어...](/section/25-vpc#서브넷-subnet)

**(D)** : Route 53을 위해 별도로 IP를 예약하지 않습니다. 틀린 설명입니다. → [📖 Route 53을 위해 별도로 IP를 예약하지 않습니다. 틀린 설명입니다.](/section/08-route-53#health-checks-헬스-체크)

**(E) 정답** : AWS는 각 서브넷에서 첫 4개(네트워크 주소, VPC 라우터, DNS 서버, 미래 예약)와 마지막 1개(브로드캐스트)를 예약합니다. /28 = 16개 주소에서 5개 예약 = 11개만 사용 가능하여 인스턴스 수를 늘리면 주소가 부족해집니다. → [📖 AWS는 각 서브넷에서 첫 4개(네트워크 주소, VPC 라우터, DNS 서버, 미래 예약)와 마지막 1개(브로드캐스트)를 예약합니다. /28 =...](/section/25-vpc#서브넷-subnet)

**핵심 개념:** VPC 서브넷 CIDR 예약 주소 규칙 (첫 4개 + 마지막 1개), /28 서브넷의 IP 주소 한계, ELB 스케일업 시 IP 소비

**관련 노트:** [서브넷 Subnet](/section/25-vpc#서브넷-subnet), [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

---

### Q302. Which of the following will cause an immediate DB instance reboot to occur?

**Options:**
- A) You change storage type from standard to PIOPS, and Apply Immediately is set to true.
- B) You change the DB instance class, and Apply Immediately is set to false.
- C) You change a static parameter in a DB parameter group.
- D) You change the backup retention period for a DB instance from 0 to a nonzero value or from a nonzero value to 0, and Apply Immediately is set to false.

**Answer:** A

**해설:**

> **문제:** 다음 중 즉각적인 DB 인스턴스 재부팅을 유발하는 것은?

| 선지 | 번역 |
|------|------|
| A | 스토리지 유형을 standard에서 PIOPS로 변경하고 Apply Immediately를 true로 설정한 경우. |
| B | DB 인스턴스 클래스를 변경하고 Apply Immediately를 false로 설정한 경우. |
| C | DB 파라미터 그룹에서 정적 파라미터를 변경한 경우. |
| D | DB 인스턴스의 백업 보존 기간을 0에서 0이 아닌 값으로(또는 반대로) 변경하고 Apply Immediately를 false로 설정한 경우. |

**(A) 정답** : 스토리지 유형 변경(standard → PIOPS)에 Apply Immediately를 true로 설정하면 즉시 재부팅이 발생합니다. → [📖 스토리지 유형 변경(standard → PIOPS)에 Apply Immediately를 true로 설정하면 즉시 재부팅이 발생합니다.](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B)** : Apply Immediately가 false이면 다음 유지 관리 기간에 변경이 적용되므로 즉각적인 재부팅이 발생하지 않습니다. → [📖 Apply Immediately가 false이면 다음 유지 관리 기간에 변경이 적용됩니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : 정적 파라미터 변경은 파라미터 그룹을 재적용(재부팅)해야 하지만, 자동으로 즉각적인 재부팅을 유발하지는 않습니다. 수동 재부팅이 필요합니다. → [📖 정적 파라미터 변경은 파라미터 그룹을 재적용(재부팅)해야 합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D)** : Apply Immediately가 false이면 다음 유지 관리 기간에 적용되므로 즉각적인 재부팅이 아닙니다. → [📖 Apply Immediately가 false이면 다음 유지 관리 기간에 적용됩니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS 인스턴스 변경 시 Apply Immediately 설정과 재부팅 트리거 조건

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q303. EBS Snapshots occur [...].

**Options:**
- A) Asynchronously.
- B) Synchronously.

**Answer:** A

**해설:**

> **문제:** EBS 스냅샷은 [...]으로 발생합니다.

| 선지 | 번역 |
|------|------|
| A | 비동기적으로. |
| B | 동기적으로. |

**(A) 정답** : EBS 스냅샷은 비동기적으로 발생합니다. 스냅샷 생성 명령을 내리면 즉시 완료 응답을 받지만, 실제 데이터는 백그라운드에서 S3로 복사됩니다. 스냅샷이 진행되는 동안에도 볼륨을 계속 사용할 수 있습니다. → [📖 EBS 스냅샷은 비동기적으로 발생합니다. 스냅샷 생성 명령을 내리면 즉시 완료 응답을 받지만, 실제 데이터는 백그라운드에서 S3로 복사됩니다. ...](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : 동기적으로 발생하지 않습니다. 동기 방식이라면 스냅샷 완료 전까지 볼륨을 사용할 수 없게 됩니다. → [📖 동기적으로 발생하지 않습니다. 동기 방식이라면 스냅샷 완료 전까지 볼륨을 사용할 수 없게 됩니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** EBS 스냅샷의 비동기 처리 방식 및 S3 저장 메커니즘

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q304. You are tasked with moving a legacy application from a virtual machine running Inside your datacenter to an Amazon VPC Unfortunately this app requires access to a number of on-premises services and no one who configured the app still works for your company. Even worse there's no documentation for it. What will allow the application running inside the VPC to reach back and access its internal dependencies without being reconfigured? (Choose 3 answers)

**Options:**
- A) An AWS Direct Connect link between the VPC and the network housing the internal services.
- B) An Internet Gateway to allow a VPN connection.
- C) An Elastic IP address on the VPC instance.
- D) An IP address space that does not conflict with the one on-premises.
- E) Entries in Amazon Route 53 that allow the Instance to resolve its dependencies' IP addresses.
- F) A VM Import of the current virtual machine.

**Answer:** A, D, F

**해설:**

> **문제:** 레거시 애플리케이션을 VPC로 이전해야 하는데, 이 앱은 온프레미스 서비스에 접근해야 합니다. 재구성 없이 VPC 내 애플리케이션이 온프레미스 의존성에 접근하게 하려면 무엇이 필요합니까?

| 선지 | 번역 |
|------|------|
| A | VPC와 내부 서비스 네트워크 사이의 AWS Direct Connect 연결. |
| B | VPN 연결을 허용하는 인터넷 게이트웨이. |
| C | VPC 인스턴스의 Elastic IP 주소. |
| D | 온프레미스와 충돌하지 않는 IP 주소 공간. |
| E | 인스턴스가 의존성 IP 주소를 확인할 수 있도록 하는 Route 53 항목. |
| F | 현재 가상 머신의 VM Import. |

**(A) 정답** : Direct Connect는 VPC와 온프레미스 네트워크 간의 전용 연결을 제공하여 앱이 재구성 없이 내부 서비스에 접근할 수 있게 합니다. → [📖 Direct Connect는 VPC와 온프레미스 네트워크 간의 전용 연결을 제공하여 앱이 재구성 없이 내부 서비스에 접근할 수 있게 합니다.](/section/25-vpc#direct-connect-dx)

**(B)** : IGW는 인터넷 트래픽용이며, VPN 연결 자체는 Virtual Private Gateway를 통해 이루어집니다. 틀린 설명입니다. → [📖 IGW는 인터넷 트래픽용이며, VPN 연결 자체는 Virtual Private Gateway를 통해 이루어집니다. 틀린 설명입니다.](/section/25-vpc#sitetosite-vpn)

**(C)** : EIP는 외부에서 인스턴스에 접근하기 위한 것으로, 온프레미스 의존성 접근과는 무관합니다. → [📖 EIP는 외부에서 인스턴스에 접근하기 위한 것으로, 온프레미스 의존성 접근과는 무관합니다.](/section/04-ec2-associate#elastic-ip)

**(D) 정답** : VPC의 IP 주소 공간이 온프레미스와 겹치면 라우팅 충돌이 발생합니다. 비충돌 IP 공간을 사용해야 재구성 없이 연결이 가능합니다. → [📖 VPC의 IP 주소 공간이 온프레미스와 겹치면 라우팅 충돌이 발생합니다. 비충돌 IP 공간을 사용해야 재구성 없이 연결이 가능합니다.](/section/25-vpc#vpc-전체-구조)

**(E)** : Route 53 항목을 추가하는 것은 애플리케이션의 재구성에 해당하며, 요구 사항인 '재구성 없이'에 부합하지 않습니다. → [📖 Route 53 항목을 추가하는 것은 애플리케이션의 재구성에 해당하며, 요구 사항인 '재구성 없이'에 부합하지 않습니다.](/section/08-route-53#health-checks-헬스-체크)

**(F) 정답** : VM Import를 사용하면 기존 가상 머신을 그대로 AWS로 가져올 수 있어 애플리케이션 재구성이 필요 없습니다. → [📖 VM Import를 사용하면 기존 가상 머신을 그대로 AWS로 가져올 수 있어 애플리케이션 재구성이 필요 없습니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** 레거시 마이그레이션 전략 - Direct Connect, VM Import, 비충돌 CIDR 설계

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [온프레미스 전략](/section/26-disaster-recovery-migrations#온프레미스-전략), [CIDR Classless Inter-Domain Routing, 사이더](/section/25-vpc#cidr-classless-interdomain-routing-사이더)

---

### Q305. A company needs to deploy services to an AWS region which they have not previously used. The company currently has an AWS identity and Access Management (IAM) role for the Amazon EC2 instances, which permits the instance to have access to Amazon DynamoDB. The company wants their EC2 instances in the new region to have the same privileges. How should the company achieve this?

**Options:**
- A) Create a new IAM role and associated policies within the new region.
- B) Assign the existing IAM role to the Amazon EC2 instances in the new region.
- C) Copy the IAM role and associated policies to the new region and attach it to the instances.
- D) Create an Amazon Machine Image (AMI) of the instance and copy it to the desired region using the AMI Copy feature.

**Answer:** B

**해설:**

> **문제:** 회사가 새로운 AWS 리전에 서비스를 배포해야 합니다. 기존에 DynamoDB 접근 권한이 있는 IAM 역할이 있는데, 새 리전의 EC2 인스턴스에도 동일한 권한을 부여하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 새 리전 내에 새 IAM 역할과 정책을 생성한다. |
| B | 기존 IAM 역할을 새 리전의 EC2 인스턴스에 할당한다. |
| C | IAM 역할과 정책을 새 리전에 복사하고 인스턴스에 연결한다. |
| D | 인스턴스의 AMI를 만들고 AMI Copy 기능으로 원하는 리전에 복사한다. |

**(A)** : 새 역할을 만드는 것은 불필요한 작업입니다. IAM은 글로벌 서비스이므로 새 리전에서 별도로 생성할 필요가 없습니다. → [📖 새 역할을 만드는 것은 불필요한 작업입니다. IAM은 글로벌 서비스이므로 새 리전에서 별도로 생성할 필요가 없습니다.](/section/02-iam#iam-roles-역할)

**(B) 정답** : IAM은 글로벌 서비스입니다. 리전에 관계없이 동일한 IAM 역할을 모든 리전의 EC2 인스턴스에 할당할 수 있습니다. → [📖 IAM은 글로벌 서비스입니다. 리전에 관계없이 동일한 IAM 역할을 모든 리전의 EC2 인스턴스에 할당할 수 있습니다.](/section/02-iam#iam-roles-역할)

**(C)** : IAM 역할은 리전 리소스가 아니므로 복사가 필요 없습니다. 기존 역할을 그대로 사용하면 됩니다. → [📖 IAM 역할은 리전 리소스가 아니므로 복사가 필요 없습니다. 기존 역할을 그대로 사용하면 됩니다.](/section/02-iam#iam-roles-역할)

**(D)** : AMI 복사는 인스턴스 이미지와 관련된 것이며, IAM 권한 부여와는 무관합니다. → [📖 AMI 복사는 인스턴스 이미지와 관련된 것이며, IAM 권한 부여와는 무관합니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** IAM의 글로벌 특성 — IAM 역할, 사용자, 정책은 리전에 종속되지 않음

**관련 노트:** [Users & Groups](/section/02-iam#users-groups), [IAM Roles 역할](/section/02-iam#iam-roles-역할)

---

### Q306. If you want to launch Amazon Elastic Compute Cloud (EC2) instances and assign each instance a predetermined private IP address you should:

**Options:**
- A) Launch the instance from a private Amazon Machine Image (AMI).
- B) Assign a group of sequential Elastic IP address to the instances.
- C) Launch the instances in the Amazon Virtual Private Cloud (VPC).
- D) Launch the instances in a Placement Group.
- E) Use standard EC2 instances since each instance gets a private Domain Name Service (DNS) already.

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스를 시작하고 각 인스턴스에 미리 정해진 프라이빗 IP 주소를 할당하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 프라이빗 AMI로 인스턴스를 시작한다. |
| B | 인스턴스에 순차적인 Elastic IP 주소 그룹을 할당한다. |
| C | Amazon VPC에서 인스턴스를 시작한다. |
| D | 배치 그룹에서 인스턴스를 시작한다. |
| E | 표준 EC2 인스턴스를 사용한다(각 인스턴스는 이미 프라이빗 DNS를 가짐). |

**(A)** : 프라이빗 AMI는 미리 정해진 IP 주소 할당과 무관합니다. → [📖 프라이빗 AMI는 미리 정해진 IP 주소 할당과 무관합니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(B) 정답** : VPC에서 인스턴스를 시작할 때 특정 프라이빗 IP 주소를 지정할 수 있습니다. 단, 이 문제는 정답이 다소 논란의 여지가 있으며, 실제로는 VPC 내에서 인스턴스 시작 시 IP를 지정하는 것이 올바른 방법입니다. → [📖 VPC에서 인스턴스를 시작할 때 특정 프라이빗 IP 주소를 지정할 수 있습니다. 단, 이 문제는 정답이 다소 논란의 여지가 있으며, 실제로는 V...](/section/25-vpc#private-ip-범위)

**(C)** : VPC에서 시작하는 것이 사전 정의된 IP를 할당하는 방법의 전제 조건이지만, 이것만으로는 충분하지 않습니다. → [📖 VPC에서 시작하는 것이 사전 정의된 IP를 할당하는 방법의 전제 조건이지만, 이것만으로는 충분하지 않습니다.](/section/25-vpc#vpc-전체-구조)

**(D)** : 배치 그룹은 네트워크 성능 최적화를 위한 것으로 IP 주소 사전 지정과 무관합니다. → [📖 배치 그룹은 네트워크 성능 최적화를 위한 것으로 IP 주소 사전 지정과 무관합니다.](/section/04-ec2-associate#placement-groups-배치-그룹)

**(E)** : 표준 EC2 인스턴스는 동적으로 IP가 할당되므로 사전 정의된 IP를 보장하지 않습니다. → [📖 표준 EC2 인스턴스는 동적으로 IP가 할당되므로 사전 정의된 IP를 보장하지 않습니다.](/section/04-ec2-associate#ip-주소-ipv4)

**핵심 개념:** VPC에서 EC2 인스턴스 시작 시 프라이빗 IP 주소 사전 지정 방법

**관련 노트:** [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4), [서브넷 Subnet](/section/25-vpc#서브넷-subnet)

---

### Q307. When automatic failover occurs, Amazon RDS will emit a DB Instance event to inform you that automatic failover occurred. You can use the [...] to return information about events related to your DB Instance.

**Options:**
- A) FetchFailure.
- B) DescriveFailure.
- C) DescribeEvents.
- D) FetchEvents.

**Answer:** C

**해설:**

> **문제:** 자동 장애 조치가 발생할 때, Amazon RDS는 이를 알리는 DB 인스턴스 이벤트를 발생시킵니다. DB 인스턴스 관련 이벤트 정보를 반환하려면 [...]를 사용할 수 있습니다.

| 선지 | 번역 |
|------|------|
| A | FetchFailure. |
| B | DescriveFailure. |
| C | DescribeEvents. |
| D | FetchEvents. |

**(A)** : 존재하지 않는 API입니다.

**(B)** : 존재하지 않는 API입니다(오타 포함).

**(C) 정답** : `DescribeEvents` API를 사용하면 DB 인스턴스, DB 스냅샷, DB 파라미터 그룹, DB 보안 그룹과 관련된 이벤트 정보를 조회할 수 있습니다. → [📖 `DescribeEvents` API를 사용하면 DB 인스턴스, DB 스냅샷, DB 파라미터 그룹, DB 보안 그룹과 관련된 이벤트 정보를 조회...](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(D)** : 존재하지 않는 API입니다.

**핵심 개념:** RDS 이벤트 조회 API — DescribeEvents를 통한 자동 장애 조치 모니터링

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q308. You have a Business support plan with AWS. One of your EC2 instances is running Microsoft Windows Server 2008 R2 and you are having problems with the software. Can you receive support from AWS for this software?

**Options:**
- A) Yes.
- B) No, AWS does not support any third-party software.
- C) No, Microsoft Windows Server 2008 R2 is not supported.
- D) No, you need to be on the enterprise support plan.

**Answer:** A

**해설:**

> **문제:** AWS Business 지원 플랜을 사용 중입니다. EC2 인스턴스에서 Microsoft Windows Server 2008 R2를 실행 중인데 소프트웨어 문제가 있습니다. AWS로부터 이 소프트웨어에 대한 지원을 받을 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니요, AWS는 타사 소프트웨어를 지원하지 않습니다. |
| C | 아니요, Microsoft Windows Server 2008 R2는 지원되지 않습니다. |
| D | 아니요, Enterprise 지원 플랜이 필요합니다. |

**(A) 정답** : AWS Business 지원 플랜에는 AWS에서 제공하는 소프트웨어(Windows Server 포함)에 대한 기술 지원이 포함됩니다. AWS가 EC2에서 Windows Server를 제공하므로 관련 문제에 대해 지원을 받을 수 있습니다. → [📖 AWS Business 지원 플랜에는 AWS에서 제공하는 소프트웨어에 대한 기술 지원이 포함됩니다.](/section/29-white-papers-architectures#aws-trusted-advisor)

**(B)** : AWS는 자사 플랫폼에서 제공하는 소프트웨어에 대한 지원을 제공합니다. → [📖 AWS는 자사 플랫폼에서 제공하는 소프트웨어에 대한 지원을 제공합니다.](/section/29-white-papers-architectures#aws-trusted-advisor)

**(C)** : Windows Server 2008 R2는 AWS에서 지원하는 운영 체제입니다.

**(D)** : Business 플랜으로도 이러한 지원을 받을 수 있습니다. → [📖 Business 플랜으로도 이러한 지원을 받을 수 있습니다.](/section/29-white-papers-architectures#aws-trusted-advisor)

**핵심 개념:** AWS Business 지원 플랜 범위 — AWS 제공 소프트웨어에 대한 기술 지원 포함

---

### Q309. A newspaper organization has a on-premises application which allows the public to search its back catalogue and retrieve individual newspaper pages via a website written in Java They have scanned the old newspapers into JPEGs (approx 17TB) and used Optical Character Recognition (OCR) to populate a commercial search product. The hosting platform and software are now end of life and the organization wants to migrate Its archive to AWS and produce a cost efficient architecture and still be designed for availability and durability. Which is the most appropriate?

**Options:**
- A) Use S3 with reduced redundancy to store and serve the scanned files, install the commercial search application on EC2 Instances and configure with auto-scaling and an Elastic Load Balancer.
- B) Model the environment using CloudFormation use an EC2 instance running Apache webserver and an open source search application, stripe multiple standard EB5 volumes together to store the JPEGs and search index.
- C) Use S3 with standard redundancy to store and serve the scanned files, use Cloud5earch for query processing, and use Elastic Beanstalk to host the website across multiple Availability Zones.
- D) Use a single-AZ RD5 My5QL instance to store the search index 33d the JPEG images use an EC2 instance to serve the website and translate user queries into 5Q
- E) Use a CloudFront download distribution to serve the JPEGs to the end users and Install the current commercial search product, along with a Java Container Tor the website on EC2 instances and use Route 53 with DNS round-robin.

**Answer:** C

**해설:**

> **문제:** 신문사가 17TB의 JPEG 스캔 파일과 검색 기능을 가진 온프레미스 애플리케이션을 AWS로 마이그레이션하려 합니다. 비용 효율적이고 가용성과 내구성을 갖춘 가장 적합한 아키텍처는?

| 선지 | 번역 |
|------|------|
| A | S3 낮은 중복성으로 파일 저장, EC2에 상용 검색 앱 설치, Auto Scaling + ELB 구성. |
| B | CloudFormation으로 환경 모델링, EC2에 Apache + 오픈소스 검색, EBS 볼륨 스트라이프로 저장. |
| C | S3 표준 중복성으로 파일 저장, CloudSearch로 쿼리 처리, Elastic Beanstalk으로 여러 AZ에 웹사이트 호스팅. |
| D | 단일 AZ RDS MySQL로 검색 인덱스와 JPEG 저장, EC2로 웹 서비스. |
| E | CloudFront로 JPEG 배포, EC2에 상용 검색 제품과 Java 컨테이너 설치, Route 53 DNS 라운드로빈. |

**(A)** : 낮은 중복성(RRS)은 내구성이 떨어지므로 중요 아카이브 데이터에 부적합합니다. → [📖 낮은 중복성(RRS)은 내구성이 떨어지므로 중요 아카이브 데이터에 부적합합니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B)** : EBS 볼륨 스트라이프는 17TB 스토리지에 비효율적이며 관리가 복잡합니다. → [📖 EBS 볼륨 스트라이프는 17TB 스토리지에 비효율적이며 관리가 복잡합니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C) 정답** : S3 표준은 11 9s의 내구성을 제공하고, CloudSearch는 완전 관리형 검색 서비스로 상용 검색 제품을 대체할 수 있습니다. Elastic Beanstalk으로 다중 AZ 배포가 가능해 가용성과 내구성, 비용 효율성을 모두 충족합니다. → [📖 S3 표준은 11 9s의 내구성을 제공하고, CloudSearch는 완전 관리형 검색 서비스로 상용 검색 제품을 대체할 수 있습니다. Elast...](/section/20-data-analytics#amazon-opensearch-service)

**(D)** : 단일 AZ RDS는 가용성이 낮고, RDS에 JPEG 이미지를 저장하는 것은 부적합합니다. → [📖 단일 AZ RDS는 가용성이 낮고, RDS에 JPEG 이미지를 저장하는 것은 부적합합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(E)** : CloudFront만으로는 검색 기능을 처리할 수 없고, 상용 제품 라이선스 비용이 발생합니다. → [📖 CloudFront만으로는 검색 기능을 처리할 수 없고, 상용 제품 라이선스 비용이 발생합니다.](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**핵심 개념:** 미디어 아카이브 마이그레이션 — S3 + CloudSearch + Elastic Beanstalk 조합

**관련 노트:** [S3 사용 사례](/section/10-amazon-s3#s3-사용-사례), [Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

---

### Q310. A Provisioned IOPS volume must be at least [...] GB in size.

**Options:**
- A) 1.
- B) 50.
- C) 20.
- D) 10.

**Answer:** D

**해설:**

> **문제:** Provisioned IOPS 볼륨은 최소 [...] GB 이상이어야 합니다.

| 선지 | 번역 |
|------|------|
| A | 1 GB. |
| B | 50 GB. |
| C | 20 GB. |
| D | 10 GB. |

**(A)** : 1GB는 Provisioned IOPS 볼륨의 최소 크기가 아닙니다. → [📖 1GB는 Provisioned IOPS 볼륨의 최소 크기가 아닙니다.](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B)** : 50GB는 정확한 최소 크기가 아닙니다.

**(C)** : 20GB는 정확한 최소 크기가 아닙니다.

**(D) 정답** : Provisioned IOPS(io1) EBS 볼륨의 최소 크기는 4GB이지만, 이 문제의 기준에 따르면 10GB가 정답입니다. 시험 출제 시점의 AWS 문서 기준을 반영합니다. → [📖 Provisioned IOPS(io1) EBS 볼륨의 최소 크기는 4GB이지만, 이 문제의 기준에 따르면 10GB가 정답입니다. 시험 출제 시점...](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**핵심 개념:** EBS Provisioned IOPS 볼륨 크기 제한 및 IOPS 비율 요건

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q311. In Amazon EC2, while sharing an Amazon EBS snapshot, can the snapshots with AWS Marketplace product codes be public?

**Options:**
- A) Yes, but only for US-based providers.
- B) Yes, they can be public.
- C) No, they cannot be made public.
- D) Yes, they are automatically made public by the system.

**Answer:** C

**해설:**

> **문제:** Amazon EC2에서 EBS 스냅샷을 공유할 때, AWS Marketplace 제품 코드가 있는 스냅샷을 공개(public)로 만들 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 미국 기반 제공업체에 한해서만 가능합니다. |
| B | 예, 공개로 만들 수 있습니다. |
| C | 아니요, 공개로 만들 수 없습니다. |
| D | 예, 시스템이 자동으로 공개로 만듭니다. |

**(A)** : 지역에 따른 예외는 없습니다.

**(B)** : 잘못된 설명입니다.

**(C) 정답** : AWS Marketplace 제품 코드가 포함된 EBS 스냅샷은 공개로 만들 수 없습니다. 이는 라이선스 및 보안 제어를 위한 정책입니다. → [📖 AWS Marketplace 제품 코드가 포함된 EBS 스냅샷은 공개로 만들 수 없습니다. 이는 라이선스 및 보안 제어를 위한 정책입니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(D)** : 자동으로 공개가 되지 않습니다.

**핵심 개념:** EBS 스냅샷 공유 정책 — Marketplace 제품 코드가 있는 스냅샷의 공개 제한

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q312. A company has an AWS account that contains three VPCs (Dev, Test, and Prod) in the same region. Test is peered to both Prod and Dev. All VPCs have non-overlapping CIDR blocks. The company wants to push minor code releases from Dev to Prod to speed up time to market. Which of the following options helps the company accomplish this?

**Options:**
- A) Create a new peering connection Between Prod and Dev along with appropriate routes.
- B) Create a new entry to Prod in the Dev route table using the peering connection as the target.
- C) Attach a second gateway to Dev. Add a new entry in the Prod route table identifying the gateway as the target.
- D) The VPCs have non-overlapping Cl DR blocks in the same account. The route tables contain local routes for all VPCs.

**Answer:** D

**해설:**

> **문제:** 동일 리전에 Dev, Test, Prod 세 VPC가 있습니다. Test는 Prod와 Dev 모두와 피어링되어 있고 CIDR은 겹치지 않습니다. Dev에서 Prod로 코드를 배포하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Prod와 Dev 사이에 새 피어링 연결을 생성하고 적절한 라우트를 추가한다. |
| B | Dev 라우트 테이블에 피어링 연결을 대상으로 Prod 항목을 추가한다. |
| C | Dev에 두 번째 게이트웨이를 연결하고 Prod 라우트 테이블에 새 항목을 추가한다. |
| D | VPC들은 같은 계정에서 겹치지 않는 CIDR 블록을 가지며 라우트 테이블은 모든 VPC에 대한 로컬 라우트를 포함합니다. |

**(A)** : Dev와 Prod가 직접 피어링되어 있지 않은 경우 유효하지만, 이 문제의 맥락에서는 Test를 통한 전이적 피어링을 의미하는 것으로 보입니다. VPC 피어링은 전이적이지 않습니다. → [📖 Dev와 Prod가 직접 피어링되어 있지 않은 경우 유효하지만, 이 문제의 맥락에서는 Test를 통한 전이적 피어링을 의미하는 것으로 보입니다....](/section/25-vpc#vpc-peering)

**(B)** : Dev와 Prod가 직접 피어링되지 않은 상태에서는 작동하지 않습니다. → [📖 Dev와 Prod가 직접 피어링되지 않은 상태에서는 작동하지 않습니다.](/section/25-vpc#vpc-peering)

**(C)** : 두 번째 게이트웨이 연결은 불필요하고 부정확한 방법입니다.

**(D) 정답** : 동일 계정 내 같은 리전의 VPC들은 CIDR이 겹치지 않으면 라우트 테이블에 로컬 라우트가 있어 직접 통신이 가능합니다. 실제로는 피어링이 필요하지만, 이 문제는 기존 구성으로 충분함을 시사합니다. → [📖 동일 계정 내 같은 리전의 VPC들은 CIDR이 겹치지 않으면 라우트 테이블에 로컬 라우트가 있어 직접 통신이 가능합니다. 실제로는 피어링이 필...](/section/25-vpc#vpc-peering)

**핵심 개념:** VPC 피어링의 비전이성(non-transitive) 특성 및 동일 계정 VPC 간 라우팅

**관련 노트:** [VPC Peering](/section/25-vpc#vpc-peering)

---

### Q313. The [...] service is targeted at organizations with multiple users or systems that use AWS products such as Amazon EC2, Amazon SimpleDB, and the AWS Management Console.

**Options:**
- A) Amazon RDS.
- B) AWS Integrity Management.
- C) AWS Identity and Access Management.
- D) Amazon EMR.

**Answer:** C

**해설:**

> **문제:** [...] 서비스는 Amazon EC2, Amazon SimpleDB, AWS Management Console 등을 사용하는 여러 사용자 또는 시스템을 가진 조직을 대상으로 합니다.

| 선지 | 번역 |
|------|------|
| A | Amazon RDS. |
| B | AWS Integrity Management. |
| C | AWS Identity and Access Management. |
| D | Amazon EMR. |

**(A)** : Amazon RDS는 관계형 데이터베이스 서비스로 사용자/접근 관리와 무관합니다. → [📖 Amazon RDS는 관계형 데이터베이스 서비스로 사용자/접근 관리와 무관합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : 존재하지 않는 서비스입니다.

**(C) 정답** : AWS IAM(Identity and Access Management)은 여러 사용자, 그룹, 역할에 대한 AWS 리소스 접근 제어를 위한 서비스입니다. 다수의 사용자나 시스템이 AWS를 사용하는 조직에 필수적입니다. → [📖 AWS IAM(Identity and Access Management)은 여러 사용자, 그룹, 역할에 대한 AWS 리소스 접근 제어를 위한 서비...](/section/02-iam#iam-roles-역할)

**(D)** : Amazon EMR은 빅데이터 처리 서비스로 사용자 관리와 무관합니다. → [📖 Amazon EMR은 빅데이터 처리 서비스로 사용자 관리와 무관합니다.](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**핵심 개념:** AWS IAM의 목적 — 다중 사용자/시스템 환경에서의 접근 권한 관리

**관련 노트:** [Users & Groups](/section/02-iam#users-groups), [IAM Policies 정책](/section/02-iam#iam-policies-정책)

---

### Q314. You have just been given a scope for a new client who has an enormous amount of data (petabytes) that he constantly needs analysed. Currently he is paying a huge amount of money for a data warehousing company to do this for him and is wondering if AWS can provide a cheaper solution. Do you think AWS has a solution for this?

**Options:**
- A) Yes. Amazon SimpleDB.
- B) No. Not presently.
- C) Yes. Amazon Redshift.
- D) Yes. Your choice of relational AMIs on Amazon EC2 and EBS.

**Answer:** C

**해설:**

> **문제:** 페타바이트 규모의 데이터를 지속적으로 분석해야 하는 고객이 있습니다. 현재 고가의 데이터 웨어하우징 회사를 이용 중인데, AWS가 더 저렴한 솔루션을 제공할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, Amazon SimpleDB. |
| B | 아니요, 현재는 없습니다. |
| C | 예, Amazon Redshift. |
| D | 예, EC2와 EBS에서 관계형 AMI를 선택하여 사용. |

**(A)** : SimpleDB는 소규모 데이터셋을 위한 서비스로 페타바이트 규모 분석에 부적합합니다. → [📖 SimpleDB는 소규모 데이터셋을 위한 서비스로 페타바이트 규모 분석에 부적합합니다.](/section/19-databases#amazon-dynamodb)

**(B)** : AWS는 Redshift를 통해 이러한 솔루션을 제공합니다. → [📖 AWS는 Redshift를 통해 이러한 솔루션을 제공합니다.](/section/20-data-analytics#amazon-redshift)

**(C) 정답** : Amazon Redshift는 페타바이트 규모의 데이터 웨어하우징 서비스로, 기존 데이터 웨어하우스 대비 저렴한 비용으로 대용량 데이터 분석을 제공합니다. → [📖 Amazon Redshift는 페타바이트 규모의 데이터 웨어하우징 서비스로, 기존 데이터 웨어하우스 대비 저렴한 비용으로 대용량 데이터 분석을 ...](/section/20-data-analytics#amazon-redshift)

**(D)** : EC2와 EBS로 자체 데이터베이스를 운영하는 것은 관리 부담이 크고 페타바이트 규모에 비효율적입니다. → [📖 EC2와 EBS로 자체 데이터베이스를 운영하는 것은 관리 부담이 크고 페타바이트 규모에 비효율적입니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** Amazon Redshift — 페타바이트 규모 데이터 웨어하우징 서비스

**관련 노트:** [Amazon Redshift](/section/20-data-analytics#amazon-redshift)

---

### Q315. You have set up an Elastic Load Balancer (ELB) with the usual default settings, which route each request independently to the application instance with the smallest load. However, someone has asked you to bind a user's session to a specific application instance so as to ensure that all requests coming from the user during the session will be sent to the same application instance. AWS has a feature to do this. What is it called?

**Options:**
- A) Connection draining.
- B) Proxy protocol.
- C) Tagging.
- D) Sticky session.

**Answer:** D

**해설:**

> **문제:** ELB를 기본 설정으로 구성했는데, 사용자의 세션을 특정 애플리케이션 인스턴스에 바인딩하여 세션 중 모든 요청이 동일한 인스턴스로 전송되도록 하고 싶습니다. 이 기능의 이름은?

| 선지 | 번역 |
|------|------|
| A | Connection draining (연결 드레이닝). |
| B | Proxy protocol (프록시 프로토콜). |
| C | Tagging (태깅). |
| D | Sticky session (스티키 세션). |

**(A)** : Connection draining은 인스턴스를 제거할 때 기존 연결을 완료할 때까지 유지하는 기능입니다. → [📖 Connection draining은 인스턴스를 제거할 때 기존 연결을 완료할 때까지 유지하는 기능입니다.](/section/06-high-availability-scalability#connection-draining-deregistration-delay)

**(B)** : Proxy protocol은 클라이언트 IP 정보를 백엔드로 전달하기 위한 프로토콜입니다. → [📖 Proxy protocol은 클라이언트 IP 정보를 백엔드로 전달하기 위한 프로토콜입니다.](/section/06-high-availability-scalability#nlb-network-load-balancer-상세)

**(C)** : Tagging은 리소스 분류를 위한 메타데이터 기능입니다.

**(D) 정답** : Sticky Session(세션 고정)은 ELB가 쿠키를 사용하여 특정 사용자의 요청을 항상 동일한 인스턴스로 라우팅하는 기능입니다. → [📖 Sticky Session(세션 고정)은 ELB가 쿠키를 사용하여 특정 사용자의 요청을 항상 동일한 인스턴스로 라우팅하는 기능입니다.](/section/28-other-services#amazon-simple-email-service-ses)

**핵심 개념:** ELB Sticky Session — 세션 지속성을 위한 쿠키 기반 라우팅

**관련 노트:** [Sticky Sessions Session Affinity](/section/06-high-availability-scalability#sticky-sessions-session-affinity)

---

### Q316. You have written a CloudFormation template that creates 1 Elastic Load Balancer fronting 2 EC2 Instances. Which section of the template should you edit so that the DNS of the load balancer is returned upon creation of the stack?

**Options:**
- A) Resources.
- B) Outputs.
- C) Parameters.
- D) Mappings.

**Answer:** B

**해설:**

> **문제:** ELB 1개와 EC2 인스턴스 2개를 생성하는 CloudFormation 템플릿을 작성했습니다. 스택 생성 시 로드 밸런서의 DNS를 반환하려면 어느 섹션을 편집해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Resources (리소스). |
| B | Outputs (출력). |
| C | Parameters (파라미터). |
| D | Mappings (매핑). |

**(A)** : Resources 섹션은 실제 AWS 리소스를 정의하는 곳으로, 결과값 반환과는 다릅니다. → [📖 Resources 섹션은 실제 AWS 리소스를 정의하는 곳입니다.](/section/28-other-services#aws-cloudformation)

**(B) 정답** : Outputs 섹션은 스택 생성 후 반환할 값을 정의합니다. ELB의 DNS 이름을 Outputs에 정의하면 스택 생성 완료 후 해당 값이 반환됩니다. → [📖 Outputs 섹션은 스택 생성 후 반환할 값을 정의합니다. ELB의 DNS 이름을 Outputs에 정의하면 스택 생성 완료 후 해당 값이 반환...](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(C)** : Parameters 섹션은 스택 생성 시 사용자로부터 입력을 받는 곳입니다. → [📖 Parameters 섹션은 스택 생성 시 사용자로부터 입력을 받는 곳입니다.](/section/28-other-services#aws-cloudformation)

**(D)** : Mappings 섹션은 조건부 값 매핑(예: 리전별 AMI ID)을 정의하는 곳입니다. → [📖 Mappings 섹션은 조건부 값 매핑(예: 리전별 AMI ID)을 정의하는 곳입니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** CloudFormation 템플릿 구조 — Outputs 섹션을 통한 스택 결과값 반환

**관련 노트:** [AWS CloudFormation](/section/28-other-services#aws-cloudformation)

---

### Q317. AWS CloudFormation is a service that helps you model and set up your Amazon Web Services resources so that you can spend less time managing those resources and more time focusing on your applications that run in AWS. You create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and AWS CloudFormation takes care of provisioning and configuring those resources for you. What formatting is required for this template?

**Options:**
- A) JSON-formatted document.
- B) CSS-formatted document.
- C) XML-formatted document.
- D) HTML-formatted document.

**Answer:** A

**해설:**

> **문제:** AWS CloudFormation 템플릿에 필요한 형식은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | JSON 형식 문서. |
| B | CSS 형식 문서. |
| C | XML 형식 문서. |
| D | HTML 형식 문서. |

**(A) 정답** : CloudFormation 템플릿은 JSON 또는 YAML 형식으로 작성됩니다. 이 문제에서는 JSON이 정답으로 제시되어 있습니다(YAML 지원은 이후에 추가됨). → [📖 CloudFormation 템플릿은 JSON 또는 YAML 형식으로 작성됩니다. 이 문제에서는 JSON이 정답으로 제시되어 있습니다(YAML 지...](/section/28-other-services#aws-cloudformation)

**(B)** : CSS는 웹 스타일링 언어로 CloudFormation과 무관합니다. → [📖 CSS는 웹 스타일링 언어로 CloudFormation과 무관합니다.](/section/28-other-services#aws-cloudformation)

**(C)** : XML은 CloudFormation 템플릿 형식이 아닙니다. → [📖 XML은 CloudFormation 템플릿 형식이 아닙니다.](/section/28-other-services#aws-cloudformation)

**(D)** : HTML은 웹 마크업 언어로 CloudFormation과 무관합니다. → [📖 HTML은 웹 마크업 언어로 CloudFormation과 무관합니다.](/section/28-other-services#aws-cloudformation)

**핵심 개념:** CloudFormation 템플릿 형식 — JSON 및 YAML 지원

**관련 노트:** [AWS CloudFormation](/section/28-other-services#aws-cloudformation)

---

### Q318. A user has created an application which will be hosted on EC2. The application makes calls to DynamoDB to fetch certain data. The application is using the DynamoDB SDK to connect with from the EC2 instance. Which of the below mentioned statements is true with respect to the best practice for security in this scenario?

**Options:**
- A) The user should create an IAM user with DynamoDB access and use its credentials within the application to connect with DynamoDB.
- B) The user should attach an IAM role with DynamoDB access to the EC2 instance.
- C) The user should create an IAM role, which has EC2 access so that it will allow deploying the application.
- D) The user should create an IAM user with DynamoDB and EC2 access. Attach the user with the application so that it does not use the root account credentials.

**Answer:** B

**해설:**

> **문제:** EC2에서 호스팅되는 애플리케이션이 DynamoDB SDK로 DynamoDB에 접근합니다. 보안 모범 사례에 따른 올바른 방법은?

| 선지 | 번역 |
|------|------|
| A | IAM 사용자를 생성하여 자격증명을 애플리케이션 내에 사용한다. |
| B | EC2 인스턴스에 DynamoDB 접근 권한이 있는 IAM 역할을 연결한다. |
| C | EC2 접근 권한이 있는 IAM 역할을 생성하여 애플리케이션 배포에 사용한다. |
| D | DynamoDB와 EC2 접근 권한이 있는 IAM 사용자를 생성하여 루트 계정 자격증명 사용을 피한다. |

**(A)** : 자격증명을 애플리케이션 코드에 하드코딩하거나 저장하는 것은 보안 위험입니다. → [📖 자격증명을 애플리케이션 코드에 하드코딩하거나 저장하는 것은 보안 위험입니다.](/section/02-iam#iam-roles-역할)

**(B) 정답** : IAM 역할을 EC2 인스턴스에 연결하는 것이 모범 사례입니다. 인스턴스 메타데이터를 통해 임시 자격증명이 자동으로 제공되며, 자격증명을 코드나 설정 파일에 저장할 필요가 없습니다. → [📖 IAM 역할을 EC2 인스턴스에 연결하는 것이 모범 사례입니다. 인스턴스 메타데이터를 통해 임시 자격증명이 자동으로 제공되며, 자격증명을 코드나...](/section/03-ec2-basics#ec2-설정-옵션)

**(C)** : EC2 접근 권한이 아닌 DynamoDB 접근 권한이 필요합니다. → [📖 EC2 접근 권한이 아닌 DynamoDB 접근 권한이 필요합니다.](/section/17-serverless-overview#amazon-dynamodb)

**(D)** : IAM 사용자 자격증명을 애플리케이션에 연결하는 것도 보안상 좋지 않습니다. → [📖 IAM 사용자 자격증명을 애플리케이션에 연결하는 것도 보안상 좋지 않습니다.](/section/02-iam#users-groups)

**핵심 개념:** EC2에서 AWS 서비스 접근 시 IAM 역할(Instance Profile) 사용 — 보안 모범 사례

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

---

### Q319. After setting up an EC2 security group with a cluster of 20 EC2 instances, you find an error in the security group settings. You quickly make changes to the security group settings. When will the changes to the settings be effective?

**Options:**
- A) The settings will be effective immediately for all the instances in the security group.
- B) The settings will be effective only when all the instances are restarted.
- C) The settings will be effective for all the instances only after 30 minutes.
- D) The settings will be effective only for the new instances added to the security group.

**Answer:** A

**해설:**

> **문제:** 20개의 EC2 인스턴스가 있는 보안 그룹 설정을 변경했습니다. 변경 사항은 언제 적용됩니까?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹의 모든 인스턴스에 즉시 적용됩니다. |
| B | 모든 인스턴스를 재시작해야 적용됩니다. |
| C | 30분 후 모든 인스턴스에 적용됩니다. |
| D | 보안 그룹에 새로 추가된 인스턴스에만 적용됩니다. |

**(A) 정답** : 보안 그룹 규칙 변경은 해당 보안 그룹에 연결된 모든 인스턴스에 즉시 적용됩니다. 재시작이나 대기 시간이 필요 없습니다. → [📖 보안 그룹 규칙 변경은 해당 보안 그룹에 연결된 모든 인스턴스에 즉시 적용됩니다. 재시작이나 대기 시간이 필요 없습니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 재시작이 필요 없습니다.

**(C)** : 대기 시간이 없습니다.

**(D)** : 기존 인스턴스에도 즉시 적용됩니다. → [📖 기존 인스턴스에도 즉시 적용됩니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** EC2 보안 그룹의 즉각적인 변경 적용 특성

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q320. Can a user get a notification of each instance start / terminate configured with Auto Scaling?

**Options:**
- A) Yes, if configured with the Launch Config.
- B) Yes, always.
- C) Yes, if configured with the Auto Scaling group.
- D) No.

**Answer:** C

**해설:**

> **문제:** Auto Scaling으로 구성된 각 인스턴스의 시작/종료 알림을 받을 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, Launch Config에 구성된 경우. |
| B | 예, 항상. |
| C | 예, Auto Scaling 그룹에 구성된 경우. |
| D | 아니요. |

**(A)** : 알림은 Launch Configuration이 아닌 Auto Scaling 그룹에서 구성합니다. → [📖 알림은 Launch Configuration이 아닌 Auto Scaling 그룹에서 구성합니다.](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(B)** : 자동으로 알림이 발송되지는 않으며, 구성이 필요합니다. → [📖 자동으로 알림이 발송되지는 않으며, 구성이 필요합니다.](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(C) 정답** : Auto Scaling 그룹에 SNS 알림을 구성하면 인스턴스 시작(launch), 종료(terminate), 실패 등의 이벤트에 대한 알림을 받을 수 있습니다. → [📖 Auto Scaling 그룹에 SNS 알림을 구성하면 인스턴스 시작(launch), 종료(terminate), 실패 등의 이벤트에 대한 알림을 ...](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(D)** : 알림을 받을 수 있습니다.

**핵심 개념:** Auto Scaling 그룹의 SNS 알림 구성 — 인스턴스 라이프사이클 이벤트 알림

**관련 노트:** [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg), [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q321. Which Amazon storage do you think is the best for my database-style applications that frequently encounter many random reads and writes across the dataset?

**Options:**
- A) None of these.
- B) Amazon Instance Storage.
- C) Any of these.
- D) Amazon EBS.

**Answer:** D

**해설:**

> **문제:** 데이터셋 전체에서 빈번하게 무작위 읽기/쓰기가 발생하는 데이터베이스 스타일 애플리케이션에 가장 적합한 Amazon 스토리지는?

| 선지 | 번역 |
|------|------|
| A | 이 중 없음. |
| B | Amazon Instance Storage (인스턴스 스토리지). |
| C | 이 중 어느 것이든. |
| D | Amazon EBS. |

**(A)** : EBS가 적합한 옵션입니다. → [📖 EBS가 적합한 옵션입니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : 인스턴스 스토리지는 인스턴스 종료 시 데이터가 소실되므로 데이터베이스에 부적합합니다. → [📖 인스턴스 스토리지는 인스턴스 종료 시 데이터가 소실되므로 데이터베이스에 부적합합니다.](/section/05-ec2-instance-storage#ec2-instance-store)

**(C)** : 인스턴스 스토리지는 데이터베이스에 부적합하므로 '어느 것이든'은 틀립니다. → [📖 인스턴스 스토리지는 데이터베이스에 부적합합니다.](/section/05-ec2-instance-storage#ec2-instance-store)

**(D) 정답** : Amazon EBS는 지속적인 블록 스토리지로, 빈번한 무작위 읽기/쓰기가 필요한 데이터베이스 애플리케이션에 적합합니다. Provisioned IOPS를 통해 일관된 성능을 보장할 수 있습니다. → [📖 Amazon EBS는 지속적인 블록 스토리지로, 빈번한 무작위 읽기/쓰기가 필요한 데이터베이스 애플리케이션에 적합합니다. Provisioned ...](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**핵심 개념:** EBS — 데이터베이스 워크로드를 위한 영구적 블록 스토리지

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [EBS vs EFS vs Instance Store 비교 시험 핵심!](/section/05-ec2-instance-storage#ebs-vs-efs-vs-instance-store-비교-시험-핵심)

---

### Q322. In the Amazon RDS Oracle DB engine, the Database Diagnostic Pack and the Database Tuning Pack are only available with [...].

**Options:**
- A) Oracle Standard Edition.
- B) Oracle Express Edition.
- C) Oracle Enterprise Edition.
- D) None of these.

**Answer:** C

**해설:**

> **문제:** Amazon RDS Oracle DB 엔진에서 Database Diagnostic Pack과 Database Tuning Pack은 [...]에서만 사용할 수 있습니다.

| 선지 | 번역 |
|------|------|
| A | Oracle Standard Edition. |
| B | Oracle Express Edition. |
| C | Oracle Enterprise Edition. |
| D | 이 중 없음. |

**(A)** : Standard Edition에는 이 팩들이 포함되지 않습니다. → [📖 Standard Edition에는 이 팩들이 포함되지 않습니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : Express Edition은 기능이 제한된 무료 버전으로 해당 팩을 지원하지 않습니다. → [📖 Express Edition은 기능이 제한된 무료 버전입니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C) 정답** : Oracle Database Diagnostic Pack과 Tuning Pack은 Oracle Enterprise Edition에서만 사용 가능한 고급 진단 및 튜닝 도구입니다. → [📖 Oracle Database Diagnostic Pack과 Tuning Pack은 Oracle Enterprise Edition에서만 사용 가능...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D)** : Enterprise Edition에서 사용 가능하므로 틀렸습니다. → [📖 Enterprise Edition에서 사용 가능합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS Oracle 에디션별 기능 차이 — Enterprise Edition 전용 Diagnostic/Tuning Pack

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q323. Will my standby RDS instance be in the same Availability Zone as my primary?

**Options:**
- A) Only for Oracle RDS types.
- B) Yes.
- C) Only if configured at launch.
- D) No.

**Answer:** D

**해설:**

> **문제:** RDS 스탠바이 인스턴스가 프라이머리와 동일한 가용 영역(AZ)에 있습니까?

| 선지 | 번역 |
|------|------|
| A | Oracle RDS 유형에만 해당합니다. |
| B | 예. |
| C | 시작 시 구성된 경우에만. |
| D | 아니요. |

**(A)** : Oracle 전용 규칙이 아닙니다. → [📖 Oracle 전용 규칙이 아닙니다.](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(B)** : 스탠바이는 다른 AZ에 위치합니다. → [📖 스탠바이는 다른 AZ에 위치합니다.](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : 구성 옵션이 아닙니다.

**(D) 정답** : RDS Multi-AZ 배포에서 스탠바이 인스턴스는 항상 프라이머리와 다른 가용 영역에 위치합니다. 이는 AZ 장애로부터 보호하기 위한 설계입니다. → [📖 RDS Multi-AZ 배포에서 스탠바이 인스턴스는 항상 프라이머리와 다른 가용 영역에 위치합니다. 이는 AZ 장애로부터 보호하기 위한 설계입니...](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**핵심 개념:** RDS Multi-AZ 배포 — 스탠바이 인스턴스는 다른 AZ에 위치하여 고가용성 보장

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

---

### Q324. An administrator is using Amazon CloudFormation to deploy a three tier web application that consists of a web tier and application tier that will utilize Amazon DynamoDB for storage. When creating the CloudFormation template, which of the following would allow the application instance access to the DynamoDB tables without exposing API credentials?

**Options:**
- A) Create an Identity and Access Management Role that has the required permissions to read and write from the required DynamoDB table and associate the Role to the application instances by referencing an instance profile.
- B) Use the Parameter section in the Cloud Formation template to have the user input Access and Secret Keys from an already created IAM user that has the permissions required to read and write from the required DynamoDB table.
- C) Create an Identity and Access Management Role that has the required permissions to read and write from the required DynamoDB table and reference the Role in the instance profile property of the application instance.
- D) Create an identity and Access Management user in the CloudFormation template that has permissions to read and write from the required DynamoDB table, use the GetAtt function to retrieve the Access and secret keys and pass them to the application instance through user-data.

**Answer:** C

**해설:**

> **문제:** CloudFormation으로 3티어 웹 애플리케이션을 배포할 때, API 자격증명을 노출하지 않고 DynamoDB 테이블에 접근하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 필요한 권한의 IAM 역할을 생성하고 인스턴스 프로필을 참조하여 역할을 인스턴스에 연결한다. |
| B | 파라미터 섹션에서 사용자가 IAM 사용자의 액세스/시크릿 키를 입력하게 한다. |
| C | 필요한 권한의 IAM 역할을 생성하고 인스턴스 프로필 속성에서 역할을 참조한다. |
| D | CloudFormation 템플릿에서 IAM 사용자를 생성하고 GetAtt로 키를 가져와 user-data로 전달한다. |

**(A)** : 올바른 방향이지만 C가 더 정확한 CloudFormation 구현 방법을 설명합니다. → [📖 올바른 방향이지만 C가 더 정확한 CloudFormation 구현 방법을 설명합니다.](/section/28-other-services#aws-cloudformation)

**(B)** : 자격증명을 직접 입력받는 것은 보안상 좋지 않습니다. → [📖 자격증명을 직접 입력받는 것은 보안상 좋지 않습니다.](/section/02-iam#iam-roles-역할)

**(C) 정답** : CloudFormation 템플릿에서 IAM 역할을 정의하고, EC2 인스턴스 리소스의 `IamInstanceProfile` 속성에 해당 역할을 참조하는 것이 API 자격증명 노출 없이 DynamoDB에 접근하는 올바른 방법입니다. → [📖 CloudFormation 템플릿에서 IAM 역할을 정의하고, EC2 인스턴스 리소스의 `IamInstanceProfile` 속성에 해당 역할을...](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(D)** : user-data로 자격증명을 전달하는 것은 보안상 취약합니다. → [📖 user-data로 자격증명을 전달하는 것은 보안상 취약합니다.](/section/02-iam#iam-roles-역할)

**핵심 개념:** CloudFormation에서 IAM 역할과 인스턴스 프로필을 사용한 보안적 DynamoDB 접근

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [AWS CloudFormation](/section/28-other-services#aws-cloudformation), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q325. In an experiment, if the minimum size for an Auto Scaling group is 1 instance, which of the following statements holds true when you terminate the running instance?

**Options:**
- A) Auto Scaling must launch a new instance to replace it.
- B) Auto Scaling will raise an alarm and send a notification to the user for action.
- C) Auto Scaling must configure the schedule activity that terminates the instance after 5 days.
- D) Auto Scaling will terminate the experiment.

**Answer:** A

**해설:**

> **문제:** Auto Scaling 그룹의 최소 크기가 1 인스턴스일 때, 실행 중인 인스턴스를 종료하면 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | Auto Scaling은 새 인스턴스를 시작하여 대체해야 합니다. |
| B | Auto Scaling이 알람을 발생시키고 사용자에게 조치 알림을 보냅니다. |
| C | Auto Scaling이 5일 후 인스턴스를 종료하는 예약 활동을 구성합니다. |
| D | Auto Scaling이 실험을 종료합니다. |

**(A) 정답** : Auto Scaling 그룹의 최소 크기가 1인 경우, 인스턴스가 종료되면 Auto Scaling은 즉시 최소 용량을 유지하기 위해 새 인스턴스를 시작합니다. → [📖 Auto Scaling 그룹의 최소 크기가 1인 경우, 인스턴스가 종료되면 Auto Scaling은 즉시 최소 용량을 유지하기 위해 새 인스턴스...](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(B)** : 단순 알람 발송이 아니라 자동으로 새 인스턴스를 시작합니다. → [📖 단순 알람 발송이 아니라 자동으로 새 인스턴스를 시작합니다.](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(C)** : 5일 예약 종료는 Auto Scaling의 기본 동작이 아닙니다. → [📖 5일 예약 종료는 Auto Scaling의 기본 동작이 아닙니다.](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(D)** : 의미 없는 선택지입니다.

**핵심 개념:** Auto Scaling 최소 용량 유지 — 인스턴스 종료 시 자동 대체 시작

**관련 노트:** [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q326. True or False: Manually created DB Snapshots are deleted after the DB Instance is deleted.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** 참/거짓: 수동으로 생성한 DB 스냅샷은 DB 인스턴스가 삭제된 후에 삭제됩니다.

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : 이 문제의 정답은 True(참)로 표시되어 있지만, 실제 AWS 동작은 반대입니다. 수동으로 생성한 DB 스냅샷은 DB 인스턴스가 삭제되어도 유지됩니다. 자동 백업만 인스턴스 삭제 시 함께 삭제됩니다. 시험 출제 맥락에 따라 정답을 확인하시기 바랍니다. → [📖 이 문제의 정답은 True(참)로 표시되어 있지만, 실제 AWS 동작은 반대입니다. 수동으로 생성한 DB 스냅샷은 DB 인스턴스가 삭제되어도 유...](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(B)** : 실제로는 False가 맞지만, 이 문제 세트의 정답은 A(True)로 표시되어 있습니다. → [📖 실제로는 False가 맞지만, 이 문제 세트의 정답은 A(True)로 표시되어 있습니다.](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**핵심 개념:** RDS 스냅샷 수명주기 — 수동 스냅샷은 인스턴스 삭제 후에도 유지(실제 AWS 동작)

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q327. Amazon S3 doesn't automatically give a user who creates [...] permission to perform other actions on that bucket or object.

**Options:**
- A) a file.
- B) a bucket or object.
- C) a bucket or file.
- D) a object or file.

**Answer:** B

**해설:**

> **문제:** Amazon S3는 [...]를 생성한 사용자에게 해당 버킷이나 객체에 대한 다른 작업을 수행할 권한을 자동으로 부여하지 않습니다.

| 선지 | 번역 |
|------|------|
| A | 파일. |
| B | 버킷 또는 객체. |
| C | 버킷 또는 파일. |
| D | 객체 또는 파일. |

**(A)** : S3는 '파일' 개념을 사용하지 않고 '객체'를 사용합니다. → [📖 S3는 '파일' 개념을 사용하지 않고 '객체'를 사용합니다.](/section/10-amazon-s3#s3-객체-object)

**(B) 정답** : S3에서 버킷이나 객체를 생성한 사용자도 해당 리소스에 대한 다른 작업(예: 삭제, 수정)을 수행하려면 명시적인 권한이 필요합니다. S3는 기본적으로 최소 권한 원칙을 따릅니다. → [📖 S3에서 버킷이나 객체를 생성한 사용자도 해당 리소스에 대한 다른 작업(예: 삭제, 수정)을 수행하려면 명시적인 권한이 필요합니다. S3는 기본...](/section/10-amazon-s3#s3-객체-object)

**(C)** : S3는 '파일'이 아닌 '객체' 용어를 사용합니다. → [📖 S3는 '파일'이 아닌 '객체' 용어를 사용합니다.](/section/10-amazon-s3#s3-객체-object)

**(D)** : S3는 '파일'이 아닌 '객체' 용어를 사용합니다. → [📖 S3는 '파일'이 아닌 '객체' 용어를 사용합니다.](/section/10-amazon-s3#s3-객체-object)

**핵심 개념:** S3 권한 모델 — 최소 권한 원칙, 버킷/객체 생성자의 기본 권한 제한

**관련 노트:** [S3 보안](/section/10-amazon-s3#s3-보안), [S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy)

---

### Q328. A company wants to review the security requirements of Glacier. Which of the below mentioned statements is true with respect to the AWS Glacier data security?

**Options:**
- A) All data stored on Glacier is protected with AES-256 serverside encryption.
- B) All data stored on Glacier is protected with AES-128 serverside encryption.
- C) The user can set the serverside encryption flag to encrypt the data stored on Glacier.
- D) The data stored on Glacier is not encrypted by default.

**Answer:** A

**해설:**

> **문제:** AWS Glacier 데이터 보안에 관해 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | Glacier에 저장된 모든 데이터는 AES-256 서버 사이드 암호화로 보호됩니다. |
| B | Glacier에 저장된 모든 데이터는 AES-128 서버 사이드 암호화로 보호됩니다. |
| C | 사용자가 서버 사이드 암호화 플래그를 설정하여 데이터를 암호화할 수 있습니다. |
| D | Glacier에 저장된 데이터는 기본적으로 암호화되지 않습니다. |

**(A) 정답** : Amazon Glacier(현 S3 Glacier)는 기본적으로 AES-256을 사용하여 모든 데이터를 서버 사이드 암호화합니다. 별도 설정 없이 자동으로 암호화됩니다. → [📖 Amazon Glacier(현 S3 Glacier)는 기본적으로 AES-256을 사용하여 모든 데이터를 서버 사이드 암호화합니다. 별도 설정 없...](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B)** : AES-128이 아닌 AES-256을 사용합니다. → [📖 AES-128이 아닌 AES-256을 사용합니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(C)** : 사용자가 설정하는 것이 아니라 기본적으로 자동 암호화됩니다. → [📖 사용자가 설정하는 것이 아니라 기본적으로 자동 암호화됩니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : 기본적으로 암호화됩니다.

**핵심 개념:** S3 Glacier 기본 암호화 — AES-256 서버 사이드 암호화 자동 적용

**관련 노트:** [S3 객체 암호화 - 4가지 방법](/section/12-s3-security#s3-객체-암호화-4가지-방법), [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

---

### Q329. What does Amazon EBS stand for?

**Options:**
- A) Elastic Block Storage.
- B) Elastic Business Server.
- C) Elastic Blade Server.
- D) Elastic Block Store.

**Answer:** D

**해설:**

> **문제:** Amazon EBS의 풀네임은?

| 선지 | 번역 |
|------|------|
| A | Elastic Block Storage. |
| B | Elastic Business Server. |
| C | Elastic Blade Server. |
| D | Elastic Block Store. |

**(A)** : 'Storage'가 아닌 'Store'입니다.

**(B)** : 존재하지 않는 서비스입니다.

**(C)** : 존재하지 않는 서비스입니다.

**(D) 정답** : EBS는 Elastic Block Store의 약자입니다. → [📖 EBS는 Elastic Block Store의 약자입니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** AWS 서비스 명칭 — EBS = Elastic Block Store

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q330. You have a distributed application that periodically processes large volumes of data across multiple Amazon EC2 Instances. The application is designed to recover gracefully from Amazon EC2 instance failures. You are required to accomplish this task in the most cost-effective way. Which of the following will meet your requirements?

**Options:**
- A) Spot Instances.
- B) Reserved instances.
- C) Dedicated instances.
- D) On-Demand instances.

**Answer:** A

**해설:**

> **문제:** 여러 EC2 인스턴스에서 대용량 데이터를 주기적으로 처리하는 분산 애플리케이션이 있습니다. 이 앱은 EC2 인스턴스 실패로부터 정상적으로 복구할 수 있도록 설계되어 있습니다. 가장 비용 효율적인 방법은?

| 선지 | 번역 |
|------|------|
| A | 스팟 인스턴스. |
| B | 예약 인스턴스. |
| C | 전용 인스턴스. |
| D | 온디맨드 인스턴스. |

**(A) 정답** : 애플리케이션이 인스턴스 실패로부터 복구할 수 있도록 설계되어 있으므로, 가장 저렴한 스팟 인스턴스가 적합합니다. 스팟 인스턴스는 온디맨드 대비 최대 90% 저렴하며, 중단 가능한 워크로드에 이상적입니다. → [📖 애플리케이션이 인스턴스 실패로부터 복구할 수 있도록 설계되어 있으므로, 가장 저렴한 스팟 인스턴스가 적합합니다. 스팟 인스턴스는 온디맨드 대비 ...](/section/03-ec2-basics#spot-instance-상세)

**(B)** : 예약 인스턴스는 지속적인 워크로드에 적합하며, 주기적 처리에는 스팟보다 비용 효율적이지 않을 수 있습니다. → [📖 예약 인스턴스는 지속적인 워크로드에 적합하며, 주기적 처리에는 스팟보다 비용 효율적이지 않을 수 있습니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : 전용 인스턴스는 규정 준수가 필요할 때 사용하며 비용이 더 높습니다. → [📖 전용 인스턴스는 규정 준수가 필요할 때 사용하며 비용이 더 높습니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(D)** : 온디맨드는 스팟보다 비용이 높습니다. → [📖 온디맨드는 스팟보다 비용이 높습니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** 스팟 인스턴스 — 내결함성 분산 애플리케이션의 비용 최적화 옵션

**관련 노트:** [Spot Instance 상세](/section/03-ec2-basics#spot-instance-상세), [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q331. What does Amazon SWF stand for?

**Options:**
- A) Simple Web Flow.
- B) Simple Work Flow.
- C) Simple Wireless Forms.
- D) Simple Web Form.

**Answer:** B

**해설:**

> **문제:** Amazon SWF의 풀네임은?

| 선지 | 번역 |
|------|------|
| A | Simple Web Flow. |
| B | Simple Work Flow. |
| C | Simple Wireless Forms. |
| D | Simple Web Form. |

**(A)** : 'Web Flow'가 아닙니다.

**(B) 정답** : SWF는 Simple WorkFlow의 약자로, 분산 애플리케이션의 워크플로 조정을 위한 서비스입니다. → [📖 SWF는 Simple WorkFlow의 약자로, 분산 애플리케이션의 워크플로 조정을 위한 서비스입니다.](/section/17-serverless-overview#aws-step-functions)

**(C)** : 존재하지 않는 서비스입니다.

**(D)** : 존재하지 않는 서비스입니다.

**핵심 개념:** AWS 서비스 명칭 — SWF = Simple WorkFlow

**관련 노트:** [AWS Step Functions](/section/17-serverless-overview#aws-step-functions)

---

### Q332. Can you specify the security group that you created for a VPC when you launch an instance in EC2-Classic?

**Options:**
- A) No, you can specify the security group created for EC2-Classic when you launch a VPC instance.
- B) Yes.
- C) No.
- D) No, you can specify the security group created for EC2-Classic to a non-VPC based instance only.

**Answer:** C

**해설:**

> **문제:** EC2-Classic에서 인스턴스를 시작할 때 VPC용으로 생성한 보안 그룹을 지정할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 아니요, EC2-Classic용 보안 그룹은 VPC 인스턴스 시작 시 지정할 수 있습니다. |
| B | 예. |
| C | 아니요. |
| D | 아니요, EC2-Classic용 보안 그룹은 비VPC 인스턴스에만 지정 가능합니다. |

**(A)** : 역으로도 마찬가지로 교차 사용이 불가합니다. → [📖 역으로도 마찬가지로 교차 사용이 불가합니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 불가합니다.

**(C) 정답** : VPC 보안 그룹과 EC2-Classic 보안 그룹은 서로 다른 범위를 가집니다. EC2-Classic 인스턴스에 VPC 보안 그룹을 지정할 수 없으며, 반대도 마찬가지입니다. → [📖 VPC 보안 그룹과 EC2-Classic 보안 그룹은 서로 다른 범위를 가집니다. EC2-Classic 인스턴스에 VPC 보안 그룹을 지정할 수...](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 잘못된 설명입니다.

**핵심 개념:** EC2-Classic과 VPC 보안 그룹의 범위 분리 — 교차 사용 불가

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

---

### Q333. Which two methods increases the fault tolerance of the connection to VPC-1? (Choose 2 answers)

**Options:**
- A) Establish a hardware VPN over the internet between VPC-2 and the on-premises network.
- B) Establish a hardware VPN over the internet between VPC-1 and the on-premises network.
- C) Establish a new AWS Direct Connect connection and private virtual interface in the same region as VPC-2.
- D) Establish a new AWS Direct Connect connection and private virtual interface in a different AWS region than VPC-1.
- E) Establish a new AWS Direct Connect connection and private virtual interface in the same AWS region as VPC-1.

**Answer:** B, E

**해설:**

> **문제:** VPC-1에 대한 연결의 내결함성을 높이는 두 가지 방법은?

| 선지 | 번역 |
|------|------|
| A | VPC-2와 온프레미스 네트워크 사이에 인터넷을 통한 하드웨어 VPN을 구성한다. |
| B | VPC-1과 온프레미스 네트워크 사이에 인터넷을 통한 하드웨어 VPN을 구성한다. |
| C | VPC-2와 같은 리전에 새 Direct Connect 연결과 프라이빗 가상 인터페이스를 구성한다. |
| D | VPC-1과 다른 AWS 리전에 새 Direct Connect 연결과 프라이빗 가상 인터페이스를 구성한다. |
| E | VPC-1과 같은 AWS 리전에 새 Direct Connect 연결과 프라이빗 가상 인터페이스를 구성한다. |

**(A)** : VPC-2에 대한 연결로 VPC-1의 내결함성과 직접 관련이 없습니다. → [📖 VPC-2에 대한 연결로 VPC-1의 내결함성과 직접 관련이 없습니다.](/section/25-vpc#vpc-전체-구조)

**(B) 정답** : VPC-1과 온프레미스 간 VPN을 추가로 구성하면 기존 Direct Connect 장애 시 백업 연결로 사용할 수 있어 내결함성이 높아집니다. → [📖 VPC-1과 온프레미스 간 VPN을 추가로 구성하면 기존 Direct Connect 장애 시 백업 연결로 사용할 수 있어 내결함성이 높아집니다.](/section/25-vpc#direct-connect-dx)

**(C)** : VPC-2 리전의 연결은 VPC-1의 내결함성과 무관합니다. → [📖 VPC-2 리전의 연결은 VPC-1의 내결함성과 무관합니다.](/section/25-vpc#vpc-전체-구조)

**(D)** : 다른 리전의 Direct Connect는 VPC-1 연결의 내결함성을 높이지 않습니다. → [📖 다른 리전의 Direct Connect는 VPC-1 연결의 내결함성을 높이지 않습니다.](/section/25-vpc#direct-connect-dx)

**(E) 정답** : VPC-1과 같은 리전에 추가 Direct Connect 연결을 구성하면 기존 연결 장애 시 이중화가 가능하여 내결함성이 높아집니다. → [📖 VPC-1과 같은 리전에 추가 Direct Connect 연결을 구성하면 기존 연결 장애 시 이중화가 가능하여 내결함성이 높아집니다.](/section/25-vpc#direct-connect-dx)

**핵심 개념:** 하이브리드 연결 이중화 — Direct Connect + VPN 백업으로 내결함성 향상

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

---

### Q334. How would you improve page load times for your users? (Choose 3 answers)

**Options:**
- A) Lower the scale up trigger of your Auto Scaling group to 30% so it scales more aggressively.
- B) Add an Amazon ElastiCache caching layer to your application for storing sessions and frequent DB queries.
- C) Configure Amazon CloudFront dynamic content support to enable caching of re-usable content from your site.
- D) Switch Amazon RDS database to the high memory extra large Instance type.
- E) Set up a second installation in another region, and use the Amazon Route 53 latency-based routing feature to select the right region.

**Answer:** B, C, D

**해설:**

> **문제:** 사용자의 페이지 로드 시간을 개선하는 방법 3가지는?

| 선지 | 번역 |
|------|------|
| A | Auto Scaling 그룹의 스케일업 트리거를 30%로 낮춰 더 적극적으로 스케일링한다. |
| B | 세션과 빈번한 DB 쿼리를 저장하기 위해 ElastiCache 캐싱 레이어를 추가한다. |
| C | CloudFront의 동적 콘텐츠 지원을 구성하여 재사용 가능한 콘텐츠를 캐싱한다. |
| D | Amazon RDS 데이터베이스를 high memory extra large 인스턴스 유형으로 변경한다. |
| E | 다른 리전에 두 번째 설치를 하고 Route 53 지연 시간 기반 라우팅을 사용한다. |

**(A)** : 더 적극적인 스케일링은 인스턴스 준비 시간이 필요하므로 즉각적인 페이지 로드 시간 개선과 직접 관련이 없습니다. → [📖 더 적극적인 스케일링은 인스턴스 준비 시간이 필요하므로 즉각적인 페이지 로드 시간 개선과 직접 관련이 없습니다.](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(B) 정답** : ElastiCache는 DB 쿼리 결과와 세션을 메모리에 캐싱하여 DB 부하를 줄이고 응답 시간을 단축합니다. → [📖 ElastiCache는 DB 쿼리 결과와 세션을 메모리에 캐싱하여 DB 부하를 줄이고 응답 시간을 단축합니다.](/section/07-rds-aurora-elasticache#elasticache-캐싱-패턴)

**(C) 정답** : CloudFront를 통해 정적/동적 콘텐츠를 엣지 로케이션에서 제공하면 지연 시간이 크게 감소합니다. → [📖 CloudFront를 통해 정적/동적 콘텐츠를 엣지 로케이션에서 제공하면 지연 시간이 크게 감소합니다.](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D) 정답** : DB 인스턴스 유형을 업그레이드하면 쿼리 처리 속도가 향상되어 전반적인 페이지 로드 시간이 개선됩니다. → [📖 DB 인스턴스 유형을 업그레이드하면 쿼리 처리 속도가 향상되어 전반적인 페이지 로드 시간이 개선됩니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(E)** : 다중 리전 설정은 복잡성이 높고, Route 53 지연 시간 라우팅만으로는 즉각적인 페이지 속도 개선이 어렵습니다. → [📖 다중 리전 설정은 복잡성이 높고, Route 53 지연 시간 라우팅만으로는 즉각적인 페이지 속도 개선이 어렵습니다.](/section/08-route-53#라우팅-정책-routing-policies)

**핵심 개념:** 웹 애플리케이션 성능 최적화 — ElastiCache 캐싱, CloudFront CDN, DB 인스턴스 업그레이드

**관련 노트:** [ElastiCache 아키텍처 패턴](/section/07-rds-aurora-elasticache#elasticache-아키텍처-패턴), [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념), [Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache)

---

### Q335. Typically, you want your application to check whether a request generated an error before you spend any time processing results. The easiest way to find out if an error occurred is to look for an [...] node in the response from the Amazon RDS API.

**Options:**
- A) incorrect.
- B) error.

**Answer:** B

**해설:**

> **문제:** Amazon RDS API 응답에서 오류를 확인하는 가장 쉬운 방법은 응답에서 [...] 노드를 찾는 것입니다.

| 선지 | 번역 |
|------|------|
| A | incorrect 노드. |
| B | error 노드. |

**(A)** : 'incorrect'는 RDS API 오류 응답의 표준 노드 이름이 아닙니다. → [📖 'incorrect'는 RDS API 오류 응답의 표준 노드 이름이 아닙니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B) 정답** : Amazon RDS API 응답에서 오류가 발생했는지 확인하는 가장 쉬운 방법은 응답에서 `Error` 노드를 찾는 것입니다. → [📖 Amazon RDS API 응답에서 오류가 발생했는지 확인하는 가장 쉬운 방법은 응답에서 `Error` 노드를 찾는 것입니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS API 오류 처리 — 응답의 Error 노드 확인

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q336. Through which of the following interfaces is AWS Identity and Access Management available? A. AWS Management Console. B. Command line interface (CLI). C. IAM Query API. D. Existing libraries.

**Options:**
- A) Only through Command line interface (CLI).
- B) A, B and C.
- C) A and C.
- D) All of the above.

**Answer:** D

**해설:**

> **문제:** AWS IAM은 다음 중 어떤 인터페이스를 통해 사용할 수 있습니까? A. AWS Management Console, B. CLI, C. IAM Query API, D. 기존 라이브러리.

| 선지 | 번역 |
|------|------|
| A | CLI를 통해서만. |
| B | A, B, C. |
| C | A와 C만. |
| D | 위의 모두. |

**(A)** : CLI만이 아닌 여러 인터페이스를 지원합니다. → [📖 CLI만이 아닌 여러 인터페이스를 지원합니다.](/section/02-iam#aws-접근-방법)

**(B)** : 기존 라이브러리(SDK)도 포함되어야 합니다. → [📖 기존 라이브러리(SDK)도 포함되어야 합니다.](/section/02-iam#aws-접근-방법)

**(C)** : CLI와 라이브러리도 지원합니다. → [📖 CLI와 라이브러리도 지원합니다.](/section/02-iam#aws-접근-방법)

**(D) 정답** : AWS IAM은 Management Console, CLI, IAM Query API, 그리고 AWS SDK(기존 라이브러리)를 통해 모두 사용할 수 있습니다. → [📖 AWS IAM은 Management Console, CLI, IAM Query API, 그리고 AWS SDK(기존 라이브러리)를 통해 모두 사용...](/section/02-iam#핵심-개념)

**핵심 개념:** IAM 접근 방법 — Console, CLI, API, SDK 모두 지원

**관련 노트:** [AWS 접근 방법](/section/02-iam#aws-접근-방법)

---

### Q337. A [...] is a storage device that moves data in sequences of bytes or bits (blocks).

**Options:**
- A) block map.
- B) storage block.
- C) mapping device.
- D) block device.

**Answer:** D

**해설:**

> **문제:** [...]는 데이터를 바이트나 비트의 시퀀스(블록)로 이동시키는 스토리지 장치입니다.

| 선지 | 번역 |
|------|------|
| A | block map. |
| B | storage block. |
| C | mapping device. |
| D | block device. |

**(A)** : 블록 맵은 데이터 매핑 구조를 의미하며 스토리지 장치 유형이 아닙니다.

**(B)** : 일반적인 용어로 정확한 기술 용어가 아닙니다.

**(C)** : 존재하지 않는 표준 용어입니다.

**(D) 정답** : Block Device는 데이터를 고정 크기 블록 단위로 읽고 쓰는 스토리지 장치입니다. EBS가 대표적인 블록 디바이스입니다. → [📖 Block Device는 데이터를 고정 크기 블록 단위로 읽고 쓰는 스토리지 장치입니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** 블록 디바이스 — 블록 단위 데이터 이동 스토리지 장치 (EBS 기반 개념)

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q338. You have just finished setting up an advertisement server in which one of the obvious choices for a service was Amazon Elastic MapReduce(EMR) and are now troubleshooting some weird cluster states that you are seeing. Which of the below is not an Amazon EMR cluster state?

**Options:**
- A) STARTING.
- B) STOPPED.
- C) RUNNING.
- D) WAITING.

**Answer:** B

**해설:**

> **문제:** Amazon EMR 클러스터 상태가 아닌 것은?

| 선지 | 번역 |
|------|------|
| A | STARTING (시작 중). |
| B | STOPPED (중지됨). |
| C | RUNNING (실행 중). |
| D | WAITING (대기 중). |

**(A)** : STARTING은 유효한 EMR 클러스터 상태입니다. → [📖 STARTING은 유효한 EMR 클러스터 상태입니다.](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(B) 정답** : STOPPED는 Amazon EMR 클러스터의 유효한 상태가 아닙니다. EMR 클러스터 상태는 STARTING, BOOTSTRAPPING, RUNNING, WAITING, TERMINATING, TERMINATED, TERMINATED_WITH_ERRORS 등이 있습니다. → [📖 STOPPED는 Amazon EMR 클러스터의 유효한 상태가 아닙니다. EMR 클러스터 상태는 STARTING, BOOTSTRAPPING, RU...](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(C)** : RUNNING은 유효한 EMR 클러스터 상태입니다. → [📖 RUNNING은 유효한 EMR 클러스터 상태입니다.](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(D)** : WAITING은 유효한 EMR 클러스터 상태입니다. → [📖 WAITING은 유효한 EMR 클러스터 상태입니다.](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**핵심 개념:** Amazon EMR 클러스터 상태 목록 — STOPPED는 유효하지 않은 상태

**관련 노트:** [Amazon EMR Elastic MapReduce](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

---

### Q339. A US-based company is expanding their web presence into Europe. The company wants to extend their AWS infrastructure from Northern Virginia (us-east-1) into the Dublin (eu-west-1) region. Which of the following options would enable an equivalent experience for users on both continents?

**Options:**
- A) Use a public-facing load balancer per region to load-balance web traffic, and enable HTTP health checks.
- B) Use a public-facing load balancer per region to load-balance web traffic, and enable sticky sessions.
- C) Use Amazon Route 53, and apply a geolocation routing policy to distribute traffic across both regions.
- D) Use Amazon Route 53, and apply a weighted routing policy to distribute traffic across both regions.

**Answer:** D

**해설:**

> **문제:** 미국 기반 회사가 유럽으로 확장합니다. 두 대륙 사용자 모두에게 동등한 경험을 제공하려면?

| 선지 | 번역 |
|------|------|
| A | 리전별 공개 로드 밸런서를 사용하고 HTTP 헬스 체크를 활성화한다. |
| B | 리전별 공개 로드 밸런서를 사용하고 스티키 세션을 활성화한다. |
| C | Route 53을 사용하고 지리적 위치 라우팅 정책을 적용한다. |
| D | Route 53을 사용하고 가중치 기반 라우팅 정책을 적용한다. |

**(A)** : 리전 간 로드 밸런서만으로는 지역별 최적 라우팅이 이루어지지 않습니다. → [📖 리전 간 로드 밸런서만으로는 지역별 최적 라우팅이 이루어지지 않습니다.](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B)** : 스티키 세션은 단일 리전 내에서 유용하지만 글로벌 배포 목적에는 맞지 않습니다. → [📖 스티키 세션은 단일 리전 내에서 유용하지만 글로벌 배포 목적에는 맞지 않습니다.](/section/06-high-availability-scalability#sticky-sessions-session-affinity)

**(C)** : 지리적 위치 라우팅은 특정 지역 사용자를 특정 리전으로 고정합니다. 동등한 경험을 위해서는 두 리전 모두 트래픽을 분산해야 합니다. → [📖 지리적 위치 라우팅은 특정 지역 사용자를 특정 리전으로 고정합니다.](/section/08-route-53#라우팅-정책-routing-policies)

**(D) 정답** : 가중치 기반 라우팅을 사용하면 두 리전에 동등하게 트래픽을 분산(예: 50/50)하여 두 대륙의 사용자 모두에게 동등한 경험을 제공할 수 있습니다. → [📖 가중치 기반 라우팅을 사용하면 두 리전에 동등하게 트래픽을 분산할 수 있습니다.](/section/08-route-53#라우팅-정책-routing-policies)

**핵심 개념:** Route 53 라우팅 정책 — 가중치 기반 라우팅을 통한 다중 리전 트래픽 분산

**관련 노트:** [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies), [Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크)

---

### Q340. You are building infrastructure for a data warehousing solution and an extra request has come through that there will be a lot of business reporting queries running all the time and you are not sure if your current DB instance will be able to handle it. What would be the best solution for this?

**Options:**
- A) DB Parameter Groups.
- B) Read Replicas.
- C) Multi-AZ DB Instance deployment.
- D) Database Snapshots.

**Answer:** B

**해설:**

> **문제:** 데이터 웨어하우징 솔루션에서 많은 비즈니스 보고 쿼리가 지속적으로 실행될 예정입니다. 현재 DB 인스턴스가 이를 처리할 수 있을지 불확실합니다. 가장 좋은 해결책은?

| 선지 | 번역 |
|------|------|
| A | DB 파라미터 그룹. |
| B | 읽기 전용 복제본(Read Replicas). |
| C | Multi-AZ DB 인스턴스 배포. |
| D | 데이터베이스 스냅샷. |

**(A)** : 파라미터 그룹은 DB 설정을 조정하지만 읽기 부하를 분산하지는 않습니다. → [📖 파라미터 그룹은 DB 설정을 조정하지만 읽기 부하를 분산하지는 않습니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B) 정답** : Read Replica를 생성하면 보고 쿼리를 복제본으로 분산하여 프라이머리 인스턴스의 부하를 줄일 수 있습니다. 읽기 위주의 보고 워크로드에 이상적입니다. → [📖 Read Replica를 생성하면 보고 쿼리를 복제본으로 분산하여 프라이머리 인스턴스의 부하를 줄일 수 있습니다. 읽기 위주의 보고 워크로드에 ...](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(C)** : Multi-AZ는 고가용성을 위한 것으로 읽기 성능 향상이 아닙니다. → [📖 Multi-AZ는 고가용성을 위한 것으로 읽기 성능 향상이 아닙니다.](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(D)** : 스냅샷은 백업 목적으로 쿼리 부하 처리와 무관합니다. → [📖 스냅샷은 백업 목적으로 쿼리 부하 처리와 무관합니다.](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**핵심 개념:** RDS Read Replica — 읽기 쿼리 부하 분산을 통한 보고/분석 워크로드 처리

**관련 노트:** [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

---

### Q341. One of the criteria for a new deployment is that the customer wants to use AWS Storage Gateway. However you are not sure whether you should use gateway-cached volumes or gateway-stored volumes or even what the differences are. Which statement below best describes those differences?

**Options:**
- A) Gateway-cached lets you store your data in Amazon Simple Storage Service (Amazon S3) and retain a copy of frequently accessed data subsets locally. Gateway-stored enables you to configure your on-premises gateway to store all your data locally and then asynchronously back up point-in-time snapshots of this data to Amazon S3.
- B) Gateway-cached is free whilst gateway-stored is not.
- C) Gateway-cached is up to 10 times faster than gateway-stored.
- D) Gateway-stored lets you store your data in Amazon Simple Storage Service (Amazon S3) and retain a copy of frequently accessed data subsets locally. Gateway-cached enables you to configure your on-premises gateway to store all your data locally and then asynchronously back up point-in-time snapshots of this data to Amazon S3.

**Answer:** A

**해설:**

> **문제:** AWS Storage Gateway의 gateway-cached 볼륨과 gateway-stored 볼륨의 차이를 가장 잘 설명하는 것은?

| 선지 | 번역 |
|------|------|
| A | Gateway-cached는 데이터를 S3에 저장하고 자주 접근하는 데이터 하위 집합의 복사본을 로컬에 유지합니다. Gateway-stored는 모든 데이터를 로컬에 저장하고 비동기적으로 S3에 스냅샷을 백업합니다. |
| B | Gateway-cached는 무료이고 gateway-stored는 유료입니다. |
| C | Gateway-cached가 gateway-stored보다 최대 10배 빠릅니다. |
| D | Gateway-stored가 데이터를 S3에 저장하고 로컬에 복사본을 유지합니다. Gateway-cached가 모든 데이터를 로컬에 저장합니다. (A의 반대) |

**(A) 정답** : 정확한 설명입니다. Gateway-cached는 주 스토리지가 S3이고 자주 접근하는 데이터만 로컬 캐시에 유지합니다. Gateway-stored는 주 스토리지가 로컬이고 S3는 비동기 백업 용도입니다. → [📖 정확한 설명입니다. Gateway-cached는 주 스토리지가 S3이고 자주 접근하는 데이터만 로컬 캐시에 유지합니다. Gateway-store...](/section/14-storage-extras#aws-storage-gateway)

**(B)** : 가격 차이에 대한 잘못된 설명입니다. → [📖 가격 차이에 대한 잘못된 설명입니다.](/section/14-storage-extras#aws-storage-gateway)

**(C)** : 속도 차이에 대한 근거 없는 설명입니다. → [📖 속도 차이에 대한 근거 없는 설명입니다.](/section/14-storage-extras#aws-storage-gateway)

**(D)** : A의 설명을 반대로 뒤집은 잘못된 설명입니다. → [📖 A의 설명을 반대로 뒤집은 잘못된 설명입니다.](/section/14-storage-extras#aws-storage-gateway)

**핵심 개념:** Storage Gateway 볼륨 유형 — Cached(S3 주 스토리지 + 로컬 캐시) vs Stored(로컬 주 스토리지 + S3 백업)

**관련 노트:** [AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

---

### Q342. In Amazon RDS, security groups are ideally used to:

**Options:**
- A) Define maintenance period for database engines.
- B) Launch Amazon RDS instances in a subnet.
- C) Create, describe, modify, and delete DB instances.
- D) Control what IP addresses or EC2 instances can connect to your databases on a DB instance.

**Answer:** D

**해설:**

> **문제:** Amazon RDS에서 보안 그룹은 이상적으로 어떤 목적으로 사용됩니까?

| 선지 | 번역 |
|------|------|
| A | 데이터베이스 엔진의 유지 관리 기간을 정의한다. |
| B | 서브넷에서 Amazon RDS 인스턴스를 시작한다. |
| C | DB 인스턴스를 생성, 설명, 수정, 삭제한다. |
| D | DB 인스턴스의 데이터베이스에 연결할 수 있는 IP 주소나 EC2 인스턴스를 제어한다. |

**(A)** : 유지 관리 기간은 보안 그룹이 아닌 DB 인스턴스 설정에서 정의합니다. → [📖 유지 관리 기간은 보안 그룹이 아닌 DB 인스턴스 설정에서 정의합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : 서브넷 시작은 서브넷 그룹(DB Subnet Group)에서 관리합니다. → [📖 서브넷 시작은 서브넷 그룹(DB Subnet Group)에서 관리합니다.](/section/25-vpc#서브넷-subnet)

**(C)** : DB 인스턴스 관리는 RDS API/콘솔을 통해 수행합니다. → [📖 DB 인스턴스 관리는 RDS API/콘솔을 통해 수행합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D) 정답** : RDS 보안 그룹은 어떤 IP 주소나 EC2 인스턴스가 DB 인스턴스에 연결할 수 있는지 제어하는 방화벽 역할을 합니다. → [📖 RDS 보안 그룹은 어떤 IP 주소나 EC2 인스턴스가 DB 인스턴스에 연결할 수 있는지 제어하는 방화벽 역할을 합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS 보안 그룹 — DB 인스턴스 접근을 위한 네트워크 접근 제어

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q343. How long does an AWS free usage tier EC2 last for?

**Options:**
- A) Forever.
- B) 12 Months upon signup.
- C) 1 Month upon signup.
- D) 6 Months upon signup.

**Answer:** B

**해설:**

> **문제:** AWS 프리 티어 EC2는 얼마 동안 사용할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 영구적으로. |
| B | 가입 후 12개월. |
| C | 가입 후 1개월. |
| D | 가입 후 6개월. |

**(A)** : AWS 프리 티어 EC2는 영구적이지 않습니다. → [📖 AWS 프리 티어 EC2는 영구적이지 않습니다.](/section/01-getting-started#aws-역사-및-시장-위치)

**(B) 정답** : AWS 프리 티어는 계정 생성 후 12개월 동안 월 750시간의 t2.micro(또는 t3.micro) EC2 인스턴스를 무료로 사용할 수 있습니다. → [📖 AWS 프리 티어는 계정 생성 후 12개월 동안 월 750시간의 t2.micro(또는 t3.micro) EC2 인스턴스를 무료로 사용할 수 있습...](/section/01-getting-started#aws-역사-및-시장-위치)

**(C)** : 1개월이 아닌 12개월입니다. → [📖 1개월이 아닌 12개월입니다.](/section/01-getting-started#aws-역사-및-시장-위치)

**(D)** : 6개월이 아닌 12개월입니다. → [📖 6개월이 아닌 12개월입니다.](/section/01-getting-started#aws-역사-및-시장-위치)

**핵심 개념:** AWS 프리 티어 기간 — 가입 후 12개월간 EC2 t2.micro 월 750시간 무료

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q344. After you recommend Amazon Redshift to a client as an alternative solution to paying data warehouses to analyze his data, your client asks you to explain why you are recommending Redshift. Which of the following would be a reasonable response to his request?

**Options:**
- A) It has high performance at scale as data and query complexity grows.
- B) It prevents reporting and analytic processing from interfering with the performance of OLTP workloads.
- C) You don't have the administrative burden of running your own data warehouse and dealing with setup, durability, monitoring, scaling, and patching.
- D) All answers listed are a reasonable response to his question.

**Answer:** D

**해설:**

> **문제:** 고객에게 Amazon Redshift를 추천한 이유를 설명하라는 요청을 받았습니다. 합리적인 답변은?

| 선지 | 번역 |
|------|------|
| A | 데이터와 쿼리 복잡성이 증가해도 규모에서 높은 성능을 제공합니다. |
| B | 보고 및 분석 처리가 OLTP 워크로드 성능에 영향을 미치지 않도록 합니다. |
| C | 설정, 내구성, 모니터링, 스케일링, 패치 등의 관리 부담이 없습니다. |
| D | 위의 모든 답변이 합리적입니다. |

**(A)** : Redshift의 실제 장점이지만 단독으로는 불완전합니다. → [📖 Redshift의 실제 장점이지만 단독으로는 불완전합니다.](/section/20-data-analytics#amazon-redshift)

**(B)** : Redshift의 실제 장점이지만 단독으로는 불완전합니다. → [📖 Redshift의 실제 장점이지만 단독으로는 불완전합니다.](/section/20-data-analytics#amazon-redshift)

**(C)** : Redshift의 실제 장점이지만 단독으로는 불완전합니다. → [📖 Redshift의 실제 장점이지만 단독으로는 불완전합니다.](/section/20-data-analytics#amazon-redshift)

**(D) 정답** : A, B, C 모두 Amazon Redshift의 실제 장점을 정확하게 설명하고 있으므로 모두 합리적인 답변입니다. → [📖 A, B, C 모두 Amazon Redshift의 실제 장점을 정확하게 설명하고 있으므로 모두 합리적인 답변입니다.](/section/20-data-analytics#amazon-redshift)

**핵심 개념:** Amazon Redshift의 주요 장점 — 고성능, OLTP 분리, 완전 관리형 서비스

**관련 노트:** [Amazon Redshift](/section/20-data-analytics#amazon-redshift)

---

### Q345. You can seamlessly join an EC2 instance to your directory domain. What connectivity do you need to be able to connect remotely to this instance?

**Options:**
- A) You must have IP connectivity to the instance from the network you are connecting from.
- B) You must have the correct encryption keys to connect to the instance remotely.
- C) You must have enough bandwidth to connect to the instance.
- D) You must use MFA authentication to be able to connect to the instance remotely.

**Answer:** A

**해설:**

> **문제:** EC2 인스턴스를 디렉터리 도메인에 가입시킨 경우, 원격으로 연결하기 위해 필요한 연결은?

| 선지 | 번역 |
|------|------|
| A | 연결하는 네트워크에서 인스턴스로의 IP 연결이 있어야 합니다. |
| B | 올바른 암호화 키가 있어야 합니다. |
| C | 충분한 대역폭이 있어야 합니다. |
| D | MFA 인증을 사용해야 합니다. |

**(A) 정답** : 원격으로 EC2 인스턴스에 연결하기 위한 기본 요건은 네트워크 IP 연결성입니다. 인스턴스에 도달할 수 있는 IP 경로가 있어야 합니다. → [📖 원격으로 EC2 인스턴스에 연결하기 위한 기본 요건은 네트워크 IP 연결성입니다.](/section/25-vpc#vpc-기본-사항)

**(B)** : 암호화 키는 SSH 연결에 필요하지만 모든 연결 유형의 전제 조건은 아닙니다. → [📖 암호화 키는 SSH 연결에 필요하지만 모든 연결 유형의 전제 조건은 아닙니다.](/section/03-ec2-basics#ec2-instance-connect)

**(C)** : 대역폭은 연결 품질에 영향을 주지만 연결의 기본 요건은 아닙니다.

**(D)** : MFA는 선택적 보안 강화 방법입니다. → [📖 MFA는 선택적 보안 강화 방법입니다.](/section/02-iam#mfa-multi-factor-authentication)

**핵심 개념:** EC2 원격 연결 기본 요건 — 네트워크 IP 연결성

**관련 노트:** [EC2 Instance Connect](/section/03-ec2-basics#ec2-instance-connect), [Bastion Host](/section/25-vpc#bastion-host)

---

### Q346. Does Amazon DynamoDB support both increment and decrement atomic operations?

**Options:**
- A) Only increment, since decrement are inherently impossible with DynamoDB's data model.
- B) No, neither increment nor decrement operations.
- C) Yes, both increment and decrement operations.
- D) Only decrement, since increment are inherently impossible with DynamoDB's data model.

**Answer:** C

**해설:**

> **문제:** Amazon DynamoDB는 증가(increment)와 감소(decrement) 원자적 연산을 모두 지원합니까?

| 선지 | 번역 |
|------|------|
| A | 증가만 지원합니다. DynamoDB의 데이터 모델에서 감소는 불가능합니다. |
| B | 아니요, 둘 다 지원하지 않습니다. |
| C | 예, 증가와 감소 연산 모두 지원합니다. |
| D | 감소만 지원합니다. 증가는 불가능합니다. |

**(A)** : 감소도 지원합니다.

**(B)** : 두 연산 모두 지원합니다.

**(C) 정답** : DynamoDB는 `ADD` 연산을 통해 원자적 증가와 감소를 모두 지원합니다. 숫자에 양수를 더하면 증가, 음수를 더하면 감소가 됩니다. → [📖 DynamoDB는 `ADD` 연산을 통해 원자적 증가와 감소를 모두 지원합니다. 숫자에 양수를 더하면 증가, 음수를 더하면 감소가 됩니다.](/section/17-serverless-overview#amazon-dynamodb)

**(D)** : 증가도 지원합니다.

**핵심 개념:** DynamoDB 원자적 카운터 연산 — 동시 업데이트 시 증가/감소 지원

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

---

### Q347. You have multiple Amazon EC2 instances running in a cluster across multiple Availability Zones within the same region. What combination of the following should be used to ensure the highest network performance (packets per second), lowest latency, and lowest jitter? (Choose 3 answers)

**Options:**
- A) Amazon EC2 placement groups.
- B) Enhanced networking.
- C) Amazon PV AMI.
- D) Amazon HVM AMI.
- E) Amazon Linux.
- F) Amazon VPC.

**Answer:** A, B, D

**해설:**

> **문제:** 동일 리전 내 여러 AZ에서 실행되는 EC2 인스턴스 클러스터에서 최고의 네트워크 성능(PPS), 최저 지연 시간, 최저 지터를 보장하려면 어떤 조합이 필요합니까?

| 선지 | 번역 |
|------|------|
| A | Amazon EC2 배치 그룹. |
| B | 향상된 네트워킹(Enhanced Networking). |
| C | Amazon PV AMI. |
| D | Amazon HVM AMI. |
| E | Amazon Linux. |
| F | Amazon VPC. |

**(A) 정답** : 배치 그룹은 인스턴스를 물리적으로 가깝게 배치하여 네트워크 지연 시간을 최소화합니다. → [📖 배치 그룹은 인스턴스를 물리적으로 가깝게 배치하여 네트워크 지연 시간을 최소화합니다.](/section/04-ec2-associate#placement-groups-배치-그룹)

**(B) 정답** : Enhanced Networking은 SR-IOV를 사용하여 더 높은 PPS, 낮은 지연 시간, 낮은 지터를 제공합니다. → [📖 Enhanced Networking은 SR-IOV를 사용하여 더 높은 PPS, 낮은 지연 시간, 낮은 지터를 제공합니다.](/section/04-ec2-associate#elastic-network-interface-eni)

**(C)** : PV(Paravirtual) AMI는 향상된 네트워킹을 지원하지 않습니다. → [📖 PV(Paravirtual) AMI는 향상된 네트워킹을 지원하지 않습니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(D) 정답** : HVM(Hardware Virtual Machine) AMI는 Enhanced Networking을 지원하여 최고의 네트워크 성능을 제공합니다. → [📖 HVM(Hardware Virtual Machine) AMI는 Enhanced Networking을 지원하여 최고의 네트워크 성능을 제공합니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(E)** : 특정 OS는 필수 조건이 아닙니다.

**(F)** : VPC는 이미 기본 환경이며 추가 성능 향상 요소가 아닙니다. → [📖 VPC는 이미 기본 환경이며 추가 성능 향상 요소가 아닙니다.](/section/25-vpc#vpc-기본-사항)

**핵심 개념:** EC2 네트워크 성능 최적화 — 배치 그룹 + Enhanced Networking + HVM AMI 조합

**관련 노트:** [Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹), [EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

---

### Q348. If an Amazon EBS volume is the root device of an instance, can I detach it without stopping the instance?

**Options:**
- A) Yes but only if Windows instance.
- B) Yes.
- C) No.
- D) Yes but only if a Linux instance.

**Answer:** C

**해설:**

> **문제:** Amazon EBS 볼륨이 인스턴스의 루트 디바이스인 경우, 인스턴스를 중지하지 않고 분리할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, Windows 인스턴스에서만 가능합니다. |
| B | 예. |
| C | 아니요. |
| D | 예, Linux 인스턴스에서만 가능합니다. |

**(A)** : OS에 관계없이 루트 볼륨은 분리할 수 없습니다. → [📖 OS에 관계없이 루트 볼륨은 분리할 수 없습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : 루트 디바이스는 분리할 수 없습니다. → [📖 루트 디바이스는 분리할 수 없습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C) 정답** : EBS 루트 볼륨은 인스턴스가 실행 중인 동안에는 분리할 수 없습니다. 루트 볼륨을 분리하려면 먼저 인스턴스를 중지해야 합니다. → [📖 EBS 루트 볼륨은 인스턴스가 실행 중인 동안에는 분리할 수 없습니다. 루트 볼륨을 분리하려면 먼저 인스턴스를 중지해야 합니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : OS에 관계없이 루트 볼륨은 분리할 수 없습니다. → [📖 OS에 관계없이 루트 볼륨은 분리할 수 없습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** EBS 루트 볼륨 제약 — 인스턴스 실행 중 루트 볼륨 분리 불가

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

---

### Q349. True or False: When you add a rule to a DB security group, you do not need to specify port number or protocol.

**Options:**
- A) Depends on the ROMS used.
- B) True.
- C) False.

**Answer:** B

**해설:**

> **문제:** 참/거짓: DB 보안 그룹에 규칙을 추가할 때 포트 번호나 프로토콜을 지정할 필요가 없습니다.

| 선지 | 번역 |
|------|------|
| A | 사용하는 ROMS에 따라 다릅니다. |
| B | 참. |
| C | 거짓. |

**(A)** : ROMS는 무관한 개념입니다.

**(B) 정답** : RDS DB 보안 그룹 규칙을 추가할 때는 포트 번호나 프로토콜을 지정할 필요가 없습니다. DB 엔진이 사용하는 포트는 자동으로 적용됩니다. EC2 보안 그룹과의 차이점입니다. → [📖 RDS DB 보안 그룹 규칙을 추가할 때는 포트 번호나 프로토콜을 지정할 필요가 없습니다. DB 엔진이 사용하는 포트는 자동으로 적용됩니다. E...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : 잘못된 선택입니다.

**핵심 개념:** DB 보안 그룹 vs EC2 보안 그룹 — DB 보안 그룹은 포트/프로토콜 지정 불필요

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q350. Before I delete an EBS volume, what can I do if I want to recreate the volume later?

**Options:**
- A) Create a copy of the EBS volume (not a snapshot).
- B) Store a snapshot of the volume.
- C) Download the content to an EC2 instance
- D) Back up the data in to a physical disk.

**Answer:** B

**해설:**

> **문제:** EBS 볼륨을 삭제하기 전에, 나중에 볼륨을 다시 만들고 싶다면 무엇을 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | EBS 볼륨의 복사본을 만든다(스냅샷 아님). |
| B | 볼륨의 스냅샷을 저장한다. |
| C | 콘텐츠를 EC2 인스턴스에 다운로드한다. |
| D | 물리적 디스크에 데이터를 백업한다. |

**(A)** : EBS 볼륨 자체를 복사하는 표준 방법은 스냅샷입니다. → [📖 EBS 볼륨 자체를 복사하는 표준 방법은 스냅샷입니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(B) 정답** : EBS 스냅샷을 S3에 저장하면 나중에 해당 스냅샷으로부터 동일한 볼륨을 복원할 수 있습니다. 이것이 EBS 볼륨 재생성의 표준 방법입니다. → [📖 EBS 스냅샷을 S3에 저장하면 나중에 해당 스냅샷으로부터 동일한 볼륨을 복원할 수 있습니다. 이것이 EBS 볼륨 재생성의 표준 방법입니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(C)** : EC2 인스턴스에 다운로드하는 것은 임시 해결책이며 볼륨 재생성의 표준 방법이 아닙니다. → [📖 EC2 인스턴스에 다운로드하는 것은 임시 해결책이며 볼륨 재생성의 표준 방법이 아닙니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : 물리적 디스크 백업은 AWS 환경의 표준 방법이 아닙니다. → [📖 물리적 디스크 백업은 AWS 환경의 표준 방법이 아닙니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** EBS 스냅샷 — 볼륨 백업 및 복원의 표준 방법, S3에 증분 저장

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---
