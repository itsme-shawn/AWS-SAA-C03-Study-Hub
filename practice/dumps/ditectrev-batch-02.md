# Ditectrev SAA-C03 Practice Questions — Batch 02 (Q51-Q100)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q51. You can modify the backup retention period; valid values are 0 (for no backup retention) to a maximum of [...] days.

**Options:**
- A) 45.
- B) 35.
- C) 15.
- D) 5.

**Answer:** B

**해설:**

> **문제:** 백업 보존 기간을 수정할 수 있으며, 유효한 값은 0(백업 보존 없음)부터 최대 [...] 일까지입니다.

| 선지 | 번역 |
|------|------|
| A | 45일. |
| B | 35일. |
| C | 15일. |
| D | 5일. |

**(A)** : 45일은 RDS 백업 보존 기간 한도를 초과합니다. → [📖 RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(B) 정답** : Amazon RDS의 자동 백업 보존 기간은 최대 35일까지 설정 가능합니다. → [📖 RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(C)** : 15일은 유효한 값이지만 최댓값이 아닙니다. → [📖 RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(D)** : 5일은 기본값에 가깝지만 최댓값이 아닙니다. → [📖 RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**핵심 개념:** Amazon RDS 자동 백업 보존 기간

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

---

### Q52. To serve Web traffic for a popular product your chief financial officer and IT director have purchased 10 ml large heavy utilization Reserved Instances (RIs) evenly spread across two Availability Zones. Route 53 is used to deliver the traffic to an Elastic Load Balancer (ELB). After several months, the product grows even more popular and you need additional capacity. As a result, your company purchases two C3.2xlarge medium utilization RIs. You register the two c3 2xlarge instances with your ELB and quickly find that the ml large instances are at 100% of capacity and the c3 2xlarge instances have significant capacity that's unused. Which option is the most cost effective and uses EC2 capacity most effectively?

**Options:**
- A) Use a separate ELB for each instance type and distribute load to ELBs with Route 53 weighted round robin.
- B) Configure Autoscaling group and Launch Configuration with ELB to add up to 10 more on-demand ml large instances when triggered by Cloudwatch. Shut off c3 2xlarge instances.
- C) Route traffic to EC2 ml large and c3 2xlarge instances directly using Route 53 latency based routing and health checks. Shut off ELB.
- D) Configure ELB with two c3 2xlarge Instances and use on-demand Autoscaling group for up to two additional c3.2xlarge instances. Shut off m1.large instances.

**Answer:** A

**해설:**

> **문제:** 인기 상품의 웹 트래픽을 처리하기 위해 CFO와 IT 디렉터가 두 개의 가용 영역에 균등하게 분산된 10개의 m1.large 중부하 예약 인스턴스(RI)를 구매했습니다. Route 53으로 ELB에 트래픽을 전달합니다. 몇 달 후 제품이 더욱 인기를 얻어 추가 용량이 필요해 c3.2xlarge 중간 활용 RI 2개를 추가로 구매했습니다. ELB에 등록해보니 m1.large 인스턴스는 100% 사용률이고 c3.2xlarge 인스턴스는 상당한 유휴 용량이 있습니다. 가장 비용 효율적이면서 EC2 용량을 가장 효과적으로 활용하는 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 각 인스턴스 유형별로 별도의 ELB를 사용하고 Route 53 가중치 라운드 로빈으로 ELB에 부하를 분산합니다. |
| B | CloudWatch 트리거 시 최대 10개의 온디맨드 m1.large 인스턴스를 추가하도록 Auto Scaling 그룹과 ELB가 포함된 Launch Configuration을 구성합니다. c3.2xlarge 인스턴스는 종료합니다. |
| C | Route 53 지연 시간 기반 라우팅 및 상태 확인을 사용하여 EC2 m1.large 및 c3.2xlarge 인스턴스로 직접 트래픽을 라우팅합니다. ELB는 종료합니다. |
| D | 두 개의 c3.2xlarge 인스턴스로 ELB를 구성하고 최대 두 개의 c3.2xlarge 인스턴스를 위한 온디맨드 Auto Scaling 그룹을 사용합니다. m1.large 인스턴스는 종료합니다. |

**(A) 정답** : 인스턴스 유형별로 별도 ELB를 두고 Route 53 가중치 라운드 로빈으로 분산하면 각 인스턴스 유형의 용량에 맞게 트래픽을 조절할 수 있어 가장 비용 효율적입니다. → [📖 라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

**(B)** : c3.2xlarge의 유휴 용량을 활용하지 못하고 추가 온디맨드 인스턴스 비용이 발생합니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : ELB를 제거하면 고가용성이 저하되고 Route 53 지연 시간 기반 라우팅만으로는 용량 균형을 맞추기 어렵습니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D)** : 이미 구매한 m1.large RI를 버리는 것은 비용 낭비이며, RI 비용은 사용 여부와 무관하게 청구됩니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** Route 53 가중치 기반 라우팅, 예약 인스턴스 활용

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심), [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

---

### Q53. An existing application stores sensitive information on a non-boot Amazon EBS data volume attached to an Amazon Elastic Compute Cloud instance. Which of the following approaches would protect the sensitive data on an Amazon EBS volume?

**Options:**
- A) Upload your customer keys to AWS CloudHS.
- B) Associate the Amazon EBS volume with AWS CloudHS.
- C) Re-mount the Amazon EBS volume.
- D) Create and mount a new, encrypted Amazon EBS volume. Move the data to the new volume. Delete the old Amazon EBS volume.
- E) Unmount the EBS volume. Toggle the encryption attribute to True. Re-mount the Amazon EBS volume.
- F) Snapshot the current Amazon EBS volume. Restore the snapshot to a new, encrypted Amazon EBS volume. Mount the Amazon EBS volume.

**Answer:** D

**해설:**

> **문제:** 기존 애플리케이션이 EC2 인스턴스에 연결된 비부팅 Amazon EBS 데이터 볼륨에 민감한 정보를 저장합니다. Amazon EBS 볼륨의 민감한 데이터를 보호하기 위한 접근 방식은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 고객 키를 AWS CloudHSM에 업로드합니다. |
| B | Amazon EBS 볼륨을 AWS CloudHSM과 연결합니다. |
| C | Amazon EBS 볼륨을 다시 마운트합니다. |
| D | 새로운 암호화된 Amazon EBS 볼륨을 생성하고 마운트합니다. 데이터를 새 볼륨으로 이동한 후 기존 볼륨을 삭제합니다. |
| E | EBS 볼륨을 언마운트합니다. 암호화 속성을 True로 전환합니다. Amazon EBS 볼륨을 다시 마운트합니다. |
| F | 현재 Amazon EBS 볼륨의 스냅샷을 생성합니다. 스냅샷을 새로운 암호화된 EBS 볼륨으로 복원합니다. Amazon EBS 볼륨을 마운트합니다. |

**(A)** : CloudHSM에 키를 업로드하는 것만으로는 기존 비암호화 EBS 볼륨이 암호화되지 않습니다. → [📖 CloudHSM](/section/24-security-encryption#cloudhsm)

**(B)** : EBS 볼륨을 CloudHSM과 직접 연결하는 것은 지원되지 않는 방식입니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(C)** : 단순 재마운트는 데이터 암호화나 보안 강화에 아무런 효과가 없습니다.

**(D) 정답** : 기존 EBS 볼륨은 암호화 속성을 변경할 수 없으므로, 새 암호화 볼륨을 만들어 데이터를 이전하는 방법이 올바른 접근입니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(E)** : EBS 볼륨은 생성 후 암호화 속성을 변경할 수 없습니다. 이 방법은 작동하지 않습니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(F)** : F 옵션도 유효한 대안이지만, 이 문제에서 정답으로 선택된 것은 D입니다. 스냅샷을 통한 암호화 볼륨 생성도 가능하나, 직접 새 볼륨을 생성하는 D가 더 직접적입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** EBS 볼륨 암호화 (기존 볼륨 암호화 불가, 새 볼륨 생성 필요)

**관련 노트:** [EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption), [CloudHSM](/section/24-security-encryption#cloudhsm)

---

### Q54. A user has launched one EC2 instance in the US West region. The user wants to access the RDS instance launched in the US East region from that EC2 instance. How can the user configure the access for that EC2 instance?

**Options:**
- A) Configure the IP range of the US West region instance as the ingress security rule of RDS.
- B) It is not possible to access RDS of the US East region from the US West region.
- C) Open the security group of the US West region in the RDS security group's ingress rule.
- D) Create an IAM role which has access to RDS and launch an instance in the US West region with it.

**Answer:** A

**해설:**

> **문제:** 사용자가 US West 리전에서 EC2 인스턴스를 시작했습니다. 해당 EC2 인스턴스에서 US East 리전에서 시작된 RDS 인스턴스에 접근하려고 합니다. 이 EC2 인스턴스의 접근 권한을 어떻게 구성할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | US West 리전 인스턴스의 IP 범위를 RDS의 인바운드 보안 규칙으로 구성합니다. |
| B | US West 리전에서 US East 리전의 RDS에 접근하는 것은 불가능합니다. |
| C | RDS 보안 그룹의 인바운드 규칙에 US West 리전의 보안 그룹을 추가합니다. |
| D | RDS에 접근 권한이 있는 IAM 역할을 생성하고 US West 리전의 인스턴스에 연결합니다. |

**(A) 정답** : 리전 간 RDS 접근 시 보안 그룹은 다른 리전의 보안 그룹을 참조할 수 없으므로, EC2 인스턴스의 퍼블릭 IP 또는 IP 범위를 RDS 인바운드 규칙에 직접 등록해야 합니다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**(B)** : 리전 간 RDS 접근은 가능합니다. 네트워크 구성만 올바르게 하면 됩니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : 보안 그룹 참조는 같은 리전 내에서만 가능합니다. 다른 리전의 보안 그룹을 참조할 수 없습니다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**(D)** : IAM 역할은 API 호출 권한을 관리하지, 네트워크 수준의 접근 제어는 하지 않습니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**핵심 개념:** RDS 보안 그룹, 리전 간 접근 제어

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q55. You have been asked to build AWS infrastructure for disaster recovery for your local applications and within that you should use an AWS Storage Gateway as part of the solution. Which of the following best describes the function of an AWS Storage Gateway?

**Options:**
- A) Accelerates transferring large amounts of data between the AWS cloud and portable storage devices .
- B) A web service that speeds up distribution of your static and dynamic web content.
- C) Connects an on-premises software appliance with cloud-based storage to provide seamless and secure integration between your on-premises IT environment and AWS's storage infrastructure.
- D) Is a storage service optimized for infrequently used data, or 'cold data'.

**Answer:** C

**해설:**

> **문제:** 로컬 애플리케이션의 재해 복구를 위한 AWS 인프라를 구축하는 작업을 맡았으며, 그 과정에서 AWS Storage Gateway를 솔루션의 일부로 사용해야 합니다. AWS Storage Gateway의 기능을 가장 잘 설명하는 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | AWS 클라우드와 이동식 저장 장치 간에 대용량 데이터 전송을 가속화합니다. |
| B | 정적 및 동적 웹 콘텐츠 배포를 가속화하는 웹 서비스입니다. |
| C | 온프레미스 소프트웨어 어플라이언스를 클라우드 기반 스토리지와 연결하여 온프레미스 IT 환경과 AWS 스토리지 인프라 간의 원활하고 안전한 통합을 제공합니다. |
| D | 비정기적으로 사용되는 데이터, 즉 '콜드 데이터'에 최적화된 스토리지 서비스입니다. |

**(A)** : 이는 AWS Snowball에 대한 설명입니다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(B)** : 이는 Amazon CloudFront에 대한 설명입니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(C) 정답** : AWS Storage Gateway는 온프레미스 환경과 AWS 클라우드 스토리지를 연결하는 하이브리드 스토리지 서비스로, 재해 복구, 백업, 데이터 마이그레이션에 활용됩니다. → [📖 AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

**(D)** : 이는 Amazon S3 Glacier에 대한 설명입니다. → [📖 S3 Storage Classes](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** AWS Storage Gateway — 하이브리드 스토리지

**관련 노트:** [AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway), [재해 복구 기본 개념](/section/26-disaster-recovery-migrations#재해-복구-기본-개념)

---

### Q56. While creating an Amazon RDS DB, your first task is to set up a DB [...] that controls which IP address or EC2 instance can access your DB Instance.

**Options:**
- A) security token pool.
- B) security token.
- C) security pool.
- D) security group.

**Answer:** D

**해설:**

