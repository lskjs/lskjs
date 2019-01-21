export default function () {
  return {
    Store: require('./Store').default,
    EntityStore: require('./EntityStore').default,
    ListStore: require('./ListStore').default,
    SelectStore: require('./SelectStore').default,
    PageStore: require('./PageStore').default,
    ListPageStore: require('./ListPageStore').default,

    Entity: require('./EntityStore').default,
    List: require('./ListStore').default,
    Select: require('./SelectStore').default,
    Page: require('./PageStore').default,
    ListPage: require('./ListPageStore').default,

  };
}
