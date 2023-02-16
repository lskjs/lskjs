// { action: 'wait' }, = 1-5 sec
// { action: 'wait', value: [2000, 10000] }, = 2-10 sec
// { action: 'wait', multi: 3 }, = 3-15 sec
// { action: 'wait', multi: 6 }, = 6-30 sec

export default async function ({ value: values, multi = 1 } = {}) {
  // console.log('WAIT', values)
  let from = 1000;
  let to = 5000;

  try {
    [from = 1000, to = 5000] = values || [];
  } catch (err) {
    // eslint-disable-next-line no-console
    this.log.error('ACTION WAIT ERR', err);
  }

  const delay = await this.randomDelay(from * multi, to * multi);
  return { value: delay };
}
