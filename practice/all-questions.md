# AWS SAA-C03 Practice Questions

> Total: 216 questions from 30 sections

---

## Getting Started with AWS

---

### Q1. A company is planning to deploy a new application on AWS. The application must comply with local data residency laws that require all data to remain within a specific country. Which factor should the Solutions Architect prioritize when choosing an AWS Region?
**Options:**
- A) Proximity to the development team
- B) Availability of the latest AWS services
- C) Compliance with data governance and legal requirements
- D) Lowest possible pricing for EC2 instances

**Answer:** C

**해설:** 데이터 거버넌스 및 법적 요구사항 준수가 Region 선택의 최우선 기준이다. 데이터가 명시적 허가 없이 리전을 벗어나지 않으므로, 해당 국가에 위치한 리전을 선택해야 한다. 지연 시간, 서비스 가용성, 가격은 중요하지만 법적 요구사항보다 우선하지 않는다.

**핵심 개념:** AWS Region 선택 기준

### Q2. Which of the following AWS services is a Global service, NOT scoped to a specific Region?
**Options:**
- A) Amazon EC2
- B) AWS Lambda
- C) Amazon Route 53
- D) Amazon RDS

**Answer:** C

**해설:** Route 53은 DNS 서비스로 글로벌 서비스이다. IAM, CloudFront, WAF도 글로벌 서비스이다. EC2, Lambda, RDS는 모두 리전 범위의 서비스이다.

**핵심 개념:** 글로벌 서비스 vs 리전 서비스

### Q3. A Solutions Architect needs to design a highly available architecture. What is the minimum number of Availability Zones in any AWS Region?
**Options:**
- A) 1
- B) 2
- C) 3
- D) 6

**Answer:** C

**해설:** 모든 AWS 리전은 최소 3개의 AZ를 가지며, 최대 6개까지 가질 수 있다. 고가용성 설계 시 최소 2개 AZ에 걸쳐 배포하는 것이 권장된다.

**핵심 개념:** Availability Zone

### Q4. What is the primary purpose of AWS Edge Locations?
**Options:**
- A) To host EC2 instances closer to users
- B) To deliver content to end users with lower latency
- C) To provide additional Availability Zones for a Region
- D) To store EBS snapshots for disaster recovery

**Answer:** B

**해설:** Edge Location은 CloudFront CDN의 콘텐츠 캐싱 포인트로, 최종 사용자에게 낮은 지연 시간으로 콘텐츠를 전달하는 것이 주 목적이다. EC2 인스턴스를 호스팅하거나 AZ를 제공하는 것이 아니다.

**핵심 개념:** Edge Location / Points of Presence

### Q5. An application serving users globally is experiencing high latency for users in Asia. The application is currently deployed only in the us-east-1 Region. What is the MOST effective way to reduce latency for Asian users?
**Options:**
- A) Deploy the application in an additional Availability Zone within us-east-1
- B) Use a larger EC2 instance type in us-east-1
- C) Deploy the application in an AWS Region closer to Asian users, such as ap-northeast-1
- D) Increase the number of Edge Locations in us-east-1

**Answer:** C

**해설:** 아시아 사용자의 지연 시간을 줄이려면 물리적으로 가까운 리전(예: ap-northeast-1 도쿄)에 배포해야 한다. 같은 리전 내 AZ 추가나 인스턴스 크기 증가는 지연 시간 개선에 효과가 없다. Edge Location 수는 사용자가 제어할 수 없다.

**핵심 개념:** Region 선택 - Proximity (지연 시간)
---

## IAM (Identity & Access Management)

---

### Q1. A company wants to allow an EC2 instance to access an S3 bucket. What is the MOST secure way to grant this access?
**Options:**
- A) Store AWS access keys in the EC2 instance's environment variables
- B) Attach an IAM Role with appropriate S3 permissions to the EC2 instance
- C) Create an IAM user and hardcode the credentials in the application
- D) Use the root account credentials on the EC2 instance

**Answer:** B

**해설:** EC2 인스턴스에서 AWS 서비스에 접근할 때는 IAM Role을 사용하는 것이 가장 안전하다. Access Key를 환경 변수에 저장하거나 하드코딩하는 것은 보안 위험이 있다. Root 계정은 절대 일반 작업에 사용하면 안 된다.

**핵심 개념:** IAM Roles for Services

### Q2. Which IAM security tool provides a report that lists all IAM users and the status of their various credentials?
**Options:**
- A) IAM Access Advisor
- B) IAM Credentials Report
- C) AWS CloudTrail
- D) AWS Config

**Answer:** B

**해설:** IAM Credentials Report는 계정 수준의 보고서로, 모든 사용자와 자격 증명 상태를 나열한다. IAM Access Advisor는 사용자 수준에서 서비스별 마지막 접근 시간을 보여준다. CloudTrail은 API 호출 감사, Config는 리소스 구성 감사 서비스이다.

**핵심 개념:** IAM Security Tools

### Q3. An IAM user belongs to two groups. Group A has a policy that allows S3 read access, and Group B has a policy that denies all S3 access. What happens when the user tries to read from S3?
**Options:**
- A) The user can read from S3 because Allow takes precedence
- B) The user cannot read from S3 because Deny always takes precedence
- C) The request is evaluated based on which group was created first
- D) The user receives an error because of conflicting policies

**Answer:** B

**해설:** IAM 정책 평가에서 **명시적 Deny는 항상 Allow보다 우선**한다. 사용자가 여러 그룹에서 상충되는 정책을 받더라도, Deny가 있으면 해당 작업은 거부된다.

**핵심 개념:** IAM Policy Evaluation - Deny 우선

### Q4. Which of the following statements about IAM Groups is correct?
**Options:**
- A) Groups can contain other groups for nested permissions
- B) A user must belong to at least one group
- C) Groups can only contain IAM users, not other groups
- D) Groups can contain both users and roles

**Answer:** C

**해설:** IAM 그룹에는 사용자만 포함할 수 있고, 다른 그룹을 중첩할 수 없다. 사용자는 그룹에 속하지 않아도 되며, 여러 그룹에 속할 수 있다. 그룹에는 역할(Role)을 포함할 수 없다.

**핵심 개념:** IAM Users & Groups

### Q5. A Solutions Architect wants to review which AWS services an IAM user has accessed to apply the least privilege principle. Which tool should they use?
**Options:**
- A) IAM Credentials Report
- B) AWS CloudTrail Logs
- C) IAM Access Advisor
- D) AWS Trusted Advisor

**Answer:** C

**해설:** IAM Access Advisor는 사용자 수준에서 부여된 서비스 권한과 마지막 접근 시간을 보여준다. 이를 통해 사용하지 않는 권한을 확인하고 정책을 축소할 수 있다. Credentials Report는 자격 증명 상태 보고서이고, CloudTrail은 API 호출 이력이다.

**핵심 개념:** IAM Access Advisor, 최소 권한 원칙

### Q6. Which of the following is a valid MFA device option for AWS?
**Options:**
- A) SMS text message to a mobile phone
- B) Email verification code
- C) U2F security key such as YubiKey
- D) Biometric fingerprint scanner

**Answer:** C

**해설:** AWS에서 지원하는 MFA 장치는 Virtual MFA(Google Authenticator, Authy), U2F 보안 키(YubiKey), Hardware Key Fob(Gemalto), GovCloud용 Hardware Key Fob(SurePassID)이다. SMS나 이메일 인증은 IAM MFA 옵션이 아니다.

**핵심 개념:** MFA devices options

### Q7. What are the components of an IAM Policy Statement? (Select the REQUIRED components)
**Options:**
- A) Effect, Action, Resource
- B) Sid, Effect, Action, Resource, Condition
- C) Version, Id, Statement
- D) Principal, Sid, Condition

**Answer:** A

**해설:** IAM Policy Statement의 필수 구성요소는 Effect(Allow/Deny), Action(작업 목록), Resource(리소스 목록)이다. Sid와 Condition은 선택사항이다. Version과 Id는 Policy 수준의 요소이지 Statement 수준이 아니다. Principal은 리소스 기반 정책에서 사용된다.

**핵심 개념:** IAM Policies Structure
---

## EC2 Basics

---

### Q1. A company needs to run a batch processing job that can be interrupted and restarted without data loss. The job needs to be as cost-effective as possible. Which EC2 purchasing option should they use?
**Options:**
- A) On-Demand Instances
- B) Reserved Instances
- C) Spot Instances
- D) Dedicated Hosts

**Answer:** C

**해설:** 배치 처리 작업은 중단 후 재시작이 가능하므로(resilient to failure) Spot 인스턴스가 가장 적합하다. 최대 90% 할인으로 가장 비용 효율적이다. On-Demand는 비용이 높고, Reserved는 장기 약정이 필요하며, Dedicated Host는 가장 비싸다.

**핵심 개념:** EC2 Spot Instances

### Q2. A user is trying to connect to an EC2 instance via SSH but the connection times out. What is the MOST likely cause?
**Options:**
- A) The EC2 instance is stopped
- B) The application on the instance is not running
- C) The Security Group does not allow inbound SSH traffic
- D) The IAM user does not have permission

**Answer:** C

**해설:** Connection Timeout은 보안 그룹 문제를 의미한다. 보안 그룹의 인바운드 규칙에서 포트 22(SSH)가 허용되지 않으면 트래픽이 인스턴스에 도달하지 못한다. "Connection Refused"는 앱 문제이다. 인스턴스가 중지되었다면 DNS 해석 실패가 발생한다.

**핵심 개념:** Security Groups 트러블슈팅

### Q3. A company requires a physical server for their application due to software licensing that is based on per-socket and per-core metrics. Which EC2 option should they choose?
**Options:**
- A) Spot Instances
- B) Dedicated Instances
- C) Dedicated Hosts
- D) Reserved Instances

**Answer:** C

**해설:** Dedicated Host는 물리 서버 전체를 예약하여 소켓/코어 기반 라이선스(BYOL)를 사용할 수 있다. Dedicated Instance는 전용 하드웨어를 사용하지만 물리 서버 수준의 가시성/제어가 없다. 라이선스 규정 준수에는 Dedicated Host가 필요하다.

**핵심 개념:** Dedicated Host vs Dedicated Instance

### Q4. Which EC2 instance type family is BEST suited for an in-memory database workload?
**Options:**
- A) General Purpose (t-family)
- B) Compute Optimized (c-family)
- C) Memory Optimized (r-family)
- D) Storage Optimized (i-family)

**Answer:** C

**해설:** Memory Optimized(R 패밀리)는 대용량 데이터셋을 메모리에서 처리하는 워크로드에 최적화되어 있다. 인메모리 데이터베이스, 고성능 관계형/비관계형 DB, BI 애플리케이션 등에 적합하다.

**핵심 개념:** EC2 Instance Types - Memory Optimized

### Q5. A company plans to run a steady-state database workload for the next 3 years. They want to minimize costs. Which purchasing option provides the GREATEST discount?
**Options:**
- A) On-Demand Instances
- B) 3-year Reserved Instance with All Upfront payment
- C) Spot Instances
- D) 1-year Savings Plan with No Upfront payment

**Answer:** B

**해설:** 안정적인 DB 워크로드는 Spot 인스턴스에 부적합하다(중단 위험). 3년 Reserved Instance에 All Upfront 결제를 하면 최대 할인을 받을 수 있다. Savings Plan도 할인이 있지만, 3년 RI All Upfront가 가장 큰 할인을 제공한다.

**핵심 개념:** EC2 Reserved Instances

### Q6. What is the recommended Spot Fleet allocation strategy for most workloads?
**Options:**
- A) lowestPrice
- B) diversified
- C) capacityOptimized
- D) priceCapacityOptimized

**Answer:** D

**해설:** `priceCapacityOptimized`는 최고 용량 가용 풀을 먼저 선택한 후, 그 중 가장 저렴한 풀을 선택하는 전략으로, 대부분의 워크로드에 권장된다. `lowestPrice`는 비용만 최적화하고, `diversified`는 가용성에 초점, `capacityOptimized`는 용량에만 초점을 맞춘다.

**핵심 개념:** Spot Fleet 할당 전략

### Q7. Which of the following Security Group characteristics is correct?
**Options:**
- A) Security Groups can have both Allow and Deny rules
- B) All inbound traffic is allowed by default
- C) Security Groups are stateless firewalls
- D) A Security Group can be attached to multiple EC2 instances

**Answer:** D

**해설:** 보안 그룹은 여러 인스턴스에 연결할 수 있다. 보안 그룹에는 Allow 규칙만 있고 Deny 규칙은 없다(A 오답). 기본적으로 모든 인바운드 트래픽은 차단된다(B 오답). 보안 그룹은 stateful 방화벽이다(C 오답 - 인바운드 허용 시 응답 아웃바운드 자동 허용).

**핵심 개념:** Security Groups

### Q8. A company needs guaranteed EC2 capacity in a specific Availability Zone for an upcoming event lasting 2 days. They do not want a long-term commitment. Which option should they use?
**Options:**
- A) Reserved Instances
- B) Spot Instances
- C) On-Demand Capacity Reservations
- D) Savings Plans

**Answer:** C

**해설:** On-Demand Capacity Reservation은 특정 AZ에 용량을 예약하며, 시간 약정이 없어 언제든 생성/취소 가능하다. 할인은 없지만(On-Demand 가격) 용량을 보장한다. Reserved Instance와 Savings Plans는 1~3년 약정이 필요하고, Spot은 용량을 보장하지 않는다.

**핵심 개념:** EC2 Capacity Reservations
---

## EC2 Associate

---

### Q1. A company is deploying a high-performance computing (HPC) application that requires extremely low latency and high network throughput between EC2 instances. Which placement group strategy should they use?
**Options:**
- A) Spread
- B) Partition
- C) Cluster
- D) Default (no placement group)

**Answer:** C

**해설:** Cluster Placement Group은 단일 AZ 내에서 인스턴스를 그룹화하여 10Gbps 대역폭과 최저 지연을 제공한다. HPC와 같이 극도의 네트워크 성능이 필요한 워크로드에 적합하다. Spread는 가용성에, Partition은 대규모 분산 시스템에 초점을 맞춘다.

**핵심 개념:** Placement Groups - Cluster

### Q2. An application requires high availability where each EC2 instance must be isolated from hardware failure of other instances. The application runs on 6 instances across 3 Availability Zones. Which placement group strategy is MOST appropriate?
**Options:**
- A) Cluster
- B) Spread
- C) Partition
- D) No placement group is needed

**Answer:** B

**해설:** Spread Placement Group은 각 인스턴스를 서로 다른 하드웨어에 배치하여 개별 인스턴스의 하드웨어 장애 격리를 보장한다. AZ당 최대 7개 인스턴스 제한이 있으므로, 3 AZ에 6개 인스턴스는 (AZ당 2개) 제한 내에서 충분하다.

**핵심 개념:** Placement Groups - Spread

### Q3. A Solutions Architect needs to preserve the in-memory state of an EC2 instance to speed up subsequent boots. Which feature should they use?
**Options:**
- A) EC2 User Data script
- B) EC2 Hibernate
- C) EBS Snapshots
- D) AMI creation

**Answer:** B

**해설:** EC2 Hibernate는 RAM 상태를 암호화된 Root EBS 볼륨에 저장하고, 재시작 시 OS를 재부팅하지 않고 빠르게 복원한다. User Data는 최초 시작 시만 실행되고, EBS Snapshot과 AMI는 디스크 상태만 보존하며 RAM은 저장하지 않는다.

**핵심 개념:** EC2 Hibernate

### Q4. What is a prerequisite for using EC2 Hibernate?
**Options:**
- A) The instance must use an Instance Store root volume
- B) The root EBS volume must be encrypted
- C) The instance RAM must be at least 150 GB
- D) The instance must be a bare metal instance

**Answer:** B

**해설:** EC2 Hibernate를 사용하려면 Root EBS 볼륨이 암호화되어야 한다. Instance Store는 사용할 수 없고(A 오답), RAM은 150GB 미만이어야 하며(C 오답 - 미만이지 이상이 아님), Bare Metal 인스턴스는 지원되지 않는다(D 오답).

**핵심 개념:** EC2 Hibernate 요구사항

### Q5. An application requires a fixed public IP address that can be quickly remapped to another EC2 instance in case of failure. What should the Solutions Architect use?
**Options:**
- A) A public IP address assigned by AWS
- B) An Elastic IP address
- C) A private IP address with NAT Gateway
- D) An Application Load Balancer

**Answer:** B

**해설:** Elastic IP는 고정 Public IPv4 주소로, 장애 시 다른 인스턴스로 빠르게 재매핑할 수 있다. 일반 Public IP는 인스턴스 재시작 시 변경된다. 그러나 일반적으로는 Load Balancer 사용이 더 나은 아키텍처이다. 문제에서 "고정 Public IP + 빠른 재매핑"을 명시했으므로 Elastic IP가 정답이다.

**핵심 개념:** Elastic IP

### Q6. A company is running a Cassandra database cluster on EC2 and needs to distribute instances across multiple isolated partitions to prevent correlated hardware failures. Which placement group strategy should they use?
**Options:**
- A) Cluster
- B) Spread
- C) Partition
- D) Default placement

**Answer:** C

**해설:** Partition Placement Group은 인스턴스를 서로 다른 파티션(랙)에 분산하여 상관된 하드웨어 장애를 방지한다. Cassandra, Kafka, HDFS, HBase와 같은 대규모 분산 시스템에 적합하다. Spread는 AZ당 7개 인스턴스 제한이 있어 대규모 클러스터에는 부적합하다.

**핵심 개념:** Placement Groups - Partition

### Q7. What happens to the public IP address of an EC2 instance when it is stopped and then started again?
**Options:**
- A) The public IP address remains the same
- B) The public IP address may change
- C) The instance loses both public and private IP addresses
- D) The private IP address changes but public stays the same

**Answer:** B

**해설:** EC2 인스턴스를 중지 후 재시작하면 Public IP가 변경될 수 있다. Private IP는 유지된다. 고정 Public IP가 필요하면 Elastic IP를 사용하거나, Load Balancer를 사용하여 Public IP 의존성을 제거해야 한다.

**핵심 개념:** EC2 Public/Private IP

### Q8. An ENI (Elastic Network Interface) created in us-east-1a can be attached to an EC2 instance in which Availability Zone?
**Options:**
- A) Any Availability Zone in us-east-1
- B) Only us-east-1a
- C) Any Availability Zone in any Region
- D) Any Availability Zone in the same VPC

**Answer:** B

**해설:** ENI는 특정 AZ에 종속된다. us-east-1a에서 생성된 ENI는 us-east-1a의 인스턴스에만 연결할 수 있다. 다른 AZ나 리전의 인스턴스에는 연결할 수 없다.

**핵심 개념:** Elastic Network Interface (ENI) - AZ 종속
---

## EC2 Instance Storage

---

### Q1. A company needs a shared file system that can be accessed by EC2 instances running in multiple Availability Zones. The instances are running Amazon Linux. Which storage option is MOST appropriate?
**Options:**
- A) Amazon EBS with Multi-Attach
- B) Amazon EFS
- C) Amazon S3
- D) EC2 Instance Store

**Answer:** B

**해설:** Amazon EFS는 Multi-AZ에서 여러 EC2 인스턴스에 동시 마운트 가능한 관리형 NFS이다. Linux 인스턴스에서 사용 가능하며, 공유 파일 시스템 요구사항에 적합하다. EBS Multi-Attach는 같은 AZ 내에서만 가능하고 io1/io2만 지원한다. S3는 객체 스토리지로 파일 시스템이 아니다.

**핵심 개념:** Amazon EFS vs EBS

### Q2. An application requires more than 64,000 IOPS with sub-millisecond latency. Which EBS volume type should be used?
**Options:**
- A) gp3
- B) io1
- C) io2 Block Express
- D) st1

**Answer:** C

**해설:** io2 Block Express는 최대 256,000 IOPS와 서브밀리초 지연을 제공한다. gp3는 최대 16,000 IOPS, io1은 최대 64,000 IOPS (Nitro)이다. st1은 HDD로 최대 500 IOPS이다. 64,000 IOPS를 초과하려면 io2 Block Express가 필요하다.

**핵심 개념:** EBS Volume Types - io2 Block Express

### Q3. A Solutions Architect needs to reduce storage costs for EBS snapshots that are rarely accessed but must be retained for compliance. What should they do?
**Options:**
- A) Delete the snapshots and recreate them when needed
- B) Move the snapshots to EBS Snapshot Archive
- C) Enable Fast Snapshot Restore
- D) Convert the snapshots to HDD volumes

**Answer:** B

**해설:** EBS Snapshot Archive는 아카이브 티어로 스냅샷을 이동하여 75% 비용을 절감한다. 복원에 24~72시간이 소요되지만 거의 접근하지 않는 규정 준수용 스냅샷에 적합하다. FSR은 오히려 비용이 높아지고, 스냅샷 삭제는 규정 준수에 위배된다.

**핵심 개념:** EBS Snapshot Archive

### Q4. Which EBS volume type has IOPS that scale automatically with volume size?
**Options:**
- A) gp3
- B) gp2
- C) io1
- D) st1

**Answer:** B

**해설:** gp2는 볼륨 크기에 비례하여 IOPS가 자동으로 증가한다 (3 IOPS/GiB). 5,334 GiB에서 최대 16,000 IOPS에 도달한다. gp3, io1은 IOPS를 크기와 독립적으로 설정할 수 있다.

**핵심 개념:** gp2 vs gp3

### Q5. A company wants to encrypt an existing unencrypted EBS volume. What is the correct procedure?
**Options:**
- A) Enable encryption directly on the existing volume
- B) Create a snapshot, copy the snapshot with encryption enabled, create a new encrypted volume from the snapshot
- C) Attach a new encrypted volume and copy the data manually
- D) Use AWS KMS to encrypt the volume in place

**Answer:** B

