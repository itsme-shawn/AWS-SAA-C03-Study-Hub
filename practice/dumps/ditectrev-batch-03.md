# Ditectrev SAA-C03 Practice Questions — Batch 03 (Q101-Q150)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q101. Do Amazon EBS volumes persist independently from the running life of an Amazon EC2 instance?

**Options:**
- A) Yes, they do but only if they are detached from the instance.
- B) No, you cannot attach EBS volumes to an instance.
- C) No, they are dependent.
- D) Yes, they do.

**Answer:** D

**해설:**

> **문제:** Amazon EBS 볼륨은 Amazon EC2 인스턴스의 실행 수명과 독립적으로 유지됩니까?

| 선지 | 번역 |
|------|------|
| A | 예, 단 인스턴스에서 분리된 경우에만 가능합니다. |
| B | 아니요, EBS 볼륨을 인스턴스에 연결할 수 없습니다. |
| C | 아니요, 종속적입니다. |
| D | 예, 그렇습니다. |

**(A)** : 분리 여부와 관계없이 EBS 볼륨은 기본적으로 독립적으로 존재합니다. 분리 조건은 필요하지 않습니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : EBS 볼륨은 EC2 인스턴스에 연결할 수 있습니다. 완전히 틀린 설명입니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C)** : EBS 볼륨은 인스턴스 수명에 종속되지 않습니다. 인스턴스가 종료되어도 볼륨은 기본 설정에 따라 유지될 수 있습니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D) 정답** : EBS 볼륨은 EC2 인스턴스 수명과 독립적으로 유지됩니다. 인스턴스가 중지되거나 종료되어도 EBS 볼륨은 기본적으로 존재하며, "Delete on Termination" 옵션을 통해 동작을 제어할 수 있습니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** Amazon EBS 볼륨의 영속성 — 인스턴스 수명 주기와 독립적으로 존재하는 블록 스토리지

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q102. What is a Security Group?

**Options:**
- A) None of these.
- B) A list of users that can access Amazon EC2 instances.
- C) An Access Control List (ACL) for AWS resources.
- D) A firewall for inbound traffic, built-in around every Amazon EC2 instance.

**Answer:** D

**해설:**

> **문제:** 보안 그룹(Security Group)이란 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 해당 사항 없음. |
| B | Amazon EC2 인스턴스에 접근할 수 있는 사용자 목록. |
| C | AWS 리소스에 대한 액세스 제어 목록(ACL). |
| D | 모든 Amazon EC2 인스턴스 주변에 내장된 인바운드 트래픽용 방화벽. |

**(A)** : 정확한 설명이 존재하므로 "해당 없음"은 틀렸습니다.

**(B)** : 보안 그룹은 사용자 목록이 아니라 네트워크 트래픽 규칙을 정의합니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(C)** : ACL은 네트워크 ACL(NACL)의 설명에 더 가깝습니다. 보안 그룹은 상태 저장(stateful) 방화벽입니다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**(D) 정답** : 보안 그룹은 EC2 인스턴스에 대한 인바운드/아웃바운드 트래픽을 제어하는 가상 방화벽입니다. 상태 저장(stateful)으로 동작하며, 허용 규칙만 설정합니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** Security Group — EC2 인스턴스 수준의 상태 저장(stateful) 방화벽

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list), [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

---

### Q103. You need to set up a high level of security for an Amazon Relational Database Service (RDS) you have just built in order to protect the confidential information stored in it. What are all the possible security groups that RDS uses?

**Options:**
- A) DB security groups, VPC security groups, and EC2 security groups.
- B) DB security groups only.
- C) EC2 security groups only.
- D) VPC security groups, and EC2 security groups.

**Answer:** A

**해설:**

> **문제:** 방금 구축한 Amazon RDS에 높은 수준의 보안을 설정해야 합니다. RDS가 사용하는 모든 보안 그룹 유형은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | DB 보안 그룹, VPC 보안 그룹, EC2 보안 그룹. |
| B | DB 보안 그룹만. |
| C | EC2 보안 그룹만. |
| D | VPC 보안 그룹과 EC2 보안 그룹. |

**(A) 정답** : Amazon RDS는 DB 보안 그룹(EC2-Classic), VPC 보안 그룹(VPC 내), EC2 보안 그룹(EC2 인스턴스 참조 시) 세 가지 유형 모두 사용 가능합니다. → [📖 RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**(B)** : DB 보안 그룹만으로는 모든 환경을 커버하지 못합니다. VPC 환경에서는 VPC 보안 그룹을 사용합니다. → [📖 RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**(C)** : EC2 보안 그룹만으로는 부족합니다. 여러 유형이 존재합니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : DB 보안 그룹을 누락했습니다. → [📖 RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**핵심 개념:** Amazon RDS 보안 그룹 유형 — DB 보안 그룹, VPC 보안 그룹, EC2 보안 그룹

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q104. In the 'Detailed' monitoring data available for your Amazon EBS volumes, Provisioned IOPS volumes automatically send [...] minute metrics to Amazon CloudWatch.

**Options:**
- A) 3.
- B) 1.
- C) 5.
- D) 2.

**Answer:** B

**해설:**

> **문제:** Amazon EBS 볼륨의 '상세(Detailed)' 모니터링 데이터에서 Provisioned IOPS 볼륨은 자동으로 몇 분 간격으로 Amazon CloudWatch에 메트릭을 전송합니까?

| 선지 | 번역 |
|------|------|
| A | 3분. |
| B | 1분. |
| C | 5분. |
| D | 2분. |

**(A)** : 3분 간격은 EBS 모니터링 옵션에 존재하지 않습니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B) 정답** : Provisioned IOPS (io1/io2) 볼륨은 상세 모니터링을 통해 1분 간격으로 CloudWatch에 메트릭을 전송합니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : 5분 간격은 기본(Basic) 모니터링의 간격입니다. 상세 모니터링은 1분입니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : 2분 간격은 EBS 모니터링 옵션에 존재하지 않습니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** Amazon EBS Provisioned IOPS 상세 모니터링 — 1분 간격 CloudWatch 메트릭

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지), [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q105. You are looking at ways to improve some existing infrastructure as it seems a lot of engineering resources are being taken up with basic management and monitoring tasks and the costs seem to be excessive. You are thinking of deploying Amazon ElasticCache to help. Which of the following statements is true in regards to ElasticCache?

**Options:**
- A) You can improve load and response times to user actions and queries however the cost associated with scaling web applications will be more.
- B) You can't improve load and response times to user actions and queries but you can reduce the cost associated with scaling web applications.
- C) You can improve load and response times to user actions and queries however the cost associated with scaling web applications will remain the same.
- D) You can improve load and response times to user actions and queries and also reduce the cost associated with scaling web applications.

**Answer:** D

**해설:**

> **문제:** 기존 인프라를 개선하고자 Amazon ElastiCache 배포를 고려 중입니다. ElastiCache에 관해 옳은 설명은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 부하 및 응답 시간을 개선할 수 있지만 웹 애플리케이션 확장 비용이 증가합니다. |
| B | 부하 및 응답 시간은 개선할 수 없지만 웹 애플리케이션 확장 비용을 줄일 수 있습니다. |
| C | 부하 및 응답 시간을 개선할 수 있지만 웹 애플리케이션 확장 비용은 동일하게 유지됩니다. |
| D | 부하 및 응답 시간을 개선하고 웹 애플리케이션 확장 비용도 줄일 수 있습니다. |

**(A)** : ElastiCache는 비용을 증가시키는 것이 아니라 DB 부하를 줄여 전체 비용을 절감합니다. → [📖 Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(B)** : ElastiCache는 캐싱을 통해 응답 시간을 개선하는 것이 주요 목적입니다. → [📖 Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(C)** : ElastiCache는 DB 요청을 캐시로 대체하여 비용도 절감합니다. → [📖 Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(D) 정답** : ElastiCache는 인메모리 캐싱으로 응답 시간을 단축하고, DB 부하를 줄여 더 적은 DB 리소스로 확장이 가능해 비용도 절감됩니다. → [📖 Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache)

**핵심 개념:** Amazon ElastiCache — 인메모리 캐싱으로 성능 향상 및 비용 절감

**관련 노트:** [Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache), [ElastiCache 캐싱 패턴](/section/07-rds-aurora-elasticache#elasticache-캐싱-패턴)

---

### Q106. A customer needs corporate IT governance and cost oversight of all AWS resources consumed by its divisions. The divisions want to maintain administrative control of the discrete AWS resources they consume and keep those resources separate from the resources of other divisions. Which of the following options, when used together will support the autonomy/control of divisions while enabling corporate IT to maintain governance and cost oversight? (Choose 2 answers)

**Options:**
- A) Use AWS Consolidated Billing and disable AWS root account access for the child accounts.
- B) Enable IAM cross-account access for all corporate IT administrators in each child account.
- C) Create separate VPCs for each division within the corporate IT AWS account.
- D) Use AWS Consolidated Billing to link the divisions' accounts to a parent corporate account.
- E) Write all child AWS CloudTrail and Amazon CloudWatch logs to each child account's Amazon S3 'Log' bucket.

**Answer:** D, E

**해설:**

> **문제:** 사업부의 자율성을 유지하면서 본사 IT가 거버넌스 및 비용 감독을 할 수 있도록 하려면 어떤 옵션을 함께 사용해야 합니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | AWS Consolidated Billing을 사용하고 자식 계정의 루트 계정 액세스를 비활성화합니다. |
| B | 각 자식 계정의 모든 본사 IT 관리자에 대해 IAM 교차 계정 액세스를 활성화합니다. |
| C | 본사 IT AWS 계정 내에 각 사업부별로 별도의 VPC를 생성합니다. |
| D | AWS Consolidated Billing을 사용하여 사업부 계정을 상위 본사 계정에 연결합니다. |
| E | 모든 자식 계정의 AWS CloudTrail 및 Amazon CloudWatch 로그를 각 자식 계정의 Amazon S3 'Log' 버킷에 기록합니다. |

**(A)** : 루트 계정 액세스 비활성화는 보안에 좋지만, 이것만으로는 거버넌스와 비용 감독을 충족하지 못합니다. → [📖 MFA Multi Factor Authentication](/section/02-iam#mfa-multi-factor-authentication)

**(B)** : 교차 계정 IAM 액세스는 자율성 분리 원칙에 맞지 않습니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(C)** : 단일 계정 내 VPC 분리는 계정 레벨 격리를 제공하지 않습니다. → [📖 VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

**(D) 정답** : Consolidated Billing을 통해 사업부 계정을 부모 계정에 연결하면 비용 통합 감독이 가능합니다. → [📖 AWS Organizations](/section/23-advanced-identity#aws-organizations)

**(E) 정답** : 각 자식 계정의 CloudTrail/CloudWatch 로그를 S3에 기록하면 감사 추적 및 거버넌스를 지원합니다. → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**핵심 개념:** AWS Organizations Consolidated Billing + CloudTrail 로깅 — 멀티 계정 거버넌스 및 비용 감독

**관련 노트:** [AWS Organizations](/section/23-advanced-identity#aws-organizations), [AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

---

### Q107. After creating a new IAM user which of the following must be done before they can successfully make API calls?

**Options:**
- A) Add a password to the user.
- B) Enable Multi-Factor Authentication for the user.
- C) Assign a Password Policy to the user.
- D) Create a set of Access Keys for the user.

