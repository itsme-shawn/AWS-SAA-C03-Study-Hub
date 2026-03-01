# Amazon EC2 - Instance Storage

## 개요
EC2 인스턴스의 스토리지 옵션(EBS, Instance Store, EFS)을 다루는 섹션으로, SAA-C03 시험에서 매우 자주 출제된다. 특히 EBS 볼륨 타입별 차이, EBS vs EFS vs Instance Store 비교, 스토리지 선택 시나리오가 핵심이다.

## 핵심 개념

### EBS (Elastic Block Store)

#### 기본 특성
- **네트워크 드라이브** (물리적 드라이브가 아님) → 약간의 지연 발생 가능
- 인스턴스 실행 중 연결하는 네트워크 스토리지
- 인스턴스 종료 후에도 **데이터 영속** 가능
- **특정 AZ에 종속** (다른 AZ로 이동하려면 스냅샷 필요)
- **IOPS(Input/Output Operations Per Second)**: 저장장치가 1초에 처리할 수 있는 읽기/쓰기 작업 횟수. 숫자가 클수록 빠른 저장장치. 예) IOPS 3,000 = 1초에 3,000번 읽거나 쓸 수 있음
- **Throughput(처리량)**: 1초에 전송할 수 있는 데이터 양(단위: MiB/s). IOPS가 "작업 횟수"라면 Throughput은 "데이터 양". 동영상·로그처럼 큰 파일을 연속으로 읽을 때는 IOPS보다 Throughput이 더 중요
- **프로비저닝된 용량**(GB, IOPS)에 대해 과금
- 용량은 시간이 지나면서 증가 가능
- 비유: "네트워크 USB 스틱"

#### EBS 연결 규칙
- 기본적으로 **하나의 인스턴스에만 마운트** 가능 (CCP 레벨)
- 예외: **io1/io2 Multi-Attach** (같은 AZ 내 최대 16개 EC2에 동시 연결)
- 하나의 인스턴스에 여러 EBS 볼륨 연결 가능
- 연결되지 않은 EBS 볼륨도 존재 가능

#### Delete on Termination
- **Root EBS 볼륨**: 기본 삭제 활성화
- **추가 EBS 볼륨**: 기본 삭제 비활성화
- AWS Console/CLI에서 변경 가능
- Root 볼륨 보존 시 비활성화 설정 필요

### EBS Snapshots

#### 기본 기능
- EBS 볼륨의 특정 시점 백업
- 볼륨 분리 불필요 (권장은 분리 후 스냅샷)
- **AZ 또는 Region 간 스냅샷 복사 가능**

#### Snapshot 기능들
| 기능 | 설명 |
|------|------|
| **Snapshot Archive** | 아카이브 티어로 이동, 75% 저렴, 복원 24~72시간 |
| **Recycle Bin** | 삭제된 스냅샷 복구 규칙, 보존 기간 1일~1년 |
| **Fast Snapshot Restore (FSR)** | 첫 사용 시 지연 없도록 전체 초기화 강제, 비용 높음 |

### AMI (Amazon Machine Image)
- EC2 인스턴스의 커스터마이징 이미지
- 소프트웨어, 설정, OS, 모니터링 등을 사전 패키징 → **빠른 부팅**
- **특정 리전용** (다른 리전으로 복사 가능)
- 소스:
  - Public AMI (AWS 제공)
  - 자체 AMI (직접 생성/유지)
  - AWS Marketplace AMI (제3자 제공/판매)

#### AMI 생성 프로세스
1. EC2 인스턴스 시작 및 커스터마이징
2. 인스턴스 **중지** (데이터 무결성)
3. AMI 빌드 (EBS 스냅샷 자동 생성)
4. 다른 AMI로부터 인스턴스 런칭

