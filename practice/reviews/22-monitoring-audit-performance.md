# Section 22 - Monitoring, Audit, Performance 연습문제 해설

---

### Q1. A company needs to monitor memory utilization of EC2 instances and trigger an alarm when it exceeds 80%. Default CloudWatch metrics don't include memory. What should they do?

**한글 번역:** 회사가 EC2 인스턴스의 메모리 사용률을 모니터링하고 80%를 초과할 때 알람을 트리거해야 합니다. 기본 CloudWatch 지표에는 메모리가 포함되어 있지 않습니다. 어떻게 해야 할까요?

**선지:**
- A) Enable detailed monitoring → 세부 모니터링 활성화
- B) Install CloudWatch Unified Agent → CloudWatch 통합 에이전트 설치
- C) Use CloudWatch Logs Insights → CloudWatch Logs Insights 사용
- D) Enable Container Insights → Container Insights 활성화

**정답:** B

**선지별 해설:**
- **A) Enable detailed monitoring:** 오답. 세부 모니터링(Detailed Monitoring)은 CloudWatch 지표 수집 주기를 5분에서 1분으로 줄여주는 기능입니다. 하지만 수집하는 지표의 종류를 변경하지는 않습니다. CPU, 네트워크, 디스크 I/O는 제공하지만, 메모리와 디스크 사용량은 여전히 수집되지 않습니다.
- **B) Install CloudWatch Unified Agent:** 정답. CloudWatch Unified Agent를 EC2 인스턴스에 설치하면 메모리 사용률, 디스크 사용률 등 OS 수준의 커스텀 지표를 CloudWatch로 전송할 수 있습니다. 기본 CloudWatch 지표는 하이퍼바이저 수준에서 수집되므로 메모리 정보를 포함하지 않으며, 에이전트를 통해서만 이 데이터를 수집할 수 있습니다.
- **C) CloudWatch Logs Insights:** 오답. Logs Insights는 CloudWatch Logs에 저장된 로그 데이터를 쿼리하고 분석하는 도구입니다. 메모리 사용률 지표를 수집하는 기능이 아닙니다.
- **D) Enable Container Insights:** 오답. Container Insights는 ECS, EKS, Kubernetes 등 컨테이너 워크로드의 모니터링을 위한 기능입니다. 일반 EC2 인스턴스의 메모리 모니터링에는 해당되지 않습니다.

**핵심 개념:** CloudWatch Unified Agent - EC2 OS 수준 지표(메모리, 디스크) 수집

---

### Q2. A security team needs immediate notification when someone modifies a security group. Which solution is most appropriate?

**한글 번역:** 보안 팀이 누군가 보안 그룹을 수정할 때 즉시 알림을 받아야 합니다. 가장 적합한 솔루션은 무엇일까요?

**선지:**
- A) AWS Config with SNS → SNS와 함께 사용하는 AWS Config
- B) CloudWatch Alarms on security group metrics → 보안 그룹 지표에 대한 CloudWatch 알람
- C) CloudTrail with Amazon EventBridge rule → Amazon EventBridge 규칙과 함께 사용하는 CloudTrail
- D) VPC Flow Logs → VPC 흐름 로그

**정답:** C

**선지별 해설:**
- **A) AWS Config with SNS:** 오답. AWS Config는 리소스 구성 변경을 기록하고 규정 준수를 평가할 수 있지만, 변경 감지에 지연이 있을 수 있습니다. Config 규칙 평가 주기에 따라 "즉시" 알림이 보장되지 않습니다. 또한 Config는 구성 상태를 추적하는 것이 주 목적이고, 실시간 이벤트 알림에는 EventBridge가 더 적합합니다.
- **B) CloudWatch Alarms on security group metrics:** 오답. 보안 그룹 수정에 대한 CloudWatch 지표(metric)는 존재하지 않습니다. CloudWatch Alarms는 수치 지표에 대해 작동하며, API 호출 이벤트를 모니터링하는 데는 적합하지 않습니다.
- **C) CloudTrail with Amazon EventBridge rule:** 정답. CloudTrail은 모든 AWS API 호출을 기록합니다. 보안 그룹 수정(AuthorizeSecurityGroupIngress, RevokeSecurityGroupIngress 등)도 API 호출이므로 CloudTrail에 기록됩니다. EventBridge를 사용하면 특정 CloudTrail API 이벤트에 대한 규칙을 생성하여, 보안 그룹 수정 시 즉시 SNS 알림이나 Lambda 함수를 트리거할 수 있습니다.
- **D) VPC Flow Logs:** 오답. VPC Flow Logs는 네트워크 인터페이스를 통과하는 IP 트래픽을 기록합니다. 보안 그룹의 구성 변경과는 관련이 없으며, 네트워크 트래픽 패턴을 분석하는 용도입니다.