**Answer:** D

**해설:**

> **문제:** 새 IAM 사용자를 생성한 후 API 호출을 성공적으로 수행하기 위해 반드시 해야 할 작업은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 사용자에게 비밀번호를 추가합니다. |
| B | 사용자에 대한 다중 인증(MFA)을 활성화합니다. |
| C | 사용자에게 비밀번호 정책을 할당합니다. |
| D | 사용자를 위한 액세스 키 세트를 생성합니다. |

**(A)** : 비밀번호는 AWS 콘솔 로그인에 필요하며 API 호출에는 액세스 키가 필요합니다. → [📖 AWS 접근 방법](/section/02-iam#aws-접근-방법)

**(B)** : MFA는 보안을 강화하지만 API 호출의 필수 요건은 아닙니다. → [📖 MFA Multi Factor Authentication](/section/02-iam#mfa-multi-factor-authentication)

**(C)** : 비밀번호 정책은 API 호출과 관계없습니다. → [📖 Password Policy 비밀번호 정책](/section/02-iam#password-policy-비밀번호-정책)

**(D) 정답** : API 호출에는 Access Key ID와 Secret Access Key가 필요합니다. 새 IAM 사용자 생성 시 기본적으로 액세스 키가 없으므로 반드시 생성해야 합니다. → [📖 AWS 접근 방법](/section/02-iam#aws-접근-방법)

**핵심 개념:** IAM 액세스 키 — 프로그래밍 방식(API/CLI) 접근에 필요한 자격 증명

**관련 노트:** [AWS 접근 방법](/section/02-iam#aws-접근-방법), [IAM Policies 정책](/section/02-iam#iam-policies-정책)

---

### Q108. A friend wants you to set up a small BitTorrent storage area for him on Amazon S3. You tell him it is highly unlikely that AWS would allow such a thing in their infrastructure. However you decide to investigate. Which of the following statements best describes using BitTorrent with Amazon S3?

**Options:**
- A) Amazon S3 does not support the BitTorrent protocol because it is used for pirated software.
- B) You can use the BitTorrent protocol but only for objects that are less than 100 GB in size.
- C) You can use the BitTorrent protocol but you need to ask AWS for specific permissions first.
- D) You can use the BitTorrent protocol but only for objects that are less than 5 GB in size.

**Answer:** D

**해설:**

> **문제:** Amazon S3에서 BitTorrent 사용에 대해 가장 잘 설명하는 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Amazon S3는 불법 소프트웨어에 사용되기 때문에 BitTorrent 프로토콜을 지원하지 않습니다. |
| B | BitTorrent 프로토콜을 사용할 수 있지만 100GB 미만의 객체에만 가능합니다. |
| C | BitTorrent 프로토콜을 사용할 수 있지만 먼저 AWS에 특별 권한을 요청해야 합니다. |
| D | BitTorrent 프로토콜을 사용할 수 있지만 5GB 미만의 객체에만 가능합니다. |

**(A)** : Amazon S3는 실제로 BitTorrent 프로토콜을 지원합니다. 불법 소프트웨어 이유로 차단하는 것이 아닙니다. → [📖 Amazon S3 개요](/section/10-amazon-s3#개요)

**(B)** : 제한 크기는 100GB가 아니라 5GB입니다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**(C)** : 별도 권한 요청은 필요하지 않습니다. → [📖 S3 보안](/section/10-amazon-s3#s3-보안)

**(D) 정답** : Amazon S3는 BitTorrent 프로토콜을 지원하지만, 5GB 미만의 객체에만 사용 가능합니다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**핵심 개념:** Amazon S3 BitTorrent 지원 — 5GB 미만 객체에 한해 BitTorrent 프로토콜 사용 가능

**관련 노트:** [S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

---

### Q109. IAM's Policy Evaluation Logic always starts with a default [...] for every request, except for those that use the AWS account's root security credentials?

**Options:**
- A) Permit.
- B) Deny.
- C) Cancel.

**Answer:** B

**해설:**

> **문제:** IAM의 정책 평가 로직은 AWS 계정의 루트 보안 자격 증명을 사용하는 요청을 제외한 모든 요청에 대해 기본적으로 [...]로 시작합니까?

| 선지 | 번역 |
|------|------|
| A | 허용(Permit). |
| B | 거부(Deny). |
| C | 취소(Cancel). |

**(A)** : IAM은 기본적으로 허용이 아닌 암묵적 거부(Implicit Deny)로 시작합니다. → [📖 IAM Policy Evaluation Logic](/section/23-advanced-identity#iam-policy-evaluation-logic)

**(B) 정답** : IAM 정책 평가는 항상 기본 거부(Default Deny)로 시작합니다. 명시적 허용이 없으면 모든 요청은 거부됩니다. (루트 자격 증명은 제외) → [📖 IAM Policy Evaluation Logic](/section/23-advanced-identity#iam-policy-evaluation-logic)

**(C)** : "취소"는 IAM 정책 평가에 존재하지 않는 개념입니다.

**핵심 개념:** IAM 정책 평가 로직 — 기본 암묵적 거부(Default Deny), 명시적 허용이 있어야만 접근 가능

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [IAM Policy Evaluation Logic](/section/23-advanced-identity#iam-policy-evaluation-logic)

---

### Q110. You have been given a scope to deploy some AWS infrastructure for a large organization. The requirements are that you will have a lot of EC2 instances but may need to add more when the average utilization of your Amazon EC2 fleet is high and conversely remove them when CPU utilization is low. Which AWS services would be best to use to accomplish this?

**Options:**
- A) Auto Scaling, Amazon CloudWatch and AWS Elastic Beanstalk.
- B) Auto Scaling, Amazon CloudWatch and Elastic Load Balancing.
- C) Amazon CloudFront, Amazon CloudWatch and Elastic Load Balancing.
- D) AWS Elastic Beanstalk, Amazon CloudWatch and Elastic Load Balancing.

**Answer:** B

**해설:**

> **문제:** CPU 사용률에 따라 EC2 인스턴스를 자동으로 추가/제거해야 합니다. 어떤 AWS 서비스 조합이 가장 적합합니까?

| 선지 | 번역 |
|------|------|
| A | Auto Scaling, Amazon CloudWatch, AWS Elastic Beanstalk. |
| B | Auto Scaling, Amazon CloudWatch, Elastic Load Balancing. |
| C | Amazon CloudFront, Amazon CloudWatch, Elastic Load Balancing. |
| D | AWS Elastic Beanstalk, Amazon CloudWatch, Elastic Load Balancing. |

**(A)** : Elastic Beanstalk은 애플리케이션 배포 플랫폼으로, 직접적인 스케일링 제어에는 Auto Scaling + CloudWatch + ELB 조합이 더 적합합니다. → [📖 Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

**(B) 정답** : Auto Scaling으로 인스턴스 수를 조절하고, CloudWatch로 CPU 메트릭을 모니터링하며, ELB로 트래픽을 분산합니다. 세 서비스가 함께 동작하여 자동 확장/축소를 구현합니다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(C)** : CloudFront는 CDN 서비스로 인스턴스 스케일링과 관련이 없습니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D)** : Auto Scaling 없이는 자동 인스턴스 추가/제거가 불가능합니다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**핵심 개념:** Auto Scaling + CloudWatch + ELB — CPU 기반 자동 스케일링의 핵심 조합

**관련 노트:** [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg), [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms), [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

---

### Q111. When does the billing of an Amazon EC2 system begin?

**Options:**
- A) It starts when the Status column for your distribution changes from Creating to Deployed.
- B) It starts as soon as you click the create instance option on the main EC2 console.
- C) It starts when your instance reaches 720 instance hours.
- D) It starts when Amazon EC2 initiates the boot sequence of an AMI instance.

**Answer:** D

**해설:**

> **문제:** Amazon EC2 시스템의 과금은 언제 시작됩니까?

| 선지 | 번역 |
|------|------|
| A | 배포 상태 열이 'Creating'에서 'Deployed'로 변경될 때. |
| B | EC2 콘솔에서 인스턴스 생성 옵션을 클릭하는 즉시. |
| C | 인스턴스가 720 인스턴스 시간에 도달할 때. |
| D | Amazon EC2가 AMI 인스턴스의 부팅 시퀀스를 시작할 때. |

**(A)** : 배포 상태 변경은 CloudFront 배포에 관한 설명으로, EC2 과금과 관련이 없습니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B)** : 생성 버튼 클릭 시점이 아니라 부팅 시작 시점부터 과금됩니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : 720시간은 한 달의 시간 수이며 과금 시작과 관련 없습니다.

**(D) 정답** : EC2 인스턴스 과금은 AMI 인스턴스의 부팅 시퀀스가 시작될 때부터 시작됩니다. 즉, 인스턴스가 실행(running) 상태에 진입할 때부터입니다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** EC2 과금 시작 시점 — AMI 부팅 시퀀스 시작 시(running 상태 진입)부터

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q112. A user is storing a large number of objects on AWS S3. The user wants to implement the search functionality among the objects. How can the user achieve this?

**Options:**
- A) Use the indexing feature of S3.
- B) Tag the objects with the metadata to search on that.
- C) Use the query functionality of S3.
- D) Make your own DB system which stores the S3 metadata for the search functionality.

**Answer:** D

**해설:**

> **문제:** 사용자가 AWS S3에 대량의 객체를 저장하고 있습니다. 객체 검색 기능을 구현하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | S3의 인덱싱 기능을 사용합니다. |
| B | 객체에 메타데이터 태그를 지정하여 검색합니다. |
| C | S3의 쿼리 기능을 사용합니다. |
| D | S3 메타데이터를 저장하는 자체 DB 시스템을 구축합니다. |

**(A)** : S3는 자체적인 인덱싱 기능을 제공하지 않습니다. → [📖 Amazon S3 개요](/section/10-amazon-s3#개요)

**(B)** : 태그 기반 검색은 제한적이며 대규모 검색 기능을 구현하기 어렵습니다. → [📖 S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

**(C)** : S3에는 SQL과 같은 쿼리 기능이 내장되어 있지 않습니다 (S3 Select는 객체 내 데이터 쿼리용). → [📖 Amazon S3 개요](/section/10-amazon-s3#개요)

**(D) 정답** : S3는 기본적으로 검색 기능을 제공하지 않으므로, DynamoDB 또는 RDS 등의 자체 DB에 S3 객체 메타데이터를 저장하고 검색하는 방식을 구현해야 합니다. → [📖 Amazon RDS](/section/19-databases#amazon-rds)

**핵심 개념:** Amazon S3 검색 — S3 자체 검색 기능 없음, 별도 메타데이터 DB 구축 필요

**관련 노트:** [S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

---

### Q113. A corporate web application is deployed within an Amazon Virtual Private Cloud (VPC) and is connected to the corporate data center via an IPsec VPN. The application must authenticate against the on-premises LDAP server. After authentication, each logged-in user can only access an Amazon Simple Storage Space (S3) keyspace specific to that user. Which two approaches can satisfy these objectives? (Choose 2 answers)

**Options:**
- A) Develop an identity broker that authenticates against IAM security Token service to assume an IAM role in order to get temporary AWS security credentials. The application calls the identity broker to get AWS temporary security credentials with access to the appropriate S3 bucket.
- B) The application authenticates against LDAP and retrieves the name of an IAM role associated with the user. The application then calls the IAM Security Token Service to assume that IAM role. The application can use the temporary credentials to access the appropriate S3 bucket.
- C) Develop an identity broker that authenticates against LDAP and then calls IAM Security Token Service to get IAM federated user credentials. The application calls the identity broker to get IAM federated user credentials with access to the appropriate S3 bucket.
- D) The application authenticates against LDAP. The application then calls the AWS identity and Access Management (IAM) Security service to log in to IAM using the LDAP credentials. The application can use the IAM temporary credentials to access the appropriate S3 bucket.
- E) The application authenticates against IAM Security Token Service using the LDAP credentials. The application uses those temporary AWS security credentials to access the appropriate S3 bucket.

