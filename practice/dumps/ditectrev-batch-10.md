# Ditectrev SAA-C03 Practice Questions — Batch 10 (Q451-Q500)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q451. A customer has established an AWS Direct Connect connection to AWS. The link is up and routes are being advertised from the customer's end, however the customer is unable to connect from EC2 instances inside its VPC to servers residing in its datacenter. Which of the following options provide a viable solution to remedy this situation? (Choose 2 answers)

**Options:**
- A) Add a route to the route table with an IPsec VPN connection as the target.
- B) Enable route propagation to the virtual pinnate gateway (VGW).
- C) Enable route propagation to the customer gateway (CGW).
- D) Modify the route table of all Instances using the 'route' command.
- E) Modify the Instances VPC subnet route table by adding a route back to the customer's on-premises environment.

**Answer:** B, E

**해설:**

> **문제:** 고객이 AWS Direct Connect 연결을 구성했으며 링크가 활성화되어 있고 경로가 광고되고 있습니다. 그러나 VPC 내 EC2 인스턴스에서 데이터센터 서버로 연결할 수 없습니다. 이 문제를 해결하기 위한 두 가지 방법은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | IPsec VPN 연결을 대상으로 하는 라우트를 라우트 테이블에 추가한다. |
| B | Virtual Private Gateway(VGW)에 라우트 전파를 활성화한다. |
| C | Customer Gateway(CGW)에 라우트 전파를 활성화한다. |
| D | 'route' 명령어를 사용해 모든 인스턴스의 라우트 테이블을 수정한다. |
| E | VPC 서브넷 라우트 테이블에 온프레미스 환경으로 돌아가는 경로를 추가한다. |

**(A)** : Direct Connect 문제 해결에 IPsec VPN 터널을 추가하는 것은 별개의 연결 방식이며 현재 상황의 해결책이 아닙니다.

**(B) 정답** : VGW(Virtual Private Gateway)에 라우트 전파를 활성화하면 Direct Connect를 통해 광고된 온프레미스 경로가 VPC 라우트 테이블에 자동으로 전파됩니다.

**(C)** : 라우트 전파는 VGW에 활성화하는 것이지 CGW에 설정하는 것이 아닙니다.

**(D)** : 인스턴스 OS 레벨의 라우트 수정은 VPC 네트워크 레벨 문제를 해결하지 못합니다.

**(E) 정답** : VPC 서브넷 라우트 테이블에 온프레미스 CIDR을 목적지로, VGW를 대상으로 하는 경로를 추가하면 트래픽이 Direct Connect를 통해 전달됩니다.

**핵심 개념:** AWS Direct Connect, VGW 라우트 전파, VPC 라우트 테이블

---

### Q452. While creating a network in the VPC, which of the following is true of a NAT device?

**Options:**
- A) You have to administer the NAT Gateway Service provided by AW
- B) You can choose to use any of the three kinds of NAT devices offered by AWS for special purposes.
- C) You can use a NAT device to enable instances in a private subnet to connect to the Internet.
- D) You are recommended to use AWS NAT instances over NAT gateways, as the instances provide better availability and bandwidth.

**Answer:** B

**해설:**

> **문제:** VPC에서 네트워크를 생성할 때, NAT 디바이스에 대한 설명 중 옳은 것은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | AWS에서 제공하는 NAT Gateway 서비스를 직접 관리해야 한다. |
| B | AWS가 특수 목적을 위해 제공하는 세 종류의 NAT 디바이스 중 하나를 선택할 수 있다. |
| C | NAT 디바이스를 사용하면 프라이빗 서브넷의 인스턴스가 인터넷에 연결할 수 있다. |
| D | NAT 게이트웨이보다 NAT 인스턴스를 사용하도록 권장된다. NAT 인스턴스가 더 나은 가용성과 대역폭을 제공하기 때문이다. |

**(A)** : NAT Gateway는 AWS 관리형 서비스로 사용자가 직접 관리할 필요가 없습니다.

**(B) 정답** : AWS는 NAT Gateway(관리형), NAT 인스턴스(EC2 기반), 그리고 각각의 용도에 맞는 옵션을 제공합니다. 문제의 선지가 다소 모호하지만, 공식 정답으로 지정되어 있습니다.

**(C)** : 내용 자체는 사실이지만, 이 문제에서는 B가 정답으로 처리됩니다.

**(D)** : 반대로 AWS는 NAT 인스턴스보다 NAT Gateway를 권장합니다. NAT Gateway가 더 높은 가용성과 대역폭을 제공합니다.

**핵심 개념:** NAT Gateway vs NAT Instance, VPC 프라이빗 서브넷 인터넷 연결

---

### Q453. Which of the following statements is NOT true about using Elastic IP Address (EIP) in EC2-Classic and EC2-VPC platforms?

**Options:**
- A) In the EC2-VPC platform, the Elastic IP Address (EIP) does not remain associated with the instance when you stop it.
- B) In the EC2-Classic platform, stopping the instance disassociates the Elastic IP Address (EIP) from it.
- C) In the EC2-VPC platform, if you have attached a second network interface to an instance, when you disassociate the Elastic IP Address (EIP) from that instance, a new public IP address is not assigned to the instance automatically; you'll have to associate an EIP with it manually.
- D) In the EC2-Classic platform, if you disassociate an Elastic IP Address (EIP) from the instance, the instance is automatically assigned a new public IP address within a few minutes.

**Answer:** A

**해설:**

> **문제:** EC2-Classic 및 EC2-VPC 플랫폼에서 Elastic IP 주소(EIP) 사용에 대한 설명 중 옳지 않은 것은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | EC2-VPC 플랫폼에서는 인스턴스를 중지하면 EIP가 인스턴스와 연결 해제된다. |
| B | EC2-Classic 플랫폼에서는 인스턴스를 중지하면 EIP가 연결 해제된다. |
| C | EC2-VPC 플랫폼에서 두 번째 네트워크 인터페이스가 연결된 경우, EIP를 해제하면 새 공인 IP가 자동 할당되지 않아 수동으로 EIP를 연결해야 한다. |
| D | EC2-Classic 플랫폼에서 EIP를 해제하면 몇 분 내에 새 공인 IP가 자동으로 할당된다. |

**(A) 정답** : 이 설명이 틀렸습니다. EC2-VPC 플랫폼에서는 인스턴스를 중지해도 EIP는 계속 인스턴스에 연결되어 있습니다. EC2-Classic에서만 중지 시 EIP가 해제됩니다.

**(B)** : 정확한 설명입니다. EC2-Classic은 인스턴스 중지 시 EIP가 해제됩니다.

**(C)** : 정확한 설명입니다. 보조 네트워크 인터페이스가 있는 경우 EIP 해제 후 자동 공인 IP가 할당되지 않습니다.

**(D)** : 정확한 설명입니다. EC2-Classic에서 EIP 해제 후 새 공인 IP가 자동 할당됩니다.

**핵심 개념:** Elastic IP Address, EC2-Classic vs EC2-VPC, 인스턴스 중지 동작

---

### Q454. A user has hosted an application on EC2 instances. The EC2 instances are configured with ELB and Auto Scaling. The application server session time out is 2 hours. The user wants to configure connection draining to ensure that all in-flight requests are supported by ELB even though the instance is being deregistered. What time out period should the user specify for connection draining?

**Options:**
- A) 1 hour.
- B) 30 minutes.
- C) 5 minutes.
- D) 2 hours.

**Answer:** A

**해설:**

> **문제:** 사용자가 EC2 인스턴스에 애플리케이션을 호스팅했습니다. 애플리케이션 서버 세션 타임아웃은 2시간입니다. 인스턴스가 등록 해제될 때 진행 중인 요청을 지원하기 위해 Connection Draining을 설정하려 합니다. 어떤 타임아웃 기간을 지정해야 하나요?

| 선지 | 번역 |
|------|------|
| A | 1시간 |
| B | 30분 |
| C | 5분 |
| D | 2시간 |

**(A) 정답** : ELB Connection Draining의 최대 타임아웃은 3600초(1시간)입니다. 애플리케이션 세션이 2시간이더라도 설정 가능한 최댓값인 1시간을 지정해야 합니다.

**(B)** : 30분은 최대값이 아니므로 진행 중인 장기 세션을 커버하기 부족합니다.

**(C)** : 5분은 너무 짧아 2시간 세션의 진행 중인 요청을 처리할 수 없습니다.

**(D)** : 2시간은 Connection Draining의 최대 설정 가능 값(3600초 = 1시간)을 초과하므로 설정할 수 없습니다.

**핵심 개념:** ELB Connection Draining, 최대 타임아웃 3600초

---

### Q455. What does the following command do with respect to the Amazon EC2 security groups? ec2-create-group CreateSecurityGroup

**Options:**
- A) Groups the user created security groups in to a new group for easy access.
- B) Creates a new security group for use with your account.
- C) Creates a new group inside the security group.
- D) Creates a new rule inside the security group.

**Answer:** B

**해설:**

> **문제:** 다음 명령어는 Amazon EC2 보안 그룹과 관련하여 무엇을 수행하나요? ec2-create-group CreateSecurityGroup

| 선지 | 번역 |
|------|------|
| A | 사용자가 생성한 보안 그룹을 새 그룹으로 묶어 쉽게 접근할 수 있도록 한다. |
| B | 계정에서 사용할 새로운 보안 그룹을 생성한다. |
| C | 보안 그룹 내부에 새로운 그룹을 생성한다. |
| D | 보안 그룹 내부에 새로운 규칙을 생성한다. |

**(A)** : 보안 그룹을 다른 그룹으로 묶는 기능은 존재하지 않습니다.

**(B) 정답** : `ec2-create-group` (현재는 `aws ec2 create-security-group`에 해당) 명령어는 새로운 보안 그룹을 생성합니다.

**(C)** : 보안 그룹 내부에 중첩 그룹을 만드는 기능은 없습니다.

**(D)** : 규칙 추가는 `ec2-authorize` 명령어를 사용합니다.

**핵심 개념:** EC2 보안 그룹 생성 명령어

---

### Q456. You are in the process of moving your friend's WordPress site onto AWS to try and save him some money, and you have told him that he should probably also move his domain name. He asks why he can't leave his domain name where it is and just have his infrastructure on AWS. What would be an incorrect response to his question?

**Options:**
- A) Route 53 offers low query latency for your end users.
- B) Route 53 is designed to automatically answer queries from the optimal location depending on network conditions.
- C) The globally distributed nature of AWS's DNS servers helps ensure a consistent ability to route your end users to your application.
- D) Route 53 supports Domain Name System Security Extensions (DNSSEC).

