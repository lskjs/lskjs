# Bots Plugin Portal
# Описание (description)
> *Bots Plugin Portal* (_@lskjs/bots-plugin-portal_) - плагин, позволяющий настраивать реакции бота на различные триггеры. 

Конфиг плагина находится по пути `bots.plugins.portal` и имеет вид:

```js
bots: {
	plugins: {
		portal: {
			group: true,
			rules: [
				...
			],
		},
	},
},
```

* `group` [Boolean] - принимает булевое значение true/false.

    `group: true`  группирует медиа-файлы в одно сообщение и помещает их в `ctx.group`.<br/>
    `group: false` медиа-файлы приходят на сервер разными сообщениями.

    /Reference/: При отправке боту нескольких медиа-файлов одним сообщением, на сервер медиа-файлы приходят разными сообщениями. Т.е. при отправке 5 изображений одним сообщением, на сервер приходит не одно сообщение, а 5.

* `rules` [Array of Objects] - содержит массив правил, которым следует бот при обработке входящих сообщений или при срабатывании крона. 

---

# Правила (rules)
> Правила позволяют устанавливать триггеры на действия пользователей или на срабатывание крона. Представляют из себя объекты и могут быть вложены друг в друга.

*Правила состоят из 3-х составляющих:*
* `cron` [Array of String | String] - необязательный параметр.

    [node-cron  -  npm](https://www.npmjs.com/package/node-cron) 

    > Параметр позволяет устанавливать время срабатывания действия бота. Например, если необходимо установить отправку сообщений в чат каждую минуту, то конфиг будет выглядеть  `cron: '* * * * *'`. 

* `criteria` [Object]  - необязательный параметр.

    > Параметр позволяет устанавливать критерии на триггеры срабатывания бота. Например, если необходимо, чтобы бот реагировал только на сообщения в определенном чате, то критерий будут выглядеть  `chatId: 12345678`.

    Если criteria отсутствует, то правила могут срабатывать только по крону. Если же `criteria: {}`, то считается, что критерий отбора нет и правила будут срабатывать на любые взаимодействия с ботом.

* `action` [Object]  - обязательный параметр.

    > Параметр задает действия бота. Здесь настраивается, будет бот искать сообщения, оправлять или удалять их и тд. 

    Действия могут быть вложенными и составлять цепочки при помощи полей `then` и `else`.  При удачном выполнении действия-родителя бот будет выполнять действия из поля `then`. При неудачном - `else`. Аналогия с if/else, где if - then, а else - else. Например, при проверке checkMessage, если сообщение существует, то бот пройдет по ветке `then`, в противном случае по `else`.

    Кроме вложенности, action/then могут быть массивами и содержать параллельные действия.

*Examples:* 

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
* `userId` [Array of Number | Array of String | Number | String] - ID пользователя, который взаимодействует с ботом. 
* `chatId` [Array of Number | Array of String | Number | String] - ID чата, в котором происходит взаимодействие с ботом.
* `chatType` [String] - тип чата, в котором происходит взаимодействие. Существует 4 типа чатов: `private`, `group`, `supergroup`, `channel`.
	1. `private` - личные диалог с ботом
	2. `group` - общий чат
	3. `supergroup` - общий чат
	4. `channel` - канал
* `messageType` [String] - тип сообщения. Различают множество типов сообщений.

  1. `mediaGroup` - группа медиа-файлов
  2. `audio` - приложен аудио-файл
  3. `document` - приложен документ
  4. `animation` - гифка
  5. `photo` - приложено изображение
  6. `sticker` - стикер
  7. `video` - приложено видео
  8. `video_note` - видео-кружочек
  9. `voice` - голосовое сообщение
  10. `contact` - контакт
  11. `dice` - игральная кость
  12. `game` - игра
  13. `poll` - голосование
  14. `quiz` - викторина
  15. `location` - геоданные
  16. `venue` - место
  17. `text` - текстовое сообщение

* `messageText` [String | RegExp] - текст сообщения. Например, можно сделать критерий на команду запуска бота `messageText: /start`.
* `nextRoute` [String | RegExp] - следующий роут. Используется только при заполнении формы. Необходимо устанавливать данный критерий для блокировки каких-либо действий во время заполнения формы в целях избежать спама и лишних триггеров.

## Список действий, которые реализованы в плагине:
1. [createMessage](#createMessage) - создание сообщений
2. [messageAppend](#messageAppend) - добавление текста в конец
3. [messageTrim](#messageTrim) - фильтр текста
4. [messageEditExtra](#messageEditExtra) - редактирование кнопок
5. [messageAddExtra](#messageAddExtra) - добавление кнопок
6. [sendMessage](#sendMessage) - отправка сообщений
7. [reply](#reply) - реплай
8. [repost](#repost) - репост
9. [copyMessage](#copyMessage) - копирование сообщений
10. [remove](#remove) - удаление сообщений
11. [findMessage](#findMessage) - поиск сообщения
12. [pinChatMessage](#pinChatMessage) - закрепление сообщения
13. [messageSplit](#messageSplit) - разделение сообщения на элементы
14. [messagesJoin](#messagesJoin) - группировка сообщений в одно
15. [checkInterview](#checkInterview) - проверка заполнения формы
16. [replyInterview](#replyInterview) - отправка формы

### createMessage

*createMessage* - действие бота, необходимое для создания сообщения и последующего редактирования перед отправкой. После создания сообщения, к нему можно добавить/изменить кнопки, отредактировать его текст и тд. 

При срабатывании createMessage от крона, создается пустое сообщение, которое можно заполнять различным контентом.<br/>
При срабатывании createMessage от действия пользователя, сообщение создается на основе входящих данных. Т.е. в текст созданного сообщения помещается текст, написанный пользователем. С кнопками и файлами происходят аналогичные действия.

*При создании сообщения можно задавать следующие параметры:*

1. `text` [String] - текст сообщения.
2. `to` [Array of Number | Array of String | Number | String] - ID чата, в который будет отправлено сообщение

*Example:*

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

```js

```

### messageTrim

```js

```

### messageEditExtra

```js

```

### messageAddExtra

```js

```

### sendMessage

```js

```

### reply

```js

```

### repost

```js

```

### copyMessage

```js

```

### remove

```js

```

### findMessage

```js

```

### pinChatMessage

```js

```

### messageSplit

*messageSplit* - действие бота,  позволяющее разделять входящее сообщение на элементы для последующей работы. Например, если пользователь пишет боту сообщение, содержащее 5 изображений и подпись, то бот разделит сообщение на 6 элементов.

*Example:*

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

*messagesJoin* - действие бота, позволяющее объединять несколько сообщений, переданных боту (например, пересылая сообщения). Если среди сообщений несколько подписей, то они объединятся в единый текст. 

*Example:*

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

```js

```

### replyInterview

```js

```

# Bots Plugin Interview
## Описание
*Bots Interview Plugin* (_@lskjs/bots-plugin-interview_) - плагин, позволяющий создавать формы ввода в боте. Реализована вариация с классической браузерной формой с подтверждением введенных данных. Режим диалога находится в стации разработки.

Конфиг для плагина состоит из двух частей - interview и portal. Interview отвечает за настройку формы, её полей и их валидацию. Portal реализует взаимодействие с формой. Например, при каких действиях пользователя будет вызвана форма.

Входные данные сохраняются в базу и хранятся в модели `BotsTelegramUserModel`. Путь в модели  `meta.interview.[formName]`.  

### Interview

```
bots: {
    plugins: {
      interview: {
        forms: {
          intro:  {
            title: 'Добро пожаловать. Для продолжения пройдите краткую регистрацию!',
            controls: {
              name: {
                title: 'Имя',
                placeholder: 'Введите имя',
                format: String,
              },
              city: {
                title: 'Город',
                placeholder: 'Введите город',
              },
              age: {
                title: 'Возраст',
                placeholder: 'Введите ваш возраст',
                format: Number,
              },
            },
            fields: ['name', 'city', 'age'],
          },
        },
      },
```
 
* `bot/plugins/interview/forms` - обязательный путь до форм.

* `intro`  [String] - название формы. 
	1. Название формы должно быть уникально. 
	2. Название формы используется в portal-части для коннекта с формой.

* `intro.title`  [String] - текст, который видит пользователь при появлении формы.

* `intro.controls`  [Object] - поля формы, которые будут заполняться пользователем.

* `controls.[name/city/age]`  [String] - названия полей формы внутри конфига.

* `controls.name.title`  [String] -  название поля формы, которое видит пользователь в `intro.title`.

* `controls.name.placeholder`  [String] - текст, выводимый перед заполнением поля формы. 

* `controls.name.format` [function] - валидация входных данных.

* `intro.fields`  [Array of String] - массив с активными полями формы.

### Portal

#### Конфиг с проверкой, заполнил ли пользователь необходимые формы.

```
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

* `criteria.messageText`  [String | RegExp] - если текст сообщения не содержит  /registration, то запусти action. Критерий необходим, чтобы при вызове формы не вызывалась проверка на её заполненность.

* `criteria.nextRoute`  [String | RegExp] - если следующее сообщение не содержит  /interview, то запусти action. Данный критерий блокирует вызов action в процессе заполнения формы (иначе проверка на заполненность будет вызываться при каждом вводе поля формы).

* `action.type`  [String] - тип действия бота. Запускает проверку на заполненность формы.

* `action.forms`  [Array of String | String] - список с названиями форм, которые следует заполнить для прохождения проверки.

* `action.then`  [Object]  - действие, если все формы из списка заполнены.

* `action.else`  [Object]  - действие, если хотя бы одна форма из списка не заполнена.
---
#### Конфиг с вызовом формы по триггеру

```
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

* `criteria.chatType`  [String] - тип чата, в котором будет действовать конфиг.

* `criteria.messageText`  [String] - если текст сообщения “/registration”, то запусти action.

* `action.type`  [String] - тип действия бота. Отправляет форму пользователю.

* `action.formName`  [String]- название формы, которая будет отправлена пользователю.

* `action.mode`  [String] - режим для формы -> [form/dialog] . 
	1. form - классическая форма.
	2. dialog - режим живого диалога с ботом (в разработке).

* `action.preview`  [Boolean] - параметр, который указывает, необходимо ли выводить title формы перед вводом данных.

* `action.autosubmit`  [Boolean] - параметр, который указывает, необходимо ли подтверждение данных формы.

* `action.then`  [Object] - действие после завершения ввода данных.