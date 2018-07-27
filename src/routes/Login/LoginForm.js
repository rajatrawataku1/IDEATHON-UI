import React from 'react';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { COLORS, FONTS } from '../../constants';
import '../../CSS/loginForm.css';


const LoginForm = ({ form, onInputChange, onInputBlur, onLoginClick }) => {
  const { username, password } = form;

  return (

    <center>
    <Grid container >
      <Grid item xs={12}>
        <p className="LOGIN_HEADER_TEXT" >WAR Login</p> <br/>
      </Grid>
      <Grid item xs={12}>
        <FormControl  error={username.dirty && username.error} style={{ width: '69%',marginBottom:"15px"}}>
            <Input id='username'
                  type='username'
                  name='username'
                  value={username.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline="true"
                  placeholder="Username"
                  className="LOGIN_INPUT text-field-style"
                 />
                <FormHelperText>{username.errorMessage}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>

        <FormControl  error={password.dirty && password.error} style={{ width: '69%' }}>
            <Input id='password'
                  type='password'
                  name='password'
                  value={password.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline="true"
                  placeholder="Password"
                  className="LOGIN_INPUT text-field-style"
                 />
                <FormHelperText>{password.errorMessage}</FormHelperText>
        </FormControl>

      </Grid>

      <Grid item xs={12}>
        <Button onClick={onLoginClick} variant="raised" color="primary"  className="LOGIN_BUTTON">login</Button>

      </Grid>

    </Grid>
  </center>
  );
};

export default LoginForm;
