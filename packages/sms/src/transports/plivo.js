// const { Client }= require('plivo');
import { Client } from 'plivo';

export default class SmsPlivo {
  constructor(config) {
    this.config = config || {};
    this.client = new Client(this.config.authId, this.config.authToken);
  }
  getSender(phone = '') {
    const { phones } = this.config;
    if (phones && phones.length) {
      const filtered = phones.filter(p => phone[0] === p[0]);
      if (filtered.length) return filtered[0];
      return phones[0];
    }
    if (this.config.phone) return this.config.phone;
    return null;
  }
  send({ phone, text } = {}) {
    const sender = this.getSender(phone);
    this.app.log.trace(`Sms.send[plivo] ${sender} => ${phone}: ${text}`);
    return this.client.messages
      .create(
        sender,
        phone, // dst
        text, // text
      )
      .then(
        response => {
          this.app.log.trace(`Sms.send[plivo]`, response);
        },
        err => {
          this.app.log.error(`Sms.send[plivo]`, err);
        },
      );
  }
}
