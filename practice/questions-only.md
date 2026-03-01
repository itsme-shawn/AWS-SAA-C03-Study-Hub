# AWS SAA-C03 Practice Questions (Questions Only)

> Total: 216 questions from 30 sections
> Use this file for self-testing. Answers are in all-questions.md.

---

## Getting Started with AWS

### Q1. A company is planning to deploy a new application on AWS. The application must comply with local data residency laws that require all data to remain within a specific country. Which factor should the Solutions Architect prioritize when choosing an AWS Region?
**Options:**
- A) Proximity to the development team
- B) Availability of the latest AWS services
- C) Compliance with data governance and legal requirements
- D) Lowest possible pricing for EC2 instances

### Q2. Which of the following AWS services is a Global service, NOT scoped to a specific Region?
**Options:**
- A) Amazon EC2
- B) AWS Lambda
- C) Amazon Route 53
- D) Amazon RDS

### Q3. A Solutions Architect needs to design a highly available architecture. What is the minimum number of Availability Zones in any AWS Region?
**Options:**
- A) 1
- B) 2
- C) 3
- D) 6

### Q4. What is the primary purpose of AWS Edge Locations?
**Options:**
- A) To host EC2 instances closer to users
- B) To deliver content to end users with lower latency
- C) To provide additional Availability Zones for a Region
- D) To store EBS snapshots for disaster recovery

### Q5. An application serving users globally is experiencing high latency for users in Asia. The application is currently deployed only in the us-east-1 Region. What is the MOST effective way to reduce latency for Asian users?
**Options:**
- A) Deploy the application in an additional Availability Zone within us-east-1
- B) Use a larger EC2 instance type in us-east-1
- C) Deploy the application in an AWS Region closer to Asian users, such as ap-northeast-1
- D) Increase the number of Edge Locations in us-east-1

## IAM (Identity & Access Management)

### Q1. A company wants to allow an EC2 instance to access an S3 bucket. What is the MOST secure way to grant this access?
**Options:**
- A) Store AWS access keys in the EC2 instance's environment variables
- B) Attach an IAM Role with appropriate S3 permissions to the EC2 instance
- C) Create an IAM user and hardcode the credentials in the application
- D) Use the root account credentials on the EC2 instance

### Q2. Which IAM security tool provides a report that lists all IAM users and the status of their various credentials?
**Options:**
- A) IAM Access Advisor
- B) IAM Credentials Report
- C) AWS CloudTrail
- D) AWS Config

### Q3. An IAM user belongs to two groups. Group A has a policy that allows S3 read access, and Group B has a policy that denies all S3 access. What happens when the user tries to read from S3?
**Options:**
- A) The user can read from S3 because Allow takes precedence
- B) The user cannot read from S3 because Deny always takes precedence
- C) The request is evaluated based on which group was created first
- D) The user receives an error because of conflicting policies

### Q4. Which of the following statements about IAM Groups is correct?
**Options:**
- A) Groups can contain other groups for nested permissions
- B) A user must belong to at least one group
- C) Groups can only contain IAM users, not other groups
- D) Groups can contain both users and roles

### Q5. A Solutions Architect wants to review which AWS services an IAM user has accessed to apply the least privilege principle. Which tool should they use?
**Options:**
- A) IAM Credentials Report
- B) AWS CloudTrail Logs
- C) IAM Access Advisor
- D) AWS Trusted Advisor

### Q6. Which of the following is a valid MFA device option for AWS?
**Options:**
- A) SMS text message to a mobile phone
- B) Email verification code
- C) U2F security key such as YubiKey
- D) Biometric fingerprint scanner

### Q7. What are the components of an IAM Policy Statement? (Select the REQUIRED components)
**Options:**
- A) Effect, Action, Resource
- B) Sid, Effect, Action, Resource, Condition
- C) Version, Id, Statement
- D) Principal, Sid, Condition

## EC2 Basics

### Q1. A company needs to run a batch processing job that can be interrupted and restarted without data loss. The job needs to be as cost-effective as possible. Which EC2 purchasing option should they use?
**Options:**
- A) On-Demand Instances
- B) Reserved Instances
- C) Spot Instances
- D) Dedicated Hosts

### Q2. A user is trying to connect to an EC2 instance via SSH but the connection times out. What is the MOST likely cause?
**Options:**
- A) The EC2 instance is stopped
- B) The application on the instance is not running
- C) The Security Group does not allow inbound SSH traffic
- D) The IAM user does not have permission

### Q3. A company requires a physical server for their application due to software licensing that is based on per-socket and per-core metrics. Which EC2 option should they choose?
**Options:**
- A) Spot Instances
- B) Dedicated Instances
- C) Dedicated Hosts
- D) Reserved Instances

### Q4. Which EC2 instance type family is BEST suited for an in-memory database workload?
**Options:**
- A) General Purpose (t-family)
- B) Compute Optimized (c-family)
- C) Memory Optimized (r-family)
- D) Storage Optimized (i-family)

### Q5. A company plans to run a steady-state database workload for the next 3 years. They want to minimize costs. Which purchasing option provides the GREATEST discount?
**Options:**
- A) On-Demand Instances
- B) 3-year Reserved Instance with All Upfront payment
- C) Spot Instances
- D) 1-year Savings Plan with No Upfront payment

### Q6. What is the recommended Spot Fleet allocation strategy for most workloads?
**Options:**
- A) lowestPrice
- B) diversified
- C) capacityOptimized
- D) priceCapacityOptimized

### Q7. Which of the following Security Group characteristics is correct?
**Options:**
- A) Security Groups can have both Allow and Deny rules
- B) All inbound traffic is allowed by default
- C) Security Groups are stateless firewalls
- D) A Security Group can be attached to multiple EC2 instances

### Q8. A company needs guaranteed EC2 capacity in a specific Availability Zone for an upcoming event lasting 2 days. They do not want a long-term commitment. Which option should they use?
**Options:**
- A) Reserved Instances
- B) Spot Instances
- C) On-Demand Capacity Reservations
- D) Savings Plans

## EC2 Associate

### Q1. A company is deploying a high-performance computing (HPC) application that requires extremely low latency and high network throughput between EC2 instances. Which placement group strategy should they use?
**Options:**
- A) Spread
- B) Partition
- C) Cluster
- D) Default (no placement group)

### Q2. An application requires high availability where each EC2 instance must be isolated from hardware failure of other instances. The application runs on 6 instances across 3 Availability Zones. Which placement group strategy is MOST appropriate?
**Options:**
- A) Cluster
- B) Spread
- C) Partition
- D) No placement group is needed

### Q3. A Solutions Architect needs to preserve the in-memory state of an EC2 instance to speed up subsequent boots. Which feature should they use?
**Options:**
- A) EC2 User Data script
- B) EC2 Hibernate
- C) EBS Snapshots
- D) AMI creation

### Q4. What is a prerequisite for using EC2 Hibernate?
**Options:**
- A) The instance must use an Instance Store root volume
- B) The root EBS volume must be encrypted
- C) The instance RAM must be at least 150 GB
- D) The instance must be a bare metal instance

### Q5. An application requires a fixed public IP address that can be quickly remapped to another EC2 instance in case of failure. What should the Solutions Architect use?
**Options:**
- A) A public IP address assigned by AWS
- B) An Elastic IP address
- C) A private IP address with NAT Gateway
- D) An Application Load Balancer

### Q6. A company is running a Cassandra database cluster on EC2 and needs to distribute instances across multiple isolated partitions to prevent correlated hardware failures. Which placement group strategy should they use?
**Options:**
- A) Cluster
- B) Spread
- C) Partition
- D) Default placement

### Q7. What happens to the public IP address of an EC2 instance when it is stopped and then started again?
**Options:**
- A) The public IP address remains the same
- B) The public IP address may change
- C) The instance loses both public and private IP addresses
- D) The private IP address changes but public stays the same

### Q8. An ENI (Elastic Network Interface) created in us-east-1a can be attached to an EC2 instance in which Availability Zone?
**Options:**
- A) Any Availability Zone in us-east-1
- B) Only us-east-1a
- C) Any Availability Zone in any Region
- D) Any Availability Zone in the same VPC

## EC2 Instance Storage

### Q1. A company needs a shared file system that can be accessed by EC2 instances running in multiple Availability Zones. The instances are running Amazon Linux. Which storage option is MOST appropriate?
**Options:**
- A) Amazon EBS with Multi-Attach
- B) Amazon EFS
- C) Amazon S3
- D) EC2 Instance Store

### Q2. An application requires more than 64,000 IOPS with sub-millisecond latency. Which EBS volume type should be used?
**Options:**
- A) gp3
- B) io1
- C) io2 Block Express
- D) st1

### Q3. A Solutions Architect needs to reduce storage costs for EBS snapshots that are rarely accessed but must be retained for compliance. What should they do?
**Options:**
- A) Delete the snapshots and recreate them when needed
- B) Move the snapshots to EBS Snapshot Archive
- C) Enable Fast Snapshot Restore
- D) Convert the snapshots to HDD volumes

### Q4. Which EBS volume type has IOPS that scale automatically with volume size?
**Options:**
- A) gp3
- B) gp2
- C) io1
- D) st1

### Q5. A company wants to encrypt an existing unencrypted EBS volume. What is the correct procedure?
**Options:**
- A) Enable encryption directly on the existing volume
- B) Create a snapshot, copy the snapshot with encryption enabled, create a new encrypted volume from the snapshot
- C) Attach a new encrypted volume and copy the data manually
- D) Use AWS KMS to encrypt the volume in place

