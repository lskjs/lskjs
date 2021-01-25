// import redis from 'redis';
import Promise from 'bluebird';
import dns from 'dns';
import redisAdapter from 'socket.io-redis';

const dnsLookup = Promise.promisify(dns.lookup);

export default async function () {
  return false;
  let pubClient;
  let subClient;
  const DEBUG = this.config.redis.debug;
  const reconnectTime = 5000;
  try {
    const pubAddress = await dnsLookup(this.config.redis.host);
      DEBUG && console.log(`pub redis address ${pubAddress}`, `instance ${__INSTANCE}`);  //eslint-disable-line
    await new Promise((resolve) => {
        DEBUG && console.log('pub config', `instance ${__INSTANCE}`, this.config.redis);  //eslint-disable-line
      pubClient = redis.createClient({
        ...this.config.redis,
        retry_strategy: (options) => {
            DEBUG && console.log('pub error', `instance ${__INSTANCE}`, options);  //eslint-disable-line
          if (!options.error) {
              DEBUG && console.log('redis упал (pub), надо перезапуститься без него');  //eslint-disable-line
            process.exit(1);
          } else if (options.error && ['EHOSTUNREACH', 'ECONNREFUSED'].includes(options.error.code)) {
              DEBUG && console.log(`try reconnect pub after ${reconnectTime}`);  //eslint-disable-line
            return 5000;
          }
          return undefined;
        },
      });
      pubClient.on('connect', () => {
          DEBUG && console.log('pub connected');  //eslint-disable-line
        resolve();
      });
    });
    await Promise.delay(1000);
    const subAddress = await dns.lookup(this.config.redis.host);
      DEBUG && console.log(`sub redis address ${subAddress}`, `instance ${__INSTANCE}`);  //eslint-disable-line
    await new Promise((resolve) => {
        DEBUG && console.log('sub config', `instance ${__INSTANCE}`, this.config.redis);  //eslint-disable-line
      subClient = redis.createClient({
        ...this.config.redis,
        retry_strategy: (options) => {
            DEBUG && console.log('sub error', `instance ${__INSTANCE}`, options);  //eslint-disable-line
          if (!options.error) {
              DEBUG && console.log('redis упал (sub), надо перезапуститься без него');  //eslint-disable-line
            process.exit(1);
          } else if (options.error && ['EHOSTUNREACH', 'ECONNREFUSED'].includes(options.error.code)) {
              DEBUG && console.log(`try reconnect sub after ${reconnectTime}`);  //eslint-disable-line
            return 5000;
          }
          return undefined;
        },
      });
      subClient.on('connect', () => {
          DEBUG && console.log('sub connected');  //eslint-disable-line
        resolve();
      });
    });
    this.ws.adapter(redisAdapter({ pubClient, subClient }));
  } catch (err) {
      DEBUG && console.log('redis err', err);  //eslint-disable-line
  }
}
