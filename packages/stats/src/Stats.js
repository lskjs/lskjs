import { isDev } from '@lskjs/env';
import Module from '@lskjs/module';
// import Module from '@lskjs/module';
import beauty from '@lskjs/utils/beauty';
import inc from '@lskjs/utils/inc';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import round from 'lodash/round';
import set from 'lodash/set';

const sec = 1000;
const min = 60 * sec;
const hour = 60 * min;

export class Stats extends Module {
  // extends Module {
  storages = {};
  // eslint-disable-next-line no-console
  printOptions = {
    skipFlood: false,
    prefix: 'all',
    successKey: 'event.success',
    unsuccessKey: 'event.error',
  };
  floodTime = isDev ? sec : min;
  printInterval = isDev ? sec : min;
  info = {
    names: isDev ? ['sec10', 'min1', 'all'] : ['sec10', 'min1', 'all'],
    // names: isDev ? ['sec10', 'min1', 'all'] : ['min1', 'hour1', 'all'],
    sec10: 10 * sec,
    min1: min,
    min10: 10 * min,
    hour1: hour,
    // day: 24 60 * * 60 * 1000,
    all: 365 * 24 * hour,
  };
  // static create(props) {
  //   return new this(props);
  // }
  getStorages(prefix) {
    return this.info.names.map((name) => {
      const key = [prefix, name].filter(Boolean).join('.');
      if (!get(this.storages, key)) set(this.storages, key, {});
      return get(this.storages, key);
    });
  }
  trigger({ startedAt, prefix = 'all', ...types }) {
    this.clean();
    const storages = this.getStorages(prefix);
    storages.forEach((storage) => {
      inc(storage, 'count');
      forEach(types, (preval, name) => {
        if (preval == null) return;
        const val = String(preval);
        const key = [name.replace(/\./g, '_'), val.replace(/\./g, '_')].filter(Boolean).join('.');
        inc(storage, key);
        if (!get(storage, 'start')) set(storage, 'start', new Date());
        set(storage, 'last', new Date());
      });
    });
  }
  clean() {
    let isRemove = false;
    forEach(this.storages, (storage, storageName) => {
      forEach(this.info.names, (gap) => {
        const time = this.info[gap];
        const key = [storageName, gap, 'start'].join('.');

        const start = get(this.storages, key);
        const isExpired = +start + time < Date.now();
        if (isExpired) {
          set(this.storages, [storageName, gap].join('.'), null);
          isRemove = true;
        }
        // console.log((start + time), { key, start, time, isExpired });
        // console.log({ key, start, time, isExpired });
      });
    });

    return isRemove;
  }
  // start() {
  //   return this.run();
  // }
  startTimer() {
    this.runPrint(this.printOptions);
  }
  stopTimer() {
    this.printSummary();
    clearInterval(this.interval);
  }
  runPrint(props) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.print(props);
    this.interval = setInterval(() => {
      this.print(props);
    }, this.printInterval);
  }

  printSummary(props = {}) {
    return this.print({ ...props, skipFlood: true, summary: true });
  }
  print({
    skipFlood = false,
    summary = false,
    prefix = 'all',
    successKey = 'event.success',
    unsuccessKey = 'event.error',
  } = {}) {
    const isFlood = !skipFlood && this.printedAt && this.printedAt + this.floodTime > Date.now();
    if (isFlood) return false;
    this.printedAt = Date.now();
    const [name1, name2, name3] = this.info.names;
    const storages = this.storages[prefix];

    const now = () => Date.now();

    const acks1 = get(storages, `${name1}.${successKey}`, 0);
    const time1 = now(get(storages, `${name1}.last`)) - get(storages, `${name1}.start`);
    const acks2 = get(storages, `${name2}.${successKey}`, 0);
    const time2 = now(get(storages, `${name2}.last`)) - get(storages, `${name2}.start`);
    const acks3 = get(storages, `${name3}.${successKey}`, 0);
    const time3 = now(get(storages, `${name3}.last`)) - get(storages, `${name3}.start`);
    const acksPercent3 = round((get(storages, `${name3}.${successKey}`, 0) / get(storages, `${name3}.count`, 0)) * 100);

    const nacks1 = get(storages, `${name1}.${unsuccessKey}`, 0);
    const nacksPercent1 = round(
      (get(storages, `${name1}.${unsuccessKey}`, 0) / get(storages, `${name1}.count`, 0)) * 100,
    );
    const nacks3 = get(storages, `${name3}.${unsuccessKey}`, 0);
    const nacksPercent3 = round(
      (get(storages, `${name3}.${unsuccessKey}`, 0) / get(storages, `${name3}.count`, 0)) * 100,
    );

    const others1 = get(storages, `${name1}.count`, 0) - acks1 - nacks1;
    const othersPercent1 = round((others1 / get(storages, `${name1}.count`, 0)) * 100);
    const others3 = get(storages, `${name3}.count`, 0) - acks3 - nacks3;
    const othersPercent3 = round((others3 / get(storages, `${name3}.count`, 0)) * 100);

    const speed1 = !time1 ? null : `${beauty((acks1 / time1) * sec, 2)}/s`;
    const speed2 = !time2 ? null : `${beauty((acks2 / time2) * min)}/m`;
    const speed3 = !time3 ? null : `${beauty((acks3 / time3) * hour)}/h`;
    const speed4 = !time3 ? null : `${beauty((acks3 / time3) * 24 * hour)}/d`;

    // const speed1 = `${round(count / (get(storages, 'name1.last', new Date()) - get(storages, 'name1.start', new Date())) * sec, 2)}/s`;
    // // const speed1 = `${round(count / (get(storages, 'name1.last', new Date()) - get(storages, 'name1.start', new Date())) * sec, 2)}/s`;

    // const speed1 = (name, count) => `${round() * sec, 2)}/s`;
    // const speed2 = (name, count) => `${round(count / (get(storages, [name, 'last'].join('.'), new Date()) - get(storages, [name, 'start'].join('.'), new Date())) * min, 1)}/m`;
    // const speed3 = (name, count) => `${round(count / (get(storages, [name, 'last'].join('.'), new Date()) - get(storages, [name, 'start'].join('.'), new Date())) * hour)}/h`;
    // const getSuccess
    let str;
    // if (summary) {
    if (summary) {
      // console.log(JSON.stringify(this.storages, null, 2));
      const speed1all = !time1 ? null : `${beauty((acks3 / time3) * sec, 2)}/s`;
      const speed2all = !time2 ? null : `${beauty((acks3 / time3) * min)}/m`;
      const speed3all = !time3 ? null : `${beauty((acks3 / time3) * hour)}/h`;
      const speed4all = !time3 ? null : `${beauty((acks3 / time3) * 24 * hour)}/d`;

      const speed = [speed1all, speed2all, speed3all, speed4all].map((a) => String(a || '').padStart(8)).join(' ');
      str = `\
      ✅🥳 ${`${acks3} (${acksPercent3}%)`.padEnd(8)} ${speed}  \
      ${others3 ? `   ❓  ${others3} (${othersPercent3}%)` : ''} \
      ${nacks3 ? ` ⚠️  ${nacks3} (${nacksPercent3}%)` : ''} \
      ${nacks3 || others3 ? ' all time' : ''} \
      `.trim();
    } else {
      const speed = [speed1, speed2, speed3, speed4].map((a) => String(a || '').padStart(8)).join(' ');
      str = `\
      ✅ ${String(acks3).padEnd(8)} ${speed} \
      ${others1 ? `   ❓  ${others1} (${othersPercent1}%)` : ''} \
      ${nacks1 ? ` ⚠️  ${nacks1} (${nacksPercent1}%)` : ''} \
      ${nacks1 || others1 ? ' last min' : ''} \
      `.trim();
    }
    // console.log('this', this.storages.all)
    this.log.debug(str);
    return true;
  }
}

export default Stats;
