# Section 14 - Storage Extras 연습문제 해설

---

### Q1. Company needs to migrate 80TB of data to S3. 1 Gbps internet connection (not fully utilizable). Must be done within 2 weeks. Most cost-effective solution?

**한글 번역:** 회사가 80TB의 데이터를 S3로 마이그레이션해야 합니다. 1Gbps 인터넷 연결(완전히 활용할 수 없음)이 있습니다. 2주 이내에 완료해야 합니다. 가장 비용 효율적인 솔루션은 무엇입니까?

**선지:**
- A) AWS DataSync over internet → 인터넷을 통한 AWS DataSync
- B) Set up AWS Direct Connect → AWS Direct Connect 설정
- C) Order AWS Snowball Edge Storage Optimized → AWS Snowball Edge Storage Optimized 주문
- D) S3 Transfer Acceleration with multipart upload → 멀티파트 업로드를 사용하는 S3 Transfer Acceleration

**정답:** C

**선지별 해설:**
- **A) AWS DataSync over internet:** 1Gbps를 완전히 활용할 수 없다고 명시되어 있습니다. 가령 500Mbps로 전송한다면 80TB 전송에 약 15일 이상이 소요되어 2주 기한을 맞추기 어렵습니다. 또한 네트워크 전송 비용도 발생합니다.
- **B) AWS Direct Connect:** Direct Connect 설정에는 보통 수주~수개월이 걸립니다. 2주 이내 완료라는 시간 제약을 전혀 충족할 수 없습니다. 비용도 매우 높습니다.
- **C) Snowball Edge Storage Optimized:** 정답입니다. Snowball Edge Storage Optimized는 최대 80TB의 데이터를 저장할 수 있습니다. 주문 후 약 1주일 내에 수령하여 데이터를 로드하고 AWS로 반송하면 2주 이내에 충분히 완료할 수 있습니다. 네트워크 대역폭에 의존하지 않으며, 대용량 데이터 전송에 가장 비용 효율적입니다.
- **D) S3 Transfer Acceleration:** Transfer Acceleration은 전송 속도를 향상시키지만, 근본적으로 인터넷 대역폭의 한계를 극복할 수 없습니다. 1Gbps를 완전히 활용할 수 없는 상황에서 80TB 전송은 여전히 오래 걸립니다.

**핵심 개념:** 대용량 데이터(수십 TB) + 제한된 대역폭 + 시간 제약 = AWS Snowball

---

### Q2. Company wants to import data from Snowball directly into S3 Glacier. What is the correct approach?

**한글 번역:** 회사가 Snowball에서 S3 Glacier로 직접 데이터를 가져오려고 합니다. 올바른 접근 방식은 무엇입니까?

**선지:**
- A) Configure Snowball to import directly into Glacier → Snowball이 Glacier로 직접 가져오도록 구성
- B) Import into S3 Standard first then lifecycle policy to Glacier → 먼저 S3 Standard로 가져온 다음 수명 주기 정책으로 Glacier로 이동
- C) Use DataSync from Snowball to Glacier → Snowball에서 Glacier로 DataSync 사용
- D) Import into EBS volumes then create snapshots → EBS 볼륨으로 가져온 다음 스냅샷 생성

**정답:** B

**선지별 해설:**
- **A) Snowball to Glacier directly:** Snowball은 S3 Glacier로 직접 데이터를 가져올 수 없습니다. Snowball은 S3 Standard 또는 S3 Standard-IA 등의 스토리지 클래스로만 직접 가져오기가 가능합니다.
- **B) S3 Standard → Lifecycle policy → Glacier:** 정답입니다. 올바른 접근 방식은 먼저 S3 Standard로 데이터를 가져온 다음, S3 수명 주기 정책(Lifecycle Policy)을 설정하여 자동으로 Glacier로 전환하는 것입니다. 이것이 AWS가 권장하는 표준 방법입니다.
- **C) DataSync from Snowball to Glacier:** DataSync는 Snowball과 직접 연동하지 않으며, Glacier를 직접 대상으로 지정할 수도 없습니다. 이 조합은 유효하지 않습니다.
- **D) Import into EBS then snapshots:** EBS 볼륨으로 가져온 후 스냅샷을 만드는 것은 불필요하게 복잡하고 비효율적입니다. S3/Glacier로의 데이터 이동에 적합한 방법이 아닙니다.

