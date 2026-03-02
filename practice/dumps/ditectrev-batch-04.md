# Ditectrev SAA-C03 Practice Questions — Batch 04 (Q151-Q200)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---


### Q151. A customer is running a multi-tier web application farm in a virtual private cloud (VPC) that is not connected to their corporate network. They are connecting to the VPC over the Internet to manage all of their Amazon EC2 instances running in both the public and private subnets. They have only authorized the bastion-security-group with Microsoft Remote Desktop Protocol (RDP) access to the application instance security groups, but the company wants to further limit administrative access to all of the instances in the VPC. Which of the following Bastion deployment scenarios will meet this requirement?

**Options:**
- A) Deploy a Windows Bastion host on the corporate network that has RDP access to all instances in the VPC.
- B) Deploy a Windows Bastion host with an Elastic IP address in the public subnet and allow SSH access to the bastion from anywhere.
- C) Deploy a Windows Bastion host with an Elastic IP address in the private subnet, and restrict RDP access to the bastion from only the corporate public IP addresses.
- D) Deploy a Windows Bastion host with an auto-assigned Public IP address in the public subnet, and allow RDP access to the bastion from only the corporate public IP addresses.

**Answer:** C

**해설:**

> **문제:** VPC 내 모든 인스턴스에 대한 관리 액세스를 제한하는 Bastion 배포 시나리오는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 기업 네트워크에 VPC 내 모든 인스턴스에 RDP 액세스가 가능한 Windows Bastion 호스트를 배포합니다. |
| B | 퍼블릭 서브넷에 Elastic IP를 가진 Windows Bastion 호스트를 배포하고 어디서나 SSH 접근을 허용합니다. |
| C | 프라이빗 서브넷에 Elastic IP를 가진 Windows Bastion 호스트를 배포하고 기업 퍼블릭 IP에서만 RDP 접근을 제한합니다. |
| D | 퍼블릭 서브넷에 자동 할당 퍼블릭 IP를 가진 Windows Bastion 호스트를 배포하고 기업 퍼블릭 IP에서만 RDP 접근을 허용합니다. |

**(A)** : 기업 네트워크와 VPC가 연결되어 있지 않으므로 적용 불가합니다.

**(B)** : SSH는 Windows RDP가 필요한 환경에 적합하지 않으며, "어디서나" 접근 허용은 보안상 문제입니다.

**(C) 정답** : 프라이빗 서브넷의 Bastion에 Elastic IP를 할당하고 기업 IP에서만 RDP를 허용하는 것이 가장 안전합니다. 단, 실제로는 퍼블릭 서브넷에 배치하는 것이 일반적이며, 이 답은 제한적 접근이 핵심입니다.

**(D)** : 자동 할당 퍼블릭 IP는 재시작 시 변경될 수 있어 안정적이지 않습니다. Elastic IP를 사용하는 것이 올바릅니다.

**핵심 개념:** Bastion Host 보안 — Elastic IP + 특정 IP에서만 접근 허용으로 관리 접근 제한

---

### Q152. True or False: Common points of failures like generators and cooling equipment are shared across Availability Zones.

**Options:**
- A) True.
- B) False.

**Answer:** B

**해설:**

> **문제:** 발전기 및 냉각 장비와 같은 일반적인 장애 지점이 가용 영역(AZ) 간에 공유됩니까? 참/거짓?

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A)** : AZ는 공통 장애 지점을 공유하지 않습니다.

**(B) 정답** : 각 가용 영역은 독립적인 전력 공급, 냉각 시설, 네트워크를 갖추고 있으며, 공통 장애 지점을 공유하지 않습니다. 이것이 Multi-AZ 아키텍처의 핵심 이점입니다.

**핵심 개념:** 가용 영역(AZ) 독립성 — 전력, 냉각, 네트워크가 각 AZ별로 독립적으로 구성

---

### Q153. A company is building a voting system for a popular TV show. Viewers will watch the performances then visit the show's website to vote for their favorite performer. It is expected that in a short period of time after the show has finished the site will receive millions of visitors. The visitors will first login to the site using their Amazon.com credentials and then submit their vote. After the voting is completed the page will display the vote totals. The company needs to build the site such that it can handle the rapid influx of traffic while maintaining good performance but also wants to keep costs to a minimum. Which of the design patterns below should they use?

**Options:**
- A) Use CloudFront and an Elastic Load balancer in front of an auto-scaled set of web servers. The web servers will first call the Login With Amazon service to authenticate the user, then process the user's vote and store the result into a multi-AZ Relational Database Service instance.
- B) Use CloudFront and the static website hosting feature of S3 with the Javascript SDK to call the Login With Amazon service to authenticate the user. Use IAM Roles to gain permissions to a DynamoDB table to store the user's vote.
- C) Use CloudFront and an Elastic Load Balancer in front of an auto-scaled set of web servers. The web servers will first call the Login with Amazon service to authenticate the user. The web servers will process the user's vote and store the result into a DynamoDB table using IAM Roles for EC2 instances to gain permissions to the DynamoDB table.
- D) Use CloudFront and an Elastic Load Balancer in front of an auto-scaled set of web servers. The web servers will first call the Login with Amazon service to authenticate the user. The web servers will process the user's vote and store the result into an SQS queue using IAM Roles for EC2 Instances to gain permissions to the SQS queue. A set of application servers will then retrieve the items from the queue and store the result into a DynamoDB table.

**Answer:** D

**해설:**

> **문제:** TV 프로그램 투표 시스템에서 방송 직후 수백만 명의 트래픽을 처리하면서 비용을 최소화하는 설계 패턴은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | CloudFront + ELB + Auto Scaling 웹 서버, Multi-AZ RDS에 투표 저장. |
| B | CloudFront + S3 정적 호스팅 + DynamoDB에 투표 저장. |
| C | CloudFront + ELB + Auto Scaling 웹 서버, DynamoDB에 직접 투표 저장. |
| D | CloudFront + ELB + Auto Scaling 웹 서버, SQS 큐에 저장 후 애플리케이션 서버가 DynamoDB에 저장. |

**(A)** : RDS는 갑작스러운 대규모 트래픽 처리에 DynamoDB보다 확장성이 낮습니다.

**(B)** : S3 정적 호스팅만으로는 복잡한 투표 처리 로직을 구현하기 어렵습니다.

**(C)** : DynamoDB에 직접 쓰기는 가능하지만 SQS를 통한 버퍼링이 더 안정적으로 피크 트래픽을 처리합니다.

**(D) 정답** : CloudFront로 콘텐츠 캐싱, ELB+ASG로 트래픽 분산, SQS로 투표 요청을 버퍼링하여 백엔드 부하를 평탄화하고, DynamoDB로 확장 가능한 저장소를 사용하는 최적의 아키텍처입니다.

**핵심 개념:** SQS 버퍼링 패턴 — 피크 트래픽을 SQS로 흡수하여 백엔드 부하 평탄화

---

### Q154. You are designing a photo sharing mobile app. The application will store all pictures in a single Amazon S3 bucket. Users will upload pictures from their mobile device directly to Amazon S3 and will be able to view and download their own pictures directly from Amazon S3. You want to configure security to handle potentially millions of users in the most secure manner possible. What should your server-side application do when a new user registers on the photo sharing mobile application?

**Options:**
- A) Create an IAM user. Update the bucket policy with appropriate permissions for the IAM user. Generate an access key and secret key for the IAM user, store them in the mobile app and use these credentials to access Amazon S3.
- B) Create an IAM user. Assign appropriate permissions to the IAM user. Generate an access key and secret key for the IAM user, store them in the mobile app and use these credentials to access Amazon S3.
- C) Create a set of long-term credentials using AWS Security Token Service with appropriate permissions. Store these credentials in the mobile app and use them to access Amazon S3.
- D) Record the user's information in Amazon RDS and create a role in IAM with appropriate permissions. When the user uses their mobile app, create temporary credentials using the AWS Security Token Service `AssumeRole` function. Store these credentials in the mobile app's memory and use them to access Amazon S3. Generate new credentials the next time the user runs the mobile app.
- E) Record the user's information in Amazon DynamoDB. When the user uses their mobile app, create temporary credentials using AWS Security Token Service with appropriate permissions. Store these credentials in the mobile app's memory and use them to access Amazon S3. Generate new credentials the next time the user runs the mobile app.

**Answer:** D

**해설:**

> **문제:** 수백만 명의 사용자를 가장 안전하게 처리하기 위해 새 사용자 등록 시 서버 측 애플리케이션은 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | IAM 사용자 생성, 버킷 정책 업데이트, 액세스 키를 모바일 앱에 저장. |
| B | IAM 사용자 생성, 권한 할당, 액세스 키를 모바일 앱에 저장. |
| C | STS로 장기 자격 증명 생성 후 모바일 앱에 저장. |
| D | RDS에 사용자 정보 저장, IAM 역할 생성, 앱 사용 시 STS AssumeRole로 임시 자격 증명 생성. |
| E | DynamoDB에 사용자 정보 저장, 앱 사용 시 STS로 임시 자격 증명 생성. |

**(A)** : 수백만 IAM 사용자 생성은 확장성 없고, 장기 키를 앱에 저장하는 것은 보안 위험이 있습니다.

**(B)** : A와 동일한 문제가 있습니다.

**(C)** : STS는 임시 자격 증명을 제공하는데 "장기 자격 증명"은 STS 목적에 맞지 않습니다.

**(D) 정답** : IAM 역할 + STS AssumeRole을 통해 임시 자격 증명만 사용하고, RDS에 사용자 정보를 관리하는 안전하고 확장 가능한 접근 방식입니다.

**(E)** : D와 유사하지만, RDS 대신 DynamoDB를 사용합니다. D가 더 전통적인 사용자 관리 DB 접근 방식이므로 정답으로 선택됩니다.

