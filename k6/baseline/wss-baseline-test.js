import ws from 'k6/ws';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: "15s", target: 1 }, 
    { duration: "1m", target: 1 }, 
    { duration: "15s", target: 0 }, 
  ],
};

export default function () {
  const url = 'wss://ws.f5labs.dev';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    // socket.on('open', () => console.log('connected'));
    // socket.on('message', (data) => console.log('Message received: ', data));
    // socket.on('close', () => console.log('disconnected'));
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}

