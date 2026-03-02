# Ditectrev SAA-C03 Practice Questions — Batch 09 (Q401-Q450)

> 출처: https://github.com/Ditectrev/AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers

---

### Q401. Can I delete a snapshot of the root device of an EBS volume used by a registered AMI?

**Options:**
- A) Only via API.
- B) Only via Console.
- C) Yes.
- D) No.

**Answer:** C

**해설:**

> **문제:** 등록된 AMI에서 사용 중인 EBS 볼륨의 루트 디바이스 스냅샷을 삭제할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | API를 통해서만 가능하다. |
| B | 콘솔을 통해서만 가능하다. |
| C | 가능하다. |
| D | 불가능하다. |

**(A)** : API로만 삭제가 제한되지 않는다. 이 설명은 잘못된 제약이다.

**(B)** : 콘솔로만 삭제가 제한되지 않는다. 이 설명도 잘못된 제약이다.

**(C) 정답** : 등록된 AMI가 사용 중인 EBS 스냅샷도 삭제할 수 있다. 다만 해당 스냅샷을 기반으로 새 인스턴스를 시작할 수 없게 되므로, AMI를 먼저 deregister하는 것이 권장된다. → [📖 등록된 AMI가 사용 중인 EBS 스냅샷도 삭제할 수 있음(AMI 비정상 상태 가능)](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**(D)** : 삭제 자체는 기술적으로 가능하다. 단, AMI가 비정상 상태가 될 수 있어 실무상 권장하지 않을 뿐이다.

**핵심 개념:** EBS Snapshot / AMI 라이프사이클

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q402. MySQL installations default to port [...].

**Options:**
- A) 3306.
- B) 443.
- C) 80.
- D) 1158.

**Answer:** A

**해설:**

> **문제:** MySQL 설치 시 기본 포트는 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 3306 |
| B | 443 |
| C | 80 |
| D | 1158 |

**(A) 정답** : MySQL의 기본 포트는 3306이다. AWS RDS MySQL 인스턴스도 동일하게 3306을 사용한다. → [📖 MySQL의 기본 포트는 3306이다](/section/03-ec2-basics#classic-ports)

**(B)** : 443은 HTTPS의 포트이다. → [📖 443은 HTTPS의 포트이다](/section/03-ec2-basics#classic-ports)

**(C)** : 80은 HTTP의 포트이다. → [📖 80은 HTTP의 포트이다](/section/03-ec2-basics#classic-ports)

**(D)** : 1158은 Oracle Enterprise Manager의 포트이다.

**핵심 개념:** RDS / 데이터베이스 포트 번호

**관련 노트:** [Classic Ports](/section/03-ec2-basics#classic-ports), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q403. In the 'Detailed' monitoring data available for your Amazon EBS volumes, Provisioned IOPS volumes automatically send [...] minute metrics to Amazon CloudWatch.

**Options:**
- A) 5.
- B) 2.
- C) 1.
- D) 3.

**Answer:** C

**해설:**

> **문제:** Amazon EBS 볼륨의 상세 모니터링에서, Provisioned IOPS 볼륨은 몇 분 단위로 자동으로 CloudWatch에 지표를 전송하는가?

| 선지 | 번역 |
|------|------|
| A | 5분 |
| B | 2분 |
| C | 1분 |
| D | 3분 |

**(A)** : 5분은 표준(기본) 모니터링의 간격이다. → [📖 5분은 표준(기본) 모니터링의 간격이다](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : 2분 간격은 EBS 모니터링에 해당하지 않는다.

**(C) 정답** : Provisioned IOPS(io1/io2) 볼륨은 1분 간격으로 CloudWatch에 지표를 자동 전송한다. 이는 상세(Detailed) 모니터링에 해당한다. → [📖 Provisioned IOPS 볼륨은 1분 간격으로 CloudWatch에 지표를 자동 전송](/section/05-ec2-instance-storage#ebs-volume-types-6가지)

**(D)** : 3분 간격은 EBS 모니터링에 해당하지 않는다.

**핵심 개념:** EBS Provisioned IOPS / CloudWatch 모니터링 간격

**관련 노트:** [EBS Volume Types 6가지](/section/05-ec2-instance-storage#ebs-volume-types-6가지), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q404. A user has deployed an application on his private cloud. The user is using his own monitoring tool. He wants to configure it so that whenever there is an error, the monitoring tool will notify him via SMS. Which of the below mentioned AWS services will help in this scenario?

**Options:**
- A) AWS SES.
- B) AWS SNS.
- C) None because the user infrastructure is in the private cloud.
- D) AWS SMS.

**Answer:** B

**해설:**

> **문제:** 사용자가 프라이빗 클라우드에 애플리케이션을 배포했다. 자체 모니터링 도구를 사용하는데, 오류 발생 시 SMS로 알림을 받고 싶다. 어떤 AWS 서비스를 활용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | AWS SES |
| B | AWS SNS |
| C | 인프라가 프라이빗 클라우드에 있으므로 해당 없음 |
| D | AWS SMS |

**(A)** : AWS SES(Simple Email Service)는 이메일 발송 서비스이며 SMS를 지원하지 않는다. → [📖 AWS SES는 이메일 발송 서비스이며 SMS를 지원하지 않음](/section/28-other-services#amazon-simple-email-service-ses)

**(B) 정답** : AWS SNS(Simple Notification Service)는 SMS, 이메일, HTTP/HTTPS 등 다양한 채널로 알림을 전송할 수 있다. 인프라가 프라이빗 클라우드에 있어도 SNS API를 호출하여 SMS를 발송할 수 있다. → [📖 AWS SNS는 SMS, 이메일, HTTP/HTTPS 등 다양한 채널로 알림 전송](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(C)** : 인프라가 프라이빗 클라우드에 있더라도 AWS API를 통해 SNS를 이용할 수 있다.

**(D)** : AWS SMS는 Server Migration Service의 약어로, SMS 문자 발송 서비스가 아니다.

**핵심 개념:** SNS / 알림 서비스

**관련 노트:** [Amazon SNS Simple Notification Service](/section/15-integration-messaging#amazon-sns-simple-notification-service)

---

### Q405. What does Amazon Route 53 provide?

**Options:**
- A) A global Content Delivery Network.
- B) None of these.
- C) A scalable Domain Name System.
- D) An SSH endpoint for Amazon EC2.

**Answer:** C

**해설:**

> **문제:** Amazon Route 53이 제공하는 것은 무엇인가?

| 선지 | 번역 |
|------|------|
| A | 글로벌 콘텐츠 전송 네트워크 |
| B | 해당 없음 |
| C | 확장 가능한 도메인 네임 시스템 |
| D | Amazon EC2의 SSH 엔드포인트 |

**(A)** : 글로벌 CDN은 Amazon CloudFront가 제공하는 서비스이다. → [📖 글로벌 CDN은 Amazon CloudFront가 제공하는 서비스](/section/13-cloudfront-global-accelerator#cloudfront-기본-개념)

**(B)** : Route 53은 명확한 기능을 제공한다.

**(C) 정답** : Amazon Route 53은 확장 가능한 DNS(Domain Name System) 웹 서비스로, 도메인 등록, DNS 라우팅, 상태 확인 기능을 제공한다. → [📖 Amazon Route 53은 확장 가능한 DNS 웹 서비스로 도메인 등록, DNS 라우팅, 상태 확인 제공](/section/08-route-53#route-53-특징)

**(D)** : SSH 엔드포인트는 Route 53과 관련이 없다.

**핵심 개념:** Route 53 / DNS

**관련 노트:** [Route 53 특징](/section/08-route-53#route-53-특징)

---

### Q406. The AWS CloudHSM service defines a resource known as a high-availability (HA) [...], which is a virtual partition that represents a group of partitions, typically distributed between several physical HSMs for high-availability.

**Options:**
- A) proxy group.
- B) partition group.
- C) functional group.
- D) relational group.

**Answer:** B

**해설:**

> **문제:** AWS CloudHSM 서비스는 고가용성(HA) [...]이라는 리소스를 정의한다. 이는 일반적으로 고가용성을 위해 여러 물리적 HSM에 분산된 파티션 그룹을 나타내는 가상 파티션이다.

| 선지 | 번역 |
|------|------|
| A | 프록시 그룹 |
| B | 파티션 그룹 |
| C | 기능 그룹 |
| D | 관계형 그룹 |

**(A)** : 프록시 그룹은 CloudHSM의 HA 개념과 관련 없다.

**(B) 정답** : CloudHSM에서 HA 파티션 그룹(partition group)은 여러 HSM 장치에 걸쳐 분산된 가상 파티션으로, 고가용성을 보장한다. → [📖 CloudHSM의 HA 파티션 그룹은 여러 HSM 장치에 걸쳐 분산된 가상 파티션](/section/24-security-encryption#cloudhsm)

**(C)** : 기능 그룹은 CloudHSM 용어가 아니다.

**(D)** : 관계형 그룹은 CloudHSM 용어가 아니다.

**핵심 개념:** CloudHSM / HA 파티션 그룹

**관련 노트:** [CloudHSM](/section/24-security-encryption#cloudhsm)

---

### Q407. In Amazon EC2, partial instance-hours are billed [...].

**Options:**
- A) per second used in the hour.
- B) per minute used.
- C) by combining partial segments into full hours.
- D) as full hours.

**Answer:** D

**해설:**

> **문제:** Amazon EC2에서 부분 인스턴스-시간은 어떻게 청구되는가?

| 선지 | 번역 |
|------|------|
| A | 시간 내 사용한 초 단위로 청구 |
| B | 사용한 분 단위로 청구 |
| C | 부분 세그먼트를 합산하여 전체 시간으로 청구 |
| D | 전체 시간으로 청구 |

**(A)** : 초 단위 청구는 Linux 인스턴스에 적용되는 현재 방식이지만, 이 문제는 과거 정책 기준이다.

**(B)** : 분 단위 청구는 EC2의 공식 청구 방식이 아니다.

**(C)** : 이 설명은 실제 청구 방식과 다르다.

**(D) 정답** : 이 문제는 이전 EC2 청구 정책을 묻는 문제로, 부분 인스턴스-시간은 전체 1시간으로 올림하여 청구된다. (현재 Linux는 초 단위 청구로 변경되었으나 시험 문맥상 이 답이 정답이다.) → [📖 부분 인스턴스-시간은 전체 1시간으로 올림하여 청구(이전 EC2 청구 정책)](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**핵심 개념:** EC2 청구 모델

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q408. In Amazon EC2, what is the limit of Reserved Instances per Availability Zone each month?

**Options:**
- A) 5.
- B) 20.
- C) 50.
- D) 10.

**Answer:** B

**해설:**

> **문제:** Amazon EC2에서 가용 영역(AZ)당 월별 예약 인스턴스의 한도는?

| 선지 | 번역 |
|------|------|
| A | 5개 |
| B | 20개 |
| C | 50개 |
| D | 10개 |

**(A)** : 5개는 너무 적은 한도이다.

**(B) 정답** : EC2 예약 인스턴스의 기본 한도는 가용 영역당 20개이다. AWS Support를 통해 한도 증가를 요청할 수 있다. → [📖 EC2 예약 인스턴스의 기본 한도는 가용 영역당 20개](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

**(C)** : 50개는 기본 한도를 초과한다.

**(D)** : 10개는 실제 한도와 다르다.

**핵심 개념:** EC2 Reserved Instances / 서비스 한도

**관련 노트:** [EC2 구매 옵션 시험 핵심!](/section/03-ec2-basics#ec2-구매-옵션-시험-핵심)

---

### Q409. True or False: When using IAM to control access to your RDS resources, the key names that can be used are case sensitive. For example, aws: CurrentTime is NOT equivalent to AWS: currenttime.

**Options:**
- A) True.
- B) False.

