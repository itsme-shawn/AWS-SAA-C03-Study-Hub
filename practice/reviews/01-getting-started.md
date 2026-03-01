# Section 01 - Getting Started 연습문제 해설

---

### Q1. A company is planning to deploy a new application on AWS. The application must comply with local data residency laws that require all data to remain within a specific country. Which factor should the Solutions Architect prioritize when choosing an AWS Region?

**한글 번역:** 한 회사가 AWS에 새로운 애플리케이션을 배포할 계획입니다. 이 애플리케이션은 모든 데이터가 특정 국가 내에 남아 있어야 하는 현지 데이터 거주 법률을 준수해야 합니다. Solutions Architect가 AWS 리전을 선택할 때 가장 우선시해야 할 요소는 무엇입니까?

**선지:**
- A) Proximity to the development team → 개발팀과의 근접성
- B) Availability of the latest AWS services → 최신 AWS 서비스의 가용성
- C) Compliance with data governance and legal requirements → 데이터 거버넌스 및 법적 요구 사항 준수
- D) Lowest possible pricing for EC2 instances → EC2 인스턴스의 최저 가격

**정답:** C

**선지별 해설:**
- **A) 개발팀 근접성:** 개발팀과의 물리적 거리는 편의성 측면에서는 고려할 수 있지만, 데이터 거주 법률 준수보다 우선순위가 높을 수 없습니다. 법적 요구 사항이 항상 먼저입니다.
- **B) 최신 서비스 가용성:** 새로운 서비스가 모든 리전에 동시에 출시되지는 않지만, 법적 규정 준수가 서비스 가용성보다 항상 우선합니다.
- **C) 데이터 거버넌스 및 법적 요구 사항 준수:** 정답입니다. AWS 리전 선택 시 가장 먼저 고려해야 할 요소는 컴플라이언스(규정 준수)입니다. 데이터 거주 법률이 있는 경우, 해당 국가 내에 있는 리전을 반드시 선택해야 합니다. 이를 위반하면 법적 제재를 받을 수 있습니다.
- **D) 최저 가격:** 비용 최적화는 중요한 고려 사항이지만, 법적 규정 준수보다 우선할 수 없습니다. 규정을 먼저 충족한 후 비용을 고려해야 합니다.

**핵심 개념:** AWS 리전 선택 시 고려 요소 (Compliance > Latency > Pricing > Services)

---

### Q2. Which of the following AWS services is a Global service, NOT scoped to a specific Region?

**한글 번역:** 다음 AWS 서비스 중 특정 리전에 국한되지 않는 글로벌 서비스는 무엇입니까?

**선지:**
- A) Amazon EC2 → Amazon EC2
- B) AWS Lambda → AWS Lambda
- C) Amazon Route 53 → Amazon Route 53
- D) Amazon RDS → Amazon RDS

**정답:** C

**선지별 해설:**
- **A) Amazon EC2:** EC2는 리전별 서비스입니다. 인스턴스는 특정 리전의 특정 가용 영역(AZ)에서 실행됩니다.
- **B) AWS Lambda:** Lambda도 리전별 서비스입니다. Lambda 함수는 특정 리전에 생성되고 실행됩니다.
- **C) Amazon Route 53:** 정답입니다. Route 53은 AWS의 DNS 서비스로, 글로벌 서비스입니다. DNS는 본질적으로 전 세계적으로 작동하므로 특정 리전에 국한되지 않습니다. IAM, CloudFront, WAF도 글로벌 서비스에 해당합니다.
- **D) Amazon RDS:** RDS는 리전별 서비스입니다. 데이터베이스 인스턴스는 특정 리전의 특정 AZ에서 운영됩니다.

**핵심 개념:** AWS 글로벌 서비스 vs 리전 서비스 (Global: IAM, Route 53, CloudFront, WAF)

---

### Q3. A Solutions Architect needs to design a highly available architecture. What is the minimum number of Availability Zones in any AWS Region?

**한글 번역:** Solutions Architect가 고가용성 아키텍처를 설계해야 합니다. 모든 AWS 리전에 있는 가용 영역(AZ)의 최소 개수는 몇 개입니까?

**선지:**
- A) 1 → 1개
- B) 2 → 2개
- C) 3 → 3개
- D) 6 → 6개

**정답:** C

**선지별 해설:**
- **A) 1개:** 1개의 AZ만 있으면 고가용성을 보장할 수 없습니다. AWS는 모든 리전에 최소 3개의 AZ를 제공합니다.
- **B) 2개:** 2개가 아닙니다. AWS는 최소 3개의 AZ를 보장합니다.
- **C) 3개:** 정답입니다. AWS의 모든 리전은 최소 3개의 가용 영역(AZ)을 가지며, 최대 6개까지 가질 수 있습니다. 각 AZ는 하나 이상의 개별 데이터 센터로 구성되며, 서로 물리적으로 분리되어 있어 장애 격리가 가능합니다.
- **D) 6개:** 6개는 최대 AZ 수에 해당합니다. 모든 리전이 6개의 AZ를 가지는 것은 아닙니다.

