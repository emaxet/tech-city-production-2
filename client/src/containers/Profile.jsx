import React, {Component}from 'react';
import axios from 'axios';
import MainNavbar from './MainNavbar';



class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		}
	}

	 componentDidMount() {
    var self = this;
    axios.get(`/api/v1/users/${this.props.match.params.username}`).then(function (response) {
			self.setState({user: response.data[0]});
    })
  }

	render () {
		return (
			<div>
			<MainNavbar />
			<div className="container profile-div">
				<div className="row">
		      <div className="col col-md-3 text-center">
					{console.log(this.state.user)}
		        <img src={this.state.user? this.state.user.image : 'https://cdn3.iconfinder.com/data/icons/faticons/32/user-01-256.png'} alt="profileImage" className="center-block"/>
		        <h3>{this.state.user? this.state.user.username : ''}</h3>
		      </div>
		      <div className="col col-md-9">
		      	<div className="table-responsive">
		          <table className="table table-hover">
		          	<tbody>
			            <tr>
			              <td className="bio-label">First Name:</td>
			              <td>{this.state.user? this.state.user.first_name : ''}</td>
			            </tr>
			            <tr>
			              <td className="bio-label">Last Name:</td>
			              <td>{this.state.user? this.state.user.last_name : ''}</td>
			            </tr>
			            <tr>
			              <td className="bio-label">E-mail:</td>
			              <td>{this.state.user? this.state.user.email: ''}</td>
			            </tr>
			            <tr>
			              <td className="bio-label">City:</td>
			              <td>{this.state.user? this.state.user.name: ''}</td>
			            </tr>
			            <tr>
			              <td className="bio-label">Bio:</td>
			              <td>{this.state.user? this.state.user.bio: ''}</td>
			            </tr>
			          </tbody>
		          </table>
	    	    </div>
		      </div>
	    	</div>
	    </div>
	    </div>
		);
	}
}



export default Profile;