> **문제:** Amazon RDS DB를 생성할 때 가장 먼저 해야 할 일은 어떤 IP 주소 또는 EC2 인스턴스가 DB 인스턴스에 접근할 수 있는지를 제어하는 DB [...] 를 설정하는 것입니다.

| 선지 | 번역 |
|------|------|
| A | 보안 토큰 풀(security token pool). |
| B | 보안 토큰(security token). |
| C | 보안 풀(security pool). |
| D | 보안 그룹(security group). |

**(A)** : 보안 토큰 풀은 RDS 접근 제어에 사용되는 개념이 아닙니다.

**(B)** : 보안 토큰은 임시 자격 증명(STS)에 사용되며 DB 접근 제어와는 다릅니다. → [📖 AWS KMS Key Management Service](/section/24-security-encryption#aws-kms-key-management-service)

**(C)** : 보안 풀은 존재하지 않는 개념입니다.

**(D) 정답** : RDS DB 인스턴스에 대한 네트워크 접근은 보안 그룹(Security Group)으로 제어합니다. 인바운드 규칙에 허용할 IP 또는 보안 그룹을 지정합니다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**핵심 개념:** RDS 보안 그룹

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q57. You need to import several hundred megabytes of data from a local Oracle database to an Amazon RDS DB instance. What does AWS recommend you use to accomplish this?

**Options:**
- A) Oracle export/import utilities.
- B) Oracle SQL Developer.
- C) Oracle Data Pump.
- D) DBMS_FILE_TRANSFER.

**Answer:** C

**해설:**

> **문제:** 로컬 Oracle 데이터베이스에서 Amazon RDS DB 인스턴스로 수백 메가바이트의 데이터를 가져와야 합니다. AWS에서 이를 수행하기 위해 권장하는 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Oracle export/import 유틸리티. |
| B | Oracle SQL Developer. |
| C | Oracle Data Pump. |
| D | DBMS_FILE_TRANSFER. |

**(A)** : Oracle export/import 유틸리티(exp/imp)는 레거시 도구로, Data Pump보다 성능이 낮습니다. → [📖 DMS Database Migration Service](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**(B)** : SQL Developer는 GUI 도구로 대용량 데이터 마이그레이션에는 적합하지 않습니다. → [📖 DMS Database Migration Service](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**(C) 정답** : Oracle Data Pump(expdp/impdp)는 AWS가 RDS로의 Oracle 데이터 마이그레이션 시 권장하는 고성능 도구입니다. → [📖 DMS Database Migration Service](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**(D)** : DBMS_FILE_TRANSFER는 데이터베이스 파일을 전송하는 패키지로, 일반적인 데이터 마이그레이션 도구로는 권장되지 않습니다. → [📖 DMS Database Migration Service](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**핵심 개념:** Oracle RDS 데이터 마이그레이션 — Oracle Data Pump

**관련 노트:** [DMS Database Migration Service, 데이터베이스 마이그레이션 서비스](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

---

### Q58. In the context of AWS support, why must an EC2 instance be unreachable for 20 minutes rather than allowing customers to open tickets immediately?

**Options:**
- A) Because most reachability issues are resolved by automated processes in less than 20 minutes.
- B) Because all EC2 instances are unreachable for 20 minutes every day when AWS does routine maintenance.
- C) Because all EC2 instances are unreachable for 20 minutes when first launched.
- D) Because of all the reasons listed here.

**Answer:** A

**해설:**

> **문제:** AWS 지원 맥락에서, 고객이 즉시 티켓을 열 수 있도록 하지 않고 EC2 인스턴스가 20분 동안 접근 불가능해야 하는 이유는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 대부분의 접근성 문제는 20분 이내에 자동화된 프로세스에 의해 해결되기 때문입니다. |
| B | AWS가 정기 유지 관리를 수행할 때 모든 EC2 인스턴스가 매일 20분 동안 접근 불가능하기 때문입니다. |
| C | 처음 시작될 때 모든 EC2 인스턴스가 20분 동안 접근 불가능하기 때문입니다. |
| D | 여기에 나열된 모든 이유 때문입니다. |

**(A) 정답** : AWS의 자동화 시스템은 대부분의 일시적 접근성 문제를 20분 이내에 스스로 해결합니다. 따라서 고객이 즉시 티켓을 열기 전에 자동 복구 여부를 기다리도록 하는 것입니다.

**(B)** : AWS는 정기 유지 관리로 인해 매일 20분씩 인스턴스를 중단하지 않습니다.

**(C)** : EC2 인스턴스가 시작 시 20분 동안 항상 접근 불가능한 것은 아닙니다.

**(D)** : 모든 이유가 해당되는 것은 아닙니다.

**핵심 개념:** AWS Support, EC2 접근성 자동 복구

**관련 노트:** [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg), [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q59. HTTP Query-based requests are HTTP requests that use the HTTP verb GET or POST and a Query parameter named [...].

**Options:**
- A) Action.
- B) Value.
- C) Reset.
- D) Retrieve.

**Answer:** A

**해설:**

> **문제:** HTTP 쿼리 기반 요청은 HTTP 동사 GET 또는 POST와 [...] 라는 이름의 쿼리 파라미터를 사용하는 HTTP 요청입니다.

| 선지 | 번역 |
|------|------|
| A | Action. |
| B | Value. |
| C | Reset. |
| D | Retrieve. |

**(A) 정답** : AWS HTTP 쿼리 기반 요청에서 수행할 작업을 지정하는 파라미터 이름은 'Action'입니다. 예: ?Action=DescribeInstances

**(B)** : Value는 파라미터 값에 해당하지만, 쿼리 기반 요청의 핵심 파라미터 이름이 아닙니다.

**(C)** : Reset은 AWS 쿼리 파라미터로 존재하지 않습니다.

**(D)** : Retrieve는 AWS 쿼리 파라미터로 존재하지 않습니다.

**핵심 개념:** AWS HTTP 쿼리 기반 API — Action 파라미터

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

---

### Q60. A friend tells you he is being charged $100 a month to host his WordPress website, and you tell him you can move it to AWS for him and he will only pay a fraction of that, which makes him very happy. He then tells you he is being charged $50 a month for the domain, which is registered with the same people that set it up, and he asks if it's possible to move that to AWS as well. You tell him you aren't sure, but will look into it. Which of the following statements is true in regards to transferring domain names to AWS?

**Options:**
- A) You can't transfer existing domains to AWS.
- B) You can transfer existing domains into Amazon Route 53's management.
- C) You can transfer existing domains via AWS Direct Connect.
- D) You can transfer existing domains via AWS Import/Export.

**Answer:** B

**해설:**

> **문제:** 친구가 WordPress 웹사이트 호스팅에 월 $100를 내고 있다고 말해서 AWS로 이전하면 훨씬 적은 비용이 든다고 알려줬습니다. 친구는 또한 같은 업체에서 도메인을 등록해 월 $50를 낸다며 AWS로 이전할 수 있는지 묻습니다. 도메인 이름을 AWS로 이전하는 것에 관한 설명 중 올바른 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 기존 도메인을 AWS로 이전할 수 없습니다. |
| B | 기존 도메인을 Amazon Route 53 관리로 이전할 수 있습니다. |
| C | AWS Direct Connect를 통해 기존 도메인을 이전할 수 있습니다. |
| D | AWS Import/Export를 통해 기존 도메인을 이전할 수 있습니다. |

**(A)** : 기존 도메인을 AWS로 이전하는 것은 가능합니다. → [📖 Domain Registrar vs DNS Service](/section/08-route-53#domain-registrar-vs-dns-service)

**(B) 정답** : Amazon Route 53은 도메인 등록 서비스를 제공하며, 다른 등록 기관에서 관리 중인 기존 도메인을 Route 53으로 이전할 수 있습니다. → [📖 Domain Registrar vs DNS Service](/section/08-route-53#domain-registrar-vs-dns-service)

**(C)** : Direct Connect는 네트워크 연결 서비스로 도메인 이전과는 관련이 없습니다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(D)** : AWS Import/Export는 대용량 데이터 물리적 이전 서비스로 도메인 이전과는 관련이 없습니다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**핵심 개념:** Amazon Route 53 — 도메인 등록 및 이전

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [Domain Registrar vs DNS Service](/section/08-route-53#domain-registrar-vs-dns-service)

---

### Q61. While creating the snapshots using the command line tools, which command should I be using?

**Options:**
- A) ec2-deploy-snapshot.
- B) ec2-fresh-snapshot.
- C) ec2-create-snapshot.
- D) ec2-new-snapshot.

**Answer:** C

**해설:**

> **문제:** 커맨드 라인 도구를 사용하여 스냅샷을 생성할 때 사용해야 하는 명령어는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | ec2-deploy-snapshot. |
| B | ec2-fresh-snapshot. |
| C | ec2-create-snapshot. |
| D | ec2-new-snapshot. |

**(A)** : ec2-deploy-snapshot은 존재하지 않는 명령어입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : ec2-fresh-snapshot은 존재하지 않는 명령어입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(C) 정답** : EBS 스냅샷 생성 CLI 명령어는 ec2-create-snapshot 또는 현재 AWS CLI 기준 aws ec2 create-snapshot 입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(D)** : ec2-new-snapshot은 존재하지 않는 명령어입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** EBS 스냅샷 생성 CLI 명령어

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

---

### Q62. All Amazon EC2 instances are assigned two IP addresses at launch, out of which one can only be reached from within the Amazon EC2 network?

**Options:**
- A) Multiple IP address.
- B) Public IP address.
- C) Private IP address.
- D) Elastic IP Address.

**Answer:** C

**해설:**

> **문제:** 모든 Amazon EC2 인스턴스는 시작 시 두 개의 IP 주소가 할당되는데, 그 중 하나는 Amazon EC2 네트워크 내부에서만 접근할 수 있습니다. 그 IP 주소는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 다중 IP 주소(Multiple IP address). |
| B | 공인 IP 주소(Public IP address). |
| C | 사설 IP 주소(Private IP address). |
| D | 탄력적 IP 주소(Elastic IP Address). |

**(A)** : 다중 IP 주소는 인스턴스에 여러 IP를 할당하는 기능을 말하며 이 문맥에서 정답이 아닙니다.

**(B)** : 공인 IP 주소는 인터넷에서 접근 가능한 주소입니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**(C) 정답** : 사설 IP 주소(Private IP)는 VPC 내부에서만 통신 가능하며, EC2 인스턴스 내부 네트워크 전용 주소입니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**(D)** : 탄력적 IP는 퍼블릭 IP의 일종으로 인터넷에서 접근 가능합니다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**핵심 개념:** EC2 IP 주소 — 사설 IP vs 공인 IP

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip), [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4), [Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

---

### Q63. When an EC2 instance that is backed by an S3-based AMI is terminated, what happens to the data on the root volume?

**Options:**
- A) Data is automatically saved as an EBS snapshot.
- B) Data is automatically saved as an EBS volume.
- C) Data is unavailable until the instance is restarted.
- D) Data is automatically deleted.

**Answer:** D

**해설:**

> **문제:** S3 기반 AMI로 백업된 EC2 인스턴스가 종료될 때 루트 볼륨의 데이터는 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | 데이터는 자동으로 EBS 스냅샷으로 저장됩니다. |
| B | 데이터는 자동으로 EBS 볼륨으로 저장됩니다. |
| C | 인스턴스가 재시작될 때까지 데이터를 사용할 수 없습니다. |
| D | 데이터는 자동으로 삭제됩니다. |

**(A)** : 인스턴스 스토어 기반(S3 기반 AMI) 인스턴스는 종료 시 스냅샷이 자동 생성되지 않습니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**(B)** : 인스턴스 스토어 기반 인스턴스는 종료 시 데이터가 EBS 볼륨으로 저장되지 않습니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**(C)** : 인스턴스 스토어는 재시작 시 데이터가 유지되지 않으므로 이 설명은 부정확합니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**(D) 정답** : 인스턴스 스토어(S3 기반 AMI) 루트 볼륨은 인스턴스 종료 시 데이터가 영구 삭제됩니다. 이것이 인스턴스 스토어의 핵심 특징입니다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** EC2 인스턴스 스토어(S3 기반 AMI) — 종료 시 데이터 삭제

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

---

### Q64. You've created your first load balancer and have registered your EC2 instances with the load balancer. Elastic Load Balancing routinely performs health checks on all the registered EC2 instances and automatically distributes all incoming requests to the DNS name of your load balancer across your registered, healthy EC2 instances. By default, the load balancer uses the [...] protocol for checking the health of your instances.

