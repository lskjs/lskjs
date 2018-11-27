import path from 'path';
import fetch from 'node-fetch';
import Promise from 'bluebird';
import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import cp from 'child_process';
import fs from 'fs';
import stringify from 'serialize-javascript';
import { writeFile, makeDir } from './utils/fs';

// verbose webpack config
// require('fs').writeFileSync('_webpack.config.json', JSON.stringify(webpackConfig, null, 2))
const DEBUG = false;

function isDir(dir) {
  try {
    return fs.lstatSync(dir).isDirectory();
  } catch (err) {
    return null;
  }
}
export default class Runner {
  constructor(ctx = {}) {
    Object.assign(this, ctx);
    // console.log(111111, Object.keys(this));
    this.build = require('./tools/build').default.bind(this);
    this.bundle = require('./tools/bundle').default.bind(this);
    this.clean = require('./tools/clean').default.bind(this);
    this.copy = require('./tools/copy').default.bind(this);
    this.deploy = require('./tools/deploy').default.bind(this);
    this.render = require('./tools/render').default.bind(this);
    this.run = require('./tools/run').default.bind(this);
    this.runServer = require('./tools/runServer').default.bind(this);
    this.start = require('./tools/start').default.bind(this);
  }

  resolvePath(...args) {
    if (this.dirname) return path.resolve(this.dirname, ...args);
    return path.resolve(...args);
  }

  resolveNpmPath(p, resNpm = 0) {
    if (p[0] === '~') {
      if (isDir(`${this.dirname}/src${p.substr(1)}`)) {
        return `${this.dirname}/src${p.substr(1)}`;
      }
      return `${this.dirname}${p.substr(1)}`;
    }
    if (!resNpm) return p;

    if (isDir(`${this.dirname}/node_modules/${p}/src`)) {
      return `${this.dirname}/node_modules/${p}/src`;
    }
    return `${this.dirname}/node_modules/${p}`;
  }

  getDistDir() {
    return this.distDir || 'build';
  }

  resolveDist(p) {
    return this.resolvePath(p);
    // const resolved = path.resolve((this.dirname ? (this.dirname + '/') : '') + '/' + path);
    // // console.log({path, resolved});
    // return this.resolvePath(path);
  }


  async prebuild() {
    if (!this.modules) return;
    DEBUG && console.log('prebuild');
    /* eslint-disable indent */
    const outputDir = this.resolvePath(this.resolveNpmPath(this.modules.output));
    // console.log({ outputDir });
    ['server', 'client', 'uapp'].forEach((type) => {
      const filename = this.resolvePath(outputDir, `${type}.js`);
      // console.log({ filename });
      const content = `\
export default function () {
  return {
${Object.keys(this.modules.modules).map((key) => {
  const val = this.modules.modules[key];
  // const moduleFileSrc = `${this.resolveNpmPath(val)}/src/${type}`;
  const moduleFileSrc = `${this.resolveNpmPath(val, 1)}/${type}.js`;
  const moduleFile = `${val}/${type}`;
  let prefix;
  try {
    // console.log({ moduleFileSrc });
    fs.readFileSync(moduleFileSrc);
    // require(moduleFileSrc);
    // console.log('@@@@@');
    prefix = '';
  } catch (err) {
    // console.log({ moduleFileSrc });
    prefix = '// ';
  }
  return `${'    '}${prefix}${key}: require('${moduleFile}').default(...arguments)`;
}).join(',\n')}
  };
}

`;
      /* eslint-enable indent */
      // console.log(content);
      fs.writeFileSync(filename, content);
    });
    //
    // modules
    //
    //
    // this.modules;
    //
    // console.log('this.modules', this.modules);
  }


  async copy2({ watch } = {}) {
    await writeFile(this.resolvePath(`${this.getDistDir()}/package.json`), JSON.stringify({
      private: true,
      engines: this.pkg.engines,
      dependencies: this.pkg.dependencies,
      scripts: {
        start: 'node server.js',
      },
    }, null, 2));
  }


  async build2() {
    await this.clean();
    await this.prebuild();
    await this.copy();
    await this.bundle();
    if (this.renderRoutes) {
      await this.render(this.renderRoutes);
    }
  }

  async traceWebpackConfig() {
    if (this.webpackConfigDist === false) return;
    const webpackConfigDist = this.webpackConfigDist || `${this.getDistDir()}/webpack.config.js`;
    try {
      fs.writeFileSync(webpackConfigDist, stringify(this.webpackConfig, 2));
      console.log('Compiling webpack.config.js => ', webpackConfigDist);
    } catch (err) { }
  }

  bundle2() {
    return new Promise((resolve, reject) => {
      this.traceWebpackConfig();
      webpack(this.webpackConfig).run((err, stats) => {
        if (err) {
          return reject(err);
        }

        console.log(stats.toString(this.webpackConfig[0].stats));
        return resolve();
      });
    });
  }