**핵심 개념:** 모바일 앱 S3 접근 보안 — STS 임시 자격 증명 + IAM 역할로 안전한 접근

---

### Q155. Is there a limit to how many groups a user can be in?

**Options:**
- A) Yes for all users.
- B) Yes for all users except root.
- C) No.
- D) Yes unless special permission granted.

**Answer:** A

**해설:**

> **문제:** 사용자가 속할 수 있는 그룹 수에 제한이 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 모든 사용자에 대해 제한이 있습니다. |
| B | 예, 루트를 제외한 모든 사용자에 대해 제한이 있습니다. |
| C | 아니요. |
| D | 예, 특별 권한이 부여된 경우를 제외하고. |

**(A) 정답** : IAM 사용자는 최대 10개의 그룹에 속할 수 있습니다. 이는 모든 IAM 사용자에게 적용되는 제한입니다.

**(B)** : 루트 계정은 IAM 그룹의 구성원이 될 수 없으므로 이 구분은 의미가 없습니다.

**(C)** : 제한이 존재합니다 (최대 10개 그룹).

**(D)** : 특별 권한으로 제한을 변경할 수 없습니다.

**핵심 개념:** IAM 사용자 그룹 제한 — 한 사용자당 최대 10개 그룹

---

### Q156. Which is the default region in AWS?

**Options:**
- A) eu-west-1.
- B) us-east-1.
- C) us-east-2.
- D) ap-southeast-1.

**Answer:** B

**해설:**

> **문제:** AWS의 기본 리전은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | eu-west-1 (아일랜드). |
| B | us-east-1 (버지니아 북부). |
| C | us-east-2 (오하이오). |
| D | ap-southeast-1 (싱가포르). |

**(A)** : eu-west-1은 기본 리전이 아닙니다.

**(B) 정답** : AWS의 기본 리전은 us-east-1(버지니아 북부)입니다. 새로운 글로벌 서비스 출시 시 가장 먼저 제공되는 리전이기도 합니다.

**(C)** : us-east-2는 기본 리전이 아닙니다.

**(D)** : ap-southeast-1은 기본 리전이 아닙니다.

**핵심 개념:** AWS 기본 리전 — us-east-1 (버지니아 북부), 새 서비스 최초 출시 리전

---

### Q157. Your company hosts a social media site supporting users in multiple countries. You have been asked to provide a highly available design for the application that leverages multiple regions for the most recently accessed content and latency sensitive portions of the web site. The most latency sensitive component of the application involves reading user preferences to support web site personalization and ad selection. In addition to running your application in multiple regions, which option will support this application's requirements?

**Options:**
- A) Serve user content from S3. CloudFront and use Route 53 latency-based routing between ELBs in each region. Retrieve user preferences from a local DynamoDB table in each region and leverage SQS to capture changes to user preferences with SQS workers for propagating updates to each table.
- B) Use the S3 Copy API to copy recently accessed content to multiple regions and serve user content from S3. CloudFront with dynamic content and an ELB in each region. Retrieve user preferences from an ElastiCache cluster in each region and leverage SNS notifications to propagate user preference changes to a worker node in each region.
- C) Use the S3 Copy API to copy recently accessed content to multiple regions and serve user content from S3 CloudFront and Route 53 latency-based routing between ELBs in each region. Retrieve user preferences from a DynamoDB table and leverage SQS to capture changes to user preferences with SQS workers for propagating DynamoDB updates.
- D) Serve user content from S3. CloudFront with dynamic content, and an ELB in each region. Retrieve user preferences from an ElastiCache cluster in each region and leverage Simple Workflow (SWF) to manage the propagation of user preferences from a centralized DB to each ElastiCache cluster.

**Answer:** A

**해설:**

> **문제:** 다중 국가 소셜 미디어 사이트에서 지연 시간에 민감한 사용자 기본 설정 읽기와 고가용성을 위한 최적의 설계는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | S3+CloudFront+Route 53 지연 기반 라우팅, 각 리전 로컬 DynamoDB, SQS로 변경 사항 전파. |
| B | S3 Copy API로 콘텐츠 복제, ElastiCache로 사용자 기본 설정, SNS로 변경 전파. |
| C | S3 Copy API, Route 53, DynamoDB + SQS. |
| D | CloudFront + ELB, ElastiCache + SWF. |

**(A) 정답** : 각 리전에 로컬 DynamoDB 테이블을 두어 지연 시간을 최소화하고, SQS + 워커로 변경 사항을 각 리전에 전파하는 방식이 요구 사항(지연 민감, 고가용성, 멀티 리전)을 가장 잘 충족합니다.

**(B)** : ElastiCache는 단일 리전 캐시로 멀티 리전 복제가 복잡합니다.

**(C)** : 단일 DynamoDB 테이블 사용은 멀티 리전 지연 시간 최소화에 적합하지 않습니다.

**(D)** : SWF는 이 시나리오에 과도하게 복잡한 솔루션입니다.

**핵심 개념:** 멀티 리전 사용자 기본 설정 — 로컬 DynamoDB + SQS 기반 변경 전파

---

### Q158. A [...] is a document that provides a formal statement of one or more permissions.

**Options:**
- A) policy.
- B) permission.
- C) role.
- D) resource.

**Answer:** A

**해설:**

> **문제:** [...]은(는) 하나 이상의 권한에 대한 공식적인 설명을 제공하는 문서입니다.

| 선지 | 번역 |
|------|------|
| A | 정책(policy). |
| B | 권한(permission). |
| C | 역할(role). |
| D | 리소스(resource). |

**(A) 정답** : IAM 정책(Policy)은 JSON 형식의 문서로, 하나 이상의 권한을 공식적으로 정의합니다.

**(B)** : 권한(Permission)은 정책이 정의하는 개념이지 문서 자체가 아닙니다.

**(C)** : 역할(Role)은 정책을 연결할 수 있는 IAM 주체이며 문서가 아닙니다.

**(D)** : 리소스(Resource)는 정책이 적용되는 대상입니다.

**핵심 개념:** IAM 정책(Policy) — 하나 이상의 권한을 정의하는 JSON 문서

---

### Q159. A company wants to implement their website in a virtual private cloud (VPC). The web tier will use an Auto Scaling group across multiple Availability Zones (AZs). The database will use Multi-AZ RDS MySQL and should not be publicly accessible. What is the minimum number of subnets that need to be configured in the VPC?

**Options:**
- A) 1.
- B) 2.
- C) 3.
- D) 4.

**Answer:** D

**해설:**

> **문제:** 멀티 AZ Auto Scaling 웹 계층과 Multi-AZ RDS MySQL(비공개)을 구성하기 위해 VPC에 필요한 최소 서브넷 수는 얼마입니까?

| 선지 | 번역 |
|------|------|
| A | 1개. |
| B | 2개. |
| C | 3개. |
| D | 4개. |

**(A)** : 단일 서브넷으로는 멀티 AZ와 퍼블릭/프라이빗 분리를 구현할 수 없습니다.

**(B)** : 2개로는 부족합니다.

**(C)** : 3개로는 부족합니다.

**(D) 정답** : 최소 4개의 서브넷이 필요합니다. 2개의 퍼블릭 서브넷(각 AZ에 하나, 웹 서버용)과 2개의 프라이빗 서브넷(각 AZ에 하나, RDS Multi-AZ용). RDS Multi-AZ는 최소 2개의 AZ에 서브넷이 필요합니다.

**핵심 개념:** VPC 서브넷 설계 — 퍼블릭 2개(웹, 2AZ) + 프라이빗 2개(DB, 2AZ) = 최소 4개

---

### Q160. Is there a limit to the number of groups you can have?

**Options:**
- A) Yes for all users except root.
- B) No.
- C) Yes unless special permission granted.
- D) Yes for all users.

**Answer:** D

**해설:**

> **문제:** 생성할 수 있는 그룹 수에 제한이 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 루트를 제외한 모든 사용자에게 제한이 있습니다. |
| B | 아니요. |
| C | 예, 특별 권한이 부여된 경우를 제외하고. |
| D | 예, 모든 사용자에 대해. |

**(A)** : 그룹 생성 한도는 루트 예외 없이 계정 수준에서 적용됩니다.

**(B)** : 제한이 존재합니다.

**(C)** : 특별 권한으로 변경할 수 없는 한도입니다.

**(D) 정답** : AWS 계정당 IAM 그룹 수는 기본 300개로 제한됩니다. 이는 모든 사용자에게 적용됩니다.

**핵심 개념:** IAM 그룹 수 제한 — 계정당 기본 최대 300개

---

### Q161. True or False: Automated backups are enabled by default for a new DB Instance.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** 새 DB 인스턴스에 대해 자동 백업이 기본으로 활성화됩니까? 참/거짓?

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : Amazon RDS는 새 DB 인스턴스 생성 시 자동 백업이 기본으로 활성화됩니다. 기본 보존 기간은 1일입니다.

**(B)** : 자동 백업은 기본적으로 활성화되어 있습니다.

**핵심 개념:** RDS 자동 백업 — 기본 활성화, 보존 기간 기본 1일 (최대 35일)

---

### Q162. What is one key difference between an Amazon EBS-backed and an instance-store backed instance?

**Options:**
- A) Amazon EBS-backed instances can be stopped and restarted.
- B) Instance-store backed instances can be stopped and restarted.
- C) Auto scaling requires using Amazon EBS-backed instances.
- D) Virtual Private Cloud requires EBS backed instances.

**Answer:** A

**해설:**

> **문제:** Amazon EBS 지원 인스턴스와 인스턴스 스토어 지원 인스턴스의 주요 차이점 하나는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Amazon EBS 지원 인스턴스는 중지하고 재시작할 수 있습니다. |
| B | 인스턴스 스토어 지원 인스턴스는 중지하고 재시작할 수 있습니다. |
| C | Auto Scaling은 Amazon EBS 지원 인스턴스를 사용해야 합니다. |
| D | Virtual Private Cloud는 EBS 지원 인스턴스가 필요합니다. |