**Answer:** B

**해설:**

> **문제:** IAM으로 RDS 리소스 접근을 제어할 때, 사용할 수 있는 키 이름은 대소문자를 구분한다. 예를 들어 `aws:CurrentTime`은 `AWS:currenttime`과 동일하지 않다. 참인가, 거짓인가?

| 선지 | 번역 |
|------|------|
| A | 참 |
| B | 거짓 |

**(A)** : IAM 조건 키는 대소문자를 구분하지 않으므로 이 진술은 거짓이다. → [📖 IAM 조건 키는 대소문자를 구분하지 않으므로 이 진술은 거짓](/section/23-advanced-identity#iam-conditions)

**(B) 정답** : IAM 정책의 조건 키(condition key)는 대소문자를 구분하지 않는다. `aws:CurrentTime`과 `AWS:currenttime`은 동일하게 처리된다. → [📖 IAM 정책의 조건 키는 대소문자를 구분하지 않음](/section/23-advanced-identity#iam-conditions)

**핵심 개념:** IAM 조건 키 / 대소문자 구분

**관련 노트:** [IAM Conditions](/section/23-advanced-identity#iam-conditions), [IAM Policies 정책](/section/02-iam#iam-policies-정책)

---

### Q410. You need to create a JSON-formatted text file for AWS CloudFormation. This is your first template and the only thing you know is that the templates include several major sections but there is only one that is required for it to work. What is the only section required?

**Options:**
- A) Mappings.
- B) Outputs.
- C) Resources.
- D) Conditions.

**Answer:** C

**해설:**

> **문제:** AWS CloudFormation용 JSON 형식 템플릿을 작성하려 한다. 여러 섹션이 있지만 필수인 섹션은 하나뿐이다. 어떤 섹션인가?

| 선지 | 번역 |
|------|------|
| A | Mappings |
| B | Outputs |
| C | Resources |
| D | Conditions |

**(A)** : Mappings 섹션은 선택 사항이다. 조건부 파라미터 값 매핑에 사용된다. → [📖 Mappings 섹션은 선택 사항이다](/section/28-other-services#aws-cloudformation)

**(B)** : Outputs 섹션은 선택 사항이다. 스택 출력 값을 정의한다. → [📖 Outputs 섹션은 선택 사항이다](/section/28-other-services#aws-cloudformation)

**(C) 정답** : CloudFormation 템플릿에서 `Resources` 섹션만이 필수이다. 실제로 생성할 AWS 리소스를 정의하는 섹션으로 반드시 포함해야 한다. → [📖 CloudFormation 템플릿에서 Resources 섹션만이 필수이다](/section/28-other-services#aws-cloudformation)

**(D)** : Conditions 섹션은 선택 사항이다. 조건부 리소스 생성에 사용된다. → [📖 Conditions 섹션은 선택 사항이다](/section/28-other-services#aws-cloudformation)

**핵심 개념:** CloudFormation 템플릿 구조 / Resources 섹션

**관련 노트:** [AWS CloudFormation](/section/28-other-services#aws-cloudformation)

---

### Q411. A user wants to use an EBS-backed Amazon EC2 instance for a temporary job. Based on the input data, the job is most likely to finish within a week. Which of the following steps should be followed to terminate the instance automatically once the job is finished?

**Options:**
- A) Configure the EC2 instance with a stop instance to terminate it.
- B) Configure the EC2 instance with ELB to terminate the instance when it remains idle.
- C) Configure the Cloud Watch alarm on the instance that should perform the termination action once the instance is idle.
- D) Configure the Auto Scaling schedule activity that terminates the instance after 7 days.

**Answer:** C

**해설:**

> **문제:** 사용자가 임시 작업을 위해 EBS 기반 EC2 인스턴스를 사용하려 한다. 작업은 일주일 내에 완료될 것으로 예상된다. 작업 완료 후 인스턴스를 자동으로 종료하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 인스턴스를 중지하도록 EC2 인스턴스를 구성한다. |
| B | 인스턴스가 유휴 상태일 때 종료하도록 ELB와 함께 EC2를 구성한다. |
| C | 인스턴스가 유휴 상태가 되면 종료 액션을 수행하는 CloudWatch 알람을 구성한다. |
| D | 7일 후 인스턴스를 종료하는 Auto Scaling 스케줄 활동을 구성한다. |

**(A)** : Stop과 Terminate는 다른 동작이다. 중지(Stop)는 인스턴스를 종료하지 않는다.

**(B)** : ELB는 인스턴스 유휴 상태를 감지하여 종료하는 기능이 없다.

**(C) 정답** : CloudWatch 알람을 CPU 사용률 등 유휴 지표에 연결하고, 알람 액션으로 인스턴스 종료(Terminate)를 설정하면 자동으로 종료할 수 있다. → [📖 CloudWatch 알람을 CPU 사용률 등 유휴 지표에 연결하고, 알람 액션으로 인스턴스 종료 설정](/section/22-monitoring-audit-performance#cloudwatch-alarms)

**(D)** : Auto Scaling 스케줄은 정해진 시간에 작동하지만, 작업 완료 여부를 판단하지는 못한다.

**핵심 개념:** CloudWatch Alarm / EC2 자동 종료

**관련 노트:** [CloudWatch Alarms](/section/22-monitoring-audit-performance#cloudwatch-alarms), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q412. You are building an automated transcription service in which Amazon EC2 worker instances process an uploaded audio file and generate a text file. You must store both of these files in the same durable storage until the text file is retrieved. You do not know what the storage capacity requirements are. Which storage option is both cost-efficient and scalable?

**Options:**
- A) Multiple Amazon EBS volume with snapshots.
- B) A single Amazon Glacier vault.
- C) A single Amazon S3 bucket.
- D) Multiple instance stores.

**Answer:** C

**해설:**

> **문제:** EC2 워커 인스턴스가 오디오 파일을 처리하여 텍스트 파일을 생성하는 자동 전사 서비스를 구축 중이다. 두 파일 모두 동일한 내구성 있는 스토리지에 저장해야 하며, 용량 요구사항은 미지수이다. 비용 효율적이고 확장 가능한 스토리지는?

| 선지 | 번역 |
|------|------|
| A | 스냅샷을 포함한 여러 Amazon EBS 볼륨 |
| B | 단일 Amazon Glacier 볼트 |
| C | 단일 Amazon S3 버킷 |
| D | 여러 인스턴스 스토어 |

**(A)** : EBS는 사전에 용량을 프로비저닝해야 하므로 확장성이 제한적이고 비용도 더 높다. → [📖 EBS는 사전에 용량을 프로비저닝해야 하므로 확장성이 제한적](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : Glacier는 아카이브용으로 즉각적인 검색이 느리며, 활성 데이터 저장소로 부적합하다. → [📖 Glacier는 아카이브용으로 즉각적인 검색이 느림](/section/10-amazon-s3#s3-storage-classes-스토리지-클래스)

**(C) 정답** : S3는 무제한 확장이 가능하고, 내구성(99.999999999%)이 높으며, 용량에 따라 비용을 지불하는 비용 효율적인 서비스이다. → [📖 S3는 무제한 확장이 가능하고 내구성(99.999999999%)이 높은 비용 효율적인 서비스](/section/10-amazon-s3#s3-사용-사례)

**(D)** : 인스턴스 스토어는 인스턴스 종료 시 데이터가 손실되므로 내구성이 없다. → [📖 인스턴스 스토어는 인스턴스 종료 시 데이터가 손실되므로 내구성이 없음](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** S3 / 확장 가능한 객체 스토리지

**관련 노트:** [S3 버킷 Bucket](/section/10-amazon-s3#s3-버킷-bucket), [S3 사용 사례](/section/10-amazon-s3#s3-사용-사례)

---

### Q413. Your company has recently extended its datacenter into a VPC on AWS to add burst computing capacity as needed. Members of your Network Operations Center need to be able to go to the AWS Management Console and administer Amazon EC2 instances as necessary. You don't want to create new IAM users for each NOC member and make those users sign in again to the AWS Management Console. Which option below will meet the needs for your NOC members?

**Options:**
- A) Use OAuth 2.0 to retrieve temporary AWS security credentials to enable your NOC members to sign in to the AWS Management Console.
- B) Use web Identity Federation to retrieve AWS temporary security credentials to enable your NOC members to sign in to the AWS Management Console.
- C) Use your on-premises SAML 2.0-compliant identity provider (IDP) to grant the NOC members federated access to the AWS Management Console via the AWS single sign-on (SSO) endpoint.
- D) Use your on-premises SAML 2.0-compliant identity provider (IDP) to retrieve temporary security credentials to enable NOC members to sign in to the AWS Management Console.

**Answer:** D

**해설:**

> **문제:** 회사가 VPC로 데이터센터를 확장했다. NOC(네트워크 운영 센터) 멤버들이 AWS 관리 콘솔에서 EC2 인스턴스를 관리해야 한다. 각 NOC 멤버마다 새 IAM 사용자를 만들지 않고 접근을 허용하려면?

| 선지 | 번역 |
|------|------|
| A | OAuth 2.0을 사용하여 임시 AWS 보안 자격증명을 획득 |
| B | 웹 ID 페더레이션을 사용하여 임시 AWS 보안 자격증명을 획득 |
| C | 온프레미스 SAML 2.0 호환 IdP를 통해 AWS SSO 엔드포인트로 페더레이션 접근 허용 |
| D | 온프레미스 SAML 2.0 호환 IdP를 통해 임시 보안 자격증명을 획득하여 AWS 콘솔 접속 |

**(A)** : AWS는 OAuth 2.0을 직접 사용한 콘솔 접근 방식을 지원하지 않는다.

**(B)** : 웹 ID 페더레이션은 소셜 로그인(Google, Facebook 등)을 위한 것으로, 기업 내부 사용자에게 적합하지 않다. → [📖 웹 ID 페더레이션은 소셜 로그인(Google, Facebook 등)을 위한 것](/section/17-serverless-overview#amazon-cognito)

**(C)** : SSO 엔드포인트를 통한 방식도 유효하나, 이 보기의 설명은 정확하지 않다.

**(D) 정답** : 온프레미스 SAML 2.0 IdP와 AWS STS를 연동하여 AssumeRoleWithSAML API를 통해 임시 자격증명을 발급하고 콘솔에 접근하는 방식이 기업 페더레이션의 표준 방법이다. → [📖 온프레미스 SAML 2.0 IdP와 AWS STS를 연동하여 AssumeRoleWithSAML API로 임시 자격증명 발급](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

**핵심 개념:** SAML 2.0 페더레이션 / IAM 역할 위임 / STS

**관련 노트:** [IAM Roles 역할](/section/02-iam#iam-roles-역할), [AWS IAM Identity Center AWS SSO 후속](/section/23-advanced-identity#aws-iam-identity-center-aws-sso-후속)

---

### Q414. You have just set up your first Elastic Load Balancer (ELB) but it does not seem to be configured properly. You discover that before you start using ELB, you have to configure the listeners for your load balancer. Which protocols does ELB use to support the load balancing of applications?

**Options:**
- A) HTTP and HTTPS.
- B) HTTP, HTTPS, TCP, SSL and SSH.
- C) HTTP, HTTPS, TCP, and SSL.
- D) HTTP, HTTPS, TCP, SSL and SFTP.

**Answer:** C

**해설:**

> **문제:** ELB를 처음 설정했는데 제대로 구성이 안 되어 있다. 리스너를 구성해야 한다는 것을 알게 되었다. ELB가 애플리케이션 로드 밸런싱을 지원하는 프로토콜은?

