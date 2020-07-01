import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class Header extends React.Component {
  handleSignOutClick = () => {
    this.props.signOut();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Response mocker
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link className="nav-link text-light" to="/tester">
                  Tester
                </Link>
              </li>
              <li>
                <Link className="nav-link text-light" to="/live">
                  Live
                </Link>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              {!this.props.isSignedIn ? (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              ) : (
                <a className="nav-link" onClick={this.handleSignOutClick}>
                  Log out
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
