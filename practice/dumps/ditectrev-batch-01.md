# Ditectrev SAA-C03 Practice Questions — Batch 01 (Q1-Q50)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q1. What is the minimum time interval for the data that Amazon CloudWatch receives and aggregates?

**Options:**
- A) One second.
- B) Five seconds.
- C) One minute.
- D) Three minutes.
- E) Five minutes.

**Answer:** C

**해설:**

> **문제:** Amazon CloudWatch가 수신하고 집계하는 데이터의 최소 시간 간격은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 1초 |
| B | 5초 |
| C | 1분 |
| D | 3분 |
| E | 5분 |

**(A)** : CloudWatch는 1초 단위 데이터를 직접 집계하지 않는다. High-Resolution 커스텀 지표는 1초 해상도를 지원하지만, 표준 집계 최소 단위는 1분이다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : 5초 간격은 CloudWatch의 표준 집계 단위가 아니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C) 정답** : CloudWatch의 표준 집계 최소 단위는 1분(60초)이다. 기본(Basic) 모니터링은 5분 간격, 상세(Detailed) 모니터링은 1분 간격으로 지표를 수집한다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : 3분 간격은 CloudWatch에서 사용하지 않는 단위이다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(E)** : 5분은 Basic 모니터링의 기본 간격이지만, 집계의 최소 단위는 아니다.

**핵심 개념:** CloudWatch 모니터링 간격 (Basic vs Detailed Monitoring)

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q2. A user has launched an EC2 instance. The instance got terminated as soon as it was launched. Which of the below mentioned options is not a possible reason for this?

**Options:**
- A) The user account has reached the maximum volume limit.
- B) The AMI is missing. It is the required part.
- C) The snapshot is corrupt.
- D) The user account has reached the maximum EC2 instance limit.

**Answer:** D

**해설:**

> **문제:** 사용자가 EC2 인스턴스를 시작했는데 시작하자마자 종료되었다. 아래 중 가능한 원인이 아닌 것은?

| 선지 | 번역 |
|------|------|
| A | 사용자 계정이 최대 볼륨 한도에 도달했다 |
| B | AMI가 누락되었다 (필수 요소) |
| C | 스냅샷이 손상되었다 |
| D | 사용자 계정이 최대 EC2 인스턴스 한도에 도달했다 |

**(A)** : EBS 볼륨 한도 초과는 인스턴스 즉시 종료의 원인이 될 수 있다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : AMI 누락은 인스턴스를 시작할 수 없게 만들어 즉시 종료되는 원인이 된다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(C)** : 스냅샷 손상은 인스턴스 부팅 실패로 이어져 즉시 종료를 유발할 수 있다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(D) 정답** : 최대 인스턴스 한도에 도달하면 인스턴스 자체가 시작(launch)되지 않는다. 시작 후 즉시 종료되는 것이 아니라 아예 실행이 거부되므로 이 옵션은 즉시 종료의 원인이 아니다.

**핵심 개념:** EC2 인스턴스 즉시 종료(Immediate Termination) 원인

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q3. Your website is serving on-demand training videos to your workforce. Videos are uploaded monthly in high resolution MP4 format. Your workforce is distributed globally often on the move and using company-provided tablets that require the HTTP Live Streaming (HLS) protocol to watch a video. Your company has no video transcoding expertise and it required you may need to pay for a consultant. How do you implement the most cost-efficient architecture without compromising high availability and quality of video delivery?

**Options:**
- A) A video transcoding pipeline running on EC2 using SQS to distribute tasks and Auto Scaling to adjust the number of nodes depending on the length of the queue. EBS volumes to host videos and EBS snapshots to incrementally backup original files after a few days. CloudFront to serve HLS transcoded videos from EC2.
- B) Elastic Transcoder to transcode original high-resolution MP4 videos to HLS. EBS volumes to host videos and EBS snapshots to incrementally backup original files after a few days. CloudFront to serve HLS transcoded videos from EC2.
- C) Elastic Transcoder to transcode original high-resolution MP4 videos to HLS. S3 to host videos with Lifecycle Management to archive original files to Glacier after a few days. CloudFront to serve HLS transcoded videos from S3.
- D) A video transcoding pipeline running on EC2 using SQS to distribute tasks and Auto Scaling to adjust the number of nodes depending on the length of the queue. S3 to host videos with Lifecycle Management to archive all files to Glacier after a few days. CloudFront to serve HLS transcoded videos from Glacier.

**Answer:** C

**해설:**

> **문제:** 전 세계에 분산된 직원들을 위해 HLS 프로토콜이 필요한 온디맨드 교육 동영상을 제공해야 한다. 트랜스코딩 전문 지식 없이 가장 비용 효율적인 고가용성 아키텍처는?

| 선지 | 번역 |
|------|------|
| A | EC2 기반 트랜스코딩 파이프라인 + SQS + Auto Scaling, EBS 볼륨 저장, CloudFront로 EC2에서 제공 |
| B | Elastic Transcoder로 HLS 변환, EBS 볼륨 저장, CloudFront로 EC2에서 제공 |
| C | Elastic Transcoder로 HLS 변환, S3 저장 + Lifecycle로 Glacier 아카이브, CloudFront로 S3에서 제공 |
| D | EC2 기반 트랜스코딩 파이프라인 + SQS + Auto Scaling, S3 저장 + Lifecycle로 Glacier 아카이브, CloudFront로 Glacier에서 제공 |

**(A)** : EC2 기반 커스텀 트랜스코딩 파이프라인은 관리 복잡도와 비용이 높으며, EBS는 비디오 호스팅에 비효율적이다.

**(B)** : Elastic Transcoder는 올바른 선택이나, EBS 기반 저장과 EC2를 통한 제공은 비용 효율적이지 않다.

**(C) 정답** : Elastic Transcoder(관리형 트랜스코딩 서비스)로 전문 지식 불필요, S3로 내구성 높은 스토리지 제공, Lifecycle Management로 Glacier 아카이브로 비용 절감, CloudFront로 글로벌 저지연 배포. 완전 관리형 서비스 조합으로 가장 비용 효율적이다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(D)** : Glacier에서 직접 CloudFront로 콘텐츠를 제공할 수 없으며, EC2 기반 파이프라인은 비용이 높다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**핵심 개념:** Elastic Transcoder, S3 Lifecycle Management, CloudFront 글로벌 배포

**관련 노트:** [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념), [S3 Lifecycle Rules 수명주기 규칙](/section/11-s3-advanced#s3-lifecycle-rules-수명주기-규칙)

---

### Q4. You are designing an intrusion detection prevention (IDS/IPS) solution for a customer web application in a single VPC. You are considering the options for implementing IOS IPS protection for traffic coming from the Internet. Which of the following options would you consider? (Choose 2 answers)

**Options:**
- A) Implement IDS/IPS agents on each Instance running in VPC.
- B) Configure an instance in each subnet to switch its network interface card to promiscuous mode and analyze network traffic.
- C) Implement Elastic Load Balancing with SSL listeners in front of the web applications.
- D) Implement a reverse proxy layer in front of web servers and configure IDS/ IPS agents on each reverse proxy server.

**Answer:** A, D

**해설:**

> **문제:** 단일 VPC 내 고객 웹 애플리케이션을 위한 IDS/IPS 솔루션을 설계할 때, 인터넷에서 들어오는 트래픽 보호를 위해 고려할 옵션 2가지는?

| 선지 | 번역 |
|------|------|
| A | VPC에서 실행 중인 각 인스턴스에 IDS/IPS 에이전트 구현 |
| B | 각 서브넷의 인스턴스를 무차별 모드(promiscuous mode)로 설정하여 네트워크 트래픽 분석 |
| C | 웹 애플리케이션 앞에 SSL 리스너가 있는 ELB 구현 |
| D | 웹 서버 앞에 리버스 프록시 레이어를 구현하고 각 리버스 프록시 서버에 IDS/IPS 에이전트 구성 |

**(A) 정답** : 각 인스턴스에 IDS/IPS 에이전트를 설치하면 호스트 레벨에서 트래픽을 모니터링하고 침입을 탐지/차단할 수 있다.

**(B)** : AWS VPC에서는 네트워크 인터페이스를 무차별 모드(promiscuous mode)로 설정해도 다른 인스턴스의 트래픽을 캡처할 수 없다. VPC는 이를 허용하지 않는다. → [📖 VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

**(C)** : ELB with SSL은 트래픽 암호화/복호화를 처리하지만 IDS/IPS 기능은 아니다. → [📖 SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)

**(D) 정답** : 리버스 프록시 레이어를 구성하고 그 위에 IDS/IPS 에이전트를 설치하면 모든 인바운드 트래픽을 중앙에서 검사할 수 있는 효율적인 구조가 된다.

**핵심 개념:** VPC IDS/IPS 구현 패턴, 네트워크 보안 아키텍처

**관련 노트:** [AWS Network Firewall](/section/25-vpc#aws-network-firewall), [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

---

### Q5. Which of the following are valid statements about Amazon S3? (Choose 2 answers)

**Options:**
- A) Amazon S3 provides read-after-write consistency for any type of PUT or DELETE.
- B) Consistency is not guaranteed for any type of PUT or DELETE.
- C) A successful response to a PUT request only occurs when a complete object is saved.
- D) Partially saved objects are immediately readable with a GET after an overwrite PUT.
- E) S3 provides eventual consistency for overwrite PUTS and DELETE.

**Answer:** C, E

**해설:**

> **문제:** Amazon S3에 대한 올바른 설명 2가지는?

| 선지 | 번역 |
|------|------|
| A | Amazon S3는 모든 유형의 PUT 또는 DELETE에 대해 read-after-write 일관성을 제공한다 |
| B | 모든 유형의 PUT 또는 DELETE에 대해 일관성이 보장되지 않는다 |
| C | PUT 요청에 대한 성공 응답은 완전한 객체가 저장된 경우에만 발생한다 |
| D | 덮어쓰기 PUT 후 부분적으로 저장된 객체를 GET으로 즉시 읽을 수 있다 |
| E | S3는 덮어쓰기 PUT 및 DELETE에 대해 결과적 일관성(eventual consistency)을 제공한다 |

