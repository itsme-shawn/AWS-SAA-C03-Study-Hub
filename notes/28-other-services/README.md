# Other Services

## 개요
시험에 가끔 출제되는 다양한 AWS 서비스들을 다루는 섹션이다. CloudFormation, SES, Pinpoint, Systems Manager, Cost Explorer, Outposts, Batch, AppFlow, Amplify, Instance Scheduler 등을 학습한다.

## 핵심 개념

### AWS CloudFormation
> **왜 필요한가?** — 매번 AWS 콘솔에서 마우스로 클릭해서 VPC, EC2, RDS를 만드는 것은 실수하기 쉽고 반복 작업이다. CloudFormation을 쓰면 인프라를 코드(YAML/JSON)로 정의해서 버튼 하나로 동일한 환경을 여러 번 찍어낼 수 있다. "인프라의 설계도면"이라고 생각하면 됨.

- AWS 인프라를 **선언적(declarative: "무엇을 만들어라"만 명시, 순서는 자동 결정)**으로 정의하는 IaC(Infrastructure as Code, 코드로 인프라 관리) 서비스
- 대부분의 AWS 리소스 지원 (지원되지 않는 리소스는 "custom resources" 사용)
- 템플릿에 리소스를 정의하면 올바른 순서와 설정으로 자동 생성

```text
  CloudFormation 스택 구조

  ┌─── CloudFormation Template (YAML/JSON) ───────────┐
  │                                                    │
  │  Resources:                                        │
  │    VPC, Subnet, IGW, EC2, RDS, S3, IAM Role ...    │
  │                                                    │
  └──────────────────────┬─────────────────────────────┘
                         │ 배포
                         ▼
  ┌─── CloudFormation Stack ──────────────────────────┐
  │                                                    │
  │  ┌─────┐  ┌────────┐  ┌─────┐  ┌─────┐  ┌─────┐ │
  │  │ VPC │  │ Subnet │  │ EC2 │  │ RDS │  │ S3  │ │
  │  └──┬──┘  └───┬────┘  └──┬──┘  └──┬──┘  └─────┘ │
  │     └─────────┴──────────┴────────┘              │
  │           의존성 자동 해결 & 순서 결정               │
  │                                                    │
  │  ┌─ Service Role (IAM) ─────────────────────────┐ │
  │  │  CF가 리소스 생성/삭제 시 사용                   │ │
  │  │  사용자는 iam:PassRole만 필요                   │ │
  │  └──────────────────────────────────────────────┘ │
  │                                                    │
  │  생성 → 업데이트(Change Set) → 삭제(전체 정리)       │
  └────────────────────────────────────────────────────┘
```

#### CloudFormation 장점
- **IaC**: 수동 리소스 생성 없음, 코드를 통한 인프라 변경 검토
- **비용**: 스택 내 리소스에 태그 자동 부여, 비용 추정 가능
- **비용 절감**: Dev 환경을 오후 5시에 삭제, 오전 8시에 재생성
- **생산성**: 인프라 파괴/재생성 자동화, 선언적 프로그래밍
- **기존 템플릿 활용**: 웹에서 제공되는 템플릿 재사용

#### CloudFormation + Infrastructure Composer
- 템플릿에서 자동으로 다이어그램 생성 가능
- WordPress 스택 예시: 리소스와 컴포넌트 간 관계 시각화

#### CloudFormation Service Role
- CloudFormation이 스택 리소스를 생성/업데이트/삭제할 수 있는 **IAM 역할**
- 사용자가 리소스에 직접 권한이 없어도 스택 리소스를 관리할 수 있음
- **최소 권한 원칙** 구현에 유용
- 사용자에게 `iam:PassRole` 권한 필요

### Amazon Simple Email Service (SES)
- 완전 관리형 **이메일 전송** 서비스 (글로벌, 대규모)
- 인바운드/아웃바운드 이메일 지원
- 평판 대시보드, 성능 인사이트, 스팸 방지 피드백
- **DKIM (DomainKeys Identified Mail)** 및 **SPF (Sender Policy Framework)** 지원
  - 이메일 발송자 신원을 검증하는 이메일 인증 표준 (스팸·피싱 방지)
- 유연한 IP 배포: 공유, 전용, 고객 소유 IP
- 전송 방법: AWS Console, APIs, SMTP
- 사용 사례: 트랜잭션(주문 확인, 비밀번호 초기화), 마케팅, 대량 이메일

