const KEY_MAP = {
  Lead_Total:"Total",
  Lead_New:"New",
  Lead_PositiveClosure:"Positive Closure",
  Lead_FollowUp:"Follow-Up",
  Lead_NegativeClosure:"NegativeClosure",
  Lead_Invalid:"Invalid",
  Lead_LCR:"LCR",
  Lead_LAR:"LAR",
  Lead_MET:"MET",
}

export class DashboardLead {

  constructor(apiObj = {}) {
    const _this = this;

    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap]) ? Number(apiObj[keyMap])  : 0;
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
