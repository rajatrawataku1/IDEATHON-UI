import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from '../helpers';

import Login from './Login/';

import { LeadListView, View, Dashboard } from './Views'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    (!!Auth.isLoggedIn() && <Component {...props} /> )
      ||
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
  )}/>
);


const WrongRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
  )}/>
);


const Routes = () => {
  return(
    <main className="ScreensPosition">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <WrongRoute path="*" component={Login}/>
      </Switch>
    </main>
  );
}

export default Routes;