**핵심 개념:** Snowball → S3 Standard → Lifecycle Policy → S3 Glacier (직접 Glacier 불가)

---

### Q3. HPC workload requires shared file system with sub-millisecond latency. Data stored in S3, processed by hundreds of EC2 instances. Which storage?

**한글 번역:** HPC 워크로드에 밀리초 미만의 지연 시간을 가진 공유 파일 시스템이 필요합니다. 데이터는 S3에 저장되어 있으며 수백 개의 EC2 인스턴스로 처리됩니다. 어떤 스토리지를 사용해야 합니까?

**선지:**
- A) Amazon EFS with Max I/O → Max I/O를 사용하는 Amazon EFS
- B) Amazon FSx for Lustre with S3 integration → S3 통합을 제공하는 Amazon FSx for Lustre
- C) Amazon FSx for Windows File Server → Amazon FSx for Windows File Server
- D) Amazon S3 with S3 Select → S3 Select를 사용하는 Amazon S3

**정답:** B

**선지별 해설:**
- **A) Amazon EFS with Max I/O:** EFS Max I/O는 높은 처리량을 제공하지만, 지연 시간이 밀리초 단위로 상대적으로 높습니다. "밀리초 미만(sub-millisecond)" 지연 시간 요구사항을 충족하지 못합니다. 또한 S3와의 네이티브 통합이 없습니다.
- **B) FSx for Lustre with S3 integration:** 정답입니다. FSx for Lustre는 HPC에 최적화된 고성능 파일 시스템으로, (1) 밀리초 미만의 지연 시간, (2) 수백 대의 인스턴스에서 동시 접근 가능, (3) S3와 네이티브 통합(S3의 데이터를 투명하게 파일 시스템으로 제공)을 지원합니다.
- **C) FSx for Windows File Server:** Windows 환경용 SMB 프로토콜 기반 파일 시스템으로, HPC 워크로드에 적합하지 않습니다. Linux 기반 HPC에는 Lustre가 표준입니다.
- **D) Amazon S3 with S3 Select:** S3는 오브젝트 스토리지로 파일 시스템이 아닙니다. 공유 파일 시스템 요구사항을 충족하지 못하며, S3 Select는 쿼리 최적화 기능일 뿐입니다.

**핵심 개념:** HPC + 공유 파일 시스템 + sub-millisecond 지연 + S3 통합 = FSx for Lustre

---

### Q4. Company migrating on-premises Windows file server to AWS. Application uses SMB protocol and authenticates through Microsoft Active Directory. Which service?

**한글 번역:** 회사가 온프레미스 Windows 파일 서버를 AWS로 마이그레이션하고 있습니다. 애플리케이션은 SMB 프로토콜을 사용하고 Microsoft Active Directory를 통해 인증합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) Amazon EFS → Amazon EFS
- B) Amazon FSx for Lustre → Amazon FSx for Lustre
- C) Amazon FSx for Windows File Server → Amazon FSx for Windows File Server
- D) Amazon S3 with S3 File Gateway → S3 File Gateway를 사용하는 Amazon S3

**정답:** C

**선지별 해설:**
- **A) Amazon EFS:** EFS는 NFS 프로토콜 기반으로, SMB 프로토콜을 지원하지 않습니다. Windows Active Directory와의 네이티브 통합도 없습니다.
- **B) Amazon FSx for Lustre:** Lustre는 Linux HPC 워크로드용 파일 시스템으로, SMB 프로토콜이나 Active Directory를 지원하지 않습니다.
- **C) Amazon FSx for Windows File Server:** 정답입니다. FSx for Windows File Server는 (1) SMB 프로토콜을 완벽히 지원하고, (2) Microsoft Active Directory와 네이티브 통합되며, (3) Windows 파일 서버의 모든 기능(DFS, 파일 잠금 등)을 제공합니다. Windows 파일 서버 마이그레이션에 가장 적합한 서비스입니다.
- **D) S3 with S3 File Gateway:** File Gateway는 NFS/SMB 인터페이스를 제공하지만, S3를 백엔드로 사용하므로 완전한 Windows 파일 서버 기능(AD 통합, 파일 잠금 등)을 제공하지 못합니다. "마이그레이션"이라는 맥락에서 FSx for Windows가 더 적합합니다.

