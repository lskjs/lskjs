
## Пример использования

```js
mailer.send({
  to: 'example@gmail.com',
  template: 'recovery',
  params: {
    user: {
      profile: {
        firstName: 'Igor',
        lastName: 'Suvorov',
      },
    },
    password: '123456',
  },
  options: {
     subject: 'Восстановление пароля',
  },
});
```
Поле | Описание | Required
--- | --- | --- |
to | email | true
template | Название шаблона | true
params | Параметры для шаблона | false
options | Опции для письма | false

Опции для отправки письма можно указать в шаблонах.

Шаблоны писем находятся в папке templates.


## Templates

Пример использования

template.js - Основной шаблон

Для создания нового шаблона нужно создать класс и отнаследоваться
от tempalte.js.

```js
import Template from './template';
export default class Recovery extends Template {
  body({ params }) {
    return `
    <body>
      Ваш новый пароль: ${params.password}
    </body>`;
  }
}
```

У шаблонов есть дефолтные опции

Поле | Описание
--- | ---
subject | Тема письма
text | Текст письма
