# Amazon Route 53

## 개요
Amazon Route 53은 AWS의 완전 관리형 DNS(Domain Name System) 서비스이다. 도메인 등록, DNS 라우팅, 헬스 체크 기능을 제공하며, AWS에서 유일하게 **100% 가용성 SLA**를 보장하는 서비스이다. SAA-C03 시험에서 라우팅 정책 비교, Alias vs CNAME, 헬스 체크 구성이 빈번히 출제된다.

## 핵심 개념

### DNS 기본 용어
> **초보자 포인트**: DNS(Domain Name System)는 인터넷의 "전화번호부"다. 사람은 `google.com` 같은 도메인 이름을 기억하지만, 컴퓨터는 `142.250.196.46` 같은 IP 주소로 통신한다. DNS는 도메인 이름을 IP 주소로 변환해주는 역할을 한다. Route 53이 바로 이 DNS 서비스를 제공한다.

```text
[ DNS 쿼리 해석 흐름 ]

  ┌──────────┐    1. example.com?    ┌──────────────────┐
  │  Client   │─────────────────────▶│  Local DNS Server │
  │ (Browser) │                      │  (ISP Resolver)   │
  └──────────┘                      └────────┬─────────┘
       ▲                                      │
       │                          2. Root DNS │
       │                                      ▼
       │                             ┌────────────────┐
       │                             │  Root Server    │
       │                             │  (.com NS 반환)  │
       │                             └────────┬───────┘
       │                                      │
       │                          3. TLD DNS  │
       │                                      ▼
       │                             ┌────────────────┐
       │                             │  TLD Server     │
       │                             │  (.com)         │
       │                             │  (NS 레코드 반환) │
       │                             └────────┬───────┘
       │                                      │
       │                    4. Authoritative   │
       │                                      ▼
       │                             ┌────────────────┐
       │         5. IP 반환           │  Route 53       │
       │◀─────────────────────────── │  (Hosted Zone)  │
       │                             │  A: 1.2.3.4     │
       │                             └────────────────┘
       │
       │  6. HTTP 요청
       ▼
  ┌──────────┐
  │ Web Server│
  │ 1.2.3.4   │
  └──────────┘
```

- **Domain Registrar**: 도메인 등록 기관 (Route 53, GoDaddy 등)
- **DNS Records**: A, AAAA, CNAME, NS 등
- **Zone File**: DNS 레코드를 포함하는 파일
- **Name Server**: DNS 쿼리를 해석하는 서버 (Authoritative / Non-Authoritative)
- **TLD (Top Level Domain)**: .com, .org, .gov 등
- **SLD (Second Level Domain)**: amazon.com, google.com 등
- **FQDN (Fully Qualified Domain Name)**: 전체 도메인 이름

### Route 53 특징
- 고가용성, 확장 가능, 완전 관리형 **Authoritative DNS**
- 도메인 등록 기능 (Domain Registrar)
- 리소스 헬스 체크 기능
- **AWS 유일 100% 가용성 SLA** 보장
- 이름 유래: DNS 포트 번호 **53**

### DNS 레코드 타입
| 레코드 | 설명 |
|--------|------|
| **A** | 호스트명 -> IPv4 주소 매핑. 예) `example.com` → `1.2.3.4` |
| **AAAA** | 호스트명 -> IPv6 주소 매핑. 예) `example.com` → `2001:db8::1` (IPv4가 32비트 주소라면 IPv6는 128비트로 훨씬 더 많은 주소를 지원) |
| **CNAME** | 호스트명 -> 다른 호스트명 매핑 (Zone Apex 불가). 예) `www.example.com` → `example.com`. 도메인의 별명(Alias)을 만들 때 사용하지만, 루트 도메인(`example.com` 자체)에는 사용 불가 |
| **NS** | Hosted Zone의 Name Server. "이 도메인의 DNS는 이 서버가 담당한다"고 알려주는 레코드 |

### Hosted Zones
- **Public Hosted Zone**: 인터넷 트래픽 라우팅 (공개 도메인)
- **Private Hosted Zone**: VPC 내부 트래픽 라우팅 (프라이빗 도메인)
- 비용: Hosted Zone당 **$0.50/월**

