# Ditectrev SAA-C03 Practice Questions — Batch 06 (Q251-Q300)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---


### Q251. What are the two types of licensing options available for using Amazon RDS for Oracle?

**Options:**
- A) BYOL and Enterprise License.
- B) BYOL and License Included.
- C) Enterprise License and License Included.
- D) Role based License and License Included.

**Answer:** B

**해설:**

> **문제:** Amazon RDS for Oracle에서 사용 가능한 두 가지 라이선스 옵션은?

| 선지 | 번역 |
|------|------|
| A | BYOL과 Enterprise License. |
| B | BYOL과 License Included. |
| C | Enterprise License와 License Included. |
| D | Role based License와 License Included. |

**(A)** : Enterprise License는 RDS Oracle의 라이선스 옵션이 아닙니다.

**(B) 정답** : RDS for Oracle은 BYOL(Bring Your Own License, 기존 Oracle 라이선스 사용)과 License Included(AWS가 라이선스 포함 제공)의 두 가지 옵션을 제공합니다.

**(C)** : Enterprise License는 RDS에서 제공하는 옵션이 아닙니다.

**(D)** : Role based License는 존재하지 않는 옵션입니다.

**핵심 개념:** RDS Oracle 라이선스 옵션 (BYOL, License Included)

---

### Q252. In AWS, which security aspects are the customer's responsibility? (Choose 4 answers)

**Options:**
- A) Security Group and ACL (Access Control List) settings.
- B) Decommissioning storage devices.
- C) Patch management on the EC2 instance's operating system.
- D) Life-cycle management of IAM credentials.
- E) Controlling physical access to compute resources.
- F) Encryption of EBS (Elastic Block Storage) volumes.

**Answer:** A, C, D, F

**해설:**

> **문제:** AWS에서 고객의 보안 책임에 해당하는 항목은? (4개 선택)

| 선지 | 번역 |
|------|------|
| A | 보안 그룹 및 ACL 설정. |
| B | 스토리지 디바이스 폐기. |
| C | EC2 인스턴스 OS 패치 관리. |
| D | IAM 자격 증명 수명 주기 관리. |
| E | 컴퓨팅 리소스에 대한 물리적 접근 제어. |
| F | EBS 볼륨 암호화. |

**(A) 정답** : 보안 그룹 및 ACL 설정은 고객의 책임입니다.

**(B)** : 스토리지 디바이스 폐기는 AWS의 책임입니다 (공유 책임 모델).

**(C) 정답** : EC2 인스턴스의 OS 패치 관리는 고객의 책임입니다.

**(D) 정답** : IAM 자격 증명 관리(생성, 교체, 삭제)는 고객의 책임입니다.

**(E)** : 물리적 데이터센터 접근 제어는 AWS의 책임입니다.

**(F) 정답** : EBS 볼륨 암호화는 고객이 선택하고 관리해야 하는 고객의 책임입니다.

**핵심 개념:** AWS 공유 책임 모델 (Shared Responsibility Model)

---

### Q253. You have a web application running on six Amazon EC2 instances, consuming about 45% of resources on each instance. You are using auto-scaling to make sure that six instances are running at all times. The number of requests this application processes is consistent and does not experience spikes. The application is critical to your business and you want high availability at all times. You want the load to be distributed evenly between all instances. You also want to use the same Amazon Machine Image (AMI) for all instances. Which of the following architectural choices should you make?

**Options:**
- A) Deploy 6 EC2 instances in one Availability Zone and use Amazon Elastic Load Balancer.
- B) Deploy 3 EC2 instances in one region and 3 in another region and use Amazon Elastic Load Balancer.
- C) Deploy 3 EC2 instances in one Availability Zone and 3 in another Availability Zone and use Amazon Elastic Load Balancer.
- D) Deploy 2 EC2 instances in three regions and use Amazon Elastic Load Balancer.

**Answer:** C

**해설:**

> **문제:** 6개 EC2 인스턴스를 고가용성과 균등 부하 분산을 위해 어떻게 배포해야 하나요?

| 선지 | 번역 |
|------|------|
| A | 한 가용 영역에 6개 배포 + ELB. |
| B | 한 리전에 3개, 다른 리전에 3개 배포 + ELB. |
| C | 한 AZ에 3개, 다른 AZ에 3개 배포 + ELB. |
| D | 세 리전에 각 2개씩 배포 + ELB. |

**(A)** : 단일 AZ 배포는 AZ 장애 시 고가용성을 제공하지 못합니다.

**(B)** : 표준 ELB는 여러 리전에 걸쳐 작동하지 않습니다.

**(C) 정답** : 두 AZ에 각 3개씩 배포하고 ELB를 사용하면, AZ 장애 시에도 가용성을 유지하고 ELB가 균등하게 트래픽을 분산합니다. 동일한 AMI도 사용 가능합니다.

**(D)** : ELB는 동일 리전 내에서만 작동하며, 여러 리전에 걸친 단일 ELB는 불가합니다.

**핵심 개념:** 다중 AZ 고가용성 아키텍처, ELB

---

### Q254. An ERP application is deployed across multiple AZs in a single region. In the event of failure, the Recovery Time Objective (RTO) must be less than 3 hours, and the Recovery Point Objective (RPO) must be 15 minutes. The customer realizes that data corruption occurred roughly 1.5 hours ago. What DR strategy could be used to achieve this RTO and RPO in the event of this kind of failure?

**Options:**
- A) Take hourly DB backups to S3, with transaction logs stored in S3 every 5 minutes.
- B) Use synchronous database master-slave replication between two Availability Zones.
- C) Take hourly DB backups to EC2 Instance store volumes with transaction logs stored in S3 every 5 minutes.
- D) Take 15 minute DB backups stored in Glacier with transaction logs stored in S3 every 5 minutes.

**Answer:** A

**해설:**

> **문제:** RTO 3시간 이내, RPO 15분으로 1.5시간 전 데이터 손상 복구를 지원하는 DR 전략은?

| 선지 | 번역 |
|------|------|
| A | S3에 시간당 DB 백업 + S3에 5분마다 트랜잭션 로그 저장. |
| B | 두 AZ 간 동기식 마스터-슬레이브 복제. |
| C | EC2 인스턴스 스토어에 시간당 DB 백업 + S3에 5분마다 트랜잭션 로그. |
| D | Glacier에 15분 간격 DB 백업 + S3에 5분마다 트랜잭션 로그. |

**(A) 정답** : S3에 시간당 백업과 5분마다 트랜잭션 로그를 저장하면, 1.5시간 전 손상 시점으로 복구(RPO 15분 충족)하고 3시간 이내에 복구(RTO 충족)할 수 있습니다.

**(B)** : 동기식 복제는 데이터 손상도 함께 복제되므로 데이터 손상 시나리오에 적합하지 않습니다.

**(C)** : 인스턴스 스토어는 임시 스토리지로 영속성이 없어 백업 대상으로 부적합합니다.

**(D)** : Glacier 검색에 수 시간이 걸려 RTO 3시간을 충족하기 어렵습니다.

**핵심 개념:** RTO, RPO, DR 전략, 트랜잭션 로그 백업

---

### Q255. You have been setting up an Amazon Virtual Private Cloud (Amazon VPC) for your company, including setting up subnets. Security is a concern, and you are not sure which is the best security practice for securing subnets in your VPC. Which statement below is correct in describing the protection of AWS resources in each subnet?

**Options:**
- A) You can use multiple layers of security, including security groups and network access control lists (ACL).
- B) You can only use access control lists (ACL).
- C) You don't need any security in subnets.
- D) You can use multiple layers of security, including security groups, network access control lists (ACL) and CloudHS.

**Answer:** A

**해설:**

> **문제:** VPC 서브넷 내 AWS 리소스 보호에 대한 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹과 네트워크 ACL을 포함한 여러 보안 레이어를 사용할 수 있다. |
| B | ACL만 사용할 수 있다. |
| C | 서브넷에는 보안이 필요 없다. |
| D | 보안 그룹, ACL, CloudHS를 포함한 여러 보안 레이어를 사용할 수 있다. |

**(A) 정답** : VPC에서는 보안 그룹(인스턴스 수준)과 네트워크 ACL(서브넷 수준)의 두 가지 방어 계층을 사용할 수 있습니다.

**(B)** : 보안 그룹도 사용할 수 있습니다.

**(C)** : 서브넷에도 보안이 필요합니다.

**(D)** : "CloudHS"는 올바른 서비스명이 아닙니다(CloudHSM과 혼동). 또한 CloudHSM은 서브넷 보안 레이어가 아닙니다.

**핵심 개념:** VPC 보안 계층 (Security Group + Network ACL)

---

### Q256. Amazon EC2 provides a repository of public data sets that can be seamlessly integrated into AWS cloud-based applications. What is the monthly charge for using the public data sets?

**Options:**
- A) A 1 time charge of 10$ for all the datasets.
- B) 1$ per dataset per month.
- C) 10$ per month for all the datasets.
- D) There is no charge for using the public data sets.

**Answer:** D

**해설:**

> **문제:** Amazon EC2 공개 데이터 세트 사용 월 요금은?

| 선지 | 번역 |
|------|------|
| A | 모든 데이터 세트에 대해 일회성 $10. |
| B | 데이터 세트당 월 $1. |
| C | 모든 데이터 세트에 대해 월 $10. |
| D | 공개 데이터 세트 사용은 무료. |

**(A), (B), (C)** : 공개 데이터 세트는 유료가 아닙니다.

**(D) 정답** : AWS 공개 데이터 세트(Public Data Sets)는 무료로 사용할 수 있습니다. 다만 데이터를 다운로드할 때 표준 EC2 데이터 전송 요금이 부과될 수 있습니다.

**핵심 개념:** AWS 공개 데이터 세트 (무료)

---

### Q257. [...] embodies the 'share-nothing' architecture and essentially involves breaking a large database into several smaller databases.

**Options:**
- A) $harding.
- B) Failure recovery.
- C) Federation.
- D) DOL operations.

