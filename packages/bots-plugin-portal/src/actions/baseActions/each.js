import Bluebird from 'bluebird';
import shuffle from 'lodash/shuffle';

export default async function (objOrArray) {
  const { concurrency = 1, shuffle: isShuffle } = objOrArray;
  let { items } = objOrArray;
  if (isShuffle) items = shuffle(items);
  return {
    items: await Bluebird.map(items, (item) => this.runAction(item), { concurrency }),
  };
}
