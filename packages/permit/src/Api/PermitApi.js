import Err from '@lskjs/err';
import ListApi from '@lskjs/server-api/ListApi';
import Bluebird from 'bluebird';

export class PermitApi extends ListApi {
  async count(req) {
    // await this.checkAdmin(req);
    const PermitModel = await this.app.module('models.PermitModel');
    return this.cache(['permit/count', req.data], () => this.countByParams(PermitModel, req.data));
  }
  async find(req) {
    const PermitModel = await this.app.module('models.PermitModel');
    // await this.checkAdmin(req);
    const params = await this.getListParams(req);
    return this.cache(['permit/find', params], async () => {
      let items = await this.findByParams(PermitModel, params);
      items = await PermitModel.prepare(items, { req, ...params });
      return Bluebird.props({
        data: items,
        count: PermitModel.countDocuments(params.filter),
        __pack: 1,
      });
    });
  }
  async findOne(req) {
    const PermitModel = await this.app.module('models.PermitModel');
    return this.cache(['permit/findOne', req.data], async () => {
      const { _id, code } = req.data;
      if (!_id) throw new Err('!_id', { status: 404 });
      const item = await PermitModel.findById(_id);
      if (!item) throw new Err('!item', { status: 404 });
      if (!(this.isAdmin(req) || String(req.user && req.user._id) === item.userId)) {
        if (String(code) !== String(item.code)) {
          throw code ? new Err('permit.incorrectCode', { status: 403 }) : new Err('!owner', { status: 403 });
        }
      }
      return PermitModel.prepare(item, { req, method: 'findOne' });
    });
  }
}

export default PermitApi;
