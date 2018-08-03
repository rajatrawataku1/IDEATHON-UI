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
  State:"x_prop_pol_hol_state",
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
  MeetingRemarks:"meeting_remarks",
  ProductName:"last_prod_discussed",
  CreatedAt:"created_at",
  CreatedBy:"created_by",
  UpdatedAt:"updated_at",
  UpdatedBy:"updated_by"
}

const KEY_MAP_COMMENT_API='comment';
const KEY_MAP_COMMENT_LOCAL="Comment";

const KEY_MAP_COMMENT_SAMPLE= {
  Current:"current",
  Previous:"previous"
}

export class Lead {
  constructor(apiObj = {}) {
    const _this = this;
    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap] && apiObj[keyMap] ) || '';
    });

    Object.keys(KEY_MAP_COMMENT_SAMPLE).forEach((keyCommentLocal) => {
      const keyCommentApi = KEY_MAP_COMMENT_SAMPLE[keyCommentLocal];

      let keyFinal = KEY_MAP_COMMENT_LOCAL + keyCommentLocal;

    console.log("####"+apiObj[KEY_MAP_COMMENT_API][keyCommentApi]);

    (!!apiObj[KEY_MAP_COMMENT_API] && !!apiObj[KEY_MAP_COMMENT_API][keyCommentApi])
      ?
      _this[keyFinal] = apiObj[KEY_MAP_COMMENT_API][keyCommentApi]
      : _this[keyFinal] ='';

    });
  }
}
