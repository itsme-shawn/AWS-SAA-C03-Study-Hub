# Ditectrev SAA-C03 Practice Questions — Batch 05 (Q201-Q250)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q201. Making your snapshot public shares all snapshot data with everyone. Can the snapshots with AWS Market place product codes be made public?

**Options:**
- A) Yes.
- B) No.

**Answer:** A

**해설:**

> **문제:** 스냅샷을 공개로 설정하면 모든 데이터가 공유됩니다. AWS Marketplace 제품 코드가 있는 스냅샷도 공개로 설정할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니요. |

**(A) 정답** : AWS Marketplace 제품 코드가 포함된 스냅샷도 공개로 설정할 수 있습니다. 단, 공개 스냅샷에서 생성된 볼륨은 제품 코드를 상속받습니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : 틀린 설명입니다. Marketplace 제품 코드가 있어도 스냅샷을 공개로 만들 수 있습니다.

**핵심 개념:** EBS 스냅샷 공개 설정 및 AWS Marketplace 제품 코드 동작

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q202. Which service enables AWS customers to manage users and permissions in AWS?

**Options:**
- A) AWS Access Control Service (ACS).
- B) AWS Identity and Access Management (IAM).

**Answer:** B

**해설:**

> **문제:** AWS 고객이 AWS에서 사용자와 권한을 관리할 수 있게 해주는 서비스는 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | AWS Access Control Service (ACS). |
| B | AWS Identity and Access Management (IAM). |

**(A)** : AWS Access Control Service(ACS)는 실제로 존재하지 않는 서비스입니다.

**(B) 정답** : AWS IAM은 사용자, 그룹, 역할, 정책을 통해 AWS 리소스에 대한 액세스를 안전하게 제어하는 서비스입니다. → [📖 IAM (Identity & Access Management) > 개요](/section/02-iam#개요)

**핵심 개념:** AWS IAM (Identity and Access Management)

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [IAM Roles 역할](/section/02-iam#iam-roles-역할)

---

### Q203. You have launched an EC2 instance with four (4) 500 GB EBS Provisioned IOPS volumes attached. The EC2 instance is EBS-Optimized and supports 500 Mbps throughput between EC2 and EBS. The four EBS volumes are configured as a single RAID 0 device, and each Provisioned IOPS volume is provisioned with 4,000IOPS (4,000 16KB reads or writes), for a total of 16,000 random IOPS on the instance. The EC2 instance initially delivers the expected 16,000 IOPS random read and write performance. Sometime later, in order to increase the total random I/O performance of the instance, you add an additional two 500 GB EBS Provisioned IOPS volumes to the RAID. Each volume is provisioned to 4,000 IOPs like the original four, for a total of 24,000 IOPS on the EC2 instance. Monitoring shows that the EC2 instance CPU utilization increased from 50% to 70%, but the total random IOPS measured at the instance level does not increase at all. What is the problem and a valid solution?

**Options:**
- A) Larger storage volumes support higher Provisioned IOPS rates; increase the provisioned volume storage of each of the 6 EBS volumes to 1TB.
- B) The EBS-Optimized throughput limits the total IOPS that can be utilized; use an EBS Optimized instance that provides larger throughput.
- C) Small block sizes cause performance degradation, limiting the I/O throughput; configure the instance device driver and filesystem to use 64KB blocks to increase throughput.
- D) The standard EBS Instance root volume limits the total IOPS rate; change the instance root volume to also be a 500GB 4,000 Provisioned IOPS volume.
- E) RAID 0 only scales linearly to about 4 devices; use RAID 0 with 4 EBS Provisioned IOPS volumes, but increase each Provisioned IOPS EBS volume to 6,000 IOPS.

**Answer:** B

**해설:**

> **문제:** EBS 최적화 인스턴스에 6개의 Provisioned IOPS 볼륨을 RAID 0으로 구성했는데, 볼륨을 추가해도 IOPS가 증가하지 않는 이유와 해결책은?

| 선지 | 번역 |
|------|------|
| A | 더 큰 스토리지 볼륨은 더 높은 Provisioned IOPS를 지원한다. 각 볼륨을 1TB로 늘려라. |
| B | EBS 최적화 처리량 한도가 총 사용 가능한 IOPS를 제한한다. 더 큰 처리량을 제공하는 EBS 최적화 인스턴스를 사용하라. |
| C | 작은 블록 크기가 성능 저하를 유발한다. 64KB 블록을 사용하도록 설정하라. |
| D | 루트 볼륨이 총 IOPS를 제한한다. 루트 볼륨도 Provisioned IOPS로 교체하라. |
| E | RAID 0은 약 4개 장치까지만 선형적으로 확장된다. 4개 볼륨에 각 6,000 IOPS를 사용하라. |

**(A)** : 볼륨 크기와 IOPS는 별개 설정입니다. 크기를 늘린다고 IOPS가 자동으로 증가하지 않습니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(B) 정답** : EBS 최적화 인스턴스의 500 Mbps 처리량 한계가 병목입니다. 500 Mbps = 약 62.5 MB/s이며, 16KB IOPS 기준 약 4,000 IOPS에 해당하는 처리량만 지원됩니다. 더 높은 처리량의 EBS 최적화 인스턴스 유형으로 변경해야 합니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : 블록 크기 조정은 부분적 최적화일 수 있지만, 근본 원인은 인스턴스의 EBS 처리량 한계입니다.

**(D)** : 루트 볼륨이 IOPS 병목의 직접적 원인이 아닙니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(E)** : RAID 0은 디바이스 수에 선형적으로 확장됩니다. 4개 제한은 사실이 아닙니다.

**핵심 개념:** EBS 최적화 인스턴스 처리량 한계, RAID 0 구성

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q204. A user has configured a website and launched it using the Apache web server on port 80. The user is using ELB with the EC2 instances for Load Balancing. What should the user do to ensure that the EC2 instances accept requests only from ELB?

**Options:**
- A) Configure the security group of EC2, which allows access to the ELB source security group.
- B) Configure the EC2 instance so that it only listens on the ELB port.
- C) Open the port for an ELB static IP in the EC2 security group.
- D) Configure the security group of EC2, which allows access only to the ELB listener.

**Answer:** A

**해설:**

> **문제:** EC2 인스턴스가 ELB에서만 요청을 수신하도록 하려면 어떻게 해야 하나요?

| 선지 | 번역 |
|------|------|
| A | EC2의 보안 그룹에서 ELB 소스 보안 그룹의 접근을 허용하도록 설정한다. |
| B | EC2 인스턴스가 ELB 포트에서만 수신하도록 설정한다. |
| C | EC2 보안 그룹에서 ELB의 정적 IP에 대한 포트를 개방한다. |
| D | EC2의 보안 그룹에서 ELB 리스너에 대한 접근만 허용하도록 설정한다. |

**(A) 정답** : EC2 보안 그룹의 인바운드 규칙에서 소스를 ELB의 보안 그룹으로 지정하면, ELB를 통해서만 트래픽이 허용됩니다. 이것이 가장 안전하고 권장되는 방법입니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 포트 리스닝 설정은 어플리케이션 레벨 설정이며, 직접 접근을 차단하지 못합니다.

**(C)** : ELB는 정적 IP가 없으며, IP 기반 허용은 ELB IP 변경 시 문제가 발생합니다. → [📖 Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D)** : ELB 리스너를 소스로 직접 지정하는 방식은 올바른 보안 그룹 설정 방법이 아닙니다.

**핵심 개념:** ELB + EC2 보안 그룹 연동, 소스 보안 그룹 참조

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q205. You're trying to delete an SSL certificate from the IAM certificate store, and you're getting the message 'Certificate: <certificate-id> is being used by CloudFront.' Which of the following statements is probably the reason why you are getting this error?

**Options:**
- A) Before you can delete an SSL certificate, you need to either rotate SSL certificates or revert from using a custom SSL certificate to using the default CloudFront certificate.
- B) You can't delete SSL certificates. You need to request it from AWS.
- C) Before you can delete an SSL certificate, you need to set up the appropriate access level in IAM. Before you can delete an SSL certificate you need to set up https on your server.
- D) Before you can delete an SSL certificate you need to set up https on your server.

**Answer:** A

**해설:**

> **문제:** IAM 인증서 스토어에서 SSL 인증서를 삭제하려는데 "CloudFront에서 사용 중"이라는 오류가 발생하는 이유는?

| 선지 | 번역 |
|------|------|
| A | SSL 인증서를 삭제하기 전에 인증서를 교체하거나 커스텀 SSL에서 기본 CloudFront 인증서로 되돌려야 한다. |
| B | SSL 인증서는 삭제할 수 없으며 AWS에 요청해야 한다. |
| C | 삭제 전에 IAM에서 적절한 액세스 레벨을 설정해야 한다. |
| D | 삭제 전에 서버에 HTTPS를 설정해야 한다. |

**(A) 정답** : CloudFront 배포에서 해당 SSL 인증서를 사용 중이므로 삭제할 수 없습니다. 먼저 CloudFront에서 기본 인증서로 변경하거나 다른 인증서로 교체해야 합니다. → [📖 AWS Certificate Manager ACM](/section/24-security-encryption#aws-certificate-manager-acm)

**(B)** : SSL 인증서는 삭제 가능합니다. 단, 사용 중일 때는 삭제할 수 없습니다. → [📖 AWS Certificate Manager ACM](/section/24-security-encryption#aws-certificate-manager-acm)

**(C)** : IAM 액세스 레벨 설정은 이 오류의 원인이 아닙니다.

**(D)** : HTTPS 설정은 이 오류와 무관합니다.

**핵심 개념:** IAM 인증서 스토어, CloudFront SSL 인증서 관리

**관련 노트:** [SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서), [AWS Certificate Manager ACM](/section/24-security-encryption#aws-certificate-manager-acm)

---

### Q206. A government client needs you to set up secure cryptographic key storage for some of their extremely confidential data. You decide that the AWS CloudHSM is the best service for this. However, there seem to be a few pre-requisites before this can happen, one of those being a security group that has certain ports open. Which of the following is correct in regards to those security groups?

**Options:**
- A) A security group that has port 22 (for SSH) or port 3389 (for RDP) open to your network.
- B) A security group that has no ports open to your network.
- C) A security group that has only port 3389 (for RDP) open to your network.
- D) A security group that has only port 22 (for SSH) open to your network.

