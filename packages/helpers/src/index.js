import { getAverageLocation } from './getAverageLocation';
import { getCityAndCountryByLocation } from './getCityAndCountryByLocation';
import { getContacts } from './getContacts';
import { getEmailCode } from './getEmailCode';
import { getInstagramImages } from './getInstagramImages';
import { getLanguage } from './getLanguage';
import { getLocaleByCountry } from './getLocaleByCountry';
import { getPhoneCountry } from './getPhoneCountry';
import { grabUsername } from './grabUsername';

export * from './getAverageLocation';
export * from './getCityAndCountryByLocation';
export * from './getContacts';
export * from './getEmailCode';
export * from './getInstagramImages';
export * from './getLanguage';
export * from './getLocaleByCountry';
export * from './getPhoneCountry';
export * from './grabUsername';
export * from './locations';

export default {
  getAverageLocation,
  getCityAndCountryByLocation,
  getContacts,
  getEmailCode,
  getInstagramImages,
  getLanguage,
  getLocaleByCountry,
  getPhoneCountry,
  grabUsername,
};