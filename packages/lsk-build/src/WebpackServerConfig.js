import webpack from 'webpack';
import WebpackConfig from './WebpackConfig';

export default class WebpackServerConfig extends WebpackConfig {
  getTarget() {
    return 'node';
  }

  getEntry() {
    return './server.js';
  }

  getGlobals() {
    return {
      ...super.getGlobals(),
      __SERVER__: true,
      __CLIENT__: false,
      __WIDGET__: false,
    };
  }

  getPlugins() {
    return [
      ...super.getPlugins(),

      // Adds a banner to the top of each generated chunk
      // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
      ...(!this.isSourcemap() ? [] : [new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false },
      )]),

      // Do not create separate chunks of the server bundle
      // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ];
  }

  getOutput() {
    return {
      ...super.getOutput(),
      filename: '../../server.js',
      libraryTarget: 'commonjs2',
    };
  }

  getPreConfig() {
    return {
      ...super.getPreConfig(),
      externals: [
        /^\.\/assets$/,
        (context, request, callback) => {
          const depsStr = this.getDeps().map(dep => dep.name).filter(a => a).join('|');
          const isExternal =
            request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
            !request.match(/\.(css|less|scss|sss)$/i) &&
            (!depsStr || !request.match(new RegExp(`^(${depsStr})`)));
          // console.log('==================');
          // console.log(depsStr);
          // console.log(request.match(/^[@a-z][a-z\/\.\-0-9]*$/i), !!request.match(/^[@a-z][a-z\/\.\-0-9]*$/i));
          // console.log(request.match(/\.(css|less|scss|sss)$/i), !request.match(/\.(css|less|scss|sss)$/i));
          // console.log(request.match(new RegExp(`^(${depsStr})`)), !request.match(new RegExp(`^(${depsStr})`)));
          // !Boolean(isExternal) && console.log('!!!!!!!!!!!!ext', request, !request.match(new RegExp(`^(${depsStr})`)), Boolean(isExternal));
          // console.log('==================');
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
    };
  }
}
