# Section 16 - Containers 연습문제 해설

---

### Q1. Company running containerized app on ECS with EC2 launch type. Each task needs to access specific S3 bucket and DynamoDB table. BEST way to grant permissions?

**한글 번역:** 회사가 EC2 시작 유형의 ECS에서 컨테이너화된 앱을 실행하고 있습니다. 각 태스크가 특정 S3 버킷과 DynamoDB 테이블에 접근해야 합니다. 권한을 부여하는 가장 좋은 방법은 무엇입니까?

**선지:**
- A) Attach IAM policies to EC2 Instance Profile → EC2 인스턴스 프로파일에 IAM 정책 연결
- B) Define ECS Task Role with required permissions → 필요한 권한이 있는 ECS 태스크 역할 정의
- C) Store AWS credentials in environment variables → 환경 변수에 AWS 자격 증명 저장
- D) Use AWS Secrets Manager for access keys → 액세스 키를 위한 AWS Secrets Manager 사용

**정답:** B

**선지별 해설:**
- **A) IAM policies on EC2 Instance Profile:** 인스턴스 프로파일에 정책을 연결하면 해당 EC2에서 실행되는 모든 태스크가 동일한 권한을 갖게 됩니다. "각 태스크가 특정 리소스에 접근"해야 하므로 태스크별 세분화된 권한 부여가 불가능합니다. 최소 권한 원칙에 위배됩니다.
- **B) ECS Task Role:** 정답입니다. ECS Task Role은 각 태스크(컨테이너)에 개별적인 IAM 역할을 할당할 수 있습니다. 태스크별로 필요한 S3 버킷과 DynamoDB 테이블에만 접근하도록 세밀하게 권한을 제어할 수 있어 최소 권한 원칙을 준수합니다. ECS의 모범 사례입니다.
- **C) AWS credentials in environment variables:** 자격 증명을 환경 변수에 저장하는 것은 보안 위험이 매우 높습니다. 키 로테이션이 어렵고, 컨테이너 이미지나 로그에 노출될 수 있습니다. AWS 모범 사례에 반하는 안티패턴입니다.
- **D) Secrets Manager for access keys:** Secrets Manager에 액세스 키를 저장하는 것은 키 하드코딩보다는 낫지만, IAM 역할을 사용하는 것이 근본적으로 더 안전합니다. 장기 자격 증명 대신 임시 자격 증명(Task Role)을 사용하는 것이 모범 사례입니다.

**핵심 개념:** ECS Task Role — 태스크별 세분화된 IAM 권한 부여의 모범 사례

---

### Q2. Company wants to run containers without managing servers. Need persistent shared storage across multiple AZs. Which combination?

**한글 번역:** 회사가 서버를 관리하지 않고 컨테이너를 실행하려고 합니다. 여러 AZ에 걸친 영구적인 공유 스토리지가 필요합니다. 어떤 조합을 사용해야 합니까?

**선지:**
- A) ECS with Fargate and EBS → Fargate와 EBS를 사용하는 ECS
- B) ECS with Fargate and EFS → Fargate와 EFS를 사용하는 ECS
- C) EKS with EC2 and S3 → EC2와 S3를 사용하는 EKS
- D) ECS with EC2 and instance store → EC2와 인스턴스 스토어를 사용하는 ECS

**정답:** B

**선지별 해설:**
- **A) ECS with Fargate and EBS:** EBS는 단일 AZ에 속하며 하나의 인스턴스에만 연결할 수 있어 "여러 AZ에 걸친 공유 스토리지" 요구사항을 충족하지 못합니다. 또한 Fargate에서는 EBS를 직접 사용할 수 없습니다(임시 스토리지만 제공).
- **B) ECS with Fargate and EFS:** 정답입니다. (1) Fargate는 서버리스 컨테이너 실행 환경으로 서버 관리가 불필요하고, (2) EFS는 여러 AZ에 걸쳐 접근 가능한 공유 파일 시스템으로 영구적 스토리지를 제공합니다. Fargate 태스크에서 EFS를 마운트하여 사용할 수 있습니다.
- **C) EKS with EC2 and S3:** EC2를 사용하므로 서버 관리가 필요합니다. "서버를 관리하지 않고"라는 요구사항에 부합하지 않습니다. S3는 오브젝트 스토리지로 파일 시스템 마운트가 기본적으로 불가합니다.
- **D) ECS with EC2 and instance store:** EC2를 사용하므로 서버 관리가 필요하고, 인스턴스 스토어는 임시(ephemeral) 스토리지로 인스턴스 중지 시 데이터가 소멸됩니다. 두 요구사항 모두 충족하지 못합니다.

**핵심 개념:** 서버리스 컨테이너 + 다중 AZ 공유 영구 스토리지 = Fargate + EFS

---

### Q3. Company using Kubernetes on-premises, wants to migrate to AWS with minimal changes to K8s configs and tooling. Which service?

