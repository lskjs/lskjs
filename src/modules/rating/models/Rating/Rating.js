import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
export function getSchema(ctx) {
  const mongoose = ctx.db;
  const schema = new UniversalSchema({
    subjectId: {
      type: String,
      index: true,
      required: true,
    },
    subjectType: {
      type: String,
      index: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'like', // Или лайк или ничего
        'likeDislike', // Лайк и дизлайк
        'rating', // Оценка 1 - 10
        'view', // Просмотр
      ],
      index: true,
    },
    value: {
      type: Number,
      required: true,
      index: true,
    },
  });

  schema.virtual('user', {
    ref: 'User', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });

  schema.pre('validate', function (next) {
    const config = ctx.config.rating;
    if (config.subjects[this.subjectType]) {
      const { type, values } = config.subjects[this.subjectType];
      if (type && type !== this.type) return next(ctx.errors.e400(`Тип ${this.type} не разрешен`));
      if (type === 'like') {
        if ([0, 1].indexOf(this.value) === -1) {
          return next(ctx.errors.e400('Value может принимать значения: 0, 1'));
        }
      }
      if (type === 'likeDislike') {
        if ([-1, 0, 1].indexOf(this.value) === -1) {
          return next(ctx.errors.e400('Value может принимать значения: -1, 0, 1'));
        }
      }
      if (values) {
        if (this.value !== 0) {
          if (typeof values.min !== 'undefined' && values.min > this.value) {
            return next(ctx.errors.e400(`Значение ${this.value} меньше минимального значения(${values.min})`));
          }
          if (typeof values.max !== 'undefined' && values.max < this.value) {
            return next(ctx.errors.e400(`Значение ${this.value} болше максимального значения(${values.max})`));
          }
        }
      }
    }
    return next();
  });

  // api/v1/module/notification POST socket
  // api/v1/admin/module/notification POST

  return schema;
}

export default(ctx) => {
  return ctx.db.model('Rating', getSchema(ctx).getMongooseSchema(), 'ratings');
};
