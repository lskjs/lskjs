# LSK.js – apm

> @lskjs/apm – LSK.js – apm – module Node.js agent for Elastic APM

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/apm)](https://www.npmjs.com/package/@lskjs/apm)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/apm)](https://www.npmjs.com/package/@lskjs/apm)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/apm)](https://bundlephobia.com/result?p=@lskjs/apm)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/apm)](https://www.npmjs.com/package/@lskjs/apm)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/apm)](https://bundlephobia.com/result?p=@lskjs/apm)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/apm)](https://bundlephobia.com/result?p=@lskjs/apm)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

    *   [Example](#example)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/apm axios bluebird lodash

# npm
npm i @lskjs/apm axios bluebird lodash
```

***

## Example

```js
const main = async () => {
  const apm = new ApmModule({ 
    serverUrl: 'http://apm.buzz.guru:8200',
    serviceName: 'test'
  })
  await apm.run()

  setInterval(async () => {
    const tx = apm.startTransaction('test transaction', 'job');
    const ts = tx.startSpan('test span', 'span1');
    await Bluebird.delay(Math.random() * 100 + 200);
    await ts.end();
    const ts2 = tx.startSpan('test span2', 'span2');
    await Bluebird.delay(Math.random() * 2000 + 100);
    await apm.captureError(new Error('test error'));
    await ts2.end();
    tx.result = Math.random() < 0.5 ? 'error' : 'success';
    await tx.end();
  }, 100);

}

main();
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
