# Getting Started with AWS

## 개요
AWS(Amazon Web Services)는 온디맨드로 서버와 서비스를 제공하는 클라우드 플랫폼이다. SAA-C03 시험의 첫 번째 섹션으로, AWS의 글로벌 인프라 구조(Region, AZ, Edge Location)를 이해하는 것이 모든 서비스 학습의 기초가 된다. 시험에서 직접적으로 많이 출제되지는 않지만, Region 선택 기준과 글로벌/리전 서비스 구분은 반드시 알아야 한다.

## 핵심 개념

### AWS 역사 및 시장 위치
- 2002년 내부 런칭, 2004년 SQS로 공개, 2006년 SQS/S3/EC2로 재런칭
- 2023년 연 매출 $90B, 클라우드 시장 점유율 31% (1위, Microsoft 25%로 2위)
- Gartner Magic Quadrant에서 13년 연속 리더

### AWS 글로벌 인프라
- **Region (리전)**: 데이터 센터의 클러스터 (예: us-east-1, eu-west-3)
- **Availability Zone (가용 영역)**: 리전 내 독립된 데이터 센터 그룹
  - 각 리전은 보통 3개 AZ (최소 3, 최대 6)
  - 각 AZ는 하나 이상의 개별 데이터 센터로 구성
  - AZ 간 고대역폭, 초저지연 네트워크로 연결
  - 재해로부터 격리되도록 물리적으로 분리

> **AZ 내부에 DC가 여러 개인데 왜 Multi-AZ가 필요한가?**
>
> 한 AZ 안에 물리적 데이터센터 건물이 여러 개 있더라도, AWS는 이를 **단일 장애 도메인(Single Fault Domain)**으로 취급한다. 이유는 다음과 같다:
>
> 1. **네트워크 패브릭 공유** — AZ 내 DC들은 동일한 라우팅 도메인과 Spine/Leaf 네트워크 구조를 공유한다. 라우팅 계층 장애 시 해당 AZ 전체가 영향을 받는다.
> 2. **제어 평면(Control Plane) AZ 단위 구성** — EC2 배치 오케스트레이션, 내부 네트워크 컨트롤러, Storage 클러스터 컨트롤 등이 AZ 단위로 동작한다. 제어 계층 장애 시 AZ 전체가 영향을 받는다.
> 3. **전력·냉각 인프라의 지리적 근접성** — 같은 AZ 내 DC들은 물리적으로 가까워, 자연재해(홍수, 지진) 시 동시에 피해를 입을 수 있다.
>
> 따라서 **AZ 내부의 DC 다중화는 "하드웨어 레벨 장애"에 대한 보호**이고, **Multi-AZ 배포는 "AZ 레벨 장애"에 대한 보호**로 목적이 다르다. 고가용성을 위해서는 반드시 2개 이상의 AZ에 걸쳐 배포해야 한다.
- **Edge Location / Points of Presence**: 90+ 도시, 40+ 국가에 400+ 개
  - 최종 사용자에게 낮은 지연 시간으로 콘텐츠 전달 (CloudFront)

```text
AWS 글로벌 인프라 계층 구조
==========================

┌─── AWS Global Infrastructure ──────────────────────────────────────────┐
│                                                                        │
│  ┌─── Region (us-east-1) ────────────────────────────────────────┐    │
│  │                                                                │    │
│  │  ┌─── AZ (us-east-1a) ──┐  ┌─── AZ (us-east-1b) ──┐        │    │
│  │  │  ┌────────────────┐   │  │  ┌────────────────┐   │        │    │
│  │  │  │ Data Center 1  │   │  │  │ Data Center 1  │   │        │    │
│  │  │  └────────────────┘   │  │  └────────────────┘   │        │    │
│  │  │  ┌────────────────┐   │  │  ┌────────────────┐   │        │    │
│  │  │  │ Data Center 2  │   │◀─────▶│ Data Center 2  │   │        │    │
│  │  │  └────────────────┘   │고대역폭│  └────────────────┘   │        │    │
│  │  └───────────────────────┘초저지연└───────────────────────┘        │    │
│  │                                                                │    │
│  │  ┌─── AZ (us-east-1c) ──┐                                    │    │
│  │  │  ┌────────────────┐   │                                    │    │
│  │  │  │ Data Center 1  │   │   * 각 AZ는 물리적으로 분리       │    │
│  │  │  └────────────────┘   │   * 최소 3개, 최대 6개 AZ         │    │
│  │  └───────────────────────┘                                    │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                        │
│  ┌─── Edge Locations (400+) ─────────────────────────────────────┐    │
│  │  [Seoul] [Tokyo] [London] [NYC] [Sydney] [Mumbai] ...         │    │
│  │           CloudFront CDN - 콘텐츠 캐싱 및 저지연 전달          │    │
│  └────────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────┘
```