### EC2 Instance Store
- **고성능 하드웨어 디스크** (물리적으로 연결된 로컬 스토리지)
- EBS보다 **훨씬 높은 I/O 성능** (매우 높은 IOPS)
- 왜 더 빠른가? EBS는 네트워크를 경유해 데이터를 주고받는 "네트워크 드라이브"이지만, Instance Store는 서버 내부에 물리적으로 장착된 디스크이므로 네트워크 지연이 없음. USB 메모리를 컴퓨터에 직접 꽂은 것과, 네트워크를 통해 연결된 외장 드라이브의 속도 차이를 생각하면 됨
- **인스턴스 중지 시 데이터 소멸** (Ephemeral Storage - 휘발성 스토리지)
- 적합: 버퍼, 캐시, 스크래치 데이터, 임시 콘텐츠
- 하드웨어 장애 시 데이터 손실 위험
- **백업/복제는 사용자 책임**

### EBS Volume Types (6가지)

```text
EBS 볼륨 타입 선택 플로우
==========================

  [어떤 스토리지가 필요한가?]
         │
         ├── 부트 볼륨 (OS) 필요?
         │      │
         │      └── 예 → SSD만 가능 (gp2/gp3/io1/io2)
         │                HDD(st1/sc1)는 부트 불가!
         │
         ├── IOPS 요구사항은?
         │      │
         │      ├── ~16,000 IOPS
         │      │      │
         │      │      ├── 크기-IOPS 연동 OK → gp2
         │      │      └── 독립 조절 필요    → gp3
         │      │
         │      ├── ~64,000 IOPS
         │      │      └── io1 (Nitro 인스턴스)
         │      │
         │      └── ~256,000 IOPS + 서브밀리초
         │             └── io2 Block Express
         │
         └── 처리량(Throughput) 위주?
                │
                ├── 빅데이터/로그/스트리밍
                │      └── st1 (500 MiB/s, 500 IOPS)
                │
                └── 비활성/아카이브 데이터
                       └── sc1 (250 MiB/s, 최저 비용)

  ┌─────────────────────────────────────────────────┐
  │  SSD (부트 가능)          HDD (부트 불가)        │
  │  gp2 ─ gp3 ─ io1 ─ io2   st1 ─── sc1          │
  │  ◀── 범용 ──▶ ◀── 고성능  ◀─처리량─▶ ◀─최저가  │
  │     ~16K        ~256K      ~500       ~250      │
  │     IOPS        IOPS       MiB/s      MiB/s    │
  └─────────────────────────────────────────────────┘
```

#### SSD 기반 (부트 볼륨 가능)
| 타입 | 용도 | IOPS | 크기 | 특징 |
|------|------|------|------|------|
| **gp3** | 범용 SSD | 기본 3,000, 최대 16,000 | 1 GiB~16 TiB | IOPS/처리량 독립 조절 |
| **gp2** | 범용 SSD | 3 IOPS/GiB, 최대 16,000 | 1 GiB~16 TiB | 크기와 IOPS 연동, 버스트 3,000 |
| **io1** | Provisioned IOPS SSD | 최대 64,000 (Nitro) / 32,000 | 4 GiB~16 TiB | IOPS 독립 조절, Multi-Attach |
| **io2 Block Express** | 최고 성능 SSD | 최대 256,000 | 4 GiB~64 TiB | 서브밀리초 지연, 1,000:1 비율, Multi-Attach |

#### HDD 기반 (부트 볼륨 불가)
| 타입 | 용도 | 최대 IOPS | 최대 처리량 | 크기 |
|------|------|---------|----------|------|
| **st1** | Throughput Optimized HDD | 500 | 500 MiB/s | 125 GiB~16 TiB |
| **sc1** | Cold HDD | 250 | 250 MiB/s | 125 GiB~16 TiB |

#### gp2 vs gp3 핵심 차이
- **gp2**: 볼륨 크기와 IOPS가 연동 (3 IOPS/GiB, 5,334 GiB에서 최대 IOPS 도달)
- **gp3**: 기본 3,000 IOPS, IOPS와 처리량을 **독립적으로** 조절 가능

### EBS Multi-Attach (io1/io2)
- **같은 AZ** 내 최대 **16개 EC2 인스턴스**에 동시 연결
- 각 인스턴스에 풀 읽기/쓰기 권한
- **클러스터 인식 파일 시스템** 필요 (XFS, EXT4 불가)
- 사용 사례: 클러스터 Linux 앱 (예: Teradata), 고가용성

