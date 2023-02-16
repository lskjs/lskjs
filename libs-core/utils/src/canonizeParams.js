import canonizeEmail from './canonizeEmail';
import canonizePhone from './canonizePhone';
import canonizeUsername from './canonizeUsername';
import validateEmail from './validateEmail';
import validatePhone from './validatePhone';
import validateUsername from './validateUsername';

export default (rawParams) => {
  const params = {};
  if (rawParams.login) {
    if (validateEmail(canonizeEmail(rawParams.login))) {
      params.email = canonizeEmail(rawParams.login);
    } else if (validatePhone(canonizePhone(rawParams.login))) {
      params.phone = canonizePhone(rawParams.login);
    } else if (validateUsername(canonizeUsername(rawParams.login))) {
      params.username = canonizeUsername(rawParams.login);
    }
  } else {
    if (rawParams.username) {
      params.username = canonizeUsername(rawParams.username);
    }
    if (rawParams.email) {
      params.email = canonizeEmail(rawParams.email);
    }
    if (rawParams.phone) {
      params.phone = canonizePhone(rawParams.phone);
    }
  }
  return params;
};
