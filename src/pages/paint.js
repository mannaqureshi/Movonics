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
import { withRouter } from "react-router-dom";
import { SectionList } from "../components/sections";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/assets/index.css";

const PlacesOptions = {
  componentRestrictions: {
    country: "ae"
  },
  types: ["establishment"]
};
export const Options = {
  What_do_you_need_painted: [
    "House/Villa",
    "Apartment",
    "Commercial/Warehouse",
    "Single/Few Walls"
  ],
  House_Apartment_is: ["Furnished", "Unfurnished"],
  Paint_Required_For: [
    "Studio Apartment",
    "1 Bedroom Apartment",
    "2 Bedroom Apartment/House",
    "3 Bedroom Apartment/House",
    "4 Bedroom Apartment/House",
    "5 Bedroom Apartment/House",
    "Single/Few Walls"
  ],
  Booleans: ["yes", "no"],
  Paint_Type: [
    "Move-in Paint",
    "Move-out Paint",
    "Door(s) Painting",
    "Outdoor Paint"
  ],
  Lead_Source: [
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
  What_do_you_need_painted: "What_do_you_need_painted",
  Paint_Required_For: "Paint_Required_For",
  Paint_Survey_Date_Time: "Paint_Survey_Date_Time",
  House_Apartment_is: "House_Apartment_is",
  Ceilings_Paint: "Ceilings_Paint",
  Paint_Type: "Paint_Type",
  Estimated_Job_Date: "Estimated_Job_Date",
  Last_Name: "Last_Name",
  Email: "Email",
  Mobile: "Mobile",
  Current_City: "Current_City",
  Lead_Source: "Lead_Source"
};

export const PaintForm = withRouter(
  class PaintForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Request_Type: "Paint Services",
        What_do_you_need_painted: "",
        Paint_Required_For: "",
        Paint_Survey_Date_Time: "",
        House_Apartment_is: "",
        Ceilings_Paint: "",
        Paint_Type: "",
        Estimated_Job_Date: "",
        Last_Name: "",
        Email: "",
        Mobile: "",
        Current_City: "",
        Lead_Source: "",
        Web_Source: "Movonics"
      };
    }
    clearState = () => {
      this.setState({
        Request_Type: "Paint Services",
        What_do_you_need_painted: "",
        Paint_Required_For: "",
        Paint_Survey_Date_Time: "",
        House_Apartment_is: "",
        Ceilings_Paint: "",
        Paint_Type: "",
        Estimated_Job_Date: "",
        Last_Name: "",
        Email: "",
        Mobile: "",
        Current_City: "",
        Lead_Source: "",
        Web_Source: "Movonics"
      });
    };
    genericHandler = (key, value) => {
      this.setState({ [key]: value });
    };
    validateEmail = email => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    isNumber = value => {
      var re = /^(?:\+971|00971|0)(?:2|3|4|6|7|9|50|51|52|55|56)[0-9]{7}$/;
      return re.test(value);
    };

    submit = async () => {
      console.log(this.state);
      const { What_do_you_need_painted } = this.state;
      const valid = Object.keys(FormKeys).every(key => {
        if (
          What_do_you_need_painted == Conditions.C &&
          key == FormKeys.Paint_Required_For
        )
          return true;
        if (
          What_do_you_need_painted != Conditions.C &&
          key == FormKeys.Paint_Survey_Date_Time
        )
          return true;
        if (key == FormKeys.Email) return this.validateEmail(this.state.Email);
        if (key == FormKeys.Mobile) return this.isNumber(this.state.Mobile);

        const reuslt = this.state[key] != "";
        if (!reuslt) {
          console.log(key);
        }
        return this.state[key] != "";
      });
      if (!valid) {
        message.error(
          "Please Fill all fields or make sure you have entered the right details"
        );
        return;
      }
      console.log("api send");

      try {
        const response = await axios.post(
          `${baseURL}/api/movonics/leads`,
          this.state
        );
        if (response.data.success) {
          console.log(response.data);

          message.success("Processing Complete");
          this.clearState();
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
          <Divider type={2} title="Get Free Quote"></Divider>
          <div className="container masterform shadow" id="paintForm">
            <Form className="form">
              <div className="form-field">
                <label>What do you need painted?</label>
                <Select
                  showSearch
                  onChange={value => {
                    this.genericHandler(
                      FormKeys.What_do_you_need_painted,
                      value
                    );
                  }}
                  placeholder="select"
                >
                  {Options.What_do_you_need_painted.map((e, i) => (
                    <Select.Option value={e} key={i}>
                      {e}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              {this.state.What_do_you_need_painted == Conditions.C && (
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
              {this.state.What_do_you_need_painted != Conditions.C && (
                <div className="form-field">
                  <label>Paint Size/Scope</label>
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
              )}

              <div className="form-field">
                <label>At the time of Paint premises will be..</label>
                <Select
                  showSearch
                  placeholder="select"
                  onChange={value => {
                    this.genericHandler(FormKeys.House_Apartment_is, value);
                  }}
                >
                  {Options.House_Apartment_is.map((e, i) => (
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
                <label>Current Address</label>
                <GooglePlacesAutocomplete
                  autocompletionRequest={PlacesOptions}
                  inputClassName="ant-input"
                  placeholder="enter your current area or address"
                  onSelect={place => {
                    console.log(place);
                    this.genericHandler(
                      FormKeys.Current_City,
                      place.description
                    );
                  }}
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
                    this.genericHandler(FormKeys.Lead_Source, value);
                  }}
                >
                  {Options.Lead_Source.map((e, i) => (
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
      <SectionList place="UAE" sections={sections}></SectionList>
    </Fragment>
  );
};
