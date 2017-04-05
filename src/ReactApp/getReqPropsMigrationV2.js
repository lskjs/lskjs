import Page from './Page';

export default (app, { req, reqCtx, app: app2 }) => {
  // console.log('reqCtx.rootState', reqCtx.rootState);
  // console.log(reqCtx, app2);
  if (reqCtx.provider && reqCtx.provider.initV2 ) {
    return reqCtx.provider.initV2({
      umodels: app.getUmodels && app.getUmodels() || {},
      rootState: reqCtx.rootState,
      Page
    });
  } else {
    throw 'Provider.initV2 is undefined'
  }
};