**Answer:** B, C

**해설:**

> **문제:** VPC 내 웹 애플리케이션이 온프레미스 LDAP 서버에 인증해야 하며, 인증 후 사용자별 S3 키스페이스에만 접근 가능해야 합니다. 이 목표를 충족하는 두 가지 접근 방식은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | IAM STS에 인증하는 ID 브로커를 개발하여 IAM 역할을 수임하고 임시 자격 증명을 획득합니다. |
| B | 애플리케이션이 LDAP에 인증하고 사용자와 연결된 IAM 역할 이름을 가져옵니다. 그런 다음 IAM STS를 호출하여 해당 역할을 수임합니다. |
| C | LDAP에 인증하고 IAM STS를 호출하여 IAM 페더레이션 사용자 자격 증명을 얻는 ID 브로커를 개발합니다. |
| D | 애플리케이션이 LDAP에 인증한 후 LDAP 자격 증명으로 IAM에 로그인합니다. |
| E | 애플리케이션이 LDAP 자격 증명으로 IAM STS에 직접 인증합니다. |

**(A)** : IAM STS가 아닌 LDAP에 먼저 인증해야 합니다. 순서가 잘못되었습니다. → [📖 AWS IAM Identity Center](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**(B) 정답** : LDAP 인증 후 연결된 IAM 역할을 STS로 수임하는 올바른 페더레이션 패턴입니다. → [📖 AWS IAM Identity Center](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**(C) 정답** : LDAP 인증 후 STS 페더레이션 자격 증명을 발급하는 ID 브로커 패턴으로 유효합니다. → [📖 AWS IAM Identity Center](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**(D)** : LDAP 자격 증명으로 직접 IAM에 로그인하는 기능은 존재하지 않습니다. → [📖 AWS Directory Services](/section/23-advanced-identity#aws-directory-services)

**(E)** : LDAP 자격 증명으로 직접 STS에 인증할 수 없습니다. → [📖 AWS IAM Identity Center](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**핵심 개념:** LDAP 기반 ID 페더레이션 — STS AssumeRole 또는 페더레이션 사용자 자격 증명을 통한 S3 접근

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies), [Microsoft Active Directory AD](/section/23-advanced-identity#microsoft-active-directory-ad)

---

### Q114. A group can contain many users. Can a user belong to multiple groups?

**Options:**
- A) Yes always.
- B) No.
- C) Yes but only if they are using two factor authentication.
- D) Yes but only in VPC.

**Answer:** A

**해설:**

> **문제:** 그룹은 여러 사용자를 포함할 수 있습니다. 사용자는 여러 그룹에 속할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 항상 가능합니다. |
| B | 아니요. |
| C | 예, 단 2단계 인증을 사용하는 경우에만 가능합니다. |
| D | 예, 단 VPC에서만 가능합니다. |

**(A) 정답** : IAM 사용자는 여러 그룹에 동시에 속할 수 있습니다. 각 그룹의 정책이 모두 사용자에게 적용됩니다. → [📖 Users & Groups](/section/02-iam#users-groups)

**(B)** : IAM은 하나의 사용자가 여러 그룹에 속하는 것을 지원합니다. → [📖 Users & Groups](/section/02-iam#users-groups)

**(C)** : MFA 사용 여부와 그룹 멤버십은 관련이 없습니다. → [📖 MFA Multi Factor Authentication](/section/02-iam#mfa-multi-factor-authentication)

**(D)** : VPC와 IAM 그룹 멤버십은 관련이 없습니다. → [📖 VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

**핵심 개념:** IAM 그룹 멤버십 — 사용자는 최대 10개 그룹에 동시에 속할 수 있음

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [Users & Groups](/section/02-iam#users-groups)

---

### Q115. Does Dynamo DB support in-place atomic updates?

**Options:**
- A) It is not defined.
- B) Yes.
- C) It does support in-place non-atomic updates.

**Answer:** B

**해설:**

> **문제:** DynamoDB는 인플레이스(in-place) 원자적 업데이트를 지원합니까?

| 선지 | 번역 |
|------|------|
| A | 정의되어 있지 않습니다. |
| B | 예. |
| C | 인플레이스 비원자적 업데이트를 지원합니다. |

**(A)** : DynamoDB의 원자적 업데이트는 명확히 정의되어 있습니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(B) 정답** : DynamoDB는 인플레이스 원자적 업데이트를 지원합니다. 예를 들어 ADD 연산으로 숫자 값을 원자적으로 증가시킬 수 있습니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C)** : DynamoDB는 비원자적이 아닌 원자적 업데이트를 지원합니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**핵심 개념:** DynamoDB 원자적 업데이트 — 조건부 쓰기 및 원자적 카운터 지원

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q116. Can you move a Reserved Instance from one Availability Zone to another?

**Options:**
- A) Yes, but each Reserved Instance is associated with a specific Region that cannot be changed.
- B) Yes, only in US-West-2.
- C) Yes, only in US-East-1.
- D) No.

**Answer:** A

**해설:**

> **문제:** 예약 인스턴스(Reserved Instance)를 한 가용 영역(AZ)에서 다른 AZ로 이동할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 단 각 예약 인스턴스는 변경할 수 없는 특정 리전에 연결됩니다. |
| B | 예, US-West-2에서만 가능합니다. |
| C | 예, US-East-1에서만 가능합니다. |
| D | 아니요. |

**(A) 정답** : Convertible RI를 제외하고 일반 RI는 같은 리전 내 다른 AZ로 이동할 수 있습니다. 단, 리전 간 이동은 불가능합니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : 특정 리전에만 제한되지 않습니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : 특정 리전에만 제한되지 않습니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(D)** : AZ 간 이동은 가능합니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** Reserved Instance 유연성 — 동일 리전 내 AZ 변경 가능, 리전 간 변경 불가

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q117. You want to establish a dedicated network connection from your premises to AWS in order to save money by transferring data directly to AWS rather than through your internet service provider. You are sure there must be some other benefits beyond cost savings. Which of the following statements would be the best choice to put your client's mind at rest?

**Options:**
- A) Different instances running on the same physical machine are isolated from each other via a 256-bit Advanced Encryption Standard (AES-256).
- B) Different instances running on the same physical machine are isolated from each other via the Xen hypervisor and via a 256-bit Advanced Encryption Standard (AES-256).
- C) Different instances running on the same physical machine are isolated from each other via the Xen hypervisor.
- D) Different instances running on the same physical machine are isolated from each other via IAM permissions.

**Answer:** C

**해설:**

> **문제:** 온프레미스에서 AWS로의 전용 네트워크 연결(Direct Connect)을 구축하려 합니다. 비용 절감 외의 다른 이점에 대해 고객을 안심시킬 수 있는 가장 좋은 설명은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 동일 물리 머신에서 실행되는 인스턴스는 AES-256 암호화로 격리됩니다. |
| B | 동일 물리 머신에서 실행되는 인스턴스는 Xen 하이퍼바이저와 AES-256으로 격리됩니다. |
| C | 동일 물리 머신에서 실행되는 인스턴스는 Xen 하이퍼바이저로 격리됩니다. |
| D | 동일 물리 머신에서 실행되는 인스턴스는 IAM 권한으로 격리됩니다. |

**(A)** : AES-256은 네트워크 암호화이며 인스턴스 격리는 하이퍼바이저가 담당합니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(B)** : Xen 하이퍼바이저와 AES-256 조합은 정확하지 않습니다. 인스턴스 격리는 하이퍼바이저만으로 이루어집니다. → [📖 EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

**(C) 정답** : AWS EC2에서 동일 물리 머신의 인스턴스들은 Xen 하이퍼바이저(현재는 Nitro)를 통해 서로 격리됩니다. 이는 Direct Connect의 보안 이점과 함께 고객을 안심시킬 수 있는 설명입니다. → [📖 EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

**(D)** : IAM 권한은 API 접근 제어이며 인스턴스 물리적 격리와 무관합니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**핵심 개념:** EC2 인스턴스 격리 — Xen/Nitro 하이퍼바이저를 통한 물리적 격리

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

---

### Q118. Can I detach the primary (eth0) network interface when the instance is running or stopped?

**Options:**
- A) Yes, You can.
- B) No. You cannot.

**Answer:** B

**해설:**

> **문제:** 인스턴스가 실행 중이거나 중지된 상태에서 기본(eth0) 네트워크 인터페이스를 분리할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 가능합니다. |
| B | 아니요, 불가능합니다. |

**(A)** : 기본 네트워크 인터페이스(eth0)는 분리할 수 없습니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(B) 정답** : EC2 인스턴스의 기본 ENI(eth0)는 실행 중이거나 중지된 상태 모두에서 분리할 수 없습니다. 추가로 연결한 ENI만 분리 가능합니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**핵심 개념:** EC2 기본 ENI(eth0) — 항상 인스턴스에 연결되어 있으며 분리 불가

**관련 노트:** [Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

---

### Q119. You have launched an Amazon Elastic Compute Cloud (EC2) instance into a public subnet with a primary private IP address assigned, an internet gateway is attached to the VPC, and the public route table is configured to send all Internet-based traffic to the Internet gateway. The instance security group is set to allow all outbound traffic but cannot access the internet. Why is the Internet unreachable from this instance?

**Options:**
- A) The instance does not have a public IP address.
- B) The internet gateway security group must allow all outbound traffic.
- C) The instance security group must allow all inbound traffic.
- D) The instance 'Source/Destination check' property must be enabled.

**Answer:** A

**해설:**

> **문제:** EC2 인스턴스가 퍼블릭 서브넷에 배포되고, 인터넷 게이트웨이도 연결되어 있으며 라우팅 테이블도 올바르게 구성되어 있습니다. 보안 그룹은 모든 아웃바운드 트래픽을 허용하지만 인터넷에 접근할 수 없습니다. 이유는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 인스턴스에 퍼블릭 IP 주소가 없습니다. |
| B | 인터넷 게이트웨이 보안 그룹이 모든 아웃바운드 트래픽을 허용해야 합니다. |
| C | 인스턴스 보안 그룹이 모든 인바운드 트래픽을 허용해야 합니다. |
| D | 인스턴스의 '소스/대상 확인(Source/Destination check)' 속성을 활성화해야 합니다. |