### EBS Encryption
- 저장 데이터 암호화 (at rest)
- 전송 중 데이터 암호화 (in transit)
- 모든 스냅샷 암호화
- 스냅샷으로 생성된 볼륨도 암호화
- 투명하게 처리 (사용자 작업 불필요)
- 지연 시간에 미미한 영향
- **KMS (AES-256)** 키 사용
- **비암호화 스냅샷 복사 시 암호화 가능**

#### 비암호화 EBS → 암호화 EBS 전환
1. 비암호화 볼륨의 스냅샷 생성
2. 스냅샷 복사 시 암호화 활성화
3. 암호화된 스냅샷으로 새 볼륨 생성
4. 암호화된 볼륨을 인스턴스에 연결

```text
비암호화 EBS → 암호화 EBS 전환 프로세스
========================================

  ┌──────────────┐   1. 스냅샷    ┌──────────────┐
  │  EBS Volume  │ ────────────▶ │   Snapshot   │
  │  (비암호화)   │   생성        │  (비암호화)   │
  └──────────────┘               └──────┬───────┘
                                        │
                                 2. 복사 시
                                    암호화 활성화
                                        │
                                        ▼
                                 ┌──────────────┐
                                 │   Snapshot   │
                                 │  (암호화됨)   │
                                 │  [KMS AES-256]│
                                 └──────┬───────┘
                                        │
                                 3. 새 볼륨 생성
                                        │
                                        ▼
  ┌──────────────┐   4. 연결     ┌──────────────┐
  │     EC2      │ ◀──────────── │  EBS Volume  │
  │   Instance   │               │  (암호화됨)   │
  └──────────────┘               └──────────────┘
```

### Amazon EFS (Elastic File System)

#### 기본 특성
- **관리형 NFS** (Network File System)
- **Multi-AZ**에서 다수의 EC2 인스턴스에 동시 마운트
- 고가용성, 확장성, 비용 높음 (gp2의 3배)
- **사용량 기반 과금** (프로비저닝 불필요)
- NFSv4.1 프로토콜, Security Group으로 접근 제어
- **Linux 기반 AMI만 호환** (Windows 미지원)
- KMS로 저장 시 암호화
- POSIX 파일 시스템, 자동 확장

#### Performance 설정
| 설정 | 옵션 | 설명 |
|------|------|------|
| **Performance Mode** | General Purpose (기본) | 저지연, 웹 서버/CMS |
| | Max I/O | 높은 지연, 높은 처리량, 빅데이터/미디어 |
| **Throughput Mode** | Bursting | 1TB = 50MiB/s + 버스트 100MiB/s |
| | Provisioned | 스토리지 크기와 무관하게 처리량 설정 |
| | Elastic | 워크로드에 따라 자동 스케일, 읽기 3GiB/s, 쓰기 1GiB/s |

#### Storage Classes
| 계층 | 설명 |
|------|------|
| **Standard** | 자주 접근하는 파일 |
| **Infrequent Access (EFS-IA)** | 파일 검색 비용 있음, 저장 비용 저렴 |
| **Archive** | 거의 접근하지 않는 데이터, 50% 저렴 |

- **Lifecycle Policy**로 스토리지 계층 간 자동 이동

#### Availability & Durability
| 옵션 | 설명 |
|------|------|
| **Standard** | Multi-AZ, 프로덕션용 |
| **One Zone** | 단일 AZ, 개발용, 기본 백업 활성화, IA 호환, 90%+ 비용 절감 |

### EBS vs EFS vs Instance Store 비교 (시험 핵심!)