**해설:** 기존 비암호화 EBS 볼륨을 암호화하려면: 스냅샷 생성 → 스냅샷 복사 시 암호화 활성화 → 암호화된 스냅샷으로 새 볼륨 생성 → 인스턴스에 연결. 기존 볼륨에 직접 암호화를 활성화하는 것은 불가능하다.

**핵심 개념:** EBS Encryption

### Q6. Which storage option provides the HIGHEST I/O performance for an EC2 instance?
**Options:**
- A) EBS gp3
- B) EBS io2 Block Express
- C) EC2 Instance Store
- D) Amazon EFS Max I/O

**Answer:** C

**해설:** EC2 Instance Store는 물리적으로 인스턴스에 연결된 로컬 디스크로, 네트워크 오버헤드 없이 최고의 I/O 성능(매우 높은 IOPS)을 제공한다. 단, 데이터는 인스턴스 중지 시 소멸된다. 임시 데이터(캐시, 버퍼)에 적합하다.

**핵심 개념:** EC2 Instance Store

### Q7. A company runs a clustered Linux application (Teradata) that requires multiple EC2 instances to simultaneously read and write to the same storage volume in the same Availability Zone. Which solution should they use?
**Options:**
- A) Amazon EFS
- B) EBS gp3 with Multi-Attach
- C) EBS io1/io2 with Multi-Attach
- D) Amazon S3

**Answer:** C

**해설:** EBS Multi-Attach는 io1/io2 패밀리에서만 지원되며, 같은 AZ 내 최대 16개 EC2 인스턴스에 동시 연결할 수 있다. 클러스터 인식 파일 시스템이 필요하다. gp3는 Multi-Attach를 지원하지 않는다. EFS도 가능하지만, 블록 스토리지가 필요한 Teradata와 같은 앱에는 EBS Multi-Attach가 더 적합하다.

**핵심 개념:** EBS Multi-Attach - io1/io2

### Q8. An EFS file system has files that are accessed frequently for the first 30 days but rarely after that. How can the company optimize storage costs?
**Options:**
- A) Manually move files to S3 after 30 days
- B) Use EFS Lifecycle Policy to automatically move files to EFS Infrequent Access
- C) Create a new EFS file system for old files
- D) Use EBS snapshots for archival

**Answer:** B

**해설:** EFS Lifecycle Policy를 설정하면 지정된 기간(예: 30일) 동안 접근되지 않은 파일을 자동으로 Standard에서 Infrequent Access(EFS-IA) 계층으로 이동한다. EFS-IA는 저장 비용이 저렴하고 파일 검색 시에만 비용이 발생한다. 수동 이동이나 별도 파일 시스템 생성은 비효율적이다.

**핵심 개념:** EFS Storage Classes & Lifecycle Policy
---

## High Availability & Scalability

---

### Q1. A company needs to route HTTP traffic to different microservices based on the URL path. For example, /api/users should go to the user service and /api/orders should go to the order service. Which load balancer should they use?
**Options:**
- A) Classic Load Balancer
- B) Network Load Balancer
- C) Application Load Balancer
- D) Gateway Load Balancer

**Answer:** C

**해설:** ALB(Application Load Balancer)는 L7에서 동작하며 URL 경로, 호스트명, 쿼리 스트링 기반 라우팅을 지원한다. 마이크로서비스 아키텍처에 최적이다. CLB는 경로 기반 라우팅 불가, NLB는 L4(TCP/UDP)에서 동작, GWLB는 보안 어플라이언스용이다.

**핵심 개념:** ALB - URL Path 기반 라우팅

### Q2. A company requires a load balancer with a static IP address per Availability Zone for whitelisting purposes. The application handles millions of requests per second. Which load balancer should they choose?
**Options:**
- A) Application Load Balancer
- B) Classic Load Balancer
- C) Network Load Balancer
- D) Gateway Load Balancer

**Answer:** C

**해설:** NLB(Network Load Balancer)는 AZ당 하나의 고정 IP를 제공하며 Elastic IP 할당을 지원한다. 수백만 RPS를 초저지연으로 처리할 수 있다. ALB와 CLB는 고정 IP를 제공하지 않는다. IP 화이트리스팅이 필요하면 NLB를 사용해야 한다.

**핵심 개념:** NLB - Static IP, Elastic IP

### Q3. An application is deployed behind an Application Load Balancer. The application needs to get the real IP address of the client. How can it obtain this information?
**Options:**
- A) From the source IP of the incoming request
- B) From the X-Forwarded-For header
- C) From the Host header
- D) From the ALB access logs only

**Answer:** B

**해설:** ALB는 클라이언트와의 연결을 종료하고 새 연결을 백엔드로 생성하므로, 원본 클라이언트 IP는 소스 IP에서 확인할 수 없다. 대신 **X-Forwarded-For** 헤더에 클라이언트의 실제 IP가 삽입된다. X-Forwarded-Port와 X-Forwarded-Proto도 사용 가능하다.

**핵심 개념:** ALB - X-Forwarded-For

### Q4. A company needs to inspect all network traffic entering their VPC using third-party security appliances before it reaches the application. Which AWS service should they use?
**Options:**
- A) Application Load Balancer with AWS WAF
- B) Network Load Balancer with Security Groups
- C) Gateway Load Balancer
- D) AWS Network Firewall

**Answer:** C

**해설:** GWLB(Gateway Load Balancer)는 L3에서 동작하며, 3rd party 보안 가상 어플라이언스(Firewall, IDS/IPS, Deep Packet Inspection)로 트래픽을 전달하고 분산한다. Transparent Network Gateway + Load Balancer 기능을 결합하여 모든 트래픽의 단일 진입/출구점을 제공한다.

**핵심 개념:** Gateway Load Balancer

### Q5. Which of the following statements about Cross-Zone Load Balancing is correct?
**Options:**
- A) It is enabled by default for NLB and charges apply for inter-AZ data
- B) It is enabled by default for ALB with no charges for inter-AZ data
- C) It is enabled by default for all load balancer types
- D) It is disabled by default for ALB and charges apply for inter-AZ data

**Answer:** B

**해설:** Cross-Zone Load Balancing은 ALB에서 기본 활성화되며 AZ 간 데이터 전송 비용이 없다. NLB/GWLB는 기본 비활성화이며 활성화 시 AZ 간 비용이 발생한다. CLB는 기본 비활성화이며 활성화 시 비용이 없다.

**핵심 개념:** Cross-Zone Load Balancing

### Q6. A web application needs to maintain user session state across multiple requests. The application is behind an ALB. Which feature should be enabled?
**Options:**
- A) Cross-Zone Load Balancing
- B) Connection Draining
- C) Sticky Sessions
- D) Health Checks

**Answer:** C

**해설:** Sticky Sessions(Session Affinity)는 같은 클라이언트를 항상 같은 인스턴스로 라우팅하여 세션 데이터를 유지한다. ALB에서는 쿠키 기반(Application Cookie 또는 Duration-based Cookie)으로 구현된다. 단, 부하 불균형이 발생할 수 있으므로 주의해야 한다.

**핵심 개념:** Sticky Sessions

### Q7. An Auto Scaling Group needs to automatically scale out when the average CPU utilization exceeds 70% and scale in when it drops below 30%. Which scaling policy should be used?
**Options:**
- A) Target Tracking Scaling
- B) Simple/Step Scaling
- C) Scheduled Scaling
- D) Predictive Scaling

**Answer:** B

**해설:** Simple/Step Scaling은 CloudWatch 알람을 기반으로 특정 임계값 초과/미만 시 지정된 수만큼 인스턴스를 추가/제거한다. Target Tracking은 특정 목표값(예: CPU 40%)을 유지하도록 자동 조절하며, 별도의 상한/하한 임계값을 지정하지 않는다. Scheduled는 시간 기반, Predictive는 ML 예측 기반이다.

**핵심 개념:** ASG - Simple/Step Scaling

### Q8. A company wants to use multiple SSL certificates on a single Application Load Balancer to serve traffic for different domains. Which feature makes this possible?
**Options:**
- A) SSL Termination
- B) Server Name Indication (SNI)
- C) Cross-Zone Load Balancing
- D) Connection Draining

**Answer:** B

**해설:** SNI(Server Name Indication)는 클라이언트가 SSL 핸드셰이크 시 타겟 호스트명을 지정하여, 하나의 로드 밸런서에서 여러 SSL 인증서를 사용할 수 있게 한다. ALB와 NLB에서 지원되며, CLB에서는 지원되지 않는다 (CLB당 SSL 인증서 1개만 가능).

**핵심 개념:** SNI - Server Name Indication
---

## RDS, Aurora & ElastiCache

---

### Q1. A company runs a production MySQL database on Amazon RDS. The database experiences heavy read traffic during business hours. The company wants to offload read traffic without affecting write performance. What should a solutions architect recommend?
**Options:**
- A) Enable Multi-AZ deployment for the RDS instance
- B) Create Read Replicas and direct read traffic to the replica endpoints
- C) Increase the instance size of the RDS instance
- D) Enable RDS Storage Auto Scaling

**Answer:** B

**해설:** Read Replica는 읽기 트래픽을 분산하여 메인 DB의 부하를 줄이는 데 사용된다. Multi-AZ(A)는 재해 복구 목적이며 읽기 분산에 사용되지 않는다. 인스턴스 크기 증가(C)는 수직 스케일링이며, Storage Auto Scaling(D)은 스토리지 용량 문제를 해결한다.

**핵심 개념:** RDS Read Replicas

---

### Q2. A company wants to migrate its on-premises Microsoft SQL Server database to AWS with the ability to customize the underlying operating system. Which AWS service should they use?
**Options:**
- A) Amazon RDS for SQL Server
- B) Amazon Aurora
- C) Amazon RDS Custom for SQL Server
- D) Amazon EC2 with SQL Server installed

**Answer:** C

**해설:** RDS Custom은 Oracle과 MS SQL Server에 대해 OS 및 DB에 대한 전체 관리자 접근을 제공하면서도 RDS의 관리형 서비스 이점을 유지한다. 일반 RDS(A)는 OS 접근이 불가하고, Aurora(B)는 SQL Server를 지원하지 않는다. EC2(D)는 가능하지만 관리 부담이 크다.

**핵심 개념:** RDS Custom

---

### Q3. An application uses Amazon Aurora MySQL as its database. The company needs to create a copy of the production database for testing purposes with minimal cost and time. What is the MOST efficient approach?
**Options:**
- A) Create a manual snapshot and restore it to a new Aurora cluster
- B) Use Aurora Database Cloning
- C) Create a Read Replica and promote it
- D) Use AWS Database Migration Service (DMS)

**Answer:** B

**해설:** Aurora Database Cloning은 copy-on-write 프로토콜을 사용하여 초기에는 동일 데이터 볼륨을 공유하므로 스냅샷 복원(A)보다 훨씬 빠르고 비용 효율적이다. Read Replica 승격(C)은 프로덕션에 영향을 줄 수 있고, DMS(D)는 불필요하게 복잡하다.

**핵심 개념:** Aurora Database Cloning

---

### Q4. A company has a serverless application using AWS Lambda functions that frequently connect to an Amazon RDS MySQL database. During peak hours, the database runs out of connections. What should a solutions architect recommend?
**Options:**
- A) Increase the RDS instance size
- B) Use Amazon RDS Proxy
- C) Switch to Amazon Aurora Serverless
- D) Add Read Replicas

**Answer:** B

**해설:** RDS Proxy는 DB 연결을 풀링하여 공유함으로써 연결 수를 줄이고 DB 리소스 부담을 감소시킨다. Lambda 함수는 많은 동시 연결을 생성할 수 있어 RDS Proxy가 특히 유용하다. 인스턴스 크기 증가(A)는 임시방편이고, Read Replica(D)는 읽기 분산용이다.

**핵심 개념:** Amazon RDS Proxy

---

### Q5. A company needs a caching solution that supports data persistence, high availability with automatic failover, and complex data types like sorted sets for a real-time leaderboard. Which solution should they choose?
**Options:**
- A) Amazon ElastiCache for Memcached
- B) Amazon ElastiCache for Redis
- C) Amazon DynamoDB DAX
- D) Amazon CloudFront

**Answer:** B

**해설:** Redis는 AOF persistence(데이터 영속성), Multi-AZ Auto-Failover(고가용성), Sorted Sets(정렬된 집합) 등 복잡한 데이터 구조를 지원한다. Memcached(A)는 영속성과 고가용성을 지원하지 않는다. DAX(C)는 DynamoDB 전용이고, CloudFront(D)는 CDN이다.

**핵심 개념:** ElastiCache Redis vs Memcached

---

### Q6. A company has an unencrypted Amazon RDS database and needs to enable encryption. What is the correct approach?
**Options:**
- A) Enable encryption directly on the existing RDS instance
- B) Create a snapshot of the unencrypted DB, copy the snapshot as encrypted, and restore from the encrypted snapshot
- C) Enable AWS KMS encryption on the EBS volumes attached to RDS
- D) Use SSL/TLS connections to encrypt the database

**Answer:** B

**해설:** 기존 암호화되지 않은 RDS 인스턴스에 직접 암호화를 활성화할 수 없다(A). 스냅샷을 생성하고 암호화된 복사본을 만든 후 복원해야 한다. EBS 볼륨에 직접 접근하여 암호화할 수 없고(C), SSL/TLS(D)는 전송 중 암호화이지 저장 시 암호화가 아니다.

**핵심 개념:** RDS & Aurora 암호화

---

### Q7. A global company needs a relational database solution that provides sub-second replication across regions and can promote a secondary region in under 1 minute for disaster recovery. Which solution meets these requirements?
**Options:**
- A) Amazon RDS with Cross-Region Read Replicas
- B) Amazon Aurora Global Database
- C) Amazon RDS Multi-AZ deployment
- D) Amazon Aurora with Cross-Region Read Replicas

**Answer:** B

**해설:** Aurora Global Database는 1초 미만의 크로스 리전 복제와 1분 미만의 RTO로 재해 복구 승격을 제공한다. RDS Cross-Region Read Replica(A)는 더 높은 복제 지연을 가지고 자동 승격이 아니다. Multi-AZ(C)는 같은 리전 내에서만 작동하며, Aurora Cross-Region Read Replica(D)는 Global Database보다 성능이 떨어진다.

**핵심 개념:** Aurora Global Database

---

### Q8. A company stores user session data in ElastiCache and wants to ensure users remain logged in even if an EC2 instance fails. Which caching strategy best supports this use case?
**Options:**
- A) Lazy Loading
- B) Write Through
- C) Session Store with TTL
- D) Cache-aside pattern

**Answer:** C

**해설:** Session Store 패턴은 세션 데이터를 ElastiCache에 저장하고 TTL을 활용하여 만료를 관리한다. 사용자가 다른 EC2 인스턴스로 연결되어도 ElastiCache에서 세션 데이터를 조회하여 로그인 상태를 유지할 수 있다. Lazy Loading(A)과 Write Through(B)는 DB 캐싱 패턴이지 세션 관리용이 아니다.

**핵심 개념:** ElastiCache Session Store
---

## Route 53

---

### Q1. A company wants to use its domain name (example.com) to point to an Application Load Balancer. Which Route 53 record type should be used?
**Options:**
- A) CNAME record
- B) A record with Alias enabled
- C) NS record
- D) MX record

**Answer:** B

**해설:** CNAME(A)은 Zone Apex(example.com)에 사용할 수 없다. Alias Record는 A/AAAA 타입으로 Zone Apex에서도 사용 가능하며 ALB를 대상으로 지원한다. NS(C)는 Name Server 레코드이고, MX(D)는 메일 서버용이다.

**핵심 개념:** CNAME vs Alias

---

### Q2. A company is deploying a new version of its application and wants to send 10% of traffic to the new version while keeping 90% on the current version. Which Route 53 routing policy should be used?
**Options:**
- A) Simple routing
- B) Failover routing
- C) Weighted routing
- D) Latency-based routing

**Answer:** C

**해설:** Weighted 라우팅 정책은 각 레코드에 가중치를 할당하여 트래픽 비율을 제어할 수 있다. 새 버전에 10, 기존 버전에 90의 가중치를 설정하면 된다. Simple(A)은 트래픽 제어 불가, Failover(B)는 재해 복구용, Latency(D)는 지연 시간 기반이다.

**핵심 개념:** Weighted Routing Policy

---

### Q3. A company has an application deployed in multiple AWS regions. They want to route users to the region that provides the best performance. Which routing policy should be used?
**Options:**
- A) Geolocation routing
- B) Geoproximity routing
- C) Latency-based routing
- D) Weighted routing

**Answer:** C

**해설:** Latency-based 라우팅은 사용자와 AWS 리전 간 지연 시간이 가장 낮은 리전으로 트래픽을 라우팅한다. Geolocation(A)은 사용자 위치 기반이지 성능 기반이 아니다. Geoproximity(B)는 지리적 근접성 기반이며, Weighted(D)는 비율 기반이다.

**핵심 개념:** Latency-based Routing Policy

---

### Q4. A company needs to monitor the health of a database running in a private subnet and use it for Route 53 DNS failover. How should this be configured?
**Options:**
- A) Create a Route 53 health check pointing to the private IP of the database
- B) Create a CloudWatch alarm monitoring the database, then create a Route 53 health check that monitors the CloudWatch alarm
- C) Use a Route 53 calculated health check
- D) Enable VPC peering between Route 53 and the VPC

**Answer:** B

**해설:** Route 53 헬스 체커는 VPC 외부에 있어 프라이빗 리소스에 직접 접근할 수 없다(A 불가). CloudWatch Metric/Alarm을 생성하고 이를 모니터링하는 헬스 체크를 만드는 것이 올바른 방법이다. Calculated Health Check(C)는 다른 헬스 체크를 결합하는 것이고, VPC 피어링(D)은 Route 53에 적용되지 않는다.

**핵심 개념:** Private Resource Health Check

---

### Q5. A company has registered a domain with GoDaddy but wants to use Amazon Route 53 to manage DNS records. What steps should they take?
**Options:**
- A) Transfer the domain to Route 53
- B) Create a Hosted Zone in Route 53 and update NS records at GoDaddy to use Route 53 Name Servers
- C) Create CNAME records at GoDaddy pointing to Route 53
- D) It is not possible to use Route 53 with domains registered elsewhere

**Answer:** B

**해설:** 도메인을 이전하지 않고(A) Route 53에서 Hosted Zone을 생성한 후, GoDaddy에서 NS 레코드를 Route 53의 Name Server로 업데이트하면 된다. Domain Registrar와 DNS Service는 별개이다. CNAME(C)은 DNS 위임 방법이 아니며, 다른 등록기관의 도메인도 Route 53에서 관리 가능하다(D 오답).

**핵심 개념:** Domain Registrar vs DNS Service

---

### Q6. A company wants to restrict content delivery based on the country of the user. They want users in France to be directed to a French server and users in Germany to a German server. All other users should go to a default server. Which routing policy should they use?
**Options:**
- A) Latency-based routing
- B) Geoproximity routing
- C) Geolocation routing
- D) IP-based routing

**Answer:** C

**해설:** Geolocation 라우팅은 사용자의 지리적 위치(대륙, 국가, 미국 주)를 기반으로 트래픽을 라우팅한다. 프랑스와 독일 사용자를 각각 다른 서버로, 나머지는 Default 레코드로 보낼 수 있다. Latency(A)는 지연 시간 기반이고, Geoproximity(B)는 bias 기반 영역 조절이며, IP-based(D)는 CIDR 기반이다.

**핵심 개념:** Geolocation Routing Policy

---

### Q7. Which of the following CANNOT be set as an Alias record target in Amazon Route 53?
**Options:**
- A) Application Load Balancer
- B) Amazon CloudFront distribution
- C) Amazon EC2 instance DNS name
- D) Amazon S3 website endpoint

**Answer:** C

**해설:** EC2 인스턴스의 DNS 이름은 Alias Record 대상으로 설정할 수 없다. ALB(A), CloudFront(B), S3 Website(D)는 모두 유효한 Alias 대상이다. EC2에 트래픽을 보내려면 A 레코드에 IP 주소를 직접 지정하거나 로드 밸런서를 통해야 한다.

**핵심 개념:** Alias Record Targets

---

### Q8. A company wants to use Route 53 to resolve DNS queries for on-premises resources from within their VPC. The VPC is connected to the on-premises data center via AWS Direct Connect. What should they configure?
**Options:**
- A) Route 53 Resolver Inbound Endpoint
- B) Route 53 Resolver Outbound Endpoint
- C) A Private Hosted Zone
- D) A Public Hosted Zone

**Answer:** B

**해설:** Outbound Endpoint는 VPC(Route 53 Resolver)에서 온프레미스 DNS Resolver로 DNS 쿼리를 전달한다. Inbound Endpoint(A)는 반대 방향으로, 온프레미스에서 AWS 리소스의 DNS를 해석할 때 사용한다. Private Hosted Zone(C)은 VPC 내부 DNS이고, Public Hosted Zone(D)은 인터넷 DNS이다.

**핵심 개념:** Route 53 Resolver Endpoints
---

## Classic Solutions Architecture

---

### Q1. A company is designing a web application that stores user session data. The application runs on multiple EC2 instances behind an Application Load Balancer. Users report losing their shopping cart when they are routed to a different instance. What is the BEST solution to maintain session state without modifying the application?
**Options:**
- A) Enable ELB sticky sessions
- B) Store session data in Amazon ElastiCache
- C) Use Amazon EBS to store session data
- D) Store session data in Amazon S3

**Answer:** A

**해설:** "애플리케이션 수정 없이"라는 조건이 핵심이다. ELB Sticky Session은 애플리케이션 변경 없이 같은 사용자를 같은 인스턴스로 라우팅한다. ElastiCache(B)가 더 나은 아키텍처이지만 코드 변경이 필요하다. EBS(C)는 인스턴스 간 공유 불가하고, S3(D)는 세션 저장에 적합하지 않다.

