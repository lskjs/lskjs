import Err from '@lskjs/err';
import nodeVesion from '@lskjs/utils/nodeVersion';
import http from 'http';

export default async function (params = {}) {
  if (this.debug) this.log.trace('ServerApp.resolve', Object.keys(params));
  const express = this.express || this.app;
  if (!express) throw new Err('!express');

  const {
    host = '', // ?
    url,
    // body = {},
    headers: _headers = {},
  } = params;
  const body = params.data || params.body || {};
  // const query = params.query || params.params || {};

  const remoteAddress = '127.0.0.1';
  const headers = {
    host,
    ..._headers,
  };
  const req = {
    ...params,
    // query,
    url,
    _direct: true,
    method: 'GET',
    headers,
    connection: {
      remoteAddress,
    },
    socket: {
      socket: {
        remoteAddress,
      },
    },
    body,
  };
  const data = await new Promise((resolve, reject) => {
    const res = Object.create(http.ServerResponse.prototype);
    // eslint-disable-next-line no-shadow
    res.send = function (data) {
      if (this.debug) this.log.trace('express.resolve.send', Object.keys(data));
      if (res.statusCode >= 400) {
        reject(data);
      } else {
        resolve(data);
      }
      // console.log('statusCode', res.statusCode);
    };

    if (nodeVesion() >= 9) {
      const x = new http.OutgoingMessage();
      const symbols = Object.getOwnPropertySymbols(x);
      const outHeadersKey = symbols.find((item) => item.toString() === 'Symbol(outHeadersKey)');
      if (outHeadersKey) {
        res[outHeadersKey] = headers;
      }
      const kOutHeaders = symbols.find((item) => item.toString() === 'Symbol(kOutHeaders)');
      if (kOutHeaders) {
        res[kOutHeaders] = headers;
      }
    }
    // if (DEBUG) console.log('express.resolve', req);
    express.handle(req, res);
  });

  let res;
  if (data && typeof data === 'string') {
    try {
      res = JSON.parse(data);
    } catch (err) {
      this.log.error('ctx.resolve JSON.parse err', err, data);
      res = data;
    }
  } else {
    res = data;
  }

  return {
    // NOTE: axios like response
    status: 200,
    statusText: 'OK',
    headers: {},
    data: res,
  };
  // console.log({res})
  // return { data: res }; // TODO: подумать правильно ли это
}
