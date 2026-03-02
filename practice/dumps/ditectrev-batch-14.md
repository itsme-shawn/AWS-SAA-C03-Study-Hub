# Ditectrev SAA-C03 Practice Questions — Batch 14 (Q651-Q700)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---


### Q651. A company plans to run a high performance computing (HPC) workload on Amazon EC2 Instances. The workload requires low-latency network performance and high network throughput with tightly coupled node-to-node communication. Which solution will meet these requirements?

**Options:**
- A) Configure the EC2 instances to be part of a cluster placement group.
- B) Launch the EC2 instances with Dedicated Instance tenancy.
- C) Launch the EC2 instances as Spot Instances.
- D) Configure an On-Demand Capacity Reservation when the EC2 instances are launched.

**Answer:** A

**해설:**

> **문제:** HPC 워크로드에 낮은 레이턴시, 높은 처리량, 노드 간 긴밀한 통신이 필요합니다. 어떤 솔루션이 적합한가?

| 선지 | 번역 |
|------|------|
| A | 클러스터 배치 그룹(Cluster Placement Group) 구성 |
| B | 전용 인스턴스 테넌시로 시작 |
| C | 스팟 인스턴스로 시작 |
| D | 온디맨드 용량 예약 구성 |

**(A) 정답** : **클러스터 배치 그룹**은 인스턴스를 동일 AZ 내 물리적으로 가까운 위치에 배치하여 최저 레이턴시와 최고 처리량을 제공합니다. HPC 워크로드에 최적입니다. → [📖 클러스터 배치 그룹 — 최저 레이턴시/최고 처리량](/section/04-ec2-associate#placement-groups-배치-그룹)

**(B)** : 오답. 전용 인스턴스는 물리적 격리를 위한 것이며 네트워크 성능을 보장하지 않습니다.

**(C)** : 오답. 스팟 인스턴스는 비용 절감용이며 HPC 네트워크 성능과 무관합니다. → [📖 스팟 인스턴스 — 비용 절감용](/section/03-ec2-basics#spot-instance-상세)

**(D)** : 오답. 용량 예약은 가용성 보장이지 네트워크 성능 향상이 아닙니다.

**핵심 개념:** Cluster Placement Group, HPC, 저지연 고처리량 네트워크

**관련 노트:** [Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹), [High Performance Computing HPC](/section/27-more-solutions-architecture#high-performance-computing-hpc)

---

### Q652. A company has primary and secondary data centers that are 500 miles (804.7 km) apart and interconnected with high-speed fiber-optic cable. The company needs a highly available and secure network connection between its data centers and a VPC on AWS for a mission-critical workload. A solutions architect must choose a connection solution that provides maximum resiliency. Which solution meets these requirements?

**Options:**
- A) Two AWS Direct Connect connections from the primary data center terminating at two Direct Connect locations on two separate devices.
- B) A single AWS Direct Connect connection from each of the primary and secondary data centers terminating at one Direct Connect location on the same device.
- C) Two AWS Direct Connect connections from each of the primary and secondary data centers terminating at two Direct Connect locations on two separate devices.
- D) A single AWS Direct Connect connection from each of the primary and secondary data centers terminating at one Direct Connect location on two separate devices.

**Answer:** C

**해설:**

> **문제:** 500마일 떨어진 두 데이터 센터가 있습니다. AWS VPC와 최대 복원력(Maximum Resiliency)을 가진 연결이 필요합니다. 어떤 솔루션이 적합한가?

| 선지 | 번역 |
|------|------|
| A | 기본 DC에서 2개 Direct Connect, 2개 DX 위치, 2개 별도 장치 |
| B | 각 DC에서 1개씩 Direct Connect, 동일 DX 위치, 동일 장치 |
| C | 각 DC에서 2개씩 Direct Connect, 2개 DX 위치, 2개 별도 장치 |
| D | 각 DC에서 1개씩 Direct Connect, 동일 DX 위치, 2개 별도 장치 |

**(A)** : 오답. 기본 DC만 사용하고 보조 DC가 없어 단일 장애점이 있습니다.

**(B)** : 오답. 동일 DX 위치와 동일 장치는 단일 장애점입니다.

**(C) 정답** : **최대 복원력**을 위해 AWS는 두 데이터 센터 각각에서 2개의 Direct Connect 연결을 2개의 다른 DX 위치에 있는 별도 장치로 연결하도록 권장합니다. 이렇게 하면 단일 위치, 단일 장치, 단일 DC 장애에도 연결이 유지됩니다. → [📖 Direct Connect 최대 복원력 구성](/section/25-vpc#direct-connect-dx)

**(D)** : 오답. 각 DC에서 1개씩만 연결하면 충분한 이중화가 안 됩니다.

**핵심 개념:** Direct Connect 최대 복원력 설계 — 다중 DX 위치, 다중 장치, 다중 데이터 센터

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [Transit Gateway](/section/25-vpc#transit-gateway)

---

### Q653. A company runs several Amazon RDS for Oracle On-Demand DB instances that have high utilization. The RDS DB instances run in member accounts that are in an organization in AWS Organizations. The company's finance team has access to the organization's management account and member accounts. The finance team wants to find ways to optimize costs by using AWS Trusted Advisor. Which combination of steps will meet these requirements? (Choose two.)

**Options:**
- A) Use the Trusted Advisor recommendations in the management account.
- B) Use the Trusted Advisor recommendations in the member accounts where the RDS DB instances are running.
- C) Review the Trusted Advisor checks for Amazon RDS Reserved Instance Optimization.
- D) Review the Trusted Advisor checks for Amazon RDS Idle DB Instances.
- E) Review the Trusted Advisor checks for compute optimization. Crosscheck the results by using AWS Compute Optimizer.

**Answer:** A, C

**해설:**

> **문제:** AWS Organizations의 멤버 계정에서 높은 사용률의 RDS for Oracle 인스턴스를 운영합니다. Trusted Advisor로 비용 최적화를 찾으려면? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 관리 계정의 Trusted Advisor 권고 사항 사용 |
| B | RDS 인스턴스가 실행 중인 멤버 계정의 Trusted Advisor 사용 |
| C | RDS Reserved Instance 최적화 Trusted Advisor 검사 검토 |
| D | RDS 유휴 DB 인스턴스 Trusted Advisor 검사 검토 |
| E | 컴퓨팅 최적화 검사 검토 후 AWS Compute Optimizer 교차 확인 |

**(A) 정답** : AWS Organizations의 관리 계정에서는 모든 멤버 계정을 포함한 통합 Trusted Advisor 권고 사항을 확인할 수 있습니다. → [📖 AWS Trusted Advisor 통합 권고 사항](/section/29-white-papers-architectures#aws-trusted-advisor)

**(B)** : 오답. 멤버 계정보다 관리 계정에서 통합 뷰를 제공받는 것이 효율적입니다.

**(C) 정답** : 높은 사용률의 On-Demand RDS는 Reserved Instance로 전환하면 비용을 절감할 수 있습니다. Trusted Advisor의 RDS RI 최적화 검사가 이를 권고합니다. → [📖 RDS Reserved Instance 비용 최적화](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D)** : 오답. 이미 높은 사용률이므로 유휴 DB 검사는 적합하지 않습니다.

**(E)** : 오답. RDS는 Compute Optimizer 대상이 아닙니다.

**핵심 개념:** Trusted Advisor RI 최적화, AWS Organizations 통합 관리

**관련 노트:** [AWS Trusted Advisor](/section/29-white-papers-architectures#aws-trusted-advisor), [AWS Organizations](/section/23-advanced-identity#aws-organizations)

---

### Q654. A solutions architect is creating an application. The application will run on Amazon EC2 instances in private subnets across multiple Availability Zones in a VPC. The EC2 instances will frequently access large files that contain confidential information. These files are stored in Amazon S3 buckets for processing. The solutions architect must optimize the network architecture to minimize data transfer costs. What should the solutions architect do to meet these requirements?

**Options:**
- A) Create a gateway endpoint for Amazon S3 in the VPC. In the route tables for the private subnets, add an entry for the gateway endpoint.
- B) Create a single NAT gateway in a public subnet. In the route tables for the private subnets, add a default route that points to the NAT gateway.
- C) Create an AWS PrivateLink interface endpoint for Amazon S3 in the VPC. In the route tables for the private subnets, add an entry for the interface endpoint.
- D) Create one NAT gateway for each Availability Zone in public subnets. In each of the route tables for the private subnets, add a default route that points to the NAT gateway in the same Availability Zone.

**Answer:** A

**해설:**

> **문제:** 여러 AZ의 프라이빗 서브넷 EC2 인스턴스가 S3의 기밀 파일에 자주 접근합니다. 데이터 전송 비용을 최소화하려면?

| 선지 | 번역 |
|------|------|
| A | VPC에 S3 게이트웨이 엔드포인트 생성, 프라이빗 서브넷 라우팅 테이블에 추가 |
| B | 퍼블릭 서브넷에 단일 NAT 게이트웨이 생성 |
| C | S3용 PrivateLink 인터페이스 엔드포인트 생성 |
| D | 각 AZ마다 NAT 게이트웨이 생성 |

**(A) 정답** : **S3 게이트웨이 엔드포인트**는 무료이며 VPC 내에서 S3에 직접 접근할 수 있게 합니다. 퍼블릭 인터넷이나 NAT 게이트웨이를 거치지 않아 데이터 전송 비용이 없습니다. → [📖 S3 게이트웨이 엔드포인트 — 무료, 인터넷 우회](/section/25-vpc#vpc-endpoints-aws-privatelink)

**(B)** : 오답. NAT 게이트웨이를 통한 S3 접근은 처리 데이터 비용이 발생합니다.

**(C)** : 오답. 인터페이스 엔드포인트(PrivateLink)는 S3에 사용할 수 있지만 비용이 발생합니다. 게이트웨이 엔드포인트가 S3/DynamoDB에는 무료입니다. → [📖 인터페이스 엔드포인트(PrivateLink) — S3 접근 비용 발생](/section/25-vpc#vpc-endpoints-aws-privatelink)

**(D)** : 오답. 여러 NAT 게이트웨이도 비용이 발생합니다.

**핵심 개념:** S3 Gateway VPC 엔드포인트 — 무료, 데이터 전송 비용 없음

**관련 노트:** [VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink), [네트워킹 비용](/section/25-vpc#네트워킹-비용)

---

### Q655. A company wants to relocate its on-premises MySQL database to AWS. The database accepts regular imports from a client-facing application, which causes a high volume of write operations. The company is concerned that the amount of traffic might be causing performance issues within the application. How should a solutions architect design the architecture on AWS?

**Options:**
- A) Provision an Amazon RDS for MySQL DB instance with Provisioned IOPS SSD storage. Monitor write operation metrics by using Amazon CloudWatch. Adjust the provisioned IOPS if necessary.
- B) Provision an Amazon RDS for MySQL DB instance with General Purpose SSD storage. Place an Amazon ElastiCache cluster in front of the DB instance. Configure the application to query ElastiCache instead.
- C) Provision an Amazon DocumentDB (with MongoDB compatibility) instance with a memory optimized instance type. Monitor Amazon CloudWatch for performance-related issues. Change the instance class if necessary.
- D) Provision an Amazon Elastic File System (Amazon EFS) file system in General Purpose performance mode. Monitor Amazon CloudWatch for IOPS bottlenecks. Change to Provisioned Throughput performance mode if necessary.

**Answer:** A

**해설:**

> **문제:** 대량의 쓰기 작업으로 인한 성능 문제가 우려되는 MySQL DB를 AWS로 이전합니다. 어떻게 설계해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Provisioned IOPS SSD로 RDS MySQL 인스턴스 생성, CloudWatch 모니터링 |
| B | General Purpose SSD RDS MySQL + 앞에 ElastiCache 배치 |
| C | DocumentDB 메모리 최적화 인스턴스 프로비저닝 |
| D | EFS General Purpose 모드 + Provisioned Throughput으로 전환 |

**(A) 정답** : **Provisioned IOPS SSD**는 일관된 높은 I/O 성능을 보장하여 대량 쓰기 작업에 적합합니다. CloudWatch로 모니터링하고 필요시 IOPS를 조정할 수 있습니다. → [📖 Provisioned IOPS SSD — 일관된 높은 I/O 성능](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B)** : 오답. ElastiCache는 읽기 캐싱에 적합하지만 쓰기 성능 문제를 해결하지 못합니다. → [📖 ElastiCache — 읽기 캐싱](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(C)** : 오답. DocumentDB는 NoSQL이며 MySQL 대체가 아닙니다.

**(D)** : 오답. EFS는 파일 시스템으로 관계형 DB 스토리지로 적합하지 않습니다. → [📖 EFS — 파일 시스템](/section/05-ec2-instance-storage#amazon-efs-elastic-file-system)

**핵심 개념:** RDS Provisioned IOPS SSD, 고성능 쓰기 워크로드

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

---

### Q656. A company runs an application in the AWS Cloud that generates sensitive archival data files. The company wants to rearchitect the application's data storage. The company wants to encrypt the data files and to ensure that third parties do not have access to the data before the data is encrypted and sent to AWS. The company has already created an Amazon S3 bucket. Which solution will meet these requirements?

**Options:**
- A) Configure the S3 bucket to use client-side encryption with an Amazon S3 managed encryption key. Configure the application to use the S3 bucket to store the archival files.
- B) Configure the S3 bucket to use server-side encryption with AWS KMS keys (SSE-KMS). Configure the application to use the S3 bucket to store the archival files.
- C) Configure the S3 bucket to use dual-layer server-side encryption with AWS KMS keys (SSE-KMS). Configure the application to use the S3 bucket to store the archival files.
- D) Configure the application to use client-side encryption with a key stored in AWS Key Management Service (AWS KMS). Configure the application to store the archival files in the S3 bucket.

**Answer:** D

**해설:**

> **문제:** 민감한 아카이브 데이터를 AWS로 전송하기 전에 데이터를 암호화하여 제3자가 접근할 수 없도록 해야 합니다.

| 선지 | 번역 |
|------|------|
| A | S3 관리 키로 클라이언트 측 암호화 구성 |
| B | SSE-KMS 서버 측 암호화 구성 |
| C | 이중 레이어 SSE-KMS 암호화 구성 |
| D | KMS 키로 클라이언트 측 암호화, S3에 저장 |

**(A)** : 오답. 클라이언트 측 암호화가 맞지만 S3 관리 키는 AWS가 관리하므로 AWS로 전송 전 암호화를 보장하지 못합니다.

**(B)** : 오답. 서버 측 암호화는 S3에 도달한 후 암호화되므로 전송 중 AWS가 암호화되지 않은 데이터를 볼 수 있습니다.

**(C)** : 오답. 이중 레이어도 서버 측 암호화입니다.

**(D) 정답** : **클라이언트 측 암호화(Client-Side Encryption)**를 KMS 키로 수행하면 데이터가 AWS에 전송되기 전에 이미 암호화됩니다. 제3자(AWS 포함)가 암호화되지 않은 데이터에 접근할 수 없습니다. → [📖 클라이언트 측 암호화(Client-Side Encryption)](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**핵심 개념:** 클라이언트 측 암호화(CSE) vs 서버 측 암호화(SSE), 전송 전 암호화

**관련 노트:** [S3 객체 암호화 - 4가지 방법](/section/12-s3-security#s3-객체-암호화-4가지-방법), [S3 암호화 방식 비교 SSE-S3 / SSE-KMS / SSE-C / Client-Side](/section/12-s3-security#s3-암호화-방식-비교-sses3-ssekms-ssec-clientside)

---

### Q657. A company uses Amazon RDS with default backup settings for its database tier. The company needs to make a daily backup of the database to meet regulatory requirements. The company must retain the backups for 30 days. Which solution will meet these requirements with the LEAST operational overhead?

**Options:**
- A) Write an AWS Lambda function to create an RDS snapshot every day.
- B) Modify the RDS database to have a retention period of 30 days for automated backups.
- C) Use AWS Systems Manager Maintenance Windows to modify the RDS backup retention period.
- D) Create a manual snapshot every day by using the AWS CLI. Modify the RDS backup retention period.

**Answer:** B

**해설:**

