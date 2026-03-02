# Section 22: AWS Monitoring, Audit and Performance

## 개요
AWS의 모니터링, 감사, 성능 관리 서비스를 다룬다. CloudWatch, CloudTrail, AWS Config는 SAA-C03 시험에서 자주 출제되며, 각 서비스의 역할 차이를 명확히 이해하는 것이 핵심이다. 성능 모니터링(CloudWatch), API 감사(CloudTrail), 리소스 규정 준수(Config)를 구분해야 한다.

## 핵심 개념

> **초보자를 위한 3줄 요약**
> - **CloudWatch Metrics**: "숫자로 된 상태 측정값" — CPU가 몇 %인지, 요청이 몇 건인지 수치로 파악
> - **CloudWatch Logs**: "서버의 일기장" — 애플리케이션이 기록하는 상세 로그 텍스트 수집/저장
> - **EventBridge (구 CloudWatch Events)**: "자동 반응 장치" — 특정 이벤트 발생 시 자동으로 Lambda 실행 등 액션 수행

### Amazon CloudWatch Metrics
- AWS 모든 서비스에 대한 **메트릭 제공**
- 메트릭: CPUUtilization, NetworkIn 등 모니터링 변수
- **Namespace**: 메트릭 그룹
- **Dimension**: 메트릭 속성 (인스턴스 ID, 환경 등), 메트릭당 최대 30개
- 메트릭에 타임스탬프 포함
- **Custom Metrics** 생성 가능 (예: RAM)
- CloudWatch 대시보드에서 시각화

#### CloudWatch Metric Streams
- CloudWatch 메트릭을 **근실시간으로 스트리밍**
- 대상: Kinesis Data Firehose (-> S3, Redshift, OpenSearch), Datadog, Dynatrace, Splunk 등
- 필터로 특정 메트릭만 스트리밍 가능

### CloudWatch Logs

