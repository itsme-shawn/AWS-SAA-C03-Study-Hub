# Ditectrev SAA-C03 Practice Questions — Batch 11 (Q501-Q550)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q501. Select the correct statement: Within Amazon EC2, when using Linux instances, the device name /dev/sda1 is [...].

**Options:**
- A) reserved for EBS volumes.
- B) recommended for EBS volumes.
- C) recommended for instance store volumes.
- D) reserved for the root device.

**Answer:** D

**해설:**

> **문제:** Amazon EC2에서 Linux 인스턴스를 사용할 때 디바이스 이름 /dev/sda1은 무엇을 위해 사용됩니까?

| 선지 | 번역 |
|------|------|
| A | EBS 볼륨용으로 예약됩니다. |
| B | EBS 볼륨에 권장됩니다. |
| C | 인스턴스 스토어 볼륨에 권장됩니다. |
| D | 루트 디바이스용으로 예약됩니다. |

**(A)** : /dev/sda1은 EBS 볼륨 일반 용도로 예약된 것이 아닙니다.

**(B)** : 권장(recommended)이 아니라 예약(reserved)된 명칭입니다.

**(C)** : 인스턴스 스토어 볼륨과는 관련이 없습니다. → [📖 인스턴스 스토어 볼륨과는 관련이 없습니다.](/section/05-ec2-instance-storage#ec2-instance-store)

**(D) 정답** : Linux 인스턴스에서 /dev/sda1은 루트 디바이스(루트 볼륨)용으로 예약된 디바이스 이름입니다. 루트 EBS 볼륨이 이 경로에 마운트됩니다. → [📖 Linux 인스턴스에서 /dev/sda1은 루트 디바이스(루트 볼륨)용으로 예약된 디바이스 이름입니다. 루트 EBS 볼륨이 이 경로에 마운트됩니...](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**핵심 개념:** EC2 Linux 인스턴스 디바이스 명명 규칙, /dev/sda1 루트 디바이스 예약

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q502. Does Amazon Route 53 support NS Records?

**Options:**
- A) Yes, it supports Name Service records.
- B) No.
- C) It supports only MX records.
- D) Yes, it supports Name Server records.

**Answer:** D

**해설:**

> **문제:** Amazon Route 53은 NS 레코드를 지원합니까?

| 선지 | 번역 |
|------|------|
| A | 예, Name Service 레코드를 지원합니다. |
| B | 아니요. |
| C | MX 레코드만 지원합니다. |
| D | 예, Name Server 레코드를 지원합니다. |

**(A)** : NS는 Name Service가 아니라 Name Server의 약자입니다. → [📖 NS는 Name Service가 아니라 Name Server의 약자입니다.](/section/08-route-53#dns-레코드-타입)

**(B)** : Route 53은 NS 레코드를 지원합니다. → [📖 Route 53은 NS 레코드를 지원합니다.](/section/08-route-53#dns-레코드-타입)

**(C)** : Route 53은 MX 외에도 A, AAAA, CNAME, NS, SOA, TXT 등 다양한 레코드 타입을 지원합니다. → [📖 Route 53은 MX 외에도 A, AAAA, CNAME, NS, SOA, TXT 등 다양한 레코드 타입을 지원합니다.](/section/08-route-53#dns-레코드-타입)

**(D) 정답** : NS는 Name Server 레코드의 약자이며, Route 53은 이를 완벽히 지원합니다. 호스팅 영역 생성 시 NS 레코드가 자동으로 생성됩니다. → [📖 NS는 Name Server 레코드의 약자이며, Route 53은 이를 완벽히 지원합니다. 호스팅 영역 생성 시 NS 레코드가 자동으로 생성됩니...](/section/08-route-53#dns-레코드-타입)

**핵심 개념:** Route 53 지원 DNS 레코드 타입, NS(Name Server) 레코드

**관련 노트:** [DNS 레코드 타입](/section/08-route-53#dns-레코드-타입)

---

### Q503. Your web application front end consists of multiple EC2 instances behind an Elastic Load Balancer. You configured ELB to perform health checks on these EC2 instances, if an instance fails to pass health checks, which statement will be true?

**Options:**
- A) The instance gets terminated automatically by the ELB.
- B) The instance gets quarantined by the ELB for root cause analysis.
- C) The instance is replaced automatically by the ELB.
- D) The ELB stops sending traffic to the instance that failed its health check.

**Answer:** D

**해설:**

> **문제:** ELB 헬스 체크에 실패한 EC2 인스턴스에 대해 어떤 일이 발생합니까?

| 선지 | 번역 |
|------|------|
| A | ELB가 자동으로 인스턴스를 종료합니다. |
| B | ELB가 근본 원인 분석을 위해 인스턴스를 격리합니다. |
| C | ELB가 자동으로 인스턴스를 교체합니다. |
| D | ELB는 헬스 체크에 실패한 인스턴스로의 트래픽 전송을 중지합니다. |

**(A)** : ELB는 인스턴스를 종료하는 권한이 없습니다. 인스턴스 종료는 ASG(Auto Scaling Group)의 역할입니다.

**(B)** : ELB에는 격리(quarantine) 기능이 없습니다.

**(C)** : 인스턴스 교체는 ASG의 역할이며 ELB의 기능이 아닙니다. → [📖 인스턴스 교체는 ASG의 역할이며 ELB의 기능이 아닙니다.](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(D) 정답** : ELB는 헬스 체크에 실패한 인스턴스를 로테이션에서 제외하여 해당 인스턴스로 새 트래픽을 보내지 않습니다. 인스턴스가 회복되어 헬스 체크를 통과하면 다시 트래픽을 받습니다. → [📖 ELB는 헬스 체크에 실패한 인스턴스를 로테이션에서 제외하여 해당 인스턴스로 새 트래픽을 보내지 않습니다. 인스턴스가 회복되어 헬스 체크를 통과...](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**핵심 개념:** ELB 헬스 체크 동작, ELB vs ASG 역할 구분

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q504. George has launched three EC2 instances inside the US-East-1a zone with his AWS account. Ray has launched two EC2 instances in the US-East-1a zone with his AWS account. Which of the below mentioned statements will help George and Ray understand the Availability Zone (AZ) concept better?

**Options:**
- A) All the instances of George and Ray can communicate over a private IP with a minimal cost.
- B) The US-East-1a region of George and Ray can be different Availability Zones.
- C) All the instances of George and Ray can communicate over a private IP without any cost.
- D) The instances of George and Ray will be running in the same data centre.

**Answer:** B

**해설:**

> **문제:** George와 Ray가 각자의 AWS 계정에서 US-East-1a에 EC2 인스턴스를 실행했습니다. 가용 영역(AZ) 개념을 이해하는 데 도움이 되는 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | George와 Ray의 모든 인스턴스는 최소 비용으로 프라이빗 IP로 통신할 수 있습니다. |
| B | George와 Ray의 US-East-1a는 서로 다른 가용 영역일 수 있습니다. |
| C | George와 Ray의 모든 인스턴스는 비용 없이 프라이빗 IP로 통신할 수 있습니다. |
| D | George와 Ray의 인스턴스는 동일한 데이터 센터에서 실행됩니다. |

**(A)** : 다른 계정 간 통신은 프라이빗 IP로 직접 통신할 수 없으며 비용도 발생합니다.

**(B) 정답** : AWS는 AZ 이름(예: us-east-1a)을 계정별로 다른 물리적 데이터 센터에 매핑합니다. 이는 특정 AZ에 트래픽이 집중되는 것을 방지하기 위한 설계입니다. 따라서 George의 us-east-1a와 Ray의 us-east-1a는 실제로 다른 물리적 AZ일 수 있습니다. → [📖 AWS는 AZ 이름(예: us-east-1a)을 계정별로 다른 물리적 데이터 센터에 매핑합니다. 이는 특정 AZ에 트래픽이 집중되는 것을 방지하...](/section/01-getting-started#aws-글로벌-인프라)

**(C)** : 서로 다른 계정의 인스턴스 간 통신에는 데이터 전송 비용이 발생합니다.

**(D)** : B에서 설명했듯이 동일한 AZ 이름이더라도 다른 물리적 데이터 센터일 수 있습니다. → [📖 B에서 설명했듯이 동일한 AZ 이름이더라도 다른 물리적 데이터 센터일 수 있습니다.](/section/01-getting-started#aws-글로벌-인프라)

**핵심 개념:** AZ 이름과 물리적 위치의 계정별 매핑, AWS AZ 명명 규칙

**관련 노트:** [AWS 글로벌 인프라](/section/01-getting-started#aws-글로벌-인프라)

---

### Q505. Once again your customers are concerned about the security of their sensitive data and with their latest enquiry ask about what happens to old storage devices on AWS. What would be the best answer to this question?

**Options:**
- A) AWS reformats the disks and uses them again.
- B) AWS uses the techniques detailed in DoD 5220.22-M to destroy data as part of the decommissioning process.
- C) AWS uses their own proprietary software to destroy data as part of the decommissioning process.
- D) AWS uses a 3rd party security organization to destroy data as part of the decommissioning process.

**Answer:** B

**해설:**

> **문제:** AWS의 오래된 스토리지 디바이스에 저장된 데이터는 어떻게 처리됩니까?

| 선지 | 번역 |
|------|------|
| A | AWS는 디스크를 포맷하고 재사용합니다. |
| B | AWS는 폐기 프로세스의 일환으로 DoD 5220.22-M 기술을 사용하여 데이터를 파괴합니다. |
| C | AWS는 폐기 프로세스의 일환으로 자체 독점 소프트웨어를 사용하여 데이터를 파괴합니다. |
| D | AWS는 폐기 프로세스의 일환으로 제3자 보안 조직을 사용하여 데이터를 파괴합니다. |

**(A)** : 단순 포맷은 데이터를 완전히 삭제하지 않아 보안에 취약합니다.

**(B) 정답** : AWS는 스토리지 디바이스 폐기 시 미국 국방부 표준인 DoD 5220.22-M에 명시된 기술을 사용하여 데이터를 완전히 파괴합니다.

**(C)** : AWS는 독점 소프트웨어가 아닌 공인된 DoD 표준을 사용합니다.

**(D)** : AWS가 직접 처리하며 제3자 보안 조직에 위탁하지 않습니다.

**핵심 개념:** AWS 물리적 보안, 스토리지 디바이스 폐기 절차, DoD 5220.22-M

---

### Q506. Which of the following are characteristics of Amazon VPC subnets? (Choose 2 answers)

**Options:**
- A) Each subnet spans at least 2 Availability Zones to provide a high-availability environment.
- B) Each subnet maps to a single Availability Zone.
- C) CIDR block mask of/25 is the smallest range supported.
- D) By default, all subnets can route between each other, whether they are private or public.
- E) Instances in a private subnet can communicate with the Internet only if they have an Elastic IP.

**Answer:** B, E

**해설:**

> **문제:** Amazon VPC 서브넷의 특성으로 올바른 것을 2개 고르시오.

| 선지 | 번역 |
|------|------|
| A | 각 서브넷은 고가용성 환경을 제공하기 위해 최소 2개의 가용 영역에 걸쳐 있습니다. |
| B | 각 서브넷은 단일 가용 영역에 매핑됩니다. |
| C | /25 CIDR 블록 마스크가 지원되는 가장 작은 범위입니다. |
| D | 기본적으로 모든 서브넷은 프라이빗이든 퍼블릭이든 서로 라우팅할 수 있습니다. |
| E | 프라이빗 서브넷의 인스턴스는 Elastic IP가 있어야만 인터넷과 통신할 수 있습니다. |

