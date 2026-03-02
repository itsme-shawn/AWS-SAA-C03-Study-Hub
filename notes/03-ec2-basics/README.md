# Amazon EC2 - Basics

## 개요
EC2(Elastic Compute Cloud)는 AWS에서 가장 대표적인 IaaS(Infrastructure as a Service) 서비스로, 가상 머신을 대여하여 사용한다. SAA-C03 시험에서 가장 많이 출제되는 서비스 중 하나이며, 인스턴스 타입, 보안 그룹, 구매 옵션을 정확히 이해해야 한다.

## 핵심 개념

### EC2 구성 요소
- **가상 머신 (EC2)**: 서버 임대
- **가상 드라이브 (EBS)**: 데이터 저장
- **로드 밸런서 (ELB)**: 부하 분산
- **오토 스케일링 그룹 (ASG)**: 자동 확장/축소

### EC2 설정 옵션
- **OS**: Linux, Windows, Mac OS
- **CPU**: 컴퓨팅 파워 및 코어 수
- **RAM**: 메모리 용량
- **스토리지**: 네트워크 연결(EBS/EFS) 또는 하드웨어(Instance Store)
- **네트워크 카드**: 속도, Public IP
- **방화벽**: Security Group
- **부트스트랩**: EC2 User Data

### EC2 User Data
- 인스턴스 **최초 시작 시 한 번만** 실행되는 스크립트
- **root 사용자 권한**으로 실행
- 용도: 소프트웨어 설치, 업데이트, 파일 다운로드 등 자동화

### EC2 인스턴스 타입

#### 네이밍 규칙: `m5.2xlarge`
- **m**: 인스턴스 클래스
- **5**: 세대 (시간이 지나면서 개선)
- **2xlarge**: 클래스 내 크기

| 타입 | 접두사 | 최적화 대상 | 사용 사례 |
|------|--------|-----------|---------|
| General Purpose | t, m | 컴퓨팅/메모리/네트워크 균형 | 웹 서버, 코드 저장소 |
| Compute Optimized | c | 고성능 프로세서 | 배치 처리, 미디어 트랜스코딩, HPC, ML, 게임 서버 |
| Memory Optimized | r, x, z | 대용량 메모리 | 고성능 DB, 인메모리 DB, BI, 실시간 빅데이터 처리 |
| Storage Optimized | i, d, h | 고성능 로컬 스토리지 | OLTP, NoSQL DB, Redis 캐시, 데이터 웨어하우스, DFS |

### Security Groups (보안 그룹)
- EC2 인스턴스의 **방화벽** 역할
- **규칙(rules)만** 포함 (Allow만 가능, Deny 규칙 없음)
- IP 또는 다른 보안 그룹을 참조하여 규칙 설정 가능

```text
Security Group 인바운드/아웃바운드 트래픽 흐름
===============================================

                    인바운드 (Inbound)
                    기본: 모두 차단
                         │
  ┌──────────┐     ┌─────▼──────┐     ┌──────────────┐
  │ Internet │     │  Security  │     │              │
  │ (Client) │────▶│   Group    │────▶│  EC2 인스턴스 │
  │          │     │  [방화벽]  │     │              │
  │          │◀────│            │◀────│              │
  └──────────┘     └─────┬──────┘     └──────────────┘
                         │
                    아웃바운드 (Outbound)
                    기본: 모두 허용

  ── Allow 규칙 예시 ──────────────────────────────
  인바운드: TCP 22 (SSH)     from 203.0.113.0/32
  인바운드: TCP 80 (HTTP)    from 0.0.0.0/0
  인바운드: TCP 443 (HTTPS)  from 0.0.0.0/0
  아웃바운드: All traffic     to 0.0.0.0/0 (기본)

  ── Security Group 참조 (SG-to-SG) ──────────────

  ┌──────────┐          ┌──────────┐
  │ EC2 (A)  │  SG-1    │ EC2 (B)  │  SG-2
  │          │─────────▶│          │
  └──────────┘          └──────────┘

  SG-2 인바운드 규칙: Allow from SG-1
  → SG-1에 속한 모든 인스턴스의 트래픽 허용
  → IP를 일일이 지정할 필요 없음!
```

