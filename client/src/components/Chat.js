import React, { Component } from 'react'
import { Input, InputGroup, InputGroupButton, Button } from 'reactstrap';
import ChatMessages from '../components/ChatMessages';
import ChatConnections from '../components/ChatConnections';
import io from 'socket.io-client';
import axios from 'axios';
import { connect } from 'react-redux';
import OverflowScrolling from 'react-overflow-scrolling';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: this.props.location.pathname.split('/')[4],
      socket: io('https://techcity.herokuapp.com:8080', {query: `chatId=${this.props.location.pathname.split('/')[4]}&username=${this.props.username}&userImage=${this.props.userImage}`}),
      connections: [],
      messages: [],
      newMessage: '',
      initialLoad: false,
      submittedMessage: false
    };
    this.newMessage = this.newMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.inputBarEnter = this.inputBarEnter.bind(this);
  }

  newMessage(e) {
    this.setState({
      newMessage: e.target.value
    })
  }

  submitMessage(e) {
    e.target.value = '';
    this.setState({
      'submittedMessage': true
    })
    // const socket = io(this.state.endpoint);
    const data = {message: this.state.newMessage, chatId: this.state.chatId, username: this.props.username, userImage: this.props.userImage};
    this.state.socket.emit('chat message', data);
  }

  inputBarEnter(e) {
    if (e.key === 'Enter') {
      this.submitMessage(e);
    }
  }

  fetchApiMessages() {
    axios.get(`/api/v1/${this.state.cityName}/chats/${this.state.chatId}`)
    .then((res) => {
      this.setState ({
        'messages': res.data,
        'initialLoad': true
      });
      this.messagesEnd.scrollIntoView({ behavior: "instant" });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    if (!this.state.initialLoad) {
      this.fetchApiMessages();
    }
    this.state.socket.on(`chat message`, (data) => {
      this.setState({
        messages: this.state.messages.concat({ name: data.username, message: data.message, image: data.userImage})
      });
      if (this.state.submittedMessage) {
        this.scrollToBottom();
      }
      this.setState({
        'submittedMessage': false
      })
    });
    this.state.socket.on('connection event', (data) => {
      console.log(data);
      this.setState({
        connections: data
      })
    });
  }

  componentWillUnmount(){
    this.state.socket.disconnect();
  }

  render() {
    console.log(this.state.socket);
    const chatMessages = this.state.messages.map((e, index) => {
      return <ChatMessages {...e} key={index}/>
    })

    const connections = this.state.connections.map((e, index) => {
      return <ChatConnections {...e} key={index}/>
    })

    return (
      <div className="cityChatContainer">
        <div className="sidebarWrapper">
          <OverflowScrolling className="chatSidebar">
            <h4>Online</h4>
            { connections }
          </OverflowScrolling>
        </div>
        <div className="cityChatWrapper">
          <div className="cityChat">
            <div className="chatMessage">
              {chatMessages}
            </div>
            <div ref={(el) => { this.messagesEnd = el; }}></div>
          </div>
        </div>
        <div className="inputBar">
          <InputGroup className="chatInput">
            <Input type="text" id="chatBar" name="chatBar" placeholder="Leave Your Message" onChange={this.newMessage} onKeyPress={this.inputBarEnter}></Input>
            <InputGroupButton type="submit"><Button onClick={this.submitMessage}>Submit</Button></InputGroupButton>
          </InputGroup>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.authentication.user.username,
    userImage: state.authentication.user.image
  };
}

export default connect(mapStateToProps)(Chat);