# Section 27 - More Solutions Architecture 연습문제 해설

---

### Q1. Company wants to process S3 object uploads by sending notifications to multiple independent consumers. Each consumer must receive every message. BEST architecture?

**한글 번역:** 회사가 S3 객체 업로드를 처리하기 위해 여러 독립적인 소비자에게 알림을 보내려 합니다. 각 소비자가 모든 메시지를 수신해야 합니다. 최적의 아키텍처는 무엇입니까?

**선지:**
- A) S3 event notifications to multiple SQS queues directly → S3 이벤트 알림을 여러 SQS 큐에 직접 전송
- B) S3 event notifications to SNS topic then subscribe multiple SQS queues → S3 이벤트 알림을 SNS 토픽으로 보낸 후 여러 SQS 큐를 구독
- C) S3 event notifications with Lambda to write to multiple SQS queues → S3 이벤트 알림을 Lambda로 보내고 여러 SQS 큐에 쓰기
- D) S3 event notifications to EventBridge then to multiple SQS queues → S3 이벤트 알림을 EventBridge로 보낸 후 여러 SQS 큐로 전송

**정답:** B

**선지별 해설:**
- **A) S3 → 여러 SQS 직접:** S3 이벤트 알림은 동일한 이벤트 유형과 접두사 조합에 대해 하나의 대상만 설정할 수 있습니다(EventBridge 사용 시 제외). 따라서 동일한 이벤트를 여러 SQS 큐에 직접 보내는 것은 제한적입니다.
- **B) S3 → SNS → 여러 SQS:** 정답입니다. S3 이벤트 알림을 SNS 토픽으로 전송하고, 여러 SQS 큐를 해당 토픽에 구독하면 팬아웃(Fan-out) 패턴이 구현됩니다. 각 SQS 큐(소비자)가 모든 메시지의 복사본을 독립적으로 수신합니다. 가장 간단하고 효과적인 방법입니다.
- **C) S3 → Lambda → 여러 SQS:** Lambda를 중간에 두어 여러 SQS 큐에 메시지를 보내는 것은 작동하지만, 불필요한 커스텀 코드와 운영 오버헤드가 발생합니다. SNS 팬아웃이 더 간단하고 관리형 솔루션입니다.
- **D) S3 → EventBridge → 여러 SQS:** EventBridge도 여러 대상에 이벤트를 라우팅할 수 있지만, 이 간단한 팬아웃 시나리오에서는 SNS가 더 직관적이고 일반적인 패턴입니다. EventBridge는 고급 필터링이 필요할 때 더 적합합니다.

**핵심 개념:** SNS + SQS 팬아웃(Fan-out) 패턴

---

### Q2. Company needs to block traffic from specific IP addresses to web app behind ALB and CloudFront. Most effective solution?

**한글 번역:** 회사가 ALB와 CloudFront 뒤에 있는 웹 앱에 특정 IP 주소의 트래픽을 차단해야 합니다. 가장 효과적인 솔루션은 무엇입니까?

**선지:**
- A) NACL rules to deny IPs → NACL 규칙으로 IP 거부
- B) Security Group rules on ALB to deny IPs → ALB 보안 그룹 규칙으로 IP 거부
- C) AWS WAF with IP-based rules on CloudFront → CloudFront에 AWS WAF의 IP 기반 규칙 사용
- D) Security Group rules on EC2 → EC2 보안 그룹 규칙

**정답:** C

**선지별 해설:**
- **A) NACL 규칙:** CloudFront를 사용하는 경우, 클라이언트 IP가 CloudFront의 IP로 대체되어 ALB/EC2에 도달합니다. NACL에서 원본 클라이언트 IP를 기반으로 차단할 수 없습니다. 또한 CloudFront는 글로벌 서비스이므로 NACL로 제어할 수 없습니다.
- **B) ALB Security Group:** 보안 그룹은 허용(Allow) 규칙만 지원하며, 거부(Deny) 규칙을 설정할 수 없습니다. 특정 IP를 차단하는 것이 불가능합니다.
- **C) WAF on CloudFront:** 정답입니다. AWS WAF를 CloudFront에 연결하면 엣지 레벨에서 트래픽을 차단할 수 있습니다. IP Set을 사용한 IP 기반 규칙으로 특정 IP를 가장 앞단(CloudFront)에서 효과적으로 차단합니다. 트래픽이 원본 서버에 도달하기 전에 차단되므로 가장 효과적입니다.
- **D) EC2 Security Group:** 보안 그룹은 거부 규칙을 지원하지 않으며, CloudFront/ALB를 거치면 EC2가 보는 소스 IP는 원본 클라이언트 IP가 아닙니다.

**핵심 개념:** AWS WAF + CloudFront — 엣지 레벨에서의 IP 기반 접근 차단

