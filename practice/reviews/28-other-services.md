# Section 28 - Other Services 연습문제 해설

---

### Q1. Company wants to allow developers to create CloudFormation stacks that provision S3 buckets, but developers should not have direct S3 permissions. How?

**한글 번역:** 회사가 개발자들이 S3 버킷을 프로비저닝하는 CloudFormation 스택을 생성할 수 있도록 허용하되, 개발자들에게 직접적인 S3 권한은 부여하지 않으려 합니다. 어떻게 해야 합니까?

**선지:**
- A) Grant developers S3 full access → 개발자에게 S3 전체 접근 권한 부여
- B) Use CloudFormation Service Role with S3 permissions and grant developers iam:PassRole and cloudformation:* → S3 권한이 있는 CloudFormation 서비스 역할 사용 + 개발자에게 iam:PassRole과 cloudformation:* 권한 부여
- C) Use Organizations SCPs → Organizations SCP 사용
- D) Create IAM policy allowing S3 only through CloudFormation → CloudFormation을 통해서만 S3를 허용하는 IAM 정책 생성

**정답:** B

**선지별 해설:**
- **A) S3 전체 접근 권한:** 개발자에게 S3 전체 접근 권한을 부여하면 직접 S3에 접근할 수 있게 되어 요구사항에 위배됩니다. 최소 권한 원칙에도 어긋납니다.
- **B) CloudFormation Service Role + iam:PassRole:** 정답입니다. CloudFormation 서비스 역할(Service Role)은 스택 생성 시 CloudFormation이 사용하는 IAM 역할입니다. 이 역할에 S3 권한을 부여하고, 개발자에게는 iam:PassRole(해당 역할을 CloudFormation에 전달할 권한)과 cloudformation:* 권한만 부여합니다. 개발자는 직접 S3에 접근할 수 없지만, CloudFormation을 통해 S3 리소스를 프로비저닝할 수 있습니다.
- **C) Organizations SCP:** SCP는 조직 단위에서 권한을 제한하는 데 사용되며, 특정 서비스를 통한 간접 접근을 허용하는 세밀한 제어에는 적합하지 않습니다. 이 시나리오의 요구사항을 정확히 충족하지 못합니다.
- **D) S3를 CloudFormation으로만 허용하는 IAM 정책:** IAM 정책의 Condition에서 서비스 출처(source service)를 기반으로 제한하는 것은 S3에 대해서는 직접적으로 지원되지 않습니다. CloudFormation Service Role이 올바른 접근 방식입니다.

**핵심 개념:** CloudFormation Service Role — 개발자 권한과 리소스 생성 권한의 분리

---

### Q2. Company needs to securely connect to EC2 instances in a private subnet without SSH keys or port 22. Session logs must be stored for auditing. Which solution?

**한글 번역:** 회사가 SSH 키나 포트 22 없이 프라이빗 서브넷의 EC2 인스턴스에 안전하게 접속해야 합니다. 감사를 위해 세션 로그가 저장되어야 합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) Bastion Host in public subnet → 퍼블릭 서브넷의 Bastion Host
- B) AWS Systems Manager Session Manager → AWS Systems Manager Session Manager
- C) EC2 Instance Connect → EC2 Instance Connect
- D) AWS Direct Connect → AWS Direct Connect

**정답:** B

**선지별 해설:**
- **A) Bastion Host:** Bastion Host는 프라이빗 인스턴스에 접근하기 위한 전통적인 방법이지만, SSH 키가 필요하고 포트 22를 열어야 합니다. 또한 Bastion Host 자체의 보안 관리가 필요하여 운영 오버헤드가 증가합니다. 요구사항의 "SSH 키 없이, 포트 22 없이"에 위배됩니다.
- **B) Session Manager:** 정답입니다. AWS Systems Manager Session Manager는 SSH 키 없이, 인바운드 포트(22)를 열지 않고도 EC2 인스턴스에 안전하게 접속할 수 있습니다. IAM을 통해 접근을 제어하며, 세션 로그를 S3 또는 CloudWatch Logs에 자동으로 저장할 수 있어 감사 요구사항도 충족합니다.
- **C) EC2 Instance Connect:** EC2 Instance Connect는 임시 SSH 키를 사용하여 접속하지만, 여전히 포트 22가 열려 있어야 합니다. 또한 네이티브 세션 로깅 기능이 Session Manager만큼 강력하지 않습니다.
- **D) Direct Connect:** AWS Direct Connect는 온프레미스와 AWS 간의 전용 네트워크 연결 서비스이며, EC2 인스턴스에 접속하기 위한 도구가 아닙니다. 완전히 다른 용도의 서비스입니다.

