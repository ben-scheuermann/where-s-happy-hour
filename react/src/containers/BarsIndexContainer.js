import React from 'react';
import BarTile from '../components/BarTile';


class BarsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: {},
      bars: []
    }
  }

  componentDidMount(){
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
      this.setState({
        // current_user: responseBody.current_user,
        bars: responseBody.bars
      })
    })

  }

  render() {
    let bars = this.state.bars.map((bar) => {
      return(
        <BarTile
          key={bar.id}
          id={bar.id}
          name={bar.name}
          hours={bar.hours}
          happyHours={bar.happy_hours}
          address={bar.address}
          city={bar.city}
          state={bar.state}
          zipcode={bar.zipcode}
          website={bar.zipcode}
          category={bar.category}
        />
      )
    })
    return (
      <div>
        <h1>Bars</h1>
        <div>
          {bars}
        </div>
      </div>
    );
  }
}

export default BarsIndexContainer;
