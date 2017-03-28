import config from 'lego-starter-kit/config/client';
export default config.extend({
  siteTitle: 'The Site Title',
  siteDescription: 'The Description',
  siteCopyright: '<span>Copyright &copy; 2016-2017 </span><a href="http://github.com/isuvorov/lego-starter-kit">Lego-starter-kit</a>.</strong> All rights reserved.',
  api: {
    base: '/api/v1',
  },
  host: 'http://localhost:3000',
  auth: {
    signup: ['firstName', 'lastName'],
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
    socials: ['vkontakte', 'youtube'],
  },
});
