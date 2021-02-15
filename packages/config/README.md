# LSK.js – config

> @lskjs/config – LSK config.

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/config)](https://www.npmjs.com/package/@lskjs/config)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/config)](https://www.npmjs.com/package/@lskjs/config)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/config)](https://bundlephobia.com/result?p=@lskjs/config)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/config)](https://www.npmjs.com/package/@lskjs/config)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/config)](https://bundlephobia.com/result?p=@lskjs/config)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/config)](https://bundlephobia.com/result?p=@lskjs/config)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

    *   [порядок мерджа конфигов](#порядок-мерджа-конфигов)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/config lodash

# npm
npm i @lskjs/config lodash
```

***

```js
import config from @lskjs/config;
const conf = config({
  some: {
    thing: 123
  }
})

```

## порядок мерджа конфигов

1.  из аргументов config(a, b, c)
2.  из .env.js (если нет js, то ищется json) в папке запуска `.` (если нет в текущей папке ищется в папке выше и так на 3 иерархии)
3.  из ENV переменных `config.some.other=222 npm start`, сюда можно передавать строку в JSON формате `config.some={"thing": 321} npm start`
4.  из argv `npm start --config.some.other 333`, сюда можно передавать строку в JSON формате
5.  из базы данных \[в разработке]
6.  из реалтайм памяти \[в разработке]

файлы вочатся, в случае изменения какого-то файла происходит `config.reinit(newConfig)`  \[если такая функция есть в конфиге]

кстати .env.js можно писать в стиле

```js
module.exports = ({other, ...config}) => ({
  ...config,
  some: 'thing',
})
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