#### 주요 특성
- 여러 인스턴스에 연결 가능
- **리전/VPC 조합에 종속**
- EC2 외부에서 동작 (차단된 트래픽은 인스턴스가 볼 수 없음)
- SSH 접근용 별도 보안 그룹 관리 권장
- **인바운드**: 기본 모두 차단
- **아웃바운드**: 기본 모두 허용
- **Stateful(상태 저장형)** 방화벽: 인바운드 요청을 한 번 허용하면, 그 응답 트래픽은 별도 규칙 없이 자동으로 허용됨. 예) 외부에서 HTTP 요청이 들어오면, EC2에서 보내는 HTTP 응답은 자동 허용 (NACL의 Stateless와 대비됨)

#### 트러블슈팅
- **Timeout** → 보안 그룹 문제
- **Connection Refused** → 애플리케이션 오류 또는 미실행

### Classic Ports
| 포트 | 프로토콜 | 용도 |
|------|---------|------|
| 22 | SSH | Linux 인스턴스 로그인 |
| 21 | FTP | 파일 전송 |
| 22 | SFTP | SSH를 통한 보안 파일 전송 |
| 80 | HTTP | 비보안 웹사이트 |
| 443 | HTTPS | 보안 웹사이트 |
| 3389 | RDP | Windows 인스턴스 로그인 |

### EC2 Instance Connect
- 브라우저에서 EC2에 직접 연결
- 키 파일 불필요 (AWS가 임시 키를 업로드)
- Amazon Linux 2에서 기본 지원
- 포트 22가 열려 있어야 함

### EC2 구매 옵션 (시험 핵심!)

```text
EC2 구매 옵션 의사결정 트리
============================

  [워크로드 유형은?]
         │
         ├── 중단 가능한 배치/분석 워크로드
         │         │
         │         ▼
         │   ┌─────────────┐
         │   │ Spot Instance│  최대 90% 할인
         │   │ (중단 가능)  │  DB/크리티컬 부적합!
         │   └─────────────┘
         │
         ├── BYOL / 라이선스 규제 / 물리 서버 필요
         │         │
         │         ▼
         │   ┌────────────────┐
         │   │ Dedicated Host  │  물리 서버 전체 예약
         │   │ (가장 비쌈)     │  소켓/코어 가시성
         │   └────────────────┘
         │
         ├── 1~3년 안정적 사용 (DB 등)
         │         │
         │         ├── 인스턴스 타입 변경 필요?
         │         │         │
         │         │    예   │   아니오
         │         │    ▼    │      ▼
         │         │ ┌──────────┐ ┌────────────────┐
         │         │ │Convertible│ │Reserved Instance│
         │         │ │RI (66%)   │ │(최대 72%)       │
         │         │ └──────────┘ └────────────────┘
         │         │
         │         └── $/시간 약정 OK?
         │                   │
         │              예   ▼
         │            ┌──────────────┐
         │            │ Savings Plans │  크기/OS 유연
         │            │ (최대 72%)    │  패밀리+리전 고정
         │            └──────────────┘
         │
         ├── 특정 AZ 단기 용량 보장
         │         │
         │         ▼
         │   ┌────────────────────┐
         │   │ Capacity Reservation│  할인 없음
         │   │ (시간 약정 없음)     │  On-Demand 가격
         │   └────────────────────┘
         │
         └── 단기 / 예측 불가능
                   │
                   ▼
             ┌─────────────┐
             │  On-Demand   │  약정 없음
             │ (기본 옵션)  │  초당 과금
             └─────────────┘
```

