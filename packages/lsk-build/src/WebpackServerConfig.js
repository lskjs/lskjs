import webpack from 'webpack';
import WebpackConfig from './WebpackConfig';

export default class WebpackServerConfig extends WebpackConfig {
  getTarget() {
    return 'node'
  }

  getEntry() {
    return './server.js'
  }

  getGlobals() {
    return {
      ...super.getGlobals(),
      __SERVER__: true,
      __CLIENT__: false,
      __BROWSER__: false,
    }
  }

  getPlugins() {
    return [
      ...super.getPlugins(),

      // Adds a banner to the top of each generated chunk
      // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
      new webpack.BannerPlugin('require("source-map-support").install();',
        { raw: true, entryOnly: false }),

      // Do not create separate chunks of the server bundle
      // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ]
  }

  getOutput() {
    return {
      ...super.getOutput(),
      filename: '../../server.js',
      libraryTarget: 'commonjs2',
    }
  }

  getPreConfig() {
    return {
      ...super.getPreConfig(),
      externals: [
        /^\.\/assets$/,
        (context, request, callback) => {
          const isExternal =
            request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
            !request.match(/\.(css|less|scss|sss)$/i) &&
            // 0
            !request.match(/^lego-starter-kit/)// &&
            // !this.getDeps().filter(dep => request.match(new RegExp('^' + dep.name))).length
          callback(null, Boolean(isExternal));
        },

      ],
      node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
      },
      devtool: 'source-map',
    }
  }
}
