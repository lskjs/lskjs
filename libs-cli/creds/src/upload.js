/* eslint-disable no-console */
import { log } from '@lskjs/log/log';
import Bluebird from 'bluebird';
import fs from 'fs/promises';

import { GitHub } from './services/github';
import { GitLab } from './services/gitlab';
import { getFiles } from './utils/getFiles';

export async function upload(dir, { force, ...options } = {}) {
  let config;
  let env;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    config = require(`${dir}/__config.js`);
  } catch (err) {
    config = {};
  }

  try {
    // eslint-disable-next-line import/no-dynamic-require
    env = require(`${dir}/__env.js`);
  } catch (err) {
    env = {};
  }

  const service = options.service || config.service;
  const SecretService =
    service === 'github' ? new GitHub(options, config, force) : new GitLab(options, config, force);

  SecretService.checkConfig();

  const files = await getFiles(dir);

  if (typeof env === 'object' && Object.keys(env).length) {
    // eslint-disable-next-line import/no-dynamic-require
    log.debug(
      `Start uploading __env.js to ${SecretService.getServiceLink()}/${SecretService.getProjectName()}`,
    );
    const result = await SecretService.uploadEnv(env);
    if (result) {
      log.info(
        `[OK] ${dir}/__env.js => ${SecretService.getServiceLink()}/${SecretService.getProjectName()}`,
      );
    }
  }

  await Bluebird.map(files, async ({ name, filename }) => {
    if (filename.indexOf('/__') !== -1) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ext, initkey] = name.split('.').reverse();
    const key = initkey.replace(/-/gi, '_');

    try {
      const content = await fs.readFile(filename).then((f) => f.toString());

      await SecretService.uploadSecret(key, content);

      // log.debug(data);
      log.info(
        `[OK] ${dir}/${name} => ${SecretService.getServiceLink()}/${SecretService.getProjectName()} (${key})`,
      );
      log.info(`[OK] Project ${SecretService.getProjectName()} ${key}`);
    } catch (err) {
      log.error(
        `[ERR] Project ${SecretService.getId()} ${key}`,
        (err && err.response && err.response.data && err.response.data.message) || err,
      );
    }
  });
}

export default upload;