**(A) 정답** : EBS 지원 인스턴스는 중지(stop) 후 재시작이 가능합니다. 중지 시 인스턴스 요금이 청구되지 않으며 EBS 데이터는 유지됩니다.

**(B)** : 인스턴스 스토어 지원 인스턴스는 중지할 수 없으며, 종료(terminate)만 가능합니다.

**(C)** : Auto Scaling은 인스턴스 스토어 기반도 지원합니다.

**(D)** : VPC는 두 유형 모두 지원합니다.

**핵심 개념:** EBS vs 인스턴스 스토어 — EBS는 중지/재시작 가능, 인스턴스 스토어는 종료만 가능

---

### Q163. A major customer has asked you to set up his AWS infrastructure so that it will be easy to recover in the case of a disaster of some sort. Which of the following statements is true of Amazon EC2 security groups?

**Options:**
- A) Create and maintain AMIs of key servers where fast recovery is required.
- B) Regularly run your servers, test them, and apply any software updates and configuration changes.
- C) Ensure that you have all supporting custom software packages available in AWS.
- D) All items listed here are important when thinking about disaster recovery.

**Answer:** D

**해설:**

> **문제:** 재해 복구를 위한 AWS 인프라 설정에서 옳은 설명은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 빠른 복구가 필요한 핵심 서버의 AMI를 생성하고 유지합니다. |
| B | 정기적으로 서버를 실행하고 테스트하며 소프트웨어 업데이트와 구성 변경을 적용합니다. |
| C | 모든 지원 사용자 정의 소프트웨어 패키지를 AWS에서 사용 가능하도록 합니다. |
| D | 재해 복구를 고려할 때 여기 나열된 모든 항목이 중요합니다. |

**(A)** : AMI 유지는 중요한 재해 복구 요소이지만 이것만이 정답은 아닙니다.

**(B)** : 정기적 테스트와 업데이트도 중요하지만 이것만이 정답은 아닙니다.

**(C)** : 소프트웨어 패키지 가용성 확보도 중요하지만 이것만이 정답은 아닙니다.

**(D) 정답** : 재해 복구를 위해서는 A, B, C 모두 중요합니다. AMI 유지, 정기적 테스트/업데이트, 소프트웨어 가용성 모두 DR 전략의 핵심 요소입니다.

**핵심 개념:** 재해 복구(DR) 전략 — AMI 유지 + 정기 테스트 + 소프트웨어 가용성 확보

---

### Q164. Select a true statement about Amazon EC2 Security Groups (EC2-Classic).

**Options:**
- A) After you launch an instance in EC2-Classic, you can't change its security groups.
- B) After you launch an instance in EC2-Classic, you can change its security groups only once.
- C) After you launch an instance in EC2-Classic, you can only add rules to a security group.
- D) After you launch an instance in EC2-Classic, you cannot add or remove rules from a security group.

**Answer:** A

**해설:**

> **문제:** Amazon EC2 보안 그룹(EC2-Classic)에 대해 옳은 설명은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | EC2-Classic에서 인스턴스를 시작한 후 보안 그룹을 변경할 수 없습니다. |
| B | EC2-Classic에서 인스턴스를 시작한 후 보안 그룹을 한 번만 변경할 수 있습니다. |
| C | EC2-Classic에서 인스턴스를 시작한 후 보안 그룹에 규칙만 추가할 수 있습니다. |
| D | EC2-Classic에서 인스턴스를 시작한 후 보안 그룹의 규칙을 추가하거나 제거할 수 없습니다. |

**(A) 정답** : EC2-Classic 환경에서는 인스턴스 시작 후 할당된 보안 그룹을 변경할 수 없습니다. VPC 환경과 달리 EC2-Classic은 인스턴스 실행 후 보안 그룹 변경이 불가능합니다.

**(B)** : 한 번도 변경할 수 없습니다.

**(C)** : 보안 그룹의 규칙을 추가/삭제하는 것은 가능하지만, 인스턴스에 연결된 보안 그룹 자체를 변경할 수 없습니다.

**(D)** : 보안 그룹 내 규칙 변경은 가능합니다.

**핵심 개념:** EC2-Classic 보안 그룹 — 인스턴스 시작 후 보안 그룹 변경 불가 (VPC와 다른 점)

---

### Q165. To view information about an Amazon EBS volume, open the Amazon EC2 console at https://console.aws.amazon.com/ec2/, click in the Navigation panel.

**Options:**
- A) EBS.
- B) Describe.
- C) Details.
- D) Volumes.

**Answer:** D

**해설:**

> **문제:** Amazon EBS 볼륨에 대한 정보를 보려면 Amazon EC2 콘솔의 탐색 패널에서 무엇을 클릭해야 합니까?

| 선지 | 번역 |
|------|------|
| A | EBS. |
| B | 설명(Describe). |
| C | 세부 정보(Details). |
| D | 볼륨(Volumes). |

**(A)** : 탐색 패널에 "EBS"라는 항목은 없습니다.

**(B)** : "Describe"는 CLI 명령어이며 콘솔 탐색 항목이 아닙니다.

**(C)** : "Details"는 개별 리소스의 세부 정보 탭이며 탐색 항목이 아닙니다.

**(D) 정답** : EC2 콘솔 좌측 탐색 패널의 "Elastic Block Store" 섹션 아래 "Volumes"를 클릭하여 EBS 볼륨 정보를 확인합니다.

**핵심 개념:** EC2 콘솔 탐색 — Volumes 항목에서 EBS 볼륨 목록 및 정보 확인

---

### Q166. True or False: Provisioned IOPS Costs - you are charged for the IOPS and storage whether or not you use them in a given month.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** Provisioned IOPS 비용 — 해당 월에 사용 여부에 관계없이 IOPS와 스토리지에 대해 요금이 청구됩니까? 참/거짓?

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : Provisioned IOPS는 예약형 리소스이므로 실제 사용량에 관계없이 프로비저닝된 IOPS 수와 스토리지 용량에 대해 요금이 청구됩니다.

**(B)** : 사용량 기반이 아닌 프로비저닝 기반 과금입니다.

**핵심 개념:** Provisioned IOPS 과금 — 사용 여부 관계없이 프로비저닝된 용량에 대해 과금

---

### Q167. You have an EC2 Security Group with several running EC2 instances. You change the Security Group rules to allow inbound traffic on a new port and protocol, and launch several new instances in the same Security Group. The new rules apply:

**Options:**
- A) Immediately to all instances in the security group.
- B) Immediately to the new instances only.
- C) Immediately to the new instances, but old instances must be stopped and restarted before the new rules apply.
- D) To all instances, but it may take several minutes for old instances to see the changes.

**Answer:** A

**해설:**

> **문제:** 보안 그룹 규칙을 변경하고 같은 보안 그룹에 새 인스턴스를 시작했을 때 새 규칙은 어떻게 적용됩니까?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹의 모든 인스턴스에 즉시 적용됩니다. |
| B | 새 인스턴스에만 즉시 적용됩니다. |
| C | 새 인스턴스에는 즉시 적용되지만 기존 인스턴스는 중지 후 재시작이 필요합니다. |
| D | 모든 인스턴스에 적용되지만 기존 인스턴스에는 몇 분이 걸릴 수 있습니다. |

**(A) 정답** : 보안 그룹 규칙 변경은 해당 보안 그룹에 속한 모든 인스턴스(기존 및 신규)에 즉시 적용됩니다. 재시작이나 지연 없이 실시간으로 반영됩니다.

**(B)** : 기존 인스턴스에도 즉시 적용됩니다.

**(C)** : 재시작이 필요하지 않습니다.

**(D)** : 지연 없이 즉시 적용됩니다.

**핵심 개념:** 보안 그룹 규칙 변경 — 그룹 내 모든 인스턴스에 즉시 실시간 적용

---

### Q168. An edge location refers to which Amazon Web Service?

**Options:**
- A) An edge location is referred to the network configured within a Zone or Region.
- B) An edge location is an AWS Region.
- C) An edge location is the location of the data center used for Amazon CloudFront.
- D) An edge location is a Zone within an AWS Region.

**Answer:** C

**해설:**

> **문제:** 엣지 로케이션(Edge Location)은 어떤 Amazon Web Service를 가리킵니까?

| 선지 | 번역 |
|------|------|
| A | 엣지 로케이션은 Zone 또는 Region 내에 구성된 네트워크를 가리킵니다. |
| B | 엣지 로케이션은 AWS 리전입니다. |
| C | 엣지 로케이션은 Amazon CloudFront에 사용되는 데이터 센터의 위치입니다. |
| D | 엣지 로케이션은 AWS 리전 내의 Zone입니다. |

**(A)** : 엣지 로케이션은 Zone/Region 내부가 아닌 독립적인 위치입니다.

**(B)** : 엣지 로케이션은 리전과 다른 개념입니다.

**(C) 정답** : 엣지 로케이션은 Amazon CloudFront CDN이 콘텐츠를 캐시하고 사용자에게 더 가깝게 전달하기 위해 사용하는 데이터 센터 위치입니다. 리전보다 훨씬 많은 수가 전 세계에 분포합니다.

**(D)** : 엣지 로케이션은 AZ와 다른 개념입니다.

**핵심 개념:** CloudFront 엣지 로케이션 — 전 세계 분산 CDN 캐시 포인트

---

### Q169. If I want to run a database in an Amazon instance, which is the most recommended Amazon storage option?

**Options:**
- A) Amazon Instance Storage.
- B) Amazon EBS.
- C) You can't run a database inside an Amazon instance.
- D) Amazon S3.

**Answer:** B

**해설:**

> **문제:** Amazon 인스턴스에서 데이터베이스를 실행하려면 어떤 Amazon 스토리지 옵션이 가장 권장됩니까?

