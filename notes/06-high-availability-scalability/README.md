# High Availability & Scalability

## 개요
고가용성(HA)과 확장성(Scalability)은 SAA-C03 시험의 핵심 주제이다. ELB(Elastic Load Balancer)와 ASG(Auto Scaling Group)를 통해 구현하며, 로드 밸런서 4가지 타입(CLB, ALB, NLB, GWLB)의 차이와 ASG 스케일링 정책을 정확히 구분해야 한다. 거의 모든 아키텍처 문제에서 등장한다.

## 핵심 개념

### Scalability vs High Availability

| 개념 | 정의 | 방법 | 예시 |
|------|------|------|------|
| **Vertical Scaling** (Scale Up/Down) | 인스턴스 크기 증가 | t2.micro → t2.large | RDS, ElastiCache |
| **Horizontal Scaling** (Scale Out/In) | 인스턴스 수 증가 | ASG, Load Balancer | 웹 앱, 분산 시스템 |
| **High Availability** | 2개 이상 AZ에서 운영 | Multi-AZ ASG/LB | 데이터 센터 장애 대비 |

- Vertical Scaling: t2.nano(0.5G RAM, 1 vCPU) ~ u-12tb1.metal(12.3TB RAM, 448 vCPU)
- HA는 Passive(RDS Multi-AZ) 또는 Active(수평 확장) 방식

### Elastic Load Balancer (ELB)

#### 기본 역할
- 다수의 다운스트림 서버로 트래픽 분산
- 단일 DNS 접근 포인트 노출
- 다운스트림 인스턴스 장애 처리
- **Health Check** 수행 (포트 + 경로, /health 일반적, 200 OK = 정상)
- **SSL Termination (HTTPS)**: 클라이언트와 로드 밸런서 사이는 HTTPS(암호화)로 통신하고, 로드 밸런서에서 SSL 암호화를 해제(Termination)한 뒤 EC2와는 HTTP(평문)로 통신하는 방식. EC2가 암호화/복호화 부담을 지지 않아도 되므로 EC2 자원을 절약할 수 있음
- 쿠키를 통한 **Stickiness(고정성)**: 특정 사용자가 항상 같은 EC2 인스턴스로 연결되도록 고정하는 기능. 예) 쇼핑몰 로그인 세션이 특정 EC2에만 저장되어 있을 때, 요청마다 다른 EC2에 연결되면 로그인이 풀릴 수 있으므로 쿠키로 "이 사용자는 항상 EC2-1로"처럼 고정함. 단, 일부 인스턴스에 트래픽이 집중되어 부하 불균형이 생길 수 있음
- Multi-AZ 고가용성
- Public/Private 트래픽 분리

#### 4가지 로드 밸런서 타입

> **계층(Layer) 개념 설명**
> - **L4 (Layer 4 - 전송 계층)**: TCP/UDP 포트 번호 수준에서 트래픽을 처리. 패킷 내용은 보지 않고 "어떤 포트로 왔는가"만 봄 (예: 80번 포트 = 웹 트래픽)
> - **L7 (Layer 7 - 응용 계층)**: HTTP URL 경로, 헤더, 쿠키 등 내용 수준까지 분석. "어떤 URL인가, 어떤 헤더를 갖고 있는가"를 보고 라우팅 결정 가능
> - **L3 (Layer 3 - 네트워크 계층)**: IP 패킷 단위로 처리. 가장 낮은 수준

| 타입 | 연도 | 계층 | 프로토콜 | 핵심 특징 |
|------|------|------|---------|---------|
| **CLB** (Classic) | 2009 | L4/L7 | HTTP, HTTPS, TCP, SSL | 구세대, SSL 인증서 1개만 |
| **ALB** (Application) | 2016 | **L7** | HTTP, HTTPS, WebSocket | URL/호스트/쿼리 라우팅, 컨테이너 |
| **NLB** (Network) | 2017 | **L4** | TCP, TLS, UDP | 초고성능, 고정 IP, 수백만 RPS |
| **GWLB** (Gateway) | 2020 | **L3** | IP | 3rd party 보안 어플라이언스, GENEVE |

### ALB / NLB / GWLB 동작 구조

