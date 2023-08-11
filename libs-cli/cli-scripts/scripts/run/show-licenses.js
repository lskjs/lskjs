#!/usr/bin/env node
const { run } = require('@lskjs/cli-utils');
const { map } = require('fishbird');
const { omit } = require('@lskjs/algos');
const checker = require('license-checker');

const check = (options = {}) =>
  new Promise((resolve, reject) => {
    checker.init(options, (err, packages) => {
      if (err) {
        reject(err);
      } else {
        resolve(packages);
      }
    });
  });
const mapObjects = (obj, fn) => {
  const keys = Object.keys(obj);
  return keys.reduce((acc, key) => {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {});
};
const parseName = (name) => {
  if (name[0] === '@') {
    const r = parseName(name.slice(1));
    r.name = `@${r.name}`;
    return r;
  }
  const [n, v] = name.split('@');
  return {
    name: n,
    version: v,
  };
};
const keyBy = (arr, key) =>
  arr.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});

const main = async ({ isRoot, ctx, args, log, cwd } = {}) => {
  let path = cwd;
  if (args[0] === '--path') {
    // eslint-disable-next-line prefer-destructuring
    path = args[1];
    args.splice(0, 2);
  }
  const paths = path
    .split(',')
    .map((a) => a.trim().replace('~', process.env.HOME))
    .filter(Boolean);

  // if (isRoot) {
  //   // const concurrency = process.env.PNPM_CONCURRENCY || 4;
  //   // const cc = concurrency && concurrency !== 4 ? `--workspace-concurrency=${concurrency}` : '';
  //   // await shell(`pnpm -r ${cc} run test --prod --silent`, { ctx, args });
  //   // return;
  // }

  const packagesLists = await map(paths, async (packagePath) => {
    try {
      const packageJsonPath = `${packagePath}/package.json`;
      // console.log({ packageJsonPath });
      // eslint-disable-next-line import/no-dynamic-require
      const packageJson = require(packageJsonPath);
      const deps = [
        {
          type: 'deps',
          values: packageJson.dependencies,
        },
        {
          type: 'devDeps',
          values: packageJson.devDependencies,
        },
        {
          type: 'optDeps',
          values: packageJson.optionalDependencies,
        },
        {
          type: 'peerDeps',
          values: packageJson.peerDependencies,
        },
      ].filter(({ values }) => values && Object.keys(values).length > 0);

      const raw = await check({
        start: packagePath,
      });
      const res = mapObjects(raw, (props, pname) => {
        const { name, version } = parseName(pname);
        return {
          name,
          version,
          ...props,
        };
      });
      const packagesByName = keyBy(Object.values(res), 'name');

      const rawPackages = deps.map(({ type, values }) =>
        Object.keys(values || {}).map((name) => {
          const version = values[name];
          // const { name, version } = parseName(pname);
          // console.log({ pname, name, version });
          return {
            packagePath,
            name,
            version,
            type,
            ...omit(packagesByName[name], ['name', 'version']),
          };
        }),
      );
      return rawPackages.flat();
    } catch (err) {
      log.warn(packagePath, 'err', err);
      return [];
    }
  });
  const rpackages = packagesLists.flat();
  const packages = rpackages.map(({ packagePath, ...options }) => {
    // eslint-disable-next-line no-param-reassign
    packagePath = packagePath.replace(process.env.HOME, '~');
    const project = packagePath.split('/')[2];
    const package = packagePath.split('/').slice(3).join('/');
    // const licenseUrl = options.licensesPath && options.licenses[0] && options.licenses[0].url;
    return {
      packagePath,
      project,
      package,
      ...options,
      npmUrl: `https://www.npmjs.com/package/${options.name}`,
    };
  });
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(packages, null, 4));

  // proc.on('data', (data) => {
  //   const d = data.toString().trim();
  //   console.log(d);
  // });
  // proc.stdout.on('data', (data) => {
  //   const d = data.toString().trim();
  //   console.log(d);
  // });

  // console.log(proc);
  // await proc;
};

module.exports = run(main);
