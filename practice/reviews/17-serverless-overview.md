# Section 17 - Serverless Overview 연습문제 해설

---

### Q1. Lambda function processes S3 uploads. Peak hours: some files not processed. Function takes ~2 min. CloudWatch shows ThrottleError (429). What to do?

**한글 번역:** Lambda 함수가 S3 업로드를 처리합니다. 피크 시간에 일부 파일이 처리되지 않습니다. 함수 실행 시간은 약 2분입니다. CloudWatch에서 ThrottleError(429)가 표시됩니다. 어떻게 해야 합니까?

**선지:**
- A) Increase Lambda timeout to 15 minutes → Lambda 타임아웃을 15분으로 증가
- B) Request concurrency limit increase through AWS Support → AWS Support를 통해 동시 실행 한도 증가 요청
- C) Switch to EC2 instances → EC2 인스턴스로 전환
- D) Reduce Lambda memory allocation → Lambda 메모리 할당 줄이기

**정답:** B

**선지별 해설:**
- **A) Increase Lambda timeout to 15 minutes:** ThrottleError는 동시 실행 한도 초과로 인한 오류입니다. 타임아웃은 개별 함수의 최대 실행 시간이며, 동시성 문제와는 무관합니다. 오히려 타임아웃을 늘리면 동시 실행 수가 더 많아져 문제가 악화될 수 있습니다.
- **B) Request concurrency limit increase:** 정답입니다. ThrottleError(429)는 Lambda의 동시 실행 한도(기본 1,000)에 도달했음을 의미합니다. AWS Support에 서비스 할당량(quota) 증가를 요청하면 더 많은 동시 실행이 가능해져 스로틀링 문제를 해결할 수 있습니다.
- **C) Switch to EC2 instances:** EC2로 전환하는 것은 과도한 조치입니다. Lambda의 동시성 한도를 늘리는 것이 훨씬 간단하고 서버리스 이점을 유지할 수 있습니다.
- **D) Reduce Lambda memory allocation:** 메모리를 줄이면 함수 실행 시간이 길어질 수 있어, 동시에 실행 중인 함수 수가 증가하고 스로틀링이 악화될 수 있습니다. 문제를 해결하지 못하며 오히려 악화시킬 수 있습니다.

**핵심 개념:** Lambda ThrottleError(429) = 동시 실행 한도 초과 → 서비스 할당량 증가 요청

---

### Q2. Data processing job takes 30 minutes. Want serverless solution. Which service?

**한글 번역:** 데이터 처리 작업에 30분이 걸립니다. 서버리스 솔루션을 원합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) AWS Lambda → AWS Lambda
- B) AWS Fargate with ECS → ECS를 사용하는 AWS Fargate
- C) EC2 Spot Instances → EC2 스팟 인스턴스
- D) AWS Batch on EC2 → EC2의 AWS Batch

**정답:** B

**선지별 해설:**
- **A) AWS Lambda:** Lambda의 최대 실행 시간은 15분(900초)입니다. 30분이 걸리는 작업은 Lambda에서 실행할 수 없습니다.
- **B) AWS Fargate with ECS:** 정답입니다. Fargate는 서버리스 컨테이너 실행 환경으로, 실행 시간 제한이 없습니다. 서버 관리 없이 30분 이상의 장시간 작업을 실행할 수 있습니다. "서버리스 + 15분 초과 작업"일 때 가장 적합한 솔루션입니다.
- **C) EC2 Spot Instances:** 스팟 인스턴스는 비용 효율적이지만 서버리스가 아닙니다. EC2 인스턴스를 직접 관리해야 합니다.
- **D) AWS Batch on EC2:** AWS Batch on EC2는 배치 작업 처리에 적합하지만, EC2 기반이므로 서버리스가 아닙니다. (참고: AWS Batch는 Fargate도 지원하지만, 선지에서 "on EC2"로 명시되어 있습니다.)

**핵심 개념:** 서버리스 + 15분 초과 실행 시간 = Fargate (Lambda는 최대 15분)

---

### Q3. DynamoDB table used globally. Users in US and Europe need low-latency read and write access. What feature?

**한글 번역:** DynamoDB 테이블이 전역적으로 사용됩니다. 미국과 유럽의 사용자가 저지연 읽기 및 쓰기 접근이 필요합니다. 어떤 기능을 사용해야 합니까?

