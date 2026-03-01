# Section 09 - Classic Solutions Architecture 연습문제 해설

---

### Q1. A company is designing a web application that stores user session data. The application runs on multiple EC2 instances behind an ALB. Users report losing their shopping cart when routed to a different instance. What is the BEST solution without modifying the application?

**한글 번역:** 회사가 사용자 세션 데이터를 저장하는 웹 애플리케이션을 설계하고 있습니다. 애플리케이션은 ALB 뒤의 여러 EC2 인스턴스에서 실행됩니다. 사용자들이 다른 인스턴스로 라우팅되면 장바구니가 사라진다고 보고합니다. 애플리케이션을 수정하지 않고 가장 좋은 해결책은 무엇입니까?

**선지:**
- A) Enable ELB sticky sessions → ELB 고정 세션(sticky sessions)을 활성화한다
- B) Store session data in ElastiCache → 세션 데이터를 ElastiCache에 저장한다
- C) Use Amazon EBS to store session data → Amazon EBS를 사용하여 세션 데이터를 저장한다
- D) Store session data in Amazon S3 → 세션 데이터를 Amazon S3에 저장한다

**정답:** A

**선지별 해설:**
- **A) ELB Sticky Sessions (정답):** Sticky sessions(세션 선호도)는 동일한 사용자를 항상 동일한 EC2 인스턴스로 라우팅합니다. "애플리케이션을 수정하지 않고"라는 조건이 핵심입니다. Sticky sessions는 ALB 설정만 변경하면 되므로 애플리케이션 코드 변경이 필요 없습니다.
- **B) ElastiCache에 세션 저장:** ElastiCache를 세션 스토어로 사용하는 것은 더 좋은 아키텍처이지만, 애플리케이션 코드를 수정하여 세션을 ElastiCache에 저장/조회하도록 변경해야 합니다. "수정하지 않고"라는 조건에 부합하지 않습니다.
- **C) EBS에 세션 저장:** EBS 볼륨은 단일 EC2 인스턴스에 연결되므로, 다른 인스턴스에서 세션 데이터에 접근할 수 없습니다. 세션 공유 문제를 해결하지 못합니다.
- **D) S3에 세션 저장:** S3에 세션을 저장하려면 애플리케이션 코드를 수정해야 하며, S3는 세션 스토어로서 지연 시간이 ElastiCache보다 높아 적합하지 않습니다.

**핵심 개념:** ELB Sticky Sessions — 애플리케이션 변경 없이 세션 유지 (vs ElastiCache 세션 스토어)

---

### Q2. A 3-tier web application. The web tier must be in a public subnet and the database tier must not be directly accessible from the internet. Which architecture?

**한글 번역:** 3티어 웹 애플리케이션입니다. 웹 티어는 퍼블릭 서브넷에 있어야 하고, 데이터베이스 티어는 인터넷에서 직접 접근할 수 없어야 합니다. 어떤 아키텍처를 사용해야 합니까?

**선지:**
- A) ALB, EC2, and RDS all in public subnets → ALB, EC2, RDS 모두 퍼블릭 서브넷에 배치
- B) ALB in public, EC2 in private, RDS in private → ALB는 퍼블릭, EC2는 프라이빗, RDS는 프라이빗에 배치
- C) All in private with NAT Gateway → 모두 프라이빗에 NAT Gateway와 함께 배치
- D) ALB and EC2 in public, RDS in private → ALB와 EC2는 퍼블릭, RDS는 프라이빗에 배치

**정답:** B

