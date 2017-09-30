import React from 'react';

const SearchTextField = props => {
  return (
    <label>{props.bar}
      <div className="black-text">
        <input
          name={props.name}
          onChange={props.handlerFunction}
          type="text"
          value={props.content}
          className="shorter-field"
        />
      </div>
    </label>
  )
}

export default SearchTextField;
