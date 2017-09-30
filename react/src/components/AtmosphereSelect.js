import React from 'react';

const AtmosphereSelect = (props) => {
  let options = props.options.map((option) => {
    return(
      <option key={option} value={option}>{option}</option>
    )
  })
  return (
    <label>{props.label} <br/>
      <select className='black-text' name={props.name} value={props.selectedOption} onChange={props.handlerFunction}>
        <option value=''></option>
        {options}
      </select>
    </label>
  )
}

export default AtmosphereSelect;
