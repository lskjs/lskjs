Пример использования

```javascript
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