### Q6. Which storage option provides the HIGHEST I/O performance for an EC2 instance?
**Options:**
- A) EBS gp3
- B) EBS io2 Block Express
- C) EC2 Instance Store
- D) Amazon EFS Max I/O

### Q7. A company runs a clustered Linux application (Teradata) that requires multiple EC2 instances to simultaneously read and write to the same storage volume in the same Availability Zone. Which solution should they use?
**Options:**
- A) Amazon EFS
- B) EBS gp3 with Multi-Attach
- C) EBS io1/io2 with Multi-Attach
- D) Amazon S3

### Q8. An EFS file system has files that are accessed frequently for the first 30 days but rarely after that. How can the company optimize storage costs?
**Options:**
- A) Manually move files to S3 after 30 days
- B) Use EFS Lifecycle Policy to automatically move files to EFS Infrequent Access
- C) Create a new EFS file system for old files
- D) Use EBS snapshots for archival

## High Availability & Scalability

### Q1. A company needs to route HTTP traffic to different microservices based on the URL path. For example, /api/users should go to the user service and /api/orders should go to the order service. Which load balancer should they use?
**Options:**
- A) Classic Load Balancer
- B) Network Load Balancer
- C) Application Load Balancer
- D) Gateway Load Balancer

### Q2. A company requires a load balancer with a static IP address per Availability Zone for whitelisting purposes. The application handles millions of requests per second. Which load balancer should they choose?
**Options:**
- A) Application Load Balancer
- B) Classic Load Balancer
- C) Network Load Balancer
- D) Gateway Load Balancer

### Q3. An application is deployed behind an Application Load Balancer. The application needs to get the real IP address of the client. How can it obtain this information?
**Options:**
- A) From the source IP of the incoming request
- B) From the X-Forwarded-For header
- C) From the Host header
- D) From the ALB access logs only

### Q4. A company needs to inspect all network traffic entering their VPC using third-party security appliances before it reaches the application. Which AWS service should they use?
**Options:**
- A) Application Load Balancer with AWS WAF
- B) Network Load Balancer with Security Groups
- C) Gateway Load Balancer
- D) AWS Network Firewall

### Q5. Which of the following statements about Cross-Zone Load Balancing is correct?
**Options:**
- A) It is enabled by default for NLB and charges apply for inter-AZ data
- B) It is enabled by default for ALB with no charges for inter-AZ data
- C) It is enabled by default for all load balancer types
- D) It is disabled by default for ALB and charges apply for inter-AZ data

### Q6. A web application needs to maintain user session state across multiple requests. The application is behind an ALB. Which feature should be enabled?
**Options:**
- A) Cross-Zone Load Balancing
- B) Connection Draining
- C) Sticky Sessions
- D) Health Checks

### Q7. An Auto Scaling Group needs to automatically scale out when the average CPU utilization exceeds 70% and scale in when it drops below 30%. Which scaling policy should be used?
**Options:**
- A) Target Tracking Scaling
- B) Simple/Step Scaling
- C) Scheduled Scaling
- D) Predictive Scaling

### Q8. A company wants to use multiple SSL certificates on a single Application Load Balancer to serve traffic for different domains. Which feature makes this possible?
**Options:**
- A) SSL Termination
- B) Server Name Indication (SNI)
- C) Cross-Zone Load Balancing
- D) Connection Draining

## RDS, Aurora & ElastiCache

### Q1. A company runs a production MySQL database on Amazon RDS. The database experiences heavy read traffic during business hours. The company wants to offload read traffic without affecting write performance. What should a solutions architect recommend?
**Options:**
- A) Enable Multi-AZ deployment for the RDS instance
- B) Create Read Replicas and direct read traffic to the replica endpoints
- C) Increase the instance size of the RDS instance
- D) Enable RDS Storage Auto Scaling

### Q2. A company wants to migrate its on-premises Microsoft SQL Server database to AWS with the ability to customize the underlying operating system. Which AWS service should they use?
**Options:**
- A) Amazon RDS for SQL Server
- B) Amazon Aurora
- C) Amazon RDS Custom for SQL Server
- D) Amazon EC2 with SQL Server installed

### Q3. An application uses Amazon Aurora MySQL as its database. The company needs to create a copy of the production database for testing purposes with minimal cost and time. What is the MOST efficient approach?
**Options:**
- A) Create a manual snapshot and restore it to a new Aurora cluster
- B) Use Aurora Database Cloning
- C) Create a Read Replica and promote it
- D) Use AWS Database Migration Service (DMS)

### Q4. A company has a serverless application using AWS Lambda functions that frequently connect to an Amazon RDS MySQL database. During peak hours, the database runs out of connections. What should a solutions architect recommend?
**Options:**
- A) Increase the RDS instance size
- B) Use Amazon RDS Proxy
- C) Switch to Amazon Aurora Serverless
- D) Add Read Replicas

### Q5. A company needs a caching solution that supports data persistence, high availability with automatic failover, and complex data types like sorted sets for a real-time leaderboard. Which solution should they choose?
**Options:**
- A) Amazon ElastiCache for Memcached
- B) Amazon ElastiCache for Redis
- C) Amazon DynamoDB DAX
- D) Amazon CloudFront

### Q6. A company has an unencrypted Amazon RDS database and needs to enable encryption. What is the correct approach?
**Options:**
- A) Enable encryption directly on the existing RDS instance
- B) Create a snapshot of the unencrypted DB, copy the snapshot as encrypted, and restore from the encrypted snapshot
- C) Enable AWS KMS encryption on the EBS volumes attached to RDS
- D) Use SSL/TLS connections to encrypt the database

### Q7. A global company needs a relational database solution that provides sub-second replication across regions and can promote a secondary region in under 1 minute for disaster recovery. Which solution meets these requirements?
**Options:**
- A) Amazon RDS with Cross-Region Read Replicas
- B) Amazon Aurora Global Database
- C) Amazon RDS Multi-AZ deployment
- D) Amazon Aurora with Cross-Region Read Replicas

### Q8. A company stores user session data in ElastiCache and wants to ensure users remain logged in even if an EC2 instance fails. Which caching strategy best supports this use case?
**Options:**
- A) Lazy Loading
- B) Write Through
- C) Session Store with TTL
- D) Cache-aside pattern

## Route 53

### Q1. A company wants to use its domain name (example.com) to point to an Application Load Balancer. Which Route 53 record type should be used?
**Options:**
- A) CNAME record
- B) A record with Alias enabled
- C) NS record
- D) MX record

### Q2. A company is deploying a new version of its application and wants to send 10% of traffic to the new version while keeping 90% on the current version. Which Route 53 routing policy should be used?
**Options:**
- A) Simple routing
- B) Failover routing
- C) Weighted routing
- D) Latency-based routing

### Q3. A company has an application deployed in multiple AWS regions. They want to route users to the region that provides the best performance. Which routing policy should be used?
**Options:**
- A) Geolocation routing
- B) Geoproximity routing
- C) Latency-based routing
- D) Weighted routing

### Q4. A company needs to monitor the health of a database running in a private subnet and use it for Route 53 DNS failover. How should this be configured?
**Options:**
- A) Create a Route 53 health check pointing to the private IP of the database
- B) Create a CloudWatch alarm monitoring the database, then create a Route 53 health check that monitors the CloudWatch alarm
- C) Use a Route 53 calculated health check
- D) Enable VPC peering between Route 53 and the VPC

### Q5. A company has registered a domain with GoDaddy but wants to use Amazon Route 53 to manage DNS records. What steps should they take?
**Options:**
- A) Transfer the domain to Route 53
- B) Create a Hosted Zone in Route 53 and update NS records at GoDaddy to use Route 53 Name Servers
- C) Create CNAME records at GoDaddy pointing to Route 53
- D) It is not possible to use Route 53 with domains registered elsewhere

### Q6. A company wants to restrict content delivery based on the country of the user. They want users in France to be directed to a French server and users in Germany to a German server. All other users should go to a default server. Which routing policy should they use?
**Options:**
- A) Latency-based routing
- B) Geoproximity routing
- C) Geolocation routing
- D) IP-based routing

### Q7. Which of the following CANNOT be set as an Alias record target in Amazon Route 53?
**Options:**
- A) Application Load Balancer
- B) Amazon CloudFront distribution
- C) Amazon EC2 instance DNS name
- D) Amazon S3 website endpoint

### Q8. A company wants to use Route 53 to resolve DNS queries for on-premises resources from within their VPC. The VPC is connected to the on-premises data center via AWS Direct Connect. What should they configure?
**Options:**
- A) Route 53 Resolver Inbound Endpoint
- B) Route 53 Resolver Outbound Endpoint
- C) A Private Hosted Zone
- D) A Public Hosted Zone

## Classic Solutions Architecture

### Q1. A company is designing a web application that stores user session data. The application runs on multiple EC2 instances behind an Application Load Balancer. Users report losing their shopping cart when they are routed to a different instance. What is the BEST solution to maintain session state without modifying the application?
**Options:**
- A) Enable ELB sticky sessions
- B) Store session data in Amazon ElastiCache
- C) Use Amazon EBS to store session data
- D) Store session data in Amazon S3

### Q2. A solutions architect is designing a 3-tier web application. The web tier must be in a public subnet and the database tier must not be directly accessible from the internet. Which architecture meets this requirement?
**Options:**
- A) Place the ALB, EC2 instances, and RDS in public subnets
- B) Place the ALB in a public subnet, EC2 instances in a private subnet, and RDS in a private subnet
- C) Place all components in a private subnet with a NAT Gateway
- D) Place the ALB and EC2 instances in public subnets and RDS in a private subnet

