import React from 'react';
import { connect } from 'react-redux';
import { Container, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { registerValidation } from '../actions/formValidations';
import { userRegistration } from '../actions/authenticationActions';
import MainNavbar from './MainNavbar';
import { addFlashMessage } from '../actions/flashMessages';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      city: 'Vancouver',
      pic: 'http://top3friends.com/fb_soulmate/images/user.png',
      bio: '',
      errors: {},
      serverError: ''
    };
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  isValid(){
    const { errors, isValid } = this.props.registerValidation(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }


  handleSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const payload = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      city: this.state.city,
      pic: this.state.pic,
      bio: this.state.bio,
      role_id: 1,
    }
    if(this.isValid()){
      this.props.userRegistration(payload).then(
        (res) => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You are signed up! Welcome!'
          })
          this.props.history.push('/');
        },
        (err) => {
          this.setState({serverError: err.response.data.errors})
        }
      )
    }
  }


  render() {
    const {errors, serverError, pic} = this.state;

    return (
      <div>
        <MainNavbar />
        <h2 className="form-title text-center">Register</h2>
        <Container className="registerForm">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="registerUsername" sm={2}>Username*</Label>
              <Col sm={10}>
                <Input type="text" name="username" id="registerUsername" placeholder="Username" onChange={this.onChange} />
                {errors.username && <span className="form-error">{errors.username}</span>}
                {
                  serverError?
                  serverError.username && <span className="form-error">{serverError.username}</span>
                  : null
                }
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="registerName" sm={2}>First Name</Label>
              <Col sm={4}>
                <Input type="text" name="first_name" id="registerFirstName" placeholder="First Name" onChange={this.onChange} />
              </Col>
              <Label for="registerName" sm={2}>Last Name</Label>
              <Col sm={4}>
                <Input type="text" name="last_name" id="registerLastName" placeholder="Last Name" onChange={this.onChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="registerEmail" sm={2}>Email*</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="registerEmail" placeholder="Email" onChange={this.onChange} />
                {errors.email && <span className="form-error">{errors.email}</span>}
                {
                  serverError?
                  serverError.email && <span className="form-error">{serverError.email}</span>
                  :null
                }
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="registerPassword" sm={2}>Password*</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="registerPassword" placeholder="Password" onChange={this.onChange} />
                {errors.password && <span className="form-error">{errors.password}</span>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="registerConfirmPassword" sm={2}>Confirm Password*</Label>
              <Col sm={10}>
                <Input type="password" name="confirmPassword" id="registerConfirmPassword" placeholder="Password" onChange={this.onChange} />
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="registerCity" sm={2}>City</Label>
              <Col sm={10}>
                <Input type="select" name="city" id="registerCity" onChange={this.onChange}>
                  <option>Vancouver</option>
                  <option>Mountain View</option>
                  <option>Toronto</option>
                  <option>Seattle</option>
                  <option>San Francisco</option>
                  <option>New York</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <img src={pic} alt="profile" style={{'height': '80px', 'marginLeft': '24px'}}/>
            </FormGroup>
            <FormGroup row>
              <Label for="registerPic" sm={2}>Profile Image</Label>
              <Col sm={10}>
                <Input type="text" name="pic" id="registerPic" placeholder="Image URL" onChange={this.onChange} />
                <FormText color="muted">
                  Example: https://i.imgur.com/ABC123.png
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Bio</Label>
              <Input type="textarea" name="bio" id="exampleText" placeholder="Tell the community about yourself." onChange={this.onChange} />
            </FormGroup>
            <FormGroup row>
              <Col className="text-center">
                <Button type="submit">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default connect(null, { registerValidation, userRegistration, addFlashMessage })(Register);