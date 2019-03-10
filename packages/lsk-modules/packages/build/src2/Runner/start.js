/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import isFunction from 'lodash/isFunction';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
// import webpackConfig from './webpack.config';
import { format } from './run';
// import run, { format } from './run';
// import clean from './clean';

const DEBUG = true;
const debug = (...args) => { DEBUG && console.log(...args); };
const trace = (...args) => { console.info(...args); };
const isDebug = !process.argv.includes('--release');

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions = {
  // Watching may not work with NFS and machines in VirtualBox
  // Uncomment next line if it is your case (use true or interval in milliseconds)
  // poll: true,
  // Decrease CPU or memory usage in some file systems
  // ignored: /node_modules/,
};

function createCompilationPromise(name, compiler, config) {
  return new Promise((resolve, reject) => {
    let timeStart = new Date();
    compiler.hooks.compile.tap(name, () => {
      timeStart = new Date();
      trace(`[${format(timeStart)}] Compiling '${name}'...`);
    });

    compiler.hooks.done.tap(name, (stats) => {
      trace('STATS');
      trace(stats.toString(config.stats));
      trace('//////STATS');
      const timeEnd = new Date();
      const time = timeEnd.getTime() - timeStart.getTime();
      if (stats.hasErrors()) {
        console.error(`[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`);
        reject(new Error('Compilation failed!'));
      } else {
        trace(`[${format(timeEnd)}] Finished '${name}' compilation after ${time} ms`);
        resolve(stats);
      }
    });
  });
}


/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  if (this.server) return this.server;
  await this.run(this.clean);
  await this.traceWebpackConfig();

  this.server = express();
  this.server.use(errorOverlayMiddleware());
  this.server.use(express.static(path.resolve(__dirname, this.resolveDist('../public'))));
  // Configure client-side hot module replacement
  const clientConfig = this.webpackConfig.find(config => config.name === 'client');
  // clientConfig.entry.client = [__dirname + '/tools/lib/webpackHotDevClient.js']
  clientConfig.entry.client = ['../node_modules/@lskjs/build/webpackHotDevClient.js']
    .concat(clientConfig.entry.client)
    .sort((a, b) => b.includes('polyfill') - a.includes('polyfill'));
  clientConfig.output.filename = clientConfig.output.filename.replace(
    'chunkhash',
    'hash',
  );
  clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace(
    'chunkhash',
    'hash',
  );
  clientConfig.module.rules = clientConfig.module.rules.filter(x => x.loader !== 'null-loader');
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Configure server-side hot module replacement
  const serverConfig = this.webpackConfig.find(config => config.name === 'server');
  serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  serverConfig.output.hotUpdateChunkFilename =
    'updates/[id].[hash].hot-update.js';
  serverConfig.module.rules = serverConfig.module.rules.filter(x => x.loader !== 'null-loader');
  serverConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Configure compilation
  const multiCompiler = webpack(this.webpackConfig);
  const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');
  const serverCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'server');
  const clientPromise = createCompilationPromise(
    'client',
    clientCompiler,
    clientConfig,
  );
  const serverPromise = createCompilationPromise(
    'server',
    serverCompiler,
    serverConfig,
  );

  // https://github.com/webpack/webpack-dev-middleware
  this.server.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    // logLevel: 'silent',
    watchOptions,
  }));

  // https://github.com/glenjamin/webpack-hot-middleware
  this.server.use(webpackHotMiddleware(clientCompiler, { log: false }));

  let appPromise;
  let appPromiseResolve;
  let appPromiseIsResolved = true;
  serverCompiler.hooks.compile.tap('server', () => {
    if (!appPromiseIsResolved) return;
    appPromiseIsResolved = false;
    // eslint-disable-next-line no-return-assign
    appPromise = new Promise(resolve => (appPromiseResolve = resolve));
  });

  let app;
  this.server.use((req, res) => {
    // console.log('appPromise before');
    appPromise
      .then(() => {
        if (!app) {
          console.error('!app');
          return;
        }
        if (!app.express || !isFunction(app.express.handle)) {
          console.error('!app.express.handle');
          return;
        }
        return app.express.handle(req, res);
      })
      .catch(error => console.error(error));
  });
  const runner = this;

  function checkForUpdate(fromUpdate) {
    debug('Runner.checkForUpdate');
    const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
    if (!app.hot) {
      throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
    }
    if (app.hot.status() !== 'idle') {
      return Promise.resolve();
    }
    return app.hot
      .check(true)
      .then(async (updatedModules) => {
        debug('Runner.checkForUpdate', 'app.hot.check', fromUpdate, updatedModules);
        if (isFunction(app.restart)) {
          try {
            await app.restart();
            debug('app.restarted');
          } catch (err) {
            debug('app.restar err', err);
          }
        }

        if (!updatedModules) {
          if (fromUpdate) {
            trace(`${hmrPrefix}Update applied.`);
          }
          return;
        }
        if (updatedModules.length === 0) {
          trace(`${hmrPrefix}Nothing hot updated.`);
        } else {
          trace(`${hmrPrefix}Updated modules:`);
          updatedModules.forEach(moduleId =>
            trace(`${hmrPrefix} - ${moduleId}`));
          checkForUpdate(true);
        }
      })
      .catch(async (error) => {
        debug('Runner.checkForUpdate', 'app.hot.check CATCH', app.hot.status(), error);
        if (['abort', 'fail'].includes(app.hot.status())) {
          console.warn(`${hmrPrefix}Cannot apply update.`);
          if (isFunction(app.stop)) {
            try {
              await app.stop();
              debug('app.stoped');
            } catch (err) {
              debug('app.stop err', err);
            }
          }
          debug('delete require.cache');
          delete require.cache[require.resolve(runner.resolveDist('build/server'))];
          debug('app = require');
          // console.log(123123123123);
          // eslint-disable-next-line global-require, import/no-unresolved
          app = require(runner.resolveDist('build/server')).default;
          console.warn(`${hmrPrefix}App has been reloaded.`);
        } else {
          console.warn(`${hmrPrefix}Update failed: ${error.stack || error.message}`);
        }
      });
  }

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (app && !error && !stats.hasErrors()) {
      checkForUpdate().then(() => {
        appPromiseIsResolved = true;
        appPromiseResolve();
      });
    }
  });

  // Wait until both client-side and server-side bundles are ready
  await clientPromise;
  await serverPromise;

  const timeStart = new Date();
  trace(`[${format(timeStart)}] Launching server...`);

  // Load compiled src/server.js as a middleware
  // eslint-disable-next-line global-require, import/no-unresolved
  // console.log(this.resolveDist('build/server'));
  app = require(this.resolveDist('build/server')).default;
  // console.log({app});
  appPromiseIsResolved = true;
  appPromiseResolve();

  // Launch the development server with Browsersync and HMR
  await new Promise((resolve, reject) =>
    browserSync.create().init(
      {
        // https://www.browsersync.io/docs/options
        server: 'src/server.js',
        middleware: [this.server],
        open: false,
        // open: !process.argv.includes('--silent'),
        ...(isDebug ? {} : { notify: false, ui: false }),
        ghostMode: false,
        codeSync: false,
      },
      (error, bs) => (error ? reject(error) : resolve(bs)),
    ));

  const timeEnd = new Date();
  const time = timeEnd.getTime() - timeStart.getTime();
  trace(`[${format(timeEnd)}] Server launched after ${time} ms`);
  return this.server;
}

export default start;
