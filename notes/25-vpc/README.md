# VPC (Virtual Private Cloud)

## 개요
VPC는 AWS에서 가장 중요한 네트워킹 서비스로, SAA-C03 시험에서 매우 높은 비중을 차지한다. VPC 내의 서브넷, 라우팅, 보안 그룹, NACL, VPC Peering, VPN, Direct Connect, Transit Gateway 등 전체 네트워킹 아키텍처를 이해해야 한다.

## 핵심 개념

### CIDR (Classless Inter-Domain Routing, 사이더)
- IP 주소 범위를 정의하는 방법 (예: `10.0.0.0/16` — "이 범위의 IP를 우리 네트워크로 사용")
- 구성요소: **Base IP** (시작 IP) + **Subnet Mask** (슬래시 뒤 숫자)
- **슬래시(/) 뒤 숫자의 의미**: IP 주소 32비트 중 몇 비트를 "고정"할지를 나타냄
  - 숫자가 **클수록** 고정 비트가 많아 IP 개수가 **적고**, 숫자가 **작을수록** 더 많은 IP를 포함
  - `/32`: 32비트 모두 고정 → IP 1개만 (특정 서버 1대를 정확히 지정)
  - `/24`: 앞 24비트 고정 → 마지막 8비트가 자유 → 2⁸ = 256개 IP
  - `/16`: 앞 16비트 고정 → 마지막 16비트가 자유 → 2¹⁶ = 65,536개 IP
  - `/0`: 고정 비트 없음 → 모든 IP (인터넷 전체)
- 서브넷 마스크 요약:
  - `/32` = IP 1개 (변경 불가)
  - `/24` = 256개 IP (마지막 옥텟 변경)
  - `/16` = 65,536개 IP (마지막 2개 옥텟 변경)
  - `/8` = 마지막 3개 옥텟 변경
  - `/0` = 모든 IP

### Private IP 범위
- `10.0.0.0/8` - 대규모 네트워크용
- `172.16.0.0/12` - AWS 기본 VPC 범위
- `192.168.0.0/16` - 가정용 네트워크 등

### VPC 전체 구조

```text
┌──────────────────── Region ─────────────────────────────────────┐
│                                                                  │
│  ┌──────────────── VPC (10.0.0.0/16) ────────────────────────┐  │
│  │                                                            │  │
│  │         ┌──── Internet Gateway (IGW) ────┐                │  │
│  │         └──────────┬─────────────────────┘                │  │
│  │                    │                                       │  │
│  │    ┌── AZ-a ───────┼──────────────────────────────┐       │  │
│  │    │               │                              │       │  │
│  │    │  ┌─ Public Subnet (10.0.1.0/24) ──────────┐ │       │  │
│  │    │  │  Route: 0.0.0.0/0 → IGW                │ │       │  │
│  │    │  │  ┌──────┐  ┌───────────┐               │ │       │  │
│  │    │  │  │ EC2  │  │ NAT GW    │               │ │       │  │
│  │    │  │  └──────┘  └─────┬─────┘               │ │       │  │
│  │    │  │   [NACL]─────────│──────────[NACL]      │ │       │  │
│  │    │  └──────────────────│─────────────────────┘ │       │  │
│  │    │                     │                        │       │  │
│  │    │  ┌─ Private Subnet (10.0.2.0/24) ─────────┐ │       │  │
│  │    │  │  Route: 0.0.0.0/0 → NAT GW            │ │       │  │
│  │    │  │  ┌──────┐  ┌──────┐                    │ │       │  │
│  │    │  │  │ EC2  │  │ RDS  │                    │ │       │  │
│  │    │  │  │ [SG] │  │ [SG] │                    │ │       │  │
│  │    │  │  └──────┘  └──────┘                    │ │       │  │
│  │    │  │   [NACL]────────────────────[NACL]      │ │       │  │
│  │    │  └────────────────────────────────────────┘ │       │  │
│  │    └──────────────────────────────────────────────┘       │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

  * SG = Security Group (인스턴스 레벨, Stateful)
  * NACL = Network ACL (서브넷 레벨, Stateless)
  * IGW: VPC와 1:1 매핑, 인터넷 연결
  * NAT GW: 프라이빗 서브넷 → 인터넷 (아웃바운드만)
```

### VPC 기본 사항
- 리전당 최대 **5개 VPC** (소프트 리밋)
- VPC당 최대 **5개 CIDR** 블록
- CIDR 최소 크기: `/28` (16개 IP)
- CIDR 최대 크기: `/16` (65,536개 IP)
- VPC는 Private IPv4 범위만 허용
- **VPC CIDR은 다른 네트워크(예: 기업 네트워크)와 겹치면 안 됨**

### Default VPC
- 모든 새 AWS 계정에 기본 VPC가 존재
- 기본 VPC 내 EC2 인스턴스는 퍼블릭 IPv4 주소를 가짐
- 인터넷 연결이 기본 제공됨

### 서브넷 (Subnet)
- 서브넷은 AZ에 종속됨
- **AWS는 각 서브넷에서 5개 IP를 예약** (처음 4개 + 마지막 1개):
  - `.0` - 네트워크 주소
  - `.1` - VPC 라우터용
  - `.2` - Amazon DNS 매핑용
  - `.3` - 향후 사용 예약
  - 마지막 IP - 브로드캐스트 주소 (AWS는 브로드캐스트 미지원)
- **시험 팁**: 29개 IP가 필요하면 `/27`(32-5=27)이 아닌 `/26`(64-5=59)을 선택해야 함

### Internet Gateway (IGW)
- VPC 내 리소스가 인터넷에 연결할 수 있도록 함
- 수평 확장, 고가용성, 이중화
- VPC와 별도로 생성해야 함
- **1 VPC = 1 IGW** (1:1 관계)
- IGW만으로는 인터넷 접근 불가 - **라우트 테이블 편집 필수**

