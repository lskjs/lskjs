import i18next from 'i18next';

export default async function (...args) {
  return new Promise((resolve, reject) => {
    const i18 = i18next.createInstance();

    const app = this;
    i18
      .use({
        type: 'logger',
        log(args2) {
          if (args2[0] === 'i18next: initialized') return;
          app.log.info(...args2);
          // console.log('log@', args2);
        },
        warn(args2) {
          app.log.warn(...args2);
          // console.log('warn@', args2);
        },
        error(args2) {
          app.log.error(...args2);
          // console.log('error@', args2);
        },
      })
      .init(this.getI18Params(...args), (err) => {
        if (err) return reject(err);
        return resolve(i18);
      });
  });
}
