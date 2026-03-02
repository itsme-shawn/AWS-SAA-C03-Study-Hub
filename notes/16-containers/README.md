# Containers on AWS

## 개요
AWS에서 컨테이너를 실행하기 위한 서비스들(ECS, EKS, Fargate, ECR, App Runner, App2Container)을 다룬다. 시험에서 "컨테이너 오케스트레이션", "서버리스 컨테이너", "Kubernetes 마이그레이션", "IAM 역할 구성" 관련 문제가 자주 출제된다.

## 핵심 개념

### Docker 기본 개념
> **직관적 비유:** "내 컴퓨터에서는 잘 되는데 서버에서는 안 돼요"라는 문제를 해결한다. Docker는 앱과 그 앱이 필요한 모든 환경(라이브러리, 설정 등)을 하나의 "컨테이너" 상자에 담아서 어디서나 똑같이 실행되도록 보장한다. 배포판(이미지)을 한 번 만들면, 개발 노트북 / 테스트 서버 / 운영 클라우드 어디서든 동일하게 동작한다.

- **컨테이너(Container):** 앱 + 실행에 필요한 모든 것(라이브러리, 환경변수 등)을 묶은 독립 실행 단위
- **이미지(Image):** 컨테이너의 설계도(읽기 전용 템플릿). 이미지로부터 컨테이너를 생성함
- 장점: 호환성 문제 없음, 예측 가능한 동작, 유지보수/배포 용이
- 사용 사례: 마이크로서비스 아키텍처, 온프레미스 -> AWS 리프트 앤 시프트(코드 변경 없이 이전)
- VM(가상 머신)과의 차이: VM은 OS까지 통째로 가상화(무거움), Docker는 호스트 OS 위에서 프로세스처럼 실행(가벼움)

### Docker 이미지 저장소
- **Docker Hub**: 퍼블릭 이미지 저장소 (Ubuntu, MySQL 등 공식 이미지를 무료로 제공)
- **Amazon ECR (Elastic Container Registry)**: AWS의 프라이빗/퍼블릭 컨테이너 이미지 레지스트리 (GitHub 대신 AWS에 이미지를 보관)

### AWS 컨테이너 관리 서비스

```text
 ┌──────────────────────────────────────────────────────────────┐
 │                    AWS Container Services                     │
 │                                                              │
 │  ┌────────────┐   ┌────────────┐   ┌────────────────────┐   │
 │  │  Amazon    │   │  Amazon    │   │    Amazon ECR      │   │
 │  │  ECS       │   │  EKS       │   │  (이미지 저장소)    │   │
 │  │ (AWS 고유) │   │(Kubernetes)│   │  ┌──────────────┐  │   │
 │  └─────┬──────┘   └─────┬──────┘   │  │ Docker Image │  │   │
 │        │                │          │  └──────────────┘  │   │
 │        └────────┬───────┘          └────────────────────┘   │
 │                 │                                            │
 │        ┌────────┴────────┐                                   │
 │        ▼                 ▼                                   │
 │  ┌──────────┐    ┌────────────┐                              │
 │  │ EC2      │    │  Fargate   │                              │
 │  │ (직접    │    │ (서버리스) │                              │
 │  │  관리)   │    │            │                              │
 │  └──────────┘    └────────────┘                              │
 └──────────────────────────────────────────────────────────────┘
```

| 서비스 | 설명 |
|--------|------|
| Amazon ECS | AWS 자체 컨테이너 플랫폼 |
| Amazon EKS | 관리형 Kubernetes (오픈소스) |
| AWS Fargate | 서버리스 컨테이너 (ECS/EKS와 함께 사용) |
| Amazon ECR | 컨테이너 이미지 저장소 |

### Amazon ECS (Elastic Container Service)
> **ECS란?** "이 컨테이너를 실행해줘"라고 명령하면 EC2 또는 Fargate 위에서 컨테이너를 자동으로 배치·실행·관리해주는 AWS 전용 컨테이너 오케스트레이션(지휘) 서비스. **Task Definition(태스크 정의)**는 "어떤 이미지를 쓸지, CPU/메모리는 얼마나 줄지, 어떤 포트를 열지"를 설명하는 설계서다.

