import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChatMessages extends Component{
  
  render() {
    console.log(this.props.image);
    return (
      <div className="chatMessageContainer">
          <div className="chatUserImage">
            <Link to={`/profile/${this.props.name}`}>
              <img alt='chatImg' src={ this.props.image || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' } />
            </Link>
          </div>
          <div className="messageContent">
            <div className="username" >
              <Link to={`/profile/${this.props.name}`} style={{color: "black"}}>{`${this.props.name}`}</Link>
            </div>
            <div className="content">
              {this.props.message}
            </div>
          </div>
      </div>
    )
  }
}

export default ChatMessages;