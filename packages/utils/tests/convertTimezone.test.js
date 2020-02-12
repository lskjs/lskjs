/* global test expect */
import convertTimezone from '../src/date/convertTimezone';

test('check 0', () => {
  expect(convertTimezone('2020-01-01T10:00:00+02:00', '04:00')).toStrictEqual(new Date('2020-01-01T12:00:00+02:00'));
});
