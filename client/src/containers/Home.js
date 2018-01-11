import React from 'react';
import axios from 'axios';
import { Jumbotron, Container } from 'reactstrap';
import MainNavbar from './MainNavbar';
import { CityBox } from '../components/CityBox';
import FlashMessageList from './flash/FlashMessageList';
import mp4 from '../images/videos/header.mp4';
import webm from '../images/videos/header.webm';
import ogv from '../images/videos/header.ogv';

export default class Home extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    cities: []
  }
}

  componentDidMount() {
    var self = this;
    axios.get('/api/v1/cities').then(function (response) {
      self.setState({cities: response.data});
    });
  }

  render() {
    const cities = this.state.cities.map((city, index) => {
      return <CityBox key={index} name={city.name} image={city.image} tagline={city.tagline} users={city.users} events={city.events} jobs={city.jobs}/>
    })

    return (
      <div>
        <MainNavbar />
        <FlashMessageList />
        <Jumbotron id="home-header">

          <video id="header-video" autoPlay='true' loop='true'>
            <source src={mp4} type="video/mp4"/>
            <source src={webm} type="video/webm"/>
            <source src={ogv} type="video/ogv"/>
          </video>

          <Container className="header-text text-center">
            <h1 id="header-title">TECH CITY</h1>
            <p id="header-tagline">Find your city, find your event, find your job, find your community.</p>
          </Container>

        </Jumbotron>
        <Container id="cities-list">
          {cities}
        </Container>
      </div>
    );
  }
}