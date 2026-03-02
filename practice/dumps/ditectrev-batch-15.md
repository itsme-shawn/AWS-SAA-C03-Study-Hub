# Ditectrev SAA-C03 Practice Questions — Batch 15 (Q701-Q709)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q701. A company uses Amazon RDS for PostgreSQL databases for its data tier. The company must implement password rotation for the databases. Which solution meets this requirement with the LEAST operational overhead?

**Options:**
- A) Store the password in AWS Secrets Manager. Enable automatic rotation on the secret.
- B) Store the password in AWS Systems Manager Parameter Store. Enable automatic rotation on the parameter.
- C) Store the password in AWS Systems Manager Parameter Store. Write an AWS Lambda function that rotates the password.
- D) Store the password in AWS Key Management Service (AWS KMS). Enable automatic rotation on the customer master key (CMK).

**Answer:** A

**해설:**

> **문제:** 회사가 데이터 계층에 Amazon RDS for PostgreSQL 데이터베이스를 사용합니다. 회사는 데이터베이스에 대한 패스워드 교체를 구현해야 합니다. 운영 오버헤드가 가장 적은 솔루션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | AWS Secrets Manager에 패스워드를 저장합니다. 시크릿에 자동 교체를 활성화합니다. |
| B | AWS Systems Manager Parameter Store에 패스워드를 저장합니다. 파라미터에 자동 교체를 활성화합니다. |
| C | AWS Systems Manager Parameter Store에 패스워드를 저장합니다. 패스워드를 교체하는 AWS Lambda 함수를 작성합니다. |
| D | AWS Key Management Service(AWS KMS)에 패스워드를 저장합니다. 고객 마스터 키(CMK)에 자동 교체를 활성화합니다. |

**(A) 정답** : AWS Secrets Manager는 RDS 데이터베이스와의 통합을 기본 제공하며, 자동 교체 기능을 활성화하면 추가 코드 없이 패스워드를 자동으로 교체해줍니다. 운영 오버헤드가 가장 적습니다. → [📖 AWS Secrets Manager — RDS 통합 자동 패스워드 교체](/section/24-security-encryption#aws-secrets-manager)

**(B)** : Systems Manager Parameter Store는 자동 교체 기능을 기본으로 제공하지 않습니다. RDS 통합 자동 교체는 Secrets Manager의 전용 기능입니다. → [📖 SSM Parameter Store — 자동 교체 기본 미제공](/section/24-security-encryption#ssm-parameter-store)

**(C)** : Lambda 함수를 직접 작성해 교체 로직을 구현해야 하므로 운영 오버헤드가 높습니다.

**(D)** : KMS CMK의 자동 교체는 암호화 키 자체를 교체하는 기능으로, 데이터베이스 패스워드 교체와는 무관합니다. → [📖 KMS CMK 자동 교체 — 암호화 키 교체, DB 패스워드 무관](/section/24-security-encryption#aws-kms-key-management-service)

**핵심 개념:** AWS Secrets Manager의 RDS 통합 자동 패스워드 교체 기능

**관련 노트:** [AWS Secrets Manager](/section/24-security-encryption#aws-secrets-manager), [SSM Parameter Store vs Secrets Manager 비교](/section/24-security-encryption#ssm-parameter-store-vs-secrets-manager-비교)

---

### Q702. A company runs its application on Oracle Database Enterprise Edition. The company needs to migrate the application and the database to AWS. The company can use the Bring Your Own License (BYOL) model while migrating to AWS. The application uses third-party database features that require privileged access. A solutions architect must design a solution for the database migration. Which solution will meet these requirements MOST cost-effectively?

**Options:**
- A) Migrate the database to Amazon RDS for Oracle by using native tools. Replace the third-party features with AWS Lambda.
- B) Migrate the database to Amazon RDS Custom for Oracle by using native tools. Customize the new database settings to support the third-party features.
- C) Migrate the database to Amazon DynamoDB by using AWS Database Migration Service (AWS DMS). Customize the new database settings to support the third-party features.
- D) Migrate the database to Amazon RDS for PostgreSQL by using AWS Database Migration Service (AWS DMS). Rewrite the application code to remove the dependency on third-party features.