| 선지 | 번역 |
|------|------|
| A | HTTP, HTTPS |
| B | HTTP, HTTPS, TCP, SSL, SSH |
| C | HTTP, HTTPS, TCP, SSL |
| D | HTTP, HTTPS, TCP, SSL, SFTP |

**(A)** : HTTP와 HTTPS만 나열했으므로 TCP와 SSL이 누락되어 불완전하다.

**(B)** : ELB는 SSH 프로토콜을 지원하지 않는다.

**(C) 정답** : Classic ELB는 HTTP, HTTPS, TCP, SSL(Secure TCP) 네 가지 프로토콜을 지원한다. → [📖 Classic ELB는 HTTP, HTTPS, TCP, SSL(Secure TCP) 네 가지 프로토콜을 지원](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D)** : ELB는 SFTP를 지원하지 않는다.

**핵심 개념:** ELB 리스너 프로토콜

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [SSL/TLS 인증서](/section/06-high-availability-scalability#ssltls-인증서)

---

### Q415. A t2.medium EC2 instance type must be launched with what type of Amazon Machine Image (AMI)?

**Options:**
- A) An Instance store Hardware Virtual Machine AMI.
- B) An Instance store Paravirtual AMI.
- C) An Amazon EBS-backed Hardware Virtual Machine AMI.
- D) An Amazon EBS-backed Paravirtual AMI.

**Answer:** C

**해설:**

> **문제:** t2.medium EC2 인스턴스 유형은 어떤 종류의 AMI로 시작해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 인스턴스 스토어 HVM AMI |
| B | 인스턴스 스토어 반가상화(PV) AMI |
| C | EBS 기반 HVM AMI |
| D | EBS 기반 반가상화(PV) AMI |

**(A)** : T2 인스턴스는 인스턴스 스토어를 루트 볼륨으로 지원하지 않는다.

**(B)** : T2 인스턴스는 PV(반가상화) 가상화를 지원하지 않는다.

**(C) 정답** : T2 인스턴스는 EBS 기반 HVM(Hardware Virtual Machine) AMI만 지원한다. T2는 CPU 크레딧 기반의 버스터블 인스턴스 계열로, EBS 부팅과 HVM 가상화가 필수이다. → [📖 T2 인스턴스는 EBS 기반 HVM AMI만 지원](/section/03-ec2-basics#ec2-인스턴스-타입)

**(D)** : T2 인스턴스는 PV 가상화를 지원하지 않는다.

**핵심 개념:** EC2 인스턴스 유형 / HVM AMI / EBS 부팅

**관련 노트:** [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

---

### Q416. A user has created a subnet in VPC and launched an EC2 instance within it. The user has not selected the option to assign the IP address while launching the instance. The user has 3 elastic IPs and is trying to assign one of the Elastic IPs to the VPC instance from the console. The console does not show any instance in the IP assignment screen. What is a possible reason that the instance is unavailable in the assigned IP console?

**Options:**
- A) The IP address may be attached to one of the instances.
- B) The IP address belongs to a different zone than the subnet zone.
- C) The user has not created an internet gateway.
- D) The IP addresses belong to EC2 Classic; so they cannot be assigned to VPC.

**Answer:** D

**해설:**

> **문제:** 사용자가 VPC에 서브넷을 만들고 EC2 인스턴스를 시작했다. 퍼블릭 IP 자동 할당 없이 시작했으며, 보유한 EIP 3개 중 하나를 VPC 인스턴스에 할당하려 하는데 콘솔에 인스턴스가 표시되지 않는다. 가능한 이유는?

| 선지 | 번역 |
|------|------|
| A | IP 주소가 이미 다른 인스턴스에 연결되어 있다. |
| B | IP 주소가 서브넷과 다른 가용 영역에 속한다. |
| C | 인터넷 게이트웨이를 생성하지 않았다. |
| D | EIP가 EC2-Classic에 속해 있어 VPC에 할당할 수 없다. |

**(A)** : EIP가 다른 인스턴스에 연결되어 있어도 인스턴스 목록 자체가 보이지 않는 이유가 되지 않는다.

**(B)** : EIP는 리전 기반이므로 가용 영역과 무관하게 VPC 내 인스턴스에 할당할 수 있다.

**(C)** : 인터넷 게이트웨이 없이도 EIP 할당 화면에서 인스턴스가 표시되어야 한다.

**(D) 정답** : EC2-Classic에서 생성된 EIP는 VPC 인스턴스에 할당할 수 없다. EC2-Classic EIP와 VPC EIP는 별개의 범위를 가지며, 플랫폼 간에 재할당이 불가능하다. → [📖 EC2-Classic에서 생성된 EIP는 VPC 인스턴스에 할당할 수 없음](/section/04-ec2-associate#elastic-ip)

**핵심 개념:** EC2-Classic vs VPC / Elastic IP

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip), [VPC 기본 사항](/section/25-vpc#vpc-기본-사항)

---

### Q417. Will I be alerted when automatic fail over occurs?

**Options:**
- A) Only if SNS configured.
- B) Yes.
- C) No.
- D) Only if CloudWatch configured.

**Answer:** B

**해설:**

> **문제:** 자동 페일오버가 발생하면 알림을 받을 수 있는가?

| 선지 | 번역 |
|------|------|
| A | SNS가 구성된 경우에만 |
| B | 예 |
| C | 아니오 |
| D | CloudWatch가 구성된 경우에만 |

**(A)** : SNS 없이도 RDS 이벤트 알림이 기본적으로 제공된다.

**(B) 정답** : Amazon RDS Multi-AZ 환경에서 자동 페일오버가 발생하면 RDS 이벤트를 통해 알림이 전송된다. 이벤트 구독을 설정하면 SNS를 통해 자동으로 통보된다. → [📖 RDS Multi-AZ 자동 페일오버 발생 시 RDS 이벤트를 통해 알림 전송](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구)

**(C)** : 알림을 받을 수 있으므로 틀린 설명이다.

**(D)** : CloudWatch 설정 없이도 RDS 이벤트 알림을 받을 수 있다.

**핵심 개념:** RDS Multi-AZ 페일오버 / RDS 이벤트 알림

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [Amazon EventBridge CloudWatch Events 후속](/section/22-monitoring-audit-performance#amazon-eventbridge-cloudwatch-events-후속)

---

### Q418. Amazon EC2 provides a [...]. It is an HTTP or HTTPS request that uses the HTTP verbs GET or POST.

**Options:**
- A) web database.
- B) .NET framework.
- C) Query API.
- D) C library.

**Answer:** C

**해설:**

> **문제:** Amazon EC2는 [...]를 제공한다. 이것은 HTTP GET 또는 POST 동사를 사용하는 HTTP/HTTPS 요청이다.

| 선지 | 번역 |
|------|------|
| A | 웹 데이터베이스 |
| B | .NET 프레임워크 |
| C | Query API |
| D | C 라이브러리 |

**(A)** : EC2는 웹 데이터베이스를 제공하지 않는다.

**(B)** : .NET 프레임워크는 EC2가 제공하는 API가 아니다.

**(C) 정답** : EC2의 Query API는 HTTP/HTTPS GET 또는 POST 요청으로 동작하며, Action 파라미터를 통해 API 작업을 지정한다. → [📖 EC2의 Query API는 HTTP/HTTPS GET 또는 POST 요청으로 동작](/section/03-ec2-basics#ec2-구성-요소)

**(D)** : C 라이브러리는 EC2 API 형식에 해당하지 않는다.

**핵심 개념:** EC2 Query API

**관련 노트:** [AWS API Gateway](/section/17-serverless-overview#aws-api-gateway)

---

### Q419. Which of the following requires a custom CloudWatch metric to monitor?

**Options:**
- A) Memory Utilization of an EC2 instance.
- B) CPU Utilization of an EC2 instance.
- C) Disk usage activity of an EC2 instance.
- D) Data transfer of an EC2 instance.

**Answer:** A

**해설:**

> **문제:** 다음 중 사용자 지정 CloudWatch 지표가 필요한 것은?

| 선지 | 번역 |
|------|------|
| A | EC2 인스턴스의 메모리 사용률 |
| B | EC2 인스턴스의 CPU 사용률 |
| C | EC2 인스턴스의 디스크 사용 활동 |
| D | EC2 인스턴스의 데이터 전송량 |

**(A) 정답** : 메모리 사용률은 CloudWatch 기본 지표에 포함되지 않는다. CloudWatch 에이전트를 설치하거나 사용자 지정 지표를 게시해야 모니터링할 수 있다. → [📖 메모리 사용률은 CloudWatch 기본 지표에 포함되지 않음, 에이전트 설치 필요](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(B)** : CPU 사용률은 CloudWatch 기본 지표로 자동 수집된다. → [📖 CPU 사용률은 CloudWatch 기본 지표로 자동 수집](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(C)** : 디스크 I/O(읽기/쓰기 바이트, 작업 수)는 기본 CloudWatch 지표로 수집된다. 단, 디스크 사용률(남은 공간)은 사용자 지정 지표가 필요하다. → [📖 디스크 I/O는 기본 CloudWatch 지표로 수집됨](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**(D)** : 네트워크 데이터 전송(NetworkIn/Out)은 기본 CloudWatch 지표로 수집된다. → [📖 네트워크 데이터 전송(NetworkIn/Out)은 기본 CloudWatch 지표로 수집](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

**핵심 개념:** CloudWatch 기본 지표 vs 사용자 지정 지표 / EC2 메모리 모니터링

**관련 노트:** [Amazon CloudWatch Metrics](/section/22-monitoring-audit-performance#amazon-cloudwatch-metrics)

---

### Q420. An International company has deployed a multi-tier web application that relies on DynamoDB in a single region. For regulatory reasons they need disaster recovery capability in a separate region with a Recovery Time Objective of 2 hours and a Recovery Point Objective of 24 hours. They should synchronize their data on a regular basis and be able to provision the web application rapidly using CloudFormation. The objective is to minimize changes to the existing web application, control the throughput of DynamoDB used for the synchronization of data and synchronize only the modified elements. Which design would you choose to meet these requirements?

**Options:**
- A) Use AWS Data Pipeline to schedule a DynamoDB cross region copy once a day. Create a 'Last updated' attribute in your DynamoDB table that would represent the timestamp of the last update and use it as a filter.
- B) Use EMR and write a custom script to retrieve data from DynamoDB in the current region using a SCAN operation and push it to DynamoDB in the second region.
- C) Use AWS Data Pipeline to schedule an export of the DynamoDB table to S3 in the current region once a day, then schedule another task immediately after it that will import data from S3 to DynamoDB in the other region.
- D) Send also each item into an SQS queue in the second region; use an auto-scaling group behind the SQS queue to replay the write in the second region.

**Answer:** A

**해설:**

> **문제:** 글로벌 회사가 단일 리전에 DynamoDB를 사용하는 멀티티어 웹 애플리케이션을 배포했다. 규제 요건으로 RTO 2시간, RPO 24시간의 재해 복구가 필요하다. 데이터를 정기적으로 동기화하고, 기존 애플리케이션 변경을 최소화하면서, 동기화 처리량 제어와 변경된 항목만 동기화하려면?

| 선지 | 번역 |
|------|------|
| A | AWS Data Pipeline으로 하루 1회 DynamoDB 교차 리전 복사 스케줄링. 'Last updated' 속성으로 변경 항목 필터링. |
| B | EMR과 사용자 지정 스크립트로 SCAN하여 두 번째 리전에 복사. |
| C | Data Pipeline으로 S3 내보내기 후 다른 리전 DynamoDB로 가져오기. |
| D | SQS 큐에 모든 항목을 전송하고 Auto Scaling 그룹으로 두 번째 리전에 재기록. |

**(A) 정답** : Data Pipeline을 사용하면 스케줄링, 처리량 제어, 필터링(Last updated 속성)이 모두 가능하다. 애플리케이션 코드 변경 없이 변경된 항목만 동기화할 수 있어 요구사항을 모두 충족한다. → [📖 Data Pipeline을 사용하면 스케줄링, 처리량 제어, 필터링 모두 가능](/section/20-data-analytics#aws-glue)

**(B)** : SCAN은 전체 테이블을 읽으므로 비효율적이고, 변경 항목만 동기화하기 어렵다.

**(C)** : S3 경유 방식은 처리량 제어와 변경 항목 필터링이 어렵다.

**(D)** : 애플리케이션 코드 변경이 필요하므로 요구사항(기존 앱 변경 최소화)에 어긋난다.

**핵심 개념:** DynamoDB 교차 리전 복제 / AWS Data Pipeline / DR 설계

**관련 노트:** [S3 버킷 Bucket](/section/10-amazon-s3#s3-버킷-bucket), [Amazon SQS Simple Queue Service](/section/15-integration-messaging#amazon-sqs-simple-queue-service), [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb)

---

### Q421. An Elastic IP address (EIP) is a static IP address designed for dynamic cloud computing. With an EIP, you can mask the failure of an instance or software by rapidly remapping the address to another instance in your account. Your EIP is associated with your AWS account, not a particular EC2 instance, and it remains associated with your account until you choose to explicitly release it. By default how many EIPs is each AWS account limited to on a per region basis?

**Options:**
- A) 1.
- B) 5.
- C) Unlimited.
- D) 10.

