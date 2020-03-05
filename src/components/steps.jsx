import React, { Fragment } from "react";
import axios from "axios";
import { CustomButton } from "../components/button";
import { formFields } from "./masterform";
import { Select, Input, DatePicker, Radio } from "antd";
const { Option } = Select;

class PersonalInformationForm extends React.Component {
  render() {
    return (
      <Fragment>
        <div>
          <Input
            placeholder="Enter Name"
            name={formFields.name}
            onChange={e => {
              this.props.handleChange(e.target.name, e.target.value);
            }}
          />
        </div>
        <div>
          <Input
            placeholder="Enter email"
            type="email"
            name={formFields.email}
            onChange={e => {
              this.props.handleChange(e.target.name, e.target.value);
            }}
          />
        </div>
        <div>
          <Input
            placeholder="Enter Phone number"
            name={formFields.phoneNumber}
            onChange={e => {
              this.props.handleChange(e.target.name, e.target.value);
            }}
          />
        </div>
      </Fragment>
    );
  }
}

class BookingForm extends React.Component {
  render() {
    const fromOptions = Array.from(
      new Set(this.props.datasource.map(row => row.from))
    ).map((data, idx) => (
      <Option key={data} value={data}>
        {data}
      </Option>
    ));

    const toOptions = Array.from(
      new Set(
        this.props.datasource
          .filter(row => row.from == this.props.formFields.movingFrom)
          .map(row => row.to)
      )
    ).map(data => (
      <Option key={data} value={data}>
        {data}
      </Option>
    ));

    const { movingFrom, movingTo } = this.props.formFields;

    return (
      <Fragment>
        <div>
          <Select
            showSearch
            style={{ width: `50%` }}
            placeholder="Moving From"
            onChange={e => {
              this.props.handleChange(formFields.movingFrom, e);
            }}
          >
            {fromOptions}
          </Select>
        </div>
        <div>
          <Select
            disabled={this.props.formFields.movingFrom ? false : true}
            name={formFields.movingTo}
            showSearch
            style={{ width: `50%` }}
            placeholder="Moving To"
            onChange={e => {
              this.props.handleChange(formFields.movingTo, e);
            }}
          >
            {toOptions}
          </Select>
        </div>
        <div>
          <DatePicker
            name={formFields.selectDate}
            onChange={(date, dateString) => {
              this.props.handleChange(formFields.selectDate, dateString);
              this.props.calulateCards(movingFrom, movingTo);
            }}
          />
        </div>
      </Fragment>
    );
  }
}

class QuatationForm extends React.Component {
  render() {
    const { cards } = this.props;

    return <Radio.Group buttonStyle="solid" onChange={e => {}}></Radio.Group>;
  }
}

class PaymentForm extends React.Component {
  state = {
    verified: false,
    token: null
  };
  render() {
    return (
      <Fragment>
        {!this.state.verified ? (
          <CustomButton
            onClick={async () => {
              const response = await axios.post(
                `http://localhost:5000/api/payments/initiate`
              );
              this.setState({
                token: response.data.auth_token,
                verified: true
              });
            }}
          >
            Initiate Payment
          </CustomButton>
        ) : (
          <form
            action="https://easypay.easypaisa.com.pk/easypay/Confirm.jsf "
            method="POST"
            target="_blank"
          >
            <input name="auth_token" value={this.state.token} hidden="true" />
            <input
              className="custom-button text-secondary"
              name="postBackURL"
              value="http://localhost:5000/api/payments/secondHandler"
              hidden="true"
            />
            <input value="confirm" type="submit" name="pay" />
          </form>
        )}
      </Fragment>
    );
  }
}

export const steps = [
  {
    title: "Personal Infromation",
    content: <PersonalInformationForm></PersonalInformationForm>
  },
  {
    title: "Booking",
    content: <BookingForm></BookingForm>
  },
  {
    title: "Quotations",
    content: <QuatationForm></QuatationForm>
  },
  {
    title: "Payment",
    content: <PaymentForm></PaymentForm>
  }
];