**Answer:** A

**해설:**

> **문제:** '아무것도 공유하지 않는' 아키텍처를 구현하며 대형 데이터베이스를 여러 작은 데이터베이스로 분할하는 기법은?

| 선지 | 번역 |
|------|------|
| A | 샤딩(Sharding). |
| B | 장애 복구. |
| C | 페더레이션. |
| D | DOL 작업. |

**(A) 정답** : 샤딩(Sharding)은 대형 데이터베이스를 여러 개의 작은 샤드(shard)로 분할하여 각 서버에 분산 저장하는 기법입니다. 'Share-nothing' 아키텍처를 구현하며 수평 확장성을 제공합니다.

**(B)** : 장애 복구는 데이터베이스 분할 기법이 아닙니다.

**(C)** : 페더레이션은 데이터베이스 연합 개념으로 샤딩과 다릅니다.

**(D)** : DOL(Data Object Layer) 작업은 관련 없는 개념입니다.

**핵심 개념:** 데이터베이스 샤딩(Sharding), 수평 확장

---

### Q258. After deploying a new website for a client on AWS, he asks if you can set it up so that if it fails it can be automatically redirected to a backup website that he has stored on a dedicated server elsewhere. You are wondering whether Amazon Route 53 can do this. Which statement below is correct in regards to Amazon Route 53?

**Options:**
- A) Amazon Route 53 can't help detect an outage. You need to use another service.
- B) Amazon Route 53 can help detect an outage of your website and redirect your end users to alternate locations.
- C) Amazon Route 53 can help detect an outage of your website but can't redirect your end users to alternate locations.
- D) Amazon Route 53 can't help detect an outage of your website, but can redirect your end users to alternate locations.

**Answer:** B

**해설:**

> **문제:** Amazon Route 53이 웹사이트 장애를 감지하고 백업 사이트로 자동 리다이렉트할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | Route 53은 장애를 감지할 수 없다. 다른 서비스가 필요하다. |
| B | Route 53은 웹사이트 장애를 감지하고 사용자를 대체 위치로 리다이렉트할 수 있다. |
| C | Route 53은 장애를 감지할 수 있지만 대체 위치로 리다이렉트는 불가하다. |
| D | Route 53은 장애를 감지할 수 없지만 대체 위치로 리다이렉트는 할 수 있다. |

**(A)** : Route 53은 헬스 체크를 통해 장애를 감지합니다.

**(B) 정답** : Amazon Route 53의 헬스 체크 기능과 DNS 장애 조치(Failover) 라우팅 정책을 사용하면 기본 웹사이트 장애 감지 후 자동으로 대체 사이트로 트래픽을 전환할 수 있습니다.

**(C)** : 리다이렉트도 가능합니다.

**(D)** : 감지도 가능합니다.

**핵심 개념:** Route 53 헬스 체크, Failover 라우팅 정책

---

### Q259. Your company plans to host a large donation website on Amazon Web Services (AWS). You anticipate a large and undetermined amount of traffic that will create many database writes. To be certain that you do not drop any writes to a database hosted on AWS. Which service should you use?

**Options:**
- A) Amazon RDS with provisioned IOPS up to the anticipated peak write throughput.
- B) Amazon Simple Queue Service (SQS) for capturing the writes and draining the queue to write to the database.
- C) Amazon ElastiCache to store the writes until the writes are committed to the database.
- D) Amazon DynamoDB with provisioned write throughput up to the anticipated peak write throughput.

**Answer:** B

**해설:**

> **문제:** 예측 불가한 대규모 트래픽에서 데이터베이스 쓰기 손실을 방지하려면 어떤 서비스를 사용해야 하나요?

| 선지 | 번역 |
|------|------|
| A | 예상 최대 쓰기 처리량에 맞춘 Provisioned IOPS의 RDS. |
| B | SQS로 쓰기를 캡처하고 큐를 비워 데이터베이스에 쓴다. |
| C | ElastiCache에 쓰기를 저장하다가 DB에 커밋한다. |
| D | 예상 최대 처리량에 맞춘 쓰기 처리량의 DynamoDB. |

**(A)** : 예측 불가한 트래픽에서 사전 프로비저닝된 IOPS는 부족할 수 있으며, 쓰기를 잃을 수 있습니다.

**(B) 정답** : SQS는 내구성 있는 메시지 큐로, 대량의 쓰기 요청을 손실 없이 버퍼링하고 DB가 처리할 수 있는 속도로 드레인합니다. 트래픽 스파이크 시에도 데이터 손실이 없습니다.

**(C)** : ElastiCache는 인메모리 캐시로 내구성이 없어 데이터 손실 위험이 있습니다.

**(D)** : DynamoDB도 확장 가능하지만, 예측 불가한 트래픽에서 사전 프로비저닝된 처리량이 부족하면 쓰기가 거부될 수 있습니다.

**핵심 개념:** SQS 버퍼링 패턴, 데이터 손실 방지

---

### Q260. You have set up an Auto Scaling group. The cool down period for the Auto Scaling group is 7 minutes. The first instance is launched after 3 minutes, while the second instance is launched after 4 minutes. How many minutes after the first instance is launched will Auto Scaling accept another scaling activity request?

**Options:**
- A) 11 minutes.
- B) 7 minutes.
- C) 10 minutes.
- D) 14 minutes.

**Answer:** A

**해설:**

> **문제:** 쿨다운 기간이 7분일 때, 첫 번째 인스턴스가 시작된 후 몇 분 뒤에 또 다른 스케일링 활동이 허용되나요?

| 선지 | 번역 |
|------|------|
| A | 11분. |
| B | 7분. |
| C | 10분. |
| D | 14분. |

**(A) 정답** : 두 번째 인스턴스는 스케일링 활동 시작 후 4분에 시작됩니다. 쿨다운 기간 7분은 마지막 인스턴스가 시작된 시점부터 계산됩니다. 따라서 두 번째 인스턴스(4분) + 쿨다운 7분 = 11분. 첫 번째 인스턴스 시작(3분) 기준으로는 11-3 = 8분 후이지만, 전체 기준으로 11분이 됩니다.

**(B)** : 단순히 쿨다운 기간만 계산한 잘못된 답입니다.

**(C)** : 계산이 맞지 않습니다.

**(D)** : 두 배 계산으로 잘못된 답입니다.

**핵심 개념:** Auto Scaling 쿨다운 기간 계산

---

### Q261. You are migrating a legacy client-server application to AWS. The application responds to a specific DNS domain (e.g. www.example.com) and has a 2-tier architecture, with multiple application servers and a database server. Remote clients use TCP to connect to the application servers. The application servers need to know the IP address of the clients in order to function properly and are currently taking that information from the TCP socket. A Multi-AZ RDS MySQL instance will be used for the database. During the migration you can change the application code, but you have to file a change request. How would you implement the architecture on AWS in order to maximize scalability and high availability?

**Options:**
- A) File a change request to implement Alias Resource support in the application. Use Route 53 Alias Resource Record to distribute load on two application servers in different AZs.
- B) File a change request to implement Latency Based Routing support in the application. Use Route 53 with Latency Based Routing enabled to distribute load on two application servers in different AZs.
- C) File a change request to implement Cross-Zone support in the application. Use an ELB with a TCP Listener and Cross-Zone Load Balancing enabled, two application servers in different AZs.
- D) File a change request to implement Proxy Protocol support in the application. Use an ELB with a TCP Listener and Proxy Protocol enabled to distribute load on two application servers in different AZs.

**Answer:** D

**해설:**

> **문제:** 클라이언트 IP 주소가 필요한 레거시 TCP 애플리케이션을 AWS에서 고가용성/확장성 있게 배포하는 방법은?

| 선지 | 번역 |
|------|------|
| A | Alias Resource 지원 구현 + Route 53 Alias Record로 두 AZ 서버에 부하 분산. |
| B | Latency Based Routing 지원 구현 + Route 53 Latency 라우팅으로 부하 분산. |
| C | Cross-Zone 지원 구현 + ELB TCP 리스너 + Cross-Zone Load Balancing. |
| D | Proxy Protocol 지원 구현 + ELB TCP 리스너 + Proxy Protocol 활성화. |

**(A)** : Route 53 Alias Record만으로는 클라이언트 IP가 전달되지 않습니다.

**(B)** : Latency 라우팅도 클라이언트 IP 전달 문제를 해결하지 못합니다.

**(C)** : Cross-Zone Load Balancing은 AZ 간 균등 분산을 위한 기능이며 클라이언트 IP를 전달하지 않습니다.

**(D) 정답** : ELB TCP 리스너에서 Proxy Protocol을 활성화하면 ELB가 원래 클라이언트 IP 정보를 헤더에 포함시켜 전달합니다. 애플리케이션에서 Proxy Protocol을 파싱하도록 코드를 변경하면 클라이언트 IP를 알 수 있습니다.

**핵심 개념:** ELB Proxy Protocol, 클라이언트 IP 보존

---

### Q262. Can I test my DB Instance against a new version before upgrading?

**Options:**
- A) Yes.
- B) No.
- C) Only in VPC.

**Answer:** A

**해설:**

> **문제:** 업그레이드 전에 새 버전으로 DB 인스턴스를 테스트할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니요. |
| C | VPC에서만 가능. |

**(A) 정답** : RDS는 DB 스냅샷에서 새 버전으로 복원하여 업그레이드 전에 테스트할 수 있습니다. 이를 통해 호환성 문제를 사전에 확인할 수 있습니다.

**(B)** : 테스트가 가능합니다.

**(C)** : VPC에만 국한되지 않습니다.

**핵심 개념:** RDS 버전 업그레이드 테스트

---

### Q263. Your system recently experienced down time during the troubleshooting process. You found that a new administrator mistakenly terminated several production EC2 instances. Which of the following strategies will help prevent a similar situation in the future? The administrator still must be able to: Launch, start stop, and terminate development resources. Launch and start production instances.

