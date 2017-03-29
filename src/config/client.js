import config from 'lego-starter-kit/config/client';
export default config.extend({
  site: {
    abbr: 'TST',
    title: 'The Site Title',
    description: 'The Description',
    copyright: 'Copyright &copy; 2016-2017',
    slide: {
      image: '',
      video: '',
    }
  },

  url: 'http://localhost:3000',
  api: {
    base: '/api/v1',
  },
  host: 'http://localhost:3000', // depreacated

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
    socials: ['vkontakte', 'youtube'],
  },
});
