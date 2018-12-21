export default function (params = {}) {
  const config = this.config.i18 || params;
  const lng = this.getLocale();
  const cnf = {
    lng,
    ...config,
  };
  return cnf;
}