**선지별 해설:**
- **A) 모두 퍼블릭:** RDS를 퍼블릭 서브넷에 배치하면 인터넷에서 접근 가능해질 수 있어 보안 요구사항을 위반합니다. 데이터베이스는 절대 퍼블릭 서브넷에 두지 않아야 합니다.
- **B) ALB 퍼블릭, EC2 프라이빗, RDS 프라이빗 (정답):** 가장 안전한 3티어 아키텍처입니다. ALB만 퍼블릭 서브넷에서 인터넷 트래픽을 받고, EC2(앱 티어)와 RDS(DB 티어)는 프라이빗 서브넷에 배치하여 인터넷 직접 접근을 차단합니다. ALB가 "웹 티어"로서 퍼블릭에 위치합니다.
- **C) 모두 프라이빗:** ALB를 프라이빗에 배치하면 인터넷에서 접근할 수 없습니다. "웹 티어가 퍼블릭 서브넷에 있어야 한다"는 요구사항을 충족하지 못합니다.
- **D) ALB와 EC2 퍼블릭, RDS 프라이빗:** EC2를 퍼블릭 서브넷에 배치하면 불필요하게 인터넷에 노출됩니다. 보안 모범 사례에 따르면 EC2 앱 서버도 프라이빗 서브넷에 두어야 합니다. 또한 이 경우 RDS는 보호되지만 EC2가 공격 표면이 됩니다.

**핵심 개념:** 3티어 아키텍처 — ALB(퍼블릭), EC2(프라이빗), RDS(프라이빗)의 보안 모범 사례

---

### Q3. A company wants to quickly launch new EC2 instances with pre-installed applications for DR. Which approach provides the FASTEST launch time?

**한글 번역:** 회사가 DR을 위해 사전 설치된 애플리케이션이 포함된 새 EC2 인스턴스를 빠르게 시작하고 싶습니다. 가장 빠른 시작 시간을 제공하는 접근 방식은 무엇입니까?

**선지:**
- A) User Data scripts → User Data 스크립트
- B) Golden AMI → Golden AMI (골든 AMI)
- C) AWS CloudFormation → AWS CloudFormation
- D) Combination of Golden AMI and User Data → Golden AMI와 User Data의 조합

**정답:** B

**선지별 해설:**
- **A) User Data 스크립트:** User Data는 인스턴스 시작 시 스크립트를 실행하여 소프트웨어를 설치합니다. 부팅 시마다 설치 과정이 실행되므로 시간이 오래 걸립니다. 설치 실패 가능성도 있습니다.
- **B) Golden AMI (정답):** Golden AMI는 모든 필요한 소프트웨어, 설정, 패치가 사전 설치된 커스텀 AMI입니다. 인스턴스를 시작하면 즉시 사용 가능한 상태가 되므로 가장 빠른 시작 시간을 제공합니다. 부팅 시 추가 설치가 불필요합니다.
- **C) CloudFormation:** CloudFormation은 인프라를 코드로 정의하고 프로비저닝하는 도구입니다. 인스턴스 시작 자체를 자동화하지만, AMI 없이는 소프트웨어 설치 시간이 여전히 필요합니다. 인프라 오케스트레이션 도구이지 부팅 속도와 직접 관련이 없습니다.
- **D) Golden AMI + User Data 조합:** 이 조합은 유연하지만, User Data 스크립트 실행 시간이 추가됩니다. "가장 빠른" 시작 시간이라는 조건에서는 Golden AMI만 사용하는 것이 더 빠릅니다.

**핵심 개념:** Golden AMI — 사전 구성된 AMI를 통한 최속 인스턴스 부팅

---

### Q4. A company runs WordPress on multiple EC2 instances across two AZs. Users upload images that need to be accessible from all instances. Which storage solution?

**한글 번역:** 회사가 두 개의 AZ에 걸쳐 여러 EC2 인스턴스에서 WordPress를 실행합니다. 사용자가 업로드한 이미지가 모든 인스턴스에서 접근 가능해야 합니다. 어떤 스토리지 솔루션을 사용해야 합니까?

**선지:**
- A) Amazon EBS → Amazon EBS
- B) Amazon S3 → Amazon S3
- C) Amazon EFS → Amazon EFS
- D) Instance store → 인스턴스 스토어

**정답:** C