### TTL (Time To Live)
> **초보자 포인트**: TTL은 "DNS 캐시 유효 시간"이다. 클라이언트(브라우저)가 DNS 조회 결과를 얼마나 오래 기억(캐시)할지 결정한다. TTL이 24시간이면 한 번 조회한 IP를 24시간 동안 기억하므로, 중간에 IP를 바꿔도 최대 24시간까지 이전 IP로 접속할 수 있다. 도메인 이전/변경이 예정되어 있으면 미리 TTL을 낮춰 두어야 빠르게 반영된다.
- **높은 TTL (예: 24시간)**: Route 53 트래픽 감소 → DNS 조회 비용 절감, 단 레코드 변경 시 반영이 느림 (최대 24시간 지연)
- **낮은 TTL (예: 60초)**: Route 53 트래픽 증가(비용 증가), 레코드 변경 시 최대 60초 이내에 전파됨
- **Alias 레코드를 제외**한 모든 DNS 레코드에 TTL 필수

### CNAME vs Alias
> **초보자 포인트**: ALB나 CloudFront 같은 AWS 리소스를 도메인과 연결할 때 CNAME 대신 Alias를 사용하라. 특히 루트 도메인(`example.com`)에는 반드시 Alias를 사용해야 한다. Alias는 AWS 전용 확장 기능으로 CNAME보다 기능이 많고 비용도 무료다.

| 특성 | CNAME | Alias |
|------|-------|-------|
| 대상 | 모든 호스트명 | AWS 리소스만 |
| Zone Apex | **불가** (example.com 불가) | **가능** (example.com 가능) |
| 비용 | 유료 | **무료** |
| 헬스 체크 | 미지원 | **네이티브 지원** |
| TTL 설정 | 가능 | **설정 불가** (AWS가 자동 관리) |
| 레코드 타입 | CNAME | A / AAAA |

### Alias Record 대상
- Elastic Load Balancer
- CloudFront Distribution
- API Gateway
- Elastic Beanstalk
- S3 Website
- VPC Interface Endpoint
- Global Accelerator
- 같은 Hosted Zone의 Route 53 레코드
- **EC2 DNS name에는 Alias 설정 불가**

### 라우팅 정책 (Routing Policies)

```text
[ Routing Policy 비교 ]

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  Simple           Client ──▶ Route 53 ──▶ 단일/다중 값 반환         │
│                              (헬스 체크 불가)                        │
│                                                                     │
│  Weighted         Client ──▶ Route 53 ──┬─ 70% ──▶ Server A        │
│                                         └─ 30% ──▶ Server B        │
│                                                                     │
│  Latency          Client ──▶ Route 53 ──▶ 지연 시간 최소 리전       │
│  (US User)                         ├── us-east-1: 20ms  ✓          │
│                                    └── eu-west-1: 120ms             │
│                                                                     │
│  Failover         Client ──▶ Route 53 ──┬─ Primary  (Health ✓)     │
│  (Active-Passive)                       └─ Secondary (장애 시)      │
│                                                                     │
│  Geolocation      Client ──▶ Route 53 ──┬─ FR User ──▶ Paris       │
│  (위치 기반)                              ├─ DE User ──▶ Frankfurt   │
│                                         └─ 기타     ──▶ Default     │
│                                                                     │
│  Multi-Value      Client ──▶ Route 53 ──▶ 최대 8개 건강한 IP 반환   │
│                              (헬스 체크로 필터링)                     │
└─────────────────────────────────────────────────────────────────────┘
```

#### 1. Simple (단순)
- 단일 리소스로 트래픽 라우팅
- 여러 값 반환 시 클라이언트가 랜덤 선택
- Alias 활성화 시 하나의 AWS 리소스만 지정
- **헬스 체크 연결 불가**

#### 2. Weighted (가중치)
- 각 레코드에 상대적 가중치 할당
- 가중치 합이 100일 필요 없음
- 가중치 0이면 트래픽 중단, 모든 레코드가 0이면 균등 배분
- **헬스 체크 연결 가능**
- 사용 사례: 리전 간 로드 밸런싱, 새 버전 테스트