| 선지 | 번역 |
|------|------|
| A | Amazon 인스턴스 스토리지. |
| B | Amazon EBS. |
| C | Amazon 인스턴스 내에서 데이터베이스를 실행할 수 없습니다. |
| D | Amazon S3. |

**(A)** : 인스턴스 스토리지는 휘발성이어서 데이터베이스에 적합하지 않습니다.

**(B) 정답** : Amazon EBS는 영속적인 블록 스토리지로, 데이터베이스 실행에 가장 적합합니다. 높은 IOPS, 낮은 지연 시간, 데이터 영속성을 제공합니다.

**(C)** : EC2 인스턴스에서 데이터베이스를 실행할 수 있습니다.

**(D)** : S3는 객체 스토리지로 데이터베이스 블록 스토리지로 사용할 수 없습니다.

**핵심 개념:** EC2 데이터베이스 스토리지 — Amazon EBS 권장 (영속성, 낮은 지연, 높은 IOPS)

---

### Q170. A customer is leveraging Amazon Simple Storage Service in eu-west-1 to store static content for a web-based property. The customer is storing objects using the Standard Storage class. Where are the customers objects replicated?

**Options:**
- A) A single facility in eu-west-1 and a single facility in eu-central-1.
- B) A single facility in eu-west-1 and a single facility in us-east-1.
- C) Multiple facilities in eu-west-1.
- D) A single facility in eu-west-1.

**Answer:** C

**해설:**

> **문제:** eu-west-1의 Amazon S3 Standard 스토리지 클래스에 저장된 객체는 어디에 복제됩니까?

| 선지 | 번역 |
|------|------|
| A | eu-west-1의 단일 시설과 eu-central-1의 단일 시설. |
| B | eu-west-1의 단일 시설과 us-east-1의 단일 시설. |
| C | eu-west-1의 여러 시설. |
| D | eu-west-1의 단일 시설. |

**(A)** : S3 Standard는 다른 리전으로 자동 복제하지 않습니다.

**(B)** : 리전 간 자동 복제는 S3 Standard에서 기본으로 제공되지 않습니다.

**(C) 정답** : Amazon S3 Standard 스토리지 클래스는 동일 리전(eu-west-1) 내 최소 3개의 가용 영역에 걸쳐 데이터를 복제합니다. 99.999999999%(11 nines)의 내구성을 제공합니다.

**(D)** : 단일 시설에만 저장되지 않으며 리전 내 여러 시설에 복제됩니다.

**핵심 개념:** S3 Standard 데이터 복제 — 동일 리전 내 여러 AZ에 걸쳐 자동 복제 (11 nines 내구성)

---

### Q171. You have set up an S3 bucket with a number of images in it and you have decided that you want anybody to be able to access these images, even anonymous users. To accomplish this you create a bucket policy. You will need to use an Amazon S3 bucket policy that specifies a [...] in the principal element, which means anyone can access the bucket.

**Options:**
- A) hash tag (#).
- B) anonymous user.
- C) wildcard (*).
- D) S3 user.

**Answer:** C

**해설:**

> **문제:** 익명 사용자를 포함한 누구든지 S3 버킷에 접근할 수 있도록 버킷 정책의 Principal 요소에 무엇을 지정해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 해시 태그(#). |
| B | 익명 사용자(anonymous user). |
| C | 와일드카드(*). |
| D | S3 사용자(S3 user). |

**(A)** : 해시 태그(#)는 AWS 정책 구문에서 사용되지 않습니다.

**(B)** : "anonymous user"라는 literal 값은 Principal로 사용하지 않습니다.

**(C) 정답** : S3 버킷 정책에서 Principal을 `"*"`(와일드카드)로 설정하면 인증되지 않은 익명 사용자를 포함한 모든 사람이 접근할 수 있습니다.

**(D)** : "S3 user"라는 개념은 존재하지 않습니다.

**핵심 개념:** S3 버킷 정책 퍼블릭 액세스 — Principal: "*" 로 모든 사용자(익명 포함) 접근 허용

---

### Q172. You try to connect via SSH to a newly created Amazon EC2 instance and get one of the following error messages: 'Network error: Connection timed out' or 'Error connecting to [instance], reason: -> Connection timed out: connect,' You have confirmed that the network and security group rules are configured correctly and the instance is passing status checks. What steps should you take to identify the source of the behavior? (Choose 2 answers)

**Options:**
- A) Verify that the private key file corresponds to the Amazon EC2 key pair assigned at launch.
- B) Verify that your IAM user policy has permission to launch Amazon EC2 instances.
- C) Verify that you are connecting with the appropriate user name for your AMI.
- D) Verify that the Amazon EC2 Instance was launched with the proper IAM role.
- E) Verify that your federation trust to AWS has been established.

**Answer:** A, C

**해설:**

> **문제:** SSH 연결 시 "Connection timed out" 오류가 발생하고 네트워크/보안 그룹은 정상입니다. 원인을 파악하기 위해 어떤 단계를 취해야 합니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 프라이빗 키 파일이 시작 시 할당된 Amazon EC2 키 페어와 일치하는지 확인합니다. |
| B | IAM 사용자 정책에 Amazon EC2 인스턴스 시작 권한이 있는지 확인합니다. |
| C | AMI에 적합한 사용자 이름으로 연결하고 있는지 확인합니다. |
| D | Amazon EC2 인스턴스가 적절한 IAM 역할로 시작되었는지 확인합니다. |
| E | AWS에 대한 페더레이션 신뢰가 설정되어 있는지 확인합니다. |

**(A) 정답** : 잘못된 키 파일을 사용하면 연결이 거부되거나 타임아웃이 발생할 수 있습니다.

**(B)** : IAM 시작 권한은 이미 인스턴스가 실행 중이므로 관련 없습니다.

**(C) 정답** : AMI에 따라 기본 사용자 이름이 다릅니다. Amazon Linux는 `ec2-user`, Ubuntu는 `ubuntu`, CentOS는 `centos` 등입니다. 잘못된 사용자 이름으로 연결하면 실패합니다.

**(D)** : IAM 역할은 SSH 연결과 무관합니다.

**(E)** : 페더레이션 신뢰는 SSH 연결과 무관합니다.

**핵심 개념:** EC2 SSH 연결 문제 해결 — 키 페어 확인 + AMI별 올바른 사용자 이름 확인

---

### Q173. An Auto-Scaling group spans 3 AZs and currently has 4 running EC2 instances. When Auto Scaling needs to terminate an EC2 instance by default, AutoScaling will: (Choose 2 answers)

**Options:**
- A) Allow at least five minutes for Windows/Linux shutdown scripts to complete, before terminating the instance.
- B) Terminate the instance with the least active network connections. If multiple instances meet this criterion, one will be randomly selected.
- C) Send an SNS notification, if configured to do so.
- D) Terminate an instance in the AZ which currently has 2 running EC2 instances.
- E) Randomly select one of the 3 AZs, and then terminate an instance in that AZ.

**Answer:** C, D

**해설:**

> **문제:** Auto Scaling 그룹이 3개의 AZ에 걸쳐 4개의 EC2 인스턴스를 실행 중일 때, Auto Scaling이 인스턴스를 종료할 때 기본적으로 수행하는 작업은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 인스턴스를 종료하기 전에 Windows/Linux 종료 스크립트가 완료될 때까지 최소 5분을 허용합니다. |
| B | 활성 네트워크 연결이 가장 적은 인스턴스를 종료합니다. 여러 인스턴스가 기준을 충족하면 무작위 선택합니다. |
| C | 구성된 경우 SNS 알림을 전송합니다. |
| D | 현재 2개의 EC2 인스턴스를 실행 중인 AZ에서 인스턴스를 종료합니다. |
| E | 3개의 AZ 중 하나를 무작위로 선택한 후 해당 AZ에서 인스턴스를 종료합니다. |

**(A)** : Auto Scaling은 기본적으로 종료 스크립트를 위해 5분을 대기하지 않습니다 (수명 주기 후크로 구성 가능).

**(B)** : 네트워크 연결 수는 기본 종료 정책 기준이 아닙니다.

**(C) 정답** : Auto Scaling은 SNS 알림이 구성된 경우 스케일 인/아웃 이벤트 시 알림을 전송합니다.

**(D) 정답** : Auto Scaling의 기본 정책은 가장 많은 인스턴스가 있는 AZ(여기서는 2개)에서 인스턴스를 종료하여 AZ 간 균형을 맞춥니다.

**(E)** : 무작위 AZ 선택이 아닌 인스턴스가 가장 많은 AZ를 선택합니다.

**핵심 개념:** Auto Scaling 종료 정책 — 가장 인스턴스가 많은 AZ에서 종료 (AZ 균형 유지) + SNS 알림

---

### Q174. A photo-sharing service stores pictures in Amazon Simple Storage Service (S3) and allows application sign-in using an OpenID Connect-compatible identity provider. Which AWS Security Token Service approach to temporary access should you use for the Amazon S3 operations?

**Options:**
- A) SAML-based Identity Federation.
- B) Cross-Account Access.
- C) AWS Identity and Access Management roles.
- D) Web Identity Federation.

**Answer:** D

**해설:**

> **문제:** OpenID Connect 호환 ID 공급자를 사용하는 사진 공유 서비스에서 S3 작업을 위한 임시 액세스에 어떤 STS 접근 방식을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | SAML 기반 ID 페더레이션. |
| B | 교차 계정 액세스. |
| C | AWS IAM 역할. |
| D | 웹 ID 페더레이션(Web Identity Federation). |

**(A)** : SAML은 기업 SSO에 사용되며 OpenID Connect와는 다른 프로토콜입니다.

**(B)** : 교차 계정 액세스는 다른 AWS 계정 간 접근을 위한 방식입니다.

**(C)** : IAM 역할은 웹 ID 페더레이션과 함께 사용되지만 그 자체가 접근 방식은 아닙니다.