**(A) 정답** : 퍼블릭 서브넷에 있더라도 퍼블릭 IP 주소(또는 Elastic IP)가 없으면 인터넷과 통신할 수 없습니다. 인터넷 게이트웨이는 퍼블릭 IP가 있는 인스턴스의 트래픽만 처리합니다. → [📖 Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

**(B)** : 인터넷 게이트웨이에는 보안 그룹이 없습니다. → [📖 Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

**(C)** : 아웃바운드 트래픽이 문제이므로 인바운드 규칙과는 무관합니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : Source/Destination check는 NAT 인스턴스에서 비활성화해야 하는 옵션이며, 일반 EC2 인스턴스와는 관련 없습니다. → [📖 NAT Instance 레거시](/section/25-vpc#nat-instance-레거시-시험에-출제)

**핵심 개념:** EC2 인터넷 연결 요건 — 퍼블릭 IP 또는 Elastic IP 필요

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [Elastic IP](/section/04-ec2-associate#elastic-ip), [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

---

### Q120. Which of the following statements best describes the differences between Elastic Beanstalk and CloudFormation?

**Options:**
- A) Elastic Beanstalk uses Elastic load balancing and CloudFormation doesn't.
- B) CloudFormation is faster in deploying applications than Elastic Beanstalk.
- C) Elastic Beanstalk is faster in deploying applications than CloudFormation.
- D) CloudFormation is much more powerful than Elastic Beanstalk, because you can actually design and script custom resources.

**Answer:** D

**해설:**

> **문제:** Elastic Beanstalk와 CloudFormation의 차이를 가장 잘 설명하는 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Elastic Beanstalk는 Elastic Load Balancing을 사용하지만 CloudFormation은 그렇지 않습니다. |
| B | CloudFormation이 Elastic Beanstalk보다 애플리케이션 배포가 더 빠릅니다. |
| C | Elastic Beanstalk가 CloudFormation보다 애플리케이션 배포가 더 빠릅니다. |
| D | CloudFormation은 사용자 정의 리소스를 설계하고 스크립트로 작성할 수 있어 Elastic Beanstalk보다 훨씬 강력합니다. |

**(A)** : CloudFormation도 ELB를 포함한 모든 AWS 리소스를 프로비저닝할 수 있습니다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**(B)** : 배포 속도는 주요 차이점이 아닙니다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**(C)** : 배포 속도는 주요 차이점이 아닙니다. → [📖 Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

**(D) 정답** : CloudFormation은 모든 AWS 리소스를 코드로 정의할 수 있는 IaC 도구로, 커스텀 리소스까지 지원하는 반면 Elastic Beanstalk는 웹 애플리케이션 배포에 특화된 PaaS입니다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**핵심 개념:** CloudFormation vs Elastic Beanstalk — CloudFormation은 범용 IaC, Elastic Beanstalk는 애플리케이션 배포 PaaS

**관련 노트:** [AWS CloudFormation](/section/28-other-services#aws-cloudformation), [Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

---

### Q121. It is advised that you watch the Amazon CloudWatch [...] metric (available via the AWS Management Console or Amazon Cloud Watch APIs) carefully and recreate the Read Replica should it fall behind due to replication errors.

**Options:**
- A) Write Lag.
- B) Read Replica.
- C) Replica Lag.
- D) Single Replica.

**Answer:** C

**해설:**

> **문제:** 복제 오류로 인해 뒤처질 경우 Read Replica를 재생성해야 하므로, Amazon CloudWatch의 어떤 메트릭을 주의 깊게 살펴봐야 합니까?

| 선지 | 번역 |
|------|------|
| A | Write Lag. |
| B | Read Replica. |
| C | Replica Lag. |
| D | Single Replica. |

**(A)** : "Write Lag"는 존재하지 않는 CloudWatch 메트릭입니다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(B)** : "Read Replica"는 메트릭 이름이 아닙니다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(C) 정답** : `ReplicaLag` 메트릭은 Read Replica가 기본 DB 인스턴스에 비해 얼마나 뒤처져 있는지를 초 단위로 표시합니다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(D)** : "Single Replica"는 존재하지 않는 메트릭입니다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**핵심 개념:** RDS Read Replica 모니터링 — CloudWatch `ReplicaLag` 메트릭으로 복제 지연 감시

**관련 노트:** [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas), [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q122. Your application provides data transformation services. Files containing data to be transformed are first uploaded to Amazon S3 and then transformed by a fleet of spot EC2 instances. Files submitted by your premium customers must be transformed with the highest priority. How should you implement such a system?

**Options:**
- A) Use a DynamoDB table with an attribute defining the priority level. Transformation instances will scan the table for tasks, sorting the results by priority level.
- B) Use Route 53 latency based-routing to send high priority tasks to the closest transformation instances.
- C) Use two SQS queues, one for high priority messages, the other for default priority. Transformation instances first poll the high priority queue; if there is no message, they poll the default priority queue.
- D) Use a single SQS queue. Each message contains the priority level. Transformation instances poll high-priority messages first.

**Answer:** C

**해설:**

> **문제:** 프리미엄 고객의 파일 변환을 최우선으로 처리하는 시스템을 어떻게 구현해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 우선순위 속성을 가진 DynamoDB 테이블을 사용하고 인스턴스가 우선순위로 정렬하여 스캔합니다. |
| B | Route 53 지연 시간 기반 라우팅으로 고우선순위 작업을 가장 가까운 인스턴스에 전송합니다. |
| C | 두 개의 SQS 큐를 사용합니다. 하나는 고우선순위, 다른 하나는 기본 우선순위. 인스턴스는 먼저 고우선순위 큐를 폴링합니다. |
| D | 단일 SQS 큐를 사용하고 각 메시지에 우선순위를 포함시킵니다. 인스턴스가 고우선순위 메시지를 먼저 폴링합니다. |

**(A)** : DynamoDB 스캔은 비용이 많이 들고 SQS보다 메시징에 비효율적입니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : Route 53 지연 시간 라우팅은 우선순위 처리와 관계없습니다. → [📖 라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

**(C) 정답** : 두 개의 SQS 큐를 사용하여 우선순위를 분리하고, 인스턴스가 고우선순위 큐를 먼저 폴링하는 방식은 간단하고 효과적인 우선순위 처리 패턴입니다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : SQS는 메시지 순서나 우선순위 기반 폴링을 지원하지 않으므로 단일 큐로는 우선순위 처리가 불가능합니다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** SQS 우선순위 처리 패턴 — 두 개의 큐를 사용한 우선순위 메시지 처리

**관련 노트:** [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

---

### Q123. True or False: When you view the block device mapping for your instance, you can see only the EBS volumes, not the instance store volumes.

**Options:**
- A) Depends on the instance type.
- B) False.
- C) Depends on whether you use API call.
- D) True.

**Answer:** D

**해설:**

> **문제:** 인스턴스의 블록 디바이스 매핑을 볼 때 EBS 볼륨만 볼 수 있고 인스턴스 스토어 볼륨은 볼 수 없습니다. 참/거짓?

| 선지 | 번역 |
|------|------|
| A | 인스턴스 유형에 따라 다릅니다. |
| B | 거짓. |
| C | API 호출 사용 여부에 따라 다릅니다. |
| D | 참. |

**(A)** : 인스턴스 유형과 관계없이 콘솔의 블록 디바이스 매핑에는 EBS 볼륨만 표시됩니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : 이 설명은 참입니다.

**(C)** : API 사용 여부와 관계없이 동일합니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D) 정답** : 콘솔이나 API를 통해 블록 디바이스 매핑을 조회할 때 EBS 볼륨만 표시되며, 인스턴스 스토어 볼륨은 표시되지 않습니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** EC2 블록 디바이스 매핑 — EBS 볼륨만 표시, 인스턴스 스토어는 미표시

**관련 노트:** [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q124. Does AWS CloudFormation support Amazon EC2 tagging?

**Options:**
- A) Yes, AWS CloudFormation supports Amazon EC2 tagging.
- B) No, CloudFormation doesn't support any tagging.
- C) No, it doesn't support Amazon EC2 tagging.
- D) It depends if the Amazon EC2 tagging has been defined in the template.

**Answer:** A

**해설:**

> **문제:** AWS CloudFormation은 Amazon EC2 태깅을 지원합니까?

| 선지 | 번역 |
|------|------|
| A | 예, AWS CloudFormation은 Amazon EC2 태깅을 지원합니다. |
| B | 아니요, CloudFormation은 태깅을 전혀 지원하지 않습니다. |
| C | 아니요, Amazon EC2 태깅을 지원하지 않습니다. |
| D | Amazon EC2 태깅이 템플릿에 정의되어 있는지에 따라 다릅니다. |

**(A) 정답** : CloudFormation 템플릿에서 EC2 인스턴스 리소스에 Tags 속성을 사용하여 태그를 정의할 수 있습니다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**(B)** : CloudFormation은 대부분의 AWS 리소스에 대한 태깅을 지원합니다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**(C)** : EC2 태깅을 지원합니다.

**(D)** : 템플릿에 정의가 필요한 것은 맞지만, "지원한다"는 사실 자체는 조건 없이 참입니다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**핵심 개념:** CloudFormation EC2 태깅 — Tags 속성으로 리소스 태그 정의 지원

**관련 노트:** [AWS CloudFormation](/section/28-other-services#aws-cloudformation)

---

### Q125. If I modify a DB Instance or the DB parameter group associated with the instance, should I reboot the instance for the changes to take effect?

**Options:**
- A) Yes.
- B) No.

**Answer:** A

**해설:**

> **문제:** DB 인스턴스 또는 인스턴스와 연결된 DB 파라미터 그룹을 수정하면 변경 사항이 적용되기 위해 인스턴스를 재부팅해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니요. |

**(A) 정답** : DB 파라미터 그룹 변경사항은 "동적(dynamic)" 파라미터는 즉시 적용되지만, "정적(static)" 파라미터는 DB 인스턴스 재부팅 후에만 적용됩니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : 일부 정적 파라미터는 재부팅 없이 적용되지 않습니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS 파라미터 그룹 변경 — 정적 파라미터는 재부팅 필요, 동적 파라미터는 즉시 적용

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q126. If you are using Amazon RDS Provisioned IOPS storage with MySQL and Oracle database engines, you can scale the throughput of your database Instance by specifying the IOPS rate from [...].

**Options:**
- A) 1,000 to 100,000.
- B) 100 to 1,000.
- C) 10,000 to 100,000.
- D) 1,000 to 10,000.

**Answer:** D

**해설:**

> **문제:** MySQL 및 Oracle 데이터베이스 엔진에서 Amazon RDS Provisioned IOPS 스토리지를 사용할 때 IOPS 비율을 얼마로 지정할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 1,000~100,000. |
| B | 100~1,000. |
| C | 10,000~100,000. |
| D | 1,000~10,000. |

**(A)** : 이 문제가 작성된 시점의 한도는 1,000~10,000이었습니다. 현재는 상향되었지만 시험 기준에서는 D가 정답입니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B)** : 최솟값이 너무 낮습니다.

**(C)** : 최솟값이 너무 높습니다.

**(D) 정답** : 시험 기준으로 RDS Provisioned IOPS는 1,000에서 10,000 IOPS 범위로 지정 가능합니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**핵심 개념:** RDS Provisioned IOPS 범위 — 1,000~10,000 IOPS (시험 기준)

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q127. To specify a resource in a policy statement, in Amazon EC2, can you use its Amazon Resource Name (ARN)?

