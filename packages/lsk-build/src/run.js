import Runner from 'lsk-build/Runner'
import getWebpackConfig from './getWebpackConfig'
import config from './config'
import fs from 'fs'
import fetch from 'node-fetch'
import mkdirp from 'mkdirp';

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', err => err ? reject(err) : resolve());
});

const makeDir = (name) => new Promise((resolve, reject) => {
  mkdirp(name, err => err ? reject(err) : resolve());
});


const ctx = config
ctx.webpackConfig = getWebpackConfig(ctx)
class Runner2 extends Runner {
  host = 'localhost:8080'


  async buildStatic() {
    const routes = [
      '/'
    ]
    console.log('buildStatic 1');
    await this.clean();
    console.log('buildStatic 2');
    await this.copy();
    console.log('buildStatic 3');
    await this.bundle();
    console.log('buildStatic 4');
    await this.render(routes);
    console.log('buildStatic 5');
  }


  async render(routes) {
    if (!routes) {
      routes = [
        '/',
        '/contact',
        '/login',
        '/register',
        '/about',
        '/privacy',
        '/404', // https://help.github.com/articles/creating-a-custom-404-page-for-your-github-pages-site/
      ];
    }
    let server;
    await new Promise(resolve => (server = this.runServer(resolve)));

    await routes.reduce((promise, route) => promise.then(async () => {
      const url = `http://${this.host}${route}`;
      const dir = `build/public${route.replace(/[^\/]*$/, '')}`;
      const name = route.endsWith('/') ? 'index.html' : `${route.match(/[^/]+$/)[0]}.html`;
      const dist = `${dir}${name}`;
      const res = await fetch(url);
      const text = await res.text();
      await makeDir(dir);
      await writeFile(dist, text);
      console.log(`${dist} => ${res.status} ${res.statusText}`);
    }), Promise.resolve());

    server.kill('SIGTERM');
  }

}
const app = new Runner2(ctx)
if (process.argv.length > 2) {
  const method = process.argv[2]
  app[method]().catch(err => console.error(err.stack));
}
