const KEY_MAP = {
  Lead_Total:"Total",
  Lead_New:"New",
  Lead_PositiveClosure:"Positive Closure",
  Lead_FollowUp:"Follow-Up",
  Lead_NegativeClosure:"Negative Closure",
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

}
