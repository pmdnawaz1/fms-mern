import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand text-black" to="/">
          Flight Management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-black" to="/flight-search">
                Flight Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/bookings">
                Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/signup">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
