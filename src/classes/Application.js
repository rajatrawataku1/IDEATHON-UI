const KEY_MAP = {
  BranchId:'id',
  BranchName: 'name',
  Radius: 'radius'
};

const keyMapApiLoc='location';

const KEY_MAP_LOC = {
  Lat:'lat',
  Lon:'lon'
}


export class Application {
  constructor(apiObj = {}) {
    const _this = this;
    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap] && apiObj[keyMap] ) || '';
    });

    Object.keys(KEY_MAP_LOC).forEach((keyLoc) => {
      const keyMapLoc = KEY_MAP_LOC[keyLoc];
      _this[keyLoc] = (!!apiObj[keyMapApiLoc] && apiObj[keyMapApiLoc][keyMapLoc]) || '' ;
    });
  }

  constructForm(form= {}){
    let apiData= {};
    console.log(form);

    Object.keys(KEY_MAP).forEach(key => {
      const inputForm = form[key];
      const apiKey = KEY_MAP[key];
      if (inputForm) {
        apiData[apiKey]= inputForm.value;
      }
    });

    apiData[keyMapApiLoc]={};

    Object.keys(KEY_MAP_LOC).forEach(keyLoc => {
      const inputFormLoc = form[keyLoc];
      const apiKeyLoc = KEY_MAP_LOC[keyLoc];
      if(inputFormLoc){
        apiData[keyMapApiLoc][apiKeyLoc]= inputFormLoc.value;
      }
    })
    return apiData;
  }

  constructFromNudgeForm(form = {}) {
   const _this = this;
   Object.keys(KEY_MAP).forEach(key => {
     const input = form[key];
     if (input) {
       _this[key] = input.value;
     }
   });
   return this;
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