```text
ALB (L7 - HTTP/HTTPS)
======================
  ┌──────────┐        ┌─────────────────┐
  │  Client  │──HTTP──▶│      ALB       │
  │          │         │  (Layer 7)     │
  └──────────┘         └───────┬────────┘
                               │ URL/호스트/쿼리 기반 라우팅
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
             ┌───────────┐┌───────────┐┌───────────┐
             │ TG: /users││ TG: /orders││ TG: /api  │
             │ (EC2/ECS) ││ (Lambda)  ││ (IP Addr) │
             └───────────┘└───────────┘└───────────┘

NLB (L4 - TCP/UDP)
===================
  ┌──────────┐        ┌─────────────────┐
  │  Client  │──TCP───▶│      NLB       │
  │          │         │  (Layer 4)     │
  └──────────┘         │ 고정 IP/AZ    │
                       │ Elastic IP     │
                       └───────┬────────┘
                               │ 초저지연, 수백만 RPS
                    ┌──────────┼──────────┐
                    ▼          ▼          ▼
              ┌──────────┐┌──────────┐┌──────────┐
              │   EC2    ││ IP Addr  ││   ALB    │
              │ Instance ││ (Private)││ (조합!)  │
              └──────────┘└──────────┘└──────────┘

GWLB (L3 - IP Packets)
========================
  ┌──────────┐     ┌──────────┐     ┌─────────────────┐
  │  Client  │────▶│  GWLB    │────▶│ 3rd Party       │
  │          │     │ (Layer 3)│     │ Appliance       │
  └──────────┘     │          │     │ (Firewall/IDS)  │
                   │ GENEVE   │     └────────┬────────┘
                   │ Port 6081│              │ 검사 완료
       ┌───────────│          │◀─────────────┘
       │           └──────────┘
       ▼
  ┌──────────┐
  │   App    │  트래픽이 보안 어플라이언스를
  │  Server  │  거쳐서 도달
  └──────────┘
```

### ALB (Application Load Balancer) 상세

#### 라우팅 규칙
- **URL 경로**: example.com/users, example.com/posts
- **호스트명**: one.example.com, other.example.com
- **쿼리 스트링/헤더**: example.com/users?id=123

#### Target Groups
- EC2 인스턴스 (ASG 관리 가능)
- ECS Tasks
- Lambda 함수 (HTTP → JSON 이벤트)
- **IP 주소** (Private IP만)
- 여러 Target Group으로 라우팅 가능
- Health Check는 Target Group 수준

#### 주요 특성
- 고정 호스트명: XXX.region.elb.amazonaws.com
- 클라이언트 IP → **X-Forwarded-For** 헤더에 삽입
  - 왜 필요한가? ALB는 클라이언트의 요청을 대신 받아 EC2로 전달하므로, EC2 입장에서 요청의 "발신자 IP"는 클라이언트가 아닌 ALB의 IP로 보임. 실제 클라이언트 IP를 알고 싶으면 ALB가 HTTP 헤더에 삽입해 주는 `X-Forwarded-For` 값을 읽어야 함. 예) 클라이언트(1.2.3.4) → ALB → EC2: EC2가 받는 IP는 ALB IP이지만, `X-Forwarded-For: 1.2.3.4` 헤더에서 원본 클라이언트 IP 확인 가능
- 포트 → X-Forwarded-Port, 프로토콜 → X-Forwarded-Proto
- 마이크로서비스/컨테이너 기반 앱에 최적

### NLB (Network Load Balancer) 상세
- **AZ당 하나의 고정 IP** (Elastic IP 할당 지원)
- 수백만 RPS 처리, 초저지연
- TCP/UDP 트래픽에 최적
- Target Groups: EC2 인스턴스, IP 주소, **ALB**
- Health Check: TCP, HTTP, HTTPS 프로토콜

### GWLB (Gateway Load Balancer) 상세
- 3rd party 네트워크 가상 어플라이언스 관리
- Firewall, IDS/IPS, Deep Packet Inspection 등
- **Layer 3 (Network Layer)** - IP 패킷
- **Transparent Network Gateway** + **Load Balancer** 결합
- **GENEVE 프로토콜, 포트 6081**
- Target Groups: EC2 인스턴스, IP 주소 (Private IP)

### Sticky Sessions (Session Affinity)
- 같은 클라이언트를 같은 인스턴스로 지속 연결
- CLB, ALB, NLB에서 지원
- 쿠키의 만료 시간 제어 가능
- **주의: 부하 불균형 발생 가능**