### Bastion Host
- 퍼블릭 서브넷에 위치한 EC2 인스턴스
- 프라이빗 서브넷의 EC2에 SSH 접속하기 위한 중간 호스트
- Bastion Host SG: 인터넷에서 포트 22 인바운드 허용 (제한된 CIDR)
- 프라이빗 EC2 SG: Bastion Host의 SG 또는 프라이빗 IP 허용

### NAT Instance (레거시, 시험에 출제)
- 프라이빗 서브넷의 EC2가 인터넷에 연결할 수 있게 해줌
- **퍼블릭 서브넷**에 배치해야 함
- **Source/Destination Check를 비활성화**해야 함
- Elastic IP 연결 필요
- 보안 그룹 관리 필요
- 고가용성이 아님 (직접 ASG + multi-AZ 구성 필요)
- 대역폭은 EC2 인스턴스 타입에 의존

### NAT Gateway
> **왜 필요한가?** — 프라이빗 서브넷의 서버는 인터넷에 직접 연결되지 않는다(보안상). 하지만 OS 업데이트나 소프트웨어 다운로드를 위해 인터넷에 나가야 할 때가 있다. NAT Gateway는 "프라이빗 서브넷 서버가 인터넷으로 아웃바운드 요청을 할 수 있게 해주는 중간 관문" 역할을 하되, 외부에서 먼저 들어오는 인바운드 연결은 차단한다.
> 비유: 건물 안의 직원(프라이빗 EC2)이 밖에 전화는 걸 수 있지만(아웃바운드), 외부에서 직원에게 직접 전화하는 것(인바운드)은 막는 전화 교환원.

- **AWS 관리형**, 높은 대역폭, 고가용성, 관리 불필요
- 특정 AZ에 생성, Elastic IP 사용
- **같은 서브넷의 EC2는 사용 불가** (다른 서브넷에서만)
- IGW 필요: 프라이빗 서브넷 → NATGW → IGW
- **5 Gbps** ~ 자동 스케일링으로 **100 Gbps**까지
- **보안 그룹 관리 불필요**
- 단일 AZ 내에서 복원력 있음
- **다중 AZ 내결함성**: 여러 AZ에 NAT Gateway를 각각 생성
- AZ 간 장애 조치(failover)가 필요 없음

### NAT Gateway vs NAT Instance 비교
| 항목 | NAT Gateway | NAT Instance |
|------|-------------|--------------|
| 가용성 | AZ 내 고가용성 | 스크립트로 장애 조치 관리 |
| 대역폭 | 최대 100 Gbps | EC2 타입에 의존 |
| 관리 | AWS 관리 | 사용자 관리 |
| 비용 | 시간당 + 데이터 전송량 | 시간당 + EC2 타입 + 네트워크 비용 |
| 보안 그룹 | 불필요 | 필요 |
| Bastion Host로 사용 | 불가 | 가능 |

### Security Group vs NACL

> **Stateful vs Stateless 핵심 개념**:
> - **Stateful (상태 저장, Security Group)**: "갈 때 문을 열어줬으면 돌아올 때도 자동으로 열어준다". 요청이 인바운드로 허용되면 그 응답(아웃바운드)은 규칙 없이 자동 허용.
> - **Stateless (상태 없음, NACL)**: "갈 때도 검사, 올 때도 별도로 검사". 인바운드 규칙이 허용해도 아웃바운드 규칙을 따로 설정해야 응답 트래픽이 허용됨. 임시 포트(Ephemeral Ports) 허용 규칙도 별도로 필요.

| 항목 | Security Group | NACL |
|------|---------------|------|
| 레벨 | 인스턴스 레벨 | 서브넷 레벨 |
| 규칙 | Allow 규칙만 | Allow + Deny 규칙 |
| 상태 | **Stateful** (반환 트래픽 자동 허용) | **Stateless** (반환 트래픽 명시적 허용 필요) |
| 규칙 평가 | 모든 규칙 평가 후 결정 | 번호 순서대로 평가, 첫 매치 적용 |
| 적용 | 인스턴스에 명시적으로 지정 | 서브넷 내 모든 인스턴스에 자동 적용 |

```text
  Security Group vs NACL 비교

  ┌─────────── 서브넷 ─────────────────────────────────┐
  │                                                     │
  │   ◄── NACL (Stateless) ──►                          │
  │   ┌───────────────────────────────┐                 │
  │   │  인바운드 규칙    아웃바운드 규칙  │  ← 별도 평가  │
  │   │  #100 ALLOW ...  #100 ALLOW ... │                │
  │   │  #200 DENY  ...  #200 DENY  ... │                │
  │   │  *    DENY ALL   *    DENY ALL  │                │
  │   └───────────────────────────────┘                 │
  │                                                     │
  │        ┌──── EC2 Instance ────┐                     │
  │        │                      │                     │
  │        │  ◄── SG (Stateful) ──►                     │
  │        │  ┌────────────────┐  │                     │
  │        │  │ Allow 규칙만    │  │                     │
  │        │  │ 반환 트래픽     │  │                     │
  │        │  │ 자동 허용      │  │                     │
  │        │  └────────────────┘  │                     │
  │        └──────────────────────┘                     │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  요청 흐름:  인터넷 → [NACL] → [SG] → EC2 → [SG 자동] → [NACL 별도] → 인터넷
              ───────   체크     체크    처리   자동허용    다시체크   ───────
```

### NACL (Network Access Control List)
- 서브넷 수준의 방화벽
- 서브넷당 1개 NACL, 새 서브넷은 기본 NACL 할당
- 규칙 번호: 1-32766, **낮은 번호가 높은 우선순위**
- 첫 번째 매치가 결정을 좌우
- 마지막 규칙은 `*`로 모든 미매치 요청 거부
- AWS 권장: 규칙을 100 단위로 추가
- 새로 생성한 NACL은 모든 것을 거부
- **특정 IP 차단에 최적** (서브넷 레벨)
- 기본(Default) NACL: 인바운드/아웃바운드 모두 허용 → **수정하지 말고 커스텀 NACL 생성**

