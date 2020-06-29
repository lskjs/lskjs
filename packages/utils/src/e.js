import Err from './Err';

export default function e(...params) {
  const err = new Err(...params);
  if (err._message) return err;
  const errCode = `errors.${err.code || 'hz'}`;
  if (this.t) {
    err.message = this.t(errCode);
    err._message = err.message;
  } else if (this.i18 && this.i18.t) {
    err.message = this.i18.t(errCode);
    err._message = err.message;
  } else if (__DEV__) {
    // eslint-disable-next-line no-console
    console.error('utils/e i18 missing');
  }
  return err;
}
