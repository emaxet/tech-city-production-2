import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Collapse, Navbar, Nav, NavItem, NavbarToggler, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/authenticationActions'
import Logo from '../images/techcityLogo.png';

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.loggedInToggle = this.loggedInToggle.bind(this);
    this.mobileToggle = this.mobileToggle.bind(this);
    this.state = {
      dropdownOpen: false,
      mobileDropdownOpen: false
    };
  }

  loggedInToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  mobileToggle() {
    this.setState({
      mobileDropdownOpen: !this.state.isOpen
    });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render(){
    const { isAuthenticated } = this.props.authentication;
    const { username, image } = this.props.user;

    const loggedInLinks = (
      <Nav className="ml-auto" navbar>
        <img className="nav-pic" src={image} alt="profile"/>
        <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.loggedInToggle}>
          <DropdownToggle nav caret className="navbar-word">
            {username}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem><NavLink to={`/profile/${username}`} className="dropdown-word" activeClassName="dropdown-active">Profile</NavLink></DropdownItem>
            <DropdownItem divider />
            <DropdownItem><a href="/" className="dropdown-word" onMouseUp={this.logout.bind(this)}>Logout</a></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    )

    const loggedOutLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink exact to="/login" className="navbar-word" activeClassName="active">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to="/register" className="navbar-word" activeClassName="active">Register</NavLink>
        </NavItem>
      </Nav>
    )

    return (
      <div>
        <Navbar className="main-nav" expand="md">
          <Link to="/"><img src={Logo} alt="Logo" style={{'height': '40px'}}/></Link>
          <NavbarToggler onClick={this.mobileToggle} />
          <Collapse isOpen={this.state.mobileDropdownOpen} navbar>
              { isAuthenticated ? loggedInLinks : loggedOutLinks }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
    user: state.authentication.user
  };
}


export default connect(mapStateToProps, { logout })(MainNavbar);
