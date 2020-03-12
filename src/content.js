import React, { Fragment } from "react";

import asset1 from "./content/1.png";
import asset2 from "./content/2.png";
import asset3 from "./content/3.png";
import asset4 from "./content/handyman.svg";
import asset5 from "./content/paint.svg";
import asset6 from "./content/process.svg";
import { CustomButton } from "./components/button";

import scrollTo from "scroll-to-element";
import { PaintForm } from "./pages/paint";
import { GlobalConfig } from "./config";

const scrollToForm = () => {
  scrollTo("#paintForm", {
    offset: -100,
    duration: 1000
  });
};

const whatsappUs = () => {
  window.open(
    "https://api.whatsapp.com/send?phone=971558276209&text=&source=&data=",
    "_blank"
  );
};

const CallToAction = {
  first: <CustomButton onClick={scrollToForm}>Get A Quote</CustomButton>,
  second: (
    <CustomButton whatsapp={true} onClick={whatsappUs}>
      <ion-icon name="logo-whatsapp"></ion-icon>
      <span>WhatsApp</span>
    </CustomButton>
  )
};

Object.freeze(GlobalConfig);

const isMobile = window.innerWidth < 767;
export const sections = [
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
          We Take The Pain Out Of Painting.
        </p>

        <p className="heading-semi-large grey">
          Residential. Commercial. Interior. Exterior. We Paint them all.
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

    imageLink: asset5,
    traditional: true
  },
  {
    content: toBeChanged => (
      <Fragment>
        <PaintForm />
      </Fragment>
    ),
    reverse: true,
    imageLink: asset6,
    traditional: true
  },
  {
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black">
          Providing the highest quality painting and most professional services
        </p>
        <p className="heading-secondary blue">
          A trustworthy painting company.
        </p>

        <p className="text-primary">
          Movonics offers paint services in UAE, where our team of professional
          painters takes care of all your paint requirements. From choosing the
          best color and quality of paint, to mixing and applying to the walls.
          From painting the wall from scratch or covering up the mistakes made
          by rookie painters Movonics, a team of professionals knows their paint
          job and is trusted by thousands of satisfied customers all over UAE.
        </p>
      </Fragment>
    ),
    imageLink: asset1,
    traditional: false
  },

  {
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black">
          On-time. On budget. Guaranteed to last.
        </p>
        <p className="heading-secondary blue">
          Protecting surfaces and relationships.
        </p>
        <p className="text-primary">
          Our trusted painters are known for their compliance, professionalism
          and adherence to the client’s requirement. Our painters, are trained
          to perform tasks using modern day painting techniques, ensuring
          efficient utilization of paint.
        </p>
      </Fragment>
    ),
    imageLink: asset2,
    traditional: true
  },
  {
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black">
          For All Of Your Residential Painting Needs.
        </p>
        <p className="heading-secondary blue">Painting houses like homes.</p>

        <p className="text-primary">
          Movonics, ensures uncompromised standards of quality and safety for
          its customers. Not only is the paint itself easy on the pocket, but
          our painters also ensure that all the health and legal standards are
          met for client and our painters. Our Team of Professional Painters
          ensure selection of Eco-Friendly Paints that guarantee long lasting
          paint finishes which serves to everyone’s benefit. Our specially
          trained paint team, makes sure that our skilled painters avoid all the
          common mistakes committed by local painters. We adopt practices that
          ensure the safety of your household stuff from damage and wet paint.
          Free survey and consultation on painting ideas makes us unique. We
          strive to provide our clients with state-of-the-art painting methods,
          techniques and paint designs that makes your walls, villas and homes
          inimitable. From painting one-bedroom apartment to three-bedroom
          house, whether it is painting Mansions or estimating about your Villa
          Paint, from wall paint to ceiling paint. Movonics paint services are
          trusted and are UAE’s # 1.
        </p>
      </Fragment>
    ),
    imageLink: asset3,
    traditional: false
  },
  {
    content: toBeChanged => (
      <Fragment>
        <p className="heading-primary black">Does your home need a handyman?</p>
        <p className="heading-secondary blue">
          Call us or…screw it up yourself.
        </p>
        <p className="text-primary">
          Our professional staff will take care of handy man services along with
          the paint work which includes minor repairs, fixing the holes on the
          walls, installing and taking off curtains. If the apartment/villa is
          furnished then our staff will move the furniture around and then
          putting them back at the same place.{" "}
        </p>
      </Fragment>
    ),
    imageLink: asset4,
    traditional: true
  }
];