---

### Q3. Company running tightly coupled HPC workload. Requires low-latency high-throughput inter-node communication on Linux. Which combination?

**한글 번역:** 회사가 밀접하게 결합된 HPC 워크로드를 실행하고 있습니다. Linux에서 노드 간 저지연 고처리량 통신이 필요합니다. 어떤 조합을 사용해야 합니까?

**선지:**
- A) Spread Placement Group with ENA → Spread 배치 그룹 + ENA
- B) Cluster Placement Group with Elastic Fabric Adapter (EFA) → Cluster 배치 그룹 + EFA
- C) Partition Placement Group with ENA → Partition 배치 그룹 + ENA
- D) Cluster Placement Group with ENA → Cluster 배치 그룹 + ENA

**정답:** B

**선지별 해설:**
- **A) Spread + ENA:** Spread 배치 그룹은 인스턴스를 서로 다른 하드웨어에 분산시켜 가용성을 높이지만, 인스턴스 간 거리가 멀어져 지연 시간이 증가합니다. HPC의 저지연 요구사항에 부적합합니다.
- **B) Cluster + EFA:** 정답입니다. Cluster 배치 그룹은 인스턴스를 동일한 AZ의 가까운 하드웨어에 배치하여 저지연 네트워킹을 제공합니다. EFA(Elastic Fabric Adapter)는 OS 바이패스 기능을 제공하여 HPC 워크로드에 필요한 초저지연, 고처리량 노드 간 통신을 가능하게 합니다. Linux에서만 지원됩니다.
- **C) Partition + ENA:** Partition 배치 그룹은 대규모 분산 워크로드(Hadoop, Cassandra 등)를 위한 것으로, 파티션 간 하드웨어 장애를 격리합니다. 밀접하게 결합된 HPC 워크로드의 저지연 요구사항에는 적합하지 않습니다.
- **D) Cluster + ENA:** Cluster 배치 그룹은 올바르지만, ENA(Enhanced Networking Adapter)는 향상된 네트워킹을 제공할 뿐 OS 바이패스 기능이 없습니다. HPC에서 최고의 성능을 위해서는 EFA가 필요합니다.

**핵심 개념:** HPC = Cluster Placement Group + EFA (OS 바이패스로 초저지연 통신)

---

### Q4. Architect needs highly available single EC2 instance with static IP that auto-recovers if instance fails. Must preserve EBS data. What approach?

**한글 번역:** 아키텍트가 인스턴스 장애 시 자동 복구되는 고가용성 단일 EC2 인스턴스가 필요합니다. 정적 IP가 필요하며 EBS 데이터가 보존되어야 합니다. 어떤 접근 방식을 사용해야 합니까?

**선지:**
- A) CloudWatch alarms to reboot and reassign Elastic IP → CloudWatch 알람으로 재부팅 및 Elastic IP 재할당
- B) ASG with min/max/desired of 1 across multiple AZs with lifecycle hooks for EBS snapshots and Elastic IP → 여러 AZ에 걸쳐 min/max/desired 1인 ASG + EBS 스냅샷 및 Elastic IP를 위한 라이프사이클 훅
- C) EC2 Auto Recovery with Elastic IP → EC2 자동 복구 + Elastic IP
- D) NLB with single target instance → 단일 대상 인스턴스가 있는 NLB

**정답:** B

**선지별 해설:**
- **A) CloudWatch 알람 재부팅:** CloudWatch 알람으로 인스턴스를 재부팅할 수 있지만, 하드웨어 장애 시에는 재부팅이 불가능합니다. AZ 장애 시 복구할 수 없으며, 진정한 고가용성을 제공하지 못합니다.
- **B) ASG (min/max/desired=1) + 라이프사이클 훅:** 정답입니다. ASG를 여러 AZ에 걸쳐 설정하면 인스턴스 또는 AZ 장애 시 자동으로 다른 AZ에 새 인스턴스를 시작합니다. 라이프사이클 훅을 사용하여 종료 시 EBS 스냅샷을 생성하고, 시작 시 스냅샷에서 EBS를 복원하며 Elastic IP를 할당할 수 있습니다.
- **C) EC2 Auto Recovery:** EC2 자동 복구는 동일한 AZ의 동일한 호스트 또는 다른 호스트에서 인스턴스를 복구합니다. AZ 장애 시에는 복구할 수 없으므로 완전한 고가용성을 제공하지 못합니다. 또한 인스턴스 스토어 볼륨의 데이터는 유지되지 않을 수 있습니다.
- **D) NLB + 단일 인스턴스:** NLB는 로드 밸런싱을 제공하지만, 인스턴스가 하나뿐이면 해당 인스턴스 장애 시 서비스가 중단됩니다. 자동 복구 메커니즘이 없으며, EBS 데이터 보존도 보장하지 않습니다.