#### 쿠키 종류
| 유형 | 생성자 | 쿠키 이름 |
|------|--------|---------|
| Custom Cookie | 타겟(앱) | 사용자 지정 (AWSALB, AWSALBAPP, AWSALBTG 사용 불가) |
| Application Cookie | 로드 밸런서 | AWSALBAPP |
| Duration-based Cookie | 로드 밸런서 | AWSALB (ALB), AWSELB (CLB) |

### Cross-Zone Load Balancing

```text
Cross-Zone Load Balancing 비교
===============================

  ── Cross-Zone 비활성화 ─────────────────────────
  Client 트래픽: 50%         50%
                  │            │
          ┌───── AZ-1 ─────┐ ┌───── AZ-2 ─────┐
          │  LB Node       │ │  LB Node       │
          │   50% ÷ 4      │ │   50% ÷ 1      │
          │                 │ │                 │
          │ ┌──┐┌──┐┌──┐┌──┐│ │    ┌──┐        │
          │ │12││12││12││12││ │    │50│ ← 불균형!│
          │ │% ││% ││% ││% ││ │    │% │        │
          │ └──┘└──┘└──┘└──┘│ │    └──┘        │
          └─────────────────┘ └────────────────┘

  ── Cross-Zone 활성화 ──────────────────────────
  Client 트래픽: 50%         50%
                  │            │
          ┌───── AZ-1 ─────┐ ┌───── AZ-2 ─────┐
          │  LB Node ◀─────────▶ LB Node       │
          │    AZ 간 균등 분배                   │
          │                 │ │                 │
          │ ┌──┐┌──┐┌──┐┌──┐│ │    ┌──┐        │
          │ │20││20││20││20││ │    │20│ ← 균등! │
          │ │% ││% ││% ││% ││ │    │% │        │
          │ └──┘└──┘└──┘└──┘│ │    └──┘        │
          └─────────────────┘ └────────────────┘

  기본 설정 요약:
  ┌──────────┬────────────────┬──────────────┐
  │   타입   │   기본 설정     │ AZ 간 비용   │
  ├──────────┼────────────────┼──────────────┤
  │   ALB    │ 활성화 (기본ON) │    무료      │
  │ NLB/GWLB │ 비활성화       │    유료      │
  │   CLB    │ 비활성화       │    무료      │
  └──────────┴────────────────┴──────────────┘
```

| 설정 | 동작 |
|------|------|
| **활성화** | 모든 AZ의 모든 인스턴스에 균등 분배 |
| **비활성화** | 각 LB 노드가 자신의 AZ 내 인스턴스에만 분배 |

| 로드 밸런서 | 기본 설정 | AZ 간 데이터 비용 |
|------------|---------|----------------|
| **ALB** | **기본 활성화** (TG 레벨에서 비활성화 가능) | 무료 |
| **NLB / GWLB** | **기본 비활성화** | 유료 |
| **CLB** | **기본 비활성화** | 무료 |

### SSL/TLS 인증서

#### 기본 개념
- 클라이언트 ↔ 로드 밸런서 간 전송 중 암호화
- **X.509 인증서** 사용
- **ACM (AWS Certificate Manager)** 으로 관리
- HTTPS 리스너: 기본 인증서 필수, 다중 도메인용 추가 인증서 가능

#### SNI (Server Name Indication)
- 하나의 웹 서버에 여러 SSL 인증서 로딩 문제 해결
- 클라이언트가 초기 SSL 핸드셰이크에서 호스트명 지정
- **ALB, NLB, CloudFront에서만 지원**
- **CLB에서는 미지원** (CLB당 1개 SSL 인증서)

| 로드 밸런서 | SSL 인증서 | SNI |
|------------|----------|-----|
| CLB | 1개만 | 미지원 |
| ALB | 다수 (멀티 리스너) | 지원 |
| NLB | 다수 (멀티 리스너) | 지원 |

### Connection Draining / Deregistration Delay
- **CLB**: Connection Draining
- **ALB/NLB**: Deregistration Delay
- 인스턴스 등록 해제 또는 비정상 시, **진행 중인 요청 완료 대기** 시간
- 새 요청은 다른 인스턴스로 전송
- **1~3600초** (기본 300초)
- 비활성화 가능 (0으로 설정)
- 짧은 요청 → 낮은 값 권장

