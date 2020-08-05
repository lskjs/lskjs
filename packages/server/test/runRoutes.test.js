/* eslint-disable max-classes-per-file */
/* global describe test expect */
import express from 'express';
import request from 'supertest';
import runRoutes from '../src/methods/runRoutes';

const app = {};
let expressApp = express();
const middlewareUserId = (req, res, next) => {
  req.userId = 123;
  return next();
};
const middlewareReqId = (req, res, next) => {
  req.reqId = 321;
  return next();
};

class ClassApi {
  getRoutes() {
    return {
      '/any': (req, res) => res.status(200).json({ ok: true, some: 'any' }),
      // '/*': (req, res) => res.status(200).json({ ok: true, wildcard: true }),
    };
  }
}
class NestedApi {
  class = new ClassApi(this);
  getRoutes() {
    return {
      '/class': this.class,
      '/any': (req, res) => res.status(200).json({ ok: true, some: 'any' }),
      // '/*': (req, res) => res.status(200).json({ ok: true, wildcard: true }),
    };
  }
}

const rootApi = {
  class: new ClassApi(this),
  nested: new NestedApi(this),
  getRoutes() {
    return {
      '/nested': this.nested,
      '/some': this.class.getRoutes(),
      '/class': this.class,
      '/hello': (req, res) => res.status(200).json({ ok: true, hello: 'world' }),
      '/deep': {
        '/test': (req, res) => res.status(200).json({ ok: true, deep: 1 }),
      },
      '/mid1': [
        {
          '/test': (req, res) => {
            return res.status(200).json({ ok: true, userId: req.userId });
          },
        },
      ],
      '/mid2': [
        middlewareUserId,
        {
          '/test': (req, res) => {
            return res.status(200).json({ ok: true, userId: req.userId });
          },
          '/test2': (req, res) => {
            return res.status(200).json({ ok: true, hello: 'world', userId: req.userId });
          },
        },
      ],
      '/mid3': [
        middlewareUserId,
        middlewareReqId,
        (req, res) => {
          return res.status(200).json({ ok: true, userId: req.userId, reqId: req.reqId });
        },
      ],
    };
  },
};

// expressApp = runRoutes.call({
//   this: app,
//   rootApi: {
//     // getRoutes: () => [
//     //   {
//     //     '/test': (req, res) => {
//     //       return res.status(200).json({ ok: true, userId: req.userId });
//     //     },
//     //   },
//     // ],
//     getRoutes: () => ({
//       '/mid1': [
//         {
//           '/test': (req, res) => {
//             return res.status(200).json({ ok: true, userId: req.userId });
//           },
//         },
//       ],
//     }),
//   },
//   express: expressApp,
// });
expressApp = runRoutes.call({ this: app, rootApi, express: expressApp });

// describe('Endpoints', () => {
//   test('/mid1/test', async () => {
//     const res = await request(expressApp).get('/mid1/test');
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toEqual({ ok: true });
//   });
// });
// const describe2 = () => {};
describe('Endpoints', () => {
  test('/some/any', async () => {
    const res = await request(expressApp).get('/some/any').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, some: 'any' });
  });
  test('/class/any', async () => {
    const res = await request(expressApp).get('/class/any').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, some: 'any' });
  });
  test('/nested/any', async () => {
    const res = await request(expressApp).get('/nested/any').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, some: 'any' });
  });
  test('/nested/class/any', async () => {
    const res = await request(expressApp).get('/nested/class/any').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, some: 'any' });
  });
  test('/hello', async () => {
    const res = await request(expressApp).get('/hello').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, hello: 'world' });
  });
  test('/deep/test', async () => {
    const res = await request(expressApp).get('/deep/test').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, deep: 1 });
  });
  test('/mid1/test', async () => {
    const res = await request(expressApp).get('/mid1/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true });
  });
  test('/mid2/test', async () => {
    const res = await request(expressApp).get('/mid2/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, userId: 123 });
  });
  test('/mid2/test2', async () => {
    const res = await request(expressApp).get('/mid2/test2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, hello: 'world', userId: 123 });
  });
  test('/mid3', async () => {
    const res = await request(expressApp).get('/mid3');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, userId: 123, reqId: 321 });
  });
});
