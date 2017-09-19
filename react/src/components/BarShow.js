import React from 'react';

const BarShow = (props) => {
  return (
    <div className="BarShow">
      <h1>React-Name:{props.name}</h1>
      <p>
        Hours: {props.hours} <br />
        Happy Hours: {props.happyHours} <br />
        Category: {props.category} <br />
        Address: {props.address} <br />
        {props.city}, {props.state}, {props.zipcode} <br />
        website: {props.website}
      </p>
    </div>
  )
}

export default BarShow;