**Answer:** D

**해설:**

> **문제:** 친구의 WordPress 사이트를 AWS로 이전하는 과정에서 도메인 이름도 이전하라고 권유했습니다. 친구는 도메인을 현재 위치에 두고 인프라만 AWS에 두면 안 되냐고 물었습니다. 이 질문에 대한 잘못된 응답은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | Route 53은 최종 사용자에게 낮은 쿼리 지연 시간을 제공한다. |
| B | Route 53은 네트워크 조건에 따라 최적 위치에서 자동으로 쿼리에 응답하도록 설계되었다. |
| C | AWS DNS 서버의 전 세계 분산 특성이 최종 사용자를 애플리케이션으로 일관되게 라우팅하는 데 도움이 된다. |
| D | Route 53은 DNSSEC(Domain Name System Security Extensions)를 지원한다. |

**(A)** : 정확한 설명입니다. Route 53은 글로벌 엣지 네트워크를 통해 낮은 지연 시간을 제공합니다.

**(B)** : 정확한 설명입니다. Route 53의 지연 시간 기반 라우팅 기능입니다.

**(C)** : 정확한 설명입니다. AWS의 글로벌 DNS 인프라의 특징입니다.

**(D) 정답** : 이 문제가 출제될 당시 Route 53은 DNSSEC를 지원하지 않았습니다. 따라서 도메인 이전을 권유하는 이유로 DNSSEC 지원을 언급하는 것은 잘못된 응답입니다. (현재는 지원하나, 시험 맥락에서는 오답으로 처리됩니다.)

**핵심 개념:** Route 53 기능, DNSSEC, DNS 레이턴시 기반 라우팅

---

### Q457. Which of the following are characteristics of a reserved instance? (Choose 3 answers)

**Options:**
- A) It can be migrated across Availability Zones.
- B) It is specific to an Amazon Machine Image (AMI).
- C) It can be applied to instances launched by Auto Scaling.
- D) It is specific to an instance Type.
- E) It can be used to lower Total Cost of Ownership (TCO) of a system.

**Answer:** A, D, E

**해설:**

> **문제:** Reserved Instance의 특성에 해당하는 것을 3개 고르시오.

| 선지 | 번역 |
|------|------|
| A | 가용 영역(AZ) 간에 마이그레이션할 수 있다. |
| B | 특정 AMI(Amazon Machine Image)에 종속된다. |
| C | Auto Scaling으로 시작된 인스턴스에 적용할 수 있다. |
| D | 특정 인스턴스 타입에 종속된다. |
| E | 시스템의 총 소유 비용(TCO)을 낮추는 데 사용할 수 있다. |

**(A) 정답** : Reserved Instance는 AZ 간 마이그레이션이 가능합니다. (Regional RI의 경우 AZ 유연성 제공)

**(B)** : Reserved Instance는 특정 AMI에 종속되지 않습니다. 인스턴스 타입, OS, 리전 등에 연결됩니다.

**(C)** : Auto Scaling으로 시작된 인스턴스에 자동 적용되나, 이것이 RI의 고유 특성은 아닙니다. 이 문제에서는 오답 처리됩니다.

**(D) 정답** : Reserved Instance는 특정 인스턴스 타입(예: m5.large)에 종속됩니다.

**(E) 정답** : Reserved Instance는 On-Demand 대비 최대 72% 할인을 제공하여 TCO를 낮춥니다.

**핵심 개념:** Reserved Instance 특성, 인스턴스 타입, AZ 마이그레이션, TCO 절감

---

### Q458. A user has defined an AutoScaling termination policy to first delete the instance with the nearest billing hour. AutoScaling has launched 3 instances in the US-East-1A region and 2 instances in the US-East-1B region. One of the instances in the US-East-1B region is running nearest to the billing hour. Which instance will AutoScaling terminate first while executing the termination action?

**Options:**
- A) Random Instance from US-East-1A.
- B) Instance with the nearest billing hour in US-East-1B.
- C) Instance with the nearest billing hour in US-East-1A.
- D) Random instance from US-East-1B.

**Answer:** C

**해설:**

> **문제:** 사용자가 AutoScaling 종료 정책을 '청구 시간에 가장 가까운 인스턴스를 먼저 삭제'로 설정했습니다. US-East-1A에 3개, US-East-1B에 2개 인스턴스가 있고, US-East-1B의 한 인스턴스가 청구 시간에 가장 가깝습니다. AutoScaling이 먼저 종료할 인스턴스는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | US-East-1A에서 임의 인스턴스 |
| B | US-East-1B에서 청구 시간에 가장 가까운 인스턴스 |
| C | US-East-1A에서 청구 시간에 가장 가까운 인스턴스 |
| D | US-East-1B에서 임의 인스턴스 |

**(A)** : 임의 선택이 아니라 AZ 균형과 종료 정책 순서에 따릅니다.

**(B)** : US-East-1B에 더 가까운 인스턴스가 있지만, AutoScaling은 먼저 인스턴스 수가 많은 AZ를 선택합니다.

**(C) 정답** : AutoScaling은 먼저 인스턴스가 더 많은 AZ(US-East-1A, 3개)를 선택하여 균형을 맞춘 후, 해당 AZ에서 종료 정책(청구 시간에 가장 가까운)을 적용합니다.

**(D)** : 임의 선택이 아니며, US-East-1B는 인스턴스 수가 더 적어 먼저 선택되지 않습니다.

**핵심 개념:** AutoScaling 종료 정책, AZ 균형 우선, 청구 시간 기반 종료

---

### Q459. You have an environment that consists of a public subnet using Amazon VPC and 3 instances that are running in this subnet. These three instances can successfully communicate with other hosts on the Internet. You launch a fourth instance in the same subnet, using the same AMI and security group configuration you used for the others, but find that this instance cannot be accessed from the internet. What should you do to enable Internet access?

**Options:**
- A) Deploy a NAT instance into the public subnet.
- B) Assign an Elastic IP address to the fourth instance.
- C) Configure a publically routable IP Address in the host OS of the fourth instance.
- D) Modify the routing table for the public subnet.

**Answer:** B

**해설:**

> **문제:** Amazon VPC의 퍼블릭 서브넷에 3개의 인스턴스가 인터넷과 통신 중입니다. 동일한 AMI와 보안 그룹으로 네 번째 인스턴스를 시작했지만 인터넷에서 접근할 수 없습니다. 인터넷 접근을 활성화하려면 어떻게 해야 하나요?

| 선지 | 번역 |
|------|------|
| A | 퍼블릭 서브넷에 NAT 인스턴스를 배포한다. |
| B | 네 번째 인스턴스에 Elastic IP 주소를 할당한다. |
| C | 네 번째 인스턴스의 호스트 OS에 공인 라우팅 가능한 IP를 설정한다. |
| D | 퍼블릭 서브넷의 라우팅 테이블을 수정한다. |

**(A)** : NAT 인스턴스는 프라이빗 서브넷에서 인터넷 아웃바운드를 위한 것이며, 이 시나리오에 해당하지 않습니다.

**(B) 정답** : 네 번째 인스턴스가 시작될 때 퍼블릭 IP가 자동 할당되지 않았을 가능성이 높습니다. EIP를 할당하면 인터넷에서 접근 가능해집니다.

**(C)** : VPC 환경에서는 OS 레벨에서 공인 IP를 직접 설정하는 방식은 작동하지 않습니다.

**(D)** : 다른 3개 인스턴스가 이미 동일 서브넷에서 통신 중이므로 라우팅 테이블은 정상입니다.

**핵심 개념:** Elastic IP, 퍼블릭 서브넷, EC2 인터넷 접근

---

### Q460. What does the 'Server Side Encryption' option on Amazon S3 provide?

**Options:**
- A) It provides an encrypted virtual disk in the Cloud.
- B) It doesn't exist for Amazon S3, but only for Amazon EC2.
- C) It encrypts the files that you send to Amazon S3, on the server side.
- D) It allows to upload files using an SSL endpoint, for a secure transfer.

**Answer:** A

**해설:**

> **문제:** Amazon S3의 '서버 측 암호화(Server Side Encryption)' 옵션은 무엇을 제공하나요?

| 선지 | 번역 |
|------|------|
| A | 클라우드에서 암호화된 가상 디스크를 제공한다. |
| B | Amazon S3에는 존재하지 않으며 Amazon EC2에만 있다. |
| C | Amazon S3로 전송하는 파일을 서버 측에서 암호화한다. |
| D | SSL 엔드포인트를 사용하여 파일을 안전하게 업로드할 수 있게 한다. |

**(A) 정답** : S3 SSE는 저장된 데이터를 서버 측에서 암호화하여 암호화된 스토리지(가상 디스크 역할)를 제공합니다. 문항의 표현이 다소 모호하지만 공식 정답입니다.

**(B)** : S3 SSE는 실제로 존재합니다.

**(C)** : 내용적으로 맞는 설명이나 이 문제에서는 A가 정답으로 처리됩니다.

**(D)** : SSL 업로드는 전송 중 암호화(in-transit encryption)로, SSE(저장 시 암호화)와는 다릅니다.

**핵심 개념:** S3 Server Side Encryption(SSE), 저장 시 암호화

---

### Q461. What is a placement group?

**Options:**
- A) A collection of Auto Scaling groups in the same region.
- B) A feature that enables EC2 instances to interact with each other via high bandwidth, low latency connections.
- C) A collection of authorized CloudFront edge locations for a distribution.
- D) A collection of Elastic Load Balancers in the same Region or Availability Zone.

**Answer:** B

**해설:**

> **문제:** 배치 그룹(Placement Group)이란 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 동일 리전의 Auto Scaling 그룹 컬렉션 |
| B | EC2 인스턴스들이 고대역폭, 저지연 연결로 상호작용할 수 있게 하는 기능 |
| C | 배포에 대해 승인된 CloudFront 엣지 로케이션의 컬렉션 |
| D | 동일 리전 또는 AZ의 Elastic Load Balancer 컬렉션 |

**(A)** : 배치 그룹은 Auto Scaling 그룹과 무관합니다.

**(B) 정답** : 배치 그룹(특히 Cluster Placement Group)은 EC2 인스턴스를 물리적으로 가까이 배치하여 낮은 지연 시간과 높은 네트워크 처리량을 제공합니다.

**(C)** : CloudFront 엣지 로케이션과 무관합니다.

**(D)** : ELB 컬렉션과 무관합니다.

**핵심 개념:** EC2 배치 그룹(Placement Group), Cluster/Spread/Partition 유형

---

