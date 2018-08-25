import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';

import LoginForm from './LoginForm';
import { SnackbarAction, UserAction } from '../../actions';
import { Auth } from '../../helpers';
import { TextInput, TEXT_INPUT_TYPES } from '../../classes';
import { COLORS, APP_ADMIN , LANDING_IMAGE, FONTS} from '../../constants';
import Paper from 'material-ui/Paper';

const STYLES = {

  OTHER_DIV:{
    position:"absolute",
    top:"42px",
    left:"0%",
    width:"100%",
    height:"350px",
    flexGrow: 1,
    overflow:"show",
    fontFamily:"Lato",
    backgroundColor:"#f2f2f2"
  },

  MAIN: {
      position:"absolute",
      top:"250px",
      left:"50%",
      transform:"translate(-50%,0%)",
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
        product: new TextInput(TEXT_INPUT_TYPES.ALPHA_NUMERIC, '', true),
        pinCode: new TextInput(TEXT_INPUT_TYPES.ALPHA_NUMERIC, '', true)
      }
    };

    // Method Hard-binding
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  componentDidMount() {
    // const { history } = this.props;
    // console.log('CDM: login');
    // if(Auth.isLoggedIn()) {
    //
    //   console.log(Auth.getUserDataByKey('Role'));
    //   if(!!Auth.getUserDataByKey('Role') && (Auth.getUserDataByKey('Role') === 'FLL' || Auth.getUserDataByKey('Role') === 'SLL' )) {
    //     console.log("I am fll or sll");
    //     history.push("/view");
    //
    //   } else {
    //     console.log("I am fls");
    //     history.push("/dashboard?agentId="+Auth.getUserDataByKey('Id'));
    //   }
    //
    // } else {
    //   console.log('LOGGED OUT');
    //   Auth.deregister();
    // }
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
      return _this.props.actions.openSnackbar('Product Fetching Failed. Fill the form fields');
    }

    const { form } = this.state,
      options = {
        afterSuccess: () => {
          _this.props.actions.openSnackbar('Product Fetching Successfull');

          // this view will be the final product

          history.push("/view");

          // routing depending upon the type of role
          //
          // console.log(Auth.getUserDataByKey('Role'));
          // if(!!Auth.getUserDataByKey('Role') && (Auth.getUserDataByKey('Role') === 'FLL' || Auth.getUserDataByKey('Role') === 'SLL' )) {
          //   console.log("I am fll or sll");
          //   history.push("/view");
          // } else {
          //   console.log("I am fls");
          //   history.push("/dashboard?agentId="+Auth.getUserDataByKey('Id'));
          // }

        },
        afterError: () => {
          _this.props.actions.openSnackbar('Product Fetching Failed');
        }
      };

    this.props.actions.getAllProducts(form, options);
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
      <div>
        <div style={STYLES.OTHER_DIV}>
        </div>
        <Paper style={STYLES.MAIN}>
          <section>
            <Grid container className="flex-row flex-justify-center">
              <Grid item xs={10} sm={10} md={10} lg={10}>
                <LoginForm
                  form={form}
                  onInputChange={this.onInputChange}
                  onInputBlur={this.onInputBlur}
                  onLoginClick={this.onLoginClick}
                  />
              </Grid>
            </Grid>
          </section>
        </Paper>
      </div>

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
      getAllProducts: (form, options) => dispatch(UserAction.getAllProducts(form, options))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
