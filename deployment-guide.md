# CI/CD Pipeline PoC - Complete Deployment Guide

This guide ensures you meet all specified requirements for the PoC deployment.

## ✅ Requirements Verification

### Required Components
- [x] **Java App**: Spring Boot backend (JDK 17) 
- [x] **TypeScript/JavaScript App**: React frontend with TypeScript
- [x] **Unit Tests**: JUnit for Java, Jest for TypeScript (with enforced coverage thresholds)
- [x] **Kubernetes Deployment**: Backend deployed to AWS EKS
- [x] **Lambda Deployment**: Frontend deployed to AWS Lambda
- [x] **Integration Tests**: API and database integration tests
- [x] **Vulnerability Scanning**: Trivy, OWASP dependency check, npm audit
- [x] **Code Coverage Enforcement**: 80% threshold for both frontend and backend
- [x] **Load Testing**: k6 performance testing with thresholds
- [x] **Infrastructure as Code**: Pulumi with Go language

## 🚀 Quick Start (5-Step Setup)

### Step 1: Deploy Infrastructure with Pulumi

First, create the AWS infrastructure using Pulumi:

```bash
# Install Pulumi CLI
curl -fsSL https://get.pulumi.com | sh

# Navigate to Pulumi directory
cd pulumi

# Install Go dependencies
go mod tidy

# Configure AWS credentials (use your aws.txt file)
export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
export AWS_SESSION_TOKEN=YOUR_AWS_SESSION_TOKEN

# Initialize and deploy
pulumi login --local  # or use pulumi.com
pulumi stack init poc
pulumi up

# Note the output values for CI/CD configuration
pulumi stack output
```

### Step 2: Configure CI/CD Secrets

**For GitHub Actions:**
Go to your GitHub repository → Settings → Secrets and Variables → Actions:

```
AWS_ACCESS_KEY_ID: YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY: YOUR_AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN: YOUR_AWS_SESSION_TOKEN
AWS_ACCOUNT_ID: 572252539264
SONAR_TOKEN: (optional - for code quality scanning)
```

**For GitLab CI/CD:**
Go to your GitLab project → Settings → CI/CD → Variables:

```
AWS_ACCESS_KEY_ID: YOUR_AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY: YOUR_AWS_SECRET_ACCESS_KEY
AWS_SESSION_TOKEN: YOUR_AWS_SESSION_TOKEN
AWS_ACCOUNT_ID: 572252539264
SONAR_HOST_URL: (optional - if using SonarQube)
SONAR_TOKEN: (optional - for code quality scanning)
```

### Step 3: Set Up Local Development

```bash
# Install dependencies
cd backend && mvn clean install && cd ..
cd frontend && npm install && cd ..
cd tests && npm install && cd ..

# Start local development environment
docker-compose up

# Verify services:
# - Backend: http://localhost:8080/health
# - Frontend: http://localhost:3000
# - Postgres: localhost:5432
# - Redis: localhost:6379
```

### Step 4: Initialize Git Repositories

```bash
# Initialize git
git init
git add .
git commit -m "Initial PoC setup with all requirements"

# Add remotes (replace with your actual repositories)
git remote add github https://github.com/yourusername/I-GL-GH-PoC.git
git remote add gitlab https://gitlab.com/yourusername/I-GL-GH-PoC.git

# Push to both platforms
git push github main
git push gitlab main
```

### Step 5: Monitor Pipeline Execution

**GitHub Actions:**
- Go to your repository → Actions tab
- Watch the CI/CD pipeline execute with all stages

**GitLab CI/CD:**
- Go to your repository → CI/CD → Pipelines
- Watch the pipeline execute through all stages

## 📊 Requirements Validation

### 1. Java Application ✅
- **Location**: `backend/`
- **Technology**: Spring Boot 3.1.5 with JDK 17
- **Features**: REST API, Health checks, Database integration
- **Tests**: JUnit with JaCoCo code coverage (80% threshold)

### 2. TypeScript/JavaScript Application ✅
- **Location**: `frontend/`
- **Technology**: React 18 with TypeScript
- **Features**: Modern UI, API integration, Environment configuration
- **Tests**: Jest with coverage reporting (80% threshold)

### 3. Unit Tests with Enforcement ✅
- **Backend**: JUnit tests with Maven Surefire plugin
- **Frontend**: Jest tests with coverage thresholds
- **Enforcement**: Pipeline fails if coverage < 80%

### 4. Kubernetes Deployment ✅
- **Target**: AWS EKS cluster
- **Application**: Java backend
- **Features**: Rolling updates, Health checks, Auto-scaling
- **Monitoring**: Cluster and pod metrics

### 5. Lambda Deployment ✅
- **Target**: AWS Lambda
- **Application**: React frontend (SSR)
- **Features**: Serverless deployment, Environment variables
- **Integration**: API Gateway for routing

### 6. Integration Tests ✅
- **API Tests**: REST endpoint validation
- **Database Tests**: PostgreSQL integration
- **Service Tests**: Inter-service communication
- **Environment**: Isolated test database

