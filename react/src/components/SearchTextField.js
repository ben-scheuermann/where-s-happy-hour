import React from 'react';

const SearchTextField = props => {
  return (
    <label className="white-text">{props.bar}
      <input
        name={props.name}
        onChange={props.handlerFunction}
        type="text"
        value={props.content}
        className="shorter-field"
      />
    </label>
  );
}

export default SearchTextField;
