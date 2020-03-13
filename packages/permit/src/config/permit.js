export default {
  scenarios: {
    default: {
      type: 'hex',
      length: 12,
    },
    phoneVerify: {
      type: 'number',
      length: 6,
    },
    emailVerify: {
      type: 'number',
      length: 6,
    },
    emailVerifyStrong: {
      type: 'url',
      length: 20,
      uniq: true,
    },
    authToken: {
      type: 'hash',
      uniq: true,
    },
  },
};