```text
 ECS EC2 Launch Type                    ECS Fargate Launch Type
 ──────────────────                     ──────────────────────
 ┌─── ECS Cluster ──────────────┐       ┌─── ECS Cluster ───────────┐
 │                               │       │                           │
 │  ┌─── EC2 Instance ───────┐  │       │   ┌────────┐ ┌────────┐  │
 │  │ [ECS Agent]            │  │       │   │ Task A │ │ Task B │  │
 │  │ ┌────────┐ ┌────────┐  │  │       │   │(1vCPU) │ │(2vCPU) │  │
 │  │ │ Task A │ │ Task B │  │  │       │   │(2GB)   │ │(4GB)   │  │
 │  │ └────────┘ └────────┘  │  │       │   └────────┘ └────────┘  │
 │  └─────────────────────────┘  │       │                           │
 │  ┌─── EC2 Instance ───────┐  │       │   ┌────────┐              │
 │  │ [ECS Agent]            │  │       │   │ Task C │  ◀── AWS가   │
 │  │ ┌────────┐             │  │       │   │(0.5vCPU│     자동     │
 │  │ │ Task C │             │  │       │   │(1GB)   │     배치     │
 │  │ └────────┘             │  │       │   └────────┘              │
 │  └─────────────────────────┘  │       │                           │
 │                               │       │  EC2 인스턴스 관리 불필요  │
 │  ▲ EC2 직접 관리 필요         │       │  태스크 수만 조절          │
 └───────────────────────────────┘       └───────────────────────────┘
```

#### EC2 Launch Type
- 인프라(EC2 인스턴스)를 **직접 프로비저닝 및 관리**
- 각 EC2 인스턴스에 **ECS Agent**가 실행되어 ECS 클러스터에 등록
- AWS가 컨테이너 시작/중지 관리

#### Fargate Launch Type
- 인프라 프로비저닝 불필요 (EC2 관리 없음), **완전 서버리스**
- 태스크 정의만 생성하면 AWS가 CPU/RAM 기반으로 태스크 실행
- 스케일링: 태스크 수만 증가 (EC2 인스턴스 추가 불필요)

#### ECS IAM Roles

```text
 ┌─── EC2 Instance ──────────────────────────────────────────┐
 │                                                            │
 │  EC2 Instance Profile (ECS Agent용)                        │
 │  ├── ECS 서비스 API 호출                                   │
 │  ├── ECR에서 이미지 Pull                                   │
 │  ├── CloudWatch Logs 전송                                  │
 │  └── Secrets Manager / SSM 참조                            │
 │                                                            │
 │  ┌─── Task A ──────────┐    ┌─── Task B ──────────┐       │
 │  │ ECS Task Role A     │    │ ECS Task Role B     │       │
 │  │ ├── S3 접근         │    │ ├── DynamoDB 접근   │       │
 │  │ └── SQS 접근        │    │ └── RDS 접근        │       │
 │  └─────────────────────┘    └─────────────────────┘       │
 │                                                            │
 └────────────────────────────────────────────────────────────┘
  Instance Profile = Agent용 (공통)    Task Role = 태스크별 (개별)
```

- **EC2 Instance Profile** (EC2 Launch Type만 해당):
  - ECS Agent가 사용
  - ECS 서비스 API 호출, CloudWatch Logs 전송, ECR에서 이미지 Pull
  - Secrets Manager/SSM Parameter Store 참조
- **ECS Task Role**:
  - 태스크별 고유 역할 (태스크 정의에서 설정)
  - 서비스별로 다른 역할 사용 가능 (예: Task A는 S3 접근, Task B는 DynamoDB 접근)

#### Load Balancer 통합
- **ALB**: 대부분의 사용 사례에 권장
- **NLB**: 고처리량/고성능, AWS PrivateLink 연동 시
- **CLB**: 지원되지만 비권장 (고급 기능 없음, Fargate 미지원)

#### ECS Data Volumes (EFS)
- ECS 태스크에 EFS 마운트 가능 (EC2, Fargate 모두 지원)
- 모든 AZ에서 동일 데이터 공유
- **Fargate + EFS = 서버리스**
- 사용 사례: 컨테이너용 영속적 Multi-AZ 공유 스토리지
- **S3는 파일 시스템으로 마운트 불가**