**핵심 개념:** ELB Sticky Sessions

---

### Q2. A solutions architect is designing a 3-tier web application. The web tier must be in a public subnet and the database tier must not be directly accessible from the internet. Which architecture meets this requirement?
**Options:**
- A) Place the ALB, EC2 instances, and RDS in public subnets
- B) Place the ALB in a public subnet, EC2 instances in a private subnet, and RDS in a private subnet
- C) Place all components in a private subnet with a NAT Gateway
- D) Place the ALB and EC2 instances in public subnets and RDS in a private subnet

**Answer:** B

**해설:** 3-Tier 아키텍처에서 ALB는 Public Subnet에, 애플리케이션(EC2)은 Private Subnet에, 데이터베이스(RDS)는 Private/Data Subnet에 배치한다. A는 RDS가 공개되고, C는 ALB가 인터넷에서 접근 불가하며, D는 EC2가 불필요하게 공개된다.

**핵심 개념:** 3-Tier Architecture

---

### Q3. A company wants to quickly launch new EC2 instances with pre-installed applications and configurations for a disaster recovery scenario. Which approach provides the FASTEST launch time?
**Options:**
- A) Use EC2 User Data scripts to install and configure applications at boot
- B) Use a Golden AMI with all applications pre-installed
- C) Use AWS CloudFormation to provision the infrastructure
- D) Use a combination of Golden AMI and User Data scripts

**Answer:** B

**해설:** Golden AMI는 모든 애플리케이션과 설정이 사전 설치되어 있어 가장 빠른 시작 시간을 제공한다. User Data(A)는 부팅 시 설치를 수행하므로 시간이 더 걸린다. CloudFormation(C)은 인프라 프로비저닝 도구이지 애플리케이션 설치 속도와 직접 관련이 없다. Hybrid(D)는 Golden AMI보다 느리다.

**핵심 개념:** Golden AMI

---

### Q4. A company runs a WordPress site on multiple EC2 instances across two Availability Zones. Users upload images that need to be accessible from all instances. Currently, images uploaded to one instance are not visible when users are routed to another instance. What storage solution should be used?
**Options:**
- A) Amazon EBS volumes attached to each instance
- B) Amazon S3
- C) Amazon EFS
- D) Instance store

**Answer:** C

**해설:** EFS(Amazon Elastic File System)는 여러 AZ의 여러 EC2 인스턴스에서 동시에 접근 가능한 공유 파일 시스템이다. EBS(A)는 단일 인스턴스에 연결되며 AZ 간 공유 불가하다. S3(B)도 가능하지만 WordPress의 파일 시스템 기반 구조에는 EFS가 더 적합하다. Instance Store(D)는 임시 스토리지이다.

**핵심 개념:** EBS vs EFS

---

### Q5. A development team wants to deploy a web application with minimal infrastructure management. They want automatic scaling, load balancing, and health monitoring. The application is written in Node.js. Which AWS service is MOST suitable?
**Options:**
- A) Amazon EC2 with Auto Scaling
- B) AWS Elastic Beanstalk
- C) Amazon ECS
- D) AWS Lambda

**Answer:** B

**해설:** Elastic Beanstalk은 Node.js를 지원하며 자동 스케일링, 로드 밸런싱, 헬스 모니터링을 자동으로 제공한다. 개발자는 코드만 제공하면 된다. EC2 + ASG(A)는 수동 설정이 필요하고, ECS(C)는 컨테이너용이며, Lambda(D)는 서버리스로 기존 웹앱 배포에 적합하지 않을 수 있다.

**핵심 개념:** Elastic Beanstalk

---

### Q6. A company needs to process messages from a web application asynchronously. The processing involves heavy computation that takes several minutes per message. Which Elastic Beanstalk configuration is MOST appropriate?
**Options:**
- A) Web Server Environment Tier with a larger instance type
- B) Worker Environment Tier
- C) Single Instance deployment mode
- D) Web Server Environment Tier with an Auto Scaling group

**Answer:** B

**해설:** Worker Environment Tier는 SQS 큐에서 메시지를 가져와 백그라운드에서 처리하도록 설계되었다. SQS 메시지 수에 따라 자동 스케일링된다. Web Server Tier(A, D)는 HTTP 요청 처리용이며 비동기 작업에 적합하지 않다. Single Instance(C)는 개발 환경용이다.

**핵심 개념:** Beanstalk Worker Tier

---

### Q7. A solutions architect is designing the security groups for a 3-tier architecture. The application runs behind an ALB, with EC2 instances in private subnets, and an RDS database. Which security group configuration follows the principle of least privilege?
**Options:**
- A) Allow all inbound traffic on all security groups
- B) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow traffic from ALB SG; RDS SG: allow traffic from EC2 SG
- C) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow all traffic; RDS SG: allow all traffic
- D) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow HTTP from 0.0.0.0/0; RDS SG: allow traffic from EC2 SG

**Answer:** B

**해설:** 최소 권한 원칙에 따라 각 계층은 이전 계층의 보안 그룹에서만 트래픽을 허용해야 한다. ALB는 인터넷에서 HTTP/HTTPS를, EC2는 ALB SG에서만, RDS는 EC2 SG에서만 트래픽을 허용한다. 보안 그룹 체이닝이 가장 안전한 구성이다.

**핵심 개념:** Security Group Chaining
---

## Amazon S3

---

### Q1. A company needs to store 10TB of data in Amazon S3. The data is accessed once a quarter for reporting purposes and must be retrieved within milliseconds when needed. Which storage class is MOST cost-effective?
**Options:**
- A) S3 Standard
- B) S3 Standard-IA
- C) S3 Glacier Instant Retrieval
- D) S3 Glacier Flexible Retrieval

**Answer:** C

**해설:** S3 Glacier Instant Retrieval은 분기 1회 접근하는 데이터에 적합하며 밀리초 검색을 제공한다. Standard(A)는 자주 접근하는 데이터용으로 비용이 높고, Standard-IA(B)보다 Glacier Instant가 더 저렴하다. Glacier Flexible(D)은 밀리초 검색을 제공하지 않는다.

**핵심 개념:** S3 Glacier Instant Retrieval

---

### Q2. A company has an S3 bucket in us-east-1 and needs to replicate data to a bucket in eu-west-1 for disaster recovery. What prerequisites must be met? (Select TWO)
**Options:**
- A) Both buckets must have versioning enabled
- B) Both buckets must be in the same AWS account
- C) S3 must be given proper IAM permissions
- D) Both buckets must use the same storage class
- E) Server-side encryption must be enabled

**Answer:** A, C

**해설:** S3 복제의 필수 조건은 소스와 대상 버킷 모두 버저닝 활성화(A)와 적절한 IAM 권한(C)이다. 서로 다른 계정 간에도 복제 가능하므로(B 오답), 스토리지 클래스가 같을 필요 없으며(D 오답), 암호화는 필수가 아니다(E 오답).

**핵심 개념:** S3 Replication Prerequisites

---

### Q3. A company hosts a static website on S3 and receives a 403 Forbidden error when accessing the site. What is the MOST likely cause?
**Options:**
- A) The S3 bucket does not have versioning enabled
- B) The S3 bucket policy does not allow public read access
- C) The S3 bucket is not in the correct region
- D) The objects are encrypted with SSE-KMS

**Answer:** B

**해설:** S3 정적 웹사이트에서 403 Forbidden 에러는 버킷 정책에서 공개 읽기를 허용하지 않았기 때문이다. Block Public Access 설정도 확인해야 한다. 버저닝(A), 리전(C), 암호화(D)는 403 에러의 직접적 원인이 아니다.

**핵심 개념:** S3 Static Website Hosting

---

### Q4. A company wants to automatically move objects to a cheaper storage class after they become infrequently accessed, without manual intervention. The access pattern is unpredictable. Which storage class should they use?
**Options:**
- A) S3 Standard-IA
- B) S3 One Zone-IA
- C) S3 Intelligent-Tiering
- D) S3 Glacier Flexible Retrieval

**Answer:** C

**해설:** S3 Intelligent-Tiering은 접근 패턴을 자동으로 모니터링하고 객체를 적절한 계층으로 이동한다. 예측 불가능한 접근 패턴에 가장 적합하며, 검색 비용이 없다. Standard-IA(A)와 One Zone-IA(B)는 수동으로 이동하거나 수명주기 규칙이 필요하고, Glacier(D)는 검색 시간이 길다.

**핵심 개념:** S3 Intelligent-Tiering

---

### Q5. A company needs to upload a 10GB file to Amazon S3. Which upload method is REQUIRED?
**Options:**
- A) Single PUT operation
- B) Multi-Part Upload
- C) S3 Transfer Acceleration
- D) AWS Snowball

**Answer:** B

**해설:** S3의 단일 PUT 작업은 최대 5GB까지만 가능하다. 5GB를 초과하는 파일은 Multi-Part Upload를 반드시 사용해야 한다. Transfer Acceleration(C)은 전송 속도를 높이지만 필수가 아니며, Snowball(D)은 대량 데이터 마이그레이션용이다.

**핵심 개념:** Multi-Part Upload

---

### Q6. An organization has S3 Replication configured from Bucket A to Bucket B. Bucket B has replication configured to Bucket C. An object is uploaded to Bucket A. Where will this object exist?
**Options:**
- A) Bucket A, Bucket B, and Bucket C
- B) Bucket A and Bucket B only
- C) Bucket A only
- D) All three buckets, but with different version IDs

**Answer:** B

**해설:** S3 복제는 **체이닝을 지원하지 않는다**. Bucket A에서 Bucket B로 복제된 객체는 Bucket B의 복제 규칙에 의해 Bucket C로 다시 복제되지 않는다. 따라서 객체는 Bucket A와 Bucket B에만 존재한다.

**핵심 개념:** S3 Replication Chaining

---

### Q7. A company needs to store long-term archive data for 7 years with the lowest possible cost. Data retrieval is very rare and can tolerate a wait time of up to 48 hours. Which S3 storage class should they use?
**Options:**
- A) S3 Glacier Instant Retrieval
- B) S3 Glacier Flexible Retrieval
- C) S3 Glacier Deep Archive
- D) S3 Standard-IA

**Answer:** C

**해설:** S3 Glacier Deep Archive는 가장 저렴한 스토리지 클래스로 장기 아카이브에 적합하다. Standard 검색(12시간)과 Bulk 검색(48시간)을 제공하며, 최소 보관 기간은 180일이다. Glacier Instant(A)와 Flexible(B)은 더 비싸고, Standard-IA(D)는 아카이브용이 아니다.

**핵심 개념:** S3 Glacier Deep Archive

---

### Q8. Which of the following statements about S3 versioning is TRUE?
**Options:**
- A) Versioning can be enabled at the object level
- B) Files uploaded before versioning was enabled will have version "null"
- C) Suspending versioning deletes all previous versions
- D) Versioning is enabled by default on all new buckets

**Answer:** B

**해설:** 버저닝 활성화 전에 업로드된 파일은 version "null"을 갖는다. 버저닝은 버킷 레벨에서 활성화되며(A 오답), 버저닝을 일시 중지해도 이전 버전은 삭제되지 않는다(C 오답). 버저닝은 기본적으로 비활성화 상태이다(D 오답).

**핵심 개념:** S3 Versioning
---

## S3 Advanced

---

### Q1. A company stores application logs in S3 Standard. Logs are actively accessed for the first 30 days, then rarely accessed for 90 days, after which they must be deleted. Which S3 configuration meets these requirements with the LOWEST cost?
**Options:**
- A) Use S3 Intelligent-Tiering
- B) Create a lifecycle rule to transition to S3 Standard-IA after 30 days and delete after 120 days
- C) Create a lifecycle rule to transition to S3 Glacier after 30 days and delete after 120 days
- D) Store all logs in S3 One Zone-IA from the start

**Answer:** B

**해설:** 로그가 30일 후에도 "드물게 접근"되므로 Standard-IA가 적합하다 (빠른 접근 가능). 120일(30+90) 후 만료 규칙으로 삭제한다. Glacier(C)는 검색 시간이 길어 "드물지만 접근"하는 경우에 부적합하다. Intelligent-Tiering(A)은 모니터링 비용이 추가되고, One Zone-IA(D)는 처음 30일 동안의 빈번한 접근에 비효율적이다.

**핵심 개념:** S3 Lifecycle Rules

---

### Q2. A company needs to generate thumbnail images whenever a photo is uploaded to their S3 bucket. The thumbnail generation should be event-driven. Which solution requires the LEAST operational overhead?
**Options:**
- A) Configure S3 Event Notification to invoke a Lambda function
- B) Use an EC2 instance to poll the S3 bucket for new objects
- C) Use Amazon SQS to queue upload events and process with EC2
- D) Use AWS Step Functions to orchestrate the thumbnail generation

**Answer:** A

**해설:** S3 Event Notification으로 Lambda 함수를 직접 호출하는 것이 가장 적은 운영 오버헤드로 이벤트 기반 처리를 구현할 수 있다. EC2 폴링(B)은 지속적인 인스턴스 관리가 필요하고, SQS + EC2(C)도 마찬가지이며, Step Functions(D)는 이 단순한 사용 사례에 과도하다.

**핵심 개념:** S3 Event Notifications

---

### Q3. A company's S3 bucket receives 20,000 GET requests per second. Performance is becoming an issue. What should a solutions architect recommend to improve performance?
**Options:**
- A) Enable S3 Transfer Acceleration
- B) Distribute objects across multiple prefixes
- C) Enable S3 versioning
- D) Switch to S3 Express One Zone

**Answer:** B

**해설:** S3는 접두사당 5,500 GET/초를 지원한다. 20,000 GET/초를 처리하려면 최소 4개 접두사에 객체를 분산해야 한다(4 x 5,500 = 22,000). Transfer Acceleration(A)은 전송 속도를 높이지만 요청 수 제한과 무관하다. 버저닝(C)은 성능과 무관하고, Express One Zone(D)은 가능하지만 기존 아키텍처 변경이 크다.

**핵심 개념:** S3 Baseline Performance / Prefix

---

### Q4. A company wants to receive S3 event notifications with advanced filtering based on object metadata and send them to multiple downstream services including Step Functions and Kinesis Data Firehose. Which solution is MOST appropriate?
**Options:**
- A) S3 Event Notifications to SNS with message filtering
- B) S3 Event Notifications to SQS with message attributes
- C) S3 Event Notifications with Amazon EventBridge
- D) S3 Event Notifications to Lambda for custom routing

**Answer:** C

**해설:** Amazon EventBridge는 S3 이벤트에 대해 고급 JSON 규칙 기반 필터링(메타데이터, 객체 크기, 이름 등)을 지원하고, Step Functions, Kinesis Streams/Firehose 등 18개 이상의 AWS 서비스를 대상으로 지원한다. SNS(A)와 SQS(B)는 이러한 고급 필터링과 다중 대상을 지원하지 않으며, Lambda(D)는 추가 코드 관리가 필요하다.

**핵심 개념:** S3 Event Notifications with EventBridge

---

### Q5. A company needs to encrypt millions of unencrypted objects in an existing S3 bucket. What is the MOST efficient approach?
**Options:**
- A) Write a script to download each object, encrypt it, and re-upload it
- B) Use S3 Batch Operations to encrypt the objects
- C) Enable default encryption on the bucket and wait for objects to be encrypted
- D) Create a new bucket with encryption and copy all objects

**Answer:** B

**해설:** S3 Batch Operations은 단일 요청으로 수백만 개의 기존 객체에 대한 대량 작업(암호화 포함)을 수행할 수 있다. S3 Inventory로 객체 목록을 얻고 Batch Operations로 암호화할 수 있다. 스크립트(A)는 비효율적이고, 기본 암호화(C)는 기존 객체에 적용되지 않으며, 전체 복사(D)는 불필요한 비용이 든다.

**핵심 개념:** S3 Batch Operations

---

### Q6. A data analytics company wants to share a large dataset stored in S3 with partner companies. The company does not want to pay for the data transfer costs when partners download the data. What should they configure?
**Options:**
- A) S3 Cross-Region Replication to the partner's bucket
- B) S3 Requester Pays
- C) S3 Pre-Signed URLs
- D) S3 Access Points for each partner

**Answer:** B

**해설:** Requester Pays 설정을 활성화하면 데이터 다운로드 비용을 요청자(파트너)가 부담한다. 버킷 소유자는 스토리지 비용만 지불한다. CRR(A)은 별도 복사본을 생성하는 것이고, Pre-Signed URL(C)은 임시 접근 제공이며, Access Points(D)는 보안 관리용이지 비용 분담용이 아니다.

**핵심 개념:** S3 Requester Pays

---

### Q7. A company wants to use S3 Storage Lens to analyze storage usage across their AWS Organization with data retained for 15 months and published to CloudWatch. Which tier of S3 Storage Lens is required?
**Options:**
- A) Free Metrics (default)
- B) Advanced Metrics and Recommendations
- C) S3 Analytics
- D) S3 Inventory

**Answer:** B

**해설:** Free Metrics는 14일간만 데이터를 보존한다. 15개월 데이터 보존과 CloudWatch 게시 기능은 Advanced Metrics and Recommendations(유료)에서만 제공된다. S3 Analytics(C)는 스토리지 클래스 분석용이고, S3 Inventory(D)는 객체 목록 제공용이다.

**핵심 개념:** S3 Storage Lens Free vs Paid

---

### Q8. A company needs to upload large files from their office in Asia to an S3 bucket in us-east-1. They want to maximize upload speed. Which TWO solutions should they use together?
**Options:**
- A) S3 Multi-Part Upload
- B) S3 Transfer Acceleration
- C) S3 Byte-Range Fetches
- D) S3 Requester Pays
- E) S3 Cross-Region Replication

**Answer:** A, B

**해설:** Multi-Part Upload(A)은 큰 파일을 부분으로 나누어 병렬 업로드하여 속도를 높인다. Transfer Acceleration(B)은 파일을 가까운 Edge Location으로 전송한 후 AWS 프라이빗 네트워크를 통해 S3로 전달하여 장거리 전송 속도를 향상시킨다. 두 기능은 함께 사용 가능하다. Byte-Range Fetches(C)는 다운로드용이고, Requester Pays(D)와 CRR(E)은 업로드 속도와 무관하다.

**핵심 개념:** S3 Transfer Acceleration + Multi-Part Upload
---

## S3 Security

---

### Q1. A company needs to encrypt objects in S3 while maintaining full control over encryption keys and being able to audit key usage in AWS CloudTrail. Which encryption method should they use?
**Options:**
- A) SSE-S3
- B) SSE-KMS
- C) SSE-C
- D) Client-Side Encryption

**Answer:** B

**해설:** SSE-KMS는 AWS KMS를 사용하여 키에 대한 사용자 제어를 제공하고 CloudTrail을 통해 키 사용을 감사할 수 있다. SSE-S3(A)는 AWS가 키를 관리하므로 사용자 제어가 없다. SSE-C(C)는 고객 키를 사용하지만 CloudTrail 감사가 불가하다. Client-Side(D)도 CloudTrail 키 감사를 지원하지 않는다.

**핵심 개념:** SSE-KMS

---

### Q2. A company uses SSE-KMS to encrypt objects in S3 and is experiencing throttling during peak upload periods. The KMS quota is being exceeded. What are TWO possible solutions?
**Options:**
- A) Switch to SSE-S3 encryption
- B) Request a KMS quota increase through the Service Quotas Console
- C) Enable S3 Transfer Acceleration
- D) Use S3 Byte-Range Fetches
- E) Implement exponential backoff and retry logic

**Answer:** A, B

**해설:** SSE-KMS는 업로드/다운로드마다 KMS API를 호출하므로 할당량 제한에 걸릴 수 있다. SSE-S3(A)로 전환하면 KMS 호출이 필요 없어진다. 또는 Service Quotas Console(B)에서 KMS 할당량 증가를 요청할 수 있다. Transfer Acceleration(C)과 Byte-Range Fetches(D)는 KMS 할당량과 무관하다.

**핵심 개념:** SSE-KMS Limitation

---

### Q3. A company hosts two S3 static websites. The first website needs to make JavaScript requests to the second website's S3 bucket. Users are getting cross-origin errors. What should be configured?
**Options:**
- A) Enable versioning on both S3 buckets
- B) Configure CORS headers on the second S3 bucket (the one being requested)
- C) Create an S3 bucket policy allowing cross-account access
- D) Enable S3 Transfer Acceleration on both buckets

**Answer:** B

**해설:** Cross-Origin 요청 에러를 해결하려면 요청을 받는 쪽(두 번째 S3 버킷)에 CORS 헤더를 설정해야 한다. `Access-Control-Allow-Origin` 헤더에 첫 번째 웹사이트의 Origin을 지정한다. 버저닝(A), 크로스 계정 정책(C), Transfer Acceleration(D)은 CORS 문제와 관련 없다.

**핵심 개념:** S3 CORS

---

### Q4. A financial services company must store regulatory records in S3 for 7 years. No user, including the root user, should be able to delete or modify these records during the retention period. Which configuration meets this requirement?
**Options:**
- A) S3 Object Lock with Governance mode
- B) S3 Object Lock with Compliance mode
- C) S3 Glacier Vault Lock
- D) S3 bucket policy denying delete actions

**Answer:** B

**해설:** S3 Object Lock의 Compliance 모드는 root 사용자를 포함하여 누구도 객체를 덮어쓰거나 삭제할 수 없다. Governance 모드(A)는 특별 권한 사용자가 삭제 가능하다. Glacier Vault Lock(C)은 Glacier 전용이며, 버킷 정책(D)은 관리자가 변경할 수 있어 규정 준수에 부적합하다.

**핵심 개념:** S3 Object Lock - Compliance Mode

---

