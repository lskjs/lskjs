import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';

export default function (...i18Args) {
  return new Promise(async (resolve, reject) => {
    const i18 = i18next.createInstance();
    const app = this;
    const i18params = this.getI18Params(...i18Args);
    if (__CLIENT__ && i18params.backend) {
      i18.use(i18nextXhrBackend);
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
      });
    }
    return i18
      .init(i18params)
      .then(() => {
        return resolve(i18);
      })
      .catch((err) => {
        console.error('i18next.init reject', err);  //eslint-disable-line
        return reject(err);
      });
  });
}