### Q3. A company wants to quickly launch new EC2 instances with pre-installed applications and configurations for a disaster recovery scenario. Which approach provides the FASTEST launch time?
**Options:**
- A) Use EC2 User Data scripts to install and configure applications at boot
- B) Use a Golden AMI with all applications pre-installed
- C) Use AWS CloudFormation to provision the infrastructure
- D) Use a combination of Golden AMI and User Data scripts

### Q4. A company runs a WordPress site on multiple EC2 instances across two Availability Zones. Users upload images that need to be accessible from all instances. Currently, images uploaded to one instance are not visible when users are routed to another instance. What storage solution should be used?
**Options:**
- A) Amazon EBS volumes attached to each instance
- B) Amazon S3
- C) Amazon EFS
- D) Instance store

### Q5. A development team wants to deploy a web application with minimal infrastructure management. They want automatic scaling, load balancing, and health monitoring. The application is written in Node.js. Which AWS service is MOST suitable?
**Options:**
- A) Amazon EC2 with Auto Scaling
- B) AWS Elastic Beanstalk
- C) Amazon ECS
- D) AWS Lambda

### Q6. A company needs to process messages from a web application asynchronously. The processing involves heavy computation that takes several minutes per message. Which Elastic Beanstalk configuration is MOST appropriate?
**Options:**
- A) Web Server Environment Tier with a larger instance type
- B) Worker Environment Tier
- C) Single Instance deployment mode
- D) Web Server Environment Tier with an Auto Scaling group

### Q7. A solutions architect is designing the security groups for a 3-tier architecture. The application runs behind an ALB, with EC2 instances in private subnets, and an RDS database. Which security group configuration follows the principle of least privilege?
**Options:**
- A) Allow all inbound traffic on all security groups
- B) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow traffic from ALB SG; RDS SG: allow traffic from EC2 SG
- C) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow all traffic; RDS SG: allow all traffic
- D) ALB SG: allow HTTP/HTTPS from 0.0.0.0/0; EC2 SG: allow HTTP from 0.0.0.0/0; RDS SG: allow traffic from EC2 SG

## Amazon S3

### Q1. A company needs to store 10TB of data in Amazon S3. The data is accessed once a quarter for reporting purposes and must be retrieved within milliseconds when needed. Which storage class is MOST cost-effective?
**Options:**
- A) S3 Standard
- B) S3 Standard-IA
- C) S3 Glacier Instant Retrieval
- D) S3 Glacier Flexible Retrieval

### Q2. A company has an S3 bucket in us-east-1 and needs to replicate data to a bucket in eu-west-1 for disaster recovery. What prerequisites must be met? (Select TWO)
**Options:**
- A) Both buckets must have versioning enabled
- B) Both buckets must be in the same AWS account
- C) S3 must be given proper IAM permissions
- D) Both buckets must use the same storage class
- E) Server-side encryption must be enabled

### Q3. A company hosts a static website on S3 and receives a 403 Forbidden error when accessing the site. What is the MOST likely cause?
**Options:**
- A) The S3 bucket does not have versioning enabled
- B) The S3 bucket policy does not allow public read access
- C) The S3 bucket is not in the correct region
- D) The objects are encrypted with SSE-KMS

### Q4. A company wants to automatically move objects to a cheaper storage class after they become infrequently accessed, without manual intervention. The access pattern is unpredictable. Which storage class should they use?
**Options:**
- A) S3 Standard-IA
- B) S3 One Zone-IA
- C) S3 Intelligent-Tiering
- D) S3 Glacier Flexible Retrieval

### Q5. A company needs to upload a 10GB file to Amazon S3. Which upload method is REQUIRED?
**Options:**
- A) Single PUT operation
- B) Multi-Part Upload
- C) S3 Transfer Acceleration
- D) AWS Snowball

### Q6. An organization has S3 Replication configured from Bucket A to Bucket B. Bucket B has replication configured to Bucket C. An object is uploaded to Bucket A. Where will this object exist?
**Options:**
- A) Bucket A, Bucket B, and Bucket C
- B) Bucket A and Bucket B only
- C) Bucket A only
- D) All three buckets, but with different version IDs

### Q7. A company needs to store long-term archive data for 7 years with the lowest possible cost. Data retrieval is very rare and can tolerate a wait time of up to 48 hours. Which S3 storage class should they use?
**Options:**
- A) S3 Glacier Instant Retrieval
- B) S3 Glacier Flexible Retrieval
- C) S3 Glacier Deep Archive
- D) S3 Standard-IA

### Q8. Which of the following statements about S3 versioning is TRUE?
**Options:**
- A) Versioning can be enabled at the object level
- B) Files uploaded before versioning was enabled will have version "null"
- C) Suspending versioning deletes all previous versions
- D) Versioning is enabled by default on all new buckets

## S3 Advanced

### Q1. A company stores application logs in S3 Standard. Logs are actively accessed for the first 30 days, then rarely accessed for 90 days, after which they must be deleted. Which S3 configuration meets these requirements with the LOWEST cost?
**Options:**
- A) Use S3 Intelligent-Tiering
- B) Create a lifecycle rule to transition to S3 Standard-IA after 30 days and delete after 120 days
- C) Create a lifecycle rule to transition to S3 Glacier after 30 days and delete after 120 days
- D) Store all logs in S3 One Zone-IA from the start

### Q2. A company needs to generate thumbnail images whenever a photo is uploaded to their S3 bucket. The thumbnail generation should be event-driven. Which solution requires the LEAST operational overhead?
**Options:**
- A) Configure S3 Event Notification to invoke a Lambda function
- B) Use an EC2 instance to poll the S3 bucket for new objects
- C) Use Amazon SQS to queue upload events and process with EC2
- D) Use AWS Step Functions to orchestrate the thumbnail generation

### Q3. A company's S3 bucket receives 20,000 GET requests per second. Performance is becoming an issue. What should a solutions architect recommend to improve performance?
**Options:**
- A) Enable S3 Transfer Acceleration
- B) Distribute objects across multiple prefixes
- C) Enable S3 versioning
- D) Switch to S3 Express One Zone

### Q4. A company wants to receive S3 event notifications with advanced filtering based on object metadata and send them to multiple downstream services including Step Functions and Kinesis Data Firehose. Which solution is MOST appropriate?
**Options:**
- A) S3 Event Notifications to SNS with message filtering
- B) S3 Event Notifications to SQS with message attributes
- C) S3 Event Notifications with Amazon EventBridge
- D) S3 Event Notifications to Lambda for custom routing

### Q5. A company needs to encrypt millions of unencrypted objects in an existing S3 bucket. What is the MOST efficient approach?
**Options:**
- A) Write a script to download each object, encrypt it, and re-upload it
- B) Use S3 Batch Operations to encrypt the objects
- C) Enable default encryption on the bucket and wait for objects to be encrypted
- D) Create a new bucket with encryption and copy all objects

### Q6. A data analytics company wants to share a large dataset stored in S3 with partner companies. The company does not want to pay for the data transfer costs when partners download the data. What should they configure?
**Options:**
- A) S3 Cross-Region Replication to the partner's bucket
- B) S3 Requester Pays
- C) S3 Pre-Signed URLs
- D) S3 Access Points for each partner

### Q7. A company wants to use S3 Storage Lens to analyze storage usage across their AWS Organization with data retained for 15 months and published to CloudWatch. Which tier of S3 Storage Lens is required?
**Options:**
- A) Free Metrics (default)
- B) Advanced Metrics and Recommendations
- C) S3 Analytics
- D) S3 Inventory

### Q8. A company needs to upload large files from their office in Asia to an S3 bucket in us-east-1. They want to maximize upload speed. Which TWO solutions should they use together?
**Options:**
- A) S3 Multi-Part Upload
- B) S3 Transfer Acceleration
- C) S3 Byte-Range Fetches
- D) S3 Requester Pays
- E) S3 Cross-Region Replication

## S3 Security

### Q1. A company needs to encrypt objects in S3 while maintaining full control over encryption keys and being able to audit key usage in AWS CloudTrail. Which encryption method should they use?
**Options:**
- A) SSE-S3
- B) SSE-KMS
- C) SSE-C
- D) Client-Side Encryption

### Q2. A company uses SSE-KMS to encrypt objects in S3 and is experiencing throttling during peak upload periods. The KMS quota is being exceeded. What are TWO possible solutions?
**Options:**
- A) Switch to SSE-S3 encryption
- B) Request a KMS quota increase through the Service Quotas Console
- C) Enable S3 Transfer Acceleration
- D) Use S3 Byte-Range Fetches
- E) Implement exponential backoff and retry logic

### Q3. A company hosts two S3 static websites. The first website needs to make JavaScript requests to the second website's S3 bucket. Users are getting cross-origin errors. What should be configured?
**Options:**
- A) Enable versioning on both S3 buckets
- B) Configure CORS headers on the second S3 bucket (the one being requested)
- C) Create an S3 bucket policy allowing cross-account access
- D) Enable S3 Transfer Acceleration on both buckets

### Q4. A financial services company must store regulatory records in S3 for 7 years. No user, including the root user, should be able to delete or modify these records during the retention period. Which configuration meets this requirement?
**Options:**
- A) S3 Object Lock with Governance mode
- B) S3 Object Lock with Compliance mode
- C) S3 Glacier Vault Lock
- D) S3 bucket policy denying delete actions

### Q5. A company wants to allow a partner organization to temporarily upload files to a specific path in their private S3 bucket without creating IAM users for them. Which solution is MOST appropriate?
**Options:**
- A) Create a bucket policy allowing the partner's AWS account
- B) Generate a pre-signed URL for PUT operations
- C) Make the S3 bucket public temporarily
- D) Create an S3 Access Point for the partner