**Answer:** B

**해설:**

> **문제:** 회사가 Oracle Database Enterprise Edition에서 애플리케이션을 실행합니다. 회사는 BYOL 모델을 사용하면서 AWS로 마이그레이션해야 합니다. 애플리케이션은 특권 접근이 필요한 서드파티 데이터베이스 기능을 사용합니다. 가장 비용 효율적인 솔루션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 네이티브 도구를 사용해 Amazon RDS for Oracle로 마이그레이션합니다. 서드파티 기능을 AWS Lambda로 대체합니다. |
| B | 네이티브 도구를 사용해 Amazon RDS Custom for Oracle로 마이그레이션합니다. 서드파티 기능을 지원하도록 새 데이터베이스 설정을 커스터마이징합니다. |
| C | AWS DMS를 사용해 Amazon DynamoDB로 마이그레이션합니다. 서드파티 기능을 지원하도록 새 데이터베이스 설정을 커스터마이징합니다. |
| D | AWS DMS를 사용해 Amazon RDS for PostgreSQL로 마이그레이션합니다. 서드파티 기능 의존성을 제거하도록 애플리케이션 코드를 재작성합니다. |

**(A)** : 표준 RDS for Oracle은 OS 및 데이터베이스 엔진에 대한 특권 접근을 허용하지 않으므로, 서드파티 기능을 지원할 수 없습니다. → [📖 RDS for Oracle — OS/DB 특권 접근 불허](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B) 정답** : RDS Custom for Oracle은 OS 및 데이터베이스 엔진에 대한 특권 접근을 허용하므로 서드파티 기능을 유지할 수 있습니다. BYOL 모델도 지원하여 비용 효율적입니다. → [📖 RDS Custom for Oracle — OS/DB 특권 접근 허용, BYOL](/section/07-rds-aurora-elasticache#rds-custom)

**(C)** : DynamoDB는 관계형 데이터베이스가 아닌 NoSQL 서비스로, Oracle 기능과 호환되지 않으며 마이그레이션이 불가능합니다. → [📖 DynamoDB — NoSQL, Oracle 호환 불가](/section/17-serverless-overview#amazon-dynamodb)

**(D)** : 애플리케이션 코드 재작성은 높은 비용과 시간이 필요하며, 서드파티 기능 제거는 요구사항에 맞지 않습니다.

**핵심 개념:** Amazon RDS Custom for Oracle — OS 및 데이터베이스 엔진 커스터마이징, BYOL 지원

**관련 노트:** [RDS Custom](/section/07-rds-aurora-elasticache#rds-custom), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q703. A company has deployed a multi-account strategy on AWS by using AWS Control Tower. The company has provided individual AWS accounts to each of its developers. The company wants to implement controls to limit AWS resource costs that the developers incur. Which solution will meet these requirements with the LEAST operational overhead?

**Options:**
- A) Instruct each developer to tag all their resources with a tag that has a key of CostCenter and a value of the developer's name. Use the required-tags AWS Config managed rule to check for the tag. Create an AWS Lambda function to terminate resources that do not have the tag. Configure AWS Cost Explorer to send a daily report to each developer to monitor their spending.
- B) Use AWS Budgets to establish budgets for each developer account. Set up budget alerts for actual and forecast values to notify developers when they exceed or expect to exceed their assigned budget. Use AWS Budgets actions to apply a DenyAll policy to the developer's IAM role to prevent additional resources from being launched when the assigned budget is reached.
- C) Use AWS Cost Explorer to monitor and report on costs for each developer account. Configure Cost Explorer to send a daily report to each developer to monitor their spending. Use AWS Cost Anomaly Detection to detect anomalous spending and provide alerts.
- D) Use AWS Service Catalog to allow developers to launch resources within a limited cost range. Create AWS Lambda functions in each AWS account to stop running resources at the end of each work day. Configure the Lambda functions to resume the resources at the start of each work day.

**Answer:** B

**해설:**

