import canonize from './canonize';
import canonizeUsername from './canonizeUsername';
import canonizeEmail from './canonizeEmail';
import canonizePhone from './canonizePhone';

export default rawParams => {
  const params = {};
  if (rawParams.login) {
    params.login = canonize(rawParams.login);
  }
  if (rawParams.username) {
    params.username = canonizeUsername(rawParams.username);
  }
  if (rawParams.email) {
    params.email = canonizeEmail(rawParams.email);
  }
  if (rawParams.phone) {
    params.phone = canonizePhone(rawParams.phone);
  }
  return params;
};