### Q462. You are checking the workload on some of your General Purpose (SSD) and Provisioned IOPS (SSD) volumes and it seems that the I/O latency is higher than you require. You should probably check the [...] to make sure that your application is not trying to drive more IOPS than you have provisioned.

**Options:**
- A) amount of IOPS that are available.
- B) acknowledgement from the storage subsystem.
- C) average queue length.
- D) time it takes for the I/O operation to complete.

**Answer:** C

**해설:**

> **문제:** General Purpose SSD 및 Provisioned IOPS SSD 볼륨에서 I/O 지연 시간이 요구치보다 높습니다. 애플리케이션이 프로비저닝된 것보다 더 많은 IOPS를 요구하지 않는지 확인하려면 무엇을 확인해야 하나요?

| 선지 | 번역 |
|------|------|
| A | 사용 가능한 IOPS 수량 |
| B | 스토리지 서브시스템의 응답(acknowledgement) |
| C | 평균 큐 길이(average queue length) |
| D | I/O 작업 완료에 걸리는 시간 |

**(A)** : 사용 가능한 IOPS 확인은 문제의 원인 파악에 직접적이지 않습니다.

**(B)** : 스토리지 응답은 지연의 결과이지 원인 지표가 아닙니다.

**(C) 정답** : 평균 큐 길이(VolumeQueueLength)를 확인하면 애플리케이션이 프로비저닝된 IOPS 이상을 요구하는지 알 수 있습니다. 큐 길이가 높으면 IOPS 병목이 발생 중임을 나타냅니다.

**(D)** : I/O 완료 시간은 지연의 증상이지 근본 원인 파악 지표가 아닙니다.

**핵심 개념:** EBS 성능 모니터링, VolumeQueueLength, IOPS 병목

---

### Q463. Within the IAM service a GROUP is regarded as a:

**Options:**
- A) A collection of AWS accounts.
- B) It's the group of EC2 machines that gain the permissions specified in the GROUP.
- C) There's no GROUP in IAM, but only USERS and RESOURCES.
- D) A collection of users.

**Answer:** D

**해설:**

> **문제:** IAM 서비스에서 GROUP은 무엇으로 간주되나요?

| 선지 | 번역 |
|------|------|
| A | AWS 계정의 컬렉션 |
| B | GROUP에 지정된 권한을 얻는 EC2 머신들의 그룹 |
| C | IAM에는 GROUP이 없으며 USER와 RESOURCE만 있다. |
| D | 사용자의 컬렉션 |

**(A)** : IAM 그룹은 AWS 계정을 묶는 것이 아닙니다.

**(B)** : IAM 그룹은 EC2 인스턴스가 아닌 IAM 사용자를 포함합니다.

**(C)** : IAM에는 Group이 존재합니다.

**(D) 정답** : IAM 그룹은 IAM 사용자들의 컬렉션입니다. 그룹에 정책을 연결하면 그룹 내 모든 사용자가 해당 권한을 상속받습니다.

**핵심 개념:** IAM Group, 사용자 권한 관리

---

### Q464. Doug has created a VPC with CIDR 10.201.0.0/16 in his AWS account. In this VPC he has created a public subnet with CIDR block 10.201.31.0/24. While launching a new EC2 from the console, he is not able to assign the private IP address 10.201.31.6 to this instance. Which is the most likely reason for this issue?

**Options:**
- A) Private IP address 10.201.31.6 is blocked via ACLs in Amazon infrastructure as a part of platform security.
- B) Private address IP 10.201.31.6 is currently assigned to another interface.
- C) Private IP address 10.201.31.6 is not part of the associated subnet's IP address range.
- D) Private IP address 10.201.31.6 is reserved by Amazon for IP networking purposes.

**Answer:** B

**해설:**

> **문제:** Doug는 CIDR 10.201.0.0/16의 VPC를 생성하고, 10.201.31.0/24 퍼블릭 서브넷을 만들었습니다. 새 EC2 인스턴스에 IP 10.201.31.6을 할당할 수 없습니다. 가장 가능성 높은 이유는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 10.201.31.6은 플랫폼 보안의 일환으로 ACL에 의해 차단되었다. |
| B | 10.201.31.6이 현재 다른 인터페이스에 할당되어 있다. |
| C | 10.201.31.6이 해당 서브넷의 IP 범위에 속하지 않는다. |
| D | 10.201.31.6은 Amazon이 IP 네트워킹 목적으로 예약했다. |

**(A)** : ACL이 특정 IP 할당을 차단하는 방식은 아닙니다.

**(B) 정답** : IP가 이미 다른 네트워크 인터페이스에 할당된 경우 중복 할당이 불가합니다. 가장 현실적인 이유입니다.

**(C)** : 10.201.31.6은 10.201.31.0/24 범위 내에 있으므로 틀린 설명입니다.

**(D)** : AWS가 각 서브넷에서 예약하는 IP는 .0(네트워크), .1(VPC 라우터), .2(DNS), .3(예비), .255(브로드캐스트)입니다. .6은 예약 IP가 아닙니다.

**핵심 개념:** VPC IP 주소 할당, AWS 예약 IP 주소

---

### Q465. A user is planning to make a mobile game which can be played online or offline and will be hosted on EC2. The user wants to ensure that if someone breaks the highest score or they achieve some milestone they can inform all their colleagues through email. Which of the below mentioned AWS services helps achieve this goal?

**Options:**
- A) AWS Simple Workflow Service.
- B) AWS Simple Email Service.
- C) Amazon Cognito.
- D) AWS Simple Queue Service.

**Answer:** B

**해설:**

> **문제:** 사용자가 EC2에서 호스팅되는 모바일 게임을 만들려 합니다. 최고 점수 갱신이나 마일스톤 달성 시 동료들에게 이메일로 알리고 싶습니다. 이를 지원하는 AWS 서비스는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | AWS Simple Workflow Service |
| B | AWS Simple Email Service |
| C | Amazon Cognito |
| D | AWS Simple Queue Service |

**(A)** : SWF는 워크플로우 조율에 사용되며 이메일 발송이 주 목적이 아닙니다.

**(B) 정답** : AWS SES(Simple Email Service)는 이메일 발송을 위한 관리형 서비스로, 이벤트 발생 시 이메일 알림을 보내는 데 적합합니다.

**(C)** : Cognito는 사용자 인증 및 자격 증명 관리 서비스입니다.

**(D)** : SQS는 메시지 큐 서비스로 이메일 발송 기능이 없습니다.

**핵심 개념:** Amazon SES, 이메일 알림

---

### Q466. Is creating a Read Replica of another Read Replica supported?

**Options:**
- A) Only in VPC.
- B) Yes.
- C) Only in certain regions.
- D) No.

**Answer:** D

**해설:**

> **문제:** 다른 Read Replica의 Read Replica를 생성하는 것이 지원되나요?

| 선지 | 번역 |
|------|------|
| A | VPC에서만 가능하다. |
| B | 가능하다. |
| C | 특정 리전에서만 가능하다. |
| D | 불가능하다. |

**(A)** : VPC 유무와 관계없이 제한이 있습니다.

**(B)** : 표준 RDS에서는 지원되지 않습니다.

**(C)** : 리전에 따른 예외는 없습니다.

**(D) 정답** : 이 문제 출제 맥락에서 RDS Read Replica의 Read Replica 생성은 지원되지 않습니다. (단, Aurora는 다른 동작을 할 수 있으나 표준 RDS 맥락에서 정답입니다.)

**핵심 개념:** RDS Read Replica 제한 사항

---

### Q467. Which of the following is NOT a characteristic of Amazon Elastic Compute Cloud (Amazon EC2)?

**Options:**
- A) It can be used to launch as many or as few virtual servers as you need.
- B) It increases the need to forecast traffic by providing dynamic IP addresses for static cloud computing.
- C) It eliminates your need to invest in hardware up front, so you can develop and deploy applications faster.
- D) It offers scalable computing capacity in the Amazon Web Services (AWS) cloud.

**Answer:** B

**해설:**

> **문제:** Amazon EC2의 특성이 아닌 것은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 필요한 만큼 가상 서버를 시작하거나 줄일 수 있다. |
| B | 정적 클라우드 컴퓨팅을 위한 동적 IP 주소를 제공하여 트래픽 예측 필요성을 높인다. |
| C | 하드웨어 선투자 필요성을 제거하여 애플리케이션을 더 빠르게 개발하고 배포할 수 있다. |
| D | AWS 클라우드에서 확장 가능한 컴퓨팅 용량을 제공한다. |

**(A)** : EC2의 정확한 특성입니다. 탄력적으로 서버 수를 조정할 수 있습니다.

**(B) 정답** : EC2는 오히려 트래픽 예측 필요성을 줄여줍니다. 동적으로 확장/축소가 가능하므로 미리 트래픽을 예측하지 않아도 됩니다. 이 설명은 틀렸습니다.

**(C)** : EC2의 정확한 특성입니다.

**(D)** : EC2의 정확한 특성입니다.

**핵심 개념:** Amazon EC2 특성, 탄력적 컴퓨팅

---

### Q468. A user has launched one EC2 instance in the US East region and one in the US West region. The user has launched an RDS instance in the US East region. How can the user configure access from both the EC2 instances to RDS?

**Options:**
- A) It is not possible to access RDS of the US East region from the US West region.
- B) Configure the US West region's security group to allow a request from the US East region's instance and configure the RDS security group's ingress rule for the US East EC2 group.
- C) Configure the security group of the US East region to allow traffic from the US West region's instance and configure the RDS security group's ingress rule for the US East EC2 group.
- D) Configure the security group of both instances in the ingress rule of the RDS security group.

**Answer:** C

**해설:**

> **문제:** 사용자가 US East와 US West 각각에 EC2 인스턴스를 하나씩 시작했고, US East에 RDS 인스턴스를 시작했습니다. 두 EC2 인스턴스 모두 RDS에 접근하게 하려면 어떻게 해야 하나요?

| 선지 | 번역 |
|------|------|
| A | US West 리전에서 US East의 RDS에 접근하는 것은 불가능하다. |
| B | US West 리전의 보안 그룹에서 US East 인스턴스의 요청을 허용하고, RDS 보안 그룹의 인그레스 규칙에 US East EC2 그룹을 추가한다. |
| C | US East 리전의 보안 그룹에서 US West 인스턴스의 트래픽을 허용하고, RDS 보안 그룹의 인그레스 규칙에 US East EC2 그룹을 추가한다. |
| D | RDS 보안 그룹의 인그레스 규칙에 두 인스턴스의 보안 그룹을 모두 추가한다. |

**(A)** : 인터넷을 통해 접근 가능합니다.

**(B)** : 잘못된 방향입니다. US West 보안 그룹에서 US East를 허용하는 것은 의미가 없습니다.