> **문제:** RDS를 기본 백업 설정으로 사용 중입니다. 규정 준수를 위해 일일 백업을 30일간 보존해야 합니다. 운영 오버헤드가 가장 적은 방법은?

| 선지 | 번역 |
|------|------|
| A | Lambda 함수로 매일 RDS 스냅샷 생성 |
| B | RDS 자동 백업 보존 기간을 30일로 수정 |
| C | Systems Manager 유지 관리 창으로 백업 보존 기간 수정 |
| D | CLI로 매일 수동 스냅샷 생성 및 보존 기간 수정 |

**(A)** : 오답. Lambda 함수 작성 및 유지가 필요하여 운영 오버헤드가 있습니다.

**(B) 정답** : RDS 자동 백업의 보존 기간을 **1~35일** 범위에서 설정할 수 있습니다. 30일로 설정하면 별도 코드 없이 자동으로 일일 백업을 30일간 유지합니다. → [📖 RDS 자동 백업 보존 기간 1~35일](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(C)** : 오답. Maintenance Windows는 DB 보존 기간을 직접 변경하는 용도가 아닙니다.

**(D)** : 오답. 수동 스냅샷은 매일 실행해야 하므로 오버헤드가 높습니다.

**핵심 개념:** RDS 자동 백업 보존 기간 (최대 35일), 규정 준수

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

---

### Q658. A company is running a multi-tier web application on AWS. The application runs its database tier on Amazon Aurora MySQL. The application and database tiers are in the us-east-1 Region. A database administrator who regularly monitors the Aurora DB cluster finds that an intermittent increase in read traffic is creating high CPU utilization on the read replica and causing increased read latency of the application. What should a solutions architect do to improve read scalability?

**Options:**
- A) Reboot the Aurora DB cluster.
- B) Create a cross-Region read replica
- C) Increase the instance class of the read replica.
- D) Configure Aurora Auto Scaling for the read replica.

**Answer:** D

**해설:**

> **문제:** Aurora MySQL 읽기 복제본에서 간헐적인 읽기 트래픽 증가로 CPU 사용률이 높아지고 읽기 레이턴시가 증가합니다. 읽기 확장성을 개선하려면?

| 선지 | 번역 |
|------|------|
| A | Aurora DB 클러스터 재부팅 |
| B | 크로스 리전 읽기 복제본 생성 |
| C | 읽기 복제본 인스턴스 클래스 증가 |
| D | 읽기 복제본에 Aurora Auto Scaling 구성 |

**(A)** : 오답. 재부팅은 가용성을 해치며 스케일링이 아닙니다.

**(B)** : 오답. 크로스 리전 복제본은 DR용이며 비용이 높습니다. 레이턴시도 증가할 수 있습니다.

**(C)** : 오답. 고정 크기 업그레이드는 간헐적 트래픽 증가에 비효율적입니다.

**(D) 정답** : **Aurora Auto Scaling**을 사용하면 읽기 트래픽에 따라 읽기 복제본 수를 자동으로 조정합니다. 트래픽 급증 시 복제본을 추가하고 감소 시 제거하여 비용 효율적으로 읽기 확장성을 확보합니다. → [📖 Aurora Auto Scaling — 읽기 복제본 자동 조정](/section/07-rds-aurora-elasticache#aurora-고가용성-및-스토리지)

**핵심 개념:** Aurora Auto Scaling (읽기 복제본 자동 조정)

**관련 노트:** [Aurora 고가용성 및 스토리지](/section/07-rds-aurora-elasticache#aurora-고가용성-및-스토리지), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q659. A company that runs its application on AWS uses an Amazon Aurora DB cluster as its database. During peak usage hours when multiple users access and read the data, the monitoring system shows degradation of database performance for write queries. The company wants to increase the scalability of the application to meet peak usage demands. Which solution will meet these requirements MOST cost effectively?

**Options:**
- A) Create a second Aurora DB cluster. Configure a copy job to replicate the users' data to the new database. Update the application to use the second database to read the data.
- B) Create an Amazon DynamoDB Accelerator (DAX) cluster in front of the existing Aurora DB cluster. Update the application to use the DAX cluster for read-only queries. Write data directly to the Aurora DB cluster.
- C) Create an Aurora read replica in the existing Aurora DB cluster. Update the application to use the replica endpoint for read only queries and to use the cluster endpoint for write queries.
- D) Create an Amazon Redshift cluster. Copy the users' data to the Redshift cluster. Update the application to connect to the Redshift cluster and to perform read-only queries on the Redshift cluster.

**Answer:** C

**해설:**

> **문제:** Aurora 클러스터에서 피크 시간 다수 읽기 접근으로 쓰기 쿼리 성능이 저하됩니다. 가장 비용 효율적인 확장 방법은?

| 선지 | 번역 |
|------|------|
| A | 두 번째 Aurora 클러스터 생성, 데이터 복제 |
| B | Aurora 앞에 DAX 클러스터 배치 |
| C | Aurora 읽기 복제본 생성, 읽기/쓰기 엔드포인트 분리 |
| D | Redshift 클러스터 생성, 읽기 전용 쿼리에 사용 |

**(A)** : 오답. 별도 클러스터는 비용이 높고 복잡합니다.

**(B)** : 오답. DAX는 DynamoDB용 캐시이며 Aurora에 사용할 수 없습니다. → [📖 DAX — DynamoDB 전용 캐시](/section/17-serverless-overview#amazon-dynamodb)

**(C) 정답** : **Aurora 읽기 복제본**을 생성하고 읽기 쿼리는 복제본 엔드포인트로, 쓰기 쿼리는 클러스터(기본) 엔드포인트로 분리합니다. 이렇게 하면 기본 인스턴스의 쓰기 성능 저하를 방지하고 비용도 효율적입니다. → [📖 Aurora 읽기 복제본 엔드포인트 분리](/section/07-rds-aurora-elasticache#aurora-엔드포인트)

**(D)** : 오답. Redshift는 OLAP 데이터 웨어하우스로 OLTP 애플리케이션 읽기 복제에 적합하지 않습니다. → [📖 Redshift — OLAP 데이터 웨어하우스](/section/20-data-analytics#amazon-redshift)

**핵심 개념:** Aurora 읽기 복제본, 읽기/쓰기 엔드포인트 분리

**관련 노트:** [Aurora 엔드포인트](/section/07-rds-aurora-elasticache#aurora-엔드포인트), [Aurora 고가용성 및 스토리지](/section/07-rds-aurora-elasticache#aurora-고가용성-및-스토리지)

---

### Q660. A company's near-real-time streaming application is running on AWS. As the data is ingested, a job runs on the data and takes 30 minutes to complete. The workload frequently experiences high latency due to large amounts of incoming data. A solutions architect needs to design a scalable and serverless solution to enhance performance. Which combination of steps should the solutions architect take? (Choose two.)

**Options:**
- A) Use Amazon Kinesis Data Firehose to ingest the data.
- B) Use AWS Lambda with AWS Step Functions to process the data.
- C) Use AWS Database Migration Service (AWS DMS) to ingest the data.
- D) Use Amazon EC2 instances in an Auto Scaling group to process the data.
- E) Use AWS Fargate with Amazon Elastic Container Service (Amazon ECS) to process the data.

**Answer:** A, E

**해설:**

> **문제:** 거의 실시간 스트리밍 애플리케이션에서 작업이 30분 걸립니다. 대량 데이터로 높은 레이턴시가 발생합니다. 확장 가능하고 서버리스 솔루션이 필요합니다. (2개 선택)

| 선지 | 번역 |
|------|------|
| A | Amazon Kinesis Data Firehose로 데이터 수집 |
| B | Lambda + Step Functions으로 데이터 처리 |
| C | AWS DMS로 데이터 수집 |
| D | Auto Scaling 그룹의 EC2 인스턴스로 데이터 처리 |
| E | ECS + AWS Fargate로 데이터 처리 |

**(A) 정답** : Kinesis Data Firehose는 서버리스 스트리밍 데이터 수집 서비스로 확장성이 뛰어납니다. → [📖 Kinesis Data Firehose — 서버리스 스트리밍 수집](/section/15-integration-messaging#amazon-data-firehose-구-kinesis-data-firehose)

**(B)** : 오답. Lambda는 최대 15분 실행 제한이 있어 30분 작업에 사용할 수 없습니다. → [📖 Lambda 최대 15분 실행 제한](/section/17-serverless-overview#aws-lambda)

**(C)** : 오답. DMS는 데이터베이스 마이그레이션 서비스로 스트리밍 수집에 적합하지 않습니다. → [📖 DMS — 데이터베이스 마이그레이션 서비스](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**(D)** : 오답. EC2는 서버리스가 아닙니다.

**(E) 정답** : **AWS Fargate + ECS**는 서버리스 컨테이너 플랫폼으로, 30분 이상의 장시간 처리 작업에 Lambda보다 적합합니다. 자동으로 확장됩니다. → [📖 AWS Fargate + ECS — 서버리스 컨테이너](/section/16-containers#amazon-ecs-elastic-container-service)

**핵심 개념:** Kinesis Data Firehose 수집, Fargate ECS 서버리스 처리, Lambda 15분 제한

**관련 노트:** [Amazon Data Firehose 구 Kinesis Data Firehose](/section/15-integration-messaging#amazon-data-firehose-구-kinesis-data-firehose), [Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service), [AWS Lambda](/section/17-serverless-overview#aws-lambda)

---

### Q661. A company runs a web application on multiple Amazon EC2 instances in a VPC. The application needs to write sensitive data to an Amazon S3 bucket. The data cannot be sent over the public internet. Which solution will meet these requirements?

**Options:**
- A) Create a gateway VPC endpoint for Amazon S3. Create a route in the VPC route table to the endpoint.
- B) Create an internal Network Load Balancer that has the S3 bucket as the target.
- C) Deploy the S3 bucket inside the VPC. Create a route in the VPC route table to the bucket.
- D) Create an AWS Direct Connect connection between the VPC and an S3 regional endpoint.

**Answer:** A

**해설:**

> **문제:** VPC 내 EC2 인스턴스에서 민감한 데이터를 S3에 써야 하는데, 퍼블릭 인터넷을 통해 전송하면 안 됩니다.

| 선지 | 번역 |
|------|------|
| A | S3 게이트웨이 VPC 엔드포인트 생성, 라우팅 테이블에 추가 |
| B | S3 버킷을 대상으로 하는 내부 NLB 생성 |
| C | VPC 내부에 S3 버킷 배포 |
| D | VPC와 S3 리전 엔드포인트 간 Direct Connect 연결 |

**(A) 정답** : **S3 게이트웨이 VPC 엔드포인트**를 통해 VPC 내에서 퍼블릭 인터넷을 거치지 않고 AWS 내부 네트워크로 S3에 접근할 수 있습니다. 무료이며 설정이 간단합니다. → [📖 S3 게이트웨이 VPC 엔드포인트 — 내부 네트워크 접근](/section/25-vpc#vpc-endpoints-aws-privatelink)

**(B)** : 오답. NLB는 S3를 직접 타겟으로 사용할 수 없습니다.

**(C)** : 오답. S3는 리전 서비스로 VPC 내부에 배포할 수 없습니다.

**(D)** : 오답. Direct Connect는 온프레미스 연결 용도이며 이 요구사항에 과도합니다. → [📖 Direct Connect — 온프레미스 연결](/section/25-vpc#direct-connect-dx)

**핵심 개념:** S3 Gateway VPC 엔드포인트, 인터넷 우회 S3 접근

**관련 노트:** [VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink)

---

### Q662. A company runs its production workload on Amazon EC2 instances with Amazon Elastic Block Store (Amazon EBS) volumes. A solutions architect needs to analyze the current EBS volume cost and to recommend optimizations. The recommendations need to include estimated monthly saving opportunities. Which solution will meet these requirements?

**Options:**
- A) Use Amazon Inspector reporting to generate EBS volume recommendations for optimization.
- B) Use AWS Systems Manager reporting to determine EBS volume recommendations for optimization.
- C) Use Amazon CloudWatch metrics reporting to determine EBS volume recommendations for optimization.
- D) Use AWS Compute Optimizer to generate EBS volume recommendations for optimization.

**Answer:** D

**해설:**

> **문제:** EBS 볼륨 비용을 분석하고 예상 월간 절감 기회를 포함한 최적화 권고 사항이 필요합니다.

| 선지 | 번역 |
|------|------|
| A | Amazon Inspector로 EBS 볼륨 최적화 권고 |
| B | AWS Systems Manager로 EBS 볼륨 최적화 권고 |
| C | CloudWatch 메트릭으로 EBS 볼륨 최적화 권고 |
| D | AWS Compute Optimizer로 EBS 볼륨 최적화 권고 |

**(A)** : 오답. Inspector는 보안 취약점 평가 서비스입니다. → [📖 Amazon Inspector — 보안 취약점 평가](/section/24-security-encryption#amazon-inspector)

**(B)** : 오답. Systems Manager는 인프라 관리 서비스로 비용 최적화 권고 기능이 없습니다.

**(C)** : 오답. CloudWatch는 메트릭 모니터링이며 비용 최적화 권고를 제공하지 않습니다.

**(D) 정답** : **AWS Compute Optimizer**는 EC2 인스턴스, EBS 볼륨, Lambda 함수에 대한 최적화 권고 사항을 제공하며, 예상 월간 절감액도 함께 제시합니다. → [📖 AWS Compute Optimizer — EC2/EBS/Lambda 최적화 권고](/section/28-other-services#aws-systems-manager-ssm)

**핵심 개념:** AWS Compute Optimizer, EBS 볼륨 최적화 권고

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q663. A global company runs its workloads on AWS. The company's application uses Amazon S3 buckets across AWS Regions for sensitive data storage and analysis. The company stores millions of objects in multiple S3 buckets daily. The company wants to identify all S3 buckets that are not versioning-enabled. Which solution will meet these requirements?

**Options:**
- A) Use AWS Config managed rule to identify S3 bucket that is not version controlled
- B) Use Amazon S3 Storage Lens to identify all S3 buckets that are not versioning-enabled across Regions.
- C) Enable IAM Access Analyzer for S3 to identify all S3 buckets that are not versioning-enabled across Regions.
- D) Create an S3 Multi-Region Access Point to identify all S3 buckets that are not versioning-enabled across Regions.

**Answer:** B

**해설:**

> **문제:** 여러 리전에 걸쳐 버전 관리가 활성화되지 않은 S3 버킷을 식별하려면?

| 선지 | 번역 |
|------|------|
| A | AWS Config 관리형 규칙으로 버전 미적용 S3 버킷 식별 |
| B | Amazon S3 Storage Lens로 버전 미적용 버킷 식별 |
| C | IAM Access Analyzer로 버전 미적용 버킷 식별 |
| D | S3 Multi-Region Access Point으로 버전 미적용 버킷 식별 |

**(A)** : 오답. AWS Config도 가능하지만 리전별로 설정해야 합니다.

**(B) 정답** : **S3 Storage Lens**는 전체 AWS 계정, 리전, 버킷에 걸쳐 스토리지 사용 및 설정에 대한 통합 가시성을 제공합니다. 버전 관리 미적용 버킷을 리전 구분 없이 한 번에 식별할 수 있습니다. → [📖 S3 Storage Lens — 통합 스토리지 가시성](/section/11-s3-advanced#s3-storage-lens)

**(C)** : 오답. IAM Access Analyzer는 외부 접근 분석 도구입니다.

**(D)** : 오답. Multi-Region Access Point는 다중 리전 접근 단순화 도구입니다.

**핵심 개념:** S3 Storage Lens, 다중 리전 S3 가시성

**관련 노트:** [S3 Storage Lens](/section/11-s3-advanced#s3-storage-lens), [S3 Versioning 버저닝](/section/10-amazon-s3#s3-versioning-버저닝)

---

### Q664. A company wants to enhance its ecommerce order-processing application that is deployed on AWS. The application must process each order exactly once without affecting the customer experience during unpredictable traffic surges. Which solution will meet these requirements?

**Options:**
- A) Create an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Put all the orders in the SQS queue. Configure an AWS Lambda function as the target to process the orders.
- B) Create an Amazon Simple Notification Service (Amazon SNS) standard topic. Publish all the orders to the SNS standard topic. Configure the application as a notification target.
- C) Create a flow by using Amazon AppFlow. Send the orders to the flow. Configure an AWS Lambda function as the target to process the orders.
- D) Configure AWS X-Ray in the application to track the order requests. Configure the application to process the orders by pulling the orders from Amazon CloudWatch.

