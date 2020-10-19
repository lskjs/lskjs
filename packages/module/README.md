# @lskjs/module


-------------------

# Манифест модульной архитектуры

## Основные цели
- модульность
- асинхронность

## Module 
- Основополагаюший элемент архитектуры
- Из модулей будет собираться приложение, у модулей могут быть подмодули


### Modules stages

- null - после конструктора
- init - стадия инициализации, по сути это асинхронный конструктор, нужно сделать все необходимые require. на этой стадии работаем внутри себя, остальные сестренские объекты (модели, модули, сокеты, файлы) еще не существуют.
- run - стадия запуска, делаем все необоходимые внешние подключения, тут можно обращяться к внешний модулям системы: модели, модули
- stop - выключаем модуль, или для остановки приложения, или для переконфигурирования, или просто чтобы выключить соединения и очистить память


### Modules stage statuses

- null - хуй знает что с ним, еще не запускался
- initing - стадия инициализации
- inited - уже инициализировался
- runing - стадия запуска 
- runned - уже запустился 
- stopping - стадия остановки
- stoped - уже остановился


### Modules public methods

- .init() - как консструктор но асинхронный, делает необходимые импорты и устанвливет правильное состояние модуля
- .run() - запускает все процессы в модуле
- .start() - init and run and some magic?


### Как я хочу использовать модули


#### Просто взять и юзать
```js
const theModule = new TheModule();
await theModule.start()
```


#### Прокидывать props в конструктор
```js
const theModule = new TheModule({ 
  mode: 'private',
  config: { 
    value: 1
  },
});
await theModule.start()
theModule.mode === 'private'
theModule.config.value === 1
```

### Прокидывать подмодули, разным образом

#### Как props в конструкторе

- как класс через require 
- как промис через асинхронный import
- как функцию при вызове которой будет происхолить асинхрронный import


```js
const theModule = new TheModule({ 
  modules: {
    permit: require('@lskjs/permit/server'),
    upload: import('@lskjs/upload/server'),
    mailer: () => import('@lskjs/mailer/server'),
  }
});
await theModule.start()
```

#### Прокидывать подмодули с параметрами конструктора
```js
const theModule = new TheModule({ 
  modules: {
    permit: [require('@lskjs/permit/server'), { value: 1 }],
    upload: [import('@lskjs/upload/server'), { value:2 } ],
    mailer: () => [import('@lskjs/mailer/server', { value: 3 })],
  }
});
await theModule.start()
```

#### как field в классе

```js
class TheModule extends Module {
  modules = {
    permit: require('@lskjs/permit/server'),
    upload: import('@lskjs/upload/server'),
    mailer: () => import('@lskjs/mailer/server'),
  }
}
```

#### как расширения getter'a в классе

```js
class TheModule extends Module {

  async getModules() {
    return {
      ...await super.getModules(),
      permit: require('@lskjs/permit/server'),
      upload: import('@lskjs/upload/server'),
      mailer: () => import('@lskjs/mailer/server'),
    }
  }
}
```

### как создаем модуль

```js
class TheModule extends Module {
  name = 'TheModule2'; // можно переопределить имя, чтобы это имя было в логгере например
  async init() {
    await super.init();
    // делаем то, что нам нужно для инициализации
    this.client = new Telegraf(this.config)
  }
  async run() {
    await super.run();
    // делаем то, что нам нужно для запуска модуля
    this.client.launch();
  }
}
```

## Еще не решенные вопросы

- проблема провайдеров
- у модуля должен быть логгер
- у модуля должен быть event emitter
- проблема конфигов, централизованных конфигов
- проблема моделей и модуля db (в init нужен mongoose)


модуль
подмодули
провайдеры
модели
ee


getModules

modules={}

fropmt



TheModule


new TheModule(, {providers: {}})

как прокидывать конфиги дальше?


## Гипотетическое использование

```js
class Module {
  async getModules() {
    return this.modules;
  }
  async init() {
    this.name = this.constructor.name;
    console.log('init', this.constructor.name)
  }
  async run() {
    console.log('run', this.name)
  }
  
}

class TheModule extends Module {
  async run() {
    await super.run();
    console.log('run2', this.name)
  }
}
const m = new TheModule()
m.run()

console.log(m.name === 'TheModule');


```


## Всякие ссылки

- https://v8.dev/blog/fast-async
