import React from 'react';
import TextField from '../components/TextField';
import DrinksSelect from '../components/DrinksSelect';
import AtmosphereSelect from '../components/AtmosphereSelect';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drinksSelected: '',
      atmosphereSelected: '',
      description: '',
      options: [1,2,3,4,5]
    }
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handleDrinksSelect = this.handleDrinksSelect.bind(this)
    this.handleAtmosphereSelect = this.handleAtmosphereSelect.bind(this)
    this.handleFormSummit = this.handleFormSummit.bind(this)
    this.handleFormClear = this.handleFormClear.bind(this)
  }

  handleFormSummit(event){
    event.preventDefault();
    let formPayLoad = {
      description: this.state.description,
      drinksPrice: this.state.drinksSelected,
      atmosphere: this.state.atmosphereSelected
    }
    this.props.addNewReview(formPayLoad);
    this.handleFormClear(event);
  }


  handleFormClear(event) {
    event.preventDefault();
    this.setState({
      description: '',
      drinksSelected: '',
      atmosphereSelected: ''
    })
  }

  handleDescriptionChange(event){
    this.setState({ description: event.target.value })
  }

  handleDrinksSelect(event){
    this.setState({ drinksSelected: event.target.value })
  }

  handleAtmosphereSelect(event){
    this.setState({ atmosphereSelected: event.target.value })
  }

  render() {

    return (
      <form className='callout' onSubmit={this.handleFormSummit}>
        <TextField
          label={`Description Of Bar`}
          name='Description'
          handlerFunction={this.handleDescriptionChange}
          content={this.state.description}
        />
        <DrinksSelect
          label='Drinks Score'
          name='Drinks'
          options={this.state.options}
          selectedOption={this.state.drinksSelected}
          handlerFunction={this.handleDrinksSelect}
        />
        <AtmosphereSelect
          label='Atmosphere Score'
          name='Atmosphere'
          options={this.state.options}
          selectedOption={this.state.atmosphereSelected}
          handlerFunction={this.handleAtmosphereSelect}
        />
        <div className='button-group'>
          <button className='button' onClick={this.handleFormClear}>Clear</button>
          <input className='button' type='submit' value='Submit' />
        </div>
      </form>
    );
  }
}

export default FormContainer;
