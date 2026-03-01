# Section 08 - Route 53 연습문제 해설

---

### Q1. A company wants to use its domain name (example.com) to point to an ALB. Which Route 53 record type should be used?

**한글 번역:** 회사가 도메인 이름(example.com)을 ALB로 연결하려고 합니다. 어떤 Route 53 레코드 타입을 사용해야 합니까?

**선지:**
- A) CNAME record → CNAME 레코드
- B) A record with Alias enabled → Alias가 활성화된 A 레코드
- C) NS record → NS 레코드
- D) MX record → MX 레코드

**정답:** B

**선지별 해설:**
- **A) CNAME 레코드:** CNAME은 하나의 도메인 이름을 다른 도메인 이름으로 매핑합니다. 그러나 Zone Apex(루트 도메인, 예: example.com)에는 CNAME을 사용할 수 없습니다. DNS 규약(RFC)에 의해 Zone Apex에 CNAME 설정이 불가능합니다.
- **B) Alias가 활성화된 A 레코드 (정답):** Route 53의 Alias 레코드는 AWS 리소스(ALB, CloudFront, S3 등)를 Zone Apex에서도 직접 가리킬 수 있는 Route 53 전용 기능입니다. 무료이며, 헬스 체크도 지원합니다. ALB를 가리킬 때 가장 적합한 선택입니다.
- **C) NS 레코드:** NS(Name Server) 레코드는 호스팅 영역의 네임서버를 지정하는 데 사용됩니다. 트래픽을 ALB로 라우팅하는 용도가 아닙니다.
- **D) MX 레코드:** MX(Mail Exchange) 레코드는 이메일 서버를 지정하는 데 사용됩니다. 웹 트래픽 라우팅과는 관련이 없습니다.

**핵심 개념:** Route 53 Alias 레코드 — Zone Apex에서 AWS 리소스를 가리키는 방법

---

### Q2. A company is deploying a new version and wants to send 10% of traffic to the new version while keeping 90% on the current version. Which routing policy?

**한글 번역:** 회사가 새 버전을 배포하면서 10%의 트래픽을 새 버전으로, 90%를 현재 버전으로 보내려고 합니다. 어떤 라우팅 정책을 사용해야 합니까?

**선지:**
- A) Simple → Simple (단순) 라우팅
- B) Failover → Failover (장애 조치) 라우팅
- C) Weighted → Weighted (가중치) 라우팅
- D) Latency-based → Latency-based (지연 시간 기반) 라우팅

**정답:** C

**선지별 해설:**
- **A) Simple 라우팅:** Simple 라우팅은 단일 리소스로 트래픽을 보내거나, 여러 값을 반환하여 클라이언트가 랜덤으로 선택하게 합니다. 트래픽 비율을 제어할 수 없습니다.
- **B) Failover 라우팅:** Failover 라우팅은 Primary/Secondary 구성으로, Primary가 비정상일 때 Secondary로 전환합니다. 트래픽 비율 분할이 아닌 장애 조치용입니다.
- **C) Weighted 라우팅 (정답):** Weighted 라우팅은 각 레코드에 가중치를 할당하여 트래픽 비율을 제어합니다. 예: 새 버전에 가중치 10, 현재 버전에 가중치 90을 설정하면 10%/90%로 분할됩니다. 블루-그린 배포나 카나리 배포에 이상적입니다.
- **D) Latency-based 라우팅:** Latency-based는 사용자에게 가장 낮은 지연 시간을 제공하는 리전으로 라우팅합니다. 트래픽 비율 제어가 아닌 성능 최적화 목적입니다.

**핵심 개념:** Route 53 Weighted Routing — 트래픽 비율 기반 분할 (카나리/블루-그린 배포)

---

### Q3. A company has an application deployed in multiple AWS regions. They want to route users to the region that provides the best performance. Which routing policy?

**한글 번역:** 회사가 여러 AWS 리전에 애플리케이션을 배포했습니다. 사용자를 가장 좋은 성능을 제공하는 리전으로 라우팅하고 싶습니다. 어떤 라우팅 정책을 사용해야 합니까?

