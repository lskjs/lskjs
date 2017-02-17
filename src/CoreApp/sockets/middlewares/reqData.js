export default () => {
  return function (socket, next) {
    const { query } = socket.handshake;
    const req = socket.request;
    if (!req.query) {
      req.query = {};
    }
    socket.data = {};
    Object.assign(socket.data, query, req.query);
    return next();
  };
};