**Answer:** A

**해설:**

> **문제:** AWS CloudHSM 설정의 사전 요구 사항으로 올바른 보안 그룹 설정은?

| 선지 | 번역 |
|------|------|
| A | 네트워크에 포트 22(SSH) 또는 포트 3389(RDP)가 열려 있는 보안 그룹. |
| B | 어떤 포트도 열려 있지 않은 보안 그룹. |
| C | 포트 3389(RDP)만 열려 있는 보안 그룹. |
| D | 포트 22(SSH)만 열려 있는 보안 그룹. |

**(A) 정답** : CloudHSM 설정을 위해서는 관리 접근이 필요하므로, Linux 환경이면 SSH(22), Windows 환경이면 RDP(3389) 포트가 열려 있어야 합니다. → [📖 CloudHSM](/section/24-security-encryption#cloudhsm)

**(B)** : 포트가 없으면 CloudHSM 어플라이언스에 접근할 수 없습니다.

**(C)** : RDP만으로는 Linux 기반 환경을 지원하지 못합니다.

**(D)** : SSH만으로는 Windows 기반 환경을 지원하지 못합니다.

**핵심 개념:** AWS CloudHSM 사전 요구 사항, 보안 그룹 포트 설정

**관련 노트:** [CloudHSM](/section/24-security-encryption#cloudhsm), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q207. A web company is looking to implement an intrusion detection and prevention system into their deployed VPC. This platform should have the ability to scale to thousands of instances running inside of the VPC. How should they architect their solution to achieve these goals?

**Options:**
- A) Configure an instance with monitoring software and the elastic network interface (ENI) set to promiscuous mode packet sniffing to see an traffic across the VPC. Configure servers running in the VPC using the host-based 'route' commands to send all traffic through the platform to a scalable virtualized IDS/IP.
- B) Create a second VPC and route all traffic from the primary application VPC through the second VPC where the scalable virtualized IDS/IPS platform resides.
- C) Configure servers running in the VPC using the host-based 'route' commands to send all traffic through the platform to a scalable virtualized IDS/IP.
- D) Configure each host with an agent that collects all network traffic and sends that traffic to the IDS/IPS platform for inspection.

**Answer:** C

**해설:**

> **문제:** VPC 내에 수천 개의 인스턴스로 확장 가능한 침입 탐지 및 방지 시스템(IDS/IPS)을 구축하려면 어떻게 해야 하나요?

| 선지 | 번역 |
|------|------|
| A | ENI를 무차별 모드로 설정한 인스턴스를 구성하고, 호스트 기반 route 명령으로 모든 트래픽을 IDS/IPS로 전송한다. |
| B | 두 번째 VPC를 생성하고 기본 VPC의 모든 트래픽을 IDS/IPS가 있는 두 번째 VPC로 라우팅한다. |
| C | VPC 내 서버에 호스트 기반 route 명령을 사용해 모든 트래픽을 확장 가능한 가상화 IDS/IPS로 전송한다. |
| D | 각 호스트에 에이전트를 설치해 모든 네트워크 트래픽을 수집하고 IDS/IPS로 전송한다. |

**(A)** : AWS VPC에서는 무차별 모드(promiscuous mode) 패킷 스니핑이 허용되지 않습니다. → [📖 VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

**(B)** : 두 번째 VPC로 라우팅하는 방식은 복잡하고 확장성이 떨어집니다. → [📖 VPC Peering](/section/25-vpc#vpc-peering)

**(C) 정답** : 호스트 기반 route 명령으로 모든 트래픽을 가상화된 IDS/IPS 플랫폼으로 전달하는 방식이 AWS VPC 환경에서 확장 가능한 IDS/IPS를 구현하는 올바른 방법입니다. → [📖 AWS Network Firewall](/section/25-vpc#aws-network-firewall)

**(D)** : 에이전트 기반 방식은 가능하지만, 수천 개 인스턴스 규모의 확장성 측면에서 route 명령 방식보다 덜 효율적입니다.

**핵심 개념:** VPC 내 IDS/IPS 아키텍처, 호스트 기반 라우팅

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [AWS Network Firewall](/section/25-vpc#aws-network-firewall)

---

### Q208. You run an ad-supported photo sharing website using Amazon S3 to serve photos to visitors of your site. At some point you find out that other sites have been linking to the photos on your site, causing loss to your business. What is an effective method to mitigate this?

**Options:**
- A) Remove public read access and use signed URLs with expiry dates.
- B) Use CloudFront distributions for static content.
- C) Block the IPs of the offending websites in Security Groups.
- D) Store photos on an EBS volume of the web server.

**Answer:** A

**해설:**

> **문제:** S3에서 사진을 서빙하는 사진 공유 웹사이트에서 다른 사이트들이 사진에 직접 링크를 걸어 비즈니스 손실이 발생하고 있습니다. 어떻게 방지할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | 공개 읽기 액세스를 제거하고 만료 날짜가 있는 서명된 URL을 사용한다. |
| B | 정적 콘텐츠에 CloudFront 배포를 사용한다. |
| C | 보안 그룹에서 위반 웹사이트의 IP를 차단한다. |
| D | 사진을 웹 서버의 EBS 볼륨에 저장한다. |

**(A) 정답** : S3 공개 접근을 제거하고 만료 기간이 있는 서명된 URL(Pre-signed URL)을 사용하면, 자사 웹사이트를 통해서만 사진에 접근할 수 있어 핫링킹을 효과적으로 방지합니다. → [📖 S3 Pre-Signed URLs](/section/12-s3-security#s3-presigned-urls)

**(B)** : CloudFront만 사용해도 일부 제어가 가능하지만, 핫링킹 방지를 위해서는 서명된 URL이나 Referer 제한이 필요합니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(C)** : IP 차단은 동적으로 변하는 IP에 대응하기 어렵고 확장성이 없습니다.

**(D)** : EBS에 저장해도 핫링킹 자체를 방지하지 못합니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** S3 Pre-signed URL, 핫링킹 방지

**관련 노트:** [S3 Pre-Signed URLs](/section/12-s3-security#s3-presigned-urls)

---

### Q209. Which of the following is not a true statement relating to the performance of your EBS volumes?

**Options:**
- A) Frequent snapshots provide a higher level of data durability and they will not degrade the performance of your application while the snapshot is in progress.
- B) General Purpose (SSD) and Provisioned IOPS (SSD) volumes have a throughput limit of 128 MB/s per volume.
- C) There is a relationship between the maximum performance of your EBS volumes, the amount of I/O you are driving to them, and the amount of time it takes for each transaction to complete.
- D) There is a 5 to 50 percent reduction in IOPS when you first access each block of data on a newly created or restored EBS volume.

**Answer:** A

**해설:**

> **문제:** EBS 볼륨 성능에 관한 설명 중 사실이 아닌 것은?

| 선지 | 번역 |
|------|------|
| A | 잦은 스냅샷은 데이터 내구성을 높이며 스냅샷 진행 중에도 애플리케이션 성능을 저하시키지 않는다. |
| B | General Purpose(SSD)와 Provisioned IOPS(SSD) 볼륨은 볼륨당 128 MB/s의 처리량 한계가 있다. |
| C | EBS 볼륨의 최대 성능, I/O 양, 각 트랜잭션 완료 시간 사이에는 상관관계가 있다. |
| D | 새로 생성되거나 복원된 EBS 볼륨에서 각 데이터 블록에 처음 접근할 때 5~50%의 IOPS 감소가 발생한다. |

**(A) 정답(거짓 진술)** : 스냅샷 생성 중에는 I/O 작업이 다소 느려질 수 있습니다. 스냅샷이 애플리케이션 성능에 전혀 영향을 주지 않는다는 것은 사실이 아닙니다. → [📖 EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : 사실입니다. 구형 볼륨 유형의 처리량 한계에 대한 설명입니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : 사실입니다. IOPS, 처리량, 레이턴시 간의 상관관계는 실제로 존재합니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(D)** : 사실입니다. 초기화되지 않은 블록에 처음 접근할 때 성능 저하가 발생하며, 이를 pre-warming으로 해결합니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**핵심 개념:** EBS 성능 특성, 스냅샷 영향, 볼륨 초기화

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

---

### Q210. Changes to the backup window take effect [...].

**Options:**
- A) from the next billing cycle.
- B) after 30 minutes.
- C) immediately.
- D) after 24 hours.

**Answer:** C

**해설:**

> **문제:** 백업 윈도우 변경 사항은 언제 적용되나요?

| 선지 | 번역 |
|------|------|
| A | 다음 청구 주기부터. |
| B | 30분 후. |
| C | 즉시. |
| D | 24시간 후. |

**(A)** : 청구 주기와 백업 윈도우 변경은 무관합니다.

**(B)** : 30분 지연은 없습니다.

**(C) 정답** : RDS 백업 윈도우 변경 사항은 즉시 적용됩니다. → [📖 RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(D)** : 24시간 지연은 없습니다.

**핵심 개념:** RDS 백업 윈도우 설정

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

---

### Q211. Location of Instances are [...].

**Options:**
- A) regional.
- B) based on Availability Zone.
- C) global.

**Answer:** B

**해설:**

> **문제:** 인스턴스의 위치는 무엇을 기준으로 하나요?

| 선지 | 번역 |
|------|------|
| A | 리전 기반. |
| B | 가용 영역(AZ) 기반. |
| C | 글로벌. |

**(A)** : 인스턴스는 리전 수준이 아닌 특정 가용 영역에 배치됩니다. → [📖 AWS 글로벌 인프라](/section/01-getting-started#aws-글로벌-인프라)

**(B) 정답** : EC2 인스턴스는 특정 가용 영역(Availability Zone)에 배치됩니다. AZ는 리전 내의 독립적인 데이터 센터 클러스터입니다. → [📖 AWS 글로벌 인프라](/section/01-getting-started#aws-글로벌-인프라)

**(C)** : 인스턴스는 글로벌 범위가 아닌 특정 AZ에 존재합니다.

**핵심 개념:** EC2 인스턴스 배치, 가용 영역(AZ)

**관련 노트:** [Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹), [AWS 글로벌 인프라](/section/01-getting-started#aws-글로벌-인프라)

---

### Q212. You log in to IAM on your AWS console and notice the following message. 'Delete your root access keys.' Why do you think IAM is requesting this?

**Options:**
- A) Because the root access keys will expire as soon as you log out.
- B) Because the root access keys expire after 1 week.
- C) Because the root access keys are the same for all users.
- D) Because they provide unrestricted access to your AWS resources.

