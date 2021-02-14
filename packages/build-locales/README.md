# LSK.js – build-locales

> @lskjs/build-locales – CLI for build i18 locales from Google spreadsheet

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/build-locales)](https://www.npmjs.com/package/@lskjs/build-locales)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/build-locales)](https://www.npmjs.com/package/@lskjs/build-locales)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/build-locales)](https://bundlephobia.com/result?p=@lskjs/build-locales)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/build-locales)](https://www.npmjs.com/package/@lskjs/build-locales)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/build-locales)](https://bundlephobia.com/result?p=@lskjs/build-locales)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/build-locales)](https://bundlephobia.com/result?p=@lskjs/build-locales)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

    *   [модуль для работы с интернационализацией](#модуль-для-работы-с-интернационализацией)

        *   *   [Использование build-locales](#использование-build-locales)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/build-locales 

# npm
npm i @lskjs/build-locales 
```

asd

## модуль для работы с интернационализацией

#### Использование build-locales

    $ @lskjs/build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

    Обязательные опции:
      --locales  Одна или несколько локалей, приер: ru или ru,en или en
      --link  Одна или несколько ссылок, пример: --link url1 --link url2
      --dist  Место назначения, куда сгенерируются готовые локали


    Примеры:
      $ @lskjs/i18/build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

      $ @lskjs/i18/build-locales --locales en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

      $ @lskjs/i18/build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

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