### Q5. A company wants to allow a partner organization to temporarily upload files to a specific path in their private S3 bucket without creating IAM users for them. Which solution is MOST appropriate?
**Options:**
- A) Create a bucket policy allowing the partner's AWS account
- B) Generate a pre-signed URL for PUT operations
- C) Make the S3 bucket public temporarily
- D) Create an S3 Access Point for the partner

**Answer:** B

**해설:** Pre-Signed URL을 생성하면 특정 S3 위치에 대한 임시 업로드(PUT) 권한을 부여할 수 있다. URL은 생성자의 권한을 상속하며 만료 시간을 설정할 수 있다. 버킷 정책(A)은 영구적이고, 퍼블릭 설정(C)은 보안 위험이 크며, Access Point(D)는 계정 수준의 접근 관리용이다.

**핵심 개념:** S3 Pre-Signed URLs

---

### Q6. A company wants to ensure that all S3 API requests use HTTPS (encrypted in transit). How should they enforce this?
**Options:**
- A) Enable SSE-S3 encryption on the bucket
- B) Create a bucket policy with a condition denying requests where aws:SecureTransport is false
- C) Enable S3 Transfer Acceleration
- D) Configure the S3 bucket to only expose the HTTPS endpoint

**Answer:** B

**해설:** 버킷 정책에서 `aws:SecureTransport` 조건이 `false`인 요청을 거부하면 HTTPS를 강제할 수 있다. SSE-S3(A)는 저장 시 암호화이지 전송 암호화가 아니다. Transfer Acceleration(C)은 속도 향상용이며, S3는 HTTP 엔드포인트를 개별적으로 비활성화할 수 없다(D).

**핵심 개념:** S3 Encryption in Transit

---

### Q7. A company has different departments (Finance, Sales, Analytics) that need access to specific prefixes in the same S3 bucket with different permissions. They want to simplify permission management. Which feature should they use?
**Options:**
- A) S3 bucket policy with multiple statements
- B) S3 Access Points with separate policies for each department
- C) IAM groups with different S3 permissions
- D) S3 Object Lambda Access Points

**Answer:** B

**해설:** S3 Access Points는 각 부서별로 별도의 DNS 이름과 접근 정책을 가진 진입점을 제공하여 보안 관리를 단순화한다. Finance는 `/finance/` 접두사에, Sales는 `/sales/` 접두사에 접근하는 별도 Access Point를 설정할 수 있다. 복잡한 단일 버킷 정책(A)보다 관리가 쉽다. Object Lambda(D)는 객체 변환용이다.

**핵심 개념:** S3 Access Points

---

### Q8. A company uses S3 to store objects and wants different applications to receive modified versions of the same object. For example, an analytics application needs PII redacted, while a marketing application needs enriched data from an external database. Which solution requires only ONE S3 bucket?
**Options:**
- A) Create two separate S3 buckets with different object versions
- B) Use S3 Object Lambda with different Lambda functions per application
- C) Use S3 replication to create modified copies
- D) Use S3 Batch Operations to create different versions

**Answer:** B

**해설:** S3 Object Lambda를 사용하면 단일 S3 버킷 위에 여러 Object Lambda Access Point를 만들어 각 애플리케이션이 다른 Lambda 함수를 통해 변환된 객체를 받을 수 있다. Analytics용은 PII 삭제 Lambda, Marketing용은 데이터 강화 Lambda를 설정한다. 별도 버킷(A), 복제(C), Batch Operations(D)보다 효율적이다.

**핵심 개념:** S3 Object Lambda
---

## CloudFront & Global Accelerator

---

### Q1. A company hosts a web application on EC2 instances behind an Application Load Balancer. The application serves users globally, and users in distant regions experience high latency. The content includes both static images and dynamic API responses. Which solution will improve performance for ALL users?
**Options:**
- A) Use S3 Cross-Region Replication to copy content to multiple regions
- B) Deploy Amazon CloudFront with the ALB as the origin
- C) Use AWS Global Accelerator with the ALB as the endpoint
- D) Deploy additional ALBs in every AWS region

**Answer:** B

**해설:** CloudFront는 정적 콘텐츠(캐싱)와 동적 콘텐츠(API 가속) 모두에 대해 성능을 향상시킨다. Global Accelerator(C)도 성능을 개선하지만 캐싱 기능이 없어 정적 콘텐츠에 대한 최적화가 부족하다. S3 Cross-Region Replication(A)은 S3 객체만 해당되며 동적 API에는 적용 불가하다.

**핵심 개념:** CloudFront Origins, 동적/정적 콘텐츠 전송

### Q2. A company stores confidential documents in an S3 bucket and wants to distribute them globally via CloudFront. The documents must NOT be accessible directly from the S3 bucket URL. What should the solutions architect do?
**Options:**
- A) Configure S3 bucket as a static website and use CloudFront
- B) Use CloudFront with Origin Access Control (OAC) and update the S3 bucket policy
- C) Enable S3 Transfer Acceleration and share pre-signed URLs
- D) Use AWS Global Accelerator pointing to the S3 bucket

**Answer:** B

**해설:** OAC(Origin Access Control)를 설정하고 S3 버킷 정책을 CloudFront 배포에서만 접근하도록 업데이트하면 S3 URL 직접 접근이 차단된다. A는 퍼블릭 접근이 필요하고, C는 CloudFront를 사용하지 않으며, D는 S3 배포용이 아니다.

**핵심 개념:** CloudFront OAC, S3 버킷 정책

### Q3. A gaming company is deploying a multiplayer game that uses UDP protocol. Players around the world experience high latency. The company needs a solution that provides static IP addresses and fast regional failover. Which AWS service should they use?
**Options:**
- A) Amazon CloudFront
- B) Amazon Route 53 with latency-based routing
- C) AWS Global Accelerator
- D) Application Load Balancer with cross-zone load balancing

**Answer:** C

**해설:** Global Accelerator는 UDP와 같은 비HTTP 프로토콜을 지원하며, 2개의 고정 Anycast IP와 빠른 리전 장애 조치를 제공한다. CloudFront(A)는 HTTP/HTTPS에 최적화되어 있고 UDP를 지원하지 않는다. Route 53(B)는 DNS 기반이므로 클라이언트 캐시 문제가 있을 수 있다.

**핵심 개념:** Global Accelerator, 비HTTP 프로토콜 (UDP, MQTT, VoIP)

### Q4. A company has deployed a new version of their website. CloudFront is serving stale content from the previous version. The TTL is set to 24 hours. What is the FASTEST way to ensure users see the updated content?
**Options:**
- A) Wait for the TTL to expire
- B) Create a new CloudFront distribution
- C) Perform a CloudFront cache invalidation
- D) Reduce the TTL to 0 seconds

**Answer:** C

**해설:** Cache Invalidation을 수행하면 TTL을 우회하여 즉시 캐시를 갱신할 수 있다. 전체(`/*`) 또는 특정 경로(`/images/*`)를 무효화할 수 있다. A는 24시간을 기다려야 하고, B는 불필요한 재배포이며, D는 향후 모든 요청에 캐싱이 적용되지 않아 성능이 저하된다.

**핵심 개념:** CloudFront Cache Invalidation

### Q5. A company wants to deliver content from applications hosted in private subnets of their VPC through CloudFront, without exposing them to the internet. Which CloudFront feature should they use?
**Options:**
- A) Origin Access Control (OAC)
- B) CloudFront Signed URLs
- C) VPC Origin
- D) AWS PrivateLink

**Answer:** C

**해설:** CloudFront VPC Origin을 사용하면 VPC 프라이빗 서브넷의 Private ALB, NLB, EC2에 인터넷에 노출하지 않고 접근할 수 있다. OAC(A)는 S3 Origin 보안용이다. Signed URLs(B)는 콘텐츠 접근 제어용이며, PrivateLink(D)는 CloudFront와의 직접 통합 기능이 아니다.

**핵심 개념:** CloudFront VPC Origin

### Q6. A solutions architect needs to improve the availability of a global application. The application must have fast failover (less than 1 minute) and the company's firewall only allows whitelisting a small number of static IP addresses. Which solution meets these requirements?
**Options:**
- A) Amazon CloudFront with multiple origins
- B) AWS Global Accelerator with health checks
- C) Amazon Route 53 with health checks and failover routing
- D) Application Load Balancer with cross-region load balancing

**Answer:** B

**해설:** Global Accelerator는 2개의 고정 Anycast IP(화이트리스트 용이)를 제공하고, Health Check로 1분 미만의 장애 조치가 가능하다. CloudFront(A)는 수백 개의 IP를 사용하므로 화이트리스트에 부적합하고, Route 53(B)는 DNS TTL 때문에 빠른 장애 조치가 어려울 수 있다.

**핵심 개념:** Global Accelerator, 고정 IP, Health Check
---

## Storage Extras

---

### Q1. A company needs to migrate 80 TB of data from their on-premises data center to Amazon S3. The company has a 1 Gbps internet connection, but it cannot be fully utilized due to other business traffic. The data must be migrated within 2 weeks. What is the MOST cost-effective solution?
**Options:**
- A) Use AWS DataSync over the existing internet connection
- B) Set up an AWS Direct Connect connection and transfer the data
- C) Order an AWS Snowball Edge Storage Optimized device
- D) Use S3 Transfer Acceleration with multipart upload

**Answer:** C

**해설:** 1Gbps에서 80TB 전송은 이론적으로 약 8일이지만 전체 대역폭을 사용할 수 없으므로 2주 내 완료가 불확실하다. Snowball Edge Storage Optimized(210TB)를 사용하면 물리적으로 데이터를 전송할 수 있어 가장 안정적이고 비용 효율적이다. Direct Connect(B)는 설정에 수주~수개월이 걸린다.

**핵심 개념:** AWS Snowball, 데이터 마이그레이션 시간 계산

### Q2. A company wants to import data from Snowball directly into Amazon S3 Glacier for long-term archival. What is the correct approach?
**Options:**
- A) Configure Snowball to import directly into S3 Glacier
- B) Import data into S3 Standard first, then use an S3 Lifecycle Policy to transition to Glacier
- C) Use AWS DataSync to transfer from Snowball to Glacier
- D) Import data into EBS volumes, then create snapshots stored in Glacier

**Answer:** B

**해설:** Snowball은 S3 Glacier에 직접 import할 수 없다. 반드시 S3에 먼저 import한 후 S3 Lifecycle Policy를 사용하여 Glacier로 전환해야 한다. 이것은 시험에서 자주 출제되는 중요한 제한 사항이다.

**핵심 개념:** Snowball -> S3 -> Lifecycle Policy -> Glacier

### Q3. A company is running a high-performance computing (HPC) workload that requires a shared file system with sub-millisecond latency. The data is stored in S3 and needs to be processed by hundreds of EC2 instances. Which storage solution is MOST appropriate?
**Options:**
- A) Amazon EFS with Max I/O performance mode
- B) Amazon FSx for Lustre with S3 integration
- C) Amazon FSx for Windows File Server
- D) Amazon S3 with S3 Select

**Answer:** B

**해설:** FSx for Lustre는 HPC 워크로드를 위한 병렬 분산 파일 시스템으로, sub-ms 지연, 수백만 IOPS를 제공하며 S3와 seamless하게 통합된다. S3 데이터를 FSx for Lustre 파일 시스템으로 읽고 처리 결과를 다시 S3에 쓸 수 있다. EFS(A)도 공유 파일 시스템이지만 HPC에 최적화되어 있지 않다.

**핵심 개념:** FSx for Lustre, S3 통합, HPC

### Q4. A company is migrating their on-premises Windows file server to AWS. The application uses SMB protocol and authenticates users through Microsoft Active Directory. Which AWS service should they use?
**Options:**
- A) Amazon EFS
- B) Amazon FSx for Lustre
- C) Amazon FSx for Windows File Server
- D) Amazon S3 with S3 File Gateway

**Answer:** C

**해설:** FSx for Windows File Server는 SMB 프로토콜과 Windows NTFS를 지원하며 Microsoft Active Directory와 통합된다. EFS(A)는 NFS 프로토콜(Linux)이고, FSx for Lustre(B)는 HPC용이다. S3 File Gateway(D)는 NFS/SMB로 S3에 접근하지만 Windows 파일 서버의 모든 기능(DFS, ACL 등)을 제공하지 않는다.

**핵심 개념:** FSx for Windows File Server, SMB, Active Directory

### Q5. A company needs to provide on-premises applications with low-latency access to frequently used data while storing the full dataset in Amazon S3. Which solution should the solutions architect recommend?
**Options:**
- A) AWS DataSync with scheduled synchronization
- B) Amazon S3 File Gateway with local caching
- C) AWS Snowball Edge with S3 interface
- D) Amazon FSx for NetApp ONTAP

**Answer:** B

**해설:** S3 File Gateway는 NFS/SMB 프로토콜로 S3 버킷에 접근하면서 최근 사용 데이터를 로컬에 캐싱하여 저지연 접근을 제공한다. DataSync(A)는 예약 기반 데이터 동기화 서비스로 지속적 캐시를 제공하지 않는다. Snowball(C)은 일회성 데이터 전송용이다.

**핵심 개념:** S3 File Gateway, 로컬 캐시

### Q6. A company needs to transfer files to Amazon S3 using SFTP protocol. External partners must authenticate using their existing corporate LDAP directory. Which AWS service meets this requirement?
**Options:**
- A) Amazon S3 with pre-signed URLs
- B) AWS Transfer Family
- C) AWS DataSync
- D) Amazon S3 File Gateway

**Answer:** B

**해설:** AWS Transfer Family는 SFTP/FTPS/FTP 프로토콜을 통한 S3/EFS 파일 전송을 지원하며, LDAP, Active Directory, Okta, Cognito 등 외부 인증 시스템과 통합된다. Pre-signed URLs(A)는 SFTP를 지원하지 않고, DataSync(C)는 대용량 데이터 동기화용이다.

**핵심 개념:** AWS Transfer Family, SFTP, 외부 인증 통합

### Q7. A company needs to synchronize data from their on-premises NFS server to Amazon EFS on a daily schedule. File permissions must be preserved during the transfer. Which AWS service should they use?
**Options:**
- A) AWS Storage Gateway
- B) AWS Transfer Family
- C) AWS DataSync
- D) AWS Snowball Edge

**Answer:** C

**해설:** AWS DataSync는 온프레미스에서 AWS로 대용량 데이터 이동을 지원하며, 시간/일/주 단위 예약 동기화가 가능하고, NFS POSIX 파일 권한 및 메타데이터를 보존한다. S3, EFS, FSx 등 다양한 대상을 지원한다. Storage Gateway(A)는 지속적 하이브리드 접근용이며 예약 동기화 기능이 아니다.

**핵심 개념:** AWS DataSync, 예약 동기화, 메타데이터 보존

### Q8. A company needs a file system that supports NFS, SMB, and iSCSI protocols simultaneously, and must work with Linux, Windows, MacOS, and VMware Cloud on AWS. Which FSx option should they choose?
**Options:**
- A) Amazon FSx for Windows File Server
- B) Amazon FSx for Lustre
- C) Amazon FSx for NetApp ONTAP
- D) Amazon FSx for OpenZFS

**Answer:** C

**해설:** FSx for NetApp ONTAP은 NFS, SMB, iSCSI 프로토콜을 모두 지원하며, Linux, Windows, MacOS, VMware Cloud on AWS, WorkSpaces, EC2/ECS/EKS와 호환된다. 가장 넓은 OS 및 프로토콜 호환성을 제공한다. FSx for Windows(A)는 SMB만, FSx for OpenZFS(D)는 NFS만 지원한다.

**핵심 개념:** FSx for NetApp ONTAP, 멀티 프로토콜 지원
---

## Integration & Messaging

---

### Q1. A company has an e-commerce application that processes orders. When a new order is placed, it must be processed by three separate services: inventory management, payment processing, and shipping notification. Each service must receive every order. What architecture should the solutions architect recommend?
**Options:**
- A) Use Amazon SQS with three consumers polling the same queue
- B) Use Amazon SNS topic with three SQS queue subscriptions (Fan Out pattern)
- C) Use Amazon Kinesis Data Streams with three consumers
- D) Use Amazon MQ with three queue consumers

**Answer:** B

**해설:** SNS + SQS Fan Out 패턴을 사용하면 SNS 토픽에 한 번 publish하고 구독된 3개의 SQS 큐 모두 메시지를 수신한다. SQS 하나에 3개 Consumer(A)는 각 메시지가 하나의 Consumer에만 전달되므로 부적합하다. Kinesis(C)도 가능하지만 이 단순한 시나리오에서는 SNS+SQS가 더 적합하다.

**핵심 개념:** SNS + SQS Fan Out 패턴

### Q2. A company is processing real-time clickstream data from their website. They need to store the data for 7 days and allow multiple consumers to replay the data for analysis. Which service should they use?
**Options:**
- A) Amazon SQS Standard Queue
- B) Amazon SNS
- C) Amazon Kinesis Data Streams
- D) Amazon Data Firehose

**Answer:** C

**해설:** Kinesis Data Streams는 최대 365일 데이터 보존, 실시간 처리, 데이터 재처리(replay) 기능을 제공한다. SQS(A)는 소비 후 삭제되어 replay 불가, SNS(B)는 데이터를 저장하지 않고, Data Firehose(D)는 데이터를 저장하지 않으며 replay를 지원하지 않는다.

**핵심 개념:** Kinesis Data Streams, 데이터 보존, Replay

### Q3. A company wants to migrate their on-premises application to AWS. The application uses RabbitMQ with AMQP protocol. The company wants minimal code changes. Which AWS service should they use?
**Options:**
- A) Amazon SQS
- B) Amazon SNS
- C) Amazon Kinesis
- D) Amazon MQ

**Answer:** D

**해설:** Amazon MQ는 AMQP, MQTT, STOMP 등 오픈 프로토콜을 지원하는 관리형 메시지 브로커로, 기존 온프레미스 애플리케이션을 코드 변경 없이 마이그레이션할 수 있다. SQS/SNS(A, B)는 AWS 고유 프로토콜을 사용하므로 코드 재작성이 필요하다.

**핵심 개념:** Amazon MQ, 오픈 프로토콜 마이그레이션

### Q4. A company wants to load streaming data into Amazon S3 and Amazon Redshift. The data needs minor transformations (CSV to JSON). The solution must be fully managed with automatic scaling. Which service should they use?
**Options:**
- A) Amazon Kinesis Data Streams with Lambda consumer
- B) Amazon Data Firehose with Lambda transformation
- C) Amazon SQS with EC2-based consumer application
- D) Amazon SNS with S3 subscription

**Answer:** B

**해설:** Amazon Data Firehose는 완전 관리형으로 S3, Redshift, OpenSearch 등에 스트리밍 데이터를 로드할 수 있으며, Lambda를 사용한 커스텀 데이터 변환(CSV->JSON)을 지원한다. 자동 스케일링, 서버리스이다. Kinesis Data Streams(A)는 Consumer 코드를 직접 관리해야 한다.

**핵심 개념:** Amazon Data Firehose, Lambda 변환, 서버리스

### Q5. An application uses Amazon SQS Standard Queue. Messages are sometimes processed more than once, causing duplicate records in the database. The company needs messages to be processed exactly once and in order. What should they do?
**Options:**
- A) Enable Long Polling on the SQS Standard Queue
- B) Increase the Visibility Timeout to prevent duplicates
- C) Migrate to an SQS FIFO Queue
- D) Use SNS instead of SQS

**Answer:** C

**해설:** SQS FIFO 큐는 exactly-once 전송(Deduplication ID로 중복 제거)과 순서 보장을 제공한다. Standard 큐에서 Long Polling(A)이나 Visibility Timeout 증가(B)는 중복을 완전히 제거하지 못한다. SNS(D)는 Pub/Sub이며 큐 기능이 아니다.

**핵심 개념:** SQS FIFO, Exactly-once, 순서 보장

### Q6. A development team is using Amazon SQS. Consumers are making too many empty API calls, increasing costs. What should the team implement to reduce the number of API calls?
**Options:**
- A) Increase the message visibility timeout
- B) Enable Long Polling with WaitTimeSeconds of 20 seconds
- C) Use SQS FIFO Queue instead
- D) Decrease the batch size to 1 message

**Answer:** B

**해설:** Long Polling은 큐에 메시지가 없을 때 메시지 도착을 대기(1-20초)하므로 빈 응답(empty receive)에 대한 API 호출 수를 크게 줄인다. 20초가 권장값이다. Visibility Timeout(A)은 메시지 가시성 관련이며 API 호출 수와 무관하다.

**핵심 개념:** SQS Long Polling, WaitTimeSeconds

### Q7. A company receives S3 event notifications when objects are created. They need to send each event to three different SQS queues for parallel processing. For a specific event type and prefix combination, S3 only supports one event rule. How should this be designed?
**Options:**
- A) Create three separate S3 event notification rules for each queue
- B) Use S3 event notification to send to an SNS topic, which fans out to three SQS queues
- C) Use Lambda function triggered by S3 to send messages to three queues
- D) Use Amazon EventBridge to route S3 events to three queues

**Answer:** B

**해설:** 동일 이벤트 타입+프리픽스 조합에 S3 이벤트 규칙은 하나만 가능하므로, SNS 토픽으로 보낸 후 3개의 SQS 큐를 구독시키는 Fan Out 패턴이 가장 적합하다. A는 동일 조합에 3개 규칙을 만들 수 없다. D도 가능하지만 SNS Fan Out이 가장 일반적인 패턴이다.

**핵심 개념:** S3 Events + SNS Fan Out
---

## Containers on AWS

---

### Q1. A company is running a containerized application on Amazon ECS with the EC2 launch type. Each task needs to access a specific S3 bucket and DynamoDB table. What is the BEST way to grant permissions to the containers?
**Options:**
- A) Attach IAM policies to the EC2 Instance Profile
- B) Define an ECS Task Role with the required permissions in the task definition
- C) Store AWS credentials in environment variables of the container
- D) Use AWS Secrets Manager to store access keys

**Answer:** B