**한글 번역:** 회사가 온프레미스에서 Kubernetes를 사용하고 있으며, K8s 구성과 도구에 대한 최소한의 변경으로 AWS로 마이그레이션하려고 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) ECS with EC2 → EC2를 사용하는 ECS
- B) ECS with Fargate → Fargate를 사용하는 ECS
- C) Amazon EKS → Amazon EKS
- D) AWS App Runner → AWS App Runner

**정답:** C

**선지별 해설:**
- **A) ECS with EC2:** ECS는 AWS 자체 컨테이너 오케스트레이션 서비스로, Kubernetes와 다른 API와 구성 방식을 사용합니다. 기존 K8s 구성 파일(YAML)과 kubectl 같은 도구를 그대로 사용할 수 없어 상당한 코드 변경이 필요합니다.
- **B) ECS with Fargate:** ECS Fargate도 마찬가지로 Kubernetes와 호환되지 않는 별도의 서비스입니다. K8s 구성과 도구를 재사용할 수 없습니다.
- **C) Amazon EKS:** 정답입니다. EKS(Elastic Kubernetes Service)는 AWS의 관리형 Kubernetes 서비스로, 표준 Kubernetes API를 그대로 사용합니다. 기존 K8s 구성 파일, kubectl, Helm 차트 등을 최소한의 변경으로 재사용할 수 있습니다. "Kubernetes + 최소 변경"이 키워드입니다.
- **D) AWS App Runner:** App Runner는 간단한 웹 앱/API를 배포하기 위한 완전 관리형 서비스로, Kubernetes와는 전혀 다른 서비스입니다. K8s 구성을 사용할 수 없습니다.

**핵심 개념:** 기존 Kubernetes + 최소 변경으로 AWS 마이그레이션 = Amazon EKS

---

### Q4. Company running ECS with EC2 launch type. During peak hours, tasks are pending because not enough EC2 instances. Recommended solution?

**한글 번역:** 회사가 EC2 시작 유형의 ECS를 실행하고 있습니다. 피크 시간에 EC2 인스턴스가 부족하여 태스크가 대기 중입니다. 권장 솔루션은 무엇입니까?

**선지:**
- A) Manually add EC2 instances → 수동으로 EC2 인스턴스 추가
- B) Use ECS Cluster Capacity Provider with ASG → ASG를 사용하는 ECS 클러스터 용량 공급자
- C) Switch to Fargate → Fargate로 전환
- D) Increase desired count of ECS service → ECS 서비스의 원하는 개수 증가

**정답:** B

**선지별 해설:**
- **A) Manually add EC2 instances:** 수동 인스턴스 추가는 확장 가능하지 않고, 피크 시간을 항상 모니터링해야 합니다. 자동화되지 않은 운영 방식으로 모범 사례가 아닙니다.
- **B) ECS Cluster Capacity Provider with ASG:** 정답입니다. Cluster Capacity Provider는 ECS 클러스터의 인프라를 자동으로 관리합니다. ASG(Auto Scaling Group)와 연동하여 태스크 수요에 따라 EC2 인스턴스를 자동으로 확장/축소합니다. 대기 중인 태스크가 있으면 자동으로 인스턴스를 추가합니다.
- **C) Switch to Fargate:** Fargate로 전환하면 인스턴스 관리 문제를 해결할 수 있지만, 문제는 EC2 시작 유형을 사용하는 기존 환경에서의 해결책을 묻고 있습니다. 전환은 대규모 변경이 필요하며, Capacity Provider가 더 적절한 솔루션입니다.
- **D) Increase desired count of ECS service:** 서비스의 원하는 태스크 수를 늘려도 EC2 인스턴스가 부족하면 태스크가 여전히 대기 상태가 됩니다. 문제의 근본 원인(인스턴스 부족)을 해결하지 못합니다.

**핵심 개념:** ECS EC2 시작 유형에서 자동 인스턴스 확장 = Cluster Capacity Provider + ASG

---

### Q5. Dev team wants to deploy simple web API as container. No infrastructure experience. Simplest deployment with auto scaling. Which service?

**한글 번역:** 개발팀이 간단한 웹 API를 컨테이너로 배포하려고 합니다. 인프라 경험이 없습니다. 자동 확장이 가능한 가장 간단한 배포 방법은 무엇입니까?

**선지:**
- A) ECS with Fargate → Fargate를 사용하는 ECS
- B) EKS with Managed Node Groups → 관리형 노드 그룹을 사용하는 EKS
- C) AWS App Runner → AWS App Runner
- D) EC2 with Docker → Docker를 사용하는 EC2

**정답:** C

