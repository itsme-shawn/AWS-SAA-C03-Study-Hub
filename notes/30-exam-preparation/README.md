# Exam Preparation (시험 준비)

## 개요
SAA-C03 시험의 구조, 팁, 학습 전략, 자격증 경로 등을 다루는 최종 섹션이다. 시험 당일 준비 사항과 효과적인 문제 풀이 전략을 이해하는 것이 중요하다.

## 핵심 개념

```text
  SAA-C03 시험 도메인별 비중

  ┌─────────────────────────────────────────────────────────┐
  │              SAA-C03 시험 구성 (65문항)                    │
  ├─────────────────────────────────────────────────────────┤
  │                                                         │
  │  Domain 1: Secure Architecture         (30%)            │
  │  ████████████████████████████████░░░░░░░░░░░░░░░░░░░░  │
  │                                                         │
  │  Domain 2: Resilient Architecture      (26%)            │
  │  ████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░  │
  │                                                         │
  │  Domain 3: High-Performing Architecture(24%)            │
  │  ██████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░  │
  │                                                         │
  │  Domain 4: Cost-Optimized Architecture (20%)            │
  │  ██████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
  │                                                         │
  ├─────────────────────────────────────────────────────────┤
  │  합격: 720/1000  |  130분  |  65문항  |  $150 USD        │
  └─────────────────────────────────────────────────────────┘
```

### 시험 기본 정보
- 시험 등록: https://www.aws.training/
- **시험 비용**: $150 USD
- **문항 수**: 65문항
- **시험 시간**: 130분 (약 2분/문항)
- **합격 점수**: **720/1000점**
- 신분증 1개 필요 (ID, 여권 등)
- 메모, 펜, 말하기 금지
- 결과: **5일 이내** 합격/불합격 통보 (대부분 더 빨리)
- 점수: 며칠 후 이메일로 통보
- 어떤 문제를 맞았는지/틀렸는지 알 수 없음
- **불합격 시 14일 후 재응시 가능**

### 시험 전략

```text
  시험 문제 풀이 전략 흐름

  ┌──────────────────────────┐
  │    문제 읽기 (시나리오)     │
  └────────────┬─────────────┘
               ▼
  ┌──────────────────────────┐
  │  핵심 키워드 파악           │
  │  (비용, 가용성, 보안 등)    │
  └────────────┬─────────────┘
               ▼
  ┌──────────────────────────┐     ┌──────────────────────┐
  │  확실히 틀린 답 소거        │────►│ 복잡한 커스텀 솔루션   │ ✗ 제거
  │  (소거법)                  │     │ Deny 못하는 SG 등     │
  └────────────┬─────────────┘     └──────────────────────┘
               ▼
  ┌──────────────────────────┐
  │  남은 답 중 선택            │
  │  - 관리형 서비스 선호       │
  │  - 간단한 솔루션 선호       │
  │  - 과도하게 생각 금지       │
  └────────────┬─────────────┘
               ▼
  ┌──────────────────────────┐
  │  확신 없으면 Flag 표시      │
  │  → 나중에 재검토            │
  └──────────────────────────┘
```

#### 소거법 (Proceed by Elimination)
- 대부분의 문제가 **시나리오 기반**
- 확실히 틀린 답부터 제거
- 남은 답 중 가장 합리적인 것 선택
- 트릭 문제는 거의 없음
- **과도하게 생각하지 말 것**
- 해결책이 가능하지만 매우 복잡하면 아마 틀린 답

#### Flag 기능 활용
- 나중에 다시 볼 문제에 **Flag** 표시
- 마지막에 모든 문제/답변 선택적 검토 가능

### 학습 전략
- AWS가 처음이면 시험 전에 **실습 경험** 쌓기 (AWS Free Tier 계정으로 직접 만들어보기)
- AWS 1년 이상 실무 경험 권장
- 압도당하면 한 번 더 복습
- **Practice makes perfect** — 모의고사 풀기는 필수

#### 시험 도메인별 학습 우선순위
| 도메인 | 비중 | 핵심 서비스 |
|--------|------|------------|
| Secure Architecture (보안 아키텍처) | 30% | IAM, KMS, WAF, Shield, GuardDuty, Inspector, Macie, VPC |
| Resilient Architecture (탄력적 아키텍처) | 26% | EC2 ASG, RDS Multi-AZ, S3 버전 관리, Route 53, DR 전략 |
| High-Performing Architecture (고성능) | 24% | CloudFront, ElastiCache, DynamoDB DAX, Kinesis |
| Cost-Optimized Architecture (비용 최적화) | 20% | Spot Instance, S3 수명주기, Reserved Instances, Savings Plans |