| 구매 옵션 | 할인율 | 특징 | 적합한 워크로드 |
|----------|--------|------|--------------|
| **On-Demand** | 없음 | 초당 과금(Linux/Windows), 약정 없음 | 단기, 예측 불가능한 워크로드 |
| **Reserved Instance** | 최대 72% | 1년/3년, 인스턴스 속성 고정 | 안정적 사용 (DB 등) |
| **Convertible RI** | 최대 66% | 인스턴스 타입/패밀리/OS/범위/테넌시 변경 가능 | 유연성 필요한 장기 워크로드 |
| **Savings Plans** | 최대 72% | 사용량($/시간) 약정, 인스턴스 패밀리/리전 고정 | 장기 워크로드, 크기/OS/테넌시 유연 |
| **Spot Instance** | 최대 90% | 언제든 중단 가능, 2분 유예 | 배치, 데이터 분석, 분산 워크로드 |
| **Dedicated Host** | 가장 비쌈 | 물리 서버 전체 예약, BYOL(Bring Your Own License - 기존 소프트웨어 라이선스를 AWS에 가져와 사용) | 라이선스 규정, 규제 준수 |
| **Dedicated Instance** | - | 전용 하드웨어, 인스턴스 배치 제어 불가 | 다른 고객과 하드웨어 비공유 |
| **Capacity Reservation** | 없음 | 특정 AZ에 용량 예약, 시간 약정 없음 | 특정 AZ 단기 보장 워크로드 |

### Spot Instance 상세
- 최대 가격 설정 → 현재 Spot 가격이 최대 가격 초과 시 2분 유예 후 중지/종료
- **Spot Request 취소 ≠ 인스턴스 종료** (별도로 종료해야 함)
- **Spot Block**: 1~6시간 중단 없이 사용 (드물게 회수 가능)
- **절대 부적합**: 크리티컬 작업, 데이터베이스

### Spot Fleet
- Spot 인스턴스 + (선택) On-Demand 인스턴스의 집합
- 용량/비용 제한 내에서 목표 용량 충족 시도
- **할당 전략**:
  - `lowestPrice`: 최저 가격 풀 (비용 최적화, 단기)
  - `diversified`: 모든 풀에 분산 (가용성, 장기)
  - `capacityOptimized`: 최적 용량 풀
  - `priceCapacityOptimized` **(권장)**: 최고 용량 풀 중 최저 가격

```text
Spot Fleet 할당 전략 비교
==========================

  lowestPrice            diversified           priceCapacityOptimized
  (비용 최적화)           (가용성 최적화)         (권장 - 균형)

  Pool A: $0.03 ◀─ALL   Pool A ◀── 33%        Pool A: 용량 大
  Pool B: $0.05          Pool B ◀── 33%          $0.04 ◀── 선택!
  Pool C: $0.08          Pool C ◀── 33%        Pool B: 용량 大
                                                 $0.06
  → 가장 싼 풀에 집중    → 모든 풀에 분산        Pool C: 용량 小
  → 중단 위험 높음       → 중단 위험 분산          $0.03
                                               → 용량 큰 풀 중 최저가
```

## 시험 포인트
- **Timeout = Security Group 문제**, **Connection Refused = 앱 문제** 반드시 기억
- On-Demand vs Reserved vs Spot vs Dedicated Host 시나리오 구분 필수
- Spot은 가장 저렴하지만 중단 가능 → DB/크리티컬 작업 부적합
- Dedicated Host = BYOL(Bring Your Own License), 물리 서버 수준 제어
- Dedicated Instance vs Dedicated Host: 인스턴스 배치 제어 여부 차이
- Savings Plans: 인스턴스 패밀리+리전 고정, 크기/OS/테넌시 유연
- Capacity Reservation: 할인 없음, On-Demand 가격, 인스턴스 미사용 시에도 과금
- Reserved Instance는 Marketplace에서 매매 가능

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| EC2 User Data | 최초 시작 시 1회 실행, root 권한 |
| Security Group | 방화벽, Allow 규칙만, 리전/VPC 종속 |
| t 타입 | General Purpose (범용) |
| c 타입 | Compute Optimized (컴퓨팅 최적화) |
| r 타입 | Memory Optimized (메모리 최적화) |
| i/d/h 타입 | Storage Optimized (스토리지 최적화) |
| On-Demand | 약정 없음, 최고가, 단기 예측 불가 워크로드 |
| Reserved | 1~3년 약정, 최대 72% 할인, 안정 워크로드 |
| Spot | 최대 90% 할인, 중단 가능, 배치/분석용 |
| Dedicated Host | 물리 서버 전체, BYOL, 규제 준수 |
| Spot Fleet | Spot + On-Demand 혼합, 자동 최적 할당 |

---

## Practice Questions

