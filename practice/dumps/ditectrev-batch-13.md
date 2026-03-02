# Ditectrev SAA-C03 Practice Questions — Batch 13 (Q601-Q650)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q601. How many types of block devices does Amazon EC2 support?

**Options:**
- A) 4.
- B) 5.
- C) 2.
- D) 1.

**Answer:** C

**해설:**

> **문제:** Amazon EC2는 몇 가지 유형의 블록 디바이스를 지원하는가?

| 선지 | 번역 |
|------|------|
| A | 4가지 |
| B | 5가지 |
| C | 2가지 |
| D | 1가지 |

**(A)** : 오답. EC2가 지원하는 블록 디바이스 유형은 4가지가 아닙니다. → [📖 오답. EC2가 지원하는 블록 디바이스 유형은 4가지가 아닙니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : 오답. 5가지가 아닙니다.

**(C) 정답** : Amazon EC2는 두 가지 유형의 블록 디바이스를 지원합니다. Instance Store(임시 스토리지)와 EBS(Elastic Block Store)입니다. → [📖 Amazon EC2는 두 가지 유형의 블록 디바이스를 지원합니다. Instance Store(임시 스토리지)...](/section/05-ec2-instance-storage#ebs-vs-efs-vs-instance-store-비교-시험-핵심)

**(D)** : 오답. 1가지가 아닙니다.

**핵심 개념:** EC2 블록 디바이스 유형 (Instance Store, EBS)

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store), [EBS vs EFS vs Instance Store 비교 시험 핵심!](/section/05-ec2-instance-storage#ebs-vs-efs-vs-instance-store-비교-시험-핵심)

---

### Q602. SQL Server [...] store log ins and passwords in the master database.

**Options:**
- A) can be configured to but by default does not.
- B) doesn't.
- C) does.

**Answer:** C

**해설:**

> **문제:** SQL Server는 master 데이터베이스에 로그인 정보와 비밀번호를 [...].

| 선지 | 번역 |
|------|------|
| A | 구성은 가능하지만 기본적으로는 저장하지 않는다 |
| B | 저장하지 않는다 |
| C | 저장한다 |

**(A)** : 오답. 선택적으로 구성하는 것이 아닙니다.

**(B)** : 오답. SQL Server는 실제로 master 데이터베이스에 로그인 정보를 저장합니다.

**(C) 정답** : SQL Server는 기본적으로 로그인 및 비밀번호를 master 데이터베이스에 저장합니다. RDS에서 SQL Server를 사용할 때 이 점이 중요하며, master 데이터베이스가 복원되면 로그인 정보도 함께 복원됩니다. → [📖 SQL Server는 기본적으로 로그인 및 비밀번호를 master 데이터베이스에 저장합니다. RDS에서 SQ...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS SQL Server, master 데이터베이스

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q603. You are using an m1.small EC2 Instance with one 300GB EBS volume to host a relational database. You determined that write throughput to the database needs to be increased. Which of the following approaches can help achieve this? (Choose 2 answers)

**Options:**
- A) Use an array of EBS volumes.
- B) Enable Multi-AZ mode.
- C) Place the instance in an Auto Scaling Groups.
- D) Add an EBS volume and place into RAID 5.
- E) Increase the size of the EC2 Instance.
- F) Put the database behind an Elastic Load Balancer.

**Answer:** A, E

**해설:**

> **문제:** m1.small EC2 인스턴스와 300GB EBS 볼륨으로 관계형 데이터베이스를 호스팅 중입니다. 데이터베이스 쓰기 처리량을 높이려면 어떻게 해야 하는가? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | EBS 볼륨 배열(RAID 0) 사용 |
| B | Multi-AZ 모드 활성화 |
| C | Auto Scaling 그룹에 인스턴스 배치 |
| D | EBS 볼륨 추가 후 RAID 5 구성 |
| E | EC2 인스턴스 크기 증가 |
| F | ELB 뒤에 데이터베이스 배치 |

