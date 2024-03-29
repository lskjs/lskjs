// @ts-nocheck

/* eslint-disable no-console */
import Err from '@lskjs/err';
import axios from 'axios';
import { map } from 'fishbird';
import fs from 'fs/promises';

export async function downloadCommand(dir, { force, ...options } = {}) {
  if (force) {
    // TODO: something
  }
  let config;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    config = require(`${dir}/__config.js`);
  } catch (err) {
    console.error('err', err);
    config = {};
  }
  const service = options.service || config.service;
  if (service === 'github') {
    throw new Err('Downloading secrets from github is not supported');
  }

  const server = options.server || config.server;
  const id = options.id || config.id;
  const token = options.token || config.token;
  const projectName = options.project || config.project;
  const url = `https://${server}/api/v4/projects/${id}/variables`;

  const { data: variables } = await axios({
    method: 'get',
    url,
    headers: {
      'PRIVATE-TOKEN': token,
    },
  });

  await map(variables, async ({ key, value, variable_type: type }) => {
    try {
      if (type !== 'file') {
        console.log(`[IGNORE] Project ${projectName} ${key}`);
        return;
      }
      let ext;
      if (key.endsWith('env_file')) {
        ext = 'env';
      } else if (key.endsWith('env_json')) {
        ext = 'json';
      } else if (key.endsWith('env_js')) {
        ext = 'js';
      }
      const file = [key, ext].filter(Boolean).join('.');
      const filename = `${dir}/${file}`;
      await fs.writeFile(filename, value);
      console.log(`[OK] ${server}/${projectName} (${key}) => ${dir}/${file}`);
    } catch (err) {
      console.error(
        `[ERR] Project ${projectName} ${key}`,
        (err && err.response && err.response.data && err.response.data.message) || err,
      );
    }
  });
}
