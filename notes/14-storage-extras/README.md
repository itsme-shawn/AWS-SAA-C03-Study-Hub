# AWS Storage Extras

## 개요
AWS의 다양한 스토리지 서비스(Snow Family, FSx, Storage Gateway, Transfer Family, DataSync)에 대한 심화 학습 섹션이다. 시험에서 "온프레미스-클라우드 하이브리드 스토리지", "대용량 데이터 마이그레이션", "파일 시스템 선택" 관련 문제에서 핵심적으로 출제된다.

## 핵심 개념

### AWS Snowball (Snow Family)
> **왜 필요한가?** 100TB 데이터를 1Gbps 인터넷으로 전송하면 이론상 12일이 걸린다. 실제 업무망은 공유 대역폭이라 더 걸린다. Snowball은 "인터넷보다 배송이 빠르다"는 역설에서 출발했다. AWS가 물리적 하드디스크 장치를 보내주면, 회사가 데이터를 복사해서 다시 AWS로 배송하면 S3에 업로드해준다.

- 보안이 강화된 휴대용 장치로 데이터 수집, 엣지 컴퓨팅(현장 처리), AWS로의 데이터 마이그레이션(이전) 수행
- **네트워크로 1주일 이상 걸리면 Snowball 사용 권장**

| 장치 | vCPU | 메모리 | 스토리지(SSD) |
|------|------|--------|--------------|
| Snowball Edge Storage Optimized | 104 | 416 GB | 210 TB |
| Snowball Edge Compute Optimized | 104 | 416 GB | 28 TB |

- 데이터 전송 시간 예시: 100TB를 10Gbps로 전송 시 약 30시간, 1Gbps로는 12일

### Edge Computing
- 인터넷이 제한되거나 컴퓨팅 파워가 없는 엣지 환경(트럭, 선박, 광산 등)에서 데이터 처리
- Snowball Edge에서 EC2 인스턴스나 Lambda 함수 실행 가능
- 사용 사례: 데이터 전처리, 머신 러닝, 미디어 트랜스코딩

### Snow Family 데이터 전송 흐름

```text
 [온프레미스 데이터센터]
        │
        │  ① Snowball 장치 수령
        ▼
 ┌──────────────┐     ② 데이터 로드
 │   Snowball   │◀────────────────── 80TB~210TB 데이터
 │   Edge       │
 └──────┬───────┘
        │  ③ AWS로 배송
        ▼
 ┌──────────────┐     ④ S3에 Import
 │  Amazon S3   │─────────────────────────────────────┐
 │  (Standard)  │                                     │
 └──────┬───────┘                                     │
        │  ⑤ Lifecycle Policy                         │ ✗ 직접 불가!
        ▼                                             ▼
 ┌──────────────┐                              ┌──────────────┐
 │  S3 Glacier  │                              │  S3 Glacier  │
 │  (아카이브)  │                              │  (직접 import│
 └──────────────┘                              │   불가!)     │
                                               └──────────────┘
```

### Snowball -> Glacier 아키텍처
- **Snowball은 Glacier에 직접 import 불가**
- S3에 먼저 import -> S3 Lifecycle Policy로 Glacier로 전환

### Amazon FSx 개요
> **왜 필요한가?** S3는 파일 시스템이 아닌 객체 스토리지라 Windows의 드라이브처럼 마운트하거나 파일 시스템 API(NFS, SMB 등)로 직접 접근할 수 없다. EFS는 Linux NFS만 지원한다. FSx는 윈도우용(SMB), 고성능 컴퓨팅용(Lustre) 등 특수 목적 완전 관리형 파일 시스템을 AWS에서 제공한다. 기존 온프레미스 파일 서버를 클라우드로 그대로 옮기거나, 고성능 분산 파일 시스템이 필요할 때 선택한다.

```text
 ┌───────────────────── Amazon FSx 선택 가이드 ──────────────────────┐
 │                                                                   │
 │  Windows + SMB + AD?  ──────▶  FSx for Windows File Server        │
 │                               (SMB, NTFS, DFS, Multi-AZ)         │
 │                                                                   │
 │  HPC / ML + S3 통합?  ──────▶  FSx for Lustre                    │
 │                               (병렬 분산, 100s GB/s, sub-ms)     │
 │                                                                   │
 │  NFS+SMB+iSCSI 모두?  ──────▶  FSx for NetApp ONTAP              │
 │                               (멀티 프로토콜, 모든 OS 호환)      │
 │                                                                   │
 │  NFS + 고성능 범용?   ──────▶  FSx for OpenZFS                    │
 │                               (NFS, 1M IOPS, <0.5ms)             │
 └───────────────────────────────────────────────────────────────────┘
```

