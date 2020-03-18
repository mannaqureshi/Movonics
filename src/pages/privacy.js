import React, { Fragment } from "react";

const policies = [
  {
    heading: "Privacy Policy",
    content: `Movonics is committed to protect the rights of its online users
        regarding data collection and storage. We value our relationship with
        our customers and take care of their privacy concerns very seriously.
        Movonics collect and store information in a rightful way and keep
        identity of its users confidential.`
  },
  {
    heading: "Use of Information",
    content: (
      <Fragment>
        <ul>
          We use your information for following purposes:
          <li>To present content that maybe relevant to you</li>
          <li>To notify users of their order status</li>
          <li>
            To customize our services offerings by observing usage details
          </li>
          <li>
            If agreed, we may use your contact details to inform you about our
            services via telephone calls or SMS
          </li>
        </ul>
      </Fragment>
    )
  },
  {
    heading: "Personal Information Collected",
    content: `When you fill out a form on our website 
        "www.movonics.com", you share your full name, email
        address and telephone number with us. Movonics may also collect your IP
        address, browser type and location of your device. We also collect
        information regarding usage details that how many times you visit our
        website and which pages of our websites you view during your visit.
        Note: If any government owned regulatory authority asks us to share
        personal information of our users which we have collected, then we are
        bound to follow their instructions.`
  },
  {
    heading: "Cookie Policy ",
    content: `Movonics uses a feature of Internet Web browsers called Cookies to
        collect and store anonymous browsing information of users. We also use
        Facebook pixel which is an analytical tool that helps us in keeping a
        track of conversion rate from Facebook Ads. Our main purpose of using
        Facebook pixel is to remarket our services to those who have already
        interacted with our website.
         Moreover, Google Tag Manager also
        assists us in providing you with ads that maybe relevant to you. Here,
        it is important to mention that Google Tag Manager only collects
        aggregated data and does not collect IP addresses and any other specific
        identifiers. 
         Users can refuse the use of cookies by changing
        settings on their web browser.`
  },
  {
    heading: "Contact Information",
    content: `We appreciate the fact that you trust us regarding our data privacy
        policy. If you have any queries about our data privacy practices, you
        can reach out to us (email) or via (Phone number)`
  }
];

export const Privacy = () => {
  return (
    <Fragment>
      <div className="container">
        {policies.map((e, i) => {
          return (
            <div
              key={i}
              style={{
                marginBottom: "2rem"
              }}
            >
              <p className="heading-secondary blue">{e.heading}</p>
              <p className="text-primary">{e.content}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