**(C) 정답** : US East의 보안 그룹에서 US West EC2의 IP(공인 IP)에서 오는 트래픽을 허용하고, RDS 보안 그룹에는 US East EC2 보안 그룹을 인그레스 규칙에 추가합니다. 크로스 리전 접근은 IP 기반으로 허용해야 합니다.

**(D)** : 크로스 리전에서는 보안 그룹 참조가 아닌 IP CIDR 기반으로 접근을 허용해야 합니다.

**핵심 개념:** 크로스 리전 RDS 접근, 보안 그룹 설정

---

### Q469. What happens to the I/O operations while you take a database snapshot?

**Options:**
- A) I/O operations to the database are suspended for an hour while the backup is in progress.
- B) I/O operations to the database are sent to a Replica (if available) for a few minutes while the backup is in progress.
- C) I/O operations will be functioning normally.
- D) I/O operations to the database are suspended for a few minutes while the backup is in progress.

**Answer:** D

**해설:**

> **문제:** 데이터베이스 스냅샷을 찍는 동안 I/O 작업에 어떤 일이 발생하나요?

| 선지 | 번역 |
|------|------|
| A | 백업이 진행되는 동안 1시간 동안 I/O가 중단된다. |
| B | 백업 중 몇 분 동안 I/O 작업이 레플리카(있는 경우)로 전송된다. |
| C | I/O 작업은 정상적으로 작동한다. |
| D | 백업이 진행되는 동안 몇 분 동안 I/O 작업이 중단된다. |

**(A)** : 1시간 중단은 과도하며 부정확합니다.

**(B)** : I/O가 레플리카로 리디렉션되는 방식이 아닙니다.

**(C)** : Single-AZ RDS 스냅샷 시 I/O가 일시 중단됩니다.

**(D) 정답** : RDS Single-AZ 인스턴스에서 스냅샷 생성 시 I/O 작업이 잠시(수 분) 중단될 수 있습니다. Multi-AZ에서는 스탠바이에서 백업하여 영향을 최소화합니다.

**핵심 개념:** RDS 스냅샷, I/O 중단, Single-AZ vs Multi-AZ 백업

---

### Q470. When an EC2 EBS-backed (EBS root) instance is stopped, what happens to the data on any ephemeral store volumes?

**Options:**
- A) Data is automatically saved in an EBS volume.
- B) Data is unavailable until the instance is restarted.
- C) Data will be deleted and will no longer be accessible.
- D) Data is automatically saved as an EBS snapshot.

**Answer:** B

**해설:**

> **문제:** EC2 EBS 기반 인스턴스가 중지될 때, 임시 스토어(ephemeral store) 볼륨의 데이터에 어떤 일이 발생하나요?

| 선지 | 번역 |
|------|------|
| A | 데이터가 EBS 볼륨에 자동 저장된다. |
| B | 인스턴스가 재시작될 때까지 데이터에 접근할 수 없다. |
| C | 데이터가 삭제되어 더 이상 접근할 수 없다. |
| D | 데이터가 EBS 스냅샷으로 자동 저장된다. |

**(A)** : 임시 스토어 데이터는 EBS에 자동 저장되지 않습니다.

**(B) 정답** : 이 문제의 공식 정답이나, 실제로는 인스턴스 스토어(ephemeral) 데이터는 인스턴스 중지 시 영구적으로 손실됩니다. 문제의 의도는 "stop" 후 "start"를 재시작으로 해석할 경우 데이터가 사라진다는 맥락으로 보입니다.

**(C)** : 실제 동작에 더 가깝습니다. 인스턴스 스토어는 stop/terminate 시 데이터가 삭제됩니다.

**(D)** : EBS 스냅샷으로 자동 저장되지 않습니다.

**핵심 개념:** EC2 Instance Store(임시 스토어), 데이터 영속성, EBS vs Instance Store

---

### Q471. [...] is a durable, block-level storage volume that you can attach to a single, running Amazon EC2 instance.

**Options:**
- A) Amazon S3.
- B) Amazon EBS.
- C) None of these.
- D) All of these.

**Answer:** B

**해설:**

> **문제:** 단일 실행 중인 Amazon EC2 인스턴스에 연결할 수 있는 내구성 있는 블록 레벨 스토리지 볼륨은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | Amazon S3 |
| B | Amazon EBS |
| C | 해당 없음 |
| D | 모두 해당 |

**(A)** : S3는 객체 스토리지로 블록 레벨 스토리지가 아닙니다.

**(B) 정답** : Amazon EBS(Elastic Block Store)는 EC2 인스턴스에 연결 가능한 내구성 있는 블록 레벨 스토리지입니다.

**(C)** : EBS가 정확히 해당되므로 틀렸습니다.

**(D)** : S3는 해당되지 않으므로 틀렸습니다.

**핵심 개념:** Amazon EBS, 블록 스토리지

---

### Q472. A favored client needs you to quickly deploy a database that is a relational database service with minimal administration as he wants to spend the least amount of time administering it. Which database would be the best option?

**Options:**
- A) Amazon SimpleDB.
- B) Your choice of relational AMIs on Amazon EC2 and EB.
- C) Amazon RDS.
- D) Amazon Redshift.

**Answer:** C

**해설:**

> **문제:** 클라이언트가 관리를 최소화하면서 빠르게 관계형 데이터베이스를 배포하고 싶어합니다. 가장 적합한 옵션은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | Amazon SimpleDB |
| B | Amazon EC2와 Elastic Beanstalk에서 선택한 관계형 AMI |
| C | Amazon RDS |
| D | Amazon Redshift |

**(A)** : SimpleDB는 NoSQL 데이터베이스 서비스로 관계형 데이터베이스가 아닙니다.

**(B)** : EC2에 직접 설치하는 방식은 관리 부담이 크며, 최소 관리 요구 사항에 맞지 않습니다.

**(C) 정답** : Amazon RDS는 완전 관리형 관계형 데이터베이스 서비스로 패치, 백업, 복제 등을 AWS가 처리합니다.

**(D)** : Redshift는 데이터 웨어하우스(OLAP)로 트랜잭션 처리(OLTP) 용도에 적합하지 않습니다.

**핵심 개념:** Amazon RDS, 관리형 관계형 데이터베이스

---

### Q473. You have a number of image files to encode. In an Amazon SQS worker queue, you create an Amazon SQS message for each file specifying the command (jpeg-encode) and the location of the file in Amazon S3. Which of the following statements best describes the functionality of Amazon SQS?

**Options:**
- A) Amazon SQS is a distributed queuing system that is optimized for horizontal scalability, not for single-threaded sending or receiving speeds.
- B) Amazon SQS is for single-threaded sending or receiving speeds.
- C) Amazon SQS is a non-distributed queuing system.
- D) Amazon SQS is a distributed queuing system that is optimized for vertical scalability and for single-threaded sending or receiving speeds.

**Answer:** A

**해설:**

> **문제:** S3에 저장된 이미지 파일들을 인코딩하기 위해 SQS 작업 큐를 사용합니다. Amazon SQS의 기능을 가장 잘 설명하는 것은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | Amazon SQS는 수평 확장에 최적화된 분산 큐 시스템이며, 단일 스레드 전송/수신 속도에는 최적화되어 있지 않다. |
| B | Amazon SQS는 단일 스레드 전송/수신 속도를 위한 것이다. |
| C | Amazon SQS는 비분산 큐 시스템이다. |
| D | Amazon SQS는 수직 확장에 최적화된 분산 큐 시스템으로 단일 스레드에 최적화되어 있다. |

**(A) 정답** : SQS는 수평 확장성(여러 소비자가 병렬로 처리)에 최적화된 분산 큐 시스템입니다. 단일 스레드 처리보다 대규모 병렬 처리에 적합합니다.

**(B)** : SQS는 단일 스레드가 아닌 수평 확장을 위한 서비스입니다.

**(C)** : SQS는 분산 시스템입니다.

**(D)** : SQS는 수직 확장이 아닌 수평 확장에 최적화되어 있습니다.

**핵심 개념:** Amazon SQS, 분산 큐, 수평 확장성

---

### Q474. While creating an Amazon RDS DB, your first task is to set up a DB [...] that controls what IP addresses or EC2 instances have access to your DB Instance.

**Options:**
- A) Security Pool.
- B) Secure Zone.
- C) Security Token Pool.
- D) Security Group.

**Answer:** D

**해설:**

> **문제:** Amazon RDS DB를 생성할 때, 어떤 IP 주소 또는 EC2 인스턴스가 DB 인스턴스에 접근할 수 있는지 제어하는 DB [...]를 설정하는 것이 첫 번째 작업입니다.

| 선지 | 번역 |
|------|------|
| A | Security Pool |
| B | Secure Zone |
| C | Security Token Pool |
| D | Security Group (보안 그룹) |

**(A)** : 존재하지 않는 개념입니다.

**(B)** : 존재하지 않는 개념입니다.

**(C)** : 존재하지 않는 개념입니다.

**(D) 정답** : RDS 인스턴스 접근 제어는 보안 그룹(Security Group)을 통해 이루어집니다. VPC 보안 그룹에서 인바운드 규칙을 설정하여 접근을 제어합니다.

**핵심 개념:** RDS 보안 그룹, 접근 제어

---

### Q475. After launching an instance that you intend to serve as a NAT (Network Address Translation) device in a public subnet you modify your route tables to have the NAT device be the target of internet bound traffic of your private subnet. When you try and make an outbound connection to the internet from an instance in the private subnet, you are not successful. Which of the following steps could resolve the issue?

**Options:**
- A) Disabling the Source/Destination Check attribute on the NAT instance.
- B) Attaching an Elastic IP address to the instance in the private subnet.
- C) Attaching a second Elastic Network Interface (ENI) to the NAT instance, and placing it in the private subnet.
- D) Attaching a second Elastic Network Interface (ENI) to the instance in the private subnet, and placing it in the public subnet.

**Answer:** A

**해설:**

> **문제:** 퍼블릭 서브넷에 NAT 인스턴스를 시작하고 라우트 테이블을 수정했지만, 프라이빗 서브넷 인스턴스에서 인터넷 아웃바운드 연결이 되지 않습니다. 문제를 해결하는 단계는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | NAT 인스턴스의 소스/대상 확인(Source/Destination Check) 속성을 비활성화한다. |
| B | 프라이빗 서브넷 인스턴스에 Elastic IP를 연결한다. |
| C | NAT 인스턴스에 두 번째 ENI를 연결하고 프라이빗 서브넷에 배치한다. |
| D | 프라이빗 서브넷 인스턴스에 두 번째 ENI를 연결하고 퍼블릭 서브넷에 배치한다. |

