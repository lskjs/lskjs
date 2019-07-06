const createErr = code => message => ({
  status: code > 200 && code < 600 ? code : 500,
  code,
  message,
});

export default () => ({
  e: (code, message, status) => ({
    code,
    message,
    status,
  }),
  e500: createErr(500),
  e404: createErr(404),
  e403: createErr(403),
  e401: createErr(401),
  e400: createErr(400),
});
