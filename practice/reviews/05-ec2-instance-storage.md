# Section 05 - EC2 Instance Storage 연습문제 해설

---

### Q1. A company needs a shared file system that can be accessed by EC2 instances running in multiple AZs. The instances are running Amazon Linux. Which storage option is MOST appropriate?

**한글 번역:** 한 회사가 여러 AZ에서 실행 중인 EC2 인스턴스가 접근할 수 있는 공유 파일 시스템이 필요합니다. 인스턴스는 Amazon Linux를 실행하고 있습니다. 가장 적합한 스토리지 옵션은 무엇입니까?

**선지:**
- A) Amazon EBS with Multi-Attach → Multi-Attach가 있는 Amazon EBS
- B) Amazon EFS → Amazon EFS
- C) Amazon S3 → Amazon S3
- D) EC2 Instance Store → EC2 Instance Store

**정답:** B

**선지별 해설:**
- **A) EBS Multi-Attach:** EBS Multi-Attach는 io1/io2 볼륨에서만 지원되며, 같은 AZ 내의 인스턴스에서만 공유할 수 있습니다. 여러 AZ에 걸친 공유가 불가능하므로 요구 사항을 충족하지 못합니다.
- **B) Amazon EFS:** 정답입니다. EFS(Elastic File System)는 여러 AZ에 걸쳐 수백 개의 EC2 인스턴스에서 동시에 마운트할 수 있는 관리형 NFS(Network File System)입니다. Linux 기반 인스턴스에서 사용 가능하며(NFSv4 프로토콜), 자동으로 확장/축소됩니다. Amazon Linux와 완벽하게 호환됩니다.
- **C) Amazon S3:** S3는 객체 스토리지이며, POSIX 호환 파일 시스템이 아닙니다. 파일 시스템으로 직접 마운트할 수 없으므로(S3 Mountpoint 제외) 공유 파일 시스템 요구 사항에 적합하지 않습니다.
- **D) EC2 Instance Store:** Instance Store는 호스트 컴퓨터에 물리적으로 연결된 임시 스토리지입니다. 인스턴스 간 공유가 불가능하고, 인스턴스 중지/종료 시 데이터가 손실됩니다.

**핵심 개념:** Amazon EFS - 다중 AZ 공유 파일 시스템, Linux(NFS), 자동 확장

---

### Q2. An application requires more than 64,000 IOPS with sub-millisecond latency. Which EBS volume type should be used?

**한글 번역:** 애플리케이션이 64,000 IOPS를 초과하는 성능과 밀리초 미만의 지연 시간을 요구합니다. 어떤 EBS 볼륨 유형을 사용해야 합니까?

**선지:**
- A) gp3 → gp3
- B) io1 → io1
- C) io2 Block Express → io2 Block Express
- D) st1 → st1

**정답:** C

**선지별 해설:**
- **A) gp3:** gp3는 최대 16,000 IOPS를 지원합니다. 64,000 IOPS를 초과하는 요구 사항을 충족할 수 없습니다.
- **B) io1:** io1은 최대 64,000 IOPS를 지원합니다(Nitro 인스턴스 기준). "64,000 IOPS를 초과"해야 하므로 부족합니다.
- **C) io2 Block Express:** 정답입니다. io2 Block Express는 최대 256,000 IOPS를 지원하며, 밀리초 미만의 지연 시간을 제공합니다. 최고 성능의 EBS 볼륨으로, 가장 까다로운 I/O 집약적 워크로드(대규모 데이터베이스 등)에 적합합니다. IOPS:GiB 비율은 최대 1000:1입니다.
- **D) st1:** st1은 처리량 최적화 HDD로, IOPS가 아닌 처리량(MB/s)에 최적화되어 있습니다. 최대 500 IOPS만 지원하며, 요구 사항과 전혀 맞지 않습니다.

**핵심 개념:** io2 Block Express - 최대 256,000 IOPS, 밀리초 미만 지연 시간, 최고 성능 EBS

---

### Q3. A Solutions Architect needs to reduce storage costs for EBS snapshots that are rarely accessed but must be retained for compliance. What should they do?

