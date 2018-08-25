import React from 'react';
import { TATA_LOGO } from '../constants';
import { Link } from "react-router-dom";
import Grid from 'material-ui/Grid';
import HeaderRightProfile from './HeaderRightProfile';
import HeaderLeft from './HeaderLeft';
import '../CSS/header.css';
import { Auth } from '../helpers';
import Button from 'material-ui/Button';


import { COLORS } from '../constants'
const STYLES = {
  ROOT: {
    position:"fixed",
    top:"0",
    width:"100%",
    height:"auto",
    overflow: 'hidden',
    flexGrow: '1',
    backgroundColor:COLORS.HEADER_COLOR,
    paddingTop:"2px",
    paddingBottom:"2px",
    fontFamily:"Lato",
    zIndex:"2"
    // padding: '50px 121px 30px 115px',
  },
  LOGO_IMAGE:{
    height:"75px",
    padding:"10px"
  }
}
const Header = ({ onLogoutClick, showHeaderMenu, closeHeaderMenu, headerAnchorEl }) => {
  const isLoggedIn = Auth.isLoggedIn();
  // const isLoggedIn = true;

  return (

    <div style={STYLES.ROOT}>
      <Grid container>
      <Grid item xs={4} sm={4} md={4} className="flex-row flex-justify-left">
        <Link to="/"><img style={STYLES.LOGO_IMAGE} src={TATA_LOGO} alt="hdfc-life-logo"/></Link>
      </Grid>

        <Grid item xs={2} sm={2} md={2} className="flex-row">
        </Grid>
        <Grid item xs={6} sm={6} md={6} className="flex-row flex-justify-end flex-align-center button_margin">
          <Button variant="outlined" color="primary" className="CUSTOMER_BUTTON">
             Customer
          </Button>

          <Button variant="contained" color="primary" className="VENDOR_BUTTON">
             Vendor
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
