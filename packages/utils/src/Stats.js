import set from 'lodash/set';
import get from 'lodash/get';
import round from 'lodash/round';
import forEach from 'lodash/forEach';
import inc from './inc';
import beauty from './beauty';

const sec = 1000;
const min = 60 * sec;
const hour = 60 * min;

export default class Stats {
  storages = {}
  floodTime = __DEV__ ? sec : min;
  info = {
    names: __DEV__ ? ['sec10', 'min1', 'all'] : ['min1', 'hour1', 'all'],
    // names: __DEV__ ? ['sec10', 'min1', 'all'] : ['min1', 'hour1', 'all'],
    sec10: 10 * sec,
    min1: min,
    min10: 10 * min,
    hour1: hour,
    // day: 24 60 * * 60 * 1000,
    all: 365 * 24 * hour,
  }
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


  print({ log = console.log, prefix = 'all', successKey = 'event.ack', unsuccessKey = 'event.nack' } = {}) {
    if (this.printedAt && (this.printedAt + this.floodTime) > Date.now()) return;
    this.printedAt = Date.now();
    const [name1, name2, name3] = this.info.names;
    const storages = this.storages[prefix];

    const acks1 = get(storages, `${name1}.${successKey}`, 0);
    const time1 = get(storages, `${name1}.last`) - get(storages, `${name1}.start`);
    const acks2 = get(storages, `${name2}.${successKey}`, 0);
    const time2 = get(storages, `${name2}.last`) - get(storages, `${name2}.start`);
    const acks3 = get(storages, `${name3}.${successKey}`, 0);
    const time3 = get(storages, `${name3}.last`) - get(storages, `${name3}.start`);
    const acksPercent3 = round(get(storages, `${name3}.${successKey}`, 0) / get(storages, `${name3}.count`, 0) * 100);

    const nacks1 = get(storages, `${name1}.${unsuccessKey}`, 0);
    const nacksPercent1 = round(get(storages, `${name1}.${unsuccessKey}`, 0) / get(storages, `${name1}.count`, 0) * 100);
    const nacks3 = get(storages, `${name3}.${unsuccessKey}`, 0);
    const nacksPercent3 = round(get(storages, `${name3}.${unsuccessKey}`, 0) / get(storages, `${name3}.count`, 0) * 100);


    const speed1 = !time1 ? null : `${beauty(acks1 / time1 * sec, 2)}/s`;
    const speed2 = !time2 ? null : `${beauty(acks2 / time2 * min)}/m`;
    const speed3 = !time3 ? null : `${beauty(acks3 / time3 * hour)}/h`;
    const speed4 = !time3 ? null : `${beauty(acks3 / time3 * 24 * hour)}/d`;

    // const speed1 = `${round(count / (get(storages, 'name1.last', new Date()) - get(storages, 'name1.start', new Date())) * sec, 2)}/s`;
    // // const speed1 = `${round(count / (get(storages, 'name1.last', new Date()) - get(storages, 'name1.start', new Date())) * sec, 2)}/s`;

    // const speed1 = (name, count) => `${round() * sec, 2)}/s`;
    // const speed2 = (name, count) => `${round(count / (get(storages, [name, 'last'].join('.'), new Date()) - get(storages, [name, 'start'].join('.'), new Date())) * min, 1)}/m`;
    // const speed3 = (name, count) => `${round(count / (get(storages, [name, 'last'].join('.'), new Date()) - get(storages, [name, 'start'].join('.'), new Date())) * hour)}/h`;
    // const getSuccess
    const speed = [speed1, speed2, speed3, speed4]
      .filter(Boolean)
      .map(a => String(a).padStart(8))
      .join(' ');
    const str = `\
✅ ${String(acks3).padEnd(8)} ${speed} \
${nacks1 ? `   ⚠️  ${nacks1} (${nacksPercent1}%) last min` : ''} \
`.trim();
    log(str);
    // }
  }
}