### 7. Vulnerability Scanning ✅
- **Container Scanning**: Trivy for Docker images
- **Dependency Scanning**: OWASP for Java, npm audit for Node.js
- **Code Analysis**: SonarQube integration (optional)
- **Reporting**: Security reports in pipeline artifacts

### 8. Code Coverage Enforcement ✅
- **Java**: JaCoCo with 80% line and branch coverage
- **TypeScript**: Jest with 80% coverage across all metrics
- **Enforcement**: Build fails if thresholds not met
- **Reporting**: Coverage reports in pipeline artifacts

### 9. Load Testing ✅
- **Tool**: k6 performance testing
- **Scenarios**: Ramp-up load testing with virtual users
- **Thresholds**: Response time < 500ms, Error rate < 5%
- **Integration**: Runs post-deployment in both pipelines

### 10. Infrastructure as Code (Pulumi + Go) ✅
- **Technology**: Pulumi with Go language
- **Resources**: VPC, EKS, ECR, Lambda, IAM, S3
- **Features**: Type-safe infrastructure, Automatic dependency management
- **Deployment**: Infrastructure provisioned before application deployment

## 🎯 Pipeline Features

### GitHub Actions Pipeline
```
Build (Parallel) → Security Scan → Integration Tests → Deploy → Post-Deploy Tests → Load Tests
     ↓                    ↓              ↓              ↓            ↓               ↓
 Java + TS            Trivy +        API + DB      EKS + Lambda   Smoke + E2E    k6 Load Test
 Unit Tests           OWASP         Tests                         Tests          with Thresholds
```

### GitLab CI/CD Pipeline
```
Build → Test → Security → Integration → Deploy (Manual) → Post-Deploy → Load Test
  ↓       ↓        ↓          ↓             ↓              ↓            ↓
Java +  Unit +  SAST +    API + DB    EKS + Lambda   Smoke + E2E   k6 Load Test
TS      Tests   Container  Tests      (Manual Gate)   Tests        with Thresholds
```

## 📈 Metrics and Monitoring

### Build Metrics
- Build time comparison between platforms
- Success/failure rates
- Resource usage (CPU, memory)

### Security Metrics
- Vulnerabilities found and severity
- Dependency scanning results
- Container security compliance

### Performance Metrics
- Application response times
- Load test results (throughput, latency)
- Infrastructure resource utilization

### Quality Metrics
- Code coverage percentages
- Unit test pass rates
- Integration test reliability

## 🔍 Testing the Complete Setup

### Local Testing
```bash
# Test all components locally
docker-compose up
curl http://localhost:8080/health  # Backend health
curl http://localhost:3000         # Frontend
npm run test:all                   # All tests

# Test with profiles
docker-compose --profile monitoring up  # With Grafana/Prometheus
docker-compose --profile test up        # Test environment
```

### Pipeline Testing
```bash
# Trigger both pipelines
git push github feature/test-branch
git push gitlab feature/test-branch

# Monitor results in:
# GitHub: Actions tab
# GitLab: CI/CD → Pipelines
```

### Load Testing
```bash
# Manual load test
cd tests
npm install
npm run test:load  # Local load test

# CI/CD load test
# Runs automatically in post-deploy stage
```

## 📋 Troubleshooting

### Common Issues and Solutions

1. **AWS Credentials Expired**
   ```bash
   # Refresh session token from AWS CLI
   aws sts get-session-token
   # Update secrets in both GitHub and GitLab
   ```

2. **EKS Cluster Access**
   ```bash
   # Update kubeconfig
   aws eks update-kubeconfig --region us-east-1 --name poc-cluster
   ```

3. **Load Test Failures**
   ```bash
   # Check thresholds in tests/load/api-load-test.js
   # Adjust based on your infrastructure capacity
   ```

4. **Code Coverage Below Threshold**
   ```bash
   # Add more unit tests
   # Check coverage reports in target/site/jacoco/ (Java)
   # Check coverage reports in coverage/ (TypeScript)
   ```

## 🎉 Success Criteria

Your PoC is complete when:

- [ ] All pipeline stages pass in both GitHub Actions and GitLab CI/CD
- [ ] Code coverage meets 80% threshold for both applications
- [ ] Load tests pass with defined performance thresholds
- [ ] Security scans complete without critical vulnerabilities
- [ ] Applications are successfully deployed to AWS (EKS + Lambda)
- [ ] Infrastructure is managed through Pulumi Go code
- [ ] Integration tests validate end-to-end functionality

## 📚 Next Steps

1. **Compare Platforms**: Analyze build times, costs, and developer experience
2. **Scale Testing**: Increase load test scenarios for production readiness
3. **Security Hardening**: Implement additional security scanning and compliance
4. **Monitoring Enhancement**: Add comprehensive observability with CloudWatch
5. **Cost Optimization**: Implement resource scaling and cost monitoring

Congratulations! You now have a complete CI/CD pipeline that meets all specified requirements and demonstrates best practices for both GitHub Actions and GitLab CI/CD platforms. 🚀 