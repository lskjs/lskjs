/* eslint-disable import/no-extraneous-dependencies */
import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';

export default <T>(collection: Array<T>, predicate: () => boolean): Array<Array<T>> => {
  const chunks: Array<Array<T>> = [];
  const counts = {};
  const groups = groupBy(collection, predicate);
  while (Object.keys(groups).length) {
    forEach(groups, (group, key) => {
      const count = get(counts, key, 0);
      let chunk = chunks[count];
      if (!chunk) {
        chunk = [];
        chunks[count] = chunk;
      }
      chunk.push(group.pop()); // TODO: подумать повнимательнее
      set(counts, key, count + 1);
      if (group.length === 0) delete groups[key];
    });
  }
  return chunks;
};
