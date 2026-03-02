# Ditectrev SAA-C03 Practice Questions — Batch 12 (Q551-Q600)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---


### Q551. A user has created an ELB with the Availability Zone US-East-1A. The user wants to add more zones to ELB to achieve High Availability. How can the user add more zones to the existing ELB?

**Options:**
- A) The user should stop the ELB and add zones and instances as required.
- B) The only option is to launch instances in different zones and add to ELB.
- C) It is not possible to add more zones to the existing ELB.
- D) The user can add zones on the fly from the AWS console.

**Answer:** D

**해설:**

> **문제:** US-East-1A 가용 영역으로 ELB를 생성한 후, 고가용성을 위해 더 많은 가용 영역을 추가하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | ELB를 중지하고 필요한 가용 영역과 인스턴스를 추가합니다. |
| B | 다른 가용 영역에 인스턴스를 시작하고 ELB에 추가하는 것만 가능합니다. |
| C | 기존 ELB에 더 많은 가용 영역을 추가하는 것은 불가능합니다. |
| D | 사용자는 AWS 콘솔에서 즉시(on the fly) 가용 영역을 추가할 수 있습니다. |

**(A)** : ELB는 중지할 필요 없이 실행 중에 가용 영역을 추가할 수 있습니다. → [📖 ELB는 중지할 필요 없이 실행 중에 가용 영역을 추가할 수 있습니다.](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B)** : 인스턴스 추가만이 유일한 방법이 아닙니다.

**(C)** : 기존 ELB에 가용 영역 추가가 가능합니다. → [📖 기존 ELB에 가용 영역 추가가 가능합니다.](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D) 정답** : ELB는 중지 없이 AWS 콘솔 또는 CLI에서 실시간으로 가용 영역을 추가하거나 제거할 수 있습니다. → [📖 ELB는 중지 없이 AWS 콘솔 또는 CLI에서 실시간으로 가용 영역을 추가하거나 제거할 수 있습니다.](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**핵심 개념:** ELB 가용 영역 동적 추가, ELB 고가용성 구성

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [ALB Application Load Balancer 상세](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

---

### Q552. Amazon SWF is designed to help users …

**Options:**
- A) Design graphical user interface interactions.
- B) Manage user identification and authorization.
- C) Store Web content.
- D) Coordinate synchronous and asynchronous tasks which are distributed and fault tolerant.

**Answer:** D

**해설:**

> **문제:** Amazon SWF(Simple Workflow Service)는 무엇을 돕기 위해 설계되었습니까?

| 선지 | 번역 |
|------|------|
| A | 그래픽 사용자 인터페이스 상호작용 설계. |
| B | 사용자 인증 및 권한 부여 관리. |
| C | 웹 콘텐츠 저장. |
| D | 분산되고 내결함성 있는 동기/비동기 작업 조율. |

**(A), (B), (C)** : SWF의 목적과 관련 없습니다.

**(D) 정답** : Amazon SWF는 여러 컴퓨팅 환경에 걸쳐 분산된 동기 및 비동기 작업을 조율하는 완전 관리형 워크플로 서비스입니다. 내결함성을 갖추고 있어 작업 실패 시 재시도가 가능합니다.

**핵심 개념:** Amazon SWF 목적, 분산 워크플로 조율

---

### Q553. Which technique can be used to integrate AWS IAM (Identity and Access Management) with an on-premise LDAP (Lightweight Directory Access Protocol) directory service?

**Options:**
- A) Use an IAM policy that references the LDAP account identifiers and the AWS credentials.
- B) Use SAML (Security Assertion Markup Language) to enable single sign-on between AWS and LDAP.
- C) Use AWS Security Token Service from an identity broker to issue short-lived AWS credentials.
- D) Use IAM roles to automatically rotate the IAM credentials when LDAP credentials are updated.
- E) Use the LDAP credentials to restrict a group of users from launching specific EC2 instance types.

**Answer:** B

**해설:**

> **문제:** AWS IAM을 온프레미스 LDAP 디렉터리 서비스와 통합하는 기술은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | LDAP 계정 식별자와 AWS 자격 증명을 참조하는 IAM 정책 사용. |
| B | SAML을 사용하여 AWS와 LDAP 간 SSO 활성화. |
| C | 아이덴티티 브로커의 AWS STS를 사용하여 단기 AWS 자격 증명 발급. |
| D | LDAP 자격 증명이 업데이트될 때 IAM 자격 증명을 자동으로 교체하는 IAM 역할 사용. |
| E | LDAP 자격 증명을 사용하여 특정 EC2 인스턴스 유형 시작을 제한. |

**(A)** : IAM 정책은 LDAP 계정을 직접 참조하지 않습니다. → [📖 IAM 정책은 LDAP 계정을 직접 참조하지 않습니다.](/section/02-iam#iam-policies-정책)

**(B) 정답** : SAML 2.0 페더레이션을 통해 온프레미스 LDAP(또는 AD)과 AWS 간 SSO를 구현할 수 있습니다. LDAP 사용자가 AWS 콘솔에 LDAP 자격 증명으로 로그인할 수 있습니다. → [📖 SAML 2.0 페더레이션을 통해 온프레미스 LDAP(또는 AD)과 AWS 간 SSO를 구현할 수 있습니다....](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**(C)** : STS와 아이덴티티 브로커는 SAML 없이 커스텀 페더레이션을 구현하는 방법으로, 더 복잡합니다.

**(D)** : IAM이 LDAP 변경에 자동 동기화되는 기능은 없습니다.

**(E)** : LDAP 자격 증명을 EC2 인스턴스 타입 제한에 직접 사용할 수 없습니다.

**핵심 개념:** SAML 2.0 페더레이션, AWS IAM과 LDAP/AD 통합, SSO 구현

**관련 노트:** [AWS IAM Identity Center AWS SSO 후속](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속), [Microsoft Active Directory AD](/section/23-advanced-identity#microsoft-active-directory-ad), [IAM Roles 역할](/section/02-iam#iam-roles-역할)

---

### Q554. You are building a solution for a customer to extend their on-premises data center to AWS. The customer requires a 50-Mbps dedicated and private connection to their VPC. Which AWS product or feature satisfies this requirement?

**Options:**
- A) Amazon VPC peering.
- B) Elastic IP Addresses.
- C) AWS Direct Connect.
- D) Amazon VPC virtual private gateway.

**Answer:** C

**해설:**

> **문제:** 온프레미스 데이터 센터를 AWS VPC에 50Mbps 전용 프라이빗 연결로 확장하려면 어떤 AWS 제품을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Amazon VPC 피어링. |
| B | Elastic IP 주소. |
| C | AWS Direct Connect. |
| D | Amazon VPC 가상 프라이빗 게이트웨이. |

**(A)** : VPC 피어링은 두 VPC 간 연결로 온프레미스 연결에 사용하지 않습니다. → [📖 VPC 피어링은 두 VPC 간 연결로 온프레미스 연결에 사용하지 않습니다.](/section/25-vpc#vpc-peering)

**(B)** : Elastic IP는 퍼블릭 IP 주소로 전용 프라이빗 연결이 아닙니다. → [📖 Elastic IP는 퍼블릭 IP 주소로 전용 프라이빗 연결이 아닙니다.](/section/04-ec2-associate#elastic-ip)

**(C) 정답** : AWS Direct Connect는 온프레미스 데이터 센터와 AWS 간의 전용(dedicated) 프라이빗 네트워크 연결을 제공합니다. 50Mbps, 100Mbps, 500Mbps, 1Gbps, 10Gbps 등 다양한 대역폭을 지원합니다. → [📖 AWS Direct Connect는 온프레미스 데이터 센터와 AWS 간의 전용(dedicated) 프라이빗 ...](/section/25-vpc#direct-connect-dx)

**(D)** : 가상 프라이빗 게이트웨이는 VPN 연결에 필요한 VPC 측 구성 요소로 전용 연결 자체는 아닙니다. → [📖 가상 프라이빗 게이트웨이는 VPN 연결에 필요한 VPC 측 구성 요소로 전용 연결 자체는 아닙니다.](/section/25-vpc#sitetosite-vpn)

**핵심 개념:** AWS Direct Connect 전용 프라이빗 연결, Direct Connect vs VPN 비교

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

---

### Q555. A customer wants to leverage Amazon Simple Storage Service (S3) and Amazon Glacier as part of their backup and archive infrastructure. The customer plans to use third-party software to support this integration. Which approach will limit the access of the third party software to only the Amazon S3 bucket named 'company-backup'?

**Options:**
- A) A custom bucket policy limited to the Amazon S3 API in the Amazon Glacier archive 'company backup'.
- B) A custom bucket policy limited to the Amazon S3 API in 'company-backup'.
- C) A custom IAM user policy limited to the Amazon S3 API for the Amazon Glacier archive 'company backup'.
- D) A custom IAM user policy limited to the Amazon S3 API in 'company-backup'.

**Answer:** D

**해설:**

> **문제:** 제3자 소프트웨어의 접근을 'company-backup' S3 버킷으로만 제한하려면 어떤 방법을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Glacier 아카이브 'company backup'의 S3 API로 제한된 커스텀 버킷 정책. |
| B | 'company-backup'의 S3 API로 제한된 커스텀 버킷 정책. |
| C | Glacier 아카이브 'company backup'의 S3 API로 제한된 커스텀 IAM 사용자 정책. |
| D | 'company-backup'의 S3 API로 제한된 커스텀 IAM 사용자 정책. |

**(A), (C)** : Glacier 아카이브를 S3 버킷 정책으로 제어할 수 없으며, 요구사항은 S3 버킷 접근 제한입니다.

**(B)** : 버킷 정책은 버킷에 대한 접근을 정의하지만 제3자 소프트웨어가 사용하는 IAM 사용자에 대한 권한을 별도로 정의하는 IAM 사용자 정책이 더 적합합니다. → [📖 버킷 정책은 버킷에 대한 접근을 정의하지만 제3자 소프트웨어가 사용하는 IAM 사용자에 대한 권한을 별도로 ...](/section/10-amazon-s3#s3-bucket-policy)

**(D) 정답** : 제3자 소프트웨어를 위한 IAM 사용자를 생성하고, 해당 사용자의 정책에서 'company-backup' 버킷에 대한 S3 API 접근만 허용합니다. IAM 사용자 정책은 특정 리소스로 접근을 제한하는 데 적합합니다. → [📖 제3자 소프트웨어를 위한 IAM 사용자를 생성하고, 해당 사용자의 정책에서 'company-backup' 버...](/section/02-iam#users-groups)

**핵심 개념:** IAM 사용자 정책 vs 버킷 정책, 제3자 소프트웨어 접근 제어

**관련 노트:** [S3 보안](/section/10-amazon-s3#s3-보안), [S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy), [IAM Policies 정책](/section/02-iam#iam-policies-정책)

---

### Q556. A user needs to run a batch process which runs for 10 minutes. This will only be run once, or at maximum twice, in the next month, so the processes will be temporary only. The process needs 15 X-Large instances. The process downloads the code from S3 on each instance when it is launched, and then generates a temporary log file. Once the instance is terminated, all the data will be lost. Which of the below mentioned pricing models should the user choose in this case?

**Options:**
- A) Spot instance.
- B) Reserved instance.
- C) On-demand instance.
- D) EBS optimized instance.

**Answer:** A

**해설:**

> **문제:** 한 달에 최대 2회, 10분간 실행되는 임시 배치 작업에 15개의 X-Large 인스턴스가 필요합니다. 인스턴스 종료 후 모든 데이터는 손실됩니다. 어떤 가격 모델을 선택해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 스팟 인스턴스. |
| B | 예약 인스턴스. |
| C | 온디맨드 인스턴스. |
| D | EBS 최적화 인스턴스. |

**(A) 정답** : 스팟 인스턴스는 온디맨드 대비 최대 90% 저렴합니다. 작업이 짧고(10분), 임시적이며, 중단되어도 데이터 손실이 없는 경우 스팟이 최적입니다. 한 달에 1~2회만 실행하므로 인터럽트 위험이 있어도 재시도 비용이 낮습니다. → [📖 스팟 인스턴스는 온디맨드 대비 최대 90% 저렴합니다. 작업이 짧고(10분), 임시적이며, 중단되어도 데이터...](/section/03-ec2-basics#spot-instance-상세)

**(B)** : 예약 인스턴스는 장기(1~3년) 약정으로 월 1~2회 사용에는 비효율적입니다. → [📖 예약 인스턴스는 장기(1~3년) 약정으로 월 1~2회 사용에는 비효율적입니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : 온디맨드는 스팟보다 비용이 높으며, 이 사용 패턴에는 과도합니다. → [📖 온디맨드는 스팟보다 비용이 높으며, 이 사용 패턴에는 과도합니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(D)** : EBS 최적화는 가격 모델이 아닌 인스턴스 유형 속성입니다.

**핵심 개념:** EC2 스팟 인스턴스 적합 사용 사례: 임시 배치 작업, 비용 최적화

**관련 노트:** [Spot Instance 상세](/section/03-ec2-basics#spot-instance-상세), [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q557. You have been doing a lot of testing of your VPC Network by deliberately failing EC2 instances to test whether instances are failing over properly. Your customer who will be paying the AWS bill for all this asks you if he being charged for all these instances. You try to explain to him how the billing works on EC2 instances to the best of your knowledge. What would be an appropriate response to give to the customer in regards to this?

**Options:**
- A) Billing commences when Amazon EC2 AMI instance is completely up and billing ends as soon as the instance starts to shutdown.
- B) Billing only commences only after 1 hour of uptime and billing ends when the instance terminates.
- C) Billing commences when Amazon EC2 initiates the boot sequence of an AMI instance and billing ends when the instance shuts down.
- D) Billing commences when Amazon EC2 initiates the boot sequence of an AMI instance and billing ends as soon as the instance starts to shutdown.

