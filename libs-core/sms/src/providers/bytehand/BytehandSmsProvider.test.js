/* eslint-disable no-console */
import polyfill from '@lskjs/utils/polyfill';

import BytehandSmsProvider from './BytehandSmsProvider';

polyfill();

const sms = new BytehandSmsProvider({
  apiKey: process.env.SMS_API_KEY,
  sender: 'SMS-INFO',
});
sms
  .send({
    phone: '+35796101148',
    text: 'Your auth code: 234567',
  })
  .catch((err) => console.error('sms.send err', err))
  .then((ok) => console.log('sms.send ok', ok));
sms
  .send({
    phone: '+35796101148',
    sender: 'MyShop',
    text: 'Today only! 20% off for all goods!!',
  })
  .catch((err) => console.error('sms.send err', err))
  .then((ok) => console.log('sms.send ok', ok));
