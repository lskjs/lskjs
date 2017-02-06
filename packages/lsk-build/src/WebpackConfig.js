import extend from 'extend';
import path from 'path';
import webpack from 'webpack';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
    // console.log({'process.env.NODE_ENV': JSON.stringify(this.getEnv()),});
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

    const dimensions = [
      [
        {
          preExt: 'i?',
          loaders: [
            'isomorphic-style-loader',
          ]
        },
        {
          preExt: 'f',
          loaders: [
            ExtractTextPlugin.extract(
              'style-loader',
            ),
          ]
        },
      ],
      [
        {
          preExt: 'm?',
          loaders: [
            `css-loader?${JSON.stringify({
              sourceMap: this.isDebug(),
              modules: true,
              localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
              minimize: !this.isDebug(),
            })}`,
          ]
        },
        {
          preExt: 'g',
          loaders: [
            `css-loader?${JSON.stringify({
              sourceMap: this.isDebug(),
              modules: false,
              minimize: !this.isDebug(),
            })}`,
          ]
        },
      ],
      [
        {
          ext: 'p?css',
          // name: '\\.css',
          loaders: [
            'postcss-loader?pack=default',
          ]
        },
        {
          ext: '(sass|scss)',
          loaders: [
            'postcss-loader?pack=sass',
            'sass-loader',
          ]
        },
      ]
    ]
    function getVectors(dimensions) {
      let results = []
      for(var i = 0; i < dimensions[0]; i++) {
        if (dimensions.length <= 1) {
          results = [...results, [i]]
        } else {
          results = [...results, ...getVectors(dimensions.slice(1)).map(d => {
            return [i,...d]
          })]
        }
      }
      return results
    }
    const vectors = getVectors(dimensions.map(d => d.length))
    const testers = vectors.map(vector => {
      const tester = {
        loaders: [],
      }
      let ext = ''
      let preExt = ''
      vector.forEach((v, i) => {
        const subtest = dimensions[i][v]
        ext += subtest.ext || ''
        preExt += subtest.preExt || ''
        tester.loaders = [
          ...tester.loaders,
          ...subtest.loaders,
        ]
      })

      let test = `${preExt ? '\.' + preExt : ''}${ext ? '\.' + ext : ''}`

      tester.test = new RegExp(test)
      return tester
    })


    return [
      // ...testers,
      // {
      //   test: /\.xcss$/,
      //   loaders: [
      //     ExtractTextPlugin.extract(
      //       'style-loader',
      //     ),
      //     `css-loader?${JSON.stringify({
      //       sourceMap: this.isDebug(),
      //       modules: false,
      //       minimize: !this.isDebug(),
      //     })}`,
      //     'postcss-loader?pack=default',
      //   ],
      // },
      {
        test: /\.g(lobal)?\.css$/,
        loaders: [
          ExtractTextPlugin.extract(
            'style-loader',
          ),
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            modules: false,
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=default',
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.g(lobal)?\.css$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            modules: true,
            localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=default',
        ],
      },
      {
        test: /\.g(lobal)?\.scss$/,
        loaders: [
          ExtractTextPlugin.extract(
            'style-loader',
          ),
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            modules: false,
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=sass',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.g(lobal)?\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: this.isDebug(),
            modules: true,
            localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            minimize: !this.isDebug(),
          })}`,
          'postcss-loader?pack=sass',
          'sass-loader',
        ],
      },
    ]
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
      new ExtractTextPlugin(this.isDebug() ? '[name].css?[chunkhash]' : '[name].[chunkhash].css'),
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
