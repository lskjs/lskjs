import canonizePhone from '@lskjs/utils/canonizePhone';
import validatePhone from '@lskjs/utils/validatePhone';
import Err from '@lskjs/utils/Err';

export default class SmsTransport {
  constructor(config) {
    if (!config) throw '!config ';
    this.config = config || {};

    this.debug = this.config.debug || __DEV__;

    this.log = {
      trace(...args) {
        console.log(...args); // eslint-disable-line no-console
      },
      error(...args) {
        console.error(...args); // eslint-disable-line no-console
      },
    };
  }
  getPhone(props = {}) {
    const phone = canonizePhone(props.phone || props.to);
    if (!validatePhone(phone)) throw new Err('sms.phoneInvalid');
    return phone;
  }
  getText(props = {}) {
    const text = String(props.text || '').trim();
    if (!text) throw new Err('sms.textInvalid');
    return text;
  }
  getSender(props = {}) {
    return props.sender || this.config.sender;
  }
  async send(props = {}) {
    const phone = this.getPhone(props);
    const text = this.getText(props);
    const sender = this.getSender(props);
    if (this.debug) {
      this.log.verbose(`Sms.send[${this.name}] ${sender || ''} => ${phone}: ${text}`);
    }
    return this._send({ ...props, phone, text, sender });
  }
}
