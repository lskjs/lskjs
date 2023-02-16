import Err from '@lskjs/err';
import Module from '@lskjs/module';
import get from 'lodash/get';
import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';

import defaultConfig from './config';

const getIp = (req) => {
  const ip = (req.headers && req.headers['x-forwarded-for']) || (req.socket && req.socket.remoteAddress) || req.ip;
  if (typeof ip === 'string' && ip.includes('127.0.0.1')) return '127.0.0.1';
  if (['127.0.0.1', '::ffff:127.0.0.1', '::1'].includes(ip)) return '127.0.0.1';
  if (!ip) {
    console.log('getIp!!!', { ip }, req);
    return '127.0.0.1';
  }
  return ip;
};

export default class RateLimitterServerModule extends Module {
  config = defaultConfig;
  async init() {
    await super.init();
    if (this.app.hasModule('redis')) {
      this.redis = await this.app.module('redis');
    }
    const usersRateLimitterConfig = get(this, 'config.limits.users');
    const guestsRateLimitterConfig = get(this, 'config.limits.guests');
    this.usersRateLimitter = this.createRateLimitter(usersRateLimitterConfig);
    this.guestsRateLimitter = this.createRateLimitter(guestsRateLimitterConfig);
  }
  createRateLimitter(params) {
    if (this.redis) return this.createRedisRateLimitter(params);
    return this.createMemoryRateLimitter(params);
  }
  createRedisRateLimitter(params) {
    if (!this.redis) throw new Err('!redis');
    const rateLimitter = new RateLimiterRedis({
      storeClient: this.redis.client,
      ...params,
    });
    return rateLimitter;
  }
  createMemoryRateLimitter(params) {
    const rateLimitter = new RateLimiterMemory(params);
    return rateLimitter;
  }
  isEnabled() {
    if (this.config.enabled == null) return true;
    return Boolean(this.config.enabled);
  }
  async rateLimitterMiddleware(req, res, next) {
    if (!this.isEnabled()) return next();
    const ip = getIp(req);
    if (ip === '127.0.0.1') return next();
    const userId = get(req, 'user._id');
    const rateLimitter = userId ? this.usersRateLimitter : this.guestsRateLimitter;
    const key = `rate_limit_${userId || ip}`;
    try {
      await rateLimitter.consume(key);
      return next();
    } catch (err) {
      this.log.warn(
        'rateLimitterMiddleware debug ip',
        {
          key,
          ip,
        },
        err,
      );
      try {
        const rlog = await this.app.module('rlog');
        await rlog.error(`IP: ${ip}\nError: Too Many Requests\n`, {
          // project: 'analytics-errors',
        });
      } catch (e) {
        this.log.error('rlog ratelimmiter', e);
      }
      return res.status(429).send('Too Many Requests');
    }
  }
}
