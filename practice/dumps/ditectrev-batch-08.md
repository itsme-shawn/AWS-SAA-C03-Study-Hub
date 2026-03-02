# Ditectrev SAA-C03 Practice Questions — Batch 08 (Q351-Q400)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---


### Q351. An accountant asks you to design a small VPC network for him and, due to the nature of his business, just needs something where the workload on the network will be low, and dynamic data will be accessed infrequently. Being an accountant, low cost is also a major factor. Which EBS volume type would best suit his requirements?

**Options:**
- A) Magnetic.
- B) Any, as they all perform the same and cost the same.
- C) General Purpose (SSD).
- D) Magnetic or Provisioned IOPS (SSD).

**Answer:** A

**해설:**

> **문제:** 회계사를 위한 소규모 VPC 네트워크를 설계합니다. 네트워크 워크로드가 낮고 동적 데이터에 자주 접근하지 않으며 비용이 중요한 요소입니다. 가장 적합한 EBS 볼륨 유형은?

| 선지 | 번역 |
|------|------|
| A | Magnetic(마그네틱). |
| B | 모두 동일한 성능과 비용이므로 어떤 것이든 가능합니다. |
| C | General Purpose SSD. |
| D | Magnetic 또는 Provisioned IOPS SSD. |

**(A) 정답** : Magnetic(HDD) 볼륨은 가장 저렴한 EBS 옵션으로, 자주 접근하지 않는 데이터와 낮은 워크로드 환경에 적합합니다. 비용 최우선인 경우 이상적입니다.

**(B)** : EBS 볼륨 유형에 따라 성능과 비용이 다릅니다.

**(C)** : GP SSD는 Magnetic보다 비용이 높습니다.

**(D)** : Provisioned IOPS는 고성능 워크로드용으로 비용이 가장 높습니다.

**핵심 개념:** EBS 볼륨 유형별 비용 및 용도 — Magnetic: 저비용 비빈번 접근 / GP SSD: 일반 / PIOPS: 고성능

---

### Q352. Your company currently has a 2-tier web application running in an on-premises data center. You have experienced several infrastructure failures in the past two months resulting in significant financial losses. Your CIO is strongly agreeing to move the application to AWS. While working on achieving buy-in from the other company executives, he asks you to develop a disaster recovery plan to help improve Business continuity in the short term. He specifies a target Recovery Time Objective (RTO) of 4 hours and a Recovery Point Objective (RPO) of 1 hour or less. He also asks you to implement the solution within 2 weeks. Your database is 200GB in size and you have a 20Mbps Internet connection. How would you do this while minimizing costs?

**Options:**
- A) Create an EBS backed private AMI which includes a fresh install of your application. Develop a CloudFormation template which includes your AMI and the required EC2, AutoScaling, and ELB resources to support deploying the application across Multiple Availability Zones. Asynchronously replicate transactions from your on-premises database to a database instance in AWS across a secure VPN connection.
- B) Deploy your application on EC2 instances within an Auto Scaling group across multiple availability zones. Asynchronously replicate transactions from your on-premises database to a database instance in AWS across a secure VPN connection.
- C) Create an EBS backed private AMI which includes a fresh install of your application. Setup a script in your data center to backup the local database every 1 hour and to encrypt and copy the resulting file to an S3 bucket using multi-part upload.
- D) Install your application on a compute-optimized EC2 instance capable of supporting the application's average load. Synchronously replicate transactions from your on-premises database to a database instance in AWS across a secure Direct Connect connection.

**Answer:** A

**해설:**

> **문제:** 온프레미스 2티어 웹 애플리케이션의 DR 계획: RTO 4시간, RPO 1시간, 2주 내 구현, 비용 최소화. 200GB DB, 20Mbps 인터넷 연결. 어떻게 구현합니까?

| 선지 | 번역 |
|------|------|
| A | EBS 백업 AMI 생성 + CloudFormation 템플릿으로 Multi-AZ 배포 + VPN으로 DB 비동기 복제. |
| B | Auto Scaling 그룹으로 EC2 배포 + VPN으로 DB 비동기 복제(AMI/CloudFormation 없음). |
| C | EBS 백업 AMI 생성 + 1시간마다 DB 백업 스크립트로 S3에 암호화 업로드. |
| D | 컴퓨팅 최적화 EC2 인스턴스 + Direct Connect로 DB 동기 복제. |

**(A) 정답** : CloudFormation 템플릿과 AMI를 준비하면 RTO 4시간 내 복구가 가능합니다. VPN을 통한 비동기 DB 복제로 RPO 1시간을 달성할 수 있습니다. 비용 효율적이면서 2주 내 구현 가능합니다.

**(B)** : AMI와 CloudFormation 없이 수동 배포는 RTO 4시간을 충족하기 어렵습니다.

**(C)** : S3 백업만으로는 RTO 4시간 내 복구가 어렵습니다. 복구 시 데이터 로드 시간이 필요합니다.

**(D)** : Direct Connect 설치는 2주 내 불가능하며, 동기 복제는 20Mbps 연결에서 성능 문제가 발생합니다.

**핵심 개념:** DR 계획 — RTO/RPO 요건 충족을 위한 AMI + CloudFormation + VPN DB 복제 조합

---

### Q353. A customer implemented AWS Storage Gateway with a gateway-cached volume at their main office. An event takes the link between the main and branch office offline. Which methods will enable the branch office to access their data? (Choose 3 answers)

**Options:**
- A) Use a HTTPS GET to the Amazon S3 bucket where the files are located.
- B) Restore by implementing a lifecycle policy on the Amazon S3 bucket.
- C) Make an Amazon Glacier Restore API call to load the files into another Amazon S3 bucket within four to six hours.
- D) Launch a new AWS Storage Gateway instance AMI in Amazon EC2, and restore from a gateway snapshot.
- E) Create an Amazon EBS volume from a gateway snapshot, and mount it to an Amazon EC2 instance.
- F) Launch an AWS Storage Gateway virtual iSCSI device at the branch office, and restore from a gateway snapshot.

**Answer:** D, E, F

**해설:**

> **문제:** 본사에서 gateway-cached 볼륨으로 Storage Gateway를 구현한 상황에서 본사-지사 간 링크가 끊겼습니다. 지사에서 데이터에 접근할 수 있는 방법은?

| 선지 | 번역 |
|------|------|
| A | 파일이 있는 S3 버킷에 HTTPS GET을 사용한다. |
| B | S3 버킷에 수명 주기 정책을 구현하여 복원한다. |
| C | Glacier Restore API를 호출하여 4~6시간 내에 S3로 로드한다. |
| D | EC2에서 새 Storage Gateway AMI를 시작하고 게이트웨이 스냅샷에서 복원한다. |
| E | 게이트웨이 스냅샷에서 EBS 볼륨을 생성하고 EC2 인스턴스에 마운트한다. |
| F | 지사에서 Storage Gateway 가상 iSCSI 장치를 시작하고 게이트웨이 스냅샷에서 복원한다. |

**(A)** : S3 버킷에 직접 HTTPS GET은 Storage Gateway 암호화/형식 때문에 데이터를 직접 읽을 수 없습니다.

**(B)** : 수명 주기 정책은 데이터 접근을 위한 방법이 아닙니다.

**(C)** : Gateway-cached 볼륨 데이터는 Glacier가 아닌 S3에 저장됩니다.

**(D) 정답** : EC2에서 새 Storage Gateway를 시작하고 스냅샷으로 복원하면 데이터에 접근할 수 있습니다.

**(E) 정답** : 게이트웨이 스냅샷에서 EBS 볼륨을 생성하고 EC2에 마운트하면 데이터에 직접 접근 가능합니다.

**(F) 정답** : 지사에서 가상 iSCSI Storage Gateway를 시작하고 스냅샷으로 복원하면 데이터에 접근할 수 있습니다.

**핵심 개념:** Storage Gateway 재해 복구 — 스냅샷 기반 복원 방법 (EC2 Storage Gateway, EBS 볼륨, 가상 iSCSI)

---

### Q354. Your customer wants to consolidate their log streams (access logs, application logs, security logs, etc.) in one single system. Once consolidated, the customer wants to analyze these logs in real-time based on heuristics. From time to time, the customer needs to validate heuristics, which requires going back to data samples extracted from the last 12 hours. What is the best approach to meet your customer's requirements?

**Options:**
- A) Send all the log events to Amazon SQS. Setup an Auto Scaling group of EC2 servers to consume the logs and apply the heuristics.
- B) Send all the log events to Amazon Kinesis. Develop a client process to apply heuristics on the logs.
- C) Configure Amazon Cloud Trail to receive custom logs. Use EMR to apply heuristics to the logs.
- D) Setup an Auto Scaling group of EC2 syslogd servers. Store the logs on S3. Use EMR to apply heuristics on the logs.

**Answer:** B

**해설:**

> **문제:** 다양한 로그 스트림을 통합하여 실시간 분석하고, 최근 12시간 데이터 샘플에 대한 검증도 필요합니다. 가장 적합한 접근 방식은?

| 선지 | 번역 |
|------|------|
| A | 로그를 SQS에 전송하고 Auto Scaling EC2 서버로 소비 및 분석. |
| B | 로그를 Kinesis에 전송하고 클라이언트 프로세스로 실시간 분석. |
| C | CloudTrail로 커스텀 로그를 수신하고 EMR로 분석. |
| D | EC2 syslogd 서버에 로그 수집, S3에 저장, EMR로 분석. |

**(A)** : SQS는 실시간 스트리밍 분석보다는 메시지 큐에 적합하며, 12시간 데이터 재처리가 어렵습니다.

**(B) 정답** : Amazon Kinesis는 실시간 로그 스트리밍 및 분석에 최적화되어 있으며, 최대 24시간(기본값)의 데이터 보존으로 12시간 데이터 재검증이 가능합니다.

**(C)** : CloudTrail은 AWS API 이벤트 로깅용이며 커스텀 로그 수집에 적합하지 않습니다.

**(D)** : EMR은 배치 처리에 적합하며 실시간 분석에는 지연이 있습니다.

**핵심 개념:** Amazon Kinesis — 실시간 로그 스트리밍 및 분석, 데이터 보존(12~24시간)을 통한 재처리

---

### Q355. Can the string value of 'Key' be prefixed with laws?

**Options:**
- A) No.
- B) Only for EC2 not S3.
- C) Yes.
- D) Only for S3 not EC.

**Answer:** A

**해설:**

> **문제:** 'Key'의 문자열 값에 'aws:' 접두사를 붙일 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 아니요. |
| B | EC2에서만 가능하고 S3는 불가합니다. |
| C | 예. |
| D | S3에서만 가능하고 EC2는 불가합니다. |

**(A) 정답** : AWS 태그 키는 'aws:' 접두사를 사용할 수 없습니다. 이 접두사는 AWS 시스템에서 예약된 것으로, 사용자가 이 접두사로 시작하는 태그를 생성하면 오류가 발생합니다.

