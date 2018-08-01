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

        // let apps = [];
        // responseData.forEach((app) => {
        //   apps.push(new Lead(app))
        // })
        //
        // console.log("##########################");
        // console.log(apps);
        // let dummyObject = [
        //   {Status:"Unqualified",name:"Yell"},
        //   {Status:"New",name:"Rajat Rawat"},
        //   {Status:"Follow-Up",name:"Shivam Singh"},
        //   {Status:"New",name:"Ramu Boy"},
        //   {Status:"Follow-Up",name:"Swastik Shrivastava"},
        //   {Status:"Hibernate",name:"Hua"},
        //   {Status:"Invalid",name:"Wao"},
        //   {Status:"New",name:"Yang"},
        //   {Status:"Follow-Up",name:"Mehul Aggarawal"}
        // ]
        //
        // LeadTableReordering(dummyObject)
        // leadViewStore.leadData = apps;
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