**(D) 정답** : Web Identity Federation은 OpenID Connect(Google, Facebook, Amazon 등) 또는 Cognito를 통해 인증된 사용자에게 임시 AWS 자격 증명을 발급하는 방식입니다.

**핵심 개념:** Web Identity Federation — OpenID Connect/OAuth 2.0 기반 외부 ID로 AWS 임시 자격 증명 획득

---

### Q175. What is the maximum key length of a tag?

**Options:**
- A) 512 Unicode characters.
- B) 64 Unicode characters.
- C) 256 Unicode characters.
- D) 128 Unicode characters.

**Answer:** D

**해설:**

> **문제:** 태그의 최대 키 길이는 얼마입니까?

| 선지 | 번역 |
|------|------|
| A | 512 유니코드 문자. |
| B | 64 유니코드 문자. |
| C | 256 유니코드 문자. |
| D | 128 유니코드 문자. |

**(A)** : 512자는 태그 키의 최대 길이가 아닙니다.

**(B)** : 64자는 너무 짧습니다.

**(C)** : 256자는 태그 값(Value)의 최대 길이입니다.

**(D) 정답** : AWS 태그 키의 최대 길이는 128 유니코드 문자이며, 태그 값의 최대 길이는 256 유니코드 문자입니다.

**핵심 개념:** AWS 태그 제한 — 키 최대 128자, 값 최대 256자

---

### Q176. Does Amazon RDS allow direct host access via Telnet, Secure Shell (SSH), or Windows Remote Desktop Connection?

**Options:**
- A) Yes.
- B) No.

**Answer:** B

**해설:**

> **문제:** Amazon RDS는 Telnet, SSH 또는 Windows 원격 데스크톱 연결을 통한 직접 호스트 액세스를 허용합니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니요. |

**(A)** : RDS는 관리형 서비스이므로 기본 OS에 직접 접근을 허용하지 않습니다.

**(B) 정답** : Amazon RDS는 완전 관리형 서비스로, 기저 OS(호스트)에 대한 Telnet, SSH, RDP 직접 접근을 허용하지 않습니다. DB 엔드포인트로의 데이터베이스 연결만 가능합니다.

**핵심 개념:** Amazon RDS 관리형 서비스 — 기저 OS에 대한 직접 접근 불가 (SSH/RDP/Telnet)

---

### Q177. A user wants to achieve High Availability with PostgreSQL DB. Which of the below mentioned functionalities helps achieve HA?

**Options:**
- A) Multi-AZ.
- B) Read Replica.
- C) Multi region.
- D) PostgreSQL does not support HA.

**Answer:** A

**해설:**

> **문제:** PostgreSQL DB에서 고가용성(HA)을 달성하려면 어떤 기능을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Multi-AZ. |
- B | 읽기 전용 복제본(Read Replica). |
| C | 멀티 리전(Multi region). |
| D | PostgreSQL은 HA를 지원하지 않습니다. |

**(A) 정답** : RDS Multi-AZ 배포는 동기 복제와 자동 장애 조치를 통해 고가용성을 제공합니다. 기본 인스턴스 장애 시 자동으로 대기 인스턴스로 전환됩니다.

**(B)** : Read Replica는 읽기 성능 확장용이며 자동 장애 조치를 제공하지 않습니다.

**(C)** : 멀티 리전은 재해 복구(DR) 목적이며 기본 HA 기능이 아닙니다.

**(D)** : PostgreSQL은 RDS에서 Multi-AZ HA를 지원합니다.

**핵심 개념:** RDS 고가용성 — Multi-AZ 배포로 자동 장애 조치(failover) 제공

---

### Q178. Are penetration tests allowed as long as they are limited to the customer's instances?

**Options:**
- A) Yes, they are allowed but only for selected regions.
- B) No, they are never allowed.
- C) Yes, they are allowed without any permission.
- D) Yes, they are allowed but only with approval.

**Answer:** D

**해설:**

> **문제:** 고객 인스턴스로 제한된 경우 침투 테스트(Penetration Test)가 허용됩니까?

| 선지 | 번역 |
|------|------|
| A | 예, 허용되지만 선택된 리전에서만 가능합니다. |
| B | 아니요, 절대 허용되지 않습니다. |
| C | 예, 별도 권한 없이 허용됩니다. |
| D | 예, 허용되지만 승인이 필요합니다. |

**(A)** : 리전 제한은 없습니다.

**(B)** : 현재 AWS는 일부 서비스에 대한 침투 테스트를 허용합니다.

**(C)** : 과거에는 AWS 승인이 필요했으나, 현재는 AWS의 허용된 서비스 목록 내에서 사전 승인 없이 가능하지만 정책을 준수해야 합니다.

**(D) 정답** : 시험 기준으로 AWS에서의 침투 테스트는 사전 승인이 필요합니다. 현재 정책은 변경되었지만 SAA-C03 시험에서는 이 답이 정답으로 간주됩니다.

**핵심 개념:** AWS 침투 테스트 정책 — 허용되나 AWS 승인 필요 (시험 기준)

---

### Q179. You are building a system to distribute confidential documents to employees. Using CloudFront, what method could be used to serve content that is stored in S3, but not publicly accessible from S3 directly?

**Options:**
- A) Add the CloudFront account security group 'amazon-cf/amazon-cf-sg' to the appropriate S3 bucket policy.
- B) Create a S3 bucket policy that lists the CloudFront distribution ID as the Principal and the target bucket as the Amazon Resource Name (ARN).
- C) Create an Identity and Access Management (IAM) User for CloudFront and grant access to the objects in your S3 bucket to that IAM User.
- D) Create an Origin Access Identity (OAI) for CloudFront and grant access to the objects in your S3 bucket to that OAI.

**Answer:** D

**해설:**

> **문제:** CloudFront를 사용하여 S3에 저장된 콘텐츠를 S3에서 직접 공개 접근하지 않고 제공하는 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | CloudFront 계정 보안 그룹 'amazon-cf/amazon-cf-sg'를 S3 버킷 정책에 추가합니다. |
| B | CloudFront 배포 ID를 Principal로 지정하는 S3 버킷 정책을 생성합니다. |
| C | CloudFront용 IAM 사용자를 생성하고 S3 버킷 객체에 대한 액세스 권한을 부여합니다. |
| D | CloudFront를 위한 OAI(Origin Access Identity)를 생성하고 S3 버킷 객체에 대한 액세스 권한을 부여합니다. |

**(A)** : CloudFront 계정 보안 그룹을 통한 S3 접근 제어 방식은 존재하지 않습니다.

**(B)** : CloudFront 배포 ID로 Principal을 지정하는 방식은 올바르지 않습니다. OAI 또는 OAC(Origin Access Control)를 사용합니다.

**(C)** : CloudFront용 IAM 사용자는 실용적이지 않으며 권장되지 않습니다.

**(D) 정답** : OAI(Origin Access Identity)를 생성하고 S3 버킷 정책에서 해당 OAI에만 접근을 허용하면, CloudFront를 통해서만 콘텐츠에 접근할 수 있고 S3 직접 접근은 차단됩니다.

**핵심 개념:** CloudFront OAI — S3 콘텐츠를 CloudFront를 통해서만 접근하도록 제한하는 메커니즘

---

### Q180. You require the ability to analyze a large amount of data, which is stored on Amazon S3 using Amazon Elastic MapReduce. You are using the cc2 8xlarge Instance type, whose CPUs are mostly idle during processing. Which of the below would be the most cost efficient way to reduce the runtime of the job?

**Options:**
- A) Create more smaller files on Amazon S3.
- B) Add additional cc2 8xlarge instances by introducing a task group.
- C) Use smaller instances that have higher aggregate I/O performance.
- D) Create fewer, larger files on Amazon S3.

**Answer:** C

**해설:**

> **문제:** Amazon S3의 대용량 데이터를 EMR로 분석 중입니다. cc2 8xlarge 인스턴스의 CPU가 대부분 유휴 상태입니다. 런타임을 줄이는 가장 비용 효율적인 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Amazon S3에 더 작은 파일을 더 많이 생성합니다. |
| B | 태스크 그룹을 도입하여 cc2 8xlarge 인스턴스를 추가합니다. |
| C | 집계 I/O 성능이 더 높은 소형 인스턴스를 사용합니다. |
| D | Amazon S3에 더 크고 수가 적은 파일을 생성합니다. |

**(A)** : 더 작은 파일이 항상 EMR 성능 향상으로 이어지지는 않습니다.

**(B)** : 동일한 대형 인스턴스를 추가하면 CPU 유휴 문제가 해결되지 않고 비용만 증가합니다.

**(C) 정답** : CPU가 아닌 I/O가 병목일 때는 I/O 성능이 높은 소형 인스턴스를 더 많이 사용하는 것이 비용 효율적입니다. 동일한 비용으로 더 높은 집계 I/O 처리량을 얻을 수 있습니다.

**(D)** : 큰 파일은 EMR HDFS 블록 처리에 영향을 미치지만 I/O 병목의 직접적인 해결책은 아닙니다.

**핵심 개념:** EMR 성능 최적화 — CPU 유휴 시 I/O가 병목, I/O 최적화 인스턴스로 비용 효율화

---

### Q181. What is the name of licensing model in which I can use your existing Oracle Database licenses to run Oracle deployments on Amazon RDS?

**Options:**
- A) Bring Your Own License.
- B) Role Based License.
- C) Enterprise License.
- D) License Included.

**Answer:** A

**해설:**

> **문제:** 기존 Oracle 데이터베이스 라이선스를 Amazon RDS에서 Oracle 배포를 실행하는 데 사용할 수 있는 라이선스 모델 이름은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | BYOL(Bring Your Own License). |
| B | 역할 기반 라이선스(Role Based License). |
| C | 엔터프라이즈 라이선스(Enterprise License). |
| D | 라이선스 포함(License Included). |