### Q6. A company wants to ensure that all S3 API requests use HTTPS (encrypted in transit). How should they enforce this?
**Options:**
- A) Enable SSE-S3 encryption on the bucket
- B) Create a bucket policy with a condition denying requests where aws:SecureTransport is false
- C) Enable S3 Transfer Acceleration
- D) Configure the S3 bucket to only expose the HTTPS endpoint

### Q7. A company has different departments (Finance, Sales, Analytics) that need access to specific prefixes in the same S3 bucket with different permissions. They want to simplify permission management. Which feature should they use?
**Options:**
- A) S3 bucket policy with multiple statements
- B) S3 Access Points with separate policies for each department
- C) IAM groups with different S3 permissions
- D) S3 Object Lambda Access Points

### Q8. A company uses S3 to store objects and wants different applications to receive modified versions of the same object. For example, an analytics application needs PII redacted, while a marketing application needs enriched data from an external database. Which solution requires only ONE S3 bucket?
**Options:**
- A) Create two separate S3 buckets with different object versions
- B) Use S3 Object Lambda with different Lambda functions per application
- C) Use S3 replication to create modified copies
- D) Use S3 Batch Operations to create different versions

## CloudFront & Global Accelerator

### Q1. A company hosts a web application on EC2 instances behind an Application Load Balancer. The application serves users globally, and users in distant regions experience high latency. The content includes both static images and dynamic API responses. Which solution will improve performance for ALL users?
**Options:**
- A) Use S3 Cross-Region Replication to copy content to multiple regions
- B) Deploy Amazon CloudFront with the ALB as the origin
- C) Use AWS Global Accelerator with the ALB as the endpoint
- D) Deploy additional ALBs in every AWS region

### Q2. A company stores confidential documents in an S3 bucket and wants to distribute them globally via CloudFront. The documents must NOT be accessible directly from the S3 bucket URL. What should the solutions architect do?
**Options:**
- A) Configure S3 bucket as a static website and use CloudFront
- B) Use CloudFront with Origin Access Control (OAC) and update the S3 bucket policy
- C) Enable S3 Transfer Acceleration and share pre-signed URLs
- D) Use AWS Global Accelerator pointing to the S3 bucket

### Q3. A gaming company is deploying a multiplayer game that uses UDP protocol. Players around the world experience high latency. The company needs a solution that provides static IP addresses and fast regional failover. Which AWS service should they use?
**Options:**
- A) Amazon CloudFront
- B) Amazon Route 53 with latency-based routing
- C) AWS Global Accelerator
- D) Application Load Balancer with cross-zone load balancing

### Q4. A company has deployed a new version of their website. CloudFront is serving stale content from the previous version. The TTL is set to 24 hours. What is the FASTEST way to ensure users see the updated content?
**Options:**
- A) Wait for the TTL to expire
- B) Create a new CloudFront distribution
- C) Perform a CloudFront cache invalidation
- D) Reduce the TTL to 0 seconds

### Q5. A company wants to deliver content from applications hosted in private subnets of their VPC through CloudFront, without exposing them to the internet. Which CloudFront feature should they use?
**Options:**
- A) Origin Access Control (OAC)
- B) CloudFront Signed URLs
- C) VPC Origin
- D) AWS PrivateLink

### Q6. A solutions architect needs to improve the availability of a global application. The application must have fast failover (less than 1 minute) and the company's firewall only allows whitelisting a small number of static IP addresses. Which solution meets these requirements?
**Options:**
- A) Amazon CloudFront with multiple origins
- B) AWS Global Accelerator with health checks
- C) Amazon Route 53 with health checks and failover routing
- D) Application Load Balancer with cross-region load balancing

## Storage Extras

### Q1. A company needs to migrate 80 TB of data from their on-premises data center to Amazon S3. The company has a 1 Gbps internet connection, but it cannot be fully utilized due to other business traffic. The data must be migrated within 2 weeks. What is the MOST cost-effective solution?
**Options:**
- A) Use AWS DataSync over the existing internet connection
- B) Set up an AWS Direct Connect connection and transfer the data
- C) Order an AWS Snowball Edge Storage Optimized device
- D) Use S3 Transfer Acceleration with multipart upload

### Q2. A company wants to import data from Snowball directly into Amazon S3 Glacier for long-term archival. What is the correct approach?
**Options:**
- A) Configure Snowball to import directly into S3 Glacier
- B) Import data into S3 Standard first, then use an S3 Lifecycle Policy to transition to Glacier
- C) Use AWS DataSync to transfer from Snowball to Glacier
- D) Import data into EBS volumes, then create snapshots stored in Glacier

### Q3. A company is running a high-performance computing (HPC) workload that requires a shared file system with sub-millisecond latency. The data is stored in S3 and needs to be processed by hundreds of EC2 instances. Which storage solution is MOST appropriate?
**Options:**
- A) Amazon EFS with Max I/O performance mode
- B) Amazon FSx for Lustre with S3 integration
- C) Amazon FSx for Windows File Server
- D) Amazon S3 with S3 Select

### Q4. A company is migrating their on-premises Windows file server to AWS. The application uses SMB protocol and authenticates users through Microsoft Active Directory. Which AWS service should they use?
**Options:**
- A) Amazon EFS
- B) Amazon FSx for Lustre
- C) Amazon FSx for Windows File Server
- D) Amazon S3 with S3 File Gateway

### Q5. A company needs to provide on-premises applications with low-latency access to frequently used data while storing the full dataset in Amazon S3. Which solution should the solutions architect recommend?
**Options:**
- A) AWS DataSync with scheduled synchronization
- B) Amazon S3 File Gateway with local caching
- C) AWS Snowball Edge with S3 interface
- D) Amazon FSx for NetApp ONTAP

### Q6. A company needs to transfer files to Amazon S3 using SFTP protocol. External partners must authenticate using their existing corporate LDAP directory. Which AWS service meets this requirement?
**Options:**
- A) Amazon S3 with pre-signed URLs
- B) AWS Transfer Family
- C) AWS DataSync
- D) Amazon S3 File Gateway

### Q7. A company needs to synchronize data from their on-premises NFS server to Amazon EFS on a daily schedule. File permissions must be preserved during the transfer. Which AWS service should they use?
**Options:**
- A) AWS Storage Gateway
- B) AWS Transfer Family
- C) AWS DataSync
- D) AWS Snowball Edge

### Q8. A company needs a file system that supports NFS, SMB, and iSCSI protocols simultaneously, and must work with Linux, Windows, MacOS, and VMware Cloud on AWS. Which FSx option should they choose?
**Options:**
- A) Amazon FSx for Windows File Server
- B) Amazon FSx for Lustre
- C) Amazon FSx for NetApp ONTAP
- D) Amazon FSx for OpenZFS

## Integration & Messaging

### Q1. A company has an e-commerce application that processes orders. When a new order is placed, it must be processed by three separate services: inventory management, payment processing, and shipping notification. Each service must receive every order. What architecture should the solutions architect recommend?
**Options:**
- A) Use Amazon SQS with three consumers polling the same queue
- B) Use Amazon SNS topic with three SQS queue subscriptions (Fan Out pattern)
- C) Use Amazon Kinesis Data Streams with three consumers
- D) Use Amazon MQ with three queue consumers

### Q2. A company is processing real-time clickstream data from their website. They need to store the data for 7 days and allow multiple consumers to replay the data for analysis. Which service should they use?
**Options:**
- A) Amazon SQS Standard Queue
- B) Amazon SNS
- C) Amazon Kinesis Data Streams
- D) Amazon Data Firehose

### Q3. A company wants to migrate their on-premises application to AWS. The application uses RabbitMQ with AMQP protocol. The company wants minimal code changes. Which AWS service should they use?
**Options:**
- A) Amazon SQS
- B) Amazon SNS
- C) Amazon Kinesis
- D) Amazon MQ

### Q4. A company wants to load streaming data into Amazon S3 and Amazon Redshift. The data needs minor transformations (CSV to JSON). The solution must be fully managed with automatic scaling. Which service should they use?
**Options:**
- A) Amazon Kinesis Data Streams with Lambda consumer
- B) Amazon Data Firehose with Lambda transformation
- C) Amazon SQS with EC2-based consumer application
- D) Amazon SNS with S3 subscription

### Q5. An application uses Amazon SQS Standard Queue. Messages are sometimes processed more than once, causing duplicate records in the database. The company needs messages to be processed exactly once and in order. What should they do?
**Options:**
- A) Enable Long Polling on the SQS Standard Queue
- B) Increase the Visibility Timeout to prevent duplicates
- C) Migrate to an SQS FIFO Queue
- D) Use SNS instead of SQS

### Q6. A development team is using Amazon SQS. Consumers are making too many empty API calls, increasing costs. What should the team implement to reduce the number of API calls?
**Options:**
- A) Increase the message visibility timeout
- B) Enable Long Polling with WaitTimeSeconds of 20 seconds
- C) Use SQS FIFO Queue instead
- D) Decrease the batch size to 1 message

### Q7. A company receives S3 event notifications when objects are created. They need to send each event to three different SQS queues for parallel processing. For a specific event type and prefix combination, S3 only supports one event rule. How should this be designed?
**Options:**
- A) Create three separate S3 event notification rules for each queue
- B) Use S3 event notification to send to an SNS topic, which fans out to three SQS queues
- C) Use Lambda function triggered by S3 to send messages to three queues
- D) Use Amazon EventBridge to route S3 events to three queues

