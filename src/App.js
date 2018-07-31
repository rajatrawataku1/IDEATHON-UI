import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Snackbar from 'material-ui/Snackbar';
import { Header, AppDialog } from './components';
import { SnackbarAction, UserAction } from './actions';
import Routes from './routes';
import './App.css';

// const TEMPLATE_THEME = new MuiThemeColors(COLORS.LOGIN_COLOR);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5ffcc7",
      main: "#03c896",
      dark: "#009668",
    }
  }
});

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      snackbarPosition: {
        vertical: 'bottom',
        horizontal: 'center',
      },
      headerAnchorEl: null,
    }

    this.onSnackbarClose = this.onSnackbarClose.bind(this);
    this.showHeaderMenu = this.showHeaderMenu.bind(this);
    this.closeHeaderMenu = this.closeHeaderMenu.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  showHeaderMenu = event => {
    this.setState({
      headerAnchorEl: event.currentTarget
    });
  }

  closeHeaderMenu() {
    this.setState({
      headerAnchorEl: null
    });
  }

  onLogoutClick(){
    const { history } = this.props;
    this.closeHeaderMenu();
    this.props.actions.logout();
    history.push('/');
  }

  onSnackbarClose() {
    this.props.actions.closeSnackbar();
  }

  render() {
    let dialogStatus = !!(this.props.dialogStatus) ? this.props.dialogStatus : false;
    let dialogData = !!(this.props.dialogData) ? this.props.dialogData : {};
    let dialogType = !!(this.props.dialogType) ? this.props.dialogType : {};
    let dialogActions = !!(this.props.dialogActions) ? this.props.dialogActions : {};

    const { vertical, horizontal } = this.state.snackbarPosition;
    const { headerAnchorEl } = this.state;
    let snackbarStatus = !!(this.props.snackbarStatus) ? this.props.snackbarStatus : false;
    let snackbarText = !!(this.props.snackbarText) ? this.props.snackbarText : '';

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Header
              onLogoutClick={this.onLogoutClick}
              showHeaderMenu={this.showHeaderMenu}
              closeHeaderMenu={this.closeHeaderMenu}
              headerAnchorEl={headerAnchorEl}
              />
            <Routes />
            <AppDialog
              open={dialogStatus}
              nudge={dialogData}
              dialogType={dialogType}
              dialogActions={dialogActions}
            />

            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={snackbarStatus}
              autoHideDuration={2000}
              onClose={this.onSnackbarClose}
              SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{snackbarText}</span>}
            />

          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    dialogStatus: state.dialogStore.open || false,
    dialogData: state.dialogStore.data || {},
    dialogType: state.dialogStore.dialogType || {},
    dialogActions: state.dialogStore.dialogActions || {},
    snackbarStatus: state.snackbarStore.open || false,
    snackbarText: state.snackbarStore.data || '',
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      closeSnackbar: () => dispatch(SnackbarAction.hide()),
      logout: () => dispatch(UserAction.logout()),
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
