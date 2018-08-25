import { USER_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';
import { Auth } from '../helpers';
import { User } from '../classes';

export default function userReducer(state = {}, action) {
  let userStore = _.assign({}, state);
  switch (action.type) {
    case USER_ACTION_TYPES.LOGIN_SUCCESS:
      const { resBody } = action,
        data = resBody.data;


        console.log(resBody);
        
        let dummyData={
          id:"00081234",
          role:"SLL",
          name:"Aman Tanwar",
          token: "ksdjjs"
        }

        Auth.register(dummyData);
        userStore = Auth.getUser();
      break;

    case USER_ACTION_TYPES.GET_PROFILE_SUCCESS:
      const  responseBody  = action.resBody,
        responseData = responseBody.data;
        userStore.profile = new User(responseData);
      break;

    case USER_ACTION_TYPES.GET_PROFILE_FAILURE:
      delete userStore.profile;
      break;

    case USER_ACTION_TYPES.LOGIN_FAILURE:
    case USER_ACTION_TYPES.LOGOUT:
      Auth.deregister();
      break;
    default:
      return state;
  }
  return userStore;
}
