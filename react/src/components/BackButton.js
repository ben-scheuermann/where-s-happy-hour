import React from 'react'
import { browserHistory } from 'react-router';

const BackButton = props => {
  return(
    <div onClick={browserHistory.goBack} className="button">Back</div>
  )
}

export default BackButton;
