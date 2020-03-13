import React, { Fragment } from "react";
import { Divider } from "../components/divider";
import scrollTo from "scroll-to-element";

import { Input, DatePicker, Form, Select, message } from "antd";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import { sections } from "../content";
import { CustomButton } from "../components/button";
import { baseURL } from "../config";
import "../components/masterform.css";
import "antd/dist/antd.css";

import SVG from "../content/paint.svg";
import { withRouter } from "react-router-dom";
import { SectionList } from "../components/sections";

export const Options = {
  Request_Type: [
    "House/Villa",
    "Apartment",
    "Commercial/Warehouse",
    "Single/Few Walls"
  ],
  Paint_Required_For: ["Furnished", "Unfurnished"],
  Paint_Job_Description: [
    "Studio Apartment Move",
    "1 Bedroom Apartment Move",
    "2 Bedroom Apartment/House Move",
    "3 Bedroom Apartment/House Move",
    "4 Bedroom Apartment/House Move",
    "5 Bedroom Apartment/House Move",
    "Single/Few Walls"
  ],
  Booleans: ["yes", "no"],
  Paint_Type: [
    "Move-in Paint",
    "Move-out Paint",
    "Door(s) Painting",
    "Outdoor Paint"
  ],
  Web_Source: [
    "Google",
    "Family/Friends",
    "Real Estate",
    "Phone Call",
    "WhatsApp",
    "Social Media"
  ]
};

const Conditions = {
  A: "House/Villa",
  B: "Apartment",
  C: "Commercial/Warehouse",
  D: "Single/Few Walls"
};

const FormKeys = {
  Request_Type: "Request_Type",
  Paint_Job_Description: "Paint_Job_Description",
  Paint_Survey_Date_Time: "Paint_Survey_Date_Time",
  Paint_Required_For: "Paint_Required_For",
  Ceilings_Paint: "Ceilings_Paint",
  Paint_Type: "Paint_Type",
  Estimated_Job_Date: "Estimated_Job_Date",
  Last_Name: "Last_Name",
  Email: "Email",
  Mobile: "Mobile",
  Current_City: "Current_City",
  Web_Source: "Web_Source"
};