**Answer:** D

**해설:**

> **문제:** IAM 콘솔에서 "루트 액세스 키를 삭제하세요"라는 메시지가 표시되는 이유는?

| 선지 | 번역 |
|------|------|
| A | 로그아웃하면 루트 액세스 키가 만료되기 때문에. |
| B | 루트 액세스 키는 1주일 후 만료되기 때문에. |
| C | 루트 액세스 키는 모든 사용자에게 동일하기 때문에. |
| D | 루트 액세스 키는 AWS 리소스에 대한 무제한 액세스를 제공하기 때문에. |

**(A)** : 루트 액세스 키는 로그아웃 시 만료되지 않습니다.

**(B)** : 루트 액세스 키는 자동으로 만료되지 않습니다.

**(C)** : 루트 액세스 키는 계정별로 고유합니다.

**(D) 정답** : 루트 계정 액세스 키는 모든 AWS 서비스와 리소스에 대한 완전한 무제한 액세스를 제공하므로, 보안상 삭제를 권장합니다. 대신 IAM 사용자를 통해 최소 권한 원칙을 적용해야 합니다. → [📖 IAM Security Tools](/section/02-iam#iam-security-tools)

**핵심 개념:** AWS 루트 계정 보안 모범 사례, 최소 권한 원칙

**관련 노트:** [IAM Security Tools](/section/02-iam#iam-security-tools), [MFA Multi Factor Authentication](/section/02-iam#mfa-multi-factor-authentication)

---

### Q213. What is the minimum charge for the data transferred between Amazon RDS and Amazon EC2 Instances in the same Availability Zone?

**Options:**
- A) USD 0.10 per GB.
- B) No charge. It is free.
- C) USD 0.02 per GB
- D) USD 0.01 per GB.

**Answer:** B

**해설:**

> **문제:** 동일한 가용 영역 내의 Amazon RDS와 Amazon EC2 인스턴스 간 데이터 전송의 최소 요금은?

| 선지 | 번역 |
|------|------|
| A | GB당 USD 0.10. |
| B | 요금 없음. 무료. |
| C | GB당 USD 0.02. |
| D | GB당 USD 0.01. |

**(A)** : 동일 AZ 내 RDS-EC2 간 전송에는 이 요금이 부과되지 않습니다.

**(B) 정답** : 동일한 가용 영역 내에서 RDS와 EC2 인스턴스 간의 데이터 전송은 무료입니다. → [📖 네트워킹 비용](/section/25-vpc#네트워킹-비용)

**(C)** : 이 요금은 동일 AZ 내 전송에 해당하지 않습니다.

**(D)** : 이 요금도 동일 AZ 내 전송에 해당하지 않습니다.

**핵심 개념:** AWS 데이터 전송 요금, 동일 AZ 내 비용

---

### Q214. In DynamoDB, could you use IAM to grant access to Amazon DynamoDB resources and API actions?

**Options:**
- A) In DynamoDB there is no need to grant access.
- B) Depended to the type of access.
- C) Yes.
- D) No.

**Answer:** C

**해설:**

> **문제:** DynamoDB에서 IAM을 사용해 DynamoDB 리소스와 API 액션에 대한 접근 권한을 부여할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | DynamoDB에서는 액세스 권한 부여가 필요 없다. |
| B | 액세스 유형에 따라 다르다. |
| C | 예. |
| D | 아니요. |

**(A)** : DynamoDB도 IAM을 통한 접근 제어가 필요합니다.

**(B)** : 액세스 유형에 관계없이 IAM을 사용할 수 있습니다.

**(C) 정답** : IAM 정책을 통해 DynamoDB 테이블, 인덱스, 스트림 등의 리소스와 GetItem, PutItem 등의 API 액션에 대한 세밀한 접근 제어가 가능합니다. → [📖 Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

**(D)** : 틀립니다. IAM은 DynamoDB 접근 제어에 완전히 지원됩니다.

**핵심 개념:** DynamoDB IAM 접근 제어

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q215. The common use cases for DynamoDB Fine-Grained Access Control (FGAC) are cases in which the end user wants [...].

**Options:**
- A) to change the hash keys of the table directly.
- B) to check if an IAM policy requires the hash keys of the tables directly.
- C) to read or modify any code commit key of the table directly, without a middle-tier service.
- D) to read or modify the table directly, without a middle-tier service.

**Answer:** D

**해설:**

> **문제:** DynamoDB 세분화된 액세스 제어(FGAC)의 일반적인 사용 사례는 엔드 유저가 무엇을 원할 때인가요?

| 선지 | 번역 |
|------|------|
| A | 테이블의 해시 키를 직접 변경하고 싶을 때. |
| B | IAM 정책이 테이블의 해시 키를 필요로 하는지 확인하고 싶을 때. |
| C | 미들 티어 서비스 없이 테이블의 코드 커밋 키를 직접 읽거나 수정하고 싶을 때. |
| D | 미들 티어 서비스 없이 테이블을 직접 읽거나 수정하고 싶을 때. |

**(A)** : 해시 키 변경은 FGAC의 주요 사용 사례가 아닙니다.

**(B)** : IAM 정책 확인은 FGAC의 목적이 아닙니다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(C)** : "코드 커밋 키"는 FGAC와 관련 없는 개념입니다.

**(D) 정답** : DynamoDB FGAC는 엔드 유저가 중간 서버 없이 DynamoDB에 직접 접근하면서도 자신의 데이터만 읽고 수정할 수 있도록 세밀한 권한을 부여하는 데 사용됩니다. → [📖 Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

**핵심 개념:** DynamoDB Fine-Grained Access Control (FGAC)

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [IAM Policies 정책](/section/02-iam#iam-policies-정책)

---

### Q216. What are the initial settings of an user created security group?

**Options:**
- A) Allow all inbound traffic and Allow no outbound traffic.
- B) Allow no inbound traffic and Allow no outbound traffic.
- C) Allow no inbound traffic and Allow all outbound traffic.
- D) Allow all inbound traffic and Allow all outbound traffic.

**Answer:** C

**해설:**

> **문제:** 사용자가 생성한 보안 그룹의 초기 설정은 어떻게 되나요?

| 선지 | 번역 |
|------|------|
| A | 모든 인바운드 허용, 아웃바운드 모두 차단. |
| B | 인바운드 모두 차단, 아웃바운드 모두 차단. |
| C | 인바운드 모두 차단, 모든 아웃바운드 허용. |
| D | 모든 인바운드 허용, 모든 아웃바운드 허용. |

**(A)** : 새 보안 그룹은 인바운드 트래픽을 기본적으로 허용하지 않습니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 아웃바운드는 기본적으로 모두 허용됩니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(C) 정답** : 새로 생성된 보안 그룹의 기본 설정은 인바운드 트래픽 전체 차단, 아웃바운드 트래픽 전체 허용입니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(D)** : 인바운드도 허용하는 것은 기본 설정이 아닙니다.

**핵심 개념:** EC2 보안 그룹 기본값, 인바운드/아웃바운드 규칙

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q217. Which one of the following answers is not a possible state of Amazon CloudWatch Alarm?

**Options:**
- A) INSUFFICIENT_DATA.
- B) ALARM.
- C) OK.
- D) STATUS_CHECK_FAILED.

**Answer:** D

**해설:**

> **문제:** Amazon CloudWatch 알람의 상태로 존재하지 않는 것은?

| 선지 | 번역 |
|------|------|
| A | INSUFFICIENT_DATA. |
| B | ALARM. |
| C | OK. |
| D | STATUS_CHECK_FAILED. |

**(A)** : INSUFFICIENT_DATA는 CloudWatch 알람의 유효한 상태입니다 (데이터 부족 시). → [📖 CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(B)** : ALARM은 임계값 초과 시의 유효한 상태입니다. → [📖 CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(C)** : OK는 정상 범위 내일 때의 유효한 상태입니다. → [📖 CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(D) 정답** : STATUS_CHECK_FAILED는 EC2 상태 확인 메트릭의 값이지, CloudWatch 알람의 상태가 아닙니다. CloudWatch 알람의 상태는 OK, ALARM, INSUFFICIENT_DATA 세 가지입니다. → [📖 CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**핵심 개념:** CloudWatch 알람 상태 (OK, ALARM, INSUFFICIENT_DATA)

**관련 노트:** [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms)

---

### Q218. [...] let you categorize your EC2 resources in different ways, for example, by purpose, owner, or environment.

**Options:**
- A) wildcards.
- B) pointers.
- C) tags.
- D) special filters.

**Answer:** C

**해설:**

> **문제:** EC2 리소스를 목적, 소유자, 환경 등 다양한 방식으로 분류할 수 있게 해주는 것은?

| 선지 | 번역 |
|------|------|
| A | 와일드카드. |
| B | 포인터. |
| C | 태그. |
| D | 특수 필터. |

**(A)** : 와일드카드는 검색 패턴에 사용되며 리소스 분류 도구가 아닙니다.

**(B)** : 포인터는 프로그래밍 개념으로 리소스 분류와 무관합니다.

**(C) 정답** : 태그(Tag)는 키-값 쌍으로 AWS 리소스를 분류하고 조직화하는 데 사용됩니다. 비용 배분, 접근 제어, 자동화 등에 활용됩니다. → [📖 AWS Organizations - Tag Policies](/section/23-advanced-identity#aws-organizations-tag-policies)

**(D)** : 특수 필터는 리소스를 검색할 때 사용하지만 분류 도구는 아닙니다.

**핵심 개념:** AWS 리소스 태깅

---

### Q219. Which of the below mentioned options is not available when an instance is launched by Auto Scaling with EC2 Classic?

**Options:**
- A) Public IP.
- B) Elastic IP.
- C) Private DNS.
- D) Private IP.