**Options:**
- A) Yes, you can.
- B) No, you can't because EC2 is not related to ARN.
- C) No, you can't because you can't specify a particular Amazon EC2 resource in an IAM policy.
- D) Yes, you can but only for the resources that are not affected by the action.

**Answer:** A

**해설:**

> **문제:** IAM 정책 문에서 Amazon EC2 리소스를 지정하기 위해 Amazon Resource Name(ARN)을 사용할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 가능합니다. |
| B | 아니요, EC2는 ARN과 관련이 없습니다. |
| C | 아니요, IAM 정책에서 특정 EC2 리소스를 지정할 수 없습니다. |
| D | 예, 단 작업의 영향을 받지 않는 리소스에만 가능합니다. |

**(A) 정답** : IAM 정책의 Resource 요소에 EC2 ARN을 사용하여 특정 인스턴스, 보안 그룹 등 EC2 리소스를 지정할 수 있습니다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(B)** : EC2는 ARN을 사용합니다. 예: `arn:aws:ec2:region:account-id:instance/instance-id` → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(C)** : IAM 정책에서 특정 EC2 리소스를 ARN으로 지정할 수 있습니다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(D)** : 조건 없이 ARN으로 리소스를 지정할 수 있습니다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**핵심 개념:** IAM 정책 ARN 사용 — EC2 리소스도 ARN으로 특정 리소스 지정 가능

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [IAM Policies 정책](/section/02-iam#iam-policies-정책), [IAM Conditions](/section/23-advanced-identity#iam-conditions)

---

### Q128. An enterprise wants to use a third-party SaaS application. The SaaS application needs to have access to issue several API commands to discover Amazon EC2 resources running within the enterprise's account. The enterprise has internal security policies that require any outside access to their environment must conform to the principles of least privilege and there must be controls in place to ensure that the credentials used by the SaaS vendor cannot be used by any other third party. Which of the following would meet all of these conditions?

**Options:**
- A) From the AWS Management Console, navigate to the Security Credentials page and retrieve the access and secret key for your account.
- B) Create an IAM user within the enterprise account assign a user policy to the IAM user that allows only the actions required by the SaaS application create a new access and secret key for the user and provide these credentials to the SaaS provider.
- C) Create an IAM role for cross-account access allows the SaaS provider's account to assume the role and assign it a policy that allows only the actions required by the SaaS application.
- D) Create an IAM role for EC2 instances, assign it a policy that allows only the actions required for the SaaS application to work. Provide the role ARN to the SaaS provider to use when launching their application instances.

**Answer:** C

**해설:**

> **문제:** 타사 SaaS 애플리케이션이 최소 권한 원칙을 준수하고, SaaS 벤더의 자격 증명이 다른 타사에 의해 사용될 수 없도록 하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | AWS 관리 콘솔에서 보안 자격 증명 페이지로 이동하여 계정의 액세스 및 시크릿 키를 가져옵니다. |
| B | 엔터프라이즈 계정 내에 IAM 사용자를 생성하고 필요한 작업만 허용하는 정책을 할당한 후 액세스 키를 제공합니다. |
| C | 교차 계정 액세스용 IAM 역할을 생성하여 SaaS 제공업체 계정이 역할을 수임할 수 있도록 하고 필요한 작업만 허용하는 정책을 할당합니다. |
| D | EC2 인스턴스용 IAM 역할을 생성하고 필요한 작업만 허용하는 정책을 할당합니다. 역할 ARN을 SaaS 제공업체에 제공합니다. |

**(A)** : 루트 계정 자격 증명 공유는 최소 권한 원칙에 위반되며 매우 위험합니다. → [📖 Users & Groups](/section/02-iam#users-groups)

**(B)** : 장기 액세스 키 발급은 보안 위험이 있으며, 키가 다른 타사에 사용될 수 있는 위험이 있습니다. → [📖 AWS 접근 방법](/section/02-iam#aws-접근-방법)

**(C) 정답** : 교차 계정 IAM 역할을 통해 SaaS 제공업체만 역할을 수임할 수 있도록 신뢰 정책을 설정하고, 임시 자격 증명만 사용하므로 최소 권한 및 자격 증명 제어 요건을 모두 충족합니다. → [📖 IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

**(D)** : EC2 인스턴스 역할은 SaaS 제공업체가 외부에서 접근하는 시나리오에 적합하지 않습니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**핵심 개념:** 교차 계정 IAM 역할 — 타사 SaaS에 최소 권한의 임시 자격 증명 부여

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

---

### Q129. By default what are ENIs that are automatically created and attached to instances using the EC2 console set to do when the attached instance terminates?

**Options:**
- A) Remain as is.
- B) Terminate.
- C) Hibernate.
- D) Pause.

**Answer:** B

**해설:**

> **문제:** EC2 콘솔을 통해 자동으로 생성되어 인스턴스에 연결된 ENI는 기본적으로 인스턴스가 종료될 때 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | 그대로 유지됩니다. |
| B | 종료됩니다. |
| C | 최대 절전 모드가 됩니다. |
| D | 일시 중지됩니다. |

**(A)** : 자동 생성된 기본 ENI는 인스턴스 종료 시 함께 삭제됩니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(B) 정답** : EC2 콘솔을 통해 인스턴스 시작 시 자동으로 생성된 ENI(기본 네트워크 인터페이스)는 인스턴스 종료 시 기본적으로 함께 삭제됩니다. 별도로 생성하여 연결한 ENI는 유지됩니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(C)** : ENI에는 최대 절전 모드가 없습니다.

**(D)** : ENI에는 일시 중지 상태가 없습니다.

**핵심 개념:** EC2 기본 ENI 수명 주기 — 인스턴스 종료 시 자동 삭제 (수동 연결 ENI는 유지)

**관련 노트:** [Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni), [EC2 Hibernate 최대 절전 모드](/section/04-ec2-associate#ec2-hibernate-최대-절전-모드)

---

### Q130. In EC2, what happens to the data in an instance store if an instance reboots (either intentionally or unintentionally)?

**Options:**
- A) Data is deleted from the instance store for security reasons.
- B) Data persists in the instance store.
- C) Data is partially present in the instance store.
- D) Data in the instance store will be lost.

**Answer:** B

**해설:**

> **문제:** EC2에서 인스턴스가 재부팅(의도적 또는 비의도적)될 때 인스턴스 스토어의 데이터는 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | 보안상의 이유로 인스턴스 스토어에서 데이터가 삭제됩니다. |
| B | 데이터가 인스턴스 스토어에 유지됩니다. |
| C | 데이터가 인스턴스 스토어에 부분적으로 존재합니다. |
| D | 인스턴스 스토어의 데이터가 손실됩니다. |

**(A)** : 재부팅 시 보안 삭제는 일어나지 않습니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**(B) 정답** : 인스턴스가 재부팅될 때 인스턴스 스토어 데이터는 유지됩니다. 단, 인스턴스가 중지(stop)되거나 종료(terminate)되면 데이터가 손실됩니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**(C)** : 재부팅 시 데이터가 부분 손실되지는 않습니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**(D)** : 재부팅 시에는 손실되지 않습니다. 중지/종료 시에 손실됩니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** 인스턴스 스토어 데이터 영속성 — 재부팅 시 유지, 중지/종료 시 손실

**관련 노트:** [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

---

### Q131. You are designing a social media site and are considering how to mitigate distributed denial-of service (DDoS) attacks. Which of the below are viable mitigation techniques? (Choose 3 answers)

**Options:**
- A) Add multiple elastic network interfaces (ENIs) to each EC2 instance to increase the network bandwidth.
- B) Use dedicated instances to ensure that each instance has the maximum performance possible.
- C) Use an Amazon CloudFront distribution for both static and dynamic content.
- D) Use an Elastic Load Balancer with auto scaling groups at the web, App and Amazon Relational Database Service (RDS) tiers.
- E) Add alert Amazon CloudWatch to look for high Network in and CPU utilization.
- F) Create processes and capabilities to quickly add and remove rules to the instance OS firewall.

**Answer:** C, D, E

**해설:**

> **문제:** 소셜 미디어 사이트에서 DDoS 공격을 완화하기 위한 유효한 기술은 무엇입니까? (3개 선택)

| 선지 | 번역 |
|------|------|
| A | 네트워크 대역폭을 늘리기 위해 각 EC2 인스턴스에 여러 ENI를 추가합니다. |
| B | 최대 성능을 위해 전용(Dedicated) 인스턴스를 사용합니다. |
| C | 정적 및 동적 콘텐츠 모두에 Amazon CloudFront 배포를 사용합니다. |
| D | 웹, 앱, RDS 계층에서 Auto Scaling 그룹과 함께 ELB를 사용합니다. |
| E | 높은 네트워크 입력 및 CPU 사용률을 감지하기 위한 CloudWatch 알림을 추가합니다. |
| F | 인스턴스 OS 방화벽에 규칙을 빠르게 추가/제거하는 프로세스를 구축합니다. |

**(A)** : 여러 ENI 추가는 대역폭을 늘리지 않으며 DDoS 완화에 효과적이지 않습니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(B)** : 전용 인스턴스는 성능을 높이지만 DDoS 완화 기법이 아닙니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C) 정답** : CloudFront는 엣지 로케이션에서 트래픽을 흡수하여 원본 서버를 보호합니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D) 정답** : ELB와 Auto Scaling은 트래픽 분산과 자동 확장으로 DDoS 영향을 완화합니다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(E) 정답** : CloudWatch 알림으로 DDoS 징후를 조기에 감지하여 대응할 수 있습니다. → [📖 CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(F)** : OS 방화벽 규칙 조작은 수동적이고 느린 대응 방식으로 효과가 제한적입니다.

**핵심 개념:** DDoS 완화 기법 — CloudFront(엣지 흡수) + ELB/ASG(트래픽 분산) + CloudWatch(조기 감지)

**관련 노트:** [DDoS 복원력 모범 사례](/section/24-security-encryption#ddos-복원력-모범-사례), [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q132. In Amazon CloudFront, if you use Amazon EC2 instances and other custom origins with CloudFront, it is recommended to [...].

**Options:**
- A) not use Elastic Load Balancing.
- B) restrict Internet communication to private instances while allowing outgoing traffic.
- C) enable access key rotation for CloudWatch metrics.
- D) specify the URL of the load balancer for the domain name of your origin server.

**Answer:** D

**해설:**

> **문제:** Amazon CloudFront에서 EC2 인스턴스와 같은 사용자 정의 오리진을 사용할 때 권장 사항은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Elastic Load Balancing을 사용하지 않습니다. |
| B | 아웃바운드 트래픽을 허용하면서 프라이빗 인스턴스에 대한 인터넷 통신을 제한합니다. |
| C | CloudWatch 메트릭에 대한 액세스 키 교체를 활성화합니다. |
| D | 오리진 서버의 도메인 이름으로 로드 밸런서의 URL을 지정합니다. |

**(A)** : ELB는 CloudFront와 함께 사용하는 것이 권장됩니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B)** : 관련 없는 설명입니다.

