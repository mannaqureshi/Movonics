import React from "react";

import "./index.css";
import { render } from "react-dom";
import { App } from "./App";
import { HashRouter } from "react-router-dom";

render(
  <HashRouter>
    <App></App>
  </HashRouter>,
  document.getElementById("root")
);
