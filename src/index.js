import React from "react";

import "./index.css";
import { render } from "react-dom";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
  document.getElementById("root")
);
// http://movonics.s3-website.ap-south-1.amazonaws.com/