## Containers on AWS

### Q1. A company is running a containerized application on Amazon ECS with the EC2 launch type. Each task needs to access a specific S3 bucket and DynamoDB table. What is the BEST way to grant permissions to the containers?
**Options:**
- A) Attach IAM policies to the EC2 Instance Profile
- B) Define an ECS Task Role with the required permissions in the task definition
- C) Store AWS credentials in environment variables of the container
- D) Use AWS Secrets Manager to store access keys

### Q2. A company wants to run containers on AWS without managing any servers or EC2 instances. They need persistent shared storage across multiple containers in different Availability Zones. Which combination of services meets this requirement?
**Options:**
- A) Amazon ECS with Fargate launch type and Amazon EBS volumes
- B) Amazon ECS with Fargate launch type and Amazon EFS
- C) Amazon EKS with EC2 launch type and Amazon S3
- D) Amazon ECS with EC2 launch type and instance store

### Q3. A company is using Kubernetes on-premises and wants to migrate to AWS with minimal changes to their existing Kubernetes configurations and tooling. Which AWS service should they use?
**Options:**
- A) Amazon ECS with EC2 launch type
- B) Amazon ECS with Fargate launch type
- C) Amazon EKS
- D) AWS App Runner

### Q4. A company is running ECS with the EC2 launch type. During peak hours, ECS tasks are pending because there are not enough EC2 instances in the cluster. What is the recommended solution to automatically add EC2 instances?
**Options:**
- A) Manually add EC2 instances to the ECS cluster
- B) Use ECS Cluster Capacity Provider paired with an Auto Scaling Group
- C) Switch to Fargate launch type
- D) Increase the desired count of the ECS service

### Q5. A development team wants to deploy a simple web API as a container on AWS. They have no infrastructure experience and want the simplest possible deployment with automatic scaling. Which service should they use?
**Options:**
- A) Amazon ECS with Fargate
- B) Amazon EKS with Managed Node Groups
- C) AWS App Runner
- D) Amazon EC2 with Docker installed

### Q6. A company needs to pull container images from Amazon ECR but is getting authorization errors. What should the solutions architect check?
**Options:**
- A) The ECR repository's encryption settings
- B) The IAM policy attached to the EC2 instance or ECS task role
- C) The VPC security group rules
- D) The ECR image scanning configuration

### Q7. A company wants to migrate their Java web applications running on VMware to AWS containers. They want to generate CloudFormation templates and CI/CD pipelines with minimal code changes. Which tool should they use?
**Options:**
- A) AWS App Runner
- B) AWS Copilot CLI
- C) AWS App2Container (A2C)
- D) AWS Migration Hub

## Serverless Overview

### Q1. A company has a Lambda function that processes files uploaded to S3. During peak hours, users report that some files are not processed. The function takes about 2 minutes to complete. CloudWatch logs show ThrottleError (429). What should the solutions architect do?
**Options:**
- A) Increase the Lambda function timeout to 15 minutes
- B) Request a concurrency limit increase through AWS Support
- C) Switch to Amazon EC2 instances for processing
- D) Reduce the Lambda function memory allocation

### Q2. A company needs to run a data processing job that takes 30 minutes to complete. They want a serverless solution. Which service should they use?
**Options:**
- A) AWS Lambda
- B) AWS Fargate with Amazon ECS
- C) Amazon EC2 Spot Instances
- D) AWS Batch on EC2

### Q3. A company has a DynamoDB table that is used globally. Users in the US and Europe need low-latency read and write access. What feature should they enable?
**Options:**
- A) DynamoDB DAX
- B) DynamoDB Global Tables
- C) DynamoDB On-Demand capacity mode
- D) DynamoDB Point-in-Time Recovery

### Q4. A company has a public-facing REST API using API Gateway. They need to authenticate mobile app users. The users sign up with email/password and can also log in with their Facebook accounts. Which service should they use for authentication?
**Options:**
- A) IAM Users and Groups
- B) Amazon Cognito User Pools
- C) API Gateway API Keys
- D) AWS IAM Identity Center (SSO)

### Q5. A mobile application needs to allow authenticated users to upload files directly to their own folder in an S3 bucket. Users authenticate through Cognito User Pools. How should the solutions architect provide S3 access?
**Options:**
- A) Generate IAM users for each mobile app user
- B) Use Cognito Identity Pools to provide temporary AWS credentials with IAM policies scoped to the user's folder
- C) Create pre-signed URLs for each upload
- D) Make the S3 bucket public with folder-level ACLs

### Q6. A company wants to customize CloudFront responses by adding security headers to every response. The function must handle millions of requests per second with sub-millisecond latency. Which solution is MOST appropriate?
**Options:**
- A) Lambda@Edge function triggered on Viewer Response
- B) CloudFront Functions triggered on Viewer Response
- C) AWS WAF custom rules on CloudFront
- D) Origin server middleware to add headers

### Q7. A Lambda function needs to connect to an RDS PostgreSQL database in a VPC. During traffic spikes, the database becomes overwhelmed with too many connections. What is the BEST solution?
**Options:**
- A) Increase the RDS instance size
- B) Deploy the Lambda function in the VPC and use RDS Proxy
- C) Use DynamoDB instead of RDS
- D) Implement connection caching in the Lambda function code

### Q8. A DynamoDB table has many read operations but few write operations. The application requires microsecond latency for read operations. Which caching solution should be used?
**Options:**
- A) Amazon ElastiCache Redis
- B) DynamoDB Accelerator (DAX)
- C) Amazon CloudFront
- D) API Gateway caching

## Serverless Architectures

### Q1. A company is building a mobile application where users need to authenticate and then directly upload files to their own folder in an S3 bucket. The solution must be serverless and scalable. Which combination of services should the solutions architect use?
**Options:**
- A) IAM users for each mobile user with S3 bucket policies
- B) Amazon Cognito User Pools for authentication and Cognito Identity Pools for temporary AWS credentials to access S3
- C) API Gateway with Lambda to proxy all S3 uploads
- D) CloudFront signed URLs for S3 access

### Q2. A serverless blog website uses DynamoDB as the database. Most operations are reads, and users report slow response times. The architecture uses API Gateway -> Lambda -> DynamoDB. What TWO caching strategies should be implemented to improve performance? (Select TWO)
**Options:**
- A) Enable ElastiCache Redis cluster
- B) Enable DynamoDB Accelerator (DAX) for database caching
- C) Enable API Gateway response caching
- D) Use S3 as a caching layer
- E) Increase DynamoDB read capacity units

### Q3. A company wants to build a globally distributed serverless website. Static content (HTML, CSS, JS) must be served with low latency worldwide. The S3 bucket must not be publicly accessible. Which architecture should the solutions architect implement?
**Options:**
- A) S3 with static website hosting enabled and public access
- B) CloudFront distribution with S3 as origin, using Origin Access Control (OAC) and S3 bucket policy
- C) S3 Cross-Region Replication to multiple regions
- D) Global Accelerator pointing to S3 buckets in multiple regions

### Q4. A company runs an application on EC2 instances that periodically distributes large software updates. During releases, the traffic spikes cause high EC2 costs. The company wants to reduce costs WITHOUT modifying the application. What should the solutions architect recommend?
**Options:**
- A) Migrate the application to AWS Lambda
- B) Place Amazon CloudFront in front of the existing application
- C) Use S3 Transfer Acceleration for faster downloads
- D) Scale up to larger EC2 instances during releases

### Q5. A serverless application uses DynamoDB Global Tables for multi-region data access. When a new user registers, the application should send a welcome email. What is the BEST serverless approach to trigger the email?
**Options:**
- A) Use a CloudWatch Event rule to monitor DynamoDB
- B) Enable DynamoDB Streams and trigger a Lambda function that sends email via Amazon SES
- C) Use API Gateway to trigger an SNS notification after user registration
- D) Schedule a Lambda function to periodically scan the DynamoDB table for new users

### Q6. A company is designing a microservices architecture. Service A processes orders synchronously, Service B handles analytics asynchronously from order events, and Service C sends email notifications for each order. What is the BEST architecture?
**Options:**
- A) Service A sends messages directly to Service B and Service C
- B) Service A publishes to an SNS topic, Service B subscribes via SQS queue, Service C subscribes via SQS queue
- C) Service A writes to a Kinesis Data Stream consumed by Service B and Service C
- D) Service A stores data in S3, Service B and Service C poll S3 for new files

### Q7. A company needs to process images uploaded to S3 by generating thumbnails. The processing takes about 30 seconds per image. During peak hours, thousands of images are uploaded per minute. Which serverless architecture is MOST appropriate?
**Options:**
- A) S3 Event Notification -> Lambda function to generate thumbnails
- B) S3 Event Notification -> SQS Queue -> EC2 instances to process
- C) CloudWatch Events -> Step Functions -> Lambda
- D) S3 Event Notification -> SNS -> Email notification

## Databases in AWS

### Q1. A company needs to migrate their on-premises MongoDB database to AWS with minimal application code changes. The database stores JSON documents and requires high availability across multiple Availability Zones. Which AWS database service should they use?
**Options:**
- A) Amazon RDS for MongoDB
- B) Amazon DynamoDB
- C) Amazon DocumentDB
- D) Amazon Neptune

### Q2. A startup is building a serverless application that requires a database with single-digit millisecond latency. The application traffic is unpredictable, and the team wants to avoid capacity planning. Which database configuration is MOST suitable?
**Options:**
- A) Amazon RDS with Multi-AZ
- B) Amazon Aurora Serverless
- C) Amazon DynamoDB with on-demand capacity
- D) Amazon ElastiCache with Redis