**해설:** ECS Task Role은 태스크 정의에서 설정되며, 각 태스크에 필요한 최소 권한을 부여할 수 있다. EC2 Instance Profile(A)은 ECS Agent용이며 모든 태스크에 동일한 권한이 적용된다. 환경변수에 자격증명 저장(C)은 보안 모범 사례에 위배된다.

**핵심 개념:** ECS Task Role vs EC2 Instance Profile

### Q2. A company wants to run containers on AWS without managing any servers or EC2 instances. They need persistent shared storage across multiple containers in different Availability Zones. Which combination of services meets this requirement?
**Options:**
- A) Amazon ECS with Fargate launch type and Amazon EBS volumes
- B) Amazon ECS with Fargate launch type and Amazon EFS
- C) Amazon EKS with EC2 launch type and Amazon S3
- D) Amazon ECS with EC2 launch type and instance store

**Answer:** B

**해설:** Fargate는 서버리스 컨테이너이며, EFS는 Multi-AZ 공유 스토리지를 제공한다. Fargate + EFS = 서버리스 + 영속 스토리지 조합이다. EBS(A)는 단일 AZ에 종속되고, S3(C)는 파일 시스템으로 마운트 불가하며, Instance Store(D)는 EC2 관리가 필요하다.

**핵심 개념:** Fargate + EFS = 서버리스 영속 스토리지

### Q3. A company is using Kubernetes on-premises and wants to migrate to AWS with minimal changes to their existing Kubernetes configurations and tooling. Which AWS service should they use?
**Options:**
- A) Amazon ECS with EC2 launch type
- B) Amazon ECS with Fargate launch type
- C) Amazon EKS
- D) AWS App Runner

**Answer:** C

**해설:** Amazon EKS는 관리형 Kubernetes 서비스로, 기존 Kubernetes 설정과 도구를 최소한의 변경으로 AWS에서 사용할 수 있다. ECS(A, B)는 AWS 고유 API를 사용하므로 Kubernetes 워크로드를 재작성해야 한다. App Runner(D)는 단순 배포용이다.

**핵심 개념:** Amazon EKS, Kubernetes 마이그레이션

### Q4. A company is running ECS with the EC2 launch type. During peak hours, ECS tasks are pending because there are not enough EC2 instances in the cluster. What is the recommended solution to automatically add EC2 instances?
**Options:**
- A) Manually add EC2 instances to the ECS cluster
- B) Use ECS Cluster Capacity Provider paired with an Auto Scaling Group
- C) Switch to Fargate launch type
- D) Increase the desired count of the ECS service

**Answer:** B

**해설:** ECS Cluster Capacity Provider는 ASG와 연동하여 ECS 태스크에 필요한 CPU/RAM이 부족할 때 자동으로 EC2 인스턴스를 추가한다. Fargate(C)도 해결책이지만 "EC2 Launch Type을 유지"하는 맥락에서 Capacity Provider가 가장 적합하다. D는 태스크 수만 늘리고 인스턴스는 추가하지 않는다.

**핵심 개념:** ECS Cluster Capacity Provider

### Q5. A development team wants to deploy a simple web API as a container on AWS. They have no infrastructure experience and want the simplest possible deployment with automatic scaling. Which service should they use?
**Options:**
- A) Amazon ECS with Fargate
- B) Amazon EKS with Managed Node Groups
- C) AWS App Runner
- D) Amazon EC2 with Docker installed

**Answer:** C

**해설:** AWS App Runner는 인프라 경험 없이도 소스 코드나 컨테이너 이미지에서 웹 앱/API를 가장 간단하게 배포할 수 있는 서비스이다. 자동 빌드, 배포, 스케일링, 로드 밸런서, 암호화를 모두 제공한다. Fargate(A)도 서버리스이지만 ECS 클러스터, 태스크 정의 등 더 많은 설정이 필요하다.

**핵심 개념:** AWS App Runner, 간단한 컨테이너 배포

### Q6. A company needs to pull container images from Amazon ECR but is getting authorization errors. What should the solutions architect check?
**Options:**
- A) The ECR repository's encryption settings
- B) The IAM policy attached to the EC2 instance or ECS task role
- C) The VPC security group rules
- D) The ECR image scanning configuration

**Answer:** B

**해설:** ECR 접근은 IAM으로 제어된다. 권한 오류(permission error)가 발생하면 EC2 Instance Profile 또는 ECS Task Role에 ECR 관련 IAM 정책(ecr:GetAuthorizationToken, ecr:BatchGetImage 등)이 올바르게 설정되어 있는지 확인해야 한다.

**핵심 개념:** ECR IAM 접근 제어

### Q7. A company wants to migrate their Java web applications running on VMware to AWS containers. They want to generate CloudFormation templates and CI/CD pipelines with minimal code changes. Which tool should they use?
**Options:**
- A) AWS App Runner
- B) AWS Copilot CLI
- C) AWS App2Container (A2C)
- D) AWS Migration Hub

**Answer:** C

**해설:** AWS App2Container(A2C)는 Java/.NET 웹 앱을 Docker 컨테이너로 마이그레이션하는 CLI 도구로, 코드 변경 없이 앱 분석, 컨테이너화, CloudFormation 템플릿 생성, CI/CD 파이프라인 설정, ECR/ECS/EKS/App Runner 배포를 지원한다.

**핵심 개념:** AWS App2Container, 레거시 앱 컨테이너화
---

## Serverless Overview

---

### Q1. A company has a Lambda function that processes files uploaded to S3. During peak hours, users report that some files are not processed. The function takes about 2 minutes to complete. CloudWatch logs show ThrottleError (429). What should the solutions architect do?
**Options:**
- A) Increase the Lambda function timeout to 15 minutes
- B) Request a concurrency limit increase through AWS Support
- C) Switch to Amazon EC2 instances for processing
- D) Reduce the Lambda function memory allocation

**Answer:** B

**해설:** ThrottleError 429는 동시 실행 제한(기본 1,000)에 도달했음을 의미한다. AWS Support에 동시성 제한 증가를 요청해야 한다. 실행 시간(A)은 2분으로 충분하며, 메모리 감소(D)는 문제를 악화시킬 수 있다. EC2(C)는 서버리스 이점을 포기하는 것이다.

**핵심 개념:** Lambda Concurrency, Throttling

### Q2. A company needs to run a data processing job that takes 30 minutes to complete. They want a serverless solution. Which service should they use?
**Options:**
- A) AWS Lambda
- B) AWS Fargate with Amazon ECS
- C) Amazon EC2 Spot Instances
- D) AWS Batch on EC2

**Answer:** B

**해설:** Lambda의 최대 실행 시간은 15분이므로 30분 작업에는 사용할 수 없다. Fargate + ECS는 서버리스이면서 실행 시간 제한이 없어 적합하다. EC2(C)와 Batch on EC2(D)는 서버리스가 아니다.

**핵심 개념:** Lambda 최대 실행 시간 15분 제한

### Q3. A company has a DynamoDB table that is used globally. Users in the US and Europe need low-latency read and write access. What feature should they enable?
**Options:**
- A) DynamoDB DAX
- B) DynamoDB Global Tables
- C) DynamoDB On-Demand capacity mode
- D) DynamoDB Point-in-Time Recovery

**Answer:** B

**해설:** DynamoDB Global Tables는 다중 리전에서 Active-Active 복제를 제공하여 US와 Europe 사용자 모두 저지연 읽기/쓰기가 가능하다. DynamoDB Streams를 활성화해야 한다. DAX(A)는 단일 리전 캐시이고, On-Demand(C)는 용량 모드이다.

**핵심 개념:** DynamoDB Global Tables, Active-Active 복제

### Q4. A company has a public-facing REST API using API Gateway. They need to authenticate mobile app users. The users sign up with email/password and can also log in with their Facebook accounts. Which service should they use for authentication?
**Options:**
- A) IAM Users and Groups
- B) Amazon Cognito User Pools
- C) API Gateway API Keys
- D) AWS IAM Identity Center (SSO)

**Answer:** B

**해설:** Cognito User Pools는 이메일/비밀번호 로그인과 Facebook, Google 등 소셜 로그인(페더레이션 인증)을 지원하며, API Gateway와 직접 통합된다. IAM(A)은 내부 사용자용, API Keys(C)는 인증이 아닌 사용량 제어, SSO(D)는 기업 내부 사용자용이다.

**핵심 개념:** Cognito User Pools, 페더레이션 인증

### Q5. A mobile application needs to allow authenticated users to upload files directly to their own folder in an S3 bucket. Users authenticate through Cognito User Pools. How should the solutions architect provide S3 access?
**Options:**
- A) Generate IAM users for each mobile app user
- B) Use Cognito Identity Pools to provide temporary AWS credentials with IAM policies scoped to the user's folder
- C) Create pre-signed URLs for each upload
- D) Make the S3 bucket public with folder-level ACLs

**Answer:** B

**해설:** Cognito Identity Pools는 Cognito User Pools로 인증된 사용자에게 임시 AWS 자격증명을 제공하며, user_id 기반으로 S3 폴더 접근 권한을 세밀하게 제어할 수 있다. IAM 사용자(A)는 모바일 사용자에 적합하지 않고, 퍼블릭 버킷(D)은 보안 위험이다.

**핵심 개념:** Cognito Identity Pools, 임시 AWS 자격증명

### Q6. A company wants to customize CloudFront responses by adding security headers to every response. The function must handle millions of requests per second with sub-millisecond latency. Which solution is MOST appropriate?
**Options:**
- A) Lambda@Edge function triggered on Viewer Response
- B) CloudFront Functions triggered on Viewer Response
- C) AWS WAF custom rules on CloudFront
- D) Origin server middleware to add headers

**Answer:** B

**해설:** CloudFront Functions는 수백만 요청/초를 sub-ms 지연으로 처리할 수 있으며, 헤더 조작은 CloudFront Functions의 대표적 사용 사례이다. Lambda@Edge(A)도 가능하지만 수천 요청/초로 처리량이 낮고 비용이 더 높다.

**핵심 개념:** CloudFront Functions, Viewer Response, 헤더 조작

### Q7. A Lambda function needs to connect to an RDS PostgreSQL database in a VPC. During traffic spikes, the database becomes overwhelmed with too many connections. What is the BEST solution?
**Options:**
- A) Increase the RDS instance size
- B) Deploy the Lambda function in the VPC and use RDS Proxy
- C) Use DynamoDB instead of RDS
- D) Implement connection caching in the Lambda function code

**Answer:** B

**해설:** RDS Proxy는 연결 풀링/공유로 DB 연결 수를 줄이고, 장애 조치 시간을 66% 감소시키며, IAM 인증과 Secrets Manager를 통한 보안을 제공한다. Lambda는 VPC에 배포되어야 하며 RDS Proxy는 퍼블릭 접근이 불가능하다.

**핵심 개념:** Lambda + RDS Proxy, VPC 배포

### Q8. A DynamoDB table has many read operations but few write operations. The application requires microsecond latency for read operations. Which caching solution should be used?
**Options:**
- A) Amazon ElastiCache Redis
- B) DynamoDB Accelerator (DAX)
- C) Amazon CloudFront
- D) API Gateway caching

**Answer:** B

**해설:** DAX는 DynamoDB 전용 인메모리 캐시로 마이크로초 지연을 제공하며, 기존 DynamoDB API와 호환되어 앱 코드 변경이 불필요하다. ElastiCache(A)는 집계 결과 저장에 더 적합하고, CloudFront(C)와 API Gateway 캐싱(D)은 API 레벨 캐싱이다.

**핵심 개념:** DynamoDB Accelerator (DAX), 마이크로초 캐시
---

## Serverless Architectures

---

### Q1. A company is building a mobile application where users need to authenticate and then directly upload files to their own folder in an S3 bucket. The solution must be serverless and scalable. Which combination of services should the solutions architect use?
**Options:**
- A) IAM users for each mobile user with S3 bucket policies
- B) Amazon Cognito User Pools for authentication and Cognito Identity Pools for temporary AWS credentials to access S3
- C) API Gateway with Lambda to proxy all S3 uploads
- D) CloudFront signed URLs for S3 access

**Answer:** B

**해설:** Cognito User Pools로 사용자 인증 후, Cognito Identity Pools에서 임시 AWS 자격증명을 발급받아 user_id 기반으로 S3 폴더 접근 권한을 제한할 수 있다. 이것이 AWS의 권장 서버리스 패턴이다. IAM 사용자(A)는 모바일 앱에서 확장이 불가하고, Lambda 프록시(C)는 불필요한 복잡성을 추가한다.

**핵심 개념:** Cognito User Pools + Identity Pools, S3 직접 접근

### Q2. A serverless blog website uses DynamoDB as the database. Most operations are reads, and users report slow response times. The architecture uses API Gateway -> Lambda -> DynamoDB. What TWO caching strategies should be implemented to improve performance? (Select TWO)
**Options:**
- A) Enable ElastiCache Redis cluster
- B) Enable DynamoDB Accelerator (DAX) for database caching
- C) Enable API Gateway response caching
- D) Use S3 as a caching layer
- E) Increase DynamoDB read capacity units

**Answer:** B, C

**해설:** DAX(B)는 DynamoDB 전용 인메모리 캐시로 마이크로초 지연을 제공하여 DB 읽기 부하를 줄인다. API Gateway 응답 캐싱(C)은 API 레벨에서 반복 요청을 캐싱한다. 두 레이어의 캐싱을 함께 사용하면 최적의 읽기 성능을 얻을 수 있다. RCU 증가(E)는 캐싱보다 비용이 높다.

**핵심 개념:** DAX + API Gateway 캐싱 (이중 캐싱)

### Q3. A company wants to build a globally distributed serverless website. Static content (HTML, CSS, JS) must be served with low latency worldwide. The S3 bucket must not be publicly accessible. Which architecture should the solutions architect implement?
**Options:**
- A) S3 with static website hosting enabled and public access
- B) CloudFront distribution with S3 as origin, using Origin Access Control (OAC) and S3 bucket policy
- C) S3 Cross-Region Replication to multiple regions
- D) Global Accelerator pointing to S3 buckets in multiple regions

**Answer:** B

**해설:** CloudFront + S3 + OAC 조합은 서버리스 정적 웹사이트의 표준 패턴이다. OAC를 설정하고 S3 버킷 정책에서 CloudFront 배포에서만 접근을 허용하면, S3 버킷은 퍼블릭이 아니면서 전 세계에 저지연으로 콘텐츠를 제공할 수 있다.

**핵심 개념:** CloudFront + S3 + OAC, 정적 웹사이트

### Q4. A company runs an application on EC2 instances that periodically distributes large software updates. During releases, the traffic spikes cause high EC2 costs. The company wants to reduce costs WITHOUT modifying the application. What should the solutions architect recommend?
**Options:**
- A) Migrate the application to AWS Lambda
- B) Place Amazon CloudFront in front of the existing application
- C) Use S3 Transfer Acceleration for faster downloads
- D) Scale up to larger EC2 instances during releases

**Answer:** B

**해설:** CloudFront를 기존 앱 앞에 배치하면 정적 소프트웨어 업데이트 파일을 Edge에서 캐싱하여 EC2 부하를 크게 줄일 수 있다. 앱 변경이 필요 없으며, ASG 스케일링 감소로 EC2 비용이 절감되고 네트워크 대역폭 비용도 절약된다. Lambda(A)는 앱 재작성이 필요하다.

**핵심 개념:** CloudFront 오프로딩, 기존 앱 변경 없이 비용 최적화

### Q5. A serverless application uses DynamoDB Global Tables for multi-region data access. When a new user registers, the application should send a welcome email. What is the BEST serverless approach to trigger the email?
**Options:**
- A) Use a CloudWatch Event rule to monitor DynamoDB
- B) Enable DynamoDB Streams and trigger a Lambda function that sends email via Amazon SES
- C) Use API Gateway to trigger an SNS notification after user registration
- D) Schedule a Lambda function to periodically scan the DynamoDB table for new users

**Answer:** B

**해설:** DynamoDB Streams는 테이블의 아이템 변경(생성/수정/삭제)을 순서대로 캡처한다. 새 사용자 등록(INSERT) 이벤트가 Stream에 기록되면 Lambda 함수가 트리거되어 Amazon SES를 통해 환영 이메일을 보낼 수 있다. 이것이 완전 서버리스 이벤트 기반 패턴이다. 주기적 스캔(D)은 비효율적이다.

**핵심 개념:** DynamoDB Streams -> Lambda -> SES

### Q6. A company is designing a microservices architecture. Service A processes orders synchronously, Service B handles analytics asynchronously from order events, and Service C sends email notifications for each order. What is the BEST architecture?
**Options:**
- A) Service A sends messages directly to Service B and Service C
- B) Service A publishes to an SNS topic, Service B subscribes via SQS queue, Service C subscribes via SQS queue
- C) Service A writes to a Kinesis Data Stream consumed by Service B and Service C
- D) Service A stores data in S3, Service B and Service C poll S3 for new files

**Answer:** B

**해설:** SNS + SQS Fan Out 패턴을 사용하면 Service A가 SNS에 한 번 publish하고, Service B와 C가 각각의 SQS 큐를 통해 독립적으로 메시지를 처리할 수 있다. 완전 디커플링되어 서비스 추가/제거가 용이하고, SQS의 재시도/영속성도 활용 가능하다. 직접 연결(A)은 서비스 간 결합도가 높다.

**핵심 개념:** 마이크로서비스, SNS + SQS Fan Out

### Q7. A company needs to process images uploaded to S3 by generating thumbnails. The processing takes about 30 seconds per image. During peak hours, thousands of images are uploaded per minute. Which serverless architecture is MOST appropriate?
**Options:**
- A) S3 Event Notification -> Lambda function to generate thumbnails
- B) S3 Event Notification -> SQS Queue -> EC2 instances to process
- C) CloudWatch Events -> Step Functions -> Lambda
- D) S3 Event Notification -> SNS -> Email notification

**Answer:** A

**해설:** S3 이벤트로 Lambda 함수를 트리거하여 썸네일을 생성하는 것이 표준 서버리스 패턴이다. 30초 실행 시간은 Lambda의 15분 제한 내이며, Lambda는 자동으로 수천 개의 동시 호출로 스케일링된다. SQS + EC2(B)는 서버리스가 아니다. 생성된 썸네일은 다시 S3에 저장하고, 필요 시 SQS/SNS로 알림을 보낼 수 있다.

**핵심 개념:** S3 이벤트 -> Lambda, 이미지 처리
---

## Databases in AWS

---

### Q1. A company needs to migrate their on-premises MongoDB database to AWS with minimal application code changes. The database stores JSON documents and requires high availability across multiple Availability Zones. Which AWS database service should they use?
**Options:**
- A) Amazon RDS for MongoDB
- B) Amazon DynamoDB
- C) Amazon DocumentDB
- D) Amazon Neptune

**Answer:** C

**해설:** Amazon DocumentDB는 MongoDB 호환 관리형 데이터베이스 서비스로, MongoDB API와 호환되므로 최소한의 코드 변경으로 마이그레이션할 수 있다. 3개 AZ에 걸친 복제로 고가용성을 제공한다. A는 존재하지 않는 서비스이고, B는 NoSQL이지만 MongoDB 호환이 아니며, D는 그래프 데이터베이스이다.

**핵심 개념:** Amazon DocumentDB

### Q2. A startup is building a serverless application that requires a database with single-digit millisecond latency. The application traffic is unpredictable, and the team wants to avoid capacity planning. Which database configuration is MOST suitable?
**Options:**
- A) Amazon RDS with Multi-AZ
- B) Amazon Aurora Serverless
- C) Amazon DynamoDB with on-demand capacity
- D) Amazon ElastiCache with Redis

**Answer:** C

**해설:** DynamoDB는 서버리스 NoSQL 데이터베이스로 밀리초 지연 시간을 제공하며, 온디맨드 용량 모드를 사용하면 용량 계획이 불필요하다. Aurora Serverless도 서버리스이지만 RDBMS이며 문제에서 NoSQL 특성(밀리초 지연, 서버리스)을 요구하고 있다. ElastiCache는 애플리케이션 코드 변경이 필요하고 서버리스가 아니다.

**핵심 개념:** DynamoDB On-Demand Capacity

### Q3. A social media company needs to store and query user relationships, including friends, followers, and shared content. The queries involve traversing multiple levels of connections. Which database is BEST suited?
**Options:**
- A) Amazon DynamoDB
- B) Amazon RDS for PostgreSQL
- C) Amazon Neptune
- D) Amazon DocumentDB

**Answer:** C

**해설:** Amazon Neptune은 관리형 그래프 데이터베이스로 소셜 네트워크, 사기 탐지, 추천 엔진 등 데이터 간 관계를 저장하고 쿼리하는 데 최적화되어 있다. 수십억 관계를 밀리초 지연으로 쿼리할 수 있다. DynamoDB와 RDS는 그래프 쿼리에 적합하지 않고, DocumentDB는 문서 저장용이다.

**핵심 개념:** Amazon Neptune

### Q4. A company runs an Oracle database on-premises and needs to migrate to AWS. Their DBA requires OS-level access to customize the database configuration. Which service should they use?
**Options:**
- A) Amazon RDS for Oracle
- B) Amazon RDS Custom for Oracle
- C) Amazon Aurora
- D) Oracle on Amazon EC2

**Answer:** B

**해설:** RDS Custom for Oracle은 RDS의 관리형 기능을 유지하면서 기반 인스턴스에 대한 접근과 커스터마이징을 허용한다. 일반 RDS는 OS 수준 접근을 제공하지 않고, Aurora는 Oracle을 지원하지 않으며, EC2에 직접 설치하면 관리 부담이 크다.

**핵심 개념:** RDS Custom

### Q5. An IoT company collects sensor data from millions of devices and needs to store time-stamped readings for real-time analytics. The solution should automatically manage data lifecycle, keeping recent data in fast storage and older data in cost-optimized storage. Which service is MOST appropriate?
**Options:**
- A) Amazon DynamoDB with TTL
- B) Amazon Timestream
- C) Amazon Redshift
- D) Amazon RDS with partitioning

