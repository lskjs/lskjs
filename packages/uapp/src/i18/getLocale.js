import Cookies from 'js-cookie';
import qs from 'querystring';

function getWindowLocale() {
  const locale = window.navigator.userLanguage || window.navigator.language;
  if (!locale) return null;
  return locale.split('-')[0];
}

export default function getLocale() {
  const { ctx: uapp } = this || {};
  if (__SERVER__ && uapp) {
    if (uapp.query && uapp.query.__locale) return uapp.req.query.__locale;
    if (uapp.state && uapp.state.locale) return uapp.state.locale;
    if (uapp.state2 && uapp.state2.locale) return uapp.state2.locale;
    if (uapp.user && uapp.user.locale) return uapp.user.locale;
    if (uapp.req && uapp.req.cookies && uapp.req.cookies.locale) return uapp.req.cookies.locale;
  }
  if (__CLIENT__) {
    const wls = window.location.search;
    const wQuery = wls.startsWith('?') ? qs.parse(wls.substr(1)) : {};
    if (wQuery && wQuery.__locale) return wQuery.__locale;
    if (Cookies.get('locale')) return Cookies.get('locale');
    if (getWindowLocale()) return getWindowLocale();
  }
  return null;
}