export const PaintForm = withRouter(
  class PaintForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Request_Type: "",
        Paint_Job_Description: "",
        Paint_Survey_Date_Time: "",
        Paint_Required_For: "",
        Ceilings_Paint: "",
        Paint_Type: "",
        Estimated_Job_Date: "",
        Last_Name: "",
        Email: "",
        Mobile: "",
        Current_City: "",
        Web_Source: ""
      };
    }

    genericHandler = (key, value) => {
      this.setState({ [key]: value });
    };

    submit = async () => {
      const { Request_Type } = this.state;
      const valid = Object.keys(FormKeys).every(key => {
        if (
          Request_Type == Conditions.C &&
          key == FormKeys.Paint_Job_Description
        )
          return true;
        if (
          Request_Type != Conditions.C &&
          key == FormKeys.Paint_Survey_Date_Time
        )
          return true;
        const reuslt = this.state[key] != "";
        if (!reuslt) {
          console.log(key);
        }
        return this.state[key] != "";
      });
      if (!valid) {
        message.error("Please Fill all fields");
        return;
      }

      try {
        const response = await axios.post(
          `${baseURL}/api/movonics/leads`,
          this.state
        );
        if (response.data.success) {
          console.log(response.data);

          message.success("Processing Complete");
          this.props.history.push("/thankyou");
          scrollTo("body");
        }
      } catch (error) {
        console.log(error);
        message.info("Some Error Occured");
      }
    };
    render() {
      return (
        <Fragment>
          <Divider type={2} title="Get Paint Quote"></Divider>
          <div className="container masterform shadow" id="paintForm">
            <Form className="form">
              <div className="form-field">
                <label>What do you need painted?</label>
                <Select
                  showSearch
                  onChange={value => {
                    this.genericHandler(FormKeys.Request_Type, value);
                  }}
                  placeholder="select"
                >
                  {Options.Request_Type.map((e, i) => (
                    <Select.Option value={e} key={i}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {this.state.Request_Type == Conditions.C && (
                <div className="form-field">
                  <label>Paint Survey - Date/Time</label>

                  <DatePicker
                    onChange={(m, v) => {
                      const date = m
                        .format("YYYY-MM-DD HH:MM:SS")
                        .replace(" ", "T");
                      this.genericHandler(
                        FormKeys.Paint_Survey_Date_Time,
                        date
                      );
                    }}
                    onOk={value => {
                      const date = value
                        .format("YYYY-MM-DD HH:MM:SS")
                        .replace(" ", "T");
                      this.genericHandler(
                        FormKeys.Paint_Survey_Date_Time,
                        date
                      );
                    }}
                    showTime
                    placeholder="Select Date/Time"
                    format={"YYYY/MM/DD"}
                  />
                </div>
              )}
              {this.state.Request_Type != Conditions.C && (
                <div className="form-field">
                  <label>Paint Size/Scope</label>
                  <Select
                    showSearch
                    placeholder="select"
                    onChange={value => {
                      this.genericHandler(
                        FormKeys.Paint_Job_Description,
                        value
                      );
                    }}
                  >
                    {Options.Paint_Job_Description.map((e, i) => (
                      <Select.Option value={e} key={i}>
                        {e}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}

              <div className="form-field">
                <label>At the time of Paint premises will be..</label>
                <Select
                  showSearch
                  placeholder="select"
                  onChange={value => {
                    this.genericHandler(FormKeys.Paint_Required_For, value);
                  }}
                >
                  {Options.Paint_Required_For.map((e, i) => (
                    <Select.Option value={e} key={i}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className="form-field">
                <label>Do we need to paint ceilings?</label>
                <Select
                  showSearch
                  placeholder="select"
                  onChange={value => {
                    this.genericHandler(FormKeys.Ceilings_Paint, value);
                  }}
                >
                  {Options.Booleans.map((e, i) => (
                    <Select.Option value={e} key={i}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className="form-field">
                <label>Paint Type</label>
                <Select
                  showSearch
                  placeholder="select"
                  onChange={value => {
                    this.genericHandler(FormKeys.Paint_Type, value);
                  }}
                >
                  {Options.Paint_Type.map((e, i) => (
                    <Select.Option value={e} key={i}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div className="form-field">
                <label>Estimated Job Date</label>
                <DatePicker
                  placeholder="Select Date"
                  onChange={(moment, value) => {
                    this.genericHandler(
                      FormKeys.Estimated_Job_Date,
                      value.split("/").join("-")
                    );
                  }}
                  format={"YYYY/MM/DD"}
                />
              </div>

              <div className="form-field">
                <label>Full Name</label>
                <Input
                  onChange={e => {
                    this.genericHandler(FormKeys.Last_Name, e.target.value);
                  }}
                />
              </div>
              <div className="form-field">
                <label>Current City</label>
                <Autocomplete
                  className="ant-input"
                  placeholder="enter your current area or address"
                  onPlaceSelected={place => {
                    this.genericHandler(FormKeys.Current_City, place.name);
                  }}
                  types={["establishment"]}
                  componentRestrictions={{ country: "ae" }}
                />
              </div>

              <div className="form-field">
                <label>Email</label>
                <Input
                  placeholder="example@gmail.com"
                  onChange={e => {
                    this.genericHandler(FormKeys.Email, e.target.value);
                  }}
                />
              </div>

              <div className="form-field">
                <label>Mobile/Phone</label>
                <Input
                  onChange={e => {
                    this.genericHandler(FormKeys.Mobile, e.target.value);
                  }}
                />
              </div>

              <div className="form-field">
                <label>How did you hear about us?</label>
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="select"
                  onChange={value => {
                    this.genericHandler(FormKeys.Web_Source, value);
                  }}
                >
                  {Options.Web_Source.map((e, i) => (
                    <Select.Option value={e} key={i}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div onClick={this.submit}>
                <CustomButton>Submit</CustomButton>
              </div>
            </Form>
          </div>
        </Fragment>
      );
    }
  }
);

export const Paint = () => {
  return (
    <Fragment>
      <SectionList sections={sections}></SectionList>
    </Fragment>
  );
};
