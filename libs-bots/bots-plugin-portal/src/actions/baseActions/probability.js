export default async function ({ value, then, else: elseThen }) {
  let res = {};
  if (Math.random() < value) {
    res = { value: 'then' };
    if (!then) return res;
    return {
      ...res,
      ...(await this.runAction(then)),
    };
  }
  res = { value: 'else' };
  if (!elseThen) return res;
  return {
    ...res,
    ...(await this.runAction(elseThen)),
  };
}