**Answer:** A

**해설:**

> **문제:** 이커머스 주문 처리 애플리케이션에서 예측 불가능한 트래픽 급증 중에도 각 주문을 정확히 한 번만 처리해야 합니다.

| 선지 | 번역 |
|------|------|
| A | SQS FIFO 큐에 주문 저장, Lambda로 처리 |
| B | SNS Standard 토픽에 주문 게시 |
| C | AppFlow로 주문 전달, Lambda로 처리 |
| D | X-Ray로 요청 추적, CloudWatch에서 처리 |

**(A) 정답** : **SQS FIFO 큐**는 메시지가 정확히 한 번 처리됨(Exactly-Once Processing)을 보장합니다. Lambda를 소비자로 구성하면 자동 확장으로 트래픽 급증에도 대응합니다. → [📖 SQS FIFO 큐 — Exactly-Once Processing 보장](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(B)** : 오답. SNS는 중복 전달 가능성이 있으며 exactly-once를 보장하지 않습니다. → [📖 SNS — 중복 전달 가능, exactly-once 미보장](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(C)** : 오답. AppFlow는 SaaS 연동 서비스로 이 사용 사례에 적합하지 않습니다.

**(D)** : 오답. X-Ray와 CloudWatch는 처리 솔루션이 아닙니다.

**핵심 개념:** SQS FIFO 큐 — 순서 보장 및 Exactly-Once 처리

**관련 노트:** [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service), [언제 무엇을 쓰는가? SQS / SNS / Kinesis 한눈에 비교](/section/15-integration-messaging#언제-무엇을-쓰는가-sqs-sns-kinesis-한눈에-비교)

---

### Q665. A company has two AWS accounts: Production and Development. There are code changes ready in the Development account to push to the Production account. In the alpha phase, only two senior developers on the development team need access to the Production account. In the beta phase, more developers might need access to perform testing as well. What should a solutions architect recommend?

**Options:**
- A) Create two policy documents using the AWS Management Console in each account. Assign the policy to developers who need access.
- B) Create an IAM role in the Development account. Give one IAM role access to the Production account. Allow developers to assume the role.
- C) Create an IAM role in the Production account with the trust policy that specifies the Development account. Allow developers to assume the role.
- D) Create an IAM group in the Production account and add it as a principal in the trust policy that specifies the Production account. Add developers to the group.

**Answer:** C

**해설:**

> **문제:** 개발 계정에서 프로덕션 계정으로 코드를 배포해야 합니다. 알파 단계에는 2명, 베타 단계에는 더 많은 개발자가 프로덕션 접근이 필요합니다.

| 선지 | 번역 |
|------|------|
| A | 각 계정에 정책 문서 생성, 개발자에게 할당 |
| B | 개발 계정에 IAM 역할 생성, 프로덕션 접근 부여 |
| C | 프로덕션 계정에 개발 계정을 신뢰하는 IAM 역할 생성 |
| D | 프로덕션 계정에 IAM 그룹 생성 |

**(A)** : 오답. 여러 계정에 분산된 정책 관리는 복잡하고 확장성이 낮습니다.

**(B)** : 오답. IAM 역할은 개발 계정이 아닌 접근 대상인 프로덕션 계정에 생성해야 합니다.

**(C) 정답** : 올바른 크로스 계정 패턴입니다. **프로덕션 계정**에 개발 계정(또는 개발 계정의 특정 사용자)을 신뢰하는 IAM 역할을 생성하고, 개발자들이 해당 역할을 assume하면 됩니다. 베타 단계에 접근 사용자를 추가하기도 쉽습니다. → [📖 크로스 계정 IAM 역할 — 프로덕션 계정에 역할 생성](/section/02-iam#iam-roles-역할)

**(D)** : 오답. IAM 그룹을 신뢰 정책 프린시펄로 직접 사용할 수 없습니다.

**핵심 개념:** 크로스 계정 IAM 역할, AssumeRole 신뢰 정책

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

---

### Q666. A company wants to restrict access to the content of its web application. The company needs to protect the content by using authorization techniques that are available on AWS. The company also wants to implement a serverless architecture for authorization and authentication that has low login latency. The solution must integrate with the web application and serve web content globally. The application currently has a small user base, but the company expects the application's user base to increase. Which solution will meet these requirements?

**Options:**
- A) Configure Amazon Cognito for authentication. Implement Lambda@Edge for authorization. Configure Amazon CloudFront to serve the web application globally.
- B) Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement AWS Lambda for authorization. Use an Application Load Balancer to serve the web application globally.
- C) Configure Amazon Cognito for authentication. Implement AWS Lambda for authorization. Use Amazon S3 Transfer Acceleration to serve the web application globally.
- D) Configure AWS Directory Service for Microsoft Active Directory for authentication. Implement Lambda@Edge for authorization. Use AWS Elastic Beanstalk to serve the web application globally.

**Answer:** A

**해설:**

> **문제:** 웹 앱 콘텐츠 접근 제한이 필요합니다. 서버리스 인증/인가 아키텍처, 낮은 로그인 레이턴시, 글로벌 콘텐츠 제공, 확장 가능해야 합니다.

| 선지 | 번역 |
|------|------|
| A | Cognito 인증 + Lambda@Edge 인가 + CloudFront 글로벌 배포 |
| B | Directory Service 인증 + Lambda 인가 + ALB 글로벌 배포 |
| C | Cognito 인증 + Lambda 인가 + S3 Transfer Acceleration 배포 |
| D | Directory Service 인증 + Lambda@Edge 인가 + Elastic Beanstalk 배포 |

**(A) 정답** : **Cognito**는 서버리스 인증 서비스, **Lambda@Edge**는 CloudFront 엣지에서 실행되어 낮은 레이턴시 인가를 제공, **CloudFront**는 글로벌 콘텐츠 배포를 담당합니다. 세 가지가 완벽하게 조합됩니다. → [📖 CloudFront Functions & Lambda@Edge — 엣지 인가/낮은 레이턴시](/section/17-serverless-overview#cloudfront-functions-lambdaedge)

**(B)** : 오답. ALB는 글로벌 배포에 적합하지 않으며 Directory Service는 서버리스가 아닙니다. → [📖 ALB — 글로벌 배포 부적합](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

**(C)** : 오답. Lambda(일반)는 엣지에서 실행되지 않아 레이턴시가 높습니다. S3 Transfer Acceleration은 업로드 최적화용입니다.

**(D)** : 오답. Directory Service는 서버리스가 아니고 Elastic Beanstalk는 글로벌 배포가 아닙니다.

**핵심 개념:** Cognito + Lambda@Edge + CloudFront 서버리스 인증/인가

**관련 노트:** [Amazon Cognito](/section/17-serverless-overview#amazon-cognito), [CloudFront Functions & Lambda@Edge](/section/17-serverless-overview#cloudfront-functions-lambdaedge)

---

### Q667. A development team uses multiple AWS accounts for its development, Staging, and production environments. Team members have been launching large Amazon EC2 instances that are underutilized. A solutions architect must prevent large instances from being launched in all accounts. How can the solutions architect meet this requirement with the LEAST operational overhead?

**Options:**
- A) Update the IAM policies to deny the launch of large EC2 instances. Apply the policies to all users
- B) Define a resource in AWS Resource Access Manager that prevents the launch of large EC2 instances.
- C) Create an IAM role in each account that denies the launch of large EC2 instances. Grant the developers IAM group access to the role.
- D) Create an organization in AWS Organizations in the management account with the default policy. Create a Service control policy that denies the launch of large EC2 instances and apply to all AWS accounts.

**Answer:** D

**해설:**

> **문제:** 여러 AWS 계정에서 대형 EC2 인스턴스 시작을 방지해야 합니다. 운영 오버헤드가 가장 적은 방법은?

| 선지 | 번역 |
|------|------|
| A | IAM 정책 업데이트하여 모든 사용자에게 적용 |
| B | RAM에서 리소스 정의로 방지 |
| C | 각 계정에 IAM 역할 생성 |
| D | AWS Organizations SCP로 모든 계정에 적용 |

**(A)** : 오답. 모든 계정의 모든 사용자에게 개별 적용해야 하므로 오버헤드가 높습니다.

**(B)** : 오답. RAM은 리소스 공유 서비스이며 이 용도로 사용할 수 없습니다.

**(C)** : 오답. 각 계정마다 IAM 역할을 만들어야 하므로 오버헤드가 높습니다.

**(D) 정답** : **AWS Organizations SCP(Service Control Policy)**를 사용하면 하나의 정책으로 Organizations 내 모든 계정에 일괄 적용할 수 있습니다. 새 계정이 추가되어도 자동으로 적용됩니다. → [📖 AWS Organizations SCP — 모든 계정 일괄 정책 적용](/section/23-advanced-identity#service-control-policies-scp)

**핵심 개념:** AWS Organizations SCP, 다중 계정 통제

**관련 노트:** [Service Control Policies SCP](/section/23-advanced-identity#service-control-policies-scp), [AWS Organizations](/section/23-advanced-identity#aws-organizations)

---

### Q668. A company has migrated a fleet of hundreds of on-premises virtual machines (VMs) to Amazon EC2 instances. The instances run a diverse fleet of Windows Server versions along with several Linux distributions. The company wants a solution that will automate inventory and updates of the operating systems. The company also needs a summary of common vulnerabilities of each instance for regular monthly reviews. What should a solutions architect recommend to meet these requirements?

**Options:**
- A) Set up AWS Systems Manager Patch Manager to manage all the EC2 instances. Configure AWS Security Hub to produce monthly reports.
- B) Set up AWS Systems Manager Patch Manager to manage all the EC2 instances. Deploy Amazon Inspector, and configure monthly reports.
- C) Set up AWS Shield Advanced, and configure monthly reports. Deploy AWS Config to automate patch installations on the EC2 instances.
- D) Set up Amazon GuardDuty in the account to monitor all EC2 instances. Deploy AWS Config to automate patch installations on the EC2 instances.

**Answer:** B

**해설:**

> **문제:** 수백 개 Windows/Linux EC2 인스턴스의 OS 인벤토리 및 업데이트 자동화, 그리고 취약점 요약 월간 리뷰가 필요합니다.

| 선지 | 번역 |
|------|------|
| A | Patch Manager로 패치 관리 + Security Hub로 월간 리포트 |
| B | Patch Manager로 패치 관리 + Inspector로 취약점 월간 리포트 |
| C | Shield Advanced + Config로 패치 자동화 |
| D | GuardDuty + Config로 패치 자동화 |

**(A)** : 오답. Security Hub는 보안 알림 집계 서비스이며 취약점 상세 리포트를 제공하지 않습니다.

**(B) 정답** : **Systems Manager Patch Manager**는 OS 인벤토리 및 패치 자동화를 담당하고, **Amazon Inspector**는 EC2 인스턴스의 일반적인 취약점(CVE)을 스캔하여 월간 리포트를 생성할 수 있습니다. → [📖 Amazon Inspector — EC2 CVE 취약점 스캔](/section/24-security-encryption#amazon-inspector)

**(C)** : 오답. Shield Advanced는 DDoS 방어 서비스이며 패치 관리가 아닙니다. → [📖 AWS Shield Advanced — DDoS 방어](/section/24-security-encryption#aws-shield)

**(D)** : 오답. GuardDuty는 위협 감지 서비스이며 패치 관리가 아닙니다. → [📖 GuardDuty — 위협 감지 서비스](/section/24-security-encryption#amazon-guardduty)

**핵심 개념:** Systems Manager Patch Manager (패치 자동화) + Amazon Inspector (취약점 평가)

**관련 노트:** [AWS Systems Manager SSM](/section/28-other-services#aws-systems-manager-ssm), [Amazon Inspector](/section/24-security-encryption#amazon-inspector)

---

### Q669. A company hosts its application in the AWS Cloud. The application runs on Amazon EC2 instances behind an Elastic Load Balancer in an Auto Scaling group and with an Amazon DynamoDB table. The company wants to ensure the application can be made available in another AWS Region with minimal downtime. What should a solutions architect do to meet these requirements with the LEAST amount of downtime?

**Options:**
- A) Create an Auto Scaling group and a load balancer in the disaster recovery Region. Configure the DynamoDB table as a global table. Configure DNS failover to point to the new disaster recovery Region's load balancer.
- B) Create an AWS CloudFormation template to create EC2 instances, load balancers, and DynamoDB tables to be executed when needed. Configure DNS failover to point to the new disaster recovery Region's load balancer.
- C) Create an AWS CloudFormation template to create EC2 instances and a load balancer to be executed when needed. Configure the DynamoDB table as a global table. Configure DNS failover to point to the new disaster recovery Region's load balancer.
- D) Create an Auto Scaling group and load balancer in the disaster recovery Region. Configure the DynamoDB table as a global table. Create an Amazon CloudWatch alarm to trigger and AWS Lambda function that updates Amazon Route 53 pointing to the disaster recovery load balancer.

**Answer:** A

**해설:**

> **문제:** 다른 AWS 리전에서 최소 다운타임으로 애플리케이션을 가용하게 만들려면?

| 선지 | 번역 |
|------|------|
| A | DR 리전에 Auto Scaling + LB 사전 생성, DynamoDB 글로벌 테이블, DNS 페일오버 |
| B | CloudFormation으로 필요 시 EC2/LB/DynamoDB 생성, DNS 페일오버 |
| C | CloudFormation으로 필요 시 EC2/LB 생성, DynamoDB 글로벌 테이블, DNS 페일오버 |
| D | DR 리전에 사전 생성, DynamoDB 글로벌 테이블, CloudWatch + Lambda로 Route 53 업데이트 |

**(A) 정답** : DR 리전에 인프라를 **사전 준비(Warm Standby)**하고 DynamoDB를 **글로벌 테이블**로 구성하면 즉시 페일오버가 가능하여 다운타임이 최소화됩니다. DNS 페일오버로 자동 전환됩니다. → [📖 DynamoDB 글로벌 테이블 — 멀티 리전 복제](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : 오답. CloudFormation으로 실시간 생성하면 프로비저닝 시간(10~20분) 동안 다운타임 발생합니다.

**(C)** : 오답. EC2/LB는 CloudFormation으로 생성하면 지연이 발생합니다.

**(D)** : 오답. CloudWatch + Lambda 방식은 DNS 업데이트에 추가 지연이 있습니다.

**핵심 개념:** Warm Standby DR, DynamoDB 글로벌 테이블, Route 53 DNS 페일오버

**관련 노트:** [4가지 DR 전략 빠른 RTO 순](/section/26-disaster-recovery-migrations#4가지-dr-전략-빠른-rto-순), [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q670. A company runs an application on Amazon EC2 instances in a private subnet. The application needs to store and retrieve data in Amazon S3 buckets. According to regulatory requirements, the data must not travel across the public internet. What should a solutions architect do to meet these requirements MOST cost-effectively?

**Options:**
- A) Deploy a NAT gateway to access the S3 buckets.
- B) Deploy AWS Storage Gateway to access the S3 buckets.
- C) Deploy an S3 interface endpoint to access the S3 buckets.
- D) Deploy an S3 gateway endpoint to access the S3 buckets.

**Answer:** D

**해설:**

> **문제:** 프라이빗 서브넷의 EC2 인스턴스에서 퍼블릭 인터넷을 통하지 않고 S3에 접근해야 합니다. 가장 비용 효율적인 방법은?

| 선지 | 번역 |
|------|------|
| A | NAT 게이트웨이로 S3 접근 |
| B | AWS Storage Gateway로 S3 접근 |
| C | S3 인터페이스 엔드포인트(PrivateLink) 배포 |
| D | S3 게이트웨이 엔드포인트 배포 |

