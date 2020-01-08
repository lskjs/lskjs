import fs from 'fs';
import path from 'path';

export default (filename, data, { debug, ...options } = {}) => new Promise((resolve, reject) => {
  fs.mkdir(path.dirname(filename), { recursive: true }, (err) => {
    if (err) return reject(err);
    return fs.writeFile(filename, data, options, (err2) => {
      if (err2) return reject(err2);
      if (debug) console.log(` => ${filename}`); // eslint-disable-line no-console
      return resolve();
    });
  });
});


// node -e "require('./packages/utils/build/writeFile').default('/tmp/test2/test.txt', 'txt').catch(err => console.log(err))"