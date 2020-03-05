import footerBackground from "../content/footer.svg";
import React, { Fragment } from "react";
import { GlobalConfig } from "../config";
import "./footer.css";

const Footer = () => {
  return (
    <Fragment>
      <img
        style={{ width: `100%`, marginTop: `20px` }}
        src={footerBackground}
      ></img>
      <div
        style={{
          backgroundColor: GlobalConfig.primary_color,
          marginTop: "-10px"
        }}
        className="container-fluid "
      >
        <div className="container">
          <footer>
            <div className="footer">
              <div className="footer-left">
                <p className="heading-secondary">How can we help</p>
                <p className="heading-secondary">Contact Us anytime.</p>
              </div>
              <div className="footer-right">
                <div className="capsule shadow">
                  <div className="capsule-left">
                    <p className="text-secondary">SEND US EMAIL</p>
                    <p className="text-secondary">support@movonics.com</p>
                  </div>
                  <div className="capsule-right">
                    <p className="text-secondary">CALL US </p>
                    <p className="text-secondary">0558276209</p>
                  </div>
                </div>
              </div>
            </div>

            <p
              className="text-primary"
              style={{
                textAlign: "center",
                marginTop: `4rem`,
                paddingBottom: "2rem"
              }}
            >
              Movonics is a Brand of Logistive LLC. &copy; 2020
            </p>
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

export { Footer };