**(A)** : 서브넷은 단일 AZ에만 속합니다. 여러 AZ에 걸칠 수 없습니다. → [📖 서브넷은 단일 AZ에만 속합니다. 여러 AZ에 걸칠 수 없습니다.](/section/25-vpc#서브넷-subnet)

**(B) 정답** : VPC 서브넷은 항상 단일 가용 영역에 매핑됩니다. → [📖 VPC 서브넷은 항상 단일 가용 영역에 매핑됩니다.](/section/25-vpc#서브넷-subnet)

**(C)** : VPC 서브넷의 최소 CIDR 블록은 /28입니다. → [📖 VPC 서브넷의 최소 CIDR 블록은 /28입니다.](/section/25-vpc#서브넷-subnet)

**(D)** : 기본적으로 VPC 내 서브넷들은 로컬 라우트를 통해 통신 가능하지만, 프라이빗 서브넷이 인터넷과 통신하려면 NAT 게이트웨이/인스턴스가 필요합니다. → [📖 기본적으로 VPC 내 서브넷들은 로컬 라우트를 통해 통신 가능하지만, 프라이빗 서브넷이 인터넷과 통신하려면 NAT 게이트웨이/인스턴스가 필요합니...](/section/25-vpc#nat-gateway)

**(E) 정답** : 프라이빗 서브넷의 인스턴스는 NAT 게이트웨이/인스턴스 없이는 인터넷 통신이 불가능하며, Elastic IP를 가진 경우에만 직접 인터넷 통신이 가능합니다. → [📖 프라이빗 서브넷의 인스턴스는 NAT 게이트웨이/인스턴스 없이는 인터넷 통신이 불가능하며, Elastic IP를 가진 경우에만 직접 인터넷 통신이...](/section/25-vpc#nat-gateway)

**핵심 개념:** VPC 서브넷 특성, 단일 AZ 매핑, 프라이빗 서브넷 인터넷 통신 조건

**관련 노트:** [서브넷 Subnet](/section/25-vpc#서브넷-subnet), [NAT Gateway](/section/25-vpc#nat-gateway)

---

### Q507. Which AWS instance address has the following characteristics? 'If you stop an instance, its Elastic IP address is unmapped, and you must remap it when you restart the instance.'

**Options:**
- A) Both A and B.
- B) None of these.
- C) VPC Addresses.
- D) EC2 Addresses.

**Answer:** D

**해설:**

> **문제:** "인스턴스를 중지하면 Elastic IP 주소가 해제되며, 인스턴스를 재시작할 때 다시 매핑해야 한다"는 특성을 가진 AWS 인스턴스 주소 유형은?

| 선지 | 번역 |
|------|------|
| A | A와 B 모두 해당됩니다. |
| B | 해당 없음. |
| C | VPC 주소. |
| D | EC2 주소. |

**(A)** : A와 B 모두에 해당하는 설명이 아닙니다.

**(B)** : EC2-Classic 환경의 EC2 주소가 이 특성을 가집니다.

**(C)** : VPC 환경에서는 인스턴스를 중지해도 EIP가 연결된 상태를 유지합니다. → [📖 VPC 환경에서는 인스턴스를 중지해도 EIP가 연결된 상태를 유지합니다.](/section/04-ec2-associate#elastic-ip)

**(D) 정답** : EC2-Classic 환경의 EC2 주소(EIP)는 인스턴스를 중지하면 자동으로 해제되며 재시작 시 다시 매핑해야 합니다. VPC의 EIP는 인스턴스가 중지되어도 연결 상태를 유지합니다. → [📖 EC2-Classic 환경의 EC2 주소(EIP)는 인스턴스를 중지하면 자동으로 해제되며 재시작 시 다시 매핑해야 합니다. VPC의 EIP는 인...](/section/04-ec2-associate#elastic-ip)

**핵심 개념:** EC2-Classic vs VPC의 Elastic IP 동작 차이

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip)

---

### Q508. You are designing a data leak prevention solution for your VPC environment. You want your VPC Instances to be able to access software depots and distributions on the Internet for product updates. The depots and distributions are accessible via third party CDNs by their URLs. You want to explicitly deny any other outbound connections from your VPC instances to hosts on the internet. Which of the following options would you consider?

**Options:**
- A) Configure a web proxy server in your VPC and enforce URL-based rules for outbound access Remove default routes.
- B) Implement security groups and configure outbound rules to only permit traffic to software depots.
- C) Move all your instances into private VPC subnets remove default routes from all routing tables and add specific routes to the software depots and distributions only.
- D) Implement network access control lists to all specific destinations, with an Implicit deny as a rule.

**Answer:** A

**해설:**

> **문제:** VPC 환경에서 데이터 유출 방지 솔루션을 설계하고 있습니다. VPC 인스턴스가 URL 기반으로 소프트웨어 업데이트 사이트에만 접근하고 다른 아웃바운드 연결은 명시적으로 차단하려면 어떤 방법을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | VPC에 웹 프록시 서버를 구성하고 아웃바운드 액세스에 URL 기반 규칙을 적용한 후 기본 라우트를 제거합니다. |
| B | 보안 그룹을 구현하고 소프트웨어 저장소로만 트래픽을 허용하는 아웃바운드 규칙을 구성합니다. |
| C | 모든 인스턴스를 프라이빗 VPC 서브넷으로 이동하고 라우팅 테이블에서 기본 라우트를 제거한 후 소프트웨어 저장소에 대한 특정 라우트만 추가합니다. |
| D | 특정 대상에 대한 네트워크 ACL을 구현하고 암묵적 거부 규칙을 적용합니다. |

**(A) 정답** : 웹 프록시 서버는 URL 기반 필터링이 가능합니다. CDN 경유 소프트웨어 저장소는 IP가 동적으로 변할 수 있으므로 IP 기반이 아닌 URL 기반 제어가 필요합니다. 기본 라우트를 제거하고 모든 트래픽을 프록시를 경유하게 하면 정밀한 아웃바운드 제어가 가능합니다.

**(B)** : 보안 그룹은 IP/포트 기반으로 동작하며 URL 기반 필터링을 지원하지 않습니다. CDN은 IP가 자주 변경되므로 보안 그룹만으로는 부족합니다. → [📖 보안 그룹은 IP/포트 기반으로 동작하며 URL 기반 필터링을 지원하지 않습니다. CDN은 IP가 자주 변경되므로 보안 그룹만으로는 부족합니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**(C)** : 라우팅 테이블은 IP 주소 기반이므로 URL 기반 필터링이 불가능합니다.

**(D)** : NACL도 IP/포트 기반이므로 URL 기반 제어가 불가능합니다. → [📖 NACL도 IP/포트 기반이므로 URL 기반 제어가 불가능합니다.](/section/25-vpc#nacl-network-access-control-list)

**핵심 개념:** URL 기반 아웃바운드 트래픽 제어, 웹 프록시 서버 활용, 데이터 유출 방지(DLP)

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [AWS Network Firewall](/section/25-vpc#aws-network-firewall)

---

### Q509. What is an isolated database environment running in the cloud (Amazon RDS) called?

**Options:**
- A) DB Instance.
- B) DB Unit.
- C) DB Server.
- D) DB Volume.

**Answer:** A

**해설:**

> **문제:** 클라우드에서 실행되는 격리된 데이터베이스 환경(Amazon RDS)을 무엇이라고 합니까?

| 선지 | 번역 |
|------|------|
| A | DB 인스턴스. |
| B | DB 유닛. |
| C | DB 서버. |
| D | DB 볼륨. |

**(A) 정답** : Amazon RDS에서 클라우드에서 실행되는 격리된 데이터베이스 환경을 DB 인스턴스(DB Instance)라고 합니다. DB 인스턴스는 하나 이상의 데이터베이스를 포함할 수 있습니다. → [📖 Amazon RDS에서 클라우드에서 실행되는 격리된 데이터베이스 환경을 DB 인스턴스(DB Instance)라고 합니다. DB 인스턴스는 하나 ...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B)** : DB Unit은 RDS에서 사용하지 않는 용어입니다.

**(C)** : DB 서버는 일반적인 용어이지만 RDS의 공식 명칭이 아닙니다.

**(D)** : DB 볼륨은 스토리지를 의미하는 용어로 격리된 DB 환경을 지칭하지 않습니다.

**핵심 개념:** Amazon RDS 기본 용어, DB 인스턴스 개념

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q510. A user is sending bulk emails using AWS SES. The emails are not reaching some of the targeted audience because they are not authorized by the ISPs. How can the user ensure that the emails are all delivered?

**Options:**
- A) Send an email using DKIM with SES.
- B) Send an email using SMTP with SES.
- C) Open a ticket with AWS support to get it authorized with the ISP.
- D) Authorize the ISP by sending emails from the development account.

**Answer:** A

**해설:**

> **문제:** AWS SES로 대량 이메일을 발송하는데 ISP(인터넷 서비스 제공업체) 인증 문제로 일부 수신자에게 이메일이 도달하지 않습니다. 모든 이메일이 전달되도록 하려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | DKIM을 사용하여 SES로 이메일을 발송합니다. |
| B | SMTP를 사용하여 SES로 이메일을 발송합니다. |
| C | AWS 지원 티켓을 열어 ISP 인증을 받습니다. |
| D | 개발 계정에서 이메일을 발송하여 ISP를 인증합니다. |

**(A) 정답** : DKIM(DomainKeys Identified Mail)은 이메일 발신자의 도메인을 디지털 서명으로 인증하는 표준입니다. SES에서 DKIM을 사용하면 ISP가 이메일의 신뢰성을 검증할 수 있어 스팸 필터를 통과할 가능성이 높아집니다. → [📖 DKIM(DomainKeys Identified Mail)은 이메일 발신자의 도메인을 디지털 서명으로 인증하는 표준입니다. SES에서 DKIM을...](/section/28-other-services#amazon-simple-email-service-ses)

**(B)** : SMTP는 전송 프로토콜로, ISP 인증 문제를 해결하지 못합니다.

**(C)** : AWS 지원이 ISP를 인증해 줄 수 없습니다.

**(D)** : 개발 계정에서 발송한다고 ISP 인증 문제가 해결되지 않습니다.

**핵심 개념:** AWS SES 이메일 인증, DKIM(DomainKeys Identified Mail), 이메일 전달률 향상

**관련 노트:** [Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

---

### Q511. What's an ECU?

**Options:**
- A) Extended Cluster User.
- B) None of these.
- C) Elastic Computer Usage.
- D) Elastic Compute Unit.

**Answer:** D

**해설:**

> **문제:** ECU는 무엇의 약자입니까?

| 선지 | 번역 |
|------|------|
| A | Extended Cluster User (확장 클러스터 사용자). |
| B | 해당 없음. |
| C | Elastic Computer Usage (탄력적 컴퓨터 사용). |
| D | Elastic Compute Unit (탄력적 컴퓨팅 단위). |

**(A)** : ECU의 정확한 정의가 아닙니다.

**(B)** : D가 정확한 정의이므로 오답입니다.

**(C)** : Computer가 아니라 Compute입니다.

**(D) 정답** : ECU는 Elastic Compute Unit의 약자로, EC2 인스턴스의 CPU 성능을 비교하기 위해 AWS가 사용한 단위입니다. 현재는 vCPU로 대체되었습니다. → [📖 ECU는 Elastic Compute Unit의 약자로, EC2 인스턴스의 CPU 성능을 비교하기 위해 AWS가 사용한 단위입니다. 현재는 vC...](/section/03-ec2-basics#핵심-개념)

**핵심 개념:** EC2 성능 측정 단위, ECU(Elastic Compute Unit)

**관련 노트:** [EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

---

### Q512. You would like to create a mirror image of your production environment in another region for disaster recovery purposes. Which of the following AWS resources do not need to be recreated in the second region? (Choose 2 answers)

**Options:**
- A) Route 53 Record Sets.
- B) IAM Roles.
- C) Elastic IP Addresses (EIP).
- D) EC2 Key Pairs.
- E) Launch configurations.
- F) Security Groups.

**Answer:** A, B

**해설:**

> **문제:** 재해 복구를 위해 다른 리전에 프로덕션 환경의 미러 이미지를 생성하려 합니다. 두 번째 리전에서 재생성할 필요가 없는 AWS 리소스를 2개 고르시오.

| 선지 | 번역 |
|------|------|
| A | Route 53 레코드 세트. |
| B | IAM 역할. |
| C | Elastic IP 주소(EIP). |
| D | EC2 키 페어. |
| E | 시작 구성(Launch configurations). |
| F | 보안 그룹. |