**(C)** : CloudWatch 액세스 키 교체는 이 시나리오와 관련 없습니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D) 정답** : EC2 인스턴스를 CloudFront 오리진으로 사용할 때는 직접 인스턴스 IP 대신 ELB의 URL을 오리진 도메인으로 지정하는 것이 권장됩니다. 이를 통해 고가용성과 부하 분산이 가능합니다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**핵심 개념:** CloudFront 사용자 정의 오리진 — ELB URL을 오리진 도메인으로 지정 권장

**관련 노트:** [CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스), [CloudFront와 퍼블릭 네트워크를 통한 ALB/EC2 연결](/section/13-cloudfront-global-accelerator#cloudfront와-퍼블릭-네트워크를-통한-albec2-연결)

---

### Q133. Which of the following statements is true regarding attaching network interfaces to your instances in your VPC?

**Options:**
- A) You can attach 5 ENIs per instance type.
- B) You can attach as many ENIs as you want.
- C) The number of ENIs you can attach varies by instance type.
- D) You can attach 100 ENIs total regardless of instance type.

**Answer:** C

**해설:**

> **문제:** VPC의 인스턴스에 네트워크 인터페이스를 연결하는 것에 대해 옳은 설명은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 인스턴스 유형당 5개의 ENI를 연결할 수 있습니다. |
| B | 원하는 만큼 ENI를 연결할 수 있습니다. |
| C | 연결할 수 있는 ENI 수는 인스턴스 유형에 따라 다릅니다. |
| D | 인스턴스 유형에 관계없이 총 100개의 ENI를 연결할 수 있습니다. |

**(A)** : ENI 한도는 5개로 고정되어 있지 않으며 인스턴스 유형에 따라 다릅니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(B)** : ENI 수는 인스턴스 유형별로 한도가 있습니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(C) 정답** : EC2 인스턴스에 연결할 수 있는 ENI 수는 인스턴스 유형(크기)에 따라 다르며, 더 큰 인스턴스일수록 더 많은 ENI를 지원합니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(D)** : 100개 고정 한도는 존재하지 않습니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**핵심 개념:** ENI 한도 — 인스턴스 유형에 따라 다른 최대 ENI 연결 수

**관련 노트:** [Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

---

### Q134. What is the reason for this?

**Options:**
- A) For security reasons.
- B) Hardware restrictions.
- C) Public (IPv4) internet addresses are a scarce resource.
- D) There are only 5 network interfaces per instance.

**Answer:** C

**해설:**

> **문제:** (퍼블릭 IP 주소 할당 제한의) 이유는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 보안 이유. |
| B | 하드웨어 제한. |
| C | 퍼블릭(IPv4) 인터넷 주소는 희소 자원입니다. |
| D | 인스턴스당 네트워크 인터페이스가 5개뿐입니다. |

**(A)** : 보안 이유가 주된 원인은 아닙니다.

**(B)** : 하드웨어 제한이 원인은 아닙니다.

**(C) 정답** : IPv4 퍼블릭 주소는 전 세계적으로 희소한 자원이기 때문에 AWS는 퍼블릭 IP 할당에 제한을 두고 있습니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**(D)** : ENI 수와 퍼블릭 IP 제한은 별개의 문제입니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**핵심 개념:** IPv4 주소 희소성 — 퍼블릭 IP 제한의 근본적인 이유

**관련 노트:** [Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni), [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

---

### Q135. Can a 'user' be associated with multiple AWS accounts?

**Options:**
- A) Yes.
- B) No.

**Answer:** A

**해설:**

> **문제:** '사용자'가 여러 AWS 계정과 연결될 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니요. |

**(A) 정답** : IAM 사용자 자체는 하나의 계정에 속하지만, 교차 계정 역할(Cross-account Role)을 통해 다른 AWS 계정의 리소스에 접근할 수 있습니다. 또한 AWS SSO를 사용하면 단일 사용자가 여러 계정에 접근 가능합니다. → [📖 IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

**(B)** : 교차 계정 액세스 메커니즘을 통해 여러 계정과 연결될 수 있습니다. → [📖 IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

**핵심 개념:** IAM 교차 계정 액세스 — 역할 수임(AssumeRole)을 통해 여러 계정에 접근 가능

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies), [AWS IAM Identity Center AWS SSO 후속](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

---

### Q136. You have an application running on an Amazon Elastic Compute Cloud instance, that uploads 5 GB video objects to Amazon Simple Storage Service (S3). Video uploads are taking longer than expected, resulting in poor application performance. Which method will help improve performance of your application?

**Options:**
- A) Enable enhanced networking.
- B) Use Amazon S3 multipart upload.
- C) Leveraging Amazon CloudFront, use the HTTP POST method to reduce latency.
- D) Use Amazon Elastic Block Store Provisioned IOPs and use an Amazon EBS-optimized instance.

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스에서 5GB 비디오 객체를 S3에 업로드하는 데 예상보다 오래 걸려 성능이 저하됩니다. 어떤 방법이 성능 개선에 도움이 됩니까?

| 선지 | 번역 |
|------|------|
| A | 향상된 네트워킹(Enhanced Networking)을 활성화합니다. |
| B | Amazon S3 멀티파트 업로드를 사용합니다. |
| C | Amazon CloudFront를 활용하여 HTTP POST 방식으로 지연 시간을 줄입니다. |
| D | Amazon EBS Provisioned IOPS와 EBS 최적화 인스턴스를 사용합니다. |

**(A)** : 향상된 네트워킹은 EC2 간 통신에 도움이 되지만 S3 업로드 성능의 주요 병목은 아닙니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(B) 정답** : S3 멀티파트 업로드는 대용량 파일을 여러 파트로 나누어 병렬 업로드하여 속도를 크게 향상시킵니다. 100MB 이상의 객체에 권장됩니다. → [📖 S3 Performance 최적화](/section/11-s3-advanced#s3-performance-최적화)

**(C)** : CloudFront는 다운로드 최적화에 더 적합하며, S3 업로드 성능 개선에는 직접적이지 않습니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D)** : EBS IOPS 향상은 디스크 I/O 성능 개선이며 S3 업로드와는 관련이 없습니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**핵심 개념:** S3 멀티파트 업로드 — 대용량 파일 병렬 업로드로 성능 향상, 100MB 이상 권장

**관련 노트:** [S3 Performance 최적화](/section/11-s3-advanced#s3-performance-최적화), [S3 Baseline Performance 기본 성능](/section/11-s3-advanced#s3-baseline-performance-기본-성능)

---

### Q137. You have been given a scope to set up an AWS Media Sharing Framework for a new start up photo sharing company similar to flickr. The first thing that comes to mind about this is that it will obviously need a huge amount of persistent data storage for this framework. Which of the following storage options would be appropriate for persistent storage?

**Options:**
- A) Amazon Glacier or Amazon S3.
- B) Amazon Glacier or AWS Import/Export.
- C) AWS Import/Export or Amazon CloudFront.
- D) Amazon EBS volumes or Amazon S3.

**Answer:** D

**해설:**

> **문제:** 사진 공유 회사를 위한 AWS 미디어 공유 프레임워크에서 대량의 영속성 데이터 스토리지로 적합한 옵션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Amazon Glacier 또는 Amazon S3. |
| B | Amazon Glacier 또는 AWS Import/Export. |
| C | AWS Import/Export 또는 Amazon CloudFront. |
| D | Amazon EBS 볼륨 또는 Amazon S3. |

**(A)** : Glacier는 장기 보관용 아카이브 스토리지로, 빠른 접근이 필요한 사진 공유에 부적합합니다. → [📖 S3 Storage Classes](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B)** : Glacier와 Import/Export 모두 사진 공유 서비스에 적합하지 않습니다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(C)** : CloudFront는 CDN이며 스토리지가 아닙니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D) 정답** : Amazon S3는 무한에 가까운 확장성을 가진 객체 스토리지로 사진 저장에 이상적입니다. EBS는 EC2 인스턴스에 연결하여 사용하는 블록 스토리지입니다. 둘 다 영속적 스토리지입니다. → [📖 EBS vs EFS vs Instance Store 비교](/section/05-ec2-instance-storage#ebs-vs-efs-vs-instance-store-비교-시험-핵심)

**핵심 개념:** 영속성 스토리지 — Amazon S3(객체 스토리지) 및 Amazon EBS(블록 스토리지)

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

---

### Q138. You need a persistent and durable storage to trace call activity of an IVR (Interactive Voice Response) system. Call duration is mostly in the 2-3 minutes timeframe. Each traced call can be either active or terminated. An external application needs to know each minute the list of currently active calls, which are usually a few calls/second. But once per month there is a periodic peak up to 1000 calls/second for a few hours. The system is open 24/7 and any downtime should be avoided. Historical data is periodically archived to files. Cost saving is a priority for this project. What database implementation would better fit this scenario, keeping costs as low as possible?

**Options:**
- A) Use RDS Multi-AZ with two tables, one for 'Active calls' and one for 'Terminated calls'. In this way the 'Active calls' table is always small and effective to access.
- B) Use DynamoDB with a 'Calls' table and a Global Secondary Index on a 'IsActive' attribute that is present for active calls only in this way the Global Secondary Index is sparse and more effective.
- C) Use DynamoDB with a 'Calls' table and a Global secondary index on a 'State' attribute that can equal to 'active' or 'terminated' in this way the Global Secondary index can be used for all Items in the table.
- D) Use RDS Multi-AZ with a 'CALLS' table and an Indexed 'STATE' field that can be equal to 'ACTIVE' or 'TERMINATED' in this way the SQL query is optimized by the use of the Index.

**Answer:** A

**해설:**

> **문제:** IVR 시스템의 통화 활동을 추적하기 위한 영속적이고 내구성 있는 스토리지가 필요합니다. 비용 절감을 최우선으로 하면서 월 1회 최대 1000 calls/s 피크를 처리해야 합니다. 가장 적합한 데이터베이스 구현은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | RDS Multi-AZ와 두 테이블(활성 통화, 종료된 통화)을 사용합니다. |
| B | DynamoDB에 Calls 테이블과 활성 통화에만 존재하는 'IsActive' 속성의 희소 GSI를 사용합니다. |
| C | DynamoDB에 Calls 테이블과 'active'/'terminated' 값을 가진 'State' 속성의 GSI를 사용합니다. |
| D | RDS Multi-AZ에 'STATE' 필드 인덱스를 사용합니다. |

**(A) 정답** : 활성 통화와 종료된 통화를 별도 테이블로 분리하면 활성 통화 테이블이 항상 작게 유지되어 효율적인 쿼리가 가능합니다. RDS Multi-AZ로 고가용성도 보장합니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(B)** : DynamoDB의 희소 GSI는 좋은 아이디어이지만 피크 시 용량 계획이 복잡하고 비용이 높을 수 있습니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C)** : 모든 항목을 포함하는 GSI는 종료된 통화도 포함되어 효율성이 낮습니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(D)** : 단일 테이블에 인덱스를 사용하면 종료된 통화가 누적되어 쿼리 효율이 저하됩니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** 활성/종료 데이터 분리 패턴 — 작은 활성 테이블 유지로 쿼리 효율 최적화

