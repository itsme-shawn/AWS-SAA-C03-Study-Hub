# White Papers & Architectures

## 개요
AWS Well-Architected Framework, Trusted Advisor, 참조 아키텍처 등 SAA-C03 시험에서 기본 원칙으로 출제되는 내용을 다룬다. 6가지 Pillar를 이해하고 각 핵심 원칙을 파악하는 것이 중요하다.

## 핵심 개념

### Well-Architected Framework 일반 원칙
- 용량 필요량을 추측하지 말 것 (**Stop guessing capacity needs**)
- 프로덕션 규모에서 시스템 테스트
- 아키텍처 실험을 쉽게 하도록 자동화
- **진화하는 아키텍처** 허용 (변화하는 요구사항 기반 설계)
- 데이터를 기반으로 아키텍처 결정
- **Game Days**로 개선 (플래시 세일 시뮬레이션 등)

### Well-Architected Framework 6 Pillars

```text
  Well-Architected Framework - 6 Pillars 구조도

                    ┌─────────────────────────────────┐
                    │   AWS Well-Architected Framework  │
                    │       (6 Pillars = 시너지)         │
                    └────────────────┬────────────────┘
                                     │
          ┌──────────┬──────────┬────┴────┬──────────┬──────────┐
          ▼          ▼          ▼         ▼          ▼          ▼
   ┌────────────┐┌────────┐┌──────────┐┌─────────┐┌─────────┐┌────────────┐
   │ Operational││Security││Reliabil- ││Perform- ││  Cost   ││Sustainab-  │
   │ Excellence ││        ││  ity     ││ ance    ││ Optim.  ││  ility     │
   │            ││        ││          ││Efficien.││         ││            │
   ├────────────┤├────────┤├──────────┤├─────────┤├─────────┤├────────────┤
   │ 운영       ││ 데이터  ││ 장애 복구 ││ 리소스   ││ 불필요   ││ 환경 영향  │
   │ 모니터링    ││ 보호    ││ 수요 충족 ││ 효율적   ││ 비용    ││ 최소화     │
   │ 지속 개선   ││ 접근제어 ││ 분산 설계 ││ 사용    ││ 제거    ││ 에너지효율 │
   │            ││ 위험관리 ││ 중단 완화 ││ 서비스   ││ ROI    ││            │
   │            ││        ││          ││ 선택    ││ 극대화  ││            │
   └────────────┘└────────┘└──────────┘└─────────┘└─────────┘└────────────┘

   핵심 도구:
   ┌──────────────────────┐    ┌───────────────────────┐
   │ Well-Architected Tool│    │   Trusted Advisor      │
   │ (워크로드별 검토)      │    │ (계정 수준 6카테고리)    │
   │ 무료, 보고서 생성      │    │ Business/Enterprise    │
   └──────────────────────┘    └───────────────────────┘
```

1. **Operational Excellence (운영 우수성)**: 시스템을 잘 운영하고, 모니터링하며, 지속적으로 개선 — "운영을 코드로, 실패를 통해 배우기"
2. **Security (보안)**: 데이터 보호, 시스템 보안, 위험 평가 — "누가 무엇에 접근하는지 항상 검증"
3. **Reliability (안정성)**: 장애로부터 빠르게 복구하고, 수요 변화에 대응 — "장애가 생겨도 서비스가 계속되도록"
4. **Performance Efficiency (성능 효율성)**: 리소스를 효율적으로 사용하고 수요에 맞는 성능 유지 — "올바른 리소스 유형과 크기 선택"
5. **Cost Optimization (비용 최적화)**: 불필요한 비용 제거, ROI 극대화 — "쓴 만큼만 지불, 낭비 없애기"
6. **Sustainability (지속 가능성)**: 환경 영향 최소화, 에너지 효율 향상 — "탄소 발자국 줄이기"

