export default (ctx) => {
  return function (socket, next) {
    const { query } = socket.handshake;
    const req = socket.request;
    const res = req.res;

    if (!req.query) {
      req.query = {};
    }
    Object.assign(req.query, query);


    const { parseUser } = ctx.middlewares;
    parseUser(req, res, () => {
      socket.user = req.user;
      return next();
    });
  };
};
