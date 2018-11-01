import Imap from 'imap';
import m from 'moment';
import get from 'lodash/get';
import find from 'lodash/find';
import set from 'lodash/set';
import merge from 'lodash/merge';
import { MailParser } from 'mailparser';
import Promise from 'bluebird';

export default (ctx) => {
  // Должна быть выключена двухфакторная авторизация
  // Пример конфига
  // {
  //   "user": "email",
  //   "password": "qwertyui",
  //   "host": "imap.gmail.com",
  //   "port": "993",
  //   "tls": true
  // }
  return class MailerParserModule {
    async init() {
      // parser
      this.prefix = 'mailer';
      this.parserConfig = get(ctx, 'config.mailer.parser');
      this.defaultParserConfig = {
        parseInterval: 60000,
        parseTimeout: 300000,
        parseLimit: 100,
      };
      if (this.parserConfig) {
        this.parserConfig = merge(this.defaultParserConfig, this.parserConfig);
        this.imapConfig = this.parserConfig.config;
      }
      this.models = require('./models').default(ctx, this);
    }
    async run() {
      if (!this.parserConfig || !this.imapConfig) return;
      this.logger = ctx.createLogger({
        name: 'mailer',
        level: 'trace',
      });
      this.log('imap debug');
      this.log('imap parseInterval', this.parserConfig.parseInterval);
      this.connections = {};
      try {
        // console.time('imapParse');
        // await this.sync({ box: 'INBOX' });
        // await this.sync({ box: config.boxes.inbox });
        this.runCron();
        // console.timeEnd('imapParse');
      } catch (err) {
        console.error('imap run', err);  //eslint-disable-line
      }
    }
    log(...args) {
      if (this.debug) {
        this.logger.trace(...args);
      }
    }
    stop() {
      this.parserConfig.boxes(({ box }) => {
        this.disconnect({ connection: this.connections[box] });
      });
    }
    async syncAll() {
      this.log('syncAll');
      const { boxes } = this.parserConfig;
      await Promise.mapSeries(boxes, async (box) => {
        const { box: boxName } = box;
        this.connections[boxName] = await this.createConnection(box);
        await this.sync({ ...box, connection: this.connections[boxName] });
        await Promise.delay(500);
      });
    }
    async runCron() {
      if (__INSTANCE !== '1') return;
      try {
        await this.syncAll();
      } catch (err) {
        console.error('imap syncAll', err);  //eslint-disable-line
      }
      // console.log(config.parseInterval, 'config.parseInterval');
      setTimeout(() => this.runCron(), this.parserConfig.parseInterval);
    }
    async createConnection({ box }) {
      if (!this.parserConfig || !this.imapConfig) throw '!config';
      return new Promise((resolve, reject) => {
        const connection = new Imap(this.imapConfig);
        this.log('createConnection', { box });
        function openInbox(cb) {
          connection.openBox(box, true, cb);
        }
        let isReady = false;
        connection.once('ready', () => {
          this.log('openBox', box);
          openInbox((err) => {
            if (err) {
              this.log('openBox error', err);
              return reject(err);
            }
            isReady = true;
            this.log('box opened', { box });
            return resolve(connection);
          });
        });
        connection.on('error', (err) => {
          this.log('imap connection error', err);
          console.error('imap connection error', err);  //eslint-disable-line
          return reject(err);
        });
        connection.on('end', () => {
          // for andruxa debug
          this.log('connection end', { box });
          if (!isReady) reject();
        });
        connection.connect();
      });
    }
    disconnect({ connection }) {
      if (!this.parserConfig || !this.imapConfig) throw '!config';
      if (!connection) throw '!connection';
      return new Promise((resolve, reject) => {
        return connection.end((err, res) => {
          if (err) return reject(err);
          return resolve(res);
        });
      });
    }
    async saveEmail({ message, subtype = 'i' }) {
      const { Email, Thread } = this.models;
      const isExist = await Email.countDocuments({ uid: message.uid, 'from.address': message.from.address });
      if (isExist) return;
      const email = new Email({
        uid: message.uid,
        info: {
          date: message.date,
          text: message.text,
          html: message.html,
          receivedDate: message.receivedDate,
          subject: message.subject,
          references: message.references,
          messageId: message.messageId,
          cc: message.cc,
          bcc: message.bcc,
        },
        from: message.from,
        to: message.to,
        subtype,
      });
      const gmailThreadId = message['x-gm-thrid'];
      if (gmailThreadId) {
        let thread = await Thread
          .findOne({ 'info.gmailThreadId': gmailThreadId })
          .select(['_id']);
        if (!thread) {
          thread = new Thread({
            info: {
              gmailThreadId,
              subject: email.info.subject,
            },
          });
          await thread.save();
        }
        email.threadId = thread._id;
        await email.save();
        await thread.updateMeta();
        await thread.save();
        ctx.emit('models.Email.created', { email, thread });
      } else {
        await email.save();
        ctx.emit('models.Email.created', { email });
      }
    }
    async sync({ box = 'INBOX', connection, subtype }) {
      if (__STAGE === 'master') throw 'STAGE === master';
      const { Email } = this.models;
      const lastEmail = await Email
        .findOne({
          'info.date': {
            $exists: true,
          },
          subtype,
        })
        .sort({ 'info.date': -1 })
        .select(['info.date']);
      const filter = [];
      if (lastEmail) {
        try {
          const date = m(lastEmail.info.date)
            .add(-1, 'day')
            .locale('en')
            .format('LL');
          filter.push(['SINCE', date]);
        } catch (err) {
          console.error('imap, sync date error', err);  //eslint-disable-line
        }
      }
      this.log('filter', filter);
      if (!filter.length) filter.push('ALL');
      await this.searchAndSave({ filter, box, connection, subtype });
      this.disconnect({ connection });
    }
    async getMessages(f, length) {
      const messages = [];
      this.log('getMessages start', length);
      return new Promise((resolve, reject) => {
        f.on('message', (msg) => {
          const mp = new MailParser();
          msg.on('body', (stream) => {
            const message = {};
            msg.on('attributes', (attrs) => {
              message.attrs = attrs;
              stream.pipe(mp);
              mp.on('headers', (headers) => {
                message.headers = headers;
                mp.on('data', async (obj) => {
                  message.obj = obj;
                  messages.push(message);
                  this.log(`${messages.length}/${length}`, 'getMessages');
                  if (messages.length === length) resolve(messages);
                }).on('error', (dataError) => {
                  console.error('imap getMessages f on data', dataError)  //eslint-disable-line
                  reject(dataError);
                });
              }).on('error', (headersError) => {
                console.error('imap getMessages f on headers', headersError)  //eslint-disable-line
                reject(headersError);
              });
            }).on('error', (attrErrors) => {
              console.error('imap getMessages f on attributes', attrErrors)  //eslint-disable-line
              reject(attrErrors);
            });
          }).on('error', (bodyError) => {
            console.error('imap getMessages f on body', bodyError)  //eslint-disable-line
            reject(bodyError);
          });
        }).on('error', (error) => {
          console.error('imap getMessages f on message', error)  //eslint-disable-line
          reject(error);
        });
      });
    }
    async searchAndSave({ filter, connection, box = this.parserConfig.boxes.inbox, subtype }) {
      this.log('searchAndSave', { filter, box });
      return new Promise((resolve, reject) => {
        try {
          const fetchTimeout = setTimeout(() => {
            reject(new Error('timeout'));
          }, this.parserConfig.parseTimeout); // если парсить слишком долго, завис, то заканчиваем парсинг
          // connection.getBoxes((err2, boxes) => { // На всякий случай
          //   console.log({ err2, boxes });
          // });
          this.log('search', { box, filter, subtype });
          return connection.search(filter, async (searchErr, results) => {
            this.log('search result', { searchErr, results });
            if (searchErr) return reject(searchErr);
            if (!results.length) return resolve([]);
            const { Email } = this.models;
            const emails = await Email
              .find({
                uid: {
                  $in: results,
                },
              })
              .select(['uid']);
            results = results.filter((uid) => {
              return !find(emails, { uid });
            });
            if (results.length > this.parserConfig.parseLimit) {
              results = results.slice(0, this.parserConfig.parseLimit);
            }
            if (!results.length) return resolve([]);
            connection.on('error', (err) => {
              console.error('imap connection on error', err);  //eslint-disable-line
              reject(err);
            });
            const f = connection.fetch(results, {
              bodies: '',
              struct: true,
            });
            const messages = await this.getMessages(f, results.length);
            clearTimeout(fetchTimeout);
            this.log('getMessages completed');
            await Promise.map(messages, async ({ attrs, obj, headers }, i) => {
              const message = {
                headers: null,
                text: null,
                subject: null,
                html: null,
                uid: null,
              };
              try {
                // console.log(attrs);
                message.uid = attrs.uid;
                message.text = obj.text;
                message.html = obj.html;
                // console.log('////////////////////////////////');
                // console.log(message.text, 'text');
                // console.log(message.headers);
                message.subject = headers.get('subject');
                const from = headers.get('from');
                // console.log({ thrid });
                const to = headers.get('to');
                const cc = headers.get('cc');
                const bcc = headers.get('bcc');
                const messageId = headers.get('message-id');
                const references = headers.get('references');
                let received = headers.get('received');
                const date = headers.get('date');
                // console.log(date);
                if (cc?.value) {
                  message.cc = cc.value;
                }
                if (bcc?.value) {
                  message.bcc = bcc.value;
                }
                if (received) {
                  if (Array.isArray(received)) {
                    received = received[0];
                  }
                  if (received) {
                    const receivedDate = new Date(received.match(/; (.*)/)[1]);
                    message.receivedDate = receivedDate;
                  }
                }
                if (date) {
                  message.date = new Date(date);
                }
                // console.log(references, 'references');
                message.messageId = messageId;
                message.references = references;
                if (from) {
                  message.from = from.value[0];
                }
                if (to) {
                  message.to = to.value[0];
                } else {
                  const deliveredTo = headers.get('delivered-to');
                  if (deliveredTo?.value?.[0]) {
                    message.to = deliveredTo.value[0];
                  }
                }
                if (attrs['x-gm-thrid']) {
                  message['x-gm-thrid'] = attrs['x-gm-thrid']; // Gmail Thread Id
                }
                await this.saveEmail({ message, box, subtype });
              } catch (parseError) {
                console.error('imap sync search on "data"', parseError);  //eslint-disable-line
              }
              this.log(`${i + 1}/${results.length}`, 'saveEmail');
            }, { concurrency: 5 });
            this.log('parse completed', box);
            return resolve();
          });
        } catch (err) {
          console.error('imap search', err);  //eslint-disable-line
          return err;
        }
      });
    }
  };
};
