import merge from 'lodash/merge';

import { getProcessEnv } from './getProcessEnv';
import { mergeEnvs } from './mergeEnvs';

export const config = (...paths) => merge({}, mergeEnvs(...paths), getProcessEnv());

export default config;