**(A) 정답** : BYOL(Bring Your Own License) 모델은 기존에 보유한 Oracle 라이선스를 RDS에 적용하여 별도 라이선스 비용 없이 사용하는 방식입니다.

**(B)** : 역할 기반 라이선스는 존재하지 않는 개념입니다.

**(C)** : 엔터프라이즈 라이선스는 Oracle의 라이선스 에디션이지 AWS 라이선스 모델이 아닙니다.

**(D)** : License Included는 AWS가 라이선스를 포함하여 제공하는 반대 모델입니다.

**핵심 개념:** RDS 라이선스 모델 — BYOL(자체 라이선스 사용) vs License Included(AWS 포함 라이선스)

---

### Q182. Which of the following statements are true about Amazon Route 53 resource records? (Choose 2 answers)

**Options:**
- A) An Alias record can map one DNS name to another Amazon Route 53 DNS name.
- B) A CNAME record can be created for your zone apex.
- C) An Amazon Route 53 CNAME record can point to any DNS record hosted anywhere.
- D) TTL can be set for an Alias record in Amazon Route 53.
- E) An Amazon Route 53 Alias record can point to any DNS record hosted anywhere.

**Answer:** A, C

**해설:**

> **문제:** Amazon Route 53 리소스 레코드에 대해 옳은 설명은 무엇입니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | Alias 레코드는 하나의 DNS 이름을 다른 Amazon Route 53 DNS 이름에 매핑할 수 있습니다. |
| B | CNAME 레코드는 Zone Apex(루트 도메인)에 대해 생성할 수 있습니다. |
| C | Amazon Route 53 CNAME 레코드는 어디에나 호스팅된 모든 DNS 레코드를 가리킬 수 있습니다. |
| D | Amazon Route 53에서 Alias 레코드에 TTL을 설정할 수 있습니다. |
| E | Amazon Route 53 Alias 레코드는 어디에나 호스팅된 모든 DNS 레코드를 가리킬 수 있습니다. |

**(A) 정답** : Route 53 Alias 레코드는 CloudFront 배포, ELB, S3 버킷, 같은 호스팅 영역의 다른 Route 53 레코드를 가리킬 수 있습니다.

**(B)** : Zone Apex(루트 도메인, 예: example.com)에는 CNAME을 사용할 수 없습니다. Alias 레코드만 사용 가능합니다.

**(C) 정답** : CNAME 레코드는 어느 DNS 서버에 호스팅된 레코드든 가리킬 수 있습니다.

**(D)** : Route 53 Alias 레코드에는 TTL을 직접 설정할 수 없습니다. Route 53이 자동으로 관리합니다.

**(E)** : Alias 레코드는 AWS 리소스(ELB, CloudFront, S3 등)만 가리킬 수 있으며 외부 DNS 레코드는 가리킬 수 없습니다.

**핵심 개념:** Route 53 Alias vs CNAME — Alias는 AWS 리소스 전용, CNAME은 어느 DNS든 가능 (단 Zone Apex에는 사용 불가)

---

### Q183. Do you need to shutdown your EC2 instance when you create a snapshot of EBS volumes that serve as root devices?

**Options:**
- A) No, you only need to shutdown an instance before deleting it.
- B) Yes.
- C) No, the snapshot would turn off your instance automatically.
- D) No.

**Answer:** B

**해설:**

> **문제:** 루트 디바이스 역할을 하는 EBS 볼륨의 스냅샷을 생성할 때 EC2 인스턴스를 종료해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 아니요, 인스턴스를 삭제하기 전에만 종료하면 됩니다. |
| B | 예. |
| C | 아니요, 스냅샷이 인스턴스를 자동으로 종료합니다. |
| D | 아니요. |

**(A)** : 스냅샷 생성을 위해 종료가 권장됩니다.

**(B) 정답** : 루트 디바이스(부팅 볼륨)의 스냅샷을 생성하기 전에 인스턴스를 종료(stop)하는 것이 권장됩니다. 실행 중에도 가능하지만 데이터 일관성을 위해 종료 후 스냅샷 생성이 권장됩니다.

**(C)** : 스냅샷이 인스턴스를 자동으로 종료하지 않습니다.

**(D)** : 기술적으로 실행 중에도 가능하지만 일관성을 위해 종료가 권장됩니다.

**핵심 개념:** EBS 루트 볼륨 스냅샷 — 데이터 일관성을 위해 인스턴스 종료(stop) 후 스냅샷 권장

---

### Q184. Can I initiate a 'forced failover' for my Oracle Multi-AZ DB Instance deployment?

**Options:**
- A) Yes.
- B) Only in certain regions.
- C) Only in VPC.
- D) No.

**Answer:** A

**해설:**

> **문제:** Oracle Multi-AZ DB 인스턴스 배포에 대해 '강제 장애 조치(forced failover)'를 시작할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 특정 리전에서만 가능합니다. |
| C | VPC에서만 가능합니다. |
| D | 아니요. |

**(A) 정답** : Amazon RDS Multi-AZ 배포에서 DB 인스턴스를 재부팅하면서 강제 장애 조치를 시작할 수 있습니다. 이는 Oracle을 포함한 모든 Multi-AZ 지원 DB 엔진에서 가능합니다.

**(B)** : 리전 제한 없이 모든 리전에서 가능합니다.

**(C)** : VPC 제한 없이 가능합니다.

**(D)** : 강제 장애 조치가 가능합니다.

**핵심 개념:** RDS Multi-AZ 강제 장애 조치 — DB 인스턴스 재부팅으로 수동 failover 가능

---

### Q185. Amazon RDS provides high availability and failover support for DB instances using [...].

**Options:**
- A) customized deployments.
- B) AppStream customizations.
- C) log events.
- D) Multi-AZ deployments.

**Answer:** D

**해설:**

> **문제:** Amazon RDS는 무엇을 사용하여 DB 인스턴스에 대한 고가용성 및 장애 조치 지원을 제공합니까?

| 선지 | 번역 |
|------|------|
| A | 사용자 정의 배포. |
| B | AppStream 사용자 정의. |
| C | 로그 이벤트. |
| D | Multi-AZ 배포. |

**(A)** : 사용자 정의 배포는 RDS HA의 핵심 메커니즘이 아닙니다.

**(B)** : AppStream은 별도의 AWS 서비스로 RDS와 무관합니다.

**(C)** : 로그 이벤트는 모니터링 도구이며 HA를 제공하지 않습니다.

**(D) 정답** : Amazon RDS Multi-AZ 배포는 동기 복제와 자동 장애 조치를 통해 고가용성과 failover 지원을 제공합니다.

**핵심 개념:** RDS 고가용성 메커니즘 — Multi-AZ 배포 (동기 복제 + 자동 장애 조치)

---

### Q186. True or False: Amazon EC2 has no Amazon Resource Names (ARNs) because you can't specify a particular Amazon EC2 resource in an IAM policy.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** Amazon EC2에는 IAM 정책에서 특정 Amazon EC2 리소스를 지정할 수 없기 때문에 Amazon Resource Names(ARN)이 없습니다. 참/거짓?

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : 이 문제는 오래된 AWS 문서에 기반한 내용입니다. 시험 기준으로 일부 EC2 리소스는 ARN 지원이 제한적이었으나, 현재 AWS에서는 EC2 인스턴스 등 다양한 리소스에 ARN을 지원합니다. 시험 컨텍스트에서 이 답이 정답으로 채점됩니다.

**(B)** : 실제로는 EC2도 ARN을 지원하지만 시험 기준에서는 A가 정답입니다.

**핵심 개념:** EC2 ARN — 시험 기준으로 일부 EC2 리소스의 ARN 지원이 제한적이었으나 현재는 지원됨

---

### Q187. A major client who has been spending a lot of money on his internet service provider asks you to set up an AWS Direct Connect to try and save him some money. You know he needs high-speed connectivity. Which connection port speeds are available on AWS Direct Connect?

**Options:**
- A) 500Mbps and 1Gbps.
- B) 1Gbps and 10Gbps.
- C) 100Mbps and 1Gbps.
- D) 1Gbps.

**Answer:** B

**해설:**

> **문제:** 고속 연결이 필요한 고객을 위해 AWS Direct Connect를 설정하려 합니다. AWS Direct Connect에서 사용 가능한 연결 포트 속도는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 500Mbps 및 1Gbps. |
| B | 1Gbps 및 10Gbps. |
| C | 100Mbps 및 1Gbps. |
| D | 1Gbps. |

**(A)** : 500Mbps는 Direct Connect 포트 속도로 제공되지 않습니다.

**(B) 정답** : AWS Direct Connect는 1Gbps 및 10Gbps 포트 속도를 제공합니다. 100Mbps 및 500Mbps는 호스티드 커넥션(Hosted Connection)을 통해 파트너에게서 제공될 수 있습니다.

**(C)** : 100Mbps는 직접 포트 속도가 아닙니다.

**(D)** : 10Gbps도 제공되므로 1Gbps만이 아닙니다.

**핵심 개념:** AWS Direct Connect 포트 속도 — 1Gbps 및 10Gbps (전용 연결 기준)

---

### Q188. What will be the state of the alarm at the end of 90 minutes, if the CPU utilization is constant at 80%?

**Options:**
- A) ALERT.
- B) ALARM.
- C) OK.
- D) INSUFFICIENT_DATA.

**Answer:** B

**해설:**

> **문제:** CPU 사용률이 80%로 일정할 때 90분 후 알람의 상태는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | ALERT. |
| B | ALARM. |
| C | OK. |
| D | INSUFFICIENT_DATA. |

**(A)** : "ALERT"는 CloudWatch 알람 상태가 아닙니다.

**(B) 정답** : CloudWatch 알람의 상태는 OK, ALARM, INSUFFICIENT_DATA 세 가지입니다. CPU 사용률이 설정된 임계값(예: 70%)을 초과하여 90분 동안 지속되면 ALARM 상태가 됩니다.

