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

Это может быть полезно например для загрузки изображения методом `POST multipart/form-data `

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
