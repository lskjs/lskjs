// import UserStore from './stores/UserStore';
// import ProfileStore from './stores/ProfileStore';
// import ApiClient from './api/api.client';

class Provider {
  // user = null;
  // api = null;
  constructor(props = {}) {
    // const token = props.token || (props.user && props.user.token)
    // // console.log('AppStore constructor token', token);
    // this.api = new ApiClient({ base: '/api/v1' });
    // if (token) {
    //   this.api.setAuthToken(token)
    // }
    // const userData = {
    //   token: props.token,
    //   user: props.user,
    // }
    // this.user = new UserStore(this, userData);
    // this.profile = new ProfileStore(this);
    // this.app = this;
    // if (__CLIENT__) {
    //   global.api = this.api
    // }
  }

  provide() {
    return {
      asd: 123,
    }
  }

}

export default Provider;