AWS에서 서드파티 고성능 파일 시스템을 제공하는 완전 관리형 서비스

### FSx for Windows File Server
- Windows 파일 시스템 공유 드라이브 (SMB 프로토콜, Windows NTFS)
- Microsoft Active Directory 통합, ACL, 사용자 할당량
- Linux EC2에도 마운트 가능
- DFS(Distributed File System) Namespaces 지원
- SSD (지연 민감), HDD (범용)
- 온프레미스에서 VPN/Direct Connect로 접근 가능
- Multi-AZ 구성 가능, 매일 S3에 백업

### FSx for Lustre
- 대규모 컴퓨팅용 병렬 분산 파일 시스템 ("Linux" + "cluster")
- HPC, ML, 비디오 처리, 금융 모델링 등
- 100s GB/s, 수백만 IOPS, sub-ms 지연
- **S3와 seamless 통합**: S3를 파일 시스템으로 읽기/쓰기
- **Scratch File System**: 임시 스토리지, 복제 없음, 고성능 burst (6x), 단기 처리/비용 최적화
- **Persistent File System**: 장기 스토리지, 동일 AZ 내 복제, 민감한 데이터/장기 처리

### FSx for NetApp ONTAP
- NFS, SMB, iSCSI 프로토콜 호환
- Linux, Windows, MacOS, VMware Cloud on AWS, WorkSpaces, EC2/ECS/EKS 지원
- 스토리지 자동 확장/축소, 스냅샷, 복제, 압축, 데이터 중복 제거
- **Point-in-time 즉시 복제** (새 워크로드 테스트용)

### FSx for OpenZFS
- NFS (v3, v4, v4.1, v4.2) 호환
- 최대 1,000,000 IOPS, < 0.5ms 지연
- 스냅샷, 압축, Point-in-time 즉시 복제

### AWS Storage Gateway
> **왜 필요한가?** 회사의 온프레미스(사내 서버실) 애플리케이션을 당장 클라우드로 이전하기 어렵지만, 스토리지만큼은 AWS를 활용하고 싶을 때 사용한다. Storage Gateway는 온프레미스 서버와 AWS 사이에 설치하는 "중간 다리" 역할을 하며, 기존 애플리케이션은 NFS, SMB, iSCSI 같은 익숙한 파일 프로토콜로 Gateway에 접근하고, Gateway가 데이터를 AWS 클라우드에 저장한다.

```text
 ┌─────────────────────────────────────────────────────────────────┐
 │                    AWS Storage Gateway 타입별 구조               │
 ├─────────────────────┬──────────────────┬────────────────────────┤
 │  S3 File Gateway    │  Volume Gateway  │   Tape Gateway         │
 │                     │                  │                        │
 │  NFS / SMB          │  iSCSI           │   iSCSI VTL            │
 │       │             │       │          │       │                │
 │       ▼             │       ▼          │       ▼                │
 │  ┌──────────┐       │  ┌──────────┐    │  ┌──────────┐          │
 │  │ 로컬캐시 │       │  │Cached/   │    │  │ Virtual  │          │
 │  │ (최근용) │       │  │Stored    │    │  │ Tape     │          │
 │  └────┬─────┘       │  └────┬─────┘    │  │ Library  │          │
 │       │             │       │          │  └────┬─────┘          │
 │       ▼             │       ▼          │       ▼                │
 │  Amazon S3          │  Amazon S3       │  Amazon S3             │
 │  (Std/IA/IT)        │  + EBS Snapshot  │  + S3 Glacier          │
 └─────────────────────┴──────────────────┴────────────────────────┘

 [온프레미스 서버] ──프로토콜──▶ [Storage Gateway] ──▶ [AWS Cloud]
```

- 온프레미스와 클라우드 데이터 간의 브릿지
- 사용 사례: 재해 복구, 백업/복원, 계층형 스토리지, 온프레미스 캐시

