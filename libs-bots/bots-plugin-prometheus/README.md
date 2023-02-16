# LSK.js – bots-plugin-prometheus

> @lskjs/bots-plugin-prometheus – LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/bots-plugin-prometheus)](https://www.npmjs.com/package/@lskjs/bots-plugin-prometheus)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/bots-plugin-prometheus)](https://www.npmjs.com/package/@lskjs/bots-plugin-prometheus)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/bots-plugin-prometheus)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-prometheus)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/bots-plugin-prometheus)](https://www.npmjs.com/package/@lskjs/bots-plugin-prometheus)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/bots-plugin-prometheus)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-prometheus)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/bots-plugin-prometheus)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-prometheus)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

*   [Bots Plugin Prometheus](#bots-plugin-prometheus)

    *   *   [`cron`](#cron)
        *   [`criteria`](#criteria)
        *   [`action`](#action)

    *   [Параметры, используемые при настройке критериев:](#параметры-используемые-при-настройке-критериев)

    *   [Список действий, которые реализованы в плагине:](#список-действий-которые-реализованы-в-плагине)

        *   [summary](#summary)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/bots-plugin-prometheus bluebird lodash

# npm
npm i @lskjs/bots-plugin-prometheus bluebird lodash
```

***

# Bots Plugin Prometheus

**Bots Plugin Prometheus** (*@lskjs/bots-plugin-prometheus*) - плагин, позволяющий настраивать реакции бота на различные триггеры.

Конфиг плагина находится по пути `bots.plugins.prometheus` и имеет вид:

```js
bots: {
  plugins: {
    prometheus: {
      projects: [
        //...
      ],
    },
  },
},
```

**Проекты состоят из 4-х частей:**

|  Rule Part  | Type | Required | Description |
|  ------  |  :------:  | :------: |  ------  |
|  cron  |  Array of String\String | - | Позволяет устанавливать расписания срабатываний экшона |
| alerts | String | + | Api-URL, где содержатся все алерты прометеуса |
|criteria| Object | - | Критерии срабатывания экшона при обработке определенного алерта |
| action | Object | + | Экшоны. Описания действий, которые выполняет бот |

### `cron`

Параметр позволяет устанавливать время срабатывания действия бота. Например, если необходимо установить запрос на апи каждую минуту, то конфиг будет выглядеть `cron: '* * * * *'`.

Официальный пакет крона: [node-cron - npm](https://www.npmjs.com/package/node-cron)

### `criteria`

Параметр позволяет устанавливать критерии на триггеры срабатывания бота. Например, если необходимо, чтобы бот реагировал только на горящие сообщения `state: 'firing'`.

### `action`

Параметр задает действия бота. Здесь настраивается, что бот будет делать с найденным алертом.

action могут быть массивами и содержать параллельные действия.

**Examples**

```js
bots: {
  plugins: {
    prometheus: {
      projects: [
        {
          cron: '* * * * *',
          alerts: 'ALERTS_URL',
          criteria: {
            state: 'firing',
            labels: {
              severity: 'high',
            },
          },
          action: {
            type: 'summary',
            telegram: [telegram.chat1],
            slack: [slack.chat1],
            parseMode: 'MarkdownV2',
            groupBy: 'labels.severity',
          },
        },
        {
          cron: '* * * * *',
          alerts: 'ALERTS_URL',
          criteria: {
            state: 'firing',
            labels: {
              severity: 'warn',
            },
          },
          action: {
            type: 'summary',
            telegram: [telegram.chat2],
            slack: [slack.chat2],
            parseMode: 'MarkdownV2',
            groupBy: 'labels.severity',
          },
        },
      ],
    },
  },
},
```

## Параметры, используемые при настройке критериев:

| Criteria Field | Type | Values | Description |
| ------ | :------: | ------ | ------ |
| state | String | | Состояние алерта |
| labels | String | | Тип алерта |

## Список действий, которые реализованы в плагине:

1.  [summary](#summary) - отправка сообщений с информацией об алертах

### summary

**summary** - действие бота, при котором бот отправляет информацию об алерте в заданные чаты. Есть поддержка telegram и slack. 

**Params:**

| Field | Type | Values | Description |
| ------ | :------: | :------: | ------ |
| type | String | summary | Название действия |
| telegram | Array of Number\Array of String\Number\String | | ID чатов, в которые будет отправлено сообщение |
| slack | Array of String\String | | URL хуков, в которые будет отправлено сообщение |
| parseMode | String | Markdown, MarkdownV2, HTML | Метод парсинга сообщения |
| groupBy | String | | Критерий для группировки алертов |

**Example**

```js
bots: {
  plugins: {
    prometheus: {
      projects: [
        {
          cron: '* * * * *',
          alerts: 'ALERTS_URL',
          criteria: {
            state: 'firing',
            labels: {
              severity: 'high',
            },
          },
          action: {
            type: 'summary',
            telegram: [telegram.chat1],
            slack: [slack.chat1],
            parseMode: 'MarkdownV2',
            groupBy: 'labels.severity',
          },
        },
      ],
    },
  },
}
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
