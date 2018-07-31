import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { COLORS } from '../../constants';
import { DialogAction, SnackbarAction, LeadAction } from '../../actions';
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
     boxShadow: "0 10px 18px 0 rgba(168, 168, 168, 0.56)"
   }
 }
};

class AddComments extends Component {
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
        _this.props.actions.openSnackbar('Lead comment added')
        _this.props.actions.closeDialog();
        setTimeout(() => {
          _this.props.dialogActions.reloadPage();
        }, 800);
      },
      afterError: () => {
        _this.props.actions.openSnackbar('Failed to add lead comment');
      }
    };

    let {LeadID} = this.props.dialogData;

    // let {columnKey,LeadID} = this.props.dialogData;


    if(!!LeadID){

        let text = form.Comments.value;

        console.log(LeadID,text);

        this.props.actions.addLeadComments(text,LeadID,options);

        // formData.week=(columnKey === "LastWeekComments") ? CurrentWeek-1 : CurrentWeek;
        // formData.AgentID = Auth.isLoggedIn();
        // console.log(moment().week());
        // Auth.getAgentID()
        // console.log(formData);

    }else{
      _this.props.actions.openSnackbar('Failed to fetch details');
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
    const { LeadID } = this.props.dialogData;

    const { Comments } = this.state.form;
    return (
      <div style={STYLES.ADD_APP_FORM.CONTAINER}>
        <div style={STYLES.ADD_APP_FORM.WRAP}>
          <FormControl disabled  style={{ width: '100%',marginBottom:"10px" }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='BranchId'>Lead Id</InputLabel>
            <Input id='LeadID'
              type='text'
              name='LeadID'
              value={LeadID}
              onChange={this.onFormChange}
              onKeyUp={this.onFormSubmit}
              onBlur={this.onInputBlur}
              style={{ width: '100%' }} />
          </FormControl>
          <FormControl error={Comments.dirty && Comments.error}  style={{ width: '100%' }}>
            <InputLabel style={STYLES.ADD_APP_FORM.LABEL} htmlFor='BranchName'>Comment Here</InputLabel>
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
      addLeadComments: (text,leadId,options) => dispatch(LeadAction.addLeadComments(text,leadId,options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComments);
