# Bots Plugin Prometheus

__Bots Plugin Prometheus__ (*@lskjs/bots-plugin-prometheus*) - плагин, позволяющий настраивать реакции бота на различные триггеры. 

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

__Проекты состоят из 4-х частей:__

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

__Examples__

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
1. [summary](#summary) - отправка сообщений с информацией об алертах

### summary

__summary__ - действие бота, при котором бот отправляет информацию об алерте в заданные чаты. Есть поддержка telegram и slack.  

__Params:__

| Field | Type | Values | Description |
| ------ | :------: | :------: | ------ |
| type | String | summary | Название действия |
| telegram | Array of Number\Array of String\Number\String | | ID чатов, в которые будет отправлено сообщение |
| slack | Array of String\String | | URL хуков, в которые будет отправлено сообщение |
| parseMode | String | Markdown, MarkdownV2, HTML | Метод парсинга сообщения |
| groupBy | String | | Критерий для группировки алертов |

__Example__

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