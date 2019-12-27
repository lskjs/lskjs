/* global test expect */
import secToTime from '../secToTime';

test('test hours secToTime', () => {
  expect(secToTime(3800)).toBe('01:03:20');
});

test('test minutes secToTime', () => {
  expect(secToTime(380)).toBe('06:20');
});

test('test seconds secToTime', () => {
  expect(secToTime(38)).toBe('00:38');
});

test('test 0 time secToTime', () => {
  expect(secToTime(0)).toBe('00:00');
});
