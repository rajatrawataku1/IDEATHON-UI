import { DASHBOARD_ACTION_TYPES } from '../action-types';
import {AgentInfo,DashboardLead,Commitments,JointCall,CampaignEfficiency} from '../classes';

import * as _ from 'lodash';

export default function dashboardReducer(state = {}, action) {
  let dashboardStore = _.assign({}, state);

  switch (action.type) {

    case DASHBOARD_ACTION_TYPES.GET_AGENT_INFO_SUCCESS:
    {
      let responseBody,responseData;
      responseBody  = action.resBody;
      responseData = responseBody.data;

      let mappedData;

      (!!responseData[0]) ?
      mappedData = new AgentInfo(responseData[0])
      :
      mappedData = new AgentInfo()


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

      let mappedData;

      (!!responseData[0])?
      mappedData = new JointCall(responseData[0])
      :
      mappedData= new JointCall()


      dashboardStore.jointCallsStore = mappedData;
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

      let mappedData = [];

      (!!responseData[0])?
        Object.keys(responseData[0]).forEach((key)=>{
            mappedData.push(new CampaignEfficiency(key,responseData[0][key]))
        })
      :
      console.log("I am not defined");


      dashboardStore.campaignEfficiencyStore = mappedData;
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

      dashboardStore.commitmentsStore = mappedData
      break;
    }

    case DASHBOARD_ACTION_TYPES.GET_COMMITMENTS_FAILURE:
      delete dashboardStore.commitmentsStore
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

    case DASHBOARD_ACTION_TYPES.DELETE_INNER_STORE:
    {
      delete dashboardStore.agentStore;
      delete dashboardStore.leadsStore;
      delete dashboardStore.jointCallsStore;
      delete dashboardStore.campaignEfficiencyStore;
      delete dashboardStore.commitmentsStore;
      break;
    }

    default:
      return state;
  }
  return dashboardStore;
}