#### 3. Latency-based (지연 시간 기반)
- 사용자와 AWS 리전 간 지연 시간이 가장 낮은 리소스로 라우팅
- 지연 시간 우선일 때 유용
- **헬스 체크 연결 가능** (장애 조치 기능)

#### 4. Failover (Active-Passive)
- Primary 인스턴스 장애 시 Secondary로 자동 전환
- **헬스 체크 필수** (Primary에)

#### 5. Geolocation (지리적 위치)
- 사용자 **위치 기반** 라우팅 (대륙, 국가, 미국 주)
- 가장 정밀한 위치가 선택됨
- **Default 레코드** 반드시 생성 (매칭 없을 때 대비)
- 사용 사례: 웹사이트 현지화, 콘텐츠 배포 제한
- Latency-based와 다름!

#### 6. Geoproximity (지리적 근접성)
- 사용자와 리소스의 **지리적 위치** 기반 라우팅
- **Bias** 값으로 트래픽 영역 크기 조절
  - 확장: 1 ~ 99 (더 많은 트래픽)
  - 축소: -1 ~ -99 (더 적은 트래픽)
- **Route 53 Traffic Flow** 필수
- AWS 리소스(리전 지정) 또는 비AWS 리소스(위도/경도 지정)

#### 7. IP-based (IP 기반)
- 클라이언트 **IP 주소** 기반 라우팅
- CIDR 목록과 엔드포인트 매핑 제공
- 사용 사례: 특정 ISP 사용자를 특정 엔드포인트로 라우팅

#### 8. Multi-Value Answer
- 여러 리소스로 트래픽 라우팅, 최대 **8개** 건강한 레코드 반환
- **헬스 체크 연결 가능** (건강한 리소스만 반환)
- **ELB의 대체가 아님**

### Health Checks (헬스 체크)

```text
[ Health Check 동작 ]

  ┌──────────────────────────────────────────────────────────┐
  │                   Route 53 Health Checkers                │
  │           (전 세계 약 15개 위치에서 확인)                    │
  │                                                          │
  │  US-East ──┐                                             │
  │  US-West ──┤                                             │
  │  EU ───────┼──── HTTP/HTTPS/TCP ────▶ Public Endpoint    │
  │  APAC ─────┤         요청                  │             │
  │  ...  ─────┘                               │             │
  │                                            ▼             │
  │            18% 이상 Healthy 보고 ──▶ ✓ Healthy            │
  │            18% 미만 Healthy 보고 ──▶ ✗ Unhealthy          │
  └──────────────────────────────────────────────────────────┘

  [ Private Resource Health Check ]

  Route 53 Health Checker (VPC 외부)
         │
         ✗ 직접 접근 불가
         │
         ▼
  ┌──────────────────────────┐      ┌──────────────┐
  │  CloudWatch Alarm         │◀─────│ CloudWatch    │
  │  (Health Check 연결)      │      │ Metric        │
  └──────────────────────────┘      └──────┬───────┘
                                           │ 모니터링
                                    ┌──────┴───────┐
                                    │ Private       │
                                    │ Resource (VPC)│
                                    └──────────────┘
```

- **공개 리소스만** HTTP 헬스 체크 가능
- 3가지 유형:
  1. **엔드포인트 모니터링**: 약 15개 글로벌 헬스 체커가 확인
  2. **Calculated Health Check**: 여러 자식 헬스 체크 결합 (OR, AND, NOT), 최대 256개
  3. **CloudWatch Alarm 모니터링**: 프라이빗 리소스에 유용

#### 엔드포인트 모니터링 상세
- Healthy/Unhealthy 임계값: 3 (기본)
- 간격: 30초 (10초 가능, 추가 비용)
- 지원 프로토콜: HTTP, HTTPS, TCP
- **18% 이상**의 헬스 체커가 정상 보고 시 Healthy
- 응답의 처음 **5120 바이트** 기반 판단 가능
- 2xx, 3xx 상태 코드만 정상

#### 프라이빗 리소스 헬스 체크
- Route 53 헬스 체커는 **VPC 외부**에 위치 -> 프라이빗 엔드포인트 접근 불가
- 해결: **CloudWatch Metric + CloudWatch Alarm + Health Check** 조합

