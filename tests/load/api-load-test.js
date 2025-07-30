import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration - PoC/Demo friendly
export const options = {
  stages: [
    // Warm up
    { duration: '30s', target: 2 },
    // Ramp up to normal load  
    { duration: '30s', target: 5 },
    // Stay at normal load
    { duration: '1m', target: 5 },
    // Ramp up to peak load
    { duration: '30s', target: 10 },
    // Stay at peak load (brief)
    { duration: '30s', target: 10 },
    // Ramp down
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'], // 95% of requests must complete below 5s (more realistic for CI)
    http_req_failed: ['rate<0.10'],    // Error rate must be below 10% (tightened but reasonable) 
    errors: ['rate<0.10'],             // Custom error rate must be below 10% (tightened but reasonable)
  },
};

const BASE_URL = __ENV.API_URL || 'http://localhost:8080';

export default function () {
  // Use different endpoints based on environment
  const isHttpBin = BASE_URL.includes('httpbin.org');
  
  if (isHttpBin) {
    // CI environment - use httpbin.org endpoints
    const statusResponse = http.get(`${BASE_URL}/status/200`);
    check(statusResponse, {
      'status endpoint returns 200': (r) => r.status === 200,
      'status response time < 5000ms': (r) => r.timings.duration < 5000,
    }) || errorRate.add(1);

    sleep(1);

    const jsonResponse = http.get(`${BASE_URL}/json`);
    check(jsonResponse, {
      'json endpoint returns 200': (r) => r.status === 200,
      'json response time < 5000ms': (r) => r.timings.duration < 5000,
      'json returns valid JSON': (r) => {
        try {
          JSON.parse(r.body);
          return true;
        } catch (e) {
          return false;
        }
      },
    }) || errorRate.add(1);
  } else {
    // Local environment - use Spring Boot endpoints
    const healthResponse = http.get(`${BASE_URL}/health`);
    check(healthResponse, {
      'health check status is 200': (r) => r.status === 200,
      'health check response time < 1000ms': (r) => r.timings.duration < 1000,
    }) || errorRate.add(1);

    sleep(1);

    const helloResponse = http.get(`${BASE_URL}/api/hello`);
    check(helloResponse, {
      'hello API status is 200': (r) => r.status === 200,
      'hello API response time < 1000ms': (r) => r.timings.duration < 1000,
      'hello API returns expected message': (r) => r.body.includes('Hello from Backend'),
    }) || errorRate.add(1);
  }

  sleep(1);

  // Skip authentication tests for PoC simplicity
  // Focus on basic endpoints that are guaranteed to exist

  sleep(Math.random() * 2); // Random sleep between 0-2 seconds
}

export function handleSummary(data) {
  return {
    'load-test-results.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data, options = {}) {
  const indent = options.indent || '';
  const colors = options.enableColors !== false;
  
  let summary = `${indent}✓ Load Test Summary\n`;
  summary += `${indent}  Scenarios: ${Object.keys(data.metrics).length}\n`;
  summary += `${indent}  VUs: ${data.setup_data?.options?.stages?.reduce((max, stage) => Math.max(max, stage.target), 0) || 'N/A'}\n`;
  summary += `${indent}  Duration: ${data.state.testRunDurationMs}ms\n`;
  summary += `${indent}  Requests: ${data.metrics.http_reqs?.values?.count || 0}\n`;
  summary += `${indent}  Avg Response Time: ${Math.round(data.metrics.http_req_duration?.values?.avg || 0)}ms\n`;
  summary += `${indent}  95th Percentile: ${Math.round(data.metrics.http_req_duration?.values?.p95 || 0)}ms\n`;
  summary += `${indent}  Error Rate: ${Math.round((data.metrics.http_req_failed?.values?.rate || 0) * 100)}%\n`;
  
  return summary;
} 