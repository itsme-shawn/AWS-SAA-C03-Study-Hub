# CloudFront & Global Accelerator

## 개요
Amazon CloudFront는 AWS의 CDN(Content Delivery Network) 서비스이고, AWS Global Accelerator는 AWS 글로벌 네트워크를 활용하여 애플리케이션의 가용성과 성능을 개선하는 서비스이다. 시험에서 "글로벌 사용자에 대한 지연 시간 감소", "정적/동적 콘텐츠 전송 최적화", "DDoS 보호" 관련 문제에서 자주 출제된다.

## 핵심 개념

### CloudFront 기본 개념
> **직관적 비유:** 서울에 있는 영상 서버에서 브라질 사용자가 동영상을 다운로드하려면 지구 반 바퀴를 돌아야 해서 느리다. CDN은 브라질 근처 도시에 그 영상의 복사본을 미리 갖다 놓는다. 다음 사용자는 바로 근처에서 받으니 훨씬 빠르다. CloudFront는 AWS의 CDN 서비스다.

- **CDN(Content Delivery Network, 콘텐츠 전송 네트워크)**: 전 세계 수백 개의 Edge Location(사용자 근처의 AWS 캐시 서버)에 콘텐츠를 복사해두어 읽기 성능 향상
- **TTL(Time To Live, 캐시 유효 시간)**: 캐싱된 콘텐츠가 Edge Location에 유지되는 기간 (기본 약 하루). TTL이 지나면 Edge Location이 원본 서버에서 최신 버전을 가져옴
- DDoS(분산 서비스 거부 공격) 보호: AWS Shield 및 AWS WAF(웹 방화벽)와 통합

### CloudFront 배포 구조

```text
                        ┌───────────────────────────────────────────┐
                        │           CloudFront Distribution          │
                        └───────────────┬───────────────────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              ▼                         ▼                         ▼
     ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
     │ Edge Location │         │ Edge Location │         │ Edge Location │
     │  (서울)       │         │  (도쿄)       │         │  (버지니아)   │
     └──────┬───────┘         └──────┬───────┘         └──────┬───────┘
            │ Cache Miss 시            │                        │
            ▼                         ▼                        ▼
     ┌─────────────────────────────────────────────────────────────┐
     │                     Origin (원본 소스)                       │
     │  ┌──────────┐   ┌────────────┐   ┌─────────────────────┐   │
     │  │ S3 Bucket│   │ ALB / EC2  │   │ VPC Origin          │   │
     │  │ (+ OAC)  │   │ (Public)   │   │ (Private ALB/NLB)   │   │
     │  └──────────┘   └────────────┘   └─────────────────────┘   │
     └─────────────────────────────────────────────────────────────┘

 [User] ──요청──▶ [가장 가까운 Edge Location] ──Cache Hit──▶ 즉시 응답
                                              ──Cache Miss──▶ Origin에서 가져옴
```

### CloudFront Origins (원본 소스)
> **Origin이란?** CloudFront가 콘텐츠를 가져오는 "원본 서버"를 뜻한다. Edge Location에 캐시가 없으면(Cache Miss) Origin에서 데이터를 가져와 캐시에 저장한 뒤 사용자에게 전달한다.

- **S3 버킷**: 파일 배포 및 캐싱, S3에 파일 업로드도 가능. **OAC(Origin Access Control)** + S3 버킷 정책으로 보안 (S3를 CloudFront를 통해서만 접근 가능하게 잠금)
- **VPC Origin**: VPC(Virtual Private Cloud, 가상 사설 네트워크) 프라이빗 서브넷의 애플리케이션 (Private ALB, NLB, EC2)에 접근 가능 — 내부 서버를 인터넷에 직접 노출하지 않아도 됨
- **Custom Origin (HTTP)**: S3 정적 웹사이트, 퍼블릭 ALB 등 모든 HTTP 백엔드

### CloudFront와 퍼블릭 네트워크를 통한 ALB/EC2 연결
- **EC2 인스턴스가 Origin인 경우**: EC2는 반드시 퍼블릭이어야 하며, Edge Location의 퍼블릭 IP를 보안 그룹에서 허용
- **ALB가 Origin인 경우**: ALB는 퍼블릭이어야 하며, EC2는 프라이빗 가능. ALB 보안 그룹에서 Edge Location IP 허용, EC2 보안 그룹에서 ALB 보안 그룹 허용

