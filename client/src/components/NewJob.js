import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { jobValidation } from '../actions/formValidations';

class NewJob extends Component{
  constructor(props) {
    super(props);
    this.state = {
      'company' : '',
      'title': '',
      'url': '',
      'description': '',
      'cityName': this.props.cityName,
      'errors': {}
    };
    this.isValid = this.isValid.bind(this);
    this.toggleSubmit = this.toggleSubmit.bind(this);
  }

  isValid(){
    const { errors, isValid } = this.props.jobValidation(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  toggleSubmit(){
    if(this.isValid()){
      axios.post(`http://localhost:3000/api/v1/${this.state.cityName}/jobs`, {
        company: this.state.company,
        title: this.state.title,
        url: this.state.url,
        description: this.state.description,
        cityName: this.state.cityName
      })
      .then(() => {
        this.props.toggleAddJob();
        this.props.updateJobsFromAPI();
      });
    }
  }

  render() {
    const {errors} = this.state;
    return (
      <Modal isOpen={this.props.addJob} toggle={this.props.toggleAddJob} className={this.props.className}>
      <ModalHeader toggle={this.props.toggleAddJob}>New Job</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="jobCompany">Company</Label>
            <Input type="text" maxLength={50} name="jobCompany" id="jobCompany" placeholder="Company"
            onChange={(e) => {
              this.setState({
                'company': e.target.value
              })
            }}
            />
            {errors.company && <span className="form-error">{errors.company}</span>}
          </FormGroup>

          <FormGroup>
            <Label for="jobTitle">Title</Label>
            <Input type="text" maxLength={50} name="jobTitle" id="jobTitle" placeholder="Title"
            onChange={(e) => {
              this.setState({
                'title': e.target.value
              })
            }}
            />
            {errors.title && <span className="form-error">{errors.title}</span>}
          </FormGroup>

          <FormGroup>
            <Label for="jobUrl">Job URL</Label>
            <Input type="text" maxLength={100} name="jobUrl" id="jobUrl" placeholder="Job URL http://"
            onChange={(e) => {
              this.setState({
                'url': e.target.value
              })
            }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="jobDescription">Description</Label>
            <Input type="textarea" name="jobDescription" id="jobDescription" placeholder="Description"
            onChange={(e) => {
              this.setState({
                'description': e.target.value
              })
            }}
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.toggleSubmit}>Create New Job</Button>{' '}
        <Button color="secondary" onClick={this.props.toggleAddJob}>Cancel</Button>
      </ModalFooter>
    </Modal>
    )
  }
}

export default connect(null, { jobValidation })(NewJob);