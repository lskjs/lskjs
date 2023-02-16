require('@lskjs/utils/polyfill');
const Rlog = require('../build/Rlog').default;
const RlogServerModule = require('../build/RlogServerModule').default;

const main = async () => {
  const rlog = new Rlog({
    base: 'https://notify.isuvorov.com/notify',
    project: `test`,
  });
  const res = await rlog.trace('Hello World – test');
  console.log('rlog.trace result', res.data);

  const app = {
    config: {
      rlog: {
        base: 'https://notify.isuvorov.com/notify',
        project: `test`,
      },
    },
  };
  const rlogModule = new RlogServerModule({ app });
  await rlogModule.start();
  const res2 = await rlogModule.trace('Hello World – test');
  console.log('rlogModule.trace result', res2.data);
};
main().catch((err) => {
  console.error('main error', err);
});