**Options:**
- A) Create an IAM user, which is not allowed to terminate instances by leveraging production EC2 termination protection.
- B) Leverage resource based tagging along with an IAM user, which can prevent specific users from terminating production EC2 resources.
- C) Leverage EC2 termination protection and multi-factor authentication, which together require users to authenticate before terminating EC2 instances.
- D) Create an IAM user and apply an IAM role which prevents users from terminating production EC2 instances.

**Answer:** B

**해설:**

> **문제:** 관리자가 개발 리소스는 완전히 관리하고 프로덕션 인스턴스는 시작만 가능하게 하면서, 프로덕션 인스턴스 종료를 방지하는 방법은?

| 선지 | 번역 |
|------|------|
| A | 종료 보호 기능을 활용해 프로덕션 EC2 종료를 금지하는 IAM 사용자 생성. |
| B | 리소스 기반 태깅과 IAM 정책으로 특정 사용자가 프로덕션 EC2를 종료하지 못하게 함. |
| C | EC2 종료 보호 + MFA로 종료 전 인증 필요. |
| D | IAM 사용자 + 프로덕션 EC2 종료를 방지하는 IAM 역할 적용. |

**(A)** : 종료 보호는 실수를 방지하지만 IAM 정책으로 개발/프로덕션 구분이 안 됩니다.

**(B) 정답** : 프로덕션 인스턴스에 태그(예: `Env=Production`)를 붙이고 IAM 정책에서 해당 태그가 있는 인스턴스의 종료를 거부하면, 관리자는 개발 환경은 자유롭게 관리하고 프로덕션만 종료하지 못하게 됩니다.

**(C)** : MFA는 인증을 강화하지만 개발/프로덕션 구분 접근 제어에는 부적합합니다.

**(D)** : 역할만으로는 개발 리소스와 프로덕션 리소스를 구분하기 어렵습니다.

**핵심 개념:** IAM 태그 기반 리소스 권한 제어, aws:ResourceTag 조건

---

### Q264. You have just set up a large site for a client which involved a huge database which you set up with Amazon RDS to run as a Multi-AZ deployment. You now start to worry about what will happen if the database instance fails. Which statement best describes how this database will function if there is a database failure?

**Options:**
- A) Updates to your DB Instance are synchronously replicated across Availability Zones to the standby in order to keep both in sync and protect your latest database updates against DB Instance failure.
- B) Your database will not resume operation without manual administrative intervention.
- C) Updates to your DB Instance are asynchronously replicated across Availability Zones to the standby in order to keep both in sync and protect your latest database updates against DB Instance failure.
- D) Updates to your DB Instance are synchronously replicated across S3 to the standby in order to keep both in sync and protect your latest database updates against DB Instance failure.

**Answer:** A

**해설:**

> **문제:** RDS Multi-AZ 배포에서 DB 인스턴스 장애 시 어떻게 동작하나요?

| 선지 | 번역 |
|------|------|
| A | DB 인스턴스 업데이트가 대기 인스턴스에 AZ 간 동기식으로 복제되어 최신 업데이트를 보호한다. |
| B | 수동 관리자 개입 없이는 DB가 재개되지 않는다. |
| C | DB 인스턴스 업데이트가 대기 인스턴스에 AZ 간 비동기식으로 복제된다. |
| D | DB 인스턴스 업데이트가 S3를 통해 대기 인스턴스에 동기식으로 복제된다. |

**(A) 정답** : RDS Multi-AZ는 기본 인스턴스의 데이터를 대기 인스턴스에 동기식으로 복제합니다. 장애 발생 시 자동으로 대기 인스턴스로 페일오버하여 최신 데이터 보호 및 자동 복구가 이루어집니다.

**(B)** : RDS Multi-AZ는 자동 장애 조치를 지원합니다.

**(C)** : Multi-AZ는 비동기가 아닌 동기식 복제를 사용합니다. (비동기는 Read Replica)

**(D)** : S3를 통한 복제가 아닙니다.

**핵심 개념:** RDS Multi-AZ 동기 복제, 자동 장애 조치

---

### Q265. Your company has an on-premises multi-tier PHP web application, which recently experienced downtime due to a large burst in web traffic due to a company announcement. Over the coming days, you are expecting similar announcements to drive similar unpredictable bursts, and are looking to find ways to quickly improve your infrastructure's ability to handle unexpected increases in traffic. The application currently consists of 2 tiers: a web tier which consists of a load balancer and several Linux Apache web servers, as well as a database tier which hosts a Linux server hosting a MySQL database. Which scenario below will provide full site functionality, while helping to improve the ability of your application in the short timeframe required?

**Options:**
- A) Failover environment: Create an S3 bucket and configure it for website hosting. Migrate your DNS to Route 53 using zone file import, and leverage Route 53 DNS failover to failover to the S3 hosted website.
- B) Hybrid environment: Create an AMI, which can be used to launch web servers in EC2. Create an Auto Scaling group, which uses the AMI to scale the web tier based on incoming traffic. Leverage Elastic Load Balancing to balance traffic between on-premises web servers and those hosted in AWS.
- C) Offload traffic from on-premises environment: Setup a CloudFront distribution, and configure CloudFront to cache objects from a custom origin. Choose to customize your object cache behavior, and select a TTL that objects should exist in cache.
- D) Migrate to AWS: Use VM Import/Export to quickly convert an on-premises web server to an AMI.
- E) Create an Auto Scaling group, which uses the imported AMI to scale the web tier based on incoming traffic. Create an RDS read replica and setup replication between the RDS instance and on-premises MySQL server to migrate the database.

**Answer:** C

**해설:**

> **문제:** 단기간에 예측 불가한 트래픽 급증에 대응하면서 전체 사이트 기능을 유지하는 방법은?

| 선지 | 번역 |
|------|------|
| A | S3 정적 웹사이트 + Route 53 장애 조치 (전체 기능 미지원). |
| B | EC2 Auto Scaling + ELB로 온프레미스와 AWS 간 하이브리드 환경. |
| C | CloudFront 배포로 트래픽 오프로드, 커스텀 오리진 캐싱 설정. |
| D | VM Import/Export로 AWS 마이그레이션. |
| E | Auto Scaling + RDS Read Replica + 온프레미스 MySQL 복제. |

**(A)** : S3 정적 웹사이트는 PHP 동적 기능을 지원하지 못합니다.

**(B)** : 하이브리드 구성은 효과적이지만 설정에 시간이 걸립니다.

**(C) 정답** : CloudFront를 빠르게 설정하여 정적/캐시 가능한 콘텐츠를 CDN에서 처리하면 온프레미스 서버의 부하를 단기간에 크게 줄일 수 있습니다. 전체 사이트 기능도 유지됩니다.

**(D)** : 마이그레이션은 단기 해결책이 아닙니다.

**(E)** : 복잡한 마이그레이션 작업이 필요하여 단기간 해결에 적합하지 않습니다.

**핵심 개념:** CloudFront 트래픽 오프로드, 빠른 확장성 향상

---

### Q266. When using consolidated billing there are two account types. What are they?

**Options:**
- A) Paying account and Linked account.
- B) Parent account and Child account.
- C) Main account and Sub account.
- D) Main account and Secondary account.

**Answer:** A

**해설:**

> **문제:** 통합 결제 사용 시 두 가지 계정 유형은?

| 선지 | 번역 |
|------|------|
| A | 지불 계정과 연결 계정. |
| B | 부모 계정과 자식 계정. |
| C | 기본 계정과 하위 계정. |
| D | 기본 계정과 보조 계정. |

**(A) 정답** : AWS Organizations의 통합 결제에서는 결제를 담당하는 Paying Account(지불 계정, 현재 관리 계정)와 비용이 청구되는 Linked Account(연결 계정)의 두 가지 유형이 있습니다.

**(B), (C), (D)** : 공식 AWS 용어가 아닙니다.

**핵심 개념:** AWS 통합 결제, Paying Account / Linked Account

---

### Q267. You have a periodic Image analysis application that gets some files in input, analyzes them and for each file writes some data in output to a text file. The number of files in input per day is high and concentrated in a few hours of the day. Currently you have a server on EC2 with a large EBS volume that hosts the input data and the results. It takes almost 20 hours per day to complete the process. What services could be used to reduce the elaboration time and improve the availability of the solution?

**Options:**
- A) Amazon S3 to store I/O files. SQS to distribute elaboration commands to a group of hosts working in parallel. Auto scaling to dynamically size the group of hosts depending on the length of the SQS queue.
- B) EBS with Provisioned IOPS (PIOPS) to store I/O files. SNS to distribute elaboration commands to a group of hosts working in parallel. Auto Scaling to dynamically size the group of hosts depending on the number of SNS notifications.
- C) Amazon S3 to store I/O files. SNS to distribute elaboration commands to a group of hosts working in parallel. Auto scaling to dynamically size the group of hosts depending on the number of SNS notifications.
- D) EBS with Provisioned IOPS (PIOPS) to store I/O files. SQS to distribute elaboration commands to a group of hosts working in parallel. Auto Scaling to dynamically size the group of hosts depending on the length of the SQS queue.

**Answer:** D

**해설:**

> **문제:** 20시간 걸리는 이미지 분석 작업 시간을 줄이고 가용성을 높이는 방법은?

| 선지 | 번역 |
|------|------|
| A | S3 + SQS + Auto Scaling (큐 길이 기반). |
| B | EBS PIOPS + SNS + Auto Scaling (SNS 알림 수 기반). |
| C | S3 + SNS + Auto Scaling (SNS 알림 수 기반). |
| D | EBS PIOPS + SQS + Auto Scaling (큐 길이 기반). |

**(A)** : S3는 대용량 파일 저장에 적합하지만, 이 시나리오에서는 고성능 I/O가 필요한 작업이므로 EBS PIOPS가 더 적합합니다.

**(B)** : SNS는 푸시 방식으로 큐 기반 처리에 적합하지 않습니다.

