// import axios from 'axios';
// import plivo from 'plivo';
const plivo = require('plivo');

export default class SmsPlivo {
  constructor(config) {
    this.config = config;
    this.client = new plivo.Client(config.authId, config.authToken);
  }
  send({ phone, text, ...params } = {}) {
    return this.client.messages.create(
      this.config.phone, // src
      phone, // dst
      text, // text
    ).then((response) => {
      console.log(response);
    }, (err) => {
      console.error(err);
    });
  }
}
