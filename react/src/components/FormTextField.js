import React from 'react';

const FormTextField = (props) => {
  return (
    <label>{props.label} <br/>
      <input className="black-text"
        name={props.name}
        onChange={props.handlerFunction}
        type='text'
        value={props.content}
        className="shorter-field"
      />
    </label>
  )
}

export default FormTextField;