**선지별 해설:**
- **A) Amazon EBS:** EBS 볼륨은 단일 AZ에 존재하며, 기본적으로 하나의 EC2 인스턴스에만 연결됩니다(Multi-Attach는 io1/io2만 지원하며 제한적). 여러 AZ의 여러 인스턴스에서 공유하기에 적합하지 않습니다.
- **B) Amazon S3:** S3는 객체 스토리지로, 파일 시스템처럼 마운트할 수 없습니다. WordPress는 로컬 파일 시스템 경로에 이미지를 저장하므로, 애플리케이션 수정 없이는 S3를 직접 사용하기 어렵습니다.
- **C) Amazon EFS (정답):** EFS는 여러 AZ에 걸쳐 여러 EC2 인스턴스에서 동시에 마운트할 수 있는 공유 파일 시스템(NFS)입니다. WordPress의 미디어 업로드 디렉토리를 EFS로 마운트하면 모든 인스턴스에서 이미지에 접근할 수 있습니다.
- **D) Instance store:** 인스턴스 스토어는 임시(ephemeral) 스토리지로, 인스턴스가 중지/종료되면 데이터가 사라집니다. 다른 인스턴스와 공유도 불가능합니다.

**핵심 개념:** Amazon EFS — 다중 AZ, 다중 인스턴스 공유 파일 스토리지

---

### Q5. A dev team wants to deploy a web app with minimal infrastructure management. They want auto scaling, load balancing, and health monitoring. Node.js app. Which service?

**한글 번역:** 개발 팀이 최소한의 인프라 관리로 웹 앱을 배포하려고 합니다. Auto Scaling, 로드 밸런싱, 상태 모니터링을 원합니다. Node.js 앱입니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) EC2 with Auto Scaling → Auto Scaling이 있는 EC2
- B) AWS Elastic Beanstalk → AWS Elastic Beanstalk
- C) Amazon ECS → Amazon ECS
- D) AWS Lambda → AWS Lambda

**정답:** B

**선지별 해설:**
- **A) EC2 with Auto Scaling:** EC2와 ASG를 직접 구성하면 자동 확장이 가능하지만, ALB, 보안 그룹, 모니터링 등을 모두 직접 설정하고 관리해야 합니다. "최소한의 인프라 관리"라는 요구사항에 부합하지 않습니다.
- **B) Elastic Beanstalk (정답):** Elastic Beanstalk는 PaaS(Platform as a Service)로, 코드를 업로드하기만 하면 Auto Scaling, 로드 밸런싱, 상태 모니터링, 로깅 등을 자동으로 구성합니다. Node.js를 포함한 다양한 플랫폼을 지원하며, 인프라 관리 부담을 최소화합니다.
- **C) Amazon ECS:** ECS는 컨테이너 오케스트레이션 서비스로, Docker 컨테이너를 실행합니다. 컨테이너 정의, 태스크, 서비스 등 추가적인 설정이 필요하며, Elastic Beanstalk보다 관리 부담이 큽니다.
- **D) AWS Lambda:** Lambda는 서버리스 함수 서비스로, 기존 Node.js 웹 애플리케이션을 그대로 배포하기에는 아키텍처 변경이 필요합니다. 전통적인 웹 앱 배포에는 Beanstalk이 더 적합합니다.

**핵심 개념:** AWS Elastic Beanstalk — 최소 관리 부담의 웹 애플리케이션 배포 (PaaS)

---

### Q6. A company needs to process messages asynchronously. Heavy computation, several minutes per message. Which Elastic Beanstalk configuration?

**한글 번역:** 회사가 메시지를 비동기적으로 처리해야 합니다. 무거운 연산이며, 메시지당 수 분이 소요됩니다. 어떤 Elastic Beanstalk 구성을 사용해야 합니까?

**선지:**
- A) Web Server Environment with larger instance → 더 큰 인스턴스의 웹 서버 환경
- B) Worker Environment Tier → Worker 환경 티어
- C) Single Instance deployment → 단일 인스턴스 배포
- D) Web Server Environment with ASG → ASG가 있는 웹 서버 환경