### 추천 학습 자료
- **White Papers**:
  - Architecting for the Cloud: AWS Best Practices
  - AWS Well-Architected Framework
  - AWS Disaster Recovery (https://aws.amazon.com/disaster-recovery/)
- **각 서비스의 FAQ** 읽기 (예: https://aws.amazon.com/vpc/faqs/)
  - FAQ는 시험 문제의 많은 부분을 커버
  - 서비스 이해도 확인에 도움

### 커뮤니티 참여
- 강좌 Q&A에서 다른 사람들과 토론
- 다른 학습자의 질문 리뷰
- 모의 시험 풀기
- 온라인 포럼, 블로그 읽기
- 로컬 밋업 참석
- **re:Invent 비디오** (YouTube AWS 컨퍼런스) 시청

### AWS 자격증 경로

```text
  AWS 자격증 레벨 구조

  ┌─────────────────────────────────────────────────────────┐
  │                     Specialty                            │
  │   (전략적 영역 심화: Security, Networking, ML 등)          │
  ├─────────────────────────────────────────────────────────┤
  │                    Professional                          │
  │   (고급: Solutions Architect Pro, DevOps Pro)             │
  │   AWS 2년+ 경험 권장                                     │
  ├─────────────────────────────────────────────────────────┤
  │                     Associate          ◄── 현재 목표!     │
  │   (역할 기반: SA Associate, Developer, SysOps)            │
  │   클라우드 경험 권장                                      │
  ├─────────────────────────────────────────────────────────┤
  │                    Foundational                          │
  │   (기초: Cloud Practitioner)                              │
  │   사전 경험 불필요                                        │
  └─────────────────────────────────────────────────────────┘
       ▲ 난이도 상승
```

#### 레벨별 구조
| 레벨 | 설명 |
|------|------|
| **Foundational** | AWS Cloud 기초 이해, 사전 경험 불필요 |
| **Associate** | 역할 기반, AWS Cloud 전문가로서의 지식/기술 검증, 클라우드/온프레미스 경험 권장 |
| **Professional** | 고급 기술, 안전하고 최적화된 앱 설계, AWS 2년 경험 권장 |
| **Specialty** | 전략적 영역에서 심화 전문성 |

#### 주요 자격증 경로
- **Architecture**: Solutions Architect → Application Architect
- **Operations**: Systems Administrator → Cloud Engineer
- **DevOps**: Test Engineer → Cloud DevOps Engineer → DevSecOps Engineer
- **Security**: Cloud Security Engineer → Cloud Security Architect
- **Development**: Software Development Engineer
- **Networking**: Network Engineer
- **Data Analytics**: Cloud Data Engineer
- **AI/ML**: Machine Learning Engineer → Prompt Engineer → ML Ops Engineer → Data Scientist

## 시험 포인트
- **65문항 / 130분** = 문항당 약 2분
- **720/1000** 합격 기준
- 시나리오 기반 문제가 대부분 → 소거법 활용
- 복잡한 솔루션은 보통 오답
- Flag 기능으로 어려운 문제 표시 후 나중에 검토
- 서비스 FAQ는 시험 준비에 매우 유용

## 치트시트

| 항목 | 내용 |
|------|------|
| 시험 비용 | $150 USD |
| 문항 수 | 65문항 |
| 시험 시간 | 130분 |
| 합격 점수 | 720/1000 |
| 결과 통보 | 5일 이내 |
| 재응시 | 불합격 후 14일 |
| 핵심 전략 | 소거법, 과도한 생각 금지, Flag 활용 |
| 추천 자료 | White Papers, 서비스 FAQ, re:Invent 비디오 |

---

## Practice Questions

### Q1. A company is designing a multi-tier web application on AWS. They want to ensure the architecture follows AWS best practices. Which combination of actions aligns with the AWS Well-Architected Framework? (Select TWO)
**Options:**
- A) Over-provision all resources to handle unexpected traffic spikes
- B) Use Auto Scaling to dynamically adjust capacity based on demand
- C) Test systems only in development environments
- D) Use data-driven approaches to make architectural decisions
- E) Design a fixed architecture that never changes

**Answer:** B, D

**해설:**

> **문제:** 한 회사가 AWS에서 다중 계층 웹 애플리케이션을 설계하고 있다. 아키텍처가 AWS 모범 사례를 따르도록 하려 한다. AWS Well-Architected Framework에 부합하는 조합은 무엇인가? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 예상치 못한 트래픽 급증에 대비하여 모든 리소스를 과도하게 프로비저닝한다 |
| B | Auto Scaling을 사용하여 수요에 따라 용량을 동적으로 조정한다 |
| C | 개발 환경에서만 시스템을 테스트한다 |
| D | 데이터 기반 접근 방식으로 아키텍처 결정을 내린다 |
| E | 절대 변경되지 않는 고정 아키텍처를 설계한다 |