```text
EBS vs EFS vs Instance Store 아키텍처 비교
============================================

  ── EBS: 네트워크 블록 스토리지 (AZ 종속) ──────────
  ┌─── AZ-1a ───────────────────────┐
  │  ┌──────────┐     ┌──────────┐  │
  │  │   EC2    │◀───▶│   EBS    │  │
  │  │ Instance │네트워크│  Volume  │  │
  │  └──────────┘     └──────────┘  │
  │                                  │
  │  * 1 인스턴스 : 1 볼륨 (기본)    │
  │  * io1/io2: Multi-Attach 가능   │
  │  * 스냅샷으로 AZ 간 이동        │
  └──────────────────────────────────┘

  ── Instance Store: 물리 디스크 (최고 성능) ────────
  ┌─── Physical Host ───────────────┐
  │  ┌──────────┬──────────────┐    │
  │  │   EC2    │  Instance    │    │
  │  │ Instance │  Store       │    │
  │  │          │ (물리 디스크) │    │
  │  └──────────┴──────────────┘    │
  │                                  │
  │  * 최고 IOPS (네트워크 무관)     │
  │  * 인스턴스 중지 = 데이터 소멸!  │
  │  * 캐시, 버퍼, 임시 데이터용    │
  └──────────────────────────────────┘

  ── EFS: 관리형 NFS (Multi-AZ 공유) ───────────────
  ┌─── AZ-1a ────────┐  ┌─── AZ-1b ────────┐
  │  ┌──────────┐     │  │     ┌──────────┐  │
  │  │  EC2 (A) │     │  │     │  EC2 (B) │  │
  │  └────┬─────┘     │  │     └────┬─────┘  │
  │       │           │  │          │         │
  └───────┼───────────┘  └──────────┼─────────┘
          │    ┌──────────────┐     │
          └───▶│     EFS      │◀────┘
               │ (NFS 공유)   │
               │              │
               │ * Linux만    │
               │ * 자동 확장  │
               │ * 사용량 과금│
               └──────────────┘
```

| 특성 | EBS | EFS | Instance Store |
|------|-----|-----|---------------|
| 연결 | 단일 인스턴스 (Multi-Attach 예외) | 수백 개 인스턴스 | 단일 인스턴스 |
| AZ | 단일 AZ 종속 | Multi-AZ | 단일 인스턴스 종속 |
| 영속성 | 영구적 | 영구적 | 임시 (Ephemeral) |
| 성능 | 좋음 (타입에 따라) | 높은 처리량 | 최고 IOPS |
| OS | 모두 | Linux만 | 모두 |
| 비용 | 프로비저닝 기반 | 사용량 기반 (비쌈) | 인스턴스에 포함 |
| 이동 | 스냅샷으로 AZ 간 이동 | Multi-AZ 기본 | 이동 불가 |

## 시험 포인트
- **gp2 vs gp3**: gp2는 크기-IOPS 연동, gp3는 독립 조절
- **io1/io2**: 16,000 IOPS 이상 필요 시, Multi-Attach 지원
- **HDD(st1, sc1)는 부트 볼륨으로 사용 불가**
- EBS는 AZ 종속, 이동하려면 스냅샷 → 복원
- EFS는 Linux만, Multi-AZ, 사용량 기반 과금
- Instance Store는 최고 성능이지만 데이터 소멸 가능
- EBS 암호화: 비암호화→암호화는 스냅샷 복사를 통해
- EBS Multi-Attach: io1/io2만, 같은 AZ, 최대 16개 인스턴스
- Fast Snapshot Restore: 비용 높지만 첫 사용 시 지연 제거
- Root EBS는 기본 삭제, 추가 EBS는 기본 유지

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| EBS | 네트워크 블록 스토리지, AZ 종속, 1인스턴스(기본) |
| gp2 | 범용 SSD, 크기-IOPS 연동, 최대 16,000 IOPS |
| gp3 | 범용 SSD, IOPS/처리량 독립 조절, 기본 3,000 IOPS |
| io1/io2 | Provisioned IOPS SSD, Multi-Attach, 최대 64K/256K IOPS |
| st1 | Throughput Optimized HDD, 빅데이터/로그, 500 IOPS |
| sc1 | Cold HDD, 비활성 데이터, 최저 비용, 250 IOPS |
| Instance Store | 물리 디스크, 최고 IOPS, 데이터 소멸 가능 |
| EFS | 관리형 NFS, Multi-AZ, Linux만, 사용량 과금 |
| EFS-IA | 저빈도 접근 계층, 저장 비용 저렴 |
| Snapshot Archive | 75% 저렴, 복원 24~72시간 |
| Fast Snapshot Restore | 첫 사용 지연 제거, 고비용 |