**Options:**
- A) HTTPS.
- B) HTTP.
- C) ICMP.
- D) IPv6.

**Answer:** B

**해설:**

> **문제:** 첫 번째 로드 밸런서를 생성하고 EC2 인스턴스를 등록했습니다. ELB는 등록된 모든 EC2 인스턴스에 대해 정기적으로 상태 확인을 수행하고 수신 요청을 정상 인스턴스에 자동으로 분산합니다. 기본적으로 로드 밸런서는 인스턴스 상태를 확인하는 데 [...] 프로토콜을 사용합니다.

| 선지 | 번역 |
|------|------|
| A | HTTPS. |
| B | HTTP. |
| C | ICMP. |
| D | IPv6. |

**(A)** : HTTPS는 보안 HTTP이지만 ELB 상태 확인의 기본 프로토콜이 아닙니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B) 정답** : ELB의 기본 상태 확인 프로토콜은 HTTP입니다. 기본적으로 포트 80에서 HTTP로 상태를 확인합니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(C)** : ICMP(ping)는 네트워크 계층 프로토콜로 ELB 상태 확인에 사용되지 않습니다.

**(D)** : IPv6는 IP 주소 체계이며 상태 확인 프로토콜이 아닙니다.

**핵심 개념:** ELB 상태 확인 — 기본 프로토콜 HTTP

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

---

### Q65. Amazon Elastic Load Balancing is used to manage traffic on a fleet of Amazon EC2 instances, distributing traffic to instances across all Availability Zones within a region. Elastic Load Balancing has all the advantages of an on-premises load balancer, plus several security benefits. Which of the following is not an advantage of ELB over an on-premise load balancer?

**Options:**
- A) ELB uses a four-tier, key-based architecture for encryption.
- B) ELB offers clients a single point of contact, and can also serve as the first line of defense against attacks on your network.
- C) ELB takes over the encryption and decryption work from the Amazon EC2 instances and manages it centrally on the load balancer.
- D) ELB supports end-to-end traffic encryption using TLS (previously SSL) on those networks that use secure HTTP (HTTPS) connections.

**Answer:** A

**해설:**

> **문제:** Amazon ELB는 리전 내 모든 가용 영역에 걸쳐 트래픽을 분산하여 EC2 인스턴스 집합의 트래픽을 관리합니다. ELB는 온프레미스 로드 밸런서의 모든 이점과 몇 가지 보안 이점을 제공합니다. 다음 중 온프레미스 로드 밸런서 대비 ELB의 장점이 아닌 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | ELB는 암호화에 4계층 키 기반 아키텍처를 사용합니다. |
| B | ELB는 클라이언트에게 단일 접점을 제공하며 네트워크에 대한 공격의 첫 번째 방어선 역할도 할 수 있습니다. |
| C | ELB는 Amazon EC2 인스턴스의 암호화 및 복호화 작업을 인계받아 로드 밸런서에서 중앙 관리합니다. |
| D | ELB는 보안 HTTP(HTTPS) 연결을 사용하는 네트워크에서 TLS(이전의 SSL)를 사용한 종단 간 트래픽 암호화를 지원합니다. |

**(A) 정답** : ELB가 암호화에 '4계층 키 기반 아키텍처'를 사용한다는 설명은 사실이 아닙니다. 이것이 장점이 아닌 잘못된 설명입니다.

**(B)** : ELB는 실제로 단일 DNS 엔드포인트를 제공하고 DDoS 완화 등 기본 보안 기능을 제공합니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(C)** : ELB는 SSL/TLS 오프로딩을 통해 EC2 인스턴스의 암복호화 부담을 줄여줍니다. → [📖 SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)

**(D)** : ELB는 HTTPS를 통한 종단 간 암호화를 지원합니다. → [📖 SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)

**핵심 개념:** ELB 보안 기능 — SSL 오프로딩, 단일 접점

**관련 노트:** [SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서), [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

---

### Q66. A web company is looking to implement an external payment service into their highly available application deployed in a VPC. Their application EC2 instances are behind a public facing ELB. Auto scaling is used to add additional instances as traffic increases. Under normal load the application runs 2 instances in the Auto Scaling group but at peak it can scale 3x in size. The application instances need to communicate with the payment service over the Internet which requires whitelisting of all public IP addresses used to communicate with it. A maximum of 4 whitelisting IP addresses are allowed at a time and can be added through an API. How should they architect their solution?

**Options:**
- A) Route payment requests through two NAT instances setup for High Availability and whitelist the Elastic IP addresses attached to the NAT instances.
- B) Whitelist the VPC Internet Gateway Public IP and route payment requests through the Internet Gateway.
- C) Whitelist the ELB IP addresses and route payment requests from the Application servers through the ELB.
- D) Automatically assign public IP addresses to the application instances in the Auto Scaling group and run a script on boot that adds each instance's public IP address to the payment validation whitelist API.

**Answer:** A

**해설:**

> **문제:** 한 웹 회사가 VPC에 배포된 고가용성 애플리케이션에 외부 결제 서비스를 통합하려고 합니다. 애플리케이션 EC2 인스턴스는 공용 ELB 뒤에 있습니다. 트래픽 증가에 따라 Auto Scaling이 인스턴스를 추가합니다. 일반 부하 시 2개 인스턴스가 실행되지만 최대 3배까지 확장될 수 있습니다. 결제 서비스 통신에는 모든 공인 IP 주소의 화이트리스트 등록이 필요하며 최대 4개의 IP 주소만 허용됩니다. 어떻게 아키텍처를 설계해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 고가용성을 위해 두 NAT 인스턴스를 설정하고 NAT 인스턴스에 연결된 탄력적 IP 주소를 화이트리스트에 등록합니다. |
| B | VPC 인터넷 게이트웨이의 공인 IP를 화이트리스트에 등록하고 인터넷 게이트웨이를 통해 결제 요청을 라우팅합니다. |
| C | ELB IP 주소를 화이트리스트에 등록하고 애플리케이션 서버에서 ELB를 통해 결제 요청을 라우팅합니다. |
| D | Auto Scaling 그룹의 애플리케이션 인스턴스에 자동으로 공인 IP를 할당하고 부팅 시 스크립트로 각 인스턴스의 공인 IP를 결제 화이트리스트 API에 추가합니다. |

**(A) 정답** : NAT 인스턴스 2개에 고정 탄력적 IP를 부여하면 화이트리스트 IP가 2개로 고정되어 최대 4개 한도 내에서 유지됩니다. 고가용성도 확보됩니다. → [📖 NAT Instance 레거시](/section/25-vpc#nat-instance-레거시-시험에-출제)

**(B)** : 인터넷 게이트웨이는 고정 IP를 갖지 않으므로 화이트리스트 등록이 불가능합니다. → [📖 Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

**(C)** : ELB IP는 동적으로 변경될 수 있어 화이트리스트에 고정 등록하기 적합하지 않습니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D)** : Auto Scaling으로 인스턴스 수가 늘면 IP도 늘어나 4개 한도를 초과할 수 있고, 인스턴스마다 공인 IP가 직접 노출되는 보안 위험도 있습니다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**핵심 개념:** NAT 인스턴스 + 탄력적 IP — 아웃바운드 IP 고정

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip), [NAT Instance 레거시, 시험에 출제](/section/25-vpc#nat-instance-레거시-시험에-출제)

---

### Q67. You are using Amazon SES as an email solution but are unsure of what its limitations are. Which statement below is correct in regards to that?

**Options:**
- A) New Amazon SES users who have received production access can send up to 1,000 emails per 24-hour period, at a maximum rate of 10 emails per second.
- B) Every Amazon SES sender has a the same set of sending limits.
- C) Sending limits are based on messages rather than on recipients.
- D) Every Amazon SES sender has a unique set of sending limits.

**Answer:** D

**해설:**

> **문제:** Amazon SES를 이메일 솔루션으로 사용하고 있지만 제한 사항이 불확실합니다. SES에 관한 설명 중 올바른 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 프로덕션 액세스를 받은 신규 Amazon SES 사용자는 24시간당 최대 1,000개 이메일을 초당 최대 10개 속도로 발송할 수 있습니다. |
| B | 모든 Amazon SES 발신자는 동일한 발송 한도를 갖습니다. |
| C | 발송 한도는 수신자가 아닌 메시지를 기준으로 합니다. |
| D | 모든 Amazon SES 발신자는 고유한 발송 한도를 갖습니다. |

**(A)** : 신규 SES 계정의 기본 한도는 이것과 다를 수 있으며, 한도는 계정별로 다릅니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(B)** : SES 발송 한도는 계정별로 개별적으로 설정됩니다. 모든 발신자가 동일한 한도를 갖지 않습니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(C)** : SES 발송 한도는 수신자(recipients) 수를 기준으로 하며, 메시지 수가 아닙니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(D) 정답** : 각 Amazon SES 계정은 사용 패턴, 요청, 자동 평가 등에 따라 고유한 발송 한도(일일 발송량, 초당 발송률)를 갖습니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**핵심 개념:** Amazon SES 발송 한도 — 계정별 고유 한도

**관련 노트:** [Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

---

### Q68. Your company is getting ready to do a major public announcement of a social media site on AWS. The website is running on EC2 instances deployed across multiple Availability Zones with a Multi-AZ RDS MySQL Extra Large DB Instance. The site performs a high number of small reads and writes per second and relies on an eventual consistency model. After comprehensive tests you discover that there is read contention on RDS MySQL. Which are the best approaches to meet these requirements? (Choose 2 answers)

**Options:**
- A) Deploy ElasticCache in-memory cache running in each Availability Zone.
- B) Implement sharding to distribute load to multiple RDS MySQL instances.
- C) Increase the RDS MySQL Instance size and Implement provisioned IOPS.
- D) Add an RDS MySQL read replica in each Availability Zone.

**Answer:** A, D

**해설:**

> **문제:** 회사가 AWS에서 소셜 미디어 사이트를 대규모로 공개 발표할 준비를 하고 있습니다. 웹사이트는 Multi-AZ RDS MySQL Extra Large DB 인스턴스와 함께 여러 가용 영역에 배포된 EC2 인스턴스에서 실행됩니다. 사이트는 초당 많은 수의 소규모 읽기 및 쓰기를 수행하고 최종 일관성 모델에 의존합니다. 포괄적인 테스트 후 RDS MySQL에서 읽기 경합이 발생함을 발견했습니다. 이 요구 사항을 충족하는 최선의 접근 방식은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 각 가용 영역에서 실행되는 ElastiCache 인메모리 캐시를 배포합니다. |
| B | 샤딩을 구현하여 여러 RDS MySQL 인스턴스에 부하를 분산합니다. |
| C | RDS MySQL 인스턴스 크기를 늘리고 프로비저닝된 IOPS를 구현합니다. |
| D | 각 가용 영역에 RDS MySQL 읽기 복제본을 추가합니다. |

**(A) 정답** : ElastiCache는 자주 읽히는 데이터를 메모리에 캐싱하여 RDS 읽기 부하를 크게 줄입니다. 최종 일관성 모델에도 적합합니다. → [📖 Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(B)** : 샤딩은 쓰기 확장에 효과적이지만, 구현 복잡도가 높고 읽기 경합 해소에 가장 직접적인 방법이 아닙니다.

**(C)** : 인스턴스 크기 증가와 IOPS 향상은 일시적 완화책이지만 근본적인 읽기 경합 해소 방법이 아닙니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D) 정답** : 읽기 복제본(Read Replica)은 읽기 트래픽을 복제본으로 분산하여 기본 인스턴스의 읽기 경합을 직접 해소합니다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**핵심 개념:** RDS 읽기 경합 해소 — ElastiCache, 읽기 복제본

**관련 노트:** [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas), [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [Amazon ElastiCache](/section/07-rds-aurora-elasticache#amazon-elasticache)

---

### Q69. What does a 'Domain' refer to in Amazon SWF?

**Options:**
- A) A security group in which only tasks inside can communicate with each other.
- B) A special type of worker.
- C) A collection of related Workflows.
- D) The DNS record for the Amazon SWF service.

**Answer:** C

**해설:**

> **문제:** Amazon SWF에서 '도메인(Domain)'이란 무엇을 의미합니까?

| 선지 | 번역 |
|------|------|
| A | 내부 태스크끼리만 통신할 수 있는 보안 그룹. |
| B | 특별한 유형의 워커. |
| C | 관련 워크플로의 집합. |
| D | Amazon SWF 서비스의 DNS 레코드. |

**(A)** : SWF 도메인은 네트워크 보안 그룹 개념이 아닙니다.

