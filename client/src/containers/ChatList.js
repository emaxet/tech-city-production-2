import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewChat from '../components/NewChat';
import { connect } from 'react-redux';
import { Collapse } from 'reactstrap';

class ChatList extends Component {
	constructor(props) {
		super(props);

		const cityName = this.props.location.pathname.split('/')[2];
		this.toggleNewChat = this.toggleNewChat.bind(this);
		this.fetchApiChats = this.fetchApiChats.bind(this);
		this.toggleSearchBar = this.toggleSearchBar.bind(this);
		this.listMyChats = this.listMyChats.bind(this);
		this.inputQuery = this.inputQuery.bind(this);
		this.submitQuery = this.submitQuery.bind(this);

		this.state = {
			'chats': [],
			'cityName': cityName,
			'newChatCollapse': false,
			'searchCollapse': false,
			'showMyChats': false,
			'showSearchResults': false
		}
	}

	fetchApiChats() {
		axios.get(`/api/v1/${this.state.cityName}/chats`)
		.then((res) => {
			this.setState ({
				'chats': res.data
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	toggleNewChat() {
	    this.setState({
	    	'newChatCollapse': !this.state.newChatCollapse
	    });
  	}

  	listMyChats() {
  		axios.get(`/api/v1/users/${this.props.userId.sub}/chats/${this.state.cityName}`)
  		.then((res) => {
  			this.setState ({
  				'chats': res.data,
  				'showMyChats': !this.state.showMyChats,
  				'searchCollapse': false
  			});
  			if (!this.state.showMyChats) {
  				this.fetchApiChats();
  			}
  		})
  		.catch((error) => {
  			console.log(error);
  		});
  	}

  	toggleSearchBar() {
  		this.setState({
  			'searchCollapse': !this.state.searchCollapse
  		});
  	}

  	submitQuery(e) {
  		let query = e.target.value;
  		axios.get(`/api/v1/Vancouver/chats/search/${query}`)
  		.then((res) => {
  			this.setState ({
  				'chats': res.data,
  				'showMyChats': true,
  				'showSearchResults': true
  			})
  			if (!this.state.showMyChats) {
  				this.fetchApiChats();
  			}
  		})
  	}

  	inputQuery(e) {
  		if (e.target.value === "") {
  			this.fetchApiChats();
  		} else {
  			this.submitQuery(e);
  		}
  	}

	componentDidMount() {
		this.fetchApiChats();
	}

	render() {

		let filterButton;
		if (this.state.showMyChats) {
			filterButton = 'All Chats';
		} else {
			filterButton = 'My Chats';
		}

		let searchBar;
		if (this.state.searchCollapse) {
			searchBar = (
				<div className="input-group chatSearchBox">
					<input type="search" className="form-control chatSearch" name='chatQuery' placeholder="Search Chats..." aria-describedby="basic-addon1" onKeyUp={this.inputQuery}/>
				</div>
			)
		}

		const chats = this.state.chats;

		return (
			<div className="event">
				<div className="buttonGroup">
          {
            this.props.userId.sub &&
            <span>
              <button type="button" className="btn btn-primary navbar-btn chat-nav" onClick={this.toggleNewChat}>
                <i className="glyphicon glyphicon-align-left"></i>
                New Chat
              </button>
              <button type="button" className="btn btn-primary navbar-btn chat-nav" onClick={this.listMyChats}>
                <i className="glyphicon glyphicon-align-left"></i>
                { filterButton }
              </button>
            </span>
          }
					<i className="fa fa-search chatSearchIcon" aria-hidden="true" onClick={this.toggleSearchBar}></i>
          <Collapse isOpen={this.state.searchCollapse}>
          	{ searchBar }
          </Collapse>
        </div>
				<div className='chatList'>
					{chats.map((chat, index) => {
						return (
              <Link to={`chat/${chat.id}`}>
                <button type="button" class="btn btn-outline-info" key={index}>
                  <div style={{'margin': 'auto'}}>
  								<p className="chatTitle">{`${chat.name}`}</p>
  								<p muted>{`${chat.subject}`}</p>
                  </div>
                </button>
              </Link>
						)
					})}
				</div>
				<NewChat newChatCollapse={this.state.newChatCollapse} toggleNewChat={this.toggleNewChat} cityName={this.state.cityName} fetchApiChats={this.fetchApiChats} />
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    userId: state.authentication.user,
    username: state.authentication.user.username
  };
}

export default connect(mapStateToProps)(ChatList);