### Q3. A social media company needs to store and query user relationships, including friends, followers, and shared content. The queries involve traversing multiple levels of connections. Which database is BEST suited?
**Options:**
- A) Amazon DynamoDB
- B) Amazon RDS for PostgreSQL
- C) Amazon Neptune
- D) Amazon DocumentDB

### Q4. A company runs an Oracle database on-premises and needs to migrate to AWS. Their DBA requires OS-level access to customize the database configuration. Which service should they use?
**Options:**
- A) Amazon RDS for Oracle
- B) Amazon RDS Custom for Oracle
- C) Amazon Aurora
- D) Oracle on Amazon EC2

### Q5. An IoT company collects sensor data from millions of devices and needs to store time-stamped readings for real-time analytics. The solution should automatically manage data lifecycle, keeping recent data in fast storage and older data in cost-optimized storage. Which service is MOST appropriate?
**Options:**
- A) Amazon DynamoDB with TTL
- B) Amazon Timestream
- C) Amazon Redshift
- D) Amazon RDS with partitioning

### Q6. A company uses DynamoDB for their e-commerce application and experiences extremely high read traffic during sales events. They need to reduce read latency from milliseconds to microseconds. What should they implement?
**Options:**
- A) DynamoDB Read Replicas
- B) Amazon ElastiCache in front of DynamoDB
- C) DynamoDB Accelerator (DAX)
- D) DynamoDB On-Demand capacity mode

### Q7. A company needs a globally distributed database that allows read and write operations in multiple AWS regions simultaneously. Which solution provides active-active multi-region capability?
**Options:**
- A) Amazon Aurora Global Database
- B) Amazon RDS Multi-AZ
- C) Amazon DynamoDB Global Tables
- D) Amazon ElastiCache Global Datastore

## Data & Analytics

### Q1. A company stores application logs in Amazon S3 in CSV format. They want to run ad-hoc SQL queries to analyze the logs without managing any infrastructure. The solution should be cost-effective. Which approach should they use?
**Options:**
- A) Load data into Amazon Redshift and query using SQL
- B) Use Amazon Athena to query data directly in S3
- C) Set up an Amazon EMR cluster with Hive
- D) Use Amazon RDS to import and query the data

### Q2. A data engineering team uses Amazon Athena to query large datasets in S3. They want to reduce query costs significantly. What is the MOST effective approach?
**Options:**
- A) Use larger EC2 instances for Athena
- B) Convert data to Apache Parquet format using AWS Glue
- C) Enable S3 Transfer Acceleration
- D) Use S3 Intelligent-Tiering storage class

### Q3. A company needs to perform complex joins and aggregations on petabytes of structured data for their business intelligence reporting. The queries run frequently throughout the day. Which service is MOST appropriate?
**Options:**
- A) Amazon Athena
- B) Amazon Redshift
- C) Amazon DynamoDB
- D) Amazon EMR with Apache Hive

### Q4. A company uses DynamoDB as their primary database. They need to implement a search feature that allows users to search across multiple fields with partial text matching. Which architecture should they implement?
**Options:**
- A) Use DynamoDB Global Secondary Indexes
- B) Use DynamoDB with DynamoDB Streams to sync data to Amazon OpenSearch
- C) Switch to Amazon RDS with full-text search
- D) Use Amazon Athena to query DynamoDB

### Q5. A company wants to build a centralized data lake on AWS. They need fine-grained access control at the row and column level for different teams accessing the data through Athena and Redshift. Which service should they use?
**Options:**
- A) AWS Glue with IAM policies
- B) Amazon S3 with bucket policies
- C) AWS Lake Formation
- D) Amazon Redshift with row-level security

### Q6. A company needs to process real-time streaming data from Apache Kafka topics using Apache Flink. They want a fully managed solution. Which service should they use?
**Options:**
- A) Amazon Kinesis Data Firehose
- B) Amazon Managed Service for Apache Flink with Amazon MSK as source
- C) AWS Glue Streaming ETL
- D) Amazon EMR with Apache Flink

### Q7. A company wants to create interactive business dashboards that can be embedded in their web application. They need per-session pricing and want to leverage in-memory computation for fast performance. Which service should they use?
**Options:**
- A) Amazon Athena with custom visualization
- B) Amazon QuickSight with SPICE engine
- C) Amazon Redshift with a BI tool
- D) Amazon OpenSearch Dashboards

### Q8. A data team needs to discover metadata about datasets stored across S3, RDS, and DynamoDB, and make this metadata available for querying with Athena and Redshift Spectrum. Which service provides this capability?
**Options:**
- A) AWS Lake Formation
- B) AWS Glue Data Catalog
- C) Amazon Athena Data Source Connectors
- D) AWS Config

## Machine Learning

### Q1. A media company needs to automatically generate subtitles for their video content in multiple languages. Which combination of AWS services should they use?
**Options:**
- A) Amazon Polly and Amazon Translate
- B) Amazon Transcribe and Amazon Translate
- C) Amazon Rekognition and Amazon Translate
- D) Amazon Comprehend and Amazon Polly

### Q2. A company wants to build a cloud-based contact center that can automatically handle customer inquiries using conversational AI before routing to human agents. Which combination of AWS services provides this capability?
**Options:**
- A) Amazon Polly and Amazon SQS
- B) Amazon Lex and Amazon Connect
- C) Amazon Comprehend and Amazon SNS
- D) Amazon Transcribe and Amazon SES

### Q3. A healthcare company needs to analyze medical records stored as unstructured text to extract Protected Health Information (PHI) for compliance purposes. Which service should they use?
**Options:**
- A) Amazon Comprehend
- B) Amazon Comprehend Medical
- C) Amazon Textract
- D) Amazon Kendra

### Q4. A social media platform needs to automatically detect and flag inappropriate content in user-uploaded images. When the system is unsure, it should route the content for human review. Which approach should they take?
**Options:**
- A) Amazon Textract with manual review queue
- B) Amazon Rekognition Content Moderation with Amazon Augmented AI (A2I)
- C) Amazon Comprehend with SNS notifications
- D) Amazon SageMaker with custom model

### Q5. A company wants to add a natural language search capability to their internal knowledge base. Users should be able to ask questions in plain English and get precise answers from documents stored in S3 and SharePoint. Which service is BEST suited?
**Options:**
- A) Amazon OpenSearch Service
- B) Amazon Kendra
- C) Amazon Comprehend
- D) Amazon Athena

### Q6. An e-commerce company wants to provide personalized product recommendations to users on their website. They want to use the same technology that Amazon.com uses. Which service should they implement?
**Options:**
- A) Amazon SageMaker with custom recommendation model
- B) Amazon Personalize
- C) Amazon Comprehend
- D) Amazon Kendra

### Q7. A government agency needs to process thousands of tax forms and extract structured data from them, including handwritten fields. Which AWS service should they use?
**Options:**
- A) Amazon Rekognition
- B) Amazon Comprehend
- C) Amazon Textract
- D) Amazon Transcribe

## Monitoring, Audit & Performance

### Q1. A company needs to monitor the memory utilization of their EC2 instances and trigger an alarm when it exceeds 80%. The default CloudWatch metrics do not include memory. What should they do?
**Options:**
- A) Enable detailed monitoring on the EC2 instances
- B) Install the CloudWatch Unified Agent on the instances
- C) Use CloudWatch Logs Insights to query memory data
- D) Enable CloudWatch Container Insights

### Q2. A security team needs to be notified immediately when someone modifies a security group in their AWS account. Which solution provides this capability?
**Options:**
- A) AWS Config with SNS notification
- B) CloudWatch Alarms on security group metrics
- C) CloudTrail with Amazon EventBridge rule
- D) VPC Flow Logs analysis

### Q3. A company wants to export CloudWatch Logs to S3 for long-term archival but needs the data to be available within minutes. What should they use?
**Options:**
- A) CreateExportTask API
- B) CloudWatch Logs Subscription Filter with Kinesis Data Firehose
- C) CloudWatch Logs Insights query to S3
- D) CloudWatch Metric Streams

### Q4. A company uses AWS Config to ensure all their S3 buckets have encryption enabled. When a non-compliant bucket is found, they want it to be automatically remediated. How should they configure this?
**Options:**
- A) Use AWS Config Rules with deny policy to prevent unencrypted buckets
- B) Use AWS Config Rules with SSM Automation Documents for auto-remediation
- C) Use CloudWatch Alarms to trigger Lambda for remediation
- D) Use CloudTrail to detect and revert changes

### Q5. A company wants to detect unusual API activity in their AWS account, such as a sudden burst of IAM actions or inaccurate resource provisioning. Which feature should they enable?
**Options:**
- A) CloudWatch Application Insights
- B) CloudTrail Insights
- C) AWS Config Rules
- D) CloudWatch Contributor Insights

### Q6. An organization needs to aggregate CloudWatch Logs from multiple AWS accounts and regions into a single destination for centralized analysis. Which approach should they use?
**Options:**
- A) Enable CloudWatch cross-account dashboards
- B) Use CloudWatch Logs Subscription Filters with Kinesis Data Streams
- C) Export logs from each account to a shared S3 bucket
- D) Use AWS Config aggregator

### Q7. For an Elastic Load Balancer, which service would you use to track the CONFIGURATION changes and ensure an SSL certificate is always assigned?
**Options:**
- A) Amazon CloudWatch
- B) AWS CloudTrail
- C) AWS Config
- D) Amazon EventBridge

