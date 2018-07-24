import fs from 'fs'
const dirname = __dirname + '/..'
const ctx = {
  env: process.env.NODE_ENV,
  debug: !process.argv.includes('--release'),
  verbose: process.argv.includes('--verbose'),
  dirname,
  pkg: require('../package.json'),
  babelrc: JSON.parse(fs.readFileSync(`${dirname}/.babelrc`)),
  deps: [
    {
      name: 'lego-starter-kit',
      path: fs.realpathSync(dirname + '/src'),
      alias: 'lego-starter-kit',
    },
  ],
  alias: {
    // 'lego-starter-kit': fs.realpathSync(dirname + '/src'),
    // '@lskjs/general': fs.realpathSync(dirname + '/node_modules/@lskjs/general/dist'),
    react: fs.realpathSync(dirname + '/node_modules/react'),
    'react-dom': fs.realpathSync(dirname + '/node_modules/react-dom'),
  },
}
export default ctx
