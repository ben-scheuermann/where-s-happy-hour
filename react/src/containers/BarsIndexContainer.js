import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import BarTile from '../components/BarTile';
import SearchTextField from '../components/SearchTextField';

const coords = {
  lat: 39.9526,
  lng: -75.1652
};

const params = {v: '3.exp', key: 'AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc'};

class BarsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: {},
      bars: [],
      search: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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
      this.setState({
        bars: responseBody.bars
      })
    })
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  handleSearch(event) {
    event.preventDefault()
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
      let bars = [];
      responseBody.bars.forEach((bar) => {
        if(bar.name.toLowerCase().includes(this.state.search.toLowerCase()) || bar.happy_hour_info.toLowerCase().includes(this.state.search.toLowerCase()) || bar.town.toLowerCase().includes(this.state.search.toLowerCase())){
          bars = bars.concat(bar)
        }
      })
      this.setState({
        bars: bars
      })
    })
  }

  handleInputChange(event) {
    this.setState({ search: event.target.value })
  }

  render() {
    let markers = this.state.bars.map((bar) => {
      return(
        <Marker
          key={bar.id}
          lat={bar.coords_lat}
          lng={bar.coords_lng}
          draggable={true}
        />
      )
    })

    let bars = this.state.bars.map((bar) => {
      return(
        <BarTile
          key={bar.id}
          id={bar.id}
          name={bar.name}
          happyHourInfo={bar.happy_hour_info}
          address={bar.address}
          website={bar.website}
          phoneNumber={bar.phone_number}
          town={bar.town}
        />
      )
    })
    return (
      <div>
        <div className='row'>
          <div className='five columns'>
            <h1>Bars</h1>
            <form onSubmit={this.handleSearch}>
              <SearchTextField
              content={this.state.search}
              bar="Search"
              name="search"
              handlerFunction={this.handleInputChange}
              />
              <input className="button" type="submit" value="Submit"/>
            </form>
            <div className='bars'>
              {bars}
            </div>
          </div>
          <div id='map'>
            <h1>Map</h1>
            <Gmaps
              width={'500px'}
              height={'600px'}
              lat={coords.lat}
              lng={coords.lng}
              zoom={12}
              loadingMessage={'Map Loading...'}
              params={params}
              onMapCreated={this.onMapCreated}>
              {markers}
            </Gmaps>
          </div>
        </div>
      </div>
    );
  }
}

export default BarsIndexContainer;
