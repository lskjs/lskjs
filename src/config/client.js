import config from 'lego-starter-kit/utils/config';
import baseConfig from 'lego-starter-kit/config/client';

export default config.client(baseConfig, {
  siteTitle: 'The Site Title',
  api: {
    base: '/api/v1',
  },
  host: __DEV__ ? 'http://localhost:3000' : 'http://localhost:3000',
});
