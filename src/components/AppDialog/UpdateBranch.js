import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { COLORS, FONTS } from '../../constants';
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

class AddBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: new ApplicationForm(this.props.dialogData)
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;
    const input = form[name];
    let val = value !== null ? value : '';
    input.onChange(val);
    this.setState({ form: form });
  }

  onInputBlur(event) {
    const { name, value } = event.target;
    console.log(value);
    const { form } = this.state;
    const input = form[name];
    let val = value !== null ? value : '';
    input.onChange(val);
    this.setState({ form: form });
  }

  onFormSubmit(event) {
    const _this = this;

    // Execute only 'Click' Events or Enter 'keyup' Event
    const { type, keyCode } = event;
    if ( type !== 'click' && (type === 'keyup' && keyCode !== 13) ) { return; }
    const { form } = this.state;
    const formValid = this.checkFormValidity();
    if (!formValid) { return; }

    let options = {
      afterSuccess: () => {
        _this.props.actions.openSnackbar('Branch updated')
        _this.props.actions.closeDialog();
        setTimeout(() => {
          _this.props.dialogActions.reloadPage();
        }, 800);
      },
      afterError: () => {
        _this.props.actions.openSnackbar('Failed to update Branch');
      }
    };

    let formInitial = new Application();
    let formData = formInitial.constructForm(form);
    formData.radius=Number(formData.radius);
    formData.location.lat=Number(formData.location.lat);
    formData.location.lon=Number(formData.location.lon);
    console.log(formData);

    if(!!formData){
      this.props.actions.updateBranch(formData, options);
    }

  }

  checkFormValidity() {
    const { form } = this.state;
    let formInvalid = false;
    Object.keys(form).forEach(key => {
      const input = form[key];
      input.checkValidity();
      formInvalid = formInvalid || input.error;
    });

    // validate Confirm password

    this.setState({ form: form });
    return !formInvalid;
  }

  render() {

    const { BranchId, BranchName, Radius, Lat, Lon } = this.state.form;
    console.log(Lat);

    return (
      <div style={STYLES.ADD_APP_FORM.CONTAINER}>
        <h1 style={STYLES.ADD_APP_FORM.HEADER}>Update Branch</h1>
        <div style={STYLES.ADD_APP_FORM.WRAP}>
          <FormControl disabled error={BranchId.dirty && BranchId.error} style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='BranchId'>Branch Id</InputLabel>
            <Input id='BranchId'
              type='text'
              name='BranchId'
              value={BranchId.value}
              onChange={this.onFormChange}
              onKeyUp={this.onFormSubmit}
              onBlur={this.onInputBlur}
              style={{ width: '100%' }} />
            <FormHelperText>{BranchId.errorMessage}</FormHelperText>
          </FormControl>
          <FormControl error={BranchName.dirty && BranchName.error}  style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='BranchName'>Branch Name</InputLabel>
              <Input id='BranchName'
                    type='text'
                    name='BranchName'
                    value={BranchName.value}
                    onChange={this.onFormChange}
                    onKeyUp={this.onFormSubmit}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{BranchName.errorMessage}</FormHelperText>
          </FormControl>

          <FormControl error={Radius.dirty && Radius.error}  style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='Radius'>Radius</InputLabel>
              <Input id='Radius'
                    type='number'
                    name='Radius'
                    value={Radius.value}
                    onChange={this.onFormChange}
                    onKeyUp={this.onFormSubmit}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{Radius.errorMessage}</FormHelperText>
          </FormControl>

          <FormControl error={Lat.dirty && Lat.error}  style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='Lat'>Latitude</InputLabel>
              <Input id='Lat'
                    type='number'
                    name='Lat'
                    value={Lat.value}
                    onChange={this.onFormChange}
                    onKeyUp={this.onFormSubmit}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{Lat.errorMessage}</FormHelperText>
          </FormControl>

          <FormControl error={Lon.dirty && Lon.error}  style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='Lon'>Longitude</InputLabel>
              <Input id='Lon'
                    type='number'
                    name='Lon'
                    value={Lon.value}
                    onChange={this.onFormChange}
                    onKeyUp={this.onFormSubmit}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{Lon.errorMessage}</FormHelperText>
          </FormControl>
          <Button onClick={this.onFormSubmit} variant="raised" color="primary" style={STYLES.ADD_APP_FORM.BUTTON}>Update Branch</Button>
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
      updateBranch: (form, options) => dispatch(ApplicationAction.updateBranch(form, options)),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBranch);