#### S3 File Gateway
- NFS/SMB 프로토콜로 S3 버킷 접근
- 최근 사용 데이터를 게이트웨이에 캐싱
- S3 Standard, Standard-IA, One Zone-IA, Intelligent-Tiering 지원
- Lifecycle Policy로 S3 Glacier 전환
- SMB: Active Directory 통합

#### Volume Gateway
- iSCSI 프로토콜, S3 기반 블록 스토리지
- EBS 스냅샷으로 백업하여 온프레미스 볼륨 복원 가능
- **Cached volumes**: 최근 데이터 저지연 접근
- **Stored volumes**: 전체 데이터셋 온프레미스, S3에 예약 백업

#### Tape Gateway
- 기존 테이프 기반 백업 프로세스를 클라우드로 전환
- VTL(Virtual Tape Library): S3 + Glacier 기반
- 주요 백업 소프트웨어와 호환

### AWS Transfer Family
- FTP/FTPS/SFTP 프로토콜을 통한 S3 또는 EFS 파일 전송
- 완전 관리형, 확장 가능, Multi-AZ
- Active Directory, LDAP, Okta, Cognito 등 외부 인증 시스템 통합

### AWS DataSync
- 온프레미스/타 클라우드 -> AWS 또는 AWS -> AWS 간 대용량 데이터 이동
- 온프레미스에서는 Agent 필요 (Snowcone에 사전 설치)
- S3 (모든 클래스), EFS, FSx로 동기화
- 시간/일/주 단위 예약, 파일 권한 및 메타데이터 보존
- 단일 에이전트 태스크에 10Gbps 사용 가능

## 시험 포인트
- **Snowball은 Glacier 직접 import 불가** -> S3 -> Lifecycle Policy -> Glacier
- **네트워크 전송 1주 이상 시 Snowball 사용** 권장
- FSx for Lustre는 **S3와 seamless 통합** (HPC, ML 워크로드)
- FSx for Windows는 **SMB 프로토콜 + Active Directory** 통합
- FSx for NetApp ONTAP은 **가장 넓은 OS 호환성** (NFS, SMB, iSCSI)
- Storage Gateway 유형: S3 File(NFS/SMB), Volume(iSCSI), Tape(iSCSI VTL)
- Transfer Family: FTP/FTPS/SFTP -> S3 또는 EFS
- DataSync: 온프레미스 -> AWS 마이그레이션, 예약 동기화, 에이전트 필요
- DataSync vs Storage Gateway: DataSync는 일회성/예약 마이그레이션, Storage Gateway는 지속적 하이브리드 접근

## 치트시트
| 기능/서비스 | 설명 |
|------------|------|
| Snowball Edge Storage Optimized | 210TB 스토리지, 대용량 데이터 마이그레이션 |
| Snowball Edge Compute Optimized | 28TB, 엣지 컴퓨팅에 최적화 |
| FSx for Windows | SMB, NTFS, Active Directory, DFS |
| FSx for Lustre | HPC/ML, S3 통합, Scratch/Persistent |
| FSx for NetApp ONTAP | NFS+SMB+iSCSI, 자동 확장, 즉시 복제 |
| FSx for OpenZFS | NFS, 1M IOPS, <0.5ms, 즉시 복제 |
| S3 File Gateway | NFS/SMB -> S3, 로컬 캐시 |
| Volume Gateway | iSCSI -> S3+EBS 스냅샷 |
| Tape Gateway | iSCSI VTL -> S3+Glacier |
| Transfer Family | FTP/FTPS/SFTP -> S3 또는 EFS |
| DataSync | 대용량 데이터 동기화, 에이전트 기반 |

---

## Practice Questions

### Q1. A company needs to migrate 80 TB of data from their on-premises data center to Amazon S3. The company has a 1 Gbps internet connection, but it cannot be fully utilized due to other business traffic. The data must be migrated within 2 weeks. What is the MOST cost-effective solution?
**Options:**
- A) Use AWS DataSync over the existing internet connection
- B) Set up an AWS Direct Connect connection and transfer the data
- C) Order an AWS Snowball Edge Storage Optimized device
- D) Use S3 Transfer Acceleration with multipart upload

**Answer:** C

**해설:**