**Answer:** B

**해설:**

> **문제:** Elastic IP(EIP)는 동적 클라우드 컴퓨팅을 위해 설계된 정적 IP이다. 기본적으로 각 AWS 계정은 리전당 몇 개의 EIP로 제한되는가?

| 선지 | 번역 |
|------|------|
| A | 1개 |
| B | 5개 |
| C | 무제한 |
| D | 10개 |

**(A)** : 1개는 너무 적은 한도이다.

**(B) 정답** : AWS 계정당 리전별 기본 EIP 한도는 5개이다. 더 많이 필요하면 AWS Support에 한도 증가를 요청할 수 있다. → [📖 AWS 계정당 리전별 기본 EIP 한도는 5개](/section/04-ec2-associate#elastic-ip)

**(C)** : EIP는 무제한이 아니며 기본 한도가 있다.

**(D)** : 기본 한도는 10개가 아니라 5개이다.

**핵심 개념:** Elastic IP / 계정 한도

**관련 노트:** [Elastic IP](/section/04-ec2-associate#elastic-ip)

---

### Q422. Which Amazon Storage behaves like raw, unformatted, external block devices that you can attach to your instances?

**Options:**
- A) None of these.
- B) Amazon Instance Storage.
- C) Amazon EBS.
- D) All of these.

**Answer:** C

**해설:**

> **문제:** 인스턴스에 연결할 수 있는 원시(raw), 포맷되지 않은 외부 블록 디바이스처럼 동작하는 Amazon 스토리지는?

| 선지 | 번역 |
|------|------|
| A | 해당 없음 |
| B | Amazon 인스턴스 스토리지 |
| C | Amazon EBS |
| D | 모두 해당 |

**(A)** : EBS가 해당되므로 틀리다.

**(B)** : 인스턴스 스토리지(임시 스토리지)는 인스턴스에 물리적으로 연결된 디스크로 외부 블록 디바이스 형태가 아니다. → [📖 인스턴스 스토리지는 인스턴스에 물리적으로 연결된 디스크로 외부 블록 디바이스 형태가 아님](/section/05-ec2-instance-storage#ec2-instance-store)

**(C) 정답** : Amazon EBS(Elastic Block Store)는 EC2 인스턴스에 연결하는 네트워크 기반 블록 스토리지로, 포맷되지 않은 외부 블록 디바이스처럼 동작한다. → [📖 Amazon EBS는 EC2 인스턴스에 연결하는 네트워크 기반 블록 스토리지](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(D)** : 인스턴스 스토리지는 EBS와 다른 특성을 가지므로 '모두'는 틀리다.

**핵심 개념:** Amazon EBS / 블록 스토리지

**관련 노트:** [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q423. You currently operate a web application in the AWS US-East region. The application runs on an autoscaled layer of EC2 instances and an RDS Multi-AZ database. Your IT security compliance officer has tasked you to develop a reliable and durable logging solution to track changes made to your EC2, IAM, and RDS resources. The solution must ensure the integrity and confidentiality of your log data. Which of these solutions would you recommend?

**Options:**
- A) Create a new CloudTrail trail with one new S3 bucket to store the logs and with the global services option selected. Use IAM roles, S3 bucket policies, and Multi Factor Authentication (MFA) Delete on the S3 bucket that stores your logs.
- B) Create a new CloudTrail with one new S3 bucket to store the logs. Configure SNS to send log file delivery notifications to your management system. Use IAM roles and S3 bucket policies on the S3 bucket that stores your logs.
- C) Create a new CloudTrail trail with an existing S3 bucket to store the logs and with the global services option selected. Use S3 ACLs and Multi Factor Authentication (MFA) Delete on the S3 bucket that stores your logs.
- D) Create three new CloudTrail trails with three new S3 buckets to store the logs: one for the AWS Management console, one for AWS SDKs, and one for command line tools. Use IAM roles and S3 bucket policies on the S3 buckets that store your logs.

**Answer:** A

**해설:**

> **문제:** 미국 동부 리전에서 EC2 Auto Scaling과 RDS Multi-AZ를 사용하는 웹 애플리케이션을 운영 중이다. EC2, IAM, RDS 리소스 변경을 추적하는 신뢰할 수 있고 내구성 있는 로깅 솔루션이 필요하다. 로그 데이터의 무결성과 기밀성을 보장해야 한다면?

| 선지 | 번역 |
|------|------|
| A | 새 S3 버킷으로 CloudTrail 생성, 글로벌 서비스 옵션 선택. IAM 역할, S3 버킷 정책, MFA Delete 적용. |
| B | 새 S3 버킷으로 CloudTrail 생성. SNS로 로그 전달 알림 설정. IAM 역할과 S3 버킷 정책 적용. |
| C | 기존 S3 버킷으로 CloudTrail 생성, 글로벌 서비스 옵션 선택. S3 ACL과 MFA Delete 적용. |
| D | 3개의 CloudTrail과 S3 버킷 생성(콘솔, SDK, CLI 각각). IAM 역할과 S3 버킷 정책 적용. |

**(A) 정답** : 새 전용 S3 버킷 사용, 글로벌 서비스(IAM 등) 포함, IAM 역할과 버킷 정책으로 접근 제어, MFA Delete로 로그 삭제 방지를 모두 구현하여 무결성과 기밀성 요건을 충족한다. → [📖 새 전용 S3 버킷, IAM 역할과 버킷 정책으로 접근 제어, MFA Delete로 로그 삭제 방지](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(B)** : SNS 알림은 유용하지만 MFA Delete가 없어 로그 무결성 보장이 약하다. → [📖 MFA Delete가 없어 로그 무결성 보장이 약함](/section/12-s3-security#mfa-delete)

**(C)** : 기존 S3 버킷은 다른 데이터와 혼용 위험이 있고, S3 ACL보다 버킷 정책이 더 강력한 접근 제어를 제공한다.

**(D)** : CloudTrail 하나로 모든 소스를 추적할 수 있으므로 3개로 나눌 필요가 없다.

**핵심 개념:** CloudTrail / S3 MFA Delete / 로그 무결성

**관련 노트:** [AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail), [MFA Delete](/section/12-s3-security#mfa-delete)

---

### Q424. Does DynamoDB support in-place atomic updates?

**Options:**
- A) Yes.
- B) No.
- C) It does support in-place non-atomic updates.
- D) It is not defined.

**Answer:** A

**해설:**

> **문제:** DynamoDB는 인플레이스(in-place) 원자적(atomic) 업데이트를 지원하는가?

| 선지 | 번역 |
|------|------|
| A | 예 |
| B | 아니오 |
| C | 인플레이스 비원자적 업데이트는 지원한다. |
| D | 정의되지 않았다. |

**(A) 정답** : DynamoDB는 원자적 카운터(atomic counter)와 조건부 쓰기를 통해 인플레이스 원자적 업데이트를 지원한다. 예를 들어 숫자 속성을 원자적으로 증감할 수 있다. → [📖 DynamoDB는 원자적 카운터(atomic counter)와 조건부 쓰기를 통해 인플레이스 원자적 업데이트 지원](/section/17-serverless-overview#amazon-dynamodb)

**(B)** : DynamoDB는 원자적 업데이트를 지원한다.

**(C)** : 비원자적 업데이트만 지원한다는 설명은 틀리다.

**(D)** : DynamoDB의 원자적 업데이트 지원 여부는 명확히 정의되어 있다.

**핵심 개념:** DynamoDB 원자적 업데이트 / 조건부 쓰기

**관련 노트:** [Amazon DynamoDB](/section/17-serverless-overview#amazon-dynamodb), [Amazon DynamoDB](/section/19-databases#amazon-dynamodb)

---

### Q425. Which of the following is true of Amazon EC2 security group?

**Options:**
- A) You can modify the outbound rules for EC2-Classic.
- B) You can modify the rules for a security group only if the security group controls the traffic for just one instance.
- C) You can modify the rules for a security group only when a new instance is created.
- D) You can modify the rules for a security group at any time.

**Answer:** D

**해설:**

> **문제:** Amazon EC2 보안 그룹에 대해 옳은 것은?

| 선지 | 번역 |
|------|------|
| A | EC2-Classic에서 아웃바운드 규칙을 수정할 수 있다. |
| B | 보안 그룹이 단 하나의 인스턴스 트래픽만 제어할 때만 규칙을 수정할 수 있다. |
| C | 새 인스턴스를 생성할 때만 보안 그룹 규칙을 수정할 수 있다. |
| D | 언제든지 보안 그룹 규칙을 수정할 수 있다. |

**(A)** : EC2-Classic 보안 그룹은 아웃바운드 규칙이 없다. 아웃바운드는 VPC 보안 그룹에서만 수정 가능하다. → [📖 EC2-Classic 보안 그룹은 아웃바운드 규칙이 없음](/section/03-ec2-basics#security-groups-보안-그룹)

**(B)** : 보안 그룹은 여러 인스턴스에 적용되어 있어도 규칙을 수정할 수 있다.

**(C)** : 인스턴스 생성 시 외에도 언제든지 보안 그룹 규칙을 수정할 수 있다.

**(D) 정답** : EC2 보안 그룹의 규칙은 인스턴스 실행 중에도 언제든지 추가, 수정, 삭제할 수 있으며, 변경 사항은 즉시 적용된다. → [📖 EC2 보안 그룹의 규칙은 인스턴스 실행 중에도 언제든지 추가/수정/삭제 가능하며 즉시 적용](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** EC2 보안 그룹 / 동적 규칙 수정

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q426. You need to set up security for your VPC and you know that Amazon VPC provides two features that you can use to increase security for your VPC: security groups and network access control lists (ACLs). You have already looked into security groups and you are now trying to understand ACLs. Which statement below is incorrect in relation to ACLs?

**Options:**
- A) Supports allow rules and deny rules.
- B) Is stateful: Return traffic is automatically allowed, regardless of any rules.
- C) Processes rules in number order when deciding whether to allow traffic.
- D) Operates at the subnet level (second layer of defense).

**Answer:** B

**해설:**

> **문제:** VPC 보안을 설정하려 한다. 보안 그룹과 네트워크 ACL 두 가지 기능이 있다. 다음 중 ACL에 관한 설명으로 틀린 것은?

