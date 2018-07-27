import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { COLORS, FONTS} from '../../constants';
import { DialogAction, SnackbarAction, ApplicationAction } from '../../actions';
import { ApplicationForm } from '../../classes';
import { Application } from '../../classes';

const STYLES = {
 ADD_APP_FORM: {

   LABEL:{
     color:COLORS.BLACK,
     fontSize:"12px",
     fontWeight:"500",
     fontFamily: FONTS.MAINFONT,
   },

   CONTAINER: {
     width: '240px',
     borderRadius: '0px 0px 12px 12px',
     padding: '0px 50px 35px 50px'
   },
   WRAP: {
     marginTop: '25px'
   },
   HEADER: {
     color: COLORS.BLACK,
     fontFamily: FONTS.MAINFONT,
     paddingTop: '25px',
     fontSize: '18px',
   },
   BUTTON: {
     width: '100%',
     marginTop: '40px',
     padding: '10px',
     borderRadius: '6px',
     fontSize: '18px',
     fontWeight: '500',
     fontFamily: FONTS.MAINFONT,
     backgroundColor: COLORS.BUTTON_COLOR,
     boxShadow: "0 12px 18px 0 rgba(168, 168, 168, 0.56)"
   }
 }
};

class DeleteBranch extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }


  onDeleteClick(event) {
    const _this=this;
    let formData = _this.props.dialogData.BranchId;

    // Execute only 'Click' Events or Enter 'keyup' Event

    let options = {
      afterSuccess: () => {
        _this.props.actions.openSnackbar('Branch Deleted')
        _this.props.actions.closeDialog();
        setTimeout(() => {
          _this.props.dialogActions.reloadPage();
        }, 800);
      },
      afterError: () => {
        _this.props.actions.openSnackbar('Failed to Delete Branch');
      }
    };


    if(!!formData){
      console.log(formData);
      this.props.actions.delete(formData, options);
    }

  }

  render() {
    console.log(this.props.dialogData);
    const { BranchId, BranchName, Radius, Lat, Lon } = this.props.dialogData;

    return (
      <div style={STYLES.ADD_APP_FORM.CONTAINER}>
        <h1 style={STYLES.ADD_APP_FORM.HEADER}>Delete Branch</h1>
        <div style={STYLES.ADD_APP_FORM.WRAP}>
          <FormControl disabled style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='BranchId'>Branch Id</InputLabel>
            <Input id='BranchId'
              type='text'
              name='BranchId'
              value={BranchId}
              style={{ width: '100%' }} />
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl  disabled style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='BranchName'>Branch Name</InputLabel>
              <Input id='BranchName'
                    type='text'
                    name='BranchName'
                    value={BranchName}
                    style={{ width: '100%' }} />
                  <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl  disabled style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='Radius'>Radius</InputLabel>
              <Input id='Radius'
                    type='number'
                    name='Radius'
                    value={Radius}
                    style={{ width: '100%' }} />
                  <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl disabled style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL}  htmlFor='Lat'>Latitude</InputLabel>
              <Input id='Lat'
                    type='number'
                    name='Lat'
                    value={Lat}
                    style={{ width: '100%' }} />
                  <FormHelperText></FormHelperText>
          </FormControl>

          <FormControl disabled  style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='Lon'>Longitude</InputLabel>
              <Input id='Lon'
                    type='number'
                    name='Lon'
                    value={Lon}
                    style={{ width: '100%' }} />
                  <FormHelperText></FormHelperText>
          </FormControl>
          <Button onClick={this.onDeleteClick} variant="raised" color="primary" style={STYLES.ADD_APP_FORM.BUTTON}>Confirm Delete</Button>
        </div>
      </div>
    );
  }
};


function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      closeDialog: () => dispatch(DialogAction.close()),
      delete: (form, options) => dispatch(ApplicationAction.deleteBranch(form, options)),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBranch);