**(A) 정답** : 여러 EBS 볼륨을 RAID 0 배열로 구성하면 쓰기 처리량을 높일 수 있습니다. → [📖 여러 EBS 볼륨을 RAID 0 배열로 구성하면 쓰기 처리량을 높일 수 있습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : Multi-AZ는 가용성 향상을 위한 것이지 쓰기 처리량 향상과는 무관합니다. → [📖 Multi-AZ는 가용성 향상을 위한 것이지 쓰기 처리량 향상과는 무관합니다.](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : Auto Scaling은 인스턴스 수를 조정하지만, 단일 DB 인스턴스의 쓰기 성능을 직접 향상시키지 않습니다. → [📖 Auto Scaling은 인스턴스 수를 조정하지만, 단일 DB 인스턴스의 쓰기 성능을 직접 향상시키지 않습니...](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(D)** : RAID 5는 패리티 오버헤드로 인해 쓰기 성능이 RAID 0보다 낮습니다. → [📖 RAID 5는 패리티 오버헤드로 인해 쓰기 성능이 RAID 0보다 낮습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(E) 정답** : 더 큰 EC2 인스턴스로 업그레이드하면 더 많은 CPU/메모리와 더 높은 네트워크 대역폭을 확보하여 쓰기 처리량을 향상시킬 수 있습니다. → [📖 더 큰 EC2 인스턴스로 업그레이드하면 더 많은 CPU/메모리와 더 높은 네트워크 대역폭을 확보하여 쓰기 처...](/section/03-ec2-basics#ec2-인스턴스-타입)

**(F)** : ELB는 로드 밸런싱용이며 DB 쓰기 처리량과 무관합니다. → [📖 ELB는 로드 밸런싱용이며 DB 쓰기 처리량과 무관합니다.](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**핵심 개념:** EBS 성능 최적화, EC2 인스턴스 크기 조정

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q604. A user is hosting a website in the US West-1 region. The website has the highest client base from the Asia-Pacific (Singapore / Japan) region. The application is accessing data from S3 before serving it to client. Which of the below mentioned regions gives a better performance for S3 objects?

**Options:**
- A) Japan.
- B) Singapore.
- C) US East.
- D) US West-1.

**Answer:** D

**해설:**

> **문제:** 사용자가 US West-1 리전에서 웹사이트를 호스팅하고 있습니다. 아시아-태평양(싱가포르/일본) 지역 클라이언트가 가장 많습니다. 애플리케이션은 S3에서 데이터를 가져와 클라이언트에 제공합니다. S3 객체에 대해 더 나은 성능을 제공하는 리전은 어디인가?

| 선지 | 번역 |
|------|------|
| A | 일본 |
| B | 싱가포르 |
| C | US East |
| D | US West-1 |

**(A)** : 오답. 클라이언트가 아시아 기반이더라도, 웹 서버가 US West-1에 있으므로 S3도 같은 리전에 있어야 전송 지연이 줄어듭니다. → [📖 오답. 클라이언트가 아시아 기반이더라도, 웹 서버가 US West-1에 있으므로 S3도 같은 리전에 있어야 ...](/section/01-getting-started#aws-글로벌-인프라)

**(B)** : 오답. 같은 이유로, 서버와 다른 리전에 S3를 두면 서버-S3 간 레이턴시가 증가합니다. → [📖 오답. 같은 이유로, 서버와 다른 리전에 S3를 두면 서버-S3 간 레이턴시가 증가합니다.](/section/01-getting-started#aws-글로벌-인프라)

**(C)** : 오답. US East는 US West-1보다 멀어 서버-S3 간 레이턴시가 높아집니다. → [📖 오답. US East는 US West-1보다 멀어 서버-S3 간 레이턴시가 높아집니다.](/section/01-getting-started#aws-글로벌-인프라)

**(D) 정답** : 웹 서버와 S3 버킷을 같은 리전(US West-1)에 두면 서버에서 S3로의 데이터 전송 레이턴시가 최소화됩니다. 리전 내 전송은 무료이며 빠릅니다. → [📖 웹 서버와 S3 버킷을 같은 리전(US West-1)에 두면 서버에서 S3로의 데이터 전송 레이턴시가 최소화...](/section/10-amazon-s3#s3-버킷-bucket)

**핵심 개념:** S3 리전 배치 전략, 리전 내 데이터 전송

**관련 노트:** [S3 버킷 Bucket](/section/10-amazon-s3#s3-버킷-bucket)

---

### Q605. You need to set up security for your VPC and you know that Amazon VPC provides two features that you can use to increase security for your VPC: Security groups and network access control lists (ACLs). You start to look into security groups first. Which statement below is incorrect in relation to security groups?

**Options:**
- A) Are stateful: Return traffic is automatically allowed, regardless of any rules.
- B) Evaluate all rules before deciding whether to allow traffic.
- C) Support allow rules and deny rules.
- D) Operate at the instance level (first layer of defense).

**Answer:** C

**해설:**

> **문제:** VPC 보안 설정을 위해 보안 그룹(Security Group)을 검토 중입니다. 보안 그룹에 관한 설명 중 틀린 것은?

| 선지 | 번역 |
|------|------|
| A | 상태 저장(Stateful): 반환 트래픽은 규칙에 관계없이 자동으로 허용됨 |
| B | 트래픽 허용 여부 결정 전 모든 규칙을 평가함 |
| C | 허용(Allow) 규칙과 거부(Deny) 규칙을 모두 지원함 |
| D | 인스턴스 수준에서 동작함 (첫 번째 방어 레이어) |

**(A)** : 올바른 설명. 보안 그룹은 Stateful이므로 반환 트래픽은 자동 허용됩니다. → [📖 올바른 설명. 보안 그룹은 Stateful이므로 반환 트래픽은 자동 허용됩니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 올바른 설명. 보안 그룹은 모든 규칙을 평가 후 허용 여부를 결정합니다. → [📖 올바른 설명. 보안 그룹은 모든 규칙을 평가 후 허용 여부를 결정합니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(C) 정답** : 틀린 설명입니다. 보안 그룹은 **허용(Allow) 규칙만** 지원합니다. 거부(Deny) 규칙을 지원하는 것은 NACL입니다. → [📖 틀린 설명입니다. 보안 그룹은 **허용(Allow) 규칙만** 지원합니다. 거부(Deny) 규칙을 지원하는 ...](/section/25-vpc#security-group-vs-nacl)

**(D)** : 올바른 설명. 보안 그룹은 인스턴스 수준에서 동작합니다. → [📖 올바른 설명. 보안 그룹은 인스턴스 수준에서 동작합니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** 보안 그룹 vs NACL — 보안 그룹은 Allow만, NACL은 Allow/Deny 모두 지원

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q606. Can a single EBS volume be attached to multiple EC2 instances at the same time?

**Options:**
- A) Yes.
- B) No.
- C) Only for high-performance EBS volumes.
- D) Only when the instances are located in the US regions.

**Answer:** B

**해설:**

> **문제:** 단일 EBS 볼륨을 여러 EC2 인스턴스에 동시에 연결할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 예 |
| B | 아니오 |
| C | 고성능 EBS 볼륨에 한해서만 가능 |
| D | 미국 리전에 인스턴스가 있을 때만 가능 |

**(A)** : 오답. 일반적으로 EBS 볼륨은 하나의 인스턴스에만 연결 가능합니다. → [📖 오답. 일반적으로 EBS 볼륨은 하나의 인스턴스에만 연결 가능합니다.](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

**(B) 정답** : 기본적으로 EBS 볼륨은 단일 EC2 인스턴스에만 연결할 수 있습니다. (단, EBS Multi-Attach 기능을 사용하면 일부 볼륨 유형에서 다중 연결이 가능하지만, 이는 특수 기능입니다.) → [📖 기본적으로 EBS 볼륨은 단일 EC2 인스턴스에만 연결할 수 있습니다. (단, EBS Multi-Attach...](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

**(C)** : 오답. 고성능 볼륨이라도 기본적으로 단일 연결입니다. → [📖 오답. 고성능 볼륨이라도 기본적으로 단일 연결입니다.](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

**(D)** : 오답. 리전과 무관하게 단일 연결이 기본입니다. → [📖 오답. 리전과 무관하게 단일 연결이 기본입니다.](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

**핵심 개념:** EBS 볼륨 연결 제한, EBS Multi-Attach

**관련 노트:** [EBS Multi-Attach io1/io2](/section/05-ec2-instance-storage#ebs-multiattach-io1io2), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q607. You are planning and configuring some EBS volumes for an application. In order to get the most performance out of your EBS volumes, you should attach them to an instance with enough [...] to support your volumes.

**Options:**
- A) redundancy.
- B) storage.
- C) bandwidth.
- D) memory.

**Answer:** C

**해설:**

> **문제:** EBS 볼륨의 최대 성능을 얻으려면, 볼륨을 지원할 만큼 충분한 [...]을 가진 인스턴스에 연결해야 합니다.

| 선지 | 번역 |
|------|------|
| A | 이중화(redundancy) |
| B | 스토리지(storage) |
| C | 대역폭(bandwidth) |
| D | 메모리(memory) |

**(A)** : 오답. 이중화는 가용성 관련 개념입니다. → [📖 오답. 이중화는 가용성 관련 개념입니다.](/section/06-high-availability-scalability#scalability-vs-high-availability)

**(B)** : 오답. EBS 볼륨이 스토리지를 제공하므로 인스턴스 자체 스토리지가 병목은 아닙니다. → [📖 오답. EBS 볼륨이 스토리지를 제공하므로 인스턴스 자체 스토리지가 병목은 아닙니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C) 정답** : EBS 볼륨의 성능은 인스턴스와 EBS 간의 네트워크 대역폭(I/O 처리량)에 의해 제한됩니다. 인스턴스 타입별로 EBS 최대 처리량이 다릅니다. → [📖 EBS 볼륨의 성능은 인스턴스와 EBS 간의 네트워크 대역폭(I/O 처리량)에 의해 제한됩니다. 인스턴스 타...](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(D)** : 오답. 메모리는 EBS I/O 성능의 직접적인 병목 요소가 아닙니다.

**핵심 개념:** EBS 성능, 인스턴스 EBS 대역폭 한도

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

---

### Q608. An organization has three separate AWS accounts, one each for development, testing, and production. The organization wants the testing team to have access to certain AWS resources in the production account. How can the organization achieve this?

**Options:**
- A) It is not possible to access resources of one account with another account.
- B) Create the IAM roles with cross account access.
- C) Create the IAM user in a test account, and allow it access to the production environment with the IAM policy.
- D) Create the IAM users with cross account access.

**Answer:** B

**해설:**

> **문제:** 개발, 테스트, 프로덕션용 별도 AWS 계정 3개가 있습니다. 테스트 팀이 프로덕션 계정의 특정 리소스에 접근하도록 하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 다른 계정의 리소스에 접근하는 것은 불가능하다 |
| B | 크로스 계정 접근 IAM 역할 생성 |
| C | 테스트 계정에 IAM 사용자를 생성하고 IAM 정책으로 프로덕션 접근 허용 |
| D | 크로스 계정 접근 IAM 사용자 생성 |

**(A)** : 오답. AWS는 크로스 계정 접근을 지원합니다.

**(B) 정답** : IAM 역할에 크로스 계정 신뢰 정책을 설정하면, 테스트 계정 사용자가 프로덕션 계정의 IAM 역할을 assume하여 접근할 수 있습니다. 이것이 AWS 권장 방식입니다. → [📖 IAM 역할에 크로스 계정 신뢰 정책을 설정하면, 테스트 계정 사용자가 프로덕션 계정의 IAM 역할을 ass...](/section/02-iam#iam-roles-역할)

**(C)** : 오답. IAM 사용자는 계정 간 접근에 적합하지 않으며, 역할(Role)을 사용하는 것이 올바른 방법입니다. → [📖 오답. IAM 사용자는 계정 간 접근에 적합하지 않으며, 역할(Role)을 사용하는 것이 올바른 방법입니다.](/section/02-iam#users-groups)

**(D)** : 오답. 크로스 계정 접근은 IAM 사용자가 아닌 IAM 역할(Role)로 구현합니다. → [📖 오답. 크로스 계정 접근은 IAM 사용자가 아닌 IAM 역할(Role)로 구현합니다.](/section/02-iam#iam-roles-역할)

**핵심 개념:** IAM 크로스 계정 역할, AssumeRole

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

---

### Q609. A benefits enrollment company is hosting a 3-tier web application running in a VPC on AWS which includes a NAT instance in the public Web tier. There is enough provisioned capacity for the expected workload for the new fiscal year benefit enrollment period plus some extra overhead. Enrollment proceeds nicely for two days and then the web tier becomes unresponsive. Upon investigation using CloudWatch and other monitoring tools it is discovered that there is an extremely large and unanticipated amount of inbound traffic coming from a set of 15 specific IP addresses over port 80 from a country where the benefits company has no customers. The web tier instances are so overloaded that benefit enrollment administrators cannot even SSH into them. Which activity would be useful in defending against this attack?

**Options:**
- A) Create a custom route table associated with the web tier and block the attacking IP addresses from the IGW (Internet Gateway).
- B) Change the EIP (Elastic IP Address) of the NAT instance in the web tier subnet and update the Main Route Table with the new EIP.
- C) Create 15 Security Group rules to block the attacking IP addresses over port 80.
- D) Create an inbound NACL (Network Access control list) associated with the web tier subnet with deny rules to block the attacking IP addresses.

**Answer:** D

**해설:**

> **문제:** 복지 등록 회사의 3티어 웹 애플리케이션이 DDoS 공격을 받고 있습니다. 특정 국가의 15개 IP 주소에서 포트 80으로 대량의 트래픽이 유입됩니다. 어떻게 방어할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 웹 티어에 커스텀 라우팅 테이블을 생성하여 IGW에서 공격 IP 차단 |
| B | NAT 인스턴스의 EIP를 변경하고 라우팅 테이블 업데이트 |
| C | 보안 그룹에 15개 규칙을 추가하여 공격 IP 차단 |
| D | 웹 티어 서브넷에 인바운드 NACL 거부 규칙 생성으로 공격 IP 차단 |

**(A)** : 오답. 라우팅 테이블은 IP 기반 차단 기능이 없습니다.

**(B)** : 오답. EIP 변경은 공격 IP를 차단하지 않습니다. → [📖 오답. EIP 변경은 공격 IP를 차단하지 않습니다.](/section/04-ec2-associate#elastic-ip)

**(C)** : 오답. 보안 그룹은 거부(Deny) 규칙을 지원하지 않으므로 특정 IP를 명시적으로 차단할 수 없습니다. → [📖 오답. 보안 그룹은 거부(Deny) 규칙을 지원하지 않으므로 특정 IP를 명시적으로 차단할 수 없습니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(D) 정답** : NACL은 서브넷 수준에서 동작하며 거부(Deny) 규칙을 지원합니다. 특정 IP 주소를 명시적으로 차단할 수 있으며, 인스턴스에 도달하기 전에 트래픽을 차단합니다. → [📖 NACL은 서브넷 수준에서 동작하며 거부(Deny) 규칙을 지원합니다. 특정 IP 주소를 명시적으로 차단할 ...](/section/25-vpc#nacl-network-access-control-list)

**핵심 개념:** NACL Deny 규칙, DDoS 방어, 보안 그룹 vs NACL

**관련 노트:** [NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list), [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

---

### Q610. You launch an Amazon EC2 instance without an assigned AWS identity and Access Management (IAM) role. Later, you decide that the instance should be running with an IAM role. Which action must you take in order to have a running Amazon EC2 instance with an IAM role assigned to it?

**Options:**
- A) Create an image of the instance, and register the image with an IAM role assigned and an Amazon EBS volume mapping.
- B) Create a new IAM role with the same permissions as an existing IAM role, and assign it to the running instance.
- C) Create an image of the instance, add a new IAM role with the same permissions as the desired IAM role, and deregister the image with the new role assigned.
- D) Create an image of the instance, and use this image to launch a new instance with the desired IAM role assigned.

**Answer:** D

**해설:**

> **문제:** IAM 역할 없이 EC2 인스턴스를 시작했습니다. 나중에 IAM 역할이 필요하게 되었습니다. 실행 중인 EC2 인스턴스에 IAM 역할을 할당하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 인스턴스 이미지를 생성하고, IAM 역할과 EBS 볼륨 매핑을 지정하여 등록 |
| B | 기존 IAM 역할과 동일한 권한의 새 역할을 생성하여 실행 중인 인스턴스에 할당 |
| C | 인스턴스 이미지를 생성하고, 새 IAM 역할 추가 후 이미지 등록 취소 |
| D | 인스턴스 이미지를 생성하고, 원하는 IAM 역할을 지정하여 새 인스턴스 시작 |

**(A)** : 오답. IAM 역할은 이미지 등록 시 직접 지정하는 것이 아닙니다. → [📖 오답. IAM 역할은 이미지 등록 시 직접 지정하는 것이 아닙니다.](/section/02-iam#iam-roles-역할)

**(B)** : 오답. 이 문제는 이전 AWS 제한 사항에 관한 것으로, 당시에는 실행 중인 인스턴스에 IAM 역할을 직접 연결할 수 없었습니다. → [📖 오답. 이 문제는 이전 AWS 제한 사항에 관한 것으로, 당시에는 실행 중인 인스턴스에 IAM 역할을 직접 ...](/section/02-iam#iam-roles-역할)

**(C)** : 오답. 이미지 등록 취소는 올바른 절차가 아닙니다. → [📖 오답. 이미지 등록 취소는 올바른 절차가 아닙니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(D) 정답** : 기존 방법은 인스턴스의 AMI를 생성하고, 그 AMI로 원하는 IAM 역할을 지정하여 새 인스턴스를 시작하는 것이었습니다. (현재 AWS에서는 실행 중인 인스턴스에도 IAM 역할을 연결/교체할 수 있습니다.) → [📖 기존 방법은 인스턴스의 AMI를 생성하고, 그 AMI로 원하는 IAM 역할을 지정하여 새 인스턴스를 시작하는...](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** EC2 IAM 역할 할당, 인스턴스 프로파일

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할)

---

### Q611. Does AWS Direct Connect allow you access to all Availability Zones within a Region?

**Options:**
- A) Depends on the type of connection.
- B) Yes.
- C) No.
- D) Only when there's just one Availability Zone in a region. If there are more than one, only one availability zone can be accessed directly.

**Answer:** A

**해설:**

> **문제:** AWS Direct Connect를 통해 리전 내 모든 가용 영역(AZ)에 접근할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 연결 유형에 따라 다름 |
| B | 예 |
| C | 아니오 |
| D | AZ가 하나일 때만 가능, 여러 개이면 하나만 직접 접근 가능 |

**(A) 정답** : Direct Connect의 연결 유형(전용 연결 vs 호스팅 연결)과 설정에 따라 리전 내 AZ 접근 가능 여부가 달라질 수 있습니다. 일반적으로 VGW(Virtual Private Gateway)를 통해 VPC 내 모든 AZ에 접근 가능하지만, 구성에 따라 다릅니다. → [📖 Direct Connect의 연결 유형(전용 연결 vs 호스팅 연결)과 설정에 따라 리전 내 AZ 접근 가능...](/section/25-vpc#direct-connect-dx)

**(B)** : 항상 그런 것은 아닙니다.

**(C)** : 항상 그런 것도 아닙니다.

**(D)** : 오답. AZ 수와 무관합니다.

**핵심 개념:** AWS Direct Connect, 연결 유형, AZ 접근성

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx)

---

### Q612. What is the durability of S3 RRS?

**Options:**
- A) 99.99%.
- B) 99.95%.
- C) 99.995%.
- D) 99.999999999%.

**Answer:** A

**해설:**

> **문제:** S3 RRS(Reduced Redundancy Storage)의 내구성은?

| 선지 | 번역 |
|------|------|
| A | 99.99% |
| B | 99.95% |
| C | 99.995% |
| D | 99.999999999% (11 nines) |

