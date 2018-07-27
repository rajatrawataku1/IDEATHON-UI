import { LEAD_ACTION_TYPES } from '../action-types';
import { CALL_API } from '../middleware/api';
import { LEAD_API } from '../apis';
import { Auth } from '../helpers';

export const LeadAction = {
  getLeadsInfo,
  addLeadComments
}

// Get Lead Info

function getLeadsInfo(week,agentId,options={}){


  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  const actualPath = "/week-no/"+week+"/agent-id/"+agentId;

  // console.log(DASHBOARD_API.GET_LEADS_INFO+actualPath);

  return {
    [CALL_API]: {
      method: 'get',
      path: LEAD_API.GET_LEADS_INFO+actualPath,
      auth: Auth.getToken(),
      successType: LEAD_ACTION_TYPES.GET_LEADS_SUCCESS,
      errorType: LEAD_ACTION_TYPES.GET_LEADS_FAILURE,
      afterSuccess,
      afterError
    }
  };

}


function addLeadComments(text,leadId,options={}){

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

  // const actualPath = "/week-no/"+week+"/agentId/"+agentId;

  return {
    [CALL_API]: {
      method: 'post',
      path: LEAD_API.SET_SELF_COMMENTS+"/"+leadId,
      body,
      auth: Auth.getToken(),
      successType: LEAD_ACTION_TYPES.SET_LEADS_COMMENT_SUCCESS,
      errorType: LEAD_ACTION_TYPES.SET_LEADS_COMMENT_FAILURE,
      afterSuccess,
      afterError
    }
  };

}
