import React, { useState } from 'react';
import logo_transparent from './../static/img/logo_transparent.png';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Link className="navbar-brand" to="/">
            <img src={logo_transparent} alt="logo" className="auto_img" />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/sensores/">Sensores</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/pronostico/">Pronóstico</Link>
            </NavItem>
          </Nav>
          <NavbarText>UPIITA-IPN</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;