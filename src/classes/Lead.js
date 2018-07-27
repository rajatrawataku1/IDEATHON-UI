const KEY_MAP = {
  LeadId:"lead_id",
  CustomerName:"x_fst_name",
  MidName:"x_mid_name",
  LastName:"x_lst_name",
  DOB:"x_dob",
  Age:"x_age",
  MobileNum:"x_mobi_num",
  Status:"status_cd",
  JcRequireComments:"x_appt_jc_req_comments",
  EPI:"x_epi",
  IncomeLPA:"x_income_pa",
  MeetinDoneOn:"x_meeting_done_on",
  MeetingSheduledDate:"x_meeting_sched_for",
  Location:"x_prop_pol_hol_city",
  PropPolHolState:"x_prop_pol_hol_state",
  LeadCreationDate:"ld_created_date",
  LastUpdateeDAte:"ld_last_upd_dt",
  SourceId:"src_id",
  Fulfillerid:"x_fulfiller_id",
  LgId:"x_lg_id",
  LeadType:"x_lead_type",
  CampCode:"x_camp_code",
  DOJ:"doj",
  FulfillerAgentNum:"fulfiller_agent_num",
  JointCallCount:"joint_call_count",
  NumMeetingsDone:"num_meetings_done",
  EmpCode:"emp_code",
  LgCode:"lg_code",
  LdJointCall:"ld_joint_call",
  LdMeetingStatus:"ld_meeting_status",
}

// const keyMapApiLoc='location';
//
// const KEY_MAP_LOC = {
//   Lat:'lat',
//   Lon:'lon'
// }


export class Lead {
  constructor(apiObj = {}) {
    const _this = this;
    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap] && apiObj[keyMap] ) || '';
    });

    // Object.keys(KEY_MAP_LOC).forEach((keyLoc) => {
    //   const keyMapLoc = KEY_MAP_LOC[keyLoc];
    //   _this[keyLoc] = (!!apiObj[keyMapApiLoc] && apiObj[keyMapApiLoc][keyMapLoc]) || '' ;
    // });
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
  //
  //
  // getApiObject() {
  //   const _this = this;
  //   let apiObj = {};
  //   Object.keys(KEY_MAP).forEach((key) => {
  //     const map = KEY_MAP[key];
  //     const value = _this[key];
  //     if (value !== undefined) {
  //       apiObj[map] = value;
  //     }
  //   });
  //   return apiObj;
  // }

}
