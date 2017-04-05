import getAuth from './Auth';
import getUser from './User';
import getPassport from './Passport';
import getUpload from '../upload';


export default (ctx, params) => {
  const upload = getUpload(ctx);
  const api = ctx.asyncRouter();

  api.use('/auth', getAuth(ctx, params));
  api.use('/user', getUser(ctx, params));
  api.use('/passport', getPassport(ctx, params));
  api.use('/upload', upload);

  // api.all('/send', async (req) => {
  //   const params = req.allParams();
  //   return ctx.modules.mailer.send({
  //     to: 'shitric2@gmail.com',
  //     template: params.type || 'recovery',
  //     params: {
  //       user: await ctx.models.User.findOne(),
  //       password: '123456',
  //     },
  //     // options: {
  //     //   subject: params.subject || 'Восстановление пароля',
  //     // },
  //   });
  // });
  api.all('*', () => {
    throw ctx.errors.e404('No such API method');
  });

  return api;
};
