export default (ctx) => {
  return function (socket, next) {
    // console.log('socket.middleware parseUser');
    const { query } = socket.handshake;
    const req = socket.request;
    const res = req.res;

    if (!req.query) {
      req.query = {};
    }
    Object.assign(req.query, query);
    req.token = query.token;
    socket.token = query.token;
    const { parseUser, parseToken } = ctx.middlewares;
    // parseToken(req, res, (req, res) => {
    //   socket.token = req.token;
    parseUser(req, res, () => {
      socket.user = req.user;
      return next();
    });
    // });
  };
};