**선지:**
- A) Geolocation → Geolocation (지리적 위치) 라우팅
- B) Geoproximity → Geoproximity (지리적 근접성) 라우팅
- C) Latency-based → Latency-based (지연 시간 기반) 라우팅
- D) Weighted → Weighted (가중치) 라우팅

**정답:** C

**선지별 해설:**
- **A) Geolocation 라우팅:** Geolocation은 사용자의 지리적 위치(대륙, 국가 등)에 따라 라우팅합니다. 특정 국가의 사용자를 특정 리전으로 보내는 데 사용하지만, 반드시 "가장 빠른" 리전이라는 보장은 없습니다.
- **B) Geoproximity 라우팅:** Geoproximity는 사용자와 리소스 간의 지리적 거리에 따라 라우팅하며, 바이어스(bias) 값으로 영향 범위를 조절할 수 있습니다. 성능 기반이 아닌 거리 기반입니다.
- **C) Latency-based 라우팅 (정답):** Latency-based 라우팅은 AWS가 측정한 사용자와 각 리전 간의 네트워크 지연 시간을 기반으로 가장 빠른 리전으로 라우팅합니다. "최적의 성능"이 요구사항일 때 가장 적합합니다.
- **D) Weighted 라우팅:** Weighted는 트래픽을 비율로 분할합니다. 성능 기반 라우팅이 아니므로 이 시나리오에 적합하지 않습니다.

**핵심 개념:** Route 53 Latency-based Routing — 네트워크 지연 시간 기반 최적 리전 라우팅

---

### Q4. A company needs to monitor the health of a database running in a private subnet and use it for Route 53 DNS failover. How?

**한글 번역:** 회사가 프라이빗 서브넷에서 실행 중인 데이터베이스의 상태를 모니터링하고, Route 53 DNS 장애 조치에 활용해야 합니다. 어떻게 해야 합니까?

**선지:**
- A) Create a Route 53 health check pointing to the private IP → 프라이빗 IP를 가리키는 Route 53 헬스 체크를 생성한다
- B) Create a CloudWatch alarm monitoring the database then create a Route 53 health check that monitors the CloudWatch alarm → 데이터베이스를 모니터링하는 CloudWatch 알람을 생성한 후, CloudWatch 알람을 모니터링하는 Route 53 헬스 체크를 생성한다
- C) Use a Route 53 calculated health check → Route 53 계산된(calculated) 헬스 체크를 사용한다
- D) Enable VPC peering between Route 53 and the VPC → Route 53과 VPC 간에 VPC 피어링을 활성화한다

**정답:** B

**선지별 해설:**
- **A) 프라이빗 IP 헬스 체크:** Route 53 헬스 체커는 인터넷의 퍼블릭 위치에서 동작하므로, 프라이빗 IP에는 접근할 수 없습니다. 프라이빗 서브넷의 리소스를 직접 체크하는 것은 불가능합니다.
- **B) CloudWatch 알람 기반 헬스 체크 (정답):** 올바른 접근입니다. ① CloudWatch 에이전트나 커스텀 메트릭으로 프라이빗 DB를 모니터링 → ② CloudWatch 알람을 설정 → ③ Route 53 헬스 체크를 이 CloudWatch 알람에 연결합니다. 이 방법으로 프라이빗 리소스를 간접적으로 모니터링할 수 있습니다.
- **C) 계산된(calculated) 헬스 체크:** Calculated 헬스 체크는 여러 개의 개별 헬스 체크 결과를 조합하여 전체 상태를 판단합니다. 프라이빗 리소스를 모니터링하는 기능 자체가 아닙니다.
- **D) VPC 피어링:** Route 53은 VPC 내부의 서비스가 아니므로 VPC 피어링을 설정할 수 없습니다. 이는 기술적으로 불가능한 옵션입니다.

**핵심 개념:** Route 53 헬스 체크 — 프라이빗 리소스는 CloudWatch 알람을 통한 간접 모니터링

---

### Q5. A company has registered a domain with GoDaddy but wants to use Route 53 to manage DNS records. What steps?

**한글 번역:** 회사가 GoDaddy에서 도메인을 등록했지만, Route 53을 사용하여 DNS 레코드를 관리하고 싶습니다. 어떤 단계를 수행해야 합니까?