#### ECS Service Auto Scaling
- AWS Application Auto Scaling 사용
- 메트릭: 평균 CPU, 평균 메모리, ALB Request Count Per Target
- 스케일링 유형: Target Tracking, Step Scaling, Scheduled Scaling
- **ECS Service Auto Scaling (태스크 레벨) != EC2 Auto Scaling (인스턴스 레벨)**
- Fargate Auto Scaling이 설정 더 쉬움 (서버리스)

#### EC2 Launch Type - Auto Scaling EC2 Instances
- **Auto Scaling Group**: CPU 사용률 기반 EC2 인스턴스 스케일링
- **ECS Cluster Capacity Provider**: ECS 태스크에 필요한 인프라를 자동 프로비저닝/스케일링, ASG와 연동

#### ECS 솔루션 아키텍처 패턴
- **EventBridge 트리거**: S3 업로드 -> EventBridge -> ECS Task (Fargate) -> DynamoDB 저장
- **EventBridge Schedule**: 매시간 -> ECS Task -> S3 배치 처리
- **SQS Queue**: SQS 메시지 poll -> ECS Service Auto Scaling
- **Stopped Tasks 감지**: ECS 태스크 종료 이벤트 -> EventBridge -> SNS 알림

### Amazon ECR (Elastic Container Registry)
- AWS에서 Docker 이미지 저장/관리
- 프라이빗/퍼블릭 리포지토리 (ECR Public Gallery)
- ECS와 완전 통합, S3 기반 저장
- IAM으로 접근 제어 (권한 오류 시 => IAM 정책 확인)
- 이미지 취약점 스캔, 버전 관리, 태그, 수명 주기 관리

### Amazon EKS (Elastic Kubernetes Service)
> **Kubernetes(K8s)란?** 컨테이너 오케스트레이션의 오픈소스 표준. ECS가 AWS 전용 방언이라면, Kubernetes는 AWS, Google Cloud, Azure 어디서든 통하는 공용어다. 이미 Kubernetes를 쓰는 회사가 AWS로 이전할 때, 또는 특정 클라우드에 종속되고 싶지 않을 때 EKS를 선택한다.

- 관리형 Kubernetes 클러스터 (Kubernetes 컨트롤 플레인을 AWS가 대신 관리)
- ECS의 대안 (유사한 목표, 다른 API — Kubernetes YAML 매니페스트 사용)
- EC2 (워커 노드 직접 관리) 또는 Fargate (서버리스, 노드 관리 불필요) 지원
- 사용 사례: 기존 Kubernetes 워크로드를 AWS로 마이그레이션
- **클라우드 불가지론적** (Azure, GCP에서도 Kubernetes 동일 사용 가능 — 이식성 높음)
- Multi-Region: 리전당 하나의 EKS 클러스터 배포
- CloudWatch Container Insights로 로그/메트릭 수집

#### EKS Node Types
- **Managed Node Groups**: EKS가 EC2 인스턴스 생성/관리, ASG 관리, On-Demand/Spot
- **Self-Managed Nodes**: 직접 노드 생성/등록, EKS Optimized AMI, On-Demand/Spot
- **AWS Fargate**: 노드 관리 불필요

#### EKS Data Volumes
- Container Storage Interface (CSI) 드라이버 사용
- EBS, **EFS (Fargate와 호환)**, FSx for Lustre, FSx for NetApp ONTAP

### AWS App Runner
- 웹 앱/API를 쉽게 배포하는 완전 관리형 서비스
- 소스 코드 또는 컨테이너 이미지에서 자동 빌드/배포
- 자동 스케일링, 고가용성, 로드 밸런서, 암호화
- VPC 접근 지원 (DB, 캐시, 메시지 큐 연결)
- 사용 사례: 웹 앱, API, 마이크로서비스, 빠른 프로덕션 배포

### AWS App2Container (A2C)
- Java/.NET 웹 앱을 Docker 컨테이너로 마이그레이션/현대화하는 CLI 도구
- 온프레미스, VM, 타 클라우드 -> AWS로 리프트 앤 시프트
- CloudFormation 템플릿 생성, ECR에 이미지 등록
- ECS, EKS, App Runner에 배포
- CI/CD 파이프라인 지원