**(A) 정답** : S3 RRS(Reduced Redundancy Storage)는 99.99%의 내구성을 제공합니다. 이는 S3 Standard의 11 nines(99.999999999%)보다 낮으며, 재생성 가능한 데이터에 적합한 저렴한 스토리지 옵션입니다. → [📖 S3 RRS(Reduced Redundancy Storage)는 99.99%의 내구성을 제공합니다. 이는 S...](/section/10-amazon-s3#스토리지-클래스-비교표)

**(B)** : 오답. 99.95%는 RRS의 가용성에 가깝습니다. → [📖 오답. 99.95%는 RRS의 가용성에 가깝습니다.](/section/10-amazon-s3#스토리지-클래스-비교표)

**(C)** : 오답. 해당 수치는 RRS의 내구성이 아닙니다. → [📖 오답. 해당 수치는 RRS의 내구성이 아닙니다.](/section/10-amazon-s3#스토리지-클래스-비교표)

**(D)** : 오답. 11 nines는 S3 Standard의 내구성입니다. → [📖 오답. 11 nines는 S3 Standard의 내구성입니다.](/section/10-amazon-s3#스토리지-클래스-비교표)

**핵심 개념:** S3 스토리지 클래스별 내구성 — Standard: 11 nines, RRS: 99.99%

**관련 노트:** [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스), [스토리지 클래스 비교표](/section/10-amazon-s3#스토리지-클래스-비교표)

---

### Q613. Your organization is in the business of architecting complex transactional databases. For a variety of reasons, this has been done on EBS. What is AWS's recommendation for customers who have architected databases using EBS for backups?

**Options:**
- A) Backups to Amazon S3 be performed through the database management system.
- B) Backups to AWS Storage Gateway be performed through the database management system.
- C) If you take regular snapshots no further backups are required.
- D) Backups to Amazon Glacier be performed through the database management system.

**Answer:** A

**해설:**

> **문제:** EBS를 사용하여 복잡한 트랜잭션 데이터베이스를 구축한 고객에게 AWS가 권장하는 백업 방법은?

| 선지 | 번역 |
|------|------|
| A | 데이터베이스 관리 시스템을 통해 Amazon S3에 백업 수행 |
| B | 데이터베이스 관리 시스템을 통해 AWS Storage Gateway에 백업 수행 |
| C | 정기적인 스냅샷을 찍으면 추가 백업 불필요 |
| D | 데이터베이스 관리 시스템을 통해 Amazon Glacier에 백업 수행 |

**(A) 정답** : AWS는 EBS 기반 데이터베이스의 백업을 데이터베이스 관리 시스템(DBMS)을 통해 Amazon S3에 수행하도록 권장합니다. EBS 스냅샷은 보완 수단이지만, DBMS 레벨의 백업이 더 일관성 있는 백업을 보장합니다. → [📖 AWS는 EBS 기반 데이터베이스의 백업을 데이터베이스 관리 시스템(DBMS)을 통해 Amazon S3에 수...](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(B)** : 오답. Storage Gateway는 백업의 주요 대상으로 권장되지 않습니다. → [📖 오답. Storage Gateway는 백업의 주요 대상으로 권장되지 않습니다.](/section/14-storage-extras#aws-storage-gateway)

**(C)** : 오답. EBS 스냅샷만으로는 충분하지 않을 수 있습니다. DBMS 레벨 백업이 필요합니다. → [📖 오답. EBS 스냅샷만으로는 충분하지 않을 수 있습니다. DBMS 레벨 백업이 필요합니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(D)** : 오답. Glacier는 장기 아카이브용으로 적합하지만 일반 DB 백업의 주 대상은 S3입니다. → [📖 오답. Glacier는 장기 아카이브용으로 적합하지만 일반 DB 백업의 주 대상은 S3입니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** EBS 데이터베이스 백업 전략, S3 백업

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

---

### Q614. You need to create a load balancer in a VPC network that you are building. You can make your load balancer internal (private) or internet-facing (public). When you make your load balancer internal, a DNS name will be created, and it will contain the private IP address of the load balancer. An internal load balancer is not exposed to the internet. When you make your load balancer internet-facing, a DNS name will be created with the public IP address. If you want the Internet-facing load balancer to be connected to the Internet, where must this load balancer reside?

**Options:**
- A) The load balancer must reside in a subnet that is connected to the internet using the internet gateway.
- B) The load balancer must reside in a subnet that is not connected to the internet.
- C) The load balancer must not reside in a subnet that is connected to the internet.
- D) The load balancer must be completely outside of your IP.

**Answer:** A

**해설:**

> **문제:** 인터넷 연결 로드 밸런서(Internet-facing)가 인터넷에 연결되려면 어느 서브넷에 위치해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 인터넷 게이트웨이로 인터넷에 연결된 서브넷에 위치해야 함 |
| B | 인터넷에 연결되지 않은 서브넷에 위치해야 함 |
| C | 인터넷에 연결된 서브넷에 위치하면 안 됨 |
| D | IP 범위 외부에 완전히 위치해야 함 |

**(A) 정답** : 인터넷 연결 로드 밸런서는 반드시 인터넷 게이트웨이(IGW)를 통해 인터넷에 연결된 퍼블릭 서브넷에 위치해야 합니다. → [📖 인터넷 연결 로드 밸런서는 반드시 인터넷 게이트웨이(IGW)를 통해 인터넷에 연결된 퍼블릭 서브넷에 위치해야...](/section/25-vpc#internet-gateway-igw)

**(B)** : 오답. 인터넷에 연결되지 않은 서브넷은 내부(Internal) 로드 밸런서용입니다. → [📖 오답. 인터넷에 연결되지 않은 서브넷은 내부(Internal) 로드 밸런서용입니다.](/section/25-vpc#서브넷-subnet)

**(C)** : 오답. A와 정반대의 잘못된 설명입니다.

**(D)** : 오답. 의미 없는 설명입니다.

**핵심 개념:** ELB 인터넷 연결 vs 내부, 퍼블릭 서브넷, 인터넷 게이트웨이

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

---

### Q615. In the Amazon CloudWatch, which metric should I be checking to ensure that your DB Instance has enough free storage space?

**Options:**
- A) Free Storage.
- B) Free Storage Space.
- C) Free Storage Volume.
- D) Free DB Storage Space.

**Answer:** B

**해설:**

> **문제:** Amazon CloudWatch에서 DB 인스턴스의 여유 스토리지 공간을 확인하기 위해 어떤 메트릭을 확인해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Free Storage |
| B | Free Storage Space |
| C | Free Storage Volume |
| D | Free DB Storage Space |

**(A)** : 오답. 실제 메트릭 이름이 아닙니다. → [📖 오답. 실제 메트릭 이름이 아닙니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B) 정답** : Amazon RDS CloudWatch 메트릭에서 DB 인스턴스의 여유 스토리지 공간은 **FreeStorageSpace** 메트릭으로 확인합니다. → [📖 Amazon RDS CloudWatch 메트릭에서 DB 인스턴스의 여유 스토리지 공간은 **FreeStora...](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C)** : 오답. 실제 메트릭 이름이 아닙니다. → [📖 오답. 실제 메트릭 이름이 아닙니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : 오답. 실제 메트릭 이름이 아닙니다. → [📖 오답. 실제 메트릭 이름이 아닙니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** RDS CloudWatch 메트릭, FreeStorageSpace

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q616. A web-startup runs its very successful social news application on Amazon EC2 with an Elastic Load Balancer, an Auto-Scaling group of Java/Tomcat application-servers, and DynamoDB as data store. The main web-application best runs on m2 x large instances since it is highly memory-bound. Each new deployment requires semi-automated creation and testing of a new AMI for the application servers which takes quite a while and is therefore only done once per week. Recently, a new chat feature has been implemented in nodejs and waits to be integrated in the architecture. First tests show that the new component is CPU bound. Because the company has some experience with using Chef, they decided to streamline the deployment process and use AWS OpsWorks as an application life cycle tool to simplify management of the application and reduce the deployment cycles. What configuration in AWS OpsWorks is necessary to integrate the new chat module in the most cost-efficient and flexible way?

**Options:**
- A) Create one AWS OpsWorks stack, create one AWS OpsWorks layer, create one custom recipe.
- B) Create one AWS OpsWorks stack create two AWS OpsWorks layers create one custom recipe.
- C) Create two AWS OpsWorks stacks create two AWS OpsWorks layers create one custom recipe.
- D) Create two AWS OpsWorks stacks create two AWS OpsWorks layers create two custom recipe.

**Answer:** C

**해설:**

> **문제:** 소셜 뉴스 앱에 Node.js 기반 채팅 기능을 추가하려 합니다. 기존 앱은 메모리 집약적(m2.xlarge), 새 채팅은 CPU 집약적입니다. AWS OpsWorks로 가장 비용 효율적으로 통합하려면?

| 선지 | 번역 |
|------|------|
| A | OpsWorks 스택 1개, 레이어 1개, 커스텀 레시피 1개 |
| B | OpsWorks 스택 1개, 레이어 2개, 커스텀 레시피 1개 |
| C | OpsWorks 스택 2개, 레이어 2개, 커스텀 레시피 1개 |
| D | OpsWorks 스택 2개, 레이어 2개, 커스텀 레시피 2개 |

**(A)** : 오답. 두 컴포넌트의 요구사항(메모리 집약 vs CPU 집약)이 다르므로 분리가 필요합니다.

**(B)** : 오답. 단일 스택에서 서로 다른 인스턴스 타입을 사용하는 레이어 2개를 관리하는 것보다 스택을 분리하는 것이 더 유연합니다.

**(C) 정답** : 두 스택(기존 Java/Tomcat 스택 + 새 Node.js 채팅 스택)으로 분리하면 각각 최적의 인스턴스 타입을 선택할 수 있습니다. 각 스택에 레이어를 두고, 공통 레시피 하나를 공유합니다.

**(D)** : 오답. 레시피를 분리할 필요는 없습니다.

**핵심 개념:** AWS OpsWorks 스택/레이어 구성, 다른 인스턴스 타입 최적화

---

### Q617. A client needs you to import some existing infrastructure from a dedicated hosting provider to AWS to try and save on the cost of running his current website. He also needs an automated process that manages backups, software patching, automatic failure detection, and recovery. You are aware that his existing set up currently uses an Oracle database. Which of the following AWS databases would be best for accomplishing this task?

**Options:**
- A) Amazon RDS.
- B) Amazon Redshift.
- C) Amazon SimpleDB.
- D) Amazon ElastiCache.

**Answer:** A

**해설:**

> **문제:** 기존 Oracle 데이터베이스를 AWS로 이전하면서 자동 백업, 패칭, 장애 감지 및 복구가 필요합니다. 어떤 AWS 데이터베이스 서비스가 적합한가?

| 선지 | 번역 |
|------|------|
| A | Amazon RDS |
| B | Amazon Redshift |
| C | Amazon SimpleDB |
| D | Amazon ElastiCache |

**(A) 정답** : Amazon RDS는 Oracle을 포함한 여러 관계형 DB 엔진을 지원하며, 자동 백업, 소프트웨어 패칭, Multi-AZ 자동 장애 조치를 기본으로 제공하는 완전 관리형 서비스입니다. → [📖 Amazon RDS는 Oracle을 포함한 여러 관계형 DB 엔진을 지원하며, 자동 백업, 소프트웨어 패칭,...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : 오답. Redshift는 데이터 웨어하우스 서비스로 OLAP용입니다. → [📖 오답. Redshift는 데이터 웨어하우스 서비스로 OLAP용입니다.](/section/20-data-analytics#amazon-redshift)

**(C)** : 오답. SimpleDB는 NoSQL 서비스이며 Oracle과 다릅니다.

**(D)** : 오답. ElastiCache는 인메모리 캐싱 서비스입니다. → [📖 오답. ElastiCache는 인메모리 캐싱 서비스입니다.](/section/07-rds-aurora-elasticache#amazon-elasticache)

**핵심 개념:** Amazon RDS Oracle 지원, 완전 관리형 DB

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q618. A user is currently building a website which will require a large number of instances in six months, when a demonstration of the new site will be given upon launch. Which of the below mentioned options allows the user to procure the resources beforehand so that they need not worry about infrastructure availability during the demonstration?

**Options:**
- A) Procure all the instances as reserved instances beforehand.
- B) Launch all the instances as part of the cluster group to ensure resource availability.
- C) Pre-warm all the instances one month prior to ensure resource availability.
- D) Ask AWS now to procure the dedicated instances in 6 months.

**Answer:** A

**해설:**

> **문제:** 6개월 후 웹사이트 런칭 시연을 위해 다수의 인스턴스가 필요합니다. 미리 리소스를 확보하는 방법은?

| 선지 | 번역 |
|------|------|
| A | 미리 예약 인스턴스(Reserved Instances) 구매 |
| B | 클러스터 그룹으로 모든 인스턴스 시작 |
| C | 1개월 전에 인스턴스를 미리 워밍업 |
| D | AWS에 6개월 후 전용 인스턴스 확보 요청 |

**(A) 정답** : Reserved Instances를 구매하면 용량 예약이 보장되어 인프라 가용성 걱정 없이 필요한 시점에 인스턴스를 사용할 수 있습니다. 또한 On-Demand 대비 비용도 절감됩니다. → [📖 Reserved Instances를 구매하면 용량 예약이 보장되어 인프라 가용성 걱정 없이 필요한 시점에 인...](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : 오답. 클러스터 그룹은 네트워크 레이턴시를 줄이기 위한 것이지 용량 예약이 아닙니다. → [📖 오답. 클러스터 그룹은 네트워크 레이턴시를 줄이기 위한 것이지 용량 예약이 아닙니다.](/section/04-ec2-associate#placement-groups-배치-그룹)

**(C)** : 오답. "Pre-warm"은 의미 없는 개념입니다.

**(D)** : 오답. AWS에 별도로 요청하는 방식은 일반적인 절차가 아닙니다.

**핵심 개념:** Reserved Instances 용량 예약, 비용 절감

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q619. Amazon RDS creates an SSL certificate and installs the certificate on the DB Instance when Amazon RDS provisions the instance. These certificates are signed by a certificate authority. The [...] is stored at https://rds.amazonaws.com/doc/rds-ssl-ca-cert.pem.

**Options:**
- A) private key.
- B) foreign key.
- C) public key.
- D) protected key.

**Answer:** A

**해설:**

> **문제:** Amazon RDS가 인스턴스 프로비저닝 시 SSL 인증서를 생성하고 설치합니다. 이 인증서는 인증 기관이 서명합니다. [...]이 https://rds.amazonaws.com/doc/rds-ssl-ca-cert.pem에 저장됩니다.

| 선지 | 번역 |
|------|------|
| A | 개인 키(private key) |
| B | 외래 키(foreign key) |
| C | 공개 키(public key) |
| D | 보호 키(protected key) |

