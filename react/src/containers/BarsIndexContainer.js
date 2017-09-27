import React from 'react';
import BarsIndexContainerChild from './BarsIndexContainerChild';

class BarsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: {},
      bars: [],
      address: ''
    }
  }
  componentWillMount(){
    fetch(`/api/v1/bars/`, {
      credentials: 'same-origin'
    })
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
      // console.log(responseBody.bars)
      debugger
      this.setState({
        // current_user: responseBody.current_user,
        bars: responseBody.bars
      })
    })
  }


  render() {

    return (
      <BarsIndexContainerChild
        bars={this.state.bars}
      />
    );
  }
}

export default BarsIndexContainer;