**(A)** : 신규 객체 PUT은 read-after-write 일관성을 제공하지만, 덮어쓰기 PUT과 DELETE는 결과적 일관성을 제공한다(이 문제 작성 당시 기준). 현재 S3는 강한 일관성을 제공하지만, 시험 맥락에서는 이 구분이 중요하다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**(B)** : 신규 PUT은 일관성이 보장되므로 완전히 틀린 설명이다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**(C) 정답** : S3에서 PUT 요청의 성공(200 OK) 응답은 객체가 완전히 저장되었을 때만 반환된다. 부분 저장된 객체에 대해 성공 응답이 오지 않는다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**(D)** : 부분 저장된 객체는 읽을 수 없다. PUT 성공 전까지 이전 버전만 반환된다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**(E) 정답** : (당시 기준) S3는 덮어쓰기 PUT과 DELETE에 대해 결과적 일관성(eventual consistency)을 제공했다. 변경 후 즉시 읽으면 이전 데이터가 반환될 수 있었다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**핵심 개념:** S3 데이터 일관성 모델 (Read-after-write vs Eventual Consistency)

**관련 노트:** [S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

---

### Q6. How can the domain's zone apex, for example, 'myzoneapexdomain.com', be pointed towards an Elastic Load Balancer?

**Options:**
- A) By using an Amazon Route 53 Alias record.
- B) By using an AAAA record.
- C) By using an Amazon Route 53 CNAME record.
- D) By using an A record.

**Answer:** A

**해설:**

> **문제:** 'myzoneapexdomain.com' 같은 도메인의 존 에이펙스(zone apex)를 Elastic Load Balancer로 연결하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Route 53 Alias 레코드 사용 |
| B | AAAA 레코드 사용 |
| C | Amazon Route 53 CNAME 레코드 사용 |
| D | A 레코드 사용 |

**(A) 정답** : Route 53 Alias 레코드는 존 에이펙스(루트 도메인)에서 AWS 리소스(ELB, CloudFront, S3 등)로 라우팅할 수 있는 Route 53 전용 기능이다. CNAME과 달리 존 에이펙스에서도 사용 가능하며, AWS 리소스의 IP 변경에 자동으로 대응한다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B)** : AAAA 레코드는 IPv6 주소를 위한 레코드로, ELB 연결에 적합하지 않다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(C)** : CNAME 레코드는 존 에이펙스(루트 도메인)에는 사용할 수 없다. DNS 표준에 의해 루트 도메인에 CNAME을 설정하는 것은 금지되어 있다. → [📖 CNAME vs Alias](/section/08-route-53#cname-vs-alias)

**(D)** : A 레코드는 정적 IP를 가리키는데, ELB의 IP는 동적으로 변경되므로 적합하지 않다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**핵심 개념:** Route 53 Alias 레코드, Zone Apex (루트 도메인) 라우팅

**관련 노트:** [CNAME vs Alias](/section/08-route-53#cname-vs-alias), [Alias Record 대상](/section/08-route-53#alias-record-대상)

---

### Q7. When should I choose Provisioned IOPS over Standard RDS storage?

**Options:**
- A) If you have batch-oriented workloads.
- B) If you use production online transaction processing (OLTP) workloads.
- C) If you have workloads that are not sensitive to consistent performance.

**Answer:** B

**해설:**

> **문제:** 표준 RDS 스토리지 대신 Provisioned IOPS를 선택해야 하는 경우는?

| 선지 | 번역 |
|------|------|
| A | 배치 중심 워크로드가 있는 경우 |
| B | 프로덕션 OLTP(온라인 트랜잭션 처리) 워크로드를 사용하는 경우 |
| C | 일관된 성능에 민감하지 않은 워크로드가 있는 경우 |

**(A)** : 배치 워크로드는 일반적으로 지연 시간에 덜 민감하며 Standard 스토리지로도 충분하다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B) 정답** : Provisioned IOPS는 I/O 집약적인 프로덕션 OLTP 워크로드를 위해 설계되었다. 일관되고 예측 가능한 낮은 지연 시간 I/O 성능이 필요한 경우에 적합하다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : 성능 일관성에 민감하지 않은 워크로드는 비용이 낮은 Standard(gp2/gp3) 스토리지로 충분하다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**핵심 개념:** RDS 스토리지 유형 (Standard vs Provisioned IOPS), OLTP 워크로드

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [RDS Storage Auto Scaling](/section/07-rds-aurora-elasticache#rds-storage-auto-scaling)

---

### Q8. Your department creates regular analytics reports from your company's log files All log data is collected in Amazon S3 and processed by daily Amazon Elastic MapReduce (EMR) jobs that generate daily PDF reports and aggregated tables in CSV format for an Amazon Redshift data warehouse. Which of the following alternatives will lower costs without compromising average performance of the system or data integrity for the raw data?

**Options:**
- A) Use reduced redundancy storage (RRS) for all data in S3. Use a combination of Spot Instances and Reserved Instances for Amazon EMR jobs. Use Reserved Instances for Amazon Redshift.
- B) Use reduced redundancy storage (RRS) for PDF and .csv data in S3. Add Spot Instances to EMR jobs. Use Spot Instances for Amazon Redshift.
- C) Use reduced redundancy storage (RRS) for PDF and .csv data in Amazon S3. Add Spot Instances to Amazon EMR jobs. Use Reserved Instances for Amazon Redshift.
- D) Use reduced redundancy storage (RRS) for all data in Amazon S3. Add Spot Instances to Amazon EMR jobs. Use Reserved Instances for Amazon Redshift.

**Answer:** C

**해설:**

> **문제:** S3에 로그를 수집하고 EMR로 일일 PDF 리포트와 CSV 집계 테이블을 생성하여 Redshift에 저장하는 구조에서, 원본 데이터 무결성을 유지하면서 비용을 절감하는 최선의 방법은?

| 선지 | 번역 |
|------|------|
| A | S3의 모든 데이터에 RRS 사용, EMR에 Spot + Reserved 조합, Redshift에 Reserved 사용 |
| B | S3의 PDF/CSV에 RRS 사용, EMR에 Spot 추가, Redshift에 Spot 사용 |
| C | S3의 PDF/CSV에 RRS 사용, EMR에 Spot 추가, Redshift에 Reserved 사용 |
| D | S3의 모든 데이터에 RRS 사용, EMR에 Spot 추가, Redshift에 Reserved 사용 |

**(A)** : 원본 로그 데이터에 RRS를 사용하면 데이터 무결성이 위험에 처한다. 원본 데이터는 Standard 스토리지를 사용해야 한다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B)** : Redshift에 Spot 인스턴스를 사용하면 중단 위험이 있어 데이터 웨어하우스의 가용성이 저하된다. → [📖 Amazon Redshift](/section/20-data-analytics#amazon-redshift)

**(C) 정답** : PDF/CSV는 재생성 가능한 데이터이므로 RRS를 사용해 비용 절감 가능. EMR의 배치 작업에는 Spot 인스턴스를 추가하여 비용 절감. Redshift는 지속적인 운영이 필요하므로 Reserved Instance로 비용을 최적화한다. 원본 로그 데이터는 Standard 스토리지로 무결성 보장. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : 원본 로그 데이터에 RRS를 사용하면 데이터 손실 위험이 생긴다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** S3 RRS (Reduced Redundancy Storage), EMR Spot Instance, Redshift Reserved Instance

**관련 노트:** [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스), [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심), [Amazon Redshift](/section/20-data-analytics#amazon-redshift)

---

### Q9. Because of the extensibility limitations of striped storage attached to Windows Server, Amazon RDS does not currently support increasing storage on a [...] DB Instance.

**Options:**
- A) SQL Server.
- B) MySQL.
- C) Oracle.

**Answer:** A

**해설:**

> **문제:** Windows Server에 연결된 스트라이프 스토리지의 확장성 제한으로 인해 Amazon RDS가 [...] DB 인스턴스의 스토리지 증가를 지원하지 않는다.

| 선지 | 번역 |
|------|------|
| A | SQL Server |
| B | MySQL |
| C | Oracle |

**(A) 정답** : SQL Server는 Windows Server 기반으로 실행되며, Windows Server의 스트라이프 스토리지 확장성 제한으로 인해 RDS SQL Server 인스턴스는 스토리지를 동적으로 늘리는 데 제약이 있었다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : MySQL은 Linux 기반으로 실행되므로 이 제한이 적용되지 않는다.

**(C)** : Oracle도 Linux 기반으로 실행되며 스토리지 확장이 가능하다.

**핵심 개념:** RDS SQL Server 스토리지 제한, Windows Server 스트라이프 스토리지

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q10. In regards to IAM you can edit user properties later, but you cannot use the console to change the [...].

**Options:**
- A) user name.
- B) password.
- C) default group.

**Answer:** A

**해설:**

> **문제:** IAM에서 나중에 사용자 속성을 편집할 수 있지만, 콘솔에서 [...]은 변경할 수 없다.

| 선지 | 번역 |
|------|------|
| A | 사용자 이름 |
| B | 비밀번호 |
| C | 기본 그룹 |

**(A) 정답** : IAM 콘솔에서는 사용자 이름(user name)을 변경할 수 없다. 사용자 이름을 변경하려면 AWS CLI나 API를 사용해야 한다. → [📖 Users & Groups](/section/02-iam#users-groups)

**(B)** : 비밀번호는 IAM 콘솔에서 변경 가능하다. → [📖 Password Policy 비밀번호 정책](/section/02-iam#password-policy-비밀번호-정책)

**(C)** : IAM에는 "기본 그룹"이라는 개념 자체가 없으며, 그룹 멤버십은 콘솔에서 변경 가능하다. → [📖 Users & Groups](/section/02-iam#users-groups)

**핵심 개념:** IAM 사용자 관리, 사용자 이름 변경 제약

**관련 노트:** [Users & Groups](/section/02-iam#users-groups), [IAM Security Tools](/section/02-iam#iam-security-tools)

---

### Q11. In Amazon EC2 Container Service, are other container types supported?

**Options:**
- A) Yes, EC2 Container Service supports any container service you need.
- B) Yes, EC2 Container Service also supports Microsoft container service.
- C) No, Docker is the only container platform supported by EC2 Container Service presently.
- D) Yes, EC2 Container Service supports Microsoft container service and Openstack.

**Answer:** C

**해설:**

> **문제:** Amazon EC2 Container Service에서 다른 컨테이너 유형을 지원하는가?

| 선지 | 번역 |
|------|------|
| A | 예, EC2 Container Service는 필요한 모든 컨테이너 서비스를 지원한다 |
| B | 예, EC2 Container Service는 Microsoft 컨테이너 서비스도 지원한다 |
| C | 아니오, 현재 Docker가 EC2 Container Service에서 지원하는 유일한 컨테이너 플랫폼이다 |
| D | 예, EC2 Container Service는 Microsoft 컨테이너 서비스와 Openstack을 지원한다 |