### Q1. A company needs to run a batch processing job that can be interrupted and restarted without data loss. The job needs to be as cost-effective as possible. Which EC2 purchasing option should they use?
**Options:**
- A) On-Demand Instances
- B) Reserved Instances
- C) Spot Instances
- D) Dedicated Hosts

**Answer:** C

**해설:**

> **문제:** 한 회사가 중단 후 데이터 손실 없이 재시작할 수 있는 배치 처리 작업을 실행해야 한다. 가능한 한 비용 효율적이어야 한다. 어떤 EC2 구매 옵션을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | On-Demand 인스턴스 |
| B | Reserved 인스턴스 |
| C | Spot 인스턴스 |
| D | Dedicated Hosts |

**(A)** : On-Demand는 약정 없이 사용할 수 있지만 할인이 없어 비용이 높다. 비용 최적화 요구사항에 부적합하다.

**(B)** : Reserved 인스턴스는 1~3년 장기 약정이 필요하며 배치 작업처럼 간헐적인 워크로드에는 비효율적이다. 안정적으로 지속 실행되는 워크로드에 적합하다.

**(C) 정답** : Spot 인스턴스는 최대 90% 할인으로 가장 비용 효율적이며, 배치 처리 작업처럼 중단 후 재시작이 가능한(fault-tolerant) 워크로드에 가장 적합하다.

**(D)** : Dedicated Host는 물리 서버 전체를 예약하는 가장 비싼 옵션이다. BYOL 라이선스 규제가 있을 때만 적합하며 배치 처리에는 과도한 선택이다.

**핵심 개념:** EC2 Spot Instances

### Q2. A user is trying to connect to an EC2 instance via SSH but the connection times out. What is the MOST likely cause?
**Options:**
- A) The EC2 instance is stopped
- B) The application on the instance is not running
- C) The Security Group does not allow inbound SSH traffic
- D) The IAM user does not have permission

**Answer:** C

**해설:**

> **문제:** 사용자가 SSH를 통해 EC2 인스턴스에 연결하려 하지만 연결 시간이 초과된다. 가장 가능성 높은 원인은?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스가 중지됨 |
| B | 인스턴스의 애플리케이션이 실행 중이 아님 |
| C | 보안 그룹이 인바운드 SSH 트래픽을 허용하지 않음 |
| D | IAM 사용자에게 권한이 없음 |

**(A)** : 인스턴스가 중지된 경우에는 DNS 해석 실패나 "Host unreachable" 오류가 발생하며, Timeout이 나타나지 않는다.

**(B)** : 인스턴스의 애플리케이션이 실행 중이 아닐 경우 "Connection Refused" 오류가 발생한다. Connection Timeout과는 다른 오류이다.

**(C) 정답** : Connection Timeout은 보안 그룹 문제를 의미한다. 인바운드 규칙에서 포트 22(SSH)가 허용되지 않으면 트래픽이 인스턴스에 도달하지 못해 시간 초과가 발생한다.

**(D)** : IAM 권한은 SSH 연결 자체가 아닌 AWS API 작업에 관련된 것이다. SSH 연결은 IAM 권한과 무관하게 OS 레벨 인증(키 페어)으로 이루어진다.

**핵심 개념:** Security Groups 트러블슈팅

### Q3. A company requires a physical server for their application due to software licensing that is based on per-socket and per-core metrics. Which EC2 option should they choose?
**Options:**
- A) Spot Instances
- B) Dedicated Instances
- C) Dedicated Hosts
- D) Reserved Instances

**Answer:** C

**해설:**

> **문제:** 한 회사가 소켓 및 코어 기반 소프트웨어 라이선스 때문에 물리 서버가 필요하다. 어떤 EC2 옵션을 선택해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Spot 인스턴스 |
| B | Dedicated 인스턴스 |
| C | Dedicated Hosts |
| D | Reserved 인스턴스 |

**(A)** : Spot 인스턴스는 언제든 중단될 수 있어 라이선스 관리와 안정적인 서비스 운영에 부적합하다.

**(B)** : Dedicated Instance는 전용 하드웨어를 사용하지만, 물리 서버 수준의 소켓/코어 가시성과 제어 기능이 없어 소켓·코어 기반 소프트웨어 라이선스 요건을 충족하지 못한다.

