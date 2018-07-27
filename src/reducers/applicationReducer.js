import { APPLICATION_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';
import { Application } from '../classes';

export default function applicationReducer(state = {}, action) {
  let applicationStore = _.assign({}, state);
  switch (action.type) {

    case APPLICATION_ACTION_TYPES.GET_APPLICATION_SUCCESS:
      const  responseBody  = action.resBody,
        responseData = responseBody.data;
        let apps = [];
        responseData.forEach((app) => {
          apps.push(new Application(app))
        })

        applicationStore.applications = apps;
      break;

    case APPLICATION_ACTION_TYPES.UPDATE_APP_FORM_ON_CHANGE:

      break;

    case APPLICATION_ACTION_TYPES.GET_APPLICATION_FAILURE:
      delete applicationStore.applications;
      break;

    default:
      return state;
  }
  return applicationStore;
}
