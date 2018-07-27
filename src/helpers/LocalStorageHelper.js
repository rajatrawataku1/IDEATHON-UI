import EncodeDecode from './EncodeDecode';

export class LocalStorageHelper {
  static register(userObj) {
    let encodedObj = EncodeDecode.encode(JSON.stringify(userObj));
    localStorage.setItem('CEREBRO_USER', encodedObj);
  }

  static deregister() {
    localStorage.removeItem('CEREBRO_USER');
  }

  static getUser() {
    let user = '';
    if(!!localStorage.getItem('CEREBRO_USER')) {
      user = EncodeDecode.decode(localStorage.getItem('CEREBRO_USER'));
      user = JSON.parse(user);
    }
    return user;
  }
}