- 이 6개 Pillar는 **트레이드오프가 아니라 시너지** 관계 (보안을 강화한다고 비용이 반드시 오르는 것이 아님 — 올바른 설계로 함께 달성 가능)

### AWS Well-Architected Tool
- **무료** 도구: 6 Pillar에 대해 아키텍처를 검토
- 작동 방식:
  1. 워크로드 선택 및 질문 답변
  2. 6 Pillar에 대한 답변 검토
  3. 조언 받기: 비디오, 문서, 보고서 생성, 대시보드 결과

### AWS Trusted Advisor
- **AWS 계정 수준의 평가** (설치 불필요)
- **6가지 카테고리** 분석 및 권장사항:
  1. **Cost Optimization** (비용 최적화)
  2. **Performance** (성능)
  3. **Security** (보안)
  4. **Fault Tolerance** (내결함성)
  5. **Service Limits** (서비스 한도)
  6. **Operational Excellence** (운영 우수성)
- **Business & Enterprise Support Plan**에서 전체 체크 + AWS Support API 프로그래밍 접근 가능

```text
  Classic vs Serverless 참조 아키텍처

  ── Classic Architecture ──

  User → Route53 → ELB → EC2 (ASG) → ElastiCache
                                   → RDS (Multi-AZ)

  ┌──────┐   ┌───────┐   ┌─────┐   ┌──────────────┐   ┌─────────┐
  │ User │──►│Route53│──►│ ELB │──►│ EC2 (ASG)    │──►│   RDS   │
  └──────┘   └───────┘   └─────┘   │              │   │Multi-AZ │
                                    │  ┌──────────┐│   └─────────┘
                                    │  │ElastiCache││
                                    │  └──────────┘│
                                    └──────────────┘

  ── Serverless Architecture ──

  User → CloudFront → API GW → Lambda → DynamoDB

  ┌──────┐   ┌──────────┐   ┌───────┐   ┌────────┐   ┌──────────┐
  │ User │──►│CloudFront│──►│API GW │──►│ Lambda │──►│ DynamoDB │
  └──────┘   └─────┬────┘   └───────┘   └────────┘   └──────────┘
                   │
              ┌────┴────┐
              │   S3    │ (정적 콘텐츠)
              └─────────┘
```

### 참조 아키텍처
- 주요 아키텍처 패턴:
  - **Classic**: EC2, ELB, RDS, ElastiCache 등
  - **Serverless**: S3, Lambda, DynamoDB, CloudFront, API Gateway 등
- 추가 참조:
  - https://aws.amazon.com/architecture/
  - https://aws.amazon.com/solutions/

### 추천 White Papers
- Architecting for the Cloud: AWS Best Practices
- AWS Well-Architected Framework
- AWS Disaster Recovery

## 시험 포인트
- **6 Pillars** 이름과 각 Pillar의 핵심 초점을 기억
- Well-Architected Framework은 **트레이드오프가 아닌 시너지**
- **Trusted Advisor**: Business/Enterprise Support Plan에서 전체 체크 가능
- **Game Days**: 프로덕션 시뮬레이션으로 아키텍처 개선
- 시험에서는 특정 시나리오에 어떤 Pillar가 관련되는지 물을 수 있음

## 치트시트

| 기능/서비스 | 설명 |
|------------|------|
| Operational Excellence | 운영, 모니터링, 지속적 개선 |
| Security | 데이터 보호, 접근 제어, 위험 관리 |
| Reliability | 장애 복구, 수요 충족, 분산 설계 |
| Performance Efficiency | 리소스 효율적 사용, 적절한 서비스 선택 |
| Cost Optimization | 불필요한 비용 제거, ROI 극대화 |
| Sustainability | 환경 영향 최소화, 에너지 효율 |
| Well-Architected Tool | 무료, 6 Pillar 검토, 보고서 생성 |
| Trusted Advisor | 계정 평가, 6가지 카테고리, Business/Enterprise Plan |

---

## Practice Questions

