import React, { Fragment } from "react";
import { Input, DatePicker, Form, Select, message } from "antd";
import { Divider } from "../components/divider";
import Autocomplete from "react-google-autocomplete";
import scrollTo from "scroll-to-element";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// If you want to use the provided css
import "react-google-places-autocomplete/dist/assets/index.css";

/* global google */
import axios from "axios";
import { CustomButton } from "./button";
import { baseURL } from "../config";

import "./masterform.css";
import "antd/dist/antd.css";
import { withRouter } from "react-router-dom";

export const Options = {
  "Request Type": [
    "Local/Domestic Move- Apartment/Villa",
    "International Move",
    "Commercial Move Services",
    "Export Packing"
  ],
  "Move Type": [
    "Local Move - Same City",
    "Local Move - Same Building",
    "Local Move - Same Area",
    "Domestic Move - Another City"
  ],
  "Scope Of Work": [
    "Studio Apartment Move",
    "1 Bedroom Apartment Move",
    "2 Bedroom Apartment/House Move",
    "3 Bedroom Apartment/House Move",
    "4 Bedroom Apartment/House Move",
    "5 Bedroom Apartment/House Move",
    "6 Bedroom Apartment/House Move",
    "Single or Few Items",
    "Other"
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
  requestType: {
    A: "Local/Domestic Move- Apartment/Villa",
    B: "International Move",
    C: "Commercial Move Services",
    D: "Export Packing"
  },
  moveType: {
    A: "Local Move - Same City",
    B: "Local Move - Same Building",
    C: "Local Move - Same Area",
    D: "Domestic Move - Another City"
  }
};

const CountryOptions = {
  componentRestrictions: {
    country: "ae"
  },
  types: ["(regions)"]
};
const PlacesOptions = {
  componentRestrictions: {
    country: "ae"
  },
  types: ["establishment"]
};

const FormKeys = {
  Request_Type: "Request_Type",
  Move_Type: "Move_Type",
  Complete_Address: "Complete_Address",
  Estimated_Job_Date: "Estimated_Job_Date",
  Last_Name: "Last_Name",
  Email: "Email",
  Move_Size: "Move_Size",
  Mobile: "Mobile",
  Destination_Country: "Destination_Country",
  Destination_Address: "Destination_Address",
  Lead_Source: "Lead_Source"
};

export const MasterForm = withRouter(
  class MasterForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Request_Type: "",
        Move_Type: "",
        Complete_Address: "",
        Destination_Country: "",
        Destination_Address: "",
        Estimated_Job_Date: "",
        Last_Name: "",
        Email: "",
        Move_Size: "",
        Mobile: "",
        Lead_Source: "",
        Web_Source: "Movonics"
      };
    }

    clearState = () => {
      this.setState({
        Request_Type: "",
        Move_Type: "",
        Complete_Address: "",
        Estimated_Job_Date: "",
        Last_Name: "",
        Email: "",
        Move_Size: "",
        Mobile: "",
        Destination_Country: "",
        Destination_Address: "",
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
      const { Request_Type, Move_Type } = this.state;
      const valid = Object.keys(FormKeys).every(key => {
        if (
          (Request_Type == Conditions.requestType.B ||
            Request_Type == Conditions.requestType.D) &&
          key == FormKeys.Move_Type
        )
          return true;

        if (
          Request_Type != Conditions.requestType.B &&
          key == FormKeys.Destination_Country
        )
          return true;
        if (
          (Request_Type == Conditions.requestType.B &&
            key == FormKeys.Destination_Address) ||
          (Request_Type == Conditions.requestType.D &&
            key == FormKeys.Destination_Address)
        )
          return true;
        if (
          Move_Type == Conditions.moveType.B &&
          key == FormKeys.Destination_Address
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
      console.log(this.state);
      console.log("sent api call");
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
          <Fragment>
            <Divider type={1} title={this.props.title}></Divider>
            <div className="container masterform shadow" id="masterform">
              <Form className="form">
                <div className="form-field">
                  <label>Request Type</label>
                  <Select
                    showSearch
                    onChange={value => {
                      this.genericHandler(FormKeys.Request_Type, value);
                    }}
                    placeholder="Select"
                  >
                    {Options["Request Type"].map((e, i) => (
                      <Select.Option value={e} key={i}>
                        {e}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
                {(this.state.Request_Type == Conditions.requestType.A ||
                  this.state.Request_Type == Conditions.requestType.C) && (
                  <div className="form-field">
                    <label>Move Type</label>
                    <Select
                      showSearch
                      placeholder="Move Type"
                      optionFilterProp="children"
                      onChange={value => {
                        this.genericHandler(FormKeys.Move_Type, value);
                      }}
                    >
                      {Options["Move Type"].map((e, i) => (
                        <Select.Option value={e} key={i}>
                          {e}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                )}
                <div className="form-field">
                  <label>Size/Scope of Work</label>
                  <Select
                    showSearch
                    placeholder="Size/Scope of Work"
                    onChange={value => {
                      this.genericHandler(FormKeys.Move_Size, value);
                    }}
                  >
                    {Options["Scope Of Work"].map((e, i) => (
                      <Select.Option value={e} key={i}>
                        {e}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                <div className="form-field">
                  <label>Estimated Job Date</label>
                  <DatePicker
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
                  <label>Moving From</label>
                  <GooglePlacesAutocomplete
                    autocompletionRequest={PlacesOptions}
                    inputClassName="ant-input"
                    placeholder="enter your current area or address"
                    onSelect={place => {
                      console.log(place);
                      this.genericHandler(
                        FormKeys.Complete_Address,
                        place.description
                      );
                    }}
                  />
                </div>
                {this.state.Request_Type == Conditions.requestType.B ||
                this.state.Request_Type == Conditions.requestType.D ||
                this.state.Move_Type == Conditions.moveType.B ? null : (
                  <div className="form-field">
                    <label>Moving to</label>
                    <GooglePlacesAutocomplete
                      autocompletionRequest={PlacesOptions}
                      inputClassName="ant-input"
                      placeholder="enter destination area or address"
                      onSelect={place => {
                        console.log(place);
                        this.genericHandler(
                          FormKeys.Destination_Address,
                          place.description
                        );
                      }}
                    />
                  </div>
                )}
                {this.state.Request_Type == Conditions.requestType.B && (
                  <div className="form-field">
                    <label>Moving to</label>
                    <GooglePlacesAutocomplete
                      autocompletionRequest={CountryOptions}
                      inputClassName="ant-input"
                      placeholder="enter destnation country"
                      onSelect={place => {
                        console.log(place);
                        this.genericHandler(
                          FormKeys.Destination_Country,
                          place.description
                        );
                      }}
                    />
                  </div>
                )}

                <div className="form-field">
                  <label>Full Name</label>
                  <Input
                    placeholder="Full Name"
                    onChange={e => {
                      this.genericHandler(FormKeys.Last_Name, e.target.value);
                    }}
                  />
                </div>

                <div className="form-field">
                  <label>Email</label>
                  <Input
                    placeholder="Email"
                    onChange={e => {
                      this.genericHandler(FormKeys.Email, e.target.value);
                    }}
                  />
                </div>
                <div className="form-field">
                  <label>Mobile/Phone</label>
                  <Input
                    placeholder="Mobile/Phone"
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

                <div>
                  <CustomButton onClick={this.submit}>Submit</CustomButton>
                </div>
              </Form>
            </div>
          </Fragment>
          ;
        </Fragment>
      );
    }
  }
);