**(B)** : 서비스에 관계없이 'aws:' 접두사는 예약되어 있습니다.

**(C)** : 불가합니다.

**(D)** : 서비스에 관계없이 불가합니다.

**핵심 개념:** AWS 태그 키 제약 — 'aws:' 접두사는 AWS 예약 접두사로 사용자 태그에 사용 불가

---

### Q356. You are configuring your company's application to use Auto Scaling and need to move user state information. Which of the following AWS services provides a shared data store with durability and low latency?

**Options:**
- A) AWS ElastiCache Memcached.
- B) Amazon Simple Storage Service.
- C) Amazon EC2 instance storage.
- D) Amazon DynamoDB.

**Answer:** B

**해설:**

> **문제:** Auto Scaling을 사용하는 애플리케이션에서 사용자 상태 정보를 저장하기 위한 내구성과 낮은 지연 시간을 가진 공유 데이터 저장소는?

| 선지 | 번역 |
|------|------|
| A | AWS ElastiCache Memcached. |
| B | Amazon S3. |
| C | Amazon EC2 인스턴스 스토리지. |
| D | Amazon DynamoDB. |

**(A)** : ElastiCache Memcached는 낮은 지연 시간을 제공하지만 데이터 내구성이 없습니다(노드 장애 시 데이터 손실).

**(B) 정답** : 이 문제의 정답은 S3로 표시되어 있습니다. S3는 높은 내구성(11 9s)을 제공하는 공유 스토리지입니다. 단, 실제 세션 저장에는 DynamoDB나 ElastiCache Redis가 더 적합한 경우가 많습니다.

**(C)** : EC2 인스턴스 스토리지는 인스턴스 종료 시 소실되며 다른 인스턴스와 공유 불가합니다.

**(D)** : DynamoDB도 내구성과 낮은 지연 시간을 제공하지만, 이 문제에서는 S3가 정답입니다.

**핵심 개념:** Auto Scaling 환경에서의 상태 저장소 — 외부 공유 스토리지 사용 필요

---

### Q357. Your company previously configured a heavily used, dynamically routed VPN connection between your on-premises data center and AWS. You recently provisioned a DirectConnect connection and would like to start using the new connection. After configuring DirectConnect settings in the AWS Console, which of the following options will provide the most seamless transition for your users?

**Options:**
- A) Delete your existing VPN connection to avoid routing loops. Configure your DirectConnect router with the appropriate settings and verify network traffic is leveraging DirectConnect.
- B) Configure your DirectConnect router with a higher BGP priority than your VPN router. Verify network traffic is leveraging DirectConnect and then delete your existing VPN connection.
- C) Update your VPC route tables to point to the DirectConnect connection. Configure your DirectConnect router with the appropriate settings. Verify network traffic is leveraging DirectConnect and then delete the VPN connection.
- D) Configure your DirectConnect router. Update your VPC route tables to point to the DirectConnect connection. Configure your VPN connection with a higher BGP priority and verify network traffic is leveraging the DirectConnect connection.

**Answer:** D

**해설:**

> **문제:** 기존 VPN 연결이 있는 상태에서 Direct Connect를 추가했습니다. 사용자에게 가장 원활한 전환을 제공하는 방법은?

| 선지 | 번역 |
|------|------|
| A | VPN을 먼저 삭제하고 Direct Connect 라우터를 구성한다. |
| B | Direct Connect 라우터의 BGP 우선순위를 VPN보다 높게 설정하고, 검증 후 VPN을 삭제한다. |
| C | VPC 라우트 테이블을 Direct Connect로 업데이트하고 라우터를 구성한 후 VPN을 삭제한다. |
| D | Direct Connect 라우터를 구성하고 VPC 라우트 테이블을 업데이트한 후 VPN을 높은 BGP 우선순위로 설정하고 Direct Connect 트래픽을 검증한다. |

**(A)** : VPN을 먼저 삭제하면 Direct Connect 구성 중 연결이 끊어질 수 있어 원활한 전환이 불가능합니다.

**(B)** : BGP 우선순위 조정은 올바른 방향이지만, 검증 전 VPN 유지가 중요합니다.

**(C)** : 라우트 테이블 업데이트만으로는 충분하지 않습니다.

**(D) 정답** : Direct Connect 라우터를 먼저 구성하고 VPC 라우트 테이블을 업데이트한 후, VPN을 백업으로 유지하면서 Direct Connect 트래픽을 검증합니다. 이렇게 하면 원활한 전환과 동시에 백업 연결을 유지할 수 있습니다.

**핵심 개념:** VPN에서 Direct Connect로의 원활한 전환 — 라우트 테이블 업데이트 및 BGP 우선순위 조정, 검증 후 VPN 삭제

---

### Q358. After setting up several database instances in Amazon Relational Database Service (Amazon RDS) you decide that you need to track the performance and health of your databases. How can you do this?

**Options:**
- A) Subscribe to Amazon RDS events to be notified when changes occur with a DB instance, DB snapshot, DB parameter group, or DB security group.
- B) Use the free Amazon CloudWatch service to monitor the performance and health of a DB instance.
- C) All of the items listed will track the performance and health of a database.
- D) View, download, or watch database log files using the Amazon RDS console or Amazon RDS APIs. You can also query some database log files that are loaded into database tables.

**Answer:** C

**해설:**

> **문제:** Amazon RDS 데이터베이스 인스턴스의 성능과 상태를 모니터링하는 방법은?

| 선지 | 번역 |
|------|------|
| A | RDS 이벤트를 구독하여 DB 인스턴스, 스냅샷, 파라미터 그룹, 보안 그룹 변경 시 알림 수신. |
| B | CloudWatch를 사용하여 DB 인스턴스 성능 및 상태 모니터링. |
| C | 위의 모든 항목이 데이터베이스 성능 및 상태를 추적합니다. |
| D | RDS 콘솔 또는 API를 통해 DB 로그 파일 조회, 다운로드, 확인. |

**(A)** : RDS 이벤트 구독은 유효한 모니터링 방법이지만 단독으로는 불완전합니다.

**(B)** : CloudWatch는 유효한 모니터링 방법이지만 단독으로는 불완전합니다.

**(C) 정답** : RDS 이벤트 구독, CloudWatch 메트릭 모니터링, DB 로그 파일 조회 모두 RDS 성능 및 상태를 추적하는 유효한 방법입니다.

**(D)** : 로그 파일 조회는 유효한 방법이지만 단독으로는 불완전합니다.

**핵심 개념:** RDS 모니터링 방법 — 이벤트 구독 + CloudWatch + 로그 파일 조합

---

### Q359. You deployed your company website using Elastic Beanstalk and you enabled log file rotation to S3. An Elastic MapReduce job is periodically analyzing the logs on S3 to build a usage dashboard that you share with your CIO. You recently improved overall performance of the website using CloudFront for dynamic content delivery and your website as the origin. After this architectural change, the usage dashboard shows that the traffic on your website dropped by an order of magnitude. How do you fix your usage dashboard?

**Options:**
- A) Enable CloudFront to deliver access logs to S3 and use them as input of the Elastic MapReduce job.
- B) Turn on Cloud Trail and use trail log tiles on S3 as input of the Elastic MapReduce job.
- C) Change your log collection process to use Cloud Watch ELB metrics as input of the Elastic Map Reduce job.
- D) Use Elastic Beanstalk 'Rebuild Environment' option to update log delivery to the Elastic Map Reduce job.
- E) Use Elastic Beanstalk 'Restart App server(s)' option to update log delivery to the Elastic Map Reduce job.

**Answer:** A

**해설:**

> **문제:** Elastic Beanstalk + CloudFront 아키텍처에서 CloudFront 추가 후 대시보드가 트래픽이 크게 감소한 것으로 표시됩니다. 어떻게 수정합니까?

| 선지 | 번역 |
|------|------|
| A | CloudFront가 S3에 액세스 로그를 전달하도록 활성화하고 EMR 작업의 입력으로 사용한다. |
| B | CloudTrail을 켜고 S3의 트레일 로그를 EMR 작업의 입력으로 사용한다. |
| C | CloudWatch ELB 메트릭을 EMR 작업의 입력으로 사용한다. |
| D | Elastic Beanstalk 'Rebuild Environment' 옵션을 사용한다. |
| E | Elastic Beanstalk 'Restart App server(s)' 옵션을 사용한다. |

**(A) 정답** : CloudFront를 추가하면 대부분의 요청이 CloudFront 엣지에서 처리되어 원본 서버(Elastic Beanstalk)에 도달하지 않습니다. 따라서 Elastic Beanstalk 로그에는 CloudFront가 캐시에서 처리한 요청이 기록되지 않습니다. CloudFront의 액세스 로그를 S3에 활성화하고 EMR 입력으로 사용해야 전체 트래픽을 정확히 분석할 수 있습니다.

**(B)** : CloudTrail은 API 호출 로그이며 웹 트래픽 분석에 적합하지 않습니다.

**(C)** : ELB 메트릭은 CloudFront 앞단 트래픽을 포함하지 않습니다.

**(D, E)** : Elastic Beanstalk 재시작/재구축은 로그 소스 문제를 해결하지 못합니다.

**핵심 개념:** CloudFront 도입 후 로그 분석 — CloudFront 액세스 로그를 S3에 활성화하여 실제 트래픽 분석

---

### Q360. A customer has a 10 GB AWS Direct Connect connection to an AWS region where they have a web application hosted on Amazon Elastic Computer Cloud (EC2). The application has dependencies on an on-premises mainframe database that uses a BASE (Basic Available, Sort stale Eventual consistency) rather than an ACID consistency model. The application is exhibiting undesirable behavior because the database is not able to handle the volume of writes. How can you reduce the load on your on-premises database resources in the most cost-effective way?

**Options:**
- A) Use an Amazon Elastic MapReduce (EMR) S3DistCp as a synchronization mechanism between the on-premises database and a Hadoop cluster on AWS.
- B) Modify the application to write to an Amazon SQS queue and develop a worker process to flush the queue to the on-premises database.
- C) Modify the application to use DynamoDB to feed an EMR cluster which uses a map function to write to the on-premises database.
- D) Provision an RDS read-replica database on AWS to handle the writes and synchronize the two databases using Data Pipeline.

**Answer:** B

**해설:**

> **문제:** BASE 일관성 모델을 사용하는 온프레미스 메인프레임 DB가 쓰기 부하를 처리하지 못합니다. 가장 비용 효율적으로 DB 부하를 줄이는 방법은?

| 선지 | 번역 |
|------|------|
| A | EMR S3DistCp를 온프레미스 DB와 Hadoop 클러스터 간 동기화 메커니즘으로 사용한다. |
| B | 애플리케이션이 SQS 큐에 쓰도록 수정하고 워커 프로세스가 큐를 DB에 플러시한다. |
| C | 애플리케이션이 DynamoDB에 쓰도록 수정하고 EMR 클러스터가 온프레미스 DB에 쓴다. |
| D | AWS에 RDS Read Replica를 프로비저닝하고 Data Pipeline으로 DB를 동기화한다. |