**(A)** : 오답. NAT 게이트웨이는 데이터 처리 비용이 발생하고 여전히 퍼블릭 S3 엔드포인트를 사용합니다. → [📖 NAT 게이트웨이 — 데이터 처리 비용 발생](/section/25-vpc#nat-gateway)

**(B)** : 오답. Storage Gateway는 복잡하고 이 요구 사항에 과도합니다.

**(C)** : 오답. 인터페이스 엔드포인트(PrivateLink)는 시간당 비용이 발생합니다. → [📖 인터페이스 엔드포인트(PrivateLink) — 시간당 비용 발생](/section/25-vpc#vpc-endpoints-aws-privatelink)

**(D) 정답** : **S3 게이트웨이 엔드포인트**는 **무료**이며 VPC 라우팅 테이블에 엔트리를 추가하는 방식으로 퍼블릭 인터넷을 우회하여 S3에 접근합니다. 가장 비용 효율적입니다. → [📖 S3 게이트웨이 엔드포인트 — 무료, 라우팅 테이블 방식](/section/25-vpc#vpc-endpoints-aws-privatelink)

**핵심 개념:** S3 게이트웨이 엔드포인트 (무료) vs 인터페이스 엔드포인트 (유료)

**관련 노트:** [VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink), [네트워킹 비용](/section/25-vpc#네트워킹-비용)

---

### Q671. A company hosts an application on Amazon EC2 instances that run in a single Availability Zone. The application is accessible by using the transport layer of the Open Systems Interconnection (OSI) model. The company needs the application architecture to have high availability. Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)

**Options:**
- A) Configure new EC2 instances in a different Availability Zone. Use Amazon Route 53 to route traffic to all instances.
- B) Configure a Network Load Balancer in front of the EC2 instances.
- C) Configure a Network Load Balancer for TCP traffic to the instances. Configure an Application Load Balancer for HTTP and HTTPS traffic to the instances.
- D) Create an Auto Scaling group for the EC2 instances. Configure the Auto Scaling group to use multiple Availability Zones. Configure the Auto Scaling group to run application health checks on the instances.
- E) Create an Amazon CloudWatch alarm. Configure the alarm to restart EC2 instances that transition to a stopped state.

**Answer:** B, D

**해설:**

> **문제:** 단일 AZ의 EC2에서 OSI 전송 계층(Layer 4)으로 접근 가능한 애플리케이션을 고가용성으로 만들려면? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 다른 AZ에 새 EC2 인스턴스 구성, Route 53으로 트래픽 분산 |
| B | EC2 앞에 Network Load Balancer 구성 |
| C | NLB(TCP) + ALB(HTTP/HTTPS) 동시 구성 |
| D | Multi-AZ Auto Scaling 그룹 + 헬스 체크 구성 |
| E | CloudWatch 알람으로 중지된 인스턴스 재시작 |

**(A)** : 오답. Route 53으로 다중 인스턴스에 트래픽을 분산할 수 있지만 NLB보다 비용 효율이 낮고 헬스 체크 기반 라우팅은 지연이 있습니다.

**(B) 정답** : 전송 계층(Layer 4) 접근이므로 **NLB(Network Load Balancer)**가 적합합니다. NLB는 고가용성을 제공합니다. → [📖 NLB — Layer 4, 고가용성](/section/06-high-availability-scalability#nlb-network-load-balancer-상세)

**(C)** : 오답. 두 종류의 LB를 동시에 사용하면 불필요한 비용이 발생합니다.

**(D) 정답** : **Multi-AZ Auto Scaling 그룹**으로 다수 AZ에 인스턴스를 분산하여 AZ 장애 시에도 가용성을 보장합니다. 헬스 체크로 비정상 인스턴스를 자동 교체합니다. → [📖 Auto Scaling Group — 다중 AZ 분산, 헬스 체크 자동 교체](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(E)** : 오답. CloudWatch 알람으로 인스턴스를 재시작하는 것은 AZ 장애에 대응할 수 없습니다.

**핵심 개념:** NLB(Layer 4), Multi-AZ Auto Scaling, 고가용성

**관련 노트:** [NLB Network Load Balancer 상세](/section/06-high-availability-scalability#nlb-network-load-balancer-상세), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q672. A company hosts its static website by using Amazon S3. The company wants to add a contact form to its webpage. The contact form will have dynamic server-side components for users to input their name, email address, phone number, and user message. The company anticipates that there will be fewer than 100 site visits each month. Which solution will meet these requirements MOST cost-effectively?

**Options:**
- A) Host the dynamic contact form in Amazon Elastic Container Service (Amazon ECS). Set up Amazon Simple Email Service (Amazon SES) to connect to a third-party email provider.
- B) Create an Amazon API Gateway endpoint that returns the contact form from an AWS Lambda function. Configure another Lambda function on the API Gateway to publish a message to an Amazon Simple Notification Service (Amazon SNS) topic.
- C) Host the website by using AWS Amplify Hosting for static content and dynamic content. Use server-side scripting to build the contact form. Configure Amazon Simple Queue Service (Amazon SQS) to deliver the message to the company.
- D) Migrate the website from Amazon S3 to Amazon EC2 instances that run Windows Server. Use Internet Information Services (IIS) for Windows Server to host the webpage. Use client-side scripting to build the contact form. Integrate the form with Amazon WorkMail.

**Answer:** B

**해설:**

> **문제:** S3 정적 웹사이트에 서버 측 컴포넌트가 있는 문의 양식을 추가합니다. 월 방문자 100명 미만입니다. 가장 비용 효율적인 방법은?

| 선지 | 번역 |
|------|------|
| A | ECS + SES로 문의 양식 호스팅 |
| B | API Gateway + Lambda로 양식 반환, 다른 Lambda로 SNS 메시지 발행 |
| C | AWS Amplify 호스팅 + SQS로 메시지 전달 |
| D | EC2 Windows Server + IIS + WorkMail |

**(A)** : 오답. ECS는 월 100회 이하 방문에 과도합니다.

**(B) 정답** : **서버리스(API Gateway + Lambda + SNS)**는 사용한 만큼만 과금되므로 소규모 트래픽에 가장 비용 효율적입니다. → [📖 API Gateway + Lambda — 서버리스 아키텍처](/section/17-serverless-overview#aws-api-gateway)

**(C)** : 오답. Amplify도 가능하지만 B보다 비용이 더 발생할 수 있습니다.

**(D)** : 오답. EC2 Windows Server는 지속 비용이 발생하고 과도합니다.

**핵심 개념:** 서버리스 아키텍처(API Gateway + Lambda + SNS), 소규모 트래픽 비용 최적화

**관련 노트:** [AWS API Gateway](/section/17-serverless-overview#aws-api-gateway), [AWS Lambda](/section/17-serverless-overview#aws-lambda), [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q673. A company uses AWS Organizations to create dedicated AWS accounts for each business unit to manage each business unit's account independently upon request. The root email recipient missed a notification that was sent to the root user email address of one account. The company wants to ensure that all future notifications are not missed. Future notifications must be limited to account administrators. Which solution will meet these requirements?

**Options:**
- A) Configure the company's email server to forward notification email messages that are sent to the AWS account root user email address to all users in the organization.
- B) Configure all AWS account root user email addresses as distribution lists that go to a few administrators who can respond to alerts. Configure AWS account alternate contacts in the AWS Organizations console or programmatically.
- C) Configure all AWS account root user email messages to be sent to one administrator who is responsible for monitoring alerts and forwarding those alerts to the appropriate groups.
- D) Configure all existing AWS accounts and all newly created accounts to use the same root user email address. Configure AWS account alternate contacts in the AWS Organizations console or programmatically.

**Answer:** B

**해설:**

> **문제:** AWS Organizations 계정에서 루트 사용자 이메일 알림을 놓쳤습니다. 모든 알림이 계정 관리자에게만 전달되도록 하려면?

| 선지 | 번역 |
|------|------|
| A | 루트 사용자 이메일을 조직 내 모든 사용자에게 포워딩 |
| B | 루트 사용자 이메일을 배포 목록으로, 대체 연락처도 설정 |
| C | 루트 이메일을 담당 관리자 1명에게 전달 |
| D | 모든 계정에 동일한 루트 이메일 주소 사용, 대체 연락처 설정 |

**(A)** : 오답. 조직 내 모든 사용자에게 전달하는 것은 범위가 너무 넓습니다.

**(B) 정답** : 루트 이메일을 소수 관리자로 구성된 **배포 목록(Distribution List)**으로 설정하고, **AWS 대체 연락처(Alternate Contacts)**를 설정하면 청구, 운영, 보안 등 여러 유형의 알림을 적절한 팀에 전달할 수 있습니다.

**(C)** : 오답. 단일 담당자는 단일 장애점이 됩니다.

**(D)** : 오답. 여러 계정에 동일한 루트 이메일은 보안상 권장되지 않습니다.

**핵심 개념:** AWS 루트 계정 이메일, 대체 연락처(Alternate Contacts), AWS Organizations

**관련 노트:** [AWS Organizations](/section/23-advanced-identity#aws-organizations)

---

### Q674. A company runs an ecommerce application on AWS. Amazon EC2 instances process purchases and store the purchase details in an Amazon Aurora PostgreSQL DB cluster. Customers are experiencing application timeouts during times of peak usage. A solutions architect needs to rearchitect the application so that the application can scale to meet peak usage demands. Which combination of actions will meet these requirements MOST cost-effectively? (Choose two.)

**Options:**
- A) Configure an Auto Scaling group of new EC2 instances to retry the purchases until the processing is complete. Update the applications to connect to the DB cluster by using Amazon RDS Proxy.
- B) Configure the application to use an Amazon ElastiCache cluster in front of the Aurora PostgreSQL DB cluster.
- C) Update the application to send the purchase requests to an Amazon Simple Queue Service (Amazon SQS) queue. Configure an Auto Scaling group of new EC2 instances that read from the SQS queue.
- D) Configure an AWS Lambda function to retry the ticket purchases until the processing is complete.
- E) Configure an Amazon API Gateway REST API with a usage plan.

**Answer:** A, C

**해설:**

> **문제:** 이커머스 앱에서 피크 타임에 타임아웃이 발생합니다. 피크 수요에 맞게 확장하는 가장 비용 효율적인 방법은? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | Auto Scaling EC2 그룹 + RDS Proxy로 DB 연결 |
| B | ElastiCache를 Aurora 앞에 배치 |
| C | SQS 큐로 구매 요청 전달, Auto Scaling EC2 그룹에서 처리 |
| D | Lambda로 구매 재시도 |
| E | API Gateway 사용 계획 구성 |

**(A) 정답** : **RDS Proxy**는 DB 연결 풀링을 제공하여 다수의 EC2 연결을 효율적으로 관리하고 Aurora 연결 과부하를 방지합니다. Auto Scaling으로 EC2를 확장합니다. → [📖 RDS Proxy — DB 연결 풀링](/section/07-rds-aurora-elasticache#amazon-rds-proxy)

**(B)** : 오답. ElastiCache는 읽기 캐싱용이며, 구매 처리(쓰기)의 타임아웃 문제를 해결하지 못합니다. → [📖 ElastiCache — 읽기 캐싱, 쓰기 타임아웃 미해결](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(C) 정답** : **SQS 큐**로 요청을 버퍼링하면 피크 트래픽에도 요청이 유실되지 않고, Auto Scaling EC2 그룹이 큐에서 순차적으로 처리합니다. 타임아웃 문제를 근본적으로 해결합니다. → [📖 SQS 큐 — 요청 버퍼링, 피크 트래픽 처리](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : 오답. 재시도만으로는 근본 원인(과부하)을 해결하지 못합니다.

**(E)** : 오답. API Gateway 사용 계획은 속도 제한용이며 확장성 솔루션이 아닙니다.

**핵심 개념:** RDS Proxy (DB 연결 관리), SQS 큐 버퍼링, Auto Scaling

**관련 노트:** [Amazon RDS Proxy](/section/07-rds-aurora-elasticache#amazon-rds-proxy), [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

---

### Q675. A company that uses AWS Organizations runs 150 applications across 30 different AWS accounts. The company used AWS Cost and Usage Report to create a new report in the management account. The report is delivered to an Amazon S3 bucket that is replicated to a bucket in the data collection account. The company's senior leadership wants to view a custom dashboard that provides NAT gateway costs each day starting at the beginning of the current month. Which solution will meet these requirements?

**Options:**
- A) Share an Amazon QuickSight dashboard that includes the requested table visual. Configure QuickSight to use AWS DataSync to query the new report.
- B) Share an Amazon QuickSight dashboard that includes the requested table visual. Configure QuickSight to use Amazon Athena to query the new report.
- C) Share an Amazon CloudWatch dashboard that includes the requested table visual. Configure CloudWatch to use AWS DataSync to query the new report.
- D) Share an Amazon CloudWatch dashboard that includes the requested table visual. Configure CloudWatch to use Amazon Athena to query the new report.

**Answer:** B

**해설:**

> **문제:** S3에 저장된 Cost and Usage Report를 기반으로 NAT 게이트웨이 일별 비용 커스텀 대시보드를 제공하려면?

| 선지 | 번역 |
|------|------|
| A | QuickSight 대시보드 + DataSync로 리포트 쿼리 |
| B | QuickSight 대시보드 + Athena로 리포트 쿼리 |
| C | CloudWatch 대시보드 + DataSync로 리포트 쿼리 |
| D | CloudWatch 대시보드 + Athena로 리포트 쿼리 |

**(A)** : 오답. DataSync는 데이터 전송 서비스이며 쿼리 도구가 아닙니다.

**(B) 정답** : **Amazon Athena**로 S3의 Cost and Usage Report를 직접 SQL 쿼리할 수 있습니다. **QuickSight**는 Athena를 데이터 소스로 연결하여 커스텀 대시보드를 만들고 공유할 수 있습니다. → [📖 Amazon Athena + QuickSight — S3 CUR 쿼리 및 대시보드](/section/20-data-analytics#amazon-athena)

**(C)** : 오답. CloudWatch는 S3 기반 CUR 쿼리용 커스텀 대시보드를 지원하지 않습니다.

**(D)** : 오답. CloudWatch는 Athena와 연동하여 CUR 대시보드를 만들 수 없습니다.

**핵심 개념:** Cost and Usage Report + Athena + QuickSight 대시보드 조합

**관련 노트:** [Amazon Athena](/section/20-data-analytics#amazon-athena), [Amazon QuickSight](/section/20-data-analytics#amazon-quicksight)

---

### Q676. A company is hosting a high-traffic static website on Amazon S3 with an Amazon CloudFront distribution that has a default TTL of 0 seconds. The company wants to implement caching to improve performance for the website. However, the company also wants to ensure that stale content is not served for more than a few minutes after a deployment. Which combination of caching methods should a solutions architect implement to meet these requirements? (Choose two.)

**Options:**
- A) Set the CloudFront default TTL to 2 minutes.
- B) Set a default TTL of 2 minutes on the S3 bucket.
- C) Add a Cache-Control private directive to the objects in Amazon S3.
- D) Create an AWS Lambda@Edge function to add an Expires header to HTTP responses. Configure the function to run on viewer response.
- E) Add a Cache-Control max-age directive of 24 hours to the objects in Amazon S3. On deployment, create a CloudFront invalidation to clear any changed files from edge caches.

**Answer:** A, E

**해설:**

> **문제:** S3 정적 웹사이트에서 성능 향상을 위한 캐싱을 구현하되, 배포 후 수 분 내에 오래된 콘텐츠가 제공되지 않도록 해야 합니다. (2개 선택)

| 선지 | 번역 |
|------|------|
| A | CloudFront 기본 TTL을 2분으로 설정 |
| B | S3 버킷에 기본 TTL 2분 설정 |
| C | S3 객체에 Cache-Control private 지시문 추가 |
| D | Lambda@Edge로 Expires 헤더 추가 |
| E | S3 객체에 Cache-Control max-age 24시간 설정, 배포 시 CloudFront 무효화 |

**(A) 정답** : CloudFront TTL을 2분으로 설정하면 캐싱 성능을 높이면서도 콘텐츠 갱신이 2분 내에 반영됩니다. → [📖 CloudFront TTL 설정 — 캐싱 성능과 갱신 주기](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B)** : 오답. S3 버킷 자체에 TTL을 설정하는 기능은 없습니다.

**(C)** : 오답. Cache-Control private는 CloudFront에서 캐싱을 비활성화합니다.

**(D)** : 오답. Expires 헤더를 추가하는 것이 TTL 설정보다 복잡하며 효율적이지 않습니다.

