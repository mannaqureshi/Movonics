import React, { Fragment } from "react";
import asset1 from "./content/main.svg";
import asset2 from "./content/family.svg";
import asset3 from "./content/international.svg";
import asset4 from "./content/commercial.svg";
import asset5 from "./content/paint.svg";
import asset6 from "./content/process.svg";
import { CustomButton } from "./components/button";
import { MasterForm } from "./components/masterform";
import scrollTo from "scroll-to-element";

const scrollToForm = () => {
  scrollTo("#masterform", {
    offset: -100,
    duration: 1000
  });
};
const callUs = () => {
  window.open("tel:0558276209");
};
const whatsappUs = () => {
  window.open(
    "https://api.whatsapp.com/send?phone=971558276209&text=&source=&data=",
    "_blank"
  );
};
const GlobalConfig = {
  primary_color: "#22D1EE",
  secondary_color: "#F99F4E",
  white: "#fff",
  black: "#333"
};

Object.freeze(GlobalConfig);

const isMobile = window.innerWidth < 767;

const CallToAction = {
  first: <CustomButton onClick={scrollToForm}>Get A Quote</CustomButton>,
  second: (
    <CustomButton whatsapp={true} onClick={whatsappUs}>
      <ion-icon name="logo-whatsapp"></ion-icon>
      <span>WhatsApp</span>
    </CustomButton>
  )
};

const sections = [
  {
    content: toBeChanged => (
      <Fragment>
        {isMobile && (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "1rem" }}>{CallToAction.first}</div>
            <div>{CallToAction.second}</div>
          </div>
        )}

        <p
          style={{ color: GlobalConfig.black }}
          className="heading-large black"
        >
          Book your move in {toBeChanged} with Movonics. ​Local, Domestic or
          Commercial Move Services.
        </p>

        <p className="heading-semi-large grey">
          When You Put Your Life In Boxes, It Matters Who Carries Them.
        </p>
        {!isMobile && (
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "1rem" }}>{CallToAction.first}</div>
            <div>{CallToAction.second}</div>
          </div>
        )}
        <div style={{ display: "flex" }}></div>
      </Fragment>
    ),
    imageLink: asset1,
    traditional: true
  },
  {
    content: toBeChanged => (
      <Fragment>
        <MasterForm title="Get Quote" />
      </Fragment>
    ),
    imageLink: asset6,
    traditional: true
  },
  {
    isSection: "Our Services",
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black">Local & Domestic Move</p>
        <p className="heading-secondary blue">
          We will make your residential move day, a family day
        </p>

        <p className="text-primary">
          Have you just been through the nerve racking process of buying a new
          house? Now, you must be considering relocating to your new house and
          unable to find any reliable movers and packers in {toBeChanged}? To
          take away all your worries, Movonics offers professional movers
          services in
          {toBeChanged}. We will take care of all your belongings and transfer
          it to your new house. Our movers will pack all your belongings with
          high quality packing material and load them in secure boxes to
          transfer them to your new home in hassle free manner.
        </p>
      </Fragment>
    ),
    imageLink: asset2,
    traditional: false
  },

  {
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black">Commercial And Office Move </p>
        <p className="heading-secondary blue">
          Relocate your office with commercial moving experts in {toBeChanged}
        </p>
        <p className="text-primary">
          Are you finding a trusted and reliable corporate relocation partner in
          {toBeChanged}? Look no further, We’ve got you covered. To cater all
          your office moving needs, Movonics is fully trusted and relied for
          office and business moves. Our skilled moving specialists will
          transfer your office furniture and workstations at your new office
          with utmost care. Using high quality packing material, We ensure safe
          and smooth transfer of your office equipment
        </p>
      </Fragment>
    ),
    imageLink: asset4,
    traditional: true
  },
  {
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black">
          Handyman & Paint Services in {toBeChanged}
        </p>
        <p className="heading-secondary blue">
          With paint & handyman services, Movonics takes privilege in completing
          your move
        </p>

        <p className="text-primary">
          Are you worried about dismantling curtain rails, assembling furniture
          and installing electronics on your moving day? If Yes! Then there is
          no need to worry about all these problems because we offer best
          handyman and paint services in Dubai. Does your new home, apartment or
          office need a new coat of paint? If Yes! Choose Movonics to give your
          place a brand new look.
        </p>
      </Fragment>
    ),
    imageLink: asset5,
    traditional: false
  },
  {
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black"> International Move</p>
        <p className="heading-secondary blue">
          Let Movonics handle your next International Move
        </p>
        <p className="text-primary">
          International move cannot be executed without a proper plan. At
          Movonics, our international mover specialists will assist you in
          developing a comprehensive moving plan pertaining to your all
          international move requirements. Our international specialists will
          also provide international moving quotes along with consultation while
          choosing the best channel according to your moving needs.
        </p>
      </Fragment>
    ),
    imageLink: asset3,
    traditional: true
  }
];
const pageTitle = name => "Movers in " + name;
// const baseURL = `http://localhost:5000`;
const baseURL = `http://ec2-13-58-13-167.us-east-2.compute.amazonaws.com:5000`;

export {
  GlobalConfig,
  sections,
  baseURL,
  pageTitle,
  scrollToForm,
  callUs,
  whatsappUs
};
