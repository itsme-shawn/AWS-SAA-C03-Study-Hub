# AWS SAA-C03 Official Sample Questions

> 출처: AWS 공식 SAA-C03 샘플 문제
> https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Sample-Questions.pdf
> 총 10문제

---

### Q1. A company runs a public-facing three-tier web application in a VPC across multiple Availability Zones. Amazon EC2 instances for the application tier running in private subnets need to download software patches from the internet. However, the EC2 instances cannot be directly accessible from the internet. Which actions should be taken to allow the EC2 instances to download the needed patches? (Select TWO.)

**Options:**
- A) Configure a NAT gateway in a public subnet.
- B) Define a custom route table with a route to the NAT gateway for internet traffic and associate it with the private subnets for the application tier.
- C) Assign Elastic IP addresses to the EC2 instances.
- D) Define a custom route table with a route to the internet gateway for internet traffic and associate it with the private subnets for the application tier.
- E) Configure a NAT instance in a private subnet.

**Answer:** A, B

**해설:**

> **문제:** 회사가 VPC 내 여러 가용 영역에 걸쳐 공개 3계층 웹 애플리케이션을 운영하고 있습니다. 프라이빗 서브넷에서 실행 중인 애플리케이션 계층의 EC2 인스턴스는 인터넷에서 소프트웨어 패치를 다운로드해야 합니다. 단, EC2 인스턴스는 인터넷에서 직접 접근할 수 없어야 합니다. EC2 인스턴스가 필요한 패치를 다운로드할 수 있도록 취해야 할 조치는 무엇입니까? (두 가지 선택)

| 선지 | 번역 |
|------|------|
| A | 퍼블릭 서브넷에 NAT 게이트웨이를 구성한다. |
| B | NAT 게이트웨이로 인터넷 트래픽을 라우팅하는 커스텀 라우팅 테이블을 정의하고 애플리케이션 계층의 프라이빗 서브넷에 연결한다. |
| C | EC2 인스턴스에 Elastic IP 주소를 할당한다. |
| D | 인터넷 게이트웨이로 인터넷 트래픽을 라우팅하는 커스텀 라우팅 테이블을 정의하고 프라이빗 서브넷에 연결한다. |
| E | 프라이빗 서브넷에 NAT 인스턴스를 구성한다. |

**(A) 정답** : NAT 게이트웨이는 반드시 퍼블릭 서브넷에 위치해야 합니다. 프라이빗 서브넷의 EC2 인스턴스가 인터넷으로 아웃바운드 트래픽을 보낼 수 있도록 해주며, 외부에서 직접 접근은 불가능합니다.

**(B) 정답** : 프라이빗 서브넷에 커스텀 라우팅 테이블을 연결하여 0.0.0.0/0 트래픽이 NAT 게이트웨이를 경유하도록 설정해야 실제로 인터넷 통신이 가능합니다. NAT 게이트웨이 생성만으로는 부족하며 라우팅 설정이 필수입니다.

**(C)** : Elastic IP를 EC2 인스턴스에 직접 할당하면 인터넷에서 해당 인스턴스에 직접 접근이 가능해집니다. 이는 요구사항("EC2 인스턴스는 인터넷에서 직접 접근 불가")에 위배됩니다.

**(D)** : 프라이빗 서브넷의 라우팅 테이블에 인터넷 게이트웨이를 직접 연결하면 해당 서브넷은 사실상 퍼블릭 서브넷이 되어 인터넷에서 직접 접근이 가능해집니다. 요구사항에 위배됩니다.

**(E)** : NAT 인스턴스는 퍼블릭 서브넷에 위치해야 합니다. 프라이빗 서브넷에 NAT 인스턴스를 배치하면 자체적으로 인터넷 연결이 없어 작동하지 않습니다.

**핵심 개념:** NAT Gateway는 퍼블릭 서브넷에 배치하고, 프라이빗 서브넷의 라우팅 테이블에서 0.0.0.0/0을 NAT Gateway로 향하도록 설정해야 아웃바운드 인터넷 접근이 가능합니다. 인터넷 게이트웨이를 프라이빗 서브넷 라우팅에 직접 연결하면 프라이빗 서브넷이 퍼블릭화됩니다.

---

### Q2. A solutions architect wants to design a solution to save costs for Amazon EC2 instances that do not need to run during a 2-week company shutdown. The applications running on the EC2 instances store data in instance memory that must be present when the instances resume operation. Which approach should the solutions architect recommend to shut down and resume the EC2 instances?