**선지:**
- A) DynamoDB DAX → DynamoDB DAX
- B) DynamoDB Global Tables → DynamoDB 글로벌 테이블
- C) DynamoDB On-Demand capacity mode → DynamoDB 온디맨드 용량 모드
- D) DynamoDB Point-in-Time Recovery → DynamoDB 특정 시점 복구

**정답:** B

**선지별 해설:**
- **A) DynamoDB DAX:** DAX는 DynamoDB용 인메모리 캐시로, 읽기 지연 시간을 마이크로초 수준으로 줄여줍니다. 하지만 DAX는 단일 리전에서 작동하며, 여러 리전의 사용자에게 저지연 쓰기 접근을 제공하지 못합니다.
- **B) DynamoDB Global Tables:** 정답입니다. 글로벌 테이블은 여러 AWS 리전에 걸쳐 DynamoDB 테이블을 자동으로 복제합니다. 각 리전에서 읽기와 쓰기 모두 저지연으로 수행할 수 있으며(멀티 리전, 멀티 액티브), 리전 간 데이터가 자동으로 동기화됩니다.
- **C) DynamoDB On-Demand capacity mode:** 온디맨드 모드는 용량 계획 없이 자동으로 처리량을 조절하지만, 이는 단일 리전 내의 확장성에 관한 것입니다. 다중 리전 저지연 접근과는 무관합니다.
- **D) DynamoDB Point-in-Time Recovery:** PITR은 테이블의 특정 시점 백업/복구 기능입니다. 성능이나 지연 시간과는 전혀 관련이 없습니다.

**핵심 개념:** DynamoDB 다중 리전 저지연 읽기/쓰기 = Global Tables

---

### Q4. Public-facing REST API using API Gateway. Need to authenticate mobile app users. Users sign up with email/password and can log in with Facebook. Which service for authentication?

**한글 번역:** API Gateway를 사용하는 공개 REST API입니다. 모바일 앱 사용자를 인증해야 합니다. 사용자는 이메일/비밀번호로 가입하고 Facebook으로 로그인할 수 있습니다. 인증을 위해 어떤 서비스를 사용해야 합니까?

**선지:**
- A) IAM Users and Groups → IAM 사용자 및 그룹
- B) Amazon Cognito User Pools → Amazon Cognito 사용자 풀
- C) API Gateway API Keys → API Gateway API 키
- D) AWS IAM Identity Center (SSO) → AWS IAM Identity Center (SSO)

**정답:** B

**선지별 해설:**
- **A) IAM Users and Groups:** IAM은 AWS 리소스에 대한 접근 관리용이며, 수백만 명의 모바일 앱 사용자를 관리하는 데 적합하지 않습니다. 이메일/비밀번호 가입이나 소셜 로그인을 지원하지 않습니다.
- **B) Amazon Cognito User Pools:** 정답입니다. Cognito User Pools는 (1) 이메일/비밀번호 기반 가입 및 로그인, (2) Facebook, Google, Apple 등 소셜 ID 공급자 연동, (3) API Gateway와의 네이티브 통합을 지원하는 사용자 디렉토리 서비스입니다. 모바일 앱 사용자 인증의 표준 솔루션입니다.
- **C) API Gateway API Keys:** API 키는 API 사용량 제한(throttling)과 사용량 계획(usage plans)을 위한 것이며, 사용자 인증 메커니즘이 아닙니다. 누가 API를 호출하는지 식별하는 용도로는 부적합합니다.
- **D) AWS IAM Identity Center (SSO):** IAM Identity Center는 조직 내부 직원의 AWS 계정 및 비즈니스 앱에 대한 SSO 관리용입니다. 외부 모바일 앱 사용자 인증에는 적합하지 않습니다.

**핵심 개념:** 모바일/웹 앱 사용자 인증 + 소셜 로그인 + API Gateway 통합 = Cognito User Pools

---

### Q5. Mobile app needs authenticated users to upload files directly to their own S3 folder. Users authenticate through Cognito User Pools. How to provide S3 access?

**한글 번역:** 모바일 앱에서 인증된 사용자가 자신의 S3 폴더에 직접 파일을 업로드해야 합니다. 사용자는 Cognito User Pools를 통해 인증합니다. S3 접근을 어떻게 제공해야 합니까?