**(C) 정답** : Dedicated Host는 물리 서버 전체를 예약하여 소켓/코어 수에 대한 가시성을 제공하고, 기존 소프트웨어 라이선스(BYOL)를 적용할 수 있다. 소켓·코어 기반 라이선스 요건에 유일하게 적합하다.

**(D)** : Reserved Instance는 할인 구매 옵션일 뿐, 물리 서버 수준의 제어나 소켓/코어 가시성을 제공하지 않는다.

**핵심 개념:** Dedicated Host vs Dedicated Instance

### Q4. Which EC2 instance type family is BEST suited for an in-memory database workload?
**Options:**
- A) General Purpose (t-family)
- B) Compute Optimized (c-family)
- C) Memory Optimized (r-family)
- D) Storage Optimized (i-family)

**Answer:** C

**해설:**

> **문제:** 인메모리 데이터베이스 워크로드에 가장 적합한 EC2 인스턴스 타입 패밀리는?

| 선지 | 번역 |
|------|------|
| A | General Purpose (t 패밀리) |
| B | Compute Optimized (c 패밀리) |
| C | Memory Optimized (r 패밀리) |
| D | Storage Optimized (i 패밀리) |

**(A)** : General Purpose(t 패밀리)는 컴퓨팅, 메모리, 네트워크 자원이 균형 잡혀 있어 범용 워크로드에 적합하다. 메모리 집약적 작업에는 최적화되어 있지 않다.

**(B)** : Compute Optimized(c 패밀리)는 고성능 CPU 집약적 작업(배치 처리, HPC, 게임 서버 등)에 최적화되어 있다. 메모리 위주의 워크로드에는 부적합하다.

**(C) 정답** : Memory Optimized(r 패밀리)는 대용량 데이터셋을 메모리에서 처리하는 워크로드에 최적화되어 있다. 인메모리 데이터베이스, 고성능 관계형/비관계형 DB, BI 애플리케이션에 적합하다.

**(D)** : Storage Optimized(i 패밀리)는 로컬 스토리지의 높은 I/O 성능이 필요한 워크로드(OLTP, NoSQL, 데이터 웨어하우스)에 적합하다. 메모리 최적화와는 다른 용도이다.

**핵심 개념:** EC2 Instance Types - Memory Optimized

### Q5. A company plans to run a steady-state database workload for the next 3 years. They want to minimize costs. Which purchasing option provides the GREATEST discount?
**Options:**
- A) On-Demand Instances
- B) 3-year Reserved Instance with All Upfront payment
- C) Spot Instances
- D) 1-year Savings Plan with No Upfront payment

**Answer:** B

**해설:**

> **문제:** 한 회사가 향후 3년간 안정적인 데이터베이스 워크로드를 실행할 계획이다. 비용을 최소화하고자 한다. 가장 큰 할인을 제공하는 구매 옵션은?

| 선지 | 번역 |
|------|------|
| A | On-Demand 인스턴스 |
| B | 3년 Reserved Instance, All Upfront 결제 |
| C | Spot 인스턴스 |
| D | 1년 Savings Plan, No Upfront 결제 |

**(A)** : On-Demand는 할인이 전혀 없어 비용이 가장 높다. 장기 안정적 워크로드에는 매우 비효율적이다.

**(B) 정답** : 3년 Reserved Instance에 All Upfront 결제를 하면 최대 72%의 할인을 받을 수 있다. 3년간 안정적인 DB 워크로드에 가장 큰 할인을 제공하는 옵션이다.

**(C)** : Spot 인스턴스는 최대 90% 할인이 가능하지만 언제든 중단될 수 있어 데이터베이스처럼 중단되어서는 안 되는 워크로드에는 절대 부적합하다.

**(D)** : 1년 Savings Plan No Upfront는 기간이 짧고 선불 결제가 없어 3년 RI All Upfront보다 할인율이 낮다. 유연성은 높지만 비용 절감 효과가 적다.

**핵심 개념:** EC2 Reserved Instances

### Q6. What is the recommended Spot Fleet allocation strategy for most workloads?
**Options:**
- A) lowestPrice
- B) diversified
- C) capacityOptimized
- D) priceCapacityOptimized

**Answer:** D

**해설:**

> **문제:** 대부분의 워크로드에 권장되는 Spot Fleet 할당 전략은?

