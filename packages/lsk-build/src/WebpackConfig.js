import extend from 'extend';
import path from 'path';
import webpack from 'webpack';

export default class WebpackConfig {

  constructor(ctx = {}) {
    Object.assign(this, ctx)
  }

  resolvePath(...args) {
    if (this.dirname) return path.resolve(this.dirname, ...args)
    return path.resolve(...args)
  }

  getEnv() {
    return this.env || 'development'
  }

  isDebug() {
    if (this.debug == null) return true
    return !!this.debug
  }

  isVerbose() {
    return !!this.verbose
  }

  getGlobals() {
    return {
      'process.env.NODE_ENV': JSON.stringify(this.getEnv()),
      __ENV__: JSON.stringify(this.getEnv()),
      __DEV__: this.getEnv() === 'development',
      __PROD__: this.getEnv() === 'production',
    }
  }

  getAutoprefixerBrowsers() {
    return [
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 35',
      'Firefox >= 31',
      'Explorer >= 9',
      'iOS >= 7',
      'Opera >= 12',
      'Safari >= 7.1',
    ]
  }

  getDeps() {
    return this.deps || []
  }

  getPostcssModule(bundler) {
    return {
      default: [
        require('postcss-import')({
          addDependencyTo: bundler,
          path: [
            this.resolvePath('src'),
            ...this.getDeps().map(dep => dep.path),
            this.resolvePath('node_modules'),
          ],
          trigger: '&',
          resolve: require('./utils/resolve-id'),
        }),
        require('postcss-mixins')(),
        require('postcss-custom-properties')(),
        require('postcss-simple-vars')(), /// !
        require('postcss-custom-media')(),
        require('postcss-media-minmax')(),
        require('postcss-custom-selectors')(),
        require('postcss-calc')(),
        // require('postcss-nesting')(),
        require('postcss-color-function')(),
        require('pleeease-filters')(),
        require('pixrem')(),
        require('postcss-selector-matches')(),
        require('postcss-selector-not')(),
        require('postcss-animation')(), /// !
        require('rucksack-css')(), /// !
        require('lost')(), /// !
        require('postcss-nested')(), /// !
        require('autoprefixer')({ browsers: this.getAutoprefixerBrowsers() }),
      ],
      sass: [
        require('autoprefixer')({ browsers: this.getAutoprefixerBrowsers() }),
      ],
    };
  }

  getBabelPresets() {
    return [
      'react',
      'es2015',
      'stage-0',
    ]
  }

  getBabelPlugins() {
    return [
      'jsx-control-statements',
      'react-require',
      'transform-decorators-legacy',
    ]
  }

  getJsxLoader() {
    return {
      test: /\.(jsx|js)?$/,
      loader: 'babel-loader',
      include: [
        ...this.getDeps().map(dep => dep.path),
        this.resolvePath('src'),
      ],
      // exclude: /node_modules/,
      query: {
        // https://github.com/babel/babel-loader#options
        cacheDirectory: this.isDebug(),

        // https://babeljs.io/docs/usage/options/
        babelrc: false,
        presets: this.getBabelPresets(),
        plugins: [
          ...this.getBabelPlugins(),
          'transform-runtime',
          ... (this.isDebug() ? [] : [
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            // 'transform-react-inline-elements',
          ]),
        ],
      },
    }
  }
  getCssLoaders() {
    return [
      {
        test: /\.global\.css$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            // CSS Modules https://github.com/css-modules/css-modules
            modules: false,
            // localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !this.isDebug(),
          })}`,
          // 'postcss-loader?pack=default',
        ],
      },
      {
        test: /\.css$/,
        exclude: /(global.css)/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=default',
        ],
      },
      {
        test: /\.(_pcss)/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            // CSS Modules https://github.com/css-modules/css-modules
            modules: false,
            // localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=default',
        ],
      },
      // {
      //   test: /\.scss$/,
      //   loaders: [
      //     'isomorphic-style-loader',
      //     `css-loader?${JSON.stringify({ sourceMap: this.isDebug(), minimize: !this.isDebug() })}`,
      //     'postcss-loader?pack=sass',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=sass',
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            // CSS Modules https://github.com/css-modules/css-modules
            modules: true,
            localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            // CSS Nano http://cssnano.co/options/
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=sass',
          'stylus',
        ],
      },
    ]
  }
  getLoaders() {
    return [
      this.getJsxLoader(),
      ...this.getCssLoaders(),
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)(\?.+)?$/,
        loader: 'url-loader',
        query: {
          name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)(\?.+)?$/,
        loader: 'file-loader',
        query: {
          name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
    ]
  }

  getModule() {
    return {
      loaders: this.getLoaders(),
    }
  }

  getPlugins() {
    return [
      // Define free variables
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new webpack.DefinePlugin(this.getGlobals()),
    ]
  }

  getResolve() {
    return {
      root: this.resolvePath('src'),
      alias: this.getResolveAlias(),
      modulesDirectories: ['node_modules'],
      extensions: this.getResolveExtensions(),
    }
  }

  getResolveExtensions() {
    return ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json']
  }

  getResolveAlias() {
    const alias = {
      '~': this.resolvePath('src'),
    }
    this.getDeps().forEach(dep => {
      if (dep.alias) {
        alias[dep.alias] = dep.path
      }
    })

    return Object.assign(alias, this.alias || {})
  }

  getStats() {
    return {
      colors: true,
      reasons: this.isDebug(),
      hash: this.isVerbose(),
      version: this.isVerbose(),
      timings: true,
      chunks: this.isVerbose(),
      chunkModules: this.isVerbose(),
      cached: this.isVerbose(),
      cachedAssets: this.isVerbose(),
    }
  }

  getEntry() {
    return 'index.js'
  }

  getOutput() {
    return {
      path: this.resolvePath('build/public/assets'),
      publicPath: '/assets/',
      sourcePrefix: '  ',
    }
  }

  getPreConfig() {
    return {
      context: this.resolvePath('src'),
      target: this.getTarget(),
      entry: this.getEntry(),
      resolve: this.getResolve(),
      output: this.getOutput(),
      module: this.getModule(),
      plugins: this.getPlugins(),
      cache: this.isDebug(),
      debug: this.isDebug(),
      stats: this.getStats(),
      postcss: (...args) => this.getPostcssModule(...args),
    }
  }

  getConfig(withoutMerge) {
    const config = this.getPreConfig()
    if (!this.webpack || withoutMerge) return config
    // return Object.extend({}, config, this.webpack)
    return extend(true, config, this.webpack)
  }

}