**Answer:** B

**해설:** Amazon Timestream은 시계열 데이터베이스로 자동 스토리지 티어링(최근 데이터는 메모리, 과거 데이터는 비용 최적화 스토리지)을 제공한다. IoT 앱과 실시간 분석에 최적화되어 있으며 서버리스로 자동 확장된다. DynamoDB TTL은 데이터를 삭제하지 티어링하지 않으며, Redshift는 OLAP 용도이다.

**핵심 개념:** Amazon Timestream

### Q6. A company uses DynamoDB for their e-commerce application and experiences extremely high read traffic during sales events. They need to reduce read latency from milliseconds to microseconds. What should they implement?
**Options:**
- A) DynamoDB Read Replicas
- B) Amazon ElastiCache in front of DynamoDB
- C) DynamoDB Accelerator (DAX)
- D) DynamoDB On-Demand capacity mode

**Answer:** C

**해설:** DAX(DynamoDB Accelerator)는 DynamoDB 전용 인메모리 읽기 캐시로 마이크로초 수준의 읽기 지연 시간을 제공한다. ElastiCache도 캐시로 사용 가능하지만 애플리케이션 코드 변경이 더 많이 필요하며, DAX는 DynamoDB와 원활하게 통합된다. DynamoDB에는 Read Replicas 개념이 없고, 온디맨드 모드는 지연 시간을 줄이지 않는다.

**핵심 개념:** DynamoDB DAX

### Q7. A company needs a globally distributed database that allows read and write operations in multiple AWS regions simultaneously. Which solution provides active-active multi-region capability?
**Options:**
- A) Amazon Aurora Global Database
- B) Amazon RDS Multi-AZ
- C) Amazon DynamoDB Global Tables
- D) Amazon ElastiCache Global Datastore

**Answer:** C

**해설:** DynamoDB Global Tables는 active-active 설정으로 여러 리전에서 동시에 읽기와 쓰기가 가능하다. Aurora Global Database는 1개의 Primary 리전에서만 쓰기가 가능하고 다른 리전은 읽기 전용이다. RDS Multi-AZ는 단일 리전 내 장애 조치용이며, ElastiCache Global Datastore는 active-passive이다.

**핵심 개념:** DynamoDB Global Tables
---

## Data & Analytics

---

### Q1. A company stores application logs in Amazon S3 in CSV format. They want to run ad-hoc SQL queries to analyze the logs without managing any infrastructure. The solution should be cost-effective. Which approach should they use?
**Options:**
- A) Load data into Amazon Redshift and query using SQL
- B) Use Amazon Athena to query data directly in S3
- C) Set up an Amazon EMR cluster with Hive
- D) Use Amazon RDS to import and query the data

**Answer:** B

**해설:** Athena는 서버리스 SQL 쿼리 서비스로 S3에 저장된 데이터를 직접 분석할 수 있으며 인프라 관리가 불필요하다. 스캔한 데이터에 대해서만 과금되므로 비용 효율적이다. Redshift는 클러스터 관리가 필요하고, EMR도 클러스터 설정이 필요하며, RDS는 로그 분석용으로 적합하지 않다.

**핵심 개념:** Amazon Athena

### Q2. A data engineering team uses Amazon Athena to query large datasets in S3. They want to reduce query costs significantly. What is the MOST effective approach?
**Options:**
- A) Use larger EC2 instances for Athena
- B) Convert data to Apache Parquet format using AWS Glue
- C) Enable S3 Transfer Acceleration
- D) Use S3 Intelligent-Tiering storage class

**Answer:** B

**해설:** Athena는 스캔된 데이터 양에 따라 과금되므로 컬럼형 형식인 Parquet/ORC로 변환하면 필요한 컬럼만 스캔하여 비용을 크게 절감할 수 있다. Glue ETL을 사용하면 데이터를 Parquet으로 쉽게 변환 가능하다. Athena는 서버리스이므로 EC2 인스턴스를 선택하지 않고, Transfer Acceleration과 Intelligent-Tiering은 쿼리 비용과 무관하다.

**핵심 개념:** Athena Performance Improvement / AWS Glue

### Q3. A company needs to perform complex joins and aggregations on petabytes of structured data for their business intelligence reporting. The queries run frequently throughout the day. Which service is MOST appropriate?
**Options:**
- A) Amazon Athena
- B) Amazon Redshift
- C) Amazon DynamoDB
- D) Amazon EMR with Apache Hive

**Answer:** B

**해설:** Redshift는 OLAP 데이터 웨어하우스로 PB 규모의 데이터에서 복잡한 조인과 집계를 수행하는 데 최적화되어 있다. 인덱스를 활용하여 Athena보다 빈번한 복잡한 쿼리에 더 빠르다. Athena는 간헐적 쿼리에 적합하고, DynamoDB는 분석용이 아니며, EMR은 관리 부담이 크다.

**핵심 개념:** Amazon Redshift vs Athena

### Q4. A company uses DynamoDB as their primary database. They need to implement a search feature that allows users to search across multiple fields with partial text matching. Which architecture should they implement?
**Options:**
- A) Use DynamoDB Global Secondary Indexes
- B) Use DynamoDB with DynamoDB Streams to sync data to Amazon OpenSearch
- C) Switch to Amazon RDS with full-text search
- D) Use Amazon Athena to query DynamoDB

**Answer:** B

**해설:** DynamoDB는 기본 키/인덱스로만 쿼리가 가능하여 부분 텍스트 매칭을 지원하지 않는다. OpenSearch는 모든 필드에서 부분 매칭 검색이 가능하며, DynamoDB Streams -> Lambda -> OpenSearch 패턴으로 데이터를 동기화하여 DynamoDB를 보완할 수 있다. GSI도 부분 매칭은 불가하다.

**핵심 개념:** OpenSearch + DynamoDB 통합 패턴

### Q5. A company wants to build a centralized data lake on AWS. They need fine-grained access control at the row and column level for different teams accessing the data through Athena and Redshift. Which service should they use?
**Options:**
- A) AWS Glue with IAM policies
- B) Amazon S3 with bucket policies
- C) AWS Lake Formation
- D) Amazon Redshift with row-level security

**Answer:** C

**해설:** AWS Lake Formation은 데이터 레이크 구축을 위한 관리형 서비스로, 행(row)과 열(column) 수준의 세밀한 접근 제어를 중앙 집중적으로 관리할 수 있다. Athena, Redshift, EMR 등 여러 소비자에 대한 보안을 통합 관리한다. Glue는 ETL에 초점을 맞추고, S3 버킷 정책은 행/열 수준 제어를 지원하지 않는다.

**핵심 개념:** AWS Lake Formation

### Q6. A company needs to process real-time streaming data from Apache Kafka topics using Apache Flink. They want a fully managed solution. Which service should they use?
**Options:**
- A) Amazon Kinesis Data Firehose
- B) Amazon Managed Service for Apache Flink with Amazon MSK as source
- C) AWS Glue Streaming ETL
- D) Amazon EMR with Apache Flink

**Answer:** B

**해설:** Amazon Managed Service for Apache Flink는 관리형 Flink 서비스로 MSK(관리형 Kafka)와 Kinesis Data Streams를 소스로 사용할 수 있다. 완전 관리형이므로 EMR처럼 클러스터를 직접 관리할 필요가 없다. Firehose는 Flink의 소스로 사용할 수 없으며, Glue Streaming ETL은 Spark Streaming 기반이다.

**핵심 개념:** Amazon Managed Service for Apache Flink / Amazon MSK

### Q7. A company wants to create interactive business dashboards that can be embedded in their web application. They need per-session pricing and want to leverage in-memory computation for fast performance. Which service should they use?
**Options:**
- A) Amazon Athena with custom visualization
- B) Amazon QuickSight with SPICE engine
- C) Amazon Redshift with a BI tool
- D) Amazon OpenSearch Dashboards

**Answer:** B

**해설:** Amazon QuickSight는 서버리스 BI 서비스로 임베딩 가능하고 세션당 과금이 적용된다. SPICE 엔진은 데이터를 가져올 때 인메모리 계산을 제공하여 빠른 성능을 보장한다. Athena는 시각화 도구가 아니고, Redshift는 별도의 BI 도구가 필요하며, OpenSearch Dashboards는 검색 데이터 시각화용이다.

**핵심 개념:** Amazon QuickSight / SPICE

### Q8. A data team needs to discover metadata about datasets stored across S3, RDS, and DynamoDB, and make this metadata available for querying with Athena and Redshift Spectrum. Which service provides this capability?
**Options:**
- A) AWS Lake Formation
- B) AWS Glue Data Catalog
- C) Amazon Athena Data Source Connectors
- D) AWS Config

**Answer:** B

**해설:** AWS Glue Data Catalog은 Data Crawler를 사용하여 S3, RDS, DynamoDB 등에서 메타데이터를 자동으로 수집하고 카탈로그화한다. 이 카탈로그는 Athena, Redshift Spectrum, EMR에서 공유하여 데이터 디스커버리에 활용된다. Lake Formation은 Glue 위에 구축되지만 보안/거버넌스에 초점이 있고, Data Source Connectors는 Athena의 페더레이티드 쿼리용이다.

**핵심 개념:** AWS Glue Data Catalog
---

## Machine Learning

---

### Q1. A media company needs to automatically generate subtitles for their video content in multiple languages. Which combination of AWS services should they use?
**Options:**
- A) Amazon Polly and Amazon Translate
- B) Amazon Transcribe and Amazon Translate
- C) Amazon Rekognition and Amazon Translate
- D) Amazon Comprehend and Amazon Polly

**Answer:** B

**해설:** Amazon Transcribe는 음성을 텍스트로 변환하여 자막을 생성하고, Amazon Translate는 생성된 텍스트를 다국어로 번역한다. Polly는 텍스트를 음성으로 변환하는 서비스이므로 자막 생성과 무관하고, Rekognition은 이미지/비디오의 시각적 분석용이며, Comprehend는 텍스트 감정 분석용이다.

**핵심 개념:** Amazon Transcribe / Amazon Translate

### Q2. A company wants to build a cloud-based contact center that can automatically handle customer inquiries using conversational AI before routing to human agents. Which combination of AWS services provides this capability?
**Options:**
- A) Amazon Polly and Amazon SQS
- B) Amazon Lex and Amazon Connect
- C) Amazon Comprehend and Amazon SNS
- D) Amazon Transcribe and Amazon SES

**Answer:** B

**해설:** Amazon Connect는 클라우드 기반 컨택 센터 서비스이고, Amazon Lex는 대화형 AI 봇을 구축하여 고객 문의를 자동 처리할 수 있다. Lex가 의도를 인식하고 Lambda로 작업을 수행한 후 필요시 사람 상담원에게 라우팅할 수 있다. 다른 조합은 컨택 센터 기능을 제공하지 않는다.

**핵심 개념:** Amazon Lex & Connect

### Q3. A healthcare company needs to analyze medical records stored as unstructured text to extract Protected Health Information (PHI) for compliance purposes. Which service should they use?
**Options:**
- A) Amazon Comprehend
- B) Amazon Comprehend Medical
- C) Amazon Textract
- D) Amazon Kendra

**Answer:** B

**해설:** Amazon Comprehend Medical은 비정형 임상 텍스트에서 PHI를 탐지하는 전문 서비스로 DetectPHI API를 제공한다. 일반 Comprehend는 의료 텍스트 특화가 아니고, Textract는 문서에서 텍스트를 추출하는 서비스이며, Kendra는 문서 검색 서비스이다.

**핵심 개념:** Amazon Comprehend Medical

### Q4. A social media platform needs to automatically detect and flag inappropriate content in user-uploaded images. When the system is unsure, it should route the content for human review. Which approach should they take?
**Options:**
- A) Amazon Textract with manual review queue
- B) Amazon Rekognition Content Moderation with Amazon Augmented AI (A2I)
- C) Amazon Comprehend with SNS notifications
- D) Amazon SageMaker with custom model

**Answer:** B

**해설:** Amazon Rekognition의 Content Moderation 기능은 이미지/비디오에서 부적절한 콘텐츠를 탐지하고, 최소 신뢰도 임계값을 설정하여 불확실한 경우 Amazon Augmented AI (A2I)로 수동 리뷰를 위해 플래그할 수 있다. Textract는 텍스트 추출용이고, Comprehend는 텍스트 분석용이며, SageMaker로 커스텀 모델을 구축하는 것은 불필요하게 복잡하다.

**핵심 개념:** Amazon Rekognition Content Moderation / A2I

### Q5. A company wants to add a natural language search capability to their internal knowledge base. Users should be able to ask questions in plain English and get precise answers from documents stored in S3 and SharePoint. Which service is BEST suited?
**Options:**
- A) Amazon OpenSearch Service
- B) Amazon Kendra
- C) Amazon Comprehend
- D) Amazon Athena

**Answer:** B

**해설:** Amazon Kendra는 ML 기반 문서 검색 서비스로 자연어 검색 기능을 제공하며, S3, SharePoint, Google Drive 등 다양한 데이터 소스에서 문서를 인덱싱하고 질문에 대한 정확한 답변을 추출한다. 사용자 피드백을 통한 증분 학습도 지원한다. OpenSearch는 범용 검색이고, Comprehend는 텍스트 분석이며, Athena는 SQL 쿼리 서비스이다.

**핵심 개념:** Amazon Kendra

### Q6. An e-commerce company wants to provide personalized product recommendations to users on their website. They want to use the same technology that Amazon.com uses. Which service should they implement?
**Options:**
- A) Amazon SageMaker with custom recommendation model
- B) Amazon Personalize
- C) Amazon Comprehend
- D) Amazon Kendra

**Answer:** B

**해설:** Amazon Personalize는 Amazon.com과 동일한 기술을 사용하는 실시간 개인화 추천 ML 서비스이다. 기존 웹사이트, 앱, SMS, 이메일에 통합할 수 있으며 수일 만에 구현 가능하다. SageMaker로 직접 모델을 구축하는 것은 불필요하게 복잡하고, Comprehend는 NLP, Kendra는 문서 검색용이다.

**핵심 개념:** Amazon Personalize

### Q7. A government agency needs to process thousands of tax forms and extract structured data from them, including handwritten fields. Which AWS service should they use?
**Options:**
- A) Amazon Rekognition
- B) Amazon Comprehend
- C) Amazon Textract
- D) Amazon Transcribe

**Answer:** C

**해설:** Amazon Textract는 AI/ML을 사용하여 스캔된 문서에서 텍스트, 필기, 폼 및 테이블 데이터를 자동 추출한다. 세금 양식, ID, 여권 등 공공 부문 문서 처리에 특화되어 있다. Rekognition은 이미지의 시각적 객체 인식용이고, Comprehend는 텍스트 의미 분석용이며, Transcribe는 음성->텍스트 변환용이다.

**핵심 개념:** Amazon Textract
---

## Monitoring, Audit & Performance

---

### Q1. A company needs to monitor the memory utilization of their EC2 instances and trigger an alarm when it exceeds 80%. The default CloudWatch metrics do not include memory. What should they do?
**Options:**
- A) Enable detailed monitoring on the EC2 instances
- B) Install the CloudWatch Unified Agent on the instances
- C) Use CloudWatch Logs Insights to query memory data
- D) Enable CloudWatch Container Insights

**Answer:** B

**해설:** 기본 EC2 CloudWatch 메트릭에는 RAM/메모리가 포함되지 않는다. CloudWatch Unified Agent를 설치하면 RAM, Disk, Processes, Swap Space 등 추가 시스템 메트릭을 수집할 수 있다. Detailed monitoring은 기본 메트릭의 해상도를 높일 뿐 새로운 메트릭을 추가하지 않고, Container Insights는 컨테이너용이다.

**핵심 개념:** CloudWatch Unified Agent

### Q2. A security team needs to be notified immediately when someone modifies a security group in their AWS account. Which solution provides this capability?
**Options:**
- A) AWS Config with SNS notification
- B) CloudWatch Alarms on security group metrics
- C) CloudTrail with Amazon EventBridge rule
- D) VPC Flow Logs analysis

**Answer:** C

**해설:** 보안 그룹 수정은 API 호출(AuthorizeSecurityGroupIngress 등)이므로 CloudTrail이 기록하고, EventBridge 규칙을 설정하여 해당 API 호출 이벤트 발생 시 즉시 SNS 등으로 알림을 보낼 수 있다. Config도 변경을 추적하지만 즉시성에서 CloudTrail + EventBridge가 더 적합하다.

**핵심 개념:** CloudTrail + EventBridge

### Q3. A company wants to export CloudWatch Logs to S3 for long-term archival but needs the data to be available within minutes. What should they use?
**Options:**
- A) CreateExportTask API
- B) CloudWatch Logs Subscription Filter with Kinesis Data Firehose
- C) CloudWatch Logs Insights query to S3
- D) CloudWatch Metric Streams

**Answer:** B

**해설:** CreateExportTask는 로그를 S3로 내보내는 데 최대 12시간이 소요되므로 실시간이 아니다. Subscription Filter를 Kinesis Data Firehose와 함께 사용하면 근실시간(약 1분)으로 로그를 S3에 전송할 수 있다. Logs Insights는 쿼리 엔진이지 전송 도구가 아니고, Metric Streams는 메트릭용이다.

**핵심 개념:** CloudWatch Logs Subscriptions / S3 Export

### Q4. A company uses AWS Config to ensure all their S3 buckets have encryption enabled. When a non-compliant bucket is found, they want it to be automatically remediated. How should they configure this?
**Options:**
- A) Use AWS Config Rules with deny policy to prevent unencrypted buckets
- B) Use AWS Config Rules with SSM Automation Documents for auto-remediation
- C) Use CloudWatch Alarms to trigger Lambda for remediation
- D) Use CloudTrail to detect and revert changes

**Answer:** B

**해설:** AWS Config Rules는 비준수 리소스를 탐지하지만 작업을 차단(deny)하지 않는다. 대신 SSM Automation Documents를 사용하여 비준수 리소스를 자동 교정(remediation)할 수 있으며, 교정 재시도(Remediation Retries)도 설정 가능하다. A는 Config의 기능이 아니고, C와 D는 이 목적에 최적화되지 않은 방법이다.

**핵심 개념:** AWS Config Rules / Remediations

### Q5. A company wants to detect unusual API activity in their AWS account, such as a sudden burst of IAM actions or inaccurate resource provisioning. Which feature should they enable?
**Options:**
- A) CloudWatch Application Insights
- B) CloudTrail Insights
- C) AWS Config Rules
- D) CloudWatch Contributor Insights

**Answer:** B

**해설:** CloudTrail Insights는 정상적인 Management Events 패턴을 학습하여 베이스라인을 만들고, Write Events에서 비정상적 활동(IAM 작업 급증, 리소스 프로비저닝 오류, 서비스 한도 초과 등)을 탐지한다. 이상 징후는 CloudTrail 콘솔, S3, EventBridge로 전송된다. Config은 구성 규정 준수, Contributor Insights는 Top-N 분석, Application Insights는 애플리케이션 트러블슈팅이다.

**핵심 개념:** CloudTrail Insights

### Q6. An organization needs to aggregate CloudWatch Logs from multiple AWS accounts and regions into a single destination for centralized analysis. Which approach should they use?
**Options:**
- A) Enable CloudWatch cross-account dashboards
- B) Use CloudWatch Logs Subscription Filters with Kinesis Data Streams
- C) Export logs from each account to a shared S3 bucket
- D) Use AWS Config aggregator

**Answer:** B

**해설:** CloudWatch Logs Subscription Filter를 사용하면 여러 계정과 리전의 로그를 근실시간으로 Kinesis Data Streams 또는 Kinesis Data Firehose로 집계할 수 있다. Cross-Account Subscription으로 다른 계정의 리소스에 로그를 전송하고 최종적으로 S3에 저장할 수 있다. S3 Export는 12시간 소요로 비실시간이며, Config은 로그가 아닌 구성 변경 관련이다.

**핵심 개념:** CloudWatch Logs Subscriptions / Multi-Account Aggregation

### Q7. For an Elastic Load Balancer, which service would you use to track the CONFIGURATION changes and ensure an SSL certificate is always assigned?
**Options:**
- A) Amazon CloudWatch
- B) AWS CloudTrail
- C) AWS Config
- D) Amazon EventBridge

**Answer:** C

**해설:** AWS Config은 리소스의 구성 변경을 추적하고 규정 준수 규칙을 평가하는 데 사용된다. SSL 인증서가 항상 할당되어 있는지 확인하는 것은 규정 준수(compliance) 검사로 Config Rules의 영역이다. CloudWatch는 성능 모니터링, CloudTrail은 API 호출 감사, EventBridge는 이벤트 기반 자동화이다.

**핵심 개념:** CloudWatch vs CloudTrail vs Config

### Q8. A company wants to reduce alarm noise by only triggering notifications when BOTH CPU utilization exceeds 80% AND disk IOPS exceed a threshold on the same EC2 instance. Which CloudWatch feature should they use?
**Options:**
- A) CloudWatch Metrics Math
- B) CloudWatch Composite Alarms
- C) CloudWatch Contributor Insights
- D) CloudWatch Anomaly Detection

**Answer:** B

**해설:** CloudWatch Composite Alarms는 여러 개별 알람의 상태를 AND/OR 조건으로 모니터링하는 복합 알람을 생성한다. CPU 알람과 IOPS 알람을 AND 조건으로 묶으면 둘 다 ALARM 상태일 때만 알림이 트리거되어 알람 노이즈를 줄일 수 있다.

**핵심 개념:** CloudWatch Composite Alarms
---

## Advanced Identity

---

