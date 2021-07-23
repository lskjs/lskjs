# Bots Plugin Interview

__Bots Plugin Interview__ (*@lskjs/bots-plugin-interview*) - плагин, позволяющий создавать формы ввода в боте. Реализована вариация с классической браузерной формой с подтверждением введенных данных. Режим диалога находится в стации разработки.

Конфиг для плагина состоит из двух частей - interview и portal. Interview отвечает за настройку формы, её полей и их валидацию. Portal реализует взаимодействие с формой. Например, при каких действиях пользователя будет вызвана форма.

Входные данные сохраняются в базу и хранятся в модели `BotsTelegramUserModel`. Путь в модели  `meta.interview.[formName]`.  

## Interview
Конфиг для настройки формы, её полей и их валиацию.

`bot/plugins/interview/forms` - обязательный путь до форм.

__Params:__

| Field | Type | Description |
| ------ | :------: | ------ |
| intro | String | Название формы. Название формы должно быть уникально и используется в portal-части для коннекта с формой |
| intro.title |  String | Текст, который видит пользователь при появлении формы |
| intro.controls | Object | Поля формы, которые будут заполняться пользователем |
| controls.[name/city/age] | String | Названия полей формы внутри конфига |
| controls.name.title | String | Название поля формы, которое видит пользователь в `intro.title` |
| controls.name.placeholder | String | Текст, выводимый перед заполнением поля формы |
| controls.name.format | Func | Валидация входных данных |
| intro.fields | Array of String |  Массив с активными полями формы |

__Example:__

```js
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
  },
},
```

## Portal
*см. Bost Plugin Portal - checkInterview & replyInterview.*