**(C)** : SNS는 워커 그룹의 작업 분배 메커니즘으로 SQS보다 덜 적합합니다.

**(D) 정답** : EBS PIOPS로 고성능 I/O를 제공하고, SQS로 작업을 분배하며, Auto Scaling으로 큐 길이에 따라 워커 수를 동적으로 조절하면 처리 시간을 크게 줄일 수 있습니다.

**핵심 개념:** EBS PIOPS, SQS 작업 큐, Auto Scaling 병렬 처리

---

### Q268. While controlling access to Amazon EC2 resources, which of the following acts as a firewall that controls the traffic allowed to reach one or more instances?

**Options:**
- A) A security group.
- B) An instance type.
- C) A storage cluster.
- D) An object.

**Answer:** A

**해설:**

> **문제:** Amazon EC2 리소스 접근 제어 시 하나 이상의 인스턴스에 도달할 수 있는 트래픽을 제어하는 방화벽 역할을 하는 것은?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹. |
| B | 인스턴스 유형. |
| C | 스토리지 클러스터. |
| D | 객체. |

**(A) 정답** : 보안 그룹(Security Group)은 EC2 인스턴스에 대한 인바운드 및 아웃바운드 트래픽을 제어하는 가상 방화벽입니다.

**(B)** : 인스턴스 유형은 컴퓨팅 사양을 정의하며 방화벽 기능이 없습니다.

**(C)** : 스토리지 클러스터는 접근 제어 메커니즘이 아닙니다.

**(D)** : 객체는 S3의 데이터 단위입니다.

**핵심 개념:** EC2 보안 그룹 (가상 방화벽)

---

### Q269. The base URI for all requests for instance metadata is [...].

**Options:**
- A) http://254.169.169.254/latest/.
- B) http://169.169.254.254/latest/.
- C) http://127.0.0.1/latest/.
- D) http://169.254.169.254/latest/.

**Answer:** D

**해설:**

> **문제:** 인스턴스 메타데이터 요청의 기본 URI는?

| 선지 | 번역 |
|------|------|
| A | http://254.169.169.254/latest/. |
| B | http://169.169.254.254/latest/. |
| C | http://127.0.0.1/latest/. |
| D | http://169.254.169.254/latest/. |

**(A), (B), (C)** : 잘못된 IP 주소입니다.

**(D) 정답** : EC2 인스턴스 메타데이터에 접근하는 표준 URI는 `http://169.254.169.254/latest/meta-data/`입니다. 이 링크-로컬 주소는 인스턴스 내부에서만 접근 가능합니다.

**핵심 개념:** EC2 인스턴스 메타데이터 엔드포인트 (169.254.169.254)

---

### Q270. While using the EC2 GET requests as URLs, the [...] is the URL that serves as the entry point for the web service.

**Options:**
- A) token.
- B) endpoint.
- C) action.
- D) None of these.

**Answer:** B

**해설:**

> **문제:** EC2 GET 요청을 URL로 사용할 때, 웹 서비스의 진입점 역할을 하는 URL은?

| 선지 | 번역 |
|------|------|
| A | 토큰. |
| B | 엔드포인트. |
| C | 액션. |
| D | 해당 없음. |

**(A)** : 토큰은 인증에 사용되는 값입니다.

**(B) 정답** : 엔드포인트(Endpoint)는 웹 서비스에 대한 GET 요청의 진입점 URL입니다. 예: `https://ec2.amazonaws.com/`

**(C)** : 액션은 수행할 작업을 지정하는 파라미터입니다.

**(D)** : 정확한 답이 존재합니다.

**핵심 개념:** AWS API 엔드포인트

---

### Q271. A user is planning to launch a scalable web application. Which of the below mentioned options will not affect the latency of the application?

**Options:**
- A) Region.
- B) Provisioned IOPS.
- C) Availability Zone.
- D) Instance size.

**Answer:** B

**해설:**

> **문제:** 확장 가능한 웹 애플리케이션의 지연 시간에 영향을 주지 않는 것은?

| 선지 | 번역 |
|------|------|
| A | 리전. |
| B | Provisioned IOPS. |
| C | 가용 영역. |
| D | 인스턴스 크기. |

**(A)** : 리전은 사용자와의 물리적 거리에 영향을 주어 지연 시간에 영향합니다.

**(B) 정답** : Provisioned IOPS는 디스크 I/O 성능을 높이지만, 네트워크 지연 시간(응답 지연) 자체에는 직접적인 영향을 주지 않습니다. 처리량과 스토리지 성능을 향상시킵니다.

**(C)** : AZ는 리전 내 물리적 위치로 지연 시간에 영향합니다.

**(D)** : 인스턴스 크기는 컴퓨팅 성능에 영향하여 처리 지연에 영향합니다.

**핵심 개념:** 애플리케이션 지연 시간 영향 요소, Provisioned IOPS

---

### Q272. Your firm has uploaded a large amount of aerial image data to S3. In the past, in your on-premises environment, you used a dedicated group of servers to often process this data and used Rabbit MQ, an open source messaging system to get job information to the servers. Once processed, the data would go to tape and be shipped offsite. Your manager told you to stay with the current design, and leverage AWS archival storage and messaging services to minimize cost. Which is correct?

**Options:**
- A) Use SQS for passing job messages. Use Cloud Watch alarms to terminate EC2 worker instances when they become idle. Once data is processed, change the storage class of the S3 objects to Reduced Redundancy Storage.
- B) Setup Auto-Scaled workers triggered by queue depth that use spot instances to process messages in SQS. Once data is processed, change the storage class of the S3 objects to Reduced Redundancy Storage.
- C) Setup Auto-Scaled workers triggered by queue depth that use spot instances to process messages in SQS. Once data is processed, change the storage class of the S3 objects to Glacier.
- D) Use SNS to pass job messages. Use Cloud Watch alarms to terminate spot worker instances when they become idle. Once data is processed, change the storage class of the S3 object to Glacier.

**Answer:** D

**해설:**

> **문제:** RabbitMQ와 테이프 아카이브 대신 AWS 서비스를 사용하여 비용을 최소화하는 올바른 설계는?

| 선지 | 번역 |
|------|------|
| A | SQS + CloudWatch 알람으로 유휴 시 인스턴스 종료 + S3 RRS로 스토리지 클래스 변경. |
| B | SQS + Auto Scaling Spot 인스턴스 + S3 RRS로 변경. |
| C | SQS + Auto Scaling Spot 인스턴스 + S3 Glacier로 변경. |
| D | SNS로 작업 메시지 전달 + CloudWatch로 유휴 Spot 인스턴스 종료 + S3 Glacier로 변경. |

**(A)** : RRS(Reduced Redundancy Storage)는 내구성이 낮아 아카이브 스토리지에 부적합합니다.

**(B)** : RRS는 아카이브 용도에 적합하지 않습니다.

**(C)** : SQS 대신 SNS가 더 적합하고, Glacier가 아카이브 스토리지로 올바릅니다.

**(D) 정답** : RabbitMQ 대체로 SNS를 사용하고, 비용 절감을 위해 Spot 인스턴스와 CloudWatch로 유휴 시 종료합니다. 처리된 데이터는 Glacier(가장 저렴한 아카이브 스토리지)에 저장합니다.

**핵심 개념:** SNS, Spot 인스턴스, S3 Glacier 아카이브

---

### Q273. A user has launched 10 EC2 instances inside a placement group. Which of the below mentioned statements is true with respect to the placement group?

**Options:**
- A) All instances must be in the same AZ.
- B) All instances can be across multiple regions.
- C) The placement group cannot have more than 5 instances.
- D) All instances must be in the same region.

**Answer:** A

**해설:**

> **문제:** 플레이스먼트 그룹에서 10개의 EC2 인스턴스를 시작한 경우 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 모든 인스턴스는 동일한 AZ에 있어야 한다. |
| B | 모든 인스턴스는 여러 리전에 걸칠 수 있다. |
| C | 플레이스먼트 그룹은 5개 이하의 인스턴스만 가질 수 있다. |
| D | 모든 인스턴스는 동일한 리전에 있어야 한다. |

**(A) 정답** : 클러스터 플레이스먼트 그룹의 인스턴스는 모두 동일한 가용 영역(AZ) 내에 배치되어야 합니다. 이를 통해 저지연 네트워크 연결을 제공합니다.

**(B)** : 여러 리전에 걸쳐 배치할 수 없습니다.

**(C)** : 5개 제한은 없습니다.

**(D)** : 동일 리전이 아닌 동일 AZ이어야 합니다.

**핵심 개념:** EC2 클러스터 플레이스먼트 그룹, AZ 제약

---

### Q274. A user has created a CloudFormation stack. The stack creates AWS services, such as EC2 instances, ELB, AutoScaling, and RDS. While creating the stack it created EC2, ELB and AutoScaling but failed to create RDS. What will CloudFormation do in this scenario?

**Options:**
- A) Rollback all the changes and terminate all the created services.
- B) It will wait for the user's input about the error and correct the mistake after the input.
- C) CloudFormation can never throw an error after launching a few services since it verifies all the steps before launching.
- D) It will warn the user about the error and ask the user to manually create RDS.

**Answer:** A

**해설:**

> **문제:** CloudFormation 스택 생성 중 RDS 생성에 실패한 경우 어떻게 동작하나요?

| 선지 | 번역 |
|------|------|
| A | 모든 변경 사항을 롤백하고 생성된 모든 서비스를 종료한다. |
| B | 오류에 대한 사용자 입력을 기다리고 수정 후 계속한다. |
| C | CloudFormation은 시작 전에 모든 단계를 검증하므로 일부 서비스 시작 후 오류가 없다. |
| D | 오류를 경고하고 사용자에게 수동으로 RDS를 생성하도록 요청한다. |

**(A) 정답** : CloudFormation은 스택 생성 실패 시 기본적으로 모든 변경 사항을 롤백하고 이미 생성된 리소스도 삭제합니다. 이를 통해 일관성을 유지합니다.

