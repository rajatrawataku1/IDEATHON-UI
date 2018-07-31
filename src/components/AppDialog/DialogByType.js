import React from 'react';
import LogoutDialog from './LogoutDialog';
// import AddApplication from './AddApplication';
import AddLeadComments from './AddLeadComments';
import ManagerComments from './ManagerComments';
import SelfComments from './SelfComments';

const AppDialogByType = ({ dialogData, dialogType, onDialogClose, dialogActions }) => {
  switch (dialogType) {

    case 'LOGOUT':
      return (<LogoutDialog onDialogClose={onDialogClose} dialogActions={dialogActions}/>);

    case 'ADD_LEAD_COMMENTS':
      return (<AddLeadComments
                onDialogClose={onDialogClose}
                dialogActions={dialogActions}
                dialogData={dialogData}
                openSnackbar={dialogActions.openSnackbar}
              />);

    case 'ADD_SELF_COMMENT':
      return (<SelfComments
                onDialogClose={onDialogClose}
                dialogActions={dialogActions}
                dialogData={dialogData}
                openSnackbar={dialogActions.openSnackbar}
              />);

      case 'ADD_MANAGER_COMMENT':
        return (<ManagerComments
                  onDialogClose={onDialogClose}
                  dialogActions={dialogActions}
                  dialogData={dialogData}
                  openSnackbar={dialogActions.openSnackbar}
                />);

    default:
      return false;
  }
}

export default AppDialogByType;
