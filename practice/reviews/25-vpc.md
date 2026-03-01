# Section 25 - VPC 연습문제 해설

---

### Q1. A company has a VPC with a CIDR block of 10.0.0.0/24 in a subnet. How many IP addresses are available for EC2 instances?

**한글 번역:** 한 회사가 서브넷에 10.0.0.0/24 CIDR 블록을 가진 VPC를 보유하고 있습니다. EC2 인스턴스에 사용 가능한 IP 주소는 몇 개입니까?

**선지:**
- A) 256 → 256개
- B) 251 → 251개
- C) 254 → 254개
- D) 250 → 250개

**정답:** B

**선지별 해설:**
- **A) 256:** /24 CIDR 블록은 총 256개(2^8)의 IP 주소를 포함하지만, AWS는 각 서브넷에서 5개의 IP를 예약하므로 실제 사용 가능한 수는 256이 아닙니다. 오답입니다.
- **B) 251:** 정답입니다. AWS는 각 서브넷에서 5개의 IP 주소를 예약합니다: (1) 네트워크 주소(10.0.0.0), (2) VPC 라우터용(10.0.0.1), (3) DNS 서버용(10.0.0.2), (4) 향후 사용 예약(10.0.0.3), (5) 브로드캐스트 주소(10.0.0.255). 따라서 256 - 5 = 251개가 사용 가능합니다.
- **C) 254:** 일반적인 네트워킹에서는 네트워크 주소와 브로드캐스트 주소 2개만 제외하지만, AWS는 추가로 3개를 더 예약하므로 254는 오답입니다.
- **D) 250:** AWS가 예약하는 IP는 5개이지 6개가 아니므로 250은 오답입니다.

**핵심 개념:** AWS VPC 서브넷의 예약 IP 주소 (서브넷당 5개 예약)

---

### Q2. Solutions architect needs to allow EC2 instances in a private subnet to access the internet for software updates while preventing inbound connections. Must be HA and minimal overhead. What to recommend?

**한글 번역:** 솔루션 아키텍트가 프라이빗 서브넷의 EC2 인스턴스가 소프트웨어 업데이트를 위해 인터넷에 접근할 수 있도록 허용하되, 인바운드 연결은 차단해야 합니다. 고가용성이어야 하며 운영 오버헤드가 최소화되어야 합니다. 무엇을 추천해야 합니까?

**선지:**
- A) NAT instance in public subnet across multiple AZs with ASG → 여러 AZ의 퍼블릭 서브넷에 ASG가 있는 NAT 인스턴스
- B) NAT Gateway in each public subnet across multiple AZs → 여러 AZ의 각 퍼블릭 서브넷에 NAT Gateway
- C) Single NAT Gateway in one public subnet → 하나의 퍼블릭 서브넷에 단일 NAT Gateway
- D) Configure Internet Gateway and update private subnet route table → Internet Gateway를 구성하고 프라이빗 서브넷 라우트 테이블 업데이트

**정답:** B

**선지별 해설:**
- **A) NAT Instance + ASG:** NAT 인스턴스는 작동하지만 관리형 서비스가 아니므로 운영 오버헤드가 큽니다. ASG를 통한 HA 구성은 복잡하며, 소스/대상 확인 비활성화 등 추가 설정이 필요합니다. "최소 오버헤드" 요구사항에 부합하지 않습니다.
- **B) 각 AZ에 NAT Gateway:** 정답입니다. NAT Gateway는 AWS 관리형 서비스로 운영 오버헤드가 최소화됩니다. 각 AZ에 하나씩 배치하면 고가용성을 확보할 수 있으며, 하나의 AZ 장애 시에도 다른 AZ의 인스턴스는 영향을 받지 않습니다.
- **C) 단일 NAT Gateway:** 단일 NAT Gateway는 해당 AZ 내에서는 고가용성이지만, AZ 장애 시 다른 AZ의 인스턴스도 인터넷 접근이 불가능해집니다. HA 요구사항을 충족하지 못합니다.
- **D) Internet Gateway + 프라이빗 서브넷:** Internet Gateway를 프라이빗 서브넷의 라우트 테이블에 직접 연결하면 해당 서브넷은 더 이상 프라이빗이 아니게 됩니다. 인바운드 연결 차단 요구사항에 위배됩니다.

