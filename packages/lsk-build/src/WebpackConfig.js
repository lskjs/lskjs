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
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/postcss/postcss-import
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
        // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
        // https://github.com/postcss/postcss-custom-properties
        require('postcss-mixins')(),
        require('postcss-custom-properties')(),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // W3C calc() function, e.g. div { height: calc(100px - 2em); }
        // https://github.com/postcss/postcss-calc
        require('postcss-calc')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
        // https://github.com/iamvdo/pleeease-filters
        require('pleeease-filters')(),
        // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
        // https://github.com/robwierzbowski/node-pixrem
        require('pixrem')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
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
    return alias
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
