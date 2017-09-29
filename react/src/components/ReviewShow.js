import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class ReviewShow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <p>
          Description: {this.props.description}
          <br />
          Drink Prices: {this.props.drinkPrices}
          <br />
          Atmosphere: {this.props.atmosphere}
        </p>
      </div>
    )
  }
}

export default ReviewShow;