```text
┌─────────────────────────────────────────────────────────────────────┐
│            CloudWatch Metrics / Alarms / Logs 전체 흐름              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [메트릭 수집]                    [알람]              [액션]          │
│  ┌───────────┐                                                      │
│  │ EC2       │──┐  ┌──────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ RDS       │──┼─▶│CloudWatch│─▶│ CloudWatch  │─▶│ SNS 알림    │ │
│  │ ELB       │──┤  │ Metrics  │  │ Alarms      │  │ EC2 Stop    │ │
│  │ Custom    │──┘  └────┬─────┘  │ (OK/ALARM/  │  │ ASG 스케일링│ │
│  └───────────┘         │        │ INSUFFICIENT)│  │ Lambda      │ │
│                        │        └─────────────┘  └─────────────┘ │
│                        ▼                                          │
│              ┌──────────────┐                                      │
│              │ Metric       │──▶ Kinesis Firehose ──▶ S3/Datadog  │
│              │ Streams      │    (근실시간)                         │
│              └──────────────┘                                      │
│                                                                     │
│  [로그 수집]                      [로그 전송]                        │
│  ┌───────────┐                                                      │
│  │ Unified   │──┐  ┌──────────┐  ┌─────────────────┐              │
│  │ Agent     │──┼─▶│CloudWatch│─▶│ Subscription    │              │
│  │ Lambda    │──┤  │ Logs     │  │ Filter          │              │
│  │ VPC Flow  │──┤  │          │  └────┬────────────┘              │
│  │ API GW    │──┘  └──────────┘      │                            │
│  └───────────┘                       ├──▶ Lambda (실시간)          │
│                                      ├──▶ KDS (실시간)             │
│                                      └──▶ KDF ──▶ S3 (근실시간)    │
│                                                                     │
│  * S3 Export (CreateExportTask): 최대 12시간 소요 (비실시간)         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

- **Log Groups**: 애플리케이션 단위 (임의 이름)
- **Log Streams**: 인스턴스/로그 파일/컨테이너 단위
- **로그 보존 정책**: 만료 없음 ~ 10년
- 로그 전송 대상: S3, Kinesis Data Streams, Kinesis Data Firehose, Lambda, OpenSearch
- 기본 암호화, KMS 커스텀 키 설정 가능

#### CloudWatch Logs 소스
- SDK, CloudWatch Logs Agent, CloudWatch Unified Agent
- Elastic Beanstalk, ECS, Lambda, VPC Flow Logs, API Gateway, CloudTrail, Route53 DNS 쿼리

#### CloudWatch Logs Insights
- CloudWatch Logs에 저장된 **로그 데이터 검색/분석**
- 전용 쿼리 언어 제공
- AWS 서비스 및 JSON 로그 이벤트에서 필드 자동 발견
- **여러 AWS 계정의 다중 Log Group** 쿼리 가능
- 쿼리 엔진 (실시간 엔진 아님)

#### CloudWatch Logs - S3 Export
- 로그 데이터 S3로 내보내기: **최대 12시간** 소요
- API: CreateExportTask
- **실시간/근실시간이 아님** -> Logs Subscriptions 사용

#### CloudWatch Logs Subscriptions
- CloudWatch Logs에서 **실시간 로그 이벤트** 수신
- 대상: Kinesis Data Streams, Kinesis Data Firehose, Lambda
- **Subscription Filter**: 전송할 로그 이벤트 필터링
- **Multi-Account & Multi-Region 집계** 가능 (Subscription Filter -> KDS/KDF -> S3)
- **Cross-Account Subscription**: IAM Role로 다른 계정의 리소스에 로그 전송

#### CloudWatch Agent
- **EC2/온프레미스에서 CloudWatch로 로그 전송** (기본으로는 로그 전송 안됨)
- IAM 권한 필요
- **CloudWatch Logs Agent** (구버전): CloudWatch Logs만 전송
- **CloudWatch Unified Agent** (신버전):
  - **추가 시스템 메트릭** 수집: RAM, Processes, Disk, Netstat, Swap Space
  - CloudWatch Logs 전송
  - **SSM Parameter Store**로 중앙 설정 관리
  - 기본 EC2 메트릭: Disk, CPU, Network (상위 수준만)

### CloudWatch Alarms
- 메트릭에 대한 **알림 트리거**
- 알람 상태: **OK, INSUFFICIENT_DATA, ALARM**
- Period: 메트릭 평가 시간 (고해상도: 10초/30초/60초 배수)

#### Alarm Targets
- EC2 인스턴스: **Stop, Terminate, Reboot, Recover**
- Auto Scaling Action
- **SNS 알림** (SNS에서 다양한 작업 수행 가능)

#### Composite Alarms
- **여러 알람 상태를 모니터링**하는 복합 알람
- **AND/OR 조건** 지원
- "알람 노이즈" 줄이는 데 유용

#### EC2 Instance Recovery
- Status Check: Instance status, System status, EBS status
- **Recovery**: 동일한 Private/Public/Elastic IP, 메타데이터, Placement Group 유지

#### Alarm 추가 정보
- CloudWatch Logs **Metrics Filters** 기반으로 알람 생성 가능
- CLI로 알람 테스트: `aws cloudwatch set-alarm-state`

### CloudWatch Network Synthetic Monitor
- AWS와 온프레미스 간 **네트워크 이슈 모니터링/탐지**
- 네트워크 성능 저하 식별 (패킷 손실, 지연, 지터)
- **에이전트 불필요**
- ICMP/TCP 트래픽 테스트 (Direct Connect/S2S VPN 연결)
- CloudWatch Metrics에 데이터 게시

### Amazon EventBridge (CloudWatch Events 후속)

```text
┌─────────────────────────────────────────────────────────────────┐
│                  EventBridge 아키텍처                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [이벤트 소스]            [Event Bus]         [대상 (Targets)]   │
│                                                                 │
│  ┌───────────┐       ┌──────────────┐                           │
│  │ AWS 서비스 │──────▶│  Default     │    ┌──────────┐          │
│  │ (EC2,S3..)│       │  Event Bus   │───▶│ Lambda   │          │
│  └───────────┘       └──────────────┘    │ SQS/SNS  │          │
│                                          │ Step Func │          │
│  ┌───────────┐       ┌──────────────┐    │ KDS      │          │
│  │ SaaS      │──────▶│  Partner     │───▶│ ECS Task │          │
│  │ (Zendesk  │       │  Event Bus   │    └──────────┘          │
│  │  Datadog) │       └──────────────┘                           │
│  └───────────┘                                                  │
│                      ┌──────────────┐    ┌──────────┐          │
│  ┌───────────┐       │  Custom      │    │ 다른 계정 │          │
│  │ Custom App│──────▶│  Event Bus   │───▶│ Event Bus│          │
│  └───────────┘       └──────────────┘    └──────────┘          │
│                                                                 │
│  ┌───────────┐       ┌──────────────┐                           │
│  │ Schedule  │──────▶│  Cron /      │───▶ Lambda / 기타         │
│  │ (Cron)    │       │  Rate Rule   │                           │
│  └───────────┘       └──────────────┘                           │
│                                                                 │
│  + 이벤트 아카이빙 & 재생 | Schema Registry | Resource Policy   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

