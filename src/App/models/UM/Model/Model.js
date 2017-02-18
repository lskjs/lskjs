
export default class Model {
  test() {
    if (__CLIENT__) {
      console.log('test from __CLIENT__');
    } else {
      console.log('test from __SERVER__');
    }
  }
}