**선지:**
- A) Generate IAM users for each mobile user → 각 모바일 사용자에 대한 IAM 사용자 생성
- B) Use Cognito Identity Pools for temporary AWS credentials scoped to user's folder → Cognito Identity Pools를 사용하여 사용자 폴더로 범위가 제한된 임시 AWS 자격 증명 제공
- C) Create pre-signed URLs for each upload → 각 업로드에 대한 미리 서명된 URL 생성
- D) Make S3 bucket public with folder-level ACLs → 폴더 수준 ACL로 S3 버킷을 퍼블릭으로 설정

**정답:** B

**선지별 해설:**
- **A) Generate IAM users for each mobile user:** 수백만 명의 모바일 사용자에 대해 IAM 사용자를 개별 생성하는 것은 확장 불가능하며 IAM의 사용자 수 제한에 도달할 수 있습니다. 장기 자격 증명 관리도 보안 위험이 있습니다.
- **B) Cognito Identity Pools for temporary AWS credentials:** 정답입니다. Cognito Identity Pools(Federated Identities)는 Cognito User Pools에서 인증된 사용자에게 임시 AWS 자격 증명(STS)을 제공합니다. IAM 정책의 변수(${cognito-identity.amazonaws.com:sub})를 사용하여 각 사용자가 자신의 S3 폴더에만 접근하도록 범위를 제한할 수 있습니다.
- **C) Create pre-signed URLs for each upload:** Pre-signed URL은 서버 측에서 생성해야 하므로 "직접 업로드"가 아닌 서버를 경유하는 방식입니다. 매번 URL을 생성하기 위한 추가 API 호출이 필요하며, Cognito Identity Pools보다 복잡합니다.
- **D) Make S3 bucket public with folder-level ACLs:** S3 버킷을 퍼블릭으로 설정하는 것은 심각한 보안 위험입니다. ACL로는 사용자별 세밀한 접근 제어가 어렵습니다. 절대 권장하지 않는 방법입니다.

**핵심 개념:** Cognito User Pools(인증) + Cognito Identity Pools(임시 AWS 자격 증명) = S3 직접 접근

---

### Q6. Customize CloudFront responses by adding security headers. Must handle millions of requests per second with sub-millisecond latency. Which solution?

**한글 번역:** 보안 헤더를 추가하여 CloudFront 응답을 커스터마이즈합니다. 밀리초 미만의 지연 시간으로 초당 수백만 건의 요청을 처리해야 합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) Lambda@Edge on Viewer Response → Viewer Response의 Lambda@Edge
- B) CloudFront Functions on Viewer Response → Viewer Response의 CloudFront Functions
- C) AWS WAF custom rules on CloudFront → CloudFront의 AWS WAF 사용자 정의 규칙
- D) Origin server middleware → 오리진 서버 미들웨어

**정답:** B

**선지별 해설:**
- **A) Lambda@Edge on Viewer Response:** Lambda@Edge는 CloudFront 엣지에서 실행되지만, 실행 시간이 밀리초 단위이며 초당 수천 건의 요청을 처리합니다. "밀리초 미만 + 초당 수백만 건"이라는 요구사항을 충족하지 못합니다. Lambda@Edge는 더 복잡한 로직에 적합합니다.
- **B) CloudFront Functions on Viewer Response:** 정답입니다. CloudFront Functions는 (1) 밀리초 미만(sub-millisecond)의 실행 시간, (2) 초당 수백만 건의 요청 처리가 가능하며, (3) 헤더 조작, URL 리다이렉트 등 경량 작업에 최적화되어 있습니다. 보안 헤더 추가와 같은 간단한 작업에 완벽한 솔루션입니다.
- **C) AWS WAF custom rules on CloudFront:** WAF는 웹 방화벽으로 악의적인 요청을 차단하는 데 사용됩니다. 응답에 커스텀 보안 헤더를 추가하는 기능은 제공하지 않습니다.
- **D) Origin server middleware:** 오리진 서버에서 처리하면 모든 요청이 오리진까지 전달되어야 하므로 지연 시간이 증가하고 오리진 부하가 높아집니다. 엣지에서 처리하는 것이 훨씬 효율적입니다.

**핵심 개념:** CloudFront Functions vs Lambda@Edge — 경량 작업(헤더 조작) + 초고성능 = CloudFront Functions