**(A)** : 잘못된 설명이다. ECS는 모든 컨테이너 서비스를 지원하지 않는다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(B)** : ECS는 Microsoft 컨테이너 서비스를 지원하지 않는다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(C) 정답** : Amazon ECS(EC2 Container Service)는 Docker 컨테이너만 지원한다. Docker가 유일한 지원 컨테이너 플랫폼이다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(D)** : OpenStack이나 Microsoft 컨테이너 서비스는 지원하지 않는다.

**핵심 개념:** Amazon ECS, Docker 컨테이너 지원

**관련 노트:** [Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service), [Docker 기본 개념](/section/16-containers#docker-기본-개념)

---

### Q12. Content and Media Server is the latest requirement that you need to meet for a client. The client has been very specific about his requirements such as low latency, high availability, durability, and access control. Potentially there will be millions of views on this server and because of 'spiky' usage patterns, operations teams will need to provision static hardware, network, and management resources to support the maximum expected need. The Customer base will be initially low but is expected to grow and become more geographically distributed. Which of the following would be a good solution for content distribution?

**Options:**
- A) Amazon S3 as both the origin server and for caching.
- B) AWS Storage Gateway as the origin server and Amazon EC2 for caching.
- C) AWS CloudFront as both the origin server and for caching.
- D) Amazon S3 as the origin server and Amazon CloudFront for caching.

**Answer:** D

**해설:**

> **문제:** 저지연, 고가용성, 내구성, 접근 제어가 요구되는 콘텐츠 및 미디어 서버를 구축해야 한다. 수백만 뷰가 예상되고 급격한 트래픽 패턴이 있으며 글로벌 사용자 기반이 예상된다. 콘텐츠 배포에 적합한 솔루션은?

| 선지 | 번역 |
|------|------|
| A | S3를 오리진 서버와 캐싱 모두에 사용 |
| B | AWS Storage Gateway를 오리진 서버로, EC2를 캐싱에 사용 |
| C | CloudFront를 오리진 서버와 캐싱 모두에 사용 |
| D | S3를 오리진 서버로, CloudFront를 캐싱에 사용 |

**(A)** : S3는 캐싱 기능이 없다. 글로벌 저지연을 위한 엣지 캐싱을 제공하지 않는다. → [📖 S3 사용 사례](/section/10-amazon-s3#s3-사용-사례)

**(B)** : Storage Gateway는 온프레미스와 클라우드를 연결하는 서비스로 콘텐츠 배포 오리진으로 적합하지 않다. → [📖 AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

**(C)** : CloudFront는 CDN 서비스로 오리진 서버 역할을 하지 않는다. 반드시 오리진 서버(S3, EC2 등)가 필요하다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(D) 정답** : S3는 내구성(99.999999999%), 가용성, 접근 제어(버킷 정책, ACL)를 모두 갖춘 오리진 서버로 적합하다. CloudFront는 글로벌 엣지 로케이션을 통해 저지연 캐싱과 콘텐츠 배포를 제공하며, 급격한 트래픽 패턴에도 자동으로 확장된다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**핵심 개념:** S3 + CloudFront 콘텐츠 배포 아키텍처

**관련 노트:** [CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스), [S3 사용 사례](/section/10-amazon-s3#s3-사용-사례)

---

### Q13. Name the disk storage supported by Amazon Elastic Compute Cloud (EC2)

**Options:**
- A) None of these.
- B) Amazon AppStream store.
- C) Amazon SNS store.
- D) Amazon Instance Store.

**Answer:** D

**해설:**

> **문제:** Amazon EC2가 지원하는 디스크 스토리지의 이름은?

| 선지 | 번역 |
|------|------|
| A | 해당 없음 |
| B | Amazon AppStream 스토어 |
| C | Amazon SNS 스토어 |
| D | Amazon Instance Store |

**(A)** : EC2는 디스크 스토리지를 지원하므로 틀리다.

**(B)** : AppStream은 스트리밍 서비스로 EC2 디스크 스토리지가 아니다.

**(C)** : SNS는 알림 서비스로 디스크 스토리지가 아니다. → [📖 Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(D) 정답** : Instance Store(인스턴스 스토어)는 EC2 인스턴스에 물리적으로 연결된 임시 블록 스토리지다. 호스트 서버에 직접 연결된 디스크이며, 인스턴스 종료 시 데이터가 삭제된다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** EC2 Instance Store (임시 스토리지)

**관련 노트:** [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store), [EBS vs EFS vs Instance Store 비교 시험 핵심!](/section/05-ec2-instance-storage#ebs-vs-efs-vs-instance-store-비교-시험-핵심)

---

### Q14. After an Amazon VPC instance is launched, can I change the VPC security groups it belongs to?

**Options:**
- A) Only if the tag 'VPC_Change_Group' is true.
- B) Yes. You can.
- C) No. You cannot.
- D) Only if the tag 'VPC Change Group' is true.

**Answer:** B

**해설:**

> **문제:** Amazon VPC 인스턴스가 시작된 후 VPC 보안 그룹을 변경할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 'VPC_Change_Group' 태그가 true인 경우에만 가능 |
| B | 예, 가능하다 |
| C | 아니오, 불가능하다 |
| D | 'VPC Change Group' 태그가 true인 경우에만 가능 |

**(A)** : 그런 태그 조건은 존재하지 않는다.

**(B) 정답** : VPC 인스턴스의 보안 그룹은 인스턴스 실행 중에도 변경할 수 있다. EC2 콘솔이나 API를 통해 언제든지 보안 그룹을 추가하거나 제거할 수 있다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(C)** : 보안 그룹은 실행 중인 인스턴스에서도 변경 가능하다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 그런 태그 조건은 존재하지 않는다.

**핵심 개념:** VPC 보안 그룹 동적 변경

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

---

### Q15. If I want an instance to have a public IP address, which IP address should I use?

**Options:**
- A) Elastic IP Address.
- B) Class B IP Address.
- C) Class A IP Address.
- D) Dynamic IP Address.

**Answer:** A

**해설:**

> **문제:** 인스턴스에 퍼블릭 IP 주소를 부여하려면 어떤 IP 주소를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Elastic IP 주소 |
| B | 클래스 B IP 주소 |
| C | 클래스 A IP 주소 |
| D | 동적 IP 주소 |

**(A) 정답** : Elastic IP(EIP)는 AWS에서 할당하는 고정 퍼블릭 IP 주소로, 인스턴스를 중지/재시작해도 IP가 변하지 않는다. 안정적인 퍼블릭 IP가 필요할 때 사용한다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**(B)** : Class B/C는 IP 주소 클래스 분류로, AWS 리소스에 직접 적용되는 개념이 아니다.

**(C)** : Class A도 마찬가지로 AWS 서비스와 직접 관련이 없다.

**(D)** : 동적 IP는 인스턴스 재시작 시 변경될 수 있어 신뢰할 수 없다.

**핵심 개념:** Elastic IP Address (고정 퍼블릭 IP)

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip), [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

---

### Q16. Amazon RDS supports SOAP only through [...].

**Options:**
- A) HTTP or HTTPS.
- B) TCP/IP.
- C) HTTP.
- D) HTTPS.

**Answer:** D

**해설:**

> **문제:** Amazon RDS는 [...] 를 통해서만 SOAP를 지원한다.

| 선지 | 번역 |
|------|------|
| A | HTTP 또는 HTTPS |
| B | TCP/IP |
| C | HTTP |
| D | HTTPS |

**(A)** : HTTP는 암호화가 없어 보안상 SOAP 통신에 권장되지 않는다.

**(B)** : TCP/IP는 전송 계층 프로토콜이며 SOAP 지원 프로토콜을 특정하지 않는다.

**(C)** : HTTP만으로는 보안 통신이 되지 않아 RDS SOAP API에서 지원하지 않는다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D) 정답** : Amazon RDS는 SOAP를 HTTPS를 통해서만 지원한다. HTTPS는 데이터 전송 중 암호화를 보장하여 보안을 유지한다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS API 보안, SOAP over HTTPS

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안)

---

### Q17. Which of the following services natively encrypts data at rest within an AWS region? (Choose 2 answers)

**Options:**
- A) AWS Storage Gateway.
- B) Amazon DynamoDB.
- C) Amazon CloudFront.
- D) Amazon Glacier.
- E) Amazon Simple Queue Service.

**Answer:** A, D

**해설:**

> **문제:** AWS 리전 내에서 저장 데이터(data at rest)를 기본적으로 암호화하는 서비스 2가지는?

| 선지 | 번역 |
|------|------|
| A | AWS Storage Gateway |
| B | Amazon DynamoDB |
| C | Amazon CloudFront |
| D | Amazon Glacier |
| E | Amazon Simple Queue Service |

**(A) 정답** : AWS Storage Gateway는 로컬 게이트웨이에서 AWS로 전송되는 데이터를 SSL로 암호화하고, AWS에 저장할 때 기본적으로 AES-256으로 암호화한다. → [📖 AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

**(B)** : DynamoDB는 기본적으로 저장 데이터를 암호화하지 않았다(당시 기준). 암호화는 선택적으로 활성화해야 했다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C)** : CloudFront는 CDN 서비스로 전송 중 암호화(HTTPS)를 제공하지만 저장 데이터 암호화 서비스가 아니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D) 정답** : Amazon Glacier(현 S3 Glacier)는 모든 저장 데이터를 기본적으로 AES-256으로 암호화한다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(E)** : SQS는 기본적으로 저장 데이터를 암호화하지 않는다. SSE(Server-Side Encryption)는 선택적으로 활성화해야 한다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** AWS 서비스별 기본(native) 저장 데이터 암호화

**관련 노트:** [AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway), [암호화 기본 개념](/section/24-security-encryption#암호화-기본-개념)

---

### Q18. Which one of the following can't be used as an origin server with Amazon CloudFront?

**Options:**
- A) A web server running in your infrastructure.
- B) Amazon S3.
- C) Amazon Glacier.
- D) A web server running on Amazon EC2 instances.

**Answer:** C

**해설:**

> **문제:** Amazon CloudFront의 오리진 서버로 사용할 수 없는 것은?

| 선지 | 번역 |
|------|------|
| A | 자체 인프라에서 실행되는 웹 서버 |
| B | Amazon S3 |
| C | Amazon Glacier |
| D | Amazon EC2 인스턴스에서 실행되는 웹 서버 |