### CloudFront vs S3 Cross Region Replication
| CloudFront | S3 Cross Region Replication |
|---|---|
| 글로벌 Edge 네트워크 | 리전별 설정 필요 |
| TTL 동안 캐싱 | 거의 실시간 업데이트 |
| 정적 콘텐츠를 전 세계 배포에 적합 | 소수 리전에서 저지연 동적 콘텐츠에 적합 |

### CloudFront Geo Restriction (지역 제한)
- **Allowlist**: 승인된 국가 목록의 사용자만 접근 허용
- **Blocklist**: 차단된 국가 목록의 사용자 접근 금지
- 3rd party Geo-IP 데이터베이스로 국가 판별
- 사용 사례: 저작권법에 따른 콘텐츠 접근 제어

### CloudFront Cache Invalidation (캐시 무효화)
- Origin 업데이트 시 TTL 만료 전에는 CloudFront가 새 콘텐츠를 가져오지 않음
- **캐시 무효화**로 TTL 우회 가능: 전체(`/*`) 또는 특정 경로(`/images/*`)

### AWS Global Accelerator
> **CloudFront와의 차이:** CloudFront는 콘텐츠를 Edge에 캐싱해서 제공하지만, Global Accelerator는 캐싱 없이 트래픽 자체를 AWS 내부 고속 네트워크로 빠르게 라우팅한다. 게임, IoT, VoIP처럼 HTTP가 아닌 프로토콜(UDP 등)이나 실시간 양방향 통신에 적합하다.

- AWS 내부 최적화된 사설 네트워크를 활용하여 애플리케이션으로 라우팅 (인터넷 공중망 대신 AWS 전용 망 사용)
- **Anycast IP** (모든 Edge가 동일한 IP를 공유, 클라이언트는 가장 가까운 Edge로 자동 연결) 2개 생성 -> Edge Location -> 애플리케이션으로 트래픽 전달
- Elastic IP, EC2, ALB, NLB (퍼블릭/프라이빗) 지원
- **일관된 성능**: 지능형 라우팅, 빠른 리전 장애 조치
- **Health Check (상태 확인)**: 1분 미만 장애 조치, 재해 복구에 적합
- **보안**: 외부에서 화이트리스트해야 할 IP가 2개뿐이므로 방화벽 관리 간소화, AWS Shield로 DDoS 보호

### Global Accelerator 동작 구조

```text
                  ┌─────────────────────────────────────────┐
                  │    AWS Global Accelerator                │
                  │    Anycast IP: 1.2.3.4, 5.6.7.8         │
                  └──────────────────┬──────────────────────┘
                                     │
            ┌────────────────────────┼────────────────────────┐
            ▼                        ▼                        ▼
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │  Edge Location   │    │  Edge Location   │    │  Edge Location   │
   │  (유럽)          │    │  (아시아)        │    │  (미국)          │
   └────────┬────────┘    └────────┬────────┘    └────────┬────────┘
            │    AWS 내부 네트워크 (Private)       │                │
            └────────────────────────┼────────────────────────┘
                                     ▼
                  ┌──────────────────────────────────────┐
                  │  Application Endpoints               │
                  │  (ALB, NLB, EC2, Elastic IP)         │
                  │  Region: us-east-1, eu-west-1 등     │
                  └──────────────────────────────────────┘

 [User] ──▶ 가장 가까운 Edge (Anycast) ──AWS 내부 네트워크──▶ App
```

### Unicast IP vs Anycast IP
- **Unicast IP**: 하나의 서버에 하나의 IP
- **Anycast IP**: 모든 서버가 동일 IP를 가지며, 클라이언트는 가장 가까운 서버로 라우팅

### CloudFront vs Global Accelerator