> **문제:** 회사가 AWS Control Tower를 사용해 멀티 계정 전략을 배포했습니다. 개발자별로 AWS 계정이 제공되어 있고, 비용을 제한하는 통제 수단을 구현하려 합니다. 운영 오버헤드가 가장 적은 솔루션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 모든 개발자가 CostCenter 태그를 리소스에 붙이도록 지시합니다. AWS Config 관리 규칙으로 태그를 확인하고, Lambda 함수로 태그 없는 리소스를 종료합니다. Cost Explorer로 일일 보고서를 전송합니다. |
| B | AWS Budgets로 각 개발자 계정에 예산을 설정합니다. 예산 초과 시 알림을 발송하고, AWS Budgets 액션으로 DenyAll 정책을 적용해 추가 리소스 생성을 차단합니다. |
| C | AWS Cost Explorer로 비용을 모니터링하고 일일 보고서를 전송합니다. Cost Anomaly Detection으로 비정상 지출을 감지하고 알림을 제공합니다. |
| D | AWS Service Catalog로 제한된 비용 범위 내에서 리소스를 실행하도록 허용합니다. 각 계정에 Lambda 함수를 생성해 업무 종료 시 리소스를 중지하고 시작 시 재개합니다. |

**(A)** : Lambda 함수 작성, Config 규칙 설정, 태그 적용 교육 등 여러 구성 요소가 필요해 운영 오버헤드가 높습니다.

**(B) 정답** : AWS Budgets는 예산 설정, 알림, 자동 액션(DenyAll 정책 적용)을 통합 제공하여 최소한의 설정으로 비용 초과를 실질적으로 차단할 수 있습니다. 운영 오버헤드가 가장 적습니다. → [📖 AWS Budgets — 예산 알림 및 자동 액션(DenyAll)](/section/28-other-services#cost-explorer)

**(C)** : 비용을 모니터링하고 알림을 보낼 뿐, 실제로 비용 초과를 방지하는 기능이 없습니다.

**(D)** : 계정마다 Lambda 함수를 생성하고 관리해야 하므로 운영 오버헤드가 매우 높습니다.

**핵심 개념:** AWS Budgets 액션 — 예산 초과 시 IAM 정책 자동 적용으로 리소스 생성 차단

**관련 노트:** [AWS Control Tower](/section/23-advanced-identity#aws-control-tower), [AWS Config](/section/22-monitoring-audit-performance#aws-config)

---

### Q704. A solutions architect is designing an application that will allow business users to upload objects to Amazon S3. The solution needs to maximize object durability. Objects also must be readily available at any time and for any length of time. Users will access objects frequently within the first 30 days after the objects are uploaded, but users are much less likely to access objects that are older than 30 days. Which solution meets these requirements MOST cost-effectively?

**Options:**
- A) Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 Glacier after 30 days.
- B) Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days.
- C) Store all the objects in S3 Standard with an S3 Lifecycle rule to transition the objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days.
- D) Store all the objects in S3 Intelligent-Tiering with an S3 Lifecycle rule to transition the objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days.

**Answer:** B

**해설:**

> **문제:** 솔루션 아키텍트가 비즈니스 사용자가 Amazon S3에 객체를 업로드할 수 있는 애플리케이션을 설계하고 있습니다. 객체 내구성을 최대화해야 하고, 언제든지 즉시 접근 가능해야 합니다. 업로드 후 30일 이내에는 자주 접근하지만, 30일 이후에는 접근 빈도가 낮습니다. 가장 비용 효율적인 솔루션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | S3 Standard에 저장 후 30일 뒤 S3 Glacier로 전환하는 수명 주기 규칙을 설정합니다. |
| B | S3 Standard에 저장 후 30일 뒤 S3 Standard-IA로 전환하는 수명 주기 규칙을 설정합니다. |
| C | S3 Standard에 저장 후 30일 뒤 S3 One Zone-IA로 전환하는 수명 주기 규칙을 설정합니다. |
| D | S3 Intelligent-Tiering에 저장 후 30일 뒤 S3 Standard-IA로 전환하는 수명 주기 규칙을 설정합니다. |

