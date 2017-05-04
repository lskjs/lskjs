import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';

export function getSchema(ctx) {
  const { db } = ctx;
  const schema = new UniversalSchema({
    userId: { // id создателя
      type: db.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    dealId: { // Выбранный deal
      type: db.Schema.Types.ObjectId,
      ref: 'Deal',
      default: null,
      index: true,
    },
    title: { // название
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    price: { // Цена, может быть не утверждена
      type: Number,
      default: null,
    },
    term: { // Возможно количество дней/часов, пока дней
      type: Number,
    },
    type: { // Без понятия
      type: String,
      // required: true,
    },
    info: {
      content: { // Описание
        type: Object,
        required: true,
        trim: true,
      },
      attachments: { // Прикрепленные файлы
        type: [Object],
        default: null,
      },
    },
    finishedAt: { // Дата окончания
      type: Date,
      default: null,
    },
    public: { // Публичное ли задание
      type: Boolean,
      default: true,
    },
    status: { // Тоже хз
      type: String,
      enum: ['notStarted', 'inProgress', 'review', 'finished'], // МНОГО МНОГО
      default: 'notStarted',
      index: true,
    },
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

  schema.virtual('user', {
    ref: 'User', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });

  return schema;
}

export default(ctx) => {
  return ctx.db.model('Offer', getSchema(ctx).getMongooseSchema(), 'offers');
};
