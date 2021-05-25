/* eslint-disable no-console */
import axios from 'axios';
import Bluebird from 'bluebird';
import fs from 'fs/promises';

import { getFiles } from './utils/getFiles';

export async function upload(dir, { force, ...options } = {}) {
  let config;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    config = require(`${dir}/__config.js`);
  } catch (err) {
    config = {};
  }
  const server = options.server || config.server;
  const id = options.id || config.id;
  const token = options.token || config.token;
  const projectName = options.project || config.project;
  const url = `https://${server}/api/v4/projects/${id}/variables`;

  if (!server) throw '!server';
  if (!id) throw '!id';
  if (!token) throw '!token';

  const files = await getFiles(dir);

  await Bluebird.map(files, async ({ name, filename }) => {
    if (filename.indexOf('/__') !== -1) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ext, key] = name.split('.').reverse();
    try {
      const content = await fs.readFile(filename).then((f) => f.toString());

      const { data: varData } = await axios({
        method: 'get',
        url: `${url}/${key}`,
        headers: {
          'PRIVATE-TOKEN': token,
        },
      }).catch((err) => {
        if (!force) throw err;
        return { data: { value: '@lskjs/creds' } };
      });

      if (varData.value.indexOf('@lskjs/creds') === -1 && !force) {
        console.log(`[IGNORE] Project ${id} ${key}`);
        return;
      }

      await axios({
        method: 'delete',
        url: `${url}/${key}`,
        headers: {
          'PRIVATE-TOKEN': token,
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
      }).catch(() => {});

      await axios({
        method: 'post',
        url,
        data: {
          key,
          variable_type: 'file',
          value: content,
          protected: true,
          // masked: true,
        },
        headers: {
          'PRIVATE-TOKEN': token,
        },
      });

      // console.log(data);
      console.log(`[OK] ${dir}/${name} => ${server}/${projectName} (${key})`);
      console.log(`[OK] Project ${projectName} ${key}`);
    } catch (err) {
      console.error(
        `[ERR] Project ${id} ${key}`,
        (err && err.response && err.response.data && err.response.data.message) || err,
      );
    }
  });
}

export default upload;