**핵심 개념:** Systems Manager Session Manager — SSH 키/포트 22 불필요, IAM 기반 접근, 세션 로깅

---

### Q3. Company needs to run data processing job (3 hours) with custom Docker container. Runs daily. Minimize costs. Which service?

**한글 번역:** 회사가 커스텀 Docker 컨테이너로 데이터 처리 작업(3시간)을 실행해야 합니다. 매일 실행됩니다. 비용을 최소화해야 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) AWS Lambda → AWS Lambda
- B) Amazon ECS with Fargate → Amazon ECS + Fargate
- C) AWS Batch with Spot Instances → AWS Batch + Spot 인스턴스
- D) Amazon EC2 On-Demand → Amazon EC2 On-Demand

**정답:** C

**선지별 해설:**
- **A) Lambda:** Lambda의 최대 실행 시간은 15분입니다. 3시간 작업에는 사용할 수 없습니다. 또한 커스텀 Docker 컨테이너를 지원하지만, 시간 제한으로 인해 이 시나리오에는 부적합합니다.
- **B) ECS + Fargate:** ECS with Fargate는 커스텀 Docker 컨테이너를 실행할 수 있고 시간 제한이 없지만, Fargate는 Spot 인스턴스만큼 비용이 저렴하지 않습니다. "비용 최소화" 요구사항에 최적이 아닙니다.
- **C) AWS Batch + Spot:** 정답입니다. AWS Batch는 배치 컴퓨팅 워크로드를 위해 설계되었으며, 커스텀 Docker 컨테이너를 지원합니다. Spot 인스턴스를 활용하면 On-Demand 대비 최대 90% 비용을 절감할 수 있습니다. 일일 정기 실행 작업에 최적이며, 자동으로 컴퓨팅 리소스를 프로비저닝하고 작업 완료 후 정리합니다.
- **D) EC2 On-Demand:** On-Demand 인스턴스는 작동하지만, 하루 3시간만 사용하므로 나머지 21시간은 낭비되거나 시작/종료 자동화가 필요합니다. Spot 인스턴스보다 비용이 높아 비용 최소화에 부적합합니다.

**핵심 개념:** AWS Batch + Spot Instances — 배치 작업의 비용 최적화

---

### Q4. Company wants targeted marketing campaigns across email, SMS, push notifications. Needs customer segments and message templates. Which service?

**한글 번역:** 회사가 이메일, SMS, 푸시 알림을 통한 타겟 마케팅 캠페인을 원합니다. 고객 세그먼트와 메시지 템플릿이 필요합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) Amazon SES → Amazon SES
- B) Amazon SNS → Amazon SNS
- C) Amazon Pinpoint → Amazon Pinpoint
- D) Amazon SQS → Amazon SQS

**정답:** C

**선지별 해설:**
- **A) SES (Simple Email Service):** SES는 이메일 전송에 특화된 서비스입니다. 대량 이메일 발송은 가능하지만, SMS/푸시 알림을 지원하지 않으며, 고객 세그먼트 관리나 마케팅 캠페인 기능이 없습니다.
- **B) SNS (Simple Notification Service):** SNS는 SMS와 푸시 알림을 보낼 수 있지만, 마케팅 캠페인 관리, 고객 세그먼트, 메시지 템플릿 등의 기능이 없습니다. 주로 애플리케이션 간 메시징(pub/sub)에 사용됩니다.
- **C) Pinpoint:** 정답입니다. Amazon Pinpoint는 마케팅 커뮤니케이션 서비스로, 이메일, SMS, 푸시 알림, 음성 메시지 등 다중 채널을 지원합니다. 고객 세그먼트 생성, 메시지 템플릿, 캠페인 일정 관리, A/B 테스트, 분석 기능을 모두 제공합니다.
- **D) SQS (Simple Queue Service):** SQS는 메시지 큐 서비스로, 마케팅이나 고객 커뮤니케이션과는 전혀 관련이 없습니다. 애플리케이션 간의 비동기 메시지 처리에 사용됩니다.