**핵심 개념:** NAT Gateway의 고가용성 설계 (AZ별 배치)

---

### Q3. Company wants to block a specific IP address from accessing EC2 instances behind an ALB. Which approach?

**한글 번역:** 회사가 ALB 뒤에 있는 EC2 인스턴스에 특정 IP 주소의 접근을 차단하려 합니다. 어떤 방법을 사용해야 합니까?

**선지:**
- A) Modify EC2 security group to deny the IP → EC2 보안 그룹을 수정하여 해당 IP를 거부
- B) Create NACL rule to deny the IP on ALB subnet → ALB 서브넷의 NACL 규칙으로 해당 IP를 거부
- C) Use AWS WAF with IP-based rule on ALB → ALB에 AWS WAF의 IP 기반 규칙 사용
- D) Modify ALB security group to deny the IP → ALB 보안 그룹을 수정하여 해당 IP를 거부

**정답:** C

**선지별 해설:**
- **A) EC2 Security Group:** 보안 그룹은 허용(Allow) 규칙만 지원하며 거부(Deny) 규칙을 설정할 수 없습니다. 따라서 특정 IP를 차단하는 것이 불가능합니다. 오답입니다.
- **B) NACL 규칙:** NACL은 거부 규칙을 지원하지만, ALB가 클라이언트 요청을 종료(terminate)하고 새 연결을 EC2로 만들기 때문에, EC2가 보는 소스 IP는 ALB의 프라이빗 IP입니다. ALB 서브넷의 NACL에서 차단할 수 있지만, WAF가 더 세밀하고 관리하기 쉬운 솔루션입니다.
- **C) AWS WAF + IP 기반 규칙:** 정답입니다. AWS WAF는 ALB에 직접 연결할 수 있으며, IP Set을 사용하여 특정 IP를 차단하는 규칙을 쉽게 생성할 수 있습니다. 가장 효과적이고 관리가 용이한 방법입니다.
- **D) ALB Security Group:** 보안 그룹은 거부(Deny) 규칙을 지원하지 않습니다. 허용 규칙만 설정할 수 있으므로 특정 IP를 차단하는 데 사용할 수 없습니다. 오답입니다.

**핵심 개념:** AWS WAF를 사용한 IP 기반 접근 제어 (ALB/CloudFront 연동)

---

### Q4. Company needs to connect on-premises to VPC with dedicated private connection, consistent performance. Connection must also be encrypted. What solution?

**한글 번역:** 회사가 온프레미스에서 VPC로 전용 프라이빗 연결이 필요하며, 일관된 성능이 요구됩니다. 연결은 반드시 암호화되어야 합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) AWS Site-to-Site VPN only → AWS Site-to-Site VPN만 사용
- B) AWS Direct Connect only → AWS Direct Connect만 사용
- C) AWS Direct Connect with Site-to-Site VPN → AWS Direct Connect와 Site-to-Site VPN 함께 사용
- D) AWS VPN CloudHub → AWS VPN CloudHub

**정답:** C

**선지별 해설:**
- **A) Site-to-Site VPN만:** VPN은 암호화를 제공하지만, 공용 인터넷을 통해 연결되므로 전용 프라이빗 연결이 아니며, 일관된 성능을 보장할 수 없습니다. 대역폭이 변동될 수 있습니다.
- **B) Direct Connect만:** Direct Connect는 전용 프라이빗 연결과 일관된 성능을 제공하지만, 기본적으로 암호화되지 않습니다. Direct Connect 자체는 전송 중 데이터를 암호화하지 않으므로 암호화 요구사항을 충족하지 못합니다.
- **C) Direct Connect + Site-to-Site VPN:** 정답입니다. Direct Connect 위에 Site-to-Site VPN을 구성하면 전용 프라이빗 연결(Direct Connect)의 일관된 성능과 VPN의 IPSec 암호화를 모두 확보할 수 있습니다. 두 요구사항을 모두 충족하는 유일한 선택지입니다.
- **D) VPN CloudHub:** VPN CloudHub는 여러 사이트 간의 VPN 연결을 허브-앤-스포크 모델로 구성하는 것으로, 전용 프라이빗 연결을 제공하지 않으며, 이 시나리오의 요구사항과 맞지 않습니다.

**핵심 개념:** Direct Connect + VPN 조합으로 전용 연결 + 암호화 동시 달성

---

