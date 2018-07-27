import { DASHBOARD_ACTION_TYPES } from '../action-types';
import { CALL_API } from '../middleware/api';
import { DASHBOARD_API } from '../apis';
import { Auth } from '../helpers';

export const DashboardAction = {
  getAgentInfo,
  getLeadsInfo,
  getJointCall,
  getCamapaignEfficiency,
  getSelfComments,
  getManagerComments,
  setSelfComments,
  setManagerComments,
}

// Get Agent Info

function getAgentInfo(agentId,options={}){

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  return {
    [CALL_API]: {
      method: 'get',
      path: DASHBOARD_API.GET_AGENT_INFO+'/'+agentId,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.GET_AGENT_INFO_SUCCESS,
      errorType: DASHBOARD_ACTION_TYPES.GET_AGENT_INFO_FAILURE,
      afterSuccess,
      afterError
    }
  };

}


// Get Lead Info

//
//

function getLeadsInfo(week,agentId,timeline,options={}){


  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  const actualPath = "/week-no/"+week+"/agent-id/"+agentId+"/report-type/"+timeline;

  console.log(DASHBOARD_API.GET_LEADS_INFO+actualPath);

  return {
    [CALL_API]: {
      method: 'get',
      path: DASHBOARD_API.GET_LEADS_INFO+actualPath,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.GET_LEADS_INFO_SUCCESS,
      errorType: DASHBOARD_ACTION_TYPES.GET_LEADS_INFO_FAILURE,
      afterSuccess,
      afterError
    }
  };

}


// Get Joint Call

function getJointCall(week,agentId,timeline,options={}){

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  const actualPath = "/week-no/"+week+"/agent-id/"+agentId+"/report-type/"+timeline;

  return {
    [CALL_API]: {
      method: 'get',
      path: DASHBOARD_API.GET_JOIN_CALL+actualPath,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.GET_JOIN_CALL_SUCCESS,
      errorType: DASHBOARD_ACTION_TYPES.GET_JOIN_CALL_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

//  get Campaign Efficiency

function getCamapaignEfficiency(week,agentId,timeline,options={}){

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  const actualPath = "/week-no/"+week+"/agent-id/"+agentId+"/report-type/"+timeline;

  return {
    [CALL_API]: {
      method: 'get',
      path: DASHBOARD_API.GET_CAMPAIGN_EFFICIENCY+actualPath,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.GET_CAMPAIGN_EFFICIENCY_SUCCESS,
      errorType: DASHBOARD_ACTION_TYPES.GET_CAMPAIGN_EFFICIENCY_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

// get self comments

function getSelfComments(week,agentId,options={}){

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  const actualPath = "/week-no/"+week+"/agent-id/"+agentId;

  return {
    [CALL_API]: {
      method: 'get',
      path: DASHBOARD_API.GET_SELF_COMMENTS+actualPath,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.GET_SELF_COMMENTS_SUCCESS,
      errorType: DASHBOARD_ACTION_TYPES.GET_SELF_COMMENTS_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

// get Manager Comments

function getManagerComments(week,agentId,options={}){

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  const actualPath = "/week-no/"+week+"/agent-id/"+agentId;

  return {
    [CALL_API]: {
      method: 'get',
      path: DASHBOARD_API.GET_MANAGER_COMMENTS+actualPath,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.GET_MANAGER_COMMENTS_SUCCESS,
      errorType: DASHBOARD_ACTION_TYPES.GET_MANAGER_COMMENTS_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

// set self comments

function setSelfComments(week,text,agentId,options={}){

  let { afterSuccess, afterError } = options;
  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  let body = {
      comment:text,
  }

  const actualPath = "/week-no/"+week+"/agentId/"+agentId;

  return {
    [CALL_API]: {
      method: 'post',
      path: DASHBOARD_API.SET_SELF_COMMENTS+actualPath,
      body,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.SET_SELF_COMMENTS_SUCESS,
      errorType: DASHBOARD_ACTION_TYPES.SET_SELF_COMMENTS_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

// set Manager comments

function setManagerComments(week,text,managerId,agentId,options){

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  let body = {
    comment:text
  }

  const actualPath = "/week-no/"+week+"/agentId/"+agentId;

  return {
    [CALL_API]: {
      method: 'post',
      path: DASHBOARD_API.SET_MANAGER_COMMENTS+actualPath,
      body,
      auth: Auth.getToken(),
      successType: DASHBOARD_ACTION_TYPES.SET_MANAGER_COMMENTS_SUCCESS,
      errorType: DASHBOARD_ACTION_TYPES.SET_MANAGER_COMMENTS_FAILURE,
      afterSuccess,
      afterError
    }
  };

}