**(A) 정답** : 해당 URL에는 CA(Certificate Authority)의 공개 인증서(루트 CA 인증서)가 저장되어 있습니다. 이를 통해 클라이언트가 RDS 서버의 SSL 인증서를 검증할 수 있습니다. 문제에서는 "private key"라고 하지만 실제로는 CA 공개 인증서(public certificate)입니다. → [📖 해당 URL에는 CA(Certificate Authority)의 공개 인증서(루트 CA 인증서)가 저장되어 ...](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**(B)** : 오답. 외래 키는 데이터베이스 관계 개념입니다.

**(C)** : 오답.

**(D)** : 오답. 존재하지 않는 개념입니다.

**핵심 개념:** RDS SSL/TLS 연결, CA 인증서

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안)

---

### Q620. What happens to data on an ephemeral volume of an EBS-backed EC2 instance if it is terminated or if it fails?

**Options:**
- A) Data is automatically copied to another volume.
- B) The volume snapshot is saved in S3.
- C) Data persists.
- D) Data is deleted.

**Answer:** D

**해설:**

> **문제:** EBS 기반 EC2 인스턴스의 임시(ephemeral) 볼륨 데이터는 인스턴스가 종료되거나 실패하면 어떻게 되는가?

| 선지 | 번역 |
|------|------|
| A | 자동으로 다른 볼륨에 복사됨 |
| B | 볼륨 스냅샷이 S3에 저장됨 |
| C | 데이터가 유지됨 |
| D | 데이터가 삭제됨 |

**(A)** : 오답. 임시 볼륨은 자동 복사 기능이 없습니다. → [📖 오답. 임시 볼륨은 자동 복사 기능이 없습니다.](/section/05-ec2-instance-storage#ec2-instance-store)

**(B)** : 오답. 임시(Instance Store) 볼륨은 스냅샷을 지원하지 않습니다. → [📖 오답. 임시(Instance Store) 볼륨은 스냅샷을 지원하지 않습니다.](/section/05-ec2-instance-storage#ec2-instance-store)

**(C)** : 오답. EBS 볼륨은 데이터가 유지되지만, 임시(Instance Store) 볼륨은 그렇지 않습니다. → [📖 오답. EBS 볼륨은 데이터가 유지되지만, 임시(Instance Store) 볼륨은 그렇지 않습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D) 정답** : 임시(ephemeral/Instance Store) 볼륨의 데이터는 인스턴스가 중단(stop), 종료(terminate), 또는 실패하면 영구적으로 삭제됩니다. → [📖 임시(ephemeral/Instance Store) 볼륨의 데이터는 인스턴스가 중단(stop), 종료(ter...](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** Instance Store(임시 스토리지) vs EBS — Instance Store는 인스턴스 수명과 연동

**관련 노트:** [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store), [EBS vs EFS vs Instance Store 비교 시험 핵심!](/section/05-ec2-instance-storage#ebs-vs-efs-vs-instance-store-비교-시험-핵심)

---

### Q621. You manually launch a NAT AMI in a public subnet. The network is properly configured. Security groups and network access control lists are properly configured. Instances in a private subnet can access the NAT. The NAT can access the Internet. However, private instances cannot access the Internet. What additional step is required to allow access from the private instances?

**Options:**
- A) Enable Source/Destination Check on the private Instances.
- B) Enable Source/Destination Check on the NAT instance.
- C) Disable Source/Destination Check on the private instances.
- D) Disable Source/Destination Check on the NAT instance.

**Answer:** B

**해설:**

> **문제:** NAT AMI를 퍼블릭 서브넷에 수동으로 시작했습니다. 프라이빗 인스턴스는 NAT에 접근할 수 있고 NAT는 인터넷에 접근 가능하지만, 프라이빗 인스턴스는 인터넷에 접근하지 못합니다. 어떤 추가 단계가 필요한가?

| 선지 | 번역 |
|------|------|
| A | 프라이빗 인스턴스에서 소스/대상 확인 활성화 |
| B | NAT 인스턴스에서 소스/대상 확인 활성화 |
| C | 프라이빗 인스턴스에서 소스/대상 확인 비활성화 |
| D | NAT 인스턴스에서 소스/대상 확인 비활성화 |

**(A)** : 오답. 프라이빗 인스턴스의 소스/대상 확인을 변경할 필요 없습니다.

**(B)** : 오답. 활성화가 아닌 비활성화가 필요합니다.

**(C)** : 오답. 프라이빗 인스턴스 설정을 변경할 필요 없습니다.

**(D) 정답** : NAT 인스턴스는 자신이 출발지나 목적지가 아닌 트래픽을 포워딩해야 하므로, **소스/대상 확인(Source/Destination Check)을 비활성화**해야 합니다. 이것이 NAT 인스턴스 설정의 핵심입니다. → [📖 NAT 인스턴스는 자신이 출발지나 목적지가 아닌 트래픽을 포워딩해야 하므로, **소스/대상 확인(Source...](/section/25-vpc#nat-instance-레거시-시험에-출제)

**핵심 개념:** NAT 인스턴스 Source/Destination Check 비활성화

**관련 노트:** [NAT Instance 레거시, 시험에 출제](/section/25-vpc#nat-instance-레거시-시험에-출제)

---

### Q622. You have just discovered that you can upload your objects to Amazon S3 using Multipart Upload API. You start to test it out but are unsure of the benefits that it would provide. Which of the following is not a benefit of using multipart uploads?

**Options:**
- A) You can begin an upload before you know the final object size.
- B) Quick recovery from any network issues.
- C) Pause and resume object uploads.
- D) It's more secure than normal upload.

**Answer:** D

**해설:**

> **문제:** S3 Multipart Upload API의 이점이 아닌 것은?

| 선지 | 번역 |
|------|------|
| A | 최종 객체 크기를 알기 전에 업로드 시작 가능 |
| B | 네트워크 문제 발생 시 빠른 복구 |
| C | 객체 업로드 일시 중지 및 재개 |
| D | 일반 업로드보다 더 보안적임 |

**(A)** : 실제 이점입니다. 스트리밍 데이터를 업로드할 때 유용합니다. → [📖 실제 이점입니다. 스트리밍 데이터를 업로드할 때 유용합니다.](/section/11-s3-advanced#s3-performance-최적화)

**(B)** : 실제 이점입니다. 실패한 파트만 재전송하면 됩니다. → [📖 실제 이점입니다. 실패한 파트만 재전송하면 됩니다.](/section/11-s3-advanced#s3-performance-최적화)

**(C)** : 실제 이점입니다. 업로드를 중단하고 나중에 재개할 수 있습니다. → [📖 실제 이점입니다. 업로드를 중단하고 나중에 재개할 수 있습니다.](/section/11-s3-advanced#s3-performance-최적화)

**(D) 정답** : Multipart Upload는 보안과 무관합니다. 보안은 SSE, 버킷 정책 등으로 처리하며, 멀티파트 업로드 자체는 보안을 향상시키지 않습니다. → [📖 Multipart Upload는 보안과 무관합니다. 보안은 SSE, 버킷 정책 등으로 처리하며, 멀티파트 업...](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**핵심 개념:** S3 Multipart Upload 이점, 대용량 파일 업로드

**관련 노트:** [S3 Performance 최적화](/section/11-s3-advanced#s3-performance-최적화), [S3 Baseline Performance 기본 성능](/section/11-s3-advanced#s3-baseline-performance-기본-성능)

---

### Q623. To help you manage your Amazon EC2 instances, images, and other Amazon EC2 resources, you can assign your own metadata to each resource in the form of [...].

**Options:**
- A) special filters.
- B) functions.
- C) tags.
- D) wildcards.

**Answer:** C

**해설:**

> **문제:** Amazon EC2 인스턴스, 이미지 및 기타 리소스를 관리하기 위해 각 리소스에 [...] 형태로 자체 메타데이터를 할당할 수 있습니다.

| 선지 | 번역 |
|------|------|
| A | 특수 필터 |
| B | 함수 |
| C | 태그(tags) |
| D | 와일드카드 |

**(A)** : 오답. 필터는 리소스를 검색하는 데 사용됩니다.

**(B)** : 오답. 함수는 메타데이터 형태가 아닙니다.

**(C) 정답** : AWS 리소스에는 키-값 쌍 형태의 **태그(Tags)**를 할당하여 메타데이터를 관리할 수 있습니다. 태그는 리소스 분류, 비용 추적, 접근 제어 등에 활용됩니다.

**(D)** : 오답. 와일드카드는 패턴 매칭에 사용됩니다.

**핵심 개념:** AWS 리소스 태그, 메타데이터 관리

---

### Q624. Do the Amazon EBS volumes persist independently from the running life of an Amazon EC2 instance?

**Options:**
- A) No.
- B) Only if instructed to when created.
- C) Yes.

**Answer:** C

**해설:**

> **문제:** Amazon EBS 볼륨은 EC2 인스턴스의 실행 수명과 독립적으로 유지되는가?

| 선지 | 번역 |
|------|------|
| A | 아니오 |
| B | 생성 시 지시한 경우에만 |
| C | 예 |

**(A)** : 오답. EBS는 EC2와 독립적으로 유지됩니다. → [📖 오답. EBS는 EC2와 독립적으로 유지됩니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : 오답. 기본적으로 루트 볼륨은 인스턴스 종료 시 삭제될 수 있지만, EBS 볼륨 자체는 인스턴스와 독립적으로 존재할 수 있습니다. → [📖 오답. 기본적으로 루트 볼륨은 인스턴스 종료 시 삭제될 수 있지만, EBS 볼륨 자체는 인스턴스와 독립적으로...](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C) 정답** : EBS 볼륨은 EC2 인스턴스의 수명과 독립적으로 지속됩니다. 인스턴스가 종료되어도 EBS 볼륨은 별도로 설정하지 않는 한 유지됩니다. → [📖 EBS 볼륨은 EC2 인스턴스의 수명과 독립적으로 지속됩니다. 인스턴스가 종료되어도 EBS 볼륨은 별도로 설...](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** EBS 영속성, 인스턴스 종료 후 데이터 유지

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q625. If I write the below command, what does it do? ec2-run ami-e3a5408a -n 20 -g appserver

**Options:**
- A) Start twenty instances as members of appserver group.
- B) Creates 20 rules in the security group named appserver.
- C) Terminate twenty instances as members of appserver group.
- D) Start 20 security groups.

**Answer:** A

**해설:**

> **문제:** 아래 명령어는 무엇을 하는가? `ec2-run ami-e3a5408a -n 20 -g appserver`

| 선지 | 번역 |
|------|------|
| A | appserver 보안 그룹의 멤버로 20개 인스턴스 시작 |
| B | appserver 보안 그룹에 20개 규칙 생성 |
| C | appserver 그룹의 20개 인스턴스 종료 |
| D | 20개 보안 그룹 시작 |

**(A) 정답** : `ec2-run` 명령어에서 `-n 20`은 20개 인스턴스를 시작하고, `-g appserver`는 appserver 보안 그룹에 할당합니다. → [📖 `ec2-run` 명령어에서 `-n 20`은 20개 인스턴스를 시작하고, `-g appserver`는 app...](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 오답. `-n`은 인스턴스 수이지 규칙 수가 아닙니다.

**(C)** : 오답. `ec2-run`은 시작 명령어입니다.

**(D)** : 오답. 보안 그룹을 시작하는 것이 아닙니다.

**핵심 개념:** EC2 CLI 명령어, ec2-run 파라미터

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

---

### Q626. A company is deploying a new two-tier web application in AWS. The company has limited staff and requires high availability, and the application requires complex queries and table joins. Which configuration provides the solution for the company's requirements?

**Options:**
- A) MySQL Installed on two Amazon EC2 Instances in a single Availability Zone.
- B) Amazon RDS for MySQL with Multi-AZ.
- C) Amazon ElastiCache
- D) Amazon DynamoDB.

**Answer:** B

**해설:**

> **문제:** 직원이 적은 회사가 고가용성이 필요하고 복잡한 쿼리와 테이블 조인이 필요한 2티어 웹 애플리케이션을 배포합니다. 어떤 구성이 적합한가?

| 선지 | 번역 |
|------|------|
| A | 단일 AZ의 두 EC2 인스턴스에 MySQL 설치 |
| B | Multi-AZ 구성의 Amazon RDS for MySQL |
| C | Amazon ElastiCache |
| D | Amazon DynamoDB |

**(A)** : 오답. 단일 AZ는 고가용성이 없고, 관리 부담이 큽니다. → [📖 오답. 단일 AZ는 고가용성이 없고, 관리 부담이 큽니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B) 정답** : RDS for MySQL Multi-AZ는 고가용성을 자동 제공하며, 완전 관리형으로 직원이 적어도 운영 가능합니다. 복잡한 SQL 쿼리와 테이블 조인을 지원합니다. → [📖 RDS for MySQL Multi-AZ는 고가용성을 자동 제공하며, 완전 관리형으로 직원이 적어도 운영 가...](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : 오답. ElastiCache는 캐싱 서비스로 주 데이터베이스로 사용할 수 없습니다. → [📖 오답. ElastiCache는 캐싱 서비스로 주 데이터베이스로 사용할 수 없습니다.](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(D)** : 오답. DynamoDB는 NoSQL로 복잡한 조인을 지원하지 않습니다. → [📖 오답. DynamoDB는 NoSQL로 복잡한 조인을 지원하지 않습니다.](/section/19-databases#amazon-dynamodb)

**핵심 개념:** RDS Multi-AZ, 완전 관리형 관계형 데이터베이스

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q627. In order to optimize performance for a compute cluster that requires low inter-node latency, which of the following feature should you use?

**Options:**
- A) Multiple Availability Zones.
- B) AWS Direct Connect.
- C) EC2 Dedicated Instances.
- D) Placement Groups.
- E) VPC private subnets.