> **문제:** 회사가 온프레미스 데이터 센터에서 Amazon S3로 80TB의 데이터를 마이그레이션해야 한다. 회사에 1Gbps 인터넷 연결이 있지만, 다른 비즈니스 트래픽으로 인해 전체 대역폭을 사용할 수 없다. 데이터는 2주 이내에 마이그레이션되어야 한다. 가장 비용 효율적인 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 기존 인터넷 연결을 통해 AWS DataSync 사용 |
| B | AWS Direct Connect 연결을 설정하고 데이터 전송 |
| C | AWS Snowball Edge Storage Optimized 장치 주문 |
| D | S3 Transfer Acceleration과 멀티파트 업로드 사용 |

**(A)** : DataSync는 기존 인터넷 연결을 사용하므로 대역폭 제한이 동일하게 적용된다. 2주 내 완료를 보장할 수 없다. → [📖 AWS DataSync](/section/14-storage-extras#aws-datasync)

**(B)** : Direct Connect는 설정에 수주~수개월이 걸린다. 2주 기한에 맞출 수 없는 방법이다. → [📖 Direct Connect DX](/section/25-vpc#direct-connect-dx)

**(C) 정답** : 1Gbps에서 80TB 전송은 이론적으로 약 8일이지만 전체 대역폭을 사용할 수 없어 2주 내 완료가 불확실하다. Snowball Edge Storage Optimized(210TB)를 사용하면 물리적으로 데이터를 전송할 수 있어 가장 안정적이고 비용 효율적이다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(D)** : S3 Transfer Acceleration도 인터넷 연결을 사용하므로 대역폭 제한 문제를 해결하지 못한다. → [📖 S3 Performance 최적화](/section/11-s3-advanced#s3-performance-최적화)

**핵심 개념:** AWS Snowball, 데이터 마이그레이션 시간 계산

**관련 노트:** [AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family), [Snow Family 데이터 전송 흐름](/section/14-storage-extras#snow-family-데이터-전송-흐름)

### Q2. A company wants to import data from Snowball directly into Amazon S3 Glacier for long-term archival. What is the correct approach?
**Options:**
- A) Configure Snowball to import directly into S3 Glacier
- B) Import data into S3 Standard first, then use an S3 Lifecycle Policy to transition to Glacier
- C) Use AWS DataSync to transfer from Snowball to Glacier
- D) Import data into EBS volumes, then create snapshots stored in Glacier

**Answer:** B

**해설:**

> **문제:** 회사가 Snowball에서 장기 보관을 위해 Amazon S3 Glacier로 데이터를 직접 가져오려 한다. 올바른 접근 방식은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Snowball에서 S3 Glacier로 직접 가져오도록 구성 |
| B | S3 Standard에 먼저 가져온 후 S3 Lifecycle Policy를 사용하여 Glacier로 전환 |
| C | AWS DataSync를 사용하여 Snowball에서 Glacier로 전송 |
| D | EBS 볼륨에 데이터를 가져온 후 Glacier에 저장되는 스냅샷 생성 |

**(A)** : Snowball은 S3 Glacier에 직접 import를 지원하지 않는다. 불가능한 방법이다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(B) 정답** : Snowball은 S3 Standard에만 import할 수 있다. S3에 먼저 import한 후 S3 Lifecycle Policy를 사용하여 Glacier로 전환해야 한다. 시험에서 자주 출제되는 중요한 제한 사항이다. → [📖 Snowball -> Glacier 아키텍처](/section/14-storage-extras#snowball-glacier-아키텍처)

**(C)** : DataSync는 온프레미스에서 AWS로 데이터를 동기화하는 서비스이다. Snowball에서 직접 Glacier로 전송하는 용도가 아니다. → [📖 AWS DataSync](/section/14-storage-extras#aws-datasync)

**(D)** : EBS 볼륨을 경유하는 방식은 불필요하게 복잡하고 비용이 더 많이 든다. 올바른 접근 방식이 아니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** Snowball -> S3 -> Lifecycle Policy -> Glacier

**관련 노트:** [Snowball -> Glacier 아키텍처](/section/14-storage-extras#snowball-glacier-아키텍처), [AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

### Q3. A company is running a high-performance computing (HPC) workload that requires a shared file system with sub-millisecond latency. The data is stored in S3 and needs to be processed by hundreds of EC2 instances. Which storage solution is MOST appropriate?
**Options:**
- A) Amazon EFS with Max I/O performance mode
- B) Amazon FSx for Lustre with S3 integration
- C) Amazon FSx for Windows File Server
- D) Amazon S3 with S3 Select