**Options:**
- A) Modify the application to store the data on instance store volumes. Reattach the volumes while restarting them.
- B) Snapshot the EC2 instances before stopping them. Restore the snapshot after restarting the instances.
- C) Run the applications on EC2 instances enabled for hibernation. Hibernate the instances before the 2-week company shutdown.
- D) Note the Availability Zone for each EC2 instance before stopping it. Restart the instances in the same Availability Zones after the 2-week company shutdown.

**Answer:** C

**해설:**

> **문제:** 솔루션 아키텍트가 2주간의 회사 셧다운 기간 동안 실행할 필요가 없는 Amazon EC2 인스턴스의 비용을 절감하는 솔루션을 설계하려 합니다. EC2 인스턴스에서 실행 중인 애플리케이션은 인스턴스 메모리(RAM)에 데이터를 저장하며, 인스턴스 재개 시 해당 데이터가 존재해야 합니다. EC2 인스턴스를 종료하고 재개하기 위해 어떤 방법을 권장해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 인스턴스 스토어 볼륨에 데이터를 저장하도록 애플리케이션을 수정하고, 재시작 시 볼륨을 재연결한다. |
| B | 인스턴스를 중지하기 전에 스냅샷을 찍고, 재시작 후 스냅샷을 복원한다. |
| C | 최대 절전 모드(Hibernation)가 활성화된 EC2 인스턴스에서 애플리케이션을 실행하고, 2주 셧다운 전에 인스턴스를 최대 절전 모드로 전환한다. |
| D | 중지 전 각 EC2 인스턴스의 가용 영역을 메모하고, 2주 후 동일한 가용 영역에서 인스턴스를 재시작한다. |

**(A)** : 인스턴스 스토어는 인스턴스가 중지되거나 종료되면 데이터가 소멸됩니다. 재연결도 불가능합니다(인스턴스 스토어는 특정 인스턴스에 물리적으로 종속됨). 요구사항을 충족하지 못합니다.

**(B)** : EBS 스냅샷은 디스크 데이터를 백업합니다. RAM(메모리)에 저장된 데이터는 스냅샷에 포함되지 않으므로 요구사항(메모리 데이터 보존)을 충족하지 못합니다.

**(C) 정답** : EC2 Hibernation(최대 절전 모드)은 RAM의 내용을 EBS 루트 볼륨에 저장한 뒤 인스턴스를 중지합니다. 재개 시 메모리 상태가 그대로 복원됩니다. 비용은 EBS 스토리지에 대해서만 발생하므로 비용 절감 요구사항도 충족합니다.

**(D)** : 단순히 동일한 AZ에서 재시작하는 것은 메모리 데이터를 보존하지 않습니다. 일반 Stop/Start 시 메모리 내용은 소멸됩니다.

**핵심 개념:** EC2 Hibernation은 RAM 상태를 EBS에 저장하여 중지 후 재개 시 메모리 상태를 복원합니다. 장기 셧다운 시 비용을 절감하면서 애플리케이션 상태를 유지해야 할 때 적합한 옵션입니다.

---

### Q3. A company plans to run a monitoring application on an Amazon EC2 instance in a VPC. Connections are made to the EC2 instance using the instance's private IPv4 address. A solutions architect needs to design a solution that will allow traffic to be quickly directed to a standby EC2 instance if the application fails and becomes unreachable. Which approach will meet these requirements?

**Options:**
- A) Deploy an Application Load Balancer configured with a listener for the private IP address and register the primary EC2 instance with the load balancer. Upon failure, de-register the instance and register the standby EC2 instance.
- B) Configure a custom DHCP option set. Configure DHCP to assign the same private IP address to the standby EC2 instance when the primary EC2 instance fails.
- C) Attach a secondary elastic network interface to the EC2 instance configured with the private IP address. Move the network interface to the standby EC2 instance if the primary EC2 instance becomes unreachable.
- D) Associate an Elastic IP address with the network interface of the primary EC2 instance. Disassociate the Elastic IP from the primary instance upon failure and associate it with a standby EC2 instance.

**Answer:** C

**해설:**

