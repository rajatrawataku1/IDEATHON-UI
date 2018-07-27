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


export class Sll {

  constructor(apiObj = {}) {
    const _this = this;

    Object.keys(KEY_MAP_SAMPLE).forEach((key) => {
         const keyMap = KEY_MAP_SAMPLE[key];
        _this[key] = (!!apiObj[keyMap]) ? apiObj[keyMap]  : '';
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

  // constructForm(form= {}){
  //   let apiData= {};
  //   console.log(form);
  //
  //   Object.keys(KEY_MAP).forEach(key => {
  //     const inputForm = form[key];
  //     const apiKey = KEY_MAP[key];
  //     if (inputForm) {
  //       apiData[apiKey]= inputForm.value;
  //     }
  //   });
  //
  //   apiData[keyMapApiLoc]={};
  //
  //   Object.keys(KEY_MAP_LOC).forEach(keyLoc => {
  //     const inputFormLoc = form[keyLoc];
  //     const apiKeyLoc = KEY_MAP_LOC[keyLoc];
  //     if(inputFormLoc){
  //       apiData[keyMapApiLoc][apiKeyLoc]= inputFormLoc.value;
  //     }
  //   })
  //   return apiData;
  // }

 //  constructFromNudgeForm(form = {}) {
 //   const _this = this;
 //   Object.keys(KEY_MAP).forEach(key => {
 //     const input = form[key];
 //     if (input) {
 //       _this[key] = input.value;
 //     }
 //   });
 //   return this;
 // }
 //
 //  getApiObject() {
 //    const _this = this;
 //    let apiObj = {};
 //    Object.keys(KEY_MAP).forEach((key) => {
 //      const map = KEY_MAP[key];
 //      const value = _this[key];
 //      if (value !== undefined) {
 //        apiObj[map] = value;
 //      }
 //    });
 //    return apiObj;
 //  }
}
