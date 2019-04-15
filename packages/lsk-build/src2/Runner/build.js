/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import cp from 'child_process';
// console.log(4444444);

// import run from './run';
// import clean from './clean';
// import copy from './copy';
// import bundle from './bundle';
// import render from './render';
// import pkg from '../package.json';

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build() {
  // console.log('build');

  await this.run(this.clean);
  // console.log('after clean');
  
  await this.run(this.copy);
  await this.traceWebpackConfig();
  // console.log('after copy');

  await this.run(this.bundle);
  // console.log('after byndle');


  if (process.argv.includes('--static')) {
    await this.run(this.render);
  }

  if (process.argv.includes('--docker')) {
    cp.spawnSync('docker', ['build', '-t', this.pkg.name, '.'], {
      stdio: 'inherit',
    });
  }
}

export default build;
