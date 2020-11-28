![Lego Starter Kit](http://i.imgur.com/RJ5WyRL.jpg)

## Вопросы на которые стоит ответить создателю:

- Пример Api на бэке handler
- Пример функции и как ее переопределить
- Модели монго как подключить
- Как достать, когда пишешь Api
- Роутер добавление роута и страницы
- CrudApi основные методы
- Как оборачивать ответ сервера, чтобы вернулся объект
- Как сделать свой стор
- Как достать стор на странице


## Как запускать любой lsk-образный проект

1. git clone `repo`
2. npm install
3. npm run bootstrap
4. 
 - copy .env.js if needed
 - npm run dev *or*  
 - cd packages/`package` && npm run dev

## Packages included in this repo

| Package | Description | Status
|--- |--- |--- 
| [@lskjs/apiquery](packages/apiquery) | пакет для общения front'a с back'ом, написан на axios, умеет в сокеты через socket.io	| [npm](https://npmjs.com/package/@lskjs/apiquery) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/apiquery.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/apiquery) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/apiquery.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/apiquery) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/apiquery) 
| [@lskjs/auth](packages/auth) | пакет в котором описана логика авторизации, имеет серверную и клиентскую часть	| [npm](https://npmjs.com/package/@lskjs/auth) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/auth.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/auth) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/auth.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/auth) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/auth) 
| [@lskjs/autobind](packages/autobind) | пакет обертка над autobind-decorator, не знаю зачем :)	| [npm](https://npmjs.com/package/@lskjs/autobind) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/autobind.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/autobind) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/autobind.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/autobind) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/autobind) 
| [@lskjs/billing](packages/billing) | позволяет подключать платежные системы	| [npm](https://npmjs.com/package/@lskjs/billing) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/billing.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/billing) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/billing.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/billing) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/billing) 
| [@lskjs/bots](packages/bots) | позволяет подключать различных ботов в проект: telegram, discord, .etc	| [npm](https://npmjs.com/package/@lskjs/bots) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/bots) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/bots) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/bots) 
| [@lskjs/build-locales](packages/build-locales) | билдит локали из google spreadsheets	| [npm](https://npmjs.com/package/@lskjs/build-locales) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/build-locales.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/build-locales) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/build-locales.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/build-locales) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/build-locales) 
| [@lskjs/bunyan](packages/bunyan) | логгер	| [npm](https://npmjs.com/package/@lskjs/bunyan) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bunyan.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/bunyan) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bunyan.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/bunyan) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/bunyan) 
| [@lskjs/config](packages/config) | пакет который умеет собирать конфиг из разные файлов, env переменных	| [npm](https://npmjs.com/package/@lskjs/config) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/config.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/config) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/config.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/config) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/config) 
| [@lskjs/db](packages/db) | пакет для подключения к mongo, умеет в реконнект и имеет свой дефолтный конфиг	| [npm](https://npmjs.com/package/@lskjs/db) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/db.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/db) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/db.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/db) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/db) 
| [@lskjs/elastic](packages/elastic) | пакет для работы с ES, умеет делать запись, читать и создавать таблицы	| [npm](https://npmjs.com/package/@lskjs/elastic) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/elastic.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/elastic) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/elastic.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/elastic) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/elastic) 
| [@lskjs/event](packages/event) | пакет для глобальных event'ов в приложении, работает и на клиенте и на сервере. app.on('event')	| [npm](https://npmjs.com/package/@lskjs/event) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/event.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/event) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/event.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/event) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/event) 
| [@lskjs/getspreadsheet](packages/getspreadsheet) | пакет для build-locales, умеет парсить google spreadsheet 	| [npm](https://npmjs.com/package/@lskjs/getspreadsheet) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/getspreadsheet.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/getspreadsheet) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/getspreadsheet.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/getspreadsheet) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/getspreadsheet) 
| [@lskjs/grant](packages/grant) | пакет с грантами, гранты нужны чтобы ограничивать часть функционала для некоторых пользователей	| [npm](https://npmjs.com/package/@lskjs/grant) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/grant.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/grant) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/grant.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/grant) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/grant) 
| [@lskjs/i18](packages/i18) | пакет с локализациями и переводами, умеет менять текст в зависимости от выбранной локали	| [npm](https://npmjs.com/package/@lskjs/i18) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/i18.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/i18) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/i18.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/i18) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/i18) 
| [@lskjs/launcher](packages/launcher) | пакет-утилита для запуска проектов в нужной последовательности. В разработке.	| [npm](https://npmjs.com/package/@lskjs/launcher) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/launcher.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/launcher) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/launcher.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/launcher) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/launcher) 
| [@lskjs/linkall](packages/linkall) | пакет линкующий все локальные lsk пакеты друг в друга	| [npm](https://npmjs.com/package/@lskjs/linkall) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/linkall.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/linkall) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/linkall.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/linkall) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/linkall) 
| [@lskjs/log](packages/log) | логгер, подключен во всех модулях	| [npm](https://npmjs.com/package/@lskjs/log) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/log.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/log) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/log.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/log) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/log) 
| [@lskjs/mailer](packages/mailer) | пакет для отправки почты, есть шаблоны для писем	| [npm](https://npmjs.com/package/@lskjs/mailer) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/mailer.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/mailer) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/mailer.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/mailer) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/mailer) 
| [@lskjs/mobx](packages/mobx) | пакет с модулем mobx	| [npm](https://npmjs.com/package/@lskjs/mobx) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/mobx.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/mobx) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/mobx.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/mobx) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/mobx) 
| [@lskjs/module](packages/module) | пакет от которого наследуются остальные модули, имеет в себе встроенный логер, ee, функции init, start и прочее	| [npm](https://npmjs.com/package/@lskjs/module) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/module.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/module) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/module.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/module) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/module) 
| [@lskjs/permit](packages/permit) | генерирует hash'ы, N-значные коды, позволяет создавать функционал для активации аккаунтов пользователей через уникальные одноразовые ссылки, или делать что то подобное(ну хз сложно описать)	| [npm](https://npmjs.com/package/@lskjs/permit) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/permit.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/permit) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/permit.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/permit) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/permit) 
| [@lskjs/rabbit](packages/rabbit) | пакет для работы с rabbitmq, умеет создавать, читать и писать в очереди	| [npm](https://npmjs.com/package/@lskjs/rabbit) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/rabbit.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/rabbit) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/rabbit.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/rabbit) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/rabbit) 
| [@lskjs/reactapp](packages/reactapp) | пакет с реализацией react и SSR	| [npm](https://npmjs.com/package/@lskjs/reactapp) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/reactapp.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/reactapp) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/reactapp.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/reactapp) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/reactapp) 
| [@lskjs/rlog](packages/rlog) | remote logs	| [npm](https://npmjs.com/package/@lskjs/rlog) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/rlog.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/rlog) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/rlog.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/rlog) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/rlog) 
| [@lskjs/sequelize](packages/sequelize) | пакет для работы с sql'ными базами данных, postgres, mysql	| [npm](https://npmjs.com/package/@lskjs/sequelize) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sequelize.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sequelize) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sequelize.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sequelize) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sequelize) 
| [@lskjs/server](packages/server) | сервер с уже подключенными бд, мидлварами, express и прочим	| [npm](https://npmjs.com/package/@lskjs/server) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/server.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/server) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/server.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/server) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/server) 
| [@lskjs/server-api](packages/server-api) | пакет для создания api в проекте	| [npm](https://npmjs.com/package/@lskjs/server-api) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/server-api.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/server-api) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/server-api.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/server-api) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/server-api) 
| [@lskjs/sh](packages/sh) | позволяет выполнять shell скрипты через ноду, может в асинхронность	| [npm](https://npmjs.com/package/@lskjs/sh) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sh.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sh) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sh.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sh) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sh) 
| [@lskjs/sms](packages/sms) | пакет для отправки sms	| [npm](https://npmjs.com/package/@lskjs/sms) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sms.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sms) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sms.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sms) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/sms) 
| [@lskjs/tbot](packages/tbot) | телеграмм бот	| [npm](https://npmjs.com/package/@lskjs/tbot) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/tbot.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/tbot) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/tbot.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/tbot) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/tbot) 
| [@lskjs/uapp](packages/uapp) | универсальное реакт приложение	| [npm](https://npmjs.com/package/@lskjs/uapp) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/uapp.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/uapp) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/uapp.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/uapp) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/uapp) 
| [@lskjs/upload](packages/upload) | пакет по загрузке файлов на сервер, имеет серверную и клиентствую часть	| [npm](https://npmjs.com/package/@lskjs/upload) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/upload.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/upload) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/upload.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/upload) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/upload) 
| [@lskjs/utils](packages/utils) | пакет с кучей мелких утилит, типо lodash только от мира lskjs	| [npm](https://npmjs.com/package/@lskjs/utils) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/utils.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/utils) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/utils.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/utils) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/utils) 
| [@lskjs/worker](packages/worker) | Пакет для созданий воркера(небольшого куска кода который выполняет определенную задачу) устарел, не используется	| [npm](https://npmjs.com/package/@lskjs/worker) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/worker.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/worker) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/worker.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/worker) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/worker) 
| [@lskjs/add-to-calendar](packages/add-to-calendar) | пакет для добавления эвентов в календари	| [npm](https://npmjs.com/package/@lskjs/add-to-calendar) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/add-to-calendar.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/add-to-calendar) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/add-to-calendar.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/add-to-calendar) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/add-to-calendar) 
| [@lskjs/article](packages/article) | статья	| [npm](https://npmjs.com/package/@lskjs/article) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/article.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/article) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/article.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/article) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/article) 
| [@lskjs/avatar](packages/avatar) | пакет для отображения аватаров / изображений с fallback	| [npm](https://npmjs.com/package/@lskjs/avatar) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/avatar.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/avatar) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/avatar.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/avatar) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/avatar) 
| [@lskjs/button](packages/button) | пакет c React компонентами для кнопки и группы кнопок	| [npm](https://npmjs.com/package/@lskjs/button) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/button.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/button) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/button.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/button) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/button) 
| [@lskjs/cookie-consent](packages/cookie-consent) | HOC для обертки вьюхи чтобы делать модалки куки консента	| [npm](https://npmjs.com/package/@lskjs/cookie-consent) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/cookie-consent.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/cookie-consent) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/cookie-consent.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/cookie-consent) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/cookie-consent) 
| [@lskjs/css](packages/css) | пакет для инжекта глобальных стилей antd и bootstrap	| [npm](https://npmjs.com/package/@lskjs/css) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/css.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/css) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/css.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/css) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/css) 
| [@lskjs/dashboard](packages/dashboard) | пакет с набором компонентов для реализации dashboard панелей	| [npm](https://npmjs.com/package/@lskjs/dashboard) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/dashboard.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/dashboard) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/dashboard.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/dashboard) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/dashboard) 
| [@lskjs/dev](packages/dev) | пакет для отладки в DEV окружении	| [npm](https://npmjs.com/package/@lskjs/dev) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/dev.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/dev) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/dev.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/dev) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/dev) 
| [@lskjs/docs](packages/docs) | пакет с общей документацией по ux репозиторию (storybook)	| [npm](https://npmjs.com/package/@lskjs/docs) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/docs.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/docs) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/docs.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/docs) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/docs) 
| [@lskjs/downloads](packages/downloads) | пакет для генерации xlsx файлов	| [npm](https://npmjs.com/package/@lskjs/downloads) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/downloads.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/downloads) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/downloads.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/downloads) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/downloads) 
| [@lskjs/extra](packages/extra) | пакет с другими компонентами, которые не попали не под одну категорию	| [npm](https://npmjs.com/package/@lskjs/extra) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/extra.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/extra) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/extra.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/extra) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/extra) 
| [@lskjs/flag](packages/flag) | React компонент для флагов, использует react-world-flags	| [npm](https://npmjs.com/package/@lskjs/flag) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/flag.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/flag) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/flag.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/flag) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/flag) 
| [@lskjs/form](packages/form) | Форк Formik с кастомными контролами	| [npm](https://npmjs.com/package/@lskjs/form) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form) 
| [@lskjs/grid](packages/grid) | Сетка как в bootstrap	| [npm](https://npmjs.com/package/@lskjs/grid) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/grid.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/grid) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/grid.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/grid) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/grid) 
| [@lskjs/gridtable](packages/gridtable) | пакет для генерации таблиц	| [npm](https://npmjs.com/package/@lskjs/gridtable) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/gridtable.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/gridtable) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/gridtable.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/gridtable) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/gridtable) 
| [@lskjs/image](packages/image) | React компонент для картинок, использует react-image-fallback	| [npm](https://npmjs.com/package/@lskjs/image) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/image.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/image) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/image.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/image) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/image) 
| [@lskjs/landing](packages/landing) | пакет для генерации лендинга на основе слайдов	| [npm](https://npmjs.com/package/@lskjs/landing) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/landing.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/landing) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/landing.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/landing) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/landing) 
| [@lskjs/link](packages/link) | пакет для реализации ссылок через history	| [npm](https://npmjs.com/package/@lskjs/link) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/link.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/link) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/link.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/link) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/link) 
| [@lskjs/list](packages/list) | пакет для создания списков	| [npm](https://npmjs.com/package/@lskjs/list) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/list.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/list) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/list.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/list) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/list) 
| [@lskjs/modal](packages/modal) | пакет с модалками	| [npm](https://npmjs.com/package/@lskjs/modal) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/modal.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/modal) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/modal.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/modal) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/modal) 
| [@lskjs/navbar](packages/navbar) | компоненты для NavBar	| [npm](https://npmjs.com/package/@lskjs/navbar) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/navbar.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/navbar) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/navbar.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/navbar) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/navbar) 
| [@lskjs/notification](packages/notification) | пакет с компонентом нотификаций	| [npm](https://npmjs.com/package/@lskjs/notification) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/notification.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/notification) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/notification.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/notification) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/notification) 
| [@lskjs/page](packages/page) | пакет с компонентами для построения страниц с использованием layouts	| [npm](https://npmjs.com/package/@lskjs/page) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/page.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/page) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/page.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/page) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/page) 
| [@lskjs/progress](packages/progress) | компонент прогресса построенный вокруг нанобара	| [npm](https://npmjs.com/package/@lskjs/progress) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/progress.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/progress) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/progress.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/progress) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/progress) 
| [@lskjs/scroll](packages/scroll) | анимационная утилита для скролла	| [npm](https://npmjs.com/package/@lskjs/scroll) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/scroll.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/scroll) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/scroll.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/scroll) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/scroll) 
| [@lskjs/slide](packages/slide) | компонент для json-editor	| [npm](https://npmjs.com/package/@lskjs/slide) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/slide.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/slide) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/slide.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/slide) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/slide) 
| [@lskjs/t](packages/t) | компонент для использования переводов из таблицы i18	| [npm](https://npmjs.com/package/@lskjs/t) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/t.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/t) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/t.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/t) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/t) 
| [@lskjs/tag](packages/tag) | теги поиска по аналогии с ant-тегами 	| [npm](https://npmjs.com/package/@lskjs/tag) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/tag.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/tag) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/tag.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/tag) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/tag) 
| [@lskjs/theme](packages/theme) | пакет для темизации проекта. + утилиты для работы с темой	| [npm](https://npmjs.com/package/@lskjs/theme) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/theme.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/theme) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/theme.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/theme) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/theme) 
| [@lskjs/typo](packages/typo) | тут типографика, реализация: цвета, формы, размеры, шрифты	| [npm](https://npmjs.com/package/@lskjs/typo) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/typo.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/typo) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/typo.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/typo) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/typo) 
| [@lskjs/ui](packages/ui) | UI kit	| [npm](https://npmjs.com/package/@lskjs/ui) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/ui.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/ui) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/ui.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/ui) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/ui) 
| [@lskjs/ui2](packages/ui2) | UI kit версии 2	| [npm](https://npmjs.com/package/@lskjs/ui2) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/ui2.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/ui2) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/ui2.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/ui2) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/ui2) 
| [@lskjs/form-controls](packages/form-controls) | стандарные контроллы	| [npm](https://npmjs.com/package/@lskjs/form-controls) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-controls.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-controls) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-controls.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-controls) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-controls) 
| [@lskjs/form-array-input](packages/form-array-input) | контрол для множественных инпутов	| [npm](https://npmjs.com/package/@lskjs/form-array-input) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-array-input.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-array-input) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-array-input.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-array-input) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-array-input) 
| [@lskjs/form-array-of](packages/form-array-of) | контрол для реализации radio-link элементов	| [npm](https://npmjs.com/package/@lskjs/form-array-of) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-array-of.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-array-of) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-array-of.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-array-of) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-array-of) 
| [@lskjs/form-calendar](packages/form-calendar) | контрол для выбора даты календаря	| [npm](https://npmjs.com/package/@lskjs/form-calendar) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-calendar.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-calendar) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-calendar.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-calendar) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-calendar) 
| [@lskjs/form-checkblock](packages/form-checkblock) | контрол checkbox-like в виде блока с доп. секцией	| [npm](https://npmjs.com/package/@lskjs/form-checkblock) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-checkblock.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-checkblock) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-checkblock.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-checkblock) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-checkblock) 
| [@lskjs/form-checkblock-list](packages/form-checkblock-list) | контрол списка form-checkblock	| [npm](https://npmjs.com/package/@lskjs/form-checkblock-list) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-checkblock-list.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-checkblock-list) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-checkblock-list.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-checkblock-list) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-checkblock-list) 
| [@lskjs/form-code](packages/form-code) | контрол для ввода кода	| [npm](https://npmjs.com/package/@lskjs/form-code) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-code.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-code) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-code.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-code) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-code) 
| [@lskjs/form-date](packages/form-date) | контролл вводы даты	| [npm](https://npmjs.com/package/@lskjs/form-date) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-date.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-date) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-date.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-date) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-date) 
| [@lskjs/form-editor](packages/form-editor) | контрол написания текста	| [npm](https://npmjs.com/package/@lskjs/form-editor) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-editor.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-editor) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-editor.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-editor) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-editor) 
| [@lskjs/form-files](packages/form-files) | Контрол для загрузки файлов	| [npm](https://npmjs.com/package/@lskjs/form-files) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-files.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-files) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-files.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-files) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-files) 
| [@lskjs/form-geo](packages/form-geo) | контрол для отображения карты (Google Maps?)	| [npm](https://npmjs.com/package/@lskjs/form-geo) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-geo.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-geo) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-geo.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-geo) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-geo) 
| [@lskjs/form-group-of](packages/form-group-of) | контрол для реализации checkbox-link элементов	| [npm](https://npmjs.com/package/@lskjs/form-group-of) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-group-of.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-group-of) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-group-of.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-group-of) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-group-of) 
| [@lskjs/form-image](packages/form-image) | Контрол для заграузки изображений	| [npm](https://npmjs.com/package/@lskjs/form-image) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-image.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-image) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-image.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-image) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-image) 
| [@lskjs/form-input](packages/form-input) | Контрол для в ввода текста	| [npm](https://npmjs.com/package/@lskjs/form-input) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-input.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-input) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-input.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-input) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-input) 
| [@lskjs/form-password](packages/form-password) | Контрол для в вода пароля	| [npm](https://npmjs.com/package/@lskjs/form-password) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-password.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-password) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-password.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-password) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-password) 
| [@lskjs/form-percent-slider](packages/form-percent-slider) | контрол для выбора значений в виде слайда (+ выбора диапазона)	| [npm](https://npmjs.com/package/@lskjs/form-percent-slider) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-percent-slider.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-percent-slider) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-percent-slider.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-percent-slider) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-percent-slider) 
| [@lskjs/form-phone](packages/form-phone) | Контрол для ввода телефона	| [npm](https://npmjs.com/package/@lskjs/form-phone) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-phone.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-phone) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-phone.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-phone) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-phone) 
| [@lskjs/form-radio](packages/form-radio) | Контрол с радио кнопкой	| [npm](https://npmjs.com/package/@lskjs/form-radio) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-radio.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-radio) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-radio.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-radio) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-radio) 
| [@lskjs/form-range](packages/form-range) | контрол выбора от - до	| [npm](https://npmjs.com/package/@lskjs/form-range) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-range.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-range) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-range.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-range) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-range) 
| [@lskjs/form-recapcha2](packages/form-recapcha2) | контрол для проверки капчи	| [npm](https://npmjs.com/package/@lskjs/form-recapcha2) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-recapcha2.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-recapcha2) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-recapcha2.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-recapcha2) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-recapcha2) 
| [@lskjs/form-recapcha3](packages/form-recapcha3) | контрол для проверки капчи	| [npm](https://npmjs.com/package/@lskjs/form-recapcha3) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-recapcha3.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-recapcha3) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-recapcha3.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-recapcha3) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-recapcha3) 
| [@lskjs/form-select](packages/form-select) | Контрол с селектом	| [npm](https://npmjs.com/package/@lskjs/form-select) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-select.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-select) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-select.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-select) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-select) 
| [@lskjs/form-switcher](packages/form-switcher) | Контрол с переключателем	| [npm](https://npmjs.com/package/@lskjs/form-switcher) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-switcher.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-switcher) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-switcher.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-switcher) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-switcher) 
| [@lskjs/form-tags](packages/form-tags) | контрол для выбора тегов	| [npm](https://npmjs.com/package/@lskjs/form-tags) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-tags.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-tags) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-tags.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-tags) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-tags) 
| [@lskjs/form-textarea](packages/form-textarea) | Контрол для ввода текста	| [npm](https://npmjs.com/package/@lskjs/form-textarea) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-textarea.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-textarea) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-textarea.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-textarea) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-textarea) 
| [@lskjs/form-time](packages/form-time) | контрол для выбора времени	| [npm](https://npmjs.com/package/@lskjs/form-time) [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-time.svg?logo=npm&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-time) [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-time.svg?logo=npm&label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-time) [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=for-the-badge)](https://www.npmjs.com/package/@lskjs/form-time) 


Вдохновлен:
* [Express.js](): концепция средних слоев, способ их конфигурирования
* [Sails.js & Grails.js]()
* [Loopback](egoegoegoegoegoegoeg)
* https://github.com/developit/express-es6-rest-api/
* react-starter-kit: Фронт, Сборка на ES6 без Gulp, Grunt. Конфиг webpack'а

```
this.useMiddlewares()
this.useRoutes()
this.useDefaultRoute()
```

А также:
* Express async router
* Json Web Token
* Bunyan logger with updated view



# Auth
Токен можно прикладывать следующими методами

* в Header `Authorization: Bearer %USER_TOKEN%`
* в Header `X-Access-Token: %USER_TOKEN%`
* в Cookie: `token=%USER_TOKEN%`
* в GET параметр: `?token=%USER_TOKEN%`



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
* fatal
* error
* warn
* info
* debug
* trace



# Что еще нужно дописать
* Что из себя представляет модуль
* Что такое мидлвара?
* Что такое ресурс? Resource ENDPOINT
* Универсальная  модель?
* Документация со swagger



## Getting Started

### Requirements

  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v6.5 or newer
  * `npm` v3.10 or newer (new to [npm](https://docs.npmjs.com/)?)
  * `node-gyp` prerequisites mentioned [here](https://github.com/nodejs/node-gyp)
  * Text editor or IDE pre-configured with React/JSX/Flow/ESlint ([learn more](./how-to-configure-text-editors.md))

### Структура проекта

Before you start, take a moment to see how the project structure looks like:
```
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
```

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

> [http://localhost:3000/](http://localhost:3000/) — Node.js server (`build/server.js`)<br>
> [http://localhost:3000/graphql](http://localhost:3000/graphql) — GraphQL server and IDE<br>
> [http://localhost:3001/](http://localhost:3001/) — BrowserSync proxy with HMR, React Hot Transform<br>
> [http://localhost:3002/](http://localhost:3002/) — BrowserSync control panel (UI)

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
