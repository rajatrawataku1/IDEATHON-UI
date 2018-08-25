import { USER_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';
import { Auth } from '../helpers';
import { User } from '../classes';

export default function userReducer(state = {}, action) {
  let userProductStore = _.assign({}, state);

  switch (action.type) {

    case USER_ACTION_TYPES.GET_ALL_PRODUCTS_SUCCESS:
      const { resBody } = action,
        data = resBody.data;
        userProductStore = data;
        console.log(userProductStore);

      break;

    case USER_ACTION_TYPES.GET_ALL_PRODUCTS_FAILURE:
      delete dashboardStore.agentStore;
      break;

    default:
      return state;
  }


  return userProductStore;
}