- **Schedule**: Cron 작업 (예: 매시간 Lambda 트리거)
- **Event Pattern**: 서비스 이벤트 반응 규칙 (예: IAM Root User 로그인 -> SNS)
- 대상: Lambda, SQS, SNS, Kinesis Data Streams, Step Functions, CodePipeline, ECS Task 등

#### EventBridge 주요 기능
- **Event Bus 유형**: Default (AWS 서비스), Partner (SaaS), Custom (커스텀 앱)
- **Resource-based Policies**: 다른 계정/리전에서 이벤트 허용/거부
- **이벤트 아카이빙** (전체/필터), **아카이브된 이벤트 재생** 가능
- **Schema Registry**: 이벤트 스키마 추론, 코드 생성, 버전 관리
- 사용 사례: Organization 전체 이벤트를 단일 계정/리전에 집계

### CloudWatch Insights

#### Container Insights
- 컨테이너의 메트릭/로그 수집, 집계, 요약
- ECS, EKS, Kubernetes on EC2, Fargate
- EKS/Kubernetes: 컨테이너화된 CloudWatch Agent 사용

#### Lambda Insights
- 서버리스 애플리케이션 모니터링/트러블슈팅
- CPU, 메모리, 디스크, 네트워크 메트릭 + Cold Start, Worker Shutdown 진단
- **Lambda Layer**로 제공

#### Contributor Insights
- 로그 데이터 분석하여 **Top-N 기여자** 식별
- VPC Flow Logs, DNS 등 AWS 생성 로그 분석
- 사용 사례: 상위 네트워크 사용자, 에러 발생 URL 식별

#### Application Insights
- 모니터링 대상 애플리케이션의 **자동 대시보드** 제공
- EC2 (Java, .NET, IIS 등) + EBS, RDS, ELB, ASG, Lambda, SQS, DynamoDB 등
- **SageMaker 기반**
- 발견/알림은 EventBridge 및 SSM OpsCenter로 전송

### AWS CloudTrail
> **왜 필요한가?** — "AWS에서 누가 무엇을 했는지" 기록하는 CCTV. 예를 들어 누군가 실수로 DB를 삭제했을 때, CloudTrail을 보면 언제, 누가, 어떤 명령으로 삭제했는지 추적할 수 있다.

