import Bluebird from 'bluebird';

export default async function pause({ value }) {
  await Bluebird.delay(value);
  return { res: true };
}
