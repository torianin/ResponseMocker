import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import Unauthorized from './Unauthorized';
import Login from './Login';
import Tester from './Tester';
import ResponseCreate from './ResponseCreate';
import ResponseEdit from './ResponseEdit';

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
        <Route path="/responses/create" exact component={ResponseCreate} />
        <Route path="/responses/edit/:slug" exact component={ResponseEdit} />
        <Route path="/tester" exact component={Tester} />
        <footer className="footer fixed-bottom text-center py-2 text-light bg-dark">
          Torianin 2021 - 0.1.0 ({process.env.NODE_ENV})
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(Container);
