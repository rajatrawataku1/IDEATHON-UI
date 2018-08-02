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
