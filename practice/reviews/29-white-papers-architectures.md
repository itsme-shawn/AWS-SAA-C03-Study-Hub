# Section 29 - White Papers & Architectures 연습문제 해설

---

### Q1. Company wants to review their AWS architecture against best practices across all six pillars of the Well-Architected Framework. Which tool?

**한글 번역:** 회사가 Well-Architected Framework의 6개 필러(기둥) 모두에 대해 AWS 아키텍처를 모범 사례와 비교하여 검토하려 합니다. 어떤 도구를 사용해야 합니까?

**선지:**
- A) AWS Trusted Advisor → AWS Trusted Advisor
- B) AWS Well-Architected Tool → AWS Well-Architected Tool
- C) AWS Config → AWS Config
- D) AWS CloudFormation → AWS CloudFormation

**정답:** B

**선지별 해설:**
- **A) Trusted Advisor:** Trusted Advisor는 비용 최적화, 성능, 보안, 내결함성, 서비스 한도에 대한 자동화된 검사를 제공하지만, Well-Architected Framework의 6개 필러에 대한 체계적인 아키텍처 리뷰를 수행하지 않습니다. 자동화된 리소스 수준 검사에 초점을 맞춥니다.
- **B) Well-Architected Tool:** 정답입니다. AWS Well-Architected Tool은 워크로드를 6개 필러(운영 우수성, 보안, 안정성, 성능 효율성, 비용 최적화, 지속 가능성)에 대해 체계적으로 평가합니다. 질문 기반의 리뷰 프로세스를 통해 위험을 식별하고 개선 사항을 추천합니다.
- **C) Config:** AWS Config는 AWS 리소스의 구성 변경을 추적하고 규정 준수를 평가하는 서비스입니다. 아키텍처 리뷰 도구가 아닙니다.
- **D) CloudFormation:** CloudFormation은 인프라를 코드로 프로비저닝하는 서비스이며, 아키텍처 리뷰나 모범 사례 평가 기능은 없습니다.

**핵심 개념:** AWS Well-Architected Tool — 6개 필러 기반 아키텍처 리뷰

---

### Q2. Which is NOT one of the six pillars of the AWS Well-Architected Framework?

**한글 번역:** 다음 중 AWS Well-Architected Framework의 6개 필러에 포함되지 않는 것은 무엇입니까?

**선지:**
- A) Operational Excellence → 운영 우수성
- B) Scalability → 확장성
- C) Sustainability → 지속 가능성
- D) Cost Optimization → 비용 최적화

**정답:** B

**선지별 해설:**
- **A) Operational Excellence (운영 우수성):** 6개 필러 중 하나입니다. 운영 프로세스를 통한 비즈니스 가치 제공, 지원 프로세스 및 절차의 지속적 개선에 초점을 맞춥니다.
- **B) Scalability (확장성):** 정답입니다. 확장성(Scalability)은 Well-Architected Framework의 독립적인 필러가 아닙니다. 6개 필러는: (1) Operational Excellence, (2) Security, (3) Reliability, (4) Performance Efficiency, (5) Cost Optimization, (6) Sustainability입니다. 확장성은 Performance Efficiency와 Reliability 필러 내에서 다루어지는 개념입니다.
- **C) Sustainability (지속 가능성):** 6개 필러 중 하나입니다. 2021년에 추가된 가장 최신 필러로, 환경적 영향을 최소화하는 아키텍처 설계에 초점을 맞춥니다.
- **D) Cost Optimization (비용 최적화):** 6개 필러 중 하나입니다. 불필요한 비용을 방지하고 비즈니스 성과를 달성하면서 최저 가격으로 시스템을 운영하는 데 초점을 맞춥니다.

**핵심 개념:** Well-Architected Framework 6개 필러 (운영 우수성, 보안, 안정성, 성능 효율성, 비용 최적화, 지속 가능성)

---

### Q3. Organization has Business Support plan. Want programmatic access to account-level recommendations for cost optimization, security, service limits. Which service?

**한글 번역:** 조직이 Business Support 플랜을 보유하고 있습니다. 비용 최적화, 보안, 서비스 한도에 대한 계정 수준 추천에 프로그래밍 방식으로 접근하려 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) AWS Well-Architected Tool → AWS Well-Architected Tool
- B) AWS Trusted Advisor with AWS Support API → AWS Trusted Advisor + AWS Support API
- C) AWS Cost Explorer → AWS Cost Explorer
- D) AWS Config → AWS Config

**정답:** B