**Answer:** D

**해설:**

> **문제:** 노드 간 낮은 레이턴시가 필요한 컴퓨팅 클러스터 성능을 최적화하려면 어떤 기능을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 다중 가용 영역 |
| B | AWS Direct Connect |
| C | EC2 전용 인스턴스 |
| D | 배치 그룹(Placement Groups) |
| E | VPC 프라이빗 서브넷 |

**(A)** : 오답. 다중 AZ는 가용성 향상을 위한 것으로 레이턴시를 증가시킵니다. → [📖 오답. 다중 AZ는 가용성 향상을 위한 것으로 레이턴시를 증가시킵니다.](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(B)** : 오답. Direct Connect는 온프레미스-AWS 간 연결입니다. → [📖 오답. Direct Connect는 온프레미스-AWS 간 연결입니다.](/section/25-vpc#direct-connect-dx)

**(C)** : 오답. 전용 인스턴스는 물리적 격리를 위한 것입니다.

**(D) 정답** : **클러스터 배치 그룹(Cluster Placement Group)**은 단일 AZ 내에서 인스턴스들을 물리적으로 가깝게 배치하여 노드 간 레이턴시를 최소화하고 처리량을 극대화합니다. HPC 워크로드에 적합합니다. → [📖 **클러스터 배치 그룹(Cluster Placement Group)**은 단일 AZ 내에서 인스턴스들을 물리...](/section/04-ec2-associate#placement-groups-배치-그룹)

**(E)** : 오답. 프라이빗 서브넷은 보안 목적입니다. → [📖 오답. 프라이빗 서브넷은 보안 목적입니다.](/section/25-vpc#서브넷-subnet)

**핵심 개념:** Cluster Placement Group, HPC, 저지연 네트워크

**관련 노트:** [Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹)

---

### Q628. Regarding the attaching of ENI to an instance, what does 'warm attach' refer to?

**Options:**
- A) Attaching an ENI to an instance when it is stopped.
- B) This question doesn't make sense.
- C) Attaching an ENI to an instance when it is running.
- D) Attaching an ENI to an instance during the launch process.

**Answer:** A

**해설:**

> **문제:** ENI를 인스턴스에 연결할 때 'warm attach'란 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 인스턴스가 중지된 상태에서 ENI 연결 |
| B | 질문이 맞지 않음 |
| C | 인스턴스가 실행 중일 때 ENI 연결 |
| D | 인스턴스 시작 과정 중 ENI 연결 |

**(A) 정답** : ENI 연결 유형: **Hot attach** = 실행 중 연결, **Warm attach** = 중지(stopped) 상태에서 연결, **Cold attach** = 시작(launch) 시 연결. → [📖 ENI 연결 유형: **Hot attach** = 실행 중 연결, **Warm attach** = 중지(st...](/section/04-ec2-associate#elastic-network-interface-eni)

**(B)** : 오답.

**(C)** : 오답. 실행 중 연결은 hot attach입니다. → [📖 오답. 실행 중 연결은 hot attach입니다.](/section/04-ec2-associate#elastic-network-interface-eni)

**(D)** : 오답. 시작 시 연결은 cold attach입니다. → [📖 오답. 시작 시 연결은 cold attach입니다.](/section/04-ec2-associate#elastic-network-interface-eni)

**핵심 개념:** ENI 연결 유형 — Hot/Warm/Cold Attach

**관련 노트:** [Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

---

### Q629. Can I attach more than one policy to a particular entity?

**Options:**
- A) Yes always.
- B) Only if within GovCloud.
- C) No.
- D) Only if within VPC.

**Answer:** A

**해설:**

> **문제:** 특정 IAM 엔티티(사용자, 그룹, 역할)에 두 개 이상의 정책을 연결할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 항상 가능 |
| B | GovCloud 내에서만 가능 |
| C | 불가능 |
| D | VPC 내에서만 가능 |

**(A) 정답** : IAM 사용자, 그룹, 역할에는 여러 정책을 연결할 수 있습니다. 정책은 관리형(Managed) 및 인라인(Inline) 정책 모두 여러 개 첨부 가능합니다. → [📖 IAM 사용자, 그룹, 역할에는 여러 정책을 연결할 수 있습니다. 정책은 관리형(Managed) 및 인라인(...](/section/02-iam#iam-policies-정책)

**(B)** : 오답. GovCloud와 무관합니다.

**(C)** : 오답. 여러 정책 연결이 가능합니다. → [📖 오답. 여러 정책 연결이 가능합니다.](/section/02-iam#iam-policies-정책)

**(D)** : 오답. VPC와 무관합니다.

**핵심 개념:** IAM 정책 다중 연결

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책)

---

### Q630. By default, when an EBS volume is attached to a Windows instance, it may show up as any drive letter on the instance. You can change the settings of the [...] Service to set the drive letters of the EBS volumes per your specifications.

**Options:**
- A) EBS Config Service.
- B) AMI Config Service.
- C) EC2 Config Service.
- D) EC2-AMI Config Service.

**Answer:** C

**해설:**

> **문제:** EBS 볼륨이 Windows 인스턴스에 연결될 때 드라이브 문자를 사용자 지정하려면 어떤 서비스의 설정을 변경해야 하는가?

| 선지 | 번역 |
|------|------|
| A | EBS Config Service |
| B | AMI Config Service |
| C | EC2 Config Service |
| D | EC2-AMI Config Service |

**(A)** : 오답. 존재하지 않는 서비스입니다.

**(B)** : 오답. 존재하지 않는 서비스입니다.

**(C) 정답** : Windows EC2 인스턴스의 **EC2Config Service**를 통해 EBS 볼륨의 드라이브 문자 할당을 설정할 수 있습니다. → [📖 Windows EC2 인스턴스의 **EC2Config Service**를 통해 EBS 볼륨의 드라이브 문자 ...](/section/03-ec2-basics#ec2-구성-요소)

**(D)** : 오답. 존재하지 않는 서비스입니다.

**핵심 개념:** EC2Config Service, Windows EBS 드라이브 문자

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q631. Select the correct set of steps for exposing the snapshot only to specific AWS accounts.

**Options:**
- A) Select public for all the accounts and check mark those accounts with whom you want to expose the snapshots and click save.
- B) Select Private, enter the IDs of those AWS accounts, and click Save.
- C) Select Public, enter the IDs of those AWS accounts, and click Save.
- D) Select Public, mark the IDs of those AWS accounts as private, and click Save.

**Answer:** C

**해설:**

> **문제:** 특정 AWS 계정에만 스냅샷을 공개하기 위한 올바른 절차는?

| 선지 | 번역 |
|------|------|
| A | 모든 계정에 공개 선택 후 원하는 계정에 체크 |
| B | Private 선택 후 해당 계정 ID 입력 |
| C | Public 선택 후 해당 계정 ID 입력 |
| D | Public 선택 후 해당 계정 ID를 private으로 표시 |

**(A)** : 오답. 잘못된 절차입니다.

**(B)** : 오답. Private을 선택하면 계정 ID를 입력하는 옵션이 나타나지 않습니다. → [📖 오답. Private을 선택하면 계정 ID를 입력하는 옵션이 나타나지 않습니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(C) 정답** : AMI/스냅샷 권한에서 "Public"을 선택한 후 특정 AWS 계정 ID를 입력하면 해당 계정에만 접근을 허용할 수 있습니다. → [📖 AMI/스냅샷 권한에서 "Public"을 선택한 후 특정 AWS 계정 ID를 입력하면 해당 계정에만 접근을 ...](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(D)** : 오답. 잘못된 절차입니다.

**핵심 개념:** EBS 스냅샷 공유, 계정별 접근 권한

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

---

### Q632. How can you apply more than 100 rules to an Amazon EC2-Classic?

**Options:**
- A) By adding more security groups.
- B) You need to create a default security group specifying your required rules if you need to use more than 100 rules per security group.
- C) By default the Amazon EC2 security groups support 500 rules.
- D) You can't add more than 100 rules to security groups for an Amazon EC2 instance.

**Answer:** D

**해설:**

> **문제:** Amazon EC2-Classic에서 100개 이상의 규칙을 어떻게 적용할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 더 많은 보안 그룹을 추가하여 |
| B | 기본 보안 그룹에 필요한 규칙을 지정하여 |
| C | EC2 보안 그룹은 기본적으로 500개 규칙 지원 |
| D | EC2 인스턴스의 보안 그룹에 100개 이상의 규칙을 추가할 수 없음 |

**(A)** : 오답. EC2-Classic에서는 추가 보안 그룹을 통한 우회가 제한적입니다. → [📖 오답. EC2-Classic에서는 추가 보안 그룹을 통한 우회가 제한적입니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 오답. 기본 보안 그룹에도 동일한 제한이 적용됩니다. → [📖 오답. 기본 보안 그룹에도 동일한 제한이 적용됩니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(C)** : 오답. 500개를 기본 지원하지 않습니다. → [📖 오답. 500개를 기본 지원하지 않습니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(D) 정답** : EC2-Classic에서 보안 그룹 규칙은 100개로 제한됩니다. 이 제한을 초과할 수 없습니다. → [📖 EC2-Classic에서 보안 그룹 규칙은 100개로 제한됩니다. 이 제한을 초과할 수 없습니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** EC2-Classic 보안 그룹 규칙 제한

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q633. A user has created an ELB with Auto Scaling. Which of the below mentioned offerings from ELB helps the user to stop sending new requests traffic from the load balancer to the EC2 instance when the instance is being deregistered while continuing in-flight requests?

**Options:**
- A) ELB sticky session.
- B) ELB deregistration check.
- C) ELB auto registration Off.
- D) ELB connection draining.

**Answer:** D

**해설:**

> **문제:** Auto Scaling과 ELB를 사용 중입니다. 인스턴스가 등록 해제될 때 새 요청은 보내지 않으면서 진행 중인 요청은 완료할 수 있게 해주는 ELB 기능은?

| 선지 | 번역 |
|------|------|
| A | ELB 스티키 세션 |
| B | ELB 등록 해제 확인 |
| C | ELB 자동 등록 비활성화 |
| D | ELB 연결 드레이닝(Connection Draining) |

**(A)** : 오답. 스티키 세션은 세션 고정(같은 인스턴스로 요청 유도)입니다. → [📖 오답. 스티키 세션은 세션 고정(같은 인스턴스로 요청 유도)입니다.](/section/06-high-availability-scalability#sticky-sessions-session-affinity)

**(B)** : 오답. 존재하지 않는 기능입니다.

**(C)** : 오답. 존재하지 않는 기능입니다.

**(D) 정답** : **Connection Draining**(현재는 Deregistration Delay라고도 함)은 인스턴스가 등록 해제될 때 기존 진행 중인 요청을 완료할 때까지 대기하고 새 요청은 보내지 않는 기능입니다. → [📖 **Connection Draining**(현재는 Deregistration Delay라고도 함)은 인스턴스...](/section/06-high-availability-scalability#connection-draining-deregistration-delay)

**핵심 개념:** ELB Connection Draining (Deregistration Delay)

**관련 노트:** [Connection Draining / Deregistration Delay](/section/06-high-availability-scalability#connection-draining-deregistration-delay)

---

### Q634. What can I access by visiting the URL: http://status.aws.amazon.com/?

**Options:**
- A) Amazon Cloud Watch.
- B) Status of the Amazon RDS DB.
- C) AWS Service Health Dashboard.
- D) AWS Cloud Monitor.

**Answer:** C

**해설:**

> **문제:** http://status.aws.amazon.com/ 을 방문하면 무엇에 접근할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | Amazon CloudWatch |
| B | Amazon RDS DB 상태 |
| C | AWS 서비스 상태 대시보드 |
| D | AWS 클라우드 모니터 |

**(A)** : 오답. CloudWatch는 콘솔 내 서비스입니다. → [📖 오답. CloudWatch는 콘솔 내 서비스입니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : 오답. RDS 전용 상태 페이지가 아닙니다.

**(C) 정답** : http://status.aws.amazon.com/은 **AWS Service Health Dashboard**로, 전체 AWS 서비스 및 리전별 서비스 상태를 실시간으로 확인할 수 있습니다.

**(D)** : 오답. 존재하지 않는 서비스입니다.

**핵심 개념:** AWS Service Health Dashboard

---

### Q635. In Route 53, what does a Hosted Zone refer to?

**Options:**
- A) A hosted zone is a collection of geographical load balancing rules for Route 53.
- B) A hosted zone is a collection of resource record sets hosted by Route 53.
- C) A hosted zone is a selection of specific resource record sets hosted by CloudFront for distribution to Route 53.
- D) A hosted zone is the Edge Location that hosts the Route 53 records for a user.

