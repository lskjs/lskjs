var resolve = require("resolve")
var jspmResolve
// Works around https://github.com/jspm/jspm-cli/pull/1779 is released
try {
  jspmResolve = require("pkg-resolve")
}
catch (ex) {
  // pass
}

var moduleDirectories = [
  "web_modules",
  "node_modules",
]

function resolveModule(id, opts) {
  return new Promise(function(res, rej) {
    resolve(id, opts, function(err, path) {
      console.log('resolve', id, path);
      if (err) {
        return rej(err)
      }
      res(path)
    })
  })
}

module.exports = function(id, base, options) {
  var paths = options.path
  console.log('paths', paths);
  var trigger = options.trigger || '&'

  var resolveOpts = {
    basedir: base,
    moduleDirectory: moduleDirectories,
    paths: paths,
    extensions: [ ".css" ],
    packageFilter: function processPackage(pkg) {
      if (pkg.style) {
        pkg.main = pkg.style
      }
      else if (!pkg.main || !/\.css$/.test(pkg.main)) {
        pkg.main = "index.css"
      }
      return pkg
    },
  }
  console.log({base, id});
  var triggered = false
  if (id[0] === trigger) {
    console.log('triggered');
    id = id.substr(1)
    triggered = true
  }

  // if (id[0] === '$')
  return resolveModule((!triggered ? "./" : '') + id, resolveOpts)
  // return resolveModule("./" + id, resolveOpts)
  .catch(function() {
    console.log('catch2');
    return resolveModule((triggered ? "./" : '') + id, resolveOpts)
  })
  .catch(function() {
    console.log('catch3');
    return jspmResolve.default(id, {
      basedir: resolveOpts.basedir,
      extensions : resolveOpts.extensions,
    })
  })
  .catch(function() {
    console.log('catch4');
    if (paths.indexOf(base) === -1) {
      paths.unshift(base)
    }

    throw new Error([
      "Failed to find '" + id + "'",
      "in [ ",
      "    " + paths.join(",\n        "),
      "]",
    ].join("\n    "))
  })
}
