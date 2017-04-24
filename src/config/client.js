import config from 'lego-starter-kit/config/client';
export default config.extend({
  site: {
    abbr: 'TST',
    title: 'The Site Title',
    description: 'The Description',
    copyright: 'Copyright &copy; 2016-2017',
    slide: {
      video: 'https://skill-branch.ru/video-background.webm',
    },
  },
  log: {
    level: 'trace',
  },
  url: __DEV__ ? 'http://localhost:3000' : '/',
  api: {
    url: __DEV__ && __SERVER__ ? 'http://localhost:3000' : '/',
    base: '/api/v1',
    ws: {
      url: __DEV__ ? 'http://localhost:8080' : '/',
      base: '/api',
      options: {
        transports: ['websocket'],
      },
    },
  },

  auth: {
    profile: {
      firstName: {
        required: true,
        title: 'Имя',
        control: {
          placeholder: 'Например, Александр',
        },
        validate: {
          presence: {
            message: 'Поле не должно быть пустым.',
          },
          email: {
            message: 'Введите корректный адрес почты.',
          },
        },
      },
      lastName: {
        required: true,
        title: 'Фамилия',
        control: {
          placeholder: 'Например, Пушкин',
        },
        validate: {
          presence: {
            message: 'Поле не должно быть пустым',
          },
        },
      },
      middleName: {
        title: 'Отчество',
        control: {
          placeholder: 'Например, Сергеевич',
        },
      },
      icq: {
        title: 'ICQ',
        control: {
          placeholder: 'Например, 336-844-366',
        },
      },
    },
    signup: ['firstName', 'lastName'],
    // socials: ['vkontakte', 'youtube'],
  },
});
