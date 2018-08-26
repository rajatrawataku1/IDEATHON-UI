import React from 'react';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import '../../CSS/loginForm.css';
import Input, { InputAdornment } from 'material-ui/Input';
import Icon from 'material-ui/Icon';

const VendorFull = ({ form, onInputChange, onInputBlur, onLoginClick }) => {

  const { retailerName, phoneNumber, pinCodeRetailer, income, year } = form;

  return (
  <center>
    <Grid container>
      <Grid item xs={12}>
       <br/>
      </Grid>
      <Grid item xs={12}>
        <p className="LOGIN_HEADER_TEXT">
          Retail Business? We will help you out!
          </p> <br/> <br/>
      </Grid>

      <Grid item xs={12}>
        <FormControl  error={retailerName.dirty && retailerName.error} style={{ width: '100%',marginBottom:"15px"}}>
            <Input id='retailerName'
                  type='retailerName'
                  name='retailerName'
                  value={retailerName.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline={true}
                  placeholder="Enter your name"
                  className="LOGIN_INPUT"
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon style={{color:"#e4e4e4"}}> search</Icon>
                    </InputAdornment>
                  }
                 />
                <FormHelperText>{retailerName.errorMessage}</FormHelperText>
        </FormControl>
      </Grid>


      <Grid item xs={12}>
        <FormControl  error={pinCodeRetailer.dirty && pinCodeRetailer.error} style={{ width: '100%' }}>
            <Input id='pinCodeRetailer'
                  type='pinCodeRetailer'
                  name='pinCodeRetailer'
                  value={pinCodeRetailer.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline={true}
                  placeholder="Enter pin code"
                  className="LOGIN_INPUT"
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon style={{color:"#e4e4e4"}}> my_location</Icon>
                    </InputAdornment>
                  }
                 />
                <FormHelperText>{pinCodeRetailer.errorMessage}</FormHelperText>
        </FormControl>

      </Grid>

      <Grid item xs={12}>
        <FormControl  error={phoneNumber.dirty && phoneNumber.error} style={{ width: '100%' }}>
            <Input id='phoneNumber'
                  type='phoneNumber'
                  name='phoneNumber'
                  value={phoneNumber.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline={true}
                  placeholder="Enter phone number"
                  className="LOGIN_INPUT"
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon style={{color:"#e4e4e4"}}> phone</Icon>
                    </InputAdornment>
                  }
                 />
                <FormHelperText>{phoneNumber.errorMessage}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl  error={income.dirty && income.error} style={{ width: '100%' }}>
            <Input id='income'
                  type='income'
                  name='income'
                  value={income.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline={true}
                  placeholder="Enter income"
                  className="LOGIN_INPUT"
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon style={{color:"#e4e4e4"}}>attach_money</Icon>
                    </InputAdornment>
                  }
                 />
                <FormHelperText>{income.errorMessage}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl  error={year.dirty && year.error} style={{ width: '100%' }}>
            <Input id='year'
                  type='year'
                  name='year'
                  value={year.value}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  onKeyUp={onLoginClick}
                  disableUnderline={true}
                  placeholder="Experience in bussiness (year)"
                  className="LOGIN_INPUT"
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon style={{color:"#e4e4e4"}}> style</Icon>
                    </InputAdornment>
                  }
                 />
                <FormHelperText>{year.errorMessage}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
      <br/>
      </Grid>

      <Grid item xs={12}>
        <Button onClick={onLoginClick} variant="extendedFab" aria-label="search" className="search_now_button">
         Submit
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

export default VendorFull;
