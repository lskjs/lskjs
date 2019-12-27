import beauty from '../beauty';

test('test hours secToTime', () => {
  expect(beauty(3800)).toBe('01:03:20');
});

test('test minutes secToTime', () => {
  expect(beauty(380)).toBe('06:20');
});

test('test seconds secToTime', () => {
  expect(beauty(38)).toBe('00:38');
});

test('test 0 time secToTime', () => {
  expect(beauty(0)).toBe('00:00');
});
