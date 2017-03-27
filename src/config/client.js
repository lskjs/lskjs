import config from 'lego-starter-kit/utils/config';
import baseConfig from 'lego-starter-kit/config/client';

export default config.client(baseConfig, {
  siteTitle: 'The Site Title',
  siteDescription: 'The Description',
  siteCopyright: '<span>Copyright &copy; 2016-2017 </span><a href="http://github.com/isuvorov/lego-starter-kit">Lego-starter-kit</a>.</strong> All rights reserved.',
  api: {
    base: '/api/v1',
  },
  host: __DEV__ ? 'http://localhost:3000' : 'http://localhost:3000',
  auth: {
    signup: ['firstName', 'lastName', 'icq'],
    profile: {
      firstName: {
        required: true,
        input: {
          title: 'Имя',
          placeholder: 'Например, Пушкин',
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
        input: {
          title: 'Фамилия',
          placeholder: 'Например, Иванов',
        },
        validate: {
          presence: {
            message: 'Поле не должно быть пустым',
          },
        },
      },
      middleName: {
        input: {
          title: 'Отчество',
          placeholder: 'Например, Александрович',
        },
      },
      icq: {
        input: {
          title: 'ICQ',
          placeholder: 'Например, Александрович',
        },
      },
    },
    socials: ['vkontakte', 'youtube'],
  },
});
