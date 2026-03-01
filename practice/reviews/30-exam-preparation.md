# Section 30 - Exam Preparation 연습문제 해설

---

### Q1. Company designing multi-tier web app. Want to follow AWS best practices. Which TWO actions align with Well-Architected Framework?

**한글 번역:** 회사가 다중 계층 웹 앱을 설계하고 있습니다. AWS 모범 사례를 따르고자 합니다. Well-Architected Framework에 부합하는 두 가지 조치는 무엇입니까?

**선지:**
- A) Over-provision all resources → 모든 리소스를 과다 프로비저닝
- B) Use Auto Scaling to dynamically adjust → Auto Scaling을 사용하여 동적으로 조정
- C) Test only in development → 개발 환경에서만 테스트
- D) Use data-driven approaches for architectural decisions → 아키텍처 결정에 데이터 기반 접근 방식 사용
- E) Design fixed architecture that never changes → 변경되지 않는 고정 아키텍처 설계

**정답:** B, D

**선지별 해설:**
- **A) 과다 프로비저닝:** 모든 리소스를 과다 프로비저닝하면 비용이 불필요하게 증가합니다. Well-Architected Framework는 "용량 추측을 중단하라"고 권장하며, 실제 수요에 맞게 동적으로 확장하는 것을 모범 사례로 봅니다. 오답입니다.
- **B) Auto Scaling 동적 조정:** 정답입니다. Well-Architected Framework의 핵심 원칙 중 하나는 클라우드의 탄력성을 활용하는 것입니다. Auto Scaling을 사용하여 수요에 따라 리소스를 자동으로 조정하면 비용 효율성과 안정성을 동시에 달성할 수 있습니다.
- **C) 개발 환경에서만 테스트:** Well-Architected Framework는 프로덕션과 유사한 환경에서의 테스트를 권장합니다. "프로덕션 규모로 테스트하라"는 원칙이 있으며, 개발 환경에서만 테스트하면 프로덕션 문제를 사전에 발견할 수 없습니다. 오답입니다.
- **D) 데이터 기반 아키텍처 결정:** 정답입니다. Well-Architected Framework는 "데이터를 기반으로 아키텍처를 결정하라(Make informed decisions)"는 원칙을 강조합니다. 측정, 모니터링, 벤치마킹을 통해 데이터에 근거한 의사결정을 내려야 합니다.
- **E) 고정 아키텍처:** Well-Architected Framework는 "진화하는 아키텍처를 허용하라"고 권장합니다. 아키텍처는 비즈니스 요구사항과 기술 변화에 따라 지속적으로 개선되어야 합니다. 변경 불가능한 고정 아키텍처는 모범 사례에 위배됩니다. 오답입니다.

**핵심 개념:** Well-Architected Framework 설계 원칙 — Auto Scaling 활용, 데이터 기반 의사결정

---

### Q2. During exam, you see four answers. Two are simple managed service solutions, two are complex custom solutions. BEST approach?

**한글 번역:** 시험 중 네 개의 답을 봅니다. 두 개는 간단한 관리형 서비스 솔루션이고, 두 개는 복잡한 커스텀 솔루션입니다. 가장 좋은 접근 방식은 무엇입니까?

**선지:**
- A) Choose most complex → 가장 복잡한 것을 선택
- B) Eliminate complex solutions first and evaluate simpler ones → 복잡한 솔루션을 먼저 제거하고 간단한 솔루션을 평가
- C) Choose solution with most AWS services → 가장 많은 AWS 서비스를 사용하는 솔루션 선택
- D) Skip the question → 문제를 건너뛰기

**정답:** B

**선지별 해설:**
- **A) 가장 복잡한 것 선택:** AWS는 관리형 서비스와 간단한 솔루션을 선호합니다. 복잡한 솔루션은 운영 오버헤드가 높고 오류 가능성이 크므로, 시험에서도 일반적으로 정답이 아닙니다. 오답입니다.
- **B) 복잡한 솔루션 제거 후 간단한 솔루션 평가:** 정답입니다. SAA-C03 시험의 핵심 원칙은 "가장 간단하고 운영 오버헤드가 적은 솔루션"을 선택하는 것입니다. AWS 관리형 서비스를 활용하는 간단한 솔루션이 거의 항상 정답입니다. 소거법으로 복잡한 솔루션을 먼저 제거하면 정답 범위를 효과적으로 좁힐 수 있습니다.
- **C) 가장 많은 AWS 서비스 사용:** 많은 서비스를 사용한다고 좋은 것은 아닙니다. 불필요한 복잡성을 추가하며, 비용과 운영 오버헤드가 증가합니다. 필요한 최소한의 서비스로 요구사항을 충족하는 것이 올바른 접근입니다.
- **D) 문제 건너뛰기:** 시험에서 채점되지 않는 문제(15문제)가 있지만, 어떤 문제인지 알 수 없으므로 모든 문제에 답해야 합니다. 오답에 대한 감점이 없으므로 추측이라도 답을 선택하는 것이 유리합니다.

**핵심 개념:** 시험 전략 — 관리형 서비스 우선, 간단한 솔루션 우선, 소거법 활용

---

### Q3. Solutions architect needs to evaluate AWS account for security vulnerabilities, cost savings, service limit issues. Need programmatic access. Which combination?

**한글 번역:** 솔루션 아키텍트가 보안 취약점, 비용 절감, 서비스 한도 문제에 대해 AWS 계정을 평가해야 합니다. 프로그래밍 방식의 접근이 필요합니다. 어떤 조합을 사용해야 합니까?

