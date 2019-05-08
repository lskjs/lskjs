import { expect } from 'chai';
import { describe, it, before, beforeEach } from 'mocha';
import axios from 'axios';
import ApiClient from '../src/apiquery';

global.axios = axios;
const nock = require('nock');

const testParams = {
  url: 'http://www.example.com',
  base: '/api/v1',
  authToken: '#1234567890',
};

const api = new ApiClient(testParams);
const nockUrl = testParams.url + testParams.base;

nock.cleanAll();
//console.log(`Nock url: ${nockUrl}`);


describe('axios', () => {
  describe('post query', () => {
    describe('without params, body', () => {
      const query = () => api.axios('ping', { method: 'post' });
      describe('response without body;', () => {
        const nockInterceptor = () => nock(nockUrl).post('/ping').reply(200);

        before(nockInterceptor);
        it('Status equal 200', async () => {
          try {
            await query();
          } catch (e) {
            expect(e.res.status).to.equal(200);
          }
        });

        before(nockInterceptor);
        it('Generate Error', async () => {
          try {
            await query();
          } catch (e) {
            expect(e.res.textErr).to.be.an.instanceof(Error);
          }
        });

        before(nockInterceptor);
        it('Error message equal "Empty data"', async () => {
          try {
            await query();
          } catch (e) {
            expect(e.res.textErr.message).to.equal('Empty data');
          }
        });
      });

      describe('response with body;', () => {
        before(() => nock(nockUrl).post('/ping').reply(200, { foo: 'bar' }));
        it('Response body good', async () => {
          const res = await query();
          expect(res).to.deep.equal({ foo: 'bar' });
        });
      });
    });
  });

  describe('with cancelToken', () => {
    const source = axios.CancelToken.source();
    const query = () => api.axios('ping', { method: 'post', cancelToken: source.token });
    before(() => nock(nockUrl).post('/ping').reply((uri, requestBody, cb) => {
      setTimeout(() => cb(null, [500, 'THIS IS THE REPLY BODY']), 10000);
    }));

    it('test cancelToken', () => {
      const res = query();
      source.cancel('Operation canceled by the user.');
      return res.catch((e) => {
        expect(e.message).to.equal('Operation canceled by the user.');
      });
    });
  });
});
