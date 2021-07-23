# LSK.js – bots-plugin-portal

> @lskjs/bots-plugin-portal – LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/bots-plugin-portal)](https://www.npmjs.com/package/@lskjs/bots-plugin-portal)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/bots-plugin-portal)](https://www.npmjs.com/package/@lskjs/bots-plugin-portal)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/bots-plugin-portal)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-portal)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/bots-plugin-portal)](https://www.npmjs.com/package/@lskjs/bots-plugin-portal)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/bots-plugin-portal)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-portal)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/bots-plugin-portal)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-portal)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

*   [Bots Plugin Portal](#bots-plugin-portal)

    *   [Правила (rules)](#правила-rules)

        *   [`cron`](#cron)
        *   [`criteria`](#criteria)
        *   [`action`](#action)

    *   [Параметры, используемые при настройке критериев:](#параметры-используемые-при-настройке-критериев)

    *   [Список действий, которые реализованы в плагине:](#список-действий-которые-реализованы-в-плагине)

        *   [createMessage](#createmessage)
        *   [messageAppend](#messageappend)
        *   [messageTrim](#messagetrim)
        *   [messageEditExtra](#messageeditextra)
        *   [messageAddExtra](#messageaddextra)
        *   [sendMessage](#sendmessage)
        *   [reply](#reply)
        *   [repost](#repost)
        *   [copyMessage](#copymessage)
        *   [remove](#remove)
        *   [findMessage](#findmessage)
        *   [pinChatMessage](#pinchatmessage)
        *   [messageSplit](#messagesplit)
        *   [messagesJoin](#messagesjoin)
        *   [checkInterview](#checkinterview)
        *   [replyInterview](#replyinterview)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/bots-plugin-portal bluebird lodash

# npm
npm i @lskjs/bots-plugin-portal bluebird lodash
```

***

# Bots Plugin Portal

**Bots Plugin Portal** (*@lskjs/bots-plugin-portal*) - плагин, позволяющий настраивать реакции бота на различные триггеры.

Конфиг плагина находится по пути `bots.plugins.portal` и имеет вид:

```js
bots: {
  plugins: {
    portal: {
      group: true,
      rules: [
        //...
      ],
    },
  },
},
```

**Params:**

| Field | Type | Desription |
| ------ | :------: | ------ |
| group | Boolean | Группировать ли медиа-файлы |
| rules | Array of Objects | Массив правил, которым следует бот при обработке входящих сообщений или при срабатывании крона |

**Group values:**

| Field | Value | Description |
| ------ | :------: | ------ |
| group | true | Группирует медиа-файлы в одно сообщение и помещает их в `ctx.group` |
| group | false | Медиа-файлы приходят на сервер разными сообщениями |

    /Reference/: При отправке боту нескольких медиа-файлов одним сообщением, на сервер медиа-файлы приходят разными сообщениями. Т.е. при отправке 5 изображений одним сообщением, на сервер приходит не одно сообщение, а 5.

***

## Правила (rules)

Правила позволяют устанавливать триггеры на действия пользователей или на срабатывание крона. Представляют из себя объекты и могут быть вложены друг в друга.

**Правила состоят из 3-х частей:**
|  Rule Part  | Type | Required | Description |
|  ------  |  :------:  | :------: |  ------  |
|  cron  |  Array of String\String | - | Позволяет устанавливать расписания срабатываний экшона |
|criteria| Object | - | Критерии срабатывания экшона при обработке действий пользователя |
| action | Object | + | Экшоны. Описания действий, которые выполняет бот |

### `cron`

Параметр позволяет устанавливать время срабатывания действия бота. Например, если необходимо установить отправку сообщений в чат каждую минуту, то конфиг будет выглядеть `cron: '* * * * *'`.

Официальный пакет крона: [node-cron - npm](https://www.npmjs.com/package/node-cron)

### `criteria`

Параметр позволяет устанавливать критерии на триггеры срабатывания бота. Например, если необходимо, чтобы бот реагировал только на сообщения в определенном чате, то критерий будут выглядеть  `chatId: 12345678`.

Если criteria отсутствует, то правила могут срабатывать только по крону. Если же `criteria: {}`, то считается, что критерий отбора нет и правила будут срабатывать на любые взаимодействия с ботом.

### `action`

Параметр задает действия бота. Здесь настраивается, будет бот искать сообщения, оправлять или удалять их и тд.

Действия могут быть вложенными и составлять цепочки при помощи полей `then` и `else`.  При удачном выполнении действия-родителя бот будет выполнять действия из поля `then`. При неудачном - `else`. Аналогия с if/else, где if - then, а else - else. Например, при проверке checkMessage, если сообщение существует, то бот пройдет по ветке `then`, в противном случае по `else`.

Кроме вложенности, action/then могут быть массивами и содержать параллельные действия.

**Examples:**

```js
{
  cron: '* * * * *',
  criteria: {
    chatId: 12345678,
  },
  action: {
    type: 'checkMessage',
    chatId: -123114346456,
    userId: 12345678,
    then: {
      type: 'sendMessage',
      text: 'some text by true checkMessage',
      to: 12345678,
    },
    else: {
      type: 'sendMessage',
      text: 'some text by false checkMessage',
      to: 12345678,
    },
  },
},
```

```js
{
  cron: ['*/20 * * * *', '*/15 * * * * *'],
  action: [
    {
      type: 'sendMessage',
      text: 'some text 1',
      to: 12345678,
    },
    {
      type: 'sendMessage',
      text: 'some text 2',
      to: -87654321123,
    },
  ],
}
```

```js
{
  criteria: {
    chatId: 12345678,
  },
  action: {
    type: 'reply',
    text: 'some text by reply',
  },
},
```

## Параметры, используемые при настройке критериев:

| Criteria Field | Type | Values | Description |
| ------ | :------: | ------ | ------ |
| userId | Array of Number\Array of String\Number\String | | ID пользователя, который взаимодействует с ботом |
| chatId | Array of Number\Array of String\Number\String | | ID чата, в котором происходит взаимодействие с ботом |
| chatType | String | private\group\supergroup\channel | Тип чата, в котором происходит взаимодействие |
| messageType | String | | Тип сообщения. Различают множество типов сообщений |
| messageText | String\RegExp | | Текст сообщения. Например, можно сделать критерий на команду запуска бота `messageText: /start` |
| nextRoute | String\RegExp | |  Следующий роут. Используется только при заполнении формы. Необходимо устанавливать данный критерий для блокировки каких-либо действий во время заполнения формы в целях избежать спама и лишних триггеров. |

**Chat types:**

1.  `private` - личные диалог с ботом
2.  `group` - общий чат
3.  `supergroup` - общий чат
4.  `channel` - канал

**Message types:**

1.  `mediaGroup` - группа медиа-файлов
2.  `audio` - приложен аудио-файл
3.  `document` - приложен документ
4.  `animation` - гифка
5.  `photo` - приложено изображение
6.  `sticker` - стикер
7.  `video` - приложено видео
8.  `video_note` - видео-кружочек
9.  `voice` - голосовое сообщение
10. `contact` - контакт
11. `dice` - игральная кость
12. `game` - игра
13. `poll` - голосование
14. `quiz` - викторина
15. `location` - геоданные
16. `venue` - место
17. `text` - текстовое сообщение

## Список действий, которые реализованы в плагине:

1.  [createMessage](#createMessage) - создание сообщений
2.  [messageAppend](#messageAppend) - добавление текста в конец
3.  [messageTrim](#messageTrim) - фильтр текста
4.  [messageEditExtra](#messageEditExtra) - редактирование кнопок
5.  [messageAddExtra](#messageAddExtra) - добавление кнопок
6.  [sendMessage](#sendMessage) - отправка сообщений
7.  [reply](#reply) - реплай
8.  [repost](#repost) - репост
9.  [copyMessage](#copyMessage) - копирование сообщений
10. [remove](#remove) - удаление сообщений
11. [findMessage](#findMessage) - поиск сообщения
12. [pinChatMessage](#pinChatMessage) - закрепление сообщения
13. [messageSplit](#messageSplit) - разделение сообщения на элементы
14. [messagesJoin](#messagesJoin) - группировка сообщений в одно
15. [checkInterview](#checkInterview) - проверка заполнения формы
16. [replyInterview](#replyInterview) - отправка формы

### createMessage

**createMessage** - действие бота, необходимое для создания сообщения и последующего редактирования перед отправкой. После создания сообщения, к нему можно добавить/изменить кнопки, отредактировать его текст и тд.

При срабатывании createMessage от крона, создается пустое сообщение, которое можно заполнять различным контентом.<br/>
При срабатывании createMessage от действия пользователя, сообщение создается на основе входящих данных. Т.е. в текст созданного сообщения помещается текст, написанный пользователем. С кнопками и файлами происходят аналогичные действия.

**Params:**

| Field | Type | Description |
| ------ | :------: | ------ |
| text | String | текст сообщения |
| to | Array of Number\Array of String\Number\String | ID чата, в который будет отправлено сообщение |

**Example:**

```js
{
  criteria: {},
  action: {
    type: 'createMessage',
    text: "It's field from message text",
    to: 12345678,
  },
},
```

### messageAppend

**messageAppend** - действие бота, позволяющее добавить текст в конец сообщения.

**Params:**

| Field | Type | Description |
| ------ | :------: | ------ |
| text | String | Добавочный текст |

**Example:**

```js
{
  criteria: {
    messageText: /\/trim/,
  },
  action: {
    type: 'messageAppend',
    text: 'by @download4bot',
    then: {
      type: 'repost',
      to: 12345678,
    },
  },
},

```

### messageTrim

**messageTrim** - действие бота, позволяющее отфильтровать текст сообщения.

**Params:**

| Field | Type | Description |
| ------ | :------: | ------ |
| hashtags | Boolean |Удаляет все хештеги из текста сообщения |
| links | Boolean | Удаляет все ссылки из текста сообщения |
| regExp |  RegExp | Позволяет удалять любые пользовательские шаблоны из текста сообщения |

**Example:**

```js
{
  criteria: {
    messageText: /\/trim/,
  },
  action: {
    type: 'messageTrim',
    hashtags: 1,
    links: 1,
    regExp: /1?123\n?/,
    then: {
      type: 'repost',
      to: 12345678,
    },
  },
},

```

### messageEditExtra

**messageEditExtra** - действие бота, позволяющее отредактировать клавиатуру сообщения.

**Params:**

| Field | Type | Description |
| ------ | :------: |------ |
| extra | Array | Содержит редактируемые кнопки клавиатуры |

**Extra params for type *LIKE***:

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| type | String | + | Кнопки лайк/дисслайк к сообщению |
| buttons | Array | - | Содержит редактируемые кнопки клавиатуры |
| buttons.disslike | Object | - | Настройка кнопки дисслайка |
| buttons.like | Object | - | Настройка кнопки дисслайка |

**Extra params for type *ANSWER***:

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| type | String | + | Кнопка для установления соединения с другим пользователем через бота (чат) |
| text | String | - | Настройка текста кнопки |

**Extra params for type *SENDER***:

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| type | String | + | Кнопка для перехода к отправителю сообщения |
| text | String | - | Настройка текста кнопки |

**Example:**

```js
{
  criteria: {}
  action: {
    type: 'createMessage',
    text: 'Title text',
    then: {
      type: 'messageEditExtra',
      extra: [
        {
          type: 'like',
          buttons: {
            disslike: {
              title: 'test 💔', // default: '💔'
              value: 10, // default: 0
            },
            like: {
              title: 'test ❤️', // default: '❤️'
              value: 0, // default: 0
            },
          },
        },
        {
          type: 'answer',
          text: 'Answer @{ {username} }', // default: '@username'
        },
        {
          type: 'sender',
          text: 'Sender: @{ {username} }', // default: '@username'
        },
      ],
      then: {
        type: 'sendMessage',
        to: 12345678,
      },
    },
  },
},
```

### messageAddExtra

**messageAddExtra** - действие бота, позволяющее добавить новую клавиатуру сообщения. Если клавиатура уже существует, то messageAddExtra заменит текущую на новую.

**Params:**
| Field | Type | Description |
| ------ | :------: | ------ |
| extra | Array | Содержит редактируемые кнопки клавиатуры |

**Extra params for type *LIKE***:

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| type | String | + | Кнопки лайк/дисслайк к сообщению |
| buttons | Array | - | Содержит редактируемые кнопки клавиатуры |
| buttons.disslike | Object | - | Настройка кнопки дисслайка |
| buttons.like | Object | - | Настройка кнопки дисслайка |

**Extra params for type *ANSWER***:

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| type | String | + | Кнопка для установления соединения с другим пользователем через бота (чат) |
| text | String | - | Настройка текста кнопки |

**Extra params for type *SENDER***:

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| type | String | + | Кнопка для перехода к отправителю сообщения |
| text | String | - | Настройка текста кнопки |

**Example:**

```js
{
  criteria: {}
  action: {
    type: 'createMessage',
    text: 'Title text',
    then: {
      type: 'messageAddExtra',
      extra: [
        {
          type: 'like',
          buttons: {
            disslike: {
              title: 'New disslike  💔', // default: '💔'
              value: 10, // default: 0
            },
            like: {
              title: 'New like  ❤️', // default: '❤️'
              value: 0, // default: 0
            },
          },
        },
        {
          type: 'answer',
          text: 'Answer @{ {username} }', // default: '@username'
        },
        {
          type: 'sender',
          text: 'Sender: @{ {username} }', // default: '@username'
        },
      ],
      then: {
        type: 'sendMessage',
        to: 12345678,
      },
    },
  },
},
```

### sendMessage

**sendMessage** - действие бота, при котором бот отправляет сообщение заданному пользователю. Для настройки сообщения используется цепочка действий: `createMessage` -> `messageAddExtra` -> `messageAppend` -> `messageTrim` -> `sendMessage`.

**Params:**

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| text | String | - | Текст сообщения |
| to | Array of String/Array of Number/String/Number | - | ID получателя(-ей) |

**Example:**

```js
{
  criteria: {},
  action: {
    type: 'createMessage',
    then: {
      type: 'sendMessage',
      text: 'Text by sendMessage',
      to: 12345678,
    },
  },
},
```

### reply

**reply** - действие бота, при котором бот отвечает на сообщение пользователя.

**Params:**

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| text | String | - | Текст сообщения |

**Example:**

```js
{
  criteria: {
    messageText: 'ping',
  },
  action: {
    type: 'reply',
    text: 'pong',
  },
},
```

### repost

**repost** - действие бота, при котором бот пересылает активное сообщение в заданных чат.

**Params:**

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| to | Array of String/Array of Number/String/Number | - | ID получателя(-ей) |

**Example:**

```js
{
  criteria: {
    chatId: -136512436512436,
  },
  action: {
    type: 'repost',
    to: 12345678,
  },
},
```

### copyMessage

**sendMessage** - действие бота, при котором бот копирует активное сообщение и пересылает его в заданных чат.

**Params:**

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| to | Array of String/Array of Number/String/Number | - | ID получателя(-ей) |

**Example:**

```js
{
  criteria: {
    chatId: -136512436512436,
  },
  action: {
    type: 'copyMessage',
    to: 12345678,
  },
},
```

### remove

**remove** - действие бота, при котором бот удаляет активное сообщение. Активным сообщением является полученное сообщение, либо найденное при помощи findMessage.

**Example:**

```js
{
  criteria: {
    messageText: 'попит',
  },
  action: {
    type: 'remove',
  },
},
```

### findMessage

**findMessage** - действие бота, позволяющее найти сообщение в чате по заданным параметрам. Поиск осуществляется в модели `BotsTelegramMessageModel`.

**Params:**

| Field | Type | Required | Description |
| ------ | :------: | :------: | ------ |
| random | Boolean | - | Если нашлось несколько сообщений, выбирать ли случайное. По умолчанию: последнее полученное ботом сообщение. |
| criteria | Object | - | Критерии поиска сообщения в базе |
| criteria.userId | Array of Number\Array of String\Number\String | - | ID пользователя |
| criteria.chatId | Array of Number\Array of String\Number\String | - | ID чата |
| criteria.chatType | String | - | Тип чата |
| criteria.messageType | String | - | Тип сообщения |
| criteria.messageDate | Number | - | Дата сообщения в ms |
| criteria.messageText | String\RegExp | - | Текст сообщения |
| criteria.messageId | String\RegExp | - | ID сообщения |

**Example:**

```js
{
  criteria: {
    messageText: '/checkMessage',
  },
  action: {
    type: 'findMessage',
    criteria: {
      chatId: -1232343354655,
      messageText: '*message.text',
    },
    then: {
      type: 'repost',
      to: 12345678,
    },
  },
},
```

### pinChatMessage

**pinChatMessage** - действие бота, при котором бот закрепляет активное сообщение. Активным сообщением является полученное сообщение, либо сообщение после `findMessage`/`createMessage`.

**Example:**

```js
{
  criteria: {
    messageText: /^#закрепить.*/,
  },
  action: {
    type: 'pinChatMessage',
  },
},
```

### messageSplit

**messageSplit** - действие бота,  позволяющее разделять входящее сообщение на элементы для последующей работы. Например, если пользователь пишет боту сообщение, содержащее 5 изображений и подпись, то бот разделит сообщение на 6 элементов.

**Example:**

```js
{
  criteria: {},
  action: {
    type: 'messageSplit',
    then: {
      type: 'sendMessage',
      to: 12345678,
    },
  },
},
```

### messagesJoin

**messagesJoin** - действие бота, позволяющее объединять несколько сообщений, переданных боту (например, пересылая сообщения). Если среди сообщений несколько подписей, то они объединятся в единый текст.

**Example:**

```js
{
  criteria: {},
  action: {
    type: 'messagesJoin',
    then: {
      type: 'sendMessage',
      to: 12345678,
    },
  },
},
```

### checkInterview

**checkInterview**  - действие бота для проверки, заполнил ли пользователь необходимые формы.

**Params:**

| Field | Type | Description |
| ------ | :------: | ------ |
| type | String | Тип действия бота. Запускает проверку на заполненность формы |
| forms | Array of String/String | Список с названиями форм, которые следует заполнить для прохождения проверки |

**Example:**

```js
{ 
  criteria: {
    messageText: /^(?!\/registration).*$/,
    nextRoute: /^(?!\/interview).*$/,
  },
  action: {
    type: 'checkInterview',
    forms: ['intro'],
    then: [
      type: 'reply',
      text: 'Успех!',
    ],
    else: {
      type: 'reply',
      text: 'Необходима регистрация! /registration'
    },
  },
},
```

### replyInterview

**replyInterview**  - действие бота для отправки формы пользователю.

**Params:**

| Field | Type | Value | Description |
| ------ | :------: | ------ | ------ |
| type | String |  | Тип действия бота. Отправляет форму пользователю |
| formName | String |  | Название формы, которая будет отправлена пользователю |
| mode | String | form/dialog | Режим работы формы |
| preview | Boolean |  | Параметр, который указывает, необходимо ли выводить title формы перед вводом данных |
| autosubmit | Boolean |  | Параметр, который указывает, необходимо ли подтверждение данных формы |

**Example:**

```js
{
  criteria: {
    chatType: 'private',
    messageText: '/registration',
  },
  action: {
    type: 'replyInterview',
    formName: 'intro',
    mode: 'form',
    preview: false,
    autosubmit: false,
    then: {
      type: 'reply',
      text: 'Успех!',
    },
  },
},
```

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
