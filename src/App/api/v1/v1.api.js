import getAuth from './Auth';
import getUser from './User';
// import getPassportApi from './passport/passport.api';

export default (ctx, params) => {
  const api = ctx.asyncRouter();

  // api.use('/passport', getPassportApi(ctx));
  api.use('/auth', getAuth(ctx, params));
  api.use('/user', getUser(ctx, params));

  api.get('/auth/vkontakte', ctx.passport.authenticate('vkontakte',
      { scope: ctx.config.auth.socials.vkontakte.scope },
    ));
  api.get('/auth/:provider/callback', async (req, res) => {
    const params = req.allParams();
    try {
      return new Promise((resolve) => {
        return (ctx.passport.authenticate(params.provider, {}, (err, data) => {
          if (err) {
            return resolve({ err });
          }
          if (data.passport) {
            const { passport } = data;
            return resolve(res.redirect(`${ctx.config.protocol}://${ctx.config.host}:${ctx.config.externalPort}/auth/passport?p=${passport.generateToken()}`));
          }
        }))(req);
      });
    } catch (err) {
      console.error(err, 'ERROR!');
    }
      // try {
      //   return new Promise((resolve) => {
      //     (ctx.passport.authenticate(params.provider, {}, (err, {
      //       passport,
      //     }) => {
      //       return resolve(res.redirect(`${ctx.config.protocol}://${ctx.config.host}:${ctx.config.externalPort}/auth/${params.provider}?p=${passport.generateToken()}`));
      //     }))(req);
      //   });
      // } catch (err) {
      //   return { err };
      // }
  });


  api.all('*', () => {
    throw ctx.errors.e404('no such api method');
  });

  return api;
};
