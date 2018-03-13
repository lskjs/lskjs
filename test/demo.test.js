const round = require('./demo.js').default;

describe('test', () => {
  test('round(1.11111) === 1.11', () => {
    expect(round(1.1111)).toEqual(1.11);
  });
})
