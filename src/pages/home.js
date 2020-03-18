import { SectionList } from "../components/sections";
import { sections } from "../config";

import pf4 from "../content/pf1.svg";
import pf2 from "../content/pf2.svg";
import pf1 from "../content/pf3.svg";
import pf3 from "../content/pf4.svg";

import React, { Fragment } from "react";
export const Home = () => (
  <Fragment>
    <SectionList sections={sections} place="UAE"></SectionList>
    <div style={{ width: "100%" }}></div>
  </Fragment>
);
