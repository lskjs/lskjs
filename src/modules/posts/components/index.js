export default function () {
  return {
    Posts: require('./Posts').default(...arguments),
    Post: require('./Post').default(...arguments),
    PostEdit: require('./PostEdit').default(...arguments),
    PostCreate: require('./PostCreate').default(...arguments),
  };
}