**Answer:** B

**해설:**

> **문제:** Route 53에서 호스팅 영역(Hosted Zone)이란 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Route 53의 지역 기반 로드 밸런싱 규칙 컬렉션 |
| B | Route 53이 호스팅하는 리소스 레코드 세트 컬렉션 |
| C | CloudFront가 호스팅하는 특정 리소스 레코드 선택 |
| D | 사용자의 Route 53 레코드를 호스팅하는 엣지 로케이션 |

**(A)** : 오답. 지역 기반 로드 밸런싱 규칙은 라우팅 정책입니다. → [📖 오답. 지역 기반 로드 밸런싱 규칙은 라우팅 정책입니다.](/section/08-route-53#라우팅-정책-routing-policies)

**(B) 정답** : 호스팅 영역은 단일 도메인(예: example.com)에 대한 DNS 레코드(A, CNAME, MX 등)의 컨테이너입니다. Route 53에 의해 호스팅되는 리소스 레코드 세트의 컬렉션입니다. → [📖 호스팅 영역은 단일 도메인(예: example.com)에 대한 DNS 레코드(A, CNAME, MX 등)의 ...](/section/08-route-53#hosted-zones)

**(C)** : 오답. CloudFront와 무관합니다. → [📖 오답. CloudFront와 무관합니다.](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D)** : 오답. 엣지 로케이션은 CloudFront 개념입니다. → [📖 오답. 엣지 로케이션은 CloudFront 개념입니다.](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**핵심 개념:** Route 53 호스팅 영역, DNS 레코드 관리

**관련 노트:** [Hosted Zones](/section/08-route-53#hosted-zones), [DNS 레코드 타입](/section/08-route-53#dns-레코드-타입)

---

### Q636. A user is launching an EC2 instance in the US East region. Which of the below mentioned options is recommended by AWS with respect to the selection of the Availability Zone?

**Options:**
- A) Always select the AZ while launching an instance.
- B) Always select the US-East-1-a zone for HA.
- C) Do not select the AZ; instead let AWS select the AZ.
- D) The user can never select the Availability Zone while launching an instance.

**Answer:** C

**해설:**

> **문제:** US East 리전에서 EC2 인스턴스를 시작할 때 가용 영역(AZ) 선택에 관한 AWS 권장 사항은?

| 선지 | 번역 |
|------|------|
| A | 항상 AZ를 직접 선택하여 인스턴스 시작 |
| B | HA를 위해 항상 US-East-1-a 선택 |
| C | AZ를 선택하지 말고 AWS가 자동으로 선택하도록 |
| D | 사용자는 AZ를 선택할 수 없음 |

**(A)** : 오답. 직접 선택보다 AWS 자동 선택이 권장됩니다. → [📖 오답. 직접 선택보다 AWS 자동 선택이 권장됩니다.](/section/01-getting-started#aws-글로벌-인프라)

**(B)** : 오답. 특정 AZ를 고집하면 오히려 가용성이 낮아질 수 있습니다. → [📖 오답. 특정 AZ를 고집하면 오히려 가용성이 낮아질 수 있습니다.](/section/01-getting-started#aws-글로벌-인프라)

**(C) 정답** : AWS는 AZ를 자동으로 선택하도록 권장합니다. 이렇게 하면 AWS가 리소스 가용성이 높은 AZ를 자동으로 선택하여 부하를 분산합니다. 특히 용량 확보 측면에서 유리합니다. → [📖 AWS는 AZ를 자동으로 선택하도록 권장합니다. 이렇게 하면 AWS가 리소스 가용성이 높은 AZ를 자동으로 ...](/section/01-getting-started#aws-글로벌-인프라)

**(D)** : 오답. 사용자가 AZ를 선택할 수 있지만 권장하지 않습니다. → [📖 오답. 사용자가 AZ를 선택할 수 있지만 권장하지 않습니다.](/section/01-getting-started#aws-글로벌-인프라)

**핵심 개념:** EC2 AZ 선택 권장 사항

**관련 노트:** [EC2 설정 옵션](/section/03-ec2-basics#ec2-설정-옵션)

---

### Q637. ec2-revoke RevokeSecurityGroup Ingress

**Options:**
- A) Removes one or more security groups from a rule.
- B) Removes one or more security groups from an Amazon EC2 instance.
- C) Removes one or more rules from a security group.
- D) Removes a security group from our account.

**Answer:** C

**해설:**

> **문제:** `ec2-revoke` / `RevokeSecurityGroupIngress` 명령어는 무엇을 하는가?

| 선지 | 번역 |
|------|------|
| A | 규칙에서 하나 이상의 보안 그룹을 제거 |
| B | EC2 인스턴스에서 하나 이상의 보안 그룹을 제거 |
| C | 보안 그룹에서 하나 이상의 규칙을 제거 |
| D | 계정에서 보안 그룹을 제거 |

**(A)** : 오답. 보안 그룹에서 규칙을 제거하는 것입니다. → [📖 오답. 보안 그룹에서 규칙을 제거하는 것입니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 오답. 인스턴스에서 보안 그룹을 제거하는 것이 아닙니다. → [📖 오답. 인스턴스에서 보안 그룹을 제거하는 것이 아닙니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(C) 정답** : `RevokeSecurityGroupIngress`는 지정한 보안 그룹에서 인바운드(Ingress) 규칙을 제거합니다. → [📖 `RevokeSecurityGroupIngress`는 지정한 보안 그룹에서 인바운드(Ingress) 규칙을 ...](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 오답. 보안 그룹 자체를 삭제하는 것이 아닙니다. → [📖 오답. 보안 그룹 자체를 삭제하는 것이 아닙니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** EC2 보안 그룹 규칙 관리 CLI

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q638. Select the correct statement.

**Options:**
- A) You don't need not specify the resource identifier while stopping a resource.
- B) You can terminate, stop, or delete a resource based solely on its tags.
- C) You can't terminate, stop, or delete a resource based solely on its tags.
- D) You don't need to specify the resource identifier while terminating a resource.

**Answer:** C

**해설:**

> **문제:** 올바른 설명을 고르시오.

| 선지 | 번역 |
|------|------|
| A | 리소스 중지 시 리소스 식별자를 지정할 필요 없음 |
| B | 태그만으로 리소스를 종료/중지/삭제할 수 있음 |
| C | 태그만으로 리소스를 종료/중지/삭제할 수 없음 |
| D | 리소스 종료 시 리소스 식별자를 지정할 필요 없음 |

**(A)** : 오답. 리소스를 중지하려면 인스턴스 ID 등 식별자가 필요합니다.

**(B)** : 오답. AWS에서 태그만으로 리소스 작업을 직접 실행할 수 없습니다.

**(C) 정답** : AWS에서 리소스를 종료, 중지, 삭제하려면 반드시 리소스 식별자(예: 인스턴스 ID)를 지정해야 합니다. 태그는 검색/필터링에 사용되지만, 태그만으로 작업을 실행할 수는 없습니다.

**(D)** : 오답. 리소스 식별자가 항상 필요합니다.

**핵심 개념:** AWS 리소스 관리, 태그 활용 한계

---

### Q639. What is the time period with which metric data is sent to CloudWatch when detailed monitoring is enabled on an Amazon EC2 instance?

**Options:**
- A) 15 minutes.
- B) 5 minutes.
- C) 1 minute.
- D) 45 seconds.

**Answer:** C

**해설:**

> **문제:** Amazon EC2 인스턴스에서 상세 모니터링(Detailed Monitoring)을 활성화하면 메트릭 데이터가 CloudWatch로 전송되는 주기는?

| 선지 | 번역 |
|------|------|
| A | 15분 |
| B | 5분 |
| C | 1분 |
| D | 45초 |

**(A)** : 오답. 15분은 너무 깁니다. → [📖 오답. 15분은 너무 깁니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : 오답. 5분은 기본(Basic) 모니터링 주기입니다. → [📖 오답. 5분은 기본(Basic) 모니터링 주기입니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C) 정답** : **상세 모니터링(Detailed Monitoring)**이 활성화되면 EC2 메트릭 데이터는 **1분 간격**으로 CloudWatch에 전송됩니다. 기본 모니터링은 5분 간격입니다. → [📖 **상세 모니터링(Detailed Monitoring)**이 활성화되면 EC2 메트릭 데이터는 **1분 간격...](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : 오답. 45초 간격은 지원되지 않습니다. → [📖 오답. 45초 간격은 지원되지 않습니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** EC2 CloudWatch 모니터링 — 기본: 5분, 상세: 1분

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q640. A large real-estate brokerage is exploring the option of adding a cost-effective location based alert to their existing mobile application. The application backend infrastructure currently runs on AWS. Users who opt in to this service will receive alerts on their mobile device regarding real-estate offers in proximity to their location. For the alerts to be relevant delivery time needs to be in the low minute count. The existing mobile app has 5 million users across the US. Which one of the following architectural suggestions would you make to the customer?

**Options:**
- A) The mobile application will submit its location to a web service endpoint utilizing Elastic Load Balancing and EC2 instances. DynamoDB will be used to store and retrieve relevant offers. EC2 instances will communicate with mobile carriers/device providers to push alerts back to mobile application.
- B) Use AWS DirectConnect or VPN to establish connectivity with mobile carriers. EC2 instances will receive the mobile applications' location through carrier connection. RDS will be used to store and relevant offers. EC2 instances will communicate with mobile carriers to push alerts back to the mobile application.
- C) The mobile application will send device location using SQS. EC2 instances will retrieve the relevant offers from DynamoDB. AWS Mobile Push will be used to send offers to the mobile application.
- D) The mobile application will send device location using AWS Mobile Push. EC2 instances will retrieve the relevant offers from DynamoDB. EC2 instances will communicate with mobile carriers/device providers to push alerts back to the mobile application.

**Answer:** A

**해설:**

> **문제:** 500만 명 사용자를 가진 모바일 부동산 앱에 위치 기반 알림 기능을 추가하려 합니다. 알림은 몇 분 내에 전달되어야 합니다. 어떤 아키텍처를 추천하겠는가?

| 선지 | 번역 |
|------|------|
| A | ELB+EC2로 위치 수신, DynamoDB로 오퍼 저장/조회, EC2에서 모바일 푸시 |
| B | DirectConnect/VPN으로 통신사 연결, EC2+RDS 사용 |
| C | SQS로 위치 전송, DynamoDB 조회, AWS Mobile Push로 알림 |
| D | AWS Mobile Push로 위치 전송, DynamoDB 조회, EC2에서 모바일 푸시 |

**(A) 정답** : ELB와 EC2로 확장 가능한 위치 수신 엔드포인트를 구성하고, DynamoDB의 빠른 읽기로 근처 오퍼를 조회하며, EC2에서 직접 모바일 디바이스에 알림을 푸시하는 구조가 비용 효율적이고 확장 가능합니다. → [📖 ELB와 EC2로 확장 가능한 위치 수신 엔드포인트를 구성하고, DynamoDB의 빠른 읽기로 근처 오퍼를 ...](/section/19-databases#amazon-dynamodb)

**(B)** : 오답. DirectConnect는 비용이 높고 복잡합니다. RDS보다 DynamoDB가 이 사용 사례에 더 적합합니다. → [📖 오답. DirectConnect는 비용이 높고 복잡합니다. RDS보다 DynamoDB가 이 사용 사례에 더 ...](/section/25-vpc#direct-connect-dx)

**(C)** : 오답. SQS는 위치 데이터 전송에 적합하지 않고, AWS Mobile Push는 위치 수신 용도가 아닙니다. → [📖 오답. SQS는 위치 데이터 전송에 적합하지 않고, AWS Mobile Push는 위치 수신 용도가 아닙니다...](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : 오답. AWS Mobile Push는 위치 데이터 전송 목적이 아닙니다.

**핵심 개념:** 위치 기반 모바일 알림 아키텍처, DynamoDB + ELB + EC2

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

---

### Q641. You are running PostgreSQL on Amazon RDS and it seems to be all running smoothly deployed in one Availability Zone. A database administrator asks you if DB instances running PostgreSQL support Multi-AZ deployments. What would be a correct response to this question?

**Options:**
- A) Yes.
- B) Yes but only for small db instances.
- C) No.
- D) Yes but you need to request the service from AWS.

**Answer:** A

**해설:**

> **문제:** Amazon RDS에서 PostgreSQL을 단일 AZ로 실행 중입니다. PostgreSQL DB 인스턴스가 Multi-AZ 배포를 지원하는가?

| 선지 | 번역 |
|------|------|
| A | 예 |
| B | 소형 DB 인스턴스에서만 가능 |
| C | 아니오 |
| D | 예, 단 AWS에 서비스 요청 필요 |