**(E) 정답** : 객체에 24시간 TTL을 설정하면 높은 캐시 적중률을 얻을 수 있고, 배포 시 CloudFront **무효화(Invalidation)**로 변경된 파일만 즉시 갱신합니다. → [📖 CloudFront 캐시 무효화(Invalidation) — 즉시 갱신](/section/13-cloudfront-global-accelerator#cloudfront-cache-invalidation-캐시-무효화)

**핵심 개념:** CloudFront TTL, Cache-Control, CloudFront 무효화(Invalidation)

**관련 노트:** [CloudFront Cache Invalidation 캐시 무효화](/section/13-cloudfront-global-accelerator#cloudfront-cache-invalidation-캐시-무효화), [캐싱 전략](/section/27-more-solutions-architecture#캐싱-전략)

---

### Q677. A company uses Amazon EC2 instances and AWS Lambda functions to run its application. The company has VPCs with public subnets and private subnets in its AWS account. The EC2 instances run in a private subnet in one of the VPCs. The Lambda functions need direct network access to the EC2 instances for the application to work. The application will run for at least 1 year. The company expects the number of Lambda functions that the application uses to increase during that time. The company wants to maximize its savings on all application resources and to keep network latency between the services low. Which solution will meet these requirements?

**Options:**
- A) Purchase an EC2 Instance Savings Plan. Optimize the Lambda functions' duration and memory usage and the number of invocations. Connect the Lambda functions to the private subnet that contains the EC2 instances.
- B) Purchase an EC2 Instance Savings Plan. Optimize the Lambda functions' duration and memory usage, the number of invocations, and the amount of data that is transferred. Connect the Lambda functions to a public subnet in the same VPC where the EC2 instances run.
- C) Purchase a Compute Savings Plan. Optimize the Lambda functions' duration and memory usage, the number of invocations, and the amount of data that is transferred. Connect the Lambda functions to the private subnet that contains the EC2 instances.
- D) Purchase a Compute Savings Plan. Optimize the Lambda functions' duration and memory usage, the number of invocations, and the amount of data that is transferred. Keep the Lambda functions in the Lambda service VPC.

**Answer:** C

**해설:**

> **문제:** EC2와 Lambda가 1년 이상 운영됩니다. Lambda 수가 증가할 예정입니다. 비용 절감을 최대화하고 네트워크 레이턴시를 낮게 유지하려면?

| 선지 | 번역 |
|------|------|
| A | EC2 Instance Savings Plan + Lambda를 프라이빗 서브넷에 연결 |
| B | EC2 Instance Savings Plan + Lambda를 퍼블릭 서브넷에 연결 |
| C | Compute Savings Plan + Lambda를 프라이빗 서브넷에 연결 |
| D | Compute Savings Plan + Lambda를 Lambda 서비스 VPC에 유지 |

**(A)** : 오답. EC2 Instance Savings Plan은 EC2만 적용되고 Lambda에는 적용되지 않습니다. → [📖 EC2 Instance Savings Plan — EC2 전용](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : 오답. EC2 Instance Savings Plan이 Lambda에 미적용되고, 퍼블릭 서브넷 연결은 불필요합니다.

**(C) 정답** : **Compute Savings Plan**은 EC2와 Lambda 모두에 적용됩니다. Lambda를 EC2가 있는 **프라이빗 서브넷에 연결**하면 EC2와 직접 통신하여 낮은 레이턴시를 유지합니다. → [📖 Compute Savings Plan — EC2 + Lambda 커버, Lambda in VPC](/section/17-serverless-overview#lambda-in-vpc)

**(D)** : 오답. Lambda를 기본 Lambda 서비스 VPC에 두면 EC2(프라이빗 서브넷)와 직접 통신이 불가합니다.

**핵심 개념:** Compute Savings Plan (EC2 + Lambda 적용), Lambda VPC 연결

**관련 노트:** [Lambda in VPC](/section/17-serverless-overview#lambda-in-vpc), [AWS Lambda](/section/17-serverless-overview#aws-lambda)

---

### Q678. A company hosts a data lake on AWS. The data lake consists of data in Amazon S3 and Amazon RDS for PostgreSQL. The company needs a reporting solution that provides data visualization and includes all the data sources within the data lake. Only the company's management team should have full access to all the visualizations. The rest of the company should have only limited access. Which solution will meet these requirements?

**Options:**
- A) Create an analysis in Amazon QuickSight. Connect all the data sources and create new datasets. Publish dashboards to visualize the data. Share the dashboards with the appropriate IAM roles.
- B) Create an analysis in Amazon QuickSight. Connect all the data sources and create new datasets. Publish dashboards to visualize the data. Share the dashboards with the appropriate users and groups.
- C) Create an AWS Glue table and crawler for the data in Amazon S3. Create an AWS Glue extract, transform, and load (ETL) job to produce reports. Publish the reports to Amazon S3. Use S3 bucket policies to limit access to the reports.
- D) Create an AWS Glue table and crawler for the data in Amazon S3. Use Amazon Athena Federated Query to access data within Amazon RDS for PostgreSQL. Generate reports by using Amazon Athena. Publish the reports to Amazon S3. Use S3 bucket policies to limit access to the reports.

**Answer:** A

**해설:**

> **문제:** S3와 RDS PostgreSQL 데이터 레이크에서 데이터를 시각화하는 리포팅 솔루션이 필요합니다. 관리팀은 전체 접근, 나머지 직원은 제한된 접근이 필요합니다.

| 선지 | 번역 |
|------|------|
| A | QuickSight 분석, 데이터 소스 연결, 대시보드 발행, IAM 역할로 공유 |
| B | QuickSight 분석, 대시보드 발행, 사용자/그룹으로 공유 |
| C | Glue 크롤러 + ETL + S3 리포트, 버킷 정책으로 접근 제한 |
| D | Glue + Athena 페더레이티드 쿼리 + S3 리포트 |

**(A) 정답** : QuickSight에서 S3와 RDS를 모두 데이터 소스로 연결하여 대시보드를 생성하고, **IAM 역할**로 접근을 세밀하게 제어할 수 있습니다. 관리팀과 일반 직원에게 다른 권한을 부여할 수 있습니다. → [📖 QuickSight + IAM 역할 — 세밀한 접근 제어](/section/20-data-analytics#amazon-quicksight)

**(B)** : 오답. QuickSight의 권한 관리는 IAM 역할이 아닌 QuickSight 사용자/그룹으로 하는 것이 더 적합합니다. A가 더 정확한 답입니다.

**(C)** : 오답. Glue ETL은 데이터 변환용이며 RDS 데이터를 직접 포함하지 않습니다.

**(D)** : 오답. 시각화 기능이 없습니다.

**핵심 개념:** Amazon QuickSight 데이터 시각화, 다중 데이터 소스, IAM 접근 제어

**관련 노트:** [Amazon QuickSight](/section/20-data-analytics#amazon-quicksight)

---

### Q679. A company runs an ecommerce application on Amazon EC2 instances behind an Application Load Balancer. The instances run in an Amazon EC2 Auto Scaling group across multiple Availability Zones. The Auto Scaling group scales based on CPU utilization metrics. The ecommerce application stores the transaction data in a MySQL 8.0 database that is hosted on a large EC2 instance. The database's performance degrades quickly as application load increases. The application handles more read requests than write transactions. The company wants a solution that will automatically scale the database to meet the demand of unpredictable read workloads while maintaining high availability. Which solution will meet these requirements?

**Options:**
- A) Use Amazon Redshift with a single node for leader and compute functionality.
- B) Use Amazon RDS with a Single-AZ deployment. Configure Amazon RDS to add reader instances in a different Availability Zone.
- C) Use Amazon Aurora with a Multi-AZ deployment. Configure Aurora Auto Scaling with Aurora Replicas.
- D) Use Amazon ElastiCache for Memcached with EC2 Spot Instances.

**Answer:** C

**해설:**

> **문제:** MySQL 데이터베이스가 읽기 부하 증가 시 성능이 저하됩니다. 읽기 요청이 쓰기보다 많고, 예측 불가능한 읽기 부하에 자동 확장 및 고가용성이 필요합니다.

| 선지 | 번역 |
|------|------|
| A | Redshift 단일 노드 |
| B | RDS Single-AZ + 다른 AZ에 리더 인스턴스 추가 |
| C | Aurora Multi-AZ + Aurora Auto Scaling (Aurora Replicas) |
| D | ElastiCache for Memcached + EC2 Spot 인스턴스 |

**(A)** : 오답. Redshift는 OLAP 데이터 웨어하우스로 OLTP 이커머스에 적합하지 않습니다.

**(B)** : 오답. RDS Single-AZ는 고가용성이 없습니다.

**(C) 정답** : **Aurora Multi-AZ**는 고가용성을 제공하고, **Aurora Auto Scaling**은 읽기 복제본 수를 자동으로 조정하여 예측 불가능한 읽기 부하에 대응합니다. MySQL 8.0 호환도 지원합니다. → [📖 Aurora Multi-AZ + Aurora Auto Scaling](/section/07-rds-aurora-elasticache#aurora-고가용성-및-스토리지)

**(D)** : 오답. Memcached는 캐시이며 데이터베이스 대체가 아닙니다.

**핵심 개념:** Aurora Auto Scaling, Aurora Replicas, 읽기 확장성

**관련 노트:** [Aurora 고가용성 및 스토리지](/section/07-rds-aurora-elasticache#aurora-고가용성-및-스토리지), [Amazon Aurora](/section/07-rds-aurora-elasticache#amazon-aurora)

---

### Q680. A company has an application that ingests incoming messages. Dozens of other applications and microservices then quickly consume these messages. The number of messages varies drastically and sometimes increases suddenly to 100,000 each second. The company wants to decouple the solution and increase scalability. Which solution meets these requirements?

**Options:**
- A) Persist the messages to Amazon Kinesis Data Analytics. Configure the consumer applications to read and process the messages.
- B) Deploy the ingestion application on Amazon EC2 instances in an Auto Scaling group to scale the number of EC2 instances based on CPU metrics.
- C) Write the messages to Amazon Kinesis Data Streams with a single shard. Use an AWS Lambda function to preprocess messages and store them in Amazon DynamoDB. Configure the consumer applications to read from DynamoDB to process the messages.
- D) Publish the messages to an Amazon Simple Notification Service (Amazon SNS) topic with multiple Amazon Simple Queue Service (Amazon SQS) subscriptions. Configure the consumer applications to process the messages from the queues.

**Answer:** D

**해설:**

> **문제:** 수십 개의 앱/마이크로서비스가 메시지를 소비합니다. 메시지가 초당 100,000개까지 급증할 수 있습니다. 디커플링과 확장성이 필요합니다.

| 선지 | 번역 |
|------|------|
| A | Kinesis Data Analytics에 메시지 저장 |
| B | Auto Scaling EC2 그룹으로 수집 애플리케이션 확장 |
| C | Kinesis Data Streams(단일 샤드) + Lambda + DynamoDB |
| D | SNS 토픽 + 여러 SQS 구독 |

**(A)** : 오답. Kinesis Data Analytics는 실시간 분석 서비스이며 메시지 큐가 아닙니다.

**(B)** : 오답. 수집 애플리케이션만 확장하는 것은 소비자 앱과의 디커플링을 해결하지 못합니다.

**(C)** : 오답. 단일 샤드 Kinesis는 초당 100,000개의 메시지 처리에 적합하지 않습니다.

**(D) 정답** : **SNS + SQS 팬아웃 패턴**은 수십 개의 소비자가 각자의 SQS 큐에서 독립적으로 메시지를 처리할 수 있게 합니다. SNS와 SQS 모두 자동으로 확장되어 초당 100,000개 메시지도 처리 가능합니다. → [📖 SNS + SQS 팬아웃 패턴 — 독립적 소비자, 자동 확장](/section/27-more-solutions-architecture#fan-out-패턴)

**핵심 개념:** SNS+SQS 팬아웃 패턴, 메시지 디커플링, 확장성

**관련 노트:** [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service), [Fan Out 패턴](/section/27-more-solutions-architecture#fan-out-패턴), [언제 무엇을 쓰는가? SQS / SNS / Kinesis 한눈에 비교](/section/15-integration-messaging#언제-무엇을-쓰는가-sqs-sns-kinesis-한눈에-비교)

---

### Q681. An application development team is designing a microservice that will convert large images to smaller, compressed images. When a user uploads an image through the web interface, the microservice should store the image in an Amazon S3 bucket, process and compress the image with an AWS Lambda function, and store the image in its compressed form in a different S3 bucket. A solutions architect needs to design a solution that uses durable, stateless components to process the images automatically. Which combination of actions will meet these requirements? (Choose two.)

**Options:**
- A) Create an Amazon Simple Queue Service (Amazon SQS) queue. Configure the S3 bucket to send a notification to the SQS queue when an image is uploaded to the S3 bucket.
- B) Configure the Lambda function to use the Amazon Simple Queue Service (Amazon SQS) queue as the invocation source. When the SQS message is successfully processed, delete the message in the queue.
- C) Configure the Lambda function to monitor the S3 bucket for new uploads. When an uploaded image is detected, write the file name to a text file in memory and use the text file to keep track of the images that were processed.
- D) Launch an Amazon EC2 instance to monitor an Amazon Simple Queue Service (Amazon SQS) queue. When items are added to the queue, log the file name in a text file on the EC2 instance and invoke the Lambda function.
- E) Configure an Amazon EventBridge (Amazon CloudWatch Events) event to monitor the S3 bucket. When an image is uploaded, send an alert to an Amazon SNS topic with the application owner's email address for further processing.

**Answer:** A, B

**해설:**

> **문제:** 이미지 업로드 시 Lambda로 압축하는 마이크로서비스를 설계합니다. 내구성 있고 상태 비저장(stateless) 컴포넌트를 사용해야 합니다. (2개 선택)

| 선지 | 번역 |
|------|------|
| A | SQS 큐 생성, S3 업로드 시 SQS에 알림 전송 |
| B | Lambda의 호출 소스로 SQS 큐 사용, 처리 후 메시지 삭제 |
| C | Lambda가 S3를 직접 모니터링, 처리된 이미지를 메모리 텍스트 파일로 추적 |
| D | EC2 인스턴스로 SQS 모니터링, 텍스트 파일로 로그 |
| E | EventBridge로 S3 모니터링, SNS로 관리자 이메일 전송 |

**(A) 정답** : S3 이벤트 알림을 SQS에 전달하면 내구성 있는 메시지 큐가 생성됩니다. S3 업로드가 트리거되면 SQS에 메시지가 추가됩니다. → [📖 S3 이벤트 알림 → SQS — 내구성 있는 메시지 큐](/section/11-s3-advanced#s3-event-notifications-이벤트-알림)

**(B) 정답** : Lambda를 SQS 이벤트 소스 매핑으로 구성하면 자동으로 메시지를 처리하고 성공 후 삭제합니다. 완전한 stateless 처리 파이프라인입니다. → [📖 Lambda SQS 이벤트 소스 매핑 — 자동 처리](/section/17-serverless-overview#aws-lambda)

**(C)** : 오답. 메모리 텍스트 파일은 상태 저장(stateful)이며 내구성이 없습니다.

**(D)** : 오답. EC2 인스턴스의 텍스트 파일은 상태 저장이며 내구성이 없습니다.

**(E)** : 오답. 이메일 알림만으로는 자동 처리가 이루어지지 않습니다.

**핵심 개념:** S3 → SQS → Lambda 이벤트 처리 파이프라인, 상태 비저장(Stateless) 아키텍처

**관련 노트:** [S3 Event Notifications 이벤트 알림](/section/11-s3-advanced#s3-event-notifications-이벤트-알림), [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service), [Lambda, SNS & SQS 패턴](/section/27-more-solutions-architecture#lambda-sns-sqs-패턴)

---

### Q682. A company has a three-tier web application that is deployed on AWS. The web servers are deployed in a public subnet in a VPC. The application servers and database servers are deployed in private subnets in the same VPC. The company has deployed a third-party virtual firewall appliance from AWS Marketplace in an inspection VPC. The appliance is configured with an IP interface that can accept IP packets. A solutions architect needs to integrate the web application with the appliance to inspect all traffic to the application before the traffic reaches the web server. Which solution will meet these requirements with the LEAST operational overhead?

**Options:**
- A) Create a Network Load Balancer in the public subnet of the application's VPC to route the traffic to the appliance for packet inspection.
- B) Create an Application Load Balancer in the public subnet of the application's VPC to route the traffic to the appliance for packet inspection.
- C) Deploy a transit gateway in the inspection VPC. Configure route tables to route the incoming packets through the transit gateway.
- D) Deploy a Gateway Load Balancer in the inspection VPC. Create a Gateway Load Balancer endpoint to receive the incoming packets and forward the packets to the appliance.

