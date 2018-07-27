import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { COLORS } from '../constants';

const STYLES = {
  COPY_BUTTON: {
    color: COLORS.WHITE,
    borderRadius: '6px',
    fontSize: '12px'
  },
  CONTAINER: {
    marginBottom: '5px'
  },
  TITLE: {
    color: COLORS.VIOLET,
    textTransform: 'uppercase',
    padding: '0px 5px',
    fontFamily: 'Capriola',
    marginBottom: '5px'
  },
  TO_COPY_VAL: {
    color: COLORS.VIOLET,
    borderRadius: '6px',
    border: ['2px solid', COLORS.WHITE_SMOKE].join(' ') ,
    padding: '8px 15px',
    fontSize: '14px'
  }
};

const InfoTag = ({ title, value, copyTextToClipboard, showCopyButton }) => {
  const headTitle = !!title ? title : '';
  const headValue = !!value ? value : '';

  if(!headValue) {
    return false;
  }

  return (
    <Grid container style={STYLES.CONTAINER}>
      <Grid item xs={12} sm={12} md={12} style={{padding: '10px 10px'}}>
        <div style={STYLES.TITLE}>{headTitle}</div>
        <div style={STYLES.TO_COPY_VAL} className="flex flex-justify-space-between">
          <div className="flex-row flex-align-center">
            {headValue}
          </div>
          {
            (!!showCopyButton &&
            <Button
              variant="flat"
              size="small"
              color="primary"
              onClick={event =>copyTextToClipboard(headValue)}
              style={STYLES.COPY_BUTTON}
              className="indigo-violet-gradient-bg">
              Copy
            </Button>)
            || null

          }

        </div>
      </Grid>
    </Grid>
  );
}

export default InfoTag;