### Q1. A company wants to review their AWS architecture against best practices across all six pillars of the Well-Architected Framework. Which tool should they use?
**Options:**
- A) AWS Trusted Advisor
- B) AWS Well-Architected Tool
- C) AWS Config
- D) AWS CloudFormation

**Answer:** B

**해설:**

> **문제:** 한 회사가 Well-Architected Framework의 6가지 pillar 전반에 걸쳐 모범 사례에 대해 AWS 아키텍처를 검토하려 한다. 어떤 도구를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Trusted Advisor |
| B | AWS Well-Architected Tool |
| C | AWS Config |
| D | AWS CloudFormation |

**(A)** : Trusted Advisor는 계정 수준의 권장사항(비용, 보안, 서비스 한도 등)을 제공한다. Well-Architected Framework의 구조화된 워크로드별 검토는 제공하지 않는다.

**(B) 정답** : AWS Well-Architected Tool은 무료이며 6개 Pillar(Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability) 각각에 대한 조언과 보고서를 받을 수 있다.

**(C)** : AWS Config는 AWS 리소스 구성의 규정 준수 여부를 추적하는 서비스이다. 아키텍처 검토 도구가 아니다.

**(D)** : CloudFormation은 IaC(Infrastructure as Code) 도구이다. 인프라를 선언적으로 정의하는 용도이며 아키텍처 검토 도구가 아니다.

**핵심 개념:** AWS Well-Architected Tool

---

### Q2. Which of the following is NOT one of the six pillars of the AWS Well-Architected Framework?
**Options:**
- A) Operational Excellence
- B) Scalability
- C) Sustainability
- D) Cost Optimization

**Answer:** B

**해설:**

> **문제:** 다음 중 AWS Well-Architected Framework의 6가지 pillar에 포함되지 않는 것은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Operational Excellence (운영 우수성) |
| B | Scalability (확장성) |
| C | Sustainability (지속 가능성) |
| D | Cost Optimization (비용 최적화) |

**(A)** : Operational Excellence(운영 우수성)는 Well-Architected Framework의 정식 Pillar이다.

**(B) 정답** : Scalability(확장성)는 독립적인 Pillar가 아니다. Performance Efficiency와 Reliability Pillar의 하위 개념에 해당한다. 6 Pillars는 Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability이다.

**(C)** : Sustainability(지속 가능성)는 Well-Architected Framework의 정식 Pillar이다.

**(D)** : Cost Optimization(비용 최적화)는 Well-Architected Framework의 정식 Pillar이다.

**핵심 개념:** Well-Architected Framework 6 Pillars

---

### Q3. An organization has a Business Support plan and wants to programmatically access AWS account-level recommendations for cost optimization, security, and service limits. Which service provides this capability?
**Options:**
- A) AWS Well-Architected Tool
- B) AWS Trusted Advisor with AWS Support API
- C) AWS Cost Explorer
- D) AWS Config

**Answer:** B

**해설:**

> **문제:** Business Support plan을 보유한 조직이 비용 최적화, 보안, 서비스 한도에 대한 AWS 계정 수준 권장사항에 프로그래밍 방식으로 접근하려 한다. 어떤 서비스가 이 기능을 제공하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Well-Architected Tool |
| B | AWS Support API를 통한 AWS Trusted Advisor |
| C | AWS Cost Explorer |
| D | AWS Config |

**(A)** : Well-Architected Tool은 워크로드별로 6 Pillar에 대한 구조화된 검토를 수행하는 도구이다. 계정 수준의 자동 권장사항이 아니다.

**(B) 정답** : Trusted Advisor는 비용 최적화, 성능, 보안, 내결함성, 서비스 한도, 운영 우수성 등 6가지 카테고리의 권장사항을 제공한다. Business/Enterprise Support Plan에서 전체 체크와 AWS Support API를 통한 프로그래밍 접근이 가능하다.

**(C)** : Cost Explorer는 비용 시각화와 분석만 다룬다. 보안이나 서비스 한도는 포함하지 않는다.