**(A)** : EMR S3DistCp는 복잡한 설정이 필요하며 비용 효율적이지 않습니다.

**(B) 정답** : BASE 모델은 최종 일관성을 허용하므로, SQS 큐에 쓰기를 버퍼링하고 워커 프로세스가 순차적으로 DB에 플러시하는 방식이 적합합니다. SQS는 비용이 낮고 설정이 간단합니다.

**(C)** : DynamoDB + EMR 조합은 복잡하고 불필요한 비용이 발생합니다.

**(D)** : RDS Read Replica는 읽기 부하 분산용이며 쓰기 부하 감소에 직접 도움이 되지 않습니다.

**핵심 개념:** SQS를 이용한 쓰기 버퍼링 — BASE 모델 애플리케이션의 DB 쓰기 부하 감소

---

### Q361. You are very concerned about security on your network because you have multiple programmers testing APIs and SDKs and you have no idea what is happening. You think CloudTrail may help but are not sure what it does. Which of the following statements best describes the AWS service CloudTrail?

**Options:**
- A) With AWS CloudTrail you can get a history of AWS API calls and related events for your account.
- B) With AWS CloudTrail you can get a history of IAM users for your account.
- C) With AWS CloudTrail you can get a history of S3 logfiles for your account.
- D) With AWS CloudTrail you can get a history of CloudFormation JSON scripts used for your account.

**Answer:** A

**해설:**

> **문제:** 여러 프로그래머가 API와 SDK를 테스트하고 있어 보안이 우려됩니다. CloudTrail이 어떤 서비스인지 설명하는 가장 적절한 설명은?

| 선지 | 번역 |
|------|------|
| A | AWS CloudTrail로 계정의 AWS API 호출 기록과 관련 이벤트를 조회할 수 있습니다. |
| B | AWS CloudTrail로 계정의 IAM 사용자 기록을 조회할 수 있습니다. |
| C | AWS CloudTrail로 계정의 S3 로그파일 기록을 조회할 수 있습니다. |
| D | AWS CloudTrail로 계정에서 사용된 CloudFormation JSON 스크립트 기록을 조회할 수 있습니다. |

**(A) 정답** : AWS CloudTrail은 AWS 계정에서 발생한 모든 API 호출을 기록하는 서비스입니다. 누가 어떤 API를 언제, 어디서 호출했는지 추적할 수 있어 보안 감사와 컴플라이언스에 필수적입니다.

**(B)** : IAM 사용자 기록이 아닌 API 호출 기록입니다.

**(C)** : S3 로그파일이 아닌 API 호출 기록입니다.

**(D)** : CloudFormation 스크립트 기록이 아닙니다.

**핵심 개념:** AWS CloudTrail — AWS API 호출 감사 로깅 서비스, 보안 및 컴플라이언스

---

### Q362. Every user you create in the IAM system starts with [...].

**Options:**
- A) partial permissions.
- B) full permissions.
- C) no permissions.

**Answer:** C

**해설:**

> **문제:** IAM 시스템에서 생성하는 모든 사용자는 [...]로 시작합니다.

| 선지 | 번역 |
|------|------|
| A | 일부 권한. |
| B | 전체 권한. |
| C | 권한 없음. |

**(A)** : 부분 권한으로 시작하지 않습니다.

**(B)** : 전체 권한으로 시작하지 않습니다.

**(C) 정답** : IAM에서 새로 생성된 사용자는 기본적으로 아무 권한도 없습니다. 명시적으로 정책을 연결해야만 AWS 리소스에 접근할 수 있습니다. 이는 최소 권한 원칙(Principle of Least Privilege)을 따릅니다.

**핵심 개념:** IAM 최소 권한 원칙 — 새 사용자는 기본 권한 없음, 명시적 권한 부여 필요

---

### Q363. Amazon S3 allows you to set per-file permissions to grant read and/or write access. However you have decided that you want an entire bucket with 100 files already in it to be accessible to the public. You don't want to go through 100 files individually and set permissions. What would be the best way to do this?

**Options:**
- A) Move the bucket to a new region.
- B) Add a bucket policy to the bucket.
- C) Move the files to a new bucket.
- D) Use Amazon EBS instead of S3.

**Answer:** B

**해설:**

> **문제:** 100개의 파일이 있는 S3 버킷 전체를 공개 접근 가능하게 만들고 싶습니다. 파일 100개를 개별적으로 설정하지 않고 가장 좋은 방법은?

| 선지 | 번역 |
|------|------|
| A | 버킷을 새 리전으로 이동한다. |
| B | 버킷에 버킷 정책을 추가한다. |
| C | 파일을 새 버킷으로 이동한다. |
| D | S3 대신 Amazon EBS를 사용한다. |

**(A)** : 리전 이동은 접근 권한 변경과 무관합니다.

**(B) 정답** : 버킷 정책을 사용하면 버킷 전체에 대한 공개 읽기 접근을 한 번에 설정할 수 있습니다. 개별 파일 권한을 변경할 필요가 없습니다.

**(C)** : 새 버킷으로 이동해도 같은 문제가 발생합니다.

**(D)** : EBS는 공개 접근에 적합하지 않습니다.

**핵심 개념:** S3 버킷 정책 — 버킷 전체에 대한 일괄 접근 제어

---

### Q364. You are designing an SSL/TLS solution that requires HTTPS clients to be authenticated by the Web server using client certificate authentication. The solution must be resilient. Which of the following options would you consider for configuring the web server infrastructure? (Choose 2 answers)

**Options:**
- A) Configure ELB with TCP listeners on TCP/443. And place the Web servers behind it.
- B) Configure your Web servers with EIPS Place the Web servers in a Route 53 Record Set and configure health checks against all Web servers.
- C) Configure ELB with HTTPS listeners, and place the Web servers behind it.
- D) Configure your web servers as the origins for a CloudFront distribution. Use custom SSL certificates on your CloudFront distribution.

**Answer:** A, B

**해설:**

> **문제:** HTTPS 클라이언트가 클라이언트 인증서로 웹 서버에 인증해야 하는 SSL/TLS 솔루션을 설계합니다. 탄력성(복원력)도 필요합니다. 어떤 구성을 고려해야 합니까?

| 선지 | 번역 |
|------|------|
| A | ELB를 TCP/443 TCP 리스너로 구성하고 웹 서버를 뒤에 배치한다. |
| B | 웹 서버에 EIP를 구성하고 Route 53 레코드 세트에 등록하여 헬스 체크를 구성한다. |
| C | ELB를 HTTPS 리스너로 구성하고 웹 서버를 뒤에 배치한다. |
| D | 웹 서버를 CloudFront 배포의 오리진으로 구성하고 커스텀 SSL 인증서를 사용한다. |

**(A) 정답** : 클라이언트 인증서 인증은 ELB가 SSL을 종료하지 않아야 합니다. TCP 리스너(패스스루 모드)를 사용하면 SSL 협상이 웹 서버까지 전달되어 클라이언트 인증서 검증이 가능합니다.

**(B) 정답** : EIP와 Route 53 헬스 체크를 사용하면 복원력을 제공하면서 각 웹 서버가 SSL을 직접 종료하여 클라이언트 인증서를 검증할 수 있습니다.

**(C)** : HTTPS 리스너는 ELB에서 SSL을 종료하므로 클라이언트 인증서가 웹 서버에 전달되지 않습니다.

**(D)** : CloudFront는 클라이언트 인증서 인증을 지원하지 않습니다.

**핵심 개념:** 클라이언트 인증서 인증 — ELB TCP 패스스루 또는 직접 웹 서버 SSL 종료 필요

---

### Q365. Which of the following are use cases for Amazon DynamoDB? (Choose 3 answers)

**Options:**
- A) Storing BLOB data.
- B) Managing web sessions.
- C) Storing JSON documents.
- D) Storing metadata for Amazon S3 objects.
- E) Running relational joins and complex updates.
- F) Storing large amounts of infrequently accessed data.

**Answer:** B, C, D

**해설:**

> **문제:** Amazon DynamoDB의 사용 사례로 적합한 것은?

| 선지 | 번역 |
|------|------|
| A | BLOB 데이터 저장. |
| B | 웹 세션 관리. |
| C | JSON 문서 저장. |
| D | Amazon S3 객체의 메타데이터 저장. |
| E | 관계형 조인 및 복잡한 업데이트 실행. |
| F | 자주 접근하지 않는 대용량 데이터 저장. |

**(A)** : DynamoDB 아이템 크기는 최대 400KB로 대용량 BLOB 데이터 저장에 부적합합니다.

**(B) 정답** : DynamoDB는 낮은 지연 시간과 자동 TTL 기능으로 웹 세션 관리에 이상적입니다.

**(C) 정답** : DynamoDB는 JSON 형식의 문서를 네이티브로 저장하고 조회할 수 있습니다.

**(D) 정답** : S3 객체의 메타데이터를 DynamoDB에 저장하면 빠른 검색이 가능합니다.

**(E)** : DynamoDB는 NoSQL 데이터베이스로 복잡한 관계형 조인을 지원하지 않습니다.

**(F)** : 자주 접근하지 않는 대용량 데이터는 S3나 Glacier가 더 적합합니다.

**핵심 개념:** DynamoDB 적합한 사용 사례 — 세션 관리, JSON 문서, 메타데이터 저장

---

### Q366. You have been asked to set up a database in AWS that will require frequent and granular updates. You know that you will require a reasonable amount of storage space but are not sure of the best option. What is the recommended storage option when you run a database on an instance with the above criteria?

**Options:**
- A) Amazon S3.
- B) Amazon EBS.
- C) AWS Storage Gateway.
- D) Amazon Glacier.

**Answer:** B

**해설:**

> **문제:** 빈번하고 세밀한 업데이트가 필요한 데이터베이스를 AWS에 설정할 때 권장되는 스토리지 옵션은?

| 선지 | 번역 |
|------|------|
| A | Amazon S3. |
| B | Amazon EBS. |
| C | AWS Storage Gateway. |
| D | Amazon Glacier. |

**(A)** : S3는 객체 스토리지로 데이터베이스의 빈번한 블록 단위 업데이트에 부적합합니다.

**(B) 정답** : Amazon EBS는 블록 스토리지로 데이터베이스의 빈번하고 세밀한 읽기/쓰기 작업에 최적화되어 있습니다. EC2 인스턴스에 연결하여 데이터베이스 스토리지로 사용하는 표준 방법입니다.

**(C)** : Storage Gateway는 하이브리드 클라우드 스토리지 솔루션으로 데이터베이스 스토리지에 적합하지 않습니다.

**(D)** : Glacier는 아카이브용 콜드 스토리지로 빈번한 접근에 부적합합니다.

**핵심 개념:** EC2 기반 데이터베이스 스토리지 — EBS 블록 스토리지

---

