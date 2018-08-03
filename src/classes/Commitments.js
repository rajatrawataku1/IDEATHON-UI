const KEY_MAP = {
  CommentsAgentID:"agentId"
}

const KEY_COMMENT_API="comment";
const KEY_COMMENT_LOCAL="Comment";

const KEY_MAP_SAMPLE = {
  ManagerComment:"managerComment",
  SelfComment:"selfComment"
}

export class Commitments {

  constructor(apiObj = {}) {
    const _this = this;

    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap]) ? apiObj[keyMap]  : '';
    });

    Object.keys(KEY_MAP_SAMPLE).forEach((keyLocal) => {
         const keyMapApi = KEY_MAP_SAMPLE[keyLocal];
         const keyFinal = KEY_COMMENT_LOCAL+keyLocal;
        _this[keyFinal] = (!!apiObj[KEY_COMMENT_API] && !! apiObj[KEY_COMMENT_API][keyMapApi] ) ? apiObj[KEY_COMMENT_API][keyMapApi]  : '';
    });
  }

}