**(C)** : OK 상태는 메트릭이 임계값 이하일 때입니다.

**(D)** : INSUFFICIENT_DATA는 데이터가 부족할 때이며 90분 동안 80% 유지라면 데이터가 충분합니다.

**핵심 개념:** CloudWatch 알람 상태 — OK / ALARM / INSUFFICIENT_DATA

---

### Q189. A 3-tier e-commerce web application is currently deployed on-premises and will be migrated to AWS for greater scalability and elasticity. The web server currently shares read-only data using a network distributed file system. The app server tier uses a clustering mechanism for discovery and shared session state that depends on IP multicast. The database tier uses shared-storage clustering to provide database failover capability, and uses several read slaves for scaling. Data on all servers and the distributed file system directory is backed up weekly to off-site tapes. Which AWS storage and database architecture meets the requirements of the application?

**Options:**
- A) Web servers: store read-only data in S3, and copy from S3 to root volume at boot time. App servers: share state using a combination of DynamoDB and IP unicast. Database: use RDS with multi-AZ deployment and one or more read replicas. Backup: web servers, app servers, and database backed up weekly to Glacier using snapshots.
- B) Web servers: store read-only data in an EC2 NFS server, mount to each web server at boot time. App servers: share state using a combination of DynamoDB and IP multicast. Database: use RDS with multi-AZ deployment and one or more Read Replicas. Backup: web and app servers backed up weekly via AMIs, database backed up via DB snapshots.
- C) Web servers: store read-only data in S3, and copy from S3 to root volume at boot time. App servers: share state using a combination of DynamoDB and IP unicast. Database: use RDS with multi-AZ deployment and one or more Read Replicas. Backup: web and app servers backed up weekly via AMIs, database backed up via DB snapshots.
- D) Web servers: store read-only data in S3, and copy from S3 to root volume at boot time. App servers: share state using a combination of DynamoDB and IP unicast. Database: use RDS with multi-AZ deployment. Backup: web and app servers backed up weekly via AMIs, database backed up via DB snapshots.

**Answer:** C

**해설:**

> **문제:** 3계층 e-커머스 웹 애플리케이션을 AWS로 마이그레이션할 때 적합한 스토리지 및 데이터베이스 아키텍처는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 웹: S3, 앱: DynamoDB+IP unicast, DB: Multi-AZ RDS+읽기 복제본, 백업: Glacier |
| B | 웹: NFS, 앱: DynamoDB+IP multicast, DB: Multi-AZ RDS+읽기 복제본, 백업: AMI+스냅샷 |
| C | 웹: S3, 앱: DynamoDB+IP unicast, DB: Multi-AZ RDS+읽기 복제본, 백업: AMI+스냅샷 |
| D | 웹: S3, 앱: DynamoDB+IP unicast, DB: Multi-AZ RDS(복제본 없음), 백업: AMI+스냅샷 |

**(A)** : Glacier는 주간 백업보다 접근 속도가 느려 복구에 적합하지 않습니다.

**(B)** : IP multicast는 AWS VPC에서 지원되지 않습니다.

**(C) 정답** : S3로 읽기 전용 데이터 공유, DynamoDB+IP unicast로 세션 상태 관리(IP multicast 대체), Multi-AZ RDS+읽기 복제본으로 확장성 제공, AMI/스냅샷으로 백업하는 완전한 솔루션입니다.

**(D)** : 읽기 복제본이 없어 읽기 확장성 요건을 충족하지 못합니다.

**핵심 개념:** AWS 마이그레이션 아키텍처 — IP multicast 미지원으로 unicast+DynamoDB 대체, S3 정적 데이터, RDS Multi-AZ+읽기 복제본

---

### Q190. What are the four levels of AWS Premium Support?

**Options:**
- A) Basic, Developer, Business, Enterprise.
- B) Basic, Startup, Business, Enterprise.
- C) Free, Bronze, Silver, Gold.
- D) All support is free.

**Answer:** A

**해설:**

> **문제:** AWS Premium 지원의 네 가지 수준은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Basic, Developer, Business, Enterprise. |
| B | Basic, Startup, Business, Enterprise. |
| C | Free, Bronze, Silver, Gold. |
| D | 모든 지원은 무료입니다. |

**(A) 정답** : AWS 지원 플랜은 Basic, Developer, Business, Enterprise On-Ramp, Enterprise 다섯 가지이지만, 시험 기준으로 네 가지는 Basic, Developer, Business, Enterprise입니다.

**(B)** : "Startup"은 AWS 지원 플랜 이름이 아닙니다.

**(C)** : Bronze, Silver, Gold는 AWS 지원 플랜 이름이 아닙니다.

**(D)** : Basic을 제외한 나머지 플랜은 유료입니다.

**핵심 개념:** AWS 지원 플랜 — Basic(무료), Developer, Business, Enterprise(유료)

---

### Q191. What is the default maximum number of Access Keys per user?

**Options:**
- A) 10.
- B) 15.
- C) 2.
- D) 20.

**Answer:** C

**해설:**

> **문제:** 사용자당 기본 최대 액세스 키 수는 얼마입니까?

| 선지 | 번역 |
|------|------|
| A | 10개. |
| B | 15개. |
| C | 2개. |
| D | 20개. |

**(A)** : 10개는 액세스 키 한도가 아닙니다.

**(B)** : 15개는 액세스 키 한도가 아닙니다.

**(C) 정답** : IAM 사용자당 최대 2개의 액세스 키를 생성할 수 있습니다. 이를 통해 키 교체(rotation) 시 중단 없이 새 키를 생성하고 이전 키를 삭제할 수 있습니다.

**(D)** : 20개는 액세스 키 한도가 아닙니다.

**핵심 개념:** IAM 액세스 키 한도 — 사용자당 최대 2개 (키 교체를 위한 최소 요건)

---

### Q192. In the most recent company meeting, your CEO focused on the fact that everyone in the organization needs to make sure that all of the infrastructure that is built is truly scalable. Which of the following statements is incorrect in reference to scalable architecture?

**Options:**
- A) A scalable service is capable of handling heterogeneity.
- B) A scalable service is resilient.
- C) A scalable architecture won't be cost effective as it grows.
- D) Increasing resources results in a proportional increase in performance.

**Answer:** C

**해설:**

> **문제:** 확장 가능한 아키텍처에 대해 틀린 설명은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 확장 가능한 서비스는 이질성(다양한 환경)을 처리할 수 있습니다. |
| B | 확장 가능한 서비스는 회복력이 있습니다. |
| C | 확장 가능한 아키텍처는 성장할수록 비용 효율적이지 않습니다. |
| D | 리소스 증가는 성능의 비례적 증가를 가져옵니다. |

**(A)** : 확장 가능한 서비스는 다양한 환경과 요구 사항을 처리할 수 있습니다. 옳은 설명입니다.

**(B)** : 확장 가능한 서비스는 장애에서 회복하는 능력이 있습니다. 옳은 설명입니다.

**(C) 정답** : 틀린 설명입니다. 확장 가능한 아키텍처는 성장할수록 더 비용 효율적입니다. 클라우드의 규모의 경제(Economies of Scale)가 작동하여 비용이 절감됩니다.

**(D)** : 진정한 확장성은 리소스 증가에 비례하여 성능이 향상되는 것을 의미합니다. 옳은 설명입니다.

**핵심 개념:** 확장 가능한 아키텍처 특성 — 규모 성장 시 비용 효율성 향상 (틀린 설명 식별)

---

### Q193. What does Amazon S3 stand for?

**Options:**
- A) Simple Storage Solution.
- B) Storage Storage Storage (triple redundancy Storage).
- C) Storage Server Solution.
- D) Simple Storage Service.

**Answer:** D

**해설:**

> **문제:** Amazon S3는 무엇의 약자입니까?

| 선지 | 번역 |
|------|------|
| A | Simple Storage Solution. |
| B | Storage Storage Storage (3중 중복 스토리지). |
| C | Storage Server Solution. |
| D | Simple Storage Service. |

**(A)** : Solution이 아닌 Service입니다.

**(B)** : 재미있는 설명이지만 정확하지 않습니다.

**(C)** : Storage Server Solution은 S3의 약자가 아닙니다.

**(D) 정답** : Amazon S3는 Simple Storage Service의 약자입니다. S가 3개여서 S3라고 불립니다.

**핵심 개념:** Amazon S3 — Simple Storage Service (단순 스토리지 서비스)

---

### Q194. A company needs to monitor the read and write IOPs metrics for their AWS MySQL RDS instance and send real-time alerts to their operations team. Which AWS services can accomplish this? (Choose 2 answers)

**Options:**
- A) Amazon Simple Email Service.
- B) Amazon CloudWatch.
- C) Amazon Simple Queue Service.
- D) Amazon Route 53.
- E) Amazon Simple Notification Service.

**Answer:** B, E

**해설:**

> **문제:** AWS MySQL RDS 인스턴스의 읽기/쓰기 IOPS 메트릭을 모니터링하고 운영팀에 실시간 알림을 전송해야 합니다. 어떤 AWS 서비스가 이를 달성할 수 있습니까? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | Amazon Simple Email Service. |
| B | Amazon CloudWatch. |
| C | Amazon Simple Queue Service. |
| D | Amazon Route 53. |
| E | Amazon Simple Notification Service. |

**(A)** : SES는 이메일 전송 서비스로 모니터링 기능이 없습니다.

**(B) 정답** : Amazon CloudWatch는 RDS의 ReadIOPS 및 WriteIOPS 메트릭을 수집하고 알람을 설정할 수 있습니다.

**(C)** : SQS는 메시지 큐 서비스로 직접적인 모니터링 알림 기능이 없습니다.