### Q367. An application hosted at the EC2 instance receives an HTTP request from ELB. The same request has an X-Forwarded-For header, which has three IP addresses. Which system's IP will be a part of this header?

**Options:**
- A) Previous Request IP address.
- B) Client IP address.
- C) All of the answers listed here.
- D) Load Balancer IP address.

**Answer:** C

**해설:**

> **문제:** EC2 인스턴스의 애플리케이션이 ELB로부터 HTTP 요청을 받습니다. 이 요청에는 세 개의 IP 주소가 있는 X-Forwarded-For 헤더가 있습니다. 이 헤더에는 어떤 시스템의 IP가 포함됩니까?

| 선지 | 번역 |
|------|------|
| A | 이전 요청 IP 주소. |
| B | 클라이언트 IP 주소. |
| C | 위의 모든 답변. |
| D | 로드 밸런서 IP 주소. |

**(A)** : 이전 요청의 IP도 포함될 수 있지만 단독으로는 불완전합니다.

**(B)** : 클라이언트 IP도 포함되지만 단독으로는 불완전합니다.

**(C) 정답** : X-Forwarded-For 헤더는 요청이 통과한 모든 프록시/로드 밸런서의 IP 주소를 기록합니다. 세 개의 IP가 있다면 클라이언트 IP, 중간 프록시 IP, 로드 밸런서 IP가 모두 포함될 수 있습니다.

**(D)** : 로드 밸런서 IP도 포함되지만 단독으로는 불완전합니다.

**핵심 개념:** X-Forwarded-For 헤더 — 요청 경로상의 모든 IP 주소 기록

---

### Q368. An organization has developed a mobile application which allows end users to capture a photo on their mobile device, and store it inside an application. The application internally uploads the data to AWS S3. The organization wants each user to be able to directly upload data to S3 using their Google ID. How will the mobile app allow this?

**Options:**
- A) Use the AWS Web identity federation for mobile applications, and use it to generate temporary security credentials for each user.
- B) It is not possible to connect to AWS S3 with a Google ID.
- C) Create an IAM user every time a user registers with their Google ID and use IAM to upload files to S3.
- D) Create a bucket policy with a condition which allows everyone to upload if the login ID has a Google part to it.

**Answer:** A

**해설:**

> **문제:** 모바일 앱에서 사용자가 Google ID로 S3에 직접 데이터를 업로드할 수 있게 하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 모바일 앱을 위한 AWS Web Identity Federation을 사용하여 각 사용자에게 임시 보안 자격증명을 생성한다. |
| B | Google ID로 AWS S3에 연결하는 것은 불가능합니다. |
| C | Google ID로 등록할 때마다 IAM 사용자를 생성하고 IAM으로 파일을 업로드한다. |
| D | 로그인 ID에 Google 부분이 있으면 누구나 업로드할 수 있는 조건의 버킷 정책을 생성한다. |

**(A) 정답** : AWS Web Identity Federation(Cognito 또는 STS AssumeRoleWithWebIdentity)을 사용하면 Google, Facebook 등의 외부 IdP 인증을 통해 임시 AWS 자격증명을 발급받아 S3에 접근할 수 있습니다.

**(B)** : Web Identity Federation을 통해 가능합니다.

**(C)** : 사용자마다 IAM 사용자를 생성하는 것은 확장성이 없고 보안상 좋지 않습니다.

**(D)** : 이런 버킷 정책 조건은 지원되지 않으며 보안상 위험합니다.

**핵심 개념:** Web Identity Federation — 소셜 IdP(Google/Facebook)를 통한 AWS 임시 자격증명 발급

---

### Q369. You must increase storage size in increments of at least [...].

**Options:**
- A) 40.
- B) 20.
- C) 50.
- D) 10.

**Answer:** D

**해설:**

> **문제:** 스토리지 크기를 최소 [...] 증분으로 늘려야 합니다.

| 선지 | 번역 |
|------|------|
| A | 40. |
| B | 20. |
| C | 50. |
| D | 10. |

**(A)** : 40이 아닙니다.

**(B)** : 20이 아닙니다.

**(C)** : 50이 아닙니다.

**(D) 정답** : RDS 스토리지 크기는 최소 10% 증분으로 늘려야 합니다. 또는 특정 스토리지 유형에서 10GB 단위로 증가해야 합니다. 문제 맥락에 따라 10이 정답입니다.

**핵심 개념:** RDS 스토리지 확장 — 최소 증분 단위 제한

---

### Q370. You need to set up a security certificate for a client's e-commerce website as it will use the HTTPS protocol. Which of the below AWS services do you need to access to manage your SSL server certificate?

**Options:**
- A) AWS Directory Service.
- B) AWS Identity & Access Management.
- C) AWS CloudFormation.
- D) Amazon Route 53.

**Answer:** B

**해설:**

> **문제:** HTTPS 프로토콜을 사용하는 전자상거래 웹사이트의 SSL 서버 인증서를 관리하려면 어떤 AWS 서비스를 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | AWS Directory Service. |
| B | AWS Identity & Access Management. |
| C | AWS CloudFormation. |
| D | Amazon Route 53. |

**(A)** : Directory Service는 디렉터리 관리 서비스로 SSL 인증서와 무관합니다.

**(B) 정답** : SSL/TLS 서버 인증서는 IAM에 업로드하고 관리합니다(또는 AWS Certificate Manager를 사용). IAM은 인증서 저장소 역할을 합니다.

**(C)** : CloudFormation은 인프라 프로비저닝 서비스입니다.

**(D)** : Route 53은 DNS 서비스입니다.

**핵심 개념:** SSL 인증서 관리 — IAM 또는 AWS Certificate Manager(ACM)

---

### Q371. After setting up a Virtual Private Cloud (VPC) network, a more experienced cloud engineer suggests that to achieve low network latency and high network throughput you should look into setting up a placement group. You know nothing about this, but begin to do some research about it and are especially curious about its limitations. Which of the below statements is wrong in describing the limitations of a placement group?

**Options:**
- A) Although launching multiple instance types into a placement group is possible, this reduces the likelihood that the required capacity will be available for your launch to succeed.
- B) A placement group can span multiple Availability Zones.
- C) You can't move an existing instance into a placement group.
- D) A placement group can span peered VPCs.

**Answer:** B

**해설:**

> **문제:** 배치 그룹의 제한 사항을 설명하는 것 중 틀린 것은?

| 선지 | 번역 |
|------|------|
| A | 배치 그룹에 여러 인스턴스 유형을 시작할 수 있지만, 이는 시작 성공에 필요한 용량 가용성을 줄입니다. |
| B | 배치 그룹은 여러 가용 영역에 걸쳐 있을 수 있습니다. |
| C | 기존 인스턴스를 배치 그룹으로 이동할 수 없습니다. |
| D | 배치 그룹은 피어링된 VPC에 걸쳐 있을 수 있습니다. |

**(A)** : 올바른 제한 사항 설명입니다.

**(B) 정답** : 잘못된 설명입니다. 클러스터 배치 그룹(Cluster Placement Group)은 단일 AZ 내에서만 인스턴스를 배치합니다. 배치 그룹은 여러 AZ에 걸쳐 있을 수 없습니다(스프레드/파티션 배치 그룹은 다수 AZ 가능하지만 클러스터는 불가).

**(C)** : 올바른 제한 사항 설명입니다. 기존 인스턴스를 배치 그룹으로 이동하려면 중지 후 AMI 생성 후 새로 시작해야 합니다.

**(D)** : 올바른 설명입니다. 배치 그룹은 피어링된 VPC에 걸쳐 있을 수 있습니다.

**핵심 개념:** EC2 배치 그룹 제한 — 클러스터 배치 그룹은 단일 AZ 내로 제한

---

### Q372. True or False: When you perform a restore operation to a point in time or from a DB Snapshot, a new DB Instance is created with a new endpoint.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** 참/거짓: 포인트 인 타임 복원 또는 DB 스냅샷에서 복원할 때, 새로운 엔드포인트를 가진 새 DB 인스턴스가 생성됩니다.

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : RDS에서 스냅샷으로 복원하거나 포인트 인 타임 복원을 수행하면 기존 인스턴스를 덮어쓰지 않고 새로운 DB 인스턴스가 새로운 엔드포인트와 함께 생성됩니다. 애플리케이션의 연결 문자열을 업데이트해야 합니다.

**(B)** : 틀렸습니다.

**핵심 개념:** RDS 복원 동작 — 새 DB 인스턴스와 새 엔드포인트 생성, 애플리케이션 연결 문자열 업데이트 필요

---

### Q373. What is the Reduced Redundancy option in Amazon S3?

**Options:**
- A) Less redundancy for a lower cost.
- B) It doesn't exist in Amazon S3, but in Amazon EBS.
- C) It allows you to destroy any copy of your files outside a specific jurisdiction.
- D) It doesn't exist at all.

**Answer:** A

**해설:**

> **문제:** Amazon S3의 낮은 중복성(Reduced Redundancy) 옵션이란 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 낮은 비용을 위한 낮은 중복성. |
| B | Amazon S3가 아닌 Amazon EBS에 존재합니다. |
| C | 특정 관할권 외부의 파일 복사본을 삭제할 수 있습니다. |
| D | 전혀 존재하지 않습니다. |

**(A) 정답** : S3 RRS(Reduced Redundancy Storage)는 표준 S3보다 낮은 중복성(내구성 99.99%)을 제공하는 대신 비용이 저렴합니다. 쉽게 재생성할 수 있는 데이터에 적합합니다.

**(B)** : S3에 존재합니다.

**(C)** : 관련 없는 설명입니다.

**(D)** : 실제로 존재하는 스토리지 클래스입니다.

**핵심 개념:** S3 RRS — 낮은 내구성(99.99%)과 낮은 비용, 재생성 가능한 데이터에 적합

---

### Q374. You are setting up your first Amazon Virtual Private Cloud (Amazon VPC) so you decide to use the VPC wizard in the AWS console to help make it easier for you. Which of the following statements is correct regarding instances that you launch into a default subnet via the VPC wizard?

**Options:**
- A) Instances that you launch into a default subnet receive a public IP address and 10 private IP addresses.
- B) Instances that you launch into a default subnet receive both a public IP address and a private IP address.
- C) Instances that you launch into a default subnet don't receive any ip addresses and you need to define them manually.
- D) Instances that you launch into a default subnet receive a public IP address and 5 private IP addresses.

**Answer:** B

**해설:**

> **문제:** VPC 마법사를 통해 기본 서브넷에서 시작하는 인스턴스에 대한 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 공개 IP 주소 1개와 프라이빗 IP 주소 10개를 받습니다. |
| B | 공개 IP 주소와 프라이빗 IP 주소 모두 받습니다. |
| C | IP 주소를 받지 않으며 수동으로 정의해야 합니다. |
| D | 공개 IP 주소 1개와 프라이빗 IP 주소 5개를 받습니다. |

**(A)** : 10개의 프라이빗 IP를 자동으로 받지 않습니다.

