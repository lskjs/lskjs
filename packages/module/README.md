# @lskjs/module

- Всё есть модуль


-------------------

Модуль - модули это классы с определнным жизненным циклом. Из модулей будет собираться комплексное приложение, у модулей могут быть подмодули.

# Манифест модульной архитектуры

## Основные цели
- простая инициализация
- расширение через наследование
- расширение через параметры конструктора
- модульность (древовидная архитектура)
- ленивость (асинхронность всего что только возможно)

## Побочные фишки
- встроенный логгер и дебаг режим
- встроенный event emitter и event driven 
- кофигурирование из единой родительской точки
- удобный inject'инг из дерева модулей
- легковесность



### Modules lifecycle

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

- Module.new()
- Module.init() - как консструктор но асинхронный, делает необходимые импорты и устанвливет правильное состояние модуля
- Module.run() - запускает все процессы в модуле
- Module.start() - init and run and some magic?

```js
// ---
const m = await Module.start(props);
// ----
const m = Module.new(props);
///
await m.start()
// ---
const m2 = await Module.create(props);
await m2.start();
// ----
``




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

https://gist.githubusercontent.com/JamesMessinger/5d31c053d0b1d52389eb2723f7550907/raw/41ac88d0cd00c55bac925891296df05c894c4a34/github-markdown.css


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
========================
При переинициализации мы должны получать тот же самый объект


# =======================================

# Модули и конфиги

## Case 0 – empty config


```js

class SomeModule extends Module { }

const some = await SomeModule.create();

some.config === {};

```
---
## Case 1 – default config


```js
class SomeModule extends Module {
  defaultConfig = {
    a: 1,
  };
}

const some = await SomeModule.create();

some.config === {
  a: 1,
};
```
---
## Case 2 - config while creation

```js
class SomeModule extends Module {}

const some = await SomeModule.create({
  config: {
    a: 11,
  }
});

some.config === {
  a: 11,
};
```
---
## Case 3 - merging default and top config
```js
class SomeModule extends Module {
  defaultConfig = {
    a: 1,
    b: 2,
  };
}

const some = await SomeModule.create({
  config: {
    a: 11,
    c: 33
  }
})

some.config === {
  a: 11,
  b: 2,
  c: 33,
}
```

## Case 4 - merging default and top config

```js

class SomeModule extends Module {
  config = {
    a: 1,
    b: 2,
  };
}

const some = await SomeModule.create({
  config: {
    a: 2,
    c: 3
  }
})

some.config === {
  a: 2,
  b: 2,
  c: 3,
}


```

---
## Case 5 - async config from db

```js
class SomeModule extends Module {
  config = {
    a: 1,
    b: 2,
  };
  async getConfigFromDb() {
    return {
      fields: true,
      from: true,
      db: true,
    }
  }
  async getConfig() {
    const localConfig = await super.getConfig();
    const dbConfig = await this.getConfigFromDb().catch(err => {
      this.log.error('something wrong', err);
      if (neededFallApp) throw err
      // throw err;
      return {}
    })
    return {
      ...localConfig,
      ...dbConfig,
    };
  }
}
const some = await SomeModule.create({
  config: {
    a: 11,
    c: 33
  }
})


// if all ok
some.config === {
  a: 11,
  b: 2,
  c: 33,
  fields: true,
  from: true,
  db: true,
}

// if all error not ok
some.config === {
  a: 11,
  b: 2,
  c: 33,
}
```

## Case 6 - deep config merge
```js

class Module {
  async getConfig() {
    return {
      ...this.defaultConfig,
      ...this.config,
    }
  }
}

class Module {
  async getConfig() {
    return {
      ...this.defaultConfig,
      ...this.config,
      ...this.__config,
      deep: {
        ...this.defaultConfig.deep,
        ...this.config.deep,
        ...this.__config.deep,
        deepest: {
          ...this.defaultConfig.deep.deepest,
          ...this.config.deep.deepest,
          ...this.__config.deep.deepest,
        }
      }
    }
  }

  // or

  async getConfig() {
    return mergeDeep(
      this.defaultConfig,
      this.config,
      this.__config,
    }
  }

  defaultConfig = {
    a: 1,
    b: 2,
  };
}

const some = await SomeModule.create({
  config: {
    a: 2,
    c: 3
  }
})

some.config === {
  a: 2,
  b: 2,
  c: 3,
}


```