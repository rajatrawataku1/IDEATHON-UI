import { DASHBOARD_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';

export default function dashboardReducer(state = {}, action) {
  let dashboardStore = _.assign({}, state);
  let responseBody,responseData;

  switch (action.type) {

    case DASHBOARD_ACTION_TYPES.GET_AGENT_INFO_SUCCESS:
        responseBody  = action.resBody;
        responseData = responseBody.data;
        dashboardStore.agentStore = responseData;
      break;

    case DASHBOARD_ACTION_TYPES.GET_AGENT_INFO_FAILURE:
      delete dashboardStore.agentStore;
      break;


    case DASHBOARD_ACTION_TYPES.GET_LEADS_INFO_SUCCESS:
      responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.leadsStore = responseData;
      break;

    case DASHBOARD_ACTION_TYPES.GET_LEADS_INFO_FAILURE:
      delete dashboardStore.leadsStore
      break;

    case DASHBOARD_ACTION_TYPES.GET_JOIN_CALL_SUCCESS:
      responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.jointCallsStore = responseData;
      break;

    case DASHBOARD_ACTION_TYPES.GET_JOIN_CALL_FAILURE:
      delete dashboardStore.jointCallsStore;
      break;

    case DASHBOARD_ACTION_TYPES.GET_CAMPAIGN_EFFICIENCY_SUCCESS:
      let  responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.campaignEfficiencyStore = responseData;
      break;

    case DASHBOARD_ACTION_TYPES.GET_CAMPAIGN_EFFICIENCY_FAILURE:
      delete dashboardStore.campaignEfficiencyStore
      break;

    case DASHBOARD_ACTION_TYPES.GET_SELF_COMMENTS_SUCCESS:
      responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.selfCommentsStore = responseData
      break;

    case DASHBOARD_ACTION_TYPES.GET_SELF_COMMENTS_FAILURE:
      delete dashboardStore.selfCommentsStore
      break;

    case DASHBOARD_ACTION_TYPES.GET_MANAGER_COMMENTS_SUCCESS:
      responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.managerCommentsStore = responseData
      break;

    case DASHBOARD_ACTION_TYPES.GET_MANAGER_COMMENTS_FAILURE:
      delete dashboardStore.managerCommentsStore
      break;

    case DASHBOARD_ACTION_TYPES.SET_SELF_COMMENTS_SUCESS:
      responseBody  = action.resBody;
      responseData = responseBody.data;
      break;

    case DASHBOARD_ACTION_TYPES.SET_SELF_COMMENTS_FAILURE:
      break;

    case DASHBOARD_ACTION_TYPES.SET_MANAGER_COMMENTS_SUCCESS:
      responseBody  = action.resBody;
      responseData = responseBody.data;
      break;

    case DASHBOARD_ACTION_TYPES.SET_MANAGER_COMMENTS_FAILURE:
      break;

    default:
      return state;
  }
  return dashboardStore;
}
