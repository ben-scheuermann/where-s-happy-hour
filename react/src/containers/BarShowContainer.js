import React from 'react';
import BarShowContainerChild from './BarShowContainerChild';

class BarShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: [],
      address: ''
    }
  }
  componentWillMount(){
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
    .then(responseData => {
      this.setState({ bar: responseData, address: responseData.address.replace(' ','+') })
    })
  }

  render() {

    return (
      <BarShowContainerChild
        address={this.state.address}
        bar={this.state.bar}
      />
    );
  }
}

export default BarShowContainer;