**핵심 개념:** CloudTrail + EventBridge - API 호출 기반 실시간 이벤트 모니터링 및 알림

---

### Q3. A company wants to export CloudWatch Logs to S3 for long-term archival but needs data available within minutes. What should they use?

**한글 번역:** 회사가 장기 보관을 위해 CloudWatch Logs를 S3로 내보내고 싶지만, 몇 분 이내에 데이터가 사용 가능해야 합니다. 무엇을 사용해야 할까요?

**선지:**
- A) CreateExportTask API → CreateExportTask API
- B) CloudWatch Logs Subscription Filter with Kinesis Data Firehose → Kinesis Data Firehose를 사용한 CloudWatch Logs 구독 필터
- C) CloudWatch Logs Insights query to S3 → S3로의 CloudWatch Logs Insights 쿼리
- D) CloudWatch Metric Streams → CloudWatch Metric Streams

**정답:** B

**선지별 해설:**
- **A) CreateExportTask API:** 오답. CreateExportTask API를 사용하여 CloudWatch Logs를 S3로 내보낼 수 있지만, 이 방식은 데이터가 사용 가능해지기까지 최대 12시간이 걸릴 수 있습니다. "몇 분 이내"라는 요구사항을 충족하지 못합니다. 또한 실시간이 아닌 배치 방식입니다.
- **B) CloudWatch Logs Subscription Filter with Kinesis Data Firehose:** 정답. 구독 필터(Subscription Filter)를 사용하면 CloudWatch Logs에 도착하는 로그 데이터를 실시간으로 Kinesis Data Firehose에 전달할 수 있습니다. Firehose는 데이터를 버퍼링하여 S3에 거의 실시간(near real-time, 최소 60초 버퍼)으로 전달합니다. 몇 분 이내에 S3에서 데이터를 사용할 수 있습니다.
- **C) CloudWatch Logs Insights query to S3:** 오답. Logs Insights는 로그 데이터를 대화형으로 쿼리하고 분석하는 도구입니다. 쿼리 결과를 내보낼 수 있지만, 자동으로 지속적으로 S3에 데이터를 전달하는 기능이 아닙니다.
- **D) CloudWatch Metric Streams:** 오답. Metric Streams는 CloudWatch 지표(Metrics)를 실시간으로 스트리밍하는 기능입니다. 로그(Logs)가 아닌 지표에 대한 기능이므로, CloudWatch Logs를 S3로 내보내는 것과는 관련이 없습니다.

**핵심 개념:** CloudWatch Logs Subscription Filter + Kinesis Data Firehose - 로그 실시간 S3 전달

---

### Q4. A company uses AWS Config to ensure S3 buckets have encryption. When a non-compliant bucket is found, they want automatic remediation. How should they implement this?

**한글 번역:** 회사가 AWS Config를 사용하여 S3 버킷에 암호화가 설정되어 있는지 확인합니다. 비준수 버킷이 발견되면 자동 교정을 원합니다. 어떻게 구현해야 할까요?

**선지:**
- A) AWS Config Rules with deny policy → 거부 정책을 사용한 AWS Config 규칙
- B) AWS Config Rules with SSM Automation Documents for auto-remediation → 자동 교정을 위한 SSM 자동화 문서와 함께 사용하는 AWS Config 규칙
- C) CloudWatch Alarms to trigger Lambda → Lambda를 트리거하는 CloudWatch 알람
- D) CloudTrail to detect and revert → 감지 및 되돌리기를 위한 CloudTrail

**정답:** B

**선지별 해설:**
- **A) AWS Config Rules with deny policy:** 오답. AWS Config 규칙은 리소스가 규정을 준수하는지 평가하는 역할만 합니다. "거부 정책(deny policy)"을 Config 규칙에 직접 연결하는 기능은 없습니다. IAM 정책이나 SCP로 비암호화 버킷 생성을 차단할 수는 있지만, 이는 이미 존재하는 비준수 버킷을 교정하지 못합니다.
- **B) AWS Config Rules with SSM Automation Documents for auto-remediation:** 정답. AWS Config 규칙에 자동 교정(Auto Remediation) 기능을 설정할 수 있습니다. 비준수 리소스가 감지되면 SSM(Systems Manager) 자동화 문서(Automation Document/Runbook)가 자동으로 실행되어 교정 작업을 수행합니다. 예를 들어, 비암호화 S3 버킷에 자동으로 암호화를 활성화할 수 있습니다.
- **C) CloudWatch Alarms to trigger Lambda:** 오답. CloudWatch Alarms는 수치 지표 기반으로 작동하며, AWS Config 규정 준수 상태와 직접 연결되지 않습니다. Lambda를 통한 교정은 가능하지만, Config의 내장 자동 교정 기능을 사용하는 것이 더 간편하고 권장되는 방법입니다.
- **D) CloudTrail to detect and revert:** 오답. CloudTrail은 API 호출을 기록하는 감사 서비스입니다. 비준수 상태를 감지하고 자동으로 되돌리는 기능이 내장되어 있지 않습니다.

