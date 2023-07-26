import { createLogger } from './createLogger';
// import { Logger } from './Logger';

// console.log({ Logger });

// export const log = new Logger('app');
export const log = createLogger();
export default log;
