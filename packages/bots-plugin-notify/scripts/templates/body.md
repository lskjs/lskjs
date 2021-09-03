# Bots Plugin Notify

__Bots Plugin Notify__ (*@lskjs/bots-plugin-notify*) - плагин, позволяющий настраивать мониторинг ресурсов с уведомлениями в telegram/slack через алерт-менеджер. 

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

__Params:__

| Field | Type | Default | Desription |
| ------ | :------: | :------: | ------ |
| cron | Array of String/String | '* * * * *' | Таймер |
| projects | Object of Objects | | Объект проектов, которые выполняет бот при срабатывании крона или запроса на Api |

## Таймер (cron)

Параметр позволяет устанавливать время срабатывания действия бота. Например, если необходимо производить мониторинг ресурса каждую минуту, то конфиг будет выглядеть `cron: '* * * * *'`. 

Официальный пакет крона: [node-cron - npm](https://www.npmjs.com/package/node-cron) 


## Проекты (projects)
Проекты позволяют устанавливать мониторинг ресурсов, отправку сообщений и алерт-менеджер. Ключ, по которому располагается проект в конфиге - название проекта. В случае, когда алерт-менеджер не находит необходимый проект, срабатывает `_default` проект. Его реализация является обязательной.

__Проекты состоят из нескольких частей:__
|  Rule Part  | Type | Description |
|  ------  |  :------: |  ------  |
| telegram | Array of Number\Array of String\Number\String | ID чатов, в которые будет отправлено сообщение |
| slack | Array of String\String | URL хуков, в которые будет отправлено сообщение |
| monitoring |  Array of Objects | Массив объектов, в которых хранятся url для мониторинга ресурсов. Если ресурс не отвечает, то ошибка отправляется в чаты slack/telegram |
| secret |  String | Секретный ключ для приватных ресурсов |
| github |  Objects | Настройка алерт-менеджера для гитхаба. Позволяет устанавливать, о каких событиях уведомлять |
| gitlab |  Objects | Настройка алерт-менеджера для гитлаба. Позволяет устанавливать, о каких событиях уведомлять |

Чтобы отправить какое-то сообщение в бота через алерт-менеджер: `https://YOUR_DOMAIN/notify?projectName=TestName&text=Test Message Text`.

__Examples__:

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
