import extend from 'extend';
import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const StatsPlugin = require('stats-webpack-plugin');
import stringify from 'serialize-javascript';

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;



export default class WebpackConfig {
  name = 'webpack';

  constructor(ctx = {}) {
    Object.assign(this, ctx);
  }

  static getConfig(ctx, ...args) {
    const object = new this(ctx);
    return object.getConfig(...args);
  }

  resolvePath(...args) {
    if (this.dirname) return path.resolve(this.dirname, ...args);
    return path.resolve(...args);
  }

  getEnv() {
    return this.env || 'development';
  }

  getStage() {
    return this.stage || 'development';
  }

  isDebug() {
    if (this.debug == null) return true;
    return !!this.debug;
  }

  isSourcemap() {
    if (this.sourcemap == null) return this.isDebug();
    return !!this.sourcemap;
  }

  isCssSourcemap() {
    if (this.cssSourcemap == null) return false;
    return !!this.cssSourcemap;
  }

  isVerbose() {
    return !!this.verbose;
  }

  getGlobals() {
    // console.log({'process.env.NODE_ENV': JSON.stringify(this.getEnv()),});
    return {
      'process.env.NODE_ENV': JSON.stringify(this.getEnv()),
      __ENV__: JSON.stringify(this.getEnv()),
      __DEV__: this.getEnv() === 'development',
      __PROD__: this.getEnv() === 'production',
      __STAGE__: JSON.stringify(this.getStage()),
    };
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
    ];
  }

  getDeps() {
    const deps = (this.deps || []).map(dep => ({
      ...dep,
      path: fs.realpathSync(dep.path),
    }));
    if (!this.modules || !this.modules.modules) return deps;
    const modules = this.modules.modules;
    const modulesDeps = Object
    .keys(modules)
    .filter(dep => modules[dep][0] !== '~')
    .map((dep) => {
      return {
        name: modules[dep],
        path: fs.realpathSync(`${this.dirname}/node_modules/${modules[dep]}/src`),
        alias: modules[dep],
      };
    });
    return [...deps, ...modulesDeps];
  }

  getBabelPresets() {
    return [
      '@babel/preset-env',
      '@babel/preset-stage-0',
      '@babel/preset-react',
      // ['@babel/preset-env', {
      //   modules: false,
      //   loose: true,
      //   useBuiltIns: 'entry',
      //   targets: {
      //     forceAllTransforms: true,
      //   },
      // }],
    ];
  }

  getBabelPlugins() {
    // console.log(2312312312312);
    return [
      'module:jsx-control-statements',
      '@babel/plugin-proposal-decorators',
      ['@babel/plugin-proposal-class-properties', { loose: true, }]
      // 'react-require',
      // 'transform-decorators-legacy',
      // 'transform-class-properties'
    ];
  }

  getJsxLoader() {
    return {
      test: /\.(jsx|js)?$/,
      include: [
        ...this.getDeps().map(dep => dep.path),
        this.resolvePath('src'),
      ],
      // exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        // https://github.com/babel/babel-loader#options

        // https://babeljs.io/docs/usage/options/
        options: {
          //sourceMaps: this.isSourcemap(),
          cacheDirectory: this.isDebug(),
          babelrc: false,
          presets: this.getBabelPresets(),
          plugins: [
            ...this.getBabelPlugins(),
            ['@babel/plugin-transform-runtime', {
              polyfill: false
            }],
            ...(this.isDebug() ? [] : [
              'transform-react-remove-prop-types',
              '@babel/plugin-transform-react-constant-elements',
              // 'transform-react-inline-elements',
            ]),
          ],
        }
      },
    };
  }
  getCssLoaders() {
    const getPostcssModule = (bundle) => this.getPostcssModule(bundle);
    // return [
    //   [0,0],
    //   [0,1],
    //   [1,0],
    //   [1,1],
    // ].map(([isModules, isScss]) => {
    //   return   {
    //     test: /\.css$/,
    //     exclude: /\.g(lobal)?\.css$/,
    //     loader: ExtractTextPlugin.extract({
    //       fallback: 'style-loader',
    //       use: [
    //         // 'isomorphic-style-loader',
    //         {
    //           loader: 'css-loader',
    //           options: {
    //             sourceMap: this.isSourcemap(),
    //             modules: true,
    //             localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
    //             minimize: !this.isDebug(),
    //           }
    //         }, {
    //           loader: 'postcss-loader',
    //           options: {
    //             plugins: getPostcssModule
    //           }
    //         }
    //       ],
    //     })
    //   }
    // })

    return [
      {
        test: /\.g(lobal)?\.css$/,
        loader: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: this.isCssSourcemap(),
                modules: false,
                minimize: !this.isDebug(),
              }
            }, {
              loader: 'postcss-loader',
              options: {
                // pack: 'default',
                plugins: getPostcssModule
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /\.g(lobal)?\.css$/,
        loader: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [
            // 'isomorphic-style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: this.isSourcemap(),
                modules: true,
                localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
                minimize: !this.isDebug(),
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: getPostcssModule
              }
            }
          ],
        })
      },
      {
        test: /\.g(lobal)?\.scss$/,
        loader: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: this.isCssSourcemap(),
                modules: false,
                minimize: !this.isDebug(),
              }
            }, {
              loader: 'postcss-loader',
              options: {
                // pack: 'sass',
                plugins: getPostcssModule
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: /\.g(lobal)?\.scss$/,
        loader: ExtractTextPlugin.extract({
          // fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: this.isCssSourcemap(),
                modules: true,
                localIdentName: this.isDebug() ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
                minimize: !this.isDebug(),
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // pack: 'sass',
                plugins: getPostcssModule
              }
            },
            'sass-loader',
          ]
        })
      },
    ];
  }
  getPostcssModule(bundler) {
    return [
      require('autoprefixer')({ browsers: this.getAutoprefixerBrowsers() }),
      require('postcss-import')({
        addDependencyTo: bundler,
        path: [
          this.resolvePath('src'),
          ...this.getDeps().map(dep => dep.path),
          this.resolvePath('node_modules'),
        ],
        trigger: '&',
        resolve: require('./resolve-id'),
      }),
      require('postcss-mixins')(),
      // require('postcss-custom-properties')(),
      require('postcss-simple-vars')(), // / !
      // require('postcss-custom-media')(),
      // require('postcss-media-minmax')(),
      // require('postcss-custom-selectors')(),
      // require('postcss-calc')(),
      // require('postcss-nesting')(),
      require('postcss-color-function')(),
      // require('pleeease-filters')(),
      // require('pixrem')(),
      // require('postcss-selector-matches')(),
      // require('postcss-selector-not')(),
      // require('postcss-animation')(), // / !
      // require('rucksack-css')(), // / !
      // require('lost')(), // / !
      require('postcss-nested')(), // / !
    ];
  }
  getLoaders() {
    return [
      this.getJsxLoader(),
      ...this.getCssLoaders(),
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?.+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
            limit: 8192,
          },
        },
      },
      {
        test: /\.(woff(2)?)(\?.+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
            mimetype: 'application/font-woff',
            limit: 8192,
          },
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)(\?.+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          },
        },
      },
      // {
      //   exclude: [reScript, reStyle, reImage, /\.json$/, /\.txt$/, /\.md$/],
      //   loader: 'file-loader',
      //   options: {
      //     name: this.isDebug() ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
      //   },
      // },
    ];
  }

  getModule() {
    return {
      // Make missing exports an error instead of warning
      strictExportPresence: true,
      rules: this.getLoaders(),
    };
  }

  getPlugins() {
    return [
      // Define free variables
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new webpack.LoaderOptionsPlugin({
        // debug: this.isDebug(),
      }),
      new webpack.DefinePlugin(this.getGlobals()),
      new ExtractTextPlugin(this.isDebug() ? '[name].css?[chunkhash]' : '[name].[chunkhash].css'),
      ...!this.webpackStats ? [] : [new StatsPlugin(`webpack.${this.getTarget() === 'node' ? 'server' : 'client'}.stats.json`, this.webpackStats)],
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
      }),
    ];
  }

  getResolve() {
    return {
      /* root: this.resolvePath('src'),
      modulesDirectories: ['node_modules'],*/
      alias: this.getResolveAlias(),
      extensions: this.getResolveExtensions(),
      modules: [
        this.resolvePath('src'),
        "node_modules",
      ]
    };
  }

  getResolveExtensions() {
    return ['.webpack.js', '.web.js', '.js', '.jsx', '.json'];
  }

  getResolveAlias() {
    const alias = {
      '~': this.resolvePath('src'),
    };
    this.getDeps().forEach((dep) => {
      if (dep.alias) {
        alias[dep.alias] = dep.path;
      }
    });

    return Object.assign(alias, this.alias || {});
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
      modules: false,
    };
  }

  getEntryPrefix() {
    return [];
    // return ['babel-polyfill'];
  }

  getEntry() {
    return 'index.js';
  }

  getFullEntry() {
    const entry = this.getEntry();
    return Array.isArray(entry) ? [...this.getEntryPrefix(), ...entry] : [...this.getEntryPrefix(), entry];
  }

  getOutput() {
    return {
      // path: this.resolvePath('build/public/assets'),
      // publicPath: '/assets/',
      // sourcePrefix: '  ',
      path: this.resolvePath('build/public/assets'),
      publicPath: '/assets/',
      pathinfo: this.isVerbose(),
      // filename: this.isDebug() ? '[name].js' : '[name].[chunkhash:8].js',
      // chunkFilename: this.isDebug()
      //   ? '[name].chunk.js'
      //   : '[name].[chunkhash:8].chunk.js',
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    };
  }

  getPreConfig() {
    return {
      name: this.name,
      mode: this.isDebug() ? 'development' : 'production',
      // debug: this.isDebug(),
      context: this.resolvePath('src'),
      target: this.getTarget(),
      entry: this.getFullEntry(),
      resolve: this.getResolve(),
      output: this.getOutput(),
      module: this.getModule(),
      plugins: this.getPlugins(),
      cache: this.isDebug(),
      bail: !this.isDebug(),
      stats: this.getStats(),
      // postcss: (...args) => this.getPostcssModule(...args),
    };
  }

  getConfig(withoutMerge) {
    const config = this.getPreConfig();
    if (!this.webpack || withoutMerge) return config;
    // return Object.extend({}, config, this.webpack)
    return extend(true, config, this.webpack);
  }



  traceWebpackConfig() {
    if (this.webpackConfigDist === false) return;
    const webpackConfigDist = this.webpackConfigDist || `${this.getDistDir()}/webpack.config.js`;
    try {
      fs.writeFileSync(webpackConfigDist, stringify(this.webpackConfig, 2));
      console.log('Compiling webpack.config.js => ', webpackConfigDist);
    } catch (err) { }
  }

  static save(filename, obj) {
    try {
      fs.writeFileSync(filename, stringify(obj, 2));
    } catch (err) { }
  }

  save(filename) {
    return this.constructor.save(filename, this.getConfig());
  }

}
