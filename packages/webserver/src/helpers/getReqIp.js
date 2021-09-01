export function getReqIp(initReq) {
  const req = initReq || this;
  return (
    req.ip ||
    req.connection.remoteAddress ||
    (req.socket && req.socket.remoteAddress) ||
    (req.socket.socket && req.socket.socket.remoteAddress) ||
    null
  );
}

export default getReqIp;
