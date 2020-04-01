import get from 'lodash/get';
import set from 'lodash/set';
import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';

export default (collection, predicate) => {
  const chunks = [];
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
      chunk.push(group.pop());
      set(counts, key, count + 1);
      if (group.length === 0) delete groups[key];
    });
  }
  return chunks;
};
