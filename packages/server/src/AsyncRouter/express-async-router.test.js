/* global test expect */
import AsyncRouter from '../AsyncRouter';
import express from 'express';
import request from 'supertest';

describe('Post Endpoints', () => {
  it('test 1', async () => {
    const app = express();
    const router = AsyncRouter();
    router.get('/test', async (req, res, next) => {
      console.log('middleware');
      next();
    }, async (req, res) => {
      return res.send(200);
    });
    app.use('/', router);
    const res = await request(app)
      .get('/test');
    expect(res.statusCode).toEqual(200)
    // expect(res.body).toHaveProperty('post')
  })
  it('test 2', async () => {
    const app = express();
    const router = AsyncRouter();
    router['all']('/test', (req, res, next) => {
      console.log('middleware');
      next();
    }, async (req, res) => {
      return res.json({ test: true });
    });
    app.use('/', router);
    const res = await request(app)
      .get('/test')
      .set('Content-Type', 'application/json')  
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ test: true })
  })
  it('test 3', async () => {
    const app = express();
    const router = AsyncRouter();
    router['use']('/test', (req, res, next) => {
      console.log('middleware');
      next();
    }, (req, res, next) => {
      console.log('middleware2');
      next();
    }, async (req, res) => {
      return res.send(200);
    });
    app.use('/', router);
    const res = await request(app)
      .get('/test');
    expect(res.statusCode).toEqual(200)
    // expect(res.body).toHaveProperty('post')
  })
})