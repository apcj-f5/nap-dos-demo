import ws from "k6/ws";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 1 },
  ],
  thresholds: {
    checks: ["rate<0.02"], // http errors should be less than 2%
    ws_session_duration: ["p(95)<2000"], // 95% requests should be below 2s
  },
};

export default function () {
  const url = "wss://ws.f5labs.dev";
  const params = { tags: { my_tag: "hello" } };

  const res = ws.connect(url, params, function (socket) {
    socket.on("open", () => console.log("connected"));
    socket.on("message", (data) => console.log("Message received: ", data));
    socket.on("close", () => console.log("disconnected"));
  });

  check(res, { "status is 101": (r) => r && r.status === 101 });
}
