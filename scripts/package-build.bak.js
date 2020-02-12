/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const shell = require('shelljs');
const shellCmd = require('shelljs');

const DIST = process.env.DIST || 'build';
const BUILD_PARAMS = process.env.BUILD_PARAMS || '--copy-files';
console.log(`DIST=${DIST} BUILD_PARAMS=${BUILD_PARAMS}`);
async function packageBuild() {

  const result = shellCmd('ls', '-la');
  console.log(result);
  return ;
  
  await shell.mkdir('-p', DIST);
  const copyFiles = ['package.json', 'package-lock.json', 'README.md'];
  await copyFiles.map(async file => {
    await shell.cp('-R', file, `${DIST}/`);
  });

  let res;
  // https://github.com/shelljs/shelljs/issues/86
  // https://docs.google.com/document/d/1UFm10TONaNWok3aEPzUP_OjZ6lEvwlYqyJBUcugLfso/edit#heading=h.u8gil4dopy47
  // child_process.execFileSync('cmd', [ 'arg1', 'arg2', 'arg3' ], { stdio: 'inherit' });
  res = await shell.exec(
    [
      '../../node_modules/@babel/cli/bin/babel.js',
      'src',
      `--out-dir ${DIST}`,
      '--source-maps both',
      '--extensions ".js,.jsx,.ts,.tsx"',
      BUILD_PARAMS,
    ].join(' '),
  );
  if (res.code !== 0) throw res;

  res = await shell.exec(
    [
      '../../node_modules/typescript/bin/tsc',
      '--declaration',
      '--declarationMap',
      '--emitDeclarationOnly',
      '--esModuleInterop',
      `--outDir ${DIST}`,
      'src/**.ts',
    ].join(' '),
  );
  if (res.code !== 0 && res.stdout.trim() !== "error TS6053: File 'src/**.ts' not found.") throw res;

  // #  --minified
  // # npx babel src --out-dir ${DIST:-build} --source-maps --minified --comments false --copy-files  ${BUILD_PARAMS}
  console.log('OK package-build');
}

packageBuild().catch(err => {
  console.error(`========= ERR (${err.code || '?'}) ========`);
  if (err.stdout) console.error(err.stdout);
  if (err.stderr) console.error(err.stderr);
  if (!err.stdout && !err.stderr) console.error(err);
  console.error('========= ERR ========');
  process.exit(1);
});
