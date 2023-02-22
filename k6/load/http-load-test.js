import http from 'k6/http'
import { check } from 'k6'

// See https://k6.io/docs/using-k6/options
export const options = {
  stages: [
    { duration: '15s', target: 2000 },
    { duration: '1m', target: 2000 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'], // http errors should be less than 2%
    http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
  }
}

export default function main() {
  let response = http.get('https://bank.f5labs.dev/')
}
