import { DIALOG_ACTION_TYPES } from '../action-types';

export const DialogAction = {
  open,
  close
};

function open(dialogType, data = {}, dialogActions = {}) {
  return {
    type: DIALOG_ACTION_TYPES.OPEN_DIALOG,
    dialogType,
    data,
    dialogActions
  };
}

function close() {
  return {
    type: DIALOG_ACTION_TYPES.CLOSE_DIALOG
  };
}
