import { getEnvConfig } from './getEnvConfig';
import { Logger } from './Logger';

export const log = new Logger(getEnvConfig());
export default log;
