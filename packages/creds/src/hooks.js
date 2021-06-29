/* eslint-disable no-console */
import axios from 'axios';
import Bluebird from 'bluebird';
import fs from 'fs/promises';
import get from 'lodash/get';

import { getFiles } from './utils/getFiles';

export async function hooks(dir, { force, ...options } = {}) {
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
  const url = `https://${server}/api/v4/projects/${id}/hooks`;

  if (!server) throw '!server';
  if (!id) throw '!id';
  if (!token) throw '!token';

  const hooksFromConfig = get(config, 'hooks', []);
  try {
    const { data: hooksList } = await axios({
      method: 'get',
      url: `${url}`,
      headers: {
        'PRIVATE-TOKEN': token,
      },
    }).catch((err) => {
      console.log(err);
      if (!force) throw err;
      return { data: { value: '@lskjs/creds' } };
    });
    await Bluebird.map(hooksList, async ({ id: hookId }) => {
      await axios({
        method: 'delete',
        url: `${url}/${hookId}`,
        headers: {
          'PRIVATE-TOKEN': token,
        },
      });
    });
  } catch (err) {
    console.error(
      `[ERR] Project ${id}`,
      (err && err.response && err.response.data && err.response.data.message) || err,
    );
  }

  await Bluebird.map(hooksFromConfig, async (dataHook) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try {

      // if (varData.value.indexOf('@lskjs/creds') === -1 && !force) {
      //   console.log(`[IGNORE] Project ${id}`);
      //   return;
      // }

      await axios({
        method: 'post',
        url,
        data: dataHook,
        headers: {
          'PRIVATE-TOKEN': token,
        },
      });

      // console.log(data);
      console.log(`[OK] ${dir} => ${server}/${projectName}`);
      console.log(`[OK] Project ${projectName}`);
    } catch (err) {
      console.error(
        `[ERR] Project ${id}`,
        (err && err.response && err.response.data && err.response.data.message) || err,
      );
    }
  });
}

export default hooks;