**Answer:** D

**해설:**

> **문제:** 별도 검사 VPC의 가상 방화벽 어플라이언스를 통해 모든 트래픽을 검사하려 합니다. 운영 오버헤드가 가장 적은 방법은?

| 선지 | 번역 |
|------|------|
| A | 애플리케이션 VPC 퍼블릭 서브넷에 NLB로 트래픽 라우팅 |
| B | 애플리케이션 VPC 퍼블릭 서브넷에 ALB로 트래픽 라우팅 |
| C | 검사 VPC에 Transit Gateway 배포 |
| D | 검사 VPC에 Gateway Load Balancer 배포, GWLB 엔드포인트 생성 |

**(A)** : 오답. NLB는 IP 어플라이언스로 투명하게 트래픽을 전달하는 데 적합하지 않습니다.

**(B)** : 오답. ALB는 Layer 7이며 방화벽 어플라이언스 통합에 적합하지 않습니다.

**(C)** : 오답. Transit Gateway는 VPC 간 라우팅이지만 어플라이언스 통합 자동화 기능이 없습니다. → [📖 Transit Gateway — VPC 간 라우팅](/section/25-vpc#transit-gateway)

**(D) 정답** : **Gateway Load Balancer(GWLB)**는 서드파티 네트워크 어플라이언스를 투명하게 통합하도록 설계되었습니다. GWLB 엔드포인트를 통해 트래픽이 자동으로 어플라이언스를 경유하여 검사됩니다. 운영 오버헤드가 가장 적습니다. → [📖 Gateway Load Balancer — 서드파티 어플라이언스 투명 통합](/section/06-high-availability-scalability#gwlb-gateway-load-balancer-상세)

**핵심 개념:** Gateway Load Balancer(GWLB), 가상 방화벽 어플라이언스 통합

**관련 노트:** [GWLB Gateway Load Balancer 상세](/section/06-high-availability-scalability#gwlb-gateway-load-balancer-상세), [AWS Network Firewall](/section/25-vpc#aws-network-firewall)

---

### Q683. A company wants to improve its ability to clone large amounts of production data into a test environment in the same AWS Region. The data is stored in Amazon EC2 instances on Amazon Elastic Block Store (Amazon EBS) volumes. Modifications to the cloned data must not affect the production environment. The software that accesses this data requires consistently high I/O performance. A solutions architect needs to minimize the time that is required to clone the production data into the test environment. Which solution will meet these requirements?

**Options:**
- A) Take EBS snapshots of the production EBS volumes. Restore the snapshots onto EC2 instance store volumes in the test environment.
- B) Configure the production EBS volumes to use the EBS Multi-Attach feature. Take EBS snapshots of the production EBS volumes. Attach the production EBS volumes to the EC2 instances in the test environment.
- C) Take EBS snapshots of the production EBS volumes. Create and initialize new EBS volumes. Attach the new EBS volumes to EC2 instances in the test environment before restoring the volumes from the production EBS snapshots.
- D) Take EBS snapshots of the production EBS volumes. Turn on the EBS fast snapshot restore feature on the EBS snapshots. Restore the snapshots into new EBS volumes. Attach the new EBS volumes to EC2 instances in the test environment.

**Answer:** D

**해설:**

> **문제:** 프로덕션 EBS 데이터를 테스트 환경에 빠르게 복제해야 합니다. 프로덕션에 영향 없이 높은 I/O 성능이 필요합니다.

| 선지 | 번역 |
|------|------|
| A | EBS 스냅샷 → Instance Store 볼륨으로 복원 |
| B | EBS Multi-Attach + 스냅샷 → 프로덕션 볼륨을 테스트에 연결 |
| C | EBS 스냅샷 → 새 볼륨 생성 및 초기화 후 복원 |
| D | EBS 스냅샷 + Fast Snapshot Restore → 새 EBS 볼륨에 복원 |

**(A)** : 오답. Instance Store는 영속성이 없고 스냅샷 복원 불가합니다. → [📖 Instance Store — 영속성 없음, 스냅샷 불가](/section/05-ec2-instance-storage#ec2-instance-store)

**(B)** : 오답. 프로덕션 볼륨을 테스트에 직접 연결하면 데이터 수정이 프로덕션에 영향을 줄 수 있습니다.

**(C)** : 오답. 일반 스냅샷 복원은 처음 I/O 시 지연(lazy loading)이 발생합니다. → [📖 EBS 스냅샷 복원 — lazy loading 지연 발생](/section/05-ec2-instance-storage#ebs-snapshots)

**(D) 정답** : **EBS Fast Snapshot Restore**를 활성화하면 스냅샷에서 생성된 볼륨이 즉시 완전한 I/O 성능을 제공합니다(lazy loading 없음). 복제 시간을 최소화하고 고성능 I/O를 보장합니다. → [📖 EBS Fast Snapshot Restore — 즉시 완전한 I/O 성능](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** EBS Fast Snapshot Restore, 즉시 완전 I/O 성능

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q684. An ecommerce company wants to launch a one-deal-a-day website on AWS. Each day will feature exactly one product on sale for a period of 24 hours. The company wants to be able to handle millions of requests each hour with millisecond latency during peak hours. Which solution will meet these requirements with the LEAST operational overhead?

**Options:**
- A) Use Amazon S3 to host the full website in different S3 buckets. Add Amazon CloudFront distributions. Set the S3 buckets as origins for the distributions. Store the order data in Amazon S3.
- B) Deploy the full website on Amazon EC2 instances that run in Auto Scaling groups across multiple Availability Zones. Add an Application Load Balancer (ALB) to distribute the website traffic. Add another ALB for the backend APIs. Store the data in Amazon RDS for MySQL.
- C) Migrate the full application to run in containers. Host the containers on Amazon Elastic Kubernetes Service (Amazon EKS). Use the Kubernetes Cluster Autoscaler to increase and decrease the number of pods to process bursts in traffic. Store the data in Amazon RDS for MySQL.
- D) Use an Amazon S3 bucket to host the website's static content. Deploy an Amazon CloudFront distribution. Set the S3 bucket as the origin. Use Amazon API Gateway and AWS Lambda functions for the backend APIs. Store the data in Amazon DynamoDB.

**Answer:** D

**해설:**

> **문제:** 하루 한 상품만 판매하는 사이트를 시간당 수백만 요청과 밀리초 레이턴시로 운영하려 합니다. 운영 오버헤드가 가장 적은 방법은?

| 선지 | 번역 |
|------|------|
| A | S3로 전체 웹사이트 + CloudFront, S3에 주문 데이터 저장 |
| B | Multi-AZ Auto Scaling EC2 + ALB + RDS MySQL |
| C | EKS 컨테이너 + Cluster Autoscaler + RDS MySQL |
| D | S3 정적 + CloudFront + API Gateway + Lambda + DynamoDB |

**(A)** : 오답. S3에 주문 데이터를 저장하는 것은 부적절합니다.

**(B)** : 오답. EC2 + RDS는 관리 오버헤드가 높습니다.

**(C)** : 오답. EKS + RDS는 복잡하고 관리 오버헤드가 높습니다.

**(D) 정답** : **완전 서버리스 아키텍처**: S3(정적) + CloudFront(글로벌 배포) + API Gateway + Lambda(서버리스 백엔드) + DynamoDB(서버리스 DB). 자동 확장, 밀리초 레이턴시, 최소 운영 오버헤드를 모두 달성합니다. → [📖 완전 서버리스 — API Gateway + Lambda + DynamoDB + CloudFront](/section/18-serverless-architectures#아키텍처-2-서버리스-웹사이트-myblogcom)

**핵심 개념:** 서버리스 웹 아키텍처 — S3 + CloudFront + API Gateway + Lambda + DynamoDB

**관련 노트:** [아키텍처 2: 서버리스 웹사이트 MyBlog.com](/section/18-serverless-architectures#아키텍처-2-서버리스-웹사이트-myblogcom), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [AWS API Gateway](/section/17-serverless-overview#aws-api-gateway)

---

### Q685. A solutions architect is using Amazon S3 to design the storage architecture of a new digital media application. The media files must be resilient to the loss of an Availability Zone. Some files are accessed frequently while other files are rarely accessed in an unpredictable pattern. The solutions architect must minimize the costs of storing and retrieving the media files. Which storage option meets these requirements?

**Options:**
- A) S3 Standard.
- B) S3 Intelligent-Tiering.
- C) S3 Standard-Infrequent Access (S3 Standard-IA).
- D) S3 One Zone-Infrequent Access (S3 One Zone-IA).

**Answer:** B

**해설:**

> **문제:** AZ 손실에 내구성 있고, 자주 및 드물게 접근하는 패턴이 예측 불가능하며, 저장 및 검색 비용을 최소화하는 S3 스토리지 옵션은?

| 선지 | 번역 |
|------|------|
| A | S3 Standard |
| B | S3 Intelligent-Tiering |
| C | S3 Standard-IA |
| D | S3 One Zone-IA |

**(A)** : 오답. 거의 접근하지 않는 파일에 Standard는 비용이 높습니다.

**(B) 정답** : **S3 Intelligent-Tiering**은 접근 패턴을 자동으로 모니터링하고 자주/드물게 접근 계층 간에 자동으로 이동합니다. 여러 AZ에 복제되어 AZ 손실에 내구성이 있습니다. 예측 불가능한 접근 패턴에 가장 비용 효율적입니다. → [📖 S3 Intelligent-Tiering — 접근 패턴 자동 감지](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(C)** : 오답. Standard-IA는 자주 접근하는 파일에 검색 비용이 발생합니다. → [📖 S3 Standard-IA — 검색 비용 발생](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : 오답. One Zone-IA는 단일 AZ에만 저장되어 AZ 손실에 취약합니다. → [📖 S3 One Zone-IA — 단일 AZ, AZ 손실 취약](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** S3 Intelligent-Tiering, 예측 불가능한 접근 패턴 비용 최적화

**관련 노트:** [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스), [스토리지 클래스 비교표](/section/10-amazon-s3#스토리지-클래스-비교표)

---

### Q686. A company is storing backup files by using Amazon S3 Standard storage. The files are accessed frequently for 1 month. However, the files are not accessed after 1 month. The company must keep the files indefinitely. Which storage solution will meet these requirements MOST cost-effectively?

**Options:**
- A) Configure S3 Intelligent-Tiering to automatically migrate objects.
- B) Create an S3 Lifecycle configuration to transition objects from S3 Standard to S3 Glacier Deep Archive after 1 month.
- C) Create an S3 Lifecycle configuration to transition objects from S3 Standard to S3 Standard-Infrequent Access (S3 Standard-IA) after 1 month.
- D) Create an S3 Lifecycle configuration to transition objects from S3 Standard to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 1 month.

**Answer:** B

**해설:**

> **문제:** 백업 파일이 1개월간 자주 접근되고 이후 접근되지 않습니다. 파일은 무기한 보존해야 합니다. 가장 비용 효율적인 방법은?

| 선지 | 번역 |
|------|------|
| A | S3 Intelligent-Tiering으로 자동 이동 |
| B | S3 Standard → 1개월 후 S3 Glacier Deep Archive로 전환 |
| C | S3 Standard → 1개월 후 S3 Standard-IA로 전환 |
| D | S3 Standard → 1개월 후 S3 One Zone-IA로 전환 |

**(A)** : 오답. 1개월 후 완전히 접근하지 않는 명확한 패턴이 있으므로 Intelligent-Tiering보다 Lifecycle 정책이 더 비용 효율적입니다.

**(B) 정답** : 1개월 후 **S3 Glacier Deep Archive**로 전환하면 가장 낮은 스토리지 비용(TB당 약 $0.00099/월)으로 파일을 무기한 보존할 수 있습니다. 이미 접근하지 않으므로 검색 비용 걱정이 없습니다. → [📖 S3 Glacier Deep Archive — 가장 낮은 스토리지 비용](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(C)** : 오답. Standard-IA는 Glacier보다 저장 비용이 높습니다. → [📖 S3 Standard-IA — Glacier보다 저장 비용 높음](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : 오답. One Zone-IA는 AZ 장애 시 데이터 손실 위험이 있습니다. → [📖 S3 One Zone-IA — AZ 장애 시 데이터 손실 위험](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** S3 Lifecycle 정책, S3 Glacier Deep Archive (최저 비용 장기 보존)

**관련 노트:** [S3 Lifecycle Rules 수명주기 규칙](/section/11-s3-advanced#s3-lifecycle-rules-수명주기-규칙), [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

---

### Q687. A company observes an increase in Amazon EC2 costs in its most recent bill. The billing team notices unwanted vertical scaling of instance types for a couple of EC2 instances. A solutions architect needs to create a graph comparing the last 2 months of EC2 costs and perform an in-depth analysis to identify the root cause of the vertical scaling. How should the solutions architect generate the information with the LEAST operational overhead?

**Options:**
- A) Use AWS Budgets to create a budget report and compare EC2 costs based on instance types.
- B) Use Cost Explorer's granular filtering feature to perform an in-depth analysis of EC2 costs based on instance types.
- C) Use graphs from the AWS Billing and Cost Management dashboard to compare EC2 costs based on instance types for the last 2 months.
- D) Use AWS Cost and Usage Reports to create a report and send it to an Amazon S3 bucket. Use Amazon QuickSight with Amazon S3 as a source to generate an interactive graph based on instance types.

**Answer:** B

**해설:**

> **문제:** EC2 비용 증가가 발생했습니다. 인스턴스 타입 기반으로 지난 2개월 EC2 비용을 비교하고 수직 확장의 근본 원인을 분석하려 합니다. 운영 오버헤드가 가장 적은 방법은?

| 선지 | 번역 |
|------|------|
| A | AWS Budgets 예산 리포트로 인스턴스 타입별 EC2 비용 비교 |
| B | Cost Explorer 세분화 필터로 인스턴스 타입별 EC2 비용 심층 분석 |
| C | 청구 및 비용 관리 대시보드 그래프 사용 |
| D | Cost and Usage Reports + S3 + QuickSight로 인터랙티브 그래프 생성 |

**(A)** : 오답. Budgets는 예산 알림용이며 세부 비용 분석 도구가 아닙니다.

**(B) 정답** : **AWS Cost Explorer**는 인스턴스 타입, 리전, 서비스별로 비용을 시각화하고 세밀하게 필터링할 수 있습니다. 별도 설정 없이 즉시 사용 가능하여 운영 오버헤드가 가장 적습니다. → [📖 AWS Cost Explorer — 인스턴스/리전/서비스별 비용 시각화](/section/28-other-services#cost-explorer)

**(C)** : 오답. Billing 대시보드는 상위 수준 개요만 제공하며 세부 분석이 제한적입니다.

**(D)** : 오답. CUR + S3 + QuickSight 설정에 상당한 오버헤드가 필요합니다.

**핵심 개념:** AWS Cost Explorer 세분화 필터, EC2 비용 분석

**관련 노트:** [Cost Explorer](/section/28-other-services#cost-explorer)

---

### Q688. A company is designing an application. The application uses an AWS Lambda function to receive information through Amazon API Gateway and to store the information in an Amazon Aurora PostgreSQL database. During the proof-of-concept stage, the company has to increase the Lambda quotas significantly to handle the high volumes of data that the company needs to load into the database. A solutions architect must recommend a new design to improve scalability and minimize the configuration effort. Which solution will meet these requirements?

**Options:**
- A) Refactor the Lambda function code to Apache Tomcat code that runs on Amazon EC2 instances. Connect the database by using native Java Database Connectivity (JDBC) drivers.
- B) Change the platform from Aurora to Amazon DynamoDB. Provision a DynamoDB Accelerator (DAX) cluster. Use the DAX client SDK to point the existing DynamoDB API calls at the DAX cluster.
- C) Set up two Lambda functions. Configure one function to receive the information. Configure the other function to load the information into the database. Integrate the Lambda functions by using Amazon Simple Notification Service.
- D) Set up two Lambda functions. Configure one function to receive the information. Configure the other function to load the information into the database. Integrate the Lambda functions by using an Amazon Simple Queue Service (Amazon SQS) queue.

