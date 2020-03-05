import React, { Fragment } from "react";
import { Input, DatePicker, Form, Select, message } from "antd";
import { Divider } from "../components/divider";
import Autocomplete from "react-google-autocomplete";

/* global google */
import axios from "axios";
import { CustomButton } from "./button";
import { baseURL } from "../config";

import "./masterform.css";
import "antd/dist/antd.css";

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
    "Office/Commercial",
    "Other"
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

const FormKeys = {
  Request_Type: "Request_Type",
  Commercial_Move_Type: "Commercial_Move_Type",
  Current_City: "Current_City",
  Estimated_Job_Date: "Estimated_Job_Date",

  Last_Name: "Last_Name",
  Email: "Email",
  Move_Size: "Move_Size",
  Mobile: "Mobile",
  Destination_Country: "Destination_Country",
  Destination_City: "Destination_City"
};

export class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Request_Type: "",
      Commercial_Move_Type: "",
      Current_City: "",
      Estimated_Job_Date: "",
      Last_Name: "",
      Email: "",
      Move_Size: "",
      Mobile: "",
      Destination_Country: "",
      Destination_City: ""
    };
  }

  genericHandler = (key, value) => {
    this.setState({ [key]: value });
  };

  submit = async () => {
    const { Request_Type } = this.state;

    const valid = Object.keys(FormKeys).every(key => {
      if (
        (Request_Type == Conditions.requestType.B ||
          Request_Type == Conditions.requestType.D) &&
        key == FormKeys.Commercial_Move_Type
      )
        return true;

      if (
        Request_Type != Conditions.moveType.D &&
        key == FormKeys.Destination_City
      )
        return true;
      if (
        Request_Type != Conditions.requestType.B &&
        key == FormKeys.Destination_Country
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
    console.log("sent api call");
    try {
      const response = await axios.post(
        `${baseURL}/api/movonics/leads`,
        this.state
      );
      if (response.data.success) {
        console.log(response.data);

        message.success("Processing Complete");
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
          <Divider title={this.props.title}></Divider>
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
                    name="Commercial_Move_Type"
                    onChange={value => {
                      this.genericHandler(FormKeys.Commercial_Move_Type, value);
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
                <label>Current City</label>
                <Autocomplete
                  className="ant-input"
                  placeholder="Current City"
                  onPlaceSelected={place => {
                    this.genericHandler(FormKeys.Current_City, place.name);
                  }}
                  types={["address"]}
                  componentRestrictions={{ country: "ae" }}
                />
              </div>
              {this.state.Request_Type == Conditions.requestType.B && (
                <div className="form-field">
                  <label>Destination Country</label>
                  <Autocomplete
                    className="ant-input"
                    placeholder="Destination Country"
                    onPlaceSelected={place => {
                      this.genericHandler(
                        FormKeys.Destination_Country,
                        place.name
                      );
                    }}
                    types={["(regions)"]}
                  />
                </div>
              )}
              {this.state.Commercial_Move_Type == Conditions.moveType.D && (
                <div className="form-field">
                  <label>Destination City</label>
                  <Autocomplete
                    className="ant-input"
                    placeholder="Destination City"
                    onPlaceSelected={place => {
                      this.genericHandler(
                        FormKeys.Destination_City,
                        place.name
                      );
                    }}
                    types={["(regions)"]}
                    componentRestrictions={{ country: "ae" }}
                  />
                </div>
              )}
              <div className="form-field">
                <label>Full Name</label>
                <Input
                  size="medium"
                  placeholder="Full Name"
                  onChange={e => {
                    this.genericHandler(FormKeys.Last_Name, e.target.value);
                  }}
                />
              </div>

              <div className="form-field">
                <label>Email</label>
                <Input
                  size="medium"
                  placeholder="Email"
                  onChange={e => {
                    this.genericHandler(FormKeys.Email, e.target.value);
                  }}
                />
              </div>
              <div className="form-field">
                <label>Mobile/Phone</label>
                <Input
                  size="medium"
                  placeholder="Mobile/Phone"
                  onChange={e => {
                    this.genericHandler(FormKeys.Mobile, e.target.value);
                  }}
                />
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
