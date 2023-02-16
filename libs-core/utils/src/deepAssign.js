export default (object, key, value) => {
  let index;
  let prefix;
  key = key.replace(/]/g, '');
  while (true) {
    index = key.search(/\.|\[/g);
    if (index === -1) {
      break;
    }
    prefix = key.substr(0, index);
    if (object[prefix] == null) {
      if (key[index] === '.') {
        object[prefix] = {};
      } else {
        object[prefix] = [];
      }
    }
    key = key.substr(index + 1);
    object = object[prefix];
  }
  return (object[key] = value);
};