### Route 53 Hybrid DNS
- VPC(Route 53 Resolver)와 온프레미스 네트워크 간 DNS 쿼리 해석
- **Inbound Endpoint**: 온프레미스 DNS -> AWS 리소스 해석
- **Outbound Endpoint**: Route 53 -> 온프레미스 DNS Resolver로 전달
- Direct Connect 또는 AWS VPN을 통한 연결

### Domain Registrar vs DNS Service
- 도메인을 GoDaddy에서 구매하고 Route 53을 DNS 서비스로 사용 가능
- Route 53에서 Hosted Zone 생성 후 3rd party의 NS 레코드를 Route 53 Name Server로 업데이트

## 시험 포인트
- **CNAME은 Zone Apex(example.com)에 사용 불가** -> Alias 사용
- **Alias는 EC2 DNS name에 설정 불가**
- **Alias는 무료**, TTL 설정 불가
- **Geolocation vs Geoproximity**: Geolocation은 사용자 위치 기반, Geoproximity는 bias로 영역 크기 조절
- **Geolocation vs Latency**: Geolocation은 위치 기반, Latency는 지연 시간 기반 (독일 사용자가 미국으로 갈 수 있음)
- **프라이빗 리소스 헬스 체크**: CloudWatch Alarm 활용
- **Failover 정책**: Primary에 반드시 헬스 체크 설정
- **Multi-Value는 ELB 대체 아님**
- **100% SLA**: AWS에서 유일하게 Route 53만 제공
- **Weighted에서 가중치 0**: 해당 리소스로 트래픽 중단

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Route 53 | 100% 가용성 SLA, Authoritative DNS, 도메인 등록 |
| A Record | 호스트명 -> IPv4 |
| AAAA Record | 호스트명 -> IPv6 |
| CNAME | 호스트명 -> 호스트명 (Zone Apex 불가) |
| Alias | 호스트명 -> AWS 리소스 (Zone Apex 가능, 무료, TTL 설정 불가) |
| Simple | 단일/다중 값, 헬스 체크 불가 |
| Weighted | 가중치 기반, 테스트/로드밸런싱 |
| Latency | 최저 지연 시간 리전으로 라우팅 |
| Failover | Active-Passive, 헬스 체크 필수 |
| Geolocation | 사용자 위치 기반, Default 레코드 필요 |
| Geoproximity | Bias로 영역 조절, Traffic Flow 필수 |
| IP-based | 클라이언트 IP/CIDR 기반 |
| Multi-Value | 최대 8개 건강한 레코드, ELB 대체 아님 |
| Resolver Inbound | 온프레미스 -> AWS DNS 해석 |
| Resolver Outbound | AWS -> 온프레미스 DNS 해석 |

---

## Practice Questions

### Q1. A company wants to use its domain name (example.com) to point to an Application Load Balancer. Which Route 53 record type should be used?
**Options:**
- A) CNAME record
- B) A record with Alias enabled
- C) NS record
- D) MX record

**Answer:** B

**해설:**

> **문제:** 회사가 자사의 도메인 이름(example.com)을 Application Load Balancer로 연결하려 한다. 어떤 Route 53 레코드 타입을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | CNAME 레코드 |
| B | Alias가 활성화된 A 레코드 |
| C | NS 레코드 |
| D | MX 레코드 |

**상세 풀이:** example.com은 Zone Apex(루트 도메인)이므로 CNAME 레코드(A)를 사용할 수 없다. CNAME은 Zone Apex에서 사용이 불가능하며 서브도메인(예: www.example.com)에서만 사용 가능하다. Alias Record는 A 또는 AAAA 타입으로 Zone Apex에서도 사용 가능하며, ALB는 Alias 대상으로 지원되는 AWS 리소스이고, 추가로 DNS 쿼리 비용이 무료이다. NS 레코드(C)는 Hosted Zone의 Name Server를 지정하는 레코드로 도메인을 특정 리소스로 연결하는 용도가 아니다. MX 레코드(D)는 메일 서버를 지정하는 레코드로 웹 트래픽 라우팅과는 무관하다.

**핵심 개념:** CNAME vs Alias

---

