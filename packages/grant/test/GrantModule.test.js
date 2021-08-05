/* global test expect */
import ready from '@lskjs/utils/polyfill';
import Bluebird from 'bluebird';

import { GrantModule } from '../src/GrantModule';

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

const rules = {
  'test.1': () => 1,
  'test.0': () => 0,
  'cabinet.access': (_, { userId }) => !!userId,
  'cabinet.channels': (_, { userId }) => !!userId,
};

test('grant.can(1)', async () => {
  const grant = await GrantModule.start({ app, rules });

  const res = await grant.can('test.1');

  expect(res).toBe(1);
});
test('grant.can(0)', async () => {
  const grant = await GrantModule.start({ app, rules });

  const res = await grant.can('test.0');

  expect(res).toBe(0);
});
test('grant.can({ action })', async () => {
  const grant = await GrantModule.start({ app, rules });

  const res = await grant.can({ action: 'test.1' });

  expect(res).toBe(1);
});

test('grant.can cabinet.access userId', async () => {
  const grant = await GrantModule.start({ app, rules });

  const res = await grant.can({ action: 'cabinet.access' }, { userId: 1 });

  expect(res).toBe(true);
});
test('grant.can cabinet.access !userId', async () => {
  const grant = await GrantModule.start({ app, rules });

  const res = await grant.can({ action: 'cabinet.access' });

  expect(res).toBe(false);
});
test('can grantCache strings', async () => {
  const grant = await GrantModule.start({ app, rules });

  const grantCache = await grant.getCache(['cabinet.access', 'cabinet.channels'], {
    userId: 1,
  });

  const res = await Bluebird.props({
    access: grantCache.can('cabinet.access'),
    channels: grantCache.can('cabinet.channels'),
  });

  expect(res).toEqual({ access: true, channels: true });
});
test('can grantCache objects', async () => {
  const grant = await GrantModule.start({ app, rules });

  const grantCache = await grant.getCache([{ action: 'cabinet.access' }, { action: 'cabinet.channels' }], {
    userId: 1,
  });

  const res = await Bluebird.props({
    access: grantCache.can('cabinet.access'),
    channels: grantCache.can('cabinet.channels'),
  });

  expect(res).toEqual({ access: true, channels: true });
});
test('can grantCache wildcard', async () => {
  const grant = await GrantModule.start({ app, rules });

  const grantCache = await grant.getCache(['cabinet.*'], {
    userId: 1,
  });

  const res = await Bluebird.props({
    access: grantCache.can('cabinet.access'),
    channels: grantCache.can('cabinet.channels'),
  });

  expect(res).toEqual({ access: true, channels: true });
});

test('can grantCache 2', async () => {
  const grant = await GrantModule.start({ app, rules });

  const grantCache = await grant.getCache(['test.*', { action: 'cabinet.*' }]);

  const res = await Bluebird.props(grantCache.rules);

  expect(res).toEqual({ 'test.1': 1, 'test.0': 0, 'cabinet.access': false, 'cabinet.channels': false });
});