### Ephemeral Ports (임시 포트)
- 클라이언트가 정의된 포트로 연결 후 임시 포트로 응답 수신
- IANA & Windows 10: 49152 - 65535
- Linux: 32768 - 60999
- NACL 규칙 설정 시 임시 포트 범위를 고려해야 함

### VPC Flow Logs 트러블슈팅
- **Inbound REJECT** → NACL 또는 SG
- **Inbound ACCEPT + Outbound REJECT** → **NACL** (SG는 Stateful이므로)
- **Outbound REJECT** → NACL 또는 SG
- **Outbound ACCEPT + Inbound REJECT** → **NACL**

### VPC Peering
> **개념**: 서로 다른 두 VPC를 마치 같은 네트워크인 것처럼 연결해주는 기능.
> 비유: 서울 사무실(VPC A)과 부산 사무실(VPC B)을 전용 내부 통신망으로 연결 — 외부 인터넷을 거치지 않고 사설망으로 직접 통신.
> **비전이적**: A↔B, B↔C를 연결해도 A↔C는 불가. A↔C가 필요하면 별도 피어링을 설정해야 함. (많은 VPC를 연결해야 할 때는 Transit Gateway가 더 적합)

- AWS 프라이빗 네트워크를 통해 두 VPC를 연결
- 같은 네트워크처럼 동작하게 함
- **CIDR 겹침 불가** (같은 IP 대역 사용 시 연결 불가)
- **비전이적 (NOT transitive)** - 통신이 필요한 각 VPC 쌍마다 피어링 설정 필요
- 각 VPC의 서브넷 라우트 테이블 업데이트 필요
- **다른 AWS 계정/리전** 간에도 가능
- 피어링된 VPC의 보안 그룹 참조 가능 (교차 계정 - 같은 리전)

### VPC Endpoints (AWS PrivateLink)
> **왜 필요한가?** — 프라이빗 서브넷의 EC2가 S3에 접근하려면 보통 인터넷을 거쳐야 한다(NAT Gateway 필요, 비용 발생). VPC Endpoint를 쓰면 인터넷을 거치지 않고 AWS 내부 네트워크로만 S3에 접근 가능 → 보안 강화 + 비용 절감.

- AWS 서비스에 **프라이빗 네트워크**로 연결 (퍼블릭 인터넷 불필요)
- 이중화, 수평 확장
- IGW, NATGW 불필요
- 문제 발생 시: DNS 설정 확인, 라우트 테이블 확인

#### Interface Endpoints (인터페이스 엔드포인트)
- ENI (Elastic Network Interface, 가상 네트워크 카드)를 VPC 내에 프로비저닝하여 진입점으로 사용
- **보안 그룹 연결 필요**
- 대부분의 AWS 서비스 지원 (SQS, SNS, Kinesis 등)
- 시간당 비용 + GB당 데이터 처리 비용
- **온프레미스에서 VPN/Direct Connect를 통해 접근 시 필요**

#### Gateway Endpoints (게이트웨이 엔드포인트)
- 게이트웨이를 프로비저닝하여 라우트 테이블의 타겟으로 사용 (IP 주소 없이 라우팅 규칙으로 동작)
- **S3와 DynamoDB만 지원**
- **무료**
- **시험에서는 Gateway Endpoint가 선호됨** (비용 없고 VPC 내부에서 S3/DynamoDB 접근 시 최적)

```text
  VPC Endpoint: Gateway vs Interface

  ── Gateway Endpoint (S3, DynamoDB 전용 / 무료) ──

  ┌──────────── VPC ────────────────────────────┐
  │                                              │
  │  ┌─ Private Subnet ─┐                       │
  │  │  ┌──────┐         │   Route Table         │     ┌──────────┐
  │  │  │ EC2  │─────────┼──► pl-xxx → GW EP ────┼────►│   S3     │
  │  │  └──────┘         │   (자동 라우팅)         │     │ DynamoDB │
  │  └───────────────────┘                       │     └──────────┘
  │              ※ 보안그룹 불필요, 라우트 테이블 타겟    │
  └──────────────────────────────────────────────┘

  ── Interface Endpoint (대부분 AWS 서비스 / 유료) ──

  ┌──────────── VPC ────────────────────────────┐
  │                                              │
  │  ┌─ Private Subnet ─┐  ┌─ ENI (Private IP)─┐│     ┌──────────┐
  │  │  ┌──────┐         │  │  10.0.1.50        ││     │ AWS 서비스│
  │  │  │ EC2  │─────────┼─►│  [SG 필요]        │┼────►│ (SQS,   │
  │  │  └──────┘         │  │                   ││     │  SNS 등) │
  │  └───────────────────┘  └───────────────────┘│     └──────────┘
  │              ※ ENI + 보안그룹 필요, DNS 확인       │
  └──────────────────────────────────────────────┘
```

#### Gateway vs Interface for S3
- **기본**: Gateway Endpoint (무료)
- **온프레미스에서 접근** (Site-to-Site VPN, Direct Connect), 다른 VPC, 다른 리전에서 접근 시: **Interface Endpoint**

### VPC Flow Logs
- VPC / 서브넷 / ENI 수준에서 IP 트래픽 정보 캡처
- 연결 문제 모니터링 및 트러블슈팅
- 로그 저장: **S3, CloudWatch Logs, Kinesis Data Firehose**
- AWS 관리 인터페이스도 캡처: ELB, RDS, ElastiCache, Redshift, NATGW, Transit Gateway 등
- **Athena**(S3) 또는 **CloudWatch Logs Insights**로 쿼리
- 주요 필드: srcaddr, dstaddr, srcport, dstport, action(ACCEPT/REJECT)

