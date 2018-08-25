import { USER_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';
import { Auth } from '../helpers';
import { User } from '../classes';

export default function userReducer(state = {}, action) {
  let userStore = _.assign({}, state);

  switch (action.type) {

    case USER_ACTION_TYPES.GET_ALL_PRODUCTS_SUCCESS:
      const { resBody } = action,
        data = resBody.data;
        userStore.productData = data;
        console.log(userStore);

      break;

    case USER_ACTION_TYPES.GET_ALL_PRODUCTS_FAILURE:
      delete userStore.productData;
      break;

    default:
      return state;
  }


  return userStore;
}