> **문제:** 회사가 VPC 내 Amazon EC2 인스턴스에서 모니터링 애플리케이션을 실행할 계획입니다. EC2 인스턴스에 대한 연결은 인스턴스의 프라이빗 IPv4 주소를 사용합니다. 솔루션 아키텍트는 애플리케이션이 실패하여 접근 불가 상태가 되면 트래픽을 스탠바이 EC2 인스턴스로 빠르게 전환할 수 있는 솔루션을 설계해야 합니다. 어떤 방법이 이 요구사항을 충족합니까?

| 선지 | 번역 |
|------|------|
| A | 프라이빗 IP 주소에 대한 리스너로 구성된 Application Load Balancer를 배포하고 기본 EC2 인스턴스를 등록합니다. 장애 시 해당 인스턴스를 등록 해제하고 스탠바이 인스턴스를 등록합니다. |
| B | 커스텀 DHCP 옵션 세트를 구성하여, 기본 EC2 인스턴스 장애 시 스탠바이 인스턴스에 동일한 프라이빗 IP를 할당하도록 DHCP를 설정합니다. |
| C | EC2 인스턴스에 프라이빗 IP 주소로 구성된 보조 ENI(탄력적 네트워크 인터페이스)를 연결합니다. 기본 인스턴스가 접근 불가 상태가 되면 해당 네트워크 인터페이스를 스탠바이 인스턴스로 이동합니다. |
| D | 기본 EC2 인스턴스의 네트워크 인터페이스에 Elastic IP를 연결합니다. 장애 시 기본 인스턴스에서 Elastic IP를 분리하고 스탠바이 인스턴스에 연결합니다. |

**(A)** : ALB는 프라이빗 IP 리스너를 직접 지원하지 않으며, 등록/해제 과정은 즉각적이지 않습니다. 또한 문제의 핵심은 "동일한 프라이빗 IP로 연결"이므로 ALB 도입은 연결 방식 자체를 변경합니다.

**(B)** : DHCP를 통한 IP 재할당은 기술적으로 복잡하고 즉각적인 전환이 어렵습니다. AWS DHCP 옵션 세트는 이런 용도로 설계되지 않았습니다.

**(C) 정답** : 보조 ENI에 특정 프라이빗 IP를 고정 할당한 뒤, 장애 발생 시 해당 ENI를 스탠바이 인스턴스에 연결하면 동일한 프라이빗 IP로 트래픽이 계속 전달됩니다. ENI 이동은 빠르게 수행 가능하며, 연결 클라이언트는 IP 변경 없이 스탠바이로 전환됩니다.

**(D)** : Elastic IP는 퍼블릭 IP입니다. 문제의 연결은 프라이빗 IPv4 주소를 사용하므로 Elastic IP 전환은 해당 요구사항을 충족하지 않습니다.

**핵심 개념:** ENI(Elastic Network Interface)는 고정 프라이빗 IP를 유지한 채 인스턴스 간에 이동할 수 있습니다. 프라이빗 IP 기반 페일오버가 필요한 경우 보조 ENI 이동이 표준 패턴입니다.

---

### Q4. An analytics company is planning to offer a web analytics service to its users. The service will require that the users' webpages include a JavaScript script that makes authenticated GET requests to the company's Amazon S3 bucket. What must a solutions architect do to ensure that the script will successfully execute?

**Options:**
- A) Enable cross-origin resource sharing (CORS) on the S3 bucket.
- B) Enable S3 Versioning on the S3 bucket.
- C) Provide the users with a signed URL for the script.
- D) Configure an S3 bucket policy to allow public execute privileges.

**Answer:** A

**해설:**

> **문제:** 분석 회사가 사용자들에게 웹 분석 서비스를 제공할 계획입니다. 이 서비스는 사용자의 웹페이지에 JavaScript 스크립트를 포함시켜야 하며, 해당 스크립트는 회사의 Amazon S3 버킷에 인증된 GET 요청을 합니다. 솔루션 아키텍트가 스크립트가 성공적으로 실행되도록 하려면 무엇을 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | S3 버킷에서 CORS(교차 출처 리소스 공유)를 활성화한다. |
| B | S3 버킷에서 S3 버전 관리를 활성화한다. |
| C | 사용자에게 스크립트의 서명된 URL을 제공한다. |
| D | 공개 실행 권한을 허용하는 S3 버킷 정책을 구성한다. |