**Answer:** C

**해설:**

> **문제:** EC2 인스턴스 요금 청구 방식에 대해 고객에게 적절히 설명하면?

| 선지 | 번역 |
|------|------|
| A | 인스턴스가 완전히 가동되면 청구가 시작되고, 종료가 시작되는 즉시 청구가 종료됩니다. |
| B | 가동 시간 1시간 이후에만 청구가 시작되고 인스턴스가 종료될 때 청구가 종료됩니다. |
| C | Amazon EC2가 AMI 인스턴스 부팅 순서를 시작할 때 청구가 시작되고, 인스턴스가 종료될 때 청구가 종료됩니다. |
| D | Amazon EC2가 AMI 인스턴스 부팅 순서를 시작할 때 청구가 시작되고, 종료가 시작되는 즉시 청구가 종료됩니다. |

**(A)** : 완전히 가동된 후가 아니라 부팅 시퀀스 시작 시점부터 청구됩니다. → [📖 완전히 가동된 후가 아니라 부팅 시퀀스 시작 시점부터 청구됩니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : 1시간 이후가 아니라 부팅 시작 즉시 청구됩니다. → [📖 1시간 이후가 아니라 부팅 시작 즉시 청구됩니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C) 정답** : EC2 인스턴스는 부팅 시퀀스가 시작되는 순간부터 인스턴스가 완전히 종료될 때까지 요금이 청구됩니다. → [📖 EC2 인스턴스는 부팅 시퀀스가 시작되는 순간부터 인스턴스가 완전히 종료될 때까지 요금이 청구됩니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(D)** : 종료가 시작되는 즉시가 아니라 인스턴스가 완전히 종료(terminated)된 후에 청구가 종료됩니다. → [📖 종료가 시작되는 즉시가 아니라 인스턴스가 완전히 종료(terminated)된 후에 청구가 종료됩니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** EC2 인스턴스 요금 청구 시작/종료 시점

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q558. Refer to the architecture diagram above of a batch processing solution using Simple Queue Service (SQS) to set up a message queue between EC2 instances which are used as batch processors. CloudWatch monitors the number of Job requests (queued messages) and an Auto Scaling group adds or deletes batch servers automatically based on parameters set in CloudWatch alarms. You can use this architecture to implement which of the following features in a cost effective and efficient manner?

**Options:**
- A) Reduce the overall time for executing jobs through parallel processing by allowing a busy EC2 instance that receives a message to pass it to the next instance in a daisy-chain setup.
- B) Implement fault tolerance against EC2 instance failure since messages would remain in SQS and work can continue with recovery of EC2 instances; implement fault tolerance against SQS failure by backing up messages to S3.
- C) Implement message passing between EC2 instances within a batch by exchanging messages through SQS.
- D) Coordinate number of EC2 instances with number of job requests automatically thus improving cost effectiveness.
- E) Handle high priority jobs before lower priority jobs by assigning a priority metadata field to SQS messages.

**Answer:** C

**해설:**

> **문제:** SQS + EC2 배치 처리 + CloudWatch + ASG 아키텍처로 비용 효율적이고 효과적으로 구현할 수 있는 기능은?

| 선지 | 번역 |
|------|------|
| A | 바쁜 EC2 인스턴스가 메시지를 다음 인스턴스에 전달하는 데이지 체인 방식으로 병렬 처리를 통한 작업 실행 시간 단축. |
| B | SQS 장애에 대비한 내결함성(S3 백업) 및 EC2 장애에 대한 내결함성 구현. |
| C | SQS를 통해 배치 내 EC2 인스턴스 간 메시지 전달 구현. |
| D | 작업 요청 수에 따라 EC2 인스턴스 수를 자동으로 조율하여 비용 효율성 향상. |
| E | SQS 메시지에 우선순위 메타데이터 필드를 할당하여 고우선순위 작업 우선 처리. |

**(A)** : SQS는 데이지 체인 방식을 지원하지 않으며, 한 인스턴스가 다른 인스턴스에 메시지를 전달하는 구조가 아닙니다. → [📖 SQS는 데이지 체인 방식을 지원하지 않으며, 한 인스턴스가 다른 인스턴스에 메시지를 전달하는 구조가 아닙니...](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(B)** : SQS는 자체적으로 고가용성을 제공하며 S3 백업이 별도로 필요하지 않습니다. → [📖 SQS는 자체적으로 고가용성을 제공하며 S3 백업이 별도로 필요하지 않습니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(C) 정답** : 이 아키텍처에서 SQS는 EC2 배치 처리 인스턴스 간 메시지 전달 메커니즘으로 활용됩니다. CloudWatch + ASG로 인스턴스 수를 자동 조절하는 것도 이 구조의 핵심 기능입니다. → [📖 이 아키텍처에서 SQS는 EC2 배치 처리 인스턴스 간 메시지 전달 메커니즘으로 활용됩니다. CloudWat...](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : D도 맞는 설명이지만 가장 직접적인 답은 C입니다.

**(E)** : 표준 SQS는 메시지 우선순위를 지원하지 않습니다. → [📖 표준 SQS는 메시지 우선순위를 지원하지 않습니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** SQS 기반 배치 처리 아키텍처, CloudWatch + ASG 자동 스케일링

**관련 노트:** [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg), [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

---

### Q559. You are migrating an internal server on your DC to an EC2 instance with EBS volume. Your server disk usage is around 500GB so you just copied all your data to a 2TB disk to be used with AWS Import/Export. Where will the data be imported once it arrives at Amazon?

**Options:**
- A) To a 2TB EBS volume.
- B) To an S3 bucket with 2 objects of 1TB.
- C) To a 500GB EBS volume.
- D) To an S3 bucket as a 2TB snapshot.

**Answer:** B

**해설:**

> **문제:** 500GB 데이터를 2TB 디스크에 복사하여 AWS Import/Export로 전송했습니다. Amazon에 도착하면 데이터는 어디에 임포트됩니까?

| 선지 | 번역 |
|------|------|
| A | 2TB EBS 볼륨. |
| B | 2개의 1TB 객체가 있는 S3 버킷. |
| C | 500GB EBS 볼륨. |
| D | 2TB 스냅샷으로 S3 버킷. |

**(A)** : AWS Import/Export는 기본적으로 S3로 임포트합니다. → [📖 AWS Import/Export는 기본적으로 S3로 임포트합니다.](/section/10-amazon-s3#s3-객체-object)

**(B) 정답** : AWS Import/Export는 디스크 데이터를 S3 버킷으로 임포트합니다. S3 단일 객체 최대 크기는 5TB이지만, 멀티파트 업로드를 사용하여 1TB 단위 객체로 분할될 수 있습니다. 2TB 디스크는 2개의 1TB 객체로 S3에 저장됩니다. → [📖 AWS Import/Export는 디스크 데이터를 S3 버킷으로 임포트합니다. S3 단일 객체 최대 크기는 ...](/section/11-s3-advanced#s3-baseline-performance-기본-성능)

**(C)** : 500GB EBS로 임포트되지 않습니다.

**(D)** : 스냅샷 형태가 아닌 객체 형태로 S3에 저장됩니다. → [📖 스냅샷 형태가 아닌 객체 형태로 S3에 저장됩니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** AWS Import/Export 데이터 임포트 대상(S3), 객체 크기 분할

**관련 노트:** [S3 객체 Object](/section/10-amazon-s3#s3-객체-object)

---

### Q560. Is there any way to own a direct connection to Amazon Web Services?

**Options:**
- A) You can create an encrypted tunnel to VPC, but you don't own the connection.
- B) Yes, it's called Amazon Dedicated Connection.
- C) No, AWS only allows access from the public Internet.
- D) Yes, it's called Direct Connect.

**Answer:** D

**해설:**

> **문제:** Amazon Web Services에 직접 연결(direct connection)을 소유할 수 있는 방법이 있습니까?

| 선지 | 번역 |
|------|------|
| A | VPC에 암호화된 터널을 생성할 수 있지만 연결을 소유하지는 않습니다. |
| B | 예, Amazon Dedicated Connection이라고 합니다. |
| C | 아니요, AWS는 퍼블릭 인터넷에서의 접근만 허용합니다. |
| D | 예, Direct Connect라고 합니다. |

**(A)** : VPN은 인터넷 기반 암호화 터널로 전용 연결이 아닙니다. → [📖 VPN은 인터넷 기반 암호화 터널로 전용 연결이 아닙니다.](/section/25-vpc#sitetosite-vpn)

**(B)** : 정확한 서비스 이름이 아닙니다.

**(C)** : AWS는 퍼블릭 인터넷 외에도 Direct Connect를 통한 전용 연결을 지원합니다.

**(D) 정답** : AWS Direct Connect는 온프레미스 환경과 AWS 간의 전용 네트워크 연결을 제공하는 서비스입니다. 인터넷을 우회하여 안정적이고 낮은 지연시간의 연결을 제공합니다. → [📖 AWS Direct Connect는 온프레미스 환경과 AWS 간의 전용 네트워크 연결을 제공하는 서비스입니다...](/section/25-vpc#direct-connect-dx)

**핵심 개념:** AWS Direct Connect, 전용 프라이빗 연결

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx)

---

### Q561. Which of the following strategies can be used to control access to your Amazon EC2 instances?

**Options:**
- A) DB security groups.
- B) IAM policies.
- C) None of these.
- D) EC2 security groups.

**Answer:** D

**해설:**

> **문제:** Amazon EC2 인스턴스에 대한 접근을 제어하는 데 사용할 수 있는 전략은?

| 선지 | 번역 |
|------|------|
| A | DB 보안 그룹. |
| B | IAM 정책. |
| C | 해당 없음. |
| D | EC2 보안 그룹. |

**(A)** : DB 보안 그룹은 RDS 인스턴스 접근 제어용입니다. → [📖 DB 보안 그룹은 RDS 인스턴스 접근 제어용입니다.](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**(B)** : IAM 정책은 AWS API/콘솔 접근 제어용으로 네트워크 수준 트래픽을 제어하지 않습니다. → [📖 IAM 정책은 AWS API/콘솔 접근 제어용으로 네트워크 수준 트래픽을 제어하지 않습니다.](/section/02-iam#iam-policies-정책)

**(C)** : EC2 보안 그룹이 있으므로 오답입니다.

**(D) 정답** : EC2 보안 그룹은 인스턴스 수준의 가상 방화벽으로 인바운드/아웃바운드 트래픽을 제어합니다. EC2 인스턴스 접근 제어의 기본 메커니즘입니다. → [📖 EC2 보안 그룹은 인스턴스 수준의 가상 방화벽으로 인바운드/아웃바운드 트래픽을 제어합니다. EC2 인스턴스...](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** EC2 보안 그룹, 네트워크 접근 제어

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

---

### Q562. A client of yours has a huge amount of data stored on Amazon S3, but is concerned about someone stealing it while it is in transit. You know that all data is encrypted in transit on AWS, but which of the following is wrong when describing server-side encryption on AWS?

**Options:**
- A) Amazon S3 server-side encryption employs strong multi-factor encryption.
- B) Amazon S3 server-side encryption uses one of the strongest block ciphers available, 256-bit Advanced Encryption Standard (AES-256), to encrypt your data.
- C) In server-side encryption, you manage encryption/decryption of your data, the encryption keys, and related tools.
- D) Server-side encryption is about data encryption at rest―that is, Amazon S3 encrypts your data as it writes it to disks.

**Answer:** C

**해설:**

> **문제:** AWS S3 서버 측 암호화(SSE)에 대한 설명 중 올바르지 않은 것은?

| 선지 | 번역 |
|------|------|
| A | Amazon S3 SSE는 강력한 다중 요소 암호화를 사용합니다. |
| B | Amazon S3 SSE는 AES-256(256비트 고급 암호화 표준)을 사용합니다. |
| C | SSE에서 사용자가 데이터의 암호화/복호화, 암호화 키 및 관련 도구를 관리합니다. |
| D | SSE는 저장 데이터 암호화로, Amazon S3가 디스크에 쓸 때 데이터를 암호화합니다. |

