import { APPLICATION_ACTION_TYPES } from '../action-types';
import { CALL_API } from '../middleware/api';
import { APPLICATION_API } from '../apis';
import { Auth } from '../helpers';

export const ApplicationAction = {
  create,
  getApplications,
  deleteBranch,
  updateBranch
}

function updateBranch(form,options={}){

  let { afterSuccess, afterError } = options;
  const {id} = form;
  delete form.id;
  let body= form;
  console.log(body);
  console.log(id);
  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  return {
    [CALL_API]: {
      method: 'put',
      path: APPLICATION_API.UPDATE+'/'+id,
      body,
      auth: Auth.getToken(),
      successType: APPLICATION_ACTION_TYPES.UPDATE_APP_SUCCESS,
      errorType: APPLICATION_ACTION_TYPES.UPDATE_APP_FAILURE,
      afterSuccess,
      afterError
    }
  };

}

function deleteBranch(form,options={}){

  let { afterSuccess, afterError } = options,
  branchId = form;

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  console.log(APPLICATION_API.DELETE+'/'+branchId);

  return {
    [CALL_API]: {
      method: 'delete',
      path: APPLICATION_API.DELETE+'/'+branchId,
      auth: Auth.getToken(),
      successType: APPLICATION_ACTION_TYPES.DELETE_APP_SUCCESS,
      errorType: APPLICATION_ACTION_TYPES.DELETE_APP_FAILURE,
      afterSuccess,
      afterError
    }
  };

}


function create(form, options={}) {

  let { afterSuccess, afterError } = options,
  body = form;

  console.log(body);

  if (!(afterSuccess instanceof Function)) {
    afterSuccess = undefined;
  }

  if (!(afterError instanceof Function)) {
    afterError = undefined;
  }

  return {
    [CALL_API]: {
      method: 'post',
      path: APPLICATION_API.CREATE,
      body,
      auth: Auth.getToken(),
      successType: APPLICATION_ACTION_TYPES.CREATE_APP_SUCCESS,
      errorType: APPLICATION_ACTION_TYPES.CREATE_APP_FAILURE,
      afterSuccess,
      afterError
    }
  };
}

function getApplications(options={}) {

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
      path: APPLICATION_API.GET_APPLICATIONS,
      auth: Auth.getToken(),
      successType: APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS,
      errorType: APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILURE,
      afterSuccess,
      afterError
    }
  };
}