**(B) 정답** : 기본 서브넷에서 시작하는 인스턴스는 자동으로 공개 IP 주소(퍼블릭 IPv4)와 프라이빗 IP 주소를 모두 받습니다.

**(C)** : 자동으로 IP가 할당됩니다.

**(D)** : 5개의 프라이빗 IP를 자동으로 받지 않습니다.

**핵심 개념:** VPC 기본 서브넷 — 퍼블릭 IP + 프라이빗 IP 자동 할당

---

### Q375. For which of the following use cases are Simple Workflow Service (SWF) and Amazon EC2 an appropriate solution? (Choose 2 answers)

**Options:**
- A) Using as an endpoint to collect thousands of data points per hour from a distributed fleet of sensors.
- B) Managing a multi-step and multi-decision checkout process of an e-commerce website.
- C) Orchestrating the execution of distributed and auditable business processes.
- D) Using as an SNS (Simple Notification Service) endpoint to trigger execution of video transcoding jobs.
- E) Using as a distributed session store for your web application.

**Answer:** B, C

**해설:**

> **문제:** Simple Workflow Service(SWF)와 Amazon EC2가 적합한 사용 사례는?

| 선지 | 번역 |
|------|------|
| A | 분산 센서 집합에서 시간당 수천 개의 데이터 포인트를 수집하는 엔드포인트로 사용. |
| B | 전자상거래 웹사이트의 다단계 및 다결정 체크아웃 프로세스 관리. |
| C | 분산되고 감사 가능한 비즈니스 프로세스 실행 조정. |
| D | 비디오 트랜스코딩 작업 실행을 트리거하는 SNS 엔드포인트로 사용. |
| E | 웹 애플리케이션을 위한 분산 세션 저장소로 사용. |

**(A)** : 센서 데이터 수집은 Kinesis가 더 적합합니다.

**(B) 정답** : SWF는 다단계 결정 프로세스를 조정하는 데 이상적입니다. 전자상거래 체크아웃의 복잡한 워크플로(결제 검증, 재고 확인, 배송 등)를 관리할 수 있습니다.

**(C) 정답** : SWF는 분산 비즈니스 프로세스의 실행을 추적하고 감사 기록을 유지하는 데 최적화되어 있습니다.

**(D)** : SNS 기반 비디오 트랜스코딩은 SQS/Lambda가 더 적합합니다.

**(E)** : 세션 저장소는 ElastiCache나 DynamoDB가 더 적합합니다.

**핵심 개념:** Amazon SWF 사용 사례 — 복잡한 다단계 워크플로 조정, 분산 비즈니스 프로세스 감사

---

### Q376. Which of the following instance types are available as Amazon EBS-backed only? (Choose 2 answers)

**Options:**
- A) General purpose T2.
- B) General purpose M3.
- C) Compute-optimized C4.
- D) Compute-optimized C3.
- E) Storage-optimized I2.

**Answer:** A, D

**해설:**

> **문제:** Amazon EBS 전용(EBS-backed only)으로만 제공되는 인스턴스 유형은?

| 선지 | 번역 |
|------|------|
| A | 범용 T2. |
| B | 범용 M3. |
| C | 컴퓨팅 최적화 C4. |
| D | 컴퓨팅 최적화 C3. |
| E | 스토리지 최적화 I2. |

**(A) 정답** : T2 인스턴스는 인스턴스 스토리지를 지원하지 않으며 EBS 전용입니다.

**(B)** : M3는 EBS 및 인스턴스 스토리지 모두 지원합니다.

**(C)** : C4는 EBS 전용이지만 이 문제에서는 D가 정답입니다.

**(D) 정답** : C3는 EBS만 지원합니다(인스턴스 스토리지 없음).

**(E)** : I2는 인스턴스 스토리지(SSD)를 포함합니다.

**핵심 개념:** EC2 인스턴스 유형별 스토리지 지원 — T2는 EBS 전용

---

### Q377. True or False: Without IAM, you cannot control the tasks a particular user or system can do and what AWS resources they might use.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** 참/거짓: IAM 없이는 특정 사용자나 시스템이 수행할 수 있는 작업과 사용할 수 있는 AWS 리소스를 제어할 수 없습니다.

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : AWS IAM 없이는 개별 사용자나 시스템에 대한 세밀한 접근 제어가 불가능합니다. IAM은 AWS 리소스에 대한 접근을 제어하는 핵심 서비스입니다.

**(B)** : 틀렸습니다.

**핵심 개념:** AWS IAM의 필수성 — AWS 리소스 접근 제어의 핵심 서비스

---

### Q378. What does Amazon ELB stand for?

**Options:**
- A) Elastic Linux Box.
- B) Encrypted Linux Box.
- C) Encrypted Load Balancing.
- D) Elastic Load Balancing.

**Answer:** D

**해설:**

> **문제:** Amazon ELB의 풀네임은?

| 선지 | 번역 |
|------|------|
| A | Elastic Linux Box. |
| B | Encrypted Linux Box. |
| C | Encrypted Load Balancing. |
| D | Elastic Load Balancing. |

**(A)** : 존재하지 않는 서비스입니다.

**(B)** : 존재하지 않는 서비스입니다.

**(C)** : Encrypted가 아닌 Elastic입니다.

**(D) 정답** : ELB는 Elastic Load Balancing의 약자입니다.

**핵심 개념:** AWS 서비스 명칭 — ELB = Elastic Load Balancing

---

### Q379. A read only news reporting site with a combined web and application tier and a database tier that receives large and unpredictable traffic demands must be able to respond to these traffic fluctuations automatically. What AWS services should be used meet these requirements?

**Options:**
- A) Stateless instances for the web and application tier synchronized using Elasticache Memcached in an autoscaling group monitored with CloudWatch. And RDS with read replicas.
- B) Stateful instances for the web and application tier in an autoscaling group monitored with CloudWatch and RDS with read replicas.
- C) Stateful instances for the web and application tier in an autoscaling group monitored with CloudWatch and multi-AZ RDS.
- D) Stateless instances for the web and application tier synchronized using ElastiCache Memcached in an autoscaling group monitored with CloudWatch and multi-AZ RDS.

**Answer:** A

**해설:**

> **문제:** 읽기 전용 뉴스 사이트에서 대규모 예측 불가능한 트래픽을 자동으로 처리해야 합니다. 어떤 AWS 서비스 조합이 필요합니까?

| 선지 | 번역 |
|------|------|
| A | Stateless 웹/앱 티어 + ElastiCache Memcached 동기화 + CloudWatch Auto Scaling + RDS Read Replicas. |
| B | Stateful 웹/앱 티어 + CloudWatch Auto Scaling + RDS Read Replicas. |
| C | Stateful 웹/앱 티어 + CloudWatch Auto Scaling + Multi-AZ RDS. |
| D | Stateless 웹/앱 티어 + ElastiCache Memcached + CloudWatch Auto Scaling + Multi-AZ RDS. |

**(A) 정답** : 읽기 전용 사이트에는 세션을 ElastiCache에 저장하는 Stateless 인스턴스(Auto Scaling 친화적)와 읽기 부하를 분산하는 Read Replicas가 최적입니다.

**(B)** : Stateful 인스턴스는 Auto Scaling 시 세션 손실 위험이 있습니다.

**(C)** : Multi-AZ는 가용성을 위한 것으로 읽기 성능 향상에 도움이 안 됩니다.

**(D)** : Stateless이지만 읽기 전용 사이트에 Multi-AZ보다 Read Replicas가 더 적합합니다.

**핵심 개념:** 읽기 전용 웹 애플리케이션 확장 — Stateless + ElastiCache + Read Replica 조합

---

### Q380. In Amazon AWS, which of the following statements is true of key pairs?

**Options:**
- A) Key pairs are used only for Amazon SDKs.
- B) Key pairs are used only for Amazon EC2 and Amazon CloudFront.
- C) Key pairs are used only for Elastic Load Balancing and AWS IA.
- D) Key pairs are used for all Amazon services.

**Answer:** B

**해설:**

> **문제:** Amazon AWS에서 키 페어에 대한 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 키 페어는 Amazon SDK에만 사용됩니다. |
| B | 키 페어는 Amazon EC2와 Amazon CloudFront에만 사용됩니다. |
| C | 키 페어는 Elastic Load Balancing과 AWS IAM에만 사용됩니다. |
| D | 키 페어는 모든 Amazon 서비스에 사용됩니다. |

**(A)** : SDK에만 사용되지 않습니다.

**(B) 정답** : AWS 키 페어는 주로 EC2 인스턴스 SSH 접근과 CloudFront 서명된 URL/쿠키에 사용됩니다.

**(C)** : ELB와 IAM에만 사용되지 않습니다.

**(D)** : 모든 서비스에 사용되지 않습니다.

**핵심 개념:** AWS 키 페어 사용 범위 — EC2(SSH 접근)와 CloudFront(서명된 URL)

---

### Q381. What does Amazon ElastiCache provide?

**Options:**
- A) A service by this name doesn't exist. Perhaps you mean Amazon CloudCache.
- B) A virtual server with a huge amount of memory.
- C) A managed In-memory cache service.
- D) An Amazon EC2 instance with the Memcached software already pre-installed.

**Answer:** C

**해설:**

> **문제:** Amazon ElastiCache는 무엇을 제공합니까?

| 선지 | 번역 |
|------|------|
| A | 이 이름의 서비스는 존재하지 않습니다. Amazon CloudCache를 의미하는 것입니까? |
| B | 엄청난 양의 메모리를 가진 가상 서버. |
| C | 관리형 인메모리 캐시 서비스. |
| D | Memcached 소프트웨어가 미리 설치된 Amazon EC2 인스턴스. |

**(A)** : ElastiCache는 실제로 존재하는 서비스입니다.

**(B)** : 단순한 메모리 서버가 아닌 완전 관리형 서비스입니다.

**(C) 정답** : Amazon ElastiCache는 Redis 또는 Memcached를 기반으로 하는 완전 관리형 인메모리 캐싱 서비스입니다. 데이터베이스 부하를 줄이고 애플리케이션 성능을 향상시킵니다.

**(D)** : ElastiCache는 단순히 Memcached가 설치된 EC2가 아닌 완전 관리형 서비스입니다.

**핵심 개념:** Amazon ElastiCache — Redis/Memcached 기반 완전 관리형 인메모리 캐시 서비스

---

### Q382. What are the two permission types used by AWS?

**Options:**
- A) Resource-based and Product-based.
- B) Product-based and Service-based.
- C) Service-based.
- D) User-based and Resource-based.

**Answer:** D

**해설:**

> **문제:** AWS에서 사용하는 두 가지 권한 유형은?

| 선지 | 번역 |
|------|------|
| A | 리소스 기반 및 제품 기반. |
| B | 제품 기반 및 서비스 기반. |
| C | 서비스 기반. |
| D | 사용자 기반 및 리소스 기반. |

