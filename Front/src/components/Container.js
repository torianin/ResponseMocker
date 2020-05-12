import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Unauthorized from './Unauthorized';
import Login from './Login';

class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <Route
          path="/"
          exact
          component={this.props.isSignedIn ? Dashboard : Unauthorized}
        />
        <Route path="/login" exact component={Login} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Container);
