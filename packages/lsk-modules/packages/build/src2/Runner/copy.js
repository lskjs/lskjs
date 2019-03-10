/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import { format } from './run';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  await makeDir(this.resolveDist('build'));
  await Promise.all([
    writeFile(
      this.resolveDist('build/package.json'),
      JSON.stringify(
        {
          // private: true,
          engines: this.pkg.engines,
          dependencies: this.pkg.dependencies,
          scripts: {
            start: 'node server.js',
          },
        },
        null,
        2,
      ),
    ),
    // copyFile(this.resolveDist('LICENSE.txt'), this.resolveDist('build/LICENSE.txt')),
    copyFile(this.resolveDist('package-lock.json'), this.resolveDist('build/package-lock.json')),
    copyDir(this.resolveDist('public'), this.resolveDist('build/public')),
  ]);

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch([this.resolveDist('public/**/*')], { ignoreInitial: true });

    watcher.on('all', async (event, filePath) => {
      const start = new Date();
      const src = path.relative('./', filePath);
      const dist = path.join(
        this.resolveDist('build/'),
        src.startsWith('src') ? path.relative('src', src) : src,
      );
      switch (event) {
        case 'add':
        case 'change':
          await makeDir(path.dirname(dist));
          await copyFile(filePath, dist);
          break;
        case 'unlink':
        case 'unlinkDir':
          cleanDir(dist, { nosort: true, dot: true });
          break;
        default:
          return;
      }
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.info(`[${format(end)}] ${event} '${dist}' after ${time} ms`);
    });
  }
}

export default copy;
