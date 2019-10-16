import http from 'http';
import nodeVesion from '@lskjs/utils/nodeVersion';

export default async function (params = {}) {
  const express = this.express || this.app;

  const {
    host = '', // ?
    url,
    body = {},
    headers: _headers = {},
  } = params;

  const remoteAddress = '127.0.0.1';
  const headers = {
    host,
    ..._headers,
  };
  const req = {
    ...params,
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
  const data = await new Promise((resolve) => {
    const res = Object.create(http.ServerResponse.prototype);
    res.send = function(data) { //eslint-disable-line
      resolve(data);
    };

    if (nodeVesion() >= 9) {
      const x = new http.OutgoingMessage();
      const symbols = Object.getOwnPropertySymbols(x);
      const outHeadersKey = symbols.find((item => (item.toString() === 'Symbol(outHeadersKey)')));
      if (outHeadersKey) {
        res[outHeadersKey] = headers;
      }
      const kOutHeaders = symbols.find((item => (item.toString() === 'Symbol(kOutHeaders)')));
      if (kOutHeaders) {
        res[kOutHeaders] = headers;
      }
    }
    express.handle(req, res);
  });

  try {
    return JSON.parse(data);
  } catch (err) {
    this.log.error('ctx.resolve err', err);
    return data;
  }
}
