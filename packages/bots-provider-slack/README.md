# LSK.js – bots-provider-slack

> @lskjs/bots-provider-slack – LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/bots-provider-slack)](https://www.npmjs.com/package/@lskjs/bots-provider-slack)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/bots-provider-slack)](https://www.npmjs.com/package/@lskjs/bots-provider-slack)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/bots-provider-slack)](https://bundlephobia.com/result?p=@lskjs/bots-provider-slack)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/bots-provider-slack)](https://www.npmjs.com/package/@lskjs/bots-provider-slack)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/bots-provider-slack)](https://bundlephobia.com/result?p=@lskjs/bots-provider-slack)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/bots-provider-slack)](https://bundlephobia.com/result?p=@lskjs/bots-provider-slack)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)
*   [Как создать бота в Slack](#как-создать-бота-в-slack)
*   [📖 License](#-license)
*   [👥 Contributors](#-contributors)
*   [👏 Contributing](#-contributing)
*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/bots-provider-slack lodash

# npm
npm i @lskjs/bots-provider-slack lodash
```

***

# Как создать бота в Slack

1.  Заходим на сайт с приложениями slack’а: https://api.slack.com/apps.

2.  Клик `Create New App`

![1](public/1.png)

3.  Клик `From scratch`

![2](public/2.png)

4.  Вводим имя бота и выбираем для него рабочее пространство. Далее жмем `Create App`.

![3](public/3.png)

5.  Клик `Bots`

![4](public/4.png)

6.  Клик `Review Scopes to Add`.

![5](public/5.png)

7.  Спускаемся ниже и выдаем боту следующие права:

![6](public/6.png)

8.  Далее переходим во вкладку с хуками.

![7](public/7.png)

9.  Кликаем на кнопку и добавляем хуки.

![8](public/8.png)

10. Выбираем чат, для которого хотим создать хук.

![9](public/9.png)

11. Получаем хук, который можем скопировать и положить в конфиг. Этот url представляет из себя аналог telegram-chatId. Для каждого чата необходимо создать свой вебхук.

![10](public/10.png)

12. В .env.js url-хук используется аналогично с chatId. Подробнее про конфиги в документации к bots-plugin-notify и bots-plugin-prometheus.

![11](public/11.png)

13. После добавления всех хуков необходимо поместить бота в рабочую область.

![12](public/12.png)

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