### Q1. A company wants to prevent any IAM user or role in their development accounts from launching EC2 instances in the us-west-1 region, while allowing all other regions. They use AWS Organizations. What is the BEST approach?
**Options:**
- A) Create IAM policies in each development account to deny us-west-1
- B) Apply a Service Control Policy (SCP) to the Development OU that denies EC2 actions in us-west-1
- C) Use AWS Config rules to detect EC2 instances in us-west-1
- D) Create a Permission Boundary for all users in development accounts

**Answer:** B

**해설:** SCP를 Development OU에 적용하면 해당 OU 내 모든 계정의 모든 사용자/역할에게 us-west-1에서의 EC2 작업을 일괄 차단할 수 있다. 개별 IAM 정책은 모든 계정에서 관리해야 하고, Config은 사후 탐지만 가능하며 차단하지 않고, Permission Boundary는 개별 사용자/역할에 적용해야 한다.

**핵심 개념:** Service Control Policies (SCP)

### Q2. A user in Account A needs to scan a DynamoDB table in Account A and write the results to an S3 bucket in Account B. The user needs to maintain their DynamoDB permissions while accessing the S3 bucket. What is the BEST approach?
**Options:**
- A) Create an IAM role in Account B and have the user assume it
- B) Use a resource-based policy (S3 bucket policy) on Account B's S3 bucket
- C) Create a cross-account IAM user in Account B
- D) Use AWS Organizations consolidated access

**Answer:** B

**해설:** IAM Role을 assume하면 원래 권한(Account A DynamoDB 접근)을 포기하게 되므로, S3 버킷의 resource-based policy(버킷 정책)를 사용하여 Account A 사용자에게 접근을 허용하는 것이 적합하다. 이렇게 하면 사용자가 원래 권한을 유지하면서 Account B의 S3에 접근할 수 있다.

**핵심 개념:** IAM Roles vs Resource-Based Policies

### Q3. A company wants to implement single sign-on for their employees to access multiple AWS accounts in their AWS Organization and third-party SaaS applications like Salesforce. Which service should they use?
**Options:**
- A) Amazon Cognito
- B) AWS IAM with cross-account roles
- C) AWS IAM Identity Center
- D) AWS Directory Service

**Answer:** C

**해설:** AWS IAM Identity Center(AWS SSO 후속)는 AWS Organizations의 여러 계정과 Salesforce 같은 SAML 2.0 비즈니스 앱에 대한 단일 로그인을 제공한다. Cognito는 외부 사용자(앱 사용자) 인증용이고, 크로스 계정 역할은 SSO가 아니며, Directory Service는 AD 관리용이다.

**핵심 개념:** AWS IAM Identity Center

### Q4. A company has an on-premises Active Directory and wants to allow their users to authenticate against it when accessing AWS resources. They do NOT want to manage any AD infrastructure in AWS. Which AWS Directory Service option should they use?
**Options:**
- A) AWS Managed Microsoft AD
- B) AD Connector
- C) Simple AD
- D) Amazon Cognito User Pool

**Answer:** B

**해설:** AD Connector는 온프레미스 AD로의 프록시(게이트웨이)로, AWS에 AD 인프라를 생성하지 않고 온프레미스 AD로 인증 요청을 리다이렉트한다. AWS Managed AD는 AWS에 AD를 생성하므로 관리가 필요하고, Simple AD는 온프레미스 연결이 불가하며, Cognito는 AD 통합용이 아니다.

**핵심 개념:** AWS Directory Services / AD Connector

### Q5. A company allows developers to create their own IAM policies. However, they want to ensure developers cannot escalate their privileges to administrator access. Which feature should they use?
**Options:**
- A) Service Control Policies (SCP)
- B) IAM Permission Boundaries
- C) AWS Config Rules
- D) IAM Access Analyzer

**Answer:** B

**해설:** IAM Permission Boundaries는 IAM 엔티티(사용자/역할)의 최대 권한을 설정하여, 개발자가 자체 정책을 관리하더라도 경계를 넘는 권한을 획득할 수 없게 한다. SCP는 전체 계정 수준이고 개별 사용자를 제한하기에 세밀하지 않으며, Config은 권한 관리와 무관하다.

**핵심 개념:** IAM Permission Boundaries

### Q6. An organization wants to restrict access to an S3 bucket so that only accounts within their AWS Organization can access it. Which IAM condition key should they use in the S3 bucket policy?
**Options:**
- A) aws:SourceIp
- B) aws:RequestedRegion
- C) aws:PrincipalOrgID
- D) aws:MultiFactorAuthPresent

**Answer:** C

**해설:** aws:PrincipalOrgID 조건 키를 리소스 정책(S3 버킷 정책)에 사용하면 AWS Organization의 멤버 계정에서만 접근을 허용할 수 있다. SourceIp는 IP 기반, RequestedRegion은 리전 기반, MultiFactorAuthPresent는 MFA 기반 조건이다.

**핵심 개념:** aws:PrincipalOrgID

### Q7. A company is setting up a new multi-account AWS environment and wants to automate the provisioning of accounts with guardrails for security and compliance. They need both preventive controls (blocking certain actions) and detective controls (identifying non-compliant resources). Which service should they use?
**Options:**
- A) AWS Organizations with SCPs only
- B) AWS Control Tower
- C) AWS Config with AWS CloudFormation
- D) AWS IAM Identity Center

**Answer:** B

**해설:** AWS Control Tower는 다중 계정 AWS 환경을 자동 구축하고 Preventive Guardrails(SCP 기반 차단)와 Detective Guardrails(AWS Config 기반 탐지)를 모두 제공한다. Organizations만으로는 detective controls가 부족하고, Config + CloudFormation 조합은 Control Tower보다 설정이 복잡하며, IAM Identity Center는 SSO 서비스이다.

**핵심 개념:** AWS Control Tower / Guardrails
---

## Security & Encryption

---

### Q1. A company needs to encrypt data at rest using encryption keys that they fully control. They require FIPS 140-2 Level 3 compliance and dedicated hardware. Which service should they use?
**Options:**
- A) AWS KMS with Customer Managed Keys
- B) AWS CloudHSM
- C) AWS KMS with AWS Managed Keys
- D) Server-Side Encryption with S3 Managed Keys (SSE-S3)

**Answer:** B

**해설:** CloudHSM은 전용 하드웨어(Single-Tenant)에서 FIPS 140-2 Level 3 규정 준수를 제공하며, 사용자가 암호화 키를 완전히 관리한다. KMS도 FIPS 140-2 Level 3이지만 Multi-Tenant이고 AWS가 하드웨어를 관리한다. 문제에서 "전용 하드웨어"와 "완전한 키 관리"를 요구하므로 CloudHSM이 정답이다.

**핵심 개념:** CloudHSM vs KMS

### Q2. A company wants to share an encrypted AMI with another AWS account. The AMI is encrypted with a Customer Managed KMS Key. What steps are required? (Select TWO)
**Options:**
- A) Add a Launch Permission for the target account on the AMI
- B) Share the AWS Managed KMS Key with the target account
- C) Share the Customer Managed KMS Key with the target account via KMS Key Policy
- D) Create a new unencrypted copy of the AMI and share it
- E) The target account needs no additional permissions

**Answer:** A, C

**해설:** KMS 암호화된 AMI를 다른 계정과 공유하려면: (1) AMI에 대상 계정의 Launch Permission을 추가하고, (2) AMI 암호화에 사용된 Customer Managed KMS Key를 KMS Key Policy를 통해 대상 계정과 공유해야 한다. AWS Managed Key는 공유할 수 없고, 비암호화 복사본을 만들면 보안이 약해진다.

**핵심 개념:** AMI Sharing Process Encrypted via KMS

### Q3. A company wants to protect their web application running behind an Application Load Balancer from SQL injection and cross-site scripting attacks. They also want to block requests from specific countries. Which service should they use?
**Options:**
- A) AWS Shield Standard
- B) AWS Network Firewall
- C) AWS WAF
- D) Security Groups

**Answer:** C

**해설:** AWS WAF는 Layer 7(HTTP) 보호로 SQL Injection, XSS 보호와 Geo-match(국가 차단)를 지원하며 ALB에 배포할 수 있다. Shield Standard는 Layer 3/4 DDoS 보호이고, Network Firewall은 VPC 수준이며, Security Groups는 IP/포트 기반이지 HTTP 콘텐츠를 검사하지 않는다.

**핵심 개념:** AWS WAF

### Q4. A company frequently experiences DDoS attacks on their application. They need 24/7 access to AWS DDoS experts and automatic Layer 7 attack mitigation. They also want protection against DDoS-related billing spikes. Which solution should they choose?
**Options:**
- A) AWS Shield Standard with AWS WAF
- B) AWS Shield Advanced
- C) AWS Firewall Manager
- D) Amazon GuardDuty

**Answer:** B

**해설:** AWS Shield Advanced는 24/7 DDoS Response Team(DRP) 접근, Layer 7 공격 자동 완화(WAF 규칙 자동 생성/배포), DDoS로 인한 요금 급증 보호를 모두 제공한다. Shield Standard는 무료이지만 이런 고급 기능이 없고, Firewall Manager는 정책 관리 도구이며, GuardDuty는 위협 탐지 서비스이다.

**핵심 개념:** AWS Shield Advanced

### Q5. A company needs to automatically detect if any of their S3 buckets contain personally identifiable information (PII) such as credit card numbers or social security numbers. Which service should they use?
**Options:**
- A) Amazon GuardDuty
- B) Amazon Inspector
- C) Amazon Macie
- D) AWS Config

**Answer:** C

**해설:** Amazon Macie는 ML과 패턴 매칭을 사용하여 S3 버킷에서 PII와 같은 민감한 데이터를 자동 탐지하고 보호한다. GuardDuty는 위협 탐지(API 이상, 네트워크 이상), Inspector는 EC2/ECR/Lambda 취약점 스캔, Config은 리소스 구성 규정 준수 평가이다.

**핵심 개념:** Amazon Macie

### Q6. A company stores secrets for their RDS database connections and needs automatic rotation of these secrets every 30 days. Which service is MOST appropriate?
**Options:**
- A) AWS Systems Manager Parameter Store (Advanced)
- B) AWS Secrets Manager
- C) AWS KMS
- D) AWS CloudHSM

**Answer:** B

**해설:** AWS Secrets Manager는 시크릿 자동 회전 기능을 제공하며 Lambda를 사용하여 X일마다 시크릿을 자동 생성한다. 특히 RDS(MySQL, PostgreSQL, Aurora)와의 통합이 특화되어 있다. SSM Parameter Store Advanced는 TTL은 있지만 자동 회전 기능은 Secrets Manager만큼 강력하지 않으며, KMS와 CloudHSM은 암호화 키 관리용이다.

**핵심 개념:** AWS Secrets Manager

### Q7. A company uses an edge-optimized API Gateway and needs to attach a TLS certificate from ACM. In which region must the ACM certificate be created?
**Options:**
- A) The same region as the API Gateway
- B) us-east-1
- C) Any region, as ACM certificates are global
- D) The region closest to the majority of users

**Answer:** B

**해설:** Edge-Optimized API Gateway는 CloudFront Edge 위치를 통해 요청을 라우팅하므로, TLS 인증서는 CloudFront와 동일한 리전인 us-east-1에 있어야 한다. Regional API Gateway의 경우에는 API Stage와 동일 리전에 인증서가 있어야 한다. ACM 인증서는 글로벌이 아니라 리전별이다.

**핵심 개념:** ACM + API Gateway Integration

### Q8. A company wants to manage WAF rules, Shield Advanced protections, and security group configurations across all accounts in their AWS Organization. New accounts should automatically inherit these security rules. Which service should they use?
**Options:**
- A) AWS Config
- B) AWS WAF with cross-account rules
- C) AWS Firewall Manager
- D) AWS Organizations SCPs

**Answer:** C

**해설:** AWS Firewall Manager는 AWS Organization 전체 계정에서 WAF 규칙, Shield Advanced, Security Groups, Network Firewall 등의 보안 규칙을 중앙에서 관리한다. 새 리소스와 새 계정에 자동으로 규칙이 적용되어 규정 준수를 보장한다. Config은 구성 규정 준수, SCP는 권한 제한이지 보안 규칙 배포가 아니다.

**핵심 개념:** AWS Firewall Manager
---

## Amazon VPC

---

### Q1. A company has a VPC with a CIDR block of 10.0.0.0/24 in a subnet. How many IP addresses are available for EC2 instances?
**Options:**
- A) 256
- B) 251
- C) 254
- D) 250

**Answer:** B

**해설:** /24는 256개의 IP를 제공하지만, AWS는 각 서브넷에서 5개의 IP를 예약한다 (첫 4개: 네트워크 주소, VPC 라우터, DNS, 미래 사용 + 마지막 1개: 브로드캐스트). 따라서 256 - 5 = 251개가 사용 가능하다. C)와 D)는 일반적인 네트워킹 지식과 혼동하기 쉬운 오답이다.

**핵심 개념:** VPC Subnet IP 예약

---

### Q2. A solutions architect needs to allow EC2 instances in a private subnet to access the internet for software updates while preventing inbound connections from the internet. The solution must be highly available and require minimal operational overhead. What should the architect recommend?
**Options:**
- A) Deploy a NAT instance in a public subnet across multiple AZs using an Auto Scaling group
- B) Deploy a NAT Gateway in each public subnet across multiple AZs
- C) Deploy a single NAT Gateway in one public subnet
- D) Configure an Internet Gateway and update the private subnet route table

**Answer:** B

**해설:** NAT Gateway는 AWS 관리형 서비스로 운영 오버헤드가 적다 (A 오답 - NAT Instance는 운영 부담이 크다). NAT Gateway는 단일 AZ 내에서만 고가용성이므로, 다중 AZ 내결함성을 위해 각 AZ에 배포해야 한다 (C 오답 - 단일 AZ는 가용성 부족). D는 프라이빗 서브넷에 직접 IGW를 연결하면 퍼블릭 서브넷이 되어 인바운드 연결도 허용하게 된다.

**핵심 개념:** NAT Gateway High Availability

---

### Q3. A company wants to block a specific IP address from accessing their EC2 instances. The instances are behind an Application Load Balancer. Which approach should be used?
**Options:**
- A) Modify the EC2 instance security group to deny the IP address
- B) Create a NACL rule to deny the IP address on the subnet where the ALB is deployed
- C) Use AWS WAF with an IP-based rule attached to the ALB
- D) Modify the ALB security group to deny the IP address

**Answer:** C

**해설:** Security Group은 Allow 규칙만 지원하므로 특정 IP를 거부할 수 없다 (A, D 오답). NACL로 서브넷에서 차단할 수 있지만 (B), ALB가 있는 경우 가장 효과적인 방법은 AWS WAF를 사용하여 IP 기반 규칙으로 필터링하는 것이다. WAF는 ALB에 직접 연결할 수 있어 더 세밀한 제어가 가능하다.

**핵심 개념:** Security Group vs NACL vs WAF

---

### Q4. A company needs to connect their on-premises data center to AWS VPC with a dedicated, private connection that provides consistent network performance. The connection must also be encrypted. What solution should be implemented?
**Options:**
- A) AWS Site-to-Site VPN only
- B) AWS Direct Connect only
- C) AWS Direct Connect with Site-to-Site VPN
- D) AWS VPN CloudHub

**Answer:** C

**해설:** Direct Connect는 전용 프라이빗 연결로 일관된 네트워크 성능을 제공하지만, 전송 데이터가 암호화되지 않는다 (B 오답). Site-to-Site VPN은 암호화되지만 퍼블릭 인터넷을 사용하므로 일관된 성능을 보장하지 않는다 (A 오답). Direct Connect + VPN을 결합하면 IPsec 암호화된 프라이빗 연결이 가능하다. VPN CloudHub (D)는 여러 사이트 간 통신을 위한 것이다.

**핵심 개념:** Direct Connect Encryption

---

### Q5. A company has VPCs in multiple AWS regions and on-premises data centers. They need to create a hub-and-spoke network topology to connect all VPCs and on-premises locations with transitive routing. Which service should they use?
**Options:**
- A) VPC Peering
- B) AWS Direct Connect Gateway
- C) AWS Transit Gateway
- D) AWS VPN CloudHub

**Answer:** C

**해설:** Transit Gateway는 수천 개의 VPC, VPN, Direct Connect 연결 간 전이적 피어링을 제공하는 허브-앤-스포크 아키텍처이다. VPC Peering (A)은 비전이적이다. Direct Connect Gateway (B)는 DX를 여러 VPC에 연결하지만 VPC 간 전이적 라우팅은 아니다. VPN CloudHub (D)는 VPN 전용으로 규모가 제한적이다.

**핵심 개념:** Transit Gateway

---

### Q6. An application running in a private subnet needs to access Amazon S3. The solutions architect wants to ensure that the traffic does not traverse the public internet and the solution should be cost-effective. What should the architect do?
**Options:**
- A) Create a VPC Interface Endpoint for S3
- B) Create a VPC Gateway Endpoint for S3
- C) Deploy a NAT Gateway and route S3 traffic through it
- D) Create a VPC peering connection with the S3 service VPC

**Answer:** B

**해설:** Gateway Endpoint는 S3와 DynamoDB를 지원하며 무료이다. Interface Endpoint (A)도 S3에 접근 가능하지만 시간당 비용 + 데이터 처리 비용이 발생한다. NAT Gateway (C)도 사용 가능하지만 $0.045/시간 + $0.045/GB의 비용이 발생하며 퍼블릭 인터넷을 경유한다. S3는 VPC peering으로 연결하는 서비스가 아니다 (D 오답).

**핵심 개념:** VPC Gateway Endpoint vs Interface Endpoint

---

### Q7. A VPC Flow Log shows an inbound request was ACCEPTED but the corresponding outbound response was REJECTED. What is the most likely cause?
**Options:**
- A) The Security Group is blocking the outbound traffic
- B) The NACL is blocking the outbound traffic
- C) The route table has no route to the destination
- D) The Internet Gateway is misconfigured

**Answer:** B

**해설:** Security Group은 Stateful이므로, 인바운드가 허용되면 해당 아웃바운드 응답은 자동으로 허용된다 (A 오답). NACL은 Stateless이므로, 인바운드가 허용되더라도 아웃바운드는 별도로 규칙이 필요하다. Inbound ACCEPT + Outbound REJECT는 NACL 문제를 나타낸다. 라우트 테이블이나 IGW 문제는 Flow Log에서 다른 형태로 나타난다.

**핵심 개념:** VPC Flow Logs Troubleshooting - Stateful vs Stateless

---

### Q8. A company requires a network connection from their on-premises data center to multiple VPCs in different AWS regions through a single physical connection. What combination of services should they use?
**Options:**
- A) AWS Site-to-Site VPN + Transit Gateway
- B) AWS Direct Connect + Direct Connect Gateway
- C) AWS Direct Connect + VPC Peering
- D) AWS VPN CloudHub + Transit Gateway

**Answer:** B

**해설:** Direct Connect는 단일 물리적 연결을 제공하고, Direct Connect Gateway를 사용하면 해당 연결을 여러 리전의 여러 VPC에 확장할 수 있다. Site-to-Site VPN (A)은 물리적 전용 연결이 아니다. VPC Peering (C)은 온프레미스-AWS 연결 용도가 아니다. VPN CloudHub (D)는 VPN 기반이므로 물리적 전용 연결이 아니다.

**핵심 개념:** Direct Connect Gateway
---

## Disaster Recovery & Migrations

---

### Q1. A company requires a disaster recovery strategy with an RTO of less than 1 minute and can tolerate minimal data loss. The company is willing to pay for maintaining a full production environment. Which DR strategy should they implement?
**Options:**
- A) Backup and Restore
- B) Pilot Light
- C) Warm Standby
- D) Multi Site / Hot Site

**Answer:** D

**해설:** Multi Site/Hot Site는 전체 프로덕션 규모가 양쪽에서 active-active로 실행되어 가장 낮은 RTO(분/초)를 제공한다. Warm Standby (C)는 최소 크기로 실행되므로 스케일 업 시간이 필요하다. Pilot Light (B)는 핵심만 실행한다. Backup and Restore (A)는 가장 높은 RTO를 가진다.

**핵심 개념:** DR Strategy - Multi Site/Hot Site

---

### Q2. A company needs to migrate an on-premises Oracle database to Amazon Aurora PostgreSQL. Which AWS services should they use?
**Options:**
- A) AWS DMS only
- B) AWS DMS with AWS SCT
- C) AWS SCT only
- D) AWS Application Migration Service

**Answer:** B

**해설:** Oracle에서 Aurora PostgreSQL로의 마이그레이션은 이종(heterogeneous) 마이그레이션이므로 스키마 변환을 위한 SCT가 필요하다. DMS는 실제 데이터 마이그레이션을 수행한다. SCT만으로는 (C) 데이터 이동이 불가하다. MGN (D)은 서버 마이그레이션 서비스이지 DB 마이그레이션이 아니다.

**핵심 개념:** DMS + SCT (Heterogeneous Migration)

---

### Q3. A company wants to ensure that their AWS backups cannot be deleted by anyone, including the root user, to protect against ransomware attacks. Which feature should they enable?
**Options:**
- A) S3 Object Lock
- B) AWS Backup Vault Lock
- C) AWS KMS key rotation
- D) IAM deny policies on backup deletion

**Answer:** B

**해설:** AWS Backup Vault Lock은 WORM 정책을 적용하여 root 사용자를 포함한 누구도 백업을 삭제할 수 없게 한다. S3 Object Lock (A)은 S3 객체에만 적용된다. KMS 키 순환 (C)은 암호화 관련이지 삭제 방지가 아니다. IAM deny (D)는 root 사용자에게 적용되지 않는다.

**핵심 개념:** AWS Backup Vault Lock - WORM

---

### Q4. A solutions architect needs to migrate a large MySQL database running on-premises to Amazon Aurora MySQL with minimal downtime. Both databases will be running simultaneously during migration. Which approach is MOST appropriate?
**Options:**
- A) Use Percona XtraBackup to create a backup in S3 and restore to Aurora
- B) Use mysqldump to export and import the data
- C) Use AWS DMS with continuous data replication
- D) Create an RDS MySQL Read Replica and promote it