### Auto Scaling Group (ASG)

```text
ASG 스케일링 전체 흐름
=======================

  ┌─── CloudWatch Metrics ───────────────────────┐
  │  CPUUtilization, RequestCountPerTarget,       │
  │  NetworkIn/Out, Custom Metrics                │
  └──────────────────┬───────────────────────────┘
                     │ 메트릭 모니터링
                     ▼
  ┌─── CloudWatch Alarm ────────────────────────┐
  │  예: CPU > 70% (Scale Out 알람)              │
  │  예: CPU < 30% (Scale In 알람)               │
  └──────────────────┬──────────────────────────┘
                     │ 알람 트리거
                     ▼
  ┌─── Auto Scaling Group ──────────────────────────────────┐
  │                                                          │
  │  Min: 2    Desired: 3    Max: 6                         │
  │                                                          │
  │  Launch Template:                                        │
  │  ┌──────────────────────────────────┐                   │
  │  │ AMI, Instance Type, SG, Key Pair │                   │
  │  │ User Data, IAM Role, EBS, ...    │                   │
  │  └──────────────────────────────────┘                   │
  │                                                          │
  │  ┌─── AZ-1a ──────┐  ┌─── AZ-1b ──────┐               │
  │  │  ┌──┐  ┌──┐    │  │  ┌──┐          │               │
  │  │  │i1│  │i2│    │  │  │i3│   ← 현재 │               │
  │  │  └──┘  └──┘    │  │  └──┘     3개   │               │
  │  └────────────────┘  └────────────────┘               │
  │                                                          │
  │  Scale Out (CPU>70%)   Scale In (CPU<30%)               │
  │  → i4 추가 생성         → i3 제거                        │
  │  → LB에 자동 등록       → LB에서 자동 해제               │
  │                                                          │
  │  Cooldown: 300초 (스케일링 후 안정화 대기)                │
  └──────────────────────────────────────────────────────────┘
                     │
                     ▼
  ┌─── Load Balancer ───────────────────┐
  │  Health Check → 비정상 인스턴스      │
  │  자동 교체 요청 → ASG로 전달        │
  └─────────────────────────────────────┘
```

#### 기본 개념
- 증가된 부하에 맞춰 **Scale Out** (인스턴스 추가)
- 감소된 부하에 맞춰 **Scale In** (인스턴스 제거)
- 최소/최대 인스턴스 수 보장
- 새 인스턴스 자동으로 LB에 등록
- 비정상 인스턴스 자동 교체
- **ASG 자체는 무료** (EC2 인스턴스 비용만 발생)

#### Launch Template
- AMI + Instance Type
- EC2 User Data
- EBS Volumes
- Security Groups
- SSH Key Pair
- IAM Roles
- Network + Subnets
- Load Balancer 정보

#### Scaling Policies

| 정책 | 설명 |
|------|------|
| **Target Tracking** | 목표 메트릭 유지 (예: 평균 CPU 40%) |
| **Simple/Step Scaling** | CloudWatch 알람 기반 (CPU > 70% → 2개 추가) |
| **Scheduled Scaling** | 예약 기반 (금요일 5pm에 최소 10개로 증가) |
| **Predictive Scaling** | 부하 예측 및 사전 스케일링 예약 |

#### 스케일링 메트릭
- **CPUUtilization**: 평균 CPU 사용률
- **RequestCountPerTarget**: EC2당 요청 수
- **Average Network In/Out**: 네트워크 바운드 앱
- **Custom Metric**: CloudWatch 커스텀 메트릭

#### Scaling Cooldown
- 스케일링 활동 후 **기본 300초** 쿨다운
- 쿨다운 동안 추가 인스턴스 시작/종료 없음 (메트릭 안정화 대기)
- **Ready-to-use AMI** 사용 → 설정 시간 단축 → 쿨다운 기간 단축 가능