**(A) 정답** : Route 53은 글로벌 서비스로 리전에 종속되지 않습니다. 기존 레코드 세트를 그대로 사용하거나 장애 조치 라우팅 정책을 추가하면 됩니다. → [📖 Route 53은 글로벌 서비스로 리전에 종속되지 않습니다. 기존 레코드 세트를 그대로 사용하거나 장애 조치 라우팅 정책을 추가하면 됩니다.](/section/08-route-53#route-53-특징)

**(B) 정답** : IAM은 글로벌 서비스로 리전에 종속되지 않습니다. 한 리전에서 생성한 IAM 역할은 다른 리전에서도 동일하게 사용됩니다. → [📖 IAM은 글로벌 서비스로 리전에 종속되지 않습니다. 한 리전에서 생성한 IAM 역할은 다른 리전에서도 동일하게 사용됩니다.](/section/02-iam#개요)

**(C)** : EIP는 리전별로 다르며 다른 리전에서 재생성해야 합니다. → [📖 EIP는 리전별로 다르며 다른 리전에서 재생성해야 합니다.](/section/04-ec2-associate#elastic-ip)

**(D)** : EC2 키 페어는 리전별로 관리되므로 다른 리전에서 재생성해야 합니다. → [📖 EC2 키 페어는 리전별로 관리되므로 다른 리전에서 재생성해야 합니다.](/section/03-ec2-basics#ec2-구성-요소)

**(E)** : 시작 구성은 리전별 리소스이므로 재생성이 필요합니다. → [📖 시작 구성은 리전별 리소스이므로 재생성이 필요합니다.](/section/06-high-availability-scalability#auto-scaling-group-asg)

**(F)** : 보안 그룹은 리전별(VPC별) 리소스이므로 재생성이 필요합니다. → [📖 보안 그룹은 리전별(VPC별) 리소스이므로 재생성이 필요합니다.](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** AWS 글로벌 서비스(Route 53, IAM) vs 리전별 서비스, 재해 복구 아키텍처

**관련 노트:** [글로벌 서비스 vs 리전 서비스](/section/01-getting-started#글로벌-서비스-vs-리전-서비스), [4가지 DR 전략 빠른 RTO 순](/section/26-disaster-recovery-migrations#4가지-dr-전략-빠른-rto-순)

---

### Q513. Which procedure for backing up a relational database on EC2 that is using a set of RAIDed EBS volumes for storage minimizes the time during which the database cannot be written to and results in a consistent backup?

**Options:**
- A) 1. Detach EBS volumes, 2. Start EBS snapshot of volumes, 3. Re-attach EBS volumes.
- B) 1. Stop the EC2 Instance. 2. Snapshot the EBS volumes.
- C) 1. Suspend disk I/O, 2. Create an image of the EC2 Instance, 3. Resume disk I/O.
- D) 1. Suspend disk I/O, 2. Start EBS snapshot of volumes, 3. Resume disk I/O.
- E) 1. Suspend disk I/O, 2. Start EBS snapshot of volumes, 3. Wait for snapshots to complete, 4. Resume disk I/O.

**Answer:** A

**해설:**

> **문제:** RAID 구성의 EBS 볼륨을 사용하는 EC2 기반 관계형 DB를 백업할 때, DB 쓰기 불가 시간을 최소화하면서 일관된 백업을 만드는 절차는?

| 선지 | 번역 |
|------|------|
| A | 1. EBS 볼륨 분리, 2. 볼륨 EBS 스냅샷 시작, 3. EBS 볼륨 재연결. |
| B | 1. EC2 인스턴스 중지, 2. EBS 볼륨 스냅샷. |
| C | 1. 디스크 I/O 중단, 2. EC2 인스턴스 이미지 생성, 3. 디스크 I/O 재개. |
| D | 1. 디스크 I/O 중단, 2. EBS 스냅샷 시작, 3. 디스크 I/O 재개. |
| E | 1. 디스크 I/O 중단, 2. EBS 스냅샷 시작, 3. 스냅샷 완료 대기, 4. 디스크 I/O 재개. |

**(A) 정답** : EBS 볼륨을 분리하면 DB 접근이 차단되지만, 스냅샷 시작 후 바로 재연결하면 쓰기 불가 시간을 최소화할 수 있습니다. EBS 스냅샷은 비동기적으로 완료되므로 재연결 후에도 스냅샷이 진행됩니다. → [📖 EBS 볼륨을 분리하면 DB 접근이 차단되지만, 스냅샷 시작 후 바로 재연결하면 쓰기 불가 시간을 최소화할 수 있습니다. EBS 스냅샷은 비동기...](/section/05-ec2-instance-storage#ebs-snapshots)

**(B)** : 인스턴스를 완전히 중지하면 가용성이 크게 저하됩니다.

**(C)** : AMI 생성은 스냅샷보다 시간이 더 걸리며 필요 이상으로 복잡합니다.

**(D)** : I/O를 중단한 채로 스냅샷이 완료될 때까지 기다리지 않으므로 일관성이 보장되지 않을 수 있습니다. → [📖 I/O를 중단한 채로 스냅샷이 완료될 때까지 기다리지 않으므로 일관성이 보장되지 않을 수 있습니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**(E)** : 스냅샷이 완료될 때까지 I/O를 중단하면 쓰기 불가 시간이 매우 길어집니다. → [📖 스냅샷이 완료될 때까지 I/O를 중단하면 쓰기 불가 시간이 매우 길어집니다.](/section/05-ec2-instance-storage#ebs-snapshots)

**핵심 개념:** RAID EBS 볼륨 백업 절차, EBS 스냅샷 비동기 처리, 백업 중 가용성 유지

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Multi-Attach io1/io2](/section/05-ec2-instance-storage#ebs-multiattach-io1io2)

---

### Q514. My Read Replica appears 'stuck' after a Multi-AZ failover and is unable to obtain or apply updates from the source DB Instance. What do I do?

**Options:**
- A) You will need to delete the Read Replica and create a new one to replace it.
- B) You will need to disassociate the DB Engine and re associate it.
- C) The instance should be deployed to Single AZ and then moved to Multi-AZ once again.
- D) You will need to delete the DB Instance and create a new one to replace it.

**Answer:** A

**해설:**

> **문제:** Multi-AZ 장애 조치 후 Read Replica가 멈춰(stuck) 원본 DB 인스턴스의 업데이트를 가져오거나 적용할 수 없습니다. 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | Read Replica를 삭제하고 새로 생성하여 교체해야 합니다. |
| B | DB 엔진의 연결을 해제하고 다시 연결해야 합니다. |
| C | 인스턴스를 Single-AZ로 배포한 후 다시 Multi-AZ로 전환해야 합니다. |
| D | DB 인스턴스를 삭제하고 새로 생성하여 교체해야 합니다. |

**(A) 정답** : Multi-AZ 장애 조치 후 Read Replica가 새 주 인스턴스를 추적하지 못해 stuck 상태가 될 수 있습니다. 이 경우 Read Replica를 삭제하고 새로 생성하는 것이 권장 해결책입니다. → [📖 Multi-AZ 장애 조치 후 Read Replica가 새 주 인스턴스를 추적하지 못해 stuck 상태가 될 수 있습니다. 이 경우 Read R...](/section/07-rds-aurora-elasticache#rds-read-replicas)

**(B)** : DB 엔진 연결 해제/재연결 옵션은 RDS에 존재하지 않습니다.

**(C)** : Single-AZ로 전환했다가 다시 Multi-AZ로 전환하는 것은 이 문제를 해결하지 못합니다. → [📖 Single-AZ로 전환했다가 다시 Multi-AZ로 전환하는 것은 이 문제를 해결하지 못합니다.](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(D)** : DB 인스턴스(원본) 전체를 삭제할 필요는 없으며, Read Replica만 재생성하면 됩니다.

**핵심 개념:** RDS Multi-AZ 장애 조치, Read Replica 재생성, 복제 지연 해결

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [RDS Read Replicas](/section/07-rds-aurora-elasticache#rds-read-replicas)

---

### Q515. You are setting up some IAM user policies and have also become aware that some services support resource-based permissions, which let you attach policies to the service's resources instead of to IAM users or groups. Which of the below statements is true in regards to resource-level permissions?

**Options:**
- A) All services support resource-level permissions for all actions.
- B) Resource-level permissions are supported by Amazon CloudFront.
- C) All services support resource-level permissions only for some actions.
- D) Some services support resource-level permissions only for some actions.

**Answer:** D

**해설:**

> **문제:** 리소스 수준 권한(resource-level permissions)에 대한 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 모든 서비스는 모든 작업에 대해 리소스 수준 권한을 지원합니다. |
| B | Amazon CloudFront는 리소스 수준 권한을 지원합니다. |
| C | 모든 서비스는 일부 작업에 대해서만 리소스 수준 권한을 지원합니다. |
| D | 일부 서비스만 일부 작업에 대해 리소스 수준 권한을 지원합니다. |

**(A)** : 모든 서비스가 리소스 수준 권한을 지원하지는 않습니다. → [📖 모든 서비스가 리소스 수준 권한을 지원하지는 않습니다.](/section/02-iam#iam-policies-정책)

**(B)** : CloudFront는 리소스 수준 권한을 지원하지 않습니다. → [📖 CloudFront는 리소스 수준 권한을 지원하지 않습니다.](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(C)** : 모든 서비스가 아니라 일부 서비스만 지원합니다.

**(D) 정답** : AWS에서 리소스 수준 권한은 일부 서비스(예: S3, EC2)에서만 지원되며, 그 서비스 내에서도 일부 작업에 대해서만 적용 가능합니다. 모든 서비스/모든 작업이 리소스 수준 권한을 지원하는 것은 아닙니다. → [📖 AWS에서 리소스 수준 권한은 일부 서비스(예: S3, EC2)에서만 지원되며, 그 서비스 내에서도 일부 작업에 대해서만 적용 가능합니다. 모든...](/section/02-iam#iam-policies-정책)

**핵심 개념:** IAM 리소스 수준 권한(resource-level permissions), 서비스별 지원 범위

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

---

### Q516. You have some very sensitive data stored on AWS S3 and want to try every possible alternative to keeping it secure in regards to access control. What are the mechanisms available for access control on AWS S3?

**Options:**
- A) (IAM) policies, Access Control Lists (ACLs), bucket policies, and query string authentication.
- B) (IAM) policies, Access Control Lists (ACLs) and bucket policies.
- C) Access Control Lists (ACLs), bucket policies, and query string authentication.
- D) (IAM) policies, Access Control Lists (ACLs), bucket policies, query string authentication and encryption.

**Answer:** A

**해설:**

> **문제:** AWS S3의 액세스 제어에 사용할 수 있는 메커니즘은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | IAM 정책, 액세스 제어 목록(ACL), 버킷 정책, 쿼리 문자열 인증. |
| B | IAM 정책, 액세스 제어 목록(ACL), 버킷 정책. |
| C | 액세스 제어 목록(ACL), 버킷 정책, 쿼리 문자열 인증. |
| D | IAM 정책, ACL, 버킷 정책, 쿼리 문자열 인증, 암호화. |

**(A) 정답** : S3의 액세스 제어 메커니즘은 IAM 정책(사용자/역할 기반), ACL(객체/버킷 수준), 버킷 정책(리소스 기반), 쿼리 문자열 인증(presigned URL)의 4가지입니다. → [📖 S3의 액세스 제어 메커니즘은 IAM 정책(사용자/역할 기반), ACL(객체/버킷 수준), 버킷 정책(리소스 기반), 쿼리 문자열 인증(pres...](/section/10-amazon-s3#s3-보안)

**(B)** : 쿼리 문자열 인증(Presigned URL)이 빠졌습니다. → [📖 쿼리 문자열 인증(Presigned URL)이 빠졌습니다.](/section/12-s3-security#s3-presigned-urls)

**(C)** : IAM 정책이 빠졌습니다.

**(D)** : 암호화는 액세스 제어 메커니즘이 아니라 데이터 보호 메커니즘입니다. → [📖 암호화는 액세스 제어 메커니즘이 아니라 데이터 보호 메커니즘입니다.](/section/12-s3-security#s3-객체-암호화-4가지-방법)

**핵심 개념:** S3 액세스 제어 메커니즘 4가지: IAM 정책, ACL, 버킷 정책, Presigned URL

**관련 노트:** [S3 보안](/section/10-amazon-s3#s3-보안), [S3 Bucket Policy](/section/10-amazon-s3#s3-bucket-policy), [S3 Pre-Signed URLs](/section/12-s3-security#s3-presigned-urls)

---

### Q517. You are implementing AWS Direct Connect. You intend to use AWS public service end points such as Amazon S3, across the AWS Direct Connect link. You want other Internet traffic to use your existing link to an Internet Service Provider. What is the correct way to configure AWS Direct Connect for access to services such as Amazon S3?

**Options:**
- A) Configure a public Interface on your AWS Direct Connect link. Configure a static route via your AWS Direct Connect link that points to Amazon S3 Advertise a default route to AWS using BGP.
- B) Create a private interface on your AWS Direct Connect link. Configure a static route via your AWS Direct connect link that points to Amazon S3 Configure specific routes to your network in your VPC.
- C) Create a public interface on your AWS Direct Connect link. Redistribute BGP routes into your existing routing infrastructure; advertise specific routes for your network to AWS.
- D) Create a private interface on your AWS Direct connect link. Redistribute BGP routes into your existing routing infrastructure and advertise a default route to AWS.

**Answer:** C

**해설:**

> **문제:** AWS Direct Connect를 통해 Amazon S3 같은 퍼블릭 서비스 엔드포인트에 접근하면서, 다른 인터넷 트래픽은 기존 ISP 링크를 사용하도록 구성하는 올바른 방법은?

| 선지 | 번역 |
|------|------|
| A | Direct Connect 링크에 퍼블릭 인터페이스 구성, S3를 향하는 정적 라우트 설정, BGP로 기본 라우트 광고. |
| B | Direct Connect 링크에 프라이빗 인터페이스 생성, S3를 향하는 정적 라우트, VPC에 특정 라우트 구성. |
| C | Direct Connect 링크에 퍼블릭 인터페이스 생성, BGP 라우트를 기존 라우팅 인프라에 재분배, 네트워크에 대한 특정 라우트를 AWS에 광고. |
| D | Direct Connect 링크에 프라이빗 인터페이스 생성, BGP 라우트 재분배, AWS에 기본 라우트 광고. |

**(A)** : 기본 라우트를 AWS에 광고하면 모든 인터넷 트래픽이 AWS를 통과하게 되어 조건에 맞지 않습니다.

**(B)** : S3는 퍼블릭 서비스이므로 퍼블릭 인터페이스가 필요합니다. 프라이빗 인터페이스는 VPC 리소스 접근용입니다.

**(C) 정답** : S3 같은 퍼블릭 서비스에는 퍼블릭 VIF(Virtual Interface)를 사용하고, BGP를 통해 특정 라우트만 AWS에 광고하면 S3 트래픽은 Direct Connect를 통하고 나머지 인터넷 트래픽은 ISP 링크를 사용합니다. → [📖 S3 같은 퍼블릭 서비스에는 퍼블릭 VIF(Virtual Interface)를 사용하고, BGP를 통해 특정 라우트만 AWS에 광고하면 S3 트...](/section/25-vpc#direct-connect-dx)

**(D)** : 프라이빗 인터페이스는 퍼블릭 서비스(S3) 접근에 적합하지 않습니다. → [📖 프라이빗 인터페이스는 퍼블릭 서비스(S3) 접근에 적합하지 않습니다.](/section/25-vpc#direct-connect-dx)

**핵심 개념:** AWS Direct Connect 퍼블릭 VIF vs 프라이빗 VIF, BGP 라우팅, S3 접근 경로

**관련 노트:** [Direct Connect DX](/section/25-vpc#direct-connect-dx), [VPC Endpoints AWS PrivateLink](/section/25-vpc#vpc-endpoints-aws-privatelink)

---

### Q518. You are setting up your first Amazon Virtual Private Cloud (Amazon VPC) network so you decide you should probably use the AWS Management Console and the VPC Wizard. Which of the following is not an option for network architectures after launching the 'Start VPC Wizard' in Amazon VPC page on the AWS Management Console?

**Options:**
- A) VPC with a Single Public Subnet Only.
- B) VPC with a Public Subnet Only and Hardware VPN Access.
- C) VPC with Public and Private Subnets and Hardware VPN Access.
- D) VPC with a Private Subnet Only and Hardware VPN Access.