### Amazon Pinpoint
- 스케일러블 **2-way** 마케팅 커뮤니케이션 서비스
- 지원 채널: **이메일, SMS, 푸시, 음성, 인앱 메시징**
- 메시지 세그먼트 및 개인화
- 하루 수십억 건 메시지 처리
- **SNS/SES와의 차이점**:
  - SNS/SES: 각 메시지의 대상, 콘텐츠, 전달 일정을 개별 관리
  - **Pinpoint**: 메시지 템플릿, 전달 일정, 타겟 세그먼트, 전체 캠페인을 생성/관리
- 이벤트 스트리밍: SNS, Kinesis Data Firehose, CloudWatch Logs

### AWS Systems Manager (SSM)

```text
  SSM 관리 흐름

  ┌── 관리자 ──┐
  │ AWS Console│    ┌──────────────────────────────────┐
  │  CLI/SDK   │───►│  AWS Systems Manager (SSM)       │
  └────────────┘    │                                  │
                    │  ┌─ Session Manager ────────────┐│
                    │  │  SSH 불필요, 포트 22 불필요     ││
                    │  │  로그 → S3 / CloudWatch Logs  ││
                    │  └──────────────────────────────┘│
                    │  ┌─ Run Command ───────────────┐ │
                    │  │  여러 인스턴스에 명령 실행      │ │
                    │  └──────────────────────────────┘│
                    │  ┌─ Patch Manager ─────────────┐ │
                    │  │  OS/앱 패치 자동화             │ │
                    │  └──────────────────────────────┘│
                    │  ┌─ Automation ────────────────┐ │
                    │  │  Runbook 기반 유지보수         │ │
                    │  └──────────────────────────────┘│
                    └──────────┬───────────────────────┘
                               │ SSM Agent
                    ┌──────────┼──────────────┐
                    ▼          ▼              ▼
              ┌──────────┐ ┌──────────┐ ┌──────────────┐
              │ EC2 (AZ1)│ │ EC2 (AZ2)│ │ On-Premises  │
              │ [Agent]  │ │ [Agent]  │ │ [Agent]      │
              └──────────┘ └──────────┘ └──────────────┘
```

#### Session Manager
- EC2/온프레미스 서버에 **보안 셸 접속**
- **SSH, Bastion Host, SSH 키 불필요**
- **포트 22 불필요** (보안 향상)
- Linux, macOS, Windows 지원
- 세션 로그 → S3 또는 CloudWatch Logs

#### Run Command
- 문서(스크립트) 실행 또는 단일 명령 실행
- **리소스 그룹을 사용하여 여러 인스턴스에 동시 실행**
- SSH 불필요
- 출력: AWS Console, S3, CloudWatch Logs
- SNS 알림, IAM & CloudTrail 통합
- EventBridge로 트리거 가능

#### Patch Manager
- 관리형 인스턴스의 **패치 자동화**
- OS, 애플리케이션, 보안 업데이트
- EC2 + 온프레미스 서버 지원
- 온디맨드 또는 Maintenance Windows 스케줄
- 패치 컴플라이언스 리포트 생성 (누락 패치 확인)

#### Maintenance Windows
- 인스턴스에서 작업을 수행하는 **스케줄 정의**
- 포함: 스케줄, 기간, 등록된 인스턴스, 등록된 태스크
- 예: OS 패치, 드라이버 업데이트, 소프트웨어 설치

#### SSM Automation
- EC2 및 AWS 리소스의 **유지보수/배포 작업 간소화**
- 예: 인스턴스 재시작, AMI 생성, EBS 스냅샷
- **Automation Runbook** (SSM Documents)으로 작업 정의
- 트리거: AWS Console/CLI/SDK, EventBridge, Maintenance Windows, **AWS Config 규칙 교정**

### Cost Explorer
- AWS 비용과 사용량을 **시각화, 이해, 관리**
- 커스텀 리포트 생성
- 분석 수준: 전체 계정, 월별, 시간별, 리소스 레벨
- **Savings Plan** 최적화 추천
- 이전 사용량 기반 **최대 18개월 사용량 예측**

### AWS Cost Anomaly Detection
- **ML**을 사용하여 비정상 지출 감지
- 고유한 과거 지출 패턴을 학습 (임계값 정의 불필요)
- AWS 서비스, 멤버 계정, 비용 할당 태그, 비용 카테고리 모니터링
- 이상 감지 보고서 + 근본 원인 분석
- 개별 알림 또는 일별/주별 요약 (SNS)

