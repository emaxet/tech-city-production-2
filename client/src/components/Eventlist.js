import React, { Component } from 'react'
import { Fade } from "reactstrap";
import axios from 'axios';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Modal, ModalHeader, ModalBody, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { ShareButtons, generateShareIcon } from 'react-share';
import { Link } from 'react-router-dom';

class Eventlist extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.state = {
      modal: false,
      attendPopover: false,
      likeColor: [].concat(this.props.like).includes(this.props.user.sub) ? 'red': '',
      attendColor: [].concat(this.props.attend).includes(this.props.user.username) ? 'red': ''
    }
    this.enforce_line_breaks = this.enforce_line_breaks.bind(this);
    this.setmodal = this.setmodal.bind(this);
    this.shorten = this.shorten.bind(this);
    this.eventLike = this.eventLike.bind(this);
    this.putEventLike = this.putEventLike.bind(this);
    this.eventAttend = this.eventAttend.bind(this);
    this.putEventAttend = this.putEventAttend.bind(this);
    this.popoverToggle = this.popoverToggle.bind(this);
  }

  popoverToggle(){
    this.setState({
      attendPopover: !this.state.attendPopover,
    });
  }

  eventLike(){
    new Promise((resolve, reject) => {
      let buttonColor = this.state.likeColor;
      if(this.state.likeColor === ''){
        buttonColor = 'red';
      } else{
        buttonColor = '';
      }
      resolve({buttonColor})
    }).then((data) => {
      this.setState({
        likeColor: data.buttonColor
      });
    }).then(() => {
      this.putEventLike();
    });
  }

  putEventLike(){
    axios.put(`/api/v1/${this.props.name}/events/${this.props.eventId}/like`, {'like': this.props.user.sub})
      .then(() => {
        this.props.updateApiEvents();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  eventAttend(){
    new Promise((resolve, reject) => {
      let buttonColor = this.state.attendColor;
      if(this.state.attendColor === ''){
        buttonColor = 'red';
      } else {
        buttonColor = '';
      }
      resolve({buttonColor})
    }).then((data) => {
      this.setState({
        attendColor: data.buttonColor
      });
    }).then(() => {
      this.putEventAttend();
    });
  }

  putEventAttend(){
    axios.put(`/api/v1/${this.props.name}/events/${this.props.eventId}/attend`, {'attend': this.props.user.username})
      .then(() => {
        this.props.updateApiEvents();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteEvent() {
    axios.delete(`http://localhost:3000/api/v1/${this.props.name}/events/${this.props.eventId}`)
    .then(() => {
      this.props.updateApiEvents();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  setmodal(e){
    this.setState({
      modal : !this.state.modal
    });
  }

  enforce_line_breaks(text){
    var many_strings = text.split('\n');
    return many_strings.map((s, index) => (<p key={index}>{s}</p>));
  }

  shorten(text) {
    return text.length > 20 ? text.substring(0, 20) + "..." : text;
  }

  render() {
    const EmailIcon = generateShareIcon('email');
    const { EmailShareButton } = ShareButtons;

    return (
      <Fade in={true} className="eventItem">
      <Card className="eventCard">
        <div onClick={this.setmodal}>
        <CardMedia
          style={{height: 180}}
          image={this.props.image}
        />
        <CardContent style={{height: 120}}>
          <Typography type="headline" component="h2">
          {this.props.title}
          </Typography>
          <Typography component="p">
          {this.shorten(this.props.description)}
          </Typography>
        </CardContent>
        </div>
        <CardActions style={{'justifyContent': 'space-around'}}>
          {
            this.props.auth &&
            <div >
            <EmailShareButton
                url={window.location.href}
                subject={this.props.user.username + ' invite you to an event.'}
                body={`Hi, \n\n Check this out: ${window.location.href}\n\n ${this.props.title} \n\n ${this.props.description} \n\n${this.props.user.username}`}>
            <EmailIcon size={30} round/>
            </EmailShareButton>
            </div>
          }

          {
            this.props.auth &&
            <Button dense color="primary" style={{color: this.state.likeColor}} onClick={this.eventLike}>
            <i className="fa fa-heart" aria-hidden="true"></i>
            </Button>
          }

          {
            this.props.auth &&
            <div>
              <Button dense color="primary" style={{color: this.state.attendColor}}
              onClick={this.eventAttend}
              onMouseOver={this.popoverToggle}
              onMouseOut={this.popoverToggle}
              id={'Popover' + this.props.eventId}>
              <i className="fa fa-sign-in" aria-hidden="true"></i>
              </Button>

              <Popover placement="bottom" isOpen={this.state.attendPopover} target={'Popover' + this.props.eventId} toggle={this.popoverToggle}>
                <PopoverHeader>Attending</PopoverHeader>
                <PopoverBody>
                  {this.props.attend && this.props.attend.map((ele, index) => {
                    return <p key={index}>{ele}</p>;
                  })}*/}
                </PopoverBody>
              </Popover>
            </div>
          }

          {
            this.props.user.sub === this.props.userId &&
            <Button dense color="primary" onClick={this.deleteEvent}>
            <i className="fa fa-trash" aria-hidden="true"></i>
            </Button>
          }
        </CardActions>
      </Card>

      <Modal isOpen={this.state.modal} toggle={this.setmodal} style={{'maxWidth': '70%'}}>
        <ModalHeader toggle={this.setmodal}>Title: {this.props.title}</ModalHeader>
        <ModalBody>
          <h5>Description:</h5>
          <div className="container">
          {this.enforce_line_breaks(this.props.description)}
          </div>

          <h5>Start Date:</h5>
          <div className="container">
          {this.props.start_date.substring(0,10)}
          </div>

          <h5>End Date:</h5>
          <div className="container">
          {this.props.end_date.substring(0,10)}
          </div>

          <h5>Start Time:</h5>
          <div className="container">
            {this.props.start_time}
          </div>

          <h5>End Time:</h5>
          <div className="container">
          {this.props.end_time}
          </div>

          <h5>Location:</h5>
          <div className="container">
          {this.props.location}
          </div>

        </ModalBody>
        <p class="createdBy" style={{'textAlign': 'right', 'marginRight': '15px'}} muted>Created by: <Link to={`/profile/${this.props.username}`}>{this.props.username}</Link></p>
        <Button dense color="primary" onClick={this.setmodal}>Close</Button>
      </Modal>

      </Fade>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authentication.isAuthenticated,
    user: state.authentication.user
  };
}
export default connect(mapStateToProps)(Eventlist);