**(D)** : Route 53은 DNS 서비스로 RDS 모니터링과 관련 없습니다.

**(E) 정답** : Amazon SNS는 CloudWatch 알람과 통합하여 이메일, SMS, HTTP 등으로 실시간 알림을 운영팀에 전송합니다.

**핵심 개념:** RDS 모니터링 알림 — CloudWatch(메트릭 수집+알람) + SNS(알림 전송)

---

### Q195. A user has configured ELB with two EBS backed EC2 instances. The user is trying to understand the DNS access and IP support for ELB. Which of the below mentioned statements may not help the user understand the IP mechanism supported by ELB?

**Options:**
- A) The client can connect over IPv4 or IPv6 using Dualstack.
- B) Communication between the load balancer and back-end instances is always through IPv4.
- C) ELB DNS supports both IPv4 and IPv6.
- D) The ELB supports either IPv4 or IPv6 but not both.

**Answer:** D

**해설:**

> **문제:** ELB의 IP 메커니즘을 이해하는 데 도움이 되지 않는 설명은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 클라이언트는 Dualstack을 사용하여 IPv4 또는 IPv6로 연결할 수 있습니다. |
| B | 로드 밸런서와 백엔드 인스턴스 간 통신은 항상 IPv4를 통해 이루어집니다. |
| C | ELB DNS는 IPv4와 IPv6을 모두 지원합니다. |
| D | ELB는 IPv4 또는 IPv6 중 하나만 지원하며 둘 다는 아닙니다. |

**(A)** : ELB는 Dualstack DNS 이름으로 IPv4와 IPv6을 모두 지원합니다. 사실입니다.

**(B)** : ELB와 백엔드 EC2 인스턴스 간 통신은 IPv4를 통해 이루어집니다. 사실입니다.

**(C)** : ELB의 Dualstack DNS는 IPv4와 IPv6 모두 지원합니다. 사실입니다.

**(D) 정답** : ELB는 IPv4만 지원하는 것이 아니라 Dualstack을 통해 IPv4와 IPv6 모두 지원합니다. 따라서 "둘 중 하나만 지원"이라는 이 설명은 사실이 아니며 ELB IP 메커니즘 이해에 도움이 되지 않습니다.

**핵심 개념:** ELB IP 지원 — Dualstack을 통해 IPv4와 IPv6 모두 지원, 백엔드 통신은 IPv4

---

### Q196. What is Oracle SQL Developer?

**Options:**
- A) An AWS developer who is an expert in Amazon RDS using both the Oracle and SQL Server DB engines.
- B) A graphical Java tool distributed without cost by Oracle.
- C) It is a variant of the SQL Server Management Studio designed by Microsoft to support Oracle DBMS functionalities.
- D) A different DBMS released by Microsoft free of cost.

**Answer:** B

**해설:**

> **문제:** Oracle SQL Developer란 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | Oracle 및 SQL Server DB 엔진을 사용한 Amazon RDS 전문 AWS 개발자. |
| B | Oracle이 무료로 배포하는 그래픽 Java 도구. |
| C | Oracle DBMS 기능을 지원하기 위해 Microsoft가 설계한 SQL Server Management Studio의 변형. |
| D | Microsoft가 무료로 출시한 다른 DBMS. |

**(A)** : AWS 직원 직책이 아닙니다.

**(B) 정답** : Oracle SQL Developer는 Oracle Corporation이 무료로 제공하는 그래픽 사용자 인터페이스(GUI) 기반의 Java 데이터베이스 개발 도구입니다. Oracle DB 및 Amazon RDS Oracle 인스턴스에 연결하여 사용할 수 있습니다.

**(C)** : Microsoft가 아닌 Oracle이 개발한 도구입니다.

**(D)** : DBMS가 아닌 DB 관리 도구입니다.

**핵심 개념:** Oracle SQL Developer — Oracle이 무료 제공하는 Java 기반 GUI DB 개발 도구

---

### Q197. You can use [...] to help secure the instances in your VPC.

**Options:**
- A) security groups and multi-factor authentication.
- B) security groups and 2-Factor authentication.
- C) security groups and biometric authentication.
- D) security groups and network ACLs.

**Answer:** D

**해설:**

> **문제:** VPC의 인스턴스 보안을 위해 [...](을)를 사용할 수 있습니다.

| 선지 | 번역 |
|------|------|
| A | 보안 그룹과 다중 인증(MFA). |
| B | 보안 그룹과 2단계 인증. |
| C | 보안 그룹과 생체 인증. |
| D | 보안 그룹과 네트워크 ACL. |

**(A)** : MFA는 사용자 인증 보안에 관한 것이며 인스턴스 네트워크 트래픽 보안이 아닙니다.

**(B)** : 2단계 인증은 MFA와 동일하게 사용자 인증 관련입니다.

**(C)** : 생체 인증은 VPC 인스턴스 보안 메커니즘이 아닙니다.

**(D) 정답** : VPC에서는 보안 그룹(인스턴스 수준, stateful)과 네트워크 ACL(서브넷 수준, stateless)을 함께 사용하여 심층 방어(Defense in Depth)를 구현합니다.

**핵심 개념:** VPC 네트워크 보안 — 보안 그룹(인스턴스 레벨) + 네트워크 ACL(서브넷 레벨) 이중 보안

---

### Q198. What is the type of monitoring data (for Amazon EBS volumes) which is available automatically in 5-minute periods at no charge called?

**Options:**
- A) Basic.
- B) Primary.
- C) Detailed.
- D) Local.

**Answer:** A

**해설:**

> **문제:** Amazon EBS 볼륨에 대해 5분 주기로 자동으로 무료 제공되는 모니터링 데이터 유형의 이름은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 기본(Basic). |
| B | 기본(Primary). |
| C | 상세(Detailed). |
| D | 로컬(Local). |

**(A) 정답** : Amazon EBS의 기본(Basic) 모니터링은 5분 간격으로 CloudWatch에 메트릭을 전송하며 무료입니다.

**(B)** : "Primary" 모니터링은 CloudWatch 모니터링 유형에 존재하지 않습니다.

**(C)** : 상세(Detailed) 모니터링은 Provisioned IOPS 볼륨에서 1분 간격으로 제공됩니다.

**(D)** : "Local" 모니터링은 CloudWatch 유형에 존재하지 않습니다.

**핵심 개념:** EBS 모니터링 — Basic(5분 무료) vs Detailed(1분, Provisioned IOPS 자동)

---

### Q199. A user comes to you and wants access to Amazon CloudWatch but only wants to monitor a specific LoadBalancer. Is it possible to give him access to a specific set of instances or a specific LoadBalancer?

**Options:**
- A) No because you can't use IAM to control access to CloudWatch data for specific resources.
- B) Yes. You can use IAM to control access to CloudWatch data for specific resources.
- C) No because you need to be Sysadmin to access CloudWatch data.
- D) Yes. Any user can see all CloudWatch data and needs no access rights.

**Answer:** A

**해설:**

> **문제:** 특정 로드 밸런서만 모니터링하도록 Amazon CloudWatch에 대한 액세스를 제한할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 아니요, IAM을 사용하여 특정 리소스에 대한 CloudWatch 데이터 액세스를 제어할 수 없습니다. |
| B | 예. IAM을 사용하여 특정 리소스에 대한 CloudWatch 데이터 액세스를 제어할 수 있습니다. |
| C | 아니요, CloudWatch 데이터에 액세스하려면 Sysadmin이어야 합니다. |
| D | 예. 모든 사용자가 모든 CloudWatch 데이터를 볼 수 있으며 액세스 권한이 필요하지 않습니다. |

**(A) 정답** : Amazon CloudWatch는 리소스 수준의 IAM 권한 제어를 지원하지 않습니다. CloudWatch에 대한 IAM 정책은 CloudWatch API 작업(예: PutMetricData, GetMetricData) 수준에서만 제어되며, 특정 ELB나 인스턴스의 데이터만 보는 것을 IAM으로 제한할 수 없습니다.

**(B)** : 특정 리소스 수준의 CloudWatch 데이터 접근 제한은 불가능합니다.

**(C)** : Sysadmin만이 접근할 수 있는 것은 아닙니다.

**(D)** : 액세스 권한은 필요하지만 리소스 수준 제한이 불가능합니다.

**핵심 개념:** CloudWatch IAM 제한 — 특정 리소스의 CloudWatch 메트릭만 볼 수 있도록 IAM으로 제한 불가

---

### Q200. Which Amazon Elastic Compute Cloud feature can you query from within the instance to access instance properties?

**Options:**
- A) Instance user data.
- B) Resource tags.
- C) Instance metadata.
- D) Amazon Machine Image.

**Answer:** C

**해설:**

> **문제:** 인스턴스 내부에서 인스턴스 속성에 액세스하기 위해 쿼리할 수 있는 Amazon EC2 기능은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 인스턴스 사용자 데이터(User data). |
| B | 리소스 태그. |
| C | 인스턴스 메타데이터. |
| D | Amazon Machine Image. |

**(A)** : User data는 인스턴스 시작 시 전달한 스크립트/데이터이며 인스턴스 속성이 아닙니다.

**(B)** : 리소스 태그는 콘솔/API를 통해 관리되며 인스턴스 내부에서 직접 쿼리하는 용도가 아닙니다.

**(C) 정답** : 인스턴스 메타데이터(Instance Metadata)는 `http://169.254.169.254/latest/meta-data/` 엔드포인트를 통해 인스턴스 내부에서 쿼리할 수 있습니다. 인스턴스 ID, 퍼블릭 IP, AZ 등 인스턴스 속성을 확인할 수 있습니다.

**(D)** : AMI는 인스턴스 시작에 사용된 이미지이며 인스턴스 내부 쿼리 대상이 아닙니다.

**핵심 개념:** EC2 인스턴스 메타데이터 — 169.254.169.254를 통해 인스턴스 내부에서 속성 조회

---