**Answer:** B

**해설:**

> **문제:** AWS 관리 콘솔의 VPC 마법사에서 제공하지 않는 네트워크 아키텍처 옵션은 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 단일 퍼블릭 서브넷만 있는 VPC. |
| B | 퍼블릭 서브넷만 있고 Hardware VPN 액세스가 있는 VPC. |
| C | 퍼블릭 및 프라이빗 서브넷과 Hardware VPN 액세스가 있는 VPC. |
| D | 프라이빗 서브넷만 있고 Hardware VPN 액세스가 있는 VPC. |

**(A)** : VPC 마법사의 옵션 1로 제공됩니다. → [📖 VPC 마법사의 옵션 1로 제공됩니다.](/section/25-vpc#vpc-기본-사항)

**(B) 정답** : "퍼블릭 서브넷만 + Hardware VPN"은 VPC 마법사 옵션에 없습니다. VPC 마법사의 4가지 옵션은 (1) 단일 퍼블릭 서브넷, (2) 퍼블릭+프라이빗 서브넷, (3) 퍼블릭+프라이빗 서브넷+Hardware VPN, (4) 프라이빗 서브넷+Hardware VPN입니다. → [📖 "퍼블릭 서브넷만 + Hardware VPN"은 VPC 마법사 옵션에 없습니다. VPC 마법사의 4가지 옵션은 (1) 단일 퍼블릭 서브넷, (2...](/section/25-vpc#vpc-기본-사항)

**(C)** : VPC 마법사의 옵션 3으로 제공됩니다. → [📖 VPC 마법사의 옵션 3으로 제공됩니다.](/section/25-vpc#sitetosite-vpn)

**(D)** : VPC 마법사의 옵션 4로 제공됩니다. → [📖 VPC 마법사의 옵션 4로 제공됩니다.](/section/25-vpc#sitetosite-vpn)

**핵심 개념:** VPC 마법사 네트워크 아키텍처 옵션 4가지

**관련 노트:** [VPC 기본 사항](/section/25-vpc#vpc-기본-사항), [NAT Gateway](/section/25-vpc#nat-gateway)

---

### Q519. True or False: A VPC contains multiple subnets, where each subnet can span multiple Availability Zones.

**Options:**
- A) This is true only if requested during the set-up of VPC.
- B) This is true.
- C) This is false.
- D) This is true only for US regions.

**Answer:** B

**해설:**

> **문제:** 참/거짓: VPC는 여러 서브넷을 포함하며, 각 서브넷은 여러 가용 영역에 걸칠 수 있습니다.

| 선지 | 번역 |
|------|------|
| A | VPC 설정 시 요청한 경우에만 참입니다. |
| B | 참입니다. |
| C | 거짓입니다. |
| D | US 리전에서만 참입니다. |

**(A)** : 조건부가 아니라 항상 적용됩니다.

**(B) 정답** : VPC는 여러 서브넷을 포함할 수 있습니다(참). 단, 각 서브넷은 단일 AZ에만 매핑됩니다(서브넷이 여러 AZ에 걸치는 것은 불가). 질문 자체는 "VPC가 여러 서브넷을 포함한다"는 점에서 참입니다. 단, 실제로 각 서브넷은 단일 AZ에만 속하므로 주의가 필요합니다. → [📖 VPC는 여러 서브넷을 포함할 수 있습니다(참). 단, 각 서브넷은 단일 AZ에만 매핑됩니다(서브넷이 여러 AZ에 걸치는 것은 불가). 질문 자...](/section/25-vpc#서브넷-subnet)

**(C)** : VPC가 여러 서브넷을 포함할 수 있다는 것은 참입니다.

**(D)** : 지역 제한이 없습니다.

**핵심 개념:** VPC 서브넷 구조, 서브넷과 AZ의 관계

**관련 노트:** [서브넷 Subnet](/section/25-vpc#서브넷-subnet), [VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

---

### Q520. Amazon RDS automated backups and DB Snapshots are currently supported for only the [...] storage engine.

**Options:**
- A) InnoDB.
- B) MyISAM.

**Answer:** A

**해설:**

> **문제:** Amazon RDS 자동 백업과 DB 스냅샷은 현재 어떤 스토리지 엔진에 대해서만 지원됩니까?

| 선지 | 번역 |
|------|------|
| A | InnoDB. |
| B | MyISAM. |

**(A) 정답** : Amazon RDS MySQL에서 자동 백업 및 DB 스냅샷 기능은 InnoDB 스토리지 엔진을 사용하는 경우에만 완전히 지원됩니다. InnoDB는 트랜잭션을 지원하므로 일관된 백업이 가능합니다. → [📖 Amazon RDS MySQL에서 자동 백업 및 DB 스냅샷 기능은 InnoDB 스토리지 엔진을 사용하는 경우에만 완전히 지원됩니다. InnoD...](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**(B)** : MyISAM은 트랜잭션을 지원하지 않아 RDS 자동 백업 시 일관성 문제가 발생할 수 있습니다. → [📖 MyISAM은 트랜잭션을 지원하지 않아 RDS 자동 백업 시 일관성 문제가 발생할 수 있습니다.](/section/07-rds-aurora-elasticache#rds-aurora-백업)

**핵심 개념:** RDS MySQL 스토리지 엔진, InnoDB vs MyISAM, 자동 백업 지원 조건

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [RDS & Aurora 백업](/section/07-rds-aurora-elasticache#rds-aurora-백업)

---

### Q521. While signing in REST/Query requests, for additional security, you should transmit your requests using Secure Sockets Layer (SSL) by using [...].

**Options:**
- A) HTTP.
- B) Internet Protocol Security (IPsec).
- C) TLS (Transport Layer Security).
- D) HTTPS.

**Answer:** D

**해설:**

> **문제:** REST/Query 요청에 서명할 때, 추가 보안을 위해 SSL(Secure Sockets Layer)을 사용하여 요청을 전송하려면 무엇을 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | HTTP. |
| B | IPsec(인터넷 프로토콜 보안). |
| C | TLS(전송 계층 보안). |
| D | HTTPS. |

**(A)** : HTTP는 암호화되지 않아 보안에 취약합니다.

**(B)** : IPsec은 네트워크 계층 암호화로 REST API 요청에 직접 사용하지 않습니다.

**(C)** : TLS는 기술적으로 SSL의 후속 프로토콜이지만, 실제 사용 방법은 HTTPS입니다.

**(D) 정답** : SSL/TLS를 사용하는 방법은 HTTPS 프로토콜을 사용하는 것입니다. AWS API 요청 시 HTTPS를 사용하면 전송 중 데이터가 암호화됩니다. → [📖 SSL/TLS를 사용하는 방법은 HTTPS 프로토콜을 사용하는 것입니다. AWS API 요청 시 HTTPS를 사용하면 전송 중 데이터가 암호화됩...](/section/12-s3-security#encryption-in-transit-전송-중-암호화)

**핵심 개념:** HTTPS를 통한 AWS API 보안 통신, SSL/TLS 적용 방법

**관련 노트:** [SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서), [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안)

---

### Q522. Out of the striping options available for the EBS volumes, which one has the following disadvantage: 'Doubles the amount of I/O required from the instance to EBS compared to RAID 0, because you're mirroring all writes to a pair of volumes, limiting how much you can stripe.'?

**Options:**
- A) RAID 0.
- B) RAID 1+0 (RAID 10).
- C) RAID 1.
- D) RAID.

**Answer:** B

**해설:**

> **문제:** EBS 볼륨 스트라이핑 옵션 중에서 "모든 쓰기를 볼륨 쌍에 미러링하기 때문에 RAID 0에 비해 인스턴스에서 EBS로 필요한 I/O 양이 두 배가 되어 스트라이핑 가능한 양이 제한된다"는 단점을 가진 것은?

| 선지 | 번역 |
|------|------|
| A | RAID 0. |
| B | RAID 1+0 (RAID 10). |
| C | RAID 1. |
| D | RAID. |

**(A)** : RAID 0은 미러링 없이 스트라이핑만 하므로 I/O 두 배 문제가 없습니다. → [📖 RAID 0은 미러링 없이 스트라이핑만 하므로 I/O 두 배 문제가 없습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B) 정답** : RAID 10(RAID 1+0)은 미러링(RAID 1)과 스트라이핑(RAID 0)을 결합한 방식으로, 모든 쓰기를 미러 볼륨에 복제하므로 I/O가 두 배 필요합니다. 스트라이핑 효율이 RAID 0보다 낮지만 내결함성을 제공합니다. → [📖 RAID 10(RAID 1+0)은 미러링(RAID 1)과 스트라이핑(RAID 0)을 결합한 방식으로, 모든 쓰기를 미러 볼륨에 복제하므로 I/O...](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C)** : RAID 1은 순수 미러링으로 스트라이핑을 하지 않습니다. → [📖 RAID 1은 순수 미러링으로 스트라이핑을 하지 않습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : RAID 단독으로는 특정 구성을 나타내지 않습니다.

**핵심 개념:** EBS RAID 구성, RAID 10의 특성과 I/O 오버헤드

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q523. Can I encrypt connections between my application and my DB Instance using SSL?

**Options:**
- A) Yes.
- B) Only in VPC.
- C) Only in certain regions.

**Answer:** A

**해설:**

> **문제:** 애플리케이션과 DB 인스턴스 간의 연결을 SSL을 사용하여 암호화할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | VPC에서만 가능합니다. |
| C | 특정 리전에서만 가능합니다. |

**(A) 정답** : Amazon RDS는 모든 DB 엔진(MySQL, PostgreSQL, Oracle, SQL Server, MariaDB)에서 SSL/TLS를 통한 암호화 연결을 지원합니다. VPC 또는 특정 리전에만 국한되지 않습니다. → [📖 Amazon RDS는 모든 DB 엔진(MySQL, PostgreSQL, Oracle, SQL Server, MariaDB)에서 SSL/TLS를 ...](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**(B)** : VPC 외부에서도 SSL 암호화 연결을 사용할 수 있습니다.

**(C)** : 리전 제한 없이 모든 리전에서 지원됩니다.

**핵심 개념:** RDS SSL/TLS 암호화 연결 지원 범위

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안)

---

### Q524. Which of the following items are required to allow an application deployed on an EC2 instance to write data to a DynamoDB table? Assume that no security keys are allowed to be stored on the EC2 instance. (Choose 3 answers)

**Options:**
- A) Create an IAM Role that allows write access to the DynamoDB table.
- B) Add an IAM Role to a running EC2 instance.
- C) Create an IAM User that allows write access to the DynamoDB table.
- D) Add an IAM User to a running EC2 instance.
- E) Launch an EC2 Instance with the IAM Role included in the launch configuration.

**Answer:** A, B, E

**해설:**

> **문제:** EC2 인스턴스에 보안 키를 저장하지 않고 애플리케이션이 DynamoDB 테이블에 쓰기를 할 수 있도록 하는 데 필요한 항목을 3개 고르시오.

| 선지 | 번역 |
|------|------|
| A | DynamoDB 테이블에 쓰기 액세스를 허용하는 IAM 역할 생성. |
| B | 실행 중인 EC2 인스턴스에 IAM 역할 추가. |
| C | DynamoDB 테이블에 쓰기 액세스를 허용하는 IAM 사용자 생성. |
| D | 실행 중인 EC2 인스턴스에 IAM 사용자 추가. |
| E | IAM 역할을 포함한 시작 구성으로 EC2 인스턴스 시작. |

