export default class Api {
  constructor(props) {
    Object.assign(this, props);
  }
  fetch(...args) {
    return this.uapp.api.fetch(...args);
  }
}
