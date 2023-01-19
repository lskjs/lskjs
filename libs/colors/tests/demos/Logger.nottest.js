const { Logger } = require('../../lib');

const logger = new Logger({
  name: 'lsk:Module',
});

logger.fatal('some fatal');
logger.error('some error');
logger.warn('some warn');
logger.debug('some debug');
logger.info('some info');
logger.trace('some trace');

new Logger({ name: 'lsk:SomeModule' }).error('some error');
new Logger({ name: 'lsk:AnotherModule' }).warn('some another module warn');
new Logger({ name: 'lsk:GrantModule' }).info('some module info');

// ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', ]

// var extras = [];
// var details = [];
// var colors2 = colors;
// var colorStr = rec.color || rec.req_id || rec.reqId;

// var colorCode = hashCode(rec.color || rec.req_id || rec.reqId);
// var color =  colorCode === 0 ? null : colorsKeys[colorCode % Object.keys(colorsKeys).length];
// var createMarker = getMarker(rec.color || rec.req_id || rec.reqId);

// var marker = createMarker();

// var getMarker = require('@lskjs/utils/marker').default;

// const logger = new Logger({
//   name: 'lsk:Module',
// });

// logger.fatal('some fatal');
// logger.error('some error');
// logger.warn('some warn');
// logger.debug('some debug');
// logger.info('some info');
// logger.trace('some trace');

// new Logger({ name: 'lsk:SomeModule' }).error('some error');
// new Logger({ name: 'lsk:AnotherModule' }).warn('some another module warn');
// new Logger({ name: 'lsk:GrantModule' }).info('some module info');

// const Logger = require('../build/Logger').default;

// const logger = new Logger({
//   name: 'lsk:Module',
// });

// logger.fatal('some fatal');
// logger.error('some error');
// logger.warn('some warn');
// logger.debug('some debug');
// logger.info('some info');
// logger.trace('some trace');

// new Logger({ name: 'lsk:SomeModule' }).error('some error');
// new Logger({ name: 'lsk:AnotherModule' }).warn('some another module warn');
// new Logger({ name: 'lsk:GrantModule' }).info('some module info');

// ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', ]

// var extras = [];
// var details = [];
// var colors2 = colors;
// var colorStr = rec.color || rec.req_id || rec.reqId;

// var colorCode = hashCode(rec.color || rec.req_id || rec.reqId);
// var color =  colorCode === 0 ? null : colorsKeys[colorCode % Object.keys(colorsKeys).length];
// var createMarker = getMarker(rec.color || rec.req_id || rec.reqId);

// var marker = createMarker();

// var getMarker = require('@lskjs/utils/marker').default;
