import superAgent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';

export const CALL_API = Symbol('CALL_API');
export const CHAIN_API = Symbol('CHAIN_API');

export default ({ dispatch, getState }) => next => action => {
  if (action[CALL_API]) {
    return dispatch({
      [CHAIN_API]: [
        ()=> action
      ]
    });
  }

  return new Promise((resolve, reject) => {
    let deferred = { resolve, reject };
    if (! action[CHAIN_API]) {
      return next(action);
    }

    let promiseCreators = action[CHAIN_API].map((apiActionCreator)=> {
      return createRequestPromise(apiActionCreator, next, getState, dispatch);
    });

    let overall = promiseCreators.reduce((promise, creator)=> {
      return promise.then((body)=> {
        return creator(body);
      });
    }, Promise.resolve());

    overall.finally(()=> {
      deferred.resolve();
    }).catch(()=> {});
  });

}

function actionWith (action, toMerge) {
  let ret = Object.assign({}, action, toMerge);
  delete ret[CALL_API];
  return ret;
}

function createRequestPromise (apiActionCreator, next, getState, dispatch) {
  return (prevBody)=> {
    let apiAction = apiActionCreator(prevBody);
    let params = extractParams(apiAction[CALL_API]);

    return new Promise((resolve, reject) => {
      let deferred = { resolve, reject };
      if(params.contentType === 'multipart/form-data') {
        let file = (params.body.length > 0) ? params.body[0] : [];

        superAgent[params.method](params.url)
          .set('Authorization', params.auth || '')
          .attach('file', file)
          .end((err, res)=> {
            processAPIResponse(getState, dispatch, apiAction, deferred, params, err, res);
        });
      } else {
        superAgent[params.method](params.url)
          .type(params.contentType || 'application/json')
          .send(params.body)
          .set('Authorization', params.auth || '')
          .query(params.query)
          .end((err, res)=> {
            processAPIResponse(getState, dispatch, apiAction, deferred, params, err, res);
        });
      }
    });

  }
}

function extractParams(callApi) {
  let {
    method,
    path,
    url,
    contentType,
    auth,
    query,
    body,
    successType,
    errorType,
    afterSuccess,
    afterError,
    cache
  } = callApi;

  // TODO: Append Host from Config
  url = path;

  return {
    method,
    url,
    contentType,
    auth,
    query,
    body,
    successType,
    errorType,
    afterSuccess,
    afterError,
    cache
  };
}

function processAPIResponse(getState, dispatch, apiAction, deferred, params, err, res) {
  if (err) {
    if ( params.errorType ) {
      dispatch(actionWith(apiAction, {
        type: params.errorType,
        error: err
      }));
    }

    if (_.isFunction(params.afterError)) {
      params.afterError({ getState, err });
    }
    deferred.reject();
  } else {
    let resBody = res.body;
    if ( params.successType ) {
      dispatch(actionWith(apiAction, {
        type: params.successType,
        resBody
      }));
    }

    if (_.isFunction(params.afterSuccess)) {
      params.afterSuccess({ getState, resBody });
    }
    deferred.resolve(resBody);
  }
}