## 시험 포인트
- **ALB = L7 (HTTP), NLB = L4 (TCP/UDP), GWLB = L3 (IP)**
- ALB: URL/호스트/쿼리 기반 라우팅, 마이크로서비스/컨테이너에 최적
- NLB: 고정 IP (Elastic IP), 초고성능, 수백만 RPS
- GWLB: 3rd party 보안 어플라이언스, GENEVE 포트 6081
- **SNI: ALB/NLB/CloudFront만 지원** (CLB 미지원)
- **Cross-Zone LB: ALB 기본 활성화(무료), NLB/GWLB 기본 비활성화(유료)**
- Sticky Session 활성화 시 부하 불균형 가능성
- Connection Draining 기본 300초, 0으로 비활성화 가능
- ASG Scaling: Target Tracking이 가장 간단, Predictive는 예측 기반
- ASG Cooldown 기본 300초, AMI 최적화로 단축 가능
- **X-Forwarded-For**: ALB에서 클라이언트 원본 IP 전달
- NLB Target Group에 ALB를 넣을 수 있음 (고정 IP + L7 라우팅 조합)

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| ALB | L7, HTTP 라우팅, 마이크로서비스, SNI 지원 |
| NLB | L4, TCP/UDP, 고정 IP, 초고성능 |
| GWLB | L3, IP 패킷, 보안 어플라이언스, GENEVE 6081 |
| CLB | 구세대, SSL 1개, SNI 미지원 |
| Cross-Zone LB | ALB 기본 ON(무료), NLB/GWLB 기본 OFF(유료) |
| SNI | ALB/NLB/CloudFront만, 다중 SSL 인증서 |
| Sticky Session | 세션 유지, 부하 불균형 주의 |
| Deregistration Delay | 진행 중 요청 완료 대기, 기본 300초 |
| ASG Launch Template | AMI, 인스턴스 타입, SG, 키 페어 등 정의 |
| Target Tracking | 목표 메트릭 자동 유지 (가장 간편) |
| Predictive Scaling | ML 기반 부하 예측 및 사전 스케일링 |
| Cooldown | 스케일링 후 300초 대기, 메트릭 안정화 |

---

## Practice Questions

### Q1. A company needs to route HTTP traffic to different microservices based on the URL path. For example, /api/users should go to the user service and /api/orders should go to the order service. Which load balancer should they use?
**Options:**
- A) Classic Load Balancer
- B) Network Load Balancer
- C) Application Load Balancer
- D) Gateway Load Balancer

**Answer:** C

**해설:**

> **문제:** 한 회사가 URL 경로에 따라 HTTP 트래픽을 다른 마이크로서비스로 라우팅해야 한다. 예를 들어, /api/users는 사용자 서비스로, /api/orders는 주문 서비스로 보내야 한다. 어떤 로드 밸런서를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Classic Load Balancer |
| B | Network Load Balancer |
| C | Application Load Balancer |
| D | Gateway Load Balancer |

**(A)** : CLB(Classic Load Balancer)는 구세대 로드 밸런서로 URL 경로 기반 라우팅을 지원하지 않는다. 마이크로서비스 아키텍처에는 부적합하다.

**(B)** : NLB(Network Load Balancer)는 L4(TCP/UDP)에서 동작하므로 HTTP URL 경로를 기반으로 라우팅할 수 없다. 고성능 TCP/UDP 트래픽 처리에 최적화되어 있다. → [📖 NLB Network Load Balancer 상세](/section/06-high-availability-scalability#nlb-network-load-balancer-상세)

**(C) 정답** : ALB(Application Load Balancer)는 L7에서 동작하며 URL 경로, 호스트명, 쿼리 스트링 기반 라우팅을 지원한다. /api/users, /api/orders와 같은 경로 기반 라우팅에 최적이다. → [📖 ALB Application Load Balancer 상세](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

**(D)** : GWLB(Gateway Load Balancer)는 L3에서 동작하며 3rd party 보안 어플라이언스(Firewall, IDS/IPS)로 트래픽을 전달하는 용도이다. URL 경로 기반 라우팅과는 무관하다. → [📖 GWLB Gateway Load Balancer 상세](/section/06-high-availability-scalability#gwlb-gateway-load-balancer-상세)

**핵심 개념:** ALB - URL Path 기반 라우팅

**관련 노트:** [ALB Application Load Balancer 상세](/section/06-high-availability-scalability#alb-application-load-balancer-상세), [ALB / NLB / GWLB 동작 구조](/section/06-high-availability-scalability#alb-nlb-gwlb-동작-구조)

### Q2. A company requires a load balancer with a static IP address per Availability Zone for whitelisting purposes. The application handles millions of requests per second. Which load balancer should they choose?
**Options:**
- A) Application Load Balancer
- B) Classic Load Balancer
- C) Network Load Balancer
- D) Gateway Load Balancer

