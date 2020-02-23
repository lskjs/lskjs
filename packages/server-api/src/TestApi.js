/* eslint-disable global-require */
import errMerge from '@lskjs/utils/errMerge';
import e from '@lskjs/utils/e';
import Err from '@lskjs/utils/Err';
import Api from './Api';

export default class TestApi extends Api {
  getRoutes() {
    return {
      '/res/1': () => 123,
      '/res/2': () => 'Hello',
      '/res/3': () => () => {},
      '/res/4': () => new Error('Test'),
      '/res/5': () => ({ test: 123 }),
      '/res/6': () => [1, 2, 3, 4],
      '/res/7': () => true,
      '/res/8': () => null,
      '/res/9': () => undefined,
      '/res/10': () => /[0-9]ig/,
      '/res/11': () => ({ __raw: '<html />' }),
      '/res/12': () => ({ __pack: true, some: 123, help: 'me' }),
      '/res/13': () =>
        function some() {
          const secret = 123;
          return secret;
        },
      '/err/1': () => {
        throw 'ERROR_CODE';
      },
      '/err/2': () => {
        throw { code: 'ERROR_CODE', message: 'The message text' };
      },
      '/err/3': () => {
        throw this.app.e('ERROR_CODE', { message: 'The message text' });
      },
      '/err/4': () => {
        throw this.app.e('ERROR_CODE', { message: 'The message text' }, { status: 404 });
      },
      '/err/5': () => {
        throw this.app.e({ code: 'ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/6': () => {
        throw this.app.e('some.error', { status: 404 });
      },
      '/err/7': () => {
        throw new Error('err', 'file', 123);
      },
      '/err/8': () => {
        throw errMerge({ code: 'ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/9': () => {
        throw e({ code: 'ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/10': () => {
        throw new Err({ code: 'ERROR_CODE', message: 'The message text' }, { status: 404 });
      },
      '/err/11': () => {
        throw errMerge('user.notFound', { status: 404 });
      },
      '/err/12': () => {
        throw this.e('some.error', { status: 404 });
      },
      '/err/13': () => {
        throw e('some.error', { status: 404 });
      },
      '/err/14': () => {
        throw e('validate.error', { status: 400, data: { errors: [1, 2, 3] } });
      },
    };
  }
}
