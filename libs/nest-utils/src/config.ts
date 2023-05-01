/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-unreachable-loop */

import { pick } from '@lskjs/algos';
import { Err } from '@lskjs/err';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';

export { ConfigModule, ConfigService };
// https://docs.nestjs.com/techniques/configuration
export const getEnvJs = (filenames: string | string[]) => {
  // eslint-disable-next-line no-param-reassign
  const postfixes = Array.isArray(filenames) ? filenames : [filenames];
  const initPaths = [
    ...['', '..', '../..', '../../..'].map((upper) =>
      postfixes.map((postfix) => join(process.cwd(), upper, postfix)),
    ),
  ].flat();

  const paths = initPaths.filter(existsSync);

  for (let i = 0; i < paths.length; i++) {
    // TODO: may be merge
    const path = paths[i];
    // try {
    const config = require(path);
    return config as Record<string, any>;
  }
  throw new Err('ENV_FILE_NOT_FOUND', { data: { paths } });
};

export const get = (obj: any, key: string) => (key ? obj[key] : obj);

export const loadConfigEnvs = (path: string, key?: string) => ({
  load: [
    () => {
      const res = key ? get(getEnvJs(path), key) : getEnvJs(path);
      return res;
    },
  ],
  isGlobal: true,
  expandVariables: true,
});

type PropsFn = (res: Record<string, unknown>) => Record<string, unknown>;
export const getConfig = (path: string, fields?: string[] | PropsFn) => ({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    const res = configService.get<any>(path);
    if (!res) {
      throw new Err(`!config: ${path}`, { path });
      return null;
    }
    if (Array.isArray(fields)) return pick(res, fields);
    if (typeof fields === 'function') return fields(res);
    return res;
  },
  inject: [ConfigService],
});
