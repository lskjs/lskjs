import fs from 'fs';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
const OptimizeJsPlugin = require('optimize-js-plugin');
// var CompressionPlugin = require("compression-webpack-plugin");
import WebpackConfig from './WebpackConfig';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default class WebpackClientConfig extends WebpackConfig {
  name = 'client';
  getTarget() {
    return 'web';
  }

  getEntry() {
    return {
      client: [
        '@babel/polyfill',
        './client.js',
      ],
    };
  }


  getGlobals() {
    return {
      ...super.getGlobals(),
      __SERVER__: false,
      __CLIENT__: true,
      __WIDGET__: false,
    };
  }

  getPreConfig() {
    return {
      ...super.getPreConfig(),
      devtool: this.clientDevtool || 'cheap-module-eval-source-map' || 'cheap-eval-source-map' || 'eval',
    };
  }

  getOutput() {
    return {
      ...super.getOutput(),
      filename: this.isDebug() ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
      chunkFilename: this.isDebug() ? 'module_[name].js?[chunkhash]' : 'module_[name].[chunkhash].js',
    };
  }

  getPlugins() {
    return [
      ...super.getPlugins(),
      // Emit a file with assets paths
      // https://github.com/sporto/assets-webpack-plugin#options
      new AssetsPlugin({
        path: this.resolvePath('build'),
        filename: 'assets.js',
        processOutput: x => `module.exports = ${JSON.stringify(x)};`,
      }),
      new WebpackAssetsManifest({
        output: this.resolvePath('build/asset-manifest.json'),
        publicPath: true,
        writeToDisk: true,
        customize: ({ key, value }) => {
          // You can prevent adding items to the manifest by returning false.
          if (key.toLowerCase().endsWith('.map')) return false;
          return { key, value };
        },
        done: (manifest, stats) => {
          // Write chunk-manifest.json.json
          // const chunkFileName = this.resolvePath('build/asset-manifest.json');
          const chunkFileName = this.resolvePath('build/chunk-manifest.json');
          try {
            const fileFilter = file => !file.endsWith('.map');
            const addPath = file => manifest.getPublicPath(file);
            const chunkFiles = stats.compilation.chunkGroups.reduce((acc, c) => {
              acc[c.name] = [
                ...(acc[c.name] || []),
                ...c.chunks.reduce(
                  (files, cc) => [
                    ...files,
                    ...cc.files.filter(fileFilter).map(addPath),
                  ],
                  [],
                ),
              ];
              return acc;
            }, Object.create(null));
            fs.writeFileSync(chunkFileName, JSON.stringify(chunkFiles, null, 2));
          } catch (err) {
            console.error(`ERROR: Cannot write ${chunkFileName}: `, err);
            if (!isDebug) process.exit(1);
          }
        },
      }),


      // Assign the module and chunk ids by occurrence count
      // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
      // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      // new webpack.optimize.OccurrenceOrderPlugin(true),

      ...this.isDebug() ? [] : [

        // new UglifyJsPlugin({
        //   parallel: true,
        //   uglifyOptions: {
        //     ie8: true,
        //     compress: {
        //       warnings: this.isVerbose(),
        //       unused: true,
        //       dead_code: true,
        //     }
        //   }
        // }),
        // new OptimizeJsPlugin({
        //   sourceMap: false,
        // }),
        //
        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
        // A plugin for a more aggressive chunk merging strategy
        // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        // new webpack.optimize.AggressiveMergingPlugin(),

        new BundleAnalyzerPlugin(),
        // ...(this.isAnalyze() ? [new BundleAnalyzerPlugin()] : []),
      ],
    ];
  }
}
