import { makeAutoObservable } from 'mobx'

export default class UserStore {
  constructor() {
    this._flag = false
    this._user = {}
    makeAutoObservable(this)
  }

  setAuth(bool) {
    this._flag = bool
  }
  setUser(user) {
    this._user = user
  }

  get Auth() {
    return this._flag
  }
  get user() {
    return this._user
  }
}
