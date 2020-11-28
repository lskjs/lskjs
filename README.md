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

| Package | Description | Status | Version | Size
|--- |--- |---  |---  |---
| [apiquery](packages/apiquery) | пакет для общения front'a с back'ом, написан на axios, умеет в сокеты через socket.io [](https://npmjs.com/package/@lskjs/apiquery) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/apiquery.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/apiquery) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/apiquery.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/apiquery) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/apiquery?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/apiquery) 
| [auth](packages/auth) | пакет в котором описана логика авторизации, имеет серверную и клиентскую часть [](https://npmjs.com/package/@lskjs/auth) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/auth.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/auth) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/auth.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/auth) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/auth?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/auth) 
| [autobind](packages/autobind) | пакет обертка над autobind-decorator, не знаю зачем :) [](https://npmjs.com/package/@lskjs/autobind) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/autobind.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/autobind) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/autobind.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/autobind) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/autobind?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/autobind) 
| [billing](packages/billing) | позволяет подключать платежные системы [](https://npmjs.com/package/@lskjs/billing) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/billing.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/billing) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/billing.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/billing) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/billing?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/billing) 
| [bots](packages/bots) | позволяет подключать различных ботов в проект: telegram, discord, .etc [](https://npmjs.com/package/@lskjs/bots) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bots.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bots.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/bots) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bots?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bots) 
| [build-locales](packages/build-locales) | билдит локали из google spreadsheets [](https://npmjs.com/package/@lskjs/build-locales) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/build-locales.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/build-locales) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/build-locales.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/build-locales) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/build-locales?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/build-locales) 
| [bunyan](packages/bunyan) | логгер [](https://npmjs.com/package/@lskjs/bunyan) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/bunyan.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/bunyan) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/bunyan.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/bunyan) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/bunyan?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/bunyan) 
| [config](packages/config) | пакет который умеет собирать конфиг из разные файлов, env переменных [](https://npmjs.com/package/@lskjs/config) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/config.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/config) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/config.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/config) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/config?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/config) 
| [db](packages/db) | пакет для подключения к mongo, умеет в реконнект и имеет свой дефолтный конфиг [](https://npmjs.com/package/@lskjs/db) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/db.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/db) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/db.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/db) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/db?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/db) 
| [elastic](packages/elastic) | пакет для работы с ES, умеет делать запись, читать и создавать таблицы [](https://npmjs.com/package/@lskjs/elastic) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/elastic.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/elastic) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/elastic.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/elastic) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/elastic?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/elastic) 
| [event](packages/event) | пакет для глобальных event'ов в приложении, работает и на клиенте и на сервере. app.on('event') [](https://npmjs.com/package/@lskjs/event) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/event.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/event) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/event.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/event) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/event?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/event) 
| [getspreadsheet](packages/getspreadsheet) | пакет для build-locales, умеет парсить google spreadsheet  [](https://npmjs.com/package/@lskjs/getspreadsheet) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/getspreadsheet.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/getspreadsheet) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/getspreadsheet.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/getspreadsheet) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/getspreadsheet?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/getspreadsheet) 
| [grant](packages/grant) | пакет с грантами, гранты нужны чтобы ограничивать часть функционала для некоторых пользователей [](https://npmjs.com/package/@lskjs/grant) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/grant.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/grant) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/grant.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/grant) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/grant?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/grant) 
| [i18](packages/i18) | пакет с локализациями и переводами, умеет менять текст в зависимости от выбранной локали [](https://npmjs.com/package/@lskjs/i18) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/i18.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/i18) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/i18.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/i18) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/i18?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/i18) 
| [launcher](packages/launcher) | пакет-утилита для запуска проектов в нужной последовательности. В разработке. [](https://npmjs.com/package/@lskjs/launcher) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/launcher.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/launcher) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/launcher.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/launcher) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/launcher?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/launcher) 
| [linkall](packages/linkall) | пакет линкующий все локальные lsk пакеты друг в друга [](https://npmjs.com/package/@lskjs/linkall) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/linkall.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/linkall) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/linkall.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/linkall) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/linkall?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/linkall) 
| [log](packages/log) | логгер, подключен во всех модулях [](https://npmjs.com/package/@lskjs/log) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/log.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/log) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/log.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/log) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/log?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/log) 
| [mailer](packages/mailer) | пакет для отправки почты, есть шаблоны для писем [](https://npmjs.com/package/@lskjs/mailer) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/mailer.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/mailer) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/mailer.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/mailer) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/mailer?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/mailer) 
| [mobx](packages/mobx) | пакет с модулем mobx [](https://npmjs.com/package/@lskjs/mobx) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/mobx.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/mobx) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/mobx.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/mobx) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/mobx?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/mobx) 
| [module](packages/module) | пакет от которого наследуются остальные модули, имеет в себе встроенный логер, ee, функции init, start и прочее [](https://npmjs.com/package/@lskjs/module) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/module.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/module) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/module.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/module) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/module?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/module) 
| [permit](packages/permit) | генерирует hash'ы, N-значные коды, позволяет создавать функционал для активации аккаунтов пользователей через уникальные одноразовые ссылки, или делать что то подобное(ну хз сложно описать) [](https://npmjs.com/package/@lskjs/permit) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/permit.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/permit) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/permit.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/permit) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/permit?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/permit) 
| [rabbit](packages/rabbit) | пакет для работы с rabbitmq, умеет создавать, читать и писать в очереди [](https://npmjs.com/package/@lskjs/rabbit) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/rabbit.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/rabbit) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/rabbit.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/rabbit) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/rabbit?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/rabbit) 
| [reactapp](packages/reactapp) | пакет с реализацией react и SSR [](https://npmjs.com/package/@lskjs/reactapp) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/reactapp.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/reactapp) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/reactapp.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/reactapp) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/reactapp?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/reactapp) 
| [rlog](packages/rlog) | remote logs [](https://npmjs.com/package/@lskjs/rlog) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/rlog.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/rlog) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/rlog.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/rlog) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/rlog?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/rlog) 
| [sequelize](packages/sequelize) | пакет для работы с sql'ными базами данных, postgres, mysql [](https://npmjs.com/package/@lskjs/sequelize) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sequelize.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/sequelize) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sequelize.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/sequelize) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/sequelize?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/sequelize) 
| [server](packages/server) | сервер с уже подключенными бд, мидлварами, express и прочим [](https://npmjs.com/package/@lskjs/server) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/server.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/server) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/server.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/server) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/server?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/server) 
| [server-api](packages/server-api) | пакет для создания api в проекте [](https://npmjs.com/package/@lskjs/server-api) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/server-api.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/server-api) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/server-api.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/server-api) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/server-api?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/server-api) 
| [sh](packages/sh) | позволяет выполнять shell скрипты через ноду, может в асинхронность [](https://npmjs.com/package/@lskjs/sh) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sh.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/sh) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sh.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/sh) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/sh?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/sh) 
| [sms](packages/sms) | пакет для отправки sms [](https://npmjs.com/package/@lskjs/sms) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/sms.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/sms) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/sms.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/sms) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/sms?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/sms) 
| [tbot](packages/tbot) | телеграмм бот [](https://npmjs.com/package/@lskjs/tbot) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/tbot.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/tbot) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/tbot.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/tbot) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/tbot?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/tbot) 
| [uapp](packages/uapp) | универсальное реакт приложение [](https://npmjs.com/package/@lskjs/uapp) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/uapp.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/uapp) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/uapp.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/uapp) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/uapp?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/uapp) 
| [upload](packages/upload) | пакет по загрузке файлов на сервер, имеет серверную и клиентствую часть [](https://npmjs.com/package/@lskjs/upload) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/upload.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/upload) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/upload.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/upload) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/upload?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/upload) 
| [utils](packages/utils) | пакет с кучей мелких утилит, типо lodash только от мира lskjs [](https://npmjs.com/package/@lskjs/utils) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/utils.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/utils) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/utils.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/utils) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/utils?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/utils) 
| [worker](packages/worker) | Пакет для созданий воркера(небольшого куска кода который выполняет определенную задачу) устарел, не используется [](https://npmjs.com/package/@lskjs/worker) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/worker.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/worker) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/worker.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/worker) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/worker?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/worker) 
| [add-to-calendar](https://github.com/lskjs/ux/tree/packages/master/add-to-calendar) | пакет для добавления эвентов в календари [](https://npmjs.com/package/@lskjs/add-to-calendar) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/add-to-calendar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/add-to-calendar) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/add-to-calendar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/add-to-calendar) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/add-to-calendar?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/add-to-calendar) 
| [article](https://github.com/lskjs/ux/tree/master/packages/article) | статья [](https://npmjs.com/package/@lskjs/article) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/article.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/article) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/article.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/article) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/article?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/article) 
| [avatar](https://github.com/lskjs/ux/tree/master/packages/avatar) | пакет для отображения аватаров / изображений с fallback [](https://npmjs.com/package/@lskjs/avatar) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/avatar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/avatar) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/avatar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/avatar) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/avatar?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/avatar) 
| [button](https://github.com/lskjs/ux/tree/master/packages/button) | пакет c React компонентами для кнопки и группы кнопок [](https://npmjs.com/package/@lskjs/button) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/button.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/button) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/button.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/button) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/button?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/button) 
| [cookie-consent](https://github.com/lskjs/ux/tree/master/packages/cookie-consent) | HOC для обертки вьюхи чтобы делать модалки куки консента [](https://npmjs.com/package/@lskjs/cookie-consent) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/cookie-consent.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/cookie-consent) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/cookie-consent.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/cookie-consent) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/cookie-consent?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/cookie-consent) 
| [css](https://github.com/lskjs/ux/tree/master/packages/css) | пакет для инжекта глобальных стилей antd и bootstrap [](https://npmjs.com/package/@lskjs/css) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/css.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/css) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/css.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/css) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/css?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/css) 
| [dashboard](https://github.com/lskjs/ux/tree/master/packages/dashboard) | пакет с набором компонентов для реализации dashboard панелей [](https://npmjs.com/package/@lskjs/dashboard) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/dashboard.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/dashboard) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/dashboard.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/dashboard) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/dashboard?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/dashboard) 
| [dev](https://github.com/lskjs/ux/tree/master/packages/dev) | пакет для отладки в DEV окружении [](https://npmjs.com/package/@lskjs/dev) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/dev.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/dev) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/dev.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/dev) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/dev?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/dev) 
| [docs](https://github.com/lskjs/ux/tree/master/packages/docs) | пакет с общей документацией по ux репозиторию (storybook) [](https://npmjs.com/package/@lskjs/docs) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/docs.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/docs) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/docs.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/docs) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/docs?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/docs) 
| [downloads](https://github.com/lskjs/ux/tree/master/packages/downloads) | пакет для генерации xlsx файлов [](https://npmjs.com/package/@lskjs/downloads) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/downloads.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/downloads) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/downloads.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/downloads) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/downloads?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/downloads) 
| [extra](https://github.com/lskjs/ux/tree/master/packages/extra) | пакет с другими компонентами, которые не попали не под одну категорию [](https://npmjs.com/package/@lskjs/extra) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/extra.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/extra) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/extra.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/extra) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/extra?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/extra) 
| [flag](https://github.com/lskjs/ux/tree/master/packages/flag) | React компонент для флагов, использует react-world-flags [](https://npmjs.com/package/@lskjs/flag) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/flag.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/flag) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/flag.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/flag) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/flag?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/flag) 
| [form](https://github.com/lskjs/ux/tree/master/packages/form) | Форк Formik с кастомными контролами [](https://npmjs.com/package/@lskjs/form) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form) 
| [grid](https://github.com/lskjs/ux/tree/master/packages/grid) | Сетка как в bootstrap [](https://npmjs.com/package/@lskjs/grid) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/grid.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/grid) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/grid.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/grid) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/grid?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/grid) 
| [gridtable](https://github.com/lskjs/ux/tree/master/packages/gridtable) | пакет для генерации таблиц [](https://npmjs.com/package/@lskjs/gridtable) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/gridtable.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/gridtable) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/gridtable.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/gridtable) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/gridtable?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/gridtable) 
| [image](https://github.com/lskjs/ux/tree/master/packages/image) | React компонент для картинок, использует react-image-fallback [](https://npmjs.com/package/@lskjs/image) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/image.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/image) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/image.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/image) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/image?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/image) 
| [landing](https://github.com/lskjs/ux/tree/master/packages/landing) | пакет для генерации лендинга на основе слайдов [](https://npmjs.com/package/@lskjs/landing) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/landing.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/landing) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/landing.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/landing) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/landing?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/landing) 
| [link](https://github.com/lskjs/ux/tree/master/packages/link) | пакет для реализации ссылок через history [](https://npmjs.com/package/@lskjs/link) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/link.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/link) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/link.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/link) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/link?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/link) 
| [list](https://github.com/lskjs/ux/tree/master/packages/list) | пакет для создания списков [](https://npmjs.com/package/@lskjs/list) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/list.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/list) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/list.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/list) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/list?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/list) 
| [modal](https://github.com/lskjs/ux/tree/master/packages/modal) | пакет с модалками [](https://npmjs.com/package/@lskjs/modal) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/modal.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/modal) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/modal.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/modal) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/modal?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/modal) 
| [navbar](https://github.com/lskjs/ux/tree/master/packages/navbar) | компоненты для NavBar [](https://npmjs.com/package/@lskjs/navbar) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/navbar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/navbar) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/navbar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/navbar) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/navbar?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/navbar) 
| [notification](https://github.com/lskjs/ux/tree/master/packages/notification) | пакет с компонентом нотификаций [](https://npmjs.com/package/@lskjs/notification) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/notification.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/notification) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/notification.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/notification) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/notification?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/notification) 
| [page](https://github.com/lskjs/ux/tree/master/packages/page) | пакет с компонентами для построения страниц с использованием layouts [](https://npmjs.com/package/@lskjs/page) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/page.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/page) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/page.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/page) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/page?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/page) 
| [progress](https://github.com/lskjs/ux/tree/master/packages/progress) | компонент прогресса построенный вокруг нанобара [](https://npmjs.com/package/@lskjs/progress) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/progress.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/progress) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/progress.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/progress) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/progress?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/progress) 
| [scroll](https://github.com/lskjs/ux/tree/master/packages/scroll) | анимационная утилита для скролла [](https://npmjs.com/package/@lskjs/scroll) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/scroll.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/scroll) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/scroll.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/scroll) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/scroll?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/scroll) 
| [slide](https://github.com/lskjs/ux/tree/master/packages/slide) | компонент для json-editor [](https://npmjs.com/package/@lskjs/slide) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/slide.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/slide) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/slide.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/slide) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/slide?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/slide) 
| [t](https://github.com/lskjs/ux/tree/master/packages/t) | компонент для использования переводов из таблицы i18 [](https://npmjs.com/package/@lskjs/t) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/t.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/t) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/t.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/t) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/t?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/t) 
| [tag](https://github.com/lskjs/ux/tree/master/packages/tag) | теги поиска по аналогии с ant-тегами  [](https://npmjs.com/package/@lskjs/tag) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/tag.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/tag) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/tag.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/tag) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/tag?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/tag) 
| [theme](https://github.com/lskjs/ux/tree/master/packages/theme) | пакет для темизации проекта. + утилиты для работы с темой [](https://npmjs.com/package/@lskjs/theme) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/theme.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/theme) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/theme.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/theme) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/theme?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/theme) 
| [typo](https://github.com/lskjs/ux/tree/master/packages/typo) | тут типографика, реализация: цвета, формы, размеры, шрифты [](https://npmjs.com/package/@lskjs/typo) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/typo.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/typo) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/typo.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/typo) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/typo?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/typo) 
| [ui](https://github.com/lskjs/ux/tree/master/packages/ui) | UI kit [](https://npmjs.com/package/@lskjs/ui) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/ui.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/ui.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/ui?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/ui) 
| [ui2](https://github.com/lskjs/ux/tree/master/packages/ui2) | UI kit версии 2 [](https://npmjs.com/package/@lskjs/ui2) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/ui2.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui2) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/ui2.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/ui2) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/ui2?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/ui2) 
| [form-controls](https://github.com/lskjs/ux/tree/master/packages/form-controls) | стандарные контроллы [](https://npmjs.com/package/@lskjs/form-controls) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-controls.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-controls) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-controls.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-controls) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-controls?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-controls) 
| [form-array-input](packages/https://github.com/lskjs/ux/tree/master/form-array-input) | контрол для множественных инпутов [](https://npmjs.com/package/@lskjs/form-array-input) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-array-input.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-array-input) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-array-input.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-array-input) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-array-input?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-array-input) 
| [form-array-of](packages/https://github.com/lskjs/ux/tree/master/form-array-of) | контрол для реализации radio-link элементов [](https://npmjs.com/package/@lskjs/form-array-of) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-array-of.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-array-of) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-array-of.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-array-of) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-array-of?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-array-of) 
| [form-calendar](https://github.com/lskjs/ux/tree/master/packages/form-calendar) | контрол для выбора даты календаря [](https://npmjs.com/package/@lskjs/form-calendar) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-calendar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-calendar) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-calendar.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-calendar) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-calendar?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-calendar) 
| [form-checkblock](https://github.com/lskjs/ux/tree/master/packages/form-checkblock) | контрол checkbox-like в виде блока с доп. секцией [](https://npmjs.com/package/@lskjs/form-checkblock) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-checkblock.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-checkblock) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-checkblock.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-checkblock) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-checkblock?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-checkblock) 
| [form-checkblock-list](packages/https://github.com/lskjs/ux/tree/master/form-checkblock-list) | контрол списка form-checkblock [](https://npmjs.com/package/@lskjs/form-checkblock-list) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-checkblock-list.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-checkblock-list) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-checkblock-list.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-checkblock-list) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-checkblock-list?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-checkblock-list) 
| [form-code](https://github.com/lskjs/ux/tree/master/packages/form-code) | контрол для ввода кода [](https://npmjs.com/package/@lskjs/form-code) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-code.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-code) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-code.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-code) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-code?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-code) 
| [form-date](https://github.com/lskjs/ux/tree/master/packages/form-date) | контролл вводы даты [](https://npmjs.com/package/@lskjs/form-date) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-date.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-date) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-date.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-date) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-date?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-date) 
| [form-editor](https://github.com/lskjs/ux/tree/master/packages/form-editor) | контрол написания текста [](https://npmjs.com/package/@lskjs/form-editor) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-editor.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-editor) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-editor.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-editor) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-editor?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-editor) 
| [form-files](https://github.com/lskjs/ux/tree/master/packages/form-files) | Контрол для загрузки файлов [](https://npmjs.com/package/@lskjs/form-files) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-files.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-files) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-files.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-files) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-files?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-files) 
| [form-geo](https://github.com/lskjs/ux/tree/master/packages/form-geo) | контрол для отображения карты (Google Maps?) [](https://npmjs.com/package/@lskjs/form-geo) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-geo.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-geo) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-geo.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-geo) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-geo?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-geo) 
| [form-group-of](packages/https://github.com/lskjs/ux/tree/master/form-group-of) | контрол для реализации checkbox-link элементов [](https://npmjs.com/package/@lskjs/form-group-of) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-group-of.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-group-of) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-group-of.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-group-of) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-group-of?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-group-of) 
| [form-image](https://github.com/lskjs/ux/tree/master/packages/form-image) | Контрол для заграузки изображений [](https://npmjs.com/package/@lskjs/form-image) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-image.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-image) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-image.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-image) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-image?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-image) 
| [form-input](https://github.com/lskjs/ux/tree/master/packages/form-input) | Контрол для в ввода текста [](https://npmjs.com/package/@lskjs/form-input) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-input.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-input) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-input.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-input) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-input?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-input) 
| [form-password](https://github.com/lskjs/ux/tree/master/packages/form-password) | Контрол для в вода пароля [](https://npmjs.com/package/@lskjs/form-password) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-password.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-password) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-password.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-password) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-password?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-password) 
| [form-percent-slider](packages/https://github.com/lskjs/ux/tree/master/form-percent-slider) | контрол для выбора значений в виде слайда (+ выбора диапазона) [](https://npmjs.com/package/@lskjs/form-percent-slider) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-percent-slider.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-percent-slider) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-percent-slider.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-percent-slider) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-percent-slider?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-percent-slider) 
| [form-phone](https://github.com/lskjs/ux/tree/master/packages/form-phone) | Контрол для ввода телефона [](https://npmjs.com/package/@lskjs/form-phone) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-phone.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-phone) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-phone.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-phone) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-phone?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-phone) 
| [form-radio](https://github.com/lskjs/ux/tree/master/packages/form-radio) | Контрол с радио кнопкой [](https://npmjs.com/package/@lskjs/form-radio) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-radio.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-radio) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-radio.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-radio) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-radio?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-radio) 
| [form-range](https://github.com/lskjs/ux/tree/master/packages/form-range) | контрол выбора от - до [](https://npmjs.com/package/@lskjs/form-range) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-range.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-range) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-range.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-range) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-range?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-range) 
| [form-recapcha2](https://github.com/lskjs/ux/tree/master/packages/form-recapcha2) | контрол для проверки капчи [](https://npmjs.com/package/@lskjs/form-recapcha2) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-recapcha2.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-recapcha2) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-recapcha2.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-recapcha2) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-recapcha2?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-recapcha2) 
| [form-recapcha3](https://github.com/lskjs/ux/tree/master/packages/form-recapcha3) | контрол для проверки капчи [](https://npmjs.com/package/@lskjs/form-recapcha3) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-recapcha3.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-recapcha3) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-recapcha3.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-recapcha3) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-recapcha3?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-recapcha3) 
| [form-select](https://github.com/lskjs/ux/tree/master/packages/form-select) | Контрол с селектом [](https://npmjs.com/package/@lskjs/form-select) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-select.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-select) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-select.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-select) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-select?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-select) 
| [form-switcher](https://github.com/lskjs/ux/tree/master/packages/form-switcher) | Контрол с переключателем [](https://npmjs.com/package/@lskjs/form-switcher) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-switcher.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-switcher) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-switcher.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-switcher) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-switcher?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-switcher) 
| [form-tags](https://github.com/lskjs/ux/tree/master/packages/form-tags) | контрол для выбора тегов [](https://npmjs.com/package/@lskjs/form-tags) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-tags.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-tags) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-tags.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-tags) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-tags?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-tags) 
| [form-textarea](https://github.com/lskjs/ux/tree/master/packages/form-textarea) | Контрол для ввода текста [](https://npmjs.com/package/@lskjs/form-textarea) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-textarea.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-textarea) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-textarea.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-textarea) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-textarea?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-textarea) 
| [form-time](https://github.com/lskjs/ux/tree/master/packages/form-time) | контрол для выбора времени [](https://npmjs.com/package/@lskjs/form-time) 	|  [![NPM Badge](https://img.shields.io/npm/dw/@lskjs/form-time.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-time) 	|  [![NPM Badge](https://img.shields.io/npm/v/@lskjs/form-time.svg?logo=npm&label=&style=flat-square)](https://www.npmjs.com/package/@lskjs/form-time) 	|  [![NPM Badge](https://img.shields.io/bundlephobia/minzip/@lskjs/form-time?label=&style=flat-square)](https://bundlephobia.com/result?p=@lskjs/form-time)  
 
 
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