**Answer:** B

**해설:**

> **문제:** 회사가 sub-millisecond 지연의 공유 파일 시스템이 필요한 고성능 컴퓨팅(HPC) 워크로드를 실행하고 있다. 데이터는 S3에 저장되어 있으며 수백 개의 EC2 인스턴스가 처리해야 한다. 가장 적합한 스토리지 솔루션은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | Max I/O 성능 모드의 Amazon EFS |
| B | S3 통합이 있는 Amazon FSx for Lustre |
| C | Amazon FSx for Windows File Server |
| D | S3 Select를 사용하는 Amazon S3 |

**(A)** : EFS도 공유 파일 시스템이지만 HPC에 최적화되어 있지 않다. Lustre 수준의 sub-ms 지연과 수백만 IOPS를 제공하지 않는다. → [📖 Amazon EFS Elastic File System](/section/05-ec2-instance-storage#amazon-efs-elastic-file-system)

**(B) 정답** : FSx for Lustre는 HPC 워크로드를 위한 병렬 분산 파일 시스템으로 sub-ms 지연, 수백만 IOPS를 제공하며 S3와 seamless하게 통합된다. S3 데이터를 읽어 처리하고 결과를 다시 S3에 쓸 수 있다. → [📖 FSx for Lustre](/section/14-storage-extras#fsx-for-lustre)

**(C)** : FSx for Windows는 SMB 프로토콜 기반의 Windows 파일 서버 대체용이다. HPC 워크로드에 적합하지 않다. → [📖 FSx for Windows File Server](/section/14-storage-extras#fsx-for-windows-file-server)

**(D)** : S3 Select는 파일 시스템이 아닌 S3 내 데이터를 SQL로 쿼리하는 기능이다. 공유 파일 시스템이 아니다.

**핵심 개념:** FSx for Lustre, S3 통합, HPC

**관련 노트:** [FSx for Lustre](/section/14-storage-extras#fsx-for-lustre)

### Q4. A company is migrating their on-premises Windows file server to AWS. The application uses SMB protocol and authenticates users through Microsoft Active Directory. Which AWS service should they use?
**Options:**
- A) Amazon EFS
- B) Amazon FSx for Lustre
- C) Amazon FSx for Windows File Server
- D) Amazon S3 with S3 File Gateway

**Answer:** C

**해설:**

> **문제:** 회사가 온프레미스 Windows 파일 서버를 AWS로 마이그레이션하고 있다. 애플리케이션은 SMB 프로토콜을 사용하며 Microsoft Active Directory를 통해 사용자를 인증한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon EFS |
| B | Amazon FSx for Lustre |
| C | Amazon FSx for Windows File Server |
| D | S3 File Gateway가 있는 Amazon S3 |