### Region 선택 기준 (시험 중요!)
1. **규정 준수 (Compliance)**: 데이터 거버넌스 및 법적 요구사항 - 명시적 허가 없이 데이터가 리전을 벗어나지 않음
2. **지연 시간 (Proximity)**: 고객과의 물리적 거리 → 지연 시간 감소
3. **서비스 가용성 (Available Services)**: 새로운 서비스/기능이 모든 리전에서 제공되지 않음
4. **가격 (Pricing)**: 리전마다 가격이 다름

```text
Region 선택 의사결정 흐름
=========================

  [Region 선택 시작]
         │
         ▼
  ┌──────────────────────┐    예    ┌──────────────────────┐
  │ 데이터 거버넌스/법적  │────────▶│ 해당 국가의 리전 선택  │
  │ 요구사항이 있는가?    │         │ (Compliance 최우선)   │
  └──────────────────────┘         └──────────────────────┘
         │ 아니오
         ▼
  ┌──────────────────────┐    예    ┌──────────────────────┐
  │ 주요 고객이 특정 지역 │────────▶│ 고객과 가까운 리전    │
  │ 에 집중되어 있는가?   │         │ (Proximity 고려)     │
  └──────────────────────┘         └──────────────────────┘
         │ 아니오
         ▼
  ┌──────────────────────┐    예    ┌──────────────────────┐
  │ 특정 AWS 서비스가     │────────▶│ 해당 서비스 지원 리전  │
  │ 필요한가?             │         │ (Available Services)  │
  └──────────────────────┘         └──────────────────────┘
         │ 아니오
         ▼
  ┌──────────────────────┐
  │ 가격이 가장 저렴한    │
  │ 리전 선택 (Pricing)   │
  └──────────────────────┘
```

### 글로벌 서비스 vs 리전 서비스
| 글로벌 서비스 | 리전 서비스 |
|-------------|-----------|
| IAM | EC2 (IaaS) |
| Route 53 (DNS) | Elastic Beanstalk (PaaS) |
| CloudFront (CDN) | Lambda (FaaS) |
| WAF | Rekognition (SaaS) |

```text
글로벌 서비스 vs 리전 서비스 구분
================================

  ┌─── Global Services (리전 무관) ───────────────────┐
  │                                                    │
  │   IAM          Route 53       CloudFront    WAF    │
  │  (인증/권한)    (DNS)          (CDN)        (방화벽)│
  │                                                    │
  └──────────────────────┬─────────────────────────────┘
                         │ 모든 리전에 적용
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  ┌─── Region A ──┐ ┌─── Region B ──┐ ┌─── Region C ──┐
  │ EC2    (IaaS) │ │ EC2    (IaaS) │ │ EC2    (IaaS) │
  │ Lambda (FaaS) │ │ Lambda (FaaS) │ │ Lambda (FaaS) │
  │ Beanstalk     │ │ Beanstalk     │ │ Beanstalk     │
  │ (PaaS)        │ │ (PaaS)        │ │ (PaaS)        │
  └───────────────┘ └───────────────┘ └───────────────┘
    리전별 독립 운영    리전별 독립 운영    리전별 독립 운영
```

