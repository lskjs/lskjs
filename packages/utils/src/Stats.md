
Example:

```js
import ready from './polyfill';
import Stats from './Stats';

ready();

const stats = new Stats();
const startedAt = new Date();

setInterval(() => {
  const event = Math.random() < 0.3 ? 'nack' : 'ack';
  const proxy = Math.random() < 0.3 ? 'none' : `proxy_${Math.round((Math.random() * 10) % 10)}`;

  let err;
  if (event === 'nack') {
    err = `code_${Math.round((Math.random() * 10) % 10)}`;
  }
  stats.trigger({ event, startedAt, err, proxy });
  // stats.trigger({ event, startedAt, err, prefix: proxy });
  stats.print();
}, 10);
```