import Err from '@lskjs/utils/Err';
import BaseApi from './Api';

export default class ListApi extends BaseApi {
  getRoutes() {
    return {
      ...super.getRoutes(),
      '/count': ::this.count,
      '/find': ::this.find,
      '/list': ::this.find,
      '/findOne': ::this.findOne,
      '/get': ::this.findOne,
      '/create': ::this.create,
      '/update': ::this.update,
      '/remove': ::this.remove,
      '/delete': ::this.remove,
    };
  }
  async count() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async find() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async findOne() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async create() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async update() {
    throw new Err('api.notImplemented', { status: 500 });
  }
  async remove() {
    throw new Err('api.notImplemented', { status: 500 });
  }
}