### Q5. Company has VPCs in multiple regions and on-premises data centers. Need hub-and-spoke network topology with transitive routing. Which service?

**한글 번역:** 회사가 여러 리전에 VPC와 온프레미스 데이터 센터를 보유하고 있습니다. 전이적(transitive) 라우팅이 가능한 허브-앤-스포크 네트워크 토폴로지가 필요합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) VPC Peering → VPC 피어링
- B) AWS Direct Connect Gateway → AWS Direct Connect Gateway
- C) AWS Transit Gateway → AWS Transit Gateway
- D) AWS VPN CloudHub → AWS VPN CloudHub

**정답:** C

**선지별 해설:**
- **A) VPC Peering:** VPC 피어링은 두 VPC 간의 1:1 연결만 지원하며, 전이적 라우팅을 지원하지 않습니다. VPC A-B와 B-C가 피어링되어 있어도 A에서 C로 B를 통해 라우팅할 수 없습니다. 대규모 네트워크에는 부적합합니다.
- **B) Direct Connect Gateway:** Direct Connect Gateway는 하나의 Direct Connect 연결을 여러 VPC에 연결할 수 있지만, VPC 간의 전이적 라우팅을 제공하지 않습니다. 온프레미스에서 VPC로의 연결에만 초점을 맞춥니다.
- **C) Transit Gateway:** 정답입니다. AWS Transit Gateway는 허브-앤-스포크 모델의 중앙 허브 역할을 하며, VPC, VPN, Direct Connect 연결을 모두 연결할 수 있습니다. 전이적 라우팅을 지원하여 연결된 모든 네트워크 간 통신이 가능합니다. 리전 간 Transit Gateway 피어링도 지원합니다.
- **D) VPN CloudHub:** VPN CloudHub는 여러 VPN 연결을 허브-앤-스포크로 구성할 수 있지만, VPC 간의 전이적 라우팅을 완전히 지원하지 않으며, Transit Gateway만큼 확장성이 뛰어나지 않습니다.

**핵심 개념:** AWS Transit Gateway — 허브-앤-스포크 토폴로지와 전이적 라우팅

---

### Q6. Application in private subnet needs to access S3. Traffic must not traverse public internet. Cost-effective. What to do?

**한글 번역:** 프라이빗 서브넷의 애플리케이션이 S3에 접근해야 합니다. 트래픽이 퍼블릭 인터넷을 통과하면 안 되며, 비용 효율적이어야 합니다. 어떻게 해야 합니까?

**선지:**
- A) Create VPC Interface Endpoint for S3 → S3용 VPC Interface Endpoint 생성
- B) Create VPC Gateway Endpoint for S3 → S3용 VPC Gateway Endpoint 생성
- C) Deploy NAT Gateway and route S3 traffic through it → NAT Gateway를 배포하고 S3 트래픽을 이를 통해 라우팅
- D) Create VPC peering with S3 service VPC → S3 서비스 VPC와 VPC 피어링 생성

**정답:** B

**선지별 해설:**
- **A) Interface Endpoint:** Interface Endpoint(PrivateLink 기반)는 S3에 사용할 수 있지만, ENI를 통해 프로비저닝되며 시간당 요금과 데이터 처리 요금이 부과됩니다. Gateway Endpoint에 비해 비용이 높으므로 "비용 효율적" 요구사항에 최적이 아닙니다.
- **B) Gateway Endpoint:** 정답입니다. VPC Gateway Endpoint는 S3와 DynamoDB에 사용할 수 있으며, 무료입니다. 라우트 테이블에 경로를 추가하여 트래픽을 AWS 내부 네트워크를 통해 S3로 직접 라우팅합니다. 퍼블릭 인터넷을 통과하지 않으며 추가 비용이 없어 가장 비용 효율적입니다.
- **C) NAT Gateway:** NAT Gateway를 통해 S3에 접근하면 기술적으로는 가능하지만, NAT Gateway는 시간당 요금과 데이터 처리 요금이 부과됩니다. 또한 트래픽이 인터넷을 통해 나가므로 요구사항에 위배됩니다.
- **D) VPC Peering with S3:** S3는 VPC 내에 존재하는 서비스가 아니므로 VPC 피어링을 설정할 수 없습니다. 기술적으로 불가능한 선택지입니다.

