# LSK.js – bots-plugin-interview

> @lskjs/bots-plugin-interview – LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

    *   [First principles](#first-principles)
    *   [Манифест](#манифест)
    *   [Вопросы на которые стоит ответить создателю:](#вопросы-на-которые-стоит-ответить-создателю)
    *   [Как запускать любой lsk-образный проект](#как-запускать-любой-lsk-образный-проект)
    *   [Packages included in this repo](#packages-included-in-this-repo)

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
yarn i @lskjs/bots-plugin-portal bluebird lodash

# npm
npm i @lskjs/bots-plugin-portal bluebird lodash
```

***

## First principles

*   Асинхронность все везде
*   Ленивость всех операций
*   Декларативный подход для конечного программиста

## Манифест

    Стандарт бы и 5 лет назад, но авангардисты JS создали coffescript, babel и ts, потому что JS окостенел и не двигался. Так же как и ВКшники написали свой KPHP. 

    В этом пути нет ничего постыдного, то что еще вчера считалось ебанистикой, завтра может захватить умы своим удобством.

    У меня нет априорной аппеляции к авторитетам из ECMA. 

    Я делаю среду комфортную для конечного программиста, который делает продукт для клиента. 
    Если стандарт позволяет написать удобное решение — то придумаем как.
    Если для этого придется переписать стандарт — значит перепишем. 
    Благо babel максимальным образом позволяет писать собственные диалекты.

    Не задача должна прогибаться под решением, а решение под задачу.

## Вопросы на которые стоит ответить создателю:

*   Пример Api на бэке handler
*   Пример функции и как ее переопределить
*   Модели монго как подключить
*   Как достать, когда пишешь Api
*   Роутер добавление роута и страницы
*   CrudApi основные методы
*   Как оборачивать ответ сервера, чтобы вернулся объект
*   Как сделать свой стор
*   Как достать стор на странице

## Как запускать любой lsk-образный проект

1.  git clone `repo`
2.  npm install
3.  npm run bootstrap
4.

*   copy .env.js if needed
*   npm run dev *or*
*   cd packages/`package` && npm run dev

## Packages included in this repo

|      Package         |    Description  | Activity | Version | Bundle | <nobr>Package Size</nobr>
| -------------------- | --------------- | -------- | ------- | ------ | -------------------------
| [apiquery](packages/apiquery) | http/s + websockets api client for Web, Node.js and React Native throw fetch or axios | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/apiquery.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/apiquery) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/apiquery.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/apiquery) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/apiquery?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/apiquery) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/apiquery)](https://packagephobia.now.sh/result?p=@lskjs/apiquery)
| [apm](packages/apm) | LSK.js – apm – module Node.js agent for Elastic APM | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/apm.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/apm) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/apm.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/apm) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/apm?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/apm) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/apm)](https://packagephobia.now.sh/result?p=@lskjs/apm)
| [auth](packages/auth) | LSK.js – auth – module for authorization by login and password and singup through social networks | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/auth.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/auth) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/auth.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/auth) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/auth?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/auth) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/auth)](https://packagephobia.now.sh/result?p=@lskjs/auth)
| [autobind](packages/autobind) | LSK ux subrepo: autobind | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/autobind.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/autobind) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/autobind.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/autobind) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/autobind?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/autobind) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/autobind)](https://packagephobia.now.sh/result?p=@lskjs/autobind)
| [billing](packages/billing) | LSK.js module for adding billing in cabinet | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/billing.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/billing) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/billing.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/billing) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/billing?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/billing) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/billing)](https://packagephobia.now.sh/result?p=@lskjs/billing)
| [bots](packages/bots) | LSK.js module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots)](https://packagephobia.now.sh/result?p=@lskjs/bots)
| [bots-base](packages/bots-base) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-base.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-base) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-base.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-base) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-base?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-base) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-base)](https://packagephobia.now.sh/result?p=@lskjs/bots-base)
| [bots-plugin](packages/bots-plugin) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-plugin.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-plugin.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-plugin?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-plugin) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-plugin)](https://packagephobia.now.sh/result?p=@lskjs/bots-plugin)
| [bots-plugin-debug](packages/bots-plugin-debug) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-plugin-debug.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-debug) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-plugin-debug.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-debug) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-plugin-debug?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-debug) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-plugin-debug)](https://packagephobia.now.sh/result?p=@lskjs/bots-plugin-debug)
| [bots-plugin-menu](packages/bots-plugin-menu) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-plugin-menu.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-menu) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-plugin-menu.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-menu) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-plugin-menu?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-menu) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-plugin-menu)](https://packagephobia.now.sh/result?p=@lskjs/bots-plugin-menu)
| [bots-plugin-notify](packages/bots-plugin-notify) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-plugin-notify.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-notify) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-plugin-notify.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-notify) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-plugin-notify?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-notify) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-plugin-notify)](https://packagephobia.now.sh/result?p=@lskjs/bots-plugin-notify)
| [bots-plugin-polundra](packages/bots-plugin-polundra) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-plugin-polundra.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-polundra) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-plugin-polundra.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-polundra) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-plugin-polundra?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-polundra) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-plugin-polundra)](https://packagephobia.now.sh/result?p=@lskjs/bots-plugin-polundra)
| [bots-plugin-portal](packages/bots-plugin-portal) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-plugin-portal.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-portal) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-plugin-portal.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-plugin-portal) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-plugin-portal?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-plugin-portal) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-plugin-portal)](https://packagephobia.now.sh/result?p=@lskjs/bots-plugin-portal)
| [bots-provider](packages/bots-provider) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider)
| [bots-provider-clubhouse](packages/bots-provider-clubhouse) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-clubhouse.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-clubhouse) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-clubhouse.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-clubhouse) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-clubhouse?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-clubhouse) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-clubhouse)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-clubhouse)
| [bots-provider-discord](packages/bots-provider-discord) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-discord.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-discord) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-discord.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-discord) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-discord?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-discord) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-discord)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-discord)
| [bots-provider-instagram](packages/bots-provider-instagram) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-instagram.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-instagram) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-instagram.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-instagram) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-instagram?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-instagram) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-instagram)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-instagram)
| [bots-provider-slack](packages/bots-provider-slack) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-slack.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-slack) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-slack.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-slack) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-slack?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-slack) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-slack)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-slack)
| [bots-provider-telegram](packages/bots-provider-telegram) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-telegram.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-telegram) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-telegram.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-telegram) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-telegram?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-telegram) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-telegram)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-telegram)
| [bots-provider-twitter](packages/bots-provider-twitter) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-twitter.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-twitter) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-twitter.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-twitter) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-twitter?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-twitter) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-twitter)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-twitter)
| [bots-provider-vk](packages/bots-provider-vk) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-vk.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-vk) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-vk.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-vk) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-vk?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-vk) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-vk)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-vk)
| [bots-provider-whatsapp](packages/bots-provider-whatsapp) | LSK.js plugin for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-provider-whatsapp.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-whatsapp) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-provider-whatsapp.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-provider-whatsapp) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-provider-whatsapp?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-provider-whatsapp) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-provider-whatsapp)](https://packagephobia.now.sh/result?p=@lskjs/bots-provider-whatsapp)
| [bots-router](packages/bots-router) | LSK.js router for @lskjs/bots module for telegram, slack, discord, whatsapp, twitter, instagram and vk bots creation | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots-router.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-router) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots-router.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots-router) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots-router?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots-router) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bots-router)](https://packagephobia.now.sh/result?p=@lskjs/bots-router)
| [build-locales](packages/build-locales) | CLI for build i18 locales from Google spreadsheet | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/build-locales.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/build-locales) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/build-locales.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/build-locales) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/build-locales?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/build-locales) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/build-locales)](https://packagephobia.now.sh/result?p=@lskjs/build-locales)
| [bunyan](packages/bunyan) | Light weight bunyan logger for a JSON logging library for node.js services without dtrace | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bunyan.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bunyan) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bunyan.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/bunyan) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bunyan?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bunyan) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/bunyan)](https://packagephobia.now.sh/result?p=@lskjs/bunyan)
| [config](packages/config) | LSK config. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/config.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/config) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/config.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/config) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/config?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/config) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/config)](https://packagephobia.now.sh/result?p=@lskjs/config)
| [db](packages/db) | LSK.js module for working with mongodb database | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/db.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/db) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/db.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/db) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/db?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/db) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/db)](https://packagephobia.now.sh/result?p=@lskjs/db)
| [elastic](packages/elastic) | LSK.js module for elastic search | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/elastic.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/elastic) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/elastic.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/elastic) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/elastic?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/elastic) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/elastic)](https://packagephobia.now.sh/result?p=@lskjs/elastic)
| [event](packages/event) | LSK module for event. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/event.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/event) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/event.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/event) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/event?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/event) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/event)](https://packagephobia.now.sh/result?p=@lskjs/event)
| [getspreadsheet](packages/getspreadsheet) | LSK getspreadsheet. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/getspreadsheet.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/getspreadsheet) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/getspreadsheet.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/getspreadsheet) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/getspreadsheet?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/getspreadsheet) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/getspreadsheet)](https://packagephobia.now.sh/result?p=@lskjs/getspreadsheet)
| [grant](packages/grant) | LSK module for grant. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/grant.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/grant) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/grant.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/grant) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/grant?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/grant) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/grant)](https://packagephobia.now.sh/result?p=@lskjs/grant)
| [i18](packages/i18) | LSK module for internationalization with i18next. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/i18.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/i18) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/i18.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/i18) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/i18?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/i18) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/i18)](https://packagephobia.now.sh/result?p=@lskjs/i18)
| [kafka](packages/kafka) | LSK module for kafka. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/kafka.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/kafka) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/kafka.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/kafka) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/kafka?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/kafka) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/kafka)](https://packagephobia.now.sh/result?p=@lskjs/kafka)
| [launcher](packages/launcher) | LSK Launcher. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/launcher.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/launcher) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/launcher.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/launcher) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/launcher?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/launcher) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/launcher)](https://packagephobia.now.sh/result?p=@lskjs/launcher)
| [linkall](packages/linkall) | LSK link all. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/linkall.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/linkall) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/linkall.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/linkall) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/linkall?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/linkall) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/linkall)](https://packagephobia.now.sh/result?p=@lskjs/linkall)
| [log](packages/log) | LSK log. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/log.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/log) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/log.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/log) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/log?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/log) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/log)](https://packagephobia.now.sh/result?p=@lskjs/log)
| [log2](packages/log2) | Логгер совмещающий лучшие черты morgan, winston, bunyan, logrus. debug. Базируется на debug-level. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/log2.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/log2) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/log2.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/log2) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/log2?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/log2) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/log2)](https://packagephobia.now.sh/result?p=@lskjs/log2)
| [mailer](packages/mailer) | LSK module for send and receive emails. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/mailer.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/mailer) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/mailer.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/mailer) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/mailer?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/mailer) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/mailer)](https://packagephobia.now.sh/result?p=@lskjs/mailer)
| [mobx](packages/mobx) | LSK module for mobx. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/mobx.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/mobx) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/mobx.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/mobx) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/mobx?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/mobx) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/mobx)](https://packagephobia.now.sh/result?p=@lskjs/mobx)
| [module](packages/module) | Module system with dependency injection, event emitter, logger and submodules tree | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/module.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/module) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/module.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/module) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/module?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/module) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/module)](https://packagephobia.now.sh/result?p=@lskjs/module)
| [permit](packages/permit) | LSK module for one time codes and permits. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/permit.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/permit) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/permit.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/permit) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/permit?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/permit) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/permit)](https://packagephobia.now.sh/result?p=@lskjs/permit)
| [proxy](packages/proxy) | LSK module for proxy. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/proxy.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/proxy) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/proxy.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/proxy) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/proxy?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/proxy) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/proxy)](https://packagephobia.now.sh/result?p=@lskjs/proxy)
| [rabbit](packages/rabbit) | LSK module for rabbit. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/rabbit.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/rabbit) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/rabbit.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/rabbit) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/rabbit?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/rabbit) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/rabbit)](https://packagephobia.now.sh/result?p=@lskjs/rabbit)
| [reactapp](packages/reactapp) | LSK ux subrepo: reactapp | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/reactapp.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/reactapp) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/reactapp.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/reactapp) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/reactapp?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/reactapp) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/reactapp)](https://packagephobia.now.sh/result?p=@lskjs/reactapp)
| [rlog](packages/rlog) | LSK module for remote logger. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/rlog.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/rlog) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/rlog.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/rlog) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/rlog?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/rlog) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/rlog)](https://packagephobia.now.sh/result?p=@lskjs/rlog)
| [scylla](packages/scylla) | LSK module for scylla. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/scylla.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/scylla) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/scylla.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/scylla) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/scylla?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/scylla) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/scylla)](https://packagephobia.now.sh/result?p=@lskjs/scylla)
| [sequelize](packages/sequelize) | LSK module for sequelize. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sequelize.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/sequelize) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sequelize.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/sequelize) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/sequelize?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/sequelize) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/sequelize)](https://packagephobia.now.sh/result?p=@lskjs/sequelize)
| [server](packages/server) | LSK server. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/server.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/server) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/server.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/server) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/server?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/server) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/server)](https://packagephobia.now.sh/result?p=@lskjs/server)
| [server-api](packages/server-api) | LSK server-api. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/server-api.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/server-api) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/server-api.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/server-api) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/server-api?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/server-api) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/server-api)](https://packagephobia.now.sh/result?p=@lskjs/server-api)
| [sh](packages/sh) | LSK ux subrepo: sh | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sh.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/sh) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sh.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/sh) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/sh?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/sh) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/sh)](https://packagephobia.now.sh/result?p=@lskjs/sh)
| [sms](packages/sms) | LSK module for sms. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sms.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/sms) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sms.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/sms) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/sms?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/sms) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/sms)](https://packagephobia.now.sh/result?p=@lskjs/sms)
| [tbot](packages/tbot) | LSK module. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/tbot.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/tbot) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/tbot.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/tbot) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/tbot?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/tbot) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/tbot)](https://packagephobia.now.sh/result?p=@lskjs/tbot)
| [uapp](packages/uapp) | LSK universal react app wrapper | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/uapp.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/uapp) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/uapp.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/uapp) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/uapp?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/uapp) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/uapp)](https://packagephobia.now.sh/result?p=@lskjs/uapp)
| [upload](packages/upload) | LSK module for uploading files. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/upload.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/upload) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/upload.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/upload) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/upload?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/upload) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/upload)](https://packagephobia.now.sh/result?p=@lskjs/upload)
| [utils](packages/utils) | LSK.js – utils – helpers and functions | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/utils.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/utils) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/utils.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/utils) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/utils?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/utils) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/utils)](https://packagephobia.now.sh/result?p=@lskjs/utils)
| [worker](packages/worker) | LSK module for worker. | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/worker.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/worker) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/worker.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/worker) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/worker?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/worker) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/worker)](https://packagephobia.now.sh/result?p=@lskjs/worker)
| [add-to-calendar](packages/add-to-calendar) | LSK ux subrepo: extra | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/add-to-calendar.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/add-to-calendar) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/add-to-calendar.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/add-to-calendar) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/add-to-calendar?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/add-to-calendar) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/add-to-calendar)](https://packagephobia.now.sh/result?p=@lskjs/add-to-calendar)
| [article](packages/article) | LSK ux subrepo: article | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/article.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/article) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/article.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/article) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/article?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/article) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/article)](https://packagephobia.now.sh/result?p=@lskjs/article)
| [avatar](packages/avatar) | LSK ux subrepo: avatar | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/avatar.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/avatar) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/avatar.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/avatar) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/avatar?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/avatar) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/avatar)](https://packagephobia.now.sh/result?p=@lskjs/avatar)
| [button](packages/button) | LSK ux subrepo: button | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/button.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/button) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/button.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/button) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/button?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/button) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/button)](https://packagephobia.now.sh/result?p=@lskjs/button)
| [button2](packages/button2) | LSK ux subrepo: button | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/button2.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/button2) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/button2.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/button2) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/button2?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/button2) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/button2)](https://packagephobia.now.sh/result?p=@lskjs/button2)
| [chat](packages/chat) | LSK ux subrepo: chat | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/chat.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/chat) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/chat.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/chat) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/chat?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/chat) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/chat)](https://packagephobia.now.sh/result?p=@lskjs/chat)
| [cookie-consent](packages/cookie-consent) | LSK ux subrepo: cookie-consent | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/cookie-consent.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/cookie-consent) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/cookie-consent.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/cookie-consent) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/cookie-consent?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/cookie-consent) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/cookie-consent)](https://packagephobia.now.sh/result?p=@lskjs/cookie-consent)
| [css](packages/css) | LSK ux subrepo: css | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/css.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/css) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/css.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/css) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/css?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/css) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/css)](https://packagephobia.now.sh/result?p=@lskjs/css)
| [dash](packages/dash) | LSK.js – Dash – React components for your own dashboard | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/dash.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/dash) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/dash.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/dash) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/dash?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/dash) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/dash)](https://packagephobia.now.sh/result?p=@lskjs/dash)
| [dashboard](packages/dashboard) | LSK ux subrepo: dashboard | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/dashboard.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/dashboard) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/dashboard.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/dashboard) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/dashboard?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/dashboard) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/dashboard)](https://packagephobia.now.sh/result?p=@lskjs/dashboard)
| [dev](packages/dev) | LSK ux subrepo: ui-dev | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/dev.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/dev) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/dev.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/dev) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/dev?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/dev) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/dev)](https://packagephobia.now.sh/result?p=@lskjs/dev)
| [docs](packages/docs) | lskjs docs | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/docs.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/docs) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/docs.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/docs) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/docs?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/docs) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/docs)](https://packagephobia.now.sh/result?p=@lskjs/docs)
| [interviews](packages/interviews) | LSK ux subrepo: interview | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/interviews.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/interviews) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/interviews.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/interviews) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/interviews?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/interviews) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/interviews)](https://packagephobia.now.sh/result?p=@lskjs/interviews)
| [extra](packages/extra) | LSK ux subrepo: extra | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/extra.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/extra) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/extra.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/extra) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/extra?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/extra) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/extra)](https://packagephobia.now.sh/result?p=@lskjs/extra)
| [flag](packages/flag) | LSK ux subrepo: flag | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/flag.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/flag) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/flag.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/flag) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/flag?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/flag) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/flag)](https://packagephobia.now.sh/result?p=@lskjs/flag)
| [form](packages/form) | LSK ux subrepo: form | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/form) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/form) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/form)](https://packagephobia.now.sh/result?p=@lskjs/form)
| [grid](packages/grid) | LSK ux subrepo: grid | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/grid.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/grid) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/grid.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/grid) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/grid?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/grid) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/grid)](https://packagephobia.now.sh/result?p=@lskjs/grid)
| [gridtable](packages/gridtable) | LSK ux subrepo: gridtable | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/gridtable.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/gridtable) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/gridtable.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/gridtable) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/gridtable?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/gridtable) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/gridtable)](https://packagephobia.now.sh/result?p=@lskjs/gridtable)
| [image](packages/image) | LSK ux subrepo: image | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/image.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/image) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/image.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/image) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/image?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/image) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/image)](https://packagephobia.now.sh/result?p=@lskjs/image)
| [landing](packages/landing) | LSK ux subrepo: landing | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/landing.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/landing) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/landing.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/landing) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/landing?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/landing) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/landing)](https://packagephobia.now.sh/result?p=@lskjs/landing)
| [link](packages/link) | LSK ux subrepo: link | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/link.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/link) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/link.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/link) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/link?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/link) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/link)](https://packagephobia.now.sh/result?p=@lskjs/link)
| [list](packages/list) | LSK ux subrepo: list | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/list.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/list) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/list.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/list) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/list?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/list) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/list)](https://packagephobia.now.sh/result?p=@lskjs/list)
| [modal](packages/modal) | LSK ux subrepo: modal | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/modal.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/modal) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/modal.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/modal) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/modal?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/modal) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/modal)](https://packagephobia.now.sh/result?p=@lskjs/modal)
| [navbar](packages/navbar) | LSK ux subrepo: navbar | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/navbar.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/navbar) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/navbar.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/navbar) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/navbar?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/navbar) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/navbar)](https://packagephobia.now.sh/result?p=@lskjs/navbar)
| [notification](packages/notification) | LSK ux subrepo: notification | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/notification.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/notification) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/notification.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/notification) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/notification?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/notification) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/notification)](https://packagephobia.now.sh/result?p=@lskjs/notification)
| [page](packages/page) | LSK ux subrepo: page | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/page.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/page) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/page.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/page) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/page?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/page) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/page)](https://packagephobia.now.sh/result?p=@lskjs/page)
| [progress](packages/progress) | LSK ux subrepo: progress | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/progress.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/progress) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/progress.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/progress) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/progress?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/progress) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/progress)](https://packagephobia.now.sh/result?p=@lskjs/progress)
| [scroll](packages/scroll) | LSK ux subrepo: scroll | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/scroll.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/scroll) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/scroll.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/scroll) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/scroll?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/scroll) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/scroll)](https://packagephobia.now.sh/result?p=@lskjs/scroll)
| [slide](packages/slide) | LSK ux subrepo: slide | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/slide.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/slide) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/slide.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/slide) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/slide?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/slide) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/slide)](https://packagephobia.now.sh/result?p=@lskjs/slide)
| [t](packages/t) | LSK ux subrepo: t | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/t.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/t) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/t.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/t) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/t?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/t) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/t)](https://packagephobia.now.sh/result?p=@lskjs/t)
| [tag](packages/tag) | LSK ux subrepo: tag | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/tag.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/tag) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/tag.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/tag) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/tag?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/tag) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/tag)](https://packagephobia.now.sh/result?p=@lskjs/tag)
| [theme](packages/theme) | LSK ux subrepo: theme | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/theme.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/theme) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/theme.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/theme) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/theme?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/theme) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/theme)](https://packagephobia.now.sh/result?p=@lskjs/theme)
| [typo](packages/typo) | LSK ux subrepo: typo | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/typo.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/typo) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/typo.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/typo) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/typo?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/typo) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/typo)](https://packagephobia.now.sh/result?p=@lskjs/typo)
| [ui](packages/ui) | LSK ux subrepo: ui | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/ui.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/ui.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/ui?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/ui) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/ui)](https://packagephobia.now.sh/result?p=@lskjs/ui)
| [ui2](packages/ui2) | LSK ux subrepo: ui2 | [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/ui2.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui2) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/ui2.svg?logo=npm\&label=\&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui2) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/ui2?label=\&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/ui2) | [![install size](https://packagephobia.now.sh/badge?p=@lskjs/ui2)](https://packagephobia.now.sh/result?p=@lskjs/ui2)

Вдохновлен:

*   [Express.js](): концепция средних слоев, способ их конфигурирования
*   [Sails.js & Grails.js]()
*   [Loopback](egoegoegoegoegoegoeg)
*   https://github.com/developit/express-es6-rest-api/
*   react-starter-kit: Фронт, Сборка на ES6 без Gulp, Grunt. Конфиг webpack'а

<!---->

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
    │   └── /server.js              # Точка входа Серверного приложения
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
