/* global test */
import BytehandSmsTransport from './BytehandSmsTransport';

const sms = new BytehandSmsTransport({
  apiKey: 'ab4db0b982dcd0ba63e44191e5d71ef8',
  sender: 'LSK',
});

test('test1 0', async () => {
  await sms.send({
    phone: '+35796101148',
    sender: 'MyShop',
    text: 'Today only! 20% off for all goods!!',
  });
});
