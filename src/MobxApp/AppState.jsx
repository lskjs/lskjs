import UserStore from './stores/UserStore';
import ApiClient from './api/api.client';

class AppState {
  user = null;
  api = null;
  constructor(props = {}) {
    this.api = new ApiClient({ base: '/api/v1' });
    const userData = {
      token: props.token,
      user: props.user,
    }
    this.user = new UserStore(this, userData);
  }
  toJSON() {
    return {
      user: this.user.toJSON(),
    }
  }
}

export default AppState;
