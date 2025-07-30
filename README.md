# GitHub Actions CI/CD PoC Implementation

This directory contains a complete CI/CD implementation optimized for GitHub Actions.

## Quick Start
1. Push this directory to a GitHub repository
2. Configure GitHub secrets (see setup-secrets.md)
3. Push to trigger the pipeline

The pipeline includes:
- Java Spring Boot backend build and test
- React TypeScript frontend build and test  
- Docker image build and push to AWS ECR
- Load testing with k6
- Security scanning with Trivy
