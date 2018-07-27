import React from 'react';
import { Link } from "react-router-dom";
import Menu, { MenuItem, MenuList } from 'material-ui/Menu';
import {SHOW_MORE,PROFILE_LOGO, PROFILE_ICON, COLORS, FONTS} from '../constants';
import { Auth } from '../helpers';
import Grid from 'material-ui/Grid';

const STYLES = {
  LABEL:{
    color:"white",
    fontSize:"14px"
  },
  LABEL_TWO:{
    color:"black",
    fontSize:"14px"
  },
  CONTAINER:{
    width:"100%",
    backgroundImage:"linear-gradient(to right, #556080, #ffffff)",
    padding:"12px 12px 12px 12px"
  },
  PROFILE: {
    NAME: {
      color: COLORS.WHITE,
      fontFamily: 'Asap',
      fontSize: '16px',
      cursor: 'pointer',
      fontFamily:FONTS.MAINFONT,
    },
    ICON: {
      cursor: 'pointer',
      height:"44px",
      width:"44px",
      backgroundColor:"#d8d8d8",
      borderRadius:"50%",
      marginLeft:"10px"
    },
    SHOW_MORE_ICON:{
      marginRight:"28px",
      paddingLeft:"10px"
    }
  }
}

const BoxHeader = ({LeftHeading, RightHeading}) => {

  return (

      <Grid container style={STYLES.CONTAINER}>
        <Grid item xs={6} className="flex-row flex-justify-start" style={STYLES.LABEL}>
          {LeftHeading}
        </Grid>
        <Grid item xs={6} className="flex-row flex-justify-end" style={STYLES.LABEL_TWO}>
          {RightHeading}
        </Grid>
      </Grid>

  );
};

export default BoxHeader;