**(A) 정답** : DynamoDB 쓰기 권한을 가진 IAM 역할을 생성해야 합니다. → [📖 DynamoDB 쓰기 권한을 가진 IAM 역할을 생성해야 합니다.](/section/02-iam#iam-roles-역할)

**(B) 정답** : 실행 중인 EC2 인스턴스에 IAM 역할을 연결(attach)할 수 있습니다. → [📖 실행 중인 EC2 인스턴스에 IAM 역할을 연결(attach)할 수 있습니다.](/section/02-iam#iam-roles-역할)

**(C)** : IAM 사용자는 EC2 인스턴스에 직접 연결할 수 없으며, 키를 인스턴스에 저장해야 하므로 조건에 위배됩니다. → [📖 IAM 사용자는 EC2 인스턴스에 직접 연결할 수 없으며, 키를 인스턴스에 저장해야 하므로 조건에 위배됩니다.](/section/02-iam#users-groups)

**(D)** : IAM 사용자를 EC2 인스턴스에 추가하는 기능은 없습니다.

**(E) 정답** : EC2 인스턴스 시작 시 IAM 역할을 포함하면 인스턴스 메타데이터를 통해 임시 자격 증명을 얻을 수 있습니다. → [📖 EC2 인스턴스 시작 시 IAM 역할을 포함하면 인스턴스 메타데이터를 통해 임시 자격 증명을 얻을 수 있습니다.](/section/02-iam#iam-roles-역할)

**핵심 개념:** EC2 IAM 역할을 통한 DynamoDB 접근, 보안 키 저장 없이 AWS 서비스 접근

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q525. Identify a true statement about the On-Demand instances purchasing option provided by Amazon EC2.

**Options:**
- A) Pay for the instances that you use by the hour, with no long-term commitments or up-front payments.
- B) Make a low, one-time, up-front payment for an instance, reserve it for a one- or three-year term, and pay a significantly lower hourly rate for these instances.
- C) Pay for the instances that you use by the hour, with long-term commitments or up-front payments.
- D) Make a high, one-time, all-front payment for an instance, reserve it for a one- or three-year term, and pay a significantly higher hourly rate for these instances.

**Answer:** A

**해설:**

> **문제:** Amazon EC2 온디맨드 인스턴스 구매 옵션에 대한 올바른 설명은?

| 선지 | 번역 |
|------|------|
| A | 장기 약정이나 선불 없이 사용한 인스턴스에 대해 시간당 요금을 지불합니다. |
| B | 소액의 일회성 선불을 지불하고 1년 또는 3년 기간으로 예약하며 시간당 요금이 크게 낮아집니다. |
| C | 장기 약정이나 선불과 함께 시간당 요금을 지불합니다. |
| D | 고액의 일회성 선불을 지불하고 1년 또는 3년 기간으로 예약하며 시간당 요금이 크게 높아집니다. |

**(A) 정답** : 온디맨드 인스턴스는 약정 없이 시간(또는 초) 단위로 비용을 지불합니다. 유연성이 가장 높지만 비용도 가장 높습니다. → [📖 온디맨드 인스턴스는 약정 없이 시간(또는 초) 단위로 비용을 지불합니다. 유연성이 가장 높지만 비용도 가장 높습니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B)** : 예약 인스턴스(Reserved Instance)에 대한 설명입니다. → [📖 예약 인스턴스(Reserved Instance)에 대한 설명입니다.](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : 온디맨드는 장기 약정이나 선불이 없습니다.

**(D)** : 잘못된 설명입니다. 예약 인스턴스는 선불 시 시간당 요금이 낮아집니다.

**핵심 개념:** EC2 구매 옵션 비교: 온디맨드 vs 예약 인스턴스 vs 스팟 인스턴스

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심), [Spot Instance 상세](/section/03-ec2-basics#spot-instance-상세)

---

### Q526. When will you incur costs with an Elastic IP address (EIP)?

**Options:**
- A) When an EIP is allocated.
- B) When it is allocated and associated with a running instance.
- C) When it is allocated and associated with a stopped instance.
- D) Costs are incurred regardless of whether the EIP is associated with a running instance.

**Answer:** D

**해설:**

> **문제:** Elastic IP 주소(EIP)에 대한 비용이 발생하는 경우는?

| 선지 | 번역 |
|------|------|
| A | EIP가 할당될 때. |
| B | 실행 중인 인스턴스에 할당되고 연결될 때. |
| C | 중지된 인스턴스에 할당되고 연결될 때. |
| D | 실행 중인 인스턴스와 연결 여부와 관계없이 비용이 발생합니다. |

**(A)** : 할당만 되고 사용 중인 인스턴스에 연결되어 있으면 무료(과거 정책). 현재는 할당 자체에도 비용이 발생합니다. → [📖 할당만 되고 사용 중인 인스턴스에 연결되어 있으면 무료(과거 정책). 현재는 할당 자체에도 비용이 발생합니다.](/section/04-ec2-associate#elastic-ip)

**(B)** : 실행 중인 인스턴스 1개에 연결된 EIP 1개는 무료였으나, 정책이 변경되었습니다. → [📖 실행 중인 인스턴스 1개에 연결된 EIP 1개는 무료였으나, 정책이 변경되었습니다.](/section/04-ec2-associate#elastic-ip)

**(C)** : 중지된 인스턴스에 연결된 EIP는 비용이 발생합니다. → [📖 중지된 인스턴스에 연결된 EIP는 비용이 발생합니다.](/section/04-ec2-associate#elastic-ip)

**(D) 정답** : 현재 AWS 정책상 EIP는 할당된 후 사용 여부와 관계없이 비용이 발생합니다. 특히 실행 중인 인스턴스에 연결되지 않은 EIP, 또는 중지된 인스턴스에 연결된 EIP에 비용이 부과됩니다. → [📖 현재 AWS 정책상 EIP는 할당된 후 사용 여부와 관계없이 비용이 발생합니다. 특히 실행 중인 인스턴스에 연결되지 않은 EIP, 또는 중지된 ...](/section/04-ec2-associate#elastic-ip)

**핵심 개념:** Elastic IP 요금 정책, EIP 비용 발생 조건

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip)

---

### Q527. IAM provides several policy templates you can use to automatically assign permissions to the groups you create. The [...] policy template gives the Admins group permission to access all account resources, except your AWS account information.

**Options:**
- A) Read Only Access.
- B) Power User Access.
- C) AWS Cloud Formation Read Only Access.
- D) Administrator Access.

**Answer:** D

**해설:**

> **문제:** IAM에서 AWS 계정 정보를 제외한 모든 계정 리소스에 대한 액세스 권한을 Admins 그룹에 부여하는 정책 템플릿은?

| 선지 | 번역 |
|------|------|
| A | 읽기 전용 액세스. |
| B | 파워 유저 액세스. |
| C | AWS CloudFormation 읽기 전용 액세스. |
| D | 관리자 액세스. |

**(A)** : 읽기 전용 액세스는 리소스 조회만 가능하며 수정 권한이 없습니다. → [📖 읽기 전용 액세스는 리소스 조회만 가능하며 수정 권한이 없습니다.](/section/02-iam#iam-policies-정책)

**(B)** : 파워 유저 액세스는 IAM 관리를 제외한 모든 리소스에 접근 가능합니다. → [📖 파워 유저 액세스는 IAM 관리를 제외한 모든 리소스에 접근 가능합니다.](/section/02-iam#iam-policies-정책)

**(C)** : CloudFormation 읽기 전용은 특정 서비스에 한정됩니다.

**(D) 정답** : AdministratorAccess 정책은 AWS 계정 정보(결제 등)를 제외한 모든 AWS 리소스에 대한 전체 접근 권한을 부여합니다. → [📖 AdministratorAccess 정책은 AWS 계정 정보(결제 등)를 제외한 모든 AWS 리소스에 대한 전체 접근 권한을 부여합니다.](/section/02-iam#iam-policies-정책)

**핵심 개념:** IAM 관리형 정책, AdministratorAccess vs PowerUserAccess

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책)

---

### Q528. What does RRS stand for when talking about S3?

**Options:**
- A) Redundancy Removal System.
- B) Relational Rights Storage.
- C) Regional Rights Standard.
- D) Reduced Redundancy Storage.

**Answer:** D

**해설:**

> **문제:** S3에서 RRS는 무엇의 약자입니까?

| 선지 | 번역 |
|------|------|
| A | Redundancy Removal System (중복 제거 시스템). |
| B | Relational Rights Storage (관계형 권한 스토리지). |
| C | Regional Rights Standard (지역 권한 표준). |
| D | Reduced Redundancy Storage (감소된 중복 스토리지). |

**(A), (B), (C)** : 존재하지 않는 용어입니다.

**(D) 정답** : RRS는 Reduced Redundancy Storage의 약자로, 표준 S3보다 낮은 내구성(99.99% vs 99.999999999%)을 제공하는 대신 저렴한 스토리지 클래스입니다. 재생성 가능한 데이터에 적합합니다. → [📖 RRS는 Reduced Redundancy Storage의 약자로, 표준 S3보다 낮은 내구성(99.99% vs 99.999999999%)을 제...](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** S3 스토리지 클래스, RRS(Reduced Redundancy Storage) 특성

**관련 노트:** [S3 Storage Classes 스토리지 클래스](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

---

### Q529. Can I change the EC2 security groups after an instance is launched in EC2-Classic?

**Options:**
- A) Yes, you can change security groups after you launch an instance in EC2-Classic.
- B) No, you cannot change security groups after you launch an instance in EC2-Classic.
- C) Yes, you can only when you remove rules from a security group.
- D) Yes, you can only when you add rules to a security group.

**Answer:** B

**해설:**

> **문제:** EC2-Classic에서 인스턴스를 시작한 후 EC2 보안 그룹을 변경할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, EC2-Classic에서 인스턴스 시작 후 보안 그룹을 변경할 수 있습니다. |
| B | 아니요, EC2-Classic에서 인스턴스 시작 후 보안 그룹을 변경할 수 없습니다. |
| C | 예, 보안 그룹에서 규칙을 제거할 때만 가능합니다. |
| D | 예, 보안 그룹에 규칙을 추가할 때만 가능합니다. |

**(A), (C), (D)** : EC2-Classic에서는 인스턴스 시작 후 보안 그룹을 변경할 수 없습니다.

**(B) 정답** : EC2-Classic 환경에서는 인스턴스 시작 시 지정한 보안 그룹을 나중에 변경할 수 없습니다. 반면 VPC 환경에서는 실행 중인 인스턴스의 보안 그룹을 변경할 수 있습니다. → [📖 EC2-Classic 환경에서는 인스턴스 시작 시 지정한 보안 그룹을 나중에 변경할 수 없습니다. 반면 VPC 환경에서는 실행 중인 인스턴스의 ...](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** EC2-Classic vs VPC 보안 그룹 변경 가능 여부

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q530. Please select the Amazon EC2 resource which cannot be tagged.

**Options:**
- A) Images (AMIs, kernels, RAM disks).
- B) Amazon EBS volumes.
- C) Elastic IP addresses.
- D) VPCs.

**Answer:** C

**해설:**

> **문제:** 태그를 지정할 수 없는 Amazon EC2 리소스는 무엇입니까?

| 선지 | 번역 |
|------|------|
| A | 이미지(AMI, 커널, RAM 디스크). |
| B | Amazon EBS 볼륨. |
| C | Elastic IP 주소. |
| D | VPC. |

**(A)** : AMI에는 태그를 지정할 수 있습니다. → [📖 AMI에는 태그를 지정할 수 있습니다.](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(B)** : EBS 볼륨에는 태그를 지정할 수 있습니다. → [📖 EBS 볼륨에는 태그를 지정할 수 있습니다.](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(C) 정답** : 과거에는 Elastic IP 주소에 태그를 직접 지정할 수 없었습니다. (현재는 가능하게 변경되었으나 시험 문제 기준으로는 불가로 처리합니다.) → [📖 과거에는 Elastic IP 주소에 태그를 직접 지정할 수 없었습니다. (현재는 가능하게 변경되었으나 시험 문제 기준으로는 불가로 처리합니다.)](/section/04-ec2-associate#elastic-ip)

**(D)** : VPC에는 태그를 지정할 수 있습니다. → [📖 VPC에는 태그를 지정할 수 있습니다.](/section/25-vpc#vpc-기본-사항)

**핵심 개념:** EC2 리소스 태깅 가능 여부, Elastic IP 태그 제한

---

### Q531. Does Route 53 support MX Records?

**Options:**
- A) Yes.
- B) It supports CNAME records, but not MX records.
- C) No.
- D) Only Primary MX records. Secondary MX records are not supported.

**Answer:** A

**해설:**