## 시험 포인트
- **ECS EC2 Launch Type vs Fargate**: 인프라 관리 여부가 핵심 차이
- **ECS Task Role**: 태스크별 IAM 역할 (S3, DynamoDB 등 접근 제어)
- **EC2 Instance Profile**: ECS Agent용 (ECR Pull, CloudWatch Logs 등)
- **Fargate + EFS = 서버리스 + 영속 스토리지**
- **S3는 ECS 태스크에 파일 시스템으로 마운트 불가**
- **EKS**: Kubernetes 기존 사용자가 AWS 마이그레이션 시 선택
- EKS에서 **EFS는 Fargate와 호환**, EBS는 Fargate와 비호환
- **App Runner**: 가장 간단한 컨테이너 배포 (인프라 경험 불필요)
- **ECS Cluster Capacity Provider**: EC2 인스턴스 자동 프로비저닝
- ECR 접근 오류 -> IAM 정책 확인

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| ECS EC2 Launch Type | EC2 인스턴스 직접 관리, ECS Agent 필요 |
| ECS Fargate Launch Type | 서버리스, 태스크 정의만 생성 |
| ECS Task Role | 태스크별 IAM 역할 |
| EC2 Instance Profile | ECS Agent용 IAM 역할 |
| ECS + ALB | 대부분의 사용 사례에 권장 |
| ECS + EFS | 영속적 Multi-AZ 공유 스토리지, Fargate 호환 |
| ECS Capacity Provider | ASG와 연동하여 EC2 자동 프로비저닝 |
| ECR | Docker 이미지 저장, IAM 접근 제어, S3 기반 |
| EKS | 관리형 Kubernetes, 클라우드 불가지론적 |
| EKS Managed Node Groups | EKS가 EC2 노드 관리 |
| App Runner | 소스코드/이미지 -> 자동 빌드/배포/스케일링 |
| App2Container | Java/.NET 앱 -> Docker 컨테이너 마이그레이션 |

---

## Practice Questions

### Q1. A company is running a containerized application on Amazon ECS with the EC2 launch type. Each task needs to access a specific S3 bucket and DynamoDB table. What is the BEST way to grant permissions to the containers?
**Options:**
- A) Attach IAM policies to the EC2 Instance Profile
- B) Define an ECS Task Role with the required permissions in the task definition
- C) Store AWS credentials in environment variables of the container
- D) Use AWS Secrets Manager to store access keys

**Answer:** B

**해설:**

> **문제:** 회사가 EC2 시작 유형으로 Amazon ECS에서 컨테이너화된 애플리케이션을 실행하고 있다. 각 태스크는 특정 S3 버킷과 DynamoDB 테이블에 접근해야 한다. 컨테이너에 권한을 부여하는 가장 좋은 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | EC2 Instance Profile에 IAM 정책 연결 |
| B | 태스크 정의에서 필요한 권한이 있는 ECS Task Role 정의 |
| C | 컨테이너의 환경 변수에 AWS 자격증명 저장 |
| D | AWS Secrets Manager를 사용하여 액세스 키 저장 |

**(A)** : EC2 Instance Profile은 ECS Agent용으로 설계된 것이다. 모든 태스크에 동일한 권한이 적용되어 최소 권한 원칙에 위배된다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(B) 정답** : ECS Task Role은 태스크 정의에서 설정되며 각 태스크에 필요한 최소 권한만 부여할 수 있다. 태스크별로 다른 권한을 설정할 수 있어 최소 권한 원칙을 준수하는 가장 좋은 방법이다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(C)** : 환경변수에 자격증명을 저장하는 것은 보안 모범 사례에 위배된다. 자격증명 유출 위험이 있다.

