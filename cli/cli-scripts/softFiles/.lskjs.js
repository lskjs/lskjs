module.exports = {
  storybook: 0,
  i18: {
    url: 'https://docs.google.com/spreadsheets/d/1yqEtc7VfCZRv4I3iqSiKSq9CkSDCU3fIKa-ZayyW_ys/edit#gid=0',
  },
  ncu: {
    dep: 'prod,dev,peer,optional',
    packages: '/^@(lskjs)/.*$/',
    newest: 1,
  },
  lerna: {
    // releaseArgs: '--yes' // yes
    // releaseArgs: '--github-release --yes' // github
    // releaseArgs: '--github-release --yes --conventional-prerelease' // beta
  }
};