### Q8. A company wants to reduce alarm noise by only triggering notifications when BOTH CPU utilization exceeds 80% AND disk IOPS exceed a threshold on the same EC2 instance. Which CloudWatch feature should they use?
**Options:**
- A) CloudWatch Metrics Math
- B) CloudWatch Composite Alarms
- C) CloudWatch Contributor Insights
- D) CloudWatch Anomaly Detection

## Advanced Identity

### Q1. A company wants to prevent any IAM user or role in their development accounts from launching EC2 instances in the us-west-1 region, while allowing all other regions. They use AWS Organizations. What is the BEST approach?
**Options:**
- A) Create IAM policies in each development account to deny us-west-1
- B) Apply a Service Control Policy (SCP) to the Development OU that denies EC2 actions in us-west-1
- C) Use AWS Config rules to detect EC2 instances in us-west-1
- D) Create a Permission Boundary for all users in development accounts

### Q2. A user in Account A needs to scan a DynamoDB table in Account A and write the results to an S3 bucket in Account B. The user needs to maintain their DynamoDB permissions while accessing the S3 bucket. What is the BEST approach?
**Options:**
- A) Create an IAM role in Account B and have the user assume it
- B) Use a resource-based policy (S3 bucket policy) on Account B's S3 bucket
- C) Create a cross-account IAM user in Account B
- D) Use AWS Organizations consolidated access

### Q3. A company wants to implement single sign-on for their employees to access multiple AWS accounts in their AWS Organization and third-party SaaS applications like Salesforce. Which service should they use?
**Options:**
- A) Amazon Cognito
- B) AWS IAM with cross-account roles
- C) AWS IAM Identity Center
- D) AWS Directory Service

### Q4. A company has an on-premises Active Directory and wants to allow their users to authenticate against it when accessing AWS resources. They do NOT want to manage any AD infrastructure in AWS. Which AWS Directory Service option should they use?
**Options:**
- A) AWS Managed Microsoft AD
- B) AD Connector
- C) Simple AD
- D) Amazon Cognito User Pool

### Q5. A company allows developers to create their own IAM policies. However, they want to ensure developers cannot escalate their privileges to administrator access. Which feature should they use?
**Options:**
- A) Service Control Policies (SCP)
- B) IAM Permission Boundaries
- C) AWS Config Rules
- D) IAM Access Analyzer

### Q6. An organization wants to restrict access to an S3 bucket so that only accounts within their AWS Organization can access it. Which IAM condition key should they use in the S3 bucket policy?
**Options:**
- A) aws:SourceIp
- B) aws:RequestedRegion
- C) aws:PrincipalOrgID
- D) aws:MultiFactorAuthPresent

### Q7. A company is setting up a new multi-account AWS environment and wants to automate the provisioning of accounts with guardrails for security and compliance. They need both preventive controls (blocking certain actions) and detective controls (identifying non-compliant resources). Which service should they use?
**Options:**
- A) AWS Organizations with SCPs only
- B) AWS Control Tower
- C) AWS Config with AWS CloudFormation
- D) AWS IAM Identity Center

## Security & Encryption

### Q1. A company needs to encrypt data at rest using encryption keys that they fully control. They require FIPS 140-2 Level 3 compliance and dedicated hardware. Which service should they use?
**Options:**
- A) AWS KMS with Customer Managed Keys
- B) AWS CloudHSM
- C) AWS KMS with AWS Managed Keys
- D) Server-Side Encryption with S3 Managed Keys (SSE-S3)

### Q2. A company wants to share an encrypted AMI with another AWS account. The AMI is encrypted with a Customer Managed KMS Key. What steps are required? (Select TWO)
**Options:**
- A) Add a Launch Permission for the target account on the AMI
- B) Share the AWS Managed KMS Key with the target account
- C) Share the Customer Managed KMS Key with the target account via KMS Key Policy
- D) Create a new unencrypted copy of the AMI and share it
- E) The target account needs no additional permissions

### Q3. A company wants to protect their web application running behind an Application Load Balancer from SQL injection and cross-site scripting attacks. They also want to block requests from specific countries. Which service should they use?
**Options:**
- A) AWS Shield Standard
- B) AWS Network Firewall
- C) AWS WAF
- D) Security Groups

### Q4. A company frequently experiences DDoS attacks on their application. They need 24/7 access to AWS DDoS experts and automatic Layer 7 attack mitigation. They also want protection against DDoS-related billing spikes. Which solution should they choose?
**Options:**
- A) AWS Shield Standard with AWS WAF
- B) AWS Shield Advanced
- C) AWS Firewall Manager
- D) Amazon GuardDuty

### Q5. A company needs to automatically detect if any of their S3 buckets contain personally identifiable information (PII) such as credit card numbers or social security numbers. Which service should they use?
**Options:**
- A) Amazon GuardDuty
- B) Amazon Inspector
- C) Amazon Macie
- D) AWS Config

### Q6. A company stores secrets for their RDS database connections and needs automatic rotation of these secrets every 30 days. Which service is MOST appropriate?
**Options:**
- A) AWS Systems Manager Parameter Store (Advanced)
- B) AWS Secrets Manager
- C) AWS KMS
- D) AWS CloudHSM

### Q7. A company uses an edge-optimized API Gateway and needs to attach a TLS certificate from ACM. In which region must the ACM certificate be created?
**Options:**
- A) The same region as the API Gateway
- B) us-east-1
- C) Any region, as ACM certificates are global
- D) The region closest to the majority of users

### Q8. A company wants to manage WAF rules, Shield Advanced protections, and security group configurations across all accounts in their AWS Organization. New accounts should automatically inherit these security rules. Which service should they use?
**Options:**
- A) AWS Config
- B) AWS WAF with cross-account rules
- C) AWS Firewall Manager
- D) AWS Organizations SCPs

## Amazon VPC

### Q1. A company has a VPC with a CIDR block of 10.0.0.0/24 in a subnet. How many IP addresses are available for EC2 instances?
**Options:**
- A) 256
- B) 251
- C) 254
- D) 250

### Q2. A solutions architect needs to allow EC2 instances in a private subnet to access the internet for software updates while preventing inbound connections from the internet. The solution must be highly available and require minimal operational overhead. What should the architect recommend?
**Options:**
- A) Deploy a NAT instance in a public subnet across multiple AZs using an Auto Scaling group
- B) Deploy a NAT Gateway in each public subnet across multiple AZs
- C) Deploy a single NAT Gateway in one public subnet
- D) Configure an Internet Gateway and update the private subnet route table

### Q3. A company wants to block a specific IP address from accessing their EC2 instances. The instances are behind an Application Load Balancer. Which approach should be used?
**Options:**
- A) Modify the EC2 instance security group to deny the IP address
- B) Create a NACL rule to deny the IP address on the subnet where the ALB is deployed
- C) Use AWS WAF with an IP-based rule attached to the ALB
- D) Modify the ALB security group to deny the IP address

### Q4. A company needs to connect their on-premises data center to AWS VPC with a dedicated, private connection that provides consistent network performance. The connection must also be encrypted. What solution should be implemented?
**Options:**
- A) AWS Site-to-Site VPN only
- B) AWS Direct Connect only
- C) AWS Direct Connect with Site-to-Site VPN
- D) AWS VPN CloudHub

### Q5. A company has VPCs in multiple AWS regions and on-premises data centers. They need to create a hub-and-spoke network topology to connect all VPCs and on-premises locations with transitive routing. Which service should they use?
**Options:**
- A) VPC Peering
- B) AWS Direct Connect Gateway
- C) AWS Transit Gateway
- D) AWS VPN CloudHub

### Q6. An application running in a private subnet needs to access Amazon S3. The solutions architect wants to ensure that the traffic does not traverse the public internet and the solution should be cost-effective. What should the architect do?
**Options:**
- A) Create a VPC Interface Endpoint for S3
- B) Create a VPC Gateway Endpoint for S3
- C) Deploy a NAT Gateway and route S3 traffic through it
- D) Create a VPC peering connection with the S3 service VPC

### Q7. A VPC Flow Log shows an inbound request was ACCEPTED but the corresponding outbound response was REJECTED. What is the most likely cause?
**Options:**
- A) The Security Group is blocking the outbound traffic
- B) The NACL is blocking the outbound traffic
- C) The route table has no route to the destination
- D) The Internet Gateway is misconfigured

### Q8. A company requires a network connection from their on-premises data center to multiple VPCs in different AWS regions through a single physical connection. What combination of services should they use?
**Options:**
- A) AWS Site-to-Site VPN + Transit Gateway
- B) AWS Direct Connect + Direct Connect Gateway
- C) AWS Direct Connect + VPC Peering
- D) AWS VPN CloudHub + Transit Gateway

## Disaster Recovery & Migrations

### Q1. A company requires a disaster recovery strategy with an RTO of less than 1 minute and can tolerate minimal data loss. The company is willing to pay for maintaining a full production environment. Which DR strategy should they implement?
**Options:**
- A) Backup and Restore
- B) Pilot Light
- C) Warm Standby
- D) Multi Site / Hot Site

### Q2. A company needs to migrate an on-premises Oracle database to Amazon Aurora PostgreSQL. Which AWS services should they use?
**Options:**
- A) AWS DMS only
- B) AWS DMS with AWS SCT
- C) AWS SCT only
- D) AWS Application Migration Service

### Q3. A company wants to ensure that their AWS backups cannot be deleted by anyone, including the root user, to protect against ransomware attacks. Which feature should they enable?
**Options:**
- A) S3 Object Lock
- B) AWS Backup Vault Lock
- C) AWS KMS key rotation
- D) IAM deny policies on backup deletion

