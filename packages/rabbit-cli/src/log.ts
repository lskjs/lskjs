import { Logger } from '@lskjs/log';

const level = process.env.LOG_LEVEL || (process.env.DEBUG || '').includes('lsk') ? 'trace' : 'info';
export const log = new Logger({ ns: 'lskrabbit', level });

export default log;
