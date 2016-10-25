import extend from 'extend';
import path from 'path';
import del from 'del';
import fetch from 'node-fetch';
import GitRepo from 'git-repository';
import gaze from 'gaze';
import Promise from 'bluebird';
import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import cp from 'child_process';

import fetch2 from './utils/fetch';
import fs from './utils/fs';
const host = 'localhost';

export default class Runner {

  constructor(ctx = {}) {
    Object.assign(this, ctx)
  }

  resolvePath(...args) {
    if (this.dirname) return path.resolve(this.dirname, ...args)
    return path.resolve(...args)
  }

  start() {
    return require('tools/start').default(this)
  }

  async clean() {
    await del(['.tmp', 'build/*', '!build/.git'], { dot: true });
    await fs.makeDir('build/public');
  }


 async copy({ watch } = {}) {
   const ncp = Promise.promisify(require('ncp'));

   await Promise.all([
     // ncp('src/public', 'build/public'),
     // ncp('src/content', 'build/content'),
   ]);

   await fs.writeFile(this.resolvePath('build/package.json'), JSON.stringify({
     private: true,
     engines: this.pkg.engines,
     dependencies: this.pkg.dependencies,
     scripts: {
       start: 'node server.js',
     },
   }, null, 2));

   if (watch) {
     const watcher = await new Promise((resolve, reject) => {
       gaze('src/content/**/*.*', (err, val) => err ? reject(err) : resolve(val));
     });

     const cp = async (file) => {
       const relPath = file.substr(this.resolvePath('src/content/').length);
       await ncp(`src/content/${relPath}`, `build/content/${relPath}`);
     };

     watcher.on('changed', cp);
     watcher.on('added', cp);
   }
 }



  async build() {
    await this.clean();
    await this.copy();
    await this.bundle();

    if (process.argv.includes('--static')) {
      await this.render();
    }
  }

  bundle() {
    return new Promise((resolve, reject) => {
      webpack(this.webpackConfig).run((err, stats) => {
        if (err) {
          return reject(err);
        }

        console.log(stats.toString(this.webpackConfig[0].stats));
        return resolve();
      });
    });
  }



  /**
   * Deploy the contents of the `/build` folder to a remote
   * server via Git. Example: `npm run deploy -- production`
   */
  async  deploy() {

    // TODO: Update deployment URL
    // For more information visit http://gitolite.com/deploy.html
    const getRemote = (slot) => ({
      name: slot || 'production',
      url: `https://example${slot ? `-${slot}` : ''}.scm.azurewebsites.net:443/example.git`,
      website: `http://example${slot ? `-${slot}` : ''}.azurewebsites.net`,
    });
    // By default deploy to the staging deployment slot
    const remote = getRemote(process.argv.includes('--production') ? null : 'staging');

    // Initialize a new Git repository inside the `/build` folder
    // if it doesn't exist yet
    const repo = await GitRepo.open('build', { init: true });
    await repo.setRemote(remote.name, remote.url);

    // Fetch the remote repository if it exists
    if ((await repo.hasRef(remote.url, 'master'))) {
      await repo.fetch(remote.name);
      await repo.reset(`${remote.name}/master`, { hard: true });
      await repo.clean({ force: true });
    }

    // Build the project in RELEASE mode which
    // generates optimized and minimized bundles
    process.argv.push('--release');
    await run(require('./build'));

    // Push the contents of the build folder to the remote server via Git
    await repo.add('--all .');
    await repo.commit('Update');
    await repo.push(remote.name, 'master');

    // Check if the site was successfully deployed
    const response = await fetch(remote.website);
    console.log(`${remote.website} -> ${response.statusCode}`);
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
      const url = `http://${host}${route}`;
      const dir = `build/public${route.replace(/[^\/]*$/, '')}`;
      const name = route.endsWith('/') ? 'index.html' : `${route.match(/[^/]+$/)[0]}.html`;
      const dist = `${dir}${name}`;
      const res = await fetch(url);
      const text = await res.text();
      await fs.makeDir(dir);
      await fs.writeFile(dist, text);
      console.log(`${dist} => ${res.status} ${res.statusText}`);
    }), Promise.resolve());

    server.kill('SIGTERM');
  }

  format(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
  }

  run(fn, options) {
    const task = typeof fn.default === 'undefined' ? fn : fn.default;
    const start = new Date();
    console.log(
      `[${format(start)}] Starting '${task.name}${options ? `(${options})` : ''}'...`
    );
    return task(options).then(() => {
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.log(
        `[${format(end)}] Finished '${task.name}${options ? `(${options})` : ''}' after ${time} ms`
      );
    });
  }

  async start(ctx) {
    console.log('start');
    await this.clean();
    await this.copy({ watch: true });
    await new Promise(resolve => {
      // Patch the client-side bundle configurations
      // to enable Hot Module Replacement (HMR) and React Transform


      const webpackConfig = this.webpackConfig
      const bundler = webpack(webpackConfig);
      const wpMiddleware = webpackMiddleware(bundler, {
        // IMPORTANT: webpack middleware can't access config,
        // so we should provide publicPath by ourselves
        publicPath: webpackConfig[0].output.publicPath,

        // Pretty colored output
        stats: webpackConfig[0].stats,

        // For other settings see
        // https://webpack.github.io/docs/webpack-dev-middleware
      });
      const hotMiddlewares = bundler
        .compilers
        .filter(compiler => compiler.options.target !== 'node')
        .map(compiler => webpackHotMiddleware(compiler));

      let handleServerBundleComplete = () => {
        this.runServer((err, host) => {
          if (!err) {
            const bs = Browsersync.create();
            bs.init({
              ...(this.debug ? {} : { notify: false, ui: false }),

              proxy: {
                target: host,
                middleware: [wpMiddleware, ...hotMiddlewares],
              },

              // no need to watch '*.js' here, webpack will take care of it for us,
              // including full page reloads if HMR won't work
              files: ['build/content/**/*.*'],
            }, resolve);
            handleServerBundleComplete = () => this.runServer();
          }
        });
      };

      bundler.plugin('done', () => handleServerBundleComplete());
    });
  }

 runServer(cb) {
   const RUNNING_REGEXP = /The server is running at http:\/\/(.*?)\//;

    const onStdOut = (data) => {
      const time = new Date().toTimeString();
      const match = data.toString('utf8').match(RUNNING_REGEXP);

      // process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
      // process.stdout.write(data);
      process.stdout.write(data.toString('utf8'));
      if (match) {
        this.server.stdout.removeListener('data', onStdOut);
        this.server.stdout.on('data', x => process.stdout.write(x));
        if (cb) {
          cb(null, match[1]);
        }
      }
    }

    if (this.server) {
      this.server.kill('SIGTERM');
    }

    const { output } = this.webpackConfig.find(x => x.target === 'node');
    const serverPath = path.join(output.path, output.filename);
    this.server = cp.spawn('node', [serverPath], {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });
    this.server.stdout.on('data', onStdOut);
    this.server.stderr.on('data', x => process.stderr.write(x));
    return this.server;
  }

}

// process.on('exit', () => {
//   if (server) {
//     server.kill('SIGTERM');
//   }
// });