**(A) 정답** : 브라우저의 Same-Origin Policy에 의해 다른 도메인(사용자 웹페이지)에서 S3 버킷으로 JavaScript를 통한 요청을 보내면 CORS 오류가 발생합니다. S3 버킷에 CORS 정책을 설정하면 허용된 출처에서의 교차 출처 요청을 허용하여 스크립트가 정상 실행됩니다.

**(B)** : S3 Versioning은 객체의 여러 버전을 보관하는 기능으로, 교차 출처 요청 문제와는 무관합니다.

**(C)** : 서명된 URL은 특정 객체에 대한 임시 접근 권한을 부여하지만, JavaScript가 다른 도메인에서 S3에 요청하는 CORS 문제를 해결하지는 않습니다.

**(D)** : S3에는 "실행(execute)" 권한 개념이 없습니다. 또한 공개 접근을 허용하는 것은 인증된 요청이라는 요구사항에도 맞지 않으며 보안 위험을 초래합니다.

**핵심 개념:** CORS(Cross-Origin Resource Sharing)는 브라우저가 다른 출처의 리소스에 접근할 수 있도록 허용하는 메커니즘입니다. 사용자 웹페이지의 JavaScript가 다른 도메인의 S3에 요청을 보낼 때는 반드시 S3 버킷에 CORS 설정이 필요합니다.

---

### Q5. A company's security team requires that all data stored in the cloud be encrypted at rest at all times using encryption keys stored on premises. Which encryption options meet these requirements? (Select TWO.)

**Options:**
- A) Use server-side encryption with Amazon S3 managed encryption keys (SSE-S3).
- B) Use server-side encryption with AWS KMS managed encryption keys (SSE-KMS).
- C) Use server-side encryption with customer-provided encryption keys (SSE-C).
- D) Use client-side encryption to provide at-rest encryption.
- E) Use an AWS Lambda function invoked by Amazon S3 events to encrypt the data using the customer's keys.

**Answer:** C, D

**해설:**

> **문제:** 회사의 보안 팀은 클라우드에 저장된 모든 데이터가 온프레미스에 저장된 암호화 키를 사용하여 항상 암호화된 상태여야 한다고 요구합니다. 이 요구사항을 충족하는 암호화 옵션은 무엇입니까? (두 가지 선택)

| 선지 | 번역 |
|------|------|
| A | Amazon S3 관리형 암호화 키(SSE-S3)를 사용한 서버 측 암호화 |
| B | AWS KMS 관리형 암호화 키(SSE-KMS)를 사용한 서버 측 암호화 |
| C | 고객 제공 암호화 키(SSE-C)를 사용한 서버 측 암호화 |
| D | 클라이언트 측 암호화를 사용한 저장 데이터 암호화 |
| E | Amazon S3 이벤트로 호출된 AWS Lambda 함수를 통해 고객 키로 데이터를 암호화 |

**(A)** : SSE-S3는 AWS가 키를 완전히 관리합니다. 키가 온프레미스가 아닌 AWS에 저장되므로 요구사항을 충족하지 않습니다.

**(B)** : SSE-KMS는 키를 AWS KMS에서 관리합니다. KMS CMK(고객 관리형 키)를 사용하더라도 키 자체는 AWS 인프라에 존재하므로 "온프레미스 키 저장" 요구사항을 충족하지 않습니다.

**(C) 정답** : SSE-C는 고객이 직접 암호화 키를 제공하여 S3가 해당 키로 서버 측 암호화를 수행합니다. 키는 온프레미스에 보관하고 요청 시마다 전달하므로 키가 AWS에 저장되지 않습니다. 요구사항을 충족합니다.

**(D) 정답** : 클라이언트 측 암호화는 데이터를 AWS에 업로드하기 전에 온프레미스에서 고객의 키로 암호화합니다. AWS에는 암호화된 데이터만 저장되며, 키는 온프레미스에만 존재합니다. 요구사항을 충족합니다.

**(E)** : Lambda를 통한 암호화는 키를 AWS 환경(Lambda, 환경 변수 등)에 노출할 위험이 있으며, 아키텍처가 복잡해지고 "키가 온프레미스에만 저장"된다는 보장이 어렵습니다.

**핵심 개념:** 온프레미스 키 보관 요구사항에는 SSE-C(고객 제공 키) 또는 클라이언트 측 암호화가 적합합니다. SSE-S3, SSE-KMS는 키가 AWS에 저장되므로 해당 요구사항을 충족하지 않습니다.

---

