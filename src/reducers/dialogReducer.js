import { DIALOG_ACTION_TYPES } from '../action-types';
import * as _ from 'lodash';

export default function dialogReducer(state = {}, action) {
  let dialogStore = _.assign({}, state);
  switch (action.type) {
    case DIALOG_ACTION_TYPES.OPEN_DIALOG:
      dialogStore.open = true;
      dialogStore.dialogType = action.dialogType;
      dialogStore.data = action.data;
      dialogStore.dialogActions = action.dialogActions;
      break;

    case DIALOG_ACTION_TYPES.CLOSE_DIALOG:
      dialogStore.open = false;
      delete dialogStore.dialogType;
      delete dialogStore.data;
      delete dialogStore.dialogActions;
      break;

    default:
      return state;
  }

  return dialogStore;
}