---

## Practice Questions

### Q1. A company needs a shared file system that can be accessed by EC2 instances running in multiple Availability Zones. The instances are running Amazon Linux. Which storage option is MOST appropriate?
**Options:**
- A) Amazon EBS with Multi-Attach
- B) Amazon EFS
- C) Amazon S3
- D) EC2 Instance Store

**Answer:** B

**해설:**

> **문제:** 한 회사가 여러 Availability Zone에서 실행되는 EC2 인스턴스가 접근할 수 있는 공유 파일 시스템이 필요하다. 인스턴스는 Amazon Linux를 실행 중이다. 가장 적합한 스토리지 옵션은?

| 선지 | 번역 |
|------|------|
| A | Multi-Attach를 사용한 Amazon EBS |
| B | Amazon EFS |
| C | Amazon S3 |
| D | EC2 Instance Store |

**상세 풀이:** Amazon EFS는 Multi-AZ에서 여러 EC2 인스턴스에 동시 마운트 가능한 관리형 NFS이며, Linux 인스턴스에서 사용 가능하여 공유 파일 시스템 요구사항에 적합하다. A의 EBS Multi-Attach는 io1/io2 볼륨 타입에서만 지원되며 같은 AZ 내에서만 가능하므로 Multi-AZ 요구사항을 충족하지 못하고, C의 S3는 객체 스토리지로 POSIX 파일 시스템이 아니어서 일반적인 파일 시스템으로 마운트할 수 없으며, D의 Instance Store는 인스턴스에 물리적으로 연결된 로컬 스토리지로 다른 인스턴스와 공유가 불가능하다.

**핵심 개념:** Amazon EFS vs EBS

### Q2. An application requires more than 64,000 IOPS with sub-millisecond latency. Which EBS volume type should be used?
**Options:**
- A) gp3
- B) io1
- C) io2 Block Express
- D) st1

**Answer:** C

**해설:**

> **문제:** 애플리케이션이 서브밀리초 지연으로 64,000 IOPS 이상이 필요하다. 어떤 EBS 볼륨 타입을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | gp3 |
| B | io1 |
| C | io2 Block Express |
| D | st1 |

**상세 풀이:** io2 Block Express는 최대 256,000 IOPS와 서브밀리초 지연을 제공하는 최고 성능 EBS 볼륨이다. A의 gp3는 범용 SSD로 최대 16,000 IOPS까지만 지원하여 64,000 IOPS 요구사항에 크게 미달하고, B의 io1은 Nitro 인스턴스에서 최대 64,000 IOPS까지 지원하지만 "64,000 초과"를 충족하지 못하며, D의 st1은 HDD 기반으로 최대 500 IOPS에 불과하여 고성능 IOPS 요구사항에 전혀 부적합하다.

**핵심 개념:** EBS Volume Types - io2 Block Express

### Q3. A Solutions Architect needs to reduce storage costs for EBS snapshots that are rarely accessed but must be retained for compliance. What should they do?
**Options:**
- A) Delete the snapshots and recreate them when needed
- B) Move the snapshots to EBS Snapshot Archive
- C) Enable Fast Snapshot Restore
- D) Convert the snapshots to HDD volumes

**Answer:** B

**해설:**

> **문제:** Solutions Architect가 거의 접근하지 않지만 규정 준수를 위해 보존해야 하는 EBS 스냅샷의 스토리지 비용을 줄여야 한다. 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 스냅샷을 삭제하고 필요할 때 다시 생성 |
| B | 스냅샷을 EBS Snapshot Archive로 이동 |
| C | Fast Snapshot Restore 활성화 |
| D | 스냅샷을 HDD 볼륨으로 변환 |