**(B)** : 자동 롤백이 기본 동작입니다.

**(C)** : CloudFormation도 런타임 오류가 발생할 수 있습니다.

**(D)** : 수동 개입을 요청하지 않고 자동 롤백합니다.

**핵심 개념:** CloudFormation 롤백 동작, 스택 생성 실패 처리

---

### Q275. You have been asked to design the storage layer for an application. The application requires disk performance of at least 100,000 IOPS. In addition, the storage layer must be able to survive the loss of an individual disk, EC2 instance, or Availability Zone without any data loss. The volume you provide must have a capacity of at least 3 TB. Which of the following designs will meet these objectives?

**Options:**
- A) Instantiate a c3.8xlarge instance in us-east-1. Provision 4x1TB EBS volumes, attach them to the instance, and configure them as a single RAID 5 volume. Ensure that EBS snapshots are performed every 15 minutes.
- B) Instantiate a c3.8xlarge instance in us-east-1. Provision 3x1TB EBS volumes, attach them to the Instance, and configure them as a single RAID 0 volume. Ensure that EBS snapshots are performed every 15 minutes.
- C) Instantiate an i2.8xlarge instance in us-east-1a. Create a RAID 0 volume using the four 800GB SSD ephemeral disks provided with the instance. Provision 3x1TB EBS volumes, attach them to the instance, and configure them as a second RAID 0 volume. Configure synchronous, block-level replication from the ephemeral-backed volume to the EBS-backed volume.
- D) Instantiate a c3.8xlarge instance in us-east-1. Provision an AWS Storage Gateway and configure it for 3 TB of storage and 100,000 IOPS. Attach the volume to the instance.
- E) Instantiate an i2.8xlarge instance in us-east-1a. Create a RAID 0 volume using the four 800GB SSD ephemeral disks provided with the instance. Configure synchronous, block-level replication to an identically configured instance in us-east-1b.

**Answer:** E

**해설:**

> **문제:** 100,000 IOPS, AZ 손실 후에도 데이터 무손실, 3TB 이상 용량을 충족하는 스토리지 설계는?

| 선지 | 번역 |
|------|------|
| A | c3.8xlarge + 4x1TB EBS RAID 5 + 15분마다 스냅샷. |
| B | c3.8xlarge + 3x1TB EBS RAID 0 + 15분마다 스냅샷. |
| C | i2.8xlarge + 4x800GB SSD 임시 RAID 0 + 3x1TB EBS RAID 0 + 임시→EBS 동기 복제. |
| D | c3.8xlarge + Storage Gateway 3TB/100,000 IOPS. |
| E | i2.8xlarge us-east-1a + 4x800GB SSD RAID 0 + us-east-1b의 동일 구성 인스턴스로 동기 블록 복제. |

**(A)** : RAID 5는 EBS에서 권장되지 않으며, 스냅샷만으로는 실시간 AZ 손실에 대응하기 어렵습니다.

**(B)** : RAID 0은 데이터 손실 보호가 없고 스냅샷만으로는 AZ 손실 시 데이터 무손실을 보장할 수 없습니다.

**(C)** : 임시 디스크의 데이터를 EBS로 복제하지만 단일 AZ에 있어 AZ 손실 시 보호가 안 됩니다.

**(D)** : Storage Gateway는 이 요구사항에 적합하지 않습니다.

**(E) 정답** : i2.8xlarge의 4x800GB SSD RAID 0으로 100,000 IOPS와 3.2TB 용량 확보, us-east-1b의 동일 구성으로 동기 블록 복제하면 AZ 손실 시에도 데이터 무손실이 보장됩니다.

**핵심 개념:** 고성능 스토리지, AZ 수준 내결함성, 동기 복제

---

### Q276. A company is preparing to give AWS Management Console access to developers. Company policy mandates identity federation and role-based access control. Roles are currently assigned using groups in the corporate Active Directory. What combination of the following will give developers access to the AWS console? (Choose 2 answers)

**Options:**
- A) AWS Directory Service AD Connector.
- B) AWS Directory Service Simple AD.
- C) AWS Identity and Access Management groups.
- D) AWS identity and Access Management roles.
- E) AWS identity and Access Management users.

**Answer:** A, D

**해설:**

> **문제:** 기업 Active Directory 그룹을 통해 개발자에게 AWS 콘솔 접근을 제공하려면? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | AWS Directory Service AD Connector. |
| B | AWS Directory Service Simple AD. |
| C | AWS IAM 그룹. |
| D | AWS IAM 역할. |
| E | AWS IAM 사용자. |

**(A) 정답** : AD Connector는 기존 온프레미스 Active Directory를 AWS와 연동하여 기존 AD 자격 증명으로 AWS에 접근할 수 있게 합니다.

**(B)** : Simple AD는 독립 AD 구현으로, 기존 AD와의 연동보다는 새로운 소규모 디렉터리에 적합합니다.

**(C)** : IAM 그룹은 AWS 내부 그룹이며 AD 그룹과 직접 연동되지 않습니다.

**(D) 정답** : IAM 역할은 AD 그룹에 매핑되어 역할 기반 접근 제어(RBAC)를 구현합니다. AD 자격 증명으로 인증 후 IAM 역할을 통해 AWS 리소스에 접근합니다.

**(E)** : IAM 사용자 생성은 identity federation 정책에 위배됩니다.

**핵심 개념:** Active Directory 연동, AD Connector, IAM 역할 기반 접근 제어

---

### Q277. Your startup wants to implement an order fulfillment process for selling a personalized gadget that needs an average of 3-4 days to produce with some orders taking up to 6 months. You expect 10 orders per day on your first day, 1000 orders per day after 6 months and 10,000 orders after 12 months. Orders coming in are checked for consistency, then dispatched to your manufacturing plant for production, quality control, packaging, shipment and payment processing. If the product does not meet the quality standards at any stage of the process, employees may force the process to repeat a step. Customers are notified via email about order status and any critical issues with their orders such as payment failure. Your base architecture includes AWS Elastic Beanstalk for your website with an RDS MySQL instance for customer data and orders. How can you implement the order fulfillment process while making sure that the emails are delivered reliably?

**Options:**
- A) Add a business process management application to your Elastic Beanstalk app servers and re-use the RDS database for tracking order status. Use one of the Elastic Beanstalk instances to send emails to customers.
- B) Use SWF with an Auto Scaling group of activity workers and a decider instance in another Auto Scaling group with min/max=1. Use the decider instance to send emails to customers.
- C) Use SWF with an Auto Scaling group of activity workers and a decider instance in another Auto Scaling group with min/max=1. Use SES to send emails to customers.
- D) Use an SQS queue to manage all process tasks. Use an Auto Scaling group of EC2 Instances that poll the tasks and execute them. Use SES to send emails to customers.

**Answer:** C

**해설:**

> **문제:** 최대 6개월 걸리는 복잡한 주문 처리 프로세스를 구현하고 이메일을 안정적으로 전송하는 방법은?

| 선지 | 번역 |
|------|------|
| A | BPM 앱 + RDS + Elastic Beanstalk로 이메일 전송. |
| B | SWF + Activity Workers Auto Scaling + Decider(min/max=1) + Decider로 이메일 전송. |
| C | SWF + Activity Workers Auto Scaling + Decider(min/max=1) + SES로 이메일 전송. |
| D | SQS + EC2 Auto Scaling + SES. |

**(A)** : 6개월 이상의 장기 워크플로우를 RDS와 앱 서버만으로 관리하기 어렵습니다.

**(B)** : SWF는 장기 워크플로우에 적합하지만 Decider 인스턴스로 이메일을 보내면 단일 장애점이 됩니다.

**(C) 정답** : SWF는 최대 1년의 장기 워크플로우를 관리할 수 있고 단계 반복도 지원합니다. Decider는 min/max=1로 하나의 인스턴스만 결정을 내리고, SES는 안정적인 이메일 전송을 보장합니다.

**(D)** : SQS는 장기 워크플로우 상태 관리가 어렵습니다.

**핵심 개념:** Amazon SWF 장기 워크플로우, Amazon SES 이메일

---

### Q278. A, [...] is an individual, system, or application that interacts with AWS programmatically.

**Options:**
- A) user.
- B) AWS Account.
- C) group.
- D) role.

**Answer:** A

**해설:**

> **문제:** AWS와 프로그래밍 방식으로 상호 작용하는 개인, 시스템 또는 애플리케이션을 무엇이라고 하나요?

| 선지 | 번역 |
|------|------|
| A | 사용자(user). |
| B | AWS 계정. |
| C | 그룹. |
| D | 역할. |

**(A) 정답** : IAM 사용자(User)는 AWS와 프로그래밍 방식으로(API, CLI, SDK) 또는 콘솔을 통해 상호 작용하는 개인, 시스템, 또는 애플리케이션을 나타냅니다.

**(B)** : AWS 계정은 모든 AWS 리소스와 서비스를 담는 컨테이너입니다.

**(C)** : 그룹은 여러 사용자를 묶는 컨테이너입니다.

**(D)** : 역할은 임시 권한을 부여하는 데 사용됩니다.

**핵심 개념:** IAM 사용자(User) 정의

---

### Q279. A user is accessing an EC2 instance on the SSH port for IP 10.20.30.40. Which one is a secure way to configure that the instance can be accessed only from this IP?

**Options:**
- A) In the security group, open port 22 for IP 10.20.30.40.
- B) In the security group, open port 22 for IP 10.20.30.40/32.
- C) In the security group, open port 22 for IP 10.20.30.40/24.
- D) In the security group, open port 22 for IP 10.20.30.40/0.

**Answer:** B

**해설:**

> **문제:** IP 10.20.30.40에서만 SSH 접근을 허용하는 가장 안전한 보안 그룹 설정은?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹에서 IP 10.20.30.40에 대해 포트 22 개방. |
| B | 보안 그룹에서 IP 10.20.30.40/32에 대해 포트 22 개방. |
| C | 보안 그룹에서 IP 10.20.30.40/24에 대해 포트 22 개방. |
| D | 보안 그룹에서 IP 10.20.30.40/0에 대해 포트 22 개방. |

