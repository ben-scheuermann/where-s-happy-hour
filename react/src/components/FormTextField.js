import React from 'react';

const FormTextField = (props) => {
  return (
    <label>{props.label}
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

export default FormTextField;
