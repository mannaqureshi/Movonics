import React, { Fragment } from "react";
import { pageTitle } from "../config";
import "./sections.css";
import { Divider } from "./divider";

const SectionList = ({ place, sections }) => {
  document.title = pageTitle(place);
  const sectionsList = sections.map(
    ({ content, imageLink, traditional, isSection, reverse }, idx) => {
      return (
        <Fragment key={idx}>
          {isSection && <Divider type={1} title="Our Services"></Divider>}
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
                  {reverse && (
                    <div className="section-content">{content(place)}</div>
                  )}
                  <div
                    className="section-image"
                    style={{ textAlign: `middle` }}
                  >
                    <img src={imageLink} alt="section"></img>
                  </div>
                  {!reverse && (
                    <div className="section-content">{content(place)}</div>
                  )}
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
