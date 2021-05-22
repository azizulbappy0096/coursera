import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      contactTel: "",
      contactMe: false,
      contactType: "tel",
      message: "",
      touched: {
        firstname: false,
        lastname: false,
        email: false,
        contactTel: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validator = this.validator.bind(this);
  }

  handleInputChange(e) {
    let target = e.target;
    let name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let go = JSON.stringify(this.state);
    alert(go);
  }

  handleBlur(name) {
    this.setState({
      touched: {
        ...this.state.touched,
        [name]: true,
      },
    });
  }

  validator(firstname, lastname, contactTel, email) {
    let errors = {
      firstname: "",
      lastname: "",
      email: "",
      contactTel: "",
    };

    // firstname
    if (this.state.touched.firstname && firstname.length < 3) {
      errors.firstname = "Firstname should at least 3 character long";
    } else {
      errors.firstname = "";
    }
    // lastname
    if (this.state.touched.lastname && lastname.length < 3) {
      errors.lastname = "lastname should at least 3 character long";
    } else {
      errors.lastname = "";
    }
    // email
    const regexEmail = /^[A-Za-z0-9]+@\D+\..{2,3}$/;
    if (this.state.touched.email && !regexEmail.test(email)) {
      errors.email = "E-mail must be valid";
    } else {
      errors.email = "";
    }
    // tel number
    const regexTel = /^\d+$/;
    if (this.state.touched.contactTel && !regexTel.test(contactTel)) {
      errors.contactTel = "Tel number must be number";
    } else {
      errors.contactTel = "";
    }
    return errors;
  }

  render() {
    let errors = this.validator(
      this.state.firstname,
      this.state.lastname,
      this.state.contactTel,
      this.state.email
    );
    return (
      <div className="container">
        <div className="row mt-2">
          <Breadcrumb className="w-100">
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3> Contact Us </h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a role="button" className="btn btn-info">
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3> Send us Your Feedback </h3>
          </div>
          <Form onSubmit={this.handleSubmit} className="col-12 col-md-9">
            <FormGroup row>
              <Label for="firstname" md={2}>
                {" "}
                First Name{" "}
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="First name"
                  valid={errors.firstname === ""}
                  invalid={errors.firstname !== ""}
                  onBlur={() => this.handleBlur("firstname")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.firstname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lastname" md={2}>
                {" "}
                Last Name{" "}
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Last name"
                  valid={errors.lastname === ""}
                  invalid={errors.lastname !== ""}
                  onBlur={() => this.handleBlur("lastname")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.lastname}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="contactTel" md={2}>
                {" "}
                Contact Tel.{" "}
              </Label>
              <Col md={10}>
                <Input
                  type="tel"
                  id="contactTel"
                  name="contactTel"
                  placeholder="Tel. number"
                  valid={errors.contactTel === ""}
                  invalid={errors.contactTel !== ""}
                  onBlur={() => this.handleBlur("contactTel")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.contactTel}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" md={2}>
                {" "}
                E-mail{" "}
              </Label>
              <Col md={10}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail address"
                  valid={errors.email === ""}
                  invalid={errors.email !== ""}
                  onBlur={() => this.handleBlur("email")}
                  onChange={this.handleInputChange}
                />
                <FormFeedback>{errors.email}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="contactMe"
                      checked={this.state.contactMe}
                      onChange={this.handleInputChange}
                    />
                    <strong> May we contact you? </strong>
                  </Label>
                </FormGroup>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <FormGroup>
                  <Input
                    type="select"
                    id="contactType"
                    name="contactType"
                    value={this.state.contactType}
                    onChange={this.handleInputChange}
                  >
                    <option value="tel"> Tel. </option>
                    <option value="email"> E-mail </option>
                  </Input>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="message" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  rows="12"
                  id="message"
                  name="message"
                  placeholder=""
                  onChange={this.handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit">Send</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default Contact;