**(A)** : 온프레미스 또는 다른 클라우드의 커스텀 오리진 웹 서버를 CloudFront 오리진으로 사용할 수 있다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(B)** : S3는 CloudFront의 가장 일반적인 오리진 서버 중 하나다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(C) 정답** : Amazon Glacier는 아카이브 스토리지로 직접 HTTP 접근이 불가능하다. CloudFront 오리진으로 사용할 수 없다. Glacier에 저장된 콘텐츠는 먼저 복원(restore)한 후 S3를 통해 접근해야 한다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(D)** : EC2에서 실행되는 웹 서버는 CloudFront의 커스텀 오리진으로 사용 가능하다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**핵심 개념:** CloudFront 오리진 서버 유형, Glacier 접근 방식

**관련 노트:** [CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스), [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

---

### Q19. Select the most correct: The device name /dev/sda1 (within Amazon EC2) is [...].

**Options:**
- A) possible for EBS volumes.
- B) reserved for the root device.
- C) recommended for EBS volumes.
- D) recommended for instance store volumes.

**Answer:** B

**해설:**

> **문제:** Amazon EC2 내에서 디바이스 이름 /dev/sda1은 [...].

| 선지 | 번역 |
|------|------|
| A | EBS 볼륨에 사용 가능하다 |
| B | 루트 디바이스용으로 예약되어 있다 |
| C | EBS 볼륨에 권장된다 |
| D | 인스턴스 스토어 볼륨에 권장된다 |

**(A)** : /dev/sda1은 EBS 볼륨에 일반적으로 사용되지 않는다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B) 정답** : /dev/sda1은 EC2에서 루트 디바이스(root device)용으로 예약된 이름이다. 루트 볼륨(운영 체제가 설치된 볼륨)이 이 디바이스 이름을 사용한다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C)** : 추가 EBS 볼륨에는 /dev/sdf ~ /dev/sdp 같은 이름을 권장한다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : 인스턴스 스토어에는 /dev/sdb 같은 다른 이름이 사용된다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** EC2 디바이스 이름 규칙, 루트 디바이스

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

---

### Q20. How can I change the security group membership for interfaces owned by other AWS, such as Elastic Load Balancing?

**Options:**
- A) By using the service specific console or API/CLI commands.
- B) None of these.
- C) Using Amazon EC2 API/CLI.
- D) Using all these methods.

**Answer:** A

**해설:**

> **문제:** Elastic Load Balancing 같은 다른 AWS 서비스가 소유한 인터페이스의 보안 그룹 멤버십을 변경하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 서비스별 콘솔 또는 API/CLI 명령 사용 |
| B | 해당 방법 없음 |
| C | Amazon EC2 API/CLI 사용 |
| D | 위의 모든 방법 사용 |

**(A) 정답** : ELB 같은 AWS 관리형 서비스가 소유한 네트워크 인터페이스의 보안 그룹을 변경하려면 해당 서비스(ELB)의 전용 콘솔이나 API/CLI를 사용해야 한다. EC2 콘솔에서 직접 변경할 수 없다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B)** : 변경 방법이 존재한다.

**(C)** : EC2 API/CLI로는 AWS 관리형 서비스가 소유한 인터페이스를 변경할 수 없다.

**(D)** : 모든 방법이 작동하는 것은 아니다.

**핵심 개념:** AWS 관리형 서비스 네트워크 인터페이스 보안 그룹 관리

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q21. You have created a Route 53 latency record set from your domain to a machine in Northern Virginia and a similar record to a machine in Sydney. When a user located in US visits your domain he will be routed to

**Options:**
- A) Northern Virginia.
- B) Sydney.
- C) Both, Northern Virginia and Sydney.
- D) Depends on the Weighted Resource Record Sets.

**Answer:** A

**해설:**

> **문제:** Route 53에서 도메인에 대해 Northern Virginia와 Sydney의 지연 시간 레코드 세트를 만들었다. 미국에 위치한 사용자가 도메인에 접속하면 어디로 라우팅되는가?

| 선지 | 번역 |
|------|------|
| A | Northern Virginia |
| B | Sydney |
| C | Northern Virginia와 Sydney 모두 |
| D | Weighted Resource Record Sets에 따라 다름 |

**(A) 정답** : Route 53 지연 시간 기반 라우팅(Latency-based Routing)은 사용자에게 가장 낮은 네트워크 지연 시간을 제공하는 AWS 리전으로 라우팅한다. 미국에 있는 사용자는 지리적으로 가까운 Northern Virginia(us-east-1)에서 더 낮은 지연 시간을 경험하므로 그쪽으로 라우팅된다. → [📖 라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

**(B)** : Sydney는 미국 사용자에게 지연 시간이 더 높아 선택되지 않는다.

**(C)** : 지연 시간 라우팅은 단일 최적 경로로 라우팅하며 동시에 두 곳으로 보내지 않는다.

**(D)** : 이 시나리오는 지연 시간 기반 라우팅이며 가중치 라우팅이 아니다.

**핵심 개념:** Route 53 지연 시간 기반 라우팅 (Latency-based Routing)

**관련 노트:** [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

---

### Q22. In the context of MySQL, version numbers are organized as MySQL version = X.Y.Z. What does X denote here?

**Options:**
- A) Release level.
- B) Minor version.
- C) Version number.
- D) Major version.

**Answer:** D

**해설:**

> **문제:** MySQL 버전 번호는 MySQL version = X.Y.Z로 구성된다. 여기서 X는 무엇을 나타내는가?

| 선지 | 번역 |
|------|------|
| A | 릴리즈 레벨 |
| B) 마이너 버전 |
| C | 버전 번호 |
| D | 메이저 버전 |

**(A)** : 릴리즈 레벨은 Z(세 번째 숫자)가 나타낸다.

**(B)** : 마이너 버전은 Y(두 번째 숫자)가 나타낸다.

**(C)** : 너무 모호한 설명이다.

**(D) 정답** : MySQL 버전 형식 X.Y.Z에서 X는 메이저 버전(Major Version), Y는 마이너 버전(Minor Version), Z는 릴리즈 레벨(Release Level/Patch Version)을 나타낸다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** MySQL 버전 번호 체계

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q23. Which one of the below doesn't affect Amazon CloudFront billing?

**Options:**
- A) Distribution Type.
- B) Data Transfer Out.
- C) Dedicated IP SSL Certificates.
- D) Requests.

**Answer:** A

**해설:**

> **문제:** 아래 중 Amazon CloudFront 요금에 영향을 미치지 않는 것은?

| 선지 | 번역 |
|------|------|
| A | 배포 유형 (Distribution Type) |
| B | 데이터 전송 아웃 |
| C | 전용 IP SSL 인증서 |
| D | 요청 수 |

**(A) 정답** : CloudFront의 배포 유형(웹 배포 vs RTMP 배포)은 요금에 직접적인 영향을 미치지 않는다. 요금은 데이터 전송량, 요청 수, SSL 인증서 등에 따라 결정된다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B)** : 엣지 로케이션에서 인터넷으로의 데이터 전송량은 CloudFront 요금의 주요 요소다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(C)** : 전용 IP 기반 SSL 인증서는 월정액 추가 요금이 발생한다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D)** : HTTP/HTTPS 요청 수는 CloudFront 요금에 영향을 미친다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**핵심 개념:** CloudFront 요금 구조

**관련 노트:** [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념), [SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)

---

### Q24. Just when you thought you knew every possible storage option on AWS you hear someone mention Reduced Redundancy Storage (RRS) within Amazon S3. What is the ideal scenario to use Reduced Redundancy Storage (RRS)?

**Options:**
- A) Huge volumes of data.
- B) Sensitive data.
- C) Non-critical or reproducible data.
- D) Critical data.

**Answer:** C

**해설:**

> **문제:** Amazon S3의 RRS(Reduced Redundancy Storage)를 사용하기에 이상적인 시나리오는?

| 선지 | 번역 |
|------|------|
| A | 대용량 데이터 |
| B | 민감한 데이터 |
| C | 중요하지 않거나 재생성 가능한 데이터 |
| D | 중요한 데이터 |

**(A)** : 데이터 용량 자체는 RRS 선택 기준이 아니다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B)** : 민감한 데이터는 높은 내구성이 필요하므로 Standard 스토리지를 사용해야 한다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C) 정답** : RRS는 Standard S3 스토리지보다 낮은 내구성(99.99% vs 99.999999999%)을 제공하는 대신 비용이 저렴하다. 잃어버려도 재생성할 수 있거나 중요하지 않은 데이터(썸네일, 처리된 파생 데이터 등)에 적합하다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : 중요한 데이터는 높은 내구성을 위해 Standard 스토리지나 S3-IA를 사용해야 한다. → [📖 S3 사용 사례](/section/10-amazon-s3#s3-사용-사례)

**핵심 개념:** S3 스토리지 클래스, RRS(Reduced Redundancy Storage) 사용 사례

**관련 노트:** [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스), [스토리지 클래스 비교표](/section/10-amazon-s3#스토리지-클래스-비교표)

---

### Q25. Which of the following AWS CLI commands is syntactically incorrect?

**Options:**
- A) `$ aws ec2 describe-instances`.
- B) `$ aws ec2 start-instances --instance-ids i-1348636c`.
- C) `$ aws sns publish --topic-arn arn:aws:sns:us-east-1:546419318123:OperationsError -message "Script Failure"`.
- D) `$ aws sqs receive-message --queue-url https://queue.amazonaws.com/546419318123/Test`.

**Answer:** C

**해설:**

> **문제:** 다음 AWS CLI 명령 중 문법적으로 잘못된 것은?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스 목록 조회 명령 |
| B | EC2 인스턴스 시작 명령 |
| C | SNS 메시지 발행 명령 |
| D | SQS 메시지 수신 명령 |

**(A)** : 올바른 CLI 문법이다.

**(B)** : 올바른 CLI 문법이다.

**(C) 정답** : `--message` 파라미터가 `-message`로 잘못 표기되어 있다. AWS CLI 파라미터는 `--` (더블 대시)로 시작해야 한다. 올바른 형식은 `--message "Script Failure"`이다.

**(D)** : 올바른 CLI 문법이다.

**핵심 개념:** AWS CLI 명령 문법, 파라미터 표기법

**관련 노트:** [AWS 접근 방법](/section/02-iam#aws-접근-방법)

---

### Q26. When running my DB Instance as a Multi-AZ deployment, can I use the standby for read or write operations?

**Options:**
- A) Yes.
- B) Only with MSSQL based RDS.
- C) Only for Oracle RDS instances.
- D) No.

**Answer:** D

**해설:**

> **문제:** DB 인스턴스를 Multi-AZ 배포로 실행할 때, 스탠바이 인스턴스를 읽기 또는 쓰기 작업에 사용할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 예 |
| B | MSSQL 기반 RDS에서만 가능 |
| C | Oracle RDS 인스턴스에서만 가능 |
| D | 아니오 |

