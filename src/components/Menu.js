import React, { useState } from 'react';
import logo_transparent from './../static/img/logo_transparent.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
            <img src={logo_transparent} alt="logo" className="auto_img" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/sensores/">Sensores</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/pronostico/">Pronóstico</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>UPIITA-IPN</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;