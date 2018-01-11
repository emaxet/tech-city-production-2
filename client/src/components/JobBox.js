import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Fade, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { ShareButtons, generateShareIcon } from 'react-share';
import { Link } from 'react-router-dom';

class JobBox extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      likeColor: [].concat(this.props.like).includes(this.props.user.sub) ? 'red': ''
    };
    this.setmodal = this.setmodal.bind(this);
    this.trashClick = this.trashClick.bind(this);
    this.enforce_line_breaks = this.enforce_line_breaks.bind(this);
    this.shorten = this.shorten.bind(this);
    this.jobLike = this.jobLike.bind(this);
    this.putJobLike = this.putJobLike.bind(this);
  }

  jobLike(){
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
      this.putJobLike();
    });
  }

  putJobLike(){
    axios.put(`/api/v1/${this.props.name}/jobs/${this.props.id}/like`, {'like': this.props.user.sub})
      .then(() => {
        this.props.updateJobsFromAPI();
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

  trashClick(){
    axios.delete(`/api/v1/${this.props.name}/jobs/${this.props.id}`)
    .then(() => {
      this.props.updateJobsFromAPI();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  enforce_line_breaks(text){
    var many_strings = text.split('\n');
    return many_strings.map((s, index) => (<p key={index}>{s}</p>));
  }

  shorten(text) {
    return text.length > 50 ? text.substring(0, 50) + "..." : text;
  }

  render(){
    const EmailIcon = generateShareIcon('email');
    const { EmailShareButton } = ShareButtons;
    console.log(this.props)

    return (
      <Fade in={true} className="eventItem">
        <Card className="jobCard">
        <div onClick={this.setmodal}>
        <CardContent style={{height: 145}}>
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
            <div style={{padding: '0 1em'}}>
            <EmailShareButton
                url={window.location.href}
                subject={this.props.user.username + ' send you a job info'}
                body={`Hi, \n\n Check this out: ${this.props.url}\n\n ${this.props.title} \n\n ${this.props.description} \n\nBest Regards,\n${this.props.user.username}`}>
            <EmailIcon size={30} round/>
            </EmailShareButton>
            </div>
          }

          {
            this.props.auth &&
            <Button dense color="primary" style={{color: this.state.likeColor}} onClick={this.jobLike}>
            <i className="fa fa-heart" aria-hidden="true"></i>
            </Button>
          }

          {this.props.user.sub === this.props.userId && <Button dense color="primary" onClick={this.trashClick}>
          <i className="fa fa-trash" aria-hidden="true"></i>
          </Button>}
        </CardActions>
        </Card>

        <Modal isOpen={this.state.modal} toggle={this.setmodal} style={{'maxWidth': '70%'}}>
          <ModalHeader toggle={this.setmodal}>{this.props.company}</ModalHeader>
          <ModalBody>
            <h3>Title: {this.props.title}</h3><br/>
            <h5>Description:</h5> <br/>
            {this.enforce_line_breaks(this.props.description)}
            <br/>
            <br/>
            <a target='_blank' href={this.props.url}>{this.props.url}</a>
          </ModalBody>
            <p class="createdBy" style={{'textAlign': 'right', 'marginRight': '15px'}} muted>Created by: <Link to={`/profile/${this.props.username}`}>{this.props.username}</Link></p>
            <Button color="primary" onClick={this.setmodal}>Close</Button>
        </Modal>
      </Fade>
    );
  }

}

function mapStateToProps(state) {
  return {
    auth: state.authentication.isAuthenticated,
    user: state.authentication.user
  };
}

export default connect(mapStateToProps)(JobBox);