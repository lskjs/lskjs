import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
export function getSchema(ctx) {
  const mongoose = ctx.db;
  const { ObjectId } = mongoose.Schema.Types;
  const schema = new UniversalSchema({
    userId: {
      type: ObjectId,
      ref: 'User',
      index: true,
    },
    offerId: {
      type: ObjectId,
      ref: 'Offer',
      index: true,
    },
    offerUserId: {
      type: ObjectId,
      ref: 'Offer',
      index: true,
    },
    status: {
      type: String,
      enum: [''],
      default: '',
    },
    info: {
      type: Object,
    },
  }, {
    timestamps: true,
  });

  schema.virtual('user', {
    ref: 'User', // The model to use
    localField: 'userId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });
  schema.virtual('offerUser', {
    ref: 'User', // The model to use
    localField: 'offerUserId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });
  schema.virtual('offer', {
    ref: 'Offer', // The model to use
    localField: 'offerId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`,
    justOne: true,
  });

  return schema;
}

export default(ctx) => {
  return ctx.db.model('Deal', getSchema(ctx).getMongooseSchema(), 'deals');
};