### Q2. A company is deploying a new version of its application and wants to send 10% of traffic to the new version while keeping 90% on the current version. Which Route 53 routing policy should be used?
**Options:**
- A) Simple routing
- B) Failover routing
- C) Weighted routing
- D) Latency-based routing

**Answer:** C

**해설:**

> **문제:** 회사가 애플리케이션의 새 버전을 배포하고 있으며, 트래픽의 10%를 새 버전으로 보내고 90%는 현재 버전에 유지하려 한다. 어떤 Route 53 라우팅 정책을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Simple 라우팅 |
| B | Failover 라우팅 |
| C | Weighted 라우팅 |
| D | Latency 기반 라우팅 |

**상세 풀이:** Weighted 라우팅 정책은 각 레코드에 상대적 가중치를 할당하여 트래픽 비율을 정밀하게 제어할 수 있다. 새 버전에 가중치 10, 기존 버전에 가중치 90을 설정하면 10%/90% 트래픽 분배가 가능하며, 이는 카나리아 배포나 A/B 테스트에 적합한 방식이다. Simple 라우팅(A)은 여러 값을 반환할 수 있지만 트래픽 비율을 제어하는 기능이 없으며 클라이언트가 랜덤으로 선택한다. Failover 라우팅(B)은 Active-Passive 구성으로 Primary 장애 시에만 Secondary로 전환하는 재해 복구용이다. Latency 기반 라우팅(D)은 사용자와 리전 간 지연 시간을 기준으로 라우팅하므로 트래픽 비율 제어와는 무관하다.

**핵심 개념:** Weighted Routing Policy

---

### Q3. A company has an application deployed in multiple AWS regions. They want to route users to the region that provides the best performance. Which routing policy should be used?
**Options:**
- A) Geolocation routing
- B) Geoproximity routing
- C) Latency-based routing
- D) Weighted routing

**Answer:** C

**해설:**

> **문제:** 회사가 여러 AWS 리전에 애플리케이션을 배포했다. 사용자를 최상의 성능을 제공하는 리전으로 라우팅하려 한다. 어떤 라우팅 정책을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Geolocation 라우팅 |
| B | Geoproximity 라우팅 |
| C | Latency 기반 라우팅 |
| D | Weighted 라우팅 |

**상세 풀이:** Latency-based 라우팅은 사용자와 AWS 리전 간 네트워크 지연 시간을 측정하여 가장 낮은 지연 시간을 제공하는 리전으로 트래픽을 라우팅하므로 "최상의 성능"이라는 요구사항에 가장 정확히 부합한다. Geolocation(A)은 사용자의 지리적 위치(국가, 대륙)를 기반으로 라우팅하며 성능이 아닌 위치 기반이므로, 예를 들어 독일 사용자가 미국 리전에서 더 낮은 지연을 경험할 수 있어도 항상 유럽으로 라우팅될 수 있다. Geoproximity(B)는 지리적 근접성을 기반으로 하며 bias 값으로 영역 크기를 조절하는 기능이지 실제 네트워크 성능을 측정하지 않는다. Weighted(D)는 비율 기반 트래픽 분배이므로 성능 최적화와는 무관하다.

**핵심 개념:** Latency-based Routing Policy

---

### Q4. A company needs to monitor the health of a database running in a private subnet and use it for Route 53 DNS failover. How should this be configured?
**Options:**
- A) Create a Route 53 health check pointing to the private IP of the database
- B) Create a CloudWatch alarm monitoring the database, then create a Route 53 health check that monitors the CloudWatch alarm
- C) Use a Route 53 calculated health check
- D) Enable VPC peering between Route 53 and the VPC

**Answer:** B

**해설:**

> **문제:** 회사가 프라이빗 서브넷에서 실행 중인 데이터베이스의 상태를 모니터링하고 이를 Route 53 DNS 장애 조치에 사용해야 한다. 어떻게 구성해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 데이터베이스의 프라이빗 IP를 가리키는 Route 53 헬스 체크를 생성한다 |
| B | 데이터베이스를 모니터링하는 CloudWatch 알람을 생성한 후, 해당 CloudWatch 알람을 모니터링하는 Route 53 헬스 체크를 생성한다 |
| C | Route 53 Calculated Health Check를 사용한다 |
| D | Route 53과 VPC 간 VPC 피어링을 활성화한다 |