**핵심 개념:** Windows + SMB + Active Directory = FSx for Windows File Server

---

### Q5. Company needs on-premises apps with low-latency access to frequently used data while storing full dataset in S3. Which solution?

**한글 번역:** 회사는 전체 데이터셋을 S3에 저장하면서 자주 사용하는 데이터에 대해 온프레미스 앱에서 저지연 액세스가 필요합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) AWS DataSync with scheduled synchronization → 예약된 동기화를 사용하는 AWS DataSync
- B) Amazon S3 File Gateway with local caching → 로컬 캐싱을 사용하는 Amazon S3 File Gateway
- C) AWS Snowball Edge with S3 interface → S3 인터페이스를 사용하는 AWS Snowball Edge
- D) Amazon FSx for NetApp ONTAP → Amazon FSx for NetApp ONTAP

**정답:** B

**선지별 해설:**
- **A) AWS DataSync with scheduled synchronization:** DataSync는 데이터 전송/마이그레이션 서비스로, 일정에 따라 데이터를 동기화합니다. 저지연 로컬 캐싱 기능을 제공하지 않으므로 실시간 저지연 접근 요구사항을 충족하지 못합니다.
- **B) Amazon S3 File Gateway with local caching:** 정답입니다. S3 File Gateway는 온프레미스에 설치되어 (1) 자주 접근하는 데이터를 로컬 캐시에 저장하여 저지연 접근을 제공하고, (2) 전체 데이터는 S3에 저장합니다. NFS/SMB 프로토콜로 온프레미스 앱에서 투명하게 접근할 수 있습니다.
- **C) AWS Snowball Edge with S3 interface:** Snowball Edge는 대량 데이터 전송 또는 엣지 컴퓨팅용 디바이스로, 지속적인 캐싱 솔루션이 아닙니다. 일회성 전송에 적합합니다.
- **D) Amazon FSx for NetApp ONTAP:** FSx for NetApp ONTAP은 AWS 클라우드에 배포되는 서비스로, 온프레미스 저지연 캐싱을 직접 제공하지 않습니다(별도의 구성 없이는).

**핵심 개념:** 온프레미스 저지연 캐시 + S3 전체 데이터 저장 = S3 File Gateway

---

### Q6. Company needs to transfer files to S3 using SFTP protocol. External partners authenticate using corporate LDAP. Which service?

**한글 번역:** 회사가 SFTP 프로토콜을 사용하여 S3로 파일을 전송해야 합니다. 외부 파트너가 기업 LDAP를 사용하여 인증합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) Amazon S3 with pre-signed URLs → 미리 서명된 URL을 사용하는 Amazon S3
- B) AWS Transfer Family → AWS Transfer Family
- C) AWS DataSync → AWS DataSync
- D) Amazon S3 File Gateway → Amazon S3 File Gateway

**정답:** B

**선지별 해설:**
- **A) S3 with pre-signed URLs:** Pre-signed URL은 HTTP/HTTPS를 통한 접근 방식으로, SFTP 프로토콜 요구사항을 충족하지 못합니다. 외부 파트너가 SFTP를 사용해야 하는 경우 적합하지 않습니다.
- **B) AWS Transfer Family:** 정답입니다. AWS Transfer Family는 SFTP, FTPS, FTP 프로토콜을 사용하여 S3 또는 EFS로 파일을 전송할 수 있는 완전 관리형 서비스입니다. 외부 ID 공급자(LDAP, Active Directory 등)와의 통합 인증을 지원합니다. SFTP + 외부 인증이라는 두 가지 요구사항을 모두 충족합니다.
- **C) AWS DataSync:** DataSync는 온프레미스와 AWS 간 대량 데이터 동기화에 사용되며, SFTP 프로토콜 인터페이스를 외부 파트너에게 제공하지 않습니다.
- **D) Amazon S3 File Gateway:** File Gateway는 NFS/SMB 프로토콜을 제공하며, SFTP를 지원하지 않습니다. 온프레미스 설치가 필요한 점도 외부 파트너 접근에 적합하지 않습니다.

