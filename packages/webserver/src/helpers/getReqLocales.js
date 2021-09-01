import acceptLanguageParser from 'accept-language-parser';
import uniq from 'lodash/uniq';

// 'ru,en-uk,en-us' => ru,en-uk,en,en-us,en

export function getLocalesFromString(localeString) {
  const locales = [];
  acceptLanguageParser.parse(localeString).forEach(({ code, region }) => {
    if (code === '*') return;
    if (region) {
      locales.push(`${code}-${region}`);
    }
    locales.push(code);
  });
  // console.log('getLocalesFromString', localeString, '=>', locales);

  return uniq(locales);
}

export function getReqLocales(initReq) {
  const req = initReq || this;
  if (req && req.data && req.query.__locale) return getLocalesFromString(req.query.__locale);
  if (req && req.user && req.user.locale) return getLocalesFromString(req.user.locale);
  if (req && req.cookies && req.cookies.locale) return getLocalesFromString(req.cookies.locale);
  if (req && req.headers && req.headers['accept-language']) {
    return getLocalesFromString(req.headers['accept-language']);
  }

  return null;
}

export default getReqLocales;
