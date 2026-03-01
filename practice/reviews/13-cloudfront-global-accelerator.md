# Section 13 - CloudFront & Global Accelerator 연습문제 해설

---

### Q1. A company hosts a web application on EC2 behind ALB. Users globally experience high latency. Content includes both static images and dynamic API responses. Which solution improves performance for ALL users?

**한글 번역:** 회사가 ALB 뒤의 EC2에서 웹 애플리케이션을 호스팅하고 있습니다. 전 세계 사용자들이 높은 지연 시간을 경험하고 있습니다. 콘텐츠에는 정적 이미지와 동적 API 응답이 모두 포함됩니다. 모든 사용자의 성능을 개선하는 솔루션은 무엇입니까?

**선지:**
- A) S3 Cross-Region Replication → S3 교차 리전 복제
- B) Deploy Amazon CloudFront with ALB as origin → ALB를 오리진으로 하는 Amazon CloudFront 배포
- C) Use AWS Global Accelerator with ALB → ALB와 함께 AWS Global Accelerator 사용
- D) Deploy additional ALBs in every region → 모든 리전에 추가 ALB 배포

**정답:** B

**선지별 해설:**
- **A) S3 Cross-Region Replication:** S3 교차 리전 복제는 S3 버킷 간 데이터 복제에만 사용됩니다. 동적 API 응답에는 도움이 되지 않으며, 정적 이미지도 S3에 저장되어 있다는 언급이 없으므로 적합하지 않습니다.
- **B) CloudFront with ALB as origin:** 정답입니다. CloudFront는 전 세계 엣지 로케이션에서 정적 콘텐츠를 캐싱하고, 동적 콘텐츠도 AWS 백본 네트워크를 통해 오리진(ALB)까지 최적화된 경로로 전달합니다. 정적/동적 콘텐츠 모두에 대해 성능을 개선할 수 있는 가장 적합한 솔루션입니다.
- **C) Global Accelerator with ALB:** Global Accelerator는 TCP/UDP 트래픽을 AWS 글로벌 네트워크를 통해 최적 경로로 라우팅하지만, 콘텐츠 캐싱 기능이 없습니다. 정적 이미지에 대한 캐싱 이점을 제공하지 못하므로 "모든 사용자"의 성능 개선에는 CloudFront가 더 적합합니다.
- **D) Deploy additional ALBs in every region:** 모든 리전에 ALB와 EC2를 배포하면 비용이 매우 높아지고 운영 복잡성이 크게 증가합니다. 또한 데이터 동기화 문제도 발생합니다. 비현실적인 솔루션입니다.

**핵심 개념:** CloudFront는 정적 콘텐츠 캐싱 + 동적 콘텐츠 가속 모두 지원하는 CDN 서비스

---

### Q2. Confidential documents in S3 distributed via CloudFront. Documents must NOT be accessible directly from S3 URL. What to do?

**한글 번역:** S3에 저장된 기밀 문서를 CloudFront를 통해 배포합니다. 문서는 S3 URL에서 직접 접근할 수 없어야 합니다. 어떻게 해야 합니까?

**선지:**
- A) Configure S3 as static website and use CloudFront → S3를 정적 웹사이트로 구성하고 CloudFront 사용
- B) Use CloudFront with Origin Access Control (OAC) and update S3 bucket policy → CloudFront에서 Origin Access Control(OAC)을 사용하고 S3 버킷 정책 업데이트
- C) Enable S3 Transfer Acceleration and share pre-signed URLs → S3 Transfer Acceleration을 활성화하고 미리 서명된 URL 공유
- D) Use AWS Global Accelerator pointing to S3 → S3를 가리키는 AWS Global Accelerator 사용

**정답:** B

**선지별 해설:**
- **A) S3 static website + CloudFront:** S3를 정적 웹사이트로 구성하면 퍼블릭 액세스가 필요하므로, S3 URL로 직접 접근이 가능해집니다. 요구사항에 정면으로 위배됩니다.
- **B) CloudFront OAC + S3 bucket policy:** 정답입니다. OAC(Origin Access Control)를 설정하면 CloudFront만 S3 버킷에 접근할 수 있도록 제한할 수 있습니다. S3 버킷 정책에서 CloudFront 배포의 OAC만 허용하고 다른 모든 접근을 차단하면, 사용자는 반드시 CloudFront를 통해서만 문서에 접근할 수 있습니다. OAC는 기존 OAI(Origin Access Identity)의 후속 기능으로, AWS가 권장하는 최신 방식입니다.
- **C) S3 Transfer Acceleration + pre-signed URLs:** Transfer Acceleration은 업로드 속도 향상을 위한 것이지 접근 제한과 무관합니다. Pre-signed URL은 직접 S3 접근을 허용하므로 요구사항에 맞지 않습니다.
- **D) Global Accelerator pointing to S3:** Global Accelerator는 S3를 직접 오리진으로 지원하지 않으며, 콘텐츠 접근 제한 기능도 없습니다.