**한글 번역:** Solutions Architect가 거의 접근하지 않지만 규정 준수를 위해 보관해야 하는 EBS 스냅샷의 스토리지 비용을 줄여야 합니다. 어떻게 해야 합니까?

**선지:**
- A) Delete the snapshots and recreate them when needed → 스냅샷을 삭제하고 필요할 때 다시 생성
- B) Move the snapshots to EBS Snapshot Archive → 스냅샷을 EBS 스냅샷 아카이브로 이동
- C) Enable Fast Snapshot Restore → 빠른 스냅샷 복원 활성화
- D) Convert the snapshots to HDD volumes → 스냅샷을 HDD 볼륨으로 변환

**정답:** B

**선지별 해설:**
- **A) 삭제 후 재생성:** 규정 준수를 위해 보관해야 하므로 삭제할 수 없습니다. 또한 삭제된 스냅샷은 재생성할 수 없습니다.
- **B) EBS Snapshot Archive:** 정답입니다. EBS Snapshot Archive는 거의 접근하지 않는 스냅샷을 75% 더 저렴한 아카이브 스토리지 계층으로 이동할 수 있습니다. 아카이브에서 복원하는 데 24~72시간이 소요되지만, 장기 보관 규정 준수 목적에 적합합니다.
- **C) Fast Snapshot Restore:** FSR은 스냅샷에서 볼륨을 생성할 때 초기화 지연을 제거하는 기능입니다. 비용을 줄이는 것이 아니라 오히려 추가 비용이 발생합니다.
- **D) HDD 볼륨으로 변환:** 스냅샷을 볼륨으로 변환하면 스냅샷보다 비용이 높아질 수 있으며, 볼륨은 지속적으로 비용이 발생합니다. 비용 절감 방법이 아닙니다.

**핵심 개념:** EBS Snapshot Archive - 75% 비용 절감, 복원 시 24~72시간 소요, 장기 보관용

---

### Q4. Which EBS volume type has IOPS that scale automatically with volume size?

**한글 번역:** 볼륨 크기에 따라 IOPS가 자동으로 확장되는 EBS 볼륨 유형은 무엇입니까?

**선지:**
- A) gp3 → gp3
- B) gp2 → gp2
- C) io1 → io1
- D) st1 → st1

**정답:** B

**선지별 해설:**
- **A) gp3:** gp3는 IOPS와 처리량을 볼륨 크기와 독립적으로 설정할 수 있습니다. 기본 3,000 IOPS가 제공되며, 최대 16,000 IOPS까지 별도로 프로비저닝할 수 있습니다. 크기에 따라 자동으로 확장되지 않습니다.
- **B) gp2:** 정답입니다. gp2는 볼륨 크기에 비례하여 IOPS가 자동으로 확장됩니다. 1GiB당 3 IOPS의 비율로, 최소 100 IOPS에서 최대 16,000 IOPS(5,334GiB 이상)까지 확장됩니다. 또한 작은 볼륨에 대해 최대 3,000 IOPS의 버스트 크레딧을 제공합니다.
- **C) io1:** io1은 IOPS를 수동으로 프로비저닝해야 합니다. 볼륨 크기와 독립적으로 IOPS를 설정할 수 있습니다(비율 제한 있음).
- **D) st1:** st1은 처리량 최적화 HDD로, IOPS가 아닌 처리량에 최적화되어 있습니다. 볼륨 크기에 따라 처리량이 확장되지만, IOPS 확장과는 다릅니다.

**핵심 개념:** gp2 - 1GiB당 3 IOPS 자동 확장 / gp3 - IOPS 독립 설정 가능 (기본 3,000)

---

### Q5. A company wants to encrypt an existing unencrypted EBS volume. What is the correct procedure?

**한글 번역:** 한 회사가 기존의 암호화되지 않은 EBS 볼륨을 암호화하려고 합니다. 올바른 절차는 무엇입니까?

