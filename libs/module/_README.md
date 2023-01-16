# LSK.js – module

> @lskjs/module – Module system with dependency injection, event emitter, logger and submodules tree

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/module)](https://www.npmjs.com/package/@lskjs/module)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/module)](https://www.npmjs.com/package/@lskjs/module)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/module)](https://bundlephobia.com/result?p=@lskjs/module)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/module)](https://www.npmjs.com/package/@lskjs/module)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/module)](https://bundlephobia.com/result?p=@lskjs/module)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/module)](https://bundlephobia.com/result?p=@lskjs/module)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

*   [@lskjs/module](#lskjsmodule)

*   [Манифест модульной архитектуры](#манифест-модульной-архитектуры)

    *   [Основные цели](#основные-цели)

    *   [Побочные фишки](#побочные-фишки)

        *   [Modules lifecycle](#modules-lifecycle)
        *   [Modules stage statuses](#modules-stage-statuses)
        *   [Modules public static methods](#modules-public-static-methods)

    *   [Просто взять и юзать](#просто-взять-и-юзать)

    *   [Прокидывать props в конструктор](#прокидывать-props-в-конструктор)

    *   [Разные способы создавать](#разные-способы-создавать)

    *   [Наследование](#наследование)

    *   [Конфиги](#конфиги)

    *   [Прокидывать подмодули, разным образом](#прокидывать-подмодули-разным-образом)

        *   [Как props в конструкторе](#как-props-в-конструкторе)

        *   [Прокидывать подмодули с параметрами конструктора](#прокидывать-подмодули-с-параметрами-конструктора)

            *   [как field в классе](#как-field-в-классе)
            *   [как расширения getter'a в классе](#как-расширения-gettera-в-классе)

        *   [как создаем модуль](#как-создаем-модуль)

    *   [Еще не написана документация](#еще-не-написана-документация)

    *   [Гипотетическое использование](#гипотетическое-использование)

    *   [Всякие ссылки](#всякие-ссылки)

*   [=======================================](#)

*   [Модули и конфиги](#модули-и-конфиги)

    *   [Case 1 – empty config](#case-1--empty-config)
    *   [Case 2 – default config](#case-2--default-config)
    *   [Case 3 - config while creation](#case-3---config-while-creation)
    *   [Case 4 - merging default and top config](#case-4---merging-default-and-top-config)
    *   [Case 5 - async config from db](#case-5---async-config-from-db)
    *   [Case 6 - deep config merge](#case-6---deep-config-merge)
    *   [May be in future](#may-be-in-future)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/module @types/lodash bluebird lodash

# npm
npm i @lskjs/module @types/lodash bluebird lodash
```

***

# @lskjs/module

Весь мир модуль и мы в нём подмодули

***

Модуль - модули это классы с определнным жизненным циклом. Из модулей будет собираться комплексное приложение, у модулей могут быть подмодули.

# Манифест модульной архитектуры

## Основные цели

*   простая инициализация
*   расширение через наследование
*   расширение через параметры конструктора
*   модульность (древовидная архитектура)
*   ленивость (асинхронность всего что только возможно)

## Побочные фишки

*   встроенный логгер и дебаг режим
*   встроенный event emitter и event driven
*   кофигурирование из единой родительской точки
*   удобный inject'инг из дерева модулей
*   легковесность

### Modules lifecycle

*   null - после конструктора
*   init - стадия инициализации, по сути это асинхронный конструктор, нужно сделать все необходимые require. на этой стадии работаем внутри себя, остальные сестренские объекты (модели, модули, сокеты, файлы) еще не существуют.
*   run - стадия запуска, делаем все необоходимые внешние подключения, тут можно обращяться к внешний модулям системы: модели, модули
*   stop - выключаем модуль, или для остановки приложения, или для переконфигурирования, или просто чтобы выключить соединения и очистить память

### Modules stage statuses

*   null - хуй знает что с ним, еще не запускался
*   initing - стадия инициализации
*   inited - уже инициализировался
*   runing - стадия запуска
*   runned - уже запустился
*   stopping - стадия остановки
*   stoped - уже остановился

### Modules public static methods

*   module.init() - как консструктор но асинхронный, делает необходимые импорты и устанвливет правильное состояние модуля

*   module.run() - запускает все процессы в модуле

*   module.start() - init and run and some magic?

*   Module.new() - only create object

*   Module.create() - new + init

*   Module.start() - new + init + run -- init and run and some magic?

## Просто взять и юзать

```js
const theModule = await TheModule.start();
theModule.name === 'TheModule'
```

## Прокидывать props в конструктор

```js
const theModule = await TheModule.start({ 
  mode: 'private',
  config: { 
    value: 1
  },
});
theModule.mode === 'private'
theModule.config.value === 1
```

## Разные способы создавать

```js
// === Example 1 - common use === 
const m = await Module.start(props);

// === Example 2 - if you need inited modules for connection === 
const m1 = await Module.create(props);
const m2 = await Module.create(props);
m1.m2 = m2;
m2.m1 = m1;
await m1.start();
await m2.start();

// === Example 3 – if you need uninited module  ===
const m = Module.new(props);
await m.start()
```

## Наследование

```js
class SomeModule extends Module {
  async run() {
    await super.run(); // очень важно не забывать super
    if (this.param) {
      doSomething();
    }
  } 
}

// Прокидывание параметров через конструктор

const sm = await SomeModule.start({
  param: 1312,
});

```

## Конфиги

```js
class OtherModule extends Module {
  async init() {
    await super.init(); // очень важно не забывать super
    if (this.config.param) {
      doSomething();
    }
  } 
}

// SomeModule from the previous example
const some = await SomeModule.start({
  param: 1,
  modules: {
    other: OtherModule,
  },
  config: {
    param: 2
    some
  }
});

const other = await m.module('other');
```

## Прокидывать подмодули, разным образом

### Как props в конструкторе

*   как класс через require
*   как промис через асинхронный import
*   как функцию при вызове которой будет происхолить асинхрронный import

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

### Прокидывать подмодули с параметрами конструктора

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

## Еще не написана документация

*   проблема провайдеров

*   у модуля должен быть логгер

*   у модуля должен быть event emitter

*   проблема конфигов, централизованных конфигов

*   проблема моделей и модуля db (в init нужен mongoose)

*   модуль

*   подмодули

*   провайдеры

*   модели

*   ee

*   inject

*   getModules

*   modules={}

*   new TheModule(, {providers: {}})

*   как прокидывать конфиги дальше?

## Гипотетическое использование

## Всякие ссылки

*   https://v8.dev/blog/fast-async
    \========================
    При переинициализации мы должны получать тот же самый объект

# =======================================

# Модули и конфиги

## Case 1 – empty config

```js
class SomeModule extends Module { }

const some = await SomeModule.start();

console.log(some.config); // {}
```

## Case 2 – default config

```js
class SomeModule extends Module {
  config = {
    a: 1,
    b: 2
  };
}

const some = await SomeModule.start();

console.log(some.config);
// {
//   a: 1,
//   b: 2,
// }
```

***

## Case 3 - config while creation

```js
const some = await SomeModule.start({
  config: {
    a: 11,
  }
});

console.log(some.config);
// {
//   a: 11,
// }
```

## Case 4 - merging default and top config

```js
class SomeModule extends Module {
  config = {
    a: 1,
    b: 2,
    z: {
      za: 1,
      zb: 2
    }
  };
  other = {
    e: 5,
    f: 6,
  };
}

const some = await SomeModule.create({
  config: {
    a: 11,
    c: 33,
    z: {
      za: 11,
      zc: 33
    }
  },
  other: {
    e: 55,
    g: 77,
  };
})

// Мердж работает только с плоскими, конфигами. Но если очень хочется можно сделать глубокий merge
console.log(some.config);
// {
//   a: 11,
//   b: 2,
//   c: 33,
//   z: {
//     za: 11,
//     zc: 33,
//   },
// }


// Другие объекты перетираются, но если очень хочется то можно сделать как в конфигах
console.log(some.other);
// {
//   e: 55,
//   g: 77,
// }
```

***

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

\=================

## May be in future

```jsx
class Uapp {

  getModules() {
   return {
     appstate: () => import('./modules/appstate'),
     i18: () => import('./modules/i18'),
   }
  }

  provide() {
    return {
      ...super.provide(),
      i18: this.modules.i18
    }
  }
}


async injectAndAwait(props) {
  const i18 = await props.i18;
  const res = {};
  if (!i18.runned) {
    await i18.run();
    res.i18 = i18;
  }
  return res;
}

@injectAndAwait('i18')
class Component {
  render() {
    const {i18} = this.props;
    return <div />
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
