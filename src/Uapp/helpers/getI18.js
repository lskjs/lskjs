import i18next from 'i18next';

export default function (...i18Args) {
  return new Promise((resolve, reject) => {
    const i18 = i18next.createInstance();

    const app = this;
    if (__CLIENT__) {
      i18.use(require('i18next-xhr-backend').default);
    }
    if (__DEV__) {
      i18.use({
        type: 'logger',
        log(args) {
          if (args[0] === 'i18next: initialized') return;
          if (args[0] === 'i18next::translator: missingKey') {
            app.log.error(args.join(', '));
          }
        },
        warn(args) {
          app.log.warn(args.join(', '));
        },
        error(args) {
          app.log.error(args.join(', '));
        },
      })
    }
    i18.init(this.getI18Params(...i18Args), (err) => {
      if (err) return reject(err);
      return resolve(i18next);
    });
  });
}