**Answer:** D

**해설:**

> **문제:** API Gateway → Lambda → Aurora 구조에서 Lambda 할당량을 크게 늘려야 합니다. 확장성을 높이고 구성 노력을 최소화하는 새 설계가 필요합니다.

| 선지 | 번역 |
|------|------|
| A | Lambda를 EC2 Tomcat으로 리팩토링 |
| B | Aurora를 DynamoDB + DAX로 교체 |
| C | Lambda 2개 + SNS로 연결 |
| D | Lambda 2개 + SQS 큐로 연결 |

**(A)** : 오답. EC2로 이전하면 관리 오버헤드가 증가합니다.

**(B)** : 오답. DynamoDB는 PostgreSQL과 다른 NoSQL이며 마이그레이션 비용이 큽니다.

**(C)** : 오답. SNS는 메시지 영속성이 없어 대량 데이터 로드 시 유실 위험이 있습니다.

**(D) 정답** : 수신 Lambda와 DB 로드 Lambda를 **SQS 큐**로 연결하면 수신 Lambda는 빠르게 메시지를 큐에 넣고 응답하고, 로드 Lambda는 큐에서 순차적으로 데이터를 처리합니다. Lambda 동시성 할당량 문제를 해결하고 확장성이 향상됩니다. → [📖 SQS 큐 — 수신/처리 Lambda 디커플링, 확장성 향상](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** SQS 큐 버퍼링, Lambda 동시성 관리, 비동기 처리 패턴

**관련 노트:** [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service), [AWS Lambda](/section/17-serverless-overview#aws-lambda)

---

### Q689. A company needs to review its AWS Cloud deployment to ensure that its Amazon S3 buckets do not have unauthorized configuration changes. What should a solutions architect do to accomplish this goal?

**Options:**
- A) Turn on AWS Config with the appropriate rules.
- B) Turn on AWS Trusted Advisor with the appropriate checks.
- C) Turn on Amazon Inspector with the appropriate assessment template.
- D) Turn on Amazon S3 server access logging. Configure Amazon EventBridge (Amazon Cloud Watch Events).

**Answer:** A

**해설:**

> **문제:** S3 버킷에 무단 구성 변경이 없도록 AWS 클라우드 배포를 검토해야 합니다.

| 선지 | 번역 |
|------|------|
| A | 적절한 규칙으로 AWS Config 활성화 |
| B | 적절한 검사로 AWS Trusted Advisor 활성화 |
| C | 적절한 평가 템플릿으로 Amazon Inspector 활성화 |
| D | S3 서버 액세스 로깅 활성화 + EventBridge 구성 |

**(A) 정답** : **AWS Config**는 AWS 리소스 구성 변경을 지속적으로 모니터링하고 기록합니다. S3 관련 관리형 규칙(예: s3-bucket-public-read-prohibited)을 활성화하면 무단 구성 변경을 즉시 감지할 수 있습니다. → [📖 AWS Config — 리소스 구성 변경 모니터링 및 규칙](/section/22-monitoring-audit-performance#aws-config)

**(B)** : 오답. Trusted Advisor는 모범 사례 권고 도구이며 실시간 구성 변경 감지가 아닙니다. → [📖 Trusted Advisor — 모범 사례 권고, 실시간 감지 아님](/section/29-white-papers-architectures#aws-trusted-advisor)

**(C)** : 오답. Inspector는 EC2/Lambda 취약점 스캔 서비스입니다. → [📖 Amazon Inspector — EC2/Lambda 취약점 스캔](/section/24-security-encryption#amazon-inspector)

**(D)** : 오답. 서버 액세스 로깅은 접근 로그이며 구성 변경 감지가 아닙니다.

**핵심 개념:** AWS Config 관리형 규칙, S3 구성 준수 모니터링

**관련 노트:** [AWS Config](/section/22-monitoring-audit-performance#aws-config), [S3 보안](/section/10-amazon-s3#s3-보안)

---

### Q690. A company is launching a new application and will display application metrics on an Amazon CloudWatch dashboard. The company's product manager needs to access this dashboard periodically. The product manager does not have an AWS account. A solutions architect must provide access to the product manager by following the principle of least privilege. Which solution will meet these requirements?

**Options:**
- A) Share the dashboard from the CloudWatch console. Enter the product manager's email address, and complete the sharing steps. Provide a shareable link for the dashboard to the product manager.
- B) Create an IAM user specifically for the product manager. Attach the CloudWatchReadOnlyAccess AWS managed policy to the user. Share the new login credentials with the product manager. Share the browser URL of the correct dashboard with the product manager.
- C) Create an IAM user for the company's employees. Attach the ViewOnlyAccess AWS managed policy to the IAM user. Share the new login credentials with the product manager. Ask the product manager to navigate to the CloudWatch console and locate the dashboard by name in the Dashboards section.
- D) Deploy a bastion server in a public subnet. When the product manager requires access to the dashboard, start the server and share the RDP credentials. On the bastion server, ensure that the browser is configured to open the dashboard URL with cached AWS credentials that have appropriate permissions to view the dashboard.

**Answer:** A

**해설:**

> **문제:** AWS 계정이 없는 제품 관리자에게 CloudWatch 대시보드에 대한 최소 권한 원칙에 따른 접근을 제공하려면?

| 선지 | 번역 |
|------|------|
| A | CloudWatch 콘솔에서 대시보드 공유, 이메일로 공유 링크 제공 |
| B | 제품 관리자용 IAM 사용자 생성, CloudWatchReadOnlyAccess 정책 연결 |
| C | 직원용 IAM 사용자 생성, ViewOnlyAccess 정책 연결 |
| D | 퍼블릭 서브넷에 배스천 서버 배포, RDP 자격증명 공유 |

**(A) 정답** : CloudWatch는 AWS 계정 없이도 **공유 링크**를 통해 대시보드를 볼 수 있는 기능을 제공합니다. AWS 계정이 없는 사용자에게 최소 권한으로 접근을 제공하는 가장 간단한 방법입니다. → [📖 CloudWatch 대시보드 공유 링크 — AWS 계정 없이 접근](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : 오답. IAM 사용자 생성은 AWS 계정이 없는 사용자에게 AWS 콘솔 접근을 부여하지만, 최소 권한 원칙에서 대시보드만 볼 수 있는 공유 링크보다 과도합니다.

**(C)** : 오답. ViewOnlyAccess는 CloudWatch 외에도 다른 많은 서비스에 접근 권한이 있어 최소 권한이 아닙니다.

**(D)** : 오답. 배스천 서버는 과도하게 복잡하고 비용이 발생합니다.

**핵심 개념:** CloudWatch 대시보드 공유 링크, 최소 권한 원칙

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics), [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

---

### Q691. A company is migrating applications to AWS. The applications are deployed in different accounts. The company manages the accounts centrally by using AWS Organizations. The company's security team needs a single sign-on (SSO) solution across all the company's accounts. The company must continue managing the users and groups in its on-premises self-managed Microsoft Active Directory. Which solution will meet these requirements?

**Options:**
- A) Enable AWS Single Sign-On (AWS SSO) from the AWS SSO console. Create a one-way forest trust or a one-way domain trust to connect the company's self-managed Microsoft Active Directory with AWS SSO by using AWS Directory Service for Microsoft Active Directory.
- B) Enable AWS Single Sign-On (AWS SSO) from the AWS SSO console. Create a two-way forest trust to connect the company's self-managed Microsoft Active Directory with AWS SSO by using AWS Directory Service for Microsoft Active Directory.
- C) Use AWS Directory Service. Create a two-way trust relationship with the company's self-managed Microsoft Active Directory.
- D) Deploy an identity provider (IdP) on premises. Enable AWS Single Sign-On (AWS SSO) from the AWS SSO console.

**Answer:** B

**해설:**

> **문제:** AWS Organizations의 여러 계정에 SSO가 필요합니다. 온프레미스 자체 관리 Microsoft Active Directory에서 사용자와 그룹을 계속 관리해야 합니다.

| 선지 | 번역 |
|------|------|
| A | AWS SSO + 단방향 포레스트/도메인 신뢰 + AWS Managed AD |
| B | AWS SSO + 양방향 포레스트 신뢰 + AWS Managed AD |
| C | AWS Directory Service + 양방향 신뢰 (SSO 없음) |
| D | 온프레미스 IdP + AWS SSO |

**(A)** : 오답. 단방향 신뢰는 충분한 인증 흐름을 제공하지 않습니다.

**(B) 정답** : AWS IAM Identity Center(구 SSO)와 **AWS Managed Microsoft AD** 간 **양방향 포레스트 신뢰**를 구성하면 온프레미스 AD 사용자로 AWS 계정에 SSO 접근이 가능합니다. → [📖 IAM Identity Center + AWS Managed Microsoft AD 양방향 신뢰](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**(C)** : 오답. SSO가 없어 조직 전체 단일 로그온이 구현되지 않습니다.

**(D)** : 오답. 온프레미스 IdP 배포는 추가 인프라와 관리 오버헤드가 필요합니다.

**핵심 개념:** AWS IAM Identity Center(SSO), Managed AD, 양방향 포레스트 신뢰

**관련 노트:** [AWS IAM Identity Center AWS SSO 후속](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속), [AWS Directory Services](/section/23-advanced-identity#aws-directory-services), [Microsoft Active Directory AD](/section/23-advanced-identity#microsoft-active-directory-ad)

---

### Q692. A company provides a Voice over Internet Protocol (VoIP) service that uses UDP connections. The service consists of Amazon EC2 instances that run in an Auto Scaling group. The company has deployments across multiple AWS Regions. The company needs to route users to the Region with the lowest latency. The company also needs automated failover between Regions. Which solution will meet these requirements?

**Options:**
- A) Deploy a Network Load Balancer (NLB) and an associated target group. Associate the target group with the Auto Scaling group. Use the NLB as an AWS Global Accelerator endpoint in each Region.
- B) Deploy an Application Load Balancer (ALB) and an associated target group. Associate the target group with the Auto Scaling group. Use the ALB as an AWS Global Accelerator endpoint in each Region.
- C) Deploy a Network Load Balancer (NLB) and an associated target group. Associate the target group with the Auto Scaling group. Create an Amazon Route 53 latency record that points to aliases for each NLB. Create an Amazon CloudFront distribution that uses the latency record as an origin.
- D) Deploy an Application Load Balancer (ALB) and an associated target group. Associate the target group with the Auto Scaling group. Create an Amazon Route 53 weighted record that points to aliases for each ALB. Deploy an Amazon CloudFront distribution that uses the weighted record as an origin.

**Answer:** A

**해설:**

> **문제:** UDP 연결을 사용하는 VoIP 서비스가 다중 리전에 배포되어 있습니다. 최저 레이턴시 리전으로 라우팅하고 자동 페일오버가 필요합니다.

| 선지 | 번역 |
|------|------|
| A | NLB + Auto Scaling, NLB를 AWS Global Accelerator 엔드포인트로 사용 |
| B | ALB + Auto Scaling, ALB를 Global Accelerator 엔드포인트로 사용 |
| C | NLB + Route 53 레이턴시 레코드 + CloudFront 배포 |
| D | ALB + Route 53 가중치 레코드 + CloudFront 배포 |

**(A) 정답** : UDP 트래픽에는 Layer 4인 **NLB**가 적합합니다. **AWS Global Accelerator**는 Anycast IP를 통해 최저 레이턴시 리전으로 자동 라우팅하고 자동 페일오버를 제공합니다. → [📖 NLB(UDP) + AWS Global Accelerator — Anycast, 최저 레이턴시](/section/13-cloudfront-global-accelerator#aws-global-accelerator)

**(B)** : 오답. ALB는 HTTP/HTTPS(Layer 7)만 처리하며 UDP를 지원하지 않습니다. → [📖 ALB — HTTP/HTTPS Layer 7, UDP 미지원](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

**(C)** : 오답. CloudFront는 UDP 트래픽을 지원하지 않습니다. → [📖 CloudFront — UDP 미지원](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D)** : 오답. ALB는 UDP 미지원, CloudFront는 UDP 미지원입니다.

**핵심 개념:** AWS Global Accelerator + NLB, UDP 트래픽 지원, 최저 레이턴시 라우팅

**관련 노트:** [AWS Global Accelerator](/section/13-cloudfront-global-accelerator#aws-global-accelerator), [NLB Network Load Balancer 상세](/section/06-high-availability-scalability#nlb-network-load-balancer-상세)

---

### Q693. A development team runs monthly resource-intensive tests on its general purpose Amazon RDS for MySQL DB instance with Performance Insights enabled. The testing lasts for 48 hours once a month and is the only process that uses the database. The team wants to reduce the cost of running the tests without reducing the compute and memory attributes of the DB instance. Which solution meets these requirements MOST cost-effectively?

**Options:**
- A) Stop the DB instance when tests are completed. Restart the DB instance when required.
- B) Use an Auto Scaling policy with the DB instance to automatically scale when tests are completed.
- C) Create a snapshot when tests are completed. Terminate the DB instance and restore the snapshot when required.
- D) Modify the DB instance to a low-capacity instance when tests are completed. Modify the DB instance again when required.

**Answer:** C

**해설:**

> **문제:** 월 1회 48시간 테스트에만 사용하는 RDS MySQL 인스턴스가 있습니다. 컴퓨팅/메모리 사양을 유지하면서 비용을 줄이려면?

| 선지 | 번역 |
|------|------|
| A | 테스트 완료 시 DB 중지, 필요 시 재시작 |
| B | Auto Scaling 정책으로 자동 축소 |
| C | 스냅샷 생성 후 인스턴스 종료, 필요 시 복원 |
| D | 저용량 인스턴스로 수정 후 필요 시 다시 수정 |

**(A)** : 오답. RDS 인스턴스 중지는 최대 7일만 가능하고, 스토리지 비용은 계속 발생합니다.

**(B)** : 오답. RDS는 EC2처럼 Auto Scaling 정책을 직접 사용할 수 없습니다.

**(C) 정답** : 테스트 완료 후 **스냅샷 생성**하고 **인스턴스 종료**하면 인스턴스 실행 비용이 발생하지 않습니다. 스냅샷 비용만 발생하며, 필요 시 동일 사양으로 즉시 복원할 수 있습니다. → [📖 RDS 스냅샷 생성 후 인스턴스 종료 — 비용 절감](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(D)** : 오답. 매번 인스턴스 크기를 수정하면 다운타임이 발생하고 번거롭습니다.

**핵심 개념:** RDS 스냅샷 + 인스턴스 종료로 비용 절감, 월별 사용 패턴 최적화

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q694. A company that hosts its web application on AWS wants to ensure all Amazon EC2 instances, Amazon RDS DB instances, and Amazon Redshift clusters are configured with tags. The company wants to minimize the effort of configuring and operating this check. What should a solutions architect do to accomplish this?

**Options:**
- A) Use AWS Config rules to define and detect resources that are not properly tagged.
- B) Use Cost Explorer to display resources that are not properly tagged. Tag those resources manually.
- C) Write API calls to check all resources for proper tag allocation. Periodically run the code on an EC2 instance.
- D) Write API calls to check all resources for proper tag allocation. Schedule an AWS Lambda function through Amazon CloudWatch to periodically run the code.

**Answer:** A

**해설:**

> **문제:** EC2, RDS, Redshift 모두 태그가 있는지 확인하고 싶습니다. 설정 및 운영 노력을 최소화하려면?

| 선지 | 번역 |
|------|------|
| A | AWS Config 규칙으로 태그 미적용 리소스 감지 |
| B | Cost Explorer로 태그 미적용 리소스 표시, 수동 태그 |
| C | API 호출로 태그 확인 코드 작성, EC2 인스턴스에서 주기적 실행 |
| D | API 호출 코드 작성, CloudWatch로 Lambda 예약 실행 |

