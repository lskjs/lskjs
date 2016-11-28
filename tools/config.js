import fs from 'fs'
const dirname = __dirname + '/..'
const ctx = {
  env: process.env.NODE_ENV,
  debug: !process.argv.includes('--release'),
  verbose: process.argv.includes('--verbose'),
  dirname,
  pkg: require('../package.json'),
  deps: [
    {
      name: 'lego-starter-kit',
      path: fs.realpathSync(dirname + '/src'),
      alias: 'lego-starter-kit',
    }
  ],
  alias: {
    // 'lego-starter-kit': fs.realpathSync(dirname + '/src'),
    react: fs.realpathSync(dirname + '/node_modules/react'),
  },
}
export default ctx
