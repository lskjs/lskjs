/* eslint-disable no-continue */
/* eslint-disable import/no-dynamic-require */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

import { Err } from '@lskjs/err';

export const getEnvConfig = (filenames: string | string[]) => {
  // eslint-disable-next-line no-param-reassign
  const paths = Array.isArray(filenames) ? filenames : [filenames];
  for (let i = 0; i < paths.length; i++) {
    // TODO: may be merge
    let path = paths[i];
    if (path.startsWith('process.env.')) {
      const envName = path.replace('process.env.', '');
      const raw = process.env[envName];
      if (!raw) continue;
      try {
        const res = JSON.parse(raw);
        return res;
      } catch (err: any) {
        throw new Err('ENV_VAR_CANNOT_PARSE', `ENV_VAR_CANNOT_PARSE(${envName}): ${err?.message}`, {
          envName,
        });
      }
    }
    if (path.startsWith('/')) {
      // do nothing
    } else {
      path = join(process.cwd(), path);
    }
    if (!existsSync(path)) continue;
    const config = require(path);
    return config as Record<string, any>;
  }
  throw new Err('ENV_FILE_NOT_FOUND', { paths });
};

export default getEnvConfig;