**Answer:** B

**해설:**

> **문제:** EC2 Classic에서 Auto Scaling으로 인스턴스를 시작할 때 사용할 수 없는 옵션은?

| 선지 | 번역 |
|------|------|
| A | 퍼블릭 IP. |
| B | Elastic IP. |
| C | 프라이빗 DNS. |
| D | 프라이빗 IP. |

**(A)** : EC2 Classic에서 Auto Scaling으로 시작된 인스턴스는 퍼블릭 IP를 가질 수 있습니다.

**(B) 정답** : Elastic IP는 Auto Scaling으로 시작된 EC2 Classic 인스턴스에 자동으로 할당되지 않습니다. Elastic IP는 수동으로 연결해야 하며, Auto Scaling과 자동 연동이 지원되지 않습니다. → [📖 Elastic IP](/section/04-ec2-associate#elastic-ip)

**(C)** : 프라이빗 DNS는 EC2 Classic 인스턴스에도 제공됩니다.

**(D)** : 프라이빗 IP는 EC2 Classic 인스턴스에도 할당됩니다.

**핵심 개념:** EC2 Classic, Auto Scaling, Elastic IP 제한

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q220. You have a lot of data stored in the AWS Storage Gateway and your manager has come to you asking about how the billing is calculated, specifically the Virtual Tape Shelf usage. What would be a correct response to this?

**Options:**
- A) You are billed for the virtual tape data you store in Amazon Glacier and are billed for the size of the virtual tape.
- B) You are billed for the virtual tape data you store in Amazon Glacier and billed for the portion of virtual tape capacity that you use, not for the size of the virtual tape.
- C) You are billed for the virtual tape data you store in Amazon S3 and billed for the portion of virtual tape capacity that you use, not for the size of the virtual tape.
- D) You are billed for the virtual tape data you store in Amazon S3 and are billed for the size of the virtual tape.

**Answer:** B

**해설:**

> **문제:** AWS Storage Gateway의 Virtual Tape Shelf(VTS) 사용 요금은 어떻게 계산되나요?

| 선지 | 번역 |
|------|------|
| A | Amazon Glacier에 저장된 가상 테이프 데이터에 대해 가상 테이프 크기로 요금이 부과된다. |
| B | Amazon Glacier에 저장된 가상 테이프 데이터에 대해 사용한 용량만큼 요금이 부과되며, 테이프 크기 기준이 아니다. |
| C | Amazon S3에 저장된 가상 테이프 데이터에 대해 사용한 용량만큼 요금이 부과된다. |
| D | Amazon S3에 저장된 가상 테이프 데이터에 대해 테이프 크기로 요금이 부과된다. |

**(A)** : 저장소는 Glacier가 맞지만 테이프 크기가 아닌 실제 사용 용량으로 청구됩니다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(B) 정답** : Virtual Tape Shelf는 Amazon Glacier에 데이터를 저장하며, 가상 테이프의 전체 크기가 아닌 실제로 사용한 용량에 대해서만 요금이 청구됩니다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(C)** : VTS는 S3가 아닌 Glacier를 사용합니다. → [📖 Amazon S3 데이터베이스 관점](/section/19-databases#amazon-s3-데이터베이스-관점)

**(D)** : S3도 아니고 테이프 크기 기준도 아닙니다.

**핵심 개념:** AWS Storage Gateway Virtual Tape Library, Glacier 요금 체계

**관련 노트:** [AWS Storage Gateway](/section/14-storage-extras#aws-storage-gateway), [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

---

### Q221. True or False: The new DB Instance that is created when you promote a Read Replica retains the backup window period.

**Options:**
- A) True.
- B) False.

**Answer:** A

**해설:**

> **문제:** Read Replica를 승격하면 생성되는 새 DB 인스턴스는 백업 윈도우 기간을 유지합니까?

| 선지 | 번역 |
|------|------|
| A | 참. |
| B | 거짓. |

**(A) 정답** : Read Replica를 독립 DB 인스턴스로 승격하면 해당 인스턴스는 기존 Read Replica의 백업 윈도우 설정을 그대로 유지합니다. → [📖 RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(B)** : 백업 윈도우는 유지됩니다. 거짓이 아닙니다.

**핵심 개념:** RDS Read Replica 승격, 백업 윈도우

**관련 노트:** [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas), [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

---

### Q222. [...] is a fast, flexible, fully managed push messaging service.

**Options:**
- A) Amazon SNS.
- B) Amazon SES.
- C) Amazon SQS.
- D) Amazon FPS.

**Answer:** A

**해설:**

> **문제:** 빠르고 유연하며 완전 관리형 푸시 메시징 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon SNS. |
| B | Amazon SES. |
| C | Amazon SQS. |
| D | Amazon FPS. |

**(A) 정답** : Amazon SNS(Simple Notification Service)는 구독자에게 메시지를 푸시 방식으로 전달하는 완전 관리형 메시징 서비스입니다. → [📖 Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(B)** : Amazon SES는 이메일 전송 서비스이며 범용 푸시 메시징 서비스가 아닙니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(C)** : Amazon SQS는 풀(pull) 방식의 메시지 큐 서비스로 푸시 방식이 아닙니다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : Amazon FPS(Flexible Payments Service)는 결제 서비스로 메시징과 무관합니다.

**핵심 개념:** Amazon SNS (Simple Notification Service)

**관련 노트:** [Amazon SNS](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q223. You are tasked with setting up a Linux bastion host for access to Amazon EC2 instances running in your VPC. Only clients connecting from the corporate external public IP address 72.34.51.100 should have SSH access to the host. Which option will meet the customer requirement?

**Options:**
- A) Security Group Inbound Rule: Protocol – TCP. Port Range – 22, Source 72.34.51.100/32
- B) Port Range- 22, Source 72.34.51. 100/32.
- C) Security Group Inbound Rule: Protocol – UDP, Port Range- 22, Source 72.34.51.100/32.
- D) Network ACL Inbound Rule: Protocol – UDP, Port Range- 22, Source 72.34.51.100/32.
- E) Network ACL Inbound Rule: Protocol – TCP, Port Range-22, Source 72.34.51.100/0.

**Answer:** A

**해설:**

> **문제:** 특정 IP(72.34.51.100)에서만 Bastion Host에 SSH 접근을 허용하려면?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹 인바운드: TCP, 포트 22, 소스 72.34.51.100/32 |
| B | 포트 22, 소스 72.34.51.100/32 (프로토콜 미지정) |
| C | 보안 그룹 인바운드: UDP, 포트 22, 소스 72.34.51.100/32 |
| D | 네트워크 ACL 인바운드: UDP, 포트 22, 소스 72.34.51.100/32 |
| E | 네트워크 ACL 인바운드: TCP, 포트 22, 소스 72.34.51.100/0 |

**(A) 정답** : SSH는 TCP 프로토콜을 사용하며 /32 CIDR은 단일 IP를 의미합니다. 보안 그룹에서 TCP 포트 22, 소스 72.34.51.100/32로 설정하면 정확히 해당 IP에서만 SSH 접근이 허용됩니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 프로토콜이 명시되지 않아 불완전한 규칙입니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(C)** : SSH는 UDP가 아닌 TCP를 사용합니다. → [📖 Classic Ports](/section/03-ec2-basics#classic-ports)

**(D)** : UDP 프로토콜을 사용하므로 SSH에 적합하지 않습니다. → [📖 Classic Ports](/section/03-ec2-basics#classic-ports)

**(E)** : /0은 모든 IP를 의미하므로 특정 IP만 허용하는 요구사항에 맞지 않습니다.

**핵심 개념:** Bastion Host, 보안 그룹 인바운드 규칙, CIDR /32

**관련 노트:** [Bastion Host](/section/25-vpc#bastion-host), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q224. How can you secure data at rest on an EBS volume?

**Options:**
- A) Attach the volume to an instance using EC2's SSL interface.
- B) Write the data randomly instead of sequentially.
- C) Encrypt the volume using the S3 server-side encryption service.
- D) Create an IAM policy that restricts read and write access to the volume.
- E) Use an encrypted file system on top of the EBS volume.

**Answer:** E

**해설:**

> **문제:** EBS 볼륨의 저장 데이터를 보호하려면 어떻게 해야 하나요?

| 선지 | 번역 |
|------|------|
| A | EC2의 SSL 인터페이스를 사용해 볼륨을 인스턴스에 연결한다. |
| B | 데이터를 순차적이 아닌 무작위로 쓴다. |
| C | S3 서버 측 암호화 서비스를 사용해 볼륨을 암호화한다. |
| D | 볼륨에 대한 읽기/쓰기 액세스를 제한하는 IAM 정책을 생성한다. |
| E | EBS 볼륨 위에 암호화된 파일 시스템을 사용한다. |

**(A)** : EC2에 SSL 인터페이스라는 개념은 없으며, 저장 데이터 암호화 방법이 아닙니다.

**(B)** : 데이터를 무작위로 쓰는 것은 보안과 무관합니다.

**(C)** : S3 서버 측 암호화는 EBS 볼륨에 적용되지 않습니다. → [📖 S3 객체 암호화 - 4가지 방법](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**(D)** : IAM 정책은 접근 제어를 제공하지만 데이터 자체를 암호화하지는 않습니다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(E) 정답** : EBS 볼륨 위에 암호화된 파일 시스템(예: Linux dm-crypt/LUKS)을 구성하면 저장 데이터를 암호화할 수 있습니다. EBS 볼륨 자체의 암호화 기능을 사용하는 것도 올바른 방법입니다. → [📖 EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption)

**핵심 개념:** EBS 저장 데이터 암호화, 파일 시스템 암호화

**관련 노트:** [EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption), [AWS KMS](/section/24-security-encryption#aws-kms-key-management-service)

---

### Q225. Is there a method in the IAM system to allow or deny access to a specific instance?

**Options:**
- A) Only for VPC based instances.
- B) Yes.
- C) No.

**Answer:** B

**해설:**

> **문제:** IAM 시스템에서 특정 인스턴스에 대한 접근을 허용하거나 거부하는 방법이 있나요?

