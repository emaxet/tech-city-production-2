import React, { Component } from 'react';
import Eventlist from '../components/Eventlist'
import EventNav from '../components/EventNav'
import { Collapse } from 'reactstrap';
import axios from 'axios';
import NewEvent from '../components/NewEvent';
import { connect } from 'react-redux';

class Events extends Component {
  constructor(props) {
    super(props);

    this.togglefilter = this.togglefilter.bind(this);
    this.toggleNewEvent = this.toggleNewEvent.bind(this);
    this.updateApiEvents = this.updateApiEvents.bind(this);
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
    this.inputQuery = this.inputQuery.bind(this);
    this.submitQuery = this.submitQuery.bind(this);

    const cityName = (this.props.location.pathname.split('/')[2]);

    this.state = {
      'filterCollapse': false,
      'eventsCollapse': true,
      'newEventCollapse': false,
      'eventlist': [],
      'cityName': cityName,
      'searchCollapse': false
    };
  }

  togglefilter() {
    this.setState({
      'filterCollapse': !this.state.filterCollapse,
      'eventsCollapse': !this.state.eventsCollapse
    });
  }

  toggleNewEvent() {
    this.setState({
      'newEventCollapse': !this.state.newEventCollapse
    });
  }

  toggleSearchBar() {
    this.setState({
      'searchCollapse': !this.state.searchCollapse
    });
  }

  submitQuery(e) {
    let query = e.target.value;
      axios.get(`http://localhost:3000/api/v1/Vancouver/events/search/${query}`)
      .then((res) => {
        this.setState ({
          'eventlist': res.data
        })
      })
  }

  inputQuery(e) {
    if (e.target.value === "") {
        this.updateApiEvents();
      } else {
        this.submitQuery(e);
      }
  }

  componentDidMount() {
    this.updateApiEvents();
  }

  updateApiEvents(){
    axios.get(`http://localhost:3000/api/v1/${this.state.cityName}/events`)
      .then((res) => {
        this.setState({
          'eventlist': res.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const eventlist = this.state.eventlist
      .map((event, index) => {
        if(event.image === ''){
          event.image = 'https://picsum.photos/500/100/?random';
        }
        return <Eventlist updateApiEvents={this.updateApiEvents} {...event} key={event.eventId}/>;
      }).reverse();

      let searchBar;
      if (this.state.searchCollapse) {
        searchBar = (
          <div className="input-group chatSearchBox">
            <input type="search" className="form-control chatSearch" name='chatQuery' placeholder="Search Events..." aria-describedby="basic-addon1" onKeyUp={this.inputQuery}/>
          </div>
        )
      }

    return (
      <div className="event">

        <div className = "buttonGroup">
          {
            this.props.auth &&
            <button type="button" className="btn btn-primary navbar-btn" onClick={this.toggleNewEvent}>
              <i className="glyphicon glyphicon-align-left"></i>
              Add Event
            </button>
          }
          <i className="fa fa-search chatSearchIcon" aria-hidden="true" onClick={this.toggleSearchBar}></i>

          <Collapse isOpen={this.state.searchCollapse}>
            { searchBar }
          </Collapse>
        </div>

        <Collapse isOpen={this.state.filterCollapse}>
          <div className="eventNav">
            <EventNav {...this.state} toggleSideNav={this.toggleSideNav} />
          </div>
        </Collapse>

        <Collapse isOpen={this.state.eventsCollapse}>
          <div className="eventList">
            {eventlist}
          </div>
        </Collapse>

        <NewEvent newEventCollapse={this.state.newEventCollapse} toggleNewEvent={this.toggleNewEvent} cityName={this.state.cityName} updateApiEvents={this.updateApiEvents}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authentication.isAuthenticated
  };
}

export default connect(mapStateToProps)(Events);