```text
 CloudFront                              Global Accelerator
 ─────────────────────────               ─────────────────────────
 [User]                                  [User]
   │                                       │
   ▼                                       ▼
 ┌──────────────┐                        ┌──────────────┐
 │ Edge Location │ ◀── 콘텐츠 캐싱        │ Edge Location │ ◀── 패킷 프록시
 │ (캐시 HIT)   │     (HTTP/HTTPS)       │ (캐시 없음)  │     (TCP/UDP)
 └──────┬───────┘                        └──────┬───────┘
        │ Cache Miss 시만                        │ 항상 전달
        ▼                                       ▼
 ┌──────────────┐                        ┌──────────────┐
 │   Origin     │                        │  Application │
 │ (S3/ALB/EC2) │                        │ (ALB/NLB/EC2)│
 └──────────────┘                        └──────────────┘

 ✓ 정적/동적 콘텐츠                      ✓ 비HTTP (UDP, MQTT, VoIP)
 ✓ Edge에서 콘텐츠 제공                  ✓ 고정 Anycast IP 2개
 ✓ HTTP/HTTPS 최적화                     ✓ 빠른 리전 장애 조치 (<1분)
```

| CloudFront | Global Accelerator |
|---|---|
| 캐시 가능한 콘텐츠 + 동적 콘텐츠 성능 향상 | TCP/UDP 애플리케이션 성능 향상 |
| Edge에서 콘텐츠 제공 | Edge에서 패킷을 프록시하여 리전 앱에 전달 |
| HTTP/HTTPS에 최적화 | 비HTTP (게임 UDP, IoT MQTT, VoIP)에 적합 |
| - | 고정 IP 주소 필요 시 적합 |
| - | 결정적이고 빠른 리전 장애 조치 필요 시 적합 |

## 시험 포인트
- CloudFront는 정적 콘텐츠 캐싱 + 동적 콘텐츠 가속 모두 가능
- **OAC(Origin Access Control)**는 S3 원본 보안의 핵심 (구 OAI를 대체)
- **VPC Origin**을 사용하면 프라이빗 서브넷의 리소스에 CloudFront 접근 가능
- Snowball은 Glacier에 직접 import 불가 -> S3 먼저, 그 후 Lifecycle Policy
- Global Accelerator는 **고정 IP(Anycast IP 2개)**가 필요할 때 사용
- 비HTTP 프로토콜(UDP, MQTT 등)은 Global Accelerator 사용
- 둘 다 AWS Shield와 통합되어 DDoS 보호 제공
- Cache Invalidation은 TTL 전에 콘텐츠 갱신이 필요할 때 사용

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| CloudFront | CDN, Edge Location에서 콘텐츠 캐싱 및 전송 |
| OAC | S3 Origin을 CloudFront에서만 접근하도록 보안 설정 |
| VPC Origin | 프라이빗 서브넷 리소스에 CloudFront 접근 허용 |
| Geo Restriction | 국가별 콘텐츠 접근 허용/차단 |
| Cache Invalidation | TTL 전 캐시 강제 갱신 (`/*`, `/images/*`) |
| Global Accelerator | Anycast IP + AWS 내부 네트워크로 글로벌 앱 가속 |
| Anycast IP | 2개의 고정 IP, 가장 가까운 Edge로 라우팅 |
| Health Check | Global Accelerator의 1분 미만 장애 조치 |

---

## Practice Questions

### Q1. A company hosts a web application on EC2 instances behind an Application Load Balancer. The application serves users globally, and users in distant regions experience high latency. The content includes both static images and dynamic API responses. Which solution will improve performance for ALL users?
**Options:**
- A) Use S3 Cross-Region Replication to copy content to multiple regions
- B) Deploy Amazon CloudFront with the ALB as the origin
- C) Use AWS Global Accelerator with the ALB as the endpoint
- D) Deploy additional ALBs in every AWS region

**Answer:** B

**해설:**

> **문제:** 회사가 Application Load Balancer 뒤에 있는 EC2 인스턴스에서 웹 애플리케이션을 호스팅하고 있다. 이 애플리케이션은 전 세계 사용자에게 서비스를 제공하며, 먼 지역의 사용자는 높은 지연 시간을 경험한다. 콘텐츠에는 정적 이미지와 동적 API 응답이 모두 포함된다. 모든 사용자의 성능을 향상시킬 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | S3 Cross-Region Replication을 사용하여 여러 리전에 콘텐츠 복사 |
| B | ALB를 오리진으로 하여 Amazon CloudFront 배포 |
| C | ALB를 엔드포인트로 하여 AWS Global Accelerator 사용 |
| D | 모든 AWS 리전에 추가 ALB 배포 |

