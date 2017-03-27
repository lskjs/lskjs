import Page from './Page';

export default (app, { req, reqCtx, app: app2 }) => {
  // console.log('reqCtx.rootState', reqCtx.rootState);
  // console.log(reqCtx, app2);
  const uapp = {
    umodels: app.getUmodels && app.getUmodels() || {},
    rootState: reqCtx.rootState,
  };
  const data = {
    uapp,
    page: new Page({}, { uapp }),
    Page,
  };
  reqCtx.provider && reqCtx.provider.setData && reqCtx.provider.setData(data);
  return data;
};
