# LSK.js – apiquery

> @lskjs/apiquery – http/s + websockets api client for Web, Node.js and React Native throw fetch or axios

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/apiquery)](https://www.npmjs.com/package/@lskjs/apiquery)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/apiquery)](https://www.npmjs.com/package/@lskjs/apiquery)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/apiquery)](https://bundlephobia.com/result?p=@lskjs/apiquery)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/apiquery)](https://www.npmjs.com/package/@lskjs/apiquery)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/apiquery)](https://bundlephobia.com/result?p=@lskjs/apiquery)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/apiquery)](https://bundlephobia.com/result?p=@lskjs/apiquery)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)
*   [Apiquery](#apiquery)
*   [Headers](#headers)
*   [afterFetch](#afterfetch)
*   [throwError](#throwerror)
*   [ws](#ws)
*   [📖 License](#-license)
*   [👥 Contributors](#-contributors)
*   [👏 Contributing](#-contributing)
*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/apiquery axios lodash

# npm
npm i @lskjs/apiquery axios lodash
```

asd

# Apiquery

http + websockets api client for Web, Node.js and React Native

```js
const api = new ApiClient({
  url: 'http://localhost:8080',
  base: '/api/v1',
  authToken: '#1234567890',
});
```

```js
const api = new ApiClient({
  base: '/api/v1',
});

api.fetch('messages')   // GET /api/v1/messages
api.fetch('/messages')  // GET /messages
api.fetch('messages', {
  base: '/api/v2'
})  // GET /api/v2/messages

api.fetch('isuvorov.ru')  // GET /api/v1/isuvorov.ru
api.fetch('//isuvorov.ru/api/v1')  // GET //isuvorov.ru/api/v1
```

```js
const api = new ApiClient({
  url: 'http://localhost:8080',
  base: '/api/v1',
});

api.fetch('messages')   // GET http://localhost:8080/api/v1/messages
api.fetch('/messages')  // GET http://localhost:8080/messages
api.fetch('messages', {
  base: '/api/v2'
})  // GET http://localhost:8080/api/v2/messages

api.fetch('isuvorov.ru')  // GET http://localhost:8080/api/v1/isuvorov.ru
api.fetch('//isuvorov.ru/api/v1')  // GET http://isuvorov.ru/api/v1


const api2 = new ApiClient({
  url: 'https://localhost:8080',
  base: '/api/v1',
});
api2.fetch('//isuvorov.ru/api/v1')  // GET https://isuvorov.ru/api/v1
```

# Headers

По стандарту отправляются хедеры, которые маркируют пакет как JSON.
Если вам нгеобходимо отправить пакет, без `Content-Type: application/json; charset=utf-8`, необходимо воспользоваться следующим способом.

Это может быть полезно например для загрузки изображения методом ` POST multipart/form-data  `

```js

const api = new ApiClient({
  base: '/api/v1',
});

await api.fetch('/upload', {
  method: 'POST',
  headers: {
    'Content-Type': '!',
  },
  body,
});

```

# afterFetch

Функция обрабатывает данные которые приходят в fetch. Возвращает или payload результата (JSON объект) или генерирует ошибку.

Стандартное поведение - генерировать ошибку при статусе пакета >= 400, или при наличии объекта err в JSON ответе.

Для того чтобы изменить поведение обработки ошибок на определенных старницах, можно передать функцию (function) которая особым образом обрабатывает ошибки.

Предположим что, для страницы `/api/v1/users`, в случае отсутсвия пользователей нам возвращяется ошибка `Error 404`, вместо `[]` и нам нужно проигнорировать стандартное поведение в этом случае. При этом, чтобы при других видах ошибок - поведение оставалось прежним.

```js

const api = new ApiClient({
  base: '/api/v1',
});

api.fetch('users', {
  afterFetch: function (data) {
    const { res } = data;
    if (res.status === 404) {
      return []
    }
    return this.afterFetch(data)
  }
})



```

# throwError

```js

const api = new ApiClient({
  base: '/api/v1',
});

api.fetch('users', {
  afterFetch: function (data) {
    const { res } = data;
    if (res.status === 404) {
      return []
    }
    return this.afterFetch(data)
  }
})

```

# ws

Работа с сокетами: socket.io

```js
const api = new ApiClient({
  base: '/api/v1',
});

const s1 = api.ws('messages') // WS /api/v1/messages
s1.on('message', (data) => {
  console.log(data);
})
const s2 = api.ws('messages', options) // look options here: https://socket.io/docs/client-api/#manager


```

zxczxc

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
