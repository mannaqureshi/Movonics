import React, { Fragment } from "react";
import "./sidebar.css";
import { CustomButton } from "../components/button";
import { withRouter, NavLink } from "react-router-dom";
import scrollTo from "scroll-to-element";
export const Sidebar = withRouter(props => {
  const scrollToTop = () => {
    scrollTo("body");
    props.toggleSidebar();
  };
  const classes = props.isOpened ? "sidebar sidebar-open" : "sidebar";
  return (
    <Fragment>
      <div className={classes}>
        <div
          onClick={props.toggleSidebar}
          style={{ textAlign: "left", margin: "2rem" }}
        >
          <ion-icon name="close-outline"></ion-icon>
        </div>
        <div className="sidebar-container">
          <NavLink
            onClick={scrollToTop}
            exact
            className="nav-link"
            activeClassName="nav-link-active"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={scrollToTop}
            exact
            className="nav-link"
            activeClassName="nav-link-active"
            to="/paint"
          >
            Paint
          </NavLink>
          <NavLink
            onClick={scrollToTop}
            exact
            className="nav-link"
            activeClassName="nav-link-active"
            to="/faqs"
          >
            FAQs
          </NavLink>
          <NavLink
            onClick={scrollToTop}
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
                props.toggleSidebar();
                setTimeout(() => {
                  scrollTo("#masterform", {
                    offset: -100,
                    duration: 1000
                  });
                }, 200);
              }}
            >
              Book Now
            </CustomButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
});
