import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { COLORS } from '../../constants';
import { DialogAction, SnackbarAction, DashboardAction } from '../../actions';
import { ApplicationForm } from '../../classes';
// import { Application } from '../../classes';
// import moment from 'moment';
// import Auth from '../../helpers';

const STYLES = {
 ADD_APP_FORM: {
   LABEL:{
     color:COLORS.BLACK,
     fontSize:"14px",
     fontWeight:"500",
     fontFamily: "Lato",
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
     fontFamily: "Lato",
     paddingTop: '25px',
     fontSize: '18px',
   },
   BUTTON: {
     color:"white",
     width: '100%',
     marginTop: '40px',
     padding: '10px',
     borderRadius: '6px',
     fontSize: '14px',
     fontWeight: '500',
     fontFamily: "Lato",
     backgroundColor: COLORS.BUTTON_COLOR,
     boxShadow: "0 12px 18px 0 rgba(168, 168, 168, 0.56)"
   }
 }
};

class ManagerComments extends Component {
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
    const input = form[name];
    let val = value !== null ? value : '';
    input.onChange(val);
    this.setState({ form: form });
  }

  onInputBlur(event) {
    const { name, value } = event.target;
    const { form } = this.state;
    const input = form[name];
    let val = value !== null ? value : '';
    input.onChange(val);
    this.setState({ form: form });
  }

  onFormSubmit(event) {

    let { week,managerId,agentId } = this.props.dialogData;

    const _this = this;

    // Execute only 'Click' Events or Enter 'keyup' Event
    const { type, keyCode } = event;

    if ( type !== 'click' && (type === 'keyup' && keyCode !== 13) ) { return; }

    const { form } = this.state;

    const formValid = this.checkFormValidity();

    console.log(form,formValid,week,agentId,managerId);

    if (!formValid) { return; }

    let options = {
      afterSuccess: () => {
        _this.props.actions.openSnackbar('Manager Comment Added')
        _this.props.actions.closeDialog();
        setTimeout(() => {
          _this.props.dialogActions.reloadPage();
        }, 800);
      },
      afterError: () => {
        _this.props.actions.openSnackbar('Cannot Comment');
      }
    };


    if(!!week){

        let text = form.Comments.value;
        console.log(text,week,managerId,agentId)
        // this.props.actions.setManagerComments(week,text,managerId,agentId,options);
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


    // const { LeadID,columnKey } = this.props.dialogData;

    const { Comments } = this.state.form;
    return (
      <div style={STYLES.ADD_APP_FORM.CONTAINER}>
        <div style={STYLES.ADD_APP_FORM.WRAP}>
          <FormControl error={Comments.dirty && Comments.error}  style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='BranchName'>Manager Comment Here</InputLabel>
              <Input id='Comments'
                    autoFocus={true}
                    multiline={true}
                    rows="3"
                    type='text'
                    name='Comments'
                    value={Comments.value}
                    onChange={this.onFormChange}
                    onBlur={this.onInputBlur}
                    style={{ width: '100%' }} />
                  <FormHelperText>{Comments.errorMessage}</FormHelperText>
          </FormControl>
          <Button onClick={this.onFormSubmit} variant="raised" color="primary" style={STYLES.ADD_APP_FORM.BUTTON}>Add Comment</Button>
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
      setManagerComments: (week,text,managerId,agentId,options) =>dispatch(DashboardAction.setManagerComments(week,text,managerId,agentId,options)),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerComments);
