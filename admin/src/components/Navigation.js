import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/creditunion-logo.jpg';

class Navigation extends Component {

  constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: true
      };
    }
  
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  
  render() {
    return (
      <Navbar expand="xl" color="faded" light>
        <NavbarBrand className="mr-auto" href="/" style={{paddingTop: "0px", paddingBottom: "0px", fontWeight: "bold"}}>
          <Link to='/' style={{padding: "0px", fontSize:"30px", textTransform: "uppercase", color: "#006A8C"}}>
            <img className="img-responsive" src={logo} style={{height: "auto", width: "20%"}} alt="logo"/>
            {' '}Credit Union
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={!this.state.isOpen} navbar id="navbarResponsive">
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink to="/" activeClassName="selected"
                       activeStyle={{
                         fontWeight: 'bold',
                         color: 'blue'
                       }}>Profiles</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;