```text
┌─────────────────────────────────────────────────────────────────┐
│                CloudTrail 이벤트 흐름                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐  API 호출   ┌─────────────┐                      │
│  │ Console  │────────────▶│             │                      │
│  │ CLI      │             │ CloudTrail  │                      │
│  │ SDK      │             │             │                      │
│  │ Service  │             │ (90일 보존) │                      │
│  └──────────┘             └──────┬──────┘                      │
│                                  │                              │
│            ┌─────────────────────┼───────────────┐              │
│            │                     │               │              │
│            ▼                     ▼               ▼              │
│  ┌──────────────┐    ┌────────────────┐  ┌─────────────┐      │
│  │ Management   │    │ Data Events    │  │ Insights    │      │
│  │ Events       │    │ (기본 미활성화) │  │ Events      │      │
│  │ (기본 로깅)   │    │                │  │ (비정상     │      │
│  │              │    │ S3 GetObject   │  │  활동 탐지)  │      │
│  │ IAM, EC2 등  │    │ Lambda Invoke  │  │             │      │
│  └──────┬───────┘    └───────┬────────┘  └──────┬──────┘      │
│         │                    │                   │              │
│         └────────────┬───────┘                   │              │
│                      ▼                           ▼              │
│              ┌──────────────┐          ┌──────────────┐        │
│              │ S3 (장기)    │          │ EventBridge  │        │
│              │ + Athena     │          │ (자동 대응)   │        │
│              │   (분석)     │          │ -> SNS/Lambda│        │
│              └──────────────┘          └──────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

- AWS 계정의 **거버넌스, 규정 준수, 감사**
- **기본 활성화**
- Console, SDK, CLI, AWS 서비스의 **API 호출 이력** 기록
- 로그를 CloudWatch Logs 또는 S3에 저장
- 모든 리전 (기본) 또는 단일 리전에 적용
- **리소스 삭제 시 CloudTrail 먼저 조사!**

#### CloudTrail Events 유형
- **Management Events** (기본 로깅):
  - 리소스 작업 (IAM AttachRolePolicy, EC2 CreateSubnet, CloudTrail CreateTrail)
  - Read Events / Write Events 분리 가능
- **Data Events** (기본 미로깅, 대량 작업):
  - S3 객체 수준 활동 (GetObject, DeleteObject, PutObject)
  - Lambda 함수 실행 (Invoke API)
- **Insights Events**: 비정상 활동 탐지

#### CloudTrail Insights
- 비정상 활동 탐지: 부정확한 리소스 프로비저닝, 서비스 한도 초과, IAM 작업 급증 등
- 정상 Management Events 기반 **베이스라인** 생성 -> Write Events 분석
- 이상 징후: CloudTrail 콘솔, S3, EventBridge에 전송

#### CloudTrail Events 보존
- **90일** CloudTrail에 저장
- 장기 보존: **S3에 로깅 -> Athena로 분석**

#### EventBridge + CloudTrail 통합
- API 호출을 가로채 EventBridge에서 처리
- 예: DynamoDB DeleteTable -> CloudTrail -> EventBridge -> SNS
- 예: Security Group 수정 -> CloudTrail -> EventBridge -> SNS

### AWS Config
> **왜 필요한가?** — "리소스 설정이 회사 규칙에 맞는지 자동으로 검사하는 감사관". 예를 들어 "S3 버킷은 반드시 암호화되어야 한다"는 규칙을 설정해두면, 암호화되지 않은 버킷이 생길 때 자동으로 알림을 보내거나 교정할 수 있다.
- AWS 리소스의 **감사 및 규정 준수 기록**
- 구성 변경 및 시간 경과에 따른 이력 기록
- 질문 예: 보안 그룹에 제한 없는 SSH 접근? 버킷에 퍼블릭 접근? ALB 구성 변경?
- SNS 알림으로 변경 알림
- **리전별 서비스**, 리전/계정 간 집계 가능
- S3에 구성 데이터 저장 (Athena 분석)

#### Config Rules
- AWS 관리형 규칙 (75개+) 또는 Lambda로 커스텀 규칙
- 트리거: 구성 변경 시 / 정기적 간격
- **Config Rules는 작업을 차단하지 않음 (deny 불가)**
- 가격: 무료 티어 없음, 기록당 $0.003, 규칙 평가당 $0.001

#### Config Remediations
- **SSM Automation Documents**로 비준수 리소스 자동 교정
- AWS 관리형 또는 커스텀 Automation Documents
- Lambda 함수 호출 가능
- **Remediation Retries** 설정 가능

#### Config Notifications
- **EventBridge**: 비준수 시 Lambda, SNS, SQS 트리거
- **SNS**: 구성 변경 및 규정 준수 상태 알림 (모든 이벤트, SNS 필터링 또는 클라이언트 측 필터링)

### CloudWatch vs CloudTrail vs Config 비교

```text
┌─────────────────────────────────────────────────────────────┐
│        CloudWatch vs CloudTrail vs Config 역할 구분           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  "무슨 일이 일어나고 있나?"     ──▶  CloudWatch              │
│   (성능 메트릭, 로그, 알람)          │                       │
│                                     ▼                       │
│                              ┌──────────────┐               │
│                              │ CPU 80% 초과 │               │
│                              │ -> SNS 알림  │               │
│                              └──────────────┘               │
│                                                             │
│  "누가 무엇을 했나?"          ──▶  CloudTrail               │
│   (API 호출 감사)                   │                       │
│                                     ▼                       │
│                              ┌──────────────┐               │
│                              │ 누가 SG를    │               │
│                              │ 변경했는가?  │               │
│                              └──────────────┘               │
│                                                             │
│  "리소스 설정이 올바른가?"    ──▶  Config                    │
│   (구성 규정 준수)                  │                       │
│                                     ▼                       │
│                              ┌──────────────┐               │
│                              │ S3 암호화    │               │
│                              │ 활성화됐나?  │               │
│                              │ -> 자동 교정 │               │
│                              └──────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| 기준 | CloudWatch | CloudTrail | Config |
|------|-----------|------------|--------|
| 목적 | 성능 모니터링 & 알림 | API 호출 기록/감사 | 리소스 구성 변경 기록/규정 준수 |
| 핵심 기능 | 메트릭, 로그, 알람, 대시보드 | 누가 무엇을 했는지 | 리소스 구성 이력, 규칙 평가 |
| ELB 예시 | 연결 수 메트릭, 에러 코드 비율, 성능 대시보드 | 누가 LB 변경했는지 API 추적 | SG 규칙/구성 변경 추적, SSL 인증서 규정 준수 |

