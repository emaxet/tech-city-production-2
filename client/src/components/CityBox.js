import React from "react";
import { Link } from 'react-router-dom';

export const CityBox = (props) => {
  return (
    <div className="city-box">
      <Link to={`/city/${props.name.replace(' ', '_')}/events`} className="city-link">
        <img src={props.image} alt="City"/>
        <div className="city-text">
          <h4>{props.name}</h4>
          <p>{props.tagline}</p>
          <div className="city-info">
            <span><i className="fa fa-users" aria-hidden="true"></i> {props.users}</span>
            <span><i className="fa fa-calendar" aria-hidden="true"></i> {props.events}</span>
            <span><i className="fa fa-briefcase" aria-hidden="true"></i> {props.jobs}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