**(B)** : SWF에서 워커(Worker)는 태스크를 수행하는 컴포넌트이며, 도메인과는 다릅니다.

**(C) 정답** : Amazon SWF의 도메인은 관련된 워크플로(Workflow)들을 논리적으로 그룹화하는 컨테이너입니다. 도메인 간에는 워크플로가 상호 작용할 수 없습니다.

**(D)** : 도메인은 DNS 레코드와 관련이 없습니다.

**핵심 개념:** Amazon SWF — 도메인(Domain) 개념

---

### Q70. The SQL Server [...] feature is an efficient means of copying data from a source database to your DB Instance. It writes the data that you specify to a data file, such as an ASCII file.

**Options:**
- A) bulk copy.
- B) group copy.
- C) dual copy.
- D) mass copy.

**Answer:** A

**해설:**

> **문제:** SQL Server의 [...] 기능은 원본 데이터베이스에서 DB 인스턴스로 데이터를 복사하는 효율적인 수단입니다. ASCII 파일과 같은 데이터 파일에 지정한 데이터를 기록합니다.

| 선지 | 번역 |
|------|------|
| A | 대량 복사(bulk copy). |
| B | 그룹 복사(group copy). |
| C | 이중 복사(dual copy). |
| D | 대규모 복사(mass copy). |

**(A) 정답** : SQL Server의 BCP(Bulk Copy Program)는 대용량 데이터를 효율적으로 복사하는 유틸리티로, AWS RDS SQL Server로 데이터를 마이그레이션할 때 권장되는 방법입니다. → [📖 DMS Database Migration Service](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

**(B)** : 그룹 복사(group copy)는 SQL Server의 실제 기능이 아닙니다.

**(C)** : 이중 복사(dual copy)는 SQL Server의 실제 기능이 아닙니다.

**(D)** : 대규모 복사(mass copy)는 SQL Server의 실제 기능이 아닙니다.

**핵심 개념:** SQL Server BCP(Bulk Copy Program) — RDS 데이터 마이그레이션

**관련 노트:** [DMS Database Migration Service, 데이터베이스 마이그레이션 서비스](/section/26-disaster-recovery-migrations#dms-database-migration-service-데이터베이스-마이그레이션-서비스)

---

### Q71. Any person or application that interacts with AWS requires security credentials. AWS uses these credentials to identify who is making the call and whether to allow the requested access. You have just set up a VPC network for a client and you are now thinking about the best way to secure this network. You set up a security group called vpcsecuritygroup. Which following statement is true in respect to the initial settings that will be applied to this security group if you choose to use the default settings for this group?

**Options:**
- A) Allow all inbound traffic and allow no outbound traffic.
- B) Allow no inbound traffic and allow all outbound traffic.
- C) Allow inbound traffic on port 80 only and allow all outbound traffic.
- D) Allow all inbound traffic and allow all outbound traffic.

**Answer:** B

**해설:**

> **문제:** AWS와 상호 작용하는 모든 사람이나 애플리케이션은 보안 자격 증명이 필요합니다. AWS는 이를 사용하여 호출자를 식별하고 요청된 접근을 허용할지 결정합니다. 클라이언트를 위해 VPC 네트워크를 설정하고 보안 그룹 'vpcsecuritygroup'을 생성했습니다. 기본 설정을 사용할 경우 이 보안 그룹의 초기 설정은 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | 모든 인바운드 트래픽 허용, 모든 아웃바운드 트래픽 거부. |
| B | 모든 인바운드 트래픽 거부, 모든 아웃바운드 트래픽 허용. |
| C | 포트 80 인바운드 트래픽만 허용, 모든 아웃바운드 트래픽 허용. |
| D | 모든 인바운드 트래픽 허용, 모든 아웃바운드 트래픽 허용. |

**(A)** : 기본 보안 그룹은 인바운드를 모두 차단하므로 이 설명은 틀렸습니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(B) 정답** : 보안 그룹의 기본값은 인바운드 트래픽을 모두 거부하고, 아웃바운드 트래픽은 모두 허용합니다. 인바운드 규칙은 명시적으로 추가해야 합니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(C)** : 기본 보안 그룹은 포트 80만 허용하지 않습니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 기본 보안 그룹은 인바운드를 모두 허용하지 않습니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** VPC 보안 그룹 기본 설정 — 인바운드 전체 차단, 아웃바운드 전체 허용

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

---

### Q72. Which one of the below is not an AWS Storage Service?

**Options:**
- A) Amazon S3.
- B) Amazon Glacier.
- C) Amazon CloudFront.
- D) Amazon EBS.

**Answer:** C

**해설:**

> **문제:** 다음 중 AWS 스토리지 서비스가 아닌 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Amazon S3. |
| B | Amazon Glacier. |
| C | Amazon CloudFront. |
| D | Amazon EBS. |

**(A)** : Amazon S3는 객체 스토리지 서비스입니다. → [📖 Amazon S3 개요](/section/10-amazon-s3#개요)

**(B)** : Amazon Glacier(현 S3 Glacier)는 아카이브 스토리지 서비스입니다. → [📖 S3 Storage Classes](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(C) 정답** : Amazon CloudFront는 콘텐츠 전송 네트워크(CDN) 서비스로, 스토리지 서비스가 아닙니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(D)** : Amazon EBS는 블록 스토리지 서비스입니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** AWS 스토리지 서비스 vs CDN (CloudFront)

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스), [CloudFront vs S3 Cross Region Replication](/section/13-cloudfront-global-accelerator#cloudfront-vs-s3-cross-region-replication)

---

### Q73. You are trying to launch an EC2 instance, however the instance seems to go into a terminated status immediately. What would probably not be a reason that this is happening?

**Options:**
- A) The AMI is missing a required part.
- B) The snapshot is corrupt.
- C) You need to create storage in EBS first.
- D) You've reached your volume limit.

**Answer:** C

**해설:**

> **문제:** EC2 인스턴스를 시작하려고 하는데 인스턴스가 즉시 종료(terminated) 상태가 됩니다. 다음 중 이 현상의 원인이 아닐 가능성이 높은 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | AMI에 필수 파트가 누락되어 있습니다. |
| B | 스냅샷이 손상되었습니다. |
| C | 먼저 EBS에 스토리지를 생성해야 합니다. |
| D | 볼륨 한도에 도달했습니다. |

**(A)** : AMI에 필수 구성 요소가 없으면 인스턴스 시작 실패의 원인이 됩니다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(B)** : 스냅샷 손상은 인스턴스 시작 시 즉시 종료되는 원인이 될 수 있습니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(C) 정답** : EC2 인스턴스를 시작하기 전에 별도로 EBS 스토리지를 미리 생성할 필요가 없습니다. 인스턴스 시작 시 자동으로 루트 볼륨이 생성됩니다. 따라서 이것은 종료 원인이 아닙니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : AWS 계정의 EBS 볼륨 한도 초과는 인스턴스 시작 실패의 원인이 됩니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** EC2 인스턴스 즉시 종료 원인 (AMI 오류, 스냅샷 손상, 볼륨 한도)

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [EC2 설정 옵션](/section/03-ec2-basics#ec2-설정-옵션)

---

### Q74. A company is building software on AWS that requires access to various AWS services. Which configuration should be used to ensure that AWS credentials (i.e., Access Key ID/Secret Access Key combination) are not compromised?

**Options:**
- A) Enable Multi-Factor Authentication for your AWS root account.
- B) Assign an IAM role to the Amazon EC2 instance.
- C) Store the AWS Access Key ID/Secret Access Key combination in software comments.
- D) Assign an IAM user to the Amazon EC2 Instance.

**Answer:** B

**해설:**

> **문제:** 회사에서 다양한 AWS 서비스에 접근해야 하는 소프트웨어를 AWS에서 개발하고 있습니다. AWS 자격 증명(Access Key ID/Secret Access Key 조합)이 노출되지 않도록 하려면 어떤 구성을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | AWS 루트 계정에 Multi-Factor Authentication(MFA)을 활성화합니다. |
| B | Amazon EC2 인스턴스에 IAM 역할을 할당합니다. |
| C | 소프트웨어 주석에 AWS Access Key ID/Secret Access Key 조합을 저장합니다. |
| D | Amazon EC2 인스턴스에 IAM 사용자를 할당합니다. |

**(A)** : 루트 계정 MFA는 중요하지만, EC2 애플리케이션의 AWS 서비스 접근 방식과는 직접 관련이 없습니다. → [📖 MFA Multi Factor Authentication](/section/02-iam#mfa-multi-factor-authentication)

**(B) 정답** : EC2 인스턴스에 IAM 역할을 부여하면 애플리케이션이 임시 자격 증명을 자동으로 사용할 수 있어, 정적 Access Key를 코드나 설정 파일에 저장할 필요가 없습니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(C)** : 소스 코드 주석에 자격 증명을 저장하는 것은 심각한 보안 위험입니다. 절대 해서는 안 됩니다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(D)** : IAM 사용자를 EC2 인스턴스에 할당하는 개념은 존재하지 않습니다. IAM 역할을 인스턴스 프로파일로 연결해야 합니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**핵심 개념:** EC2 IAM 인스턴스 역할 — 자격 증명 노출 방지

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할)

---

### Q75. Can we attach an EBS volume to more than one EC2 instance at the same time?

**Options:**
- A) Yes.
- B) No.
- C) Only EC2-optimized EBS volumes.
- D) Only in read mode.

**Answer:** B

**해설:**

> **문제:** EBS 볼륨을 동시에 두 개 이상의 EC2 인스턴스에 연결할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니오. |
| C | EC2 최적화 EBS 볼륨만 가능합니다. |
| D | 읽기 모드에서만 가능합니다. |

**(A)** : 일반적인 EBS 볼륨은 단일 인스턴스에만 연결 가능합니다. (단, EBS Multi-Attach는 io1/io2 볼륨 타입에서 같은 AZ 내 최대 16개 인스턴스에 연결 가능하나, 이 문제는 일반적인 EBS를 다룸) → [📖 EBS Multi-Attach io1/io2](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

**(B) 정답** : 일반적으로 EBS 볼륨은 한 번에 하나의 EC2 인스턴스에만 연결할 수 있습니다. 이것이 EBS의 기본 동작입니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C)** : EC2 최적화 EBS 볼륨이라는 개념으로 다중 연결이 허용되지는 않습니다. → [📖 EBS Multi-Attach io1/io2](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

**(D)** : 읽기 전용 모드로 다중 연결하는 기능은 기본 EBS에서 지원되지 않습니다. → [📖 EBS Multi-Attach io1/io2](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

**핵심 개념:** EBS 볼륨 연결 제한 — 단일 인스턴스 전용

**관련 노트:** [EBS Multi-Attach io1/io2](/section/05-ec2-instance-storage#ebs-multiattach-io1io2), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q76. You need to measure the performance of your EBS volumes as they seem to be under performing. You have come up with a measurement of 1,024 KB I/O but your colleague tells you that EBS volume performance is measured in IOPS. How many IOPS is equal to 1,024 KB I/O?

**Options:**
- A) 16.
- B) 256.
- C) 8.
- D) 4.

**Answer:** D

**해설:**

> **문제:** EBS 볼륨의 성능이 저조한 것 같아 측정하고 있습니다. 1,024 KB I/O를 측정 기준으로 정했는데 동료가 EBS 볼륨 성능은 IOPS로 측정한다고 말합니다. 1,024 KB I/O는 몇 IOPS와 같습니까?

| 선지 | 번역 |
|------|------|
| A | 16. |
| B | 256. |
| C | 8. |
| D | 4. |

**(A)** : 16 IOPS × 64KB = 1,024KB가 되려면 I/O 크기가 64KB여야 하므로 이 계산은 맞지 않습니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B)** : 256은 너무 큰 값입니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : 8 IOPS × 128KB = 1,024KB로 계산이 가능하지만, AWS의 IOPS 기준 단위는 256KB입니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(D) 정답** : AWS EBS에서 IOPS는 256KB I/O 단위를 기준으로 합니다. 따라서 1,024KB ÷ 256KB = 4 IOPS입니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**핵심 개념:** EBS IOPS 계산 — 256KB 기준 단위

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

---

### Q77. Your company produces customer commissioned one-of-a-kind skiing helmets combining high fashion with custom technical enhancements. Customers can show off their Individuality on the ski slopes and have access to head-up-displays. GPS rear-view cams and any other technical innovation they wish to embed in the helmet. The current manufacturing process is data rich and complex including assessments to ensure that the custom electronics and materials used to assemble the helmets are to the highest standards. Assessments are a mixture of human and automated assessments you need to add a new set of assessment to model the failure modes of the custom electronics using GPUs with CUDA, across a cluster of servers with low latency networking. What architecture would allow you to automate the existing process using a hybrid approach and ensure that the architecture can support the evolution of processes over time?

