# LSK.js – bots-plugin-notify

> @lskjs/bots-plugin-notify – LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/bots-plugin-notify)](https://www.npmjs.com/package/@lskjs/bots-plugin-notify)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/bots-plugin-notify)](https://www.npmjs.com/package/@lskjs/bots-plugin-notify)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/bots-plugin-notify)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-notify)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/bots-plugin-notify)](https://www.npmjs.com/package/@lskjs/bots-plugin-notify)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/bots-plugin-notify)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-notify)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/bots-plugin-notify)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-notify)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

*   [Bots Plugin Notify](#bots-plugin-notify)

    *   [Таймер (cron)](#таймер-cron)
    *   [Проекты (projects)](#проекты-projects)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/bots-plugin-notify bluebird lodash

# npm
npm i @lskjs/bots-plugin-notify bluebird lodash
```

***

# Bots Plugin Notify

**Bots Plugin Notify** (*@lskjs/bots-plugin-notify*) - плагин, позволяющий настраивать мониторинг ресурсов с уведомлениями в telegram/slack через алерт-менеджер.

Конфиг плагина находится по пути `bots.plugins.notify` и имеет вид:

```js
bots: {
  plugins: {
    notify: {
      cron: '* * * * *',
      projects: {
        //...
      },
    },
  },
},
```

**Params:**

| Field | Type | Default | Desription |
| ------ | :------: | :------: | ------ |
| cron | Array of String/String | '\* \* \* \* \*' | Таймер |
| projects | Object of Objects | | Объект проектов, которые выполняет бот при срабатывании крона или запроса на Api |

## Таймер (cron)

Параметр позволяет устанавливать время срабатывания действия бота. Например, если необходимо производить мониторинг ресурса каждую минуту, то конфиг будет выглядеть `cron: '* * * * *'`.

Официальный пакет крона: [node-cron - npm](https://www.npmjs.com/package/node-cron)

## Проекты (projects)

Проекты позволяют устанавливать мониторинг ресурсов, отправку сообщений и алерт-менеджер. Ключ, по которому располагается проект в конфиге - название проекта. В случае, когда алерт-менеджер не находит необходимый проект, срабатывает `_default` проект. Его реализация является обязательной.

**Проекты состоят из нескольких частей:**
|  Rule Part  | Type | Description |
|  ------  |  :------: |  ------  |
| telegram | Array of Number\Array of String\Number\String | ID чатов, в которые будет отправлено сообщение |
| slack | Array of String\String | URL хуков, в которые будет отправлено сообщение |
| monitoring |  Array of Objects | Массив объектов, в которых хранятся url для мониторинга ресурсов. Если ресурс не отвечает, то ошибка отправляется в чаты slack/telegram |
| secret |  String | Секретный ключ для приватных ресурсов |
| github |  Objects | Настройка алерт-менеджера для гитхаба. Позволяет устанавливать, о каких событиях уведомлять |
| gitlab |  Objects | Настройка алерт-менеджера для гитлаба. Позволяет устанавливать, о каких событиях уведомлять |

Чтобы отправить какое-то сообщение в бота через алерт-менеджер: `https://YOUR_DOMAIN/notify?projectName=TestName&text=Test Message Text`.

**Examples**:

`_default`

```js
bots: {
  plugins: {
    notify: {
      projects: {
        _default: {
          telegram: [
            telegram.chat1,
          ],
          slack: [
            slack.chat2,
          ],
        },
      },
    },
  },
}
```

`monitoring`

```js
bots: {
  plugins: {
    notify: {
      projects: {
        monitor_project: {
          telegram: [
            telegram.chat1,
          ],
          slack: [
            slack.chat1,
          ],
          monitoring: [
            {
              url: 'MONITORING_URL',
            },
          ],
        },
      },
    },
  },
}
```

`github` / `gitlab` alert-managers

```js
bots: {
  plugins: {
    notify: {
      projects: {
        test_gitlab: {
          secret: 'secret',
          telegram: [
            telegram.chat1,
          ],
          slack: [
            slack.chat1,
          ],
          gitlab: {
            pipline: true,
            pipline__success: true,
            pipline__pending: false,
            pipline__failed: true,
            pipline__canceled: true,
            pipline__created: false,
            pipline__running: false,
            push: true,
            merge_request: true,
          },
        },
        test_github: {
          secret: 'secret',
          telegram: [
            telegram.chat1,
          ],
          slack: [
            slack.chat1,
          ],
          github: {
            pipline: true,
            pipline__success: true,
            pipline__pending: false,
            pipline__failed: true,
            pipline__canceled: true,
            pipline__created: false,
            pipline__running: false,
            push: true,
            merge_request: true,
          },
        },
      },
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