**핵심 개념:** SFTP/FTPS/FTP 프로토콜로 S3 접근 = AWS Transfer Family

---

### Q7. Company needs to synchronize data from on-premises NFS server to Amazon EFS on a daily schedule. File permissions must be preserved. Which service?

**한글 번역:** 회사가 온프레미스 NFS 서버에서 Amazon EFS로 매일 일정에 따라 데이터를 동기화해야 합니다. 파일 권한이 보존되어야 합니다. 어떤 서비스를 사용해야 합니까?

**선지:**
- A) AWS Storage Gateway → AWS Storage Gateway
- B) AWS Transfer Family → AWS Transfer Family
- C) AWS DataSync → AWS DataSync
- D) AWS Snowball Edge → AWS Snowball Edge

**정답:** C

**선지별 해설:**
- **A) AWS Storage Gateway:** Storage Gateway는 온프레미스와 AWS 간 하이브리드 스토리지 솔루션으로, 데이터 동기화보다는 캐싱이나 볼륨 백업에 적합합니다. 예약된 동기화 기능이 DataSync만큼 특화되어 있지 않습니다.
- **B) AWS Transfer Family:** Transfer Family는 SFTP/FTP 프로토콜을 통한 파일 전송 서비스로, NFS 서버에서 EFS로의 자동화된 동기화에 적합하지 않습니다.
- **C) AWS DataSync:** 정답입니다. DataSync는 (1) 온프레미스 NFS에서 Amazon EFS로의 데이터 전송을 지원하고, (2) 파일 메타데이터(권한, 타임스탬프 등)를 보존하며, (3) 일정에 따른 예약 실행을 지원합니다. 정기적인 데이터 동기화에 최적화된 서비스입니다.
- **D) AWS Snowball Edge:** Snowball은 물리적 디바이스를 통한 일회성 대량 데이터 전송에 적합하며, 매일 반복되는 동기화 작업에는 적합하지 않습니다.

**핵심 개념:** 정기적 데이터 동기화 + 메타데이터 보존 + NFS/EFS = AWS DataSync

---

### Q8. Company needs a file system that supports NFS, SMB, and iSCSI protocols simultaneously, and must work with Linux, Windows, MacOS, and VMware Cloud on AWS. Which FSx option?

**한글 번역:** 회사에 NFS, SMB, iSCSI 프로토콜을 동시에 지원하는 파일 시스템이 필요하며, Linux, Windows, MacOS 및 VMware Cloud on AWS에서 작동해야 합니다. 어떤 FSx 옵션을 사용해야 합니까?

**선지:**
- A) FSx for Windows File Server → FSx for Windows File Server
- B) FSx for Lustre → FSx for Lustre
- C) FSx for NetApp ONTAP → FSx for NetApp ONTAP
- D) FSx for OpenZFS → FSx for OpenZFS

**정답:** C

**선지별 해설:**
- **A) FSx for Windows File Server:** Windows File Server는 SMB 프로토콜만 지원합니다. NFS와 iSCSI를 동시에 지원하지 않습니다.
- **B) FSx for Lustre:** Lustre는 Linux HPC 워크로드용으로, POSIX 호환 파일 시스템입니다. SMB나 iSCSI를 지원하지 않으며, Windows/MacOS와의 호환성이 제한적입니다.
- **C) FSx for NetApp ONTAP:** 정답입니다. NetApp ONTAP은 (1) NFS, SMB, iSCSI 프로토콜을 동시에 지원하고, (2) Linux, Windows, MacOS에서 모두 접근 가능하며, (3) VMware Cloud on AWS와 호환됩니다. 멀티 프로토콜, 멀티 OS 환경에서 가장 유연한 FSx 옵션입니다.
- **D) FSx for OpenZFS:** OpenZFS는 NFS 프로토콜을 지원하지만, SMB와 iSCSI를 동시에 지원하지 않습니다. Linux와 MacOS에서 주로 사용되며, NetApp ONTAP만큼의 멀티 프로토콜 유연성은 없습니다.

**핵심 개념:** 멀티 프로토콜(NFS + SMB + iSCSI) + 멀티 OS + VMware = FSx for NetApp ONTAP