| 선지 | 번역 |
|------|------|
| A | VPC 기반 인스턴스에 대해서만 가능. |
| B | 예. |
| C | 아니요. |

**(A)** : VPC 기반 인스턴스에만 국한되지 않습니다.

**(B) 정답** : IAM 정책에서 `ec2:ResourceTag` 조건이나 리소스 ARN을 사용해 특정 인스턴스에 대한 접근을 허용하거나 거부할 수 있습니다. → [📖 IAM Conditions](/section/23-advanced-identity#iam-conditions)

**(C)** : 가능합니다. IAM 조건과 리소스 기반 정책으로 특정 인스턴스 접근 제어가 가능합니다.

**핵심 개념:** IAM 리소스 수준 권한, EC2 인스턴스 접근 제어

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q226. Using Amazon IAM, can I give permission based on organizational groups?

**Options:**
- A) Yes but only in certain cases.
- B) Yes.
- C) No.

**Answer:** B

**해설:**

> **문제:** Amazon IAM을 사용해 조직 그룹 기반으로 권한을 부여할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | 특정 경우에만 가능. |
| B | 예. |
| C | 아니요. |

**(A)** : 특정 경우에만 제한되지 않습니다.

**(B) 정답** : IAM 그룹을 생성하고 그룹에 정책을 연결한 후, 사용자를 그룹에 추가하면 조직 그룹 기반 권한 부여가 가능합니다. → [📖 Users & Groups](/section/02-iam#users-groups)

**(C)** : 가능합니다. IAM 그룹을 통해 구현할 수 있습니다.

**핵심 개념:** IAM 그룹, 그룹 기반 권한 관리

**관련 노트:** [Users & Groups](/section/02-iam#users-groups), [정책 상속](/section/02-iam#정책-상속)

---

### Q227. Which services allow the customer to retain full administrative privileges of the underlying EC2 instances? (Choose 2 answers)

**Options:**
- A) Amazon Relational Database Service.
- B) Amazon Elastic MapReduce.
- C) Amazon ElastiCache.
- D) Amazon DynamoDB.
- E) AWS Elastic Beanstalk.

**Answer:** B, E

**해설:**

> **문제:** 고객이 기반 EC2 인스턴스에 대한 완전한 관리 권한을 유지할 수 있는 서비스는? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | Amazon RDS. |
| B | Amazon Elastic MapReduce (EMR). |
| C | Amazon ElastiCache. |
| D | Amazon DynamoDB. |
| E | AWS Elastic Beanstalk. |

**(A)** : RDS는 완전 관리형 서비스로 기반 EC2 인스턴스에 직접 접근할 수 없습니다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B) 정답** : Amazon EMR은 EC2 인스턴스에서 실행되며 고객이 SSH 접근 등 완전한 관리 권한을 가집니다. → [📖 Amazon EMR Elastic MapReduce](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(C)** : ElastiCache는 완전 관리형 서비스로 기반 인스턴스에 접근할 수 없습니다. → [📖 Amazon ElastiCache](/section/19-databases#amazon-elasticache)

**(D)** : DynamoDB는 서버리스 완전 관리형 서비스입니다. → [📖 Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

**(E) 정답** : Elastic Beanstalk는 EC2 인스턴스에 배포되며 고객이 SSH 접근을 통해 완전한 관리 권한을 유지할 수 있습니다. → [📖 Elastic Beanstalk](/section/09-classic-solutions-architecture#elastic-beanstalk)

**핵심 개념:** 완전 관리형 서비스 vs 고객 관리 서비스, EC2 기반 서비스

**관련 노트:** [AWS Lambda](/section/17-serverless-overview#aws-lambda), [Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

---

### Q228. While launching an RDS DB instance, on which page I can select the Availability Zone?

**Options:**
- A) REVIEW.
- B) DB INSTANCE DETAILS.
- C) MANAGEMENT OPTIONS.
- D) ADDITIONAL CONFIGURATION.

**Answer:** D

**해설:**

> **문제:** RDS DB 인스턴스를 시작할 때 가용 영역을 선택하는 페이지는?

| 선지 | 번역 |
|------|------|
| A | REVIEW (검토). |
| B | DB INSTANCE DETAILS (DB 인스턴스 세부 정보). |
| C | MANAGEMENT OPTIONS (관리 옵션). |
| D | ADDITIONAL CONFIGURATION (추가 구성). |

**(A)** : REVIEW 페이지는 설정을 확인하는 페이지입니다.

**(B)** : DB 인스턴스 세부 정보는 인스턴스 유형, 스토리지 등을 설정합니다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : 관리 옵션에는 백업, 모니터링 등이 포함됩니다. → [📖 RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(D) 정답** : 가용 영역(AZ) 선택은 ADDITIONAL CONFIGURATION 페이지에서 설정합니다. → [📖 AWS 글로벌 인프라](/section/01-getting-started#aws-글로벌-인프라)

**핵심 개념:** RDS 인스턴스 생성 시 가용 영역 설정

**관련 노트:** [Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [Placement Groups 배치 그룹](/section/04-ec2-associate#placement-groups-배치-그룹)

---

### Q229. You are responsible for a legacy web application whose server environment is approaching end of life. You would like to migrate this application to AWS as quickly as possible, since the application environment currently has the following limitations. The VM's single 10GB VMDK is almost full. The virtual network interface still uses the 10Mbps driver, which leaves your 100Mbps WAN connection completely underutilized. It is currently running on a highly customized Windows VM within a VMware environment. You do not have the installation media. This is a mission critical application with an RTO (Recovery Time Objective) of 8 hours and RPO (Recovery Point Objective) of 1 hour. How could you best migrate this application to AWS while meeting your business continuity requirements?

**Options:**
- A) Use the EC2 VM Import Connector for vCenter to import the VM into EC2.
- B) Use Import/Export to import the VM as an EBS snapshot and attach to EC2.
- C) Use S3 to create a backup of the VM and restore the data into EC2.
- D) Use the ec2-bundle-instance API to Import an Image of the VM into EC2.

**Answer:** A

**해설:**

> **문제:** 설치 미디어 없이 고도로 커스터마이징된 VMware Windows VM을 RTO 8시간, RPO 1시간으로 AWS로 마이그레이션하는 최선의 방법은?

| 선지 | 번역 |
|------|------|
| A | vCenter용 EC2 VM Import Connector를 사용해 VM을 EC2로 임포트한다. |
| B | Import/Export를 사용해 VM을 EBS 스냅샷으로 임포트하고 EC2에 연결한다. |
| C | S3를 사용해 VM 백업을 생성하고 데이터를 EC2에 복원한다. |
| D | ec2-bundle-instance API를 사용해 VM 이미지를 EC2로 임포트한다. |

**(A) 정답** : EC2 VM Import Connector for vCenter를 사용하면 VMware 환경에서 직접 EC2로 VM을 임포트할 수 있습니다. 설치 미디어 없이도 작동하며, RTO/RPO 요구사항을 충족하는 가장 빠른 방법입니다. → [📖 온프레미스 전략](/section/26-disaster-recovery-migrations#온프레미스-전략)

**(B)** : Import/Export 서비스는 물리적 디바이스를 사용하므로 빠른 마이그레이션에 적합하지 않습니다. → [📖 AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

**(C)** : S3 백업 후 복원은 커스터마이징된 VM 환경 재구성이 어렵습니다. → [📖 대량 데이터 전송 비교](/section/26-disaster-recovery-migrations#대량-데이터-전송-비교)

**(D)** : ec2-bundle-instance는 이미 실행 중인 EC2 인스턴스를 번들링하는 API입니다. → [📖 AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** VM Import/Export, VMware에서 AWS 마이그레이션

---

### Q230. You are setting up some EBS volumes for a customer who has requested a setup which includes a RAID (redundant array of inexpensive disks). AWS has some recommendations for RAID setups. Which RAID setup is not recommended for Amazon EBS?

**Options:**
- A) RAID 5 only.
- B) RAID 5 and RAID 6.
- C) RAID 1 only.
- D) RAID 1 and RAID 6.

**Answer:** B

**해설:**

> **문제:** Amazon EBS에서 권장하지 않는 RAID 구성은?

| 선지 | 번역 |
|------|------|
| A | RAID 5만. |
| B | RAID 5와 RAID 6. |
| C | RAID 1만. |
| D | RAID 1과 RAID 6. |

**(A)** : RAID 5만이 아닌 RAID 6도 권장하지 않습니다.

**(B) 정답** : AWS는 EBS에서 RAID 5와 RAID 6을 권장하지 않습니다. 이는 패리티 계산으로 인해 IOPS가 20~30% 낭비되기 때문입니다. AWS는 RAID 0(성능 향상)이나 RAID 1(미러링)을 권장합니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(C)** : RAID 1은 AWS EBS에서 권장되는 구성입니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(D)** : RAID 1은 권장되므로 이 조합은 틀립니다.

**핵심 개념:** EBS RAID 구성 권장 사항, RAID 5/6의 단점

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지), [EBS Multi-Attach io1/io2](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

---

### Q231. Much of your company's data does not need to be accessed often, and can take several hours for retrieval time, so it's stored on Amazon Glacier. However someone within your organization has expressed concerns that his data is more sensitive than the other data, and is wondering whether the high level of encryption that he knows is on S3 is also used on the much cheaper Glacier service. Which of the following statements would be most applicable in regards to this concern?

**Options:**
- A) There is no encryption on Amazon Glacier, that's why it is cheaper.
- B) Amazon Glacier automatically encrypts the data using AES-128 a lesser encryption method than Amazon S3 but you can change it to AES-256 if you are willing to pay more.
- C) Amazon Glacier automatically encrypts the data using AES-256, the same as Amazon S3.
- D) Amazon Glacier automatically encrypts the data using AES-128 a lesser encryption method than Amazon S3.

**Answer:** C

**해설:**

> **문제:** Amazon Glacier도 S3와 동일한 수준의 암호화를 사용하나요?

| 선지 | 번역 |
|------|------|
| A | Amazon Glacier에는 암호화가 없어서 더 저렴하다. |
| B | Amazon Glacier는 AES-128로 자동 암호화하며 S3보다 낮은 수준이지만 추가 비용으로 AES-256 변경 가능. |
| C | Amazon Glacier는 S3와 동일하게 AES-256으로 자동 암호화한다. |
| D | Amazon Glacier는 AES-128로 자동 암호화하며 S3보다 낮은 수준이다. |

