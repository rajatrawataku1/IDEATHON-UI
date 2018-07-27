import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { COLORS } from '../../constants';
import { DialogAction, SnackbarAction, ApplicationAction } from '../../actions';
import { ApplicationForm } from '../../classes';

const STYLES = {
 ADD_APP_FORM: {
   CONTAINER: {
     width: '240px',
     borderRadius: '0px 0px 12px 12px',
     padding: '0px 50px 35px 50px'
   },
   WRAP: {
     marginTop: '25px'
   },
   HEADER: {
     color: COLORS.VIOLET,
     fontFamily: 'Capriola',
     paddingTop: '25px',
     fontSize: '18px'
   },
   BUTTON: {
     width: '100%',
     marginTop: '40px',
     padding: '10px',
     borderRadius: '6px',
     fontSize: '20px',
     fontWeight: '500',
     fontFamily: 'Asap',
     backgroundColor: COLORS.INDIGO
   }
 }
};

class AddApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: new ApplicationForm()
    };

    this.onFormChange = this.onFormChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;
    const newForm = new ApplicationForm(form);

    const input = newForm[name];
    let val = value !== null ? value : '';
    input.onChange(val);
    this.setState({ form: newForm });
  }

  onInputBlur(event) {
    const { name, value } = event.target;
    const { form } = this.state;
    const newForm = new ApplicationForm(form);

    const input = newForm[name];
    let val = value !== null ? value : '';
    input.onChange(val);
    this.setState({ form: newForm });
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
        _this.props.actions.openSnackbar('Application created')
        _this.props.actions.closeDialog();
        setTimeout(() => {
          _this.props.dialogActions.reloadPage();
        }, 800);
      },
      afterError: () => {
        _this.props.actions.openSnackbar('Failed to create application');
      }
    };
    let formData = {};
    if(!!form) {
      Object.keys(form).forEach((key, index) => {
        let keyval = key.toLowerCase();
        formData[keyval] = form[key].value;
      });
    }

    this.props.actions.create(formData, options);
  }

  checkFormValidity() {
    const { form } = this.state;
    const newForm = new ApplicationForm(form);
    let formInvalid = false;
    Object.keys(form).forEach(key => {
      const input = newForm[key];
      input.checkValidity();
      formInvalid = formInvalid || input.error;
    });

    // validate Confirm password
    let password = newForm.Password;
    let confirmPassword = newForm.ConfirmPassword;
    if(!formInvalid) {
      if(password.value !== confirmPassword.value) {
        confirmPassword.setError('Password doesn\'t match');
        formInvalid = formInvalid || confirmPassword.error;
      }
    }


    this.setState({ form: newForm });
    return !formInvalid;
  }

  render() {
    const { Name, UserName, Password, ConfirmPassword } = this.state.form;

    return (
      <div style={STYLES.ADD_APP_FORM.CONTAINER}>
        <h1 style={STYLES.ADD_APP_FORM.HEADER}>Add User</h1>
        <div style={STYLES.ADD_APP_FORM.WRAP}>
          <FormControl error={Name.dirty && Name.error} style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='Name'>Application Name</InputLabel>
            <Input id='Name'
              type='text'
              name='Name'
              value={Name.value}
              onChange={this.onFormChange}
              onKeyUp={this.onFormSubmit}
              onBlur={this.onInputBlur}
              style={{ width: '100%' }} />
            <FormHelperText>{Name.errorMessage}</FormHelperText>
          </FormControl>
          <FormControl error={UserName.dirty && UserName.error}  style={{ width: '100%' }}>
            <InputLabel  style={STYLES.ADD_APP_FORM.LABEL} htmlFor='UserName'>Username</InputLabel>
              <Input id='UserName'
                    type='text'
                    name='UserName'
                    value={UserName.value}
                    onChange={this.onFormChange}
                    onKeyUp={this.onFormSubmit}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{UserName.errorMessage}</FormHelperText>
          </FormControl>
          <FormControl error={Password.dirty && Password.error} style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='Password'>Password</InputLabel>
              <Input id='Password'
                    type='password'
                    name='Password'
                    value={Password.value}
                    onChange={this.onFormChange}
                    onKeyUp={this.onFormSubmit}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{Password.errorMessage}</FormHelperText>
          </FormControl>
          <FormControl error={ConfirmPassword.dirty && ConfirmPassword.error} style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='ConfirmPassword'>Confirm Password</InputLabel>
              <Input id='ConfirmPassword'
                    type='password'
                    name='ConfirmPassword'
                    value={ConfirmPassword.value}
                    onChange={this.onFormChange}
                    onKeyUp={this.onFormSubmit}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{ConfirmPassword.errorMessage}</FormHelperText>
          </FormControl>

          <Button onClick={this.onFormSubmit} variant="raised" color="primary" style={STYLES.ADD_APP_FORM.BUTTON}>Create App</Button>
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
      create: (form, options) => dispatch(ApplicationAction.create(form, options)),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddApplication);
