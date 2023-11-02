/* eslint-disable no-console */
import Bluebird from 'bluebird';
import fs from 'fs/promises';

import { GitHub } from './services/github';
import { GitLab } from './services/gitlab';
import { getFiles } from './utils/getFiles';

export async function upload(dir, { force, ...options } = {}) {
  let config;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    config = require(`${dir}/__config.js`);
  } catch (err) {
    config = {};
  }

  const service = options.service || config.service;
  const SecretService =
    service === 'github' ? new GitHub(options, config, force) : new GitLab(options, config, force);

  SecretService.checkConfig();

  const files = await getFiles(dir);

  await Bluebird.map(files, async ({ name, filename }) => {
    if (filename.indexOf('/__') !== -1) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ext, initkey] = name.split('.').reverse();
    const key = initkey.replace(/-/gi, '_');

    try {
      const content = await fs.readFile(filename).then((f) => f.toString());

      await SecretService.uploadSecret(key, content);

      // console.log(data);
      console.log(
        `[OK] ${dir}/${name} => ${SecretService.getServiceLink()}/${SecretService.getProjectName()} (${key})`,
      );
      console.log(`[OK] Project ${SecretService.getProjectName()} ${key}`);
    } catch (err) {
      console.error(
        `[ERR] Project ${SecretService.getId()} ${key}`,
        (err && err.response && err.response.data && err.response.data.message) || err,
      );
    }
  });
}

export default upload;
