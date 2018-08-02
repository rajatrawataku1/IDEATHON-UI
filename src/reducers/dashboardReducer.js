import { DASHBOARD_ACTION_TYPES } from '../action-types';
import {AgentInfo,DashboardLead,Commitments} from '../classes';

import * as _ from 'lodash';

export default function dashboardReducer(state = {}, action) {
  let dashboardStore = _.assign({}, state);

  switch (action.type) {

    case DASHBOARD_ACTION_TYPES.GET_AGENT_INFO_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;

      console.log("Response Data : "+responseData);
      let mappedData;

      (!!responseData[0]) ?
      mappedData = new AgentInfo(responseData[0])
      :
      mappedData = new AgentInfo()

      console.log("Mapped Data : "+mappedData);

      dashboardStore.agentStore = mappedData;
      break;

    }

    case DASHBOARD_ACTION_TYPES.GET_AGENT_INFO_FAILURE:
      delete dashboardStore.agentStore;
      break;


    case DASHBOARD_ACTION_TYPES.GET_LEADS_INFO_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;

      let mappedData;

      (!!responseData[0]) ?
      mappedData = new DashboardLead(responseData[0])
      :
      mappedData = new DashboardLead()

      console.log("Mapped Data : "+mappedData);

      dashboardStore.leadsStore = mappedData;
      break;
    }

    case DASHBOARD_ACTION_TYPES.GET_LEADS_INFO_FAILURE:
      delete dashboardStore.leadsStore
      break;

    case DASHBOARD_ACTION_TYPES.GET_JOIN_CALL_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.jointCallsStore = responseData;
      break;
    }

    case DASHBOARD_ACTION_TYPES.GET_JOIN_CALL_FAILURE:
      delete dashboardStore.jointCallsStore;
      break;

    case DASHBOARD_ACTION_TYPES.GET_CAMPAIGN_EFFICIENCY_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.campaignEfficiencyStore = responseData;
      break;
    }

    case DASHBOARD_ACTION_TYPES.GET_CAMPAIGN_EFFICIENCY_FAILURE:
      delete dashboardStore.campaignEfficiencyStore
      break;

    case DASHBOARD_ACTION_TYPES.GET_COMMITMENTS_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;

      let mappedData = new Commitments(responseData);

      console.log("Mapped Data : ",mappedData);
      dashboardStore.commitmentsStore = mappedData
      break;
    }

    case DASHBOARD_ACTION_TYPES.GET_COMMITMENTS_FAILURE:
      delete dashboardStore.commitmentsStore
      break;


    case DASHBOARD_ACTION_TYPES.GET_MANAGER_COMMENTS_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;
      dashboardStore.managerCommentsStore = responseData
      break;
    }

    case DASHBOARD_ACTION_TYPES.GET_MANAGER_COMMENTS_FAILURE:
      delete dashboardStore.managerCommentsStore
      break;

    case DASHBOARD_ACTION_TYPES.SET_SELF_COMMENTS_SUCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;
      break;
    }

    case DASHBOARD_ACTION_TYPES.SET_SELF_COMMENTS_FAILURE:
      break;

    case DASHBOARD_ACTION_TYPES.SET_MANAGER_COMMENTS_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;
      break;
    }

    case DASHBOARD_ACTION_TYPES.SET_MANAGER_COMMENTS_FAILURE:
      break;

    default:
      return state;
  }
  return dashboardStore;
}