---

### Q7. Lambda function needs to connect to RDS PostgreSQL in VPC. During traffic spikes, database overwhelmed with too many connections. Best solution?

**한글 번역:** Lambda 함수가 VPC 내의 RDS PostgreSQL에 연결해야 합니다. 트래픽 급증 시 데이터베이스가 너무 많은 연결로 과부하됩니다. 최선의 솔루션은 무엇입니까?

**선지:**
- A) Increase RDS instance size → RDS 인스턴스 크기 증가
- B) Deploy Lambda in VPC and use RDS Proxy → Lambda를 VPC에 배포하고 RDS Proxy 사용
- C) Use DynamoDB instead → 대신 DynamoDB 사용
- D) Implement connection caching in Lambda code → Lambda 코드에서 연결 캐싱 구현

**정답:** B

**선지별 해설:**
- **A) Increase RDS instance size:** 인스턴스 크기를 늘리면 일시적으로 도움이 될 수 있지만, Lambda의 동시 실행으로 인한 연결 수 폭증 문제를 근본적으로 해결하지 못합니다. 비용도 크게 증가합니다.
- **B) Lambda in VPC + RDS Proxy:** 정답입니다. RDS Proxy는 (1) 데이터베이스 연결을 풀링하여 수천 개의 Lambda 동시 실행에서도 실제 DB 연결 수를 제한하고, (2) 연결 재사용으로 데이터베이스 부하를 크게 줄이며, (3) 장애 조치 시간도 단축합니다. Lambda + RDS 조합에서의 연결 관리 표준 솔루션입니다.
- **C) Use DynamoDB instead:** 데이터베이스 자체를 변경하는 것은 과도한 조치이며, 관계형 데이터베이스가 필요한 경우 DynamoDB로 대체할 수 없습니다. 대규모 코드 변경이 필요합니다.
- **D) Connection caching in Lambda code:** Lambda는 실행 환경이 재사용될 때 연결을 캐싱할 수 있지만, 동시에 수백~수천 개의 Lambda 인스턴스가 실행되면 각각 별도의 연결을 유지합니다. 연결 수 문제를 충분히 해결하지 못합니다.

**핵심 개념:** Lambda + RDS 연결 과부하 = RDS Proxy (연결 풀링)

---

### Q8. DynamoDB table has many reads but few writes. Need microsecond latency for reads. Which caching solution?

**한글 번역:** DynamoDB 테이블에 읽기가 많고 쓰기가 적습니다. 읽기에 마이크로초 지연 시간이 필요합니다. 어떤 캐싱 솔루션을 사용해야 합니까?

**선지:**
- A) ElastiCache Redis → ElastiCache Redis
- B) DynamoDB Accelerator (DAX) → DynamoDB Accelerator (DAX)
- C) Amazon CloudFront → Amazon CloudFront
- D) API Gateway caching → API Gateway 캐싱

**정답:** B

**선지별 해설:**
- **A) ElastiCache Redis:** ElastiCache Redis는 범용 인메모리 캐시로, DynamoDB와 함께 사용할 수 있습니다. 하지만 애플리케이션 코드에서 캐시 로직(캐시 히트/미스 처리)을 직접 구현해야 합니다. DynamoDB 전용 캐시인 DAX가 더 적합합니다.
- **B) DynamoDB Accelerator (DAX):** 정답입니다. DAX는 DynamoDB 전용 인메모리 캐시로, (1) 마이크로초 단위의 읽기 지연 시간을 제공하고, (2) DynamoDB API와 완벽히 호환되어 코드 변경이 최소화되며, (3) 읽기 집중 워크로드에 최적화되어 있습니다. DynamoDB의 읽기 캐싱에는 항상 DAX가 우선 선택입니다.
- **C) Amazon CloudFront:** CloudFront는 HTTP 기반 콘텐츠 전달에 사용되며, DynamoDB의 데이터베이스 읽기를 직접 캐싱하지 않습니다.
- **D) API Gateway caching:** API Gateway 캐싱은 API 응답을 캐싱하지만, 데이터베이스 수준의 캐싱이 아닙니다. 다양한 쿼리 패턴에 대해 효율적이지 않을 수 있습니다.

**핵심 개념:** DynamoDB 읽기 캐싱 + 마이크로초 지연 = DAX (DynamoDB Accelerator)