### AWS Outposts
- **온프레미스에 AWS 인프라를 확장**하는 서버 랙
- AWS가 설정 및 관리하는 "Outposts Racks"
- **물리적 보안은 고객 책임**
- 장점: 저지연 온프레미스 접근, 로컬 데이터 처리, 데이터 레지던시, 클라우드 마이그레이션 용이
- 지원 서비스: EC2, EBS, S3, EKS, ECS, RDS, EMR

### AWS Batch
- **완전 관리형 배치 처리** 서비스
- 수십만 개의 컴퓨팅 배치 작업 효율적 실행
- EC2 인스턴스 또는 **Spot Instances** 동적 시작
- **Docker 이미지**로 작업 정의, ECS에서 실행
- 비용 최적화에 유리

```text
  Batch vs Lambda 비교

  ┌──── AWS Lambda ────────────────┐  ┌──── AWS Batch ──────────────────┐
  │                                │  │                                 │
  │  ┌──────────────────────┐      │  │  ┌───────────────────────┐      │
  │  │  Lambda Function     │      │  │  │  Docker Container     │      │
  │  │  (코드)               │      │  │  │  (어떤 런타임이든)     │      │
  │  └──────────────────────┘      │  │  └───────────────────────┘      │
  │                                │  │         │                       │
  │  ⏱  최대 15분              │  │  ⏱  시간 제한 없음            │
  │  💾 제한된 디스크 (/tmp 10GB) │  │  💾 EBS / Instance Store      │
  │  🖥  서버리스                │  │  🖥  EC2 기반 (Spot 가능)     │
  │  ⚡ 이벤트 기반 실행         │  │  📦 배치 작업 큐 관리          │
  │                                │  │                                 │
  │  적합: 짧은 작업, API 백엔드   │  │  적합: 장시간 작업, 대규모 병렬  │
  └────────────────────────────────┘  └─────────────────────────────────┘
```

#### Batch vs Lambda
| 항목 | Lambda | Batch |
|------|--------|-------|
| 시간 제한 | 있음 (15분) | **없음** |
| 런타임 | 제한적 | Docker 이미지면 모두 가능 |
| 디스크 공간 | 제한적 임시 공간 | EBS/Instance Store |
| 서버리스 | O | X (EC2 기반, AWS 관리 가능) |

### Amazon AppFlow
- SaaS 앱과 AWS 간 **보안 데이터 전송** 서비스
- **소스**: Salesforce, SAP, Zendesk, Slack, ServiceNow
- **대상**: S3, Redshift, Snowflake, Salesforce
- 빈도: 스케줄, 이벤트 기반, 온디맨드
- 데이터 변환: 필터링, 유효성 검사
- 퍼블릭 인터넷 또는 **AWS PrivateLink**로 암호화 전송

### AWS Amplify
- **풀스택 웹 및 모바일 앱** 개발/배포 도구
- 인증, 스토리지, API (REST, GraphQL), CI/CD, PubSub, Analytics, AI/ML, 모니터링
- 소스 코드: GitHub, CodeCommit, Bitbucket, GitLab, 직접 업로드
- 프론트엔드 라이브러리 + Amplify CLI + Amplify Console
- 백엔드: S3, Cognito, AppSync, API Gateway, Lambda, DynamoDB 등

### Instance Scheduler on AWS
- CloudFormation으로 배포하는 **AWS 솔루션** (서비스가 아님)
- AWS 서비스를 **자동 시작/중지**하여 비용 절감 (최대 70%)
- 지원: EC2 인스턴스, EC2 Auto Scaling Groups, RDS 인스턴스
- DynamoDB 테이블에서 스케줄 관리
- 리소스 태그 + Lambda로 인스턴스 시작/중지
- 크로스 계정, 크로스 리전 지원

## 시험 포인트
- **CloudFormation Service Role**: 사용자에게 리소스 권한 없이도 스택 생성 가능, `iam:PassRole` 필요
- **SES vs Pinpoint**: SES는 이메일 전용, Pinpoint는 다채널 마케팅 캠페인
- **SSM Session Manager**: SSH/포트 22 불필요, Bastion Host 대체
- **Batch vs Lambda**: 시간 제한 없는 작업은 Batch, Docker 기반
- **AppFlow**: SaaS ↔ AWS 데이터 통합
- **Outposts**: 온프레미스에 AWS 서비스 확장, 물리적 보안은 고객 책임
- **Instance Scheduler**: CloudFormation 솔루션, 서비스가 아님