| 선지 | 번역 |
|------|------|
| A | lowestPrice |
| B | diversified |
| C | capacityOptimized |
| D | priceCapacityOptimized |

**(A)** : `lowestPrice`는 가장 저렴한 풀에 집중하여 비용은 최적화하지만 중단 위험이 높다. 단기 워크로드에는 적합하지만 일반 권장 전략이 아니다.

**(B)** : `diversified`는 모든 풀에 균등 분산하여 가용성을 높이지만 비용 최적화가 부족하다. 장기 워크로드에 안정성을 중시할 때 사용한다.

**(C)** : `capacityOptimized`는 용량이 가장 큰 풀을 선택하여 가격을 고려하지 않는다. 비용과 가용성의 균형을 맞추지 못하는 전략이다.

**(D) 정답** : `priceCapacityOptimized`는 최고 용량이 가용한 풀 중 가장 저렴한 풀을 선택하는 전략으로, 비용과 가용성의 균형을 맞추어 대부분의 워크로드에 권장된다.

**핵심 개념:** Spot Fleet 할당 전략

### Q7. Which of the following Security Group characteristics is correct?
**Options:**
- A) Security Groups can have both Allow and Deny rules
- B) All inbound traffic is allowed by default
- C) Security Groups are stateless firewalls
- D) A Security Group can be attached to multiple EC2 instances

**Answer:** D

**해설:**

> **문제:** 다음 Security Group 특성 중 올바른 것은?

| 선지 | 번역 |
|------|------|
| A | Security Group은 Allow와 Deny 규칙 모두 가질 수 있다 |
| B | 모든 인바운드 트래픽이 기본적으로 허용된다 |
| C | Security Group은 stateless 방화벽이다 |
| D | Security Group은 여러 EC2 인스턴스에 연결할 수 있다 |

**(A)** : 보안 그룹은 Allow 규칙만 가질 수 있고 Deny 규칙은 없다. Deny 규칙은 NACL(Network ACL)에서만 설정 가능하다.

**(B)** : 기본적으로 모든 인바운드 트래픽이 차단된다. 명시적으로 Allow 규칙을 추가해야만 인바운드 트래픽이 허용된다.

**(C)** : 보안 그룹은 stateful 방화벽이다. 인바운드를 한 번 허용하면 해당 응답의 아웃바운드는 자동으로 허용된다. Stateless는 NACL의 특성이다.

**(D) 정답** : 보안 그룹은 여러 EC2 인스턴스에 연결할 수 있으며, 하나의 인스턴스에도 여러 보안 그룹을 연결할 수 있다. 이것이 올바른 설명이다.

**핵심 개념:** Security Groups

### Q8. A company needs guaranteed EC2 capacity in a specific Availability Zone for an upcoming event lasting 2 days. They do not want a long-term commitment. Which option should they use?
**Options:**
- A) Reserved Instances
- B) Spot Instances
- C) On-Demand Capacity Reservations
- D) Savings Plans

**Answer:** C

**해설:**

> **문제:** 한 회사가 2일간 진행되는 이벤트를 위해 특정 Availability Zone에서 EC2 용량을 보장받아야 한다. 장기 약정을 원하지 않는다. 어떤 옵션을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Reserved 인스턴스 |
| B | Spot 인스턴스 |
| C | On-Demand Capacity Reservations |
| D | Savings Plans |

**(A)** : Reserved Instance는 1~3년 장기 약정이 필요하다. 2일간의 단기 이벤트에는 과도한 약정으로 부적합하다.

**(B)** : Spot Instance는 언제든 중단될 수 있어 용량을 보장하지 않는다. 이벤트처럼 용량이 반드시 보장되어야 하는 상황에는 부적합하다.

**(C) 정답** : On-Demand Capacity Reservation은 특정 AZ에 용량을 예약하며 시간 약정이 없어 언제든 생성·취소할 수 있다. 할인은 없지만(On-Demand 가격) 용량을 보장하며 단기 이벤트에 적합하다.

**(D)** : Savings Plans도 1~3년 사용량 약정이 필요하다. 단기 이벤트에는 과도한 약정으로 부적합하다.

**핵심 개념:** EC2 Capacity Reservations