**상세 풀이:** Route 53 헬스 체커는 VPC 외부의 글로벌 위치에서 실행되므로 프라이빗 서브넷의 리소스에 직접 접근할 수 없어 프라이빗 IP로 헬스 체크를 생성하는 것이 불가능하다(A 불가). 올바른 방법은 CloudWatch Metric으로 데이터베이스를 모니터링하고, 이상 시 CloudWatch Alarm을 트리거한 후, Route 53 헬스 체크가 이 CloudWatch Alarm의 상태를 모니터링하도록 구성하는 것이다. Calculated Health Check(C)는 여러 자식 헬스 체크를 AND/OR/NOT으로 결합하는 기능이지 프라이빗 리소스 접근 문제를 해결하지 않는다. VPC 피어링(D)은 VPC 간 네트워크 연결을 위한 것이며, Route 53은 VPC와 피어링할 수 있는 서비스가 아니다.

**핵심 개념:** Private Resource Health Check

---

### Q5. A company has registered a domain with GoDaddy but wants to use Amazon Route 53 to manage DNS records. What steps should they take?
**Options:**
- A) Transfer the domain to Route 53
- B) Create a Hosted Zone in Route 53 and update NS records at GoDaddy to use Route 53 Name Servers
- C) Create CNAME records at GoDaddy pointing to Route 53
- D) It is not possible to use Route 53 with domains registered elsewhere

**Answer:** B

**해설:**

> **문제:** 회사가 GoDaddy에서 도메인을 등록했지만 Amazon Route 53을 사용하여 DNS 레코드를 관리하려 한다. 어떤 단계를 수행해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 도메인을 Route 53으로 이전한다 |
| B | Route 53에서 Hosted Zone을 생성하고 GoDaddy에서 NS 레코드를 Route 53 Name Server로 업데이트한다 |
| C | GoDaddy에서 Route 53을 가리키는 CNAME 레코드를 생성한다 |
| D | Route 53은 다른 곳에서 등록된 도메인과 함께 사용할 수 없다 |

**상세 풀이:** Domain Registrar(도메인 등록 기관)와 DNS Service(DNS 서비스)는 별개의 개념이다. 도메인을 GoDaddy에서 구매한 채로 Route 53에서 Hosted Zone을 생성하고, GoDaddy의 NS(Name Server) 레코드를 Route 53이 제공하는 Name Server 주소로 업데이트하면 DNS 관리를 Route 53에서 할 수 있다. 도메인 이전(A)도 가능하지만 필수가 아니며 불필요한 비용과 시간이 들 수 있다. CNAME 레코드(C)는 DNS 위임(delegation) 방법이 아니며, NS 레코드를 변경하는 것이 올바른 DNS 위임 방식이다. 다른 등록기관에서 등록된 도메인도 Route 53에서 관리할 수 있으므로 D는 완전히 잘못된 정보이다.

**핵심 개념:** Domain Registrar vs DNS Service

---

### Q6. A company wants to restrict content delivery based on the country of the user. They want users in France to be directed to a French server and users in Germany to a German server. All other users should go to a default server. Which routing policy should they use?
**Options:**
- A) Latency-based routing
- B) Geoproximity routing
- C) Geolocation routing
- D) IP-based routing

**Answer:** C

**해설:**

> **문제:** 회사가 사용자의 국가에 따라 콘텐츠 전달을 제한하려 한다. 프랑스 사용자는 프랑스 서버로, 독일 사용자는 독일 서버로 보내고, 나머지 사용자는 기본 서버로 보내려 한다. 어떤 라우팅 정책을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Latency 기반 라우팅 |
| B | Geoproximity 라우팅 |
| C | Geolocation 라우팅 |
| D | IP 기반 라우팅 |

