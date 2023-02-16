import getRedirectUrl from './getRedirectUrl';

export default (req, prefix = `/auth/login`) => getRedirectUrl(req, prefix);
