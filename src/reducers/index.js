import { combineReducers } from 'redux';
import dialogStore from './dialogReducer';
import snackbarStore from './snackbarReducer';
import userStore from './userReducer';
import applicationStore from './applicationReducer';
import dashboardStore from './dashboardReducer';
import leadViewStore from './leadReducer';
import fllStore from './fllReducer';
import sllStore from './sllReducer';


const rootReducer = combineReducers({
  dialogStore,
  snackbarStore,
  userStore,
  applicationStore,
  dashboardStore,
  leadViewStore,
  fllStore,
  sllStore
});

export default rootReducer;
