import React from 'react';

const TextField = (props) => {
  return (
    <label>{props.label} <br/>
      <input
        name={props.name}
        onChange={props.handlerFunction}
        type='text'
        value={props.content}
      />
    </label>
  )
}

export default TextField;
