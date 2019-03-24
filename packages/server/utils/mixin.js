export default function (Parent, ...mixins) {
  class Mixed extends Parent {}
  for (const mixin of mixins) {
    for (const prop in mixin) {
      Mixed.prototype[prop] = mixin[prop];
    }
  }
  return Mixed;
}