**선지:**
- A) Well-Architected Tool + Basic Support → Well-Architected Tool + Basic Support
- B) Trusted Advisor + Developer Support → Trusted Advisor + Developer Support
- C) Trusted Advisor + Business Support → Trusted Advisor + Business Support
- D) Config + Enterprise Support → Config + Enterprise Support

**정답:** C

**선지별 해설:**
- **A) Well-Architected Tool + Basic:** Well-Architected Tool은 수동 아키텍처 리뷰 도구이며, 자동으로 보안 취약점이나 서비스 한도를 검사하지 않습니다. Basic Support에서는 Trusted Advisor의 핵심 검사만 제공되며, API 접근이 불가능합니다. 오답입니다.
- **B) Trusted Advisor + Developer:** Trusted Advisor는 올바른 서비스이지만, Developer Support 플랜에서는 핵심 검사(7개)만 사용할 수 있으며, 모든 검사에 대한 접근과 프로그래밍 방식의 API 접근이 제한됩니다. 오답입니다.
- **C) Trusted Advisor + Business:** 정답입니다. Business Support 플랜 이상에서는 Trusted Advisor의 모든 검사(비용 최적화, 보안, 내결함성, 성능, 서비스 한도)에 접근할 수 있으며, AWS Support API를 통해 프로그래밍 방식으로 검사 결과에 접근할 수 있습니다. 모든 요구사항을 충족합니다.
- **D) Config + Enterprise:** AWS Config는 리소스 구성 추적 서비스이며, 비용 절감이나 서비스 한도에 대한 추천을 제공하지 않습니다. Enterprise Support는 작동하지만 불필요하게 비싸며, Config는 적합한 서비스가 아닙니다.

**핵심 개념:** Trusted Advisor 전체 기능 = Business Support 이상 필요 (API 접근 포함)

---

### Q4. Company wants to understand how different AWS services work together for serverless architecture. Which TWO resources?

**한글 번역:** 회사가 서버리스 아키텍처에서 여러 AWS 서비스가 어떻게 함께 작동하는지 이해하려 합니다. 어떤 두 가지 리소스를 활용해야 합니까?

**선지:**
- A) https://aws.amazon.com/architecture/ → AWS Architecture Center
- B) https://aws.amazon.com/solutions/ → AWS Solutions Library
- C) CloudFormation documentation only → CloudFormation 문서만
- D) AWS pricing calculator only → AWS 요금 계산기만
- E) Individual EC2 instance specifications → 개별 EC2 인스턴스 사양

**정답:** A, B

**선지별 해설:**
- **A) AWS Architecture Center:** 정답입니다. AWS Architecture Center는 참조 아키텍처 다이어그램, 검증된 아키텍처 패턴, 모범 사례를 제공합니다. 서버리스를 포함한 다양한 아키텍처에서 AWS 서비스가 어떻게 함께 작동하는지 시각적으로 이해할 수 있습니다.
- **B) AWS Solutions Library:** 정답입니다. AWS Solutions Library는 일반적인 문제를 해결하기 위한 검증된 솔루션과 구현 가이드를 제공합니다. 서버리스 아키텍처를 포함한 다양한 패턴에 대해 AWS 서비스 조합과 구현 방법을 상세히 설명합니다.
- **C) CloudFormation 문서만:** CloudFormation 문서는 인프라 코드 작성에 대한 기술 문서이며, 서비스 간의 아키텍처 패턴이나 서버리스 아키텍처의 전체 그림을 이해하는 데는 적합하지 않습니다. 오답입니다.
- **D) AWS 요금 계산기만:** 요금 계산기는 비용 추정 도구이며, 서비스 간의 아키텍처 상호작용을 이해하는 데는 도움이 되지 않습니다. 오답입니다.
- **E) EC2 인스턴스 사양:** EC2 인스턴스 사양은 서버리스 아키텍처와 관련이 없습니다. 서버리스는 서버 관리 없이 코드를 실행하는 패러다임이므로, EC2 사양은 무관합니다. 오답입니다.

**핵심 개념:** AWS Architecture Center + Solutions Library — 아키텍처 패턴 및 서비스 조합 학습 리소스

---

### Q5. What is the minimum passing score for SAA-C03 exam, and how many questions?

**한글 번역:** SAA-C03 시험의 최소 합격 점수와 문제 수는 얼마입니까?

**선지:**
- A) 700/1000, 50 questions → 700/1000점, 50문제
- B) 720/1000, 65 questions → 720/1000점, 65문제
- C) 750/1000, 75 questions → 750/1000점, 75문제
- D) 720/1000, 75 questions → 720/1000점, 75문제

**정답:** B

**선지별 해설:**
- **A) 700점, 50문제:** SAA-C03의 합격 점수는 700이 아닌 720이며, 문제 수도 50이 아닌 65문제입니다. 오답입니다.
- **B) 720점, 65문제:** 정답입니다. SAA-C03 시험은 총 65문제로 구성되며, 그 중 50문제가 채점되고 15문제는 비채점(실험) 문제입니다. 최소 합격 점수는 1000점 만점에 720점입니다. 시험 시간은 130분입니다.
- **C) 750점, 75문제:** 합격 점수와 문제 수 모두 잘못되었습니다. 오답입니다.
- **D) 720점, 75문제:** 합격 점수는 맞지만 문제 수가 잘못되었습니다. 65문제가 아닌 75문제로 표시되어 있어 오답입니다.

**핵심 개념:** SAA-C03 시험 형식 — 65문제 (50채점+15비채점), 720/1000 합격, 130분