**(A) 정답** : Amazon RDS는 PostgreSQL을 포함한 MySQL, Oracle, SQL Server, MariaDB 등 모든 지원 엔진에서 Multi-AZ 배포를 지원합니다. → [📖 Amazon RDS는 PostgreSQL을 포함한 MySQL, Oracle, SQL Server, Maria...](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(B)** : 오답. 인스턴스 크기와 무관합니다. → [📖 오답. 인스턴스 크기와 무관합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : 오답. 지원합니다.

**(D)** : 오답. 별도 요청 없이 콘솔에서 설정 가능합니다. → [📖 오답. 별도 요청 없이 콘솔에서 설정 가능합니다.](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**핵심 개념:** RDS Multi-AZ 지원 엔진 — PostgreSQL 포함 모든 RDS 엔진 지원

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

---

### Q642. What is the data model of DynamoDB?

**Options:**
- A) Since DynamoDB is schema-less, there is no data model.
- B) 'Items', with Keys and one or more Attribute; and 'Attribute', with Name and Value.
- C) 'Table', a collection of Items; 'Items', with Keys and one or more Attribute; and 'Attribute', with Name and Value.
- D) 'Database', which is a set of 'Tables', which is a set of 'Items', which is a set of 'Attributes'.

**Answer:** C

**해설:**

> **문제:** DynamoDB의 데이터 모델은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 스키마리스이므로 데이터 모델 없음 |
| B | 키와 속성을 가진 '항목(Items)', 이름과 값을 가진 '속성(Attribute)' |
| C | 항목 컬렉션인 '테이블(Table)', 키와 속성을 가진 '항목(Items)', 이름과 값을 가진 '속성(Attribute)' |
| D | 테이블 집합인 '데이터베이스', 항목 집합인 '테이블', 속성 집합인 '항목' |

**(A)** : 오답. 스키마리스라도 데이터 모델은 존재합니다. → [📖 오답. 스키마리스라도 데이터 모델은 존재합니다.](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : 오답. 테이블(Table) 개념이 빠져 있습니다. → [📖 오답. 테이블(Table) 개념이 빠져 있습니다.](/section/17-serverless-overview#amazon-dynamodb)

**(C) 정답** : DynamoDB 데이터 모델: **Table**(테이블) → **Items**(항목, 기본키 포함) → **Attributes**(속성, 이름-값 쌍). 각 항목은 기본키(파티션키 또는 파티션키+정렬키)로 식별됩니다. → [📖 DynamoDB 데이터 모델: **Table**(테이블) → **Items**(항목, 기본키 포함) → **...](/section/17-serverless-overview#amazon-dynamodb)

**(D)** : 오답. DynamoDB에는 "Database" 개념이 없습니다. → [📖 오답. DynamoDB에는 "Database" 개념이 없습니다.](/section/17-serverless-overview#amazon-dynamodb)

**핵심 개념:** DynamoDB 데이터 모델 — Table, Items, Attributes

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

---

### Q643. What is a placement group in Amazon EC2?

**Options:**
- A) It is a group of EC2 instances within a single Availability Zone.
- B) It the edge location of your web content.
- C) It is the AWS region where you run the EC2 instance of your web content.
- D) It is a group used to span multiple Availability Zones.

**Answer:** A

**해설:**

> **문제:** Amazon EC2에서 배치 그룹(Placement Group)이란 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 단일 가용 영역 내의 EC2 인스턴스 그룹 |
| B | 웹 콘텐츠의 엣지 로케이션 |
| C | EC2 인스턴스가 실행되는 AWS 리전 |
| D | 여러 가용 영역에 걸쳐 있는 그룹 |

**(A) 정답** : 배치 그룹은 단일 AZ 내에서 인스턴스들을 논리적으로 그룹화하여 저지연 고처리량 네트워크 통신을 가능하게 합니다. (클러스터 배치 그룹 기준) → [📖 배치 그룹은 단일 AZ 내에서 인스턴스들을 논리적으로 그룹화하여 저지연 고처리량 네트워크 통신을 가능하게 합...](/section/04-ec2-associate#placement-groups-배치-그룹)

**(B)** : 오답. 엣지 로케이션은 CloudFront 개념입니다. → [📖 오답. 엣지 로케이션은 CloudFront 개념입니다.](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(C)** : 오답. 배치 그룹은 리전이 아닙니다. → [📖 오답. 배치 그룹은 리전이 아닙니다.](/section/01-getting-started#aws-글로벌-인프라)

**(D)** : 오답. 클러스터 배치 그룹은 단일 AZ 내에서 동작합니다. (스프레드/파티션 배치 그룹은 여러 AZ 가능) → [📖 오답. 클러스터 배치 그룹은 단일 AZ 내에서 동작합니다. (스프레드/파티션 배치 그룹은 여러 AZ 가능)](/section/04-ec2-associate#placement-groups-배치-그룹)

**핵심 개념:** EC2 배치 그룹 유형 — 클러스터(단일 AZ), 스프레드, 파티션

**관련 노트:** [Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹)

---

### Q644. A company is running an SMB file server in its data center. The file server stores large files that are accessed frequently for the first few days after the files are created. After 7 days the files are rarely accessed. The total data size is increasing and is close to the company's total storage capacity. A solutions architect must increase the company's available storage space without losing low-latency access to the most recently accessed files. The solutions architect must also provide file lifecycle management to avoid future storage issues. Which solution will meet these requirements?

**Options:**
- A) Use AWS DataSync to copy data that is older than 7 days from the SMB file server to AWS.
- B) Create an Amazon S3 File Gateway to extend the company's storage space. Create an S3 Lifecycle policy to transition the data to S3 Glacier Deep Archive after 7 days.
- C) Create an Amazon FSx for Windows File Server file system to extend the company's storage space.
- D) Install a utility on each user's computer to access Amazon S3. Create an S3 Lifecycle policy to transition the data to S3 Glacier Flexible Retrieval after 7 days.

**Answer:** D

**해설:**

> **문제:** SMB 파일 서버에서 파일 생성 후 7일간 자주 접근되고 이후 거의 접근 안 됩니다. 용량이 한계에 달했습니다. 최근 파일에 저지연 접근을 유지하면서 스토리지를 확장하고 라이프사이클 관리도 필요합니다.

| 선지 | 번역 |
|------|------|
| A | 7일 이상 된 데이터를 AWS DataSync로 복사 |
| B | S3 File Gateway 생성, 7일 후 S3 Glacier Deep Archive로 전환 |
| C | FSx for Windows 파일 시스템으로 스토리지 확장 |
| D | 각 사용자 컴퓨터에 S3 접근 유틸리티 설치, 7일 후 S3 Glacier Flexible Retrieval로 전환 |

**(A)** : 오답. DataSync는 일회성 또는 주기적 복사 도구이며 라이프사이클 관리를 제공하지 않습니다. → [📖 오답. DataSync는 일회성 또는 주기적 복사 도구이며 라이프사이클 관리를 제공하지 않습니다.](/section/14-storage-extras#aws-datasync)

**(B)** : 오답. S3 File Gateway는 SMB 인터페이스를 제공하지만, Deep Archive는 복구 시간이 길어 저지연 접근에 적합하지 않습니다. → [📖 오답. S3 File Gateway는 SMB 인터페이스를 제공하지만, Deep Archive는 복구 시간이 ...](/section/14-storage-extras#aws-storage-gateway)

**(C)** : 오답. FSx는 라이프사이클 관리를 제공하지 않습니다. → [📖 오답. FSx는 라이프사이클 관리를 제공하지 않습니다.](/section/14-storage-extras#amazon-fsx-개요)

**(D) 정답** : S3에 저장하고 S3 Lifecycle 정책으로 7일 후 Glacier Flexible Retrieval로 전환합니다. 최근 파일은 S3 Standard에서 저지연으로 접근 가능하며, 오래된 파일은 비용 효율적으로 아카이브됩니다. → [📖 S3에 저장하고 S3 Lifecycle 정책으로 7일 후 Glacier Flexible Retrieval로 ...](/section/11-s3-advanced#s3-lifecycle-rules-수명주기-규칙)

**핵심 개념:** S3 Lifecycle 정책, 스토리지 계층화, Glacier Flexible Retrieval

**관련 노트:** [S3 Lifecycle Rules 수명주기 규칙](/section/11-s3-advanced#s3-lifecycle-rules-수명주기-규칙), [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

---

### Q645. A large company wants to provide its globally located developers separate, limited size, managed PostgreSQL databases for development purposes. The databases will be low volume. The developers need the databases only when they are actively working. Which solution will meet these requirements MOST cost-effectively?

**Options:**
- A) Give the developers the ability to launch separate Amazon Aurora instances. Set up a process to shut down Aurora instances at the end of the workday and to start Aurora instances at the beginning of the next workday.
- B) Develop an AWS Service Catalog product that enforces size restrictions for launching Amazon Aurora instances. Give the developers access to launch the product when they need a development database.
- C) Create an Amazon Aurora Serverless cluster. Develop an AWS Service Catalog product to launch databases in the cluster with the default capacity settings. Grant the developers access to the product.
- D) Monitor AWS Trusted Advisor checks for idle Amazon RDS databases. Create a process to terminate identified idle RDS databases.

**Answer:** C

**해설:**

> **문제:** 전 세계 개발자들에게 개발용 소규모 PostgreSQL DB를 개별 제공해야 합니다. 사용량은 낮고 개발 시에만 필요합니다. 가장 비용 효율적인 방법은?

| 선지 | 번역 |
|------|------|
| A | 개발자별 Aurora 인스턴스 시작, 퇴근 시 중지/출근 시 시작 |
| B | Service Catalog로 크기 제한된 Aurora 인스턴스 제공 |
| C | Aurora Serverless 클러스터 생성, Service Catalog로 DB 제공 |
| D | Trusted Advisor로 유휴 RDS 모니터링 후 종료 |

**(A)** : 오답. 수동 시작/중지 프로세스는 운영 오버헤드가 높습니다.

**(B)** : 오답. Aurora 인스턴스는 항상 실행 중이므로 비용이 계속 발생합니다. → [📖 오답. Aurora 인스턴스는 항상 실행 중이므로 비용이 계속 발생합니다.](/section/07-rds-aurora-elasticache#amazon-aurora)

**(C) 정답** : Aurora Serverless는 사용하지 않을 때 자동으로 일시 중지되어 비용이 발생하지 않습니다. Service Catalog로 프로비저닝을 표준화하여 운영 오버헤드도 최소화됩니다. → [📖 Aurora Serverless는 사용하지 않을 때 자동으로 일시 중지되어 비용이 발생하지 않습니다. Ser...](/section/07-rds-aurora-elasticache#aurora-serverless)

**(D)** : 오답. 사후 조치이며 자동화가 부족합니다.

**핵심 개념:** Aurora Serverless 자동 일시중지, AWS Service Catalog

**관련 노트:** [Aurora Serverless](/section/07-rds-aurora-elasticache#aurora-serverless)

---

### Q646. A company is building a web application that serves a content management system. The content management system runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The EC2 instances run in an Auto Scaling group across multiple Availability Zones. Users are constantly adding and updating files, blogs, and other website assets in the content management system. A solutions architect must implement a solution in which all the EC2 instances share up-to-date website content with the least possible lag time. Which solution meets these requirements?

**Options:**
- A) Update the EC2 user data in the Auto Scaling group lifecycle policy to copy the website assets from the EC2 instance that was launched most recently. Configure the ALB to make changes to the website assets only in the newest EC2 instance.
- B) Copy the website assets to an Amazon Elastic File System (Amazon EFS) file system. Configure each EC2 instance to mount the EFS file system locally. Configure the website hosting application to reference the website assets that are stored in the EFS file system.
- C) Copy the website assets to an Amazon S3 bucket. Ensure that each EC2 instance downloads the website assets from the S3 bucket to the attached Amazon Elastic Block Store (Amazon EBS) volume. Run the S3 sync command once each hour to keep files up to date.
- D) Restore an Amazon Elastic Block Store (Amazon EBS) snapshot with the website assets. Attach the EBS snapshot as a secondary EBS volume when a new EC2 instance is launched. Configure the website hosting application to reference the website assets that are stored in the secondary EBS volume.

**Answer:** B

**해설:**

> **문제:** 여러 AZ에 걸친 Auto Scaling EC2 인스턴스에서 CMS를 운영합니다. 모든 인스턴스가 최신 웹사이트 콘텐츠를 최소 지연으로 공유해야 합니다.

| 선지 | 번역 |
|------|------|
| A | Auto Scaling 라이프사이클 정책으로 최신 인스턴스에서 에셋 복사 |
| B | EFS에 웹사이트 에셋 저장, 모든 EC2 인스턴스가 EFS 마운트 |
| C | S3에 에셋 저장, 매시간 sync 명령 실행 |
| D | EBS 스냅샷으로 에셋 배포, 새 인스턴스에 보조 EBS 연결 |

**(A)** : 오답. 복잡하고 실시간 동기화가 보장되지 않습니다.