**상세 풀이:** EBS Snapshot Archive는 아카이브 티어로 스냅샷을 이동하여 75% 비용을 절감하며, 복원에 24~72시간이 소요되지만 거의 접근하지 않는 규정 준수용 스냅샷에 적합하다. A의 스냅샷 삭제 후 재생성은 규정 준수 요건에 위배되며 원본 데이터가 변경되었을 수 있어 동일한 스냅샷을 재생성할 수 없고, C의 Fast Snapshot Restore는 오히려 비용이 크게 증가하는 프리미엄 기능이며, D의 HDD 볼륨으로 변환은 스냅샷을 볼륨으로 복원하는 것이므로 추가 스토리지 비용이 발생하여 비용 절감이 아니다.

**핵심 개념:** EBS Snapshot Archive

### Q4. Which EBS volume type has IOPS that scale automatically with volume size?
**Options:**
- A) gp3
- B) gp2
- C) io1
- D) st1

**Answer:** B

**해설:**

> **문제:** 볼륨 크기에 따라 IOPS가 자동으로 증가하는 EBS 볼륨 타입은?

| 선지 | 번역 |
|------|------|
| A | gp3 |
| B | gp2 |
| C | io1 |
| D | st1 |

**상세 풀이:** gp2는 볼륨 크기에 비례하여 IOPS가 자동으로 증가하며(3 IOPS/GiB), 5,334 GiB에서 최대 16,000 IOPS에 도달한다. A의 gp3는 기본 3,000 IOPS를 제공하고 IOPS를 크기와 독립적으로 수동 설정할 수 있어 자동 증가가 아니며, C의 io1도 IOPS를 사용자가 직접 프로비저닝하는 방식으로 크기와 자동 연동되지 않고, D의 st1은 HDD 기반으로 IOPS 중심이 아닌 처리량(throughput) 중심의 볼륨이다.

**핵심 개념:** gp2 vs gp3

### Q5. A company wants to encrypt an existing unencrypted EBS volume. What is the correct procedure?
**Options:**
- A) Enable encryption directly on the existing volume
- B) Create a snapshot, copy the snapshot with encryption enabled, create a new encrypted volume from the snapshot
- C) Attach a new encrypted volume and copy the data manually
- D) Use AWS KMS to encrypt the volume in place

**Answer:** B

**해설:**

> **문제:** 한 회사가 기존 비암호화 EBS 볼륨을 암호화하려 한다. 올바른 절차는?

| 선지 | 번역 |
|------|------|
| A | 기존 볼륨에 직접 암호화 활성화 |
| B | 스냅샷 생성 후 암호화를 활성화하여 스냅샷 복사, 암호화된 스냅샷에서 새 볼륨 생성 |
| C | 새 암호화 볼륨을 연결하고 데이터를 수동으로 복사 |
| D | AWS KMS를 사용하여 볼륨을 현재 위치에서 암호화 |

**상세 풀이:** 기존 비암호화 EBS 볼륨을 암호화하려면: 스냅샷 생성 → 스냅샷 복사 시 암호화 활성화 → 암호화된 스냅샷으로 새 볼륨 생성 → 인스턴스에 연결하는 절차를 따라야 한다. A의 기존 볼륨에 직접 암호화 활성화는 EBS에서 지원하지 않는 기능이며, C의 수동 데이터 복사는 가능하지만 비효율적이고 권장되는 방법이 아니며, D의 KMS로 현재 위치에서 암호화하는 것도 EBS에서 직접 지원하지 않는 기능이다.

**핵심 개념:** EBS Encryption

### Q6. Which storage option provides the HIGHEST I/O performance for an EC2 instance?
**Options:**
- A) EBS gp3
- B) EBS io2 Block Express
- C) EC2 Instance Store
- D) Amazon EFS Max I/O

**Answer:** C

**해설:**

> **문제:** EC2 인스턴스에 가장 높은 I/O 성능을 제공하는 스토리지 옵션은?

| 선지 | 번역 |
|------|------|
| A | EBS gp3 |
| B | EBS io2 Block Express |
| C | EC2 Instance Store |
| D | Amazon EFS Max I/O |