**(A)** : Multi-AZ 스탠바이는 읽기/쓰기 모두 불가하다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(B)** : MSSQL도 예외가 아니다.

**(C)** : Oracle도 예외가 아니다.

**(D) 정답** : RDS Multi-AZ 배포에서 스탠바이 인스턴스는 자동 장애 조치(Failover)를 위한 동기식 복제본이다. 읽기나 쓰기 작업에 사용할 수 없다. 읽기 확장이 필요하면 Read Replica를 사용해야 한다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**핵심 개념:** RDS Multi-AZ vs Read Replica 차이

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

---

### Q27. In the Launch DB Instance Wizard, where can I select the backup and maintenance options?

**Options:**
- A) Under DB INSTANCE DETAILS.
- B) Under REVIEW.
- C) Under MANAGEMENT OPTIONS.
- D) Under ENGINE SELECTION.

**Answer:** C

**해설:**

> **문제:** DB 인스턴스 시작 마법사에서 백업 및 유지 관리 옵션은 어디에서 선택할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | DB 인스턴스 세부 정보 섹션 |
| B | 검토 섹션 |
| C | 관리 옵션 섹션 |
| D | 엔진 선택 섹션 |

**(A)** : DB 인스턴스 세부 정보는 인스턴스 크기, 스토리지 등을 설정하는 곳이다.

**(B)** : 검토 섹션은 최종 확인을 위한 요약 페이지다.

**(C) 정답** : RDS DB 인스턴스 시작 마법사에서 백업 보존 기간, 백업 창(backup window), 유지 관리 창(maintenance window) 등의 옵션은 MANAGEMENT OPTIONS 섹션에서 설정한다. → [📖 RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(D)** : 엔진 선택 섹션은 MySQL, PostgreSQL, Oracle 등 DB 엔진을 선택하는 곳이다.

**핵심 개념:** RDS DB 인스턴스 구성, 백업 및 유지 관리 설정

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q28. What is the network performance offered by the c4.8xlarge instance in Amazon EC2?

**Options:**
- A) 20 Gigabit.
- B) 10 Gigabit.
- C) Very High but variable.
- D) 5 Gigabit.

**Answer:** B

**해설:**

> **문제:** Amazon EC2의 c4.8xlarge 인스턴스가 제공하는 네트워크 성능은?

| 선지 | 번역 |
|------|------|
| A | 20 Gigabit |
| B | 10 Gigabit |
| C | 매우 높지만 가변적 |
| D | 5 Gigabit |

**(A)** : c4.8xlarge의 네트워크 성능은 20Gbps가 아니다. → [📖 EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

**(B) 정답** : c4.8xlarge 인스턴스는 10 Gigabit 네트워크 성능을 제공한다. 이는 C4 시리즈 중 가장 큰 인스턴스 유형이다. → [📖 EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

**(C)** : "매우 높지만 가변적"은 일부 중간 크기 인스턴스의 설명이다.

**(D)** : 5 Gigabit는 더 작은 인스턴스 유형의 성능이다. → [📖 EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

**핵심 개념:** EC2 인스턴스 네트워크 성능

**관련 노트:** [EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

---

### Q29. In Amazon EC2, if your EBS volume stays in the detaching state, you can force the detachment by clicking [...].

**Options:**
- A) Force Detach.
- B) Detach Instance.
- C) AttachVolume.
- D) AttachInstance.

**Answer:** A

**해설:**

> **문제:** Amazon EC2에서 EBS 볼륨이 detaching 상태에서 멈추면 [...] 버튼을 클릭하여 강제로 분리할 수 있다.

| 선지 | 번역 |
|------|------|
| A | Force Detach (강제 분리) |
| B | Detach Instance |
| C | AttachVolume |
| D | AttachInstance |

**(A) 정답** : EBS 볼륨이 detaching 상태에서 멈추면 "Force Detach" 옵션을 사용하여 강제로 분리할 수 있다. 단, 강제 분리는 데이터 손상 위험이 있으므로 주의해야 한다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : "Detach Instance"는 볼륨 분리와 관련 없는 개념이다.

**(C)** : AttachVolume은 볼륨을 분리가 아닌 연결하는 API다.

**(D)** : AttachInstance는 존재하지 않는 옵션이다.

**핵심 개념:** EBS 볼륨 강제 분리 (Force Detach)

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q30. What does Amazon DynamoDB provide?

**Options:**
- A) A predictable and scalable MySQL database.
- B) A fast and reliable PL/SQL database cluster.
- C) A standalone Cassandra database, managed by Amazon Web Services.
- D) A fast, highly scalable managed NoSQL database service.

**Answer:** D

**해설:**

> **문제:** Amazon DynamoDB는 무엇을 제공하는가?

| 선지 | 번역 |
|------|------|
| A | 예측 가능하고 확장 가능한 MySQL 데이터베이스 |
| B | 빠르고 안정적인 PL/SQL 데이터베이스 클러스터 |
| C | Amazon Web Services가 관리하는 독립형 Cassandra 데이터베이스 |
| D | 빠르고 확장성이 높은 관리형 NoSQL 데이터베이스 서비스 |

**(A)** : DynamoDB는 MySQL이 아니다. 키-값 및 문서 기반 NoSQL 데이터베이스다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : PL/SQL은 Oracle의 절차적 SQL 언어로, DynamoDB와 무관하다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C)** : DynamoDB는 Cassandra와 유사한 설계 철학을 가지지만 완전히 별개의 AWS 독자 서비스다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(D) 정답** : DynamoDB는 AWS의 완전 관리형(Serverless) NoSQL 데이터베이스 서비스로, 빠른 성능(한 자리 밀리초 지연 시간), 높은 확장성, 자동 복제를 제공한다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**핵심 개념:** Amazon DynamoDB 특성, NoSQL 데이터베이스

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

---

### Q31. Security groups act like a firewall at the instance level, whereas [...] are an additional layer of security that act at the subnet level.

**Options:**
- A) DB Security Groups.
- B) VPC Security Groups.
- C) network ACLs.

**Answer:** C

**해설:**

> **문제:** 보안 그룹은 인스턴스 레벨의 방화벽 역할을 하는 반면, [...]은 서브넷 레벨에서 작동하는 추가 보안 레이어다.

| 선지 | 번역 |
|------|------|
| A | DB 보안 그룹 |
| B | VPC 보안 그룹 |
| C | 네트워크 ACL |

**(A)** : DB 보안 그룹은 VPC 외부 RDS 인스턴스에 사용하는 개념으로 서브넷 레벨 보안이 아니다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : VPC 보안 그룹도 인스턴스 레벨에서 작동한다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(C) 정답** : 네트워크 ACL(NACL)은 서브넷 레벨에서 작동하는 상태 비저장(stateless) 방화벽이다. 보안 그룹(인스턴스 레벨, stateful)과 함께 VPC의 이중 보안 레이어를 구성한다. → [📖 NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

**핵심 개념:** 보안 그룹(Security Group) vs 네트워크 ACL(NACL) 차이

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

---

### Q32. You have been asked to tighten up the password policies in your organization after a serious security breach, so you need to consider every possible security measure. Which of the following is not an account password policy for IAM Users that can be set?

**Options:**
- A) Force IAM users to contact an account administrator when the user has allowed his or her password to expire.
- B) A minimum password length.
- C) Force IAM users to contact an account administrator when the user has entered his password incorrectly.
- D) Prevent IAM users from reusing previous passwords.

**Answer:** C

**해설:**

> **문제:** 보안 침해 후 비밀번호 정책을 강화해야 한다. 다음 중 IAM 사용자에 대한 계정 비밀번호 정책으로 설정할 수 없는 것은?

| 선지 | 번역 |
|------|------|
| A | 비밀번호 만료 시 계정 관리자에게 연락하도록 강제 |
| B | 최소 비밀번호 길이 설정 |
| C | 비밀번호 잘못 입력 시 계정 관리자에게 연락하도록 강제 |
| D | 이전 비밀번호 재사용 방지 |

**(A)** : 비밀번호 만료 시 관리자 리셋을 요구하는 정책은 IAM에서 설정 가능하다. → [📖 Password Policy 비밀번호 정책](/section/02-iam#password-policy-비밀번호-정책)

**(B)** : 최소 비밀번호 길이(6~128자)는 IAM 비밀번호 정책에서 설정 가능하다. → [📖 Password Policy 비밀번호 정책](/section/02-iam#password-policy-비밀번호-정책)

**(C) 정답** : 비밀번호를 잘못 입력했을 때 관리자에게 연락하도록 강제하는 정책은 IAM에 존재하지 않는다. IAM 계정 잠금(lockout) 정책은 별도로 존재하지 않으며, 이런 정책을 설정할 수 없다. → [📖 Password Policy 비밀번호 정책](/section/02-iam#password-policy-비밀번호-정책)

**(D)** : 비밀번호 재사용 방지(최대 24개 이전 비밀번호 기억)는 IAM에서 설정 가능하다. → [📖 Password Policy 비밀번호 정책](/section/02-iam#password-policy-비밀번호-정책)

**핵심 개념:** IAM 비밀번호 정책(Password Policy) 설정 항목

**관련 노트:** [Password Policy 비밀번호 정책](/section/02-iam#password-policy-비밀번호-정책)

---

### Q33. Multi-AZ deployment [...] supported for Microsoft SQL Server DB Instances.

**Options:**
- A) is not currently.
- B) is as of 2013.
- C) is planned to be in 2014.
- D) will never be.

**Answer:** A

**해설:**

> **문제:** Multi-AZ 배포는 Microsoft SQL Server DB 인스턴스에 대해 현재 [...].

| 선지 | 번역 |
|------|------|
| A | 현재 지원되지 않는다 |
| B | 2013년부터 지원된다 |
| C | 2014년에 지원될 예정이다 |
| D | 절대 지원되지 않을 것이다 |

**(A) 정답** : 이 문제가 작성된 당시 기준으로, SQL Server는 Multi-AZ 배포를 지원하지 않았다. SQL Server의 Multi-AZ는 나중에 SQL Server Mirroring 방식으로 지원되었으나, 당시에는 지원되지 않았다.

**(B)** : 2013년 기준으로는 지원되지 않았다.

**(C)** : 2014년 계획은 확인된 사실이 아니었다.

**(D)** : 실제로는 이후 지원되었으므로 "절대 지원 안 됨"은 틀리다.

**핵심 개념:** RDS Multi-AZ 지원 DB 엔진 (역사적 맥락)

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

---

### Q34. What does Amazon Elastic Beanstalk provide?

**Options:**
- A) A scalable storage appliance on top of Amazon Web Services.
- B) An application container on top of Amazon Web Services.
- C) A service by this name doesn't exist.
- D) A scalable cluster of EC2 instances.