**핵심 개념:** CloudFront OAC(Origin Access Control)를 통한 S3 직접 접근 차단

---

### Q3. Gaming company deploying multiplayer game using UDP protocol. Players have high latency. Need static IP addresses and fast regional failover. Which service?

**한글 번역:** 게임 회사가 UDP 프로토콜을 사용하는 멀티플레이어 게임을 배포합니다. 플레이어들이 높은 지연 시간을 경험합니다. 고정 IP 주소와 빠른 리전 장애 조치가 필요합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) Amazon CloudFront → Amazon CloudFront
- B) Amazon Route 53 with latency-based routing → 지연 시간 기반 라우팅을 사용하는 Amazon Route 53
- C) AWS Global Accelerator → AWS Global Accelerator
- D) ALB with cross-zone load balancing → 교차 영역 로드 밸런싱을 사용하는 ALB

**정답:** C

**선지별 해설:**
- **A) Amazon CloudFront:** CloudFront는 HTTP/HTTPS 기반 CDN으로, UDP 프로토콜을 지원하지 않습니다. 게임 트래픽에 적합하지 않습니다.
- **B) Route 53 with latency-based routing:** Route 53은 DNS 기반 라우팅으로 지연 시간을 줄일 수 있지만, 고정 IP 주소를 제공하지 않으며 DNS TTL로 인해 장애 조치 속도가 느립니다(수십 초~수분).
- **C) AWS Global Accelerator:** 정답입니다. Global Accelerator는 (1) 고정 Anycast IP 2개를 제공하고, (2) UDP 프로토콜을 지원하며, (3) AWS 글로벌 네트워크를 통해 지연 시간을 줄이고, (4) 헬스체크를 통한 빠른 장애 조치(수초 이내)를 제공합니다. 모든 요구사항을 충족합니다.
- **D) ALB with cross-zone load balancing:** ALB는 단일 리전 내에서만 동작하며, UDP를 지원하지 않습니다(ALB는 HTTP/HTTPS만 지원). 고정 IP도 제공하지 않습니다.

**핵심 개념:** Global Accelerator — 고정 IP, UDP 지원, 빠른 장애 조치가 필요한 경우의 최적 솔루션

---

### Q4. Company deployed new website version. CloudFront serving stale content. TTL is 24 hours. FASTEST way to ensure users see updated content?

**한글 번역:** 회사가 새 버전의 웹사이트를 배포했습니다. CloudFront가 오래된 콘텐츠를 제공하고 있습니다. TTL은 24시간입니다. 사용자가 업데이트된 콘텐츠를 볼 수 있도록 하는 가장 빠른 방법은 무엇입니까?

**선지:**
- A) Wait for TTL to expire → TTL이 만료될 때까지 기다림
- B) Create a new CloudFront distribution → 새 CloudFront 배포 생성
- C) Perform a CloudFront cache invalidation → CloudFront 캐시 무효화 수행
- D) Reduce the TTL to 0 seconds → TTL을 0초로 줄임

**정답:** C

**선지별 해설:**
- **A) Wait for TTL to expire:** TTL이 24시간이므로 최대 24시간을 기다려야 합니다. "가장 빠른 방법"이라는 요구사항에 부합하지 않습니다.
- **B) Create a new CloudFront distribution:** 새 배포를 생성하면 DNS 전파 시간이 필요하고, 기존 배포 삭제 등 불필요한 작업이 많아집니다. 과도한 조치이며 빠르지도 않습니다.
- **C) CloudFront cache invalidation:** 정답입니다. 캐시 무효화(Invalidation)를 수행하면 CloudFront 엣지 로케이션의 캐시된 콘텐츠를 즉시 제거하여 다음 요청 시 오리진에서 최신 콘텐츠를 가져오게 합니다. 가장 빠르고 적절한 방법입니다.
- **D) Reduce TTL to 0 seconds:** TTL을 줄이는 것은 향후 캐싱 동작을 변경하지만, 이미 캐시된 콘텐츠는 기존 TTL이 만료될 때까지 유지됩니다. 또한 TTL 0은 모든 요청을 오리진으로 전달하여 성능과 비용 측면에서 비효율적입니다.