**선지별 해설:**
- **A) ECS with Fargate:** Fargate는 서버리스이지만, ECS 클러스터, 태스크 정의, 서비스 설정 등 상당한 인프라 구성이 필요합니다. 인프라 경험이 없는 팀에게는 복잡할 수 있습니다.
- **B) EKS with Managed Node Groups:** EKS는 Kubernetes 지식이 필요하며, 클러스터 설정, 노드 그룹, 매니페스트 파일 등 복잡한 구성이 요구됩니다. 가장 간단한 옵션과는 거리가 멉니다.
- **C) AWS App Runner:** 정답입니다. App Runner는 컨테이너 이미지 또는 소스 코드에서 웹 앱/API를 가장 간단하게 배포할 수 있는 완전 관리형 서비스입니다. 인프라 구성이 거의 필요 없으며, 자동 확장, 로드 밸런싱, TLS 인증서 등이 기본 제공됩니다. "간단한 + 인프라 경험 없음"이 키워드입니다.
- **D) EC2 with Docker:** EC2에 Docker를 직접 설치하고 관리하는 것은 가장 많은 인프라 작업이 필요합니다. 자동 확장도 직접 구성해야 합니다.

**핵심 개념:** 가장 간단한 컨테이너 배포 + 인프라 경험 불필요 = AWS App Runner

---

### Q6. Company needs to pull container images from ECR but getting authorization errors. What to check?

**한글 번역:** 회사가 ECR에서 컨테이너 이미지를 가져와야 하지만 인증 오류가 발생합니다. 무엇을 확인해야 합니까?

**선지:**
- A) ECR encryption settings → ECR 암호화 설정
- B) IAM policy attached to EC2 instance or ECS task role → EC2 인스턴스 또는 ECS 태스크 역할에 연결된 IAM 정책
- C) VPC security group rules → VPC 보안 그룹 규칙
- D) ECR image scanning configuration → ECR 이미지 스캐닝 설정

**정답:** B

**선지별 해설:**
- **A) ECR encryption settings:** 암호화 설정은 저장 중인 이미지의 암호화와 관련이 있으며, 인증(authorization) 오류와는 무관합니다.
- **B) IAM policy on EC2 instance or ECS task role:** 정답입니다. ECR에서 이미지를 가져오려면 적절한 IAM 권한(ecr:GetAuthorizationToken, ecr:BatchGetImage, ecr:GetDownloadUrlForLayer 등)이 필요합니다. EC2 인스턴스 프로파일 또는 ECS 태스크 실행 역할(Task Execution Role)에 이러한 권한이 없으면 인증 오류가 발생합니다.
- **C) VPC security group rules:** 보안 그룹은 네트워크 접근을 제어하지만, "인증(authorization) 오류"는 IAM 권한 문제입니다. 네트워크 문제라면 타임아웃이나 연결 오류가 발생합니다.
- **D) ECR image scanning configuration:** 이미지 스캐닝은 취약점 검사를 위한 기능으로, 이미지 풀(pull) 인증과는 무관합니다.

**핵심 개념:** ECR 인증 오류 = IAM 권한 확인 (인스턴스 프로파일 또는 Task Execution Role)

---

### Q7. Company wants to migrate Java web apps from VMware to AWS containers. Generate CloudFormation templates and CI/CD pipelines with minimal code changes. Which tool?

**한글 번역:** 회사가 VMware에서 AWS 컨테이너로 Java 웹 앱을 마이그레이션하려고 합니다. 최소한의 코드 변경으로 CloudFormation 템플릿과 CI/CD 파이프라인을 생성합니다. 어떤 도구를 사용해야 합니까?

**선지:**
- A) AWS App Runner → AWS App Runner
- B) AWS Copilot CLI → AWS Copilot CLI
- C) AWS App2Container (A2C) → AWS App2Container (A2C)
- D) AWS Migration Hub → AWS Migration Hub

**정답:** C

**선지별 해설:**
- **A) AWS App Runner:** App Runner는 새 애플리케이션 배포에 적합하지만, 기존 VM 기반 앱을 컨테이너로 변환하는 도구가 아닙니다. 마이그레이션 기능이 없습니다.
- **B) AWS Copilot CLI:** Copilot은 ECS/Fargate에 컨테이너화된 앱을 쉽게 배포하기 위한 CLI 도구입니다. 새 컨테이너 앱 배포에는 좋지만, 기존 VM 앱을 컨테이너로 변환하는 기능은 없습니다.
- **C) AWS App2Container (A2C):** 정답입니다. App2Container는 기존 Java 및 .NET 웹 앱을 컨테이너로 자동 변환하는 도구입니다. (1) 실행 중인 앱을 분석하고, (2) Dockerfile과 컨테이너 이미지를 생성하며, (3) CloudFormation 템플릿과 CI/CD 파이프라인(CodePipeline)을 자동 생성합니다. VMware 환경에서도 작동합니다.
- **D) AWS Migration Hub:** Migration Hub는 마이그레이션 프로세스를 추적하고 관리하는 중앙 허브이지만, 실제 컨테이너 변환 작업을 수행하지는 않습니다.

**핵심 개념:** 기존 Java/.NET 앱 → 컨테이너 자동 변환 + CloudFormation + CI/CD 생성 = AWS App2Container
