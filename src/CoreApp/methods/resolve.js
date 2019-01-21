

export default async function (params = {}) {
  const express = this.express || this.app;

  const {
    host = '', // ?
    url,
    body = {},
    headers = {},
  } = params;

  const remoteAddress = '127.0.0.1';
  const req = {
    ...params,
    url,
    method: 'GET',
    headers: {
      host,
      ...headers,
    },
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
    express.handle(req, res);
  });

  try {
    return JSON.parse(data);
  } catch (err) {
    this.log.error('ctx.resolve err', err);
    return data;
  }
}
