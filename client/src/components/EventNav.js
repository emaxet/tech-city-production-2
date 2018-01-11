import React, { Component } from 'react';

class EventNav extends Component{
  constructor(props) {
    super(props);

    this.closeNav = this.closeNav.bind(this);
  }

  closeNav() {
    this.props.toggleSideNav();

  }
  
  render() {
    return (
      
      <div className="eventNav">
        <table>
          <tbody>
            {/* event type */}
            <tr>
              <td>
              <label htmlFor="eventType">Type</label>
              </td>
              <td>
                <select name="eventType" id="eventType">
                  <option value="techcity">Tech city</option>
                  <option value="meetup">Meet up</option>
                </select>
              </td>
            </tr>
            {/* event show up */}
            <tr>
              <td>
              <label htmlFor="eventShow">Event</label>
              </td>
              <td>
                <select name="eventShow" id="eventShow">
                  <option value="eventShow">All</option>
                  <option value="eventShow">Mine</option>
                </select>
              </td>
            </tr>
            {/* event key */}
            <tr>
              <td>
              <label htmlFor="eventKey">Keyword</label>
              </td>
              <td>
                <input type='text' name="eventKey" placeholder="Node.js"></input>
              </td>
            </tr>
            {/* event start Date */}
            <tr>
              <td>
              <label htmlFor="eventDateStart">Start Date</label>
              </td>
              <td>
                <input type='date' name="eventDateStart" id="eventDateStart"></input>
              </td>
            </tr>
            {/* event end Date */}
            <tr>
              <td>
              <label htmlFor="eventDateEnd">End Date</label>
              </td>
              <td>
                <input type='date' name="eventDateEnd" id="eventDateEnd"></input>
              </td>
            </tr>
            {/* event Start Time */}
            <tr>
              <td>
              <label htmlFor="eventTimeStart">Start Time</label>
              </td>
              <td>
                <input type='time' name="eventTimeStart" id="eventTimeStart"></input>
              </td>
            </tr>
            {/* event End Time */}
            <tr>
              <td>
              <label htmlFor="eventTimeEnd">End Time</label>
              </td>
              <td>
                <input type='time' name="eventTimeEnd" id="eventTimeEnd"></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EventNav;