## 시험 포인트
- **"성능 모니터링, 메트릭, 알람"** = CloudWatch
- **"누가 무엇을 했는지, API 감사"** = CloudTrail
- **"리소스 구성 변경, 규정 준수"** = Config
- CloudWatch Logs S3 Export는 **12시간 소요** (실시간이 아님) -> 실시간은 Subscription Filter 사용
- CloudWatch Unified Agent: RAM, Disk, Processes 등 **추가 메트릭** 수집 (기본 EC2 메트릭에 없음)
- CloudTrail Events는 **90일만 저장** -> 장기 보존은 S3 + Athena
- CloudTrail Data Events는 **기본 미활성화** (S3 객체/Lambda Invoke)
- Config Rules는 **차단하지 않음** (사후 평가), 교정은 SSM Automation
- Composite Alarms: 여러 알람의 AND/OR 조합 (알람 노이즈 감소)
- EventBridge: CloudTrail API 호출을 가로채 자동화 (보안 이벤트 대응)
- Config + EventBridge: 비준수 리소스 자동 대응
- CloudWatch Container Insights: ECS/EKS/Fargate 모니터링

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| CloudWatch Metrics | AWS 서비스 메트릭, Custom Metrics, 대시보드 |
| CloudWatch Metric Streams | 메트릭 근실시간 스트리밍 (Firehose/3rd party) |
| CloudWatch Logs | 로그 수집/분석, Subscription Filter로 실시간 전송 |
| CloudWatch Logs Insights | 로그 쿼리 엔진, 다중 계정/Log Group 지원 |
| CloudWatch Unified Agent | EC2/온프레미스 추가 메트릭 (RAM 등) + 로그 수집 |
| CloudWatch Alarms | 메트릭 기반 알림, EC2 액션, ASG, SNS |
| Composite Alarms | 다중 알람 AND/OR 조합 |
| EventBridge | 이벤트 기반 자동화, Schedule/Pattern, 아카이빙/재생 |
| CloudTrail | API 감사, Management/Data/Insights Events, 90일 보존 |
| Config | 리소스 구성 규정 준수, Rules, SSM 자동 교정, deny 불가 |
| Container Insights | ECS/EKS/Fargate 메트릭/로그 |
| Lambda Insights | Lambda 상세 메트릭, Lambda Layer |
| Contributor Insights | Top-N 기여자 분석 |
| Application Insights | 애플리케이션 자동 대시보드 (SageMaker 기반) |

---

## Practice Questions

### Q1. A company needs to monitor the memory utilization of their EC2 instances and trigger an alarm when it exceeds 80%. The default CloudWatch metrics do not include memory. What should they do?
**Options:**
- A) Enable detailed monitoring on the EC2 instances
- B) Install the CloudWatch Unified Agent on the instances
- C) Use CloudWatch Logs Insights to query memory data
- D) Enable CloudWatch Container Insights

**Answer:** B

**해설:**

> **문제:** 한 회사가 EC2 인스턴스의 메모리 사용률을 모니터링하고 80%를 초과하면 알람을 트리거해야 한다. 기본 CloudWatch 메트릭에는 메모리가 포함되지 않는다. 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스에서 상세 모니터링 활성화 |
| B | 인스턴스에 CloudWatch Unified Agent 설치 |
| C | CloudWatch Logs Insights로 메모리 데이터 쿼리 |
| D | CloudWatch Container Insights 활성화 |

**(A)** : Detailed monitoring은 기본 메트릭(CPU, Network 등)의 수집 간격을 5분에서 1분으로 높일 뿐이다. 새로운 메트릭(RAM)을 추가하지 않는다.

**(B) 정답** : 기본 EC2 CloudWatch 메트릭에는 RAM/메모리가 포함되지 않는다. CloudWatch Unified Agent를 설치하면 RAM, Disk, Processes, Swap Space 등 추가 시스템 메트릭을 수집할 수 있다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C)** : Logs Insights는 로그 데이터를 쿼리하는 엔진이다. 메트릭을 수집하는 도구가 아니다. → [📖 CloudWatch Insights](/section/22-monitoring-audit-performance#cloudwatch-insights)

**(D)** : Container Insights는 ECS/EKS/Fargate 컨테이너 모니터링용이다. 일반 EC2 인스턴스의 메모리 수집과 관련이 없다.

**핵심 개념:** CloudWatch Unified Agent

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics), [CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

### Q2. A security team needs to be notified immediately when someone modifies a security group in their AWS account. Which solution provides this capability?
**Options:**
- A) AWS Config with SNS notification
- B) CloudWatch Alarms on security group metrics
- C) CloudTrail with Amazon EventBridge rule
- D) VPC Flow Logs analysis