### VPC Flow Logs 아키텍처
- Flow Logs → CloudWatch Logs → Metric Filter → CW Alarm → SNS
- Flow Logs → CloudWatch Logs → CloudWatch Contributor Insights (Top-10 IP)
- Flow Logs → S3 → Athena → QuickSight

```text
  Site-to-Site VPN vs Direct Connect

  ── Site-to-Site VPN (퍼블릭 인터넷 경유, 암호화) ──

  ┌─── On-Premises ───┐         ╔═══════════╗         ┌──── AWS VPC ────┐
  │                    │         ║  Public    ║         │                 │
  │  ┌─────────────┐   │  IPsec  ║  Internet  ║  IPsec  │  ┌───────────┐ │
  │  │ Customer GW │◄──┼────────►║            ║◄────────┼──► VPN GW    │ │
  │  │   (CGW)     │   │ tunnel  ║            ║ tunnel  │  │  (VGW)    │ │
  │  └─────────────┘   │         ╚═══════════╝         │  └───────────┘ │
  └────────────────────┘                                └────────────────┘
    빠른 설정 | 암호화O | 대역폭 변동 | 저렴

  ── Direct Connect (전용 프라이빗 연결) ──

  ┌─── On-Premises ───┐   ┌─ DX Location ─┐   ┌──── AWS VPC ────┐
  │                    │   │               │   │                 │
  │  ┌─────────────┐   │   │  ┌─────────┐  │   │  ┌───────────┐ │
  │  │ Customer    │◄──┼───┼──► DX      │◄─┼───┼──► VPN GW    │ │
  │  │ Router      │   │   │  │ Router  │  │   │  │  (VGW)    │ │
  │  └─────────────┘   │   │  └─────────┘  │   │  └───────────┘ │
  └────────────────────┘   └───────────────┘   └────────────────┘
     전용 물리 회선 ──────────────────────────►
    1개월+ 설정 | 암호화X (VPN 추가 필요) | 안정적 대역폭 | 비쌈
```

### Site-to-Site VPN
- **Virtual Private Gateway (VGW)**: AWS 측 VPN 집중 장치, VPC에 연결
- **Customer Gateway (CGW)**: 고객 측 소프트웨어 또는 물리적 장치
- Customer Gateway 장치의 IP:
  - 퍼블릭 인터넷 라우팅 가능 IP 사용
  - NAT-T 지원 NAT 뒤에 있으면 NAT 장치의 퍼블릭 IP 사용
- **중요**: VGW의 라우트 전파(Route Propagation) 활성화 필요
- 온프레미스에서 EC2 ping 시: **ICMP 프로토콜**을 인바운드 보안 그룹에 추가

### AWS VPN CloudHub
- 여러 VPN 연결이 있을 때 사이트 간 보안 통신 제공
- **허브-앤-스포크** 모델 (VPN 전용)
- 퍼블릭 인터넷을 통해 전송
- 같은 VGW에 여러 VPN 연결을 설정

### Direct Connect (DX)
- 원격 네트워크에서 VPC로의 **전용 프라이빗 연결**
- DC와 AWS Direct Connect Location 간 전용 연결 설정 필요
- VPC에 Virtual Private Gateway 설정
- 같은 연결로 퍼블릭(S3) 및 프라이빗(EC2) 리소스 접근
- IPv4, IPv6 지원
- 사용 사례: 대용량 데이터, 실시간 데이터 피드, 하이브리드 환경

#### Direct Connect 연결 유형
| 유형 | 속도 | 특징 |
|------|------|------|
| Dedicated | 1/10/100 Gbps | 물리적 이더넷 포트, AWS에 요청 후 파트너 완료 |
| Hosted | 50 Mbps ~ 10 Gbps | DX 파트너를 통해 요청, 용량 추가/제거 가능 |

- **연결 설정에 1개월 이상 소요** (리드타임)

#### Direct Connect Gateway
- 하나의 DX 연결로 **여러 리전의 VPC**에 연결 (같은 계정)

#### Direct Connect 암호화
- 전송 중 데이터는 암호화되지 않지만 **프라이빗**
- **DX + VPN**: IPsec 암호화된 프라이빗 연결 제공 (추가 보안)

#### Direct Connect 복원력
- **High Resiliency**: 여러 위치에 각 1개 연결
- **Maximum Resiliency**: 여러 위치에 각 별도 장치에 별도 연결
- DX 장애 시 **백업 Site-to-Site VPN** 연결 설정 가능

```text
  Transit Gateway - 허브-앤-스포크 구조

                        ┌───────────┐
                        │  VPC A    │
                        └─────┬─────┘
                              │
  ┌───────────┐     ┌────────┴────────┐     ┌───────────┐
  │ On-Prem   │     │                 │     │  VPC B    │
  │ (VPN/DX)  ├─────┤  Transit GW     ├─────┤           │
  └───────────┘     │  (허브)          │     └───────────┘
                    │                 │
  ┌───────────┐     │  * 전이적 라우팅  │     ┌───────────┐
  │ VPC C     ├─────┤  * IP Multicast │─────┤  VPC D    │
  └───────────┘     │  * ECMP (VPN)   │     └───────────┘
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │  DX Gateway     │
                    │  (다른 리전)      │
                    └─────────────────┘

  VPC Peering (비전이적)           Transit Gateway (전이적)
  ┌───┐     ┌───┐               ┌───┐   ┌───┐   ┌───┐
  │ A ├─────┤ B │               │ A ├───┐│   │┌──┤ B │
  └─┬─┘     └─┬─┘               └───┘   ├┤TGW├┤  └───┘
    │  각 쌍   │                 ┌───┐   ├┤   ├┤  ┌───┐
    │  마다    │                 │ C ├───┘│   │└──┤ D │
    └──별도────┘                 └───┘    └───┘   └───┘
       설정!                       모두 자동 연결!
```

