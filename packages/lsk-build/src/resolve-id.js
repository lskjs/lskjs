const resolve = require('resolve');
let jspmResolve;
// Works around https://github.com/jspm/jspm-cli/pull/1779 is released
try {
  jspmResolve = require('pkg-resolve');
} catch (ex) {
  // pass
}
const debug = false;

const moduleDirectories = [
  'web_modules',
  'node_modules',
];
function resolveModule(id, opts) {
  return new Promise((res, rej) => {
    resolve(id, opts, (err, path) => {
      debug && console.log('resolve', id, path);
      if (err) {
        return rej(err);
      }
      res(path);
    });
  });
}

module.exports = function (id, base, options) {
  const paths = options.path;
  debug && console.log('paths', paths);
  const trigger = options.trigger || '&';

  const resolveOpts = {
    basedir: base,
    moduleDirectory: moduleDirectories,
    paths,
    extensions: ['.css'],
    packageFilter: function processPackage(pkg) {
      if (pkg.style) {
        pkg.main = pkg.style;
      } else if (!pkg.main || !/\.css$/.test(pkg.main)) {
        pkg.main = 'index.css';
      }
      return pkg;
    },
  };
  debug && console.log({ base, id });
  let triggered = false;
  if (id[0] === trigger) {
    debug && console.log('triggered');
    id = id.substr(1);
    triggered = true;
  }

  // if (id[0] === '$')
  return resolveModule((!triggered ? './' : '') + id, resolveOpts)
  // return resolveModule("./" + id, resolveOpts)
  .catch(() => {
    debug && console.log('catch2');
    return resolveModule((triggered ? './' : '') + id, resolveOpts);
  })
  .catch(() => {
    debug && console.log('catch3');
    return jspmResolve.default(id, {
      basedir: resolveOpts.basedir,
      extensions: resolveOpts.extensions,
    });
  })
  .catch(() => {
    debug && console.log('catch4');
    if (paths.indexOf(base) === -1) {
      paths.unshift(base);
    }

    throw new Error([
      `Failed to find '${id}'`,
      'in [ ',
      `    ${paths.join(',\n        ')}`,
      ']',
    ].join('\n    '));
  });
};