### Q6. A company uses Amazon EC2 Reserved Instances to run its data processing workload. The nightly job typically takes 7 hours to run and must finish within a 10-hour time window. The company anticipates temporary increases in demand at the end of each month that will cause the job to run over the time limit with the capacity of the current resources. Once started, the processing job cannot be interrupted before completion. What should a solutions architect do to accomplish this?

**Options:**
- A) Deploy On-Demand Instances during periods of high demand.
- B) Create a second EC2 reservation for additional instances.
- C) Deploy Spot Instances during periods of high demand.
- D) Increase the EC2 instance size in the EC2 reservation to support the increased workload.

**Answer:** A

**해설:**

> **문제:** 회사가 데이터 처리 워크로드를 실행하기 위해 Amazon EC2 예약 인스턴스를 사용합니다. 야간 작업은 일반적으로 7시간이 걸리며 10시간 이내에 완료되어야 합니다. 회사는 매월 말 수요가 일시적으로 증가하여 현재 리소스로는 제한 시간을 초과할 것으로 예상합니다. 처리 작업은 시작되면 완료 전에 중단될 수 없습니다. 가장 비용 효율적인 방법은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 수요가 높은 기간에 온디맨드 인스턴스를 배포한다. |
| B | 추가 인스턴스를 위한 두 번째 EC2 예약을 생성한다. |
| C | 수요가 높은 기간에 스팟 인스턴스를 배포한다. |
| D | 증가된 워크로드를 지원하기 위해 EC2 예약의 인스턴스 크기를 늘린다. |

**(A) 정답** : 온디맨드 인스턴스는 필요한 때에만 사용하고 중단 없이 실행됩니다. 월말에만 일시적으로 필요한 추가 용량에 적합하며, 예약 인스턴스를 추가로 구매하는 것보다 비용 효율적입니다.

**(B)** : 추가 예약 인스턴스 구매는 연간/3년 약정이 필요하며, 월말에만 사용하는 임시 수요에 대해 과도한 비용이 발생합니다. 비용 효율적이지 않습니다.

**(C)** : 스팟 인스턴스는 가격이 저렴하지만 AWS에 의해 중단될 수 있습니다. 문제에서 "처리 작업은 완료 전에 중단될 수 없다"고 명시하므로 스팟 인스턴스는 부적합합니다.

**(D)** : 더 큰 예약 인스턴스로 변경하면 평소에도 더 큰 인스턴스를 사용해야 하므로 비용이 항상 증가합니다. 월말 일시적 수요를 위한 비용 효율적인 방법이 아닙니다.

**핵심 개념:** 중단 불가 워크로드에는 스팟 인스턴스가 부적합합니다. 예측 가능하지만 일시적인 수요 급증에는 온디맨드 인스턴스가 예약 인스턴스 추가 구매보다 비용 효율적입니다.

---

### Q7. A company runs an online voting system for a weekly live television program. During broadcasts, users submit hundreds of thousands of votes within minutes to a front-end fleet of Amazon EC2 instances that run in an Auto Scaling group. The EC2 instances write the votes to an Amazon RDS database. However, the database is unable to keep up with the requests that come from the EC2 instances. A solutions architect must design a solution that processes the votes in the most efficient manner and without downtime. Which solution meets these requirements?

**Options:**
- A) Migrate the front-end application to AWS Lambda. Use Amazon API Gateway to route user requests to the Lambda functions.
- B) Scale the database horizontally by converting it to a Multi-AZ deployment. Configure the front-end application to write to both the primary and secondary DB instances.
- C) Configure the front-end application to send votes to an Amazon Simple Queue Service (Amazon SQS) queue. Provision worker instances to read the SQS queue and write the vote information to the database.
- D) Use Amazon EventBridge to create a scheduled event to re-provision the database with larger, memory optimized instances during voting periods. When voting ends, re-provision the database to use smaller instances.

**Answer:** C

**해설:**

