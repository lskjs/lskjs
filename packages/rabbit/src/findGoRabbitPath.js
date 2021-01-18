export default () => [
  `${process.cwd()}/rabbit`,
  `${process.cwd()}/../rabbit`,
  `${process.cwd()}/../../rabbit`,
  '/go/rabbit',
  `${process.cwd()}/../go-rabbit/rabbit`,
  `${process.cwd()}/../../go-rabbit/rabbit`,
  // eslint-disable-next-line global-require
].map(p => require('path').resolve(p)).filter(p => require('fs').existsSync(p))[0];
