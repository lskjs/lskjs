import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
import set from 'lodash/set';
import last from 'lodash/last';

function getSchema(ctx, module) {
  const mongoose = ctx.db;
  const { ObjectId } = mongoose.Schema.Types;
  const schema = new UniversalSchema({
    managerIds: [
      { // ID ответственного менеджера
        type: ObjectId,
        ref: 'User',
      },
    ],
    lastEmailId: {
      type: ObjectId,
      ref: 'Email',
    },
    lastInEmailId: {
      type: ObjectId,
      ref: 'Email',
    },
    lastOutEmailId: {
      type: ObjectId,
      ref: 'Email',
    },
    channelId: {
      type: ObjectId,
      ref: 'Channel',
    },
    status: String,
    color: String,
    info: {
      subject: {
        type: String,
      },
      gmailThreadId: {
        type: String,
      },
    }, // нужно чтобы хранить всякую шнягу, offerId при рассылке о рекламе оффера и т.д
    meta: {
      summary: Object,
      apponentEmail: String,
      subject: String,
      lastInEmailDate: Date,
      lastOutEmailDate: Date,
    },
  }, {
    model: 'Thread',
    collection: module.prefix ? `${module.prefix}_thread` : 'thread',
    toObject: { virtuals: true },
  });

  schema.virtual('lastEmail', {
    ref: 'Email', // The model to use
    localField: 'lastEmailId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });
  schema.virtual('lastInEmail', {
    ref: 'Email', // The model to use
    localField: 'lastInEmailId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });
  schema.virtual('lastOutEmail', {
    ref: 'Email', // The model to use
    localField: 'lastOutEmailId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });
  schema.virtual('channel', {
    ref: 'Channel', // The model to use
    localField: 'channelId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });
  schema.virtual('managers', {
    ref: 'User', // The model to use
    localField: 'managerIds', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
  });

  schema.methods.getInfo = (summary) => {
    const { lastTransitionType, transitionsCount, lastTransitionLength } = summary;
    // transitionsCount - количество передач
    // lastTransitionLength - лина последней передачи
    // lastTransitionType - кто отвечал последний[in, out]
    // actualAt - дата когда нужно показывать карточку

    // inTransition - 1 col, есть ответ
    // inTransitions - 3 col, есть ответ 2+
    // outTransition - 2 col, пропушить
    // outTransitions - 4 col, пропушить 2+
    if (lastTransitionType === 'i') { // если последним написал блогер
      if (transitionsCount < 2) { // и количество передач < 2
        return { // 1 сol white
          status: 'inTransition',
          color: 'white',
        };
      }
      // если количество передач 2+
      return { // 3 col white
        status: 'inTransitions',
        color: 'white',
      };
    } else if (lastTransitionType === 'o') { // Если последним написал менеджер
      if (transitionsCount < 2) { // если количество передач < 2
        const res = { // 1 col
          status: 'outTransition',
        };
        if (lastTransitionLength === 1) { // если менеджер написал 1 раз, то белый
          res.color = 'white';
        } else if (lastTransitionLength === 2) { // если менеджер написал 2 раза, то желтый
          res.color = 'yellow';
        } else if (lastTransitionLength === 3) { // Если менеджер написал 3 раза - то красный
          res.color = 'red';
        } else if (lastTransitionLength > 3) { // Если менеджер написал больше 3 раз, скрываем
          return {
            status: 'archive',
            color: 'white',
          };
        }
        return res;
      }
      return { // 4 col white
        status: 'outTransitions',
        color: 'white',
      };
    }
    return null;
  };

  schema.methods.calculateSummary = function (emails = []) {
    const transitions = [];
    const chain = [];
    let inCount = 0;
    let outCount = 0;
    emails.forEach((email) => {
      if (email.subtype === 'i') {
        inCount += 1;
      } else if (email.subtype === 'o') {
        outCount += 1;
      }
      if (!transitions.length) {
        transitions.push(email.subtype);
      } else if (last(transitions) !== email.subtype) {
        transitions.push(email.subtype);
      }
      chain.push(email.subtype);
    });
    const lastTransitionType = last(chain);
    let lastTransitionLength = 0;
    for (const item of chain.reverse()) {
      if (lastTransitionType === item) {
        lastTransitionLength += 1;
      } else {
        break;
      }
    }
    return {
      chain,
      transitions,
      count: emails.length,
      outCount,
      inCount,
      transitionsCount: transitions.length,
      lastTransitionLength,
      lastTransitionType,
    };
  };

  schema.methods.updateMeta = async function () {
    const { Email } = module.models;
    const emails = await Email
      .find({ threadId: this._id })
      .select([
        'from.address',
        'to.address',
        'subtype',
        'info.subject',
        'info.date',
      ])
      .sort({ 'info.date': 1 })
      .lean();
    const summary = this.calculateSummary(emails);
    const info = this.getInfo(summary);
    if (info) {
      if (info.status) {
        this.status = info.status;
      }
      if (info.color) {
        this.color = info.color;
      }
    } else {
      this.status = null;
      this.color = null;
    }
    const lastEmailId = last(emails)?._id;
    let lastInEmailId;
    let lastOutEmailId;
    let apponentEmail;
    let subject;
    let lastInEmailDate;
    let lastOutEmailDate;
    emails.reverse().forEach((email) => {
      if (lastOutEmailId && lastInEmailId) return;
      if (!lastOutEmailId && email.subtype === 'o') {
        lastOutEmailId = email._id;
        if (!apponentEmail && email?.to?.address) {
          apponentEmail = email.to.address;
        }
        if (!subject && email?.info?.subject) {
          ({ subject } = email.info);
        }
        if (!lastOutEmailDate && email?.info?.date) {
          lastOutEmailDate = email.info.date;
        }
      }
      if (!lastInEmailId && email.subtype === 'i') {
        lastInEmailId = email._id;
        if (!apponentEmail && email?.from?.address) {
          apponentEmail = email.from.address;
        }
        if (!subject && email?.info?.subject) {
          ({ subject } = email.info);
        }
        if (!lastInEmailDate && email?.info?.date) {
          lastInEmailDate = email.info.date;
        }
      }
    });
    set(this, 'meta.apponentEmail', apponentEmail);
    set(this, 'meta.lastInEmailDate', lastInEmailDate);
    set(this, 'meta.lastOutEmailDate', lastOutEmailDate);
    set(this, 'meta.subject', subject);
    set(this, 'meta.summary', summary);
    this.markModified('meta');
    this.lastOutEmailId = lastOutEmailId;
    this.lastInEmailId = lastInEmailId;
    this.lastEmailId = lastEmailId;
    return this;
  };

  return schema;
}

export default(ctx, module) => {
  return getSchema(ctx, module).getMongooseModel(ctx.db);
};