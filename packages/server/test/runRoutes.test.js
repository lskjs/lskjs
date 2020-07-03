/* global describe test expect */
import express from 'express';
import request from 'supertest';
import runRoutes from '../src/methods/runRoutes';

const app = {};
let expressApp = express();
const middleware = (req, res, next) => {
  req.userId = 123;
  return next();
};

const routes = {
  getRoutes() {
    return {
      '/test': (req, res) => res.status(200).json({ ok: true, hello: 'world' }),
      '/deep': {
        '/test': (req, res) => res.status(200).json({ ok: true }),
      },
      '/mid1': [
        {
          '/test': (req, res) => {
            return res.status(200).json({ ok: true, userId: req.userId });
          },
        },
      ],
      '/mid2': [
        middleware,
        {
          '/test': (req, res) => {
            return res.status(200).json({ ok: true, userId: req.userId });
          },
          '/test2': (req, res) => {
            return res.status(200).json({ ok: true, hello: 'world', userId: req.userId });
          },
        },
      ],
    };
  },
};

expressApp = runRoutes.call({ this: app, rootApi: routes, express: expressApp });

describe('Endpoints', () => {
  test('/test', async () => {
    const res = await request(expressApp).get('/test').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, hello: 'world' });
  });
  test('/deep/test', async () => {
    const res = await request(expressApp).get('/deep/test').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true });
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
});
