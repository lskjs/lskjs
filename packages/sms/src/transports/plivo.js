// const { Client }= require('plivo');
import { Client } from 'plivo';

export default class SmsPlivo {
  constructor(config) {
    this.config = config;
    this.client = new Client(this.config.authId, this.config.authToken);
  }
  send({ phone, text, ...params } = {}) {
    return this.client.messages
      .create(
        this.config.phone, // src
        phone, // dst
        text, // text
      )
      .then(
        response => {
          console.log(response);
        },
        err => {
          console.error(err);
        },
      );
  }
}