**Options:**
- A) Use AWS Data Pipeline to manage movement of data & meta-data and assessments Use an autoscaling group of G2 instances in a placement group.
- B) Use Amazon Simple Workflow (SWF) to manages assessments, movement of data & meta-data Use an auto-scaling group of G2 instances in a placement group.
- C) Use Amazon Simple Workflow (SWF) to manages assessments movement of data & meta-data Use an auto-scaling group of C3 instances with SR-IOV (Single Root 1/0 Virtualization).
- D) Use AWS data Pipeline to manage movement of data & meta-data and assessments use autoscaling group of C3 with SR-IOV (Single Root 1/0 virtualization).

**Answer:** B

**해설:**

> **문제:** 귀사는 고급 패션과 맞춤형 기술을 결합한 스키 헬멧을 생산합니다. 현재 제조 프로세스는 데이터 집약적이며 복잡하여, GPU와 CUDA를 사용해 저지연 네트워킹 서버 클러스터에서 맞춤 전자 부품의 고장 모드를 모델링하는 새 평가 항목을 추가해야 합니다. 하이브리드 방식으로 기존 프로세스를 자동화하고 시간이 지남에 따라 프로세스 진화를 지원할 수 있는 아키텍처는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | AWS Data Pipeline으로 데이터 및 메타데이터 이동과 평가를 관리합니다. 배치 그룹(placement group)의 G2 인스턴스 Auto Scaling 그룹을 사용합니다. |
| B | Amazon SWF로 평가, 데이터 및 메타데이터 이동을 관리합니다. 배치 그룹(placement group)의 G2 인스턴스 Auto Scaling 그룹을 사용합니다. |
| C | Amazon SWF로 평가, 데이터 및 메타데이터 이동을 관리합니다. SR-IOV를 사용하는 C3 인스턴스 Auto Scaling 그룹을 사용합니다. |
| D | AWS Data Pipeline으로 데이터 및 메타데이터 이동과 평가를 관리합니다. SR-IOV를 사용하는 C3 인스턴스 Auto Scaling 그룹을 사용합니다. |

**(A)** : Data Pipeline은 데이터 이동에 특화되어 있고 인간/자동화 평가의 복잡한 워크플로 조율에는 SWF가 더 적합합니다.

**(B) 정답** : SWF는 인간과 자동화 태스크를 포함한 복잡한 워크플로 조율에 적합합니다. G2 인스턴스는 GPU(CUDA)를 지원하며, 배치 그룹은 저지연 네트워킹을 제공합니다. → [📖 Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹)

**(C)** : C3 인스턴스는 컴퓨팅 최적화 인스턴스로 GPU를 지원하지 않아 CUDA 요구 사항을 충족하지 못합니다. → [📖 EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

**(D)** : Data Pipeline보다 SWF가 워크플로 관리에 적합하고, C3는 GPU를 지원하지 않습니다. → [📖 EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

**핵심 개념:** Amazon SWF 워크플로 관리, GPU 인스턴스(G2), 배치 그룹 저지연 네트워킹

**관련 노트:** [EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입), [Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q78. You are designing Internet connectivity for your VPC. The Web servers must be available on the Internet. The application must have a highly available architecture. Which alternatives should you consider? (Choose 2 answers)

**Options:**
- A) Configure a NAT instance in your VPC Create a default route via the NAT instance and associate it with all subnets Configure a DNS A record that points to the NAT instance public IP address.
- B) Configure a CloudFront distribution and configure the origin to point to the private IP addresses of your Web servers Configure a Route 53 CNAME record to your CloudFront distribution.
- C) Place all your web servers behind EL8 Configure a Route 53 CNAME to point to the ELB DNS name.
- D) Assign EIPs to all web servers. Configure a Route 53 record set with all EIPs. With health checks and DNS failover.
- E) Configure ELB with an EIP Place all your Web servers behind ELB Configure a Route 53 A record that points to the EIP.

**Answer:** C, D

**해설:**

> **문제:** VPC에서 인터넷 연결을 설계하고 있습니다. 웹 서버는 인터넷에서 접근 가능해야 하며 애플리케이션은 고가용성 아키텍처를 갖춰야 합니다. 고려해야 할 대안은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | VPC에 NAT 인스턴스를 구성하고, NAT 인스턴스를 통한 기본 라우트를 생성하여 모든 서브넷에 연결합니다. NAT 인스턴스 공인 IP를 가리키는 DNS A 레코드를 구성합니다. |
| B | CloudFront 배포를 구성하고 오리진을 웹 서버의 사설 IP 주소로 설정합니다. CloudFront 배포를 가리키는 Route 53 CNAME 레코드를 구성합니다. |
| C | 모든 웹 서버를 ELB 뒤에 배치합니다. ELB DNS 이름을 가리키는 Route 53 CNAME을 구성합니다. |
| D | 모든 웹 서버에 EIP를 할당합니다. 모든 EIP를 포함하는 Route 53 레코드 세트를 상태 확인 및 DNS 장애 조치와 함께 구성합니다. |
| E | EIP가 있는 ELB를 구성합니다. 모든 웹 서버를 ELB 뒤에 배치합니다. EIP를 가리키는 Route 53 A 레코드를 구성합니다. |

**(A)** : NAT 인스턴스는 인바운드 인터넷 트래픽을 서버로 전달하는 용도가 아니며, 고가용성도 보장하지 않습니다. → [📖 NAT Instance 레거시](/section/25-vpc#nat-instance-레거시-시험에-출제)

**(B)** : CloudFront는 사설 IP로 오리진을 직접 접근할 수 없습니다. 이 구성은 동작하지 않습니다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(C) 정답** : ELB 뒤에 웹 서버를 배치하고 Route 53 CNAME으로 연결하면 고가용성과 인터넷 접근성을 모두 충족합니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D) 정답** : 각 웹 서버에 EIP를 할당하고 Route 53에 상태 확인과 함께 등록하면 개별 서버 장애 시 자동 DNS 장애 조치가 가능합니다. → [📖 Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크)

**(E)** : ELB에 고정 EIP를 연결하는 것은 일반적으로 권장되지 않으며, ELB는 DNS 이름으로 접근하는 것이 표준입니다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**핵심 개념:** VPC 인터넷 연결 고가용성 — ELB + Route 53

**관련 노트:** [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4), [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [CNAME vs Alias](/section/08-route-53#cname-vs-alias)

---

### Q79. You need to configure an Amazon S3 bucket to serve static assets for your public-facing web application. Which methods ensure that all objects uploaded to the bucket are set to public read? (Choose 2 answers)

**Options:**
- A) Set permissions on the object to public read during upload.
- B) Configure the bucket ACL to set all objects to public read.
- C) Configure the bucket policy to set all objects to public read.
- D) Use AWS Identity and Access Management roles to set the bucket to public read.
- E) Amazon S3 objects default to public read, so no action is needed.

**Answer:** A, C

**해설:**

> **문제:** 공개 웹 애플리케이션의 정적 에셋을 제공하기 위해 Amazon S3 버킷을 구성해야 합니다. 버킷에 업로드된 모든 객체가 공개 읽기로 설정되도록 하는 방법은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 업로드 시 객체의 권한을 공개 읽기로 설정합니다. |
| B | 버킷 ACL을 구성하여 모든 객체를 공개 읽기로 설정합니다. |
| C | 버킷 정책을 구성하여 모든 객체를 공개 읽기로 설정합니다. |
| D | AWS IAM 역할을 사용하여 버킷을 공개 읽기로 설정합니다. |
| E | Amazon S3 객체는 기본적으로 공개 읽기이므로 별도 조치가 필요 없습니다. |

**(A) 정답** : 업로드 시 객체별로 공개 읽기 권한을 설정하면 해당 객체에 대한 접근이 허용됩니다.

**(B)** : 버킷 ACL로 모든 객체를 공개 읽기로 설정하는 것은 새로 업로드되는 객체에 자동 적용되지 않을 수 있어 완전한 방법이 아닙니다. → [📖 S3 보안](/section/10-amazon-s3#s3-보안)

**(C) 정답** : 버킷 정책(Bucket Policy)에 s3:GetObject 허용 규칙을 추가하면 버킷의 모든 객체에 대해 공개 읽기가 보장됩니다. → [📖 S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy)

**(D)** : IAM 역할은 AWS 주체(사람, 서비스)에게 권한을 부여하는 것으로, 익명 공개 접근 설정 방법이 아닙니다. → [📖 IAM Roles 역할](/section/02-iam#iam-roles-역할)

**(E)** : Amazon S3 객체는 기본적으로 비공개(private)입니다. 별도 설정 없이는 공개 접근이 불가능합니다. → [📖 S3 보안](/section/10-amazon-s3#s3-보안)

**핵심 개념:** S3 공개 접근 설정 — 객체 ACL, 버킷 정책

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy), [S3 보안](/section/10-amazon-s3#s3-보안)

---

### Q80. A major customer has asked you to set up his AWS infrastructure so that it will be easy to recover in the case of a disaster of some sort. Which of the following is important when thinking about being able to quickly launch resources in AWS to ensure business continuity in case of a disaster?

**Options:**
- A) Create and maintain AMIs of key servers where fast recovery is required.
- B) Regularly run your servers, test them, and apply any software updates and configuration changes.
- C) All items listed here are important when thinking about disaster recovery.
- D) Ensure that you have all supporting custom software packages available in AWS.

**Answer:** C

**해설:**

> **문제:** 중요 고객이 재해 발생 시 쉽게 복구할 수 있도록 AWS 인프라를 설정해 달라고 요청했습니다. 재해 발생 시 비즈니스 연속성을 보장하기 위해 AWS에서 리소스를 신속하게 시작하는 것에 있어 중요한 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 빠른 복구가 필요한 핵심 서버의 AMI를 생성하고 유지 관리합니다. |
| B | 정기적으로 서버를 실행하고 테스트하며 소프트웨어 업데이트와 구성 변경 사항을 적용합니다. |
| C | 여기에 나열된 모든 항목이 재해 복구를 고려할 때 중요합니다. |
| D | 필요한 모든 지원 커스텀 소프트웨어 패키지를 AWS에서 사용할 수 있도록 합니다. |

**(A)** : AMI 유지 관리는 신속한 복구의 핵심 요소입니다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(B)** : 정기적인 테스트와 업데이트는 DR 계획의 중요한 부분입니다. → [📖 4가지 DR 전략](/section/26-disaster-recovery-migrations#4가지-dr-전략-빠른-rto-순)

**(C) 정답** : 재해 복구를 위해서는 AMI 유지 관리, 정기 테스트, 소프트웨어 패키지 관리 등 모든 요소가 종합적으로 중요합니다. → [📖 4가지 DR 전략](/section/26-disaster-recovery-migrations#4가지-dr-전략-빠른-rto-순)

**(D)** : 커스텀 소프트웨어 패키지의 가용성도 복구 시간 단축에 중요합니다.

**핵심 개념:** AWS 재해 복구(DR) — AMI, 테스트, 소프트웨어 관리

**관련 노트:** [재해 복구 기본 개념](/section/26-disaster-recovery-migrations#재해-복구-기본-개념), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q81. You are developing a new mobile application and are considering storing user preferences in AWS. This would provide a more uniform cross-device experience to users using multiple mobile devices to access the application. The preference data for each user is estimated to be 50KB in size. Additionally, 5 million customers are expected to use the application on a regular basis. The solution needs to be cost-effective, highly available, scalable and secure. How would you design a solution to meet the above requirements?

**Options:**
- A) Setup an RDS MySQL instance in 2 Availability Zones to store the user preference data. Deploy a public facing application on a server in front of the database to manage security and access credentials.
- B) Setup a DynamoDB table with an item for each user having the necessary attributes to hold the user preferences. The mobile application will query the user preferences directly from the DynamoDB table. Utilize STS, Web Identity Federation, and DynamoDB Fine Grained Access Control to authenticate and authorize access.
- C) Setup an RDS MySQL instance with multiple read replicas in 2 Availability Zones to store the user preference data. The mobile application will query the user preferences from the read replicas. Leverage the MySQL user management and access privilege system to manage security and access credentials.
- D) Store the user preference data in S3. Setup a DynamoDB table with an item for each user and an item attribute pointing to the user's S3 object. The mobile application will retrieve the S3 URL from DynamoDB and then access the S3 object directly. Utilize STS, Web identity Federation, and S3 ACLs to authenticate and authorize access.