**Answer:** C

**해설:**

> **문제:** 보안 팀이 AWS 계정에서 누군가 보안 그룹을 수정할 때 즉시 알림을 받아야 한다. 어떤 솔루션이 이 기능을 제공하는가?

| 선지 | 번역 |
|------|------|
| A | SNS 알림과 함께 AWS Config |
| B | 보안 그룹 메트릭에 대한 CloudWatch Alarms |
| C | Amazon EventBridge 규칙과 함께 CloudTrail |
| D | VPC Flow Logs 분석 |

**(A)** : Config도 구성 변경을 추적하지만 변경 기록/규정 준수 평가에 초점이 있다. 즉각적인 API 호출 알림에는 CloudTrail + EventBridge가 더 적합하다.

**(B)** : CloudWatch는 성능 메트릭 모니터링용이다. 보안 그룹 수정은 메트릭이 아니라 API 호출이므로 CloudWatch Alarms로 감지할 수 없다.

**(C) 정답** : 보안 그룹 수정은 API 호출(AuthorizeSecurityGroupIngress 등)이므로 CloudTrail이 기록한다. EventBridge 규칙을 설정하면 해당 API 호출 이벤트 발생 시 즉시 SNS 등으로 알림을 보낼 수 있다. → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(D)** : VPC Flow Logs는 네트워크 트래픽을 기록하는 것이다. 보안 그룹 구성 변경 추적과 무관하다. → [📖 CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

**핵심 개념:** CloudTrail + EventBridge

**관련 노트:** [AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail), [Amazon EventBridge CloudWatch Events 후속](/section/22-monitoring-audit-performance#amazon-eventbridge-cloudwatch-events-후속)

### Q3. A company wants to export CloudWatch Logs to S3 for long-term archival but needs the data to be available within minutes. What should they use?
**Options:**
- A) CreateExportTask API
- B) CloudWatch Logs Subscription Filter with Kinesis Data Firehose
- C) CloudWatch Logs Insights query to S3
- D) CloudWatch Metric Streams

**Answer:** B

**해설:**

> **문제:** 한 회사가 장기 보관을 위해 CloudWatch Logs를 S3로 내보내려 하지만 데이터가 수분 내에 사용 가능해야 한다. 무엇을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | CreateExportTask API |
| B | Kinesis Data Firehose와 함께 CloudWatch Logs Subscription Filter |
| C | CloudWatch Logs Insights 쿼리를 S3로 전송 |
| D | CloudWatch Metric Streams |

**(A)** : CreateExportTask는 로그를 S3로 내보내는 데 최대 12시간이 소요된다. 수분 내 데이터 사용 요구사항을 충족하지 못한다. → [📖 CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

**(B) 정답** : Subscription Filter를 Kinesis Data Firehose와 함께 사용하면 근실시간(약 1분)으로 로그를 S3에 전송할 수 있다. 수분 내 데이터 사용이 가능하다. → [📖 CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

**(C)** : Logs Insights는 로그 데이터를 검색/분석하는 쿼리 엔진이다. 로그를 S3로 전송하는 도구가 아니다.

**(D)** : Metric Streams는 CloudWatch 메트릭을 스트리밍하는 것이다. 로그를 전송하는 것이 아니다.

**핵심 개념:** CloudWatch Logs Subscriptions / S3 Export

**관련 노트:** [CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

### Q4. A company uses AWS Config to ensure all their S3 buckets have encryption enabled. When a non-compliant bucket is found, they want it to be automatically remediated. How should they configure this?
**Options:**
- A) Use AWS Config Rules with deny policy to prevent unencrypted buckets
- B) Use AWS Config Rules with SSM Automation Documents for auto-remediation
- C) Use CloudWatch Alarms to trigger Lambda for remediation
- D) Use CloudTrail to detect and revert changes

**Answer:** B

**해설:**

