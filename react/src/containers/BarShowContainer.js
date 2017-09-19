import React from 'react';
import BarShow from '../components/BarShow'

class BarShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: []
    }
  }

  componentDidMount(){
    let barId = this.props.params.id
    fetch(`/api/v1/bars/${barId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(responseBody => {
      this.setState({ bar: responseBody })
    })

  }

  render() {

    return (
      <div className="BarShowContainer">
        <BarShow
          key={this.state.bar.id}
          id={this.state.bar.id}
          name={this.state.bar.name}
          hours={this.state.bar.hours}
          happyHours={this.state.bar.happy_hours}
          address={this.state.bar.address}
          city={this.state.bar.city}
          state={this.state.bar.state}
          zipcode={this.state.bar.zipcode}
          website={this.state.bar.website}
          category={this.state.bar.category}
        />
      </div>
    );
  }
}

export default BarShowContainer;
