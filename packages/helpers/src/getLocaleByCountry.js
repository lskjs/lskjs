// export const getLocaleByCountry = (country: string): string => {
export const getLocaleByCountry = (country) => {
  if (country === 'ua') return 'uk';
  if (country === 'ru') return 'ru';
  if (country === 'de') return 'de';
  return 'en';
};

export default getLocaleByCountry;