**상세 풀이:** EC2 Instance Store는 물리적으로 인스턴스에 연결된 로컬 디스크로, 네트워크 오버헤드 없이 최고의 I/O 성능(매우 높은 IOPS)을 제공한다. A의 EBS gp3는 네트워크를 통해 연결되며 최대 16,000 IOPS로 제한되고, B의 io2 Block Express는 EBS 중 최고 성능이지만 여전히 네트워크 스토리지이므로 Instance Store의 물리적 연결 속도에는 미치지 못하며, D의 EFS Max I/O는 네트워크 파일 시스템으로 처리량은 높지만 지연 시간이 더 길다. 단, Instance Store는 데이터가 인스턴스 중지 시 소멸되므로 임시 데이터(캐시, 버퍼)에만 적합하다.

**핵심 개념:** EC2 Instance Store

### Q7. A company runs a clustered Linux application (Teradata) that requires multiple EC2 instances to simultaneously read and write to the same storage volume in the same Availability Zone. Which solution should they use?
**Options:**
- A) Amazon EFS
- B) EBS gp3 with Multi-Attach
- C) EBS io1/io2 with Multi-Attach
- D) Amazon S3

**Answer:** C

**해설:**

> **문제:** 한 회사가 같은 Availability Zone에서 여러 EC2 인스턴스가 동일 스토리지 볼륨에 동시에 읽기/쓰기해야 하는 클러스터 Linux 애플리케이션(Teradata)을 실행하고 있다. 어떤 솔루션을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon EFS |
| B | Multi-Attach를 사용한 EBS gp3 |
| C | Multi-Attach를 사용한 EBS io1/io2 |
| D | Amazon S3 |

**상세 풀이:** EBS Multi-Attach는 io1/io2 패밀리에서만 지원되며, 같은 AZ 내 최대 16개 EC2 인스턴스에 동시 연결할 수 있어 Teradata와 같은 클러스터 앱에 적합하다. A의 EFS는 네트워크 파일 시스템으로 공유가 가능하지만, Teradata처럼 블록 스토리지가 필요한 클러스터 애플리케이션에는 EBS Multi-Attach가 더 적합하며, B의 gp3는 Multi-Attach를 지원하지 않는 볼륨 타입이고, D의 S3는 객체 스토리지로 블록 수준의 동시 읽기/쓰기에는 적합하지 않다.

**핵심 개념:** EBS Multi-Attach - io1/io2

### Q8. An EFS file system has files that are accessed frequently for the first 30 days but rarely after that. How can the company optimize storage costs?
**Options:**
- A) Manually move files to S3 after 30 days
- B) Use EFS Lifecycle Policy to automatically move files to EFS Infrequent Access
- C) Create a new EFS file system for old files
- D) Use EBS snapshots for archival

**Answer:** B

**해설:**

> **문제:** EFS 파일 시스템에 처음 30일간 자주 접근하지만 그 이후에는 거의 접근하지 않는 파일이 있다. 회사가 스토리지 비용을 어떻게 최적화할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 30일 후 파일을 S3로 수동 이동 |
| B | EFS Lifecycle Policy를 사용하여 EFS Infrequent Access로 자동 이동 |
| C | 오래된 파일을 위한 새 EFS 파일 시스템 생성 |
| D | 아카이브를 위해 EBS 스냅샷 사용 |

**상세 풀이:** EFS Lifecycle Policy를 설정하면 지정된 기간(예: 30일) 동안 접근되지 않은 파일을 자동으로 Standard에서 Infrequent Access(EFS-IA) 계층으로 이동하여 저장 비용을 절감한다. A의 S3로 수동 이동은 운영 부담이 크고 자동화되지 않으며 EFS에서 S3로 직접 이동하는 기본 메커니즘이 없고, C의 별도 EFS 파일 시스템 생성은 복잡하고 비효율적이며, D의 EBS 스냅샷은 EFS와 전혀 다른 스토리지 서비스이므로 EFS 파일을 EBS 스냅샷으로 아카이브하는 것은 적합하지 않다.

**핵심 개념:** EFS Storage Classes & Lifecycle Policy