**Answer:** C

**해설:**

> **문제:** 한 회사가 화이트리스팅 목적으로 Availability Zone당 고정 IP 주소를 가진 로드 밸런서가 필요하다. 애플리케이션은 초당 수백만 건의 요청을 처리한다. 어떤 로드 밸런서를 선택해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Application Load Balancer |
| B | Classic Load Balancer |
| C | Network Load Balancer |
| D | Gateway Load Balancer |

**(A)** : ALB는 고정 호스트명(DNS)은 제공하지만 고정 IP를 제공하지 않는다. IP 화이트리스팅 요구사항에 부적합하다.

**(B)** : CLB도 고정 IP를 제공하지 않으며 구세대 로드 밸런서이다. 수백만 RPS 처리 성능도 NLB에 비해 부족하다.

**(C) 정답** : NLB(Network Load Balancer)는 AZ당 하나의 고정 IP를 제공하며 Elastic IP 할당을 지원한다. 수백만 RPS를 초저지연으로 처리할 수 있어 고정 IP + 고성능 두 요구사항을 모두 충족한다. → [📖 NLB Network Load Balancer 상세](/section/06-high-availability-scalability#nlb-network-load-balancer-상세)

**(D)** : GWLB는 보안 어플라이언스용으로 애플리케이션 로드 밸런싱 용도가 아니다. IP 화이트리스팅 및 고성능 요구사항과는 무관하다.

**핵심 개념:** NLB - Static IP, Elastic IP

**관련 노트:** [NLB Network Load Balancer 상세](/section/06-high-availability-scalability#nlb-network-load-balancer-상세)

### Q3. An application is deployed behind an Application Load Balancer. The application needs to get the real IP address of the client. How can it obtain this information?
**Options:**
- A) From the source IP of the incoming request
- B) From the X-Forwarded-For header
- C) From the Host header
- D) From the ALB access logs only

**Answer:** B

**해설:**

> **문제:** Application Load Balancer 뒤에 배포된 애플리케이션이 클라이언트의 실제 IP 주소를 얻어야 한다. 이 정보를 어떻게 얻을 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 수신 요청의 소스 IP에서 |
| B | X-Forwarded-For 헤더에서 |
| C | Host 헤더에서 |
| D | ALB 접근 로그에서만 |

**(A)** : 수신 요청의 소스 IP는 ALB의 Private IP이다. ALB가 클라이언트와의 연결을 종료하고 새 연결을 백엔드로 생성하므로 실제 클라이언트 IP를 확인할 수 없다.

**(B) 정답** : ALB는 원본 클라이언트 IP를 X-Forwarded-For 헤더에 삽입한다. 애플리케이션은 이 헤더를 읽어 실제 클라이언트 IP를 확인할 수 있다. → [📖 ALB Application Load Balancer 상세](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

**(C)** : Host 헤더는 요청된 도메인명 정보를 포함하지 IP 주소가 아니다. 클라이언트 IP 확인에는 사용할 수 없다.

**(D)** : ALB 접근 로그는 사후 분석용이다. 실시간 요청 처리 중에 애플리케이션이 참조하기에는 부적합하다.

**핵심 개념:** ALB - X-Forwarded-For

**관련 노트:** [ALB Application Load Balancer 상세](/section/06-high-availability-scalability#alb-application-load-balancer-상세)

### Q4. A company needs to inspect all network traffic entering their VPC using third-party security appliances before it reaches the application. Which AWS service should they use?
**Options:**
- A) Application Load Balancer with AWS WAF
- B) Network Load Balancer with Security Groups
- C) Gateway Load Balancer
- D) AWS Network Firewall

**Answer:** C

**해설:**

> **문제:** 한 회사가 VPC에 들어오는 모든 네트워크 트래픽을 애플리케이션에 도달하기 전에 서드파티 보안 어플라이언스를 사용하여 검사해야 한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS WAF를 사용한 Application Load Balancer |
| B | Security Group을 사용한 Network Load Balancer |
| C | Gateway Load Balancer |
| D | AWS Network Firewall |

