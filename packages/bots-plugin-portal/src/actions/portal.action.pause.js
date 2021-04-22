import Bluebird from 'bluebird';

export default async function pause({ value }) {
  return Bluebird.delay(value);
}
