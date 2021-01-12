import LskBaseModel from '@lskjs/db/LskBaseModel';

export class UserModel extends LskBaseModel {
  schema = {
    role: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    profile: {
      type: Object,
    },
    info: {
      type: Object,
    },
    private: {
      type: Object,
    },
    statuses: {
      signinAt: {
        type: Date,
      },
      editAt: {
        type: Date,
      },
      activityAt: {
        type: Date,
      },
      passwordAt: {
        type: Date,
      },
    },
  };
  options = {
    model: 'User',
    collection: 'user',
  };

  setStatus(statusName) {
    if (!this.statuses) this.statuses = {};
    this.statuses[statusName] = new Date();
    this.markModified(`statuses.${statusName}`);
  }

  static views = {
    tiny: ['_id', 'role', 'name', 'avatar'],
    default: ['_id', 'role', 'name', 'avatar'],
  };
}

export default UserModel;
