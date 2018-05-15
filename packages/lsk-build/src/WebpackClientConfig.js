import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
const OptimizeJsPlugin = require('optimize-js-plugin');
// var CompressionPlugin = require("compression-webpack-plugin");
import WebpackConfig from './WebpackConfig';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default class WebpackClientConfig extends WebpackConfig {
  name = 'client';
  getTarget() {
    return 'web';
  }

  getEntry() {
    return './client.js';
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
      // cheap-module-source-map
      // devtool: this.isSourcemap() ? 'source-map' : false,
      // devtool: this.isSourcemap() ? 'cheap-module-source-map' : false,
      // devtool: isDebug ? 'cheap-module-inline-source-map' : 'source-map',
      devtool: this.isSourcemap() ? 'eval' : false,
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

      // Assign the module and chunk ids by occurrence count
      // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
      // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      new webpack.optimize.OccurrenceOrderPlugin(true),

      ...this.isDebug() ? [] : [

        new UglifyJsPlugin({
          parallel: true,
          uglifyOptions: {
            ie8: true,
            compress: {
              warnings: this.isVerbose(),
              unused: true,
              dead_code: true,
            }
          }
        }),
        new OptimizeJsPlugin({
          sourceMap: false,
        }),
        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })
        // A plugin for a more aggressive chunk merging strategy
        // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        new webpack.optimize.AggressiveMergingPlugin(),
      ],
    ];
  }
}
