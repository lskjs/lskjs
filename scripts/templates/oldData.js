/* eslint-disable max-len */
module.exports = {
  packages: [
    {
      name: '@lskjs/apiquery',
      title: 'apiquery',
      url: 'packages/apiquery',
      description:
        "пакет для общения front'a с back'ом, написан на axios, умеет в сокеты через socket.io ",
    },
    {
      name: '@lskjs/auth',
      title: 'auth',
      url: 'packages/auth',
      description:
        'пакет в котором описана логика авторизации, имеет серверную и клиентскую часть ',
    },
    {
      name: '@lskjs/autobind',
      title: 'autobind',
      url: 'packages/autobind',
      description: 'пакет обертка над autobind-decorator, не знаю зачем :) ',
    },
    {
      name: '@lskjs/billing',
      title: 'billing',
      url: 'packages/billing',
      description: 'позволяет подключать платежные системы ',
    },
    {
      name: '@lskjs/bots',
      title: 'bots',
      url: 'packages/bots',
      description:
        'позволяет подключать различных ботов в проект: telegram, discord, .etc ',
    },
    {
      name: '@lskjs/build-locales',
      title: 'build-locales',
      url: 'packages/build-locales',
      description: 'билдит локали из google spreadsheets ',
    },
    {
      name: '@lskjs/bunyan',
      title: 'bunyan',
      url: 'packages/bunyan',
      description: 'логгер ',
    },
    {
      name: '@lskjs/config',
      title: 'config',
      url: 'packages/config',
      description:
        'пакет который умеет собирать конфиг из разные файлов, env переменных ',
    },
    {
      name: '@lskjs/db',
      title: 'db',
      url: 'packages/db',
      description:
        'пакет для подключения к mongo, умеет в реконнект и имеет свой дефолтный конфиг ',
    },
    {
      name: '@lskjs/elastic',
      title: 'elastic',
      url: 'packages/elastic',
      description:
        'пакет для работы с ES, умеет делать запись, читать и создавать таблицы ',
    },
    {
      name: '@lskjs/event',
      title: 'event',
      url: 'packages/event',
      description:
        "пакет для глобальных event'ов в приложении, работает и на клиенте и на сервере. app.on('event') ",
    },
    {
      name: '@lskjs/getspreadsheet',
      title: 'getspreadsheet',
      url: 'packages/getspreadsheet',
      description:
        'пакет для build-locales, умеет парсить google spreadsheet  ',
    },
    {
      name: '@lskjs/grant',
      title: 'grant',
      url: 'packages/grant',
      description:
        'пакет с грантами, гранты нужны чтобы ограничивать часть функционала для некоторых пользователей ',
    },
    {
      name: '@lskjs/i18',
      title: 'i18',
      url: 'packages/i18',
      description:
        'пакет с локализациями и переводами, умеет менять текст в зависимости от выбранной локали ',
    },
    {
      name: '@lskjs/launcher',
      title: 'launcher',
      url: 'packages/launcher',
      description:
        'пакет-утилита для запуска проектов в нужной последовательности. В разработке. ',
    },
    {
      name: '@lskjs/linkall',
      title: 'linkall',
      url: 'packages/linkall',
      description: 'пакет линкующий все локальные lsk пакеты друг в друга ',
    },
    {
      name: '@lskjs/log',
      title: 'log',
      url: 'packages/log',
      description: 'логгер, подключен во всех модулях ',
    },
    {
      name: '@lskjs/mailer',
      title: 'mailer',
      url: 'packages/mailer',
      description: 'пакет для отправки почты, есть шаблоны для писем ',
    },
    {
      name: '@lskjs/mobx',
      title: 'mobx',
      url: 'packages/mobx',
      description: 'пакет с модулем mobx ',
    },
    {
      name: '@lskjs/module',
      title: 'module',
      url: 'packages/module',
      description:
        'пакет от которого наследуются остальные модули, имеет в себе встроенный логер, ee, функции init, start и прочее ',
    },
    {
      name: '@lskjs/permit',
      title: 'permit',
      url: 'packages/permit',
      description:
        "генерирует hash'ы, N-значные коды, позволяет создавать функционал для активации аккаунтов пользователей через уникальные одноразовые ссылки, или делать что то подобное(ну хз сложно описать) ",
    },
    {
      name: '@lskjs/rabbit',
      title: 'rabbit',
      url: 'packages/rabbit',
      description:
        'пакет для работы с rabbitmq, умеет создавать, читать и писать в очереди ',
    },
    {
      name: '@lskjs/reactapp',
      title: 'reactapp',
      url: 'packages/reactapp',
      description: 'пакет с реализацией react и SSR ',
    },
    {
      name: '@lskjs/rlog',
      title: 'rlog',
      url: 'packages/rlog',
      description: 'remote logs ',
    },
    {
      name: '@lskjs/sequelize',
      title: 'sequelize',
      url: 'packages/sequelize',
      description:
        "пакет для работы с sql'ными базами данных, postgres, mysql ",
    },
    {
      name: '@lskjs/server',
      title: 'server',
      url: 'packages/server',
      description:
        'сервер с уже подключенными бд, мидлварами, express и прочим ',
    },
    {
      name: '@lskjs/server-api',
      title: 'server-api',
      url: 'packages/server-api',
      description: 'пакет для создания api в проекте ',
    },
    {
      name: '@lskjs/sh',
      title: 'sh',
      url: 'packages/sh',
      description:
        'позволяет выполнять shell скрипты через ноду, может в асинхронность ',
    },
    {
      name: '@lskjs/sms',
      title: 'sms',
      url: 'packages/sms',
      description: 'пакет для отправки sms ',
    },
    {
      name: '@lskjs/tbot',
      title: 'tbot',
      url: 'packages/tbot',
      description: 'телеграмм бот ',
    },
    {
      name: '@lskjs/uapp',
      title: 'uapp',
      url: 'packages/uapp',
      description: 'универсальное реакт приложение ',
    },
    {
      name: '@lskjs/upload',
      title: 'upload',
      url: 'packages/upload',
      description:
        'пакет по загрузке файлов на сервер, имеет серверную и клиентствую часть ',
    },
    {
      name: '@lskjs/utils',
      title: 'utils',
      url: 'packages/utils',
      description:
        'пакет с кучей мелких утилит, типо lodash только от мира lskjs ',
    },
    {
      name: '@lskjs/worker',
      title: 'worker',
      url: 'packages/worker',
      description:
        'Пакет для созданий воркера(небольшого куска кода который выполняет определенную задачу) устарел, не используется ',
    },
    {
      name: '@lskjs/add-to-calendar',
      title: 'add-to-calendar',
      url: 'https://github.com/lskjs/ux/tree/packages/master/add-to-calendar',
      description: 'пакет для добавления эвентов в календари ',
    },
    {
      name: '@lskjs/article',
      title: 'article',
      url: 'https://github.com/lskjs/ux/tree/master/packages/article',
      description: 'статья ',
    },
    {
      name: '@lskjs/avatar',
      title: 'avatar',
      url: 'https://github.com/lskjs/ux/tree/master/packages/avatar',
      description: 'пакет для отображения аватаров / изображений с fallback ',
    },
    {
      name: '@lskjs/button',
      title: 'button',
      url: 'https://github.com/lskjs/ux/tree/master/packages/button',
      description: 'пакет c React компонентами для кнопки и группы кнопок ',
    },
    {
      name: '@lskjs/cookie-consent',
      title: 'cookie-consent',
      url: 'https://github.com/lskjs/ux/tree/master/packages/cookie-consent',
      description: 'HOC для обертки вьюхи чтобы делать модалки куки консента ',
    },
    {
      name: '@lskjs/css',
      title: 'css',
      url: 'https://github.com/lskjs/ux/tree/master/packages/css',
      description: 'пакет для инжекта глобальных стилей antd и bootstrap ',
    },
    {
      name: '@lskjs/dashboard',
      title: 'dashboard',
      url: 'https://github.com/lskjs/ux/tree/master/packages/dashboard',
      description:
        'пакет с набором компонентов для реализации dashboard панелей ',
    },
    {
      name: '@lskjs/dev',
      title: 'dev',
      url: 'https://github.com/lskjs/ux/tree/master/packages/dev',
      description: 'пакет для отладки в DEV окружении ',
    },
    {
      name: '@lskjs/docs',
      title: 'docs',
      url: 'https://github.com/lskjs/ux/tree/master/packages/docs',
      description: 'пакет с общей документацией по ux репозиторию (storybook) ',
    },
    {
      name: '@lskjs/downloads',
      title: 'downloads',
      url: 'https://github.com/lskjs/ux/tree/master/packages/downloads',
      description: 'пакет для генерации xlsx файлов ',
    },
    {
      name: '@lskjs/extra',
      title: 'extra',
      url: 'https://github.com/lskjs/ux/tree/master/packages/extra',
      description:
        'пакет с другими компонентами, которые не попали не под одну категорию ',
    },
    {
      name: '@lskjs/flag',
      title: 'flag',
      url: 'https://github.com/lskjs/ux/tree/master/packages/flag',
      description: 'React компонент для флагов, использует react-world-flags ',
    },
    {
      name: '@lskjs/form',
      title: 'form',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form',
      description: 'Форк Formik с кастомными контролами ',
    },
    {
      name: '@lskjs/grid',
      title: 'grid',
      url: 'https://github.com/lskjs/ux/tree/master/packages/grid',
      description: 'Сетка как в bootstrap ',
    },
    {
      name: '@lskjs/gridtable',
      title: 'gridtable',
      url: 'https://github.com/lskjs/ux/tree/master/packages/gridtable',
      description: 'пакет для генерации таблиц ',
    },
    {
      name: '@lskjs/image',
      title: 'image',
      url: 'https://github.com/lskjs/ux/tree/master/packages/image',
      description:
        'React компонент для картинок, использует react-image-fallback ',
    },
    {
      name: '@lskjs/landing',
      title: 'landing',
      url: 'https://github.com/lskjs/ux/tree/master/packages/landing',
      description: 'пакет для генерации лендинга на основе слайдов ',
    },
    {
      name: '@lskjs/link',
      title: 'link',
      url: 'https://github.com/lskjs/ux/tree/master/packages/link',
      description: 'пакет для реализации ссылок через history ',
    },
    {
      name: '@lskjs/list',
      title: 'list',
      url: 'https://github.com/lskjs/ux/tree/master/packages/list',
      description: 'пакет для создания списков ',
    },
    {
      name: '@lskjs/modal',
      title: 'modal',
      url: 'https://github.com/lskjs/ux/tree/master/packages/modal',
      description: 'пакет с модалками ',
    },
    {
      name: '@lskjs/navbar',
      title: 'navbar',
      url: 'https://github.com/lskjs/ux/tree/master/packages/navbar',
      description: 'компоненты для NavBar ',
    },
    {
      name: '@lskjs/notification',
      title: 'notification',
      url: 'https://github.com/lskjs/ux/tree/master/packages/notification',
      description: 'пакет с компонентом нотификаций ',
    },
    {
      name: '@lskjs/page',
      title: 'page',
      url: 'https://github.com/lskjs/ux/tree/master/packages/page',
      description:
        'пакет с компонентами для построения страниц с использованием layouts ',
    },
    {
      name: '@lskjs/progress',
      title: 'progress',
      url: 'https://github.com/lskjs/ux/tree/master/packages/progress',
      description: 'компонент прогресса построенный вокруг нанобара ',
    },
    {
      name: '@lskjs/scroll',
      title: 'scroll',
      url: 'https://github.com/lskjs/ux/tree/master/packages/scroll',
      description: 'анимационная утилита для скролла ',
    },
    {
      name: '@lskjs/slide',
      title: 'slide',
      url: 'https://github.com/lskjs/ux/tree/master/packages/slide',
      description: 'компонент для json-editor ',
    },
    {
      name: '@lskjs/t',
      title: 't',
      url: 'https://github.com/lskjs/ux/tree/master/packages/t',
      description: 'компонент для использования переводов из таблицы i18 ',
    },
    {
      name: '@lskjs/tag',
      title: 'tag',
      url: 'https://github.com/lskjs/ux/tree/master/packages/tag',
      description: 'теги поиска по аналогии с ant-тегами  ',
    },
    {
      name: '@lskjs/theme',
      title: 'theme',
      url: 'https://github.com/lskjs/ux/tree/master/packages/theme',
      description: 'пакет для темизации проекта. + утилиты для работы с темой ',
    },
    {
      name: '@lskjs/typo',
      title: 'typo',
      url: 'https://github.com/lskjs/ux/tree/master/packages/typo',
      description:
        'тут типографика, реализация: цвета, формы, размеры, шрифты ',
    },
    {
      name: '@lskjs/ui',
      title: 'ui',
      url: 'https://github.com/lskjs/ux/tree/master/packages/ui',
      description: 'UI kit ',
    },
    {
      name: '@lskjs/ui2',
      title: 'ui2',
      url: 'https://github.com/lskjs/ux/tree/master/packages/ui2',
      description: 'UI kit версии 2 ',
    },
    {
      name: '@lskjs/form-controls',
      title: 'form-controls',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-controls',
      description: 'стандарные контроллы ',
    },
    {
      name: '@lskjs/form-array-input',
      title: 'form-array-input',
      url: 'packages/https://github.com/lskjs/ux/tree/master/form-array-input',
      description: 'контрол для множественных инпутов ',
    },
    {
      name: '@lskjs/form-array-of',
      title: 'form-array-of',
      url: 'packages/https://github.com/lskjs/ux/tree/master/form-array-of',
      description: 'контрол для реализации radio-link элементов ',
    },
    {
      name: '@lskjs/form-calendar',
      title: 'form-calendar',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-calendar',
      description: 'контрол для выбора даты календаря ',
    },
    {
      name: '@lskjs/form-checkblock',
      title: 'form-checkblock',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-checkblock',
      description: 'контрол checkbox-like в виде блока с доп. секцией ',
    },
    {
      name: '@lskjs/form-checkblock-list',
      title: 'form-checkblock-list',
      url: 'packages/https://github.com/lskjs/ux/tree/master/form-checkblock-list',
      description: 'контрол списка form-checkblock ',
    },
    {
      name: '@lskjs/form-code',
      title: 'form-code',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-code',
      description: 'контрол для ввода кода ',
    },
    {
      name: '@lskjs/form-date',
      title: 'form-date',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-date',
      description: 'контролл вводы даты ',
    },
    {
      name: '@lskjs/form-editor',
      title: 'form-editor',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-editor',
      description: 'контрол написания текста ',
    },
    {
      name: '@lskjs/form-files',
      title: 'form-files',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-files',
      description: 'Контрол для загрузки файлов ',
    },
    {
      name: '@lskjs/form-geo',
      title: 'form-geo',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-geo',
      description: 'контрол для отображения карты (Google Maps?) ',
    },
    {
      name: '@lskjs/form-group-of',
      title: 'form-group-of',
      url: 'packages/https://github.com/lskjs/ux/tree/master/form-group-of',
      description: 'контрол для реализации checkbox-link элементов ',
    },
    {
      name: '@lskjs/form-image',
      title: 'form-image',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-image',
      description: 'Контрол для заграузки изображений ',
    },
    {
      name: '@lskjs/form-input',
      title: 'form-input',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-input',
      description: 'Контрол для в ввода текста ',
    },
    {
      name: '@lskjs/form-password',
      title: 'form-password',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-password',
      description: 'Контрол для в вода пароля ',
    },
    {
      name: '@lskjs/form-percent-slider',
      title: 'form-percent-slider',
      url: 'packages/https://github.com/lskjs/ux/tree/master/form-percent-slider',
      description:
        'контрол для выбора значений в виде слайда (+ выбора диапазона) ',
    },
    {
      name: '@lskjs/form-phone',
      title: 'form-phone',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-phone',
      description: 'Контрол для ввода телефона ',
    },
    {
      name: '@lskjs/form-radio',
      title: 'form-radio',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-radio',
      description: 'Контрол с радио кнопкой ',
    },
    {
      name: '@lskjs/form-range',
      title: 'form-range',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-range',
      description: 'контрол выбора от - до ',
    },
    {
      name: '@lskjs/form-recapcha2',
      title: 'form-recapcha2',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-recapcha2',
      description: 'контрол для проверки капчи ',
    },
    {
      name: '@lskjs/form-recapcha3',
      title: 'form-recapcha3',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-recapcha3',
      description: 'контрол для проверки капчи ',
    },
    {
      name: '@lskjs/form-select',
      title: 'form-select',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-select',
      description: 'Контрол с селектом ',
    },
    {
      name: '@lskjs/form-switcher',
      title: 'form-switcher',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-switcher',
      description: 'Контрол с переключателем ',
    },
    {
      name: '@lskjs/form-tags',
      title: 'form-tags',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-tags',
      description: 'контрол для выбора тегов ',
    },
    {
      name: '@lskjs/form-textarea',
      title: 'form-textarea',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-textarea',
      description: 'Контрол для ввода текста ',
    },
    {
      name: '@lskjs/form-time',
      title: 'form-time',
      url: 'https://github.com/lskjs/ux/tree/master/packages/form-time',
      description: 'контрол для выбора времени ',
    },
  ],
};
