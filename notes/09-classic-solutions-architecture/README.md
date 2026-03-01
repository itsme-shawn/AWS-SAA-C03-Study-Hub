# Classic Solutions Architecture

## 개요
이 섹션은 지금까지 배운 AWS 서비스들을 조합하여 실제 아키텍처를 설계하는 방법을 다룬다. Stateless/Stateful 웹 애플리케이션의 진화 과정, 인스턴스 빠른 시작 방법, Elastic Beanstalk을 통한 배포를 학습한다. SAA-C03 시험에서 아키텍처 설계 문제의 기초가 되는 핵심 섹션이다.

## 핵심 개념

### Case Study 1: WhatIsTheTime.com (Stateless)
시간을 알려주는 간단한 웹 앱의 아키텍처 진화 과정:

#### 1단계: 단순 시작
- Public EC2 인스턴스 + Elastic IP
- 단일 장애점, 다운타임 허용

#### 2단계: 수직 스케일링 (Vertical Scaling)
- 인스턴스 타입 업그레이드 (예: M5로)
- **업그레이드 중 다운타임 발생**

#### 3단계: 수평 스케일링 (Horizontal Scaling)
- 여러 EC2 인스턴스 + Route 53 (A Record, TTL 1시간)
- Elastic IP 제거, Public EC2 사용
- 문제: 인스턴스 제거 시 TTL 때문에 오래된 IP로 요청 가능

#### 4단계: 로드 밸런서 추가
- ELB + Health Check + Private EC2 인스턴스
- Route 53 **Alias Record** 사용
- 보안 그룹으로 트래픽 제한

#### 5단계: Auto Scaling Group
- ASG로 자동 인스턴스 관리
- 수요에 따라 자동 확장/축소

#### 6단계: Multi-AZ
- ELB + ASG를 **여러 AZ에 배포**
- AZ 장애 대비

#### 7단계: 비용 최적화
- 최소 2개 AZ 유지
- **Reserved Instances**로 비용 절감

#### 핵심 학습 포인트
- Public vs Private IP, EC2
- Elastic IP vs Route 53 vs Load Balancer
- Route 53 TTL, A Records, Alias Records
- 수동 EC2 관리 vs Auto Scaling Group
- Multi-AZ로 재해 대비
- ELB Health Check
- Security Group 규칙
- Reserved Instances로 비용 절감

### Case Study 2: MyClothes.com (Stateful)
> **초보자 포인트 - Stateful vs Stateless**:
> - **Stateful(상태 저장)**: 서버(EC2)가 사용자의 상태(세션, 장바구니 등)를 직접 기억하는 구조. 사용자가 같은 서버에 계속 연결되어야 하므로 확장이 어렵고 서버 장애 시 데이터 소실 위험이 있음
> - **Stateless(무상태)**: 서버가 아무것도 기억하지 않고, 상태 정보는 외부 저장소(ElastiCache, DynamoDB 등)나 클라이언트(쿠키)에 저장. 어느 서버로 요청이 가도 동일하게 동작하므로 수평 확장(Scale Out)이 쉬움
> - SAA-C03 시험의 아키텍처 설계 문제에서 "Stateless 아키텍처"는 거의 항상 정답 방향임

```text
[ Stateful → Stateless 아키텍처 진화 ]

 (Before) Stateful - 세션이 EC2에 저장
 ┌────────┐     ┌─────┐     ┌──────┐
 │ User A  │────▶│ ALB  │────▶│ EC2-1│ ← 세션 데이터 보유
 └────────┘     │     │     └──────┘
                │     │──X──▶┌──────┐
                │     │      │ EC2-2│ ← 세션 없음! (장바구니 소실)
                └─────┘      └──────┘

 (After) Stateless - 세션을 외부 저장소에 분리
 ┌────────┐     ┌─────┐     ┌──────┐
 │ User A  │────▶│ ALB  │────▶│ EC2-1│──┐
 └────────┘     │     │     └──────┘  │
                │     │               │  session_id
                │     │────▶┌──────┐  │
                └─────┘     │ EC2-2│──┤
                            └──────┘  │
                                      ▼
                           ┌──────────────────┐
                           │   ElastiCache /   │
                           │   DynamoDB        │
                           │  (세션 데이터 저장) │
                           └──────────────────┘
```

