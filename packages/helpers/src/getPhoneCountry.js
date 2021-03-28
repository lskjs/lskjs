import parsePhoneNumber from 'libphonenumber-js';

export function getPhoneCountry(phoneStr = '') {
  const phone = parsePhoneNumber(phoneStr);
  if (!phone) return null;
  if (!phone.country) return null;

  return phone.country.toLowerCase();
}

export default getPhoneCountry;
