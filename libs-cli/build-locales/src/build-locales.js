import { log } from '@lskjs/log/log';
import getKeyValJson from '@lskjs/utils/getKeyValJson';
import parse from 'csv-parse';
import fs from 'fs';
import forEach from 'lodash/forEach';
import groupBy from 'lodash/groupBy';
import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import { promisify } from 'util';

const parseAsync = promisify(parse);

export default async (spreadsheets, locales, destination) => {
  const localesRows = [];
  await Promise.all(
    spreadsheets.map(async (spreadsheet) => {
      const rows = await parseAsync(spreadsheet, { columns: true });
      localesRows.push(...rows);
    }),
  );
  try {
    log.trace(`rm ${destination}`);
    rimraf.sync(destination);
  } catch (err) {
    log.error(`rimraf err ${destination}`, err);
  }
  try {
    log.trace(`mkdir -p ${destination}`);
    mkdirp.sync(destination);
  } catch (err) {
    log.error(`mkdirp err ${destination}`, err);
  }
  locales.forEach((locale) => {
    const dirname = path.join(destination, locale);
    fs.writeFileSync(
      `${dirname}.json`,
      JSON.stringify(getKeyValJson(localesRows, locale), null, 2),
    ); // eslint-disable-line max-len
    // fs.writeFileSync(`${dirname}/translation.json`, JSON.stringify(getKeyValJson(localesRows, locale), null, 2)); // eslint-disable-line max-len
    const namespaces = groupBy(
      localesRows.filter((row) => row.ns),
      'ns',
    );
    forEach(namespaces, (rows, pns) => {
      const ns = String(pns).trim();
      if (!ns) return;
      try {
        mkdirp.sync(dirname);
      } catch (err) {
        log.error(err);
      }
      fs.writeFileSync(
        `${dirname}/${ns}.json`,
        JSON.stringify(getKeyValJson(rows, locale), null, 2),
      );
    });
  });
};