**핵심 개념:** Amazon Pinpoint — 다중 채널 마케팅 커뮤니케이션 (세그먼트, 템플릿, 캠페인)

---

### Q5. Company wants to integrate data from Salesforce into S3 on schedule. Data should be filtered and validated. Which service?

**한글 번역:** 회사가 Salesforce의 데이터를 예약 일정에 따라 S3로 통합하려 합니다. 데이터는 필터링되고 검증되어야 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) AWS Glue ETL → AWS Glue ETL
- B) Amazon AppFlow → Amazon AppFlow
- C) AWS DataSync → AWS DataSync
- D) AWS DMS → AWS DMS

**정답:** B

**선지별 해설:**
- **A) Glue ETL:** AWS Glue는 강력한 ETL 서비스이지만, Salesforce와 같은 SaaS 애플리케이션과의 네이티브 커넥터가 없습니다. 커스텀 코드를 작성해야 하므로 운영 오버헤드가 증가합니다.
- **B) AppFlow:** 정답입니다. Amazon AppFlow는 Salesforce, SAP, Slack, Google Analytics 등 SaaS 애플리케이션과 AWS 서비스 간의 데이터 통합을 위한 관리형 서비스입니다. 예약 실행을 지원하며, 데이터 필터링, 검증, 매핑, 변환 기능을 코드 없이 제공합니다. S3, Redshift 등으로 직접 데이터를 전송할 수 있습니다.
- **C) DataSync:** AWS DataSync는 온프레미스 스토리지와 AWS 간의 데이터 전송에 특화되어 있습니다. SaaS 애플리케이션(Salesforce)과의 통합은 지원하지 않습니다.
- **D) DMS (Database Migration Service):** DMS는 데이터베이스 마이그레이션을 위한 서비스이며, SaaS 애플리케이션과의 데이터 통합에는 적합하지 않습니다. 데이터베이스 간의 복제에 특화되어 있습니다.

**핵심 개념:** Amazon AppFlow — SaaS ↔ AWS 간 관리형 데이터 통합 (필터링, 검증, 예약 지원)

---

### Q6. Company wants to reduce AWS costs by automatically stopping EC2 and RDS instances outside business hours. LEAST operational overhead?

**한글 번역:** 회사가 업무 시간 외에 EC2 및 RDS 인스턴스를 자동으로 중지하여 AWS 비용을 절감하려 합니다. 운영 오버헤드가 가장 적은 방법은 무엇입니까?

**선지:**
- A) Lambda function triggered by CloudWatch Events → CloudWatch Events에 의해 트리거되는 Lambda 함수
- B) AWS Instance Scheduler solution → AWS Instance Scheduler 솔루션
- C) EC2 Auto Scaling scheduled actions only → EC2 Auto Scaling 예약 작업만 사용
- D) Manually stop/start each day → 매일 수동으로 중지/시작

**정답:** B

**선지별 해설:**
- **A) Lambda + CloudWatch Events:** Lambda와 CloudWatch Events를 사용하면 EC2/RDS 인스턴스를 예약 중지/시작할 수 있지만, Lambda 함수를 직접 작성하고 유지 관리해야 합니다. 커스텀 코드, 오류 처리, IAM 역할 구성 등 운영 오버헤드가 있습니다.
- **B) Instance Scheduler:** 정답입니다. AWS Instance Scheduler는 EC2 및 RDS 인스턴스의 시작/중지를 자동화하는 AWS 솔루션입니다. CloudFormation 템플릿으로 쉽게 배포할 수 있으며, 태그 기반으로 일정을 관리합니다. 커스텀 코드 작성 없이 바로 사용할 수 있어 운영 오버헤드가 가장 적습니다.
- **C) EC2 Auto Scaling 예약 작업:** Auto Scaling 예약 작업은 EC2에만 적용되며, RDS 인스턴스는 관리할 수 없습니다. EC2와 RDS를 모두 관리해야 하는 요구사항을 충족하지 못합니다.
- **D) 수동 중지/시작:** 매일 수동으로 관리하는 것은 운영 오버헤드가 가장 크고, 인적 오류 가능성이 높으며, 확장성이 없습니다.

**핵심 개념:** AWS Instance Scheduler — EC2/RDS 예약 시작/중지 솔루션 (최소 오버헤드)
