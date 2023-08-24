/* eslint-disable no-unreachable-loop */
// https://docs.nestjs.com/techniques/configuration

import { pick } from '@lskjs/algos';
import { Err } from '@lskjs/err';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';

import { getEnvConfig } from './getEnvConfig';

export const ConfigModule = NestConfigModule;
export const ConfigService = NestConfigService;

const get = (obj: any, key: string) => (key ? obj[key] : obj);

export const loadConfigEnvs = (path: string | string[], key?: string) => ({
  load: [
    () => {
      const config = getEnvConfig(path);
      const res = key ? get(config, key) : config;
      return res;
    },
  ],
  isGlobal: true,
  expandVariables: true,
});

type PropsFn = (res: Record<string, unknown>) => Record<string, unknown>;
export const getConfig = (path: string, fields?: string[] | PropsFn) => ({
  imports: [ConfigModule],
  useFactory: (configService: NestConfigService) => {
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
