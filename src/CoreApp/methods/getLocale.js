export default function (lng) {
  let locale = lng;
  if (locale) locale = locale.split('-')[0];

  const { locales } = this.config.client;
  if (!locales.includes(locale)) {
    locale = locales[0];
  }

  return locale;
}