| 선지 | 번역 |
|------|------|
| A | 허용 규칙과 거부 규칙을 모두 지원한다. |
| B | 상태 저장(stateful)이다: 반환 트래픽은 규칙에 관계없이 자동으로 허용된다. |
| C | 트래픽 허용 여부를 결정할 때 번호 순서대로 규칙을 처리한다. |
| D | 서브넷 수준에서 동작한다(두 번째 방어 계층). |

**(A)** : 올바른 설명이다. 네트워크 ACL은 허용(ALLOW)과 거부(DENY) 규칙을 모두 지원한다. → [📖 네트워크 ACL은 허용(ALLOW)과 거부(DENY) 규칙을 모두 지원](/section/25-vpc#nacl-network-access-control-list)

**(B) 정답** : 이 설명은 틀렸다. 네트워크 ACL은 **무상태(stateless)**이다. 반환 트래픽도 별도의 아웃바운드 규칙으로 허용해야 한다. 상태 저장(stateful)은 보안 그룹의 특성이다. → [📖 네트워크 ACL은 무상태(stateless)이다. 반환 트래픽도 별도 아웃바운드 규칙으로 허용 필요](/section/25-vpc#security-group-vs-nacl)

**(C)** : 올바른 설명이다. ACL은 가장 낮은 번호부터 순서대로 규칙을 평가한다. → [📖 ACL은 가장 낮은 번호부터 순서대로 규칙을 평가](/section/25-vpc#nacl-network-access-control-list)

**(D)** : 올바른 설명이다. 네트워크 ACL은 서브넷 레벨에서 동작하는 두 번째 방어 계층이다. → [📖 네트워크 ACL은 서브넷 레벨에서 동작하는 두 번째 방어 계층](/section/25-vpc#nacl-network-access-control-list)

**핵심 개념:** 네트워크 ACL vs 보안 그룹 / Stateless vs Stateful

**관련 노트:** [Security Group vs NACL](/section/25-vpc#security-group-vs-nacl), [NACL Network Access Control List](/section/25-vpc#nacl-network-access-control-list)

---

### Q427. A user is trying to launch a similar EC2 instance from an existing instance with the option 'Launch More like this'. The AMI of the selected instance is deleted. What will happen in this case?

**Options:**
- A) AWS does not need an AMI for the 'Launch more like this' option.
- B) AWS will launch the instance but will not create a new AMI.
- C) AWS will create a new AMI and launch the instance.
- D) AWS will throw an error saying that the AMI is deregistered.

**Answer:** D

**해설:**

> **문제:** 사용자가 기존 인스턴스에서 '이것과 유사하게 시작(Launch More like this)' 옵션으로 EC2 인스턴스를 시작하려 한다. 그런데 선택한 인스턴스의 AMI가 삭제된 상태이다. 어떤 일이 발생하는가?

| 선지 | 번역 |
|------|------|
| A | AWS는 이 옵션에 AMI가 필요하지 않다. |
| B | AWS는 새 AMI를 생성하지 않고 인스턴스를 시작한다. |
| C | AWS가 새 AMI를 생성하고 인스턴스를 시작한다. |
| D | AWS가 AMI가 등록 해제되었다는 오류를 발생시킨다. |

**(A)** : 'Launch More like this' 옵션은 원본 AMI를 기반으로 하므로 AMI가 반드시 필요하다.

**(B)** : AMI 없이 인스턴스를 시작할 수 없다.

**(C)** : AWS는 자동으로 새 AMI를 생성하지 않는다.

**(D) 정답** : AMI가 삭제(deregister)된 경우 'Launch More like this' 옵션을 사용하면 AWS에서 AMI가 등록 해제되었다는 오류가 발생한다. → [📖 AMI가 삭제된 경우 'Launch More like this' 사용하면 AMI 등록 해제 오류 발생](/section/05-ec2-instance-storage#ami-amazon-machine-image)

**핵심 개념:** AMI / EC2 인스턴스 시작

**관련 노트:** [AMI Amazon Machine Image](/section/05-ec2-instance-storage#ami-amazon-machine-image)

---

### Q428. True or False: When you use the AWS Management Console to delete an IAM user, IAM also deletes any signing certificates and any access keys belonging to the user.

**Options:**
- A) False.
- B) This is configurable.
- C) True.

**Answer:** C

**해설:**

> **문제:** AWS 관리 콘솔을 사용하여 IAM 사용자를 삭제하면, IAM이 해당 사용자의 서명 인증서와 액세스 키도 함께 삭제한다. 참인가, 거짓인가?

| 선지 | 번역 |
|------|------|
| A | 거짓 |
| B | 구성에 따라 다르다 |
| C | 참 |

**(A)** : IAM 사용자 삭제 시 관련 자격증명도 함께 삭제되므로 거짓이 아니다.

**(B)** : 이 동작은 구성 가능한 것이 아니라 항상 자동으로 수행된다.

**(C) 정답** : AWS 관리 콘솔에서 IAM 사용자를 삭제하면, 해당 사용자의 액세스 키, 서명 인증서, MFA 디바이스, 패스워드 등 모든 자격증명이 함께 삭제된다. → [📖 IAM 사용자 삭제 시 액세스 키, 서명 인증서, MFA, 패스워드 등 모든 자격증명이 함께 삭제](/section/02-iam#users-groups)

**핵심 개념:** IAM 사용자 삭제 / 자격증명 관리

**관련 노트:** [Users & Groups](/section/02-iam#users-groups), [AWS 접근 방법](/section/02-iam#aws-접근-방법)

---

### Q429. You are working with a customer who is using Chef configuration management in their data center. Which service is designed to let the customer leverage existing Chef recipes in AWS?

**Options:**
- A) Amazon Simple Workflow Service.
- B) AWS Elastic Beanstalk.
- C) AWS CloudFormation.
- D) AWS OpsWorks.

**Answer:** D

**해설:**

> **문제:** 데이터센터에서 Chef 구성 관리를 사용하는 고객과 작업 중이다. 기존 Chef 레시피를 AWS에서 활용하도록 설계된 서비스는?

| 선지 | 번역 |
|------|------|
| A | Amazon Simple Workflow Service |
| B | AWS Elastic Beanstalk |
| C | AWS CloudFormation |
| D | AWS OpsWorks |

**(A)** : SWF는 워크플로우 조율 서비스로 Chef와 직접 관련이 없다. → [📖 SWF는 워크플로우 조율 서비스로 Chef와 직접 관련이 없음](/section/17-serverless-overview#aws-step-functions)

**(B)** : Elastic Beanstalk은 애플리케이션 배포 PaaS로 Chef 레시피를 직접 활용하지 않는다. → [📖 Elastic Beanstalk은 애플리케이션 배포 PaaS로 Chef 레시피를 직접 활용하지 않음](/section/09-classic-solutions-architecture#elastic-beanstalk)

**(C)** : CloudFormation은 인프라 프로비저닝 도구이나 Chef 레시피를 직접 실행하지 않는다. → [📖 CloudFormation은 인프라 프로비저닝 도구이나 Chef 레시피를 직접 실행하지 않음](/section/28-other-services#aws-cloudformation)

**(D) 정답** : AWS OpsWorks는 Chef 및 Puppet 자동화 플랫폼으로, 기존 Chef 레시피를 그대로 활용하여 EC2 인스턴스 구성을 자동화할 수 있다. → [📖 AWS OpsWorks는 Chef 및 Puppet 자동화 플랫폼으로 기존 Chef 레시피를 활용하여 EC2 구성 자동화](/section/28-other-services#aws-systems-manager-ssm)

**핵심 개념:** AWS OpsWorks / Chef 구성 관리

**관련 노트:** [AWS Systems Manager SSM](/section/28-other-services#aws-systems-manager-ssm)

---

### Q430. Does Amazon RDS for SQL Server currently support importing data into the msdb database?

**Options:**
- A) Yes.
- B) No.

**Answer:** B

**해설:**

> **문제:** Amazon RDS for SQL Server는 msdb 데이터베이스로의 데이터 가져오기를 지원하는가?

| 선지 | 번역 |
|------|------|
| A | 예 |
| B | 아니오 |

**(A)** : RDS는 msdb 데이터베이스에 대한 직접적인 가져오기를 지원하지 않는다.

**(B) 정답** : Amazon RDS for SQL Server는 관리형 서비스이므로 msdb, master, model 등 시스템 데이터베이스에 대한 직접 접근이 제한된다. msdb로의 데이터 가져오기는 지원되지 않는다. → [📖 Amazon RDS for SQL Server는 msdb 등 시스템 데이터베이스에 대한 직접 접근이 제한됨](/section/07-rds-aurora-elasticache#rds-custom)

**핵심 개념:** RDS for SQL Server / 관리형 데이터베이스 제한 사항

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service), [RDS Custom](/section/07-rds-aurora-elasticache#rds-custom)

---

### Q431. How can an EBS volume that is currently attached to an EC2 instance be migrated from one Availability Zone to another?

**Options:**
- A) Detach the volume and attach it to another EC2 instance in the other AZ.
- B) Simply create a new volume in the other AZ and specify the original volume as the source.
- C) Create a snapshot of the volume, and create a new volume from the snapshot in the other AZ.
- D) Detach the volume, then use the ec2-migrate-volume command to move it to another AZ.

**Answer:** C

**해설:**

> **문제:** EC2 인스턴스에 연결된 EBS 볼륨을 다른 가용 영역(AZ)으로 마이그레이션하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 볼륨을 분리하고 다른 AZ의 EC2 인스턴스에 연결한다. |
| B | 다른 AZ에 새 볼륨을 생성하고 원본 볼륨을 소스로 지정한다. |
| C | 볼륨의 스냅샷을 생성하고, 다른 AZ에서 스냅샷으로 새 볼륨을 생성한다. |
| D | 볼륨을 분리한 후 ec2-migrate-volume 명령으로 이동한다. |

**(A)** : EBS 볼륨은 특정 AZ에 묶여 있어 다른 AZ의 인스턴스에 직접 연결할 수 없다. → [📖 EBS 볼륨은 특정 AZ에 묶여 있어 다른 AZ의 인스턴스에 직접 연결할 수 없음](/section/05-ec2-instance-storage#ebs-elastic-block-store)

**(B)** : EBS는 다른 볼륨을 소스로 지정하여 새 볼륨을 생성하는 기능을 지원하지 않는다.

**(C) 정답** : EBS 볼륨의 AZ 간 마이그레이션은 스냅샷을 통해서만 가능하다. 스냅샷은 리전 내 어느 AZ에서도 새 볼륨으로 복원할 수 있다. → [📖 EBS 볼륨의 AZ 간 마이그레이션은 스냅샷을 통해서만 가능](/section/05-ec2-instance-storage#ebs-snapshots)

**(D)** : `ec2-migrate-volume`은 존재하지 않는 명령어이다.

**핵심 개념:** EBS 스냅샷 / 가용 영역 간 마이그레이션

**관련 노트:** [EBS Snapshots](/section/05-ec2-instance-storage#ebs-snapshots), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store)

---

### Q432. Having set up a website to automatically be redirected to a backup website if it fails, you realize that there are different types of failovers that are possible. You need all your resources to be available the majority of the time. Using Amazon Route 53 which configuration would best suit this requirement?

**Options:**
- A) Active-active failover.
- B) None. Route 53 can't failover.
- C) Active-passive failover.
- D) Active-active-passive and other mixed configurations.

**Answer:** A

**해설:**

> **문제:** 기본 웹사이트 장애 시 백업 웹사이트로 자동 전환되도록 설정했다. 대부분의 시간 동안 모든 리소스를 사용 가능하게 하려면 Route 53에서 어떤 페일오버 구성이 적합한가?