**(A)** : Glacier도 데이터를 자동으로 암호화합니다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(B)** : Glacier는 AES-256을 사용하며 추가 비용이 필요하지 않습니다.

**(C) 정답** : Amazon Glacier는 AES-256을 사용하여 데이터를 자동으로 암호화하며, 이는 Amazon S3와 동일한 수준입니다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : AES-128이 아닌 AES-256을 사용합니다.

**핵심 개념:** Amazon Glacier 암호화 (AES-256 자동 암호화)

**관련 노트:** [S3 Glacier Vault Lock](/section/12-s3-security#s3-glacier-vault-lock), [AWS KMS](/section/24-security-encryption#aws-kms-key-management-service)

---

### Q232. Can I use Provisioned IOPS with VPC?

**Options:**
- A) Only Oracle based RDS.
- B) No.
- C) Only with MSSQL based RDS.
- D) Yes for all RDS instances.

**Answer:** D

**해설:**

> **문제:** VPC에서 Provisioned IOPS를 사용할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | Oracle 기반 RDS에서만. |
| B | 아니요. |
| C | MSSQL 기반 RDS에서만. |
| D | 모든 RDS 인스턴스에서 예. |

**(A)** : Oracle에만 제한되지 않습니다.

**(B)** : VPC에서 Provisioned IOPS를 사용할 수 있습니다. → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(C)** : MSSQL에만 제한되지 않습니다.

**(D) 정답** : Provisioned IOPS는 VPC 내 모든 RDS 인스턴스(MySQL, PostgreSQL, Oracle, MSSQL 등)에서 사용 가능합니다. → [📖 EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**핵심 개념:** RDS Provisioned IOPS, VPC 지원

**관련 노트:** [Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

---

### Q233. To ensure failover capabilities, consider using a [...] for incoming traffic on a network interface.

**Options:**
- A) primary public IP.
- B) secondary private IP.
- C) secondary public IP.
- D) add on secondary IP.

**Answer:** B

**해설:**

> **문제:** 장애 조치 기능을 위해 네트워크 인터페이스의 수신 트래픽에 무엇을 사용해야 하나요?

| 선지 | 번역 |
|------|------|
| A | 기본 퍼블릭 IP. |
| B | 보조 프라이빗 IP. |
| C | 보조 퍼블릭 IP. |
| D | 추가 보조 IP. |

**(A)** : 기본 퍼블릭 IP는 인스턴스 재시작 시 변경될 수 있습니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**(B) 정답** : 보조 프라이빗 IP 주소는 한 ENI에서 다른 ENI로 이동할 수 있어, 장애 조치 시 트래픽을 빠르게 다른 인스턴스로 전환할 수 있습니다. → [📖 Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

**(C)** : 보조 퍼블릭 IP는 장애 조치 메커니즘으로 적합하지 않습니다.

**(D)** : 모호한 설명으로 올바른 답이 아닙니다.

**핵심 개념:** ENI 보조 프라이빗 IP, 장애 조치(Failover)

**관련 노트:** [Elastic Network Interface ENI](/section/04-ec2-associate#elastic-network-interface-eni)

---

### Q234. By default, EBS volumes that are created and attached to an instance at launch are deleted when that instance is terminated. You can modify this behavior by changing the value of the flag [...] to false when you launch the instance.

**Options:**
- A) Delete On Termination.
- B) Remove On Deletion.
- C) Remove On Termination.
- D) Terminate On Deletion.

**Answer:** A

**해설:**

> **문제:** 인스턴스 종료 시 EBS 볼륨 자동 삭제를 방지하기 위해 false로 변경해야 하는 플래그는?

| 선지 | 번역 |
|------|------|
| A | Delete On Termination. |
| B | Remove On Deletion. |
| C | Remove On Termination. |
| D | Terminate On Deletion. |

**(A) 정답** : `DeleteOnTermination` 플래그가 기본값 true로 설정되어 있어, 인스턴스 종료 시 볼륨이 함께 삭제됩니다. 이를 false로 변경하면 인스턴스 종료 후에도 볼륨이 유지됩니다. → [📖 EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B), (C), (D)** : 실제 존재하지 않는 플래그 이름입니다.

**핵심 개념:** EBS DeleteOnTermination 플래그

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q235. Which AWS service helps this functionality?

**Options:**
- A) AWS Simple Queue Service.
- B) AWS Simple Notification Service.
- C) AWS Simple Workflow Service.
- D) AWS Simple Email Service.

**Answer:** A

**해설:**

> **문제:** 어떤 AWS 서비스가 이 기능을 지원하나요? (문맥 없이 출제된 문제)

| 선지 | 번역 |
|------|------|
| A | AWS Simple Queue Service (SQS). |
| B | AWS Simple Notification Service (SNS). |
| C | AWS Simple Workflow Service (SWF). |
| D | AWS Simple Email Service (SES). |

**(A) 정답** : 문맥이 불분명한 문제이나, 정답은 AWS SQS입니다. SQS는 분산 메시지 큐 서비스로 컴포넌트 간 비동기 통신을 지원합니다. → [📖 Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(B)** : SNS는 푸시 알림 서비스입니다. → [📖 Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(C)** : SWF는 워크플로우 조율 서비스입니다.

**(D)** : SES는 이메일 전송 서비스입니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**핵심 개념:** AWS SQS 메시지 큐 서비스

**관련 노트:** [Amazon SQS](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

---

### Q236. Which of the below statements would be an incorrect response to your customers enquiry?

**Options:**
- A) Amazon EMR customers can choose to send data to Amazon S3 using the HTTPS protocol for secure transmission.
- B) Amazon S3 provides authentication mechanisms to ensure that stored data is secured against unauthorized access.
- C) Every packet sent in the AWS network uses Internet Protocol Security (IPsec).
- D) Customers may encrypt the input data before they upload it to Amazon S3.

**Answer:** C

**해설:**

> **문제:** 고객 문의에 대한 잘못된 응답은?

| 선지 | 번역 |
|------|------|
| A | Amazon EMR 고객은 안전한 전송을 위해 HTTPS를 사용해 S3로 데이터를 전송할 수 있다. |
| B | Amazon S3는 무단 접근으로부터 저장 데이터를 보호하는 인증 메커니즘을 제공한다. |
| C | AWS 네트워크에서 전송되는 모든 패킷은 IPsec을 사용한다. |
| D | 고객은 Amazon S3에 업로드하기 전에 입력 데이터를 암호화할 수 있다. |

**(A)** : 올바른 설명입니다. EMR은 HTTPS를 통해 S3와 통신할 수 있습니다. → [📖 Amazon EMR Elastic MapReduce](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(B)** : 올바른 설명입니다. S3는 IAM 등을 통한 인증을 제공합니다. → [📖 S3 보안](/section/10-amazon-s3#s3-보안)

**(C) 정답(잘못된 응답)** : AWS 네트워크의 모든 패킷이 IPsec을 사용하지는 않습니다. IPsec은 VPN 연결 등 특정 시나리오에서 사용됩니다. → [📖 Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

**(D)** : 올바른 설명입니다. 클라이언트 측 암호화를 통해 S3 업로드 전 데이터를 암호화할 수 있습니다. → [📖 S3 암호화 방식 비교 SSE-S3 / SSE-KMS / SSE-C / Client-Side](/section/12-s3-security#s3-암호화-방식-비교-sses3-ssekms-ssec-clientside)

**핵심 개념:** AWS 네트워크 보안, IPsec 적용 범위

**관련 노트:** [Site-to-Site VPN](/section/25-vpc#sitetosite-vpn), [Direct Connect DX](/section/25-vpc#direct-connect-dx)

---

### Q237. The one-time payment for Reserved Instances is [...] refundable if the reservation is cancelled.

**Options:**
- A) always.
- B) in some circumstances.
- C) never.

**Answer:** C

**해설:**

> **문제:** Reserved Instance를 취소하는 경우 선불 결제는 환불되나요?

| 선지 | 번역 |
|------|------|
| A | 항상 환불된다. |
| B | 특정 상황에서는 환불된다. |
| C | 절대 환불되지 않는다. |

**(A)** : Reserved Instance 선불 결제는 환불되지 않습니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : 특정 상황에서도 환불은 불가합니다.

**(C) 정답** : Reserved Instance의 일회성 선불 결제는 취소 시 절대 환불되지 않습니다. 단, Reserved Instance를 다른 사용자에게 Reserved Instance Marketplace를 통해 판매는 가능합니다. → [📖 EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** Reserved Instance 요금 정책, 환불 불가

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q238. Is it possible to get a history of all EC2 API calls made on your account for security analysis and operational troubleshooting purposes?

**Options:**
- A) Yes, by default, the history of your API calls is logged.
- B) Yes, you should turn on the CloudTrail in the AWS console.
- C) No, you can only get a history of VPC API calls.
- D) No, you cannot store history of EC2 API calls on Amazon.

**Answer:** B

**해설:**

> **문제:** 보안 분석 및 운영 문제 해결을 위해 계정의 모든 EC2 API 호출 기록을 조회할 수 있나요?

| 선지 | 번역 |
|------|------|
| A | 예, 기본적으로 API 호출 기록이 로깅됩니다. |
| B | 예, AWS 콘솔에서 CloudTrail을 활성화해야 합니다. |
| C | 아니요, VPC API 호출 기록만 조회 가능합니다. |
| D | 아니요, Amazon에서 EC2 API 호출 기록을 저장할 수 없습니다. |

**(A)** : CloudTrail은 기본적으로 활성화되어 있지 않습니다 (활성화해야 함). → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(B) 정답** : AWS CloudTrail을 활성화하면 EC2를 포함한 모든 AWS API 호출 기록을 S3에 저장하고 분석할 수 있습니다. → [📖 AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(C)** : VPC API만 가능한 것이 아닙니다. 모든 AWS 서비스의 API를 추적할 수 있습니다.

**(D)** : CloudTrail을 통해 EC2 API 호출 기록 저장이 가능합니다.

**핵심 개념:** AWS CloudTrail, API 감사 로그

**관련 노트:** [AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

---

### Q239. The Trusted Advisor service provides insight regarding which four categories of an AWS account?

**Options:**
- A) Security, fault tolerance, high availability, and connectivity.
- B) Security, access control, high availability, and performance.
- C) Performance, cost optimization, security, and fault tolerance.
- D) Performance, cost optimization, access control, and connectivity.

