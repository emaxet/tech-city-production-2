import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

class CityNav extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className='cityNav'>
        <Navbar light expand="sm">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink exact to={`/city/${this.props.city_name}/events`} activeClassName="active">Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to={`/city/${this.props.city_name}/jobs`} activeClassName="active">Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink exact to={`/city/${this.props.city_name}/chat`} activeClassName="active">Chat</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default CityNav;