쇼핑 카트가 있는 온라인 의류 쇼핑 앱:

#### 1단계: 기본 구성
- Multi-AZ ELB + ASG
- 문제: 사용자가 다른 인스턴스에 연결 시 쇼핑 카트 소실

#### 2단계: ELB Stickiness (Session Affinity)
- 같은 사용자를 같은 인스턴스로 라우팅
- 인스턴스 장애 시 세션 소실

#### 3단계: User Cookies (클라이언트 측)
- 쇼핑 카트 내용을 Web Cookie로 전송
- **Stateless** 아키텍처
- 단점: 무거운 HTTP 요청, 보안 위험 (쿠키 변조), 4KB 제한

#### 4단계: Server Session (ElastiCache/DynamoDB)
- Web Cookie에 **session_id만** 저장
- 세션 데이터는 **ElastiCache 또는 DynamoDB**에 저장
- 서버 측 세션 관리

#### 5단계: 사용자 데이터 저장
- 주소, 이름 등 영구 데이터는 **Amazon RDS**에 저장

#### 6단계: 읽기 스케일링
- **RDS Read Replica**로 읽기 분산
- 또는 **ElastiCache** Lazy Loading으로 캐싱

#### 7단계: Multi-AZ
- ElastiCache, RDS 모두 **Multi-AZ** 구성

#### 8단계: Security Groups

```text
[ Security Group 체이닝 ]

  Internet
     │
     │  HTTP/HTTPS (0.0.0.0/0)
     ▼
┌──────────┐
│  ALB SG   │  ← Inbound: 80/443 from 0.0.0.0/0
└────┬─────┘
     │  from ALB SG only
     ▼
┌──────────┐
│  EC2 SG   │  ← Inbound: App Port from [ALB SG]
└────┬─────┘
     │  from EC2 SG only
     ├──────────────────────┐
     ▼                      ▼
┌──────────┐          ┌──────────┐
│  RDS SG   │          │ Cache SG  │
│           │          │           │
│ Inbound:  │          │ Inbound:  │
│ 3306 from │          │ 6379 from │
│ [EC2 SG]  │          │ [EC2 SG]  │
└──────────┘          └──────────┘
```

- ELB: HTTP/HTTPS 0.0.0.0/0 허용
- EC2: ELB 보안 그룹에서만 트래픽 허용
- ElastiCache: EC2 보안 그룹에서만 트래픽 허용
- RDS: EC2 보안 그룹에서만 트래픽 허용
- **보안 그룹 체이닝** (서로 참조)

#### 핵심 학습 포인트
- ELB Sticky Session
- Web Cookie로 Stateless 아키텍처
- ElastiCache/DynamoDB로 세션 저장
- RDS로 사용자 데이터 저장
- Read Replica 또는 ElastiCache로 읽기 스케일링
- Multi-AZ 구성
- 보안 그룹 체이닝

### Case Study 3: MyWordPress.com (Stateful + 이미지)
WordPress 블로그 + 이미지 업로드:

#### 데이터베이스 계층
- **Aurora MySQL** Multi-AZ + Read Replica
- Aurora의 자동 Multi-AZ, 쉬운 Read Replica

#### 이미지 저장 - EBS (단일 인스턴스)
- 한 EC2 인스턴스에 EBS 볼륨 연결
- 문제: 다른 AZ의 인스턴스에서 이미지 접근 불가

#### 이미지 저장 - EFS (분산 애플리케이션)
- **Amazon EFS**를 여러 AZ의 인스턴스에서 공유
- ENI(Elastic Network Interface)를 통해 연결
- 분산 환경에서 이미지 공유 가능

#### 핵심 학습 포인트
- Aurora로 Multi-AZ + Read Replica 간소화
- EBS: 단일 인스턴스용 (단일 AZ)
- **EFS: 분산 애플리케이션용 (여러 AZ)**

