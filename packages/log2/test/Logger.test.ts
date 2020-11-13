import Logger from '../Logger';

class TestLogger extends Logger {
  _logger(...args: any[]): any[] {
    return args;
  }
}
const log = new TestLogger();

log.trace(1,2,3) === [1,2, 3];