**(A)** : S3 Glacier는 즉시 접근이 불가능하며(복원 시간 필요), "언제든지 즉시 접근 가능" 요구사항을 충족하지 못합니다. → [📖 S3 Glacier — 즉시 접근 불가, 복원 시간 필요](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B) 정답** : S3 Standard는 높은 내구성(99.999999999%)과 즉시 접근성을 제공하며, 30일 후 Standard-IA로 전환하면 내구성 유지 및 비용 절감이 가능합니다. Standard-IA도 즉시 접근이 가능합니다. → [📖 S3 Standard → Standard-IA 수명주기 전환](/section/11-s3-advanced#s3-lifecycle-rules-수명주기-규칙)

**(C)** : S3 One Zone-IA는 단일 가용 영역에만 저장되므로 최대 내구성 요구사항을 충족하지 못합니다. 가용 영역 장애 시 데이터 손실 위험이 있습니다. → [📖 S3 One Zone-IA — 단일 AZ, 최대 내구성 미충족](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : Intelligent-Tiering은 접근 패턴을 모니터링하는 추가 비용이 발생하며, 이미 30일 기준으로 접근 패턴이 명확하므로 불필요한 복잡성이 추가됩니다. → [📖 S3 Intelligent-Tiering — 접근 패턴 모니터링 추가 비용](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** S3 스토리지 클래스 — Standard vs Standard-IA vs One Zone-IA vs Glacier의 내구성과 가용성 비교, S3 수명 주기 규칙

**관련 노트:** [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스), [S3 Lifecycle Rules 수명주기 규칙](/section/11-s3-advanced#s3-lifecycle-rules-수명주기-규칙), [스토리지 클래스 비교표](/section/10-amazon-s3#스토리지-클래스-비교표)

---

### Q705. A solutions architect is designing a three-tier web application. The architecture consists of an internet-facing Application Load Balancer (ALB) and a web tier that is hosted on Amazon EC2 instances in private subnets. The application tier with the business logic runs on EC2 instances in private subnets. The database tier consists of Microsoft SQL Server that runs on EC2 instances in private subnets. Security is a high priority for the company. Which combination of security group configurations should the solutions architect use? (Choose three.)

**Options:**
- A) Configure the security group for the web tier to allow inbound HTTPS traffic from the security group for the ALB.
- B) Configure the security group for the web tier to allow outbound HTTPS traffic to 0.0.0.0/0.
- C) Configure the security group for the database tier to allow inbound Microsoft SQL Server traffic from the security group for the application tier.
- D) Configure the security group for the database tier to allow outbound HTTPS traffic and Microsoft SQL Server trac to the security group for the web tier.
- E) Configure the security group for the application tier to allow inbound HTTPS traffic from the security group for the web tier.

**Answer:** A, C, E

**해설:**

> **문제:** 솔루션 아키텍트가 3계층 웹 애플리케이션을 설계하고 있습니다. 아키텍처는 인터넷 facing ALB, 프라이빗 서브넷의 웹 계층 EC2, 프라이빗 서브넷의 애플리케이션 계층 EC2, 프라이빗 서브넷의 Microsoft SQL Server EC2로 구성됩니다. 보안이 최우선입니다. 어떤 보안 그룹 조합을 사용해야 합니까? (3개 선택)

| 선지 | 번역 |
|------|------|
| A | 웹 계층 보안 그룹이 ALB 보안 그룹의 인바운드 HTTPS 트래픽을 허용하도록 구성합니다. |
| B | 웹 계층 보안 그룹이 0.0.0.0/0으로의 아웃바운드 HTTPS 트래픽을 허용하도록 구성합니다. |
| C | 데이터베이스 계층 보안 그룹이 애플리케이션 계층 보안 그룹의 인바운드 SQL Server 트래픽을 허용하도록 구성합니다. |
| D | 데이터베이스 계층 보안 그룹이 웹 계층 보안 그룹으로의 아웃바운드 HTTPS 및 SQL Server 트래픽을 허용하도록 구성합니다. |
| E | 애플리케이션 계층 보안 그룹이 웹 계층 보안 그룹의 인바운드 HTTPS 트래픽을 허용하도록 구성합니다. |

