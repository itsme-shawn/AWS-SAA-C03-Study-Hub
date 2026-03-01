# Section 03 - EC2 Basics 연습문제 해설

---

### Q1. A company needs to run a batch processing job that can be interrupted and restarted without data loss. The job needs to be as cost-effective as possible. Which EC2 purchasing option should they use?

**한글 번역:** 한 회사가 데이터 손실 없이 중단 및 재시작할 수 있는 배치 처리 작업을 실행해야 합니다. 이 작업은 가능한 한 비용 효율적이어야 합니다. 어떤 EC2 구매 옵션을 사용해야 합니까?

**선지:**
- A) On-Demand → 온디맨드
- B) Reserved → 예약 인스턴스
- C) Spot → 스팟
- D) Dedicated Hosts → 전용 호스트

**정답:** C

**선지별 해설:**
- **A) On-Demand:** 온디맨드는 사용한 만큼 지불하며 중단 없이 실행되지만, 스팟 대비 최대 90%까지 비용이 높습니다. 비용 효율성 면에서 최선이 아닙니다.
- **B) Reserved:** 예약 인스턴스는 1~3년 약정으로 할인을 받지만, 배치 처리와 같은 유연한 워크로드에는 적합하지 않으며, 스팟보다 비용이 높습니다.
- **C) Spot:** 정답입니다. 스팟 인스턴스는 온디맨드 대비 최대 90% 할인을 제공하며, 가장 비용 효율적인 옵션입니다. 단, AWS가 용량을 필요로 할 때 2분 사전 통보 후 인스턴스를 회수할 수 있습니다. 중단 및 재시작이 가능한 배치 처리, 데이터 분석, 이미지 처리 등에 이상적입니다.
- **D) Dedicated Hosts:** 전용 호스트는 물리적 서버를 전용으로 사용하며, 가장 비용이 높은 옵션입니다. 라이선싱 요구 사항이 있는 경우에 사용합니다.

**핵심 개념:** EC2 스팟 인스턴스 - 중단 허용 가능한 워크로드에 최대 90% 할인

---

### Q2. A user is trying to connect to an EC2 instance via SSH but the connection times out. What is the MOST likely cause?

**한글 번역:** 사용자가 SSH를 통해 EC2 인스턴스에 연결하려 하지만 연결 시간이 초과됩니다. 가장 가능성 높은 원인은 무엇입니까?

**선지:**
- A) The EC2 instance is stopped → EC2 인스턴스가 중지됨
- B) The application on the instance is not running → 인스턴스의 애플리케이션이 실행되고 있지 않음
- C) The Security Group does not allow inbound SSH traffic → 보안 그룹이 인바운드 SSH 트래픽을 허용하지 않음
- D) The IAM user does not have permission → IAM 사용자에게 권한이 없음

**정답:** C

**선지별 해설:**
- **A) 인스턴스 중지됨:** 인스턴스가 중지되면 연결 시간 초과가 아닌 "연결 거부" 또는 호스트를 찾을 수 없다는 오류가 발생합니다. 중지된 인스턴스는 공용 IP를 잃기 때문입니다.
- **B) 애플리케이션 미실행:** SSH 데몬이 실행되지 않으면 "연결 거부(Connection Refused)" 오류가 발생하지, 시간 초과(Timeout)가 발생하지 않습니다.
- **C) 보안 그룹이 SSH 미허용:** 정답입니다. 연결 시간 초과(Timeout)는 거의 항상 보안 그룹(Security Group) 문제입니다. 보안 그룹에서 포트 22(SSH)에 대한 인바운드 규칙이 없으면 트래픽이 차단되어 시간 초과가 발생합니다. 시험에서 "Timeout = Security Group 문제"로 기억하세요.
- **D) IAM 권한 없음:** IAM 권한은 SSH 연결과 직접 관련이 없습니다. SSH는 키 페어를 사용하며, IAM은 AWS API 호출 권한을 관리합니다.

**핵심 개념:** SSH Timeout = 보안 그룹(Security Group) 문제 / Connection Refused = 애플리케이션 문제

---

### Q3. A company requires a physical server for their application due to software licensing that is based on per-socket and per-core metrics. Which EC2 option should they choose?

**한글 번역:** 한 회사가 소켓당/코어당 메트릭 기반의 소프트웨어 라이선싱 때문에 물리적 서버가 필요합니다. 어떤 EC2 옵션을 선택해야 합니까?

**선지:**
- A) Spot → 스팟
- B) Dedicated Instances → 전용 인스턴스
- C) Dedicated Hosts → 전용 호스트
- D) Reserved → 예약 인스턴스

**정답:** C

