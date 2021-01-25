/* global describe test expect */
import express from 'express';
import request from 'supertest';

import AsyncRouter from '../src/AsyncRouter';

describe('Post Endpoints', () => {
  const middlewareUserId = (req, res, next) => {
    req.userId = 123;
    return next();
  };
  const middlewareReqId = (req, res, next) => {
    req.reqId = 321;
    return next();
  };
  const app = express();
  const router = AsyncRouter();
  router.all('/test', middlewareUserId, async (req, res) => res.json({ ok: true }));
  router.get('/test-user-id', middlewareUserId, async (req, res) => res.json({ ok: true, userId: req.userId }));
  router.use('/test-user-id-req-id', middlewareUserId, middlewareReqId, async (req, res) =>
    res.json({ ok: true, userId: req.userId, reqId: req.reqId }),
  );
  app.use('/', router);

  test('/test', async () => {
    const res = await request(app).get('/test').set('Content-Type', 'application/json');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true });
  });
  test('/test-user-id', async () => {
    app.use('/', router);
    const res = await request(app).get('/test-user-id');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, userId: 123 });
  });
  test('/test-user-id-req-id', async () => {
    app.use('/', router);
    const res = await request(app).get('/test-user-id-req-id');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ ok: true, userId: 123, reqId: 321 });
  });
});