**(A)** : '제품 기반'은 AWS 권한 유형이 아닙니다.

**(B)** : 올바른 AWS 권한 유형이 아닙니다.

**(C)** : 단일 유형만 언급하고 있습니다.

**(D) 정답** : AWS IAM에서는 사용자/그룹/역할에 연결하는 자격 증명 기반(Identity-based, 사용자 기반) 정책과 S3 버킷 정책, SQS 큐 정책 등 리소스에 직접 연결하는 리소스 기반(Resource-based) 정책의 두 가지 유형이 있습니다.

**핵심 개념:** IAM 정책 유형 — Identity-based(사용자 기반) vs Resource-based(리소스 기반)

---

### Q383. In AWS CloudHSM, in addition to the AWS recommendation that you use two or more HSM appliances in a high-availability configuration to prevent the loss of keys and data, you can also perform a remote backup/restore of a Luna SA partition if you have purchased a:

**Options:**
- A) Luna Restore HS.
- B) Luna Backup HS.
- C) Luna HS.
- D) Luna SA HS.

**Answer:** B

**해설:**

> **문제:** AWS CloudHSM에서 Luna SA 파티션의 원격 백업/복원을 수행하려면 무엇을 구매해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Luna Restore HS. |
| B | Luna Backup HS. |
| C | Luna HS. |
| D | Luna SA HS. |

**(A)** : 존재하지 않는 제품입니다.

**(B) 정답** : Luna Backup HSM을 구매하면 Luna SA HSM 파티션의 원격 백업 및 복원이 가능합니다.

**(C)** : 정확한 제품명이 아닙니다.

**(D)** : Luna SA HS는 백업 장치가 아닙니다.

**핵심 개념:** AWS CloudHSM — Luna Backup HSM을 통한 HSM 파티션 원격 백업

---

### Q384. An organization has a statutory requirement to protect the data at rest for the S3 objects. Which of the below mentioned options need not be enabled by the organization to achieve data security?

**Options:**
- A) MFA delete for S3 objects.
- B) Client side encryption.
- C) Bucket versioning.
- D) Data replication.

**Answer:** D

**해설:**

> **문제:** S3 객체의 저장 데이터를 보호해야 하는 법적 요건이 있습니다. 데이터 보안을 위해 활성화할 필요가 없는 옵션은?

| 선지 | 번역 |
|------|------|
| A | S3 객체의 MFA 삭제. |
| B | 클라이언트 사이드 암호화. |
| C | 버킷 버전 관리. |
| D | 데이터 복제. |

**(A)** : MFA 삭제는 중요 데이터 보호에 유용한 보안 기능입니다.

**(B)** : 클라이언트 사이드 암호화는 저장 데이터 보호의 핵심 방법입니다.

**(C)** : 버킷 버전 관리는 우발적 삭제/수정으로부터 데이터를 보호합니다.

**(D) 정답** : 데이터 복제는 가용성과 내구성을 위한 것이지 저장 데이터 보안(암호화, 접근 제어)과는 직접 관련이 없습니다. 법적 저장 데이터 보호 요건을 충족하기 위해 반드시 필요한 것은 아닙니다.

**핵심 개념:** S3 저장 데이터 보안 — 암호화(SSE/CSE), MFA 삭제, 버전 관리가 핵심. 복제는 보안이 아닌 내구성/가용성 목적

---

### Q385. Your company is in the process of developing a next generation pet collar that collects biometric information to assist families with promoting healthy lifestyles for their pets. Each collar will push 30kb of biometric data in JSON format every 2 seconds to a collection platform that will process and analyze the data providing health trending information back to the pet owners and veterinarians via a web portal. Management has tasked you to architect the collection platform ensuring the following requirements are met. Provide the ability for real-time analytics of the inbound biometric data. Ensure processing of the biometric data is highly durable, elastic and parallel. The results of the analytic processing should be persisted for data mining. Which architecture outlined below will meet the initial requirements for the collection platform?

**Options:**
- A) Utilize S3 to collect the inbound sensor data, analyze the data from S3 with a daily scheduled Data Pipeline and save the results to a Redshift Cluster.
- B) Utilize Amazon Kinesis to collect the inbound sensor data, analyze the data with Kinesis clients and save the results to a Redshift cluster using EMR.
- C) Utilize SQS to collect the inbound sensor data, analyze the data from SQS with Amazon Kinesis and save the results to a Microsoft SQL Server RDS instance.
- D) Utilize EMR to collect the inbound sensor data, analyze the data from EMR with Amazon Kinesis and save the results to DynamoDB.

**Answer:** B

**해설:**

> **문제:** 반려동물 칼라에서 2초마다 30KB의 JSON 바이오메트릭 데이터를 수집합니다. 실시간 분석, 내구성, 탄력성, 병렬 처리, 데이터 마이닝을 위한 결과 저장이 필요합니다. 적합한 아키텍처는?

| 선지 | 번역 |
|------|------|
| A | S3로 데이터 수집, 일별 Data Pipeline으로 분석, Redshift에 저장. |
| B | Kinesis로 데이터 수집, Kinesis 클라이언트로 분석, EMR을 통해 Redshift에 저장. |
| C | SQS로 데이터 수집, Kinesis로 분석, Microsoft SQL Server RDS에 저장. |
| D | EMR로 데이터 수집, Kinesis로 분석, DynamoDB에 저장. |

**(A)** : 일별 Data Pipeline은 실시간 분석 요건을 충족하지 못합니다.

**(B) 정답** : Kinesis는 실시간 스트리밍 데이터 수집에 최적화되어 있습니다. Kinesis 클라이언트로 실시간 분석 후 EMR을 통해 Redshift에 저장하면 데이터 마이닝 요건도 충족합니다.

**(C)** : SQS는 실시간 스트리밍 분석에 적합하지 않으며 SQL Server는 대용량 데이터 마이닝에 부적합합니다.

**(D)** : EMR을 데이터 수집 레이어로 사용하는 것은 부적절합니다.

**핵심 개념:** IoT 실시간 데이터 수집 아키텍처 — Kinesis(수집) + Kinesis Analytics(분석) + Redshift(저장/마이닝)

---

### Q386. Which of the following approaches provides the lowest cost for Amazon Elastic Block Store snapshots while giving you the ability to fully restore data?

**Options:**
- A) Maintain two snapshots: the original snapshot and the latest incremental snapshot.
- B) Maintain a volume snapshot; subsequent snapshots will overwrite one another
- C) Maintain a single snapshot the latest snapshot is both Incremental and complete.
- D) Maintain the most current snapshot, archive the original and incremental to Amazon Glacier.

**Answer:** A

**해설:**

> **문제:** 데이터를 완전히 복원할 수 있으면서 Amazon EBS 스냅샷 비용을 최소화하는 방법은?

| 선지 | 번역 |
|------|------|
| A | 두 개의 스냅샷 유지: 최초 스냅샷과 최신 증분 스냅샷. |
| B | 볼륨 스냅샷 유지; 이후 스냅샷은 서로 덮어씁니다. |
| C | 단일 스냅샷 유지; 최신 스냅샷이 증분이면서 완전합니다. |
| D | 최신 스냅샷만 유지하고 원본과 증분은 Glacier에 아카이브합니다. |

**(A) 정답** : EBS 스냅샷은 증분 방식으로 S3에 저장됩니다. 최초 스냅샷과 최신 증분 스냅샷 두 개를 유지하면 전체 복원이 가능하면서 중간 스냅샷을 삭제하여 비용을 절감할 수 있습니다.

**(B)** : EBS 스냅샷은 서로 덮어쓰지 않습니다.

**(C)** : EBS 최신 스냅샷만으로 완전 복원이 가능하지만, 이전 스냅샷 없이는 특정 시점 복원이 어렵습니다.

**(D)** : Glacier에 아카이브하는 것은 추가 비용과 복잡성을 초래합니다.

**핵심 개념:** EBS 스냅샷 비용 최적화 — 증분 스냅샷 특성 이해 및 최소 스냅샷 유지 전략

---

### Q387. You have a video transcoding application running on Amazon EC2. Each instance polls a queue to find out which video should be transcoded, and then runs a transcoding process. If this process is interrupted, the video will be transcoded by another instance based on the queuing system. You have a large backlog of videos which need to be transcoded and would like to reduce this backlog by adding more instances. You will need these instances only until the backlog is reduced. Which type of Amazon EC2 instances should you use to reduce the backlog in the most cost efficient way?

**Options:**
- A) Reserved instances.
- B) Spot instances.
- C) Dedicated instances.
- D) On-demand instances.

**Answer:** B

**해설:**

> **문제:** 비디오 트랜스코딩 애플리케이션에서 인터럽트 처리가 가능하며, 대기열을 소화하기 위해 임시로 인스턴스를 추가해야 합니다. 가장 비용 효율적인 인스턴스 유형은?

| 선지 | 번역 |
|------|------|
| A | 예약 인스턴스. |
| B | 스팟 인스턴스. |
| C | 전용 인스턴스. |
| D | 온디맨드 인스턴스. |

**(A)** : 예약 인스턴스는 장기적 워크로드에 적합하며, 임시 사용에는 비효율적입니다.

**(B) 정답** : 애플리케이션이 인터럽트를 처리할 수 있고(다른 인스턴스가 재처리), 임시적으로만 필요하므로 스팟 인스턴스가 가장 비용 효율적입니다. 스팟은 온디맨드 대비 최대 90% 저렴합니다.

**(C)** : 전용 인스턴스는 가장 비싸고 임시 사용에 부적합합니다.

**(D)** : 온디맨드는 스팟보다 비용이 높습니다.

**핵심 개념:** 스팟 인스턴스 최적 사용 사례 — 내결함성 배치 작업, 임시 대규모 처리

---

### Q388. What does the AWS Storage Gateway provide?

**Options:**
- A) It allows to integrate on-premises IT environments with Cloud Storage.
- B) A direct encrypted connection to Amazon S3.
- C) It's a backup solution that provides an on-premises Cloud storage.
- D) It provides an encrypted SSL endpoint for backups in the Cloud.

**Answer:** A

**해설:**

> **문제:** AWS Storage Gateway는 무엇을 제공합니까?

| 선지 | 번역 |
|------|------|
| A | 온프레미스 IT 환경을 클라우드 스토리지와 통합할 수 있게 합니다. |
| B | Amazon S3에 대한 직접 암호화 연결. |
| C | 온프레미스 클라우드 스토리지를 제공하는 백업 솔루션. |
| D | 클라우드 백업을 위한 암호화된 SSL 엔드포인트. |

**(A) 정답** : AWS Storage Gateway는 온프레미스 애플리케이션이 AWS 클라우드 스토리지(S3, Glacier, EBS)와 원활하게 통합할 수 있도록 하는 하이브리드 스토리지 서비스입니다.

**(B)** : Direct Connect와 혼동할 수 있지만 Storage Gateway의 주요 기능이 아닙니다.

