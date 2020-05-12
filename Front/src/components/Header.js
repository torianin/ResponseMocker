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
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Responce mocker
        </Link>

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
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(Header);