### Transit Gateway
> **왜 필요한가?** — VPC가 10개 있으면 VPC Peering으로 연결하려면 최대 45개(10×9÷2)의 피어링이 필요하다. Transit Gateway는 중앙 허브 역할을 해서 모든 VPC를 허브 하나에만 연결하면 서로 통신 가능해진다.
> 비유: 여러 도시(VPC)를 연결하는 고속도로 허브 인터체인지. 각 도시끼리 직접 도로를 놓는(VPC Peering) 대신, 하나의 허브에서 모든 도시를 연결.

- VPC, VPN, DX 간 **전이적(transitive) 피어링** 연결 (A→허브→B 경로로 A↔B 통신 가능)
- 수천 개의 VPC와 온프레미스를 **허브-앤-스포크(스타)** 연결
- **리전 리소스**, 크로스 리전 작동
- **Resource Access Manager (RAM)**로 크로스 계정 공유
- 라우트 테이블로 VPC 간 통신 제한 가능
- Direct Connect Gateway, VPN 연결과 호환
- **IP Multicast 지원** (AWS에서 유일)

#### Transit Gateway ECMP
- **Equal-cost multi-path routing**
- 여러 Site-to-Site VPN 연결로 대역폭 증가
- VPN to VGW: 1.25 Gbps (1개 VPN, 2개 터널)
- VPN to TGW: 2.5 Gbps (1개 VPN, ECMP), 5.0 Gbps (2개 VPN) 등

### VPC Traffic Mirroring
- VPC 내 네트워크 트래픽을 캡처하고 검사
- 소스: ENI → 대상: ENI 또는 NLB
- 패킷 전체 또는 관심 패킷만 캡처 (트렁케이트 가능)
- 소스와 타겟이 같은 VPC 또는 다른 VPC (VPC Peering) 가능
- 사용 사례: 콘텐츠 검사, 위협 모니터링, 트러블슈팅

### IPv6 in VPC
- 모든 IPv6 주소는 퍼블릭이고 인터넷 라우팅 가능 (프라이빗 범위 없음)
- **IPv4는 비활성화 불가** → 듀얼 스택 모드로 운영
- EC2는 프라이빗 내부 IPv4 + 퍼블릭 IPv6를 받음
- EC2 인스턴스를 서브넷에 시작할 수 없는 경우: **IPv4 부족** (IPv6 아님) → 새 IPv4 CIDR 생성

### Egress-only Internet Gateway
- **IPv6 전용** (NAT Gateway의 IPv6 버전)
- VPC 내 인스턴스의 아웃바운드 IPv6 연결 허용
- 인터넷에서 인스턴스로의 IPv6 연결 시작 차단
- 라우트 테이블 업데이트 필요

### AWS Network Firewall
- VPC 전체 보호 (Layer 3 ~ Layer 7)
- VPC-to-VPC, 인터넷 아웃/인바운드, DX & S2S VPN 트래픽 검사
- 내부적으로 **Gateway Load Balancer** 사용
- **AWS Firewall Manager**로 크로스 계정 중앙 관리
- 1000개 이상의 규칙 지원 (IP, 포트, 프로토콜, 도메인, 정규식)
- Allow, Drop, Alert 트래픽 필터링
- 침입 방지 기능 (IPS)
- 로그: S3, CloudWatch Logs, Kinesis Data Firehose

### 네트워킹 비용
- 같은 AZ 내 프라이빗 IP 통신: **무료**
- 다른 AZ 프라이빗 IP: $0.01/GB
- 다른 AZ 퍼블릭/EIP: $0.02/GB
- 리전 간: $0.02/GB
- Egress(아웃바운드): 비용 발생 / Ingress(인바운드): 보통 무료
- **S3 → CloudFront: $0.00/GB** (CloudFront → 인터넷: $0.085/GB, S3 직접: $0.09/GB)
- **Gateway VPC Endpoint**: 무료 (NAT Gateway: $0.045/시간 + $0.045/GB)

## 시험 포인트
- VPC 서브넷에서 사용 가능한 IP 수 계산 시 **5개 예약 IP**를 반드시 차감
- **NAT Gateway vs NAT Instance**: NAT Gateway는 관리형, SG 불필요, 고가용성
- **Security Group은 Stateful, NACL은 Stateless** - Flow Logs 트러블슈팅의 핵심
- **VPC Peering은 비전이적** - 각 쌍마다 별도 설정 필요
- **Gateway Endpoint (S3, DynamoDB)는 무료**, Interface Endpoint는 유료
- **Direct Connect**: 설정에 1개월 이상, 데이터 암호화 안 됨 (VPN 추가 필요)
- **Transit Gateway**: IP Multicast 지원하는 유일한 서비스, ECMP로 VPN 대역폭 증가
- **Egress-only Internet Gateway**: IPv6용 NAT Gateway
- IPv4 부족으로 EC2 시작 불가 시 → 새 CIDR 블록 추가
- **비용 최적화**: 프라이빗 IP 사용, 같은 AZ 사용, S3 접근 시 Gateway Endpoint 사용

## 치트시트