  async start2() {
    // if (server) return server;
    // server = express();
    // server.use(errorOverlayMiddleware());
    // server.use(express.static(path.resolve(__dirname, '../public')));
    //
    // // Configure client-side hot module replacement
    // const clientConfig = webpackConfig.find(config => config.name === 'client');
    // clientConfig.entry.client = ['./tools/lib/webpackHotDevClient']
    //   .concat(clientConfig.entry.client)
    //   .sort((a, b) => b.includes('polyfill') - a.includes('polyfill'));
    // clientConfig.output.filename = clientConfig.output.filename.replace(
    //   'chunkhash',
    //   'hash',
    // );
    // clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace(
    //   'chunkhash',
    //   'hash',
    // );
    // clientConfig.module.rules = clientConfig.module.rules.filter(
    //   x => x.loader !== 'null-loader',
    // );
    // clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    //
    // // Configure server-side hot module replacement
    // const serverConfig = webpackConfig.find(config => config.name === 'server');
    // serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    // serverConfig.output.hotUpdateChunkFilename =
    //   'updates/[id].[hash].hot-update.js';
    // serverConfig.module.rules = serverConfig.module.rules.filter(
    //   x => x.loader !== 'null-loader',
    // );
    // serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
    //
    // // Configure compilation
    // await run(clean);
    // const multiCompiler = webpack(webpackConfig);
    // const clientCompiler = multiCompiler.compilers.find(
    //   compiler => compiler.name === 'client',
    // );
    // const serverCompiler = multiCompiler.compilers.find(
    //   compiler => compiler.name === 'server',
    // );
    // const clientPromise = createCompilationPromise(
    //   'client',
    //   clientCompiler,
    //   clientConfig,
    // );
    // const serverPromise = createCompilationPromise(
    //   'server',
    //   serverCompiler,
    //   serverConfig,
    // );
    //
    // // https://github.com/webpack/webpack-dev-middleware
    // server.use(
    //   webpackDevMiddleware(clientCompiler, {
    //     publicPath: clientConfig.output.publicPath,
    //     logLevel: 'silent',
    //     watchOptions,
    //   }),
    // );
    //
    // // https://github.com/glenjamin/webpack-hot-middleware
    // server.use(webpackHotMiddleware(clientCompiler, { log: false }));
    //
    // let appPromise;
    // let appPromiseResolve;
    // let appPromiseIsResolved = true;
    // serverCompiler.hooks.compile.tap('server', () => {
    //   if (!appPromiseIsResolved) return;
    //   appPromiseIsResolved = false;
    //   // eslint-disable-next-line no-return-assign
    //   appPromise = new Promise(resolve => (appPromiseResolve = resolve));
    // });
    //
    // let app;
    // server.use((req, res) => {
    //   appPromise
    //     .then(() => app.handle(req, res))
    //     .catch(error => console.error(error));
    // });
    //
    // function checkForUpdate(fromUpdate) {
    //   const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
    //   if (!app.hot) {
    //     throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
    //   }
    //   if (app.hot.status() !== 'idle') {
    //     return Promise.resolve();
    //   }
    //   return app.hot
    //     .check(true)
    //     .then(updatedModules => {
    //       if (!updatedModules) {
    //         if (fromUpdate) {
    //           console.info(`${hmrPrefix}Update applied.`);
    //         }
    //         return;
    //       }
    //       if (updatedModules.length === 0) {
    //         console.info(`${hmrPrefix}Nothing hot updated.`);
    //       } else {
    //         console.info(`${hmrPrefix}Updated modules:`);
    //         updatedModules.forEach(moduleId =>
    //           console.info(`${hmrPrefix} - ${moduleId}`),
    //         );
    //         checkForUpdate(true);
    //       }
    //     })
    //     .catch(error => {
    //       if (['abort', 'fail'].includes(app.hot.status())) {
    //         console.warn(`${hmrPrefix}Cannot apply update.`);
    //         ete require.cache[require.resolve('../build/server')];
    //         // eslint-disable-next-line global-require, import/no-unresolved
    //         app = require('../build/server').default;
    //         console.warn(`${hmrPrefix}App has been reloaded.`);
    //       } else {
    //         console.warn(
    //           `${hmrPrefix}Update failed: ${error.stack || error.message}`,
    //         );
    //       }
    //     });
    // }
    //
    // serverCompiler.watch(watchOptions, (error, stats) => {
    //   if (app && !error && !stats.hasErrors()) {
    //     checkForUpdate().then(() => {
    //       appPromiseIsResolved = true;
    //       appPromiseResolve();
    //     });
    //   }
    // });
    //
    // // Wait until both client-side and server-side bundles are ready
    // await clientPromise;
    // await serverPromise;
    //
    // const timeStart = new Date();
    // console.info(`[${format(timeStart)}] Launching server...`);
    //
    // // Load compiled src/server.js as a middleware
    // // eslint-disable-next-line global-require, import/no-unresolved
    // app = require('../build/server').default;
    // appPromiseIsResolved = true;
    // appPromiseResolve();
    //
    // // Launch the development server with Browsersync and HMR
    // await new Promise((resolve, reject) =>
    //   browserSync.create().init(
    //     {
    //       // https://www.browsersync.io/docs/options
    //       server: 'src/server.js',
    //       middleware: [server],
    //       open: !process.argv.includes('--silent'),
    //       ...(isDebug ? {} : { notify: false, ui: false }),
    //     },
    //     (error, bs) => (error ? reject(error) : resolve(bs)),
    //   ),
    // );
    //
    // const timeEnd = new Date();
    // const time = timeEnd.getTime() - timeStart.getTime();
    // console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
    // return server;
  }

