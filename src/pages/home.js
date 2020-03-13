import { SectionList } from "../components/sections";
import { sections } from "../config";
import React, { Fragment } from "react";
export const Home = () => (
  <Fragment>
    <SectionList sections={sections} place="UAE"></SectionList>
  </Fragment>
);
