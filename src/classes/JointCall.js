const KEY_MAP = {
  JointCallTarget:"target",
  JointCallActual:"actual",
  JointCallPositiveClosure:"positiveClosure",
}

export class JointCall {
  constructor(apiObj = {}) {
    const _this = this;

    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap]) ? Number(apiObj[keyMap])  : 0;
    });
  }

}
