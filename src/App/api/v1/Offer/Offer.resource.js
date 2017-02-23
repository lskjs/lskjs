import getModules from '../v1.modules';

export default (ctx) => {
  const { Offer } = ctx.models;
  const modules = new getModules(ctx);
  const resource = {
    create: async (req) => {
      const criteria = modules.getCriteria(req);
      const photo = await modules.uploadImage(req, 'photo');
      const fields = {
        ...req.body,
        photo,
      };
      const existOffer = await Offer.findOne(criteria);
      if (existOffer) throw ctx.errors.e400('Offer already exists');

      const offer = new Offer(fields);
      await offer.save();

      return offer;
    },
  };
  return resource;
}
