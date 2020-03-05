import React, { Fragment } from "react";
import van from "../content/divider.svg";

import "./divider.css";
export const Divider = ({ title }) => {
  return (
    <Fragment>
      <div className="container">
        <div className="divider-container">
          <img src={van} alt="van" />
          <p className="heading-secondary blue divider">{title}</p>
        </div>
      </div>
    </Fragment>
  );
};
