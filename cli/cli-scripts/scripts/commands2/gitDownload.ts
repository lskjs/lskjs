#!/usr/bin/env node
/* eslint-disable max-len */
// @ts-ignore
import { shell } from '@lskjs/cli-utils';
import Err from '@lskjs/err';

// @ts-ignore
export async function gitDownload(uri: string, { dest, depth = 1, rm = true } = {}) {
  if (!uri) throw new Err('!uri');
  if (!dest) throw new Err('!dest');
  let url;
  let git;
  let branch;
  try {
    url = new URL(uri);
  } catch (err) {
    git = 'https://github.com/lskjs/kit.git';
    branch = uri;
  }
  if (url) {
    if (url.hostname === 'github.com') {
      const paths = url.pathname.split('/');
      if (!paths[1]) throw '!invalid url';
      git = `https://github.com/${paths[0]}/${paths[1]}.git`;
      if (paths[2] === 'tree') {
        // eslint-disable-next-line prefer-destructuring
        branch = paths[3];
      }
    } else {
      throw '!github';
    }
  }
  await shell(`git clone --depth=${depth} ${branch ? `-b ${branch}` : ''} ${git} ${dest}`);
  if (rm) await shell(`rm -rf ${dest}/.git`, { debug: 1 });
}

export default gitDownload;
