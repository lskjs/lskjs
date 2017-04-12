export default function () {
  return {
    Users: require('./UsersStore').default(...arguments),
  };
}
