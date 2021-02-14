# LSK.js – uapp

> @lskjs/uapp – LSK universal react app wrapper

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/uapp)](https://www.npmjs.com/package/@lskjs/uapp)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/uapp)](https://www.npmjs.com/package/@lskjs/uapp)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/uapp)](https://bundlephobia.com/result?p=@lskjs/uapp)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/uapp)](https://www.npmjs.com/package/@lskjs/uapp)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/uapp)](https://bundlephobia.com/result?p=@lskjs/uapp)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/uapp)](https://bundlephobia.com/result?p=@lskjs/uapp)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

*   [Auth](#auth)

*   [Bunyan log levels](#bunyan-log-levels)

    *   *   [Log levels](#log-levels)

*   [Что еще нужно дописать](#что-еще-нужно-дописать)

    *   [Getting Started](#getting-started)

        *   [Requirements](#requirements)

        *   [Структура проекта](#структура-проекта)

        *   [Quick Start](#quick-start)

            *   [1. Get the latest version](#1-get-the-latest-version)
            *   [2. Run `npm install`](#2-run-npm-install)
            *   [3. Run `npm start`](#3-run-npm-start)

        *   [How to Build, Test, Deploy](#how-to-build-test-deploy)

        *   [How to Update](#how-to-update)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/uapp @lskjs/i18 @lskjs/link @lskjs/scroll axios bluebird lodash mobx mobx-react prop-types react

# npm
npm i @lskjs/uapp @lskjs/i18 @lskjs/link @lskjs/scroll axios bluebird lodash mobx mobx-react prop-types react
```

asd

    this.useMiddlewares()
    this.useRoutes()
    this.useDefaultRoute()

А также:

*   Express async router
*   Json Web Token
*   Bunyan logger with updated view

# Auth

Токен можно прикладывать следующими методами

*   в Header `Authorization: Bearer %USER_TOKEN%`
*   в Header `X-Access-Token: %USER_TOKEN%`
*   в Cookie: `token=%USER_TOKEN%`
*   в GET параметр: `?token=%USER_TOKEN%`

# Bunyan log levels

LSKit принимает стоковый Bunyan логгер

```javascript
log.trace('Starting method');

if (!req.user) {
  log.fatal('Cannot get User');
  throw new Error('Cannot get User')
}

log.info('Method success');
```

### Log levels

*   fatal
*   error
*   warn
*   info
*   debug
*   trace

# Что еще нужно дописать

*   Что из себя представляет модуль
*   Что такое мидлвара?
*   Что такое ресурс? Resource ENDPOINT
*   Универсальная  модель?
*   Документация со swagger

## Getting Started

### Requirements

*   Mac OS X, Windows, or Linux
*   [Node.js](https://nodejs.org/) v6.5 or newer
*   `npm` v3.10 or newer (new to [npm](https://docs.npmjs.com/)?)
*   `node-gyp` prerequisites mentioned [here](https://github.com/nodejs/node-gyp)
*   Text editor or IDE pre-configured with React/JSX/Flow/ESlint ([learn more](./how-to-configure-text-editors.md))

### Структура проекта

Before you start, take a moment to see how the project structure looks like:

    .
    ├── /build/                     # Директория в которую билдится проект
    ├── /node_modules/              # Сторонние библиотеки и утилиты
    ├── /src/                       # Исходный код приложения
    │   ├── /CoreApp/               # Базовое приложение
    │   │   ├── /api/               # Интерфейс клиент-серверного взаимодействия
    │   │   ├── /middlewares/       # Среднии слои express
    │   │   ├── /models/            # Модели базы данных
    │   │   ├── /resourses/         # Ресурсы
    │   │   ├── CoreApp.js          # Класс-реализация базового приложения
    │   │   ├── requests.js         # Реквесты приложения
    │   │   └── responses.js        # Респонсы приложения
    │   ├── /ReactApp/              # Базовое приложение
    │   │   ├── /compoents/         # React компоненты
    │   │   ├── /Html/              # Класс-реализа
    │   │   ├── /Html/              # Класс-реализа
    │   │   ├── /Html/              # Класс-реализа
    │   │   ├── /routes/            # Роутер с страницами\экранами, которые являются React компонентами
    │   │   ├── /models/            # Модели базы данных
    │   │   ├── /resourses/         # Ресурсы
    │   │   ├── /routes/            # Роутер с страницами\экранами, которые являются React компонентами
    │   │   ├── /stores/            # Сторы React приложения
    │   │   ├   └── /AppStore.js    # Главный стор React приложения
    │   │   ├── ReactApp.client.js  # Класс-реализация базового приложения на клиенте
    │   │   ├── ReactApp.server.js  # Класс-реализация базового приложения на сервере
    │   │   ├── requests.js         # Реквесты приложения
    │   │   └── responses.js        # Респонсы приложения
    │   ├── /client.js              # Точка входа Клиентского приложения
    │   ├── /config                 # Общие настройки проекта
    │   └── /server.js              # Точка входа Сервернрнр приложения
    ├── /test/                      # Модульные и интеграционные тесты
    ├── /tools/                     # Скрипты и утилиты для автоматизации сборки проекта
    │   ├── /config.js              # Конфигурация сборки проекта
    │   ├── /run.js                 # Система запуска сборки
    │   └── /webpack.config.js      # Конфигурация Вебпака для клинстких и серверных бандлов
    └── package.json                # Список сторонних библиотек и утилит

**Note**: The current version of RSK does not contain a Flux implementation.
It can be easily integrated with any Flux library of your choice. The most
commonly used Flux libraries are [Flux](http://facebook.github.io/flux/),
[Redux](http://redux.js.org/), and [Relay](http://facebook.github.io/relay/).

### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of React Starter Kit (RSK) on your
local machine by running:

```shell
$ git clone -o lego-starter-kit -b master --single-branch \
      https://github.com/isuvorov/lego-starter-kit.git MyApp
$ cd MyApp
```

Alternatively, you can start a new project based on RSK right from
[WebStorm IDE](https://www.jetbrains.com/webstorm/help/create-new-project-react-starter-kit.html),
or by using [Yeoman generator](https://www.npmjs.com/package/generator-react-fullstack).

#### 2. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 3. Run `npm start`

This command will build the app from the source files (`/src`) into the output
`/build` folder. As soon as the initial build completes, it will start the
Node.js server (`node build/server.js`) and [Browsersync](https://browsersync.io/)
with [HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it.

> <http://localhost:3000/> — Node.js server (`build/server.js`)<br>
> <http://localhost:3000/graphql> — GraphQL server and IDE<br>
> <http://localhost:3001/> — BrowserSync proxy with HMR, React Hot Transform<br>
> <http://localhost:3002/> — BrowserSync control panel (UI)

Now you can open your web app in a browser, on mobile devices and start
hacking. Whenever you modify any of the source files inside the `/src` folder,
the module bundler ([Webpack](http://webpack.github.io/)) will recompile the
app on the fly and refresh all the connected browsers.

![browsersync](https://dl.dropboxusercontent.com/u/16006521/react-starter-kit/brwosersync.jpg)

Note that the `npm start` command launches the app in `development` mode,
the compiled output files are not optimized and minimized in this case.
You can use `--release` command line argument to check how your app works
in release (production) mode:

```shell
$ npm start -- --release
```

*NOTE: double dashes are required*

### How to Build, Test, Deploy

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run build
```

or, for a production build:

```shell
$ npm run build -- --release
```

or, for a production docker build:

```shell
$ npm run build -- --release --docker
```

*NOTE: double dashes are required*

After running this command, the `/build` folder will contain the compiled
version of the app. For example, you can launch Node.js server normally by
running `node build/server.js`.

To check the source code for syntax errors and potential issues run:

```shell
$ npm run lint
```

To launch unit tests:

```shell
$ npm test              # Run unit tests with Mocha
$ npm run test:watch    # Launch unit test runner and start watching for changes
```

By default, [Mocha](https://mochajs.org/) test runner is looking for test files
matching the `src/**/*.test.js` pattern. Take a look at `src/components/Layout/Layout.test.js`
as an example.

To deploy the app, run:

```shell
$ npm run deploy
```

The deployment script `tools/deploy.js` is configured to push the contents of
the `/build` folder to a remote server via Git. You can easily deploy your app
to [Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/),
or [Heroku](https://www.heroku.com/) this way. Both will execute `npm install --production`
upon receiving new files from you. Note, you should only deploy the contents
of the `/build` folder to a remote server.

### How to Update

If you need to keep your project up to date with the recent changes made to RSK,
you can always fetch and merge them from [this repo](https://github.com/kriasoft/react-starter-kit)
back into your own project by running:

```shell
$ git checkout master
$ git fetch lego-starter-kit
$ git merge lego-starter-kit/master
$ npm install
```

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
