import { FLL_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';
import { Fll } from '../classes';

export default function fllReducer(state = {}, action) {
  let fllStore = _.assign({}, state);
  let responseBody,responseData;

  switch (action.type) {

    case FLL_ACTION_TYPES.GET_FLL_INFO_SUCCESS:
        responseBody  = action.resBody;
        responseData = responseBody.data;

        // console.log("####################################");
        // console.log(responseData);

        var selfArr =  responseData[0];
        var otherArr = responseData[1];

        // console.log("####################################");
        // console.log(selfArr);
        // console.log("####################################");
        // console.log(otherArr);

        selfArr.push(...otherArr);

        console.log(selfArr);

        let apps = [];
        selfArr.forEach((app) => {
          apps.push(new Fll(app))
        })

        console.log(apps);
        fllStore.fllInfo = apps;
      break;

    case FLL_ACTION_TYPES.GET_FLL_INFO_FAILURE:
      delete fllStore.fllInfo;
      break;

    default:
      return state;
  }

  return fllStore;
}