**(A) 정답** : NAT 인스턴스는 자신에게 향하지 않은 트래픽을 전달해야 합니다. 이를 위해 Source/Destination Check를 반드시 비활성화해야 합니다. 이것이 가장 흔한 NAT 인스턴스 설정 누락 사항입니다.

**(B)** : 프라이빗 서브넷 인스턴스에 EIP를 붙이는 것은 NAT 목적과 맞지 않습니다.

**(C)** : NAT 인스턴스에 별도 ENI 추가 없이도 Source/Destination Check 비활성화로 해결됩니다.

**(D)** : 프라이빗 인스턴스를 퍼블릭으로 만드는 것은 보안상 적절하지 않습니다.

**핵심 개념:** NAT 인스턴스, Source/Destination Check 비활성화

---

### Q476. Which of the following would you use to list your AWS Import/Export jobs?

**Options:**
- A) Amazon RDS.
- B) AWS Import/Export Web Service Tool.
- C) Amazon S3 REST API.
- D) AWS Elastic Beanstalk.

**Answer:** C

**해설:**

> **문제:** AWS Import/Export 작업 목록을 확인하려면 무엇을 사용하나요?

| 선지 | 번역 |
|------|------|
| A | Amazon RDS |
| B | AWS Import/Export Web Service Tool |
| C | Amazon S3 REST API |
| D | AWS Elastic Beanstalk |

**(A)** : RDS는 관계형 데이터베이스 서비스로 Import/Export 작업 목록과 무관합니다.

**(B)** : AWS Import/Export Web Service Tool은 존재하지 않는 서비스명입니다.

**(C) 정답** : AWS Import/Export 작업은 Amazon S3 REST API를 통해 관리(목록 조회 포함)됩니다.

**(D)** : Elastic Beanstalk는 애플리케이션 배포 서비스로 무관합니다.

**핵심 개념:** AWS Import/Export, S3 REST API

---

### Q477. Company B is launching a new game app for mobile devices. Users will log into the game using their existing social media account to streamline data capture. Company B would like to directly save player data and scoring information from the mobile app to a DynamoDB table named Score Data. When a user saves their game, the progress data will be stored to the Game State S3 bucket. What is the best approach for storing data to DynamoDB and S3?

**Options:**
- A) Use an EC2 Instance that is launched with an EC2 role providing access to the Score Data DynamoDB table and the GameState S3 bucket that communicates with the mobile app via web services.
- B) Use temporary security credentials that assume a role providing access to the Score Data DynamoDB table and the Game State S3 bucket using web identity federation.
- C) Use Login with Amazon allowing users to sign in with an Amazon account providing the mobile app with access to the Score Data DynamoDB table and the Game State S3 bucket.
- D) Use an IAM user with access credentials assigned a role providing access to the Score Data DynamoDB table and the Game State S3 bucket for distribution with the mobile app.

**Answer:** B

**해설:**

> **문제:** 모바일 게임 앱에서 소셜 미디어 계정으로 로그인하여 DynamoDB와 S3에 데이터를 저장하려 합니다. 가장 적합한 접근 방식은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스에 역할을 부여하고 웹 서비스를 통해 모바일 앱과 통신한다. |
| B | 웹 자격 증명 페더레이션을 사용하여 역할을 수임하는 임시 보안 자격 증명을 사용한다. |
| C | Amazon 계정으로 로그인하여 모바일 앱에 DynamoDB 및 S3 접근을 제공한다. |
| D | IAM 사용자 접근 자격 증명을 모바일 앱에 배포하여 역할을 부여한다. |

**(A)** : EC2를 중간 레이어로 사용하면 불필요한 비용과 복잡성이 추가됩니다.

**(B) 정답** : 웹 자격 증명 페더레이션(Web Identity Federation)을 사용하면 소셜 미디어 자격 증명으로 STS를 통해 임시 AWS 자격 증명을 얻어 DynamoDB와 S3에 직접 접근할 수 있습니다. 이는 모바일 앱에 가장 적합하고 보안적인 방식입니다.

**(C)** : Amazon 로그인만으로는 DynamoDB/S3 접근 권한이 자동으로 부여되지 않습니다.

**(D)** : IAM 사용자 자격 증명을 모바일 앱에 포함하는 것은 심각한 보안 위험입니다.

**핵심 개념:** Web Identity Federation, STS 임시 자격 증명, 모바일 앱 AWS 접근

---

### Q478. If your DB instance runs out of storage space or file system resources, its status will change to [...] and your DB Instance will no longer be available.

**Options:**
- A) storage-overflow.
- B) storage-full.
- C) storage-exceed.
- D) storage-overage.

**Answer:** B

**해설:**

> **문제:** DB 인스턴스의 스토리지 공간 또는 파일 시스템 리소스가 부족하면 상태가 [...]로 변경되고 DB 인스턴스를 더 이상 사용할 수 없게 됩니다.

| 선지 | 번역 |
|------|------|
| A | storage-overflow |
| B | storage-full |
| C | storage-exceed |
| D | storage-overage |

**(A)** : AWS RDS에서 사용하지 않는 상태 값입니다.

**(B) 정답** : RDS에서 스토리지가 가득 차면 상태가 `storage-full`로 변경되며 DB를 사용할 수 없게 됩니다.

**(C)** : AWS RDS에서 사용하지 않는 상태 값입니다.

**(D)** : AWS RDS에서 사용하지 않는 상태 값입니다.

**핵심 개념:** RDS 스토리지 상태, storage-full

---

### Q479. Your application is using an ELB in front of an Auto Scaling group of web/application servers deployed across two AZs and a Multi-AZ RDS Instance for data persistence. The database CPU is often above 80% usage and 90% of I/O operations on the database are reads. To improve performance you recently added a single-node Memcached ElastiCache Cluster to cache frequent DB query results. In the next weeks the overall workload is expected to grow by 30%. Do you need to change anything in the architecture to maintain the high availability of the application with the anticipated additional load? Why?

**Options:**
- A) Yes, you should deploy two Memcached ElastiCache Clusters in different AZs because the RDS instance will not be able to handle the load if the cache node fails.
- B) No, if the cache node fails you can always get the same data from the DB without having any availability impact.
- C) No, if the cache node fails the automated ElastiCache node recovery feature will prevent any availability impact.
- D) Yes, you should deploy the Memcached ElastiCache Cluster with two nodes in the same AZ as the RDS DB master instance to handle the load if one cache node fails.

**Answer:** A

**해설:**

> **문제:** ELB + Auto Scaling + Multi-AZ RDS 구성에서 DB CPU가 80% 이상이고 I/O의 90%가 읽기입니다. 단일 노드 Memcached ElastiCache를 추가했고 워크로드가 30% 증가할 예정입니다. 고가용성을 유지하기 위해 아키텍처를 변경해야 하나요?

| 선지 | 번역 |
|------|------|
| A | 예, 캐시 노드 장애 시 RDS가 부하를 감당할 수 없으므로 다른 AZ에 두 개의 Memcached 클러스터를 배포해야 한다. |
| B | 아니요, 캐시 노드 장애 시 DB에서 동일한 데이터를 가져올 수 있어 가용성 영향이 없다. |
| C | 아니요, 캐시 노드 장애 시 ElastiCache의 자동 노드 복구 기능이 가용성 영향을 방지한다. |
| D | 예, RDS 마스터와 동일한 AZ에 두 노드의 Memcached 클러스터를 배포해야 한다. |

**(A) 정답** : 단일 노드 Memcached가 실패하면 모든 캐시 트래픽이 DB로 몰립니다. DB는 이미 80% CPU 사용 중이므로 추가 30% 부하 증가 시 감당하기 어렵습니다. 서로 다른 AZ에 여러 캐시 노드를 배포하여 고가용성을 확보해야 합니다.

**(B)** : 캐시 미스 시 DB가 부하를 감당할 수 없어 가용성 영향이 발생합니다.

**(C)** : Memcached는 자동 노드 복구를 지원하지 않습니다(Redis는 지원). Memcached 노드 장애 시 데이터가 손실됩니다.

**(D)** : 같은 AZ에 두 노드를 배포하면 AZ 장애 시 전체 캐시가 손실됩니다. 다른 AZ에 분산해야 합니다.

**핵심 개념:** ElastiCache Memcached 고가용성, 캐시 노드 장애, Multi-AZ 배포

---

### Q480. How many Elastic IP by default in Amazon Account?

**Options:**
- A) 1 Elastic IP.
- B) 3 Elastic IP.
- C) 5 Elastic IP.
- D) 0 Elastic IP.

**Answer:** D

**해설:**

> **문제:** Amazon 계정의 기본 Elastic IP 개수는 몇 개인가요?

| 선지 | 번역 |
|------|------|
| A | 1개 |
| B | 3개 |
| C | 5개 |
| D | 0개 |

**(A)** : 기본 제공 개수가 아닙니다.

**(B)** : 기본 제공 개수가 아닙니다.

**(C)** : 리전당 5개의 EIP 한도가 있으나, 자동으로 제공되지는 않습니다.

**(D) 정답** : EIP는 기본적으로 0개이며 필요 시 할당해야 합니다. 리전당 최대 5개까지 할당 가능합니다(한도 증가 요청 가능).

**핵심 개념:** Elastic IP 기본 개수 및 리전당 한도

---

### Q481. What would be the best way to retrieve the public IP address of your EC2 instance using the CLI?

**Options:**
- A) Using tags.
- B) Using traceroute.
- C) Using ipconfig.
- D) Using instance metadata.

**Answer:** D

**해설:**

> **문제:** CLI를 사용하여 EC2 인스턴스의 공인 IP 주소를 가져오는 가장 좋은 방법은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 태그 사용 |
| B | traceroute 사용 |
| C | ipconfig 사용 |
| D | 인스턴스 메타데이터 사용 |

**(A)** : 태그는 IP 주소 정보를 저장하지 않습니다.

**(B)** : traceroute는 네트워크 경로 추적 도구로 공인 IP 조회에 적합하지 않습니다.

**(C)** : ipconfig는 Windows OS 명령어로 내부 IP를 보여주며 공인 IP는 표시되지 않습니다.

**(D) 정답** : EC2 인스턴스 내에서 `curl http://169.254.169.254/latest/meta-data/public-ipv4` 명령으로 인스턴스 메타데이터 서비스를 통해 공인 IP를 조회할 수 있습니다.

**핵심 개념:** EC2 인스턴스 메타데이터, IMDS(Instance Metadata Service)

---

