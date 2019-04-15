/* eslint-disable global-require */
export default {
  Api: require('./Api').default,
  CrudApi: require('./CrudApi').default,

  Store: require('./Store').default,
  ApiStore: require('./ApiStore').default,
  CrudStore: require('./CrudStore').default,

  FetchStore: require('./FetchStore').default,
  ListStore: require('./ListStore').default,
  SelectStore: require('./SelectStore').default,
};
