/* eslint-disable array-callback-return */
const { getNpmGlobal } = require('./getNpmGlobal');
const { getLskConfig } = require('./getLskConfig');
const path = require('path');

const getPaths = (params = {}) => {
  const { cwd = process.cwd(), name = '' } = params;
  const scriptPath = `scripts/run/${name}`;
  const lskrc = params.lskrc !== false ? getLskConfig({ cwd }) : {};
  const pathexecConfig = lskrc?.pathexec;
  const dirs = pathexecConfig ? pathexecConfig.dirs : 4;
  const local = pathexecConfig ? pathexecConfig.local : true;
  const nodemodules = pathexecConfig ? pathexecConfig.nodemodules : true;
  let { exts } = params;
  if (!exts) exts = [''];
  const paths = (pathexecConfig?.paths || [])
    .map((prefix) => exts.map((ext) => path.resolve(`${prefix}/${scriptPath}${ext}`)))
    .flat();
  if (paths.length) return paths;

  // console.time('[getNpmGlobal]');
  const globalNodemodules = [getNpmGlobal(), `/usr/local/lib`].filter(Boolean); // TODO: npm root -g
  // console.timeEnd('[getNpmGlobal]');
  const nodemodulesPostfix = '/node_modules/@lskjs/cli-scripts';

  if (local) {
    [...Array(dirs)].map((_, deep) => {
      const dir = `${cwd}/${'../'.repeat(deep)}`;
      paths.push(...exts.map((ext) => path.resolve(`${dir}/${scriptPath}${ext}`)));
      if (nodemodules) {
        paths.push(...exts.map((ext) => path.resolve(`${dir}/${nodemodulesPostfix}/${scriptPath}${ext}`)));
      }
    });
  }
  if (nodemodules) {
    paths.push(
      ...exts.map((ext) =>
        path.resolve(`${process.env.HOME}/projects/lskjs-cli/packages/cli-scripts/${scriptPath}${ext}`),
      ),
    );
    globalNodemodules.forEach((dir) => {
      paths.push(...exts.map((ext) => path.resolve(`${dir}${nodemodulesPostfix}/${scriptPath}${ext}`)));
    });
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) => path.resolve(`${dir}/node_modules/@lskjs/cli/${nodemodulesPostfix}/${scriptPath}${ext}`)),
      );
    });
    globalNodemodules.forEach((dir) => {
      paths.push(
        ...exts.map((ext) =>
          path.resolve(`${dir}/node_modules/lsk/node_modules/@lskjs/cli/${nodemodulesPostfix}/${scriptPath}${ext}`),
        ),
      );
    });
  }

  return paths;
};

module.exports = {
  getPaths,
};
