export default {
  scenarios: {
    default: {
      type: 'hex',
      length: 12,
      time: 3 * 60 * 60 * 1000,
    },
    phoneVerify: {
      type: 'number',
      length: 6,
      time: 1 * 60 * 60 * 1000,
    },
    emailVerify: {
      type: 'number',
      length: 6,
      time: 24 * 60 * 60 * 1000,
    },
    emailVerifyStrong: {
      type: 'url',
      length: 20,
      uniq: true,
      time: 24 * 60 * 60 * 1000,
    },
    authToken: {
      type: 'hash',
      uniq: true,
      time: 30 * 24 * 60 * 60 * 1000,
    },
  },
};