**핵심 개념:** AWS Config Auto Remediation + SSM Automation Documents - 자동 규정 준수 교정

---

### Q5. A company wants to detect unusual API activity like a sudden burst of IAM actions. Which feature should they use?

**한글 번역:** 회사가 IAM 작업의 갑작스러운 급증과 같은 비정상적인 API 활동을 감지하고 싶습니다. 어떤 기능을 사용해야 할까요?

**선지:**
- A) CloudWatch Application Insights → CloudWatch Application Insights
- B) CloudTrail Insights → CloudTrail Insights
- C) AWS Config Rules → AWS Config 규칙
- D) CloudWatch Contributor Insights → CloudWatch Contributor Insights

**정답:** B

**선지별 해설:**
- **A) CloudWatch Application Insights:** 오답. Application Insights는 .NET 및 SQL Server 등의 애플리케이션 스택에서 발생하는 문제를 자동으로 감지하고 진단하는 기능입니다. API 호출 패턴의 이상 감지와는 관련이 없습니다.
- **B) CloudTrail Insights:** 정답. CloudTrail Insights는 CloudTrail에 기록된 관리 이벤트(Management Events)를 분석하여 비정상적인 API 활동을 자동으로 감지합니다. 평소 패턴을 기준으로 비정상적인 쓰기 API 호출 급증, 오류율 급증 등을 탐지합니다. IAM 작업의 갑작스러운 폭증과 같은 이상 징후를 정확히 감지하는 데 최적화된 기능입니다.
- **C) AWS Config Rules:** 오답. Config Rules는 리소스 구성이 정의된 규칙을 준수하는지 평가합니다. API 활동의 양이나 패턴을 모니터링하는 기능이 아니므로, 비정상적인 API 활동 감지에는 적합하지 않습니다.
- **D) CloudWatch Contributor Insights:** 오답. Contributor Insights는 로그 데이터에서 상위 기여자(Top-N Contributors)를 식별합니다. 예를 들어, 가장 많은 트래픽을 발생시키는 IP를 찾는 데 사용됩니다. 비정상적인 API 활동 패턴을 감지하는 것과는 다른 용도입니다.

**핵심 개념:** CloudTrail Insights - 비정상적인 API 활동 자동 감지

---

### Q6. An organization needs to aggregate CloudWatch Logs from multiple accounts and regions into a single destination. Which approach is most appropriate?

**한글 번역:** 조직이 여러 계정과 리전의 CloudWatch Logs를 단일 대상으로 집계해야 합니다. 가장 적합한 접근 방식은 무엇일까요?

**선지:**
- A) CloudWatch cross-account dashboards → CloudWatch 교차 계정 대시보드
- B) CloudWatch Logs Subscription Filters with Kinesis Data Streams → Kinesis Data Streams를 사용한 CloudWatch Logs 구독 필터
- C) Export logs from each account to shared S3 → 각 계정에서 공유 S3로 로그 내보내기
- D) AWS Config aggregator → AWS Config 집계기

**정답:** B

**선지별 해설:**
- **A) CloudWatch cross-account dashboards:** 오답. 교차 계정 대시보드는 여러 계정의 CloudWatch 지표를 하나의 대시보드에서 시각화하는 기능입니다. 로그 데이터를 집계하여 단일 대상으로 전달하는 것과는 다릅니다.
- **B) CloudWatch Logs Subscription Filters with Kinesis Data Streams:** 정답. 각 계정/리전의 CloudWatch Logs에 구독 필터를 설정하여 로그를 중앙 계정의 Kinesis Data Streams으로 전달할 수 있습니다. 이를 통해 여러 소스의 로그를 실시간으로 단일 대상에 집계할 수 있습니다. 이후 Kinesis Data Firehose를 통해 S3, OpenSearch 등으로 전달할 수 있습니다.
- **C) Export logs from each account to shared S3:** 오답. CreateExportTask로 각 계정에서 S3로 내보낼 수 있지만, 이는 배치 방식이며 최대 12시간의 지연이 발생합니다. 자동화 및 실시간 집계에 적합하지 않습니다.
- **D) AWS Config aggregator:** 오답. Config Aggregator는 여러 계정/리전의 AWS Config 데이터(리소스 구성, 규정 준수)를 집계하는 기능입니다. CloudWatch Logs와는 관련이 없습니다.

