export const isUrlLog = (req: any): boolean => Boolean(req.name === 'req' || (req.method && req.host && req.url)); // reqId
export const isFinalUrlLog = (req: any): boolean =>
  Boolean(isUrlLog(req) && (req.status || req.duration || req.length));
export default isUrlLog;
