import React from 'react';
import Grid from 'material-ui/Grid';
import { COLORS } from '../constants';

const STYLES = {
  MAIN:{
    padding: '20px 45px 10px 45px',
    borderBottom: ['1px solid', COLORS.WHITE_SMOKE].join(' ')
  },
  TABLE_HEADER: {
    color: COLORS.VIOLET,
    fontSize: '16px',
    fontWeight: 500,
    textTransform: 'uppercase'
  }
};


const TableHeader = () => {
  return (
    <Grid container style={STYLES.MAIN}>
      <Grid style={STYLES.TABLE_HEADER} item xs={12} sm={3} md={3} >Branch Id</Grid>
      <Grid style={STYLES.TABLE_HEADER} item xs={12} sm={3} md={2} >Branch Name</Grid>
      <Grid style={STYLES.TABLE_HEADER} item xs={12} sm={3} md={2}  >Radius</Grid>
      <Grid style={STYLES.TABLE_HEADER} item xs={12} sm={3} md={2}  >Location (Lat,Long) </Grid>
      <Grid style={STYLES.TABLE_HEADER} item xs={12} sm={3} md={3} className="flex-row flex-justify-end" >Status</Grid>
    </Grid>
  );
}

export default TableHeader;