### Q482. A company is building a two-tier web application to serve dynamic transaction-based content. The data tier is leveraging an Online Transactional Processing (OLTP) database. What services should you leverage to enable an elastic and scalable web tier?

**Options:**
- A) Elastic Load Balancing, Amazon EC2, and Auto Scaling.
- B) Elastic Load Balancing, Amazon RDS with Multi-AZ, and Amazon S3.
- C) Amazon RDS with Multi-AZ and Auto Scaling.
- D) Amazon EC2, Amazon DynamoDB, and Amazon S3.

**Answer:** A

**해설:**

> **문제:** 동적 트랜잭션 기반 콘텐츠를 제공하는 2계층 웹 애플리케이션을 구축합니다. 데이터 계층은 OLTP 데이터베이스를 사용합니다. 탄력적이고 확장 가능한 웹 계층을 위해 어떤 서비스를 활용해야 하나요?

| 선지 | 번역 |
|------|------|
| A | Elastic Load Balancing, Amazon EC2, Auto Scaling |
| B | Elastic Load Balancing, Amazon RDS Multi-AZ, Amazon S3 |
| C | Amazon RDS Multi-AZ, Auto Scaling |
| D | Amazon EC2, Amazon DynamoDB, Amazon S3 |

**(A) 정답** : 탄력적이고 확장 가능한 웹 계층을 위한 핵심 3요소입니다. ELB로 트래픽 분산, EC2로 웹 서버 실행, Auto Scaling으로 자동 확장/축소를 구현합니다.

**(B)** : RDS Multi-AZ와 S3는 데이터 계층에 해당하며, 웹 계층 확장성을 위한 구성이 아닙니다.

**(C)** : RDS는 데이터 계층이며 웹 계층 구성이 없습니다.

**(D)** : DynamoDB와 S3는 데이터 계층 옵션이며 웹 계층 탄력성을 제공하지 않습니다.

**핵심 개념:** ELB + EC2 + Auto Scaling, 탄력적 웹 계층 구성

---

### Q483. You are designing a connectivity solution between on-premises infrastructure and Amazon VPC. Your servers on-premises will be communicating with your VPC instances. You will be establishing IPSec tunnels over the internet. You will be using VPN gateways and terminating the IPsec tunnels on AWS supported customer gateways. Which of the following objectives would you achieve by implementing an IPSec tunnel as outlined above? (Choose 4 answers)

**Options:**
- A) End-to-end protection of data in transit.
- B) End-to-end Identity authentication.
- C) Data encryption across the Internet.
- D) Protection of data in transit over the Internet.
- E) Peer identity authentication between VPN gateway and customer gateway.
- F) Data integrity protection across the Internet.

**Answer:** C, D, E, F

**해설:**

> **문제:** 온프레미스와 Amazon VPC 간 IPSec 터널을 구성합니다. VPN 게이트웨이와 AWS 지원 고객 게이트웨이를 사용합니다. IPSec 터널 구현으로 달성할 수 있는 목표 4가지를 고르시오.

| 선지 | 번역 |
|------|------|
| A | 전송 중 데이터의 엔드투엔드 보호 |
| B | 엔드투엔드 신원 인증 |
| C | 인터넷을 통한 데이터 암호화 |
| D | 인터넷을 통한 전송 중 데이터 보호 |
| E | VPN 게이트웨이와 고객 게이트웨이 간 피어 신원 인증 |
| F | 인터넷을 통한 데이터 무결성 보호 |

**(A)** : IPSec은 VPN 게이트웨이에서 종료되므로 진정한 엔드투엔드 보호가 아닙니다(EC2 인스턴스까지 연장되지 않음).

**(B)** : 엔드투엔드 신원 인증은 VPN 게이트웨이와 고객 게이트웨이 간에만 이루어지며 실제 엔드포인트(서버)까지는 아닙니다.

**(C) 정답** : IPSec은 인터넷을 통한 데이터 암호화를 제공합니다.

**(D) 정답** : IPSec은 인터넷 구간에서 전송 중 데이터를 보호합니다.

**(E) 정답** : IPSec은 VPN 게이트웨이와 고객 게이트웨이 간 피어 인증을 제공합니다.

**(F) 정답** : IPSec은 데이터 무결성 보호(HMAC 등)를 제공합니다.

**핵심 개념:** IPSec VPN, 데이터 암호화, 전송 보호, 피어 인증, 무결성

---

### Q484. You have been storing massive amounts of data on Amazon Glacier for the past 2 years and now start to wonder if there are any limitations on this. What is the correct answer to your question?

**Options:**
- A) The total volume of data is limited but the number of archives you can store are unlimited.
- B) The total volume of data is unlimited but the number of archives you can store are limited.
- C) The total volume of data and number of archives you can store are unlimited.
- D) The total volume of data is limited and the number of archives you can store are limited.

**Answer:** C

**해설:**

> **문제:** Amazon Glacier에 2년간 대량의 데이터를 저장하고 있습니다. 제한이 있는지 궁금합니다. 정답은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 총 데이터 볼륨은 제한되지만 저장할 수 있는 아카이브 수는 무제한이다. |
| B | 총 데이터 볼륨은 무제한이지만 저장할 수 있는 아카이브 수는 제한된다. |
| C | 저장할 수 있는 총 데이터 볼륨과 아카이브 수 모두 무제한이다. |
| D | 총 데이터 볼륨과 아카이브 수 모두 제한된다. |

**(A)** : 데이터 볼륨도 무제한입니다.

**(B)** : 아카이브 수도 무제한입니다.

**(C) 정답** : Amazon S3 Glacier(구 Amazon Glacier)는 저장할 수 있는 총 데이터 볼륨과 아카이브 수에 제한이 없습니다.

**(D)** : 둘 다 제한이 없습니다.

**핵심 개념:** Amazon S3 Glacier 저장 한도, 무제한 아카이브

---

### Q485. How are the EBS snapshots saved on Amazon S3?

**Options:**
- A) Exponentially.
- B) Incrementally.
- C) EBS snapshots are not stored in the Amazon S3.
- D) Decrementally.

**Answer:** B

**해설:**

> **문제:** EBS 스냅샷은 Amazon S3에 어떻게 저장되나요?

| 선지 | 번역 |
|------|------|
| A | 지수적으로(Exponentially) |
| B | 증분 방식으로(Incrementally) |
| C | EBS 스냅샷은 Amazon S3에 저장되지 않는다. |
| D | 감소 방식으로(Decrementally) |

**(A)** : 지수적 저장 방식은 존재하지 않습니다.

**(B) 정답** : EBS 스냅샷은 증분 방식(incremental)으로 S3에 저장됩니다. 첫 번째 스냅샷은 전체 데이터를 저장하고, 이후 스냅샷은 변경된 블록만 저장합니다.

**(C)** : EBS 스냅샷은 S3에 저장됩니다(사용자가 직접 접근하는 S3 버킷은 아님).

**(D)** : 감소 방식 저장은 존재하지 않습니다.

**핵심 개념:** EBS 스냅샷, 증분 백업(Incremental Backup)

---

### Q486. An online gaming site asked you if you can deploy a database that is a fast, highly scalable NoSQL database service in AWS for a new site that he wants to build. Which database should you recommend?

**Options:**
- A) Amazon DynamoDB.
- B) Amazon RDS.
- C) Amazon Redshift.
- D) Amazon SimpleDB.

**Answer:** A

**해설:**

> **문제:** 온라인 게임 사이트에서 빠르고 확장성이 높은 NoSQL 데이터베이스 서비스를 원합니다. 어떤 데이터베이스를 추천하시겠습니까?

| 선지 | 번역 |
|------|------|
| A | Amazon DynamoDB |
| B | Amazon RDS |
| C | Amazon Redshift |
| D | Amazon SimpleDB |

**(A) 정답** : Amazon DynamoDB는 밀리초 단위 성능의 완전 관리형 NoSQL 데이터베이스로, 게임과 같이 높은 확장성과 빠른 응답이 필요한 워크로드에 적합합니다.

**(B)** : RDS는 관계형(SQL) 데이터베이스 서비스입니다.

**(C)** : Redshift는 데이터 웨어하우스(OLAP) 서비스로 게임 실시간 데이터 처리에 적합하지 않습니다.

**(D)** : SimpleDB는 오래된 NoSQL 서비스로 현재는 DynamoDB가 권장됩니다.

**핵심 개념:** Amazon DynamoDB, NoSQL, 고성능 게임 데이터베이스

---

### Q487. You have three Amazon EC2 instances with Elastic IP addresses in the US East (Virginia) region, and you want to distribute requests across all three IPs evenly for users for whom US East (Virginia) is the appropriate region. How many EC2 instances would be sufficient to distribute requests in other regions?

**Options:**
- A) 3.
- B) 9.
- C) 2.
- D) 1.

**Answer:** D

**해설:**

> **문제:** US East(Virginia) 리전에 EIP를 가진 EC2 인스턴스 3개가 있고, 이 리전이 적절한 사용자에게 트래픽을 균등 분배하고 싶습니다. 다른 리전에서 요청을 분산하기에 충분한 EC2 인스턴스 수는 몇 개인가요?

| 선지 | 번역 |
|------|------|
| A | 3개 |
| B | 9개 |
| C | 2개 |
| D | 1개 |

**(A)** : 다른 리전에 3개씩 필요하지 않습니다.

**(B)** : 9개는 과도합니다.

**(C)** : 2개도 필요하지 않습니다.

**(D) 정답** : 다른 리전 사용자는 지리적으로 가까운 리전으로 라우팅되므로, 각 리전마다 최소 1개의 인스턴스면 충분합니다. Route 53의 지연 시간 기반 라우팅 등을 사용하면 리전별 1개로 요청을 처리할 수 있습니다.

**핵심 개념:** Route 53 지연 시간 기반 라우팅, 멀티 리전 아키텍처

---

### Q488. You are the new IT architect in a company that operates a mobile sleep tracking application. When activated at night, the mobile app is sending collected data points of 1 kilobyte every 5 minutes to your backend. The backend takes care of authenticating the user and writing the data points into an Amazon DynamoDB table. Every morning, you scan the table to extract and aggregate last night's data on a per user basis, and store the results in Amazon S3. Users are notified via Amazon SNS mobile push notifications that new data is available, which is parsed and visualized by the mobile app. Currently you have around 100k users who are mostly based out of North America. You have been tasked to optimize the architecture of the backend system to lower cost. What would you recommend? (Choose 2 answers)