| 기능/서비스 | 설명 |
|------------|------|
| VPC | 리전당 최대 5개, CIDR /28~/16, 프라이빗 IP만 |
| 서브넷 | AZ 종속, 5개 IP 예약 |
| IGW | VPC와 1:1, 라우트 테이블 편집 필수 |
| NAT Gateway | AWS 관리형, 5~100 Gbps, SG 불필요, AZ별 생성 |
| NAT Instance | 레거시, Source/Dest Check 비활성화, SG 필요 |
| NACL | Stateless, 서브넷 레벨, Allow+Deny, 번호순 평가 |
| Security Group | Stateful, 인스턴스 레벨, Allow만 |
| VPC Peering | 비전이적, CIDR 겹침 불가, 크로스 계정/리전 가능 |
| Gateway Endpoint | S3, DynamoDB 전용, 무료, 라우트 테이블 타겟 |
| Interface Endpoint | 대부분 AWS 서비스, ENI 사용, SG 필요, 유료 |
| VPC Flow Logs | S3/CloudWatch Logs/Firehose, Athena로 분석 |
| Site-to-Site VPN | VGW + CGW, 퍼블릭 인터넷, Route Propagation |
| Direct Connect | 전용 프라이빗 연결, 1개월+ 리드타임, 암호화 없음 |
| DX Gateway | 하나의 DX로 여러 리전 VPC 연결 |
| Transit Gateway | 전이적 피어링, IP Multicast, ECMP, RAM으로 공유 |
| Traffic Mirroring | ENI 트래픽 캡처, 소스→ENI/NLB |
| Egress-only IGW | IPv6 전용 아웃바운드, 인바운드 차단 |
| Network Firewall | L3-L7 보호, GWLB 기반, Firewall Manager 통합 |

---

## Practice Questions

### Q1. A company has a VPC with a CIDR block of 10.0.0.0/24 in a subnet. How many IP addresses are available for EC2 instances?
**Options:**
- A) 256
- B) 251
- C) 254
- D) 250

**Answer:** B

**해설:**

> **문제:** 한 회사가 서브넷에 10.0.0.0/24 CIDR 블록을 가진 VPC를 보유하고 있다. EC2 인스턴스에 사용 가능한 IP 주소는 몇 개인가?

| 선지 | 번역 |
|------|------|
| A | 256 |
| B | 251 |
| C | 254 |
| D | 250 |

**(A)** : 256은 예약 IP를 고려하지 않은 총 IP 주소 수이다. AWS는 서브넷당 5개의 IP를 예약하므로 실제 사용 가능한 수와 다르다.

**(B) 정답** : /24 CIDR 블록은 총 256개의 IP를 제공하지만 AWS는 각 서브넷에서 5개를 예약한다(.0 네트워크 주소, .1 VPC 라우터, .2 Amazon DNS, .3 향후 사용, 마지막 브로드캐스트). 따라서 256 - 5 = 251개가 사용 가능하다. → [📖 서브넷 Subnet](/section/25-vpc#서브넷-subnet)

**(C)** : 254는 일반 네트워킹에서 네트워크/브로드캐스트 주소 2개만 제외한 값이다. AWS 환경에서는 5개를 예약하므로 맞지 않는다.

**(D)** : 250은 6개를 차감한 값으로 AWS의 5개 예약 규칙과 맞지 않는다.

**핵심 개념:** VPC Subnet IP 예약

**관련 노트:** [서브넷 Subnet](/section/25-vpc#서브넷-subnet), [CIDR Classless Inter-Domain Routing, 사이더](/section/25-vpc#cidr-classless-interdomain-routing-사이더)

---

### Q2. A solutions architect needs to allow EC2 instances in a private subnet to access the internet for software updates while preventing inbound connections from the internet. The solution must be highly available and require minimal operational overhead. What should the architect recommend?
**Options:**
- A) Deploy a NAT instance in a public subnet across multiple AZs using an Auto Scaling group
- B) Deploy a NAT Gateway in each public subnet across multiple AZs
- C) Deploy a single NAT Gateway in one public subnet
- D) Configure an Internet Gateway and update the private subnet route table

**Answer:** B

**해설:**

> **문제:** 솔루션스 아키텍트가 프라이빗 서브넷의 EC2 인스턴스가 소프트웨어 업데이트를 위해 인터넷에 접근하되, 인터넷으로부터의 인바운드 연결은 차단해야 한다. 솔루션은 고가용성이어야 하며 최소한의 운영 오버헤드가 필요하다. 아키텍트는 무엇을 권장해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Auto Scaling 그룹을 사용하여 여러 AZ의 퍼블릭 서브넷에 NAT 인스턴스를 배포한다 |
| B | 여러 AZ의 각 퍼블릭 서브넷에 NAT Gateway를 배포한다 |
| C | 하나의 퍼블릭 서브넷에 단일 NAT Gateway를 배포한다 |
| D | Internet Gateway를 구성하고 프라이빗 서브넷 라우트 테이블을 업데이트한다 |