**핵심 개념:** CloudWatch Logs Subscription Filter - 교차 계정/리전 로그 집계

---

### Q7. For an ELB, which service would you use to track CONFIGURATION changes and ensure an SSL certificate is always assigned?

**한글 번역:** ELB의 구성(CONFIGURATION) 변경을 추적하고 SSL 인증서가 항상 할당되어 있는지 확인하려면 어떤 서비스를 사용해야 할까요?

**선지:**
- A) CloudWatch → CloudWatch
- B) CloudTrail → CloudTrail
- C) AWS Config → AWS Config
- D) Amazon EventBridge → Amazon EventBridge

**정답:** C

**선지별 해설:**
- **A) CloudWatch:** 오답. CloudWatch는 지표(Metrics)와 로그를 모니터링합니다. ELB의 요청 수, 지연 시간 등의 성능 지표를 추적하지만, 리소스의 구성 변경을 추적하거나 규정 준수를 평가하는 기능이 아닙니다.
- **B) CloudTrail:** 오답. CloudTrail은 API 호출(누가, 언제, 무엇을 했는지)을 기록합니다. ELB의 구성 변경 API 호출을 기록하지만, "SSL 인증서가 항상 할당되어 있는지" 같은 구성 상태를 지속적으로 평가하는 기능은 없습니다.
- **C) AWS Config:** 정답. AWS Config는 AWS 리소스의 구성 변경 이력을 추적하고, 원하는 구성 상태를 규칙으로 정의하여 규정 준수를 지속적으로 평가합니다. ELB에 SSL 인증서가 항상 할당되어 있는지 확인하는 Config 규칙(예: elb-tls-https-listeners-only)을 설정할 수 있습니다. 구성 변경이 발생하면 자동으로 감지합니다.
- **D) Amazon EventBridge:** 오답. EventBridge는 이벤트를 라우팅하는 이벤트 버스 서비스입니다. 특정 이벤트가 발생했을 때 액션을 트리거할 수 있지만, 리소스 구성 변경을 추적하고 규정 준수를 평가하는 것은 Config의 역할입니다.

**핵심 개념:** AWS Config - 리소스 구성 변경 추적 및 규정 준수 평가

---

### Q8. A company wants an alarm only when BOTH CPU exceeds 80% AND disk IOPS exceed the threshold on the same EC2 instance. Which feature should they use?

**한글 번역:** 회사가 동일한 EC2 인스턴스에서 CPU가 80%를 초과하고 디스크 IOPS가 임계값을 초과하는 두 조건이 동시에 충족될 때만 알람을 원합니다. 어떤 기능을 사용해야 할까요?

**선지:**
- A) CloudWatch Metrics Math → CloudWatch 지표 수학
- B) CloudWatch Composite Alarms → CloudWatch 복합 알람
- C) CloudWatch Contributor Insights → CloudWatch Contributor Insights
- D) CloudWatch Anomaly Detection → CloudWatch 이상 감지

**정답:** B

**선지별 해설:**
- **A) CloudWatch Metrics Math:** 오답. Metrics Math는 여러 지표를 수학적으로 결합(합계, 평균, 비율 등)하여 새로운 지표를 생성하는 기능입니다. CPU와 IOPS를 결합한 단일 지표를 만들 수는 있지만, "두 조건이 동시에 충족될 때만"이라는 AND 논리를 직접적으로 표현하기 어렵습니다.
- **B) CloudWatch Composite Alarms:** 정답. Composite Alarms는 여러 개의 개별 알람을 AND, OR, NOT 논리로 결합할 수 있습니다. CPU > 80% 알람과 IOPS > 임계값 알람을 각각 생성한 후, 두 알람을 AND 조건으로 결합한 Composite Alarm을 만들면 됩니다. 두 조건이 모두 충족될 때만 알림이 발생합니다. 알람 노이즈를 줄이는 데 매우 유용합니다.
- **C) CloudWatch Contributor Insights:** 오답. Contributor Insights는 로그 데이터에서 상위 기여자를 식별하는 기능입니다. 알람 조건 결합과는 관련이 없습니다.
- **D) CloudWatch Anomaly Detection:** 오답. Anomaly Detection은 ML을 사용하여 지표의 예상 범위를 자동으로 학습하고, 비정상적인 값을 감지합니다. 여러 알람을 논리적으로 결합하는 기능이 아닙니다.

**핵심 개념:** CloudWatch Composite Alarms - AND/OR/NOT 논리로 여러 알람 결합

---
