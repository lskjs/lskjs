import ApiClient from './ApiClient';

describe('base /api/v1', () => {
  const api = new ApiClient({
    base: '/api/v1',
  });
  test('api.createUrl(\'messages\')', () => {
    expect(
      api.createUrl('messages'),
    ).toBe(
      '/api/v1/messages',
    );
  });
  test('api.createUrl(\'/messages\')', () => {
    expect(
      api.createUrl('/messages'),
    ).toBe(
      '/messages',
    );
  });
  test('api.createUrl(\'messages\', {base: \'/api/v2\'})', () => {
    expect(
      api.createUrl('messages', { base: '/api/v2' }),
    ).toBe(
      '/api/v2/messages',
    );
  });
  test('api.createUrl(\'/messages\', {base: \'/api/v2\'})', () => {
    expect(
      api.createUrl('/messages', { base: '/api/v2' }),
    ).toBe(
      '/messages',
    );
  });
});
// describe('base /api/v1', () => {
//   const api = new ApiClient({
//     base: '/api/v1',
//   });
//   test('api.createUrl(\'messages\')', () => {
//     expect(api.createUrl('messages')).toBe('/api/v1/messages');
//   });
//   test('api.createUrl(\'/messages\')', () => {
//     expect(api.createUrl('/messages')).toBe('/messages');
//   });
// });