**(A)** : 과도한 프로비저닝은 "Stop guessing capacity needs" 원칙에 반한다. 비용 최적화 Pillar에 위배된다.

**(B) 정답** : Well-Architected Framework은 용량 추측을 중단하고 Auto Scaling을 사용하여 실제 수요에 따라 리소스를 자동 조정할 것을 권장한다.

**(C)** : 개발 환경에서만 테스트하는 것은 "프로덕션 규모에서 시스템 테스트" 원칙에 반한다. → [📖 Well-Architected Framework 일반 원칙](/section/29-white-papers-architectures#wellarchitected-framework-일반-원칙)

**(D) 정답** : Well-Architected Framework은 데이터를 기반으로 아키텍처 결정을 내릴 것("Make decisions based on data")을 강조한다.

**(E)** : 고정 아키텍처는 "진화하는 아키텍처 허용(변화하는 요구사항 기반 설계)" 원칙에 반한다.

**핵심 개념:** Well-Architected Framework General Principles

**관련 노트:** [Well-Architected Framework 일반 원칙](/section/29-white-papers-architectures#wellarchitected-framework-일반-원칙)

---

### Q2. During the SAA-C03 exam, you encounter a question with four possible answers. Two answers describe simple, straightforward solutions using managed AWS services. The other two describe complex custom solutions involving multiple Lambda functions, custom scripts, and manual configuration. What is the BEST approach?
**Options:**
- A) Choose the most complex solution as it likely covers all edge cases
- B) Eliminate the complex solutions first and evaluate the simpler managed service solutions
- C) Choose the solution with the most AWS services mentioned
- D) Skip the question entirely

**Answer:** B

**해설:**

> **문제:** SAA-C03 시험 중 4개의 답이 있는 문제를 만났다. 2개의 답은 관리형 AWS 서비스를 사용하는 간단하고 직관적인 솔루션이다. 나머지 2개는 여러 Lambda 함수, 커스텀 스크립트, 수동 구성을 포함하는 복잡한 커스텀 솔루션이다. 가장 좋은 접근 방식은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 모든 엣지 케이스를 다룰 가능성이 높은 가장 복잡한 솔루션을 선택한다 |
| B | 먼저 복잡한 솔루션을 소거하고, 더 간단한 관리형 서비스 솔루션을 평가한다 |
| C | 가장 많은 AWS 서비스가 언급된 솔루션을 선택한다 |
| D | 문제를 완전히 건너뛴다 |

**(A)** : 가장 복잡한 솔루션 선택은 시험 전략에 반한다. 복잡성은 정답의 지표가 아니다.

**(B) 정답** : AWS 시험에서는 해결책이 기술적으로 가능하더라도 매우 복잡하면 보통 오답이다. 복잡한 커스텀 솔루션을 먼저 소거하고 간단한 관리형 서비스 솔루션을 평가해야 한다.

**(C)** : 가장 많은 서비스가 언급된 답은 불필요한 서비스가 포함된 과도한 설계일 수 있다. 서비스 수가 정답의 지표가 아니다.

**(D)** : 문제 건너뛰기는 점수를 얻을 기회를 완전히 포기하는 것이다. 반드시 답을 선택해야 한다.

**핵심 개념:** Exam Strategy - Proceed by Elimination

**관련 노트:** [시험 전략](/section/30-exam-preparation#시험-전략)

---

### Q3. A solutions architect needs to evaluate their organization's AWS account for potential security vulnerabilities, cost savings opportunities, and service limit issues. They need programmatic access to these recommendations. Which combination is required?
**Options:**
- A) AWS Well-Architected Tool + Basic Support Plan
- B) AWS Trusted Advisor + Developer Support Plan
- C) AWS Trusted Advisor + Business Support Plan
- D) AWS Config + Enterprise Support Plan

**Answer:** C

**해설:**

> **문제:** 솔루션스 아키텍트가 조직의 AWS 계정에서 잠재적 보안 취약점, 비용 절감 기회, 서비스 한도 문제를 평가해야 한다. 이러한 권장사항에 프로그래밍 방식으로 접근해야 한다. 어떤 조합이 필요한가?

| 선지 | 번역 |
|------|------|
| A | AWS Well-Architected Tool + Basic Support Plan |
| B | AWS Trusted Advisor + Developer Support Plan |
| C | AWS Trusted Advisor + Business Support Plan |
| D | AWS Config + Enterprise Support Plan |