**Answer:** C

**해설:**

> **문제:** Trusted Advisor 서비스가 제공하는 4가지 카테고리는?

| 선지 | 번역 |
|------|------|
| A | 보안, 내결함성, 고가용성, 연결성. |
| B | 보안, 접근 제어, 고가용성, 성능. |
| C | 성능, 비용 최적화, 보안, 내결함성. |
| D | 성능, 비용 최적화, 접근 제어, 연결성. |

**(A)** : "고가용성"과 "연결성"은 Trusted Advisor의 주요 카테고리가 아닙니다.

**(B)** : "접근 제어"와 "고가용성"은 카테고리가 아닙니다.

**(C) 정답** : AWS Trusted Advisor는 비용 최적화(Cost Optimization), 성능(Performance), 보안(Security), 내결함성(Fault Tolerance), 서비스 한도(Service Limits) 5개 카테고리를 제공합니다. 이 중 4가지를 묻는 경우 성능, 비용 최적화, 보안, 내결함성이 핵심입니다. → [📖 AWS Trusted Advisor](/section/29-white-papers-architectures#aws-trusted-advisor)

**(D)** : "접근 제어"와 "연결성"은 카테고리가 아닙니다.

**핵심 개념:** AWS Trusted Advisor 5대 카테고리

**관련 노트:** [AWS Trusted Advisor](/section/29-white-papers-architectures#aws-trusted-advisor)

---

### Q240. An AWS customer runs a public blogging website. The site users upload two million blog entries a month. The average blog entry size is 200 KB. The access rate to blog entries drops to negligible 6 months after publication and users rarely access a blog entry 1 year after publication. Additionally, blog entries have a high update rate during the first 3 months following publication, this drops to no updates after 6 months. The customer wants to use CloudFront to improve his user's load times. Which of the following recommendations would you make to the customer?

**Options:**
- A) Duplicate entries into two different buckets and create two separate CloudFront distributions where S3 access is restricted only to CloudFront identity.
- B) Create a CloudFront distribution with 'US' Europe price class for US/Europe users and a different CloudFront distribution with All Edge Locations for the remaining users.
- C) Create a CloudFront distribution with S3 access restricted only to the CloudFront identity and partition the blog entry's location in S3 according to the month it was uploaded to be used with CloudFront behaviors.
- D) Create a CloudFront distribution with Restrict Viewer Access Forward Query string set to true and minimum TTL of 0.

**Answer:** C

**해설:**

> **문제:** 블로그 항목의 접근 패턴(6개월 후 거의 없음, 1년 후 사실상 없음)을 고려할 때 CloudFront 구성 권장 사항은?

| 선지 | 번역 |
|------|------|
| A | 두 개의 버킷에 항목을 복제하고 CloudFront 배포를 두 개 생성한다. |
| B | US/유럽용 CloudFront 배포와 나머지 사용자용 배포를 별도로 만든다. |
| C | S3 접근을 CloudFront로만 제한하고 업로드 월별로 S3 경로를 분할하여 CloudFront 동작(behaviors)과 연동한다. |
| D | Restrict Viewer Access와 Forward Query string을 true로 설정하고 최소 TTL을 0으로 설정한다. |

**(A)** : 중복 버킷은 불필요한 비용을 초래합니다.

**(B)** : 지역별 배포는 접근 패턴 최적화와 무관합니다.

**(C) 정답** : 업로드 월별로 S3 경로를 구분하고 CloudFront behaviors를 사용하면 오래된 콘텐츠(접근 빈도 낮음)와 새 콘텐츠(접근 빈도 높음)에 다른 캐시 정책을 적용할 수 있습니다. OAI로 S3 직접 접근도 차단합니다. → [📖 CloudFront Cache Invalidation 캐시 무효화](/section/13-cloudfront-global-accelerator#cloudfront-cache-invalidation-캐시-무효화)

**(D)** : TTL 0은 캐싱을 비효율적으로 만듭니다. → [📖 TTL Time To Live](/section/08-route-53#ttl-time-to-live)

**핵심 개념:** CloudFront behaviors, S3 OAI, 캐시 전략

**관련 노트:** [CloudFront Origins 원본 소스](/section/13-cloudfront-global-accelerator#cloudfront-origins-원본-소스), [CloudFront Cache Invalidation 캐시 무효화](/section/13-cloudfront-global-accelerator#cloudfront-cache-invalidation-캐시-무효화)

---

### Q241. Your supervisor has asked you to build a simple file synchronization service for your department. He doesn't want to spend too much money and he wants to be notified of any changes to files by email. What do you think would be the best Amazon service to use for the email solution?

**Options:**
- A) Amazon SES.
- B) Amazon CloudSearch.
- C) Amazon SWF.
- D) Amazon AppStream.

**Answer:** A

**해설:**

> **문제:** 파일 변경 시 이메일 알림을 위한 최적의 Amazon 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon SES. |
| B | Amazon CloudSearch. |
| C | Amazon SWF. |
| D | Amazon AppStream. |

**(A) 정답** : Amazon SES(Simple Email Service)는 이메일 전송을 위한 비용 효율적인 서비스로, 파일 변경 알림 이메일 발송에 적합합니다. → [📖 Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

**(B)** : Amazon CloudSearch는 검색 서비스입니다. → [📖 Amazon OpenSearch Service](/section/20-data-analytics#amazon-opensearch-service)

**(C)** : Amazon SWF는 워크플로우 관리 서비스입니다.

**(D)** : Amazon AppStream은 애플리케이션 스트리밍 서비스입니다.

**핵심 개념:** Amazon SES (Simple Email Service)

**관련 노트:** [Amazon SES](/section/28-other-services#amazon-simple-email-service-ses)

---

### Q242. What are the Amazon EC2 API tools?

**Options:**
- A) They don't exist. The Amazon EC2 AMI tools, instead, are used to manage permissions.
- B) Command-line tools to the Amazon EC2 web service.
- C) They are a set of graphical tools to manage EC2 instances.
- D) They don't exist. The Amazon API tools are a client interface to Amazon Web Services.

**Answer:** B

**해설:**

> **문제:** Amazon EC2 API 도구란 무엇인가요?

| 선지 | 번역 |
|------|------|
| A | 존재하지 않는다. EC2 AMI 도구가 권한 관리에 사용된다. |
| B | Amazon EC2 웹 서비스에 대한 커맨드라인 도구. |
| C | EC2 인스턴스를 관리하는 그래픽 도구 세트. |
| D | 존재하지 않는다. Amazon API 도구는 AWS 클라이언트 인터페이스다. |

**(A)** : EC2 API 도구는 존재합니다.

**(B) 정답** : Amazon EC2 API 도구는 EC2 웹 서비스에 대한 커맨드라인 도구 세트로, 인스턴스 시작/중지, AMI 관리 등의 작업을 명령줄에서 수행할 수 있습니다. → [📖 AWS 접근 방법](/section/02-iam#aws-접근-방법)

**(C)** : 그래픽 도구가 아닌 커맨드라인 도구입니다.

**(D)** : EC2 API 도구는 실제로 존재합니다.

**핵심 개념:** EC2 API 커맨드라인 도구

---

### Q243. Your customer wishes to deploy an enterprise application to AWS which will consist of several web servers, several application servers and a small (50GB) Oracle database information is stored, both in the database and the file systems of the various servers. The backup system must support database recovery whole server and whole disk restores, and individual file restores with a recovery time of no more than two hours. They have chosen to use RDS Oracle as the database. Which backup architecture will meet these requirements?

**Options:**
- A) Backup RDS using automated daily DB backups Backup the EC2 instances using AMIs and supplement with file-level backup to S3 using traditional enterprise backup software to provide file level restore.
- B) Backup RDS using a Multi-AZ Deployment Backup the EC2 instances using Amis, and supplement by copying file system data to S3 to provide file-level restore.
- C) Backup RDS using automated daily DB backups Backup the EC2 instances using EBS snapshots and supplement with file-level backups to Amazon Glacier using traditional enterprise backup software to provide file-level restore.
- D) Backup RDS database to S3 using Oracle RMAN Backup the EC2 instances using Amis, and supplement with EBS snapshots for individual volume restore.

**Answer:** A

**해설:**

> **문제:** RTO 2시간 이내로 DB 복구, 서버 전체 복원, 파일 수준 복원을 지원하는 백업 아키텍처는?

| 선지 | 번역 |
|------|------|
| A | RDS 자동 일일 백업 + EC2 AMI 백업 + 엔터프라이즈 백업 소프트웨어로 S3 파일 수준 백업. |
| B | Multi-AZ RDS + EC2 AMI + S3 파일시스템 복사. |
| C | RDS 자동 백업 + EBS 스냅샷 + Glacier 파일 수준 백업. |
| D | Oracle RMAN으로 S3 백업 + EC2 AMI + EBS 스냅샷. |

**(A) 정답** : RDS 자동 백업으로 DB 복구, AMI로 전체 서버 복원, 엔터프라이즈 백업 소프트웨어로 S3에 파일 수준 백업 모두를 지원합니다. RTO 2시간 내에 복구가 가능합니다. → [📖 AWS Backup](/section/26-disaster-recovery-migrations#aws-backup)

**(B)** : Multi-AZ는 재해 복구용이지 백업 솔루션이 아닙니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : Glacier는 검색 시간이 몇 시간 걸려 RTO 2시간을 충족하기 어렵습니다. → [📖 S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(D)** : Oracle RMAN은 RDS에서 직접 사용할 수 없습니다.

**핵심 개념:** RDS 백업, AMI, 파일 수준 복구, RTO

**관련 노트:** [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image), [RPO와 RTO](/section/26-disaster-recovery-migrations#rpo와-rto)

---

### Q244. You are architecting a highly-scalable and reliable web application which will have a huge amount of content. You have decided to use Cloudfront as you know it will speed up distribution of your static and dynamic web content and know that Amazon CloudFront integrates with Amazon CloudWatch metrics so that you can monitor your web application. Because you live in Sydney you have chosen the Asia Pacific (Sydney) region in the AWS console. However you have set up this up but no CloudFront metrics seem to be appearing in the CloudWatch console. What is the most likely reason from the possible choices below for this?

**Options:**
- A) Metrics for CloudWatch are available only when you choose the same region as the application you are monitoring.
- B) You need to pay for CloudWatch for it to become active.
- C) Metrics for CloudWatch are available only when you choose the US East (Virginia).
- D) Metrics for CloudWatch are not available for the Asia Pacific region as yet.

