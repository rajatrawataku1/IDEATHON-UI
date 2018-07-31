import React from 'react';
import { HDFC_LIFE_LOGO } from '../constants';
import { Link } from "react-router-dom";
import Grid from 'material-ui/Grid';
import HeaderRightProfile from './HeaderRightProfile';
import HeaderLeft from './HeaderLeft';
import '../CSS/header.css';
import { Auth } from '../helpers';

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
    height:"50px",
    padding:"5px 0px 0px 0px"
  }
}
const Header = ({ onLogoutClick, showHeaderMenu, closeHeaderMenu, headerAnchorEl }) => {
  const isLoggedIn = Auth.isLoggedIn();
  // const isLoggedIn = true;

  return (
    <div style={STYLES.ROOT}>
      <Grid container>
        <Grid item xs={4} sm={4} md={4} className="flex-row">
          { (isLoggedIn && <HeaderLeft/>) || null }
        </Grid>
        <Grid item xs={4} sm={4} md={4} className="flex-row flex-justify-center">
          <Link to="/"><img style={STYLES.LOGO_IMAGE} src={HDFC_LIFE_LOGO} alt="hdfc-life-logo"/></Link>
        </Grid>
        <Grid item xs={4} sm={4} md={4} className="flex-row flex-justify-end flex-align-center">
          { (isLoggedIn && <HeaderRightProfile onLogoutClick={onLogoutClick} showHeaderMenu={showHeaderMenu} closeHeaderMenu={closeHeaderMenu} headerAnchorEl={headerAnchorEl}/>) || null }
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