**(D)** : Secrets Manager에 액세스 키를 저장하는 것도 IAM 역할 대신 장기 자격증명을 사용하는 것이다. 임시 자격증명을 자동 발급하는 IAM Role이 더 안전하다. → [📖 AWS Secrets Manager](/section/24-security-encryption#aws-secrets-manager)

**핵심 개념:** ECS Task Role vs EC2 Instance Profile

**관련 노트:** [Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

### Q2. A company wants to run containers on AWS without managing any servers or EC2 instances. They need persistent shared storage across multiple containers in different Availability Zones. Which combination of services meets this requirement?
**Options:**
- A) Amazon ECS with Fargate launch type and Amazon EBS volumes
- B) Amazon ECS with Fargate launch type and Amazon EFS
- C) Amazon EKS with EC2 launch type and Amazon S3
- D) Amazon ECS with EC2 launch type and instance store

**Answer:** B

**해설:**

> **문제:** 회사가 서버나 EC2 인스턴스를 관리하지 않고 AWS에서 컨테이너를 실행하려 한다. 서로 다른 가용 영역의 여러 컨테이너에 걸쳐 영속적인 공유 스토리지가 필요하다. 이 요구사항을 충족하는 서비스 조합은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Fargate 시작 유형의 Amazon ECS와 Amazon EBS 볼륨 |
| B | Fargate 시작 유형의 Amazon ECS와 Amazon EFS |
| C | EC2 시작 유형의 Amazon EKS와 Amazon S3 |
| D | EC2 시작 유형의 Amazon ECS와 인스턴스 스토어 |

**(A)** : EBS는 단일 AZ에 종속된다. 서로 다른 가용 영역의 여러 컨테이너 간 공유가 불가능하다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B) 정답** : Fargate는 서버리스 컨테이너이며 EFS는 Multi-AZ 공유 스토리지를 제공한다. Fargate + EFS = 서버리스 + 영속 공유 스토리지 조합으로 두 요구사항을 모두 충족한다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(C)** : S3는 파일 시스템으로 마운트할 수 없다. 또한 EC2 시작 유형은 서버 관리가 필요하다. → [📖 S3 사용 사례](/section/10-amazon-s3#s3-사용-사례)

**(D)** : Instance Store는 임시 스토리지로 영속적이지 않다. EC2 시작 유형도 서버 관리가 필요하여 서버리스 요구사항을 충족하지 못한다. → [📖 EC2 Instance Store](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** Fargate + EFS = 서버리스 영속 스토리지

**관련 노트:** [Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service), [Amazon EFS Elastic File System](/section/05-ec2-instance-storage#amazon-efs-elastic-file-system)

### Q3. A company is using Kubernetes on-premises and wants to migrate to AWS with minimal changes to their existing Kubernetes configurations and tooling. Which AWS service should they use?
**Options:**
- A) Amazon ECS with EC2 launch type
- B) Amazon ECS with Fargate launch type
- C) Amazon EKS
- D) AWS App Runner

**Answer:** C

**해설:**

> **문제:** 회사가 온프레미스에서 Kubernetes를 사용하고 있으며, 기존 Kubernetes 설정과 도구에 최소한의 변경으로 AWS로 마이그레이션하려 한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | EC2 시작 유형의 Amazon ECS |
| B | Fargate 시작 유형의 Amazon ECS |
| C | Amazon EKS |
| D | AWS App Runner |

**(A)** : ECS(EC2 시작 유형)는 AWS 고유 API를 사용한다. 기존 Kubernetes 워크로드(YAML 매니페스트, kubectl, Helm 등)를 재작성해야 한다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(B)** : ECS(Fargate 시작 유형)도 AWS 고유 API를 사용한다. Kubernetes 설정과 도구를 그대로 활용할 수 없다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(C) 정답** : Amazon EKS는 관리형 Kubernetes 서비스이다. 기존 Kubernetes 설정과 도구를 최소한의 변경으로 AWS에서 사용할 수 있어 마이그레이션에 가장 적합하다. → [📖 Amazon EKS Elastic Kubernetes Service](/section/16-containers#amazon-eks-elastic-kubernetes-service)

**(D)** : App Runner는 단순한 웹 앱/API 배포용 서비스이다. Kubernetes 호환 기능이 없다. → [📖 AWS App Runner](/section/16-containers#aws-app-runner)

**핵심 개념:** Amazon EKS, Kubernetes 마이그레이션

**관련 노트:** [Amazon EKS Elastic Kubernetes Service](/section/16-containers#amazon-eks-elastic-kubernetes-service)

### Q4. A company is running ECS with the EC2 launch type. During peak hours, ECS tasks are pending because there are not enough EC2 instances in the cluster. What is the recommended solution to automatically add EC2 instances?
**Options:**
- A) Manually add EC2 instances to the ECS cluster
- B) Use ECS Cluster Capacity Provider paired with an Auto Scaling Group
- C) Switch to Fargate launch type
- D) Increase the desired count of the ECS service

