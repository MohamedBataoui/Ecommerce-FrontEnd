import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "./../auth/helpers";

import { useSelector } from "react-redux";

import toastr from "toastr";
import "toastr/build/toastr.css";

import { API_URL } from "./../config";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#f6e58d",
      borderBottom: "2px solid #f6e58d",
      paddingBottom: "0px",
    };
  } else {
    return { color: "#fff" };
  }
};

const Menu = (props) => {
  let countItem = useSelector((state) => state.cart.count);

  const signout = () => {
    fetch(`${API_URL}/signout`)
      .then(() => {
        toastr.info("User SignOut", "Next Time", {
          positionClass: "toast-bottom-left",
        });

        localStorage.removeItem("jwt_info");

        props.history.push("/signin");
      })
      .catch();
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand homeHover" to="/about">
          <i className="fas fa-book-reader fa-lg book"></i>
          Books Coding
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
            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item active">
                  <Link
                    style={isActive(props.history, "/")}
                    className="nav-link"
                    to="/"
                  >
                    Accueil <span className="sr-only">(current)</span>
                  </Link>
                </li>
              </Fragment>
            )}

            <li className="nav-item active">
              <Link
                style={isActive(props.history, "/about")}
                className="nav-link"
                to="/about"
              >
                A propos <span className="sr-only">(current)</span>
              </Link>
            </li>

            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item active">
                  <Link
                    style={isActive(props.history, "/shop")}
                    className="nav-link"
                    to="/shop"
                  >
                    Shop{" "}
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link
                    style={isActive(
                      props.history,
                      `${
                        isAuthenticated() && isAuthenticated().user.role === 1
                          ? "/admin"
                          : ""
                      }/dashboard`
                    )}
                    className="nav-link"
                    to={`${
                      isAuthenticated() && isAuthenticated().user.role === 1
                        ? "/admin"
                        : ""
                    }/dashboard`}
                  >
                    Mon Compte
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={isActive(props.history, "/signin")}
                    className="nav-link"
                    to="/signin"
                  >
                    Connexion
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    style={isActive(props.history, "/signup")}
                    className="nav-link"
                    to="/signup"
                  >
                    Inscription
                  </Link>
                </li>
              </Fragment>
            )}

            <Fragment>
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={signout}
                >
                  Deconnexion
                </span>
              </li>
              <li className="nav-item">
                <Link
                  style={isActive(props.history, "/cart")}
                  className="nav-link"
                  to="/cart"
                >
                  My Cart{" "}
                  <span className="badge badge-warning"> {countItem}</span>
                </Link>
              </li>
            </Fragment>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