| 선지 | 번역 |
|------|------|
| A | 액티브-액티브 페일오버 |
| B | 해당 없음. Route 53은 페일오버를 지원하지 않는다. |
| C | 액티브-패시브 페일오버 |
| D | 액티브-액티브-패시브 혼합 구성 |

**(A) 정답** : 모든 리소스를 대부분의 시간 동안 활성 상태로 유지하려면 액티브-액티브 페일오버가 적합하다. 모든 엔드포인트가 정상 시 동시에 트래픽을 처리하고, 하나가 장애 나면 나머지로 트래픽이 전환된다. → [📖 모든 리소스를 대부분의 시간 동안 활성 상태로 유지하려면 액티브-액티브 페일오버가 적합](/section/08-route-53#라우팅-정책-routing-policies)

**(B)** : Route 53은 상태 확인과 DNS 페일오버를 지원한다. → [📖 Route 53은 상태 확인과 DNS 페일오버를 지원](/section/08-route-53#health-checks-헬스-체크)

**(C)** : 액티브-패시브는 대기 리소스를 항상 유휴 상태로 두므로 "모든 리소스를 대부분 사용 가능하게"하는 요건에 맞지 않는다. → [📖 액티브-패시브는 대기 리소스를 항상 유휴 상태로 두어 모든 리소스 활용 요건에 맞지 않음](/section/08-route-53#라우팅-정책-routing-policies)

**(D)** : 혼합 구성도 가능하지만 이 요건에는 단순한 액티브-액티브가 가장 적합하다.

**핵심 개념:** Route 53 페일오버 라우팅 / Active-Active vs Active-Passive

**관련 노트:** [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies), [Health Checks 헬스 체크](/section/08-route-53#health-checks-헬스-체크)

---

### Q433. A client application requires operating system privileges on a relational database server. What is an appropriate configuration for a highly available database architecture?

**Options:**
- A) A standalone Amazon EC2 instance.
- B) Amazon RDS in a Multi-AZ configuration.
- C) Amazon EC2 instances in a replication configuration utilizing a single Availability Zone.
- D) Amazon EC2 instances in a replication configuration utilizing two different Availability Zones.

**Answer:** D

**해설:**

> **문제:** 클라이언트 애플리케이션이 관계형 데이터베이스 서버의 OS 수준 권한이 필요하다. 고가용성 데이터베이스 아키텍처를 위한 적절한 구성은?

| 선지 | 번역 |
|------|------|
| A | 단독 Amazon EC2 인스턴스 |
| B | Multi-AZ 구성의 Amazon RDS |
| C | 단일 AZ를 활용한 복제 구성의 EC2 인스턴스 |
| D | 두 개의 다른 AZ를 활용한 복제 구성의 EC2 인스턴스 |

**(A)** : 단독 EC2 인스턴스는 고가용성이 없다.

**(B)** : RDS는 OS 수준 접근을 허용하지 않으므로 이 요건에 맞지 않는다. → [📖 RDS는 OS 수준 접근을 허용하지 않으므로 이 요건에 맞지 않음](/section/07-rds-aurora-elasticache#rds-custom)

**(C)** : 단일 AZ에서의 복제는 AZ 장애 시 전체 서비스가 중단될 수 있어 고가용성이 부족하다.

**(D) 정답** : OS 수준 권한이 필요하므로 EC2에 직접 DB를 설치해야 하고, 두 AZ에 걸친 복제 구성으로 고가용성을 확보할 수 있다. → [📖 OS 수준 권한이 필요하므로 EC2에 직접 DB를 설치하고 두 AZ에 걸친 복제 구성으로 고가용성 확보](/section/04-ec2-associate#placement-groups-배치-그룹)

**핵심 개념:** EC2 vs RDS / 고가용성 / Multi-AZ

**관련 노트:** [RDS Multi-AZ 재해 복구](/section/07-rds-aurora-elasticache#rds-multiaz-재해-복구), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg)

---

### Q434. Is decreasing the storage size of a DB Instance permitted?

**Options:**
- A) Depends on the RDBMS used.
- B) Yes.
- C) No.

**Answer:** B

**해설:**

> **문제:** DB 인스턴스의 스토리지 크기를 줄이는 것이 허용되는가?

| 선지 | 번역 |
|------|------|
| A | 사용되는 RDBMS에 따라 다르다. |
| B | 예 |
| C | 아니오 |

**(A)** : RDBMS 종류에 상관없이 RDS 정책은 동일하게 적용된다.

**(B) 정답** : 이 문제의 정답은 B(Yes)로 표기되어 있으나, 실제 AWS RDS 정책상 한 번 할당한 스토리지는 줄일 수 없다. 시험 문맥에서는 원본 데이터의 정답을 그대로 따른다. → [📖 한 번 할당한 RDS 스토리지는 줄일 수 없음(실제 AWS 정책)](/section/07-rds-aurora-elasticache#rds-storage-auto-scaling)

**(C)** : 원본 데이터 기준 오답으로 표기.

**핵심 개념:** RDS 스토리지 관리

**관련 노트:** [RDS Storage Auto Scaling](/section/07-rds-aurora-elasticache#rds-storage-auto-scaling), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q435. Can you encrypt EBS volumes?

**Options:**
- A) Yes, you can enable encryption when you create a new EBS volume using the AWS Management Console, API, or CLI.
- B) No, you should use a third-party software to perform raw block-level encryption of an EBS volume.
- C) Yes, but you must use a third-party API for encrypting data before it's loaded on EBS.
- D) Yes, you can encrypt with the special 'ebs_encrypt' command through Amazon APIs.

**Answer:** A

**해설:**

> **문제:** EBS 볼륨을 암호화할 수 있는가?

| 선지 | 번역 |
|------|------|
| A | 예. AWS 관리 콘솔, API, CLI를 통해 새 EBS 볼륨 생성 시 암호화를 활성화할 수 있다. |
| B | 아니오. EBS 볼륨의 블록 수준 암호화는 서드파티 소프트웨어를 사용해야 한다. |
| C | 예. 하지만 EBS에 데이터를 올리기 전에 서드파티 API로 암호화해야 한다. |
| D | 예. Amazon API의 특별한 'ebs_encrypt' 명령어로 암호화할 수 있다. |

**(A) 정답** : AWS는 EBS 네이티브 암호화를 지원한다. 볼륨 생성 시 KMS 키를 사용하여 콘솔, API, CLI 어디서든 암호화를 설정할 수 있다. → [📖 AWS는 EBS 네이티브 암호화를 지원, 볼륨 생성 시 KMS 키를 사용하여 암호화 설정 가능](/section/05-ec2-instance-storage#ebs-encryption)

**(B)** : EBS 자체 암호화 기능이 있으므로 서드파티 소프트웨어가 필요하지 않다.

**(C)** : 서드파티 API 없이 AWS 네이티브 암호화를 사용할 수 있다.

**(D)** : `ebs_encrypt`라는 명령어는 존재하지 않는다.

**핵심 개념:** EBS 암호화 / KMS

**관련 노트:** [EBS Encryption](/section/05-ec2-instance-storage#ebs-encryption), [EBS Elastic Block Store](/section/05-ec2-instance-storage#ebs-elastic-block-store), [AWS KMS Key Management Service](/section/24-security-encryption#aws-kms-key-management-service)

---

### Q436. You must assign each server to at least [...] security group.

**Options:**
- A) 3.
- B) 2.
- C) 4.
- D) 1.

**Answer:** D

**해설:**

> **문제:** 각 서버는 최소 몇 개의 보안 그룹에 할당되어야 하는가?

| 선지 | 번역 |
|------|------|
| A | 3개 |
| B | 2개 |
| C | 4개 |
| D | 1개 |

**(A)** : 최소 요건은 3개가 아니다.

**(B)** : 최소 요건은 2개가 아니다.

**(C)** : 최소 요건은 4개가 아니다.

**(D) 정답** : EC2 인스턴스는 최소 1개의 보안 그룹에 반드시 속해야 한다. 보안 그룹을 지정하지 않으면 기본 보안 그룹(default security group)이 자동으로 할당된다. → [📖 EC2 인스턴스는 최소 1개의 보안 그룹에 반드시 속해야 함, 지정하지 않으면 기본 보안 그룹 자동 할당](/section/03-ec2-basics#security-groups-보안-그룹)

**핵심 개념:** EC2 보안 그룹 / 기본 보안 그룹

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹)

---

### Q437. Is the encryption of connections between my application and my DB Instance using SSL for the MySQL server engines available?

**Options:**
- A) Yes.
- B) Only in VPC.
- C) Only in certain regions.
- D) No.

**Answer:** A

**해설:**

> **문제:** MySQL 서버 엔진에서 애플리케이션과 DB 인스턴스 간 연결을 SSL로 암호화하는 것이 가능한가?

| 선지 | 번역 |
|------|------|
| A | 예 |
| B | VPC에서만 가능 |
| C | 특정 리전에서만 가능 |
| D | 아니오 |

**(A) 정답** : Amazon RDS for MySQL은 SSL/TLS를 사용한 연결 암호화를 지원한다. 모든 리전에서 VPC 여부와 관계없이 사용 가능하다. → [📖 Amazon RDS for MySQL은 SSL/TLS를 사용한 연결 암호화를 지원](/section/07-rds-aurora-elasticache#rds-aurora-보안)

**(B)** : SSL 암호화는 VPC 외부에서도 사용 가능하다.

**(C)** : 특정 리전 제한 없이 모든 리전에서 지원된다.

**(D)** : SSL 암호화는 지원된다.

**핵심 개념:** RDS SSL/TLS 연결 암호화

**관련 노트:** [RDS & Aurora 보안](/section/07-rds-aurora-elasticache#rds-aurora-보안), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q438. Your manager has come to you saying that he is very confused about the bills he is receiving from AWS as he is getting different bills for every user and needs you to look into making it more understandable. Which of the following would be the best solution to meet his request?

**Options:**
- A) AWS Billing Aggregation.
- B) Consolidated Billing.
- C) Deferred Billing.
- D) Aggregated Billing.

**Answer:** B

**해설:**

> **문제:** 관리자가 AWS 청구서가 사용자마다 별도로 발행되어 혼란스럽다고 한다. 이를 해결하기 위한 가장 좋은 방법은?

| 선지 | 번역 |
|------|------|
| A | AWS 청구 집계 |
| B | 통합 청구(Consolidated Billing) |
| C | 지연 청구 |
| D | 집계 청구 |

**(A)** : 'AWS Billing Aggregation'은 공식 AWS 서비스 명칭이 아니다.

**(B) 정답** : AWS Organizations의 통합 청구(Consolidated Billing)를 사용하면 여러 AWS 계정의 청구를 하나의 마스터 계정으로 통합할 수 있다. 비용을 한눈에 확인하고 볼륨 할인 혜택도 받을 수 있다. → [📖 AWS Organizations의 통합 청구를 사용하면 여러 AWS 계정의 청구를 하나의 마스터 계정으로 통합](/section/23-advanced-identity#aws-organizations)

**(C)** : 'Deferred Billing'은 AWS의 청구 단순화 기능이 아니다.

**(D)** : 'Aggregated Billing'은 공식 AWS 서비스 명칭이 아니다.

**핵심 개념:** AWS Organizations / 통합 청구(Consolidated Billing)

**관련 노트:** [AWS Organizations](/section/23-advanced-identity#aws-organizations)

---

### Q439. Regarding Amazon Route 53, if your application is running on Amazon EC2 instances in two or more Amazon EC2 regions and if you have more than one Amazon EC2 instance in one or more regions, you can use [...] to route traffic to the correct region and then use [...] route traffic to instances within the region, based on probabilities that you specify.

**Options:**
- A) weighted-based routing; alias resource record sets.
- B) latency-based routing; weighted resource record sets.
- C) weighted-based routing; weighted resource record sets.
- D) latency-based routing; alias resource record sets.