**Answer:** B

**해설:**

> **문제:** Amazon Elastic Beanstalk은 무엇을 제공하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon Web Services 위에 구축된 확장 가능한 스토리지 어플라이언스 |
| B | Amazon Web Services 위에 구축된 애플리케이션 컨테이너 |
| C | 이런 이름의 서비스는 존재하지 않는다 |
| D | 확장 가능한 EC2 인스턴스 클러스터 |

**(A)** : Elastic Beanstalk은 스토리지 서비스가 아니다. → [📖 Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

**(B) 정답** : Elastic Beanstalk은 웹 애플리케이션과 서비스를 AWS에 쉽게 배포하고 확장할 수 있는 PaaS(Platform as a Service) 서비스다. 코드를 업로드하면 EC2, Auto Scaling, ELB 등 인프라를 자동으로 프로비저닝하는 애플리케이션 컨테이너 역할을 한다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(C)** : Elastic Beanstalk은 실존하는 서비스다. → [📖 Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

**(D)** : EC2 클러스터 자체는 Elastic Beanstalk의 내부 구성 요소이지만, Beanstalk 자체의 정의는 아니다. → [📖 Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

**핵심 개념:** Elastic Beanstalk PaaS, 애플리케이션 자동 배포

**관련 노트:** [Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

---

### Q35. You need to quickly set up an email-sending service because a client needs to start using it in the next hour. Amazon Simple Email Service (Amazon SES) seems to be the logical choice but there are several options available to set it up. Which of the following options to set up SES would best meet the needs of the client?

**Options:**
- A) Amazon SES console.
- B) AWS CloudFormation.
- C) SMTP Interface.
- D) AWS Elastic Beanstalk.

**Answer:** A

**해설:**

> **문제:** 1시간 내에 이메일 발송 서비스를 빠르게 설정해야 한다. Amazon SES를 설정하는 방법 중 클라이언트의 요구에 가장 적합한 것은?

| 선지 | 번역 |
|------|------|
| A | Amazon SES 콘솔 |
| B | AWS CloudFormation |
| C | SMTP 인터페이스 |
| D | AWS Elastic Beanstalk |

**(A) 정답** : 1시간 내 빠른 설정이 요구사항이므로 SES 콘솔을 사용하는 것이 가장 빠르다. 콘솔에서 직접 설정, 검증, 테스트를 즉시 수행할 수 있다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(B)** : CloudFormation은 인프라를 코드로 관리하는 서비스로, 템플릿 작성이 필요해 빠른 설정에는 적합하지 않다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**(C)** : SMTP 인터페이스는 애플리케이션에서 SES를 사용할 때의 연결 방식이지, 서비스 설정 방법이 아니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(D)** : Elastic Beanstalk은 애플리케이션 배포 서비스로 SES 설정과 직접적인 관련이 없다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**핵심 개념:** Amazon SES 설정 방법, 빠른 구축 옵션

**관련 노트:** [Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

---

### Q36. A user is observing the EC2 CPU utilization metric on CloudWatch. The user has observed some interesting patterns while filtering over the 1 week period for a particular hour. The user wants to zoom that data point to a more granular period. How can the user do that easily with CloudWatch?

**Options:**
- A) The user can zoom a particular period by selecting that period with the mouse and then releasing the mouse.
- B) The user can zoom a particular period by specifying the aggregation data for that period.
- C) The user can zoom a particular period by double clicking on that period with the mouse.
- D) The user can zoom a particular period by specifying the period in the Time Range.

**Answer:** A

**해설:**

> **문제:** CloudWatch에서 EC2 CPU 사용률 지표를 관찰하던 중 1주일 기간 필터에서 특정 시간대의 흥미로운 패턴을 발견했다. 해당 데이터 포인트를 더 세분화된 기간으로 확대(zoom)하려면 어떻게 하는가?

| 선지 | 번역 |
|------|------|
| A | 마우스로 해당 기간을 선택한 후 마우스를 놓는 방법 |
| B | 해당 기간의 집계 데이터를 지정하는 방법 |
| C | 마우스로 해당 기간을 더블 클릭하는 방법 |
| D | Time Range에서 기간을 지정하는 방법 |

**(A) 정답** : CloudWatch 콘솔에서 그래프의 특정 구간을 마우스로 드래그하여 선택하면 해당 구간으로 자동 확대(zoom in)된다. 이것이 가장 빠르고 쉬운 방법이다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : 집계 데이터 지정은 확대(zoom) 기능이 아니다.

**(C)** : 더블 클릭으로는 확대 기능이 작동하지 않는다.

**(D)** : Time Range에서 수동으로 시간을 입력하는 것도 가능하지만, 드래그 방식이 더 쉽고 직관적이다.

**핵심 개념:** CloudWatch 콘솔 그래프 조작, 드래그 확대

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics), [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

---

### Q37. A company is running a batch analysis every hour on their main transactional DB, running on an RDS MySQL instance to populate their central Data Warehouse running on Redshift. During the execution of the batch their transactional applications are very slow. When the batch completes they need to update the top management dashboard with the new data. The dashboard is produced by another system running on-premises that is currently started when a manually-sent email notifies that an update is required. The on-premises system cannot be modified because it is managed by another team. How would you optimize this scenario to solve performance issues and automate the process as much as possible?

**Options:**
- A) Replace RDS with Redshift for the batch analysis and SNS to notify the on-premises system to update the dashboard.
- B) Replace RDS with Redshift for the batch analysis and SQS to send a message to the on-premises system to update the dashboard.
- C) Create an RDS Read Replica for the batch analysis and SNS to notify the on-premises system to update the dashboard.
- D) Create an RDS Read Replica for the batch analysis and SQS to send a message to the on-premises system to update the dashboard.

**Answer:** A

**해설:**

> **문제:** RDS MySQL 기반 트랜잭션 DB에서 매시간 배치 분석을 실행하여 Redshift 데이터 웨어하우스를 채우는데, 배치 실행 중 트랜잭션 애플리케이션이 느려진다. 배치 완료 시 온프레미스 대시보드 시스템에 알림을 보내야 하며, 온프레미스 시스템은 수정 불가하다. 성능 문제 해결과 자동화를 위한 최선의 방법은?

| 선지 | 번역 |
|------|------|
| A | 배치 분석을 Redshift로 대체하고 SNS로 온프레미스 시스템에 알림 |
| B | 배치 분석을 Redshift로 대체하고 SQS로 메시지 전송 |
| C | 배치 분석을 위한 RDS Read Replica 생성 및 SNS로 알림 |
| D | 배치 분석을 위한 RDS Read Replica 생성 및 SQS로 메시지 전송 |

**(A) 정답** : 배치 분석은 이미 Redshift에 데이터를 적재하는 것이 목적이므로, Redshift에서 직접 분석하면 RDS 부하를 완전히 제거할 수 있다. SNS는 이메일 알림을 자동으로 발송하여 온프레미스 시스템을 트리거할 수 있다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : SQS는 큐 기반 메시징으로, 이메일 알림을 기대하는 온프레미스 시스템을 직접 트리거하기 어렵다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(C)** : Read Replica로 RDS 부하를 줄일 수 있지만, 데이터는 여전히 Redshift에 있으므로 Redshift에서 직접 분석하는 것이 더 효율적이다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(D)** : C와 동일한 이유로 최선이 아니며, SQS도 온프레미스 이메일 트리거에 적합하지 않다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** Redshift 배치 분석, SNS 알림 자동화, RDS 부하 분산

**관련 노트:** [Amazon Redshift](/section/20-data-analytics#amazon-redshift), [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas), [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q38. You are configuring a new VPC for one of your clients for a cloud migration project, and only a public VPN will be in place. After you created your VPC, you created a new subnet, a new internet gateway, and attached your internet gateway to your VPC. When you launched your first instance into your VPC, you realized that you aren't able to connect to the instance, even if it is configured with an elastic IP. What should be done to access the instance?

**Options:**
- A) A route should be created as 0.0.0.0/0 and your internet gateway as target.
- B) Attach another ENI to the instance and connect via new ENI.
- C) A NAT instance should be created and all traffic should be forwarded to NAT instance.
- D) A NACL should be created that allows all outbound traffic.

**Answer:** A

**해설:**

> **문제:** 새 VPC를 생성하고 서브넷, 인터넷 게이트웨이를 만들어 VPC에 연결했다. 인스턴스에 Elastic IP가 있음에도 연결이 안 된다. 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 0.0.0.0/0을 대상으로 인터넷 게이트웨이를 타겟으로 하는 라우트 생성 |
| B | 인스턴스에 ENI를 추가하고 새 ENI로 연결 |
| C | NAT 인스턴스를 생성하고 모든 트래픽을 NAT 인스턴스로 전달 |
| D | 모든 아웃바운드 트래픽을 허용하는 NACL 생성 |

**(A) 정답** : 인터넷 게이트웨이를 VPC에 연결했더라도, 서브넷의 라우팅 테이블에 인터넷 트래픽(0.0.0.0/0)을 인터넷 게이트웨이로 보내는 라우트가 없으면 인터넷 연결이 되지 않는다. 라우팅 테이블에 `0.0.0.0/0 -> IGW` 라우트를 추가해야 한다. → [📖 Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

**(B)** : ENI 추가는 라우팅 문제를 해결하지 못한다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(C)** : 퍼블릭 서브넷에서는 NAT 인스턴스가 필요하지 않다. NAT는 프라이빗 서브넷에서 아웃바운드 인터넷 접근을 위해 사용한다. → [📖 NAT Instance 레거시, 시험에 출제](/section/25-vpc#nat-instance-레거시-시험에-출제)

**(D)** : NACL 아웃바운드 규칙 추가만으로는 부족하다. 라우팅 테이블에 IGW 라우트가 없으면 패킷이 IGW에 도달하지 못한다. → [📖 NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

**핵심 개념:** VPC 라우팅 테이블, 인터넷 게이트웨이(IGW) 설정

**관련 노트:** [Internet Gateway IGW](/section/25-vpc#internet-gateway-igw), [서브넷 Subnet](/section/25-vpc#서브넷-subnet)

---

### Q39. You have been asked to build a database warehouse using Amazon Redshift. You know a little about it, including that it is a SQL data warehouse solution, and uses industry standard ODBC and JDBC connections and PostgreSQL drivers. However, you are not sure about what sort of storage it uses for database tables. What sort of storage does Amazon Redshift use for database tables?

**Options:**
- A) InnoDB Tables.
- B) NDB data storage.
- C) Columnar data storage.
- D) NDB CLUSTER Storage.

