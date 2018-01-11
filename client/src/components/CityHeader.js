import React, { Component } from 'react';

class CityHeader extends Component {
  render() {
    return (
      <div className='cityHeader'>
        <h2 className='headerTitle'>{this.props.city_name.replace('_', ' ')}</h2>
      </div>
    )
  }
}

export default CityHeader;