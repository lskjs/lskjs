#! /usr/bin/env node
import fs from 'fs';
import path from 'path';
import { exec, spawn } from 'child_process';

const currentPath = process.cwd();
const pkgPath = path.join(currentPath, 'package.json');

const execAsync = (cmd, opts = {}) => new Promise((resolve) => {
  exec(cmd, opts, (error, stdout) => resolve(stdout));
});
const DEBUG = false;

async function start(pkg) {
  const allPkgs = Object.keys(
    Object.assign(
      pkg.dependencies || {},
      pkg.devDependencies || {},
      pkg.peerDependencies || {},
      pkg.optionalDependencies || {},
    ),
  );
  let result = await execAsync('npm list -g --depth=0', { shell: true });
  result = result.trim();
  result = result.replace(/└── /, '');
  result = result.replace(/├── /g, '');
  result = result.replace(/UNMET PEER DEPENDENCY /gi, '');
  result = result.split(/\r?\n/);
  result.splice(0, 1);
  const globalModules = result.filter(module => module.includes('->')).map((module) => {
    const atIndex = module.lastIndexOf('@');
    return module.slice(0, atIndex);
  });
  if (DEBUG) console.log('all-links in global', globalModules);
  const matchedPackages = allPkgs.filter(item => globalModules.includes(item));
  if (matchedPackages.length > 0) {
    console.log(`exec npm link ${matchedPackages.join(' ')}`);
    const install = spawn(`npm link ${matchedPackages.join(' ')}`, { shell: true });
    install.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  } else {
    console.log('No packages for link');
  }
}

fs.readFile(pkgPath, 'utf-8', (err, data) => {
  if (err) {
    console.error(err.message);
  } else {
    try {
      const pkg = JSON.parse(data);
      start(pkg);
    } catch (e) {
      console.log(`failed to parse ${pkgPath} because ${e.message}`);
    }
  }
});
