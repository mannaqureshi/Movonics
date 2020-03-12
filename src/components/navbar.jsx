import React, { Fragment } from "react";
import scrollTo from "scroll-to-element";
import logo from "../content/logo.svg";
import { CustomButton } from "./button";
import { GlobalConfig, scrollToForm } from "../config";
import { NavLink, withRouter, Link } from "react-router-dom";
import "./navbar.css";
const _NavBar = props => {
  const isMobile = window.innerWidth < 767;
  const navClickHandler = () => {
    scrollTo("body");
  };
  return (
    <Fragment>
      <div
        style={{
          position: "sticky",
          top: 0,
          background: GlobalConfig.white,
          zIndex: 999
        }}
        className="container-fluid shadow"
      >
        <div className="container-fluid headline">
          <div className="container">
            <p
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                window.open("tel:0558276209");
              }}
              className="text-primary"
            >
              Call Us Now at +971 55 827 6209
            </p>
          </div>
        </div>
        <div className="container">
          <nav className="nav">
            <div className="nav-left">
              <div className="nav-logo">
                <Link to="/" onClick={navClickHandler}>
                  <img src={logo} alt="movonics logo"></img>
                </Link>
              </div>
            </div>
            <div className="nav-right">
              {!isMobile && (
                <Fragment>
                  <NavLink
                    onClick={navClickHandler}
                    exact
                    className="nav-link"
                    activeClassName="nav-link-active"
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    onClick={navClickHandler}
                    exact
                    className="nav-link"
                    activeClassName="nav-link-active"
                    to="/paint"
                  >
                    Paint
                  </NavLink>
                  <NavLink
                    onClick={navClickHandler}
                    exact
                    className="nav-link"
                    activeClassName="nav-link-active"
                    to="/faqs"
                  >
                    FAQs
                  </NavLink>

                  <NavLink
                    onClick={navClickHandler}
                    exact
                    className="nav-link"
                    activeClassName="nav-link-active"
                    to="/policy"
                  >
                    Privacy Policy
                  </NavLink>
                  <div>
                    <CustomButton
                      onClick={() => {
                        props.history.push("/");
                        setTimeout(() => {
                          scrollToForm();
                        }, 200);
                      }}
                    >
                      Book Now
                    </CustomButton>
                  </div>
                </Fragment>
              )}

              {isMobile && (
                <div onClick={props.toggleSidebar}>
                  <ion-icon name="menu-outline"></ion-icon>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export const NavBar = withRouter(_NavBar);