**선지별 해설:**
- **A) Spot:** 스팟 인스턴스는 비용 절감을 위한 옵션이며, 물리적 서버에 대한 가시성이나 제어를 제공하지 않습니다.
- **B) Dedicated Instances:** 전용 인스턴스는 전용 하드웨어에서 실행되지만, 물리적 서버의 소켓과 코어에 대한 가시성을 제공하지 않습니다. 라이선싱 목적으로는 부적합합니다.
- **C) Dedicated Hosts:** 정답입니다. 전용 호스트는 물리적 서버 전체를 할당받으며, 소켓 수, 물리적 코어 수 등 서버 하드웨어에 대한 완전한 가시성을 제공합니다. 소켓당/코어당 기반의 소프트웨어 라이선싱(예: Oracle, Microsoft SQL Server)에 필요한 정보를 제공하므로 라이선싱 요구 사항이 있을 때 사용합니다.
- **D) Reserved:** 예약 인스턴스는 할인을 제공하지만, 물리적 서버 가시성을 제공하지 않습니다.

**핵심 개념:** Dedicated Hosts - 물리적 서버 가시성, 소켓/코어 기반 라이선싱 요구 사항

---

### Q4. Which EC2 instance type family is BEST suited for an in-memory database workload?

**한글 번역:** 인메모리 데이터베이스 워크로드에 가장 적합한 EC2 인스턴스 유형 패밀리는 무엇입니까?

**선지:**
- A) General Purpose (t-family) → 범용 (t 패밀리)
- B) Compute Optimized (c-family) → 컴퓨팅 최적화 (c 패밀리)
- C) Memory Optimized (r-family) → 메모리 최적화 (r 패밀리)
- D) Storage Optimized (i-family) → 스토리지 최적화 (i 패밀리)

**정답:** C

**선지별 해설:**
- **A) General Purpose (t 패밀리):** 범용 인스턴스는 컴퓨팅, 메모리, 네트워크 리소스의 균형을 제공합니다. 인메모리 데이터베이스처럼 대량의 메모리가 필요한 워크로드에는 최적이 아닙니다.
- **B) Compute Optimized (c 패밀리):** 컴퓨팅 최적화는 높은 CPU 성능이 필요한 워크로드(배치 처리, 미디어 트랜스코딩, 고성능 웹 서버, HPC 등)에 적합합니다. 메모리 집약적 워크로드에는 적합하지 않습니다.
- **C) Memory Optimized (r 패밀리):** 정답입니다. 메모리 최적화 인스턴스(R, X, z 패밀리)는 대용량 데이터셋을 메모리에서 처리하는 워크로드에 최적화되어 있습니다. 인메모리 데이터베이스(Redis, Memcached, SAP HANA), 실시간 빅데이터 처리 등에 적합합니다.
- **D) Storage Optimized (i 패밀리):** 스토리지 최적화는 높은 순차적 읽기/쓰기 접근이 필요한 워크로드(데이터 웨어하우스, 분산 파일 시스템, OLTP 시스템)에 적합합니다.

**핵심 개념:** EC2 인스턴스 유형 - Memory Optimized (R/X/z): 인메모리 DB, 대용량 메모리 워크로드

---

### Q5. A company plans to run a steady-state database workload for the next 3 years. They want to minimize costs. Which purchasing option provides the GREATEST discount?

**한글 번역:** 한 회사가 향후 3년간 안정적인 데이터베이스 워크로드를 실행할 계획입니다. 비용을 최소화하려고 합니다. 가장 큰 할인을 제공하는 구매 옵션은 무엇입니까?

**선지:**
- A) On-Demand → 온디맨드
- B) 3-year Reserved Instance with All Upfront payment → 3년 예약 인스턴스, 전액 선결제
- C) Spot → 스팟
- D) 1-year Savings Plan with No Upfront → 1년 Savings Plan, 선결제 없음

**정답:** B

**선지별 해설:**
- **A) On-Demand:** 온디맨드는 할인이 없습니다. 장기 워크로드에 비용 효율적이지 않습니다.
- **B) 3년 RI 전액 선결제:** 정답입니다. 예약 인스턴스는 기간이 길수록(3년 > 1년), 선결제 금액이 클수록(전액 선결제 > 부분 선결제 > 선결제 없음) 더 큰 할인을 제공합니다. 3년 전액 선결제는 온디맨드 대비 최대 72% 할인을 제공하며, 안정적인 워크로드에 가장 적합합니다.
- **C) Spot:** 스팟은 최대 90% 할인을 제공하지만, 인스턴스가 언제든 중단될 수 있어 안정적인 데이터베이스 워크로드에는 적합하지 않습니다. DB는 중단되면 안 됩니다.
- **D) 1년 Savings Plan 선결제 없음:** 1년은 3년보다 할인율이 낮고, 선결제 없음은 전액 선결제보다 할인율이 낮습니다. 따라서 3년 RI 전액 선결제보다 할인이 작습니다.

**핵심 개념:** Reserved Instance 할인 극대화 - 기간 길수록 + 선결제 많을수록 할인율 증가

---

### Q6. What is the recommended Spot Fleet allocation strategy for most workloads?

**한글 번역:** 대부분의 워크로드에 권장되는 Spot Fleet 할당 전략은 무엇입니까?

**선지:**
- A) lowestPrice → 최저 가격
- B) diversified → 분산
- C) capacityOptimized → 용량 최적화
- D) priceCapacityOptimized → 가격-용량 최적화

**정답:** D

