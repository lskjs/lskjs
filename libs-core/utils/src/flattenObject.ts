const flattenObject = (ob) => {
  const toReturn = {};

  // Object.keys(ob).forEach((key) => {
  for (const i in ob) {  //eslint-disable-line
    if (!ob.hasOwnProperty(i)) continue;  //eslint-disable-line
    if (typeof ob[i] === 'object') {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {  //eslint-disable-line
        if (!flatObject.hasOwnProperty(x)) continue;  //eslint-disable-line

        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export default flattenObject;
