# Quick Setup Guide: CI/CD Secrets Configuration

## 🚀 AWS Resources Created

Your minimal AWS infrastructure is ready:

- **ECR Repository**: `572252539264.dkr.ecr.us-east-1.amazonaws.com/poc-app`
- **S3 Bucket**: `poc-deployments-572252539264`
- **Account ID**: `572252539264`
- **Region**: `us-east-1`

## 🔑 Configure GitHub Actions Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these:

```
Name: AWS_ACCESS_KEY_ID
Value: YOUR_AWS_ACCESS_KEY_ID

Name: AWS_SECRET_ACCESS_KEY
Value: YOUR_AWS_SECRET_ACCESS_KEY

Name: AWS_SESSION_TOKEN
Value: YOUR_AWS_SESSION_TOKEN

Name: AWS_ACCOUNT_ID
Value: 572252539264
```

## 🔑 Configure GitLab CI/CD Variables

1. Go to your GitLab project
2. Navigate to **Settings** → **CI/CD** → **Variables**
3. Click **Add variable** and add each of these (check "Protected" and "Masked" where possible):

```
Key: AWS_ACCESS_KEY_ID
Value: YOUR_AWS_ACCESS_KEY_ID
Protected: ✓
Masked: ✓

Key: AWS_SECRET_ACCESS_KEY
Value: YOUR_AWS_SECRET_ACCESS_KEY
Protected: ✓
Masked: ✓

Key: AWS_SESSION_TOKEN
Value: YOUR_AWS_SESSION_TOKEN
Protected: ✓
Masked: ✗ (too long to mask)

Key: AWS_ACCOUNT_ID
Value: 572252539264
Protected: ✓
Masked: ✓
```

## 📋 Quick Test Commands

Once secrets are configured, test your setup:

### Test GitHub Actions Pipeline:
```bash
# Switch to minimal pipeline
cp .github/workflows/ci-cd-minimal.yml .github/workflows/ci-cd.yml

# Commit and push
git add .
git commit -m "Add minimal CI/CD pipeline for PoC"
git push origin main
```

### Test GitLab CI/CD Pipeline:
```bash
# Switch to minimal pipeline
cp .gitlab-ci-minimal.yml .gitlab-ci.yml

# Commit and push
git add .
git commit -m "Add minimal CI/CD pipeline for PoC"
git push origin main
```

## 🎯 Expected Results

Both pipelines will:

✅ **Build Java app** with Maven (JDK 17)  
✅ **Build TypeScript app** with npm (Node.js 18)  
✅ **Run unit tests** with 80% coverage enforcement  
✅ **Build Docker image** and push to ECR  
✅ **Package frontend** and upload to S3  
✅ **Run security scans** (Trivy, OWASP)  
✅ **Execute load tests** with k6  
✅ **Run integration tests** with mock APIs  

## 🔍 Monitoring

- **GitHub**: Go to **Actions** tab in your repository
- **GitLab**: Go to **CI/CD** → **Pipelines** in your project

## 💡 Tips

1. **Session Token**: Your AWS session token expires periodically. If pipelines fail with auth errors, generate new credentials.

2. **Cost Optimization**: The setup includes:
   - ECR lifecycle policy (keeps only 5 images)
   - S3 lifecycle policy (deletes artifacts after 7 days)

3. **Local Testing**: Use `docker-compose up` to test locally before pushing

4. **Debugging**: Check pipeline logs for detailed error messages

## 🚀 Next Steps

1. Configure secrets (above)
2. Push code to trigger pipelines
3. Compare execution times and results
4. Document your findings for the platform comparison

Your minimal PoC is ready to demonstrate all required CI/CD features! 🎉 