### Q4. A solutions architect needs to migrate a large MySQL database running on-premises to Amazon Aurora MySQL with minimal downtime. Both databases will be running simultaneously during migration. Which approach is MOST appropriate?
**Options:**
- A) Use Percona XtraBackup to create a backup in S3 and restore to Aurora
- B) Use mysqldump to export and import the data
- C) Use AWS DMS with continuous data replication
- D) Create an RDS MySQL Read Replica and promote it

### Q5. A company needs to transfer 200 TB of data to AWS as quickly as possible. Their internet connection is 100 Mbps. What is the FASTEST method?
**Options:**
- A) Use AWS Direct Connect with 1 Gbps capacity
- B) Use AWS Site-to-Site VPN
- C) Use AWS Snowball
- D) Use S3 Transfer Acceleration

### Q6. A company is using AWS DMS to migrate their database. They want to ensure high availability of the replication instance. What should they enable?
**Options:**
- A) DMS Read Replicas
- B) DMS Multi-AZ deployment
- C) DMS Auto Scaling
- D) DMS Cross-Region replication

### Q7. A company wants to plan a large-scale migration to AWS and needs to gather detailed information about their on-premises servers, including running processes and network connections between systems. Which service and discovery method should they use?
**Options:**
- A) AWS Application Discovery Service - Agentless Discovery
- B) AWS Application Discovery Service - Agent-based Discovery
- C) AWS Migration Hub
- D) AWS Application Migration Service

## More Solutions Architecture

### Q1. A company wants to process S3 object uploads by sending notifications to multiple independent consumers. Each consumer must receive every message. What is the BEST architecture?
**Options:**
- A) Configure S3 event notifications to send to multiple SQS queues directly
- B) Configure S3 event notifications to an SNS topic, then subscribe multiple SQS queues to the topic
- C) Use S3 event notifications with Lambda to write to multiple SQS queues
- D) Configure S3 event notifications to EventBridge, then send to multiple SQS queues

### Q2. A company needs to block traffic from specific IP addresses to their web application running behind an Application Load Balancer and CloudFront. Which combination provides the MOST effective solution?
**Options:**
- A) Configure NACL rules to deny the IP addresses
- B) Configure Security Group rules on the ALB to deny the IP addresses
- C) Configure AWS WAF with IP-based rules on CloudFront
- D) Configure Security Group rules on the EC2 instances

### Q3. A company is running a tightly coupled High Performance Computing (HPC) workload that requires low-latency, high-throughput inter-node communication on Linux instances. Which combination of AWS features should they use?
**Options:**
- A) Spread Placement Group with Enhanced Networking (ENA)
- B) Cluster Placement Group with Elastic Fabric Adapter (EFA)
- C) Partition Placement Group with ENA
- D) Cluster Placement Group with Enhanced Networking (ENA)

### Q4. A solutions architect needs to design a highly available single EC2 instance with a static IP address that automatically recovers if the instance fails. The solution must also preserve the data on the attached EBS volume. What approach should be used?
**Options:**
- A) Use CloudWatch alarms to reboot the instance and reassign the Elastic IP
- B) Use an Auto Scaling group with min/max/desired of 1 across multiple AZs with lifecycle hooks to manage EBS snapshots and Elastic IP attachment
- C) Use EC2 Auto Recovery feature with an Elastic IP
- D) Use a Network Load Balancer with a single target instance

### Q5. A company wants to use Amazon S3 event notifications with advanced filtering based on object metadata and the ability to send events to AWS Step Functions. What should they use?
**Options:**
- A) S3 Event Notifications directly to Step Functions
- B) S3 Event Notifications to SNS, then to Step Functions
- C) S3 Event Notifications with Amazon EventBridge
- D) S3 Event Notifications to Lambda, then to Step Functions

### Q6. For a High Performance Computing workload, which storage solution provides millions of IOPS and is optimized for distributed file systems backed by S3?
**Options:**
- A) Amazon EFS with Provisioned Throughput
- B) Amazon EBS io2 Block Express
- C) Amazon FSx for Lustre
- D) Amazon S3 with Transfer Acceleration

## Other Services

### Q1. A company wants to allow developers to create CloudFormation stacks that provision S3 buckets, but developers should not have direct permissions to create S3 buckets. How can this be achieved?
**Options:**
- A) Grant developers S3 full access permissions
- B) Use a CloudFormation Service Role with S3 permissions and grant developers iam:PassRole and cloudformation:* permissions
- C) Use AWS Organizations Service Control Policies to allow CloudFormation to create S3 buckets
- D) Create an IAM policy that allows S3 bucket creation only through CloudFormation

### Q2. A company needs to securely connect to EC2 instances in a private subnet without using SSH keys or opening port 22. Session logs must be stored for auditing. Which solution should they use?
**Options:**
- A) Use a Bastion Host in a public subnet
- B) Use AWS Systems Manager Session Manager
- C) Use EC2 Instance Connect
- D) Use AWS Direct Connect

### Q3. A company needs to run a data processing job that takes 3 hours to complete and requires a custom Docker container. The job runs daily and they want to minimize costs. Which service should they use?
**Options:**
- A) AWS Lambda
- B) Amazon ECS with Fargate
- C) AWS Batch with Spot Instances
- D) Amazon EC2 On-Demand instances

### Q4. A company wants to create targeted marketing campaigns across email, SMS, and push notifications with the ability to create customer segments and message templates. Which AWS service should they use?
**Options:**
- A) Amazon SES
- B) Amazon SNS
- C) Amazon Pinpoint
- D) Amazon SQS

### Q5. A company wants to integrate data from Salesforce into Amazon S3 on a scheduled basis. The data should be filtered and validated before being stored. Which service should they use?
**Options:**
- A) AWS Glue ETL
- B) Amazon AppFlow
- C) AWS DataSync
- D) AWS DMS

### Q6. A company wants to reduce their AWS costs by automatically stopping EC2 instances and RDS instances outside of business hours. Which solution requires the LEAST operational overhead?
**Options:**
- A) Write a Lambda function triggered by CloudWatch Events
- B) Use AWS Instance Scheduler solution
- C) Use EC2 Auto Scaling scheduled actions only
- D) Manually stop and start instances each day

## White Papers & Architectures

### Q1. A company wants to review their AWS architecture against best practices across all six pillars of the Well-Architected Framework. Which tool should they use?
**Options:**
- A) AWS Trusted Advisor
- B) AWS Well-Architected Tool
- C) AWS Config
- D) AWS CloudFormation

### Q2. Which of the following is NOT one of the six pillars of the AWS Well-Architected Framework?
**Options:**
- A) Operational Excellence
- B) Scalability
- C) Sustainability
- D) Cost Optimization

### Q3. An organization has a Business Support plan and wants to programmatically access AWS account-level recommendations for cost optimization, security, and service limits. Which service provides this capability?
**Options:**
- A) AWS Well-Architected Tool
- B) AWS Trusted Advisor with AWS Support API
- C) AWS Cost Explorer
- D) AWS Config

### Q4. A solutions architect is designing a new application architecture. According to the AWS Well-Architected Framework general guiding principles, what approach should the architect take regarding capacity planning?
**Options:**
- A) Over-provision resources to handle peak capacity
- B) Under-provision resources and scale manually when needed
- C) Stop guessing capacity needs and use auto scaling
- D) Use the largest instance types available to ensure performance

### Q5. Which AWS service provides recommendations across cost optimization, performance, security, fault tolerance, service limits, and operational excellence without requiring any software installation?
**Options:**
- A) AWS Inspector
- B) AWS Trusted Advisor
- C) AWS GuardDuty
- D) AWS Well-Architected Tool

## Exam Preparation

### Q1. A company is designing a multi-tier web application on AWS. They want to ensure the architecture follows AWS best practices. Which combination of actions aligns with the AWS Well-Architected Framework? (Select TWO)
**Options:**
- A) Over-provision all resources to handle unexpected traffic spikes
- B) Use Auto Scaling to dynamically adjust capacity based on demand
- C) Test systems only in development environments
- D) Use data-driven approaches to make architectural decisions
- E) Design a fixed architecture that never changes

### Q2. During the SAA-C03 exam, you encounter a question with four possible answers. Two answers describe simple, straightforward solutions using managed AWS services. The other two describe complex custom solutions involving multiple Lambda functions, custom scripts, and manual configuration. What is the BEST approach?
**Options:**
- A) Choose the most complex solution as it likely covers all edge cases
- B) Eliminate the complex solutions first and evaluate the simpler managed service solutions
- C) Choose the solution with the most AWS services mentioned
- D) Skip the question entirely

### Q3. A solutions architect needs to evaluate their organization's AWS account for potential security vulnerabilities, cost savings opportunities, and service limit issues. They need programmatic access to these recommendations. Which combination is required?
**Options:**
- A) AWS Well-Architected Tool + Basic Support Plan
- B) AWS Trusted Advisor + Developer Support Plan
- C) AWS Trusted Advisor + Business Support Plan
- D) AWS Config + Enterprise Support Plan

### Q4. A company wants to understand how different AWS services work together for a serverless architecture. Which resources should the solutions architect consult? (Select TWO)
**Options:**
- A) https://aws.amazon.com/architecture/
- B) https://aws.amazon.com/solutions/
- C) AWS CloudFormation documentation only
- D) AWS pricing calculator only
- E) Individual EC2 instance specifications

### Q5. What is the minimum passing score for the AWS Solutions Architect Associate (SAA-C03) exam, and how many questions are on the exam?
**Options:**
- A) 700/1000, 50 questions
- B) 720/1000, 65 questions
- C) 750/1000, 75 questions
- D) 720/1000, 75 questions