**선지:**
- A) Transfer the domain to Route 53 → 도메인을 Route 53으로 이전한다
- B) Create a Hosted Zone in Route 53 and update NS records at GoDaddy → Route 53에 호스팅 영역을 생성하고, GoDaddy에서 NS 레코드를 업데이트한다
- C) Create CNAME records at GoDaddy pointing to Route 53 → GoDaddy에서 Route 53을 가리키는 CNAME 레코드를 생성한다
- D) It is not possible → 불가능하다

**정답:** B

**선지별 해설:**
- **A) 도메인 이전:** 도메인을 Route 53으로 완전히 이전하는 것도 가능하지만, 질문은 DNS 관리만 Route 53으로 옮기는 것을 묻고 있습니다. 도메인 이전은 불필요한 추가 단계이며, NS 레코드 변경만으로 충분합니다.
- **B) 호스팅 영역 생성 + NS 레코드 업데이트 (정답):** 올바른 방법입니다. ① Route 53에서 Public Hosted Zone을 생성하면 NS 레코드가 자동으로 할당됩니다. ② GoDaddy의 도메인 설정에서 네임서버를 Route 53의 NS 값으로 변경합니다. 이후 모든 DNS 레코드 관리는 Route 53에서 할 수 있습니다.
- **C) GoDaddy에서 CNAME 생성:** CNAME으로 DNS를 위임하는 것은 올바른 방법이 아닙니다. DNS 위임은 NS 레코드를 통해 이루어져야 합니다.
- **D) 불가능:** 완전히 가능합니다. 도메인 등록기관(registrar)과 DNS 서비스는 분리될 수 있습니다. 제3자 도메인 등록기관에서 Route 53을 DNS 서비스로 사용하는 것은 일반적인 구성입니다.

**핵심 개념:** Route 53 Public Hosted Zone — 제3자 등록기관의 도메인과 Route 53 DNS 서비스 연동

---

### Q6. A company wants to restrict content delivery based on user country. France→French server, Germany→German server, default for others. Which routing policy?

**한글 번역:** 회사가 사용자 국가에 따라 콘텐츠 전달을 제한하려고 합니다. 프랑스→프랑스 서버, 독일→독일 서버, 나머지는 기본값. 어떤 라우팅 정책을 사용해야 합니까?

**선지:**
- A) Latency-based → Latency-based (지연 시간 기반) 라우팅
- B) Geoproximity → Geoproximity (지리적 근접성) 라우팅
- C) Geolocation → Geolocation (지리적 위치) 라우팅
- D) IP-based → IP-based (IP 기반) 라우팅

**정답:** C

**선지별 해설:**
- **A) Latency-based 라우팅:** Latency-based는 네트워크 지연 시간을 기반으로 라우팅합니다. 국가별 콘텐츠 제한/분류가 아닌 성능 최적화 목적입니다. 프랑스 사용자가 가장 빠른 서버로 갈 수 있지만, 반드시 프랑스 서버라는 보장이 없습니다.
- **B) Geoproximity 라우팅:** Geoproximity는 사용자와 리소스 간의 물리적 거리를 기반으로 라우팅합니다. 바이어스 값으로 영향 범위를 조절할 수 있지만, 특정 국가를 특정 서버에 정확히 매핑하는 기능은 아닙니다.
- **C) Geolocation 라우팅 (정답):** Geolocation은 사용자의 위치(대륙, 국가, 미국의 경우 주)를 기반으로 정확한 라우팅 규칙을 설정합니다. 프랑스→프랑스 서버, 독일→독일 서버, 기본값(Default)→다른 서버로 정확히 매핑할 수 있습니다. 콘텐츠 현지화와 접근 제한에 최적입니다.
- **D) IP-based 라우팅:** IP-based는 클라이언트의 IP 주소 범위(CIDR)에 따라 라우팅합니다. 특정 ISP나 기업 네트워크를 식별하는 데 유용하지만, 국가 기반 라우팅에는 Geolocation이 더 적합합니다.

**핵심 개념:** Route 53 Geolocation Routing — 국가/지역 기반 콘텐츠 라우팅 및 현지화

