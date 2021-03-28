import Err from '@lskjs/utils/Err';
import Bluebird from 'bluebird';
import { Client } from 'yapople';

export const readAndDeleteEmails = async ({ username, ...params }) => {
  let client;
  if (username.includes('@mail.ru')) {
    client = new Client({
      host: 'pop.mail.ru',
      port: 995,
      tls: true,
      mailparser: true,
      ...params,
    });
  } else {
    throw new Err('UNKNOWN_MAIL_PROVIDER');
  }

  await client.connect();
  const [, ...messages] = await client.retrieveAndDeleteAll();
  await client.quit();
  return messages;
};

export async function getEmailCode({ type = 'instagram', props }) {
  console.log('readInstagramCodeFromEmail [type]', type, props);
  const messages = await readAndDeleteEmails(props);
  console.log('messages', messages);
  // TODO: добавить проверку на headers.from.date Tue, 9 Mar 2021 05:54:04 -0800
  const codes = messages
    .filter((m) => m.headers && m.headers.from && m.headers.from.include('security@mail.instagram.com'))
    .map((m) => {
      const match = m.html.match(/size="6">(\d+)</i);
      console.log('match', match);

      return match && match[1];
    })
    .filter(Boolean);

  console.log('codes', codes);
  return codes[0];
}

// headers: {
//   'delivered-to': 'joloqi_957@mail.ru',
//   'return-path': '<security@mail.instagram.com>',

//   headersfrom

//   to: 'joloqi_957@mail.ru',
//   subject: 'Verify Your Account',
//   'x-priority': 'normal',
//   'x-mailer': 'ZuckMail [version 1.00]',
//   from: '"Instagram" <security@mail.instagram.com>',

//   headers.from: '"Instagram" <security@mail.instagram.com>',
//   headers.from.date: 'Tue, 9 Mar 2021 05:54:04 -0800',

//   html: <p style="margin:10px 0 10px 0;color:#565a5c;font-size:18px;"><font size="6">254876</font>

export default getEmailCode;