**(A)** : S3 Cross-Region Replication은 S3 객체만 해당된다. 동적 API 응답에는 적용할 수 없다. → [📖 S3 Replication 복제](/section/10-amazon-s3#s3-replication-복제)

**(B) 정답** : CloudFront는 정적 콘텐츠(캐싱)와 동적 콘텐츠(API 가속) 모두에 대해 성능을 향상시킨다. ALB를 Origin으로 설정하면 두 유형의 콘텐츠 모두를 최적화할 수 있다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(C)** : Global Accelerator도 성능을 개선할 수 있지만 캐싱 기능이 없어 정적 콘텐츠에 대한 최적화가 부족하다. → [📖 AWS Global Accelerator](/section/13-cloudfront-global-accelerator#aws-global-accelerator)

**(D)** : 모든 리전에 ALB를 배포하는 것은 운영 오버헤드가 크고 비현실적이다. 비용도 매우 높다.

**핵심 개념:** CloudFront Origins, 동적/정적 콘텐츠 전송

**관련 노트:** [CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스), [CloudFront vs S3 Cross Region Replication](/section/13-cloudfront-global-accelerator#cloudfront-vs-s3-cross-region-replication)

### Q2. A company stores confidential documents in an S3 bucket and wants to distribute them globally via CloudFront. The documents must NOT be accessible directly from the S3 bucket URL. What should the solutions architect do?
**Options:**
- A) Configure S3 bucket as a static website and use CloudFront
- B) Use CloudFront with Origin Access Control (OAC) and update the S3 bucket policy
- C) Enable S3 Transfer Acceleration and share pre-signed URLs
- D) Use AWS Global Accelerator pointing to the S3 bucket

**Answer:** B

**해설:**

> **문제:** 회사가 S3 버킷에 기밀 문서를 저장하고 CloudFront를 통해 전 세계에 배포하려 한다. 문서는 S3 버킷 URL에서 직접 접근할 수 없어야 한다. 솔루션 아키텍트는 무엇을 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | S3 버킷을 정적 웹사이트로 구성하고 CloudFront 사용 |
| B | CloudFront에서 Origin Access Control(OAC)을 사용하고 S3 버킷 정책 업데이트 |
| C | S3 Transfer Acceleration을 활성화하고 사전 서명된 URL 공유 |
| D | S3 버킷을 가리키는 AWS Global Accelerator 사용 |

**(A)** : S3 정적 웹사이트 호스팅은 퍼블릭 접근이 필요하다. 기밀 문서를 직접 접근 차단해야 하는 요구사항에 부적합하다. → [📖 S3 정적 웹사이트 호스팅](/section/10-amazon-s3#s3-정적-웹사이트-호스팅)

**(B) 정답** : OAC(Origin Access Control)를 설정하고 S3 버킷 정책을 CloudFront 배포에서만 접근하도록 업데이트하면 S3 URL 직접 접근이 차단된다. CloudFront를 통해서만 기밀 문서에 접근할 수 있다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(C)** : S3 Transfer Acceleration은 업로드 가속화 용도이다. S3 URL 직접 접근을 차단하지 않으며 CloudFront를 사용하지도 않는다. → [📖 S3 Performance 최적화](/section/11-s3-advanced#s3-performance-최적화)

**(D)** : Global Accelerator는 S3 콘텐츠 배포용 서비스가 아니다. S3를 Origin으로 사용할 수 없다. → [📖 AWS Global Accelerator](/section/13-cloudfront-global-accelerator#aws-global-accelerator)

**핵심 개념:** CloudFront OAC, S3 버킷 정책

**관련 노트:** [CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스), [CloudFront 배포 구조](/section/13-cloudfront-global-accelerator#cloudfront-배포-구조)

### Q3. A gaming company is deploying a multiplayer game that uses UDP protocol. Players around the world experience high latency. The company needs a solution that provides static IP addresses and fast regional failover. Which AWS service should they use?
**Options:**
- A) Amazon CloudFront
- B) Amazon Route 53 with latency-based routing
- C) AWS Global Accelerator
- D) Application Load Balancer with cross-zone load balancing

**Answer:** C

