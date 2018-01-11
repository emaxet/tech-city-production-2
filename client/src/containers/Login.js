import React from 'react';
import { connect } from 'react-redux';
import { loginValidation } from '../actions/formValidations';
import { login } from '../actions/authenticationActions';
import MainNavbar from './MainNavbar';
import { addFlashMessage } from '../actions/flashMessages';
import { Container, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    const { errors, isValid } = this.props.loginValidation(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  handleSubmit(e){
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password
    }
    if(this.isValid()){
      this.props.login(payload).then(
        (res) => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You are logged in! Welcome!'
          });
          this.props.history.push('/')
        },
        (err) => {
          this.setState({serverError: err.response.data.message})
        }
      )
    }
  }



  render() {
    const {errors} = this.state;
    const {serverError} = this.state;
    return (
      <div>
        <MainNavbar />
        <h2 className="form-title text-center">Login</h2>
        <Container className="loginForm">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup row>
              <Label for="loginEmail" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="loginEmail" placeholder="Email" onChange={this.onChange} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="loginPassword" sm={2}>Password</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="loginPassword" placeholder="Password" onChange={this.onChange} />
                {errors.password && <span className="form-error">{errors.password}</span>}
                {serverError.length > 0 && <span className="form-error">{serverError}</span>}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col className="text-center">
                <Button type="submit">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
          <div className = "orRegister">
            <Link to='/register'>Register</Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(null, { login, loginValidation, addFlashMessage })(Login);