**관련 노트:** [Amazon DynamoDB](/section/19-databases#amazon-dynamodb), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q139. If you have chosen Multi-AZ deployment, in the event of a planned or unplanned outage of your primary DB Instance, Amazon RDS automatically switches to the standby replica. The automatic failover mechanism simply changes the [...] record of the main DB Instance to point to the standby DB Instance.

**Options:**
- A) DNAME.
- B) CNAME.
- C) TXT.
- D) MX.

**Answer:** B

**해설:**

> **문제:** Multi-AZ 배포에서 장애 조치 시 Amazon RDS는 자동으로 어떤 DNS 레코드를 변경하여 대기 복제본을 가리키게 합니까?

| 선지 | 번역 |
|------|------|
| A | DNAME 레코드. |
| B | CNAME 레코드. |
| C | TXT 레코드. |
| D | MX 레코드. |

**(A)** : DNAME은 도메인 이름 위임 레코드이며 이 용도로 사용되지 않습니다. → [📖 DNS 레코드 타입](/section/08-route-53#dns-레코드-타입)

**(B) 정답** : RDS Multi-AZ 장애 조치 시 CNAME 레코드를 업데이트하여 기존 엔드포인트가 대기 인스턴스를 가리키도록 합니다. 애플리케이션은 동일한 엔드포인트를 사용하므로 변경이 불필요합니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : TXT 레코드는 텍스트 정보 저장용이며 장애 조치에 사용되지 않습니다. → [📖 DNS 레코드 타입](/section/08-route-53#dns-레코드-타입)

**(D)** : MX 레코드는 이메일 라우팅용입니다. → [📖 DNS 레코드 타입](/section/08-route-53#dns-레코드-타입)

**핵심 개념:** RDS Multi-AZ 장애 조치 — CNAME 레코드 업데이트를 통한 자동 전환 (보통 1~2분 소요)

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [DNS 레코드 타입](/section/08-route-53#dns-레코드-타입)

---

### Q140. All Amazon EC2 instances are assigned two IP addresses at launch. Which are those?

**Options:**
- A) 2 Elastic IP addresses.
- B) A private IP address and an Elastic IP address.
- C) A public IP address and an Elastic IP address.
- D) A private IP address and a public IP address.

**Answer:** D

**해설:**

> **문제:** 모든 Amazon EC2 인스턴스는 시작 시 두 개의 IP 주소가 할당됩니다. 어떤 것들입니까?

| 선지 | 번역 |
|------|------|
| A | 2개의 Elastic IP 주소. |
| B | 프라이빗 IP 주소와 Elastic IP 주소. |
| C | 퍼블릭 IP 주소와 Elastic IP 주소. |
| D | 프라이빗 IP 주소와 퍼블릭 IP 주소. |

**(A)** : Elastic IP는 수동으로 할당해야 하며 기본적으로 2개가 자동 할당되지 않습니다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**(B)** : Elastic IP는 자동 할당되지 않습니다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**(C)** : Elastic IP는 자동 할당되지 않습니다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**(D) 정답** : EC2 인스턴스는 시작 시 프라이빗 IP 주소(항상)와 퍼블릭 IP 주소(퍼블릭 서브넷의 경우)가 자동 할당됩니다. Elastic IP는 별도로 할당해야 합니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**핵심 개념:** EC2 IP 주소 할당 — 프라이빗 IP(항상) + 퍼블릭 IP(퍼블릭 서브넷, 일시적)

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip), [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4), [Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

---

### Q141. You need to pass a custom script to new Amazon Linux instances created in your Auto Scaling group. Which feature allows you to accomplish this?

**Options:**
- A) User data.
- B) EC2Config service.
- C) IAM roles.
- D) AWS Config.

**Answer:** A

**해설:**

> **문제:** Auto Scaling 그룹에서 생성되는 새 Amazon Linux 인스턴스에 사용자 정의 스크립트를 전달해야 합니다. 어떤 기능을 사용합니까?

| 선지 | 번역 |
|------|------|
| A | 사용자 데이터(User data). |
| B | EC2Config 서비스. |
| C | IAM 역할. |
| D | AWS Config. |

**(A) 정답** : EC2 User Data를 사용하면 인스턴스 시작 시 자동으로 실행할 스크립트를 전달할 수 있습니다. Launch Template 또는 Launch Configuration에서 설정합니다. → [📖 EC2 User Data](/section/03-ec2-basics#ec2-user-data)

**(B)** : EC2Config는 Windows 인스턴스 구성 서비스이며 Amazon Linux에는 해당하지 않습니다.

**(C)** : IAM 역할은 권한 부여에 사용되며 스크립트 전달 기능이 아닙니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(D)** : AWS Config는 리소스 구성 변경 추적 서비스입니다. → [📖 AWS Config](/section/22-monitoring-audit-performance#aws-config)

**핵심 개념:** EC2 User Data — 인스턴스 시작 시 자동 실행 스크립트 전달

**관련 노트:** [EC2 User Data](/section/03-ec2-basics#ec2-user-data)

---

### Q142. A customer wants to track access to their Amazon Simple Storage Service (S3) buckets and also use this information for their internal security and access audits. Which of the following will meet the Customer requirement?

**Options:**
- A) Enable AWS CloudTrail to audit all Amazon S3 bucket access.
- B) Enable server access logging for all required Amazon S3 buckets.
- C) Enable the Requester Pays option to track access via AWS Billing.
- D) Enable Amazon S3 event notifications for Put and Post.

**Answer:** A

**해설:**

> **문제:** 고객이 S3 버킷에 대한 액세스를 추적하고 내부 보안 및 액세스 감사에 사용하려 합니다. 요구 사항을 충족하는 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | AWS CloudTrail을 활성화하여 모든 Amazon S3 버킷 액세스를 감사합니다. |
| B | 필요한 모든 Amazon S3 버킷에 대해 서버 액세스 로깅을 활성화합니다. |
| C | Requester Pays 옵션을 활성화하여 AWS 청구를 통해 액세스를 추적합니다. |
| D | Put 및 Post에 대한 Amazon S3 이벤트 알림을 활성화합니다. |

**(A) 정답** : AWS CloudTrail은 S3 API 호출을 포함한 AWS 서비스 호출을 기록하여 보안 감사에 적합한 상세한 정보를 제공합니다. → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(B)** : S3 서버 액세스 로깅도 유효하지만 CloudTrail이 보안 감사에 더 포괄적입니다. → [📖 S3 Access Logs 액세스 로그](/section/12-s3-security#s3-access-logs-액세스-로그)

**(C)** : Requester Pays는 비용 청구 옵션이며 보안 감사용이 아닙니다. → [📖 S3 Requester Pays](/section/11-s3-advanced#s3-requester-pays-요청자-지불)

**(D)** : 이벤트 알림은 특정 작업에 반응하는 기능이며 포괄적 감사 추적을 제공하지 않습니다. → [📖 S3 Event Notifications 이벤트 알림](/section/11-s3-advanced#s3-event-notifications-이벤트-알림)

**핵심 개념:** AWS CloudTrail — S3 API 호출 감사 및 보안 로깅

**관련 노트:** [S3 Event Notifications 이벤트 알림](/section/11-s3-advanced#s3-event-notifications-이벤트-알림), [AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

---

### Q143. Which DNS name can only be resolved within Amazon EC2?

**Options:**
- A) Public DNS name.
- B) Internal DNS name.
- C) External DNS name.
- D) Global DNS name.

**Answer:** B

**해설:**

> **문제:** Amazon EC2 내에서만 확인(resolve)할 수 있는 DNS 이름은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 퍼블릭 DNS 이름. |
| B | 내부 DNS 이름. |
| C | 외부 DNS 이름. |
| D | 글로벌 DNS 이름. |

**(A)** : 퍼블릭 DNS 이름은 인터넷에서도 해석 가능합니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**(B) 정답** : 내부 DNS 이름(예: `ip-10-0-0-1.ec2.internal`)은 Amazon EC2 네트워크 내에서만 해석되며 외부에서는 해석되지 않습니다. → [📖 VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

**(C)** : 외부 DNS 이름은 외부(인터넷)에서도 해석됩니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**(D)** : 글로벌 DNS 이름이라는 개념은 EC2에서 정의되어 있지 않습니다.

**핵심 개념:** EC2 내부 DNS — EC2 내에서만 해석 가능한 프라이빗 DNS 이름

**관련 노트:** [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

---

### Q144. An AWS customer is deploying an application that is composed of an AutoScaling group of EC2 Instances. The customers security policy requires that every outbound connection from these instances to any other service within the customers Virtual Private Cloud must be authenticated using a unique x.509 certificate that contains the specific instance-id. In addition an x.509 certificate must be signed by the customer's Key management service in order to be trusted for authentication. Which of the following configurations will support these requirements?

**Options:**
- A) Configure an IAM Role that grants access to an Amazon S3 object containing a signed certificate and configure the Auto Scaling group to launch instances with this role. Have the instances bootstrap get the certificate from Amazon S3 upon first boot.
- B) Embed a certificate into the Amazon Machine Image that is used by the Auto Scaling group. Have the launched instances generate a certificate signature request with the instance's assigned instance-id to the Key management service for signature.
- C) Configure the Auto Scaling group to send an SNS notification of the launch of a new instance to the trusted key management service. Have the Key management service generate a signed certificate and send it directly to the newly launched instance.
- D) Configure the launched instances to generate a new certificate upon first boot. Have the Key management service poll the AutoScaling group for associated instances and send new instances a certificate signature that contains the specific instance-id.

**Answer:** C

**해설:**

> **문제:** Auto Scaling EC2 인스턴스가 VPC 내 서비스와 통신할 때 인스턴스 ID가 포함된 고유한 x.509 인증서로 인증해야 합니다. 어떤 구성이 이 요구 사항을 지원합니까?

| 선지 | 번역 |
|------|------|
| A | 서명된 인증서가 포함된 S3 객체에 액세스하는 IAM 역할을 구성하고, 첫 부팅 시 S3에서 인증서를 가져옵니다. |
| B | AMI에 인증서를 포함시키고, 인스턴스가 인스턴스 ID로 서명 요청을 KMS에 보냅니다. |
| C | Auto Scaling 그룹이 새 인스턴스 시작 SNS 알림을 KMS에 전송하도록 구성하고, KMS가 서명된 인증서를 새 인스턴스에 직접 전송합니다. |
| D | 인스턴스가 첫 부팅 시 인증서를 생성하고, KMS가 Auto Scaling 그룹을 폴링하여 새 인스턴스에 서명을 보냅니다. |