> **문제:** 회사가 매주 생방송 TV 프로그램을 위한 온라인 투표 시스템을 운영합니다. 방송 중 사용자들은 몇 분 내에 수십만 건의 투표를 Auto Scaling 그룹의 EC2 인스턴스로 제출합니다. EC2 인스턴스는 투표 데이터를 Amazon RDS 데이터베이스에 기록합니다. 그러나 데이터베이스가 EC2 인스턴스의 요청을 처리하지 못하고 있습니다. 다운타임 없이 투표를 가장 효율적으로 처리하는 솔루션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 프론트엔드 애플리케이션을 AWS Lambda로 마이그레이션하고, Amazon API Gateway를 사용하여 사용자 요청을 Lambda 함수로 라우팅한다. |
| B | 데이터베이스를 Multi-AZ 배포로 전환하여 수평 확장하고, 기본 및 보조 DB 인스턴스 모두에 쓰도록 프론트엔드 애플리케이션을 구성한다. |
| C | 프론트엔드 애플리케이션이 Amazon SQS 대기열에 투표를 전송하도록 구성하고, 워커 인스턴스를 프로비저닝하여 SQS 대기열을 읽어 투표 정보를 데이터베이스에 기록한다. |
| D | Amazon EventBridge를 사용하여 투표 기간 동안 더 큰 메모리 최적화 인스턴스로 데이터베이스를 재프로비저닝하는 예약 이벤트를 생성하고, 투표가 끝나면 더 작은 인스턴스로 재프로비저닝한다. |

**(A)** : Lambda로의 마이그레이션은 프론트엔드 확장성을 개선하지만, 근본적인 문제인 RDS 데이터베이스 병목 현상을 해결하지 못합니다.

**(B)** : Multi-AZ는 고가용성을 위한 기능으로, 보조 인스턴스는 읽기 전용 복제본이 아닙니다. Multi-AZ 스탠바이에 쓰기 요청을 직접 보낼 수 없습니다. 이는 잘못된 아키텍처입니다.

**(C) 정답** : SQS를 버퍼로 활용하면 순간적인 폭발적 요청을 대기열에 수용하고, 워커 인스턴스가 데이터베이스가 처리 가능한 속도로 데이터를 기록합니다. 이는 생산자(EC2)와 소비자(DB) 간의 속도 차이를 완충하는 표준 패턴입니다.

**(D)** : DB 재프로비저닝은 다운타임이 발생할 수 있으며, 예측 기반 스케일링이라 급격한 트래픽 변화에 즉각 대응하기 어렵습니다. 또한 요구사항에 "다운타임 없이"라고 명시되어 있습니다.

**핵심 개념:** SQS는 버스트 트래픽을 완충하는 메시지 대기열 서비스입니다. 데이터베이스 병목 현상은 SQS + 워커 패턴으로 해결할 수 있으며, 이는 프로듀서와 컨슈머를 디커플링하는 표준 아키텍처입니다.

---

### Q8. A company has a two-tier application architecture that runs in public and private subnets. Amazon EC2 instances running the web application are in the public subnet and an EC2 instance for the database runs on the private subnet. The web application instances and the database are running in a single Availability Zone (AZ). Which combination of steps should a solutions architect take to provide high availability for this architecture? (Select TWO.)

**Options:**
- A) Create new public and private subnets in the same AZ.
- B) Create an Amazon EC2 Auto Scaling group and Application Load Balancer spanning multiple AZs for the web application instances.
- C) Add the existing web application instances to an Auto Scaling group behind an Application Load Balancer.
- D) Create new public and private subnets in a new AZ. Create a database using an EC2 instance in the public subnet in the new AZ. Migrate the old database contents to the new database.
- E) Create new public and private subnets in the same VPC, each in a new AZ. Create an Amazon RDS Multi-AZ DB instance in the private subnets. Migrate the old database contents to the new DB instance.

**Answer:** B, E

**해설:**

> **문제:** 회사가 퍼블릭 및 프라이빗 서브넷에서 실행되는 2계층 애플리케이션 아키텍처를 보유하고 있습니다. 웹 애플리케이션을 실행하는 EC2 인스턴스는 퍼블릭 서브넷에, 데이터베이스용 EC2 인스턴스는 프라이빗 서브넷에 있습니다. 웹 애플리케이션 인스턴스와 데이터베이스는 단일 가용 영역(AZ)에서 실행 중입니다. 이 아키텍처에 고가용성을 제공하기 위한 단계 조합은 무엇입니까? (두 가지 선택)

