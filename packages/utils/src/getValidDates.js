import moment from 'moment';

const isValid = (to, from, time) => to.toDate().getTime() >= time && time > from.toDate().getTime();

function compare(a, b) {
  if (moment(a).toDate().getTime() > moment(b).toDate().getTime()) return -1;
  if (moment(a).toDate().getTime() < moment(b).toDate().getTime()) return 1;
  return 0;
}

export default function getValidDates(dates, options) {
  const now = new Date();
  const valid = [];
  const notValid = [];


  dates.sort((d1, d2) => compare(d1.date, d2.date)).forEach((date) => {
    const time = moment(date.date).toDate().getTime();

    for (const option of options) { // eslint-disable-line no-restricted-syntax
      const [, toValue, toType] = /^([\d.]+)(\w)$/.exec(option[0]);
      const [, fromValue, fromType] = /^([\d.]+)(\w)$/.exec(option[1]);
      const [, value, type] = /^([\d.]+)(\w)$/.exec(option[2]);

      if (isValid(moment(now).add(-1 * toValue, toType), moment(now).add(-1 * fromValue, fromType), time)) {
        if (value === 0) {
          valid.push(date);
        } else if (!valid.length || moment(valid[valid.length - 1].date).add(-1 * value, type).toDate().getTime() >= time) { // eslint-disable-line max-len
          valid.push(date);
        } else {
          notValid.push(date);
        }
      }
    }
  });

  return {
    valid,
    notValid,
  };
}