**(A)** : ALB + WAF는 L7(HTTP/HTTPS) 수준의 웹 방화벽이다. 서드파티 보안 어플라이언스를 통한 트래픽 검사가 아니며 IP 패킷 수준의 전체 트래픽 검사에는 부적합하다.

**(B)** : NLB + Security Group은 트래픽을 보안 어플라이언스로 전달하는 기능이 없다. Security Group은 방화벽 규칙이지 트래픽을 3rd party 어플라이언스로 라우팅하는 기능이 아니다.

**(C) 정답** : GWLB(Gateway Load Balancer)는 L3에서 동작하며 Firewall, IDS/IPS, Deep Packet Inspection 등 3rd party 보안 어플라이언스로 트래픽을 전달하고 분산한다. GENEVE 프로토콜(포트 6081)을 사용하며 모든 트래픽의 단일 진입/출구점을 제공한다. → [📖 GWLB Gateway Load Balancer 상세](/section/06-high-availability-scalability#gwlb-gateway-load-balancer-상세)

**(D)** : AWS Network Firewall은 AWS 자체 관리형 방화벽 서비스이다. 서드파티 보안 어플라이언스를 사용하는 것이 아니므로 요구사항과 다르다.

**핵심 개념:** Gateway Load Balancer

**관련 노트:** [GWLB Gateway Load Balancer 상세](/section/06-high-availability-scalability#gwlb-gateway-load-balancer-상세)

### Q5. Which of the following statements about Cross-Zone Load Balancing is correct?
**Options:**
- A) It is enabled by default for NLB and charges apply for inter-AZ data
- B) It is enabled by default for ALB with no charges for inter-AZ data
- C) It is enabled by default for all load balancer types
- D) It is disabled by default for ALB and charges apply for inter-AZ data

**Answer:** B

**해설:**

> **문제:** Cross-Zone Load Balancing에 대한 다음 설명 중 올바른 것은?

| 선지 | 번역 |
|------|------|
| A | NLB에서 기본 활성화되며 AZ 간 데이터 비용이 발생한다 |
| B | ALB에서 기본 활성화되며 AZ 간 데이터 비용이 없다 |
| C | 모든 로드 밸런서 타입에서 기본 활성화된다 |
| D | ALB에서 기본 비활성화되며 AZ 간 데이터 비용이 발생한다 |

**(A)** : NLB/GWLB는 Cross-Zone Load Balancing이 기본 비활성화이며, 활성화 시 AZ 간 데이터 비용이 발생한다. 기본 활성화라는 설명은 틀렸다.

**(B) 정답** : Cross-Zone Load Balancing은 ALB에서 기본 활성화되며 AZ 간 데이터 전송 비용이 없다. 올바른 설명이다. → [📖 Cross-Zone Load Balancing](/section/06-high-availability-scalability#crosszone-load-balancing)

**(C)** : 모든 로드 밸런서 타입에서 기본 활성화되는 것이 아니다. ALB만 기본 활성화이고, NLB/GWLB/CLB는 기본 비활성화이다.

**(D)** : ALB는 실제로 기본 활성화이며 AZ 간 데이터 비용도 무료이다. 기본 비활성화에 비용 발생이라는 설명은 완전히 틀렸다.

**핵심 개념:** Cross-Zone Load Balancing

**관련 노트:** [Cross-Zone Load Balancing](/section/06-high-availability-scalability#crosszone-load-balancing)

### Q6. A web application needs to maintain user session state across multiple requests. The application is behind an ALB. Which feature should be enabled?
**Options:**
- A) Cross-Zone Load Balancing
- B) Connection Draining
- C) Sticky Sessions
- D) Health Checks

**Answer:** C

**해설:**

> **문제:** 웹 애플리케이션이 여러 요청에 걸쳐 사용자 세션 상태를 유지해야 한다. 애플리케이션은 ALB 뒤에 있다. 어떤 기능을 활성화해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Cross-Zone Load Balancing |
| B | Connection Draining |
| C | Sticky Sessions |
| D | Health Checks |

**(A)** : Cross-Zone Load Balancing은 AZ 간 트래픽을 균등 분배하는 기능이다. 세션 유지와는 관련이 없으며, 오히려 다른 AZ의 인스턴스로 요청이 분산될 수 있다.

**(B)** : Connection Draining(Deregistration Delay)은 인스턴스 해제 시 진행 중인 요청을 완료하기 위한 기능이다. 세션 유지 기능이 아니다.