---

### Q7. Which of the following CANNOT be set as an Alias record target in Route 53?

**한글 번역:** Route 53에서 Alias 레코드 대상으로 설정할 수 없는 것은 다음 중 어느 것입니까?

**선지:**
- A) ALB → ALB (Application Load Balancer)
- B) Amazon CloudFront distribution → Amazon CloudFront 배포
- C) Amazon EC2 instance DNS name → Amazon EC2 인스턴스 DNS 이름
- D) Amazon S3 website endpoint → Amazon S3 웹사이트 엔드포인트

**정답:** C

**선지별 해설:**
- **A) ALB:** ALB는 Alias 레코드의 유효한 대상입니다. Alias A 레코드 또는 Alias AAAA 레코드로 ALB를 가리킬 수 있습니다.
- **B) CloudFront 배포:** CloudFront 배포는 Alias 레코드의 유효한 대상입니다. 도메인을 CloudFront로 매핑할 때 자주 사용됩니다.
- **C) EC2 인스턴스 DNS 이름 (정답):** EC2 인스턴스의 퍼블릭 DNS 이름은 Alias 레코드의 대상으로 설정할 수 없습니다. EC2 인스턴스를 가리키려면 일반 A 레코드(IP 주소)를 사용해야 합니다. Alias는 ALB, NLB, CloudFront, S3 웹사이트, Elastic Beanstalk, API Gateway, VPC 엔드포인트, Global Accelerator 등 특정 AWS 서비스만 지원합니다.
- **D) S3 웹사이트 엔드포인트:** S3 정적 웹사이트 호스팅 엔드포인트는 Alias 레코드의 유효한 대상입니다.

**핵심 개념:** Route 53 Alias 레코드 대상 — EC2 인스턴스는 Alias 대상이 될 수 없음

---

### Q8. A company wants to use Route 53 to resolve DNS queries for on-premises resources from within their VPC connected via Direct Connect. What should they configure?

**한글 번역:** 회사가 Direct Connect로 연결된 VPC 내에서 온프레미스 리소스의 DNS 쿼리를 해결하기 위해 Route 53을 사용하려고 합니다. 무엇을 구성해야 합니까?

**선지:**
- A) Route 53 Resolver Inbound Endpoint → Route 53 Resolver 인바운드 엔드포인트
- B) Route 53 Resolver Outbound Endpoint → Route 53 Resolver 아웃바운드 엔드포인트
- C) A Private Hosted Zone → 프라이빗 호스팅 영역
- D) A Public Hosted Zone → 퍼블릭 호스팅 영역

**정답:** B

**선지별 해설:**
- **A) Resolver 인바운드 엔드포인트:** 인바운드 엔드포인트는 온프레미스 네트워크에서 VPC 내의 Route 53 Resolver로 DNS 쿼리를 전달할 때 사용합니다. 즉, 온프레미스 → VPC 방향의 DNS 해석입니다. 이 시나리오는 반대 방향(VPC → 온프레미스)이므로 적합하지 않습니다.
- **B) Resolver 아웃바운드 엔드포인트 (정답):** 아웃바운드 엔드포인트는 VPC 내에서 온프레미스(또는 다른 네트워크)의 DNS 서버로 쿼리를 전달할 때 사용합니다. 전달 규칙(Forwarding Rules)을 설정하여 특정 도메인에 대한 DNS 쿼리를 온프레미스 DNS 서버로 보냅니다. VPC → 온프레미스 방향입니다.
- **C) 프라이빗 호스팅 영역:** Private Hosted Zone은 VPC 내에서 프라이빗 DNS 이름을 해석하는 데 사용됩니다. 온프레미스의 DNS를 해석하는 기능은 없습니다.
- **D) 퍼블릭 호스팅 영역:** Public Hosted Zone은 인터넷에서 접근 가능한 DNS 레코드를 관리합니다. 온프레미스 프라이빗 DNS 해석과는 관련이 없습니다.

**핵심 개념:** Route 53 Resolver — 인바운드(온프레미스→VPC) vs 아웃바운드(VPC→온프레미스) 엔드포인트

---