**Answer:** C

**해설:**

> **문제:** Amazon Redshift는 데이터베이스 테이블에 어떤 종류의 스토리지를 사용하는가?

| 선지 | 번역 |
|------|------|
| A | InnoDB 테이블 |
| B | NDB 데이터 스토리지 |
| C | 컬럼형 데이터 스토리지 |
| D | NDB CLUSTER 스토리지 |

**(A)** : InnoDB는 MySQL의 스토리지 엔진이다.

**(B)** : NDB는 MySQL Cluster의 스토리지 엔진이다.

**(C) 정답** : Amazon Redshift는 컬럼형(Columnar) 데이터 스토리지를 사용한다. 열 기반 저장 방식은 대규모 분석 쿼리에서 특정 컬럼만 읽어 I/O를 줄이고, 압축 효율을 높여 데이터 웨어하우스 성능을 최적화한다. → [📖 Amazon Redshift](/section/20-data-analytics#amazon-redshift)

**(D)** : NDB CLUSTER는 MySQL Cluster의 스토리지 엔진이다.

**핵심 개념:** Redshift 컬럼형 스토리지, OLAP 데이터 웨어하우스 최적화

**관련 노트:** [Amazon Redshift](/section/20-data-analytics#amazon-redshift)

---

### Q40. A user has attached 1 EBS volume to a VPC instance. The user wants to achieve the best fault tolerance of data possible. Which of the below mentioned options can help achieve fault tolerance?

**Options:**
- A) Attach one more volume with RAID 1 configuration.
- B) Attach one more volume with RAID 0 configuration.
- C) Connect multiple volumes and stripe them with RAID.
- D) Use the EBS volume as a root device.

**Answer:** A

**해설:**

> **문제:** VPC 인스턴스에 EBS 볼륨 1개를 연결한 사용자가 최상의 데이터 내결함성을 달성하려 한다. 어떤 옵션이 내결함성을 달성하는 데 도움이 되는가?

| 선지 | 번역 |
|------|------|
| A | RAID 1 구성으로 볼륨 하나 더 추가 |
| B | RAID 0 구성으로 볼륨 하나 더 추가 |
| C | 여러 볼륨을 연결하고 RAID로 스트라이핑 |
| D | EBS 볼륨을 루트 디바이스로 사용 |

**(A) 정답** : RAID 1은 미러링(Mirroring) 방식으로 두 볼륨에 동일한 데이터를 복제한다. 하나의 볼륨이 실패해도 다른 볼륨에서 데이터를 읽을 수 있어 최고의 내결함성을 제공한다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B)** : RAID 0은 스트라이핑 방식으로 성능은 향상되지만 내결함성이 전혀 없다. 하나의 볼륨이 실패하면 모든 데이터를 잃는다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : 단순 RAID(RAID 0) 스트라이핑은 내결함성을 제공하지 않는다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(D)** : 루트 디바이스로 사용하는 것은 내결함성과 관련이 없다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** EBS RAID 구성, RAID 1 미러링 내결함성

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

---

### Q41. Which features can be used to restrict access to data in S3? (Choose 2 answers)

**Options:**
- A) Set an S3 ACL on the bucket or the object.
- B) Create a CloudFront distribution for the bucket.
- C) Set an S3 bucket policy.
- D) Enable IAM Identity Federation.
- E) Use S3 Virtual Hosting.

**Answer:** A, C

**해설:**

> **문제:** S3의 데이터 접근을 제한하는 데 사용할 수 있는 기능 2가지는?

| 선지 | 번역 |
|------|------|
| A | 버킷 또는 객체에 S3 ACL 설정 |
| B | 버킷에 대한 CloudFront 배포 생성 |
| C | S3 버킷 정책 설정 |
| D | IAM Identity Federation 활성화 |
| E | S3 가상 호스팅 사용 |

**(A) 정답** : S3 ACL(Access Control List)은 버킷 또는 개별 객체 수준에서 접근 권한을 제어할 수 있는 기존 접근 제어 메커니즘이다. → [📖 S3 보안](/section/10-amazon-s3#s3-보안)

**(B)** : CloudFront 배포는 콘텐츠 배포 및 캐싱을 위한 것으로 S3 접근 제한 기능이 아니다. → [📖 CloudFront vs S3 Cross Region Replication](/section/13-cloudfront-global-accelerator#cloudfront-vs-s3-cross-region-replication)

**(C) 정답** : S3 버킷 정책은 JSON 기반 정책으로 버킷 및 객체에 대한 세밀한 접근 제어를 제공한다. 특정 IP, IAM 사용자, AWS 계정의 접근을 허용/거부할 수 있다. → [📖 S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy)

**(D)** : IAM Identity Federation은 외부 사용자에게 AWS 임시 자격 증명을 부여하는 기능으로, S3 직접 접근 제한 기능이 아니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(E)** : S3 가상 호스팅은 커스텀 도메인으로 S3 버킷에 접근하는 기능으로 접근 제한과 관련 없다.

**핵심 개념:** S3 접근 제어 (ACL vs 버킷 정책)

**관련 노트:** [S3 보안](/section/10-amazon-s3#s3-보안), [S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy), [S3 Access Points](/section/12-s3-security#s3-access-points)

---

### Q42. You are in the process of creating a Route 53 DNS failover to direct traffic to two EC2 zones. Obviously, if one fails, you would like Route 53 to direct traffic to the other region. Each region has an ELB with some instances being distributed. What is the best way for you to configure the Route 53 health check?

**Options:**
- A) Route 53 doesn't support ELB with an internal health check. You need to create your own Route 53 health check of the ELB.
- B) Route 53 natively supports ELB with an internal health check. Turn 'Evaluate target health' off and 'Associate with Health Check' on and R53 will use the ELB's internal health check.
- C) Route 53 doesn't support ELB with an internal health check. You need to associate your resource record set for the ELB with your own health check.
- D) Route 53 natively supports ELB with an internal health check. Turn 'Evaluate target health' on and 'Associate with Health Check' off and R53 will use the ELB's internal health check.

**Answer:** D

**해설:**

> **문제:** Route 53 DNS 장애 조치를 설정하여 두 EC2 리전으로 트래픽을 라우팅하려 한다. 각 리전에는 ELB가 있다. Route 53 헬스 체크를 어떻게 구성하는 것이 최선인가?

| 선지 | 번역 |
|------|------|
| A | Route 53은 ELB 내부 헬스 체크를 지원하지 않아 별도 헬스 체크 생성 필요 |
| B | Route 53이 ELB 헬스 체크를 지원함. 'Evaluate target health' 끄고 'Associate with Health Check' 켜기 |
| C | Route 53은 ELB 내부 헬스 체크를 지원하지 않아 리소스 레코드 세트에 자체 헬스 체크 연결 필요 |
| D | Route 53이 ELB 헬스 체크를 지원함. 'Evaluate target health' 켜고 'Associate with Health Check' 끄기 |

**(A)** : Route 53은 ELB 내부 헬스 체크를 기본적으로 지원한다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B)** : 올바른 설정이 반대로 되어 있다. 'Evaluate Target Health'를 켜야 한다.

**(C)** : Route 53은 ELB 헬스 체크를 네이티브로 지원하므로 자체 헬스 체크를 만들 필요가 없다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D) 정답** : Route 53은 ELB와 통합된 헬스 체크를 지원한다. 'Evaluate Target Health'를 ON으로 설정하면 Route 53이 ELB의 내부 헬스 체크를 사용하여 장애 감지 시 자동으로 다른 리전으로 트래픽을 전환한다. 별도의 헬스 체크를 만들 필요가 없다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**핵심 개념:** Route 53 Failover 라우팅, ELB 헬스 체크 통합, Evaluate Target Health

**관련 노트:** [Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크), [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies), [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

---

### Q43. For each DB Instance class, what is the maximum size of associated storage capacity?

**Options:**
- A) 5GB.
- B) 1TB.
- C) 2TB.
- D) 500GB.

**Answer:** B

**해설:**

> **문제:** 각 DB 인스턴스 클래스의 최대 스토리지 용량은?

| 선지 | 번역 |
|------|------|
| A | 5GB |
| B | 1TB |
| C | 2TB |
| D | 500GB |

**(A)** : 5GB는 최소 스토리지에 가깝다.

**(B) 정답** : 이 문제가 작성된 당시 기준으로 RDS DB 인스턴스의 최대 스토리지 용량은 1TB였다. (현재는 gp2/gp3 기준 최대 64TB까지 확장되었으나, 시험 문맥에서는 당시 한도를 기준으로 한다.) → [📖 RDS Storage Auto Scaling](/section/07-rds-aurora-elasticache#rds-storage-auto-scaling)

**(C)** : 2TB는 당시 기준 최대 용량이 아니었다.

**(D)** : 500GB는 최대 용량이 아니었다.

**핵심 개념:** RDS 스토리지 한도 (역사적 맥락)

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [RDS Storage Auto Scaling](/section/07-rds-aurora-elasticache#rds-storage-auto-scaling)

---

### Q44. A user is planning a highly available application deployment with EC2. Which of the below mentioned options will not help to achieve HA?

**Options:**
- A) Elastic IP address.
- B) PIOPS.
- C) AMI.
- D) Availability Zones.

**Answer:** B

**해설:**

> **문제:** EC2로 고가용성 애플리케이션 배포를 계획할 때, HA 달성에 도움이 되지 않는 옵션은?

| 선지 | 번역 |
|------|------|
| A | Elastic IP 주소 |
| B | PIOPS (Provisioned IOPS) |
| C | AMI |
| D | 가용 영역 |

**(A)** : Elastic IP는 인스턴스 장애 시 다른 인스턴스로 IP를 재할당하여 서비스 연속성을 지원한다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**(B) 정답** : PIOPS(Provisioned IOPS)는 I/O 성능을 향상시키는 스토리지 옵션이다. 성능(Performance)을 개선하지만 가용성(Availability)과는 직접적인 관계가 없다. HA는 가용성을 높이는 개념으로 PIOPS와 무관하다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : AMI는 인스턴스 장애 시 동일한 구성으로 새 인스턴스를 빠르게 시작하는 데 사용되어 HA를 지원한다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(D)** : 여러 가용 영역에 인스턴스를 분산 배포하면 단일 AZ 장애에도 서비스가 지속되어 HA를 달성한다. → [📖 Scalability vs High Availability](/section/06-high-availability-scalability#scalability-vs-high-availability)

**핵심 개념:** EC2 고가용성(HA) 구성 요소, 성능 vs 가용성 구분

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소), [Elastic IP](/section/04-ec2-associate#elastic-ip)

---

### Q45. What does specifying the mapping /dev/sdc=none when launching an instance do?

**Options:**
- A) Prevents /dev/sdc from creating the instance.
- B) Prevents /dev/sdc from deleting the instance.
- C) Set the value of /dev/sdc to 'zero'.
- D) Prevents /dev/sdc from attaching to the instance.

