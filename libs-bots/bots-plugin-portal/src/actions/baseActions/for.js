import Bluebird from 'bluebird';
import random from 'lodash/random';
import range from 'lodash/range';

export default async function ({ value, count: initCount, item }) {
  const valueOrArray = initCount || value;
  let count;
  if (Array.isArray(valueOrArray)) {
    count = random(...valueOrArray);
  } else {
    count = valueOrArray;
  }
  return {
    count,
    items: await Bluebird.map(range(count), (i) => this.runAction(item, { i }), { concurrency: 1 }),
  };
}
