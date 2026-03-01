# Section 06 - High Availability & Scalability 연습문제 해설

---

### Q1. A company needs to route HTTP traffic to different microservices based on the URL path. Which load balancer should they use?

**한글 번역:** 한 회사가 URL 경로를 기반으로 HTTP 트래픽을 서로 다른 마이크로서비스로 라우팅해야 합니다. 어떤 로드 밸런서를 사용해야 합니까?

**선지:**
- A) CLB → Classic Load Balancer
- B) NLB → Network Load Balancer
- C) ALB → Application Load Balancer
- D) GWLB → Gateway Load Balancer

**정답:** C

**선지별 해설:**
- **A) CLB (Classic Load Balancer):** CLB는 이전 세대 로드 밸런서로, URL 경로 기반 라우팅을 지원하지 않습니다. AWS에서는 더 이상 CLB 사용을 권장하지 않습니다.
- **B) NLB (Network Load Balancer):** NLB는 레이어 4(TCP/UDP)에서 작동하며, HTTP 헤더나 URL 경로를 기반으로 라우팅할 수 없습니다. 초고성능, 저지연 네트워크 트래픽에 사용됩니다.
- **C) ALB (Application Load Balancer):** 정답입니다. ALB는 레이어 7(HTTP/HTTPS)에서 작동하며, URL 경로 기반 라우팅, 호스트 기반 라우팅, 쿼리 문자열/헤더 기반 라우팅을 지원합니다. 예: `/api/*`는 API 서비스로, `/web/*`는 웹 서비스로 라우팅. 마이크로서비스와 컨테이너 기반 아키텍처에 이상적입니다.
- **D) GWLB (Gateway Load Balancer):** GWLB는 레이어 3(네트워크)에서 작동하며, 서드파티 보안 어플라이언스(방화벽, IDS/IPS 등)로 트래픽을 라우팅하는 데 사용됩니다. HTTP 라우팅 용도가 아닙니다.

**핵심 개념:** ALB - 레이어 7, URL 경로/호스트/헤더 기반 라우팅, 마이크로서비스용

---

### Q2. A company requires a load balancer with a static IP address per AZ for whitelisting purposes. The application handles millions of requests per second. Which load balancer?

**한글 번역:** 한 회사가 화이트리스트 목적으로 AZ당 고정 IP 주소가 있는 로드 밸런서가 필요합니다. 애플리케이션은 초당 수백만 건의 요청을 처리합니다. 어떤 로드 밸런서를 사용해야 합니까?

**선지:**
- A) ALB → Application Load Balancer
- B) CLB → Classic Load Balancer
- C) NLB → Network Load Balancer
- D) GWLB → Gateway Load Balancer

**정답:** C

**선지별 해설:**
- **A) ALB:** ALB는 고정 IP를 제공하지 않습니다. ALB의 IP는 동적으로 변경되므로 화이트리스트에 IP를 등록하기 어렵습니다. (DNS 이름을 사용해야 합니다.)
- **B) CLB:** CLB도 고정 IP를 제공하지 않으며, 이전 세대 로드 밸런서입니다.
- **C) NLB:** 정답입니다. NLB(Network Load Balancer)는 AZ당 하나의 고정 IP 주소를 제공하며, Elastic IP를 할당할 수도 있습니다. 초당 수백만 건의 요청을 처리할 수 있는 초고성능을 제공합니다. 레이어 4에서 작동하여 매우 낮은 지연 시간(~100ms, ALB는 ~400ms)을 제공합니다. 고정 IP가 필요한 화이트리스트 시나리오에 적합합니다.
- **D) GWLB:** GWLB는 보안 어플라이언스 라우팅용이며, 일반 애플리케이션 로드 밸런싱에 사용되지 않습니다.

**핵심 개념:** NLB - AZ당 고정 IP/Elastic IP, 초고성능, 레이어 4, 화이트리스트용

---

### Q3. An application behind an ALB needs to get the real IP address of the client. How?

**한글 번역:** ALB 뒤에 있는 애플리케이션이 클라이언트의 실제 IP 주소를 얻어야 합니다. 어떻게 해야 합니까?

**선지:**
- A) From the source IP → 소스 IP에서
- B) From the X-Forwarded-For header → X-Forwarded-For 헤더에서
- C) From the Host header → Host 헤더에서
- D) From ALB access logs only → ALB 접근 로그에서만

**정답:** B

**선지별 해설:**
- **A) 소스 IP:** ALB를 통과하면 소스 IP는 ALB의 프라이빗 IP로 변경됩니다. 따라서 소스 IP에서는 클라이언트의 실제 IP를 확인할 수 없습니다.
- **B) X-Forwarded-For 헤더:** 정답입니다. ALB는 원래 클라이언트의 IP 주소를 `X-Forwarded-For` HTTP 헤더에 자동으로 삽입합니다. 애플리케이션은 이 헤더를 읽어 클라이언트의 실제 IP를 확인할 수 있습니다. 추가로 `X-Forwarded-Port`(원래 포트)와 `X-Forwarded-Proto`(원래 프로토콜)도 제공됩니다.
- **C) Host 헤더:** Host 헤더는 요청된 도메인 이름을 포함하며, 클라이언트 IP와는 관련이 없습니다.
- **D) ALB 접근 로그에서만:** ALB 접근 로그에서도 클라이언트 IP를 확인할 수 있지만, "에서만"이라는 제한은 틀립니다. X-Forwarded-For 헤더를 통해 실시간으로 확인하는 것이 표준 방법입니다.