| 선지 | 번역 |
|------|------|
| A | 동일한 AZ에 새 퍼블릭 및 프라이빗 서브넷을 생성한다. |
| B | 여러 AZ에 걸쳐 EC2 Auto Scaling 그룹과 Application Load Balancer를 생성하여 웹 애플리케이션 인스턴스를 관리한다. |
| C | 기존 웹 애플리케이션 인스턴스를 Application Load Balancer 뒤의 Auto Scaling 그룹에 추가한다. |
| D | 새 AZ에 새 퍼블릭 및 프라이빗 서브넷을 생성하고, 새 AZ의 퍼블릭 서브넷에 EC2 인스턴스를 사용하여 데이터베이스를 생성하고 이전한다. |
| E | 동일한 VPC 내 새 AZ에 새 퍼블릭 및 프라이빗 서브넷을 생성합니다. 프라이빗 서브넷에 Amazon RDS Multi-AZ DB 인스턴스를 생성하고 기존 데이터베이스 내용을 마이그레이션한다. |

**(A)** : 동일한 AZ에 서브넷을 추가하는 것은 단일 AZ 장애에 대한 고가용성을 제공하지 않습니다.

**(B) 정답** : 여러 AZ에 걸친 Auto Scaling 그룹과 ALB는 웹 계층의 고가용성을 보장합니다. 한 AZ가 장애가 나더라도 다른 AZ의 인스턴스가 트래픽을 처리합니다.

**(C)** : 기존 인스턴스를 Auto Scaling에 추가하고 ALB를 붙이는 것은 개선이지만, 단일 AZ 내에서만 이루어지면 AZ 장애에 취약합니다. 다중 AZ 구성이 없어 완전한 고가용성이 되지 않습니다.

**(D)** : 데이터베이스를 퍼블릭 서브넷에 배치하는 것은 보안상 매우 위험합니다. 데이터베이스는 항상 프라이빗 서브넷에 위치해야 합니다.

**(E) 정답** : 새 AZ에 프라이빗 서브넷을 추가하고 RDS Multi-AZ를 구성하면 데이터베이스 계층의 고가용성이 확보됩니다. RDS Multi-AZ는 자동 장애 조치를 지원하며 데이터를 동기적으로 복제합니다.

**핵심 개념:** 고가용성 아키텍처는 웹 계층(Multi-AZ ALB + ASG)과 데이터베이스 계층(RDS Multi-AZ) 모두에서 다중 AZ 구성이 필요합니다. 데이터베이스는 반드시 프라이빗 서브넷에 배치해야 합니다.

---

### Q9. A website runs a custom web application that receives a burst of traffic each day at noon. The users upload new pictures and content daily, but have been complaining of timeouts. The architecture uses Amazon EC2 Auto Scaling groups, and the application consistently takes 1 minute to initiate upon boot up before responding to user requests. How should a solutions architect redesign the architecture to better respond to changing traffic?

**Options:**
- A) Configure a Network Load Balancer with a slow start configuration.
- B) Configure Amazon ElastiCache for Redis to offload direct requests from the EC2 instances.
- C) Configure an Auto Scaling step scaling policy with an EC2 instance warmup condition.
- D) Configure Amazon CloudFront to use an Application Load Balancer as the origin.

**Answer:** C

**해설:**

> **문제:** 웹사이트가 매일 정오에 트래픽이 급증하는 커스텀 웹 애플리케이션을 운영합니다. 사용자들은 매일 새 사진과 콘텐츠를 업로드하지만 타임아웃 문제를 호소하고 있습니다. 아키텍처는 Amazon EC2 Auto Scaling 그룹을 사용하며, 애플리케이션은 부팅 후 사용자 요청에 응답하기까지 일관적으로 1분이 걸립니다. 변화하는 트래픽에 더 잘 대응하기 위해 아키텍처를 어떻게 재설계해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 슬로우 스타트 구성으로 Network Load Balancer를 구성한다. |
| B | EC2 인스턴스의 직접 요청을 오프로드하기 위해 Amazon ElastiCache for Redis를 구성한다. |
| C | EC2 인스턴스 웜업 조건을 포함한 Auto Scaling 스텝 스케일링 정책을 구성한다. |
| D | Amazon CloudFront가 Application Load Balancer를 오리진으로 사용하도록 구성한다. |

**(A)** : NLB의 슬로우 스타트는 새로 등록된 타겟에 점진적으로 트래픽을 보내는 기능으로, ALB의 기능입니다. 그러나 이는 인스턴스 부팅 후 워밍업 시간 문제(타임아웃)를 근본적으로 해결하지 못합니다.