## 시험 포인트
- Region 선택 시 4가지 기준을 문제 상황에 맞게 적용할 수 있어야 함
- AZ는 최소 3개이며, 고가용성을 위해 Multi-AZ 배포가 기본 패턴
- IAM, Route 53, CloudFront는 글로벌 서비스임을 기억
- Edge Location은 Region/AZ와 다른 개념 (콘텐츠 캐싱용)

## 치트시트
| 개념 | 설명 |
|------|------|
| Region | 2개 이상 AZ로 구성된 지리적 영역 |
| Availability Zone (AZ) | 1개 이상의 독립 데이터 센터, 재해 격리 |
| Edge Location | CloudFront 콘텐츠 캐싱 위치 (400+) |
| 글로벌 서비스 | IAM, Route 53, CloudFront, WAF |
| IaaS | EC2 (인프라 직접 관리) |
| PaaS | Elastic Beanstalk (플랫폼 제공) |
| FaaS | Lambda (함수 단위 실행) |
| SaaS | Rekognition (완성된 소프트웨어) |

---

## Practice Questions

### Q1. A company is planning to deploy a new application on AWS. The application must comply with local data residency laws that require all data to remain within a specific country. Which factor should the Solutions Architect prioritize when choosing an AWS Region?
**Options:**
- A) Proximity to the development team
- B) Availability of the latest AWS services
- C) Compliance with data governance and legal requirements
- D) Lowest possible pricing for EC2 instances

**Answer:** C

**해설:**

> **문제:** 한 회사가 AWS에 새 애플리케이션을 배포하려 한다. 이 애플리케이션은 모든 데이터가 특정 국가 내에 유지되어야 하는 현지 데이터 레지던시 법률을 준수해야 한다. Solutions Architect가 AWS Region을 선택할 때 우선시해야 할 요소는?

| 선지 | 번역 |
|------|------|
| A | 개발 팀과의 근접성 |
| B | 최신 AWS 서비스의 가용성 |
| C | 데이터 거버넌스 및 법적 요구사항 준수 |
| D | EC2 인스턴스의 최저 가격 |

**상세 풀이:** 데이터 거버넌스 및 법적 요구사항 준수가 Region 선택의 최우선 기준이다. AWS에서는 명시적 허가 없이 데이터가 리전을 벗어나지 않으므로, 해당 국가에 위치한 리전을 선택해야 한다. A의 개발 팀 근접성은 개발 편의에 도움이 될 수 있지만 법적 요구사항보다 우선하지 않으며, B의 최신 서비스 가용성은 기능적 고려사항이지 규정 준수 요건이 아니고, D의 최저 가격은 비용 최적화 요소이지만 데이터 레지던시 법률이 있는 경우 반드시 법적 요구사항을 먼저 충족해야 한다.

**핵심 개념:** AWS Region 선택 기준

### Q2. Which of the following AWS services is a Global service, NOT scoped to a specific Region?
**Options:**
- A) Amazon EC2
- B) AWS Lambda
- C) Amazon Route 53
- D) Amazon RDS

**Answer:** C

**해설:**

> **문제:** 다음 중 특정 Region에 종속되지 않는 글로벌 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon EC2 |
| B | AWS Lambda |
| C | Amazon Route 53 |
| D | Amazon RDS |

**상세 풀이:** Route 53은 DNS 서비스로 글로벌 서비스이다. IAM, CloudFront, WAF도 글로벌 서비스에 해당한다. A의 EC2는 리전별로 인스턴스를 생성하고 관리하는 리전 서비스이며, B의 Lambda 역시 특정 리전에서 함수를 배포하는 리전 서비스이고, D의 RDS도 리전 내에서 데이터베이스를 생성하는 리전 서비스이다. 글로벌 서비스와 리전 서비스의 구분은 시험에서 자주 출제된다.

**핵심 개념:** 글로벌 서비스 vs 리전 서비스

### Q3. A Solutions Architect needs to design a highly available architecture. What is the minimum number of Availability Zones in any AWS Region?
**Options:**
- A) 1
- B) 2
- C) 3
- D) 6

**Answer:** C

**해설:**

