# LSK.js – mailer

> @lskjs/mailer – LSK module for send and receive emails.

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/mailer)](https://www.npmjs.com/package/@lskjs/mailer)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/mailer)](https://www.npmjs.com/package/@lskjs/mailer)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/mailer)](https://bundlephobia.com/result?p=@lskjs/mailer)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/mailer)](https://www.npmjs.com/package/@lskjs/mailer)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/mailer)](https://bundlephobia.com/result?p=@lskjs/mailer)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/mailer)](https://bundlephobia.com/result?p=@lskjs/mailer)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

    *   [Пример использования](#пример-использования)
    *   [Templates](#templates)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/mailer @lskjs/db @lskjs/server-api bluebird lodash

# npm
npm i @lskjs/mailer @lskjs/db @lskjs/server-api bluebird lodash
```

asd

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
\--- | --- | --- |
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
\--- | ---
subject | Тема письма
text | Текст письма

zxczxc

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
