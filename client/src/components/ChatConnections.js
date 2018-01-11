import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ChatConnections extends Component{
  
  render() {
    return (
      <div className="chatConnectionsContainer">
          <div className="connectionImage">
            <Link to={`/profile/${this.props.name}`}>
              <img src={ this.props.userImage || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' } alt="user avatar" />
            </Link>
          </div>
          <div className="connectionName">
            <Link to={`/profile/${this.props.name}`} style={{color: 'black'}}>
              {this.props.username}
            </Link>
          </div>
      </div>
    )
  }
}

export default ChatConnections;