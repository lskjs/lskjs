export default function(url, options) {
  return {
    __noSuchMethod__ : function(id, args) {
      console.log('__noSuchMethod__');
    }
  }
}
