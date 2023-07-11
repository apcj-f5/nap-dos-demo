import http from "k6/http";
import { check } from "k6";

// See https://k6.io/docs/using-k6/options
export const options = {
  stages: [{ duration: "1m", target: 1 }],
  thresholds: {
    http_req_failed: ["rate<0.02"], // http errors should be less than 2%
    http_req_duration: ["p(90)<2000", "p(95)<2500"], // 90% of requests should be below 2s, 95% should be below 2.5s
  },
};

const BASE_URL = "https://bank.f5labs.dev";
const USERNAME = "alice";
const PASSWORD = "bankofanthos";

export default function main() {
  const postResponse = http.post(`${BASE_URL}/login`, {
    username: USERNAME,
    password: PASSWORD,
  });

  const redirectResponse = http.get(`${BASE_URL}/home`);

  check(redirectResponse, { "status is 200": (r) => r && r.status === 200 });
}
