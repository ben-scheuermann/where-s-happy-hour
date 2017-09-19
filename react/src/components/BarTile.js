import React from 'react';
import { Link, browserHistory } from 'react-router';


const BarTile = (props) => {
  return (
    <div className="BarTile">
      <Link to={`/bars/${props.id}`}>
        <p>
          Name: {props.name} <br />
          Hours: {props.hours} <br />
          Happy Hours: {props.happyHours}
        </p>
      </Link>
    </div>
  )
}

export default BarTile;