**Answer:** C

**해설:**

> **문제:** Sydney 리전을 선택했는데 CloudFront 메트릭이 CloudWatch에 표시되지 않는 이유는?

| 선지 | 번역 |
|------|------|
| A | CloudWatch 메트릭은 모니터링 중인 애플리케이션과 동일한 리전을 선택해야만 볼 수 있다. |
| B | CloudWatch 활성화를 위해 비용을 지불해야 한다. |
| C | CloudFront의 CloudWatch 메트릭은 US East (Virginia) 리전을 선택해야만 볼 수 있다. |
| D | 아시아 태평양 리전에서는 아직 메트릭을 사용할 수 없다. |

**(A)** : CloudFront는 글로벌 서비스로 특정 리전에 종속되지 않습니다. → [📖 CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B)** : CloudWatch 기본 기능은 무료입니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C) 정답** : Amazon CloudFront의 CloudWatch 메트릭은 US East (N. Virginia) 리전에서만 확인할 수 있습니다. 이는 CloudFront가 글로벌 서비스이지만 메트릭이 us-east-1에 집중되기 때문입니다. → [📖 Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : 리전 제한이 아니라 특정 리전(us-east-1)을 선택해야 하는 문제입니다.

**핵심 개념:** CloudFront + CloudWatch 메트릭, us-east-1 요구사항

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics), [CloudFront 기본 개념](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

---

### Q245. Is the SQL Server Audit feature supported in the Amazon RDS SQL Server engine?

**Options:**
- A) Yes.
- B) No.

**Answer:** B

**해설:**

> **문제:** Amazon RDS SQL Server 엔진에서 SQL Server Audit 기능이 지원되나요?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | 아니요. |

**(A)** : 지원되지 않습니다.

**(B) 정답** : Amazon RDS for SQL Server는 SQL Server Audit 기능을 지원하지 않습니다. RDS는 기반 OS에 대한 접근이 제한되어 일부 SQL Server 기능이 제한됩니다. (참고: 이 문제는 구형 시험 기준이며, 현재는 일부 지원이 될 수 있으나 시험 목적으로는 B가 정답입니다.) → [📖 Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS SQL Server 제한 사항

**관련 노트:** [Amazon RDS](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [RDS Custom](/section/07-rds-aurora-elasticache#rds-custom)

---

### Q246. What is the command line instruction for running the remote desktop client in Windows?

**Options:**
- A) desk.cpl.
- B) mstsc.

**Answer:** B

**해설:**

> **문제:** Windows에서 원격 데스크톱 클라이언트를 실행하는 커맨드라인 명령은?

| 선지 | 번역 |
|------|------|
| A | desk.cpl. |
| B | mstsc. |

**(A)** : desk.cpl은 디스플레이 설정을 여는 명령입니다.

**(B) 정답** : `mstsc`(Microsoft Terminal Services Client)는 Windows에서 원격 데스크톱 연결(RDP)을 시작하는 커맨드라인 명령입니다. EC2 Windows 인스턴스에 RDP로 접속할 때 사용합니다. → [📖 Classic Ports](/section/03-ec2-basics#classic-ports)

**핵심 개념:** Windows RDP 연결, mstsc 명령

---

### Q247. Which of the following cannot be used in Amazon EC2 to control who has access to specific Amazon EC2 instances?

**Options:**
- A) Security Groups.
- B) IAM System.
- C) SSH keys.
- D) Windows passwords.

**Answer:** B

**해설:**

> **문제:** 특정 Amazon EC2 인스턴스에 대한 접근 제어에 사용할 수 없는 것은?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹. |
| B | IAM 시스템. |
| C | SSH 키. |
| D | Windows 암호. |

**(A)** : 보안 그룹은 네트워크 수준에서 EC2 인스턴스 접근을 제어합니다. → [📖 Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

**(B) 정답** : IAM은 AWS API 및 콘솔 접근 제어에 사용되며, 인스턴스 자체 내부 접근(OS 수준)을 직접 제어하지 않습니다. 인스턴스 내부의 누가 로그인할 수 있는지는 IAM이 아닌 SSH 키나 OS 인증으로 제어합니다. → [📖 IAM Policies 정책](/section/02-iam#iam-policies-정책)

**(C)** : SSH 키 페어는 Linux EC2 인스턴스에 대한 접근을 제어합니다. → [📖 EC2 Instance Connect](/section/03-ec2-basics#ec2-instance-connect)

**(D)** : Windows 암호는 Windows EC2 인스턴스의 RDP 접근을 제어합니다. → [📖 Classic Ports](/section/03-ec2-basics#classic-ports)

**핵심 개념:** EC2 접근 제어 메커니즘, IAM vs OS 수준 인증

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q248. What is the charge for the data transfer incurred in replicating data between your primary and standby?

**Options:**
- A) Same as the standard data transfer charge.
- B) Double the standard data transfer charge.
- C) No charge. It is free.
- D) Half of the standard data transfer charge.

**Answer:** C

**해설:**

> **문제:** 기본 DB와 대기 DB 간 데이터 복제 시 데이터 전송 요금은?

| 선지 | 번역 |
|------|------|
| A | 표준 데이터 전송 요금과 동일. |
| B | 표준 데이터 전송 요금의 두 배. |
| C | 요금 없음. 무료. |
| D | 표준 데이터 전송 요금의 절반. |

**(A)** : 복제 데이터 전송에는 별도 요금이 없습니다.

**(B)** : 두 배 요금이 부과되지 않습니다.

**(C) 정답** : RDS Multi-AZ 구성에서 기본 인스턴스와 대기 인스턴스 간의 데이터 복제는 무료입니다. → [📖 RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(D)** : 절반 요금도 부과되지 않습니다.

**핵심 개념:** RDS Multi-AZ 데이터 복제 요금

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

---

### Q249. You have a load balancer configured for VPC, and all back-end Amazon EC2 instances are in service. However, your web browser times out when connecting to the load balancer's DNS name. Which options are probable causes of this behavior? (Choose 2 answers)

**Options:**
- A) The load balancer was not configured to use a public subnet with an Internet gateway configured.
- B) The Amazon EC2 instances do not have a dynamically allocated private IP address.
- C) The security groups or network ACLs are not properly configured for web traffic.
- D) The load balancer is not configured in a private subnet with a NAT instance.
- E) The VPC does not have a VGW configured.

**Answer:** A, C

**해설:**

> **문제:** VPC에서 로드 밸런서의 DNS 이름으로 접속 시 타임아웃이 발생하는 원인은? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | 로드 밸런서가 인터넷 게이트웨이가 있는 퍼블릭 서브넷에 구성되지 않았다. |
| B | EC2 인스턴스에 동적 프라이빗 IP가 할당되지 않았다. |
| C | 보안 그룹 또는 네트워크 ACL이 웹 트래픽에 대해 올바르게 구성되지 않았다. |
| D | 로드 밸런서가 NAT 인스턴스가 있는 프라이빗 서브넷에 구성되지 않았다. |
| E | VPC에 VGW(Virtual Private Gateway)가 구성되지 않았다. |

**(A) 정답** : 인터넷에서 접근 가능한 로드 밸런서는 인터넷 게이트웨이가 연결된 퍼블릭 서브넷에 배치되어야 합니다. → [📖 Internet Gateway IGW](/section/25-vpc#internet-gateway-igw)

**(B)** : EC2 인스턴스는 항상 프라이빗 IP가 할당됩니다. 이것이 타임아웃 원인이 아닙니다. → [📖 IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

**(C) 정답** : 보안 그룹이나 네트워크 ACL에서 웹 포트(80, 443)가 차단되어 있으면 타임아웃이 발생합니다. → [📖 Security Group vs NACL](/section/25-vpc#security-group-vs-nacl)

**(D)** : 퍼블릭 로드 밸런서는 NAT 인스턴스가 필요하지 않습니다. → [📖 NAT Gateway](/section/25-vpc#nat-gateway)

**(E)** : VGW는 VPN 연결용이며 인터넷 접근과 무관합니다. → [📖 Site-to-Site VPN](/section/25-vpc#sitetosite-vpn)

**핵심 개념:** ELB VPC 구성, 퍼블릭 서브넷, 보안 그룹/ACL

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [서브넷 Subnet](/section/25-vpc#서브넷-subnet)

---

### Q250. Resources that are created in AWS are identified by a unique identifier called an

**Options:**
- A) Amazon Resource Number.
- B) Amazon Resource Nametag.
- C) Amazon Resource Name.
- D) Amazon Resource Namespace.

**Answer:** C

**해설:**

> **문제:** AWS에서 생성된 리소스를 식별하는 고유 식별자를 무엇이라고 하나요?

| 선지 | 번역 |
|------|------|
| A | Amazon Resource Number. |
| B | Amazon Resource Nametag. |
| C | Amazon Resource Name. |
| D | Amazon Resource Namespace. |

**(A)** : ARN은 Number가 아닌 Name입니다.

**(B)** : Nametag는 존재하지 않는 개념입니다.

**(C) 정답** : ARN(Amazon Resource Name)은 AWS 리소스를 전 세계적으로 고유하게 식별하는 이름입니다. 형식: `arn:partition:service:region:account-id:resource` → [📖 글로벌 서비스 vs 리전 서비스](/section/01-getting-started#글로벌-서비스-vs-리전-서비스)

**(D)** : Amazon Resource Namespace는 존재하지 않는 개념입니다.

**핵심 개념:** ARN (Amazon Resource Name)

---
