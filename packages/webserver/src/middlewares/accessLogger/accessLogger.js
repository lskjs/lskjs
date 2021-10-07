import { applyLogger } from './applyLogger';

export function accessLogger(req, res, next) {
  applyLogger(req, res);
  next();
}

export default accessLogger;