**(A)** : CIDR 표기 없이는 올바른 형식이 아닙니다.

**(B) 정답** : /32는 단일 IP 주소를 나타내는 CIDR 표기법입니다. 10.20.30.40/32는 정확히 이 IP만 허용합니다.

**(C)** : /24는 10.20.30.0~10.20.30.255 범위(256개 IP)를 의미하므로 너무 광범위합니다.

**(D)** : /0은 모든 IP 주소를 의미하므로 보안상 안전하지 않습니다.

**핵심 개념:** CIDR /32 (단일 IP), 보안 그룹 최소 권한

---

### Q280. Read Replicas require a transactional storage engine and are only supported for the [...] storage engine.

**Options:**
- A) OracleISAM.
- B) MSSQLDB.
- C) InnoDB.
- D) MyISAM.

**Answer:** C

**해설:**

> **문제:** Read Replica는 트랜잭션 스토리지 엔진이 필요하며 어떤 스토리지 엔진만 지원하나요?

| 선지 | 번역 |
|------|------|
| A | OracleISAM. |
| B | MSSQLDB. |
| C | InnoDB. |
| D | MyISAM. |

**(A)** : OracleISAM은 존재하지 않는 엔진입니다.

**(B)** : MSSQLDB는 MySQL 스토리지 엔진이 아닙니다.

**(C) 정답** : RDS MySQL의 Read Replica는 트랜잭션을 지원하는 InnoDB 스토리지 엔진에서만 지원됩니다. InnoDB는 바이너리 로그 기반 복제를 지원합니다.

**(D)** : MyISAM은 트랜잭션을 지원하지 않아 Read Replica에 사용할 수 없습니다.

**핵심 개념:** MySQL Read Replica, InnoDB 스토리지 엔진

---

### Q281. What is Amazon Glacier?

**Options:**
- A) You mean Amazon 'Iceberg': it's a low-cost storage service.
- B) A security tool that allows to 'freeze' an EBS volume and perform computer forensics on it.
- C) A low-cost storage service that provides secure and durable storage for data archiving and backup.
- D) It's a security tool that allows to 'freeze' an EC2 instance and perform computer forensics on it.

**Answer:** C

**해설:**

> **문제:** Amazon Glacier란 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | Amazon 'Iceberg': 저비용 스토리지 서비스입니다. |
| B | EBS 볼륨을 '동결'하고 포렌식을 수행하는 보안 도구. |
| C | 데이터 아카이빙 및 백업을 위한 안전하고 내구성 있는 저비용 스토리지 서비스. |
| D | EC2 인스턴스를 '동결'하고 포렌식을 수행하는 보안 도구. |

**(A)** : Amazon Iceberg라는 서비스는 없습니다.

**(B), (D)** : Glacier는 포렌식 도구가 아닙니다.

**(C) 정답** : Amazon Glacier(현재 Amazon S3 Glacier)는 데이터 아카이빙과 장기 백업을 위한 매우 저렴하고 안전하며 내구성 있는 스토리지 서비스입니다.

**핵심 개념:** Amazon Glacier (S3 Glacier) — 아카이브 스토리지

---

### Q282. You have a content management system running on an Amazon EC2 instance that is approaching 100% CPU utilization. Which option will reduce load on the Amazon EC2 instance?

**Options:**
- A) Create a load balancer, and register the Amazon EC2 instance with it.
- B) Create a CloudFront distribution, and configure the Amazon EC2 instance as the origin.
- C) Create an Auto Scaling group from the instance using the Create AutoScaling Group action.
- D) Create a launch configuration from the instance using the Create launch Configuration action.

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스가 100% CPU에 근접한 CMS의 부하를 줄이는 방법은?

| 선지 | 번역 |
|------|------|
| A | 로드 밸런서를 생성하고 EC2 인스턴스를 등록한다. |
| B | CloudFront 배포를 생성하고 EC2 인스턴스를 오리진으로 설정한다. |
| C | 인스턴스에서 Auto Scaling 그룹을 생성한다. |
| D | 인스턴스에서 시작 구성(launch configuration)을 생성한다. |

**(A)** : 로드 밸런서는 부하를 여러 인스턴스로 분산하지만, 인스턴스가 하나뿐이면 부하를 줄이지 못합니다.

**(B) 정답** : CloudFront는 정적 콘텐츠를 엣지에서 캐싱하여 EC2 인스턴스에 직접 전달되는 요청을 크게 줄여 CPU 부하를 낮춥니다.

**(C)** : Auto Scaling 그룹 생성 자체는 즉시 인스턴스 부하를 줄이지 않습니다. 추가 인스턴스가 필요합니다.

**(D)** : 시작 구성 생성은 부하를 줄이지 않습니다.

**핵심 개념:** CloudFront 캐싱으로 EC2 부하 감소

---

### Q283. Can I initiate a 'forced failover' for my MySQL Multi-AZ DB Instance deployment?

**Options:**
- A) Only in certain regions.
- B) Only in VPC.
- C) Yes.
- D) No.

**Answer:** C

**해설:**

> **문제:** MySQL Multi-AZ DB 인스턴스에서 '강제 장애 조치'를 시작할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | 특정 리전에서만. |
| B | VPC에서만. |
| C | 예. |
| D | 아니요. |

**(A)** : 리전 제한 없이 가능합니다.

**(B)** : VPC에만 국한되지 않습니다.

**(C) 정답** : RDS 콘솔이나 API를 통해 Multi-AZ DB 인스턴스에서 강제 장애 조치(Reboot with failover)를 시작할 수 있습니다. 이는 테스트 목적이나 유지보수 시 유용합니다.

**(D)** : 가능합니다.

**핵심 개념:** RDS Multi-AZ 강제 장애 조치

---

### Q284. When controlling access to Amazon EC2 resources, each Amazon EBS Snapshot has a [...] attribute that controls which AWS accounts can use the snapshot.

**Options:**
- A) createVolumePermission.
- B) LaunchPermission.
- C) SharePermission.
- D) RequestPermission.

**Answer:** A

**해설:**

> **문제:** Amazon EBS 스냅샷에서 어떤 AWS 계정이 스냅샷을 사용할 수 있는지 제어하는 속성은?

| 선지 | 번역 |
|------|------|
| A | createVolumePermission. |
| B | LaunchPermission. |
| C | SharePermission. |
| D | RequestPermission. |

**(A) 정답** : EBS 스냅샷의 `createVolumePermission` 속성은 스냅샷에서 볼륨을 생성할 수 있는 AWS 계정을 제어합니다. 이를 통해 스냅샷을 다른 계정과 공유할 수 있습니다.

**(B)** : LaunchPermission은 AMI에 사용되는 속성입니다.

**(C), (D)** : 실제로 존재하지 않는 속성 이름입니다.

**핵심 개념:** EBS 스냅샷 createVolumePermission, 스냅샷 공유

---

### Q285. You have decided to change the instance type for instances running in your application tier that is using Auto Scaling. In which area below would you change the instance type definition?

**Options:**
- A) Auto Scaling policy.
- B) Auto Scaling group.
- C) Auto Scaling tags.
- D) Auto Scaling launch configuration.

**Answer:** D

**해설:**

> **문제:** Auto Scaling을 사용하는 애플리케이션 계층의 인스턴스 유형을 변경하려면 어디서 변경해야 하나요?

| 선지 | 번역 |
|------|------|
| A | Auto Scaling 정책. |
| B | Auto Scaling 그룹. |
| C | Auto Scaling 태그. |
| D | Auto Scaling 시작 구성(launch configuration). |

**(A)** : Auto Scaling 정책은 스케일링 조건을 정의합니다.

**(B)** : Auto Scaling 그룹은 최소/최대 인스턴스 수 등을 정의합니다.

**(C)** : 태그는 리소스를 분류하는 데 사용됩니다.

**(D) 정답** : 인스턴스 유형, AMI, 보안 그룹 등은 시작 구성(Launch Configuration) 또는 시작 템플릿(Launch Template)에서 정의됩니다. 인스턴스 유형 변경 시 새 시작 구성을 만들어 Auto Scaling 그룹에 연결합니다.

**핵심 개념:** Auto Scaling Launch Configuration, 인스턴스 유형 변경

---

### Q286. Which of the following statements is true of creating a launch configuration using an EC2 instance?

**Options:**
- A) The launch configuration can be created only using the Query APIs.
- B) Auto Scaling automatically creates a launch configuration directly from an EC2 instance.
- C) A user should manually create a launch configuration before creating an Auto Scaling group.
- D) The launch configuration should be created manually from the AWS CLI.

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스를 사용하여 시작 구성을 생성하는 것에 대한 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 시작 구성은 Query API로만 생성할 수 있다. |
| B | Auto Scaling이 EC2 인스턴스에서 직접 시작 구성을 자동으로 생성한다. |
| C | Auto Scaling 그룹 생성 전에 사용자가 수동으로 시작 구성을 만들어야 한다. |
| D | 시작 구성은 AWS CLI에서 수동으로 생성해야 한다. |

**(A)** : Query API뿐만 아니라 콘솔, CLI에서도 생성 가능합니다.

**(B) 정답** : AWS 콘솔에서 EC2 인스턴스를 선택하고 "Create Auto Scaling Group" 작업을 사용하면 Auto Scaling이 해당 인스턴스 설정을 기반으로 시작 구성을 자동으로 생성합니다.

**(C)** : 수동 생성이 반드시 필요하지 않습니다. 인스턴스에서 자동 생성이 가능합니다.

**(D)** : CLI에서만 생성해야 하는 것은 아닙니다.

**핵심 개념:** Auto Scaling Launch Configuration 자동 생성

---

