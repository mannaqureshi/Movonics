import React, { Fragment } from "react";
import { sections, pageTitle } from "../config";
import "./sections.css";
import { MasterForm } from "./masterform";

import { Divider } from "./divider";

const SectionList = ({ place }) => {
  document.title = pageTitle(place);
  const sectionsList = sections.map(
    ({ content, imageLink, traditional, isSection }, idx) => {
      return (
        <Fragment key={idx}>
          {isSection && (
            <Fragment>
              <MasterForm title="Get Free Quote" />
              <Divider title="Our Services"></Divider>
            </Fragment>
          )}
          <div key={idx} className="container">
            <div
              style={{
                display: `${window.innerWidth > 767 ? `flex` : "block"}`,
                flexDirection: `${traditional ? "row" : "row-reverse"}`
              }}
              className="section"
            >
              {window.innerWidth > 767 ? (
                <Fragment>
                  <div className="section-content">{content(place)}</div>
                  <div
                    className="section-image"
                    style={{ textAlign: `${traditional ? "right" : "left"}` }}
                  >
                    <img src={imageLink} alt="section"></img>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    className="section-image"
                    style={{ textAlign: `middle` }}
                  >
                    <img src={imageLink} alt="section"></img>
                  </div>
                  <div className="section-content">{content(place)}</div>
                </Fragment>
              )}
            </div>
          </div>
        </Fragment>
      );
    }
  );

  return <Fragment>{sectionsList}</Fragment>;
};

export { SectionList };
