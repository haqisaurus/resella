import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ListStore from './pages/store/ListStore';
import AddStore from './pages/store/AddStore';
import Page404 from './pages/errors/Error404';
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('cred')
  return (
    <Route
      {...rest}
      render={(props) => (
        token !== null || true ?
          <Component {...props} /> :
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    />
  )
}
const PrivateRouteStore = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('cred')
  return (
    <Route
      {...rest}
      render={(props) => (
        token !== null || true ?
          <Component {...props} /> :
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    />
  )
}

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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);