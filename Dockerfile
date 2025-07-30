# Simple Dockerfile for CI/CD PoC Application
# Since backend and frontend are already built in CI pipeline,
# we just need to package the artifacts
FROM openjdk:17-jdk-slim

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy already-built backend JAR from CI pipeline
COPY backend/target/*.jar app.jar

# Copy already-built frontend from CI pipeline
COPY frontend/build ./static/

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Start the Spring Boot application
CMD ["java", "-jar", "app.jar"]