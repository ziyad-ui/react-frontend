import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">School Dashboard</span>
      </div>
      <nav className="navbar-right">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button className="link-button" type="button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