**(A) 정답** : 웹 계층은 ALB로부터만 트래픽을 수신해야 합니다. ALB 보안 그룹을 소스로 지정하면 최소 권한 원칙을 준수합니다. → [📖 웹 계층 보안 그룹 — ALB 소스 지정, 최소 권한](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 0.0.0.0/0으로의 아웃바운드 허용은 불필요하게 넓은 범위이며 보안 우선 원칙에 위배됩니다. 웹 계층에서 나가는 트래픽은 애플리케이션 계층으로만 허용해야 합니다.

**(C) 정답** : 데이터베이스 계층은 애플리케이션 계층으로부터만 SQL Server 트래픽(포트 1433)을 수신해야 합니다. 최소 권한 원칙을 준수합니다. → [📖 DB 계층 보안 그룹 — 애플리케이션 계층 소스, 포트 1433](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 데이터베이스 계층에서 웹 계층으로의 아웃바운드는 불필요하며 보안 위험을 초래합니다. 데이터베이스는 응답만 반환하면 됩니다. → [📖 DB 아웃바운드 — 웹 계층으로 불필요, 보안 위험](/section/03-ec2-basics#security-groups-보안-그룹)

**(E) 정답** : 애플리케이션 계층은 웹 계층으로부터만 HTTPS 트래픽을 수신해야 합니다. 웹 계층 보안 그룹을 소스로 지정하면 최소 권한 원칙을 준수합니다. → [📖 애플리케이션 계층 보안 그룹 — 웹 계층 소스 지정](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** 3계층 아키텍처의 보안 그룹 최소 권한 원칙 — 각 계층은 인접 계층의 보안 그룹만 소스/대상으로 허용

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q706. A company has released a new version of its production application. The company's workload uses Amazon EC2, AWS Lambda, AWS Fargate, and Amazon SageMaker. The company wants to cost optimize the workload now that usage is at a steady state. The company wants to cover the most services with the fewest savings plans. Which combination of savings plans will meet these requirements? (Choose two.)

**Options:**
- A) Purchase an EC2 Instance Savings Plan for Amazon EC2 and SageMaker.
- B) Purchase a Compute Savings Plan for Amazon EC2, Lambda, and SageMaker.
- C) Purchase a SageMaker Savings Plan.
- D) Purchase a Compute Savings Plan for Lambda, Fargate, and Amazon EC2.
- E) Purchase an EC2 Instance Savings Plan for Amazon EC2 and Fargate.

**Answer:** C, D

**해설:**

> **문제:** 회사가 새 버전의 프로덕션 애플리케이션을 출시했습니다. 워크로드는 EC2, Lambda, Fargate, SageMaker를 사용합니다. 사용량이 안정된 상태에서 비용을 최적화하려 합니다. 가장 적은 절감 계획으로 가장 많은 서비스를 커버하려면 어떤 조합이 필요합니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | EC2 Instance Savings Plan을 EC2 및 SageMaker에 구매합니다. |
| B | Compute Savings Plan을 EC2, Lambda, SageMaker에 구매합니다. |
| C | SageMaker Savings Plan을 구매합니다. |
| D | Compute Savings Plan을 Lambda, Fargate, EC2에 구매합니다. |
| E | EC2 Instance Savings Plan을 EC2 및 Fargate에 구매합니다. |

