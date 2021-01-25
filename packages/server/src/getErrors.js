const createErr = (code, app) => (message) => {
  console.log('createErr DEPRECATED!!!!!!');
  return app.e({
    status: code > 200 && code < 600 ? code : 500,
    code,
    message,
  });
};

export default (app) => ({
  e: (code, message, status) =>
    app.e({
      code,
      message,
      status,
    }),
  e500: createErr(500, app),
  e404: createErr(404, app),
  e403: createErr(403, app),
  e401: createErr(401, app),
  e400: createErr(400, app),
});