**핵심 개념:** AWS 리전 및 가용 영역(AZ) 구조 (최소 3개, 최대 6개 AZ)

---

### Q4. What is the primary purpose of AWS Edge Locations?

**한글 번역:** AWS 엣지 로케이션(Edge Location)의 주요 목적은 무엇입니까?

**선지:**
- A) To host EC2 instances closer to users → 사용자에게 더 가까운 곳에서 EC2 인스턴스를 호스팅
- B) To deliver content to end users with lower latency → 더 낮은 지연 시간으로 최종 사용자에게 콘텐츠 전달
- C) To provide additional Availability Zones for a Region → 리전에 추가 가용 영역 제공
- D) To store EBS snapshots for disaster recovery → 재해 복구를 위한 EBS 스냅샷 저장

**정답:** B

**선지별 해설:**
- **A) EC2 인스턴스 호스팅:** 엣지 로케이션에서는 EC2 인스턴스를 실행할 수 없습니다. EC2는 리전 내 AZ에서 실행됩니다.
- **B) 낮은 지연 시간으로 콘텐츠 전달:** 정답입니다. 엣지 로케이션은 CloudFront(CDN)와 함께 사용되어 전 세계 사용자에게 캐시된 콘텐츠를 낮은 지연 시간으로 전달합니다. 400개 이상의 엣지 로케이션이 전 세계에 분포되어 있습니다.
- **C) 추가 가용 영역 제공:** 엣지 로케이션은 AZ와 다른 개념입니다. AZ는 리전 내 데이터 센터 그룹이고, 엣지 로케이션은 콘텐츠 캐싱을 위한 별도의 인프라입니다.
- **D) EBS 스냅샷 저장:** EBS 스냅샷은 S3에 저장되며, 엣지 로케이션과는 관련이 없습니다.

**핵심 개념:** AWS 엣지 로케이션 및 CloudFront CDN (콘텐츠 캐싱, 저지연 전달)

---

### Q5. An application serving users globally is experiencing high latency for users in Asia. The application is currently deployed only in the us-east-1 Region. What is the MOST effective way to reduce latency for Asian users?

**한글 번역:** 전 세계 사용자에게 서비스하는 애플리케이션이 아시아 사용자들에게 높은 지연 시간을 경험하고 있습니다. 현재 애플리케이션은 us-east-1 리전에만 배포되어 있습니다. 아시아 사용자의 지연 시간을 줄이는 가장 효과적인 방법은 무엇입니까?

**선지:**
- A) Deploy the application in an additional Availability Zone within us-east-1 → us-east-1 내 추가 가용 영역에 애플리케이션 배포
- B) Use a larger EC2 instance type in us-east-1 → us-east-1에서 더 큰 EC2 인스턴스 유형 사용
- C) Deploy the application in an AWS Region closer to Asian users, such as ap-northeast-1 → 아시아 사용자에게 더 가까운 AWS 리전(예: ap-northeast-1)에 애플리케이션 배포
- D) Increase the number of Edge Locations in us-east-1 → us-east-1의 엣지 로케이션 수 증가

**정답:** C

**선지별 해설:**
- **A) 같은 리전 내 추가 AZ 배포:** 같은 리전 내의 AZ들은 물리적으로 가까이 위치해 있으므로, 아시아 사용자와의 거리는 여전히 멀어 지연 시간 개선에 효과가 없습니다. 이는 고가용성을 위한 전략이지 지연 시간 감소 전략이 아닙니다.
- **B) 더 큰 인스턴스 사용:** 인스턴스 크기를 늘리면 컴퓨팅 성능은 향상되지만, 네트워크 지연 시간(물리적 거리에 의한)은 줄일 수 없습니다.
- **C) 아시아 리전에 배포:** 정답입니다. 지연 시간을 줄이는 가장 효과적인 방법은 사용자와 물리적으로 가까운 리전에 애플리케이션을 배포하는 것입니다. ap-northeast-1(도쿄)은 아시아 사용자에게 훨씬 가까우므로 지연 시간이 크게 감소합니다.
- **D) 엣지 로케이션 수 증가:** 사용자가 엣지 로케이션의 수를 직접 제어할 수 없습니다. 엣지 로케이션은 AWS가 관리하는 인프라입니다. 또한 엣지 로케이션은 정적 콘텐츠 캐싱에 주로 사용됩니다.

**핵심 개념:** AWS 리전 선택과 지연 시간(Latency) - 사용자에게 가까운 리전 배포

---
