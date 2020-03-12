import React, { Fragment } from "react";
import { Collapse } from "antd";
import { GlobalConfig } from "../config";
const { Panel } = Collapse;

export const Faqs = () => {
  const faqs = [
    {
      title: "Damage Protection",
      desc: `Every pre-caution is taken to ensure that there are no damages to your furniture or any other articles. In the unlikely event of any damages we will ensure get the damages repaired. The damage repair cost does not exceed 50% of the Invoice value. We will not be replacing any items in any event.`
    },
    {
      title: "Payment Terms",
      desc: `50% of the invoice value is required as a deposit to book your move. The remaining 50% can be paid at the time of completion of the move.`
    },
    {
      title: "Payment Modes",
      desc: `We accept cash, credit card and/or bank deposits. If you would like to pay by cheque then carry out of the move after the cheque is cleared.`
    },
    {
      title: "Working Hours",
      desc: `We work 7 days a week except for Eid holidays in the UAE. We will let you know at the time of the booking if we are not working on that day. In most cases we are working throughout the year.`
    },
    {
      title: "Move-in & Move-out Permissions",
      desc: `It is the responsibility of the customer to arrange for the move-in and move-out permissions prior to the move date. Please obtain these permissions from the building/community management and/or the landlord in order to ensure smooth operation.`
    },
    {
      title: "Cancellation Policy",
      desc: `Plans change and we understand that you may have to move or change your bookings with us. Please let us know at least 24 hours prior to moving or cancelling your job so we can adjust the bookings. If there is a cancellation less than 24 hours from the booking date/time your security deposit with us is not refunded. If there is a cancelation on the date of the move. Movonics can charge the full amount if the move/booked job.`
    },
    {
      title: "Additional Truck(s) or Materials",
      desc: `In the event your furniture exceeds the numbers of trucks stipulated in your Invoice, there will be a charge of AED 400 per truck/trip and any additional boxes will be charges at AED 10 per box.`
    },
    {
      title: "Curtains and Handyman Work",
      desc: `Everything that we will remove from your current house, we will install at your new house as well. In case there are some additional requirements for any new lights or curtains to be installed, they will be charged at an additional rate.`
    },
    {
      title: "Cash or Jewellery",
      desc: `
      We do not take any responsibility for Cash or Jewellery or any other personal belongings. We highly recommend that the customers move these items themselves. We can provide the packing boxes in advance to facilitate the process.`
    },
    {
      title: "Refund Policy",
      desc: `In case of cancellation more than 48 hours prior to the move date we will be happy to refund any deposit(s) in full.`
    },
    {
      title: "Storage Terms & Conditions",
      desc: `Minimum storage is for 1 month and it is paid in advance. if the numbers of days your items stored with us are more than a month then one additional month will be charged.`
    },
    {
      title: "Painting Jobs - Colors",
      desc: `In case different colors are required for painting other than the standard colors (white/off-white) the paint charges will be billed as actuals and will be payable by the client unless otherwise specified in the invoice.`
    },
    {
      title: "Move-in & Move-out Paint",
      desc: `Standard Move-in & Move-out Paint contains the cleaning of the current walls and then applying the new paint. This also includes minor repairs like hole fixing because of drills etc. This does not include any major repairs. If the wall colors need to be changed then there are additional charges unless otherwise specified in the invoice.`
    },
    {
      title: "General Terms & Condition - Data Collection",
      desc: `​​The Information collected will be used for for the purposes of getting you the best prices for required services. Your personal information will only be used to provide you the best possible pricing solutions. Your information will not be shared with any third-party services for anything other than the services mentioned.
      In case of any Move-In or Move-out, it is the responsibility of the customer to arrange for the permits. Terms and conditions of Logistive LLC/Movonics will be applicable at the time of booking and job start and completion. The prices shared at this stage are estimates based on the inputs collected and detailed price quote will be individually sent. For further details please visit www.movonics.com or send us an email at support@movonics.com  `
    }
  ];
  return (
    <Fragment>
      <div className="container">
        <p style={{ textAlign: "center" }} className="heading-secondary blue">
          FAQs
        </p>
        {faqs.map((e, i) => {
          return (
            <Collapse
              style={{
                background: GlobalConfig.white
              }}
              bordered={false}
            >
              <Panel header={e.title} key={i}>
                <p>{e.desc}</p>
              </Panel>
            </Collapse>
          );
        })}
      </div>
    </Fragment>
  );
};
