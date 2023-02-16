import { createValidator } from '../utils/createValidator';

export const tests = [
  {
    id: 'wikipedia',
    tags: ['internet', 'https'],
    req: {
      url: 'https://www.wikipedia.org',
      timeout: 5000,
      transformResponse: createValidator(({ data } = {}) =>
        String(data).includes('Download Wikipedia for Android or iOS'),
      ),
    },
  },
];

export default tests;