**Answer:** B

**해설:**

> **문제:** 새로운 모바일 애플리케이션을 개발 중이며 사용자 기본 설정을 AWS에 저장하려고 합니다. 사용자당 예상 데이터 크기는 50KB이며 500만 명의 고객이 정기적으로 사용할 것으로 예상됩니다. 솔루션은 비용 효율적이고, 고가용성이며, 확장 가능하고 안전해야 합니다. 이 요구 사항을 충족하는 솔루션 설계 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 2개 가용 영역에 RDS MySQL 인스턴스를 설정합니다. 보안과 접근 자격 증명 관리를 위해 데이터베이스 앞에 공개 애플리케이션 서버를 배포합니다. |
| B | DynamoDB 테이블을 설정하고 각 사용자에 대한 항목과 필요한 속성을 생성합니다. 모바일 앱이 DynamoDB에서 직접 사용자 기본 설정을 쿼리합니다. STS, Web Identity Federation, DynamoDB Fine Grained Access Control로 인증 및 권한 부여를 처리합니다. |
| C | 2개 가용 영역에 여러 읽기 복제본이 있는 RDS MySQL 인스턴스를 설정합니다. 모바일 앱이 읽기 복제본에서 사용자 기본 설정을 쿼리합니다. MySQL 사용자 관리 및 접근 권한 시스템으로 보안과 접근 자격 증명을 관리합니다. |
| D | 사용자 기본 설정 데이터를 S3에 저장합니다. 각 사용자에 대한 항목과 S3 객체를 가리키는 속성을 가진 DynamoDB 테이블을 설정합니다. 모바일 앱은 DynamoDB에서 S3 URL을 가져온 후 S3 객체에 직접 접근합니다. STS, Web Identity Federation, S3 ACL로 인증 및 권한 부여를 처리합니다. |

**(A)** : RDS는 500만 명 규모의 모바일 앱에 비용 효율적이지 않으며, 앞단 서버 관리 부담이 있습니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B) 정답** : DynamoDB는 확장성, 고가용성, 비용 효율성 측면에서 최적입니다. STS + Web Identity Federation을 통해 모바일 클라이언트가 직접 DynamoDB에 안전하게 접근할 수 있습니다. → [📖 Amazon Cognito](/section/17-serverless-overview#amazon-cognito)

**(C)** : RDS MySQL은 이 규모의 모바일 앱에 비용 효율적이지 않으며, MySQL 자격 증명 관리를 모바일 앱에서 하는 것은 보안상 문제가 있습니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D)** : 50KB 데이터는 DynamoDB 항목으로 직접 저장 가능하므로 S3를 별도로 사용할 필요가 없으며 구조가 불필요하게 복잡합니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**핵심 개념:** DynamoDB + STS Web Identity Federation — 모바일 앱 사용자 데이터 저장

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Amazon Cognito](/section/17-serverless-overview#amazon-cognito), [IAM Roles 역할](/section/02-iam#iam-roles-역할)

---

### Q82. In the Amazon RDS which uses the SQL Server engine, what is the maximum size for a Microsoft SQL Server DB Instance with SQL Server Express edition?

**Options:**
- A) 10GB per DB.
- B) 100GB per DB.
- C) 2TB per DB.
- D) 1TB per DB.

**Answer:** A

**해설:**

> **문제:** Amazon RDS SQL Server 엔진에서 SQL Server Express Edition의 Microsoft SQL Server DB 인스턴스당 최대 크기는 얼마입니까?

| 선지 | 번역 |
|------|------|
| A | DB당 10GB. |
| B | DB당 100GB. |
| C | DB당 2TB. |
| D | DB당 1TB. |

**(A) 정답** : Amazon RDS SQL Server Express Edition은 Microsoft의 라이선스 제한으로 인해 DB당 최대 10GB로 제한됩니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : 100GB는 SQL Server Express Edition의 RDS 한도보다 큽니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : 2TB는 더 높은 에디션(Standard, Enterprise)에 해당하는 크기입니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D)** : 1TB도 Express Edition에는 너무 큰 용량입니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS SQL Server Express Edition 크기 제한 — 10GB

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q83. You have deployed a web application targeting a global audience across multiple AWS Regions under the domain name.example.com. You decide to use Route 53 Latency-Based Routing to serve web requests to users from the region closest to the user. To provide business continuity in the event of server downtime you configure weighted record sets associated with two web servers in separate Availability Zones per region. During a DR test you notice that when you disable all web servers in one of the regions Route 53 does not automatically direct all users to the other region. What could be happening? (Choose 2 answers)

**Options:**
- A) Latency resource record sets cannot be used in combination with weighted resource record sets.
- B) You did not setup an HTTP health check for one or more of the weighted resource record sets associated with the disabled web servers.
- C) The value of the weight associated with the latency alias resource record set in the region with the disabled servers is higher than the weight for the other region.
- D) One of the two working web servers in the other region did not pass its HTTP health check.
- E) You did not set 'Evaluate Target Health' to 'Yes' on the latency alias resource record set associated with example com in the region where you disabled the servers.

**Answer:** B, E

**해설:**

> **문제:** 여러 AWS 리전에 걸쳐 example.com 도메인 이름으로 글로벌 웹 애플리케이션을 배포했습니다. Route 53 지연 시간 기반 라우팅을 사용하여 사용자를 가장 가까운 리전으로 서비스합니다. 가용 영역별로 분리된 두 웹 서버에 가중치 레코드 세트를 구성하여 비즈니스 연속성을 제공합니다. DR 테스트 중 한 리전의 모든 웹 서버를 비활성화했을 때 Route 53이 모든 사용자를 다른 리전으로 자동 전환하지 않는 것을 발견했습니다. 원인은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 지연 시간 리소스 레코드 세트는 가중치 리소스 레코드 세트와 함께 사용할 수 없습니다. |
| B | 비활성화된 웹 서버와 연결된 가중치 리소스 레코드 세트 중 하나 이상에 HTTP 상태 확인을 설정하지 않았습니다. |
| C | 서버가 비활성화된 리전의 지연 시간 별칭 리소스 레코드 세트에 연결된 가중치 값이 다른 리전의 가중치보다 높습니다. |
| D | 다른 리전의 두 작동 중인 웹 서버 중 하나가 HTTP 상태 확인을 통과하지 못했습니다. |
| E | 서버를 비활성화한 리전의 example.com 관련 지연 시간 별칭 리소스 레코드 세트에서 'Evaluate Target Health'를 'Yes'로 설정하지 않았습니다. |

**(A)** : Route 53은 지연 시간 기반 라우팅과 가중치 기반 라우팅을 함께 사용하는 것을 지원합니다. → [📖 라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

**(B) 정답** : 가중치 레코드 세트에 상태 확인이 연결되지 않으면 비활성 서버도 정상으로 간주되어 트래픽이 계속 전달됩니다. → [📖 Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크)

**(C)** : 가중치 값의 차이는 이 문제의 원인이 아닙니다. 상태 확인 부재가 핵심입니다. → [📖 라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

**(D)** : 다른 리전의 서버 상태 확인 실패는 다른 리전으로의 전환을 방해하지 않습니다. → [📖 Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크)

**(E) 정답** : 지연 시간 별칭 레코드에서 'Evaluate Target Health'가 비활성화되어 있으면, 하위 가중치 레코드들이 모두 실패해도 별칭 레코드 자체는 건강한 것으로 간주되어 트래픽이 계속 전달됩니다. → [📖 Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크)

**핵심 개념:** Route 53 지연 시간 + 가중치 라우팅, Evaluate Target Health, 상태 확인

**관련 노트:** [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies), [Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크), [CNAME vs Alias](/section/08-route-53#cname-vs-alias)

---

### Q84. Amazon EBS provides the ability to create backups of any Amazon EC2 volume into what is known as [...].

**Options:**
- A) snapshots.
- B) images.
- C) instance backups.
- D) mirrors.

**Answer:** A

**해설:**

> **문제:** Amazon EBS는 모든 Amazon EC2 볼륨의 백업을 [...] 이라고 알려진 것으로 생성하는 기능을 제공합니다.

| 선지 | 번역 |
|------|------|
| A | 스냅샷(snapshots). |
| B | 이미지(images). |
| C | 인스턴스 백업(instance backups). |
| D | 미러(mirrors). |

**(A) 정답** : EBS 볼륨의 백업은 스냅샷(Snapshot)이라 합니다. 스냅샷은 S3에 증분 방식으로 저장되며, 새 EBS 볼륨 생성이나 복원에 사용됩니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : 이미지(AMI)는 인스턴스 전체를 백업하는 개념이며, EBS 볼륨 백업의 기본 용어가 아닙니다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(C)** : 인스턴스 백업은 공식 AWS 용어가 아닙니다.

**(D)** : 미러는 RAID 구성 등에서 사용하는 개념으로 EBS 백업 용어가 아닙니다.

**핵심 개념:** EBS 스냅샷 — 볼륨 백업

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q85. You've been hired to enhance the overall security posture for a very large e-commerce site. They have a well architected multi-tier application running in a VPC that uses ELBs in front of both the web and the app tier with static assets served directly from S3. They are using a combination of RDS and DynamoDB for their dynamic data and then archiving nightly into S3 for further processing with EMR. They are concerned because they found questionable log entries and suspect someone is attempting to gain unauthorized access. Which approach provides a cost effective scalable mitigation to this kind of attack?

**Options:**
- A) Recommend that they lease space at a DirectConnect partner location and establish a 1G DirectConnect connection to their VPC. They would then establish Internet connectivity into their space, filter the traffic in hardware Web Application Firewall (WAF), and then pass the traffic through the DirectConnect connection into their application running in their VPC.
- B) Add previously identified hostile source IPs as an explicit INBOUND DENY NACL to the web tier sub net.
- C) Add a WAF tier by creating a new ELB and an AutoScaling group of EC2 Instances running a host based WAF. They would redirect Route 53 to resolve to the new WAF tier ELB. The WAF tier would then pass the traffic to the current web tier. The web tier Security Groups would be updated to only allow traffic from the WAF tier Security Group.
- D) Remove all but TLS 1.2 from the web tier ELB and enable Advanced Protocol Filtering. This will enable the ELB itself to perform WAF functionality.

**Answer:** C

**해설:**

> **문제:** 매우 큰 규모의 전자 상거래 사이트의 전반적인 보안 태세를 강화하는 업무를 맡았습니다. VPC에서 ELB를 앞에 두고 웹 및 앱 티어가 있는 멀티 티어 애플리케이션이 실행 중이며, 정적 에셋은 S3에서 직접 제공하고 RDS와 DynamoDB를 사용합니다. 의심스러운 로그 항목이 발견되어 무단 접근 시도가 의심됩니다. 이런 종류의 공격을 비용 효율적이고 확장 가능하게 완화하는 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | DirectConnect 파트너 위치에 공간을 임차하고 VPC에 1G DirectConnect 연결을 설정합니다. 하드웨어 WAF로 트래픽을 필터링한 후 DirectConnect를 통해 전달합니다. |
| B | 이미 식별된 악성 소스 IP를 웹 티어 서브넷의 NACL 명시적 인바운드 거부 규칙으로 추가합니다. |
| C | 새 ELB와 호스트 기반 WAF를 실행하는 EC2 인스턴스 Auto Scaling 그룹으로 WAF 티어를 추가합니다. Route 53이 새 WAF 티어 ELB를 가리키도록 변경합니다. WAF 티어는 현재 웹 티어로 트래픽을 전달합니다. 웹 티어 보안 그룹은 WAF 티어 보안 그룹의 트래픽만 허용하도록 업데이트합니다. |
| D | 웹 티어 ELB에서 TLS 1.2만 허용하고 고급 프로토콜 필터링을 활성화합니다. 이를 통해 ELB 자체에서 WAF 기능을 수행합니다. |

