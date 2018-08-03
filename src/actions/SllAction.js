import { SLL_ACTION_TYPES } from '../action-types';
import { CALL_API } from '../middleware/api';
import { SLL_API } from '../apis';
import { Auth } from '../helpers';

export const SllAction = {
  getSllInfo,
  getExpandSllInfo,
  deleteExpandSllInfo
}

// Get Sll Info

function getSllInfo(sllId,options={}){

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
      path: SLL_API.GET_SLL_INFO+'/'+sllId,
      auth: Auth.getToken(),
      successType: SLL_ACTION_TYPES.GET_SLL_INFO_SUCCESS,
      errorType: SLL_ACTION_TYPES.GET_SLL_INFO_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

// Get Sll Exapand Info

function getExpandSllInfo(sllId,options={}){

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
      path: SLL_API.GET_EXPAND_SLL_INFO+'/'+sllId,
      auth: Auth.getToken(),
      successType: SLL_ACTION_TYPES.GET_SLL_EXPAND_SUCCESS,
      errorType: SLL_ACTION_TYPES.GET_SLL_EXPAND_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

function deleteExpandSllInfo(){

  return {
    type:SLL_ACTION_TYPES.DELETE_INNER_STORE
  }

}