**해설:**

> **문제:** 게임 회사가 UDP 프로토콜을 사용하는 멀티플레이어 게임을 배포하고 있다. 전 세계 플레이어들이 높은 지연 시간을 경험하고 있다. 회사는 고정 IP 주소와 빠른 리전 장애 조치를 제공하는 솔루션이 필요하다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon CloudFront |
| B | 지연 시간 기반 라우팅을 사용하는 Amazon Route 53 |
| C | AWS Global Accelerator |
| D | 크로스 존 로드 밸런싱이 적용된 Application Load Balancer |

**(A)** : CloudFront는 HTTP/HTTPS에 최적화되어 있다. UDP 프로토콜을 지원하지 않는다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B)** : Route 53은 DNS 기반이므로 클라이언트 DNS 캐시 문제로 빠른 장애 조치가 어렵다. 고정 IP도 제공하지 않는다.

**(C) 정답** : Global Accelerator는 UDP와 같은 비HTTP 프로토콜을 지원하며 2개의 고정 Anycast IP와 빠른 리전 장애 조치를 제공한다. 멀티플레이어 게임의 UDP 프로토콜 및 고정 IP 요구사항을 모두 충족한다. → [📖 AWS Global Accelerator](/section/13-cloudfront-global-accelerator#aws-global-accelerator)

**(D)** : ALB는 단일 리전 서비스이며 UDP 프로토콜을 지원하지 않는다. → [📖 ALB Application Load Balancer 상세](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

**핵심 개념:** Global Accelerator, 비HTTP 프로토콜 (UDP, MQTT, VoIP)

**관련 노트:** [AWS Global Accelerator](/section/13-cloudfront-global-accelerator#aws-global-accelerator), [CloudFront vs Global Accelerator](/section/13-cloudfront-global-accelerator#cloudfront-vs-global-accelerator)

### Q4. A company has deployed a new version of their website. CloudFront is serving stale content from the previous version. The TTL is set to 24 hours. What is the FASTEST way to ensure users see the updated content?
**Options:**
- A) Wait for the TTL to expire
- B) Create a new CloudFront distribution
- C) Perform a CloudFront cache invalidation
- D) Reduce the TTL to 0 seconds

**Answer:** C

**해설:**

> **문제:** 회사가 웹사이트의 새 버전을 배포했다. CloudFront가 이전 버전의 오래된 콘텐츠를 제공하고 있다. TTL이 24시간으로 설정되어 있다. 사용자가 업데이트된 콘텐츠를 볼 수 있도록 하는 가장 빠른 방법은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | TTL이 만료될 때까지 대기 |
| B | 새 CloudFront 배포 생성 |
| C | CloudFront 캐시 무효화 수행 |
| D | TTL을 0초로 줄이기 |

**(A)** : TTL이 만료될 때까지 24시간을 기다려야 한다. "가장 빠른 방법"이라는 요구사항에 맞지 않는다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B)** : 새 CloudFront 배포 생성은 불필요한 재배포로 기존 설정을 다시 구성해야 하는 비효율적인 방법이다.

**(C) 정답** : Cache Invalidation을 수행하면 TTL을 우회하여 즉시 모든 Edge Location의 캐시를 갱신할 수 있다. 전체(`/*`) 또는 특정 경로(`/images/*`)를 무효화할 수 있다. → [📖 CloudFront Cache Invalidation 캐시 무효화](/section/13-cloudfront-global-accelerator#cloudfront-cache-invalidation-캐시-무효화)

**(D)** : TTL을 0으로 설정하면 향후 모든 요청에 캐싱이 적용되지 않는다. Origin에 대한 부하가 증가하고 성능이 저하되므로 권장되지 않는다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**핵심 개념:** CloudFront Cache Invalidation

**관련 노트:** [CloudFront Cache Invalidation 캐시 무효화](/section/13-cloudfront-global-accelerator#cloudfront-cache-invalidation-캐시-무효화)

### Q5. A company wants to deliver content from applications hosted in private subnets of their VPC through CloudFront, without exposing them to the internet. Which CloudFront feature should they use?
**Options:**
- A) Origin Access Control (OAC)
- B) CloudFront Signed URLs
- C) VPC Origin
- D) AWS PrivateLink

