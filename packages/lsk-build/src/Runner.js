import _ from 'lodash';
import path from 'path';
import del from 'del';
import fetch from 'node-fetch';
import Promise from 'bluebird';
import Browsersync from 'browser-sync';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import cp from 'child_process';
import fs from 'fs';
import { writeFile, makeDir } from './utils/fs';
import stringify from 'serialize-javascript';

// verbose webpack config
// require('fs').writeFileSync('_webpack.config.json', JSON.stringify(webpackConfig, null, 2))
const DEBUG = false;

export default class Runner {

  constructor(ctx = {}) {
    Object.assign(this, ctx);
  }

  resolvePath(...args) {
    if (this.dirname) return path.resolve(this.dirname, ...args);
    return path.resolve(...args);
  }

  resolveNpmPath(p, resNpm = 0) {
    if (p[0] === '~') {
      return `${this.dirname}/src${p.substr(1)}`;
    }
    if (!resNpm) return p;
    return `${this.dirname}/node_modules/${p}/src`;
  }

  getDistDir() {
    return this.distDir || 'build';
  }

  async clean() {
    await del([`${this.getDistDir()}/*`], { dot: true });
    await makeDir(`${this.getDistDir()}/public`);
  }

  async prebuild() {
    if (!this.modules) return;
    DEBUG && console.log('prebuild');

    const outputDir = this.resolvePath(this.resolveNpmPath(this.modules.output));
    // console.log({ outputDir });
    ['server', 'client', 'uapp'].forEach((type) => {
      const filename = this.resolvePath(outputDir, `${type}.js`);
      // console.log({ filename });
      const content = `\
export default function () {
  return {
${_.map(this.modules.modules, (val, key) => {
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


  async copy({ watch } = {}) {
    await writeFile(this.resolvePath(`${this.getDistDir()}/package.json`), JSON.stringify({
      private: true,
      engines: this.pkg.engines,
      dependencies: this.pkg.dependencies,
      scripts: {
        start: 'node server.js',
      },
    }, null, 2));
  }


  async build() {
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

  bundle() {
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

  async start() {
    DEBUG && console.log('Runner.start');
    const webpackConfig = this.webpackConfig;
    const [config] = webpackConfig;
    await this.clean();
    await this.prebuild();
    await this.copy();
    await new Promise((resolve) => {
      // Hot Module Replacement (HMR) + React Hot Reload
      // console.log('config', config);
      if (config.debug) {
        // console.log('config.entry', config.entry);
        config.entry = ['react-hot-loader/patch', 'webpack-hot-middleware/client']
          .concat(config.entry);
        config.output.filename = config.output.filename.replace('[chunkhash', '[hash');
        config.output.chunkFilename = config.output.chunkFilename.replace('[chunkhash', '[hash');
        config.module.loaders.find(x => x.loader === 'babel-loader')
          .query.plugins.unshift('react-hot-loader/babel');
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(new webpack.NoErrorsPlugin());
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
            ...(config.debug ? {} : { notify: false, ui: false }),
            proxy: {
              target: server.host,
              middleware: [wpMiddleware, hotMiddleware],
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
  runServer() {
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

  async render(routes) {

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