## 치트시트

| 기능/서비스 | 설명 |
|------------|------|
| CloudFormation | IaC, 선언적 인프라 정의, custom resources |
| CF Service Role | 최소 권한으로 스택 관리, iam:PassRole |
| SES | 완전 관리형 이메일 서비스, DKIM/SPF |
| Pinpoint | 다채널 마케팅, 캠페인 관리, 세그먼트 |
| SSM Session Manager | SSH/포트22 불필요, 보안 셸 접속 |
| SSM Run Command | 여러 인스턴스에 명령 실행, SSH 불필요 |
| SSM Patch Manager | 패치 자동화, 컴플라이언스 리포트 |
| SSM Automation | Runbook 기반 유지보수, Config 교정 |
| Cost Explorer | 비용 시각화, 18개월 예측, Savings Plan |
| Cost Anomaly Detection | ML 기반 비정상 지출 감지 |
| Outposts | 온프레미스 AWS 확장, 물리적 보안은 고객 |
| Batch | 대규모 배치 작업, Docker, Spot Instance |
| AppFlow | SaaS ↔ AWS 데이터 전송, PrivateLink |
| Amplify | 풀스택 웹/모바일 앱 개발/배포 |
| Instance Scheduler | CF 솔루션, 자동 시작/중지, 최대 70% 절감 |

---

## Practice Questions

### Q1. A company wants to allow developers to create CloudFormation stacks that provision S3 buckets, but developers should not have direct permissions to create S3 buckets. How can this be achieved?
**Options:**
- A) Grant developers S3 full access permissions
- B) Use a CloudFormation Service Role with S3 permissions and grant developers iam:PassRole and cloudformation:* permissions
- C) Use AWS Organizations Service Control Policies to allow CloudFormation to create S3 buckets
- D) Create an IAM policy that allows S3 bucket creation only through CloudFormation

**Answer:** B

**해설:**

> **문제:** 한 회사가 개발자들이 S3 버킷을 프로비저닝하는 CloudFormation 스택을 생성할 수 있게 하되, 개발자는 S3 버킷을 직접 생성하는 권한은 갖지 않아야 한다. 이를 어떻게 구현할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 개발자에게 S3 전체 접근 권한을 부여한다 |
| B | S3 권한이 있는 CloudFormation Service Role을 사용하고, 개발자에게 iam:PassRole과 cloudformation:* 권한을 부여한다 |
| C | AWS Organizations Service Control Policies를 사용하여 CloudFormation이 S3 버킷을 생성하도록 허용한다 |
| D | CloudFormation을 통해서만 S3 버킷 생성을 허용하는 IAM 정책을 생성한다 |

**(A)** : 개발자에게 S3 전체 권한을 직접 부여하는 것은 요구사항에 반한다. 개발자가 CloudFormation 없이도 직접 S3 버킷을 생성할 수 있게 된다.

**(B) 정답** : CloudFormation Service Role에 S3 생성 권한을 부여하고 개발자에게는 `iam:PassRole`과 `cloudformation:*`만 주면 최소 권한 원칙을 구현할 수 있다. 개발자는 S3 직접 접근 없이 CloudFormation을 통해 S3 버킷을 생성할 수 있다. → [📖 AWS CloudFormation](/section/28-other-services#aws-cloudformation)

**(C)** : SCP는 조직 수준의 권한 경계를 설정하는 것이다. 이 시나리오의 세밀한 권한 위임에 적합하지 않다.

**(D)** : 조건부 IAM 정책으로 CloudFormation을 통한 호출만 허용하는 것은 복잡하다. Service Role이 이미 이 목적으로 설계되어 있다.

**핵심 개념:** CloudFormation Service Role

**관련 노트:** [AWS CloudFormation](/section/28-other-services#aws-cloudformation)

---

### Q2. A company needs to securely connect to EC2 instances in a private subnet without using SSH keys or opening port 22. Session logs must be stored for auditing. Which solution should they use?
**Options:**
- A) Use a Bastion Host in a public subnet
- B) Use AWS Systems Manager Session Manager
- C) Use EC2 Instance Connect
- D) Use AWS Direct Connect

**Answer:** B

**해설:**

