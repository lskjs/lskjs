import config from 'lego-starter-kit/utils/config';
export default config.init({
  log: {
    level: (
      __CLIENT__ && __DEV__ ? 'trace' :
      __SERVER__ && __DEV__ ? 'debug' :
      'error'
    )
  },
});
