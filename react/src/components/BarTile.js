import React from 'react';
import { Link, browserHistory } from 'react-router';


const BarTile = (props) => {
  return (
    <div className="BarTile">
      <Link to={`/bars/${props.id}`}>
        <p>
          {props.name} <br />
        </p>
      </Link>
    </div>
  )
}

export default BarTile;
