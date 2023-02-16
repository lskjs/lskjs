/* global window */
import { isClient } from '@lskjs/env';
import Cookies from 'js-cookie';
import qs from 'querystring';

function getWindowLocale() {
  const locale = window.navigator.userLanguage || window.navigator.language;
  if (!locale) return null;
  return locale.split('-')[0];
}

export default function getLocale() {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const uapp = this;
  const locale = uapp && uapp.req && uapp.req.locale;
  if (locale) return locale;
  if (isClient) {
    if (window.__ROOT_STATE__ && window.__ROOT_STATE__.req && window.__ROOT_STATE__.req.locale) {
      return window.__ROOT_STATE__.req.locale;
    }
    const wls = window.location.search;
    const wQuery = wls.startsWith('?') ? qs.parse(wls.substr(1)) : {};
    if (wQuery && wQuery.__locale) return wQuery.__locale;
    if (Cookies.get('locale')) return Cookies.get('locale');
    if (getWindowLocale()) return getWindowLocale();
  }
  return null;
}