**(A)** : SSE는 강력한 암호화 알고리즘을 사용합니다. 올바른 설명입니다. → [📖 SSE는 강력한 암호화 알고리즘을 사용합니다. 올바른 설명입니다.](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**(B)** : SSE는 AES-256을 사용합니다. 올바른 설명입니다. → [📖 SSE는 AES-256을 사용합니다. 올바른 설명입니다.](/section/12-s3-security#s3-암호화-방식-비교-sses3-ssekms-ssec-clientside)

**(C) 정답** : 이것이 틀린 설명입니다. SSE(서버 측 암호화)에서는 AWS가 암호화/복호화와 키 관리를 처리합니다. 사용자가 키와 도구를 관리하는 것은 클라이언트 측 암호화(CSE)입니다. → [📖 이것이 틀린 설명입니다. SSE(서버 측 암호화)에서는 AWS가 암호화/복호화와 키 관리를 처리합니다. 사용...](/section/12-s3-security#s3-암호화-방식-비교-sses3-ssekms-ssec-clientside)

**(D)** : SSE는 저장 데이터 암호화입니다. 올바른 설명입니다. → [📖 SSE는 저장 데이터 암호화입니다. 올바른 설명입니다.](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**핵심 개념:** S3 SSE(서버 측 암호화) vs CSE(클라이언트 측 암호화), 키 관리 주체

**관련 노트:** [S3 객체 암호화 - 4가지 방법](/section/12-s3-security#s3-객체-암호화-4가지-방법), [S3 암호화 방식 비교 SSE-S3 / SSE-KMS / SSE-C / Client-Side](/section/12-s3-security#s3-암호화-방식-비교-sses3-ssekms-ssec-clientside)

---

### Q563. When you run a DB Instance as a Multi-AZ deployment, the [...] serves database writes and reads.

**Options:**
- A) secondary.
- B) backup.
- C) stand by.
- D) primary.

**Answer:** D

**해설:**

> **문제:** DB 인스턴스를 Multi-AZ 배포로 실행할 때, 데이터베이스 쓰기와 읽기를 담당하는 것은?

| 선지 | 번역 |
|------|------|
| A | 보조(secondary) 인스턴스. |
| B | 백업(backup) 인스턴스. |
| C | 대기(stand by) 인스턴스. |
| D | 기본(primary) 인스턴스. |

**(A), (B), (C)** : Multi-AZ의 보조/스탠바이 인스턴스는 실제 트래픽을 처리하지 않습니다.

**(D) 정답** : RDS Multi-AZ 배포에서 기본(primary) 인스턴스만 실제 읽기/쓰기 요청을 처리합니다. 스탠바이 인스턴스는 동기식 복제를 통해 데이터를 동기화하지만 트래픽을 처리하지 않습니다. 기본 인스턴스 장애 시 스탠바이가 자동으로 승격됩니다. → [📖 RDS Multi-AZ 배포에서 기본(primary) 인스턴스만 실제 읽기/쓰기 요청을 처리합니다. 스탠바이...](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**핵심 개념:** RDS Multi-AZ 배포, Primary vs Standby 역할 구분

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

---

### Q564. In Amazon EC2, how many Elastic IP addresses can you have by default?

**Options:**
- A) 10.
- B) 2.
- C) 5.
- D) 20.

**Answer:** C

**해설:**

> **문제:** Amazon EC2에서 기본적으로 몇 개의 Elastic IP 주소를 보유할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 10개. |
| B | 2개. |
| C | 5개. |
| D | 20개. |

**(A), (B), (D)** : 기본 한도가 아닙니다.

**(C) 정답** : 기본적으로 AWS 계정당 리전별로 5개의 Elastic IP 주소를 가질 수 있습니다. 추가가 필요한 경우 AWS Support에 한도 증가를 요청할 수 있습니다. → [📖 기본적으로 AWS 계정당 리전별로 5개의 Elastic IP 주소를 가질 수 있습니다. 추가가 필요한 경우 ...](/section/04-ec2-associate#elastic-ip)

**핵심 개념:** Elastic IP 기본 한도(리전당 5개), 한도 증가 요청

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip)

---

### Q565. A user has created photo editing software and hosted it on EC2. The software accepts requests from the user about the photo format and resolution and sends a message to S3 to enhance the picture accordingly. Which of the below mentioned AWS services will help make a scalable software with the AWS infrastructure in this scenario?

**Options:**
- A) AWS Simple Notification Service.
- B) AWS Simple Queue Service.
- C) AWS Elastic Transcoder.
- D) AWS Glacier.

**Answer:** B

**해설:**

> **문제:** EC2에서 호스팅된 사진 편집 소프트웨어가 S3에 사진 처리 메시지를 전달합니다. 확장 가능한 아키텍처를 위해 어떤 AWS 서비스를 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | AWS SNS. |
| B | AWS SQS. |
| C | AWS Elastic Transcoder. |
| D | AWS Glacier. |

**(A)** : SNS는 발행/구독 알림 서비스로 요청 큐잉에 적합하지 않습니다. → [📖 SNS는 발행/구독 알림 서비스로 요청 큐잉에 적합하지 않습니다.](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(B) 정답** : SQS를 사용하면 사진 처리 요청을 큐에 쌓고 S3/처리 서버가 순차적으로 처리할 수 있습니다. 요청이 급증해도 큐가 버퍼 역할을 하여 시스템이 확장 가능하게 동작합니다. → [📖 SQS를 사용하면 사진 처리 요청을 큐에 쌓고 S3/처리 서버가 순차적으로 처리할 수 있습니다. 요청이 급증...](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(C)** : Elastic Transcoder는 동영상 변환 서비스로 사진 편집과는 다릅니다.

**(D)** : Glacier는 아카이브 스토리지로 실시간 처리에 적합하지 않습니다. → [📖 Glacier는 아카이브 스토리지로 실시간 처리에 적합하지 않습니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** SQS를 통한 확장 가능한 아키텍처, 디커플링(decoupling)

**관련 노트:** [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q566. Using Amazon CloudWatch's Free Tier, what is the frequency of metric updates which you receive?

**Options:**
- A) 5 minutes.
- B) 500 milliseconds.
- C) 30 seconds.
- D) 1 minute.

**Answer:** A

**해설:**

> **문제:** Amazon CloudWatch 프리 티어를 사용할 때 메트릭 업데이트 빈도는 얼마입니까?

| 선지 | 번역 |
|------|------|
| A | 5분. |
| B | 500밀리초. |
| C | 30초. |
| D | 1분. |

**(A) 정답** : CloudWatch 기본(무료) 모니터링은 5분 간격으로 메트릭을 수집합니다. 상세 모니터링(DetailedMonitoring, 추가 비용)을 활성화하면 1분 간격으로 수집됩니다. → [📖 CloudWatch 기본(무료) 모니터링은 5분 간격으로 메트릭을 수집합니다. 상세 모니터링(Detailed...](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : 500ms는 CloudWatch에서 지원하지 않는 빈도입니다. → [📖 500ms는 CloudWatch에서 지원하지 않는 빈도입니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C)** : 30초 간격은 CloudWatch에서 지원하지 않습니다. → [📖 30초 간격은 CloudWatch에서 지원하지 않습니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : 1분은 상세 모니터링(유료) 간격입니다. → [📖 1분은 상세 모니터링(유료) 간격입니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** CloudWatch 기본 모니터링(5분) vs 상세 모니터링(1분)

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q567. When you resize the Amazon RDS DB instance, Amazon RDS will perform the upgrade during the next maintenance window. If you want the upgrade to be performed now, rather than waiting for the maintenance window, specify the [...] option.

**Options:**
- A) Apply Now.
- B) Apply Soon.
- C) Apply This.
- D) Apply Immediately.

**Answer:** D

**해설:**

> **문제:** RDS DB 인스턴스 크기를 조정할 때 유지 관리 기간을 기다리지 않고 즉시 업그레이드하려면 어떤 옵션을 지정해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Apply Now (지금 적용). |
| B | Apply Soon (곧 적용). |
| C | Apply This (이것 적용). |
| D | Apply Immediately (즉시 적용). |

**(A), (B), (C)** : 존재하지 않는 RDS 옵션입니다.

**(D) 정답** : RDS 인스턴스 수정 시 "Apply Immediately" 옵션을 선택하면 유지 관리 기간(maintenance window)을 기다리지 않고 즉시 변경 사항이 적용됩니다. 단, 이 옵션 사용 시 다운타임이 발생할 수 있습니다. → [📖 RDS 인스턴스 수정 시 "Apply Immediately" 옵션을 선택하면 유지 관리 기간(maintena...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS 인스턴스 수정, Apply Immediately 옵션, 유지 관리 기간

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q568. A user is running a webserver on EC2. The user wants to receive the SMS when the EC2 instance utilization is above the threshold limit. Which AWS services should the user configure in this case?

**Options:**
- A) AWS CloudWatch + AWS SQS.
- B) AWS CloudWatch + AWS SNS.
- C) AWS CloudWatch + AWS SES.
- D) AWS EC2 + AWS CloudWatch.

**Answer:** B

**해설:**

> **문제:** EC2 인스턴스 사용률이 임계값을 초과할 때 SMS를 받으려면 어떤 AWS 서비스를 구성해야 합니까?

| 선지 | 번역 |
|------|------|
| A | AWS CloudWatch + AWS SQS. |
| B | AWS CloudWatch + AWS SNS. |
| C | AWS CloudWatch + AWS SES. |
| D | AWS EC2 + AWS CloudWatch. |

**(A)** : SQS는 SMS 발송 기능이 없습니다. → [📖 SQS는 SMS 발송 기능이 없습니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(B) 정답** : CloudWatch 경보를 설정하여 CPU 사용률 등이 임계값을 초과하면 SNS 토픽으로 알림을 전송하고, SNS가 SMS로 알림을 발송합니다. CloudWatch + SNS 조합이 표준 패턴입니다. → [📖 CloudWatch 경보를 설정하여 CPU 사용률 등이 임계값을 초과하면 SNS 토픽으로 알림을 전송하고, ...](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(C)** : SES는 이메일 서비스로 SMS를 지원하지 않습니다. → [📖 SES는 이메일 서비스로 SMS를 지원하지 않습니다.](/section/28-other-services#amazon-simple-email-service-ses)

**(D)** : EC2 단독으로는 임계값 기반 알림 기능이 없으며, SMS 발송 서비스가 없습니다.

**핵심 개념:** CloudWatch 경보 + SNS SMS 알림, EC2 모니터링 패턴

**관련 노트:** [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms), [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q569. You're running an application on-premises due to its dependency on non-x86 hardware and want to use AWS for data backup. Your backup application is only able to write to POSIX-compatible block based storage. You have 140TB of data and would like to mount it as a single folder on your file server. Users must be able to access portions of this data while the backups are taking place. What backup solution would be most appropriate for this use case?

**Options:**
- A) Use Storage Gateway and configure it to use Gateway Cached volumes.
- B) Configure your backup software to use S3 as the target for your data backups.
- C) Configure your backup software to use Glacier as the target for your data backups.
- D) Use Storage Gateway and configure it to use Gateway Stored volumes.

**Answer:** A

**해설:**

> **문제:** 온프레미스에서 140TB 데이터를 단일 폴더로 마운트하고, 백업 중에도 사용자가 데이터에 접근할 수 있어야 합니다. POSIX 호환 블록 스토리지에만 쓸 수 있는 백업 애플리케이션에 적합한 솔루션은?

| 선지 | 번역 |
|------|------|
| A | Storage Gateway를 사용하고 Gateway Cached 볼륨으로 구성합니다. |
| B | 백업 소프트웨어가 S3를 대상으로 사용하도록 구성합니다. |
| C | 백업 소프트웨어가 Glacier를 대상으로 사용하도록 구성합니다. |
| D | Storage Gateway를 사용하고 Gateway Stored 볼륨으로 구성합니다. |

**(A) 정답** : Storage Gateway Cached 볼륨은 자주 접근하는 데이터를 로컬에 캐시하고 전체 데이터는 S3에 저장합니다. POSIX 호환 iSCSI 블록 스토리지로 마운트 가능하며 백업 중에도 로컬 캐시를 통해 데이터 접근이 가능합니다. 140TB 전체를 로컬에 저장할 필요가 없습니다. → [📖 Storage Gateway Cached 볼륨은 자주 접근하는 데이터를 로컬에 캐시하고 전체 데이터는 S3에...](/section/14-storage-extras#aws-storage-gateway)

**(B)** : S3는 POSIX 호환 블록 스토리지가 아닙니다. → [📖 S3는 POSIX 호환 블록 스토리지가 아닙니다.](/section/10-amazon-s3#s3-객체-object)

**(C)** : Glacier는 POSIX 호환 블록 스토리지가 아니며 실시간 접근이 불가합니다. → [📖 Glacier는 POSIX 호환 블록 스토리지가 아니며 실시간 접근이 불가합니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : Gateway Stored 볼륨은 전체 데이터를 로컬에 저장하고 S3에 비동기 백업합니다. 140TB를 로컬에 저장해야 하므로 비현실적입니다. → [📖 Gateway Stored 볼륨은 전체 데이터를 로컬에 저장하고 S3에 비동기 백업합니다. 140TB를 로컬...](/section/14-storage-extras#aws-storage-gateway)

**핵심 개념:** Storage Gateway Cached 볼륨 vs Stored 볼륨, POSIX 블록 스토리지, 로컬 캐시

**관련 노트:** [AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

---

### Q570. What happens to Amazon EBS root device volumes, by default, when an instance terminates?

**Options:**
- A) Amazon EBS root device volumes are moved to IA (Infrequent Access).
- B) Amazon EBS root device volumes are copied into Amazon RDS.
- C) Amazon EBS root device volumes are automatically deleted.
- D) Amazon EBS root device volumes remain in the database until you delete them.

**Answer:** B

**해설:**

> **문제:** 인스턴스가 종료될 때 Amazon EBS 루트 디바이스 볼륨은 기본적으로 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | EBS 루트 디바이스 볼륨이 IA(저빈도 액세스)로 이동합니다. |
| B | EBS 루트 디바이스 볼륨이 Amazon RDS에 복사됩니다. |
| C | EBS 루트 디바이스 볼륨이 자동으로 삭제됩니다. |
| D | EBS 루트 디바이스 볼륨은 삭제할 때까지 남아 있습니다. |

**(A)** : IA는 S3 스토리지 클래스로 EBS 볼륨과 관련 없습니다. → [📖 IA는 S3 스토리지 클래스로 EBS 볼륨과 관련 없습니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B)** : EBS 볼륨은 RDS로 복사되지 않습니다. → [📖 EBS 볼륨은 RDS로 복사되지 않습니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C) 정답** : 기본적으로 EC2 인스턴스 종료 시 루트 EBS 볼륨은 `DeleteOnTermination` 속성이 true로 설정되어 자동 삭제됩니다. 데이터 볼륨은 기본적으로 유지됩니다. → [📖 기본적으로 EC2 인스턴스 종료 시 루트 EBS 볼륨은 `DeleteOnTermination` 속성이 tru...](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : 루트 볼륨은 기본적으로 자동 삭제됩니다. → [📖 루트 볼륨은 기본적으로 자동 삭제됩니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** EBS DeleteOnTermination 속성, 루트 볼륨 vs 데이터 볼륨 종료 동작

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q571. You require the ability to analyze a customer's clickstream data on a website so they can do behavioral analysis. Your customer needs to know what sequence of pages and ads their customer clicked on. This data will be used in real time to modify the page layouts as customers click through the site to increase stickiness and advertising click-through. Which option meets the requirements for capturing and analyzing this data?

**Options:**
- A) Log clicks in weblogs by URL store to Amazon S3, and then analyze with Elastic MapReduce.
- B) Push web clicks by session to Amazon Kinesis and analyze behavior using Kinesis workers.
- C) Write click events directly to Amazon Redshift and then analyze with SQL.
- D) Publish web clicks by session to an Amazon SQS queue then periodically drain these events to Amazon RDS and analyze with SQL.

