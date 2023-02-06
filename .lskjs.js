const getPackages = ({ path, type } = {}) => {
  try {
    return require('fs')
      .readdirSync(`${__dirname}/${path}`)
      .filter((x) => x[0] !== '.')
      .map((name) => ({ type, name, path: `${path}/${name}` }));
  } catch (err) {
    return [];
  }
};

module.exports = {
  pathexec: {
    paths: [`${__dirname}/cli/cli-scripts`],
  },
  },
  packages: [
    ...getPackages({ path: 'libs', type: 'lib' }),
    ...getPackages({ path: 'libs-presets', type: 'lib' }),
    ...getPackages({ path: 'apps', type: 'app' }),
    ...getPackages({ path: 'cli', type: 'lib' }),
  ],
  cwd: __dirname,
};
