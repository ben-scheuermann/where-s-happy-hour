import React from 'react';

const BarShow = (props) => {
  let reviewScore = {
    atmosphere: 0,
    drinkPrices: 0,
  }

  let tally = {
    atmosphere: 0,
    drinkPrices: 0
  }

  props.reviews.forEach((review) => {
    reviewScore.atmosphere += review.atmosphere
    tally.atmosphere += 1

    reviewScore.drinkPrices += review.drink_price
    tally.drinkPrices += 1
  })
  return (
    <div className="BarShow">
      <h1>{props.name}</h1>
      {props.address} <br />
      {props.town}, PA<br />
      {props.website} <br />
      {props.phoneNumber} <br />
      <div className='display-linebreak'>
        {props.happyHourInfo}
      </div>
      <br />
      <h5>Bar Score</h5>
      <p>
        Average Atmosphere: {(reviewScore.atmosphere/tally.atmosphere).toFixed(1)} <br/>
        Average Drink Prices: {(reviewScore.drinkPrices/tally.drinkPrices).toFixed(1)}
      </p>
    </div>
  )
}

export default BarShow;
