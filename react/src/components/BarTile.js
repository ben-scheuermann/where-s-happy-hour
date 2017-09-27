import React from 'react';
import { Link, browserHistory } from 'react-router';


const BarTile = (props) => {
  return (
    <div className="BarTile">
      <Link to={`/bars/${props.id}`}>
        <p>
          {props.name} <br />
          {props.happyHoursInfo}
        </p>
      </Link>
    </div>
  )
}

export default BarTile;