**선지:**
- A) Enable encryption directly on the existing volume → 기존 볼륨에서 직접 암호화 활성화
- B) Create a snapshot, copy the snapshot with encryption enabled, create a new encrypted volume from the snapshot → 스냅샷 생성, 암호화를 활성화하여 스냅샷 복사, 스냅샷에서 새 암호화된 볼륨 생성
- C) Attach a new encrypted volume and copy the data manually → 새 암호화된 볼륨을 연결하고 데이터를 수동으로 복사
- D) Use AWS KMS to encrypt the volume in place → AWS KMS를 사용하여 볼륨을 제자리에서 암호화

**정답:** B

**선지별 해설:**
- **A) 기존 볼륨에서 직접 암호화:** 틀립니다. 기존의 암호화되지 않은 EBS 볼륨을 직접 암호화할 수 없습니다. 스냅샷을 통한 간접적인 방법을 사용해야 합니다.
- **B) 스냅샷 → 암호화된 복사본 → 볼륨 생성:** 정답입니다. 올바른 절차는: (1) 암호화되지 않은 볼륨의 스냅샷을 생성합니다. (2) 스냅샷을 복사할 때 암호화를 활성화합니다. (3) 암호화된 스냅샷에서 새 EBS 볼륨을 생성합니다. (4) 새 암호화된 볼륨을 인스턴스에 연결합니다.
- **C) 수동 데이터 복사:** 기술적으로 가능하지만, 올바른 절차가 아닙니다. 스냅샷을 통한 방법이 표준이고 AWS가 권장하는 방식입니다.
- **D) KMS로 제자리 암호화:** KMS는 암호화 키를 관리하지만, EBS 볼륨을 제자리에서 암호화하는 기능을 직접 제공하지 않습니다.

**핵심 개념:** EBS 암호화 절차 - 스냅샷 → 암호화된 복사본 → 새 볼륨 생성

---

### Q6. Which storage option provides the HIGHEST I/O performance for an EC2 instance?

**한글 번역:** EC2 인스턴스에 가장 높은 I/O 성능을 제공하는 스토리지 옵션은 무엇입니까?

**선지:**
- A) EBS gp3 → EBS gp3
- B) EBS io2 Block Express → EBS io2 Block Express
- C) EC2 Instance Store → EC2 Instance Store
- D) Amazon EFS Max I/O → Amazon EFS Max I/O

**정답:** C

**선지별 해설:**
- **A) EBS gp3:** gp3는 최대 16,000 IOPS를 제공합니다. 좋은 범용 성능이지만 최고 수준은 아닙니다.
- **B) EBS io2 Block Express:** io2 Block Express는 최대 256,000 IOPS를 제공하며 EBS 중에서는 최고이지만, Instance Store보다는 낮습니다. EBS는 네트워크를 통해 연결되므로 물리적으로 연결된 스토리지보다 지연 시간이 높습니다.
- **C) EC2 Instance Store:** 정답입니다. Instance Store는 호스트 컴퓨터에 물리적으로 직접 연결된 디스크이므로 가장 높은 I/O 성능을 제공합니다. 수백만 IOPS와 매우 낮은 지연 시간을 달성할 수 있습니다. 단, 임시 스토리지이므로 인스턴스 중지/종료 시 데이터가 손실됩니다. 캐시, 버퍼, 임시 데이터에 적합합니다.
- **D) EFS Max I/O:** EFS Max I/O 모드는 높은 처리량과 많은 수의 병렬 연결을 지원하지만, 단일 인스턴스의 I/O 성능은 Instance Store보다 낮습니다.

**핵심 개념:** EC2 Instance Store - 최고 I/O 성능, 물리적 연결, 임시 스토리지 (휘발성)

---

### Q7. A company runs a clustered Linux application (Teradata) that requires multiple EC2 instances to simultaneously read and write to the same storage volume in the same AZ. Which solution should they use?

**한글 번역:** 한 회사가 같은 AZ에서 여러 EC2 인스턴스가 동일한 스토리지 볼륨에 동시에 읽기와 쓰기를 해야 하는 클러스터형 Linux 애플리케이션(Teradata)을 실행합니다. 어떤 솔루션을 사용해야 합니까?

