# LSK.js – stats

> @lskjs/stats – LSK.js – stats – Module for count simple statistics

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/stats)](https://www.npmjs.com/package/@lskjs/stats)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/stats)](https://www.npmjs.com/package/@lskjs/stats)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/stats)](https://bundlephobia.com/result?p=@lskjs/stats)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/stats)](https://www.npmjs.com/package/@lskjs/stats)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/stats)](https://bundlephobia.com/result?p=@lskjs/stats)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/stats)](https://bundlephobia.com/result?p=@lskjs/stats)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)
*   [📖 License](#-license)
*   [👥 Contributors](#-contributors)
*   [👏 Contributing](#-contributing)
*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/stats 

# npm
npm i @lskjs/stats 
```

***

Example:

```js
import ready from './polyfill';
import Stats from './Stats';

ready();

const stats = new Stats();
const startedAt = new Date();

setInterval(() => {
  const event = Math.random() < 0.3 ? 'nack' : 'ack';
  const proxy = Math.random() < 0.3 ? 'none' : `proxy_${Math.round((Math.random() * 10) % 10)}`;

  let err;
  if (event === 'nack') {
    err = `code_${Math.round((Math.random() * 10) % 10)}`;
  }
  stats.trigger({ event, startedAt, err, proxy });
  // stats.trigger({ event, startedAt, err, prefix: proxy });
  stats.print();
}, 10);
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
