import { USER_ACTION_TYPES } from '../action-types';
import { CALL_API } from '../middleware/api';
import { USER_API } from '../apis';
import { Auth } from '../helpers';

export const UserAction = {
  login,
  logout,
  getMyProfile
}

function login(form, options={}) {
  let { afterSuccess, afterError } = options;
  let body = {
    "username": form.username.value,
    "password": form.password.value
  };

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  
  return {
    [CALL_API]: {
      method: 'post',
      path: USER_API.LOGIN,
      body,
      successType: USER_ACTION_TYPES.LOGIN_SUCCESS,
      errorType: USER_ACTION_TYPES.LOGIN_FAILURE,
      afterSuccess,
      afterError
    }
  };
}

function getMyProfile(options={}) {
  let userId = Auth.getUserDataByKey('Id');
  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }
  return {
    [CALL_API]: {
      method: 'get',
      path: USER_API.GET_MY_PROFILE(userId),
      auth: Auth.getToken(),
      successType: USER_ACTION_TYPES.GET_PROFILE_SUCCESS,
      errorType: USER_ACTION_TYPES.GET_PROFILE_FAILURE,
      afterSuccess,
      afterError
    }
  };
}


function logout() {
  return {
    type: USER_ACTION_TYPES.LOGOUT
  };
}
