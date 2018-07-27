import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Auth } from '../helpers';

import Login from './Login/';
import Profile from './Profile/';

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
    <main>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute  path="/dashboard" component={Dashboard} />
        <PrivateRoute  path="/lead" component={LeadListView} />
        <PrivateRoute exact  path="/view" component={View} />
        <WrongRoute path="*" component={Login}/>
      </Switch>
    </main>
  );
}

export default Routes;
