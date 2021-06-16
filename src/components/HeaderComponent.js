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
    this.handleLogout = this.handleLogout.bind(this);
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
    e.preventDefault();
    this.toggleModal();

    this.props.login({
      username: this.username.value,
      password: this.password.value,
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout()
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
                alt="Logo"
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
                  <NavLink className="nav-link" to="/favorites">
                    <span className="fa fa-heart"></span> My Favorites
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/contactus" className="nav-link">
                    <span className="fa fa-address-card"></span>
                    Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  {!this.props.auth.isAuthenticated ? (
                    <Button outline onClick={this.toggleModal}>
                      <span className="fa fa-sign-in"></span> Login
                      {this.props.auth.isFetching ? (
                        <span className="fa fa-spinner fa-pulse fa-fw"></span>
                      ) : null}
                    </Button>
                  ) : (
                    <div>
                      <div className="navbar-text mr-3">
                        {this.props.auth.user.username}
                      </div>
                      <Button outline onClick={this.handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> Logout
                        {this.props.auth.isFetching ? (
                          <span className="fa fa-spinner fa-pulse fa-fw"></span>
                        ) : null}
                      </Button>
                    </div>
                  )}
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
                <Input
                  type="text"
                  id="username"
                  innerRef={(e) => (this.username = e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password"> Password </Label>
                <Input
                  type="password"
                  id="password"
                  innerRef={(e) => (this.password = e)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(e) => (this.remember = e)}
                  />
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