**Options:**
- A) Create a new Amazon DynamoDB table each day and drop the one for the previous day after its data is on Amazon S3.
- B) Have the mobile app access Amazon DynamoDB directly instead of JSON files stored on Amazon S3.
- C) Introduce an Amazon SQS queue to buffer writes to the Amazon DynamoDB table and reduce provisioned write throughput.
- D) Introduce Amazon Elasticache to cache reads from the Amazon DynamoDB table and reduce provisioned read throughput.
- E) Write data directly into an Amazon Redshift cluster replacing both Amazon DynamoDB and Amazon S3.

**Answer:** A, C

**해설:**

> **문제:** 모바일 수면 추적 앱에서 100k 사용자가 5분마다 1KB 데이터를 전송합니다. DynamoDB에 저장 후 매일 아침 S3로 집계합니다. 비용 최적화를 위한 권장 사항 2가지는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 매일 새 DynamoDB 테이블을 생성하고 S3에 데이터를 옮긴 후 이전 테이블을 삭제한다. |
| B | 모바일 앱이 S3 JSON 파일 대신 DynamoDB에 직접 접근하게 한다. |
| C | SQS 큐를 도입하여 DynamoDB 쓰기를 버퍼링하고 프로비저닝된 쓰기 처리량을 줄인다. |
| D | ElastiCache를 도입하여 DynamoDB 읽기를 캐시하고 프로비저닝된 읽기 처리량을 줄인다. |
| E | Amazon Redshift 클러스터로 DynamoDB와 S3를 모두 대체한다. |

**(A) 정답** : 매일 새 테이블을 생성하면 스캔 비용을 줄이고(작은 테이블), 이전 데이터를 S3로 이전 후 테이블을 삭제하여 DynamoDB 스토리지 비용을 절감할 수 있습니다.

**(B)** : DynamoDB 직접 접근은 읽기 처리량 비용이 증가하여 비용 최적화에 역효과입니다.

**(C) 정답** : SQS로 쓰기를 버퍼링하면 DynamoDB의 프로비저닝된 쓰기 용량을 낮게 유지할 수 있어 비용을 절감합니다. 피크 시간대 쓰기를 평탄화(smoothing)합니다.

**(D)** : 매일 아침 한 번만 읽기(스캔)가 발생하므로 ElastiCache를 추가하는 비용 대비 효과가 없습니다.

**(E)** : Redshift는 스트리밍 소량 쓰기에 적합하지 않으며 비용이 더 높을 수 있습니다.

**핵심 개념:** DynamoDB 비용 최적화, SQS 버퍼링, 일별 테이블 패턴

---

### Q489. You are implementing a URL whitelisting system for a company that wants to restrict outbound HTTPS connections to specific domains from their EC2-hosted applications. You deploy a single EC2 instance running proxy software and configure it to accept traffic from all subnets and EC2 instances in the VPC. You configure the proxy to only pass through traffic to domains that you define in its whitelist configuration. You have a nightly maintenance window of 10 minutes where all instances fetch new software updates. Each update is about 200MB in size and there are 500 instances in the VPC that routinely fetch updates. After a few days you notice that some machines are failing to successfully download some, but not all of their updates within the maintenance window. The download URLs used for these updates are correctly listed in the proxy's whitelist configuration and you are able to access them manually using a web browser on the instances. What might be happening? (Choose 2 answers)

**Options:**
- A) You are running the proxy on an undersized EC2 instance type so network throughput is not sufficient for all instances to download their updates in time.
- B) You are running the proxy on a sufficiently-sized EC2 instance in a private subnet and its network throughput is being throttled by a NAT running on an undersized EC2 instance.
- C) The route table for the subnets containing the affected EC2 instances is not configured to direct network traffic for the software update locations to the proxy.
- D) You have not allocated enough storage to the EC2 instance running the proxy so the network buffer is filling up, causing some requests to fail.
- E) You are running the proxy in a public subnet but have not allocated enough EIPs to support the needed network throughput through the Internet Gateway (IGW).

**Answer:** A, B

**해설:**

> **문제:** URL 화이트리스팅 프록시를 단일 EC2 인스턴스로 구성했습니다. 500개 인스턴스가 10분 유지 창에서 200MB 업데이트를 다운로드합니다. 일부 인스턴스가 업데이트를 완료하지 못합니다. 가능한 원인 2가지는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 프록시가 너무 작은 EC2 인스턴스 타입에서 실행되어 모든 인스턴스가 제때 업데이트를 완료하기에 네트워크 처리량이 부족하다. |
| B | 프록시가 프라이빗 서브넷의 적절한 크기 EC2에서 실행되지만, 너무 작은 NAT 인스턴스로 인해 처리량이 제한된다. |
| C | 영향을 받은 EC2 인스턴스가 포함된 서브넷의 라우트 테이블이 소프트웨어 업데이트 트래픽을 프록시로 향하도록 설정되어 있지 않다. |
| D | 프록시 EC2 인스턴스에 충분한 스토리지를 할당하지 않아 네트워크 버퍼가 가득 차 일부 요청이 실패한다. |
| E | 프록시가 퍼블릭 서브넷에서 실행되지만 IGW를 통해 필요한 처리량을 지원하기 위한 EIP가 충분하지 않다. |

**(A) 정답** : 500개 인스턴스 × 200MB = 100GB를 10분(600초) 내에 처리해야 합니다. 단일 프록시 인스턴스 타입이 너무 작으면 네트워크 병목이 발생합니다.

**(B) 정답** : 프록시가 프라이빗 서브넷에 있고 NAT 인스턴스를 통해 인터넷에 연결된다면, 작은 NAT 인스턴스가 병목이 될 수 있습니다.

**(C)** : URL은 브라우저로 수동 접근 가능하다고 했으므로 라우팅은 정상입니다.

**(D)** : 네트워크 버퍼는 스토리지가 아닌 메모리와 관련되며, 스토리지 부족이 주요 원인이 아닙니다.

**(E)** : EIP 수는 네트워크 처리량에 영향을 주지 않습니다. IGW는 처리량 제한이 없습니다.

**핵심 개념:** 네트워크 처리량 병목, 프록시 인스턴스 크기, NAT 인스턴스 처리량

---

### Q490. You are playing around with setting up stacks using JSON templates in CloudFormation to try and understand them a little better. You have set up about 5 or 6 but now start to wonder if you are being charged for these stacks. What is AWS's billing policy regarding stack resources?

**Options:**
- A) You are not charged for the stack resources if they are not taking any traffic.
- B) You are charged for the stack resources for the time they were operating (even if you deleted the stack right away).
- C) You are charged for the stack resources for the time they were operating (but not if you deleted the stack within 60 minutes).
- D) You are charged for the stack resources for the time they were operating (but not if you deleted the stack within 30 minutes).

**Answer:** B

**해설:**

> **문제:** CloudFormation JSON 템플릿으로 스택을 5~6개 설정했습니다. 이 스택들에 대한 요금이 청구되는지 궁금합니다. AWS의 스택 리소스 청구 정책은 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 트래픽이 없으면 스택 리소스에 요금이 청구되지 않는다. |
| B | 스택을 즉시 삭제해도 운영된 시간만큼 스택 리소스에 요금이 청구된다. |
| C | 60분 내에 스택을 삭제하면 요금이 청구되지 않는다. |
| D | 30분 내에 스택을 삭제하면 요금이 청구되지 않는다. |

**(A)** : 트래픽 유무와 관계없이 리소스가 존재하는 동안 요금이 청구됩니다.

**(B) 정답** : CloudFormation 자체는 무료이지만, 스택으로 생성된 리소스(EC2, RDS 등)는 운영된 시간만큼 요금이 청구됩니다. 즉시 삭제해도 운영 시간에 대한 요금은 발생합니다.

**(C)** : 60분 유예 정책은 없습니다.

**(D)** : 30분 유예 정책도 없습니다.

**핵심 개념:** CloudFormation 요금 정책, 리소스 사용 시간 청구

---

### Q491. What does Amazon Cloud Formation provide?

**Options:**
- A) The ability to setup Autoscaling for Amazon EC2 instances.
- B) None of these.
- C) A templated resource creation for Amazon Web Services.
- D) A template to map network resources for Amazon Web Services.

**Answer:** D

**해설:**

> **문제:** Amazon CloudFormation은 무엇을 제공하나요?

| 선지 | 번역 |
|------|------|
| A | Amazon EC2 인스턴스에 대한 Auto Scaling 설정 기능 |
| B | 위 항목 중 해당 없음 |
| C | AWS를 위한 템플릿 기반 리소스 생성 |
| D | AWS 네트워크 리소스를 매핑하는 템플릿 |

**(A)** : Auto Scaling은 CloudFormation의 일부 기능이지만 전체 기능을 설명하지 않습니다.

**(B)** : CloudFormation은 명확한 기능이 있습니다.

**(C)** : 내용적으로 맞지만 이 문제에서는 D가 정답으로 처리됩니다.

**(D) 정답** : CloudFormation은 AWS 인프라 리소스를 템플릿(JSON/YAML)으로 정의하고 자동으로 프로비저닝하는 IaC(Infrastructure as Code) 서비스입니다.

**핵심 개념:** AWS CloudFormation, Infrastructure as Code, 템플릿 기반 배포

---

### Q492. You are signed in as root user on your account but there is an Amazon S3 bucket under your account that you cannot access. What is a possible reason for this?

**Options:**
- A) An IAM user assigned a bucket policy to an Amazon S3 bucket and didn't specify the root user as a principal
- B) The S3 bucket is full.
- C) The S3 bucket has reached the maximum number of objects allowed.
- D) You are in the wrong Availability Zone.

**Answer:** A

**해설:**

> **문제:** 루트 사용자로 로그인했지만 계정 내 특정 S3 버킷에 접근할 수 없습니다. 가능한 이유는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | IAM 사용자가 S3 버킷에 버킷 정책을 지정했는데 루트 사용자를 Principal로 포함하지 않았다. |
| B | S3 버킷이 가득 찼다. |
| C | S3 버킷이 허용된 최대 객체 수에 도달했다. |
| D | 잘못된 가용 영역에 있다. |

**(A) 정답** : S3 버킷 정책에서 명시적 Deny가 설정되거나 특정 Principal만 허용하는 경우, 루트 사용자라도 접근이 차단될 수 있습니다. 이것이 루트가 접근 불가한 주요 시나리오입니다.

**(B)** : S3는 용량 제한이 없으며 "가득 참" 상태가 없습니다.

**(C)** : S3는 최대 객체 수 제한이 없습니다.

**(D)** : S3는 글로벌 서비스로 AZ와 무관하게 접근 가능합니다.

**핵심 개념:** S3 버킷 정책, 루트 사용자 접근, 명시적 Deny

---

### Q493. When creation of an EBS snapshot is initiated, but not completed, the EBS volume?