**상세 풀이:** Geolocation 라우팅은 사용자의 지리적 위치(대륙, 국가, 미국 주)를 기반으로 트래픽을 라우팅하며, 프랑스 사용자 -> 프랑스 서버, 독일 사용자 -> 독일 서버, 나머지 -> Default 레코드로 정확히 매핑할 수 있다. Default 레코드를 반드시 생성하여 어느 위치에도 매칭되지 않는 사용자를 처리해야 한다. Latency 기반 라우팅(A)은 네트워크 지연 시간을 기준으로 라우팅하므로 프랑스 사용자가 지연이 낮은 다른 국가 서버로 라우팅될 수 있어 국가별 제한에 부적합하다. Geoproximity(B)는 지리적 근접성과 bias 값을 사용하여 영역 크기를 조절하는 것이므로 정확한 국가 단위 라우팅에는 Geolocation이 더 적합하다. IP 기반(D)은 클라이언트의 CIDR 주소를 기반으로 라우팅하며 국가 단위 라우팅보다는 특정 ISP 사용자 라우팅에 적합하다.

**핵심 개념:** Geolocation Routing Policy

---

### Q7. Which of the following CANNOT be set as an Alias record target in Amazon Route 53?
**Options:**
- A) Application Load Balancer
- B) Amazon CloudFront distribution
- C) Amazon EC2 instance DNS name
- D) Amazon S3 website endpoint

**Answer:** C

**해설:**

> **문제:** 다음 중 Amazon Route 53에서 Alias 레코드 대상으로 설정할 수 없는 것은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Application Load Balancer |
| B | Amazon CloudFront 배포 |
| C | Amazon EC2 인스턴스 DNS 이름 |
| D | Amazon S3 웹사이트 엔드포인트 |

**상세 풀이:** EC2 인스턴스의 DNS 이름은 Alias Record 대상으로 설정할 수 없다. Alias가 지원하는 대상은 ELB, CloudFront, API Gateway, Elastic Beanstalk, S3 Website, VPC Interface Endpoint, Global Accelerator, 같은 Hosted Zone의 Route 53 레코드 등이다. ALB(A)는 Alias 대상으로 지원되며, CloudFront 배포(B)도 Alias 대상이고, S3 웹사이트 엔드포인트(D)도 Alias 대상으로 유효하다. EC2에 트래픽을 보내려면 A 레코드에 EC2의 퍼블릭 IP 주소를 직접 지정하거나, EC2 앞에 로드 밸런서를 배치하고 ALB를 Alias 대상으로 사용해야 한다.

**핵심 개념:** Alias Record Targets

---

### Q8. A company wants to use Route 53 to resolve DNS queries for on-premises resources from within their VPC. The VPC is connected to the on-premises data center via AWS Direct Connect. What should they configure?
**Options:**
- A) Route 53 Resolver Inbound Endpoint
- B) Route 53 Resolver Outbound Endpoint
- C) A Private Hosted Zone
- D) A Public Hosted Zone

**Answer:** B

**해설:**

> **문제:** 회사가 VPC 내에서 온프레미스 리소스에 대한 DNS 쿼리를 해석하기 위해 Route 53을 사용하려 한다. VPC는 AWS Direct Connect를 통해 온프레미스 데이터센터에 연결되어 있다. 무엇을 구성해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Route 53 Resolver Inbound Endpoint |
| B | Route 53 Resolver Outbound Endpoint |
| C | Private Hosted Zone |
| D | Public Hosted Zone |

**상세 풀이:** Outbound Endpoint는 VPC의 Route 53 Resolver에서 온프레미스 DNS Resolver로 DNS 쿼리를 전달(forwarding)하는 역할을 한다. VPC 내에서 온프레미스 리소스의 도메인을 해석해야 하므로, DNS 쿼리가 AWS에서 온프레미스 방향으로 나가는 Outbound 구성이 필요하다. Inbound Endpoint(A)는 반대 방향으로, 온프레미스 네트워크에서 AWS VPC 내부 리소스의 DNS를 해석할 때 사용하며, 온프레미스 DNS Resolver가 Route 53 Resolver로 쿼리를 보내는 진입점이다. Private Hosted Zone(C)은 VPC 내부의 프라이빗 도메인을 관리하는 것이지 온프레미스 리소스 DNS 해석과는 다르다. Public Hosted Zone(D)은 인터넷 공개 도메인을 관리하는 것이므로 온프레미스 프라이빗 리소스 해석에 적합하지 않다.

**핵심 개념:** Route 53 Resolver Endpoints
