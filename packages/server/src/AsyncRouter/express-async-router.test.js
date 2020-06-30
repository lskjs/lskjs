/* global describe test expect */
import express from 'express';
import request from 'supertest';
import AsyncRouter from '.';

describe('Post Endpoints', () => {
  const middlewareUserId = (req, res, next) => {
    req.userId = 123;
    return next();
  };
  const middlewareReqId = (req, res, next) => {
    req.reqId = 123;
    return next();
  };
  test('test 1', async () => {
    const app = express();
    const router = AsyncRouter();
    router.get('/test', middlewareUserId, async (req, res) => {
      return res.send(200);
    });
    app.use('/', router);
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post')
  });
  test('test 2', async () => {
    const app = express();
    const router = AsyncRouter();
    router.all('/test', middlewareUserId, async (req, res) => {
      return res.send(200);
    });
    app.use('/', router);
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post')
  });
  test('test 3', async () => {
    const app = express();
    const router = AsyncRouter();
    router.use('/test', middlewareUserId, middlewareReqId, async (req, res) => {
      return res.send(200);
    });
    app.use('/', router);
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post')
  });
});
