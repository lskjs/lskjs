import config from 'lego-starter-kit/utils/config';
export default config.init({
  log: {
    level: __DEV__ ? 'debug' : 'error',
    // level: __DEV__ ? 'debug' : 'error',
  },
});
