import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

import LoginForm from './LoginForm';
import { SnackbarAction, UserAction } from '../../actions';
import { Auth } from '../../helpers';
import { TextInput, TEXT_INPUT_TYPES } from '../../classes';
import { COLORS, APP_ADMIN , LANDING_IMAGE, FONTS} from '../../constants';

const STYLES = {
  MAIN: {
      paddingTop:"45%",
      flexGrow: 1,
      overflow:"show",
      fontFamily:"Lato"
   },
   HEADER_TEXT: {
     color: "#58595b",
     fontFamily: "Verdana",
     fontSize: '20px',
     margin: '0px',
     zindex:"1",
     textAlign: "center"
   },
   HIGHLIGHTED_TEXT: {
     color: COLORS.LIGHT_YELLOW
   },
   APP_IMG: {
     width: '400px',
     position: 'relative',
     left:  '70px',
     top:'10px'
   }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: new TextInput(TEXT_INPUT_TYPES.ALPHA_NUMERIC, '', true),
        password: new TextInput(TEXT_INPUT_TYPES.PASSWORD, '', true)
      }
    };

    // Method Hard-binding
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    console.log('CDM: login');
    if(Auth.isLoggedIn()) {

      console.log(Auth.getUserDataByKey('Role'));
      if(!!Auth.getUserDataByKey('Role') && (Auth.getUserDataByKey('Role') === 'FLL' || Auth.getUserDataByKey('Role') === 'SLL' )) {
        console.log("I am fll or sll");
        history.push("/view");

      } else {
        console.log("I am fls");
        history.push("/dashboard?agentId="+Auth.getUserDataByKey('Id'));
      }

    } else {
      console.log('LOGGED OUT');
      Auth.deregister();
    }
  }
  // Form Input Change Event Handler
  onInputChange(event) {
    const { form } = this.state,
      { value, name } = event.target,
      input = form[name];
    if(input) {
      input.onChange(value);
      this.setState({ form });
    }
  }

  // Form Input Blur Event Handler
  onInputBlur(event) {
    const { form } = this.state,
      { value, name } = event.target,
      input = form[name];

    if (input) {
      input.onBlur(value);
      this.setState({ form });
    }
  }

  // Form Login Button Click Handler
  onLoginClick(event) {
    const _this = this;
    const { history } = this.props;

    // Execute only 'Click' Events or Enter 'keyup' Event
    const { type, keyCode } = event;
    if ( type !== 'click' && (type === 'keyup' && keyCode !== 13) ) { return; }

    // Validate Login Form and Call API to Login User
    const loginValid = this._validateLogin();
    if(!loginValid) {
      return _this.props.actions.openSnackbar('Login Failed. Fill the form fields');
    }

    const { form } = this.state,
      options = {
        afterSuccess: () => {
          _this.props.actions.openSnackbar('Login Successfull');

          // routing depending upon the type of role
          console.log(Auth.getUserDataByKey('Role'));
          if(!!Auth.getUserDataByKey('Role') && (Auth.getUserDataByKey('Role') === 'FLL' || Auth.getUserDataByKey('Role') === 'SLL' )) {
            console.log("I am fll or sll");
            history.push("/view");
          } else {
            console.log("I am fls");
            history.push("/dashboard?agentId="+Auth.getUserDataByKey('Id'));
          }

        },
        afterError: () => {
          _this.props.actions.openSnackbar('Login Failed');
        }
      };
    this.props.actions.login(form, options);
  }

  // Validate Login Form Inputs and Return 'valid' Flag Value
  _validateLogin() {
    const { form } = this.state;
    let valid = true;

    Object.keys(form).forEach(key => {
      const input = form[key];
      input.checkValidity();
      valid = !input.error;
    });

    this.setState({ form });
    return valid;
  }

  render() {
    const { form } = this.state;
    return (
        <section style={STYLES.MAIN}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <LoginForm
                form={form}
                onInputChange={this.onInputChange}
                onInputBlur={this.onInputBlur}
                onLoginClick={this.onLoginClick}
                />
            </Grid>
          </Grid>
        </section>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      login: (form, options) => dispatch(UserAction.login(form, options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