**(C) 정답** : Sticky Sessions(Session Affinity)는 같은 클라이언트를 항상 같은 인스턴스로 라우팅하여 세션 데이터를 유지한다. ALB에서 쿠키 기반으로 구현되며, 단 부하 불균형이 발생할 수 있음에 주의해야 한다. → [📖 Sticky Sessions Session Affinity](/section/06-high-availability-scalability#sticky-sessions-session-affinity)

**(D)** : Health Check는 인스턴스 정상 여부를 확인하는 기능이다. 세션 유지와는 무관하다.

**핵심 개념:** Sticky Sessions

**관련 노트:** [Sticky Sessions Session Affinity](/section/06-high-availability-scalability#sticky-sessions-session-affinity)

### Q7. An Auto Scaling Group needs to automatically scale out when the average CPU utilization exceeds 70% and scale in when it drops below 30%. Which scaling policy should be used?
**Options:**
- A) Target Tracking Scaling
- B) Simple/Step Scaling
- C) Scheduled Scaling
- D) Predictive Scaling

**Answer:** B

**해설:**

> **문제:** Auto Scaling Group이 평균 CPU 사용률이 70%를 초과하면 자동으로 Scale Out하고 30% 미만으로 떨어지면 Scale In해야 한다. 어떤 스케일링 정책을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Target Tracking Scaling |
| B | Simple/Step Scaling |
| C | Scheduled Scaling |
| D | Predictive Scaling |

**(A)** : Target Tracking은 특정 목표값(예: CPU 40%)을 유지하도록 자동 조절하는 방식이다. 상한(70%)과 하한(30%)을 별도로 지정하는 방식이 아니다.

**(B) 정답** : Simple/Step Scaling은 CloudWatch 알람을 기반으로 특정 임계값 초과/미만 시 지정된 수만큼 인스턴스를 추가/제거한다. CPU > 70%와 CPU < 30%이라는 별도 임계값을 지정하는 요구사항에 적합하다. → [📖 Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(C)** : Scheduled Scaling은 미리 정해진 시간에 용량을 조절하는 예약 기반 방식이다. CPU 임계값에 반응하는 동적 스케일링이 아니다.

**(D)** : Predictive Scaling은 과거 패턴을 ML로 분석하여 미래 부하를 예측하고 사전에 스케일링을 수행한다. 실시간 메트릭 임계값에 반응하는 방식이 아니다.

**핵심 개념:** ASG - Simple/Step Scaling

**관련 노트:** [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

### Q8. A company wants to use multiple SSL certificates on a single Application Load Balancer to serve traffic for different domains. Which feature makes this possible?
**Options:**
- A) SSL Termination
- B) Server Name Indication (SNI)
- C) Cross-Zone Load Balancing
- D) Connection Draining

**Answer:** B

**해설:**

> **문제:** 한 회사가 서로 다른 도메인의 트래픽을 처리하기 위해 단일 Application Load Balancer에서 여러 SSL 인증서를 사용하려 한다. 이를 가능하게 하는 기능은?

| 선지 | 번역 |
|------|------|
| A | SSL Termination |
| B | Server Name Indication (SNI) |
| C | Cross-Zone Load Balancing |
| D | Connection Draining |

**(A)** : SSL Termination은 로드 밸런서에서 SSL/TLS 연결을 종료하는 일반적인 기능이다. 여러 SSL 인증서를 지원하는 기능이 아니라 암호화 처리를 로드 밸런서에서 담당하는 것이다.

**(B) 정답** : SNI(Server Name Indication)는 클라이언트가 SSL 핸드셰이크 시 타겟 호스트명을 지정하여 하나의 로드 밸런서에서 여러 SSL 인증서를 사용할 수 있게 한다. ALB와 NLB에서 지원되며 CLB에서는 지원되지 않는다. → [📖 SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)

**(C)** : Cross-Zone Load Balancing은 AZ 간 트래픽을 균등 분배하는 기능이다. SSL 인증서와는 무관하다.

**(D)** : Connection Draining은 인스턴스 해제 시 진행 중인 요청 완료를 대기하는 기능이다. SSL 인증서와는 무관하다.

**핵심 개념:** SNI - Server Name Indication

**관련 노트:** [SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)