**Answer:** B

**해설:**

> **문제:** 회사가 EC2 시작 유형으로 ECS를 실행하고 있다. 피크 시간 동안 클러스터에 EC2 인스턴스가 충분하지 않아 ECS 태스크가 대기 중이다. EC2 인스턴스를 자동으로 추가하는 권장 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | ECS 클러스터에 수동으로 EC2 인스턴스 추가 |
| B | Auto Scaling Group과 연동된 ECS Cluster Capacity Provider 사용 |
| C | Fargate 시작 유형으로 전환 |
| D | ECS 서비스의 원하는 태스크 수 증가 |

**(A)** : 수동으로 EC2 인스턴스를 추가하는 것은 자동화되지 않는다. 운영 오버헤드가 크고 피크 시간에 즉각적인 대응이 불가능하다.

**(B) 정답** : ECS Cluster Capacity Provider는 ASG와 연동하여 ECS 태스크에 필요한 CPU/RAM이 부족할 때 자동으로 EC2 인스턴스를 추가한다. EC2 Launch Type을 유지하면서 자동 확장이 가능한 권장 솔루션이다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(C)** : Fargate 전환도 해결책이 될 수 있지만 기존 EC2 Launch Type 설정과 비용 구조가 바뀐다. Capacity Provider가 더 직접적인 해결책이다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(D)** : 태스크 수 증가는 태스크만 늘리고 실제 EC2 인스턴스를 추가하지 않는다. 인스턴스 부족으로 인한 대기 문제가 해결되지 않는다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**핵심 개념:** ECS Cluster Capacity Provider

**관련 노트:** [Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

### Q5. A development team wants to deploy a simple web API as a container on AWS. They have no infrastructure experience and want the simplest possible deployment with automatic scaling. Which service should they use?
**Options:**
- A) Amazon ECS with Fargate
- B) Amazon EKS with Managed Node Groups
- C) AWS App Runner
- D) Amazon EC2 with Docker installed

**Answer:** C

**해설:**

> **문제:** 개발팀이 AWS에서 간단한 웹 API를 컨테이너로 배포하려 한다. 인프라 경험이 없으며 자동 스케일링이 가능한 가장 간단한 배포를 원한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Fargate가 있는 Amazon ECS |
| B | Managed Node Groups가 있는 Amazon EKS |
| C | AWS App Runner |
| D | Docker가 설치된 Amazon EC2 |

