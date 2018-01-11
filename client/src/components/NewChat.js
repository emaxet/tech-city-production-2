import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class NewChat extends Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);	
		this.state = {
			'cityName': this.props.cityName,
			'user_id': '',
			'name': '',
			'subject': ''
		}
	}

	submitForm() {
		axios.post(`/api/v1/${this.props.cityName}/chats`, {
			'userId': this.props.userId.sub || null,
			'name': this.state.name,
			'subject': this.state.subject
		}).then(() => {
			this.props.toggleNewChat()
			this.props.fetchApiChats()
		});
	}

	render() {
		return (
	      <Modal isOpen={this.props.newChatCollapse} toggle={this.props.toggleNewChat} className={this.props.className}>
	      <ModalHeader toggle={this.props.toggleNewChat}>New Chat Feed</ModalHeader>
	      <ModalBody>
	        <Form>
	          <FormGroup>
	            <Label for="chatName">Name</Label>
	            <Input type="text" maxLength={50} name="eventTitle" id="eventTitle" placeholder="What do you want to call this chat feed?"
	            onChange={(e) => {
	              this.setState({
	                'name': e.target.value
	              })
	            }}
	            />
	          </FormGroup>

	          <FormGroup>
	            <Label for="chatSubject">Subject</Label>
	            <Input type="text" maxLength={50} name="eventKey" id="eventKey" placeholder="What do you want this chat to be about?"
	            onChange={(e) => {
	              this.setState({
	                'subject': e.target.value
	              })
	            }}
	            />
	          </FormGroup>
	        </Form>
	      </ModalBody>
	      <ModalFooter>
	        <Button color="primary" onClick={this.submitForm}>Create New Chat</Button>{' '}
	        <Button color="secondary" onClick={this.props.toggleNewChat}>Cancel</Button>
	      </ModalFooter>
	    </Modal>
    	)
	}
}

function mapStateToProps(state) {
  return {
    userId: state.authentication.user
  };
}

export default connect(mapStateToProps)(NewChat);