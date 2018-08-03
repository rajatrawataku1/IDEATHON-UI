const KEY_MAP_SAMPLE = {
  AgentId:'agentID',
  Name: 'agentName',
}

const KEY_MAP_COMMENT_API = 'comment';
const KEY_MAP_COMMENT_CURRENT_API = 'current';
const KEY_MAP_COMMENT_PREVIOUS_API = 'previous';

const KEY_MAP_COMMENT_LOCAL = 'Comment';
const KEY_MAP_COMMENT_CURRENT_LOCAL = 'CurrentWeek';
const KEY_MAP_COMMENT_PREVIOUS_LOCAL = 'PreviousWeek';


const KEY_MAP_ACTUAL_COMMENT = {
  "SelfComment": "self_comment",
  "ManagerComment": "manager_comment"
}


export class Fll {

  constructor(apiObj = {}) {
    const _this = this;

    Object.keys(KEY_MAP_SAMPLE).forEach((key) => {
         const keyMap = KEY_MAP_SAMPLE[key];
        _this[key] = (!!apiObj[keyMap]) ? String(apiObj[keyMap])  : '';
        console.log("############");
        console.log(_this[key]);
    });

    Object.keys(KEY_MAP_ACTUAL_COMMENT).forEach((keyCommentCurrentLocal) => {
      const keyCommentCurrentApi = KEY_MAP_ACTUAL_COMMENT[keyCommentCurrentLocal];

      let keyFinal = KEY_MAP_COMMENT_LOCAL + KEY_MAP_COMMENT_CURRENT_LOCAL +keyCommentCurrentLocal;

      // console.log( apiObj[KEY_MAP_COMMENT_API]);
      // console.log(apiObj[KEY_MAP_COMMENT_API][KEY_MAP_COMMENT_CURRENT_API][keyCommentCurrentApi]);

    (!!apiObj[KEY_MAP_COMMENT_API] && !!apiObj[KEY_MAP_COMMENT_API][KEY_MAP_COMMENT_CURRENT_API])
      ?
      _this[keyFinal] = apiObj[KEY_MAP_COMMENT_API][KEY_MAP_COMMENT_CURRENT_API][keyCommentCurrentApi]
      : _this[keyFinal] ='';

    });

    Object.keys(KEY_MAP_ACTUAL_COMMENT).forEach((keyCommentCurrentLocal) => {
      const keyCommentCurrentApi = KEY_MAP_ACTUAL_COMMENT[keyCommentCurrentLocal];

      let keyFinal = KEY_MAP_COMMENT_LOCAL + KEY_MAP_COMMENT_PREVIOUS_LOCAL +keyCommentCurrentLocal;

      (!!apiObj[KEY_MAP_COMMENT_API] && !!apiObj[KEY_MAP_COMMENT_API][KEY_MAP_COMMENT_PREVIOUS_API])
      ?
      _this[keyFinal] = apiObj[KEY_MAP_COMMENT_API][KEY_MAP_COMMENT_PREVIOUS_API][keyCommentCurrentApi]
      : _this[keyFinal]  = '';

    });
  }
  
}
