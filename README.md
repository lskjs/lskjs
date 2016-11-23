![Lego Starter Kit](http://i.imgur.com/s97Nhw8.png)

Вдохновлен:
* [Express.js](): концепция средних слоев, способ их конфигурирования
* [Sails.js & Grails.js]()
* [Loopback](egoegoegoegoegoegoeg)
* https://github.com/developit/express-es6-rest-api/
* react-starter-kit: Фронт, Сборка на ES6 без Gulp, Grunt. Конфиг webpack'а

```
this.beforeUseMiddlewares()
this.useMiddlewares()
this.useRoutes()
this.useDefaultRoute()
this.afterUseMiddlewares()
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
* Что такое ресурс? Resourse ENDPOINT
* Универсальная  модель?
* Документация со swagger

![Lego Starter Kit Black](http://i.imgur.com/r3Ubvlp.jpg)
