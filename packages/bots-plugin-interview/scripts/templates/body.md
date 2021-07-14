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