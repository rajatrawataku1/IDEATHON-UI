import React from 'react';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import '../../CSS/loginForm.css';
import Input, { InputAdornment } from 'material-ui/Input';
import Icon from 'material-ui/Icon';


const LoginForm = ({ form, onInputChange, onInputBlur, onLoginClick }) => {
  const { product, pinCode } = form;

  return (
  <center>
    <Grid container>
      <Grid item xs={12}>
       <br/>
      </Grid>
      <Grid item xs={12}>
        <p className="LOGIN_HEADER_TEXT">Lets Begin...</p> <br/> <br/>
      </Grid>


      <Grid item xs={12}>
        <FormControl  error={product.dirty && product.error} style={{ width: '100%',marginBottom:"15px"}}>
            <Input id='product'
                  type='product'
                  name='product'
                  value={product.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline={true}
                  placeholder="Enter product name"
                  className="LOGIN_INPUT"
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon style={{color:"#e4e4e4"}}> search</Icon>
                    </InputAdornment>
                  }
                 />
                <FormHelperText>{product.errorMessage}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl  error={pinCode.dirty && pinCode.error} style={{ width: '100%' }}>
            <Input id='pinCode'
                  type='pinCode'
                  name='pinCode'
                  value={pinCode.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline={true}
                  placeholder="Enter Pin Code"
                  className="LOGIN_INPUT"
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon style={{color:"#e4e4e4"}}> my_location</Icon>
                    </InputAdornment>
                  }
                 />
                <FormHelperText>{pinCode.errorMessage}</FormHelperText>
        </FormControl>

      </Grid>

      <Grid item xs={12}>
      <br/>
      </Grid>

      <Grid item xs={12}>
      <Button onClick={onLoginClick} variant="extendedFab" aria-label="search" className="search_now_button">
       Explore
       <Icon style={{color:"#e4e4e4",marginLeft:"5px"}}> send</Icon>
     </Button>

      </Grid>

      <Grid item xs={12}>
      <br/>
      </Grid>

    </Grid>
  </center>
  );
};

export default LoginForm;