**핵심 개념:** X-Forwarded-For 헤더 - ALB/프록시 뒤에서 클라이언트 실제 IP 확인

---

### Q4. A company needs to inspect all network traffic entering their VPC using third-party security appliances. Which service?

**한글 번역:** 한 회사가 서드파티 보안 어플라이언스를 사용하여 VPC로 들어오는 모든 네트워크 트래픽을 검사해야 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) ALB with WAF → WAF가 있는 ALB
- B) NLB with Security Groups → 보안 그룹이 있는 NLB
- C) Gateway Load Balancer → Gateway Load Balancer
- D) AWS Network Firewall → AWS Network Firewall

**정답:** C

**선지별 해설:**
- **A) ALB + WAF:** WAF(Web Application Firewall)는 HTTP/HTTPS 레이어에서 웹 공격(SQL 인젝션, XSS 등)을 방어합니다. 서드파티 보안 어플라이언스가 아닌 AWS 관리형 서비스이며, 모든 네트워크 트래픽(레이어 3)을 검사하는 것이 아닙니다.
- **B) NLB + Security Groups:** NLB와 보안 그룹은 기본적인 트래픽 필터링만 제공하며, 서드파티 보안 어플라이언스로의 트래픽 라우팅 기능이 아닙니다.
- **C) Gateway Load Balancer:** 정답입니다. GWLB(Gateway Load Balancer)는 레이어 3(IP 패킷)에서 작동하며, 모든 네트워크 트래픽을 서드파티 가상 어플라이언스(방화벽, IDS/IPS, 딥 패킷 검사 등)로 투명하게 라우팅합니다. GENEVE 프로토콜(포트 6081)을 사용하며, 트래픽 검사 후 원래 목적지로 전달합니다. 서드파티 보안 어플라이언스 연동 시 핵심 서비스입니다.
- **D) AWS Network Firewall:** Network Firewall은 AWS 관리형 방화벽 서비스로, 서드파티 어플라이언스가 아닙니다. "서드파티 보안 어플라이언스"라는 문제 조건에 맞지 않습니다.

**핵심 개념:** Gateway Load Balancer - 레이어 3, 서드파티 보안 어플라이언스 연동, GENEVE 프로토콜

---

### Q5. Which statement about Cross-Zone Load Balancing is correct?

**한글 번역:** 교차 영역 로드 밸런싱(Cross-Zone Load Balancing)에 대해 올바른 설명은 무엇입니까?

**선지:**
- A) Enabled by default for NLB with charges → NLB에서 기본 활성화, 요금 부과
- B) Enabled by default for ALB with no charges → ALB에서 기본 활성화, 요금 없음
- C) Enabled by default for all types → 모든 유형에서 기본 활성화
- D) Disabled by default for ALB with charges → ALB에서 기본 비활성화, 요금 부과

**정답:** B

**선지별 해설:**
- **A) NLB 기본 활성화 + 요금:** 틀립니다. NLB는 Cross-Zone Load Balancing이 기본적으로 비활성화되어 있습니다. 활성화하면 AZ 간 데이터 전송에 대한 요금이 부과됩니다.
- **B) ALB 기본 활성화 + 무료:** 정답입니다. ALB에서는 Cross-Zone Load Balancing이 기본적으로 활성화되어 있으며, 이에 대한 추가 요금이 없습니다. 이를 통해 모든 AZ의 등록된 대상에 균등하게 트래픽이 분산됩니다. Target Group 수준에서 비활성화할 수 있습니다.
- **C) 모든 유형 기본 활성화:** 틀립니다. CLB는 기본 비활성화(무료), NLB도 기본 비활성화(유료)입니다. ALB만 기본 활성화입니다.
- **D) ALB 기본 비활성화 + 유료:** 틀립니다. ALB는 기본 활성화이며 무료입니다.

**핵심 개념:** Cross-Zone LB - ALB: 기본 ON(무료) / NLB: 기본 OFF(유료) / CLB: 기본 OFF(무료)

---

### Q6. A web app needs to maintain user session state across requests behind an ALB. Which feature?

**한글 번역:** 웹 애플리케이션이 ALB 뒤에서 요청 간에 사용자 세션 상태를 유지해야 합니다. 어떤 기능을 사용해야 합니까?

**선지:**
- A) Cross-Zone Load Balancing → 교차 영역 로드 밸런싱
- B) Connection Draining → 연결 드레이닝
- C) Sticky Sessions → 고정 세션
- D) Health Checks → 상태 확인

**정답:** C