### Q287. Your company has multiple IT departments, each with their own VPC. Some VPCs are located within the same AWS account, and others in a different AWS account. You want to peer together all VPCs to enable the IT departments to have full access to each others' resources. There are certain limitations placed on VPC peering. Which of the following statements is incorrect in relation to VPC peering?

**Options:**
- A) Private DNS values cannot be resolved between instances in peered VPCs.
- B) You can have up to 3 VPC peering connections between the same two VPCs at the same time.
- C) You cannot create a VPC peering connection between VPCs in different regions.
- D) You have a limit on the number active and pending VPC peering connections that you can have per VPC.

**Answer:** B

**해설:**

> **문제:** VPC 피어링에 대한 잘못된 설명은?

| 선지 | 번역 |
|------|------|
| A | 피어링된 VPC 간에 프라이빗 DNS 값을 확인할 수 없다. |
| B | 같은 두 VPC 사이에 동시에 최대 3개의 VPC 피어링 연결을 가질 수 있다. |
| C | 서로 다른 리전의 VPC 간에 피어링 연결을 생성할 수 없다. |
| D | VPC당 활성 및 대기 중인 VPC 피어링 연결 수에 제한이 있다. |

**(A)** : 기본적으로 피어링된 VPC 간 DNS 확인은 활성화해야 하며, 구성에 따라 가능합니다.

**(B) 정답(잘못된 설명)** : 같은 두 VPC 사이에는 하나의 피어링 연결만 가질 수 있습니다. 3개 동시 연결은 불가합니다.

**(C)** : 이 문제가 작성될 당시 크로스 리전 VPC 피어링은 지원되지 않았습니다. (현재는 지원됨)

**(D)** : VPC당 피어링 연결 수 제한은 실제로 존재합니다.

**핵심 개념:** VPC 피어링 제한, 동일 VPC 쌍 간 단일 연결

---

### Q288. A gaming company comes to you and asks you to build them infrastructure for their site. They are not sure how big they will be as with all start ups they have limited money and big ideas. What they do tell you is that if the game becomes successful, like one of their previous games, it may rapidly grow to millions of users and generate tens (or even hundreds) of thousands of writes and reads per second. After considering all of this, you decide that they need a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. Which of the following databases do you think would best fit their needs?

**Options:**
- A) Amazon DynamoDB.
- B) Amazon Redshift.
- C) Any non-relational database.
- D) Amazon SimpleDB.

**Answer:** A

**해설:**

> **문제:** 수백만 사용자와 초당 수십만 건의 읽기/쓰기를 처리할 수 있는 완전 관리형 NoSQL DB는?

| 선지 | 번역 |
|------|------|
| A | Amazon DynamoDB. |
| B | Amazon Redshift. |
| C | 모든 비관계형 데이터베이스. |
| D | Amazon SimpleDB. |

**(A) 정답** : Amazon DynamoDB는 완전 관리형 NoSQL 데이터베이스로, 빠르고 예측 가능한 성능과 원활한 확장성을 제공합니다. 초당 수백만 건의 요청도 처리할 수 있습니다.

**(B)** : Amazon Redshift는 데이터 웨어하우스 서비스로 OLAP에 최적화되어 있습니다.

**(C)** : 특정 AWS 관리형 서비스를 권장해야 합니다.

**(D)** : Amazon SimpleDB는 DynamoDB에 비해 확장성과 성능이 제한적입니다.

**핵심 개념:** Amazon DynamoDB, NoSQL, 고속 확장

---

### Q289. A/An [...] acts as a firewall that controls the traffic allowed to reach one or more instances.

**Options:**
- A) security group.
- B) ACL.
- C) IAM.
- D) private IP Addresses.

**Answer:** A

**해설:**

> **문제:** 하나 이상의 인스턴스에 도달할 수 있는 트래픽을 제어하는 방화벽 역할을 하는 것은?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹. |
| B | ACL. |
| C | IAM. |
| D | 프라이빗 IP 주소. |

**(A) 정답** : 보안 그룹은 EC2 인스턴스 수준의 가상 방화벽으로 인바운드/아웃바운드 트래픽을 제어합니다.

**(B)** : ACL(네트워크 ACL)은 서브넷 수준의 방화벽입니다.

**(C)** : IAM은 AWS API 접근 제어 서비스입니다.

**(D)** : 프라이빗 IP는 인스턴스 주소이며 방화벽 기능이 없습니다.

**핵심 개념:** 보안 그룹 (인스턴스 수준 방화벽)

---

### Q290. Your manager has just given you access to multiple VPN connections that someone else has recently set up between all your company's offices. She needs you to make sure that the communication between the VPNs is secure. Which of the following services would be best for providing a low-cost hub-and-spoke model for primary or backup connectivity between these remote offices?

**Options:**
- A) Amazon CloudFront.
- B) AWS Direct Connect.
- C) AWS CloudHSM.
- D) AWS VPN CloudHub.

**Answer:** D

**해설:**

> **문제:** 원격 오피스 간 허브 앤 스포크 모델의 저비용 기본/백업 연결을 제공하는 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon CloudFront. |
| B | AWS Direct Connect. |
| C | AWS CloudHSM. |
| D | AWS VPN CloudHub. |

**(A)** : CloudFront는 CDN 서비스로 오피스 간 VPN 연결에 적합하지 않습니다.

**(B)** : Direct Connect는 전용 네트워크 연결로 비용이 높습니다.

**(C)** : CloudHSM은 하드웨어 보안 모듈 서비스입니다.

**(D) 정답** : AWS VPN CloudHub는 Virtual Private Gateway를 허브로 사용하여 여러 원격 오피스(스포크)를 연결하는 허브 앤 스포크 모델을 저비용으로 구현합니다. 기존 VPN 연결을 활용합니다.

**핵심 개념:** AWS VPN CloudHub, 허브 앤 스포크 VPN

---

### Q291. You need to create a management network using network interfaces for a virtual private cloud (VPC) network. Which of the following statements is incorrect pertaining to Best Practices for Configuring Network Interfaces.

**Options:**
- A) You can detach secondary (ethN) network interfaces when the instance is running or stopped. However, you can't detach the primary (eth0) interface.
- B) Launching an instance with multiple network interfaces automatically configures interfaces, private IP addresses, and route tables on the operating system of the instance.
- C) You can attach a network interface in one subnet to an instance in another subnet in the same VPC, however, both the network interface and the instance must reside in the same Availability Zone.
- D) Attaching another network interface to an instance is a valid method to increase or double the network bandwidth to or from the dual-homed instance.

**Answer:** D

**해설:**

> **문제:** VPC 네트워크 인터페이스 구성 모범 사례에서 잘못된 설명은?

| 선지 | 번역 |
|------|------|
| A | 보조(ethN) 네트워크 인터페이스는 인스턴스 실행 중 또는 중지 시 분리 가능하지만 기본(eth0)은 분리 불가. |
| B | 여러 네트워크 인터페이스로 인스턴스를 시작하면 OS에서 인터페이스, 프라이빗 IP, 라우팅 테이블이 자동 구성된다. |
| C | 동일 VPC 내 다른 서브넷의 네트워크 인터페이스를 인스턴스에 연결 가능하지만, 둘 다 같은 AZ에 있어야 한다. |
| D | 다른 네트워크 인터페이스를 연결하면 듀얼 홈 인스턴스의 네트워크 대역폭을 늘리거나 두 배로 늘릴 수 있다. |

**(A)** : 올바른 설명입니다.

**(B)** : 올바른 설명입니다.

**(C)** : 올바른 설명입니다.

**(D) 정답(잘못된 설명)** : 네트워크 인터페이스를 추가로 연결한다고 해서 네트워크 대역폭이 증가하거나 두 배가 되지 않습니다. 대역폭은 인스턴스 유형에 따라 결정됩니다.

**핵심 개념:** ENI(Elastic Network Interface) 모범 사례, 네트워크 대역폭

---

### Q292. A user has launched 10 EC2 instances inside a placement group. Which of the following statements is true in regards to what ability launching your instances into a VPC instead of EC2-Classic gives you?

**Options:**
- A) All of the things listed here.
- B) Change security group membership for your instances while they're running.
- C) Assign static private IP addresses to your instances that persist across starts and stops.
- D) Define network interfaces, and attach one or more network interfaces to your instances.

**Answer:** A

**해설:**

> **문제:** EC2-Classic 대신 VPC에 인스턴스를 시작하면 얻을 수 있는 기능은?

| 선지 | 번역 |
|------|------|
| A | 여기 나열된 모든 것. |
| B | 실행 중인 인스턴스의 보안 그룹 멤버십 변경. |
| C | 시작/중지 시에도 유지되는 정적 프라이빗 IP 주소 할당. |
| D | 네트워크 인터페이스 정의 및 하나 이상의 네트워크 인터페이스 연결. |

**(A) 정답** : VPC는 B, C, D 모든 기능을 제공합니다. EC2-Classic에서는 이러한 기능이 제한됩니다.

**(B)** : VPC의 기능이지만 A가 더 포괄적입니다.

**(C)** : VPC의 기능이지만 A가 더 포괄적입니다.

**(D)** : VPC의 기능이지만 A가 더 포괄적입니다.

**핵심 개념:** VPC vs EC2-Classic 기능 차이

---

### Q293. In the HQ region you run an hourly batch process reading data from every region to compute cross regional reports that are sent by email to all offices this batch process must be completed as fast as possible to quickly optimize logistics how do you build the database architecture in order to meet the requirements?

**Options:**
- A) For each regional deployment, use RDS MySQL with a master in the region and a read replica in the HQ region.
- B) For each regional deployment, use MySQL on EC2 with a master in the region and send hourly EBS snapshots to the HQ region.
- C) For each regional deployment, use RDS MySQL with a master in the region and send hourly RDS snapshots to the HQ region.
- D) For each regional deployment, use MySQL on EC2 with a master in the region and use S3 to copy data files hourly to the HQ region.
- E) Use Direct Connect to connect all regional MySQL deployments to the HQ region and reduce network latency for the batch process.

**Answer:** A

**해설:**