> **문제:** Solutions Architect가 고가용성 아키텍처를 설계해야 한다. 모든 AWS Region의 최소 Availability Zone 수는?

| 선지 | 번역 |
|------|------|
| A | 1 |
| B | 2 |
| C | 3 |
| D | 6 |

**상세 풀이:** 모든 AWS 리전은 최소 3개의 AZ를 가지며, 최대 6개까지 가질 수 있다. A의 1개는 최소 AZ 수보다 적고, B의 2개도 실제 최소값보다 적다. D의 6개는 리전이 가질 수 있는 최대 AZ 수이지 최소가 아니다. 고가용성 설계 시에는 최소 2개 AZ에 걸쳐 배포하는 것이 권장되며, 모든 리전이 최소 3개 AZ를 보유하므로 이 요건을 충족할 수 있다.

**핵심 개념:** Availability Zone

### Q4. What is the primary purpose of AWS Edge Locations?
**Options:**
- A) To host EC2 instances closer to users
- B) To deliver content to end users with lower latency
- C) To provide additional Availability Zones for a Region
- D) To store EBS snapshots for disaster recovery

**Answer:** B

**해설:**

> **문제:** AWS Edge Location의 주요 목적은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 사용자에게 더 가까이 EC2 인스턴스를 호스팅하기 위해 |
| B | 최종 사용자에게 낮은 지연 시간으로 콘텐츠를 전달하기 위해 |
| C | Region에 추가 Availability Zone을 제공하기 위해 |
| D | 재해 복구를 위해 EBS 스냅샷을 저장하기 위해 |

**상세 풀이:** Edge Location은 CloudFront CDN의 콘텐츠 캐싱 포인트로, 전 세계 400개 이상의 위치에서 최종 사용자에게 낮은 지연 시간으로 콘텐츠를 전달하는 것이 주 목적이다. A의 EC2 인스턴스 호스팅은 Edge Location의 역할이 아니라 리전 내 AZ에서 이루어지며, C의 추가 AZ 제공은 Edge Location과 전혀 다른 개념이고, D의 EBS 스냅샷 저장은 리전 내 S3에서 처리되는 기능이다.

**핵심 개념:** Edge Location / Points of Presence

### Q5. An application serving users globally is experiencing high latency for users in Asia. The application is currently deployed only in the us-east-1 Region. What is the MOST effective way to reduce latency for Asian users?
**Options:**
- A) Deploy the application in an additional Availability Zone within us-east-1
- B) Use a larger EC2 instance type in us-east-1
- C) Deploy the application in an AWS Region closer to Asian users, such as ap-northeast-1
- D) Increase the number of Edge Locations in us-east-1

**Answer:** C

**해설:**

> **문제:** 전 세계 사용자에게 서비스하는 애플리케이션이 아시아 사용자에 대해 높은 지연 시간을 경험하고 있다. 현재 us-east-1 Region에만 배포되어 있다. 아시아 사용자의 지연 시간을 줄이는 가장 효과적인 방법은?

| 선지 | 번역 |
|------|------|
| A | us-east-1 내 추가 Availability Zone에 애플리케이션 배포 |
| B | us-east-1에서 더 큰 EC2 인스턴스 타입 사용 |
| C | ap-northeast-1과 같이 아시아 사용자에게 더 가까운 AWS Region에 애플리케이션 배포 |
| D | us-east-1의 Edge Location 수 증가 |

**상세 풀이:** 아시아 사용자의 지연 시간을 줄이려면 물리적으로 가까운 리전(예: ap-northeast-1 도쿄)에 배포해야 한다. A의 같은 리전 내 AZ 추가는 가용성은 높이지만 물리적 거리는 변하지 않아 지연 시간 개선에 효과가 없고, B의 인스턴스 크기 증가는 처리 성능을 높일 뿐 네트워크 지연 시간에는 영향이 없으며, D의 Edge Location 수는 AWS가 관리하는 것으로 사용자가 직접 제어할 수 없다.

**핵심 개념:** Region 선택 - Proximity (지연 시간)