module.exports = {
  concurrency: 10,
  i18: {
    url: 'https://docs.google.com/spreadsheets/d/1yqEtc7VfCZRv4I3iqSiKSq9CkSDCU3fIKa-ZayyW_ys/edit#gid=0',
  },
  ncu: {
    dep: 'prod,dev,peer,optional',
    packages: '/^@(lskjs)/.*$/',
    newest: 1,
  }
};