> **문제:** Route 53은 MX 레코드를 지원합니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | CNAME 레코드는 지원하지만 MX 레코드는 지원하지 않습니다. |
| C | 아니요. |
| D | 기본(Primary) MX 레코드만 지원합니다. 보조(Secondary) MX 레코드는 지원하지 않습니다. |

**(A) 정답** : Route 53은 MX(Mail Exchange) 레코드를 포함하여 A, AAAA, CNAME, MX, NS, PTR, SOA, SPF, SRV, TXT 등 다양한 DNS 레코드 타입을 지원합니다. → [📖 Route 53은 MX(Mail Exchange) 레코드를 포함하여 A, AAAA, CNAME, MX, NS, PTR, SOA, SPF, SRV...](/section/08-route-53#dns-레코드-타입)

**(B), (C), (D)** : Route 53은 MX 레코드를 완전히 지원합니다.

**핵심 개념:** Route 53 지원 DNS 레코드 타입, MX(Mail Exchange) 레코드

**관련 노트:** [DNS 레코드 타입](/section/08-route-53#dns-레코드-타입)

---

### Q532. Which of the following notification endpoints or clients are supported by Amazon Simple Notification Service? (Choose 2 answers)

**Options:**
- A) Email.
- B) CloudFront distribution.
- C) File Transfer Protocol.
- D) Short Message Service.
- E) Simple Network Management Protocol.

**Answer:** A, D

**해설:**

> **문제:** Amazon SNS가 지원하는 알림 엔드포인트 또는 클라이언트를 2개 고르시오.

| 선지 | 번역 |
|------|------|
| A | 이메일. |
| B | CloudFront 배포. |
| C | 파일 전송 프로토콜(FTP). |
| D | SMS(Short Message Service). |
| E | SNMP(Simple Network Management Protocol). |

**(A) 정답** : SNS는 이메일(Email/Email-JSON) 엔드포인트를 지원합니다. → [📖 SNS는 이메일(Email/Email-JSON) 엔드포인트를 지원합니다.](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(B)** : CloudFront 배포는 SNS 알림 엔드포인트가 아닙니다.

**(C)** : FTP는 SNS에서 지원하지 않습니다.

**(D) 정답** : SNS는 SMS(문자 메시지) 알림을 지원합니다. → [📖 SNS는 SMS(문자 메시지) 알림을 지원합니다.](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(E)** : SNMP는 SNS 지원 프로토콜이 아닙니다.

**핵심 개념:** SNS 지원 엔드포인트: HTTP/HTTPS, Email, SQS, Lambda, SMS, 모바일 푸시

**관련 노트:** [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q533. AWS Identity and Access Management is a web service that enables Amazon Web Services (AWS) customers to manage users and user permissions in AWS. In addition to supporting IAM user policies, some services support resource-based permissions. Which of the following services are supported by resource-based permissions?

**Options:**
- A) Amazon SNS, and Amazon SQS and AWS Direct Connect.
- B) Amazon S3 and Amazon SQS and Amazon ElastiCache.
- C) Amazon S3, Amazon SNS, Amazon SQS, Amazon Glacier and Amazon EBS.
- D) Amazon Glacier, Amazon SNS, and Amazon CloudWatch.

**Answer:** C

**해설:**

> **문제:** 리소스 기반 권한(resource-based permissions)을 지원하는 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon SNS, Amazon SQS, AWS Direct Connect. |
| B | Amazon S3, Amazon SQS, Amazon ElastiCache. |
| C | Amazon S3, Amazon SNS, Amazon SQS, Amazon Glacier, Amazon EBS. |
| D | Amazon Glacier, Amazon SNS, Amazon CloudWatch. |

**(A)** : Direct Connect는 리소스 기반 정책을 지원하지 않습니다. → [📖 Direct Connect는 리소스 기반 정책을 지원하지 않습니다.](/section/25-vpc#direct-connect-dx)

**(B)** : ElastiCache는 리소스 기반 정책을 지원하지 않습니다. → [📖 ElastiCache는 리소스 기반 정책을 지원하지 않습니다.](/section/07-rds-aurora-elasticache#amazon-elasticache)

**(C) 정답** : S3(버킷 정책), SNS(주제 정책), SQS(큐 정책), Glacier(볼트 액세스 정책), EBS(스냅샷 정책) 모두 리소스 기반 정책을 지원합니다. → [📖 S3(버킷 정책), SNS(주제 정책), SQS(큐 정책), Glacier(볼트 액세스 정책), EBS(스냅샷 정책) 모두 리소스 기반 정책을 ...](/section/10-amazon-s3#s3-bucket-policy)

**(D)** : CloudWatch는 리소스 기반 정책을 지원하지 않습니다. → [📖 CloudWatch는 리소스 기반 정책을 지원하지 않습니다.](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** AWS 리소스 기반 정책 지원 서비스 목록

**관련 노트:** [IAM Roles vs Resource-Based Policies](/section/23-advanced-identity#iam-roles-vs-resourcebased-policies)

---

### Q534. What does the following policy for Amazon EC2 do? { "Statement":[{ "Effect": "Allow", "Action":"ec2: Describe*", "Resource":"*" }] }

**Options:**
- A) Allow users to use actions that start with 'Describe' over all the EC2 resources.
- B) Share an AMI with a partner.
- C) Share an AMI within the account.
- D) Allow a group to only be able to describe, run, stop, start, and terminate instances.

**Answer:** A

**해설:**

> **문제:** 위의 Amazon EC2 정책은 무엇을 허용합니까?

| 선지 | 번역 |
|------|------|
| A | 모든 EC2 리소스에 대해 'Describe'로 시작하는 작업 사용을 허용합니다. |
| B | 파트너와 AMI를 공유합니다. |
| C | 계정 내에서 AMI를 공유합니다. |
| D | 그룹이 인스턴스를 설명, 실행, 중지, 시작, 종료만 할 수 있도록 허용합니다. |

**(A) 정답** : `Action: "ec2:Describe*"`는 Describe로 시작하는 모든 EC2 작업(예: DescribeInstances, DescribeImages 등)을 허용하며, `Resource: "*"`는 모든 리소스에 적용됩니다. 읽기 전용 조회 권한을 부여하는 정책입니다. → [📖 `Action: "ec2:Describe*"`는 Describe로 시작하는 모든 EC2 작업(예: DescribeInstances, Descri...](/section/02-iam#iam-policies-정책)

**(B), (C)** : AMI 공유와 관련된 정책이 아닙니다.

**(D)** : Describe* 만 허용하며, run/stop/start/terminate는 포함되지 않습니다. → [📖 Describe* 만 허용하며, run/stop/start/terminate는 포함되지 않습니다.](/section/02-iam#iam-policies-정책)

**핵심 개념:** IAM 정책 구문 해석, 와일드카드(*) 사용, ec2:Describe* 권한

**관련 노트:** [IAM Policies 정책](/section/02-iam#iam-policies-정책), [IAM Conditions](/section/23-advanced-identity#iam-conditions)

---

### Q535. Which IAM role do you use to grant AWS Lambda permission to access a DynamoDB Stream?

**Options:**
- A) Dynamic role.
- B) Invocation role.
- C) Execution role.
- D) Event Source role.

**Answer:** C

**해설:**

> **문제:** AWS Lambda에 DynamoDB 스트림에 대한 접근 권한을 부여하는 데 사용하는 IAM 역할은?

| 선지 | 번역 |
|------|------|
| A | 동적 역할(Dynamic role). |
| B | 호출 역할(Invocation role). |
| C | 실행 역할(Execution role). |
| D | 이벤트 소스 역할(Event Source role). |

**(A)** : 존재하지 않는 IAM 역할 유형입니다.

**(B)** : 호출 역할은 Lambda를 트리거하는 데 사용되는 개념입니다. → [📖 호출 역할은 Lambda를 트리거하는 데 사용되는 개념입니다.](/section/02-iam#iam-roles-역할)

**(C) 정답** : Lambda 실행 역할(Execution role)은 Lambda 함수가 AWS 서비스에 접근할 때 사용하는 IAM 역할입니다. DynamoDB 스트림에 접근하려면 실행 역할에 적절한 DynamoDB 권한을 부여해야 합니다. → [📖 Lambda 실행 역할(Execution role)은 Lambda 함수가 AWS 서비스에 접근할 때 사용하는 IAM 역할입니다. DynamoDB...](/section/02-iam#iam-roles-역할)

**(D)** : 존재하지 않는 역할 유형입니다.

**핵심 개념:** Lambda 실행 역할(Execution role), Lambda와 DynamoDB Stream 연동

**관련 노트:** [AWS Lambda](/section/17-serverless-overview#aws-lambda), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q536. Can resource record sets in a hosted zone have a different domain suffix (for example, www.blog.acme.com and www.acme.ca)?

**Options:**
- A) Yes, it can have for a maximum of three different TLDs.
- B) Yes.
- C) Yes, it can have depending on the TLD.
- D) No.

**Answer:** C

**해설:**

> **문제:** 호스팅 영역의 리소스 레코드 세트는 서로 다른 도메인 접미사(예: www.blog.acme.com과 www.acme.ca)를 가질 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 최대 3개의 서로 다른 TLD를 가질 수 있습니다. |
| B | 예. |
| C | 예, TLD에 따라 다릅니다. |
| D | 아니요. |

**(A)** : 3개 제한이 아닙니다.

**(B)** : 무조건 가능한 것은 아닙니다. → [📖 무조건 가능한 것은 아닙니다.](/section/08-route-53#hosted-zones)

**(C) 정답** : Route 53 호스팅 영역은 특정 도메인을 위해 생성되며, 레코드 세트는 해당 도메인의 접미사를 가져야 합니다. TLD에 따라 가능 여부가 달라질 수 있습니다. 일반적으로 하나의 호스팅 영역에서 다른 TLD(.com, .ca)를 혼용하는 것은 제한됩니다. → [📖 Route 53 호스팅 영역은 특정 도메인을 위해 생성되며, 레코드 세트는 해당 도메인의 접미사를 가져야 합니다. TLD에 따라 가능 여부가 달...](/section/08-route-53#hosted-zones)

**(D)** : TLD 조건에 따라 가능한 경우도 있습니다. → [📖 TLD 조건에 따라 가능한 경우도 있습니다.](/section/08-route-53#hosted-zones)

**핵심 개념:** Route 53 호스팅 영역, 리소스 레코드 세트 도메인 접미사 규칙

**관련 노트:** [Hosted Zones](/section/08-route-53#hosted-zones)

---

### Q537. In Amazon Elastic Compute Cloud, which of the following is used for communication between instances in the same network (EC2-Classic or a VPC)?

**Options:**
- A) Private IP addresses.
- B) Elastic IP addresses.
- C) Static IP addresses.
- D) Public IP addresses.

**Answer:** A

**해설:**

> **문제:** Amazon EC2에서 동일 네트워크(EC2-Classic 또는 VPC) 내 인스턴스 간 통신에 사용되는 것은?

| 선지 | 번역 |
|------|------|
| A | 프라이빗 IP 주소. |
| B | Elastic IP 주소. |
| C | 정적 IP 주소. |
| D | 퍼블릭 IP 주소. |

**(A) 정답** : 동일 네트워크(VPC 또는 EC2-Classic) 내 인스턴스 간 통신은 프라이빗 IP 주소를 사용합니다. 이는 인터넷을 거치지 않아 비용 효율적이고 지연 시간이 낮습니다. → [📖 동일 네트워크(VPC 또는 EC2-Classic) 내 인스턴스 간 통신은 프라이빗 IP 주소를 사용합니다. 이는 인터넷을 거치지 않아 비용 효율...](/section/04-ec2-associate#ip-주소-ipv4)

**(B)** : Elastic IP는 인터넷에서 접근 가능한 퍼블릭 IP입니다. → [📖 Elastic IP는 인터넷에서 접근 가능한 퍼블릭 IP입니다.](/section/04-ec2-associate#elastic-ip)

**(C)** : EC2에서 일반적으로 사용하는 용어가 아닙니다.

**(D)** : 퍼블릭 IP는 인터넷 통신에 사용되며 내부 네트워크 통신에는 적합하지 않습니다. → [📖 퍼블릭 IP는 인터넷 통신에 사용되며 내부 네트워크 통신에는 적합하지 않습니다.](/section/04-ec2-associate#ip-주소-ipv4)

**핵심 개념:** EC2 인스턴스 간 통신, 프라이빗 IP 주소 활용

**관련 노트:** [EC2 구성 요소](/section/03-ec2-basics#ec2-구성-요소), [IP 주소 IPv4](/section/04-ec2-associate#ip-주소-ipv4)

---

### Q538. A user is planning to host a mobile game on EC2 which sends notifications to active users on either high score or the addition of new features. The user should get this notification when he is online on his mobile device. Which of the below mentioned AWS services can help achieve this functionality?

**Options:**
- A) AWS Simple Notification Service.
- B) AWS Simple Email Service.
- C) AWS Mobile Communication Service.
- D) AWS Simple Queue Service.

**Answer:** A

**해설:**