**(A)** : Fargate도 서버리스이지만 ECS 클러스터, 태스크 정의, 서비스 구성 등 더 많은 설정이 필요하다. 인프라 경험이 없는 팀에는 복잡하다. → [📖 Amazon ECS Elastic Container Service](/section/16-containers#amazon-ecs-elastic-container-service)

**(B)** : EKS는 Kubernetes 지식이 필요하다. 인프라 경험이 없는 팀에 적합하지 않다. → [📖 Amazon EKS Elastic Kubernetes Service](/section/16-containers#amazon-eks-elastic-kubernetes-service)

**(C) 정답** : AWS App Runner는 인프라 경험 없이도 소스 코드나 컨테이너 이미지에서 웹 앱/API를 가장 간단하게 배포할 수 있다. 자동 빌드, 배포, 스케일링, 로드 밸런서, 암호화를 모두 자동으로 제공한다. → [📖 AWS App Runner](/section/16-containers#aws-app-runner)

**(D)** : EC2에 Docker를 설치하는 것은 가장 많은 관리가 필요하다. 서버 관리, 스케일링, 패치 등을 모두 직접 해야 한다. → [📖 Docker 기본 개념](/section/16-containers#docker-기본-개념)

**핵심 개념:** AWS App Runner, 간단한 컨테이너 배포

**관련 노트:** [AWS App Runner](/section/16-containers#aws-app-runner)

### Q6. A company needs to pull container images from Amazon ECR but is getting authorization errors. What should the solutions architect check?
**Options:**
- A) The ECR repository's encryption settings
- B) The IAM policy attached to the EC2 instance or ECS task role
- C) The VPC security group rules
- D) The ECR image scanning configuration

**Answer:** B

**해설:**

> **문제:** 회사가 Amazon ECR에서 컨테이너 이미지를 가져와야 하는데 인가 오류가 발생하고 있다. 솔루션 아키텍트는 무엇을 확인해야 하는가?

| 선지 | 번역 |
|------|------|
| A | ECR 리포지토리의 암호화 설정 |
| B | EC2 인스턴스 또는 ECS 태스크 역할에 연결된 IAM 정책 |
| C | VPC 보안 그룹 규칙 |
| D | ECR 이미지 스캐닝 구성 |

**(A)** : 암호화 설정은 인가 오류와 무관하다. 이미지가 암호화되어 있어도 적절한 권한이 있으면 Pull할 수 있다.

**(B) 정답** : ECR 접근은 IAM으로 제어된다. 권한 오류가 발생하면 EC2 Instance Profile 또는 ECS Task Role에 ECR 관련 IAM 정책(ecr:GetAuthorizationToken, ecr:BatchGetImage 등)이 올바르게 설정되어 있는지 확인해야 한다. → [📖 Amazon ECR Elastic Container Registry](/section/16-containers#amazon-ecr-elastic-container-registry)

**(C)** : 보안 그룹 규칙은 네트워크 레벨 접근 제어이다. 인가 오류가 아닌 연결 타임아웃을 유발한다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 이미지 스캐닝 구성은 이미지의 취약점을 검사하는 기능이다. 이미지 Pull 인가와는 무관하다. → [📖 Amazon ECR Elastic Container Registry](/section/16-containers#amazon-ecr-elastic-container-registry)

**핵심 개념:** ECR IAM 접근 제어

**관련 노트:** [Amazon ECR Elastic Container Registry](/section/16-containers#amazon-ecr-elastic-container-registry)

### Q7. A company wants to migrate their Java web applications running on VMware to AWS containers. They want to generate CloudFormation templates and CI/CD pipelines with minimal code changes. Which tool should they use?
**Options:**
- A) AWS App Runner
- B) AWS Copilot CLI
- C) AWS App2Container (A2C)
- D) AWS Migration Hub

**Answer:** C

**해설:**

> **문제:** 회사가 VMware에서 실행 중인 Java 웹 애플리케이션을 AWS 컨테이너로 마이그레이션하려 한다. 최소한의 코드 변경으로 CloudFormation 템플릿과 CI/CD 파이프라인을 생성하고 싶다. 어떤 도구를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS App Runner |
| B | AWS Copilot CLI |
| C | AWS App2Container (A2C) |
| D | AWS Migration Hub |

**(A)** : App Runner는 이미 컨테이너화된 앱이나 소스 코드를 배포하는 서비스이다. 레거시 앱을 컨테이너로 변환하는 마이그레이션 도구가 아니다. → [📖 AWS App Runner](/section/16-containers#aws-app-runner)

**(B)** : Copilot CLI는 ECS 기반 앱 빌드/배포를 돕는 도구이다. 기존 레거시 앱의 컨테이너화 분석 기능이 없다.

**(C) 정답** : AWS App2Container(A2C)는 Java/.NET 웹 앱을 Docker 컨테이너로 마이그레이션하는 CLI 도구이다. 코드 변경 없이 앱 분석, 컨테이너화, CloudFormation 템플릿 생성, CI/CD 파이프라인 설정, ECR/ECS/EKS/App Runner 배포를 지원한다. → [📖 AWS App2Container A2C](/section/16-containers#aws-app2container-a2c)

**(D)** : Migration Hub는 마이그레이션 진행 상황을 추적하는 대시보드이다. 컨테이너화 도구가 아니다.

**핵심 개념:** AWS App2Container, 레거시 앱 컨테이너화

**관련 노트:** [AWS App2Container A2C](/section/16-containers#aws-app2container-a2c)