**핵심 개념:** CloudFront Cache Invalidation으로 즉시 캐시 갱신 가능

---

### Q5. Company wants to deliver content from private subnets through CloudFront without exposing to internet. Which feature?

**한글 번역:** 회사가 프라이빗 서브넷의 콘텐츠를 인터넷에 노출하지 않고 CloudFront를 통해 전달하려고 합니다. 어떤 기능을 사용해야 합니까?

**선지:**
- A) Origin Access Control (OAC) → Origin Access Control (OAC)
- B) CloudFront Signed URLs → CloudFront 서명된 URL
- C) VPC Origin → VPC 오리진
- D) AWS PrivateLink → AWS PrivateLink

**정답:** C

**선지별 해설:**
- **A) Origin Access Control (OAC):** OAC는 S3 버킷에 대한 접근을 CloudFront로만 제한하는 기능입니다. VPC 프라이빗 서브넷의 리소스에는 적용되지 않습니다.
- **B) CloudFront Signed URLs:** 서명된 URL은 콘텐츠 접근을 특정 사용자에게 제한하는 인증 메커니즘입니다. 프라이빗 서브넷과의 연결과는 무관합니다.
- **C) VPC Origin:** 정답입니다. CloudFront VPC Origin 기능을 사용하면 프라이빗 서브넷에 있는 ALB, NLB, EC2 인스턴스 등을 CloudFront의 오리진으로 직접 연결할 수 있습니다. 오리진을 인터넷에 노출할 필요 없이 CloudFront를 통해서만 콘텐츠를 전달할 수 있습니다.
- **D) AWS PrivateLink:** PrivateLink는 VPC 간 또는 AWS 서비스와의 프라이빗 연결을 제공하지만, CloudFront와 프라이빗 서브넷 간 연결에는 사용되지 않습니다.

**핵심 개념:** CloudFront VPC Origin — 프라이빗 서브넷의 리소스를 인터넷에 노출하지 않고 CloudFront로 전달

---

### Q6. Improve availability of global application. Must have fast failover (<1 minute). Firewall only allows whitelisting a small number of static IPs. Which solution?

**한글 번역:** 글로벌 애플리케이션의 가용성을 개선해야 합니다. 빠른 장애 조치(1분 미만)가 필요합니다. 방화벽이 소수의 고정 IP만 화이트리스트로 허용합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) CloudFront with multiple origins → 다중 오리진을 사용하는 CloudFront
- B) AWS Global Accelerator with health checks → 헬스체크를 사용하는 AWS Global Accelerator
- C) Route 53 with health checks and failover routing → 헬스체크와 장애 조치 라우팅을 사용하는 Route 53
- D) ALB with cross-region load balancing → 교차 리전 로드 밸런싱을 사용하는 ALB

**정답:** B

**선지별 해설:**
- **A) CloudFront with multiple origins:** CloudFront는 오리진 장애 조치를 지원하지만, 고정 IP 주소를 제공하지 않습니다. CloudFront의 IP는 동적으로 변경되므로 방화벽 화이트리스트에 적합하지 않습니다.
- **B) Global Accelerator with health checks:** 정답입니다. Global Accelerator는 (1) 고정 Anycast IP 2개를 제공하여 방화벽 화이트리스트에 적합하고, (2) 엔드포인트 헬스체크를 통해 수초 내 장애 조치가 가능합니다(1분 미만 요구사항 충족). 모든 요구사항을 완벽히 충족합니다.
- **C) Route 53 with health checks and failover routing:** Route 53은 DNS 기반이므로 고정 IP를 제공하지 않습니다. 또한 DNS TTL과 클라이언트 캐싱으로 인해 장애 조치에 수십 초~수분이 걸릴 수 있어 1분 미만 보장이 어렵습니다.
- **D) ALB with cross-region load balancing:** ALB는 단일 리전에서만 동작하며, 교차 리전 로드 밸런싱을 기본적으로 지원하지 않습니다.

**핵심 개념:** Global Accelerator — 고정 IP + 빠른 장애 조치 = 방화벽 화이트리스트 + 고가용성 요구사항의 핵심 키워드
