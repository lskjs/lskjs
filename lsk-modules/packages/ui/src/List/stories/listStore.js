import range from 'lodash/range';
import random from 'lodash/random';
import sample from 'lodash/sample';
import Promise from 'bluebird';
import axios from 'axios';
import ListStore from '../../stores/ListStore';

Promise.config({ cancellation: true });
const api = {
  async find2({ skip, limit } = {}) {
    await Promise.delay(200);
    return {
      count: 1000,
      items: range(skip, skip + limit).map(id => ({ id, title: `User ${id + 1}` })),
    };
  },

  async find({ skip, limit, cancelToken } = {}) {
    const promise = Promise.delay(200); // это типа гет запрос
    cancelToken.token.promise.then(() => promise.cancel());
    await promise;
    const count = 1000;
    const roles = () => sample([
      'Director',
      'Manager',
      'Stuff',
      'Salesman',
      'Driver',
      'Tester',
      'Designer',
    ]);
    return {
      count,
      data: range(skip, skip + limit).map(id => ({
        id,
        _id: id,
        title: `User ${id + 1}`,
        rating: random(id, count, true).toFixed(2),
        role: roles(),
      })),
      // items: range(skip, skip + limit).map(_id => ({ _id })),
    };
  },


  async find3({ skip, limit, cancelToken } = {}) {
    await axios.get('/user/12345', { cancelToken: cancelToken.token });
    await axios.get('/user/12345', { cancelToken: cancelToken.token });
    await axios.get('/user/12345', { cancelToken: cancelToken.token });
    return {
      count: 1000,
      items: range(skip, skip + limit).map(id => ({ id, title: `User ${id + 1}` })),
    };
    // });
  },

  find4({ skip, limit } = {}) {
    return Promise(async (resolve, reject, onCancel) => {
      const promise = Promise.delay(2000); // это типа гет запрос
      onCancel(promise.cancel);
      await promise;

      const promise2 = Promise.delay(2000); // это типа гет запрос
      onCancel(promise2.cancel);
      await promise2;

      const promise3 = Promise.delay(2000); // это типа гет запрос
      onCancel(promise3.cancel);
      await promise3;

      resolve({
        count: 1000,
        items: range(skip, skip + limit).map(id => ({ id, title: `User ${id + 1}` })),
      });
    });
  },
};

const listStore = new ListStore({ api, skip: 20 });
setTimeout(() => {
  listStore.fetch();
}, 2000);

export default listStore;
