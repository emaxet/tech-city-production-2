import React, { Component } from 'react';
import { Button, Collapse } from 'reactstrap';
import JobBox from '../components/JobBox';
import axios from 'axios';
import NewJob from '../components/NewJob';
import { connect } from 'react-redux';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state={
      'jobs' : [],
      'addJob' : false,
      'cityName': this.props.location.pathname.split('/')[2],
      'searchCollapse': false
    };
    this.toggleAddJob = this.toggleAddJob.bind(this);
    this.updateJobsFromAPI = this.updateJobsFromAPI.bind(this);
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
    this.inputQuery = this.inputQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);
  }

  componentDidMount(){
    this.updateJobsFromAPI();
  }

  updateJobsFromAPI() {
    axios.get(`/api/v1/${this.state.cityName}/jobs`)
      .then((res) => {
        this.setState({
          'jobs': res.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleAddJob(e){
    this.setState({
      'addJob' : !this.state.addJob
    });
  }

  toggleSearchBar() {
    this.setState({
      'searchCollapse': !this.state.searchCollapse
    });
  }

  inputQuery(e) {
    if (e.target.value === "") {
        this.updateJobsFromAPI();
      } else {
        this.submitQuery(e);
      }
  }

  submitQuery(e) {
    let query = e.target.value;
      axios.get(`/api/v1/Vancouver/jobs/search/${query}`)
      .then((res) => {
        this.setState ({
          'jobs': res.data
        })
      })
  }

  render() {
    const buttonStyle = {
      'textAlign': 'center'
    }

    const jobs = this.state.jobs
      .map((job, index) => {
        return <JobBox updateJobsFromAPI={this.updateJobsFromAPI} {...job} key={index}/>
      }).reverse();

    let searchBar;
      if (this.state.searchCollapse) {
        searchBar = (
          <div className="input-group chatSearchBox">
            <input type="search" className="form-control chatSearch" name='chatQuery' placeholder="Search Jobs..." aria-describedby="basic-addon1" onKeyUp={this.inputQuery}/>
          </div>
        )
      }

    return (
      <div>
        <div className="event">
          <div className="buttonGroup" style={buttonStyle}>
            {
              this.props.auth &&
              <Button color="primary"
              onClick={this.toggleAddJob}>
              Add Job</Button>
            }
            <i className="fa fa-search chatSearchIcon" aria-hidden="true" onClick={this.toggleSearchBar}></i>

            <Collapse isOpen={this.state.searchCollapse}>
              { searchBar }
            </Collapse>
          </div>
          <div className="jobList">
              {jobs}
            <NewJob {...this.state} updateJobsFromAPI={this.updateJobsFromAPI} toggleAddJob={this.toggleAddJob}/>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    auth: state.authentication.isAuthenticated
  };
}

export default connect(mapStateToProps)(Jobs);