**정답:** B

**선지별 해설:**
- **A) 웹 서버 환경 + 큰 인스턴스:** 웹 서버 환경은 HTTP 요청을 처리하도록 설계되었습니다. 비동기 백그라운드 처리에는 적합하지 않으며, 긴 처리 시간으로 인해 HTTP 타임아웃이 발생할 수 있습니다.
- **B) Worker 환경 티어 (정답):** Elastic Beanstalk Worker 환경은 SQS 큐에서 메시지를 가져와 비동기적으로 처리하도록 설계되었습니다. 긴 처리 시간의 백그라운드 작업에 최적화되어 있으며, SQS 통합이 기본 제공됩니다. Auto Scaling으로 부하에 따라 인스턴스를 조절할 수 있습니다.
- **C) 단일 인스턴스 배포:** 단일 인스턴스는 확장성이 없고, 인스턴스 장애 시 처리가 중단됩니다. 프로덕션 비동기 처리에는 적합하지 않습니다.
- **D) 웹 서버 환경 + ASG:** ASG로 확장할 수 있지만, 웹 서버 환경은 여전히 HTTP 요청 처리에 맞춰져 있습니다. 비동기 메시지 처리에는 Worker 환경이 적합합니다.

**핵심 개념:** Elastic Beanstalk Worker Environment Tier — SQS 기반 비동기 메시지 처리

---

### Q7. A solutions architect is designing security groups for a 3-tier architecture. Which follows least privilege?

**한글 번역:** 솔루션 아키텍트가 3티어 아키텍처의 보안 그룹을 설계하고 있습니다. 최소 권한 원칙을 따르는 것은 무엇입니까?

**선지:**
- A) Allow all inbound on all SGs → 모든 보안 그룹에서 모든 인바운드 허용
- B) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow from ALB SG; RDS SG: allow from EC2 SG → ALB SG: 0.0.0.0/0에서 HTTP/HTTPS 허용; EC2 SG: ALB SG에서 허용; RDS SG: EC2 SG에서 허용
- C) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow all; RDS SG: allow all → ALB SG: 0.0.0.0/0에서 HTTP/HTTPS 허용; EC2 SG: 모두 허용; RDS SG: 모두 허용
- D) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow HTTP from 0.0.0.0/0; RDS SG: allow from EC2 SG → ALB SG: 0.0.0.0/0에서 HTTP/HTTPS 허용; EC2 SG: 0.0.0.0/0에서 HTTP 허용; RDS SG: EC2 SG에서 허용

**정답:** B

**선지별 해설:**
- **A) 모든 SG에서 모든 인바운드 허용:** 최소 권한 원칙을 완전히 위반합니다. 모든 포트와 소스에서의 접근을 허용하여 보안이 전혀 없습니다.
- **B) 체인형 보안 그룹 참조 (정답):** 최소 권한 원칙의 모범 사례입니다. ① ALB만 인터넷(0.0.0.0/0)에서 HTTP/HTTPS를 허용 → ② EC2는 ALB 보안 그룹에서만 트래픽을 허용 → ③ RDS는 EC2 보안 그룹에서만 트래픽을 허용합니다. 각 티어가 바로 앞 티어에서만 접근 가능하도록 체인처럼 연결됩니다.
- **C) EC2와 RDS에서 모두 허용:** ALB는 올바르지만, EC2와 RDS에서 "allow all"은 최소 권한을 위반합니다. 불필요한 소스와 포트가 열려 있습니다.
- **D) EC2에 0.0.0.0/0 허용:** EC2가 인터넷에서 직접 HTTP 트래픽을 받을 수 있으므로 ALB를 우회할 수 있습니다. EC2는 ALB에서만 트래픽을 받아야 하므로 최소 권한을 위반합니다.

**핵심 개념:** 보안 그룹 체인(SG Chaining) — 3티어 아키텍처의 최소 권한 원칙 적용

---