**Answer:** D

**해설:**

> **문제:** 인스턴스 시작 시 /dev/sdc=none 매핑을 지정하면 어떻게 되는가?

| 선지 | 번역 |
|------|------|
| A | /dev/sdc가 인스턴스를 생성하는 것을 방지한다 |
| B | /dev/sdc가 인스턴스를 삭제하는 것을 방지한다 |
| C | /dev/sdc의 값을 'zero'로 설정한다 |
| D | /dev/sdc가 인스턴스에 연결되는 것을 방지한다 |

**(A)** : 디바이스 매핑은 인스턴스 생성에 영향을 미치지 않는다.

**(B)** : 디바이스 매핑은 인스턴스 삭제와 관련 없다.

**(C)** : 값을 'zero'로 설정하는 것이 아니다.

**(D) 정답** : 인스턴스 시작 시 블록 디바이스 매핑에 /dev/sdc=none을 지정하면 AMI에 기본적으로 포함되어 있는 /dev/sdc 디바이스가 해당 인스턴스에 연결(attach)되지 않도록 억제한다. AMI의 기본 스토리지 연결을 선택적으로 비활성화하는 방법이다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** EC2 블록 디바이스 매핑, AMI 디바이스 억제

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q46. Which of the following statements is true of tagging an Amazon EC2 resource?

**Options:**
- A) You don't need to specify the resource identifier while terminating a resource.
- B) You can terminate, stop, or delete a resource based solely on its tags.
- C) You can't terminate, stop, or delete a resource based solely on its tags.
- D) You don't need to specify the resource identifier while stopping a resource.

**Answer:** C

**해설:**

> **문제:** Amazon EC2 리소스 태깅에 대한 다음 설명 중 올바른 것은?

| 선지 | 번역 |
|------|------|
| A | 리소스를 종료할 때 리소스 식별자를 지정할 필요가 없다 |
| B | 태그만으로 리소스를 종료, 중지 또는 삭제할 수 있다 |
| C | 태그만으로는 리소스를 종료, 중지 또는 삭제할 수 없다 |
| D | 리소스를 중지할 때 리소스 식별자를 지정할 필요가 없다 |

**(A)** : 리소스 종료 시 리소스 ID(예: i-1234abcd)가 반드시 필요하다.

**(B)** : 태그만으로는 EC2 API 명령을 실행할 수 없다. 리소스 ID가 항상 필요하다.

**(C) 정답** : EC2 API에서 인스턴스를 종료(terminate), 중지(stop), 삭제(delete)할 때는 반드시 리소스 식별자(인스턴스 ID 등)를 지정해야 한다. 태그는 식별과 필터링에 사용되지만, 태그만으로 동작을 수행할 수 없다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**(D)** : 리소스 중지에도 리소스 ID가 필요하다.

**핵심 개념:** EC2 리소스 태그 사용 제한, 리소스 식별자 요구사항

**관련 노트:** [EC2 설정 옵션](/section/03-ec2-basics#ec2-설정-옵션)

---

### Q47. You are deploying an application to collect votes for a very popular television show. Millions of users will submit votes using mobile devices. The votes must be collected into a durable, scalable, and highly available data store for real-time public tabulation. Which service should you use?

**Options:**
- A) Amazon DynamoDB.
- B) Amazon Redshift.
- C) Amazon Kinesis.
- D) Amazon Simple Queue Service.

**Answer:** A

**해설:**

> **문제:** TV 쇼 투표를 수집하는 애플리케이션을 배포한다. 수백만 모바일 사용자가 투표하며, 실시간 집계를 위해 내구성, 확장성, 고가용성이 필요한 데이터 스토어가 필요하다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon DynamoDB |
| B | Amazon Redshift |
| C | Amazon Kinesis |
| D | Amazon Simple Queue Service |

**(A) 정답** : DynamoDB는 완전 관리형 NoSQL 데이터베이스로 수백만 건의 동시 쓰기를 처리하며, 내구성(Multi-AZ 자동 복제), 확장성(자동 스케일링), 고가용성, 한 자리 밀리초 지연 시간을 제공한다. 실시간 집계와 읽기 모두에 적합하다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : Redshift는 배치 분석용 데이터 웨어하우스로 실시간 고빈도 쓰기에 적합하지 않다. → [📖 Amazon Redshift](/section/20-data-analytics#amazon-redshift)

**(C)** : Kinesis는 실시간 스트리밍 데이터 수집에 적합하지만, 투표 데이터 영구 저장 및 집계에는 추가 처리가 필요하다. 스토어 자체로는 부족하다. → [📖 Amazon Kinesis Data Streams](/section/15-integration-messaging#amazon-kinesis-data-streams)

**(D)** : SQS는 메시지 큐로 데이터 스토어 역할을 하지 않는다. 투표 데이터를 영구 저장하거나 집계할 수 없다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** DynamoDB 고성능 실시간 쓰기, 확장성

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

---

### Q48. Are Reserved Instances available for Multi-AZ Deployments?

**Options:**
- A) Only for Cluster Compute instances.
- B) Yes for all instance types.
- C) Only for M3 instance types.
- D) No.

**Answer:** B

**해설:**

> **문제:** 예약 인스턴스(Reserved Instances)는 Multi-AZ 배포에 사용할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | Cluster Compute 인스턴스에 한해서만 가능 |
| B | 모든 인스턴스 유형에 대해 가능 |
| C | M3 인스턴스 유형에 한해서만 가능 |
| D | 아니오 |

**(A)** : 특정 인스턴스 유형에만 제한되지 않는다.

**(B) 정답** : Reserved Instances(예약 인스턴스)는 모든 인스턴스 유형에 대해 Multi-AZ RDS 배포에 사용할 수 있다. 예약 인스턴스는 온디맨드 대비 할인을 제공하며 Multi-AZ 배포에도 동일하게 적용된다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : M3 인스턴스 유형에만 제한되지 않는다.

**(D)** : Reserved Instances는 Multi-AZ 배포에 사용 가능하다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**핵심 개념:** RDS Reserved Instance, Multi-AZ 배포 비용 최적화

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q49. A [...] for a VPC is a collection of subnets (typically private) that you may want to designate for your backend RDS DB Instances.

**Options:**
- A) DB Subnet Set.
- B) RDS Subnet Group.
- C) DB Subnet Group.
- D) DB Subnet Collection.

**Answer:** C

**해설:**

> **문제:** VPC의 [...]는 백엔드 RDS DB 인스턴스에 지정하려는 서브넷(일반적으로 프라이빗)의 모음이다.

| 선지 | 번역 |
|------|------|
| A | DB 서브넷 세트 |
| B | RDS 서브넷 그룹 |
| C | DB 서브넷 그룹 |
| D | DB 서브넷 컬렉션 |

**(A)** : "DB Subnet Set"은 존재하지 않는 용어다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(B)** : "RDS Subnet Group"은 AWS 공식 명칭이 아니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C) 정답** : DB 서브넷 그룹(DB Subnet Group)은 VPC 내에서 RDS 인스턴스가 배포될 수 있는 서브넷들의 모음이다. Multi-AZ 배포 시 여러 AZ에 걸쳐 서브넷을 지정하여 고가용성을 구현한다. 일반적으로 프라이빗 서브넷으로 구성한다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(D)** : "DB Subnet Collection"은 존재하지 않는 용어다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**핵심 개념:** RDS DB 서브넷 그룹, VPC 내 RDS 배포 구성

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [서브넷 Subnet](/section/25-vpc#서브넷-subnet)

---

### Q50. An instance is launched into a VPC subnet with the network ACL configured to allow all inbound traffic and deny all outbound traffic. The instance's security group is configured to allow SSH from any IP address and deny all outbound traffic. What changes need to be made to allow SSH access to the instance?

**Options:**
- A) The outbound security group needs to be modified to allow outbound traffic.
- B) The outbound network ACL needs to be modified to allow outbound traffic.
- C) Nothing, it can be accessed from any IP address using S3.
- D) Both the outbound security group and outbound network ACL need to be modified to allow outbound traffic.

**Answer:** B

**해설:**

> **문제:** VPC 서브넷의 네트워크 ACL은 모든 인바운드 허용, 모든 아웃바운드 거부로 설정되어 있다. 인스턴스의 보안 그룹은 모든 IP에서 SSH 허용, 모든 아웃바운드 거부로 설정되어 있다. SSH 접근을 허용하려면 어떤 변경이 필요한가?

| 선지 | 번역 |
|------|------|
| A | 아웃바운드 보안 그룹을 수정하여 아웃바운드 트래픽 허용 |
| B | 아웃바운드 네트워크 ACL을 수정하여 아웃바운드 트래픽 허용 |
| C | 변경 필요 없음, S3를 통해 어떤 IP에서도 접근 가능 |
| D | 아웃바운드 보안 그룹과 아웃바운드 네트워크 ACL 모두 수정 필요 |

**(A)** : 보안 그룹은 상태 저장(stateful) 방화벽이다. 인바운드 SSH가 허용되면 응답 트래픽은 아웃바운드 규칙에 관계없이 자동으로 허용된다. 따라서 보안 그룹 아웃바운드 규칙은 수정이 필요 없다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**(B) 정답** : 네트워크 ACL은 상태 비저장(stateless) 방화벽이다. 인바운드 SSH 요청이 들어왔더라도 응답 트래픽(ephemeral port)이 나가려면 아웃바운드 규칙에 별도로 허용 규칙이 있어야 한다. 현재 아웃바운드가 모두 거부되어 있으므로 NACL 아웃바운드 규칙을 수정해야 SSH가 정상 작동한다. → [📖 NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

**(C)** : S3와 SSH 접근은 무관하다.

**(D)** : 보안 그룹은 stateful이므로 수정이 필요 없다. NACL만 수정하면 된다. → [📖 NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

**핵심 개념:** 보안 그룹(Stateful) vs 네트워크 ACL(Stateless) 차이, SSH 응답 트래픽

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---