**(A)** : Well-Architected Tool은 워크로드별 구조화된 검토 도구이다. 계정 수준의 자동 권장사항을 제공하지 않는다. Basic Support Plan은 Trusted Advisor의 제한된 체크만 제공한다.

**(B)** : Developer Support Plan은 Trusted Advisor의 전체 체크와 API 접근을 제공하지 않는다. → [📖 AWS Trusted Advisor](/section/29-white-papers-architectures#aws-trusted-advisor)

**(C) 정답** : Trusted Advisor는 6가지 카테고리의 계정 수준 권장사항을 제공한다. 전체 체크와 AWS Support API를 통한 프로그래밍 접근은 Business 또는 Enterprise Support Plan에서만 가능하다.

**(D)** : AWS Config는 리소스 구성 추적 서비스이다. 비용 절감이나 서비스 한도 권장사항을 제공하지 않는다.

**핵심 개념:** Trusted Advisor + Business/Enterprise Support Plan

**관련 노트:** [AWS Trusted Advisor](/section/29-white-papers-architectures#aws-trusted-advisor)

---

### Q4. A company wants to understand how different AWS services work together for a serverless architecture. Which resources should the solutions architect consult? (Select TWO)
**Options:**
- A) https://aws.amazon.com/architecture/
- B) https://aws.amazon.com/solutions/
- C) AWS CloudFormation documentation only
- D) AWS pricing calculator only
- E) Individual EC2 instance specifications

**Answer:** A, B

**해설:**

> **문제:** 한 회사가 서버리스 아키텍처에서 다양한 AWS 서비스가 어떻게 함께 작동하는지 이해하려 한다. 솔루션스 아키텍트가 참고해야 할 리소스는 무엇인가? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | https://aws.amazon.com/architecture/ |
| B | https://aws.amazon.com/solutions/ |
| C | AWS CloudFormation 문서만 |
| D | AWS 가격 계산기만 |
| E | 개별 EC2 인스턴스 사양 |

**(A) 정답** : AWS Architecture Center는 다양한 참조 아키텍처 다이어그램과 모범 사례를 제공한다. 서비스 간 통합 패턴을 이해하는 데 최적이다. → [📖 참조 아키텍처](/section/29-white-papers-architectures#참조-아키텍처)

**(B) 정답** : AWS Solutions는 사전 구축된 솔루션과 구현 가이드를 제공한다. 서버리스 아키텍처 패턴을 이해하는 데 유용하다.

**(C)** : CloudFormation 문서는 IaC 도구에만 초점을 맞춘다. 아키텍처 패턴 전반을 다루지 않는다.

**(D)** : 가격 계산기는 비용 추정 도구이다. 아키텍처 패턴을 제공하지 않는다.

**(E)** : EC2 인스턴스 사양은 개별 인스턴스의 하드웨어 스펙만 다룬다. 서비스 간 통합 아키텍처와 관련이 없다.

**핵심 개념:** AWS Reference Architectures

**관련 노트:** [참조 아키텍처](/section/29-white-papers-architectures#참조-아키텍처)

---

### Q5. What is the minimum passing score for the AWS Solutions Architect Associate (SAA-C03) exam, and how many questions are on the exam?
**Options:**
- A) 700/1000, 50 questions
- B) 720/1000, 65 questions
- C) 750/1000, 75 questions
- D) 720/1000, 75 questions

**Answer:** B

**해설:**

> **문제:** AWS Solutions Architect Associate (SAA-C03) 시험의 최소 합격 점수와 문항 수는 얼마인가?

| 선지 | 번역 |
|------|------|
| A | 700/1000, 50문항 |
| B | 720/1000, 65문항 |
| C | 750/1000, 75문항 |
| D | 720/1000, 75문항 |

**(A)** : 합격 점수(700)와 문항 수(50) 모두 틀렸다. → [📖 시험 기본 정보](/section/30-exam-preparation#시험-기본-정보)

**(B) 정답** : SAA-C03 시험은 65문항이며 합격 점수는 1000점 만점 중 720점이다. 시험 시간은 130분(문항당 약 2분)이며 불합격 시 14일 후에 재응시할 수 있다.

**(C)** : 합격 점수(750)와 문항 수(75) 모두 틀렸다.

**(D)** : 합격 점수(720)는 맞지만 문항 수(75)가 틀렸다. 실제 문항 수는 65개이다.

**핵심 개념:** SAA-C03 Exam Structure

**관련 노트:** [시험 기본 정보](/section/30-exam-preparation#시험-기본-정보)