**(A)** : EC2 Instance Savings Plan은 SageMaker를 커버하지 않습니다. EC2 전용 절감 계획입니다. → [📖 EC2 Instance Savings Plan — EC2 전용, SageMaker 미커버](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : Compute Savings Plan은 SageMaker를 커버하지 않습니다. EC2, Lambda, Fargate만 커버합니다. → [📖 Compute Savings Plan — EC2/Lambda/Fargate 커버, SageMaker 미커버](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C) 정답** : SageMaker Savings Plan은 SageMaker 전용 절감 계획으로, Compute Savings Plan이 커버하지 못하는 SageMaker를 처리합니다.

**(D) 정답** : Compute Savings Plan은 EC2, Lambda, Fargate를 모두 커버하므로 3개 서비스를 하나의 계획으로 처리할 수 있습니다. 가장 넓은 커버리지를 제공합니다. → [📖 Compute Savings Plan — EC2 + Lambda + Fargate 통합 커버](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(E)** : EC2 Instance Savings Plan은 Fargate를 커버하지 않습니다. Fargate는 Compute Savings Plan에서만 커버됩니다. → [📖 EC2 Instance Savings Plan — Fargate 미커버](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** AWS Savings Plans 종류 — Compute Savings Plan(EC2+Lambda+Fargate), EC2 Instance Savings Plan(EC2 전용), SageMaker Savings Plan(SageMaker 전용)

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q707. A company uses a Microsoft SQL Server database. The company's applications are connected to the database. The company wants to migrate to an Amazon Aurora PostgreSQL database with minimal changes to the application code. Which combination of steps will meet these requirements? (Choose two.)

**Options:**
- A) Use the AWS Schema Conversion Tool (AWS SCT) to rewrite the SQL queries in the applications.
- B) Enable Babelfish on Aurora PostgreSQL to run the SQL queries from the applications.
- C) Migrate the database schema and data by using the AWS Schema Conversion Tool (AWS SCT) and AWS Database Migration Service (AWS DMS).
- D) Use Amazon RDS Proxy to connect the applications to Aurora PostgreSQL.
- E) Use AWS Database Migration Service (AWS DMS) to rewrite the SQL queries in the applications.

**Answer:** B, C

**해설:**

> **문제:** 회사가 Microsoft SQL Server 데이터베이스를 사용합니다. 애플리케이션 코드 변경을 최소화하면서 Amazon Aurora PostgreSQL로 마이그레이션하려 합니다. 어떤 단계의 조합이 요구사항을 충족합니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | AWS SCT를 사용해 애플리케이션의 SQL 쿼리를 재작성합니다. |
| B | Aurora PostgreSQL에서 Babelfish를 활성화하여 애플리케이션의 SQL 쿼리를 실행합니다. |
| C | AWS SCT와 AWS DMS를 사용해 데이터베이스 스키마와 데이터를 마이그레이션합니다. |
| D | Amazon RDS Proxy를 사용해 애플리케이션을 Aurora PostgreSQL에 연결합니다. |
| E | AWS DMS를 사용해 애플리케이션의 SQL 쿼리를 재작성합니다. |