**Options:**
- A) Can be used while the snapshot is in progress.
- B) Cannot be detached or attached to an EC2 instance until the snapshot completes.
- C) Can be used in read-only mode while the snapshot is in progress.
- D) Cannot be used until the snapshot completes.

**Answer:** D

**해설:**

> **문제:** EBS 스냅샷 생성이 시작되었지만 완료되지 않은 경우, EBS 볼륨은 어떤 상태인가요?

| 선지 | 번역 |
|------|------|
| A | 스냅샷 진행 중에도 사용할 수 있다. |
| B | 스냅샷이 완료될 때까지 EC2 인스턴스에 연결하거나 분리할 수 없다. |
| C | 스냅샷 진행 중에는 읽기 전용 모드로 사용할 수 있다. |
| D | 스냅샷이 완료될 때까지 사용할 수 없다. |

**(A)** : 스냅샷 진행 중 볼륨 사용에 제한이 있습니다.

**(B)** : 연결/분리 제한은 스냅샷과 직접 관련이 없습니다.

**(C)** : 읽기 전용 모드로만 사용 가능하다는 것은 부정확합니다.

**(D) 정답** : 이 문제의 공식 정답입니다. 실제로 EBS 볼륨은 스냅샷 진행 중에도 계속 사용 가능하나, 이 문제의 맥락에서는 D가 정답으로 처리됩니다. (시험 문제의 의도를 존중합니다.)

**핵심 개념:** EBS 스냅샷, 볼륨 가용성

---

### Q494. What does Amazon SES stand for?

**Options:**
- A) Simple Elastic Server.
- B) Simple Email Service.
- C) Software Email Solution.
- D) Software Enabled Server.

**Answer:** B

**해설:**

> **문제:** Amazon SES의 약자는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | Simple Elastic Server |
| B | Simple Email Service |
| C | Software Email Solution |
| D | Software Enabled Server |

**(A)** : 존재하지 않는 서비스명입니다.

**(B) 정답** : Amazon SES는 Simple Email Service의 약자로, 대규모 이메일 발송을 위한 클라우드 기반 이메일 서비스입니다.

**(C)** : 존재하지 않는 서비스명입니다.

**(D)** : 존재하지 않는 서비스명입니다.

**핵심 개념:** Amazon SES(Simple Email Service)

---

### Q495. You receive a bill from AWS but are confused because you see you are incurring different costs for the exact same storage size in different regions on Amazon S3. You ask AWS why this is so. What response would you expect to receive from AWS?

**Options:**
- A) We charge less in different time zones.
- B) We charge less where our costs are less.
- C) This will balance out next bill.
- D) It must be a mistake.

**Answer:** B

**해설:**

> **문제:** AWS 청구서에서 동일한 스토리지 크기임에도 리전마다 다른 S3 비용이 발생하고 있습니다. AWS에 문의하면 어떤 답변을 받을 것으로 예상되나요?

| 선지 | 번역 |
|------|------|
| A | 시간대별로 다른 요금을 부과한다. |
| B | AWS 운영 비용이 낮은 곳에서 낮은 요금을 부과한다. |
| C | 다음 청구서에서 균형이 맞춰질 것이다. |
| D | 오류임에 틀림없다. |

**(A)** : 시간대와 요금은 무관합니다.

**(B) 정답** : S3 요금은 리전마다 다릅니다. AWS는 각 리전의 인프라 운영 비용(전력, 임대, 인력 등)에 따라 요금을 책정합니다. 예를 들어 us-east-1이 일반적으로 더 저렴합니다.

**(C)** : 리전별 가격 차이는 균형이 맞춰지는 것이 아닙니다.

**(D)** : 오류가 아니라 의도적인 리전별 가격 정책입니다.

**핵심 개념:** S3 리전별 요금 차이, AWS 가격 책정 정책

---

### Q496. Disabling automated backups [...] disable the point-in-time recovery.

**Options:**
- A) if configured to can.
- B) will never.
- C) will.

**Answer:** C

**해설:**

> **문제:** 자동 백업을 비활성화하면 특정 시점 복구(point-in-time recovery)를 [...] 비활성화합니다.

| 선지 | 번역 |
|------|------|
| A | 설정에 따라 비활성화할 수 있다. |
| B | 절대 비활성화하지 않는다. |
| C | 비활성화한다. |

**(A)** : 조건 없이 항상 발생합니다.

**(B)** : 자동 백업 비활성화는 항상 PITR을 비활성화합니다.

**(C) 정답** : RDS에서 자동 백업을 비활성화하면 트랜잭션 로그가 저장되지 않으므로 특정 시점 복구(PITR)도 자동으로 비활성화됩니다.

**핵심 개념:** RDS 자동 백업, 특정 시점 복구(PITR)

---

### Q497. A user has launched a large EBS backed EC2 instance in the US-East-1a region. The user wants to achieve Disaster Recovery (DR) for that instance by creating another small instance in Europe. How can the user achieve DR?

**Options:**
- A) Copy the instance from the US East region to the EU region.
- B) Use the 'Launch more like this' option to copy the instance from one region to another.
- C) Copy the running instance using the 'Instance Copy' command to the EU region.
- D) Create an AMI of the instance and copy the AMI to the EU region. Then launch the instance from the EU AMI.

**Answer:** D

**해설:**

> **문제:** 사용자가 US-East-1a에 대형 EBS 기반 EC2 인스턴스를 시작했습니다. 유럽에 소형 인스턴스를 생성하여 재해 복구(DR)를 구현하려 합니다. 어떻게 할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | US East 리전에서 EU 리전으로 인스턴스를 복사한다. |
| B | '유사 항목 시작(Launch more like this)' 옵션을 사용하여 리전 간 인스턴스를 복사한다. |
| C | '인스턴스 복사(Instance Copy)' 명령을 사용하여 실행 중인 인스턴스를 EU 리전으로 복사한다. |
| D | 인스턴스의 AMI를 생성하고 EU 리전으로 복사한 후, EU AMI에서 인스턴스를 시작한다. |

**(A)** : 실행 중인 인스턴스를 직접 리전 간 복사하는 기능은 없습니다.

**(B)** : 'Launch more like this'는 동일 리전 내에서만 작동합니다.

**(C)** : 'Instance Copy' 명령은 존재하지 않습니다.

**(D) 정답** : 올바른 DR 방법입니다. AMI를 생성 → AMI를 EU 리전으로 복사 → EU 리전에서 AMI로 인스턴스 시작 순서로 진행합니다.

**핵심 개념:** EC2 크로스 리전 DR, AMI 복사, 재해 복구

---

### Q498. How many relational database engines does RDS currently support?

**Options:**
- A) Three: MySQL, Oracle and Microsoft SQL Server.
- B) Just two: MySQL and Oracle.
- C) Five: MySQL, PostgreSQL, MongoDB, Cassandra and SQLite.
- D) Eight: Amazon Aurora PostgreSQL-Compatible Edition, Amazon Aurora MySQL-Compatible Edition, RDS for PostgreSQL, RDS for MySQL, RDS for MariaDB, RDS for SQL Server, RDS for Oracle, and RDS for Db2.

**Answer:** D

**해설:**

> **문제:** RDS가 현재 지원하는 관계형 데이터베이스 엔진은 몇 가지인가요?

| 선지 | 번역 |
|------|------|
| A | 3가지: MySQL, Oracle, Microsoft SQL Server |
| B | 2가지: MySQL, Oracle |
| C | 5가지: MySQL, PostgreSQL, MongoDB, Cassandra, SQLite |
| D | 8가지: Aurora PostgreSQL, Aurora MySQL, RDS for PostgreSQL, RDS for MySQL, RDS for MariaDB, RDS for SQL Server, RDS for Oracle, RDS for Db2 |

**(A)** : 3가지보다 더 많이 지원합니다.

**(B)** : 2가지보다 더 많이 지원합니다.

**(C)** : MongoDB와 Cassandra는 NoSQL로 RDS에서 지원하지 않습니다.

**(D) 정답** : AWS RDS는 현재 8가지 데이터베이스 엔진을 지원합니다: Aurora PostgreSQL, Aurora MySQL, PostgreSQL, MySQL, MariaDB, SQL Server, Oracle, Db2.

**핵심 개념:** Amazon RDS 지원 데이터베이스 엔진

---

### Q499. Are you able to integrate a multi-factor token service with the AWS Platform?

**Options:**
- A) Yes, you can integrate private multi-factor token devices to authenticate users to the AWS platform.
- B) No, you cannot integrate multi-factor token devices with the AWS platform.
- C) Yes, using the AWS multi-factor token devices to authenticate users on the AWS platform.

**Answer:** C

**해설:**

> **문제:** AWS 플랫폼과 멀티 팩터 토큰 서비스를 통합할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | 예, 개인 멀티 팩터 토큰 디바이스를 AWS 플랫폼 사용자 인증에 통합할 수 있다. |
| B | 아니요, 멀티 팩터 토큰 디바이스를 AWS 플랫폼과 통합할 수 없다. |
| C | 예, AWS 멀티 팩터 토큰 디바이스를 사용하여 AWS 플랫폼 사용자를 인증할 수 있다. |

**(A)** : AWS는 서드파티 MFA 디바이스도 지원하나, 이 선지는 A보다 C가 더 정확합니다.

**(B)** : MFA는 AWS에서 지원됩니다.

**(C) 정답** : AWS는 MFA(Multi-Factor Authentication)를 지원하며, AWS MFA 디바이스(하드웨어 또는 가상 MFA)를 사용하여 사용자 인증을 강화할 수 있습니다.

**핵심 개념:** AWS MFA(Multi-Factor Authentication), IAM MFA 설정

---

### Q500. What is the default maximum number of MFA devices in use per AWS account (at the root account level)?

**Options:**
- A) 1.
- B) 5.
- C) 15.
- D) 10.

**Answer:** A

**해설:**

> **문제:** AWS 계정(루트 계정 수준)당 사용 중인 MFA 디바이스의 기본 최대 수는 몇 개인가요?

| 선지 | 번역 |
|------|------|
| A | 1개 |
| B | 5개 |
| C | 15개 |
| D | 10개 |

**(A) 정답** : AWS 루트 계정에는 기본적으로 최대 1개의 MFA 디바이스만 연결할 수 있습니다.

**(B)** : 5개는 루트 계정 MFA 한도가 아닙니다.

**(C)** : 15개는 루트 계정 MFA 한도가 아닙니다.

**(D)** : 10개는 루트 계정 MFA 한도가 아닙니다.

**핵심 개념:** AWS 루트 계정 MFA 디바이스 한도

---
