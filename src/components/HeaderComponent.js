import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Form,
  FormGroup,
  Input,
  Jumbotron,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      modal: false,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleLogin(e) {
    e.preventDefault()
    this.toggleModal();
    let go = `username: ${this.username.value}, password: ${this.password.value}, remember: ${this.remember.checked}`
    alert(go)
  }

  render() {
    return (
      <>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarBrand href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="40"
                alt="Logo image"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse
              isOpen={this.state.collapse}
              navbar
              className="flex-grow-0"
            >
              <Nav navbar>
                <NavItem>
                  <NavLink to="/home" className="nav-link">
                    <span className="fa fa-home"></span>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/aboutus" className="nav-link">
                    <span className="fa fa-info"></span>
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/menu" className="nav-link">
                    <span className="fa fa-list"></span>
                    Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/contactus" className="nav-link">
                    <span className="fa fa-address-card"></span>
                    Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Button outline className="ml-4" onClick={this.toggleModal}>
                    <span className="fa fa-sign-in"></span>
                    Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label for="username"> Username </Label>
                <Input type="text" id="username" innerRef={(e) => this.username = e} />
              </FormGroup>
              <FormGroup>
                <Label for="password"> Password </Label>
                <Input type="password" id="password" innerRef={(e) => this.password = e} />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember" innerRef={(e) => this.remember = e} />
                  Remember me?
                </Label>
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  value="submit"
                  color="primary"
                  className="mt-2"
                >
                  {" "}
                  Log in{" "}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