> **문제:** 한 회사가 AWS Config을 사용하여 모든 S3 버킷에 암호화가 활성화되어 있는지 확인하고 있다. 비준수 버킷이 발견되면 자동으로 교정하고 싶다. 어떻게 구성해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 비암호화 버킷을 방지하기 위해 AWS Config Rules에 deny 정책 사용 |
| B | 자동 교정을 위해 AWS Config Rules에 SSM Automation Documents 사용 |
| C | 교정을 위해 CloudWatch Alarms로 Lambda 트리거 |
| D | CloudTrail을 사용하여 변경 탐지 및 되돌리기 |

**(A)** : Config Rules는 deny 기능이 없다. Config은 사후 평가 도구이며 리소스 생성/변경을 차단하지 않는다.

**(B) 정답** : AWS Config Rules는 비준수 리소스를 탐지하지만 작업을 차단(deny)하지 않는다. 대신 SSM Automation Documents를 사용하여 비준수 리소스를 자동 교정할 수 있으며 교정 재시도(Remediation Retries)도 설정 가능하다. → [📖 AWS Config](/section/22-monitoring-audit-performance#aws-config)

**(C)** : CloudWatch Alarms로 Lambda를 트리거하는 것은 가능하지만 Config의 내장 교정 기능(SSM Automation)에 비해 최적화되지 않은 방법이다.

**(D)** : CloudTrail은 API 호출 감사 서비스이다. 변경을 자동으로 되돌리는 기능이 없다.

**핵심 개념:** AWS Config Rules / Remediations

**관련 노트:** [AWS Config](/section/22-monitoring-audit-performance#aws-config)

### Q5. A company wants to detect unusual API activity in their AWS account, such as a sudden burst of IAM actions or inaccurate resource provisioning. Which feature should they enable?
**Options:**
- A) CloudWatch Application Insights
- B) CloudTrail Insights
- C) AWS Config Rules
- D) CloudWatch Contributor Insights

**Answer:** B

**해설:**

> **문제:** 한 회사가 AWS 계정에서 IAM 작업의 갑작스러운 급증이나 부정확한 리소스 프로비저닝 같은 비정상적인 API 활동을 탐지하고 싶다. 어떤 기능을 활성화해야 하는가?

| 선지 | 번역 |
|------|------|
| A | CloudWatch Application Insights |
| B | CloudTrail Insights |
| C | AWS Config Rules |
| D | CloudWatch Contributor Insights |

**(A)** : CloudWatch Application Insights는 애플리케이션(Java, .NET 등)의 자동 대시보드와 트러블슈팅 서비스이다. API 활동 분석과 무관하다. → [📖 CloudWatch Insights](/section/22-monitoring-audit-performance#cloudwatch-insights)

**(B) 정답** : CloudTrail Insights는 정상적인 Management Events 패턴을 학습하여 베이스라인을 만들고 Write Events에서 비정상적 활동(IAM 작업 급증, 리소스 프로비저닝 오류, 서비스 한도 초과 등)을 탐지한다. 이상 징후는 CloudTrail 콘솔, S3, EventBridge로 전송된다. → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(C)** : AWS Config Rules는 리소스 구성 규정 준수 평가 도구이다. 비정상 API 패턴 탐지와 무관하다.

**(D)** : CloudWatch Contributor Insights는 로그 데이터에서 Top-N 기여자를 식별하는 분석 도구이다. 비정상 API 활동 탐지가 아니다. → [📖 CloudWatch Insights](/section/22-monitoring-audit-performance#cloudwatch-insights)

**핵심 개념:** CloudTrail Insights

**관련 노트:** [AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

### Q6. An organization needs to aggregate CloudWatch Logs from multiple AWS accounts and regions into a single destination for centralized analysis. Which approach should they use?
**Options:**
- A) Enable CloudWatch cross-account dashboards
- B) Use CloudWatch Logs Subscription Filters with Kinesis Data Streams
- C) Export logs from each account to a shared S3 bucket
- D) Use AWS Config aggregator

**Answer:** B

**해설:**

> **문제:** 한 조직이 여러 AWS 계정과 리전의 CloudWatch Logs를 단일 대상으로 집계하여 중앙 집중식 분석을 해야 한다. 어떤 접근 방식을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | CloudWatch 크로스 계정 대시보드 활성화 |
| B | Kinesis Data Streams와 함께 CloudWatch Logs Subscription Filters 사용 |
| C | 각 계정에서 공유 S3 버킷으로 로그 내보내기 |
| D | AWS Config aggregator 사용 |

**(A)** : 크로스 계정 대시보드는 시각화를 위한 것이다. 로그 데이터를 물리적으로 집계하지 않는다.