**(A)** : DirectConnect 연결 및 하드웨어 WAF는 비용이 매우 높고 확장성이 낮습니다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(B)** : NACL IP 차단은 알려진 IP에만 효과적이고, 새로운 공격 IP에 대응하기 어려우며 확장성이 부족합니다. → [📖 NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

**(C) 정답** : 소프트웨어 WAF 티어를 Auto Scaling 그룹으로 구성하면 확장 가능하고 비용 효율적이며, 웹 티어를 WAF 뒤로 숨겨 보안이 강화됩니다. → [📖 AWS WAF Web Application Firewall](/section/24-security-encryption#aws-waf-web-application-firewall)

**(D)** : ELB는 TLS 프로토콜 필터링은 가능하지만 WAF 기능(SQL 인젝션, XSS 방어 등)을 제공하지 않습니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**핵심 개념:** WAF 티어 구성 — Auto Scaling, 보안 그룹 기반 접근 제어

**관련 노트:** [AWS WAF Web Application Firewall](/section/24-security-encryption#aws-waf-web-application-firewall), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q86. You are designing the network infrastructure for an application server in Amazon VPC. Users will access all the application instances from the Internet as well as from an on-premises network. The on-premises network is connected to your VPC over an AWS Direct Connect link. How would you design routing to meet the above requirements?

**Options:**
- A) Configure a single routing Table with a default route via the Internet gateway. Propagate a default route via BGP on the AWS Direct Connect customer router. Associate the routing table with all VPC subnets.
- B) Configure a single routing table with a default route via the internet gateway. Propagate specific routes for the on-premises networks via BGP on the AWS Direct Connect customer router. Associate the routing table with all VPC subnets.
- C) Configure a single routing table with two default routes: one to the internet via an Internet gateway, the other to the on-premises network via the VPN gateway. Use this routing table across all subnets in your VPC.
- D) Configure two routing tables: one that has a default route via the Internet gateway and another that has a default route via the VPN gateway. Associate both routing tables with each VPC subnet.

**Answer:** A

**해설:**

> **문제:** Amazon VPC의 애플리케이션 서버를 위한 네트워크 인프라를 설계하고 있습니다. 사용자는 인터넷과 온프레미스 네트워크 모두에서 모든 애플리케이션 인스턴스에 접근합니다. 온프레미스 네트워크는 AWS Direct Connect 링크를 통해 VPC에 연결됩니다. 이 요구 사항을 충족하는 라우팅 설계 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 인터넷 게이트웨이를 통한 기본 라우트를 가진 단일 라우팅 테이블을 구성합니다. Direct Connect 고객 라우터에서 BGP를 통해 기본 라우트를 전파합니다. 라우팅 테이블을 모든 VPC 서브넷에 연결합니다. |
| B | 인터넷 게이트웨이를 통한 기본 라우트를 가진 단일 라우팅 테이블을 구성합니다. Direct Connect 고객 라우터에서 BGP를 통해 온프레미스 네트워크의 특정 라우트를 전파합니다. 라우팅 테이블을 모든 VPC 서브넷에 연결합니다. |
| C | 두 개의 기본 라우트가 있는 단일 라우팅 테이블을 구성합니다: 하나는 인터넷 게이트웨이, 다른 하나는 VPN 게이트웨이를 통한 온프레미스 네트워크로. VPC의 모든 서브넷에 이 라우팅 테이블을 사용합니다. |
| D | 두 개의 라우팅 테이블을 구성합니다: 하나는 인터넷 게이트웨이를 통한 기본 라우트, 다른 하나는 VPN 게이트웨이를 통한 기본 라우트. 두 라우팅 테이블을 각 VPC 서브넷에 연결합니다. |

**(A) 정답** : 인터넷 게이트웨이를 기본 라우트로 설정하고, Direct Connect에서 BGP로 기본 라우트를 전파하면 온프레미스에서 온 트래픽도 인터넷 게이트웨이 기본 라우트와 함께 처리됩니다. 단일 라우팅 테이블로 인터넷 및 온프레미스 접근을 모두 지원합니다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(B)** : 특정 라우트 전파는 온프레미스 네트워크로의 라우팅에는 유효하지만, 이 방식에서는 인터넷 기본 라우트와 온프레미스 특정 라우트가 공존합니다. A가 더 간단하고 효과적입니다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(C)** : 하나의 라우팅 테이블에 두 개의 기본 라우트(0.0.0.0/0)는 설정할 수 없습니다. → [📖 서브넷 Subnet](/section/25-vpc#서브넷-subnet)

**(D)** : 서브넷에 두 개의 라우팅 테이블을 동시에 연결하는 것은 불가능합니다. → [📖 서브넷 Subnet](/section/25-vpc#서브넷-subnet)

**핵심 개념:** VPC 라우팅 테이블, Direct Connect BGP 라우트 전파

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

---

### Q87. You have multiple VPN connections and want to provide secure communication between sites using the AWS VPN CloudHub. Which statement is the most accurate in describing what you must do to set this up correctly?

**Options:**
- A) Create a virtual private gateway with multiple customer gateways, each with unique Border Gateway Protocol (BGP) Autonomous System Numbers (ASNs).
- B) Create a virtual private gateway with multiple customer gateways, each with a unique set of keys.
- C) Create a virtual public gateway with multiple customer gateways, each with a unique Private subnet.
- D) Create a virtual private gateway with multiple customer gateways, each with unique subnet id.

**Answer:** A

**해설:**

> **문제:** 여러 VPN 연결이 있으며 AWS VPN CloudHub를 사용하여 사이트 간 보안 통신을 제공하려고 합니다. 올바르게 설정하기 위해 해야 할 일에 관한 설명 중 가장 정확한 것은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 여러 고객 게이트웨이를 가진 가상 프라이빗 게이트웨이를 생성하되, 각각 고유한 BGP ASN(Autonomous System Number)을 사용합니다. |
| B | 여러 고객 게이트웨이를 가진 가상 프라이빗 게이트웨이를 생성하되, 각각 고유한 키 세트를 사용합니다. |
| C | 여러 고객 게이트웨이를 가진 가상 퍼블릭 게이트웨이를 생성하되, 각각 고유한 프라이빗 서브넷을 사용합니다. |
| D | 여러 고객 게이트웨이를 가진 가상 프라이빗 게이트웨이를 생성하되, 각각 고유한 서브넷 ID를 사용합니다. |

**(A) 정답** : AWS VPN CloudHub는 단일 가상 프라이빗 게이트웨이(VGW)에 여러 고객 게이트웨이(CGW)를 연결하여 사이트 간 통신을 허용합니다. 각 CGW는 고유한 BGP ASN을 가져야 라우팅이 올바르게 동작합니다. → [📖 AWS VPN CloudHub](/section/25-vpc#aws-vpn-cloudhub)

**(B)** : 키 세트는 VPN 터널 인증에 필요하지만, CloudHub 설정의 핵심 요구 사항은 고유한 BGP ASN입니다. → [📖 Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

**(C)** : 가상 퍼블릭 게이트웨이는 존재하지 않는 개념입니다.

**(D)** : 고유한 서브넷 ID는 CloudHub 설정 요건이 아닙니다.

**핵심 개념:** AWS VPN CloudHub — 가상 프라이빗 게이트웨이, 고유 BGP ASN

**관련 노트:** [AWS VPN CloudHub](/section/25-vpc#aws-vpn-cloudhub)

---

### Q88. A user is aware that a huge download is occurring on his instance. He has already set the Auto Scaling policy to increase the instance count when the network I/O increases beyond a certain limit. How can the user ensure that this temporary event does not result in scaling?

**Options:**
- A) The network I/O are not affected during data download.
- B) The policy cannot be set on the network I/O.
- C) There is no way the user can stop scaling as it is already configured.
- D) Suspend scaling.

**Answer:** D

**해설:**

> **문제:** 사용자는 자신의 인스턴스에서 대용량 다운로드가 진행 중임을 알고 있습니다. 이미 네트워크 I/O가 특정 한도를 초과할 때 인스턴스 수를 늘리도록 Auto Scaling 정책을 설정했습니다. 이 일시적인 이벤트로 인해 스케일링이 발생하지 않도록 하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 데이터 다운로드 중에는 네트워크 I/O에 영향을 미치지 않습니다. |
| B | 정책을 네트워크 I/O에 기반하여 설정할 수 없습니다. |
| C | 이미 구성되어 있으므로 스케일링을 중단할 방법이 없습니다. |
| D | 스케일링을 일시 중지합니다. |

**(A)** : 데이터 다운로드는 당연히 네트워크 I/O에 영향을 미칩니다.

**(B)** : Auto Scaling 정책은 네트워크 I/O 기반으로 설정할 수 있습니다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(C)** : Auto Scaling 정책이 구성되어 있더라도 스케일링 활동을 일시 중지할 수 있습니다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(D) 정답** : Auto Scaling의 스케일링 프로세스 일시 중지(Suspend Scaling) 기능을 사용하면 일시적으로 스케일링 이벤트를 막을 수 있습니다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**핵심 개념:** Auto Scaling 스케일링 일시 중지(Suspend Scaling)

**관련 노트:** [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q89. The Amazon EC2 web service can be accessed using the [...] web services messaging protocol. This interface is described by a Web Services Description Language (WSDL) document.

**Options:**
- A) SOAP.
- B) DCOM.
- C) CORBA.
- D) XML-RPC.

**Answer:** A

**해설:**

> **문제:** Amazon EC2 웹 서비스는 [...] 웹 서비스 메시징 프로토콜을 사용하여 접근할 수 있습니다. 이 인터페이스는 WSDL(Web Services Description Language) 문서로 설명됩니다.

| 선지 | 번역 |
|------|------|
| A | SOAP. |
| B | DCOM. |
| C | CORBA. |
| D | XML-RPC. |

**(A) 정답** : Amazon EC2는 SOAP(Simple Object Access Protocol) 기반 웹 서비스 인터페이스를 제공했습니다. WSDL로 설명되는 것도 SOAP 서비스의 특징입니다.

**(B)** : DCOM은 Microsoft의 분산 컴포넌트 객체 모델로 AWS와 관련 없습니다.

**(C)** : CORBA는 객체 요청 브로커 아키텍처로 AWS EC2와 관련 없습니다.

**(D)** : XML-RPC는 HTTP 위에서 XML을 사용하지만 WSDL과는 다른 프로토콜입니다.

**핵심 개념:** Amazon EC2 SOAP API — WSDL 기반 웹 서비스

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

---

### Q90. Which of the following are true regarding encrypted Amazon Elastic Block Store (EBS) volumes? (Choose 2 answers)

**Options:**
- A) Supported on all Amazon EBS volume types.
- B) Snapshots are automatically encrypted.
- C) Available to all instance types.
- D) Existing volumes can be encrypted.
- E) Shared volumes can be encrypted.

**Answer:** A, B

**해설:**

> **문제:** 다음 중 암호화된 Amazon EBS 볼륨에 관한 올바른 설명은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 모든 Amazon EBS 볼륨 유형에서 지원됩니다. |
| B | 스냅샷은 자동으로 암호화됩니다. |
| C | 모든 인스턴스 유형에서 사용 가능합니다. |
| D | 기존 볼륨을 암호화할 수 있습니다. |
| E | 공유 볼륨을 암호화할 수 있습니다. |

**(A) 정답** : EBS 암호화는 gp2, gp3, io1, io2, st1, sc1, 마그네틱 등 모든 EBS 볼륨 유형에서 지원됩니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(B) 정답** : 암호화된 EBS 볼륨의 스냅샷은 자동으로 암호화되며, 암호화된 스냅샷으로 복원된 볼륨도 자동으로 암호화됩니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(C)** : EBS 암호화는 일부 이전 인스턴스 유형에서는 지원되지 않습니다. 모든 인스턴스 유형에서 사용 가능한 것이 아닙니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(D)** : 기존(비암호화) EBS 볼륨을 직접 암호화로 전환할 수 없습니다. 스냅샷을 통한 복사로 새 암호화 볼륨을 만들어야 합니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**(E)** : 공유 볼륨 암호화는 별도의 고려 사항이 필요하며, 이 문맥에서는 정답이 아닙니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**핵심 개념:** EBS 암호화 — 볼륨 유형 지원, 스냅샷 자동 암호화

**관련 노트:** [EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption), [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

---

### Q91. Is Federated Storage Engine currently supported by Amazon RDS for MySQL?

**Options:**
- A) Only for Oracle RDS instances.
- B) Yes.
- C) No.
- D) Only in VPC.

**Answer:** C

**해설:**

> **문제:** Federated Storage Engine은 현재 Amazon RDS for MySQL에서 지원됩니까?

| 선지 | 번역 |
|------|------|
| A | Oracle RDS 인스턴스에서만 지원됩니다. |
| B | 예. |
| C | 아니오. |
| D | VPC에서만 지원됩니다. |