### 애플리케이션 빠른 시작 (Instantiating Quickly)

#### EC2 인스턴스
- **Golden AMI**: 애플리케이션, OS 의존성 등을 미리 설치한 AMI
- **User Data**: 동적 설정을 위한 부트스트랩 스크립트
- **Hybrid**: Golden AMI + User Data (Elastic Beanstalk 방식)

#### RDS Database
- **스냅샷에서 복원**: 스키마와 데이터가 준비된 상태로 시작

#### EBS Volume
- **스냅샷에서 복원**: 포맷 및 데이터가 준비된 상태로 시작

### 3-Tier 웹 아키텍처

```text
┌─────────────────────────────────────────────────────────────────┐
│                          AWS Region                              │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Public Subnet (AZ-a & AZ-b)                               │  │
│  │                                                            │  │
│  │  ┌──────────────┐         ┌──────────────┐                │  │
│  │  │  Route 53     │────────▶│     ALB       │                │  │
│  │  └──────────────┘  Alias  └──────┬───────┘                │  │
│  └──────────────────────────────────┼────────────────────────┘  │
│                                     │                            │
│  ┌──────────────────────────────────┼────────────────────────┐  │
│  │  Private Subnet (Application Tier)                         │  │
│  │                                  │                         │  │
│  │                          ┌───────┴───────┐                 │  │
│  │                          │  Auto Scaling  │                 │  │
│  │                          │    Group       │                 │  │
│  │                          ├───────────────┤                 │  │
│  │                          │ EC2  │  EC2   │                 │  │
│  │                          │ (AZa)│ (AZb)  │                 │  │
│  │                          └───┬───┬───────┘                 │  │
│  └──────────────────────────────┼───┼────────────────────────┘  │
│                                 │   │                            │
│  ┌──────────────────────────────┼───┼────────────────────────┐  │
│  │  Data Subnet (Database Tier) │   │                         │  │
│  │                              ▼   ▼                         │  │
│  │         ┌──────────────┐  ┌──────────────┐                │  │
│  │         │ ElastiCache   │  │  RDS / Aurora │                │  │
│  │         │ (Session/Cache)│  │  (Multi-AZ)  │                │  │
│  │         └──────────────┘  └──────────────┘                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Elastic Beanstalk
- 개발자 중심의 애플리케이션 배포 서비스
- EC2, ASG, ELB, RDS 등 모든 컴포넌트 자동 관리
- **개발자 책임: 애플리케이션 코드만**
- Beanstalk 자체는 무료 (기반 인스턴스 비용만 발생)
- 설정에 대한 완전한 제어 가능

#### Beanstalk 구성 요소
- **Application**: Beanstalk 컴포넌트의 모음
- **Application Version**: 코드의 반복 버전
- **Environment**: 특정 버전을 실행하는 AWS 리소스 모음 (한 번에 하나의 버전만)
  - **Tiers**: Web Server Tier / Worker Tier
  - 여러 환경 생성 가능 (dev, test, prod)

#### 지원 플랫폼
Go, Java SE, Java with Tomcat, .NET Core on Linux, .NET on Windows, Node.js, PHP, Python, Ruby, Packer Builder, Docker (Single/Multi/Preconfigured)

#### Web Server Tier vs Worker Tier
| Web Server Tier | Worker Tier |
|-----------------|-------------|
| ELB -> ASG -> EC2 (Web Server) | SQS Queue -> ASG -> EC2 (Worker) |
| HTTP 요청 처리 | SQS 메시지 처리 |
| | SQS 메시지 수에 따라 스케일링 |

#### 배포 모드
- **Single Instance**: 개발용 (Elastic IP, 단일 EC2, RDS)
- **High Availability with Load Balancer**: 프로덕션용 (ALB + ASG + Multi-AZ RDS)

## 시험 포인트
- **EBS vs EFS**: 단일 인스턴스 스토리지 -> EBS, 다중 인스턴스 공유 스토리지 -> EFS
- **Stateless 아키텍처**: 세션을 서버 외부(ElastiCache, DynamoDB)에 저장
- **Golden AMI**: 빠른 인스턴스 시작을 위한 사전 설정된 AMI
- **Security Group 체이닝**: ELB -> EC2 -> DB 순으로 보안 그룹 참조
- **3-Tier 아키텍처**: Public Subnet(ELB) / Private Subnet(EC2) / Data Subnet(RDS)
- **Elastic Beanstalk**: 코드만 제공하면 나머지는 자동 관리
- **Worker Tier**: SQS 큐의 메시지를 처리하는 백그라운드 작업용

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Stateless 아키텍처 | 세션을 서버 외부에 저장 (ElastiCache, DynamoDB, Cookie) |
| ELB + ASG + Multi-AZ | 고가용성 웹 애플리케이션의 기본 패턴 |
| Security Group 체이닝 | 계층 간 트래픽을 보안 그룹 참조로 제한 |
| Golden AMI | 빠른 EC2 부팅을 위한 사전 구성 이미지 |
| EBS | 단일 AZ, 단일 인스턴스 블록 스토리지 |
| EFS | 여러 AZ, 여러 인스턴스 공유 파일 스토리지 |
| Elastic Beanstalk | 개발자 중심 배포, 코드만 제공, 인프라 자동 관리 |
| Beanstalk Web Tier | ALB + ASG, HTTP 요청 처리 |
| Beanstalk Worker Tier | SQS + ASG, 백그라운드 작업 처리 |

---

## Practice Questions

### Q1. A company is designing a web application that stores user session data. The application runs on multiple EC2 instances behind an Application Load Balancer. Users report losing their shopping cart when they are routed to a different instance. What is the BEST solution to maintain session state without modifying the application?
**Options:**
- A) Enable ELB sticky sessions
- B) Store session data in Amazon ElastiCache
- C) Use Amazon EBS to store session data
- D) Store session data in Amazon S3

**Answer:** A

**해설:**

> **문제:** 회사가 사용자 세션 데이터를 저장하는 웹 애플리케이션을 설계하고 있다. 애플리케이션은 Application Load Balancer 뒤의 여러 EC2 인스턴스에서 실행된다. 사용자가 다른 인스턴스로 라우팅될 때 장바구니가 사라진다고 보고하고 있다. 애플리케이션을 수정하지 않고 세션 상태를 유지하는 최선의 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | ELB Sticky Session을 활성화한다 |
| B | 세션 데이터를 Amazon ElastiCache에 저장한다 |
| C | Amazon EBS를 사용하여 세션 데이터를 저장한다 |
| D | 세션 데이터를 Amazon S3에 저장한다 |

**상세 풀이:** 문제의 핵심 조건은 "애플리케이션 수정 없이(without modifying the application)"이다. ELB Sticky Session은 ALB 설정만으로 같은 사용자를 같은 EC2 인스턴스로 라우팅하여 세션을 유지할 수 있으므로 코드 변경이 필요 없다. ElastiCache(B)에 세션을 저장하는 것이 아키텍처적으로 더 나은 솔루션이지만, 애플리케이션 코드에서 세션 저장소를 ElastiCache로 변경하는 수정이 필요하다. EBS(C)는 단일 EC2 인스턴스에 연결되는 블록 스토리지로 인스턴스 간 세션 데이터를 공유할 수 없다. S3(D)는 객체 스토리지로 세션 데이터의 빈번한 읽기/쓰기에 적합하지 않으며 역시 코드 변경이 필요하다.

**핵심 개념:** ELB Sticky Sessions

---

### Q2. A solutions architect is designing a 3-tier web application. The web tier must be in a public subnet and the database tier must not be directly accessible from the internet. Which architecture meets this requirement?
**Options:**
- A) Place the ALB, EC2 instances, and RDS in public subnets
- B) Place the ALB in a public subnet, EC2 instances in a private subnet, and RDS in a private subnet
- C) Place all components in a private subnet with a NAT Gateway
- D) Place the ALB and EC2 instances in public subnets and RDS in a private subnet

**Answer:** B

**해설:**

> **문제:** 솔루션 아키텍트가 3-Tier 웹 애플리케이션을 설계하고 있다. 웹 티어는 퍼블릭 서브넷에 있어야 하고, 데이터베이스 티어는 인터넷에서 직접 접근할 수 없어야 한다. 어떤 아키텍처가 이 요구사항을 충족하는가?

| 선지 | 번역 |
|------|------|
| A | ALB, EC2 인스턴스, RDS를 모두 퍼블릭 서브넷에 배치한다 |
| B | ALB는 퍼블릭 서브넷에, EC2 인스턴스는 프라이빗 서브넷에, RDS는 프라이빗 서브넷에 배치한다 |
| C | 모든 컴포넌트를 NAT Gateway와 함께 프라이빗 서브넷에 배치한다 |
| D | ALB와 EC2 인스턴스는 퍼블릭 서브넷에, RDS는 프라이빗 서브넷에 배치한다 |

**상세 풀이:** 3-Tier 아키텍처의 모범 사례는 ALB를 퍼블릭 서브넷에, 애플리케이션 서버(EC2)를 프라이빗 서브넷에, 데이터베이스(RDS)를 프라이빗/데이터 서브넷에 배치하는 것이다. 이렇게 하면 인터넷에서는 ALB만 접근 가능하고, EC2와 RDS는 외부에서 직접 접근할 수 없어 보안이 강화된다. A는 RDS가 퍼블릭 서브넷에 있어 인터넷에서 접근 가능하게 되므로 요구사항을 위반한다. C는 ALB까지 프라이빗 서브넷에 배치하면 인터넷 사용자가 웹 애플리케이션에 접근할 수 없게 된다. D는 EC2 인스턴스가 불필요하게 퍼블릭 서브넷에 노출되어 보안 위험이 증가하며, 최소 권한 원칙에 부합하지 않는다.

**핵심 개념:** 3-Tier Architecture

---

### Q3. A company wants to quickly launch new EC2 instances with pre-installed applications and configurations for a disaster recovery scenario. Which approach provides the FASTEST launch time?
**Options:**
- A) Use EC2 User Data scripts to install and configure applications at boot
- B) Use a Golden AMI with all applications pre-installed
- C) Use AWS CloudFormation to provision the infrastructure
- D) Use a combination of Golden AMI and User Data scripts

**Answer:** B

**해설:**

> **문제:** 회사가 재해 복구 시나리오를 위해 사전 설치된 애플리케이션과 설정이 포함된 새 EC2 인스턴스를 빠르게 시작하려 한다. 가장 빠른 시작 시간을 제공하는 접근 방식은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | EC2 User Data 스크립트를 사용하여 부팅 시 애플리케이션을 설치 및 구성한다 |
| B | 모든 애플리케이션이 사전 설치된 Golden AMI를 사용한다 |
| C | AWS CloudFormation을 사용하여 인프라를 프로비저닝한다 |
| D | Golden AMI와 User Data 스크립트의 조합을 사용한다 |

**상세 풀이:** Golden AMI는 애플리케이션, OS 의존성, 설정 등이 모두 사전 설치되어 이미지에 포함되어 있으므로 인스턴스 시작 시 추가 설치 시간이 필요 없어 가장 빠른 시작 시간을 제공한다. User Data 스크립트(A)는 인스턴스 부팅 시 패키지 다운로드, 설치, 설정을 수행하므로 시작 완료까지 수 분이 추가로 소요된다. CloudFormation(C)은 인프라 리소스를 코드로 프로비저닝하는 도구이지 EC2 내부의 애플리케이션 설치 속도와 직접적 관련이 없다. Golden AMI + User Data 조합(D)은 AMI에 대부분의 설정이 포함되어 있더라도 User Data의 동적 설정 실행 시간이 추가되므로 순수 Golden AMI보다는 느리다.

**핵심 개념:** Golden AMI

---

### Q4. A company runs a WordPress site on multiple EC2 instances across two Availability Zones. Users upload images that need to be accessible from all instances. Currently, images uploaded to one instance are not visible when users are routed to another instance. What storage solution should be used?
**Options:**
- A) Amazon EBS volumes attached to each instance
- B) Amazon S3
- C) Amazon EFS
- D) Instance store

**Answer:** C

**해설:**

> **문제:** 회사가 두 개의 가용 영역에 걸쳐 여러 EC2 인스턴스에서 WordPress 사이트를 운영하고 있다. 사용자가 업로드하는 이미지가 모든 인스턴스에서 접근 가능해야 한다. 현재 한 인스턴스에 업로드된 이미지가 사용자가 다른 인스턴스로 라우팅될 때 보이지 않는다. 어떤 스토리지 솔루션을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 각 인스턴스에 연결된 Amazon EBS 볼륨 |
| B | Amazon S3 |
| C | Amazon EFS |
| D | Instance Store |

**상세 풀이:** Amazon EFS(Elastic File System)는 여러 AZ의 여러 EC2 인스턴스에서 동시에 마운트하여 접근할 수 있는 공유 파일 시스템(NFS)이다. WordPress는 파일 시스템 기반으로 이미지를 관리하므로 EFS를 마운트하면 모든 인스턴스에서 동일한 이미지 파일에 접근할 수 있다. EBS(A)는 단일 인스턴스에만 연결 가능하며(Multi-Attach는 제한적) AZ 간 공유가 불가능하여 현재 문제의 원인이기도 하다. S3(B)도 공유 스토리지로 사용 가능하지만 WordPress의 파일 시스템 기반 구조와 직접 호환되지 않아 플러그인이나 코드 수정이 필요하므로 EFS가 더 적합하다. Instance Store(D)는 인스턴스 중지/종료 시 데이터가 손실되는 임시 스토리지이며 인스턴스 간 공유도 불가능하다.

**핵심 개념:** EBS vs EFS

---

### Q5. A development team wants to deploy a web application with minimal infrastructure management. They want automatic scaling, load balancing, and health monitoring. The application is written in Node.js. Which AWS service is MOST suitable?
**Options:**
- A) Amazon EC2 with Auto Scaling
- B) AWS Elastic Beanstalk
- C) Amazon ECS
- D) AWS Lambda

**Answer:** B

**해설:**

> **문제:** 개발 팀이 최소한의 인프라 관리로 웹 애플리케이션을 배포하려 한다. 자동 스케일링, 로드 밸런싱, 헬스 모니터링을 원한다. 애플리케이션은 Node.js로 작성되었다. 가장 적합한 AWS 서비스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Auto Scaling이 있는 Amazon EC2 |
| B | AWS Elastic Beanstalk |
| C | Amazon ECS |
| D | AWS Lambda |

**상세 풀이:** Elastic Beanstalk은 Node.js를 네이티브로 지원하며, 개발자가 코드만 업로드하면 ALB, ASG, EC2, 헬스 모니터링 등 모든 인프라를 자동으로 프로비저닝하고 관리한다. "최소한의 인프라 관리"라는 요구사항에 가장 정확히 부합하며, Beanstalk 자체는 무료이고 기반 리소스 비용만 발생한다. EC2 + Auto Scaling(A)은 가능하지만 ALB 설정, ASG 구성, 헬스 체크 설정, 배포 파이프라인 등을 모두 수동으로 구성해야 하므로 인프라 관리 부담이 크다. ECS(C)는 컨테이너 오케스트레이션 서비스로 Docker 컨테이너 기반 배포에 적합하며, 기존 Node.js 웹앱을 컨테이너화해야 하는 추가 작업이 필요하다. Lambda(D)는 서버리스 함수 서비스로 이벤트 기반 처리에 적합하지만, 전통적인 웹 애플리케이션 배포에는 아키텍처 변경이 필요하다.

**핵심 개념:** Elastic Beanstalk

---

### Q6. A company needs to process messages from a web application asynchronously. The processing involves heavy computation that takes several minutes per message. Which Elastic Beanstalk configuration is MOST appropriate?
**Options:**
- A) Web Server Environment Tier with a larger instance type
- B) Worker Environment Tier
- C) Single Instance deployment mode
- D) Web Server Environment Tier with an Auto Scaling group

**Answer:** B

**해설:**

> **문제:** 회사가 웹 애플리케이션에서 메시지를 비동기적으로 처리해야 한다. 처리에는 메시지당 몇 분이 걸리는 무거운 연산이 포함된다. 가장 적합한 Elastic Beanstalk 구성은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 더 큰 인스턴스 타입의 Web Server Environment Tier |
| B | Worker Environment Tier |
| C | Single Instance 배포 모드 |
| D | Auto Scaling Group이 있는 Web Server Environment Tier |

**상세 풀이:** Worker Environment Tier는 SQS 큐에서 메시지를 가져와 백그라운드에서 비동기적으로 처리하도록 설계되었으며, SQS 큐의 메시지 수에 따라 자동으로 스케일링된다. 메시지당 몇 분이 걸리는 무거운 연산을 비동기 처리하는 사용 사례에 정확히 부합한다. Web Server Tier(A)는 HTTP 요청을 처리하기 위한 환경으로, 인스턴스 크기를 키워도 비동기 메시지 처리 아키텍처와는 맞지 않으며 요청 시간 초과 문제가 발생할 수 있다. Single Instance(C)는 개발/테스트 환경용 배포 모드이며 프로덕션 수준의 메시지 처리에 적합하지 않다. Web Server Tier + ASG(D)도 HTTP 요청 처리용이므로 비동기 백그라운드 작업에는 Worker Tier가 올바른 선택이다.

**핵심 개념:** Beanstalk Worker Tier

---

### Q7. A solutions architect is designing the security groups for a 3-tier architecture. The application runs behind an ALB, with EC2 instances in private subnets, and an RDS database. Which security group configuration follows the principle of least privilege?
**Options:**
- A) Allow all inbound traffic on all security groups
- B) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow traffic from ALB SG; RDS SG: allow traffic from EC2 SG
- C) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow all traffic; RDS SG: allow all traffic
- D) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow HTTP from 0.0.0.0/0; RDS SG: allow traffic from EC2 SG

**Answer:** B

**해설:**

> **문제:** 솔루션 아키텍트가 3-Tier 아키텍처의 보안 그룹을 설계하고 있다. 애플리케이션이 ALB 뒤에서 실행되고, EC2 인스턴스는 프라이빗 서브넷에, RDS 데이터베이스가 있다. 최소 권한 원칙을 따르는 보안 그룹 구성은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 모든 보안 그룹에서 모든 인바운드 트래픽을 허용한다 |
| B | ALB SG: 0.0.0.0/0에서 HTTP/HTTPS 허용; EC2 SG: ALB SG에서 트래픽 허용; RDS SG: EC2 SG에서 트래픽 허용 |
| C | ALB SG: 0.0.0.0/0에서 HTTP/HTTPS 허용; EC2 SG: 모든 트래픽 허용; RDS SG: 모든 트래픽 허용 |
| D | ALB SG: 0.0.0.0/0에서 HTTP/HTTPS 허용; EC2 SG: 0.0.0.0/0에서 HTTP 허용; RDS SG: EC2 SG에서 트래픽 허용 |

**상세 풀이:** 최소 권한 원칙(Principle of Least Privilege)에 따라 각 계층은 반드시 필요한 이전 계층의 보안 그룹에서만 트래픽을 허용해야 한다. B는 보안 그룹 체이닝(Security Group Chaining)을 올바르게 구현한다: ALB는 인터넷(0.0.0.0/0)에서 HTTP/HTTPS만 허용하고, EC2는 ALB SG에서 오는 트래픽만 허용하며, RDS는 EC2 SG에서 오는 트래픽만 허용한다. A는 모든 트래픽을 허용하므로 보안이 전혀 없다. C는 EC2와 RDS에 모든 트래픽을 허용하여 불필요한 접근을 허용한다. D는 EC2가 인터넷(0.0.0.0/0)에서 직접 HTTP 트래픽을 허용하므로 ALB를 우회한 직접 접근이 가능해져 최소 권한 원칙에 위배된다.

**핵심 개념:** Security Group Chaining
