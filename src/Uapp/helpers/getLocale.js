import Cookies from 'js-cookie';

function getLocaleStr() {
  let locale;
  if (__SERVER__) {
    if (this.state?.locale) return this.state?.locale;
    if (this.state2?.locale) return this.state2?.locale;
    if (this.user?.locale) return this.user?.locale;
    if (this.req?.cookies?.locale) return this.req?.cookies?.locale;
  }
  if (__CLIENT__) {
    locale = Cookies.get('locale');
    if (locale) return locale;
  }
  if (__CLIENT__) {
    locale = window.navigator.userLanguage || window.navigator.language;
    if (locale) return locale;
  }
  return locale;
}

export default function (lng) {
  let locale = lng || getLocaleStr.bind(this)();
  if (locale) locale = locale.split('-')[0];

  const { locales } = this.config;
  if (!locales.includes(locale)) {
    locale = locales[0];
  }

  return locale;
}
