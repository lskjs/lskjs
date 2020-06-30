/* global test expect */
import { getRoutes, iterateRoute, default as runRoutes } from './runRoutes';
import AsyncRouter from '../AsyncRouter';
import express from 'express';
import request from 'supertest'

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    let app = express();

    const routes = {
      getRoutes: () => {
        return {
          '/channels': {
            '/find': (req, res) => {
              return res.send(200);
            }
          },
          '/video': [
            (req, res, next) => {
              console.log('middleware');
              return next();
            },
            {
              '/find': (req, res) => {
                return res.send(200);
              }
            }
          ],
        }
      }
    }

    app = runRoutes.call({ this: this, rootApi: routes, express: app, log: { warn: console.warn } })
    const res = await request(app)
      .get('/channels/find');
    const res2 = await request(app)
      .get('/videos/find');
    expect(res.statusCode).toEqual(200)
    expect(res2.statusCode).toEqual(200)
    // expect(res.body).toHaveProperty('post')
  })
})