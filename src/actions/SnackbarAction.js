import { SNACKBAR_ACTION_TYPES } from '../action-types';

export const SnackbarAction = {
  show,
  hide
};

function show(data = {}) {
  return {
    type: SNACKBAR_ACTION_TYPES.OPEN,
    data
  };
}

function hide() {
  return {
    type: SNACKBAR_ACTION_TYPES.CLOSE
  };
}
