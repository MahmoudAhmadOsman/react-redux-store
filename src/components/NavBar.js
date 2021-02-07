import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <section classNameName="main-navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <Link className="navbar-brand" to="/">
          Redux Shopping Cart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to="#">
                  Login
                </Link>
              </div>
            </li>
          </ul>

          <div className="my-2 my-lg-0">
            <ul class="nav navbar-nav navbar-right ">
              <li>
                <Link to="#" className="mr-2">
                  Register
                </Link>
              </li>
              <li>
                <Link to="#">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
