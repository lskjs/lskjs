/* global test expect */
import convertTimezone from '../src/date/convertTimezone';

test('check set 10:00 tlt', () => {
  expect(convertTimezone('2020-01-01T10:00:00+02:00', '+04:00', '+02:00')).toStrictEqual(
    new Date('2020-01-01T10:00:00+04:00'),
  );
  expect(convertTimezone('2020-01-01T10:00:00+02:00', '+04:00', '+02:00')).toStrictEqual(
    new Date('2020-01-01T06:00:00Z'),
  );
  expect(convertTimezone('2020-01-01T10:00:00+02:00', '+04:00', '+02:00')).toStrictEqual(
    new Date('2020-01-01T10:00:00+04:00'),
  );
  expect(convertTimezone('2020-01-01T10:00:00+02:00', '+04:00', '+02:00')).toStrictEqual(
    new Date('2020-01-01T06:00:00Z'),
  );
});
test('check set 18:00 spb', () => {
  expect(convertTimezone('2020-01-01T18:00:00Z', '+03:00')).toStrictEqual(new Date('2020-01-01T15:00:00Z'));
  expect(convertTimezone('2020-01-01T18:00:00Z', '+03:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
  expect(convertTimezone('2020-01-01T18:00:00+01:00', '+03:00', '+1:00')).toStrictEqual(
    new Date('2020-01-01T18:00:00+03:00'),
  );
  expect(convertTimezone('2020-01-01T18:00:00+02:00', '+03:00', '+2:00')).toStrictEqual(
    new Date('2020-01-01T18:00:00+03:00'),
  );
  expect(convertTimezone('2020-01-01T18:00:00+03:00', '+03:00', '+3:00')).toStrictEqual(
    new Date('2020-01-01T18:00:00+03:00'),
  );
  expect(convertTimezone('2020-01-01T18:00:00+04:00', '+03:00', '+4:00')).toStrictEqual(
    new Date('2020-01-01T18:00:00+03:00'),
  );
});
test('check set 15Z => 16 spb ', () => {
  expect(convertTimezone('2020-01-01T15:00:00Z', '+02:00', '+3:00')).toStrictEqual(new Date('2020-01-01T16:00:00Z'));
  // expect(convertTimezone('2020-01-01T18:00:00Z', '+03:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
  // expect(convertTimezone('2020-01-01T18:00:00+01:00', '+03:00', '+1:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
  // expect(convertTimezone('2020-01-01T18:00:00+02:00', '+03:00', '+2:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
  // expect(convertTimezone('2020-01-01T18:00:00+03:00', '+03:00', '+3:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
  // expect(convertTimezone('2020-01-01T18:00:00+04:00', '+03:00', '+4:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
});
// test('check date to localDate', () => {
//   expect(convertTimezone('2020-01-01T18:00:00Z', '+03:00')).toStrictEqual(new Date('2020-01-01T15:00:00Z'));
//   expect(convertTimezone('2020-01-01T18:00:00Z', '+03:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
//   expect(convertTimezone('2020-01-01T18:00:00+01:00', '+03:00', '+1:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
//   expect(convertTimezone('2020-01-01T18:00:00+02:00', '+03:00', '+2:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
//   expect(convertTimezone('2020-01-01T18:00:00+03:00', '+03:00', '+3:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
//   expect(convertTimezone('2020-01-01T18:00:00+04:00', '+03:00', '+4:00')).toStrictEqual(new Date('2020-01-01T18:00:00+03:00'));
// });
