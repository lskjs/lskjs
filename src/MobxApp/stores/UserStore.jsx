import { observable, action, computed } from 'mobx';
import { autobind } from 'core-decorators';
import cookie from 'react-cookie';

function catchError(err) {
  console.log('err', err)
  const message = `Ошибка: ${err.message}`
  alert(message)
}

function location(param) {
  if (typeof window === 'undefined' ) return;
  window.location = param
}


const localStorageMock = {
  setItem: () => {},
  getItem: () => {},
}
class ProtoStore {
  getStoreName() {
    return 'ProtoStore'
  }
  storage = typeof window !== 'undefined' ? window.localStorage : localStorageMock
  loadStorage() {
    const json = this.storage.getItem(this.getStoreName())
    if (!json) return;
    const data = JSON.parse(json)
    if (!data) return;
    this.fromJSON(data)
  }
  saveStorage() {
    this.storage.setItem(this.getStoreName(), JSON.stringify(this.toJSON()));
  }
}

class UserStore extends ProtoStore {
  @observable _id = null
  @observable token = null
  @observable username = null
  @observable email = null
  @observable password = null

  getStoreName() {
    return 'UserStore'
  }

  @autobind
  fromJSON(data) {
    this._id = data.user._id
    this.username = data.user.username
    this.email = data.user.email
    this.token = data.token
  }

  @autobind
  toJSON() {
    return {
      token: this.token,
      user: {
        _id: this._id,
        username: this.username,
        email: this.email,
      },
    }
  }

  constructor(appState, data) {
    super()
    if (data) {
      this.fromJSON(data)
    }
    this.api = appState.api
    this.loadStorage()
  }

  @autobind
  changeField(field, value) {
    this[field] = value
  }

  @autobind
  setUser(pack) {
    this.fromJSON(pack)
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    cookie.save('token', pack.token, { expires })
    cookie.save('user', pack.user, { expires })
    this.saveStorage()
  }

  @autobind
  removeUser() {
    this.fromJSON({
      token: null,
      user: {},
    })
    cookie.remove('token')
    cookie.remove('user')
    this.saveStorage()
  }

  @action
  auth(data) {
    this.api.authLogin(data).then((res) => {
      this.setUser(res)
      location('/')
    })
    .catch(catchError)
  }

  @action
  signup(data) {
    this.api.authSignup(data).then((res) => {
      this.setUser(res)
      location('/')
    })
    .catch(catchError)
  }

  @action
  logout = async () => {
    this.removeUser()
    location('/')
  }

  @computed get isAuth() {
    return this.token != null && this._id != null
  }
}

export default UserStore

// import remotedev from 'mobx-remotedev'
// export default remotedev(UserStore)
