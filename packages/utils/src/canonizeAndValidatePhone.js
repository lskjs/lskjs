import canonizePhone from './canonizePhone';

export default function canonizeAndValidatePhone(str = '') {
  const phone = canonizePhone(str);
  if (phone.toString().length < 9) throw '!phone';
  return phone;
}
