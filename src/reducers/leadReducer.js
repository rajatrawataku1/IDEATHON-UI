import { LEAD_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';
import { LeadTableReordering } from '../helpers';
import { Lead } from '../classes';

export default function leadReducer(state = {}, action) {

  let leadViewStore = _.assign({}, state);
  let responseData,responseBody;

  switch (action.type) {
    case LEAD_ACTION_TYPES.GET_LEADS_SUCCESS:

        responseBody  = action.resBody;
        responseData = responseBody.data;

        console.log(responseData);

        let apps = [];
        responseData.forEach((app) => {
          apps.push(new Lead(app))
        })

        console.log("##########################");
        console.log(apps);
        let finalLeadData = LeadTableReordering(apps);
        console.log(finalLeadData);
        leadViewStore.leadData = finalLeadData;

      break;

    case LEAD_ACTION_TYPES.GET_LEADS_FAILURE:
      delete leadViewStore.leadData;
      break;

    case LEAD_ACTION_TYPES.ADD_LEADS_COMMENT_SUCCESS:
      responseBody  = action.resBody;
      responseData = responseBody.data;
      break;

    case LEAD_ACTION_TYPES.ADD_LEADS_COMMENT_FAILURE:
      break;

    default:
      return state;
  }

  return leadViewStore;
}
