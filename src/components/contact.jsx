import contact from "../content/contact.svg";
import React, { Fragment } from "react";
import "./contact.css";
export const Contact = () => (
  <Fragment>
    <div className="container">
      <img className="contact" src={contact}></img>
    </div>
  </Fragment>
);
