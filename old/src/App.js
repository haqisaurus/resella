import React from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './router/PrivateRoute';
import PrivateRouteStore from './router/PrivateRouteStore';
import Dashboard from './pages/dashboard/Dashboard';
import ListStore from './pages/store/ListStore';
import AddStore from './pages/store/AddStore';
import Page404 from './pages/errors/Error404';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRouteStore path="/app" component={Dashboard} />
          <PrivateRoute path="/my-store" component={ListStore} />
          <PrivateRoute path="/new-store" component={AddStore} />
          <Route component={Page404} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);