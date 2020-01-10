const path = require('path');
const fs = require('fs');
const glob = require('glob');
const pack = require('./package.json');

function components() {
  const files = glob.sync('./src/**/*.md');
  const paths = [];
  files.forEach((filepath) => {
    const dir = path.dirname(filepath);
    const arrPath = filepath.split('/');
    const [componentName] = arrPath[arrPath.length - 1].split('.');
    try {
      const jsxPath = `${dir}/${componentName}.jsx`;
      if (fs.statSync(jsxPath)) paths.push(jsxPath);
    } catch (e) { } // eslint-disable-line no-empty
  });
  return paths;
}

module.exports = {
  styleguideDir: 'release-styleguide',
  sections: [
    // {
    //   name: 'Введение',
    //   content: '../../docs/intro.md',
    // },
    {
      // name: 'UI компоненты',
      components,
      ignore: [
        '**/__tests__/**',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/*.d.ts',
        '**/*story.{js,jsx}',
      ],
      exampleMode: 'collapse',
      usageMode: 'expand',
    },
  ],
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.jsx');
    return `import ${name} from '${pack.name}/${name}';`;
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src', 'StoryProvider'),
  },
  webpackConfig: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
          loader: 'file-loader',
        },
      ],
    },
  },
};


// module.exports = {
//   components: 'src/**/*.jsx',
//   styleguideDir: 'release-styleguide'
//   webpackConfig: {
//     resolve: {
//       extensions: ['.ts', '.tsx', '.js', '.jsx'],
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js|.ts|.tsx|.jsx?$/,
//           exclude: /node_modules/,
//           loader: 'babel-loader',
//         },
//         {
//           test: /\.css$/,
//           use: ['style-loader', 'css-loader'],
//         },
//       ],
//     },
//   },
// };
