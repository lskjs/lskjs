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
    profile: [
      {
        name: 'profile.firstName',
        title: 'Имя',
        control: {
          placeholder: 'Например, Василий',
        },
      },
      {
        name: 'profile.lastName',
        title: 'Фамилия',
        control: {
          placeholder: 'Например, Пушкин',
        },
      },
      {
        name: 'profile.middleName',
        title: 'Отчество',
        control: {
          placeholder: 'Например, Александрович',
        },
      },
    ],
    required: [
      'firstName', 'lastName',
    ],
    socials: ['vkontakte', 'youtube'],
  },
});