**Answer:** C

**해설:** 양쪽 데이터베이스가 동시에 실행 중이며 최소 다운타임이 요구되므로, DMS의 CDC(Change Data Capture)를 사용한 연속 데이터 복제가 가장 적합하다. Percona XtraBackup (A)과 mysqldump (B)는 초기 로드에 사용 가능하지만 연속 복제를 지원하지 않는다. Read Replica (D)는 RDS MySQL에서 Aurora로의 마이그레이션에 사용하는 방법이다.

**핵심 개념:** DMS - Continuous Data Replication (CDC)

---

### Q5. A company needs to transfer 200 TB of data to AWS as quickly as possible. Their internet connection is 100 Mbps. What is the FASTEST method?
**Options:**
- A) Use AWS Direct Connect with 1 Gbps capacity
- B) Use AWS Site-to-Site VPN
- C) Use AWS Snowball
- D) Use S3 Transfer Acceleration

**Answer:** C

**해설:** 100 Mbps 인터넷으로 200TB 전송 시: 인터넷 경유 약 185일, Direct Connect 1Gbps는 약 18.5일이지만 설정에 1개월 이상 소요, Snowball은 약 1주일(end-to-end)로 가장 빠르다. S3 Transfer Acceleration (D)도 인터넷 대역폭에 제한된다.

**핵심 개념:** Large Data Transfer - Snowball

---

### Q6. A company is using AWS DMS to migrate their database. They want to ensure high availability of the replication instance. What should they enable?
**Options:**
- A) DMS Read Replicas
- B) DMS Multi-AZ deployment
- C) DMS Auto Scaling
- D) DMS Cross-Region replication

**Answer:** B

**해설:** DMS Multi-AZ 배포는 다른 AZ에 동기식 대기 복제본을 프로비저닝하여 데이터 이중화, I/O 프리즈 제거, 레이턴시 스파이크 최소화를 제공한다. DMS에는 Read Replicas (A), Auto Scaling (C), Cross-Region replication (D) 기능이 없다.

**핵심 개념:** DMS Multi-AZ Deployment

---

### Q7. A company wants to plan a large-scale migration to AWS and needs to gather detailed information about their on-premises servers, including running processes and network connections between systems. Which service and discovery method should they use?
**Options:**
- A) AWS Application Discovery Service - Agentless Discovery
- B) AWS Application Discovery Service - Agent-based Discovery
- C) AWS Migration Hub
- D) AWS Application Migration Service

**Answer:** B

**해설:** Agent-based Discovery는 시스템 설정, 성능, 실행 중인 프로세스, 시스템 간 네트워크 연결 상세 정보를 제공한다. Agentless Discovery (A)는 VM 인벤토리, 설정, 성능 이력만 제공하며 프로세스/네트워크 연결 정보는 포함하지 않는다. Migration Hub (C)는 결과를 보는 도구이다. MGN (D)은 실제 마이그레이션 수행 도구이다.

**핵심 개념:** Application Discovery Service - Agent-based vs Agentless
---

## More Solutions Architecture

---

### Q1. A company wants to process S3 object uploads by sending notifications to multiple independent consumers. Each consumer must receive every message. What is the BEST architecture?
**Options:**
- A) Configure S3 event notifications to send to multiple SQS queues directly
- B) Configure S3 event notifications to an SNS topic, then subscribe multiple SQS queues to the topic
- C) Use S3 event notifications with Lambda to write to multiple SQS queues
- D) Configure S3 event notifications to EventBridge, then send to multiple SQS queues

**Answer:** B

**해설:** Fan Out 패턴의 전형적인 사용 사례이다. SNS 토픽에 S3 이벤트를 전송하고, 여러 SQS 큐가 구독하면 각 소비자가 모든 메시지를 받을 수 있다. S3는 같은 이벤트 타입에 대해 하나의 대상만 설정 가능하므로 A는 제한적이다. Lambda (C)는 추가 복잡성을 더한다. EventBridge (D)도 가능하지만 단순한 팬아웃에는 SNS가 더 간단하고 직접적이다.

**핵심 개념:** Fan Out Pattern - SNS + SQS

---

### Q2. A company needs to block traffic from specific IP addresses to their web application running behind an Application Load Balancer and CloudFront. Which combination provides the MOST effective solution?
**Options:**
- A) Configure NACL rules to deny the IP addresses
- B) Configure Security Group rules on the ALB to deny the IP addresses
- C) Configure AWS WAF with IP-based rules on CloudFront
- D) Configure Security Group rules on the EC2 instances

**Answer:** C

**해설:** CloudFront가 앞에 있을 때 NACL은 무용하다 (CloudFront의 Public IP가 ALB에 요청하기 때문, A 오답). Security Group은 Deny 규칙을 지원하지 않는다 (B, D 오답). AWS WAF를 CloudFront에 연결하면 원본 클라이언트 IP를 기반으로 필터링할 수 있다.

**핵심 개념:** CloudFront + WAF IP Filtering

---

### Q3. A company is running a tightly coupled High Performance Computing (HPC) workload that requires low-latency, high-throughput inter-node communication on Linux instances. Which combination of AWS features should they use?
**Options:**
- A) Spread Placement Group with Enhanced Networking (ENA)
- B) Cluster Placement Group with Elastic Fabric Adapter (EFA)
- C) Partition Placement Group with ENA
- D) Cluster Placement Group with Enhanced Networking (ENA)

**Answer:** B

**해설:** 밀접 결합(tightly coupled) HPC 워크로드에는 Cluster Placement Group(같은 Rack, 저지연)과 EFA(MPI 표준, OS 우회 저지연 전송)의 조합이 최적이다. ENA (D)도 좋지만 EFA가 HPC용으로 더 특화되어 있다. Spread (A)와 Partition (C) Placement Group은 고가용성용이지 저지연 통신용이 아니다.

**핵심 개념:** HPC - Cluster Placement Group + EFA

---

### Q4. A solutions architect needs to design a highly available single EC2 instance with a static IP address that automatically recovers if the instance fails. The solution must also preserve the data on the attached EBS volume. What approach should be used?
**Options:**
- A) Use CloudWatch alarms to reboot the instance and reassign the Elastic IP
- B) Use an Auto Scaling group with min/max/desired of 1 across multiple AZs with lifecycle hooks to manage EBS snapshots and Elastic IP attachment
- C) Use EC2 Auto Recovery feature with an Elastic IP
- D) Use a Network Load Balancer with a single target instance

**Answer:** B

**해설:** ASG(1/1/1)를 여러 AZ에 걸쳐 구성하고, Terminate lifecycle hook에서 EBS 스냅샷을 생성하고, Launch lifecycle hook에서 EBS 볼륨을 복원하고 Elastic IP를 연결하면 AZ 장애에도 복구된다. CloudWatch alarm (A)은 같은 AZ 내 복구만 가능하다. EC2 Auto Recovery (C)도 같은 AZ 내에서만 동작한다. NLB (D)는 EBS 데이터 보존이나 AZ 장애 조치를 해결하지 않는다.

**핵심 개념:** Highly Available EC2 with ASG + EBS

---

### Q5. A company wants to use Amazon S3 event notifications with advanced filtering based on object metadata and the ability to send events to AWS Step Functions. What should they use?
**Options:**
- A) S3 Event Notifications directly to Step Functions
- B) S3 Event Notifications to SNS, then to Step Functions
- C) S3 Event Notifications with Amazon EventBridge
- D) S3 Event Notifications to Lambda, then to Step Functions

**Answer:** C

**해설:** Amazon EventBridge는 메타데이터, 객체 크기, 이름 등에 대한 고급 JSON 필터링을 지원하며, Step Functions을 포함한 18개 이상의 AWS 서비스에 직접 전송할 수 있다. S3 Event Notifications는 직접 Step Functions에 전송할 수 없다 (A 오답). SNS→Step Functions 직접 통합도 없다 (B 오답). Lambda (D)는 가능하지만 불필요한 복잡성을 추가한다.

**핵심 개념:** S3 Event Notifications with EventBridge

---

### Q6. For a High Performance Computing workload, which storage solution provides millions of IOPS and is optimized for distributed file systems backed by S3?
**Options:**
- A) Amazon EFS with Provisioned Throughput
- B) Amazon EBS io2 Block Express
- C) Amazon FSx for Lustre
- D) Amazon S3 with Transfer Acceleration

**Answer:** C

**해설:** FSx for Lustre는 HPC에 최적화된 분산 파일 시스템으로, 수백만 IOPS를 제공하고 S3로 백업된다. EFS (A)는 범용이며 수백만 IOPS는 아니다. EBS io2 (B)는 최대 256,000 IOPS이다. S3 (D)는 파일 시스템이 아니다.

**핵심 개념:** FSx for Lustre - HPC Storage
---

## Other Services

---

### Q1. A company wants to allow developers to create CloudFormation stacks that provision S3 buckets, but developers should not have direct permissions to create S3 buckets. How can this be achieved?
**Options:**
- A) Grant developers S3 full access permissions
- B) Use a CloudFormation Service Role with S3 permissions and grant developers iam:PassRole and cloudformation:* permissions
- C) Use AWS Organizations Service Control Policies to allow CloudFormation to create S3 buckets
- D) Create an IAM policy that allows S3 bucket creation only through CloudFormation

**Answer:** B

**해설:** CloudFormation Service Role을 사용하면 사용자가 직접 S3 권한이 없어도 CloudFormation을 통해 S3 버킷을 생성할 수 있다. Service Role에 S3 권한을 부여하고, 사용자에게는 `iam:PassRole`과 `cloudformation:*` 권한만 주면 된다. A는 직접 권한 부여로 요구사항에 반한다. C, D는 이 시나리오에 적합하지 않다.

**핵심 개념:** CloudFormation Service Role

---

### Q2. A company needs to securely connect to EC2 instances in a private subnet without using SSH keys or opening port 22. Session logs must be stored for auditing. Which solution should they use?
**Options:**
- A) Use a Bastion Host in a public subnet
- B) Use AWS Systems Manager Session Manager
- C) Use EC2 Instance Connect
- D) Use AWS Direct Connect

**Answer:** B

**해설:** SSM Session Manager는 SSH, Bastion Host, SSH 키, 포트 22 없이 EC2에 보안 셸 접속을 제공한다. 세션 로그를 S3 또는 CloudWatch Logs에 저장할 수 있어 감사 요구사항을 충족한다. Bastion Host (A)는 SSH 키와 포트 22가 필요하다. EC2 Instance Connect (C)도 포트 22가 필요하다.

**핵심 개념:** SSM Session Manager

---

### Q3. A company needs to run a data processing job that takes 3 hours to complete and requires a custom Docker container. The job runs daily and they want to minimize costs. Which service should they use?
**Options:**
- A) AWS Lambda
- B) Amazon ECS with Fargate
- C) AWS Batch with Spot Instances
- D) Amazon EC2 On-Demand instances

**Answer:** C

**해설:** Lambda (A)는 15분 시간 제한이 있어 3시간 작업은 불가능하다. AWS Batch는 시간 제한 없이 Docker 이미지를 실행하고, Spot Instances를 활용하여 비용을 최소화할 수 있다. ECS Fargate (B)도 가능하지만 Batch가 배치 작업에 더 최적화되어 있고 Spot Instance를 효율적으로 관리한다. EC2 On-Demand (D)는 비용이 가장 높다.

**핵심 개념:** AWS Batch vs Lambda

---

### Q4. A company wants to create targeted marketing campaigns across email, SMS, and push notifications with the ability to create customer segments and message templates. Which AWS service should they use?
**Options:**
- A) Amazon SES
- B) Amazon SNS
- C) Amazon Pinpoint
- D) Amazon SQS

**Answer:** C

**해설:** Amazon Pinpoint는 이메일, SMS, 푸시, 음성, 인앱 메시징을 지원하는 다채널 마케팅 서비스로, 메시지 템플릿, 타겟 세그먼트, 전체 캠페인을 관리할 수 있다. SES (A)는 이메일 전용이다. SNS (B)는 개별 메시지 관리만 지원한다. SQS (D)는 메시지 큐 서비스이다.

**핵심 개념:** Amazon Pinpoint vs SES vs SNS

---

### Q5. A company wants to integrate data from Salesforce into Amazon S3 on a scheduled basis. The data should be filtered and validated before being stored. Which service should they use?
**Options:**
- A) AWS Glue ETL
- B) Amazon AppFlow
- C) AWS DataSync
- D) AWS DMS

**Answer:** B

**해설:** Amazon AppFlow는 Salesforce 등 SaaS 앱에서 AWS 서비스(S3, Redshift 등)로 데이터를 스케줄/이벤트/온디맨드로 전송하며, 필터링과 유효성 검사 같은 데이터 변환 기능을 제공한다. Glue (A)는 데이터 레이크/ETL용이다. DataSync (C)는 온프레미스 스토리지 마이그레이션용이다. DMS (D)는 데이터베이스 마이그레이션용이다.

**핵심 개념:** Amazon AppFlow

---

### Q6. A company wants to reduce their AWS costs by automatically stopping EC2 instances and RDS instances outside of business hours. Which solution requires the LEAST operational overhead?
**Options:**
- A) Write a Lambda function triggered by CloudWatch Events
- B) Use AWS Instance Scheduler solution
- C) Use EC2 Auto Scaling scheduled actions only
- D) Manually stop and start instances each day

**Answer:** B

**해설:** AWS Instance Scheduler는 CloudFormation으로 배포되는 사전 구축된 AWS 솔루션으로, EC2와 RDS 인스턴스를 자동으로 시작/중지하며 최대 70%의 비용 절감이 가능하다. Lambda (A)는 직접 개발/유지 관리 필요. EC2 Auto Scaling (C)은 RDS를 포함하지 않는다. D는 운영 부담이 가장 크다.

**핵심 개념:** Instance Scheduler on AWS
---

## White Papers & Architectures

---

### Q1. A company wants to review their AWS architecture against best practices across all six pillars of the Well-Architected Framework. Which tool should they use?
**Options:**
- A) AWS Trusted Advisor
- B) AWS Well-Architected Tool
- C) AWS Config
- D) AWS CloudFormation

**Answer:** B

**해설:** AWS Well-Architected Tool은 6개 Pillar에 대해 아키텍처를 검토하고 모범 사례를 채택하도록 설계된 무료 도구이다. Trusted Advisor (A)는 계정 수준의 권장사항을 제공하지만 Well-Architected Framework의 구조화된 워크로드 검토는 제공하지 않는다. Config (C)는 리소스 구성 규정 준수용이다. CloudFormation (D)은 IaC 도구이다.

**핵심 개념:** AWS Well-Architected Tool

---

### Q2. Which of the following is NOT one of the six pillars of the AWS Well-Architected Framework?
**Options:**
- A) Operational Excellence
- B) Scalability
- C) Sustainability
- D) Cost Optimization

**Answer:** B

**해설:** 6 Pillars는 Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability이다. Scalability는 Pillar가 아니며, Performance Efficiency 또는 Reliability의 하위 개념에 해당한다.

**핵심 개념:** Well-Architected Framework 6 Pillars

---

### Q3. An organization has a Business Support plan and wants to programmatically access AWS account-level recommendations for cost optimization, security, and service limits. Which service provides this capability?
**Options:**
- A) AWS Well-Architected Tool
- B) AWS Trusted Advisor with AWS Support API
- C) AWS Cost Explorer
- D) AWS Config

**Answer:** B

**해설:** AWS Trusted Advisor는 Business/Enterprise Support Plan에서 전체 체크와 **AWS Support API를 통한 프로그래밍 접근**을 제공한다. 비용 최적화, 보안, 서비스 한도 등 6가지 카테고리의 권장사항을 제공한다. Well-Architected Tool (A)은 워크로드별 검토 도구이다. Cost Explorer (C)는 비용만 다룬다. Config (D)는 리소스 구성 추적용이다.

**핵심 개념:** Trusted Advisor - Business/Enterprise Support Plan

---

### Q4. A solutions architect is designing a new application architecture. According to the AWS Well-Architected Framework general guiding principles, what approach should the architect take regarding capacity planning?
**Options:**
- A) Over-provision resources to handle peak capacity
- B) Under-provision resources and scale manually when needed
- C) Stop guessing capacity needs and use auto scaling
- D) Use the largest instance types available to ensure performance

**Answer:** C

**해설:** Well-Architected Framework의 일반 원칙 중 하나는 "Stop guessing your capacity needs"이다. Auto Scaling을 활용하여 실제 수요에 따라 리소스를 자동 조정해야 한다. 과도한 프로비저닝 (A)은 비용 낭비, 수동 스케일링 (B)은 대응이 느리고 운영 부담이 크다. 가장 큰 인스턴스 (D)는 비용 낭비이다.

**핵심 개념:** Well-Architected Framework - General Principles

---

### Q5. Which AWS service provides recommendations across cost optimization, performance, security, fault tolerance, service limits, and operational excellence without requiring any software installation?
**Options:**
- A) AWS Inspector
- B) AWS Trusted Advisor
- C) AWS GuardDuty
- D) AWS Well-Architected Tool

**Answer:** B

**해설:** AWS Trusted Advisor는 설치 불필요한 AWS 계정 수준 평가 도구로, 6가지 카테고리(비용 최적화, 성능, 보안, 내결함성, 서비스 한도, 운영 우수성)에 대한 권장사항을 제공한다. Inspector (A)는 EC2/컨테이너 취약성 스캔, GuardDuty (C)는 위협 탐지, Well-Architected Tool (D)은 워크로드별 검토이다.

**핵심 개념:** AWS Trusted Advisor
---

## Exam Preparation

---

### Q1. A company is designing a multi-tier web application on AWS. They want to ensure the architecture follows AWS best practices. Which combination of actions aligns with the AWS Well-Architected Framework? (Select TWO)
**Options:**
- A) Over-provision all resources to handle unexpected traffic spikes
- B) Use Auto Scaling to dynamically adjust capacity based on demand
- C) Test systems only in development environments
- D) Use data-driven approaches to make architectural decisions
- E) Design a fixed architecture that never changes

**Answer:** B, D

**해설:** Well-Architected Framework은 용량 추측을 중단하고 Auto Scaling 사용(B)을 권장하며, 데이터 기반 아키텍처 결정(D)을 강조한다. 과도한 프로비저닝(A)은 비용 최적화에 반한다. 개발 환경만 테스트(C)는 프로덕션 규모 테스트 원칙에 반한다. 고정 아키텍처(E)는 진화하는 아키텍처 원칙에 반한다.

**핵심 개념:** Well-Architected Framework General Principles

---

### Q2. During the SAA-C03 exam, you encounter a question with four possible answers. Two answers describe simple, straightforward solutions using managed AWS services. The other two describe complex custom solutions involving multiple Lambda functions, custom scripts, and manual configuration. What is the BEST approach?
**Options:**
- A) Choose the most complex solution as it likely covers all edge cases
- B) Eliminate the complex solutions first and evaluate the simpler managed service solutions
- C) Choose the solution with the most AWS services mentioned
- D) Skip the question entirely

**Answer:** B

**해설:** 시험 전략에 따르면, 해결책이 가능하지만 매우 복잡하면 보통 틀린 답이다. 먼저 확실히 틀린 답(복잡한 커스텀 솔루션)을 소거하고, 남은 간단한 관리형 서비스 솔루션 중 가장 합리적인 것을 선택해야 한다. AWS는 관리형 서비스를 선호한다.

**핵심 개념:** Exam Strategy - Proceed by Elimination

---

### Q3. A solutions architect needs to evaluate their organization's AWS account for potential security vulnerabilities, cost savings opportunities, and service limit issues. They need programmatic access to these recommendations. Which combination is required?
**Options:**
- A) AWS Well-Architected Tool + Basic Support Plan
- B) AWS Trusted Advisor + Developer Support Plan
- C) AWS Trusted Advisor + Business Support Plan
- D) AWS Config + Enterprise Support Plan

**Answer:** C

**해설:** AWS Trusted Advisor는 보안, 비용 최적화, 서비스 한도 등 6가지 카테고리의 권장사항을 제공한다. 전체 체크와 AWS Support API를 통한 **프로그래밍 접근**은 **Business 또는 Enterprise Support Plan**에서만 가능하다. Developer Plan(B)은 전체 체크를 제공하지 않는다.

**핵심 개념:** Trusted Advisor + Business/Enterprise Support Plan

---

### Q4. A company wants to understand how different AWS services work together for a serverless architecture. Which resources should the solutions architect consult? (Select TWO)
**Options:**
- A) https://aws.amazon.com/architecture/
- B) https://aws.amazon.com/solutions/
- C) AWS CloudFormation documentation only
- D) AWS pricing calculator only
- E) Individual EC2 instance specifications

**Answer:** A, B

**해설:** AWS Architecture Center(A)와 AWS Solutions(B)는 서버리스 아키텍처를 포함한 다양한 AWS 참조 아키텍처와 솔루션을 제공한다. CloudFormation 문서(C)는 IaC에만 초점을 맞춘다. 가격 계산기(D)와 EC2 사양(E)은 아키텍처 패턴을 제공하지 않는다.

**핵심 개념:** AWS Reference Architectures

---

### Q5. What is the minimum passing score for the AWS Solutions Architect Associate (SAA-C03) exam, and how many questions are on the exam?
**Options:**
- A) 700/1000, 50 questions
- B) 720/1000, 65 questions
- C) 750/1000, 75 questions
- D) 720/1000, 75 questions

**Answer:** B

**해설:** SAA-C03 시험은 65문항이며, 130분 동안 진행된다. 합격 점수는 1000점 만점 중 720점이다. 불합격 시 14일 후에 재응시할 수 있다.

**핵심 개념:** SAA-C03 Exam Structure