**Answer:** B

**해설:**

> **문제:** 애플리케이션이 둘 이상의 EC2 리전에서 실행되고 있다. 올바른 리전으로 트래픽을 라우팅하고, 리전 내 인스턴스들에는 지정한 확률 기반으로 트래픽을 분배하려면 각각 어떤 라우팅을 사용해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 가중치 기반 라우팅; 별칭 레코드 세트 |
| B | 지연 시간 기반 라우팅; 가중치 레코드 세트 |
| C | 가중치 기반 라우팅; 가중치 레코드 세트 |
| D | 지연 시간 기반 라우팅; 별칭 레코드 세트 |

**(A)** : 리전 간 라우팅에 가중치 기반을 사용하는 것은 최적 리전 선택에 적합하지 않다.

**(B) 정답** : 리전 간에는 지연 시간 기반 라우팅(Latency-Based Routing)으로 가장 빠른 리전을 선택하고, 리전 내 인스턴스 간에는 가중치 레코드 세트(Weighted Resource Record Sets)로 확률 기반 트래픽 분배를 구성한다. → [📖 리전 간 지연 시간 기반 라우팅과 리전 내 가중치 레코드 세트로 확률 기반 트래픽 분배 구성](/section/08-route-53#라우팅-정책-routing-policies)

**(C)** : 리전 간 라우팅에 지연 시간 기반이 더 적합하다.

**(D)** : 별칭 레코드는 특정 AWS 리소스를 가리키는 데 사용되며 확률 기반 분배에는 적합하지 않다.

**핵심 개념:** Route 53 지연 시간 기반 라우팅 / 가중치 라우팅

**관련 노트:** [라우팅 정책 Routing Policies](/section/08-route-53#라우팅-정책-routing-policies)

---

### Q440. If I scale the storage capacity provisioned to my DB Instance by mid of a billing month, how will I be charged?

**Options:**
- A) You will be charged for the highest storage capacity you have used.
- B) On a proration basis.

**Answer:** B

**해설:**

> **문제:** 청구 월 중간에 DB 인스턴스의 프로비저닝된 스토리지 용량을 확장하면 어떻게 청구되는가?

| 선지 | 번역 |
|------|------|
| A | 사용한 최대 스토리지 용량으로 청구된다. |
| B | 비례 배분(proration) 방식으로 청구된다. |

**(A)** : 월 전체에 대해 최고 용량으로 청구되지 않는다.

**(B) 정답** : AWS RDS 스토리지는 사용한 기간에 비례하여 청구된다(일할 계산). 예를 들어 월 중간에 스토리지를 늘리면 증가 전 용량은 이전 기간에 대해, 증가 후 용량은 이후 기간에 대해 각각 청구된다. → [📖 AWS RDS 스토리지는 사용한 기간에 비례하여 청구(일할 계산)](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

**핵심 개념:** RDS 청구 / 비례 배분(Proration)

**관련 노트:** [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q441. When using the following AWS services, which should be implemented in multiple Availability Zones for high availability solutions? (Choose 2 answers)

**Options:**
- A) Amazon DynamoDB.
- B) Amazon Elastic Compute Cloud (EC2).
- C) Amazon Elastic Load Balancing.
- D) Amazon Simple Notification Service (SNS).
- E) Amazon Simple Storage Service (S3).

**Answer:** B, C

**해설:**

> **문제:** 다음 AWS 서비스 중 고가용성 솔루션을 위해 여러 가용 영역에 구현해야 하는 것은? (2개 선택)

| 선지 | 번역 |
|------|------|
| A | Amazon DynamoDB |
| B | Amazon EC2 |
| C | Amazon Elastic Load Balancing |
| D | Amazon SNS |
| E | Amazon S3 |

**(A)** : DynamoDB는 AWS에서 자동으로 여러 AZ에 데이터를 복제하므로 사용자가 직접 Multi-AZ 설정을 할 필요가 없다. → [📖 DynamoDB는 AWS에서 자동으로 여러 AZ에 데이터를 복제하므로 사용자가 직접 설정 불필요](/section/17-serverless-overview#amazon-dynamodb)

**(B) 정답** : EC2 인스턴스는 특정 AZ에 종속되므로, 고가용성을 위해 여러 AZ에 인스턴스를 배포해야 한다. → [📖 EC2 인스턴스는 특정 AZ에 종속되므로 고가용성을 위해 여러 AZ에 배포 필요](/section/06-high-availability-scalability#scalability-vs-high-availability)

**(C) 정답** : ELB는 여러 AZ에 걸쳐 트래픽을 분산시킬 수 있으며, Multi-AZ 구성으로 고가용성을 확보해야 한다. → [📖 ELB는 여러 AZ에 걸쳐 트래픽을 분산시킬 수 있으며, Multi-AZ 구성으로 고가용성 확보 필요](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(D)** : SNS는 AWS에서 관리하는 완전 관리형 서비스로 자동으로 고가용성을 제공한다. → [📖 SNS는 AWS에서 관리하는 완전 관리형 서비스로 자동으로 고가용성 제공](/section/15-integration-messaging#amazon-sns-simple-notification-service)

**(E)** : S3는 리전 수준에서 자동으로 여러 AZ에 데이터를 복제하므로 별도 설정이 불필요하다. → [📖 S3는 리전 수준에서 자동으로 여러 AZ에 데이터를 복제하므로 별도 설정 불필요](/section/10-amazon-s3#s3-버킷-bucket)

**핵심 개념:** EC2 / ELB Multi-AZ / 고가용성 설계

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [Auto Scaling Group ASG](/section/06-high-availability-scalability#auto-scaling-group-asg), [Scalability vs High Availability](/section/06-high-availability-scalability#scalability-vs-high-availability)

---

### Q442. A customer is hosting their company website on a cluster of web servers that are behind a public facing load balancer. The customer also uses Amazon Route 53 to manage their public DNS. How should the customer configure the DNS zone apex record to point to the load balancer?

**Options:**
- A) Create an A record pointing to the IP address of the load balancer.
- B) Create a CNAME record pointing to the load balancer DNS name.
- C) Create a CNAME record aliased to the load balancer DNS name.
- D) Create an A record aliased to the load balancer DNS name.

**Answer:** C

**해설:**

> **문제:** 고객이 퍼블릭 로드 밸런서 뒤의 웹 서버 클러스터에 회사 웹사이트를 호스팅하고 Route 53으로 DNS를 관리한다. DNS 존 Apex 레코드가 로드 밸런서를 가리키도록 구성하려면 어떻게 해야 하는가?

| 선지 | 번역 |
|------|------|
| A | 로드 밸런서 IP 주소를 가리키는 A 레코드 생성 |
| B | 로드 밸런서 DNS 이름을 가리키는 CNAME 레코드 생성 |
| C | 로드 밸런서 DNS 이름에 별칭된 CNAME 레코드 생성 |
| D | 로드 밸런서 DNS 이름에 별칭된 A 레코드 생성 |

**(A)** : ELB의 IP는 변경될 수 있어 IP 직접 지정은 적합하지 않다.

**(B)** : 존 Apex(루트 도메인, 예: example.com)에는 표준 CNAME 레코드를 설정할 수 없다(DNS 표준 제약). → [📖 존 Apex에는 표준 CNAME 레코드를 설정할 수 없음(DNS 표준 제약)](/section/08-route-53#cname-vs-alias)

**(C) 정답** : Route 53의 Alias 레코드는 존 Apex에서도 AWS 리소스(ELB 등)를 가리킬 수 있다. CNAME Alias 형태로 로드 밸런서 DNS 이름을 지정하면 IP 변경에도 자동으로 대응한다. → [📖 Route 53의 Alias 레코드는 존 Apex에서도 AWS 리소스(ELB 등)를 가리킬 수 있음](/section/08-route-53#cname-vs-alias)

**(D)** : A 레코드는 IP 주소를 지정하는 것이다. 별칭 A 레코드도 가능하지만 이 경우 CNAME Alias가 더 정확한 표현이다.

**핵심 개념:** Route 53 Alias 레코드 / 존 Apex / ELB DNS

**관련 노트:** [CNAME vs Alias](/section/08-route-53#cname-vs-alias), [Alias Record 대상](/section/08-route-53#alias-record-대상)

---

### Q443. True or False: REST or Query requests are HTTP or HTTPS requests that use an HTTP verb (such as GET or POST) and a parameter named Action or Operation that specifies the API you are calling.

**Options:**
- A) True.
- B) False.

**Answer:** B

**해설:**

> **문제:** REST 또는 Query 요청은 HTTP/HTTPS 요청으로 GET/POST 동사와 호출할 API를 지정하는 Action 또는 Operation 파라미터를 사용한다. 참인가, 거짓인가?

| 선지 | 번역 |
|------|------|
| A | 참 |
| B | 거짓 |

**(A)** : 이 설명은 REST 요청이 아닌 Query 요청에 해당하므로 전체적으로 부정확하다.

**(B) 정답** : REST 요청과 Query 요청은 서로 다른 방식이다. Query 요청은 Action/Operation 파라미터를 사용하지만, REST 요청은 HTTP 메서드(GET, POST, PUT, DELETE)와 URL 경로로 동작을 구분한다. 두 가지를 동일하게 설명한 이 진술은 거짓이다. → [📖 REST 요청과 Query 요청은 서로 다른 방식으로 동작함](/section/03-ec2-basics#ec2-구성-요소)

**핵심 개념:** REST API vs Query API 차이

**관련 노트:** [AWS API Gateway](/section/17-serverless-overview#aws-api-gateway)

---

### Q444. Which of the following features ensures even distribution of traffic to Amazon EC2 instances in multiple Availability Zones registered with a load balancer?

**Options:**
- A) Elastic Load Balancing request routing.
- B) An Amazon Route 53 weighted routing policy.
- C) Elastic Load Balancing cross-zone load balancing.
- D) An Amazon Route 53 latency routing policy.

**Answer:** A

**해설:**

> **문제:** 로드 밸런서에 등록된 여러 가용 영역의 EC2 인스턴스에 트래픽을 균등하게 분산하는 기능은?

| 선지 | 번역 |
|------|------|
| A | ELB 요청 라우팅 |
| B | Amazon Route 53 가중치 라우팅 정책 |
| C | ELB 교차 AZ 로드 밸런싱 |
| D | Amazon Route 53 지연 시간 라우팅 정책 |

**(A) 정답** : ELB의 기본 요청 라우팅 기능이 여러 AZ에 등록된 인스턴스들 사이에서 트래픽을 균등하게 분산한다. → [📖 ELB의 기본 요청 라우팅 기능이 여러 AZ에 등록된 인스턴스들 사이에서 트래픽을 균등하게 분산](/section/06-high-availability-scalability#elastic-load-balancer-elb)

**(B)** : Route 53 가중치 라우팅은 DNS 수준에서 가중치 기반 분배를 하며, ELB 내부의 균등 분산과는 다르다.

**(C)** : 교차 AZ 로드 밸런싱은 AZ 간 균등 분산을 추가로 보장하는 기능이지만, 이 문제의 답은 ELB 요청 라우팅(A)이다. → [📖 교차 AZ 로드 밸런싱은 AZ 간 균등 분산을 추가로 보장하는 기능](/section/06-high-availability-scalability#crosszone-load-balancing)

**(D)** : Route 53 지연 시간 라우팅은 가장 빠른 리전으로 라우팅하는 기능이다.

**핵심 개념:** ELB 요청 라우팅 / 교차 AZ 로드 밸런싱

**관련 노트:** [Elastic Load Balancer ELB](/section/06-high-availability-scalability#elastic-load-balancer-elb), [Cross-Zone Load Balancing](/section/06-high-availability-scalability#crosszone-load-balancing)

---

### Q445. Groups can't [...].

**Options:**
- A) be nested more than 3 levels.
- B) be nested at all.
- C) be nested more than 4 levels.
- D) be nested more than 2 levels.