**선지별 해설:**
- **A) Well-Architected Tool:** Well-Architected Tool은 워크로드 리뷰를 위한 도구이며, 자동화된 계정 수준 추천이나 프로그래밍 방식의 접근과는 다릅니다. 비용 최적화, 보안, 서비스 한도에 대한 자동 검사를 제공하지 않습니다.
- **B) Trusted Advisor + Support API:** 정답입니다. AWS Trusted Advisor는 비용 최적화, 성능, 보안, 내결함성, 서비스 한도에 대한 자동화된 추천을 제공합니다. Business 또는 Enterprise Support 플랜에서는 모든 Trusted Advisor 검사에 접근할 수 있으며, AWS Support API를 통해 프로그래밍 방식으로 이러한 추천에 접근할 수 있습니다.
- **C) Cost Explorer:** Cost Explorer는 비용 분석 및 예측에 사용되지만, 보안이나 서비스 한도에 대한 추천은 제공하지 않습니다. 비용 관련 정보만 다룹니다.
- **D) Config:** AWS Config는 리소스 구성 추적 및 규정 준수 평가 서비스이며, 비용 최적화 추천이나 서비스 한도 모니터링을 제공하지 않습니다.

**핵심 개념:** Trusted Advisor + Business/Enterprise Support — 전체 검사 접근 + Support API로 프로그래밍 방식 접근

---

### Q4. According to Well-Architected Framework, what approach for capacity planning?

**한글 번역:** Well-Architected Framework에 따르면, 용량 계획에 대한 올바른 접근 방식은 무엇입니까?

**선지:**
- A) Over-provision for peak → 피크 시 대비 과다 프로비저닝
- B) Under-provision and scale manually → 부족하게 프로비저닝하고 수동으로 확장
- C) Stop guessing capacity needs and use auto scaling → 용량 추측을 중단하고 오토 스케일링 사용
- D) Use largest instance types → 가장 큰 인스턴스 유형 사용

**정답:** C

**선지별 해설:**
- **A) 피크 대비 과다 프로비저닝:** 과다 프로비저닝은 피크를 처리할 수 있지만, 비용이 낭비됩니다. 대부분의 시간 동안 사용하지 않는 리소스에 비용을 지불하게 됩니다. Well-Architected Framework의 비용 최적화 원칙에 위배됩니다.
- **B) 부족하게 프로비저닝 + 수동 확장:** 수동 확장은 느리고 인적 오류 가능성이 있으며, 트래픽 급증 시 서비스 중단이 발생할 수 있습니다. Well-Architected Framework의 안정성과 운영 우수성 원칙에 위배됩니다.
- **C) 용량 추측 중단 + 오토 스케일링:** 정답입니다. Well-Architected Framework의 핵심 설계 원칙 중 하나는 "Stop guessing your capacity needs"입니다. 클라우드의 탄력성을 활용하여 오토 스케일링으로 실제 수요에 따라 자동으로 리소스를 조정해야 합니다. 이는 비용 효율성과 안정성을 동시에 달성합니다.
- **D) 가장 큰 인스턴스 유형:** 가장 큰 인스턴스를 사용하는 것은 수직 확장(Scale Up)에 해당하며, 비용이 매우 높고 인스턴스 크기의 상한이 있습니다. 수평 확장(Scale Out)과 오토 스케일링이 더 적합합니다.

**핵심 개념:** Well-Architected 설계 원칙 — "Stop guessing your capacity needs" (오토 스케일링 활용)

---

### Q5. Which service provides recommendations across cost, performance, security, fault tolerance, service limits, operational excellence without installing software?

**한글 번역:** 소프트웨어 설치 없이 비용, 성능, 보안, 내결함성, 서비스 한도, 운영 우수성에 대한 추천을 제공하는 서비스는 무엇입니까?

**선지:**
- A) AWS Inspector → AWS Inspector
- B) AWS Trusted Advisor → AWS Trusted Advisor
- C) AWS GuardDuty → AWS GuardDuty
- D) AWS Well-Architected Tool → AWS Well-Architected Tool

**정답:** B

**선지별 해설:**
- **A) Inspector:** AWS Inspector는 EC2 인스턴스와 컨테이너의 보안 취약점을 자동으로 평가하는 서비스입니다. 보안 영역에만 초점을 맞추며, 비용, 성능, 서비스 한도 등에 대한 추천은 제공하지 않습니다.
- **B) Trusted Advisor:** 정답입니다. AWS Trusted Advisor는 AWS 계정을 자동으로 검사하여 비용 최적화, 성능, 보안, 내결함성, 서비스 한도, 운영 우수성의 6개 카테고리에서 추천을 제공합니다. 별도의 소프트웨어 설치 없이 AWS 콘솔이나 API를 통해 바로 사용할 수 있습니다.
- **C) GuardDuty:** AWS GuardDuty는 위협 탐지 서비스로, VPC Flow Logs, DNS 로그, CloudTrail 이벤트를 분석하여 악의적인 활동을 감지합니다. 보안 위협 탐지에만 특화되어 있으며, 다른 영역의 추천은 제공하지 않습니다.
- **D) Well-Architected Tool:** Well-Architected Tool은 수동 질문 기반의 아키텍처 리뷰 도구이며, Trusted Advisor처럼 자동으로 리소스를 검사하여 추천을 제공하지 않습니다. 사용자가 질문에 답하는 방식으로 동작합니다.

**핵심 개념:** AWS Trusted Advisor — 6개 카테고리 자동 검사 (설치 불필요, Support 플랜에 따라 접근 범위 상이)