**(C)** : 백업만을 위한 솔루션이 아닌 더 넓은 하이브리드 스토리지 통합 서비스입니다.

**(D)** : SSL 엔드포인트 제공이 주요 기능이 아닙니다.

**핵심 개념:** AWS Storage Gateway — 온프레미스와 AWS 클라우드 스토리지 간 하이브리드 통합

---

### Q389. You have recently joined a startup company building sensors to measure street noise and air quality in urban areas. The company has been running a pilot deployment of around 100 sensors for 3 months. Each sensor uploads 1KB of sensor data every minute to a backend hosted on AWS. During the pilot, you measured a peak of 10 IOPS on the database, and you stored an average of 3GB of sensor data per month in the database. The current deployment consists of a load-balanced auto scaled Ingestion layer using EC2 instances and a PostgreSQL RDS database with 500GB standard storage. The pilot is considered a success and your CEO has managed to get the attention of some potential investors. The business plan requires a deployment of at least 100K sensors which needs to be supported by the backend. You also need to store sensor data for at least two years to be able to compare year over year improvements. To secure funding, you have to make sure that the platform meets these requirements and leaves room for further scaling. Which setup will meet the requirements?

**Options:**
- A) Add an SQS queue to the ingestion layer to buffer writes to the RDS instance.
- B) Ingest data into a DynamoDB table and move old data to a Redshift cluster.
- C) Replace the RDS instance with a 6 node Redshift cluster with 96TB of storage.
- D) Keep the current architecture but upgrade RDS storage to 3TB and 10K provisioned IOPS.

**Answer:** C

**해설:**

> **문제:** 100개 센서 파일럿에서 100K 센서로 확장해야 합니다. 2년간 데이터 저장 및 추가 확장 여지가 필요합니다. 어떤 설정이 요건을 충족합니까?

| 선지 | 번역 |
|------|------|
| A | SQS 큐를 수집 레이어에 추가하여 RDS 인스턴스에 대한 쓰기를 버퍼링한다. |
| B | 데이터를 DynamoDB 테이블에 수집하고 오래된 데이터를 Redshift 클러스터로 이동한다. |
| C | RDS 인스턴스를 96TB 스토리지의 6 노드 Redshift 클러스터로 교체한다. |
| D | 현재 아키텍처를 유지하되 RDS 스토리지를 3TB와 10K IOPS로 업그레이드한다. |

**(A)** : SQS 버퍼링은 도움이 되지만 100K 센서의 쿼리/분석 요건을 충족하기 어렵습니다.

**(B)** : DynamoDB + Redshift 조합은 유효하지만 C가 더 직접적인 솔루션입니다.

**(C) 정답** : 100K 센서 × 1KB/분 × 2년 = 약 100TB 이상의 데이터가 필요합니다. Redshift 클러스터는 페타바이트 규모 데이터 웨어하우징에 적합하며 연간 비교 분석(OLAP)에 최적화되어 있습니다.

**(D)** : 100K 센서로 확장 시 RDS PostgreSQL은 IOPS와 저장 요건을 충족하기 어렵습니다.

**핵심 개념:** 대규모 IoT 데이터 분석 — Redshift를 통한 페타바이트 규모 데이터 웨어하우징

---

### Q390. After a major security breach your manager has requested a report of all users and their credentials in AWS. You discover that in IAM you can generate and download a credential report that lists all users in your account and the status of their various credentials, including passwords, access keys, MFA devices, and signing certificates. Which following statement is incorrect in regards to the use of credential reports?

**Options:**
- A) Credential reports are downloaded XML files.
- B) You can get a credential report using the AWS Management Console, the AWS CLI, or the IAM API.
- C) You can use the report to audit the effects of credential lifecycle requirements, such as password rotation.
- D) You can generate a credential report as often as once every four hours.

**Answer:** A

**해설:**

> **문제:** IAM 자격증명 보고서 사용에 관해 잘못된 설명은?

| 선지 | 번역 |
|------|------|
| A | 자격증명 보고서는 XML 파일로 다운로드됩니다. |
| B | AWS Management Console, CLI, 또는 IAM API를 통해 자격증명 보고서를 받을 수 있습니다. |
| C | 비밀번호 교체 등 자격증명 수명 주기 요건의 영향을 감사하는 데 사용할 수 있습니다. |
| D | 자격증명 보고서를 최소 4시간마다 한 번 생성할 수 있습니다. |

**(A) 정답** : 잘못된 설명입니다. IAM 자격증명 보고서는 XML이 아닌 **CSV(쉼표로 구분된 값)** 형식으로 다운로드됩니다.

**(B)** : 올바른 설명입니다.

**(C)** : 올바른 설명입니다.

**(D)** : 올바른 설명입니다.

**핵심 개념:** IAM 자격증명 보고서 — CSV 형식 다운로드, 4시간마다 생성 가능

---

### Q391. What is the maximum response time for a Business level Premium Support case?

**Options:**
- A) 30 minutes.
- B) 1 hour.
- C) 12 hours.
- D) 10 minutes.

**Answer:** B

**해설:**

> **문제:** Business 레벨 Premium 지원 케이스의 최대 응답 시간은?

| 선지 | 번역 |
|------|------|
| A | 30분. |
| B | 1시간. |
| C | 12시간. |
| D | 10분. |

**(A)** : 30분은 Business 플랜의 최대 응답 시간이 아닙니다.

**(B) 정답** : AWS Business 지원 플랜의 프로덕션 시스템 장애(Production system down) 케이스의 최대 초기 응답 시간은 1시간입니다.

**(C)** : 12시간은 Business 플랜의 일반 시스템 장애 응답 시간입니다.

**(D)** : 10분은 Enterprise 온콜 플랜에 해당합니다.

**핵심 개념:** AWS 지원 플랜 응답 시간 — Business: 프로덕션 다운 1시간, Enterprise: 15분

---

### Q392. Per the AWS Acceptable Use Policy, penetration testing of EC2 instances

**Options:**
- A) May be performed by AWS, and will be performed by AWS upon customer request.
- B) May be performed by AWS, and is periodically performed by AWS.
- C) Are expressly prohibited under all circumstances.
- D) May be performed by the customer on their own instances with prior authorization from AWS.
- E) May be performed by the customer on their own instances, only if performed from EC2 instances.

**Answer:** B

**해설:**

> **문제:** AWS 허용 사용 정책에 따르면 EC2 인스턴스의 침투 테스트는?

| 선지 | 번역 |
|------|------|
| A | AWS가 수행할 수 있으며 고객 요청 시 AWS가 수행합니다. |
| B | AWS가 수행할 수 있으며 AWS가 주기적으로 수행합니다. |
| C | 모든 상황에서 명시적으로 금지됩니다. |
| D | 고객이 사전 AWS 승인을 받아 자신의 인스턴스에 수행할 수 있습니다. |
| E | EC2 인스턴스에서만 수행하는 경우 고객이 자신의 인스턴스에 수행할 수 있습니다. |

**(A)** : AWS가 고객 요청으로 수행하지는 않습니다.

**(B) 정답** : AWS는 자체적으로 인프라에 대한 보안 테스트(침투 테스트 포함)를 수행합니다. 현재 AWS 정책에서는 8가지 서비스에 대해 고객이 사전 승인 없이 침투 테스트를 수행할 수 있지만, 이 문제의 정답 기준에서는 B가 정답입니다.

**(C)** : 고객도 특정 조건에서 침투 테스트를 수행할 수 있습니다.

**(D)** : 현재 정책에서는 특정 서비스에 대해 사전 승인 없이 가능합니다.

**(E)** : EC2에서만 수행해야 하는 제한은 없습니다.

**핵심 개념:** AWS 침투 테스트 정책 — AWS의 자체 보안 테스트 수행, 고객은 정책 내에서 테스트 가능

---

### Q393. Which of the following features are provided by Amazon EC2?

**Options:**
- A) Exadata Database Machine, Optimized Storage Management, Flashback Technology, and Data Warehousing.
- B) Instances, Amazon Machine Images (AMIs), Key Pairs, Amazon EBS Volumes, Firewall, Elastic IP address, Tags, and Virtual Private Clouds (VPCs).
- C) Real Application Clusters (RAC), Elasticache Machine Images (EMIs), Data Warehousing, Flashback Technology, Dynamic IP address.
- D) Exadata Database Machine, Real Application Clusters (RAC), Data Guard, Table and Index Partitioning, and Data Pump Compression.

**Answer:** B

**해설:**

> **문제:** Amazon EC2가 제공하는 기능은?

| 선지 | 번역 |
|------|------|
| A | Exadata DB Machine, 최적화 스토리지 관리, Flashback Technology, 데이터 웨어하우징. |
| B | 인스턴스, AMI, 키 페어, EBS 볼륨, 방화벽, Elastic IP, 태그, VPC. |
| C | Real Application Clusters, ElastiCache Machine Images, 데이터 웨어하우징, Flashback, 동적 IP. |
| D | Exadata DB Machine, RAC, Data Guard, 테이블/인덱스 파티셔닝, Data Pump 압축. |

**(A)** : Oracle 데이터베이스 기능으로 EC2와 무관합니다.

**(B) 정답** : EC2의 주요 기능은 인스턴스, AMI, 키 페어, EBS 볼륨, 보안 그룹(방화벽), Elastic IP, 태그, VPC 통합입니다.

**(C)** : Oracle RAC와 잘못된 용어들이 포함되어 있습니다.

**(D)** : Oracle 기능들로 EC2와 무관합니다.

**핵심 개념:** Amazon EC2 핵심 구성 요소 — 인스턴스, AMI, EBS, 보안 그룹, EIP, VPC

---

### Q394. True or False: If you add a tag that has the same key as an existing tag on a DB Instance, the new value overwrites the old value.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** 참/거짓: DB 인스턴스의 기존 태그와 동일한 키를 가진 태그를 추가하면 새 값이 이전 값을 덮어씁니다.

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : AWS 태그는 키-값 쌍으로 구성되며, 동일한 키로 태그를 추가하면 기존 값이 새 값으로 덮어씌워집니다. 이는 RDS를 포함한 모든 AWS 리소스에 적용됩니다.

**(B)** : 틀렸습니다.

**핵심 개념:** AWS 태그 동작 — 동일 키 태그 추가 시 값 덮어쓰기

---

### Q395. You decide that you need to create a number of Auto Scaling groups to try and save some money as you have noticed that at certain times most of your EC2 instances are not being used. By default, what is the maximum number of Auto Scaling groups that AWS will allow you to create?

**Options:**
- A) 12.
- B) Unlimited.
- C) 20.
- D) 2.

**Answer:** C

**해설:**

> **문제:** 기본적으로 AWS가 허용하는 최대 Auto Scaling 그룹 수는?

| 선지 | 번역 |
|------|------|
| A | 12. |
| B | 무제한. |
| C | 20. |
| D | 2. |

**(A)** : 12가 아닙니다.

**(B)** : 기본 한도가 있습니다.

