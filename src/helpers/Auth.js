import { User } from '../classes';
import { LocalStorageHelper } from '../helpers';

let AuthUser;

export const Auth = {
  register: (apiUser = {}) => {
    if(apiUser.token) {
      AuthUser = apiUser.token && new User(apiUser);
      LocalStorageHelper.register(AuthUser);
    }
  },

  isLoggedIn: () => {
    return !!AuthUser || !!LocalStorageHelper.getUser() || false
  },

  deregister: () => {
    LocalStorageHelper.deregister();
    AuthUser = undefined;
  },

  getUser: () => {
    return AuthUser || LocalStorageHelper.getUser()
  },

  getUserDataByKey: (key) => {
    return (AuthUser && AuthUser[key]) || (LocalStorageHelper.getUser() && LocalStorageHelper.getUser()[key])
  },

  getToken: () => {
    let token = '';
    if(!!AuthUser) {
      token = 'Bearer ' + AuthUser.Token;
    } else if(!!LocalStorageHelper.getUser()) {
      if(!!LocalStorageHelper.getUser()) {
        token = 'Bearer ' + LocalStorageHelper.getUser().Token;
      }
    }
    return token;
  }
};
