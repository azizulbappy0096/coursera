import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  FormGroup,
  Label,
} from "reactstrap";

// redux-form
import { Control, LocalForm, Errors } from "react-redux-form";

// --- validators
const required = val => val && val.length
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => !val || (val.length >= len);
const isNumber = val => !val || !isNaN(Number(val))
const validEmail = val => !val || /^[a-zA-Z0-9._%+-]+@[a-z]+\.[a-z]{2,4}$/.test(val)

class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    let go = JSON.stringify(values);
    alert(go);
  }

  render() {
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
              <a role="button" className="btn btn-info" href="">
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
          <LocalForm
            onSubmit={(values) => this.handleSubmit(values)}
            className="col-12 col-md-9"
          >
            <FormGroup row>
              <Label for="firstname" md={2}>
                {" "}
                First Name{" "}
              </Label>
              <Col md={10}>
                <Control.text
                  id="firstname"
                  model=".firstname"
                  placeholder="First name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(14),
                  }}
                />
                <Errors
                className="text-danger"
                model=".firstname"
                show="touched"
                messages={{
                  required: 'Required',
                  minLength: 'Must be greater than 3 characters',
                  maxLength: 'Must be 14 characters or less'
                }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lastname" md={2}>
                {" "}
                Last Name{" "}
              </Label>
              <Col md={10}>
                <Control.text
                  id="lastname"
                  model=".lastname"
                  placeholder="Last name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(14),
                  }}
                />
                <Errors
                className="text-danger"
                model=".lastname"
                show="touched"
                messages={{
                  required: 'Required',
                  minLength: 'Must be greater than 3 characters',
                  maxLength: 'Must be 14 characters or less'
                }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="contactTel" md={2}>
                {" "}
                Contact Tel.{" "}
              </Label>
              <Col md={10}>
                <Control
                  type="tel"
                  id="contactTel"
                  model=".contactTel"
                  placeholder="Tel. number"
                  className="form-control"
                  validators={{
                    required,
                    isNumber
                  }}
                />
                <Errors
                className="text-danger"
                model=".contactTel"
                show="touched"
                messages={{
                  required: 'Required',
                  isNumber: "Must be Tel. number"
                }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" md={2}>
                {" "}
                E-mail{" "}
              </Label>
              <Col md={10}>
                <Control.text
                  
                  id="email"
                  model=".email"
                  placeholder="E-mail address"
                  className="form-control"
                  validators={{
                    required,
                    validEmail
                  }}
                />
                <Errors
                className="text-danger"
                model=".email"
                show="touched"
                messages={{
                  required: 'Required',
                  validEmail: "Must be valid email address"
                }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 6, offset: 2 }}>
                <FormGroup check>
                  <Label check>
                    <Control.checkbox
                      model=".contactMe"
                      className="form-check-input"
                    />
                    <strong> May we contact you? </strong>
                  </Label>
                </FormGroup>
              </Col>
              <Col md={{ size: 3, offset: 1 }}>
                <FormGroup>
                  <Control.select
                    defaultValue="tel"
                    model=".contactType"
                    className="form-control"
                  >
                    <option value="tel"> Tel. </option>
                    <option value="email"> E-mail </option>
                  </Control.select>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="message" md={2}>
                Your Feedback
              </Label>
              <Col md={10}>
                <Control.textarea
                  rows="12"
                  id="message"
                  model=".message"
                  placeholder=""
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(10),
                   
                  }}
                />
                <Errors
                className="text-danger"
                model=".message"
                show="touched"
                messages={{
                  required: 'Required',
                  minLength: "Must be at least 10 character long"
                }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button type="submit">Send Feedback</Button>
              </Col>
            </FormGroup>
          </LocalForm>
        </div>
      </div>
    );
  }
}

export default Contact;