> **문제:** 한 회사가 SSH 키를 사용하지 않고 포트 22를 열지 않으면서 프라이빗 서브넷의 EC2 인스턴스에 안전하게 연결해야 한다. 감사를 위해 세션 로그를 저장해야 한다. 어떤 솔루션을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 퍼블릭 서브넷의 Bastion Host를 사용한다 |
| B | AWS Systems Manager Session Manager를 사용한다 |
| C | EC2 Instance Connect를 사용한다 |
| D | AWS Direct Connect를 사용한다 |

**(A)** : Bastion Host는 퍼블릭 서브넷에 배치하여 SSH 키와 포트 22를 사용해야 한다. 요구사항에 반한다. → [📖 Bastion Host](/section/25-vpc#bastion-host)

**(B) 정답** : SSM Session Manager는 SSH 키, Bastion Host, 포트 22 없이 EC2 인스턴스에 보안 셸 접속을 제공한다. 세션 로그를 S3 또는 CloudWatch Logs에 저장하여 감사 요구사항을 충족한다. → [📖 AWS Systems Manager SSM](/section/28-other-services#aws-systems-manager-ssm)

**(C)** : EC2 Instance Connect는 SSH 키 관리를 간소화하지만 여전히 포트 22가 필요하다.

**(D)** : Direct Connect는 온프레미스와 AWS 간의 전용 네트워크 연결 서비스이다. 인스턴스 접속 솔루션이 아니다.

**핵심 개념:** SSM Session Manager

**관련 노트:** [AWS Systems Manager SSM](/section/28-other-services#aws-systems-manager-ssm)

---

### Q3. A company needs to run a data processing job that takes 3 hours to complete and requires a custom Docker container. The job runs daily and they want to minimize costs. Which service should they use?
**Options:**
- A) AWS Lambda
- B) Amazon ECS with Fargate
- C) AWS Batch with Spot Instances
- D) Amazon EC2 On-Demand instances

**Answer:** C

**해설:**

> **문제:** 한 회사가 완료까지 3시간이 걸리는 데이터 처리 작업을 실행해야 하며, 커스텀 Docker 컨테이너가 필요하다. 작업은 매일 실행되며 비용을 최소화하려 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Lambda |
| B | Fargate가 있는 Amazon ECS |
| C | Spot Instances가 있는 AWS Batch |
| D | Amazon EC2 On-Demand 인스턴스 |

**(A)** : Lambda는 15분 시간 제한이 있다. 3시간 작업을 실행할 수 없다. → [📖 Lambda, SNS & SQS 패턴](/section/27-more-solutions-architecture#lambda-sns-sqs-패턴)

**(B)** : ECS Fargate도 기술적으로 가능하지만 AWS Batch가 배치 작업 관리(작업 큐, 스케줄링, 리소스 최적화)에 더 특화되어 있다. Spot Instance를 더 효율적으로 활용한다.

**(C) 정답** : AWS Batch와 Spot Instances의 조합은 3시간 소요되는 Docker 기반 배치 작업을 비용 효율적으로 실행하는 최적의 방법이다. → [📖 AWS Batch](/section/28-other-services#aws-batch)

**(D)** : EC2 On-Demand 인스턴스는 항상 정가로 과금되어 비용이 가장 높다. Spot Instance 대비 최대 90% 더 비싸다.

**핵심 개념:** AWS Batch vs Lambda

**관련 노트:** [AWS Batch](/section/28-other-services#aws-batch)

---

### Q4. A company wants to create targeted marketing campaigns across email, SMS, and push notifications with the ability to create customer segments and message templates. Which AWS service should they use?
**Options:**
- A) Amazon SES
- B) Amazon SNS
- C) Amazon Pinpoint
- D) Amazon SQS

**Answer:** C

**해설:**

> **문제:** 한 회사가 이메일, SMS, 푸시 알림을 통해 고객 세그먼트와 메시지 템플릿을 활용한 타겟 마케팅 캠페인을 생성하려 한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon SES |
| B | Amazon SNS |
| C | Amazon Pinpoint |
| D | Amazon SQS |

**(A)** : SES는 이메일 전용 서비스이다. SMS나 푸시 알림을 지원하지 않으며 캠페인 관리 기능이 없다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(B)** : SNS는 개별 메시지 전송에 사용된다. 각 메시지의 대상/콘텐츠/전달 일정을 개별적으로 관리해야 하므로 캠페인 수준의 관리가 불가능하다.