**Answer:** B

**해설:**

> **문제:** 웹사이트 클릭스트림 데이터를 실시간으로 분석하여 페이지 레이아웃을 즉시 수정하려면 어떤 방법이 적합합니까?

| 선지 | 번역 |
|------|------|
| A | 클릭을 URL별로 웹 로그에 기록하고 S3에 저장한 후 EMR로 분석. |
| B | 세션별 웹 클릭을 Kinesis에 전송하고 Kinesis 워커로 행동 분석. |
| C | 클릭 이벤트를 Redshift에 직접 기록하고 SQL로 분석. |
| D | 세션별 웹 클릭을 SQS 큐에 발행한 후 주기적으로 RDS로 이동하여 SQL로 분석. |

**(A)** : S3 + EMR은 배치 분석으로 실시간 분석에 적합하지 않습니다. → [📖 S3 + EMR은 배치 분석으로 실시간 분석에 적합하지 않습니다.](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(B) 정답** : Kinesis Data Streams는 실시간 스트리밍 데이터 처리에 최적화되어 있습니다. Kinesis 워커(KCL)가 클릭 데이터를 실시간으로 분석하여 즉각적인 페이지 레이아웃 변경을 가능하게 합니다. → [📖 Kinesis Data Streams는 실시간 스트리밍 데이터 처리에 최적화되어 있습니다. Kinesis 워...](/section/15-integration-messaging#amazon-kinesis-data-streams)

**(C)** : Redshift는 대규모 데이터 웨어하우스로 실시간 이벤트 수집보다는 분석에 적합합니다. → [📖 Redshift는 대규모 데이터 웨어하우스로 실시간 이벤트 수집보다는 분석에 적합합니다.](/section/20-data-analytics#amazon-redshift)

**(D)** : SQS + RDS는 주기적 배치 분석으로 실시간 처리가 아닙니다. → [📖 SQS + RDS는 주기적 배치 분석으로 실시간 처리가 아닙니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** Amazon Kinesis 실시간 클릭스트림 분석, 행동 분석 아키텍처

**관련 노트:** [Amazon Kinesis Data Streams](/section/15-integration-messaging#amazon-kinesis-data-streams)

---

### Q572. What happens when you create a topic on Amazon SNS?

**Options:**
- A) The topic is created, and it has the name you specified for it.
- B) An ARN (Amazon Resource Name) is created.
- C) You can create a topic on Amazon SQS, not on Amazon SNS.
- D) This question doesn't make sense.

**Answer:** B

**해설:**

> **문제:** Amazon SNS에서 토픽을 생성하면 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | 토픽이 생성되고 지정한 이름을 가집니다. |
| B | ARN(Amazon Resource Name)이 생성됩니다. |
| C | SNS가 아닌 Amazon SQS에서 토픽을 생성할 수 있습니다. |
| D | 이 질문은 의미가 없습니다. |

**(A)** : 이름도 지정되지만 가장 중요한 것은 ARN이 생성된다는 점입니다.

**(B) 정답** : SNS 토픽을 생성하면 ARN(예: `arn:aws:sns:us-east-1:123456789012:MyTopic`)이 할당됩니다. 이 ARN으로 토픽을 식별하고 구독, 발행 등의 작업을 수행합니다. → [📖 SNS 토픽을 생성하면 ARN(예: `arn:aws:sns:us-east-1:123456789012:MyTo...](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(C)** : SNS에서 토픽을 생성합니다. SQS는 큐를 생성합니다. → [📖 SNS에서 토픽을 생성합니다. SQS는 큐를 생성합니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : 유효한 질문입니다.

**핵심 개념:** SNS 토픽 생성 시 ARN 할당, SNS ARN 구조

**관련 노트:** [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q573. A company needs to deploy virtual desktops to its customers in a virtual private cloud, leveraging existing security controls. Which set of AWS services and features will meet the company's requirements?

**Options:**
- A) Virtual Private Network connection, AWS Directory Services, and Classic link.
- B) Virtual Private Network connection, AWS Directory Services, and Amazon Workspaces.
- C) AWS Directory Service, Amazon Workspaces, and AWS Identity and Access Management.
- D) Amazon Elastic Compute Cloud, and AWS Identity and Access Management.

**Answer:** C

**해설:**

> **문제:** VPC에서 기존 보안 제어를 활용하여 고객에게 가상 데스크톱을 배포하려면 어떤 AWS 서비스 조합이 필요합니까?

| 선지 | 번역 |
|------|------|
| A | VPN 연결, AWS 디렉터리 서비스, ClassicLink. |
| B | VPN 연결, AWS 디렉터리 서비스, Amazon Workspaces. |
| C | AWS 디렉터리 서비스, Amazon Workspaces, AWS IAM. |
| D | Amazon EC2, AWS IAM. |

**(A)** : ClassicLink는 EC2-Classic과 VPC 연결 기능으로 가상 데스크톱과 무관합니다.

**(B)** : VPN이 포함되었지만 VPC 내 배포에 VPN이 필수는 아닙니다. → [📖 VPN이 포함되었지만 VPC 내 배포에 VPN이 필수는 아닙니다.](/section/25-vpc#sitetosite-vpn)

**(C) 정답** : Amazon Workspaces는 VPC 기반 완전 관리형 가상 데스크톱 서비스입니다. AWS Directory Service로 기업 디렉터리와 통합하고, IAM으로 접근 제어를 구현하면 기존 보안 제어를 활용할 수 있습니다.

**(D)** : EC2와 IAM만으로는 관리형 가상 데스크톱 서비스를 구현하기 어렵습니다. → [📖 EC2와 IAM만으로는 관리형 가상 데스크톱 서비스를 구현하기 어렵습니다.](/section/03-ec2-basics#ec2-구성-요소)

**핵심 개념:** Amazon Workspaces, AWS Directory Service, VPC 기반 가상 데스크톱

**관련 노트:** [AWS Directory Services](/section/23-advanced-identity#aws-directory-services), [Microsoft Active Directory AD](/section/23-advanced-identity#microsoft-active-directory-ad)

---

### Q574. You are designing a multi-platform web application for AWS. The application will run on EC2 instances and will be accessed from PCs, tablets and smart phones. Supported accessing platforms are Windows, macOS, iOS and Android. Separate sticky session and SSL certificate setups are required for different platform types. Which of the following describes the most cost effective and performance efficient architecture setup?

**Options:**
- A) Setup a hybrid architecture to handle session state and SSL certificates on-prem and separate EC2 Instance groups running web applications for different platform types running in a VPC.
- B) Set up one ELB for all platforms to distribute load among multiple instances under it. Each EC2 instance implements all functionality for a particular platform.
- C) Set up two ELBs. The first ELB handles SSL certificates for all platforms and the second ELB handles session stickiness for all platforms. For each ELB, run separate EC2 instance groups to handle the web application for each platform.
- D) Assign multiple ELBs to an EC2 instance or group of EC2 instances running the common components of the web application, one ELB for each platform type. Session stickiness and SSL termination are done at the ELBs.

**Answer:** D

**해설:**

> **문제:** 여러 플랫폼(Windows, macOS, iOS, Android)에서 접근하는 웹 애플리케이션에서 플랫폼별로 다른 스티키 세션과 SSL 인증서가 필요합니다. 가장 비용 효율적이고 성능 효율적인 아키텍처는?

| 선지 | 번역 |
|------|------|
| A | 온프레미스에서 세션 상태와 SSL을 처리하고 플랫폼별 EC2 그룹을 VPC에서 실행하는 하이브리드 아키텍처. |
| B | 모든 플랫폼에 단일 ELB를 설정하고 각 EC2 인스턴스가 특정 플랫폼의 모든 기능을 구현. |
| C | 2개의 ELB 설정: 첫 번째는 SSL 처리, 두 번째는 스티키 세션 처리. |
| D | 공통 컴포넌트를 실행하는 EC2 인스턴스 그룹에 플랫폼당 하나씩 여러 ELB 할당. ELB에서 스티키 세션 및 SSL 종료 처리. |

**(A)** : 온프레미스 하이브리드 방식은 추가 비용과 복잡성이 증가합니다.

**(B)** : 단일 ELB로는 플랫폼별 다른 SSL 인증서와 스티키 세션을 처리하기 어렵습니다. → [📖 단일 ELB로는 플랫폼별 다른 SSL 인증서와 스티키 세션을 처리하기 어렵습니다.](/section/06-high-availability-scalability#ssltls-인증서)

**(C)** : 2개의 ELB로 SSL과 스티키 세션을 분리하면 불필요한 복잡성이 생깁니다. → [📖 2개의 ELB로 SSL과 스티키 세션을 분리하면 불필요한 복잡성이 생깁니다.](/section/06-high-availability-scalability#ssltls-인증서)

**(D) 정답** : 플랫폼당 하나의 ELB를 배정하면 각 ELB에서 해당 플랫폼에 맞는 SSL 인증서와 스티키 세션 설정을 독립적으로 구성할 수 있습니다. 공통 EC2 그룹을 공유하므로 비용 효율적입니다. → [📖 플랫폼당 하나의 ELB를 배정하면 각 ELB에서 해당 플랫폼에 맞는 SSL 인증서와 스티키 세션 설정을 독립...](/section/06-high-availability-scalability#sticky-sessions-session-affinity)

**핵심 개념:** ELB SSL 종료, 스티키 세션(Sticky Session), 멀티 플랫폼 아키텍처

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [Sticky Sessions Session Affinity](/section/06-high-availability-scalability#sticky-sessions-session-affinity), [SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)

---

### Q575. A company is deploying a two-tier, highly available web application to AWS. Which service provides durable storage for static content while utilizing lower overall CPU resources for the web tier?

**Options:**
- A) Amazon EBS volume.
- B) Amazon S3.
- C) Amazon EC2 instance store.
- D) Amazon RDS instance.

**Answer:** B

**해설:**

> **문제:** 2티어 고가용성 웹 애플리케이션에서 정적 콘텐츠를 내구성 있게 저장하면서 웹 티어의 전체 CPU 리소스를 줄이는 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon EBS 볼륨. |
| B | Amazon S3. |
| C | Amazon EC2 인스턴스 스토어. |
| D | Amazon RDS 인스턴스. |

**(A)** : EBS는 특정 EC2 인스턴스에 연결되어 고가용성 정적 콘텐츠 서빙에 적합하지 않습니다. → [📖 EBS는 특정 EC2 인스턴스에 연결되어 고가용성 정적 콘텐츠 서빙에 적합하지 않습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B) 정답** : S3는 정적 콘텐츠(이미지, CSS, JS 등)를 내구성 있게 저장하고 직접 서빙할 수 있습니다. CloudFront와 연동하면 웹 서버의 CPU 부하 없이 정적 콘텐츠를 제공할 수 있어 EC2의 CPU 사용률을 줄입니다. → [📖 S3는 정적 콘텐츠(이미지, CSS, JS 등)를 내구성 있게 저장하고 직접 서빙할 수 있습니다. Cloud...](/section/10-amazon-s3#s3-사용-사례)

**(C)** : 인스턴스 스토어는 임시 스토리지로 내구성이 없습니다. → [📖 인스턴스 스토어는 임시 스토리지로 내구성이 없습니다.](/section/05-ec2-instance-storage#ec2-instance-store)

**(D)** : RDS는 관계형 데이터베이스 서비스로 정적 콘텐츠 저장에 부적합합니다. → [📖 RDS는 관계형 데이터베이스 서비스로 정적 콘텐츠 저장에 부적합합니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** S3 정적 콘텐츠 호스팅, 웹 서버 CPU 부하 감소, 고가용성 아키텍처

**관련 노트:** [S3 정적 웹사이트 호스팅](/section/10-amazon-s3#s3-정적-웹사이트-호스팅), [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

---

### Q576. Select the incorrect statement.

**Options:**
- A) In Amazon EC2, the private IP addresses only returned to Amazon EC2 when the instance is stopped or terminated.
- B) In Amazon VPC, an instance retains its private IP addresses when the instance is stopped.
- C) In Amazon VPC, an instance does NOT retain its private IP addresses when the instance is stopped.
- D) In Amazon EC2, the private IP address is associated exclusively with the instance for its lifetime.

**Answer:** C

**해설:**

> **문제:** 올바르지 않은 설명을 선택하시오.

| 선지 | 번역 |
|------|------|
| A | Amazon EC2(Classic)에서 프라이빗 IP 주소는 인스턴스가 중지 또는 종료될 때만 반환됩니다. |
| B | Amazon VPC에서 인스턴스는 중지되어도 프라이빗 IP 주소를 유지합니다. |
| C | Amazon VPC에서 인스턴스는 중지되면 프라이빗 IP 주소를 유지하지 않습니다. |
| D | Amazon EC2에서 프라이빗 IP 주소는 인스턴스 수명 동안 독점적으로 연결됩니다. |

**(A)** : EC2-Classic에서 중지/종료 시 IP가 반환됩니다. 올바른 설명입니다. → [📖 EC2-Classic에서 중지/종료 시 IP가 반환됩니다. 올바른 설명입니다.](/section/04-ec2-associate#ip-주소-ipv4)

**(B)** : VPC에서 인스턴스를 중지해도 프라이빗 IP가 유지됩니다. 올바른 설명입니다. → [📖 VPC에서 인스턴스를 중지해도 프라이빗 IP가 유지됩니다. 올바른 설명입니다.](/section/04-ec2-associate#ip-주소-ipv4)

**(C) 정답** : 이것이 틀린 설명입니다. VPC에서는 인스턴스를 중지(stop)해도 프라이빗 IP 주소가 유지됩니다. 종료(terminate) 시에만 IP가 해제됩니다. → [📖 이것이 틀린 설명입니다. VPC에서는 인스턴스를 중지(stop)해도 프라이빗 IP 주소가 유지됩니다. 종료(...](/section/04-ec2-associate#ip-주소-ipv4)

**(D)** : EC2 인스턴스의 프라이빗 IP는 인스턴스 수명 동안 유지됩니다. 올바른 설명입니다. → [📖 EC2 인스턴스의 프라이빗 IP는 인스턴스 수명 동안 유지됩니다. 올바른 설명입니다.](/section/04-ec2-associate#ip-주소-ipv4)

**핵심 개념:** EC2-Classic vs VPC 프라이빗 IP 유지 정책, stop vs terminate 차이

**관련 노트:** [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4), [Elastic IP](/section/04-ec2-associate#elastic-ip)

---

### Q577. An organization has a statutory requirement to protect the data at rest for data stored in EBS volumes. Which of the below mentioned options can the organization use to achieve data protection?

**Options:**
- A) Data replication.
- B) Data encryption.
- C) Data snapshot.
- D) All the options listed here.

**Answer:** D

**해설:**

> **문제:** EBS 볼륨에 저장된 저장 데이터(data at rest)를 보호하기 위해 조직이 사용할 수 있는 옵션은?

| 선지 | 번역 |
|------|------|
| A | 데이터 복제. |
| B | 데이터 암호화. |
| C | 데이터 스냅샷. |
| D | 위에 나열된 모든 옵션. |

**(A)** : 데이터 복제는 내구성과 가용성을 높여 데이터 손실로부터 보호합니다. → [📖 데이터 복제는 내구성과 가용성을 높여 데이터 손실로부터 보호합니다.](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(B)** : 데이터 암호화는 무단 접근으로부터 데이터를 보호합니다. → [📖 데이터 암호화는 무단 접근으로부터 데이터를 보호합니다.](/section/24-security-encryption#암호화-기본-개념)

**(C)** : 스냅샷은 특정 시점 백업으로 데이터 손실 시 복구에 활용됩니다. → [📖 스냅샷은 특정 시점 백업으로 데이터 손실 시 복구에 활용됩니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(D) 정답** : 복제, 암호화, 스냅샷 모두 데이터 보호를 위한 유효한 방법입니다. 저장 데이터 보호에는 여러 계층의 보안이 권장됩니다.

**핵심 개념:** EBS 데이터 보호 방법: 암호화, 복제, 스냅샷

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

---

### Q578. A web design company currently runs several FTP servers that their 250 customers use to upload and download large graphic files. They wish to move this system to AWS to make it more scalable, but they wish to maintain customer privacy and keep costs to a minimum. What AWS architecture would you recommend?

**Options:**
- A) Ask their customers to use an S3 client instead of an FTP client. Create a single S3 bucket. Create an IAM user for each customer. Put the IAM Users in a Group that has an IAM policy that permits access to sub-directories within the bucket via use of the 'username' Policy variable.
- B) Create a single S3 bucket with Reduced Redundancy Storage turned on and ask their customers to use an S3 client instead of an FTP client. Create a bucket for each customer with a Bucket Policy that permits access only to that one customer.
- C) Create an auto-scaling group of FTP servers with a scaling policy to automatically scale-in when minimum network traffic on the auto-scaling group is below a given threshold. Load a central list of ftp users from S3 as part of the user Data startup script on each Instance.
- D) Create a single S3 bucket with Requester Pays turned on and ask their customers to use an S3 client instead of an FTP client. Create a bucket for each customer with a Bucket Policy that permits access only to that one customer.

**Answer:** A

**해설:**

> **문제:** 250명의 고객이 사용하는 FTP 서버를 AWS로 마이그레이션하면서 고객 프라이버시와 비용 최소화를 유지하는 아키텍처는?

| 선지 | 번역 |
|------|------|
| A | 단일 S3 버킷 생성, 고객별 IAM 사용자 생성, 'username' 정책 변수로 버킷 내 하위 디렉터리 접근 허용. |
| B | RRS가 켜진 단일 S3 버킷 + 고객별 버킷 정책. |
| C | FTP 서버 ASG + S3에서 FTP 사용자 목록 로드. |
| D | Requester Pays가 켜진 단일 S3 버킷 + 고객별 버킷 정책. |

**(A) 정답** : 단일 버킷에 고객별 IAM 사용자를 생성하고, IAM 정책에서 `${aws:username}` 변수를 사용하여 각 고객이 자신의 폴더에만 접근하도록 제한합니다. 비용이 낮고 확장성이 좋으며 프라이버시가 보장됩니다. → [📖 단일 버킷에 고객별 IAM 사용자를 생성하고, IAM 정책에서 `${aws:username}` 변수를 사용하...](/section/23-advanced-identity#iam-for-s3)

**(B)** : RRS는 내구성이 낮아 대용량 그래픽 파일에 부적합하며, 고객별 버킷 생성은 관리 오버헤드가 큽니다. → [📖 RRS는 내구성이 낮아 대용량 그래픽 파일에 부적합하며, 고객별 버킷 생성은 관리 오버헤드가 큽니다.](/section/10-amazon-s3#s3-스토리지-클래스)

**(C)** : FTP 서버 유지는 관리 복잡성을 증가시키고 S3보다 비용이 높습니다.

**(D)** : Requester Pays는 고객이 데이터 전송 비용을 부담하게 하며, 고객별 버킷은 과도한 버킷 수를 생성합니다. → [📖 Requester Pays는 고객이 데이터 전송 비용을 부담하게 하며, 고객별 버킷은 과도한 버킷 수를 생성...](/section/11-s3-advanced#s3-requester-pays-요청자-지불)

**핵심 개념:** S3 IAM 정책 변수(${aws:username}), 사용자별 폴더 접근 제어, 비용 효율적 아키텍처

**관련 노트:** [S3 접근 제어 흐름 Bucket Policy + IAM + ACL 평가](/section/12-s3-security#s3-접근-제어-흐름-bucket-policy-iam-acl-평가), [IAM for S3](/section/23-advanced-identity#iam-for-s3)

---

### Q579. Amazon RDS DB snapshots and automated backups are stored in:

**Options:**
- A) Amazon S3.
- B) Amazon ECS Volume.
- C) Amazon RDS.
- D) Amazon EMR.

**Answer:** A

**해설:**

> **문제:** Amazon RDS DB 스냅샷과 자동 백업은 어디에 저장됩니까?

| 선지 | 번역 |
|------|------|
| A | Amazon S3. |
| B | Amazon ECS 볼륨. |
| C | Amazon RDS. |
| D | Amazon EMR. |

**(A) 정답** : RDS 자동 백업과 DB 스냅샷은 Amazon S3에 저장됩니다. 사용자가 직접 S3 버킷에 접근할 수는 없지만(AWS가 관리하는 S3 버킷), 백업 데이터는 내부적으로 S3에 저장됩니다. → [📖 RDS 자동 백업과 DB 스냅샷은 Amazon S3에 저장됩니다. 사용자가 직접 S3 버킷에 접근할 수는 없...](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(B), (C), (D)** : RDS 백업은 S3에 저장되며 ECS, RDS 자체, EMR에 저장되지 않습니다.

**핵심 개념:** RDS 백업 스토리지 위치(S3), 자동 백업 및 스냅샷 저장

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

---

### Q580. Can Amazon S3 uploads resume on failure or do they need to restart?

**Options:**
- A) Restart from beginning.
- B) You can resume them, if you flag the 'resume on failure' option before uploading.
- C) Resume on failure.
- D) Depends on the file size.

**Answer:** C

**해설:**

> **문제:** Amazon S3 업로드가 실패했을 때 재개할 수 있습니까, 아니면 처음부터 다시 시작해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 처음부터 다시 시작해야 합니다. |
| B | 업로드 전에 '실패 시 재개' 옵션을 설정하면 재개할 수 있습니다. |
| C | 실패 시 재개할 수 있습니다. |
| D | 파일 크기에 따라 다릅니다. |

**(A)** : 멀티파트 업로드를 사용하면 처음부터 다시 시작할 필요가 없습니다. → [📖 멀티파트 업로드를 사용하면 처음부터 다시 시작할 필요가 없습니다.](/section/11-s3-advanced#s3-performance-최적화)

**(B)** : 별도로 플래그를 설정할 필요 없이 멀티파트 업로드가 재개 기능을 제공합니다. → [📖 별도로 플래그를 설정할 필요 없이 멀티파트 업로드가 재개 기능을 제공합니다.](/section/11-s3-advanced#s3-performance-최적화)

**(C) 정답** : Amazon S3 멀티파트 업로드(Multipart Upload)를 사용하면 업로드 실패 시 실패한 부분부터 재개할 수 있습니다. 대용량 파일의 경우 멀티파트 업로드가 권장됩니다. → [📖 Amazon S3 멀티파트 업로드(Multipart Upload)를 사용하면 업로드 실패 시 실패한 부분부터...](/section/11-s3-advanced#s3-performance-최적화)

**(D)** : 파일 크기에 관계없이 멀티파트 업로드로 재개할 수 있습니다. → [📖 파일 크기에 관계없이 멀티파트 업로드로 재개할 수 있습니다.](/section/11-s3-advanced#s3-performance-최적화)

**핵심 개념:** S3 멀티파트 업로드(Multipart Upload), 업로드 실패 시 재개

**관련 노트:** [S3 Performance 최적화](/section/11-s3-advanced#s3-performance-최적화), [S3 Baseline Performance 기본 성능](/section/11-s3-advanced#s3-baseline-performance-기본-성능)

---

### Q581. Prior to the introduction of this function, the HA feature provided redundancy and performance, but required that a failed/lost group member be [...] reinstated.

**Options:**
- A) automatically.
- B) periodically.
- C) manually.
- D) continuously.

**Answer:** C

**해설:**

> **문제:** 특정 기능이 도입되기 전에, HA 기능은 중복성과 성능을 제공했지만 실패/손실된 그룹 구성원을 [...] 재가입시켜야 했습니다.

| 선지 | 번역 |
|------|------|
| A | 자동으로. |
| B | 주기적으로. |
| C | 수동으로. |
| D | 지속적으로. |

**(A), (B), (D)** : 새로운 자동화 기능 도입 전에는 수동 복구가 필요했습니다.

**(C) 정답** : 자동 복구 기능이 도입되기 전에는 HA 구성에서 실패한 구성원을 수동으로 재가입시켜야 했습니다. 이는 RDS Multi-AZ나 ASG 등의 자동 복구 메커니즘 도입 전의 상황을 설명합니다.

**핵심 개념:** AWS HA 자동 복구 기능, 수동 vs 자동 재가입

**관련 노트:** [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q582. A company has a workflow that sends video files from their on-premise system to AWS for transcoding. They use EC2 worker instances that pull transcoding jobs from SQS. Why is SQS an appropriate service for this scenario?

**Options:**
- A) SQS guarantees the order of the messages.
- B) SQS synchronously provides transcoding output.
- C) SQS checks the health of the worker instances.
- D) SQS helps to facilitate horizontal scaling of encoding tasks.

**Answer:** D

**해설:**

> **문제:** 온프레미스에서 AWS로 동영상 파일을 전송하여 트랜스코딩하는 워크플로에서 SQS가 적합한 이유는?

| 선지 | 번역 |
|------|------|
| A | SQS는 메시지 순서를 보장합니다. |
| B | SQS는 동기적으로 트랜스코딩 출력을 제공합니다. |
| C | SQS는 워커 인스턴스의 상태를 확인합니다. |
| D | SQS는 인코딩 작업의 수평 확장을 용이하게 합니다. |

**(A)** : 표준 SQS는 순서를 보장하지 않습니다(FIFO SQS는 순서 보장). → [📖 표준 SQS는 순서를 보장하지 않습니다(FIFO SQS는 순서 보장).](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(B)** : SQS는 비동기 메시지 큐입니다. → [📖 SQS는 비동기 메시지 큐입니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(C)** : SQS는 워커 인스턴스 헬스 체크 기능이 없습니다. → [📖 SQS는 워커 인스턴스 헬스 체크 기능이 없습니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D) 정답** : SQS는 트랜스코딩 작업을 큐에 쌓고, 여러 EC2 워커 인스턴스가 큐에서 작업을 병렬로 처리할 수 있게 합니다. 작업량이 증가하면 워커 인스턴스를 추가하여 수평 확장(horizontal scaling)이 용이합니다. → [📖 SQS는 트랜스코딩 작업을 큐에 쌓고, 여러 EC2 워커 인스턴스가 큐에서 작업을 병렬로 처리할 수 있게 합...](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** SQS 수평 확장, 비동기 작업 처리, 디커플링(decoupling)

**관련 노트:** [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

---

### Q583. Which statement below best describes what thresholds you can set to trigger a CloudWatch Alarm?

**Options:**
- A) Set a target value and choose whether the alarm will trigger when the value is greater than (>), greater than or equal to (>=), less than (<), or less than or equal to (<=) that value.
- B) Thresholds need to be set in IAM not CloudWatch.
- C) Only default thresholds can be set you can't choose your own thresholds.
- D) Set a target value and choose whether the alarm will trigger when the value hits this threshold.

**Answer:** A

**해설:**

> **문제:** CloudWatch 경보를 트리거하기 위한 임계값 설정에 대한 가장 적합한 설명은?

| 선지 | 번역 |
|------|------|
| A | 목표 값을 설정하고 값이 해당 값보다 크거나(>), 크거나 같거나(>=), 작거나(<), 작거나 같을 때(<=) 경보가 트리거될지 선택합니다. |
| B | 임계값은 CloudWatch가 아닌 IAM에서 설정해야 합니다. |
| C | 기본 임계값만 설정할 수 있으며 자체 임계값을 선택할 수 없습니다. |
| D | 목표 값을 설정하고 값이 해당 임계값에 도달할 때 경보가 트리거될지 선택합니다. |

**(A) 정답** : CloudWatch 경보는 특정 메트릭 값에 대해 >, >=, <, <= 비교 연산자와 함께 임계값을 설정할 수 있습니다. 이를 통해 다양한 조건에서 경보를 트리거할 수 있습니다. → [📖 CloudWatch 경보는 특정 메트릭 값에 대해 >, >=, <, <= 비교 연산자와 함께 임계값을 설정할...](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(B)** : 임계값은 IAM이 아닌 CloudWatch에서 설정합니다. → [📖 임계값은 IAM이 아닌 CloudWatch에서 설정합니다.](/section/02-iam#iam-policies-정책)

**(C)** : 사용자가 직접 임계값을 정의할 수 있습니다. → [📖 사용자가 직접 임계값을 정의할 수 있습니다.](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(D)** : "도달할 때"만이 아니라 초과/미만/이상/이하 등 다양한 조건을 설정할 수 있습니다. → [📖 "도달할 때"만이 아니라 초과/미만/이상/이하 등 다양한 조건을 설정할 수 있습니다.](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**핵심 개념:** CloudWatch 경보 임계값 설정, 비교 연산자(>, >=, <, <=)

**관련 노트:** [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

---

### Q584. You are designing a web application that stores static assets in an Amazon Simple Storage Service (S3) bucket. You expect this bucket to immediately receive over 150 PUT requests per second. What should you do to ensure optimal performance?

**Options:**
- A) Use multi-part upload.
- B) Add a random prefix to the key names.
- C) Amazon S3 will automatically manage performance at this scale.
- D) Use a predictable naming scheme, such as sequential numbers or date time sequences, in the key names.

**Answer:** A

**해설:**

> **문제:** S3 버킷이 초당 150건 이상의 PUT 요청을 즉시 받을 것으로 예상됩니다. 최적의 성능을 위해 무엇을 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 멀티파트 업로드 사용. |
| B | 키 이름에 무작위 접두사 추가. |
| C | Amazon S3가 이 규모에서 자동으로 성능을 관리합니다. |
| D | 키 이름에 순차 번호 또는 날짜/시간 순서 같은 예측 가능한 명명 체계 사용. |

**(A) 정답** : 멀티파트 업로드는 대용량 파일을 여러 파트로 나눠 병렬 업로드하여 성능을 최적화합니다. 대규모 PUT 요청 처리에 적합합니다. → [📖 멀티파트 업로드는 대용량 파일을 여러 파트로 나눠 병렬 업로드하여 성능을 최적화합니다. 대규모 PUT 요청 ...](/section/11-s3-advanced#s3-performance-최적화)

**(B)** : 무작위 접두사는 과거 S3 파티션 분산을 위한 방법이었지만, 현재 S3는 요청 패턴에 따라 자동으로 파티션을 조정합니다. → [📖 무작위 접두사는 과거 S3 파티션 분산을 위한 방법이었지만, 현재 S3는 요청 패턴에 따라 자동으로 파티션을...](/section/11-s3-advanced#s3-performance-최적화)

**(C)** : S3가 자동으로 성능을 관리하지만 멀티파트 업로드를 사용하면 더 나은 성능을 얻을 수 있습니다. → [📖 S3가 자동으로 성능을 관리하지만 멀티파트 업로드를 사용하면 더 나은 성능을 얻을 수 있습니다.](/section/11-s3-advanced#s3-baseline-performance-기본-성능)

**(D)** : 예측 가능한 순서 명명은 특정 파티션에 트래픽이 집중될 수 있어 성능 저하의 원인이 될 수 있습니다. → [📖 예측 가능한 순서 명명은 특정 파티션에 트래픽이 집중될 수 있어 성능 저하의 원인이 될 수 있습니다.](/section/11-s3-advanced#s3-performance-최적화)

**핵심 개념:** S3 멀티파트 업로드 성능 최적화, S3 요청 속도 한계

**관련 노트:** [S3 Performance 최적화](/section/11-s3-advanced#s3-performance-최적화), [S3 Baseline Performance 기본 성능](/section/11-s3-advanced#s3-baseline-performance-기본-성능)

---

### Q585. What does Amazon EC2 provide?

**Options:**
- A) Virtual servers in the Cloud.
- B) A platform to run code (Java, PHP, Python), paying on an hourly basis.
- C) Computer Clusters in the Cloud.
- D) Physical servers, remotely managed by the customer.

**Answer:** A

**해설:**

> **문제:** Amazon EC2는 무엇을 제공합니까?

| 선지 | 번역 |
|------|------|
| A | 클라우드의 가상 서버. |
| B | 코드(Java, PHP, Python)를 실행하기 위한 플랫폼, 시간당 요금. |
| C | 클라우드의 컴퓨터 클러스터. |
| D | 고객이 원격으로 관리하는 물리적 서버. |

**(A) 정답** : Amazon EC2(Elastic Compute Cloud)는 클라우드에서 가상 서버를 제공하는 서비스입니다. 다양한 인스턴스 타입을 선택하여 필요에 따라 컴퓨팅 용량을 확장/축소할 수 있습니다. → [📖 Amazon EC2(Elastic Compute Cloud)는 클라우드에서 가상 서버를 제공하는 서비스입니다...](/section/03-ec2-basics#개요)

**(B)** : 코드 실행 플랫폼은 AWS Elastic Beanstalk 또는 AWS Lambda에 대한 설명에 더 가깝습니다. → [📖 코드 실행 플랫폼은 AWS Elastic Beanstalk 또는 AWS Lambda에 대한 설명에 더 가깝습...](/section/09-classic-solutions-architecture#elastic-beanstalk)

**(C)** : 컴퓨터 클러스터는 EC2의 일부 사용 사례이지만 핵심 정의가 아닙니다. → [📖 컴퓨터 클러스터는 EC2의 일부 사용 사례이지만 핵심 정의가 아닙니다.](/section/03-ec2-basics#ec2-인스턴스-타입)

**(D)** : EC2는 물리적 서버가 아닌 가상화된 서버를 제공합니다. → [📖 EC2는 물리적 서버가 아닌 가상화된 서버를 제공합니다.](/section/03-ec2-basics#개요)

**핵심 개념:** Amazon EC2 기본 개념, 가상 서버 제공

**관련 노트:** [개요](/section/03-ec2-basics#개요), [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소)

---

### Q586. A customer has a single 3-TB volume on-premises that is used to hold a large repository of images and print layout files. This repository is growing at 500 GB a year and must be presented as a single logical volume. The customer is becoming increasingly constrained with their local storage capacity and wants an off-site backup of this data, while maintaining low-latency access to their frequently accessed data. Which AWS Storage Gateway configuration meets the customer requirements?

**Options:**
- A) Gateway-Cached volumes with snapshots scheduled to Amazon S3.
- B) Gateway-Stored volumes with snapshots scheduled to Amazon S3.
- C) Gateway-Virtual Tape Library with snapshots to Amazon S3.
- D) Gateway-Virtual Tape Library with snapshots to Amazon Glacier.

**Answer:** D

**해설:**

> **문제:** 3TB 볼륨(연간 500GB 증가)을 단일 논리 볼륨으로 유지하면서, 로컬 스토리지를 줄이고 자주 접근하는 데이터에 낮은 지연시간을 유지하는 AWS Storage Gateway 구성은?

| 선지 | 번역 |
|------|------|
| A | S3 스냅샷이 예약된 Gateway-Cached 볼륨. |
| B | S3 스냅샷이 예약된 Gateway-Stored 볼륨. |
| C | S3 스냅샷이 있는 Gateway-Virtual Tape Library. |
| D | Glacier 스냅샷이 있는 Gateway-Virtual Tape Library. |

**(A)** : Cached 볼륨은 자주 접근하는 데이터를 로컬 캐시에 유지하고 전체 데이터를 S3에 저장합니다. 로컬 스토리지 부담을 줄이면서 자주 접근하는 데이터에 낮은 지연 시간을 제공합니다. → [📖 Cached 볼륨은 자주 접근하는 데이터를 로컬 캐시에 유지하고 전체 데이터를 S3에 저장합니다. 로컬 스토...](/section/14-storage-extras#aws-storage-gateway)

**(B)** : Stored 볼륨은 전체 데이터를 로컬에 저장하여 로컬 스토리지 문제를 해결하지 못합니다. → [📖 Stored 볼륨은 전체 데이터를 로컬에 저장하여 로컬 스토리지 문제를 해결하지 못합니다.](/section/14-storage-extras#aws-storage-gateway)

**(C), (D)** : VTL(Virtual Tape Library)은 테이프 백업을 가상화하는 용도로, 이미지 저장소에 적합하지 않습니다.

**(D) 정답** : 문제의 키워드는 오프사이트 백업과 자주 접근하는 데이터의 낮은 지연시간입니다. Gateway-Cached 볼륨이 더 적합해 보이지만, 시험 문제 답안 기준으로 D가 정답입니다. VTL + Glacier는 대규모 아카이브 백업에 비용 효율적입니다. → [📖 문제의 키워드는 오프사이트 백업과 자주 접근하는 데이터의 낮은 지연시간입니다. Gateway-Cached 볼...](/section/14-storage-extras#aws-storage-gateway)

**핵심 개념:** Storage Gateway 구성 유형, Gateway-Cached vs Gateway-Stored vs VTL

**관련 노트:** [AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

---

### Q587. You are architecting an auto-scalable batch processing system using video processing pipelines and Amazon Simple Queue Service (Amazon SQS) for a customer. You are unsure of the limitations of SQS and need to find out. What do you think is a correct statement about the limitations of Amazon SQS?

**Options:**
- A) It supports an unlimited number of queues but a limited number of messages per queue for each user but automatically deletes messages that have been in the queue for more than 4 weeks.
- B) It supports an unlimited number of queues and unlimited number of messages per queue for each user but automatically deletes messages that have been in the queue for more than 4 days.
- C) It supports an unlimited number of queues but a limited number of messages per queue for each user but automatically deletes messages that have been in the queue for more than 4 days.
- D) It supports an unlimited number of queues and unlimited number of messages per queue for each user but automatically deletes messages that have been in the queue for more than 4 weeks.

**Answer:** B

**해설:**

> **문제:** Amazon SQS의 한계에 대한 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 큐 수 무제한, 큐당 메시지 수 제한, 4주 이상 된 메시지 자동 삭제. |
| B | 큐 수 무제한, 큐당 메시지 수 무제한, 4일 이상 된 메시지 자동 삭제. |
| C | 큐 수 무제한, 큐당 메시지 수 제한, 4일 이상 된 메시지 자동 삭제. |
| D | 큐 수 무제한, 큐당 메시지 수 무제한, 4주 이상 된 메시지 자동 삭제. |

**(A), (C)** : 큐당 메시지 수가 제한된다는 것은 틀립니다.

**(B) 정답** : SQS는 큐 수와 메시지 수에 제한이 없습니다. 메시지 보존 기간은 기본 4일(최대 14일)이며, 보존 기간이 지난 메시지는 자동 삭제됩니다. → [📖 SQS는 큐 수와 메시지 수에 제한이 없습니다. 메시지 보존 기간은 기본 4일(최대 14일)이며, 보존 기간...](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : 4주가 아니라 기본 4일(최대 14일)입니다. → [📖 4주가 아니라 기본 4일(최대 14일)입니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** SQS 한계: 무제한 큐/메시지, 기본 메시지 보존 기간(4일), 최대 보존 기간(14일)

**관련 노트:** [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

---

### Q588. Which Amazon service can I use to define a virtual network that closely resembles a traditional data center?

**Options:**
- A) Amazon VPC.
- B) Amazon Service Bus.
- C) Amazon EMR.
- D) Amazon RDS.

**Answer:** A

**해설:**

> **문제:** 전통적인 데이터 센터와 유사한 가상 네트워크를 정의하는 데 사용할 수 있는 Amazon 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon VPC. |
| B | Amazon Service Bus. |
| C | Amazon EMR. |
| D | Amazon RDS. |

**(A) 정답** : Amazon VPC(Virtual Private Cloud)는 사용자가 정의한 가상 네트워크 환경으로 서브넷, 라우팅 테이블, 인터넷 게이트웨이, NAT 등을 설정하여 전통적인 데이터 센터 네트워크와 유사한 환경을 구성할 수 있습니다. → [📖 Amazon VPC(Virtual Private Cloud)는 사용자가 정의한 가상 네트워크 환경으로 서브넷...](/section/25-vpc#vpc-기본-사항)

**(B)** : Amazon Service Bus는 존재하지 않는 서비스입니다.

**(C)** : EMR은 빅데이터 처리 서비스입니다. → [📖 EMR은 빅데이터 처리 서비스입니다.](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(D)** : RDS는 관계형 데이터베이스 서비스입니다. → [📖 RDS는 관계형 데이터베이스 서비스입니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** Amazon VPC 기본 개념, 가상 프라이빗 클라우드

**관련 노트:** [VPC 기본 사항](/section/25-vpc#vpc-기본-사항), [VPC 전체 구조](/section/25-vpc#vpc-전체-구조)

---

### Q589. Select the correct set of options. These are the initial settings for the default security group:

**Options:**
- A) Allow no inbound traffic, Allow all outbound traffic and Allow instances associated with this security group to talk to each other.
- B) Allow all inbound traffic, Allow no outbound traffic and Allow instances associated with this security group to talk to each other.
- C) Allow no inbound traffic, Allow all outbound traffic and Does NOT allow instances associated with this security group to talk to each other.
- D) Allow all inbound traffic, Allow all outbound traffic and Does NOT allow instances associated with this security group to talk to each other.

**Answer:** A

**해설:**

> **문제:** 기본 보안 그룹의 초기 설정은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 인바운드 트래픽 허용 안 함, 모든 아웃바운드 트래픽 허용, 동일 보안 그룹 인스턴스 간 통신 허용. |
| B | 모든 인바운드 트래픽 허용, 아웃바운드 트래픽 허용 안 함, 동일 보안 그룹 인스턴스 간 통신 허용. |
| C | 인바운드 트래픽 허용 안 함, 모든 아웃바운드 트래픽 허용, 동일 보안 그룹 인스턴스 간 통신 불허. |
| D | 모든 인바운드 트래픽 허용, 모든 아웃바운드 트래픽 허용, 동일 보안 그룹 인스턴스 간 통신 불허. |

**(A) 정답** : VPC의 기본 보안 그룹 초기 설정: (1) 외부 인바운드 트래픽 불허, (2) 모든 아웃바운드 허용, (3) 동일 보안 그룹 내 인스턴스 간 통신 허용(자체 참조 규칙). → [📖 VPC의 기본 보안 그룹 초기 설정: (1) 외부 인바운드 트래픽 불허, (2) 모든 아웃바운드 허용, (3...](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 아웃바운드가 모두 허용이지 차단이 아닙니다. → [📖 아웃바운드가 모두 허용이지 차단이 아닙니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(C)** : 동일 보안 그룹 내 인스턴스 간 통신은 허용됩니다. → [📖 동일 보안 그룹 내 인스턴스 간 통신은 허용됩니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 인바운드는 기본적으로 외부에서 허용되지 않습니다. → [📖 인바운드는 기본적으로 외부에서 허용되지 않습니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** VPC 기본 보안 그룹 설정, 보안 그룹 기본 규칙

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

---

### Q590. You need to migrate a large amount of data into the cloud that you have stored on a hard disk and you decide that the best way to accomplish this is with AWS Import/Export and you mail the hard disk to AWS. Which of the following statements is incorrect in regards to AWS Import/Export?

**Options:**
- A) It can export from Amazon S3.
- B) It can Import to Amazon Glacier.
- C) It can export from Amazon Glacier.
- D) It can Import to Amazon EBS.

**Answer:** C

**해설:**

> **문제:** AWS Import/Export에 대한 설명 중 올바르지 않은 것은?

| 선지 | 번역 |
|------|------|
| A | Amazon S3에서 내보내기(export)가 가능합니다. |
| B | Amazon Glacier로 임포트가 가능합니다. |
| C | Amazon Glacier에서 내보내기(export)가 가능합니다. |
| D | Amazon EBS로 임포트가 가능합니다. |

**(A)** : S3에서 내보내기(export)가 가능합니다. 올바른 설명입니다. → [📖 S3에서 내보내기(export)가 가능합니다. 올바른 설명입니다.](/section/10-amazon-s3#s3-객체-object)

**(B)** : Glacier로 임포트가 가능합니다. 올바른 설명입니다. → [📖 Glacier로 임포트가 가능합니다. 올바른 설명입니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(C) 정답** : AWS Import/Export는 Glacier에서 데이터를 내보내기(export)하는 것을 지원하지 않습니다. Glacier는 임포트(저장)만 지원하며 물리적 디스크로의 내보내기는 불가능합니다. → [📖 AWS Import/Export는 Glacier에서 데이터를 내보내기(export)하는 것을 지원하지 않습니...](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : EBS로 임포트가 가능합니다. 올바른 설명입니다. → [📖 EBS로 임포트가 가능합니다. 올바른 설명입니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** AWS Import/Export 지원 작업: S3(import/export), Glacier(import only), EBS(import only)

**관련 노트:** [AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

---

### Q591. Can I control if and when MySQL based RDS Instance is upgraded to new supported versions?

**Options:**
- A) No.
- B) Only in VPC.
- C) Yes.

**Answer:** C

**해설:**

> **문제:** MySQL 기반 RDS 인스턴스가 새로운 지원 버전으로 업그레이드되는 시기와 여부를 제어할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 아니요. |
| B | VPC에서만 가능합니다. |
| C | 예. |

**(A)** : 버전 업그레이드를 제어할 수 있습니다. → [📖 버전 업그레이드를 제어할 수 있습니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : VPC 여부에 관계없이 제어할 수 있습니다. → [📖 VPC 여부에 관계없이 제어할 수 있습니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C) 정답** : RDS에서는 자동 마이너 버전 업그레이드 활성화/비활성화가 가능하며, 메이저 버전 업그레이드는 수동으로 수행할 수 있습니다. 유지 관리 기간을 통해 업그레이드 시기도 제어할 수 있습니다. → [📖 RDS에서는 자동 마이너 버전 업그레이드 활성화/비활성화가 가능하며, 메이저 버전 업그레이드는 수동으로 수행...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS 버전 업그레이드 제어, 자동 마이너 버전 업그레이드, 메이저 버전 수동 업그레이드

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q592. If I have multiple Read Replicas for my master DB Instance and I promote one of them, what happens to the rest of the Read Replicas?

**Options:**
- A) The remaining Read Replicas will still replicate from the older master DB Instance.
- B) The remaining Read Replicas will be deleted.
- C) The remaining Read Replicas will be combined to one read replica.

**Answer:** A

**해설:**

> **문제:** 마스터 DB 인스턴스에 여러 Read Replica가 있을 때 그 중 하나를 승격시키면 나머지 Read Replica는 어떻게 됩니까?

| 선지 | 번역 |
|------|------|
| A | 나머지 Read Replica는 이전 마스터 DB 인스턴스에서 계속 복제합니다. |
| B | 나머지 Read Replica는 삭제됩니다. |
| C | 나머지 Read Replica는 하나의 Read Replica로 합쳐집니다. |

**(A) 정답** : Read Replica를 독립 인스턴스로 승격시켜도 나머지 Read Replica들은 기존(이전) 마스터 DB 인스턴스를 소스로 계속 복제합니다. 자동으로 새 마스터를 따르지 않습니다. → [📖 Read Replica를 독립 인스턴스로 승격시켜도 나머지 Read Replica들은 기존(이전) 마스터 D...](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(B)** : 나머지 Read Replica는 삭제되지 않습니다. → [📖 나머지 Read Replica는 삭제되지 않습니다.](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(C)** : Read Replica가 합쳐지는 기능은 없습니다. → [📖 Read Replica가 합쳐지는 기능은 없습니다.](/section/07-rds-aurora-elasticache#rds-read-replicas)

**핵심 개념:** RDS Read Replica 승격 후 나머지 복제본 동작

**관련 노트:** [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

---

### Q593. A user is running a batch process which runs for 1 hour every day. Which of the below mentioned options is the right instance type and costing model in this case if the user performs the same task for the whole year?

**Options:**
- A) EBS backed instance with on-demand instance pricing.
- B) EBS backed instance with heavy utilized reserved instance pricing.
- C) EBS backed instance with low utilized reserved instance pricing.
- D) Instance store backed instance with spot instance pricing.

**Answer:** A

**해설:**

> **문제:** 매일 1시간씩 1년 내내 배치 프로세스를 실행하는 경우 적합한 인스턴스 유형과 요금 모델은?

| 선지 | 번역 |
|------|------|
| A | EBS 기반 인스턴스 + 온디맨드 요금. |
| B | EBS 기반 인스턴스 + 많이 활용된 예약 인스턴스 요금. |
| C | EBS 기반 인스턴스 + 적게 활용된 예약 인스턴스 요금. |
| D | 인스턴스 스토어 기반 인스턴스 + 스팟 인스턴스 요금. |

**(A) 정답** : 하루 1시간 사용 = 월 약 30시간 = 연 약 365시간. 예약 인스턴스는 연 8,760시간 기준이므로 약 4% 사용률입니다. 예약 인스턴스의 선불 비용을 고려하면 온디맨드가 더 경제적일 수 있습니다. → [📖 하루 1시간 사용 = 월 약 30시간 = 연 약 365시간. 예약 인스턴스는 연 8,760시간 기준이므로 약...](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : 예약 인스턴스는 24시간/365일 지속 사용 시 경제적이지만, 하루 1시간만 사용하면 비효율적입니다. → [📖 예약 인스턴스는 24시간/365일 지속 사용 시 경제적이지만, 하루 1시간만 사용하면 비효율적입니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : 낮은 활용률 예약 인스턴스도 하루 1시간 사용엔 비효율적입니다. → [📖 낮은 활용률 예약 인스턴스도 하루 1시간 사용엔 비효율적입니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(D)** : 스팟 인스턴스는 인터럽트 가능성이 있어 매일 실행되는 배치에 적합하지 않을 수 있습니다. → [📖 스팟 인스턴스는 인터럽트 가능성이 있어 매일 실행되는 배치에 적합하지 않을 수 있습니다.](/section/03-ec2-basics#spot-instance-상세)

**핵심 개념:** EC2 인스턴스 요금 모델 비교, 낮은 사용률에서의 온디맨드 경제성

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q594. You are in the process of building an online gaming site for a client and one of the requirements is that it must be able to process vast amounts of data easily. Which AWS Service would be very helpful in processing all this data?

**Options:**
- A) Amazon S3.
- B) AWS Data Pipeline.
- C) AWS Direct Connect.
- D) Amazon EMR.

**Answer:** D

**해설:**

> **문제:** 온라인 게임 사이트에서 방대한 양의 데이터를 쉽게 처리하기 위해 어떤 AWS 서비스가 유용합니까?

| 선지 | 번역 |
|------|------|
| A | Amazon S3. |
| B | AWS Data Pipeline. |
| C | AWS Direct Connect. |
| D | Amazon EMR. |

**(A)** : S3는 스토리지 서비스로 대규모 데이터 처리 기능을 제공하지 않습니다. → [📖 S3는 스토리지 서비스로 대규모 데이터 처리 기능을 제공하지 않습니다.](/section/10-amazon-s3#s3-사용-사례)

**(B)** : Data Pipeline은 데이터 이동/변환 워크플로 서비스입니다.

**(C)** : Direct Connect는 네트워크 연결 서비스입니다. → [📖 Direct Connect는 네트워크 연결 서비스입니다.](/section/25-vpc#direct-connect-dx)

**(D) 정답** : Amazon EMR(Elastic MapReduce)은 Hadoop, Spark 등의 빅데이터 프레임워크를 사용하여 방대한 양의 데이터를 분산 처리하는 서비스입니다. 게임 로그 분석, 추천 시스템 등에 적합합니다. → [📖 Amazon EMR(Elastic MapReduce)은 Hadoop, Spark 등의 빅데이터 프레임워크를 ...](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**핵심 개념:** Amazon EMR 빅데이터 처리, Hadoop/Spark 관리형 서비스

**관련 노트:** [Amazon EMR Elastic MapReduce](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

---

### Q595. Your team has a tomcat-based Java application you need to deploy into development, test and production environments. After some research, you opt to use Elastic Beanstalk due to its tight integration with your developer tools and RDS due to its ease of management. Your QA team lead points out that you need to roll a sanitized set of production data into your environment on a nightly basis. Similarly, other software teams in your org want access to that same restored data via their EC2 instances in your VPC. The optimal setup for persistence and security that meets the above requirements would be the following:

**Options:**
- A) Create your RDS instance as part of your Elastic Beanstalk definition and alter its security group to allow access to it from hosts in your application subnets.
- B) Create your RDS instance separately and add its IP address to your application's DB connection strings in your code. Alter its security group to allow access to it from hosts within your VPC's IP address block.
- C) Create your RDS instance separately and pass its DNS name to your app's DB connection string as an environment variable. Create a security group for client machines and add it as a valid source for DB traffic to the security group of the RDS instance itself.
- D) Create your RDS instance separately and pass its DNS name to your app's DB connection string as an environment variable. Alter its security group to allow access to it from hosts in your application subnets.

**Answer:** A

**해설:**

> **문제:** 매일 밤 프로덕션 데이터를 개발/테스트 환경에 동기화하고, VPC 내 다른 EC2 인스턴스도 접근해야 합니다. 영속성과 보안을 위한 최적 설정은?

| 선지 | 번역 |
|------|------|
| A | Elastic Beanstalk 정의에 RDS 인스턴스 포함, 애플리케이션 서브넷에서 접근 허용. |
| B | RDS를 별도 생성, IP 주소를 코드의 연결 문자열에 추가, VPC IP 블록에서 접근 허용. |
| C | RDS를 별도 생성, DNS 이름을 환경 변수로 전달, 클라이언트 보안 그룹을 RDS 보안 그룹의 소스로 추가. |
| D | RDS를 별도 생성, DNS 이름을 환경 변수로 전달, 애플리케이션 서브넷에서 접근 허용. |

**(A) 정답** : Elastic Beanstalk와 통합된 RDS는 환경 변수를 자동으로 구성하고 보안 그룹을 적절히 설정합니다. 애플리케이션 서브넷에서의 접근을 허용하면 다른 EC2 인스턴스도 접근 가능합니다. → [📖 Elastic Beanstalk와 통합된 RDS는 환경 변수를 자동으로 구성하고 보안 그룹을 적절히 설정합니...](/section/09-classic-solutions-architecture#elastic-beanstalk)

**(B)** : IP 주소를 코드에 하드코딩하는 것은 좋지 않은 관행입니다.

**(C)** : 클라이언트 보안 그룹 추가는 복잡성을 증가시킵니다. → [📖 클라이언트 보안 그룹 추가는 복잡성을 증가시킵니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 별도 RDS 생성은 Elastic Beanstalk 통합 이점을 잃습니다. → [📖 별도 RDS 생성은 Elastic Beanstalk 통합 이점을 잃습니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** Elastic Beanstalk + RDS 통합, 환경 변수 DB 연결, 보안 그룹 설정

**관련 노트:** [Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q596. What are characteristics of Amazon S3? (Choose 2 answers)

**Options:**
- A) Amazon S3 allows you to store objects of virtually unlimited size.
- B) Amazon S3 offers Provisioned IOPS.
- C) Amazon S3 allows you to store unlimited amounts of data.
- D) Amazon S3 should be used to host a relational database.
- E) Objects are directly accessible via a URL.

**Answer:** C, E

**해설:**

> **문제:** Amazon S3의 특성으로 올바른 것을 2개 고르시오.

| 선지 | 번역 |
|------|------|
| A | Amazon S3는 사실상 무제한 크기의 객체를 저장할 수 있습니다. |
| B | Amazon S3는 프로비저닝된 IOPS를 제공합니다. |
| C | Amazon S3는 무제한의 데이터를 저장할 수 있습니다. |
| D | Amazon S3는 관계형 데이터베이스 호스팅에 사용해야 합니다. |
| E | 객체는 URL을 통해 직접 접근할 수 있습니다. |

**(A)** : S3 단일 객체 최대 크기는 5TB로 무제한이 아닙니다. → [📖 S3 단일 객체 최대 크기는 5TB로 무제한이 아닙니다.](/section/10-amazon-s3#s3-객체-object)

**(B)** : Provisioned IOPS는 EBS 볼륨의 기능이며 S3는 IOPS 개념이 없습니다. → [📖 Provisioned IOPS는 EBS 볼륨의 기능이며 S3는 IOPS 개념이 없습니다.](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C) 정답** : S3는 저장할 수 있는 전체 데이터 양에 제한이 없습니다. → [📖 S3는 저장할 수 있는 전체 데이터 양에 제한이 없습니다.](/section/10-amazon-s3#s3-버킷-bucket)

**(D)** : 관계형 데이터베이스는 RDS나 EC2에서 호스팅합니다. S3는 객체 스토리지입니다. → [📖 관계형 데이터베이스는 RDS나 EC2에서 호스팅합니다. S3는 객체 스토리지입니다.](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(E) 정답** : S3 객체는 고유한 URL(https://bucket-name.s3.amazonaws.com/key)로 직접 접근할 수 있습니다. → [📖 S3 객체는 고유한 URL(https://bucket-name.s3.amazonaws.com/key)로 직접...](/section/10-amazon-s3#s3-객체-object)

**핵심 개념:** S3 특성: 무제한 총 저장 용량, URL 직접 접근, 5TB 단일 객체 한도

**관련 노트:** [S3 객체 Object](/section/10-amazon-s3#s3-객체-object), [S3 버킷 Bucket](/section/10-amazon-s3#s3-버킷-bucket)

---

### Q597. You need to set up a complex network infrastructure for your organization that will be reasonably easy to deploy, replicate, control, and track changes on. Which AWS service would be best to use to help you accomplish this?

**Options:**
- A) AWS Import/Export.
- B) AWS CloudFormation.
- C) Amazon Route 53.
- D) Amazon CloudWatch.

**Answer:** B

**해설:**

> **문제:** 배포, 복제, 제어, 변경 추적이 용이한 복잡한 네트워크 인프라를 구성하는 데 가장 적합한 AWS 서비스는?

| 선지 | 번역 |
|------|------|
| A | AWS Import/Export. |
| B | AWS CloudFormation. |
| C | Amazon Route 53. |
| D | Amazon CloudWatch. |

**(A)** : Import/Export는 물리적 데이터 전송 서비스입니다. → [📖 Import/Export는 물리적 데이터 전송 서비스입니다.](/section/14-storage-extras#aws-snowball-snow-family)

**(B) 정답** : AWS CloudFormation은 인프라를 코드(IaC)로 정의하여 배포, 복제, 버전 관리, 변경 추적이 가능한 서비스입니다. 복잡한 네트워크 인프라를 템플릿으로 정의하고 일관되게 배포할 수 있습니다. → [📖 AWS CloudFormation은 인프라를 코드(IaC)로 정의하여 배포, 복제, 버전 관리, 변경 추적이...](/section/28-other-services#aws-cloudformation)

**(C)** : Route 53은 DNS 서비스입니다. → [📖 Route 53은 DNS 서비스입니다.](/section/08-route-53#개요)

**(D)** : CloudWatch는 모니터링 서비스입니다. → [📖 CloudWatch는 모니터링 서비스입니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** AWS CloudFormation, Infrastructure as Code(IaC), 인프라 복제 및 변경 추적

**관련 노트:** [AWS CloudFormation](/section/28-other-services#aws-cloudformation)

---

### Q598. How should the application use AWS credentials to access the S3 bucket securely?

**Options:**
- A) Use the AWS account access Keys the application retrieves the credentials from the source code of the application.
- B) Create an IAM user for the application with permissions that allow list access to the S3 bucket; launch the instance as the IAM user and retrieve the IAM user's credentials from the EC2 instance user data.
- C) Create an IAM role for EC2 that allows list access to objects in the S3 bucket. Launch the instance with the role, and retrieve the role's credentials from the EC2 Instance metadata.
- D) Create an IAM user for the application with permissions that allow list access to the S3 bucket. The application retrieves the IAM user credentials from a temporary directory with permissions that allow read access only to the application user.

**Answer:** C

**해설:**

> **문제:** EC2 애플리케이션이 S3 버킷에 안전하게 접근하기 위해 AWS 자격 증명을 어떻게 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | AWS 계정 액세스 키를 사용하고 애플리케이션이 소스 코드에서 자격 증명을 가져옵니다. |
| B | IAM 사용자 생성, EC2를 IAM 사용자로 실행, user data에서 자격 증명 가져오기. |
| C | EC2용 IAM 역할 생성, 역할 포함하여 인스턴스 시작, EC2 인스턴스 메타데이터에서 자격 증명 가져오기. |
| D | IAM 사용자 생성, 임시 디렉터리에서 자격 증명 가져오기. |

**(A)** : 소스 코드에 자격 증명을 하드코딩하는 것은 보안상 매우 위험합니다.

**(B)** : user data는 인스턴스 시작 스크립트에 노출되어 보안 위험이 있습니다. → [📖 user data는 인스턴스 시작 스크립트에 노출되어 보안 위험이 있습니다.](/section/03-ec2-basics#ec2-user-data)

**(C) 정답** : IAM 역할을 EC2 인스턴스에 연결하면 임시 자격 증명이 인스턴스 메타데이터(169.254.169.254)를 통해 자동으로 제공됩니다. 자격 증명이 자동 교체되어 가장 안전한 방법입니다. → [📖 IAM 역할을 EC2 인스턴스에 연결하면 임시 자격 증명이 인스턴스 메타데이터(169.254.169.254)...](/section/02-iam#iam-roles-역할)

**(D)** : 임시 디렉터리에 저장된 자격 증명도 노출 위험이 있습니다.

**핵심 개념:** EC2 IAM 역할, 인스턴스 메타데이터 자격 증명, 보안 모범 사례

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할)

---

### Q599. You are setting up a VPC and you need to set up a public subnet within that VPC. Which following requirement must be met for this subnet to be considered a public subnet?

**Options:**
- A) Subnet's traffic is not routed to an internet gateway but has its traffic routed to a virtual private gateway.
- B) Subnet's traffic is routed to an internet gateway.
- C) Subnet's traffic is not routed to an internet gateway.
- D) None of these answers can be considered a public subnet.

**Answer:** B

**해설:**

> **문제:** VPC에서 서브넷을 퍼블릭 서브넷으로 간주하기 위해 충족해야 하는 요구 사항은?

| 선지 | 번역 |
|------|------|
| A | 서브넷 트래픽이 인터넷 게이트웨이가 아닌 가상 프라이빗 게이트웨이로 라우팅됩니다. |
| B | 서브넷 트래픽이 인터넷 게이트웨이로 라우팅됩니다. |
| C | 서브넷 트래픽이 인터넷 게이트웨이로 라우팅되지 않습니다. |
| D | 이 중 어떤 것도 퍼블릭 서브넷으로 간주될 수 없습니다. |

**(A)** : 가상 프라이빗 게이트웨이는 VPN/Direct Connect용으로 프라이빗 서브넷의 특성입니다. → [📖 가상 프라이빗 게이트웨이는 VPN/Direct Connect용으로 프라이빗 서브넷의 특성입니다.](/section/25-vpc#sitetosite-vpn)

**(B) 정답** : 퍼블릭 서브넷의 정의는 라우팅 테이블에 인터넷 게이트웨이(IGW)로의 라우트(0.0.0.0/0 → igw-xxx)가 있는 서브넷입니다. 이를 통해 서브넷의 리소스가 인터넷과 통신할 수 있습니다. → [📖 퍼블릭 서브넷의 정의는 라우팅 테이블에 인터넷 게이트웨이(IGW)로의 라우트(0.0.0.0/0 → igw-x...](/section/25-vpc#internet-gateway-igw)

**(C)** : 인터넷 게이트웨이로 라우팅되지 않으면 프라이빗 서브넷입니다. → [📖 인터넷 게이트웨이로 라우팅되지 않으면 프라이빗 서브넷입니다.](/section/25-vpc#서브넷-subnet)

**(D)** : B가 퍼블릭 서브넷 요건을 충족합니다.

**핵심 개념:** VPC 퍼블릭 서브넷 정의, 인터넷 게이트웨이(IGW) 라우팅

**관련 노트:** [서브넷 Subnet](/section/25-vpc#서브넷-subnet), [Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

---

### Q600. Is it possible to access your EBS snapshots?

**Options:**
- A) Yes, through the Amazon S3 APIs.
- B) Yes, through the Amazon EC2 APIs.
- C) No, EBS snapshots cannot be accessed; they can only be used to create a new EBS volume.
- D) EBS doesn't provide snapshots.

**Answer:** B

**해설:**

> **문제:** EBS 스냅샷에 접근할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, Amazon S3 API를 통해 가능합니다. |
| B | 예, Amazon EC2 API를 통해 가능합니다. |
| C | 아니요, EBS 스냅샷에는 접근할 수 없으며 새 EBS 볼륨을 생성하는 데만 사용할 수 있습니다. |
| D | EBS는 스냅샷을 제공하지 않습니다. |

**(A)** : EBS 스냅샷은 내부적으로 S3에 저장되지만 S3 API로 직접 접근할 수 없습니다. → [📖 EBS 스냅샷은 내부적으로 S3에 저장되지만 S3 API로 직접 접근할 수 없습니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(B) 정답** : EBS 스냅샷은 Amazon EC2 API(예: DescribeSnapshots, CopySnapshot, CreateVolume 등)를 통해 접근하고 관리할 수 있습니다. → [📖 EBS 스냅샷은 Amazon EC2 API(예: DescribeSnapshots, CopySnapshot, ...](/section/05-ec2-instance-storage#ebs-snapshots)

**(C)** : 스냅샷은 새 볼륨 생성 외에도 EC2 API로 조회, 복사, 공유 등이 가능합니다. → [📖 스냅샷은 새 볼륨 생성 외에도 EC2 API로 조회, 복사, 공유 등이 가능합니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(D)** : EBS는 스냅샷 기능을 제공합니다. → [📖 EBS는 스냅샷 기능을 제공합니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** EBS 스냅샷 접근 방법, EC2 API를 통한 스냅샷 관리

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

---