**선지별 해설:**
- **A) lowestPrice:** 가장 저렴한 풀에서 인스턴스를 시작합니다. 비용은 가장 낮지만, 해당 풀의 용량이 부족하면 인스턴스가 중단될 위험이 높습니다. 짧은 워크로드에만 적합합니다.
- **B) diversified:** 여러 풀에 걸쳐 인스턴스를 분산하여 가용성을 높입니다. 한 풀이 중단되어도 다른 풀의 인스턴스는 유지됩니다. 장기 실행 워크로드에 좋지만 최적 전략은 아닙니다.
- **C) capacityOptimized:** 가용 용량이 가장 많은 풀에서 인스턴스를 시작하여 중단 가능성을 최소화합니다. 가격을 고려하지 않는다는 단점이 있습니다.
- **D) priceCapacityOptimized:** 정답입니다. 가격과 용량을 모두 고려하여 최적의 풀을 선택합니다. 용량이 가장 높은 풀 중에서 가장 저렴한 것을 선택하므로, 중단 가능성을 줄이면서 비용도 최적화합니다. AWS에서 대부분의 워크로드에 권장하는 전략입니다.

**핵심 개념:** Spot Fleet 전략 - priceCapacityOptimized가 대부분의 워크로드에 권장됨

---

### Q7. Which of the following Security Group characteristics is correct?

**한글 번역:** 다음 보안 그룹(Security Group) 특성 중 올바른 것은 무엇입니까?

**선지:**
- A) Security Groups can have both Allow and Deny rules → 보안 그룹에는 Allow와 Deny 규칙 모두 있을 수 있음
- B) All inbound traffic is allowed by default → 모든 인바운드 트래픽이 기본적으로 허용됨
- C) Security Groups are stateless firewalls → 보안 그룹은 상태 비저장(stateless) 방화벽임
- D) A Security Group can be attached to multiple EC2 instances → 보안 그룹은 여러 EC2 인스턴스에 연결될 수 있음

**정답:** D

**선지별 해설:**
- **A) Allow와 Deny 규칙 모두 가능:** 틀립니다. 보안 그룹은 Allow 규칙만 가질 수 있습니다. Deny 규칙은 지원하지 않습니다. 트래픽을 차단하려면 규칙을 추가하지 않으면 됩니다(기본적으로 모든 인바운드가 차단됨). Deny 규칙이 필요한 경우 NACL(Network ACL)을 사용해야 합니다.
- **B) 인바운드 기본 허용:** 틀립니다. 보안 그룹은 기본적으로 모든 인바운드 트래픽을 차단하고, 모든 아웃바운드 트래픽을 허용합니다.
- **C) Stateless 방화벽:** 틀립니다. 보안 그룹은 상태 저장(Stateful) 방화벽입니다. 인바운드 요청이 허용되면 그에 대한 응답 트래픽은 자동으로 허용됩니다. Stateless 방화벽은 NACL입니다.
- **D) 여러 인스턴스에 연결 가능:** 정답입니다. 하나의 보안 그룹은 여러 EC2 인스턴스에 연결할 수 있고, 하나의 EC2 인스턴스에도 여러 보안 그룹을 연결할 수 있습니다. 다대다(many-to-many) 관계입니다.

**핵심 개념:** Security Group - Allow만 가능, Stateful, 인바운드 기본 차단, 다대다 관계

---

### Q8. A company needs guaranteed EC2 capacity in a specific AZ for an upcoming event lasting 2 days. They do not want a long-term commitment. Which option should they use?

**한글 번역:** 한 회사가 2일간의 이벤트를 위해 특정 AZ에서 EC2 용량을 보장받아야 합니다. 장기 약정을 원하지 않습니다. 어떤 옵션을 사용해야 합니까?

**선지:**
- A) Reserved → 예약 인스턴스
- B) Spot → 스팟
- C) On-Demand Capacity Reservations → 온디맨드 용량 예약
- D) Savings Plans → Savings Plans

**정답:** C

**선지별 해설:**
- **A) Reserved:** 예약 인스턴스는 최소 1년 약정이 필요하므로 2일 이벤트에는 과도합니다. 장기 약정을 원하지 않는 조건에 맞지 않습니다.
- **B) Spot:** 스팟 인스턴스는 용량을 보장하지 않으며, AWS가 언제든 회수할 수 있습니다. 이벤트와 같이 중단되면 안 되는 워크로드에는 부적합합니다.
- **C) On-Demand Capacity Reservations:** 정답입니다. 온디맨드 용량 예약은 특정 AZ에서 EC2 용량을 보장받을 수 있으며, 장기 약정이 필요 없습니다. 언제든 생성하고 취소할 수 있어 단기 이벤트에 이상적입니다. 단, 인스턴스 실행 여부와 관계없이 비용이 발생합니다.
- **D) Savings Plans:** Savings Plans는 1~3년의 사용량 약정이 필요하며, 특정 AZ에서의 용량 보장 기능이 아닙니다.

**핵심 개념:** On-Demand Capacity Reservations - 장기 약정 없이 특정 AZ에서 용량 보장

---