**핵심 개념:** ASG(min=max=desired=1) + 라이프사이클 훅 — 단일 인스턴스의 고가용성 패턴

---

### Q5. Company wants S3 event notifications with advanced filtering on object metadata and ability to send to Step Functions. What to use?

**한글 번역:** 회사가 객체 메타데이터에 대한 고급 필터링과 Step Functions으로 전송 기능이 있는 S3 이벤트 알림을 원합니다. 무엇을 사용해야 합니까?

**선지:**
- A) S3 Event Notifications directly to Step Functions → S3 이벤트 알림을 Step Functions에 직접 전송
- B) S3 Event Notifications to SNS then Step Functions → S3 이벤트 알림을 SNS로 보낸 후 Step Functions
- C) S3 Event Notifications with Amazon EventBridge → Amazon EventBridge를 사용한 S3 이벤트 알림
- D) S3 Event Notifications to Lambda then Step Functions → S3 이벤트 알림을 Lambda로 보낸 후 Step Functions

**정답:** C

**선지별 해설:**
- **A) S3 → Step Functions 직접:** S3 이벤트 알림은 Step Functions을 직접 대상으로 지원하지 않습니다. S3 이벤트 알림의 기본 대상은 SQS, SNS, Lambda만 가능합니다.
- **B) S3 → SNS → Step Functions:** SNS는 Step Functions을 직접 호출할 수 없습니다. Lambda를 중간에 두어야 하므로 추가 오버헤드가 발생합니다. 또한 SNS는 객체 메타데이터에 대한 고급 필터링 기능이 제한적입니다.
- **C) S3 + EventBridge:** 정답입니다. Amazon EventBridge는 S3 이벤트에 대한 고급 필터링(객체 크기, 메타데이터, 태그 등)을 지원하며, Step Functions을 포함한 18개 이상의 AWS 서비스를 직접 대상으로 설정할 수 있습니다. 두 가지 요구사항(고급 필터링 + Step Functions 전송)을 모두 충족합니다.
- **D) S3 → Lambda → Step Functions:** Lambda를 중간에 두면 작동하지만, 커스텀 코드가 필요하고 운영 오버헤드가 있습니다. EventBridge를 사용하면 코드 없이 직접 연결이 가능하므로 더 효율적입니다. 또한 고급 필터링도 EventBridge가 우수합니다.

**핵심 개념:** Amazon EventBridge — S3 이벤트의 고급 필터링 및 다양한 대상 서비스 지원

---

### Q6. For HPC workload, which storage provides millions of IOPS and is optimized for distributed file systems backed by S3?

**한글 번역:** HPC 워크로드에서 수백만 IOPS를 제공하고 S3 기반의 분산 파일 시스템에 최적화된 스토리지는 무엇입니까?

**선지:**
- A) Amazon EFS with Provisioned Throughput → 프로비저닝된 처리량의 Amazon EFS
- B) Amazon EBS io2 Block Express → Amazon EBS io2 Block Express
- C) Amazon FSx for Lustre → Amazon FSx for Lustre
- D) Amazon S3 with Transfer Acceleration → S3 Transfer Acceleration

**정답:** C

**선지별 해설:**
- **A) EFS Provisioned Throughput:** EFS는 공유 파일 시스템이지만 HPC에 최적화되지 않았습니다. 수백만 IOPS를 제공하지 않으며, S3와의 네이티브 통합이 FSx for Lustre만큼 밀접하지 않습니다.
- **B) EBS io2 Block Express:** EBS io2 Block Express는 매우 높은 IOPS(최대 256,000)를 제공하지만, 블록 스토리지이며 단일 인스턴스(또는 제한된 Multi-Attach)에만 연결됩니다. 분산 파일 시스템이 아니며 S3와의 네이티브 통합이 없습니다.
- **C) FSx for Lustre:** 정답입니다. Amazon FSx for Lustre는 HPC 워크로드를 위해 설계된 고성능 병렬 파일 시스템입니다. 수백만 IOPS와 수백 GB/s의 처리량을 제공하며, S3와 네이티브로 통합되어 S3 객체를 파일 시스템에 자동으로 매핑할 수 있습니다. 처리 결과를 다시 S3에 쓸 수도 있습니다.
- **D) S3 Transfer Acceleration:** S3 Transfer Acceleration은 원격 클라이언트에서 S3로의 전송 속도를 높이는 기능이며, 분산 파일 시스템이나 IOPS와는 관련이 없습니다.

**핵심 개념:** Amazon FSx for Lustre — HPC용 고성능 병렬 파일 시스템 (S3 네이티브 통합)
