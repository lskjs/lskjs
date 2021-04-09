import Err from '@lskjs/utils/Err';

export function isReqAuth(req) {
  if (req.__errJwt) throw new Err(req.__errJwt);
  if (!req.user || !req.user._id) throw new Err('!req.user', { status: 401 });
  return true;
}

export default isReqAuth;
