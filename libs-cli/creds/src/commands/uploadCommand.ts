import { Err } from '@lskjs/err';
import { mapSeries } from 'fishbird';
import { readFile } from 'fs/promises';

import { GithubService } from '../services/GithubService';
import { GitlabService } from '../services/GitlabService';
import { Service } from '../services/Service';

export async function uploadCommand(serviceDirname, options: any = {}) {
  const buildDirDir = options.buildDir || `${serviceDirname}/build`;

  // eslint-disable-next-line import/no-dynamic-require
  const config = require(`${serviceDirname}/config.js`);

  const serviceName = config.service?.serviceName;
  if (!serviceName) throw new Err('!serviceName');

  let service: Service;
  if (serviceName === 'github') {
    service = new GithubService({
      ...config.service,
      ...options,
    });
  } else if (serviceName === 'gitlab') {
    service = new GitlabService({
      ...config.service,
      ...options,
    });
  } else {
    throw new Err('incorrect serviceName', { serviceName });
  }

  const { files: rawFiles = [], variables, secrets } = config;

  const files = await mapSeries(rawFiles, async (fileOptions: any) => {
    const { filename } = fileOptions;
    const content = await readFile(`${buildDirDir}/${filename}`).then((f) => f.toString());
    return {
      ...fileOptions,
      content,
    };
  });
  await service.uploadAll({
    files,
    variables,
    secrets,
  });
}
