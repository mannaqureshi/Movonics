import React, { Fragment } from "react";
import van from "../content/divider.svg";
import logo from "../content/logo secondary.svg";
import roller from "../content/roller.svg";

import "./divider.css";
export const Divider = ({ title, type }) => {
  return (
    <Fragment>
      <div className="container">
        <div className="divider-container">
          {type == 1 && <img className="van" src={van} alt="van" />}
          {type == 2 && (
            <Fragment>
              {/* <img className="logo" src={logo} alt="van" /> */}
              <img className="roller" src={roller} alt="van" />
            </Fragment>
          )}
          <p className="heading-secondary blue divider">{title}</p>
        </div>
      </div>
    </Fragment>
  );
};
