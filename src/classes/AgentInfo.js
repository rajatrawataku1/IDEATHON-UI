const KEY_MAP = {
  AgentNum:"agent_num",
  ClientNum:"clntnum",
  EmployeeID:"emp_id",
  EmployeeName:"employee_nm",
  LevelName:"level_nm",
  AgentLevel:"agent_level",
  AgentDesignation:"agent_designation",
  AgentChannel:"agent_channel",
  EmployeeStateCd:"employee_stat_cd",
  AgentBand:"agent_band",
  AgentBandDesignation:"agent_band_desc",
  EmployeePositionDesignation:"employee_postn_desc",
  SalesInd:"sales_ind",
  FlsInd:"fls_ind",
  EmployeeSubDeptNum:"emp_sub_dept_nm",
  EmployeeTerminationDate:"emp_termination_dt",
  EmployeeReleiginDate:"emp_relieving_dt",
  AgentDoj:"agent_doj",
  L1EmpId:"l1_emp_id",
  L2EmpId:"l2_emp_id",
  L3EmpId:"l3_emp_id",
  L4EmpId:"l4_emp_id",
  L1Name:"l1_name",
  L2Name:"l2_name",
  L3Name:"l3_name",
  L4Name:"l4_name",
  CreatedAt:"created_at",
  CreatedBy:"created_by",
  UpdatedAt:"updated_at",
  UpdatedBy:"updated_by",
}

export class AgentInfo {

  constructor(apiObj = {}) {
    const _this = this;

    Object.keys(KEY_MAP).forEach((key) => {
         const keyMap = KEY_MAP[key];
        _this[key] = (!!apiObj[keyMap]) ? apiObj[keyMap]  : '';
    });
  }
}
