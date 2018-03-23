import { createLogger, INFO, DEBUG, stdSerializers } from 'browser-bunyan';
import { ConsoleFormattedStream } from '@browser-bunyan/console-formatted-stream';
const bunyan = {
  createLogger: (params) => {
    return createLogger({
     streams: [
        {
          level: DEBUG, // or use the string 'info'
          stream: new ConsoleFormattedStream()
        }
      ],

      serializers: stdSerializers,
      src: true,
      ...params,
    })
  }
};
export default bunyan;
