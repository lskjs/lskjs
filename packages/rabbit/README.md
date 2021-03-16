# LSK.js – rabbit

> @lskjs/rabbit – LSK module for rabbit.

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/rabbit)](https://www.npmjs.com/package/@lskjs/rabbit)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/rabbit)](https://www.npmjs.com/package/@lskjs/rabbit)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/rabbit)](https://bundlephobia.com/result?p=@lskjs/rabbit)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/rabbit)](https://www.npmjs.com/package/@lskjs/rabbit)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/rabbit)](https://bundlephobia.com/result?p=@lskjs/rabbit)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/rabbit)](https://bundlephobia.com/result?p=@lskjs/rabbit)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)
*   [📖 License](#-license)
*   [👥 Contributors](#-contributors)
*   [👏 Contributing](#-contributing)
*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/rabbit axios bluebird lodash

# npm
npm i @lskjs/rabbit axios bluebird lodash
```

***

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

    в конфиге есть поле queueOptions - это глобальные options для всех задач которые пишутся в rabbit

```json
"rabbit": {
  "uri": "localhost:15672",
  "queueOptions": {
    "persistent": true,
    "expiration": 683576835
  }
}
```

    в конфиге с очередями(queues.js) можно указать options для каждой очереди отдельно

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

    options можно доопределить с помощью 3 аргумента при постановки задачи

```js
await rabbit.sendToQueue('test', { _id: 1 }, { persistent: true }); // отправка сообщения с options
```

    options для задачи генерируются из

    1) options которые пробросили при постановки задачи
    2) из конфига queues.js для конкретной очереди
    3) из глобального конфига

    3 этих объекта мерджутся между собой именно в таком порядке

# 📖 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

# 👥 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><a href="https://isuvorov.com"><img src="https://avatars2.githubusercontent.com/u/1056977?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Igor Suvorov</b></sub></a><br /><a href="lskjs/lskjs///commits?author=isuvorov" title="Code">💻</a> <a href="#design-isuvorov" title="Design">🎨</a> <a href="#ideas-isuvorov" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

# 👏 Contributing

1.  Fork it (<https://github.com/yourname/yourproject/fork>)
2.  Create your feature branch (`git checkout -b features/fooBar`)
3.  Commit your changes (`git commit -am 'feat(image): Add some fooBar'`)
4.  Push to the branch (`git push origin feature/fooBar`)
5.  Create a new Pull Request

# 📮 Any questions? Always welcome :)

*   [Email](mailto:hi@isuvorov.com)
*   [LSK.news – Telegram channel](https://t.me/lskjs)
*   [Спроси нас в телеграме ;)](https://t.me/lskjschat)
