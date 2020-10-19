import Logger from './Logger';

// export default ({ prefix = 'lsk', ns, name } = {}) => {
export default (...args) => new Logger(...args);

// import debug from 'debug';

// export default ({ prefix = 'lsk', ns, name } = {}) => {
//   const logger = debug([prefix, ns || name].filter(Boolean).join(':'));
//   return {
//     error: (...args) => logger(name, '[e]', ...args),
//     warn: (...args) => logger(name, '[w]', ...args),
//     debug: (...args) => logger(name, '[d]', ...args),
//     info: (...args) => logger(name, '[i]', ...args),
//     trace: (...args) => logger(name, '[t]', ...args),
//   };
// };

// import DebugLevel from 'debug-level';
// export default ({ prefix = 'lsk', ns, name } = {}) => {
//   const logger = new DebugLevel([prefix, ns || name].filter(Boolean).join(':'));
//   logger.trace = logger.debug;
//   return logger;
// };