**(A)** : S3의 단일 인증서는 인스턴스별 고유 인증서 요건을 충족하지 못합니다. → [📖 S3 보안](/section/10-amazon-s3#s3-보안)

**(B)** : AMI에 인증서를 포함하면 모든 인스턴스가 동일한 인증서를 공유하여 고유성 요건을 위반합니다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(C) 정답** : SNS를 통해 새 인스턴스 시작을 KMS에 알리고, KMS가 해당 인스턴스 ID가 포함된 고유 인증서를 생성하여 직접 전달하는 방식이 요구 사항을 충족합니다. → [📖 AWS KMS Key Management Service](/section/24-security-encryption#aws-kms-key-management-service)

**(D)** : KMS가 Auto Scaling 그룹을 폴링하는 방식은 복잡하고 비효율적입니다. → [📖 AWS KMS Key Management Service](/section/24-security-encryption#aws-kms-key-management-service)

**핵심 개념:** 인스턴스별 고유 x.509 인증서 — SNS + KMS를 통한 동적 인증서 발급

**관련 노트:** [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service), [AWS KMS Key Management Service](/section/24-security-encryption#aws-kms-key-management-service)

---

### Q145. A company is storing data on Amazon Simple Storage Service (S3). The company's security policy mandates that data is encrypted at rest. Which of the following methods can achieve this? (Choose 3 answers)

**Options:**
- A) Use Amazon S3 server-side encryption with AWS Key Management Service managed keys.
- B) Use Amazon S3 server-side encryption with customer-provided keys.
- C) Use Amazon S3 server-side encryption with EC2 key pair.
- D) Use Amazon S3 bucket policies to restrict access to the data at rest.
- E) Encrypt the data on the client-side before ingesting to Amazon S3 using their own master key.
- F) Use SSL to encrypt the data while in transit to Amazon S3.

**Answer:** A, B, E

**해설:**

> **문제:** Amazon S3에 저장되는 데이터를 저장 중(at rest) 암호화해야 합니다. 이를 달성할 수 있는 방법은 무엇입니까? (3개 선택)

| 선지 | 번역 |
|------|------|
| A | KMS 관리형 키를 사용한 Amazon S3 서버 측 암호화. |
| B | 고객 제공 키를 사용한 Amazon S3 서버 측 암호화. |
| C | EC2 키 페어를 사용한 Amazon S3 서버 측 암호화. |
| D | Amazon S3 버킷 정책으로 데이터 접근을 제한합니다. |
| E | 고객의 마스터 키로 클라이언트 측에서 데이터를 암호화한 후 S3에 저장합니다. |
| F | SSL을 사용하여 S3로 전송 중인 데이터를 암호화합니다. |

**(A) 정답** : SSE-KMS는 AWS KMS로 관리되는 키를 사용한 서버 측 암호화입니다. → [📖 S3 암호화 방식 비교](/section/12-s3-security#s3-암호화-방식-비교-sses3-ssekms-ssec-clientside)

**(B) 정답** : SSE-C는 고객이 제공한 키를 사용한 서버 측 암호화입니다. → [📖 S3 암호화 방식 비교](/section/12-s3-security#s3-암호화-방식-비교-sses3-ssekms-ssec-clientside)

**(C)** : EC2 키 페어는 SSH 접속용이며 S3 암호화에 사용되지 않습니다.

**(D)** : 버킷 정책은 액세스 제어이며 데이터 암호화가 아닙니다. → [📖 S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy)

**(E) 정답** : 클라이언트 측 암호화(CSE)로 S3에 저장 전 암호화하는 방법도 유효합니다. → [📖 S3 객체 암호화 - 4가지 방법](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**(F)** : SSL은 전송 중(in-transit) 암호화이며 저장 중(at rest) 암호화가 아닙니다. → [📖 Encryption in Transit](/section/12-s3-security#encryption-in-transit-전송-중-암호화)

**핵심 개념:** S3 저장 중 암호화 옵션 — SSE-KMS, SSE-C, 클라이언트 측 암호화(CSE)

**관련 노트:** [핵심 개념](/section/03-ec2-basics#핵심-개념), [S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy), [S3 객체 암호화 - 4가지 방법](/section/12-s3-security#s3-객체-암호화-4가지-방법)

---

### Q146. In Amazon EC2, you are billed instance-hours when [...].

**Options:**
- A) your EC2 instance is in a running state.
- B) the instance exits from Amazon S3 console.
- C) your instance still exits the EC2 console.
- D) EC2 instances stop.

**Answer:** A

**해설:**

> **문제:** Amazon EC2에서 인스턴스 시간이 과금되는 경우는 언제입니까?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스가 실행(running) 상태일 때. |
| B | 인스턴스가 Amazon S3 콘솔에서 종료될 때. |
| C | 인스턴스가 EC2 콘솔에 존재할 때. |
| D | EC2 인스턴스가 중지될 때. |

**(A) 정답** : EC2 인스턴스는 실행(running) 상태일 때 인스턴스 시간이 과금됩니다. 중지(stopped) 상태에서는 인스턴스 요금이 부과되지 않습니다(단, EBS 스토리지 요금은 계속 발생). → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : S3 콘솔과 EC2 과금은 관련 없습니다.

**(C)** : EC2 콘솔에 존재하는 것만으로는 과금되지 않습니다.

**(D)** : 중지(stop) 상태에서는 인스턴스 요금이 발생하지 않습니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** EC2 과금 — 실행(running) 상태에서만 인스턴스 시간 과금

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q147. Which of the below mentioned options is a possible solution to avoid any security threat?

**Options:**
- A) Use the IAM based single sign between the AWS resources and the organization application.
- B) Use the IAM role and assign it to the instance.
- C) Since the application is hosted on EC2, it does not need credentials to access S3.
- D) Use the 509 certificates instead of the access and the secret access keys.

**Answer:** B

**해설:**

> **문제:** 보안 위협을 방지하기 위한 가능한 해결책은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | AWS 리소스와 조직 애플리케이션 사이에 IAM 기반 싱글 사인온을 사용합니다. |
| B | IAM 역할을 사용하여 인스턴스에 할당합니다. |
| C | 애플리케이션이 EC2에 호스팅되므로 S3에 액세스하기 위한 자격 증명이 필요하지 않습니다. |
| D | 액세스 키 및 시크릿 액세스 키 대신 x.509 인증서를 사용합니다. |

**(A)** : IAM SSO는 사용자 인증에 관한 것이며 인스턴스 자격 증명 보안과는 다른 접근입니다. → [📖 AWS IAM Identity Center](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**(B) 정답** : EC2 인스턴스에 IAM 역할을 할당하면 애플리케이션이 장기 자격 증명 없이 임시 자격 증명을 자동으로 획득하여 S3 등의 서비스에 안전하게 접근할 수 있습니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(C)** : EC2에 호스팅되더라도 자격 증명(IAM 역할 통해)은 필요합니다.

**(D)** : x.509 인증서는 특수 목적에 사용되며 일반적인 S3 접근 보안 방법이 아닙니다.

**핵심 개념:** EC2 IAM 역할 — 장기 자격 증명 없이 임시 자격 증명을 통한 안전한 서비스 접근

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [AWS 접근 방법](/section/02-iam#aws-접근-방법)

---

### Q148. In Amazon EC2 Container Service components, what is the name of a logical grouping of container instances on which you can place tasks?

**Options:**
- A) A cluster.
- B) A container instance.
- C) A container.
- D) A task definition.

**Answer:** A

**해설:**

> **문제:** Amazon EC2 Container Service(ECS) 구성 요소에서 태스크를 배치할 수 있는 컨테이너 인스턴스의 논리적 그룹 이름은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 클러스터(Cluster). |
| B | 컨테이너 인스턴스(Container instance). |
| C | 컨테이너(Container). |
| D | 태스크 정의(Task definition). |

**(A) 정답** : ECS 클러스터는 태스크나 서비스를 실행하는 컨테이너 인스턴스(EC2) 또는 Fargate 용량의 논리적 그룹입니다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(B)** : 컨테이너 인스턴스는 개별 EC2 인스턴스로, 클러스터의 구성 요소입니다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(C)** : 컨테이너는 Docker 컨테이너로, 태스크 내에서 실행됩니다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(D)** : 태스크 정의는 컨테이너 실행 방법을 정의하는 블루프린트입니다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**핵심 개념:** ECS 클러스터 — 컨테이너 인스턴스의 논리적 그룹, 태스크/서비스 실행 단위

**관련 노트:** [Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

---

### Q149. You are looking to migrate your Development (Dev) and Test environments to AWS. You have decided to use separate AWS accounts to host each environment. You plan to link each account's bill to a Master AWS account using Consolidated Billing. To make sure you keep within budget you would like to implement a way for administrators in the Master account to have access to stop, delete and/or terminate resources in both the Dev and Test accounts. Identify which option will allow you to achieve this goal.

**Options:**
- A) Create IAM users in the Master account with full Admin permissions. Create cross-account roles in the Dev and Test accounts that grant the Master account access to the resources in the account by inheriting permissions from the Master account.
- B) Create IAM users and a cross-account role in the Master account that grants full Admin permissions to the Dev and Test accounts.
- C) Create IAM users in the Master account. Create cross-account roles in the Dev and Test accounts that have full Admin permissions and grant the Master account access.
- D) Link the accounts using Consolidated Billing. This will give IAM users in the Master account access to resources in the Dev and Test accounts.

**Answer:** C

**해설:**

> **문제:** 마스터 계정의 관리자가 Dev 및 Test 계정의 리소스를 중지/삭제/종료할 수 있도록 하려면 어떤 옵션을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 마스터 계정에 IAM 사용자를 생성하고, Dev/Test 계정에 마스터 계정 권한을 상속하는 교차 계정 역할을 생성합니다. |
| B | 마스터 계정에 IAM 사용자와 Dev/Test 계정에 전체 관리자 권한을 부여하는 교차 계정 역할을 생성합니다. |
| C | 마스터 계정에 IAM 사용자를 생성하고, Dev/Test 계정에 전체 관리자 권한을 가진 교차 계정 역할을 생성하여 마스터 계정 액세스를 허용합니다. |
| D | Consolidated Billing으로 계정을 연결합니다. 이를 통해 마스터 계정 IAM 사용자가 Dev/Test 계정 리소스에 액세스할 수 있습니다. |

**(A)** : 권한 상속이 아니라 역할 수임(AssumeRole)을 통해 접근해야 합니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(B)** : 교차 계정 역할은 자식 계정에 생성해야 합니다. → [📖 IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

**(C) 정답** : 마스터 계정에 IAM 사용자를 생성하고, 자식 계정(Dev/Test)에 마스터 계정이 수임할 수 있는 교차 계정 IAM 역할을 생성하는 것이 올바른 접근 방식입니다. → [📖 IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

**(D)** : Consolidated Billing은 비용 통합만 제공하며 리소스 액세스 권한을 부여하지 않습니다. → [📖 AWS Organizations](/section/23-advanced-identity#aws-organizations)

**핵심 개념:** 교차 계정 IAM 역할 — 자식 계정에 역할 생성 후 부모 계정이 AssumeRole로 접근

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

---

### Q150. What will be the status of the snapshot until the snapshot is complete?

**Options:**
- A) Running.
- B) Working.
- C) Progressing.
- D) Pending.

**Answer:** D

**해설:**

> **문제:** 스냅샷이 완료될 때까지 스냅샷의 상태는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 실행 중(Running). |
| B | 작업 중(Working). |
| C | 진행 중(Progressing). |
| D | 대기 중(Pending). |

**(A)** : "Running"은 EBS 스냅샷의 상태가 아닙니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : "Working"은 EBS 스냅샷의 상태가 아닙니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(C)** : "Progressing"은 EBS 스냅샷의 상태가 아닙니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(D) 정답** : EBS 스냅샷이 생성 중일 때의 상태는 "Pending"입니다. 완료되면 "Completed" 상태가 됩니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** EBS 스냅샷 상태 — Pending(진행 중) → Completed(완료)

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

---
