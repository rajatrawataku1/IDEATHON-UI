import { USER_ACTION_TYPES } from '../action-types';
import { CALL_API } from '../middleware/api';
import { USER_API } from '../apis';
import { Auth } from '../helpers';

export const UserAction = {
  login,
  logout,
  getMyProfile,
  getAllProducts,
  getOutlets,
  setvendorNew,
  setvendorFull
}


function setvendorFull(form, options={}) {

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  let { phoneNumber, retailerName, pinCodeRetailer, income, year } = form;

  let body = {
    name:retailerName.value,
    pincode:pinCodeRetailer.value,
    phone: phoneNumber.value,
    income:income.value,
    year:year.value
  }

  return {
    [CALL_API]: {
      method: 'post',
      path: USER_API.SET_VENDOR_FULL,
      body,
      successType: USER_ACTION_TYPES.SET_VENDOR_FULL_SUCCESS,
      errorType: USER_ACTION_TYPES.SET_VENDOR_FULL_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

function setvendorNew(form, options={}) {

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  let { phoneNumber, retailerName, pinCodeRetailer } = form;

  let body = {
    name:retailerName.value,
    pincode:pinCodeRetailer.value,
    phone: phoneNumber.value
  }

  return {
    [CALL_API]: {
      method: 'post',
      path: USER_API.SET_VENDOR_NEW,
      body,
      successType: USER_ACTION_TYPES.SET_VENDOR_NEW_SUCCESS,
      errorType: USER_ACTION_TYPES.SET_VENDOR_NEW_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

function getOutlets(form, options={}) {

  let { afterSuccess, afterError } = options;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  let body = {
    pincode:form.pinCode
  }

  console.log(body);

  console.log("Hey I am here");

  return {
    [CALL_API]: {
      method: 'post',
      path: USER_API.GET_OUTLETS,
      body,
      successType: USER_ACTION_TYPES.GET_OUTLETS_SUCCESS,
      errorType: USER_ACTION_TYPES.GET_OUTLETS_FAILURE,
      afterSuccess,
      afterError
    }
  };

}


function getAllProducts(form, options={}) {

  let { product,pinCode } = form;

  let { afterSuccess, afterError } = options;
  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }


  let FinalPath = USER_API.GET_ALL_PRODUCTS +'?productName='+product;

  console.log(FinalPath);

  return {
    [CALL_API]: {
      method: 'get',
      path: FinalPath,
      successType: USER_ACTION_TYPES.GET_ALL_PRODUCTS_SUCCESS,
      errorType: USER_ACTION_TYPES.GET_ALL_PRODUCTS_FAILURE,
      afterSuccess,
      afterError
    }
  };

}


function login(form, options={}) {
  let { afterSuccess, afterError } = options;
  // let body = {
  //   "username": form.username.value,
  //   "password": form.password.value
  // };
  //
  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }
  //
  //
  // return {
  //   [CALL_API]: {
  //     method: 'post',
  //     path: USER_API.LOGIN,
  //     body,
  //     successType: USER_ACTION_TYPES.LOGIN_SUCCESS,
  //     errorType: USER_ACTION_TYPES.LOGIN_FAILURE,
  //     afterSuccess,
  //     afterError
  //   }
  // };

  return {
    [CALL_API]: {
      method: 'get',
      path: USER_API.LOGIN,
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
