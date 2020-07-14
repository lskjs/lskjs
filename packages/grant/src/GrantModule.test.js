/* global test expect */
import ready from '@lskjs/utils/polyfill';
import Promise from 'bluebird';
import BaseGrantModule from './GrantModule';

ready();

const app = {
  models: {
    UserModel: {
      findById() {
        return {
          _id: '_id',
        };
      },
    },
  },
};

class GrantModule extends BaseGrantModule {
  getRules() {
    return {
      'cabinet.access': ({ userId }) => {
        return !!userId;
      },
      'cabinet.channels': ({ userId }) => {
        return !!userId;
      },
    };
  }
}

test('can cabinet.access true', async () => {
  const grant = new GrantModule({ app });
  await grant.beforeInit();
  await grant.init();
  await grant.run();

  const res = await grant.can({ action: 'cabinet.access', userId: 'userId' });

  expect(res).toBe(true);
});
test('can cabinet.access false', async () => {
  const grant = new GrantModule({ app });
  await grant.beforeInit();
  await grant.init();
  await grant.run();

  const res = await grant.can({ action: 'cabinet.access' });

  expect(res).toBe(false);
});
test('can grantCache 1', async () => {
  const grant = new GrantModule({ app });
  await grant.beforeInit();
  await grant.init();
  await grant.run();

  const grantCache = await grant.getCache([
    { action: 'cabinet.access', userId: '_id' },
    { action: 'cabinet.channels', userId: '_id' },
  ]);

  const res = await Promise.props({
    access: grantCache.can('cabinet.access'),
    channels: grantCache.can('cabinet.channels'),
  });

  expect(res).toEqual({ access: true, channels: true });
});
test('can grantCache 2', async () => {
  const grant = new GrantModule({ app });
  await grant.beforeInit();
  await grant.init();
  await grant.run();

  const grantCache = await grant.getCache([
    { action: 'cabinet.access', userId: '_id' },
    { action: 'cabinet.channels', userId: '' },
  ]);

  const res = await Promise.props({
    access: grantCache.can('cabinet.access'),
    channels: grantCache.can('cabinet.channels'),
  });

  expect(res).toEqual({ access: true, channels: false });
});