**핵심 개념:** VPC Gateway Endpoint (S3, DynamoDB) — 무료, 퍼블릭 인터넷 미경유

---

### Q7. VPC Flow Log shows inbound request ACCEPTED but corresponding outbound response REJECTED. Most likely cause?

**한글 번역:** VPC Flow Log에서 인바운드 요청은 ACCEPTED이지만 대응하는 아웃바운드 응답이 REJECTED로 표시됩니다. 가장 가능성 높은 원인은 무엇입니까?

**선지:**
- A) Security Group blocking outbound → 보안 그룹이 아웃바운드를 차단
- B) NACL blocking outbound → NACL이 아웃바운드를 차단
- C) Route table has no route → 라우트 테이블에 경로가 없음
- D) Internet Gateway misconfigured → Internet Gateway 구성 오류

**정답:** B

**선지별 해설:**
- **A) Security Group 아웃바운드 차단:** 보안 그룹은 상태 저장형(Stateful)입니다. 인바운드 트래픽이 허용되면, 해당 트래픽에 대한 아웃바운드 응답은 아웃바운드 규칙에 관계없이 자동으로 허용됩니다. 따라서 보안 그룹이 응답을 차단할 수 없습니다.
- **B) NACL 아웃바운드 차단:** 정답입니다. NACL은 상태 비저장형(Stateless)입니다. 인바운드 규칙과 아웃바운드 규칙을 독립적으로 평가합니다. 인바운드 트래픽이 허용되더라도 아웃바운드 규칙에서 해당 응답 트래픽(임시 포트 등)을 명시적으로 허용하지 않으면 차단됩니다.
- **C) 라우트 테이블 경로 없음:** 라우트 테이블에 경로가 없으면 트래픽이 전달되지 않지만, Flow Log에서 REJECTED로 표시되는 것은 보안 규칙에 의한 차단을 의미합니다. 라우팅 문제와는 다른 동작입니다.
- **D) Internet Gateway 구성 오류:** Internet Gateway 구성 오류는 인바운드 요청도 실패하게 만들 가능성이 높습니다. 인바운드가 ACCEPTED인 상황에서는 해당되지 않습니다.

**핵심 개념:** NACL의 Stateless 특성 vs Security Group의 Stateful 특성

---

### Q8. Company requires network connection from on-premises to multiple VPCs in different AWS regions through a single physical connection. What combination?

**한글 번역:** 회사가 단일 물리적 연결을 통해 온프레미스에서 서로 다른 AWS 리전의 여러 VPC에 네트워크 연결이 필요합니다. 어떤 조합을 사용해야 합니까?

**선지:**
- A) Site-to-Site VPN + Transit Gateway → Site-to-Site VPN + Transit Gateway
- B) Direct Connect + Direct Connect Gateway → Direct Connect + Direct Connect Gateway
- C) Direct Connect + VPC Peering → Direct Connect + VPC Peering
- D) VPN CloudHub + Transit Gateway → VPN CloudHub + Transit Gateway

**정답:** B

**선지별 해설:**
- **A) VPN + Transit Gateway:** Site-to-Site VPN은 인터넷을 통한 연결이므로 "단일 물리적 연결" 요구사항을 충족하지 않습니다. 전용 물리적 연결이 필요한 시나리오에는 적합하지 않습니다.
- **B) Direct Connect + Direct Connect Gateway:** 정답입니다. Direct Connect는 단일 물리적 전용 연결을 제공하고, Direct Connect Gateway는 이 하나의 연결을 통해 여러 리전의 VPC에 접근할 수 있게 해줍니다. Direct Connect Gateway는 글로벌 리소스로, 연결된 모든 리전의 VPC와 통신할 수 있습니다.
- **C) Direct Connect + VPC Peering:** Direct Connect는 물리적 연결을 제공하지만, VPC 피어링은 VPC 간의 연결일 뿐 온프레미스에서 여러 VPC로의 연결을 해결하지 못합니다. 또한 VPC 피어링은 전이적 라우팅을 지원하지 않습니다.
- **D) VPN CloudHub + Transit Gateway:** VPN CloudHub는 물리적 전용 연결이 아닌 VPN 기반이므로 "단일 물리적 연결" 요구사항을 충족하지 않습니다.

**핵심 개념:** Direct Connect Gateway — 단일 DX 연결로 여러 리전의 VPC 접근
