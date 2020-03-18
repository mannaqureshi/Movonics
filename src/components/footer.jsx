import footerBackground from "../content/footer.svg";
import React, { Fragment } from "react";
import { GlobalConfig, callUs, emailUs } from "../config";
import visaSVG from "../content/visa.svg";
import mastercardSVG from "../content/mastercard.svg";
import { Link } from "react-router-dom";
import scrollTo from "scroll-to-element";
import "./footer.css";

const footerHanlder = () => {
  scrollTo("body");
};

const Footer = () => {
  return (
    <Fragment>
      <div className="call-fixed" onClick={callUs}>
        <ion-icon name="call"></ion-icon>
      </div>
      <img
        style={{ width: `100%`, marginTop: `20px` }}
        src={footerBackground}
        alt="footer"
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
                <p className="heading-secondary">How can we help?</p>
                <p className="heading-secondary">Contact Us anytime.</p>
                <div className="footer-links">
                  <Link
                    onClick={footerHanlder}
                    exact
                    className="footer-link"
                    to="/"
                  >
                    Home
                  </Link>
                  <Link
                    onClick={footerHanlder}
                    exact
                    className="footer-link"
                    to="/paint"
                  >
                    Paint
                  </Link>
                  <Link
                    onClick={footerHanlder}
                    exact
                    className="footer-link"
                    to="/faqs"
                  >
                    FAQs
                  </Link>

                  <Link
                    onClick={footerHanlder}
                    exact
                    className="footer-link"
                    to="/policy"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
              <div className="footer-right">
                <div className="capsule shadow">
                  <div className="capsule-left">
                    <p className="text-secondary">SEND US EMAIL</p>
                    <p
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      onClick={emailUs}
                    >
                      support@movonics.com
                    </p>
                  </div>
                  <div className="capsule-right">
                    <p className="text-secondary">CALL US </p>
                    <p
                      className="text-secondary"
                      onClick={callUs}
                      style={{ cursor: "pointer" }}
                    >
                      0558276209
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="footer-payment"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img src={mastercardSVG} alt="mastercard"></img>
              <img src={visaSVG} alt="visa"></img>
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
