
```js
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


```js
const rabbit = await this.module('rabbit');
await rabbit.assertExchange('test', 'headers'); // создание exchange
await rabbit.bindQueue('test_ch', 'test', '', { type: 'ch' }); // присоединение queue к exchange
await rabbit.publish('test', '', { _id: 1 }, { headers: { type: 'ch' } }); // отправка сообщения
```

```js
await rabbit.bindQueue('test_es_ch', 'test', '', { es: true, ch: true }); // пример с несколькими headers
await rabbit.publish('test', '', { _id: 1 }, { headers: { es: true, ch: true } });
```

```
в конфиге есть поле queueOptions - это глобальные options для всех задач которые пишутся в rabbit
```

```json
"rabbit": {
  "uri": "localhost:15672",
  "queueOptions": {
    "persistent": true,
    "expiration": 683576835
  }
}
```

```
в конфиге с очередями(queues.js) можно указать options для каждой очереди отдельно
```

```json
  queue1: {
    queue: 'queue1',
    options: {
      persistent: true,
      headers: {},
      priority: 5,
      replyTo: 'test',
    },
  },
  queue2: {
    queue: 'queue2',
    limit: million,
    options: {
      persistent: true,
      headers: {
        custom: 'header',
      },
      priority: 5,
      replyTo: 'test2',
    },
  },
  queue3: {
    queue: 'queue3',
    options: {
      persistent: true,
      headers: {},
      priority: 5,
      replyTo: 'test3',
    },
  },
  queue4: {
    queue: 'queue4',
    options: {
      persistent: true, headers: {}, priority: 5, replyTo: 'test4',
    },
  },
```

```
options можно доопределить с помощью 3 аргумента при постановки задачи
```

```js
await rabbit.sendToQueue('test', { _id: 1 }, { persistent: true }); // отправка сообщения с options
```

```
options для задачи генерируются из

1) options которые пробросили при постановки задачи
2) из конфига queues.js для конкретной очереди
3) из глобального конфига

3 этих объекта мерджутся между собой именно в таком порядке
```