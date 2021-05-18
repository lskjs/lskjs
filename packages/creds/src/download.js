/* eslint-disable no-console */
import axios from 'axios';
import Bluebird from 'bluebird';
import fs from 'fs/promises';

export async function download(dir, { force, ...options } = {}) {
  let meta;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    meta = require(`${dir}/__meta.js`).__project;
  } catch (err) {
    meta = {};
  }
  const server = options.server || meta.server;
  const id = options.id || meta.id;
  const token = options.token || meta.token;
  const projectName = options.project || meta.project;
  const url = `https://${server}/api/v4/projects/${id}/variables`;

  const { data: variables } = await axios({
    method: 'get',
    url,
    headers: {
      'PRIVATE-TOKEN': token,
    },
  });

  await Bluebird.map(variables, async ({ key, value, variable_type: type }) => {
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
      const filename = `${process.cwd()}/${dir}/${file}`;
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

export default download;
