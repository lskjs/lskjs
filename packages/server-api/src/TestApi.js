/* eslint-disable global-require */
// import collectConfigs from '@lskjs/module/utils/collectConfigs';
import Err from '@lskjs/err';
import asyncMapValues from '@lskjs/utils/asyncMapValues';
import Bluebird from 'bluebird';

import Api from './Api';

export const collectConfigs = async (m) => ({
  config: m.config,
  modules: await asyncMapValues(m.__availableModules, async (_, name) => collectConfigs(await m.module(name))),
});

export const collectConfigsLog = async (m) => ({
  debug: m.config.debug,
  log: m.config.log,
  modules: await asyncMapValues(m.__availableModules, async (_, name) => collectConfigsLog(await m.module(name))),
});

const middleware = (req, res, next) => {
  req.file = '[some-file]';
  if (Math.random() < 0.5) {
    console.log('test.error');
    next(new Error('test.error'));
  } else {
    next();
  }
};

export default class TestApi extends Api {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/middleware/1': async (req, res) => {
        await this.useMiddleware(middleware, req, res);
        console.log('req.file', req.file);
        return { file: req.file };
      },
      '/middleware/2': [
        middleware,
        async (req, res) => {
          console.log('req.file', req.file);
          return { file: req.file };
        },
      ],
      '/res/1': () => 123,
      '/res/2': () => 'Hello',
      '/res/3': (req, res) => res.send('Hello'),
      '/res/4': () => ({ test: 123 }),
      '/res/5': () => [1, 2, 3, 4],
      '/res/6': () => true,
      '/res/7': () => null,
      '/res/8': () => undefined,
      '/res/9': () => () => {},
      '/res/10': () => /[0-9]ig/,
      '/res/11': () => ({ __raw: '<html />' }),
      '/res/12': () => ({ __pack: true, some: 123, help: 'me' }),
      '/res/13': () =>
        function some() {
          const secret = 123;
          return secret;
        },
      '/async/ok': async () => {
        const delay = 5000;
        await Bluebird.delay(delay);
        return { delay };
      },
      '/async/err': async () => {
        const delay = 5000;
        await Bluebird.delay(delay);
        throw new Err('ERR_QWE', { delay });
      },
      '/async/404': async () => {
        const delay = 5000;
        await Bluebird.delay(delay);
        throw new Err('ERR_QWE', { delay, status: 404 });
      },
      '/async/502': async () => {
        const delay = 5000;
        await Bluebird.delay(delay);
        throw new Err('ERR_QWE', { delay, status: 502 });
      },
      '/err/1': () => {
        throw new Err('TEST_ERROR_CODE');
      },
      '/err/2': () => {
        throw { code: 'TEST_ERROR_CODE', message: 'The message text' };
      },
      '/err/3': () => {
        throw new Error('The message text');
      },
      '/err/4': () => {
        throw new Error('TEST_ERROR_CODE');
      },
      '/err/5': () => {
        const error = new Error('The message text');
        error.code = 'TEST_ERROR_CODE';
        throw new Error('The message text');
      },
      '/err/6': () => {
        throw {};
      },
      '/err/7': () => {
        throw null;
      },
      '/err/10': () => {
        throw new Err();
      },
      '/err/11': () => {
        throw new Err('TEST_ERROR_CODE');
      },
      '/err/12': () => {
        throw new Err('TEST_ERROR_CODE', { message: 'The message text' });
      },
      '/err/13': () => {
        throw new Err('TEST_ERROR_CODE', { message: 'The message text' }, { status: 404 });
      },
      '/err/14': () => {
        throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/15': () => {
        throw new Err('test.someError', { status: 404 });
      },
      '/err/16': () => {
        throw new Err('test.anotherError', { status: 404, data: { hello: 'world' } });
      },
      '/err/17': () => {
        throw new Error('err', 'file', 123);
      },
      '/err/18': () => {
        throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/19': () => {
        throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/20': () => {
        throw new Err({ code: 'TEST_ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/21': () => {
        throw new Err('user.notFound', { status: 404 });
      },
      '/err/22': () => {
        throw new Err('some.error', { status: 404 });
      },
      '/err/24': () => {
        throw new Err('some.error', { status: 404 });
      },
      '/form': (req) => {
        const { email, password } = req.data;
        if (password !== 'password') throw new Err('auth.passwordInvalud', { status: 400, data: { password } });
        if (email !== 'test@coder24.ru') throw new Err('auth.emailInvalud', { status: 400, data: { email } });
        return { ok: 123 };
      },
      '/locale': (req) => {
        this.log.trace('locale start');
        // console.log('getLocale', req.getLocale);
        return { locale: req.getLocale(), test: req.t('test.hello') };
      },
      '/app/config': () => collectConfigs(this.app),
      '/app/config/log': () => collectConfigsLog(this.app),
      '/req/auth': async (req) => req.user,
      '/req/user': async (req) => req.user,
      '/req/userId': async (req) => req.userId || (req.user && req.user_id),
      '/req/:log?': this.req.bind(this),
      '/user/one': async () => {
        const { UserModel } = this.app;
        const user = await UserModel.findOne();
        return user;
        // return collectConfigsLog(this.app);
      },
      '/path/*': () => ({
        path: this.path,
        paths: this.paths,
      }),
    };
  }

  req(req) {
    const res = {
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
    if (req.params.log) {
      this.log.info('req', res);
      res.body = req.body;
      this.log.info('body', req.body);
    }

    return res;
  }
}
