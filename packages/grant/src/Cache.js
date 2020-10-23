export default class Cache {
  data = {};
  async set(key, value) {
    if (!this.data[key]) {
      if (value instanceof Promise) {
        this.data[key] = await value;
      }
    }
  }
  async get(key) {
    if (this.data[key]) {
      return this.data[key];
    }
    return undefined;
  }
  async cache(key, value) {
    if (this.data[key]) return this.data[key];
    await this.set(key, value);
    return value;
  }
}
