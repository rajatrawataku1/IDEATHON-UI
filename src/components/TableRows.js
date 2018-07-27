import React,{ Component } from 'react';
import { DialogAction, SnackbarAction, ApplicationAction } from '../actions';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { COLORS } from '../constants';

const LEAD_APP_STATUS = {
  ACTIVE: COLORS.GREEN,
  INACTIVE: COLORS.RED
}

const STYLES = {
  TABLE_ROW: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  CHANGE_STATUS: (status) => {
    return {
      color: COLORS.WHITE,
      backgroundColor: LEAD_APP_STATUS[status]
    }
  }
};


class TableRows extends Component {

    constructor(props){
      super(props);
      this.reloadPage = this.reloadPage.bind(this);
      this.showDeleteAppDialog = this.showDeleteAppDialog.bind(this);
      this.showUpdateDialog = this.showUpdateDialog.bind(this);
    }

    showDeleteAppDialog() {
      const dialogType = 'DELETE_BRANCH';
      const dialogData = this.props.appdata;
      let dialogActions = {reloadPage: this.reloadPage};
      this.props.actions.openDialog(dialogType, dialogData, dialogActions);
    }

    showUpdateDialog() {
      const dialogType = 'UPDATE_BRANCH';
      const dialogData = this.props.appdata;
      let dialogActions = {reloadPage: this.reloadPage};
      this.props.actions.openDialog(dialogType, dialogData, dialogActions);
    }


    reloadPage() {
      let options = {
        afterSuccess: () => {},
        afterError: () => {}
      };
      this.props.actions.getAllApps(options);
    }


    render(){

      const {BranchId,BranchName, Radius, Lat, Lon} = this.props.appdata;

      return(
        <Grid container style={{padding: '0px'}} className="flex-align-center">
          <Grid style={STYLES.TABLE_ROW} item xs={12} sm={3} md={3} >{BranchId}</Grid>
          <Grid style={STYLES.TABLE_ROW} item xs={12} sm={3} md={2}  >{BranchName}</Grid>
          <Grid style={STYLES.TABLE_ROW} item xs={12} sm={3} md={2} >{Radius}</Grid>
          <Grid style={STYLES.TABLE_ROW} item xs={12} sm={3} md={2} >{[Lat,Lon].join(" , ")}</Grid>
          <Grid style={STYLES.TABLE_ROW} item xs={12} sm={3} md={3} className="flex-row flex-justify-end" >
            <Button variant="contained" color="primary" onClick={this.showUpdateDialog}> Update </Button>
            <Button variant="contained" color="primary" onClick={this.showDeleteAppDialog} > Delete </Button>

          </Grid>
          {/* <Grid style={STYLES.TABLE_ROW} item xs={12} sm={3} md={3}  className="flex-row flex-justify-end">
            <Button disabled variant="raised" color="default" className="" >Active</Button>
          </Grid> */}
        </Grid>
      );

    }
}



function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openDialog: (dialogType, data, dataActions) => dispatch(DialogAction.open(dialogType, data, dataActions)),
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      getAllApps: (options) => dispatch(ApplicationAction.getApplications(options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRows);

// export default TableRows;