**(A)** : EFS는 NFS 프로토콜(Linux 기반) 파일 시스템이다. SMB 프로토콜을 지원하지 않는다. → [📖 Amazon EFS Elastic File System](/section/05-ec2-instance-storage#amazon-efs-elastic-file-system)

**(B)** : FSx for Lustre는 HPC/ML 워크로드용 병렬 분산 파일 시스템이다. Windows 파일 서버 대체에 적합하지 않다. → [📖 FSx for Lustre](/section/14-storage-extras#fsx-for-lustre)

**(C) 정답** : FSx for Windows File Server는 SMB 프로토콜과 Windows NTFS를 지원하며 Microsoft Active Directory와 통합된다. DFS, ACL 등 Windows 파일 서버의 모든 기능을 제공하는 완벽한 대체 솔루션이다. → [📖 FSx for Windows File Server](/section/14-storage-extras#fsx-for-windows-file-server)

**(D)** : S3 File Gateway는 NFS/SMB로 S3에 접근할 수 있지만 DFS, ACL 등 Windows 파일 서버의 모든 기능을 제공하지 않는다. → [📖 AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

**핵심 개념:** FSx for Windows File Server, SMB, Active Directory

**관련 노트:** [FSx for Windows File Server](/section/14-storage-extras#fsx-for-windows-file-server)

### Q5. A company needs to provide on-premises applications with low-latency access to frequently used data while storing the full dataset in Amazon S3. Which solution should the solutions architect recommend?
**Options:**
- A) AWS DataSync with scheduled synchronization
- B) Amazon S3 File Gateway with local caching
- C) AWS Snowball Edge with S3 interface
- D) Amazon FSx for NetApp ONTAP

**Answer:** B

**해설:**

> **문제:** 회사가 전체 데이터셋을 Amazon S3에 저장하면서 온프레미스 애플리케이션에 자주 사용하는 데이터에 대한 저지연 접근을 제공해야 한다. 솔루션 아키텍트는 어떤 솔루션을 추천해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 예약 동기화가 있는 AWS DataSync |
| B | 로컬 캐싱이 있는 Amazon S3 File Gateway |
| C | S3 인터페이스가 있는 AWS Snowball Edge |
| D | Amazon FSx for NetApp ONTAP |

**(A)** : DataSync는 예약 기반 데이터 동기화 서비스이다. 지속적인 로컬 캐시를 제공하지 않아 저지연 접근 요구사항을 충족하지 못한다. → [📖 AWS DataSync](/section/14-storage-extras#aws-datasync)

**(B) 정답** : S3 File Gateway는 NFS/SMB 프로토콜로 S3 버킷에 접근하면서 최근 사용 데이터를 로컬에 캐싱하여 저지연 접근을 제공한다. 전체 데이터는 S3에 저장되면서 자주 사용하는 데이터는 빠르게 접근할 수 있다. → [📖 AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

**(C)** : Snowball Edge는 일회성 데이터 전송 및 엣지 컴퓨팅용이다. 지속적인 하이브리드 접근에 적합하지 않다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(D)** : FSx for NetApp ONTAP은 AWS 클라우드 내 파일 시스템이다. 온프레미스 캐싱 솔루션이 아니다. → [📖 FSx for NetApp ONTAP](/section/14-storage-extras#fsx-for-netapp-ontap)

**핵심 개념:** S3 File Gateway, 로컬 캐시

**관련 노트:** [AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

### Q6. A company needs to transfer files to Amazon S3 using SFTP protocol. External partners must authenticate using their existing corporate LDAP directory. Which AWS service meets this requirement?
**Options:**
- A) Amazon S3 with pre-signed URLs
- B) AWS Transfer Family
- C) AWS DataSync
- D) Amazon S3 File Gateway

**Answer:** B

**해설:**

> **문제:** 회사가 SFTP 프로토콜을 사용하여 Amazon S3로 파일을 전송해야 한다. 외부 파트너는 기존 기업 LDAP 디렉토리를 사용하여 인증해야 한다. 이 요구사항을 충족하는 AWS 서비스는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 사전 서명된 URL이 있는 Amazon S3 |
| B | AWS Transfer Family |
| C | AWS DataSync |
| D | Amazon S3 File Gateway |

**(A)** : Pre-signed URLs는 SFTP 프로토콜을 지원하지 않는다. HTTP/HTTPS 기반이며 LDAP 인증 통합도 불가능하다. → [📖 S3 Pre-Signed URLs](/section/12-s3-security#s3-presigned-urls)

**(B) 정답** : AWS Transfer Family는 SFTP/FTPS/FTP 프로토콜을 통한 S3/EFS 파일 전송을 지원하며 LDAP, Active Directory, Okta, Cognito 등 외부 인증 시스템과 통합된다. SFTP와 LDAP 인증 요구사항을 모두 충족한다. → [📖 AWS Transfer Family](/section/14-storage-extras#aws-transfer-family)

**(C)** : DataSync는 대용량 데이터 동기화/마이그레이션용 서비스이다. SFTP 파일 전송 프로토콜을 제공하지 않는다. → [📖 AWS DataSync](/section/14-storage-extras#aws-datasync)

**(D)** : S3 File Gateway는 NFS/SMB 프로토콜을 사용한다. SFTP를 지원하지 않는다. → [📖 AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

**핵심 개념:** AWS Transfer Family, SFTP, 외부 인증 통합

**관련 노트:** [AWS Transfer Family](/section/14-storage-extras#aws-transfer-family)

### Q7. A company needs to synchronize data from their on-premises NFS server to Amazon EFS on a daily schedule. File permissions must be preserved during the transfer. Which AWS service should they use?
**Options:**
- A) AWS Storage Gateway
- B) AWS Transfer Family
- C) AWS DataSync
- D) AWS Snowball Edge

**Answer:** C

**해설:**

> **문제:** 회사가 온프레미스 NFS 서버에서 Amazon EFS로 일일 예약 스케줄로 데이터를 동기화해야 한다. 전송 중 파일 권한이 보존되어야 한다. 어떤 AWS 서비스를 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS Storage Gateway |
| B | AWS Transfer Family |
| C | AWS DataSync |
| D | AWS Snowball Edge |

**(A)** : Storage Gateway는 지속적인 하이브리드 접근용이다. 일일 예약 동기화 기능에 특화되어 있지 않다. → [📖 AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway)

**(B)** : Transfer Family는 FTP/SFTP/FTPS 프로토콜 기반 파일 전송 서비스이다. 예약 동기화 및 파일 권한 보존에 특화된 서비스가 아니다. → [📖 AWS Transfer Family](/section/14-storage-extras#aws-transfer-family)

**(C) 정답** : AWS DataSync는 온프레미스에서 AWS로 대용량 데이터 이동을 지원하며 시간/일/주 단위 예약 동기화가 가능하다. NFS POSIX 파일 권한 및 메타데이터를 보존하며 S3, EFS, FSx 등 다양한 대상을 지원한다. → [📖 AWS DataSync](/section/14-storage-extras#aws-datasync)

**(D)** : Snowball Edge는 물리적 데이터 전송 장치이다. 일일 예약 동기화에 적합하지 않다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**핵심 개념:** AWS DataSync, 예약 동기화, 메타데이터 보존

**관련 노트:** [AWS DataSync](/section/14-storage-extras#aws-datasync)

### Q8. A company needs a file system that supports NFS, SMB, and iSCSI protocols simultaneously, and must work with Linux, Windows, MacOS, and VMware Cloud on AWS. Which FSx option should they choose?
**Options:**
- A) Amazon FSx for Windows File Server
- B) Amazon FSx for Lustre
- C) Amazon FSx for NetApp ONTAP
- D) Amazon FSx for OpenZFS

**Answer:** C

**해설:**

> **문제:** 회사가 NFS, SMB, iSCSI 프로토콜을 동시에 지원하는 파일 시스템이 필요하며, Linux, Windows, MacOS, VMware Cloud on AWS와 호환되어야 한다. 어떤 FSx 옵션을 선택해야 하는가?

| 선지 | 번역 |
|------|------|
| A | Amazon FSx for Windows File Server |
| B | Amazon FSx for Lustre |
| C | Amazon FSx for NetApp ONTAP |
| D | Amazon FSx for OpenZFS |

**(A)** : FSx for Windows File Server는 SMB 프로토콜만 지원한다. NFS나 iSCSI 요구사항을 충족하지 못한다. → [📖 FSx for Windows File Server](/section/14-storage-extras#fsx-for-windows-file-server)

**(B)** : FSx for Lustre는 HPC/ML용 병렬 분산 파일 시스템이다. 멀티 프로토콜(NFS, SMB, iSCSI)을 지원하지 않는다. → [📖 FSx for Lustre](/section/14-storage-extras#fsx-for-lustre)

**(C) 정답** : FSx for NetApp ONTAP은 NFS, SMB, iSCSI 프로토콜을 모두 지원하며 Linux, Windows, MacOS, VMware Cloud on AWS와 호환된다. 가장 넓은 OS 및 프로토콜 호환성을 제공한다. → [📖 FSx for NetApp ONTAP](/section/14-storage-extras#fsx-for-netapp-ontap)

**(D)** : FSx for OpenZFS는 NFS 프로토콜만 지원한다. SMB와 iSCSI 요구사항을 충족하지 못한다. → [📖 FSx for OpenZFS](/section/14-storage-extras#fsx-for-openzfs)

**핵심 개념:** FSx for NetApp ONTAP, 멀티 프로토콜 지원

**관련 노트:** [FSx for NetApp ONTAP](/section/14-storage-extras#fsx-for-netapp-ontap)
