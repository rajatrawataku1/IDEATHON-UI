import { SNACKBAR_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';

export default function snackbarReducer(state = {}, action) {
  let snackbarStore = _.assign({}, state);
  switch (action.type) {
    case SNACKBAR_ACTION_TYPES.OPEN:
      snackbarStore.open = true;
      snackbarStore.data = action.data;
      break;

    case SNACKBAR_ACTION_TYPES.CLOSE:
      snackbarStore.open = false;
      delete snackbarStore.data;
      break;

    default:
      return state;
  }

  return snackbarStore;
}
