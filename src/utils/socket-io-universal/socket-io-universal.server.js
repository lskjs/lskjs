export default function (url, options) {
  return {
    __noSuchMethod__(id, args) {
      console.log('__noSuchMethod__');
    },
  };
}
