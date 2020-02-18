import canonize from './canonize';
import canonizeUsername from './canonizeUsername';
import canonizeEmail from './canonizeEmail';
import canonizePhone from './canonizePhone';

export default rawParams => {
  const params = {};
  if (rawParams.login) {
    params.push({
      login: canonize(rawParams.login),
    });
  }
  if (rawParams.username) {
    params.push({
      username: canonizeUsername(rawParams.username),
    });
  }
  if (rawParams.email) {
    params.push({
      email: canonizeEmail(rawParams.email),
    });
  }
  if (rawParams.phone) {
    params.push({
      phone: canonizePhone(rawParams.phone),
    });
  }
  return params;
};