  async start2() {
    DEBUG && console.log('Runner.start');
    const webpackConfig = this.webpackConfig;
    const [config] = webpackConfig;
    await this.clean();
    await this.prebuild();
    await this.copy();
    await new Promise((resolve) => {
      // Hot Module Replacement (HMR) + React Hot Reload
      // console.log('config', config);
      if (this.debug) {
        // console.log('config.entry', config.entry);
        config.entry = ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true']
          .concat(config.entry);
        config.output.filename = config.output.filename.replace('[chunkhash', '[hash');
        config.output.chunkFilename = config.output.chunkFilename.replace('[chunkhash', '[hash');
        config.module.rules.find(x => x.use.loader === 'babel-loader')
          .use.options.plugins.unshift('react-hot-loader/babel');
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
        config.plugins.push(new webpack.NamedModulesPlugin());
      }
      this.traceWebpackConfig();

      const bundler = webpack(webpackConfig);
      const wpMiddleware = webpackMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: config.stats,
      });
      const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

      let handleBundleComplete = async () => {
        try {
          const server = await this.runServer();
          const bs = Browsersync.create();
          bs.init({
            ...(this.debug ? {} : { notify: false, ui: false }),
            // ghostMode: {
            //   clicks: true,
            //   forms: true,
            //   scroll: false,
            // },
            ghostMode: false,
            codeSync: false,
            proxy: {
              target: server.host,
              middleware: [
                wpMiddleware,
                hotMiddleware,
              ],
              proxyOptions: {
                xfwd: true,
              },
            },
          }, resolve);
          handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && this.runServer();
        } catch (err) {
          console.log('Runner.start server error', err);
        }
      };

      bundler.plugin('done', stats => handleBundleComplete(stats));
    });
  }

  server = null
  runServer2() {
    DEBUG && console.log('Runner.runServer');
    const RUNNING_REGEXP = /.*🎃.*\/\/(.*?)\//;

    const { output } = this.webpackConfig.find(x => x.target === 'node');
    const serverPath = path.join(output.path, output.filename);

    process.on('exit', () => {
      // console.log('');
      if (this.server) {
        this.server.kill('SIGTERM');
      }
    });
    return new Promise((resolve, reject) => {
      let pending = true;

      const onStdOut = (data) => {
        // const time = new Date().toTimeString();
        const match = data.toString('utf8').match(RUNNING_REGEXP);

        //  process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
        process.stdout.write(data);

        if (match) {
          this.server.host = match[1];
          this.server.stdout.removeListener('data', onStdOut);
          this.server.stdout.on('data', x => process.stdout.write(x));
          pending = false;
          resolve(this.server);
        }
      };

      if (this.server) {
        this.server.kill('SIGTERM');
      }

      this.server = cp.spawn('node', [serverPath], {
        env: Object.assign({ NODE_ENV: 'development' }, process.env),
        silent: false,
      });

      if (pending) {
        this.server.once('exit', (code, signal) => {
          if (pending) {
            reject(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
            //  throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
          }
        });
      }

      this.server.stdout.on('data', onStdOut);
      this.server.stderr.on('data', x => process.stderr.write(x));

      return this.server;
    });
  }

  async render2(routes) {
    DEBUG && console.log('render', routes);
    if (!routes) {
      routes = [
        '/',
      ];
    }
    const server = await this.runServer();


    await Promise.all(routes.map(async (route, index) => {
      const url = `http://${server.host}${route}`;
      const fileName = route.endsWith('/') ? 'index.html' : `${path.basename(route, '.html')}.html`;
      const dirName = path.join(`${this.getDistDir()}/public`, route.endsWith('/') ? route : path.dirname(route));
      const dist = `${dirName}${fileName}`;
      const timeStart = new Date();
      const response = await fetch(url);
      const timeEnd = new Date();
      const text = await response.text();
      await makeDir(dirName);
      await writeFile(dist, text);
      const time = timeEnd.getTime() - timeStart.getTime();
      console.log(`#${index + 1} ${dist} => ${response.status} ${response.statusText} (${time} ms)`);
    }));

    server.kill('SIGTERM');
  }
}
