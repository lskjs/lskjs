import fs from 'fs';

const dirname = __dirname + '/..';
const ctx = {
  env: process.env.NODE_ENV,
  debug: !process.argv.includes('--release'),
  verbose: process.argv.includes('--verbose'),
  dirname,
  pkg: require('../package.json'),
  deps: [
  ],
  alias: {
    'lsk-general': fs.realpathSync(`${dirname}/src`),
    react: fs.realpathSync(`${dirname}/node_modules/react`),
    'react-dom': fs.realpathSync(`${dirname}/node_modules/react-dom`),
  },
};

export default ctx;