**(B) 정답** : CloudWatch Logs Subscription Filter를 사용하면 여러 계정과 리전의 로그를 근실시간으로 Kinesis Data Streams 또는 Kinesis Data Firehose로 집계할 수 있다. Cross-Account Subscription으로 다른 계정의 리소스에 로그를 전송하고 최종적으로 S3에 저장할 수 있다. → [📖 CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

**(C)** : S3 Export(CreateExportTask)는 최대 12시간이 소요되어 비실시간이다. 중앙 집중식 분석에 비효율적이다.

**(D)** : AWS Config aggregator는 리소스 구성 변경을 집계하는 것이다. CloudWatch 로그를 집계하는 것이 아니다.

**핵심 개념:** CloudWatch Logs Subscriptions / Multi-Account Aggregation

**관련 노트:** [CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs), [Amazon EventBridge CloudWatch Events 후속](/section/22-monitoring-audit-performance#amazon-eventbridge-cloudwatch-events-후속)

### Q7. For an Elastic Load Balancer, which service would you use to track the CONFIGURATION changes and ensure an SSL certificate is always assigned?
**Options:**
- A) Amazon CloudWatch
- B) AWS CloudTrail
- C) AWS Config
- D) Amazon EventBridge

**Answer:** C

**해설:**

> **문제:** Elastic Load Balancer의 구성 변경을 추적하고 SSL 인증서가 항상 할당되어 있는지 확인하려면 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon CloudWatch |
| B | AWS CloudTrail |
| C | AWS Config |
| D | Amazon EventBridge |

**(A)** : CloudWatch는 성능 메트릭 모니터링(연결 수, 에러율 등)용이다. 구성 변경 추적과 규정 준수 평가가 아니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : CloudTrail은 "누가" API를 호출하여 LB를 변경했는지 감사하는 것이다. 구성이 올바른지(SSL 인증서 존재 여부) 평가하는 것이 아니다. → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(C) 정답** : AWS Config은 리소스의 구성 변경을 추적하고 규정 준수 규칙을 평가한다. SSL 인증서가 항상 할당되어 있는지 확인하는 것은 규정 준수(compliance) 검사로 Config Rules의 영역이다. → [📖 AWS Config](/section/22-monitoring-audit-performance#aws-config)

**(D)** : EventBridge는 이벤트 기반 자동화 서비스이다. 구성 규정 준수 평가 기능이 아니다.

**핵심 개념:** CloudWatch vs CloudTrail vs Config

**관련 노트:** [CloudWatch vs CloudTrail vs Config 비교](/section/22-monitoring-audit-performance#cloudwatch-vs-cloudtrail-vs-config-비교), [AWS Config](/section/22-monitoring-audit-performance#aws-config)

### Q8. A company wants to reduce alarm noise by only triggering notifications when BOTH CPU utilization exceeds 80% AND disk IOPS exceed a threshold on the same EC2 instance. Which CloudWatch feature should they use?
**Options:**
- A) CloudWatch Metrics Math
- B) CloudWatch Composite Alarms
- C) CloudWatch Contributor Insights
- D) CloudWatch Anomaly Detection

**Answer:** B

**해설:**

> **문제:** 한 회사가 동일한 EC2 인스턴스에서 CPU 사용률이 80%를 초과하고 디스크 IOPS가 임계값을 초과할 때만 알림을 트리거하여 알람 노이즈를 줄이고 싶다. 어떤 CloudWatch 기능을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | CloudWatch Metrics Math |
| B | CloudWatch Composite Alarms |
| C | CloudWatch Contributor Insights |
| D | CloudWatch Anomaly Detection |

**(A)** : Metrics Math는 여러 메트릭을 수학적으로 결합하여 새 메트릭을 만드는 기능이다. 알람 조건을 AND/OR로 조합하는 것이 아니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B) 정답** : CloudWatch Composite Alarms는 여러 개별 알람의 상태를 AND/OR 조건으로 모니터링하는 복합 알람을 생성한다. CPU 알람과 IOPS 알람을 AND 조건으로 묶으면 둘 다 ALARM 상태일 때만 알림이 트리거되어 알람 노이즈를 줄일 수 있다. → [📖 CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(C)** : Contributor Insights는 로그 데이터에서 Top-N 기여자를 식별하는 분석 도구이다. 알람 조합과 무관하다.

**(D)** : Anomaly Detection은 메트릭의 비정상 패턴을 자동 탐지하는 기능이다. 여러 알람을 AND/OR로 조합하는 것이 아니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** CloudWatch Composite Alarms

**관련 노트:** [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)