**(C) 정답** : Amazon Pinpoint는 이메일, SMS, 푸시, 음성, 인앱 메시징을 지원하며 메시지 템플릿, 타겟 세그먼트, 전체 캠페인 생성 및 관리 기능을 제공한다. → [📖 Amazon Pinpoint](/section/28-other-services#amazon-pinpoint)

**(D)** : SQS는 메시지 큐 서비스이다. 최종 사용자에게 알림을 보내는 서비스가 아니다.

**핵심 개념:** Amazon Pinpoint vs SES vs SNS

**관련 노트:** [Amazon Pinpoint](/section/28-other-services#amazon-pinpoint), [Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

---

### Q5. A company wants to integrate data from Salesforce into Amazon S3 on a scheduled basis. The data should be filtered and validated before being stored. Which service should they use?
**Options:**
- A) AWS Glue ETL
- B) Amazon AppFlow
- C) AWS DataSync
- D) AWS DMS

**Answer:** B

**해설:**

> **문제:** 한 회사가 Salesforce의 데이터를 스케줄 기반으로 Amazon S3에 통합하려 한다. 데이터는 저장 전에 필터링 및 유효성 검사를 거쳐야 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Glue ETL |
| B | Amazon AppFlow |
| C | AWS DataSync |
| D | AWS DMS |

**(A)** : AWS Glue는 데이터 레이크와 ETL 작업에 사용된다. Salesforce 같은 SaaS 앱과의 네이티브 통합이 목적이 아니다.

**(B) 정답** : Amazon AppFlow는 Salesforce, SAP, Zendesk, Slack 등 SaaS 앱에서 AWS 서비스(S3, Redshift 등)로 데이터를 스케줄, 이벤트 기반, 온디맨드로 전송한다. 필터링과 유효성 검사 같은 데이터 변환 기능을 기본 제공한다. → [📖 Amazon AppFlow](/section/28-other-services#amazon-appflow)

**(C)** : DataSync는 온프레미스 스토리지와 AWS 스토리지 서비스 간의 데이터 마이그레이션/동기화용이다. SaaS 앱 통합이 아니다.

**(D)** : DMS는 데이터베이스 간 마이그레이션 전용 서비스이다. SaaS 앱 통합이 아니다.

**핵심 개념:** Amazon AppFlow

**관련 노트:** [Amazon AppFlow](/section/28-other-services#amazon-appflow)

---

### Q6. A company wants to reduce their AWS costs by automatically stopping EC2 instances and RDS instances outside of business hours. Which solution requires the LEAST operational overhead?
**Options:**
- A) Write a Lambda function triggered by CloudWatch Events
- B) Use AWS Instance Scheduler solution
- C) Use EC2 Auto Scaling scheduled actions only
- D) Manually stop and start instances each day

**Answer:** B

**해설:**

> **문제:** 한 회사가 업무 시간 외에 EC2 인스턴스와 RDS 인스턴스를 자동으로 중지하여 AWS 비용을 절감하려 한다. 운영 오버헤드가 가장 적은 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | CloudWatch Events로 트리거되는 Lambda 함수를 작성한다 |
| B | AWS Instance Scheduler 솔루션을 사용한다 |
| C | EC2 Auto Scaling 예약 작업만 사용한다 |
| D | 매일 수동으로 인스턴스를 중지하고 시작한다 |

**(A)** : Lambda 함수 작성은 직접 개발, 테스트, 유지 관리가 필요하다. 운영 오버헤드가 더 크다.

**(B) 정답** : AWS Instance Scheduler는 CloudFormation으로 배포되는 사전 구축된 솔루션으로 EC2와 RDS 인스턴스를 DynamoDB 기반 스케줄에 따라 자동으로 시작/중지한다. 최대 70%의 비용 절감이 가능하다. → [📖 Instance Scheduler on AWS](/section/28-other-services#instance-scheduler-on-aws)

**(C)** : EC2 Auto Scaling 예약 작업은 EC2 인스턴스만 관리한다. RDS는 포함하지 않으므로 요구사항을 완전히 충족하지 못한다.

**(D)** : 수동 관리는 운영 부담이 가장 크고 인적 오류가 발생할 수 있다.

**핵심 개념:** Instance Scheduler on AWS

**관련 노트:** [Instance Scheduler on AWS](/section/28-other-services#instance-scheduler-on-aws)