**(A)** : Oracle RDS와 MySQL의 Federated Storage Engine은 별개 개념입니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : Amazon RDS for MySQL은 Federated Storage Engine을 지원하지 않습니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C) 정답** : Amazon RDS for MySQL은 Federated Storage Engine을 지원하지 않습니다. RDS는 관리형 서비스 특성상 원격 서버 참조가 필요한 Federated Engine을 비활성화합니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D)** : VPC 여부와 관계없이 Amazon RDS for MySQL에서 Federated Storage Engine은 지원되지 않습니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** Amazon RDS MySQL — 지원되지 않는 기능(Federated Storage Engine)

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q92. While creating the snapshots using the API, which Action should I be using?

**Options:**
- A) MakeSnapShot.
- B) FreshSnapshot.
- C) DeploySnapshot.
- D) CreateSnapshot.

**Answer:** D

**해설:**

> **문제:** API를 사용하여 스냅샷을 생성할 때 어떤 액션(Action)을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | MakeSnapShot. |
| B | FreshSnapshot. |
| C | DeploySnapshot. |
| D | CreateSnapshot. |

**(A)** : MakeSnapShot은 존재하지 않는 AWS API 액션입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : FreshSnapshot은 존재하지 않는 AWS API 액션입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(C)** : DeploySnapshot은 존재하지 않는 AWS API 액션입니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(D) 정답** : EBS 스냅샷 생성 API 액션은 CreateSnapshot입니다. AWS CLI 기준으로는 aws ec2 create-snapshot 명령을 사용합니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** EBS 스냅샷 생성 API — CreateSnapshot

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

---

### Q93. A customer needs to capture all client connection information from their load balancer every five minutes. The company wants to use this data for analyzing traffic patterns and troubleshooting their applications. Which of the following options meets the customer requirements?

**Options:**
- A) Enable AWS CloudTrail for the load balancer.
- B) Enable access logs on the load balancer.
- C) Install the Amazon CloudWatch Logs agent on the load balancer.
- D) Enable Amazon CloudWatch metrics on the load balancer.

**Answer:** A

**해설:**

> **문제:** 고객은 5분마다 로드 밸런서의 모든 클라이언트 연결 정보를 캡처해야 합니다. 이 데이터를 트래픽 패턴 분석 및 애플리케이션 문제 해결에 사용하려고 합니다. 고객 요구 사항을 충족하는 옵션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 로드 밸런서에 AWS CloudTrail을 활성화합니다. |
| B | 로드 밸런서에 액세스 로그를 활성화합니다. |
| C | 로드 밸런서에 Amazon CloudWatch Logs 에이전트를 설치합니다. |
| D | 로드 밸런서에 Amazon CloudWatch 지표를 활성화합니다. |

**(A) 정답** : ELB의 액세스 로그(클라이언트 연결 정보)를 캡처하려면 Access Logs 기능을 사용해야 합니다. CloudTrail은 API 호출을 기록하며 클라이언트 연결 정보를 제공하지 않습니다. → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(B)** : ELB 액세스 로그는 클라이언트 IP, 요청 경로, 응답 코드 등 모든 클라이언트 연결 정보를 S3에 저장합니다. 5분 또는 60분 간격으로 설정 가능합니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(C)** : CloudWatch Logs 에이전트는 EC2 인스턴스에 설치하는 것으로, ELB 자체의 연결 로그와는 다릅니다. → [📖 CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

**(D)** : CloudWatch 지표는 집계된 통계(요청 수, 지연 시간 등)를 제공하지만 개별 클라이언트 연결 정보는 제공하지 않습니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** ELB 액세스 로그 — 클라이언트 연결 정보 캡처

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs), [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q94. Will my standby RDS instance be in the same Region as my primary?

**Options:**
- A) Only for Oracle RDS types.
- B) Yes.
- C) Only if configured at launch.
- D) No.

**Answer:** B

**해설:**

> **문제:** RDS 스탠바이 인스턴스는 기본 인스턴스와 같은 리전에 위치합니까?

| 선지 | 번역 |
|------|------|
| A | Oracle RDS 유형에서만 그렇습니다. |
| B | 예. |
| C | 시작 시 구성된 경우에만 그렇습니다. |
| D | 아니오. |

**(A)** : Multi-AZ 스탠바이는 모든 RDS 엔진에서 동일 리전에 위치합니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(B) 정답** : RDS Multi-AZ 구성에서 스탠바이 인스턴스는 항상 기본 인스턴스와 같은 리전 내 다른 가용 영역에 배치됩니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : Multi-AZ 스탠바이는 항상 같은 리전에 위치하며, 다른 리전에 배치할 수 없습니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(D)** : 스탠바이는 항상 같은 리전 내에 있습니다. 다른 리전 복제는 읽기 복제본(Cross-Region Read Replica)으로 구현합니다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**핵심 개념:** RDS Multi-AZ — 스탠바이는 동일 리전 다른 AZ

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

---

### Q95. If I want my instance to run on a single-tenant hardware, which value do I have to set the instance's tenancy attribute to?

**Options:**
- A) Dedicated.
- B) Isolated.
- C) One.
- D) Reserved.

**Answer:** A

**해설:**

> **문제:** 인스턴스를 단일 테넌트 하드웨어에서 실행하려면 인스턴스의 테넌시(tenancy) 속성을 어떤 값으로 설정해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Dedicated. |
| B | Isolated. |
| C | One. |
| D | Reserved. |

**(A) 정답** : 테넌시 속성을 'dedicated'로 설정하면 해당 인스턴스는 단일 테넌트(전용) 하드웨어에서 실행됩니다. 다른 고객과 물리적 서버를 공유하지 않습니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : Isolated는 EC2 테넌시 유효 값이 아닙니다.

**(C)** : One은 EC2 테넌시 유효 값이 아닙니다.

**(D)** : Reserved는 구매 옵션(예약 인스턴스)을 의미하며 테넌시 속성 값이 아닙니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** EC2 전용 인스턴스(Dedicated Instance) — 테넌시 속성

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q96. Can the string value of 'Key' be prefixed with :aws:'?

**Options:**
- A) Only in GovCloud.
- B) Only for S3 not EC2.
- C) Yes.
- D) No.

**Answer:** D

**해설:**

> **문제:** 'Key'의 문자열 값에 ':aws:' 접두사를 붙일 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | GovCloud에서만 가능합니다. |
| B | EC2가 아닌 S3에서만 가능합니다. |
| C | 예. |
| D | 아니오. |

**(A)** : GovCloud 여부와 관계없이 이 제한은 모든 AWS 리전에 적용됩니다.

**(B)** : 서비스에 관계없이 aws: 접두사는 예약되어 있습니다.

**(C)** : aws: 접두사는 AWS 자체에서 사용하도록 예약되어 있으므로 사용자가 태그 키에 이 접두사를 사용할 수 없습니다.

**(D) 정답** : AWS 태그 키에서 'aws:' 접두사는 AWS 자체용으로 예약되어 있어 사용자는 태그 키 이름에 이 접두사를 사용할 수 없습니다.

**핵심 개념:** AWS 태그 키 제한 — aws: 접두사 예약

---

### Q97. A user wants to increase the durability and availability of the EBS volume. Which of the below mentioned actions should he perform?

**Options:**
- A) Take regular snapshots.
- B) Create an AM.
- C) Create EBS with higher capacity.
- D) Access EBS regularly.

**Answer:** A

**해설:**

> **문제:** 사용자가 EBS 볼륨의 내구성과 가용성을 높이려고 합니다. 어떤 조치를 취해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 정기적으로 스냅샷을 생성합니다. |
| B | AMI를 생성합니다. |
| C | 더 큰 용량의 EBS를 생성합니다. |
| D | EBS에 정기적으로 접근합니다. |

**(A) 정답** : EBS 볼륨을 정기적으로 스냅샷으로 백업하면 데이터 손실 시 복원이 가능하여 내구성과 가용성이 향상됩니다. 스냅샷은 S3에 저장되어 높은 내구성을 보장합니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : AMI는 인스턴스 전체 이미지로, EBS 볼륨 내구성 향상과 직접적인 관련이 없습니다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(C)** : 용량을 늘리는 것은 내구성이나 가용성 향상과 관련이 없습니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : 정기적 접근은 내구성 향상과 관련이 없습니다.

**핵심 개념:** EBS 내구성 향상 — 정기 스냅샷

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q98. What does Amazon RDS stand for?

**Options:**
- A) Regional Data Server.
- B) Relational Database Service.
- C) Nothing.
- D) Regional Database Service.

**Answer:** B

**해설:**

> **문제:** Amazon RDS는 무엇을 의미합니까?

| 선지 | 번역 |
|------|------|
| A | Regional Data Server. |
| B | Relational Database Service. |
| C | 아무 의미 없음. |
| D | Regional Database Service. |

**(A)** : Regional Data Server는 RDS의 실제 의미가 아닙니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B) 정답** : RDS는 Relational Database Service의 약자로, AWS의 관계형 데이터베이스 관리형 서비스입니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : RDS는 명확한 의미를 가진 서비스명입니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(D)** : Regional Database Service는 RDS의 실제 의미가 아닙니다. → [📖 Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** Amazon RDS — Relational Database Service

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q99. You have been asked to set up monitoring of your network and you have decided that Cloudwatch would be the best service to use. Amazon CloudWatch monitors your Amazon Web Services (AWS) resources and the applications you run on AWS in real-time. You can use CloudWatch to collect and track metrics, which are the variables you want to measure for your resources and applications. Which of the following items listed can AWS Cloudwatch monitor?

**Options:**
- A) Log files your applications generate.
- B) All of the items listed on this page.
- C) System-wide visibility into resource utilization, application performance, and operational health.
- D) Custom metrics generated by your applications and services.

**Answer:** B

**해설:**

> **문제:** 네트워크 모니터링을 설정하는 작업을 맡았으며 CloudWatch가 가장 적합한 서비스라고 결정했습니다. Amazon CloudWatch는 AWS 리소스와 AWS에서 실행하는 애플리케이션을 실시간으로 모니터링합니다. CloudWatch를 사용하여 리소스와 애플리케이션에서 측정하고자 하는 변수인 지표를 수집하고 추적할 수 있습니다. 다음 중 AWS CloudWatch가 모니터링할 수 있는 항목은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 애플리케이션이 생성하는 로그 파일. |
| B | 이 페이지에 나열된 모든 항목. |
| C | 리소스 활용, 애플리케이션 성능, 운영 상태에 대한 시스템 전체 가시성. |
| D | 애플리케이션과 서비스가 생성하는 사용자 정의 지표. |

**(A)** : CloudWatch Logs를 통해 애플리케이션 로그 파일을 모니터링할 수 있습니다. → [📖 CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs)

**(B) 정답** : CloudWatch는 로그 파일, 시스템 지표, 사용자 정의 지표 등 나열된 모든 항목을 모니터링할 수 있습니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C)** : CloudWatch는 리소스 활용, 애플리케이션 성능, 운영 상태 가시성을 제공합니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : CloudWatch는 사용자 정의 지표(Custom Metrics) 수집도 지원합니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** Amazon CloudWatch — 로그, 지표, 사용자 정의 지표 모니터링

**관련 노트:** [CloudWatch Logs](/section/22-monitoring-audit-performance#cloudwatch-logs), [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q100. What is the maximum write throughput I can provision for a single Dynamic DB table?

**Options:**
- A) 1,000 write capacity units.
- B) 100,000 write capacity units.
- C) Dynamic DB is designed to scale without limits, but if you go beyond 10,000 you have to contact AWS first.
- D) 10,000 write capacity units.

**Answer:** C

**해설:**

> **문제:** 단일 DynamoDB 테이블에 프로비저닝할 수 있는 최대 쓰기 처리량은 얼마입니까?

| 선지 | 번역 |
|------|------|
| A | 1,000 쓰기 용량 유닛(Write Capacity Units). |
| B | 100,000 쓰기 용량 유닛. |
| C | DynamoDB는 한도 없이 확장되도록 설계되었지만, 10,000을 초과하면 AWS에 먼저 문의해야 합니다. |
| D | 10,000 쓰기 용량 유닛. |

**(A)** : 1,000 WCU는 DynamoDB의 실제 최댓값이 아닙니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : 100,000 WCU가 정해진 상한선이 아닙니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(C) 정답** : DynamoDB는 이론적으로 무제한 확장이 가능하도록 설계되었습니다. 단, 기본 서비스 한도를 초과하려면 AWS 지원 팀에 한도 증가를 요청해야 합니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(D)** : 10,000 WCU는 기본 소프트 한도이지만, 요청을 통해 증가시킬 수 있습니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**핵심 개념:** DynamoDB 쓰기 용량 유닛(WCU) 한도 — 무제한 확장 설계

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---