**선지별 해설:**
- **A) Cross-Zone Load Balancing:** 교차 영역 로드 밸런싱은 AZ 간 트래픽을 균등하게 분배하는 기능입니다. 세션 유지와는 관련이 없습니다.
- **B) Connection Draining:** 연결 드레이닝(Deregistration Delay)은 인스턴스가 등록 해제될 때 진행 중인 요청을 완료할 시간을 제공하는 기능입니다. 세션 유지 기능이 아닙니다.
- **C) Sticky Sessions:** 정답입니다. Sticky Sessions(세션 어피니티)은 동일한 클라이언트의 요청을 항상 같은 백엔드 인스턴스로 라우팅합니다. ALB에서 쿠키를 사용하여 구현됩니다. 두 가지 유형이 있습니다: (1) Application-based cookie(애플리케이션이 생성), (2) Duration-based cookie(ALB가 생성, AWSALB). 세션 데이터를 인스턴스 로컬에 저장하는 애플리케이션에 유용합니다.
- **D) Health Checks:** 상태 확인은 인스턴스의 정상 여부를 확인하는 기능입니다. 비정상 인스턴스로 트래픽을 보내지 않도록 합니다. 세션 유지와는 관련이 없습니다.

**핵심 개념:** Sticky Sessions - 동일 클라이언트 → 동일 인스턴스, 쿠키 기반(Application/Duration)

---

### Q7. An ASG needs to scale out when average CPU > 70% and scale in when < 30%. Which scaling policy?

**한글 번역:** ASG가 평균 CPU가 70%를 초과하면 스케일 아웃하고, 30% 미만이면 스케일 인해야 합니다. 어떤 스케일링 정책을 사용해야 합니까?

**선지:**
- A) Target Tracking → 대상 추적
- B) Simple/Step Scaling → 단순/단계 스케일링
- C) Scheduled Scaling → 예약 스케일링
- D) Predictive Scaling → 예측 스케일링

**정답:** B

**선지별 해설:**
- **A) Target Tracking:** Target Tracking은 특정 메트릭의 목표값을 설정하면 ASG가 자동으로 인스턴스 수를 조정합니다 (예: "평균 CPU를 50%로 유지"). 스케일 아웃과 스케일 인의 임계값을 각각 다르게 설정(70%, 30%)하는 것은 지원하지 않습니다.
- **B) Simple/Step Scaling:** 정답입니다. Simple/Step Scaling은 CloudWatch 알람을 기반으로 동작합니다. "CPU > 70% → 인스턴스 2개 추가" 와 "CPU < 30% → 인스턴스 1개 제거" 같이 서로 다른 임계값에 대해 서로 다른 스케일링 동작을 정의할 수 있습니다. Step Scaling은 알람 위반 크기에 따라 다른 수의 인스턴스를 추가/제거할 수 있어 더 세밀합니다.
- **C) Scheduled Scaling:** 예약 스케일링은 특정 시간/날짜에 맞춰 미리 예정된 스케일링을 수행합니다 (예: "매일 오전 9시에 인스턴스 10개로 확장"). CPU 메트릭 기반이 아닙니다.
- **D) Predictive Scaling:** 예측 스케일링은 과거 트래픽 패턴을 분석하여 미래의 수요를 예측하고 미리 스케일링합니다. 실시간 CPU 임계값 기반 스케일링이 아닙니다.

**핵심 개념:** Simple/Step Scaling - CloudWatch 알람 기반, 서로 다른 임계값에 다른 동작 정의 가능

---

### Q8. A company wants to use multiple SSL certificates on a single ALB to serve traffic for different domains. Which feature?

**한글 번역:** 한 회사가 단일 ALB에서 여러 SSL 인증서를 사용하여 서로 다른 도메인의 트래픽을 서비스하려고 합니다. 어떤 기능을 사용해야 합니까?

**선지:**
- A) SSL Termination → SSL 종료
- B) Server Name Indication (SNI) → 서버 이름 표시(SNI)
- C) Cross-Zone Load Balancing → 교차 영역 로드 밸런싱
- D) Connection Draining → 연결 드레이닝

**정답:** B

**선지별 해설:**
- **A) SSL Termination:** SSL 종료는 로드 밸런서에서 SSL/TLS 연결을 해제하는 것을 의미합니다. 단일 인증서 사용의 기본 기능이며, 여러 인증서를 관리하는 기능이 아닙니다.
- **B) Server Name Indication (SNI):** 정답입니다. SNI는 TLS 핸드셰이크 시 클라이언트가 연결하려는 호스트네임을 서버에 알려주는 프로토콜 확장입니다. 이를 통해 단일 ALB(또는 NLB)에서 여러 SSL 인증서를 호스팅하여 서로 다른 도메인의 트래픽을 처리할 수 있습니다. ALB와 NLB에서 지원되며, CLB에서는 지원되지 않습니다.
- **C) Cross-Zone Load Balancing:** 교차 영역 로드 밸런싱은 AZ 간 트래픽 분배 기능이며, SSL 인증서와 관련이 없습니다.
- **D) Connection Draining:** 연결 드레이닝은 인스턴스 등록 해제 시 진행 중인 연결을 완료하는 기능입니다. SSL과 관련이 없습니다.

**핵심 개념:** SNI (Server Name Indication) - 단일 ALB/NLB에서 다중 SSL 인증서, CLB 미지원

---
