import axios from 'axios';
import Err from '@lskjs/utils/Err';
import SmsTransport from '../SmsTransport';

/**
 * Docs: https://www.bytehand.com/en/developers/v2/start
 */

const BASE = 'https://api.bytehand.com/v2';

export default class BytehandSmsTransport extends SmsTransport {
  name = 'bytehand';
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

  async _send({ phone, text, sender, ...params } = {}) {
    if (!this.config.apiKey) throw new Err('sms.invalidApiKey');
    const res = await axios({
      method: 'post',
      url: `${BASE}/sms/messages`,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Service-Key': this.config.apiKey,
      },
      data: {
        ...params,
        sender,
        receiver: phone,
        text,
      },
    });
    return res.data;
  }
}
