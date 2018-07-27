const KEY_MAP = {
  Id: 'id',
  Name: 'name',
  Username: 'username',
  Type: 'type',
  Role: 'role',
  Token: 'token',
  LeadEndPoint: 'leadEndpoint',
  Status: 'status'
};

export class User {
  constructor(apiObj = {}) {
    const _this = this;
    Object.keys(KEY_MAP).forEach((key) => {
      const keyMap = KEY_MAP[key];
      _this[key] = apiObj[keyMap];
    });
  }

  getApiObject() {
    const _this = this;
    let apiObj = {};
    Object.keys(KEY_MAP).forEach((key) => {
      const map = KEY_MAP[key];
      const value = _this[key];
      if (value !== undefined) {
        apiObj[map] = value;
      }
    });
    return apiObj;
  }
}