**(A) 정답** : **AWS Config 관리형 규칙**(예: required-tags)은 코드 없이 설정만으로 태그 미적용 리소스를 자동으로 감지하고 알립니다. 설정 및 운영 노력이 가장 적습니다. → [📖 AWS Config 관리형 규칙 — 태그 미적용 리소스 감지](/section/22-monitoring-audit-performance#aws-config)

**(B)** : 오답. 수동 태그 부착은 오버헤드가 높습니다.

**(C)** : 오답. EC2에서 코드 실행은 관리 오버헤드가 높습니다.

**(D)** : 오답. 코드 작성 및 Lambda 유지 관리가 필요합니다.

**핵심 개념:** AWS Config 태그 컴플라이언스 규칙, 최소 운영 오버헤드

**관련 노트:** [AWS Config](/section/22-monitoring-audit-performance#aws-config)

---

### Q695. A company runs an online marketplace web application on AWS. The application serves hundreds of thousands of users during peak hours. The company needs a scalable, near-real-time solution to share the details of millions of financial transactions with several other internal applications. Transactions also need to be processed to remove sensitive data before being stored in a document database for low-latency retrieval. What should a solutions architect recommend to meet these requirements?

**Options:**
- A) Store the transactions data into Amazon DynamoDB. Set up a rule in DynamoDB to remove sensitive data from every transaction upon write. Use DynamoDB Streams to share the transactions data with other applications.
- B) Stream the transactions data into Amazon Kinesis Data Firehose to store data in Amazon DynamoDB and Amazon S3. Use AWS Lambda integration with Kinesis Data Firehose to remove sensitive data. Other applications can consume the data stored in Amazon S3.
- C) Stream the transactions data into Amazon Kinesis Data Streams. Use AWS Lambda integration to remove sensitive data from every transaction and then store the transactions data in Amazon DynamoDB. Other applications can consume the transactions data off the Kinesis data stream.
- D) Store the batched transactions data in Amazon S3 as files. Use AWS Lambda to process every file and remove sensitive data before updating the files in Amazon S3. The Lambda function then stores the data in Amazon DynamoDB. Other applications can consume transaction files stored in Amazon S3.

**Answer:** C

**해설:**

> **문제:** 수십만 사용자의 수백만 금융 거래 데이터를 실시간으로 여러 내부 앱과 공유하고, 민감한 데이터를 제거한 후 문서 DB에 저장해야 합니다.

| 선지 | 번역 |
|------|------|
| A | DynamoDB에 저장 + 규칙으로 민감 데이터 제거 + DynamoDB Streams로 공유 |
| B | Kinesis Firehose → DynamoDB + S3, Lambda로 민감 데이터 제거 |
| C | Kinesis Data Streams → Lambda로 민감 데이터 제거 → DynamoDB 저장, Kinesis에서 다른 앱 소비 |
| D | S3에 배치 저장 → Lambda 처리 → DynamoDB |

**(A)** : 오답. DynamoDB 규칙으로 민감 데이터 제거는 네이티브 기능이 아닙니다.

**(B)** : 오답. Firehose는 실시간 스트리밍에는 부적합(배치 지향)하고 다른 앱이 S3에서 실시간 소비하기 어렵습니다.

**(C) 정답** : **Kinesis Data Streams**는 실시간 스트리밍을 지원하고 여러 소비자가 독립적으로 데이터를 읽을 수 있습니다. **Lambda**로 민감 데이터를 제거하고 **DynamoDB**에 저장합니다. 다른 앱들은 Kinesis 스트림에서 직접 소비합니다. → [📖 Kinesis Data Streams + Lambda — 실시간 스트리밍 처리](/section/15-integration-messaging#amazon-kinesis-data-streams)

**(D)** : 오답. 배치 처리로 실시간 요건을 충족하지 못합니다.

**핵심 개념:** Kinesis Data Streams 다중 소비자, Lambda 데이터 변환, DynamoDB 저장

**관련 노트:** [Amazon Kinesis Data Streams](/section/15-integration-messaging#amazon-kinesis-data-streams), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [AWS Lambda](/section/17-serverless-overview#aws-lambda)

---

### Q696. A company is preparing to launch a public-facing web application in the AWS Cloud. The architecture consists of Amazon EC2 instances within a VPC behind an Elastic Load Balancer (ELB). A third-party service is used for the DNS. The company's solutions architect must recommend a solution to detect and protect against large-scale DDoS attacks. Which solution meets these requirements?

**Options:**
- A) Enable Amazon GuardDuty on the account.
- B) Enable Amazon Inspector on the EC2 instances.
- C) Enable AWS Shield and assign Amazon Route 53 to it.
- D) Enable AWS Shield Advanced and assign the ELB to it.

**Answer:** D

**해설:**

> **문제:** VPC 내 ELB + EC2 구성의 퍼블릭 웹 앱을 대규모 DDoS 공격으로부터 감지 및 보호해야 합니다.

| 선지 | 번역 |
|------|------|
| A | GuardDuty 활성화 |
| B | EC2 인스턴스에 Inspector 활성화 |
| C | AWS Shield 활성화 후 Route 53에 할당 |
| D | AWS Shield Advanced 활성화 후 ELB에 할당 |

**(A)** : 오답. GuardDuty는 위협 감지이지 DDoS 방어가 아닙니다. → [📖 Amazon GuardDuty — 위협 감지, DDoS 방어 아님](/section/24-security-encryption#amazon-guardduty)

**(B)** : 오답. Inspector는 취약점 평가 서비스입니다. → [📖 Amazon Inspector — 취약점 평가](/section/24-security-encryption#amazon-inspector)

**(C)** : 오답. DNS가 서드파티이므로 Route 53에 할당하는 것은 의미가 없습니다. 또한 AWS Shield(기본)는 기본 DDoS 방어만 제공합니다.

**(D) 정답** : **AWS Shield Advanced**는 대규모 DDoS 공격에 대한 고급 보호를 제공합니다. **ELB**에 할당하면 애플리케이션으로 향하는 트래픽을 보호합니다. 24/7 DDoS 대응 팀(DRT) 지원도 포함됩니다. → [📖 AWS Shield Advanced — 고급 DDoS 방어 + DRT 지원](/section/24-security-encryption#aws-shield)

**핵심 개념:** AWS Shield Advanced, ELB DDoS 보호

**관련 노트:** [AWS Shield](/section/24-security-encryption#aws-shield), [DDoS 복원력 모범 사례](/section/24-security-encryption#ddos-복원력-모범-사례)

---

### Q697. A company is building an application in the AWS Cloud. The application will store data in Amazon S3 buckets in two AWS Regions. The company must use an AWS Key Management Service (AWS KMS) customer managed key to encrypt all data that is stored in the S3 buckets. The data in both S3 buckets must be encrypted and decrypted with the same KMS key. The data and the key must be stored in each of the two Regions. Which solution will meet these requirements with the LEAST operational overhead?

**Options:**
- A) Create an S3 bucket in each Region. Configure the S3 buckets to use server-side encryption with Amazon S3 managed encryption keys (SSE-S3). Configure replication between the S3 buckets.
- B) Create a customer managed multi-Region KMS key. Create an S3 bucket in each Region. Configure replication between the S3 buckets. Configure the application to use the KMS key with client-side encryption.
- C) Create a customer managed KMS key and an S3 bucket in each Region. Configure the S3 buckets to use server-side encryption with Amazon S3 managed encryption keys (SSE-S3). Configure replication between the S3 buckets.
- D) Create a customer managed KMS key and an S3 bucket in each Region. Configure the S3 buckets to use server-side encryption with AWS KMS keys (SSE-KMS). Configure replication between the S3 buckets.

**Answer:** B

**해설:**

> **문제:** 두 리전의 S3에 같은 KMS 고객 관리 키로 암호화해야 합니다. 키와 데이터 모두 두 리전에 있어야 합니다. 운영 오버헤드가 가장 적은 방법은?

| 선지 | 번역 |
|------|------|
| A | SSE-S3(Amazon 관리 키)로 암호화, 복제 구성 |
| B | 다중 리전 KMS 키 생성, S3 복제 구성, 클라이언트 측 암호화 |
| C | 각 리전에 KMS 키 + S3 생성, SSE-S3 암호화, 복제 |
| D | 각 리전에 KMS 키 + S3 생성, SSE-KMS 암호화, 복제 |

**(A)** : 오답. SSE-S3는 고객 관리 키가 아닌 AWS 관리 키를 사용합니다. → [📖 SSE-S3 — AWS 관리 키, 고객 관리 키 아님](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**(B) 정답** : **KMS 다중 리전 키(Multi-Region Key)**를 생성하면 두 리전에 동일한 키가 복제됩니다. 클라이언트 측 암호화로 데이터를 암호화하면 두 리전에서 같은 키로 암호화/복호화가 가능합니다. → [📖 KMS 다중 리전 키 — 두 리전 동일 키 복제](/section/24-security-encryption#aws-kms-key-management-service)

**(C)** : 오답. SSE-S3는 KMS 고객 관리 키를 사용하지 않습니다.

**(D)** : 오답. 각 리전에 별도 KMS 키를 만들면 같은 키로 암호화/복호화하는 요건을 충족하지 못합니다.

**핵심 개념:** KMS 다중 리전 키(Multi-Region Key), 다중 리전 암호화 전략

**관련 노트:** [AWS KMS Key Management Service](/section/24-security-encryption#aws-kms-key-management-service), [S3 Replication 복제](/section/10-amazon-s3#s3-replication-복제)

---

### Q698. A company recently launched a variety of new workloads on Amazon EC2 instances in its AWS account. The company needs to create a strategy to access and administer the instances remotely and securely. The company needs to implement a repeatable process that works with native AWS services and follows the AWS Well-Architected Framework. Which solution will meet these requirements with the LEAST operational overhead?

**Options:**
- A) Use the EC2 serial console to directly access the terminal interface of each instance for administration.
- B) Attach the appropriate IAM role to each existing instance and new instance. Use AWS Systems Manager Session Manager to establish a remote SSH session.
- C) Create an administrative SSH key pair. Load the public key into each EC2 instance. Deploy a bastion host in a public subnet to provide a tunnel for administration of each instance.
- D) Establish an AWS Site-to-Site VPN connection. Instruct administrators to use their local on-premises machines to connect directly to the instances by using SSH keys across the VPN tunnel.

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스를 안전하게 원격 접근/관리하는 반복 가능한 프로세스가 필요합니다. AWS 네이티브 서비스와 Well-Architected Framework를 따라야 합니다.

| 선지 | 번역 |
|------|------|
| A | EC2 시리얼 콘솔로 터미널 직접 접근 |
| B | IAM 역할 연결 + AWS Systems Manager Session Manager로 SSH 세션 |
| C | SSH 키 쌍 생성 + 배스천 호스트 배포 |
| D | Site-to-Site VPN + SSH 키로 직접 연결 |

**(A)** : 오답. EC2 시리얼 콘솔은 비상 접근용으로 일반 관리에 적합하지 않습니다.

**(B) 정답** : **AWS Systems Manager Session Manager**는 SSH 키나 배스천 호스트 없이 IAM 기반으로 EC2에 안전하게 접근합니다. Well-Architected Framework 권장 사항이며 운영 오버헤드가 최소입니다. → [📖 AWS Systems Manager Session Manager — SSH 없이 IAM 기반 접근](/section/28-other-services#aws-systems-manager-ssm)

**(C)** : 오답. SSH 키 관리와 배스천 호스트 운영은 오버헤드가 높습니다.

**(D)** : 오답. Site-to-Site VPN 설정과 유지 관리가 복잡합니다. → [📖 Site-to-Site VPN — 온프레미스 연결, 복잡한 설정](/section/25-vpc#sitetosite-vpn)

**핵심 개념:** Systems Manager Session Manager, SSH 없는 EC2 접근, 최소 운영 오버헤드

**관련 노트:** [AWS Systems Manager SSM](/section/28-other-services#aws-systems-manager-ssm), [Bastion Host](/section/25-vpc#bastion-host)

---

### Q699. A development team needs to host a website that will be accessed by other teams. The website contents consist of HTML, CSS, client-side JavaScript, and images. Which method is the MOST cost-effective for hosting the website?

**Options:**
- A) Containerize the website and host it in AWS Fargate.
- B) Create an Amazon S3 bucket and host the website there.
- C) Deploy a web server on an Amazon EC2 instance to host the website.
- D) Configure an Application Load Balancer with an AWS Lambda target that uses the Express.js framework.

**Answer:** B

**해설:**

> **문제:** HTML, CSS, JavaScript, 이미지로 구성된 정적 웹사이트를 호스팅해야 합니다. 가장 비용 효율적인 방법은?

| 선지 | 번역 |
|------|------|
| A | AWS Fargate로 컨테이너화하여 호스팅 |
| B | Amazon S3 버킷에 웹사이트 호스팅 |
| C | EC2 인스턴스에 웹 서버 배포 |
| D | ALB + Lambda + Express.js 프레임워크 |

**(A)** : 오답. Fargate는 컨테이너 실행 비용이 발생하며 정적 사이트에 과도합니다.

**(B) 정답** : **Amazon S3 정적 웹사이트 호스팅**은 서버 비용 없이 저렴한 스토리지 요금과 데이터 전송 요금만 발생합니다. HTML, CSS, JS, 이미지 같은 정적 콘텐츠에 가장 비용 효율적입니다. → [📖 S3 정적 웹사이트 호스팅 — 서버 비용 없음](/section/10-amazon-s3#s3-정적-웹사이트-호스팅)

**(C)** : 오답. EC2 인스턴스는 지속적인 실행 비용이 발생합니다.

**(D)** : 오답. ALB + Lambda는 정적 사이트에 과도하고 비용이 높습니다.

**핵심 개념:** S3 정적 웹사이트 호스팅, 정적 콘텐츠 최저 비용 솔루션

**관련 노트:** [S3 정적 웹사이트 호스팅](/section/10-amazon-s3#s3-정적-웹사이트-호스팅)

---

### Q700. A company has a production workload that runs on 1,000 Amazon EC2 Linux instances. The workload is powered by third-party software. The company needs to patch the third-party software on all EC2 instances as quickly as possible to remediate a critical security vulnerability. What should a solutions architect do to meet these requirements?

**Options:**
- A) Create an AWS Lambda function to apply the patch to all EC2 instances.
- B) Configure AWS Systems Manager Patch Manager to apply the patch to all EC2 instances.
- C) Schedule an AWS Systems Manager maintenance window to apply the patch to all EC2 instances.
- D) Use AWS Systems Manager Run Command to run a custom command that applies the patch to all EC2 instances.

**Answer:** D

**해설:**

> **문제:** 1,000개 EC2 Linux 인스턴스에 서드파티 소프트웨어의 중요 보안 취약점 패치를 가능한 빨리 적용해야 합니다.

| 선지 | 번역 |
|------|------|
| A | Lambda 함수로 모든 EC2에 패치 적용 |
| B | Systems Manager Patch Manager로 패치 적용 |
| C | Systems Manager 유지 관리 창을 예약하여 패치 적용 |
| D | Systems Manager Run Command로 커스텀 패치 명령 실행 |

**(A)** : 오답. Lambda로 1,000개 EC2에 직접 패치를 적용하는 것은 복잡하고 비실용적입니다.

**(B)** : 오답. Patch Manager는 AWS 관리 패치 기준선을 사용하며, 서드파티 소프트웨어 커스텀 패치에는 추가 설정이 필요하고 바로 실행하기 어렵습니다.

**(C)** : 오답. 유지 관리 창은 예약된 시간에 실행되므로 즉각적이지 않습니다.

**(D) 정답** : **AWS Systems Manager Run Command**는 즉시 1,000개 인스턴스에 커스텀 명령을 동시에 실행할 수 있습니다. 서드파티 소프트웨어 패치 명령을 즉시 실행하는 데 가장 적합합니다. → [📖 AWS Systems Manager Run Command — 즉시 다수 인스턴스 명령 실행](/section/28-other-services#aws-systems-manager-ssm)

**핵심 개념:** Systems Manager Run Command, 즉시 다수 인스턴스 명령 실행

**관련 노트:** [AWS Systems Manager SSM](/section/28-other-services#aws-systems-manager-ssm)

---