**(C) 정답** : AWS는 기본적으로 리전당 최대 20개의 Auto Scaling 그룹을 허용합니다. 더 많이 필요하면 AWS 지원을 통해 한도를 늘릴 수 있습니다.

**(D)** : 2가 아닙니다.

**핵심 개념:** Auto Scaling 그룹 기본 한도 — 리전당 20개 (증가 요청 가능)

---

### Q396. After moving an E-Commerce website for a client from a dedicated server to AWS you have also set up auto scaling to perform health checks on the instances in your group and replace instances that fail these checks. Your client has come to you with his own health check system that he wants you to use as it has proved to be very useful prior to his site running on AWS. What do you think would be an appropriate response to this given all that you know about auto scaling?

**Options:**
- A) It is not possible to implement your own health check system. You need to use AWSs health check system.
- B) It is not possible to implement your own health check system due to compatibility issues.
- C) It is possible to implement your own health check system and then send the instance's health information directly from your system to Cloud Watch.
- D) It is possible to implement your own health check system and then send the instance's health information directly from your system to Cloud Watch but only in the US East (Virginia) region.

**Answer:** C

**해설:**

> **문제:** 고객이 자체 헬스 체크 시스템을 사용하고 싶어합니다. Auto Scaling에서 이것이 가능합니까?

| 선지 | 번역 |
|------|------|
| A | 자체 헬스 체크 시스템을 구현하는 것은 불가능합니다. |
| B | 호환성 문제로 자체 헬스 체크 시스템을 구현하는 것은 불가능합니다. |
| C | 자체 헬스 체크 시스템을 구현하고 인스턴스 상태 정보를 CloudWatch에 직접 전송할 수 있습니다. |
| D | 자체 헬스 체크 시스템을 구현할 수 있지만 US East 리전에서만 가능합니다. |

**(A)** : 자체 헬스 체크가 가능합니다.

**(B)** : 호환성 문제가 없습니다.

**(C) 정답** : Auto Scaling은 EC2 헬스 체크와 ELB 헬스 체크 외에도 커스텀 헬스 체크를 지원합니다. 자체 헬스 체크 시스템의 결과를 CloudWatch에 전송하고 Auto Scaling이 이를 기반으로 인스턴스를 교체할 수 있습니다.

**(D)** : 리전 제한이 없습니다.

**핵심 개념:** Auto Scaling 커스텀 헬스 체크 — CloudWatch를 통한 사용자 정의 헬스 정보 전송

---

### Q397. You've been brought in as solutions architect to assist an enterprise customer with their migration of an e-commerce platform to Amazon Virtual Private Cloud (VPC). The previous architect has already deployed a 3-tier VPC. You are now ready to begin deploying EC2 instances into the VPC. Web servers must have direct access to the internet. Application and database servers cannot have direct access to the internet. Which configuration below will allow you the ability to remotely administer your application and database servers, as well as allow these servers to retrieve updates from the Internet?

**Options:**
- A) Create a bastion and NAT instance in subnet-258bc44d, and add a route from rtb-238bc44b to the NAT instance.
- B) Add a route from rtb-238bc44b to igw-2d8bc445 and add a bastion and NAT instance within subnet-248bc44c.
- C) Create a bastion and NAT instance in subnet-248bc44c, and add a route from rtb-238bc44b to subnet-258bc44d.
- D) Create a bastion and NAT instance in subnet-258bc44d, add a route from rtb-238bc44b to lgw-2d8bc445, and a new NACL that allows access between subnet-258bc44d and subnet-248bc44c.

**Answer:** A

**해설:**

> **문제:** 3티어 VPC에서 웹 서버(퍼블릭)는 인터넷에 직접 접근 가능하고, 앱/DB 서버(프라이빗)는 인터넷 직접 접근 불가이면서 원격 관리와 업데이트 수신이 필요합니다. 올바른 구성은?

| 선지 | 번역 |
|------|------|
| A | subnet-258bc44d(웹 서브넷)에 배스천과 NAT 인스턴스를 생성하고 rtb-238bc44b에서 NAT 인스턴스로의 라우트를 추가한다. |
| B | rtb-238bc44b에서 IGW로의 라우트를 추가하고 subnet-248bc44c에 배스천과 NAT 인스턴스를 추가한다. |
| C | subnet-248bc44c에 배스천과 NAT 인스턴스를 생성하고 rtb-238bc44b에서 subnet-258bc44d로의 라우트를 추가한다. |
| D | subnet-258bc44d에 배스천과 NAT 인스턴스를 생성하고 rtb-238bc44b에서 IGW로의 라우트와 새 NACL을 추가한다. |

**(A) 정답** : 배스천 호스트와 NAT 인스턴스를 퍼블릭 웹 서브넷(subnet-258bc44d)에 배치하고, 프라이빗 서브넷의 라우트 테이블(rtb-238bc44b)에서 NAT 인스턴스로 라우팅합니다. 이렇게 하면 앱/DB 서버가 직접 인터넷에 노출되지 않으면서 NAT를 통해 아웃바운드 접근(업데이트)이 가능하고, 배스천을 통해 원격 관리가 가능합니다.

**(B)** : 프라이빗 서브넷의 라우트 테이블에서 IGW로 직접 라우팅하면 앱/DB 서버가 인터넷에 직접 노출됩니다.

**(C)** : 프라이빗 서브넷에 NAT를 배치하면 올바르지 않습니다.

**(D)** : IGW로의 직접 라우팅은 요건에 어긋납니다.

**핵심 개념:** VPC 배스천 호스트 + NAT 인스턴스 패턴 — 프라이빗 서브넷의 원격 관리 및 아웃바운드 인터넷 접근

---

### Q398. After deciding that EMR will be useful in analysing vast amounts of data for a gaming website that you are architecting you have just deployed an Amazon EMR Cluster and wish to monitor the cluster performance. Which of the following tools cannot be used to monitor the cluster performance?

**Options:**
- A) Kinesis.
- B) Ganglia.
- C) CloudWatch Metrics.
- D) Hadoop Web Interfaces.

**Answer:** A

**해설:**

> **문제:** Amazon EMR 클러스터 성능을 모니터링하는 데 사용할 수 없는 도구는?

| 선지 | 번역 |
|------|------|
| A | Kinesis. |
| B | Ganglia. |
| C | CloudWatch Metrics. |
| D | Hadoop Web Interfaces. |

**(A) 정답** : Amazon Kinesis는 실시간 데이터 스트리밍 서비스로, EMR 클러스터 성능 모니터링 도구가 아닙니다.

**(B)** : Ganglia는 EMR 클러스터의 오픈소스 모니터링 시스템으로 클러스터 성능 추적에 사용됩니다.

**(C)** : CloudWatch는 EMR 클러스터 메트릭을 수집하고 모니터링하는 데 사용됩니다.

**(D)** : Hadoop Web Interfaces(ResourceManager, NameNode 등)는 EMR 클러스터 모니터링에 사용됩니다.

**핵심 개념:** EMR 클러스터 모니터링 도구 — Ganglia, CloudWatch, Hadoop Web UI. Kinesis는 모니터링 도구가 아님

---

### Q399. A/An [...] is the concept of allowing (or disallowing) an entity such as a user, group, or role some type of access to one or more resources.

**Options:**
- A) user.
- B) AWS Account.
- C) resource.
- D) permission.

**Answer:** B

**해설:**

> **문제:** [...]는 사용자, 그룹 또는 역할과 같은 엔터티가 하나 이상의 리소스에 일정 유형의 접근을 허용하거나 거부하는 개념입니다.

| 선지 | 번역 |
|------|------|
| A | 사용자. |
| B | AWS 계정. |
| C | 리소스. |
| D | 권한. |

**(A)** : 사용자는 접근을 수행하는 주체이지 개념 자체가 아닙니다.

**(B) 정답** : 이 문제의 정답은 B(AWS Account)로 표시되어 있습니다. 단, 일반적인 AWS 개념으로는 '권한(permission)'이 이 설명에 더 적합합니다. AWS 계정은 모든 IAM 엔터티와 리소스를 포함하는 컨테이너로, 접근 제어의 최상위 개념입니다.

**(C)** : 리소스는 접근 대상이지 접근 제어 개념이 아닙니다.

**(D)** : 권한이 더 직접적인 답변이지만, 이 문제의 정답은 B입니다.

**핵심 개념:** AWS 접근 제어 — AWS 계정 수준의 엔터티 접근 관리 개념

---

### Q400. You are running a successful multitier web application on AWS and your marketing department has asked you to add a reporting tier to the application. The reporting tier will aggregate and publish status reports every 30 minutes from user-generated information that is being stored in your web application's database. You are currently running a Multi-AZ RDS MySQL instance for the database tier. You also have implemented Elasticache as a database caching layer between the application tier and database tier. Please select the answer that will allow you to successfully implement the reporting tier with as little impact as possible to your database.

**Options:**
- A) Continually send transaction logs from your master database to an S3 bucket and generate the reports off the S3 bucket using S3 byte range requests.
- B) Generate the reports by querying the synchronously replicated standby RDS MySQL instance maintained through Multi-AZ.
- C) Launch a RDS Read Replica connected to your Multi-AZ master database and generate reports by querying the Read Replica.
- D) Generate the reports by querying the ElastiCache database caching tier.

**Answer:** C

**해설:**

> **문제:** Multi-AZ RDS MySQL과 ElastiCache가 있는 환경에서 30분마다 보고서를 생성하는 보고 티어를 추가하되 데이터베이스에 미치는 영향을 최소화하려면?

| 선지 | 번역 |
|------|------|
| A | 마스터 DB에서 S3로 트랜잭션 로그를 지속적으로 전송하고 S3 바이트 범위 요청으로 보고서 생성. |
| B | Multi-AZ를 통해 유지되는 동기 복제 스탠바이 RDS MySQL 인스턴스를 쿼리하여 보고서 생성. |
| C | Multi-AZ 마스터 DB에 연결된 RDS Read Replica를 시작하고 Read Replica를 쿼리하여 보고서 생성. |
| D | ElastiCache 캐싱 티어를 쿼리하여 보고서 생성. |

**(A)** : S3에 트랜잭션 로그를 전송하는 것은 복잡하고 실시간성이 떨어집니다.

**(B)** : Multi-AZ 스탠바이는 자동 장애 조치용으로 보고서 쿼리에 사용할 수 없습니다(읽기 접근 불가).

**(C) 정답** : Read Replica를 생성하면 보고 쿼리를 마스터 DB가 아닌 복제본으로 분산할 수 있어 마스터 DB에 미치는 영향을 최소화합니다. 이것이 읽기 쿼리 부하 분산의 표준 방법입니다.

**(D)** : ElastiCache는 전체 DB 데이터를 캐싱하지 않으며, 복잡한 집계 보고서 생성에 적합하지 않습니다.

**핵심 개념:** RDS Read Replica — 보고/분석 쿼리 부하를 프라이머리 DB에서 분리하는 표준 방법

---

