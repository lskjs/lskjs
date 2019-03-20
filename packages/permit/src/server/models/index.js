export default function () {
  return {
    PermitModel: require('./PermitModel').default(...arguments),
  };
}