**(B) 정답** : **Amazon EFS**는 여러 EC2 인스턴스에서 동시에 마운트하여 공유할 수 있는 완전 관리형 NFS 파일 시스템입니다. 모든 인스턴스가 동일한 EFS를 참조하므로 최소 지연으로 콘텐츠를 공유할 수 있습니다. → [📖 **Amazon EFS**는 여러 EC2 인스턴스에서 동시에 마운트하여 공유할 수 있는 완전 관리형 NFS ...](/section/05-ec2-instance-storage#amazon-efs-elastic-file-system)

**(C)** : 오답. 매시간 sync는 지연이 발생합니다.

**(D)** : 오답. EBS는 단일 인스턴스에만 연결되므로 다중 인스턴스 공유에 적합하지 않습니다. → [📖 오답. EBS는 단일 인스턴스에만 연결되므로 다중 인스턴스 공유에 적합하지 않습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** Amazon EFS 공유 파일 시스템, 다중 AZ 콘텐츠 공유

**관련 노트:** [Amazon EFS Elastic File System](/section/05-ec2-instance-storage#amazon-efs-elastic-file-system), [EBS vs EFS vs Instance Store 비교 시험 핵심!](/section/05-ec2-instance-storage#ebs-vs-efs-vs-instance-store-비교-시험-핵심)

---

### Q647. A company's web application consists of multiple Amazon EC2 instances that run behind an Application Load Balancer in a VPC. An Amazon RDS for MySQL DB instance contains the data. The company needs the ability to automatically detect and respond to suspicious or unexpected behavior in its AWS environment. The company already has added AWS WAF to its architecture. What should a solutions architect do next to protect against threats?

**Options:**
- A) Use Amazon GuardDuty to perform threat detection. Configure Amazon EventBridge (Amazon CloudWatch Events) to filter for GuardDuty findings and to invoke an AWS Lambda function to adjust the AWS WAF rules.
- B) Use AWS Firewall Manager to perform threat detection. Configure Amazon EventBridge (Amazon CloudWatch Events) to filter for Firewall Manager findings and to invoke an AWS Lambda function to adjust the AWS WAF web ACL.
- C) Use Amazon Inspector to perform threat detection and to update the AWS WAF rules. Create a VPC network ACL to limit access to the web application.
- D) Use Amazon Macie to perform threat detection and to update the AWS WAF rules. Create a VPC network ACL to limit access to the web application.

**Answer:** A

**해설:**

> **문제:** VPC 내 ALB + EC2 + RDS 구성의 웹 앱에 AWS WAF가 이미 적용되어 있습니다. 의심스러운 동작을 자동으로 감지하고 대응하려면?

| 선지 | 번역 |
|------|------|
| A | GuardDuty로 위협 감지, EventBridge로 Lambda 호출하여 WAF 규칙 조정 |
| B | Firewall Manager로 위협 감지, EventBridge로 Lambda 호출하여 WAF ACL 조정 |
| C | Inspector로 위협 감지 및 WAF 규칙 업데이트, VPC NACL 제한 |
| D | Macie로 위협 감지 및 WAF 규칙 업데이트, VPC NACL 제한 |

**(A) 정답** : **GuardDuty**는 AWS 계정 전반의 위협을 지능적으로 감지하는 서비스입니다. EventBridge로 GuardDuty 발견 사항을 필터링하여 Lambda를 트리거하고 WAF 규칙을 자동으로 조정하는 것이 올바른 자동화 패턴입니다. → [📖 **GuardDuty**는 AWS 계정 전반의 위협을 지능적으로 감지하는 서비스입니다. EventBridge...](/section/24-security-encryption#amazon-guardduty)

**(B)** : 오답. Firewall Manager는 WAF 정책을 중앙 관리하는 도구이지 위협 감지 서비스가 아닙니다. → [📖 오답. Firewall Manager는 WAF 정책을 중앙 관리하는 도구이지 위협 감지 서비스가 아닙니다.](/section/24-security-encryption#aws-firewall-manager)

**(C)** : 오답. Inspector는 EC2 취약점 평가 서비스로 실시간 위협 감지와 다릅니다. → [📖 오답. Inspector는 EC2 취약점 평가 서비스로 실시간 위협 감지와 다릅니다.](/section/24-security-encryption#amazon-inspector)

**(D)** : 오답. Macie는 S3 데이터 보안(민감 정보 탐지) 서비스입니다. → [📖 오답. Macie는 S3 데이터 보안(민감 정보 탐지) 서비스입니다.](/section/24-security-encryption#amazon-macie)

**핵심 개념:** GuardDuty 위협 감지, EventBridge + Lambda 자동 대응

**관련 노트:** [Amazon GuardDuty](/section/24-security-encryption#amazon-guardduty), [Amazon EventBridge CloudWatch Events 후속](/section/22-monitoring-audit-performance#amazon-eventbridge-cloudwatch-events-후속)

---

### Q648. A company is planning to run a group of Amazon EC2 instances that connect to an Amazon Aurora database. The company has built an AWS CloudFormation template to deploy the EC2 instances and the Aurora DB cluster. The company wants to allow the instances to authenticate to the database in a secure way. The company does not want to maintain static database credentials. Which solution meets these requirements with the LEAST operational effort?

**Options:**
- A) Create a database user with a user name and password. Add parameters for the database user name and password to the CloudFormation template. Pass the parameters to the EC2 instances when the instances are launched.
- B) Create a database user with a user name and password. Store the user name and password in AWS Systems Manager Parameter Store. Configure the EC2 instances to retrieve the database credentials from Parameter Store.
- C) Configure the DB cluster to use IAM database authentication. Create a database user to use with IAM authentication. Associate a role with the EC2 instances to allow applications on the instances to access the database.
- D) Configure the DB cluster to use IAM database authentication with an IAM user. Create a database user that has a name that matches the IAM user. Associate the IAM user with the EC2 instances to allow applications on the instances to access the database.

**Answer:** C

**해설:**

> **문제:** CloudFormation으로 EC2와 Aurora를 배포합니다. 정적 DB 자격증명 없이 안전하게 인증하는 방법은?

| 선지 | 번역 |
|------|------|
| A | DB 사용자/비밀번호를 CloudFormation 파라미터로 전달 |
| B | DB 자격증명을 Parameter Store에 저장, EC2에서 조회 |
| C | IAM DB 인증 구성, EC2에 IAM 역할 연결 |
| D | IAM 사용자를 이용한 IAM DB 인증, IAM 사용자를 EC2에 연결 |

**(A)** : 오답. 정적 자격증명을 사용하는 방식입니다.

**(B)** : 오답. Parameter Store는 자격증명을 안전하게 저장하지만 여전히 정적 자격증명입니다. → [📖 오답. Parameter Store는 자격증명을 안전하게 저장하지만 여전히 정적 자격증명입니다.](/section/24-security-encryption#ssm-parameter-store)

**(C) 정답** : **IAM 데이터베이스 인증**을 사용하면 정적 비밀번호 없이 IAM 역할 기반으로 Aurora에 인증할 수 있습니다. EC2 인스턴스에 IAM 역할을 연결하면 임시 토큰으로 DB에 접근합니다. → [📖 **IAM 데이터베이스 인증**을 사용하면 정적 비밀번호 없이 IAM 역할 기반으로 Aurora에 인증할 수...](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**(D)** : 오답. IAM 역할이 아닌 IAM 사용자를 EC2에 직접 연결하는 것은 권장되지 않습니다. → [📖 오답. IAM 역할이 아닌 IAM 사용자를 EC2에 직접 연결하는 것은 권장되지 않습니다.](/section/02-iam#users-groups)

**핵심 개념:** Aurora IAM 데이터베이스 인증, 정적 자격증명 제거

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안), [Amazon Aurora](/section/07-rds-aurora-elasticache#amazon-aurora)

---

### Q649. A company wants to configure its Amazon CloudFront distribution to use SSL/TLS certificates. The company does not want to use the default domain name for the distribution. Instead, the company wants to use a different domain name for the distribution. Which solution will deploy the certificate without incurring any additional costs?

**Options:**
- A) Request an Amazon issued private certificate from AWS Certificate Manager (ACM) in the us-east-1 Region.
- B) Request an Amazon issued private certificate from AWS Certificate Manager (ACM) in the us-west-1 Region.
- C) Request an Amazon issued public certificate from AWS Certificate Manager (ACM) in the us-east-1 Region.
- D) Request an Amazon issued public certificate from AWS Certificate Manager (ACM) in the us-west-1 Region.

**Answer:** C

**해설:**

> **문제:** CloudFront에서 커스텀 도메인명으로 SSL/TLS 인증서를 사용하되 추가 비용 없이 배포하려면?

| 선지 | 번역 |
|------|------|
| A | us-east-1에서 ACM 사설(private) 인증서 요청 |
| B | us-west-1에서 ACM 사설(private) 인증서 요청 |
| C | us-east-1에서 ACM 공개(public) 인증서 요청 |
| D | us-west-1에서 ACM 공개(public) 인증서 요청 |

**(A)** : 오답. 사설 인증서는 비용이 발생하고 CloudFront에 직접 사용할 수 없습니다. → [📖 오답. 사설 인증서는 비용이 발생하고 CloudFront에 직접 사용할 수 없습니다.](/section/24-security-encryption#aws-certificate-manager-acm)

**(B)** : 오답. 리전도 틀리고 사설 인증서입니다. → [📖 오답. 리전도 틀리고 사설 인증서입니다.](/section/24-security-encryption#aws-certificate-manager-acm)

**(C) 정답** : ACM에서 발급한 **공개(Public) 인증서**는 무료입니다. CloudFront는 글로벌 서비스이므로 반드시 **us-east-1(버지니아 북부)** 리전에서 인증서를 요청해야 합니다. → [📖 ACM에서 발급한 **공개(Public) 인증서**는 무료입니다. CloudFront는 글로벌 서비스이므로 ...](/section/24-security-encryption#aws-certificate-manager-acm)

**(D)** : 오답. CloudFront용 ACM 인증서는 반드시 us-east-1에 있어야 합니다. → [📖 오답. CloudFront용 ACM 인증서는 반드시 us-east-1에 있어야 합니다.](/section/24-security-encryption#aws-certificate-manager-acm)

**핵심 개념:** CloudFront SSL 인증서 — ACM 공개 인증서, 반드시 us-east-1 리전

**관련 노트:** [AWS Certificate Manager ACM](/section/24-security-encryption#aws-certificate-manager-acm), [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

---

### Q650. A company creates operations data and stores the data in an Amazon S3 bucket. For the company's annual audit, an external consultant needs to access an annual report that is stored in the S3 bucket. The external consultant needs to access the report for 7 days. The company must implement a solution to allow the external consultant access to only the report. Which solution will meet these requirements with the MOST operational efficiency?

**Options:**
- A) Create a new S3 bucket that is configured to host a public static website. Migrate the operations data to the new S3 bucket. Share the S3 website URL with the external consultant.
- B) Enable public access to the S3 bucket for 7 days. Remove access to the S3 bucket when the external consultant completes the audit.
- C) Create a new IAM user that has access to the report in the S3 bucket. Provide the access keys to the external consultant. Revoke the access keys after 7 days.
- D) Generate a presigned URL that has the required access to the location of the report on the S3 bucket. Share the presigned URL with the external consultant.

**Answer:** D

**해설:**

> **문제:** 외부 컨설턴트가 S3 버킷의 연간 보고서에 7일간만 접근해야 합니다. 해당 보고서만 접근 가능하게 해야 합니다.

| 선지 | 번역 |
|------|------|
| A | 공개 정적 웹사이트 S3 버킷 생성 후 URL 공유 |
| B | S3 버킷 공개 접근 7일간 허용 후 제거 |
| C | 새 IAM 사용자 생성, 접근 키 제공 후 7일 후 취소 |
| D | S3 Presigned URL 생성하여 컨설턴트에게 공유 |

**(A)** : 오답. 전체 데이터를 공개하는 것은 보안상 위험합니다. → [📖 오답. 전체 데이터를 공개하는 것은 보안상 위험합니다.](/section/10-amazon-s3#s3-보안)

**(B)** : 오답. 버킷 전체를 공개하는 것은 과도한 접근 허용입니다. → [📖 오답. 버킷 전체를 공개하는 것은 과도한 접근 허용입니다.](/section/10-amazon-s3#s3-bucket-policy)

**(C)** : 오답. IAM 사용자 생성/삭제는 운영 오버헤드가 있고, 접근 키 노출 위험이 있습니다. → [📖 오답. IAM 사용자 생성/삭제는 운영 오버헤드가 있고, 접근 키 노출 위험이 있습니다.](/section/02-iam#users-groups)

**(D) 정답** : **Presigned URL**은 특정 S3 객체에 시간 제한(7일 설정 가능)을 두고 접근을 허용하는 가장 간단하고 안전한 방법입니다. IAM 자격증명 없이 URL 소지자가 접근할 수 있습니다. → [📖 **Presigned URL**은 특정 S3 객체에 시간 제한(7일 설정 가능)을 두고 접근을 허용하는 가장...](/section/12-s3-security#s3-presigned-urls)

**핵심 개념:** S3 Presigned URL, 임시 접근 권한

**관련 노트:** [S3 Pre-Signed URLs](/section/12-s3-security#s3-presigned-urls)

---