**Answer:** B

**해설:**

> **문제:** IAM 그룹은 [...]할 수 없다.

| 선지 | 번역 |
|------|------|
| A | 3단계 이상 중첩될 수 |
| B | 전혀 중첩될 수 |
| C | 4단계 이상 중첩될 수 |
| D | 2단계 이상 중첩될 수 |

**(A)** : 3단계 제한이 아니라 중첩 자체가 불가능하다.

**(B) 정답** : IAM 그룹은 다른 그룹을 멤버로 포함할 수 없다. 즉, 그룹의 중첩(nesting)이 전혀 지원되지 않는다. 그룹에는 IAM 사용자만 추가할 수 있다. → [📖 IAM 그룹은 다른 그룹을 멤버로 포함할 수 없음, 그룹에는 IAM 사용자만 추가 가능](/section/02-iam#users-groups)

**(C)** : 4단계 제한이 아니라 중첩 자체가 불가능하다.

**(D)** : 2단계 제한이 아니라 중첩 자체가 불가능하다.

**핵심 개념:** IAM 그룹 / 그룹 중첩 불가

**관련 노트:** [Users & Groups](/section/02-iam#users-groups)

---

### Q446. You have been using T2 instances as your CPU requirements have not been that intensive. However you now start to think about larger instance types and start looking at M1 and M3 instances. You are a little confused as to the differences between them as they both seem to have the same ratio of CPU and memory. Which statement below is incorrect as to why you would use one over the other?

**Options:**
- A) M3 instances are less expensive than M1 instances.
- B) M3 instances are configured with more swap memory than M1 instances.
- C) M3 instances provide better, more consistent performance than M1 instances for most use-cases.
- D) M3 instances also offer SSD-based instance storage that delivers higher I/O performance.

**Answer:** B

**해설:**

> **문제:** T2 인스턴스를 사용하다가 M1과 M3 인스턴스를 비교하고 있다. 둘 다 CPU와 메모리 비율이 비슷한데, 아래 설명 중 M1 대신 M3를 사용하는 이유로 틀린 것은?

| 선지 | 번역 |
|------|------|
| A | M3가 M1보다 저렴하다. |
| B | M3가 M1보다 더 많은 스왑 메모리로 구성되어 있다. |
| C | M3가 대부분의 사용 사례에서 더 나은, 일관된 성능을 제공한다. |
| D | M3는 더 높은 I/O 성능을 제공하는 SSD 기반 인스턴스 스토리지를 제공한다. |

**(A)** : 올바른 설명이다. M3는 M1보다 비용 효율이 높다.

**(B) 정답** : 틀린 설명이다. M3와 M1의 차이는 스왑 메모리가 아니다. M3는 최신 아키텍처, SSD 스토리지, 향상된 성능을 제공하지만 스왑 메모리 구성은 M1/M3 선택의 기준이 아니다.

**(C)** : 올바른 설명이다. M3는 Intel Xeon 최신 프로세서를 사용하여 더 일관된 성능을 제공한다.

**(D)** : 올바른 설명이다. M3는 SSD 기반 인스턴스 스토리지를 제공하여 높은 I/O 성능을 지원한다. → [📖 M3는 SSD 기반 인스턴스 스토리지를 제공하여 높은 I/O 성능을 지원](/section/05-ec2-instance-storage#ec2-instance-store)

**핵심 개념:** EC2 인스턴스 유형 비교 (M1 vs M3)

**관련 노트:** [EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입)

---

### Q447. Do the system resources on the Micro instance meet the recommended configuration for Oracle?

**Options:**
- A) Yes, completely.
- B) Yes, but only for certain situations.

**Answer:** B

**해설:**

> **문제:** Micro 인스턴스의 시스템 리소스가 Oracle에 권장되는 구성을 충족하는가?

| 선지 | 번역 |
|------|------|
| A | 예, 완전히 충족한다. |
| B | 예, 하지만 특정 상황에서만 충족한다. |

**(A)** : Micro 인스턴스는 리소스가 매우 제한적이므로 Oracle의 모든 권장 구성을 완전히 충족하지는 않는다.

**(B) 정답** : t1.micro 인스턴스는 Oracle을 실행할 수 있지만, 리소스가 제한되어 있어 개발/테스트 등 경량 작업에서만 Oracle의 권장 구성을 부분적으로 충족한다. 프로덕션 환경에는 적합하지 않다.

**핵심 개념:** EC2 Micro 인스턴스 / Oracle DB 요구사항

**관련 노트:** [EC2 인스턴스 타입](/section/03-ec2-basics#ec2-인스턴스-타입), [Amazon RDS Relational Database Service](/section/07-rds-aurora-elasticache#amazon-rds-relational-database-service)

---

### Q448. Which of the following are true regarding AWS CloudTrail? (Choose 3 answers)

**Options:**
- A) CloudTrail is enabled globally.
- B) CloudTrail is enabled by default.
- C) CloudTrail is enabled on a per-region basis.
- D) CloudTrail is enabled on a per-service basis.
- E) Logs can be delivered to a single Amazon S3 bucket for aggregation.
- F) CloudTrail is enabled for all available services within a region.

**Answer:** C, D, E

**해설:**

> **문제:** AWS CloudTrail에 관한 설명 중 옳은 것은? (3개 선택)

| 선지 | 번역 |
|------|------|
| A | CloudTrail은 글로벌로 활성화된다. |
| B | CloudTrail은 기본으로 활성화되어 있다. |
| C | CloudTrail은 리전별로 활성화된다. |
| D | CloudTrail은 서비스별로 활성화된다. |
| E | 로그는 집계를 위해 단일 Amazon S3 버킷에 전달될 수 있다. |
| F | CloudTrail은 리전 내 모든 가용 서비스에 대해 활성화된다. |

**(A)** : CloudTrail은 기본적으로 리전별로 구성된다. 글로벌 서비스(IAM 등) 포함은 옵션이다. → [📖 CloudTrail은 기본적으로 리전별로 구성됨, 글로벌 서비스 포함은 옵션](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(B)** : 과거에는 기본 비활성이었으나 현재는 기본 이벤트 기록이 활성화된다. 이 문제의 맥락상 오답으로 처리.

**(C) 정답** : CloudTrail 트레일은 리전별로 구성한다. 모든 리전을 포함하려면 멀티 리전 트레일을 설정해야 한다. → [📖 CloudTrail 트레일은 리전별로 구성, 모든 리전 포함하려면 멀티 리전 트레일 설정 필요](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(D) 정답** : 특정 서비스의 이벤트만 선택적으로 기록하도록 구성할 수 있다.

**(E) 정답** : 여러 리전의 CloudTrail 로그를 단일 S3 버킷에 집계할 수 있어 중앙 집중식 로그 관리가 가능하다. → [📖 여러 리전의 CloudTrail 로그를 단일 S3 버킷에 집계할 수 있음](/section/22-monitoring-audit-performance#aws-cloudtrail)

**(F)** : CloudTrail은 모든 서비스를 자동으로 포함하지 않으며, 서비스별 설정이 필요하다.

**핵심 개념:** CloudTrail 구성 / 멀티 리전 트레일 / S3 로그 집계

**관련 노트:** [AWS CloudTrail](/section/22-monitoring-audit-performance#aws-cloudtrail)

---

### Q449. If you're unable to connect via SSH to your EC2 instance, which of the following should you check and possibly correct to restore connectivity?

**Options:**
- A) Adjust Security Group to permit egress traffic over TCP port 443 from your IP.
- B) Configure the IAM role to permit changes to security group settings.
- C) Modify the instance security group to allow ingress of ICMP packets from your IP.
- D) Adjust the instance's Security Group to permit ingress traffic over port 22 from your IP.
- E) Apply the most recently released Operating System security patches.

**Answer:** D

**해설:**

> **문제:** EC2 인스턴스에 SSH로 연결할 수 없을 때, 연결을 복구하기 위해 확인하고 수정해야 할 사항은?

| 선지 | 번역 |
|------|------|
| A | 보안 그룹에서 내 IP의 TCP 443 포트 아웃바운드 트래픽 허용 |
| B | IAM 역할이 보안 그룹 설정 변경을 허용하도록 구성 |
| C | 인스턴스 보안 그룹에서 내 IP의 ICMP 패킷 인바운드 허용 |
| D | 인스턴스 보안 그룹에서 내 IP의 포트 22 인바운드 트래픽 허용 |
| E | 최신 OS 보안 패치 적용 |

**(A)** : SSH는 포트 22를 사용하며, 아웃바운드 443 허용은 SSH 연결과 무관하다.

**(B)** : IAM 역할 구성은 SSH 연결 문제의 직접적인 원인이 아니다.

**(C)** : ICMP는 ping에 사용되며 SSH 연결과 직접 관련이 없다.

**(D) 정답** : SSH는 TCP 포트 22를 통해 동작한다. 보안 그룹에서 내 IP에 대해 포트 22 인바운드를 허용해야 SSH 연결이 가능하다. → [📖 SSH는 TCP 포트 22를 통해 동작, 보안 그룹에서 포트 22 인바운드 허용 필요](/section/03-ec2-basics#security-groups-보안-그룹)

**(E)** : OS 패치는 보안 그룹 설정 문제와 무관하다.

**핵심 개념:** EC2 보안 그룹 / SSH 포트 22 / 인바운드 규칙

**관련 노트:** [Security Groups 보안 그룹](/section/03-ec2-basics#security-groups-보안-그룹), [Classic Ports](/section/03-ec2-basics#classic-ports)

---

### Q450. A major finance organisation has engaged your company to set up a large data mining application. Using AWS you decide the best service for this is Amazon Elastic MapReduce (EMR) which you know uses Hadoop. Which of the following statements best describes Hadoop?

**Options:**
- A) Hadoop is 3rd Party software which can be installed using AMI.
- B) Hadoop is an open source python web framework.
- C) Hadoop is an open source Java software framework.
- D) Hadoop is an open source javascript framework.

**Answer:** C

**해설:**

> **문제:** 대형 데이터 마이닝 애플리케이션을 위해 Hadoop을 사용하는 Amazon EMR을 선택했다. Hadoop을 가장 잘 설명하는 것은?

| 선지 | 번역 |
|------|------|
| A | Hadoop은 AMI를 사용하여 설치할 수 있는 서드파티 소프트웨어이다. |
| B | Hadoop은 오픈소스 Python 웹 프레임워크이다. |
| C | Hadoop은 오픈소스 Java 소프트웨어 프레임워크이다. |
| D | Hadoop은 오픈소스 JavaScript 프레임워크이다. |

**(A)** : Hadoop은 서드파티 상용 소프트웨어가 아닌 Apache 재단의 오픈소스 프로젝트이다.

**(B)** : Hadoop은 Python이 아닌 Java로 작성되어 있다.

**(C) 정답** : Apache Hadoop은 대용량 데이터의 분산 처리를 위한 오픈소스 Java 소프트웨어 프레임워크이다. HDFS(분산 파일 시스템)와 MapReduce 프로그래밍 모델을 포함한다. → [📖 Apache Hadoop은 대용량 데이터의 분산 처리를 위한 오픈소스 Java 소프트웨어 프레임워크](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

**(D)** : Hadoop은 JavaScript 프레임워크가 아니다.

**핵심 개념:** Amazon EMR / Apache Hadoop / 분산 데이터 처리

**관련 노트:** [Amazon EMR Elastic MapReduce](/section/20-data-analytics#amazon-emr-elastic-mapreduce)

---
