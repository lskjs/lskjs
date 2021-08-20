import { Store } from './Store';

// TODO: другое имя
export class ApiStore extends Store {
  static wrapOne(item) {
    return new this(item);
  }
  static async wrap(promise, params = {}) {
    const res = await promise;
    const { data, count } = res;
    const wrap = !(params.wrap === false || params.lean);
    const wrapOne = wrap ? this.wrapOne.bind(this) : (a) => a;
    if (data === null) return data;
    if (Array.isArray(data)) {
      const mappedData = data.map(wrapOne);
      if (count) mappedData.count = count;
      if (data.count) mappedData.count = data.count;
      return mappedData;
    }
    return wrapOne(data);
  }
}

export default ApiStore;
