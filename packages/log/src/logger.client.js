import { createLogger, stdSerializers } from 'browser-bunyan';
import ConsoleFormattedStream from './tiny-console-formatted-stream/log';

const bunyan = {
  createLogger: config => createLogger({
    streams: [
      {
        level: config.level || 'trace',
        stream: new ConsoleFormattedStream({
          logByLevel: true,
        }),
      },
    ],
    serializers: stdSerializers,
    // serializers: (...args) => {
    //   console.log({args});
    //   return 'asd'
    // },
    // src: __DEV__,
    src: false,
    ...config,
  }),
};
export default bunyan;
