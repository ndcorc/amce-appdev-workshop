import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import logo from '../images/penfed-logo.jpg';

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
        <NavbarBrand className="mr-auto" href="/">
          <Link to='/'>
            <img className="img-responsive" src={logo} alt="logo"/>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={!this.state.isOpen} navbar id="navbarResponsive">
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink 
                to="/" 
                activeClassName="selected"
                activeStyle={{
                  fontWeight: 'bold',
                  color: 'blue'
                }}
              >Profiles</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;