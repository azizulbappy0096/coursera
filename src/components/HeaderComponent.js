import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Jumbotron,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";

export default class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this)
    }


    toggleNavbar() {
        this.setState({
            collapse: !this.state.collapse
        })
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
            <Collapse isOpen={this.state.collapse} navbar className="flex-grow-0">
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
      </>
    );
  }
}