> **문제:** EC2에서 모바일 게임을 호스팅하여 높은 점수 달성이나 새 기능 추가 시 활성 사용자에게 알림을 보내려 합니다. 모바일 기기 온라인 시 알림을 받으려면 어떤 AWS 서비스를 사용해야 합니까?

| 선지 | 번역 |
|------|------|
| A | AWS SNS(Simple Notification Service). |
| B | AWS SES(Simple Email Service). |
| C | AWS 모바일 커뮤니케이션 서비스. |
| D | AWS SQS(Simple Queue Service). |

**(A) 정답** : SNS는 모바일 푸시 알림(iOS APNs, Android GCM/FCM), SMS, 이메일 등 다양한 채널로 알림을 발송할 수 있습니다. 모바일 기기 온라인 상태에서의 실시간 알림에 최적입니다. → [📖 SNS는 모바일 푸시 알림(iOS APNs, Android GCM/FCM), SMS, 이메일 등 다양한 채널로 알림을 발송할 수 있습니다. 모바...](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(B)** : SES는 이메일 발송 서비스로 모바일 푸시 알림을 지원하지 않습니다. → [📖 SES는 이메일 발송 서비스로 모바일 푸시 알림을 지원하지 않습니다.](/section/28-other-services#amazon-simple-email-service-ses)

**(C)** : 존재하지 않는 AWS 서비스입니다.

**(D)** : SQS는 메시지 큐 서비스로 실시간 모바일 알림에 직접 사용하지 않습니다. → [📖 SQS는 메시지 큐 서비스로 실시간 모바일 알림에 직접 사용하지 않습니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** SNS 모바일 푸시 알림, SNS vs SES vs SQS 용도 구분

**관련 노트:** [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service), [Amazon Simple Email Service SES](/section/28-other-services#amazon-simple-email-service-ses)

---

### Q539. You need to create an Amazon Machine Image (AMI) for a customer for an application which does not appear to be part of the standard AWS AMI template that you can see in the AWS console. What are the alternative possibilities for creating an AMI on AWS?

**Options:**
- A) You can purchase an AMIs from a third party but cannot create your own AMI.
- B) You can purchase an AMIs from a third party or can create your own AMI.
- C) Only AWS can create AMIs and you need to wait till it becomes available.
- D) Only AWS can create AMIs and you need to request them to create one for you.

**Answer:** B

**해설:**

> **문제:** AWS 콘솔의 표준 AMI 템플릿에 없는 애플리케이션을 위한 AMI를 생성하는 방법은?

| 선지 | 번역 |
|------|------|
| A | 제3자로부터 AMI를 구입할 수 있지만 직접 생성은 불가능합니다. |
| B | 제3자로부터 AMI를 구입하거나 직접 생성할 수 있습니다. |
| C | AWS만 AMI를 생성할 수 있으며 제공될 때까지 기다려야 합니다. |
| D | AWS만 AMI를 생성할 수 있으며 요청해야 합니다. |

**(A)** : 직접 AMI를 생성할 수 없다는 것은 틀립니다.

**(B) 정답** : 사용자는 기존 EC2 인스턴스에서 직접 커스텀 AMI를 생성하거나, AWS Marketplace에서 제3자가 제공하는 AMI를 구입/사용할 수 있습니다. → [📖 사용자는 기존 EC2 인스턴스에서 직접 커스텀 AMI를 생성하거나, AWS Marketplace에서 제3자가 제공하는 AMI를 구입/사용할 수 ...](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(C), (D)** : AWS만 AMI를 생성할 수 있다는 것은 틀립니다.

**핵심 개념:** 커스텀 AMI 생성 방법, AWS Marketplace AMI

**관련 노트:** [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q540. Will I be charged if the DB instance is idle?

**Options:**
- A) Yes.
- B) Only if running in GovCloud.
- C) Only if running in VPC.

**Answer:** A

**해설:**

> **문제:** DB 인스턴스가 유휴 상태일 때 요금이 부과됩니까?

| 선지 | 번역 |
|------|------|
| A | 예. |
| B | GovCloud에서 실행 중인 경우에만. |
| C | VPC에서 실행 중인 경우에만. |

**(A) 정답** : RDS DB 인스턴스는 유휴 상태(쿼리가 없더라도)에서도 실행 중이면 시간당 요금이 부과됩니다. EC2 인스턴스와 마찬가지로 인스턴스가 실행되는 동안은 요금이 발생합니다. → [📖 RDS DB 인스턴스는 유휴 상태(쿼리가 없더라도)에서도 실행 중이면 시간당 요금이 부과됩니다. EC2 인스턴스와 마찬가지로 인스턴스가 실행되는...](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**(B), (C)** : 지역이나 VPC 여부와 관계없이 실행 중이면 요금이 부과됩니다.

**핵심 개념:** RDS 인스턴스 요금 부과 기준, 유휴 상태에서도 과금

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q541. Your company has been storing a lot of data in Amazon Glacier and has asked for an inventory of what is in there exactly. So you have decided that you need to download a vault inventory. Which of the following statements is incorrect in relation to Vault Operations in Amazon Glacier?

**Options:**
- A) You can use Amazon Simple Notification Service (Amazon SNS) notifications to notify you when the job completes.
- B) A vault inventory refers to the list of archives in a vault.
- C) You can use Amazon Simple Queue Service (Amazon SQS) notifications to notify you when the job completes.
- D) Downloading a vault inventory is an asynchronous operation.

**Answer:** C

**해설:**

> **문제:** Amazon Glacier 볼트 작업에 관한 설명 중 올바르지 않은 것은?

| 선지 | 번역 |
|------|------|
| A | 작업 완료 시 Amazon SNS 알림을 사용하여 통보받을 수 있습니다. |
| B | 볼트 인벤토리는 볼트에 있는 아카이브 목록을 의미합니다. |
| C | 작업 완료 시 Amazon SQS 알림을 사용하여 통보받을 수 있습니다. |
| D | 볼트 인벤토리 다운로드는 비동기 작업입니다. |

**(A)** : Glacier 작업 완료 시 SNS를 통한 알림이 지원됩니다. 올바른 설명입니다. → [📖 Glacier 작업 완료 시 SNS를 통한 알림이 지원됩니다. 올바른 설명입니다.](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(B)** : 볼트 인벤토리는 해당 볼트의 아카이브 목록입니다. 올바른 설명입니다. → [📖 볼트 인벤토리는 해당 볼트의 아카이브 목록입니다. 올바른 설명입니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(C) 정답** : Glacier는 작업 완료 알림으로 SNS만 지원합니다. SQS를 직접 알림 메커니즘으로 사용하지 않습니다. 이 설명이 올바르지 않습니다. → [📖 Glacier는 작업 완료 알림으로 SNS만 지원합니다. SQS를 직접 알림 메커니즘으로 사용하지 않습니다. 이 설명이 올바르지 않습니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**(D)** : Glacier 인벤토리 조회는 비동기 작업으로 완료에 수 시간이 걸립니다. 올바른 설명입니다. → [📖 Glacier 인벤토리 조회는 비동기 작업으로 완료에 수 시간이 걸립니다. 올바른 설명입니다.](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**핵심 개념:** Amazon Glacier 볼트 인벤토리, 작업 완료 알림(SNS), 비동기 처리

**관련 노트:** [S3 Glacier Vault Lock](/section/12-s3-security#s3-glacier-vault-lock), [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q542. Your fortune 500 company has undertaken a TCO analysis evaluating the use of Amazon S3 versus acquiring more hardware. The outcome was that all employees would be granted access to use Amazon S3 for storage of their personal documents. Which of the following will you need to consider so you can set up a solution that incorporates single sign-on from your corporate AD or LDAP directory and restricts access for each user to a designated user folder in a bucket? (Choose 3 answers)

**Options:**
- A) Setting up a federation proxy or identity provider.
- B) Using AWS Security Token Service to generate temporary tokens.
- C) Tagging each folder in the bucket.
- D) Configuring IAM role.
- E) Setting up a matching IAM user for every user in your corporate directory that needs access to a folder in the bucket.

**Answer:** A, B, D

**해설:**

> **문제:** 기업 AD/LDAP에서 SSO를 통해 S3 버킷 내 개인 폴더에 접근하도록 하려면 어떤 것들이 필요합니까? (3개 선택)

| 선지 | 번역 |
|------|------|
| A | 페더레이션 프록시 또는 아이덴티티 제공자 설정. |
| B | AWS STS를 사용하여 임시 토큰 생성. |
| C | 버킷의 각 폴더에 태그 지정. |
| D | IAM 역할 구성. |
| E | 버킷 폴더에 접근이 필요한 모든 기업 디렉터리 사용자에 대해 일치하는 IAM 사용자 설정. |

**(A) 정답** : AD/LDAP 기반 SSO를 위해 SAML 2.0 기반 페더레이션 프록시 또는 IdP(Identity Provider)를 설정해야 합니다. → [📖 AD/LDAP 기반 SSO를 위해 SAML 2.0 기반 페더레이션 프록시 또는 IdP(Identity Provider)를 설정해야 합니다.](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**(B) 정답** : AWS STS(Security Token Service)를 사용하여 임시 자격 증명을 발급하면 영구 키 없이 안전하게 S3에 접근할 수 있습니다. → [📖 AWS STS(Security Token Service)를 사용하여 임시 자격 증명을 발급하면 영구 키 없이 안전하게 S3에 접근할 수 있습니다...](/section/24-security-encryption#aws-kms-key-management-service)

**(C)** : 폴더 태그는 SSO 또는 사용자별 접근 제어에 직접 사용되지 않습니다.

**(D) 정답** : IAM 역할을 통해 페더레이션 사용자가 S3의 특정 폴더에만 접근하도록 제어할 수 있습니다. IAM 정책의 ${aws:username} 변수를 활용합니다. → [📖 IAM 역할을 통해 페더레이션 사용자가 S3의 특정 폴더에만 접근하도록 제어할 수 있습니다. IAM 정책의 ${aws:username} 변수를 ...](/section/02-iam#iam-roles-역할)

**(E)** : 개별 IAM 사용자를 생성하는 것은 대규모 기업에 비효율적이며, 페더레이션 방식이 권장됩니다. → [📖 개별 IAM 사용자를 생성하는 것은 대규모 기업에 비효율적이며, 페더레이션 방식이 권장됩니다.](/section/02-iam#users-groups)

**핵심 개념:** SAML 페더레이션, AWS STS 임시 자격 증명, IAM 역할 기반 S3 폴더 접근 제어

**관련 노트:** [AWS IAM Identity Center AWS SSO 후속](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속), [IAM Roles 역할](/section/02-iam#iam-roles-역할), [S3 보안](/section/10-amazon-s3#s3-보안)

---

### Q543. Your company policies require encryption of sensitive data at rest. You are considering the possible options for protecting data while storing it at rest on an EBS data volume, attached to an EC2 instance. Which of these options would allow you to encrypt your data at rest? (Choose 3 answers)

**Options:**
- A) Implement third party volume encryption tools.
- B) Do nothing as EBS volumes are encrypted by default.
- C) Encrypt data inside your applications before storing it on EBS.
- D) Encrypt data using native data encryption drivers at the file system level.
- E) Implement SSL/TLS for all services running on the server.

**Answer:** A, C, D

**해설:**

> **문제:** EC2 인스턴스에 연결된 EBS 데이터 볼륨의 저장 데이터를 암호화하는 방법을 3개 고르시오.

| 선지 | 번역 |
|------|------|
| A | 제3자 볼륨 암호화 도구 구현. |
| B | EBS 볼륨은 기본적으로 암호화되므로 별도 조치 불필요. |
| C | EBS에 저장하기 전에 애플리케이션 내에서 데이터를 암호화. |
| D | 파일 시스템 수준에서 기본 데이터 암호화 드라이버를 사용하여 데이터 암호화. |
| E | 서버의 모든 서비스에 SSL/TLS 구현. |

