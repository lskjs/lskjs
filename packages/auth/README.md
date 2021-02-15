# LSK.js – auth

> @lskjs/auth – LSK.js – auth – module for authorization by login and password and singup through social networks

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/auth)](https://www.npmjs.com/package/@lskjs/auth)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/auth)](https://www.npmjs.com/package/@lskjs/auth)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/auth)](https://bundlephobia.com/result?p=@lskjs/auth)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/auth)](https://www.npmjs.com/package/@lskjs/auth)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/auth)](https://bundlephobia.com/result?p=@lskjs/auth)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/auth)](https://bundlephobia.com/result?p=@lskjs/auth)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)
*   [достал из chat.server.js](#достал-из-chatserverjs)
*   [📖 License](#-license)
*   [👥 Contributors](#-contributors)
*   [👏 Contributing](#-contributing)
*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/auth @lskjs/db @lskjs/mobx @lskjs/server-api axios bluebird js-cookie lodash mobx

# npm
npm i @lskjs/auth @lskjs/db @lskjs/mobx @lskjs/server-api axios bluebird js-cookie lodash mobx
```

***

# достал из chat.server.js

```js
 Message.getRole(userId) -> owner
 Message.is('owner')  // ?
 Message.roles = {
  owner: {
    read: ['title', 'createdAt'], // all
    write: ['user, 'owner'] // info
 }
  guest: {
    read: ['title', 'createdAt'], // all
    write: ['user, 'owner'] // null
 }
 validate params
 1) OWNER
 2) Public


 Message.isOwner = (userId) => { this.ownerId } ['content']
 Message.canWrite = ['content']
 MEssage.canWrite = ['content']

 schema = {
   title: {
     canWrite: () => {}
   }
 }
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
