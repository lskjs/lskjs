import fileUpload from 'express-fileupload';
import getResource from './Offer.resource';

export default function getApi(ctx, params) {
  const api = ctx.asyncRouter();
  const resource = new getResource(ctx);

  api.post('/create', fileUpload(), resource.create);

  return api;
}