**선지:**
- A) Amazon EFS → Amazon EFS
- B) EBS gp3 with Multi-Attach → Multi-Attach가 있는 EBS gp3
- C) EBS io1/io2 with Multi-Attach → Multi-Attach가 있는 EBS io1/io2
- D) Amazon S3 → Amazon S3

**정답:** C

**선지별 해설:**
- **A) Amazon EFS:** EFS는 다중 AZ 공유 파일 시스템이지만, 여기서는 "같은 AZ에서 동일한 스토리지 볼륨"이라는 요구 사항입니다. EFS는 블록 스토리지가 아닌 파일 시스템이며, Teradata와 같은 클러스터형 애플리케이션은 일반적으로 블록 스토리지를 필요로 합니다.
- **B) EBS gp3 Multi-Attach:** 틀립니다. Multi-Attach 기능은 gp3에서 지원되지 않습니다. io1/io2(Provisioned IOPS) 볼륨에서만 지원됩니다.
- **C) EBS io1/io2 Multi-Attach:** 정답입니다. EBS Multi-Attach는 io1/io2 볼륨을 같은 AZ 내의 최대 16개 EC2 인스턴스에 동시에 연결할 수 있게 합니다. 클러스터형 애플리케이션(Teradata 등)이 동일한 볼륨에 동시 읽기/쓰기가 필요할 때 사용합니다. 단, 클러스터 인식(cluster-aware) 파일 시스템을 사용해야 합니다.
- **D) Amazon S3:** S3는 객체 스토리지이며, EC2 인스턴스에 블록 스토리지로 마운트할 수 없습니다. 클러스터형 데이터베이스의 공유 스토리지로는 부적합합니다.

**핵심 개념:** EBS Multi-Attach - io1/io2만 지원, 같은 AZ 내 최대 16개 인스턴스, 클러스터용

---

### Q8. An EFS file system has files that are accessed frequently for the first 30 days but rarely after that. How can the company optimize storage costs?

**한글 번역:** EFS 파일 시스템에 처음 30일간은 자주 접근하지만 이후에는 거의 접근하지 않는 파일이 있습니다. 회사가 스토리지 비용을 어떻게 최적화할 수 있습니까?

**선지:**
- A) Manually move files to S3 after 30 days → 30일 후 파일을 S3로 수동 이동
- B) Use EFS Lifecycle Policy to automatically move files to EFS Infrequent Access → EFS 수명 주기 정책을 사용하여 파일을 EFS 비빈번 접근 계층으로 자동 이동
- C) Create a new EFS file system for old files → 오래된 파일을 위한 새 EFS 파일 시스템 생성
- D) Use EBS snapshots for archival → 보관을 위해 EBS 스냅샷 사용

**정답:** B

**선지별 해설:**
- **A) S3로 수동 이동:** 수동 이동은 운영 부담이 크고, 파일을 S3로 이동하면 EFS에서 더 이상 파일 시스템으로 접근할 수 없습니다. 자동화된 솔루션이 선호됩니다.
- **B) EFS Lifecycle Policy + IA 계층:** 정답입니다. EFS Lifecycle Policy를 설정하면 지정된 기간(예: 30일) 동안 접근하지 않은 파일을 자동으로 EFS Infrequent Access(EFS-IA) 스토리지 클래스로 이동합니다. EFS-IA는 표준 대비 최대 92% 비용이 절감됩니다. 파일은 여전히 같은 파일 시스템에서 투명하게 접근할 수 있습니다.
- **C) 새 EFS 파일 시스템 생성:** 불필요한 복잡성을 추가하며, 비용 최적화에 도움이 되지 않습니다. 두 파일 시스템의 관리 부담이 증가합니다.
- **D) EBS 스냅샷 사용:** EBS 스냅샷은 EFS와 관련이 없습니다. EFS는 EBS와 별개의 서비스입니다.

**핵심 개념:** EFS Lifecycle Policy + EFS-IA - 자동 비용 최적화, 최대 92% 절감, 투명한 접근

---