**(B)** : ElastiCache는 읽기 요청 캐싱에 효과적이지만, 문제는 사용자들이 새 콘텐츠를 업로드(쓰기 작업)하고 있으며 타임아웃의 원인은 인스턴스 워밍업 시간입니다. 근본 원인이 다릅니다.

**(C) 정답** : Auto Scaling의 인스턴스 워밍업(warmup) 조건을 설정하면, 새로 시작된 인스턴스가 완전히 초기화되어 요청을 처리할 준비가 될 때까지 Auto Scaling 지표에 포함되지 않습니다. 또한 스텝 스케일링 정책은 트래픽 급증에 단계적으로 신속히 대응할 수 있습니다.

**(D)** : CloudFront는 정적 콘텐츠 캐싱과 지연 시간 감소에 효과적이지만, 매일 새로 업로드되는 콘텐츠와 인스턴스 워밍업 타임아웃 문제의 근본 해결책이 아닙니다.

**핵심 개념:** EC2 Auto Scaling의 인스턴스 워밍업(Instance Warmup) 설정은 새 인스턴스가 초기화 완료 전에 트래픽을 받아 타임아웃이 발생하는 것을 방지합니다. 스텝 스케일링 정책은 트래픽 패턴에 따라 스케일링 속도를 조절합니다.

---

### Q10. An application running on AWS uses an Amazon Aurora Multi-AZ DB cluster deployment for its database. When evaluating performance metrics, a solutions architect discovered that the database reads are causing high I/O and adding latency to the write requests against the database. What should the solutions architect do to separate the read requests from the write requests?

**Options:**
- A) Enable read-through caching on the Aurora database.
- B) Update the application to read from the Multi-AZ standby instance.
- C) Create an Aurora replica and modify the application to use the appropriate endpoints.
- D) Create a second Aurora database and link it to the primary database as a read replica.

**Answer:** C

**해설:**

> **문제:** AWS에서 실행 중인 애플리케이션이 데이터베이스로 Amazon Aurora Multi-AZ DB 클러스터 배포를 사용합니다. 성능 지표를 평가한 결과, 솔루션 아키텍트는 데이터베이스 읽기가 높은 I/O를 유발하고 데이터베이스 쓰기 요청에 지연 시간을 추가하고 있다는 것을 발견했습니다. 읽기 요청과 쓰기 요청을 분리하기 위해 무엇을 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Aurora 데이터베이스에서 읽기 캐싱(read-through caching)을 활성화한다. |
| B | Multi-AZ 스탠바이 인스턴스에서 읽기를 수행하도록 애플리케이션을 업데이트한다. |
| C | Aurora 복제본을 생성하고 적절한 엔드포인트를 사용하도록 애플리케이션을 수정한다. |
| D | 두 번째 Aurora 데이터베이스를 생성하고 기본 데이터베이스에 읽기 복제본으로 연결한다. |

**(A)** : Aurora는 기본적으로 read-through caching 기능을 내장 제공하지 않습니다. 캐싱은 ElastiCache 같은 별도 레이어가 필요합니다.

**(B)** : Aurora Multi-AZ의 스탠바이 인스턴스는 장애 조치(failover) 목적으로만 존재하며, 읽기 트래픽을 처리할 수 없습니다. RDS Multi-AZ와 Aurora의 구조 차이를 이해해야 합니다.

**(C) 정답** : Aurora 복제본을 생성하면 읽기 전용 엔드포인트(Reader Endpoint)가 제공됩니다. 애플리케이션의 읽기 요청은 Reader Endpoint로, 쓰기 요청은 Writer Endpoint(클러스터 엔드포인트)로 분리하면 I/O 경합이 줄어들고 전체 성능이 향상됩니다.

**(D)** : Aurora는 동일 클러스터 내에서 복제본을 추가하는 방식이 표준입니다. 별도의 Aurora 데이터베이스를 생성하여 연결하는 방식은 불필요하게 복잡하며, Aurora의 내장 복제 기능을 활용하지 못하는 비효율적인 방법입니다.

**핵심 개념:** Aurora는 클러스터 엔드포인트(쓰기)와 읽기 전용 엔드포인트(읽기)를 분리하여 제공합니다. Aurora 복제본을 추가하고 엔드포인트를 분리하면 읽기/쓰기 부하를 효율적으로 나눌 수 있습니다. Aurora Multi-AZ 스탠바이는 읽기 트래픽을 처리하지 않습니다.

---