**(A)** : NAT Instance는 레거시 방식으로 직접 관리(SG, 장애 조치 스크립트 등)가 필요하다. 운영 오버헤드가 크다. → [📖 NAT Instance 레거시, 시험에 출제](/section/25-vpc#nat-instance-레거시-시험에-출제)

**(B) 정답** : NAT Gateway는 AWS 관리형 서비스로 운영 오버헤드가 최소화된다. 각 AZ의 퍼블릭 서브넷에 배포하면 다중 AZ 내결함성을 확보하여 고가용성 요구사항을 충족한다. → [📖 NAT Gateway](/section/25-vpc#nat-gateway)

**(C)** : 단일 AZ에만 NAT Gateway를 배포하면 해당 AZ 장애 시 전체 프라이빗 서브넷의 인터넷 접근이 불가능해진다. 고가용성을 충족하지 못한다. → [📖 NAT Gateway](/section/25-vpc#nat-gateway)

**(D)** : 프라이빗 서브넷에 IGW를 직접 연결하면 해당 서브넷이 사실상 퍼블릭 서브넷이 된다. 인터넷으로부터의 인바운드 연결도 허용하게 되므로 요구사항에 반한다. → [📖 Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

**핵심 개념:** NAT Gateway High Availability

**관련 노트:** [NAT Gateway](/section/25-vpc#nat-gateway), [NAT Gateway vs NAT Instance 비교](/section/25-vpc#nat-gateway-vs-nat-instance-비교)

---

### Q3. A company wants to block a specific IP address from accessing their EC2 instances. The instances are behind an Application Load Balancer. Which approach should be used?
**Options:**
- A) Modify the EC2 instance security group to deny the IP address
- B) Create a NACL rule to deny the IP address on the subnet where the ALB is deployed
- C) Use AWS WAF with an IP-based rule attached to the ALB
- D) Modify the ALB security group to deny the IP address

**Answer:** C

**해설:**

> **문제:** 한 회사가 EC2 인스턴스에 특정 IP 주소의 접근을 차단하려 한다. 인스턴스는 Application Load Balancer 뒤에 있다. 어떤 접근 방식을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스 보안 그룹을 수정하여 해당 IP 주소를 거부한다 |
| B | ALB가 배포된 서브넷에서 해당 IP 주소를 거부하는 NACL 규칙을 생성한다 |
| C | ALB에 연결된 AWS WAF에서 IP 기반 규칙을 사용한다 |
| D | ALB 보안 그룹을 수정하여 해당 IP 주소를 거부한다 |

**(A)** : Security Group은 Allow 규칙만 지원하고 Deny 규칙을 지원하지 않는다. EC2 인스턴스 SG로 특정 IP를 거부하는 것이 불가능하다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**(B)** : NACL로 서브넷 레벨에서 차단하는 것은 가능하다. 그러나 WAF가 더 세밀한 제어(IP 세트 관리, 속도 기반 규칙 등)를 제공하며 ALB에 직접 연결할 수 있어 더 효과적이다. → [📖 NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

**(C) 정답** : AWS WAF를 ALB에 연결하여 IP 기반 규칙으로 필터링하는 것이 가장 효과적인 방법이다. WAF는 Deny 규칙을 지원하고 ALB에 직접 배포할 수 있다. → [📖 AWS WAF Web Application Firewall](/section/24-security-encryption#aws-waf-web-application-firewall)

**(D)** : Security Group은 Allow 규칙만 지원한다. ALB SG에서 특정 IP를 Deny하는 것이 불가능하다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**핵심 개념:** Security Group vs NACL vs WAF

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

---

### Q4. A company needs to connect their on-premises data center to AWS VPC with a dedicated, private connection that provides consistent network performance. The connection must also be encrypted. What solution should be implemented?
**Options:**
- A) AWS Site-to-Site VPN only
- B) AWS Direct Connect only
- C) AWS Direct Connect with Site-to-Site VPN
- D) AWS VPN CloudHub

**Answer:** C

**해설:**

> **문제:** 한 회사가 온프레미스 데이터 센터를 AWS VPC에 전용 프라이빗 연결로 연결해야 하며, 일관된 네트워크 성능을 제공해야 한다. 연결은 암호화되어야 한다. 어떤 솔루션을 구현해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Site-to-Site VPN만 사용 |
| B | AWS Direct Connect만 사용 |
| C | AWS Direct Connect와 Site-to-Site VPN 결합 |
| D | AWS VPN CloudHub |

**(A)** : Site-to-Site VPN은 IPsec 암호화를 제공하지만 퍼블릭 인터넷을 경유한다. 일관된 네트워크 성능을 보장할 수 없다. → [📖 Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

**(B)** : Direct Connect는 전용 프라이빗 연결로 일관된 성능을 제공하지만 전송 데이터가 암호화되지 않는다. 암호화 요구사항을 충족하지 못한다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(C) 정답** : Direct Connect + Site-to-Site VPN을 결합하면 전용 프라이빗 회선 위에 IPsec 암호화 터널을 구성할 수 있다. 세 가지 요구사항(전용 연결, 일관된 성능, 암호화)을 모두 충족한다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(D)** : VPN CloudHub는 여러 사이트 간 VPN 통신을 위한 허브-앤-스포크 모델이다. 이 시나리오의 요구사항과 맞지 않는다. → [📖 AWS VPN CloudHub](/section/25-vpc#aws-vpn-cloudhub)

**핵심 개념:** Direct Connect Encryption

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

---

### Q5. A company has VPCs in multiple AWS regions and on-premises data centers. They need to create a hub-and-spoke network topology to connect all VPCs and on-premises locations with transitive routing. Which service should they use?
**Options:**
- A) VPC Peering
- B) AWS Direct Connect Gateway
- C) AWS Transit Gateway
- D) AWS VPN CloudHub

**Answer:** C

**해설:**

> **문제:** 한 회사가 여러 AWS 리전의 VPC와 온프레미스 데이터 센터를 보유하고 있다. 전이적 라우팅을 통해 모든 VPC와 온프레미스 위치를 연결하는 허브-앤-스포크 네트워크 토폴로지를 구축해야 한다. 어떤 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | VPC Peering |
| B | AWS Direct Connect Gateway |
| C | AWS Transit Gateway |
| D | AWS VPN CloudHub |

**(A)** : VPC Peering은 비전이적(non-transitive)이다. 통신이 필요한 각 VPC 쌍마다 개별 피어링을 설정해야 하며 허브-앤-스포크 토폴로지를 구현할 수 없다. → [📖 VPC Peering](/section/25-vpc#vpc-peering)

**(B)** : Direct Connect Gateway는 하나의 DX 연결을 여러 리전의 VPC에 확장할 수 있다. 그러나 VPC 간 전이적 라우팅은 제공하지 않는다.

**(C) 정답** : Transit Gateway는 수천 개의 VPC, VPN, Direct Connect 연결 간 전이적(transitive) 피어링을 제공하는 허브-앤-스포크 아키텍처이다. → [📖 Transit Gateway](/section/25-vpc#transit-gateway)

**(D)** : VPN CloudHub는 VPN 전용으로 규모가 제한적이다. VPC와 온프레미스를 모두 포함하는 대규모 허브-앤-스포크 구성에는 적합하지 않다.

**핵심 개념:** Transit Gateway

**관련 노트:** [Transit Gateway](/section/25-vpc#transit-gateway)

---

### Q6. An application running in a private subnet needs to access Amazon S3. The solutions architect wants to ensure that the traffic does not traverse the public internet and the solution should be cost-effective. What should the architect do?
**Options:**
- A) Create a VPC Interface Endpoint for S3
- B) Create a VPC Gateway Endpoint for S3
- C) Deploy a NAT Gateway and route S3 traffic through it
- D) Create a VPC peering connection with the S3 service VPC