**(A)** : SCT는 스키마 변환 도구로 애플리케이션 코드 내 SQL 쿼리를 재작성하지 않습니다. 애플리케이션 코드 변경을 최소화해야 하는 요구사항에도 맞지 않습니다. → [📖 AWS SCT — 스키마 변환, 애플리케이션 코드 미변경](/section/26-disaster-recovery-migrations#aws-schema-conversion-tool-sct)

**(B) 정답** : Babelfish for Aurora PostgreSQL은 SQL Server의 T-SQL 방언을 이해하므로, 애플리케이션 코드를 거의 변경하지 않고도 기존 SQL Server 쿼리를 실행할 수 있습니다. → [📖 Babelfish for Aurora PostgreSQL — T-SQL 호환, 코드 변경 최소](/section/07-rds-aurora-elasticache#babelfish-for-aurora-postgresql)

**(C) 정답** : AWS SCT와 DMS를 함께 사용하면 SQL Server의 스키마를 PostgreSQL 호환 형식으로 변환하고, 데이터를 Aurora PostgreSQL로 마이그레이션할 수 있습니다. → [📖 DMS — 데이터 마이그레이션](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**(D)** : RDS Proxy는 데이터베이스 연결 풀링을 위한 서비스로, 마이그레이션 자체와는 직접적인 관련이 없습니다. → [📖 RDS Proxy — 연결 풀링, 마이그레이션 무관](/section/07-rds-aurora-elasticache#amazon-rds-proxy)

**(E)** : DMS는 데이터 마이그레이션 서비스로, 애플리케이션의 SQL 쿼리를 재작성하는 기능을 제공하지 않습니다. → [📖 DMS — SQL 쿼리 재작성 기능 없음](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**핵심 개념:** Babelfish for Aurora PostgreSQL — SQL Server T-SQL 호환성 제공으로 애플리케이션 코드 변경 최소화, AWS SCT + DMS 조합의 데이터베이스 마이그레이션

**관련 노트:** [Babelfish for Aurora PostgreSQL](/section/07-rds-aurora-elasticache#babelfish-for-aurora-postgresql), [DMS Database Migration Service, 데이터베이스 마이그레이션 서비스](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스), [AWS Schema Conversion Tool SCT](/section/26-disaster-recovery-migrations#aws-schema-conversion-tool-sct)

---

### Q708. A company plans to rehost an application to Amazon EC2 instances that use Amazon Elastic Block Store (Amazon EBS) as the attached storage. A solutions architect must design a solution to ensure that all newly created Amazon EBS volumes are encrypted by default. The solution must also prevent the creation of unencrypted EBS volumes. Which solution will meet these requirements?

**Options:**
- A) Configure the EC2 account attributes to always encrypt new EBS volumes.
- B) Use AWS Config. Configure the encrypted-volumes identifier. Apply the default AWS Key Management Service (AWS KMS) key.
- C) Configure AWS Systems Manager to create encrypted copies of the EBS volumes. Reconfigure the EC2 instances to use the encrypted volumes.
- D) Create a customer managed key in AWS Key Management Service (AWS KMS). Configure AWS Migration Hub to use the key when the company migrates workloads.

**Answer:** B

**해설:**

> **문제:** 회사가 Amazon EC2 인스턴스(EBS 스토리지)로 애플리케이션을 리호스팅할 계획입니다. 모든 새로 생성되는 EBS 볼륨이 기본적으로 암호화되도록 하고, 암호화되지 않은 EBS 볼륨 생성을 방지해야 합니다. 어떤 솔루션이 요구사항을 충족합니까?

| 선지 | 번역 |
|------|------|
| A | 새 EBS 볼륨을 항상 암호화하도록 EC2 계정 속성을 구성합니다. |
| B | AWS Config를 사용하고 encrypted-volumes 식별자를 구성합니다. 기본 AWS KMS 키를 적용합니다. |
| C | AWS Systems Manager를 구성해 EBS 볼륨의 암호화된 복사본을 생성합니다. EC2 인스턴스가 암호화된 볼륨을 사용하도록 재구성합니다. |
| D | AWS KMS에서 고객 관리형 키를 생성합니다. AWS Migration Hub가 마이그레이션 시 해당 키를 사용하도록 구성합니다. |

**(A)** : EC2 계정 수준의 "EBS 암호화 기본값" 설정은 실제로 존재하며 효과적이지만, 이 설정만으로는 암호화되지 않은 볼륨 생성을 완전히 방지할 수 없고 정책적 강제가 어렵습니다.

**(B) 정답** : AWS Config의 `encrypted-volumes` 규칙을 사용하면 암호화되지 않은 EBS 볼륨을 감지하고, Config 교정 액션을 통해 암호화를 강제할 수 있습니다. 기본 KMS 키 적용으로 기본 암호화도 보장됩니다. → [📖 AWS Config encrypted-volumes 규칙 — EBS 암호화 감지 및 강제](/section/22-monitoring-audit-performance#aws-config)

**(C)** : Systems Manager는 EBS 볼륨 암호화 기본값 설정이나 생성 방지를 직접 수행하지 않습니다. 사후 대응적 접근으로 요구사항을 완전히 충족하지 못합니다.

**(D)** : AWS Migration Hub는 마이그레이션 추적 서비스로, EBS 볼륨 암호화 정책 적용과는 무관합니다. → [📖 AWS Migration Hub — 마이그레이션 추적, 암호화 정책 무관](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**핵심 개념:** AWS Config `encrypted-volumes` 규칙 — EBS 볼륨 암호화 정책 강제 및 비준수 리소스 감지

**관련 노트:** [EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption), [AWS Config](/section/22-monitoring-audit-performance#aws-config), [AWS KMS Key Management Service](/section/24-security-encryption#aws-kms-key-management-service)

---

### Q709. An ecommerce company wants to collect user clickstream data from the company's website for real-time analysis. The website experiences fluctuating traffic patterns throughout the day. The company needs a scalable solution that can adapt to varying levels of traffic. Which solution will meet these requirements?

**Options:**
- A) Use a data stream in Amazon Kinesis Data Streams in on-demand mode to capture the clickstream data. Use AWS Lambda to process the data in real time.
- B) Use Amazon Kinesis Data Firehose to capture the clickstream data. Use AWS Glue to process the data in real time.
- C) Use Amazon Kinesis Video Streams to capture the clickstream data. Use AWS Glue to process the data in real time.
- D) Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to capture the clickstream data. Use AWS Lambda to process the data in real time.

**Answer:** A

**해설:**

> **문제:** 이커머스 회사가 실시간 분석을 위해 웹사이트의 사용자 클릭스트림 데이터를 수집하려 합니다. 웹사이트는 하루 동안 변동하는 트래픽 패턴을 경험합니다. 다양한 트래픽 수준에 적응할 수 있는 확장 가능한 솔루션이 필요합니다. 어떤 솔루션이 요구사항을 충족합니까?

| 선지 | 번역 |
|------|------|
| A | Amazon Kinesis Data Streams의 온디맨드 모드 데이터 스트림을 사용해 클릭스트림 데이터를 캡처합니다. AWS Lambda를 사용해 데이터를 실시간으로 처리합니다. |
| B | Amazon Kinesis Data Firehose를 사용해 클릭스트림 데이터를 캡처합니다. AWS Glue를 사용해 데이터를 실시간으로 처리합니다. |
| C | Amazon Kinesis Video Streams를 사용해 클릭스트림 데이터를 캡처합니다. AWS Glue를 사용해 데이터를 실시간으로 처리합니다. |
| D | Amazon Managed Service for Apache Flink를 사용해 클릭스트림 데이터를 캡처합니다. AWS Lambda를 사용해 데이터를 실시간으로 처리합니다. |

**(A) 정답** : Kinesis Data Streams의 온디맨드 모드는 트래픽 변동에 자동으로 확장/축소되므로 별도의 샤드 관리가 불필요합니다. Lambda와 함께 사용하면 실시간 처리가 가능합니다. → [📖 Kinesis Data Streams 온디맨드 모드 + Lambda — 실시간 처리](/section/15-integration-messaging#amazon-kinesis-data-streams)

**(B)** : Kinesis Data Firehose는 데이터를 S3, Redshift 등으로 전달하는 서비스로, 실시간 처리가 아닌 근실시간(near-real-time) 전달에 적합합니다. Glue도 실시간 스트리밍 처리보다는 배치 ETL에 적합합니다. → [📖 Kinesis Data Firehose — 근실시간 전달, 배치 ETL](/section/15-integration-messaging#amazon-data-firehose-구-kinesis-data-firehose)

**(C)** : Kinesis Video Streams는 비디오 스트리밍 전용 서비스로, 텍스트 기반 클릭스트림 데이터 수집에 적합하지 않습니다.

**(D)** : Amazon Managed Service for Apache Flink는 데이터 처리 및 분석 서비스이지, 데이터 수집(캡처) 서비스가 아닙니다. 데이터 캡처 역할을 수행하지 않습니다. → [📖 Amazon Managed Service for Apache Flink — 분석 서비스, 수집 아님](/section/20-data-analytics#amazon-managed-service-for-apache-flink)

**핵심 개념:** Amazon Kinesis Data Streams 온디맨드 모드 — 자동 확장으로 변동 트래픽에 대응, Lambda를 통한 실시간 스트림 처리

**관련 노트:** [Amazon Kinesis Data Streams](/section/15-integration-messaging#amazon-kinesis-data-streams), [AWS Lambda](/section/17-serverless-overview#aws-lambda)

---
