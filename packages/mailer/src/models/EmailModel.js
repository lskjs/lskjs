import Model from '@lskjs/db/Model';

export class EmailModel extends Model {
  static schema = {
    uid: {
      type: Number,
      required: true,
    },
    threadId: {
      type: Model.Types.ObjectId,
      ref: 'Thread',
      index: true,
    },
    subtype: {
      // Тип, входящая/исходящая почта
      type: String,
      required: true,
      enum: [
        'i', // входящая почта
        'o', // исходящая почта
      ],
    },
    info: {
      cc: {
        type: Array,
      },
      bcc: {
        type: Array,
      },
      text: {
        // Текст письма
        type: String,
      },
      html: {
        // html письма
        type: String,
      },
      subject: {
        // тема письма
        type: String,
        index: true,
      },
      receivedDate: {
        // дата получения, у отправленных ее почему то нет
        type: Date,
        index: true,
      },
      date: {
        // дата отправки
        type: Date,
        index: true,
      },
      references: {
        type: [String],
        index: true,
      }, // Нужно для reply (id сообщений которые шли до этого сообщения в переписке)
      messageId: {
        type: String,
        index: true,
      }, // Нужно для reply (id сообщения в переписке)
      mailbox: {
        type: String,
        index: true,
      }, // Почтовый ящик для которого было спарсено письмо
      box: {
        type: String,
        index: true,
      }, // ящик из которого было спарсено письмо
    },
    from: {
      // от кого
      address: {
        // почта
        type: String,
      },
      name: {
        // имя
        type: String,
      },
      userId: {
        // ID юзера в системе(может и не быть)
        type: Model.Types.ObjectId,
        ref: 'User',
        index: true,
      },
    },
    to: {
      // кому
      address: {
        // почта
        type: String,
      },
      name: {
        // имя
        type: String,
      },
      userId: {
        // ID юзера в системе(может и не быть)
        type: Model.Types.ObjectId,
        ref: 'User',
        index: true,
      },
    },
    meta: {
      type: Object,
    },
  };
  static options = {
    model: 'Email',
    collection: `mailer_email`,
  };
  static initSchema(schema) {
    schema.virtual('fromUser', {
      ref: 'User', // The model to use
      localField: 'from.userId', // Find people where `localField`
      foreignField: '_id', // is equal to `foreignField`,
      justOne: true,
    });
    schema.virtual('toUser', {
      ref: 'User', // The model to use
      localField: 'to.userId', // Find people where `localField`
      foreignField: '_id', // is equal to `foreignField`,
      justOne: true,
    });
  }
}

export default EmailModel;
