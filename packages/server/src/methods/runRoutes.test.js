/* global describe test expect */
import express from 'express';
import request from 'supertest';
import runRoutes from './runRoutes';

describe('Post Endpoints', () => {
  test('should create a new post', async () => {
    let expressApp = express();
    const middleware = (req, res, next) => {
      req.userId = 123;
      return next();
    };

    const routes = {
      getRoutes() {
        return {
          '/channels': {
            '/find': (req, res) => {
              return res.status(200).json({ hello: 'world' });
            },
          },
          'USE /video': [
            middleware,
            {
              '/find': (req, res) => {
                return res.status(200).json({ userId: req.userId });
              },
            },
          ],
        };
      },
    };

    const app = {};
    expressApp = runRoutes.call({ this: app, rootApi: routes, express: expressApp });
    const res = await request(expressApp).get('/channels/find');
    expect(res.statusCode).toEqual(200);
    // const res3 = await request(expressApp).get('/videos/qwe/find');
    // expect(res3.statusCode).toEqual(200);
    const res2 = await request(expressApp).get('/videos/find');
    expect(res2.statusCode).toEqual(200);
    // expect(res.body).toEqual({ userId: 123 }); // TODO: DO IT
  });
});