**Answer:** C

**해설:**

> **문제:** 회사가 VPC의 프라이빗 서브넷에 호스팅된 애플리케이션의 콘텐츠를 인터넷에 노출하지 않고 CloudFront를 통해 전달하려 한다. 어떤 CloudFront 기능을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Origin Access Control (OAC) |
| B | CloudFront Signed URLs |
| C | VPC Origin |
| D | AWS PrivateLink |

**(A)** : OAC(Origin Access Control)는 S3 Origin 보안용이다. VPC 내 프라이빗 애플리케이션과는 무관하다. → [📖 CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스)

**(B)** : Signed URLs은 특정 사용자의 콘텐츠 접근 제어를 위한 것이다. 프라이빗 서브넷 접근 기능이 아니다. → [📖 S3 Pre-Signed URLs](/section/12-s3-security#s3-presigned-urls)

**(C) 정답** : CloudFront VPC Origin을 사용하면 VPC 프라이빗 서브넷의 Private ALB, NLB, EC2에 인터넷에 노출하지 않고 접근할 수 있다. 내부 서버를 인터넷에 공개하지 않아도 CloudFront를 통해 콘텐츠를 전달할 수 있다. → [📖 CloudFront와 퍼블릭 네트워크를 통한 ALB/EC2 연결](/section/13-cloudfront-global-accelerator#cloudfront와-퍼블릭-네트워크를-통한-albec2-연결)

**(D)** : AWS PrivateLink는 AWS 서비스 간 프라이빗 연결을 제공한다. CloudFront와의 직접 통합 기능이 아니다. → [📖 VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink)

**핵심 개념:** CloudFront VPC Origin

**관련 노트:** [CloudFront와 퍼블릭 네트워크를 통한 ALB/EC2 연결](/section/13-cloudfront-global-accelerator#cloudfront와-퍼블릭-네트워크를-통한-albec2-연결)

### Q6. A solutions architect needs to improve the availability of a global application. The application must have fast failover (less than 1 minute) and the company's firewall only allows whitelisting a small number of static IP addresses. Which solution meets these requirements?
**Options:**
- A) Amazon CloudFront with multiple origins
- B) AWS Global Accelerator with health checks
- C) Amazon Route 53 with health checks and failover routing
- D) Application Load Balancer with cross-region load balancing

**Answer:** B

**해설:**

> **문제:** 솔루션 아키텍트가 글로벌 애플리케이션의 가용성을 개선해야 한다. 애플리케이션은 빠른 장애 조치(1분 미만)가 필요하며, 회사의 방화벽은 소수의 고정 IP 주소만 화이트리스트에 추가할 수 있다. 이 요구사항을 충족하는 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 다중 오리진이 있는 Amazon CloudFront |
| B | 헬스 체크가 있는 AWS Global Accelerator |
| C | 헬스 체크와 장애 조치 라우팅이 있는 Amazon Route 53 |
| D | 크로스 리전 로드 밸런싱이 적용된 Application Load Balancer |

**(A)** : CloudFront는 수백 개의 Edge Location IP를 사용한다. 소수의 IP만 화이트리스트하는 방화벽 요구사항에 부적합하다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B) 정답** : Global Accelerator는 2개의 고정 Anycast IP를 제공하여 방화벽 화이트리스트가 용이하고, Health Check로 1분 미만의 빠른 장애 조치가 가능하다. 두 가지 요구사항을 모두 충족한다. → [📖 Global Accelerator 동작 구조](/section/13-cloudfront-global-accelerator#global-accelerator-동작-구조)

**(C)** : Route 53은 DNS 기반이므로 DNS TTL 때문에 1분 미만의 빠른 장애 조치가 보장되지 않는다. → [📖 Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크)

**(D)** : ALB는 크로스 리전 로드 밸런싱을 직접 지원하지 않는다. 단일 리전 서비스이다. → [📖 ALB Application Load Balancer 상세](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

**핵심 개념:** Global Accelerator, 고정 IP, Health Check

**관련 노트:** [AWS Global Accelerator](/section/13-cloudfront-global-accelerator#aws-global-accelerator), [Global Accelerator 동작 구조](/section/13-cloudfront-global-accelerator#global-accelerator-동작-구조)
