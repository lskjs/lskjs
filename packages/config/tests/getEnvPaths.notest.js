/* global test expect */
import getEnvPaths from '../src/getEnvPaths';


test('test hours getEnvPaths', () => {
  expect(getEnvPaths()).toBe('/Users/isuvorov/.env.json');
});
