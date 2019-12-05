import Err from './Err';

export default function e(...params) {
  const err = new Err(...params);
  if (err.message) return err;
  const errCode = `errors.${err.code || 'hz'}`;
  if (this.t) {
    err.message = this.t(errCode);
  } else if (this.i18 && this.i18.t) {
    err.message = this.i18.t(errCode);
  }
  return err;
}
