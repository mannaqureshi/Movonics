import React, { Fragment } from "react";
import { Divider } from "../components/divider";

export const ThankYou = () => {
  return (
    <Fragment>
      <div className="page">
        <Divider type={1} title="Thank you very much!"></Divider>
        <p
          className="text-primary"
          style={{
            textAlign: "center"
          }}
        >
          Our representative will get in touch with you shortly to discuss your
          details.
          <br />
          You can always reach out us on the following details;
          <br />
          Movonics Support Team
          <br />
          <span style={{ fontWeight: "900" }}>M : </span>
          <a href="tel:0558276209">0558276209</a>
          <br />
          <span style={{ fontWeight: "900" }}>E : </span>
          <a href="mailto:support@movonics.com">support@movonics.com</a>
        </p>
      </div>
    </Fragment>
  );
};
