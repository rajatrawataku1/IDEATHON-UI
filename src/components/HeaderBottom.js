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
    bottom:"0",
    width:"100%",
    height:"auto",
    overflow: 'hidden',
    flexGrow: '1',
    paddingTop:"2px",
    paddingBottom:"2px",
    fontFamily:"Lato",
    zIndex:"2",
    backgroundColor:"rgb(242, 242, 242)",
    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12) !important"
    // padding: '50px 121px 30px 115px',
  },
  LOGO_IMAGE:{
    height:"75px",
    padding:"10px"
  }
}
const HeaderBottom = ({ onLogoutClick, showHeaderMenu, closeHeaderMenu, headerAnchorEl }) => {
  const isLoggedIn = Auth.isLoggedIn();
  // const isLoggedIn = true;

  return (
    <div style={STYLES.ROOT}>
      <Grid container>
      <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">
      <br/>
      </Grid>

        <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">
        © 2018  Team Troy
        </Grid>
        <Grid item xs={12} sm={12} md={12} className="flex-row flex-justify-center">
        <br/>
        </Grid>
      </Grid>
    </div>
  );
};

export default HeaderBottom;