> **문제:** 각 리전의 데이터를 HQ 리전에서 빠르게 처리하는 크로스 리전 보고를 위한 DB 아키텍처는?

| 선지 | 번역 |
|------|------|
| A | 각 리전에 RDS MySQL 마스터 + HQ 리전에 읽기 전용 복제본. |
| B | 각 리전에 EC2 MySQL 마스터 + 매시간 EBS 스냅샷을 HQ로 전송. |
| C | 각 리전에 RDS MySQL + 매시간 RDS 스냅샷을 HQ로 전송. |
| D | 각 리전에 EC2 MySQL + S3로 매시간 데이터 파일 복사. |
| E | Direct Connect로 모든 리전 MySQL을 HQ에 연결. |

**(A) 정답** : 각 리전의 RDS MySQL 마스터에서 HQ 리전의 Read Replica로 실시간 복제하면, 배치 프로세스가 HQ의 Read Replica에서 직접 읽어 최신 데이터를 빠르게 처리할 수 있습니다.

**(B), (C), (D)** : 매시간 스냅샷이나 파일 복사는 지연이 있어 배치 처리 속도를 최적화하기 어렵습니다.

**(E)** : Direct Connect는 비용이 높고 설정이 복잡합니다.

**핵심 개념:** RDS 크로스 리전 Read Replica, 데이터 복제

---

### Q294. What is the average IOPS that the user will get for most of the year as per EC2 SLA if the instance is attached to the EBS optimized instance?

**Options:**
- A) 950.
- B) 990.
- C) 1000.
- D) 900.

**Answer:** D

**해설:**

> **문제:** EBS 최적화 인스턴스에 연결된 경우 EC2 SLA에 따라 연중 대부분 얻을 수 있는 평균 IOPS는?

| 선지 | 번역 |
|------|------|
| A | 950. |
| B | 990. |
| C | 1000. |
| D | 900. |

**(A), (B), (C)** : AWS SLA 기준치가 아닙니다.

**(D) 정답** : AWS EC2 SLA에 따르면 EBS 최적화 인스턴스에서 연간 대부분의 시간 동안 프로비저닝된 IOPS의 90% 이상(평균 약 900 IOPS, 1000 IOPS 프로비저닝 기준)을 보장합니다.

**핵심 개념:** EBS Provisioned IOPS SLA, 90% 성능 보장

---

### Q295. You are working with a customer who has 10 TB of archival data that they want to migrate to Amazon Glacier. The customer has a 1-Mbps connection to the Internet. Which service or feature provides the fastest method of getting the data into Amazon Glacier?

**Options:**
- A) Amazon Glacier multipart upload.
- B) AWS Storage Gateway.
- C) VM Import/Export.
- D) AWS Import/Export.

**Answer:** A

**해설:**

> **문제:** 1Mbps 인터넷 연결로 10TB의 데이터를 Amazon Glacier로 가장 빠르게 마이그레이션하는 방법은?

| 선지 | 번역 |
|------|------|
| A | Amazon Glacier 멀티파트 업로드. |
| B | AWS Storage Gateway. |
| C | VM Import/Export. |
| D | AWS Import/Export. |

**(A) 정답** : 1Mbps로 10TB를 전송하면 약 22.2일이 걸립니다. AWS Import/Export(물리적 장치)가 더 빠를 수 있지만, 이 선택지에서 Glacier 멀티파트 업로드가 인터넷을 통해 대용량 데이터를 효율적으로 업로드하는 가장 적합한 방법입니다. (주의: 실제로는 Import/Export가 더 빠르지만, 정답으로 A가 제시됨)

**(B)** : Storage Gateway는 지속적인 데이터 동기화에 적합하지만 초기 마이그레이션 속도에서 특별한 이점이 없습니다.

**(C)** : VM Import/Export는 가상 머신 마이그레이션용입니다.

**(D)** : AWS Import/Export는 물리적 디바이스를 사용하지만 이 문제의 정답은 A입니다.

**핵심 개념:** Amazon Glacier 멀티파트 업로드

---

### Q296. Your manager has asked you to set up a public subnet with instances that can send and receive internet traffic, and a private subnet that can't receive traffic directly from the internet, but can initiate traffic to the internet (and receive responses) through a NAT instance in the public subnet. Hence, the following 3 rules need to be allowed: Inbound SSH traffic. Web servers in the public subnet to read and write to MS SQL servers in the private subnet. Inbound RDP traffic from the Microsoft Terminal Services gateway in the public private subnet. What are the respective ports that need to be opened for this?

**Options:**
- A) Ports 22, 1433, 3389.
- B) Ports 21, 1433, 3389.
- C) Ports 25, 1433, 3389.
- D) Ports 22, 1343, 3999.

**Answer:** A

**해설:**

> **문제:** SSH 인바운드, MS SQL 읽기/쓰기, RDP 인바운드를 위해 열어야 하는 포트는?

| 선지 | 번역 |
|------|------|
| A | 포트 22, 1433, 3389. |
| B | 포트 21, 1433, 3389. |
| C | 포트 25, 1433, 3389. |
| D | 포트 22, 1343, 3999. |

**(A) 정답** :
- SSH: TCP 포트 22
- MS SQL Server: TCP 포트 1433
- RDP: TCP 포트 3389

**(B)** : 포트 21은 FTP입니다.

**(C)** : 포트 25는 SMTP(이메일)입니다.

**(D)** : 1343과 3999는 MS SQL과 RDP의 올바른 포트가 아닙니다.

**핵심 개념:** 주요 포트 번호 (SSH:22, MS SQL:1433, RDP:3389)

---

### Q297. An EC2 instance is connected to an ENI (Elastic Network Interface) in one subnet. What happens to the data on an instance if the instance reboots (intentionally or unintentionally)?

**Options:**
- A) Data will be lost.
- B) Data persists.

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스가 재부팅되면 인스턴스의 데이터에 어떤 일이 발생하나요?

| 선지 | 번역 |
|------|------|
| A | 데이터가 손실된다. |
| B | 데이터가 유지된다. |

**(A)** : 재부팅 시 데이터가 손실되지 않습니다.

**(B) 정답** : EC2 인스턴스가 재부팅될 때 EBS 볼륨의 데이터는 유지됩니다. 인스턴스 스토어(임시 스토리지) 데이터는 중지/종료 시 손실되지만, 재부팅 시에는 유지됩니다.

**핵심 개념:** EC2 재부팅 시 데이터 지속성, EBS vs 인스턴스 스토어

---

### Q298. Please select the Amazon EC2 resource which can be tagged.

**Options:**
- A) Key pairs.
- B) Elastic IP addresses.
- C) Placement groups.
- D) Amazon EBS snapshots.

**Answer:** C

**해설:**

> **문제:** 태그를 붙일 수 있는 Amazon EC2 리소스는?

| 선지 | 번역 |
|------|------|
| A | 키 페어. |
| B | Elastic IP 주소. |
| C | 플레이스먼트 그룹. |
| D | Amazon EBS 스냅샷. |

**(A)** : 키 페어는 태그를 지원하지 않습니다.

**(B)** : Elastic IP도 태그를 지원합니다. (현재는 지원하지만 이 문제 작성 당시 기준으로 C가 정답)

**(C) 정답** : 이 문제의 정답은 플레이스먼트 그룹입니다.

**(D)** : EBS 스냅샷도 태그를 지원합니다. (현재는 지원)

**핵심 개념:** EC2 리소스 태깅 지원

---

### Q299. Without [...] you must either create multiple AWS accounts-each with its own billing and subscriptions to AWS products-or your employees must share the security credentials of a single AWS account.

**Options:**
- A) Amazon RDS.
- B) Amazon Glacier.
- C) Amazon EMR.
- D) Amazon IAM.

**Answer:** D

**해설:**

> **문제:** 이것 없이는 여러 AWS 계정을 만들거나 직원들이 단일 계정의 자격 증명을 공유해야 합니다. 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | Amazon RDS. |
| B | Amazon Glacier. |
| C | Amazon EMR. |
| D | Amazon IAM. |

**(A), (B), (C)** : 사용자 및 권한 관리와 관련 없습니다.

**(D) 정답** : AWS IAM이 없으면 AWS 계정을 여러 개 만들거나 하나의 루트 계정 자격 증명을 공유해야 합니다. IAM을 통해 단일 계정 내에서 여러 사용자, 그룹, 역할을 관리할 수 있습니다.

**핵심 개념:** AWS IAM의 필요성, 사용자/권한 관리

---

### Q300. An EC2 instance is connected to an ENI (Elastic Network Interface) in one subnet. What happens when you attach an ENI of a different subnet to this EC2 instance?

**Options:**
- A) The EC2 instance follows the rules of the older subnet.
- B) The EC2 instance follows the rules of both the subnets.
- C) Not possible, cannot be connected to 2 ENIs.
- D) The EC2 instance follows the rules of the newer subnet.

**Answer:** B

**해설:**

> **문제:** 서로 다른 서브넷의 ENI를 EC2 인스턴스에 연결하면 어떻게 되나요?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스는 기존 서브넷의 규칙을 따른다. |
| B | EC2 인스턴스는 두 서브넷의 규칙을 모두 따른다. |
| C | 불가능. 2개의 ENI에 연결할 수 없다. |
| D | EC2 인스턴스는 새 서브넷의 규칙을 따른다. |

**(A)** : 기존 서브넷의 규칙만 따르는 것이 아닙니다.

**(B) 정답** : EC2 인스턴스에 두 개의 ENI를 연결하면 각 ENI는 자신의 서브넷 규칙(보안 그룹, 네트워크 ACL)을 따릅니다. 따라서 인스턴스는 두 서브넷의 규칙을 모두 적용받습니다.

**(C)** : 여러 ENI를 연결하는 것이 가능합니다.

**(D)** : 새 서브넷의 규칙만 따르는 것이 아닙니다.

**핵심 개념:** ENI 다중 연결, 서브넷 규칙 적용

---