**(D)** : Config는 AWS 리소스 구성의 변경 추적 및 규정 준수 평가용이다. 비용, 성능, 서비스 한도 등 종합적인 권장사항을 제공하지 않는다.

**핵심 개념:** Trusted Advisor - Business/Enterprise Support Plan

---

### Q4. A solutions architect is designing a new application architecture. According to the AWS Well-Architected Framework general guiding principles, what approach should the architect take regarding capacity planning?
**Options:**
- A) Over-provision resources to handle peak capacity
- B) Under-provision resources and scale manually when needed
- C) Stop guessing capacity needs and use auto scaling
- D) Use the largest instance types available to ensure performance

**Answer:** C

**해설:**

> **문제:** 솔루션스 아키텍트가 새로운 애플리케이션 아키텍처를 설계하고 있다. AWS Well-Architected Framework의 일반 지침 원칙에 따르면, 용량 계획에 대해 어떤 접근 방식을 취해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 예상치 못한 트래픽 급증에 대비하여 모든 리소스를 과도하게 프로비저닝한다 |
| B | 리소스를 부족하게 프로비저닝하고 필요할 때 수동으로 스케일한다 |
| C | 용량 추측을 중단하고 Auto Scaling을 사용한다 |
| D | 성능을 보장하기 위해 가장 큰 인스턴스 타입을 사용한다 |

**(A)** : 과도한 프로비저닝은 피크 시에만 필요한 리소스를 항상 유지한다. 비용 낭비이며 Cost Optimization 원칙에 반한다.

**(B)** : 수동 스케일링은 트래픽 변화에 대한 대응이 느리고 운영 부담이 크다. Operational Excellence 원칙에 반한다.

**(C) 정답** : Well-Architected Framework의 일반 원칙 중 핵심은 "Stop guessing your capacity needs"이다. Auto Scaling을 활용하여 실제 수요에 따라 리소스를 자동으로 조정해야 한다.

**(D)** : 가장 큰 인스턴스 사용은 불필요한 비용 낭비이다. 실제 워크로드 특성에 맞는 적절한 리소스를 선택해야 한다는 Performance Efficiency 원칙에 반한다.

**핵심 개념:** Well-Architected Framework - General Principles

---

### Q5. Which AWS service provides recommendations across cost optimization, performance, security, fault tolerance, service limits, and operational excellence without requiring any software installation?
**Options:**
- A) AWS Inspector
- B) AWS Trusted Advisor
- C) AWS GuardDuty
- D) AWS Well-Architected Tool

**Answer:** B

**해설:**

> **문제:** 소프트웨어 설치 없이 비용 최적화, 성능, 보안, 내결함성, 서비스 한도, 운영 우수성에 걸친 권장사항을 제공하는 AWS 서비스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | AWS Inspector |
| B | AWS Trusted Advisor |
| C | AWS GuardDuty |
| D | AWS Well-Architected Tool |

**(A)** : Inspector는 EC2 인스턴스와 컨테이너의 소프트웨어 취약성 및 네트워크 노출을 자동 스캔하는 보안 서비스이다. 6가지 카테고리의 종합적인 권장사항이 아니다.

**(B) 정답** : Trusted Advisor는 별도의 에이전트나 소프트웨어 설치 없이 AWS 계정을 자동으로 분석한다. 비용 최적화, 성능, 보안, 내결함성, 서비스 한도, 운영 우수성 등 6가지 카테고리의 권장사항을 제공한다.

**(C)** : GuardDuty는 AWS 계정과 워크로드에 대한 지능형 위협 탐지 서비스이다. 보안 영역에만 초점을 맞춘다.

**(D)** : Well-Architected Tool은 특정 워크로드에 대해 6 Pillar를 기반으로 구조화된 검토를 수행하는 도구이다. 계정 수준의 자동 권장사항과는 다르다.

**핵심 개념:** AWS Trusted Advisor
