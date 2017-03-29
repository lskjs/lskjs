Пример использования

template.js - Основной шаблон

Для создания нового шаблона нужно создать класс и отнаследоваться
от tempalte.js.

```javascript
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
