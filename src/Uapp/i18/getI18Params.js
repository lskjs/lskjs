export default function (params = {}) {
  const config = this.config.i18;
  const cnf = {};
  if (__CLIENT__) {
    const lng = this.getLocale();
    cnf.lng = lng;
  }
  Object.assign(cnf, config, params);
  return cnf;
}
