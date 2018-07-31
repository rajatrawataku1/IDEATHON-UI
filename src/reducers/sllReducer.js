import { SLL_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';
import { Sll } from '../classes';
import {Auth} from '../helpers';

export default function SllReducer(state = {}, action) {
  let sllStore = _.assign({}, state);
  let responseBody,responseData;

  switch (action.type) {

    case SLL_ACTION_TYPES.GET_SLL_INFO_SUCCESS:
    {
      responseBody  = action.resBody;
      responseData = responseBody.data;
      console.log(Auth.getUserDataByKey('Id'));

      let finaArray =  [
        {  AgentId:Auth.getUserDataByKey('Id'),
           Name: Auth.getUserDataByKey('Name'),
           CommentCurrentWeekManagerComment:"",
           CommentCurrentWeekSelfComment:"",
           CommentPreviousWeekManagerComment:"",
           CommentPreviousWeekSelfComment:"",
        }
      ]

      let allUnderHim = responseData[1];

      let apps = [];
      allUnderHim.forEach((app) => {
        apps.push(new Sll(app))
      })

      console.log(apps);

      finaArray.push(...apps);
      console.log(finaArray);
      sllStore.sllInfo = finaArray;

    }

    break;


    case SLL_ACTION_TYPES.GET_SLL_INFO_FAILURE:
      delete sllStore.sllInfo;
      break;

    case SLL_ACTION_TYPES.GET_SLL_EXPAND_SUCCESS:
    {
      responseBody  = action.resBody;
      responseData = responseBody.data;

      // console.log(Auth.getUserDataByKey('Id'));
      //
      // var finaArray =  [
      //   {  AgentId:Auth.getUserDataByKey('Id'),
      //      Name: Auth.getUserDataByKey('Name'),
      //      CommentCurrentWeekManagerComment:"",
      //      CommentCurrentWeekSelfComment:"",
      //      CommentPreviousWeekManagerComment:"",
      //      CommentPreviousWeekSelfComment:"",
      //   }
      // ]

      let allUnderHim = responseData[1];

      let  apps = [];
      allUnderHim.forEach((app) => {
        apps.push(new Sll(app))
      })

      console.log(apps);

      // finaArray.push(...apps);
      // console.log(finaArray);
      sllStore.sllExpandInfo = apps;

    }
    break;

    case SLL_ACTION_TYPES.GET_SLL_EXPAND_FAILURE:
      delete sllStore.sllExpandInfo;
      break;

    default:
      return state;
  }

  return sllStore;
}