**(A) 정답** : BitLocker, dm-crypt 등 제3자 볼륨 암호화 도구로 저장 데이터를 암호화할 수 있습니다. → [📖 BitLocker, dm-crypt 등 제3자 볼륨 암호화 도구로 저장 데이터를 암호화할 수 있습니다.](/section/05-ec2-instance-storage#ebs-encryption)

**(B)** : EBS 볼륨은 기본적으로 암호화되지 않습니다. 명시적으로 활성화해야 합니다. → [📖 EBS 볼륨은 기본적으로 암호화되지 않습니다. 명시적으로 활성화해야 합니다.](/section/05-ec2-instance-storage#ebs-encryption)

**(C) 정답** : 애플리케이션 레벨에서 데이터를 암호화한 후 EBS에 저장하는 방법입니다. → [📖 애플리케이션 레벨에서 데이터를 암호화한 후 EBS에 저장하는 방법입니다.](/section/05-ec2-instance-storage#ebs-encryption)

**(D) 정답** : Linux의 dm-crypt/LUKS, Windows의 BitLocker 같은 파일 시스템 레벨 암호화를 사용할 수 있습니다. → [📖 Linux의 dm-crypt/LUKS, Windows의 BitLocker 같은 파일 시스템 레벨 암호화를 사용할 수 있습니다.](/section/05-ec2-instance-storage#ebs-encryption)

**(E)** : SSL/TLS는 전송 중 데이터 암호화로 저장 데이터(at rest) 암호화와 다릅니다. → [📖 SSL/TLS는 전송 중 데이터 암호화로 저장 데이터(at rest) 암호화와 다릅니다.](/section/12-s3-security#encryption-in-transit-전송-중-암호화)

**핵심 개념:** EBS 저장 데이터 암호화 방법, 전송 중 암호화(in-transit) vs 저장 중 암호화(at-rest)

**관련 노트:** [EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption), [S3 객체 암호화 - 4가지 방법](/section/12-s3-security#s3-객체-암호화-4가지-방법)

---

### Q544. A scope has been handed to you to set up a super fast gaming server and you decide that you will use Amazon DynamoDB as your database. For efficient access to data in a table, Amazon DynamoDB creates and maintains indexes for the primary key attributes. A secondary index is a data structure that contains a subset of attributes from a table, along with an alternate key to support Query operations. How many types of secondary indexes does DynamoDB support?

**Options:**
- A) 2.
- B) 16.
- C) 4.
- D) As many as you need.

**Answer:** A

**해설:**

> **문제:** Amazon DynamoDB가 지원하는 보조 인덱스(secondary index)의 유형은 몇 가지입니까?

| 선지 | 번역 |
|------|------|
| A | 2가지. |
| B | 16가지. |
| C | 4가지. |
| D | 필요한 만큼. |

**(A) 정답** : DynamoDB는 2가지 유형의 보조 인덱스를 지원합니다: GSI(Global Secondary Index, 전역 보조 인덱스)와 LSI(Local Secondary Index, 로컬 보조 인덱스). → [📖 DynamoDB는 2가지 유형의 보조 인덱스를 지원합니다: GSI(Global Secondary Index, 전역 보조 인덱스)와 LSI(Loc...](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : 테이블당 GSI를 최대 20개, LSI를 최대 5개 생성할 수 있지만, 인덱스 유형은 2가지입니다. → [📖 테이블당 GSI를 최대 20개, LSI를 최대 5개 생성할 수 있지만, 인덱스 유형은 2가지입니다.](/section/17-serverless-overview#amazon-dynamodb)

**(C), (D)** : 인덱스 유형은 정확히 2가지입니다.

**핵심 개념:** DynamoDB 보조 인덱스 유형: GSI(전역) vs LSI(로컬)

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q545. True or False: in Amazon Route 53, you can create a hosted zone for a top-level domain (TLD).

**Options:**
- A) False.
- B) False, Amazon Route 53 automatically creates it for you.
- C) True, only if you send an XML document with a CreateHostedZoneRequest element for TLD.
- D) True.

**Answer:** A

**해설:**

> **문제:** Amazon Route 53에서 최상위 도메인(TLD)에 대한 호스팅 영역을 생성할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 거짓. |
| B | 거짓, Amazon Route 53이 자동으로 생성합니다. |
| C | 참, TLD에 대한 CreateHostedZoneRequest 요소가 포함된 XML 문서를 전송하면 됩니다. |
| D | 참. |

**(A) 정답** : Route 53에서는 TLD(.com, .org 등)에 대한 호스팅 영역을 직접 생성할 수 없습니다. Route 53은 TLD를 관리하는 레지스트리와 다릅니다. → [📖 Route 53에서는 TLD(.com, .org 등)에 대한 호스팅 영역을 직접 생성할 수 없습니다. Route 53은 TLD를 관리하는 레지스...](/section/08-route-53#hosted-zones)

**(B)** : Route 53이 TLD 호스팅 영역을 자동으로 생성하지 않습니다.

**(C)** : XML 문서 방식으로도 TLD 호스팅 영역 생성은 불가능합니다.

**(D)** : TLD 호스팅 영역 생성은 불가능합니다.

**핵심 개념:** Route 53 호스팅 영역 제한, TLD 호스팅 불가

**관련 노트:** [Hosted Zones](/section/08-route-53#hosted-zones), [Route 53 특징](/section/08-route-53#route-53-특징)

---

### Q546. You want to use AWS Import/Export to send data from your S3 bucket to several of your branch offices. What should you do if you want to send 10 storage units to AWS?

**Options:**
- A) Make sure your disks are encrypted prior to shipping.
- B) Make sure you format your disks prior to shipping.
- C) Make sure your disks are 1TB or more.
- D) Make sure you submit a separate job request for each device.

**Answer:** D

**해설:**

> **문제:** AWS Import/Export를 사용하여 S3 버킷에서 여러 지사로 데이터를 전송하려 합니다. 10개의 스토리지 유닛을 AWS에 보내려면 어떻게 해야 합니까?

| 선지 | 번역 |
|------|------|
| A | 배송 전에 디스크가 암호화되어 있는지 확인합니다. |
| B | 배송 전에 디스크를 포맷합니다. |
| C | 디스크가 1TB 이상인지 확인합니다. |
| D | 각 디바이스에 대해 별도의 작업 요청을 제출합니다. |

**(A)** : 암호화는 권장 사항이지만 필수 요구 사항은 아닙니다.

**(B)** : 포맷이 필수 요구 사항은 아닙니다.

**(C)** : 디스크 크기 제한이 1TB는 아닙니다.

**(D) 정답** : AWS Import/Export는 각 물리적 스토리지 디바이스마다 별도의 작업(job) 요청을 제출해야 합니다. 10개의 디바이스를 보내면 10개의 작업 요청이 필요합니다. → [📖 AWS Import/Export는 각 물리적 스토리지 디바이스마다 별도의 작업(job) 요청을 제출해야 합니다. 10개의 디바이스를 보내면 10...](/section/14-storage-extras#aws-snowball-snow-family)

**핵심 개념:** AWS Import/Export 작업 요청 규칙, 디바이스당 별도 작업

**관련 노트:** [AWS Snowball Snow Family](/section/14-storage-extras#aws-snowball-snow-family)

---

### Q547. You are deploying an application to track GPS coordinates of delivery trucks in the United States. Coordinates are transmitted from each delivery truck once every three seconds. You need to design an architecture that will enable real-time processing of these coordinates from multiple consumers. Which service should you use to implement data ingestion?

**Options:**
- A) Amazon Kinesis.
- B) AWS Data Pipeline.
- C) Amazon AppStream.
- D) Amazon Simple Queue Service.

**Answer:** A

**해설:**

> **문제:** 배달 트럭의 GPS 좌표를 3초마다 수신하여 여러 소비자가 실시간으로 처리할 수 있는 아키텍처를 설계해야 합니다. 데이터 수집(ingestion)에 사용할 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon Kinesis. |
| B | AWS Data Pipeline. |
| C | Amazon AppStream. |
| D | Amazon SQS. |

**(A) 정답** : Amazon Kinesis Data Streams는 대규모 실시간 스트리밍 데이터 수집에 최적화되어 있으며, 여러 소비자(consumers)가 동일 스트림 데이터를 동시에 처리할 수 있습니다. GPS 좌표처럼 연속적인 실시간 데이터에 적합합니다. → [📖 Amazon Kinesis Data Streams는 대규모 실시간 스트리밍 데이터 수집에 최적화되어 있으며, 여러 소비자(consumers)가 ...](/section/15-integration-messaging#amazon-kinesis-data-streams)

**(B)** : AWS Data Pipeline은 배치 데이터 이동/변환에 사용하며 실시간 스트리밍에 적합하지 않습니다.

**(C)** : AppStream은 애플리케이션 스트리밍 서비스로 데이터 수집과 관련 없습니다.

**(D)** : SQS는 메시지 큐로 단일 소비자가 메시지를 처리하면 삭제됩니다. 여러 소비자가 동일 데이터를 처리하는 데 적합하지 않습니다. → [📖 SQS는 메시지 큐로 단일 소비자가 메시지를 처리하면 삭제됩니다. 여러 소비자가 동일 데이터를 처리하는 데 적합하지 않습니다.](/section/15-integration-messaging#amazon-sqs-simple-queue-service)

**핵심 개념:** Amazon Kinesis 실시간 데이터 스트리밍, 다중 소비자 지원, Kinesis vs SQS 비교

**관련 노트:** [Amazon Kinesis Data Streams](/section/15-integration-messaging#amazon-kinesis-data-streams), [언제 무엇을 쓰는가? SQS / SNS / Kinesis 한눈에 비교](/section/15-integration-messaging#언제-무엇을-쓰는가-sqs-sns-kinesis-한눈에-비교)

---

### Q548. While performing the volume status checks, if the status is insufficient-data, what does it mean?

**Options:**
- A) The checks may still be in progress on the volume.
- B) The check has passed.
- C) The check has failed.

**Answer:** A

**해설:**

> **문제:** 볼륨 상태 확인 시 상태가 'insufficient-data'이면 무엇을 의미합니까?

| 선지 | 번역 |
|------|------|
| A | 볼륨에 대한 확인이 아직 진행 중일 수 있습니다. |
| B | 확인이 통과되었습니다. |
| C | 확인이 실패했습니다. |

**(A) 정답** : `insufficient-data`는 아직 충분한 데이터가 수집되지 않았음을 의미하며, 상태 확인이 진행 중임을 나타냅니다. EBS 볼륨 상태는 ok, warning, impaired, insufficient-data로 구분됩니다. → [📖 `insufficient-data`는 아직 충분한 데이터가 수집되지 않았음을 의미하며, 상태 확인이 진행 중임을 나타냅니다. EBS 볼륨 상태는...](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : 확인 통과는 `ok` 상태입니다.

**(C)** : 확인 실패는 `impaired` 상태입니다.

**핵심 개념:** EBS 볼륨 상태 확인 상태값: ok, warning, impaired, insufficient-data

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q549. Can you create IAM security credentials for existing users?

**Options:**
- A) Yes, existing users can have security credentials associated with their account.
- B) No, IAM requires that all users who have credentials set up are not existing users.
- C) No, security credentials are created within GROUPS, and then users are associated to GROUPS at a later time.
- D) Yes, but only IAM credentials, not ordinary security credentials.

**Answer:** A

**해설:**

> **문제:** 기존 사용자에 대한 IAM 보안 자격 증명을 생성할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 예, 기존 사용자는 자신의 계정에 보안 자격 증명을 연결할 수 있습니다. |
| B | 아니요, IAM은 자격 증명이 설정된 모든 사용자가 기존 사용자가 아니어야 합니다. |
| C | 아니요, 보안 자격 증명은 그룹 내에서 생성되고 나중에 사용자가 그룹에 연결됩니다. |
| D | 예, 일반 보안 자격 증명이 아닌 IAM 자격 증명만 가능합니다. |

**(A) 정답** : IAM에서는 기존 IAM 사용자에 대해 언제든지 액세스 키, 비밀번호, MFA 장치 등의 보안 자격 증명을 생성하거나 변경할 수 있습니다. → [📖 IAM에서는 기존 IAM 사용자에 대해 언제든지 액세스 키, 비밀번호, MFA 장치 등의 보안 자격 증명을 생성하거나 변경할 수 있습니다.](/section/02-iam#iam-security-tools)

**(B), (C), (D)** : 잘못된 설명입니다. 기존 사용자에게 자격 증명을 추가/변경할 수 있습니다.

**핵심 개념:** IAM 사용자 자격 증명 관리, 액세스 키 생성

**관련 노트:** [IAM Security Tools](/section/02-iam#iam-security-tools), [AWS 접근 방법](/section/02-iam#aws-접근-방법)

---

### Q550. Can I move a Reserved Instance from one Region to another?

**Options:**
- A) No.
- B) Only if they are moving into GovCloud.
- C) Yes.
- D) Only if they are moving to US East from another region.

**Answer:** A

**해설:**

> **문제:** 예약 인스턴스(Reserved Instance)를 한 리전에서 다른 리전으로 이동할 수 있습니까?

| 선지 | 번역 |
|------|------|
| A | 아니요. |
| B | GovCloud로 이동하는 경우에만 가능합니다. |
| C | 예. |
| D | 다른 리전에서 US East로 이동하는 경우에만 가능합니다. |

**(A) 정답** : 예약 인스턴스는 구매 시 지정한 리전에 고정됩니다. 리전 간 이동이 불가능합니다. 단, 동일 리전 내에서 AZ 변경이나 인스턴스 타입 수정은 Convertible RI의 경우 가능합니다. → [📖 예약 인스턴스는 구매 시 지정한 리전에 고정됩니다. 리전 간 이동이 불가능합니다. 단, 동일 리전 내에서 AZ 변경이나 인스턴스 타입 수정은 C...](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(B), (C), (D)** : 리전 간 RI 이전은 불가능합니다.

**핵심 개념:** 예약 인스턴스(RI) 리전 고정, Convertible RI vs Standard RI 차이

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---
