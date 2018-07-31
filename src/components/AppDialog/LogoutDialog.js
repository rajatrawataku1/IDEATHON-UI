import React from 'react';
import { DialogTitle, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { COLORS } from '../../constants';

const STYLES = {
  MAIN: {
    padding: '30px'
  },
  WRAPPER: {
    minWidth: '500px',
    overflow: 'auto'
  },
  ACTION_CONTAINER: {
    backgroundColor: '#fff',
    marginTop: '-26px',
    paddingBottom: '20px',
    paddingRight: '20px',
    textAlign: 'right'
  },
  YES_ACTION_BUTTON: {
    color: COLORS.LIGHT_BLUE
  },
  NO_ACTION_BUTTON: {
    color: COLORS.PINKINSH_RED
  }
};

const LogoutDialog = ({ onDialogClose, dialogActions }) => {
  // onDialogClose = onDialogClose || () => {};
  let { onLogoutConfirm } = dialogActions;
  const title = "Are you sure you want to logout ?";

  return(
    <div style={STYLES.WRAPPER}>
      <DialogTitle style={{textAlign: 'center'}}>{title}</DialogTitle>
      <DialogActions>
        <Button className="flex-row flex-justify-end" onClick={onLogoutConfirm} color="primary" style={STYLES.YES_ACTION_BUTTON}>
          Yes
        </Button>
        <Button className="flex-row flex-justify-end" onClick={onDialogClose} color="primary" style={STYLES.NO_ACTION_BUTTON}>
          No
        </Button>
      </DialogActions>
    </div>
  );
};

export default LogoutDialog;
