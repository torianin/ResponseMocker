import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Responce mocker
      </a>

      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
