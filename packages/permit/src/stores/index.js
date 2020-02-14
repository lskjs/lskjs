export default function (ctx) {
  return {
    PermitStore: require('./PermitStore').default(ctx),
  };
}
