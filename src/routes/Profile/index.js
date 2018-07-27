import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { TableHeader, Accordian } from '../../components';
import { SnackbarAction, UserAction } from '../../actions';
import { CopyToClipboardHelper } from '../../helpers';
import { COLORS } from '../../constants';

const APPLICATION_STATUS = {
  ACTIVE: COLORS.GREEN,
  INACTIVE: COLORS.RED
}

const STYLES = {
  MAIN: {
    overflow: 'hidden',
    flexGrow: 1,
    padding: '0px 115px',
    marginTop: '60px',
    fontFamily: 'Asap'
  },
  CONTAINER: {
    overflow: 'hidden',
    padding: '0px 50px'
  },
  TABLE_ROW: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  CHANGE_STATUS: (status) => {
    return {
      color: COLORS.WHITE,
      backgroundColor: APPLICATION_STATUS[status]
    }
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      vertical: 'bottom',
      horizontal: 'center',
      expanded: null
    };
    this.copyTextToClipboard = this.copyTextToClipboard.bind(this);
    this.handleAccordionChange = this.handleAccordionChange.bind(this);
  }

  componentDidMount() {
    let options = {
      afterSuccess: () => {
      },
      afterError: () => {
      }
    };
    this.props.actions.getMyProfile(options);
  }


  copyTextToClipboard(textToCopy) {
    CopyToClipboardHelper.copy(textToCopy);
    this.props.actions.openSnackbar('Copied to Clipboard');
  }

  handleAccordionChange = panel => (event, expanded) => {
   this.setState({
     expanded: expanded ? panel : false,
   });
  };

  render() {
    const { expanded } = this.state;
    const { myProfile } = !!this.props ? this.props : {};
    return (
        <section style={STYLES.MAIN}>
          <Grid container style={STYLES.CONTAINER}>
            <Grid item xs={12} sm={12} md={12}>
              <Paper style={{ borderRadius: '12px', overflow: 'hidden'}} >
                <TableHeader />
                <Accordian
                  expanded={expanded}
                  applicationData={myProfile}
                  handleAccordionChange={this.handleAccordionChange}
                  copyTextToClipboard={this.copyTextToClipboard}
                  defaultExpanded={true}
                />
              </Paper>
            </Grid>
          </Grid>
        </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    myProfile: !!state.userStore.profile ? state.userStore.profile : {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openSnackbar: (data) => dispatch(SnackbarAction.show(data)),
      getMyProfile: (options) => dispatch(UserAction.getMyProfile(options))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
