import { Err } from '@lskjs/err';
import { log } from '@lskjs/log/log';
import { getComment, jsonToFile } from '@lskjs/stringify';
import { map, mapSeries } from 'fishbird';
import { existsSync } from 'fs';
import { mkdir, unlink } from 'fs/promises';

import { GithubService } from '../services/GithubService';
import { GitlabService } from '../services/GitlabService';
import { Service } from '../services/Service';
import { getDirs } from '../utils/getDirs';
// import { getFiles } from '../utils/getFiles';

export async function buildCommand(serviceDirname, options: any = {}) {
  const buildDirDir = options.buildDir || `${serviceDirname}/build`;

  let config;
  const configPath = `${serviceDirname}/config.js`;
  try {
    // eslint-disable-next-line import/no-dynamic-require
    config = require(configPath);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      log.error(`${configPath} not found`);
      return;
    }
    throw err;
  }

  await unlink(`${buildDirDir}`).catch(() => {});
  await mkdir(buildDirDir, { recursive: true });

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

  const { files = [] } = config;
  await mapSeries(files, async (fileOptions: any) => {
    const { type, filename, handler } = fileOptions;
    const res = await handler(fileOptions, config);
    const comment = getComment({
      filename,
      values: [
        ['Server', service.getServiceLink()],
        ['Project', service.getProjectPath()],
        ['Project ID', service.getProjectId()],
        ['Project Url', service.getProjectUrl()],
        ['CI/CD Setting', service.getProjectCICDSettingURL()],
      ],
      footer:
        service.getProjectCredsUrl() &&
        `
Auto generated by ${service.getProjectCredsUrl()}
If you want to change something, please contact admin repo.
      `.trim(),
    });
    await jsonToFile(`${buildDirDir}/${filename}`, res, {
      type,
      compare: !options.force,
      comment,
    });
    log.info(`[build] ${service.getProjectPath()} (${filename})`);
  });
}
export async function buildDeepCommand(dirname, options = {}) {
  const rawFiles = await getDirs(dirname);
  const files = (
    await map(rawFiles, async (rawFile) => {
      const { filename } = rawFile;
      if (!(await existsSync(`${filename}/config.js`))) return null;
      return rawFile;
    })
  ).filter(Boolean);

  return mapSeries(files, async ({ filename }) => {
    await buildCommand(filename, options).catch((err) => {
      log.error(`Build error ${filename}: `, err);
    });
  });
}
