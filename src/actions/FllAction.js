import { FLL_ACTION_TYPES } from '../action-types';
import { CALL_API } from '../middleware/api';
import { FLL_API } from '../apis';
import { Auth } from '../helpers';

export const FllAction = {
  getFllInfo
}

// Get Agent Info

function getFllInfo(fllId,options={}){

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
      path: FLL_API.GET_FLL_INFO+'/'+fllId,
      auth: Auth.getToken(),
      successType: FLL_ACTION_TYPES.GET_FLL_INFO_SUCCESS,
      errorType: FLL_ACTION_TYPES.GET_FLL_INFO_FAILURE,
      afterSuccess,
      afterError
    }
  };

}
