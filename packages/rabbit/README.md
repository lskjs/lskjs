# Lsk rabbit module


```
async startDynamicPrefetch() {
  const { rabbit } = this;
  const { messageCount } = await rabbit.assertQueue(this.queue);
  if (messageCount > 10000) {
    rabbit.listenChannel.prefetch(100);
  } else {
    rabbit.listenChannel.prefetch(10);
  }
  setTimeout(() => this.startDynamicPrefetch(), 1000);
}
async run() {
  await super.run();
  this.startDynamicPrefetch();
}
```


```javascript
const rabbit = await this.module('rabbit');
await rabbit.assertExchange('test', 'headers'); // создание exchange
await rabbit.bindQueue('test_ch', 'test', '', { type: 'ch' }); // присоединение queue к exchange
await rabbit.publish('test', '', { _id: 1 }, { headers: { type: 'ch' } }); // отправка сообщения
```

```javascript
await rabbit.bindQueue('test_es_ch', 'test', '', { es: true, ch: true }); // пример с несколькими headers
await rabbit.publish('test', '', { _id: 1 }, { headers: { es: true, ch: true } });
```