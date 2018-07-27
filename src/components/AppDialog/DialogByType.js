import React from 'react';
import LogoutDialog from './LogoutDialog';
import AddApplication from './AddApplication';
import AddBranch from './AddBranch';
import DeleteBranch from './DeleteBranch';
import UpdateBranch from './UpdateBranch';
import AddLeadComments from './AddLeadComments';
import ManagerComments from './ManagerComments';
import SelfComments from './SelfComments';

const AppDialogByType = ({ dialogData, dialogType, onDialogClose, dialogActions }) => {
  switch (dialogType) {
    case 'ADD_BRANCH':
      return (<AddBranch
                onDialogClose={onDialogClose}
                dialogActions={dialogActions}
                dialogData={dialogData}
                openSnackbar={dialogActions.openSnackbar}
              />);
      break;

    case 'DELETE_BRANCH':
      return (<DeleteBranch
                onDialogClose={onDialogClose}
                dialogActions={dialogActions}
                dialogData={dialogData}
                openSnackbar={dialogActions.openSnackbar}
              />);
        break;

    case 'UPDATE_BRANCH':
      return (<UpdateBranch
                onDialogClose={onDialogClose}
                dialogActions={dialogActions}
                dialogData={dialogData}
                openSnackbar={dialogActions.openSnackbar}
              />);
      break;

    case 'LOGOUT':
      return (<LogoutDialog onDialogClose={onDialogClose} dialogActions={dialogActions}/>);
      break;

    case 'ADD_LEAD_COMMENTS':
      return (<AddLeadComments
                onDialogClose={onDialogClose}
                dialogActions={dialogActions}
                dialogData={dialogData}
                openSnackbar={dialogActions.openSnackbar}
              />);
      break;

    case 'ADD_SELF_COMMENT':
      return (<SelfComments
                onDialogClose={onDialogClose}
                dialogActions={dialogActions}
                dialogData={dialogData}
                openSnackbar={dialogActions.openSnackbar}
              />);
      break;

      case 'ADD_MANAGER_COMMENT':
        return (<ManagerComments
                  onDialogClose={onDialogClose}
                  dialogActions={dialogActions}
                  dialogData={dialogData}
                  openSnackbar={dialogActions.openSnackbar}
                />);
        break;


    default:
      return false;
  }
}

export default AppDialogByType;
