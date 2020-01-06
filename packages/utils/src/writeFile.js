import fs from 'fs';

export default (file, data, { debug, ...options } = {}) => new Promise((resolve, reject) => {
  fs.mkdir(file, { recursive: true }, (err) => {
    if (err) return reject(err);
    return fs.writeFile(file, data, options, (err2) => {
      if (err2) return reject(err2);
      if (debug) console.log(` => ${file}`); // eslint-disable-line no-console
      return resolve();
    });
  });
});