**Answer:** B

**해설:**

> **문제:** 프라이빗 서브넷에서 실행 중인 애플리케이션이 Amazon S3에 접근해야 한다. 솔루션스 아키텍트는 트래픽이 퍼블릭 인터넷을 경유하지 않으며 비용 효율적인 솔루션을 원한다. 아키텍트는 무엇을 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | S3용 VPC Interface Endpoint를 생성한다 |
| B | S3용 VPC Gateway Endpoint를 생성한다 |
| C | NAT Gateway를 배포하고 S3 트래픽을 라우팅한다 |
| D | S3 서비스 VPC와 VPC 피어링 연결을 생성한다 |

**(A)** : Interface Endpoint도 S3에 접근 가능하지만 시간당 비용과 GB당 데이터 처리 비용이 발생한다. 비용 효율적이지 않다. → [📖 VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink)

**(B) 정답** : Gateway Endpoint는 S3와 DynamoDB를 지원하며 완전히 무료이다. 트래픽이 퍼블릭 인터넷을 경유하지 않아 두 요구사항을 모두 충족한다. → [📖 VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink)

**(C)** : NAT Gateway는 $0.045/시간 + $0.045/GB의 비용이 발생한다. 또한 트래픽이 퍼블릭 인터넷을 경유하므로 두 가지 요구사항 모두 충족하지 못한다. → [📖 NAT Gateway](/section/25-vpc#nat-gateway)

**(D)** : VPC Peering은 S3와 같은 AWS 관리형 서비스에 연결하는 방식이 아니다. 적용할 수 없다.

**핵심 개념:** VPC Gateway Endpoint vs Interface Endpoint

**관련 노트:** [VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink)

---

### Q7. A VPC Flow Log shows an inbound request was ACCEPTED but the corresponding outbound response was REJECTED. What is the most likely cause?
**Options:**
- A) The Security Group is blocking the outbound traffic
- B) The NACL is blocking the outbound traffic
- C) The route table has no route to the destination
- D) The Internet Gateway is misconfigured

**Answer:** B

**해설:**

> **문제:** VPC Flow Log에서 인바운드 요청이 ACCEPTED되었지만 해당 아웃바운드 응답이 REJECTED된 것으로 나타났다. 가장 가능성 높은 원인은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Security Group이 아웃바운드 트래픽을 차단하고 있다 |
| B | NACL이 아웃바운드 트래픽을 차단하고 있다 |
| C | 라우트 테이블에 목적지로의 경로가 없다 |
| D | Internet Gateway가 잘못 구성되었다 |

**(A)** : Security Group은 Stateful이다. 인바운드가 허용되면 해당 아웃바운드 응답 트래픽은 자동으로 허용된다. SG가 아웃바운드를 차단하는 것은 불가능하다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**(B) 정답** : NACL은 Stateless이므로 인바운드 규칙과 아웃바운드 규칙이 독립적으로 평가된다. 인바운드가 허용되더라도 아웃바운드에 별도의 허용 규칙이 없으면 거부된다. Inbound ACCEPT + Outbound REJECT 패턴은 NACL 문제를 나타낸다. → [📖 NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

**(C)** : 라우트 테이블 문제는 Flow Log에서 다른 형태(연결 자체가 실패하거나 양쪽 모두 REJECT)로 나타난다. 이 패턴과 일치하지 않는다.

**(D)** : IGW 구성 문제는 Flow Log에서 다른 형태로 나타난다. 이 패턴과 일치하지 않는다.

**핵심 개념:** VPC Flow Logs Troubleshooting - Stateful vs Stateless

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [Ephemeral Ports 임시 포트](/section/25-vpc#ephemeral-ports-임시-포트), [VPC Flow Logs 트러블슈팅](/section/25-vpc#vpc-flow-logs-트러블슈팅)

---

### Q8. A company requires a network connection from their on-premises data center to multiple VPCs in different AWS regions through a single physical connection. What combination of services should they use?
**Options:**
- A) AWS Site-to-Site VPN + Transit Gateway
- B) AWS Direct Connect + Direct Connect Gateway
- C) AWS Direct Connect + VPC Peering
- D) AWS VPN CloudHub + Transit Gateway

**Answer:** B

**해설:**

> **문제:** 한 회사가 온프레미스 데이터 센터에서 여러 AWS 리전의 여러 VPC에 단일 물리적 연결을 통해 네트워크를 연결해야 한다. 어떤 서비스 조합을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Site-to-Site VPN + Transit Gateway |
| B | AWS Direct Connect + Direct Connect Gateway |
| C | AWS Direct Connect + VPC Peering |
| D | AWS VPN CloudHub + Transit Gateway |

**(A)** : Site-to-Site VPN은 퍼블릭 인터넷을 통한 암호화 터널이다. 물리적 전용 연결이 아니다. → [📖 Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

**(B) 정답** : Direct Connect는 온프레미스에서 AWS로의 전용 물리적 연결을 제공하고, Direct Connect Gateway를 사용하면 해당 연결을 여러 리전의 여러 VPC로 확장할 수 있다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(C)** : VPC Peering은 VPC 간 연결 서비스이다. 온프레미스와 AWS를 연결하는 용도가 아니다. → [📖 VPC Peering](/section/25-vpc#vpc-peering)

**(D)** : VPN CloudHub는 VPN 기반이다. 물리적 전용 연결 요구사항을 충족하지 못한다. → [📖 AWS VPN CloudHub](/section/25-vpc#aws-vpn-cloudhub)

**핵심 개념:** Direct Connect Gateway

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx)
