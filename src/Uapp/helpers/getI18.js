import i18next from 'i18next';
import i18nextXhrBackend from 'i18next-xhr-backend';

export default function (...i18Args) {
  return new Promise(async (resolve, reject) => {
    // console.log('@@@!!!!');


    const i18 = i18next.createInstance();
    // console.log('@@@ 22');

    const app = this;
    const i18params = this.getI18Params(...i18Args);
    if (__CLIENT__) {
      // console.log('@@@ 222222');
      i18.use(i18nextXhrBackend);
    }
    // console.log('@@@ 33');
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
        console.error('i18next.init reject', err);
        return reject(err);
      });
  });
}
