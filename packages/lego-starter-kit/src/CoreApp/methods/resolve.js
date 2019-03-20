const http = require("http");

export default async function (params = {}) {
  const express = this.express || this.app;

  const {
    host = '', // ?
    url,
    body = {},
    headers = {},
  } = params;

  const remoteAddress = '127.0.0.1';
  const h = {
    host,
    ...headers,
  };
  const req = {
    ...params,
    url,
    method: 'GET',
    headers: h,
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
  // let data = '{}';
  const data = await new Promise((resolve) => {
    const res = {
      send(data) { //eslint-disable-line
        resolve(data);
      },
      setHeader(...args) { //eslint-disable-line
        // console.log('res.setHeader', args);
      },
    };
    if (Number(process.version.match(/^v(\d+\.\d+)/)[1]) >= 9) {
      const x = new http.OutgoingMessage();
      const symbols = Object.getOwnPropertySymbols(x);
      const symbol = symbols.find((item => (item.toString() == "Symbol(outHeadersKey)")));
      res[symbol] = h;
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
