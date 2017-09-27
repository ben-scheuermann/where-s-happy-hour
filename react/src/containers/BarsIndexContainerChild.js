import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import BarTile from '../components/BarTile';

const coords = {
  lat: 39.9526,
  lng: -75.1652
};

const params = {v: '3.exp', key: 'AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc'};

class BarsIndexContainerChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: {},
      bars: [],
      coords: []
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
      this.setState({
        // current_user: responseBody.current_user,
        bars: responseBody.bars
      })
    })
  }

  componentWillReceiveProps(nextProps){
    nextProps.bars.map((bar) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${bar.address},Philadelphia,PA&key=AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc`)

      // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=217+Chestnut+st,Philadelphia,PA&key=AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc`)
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
          coords: this.state.coords.concat(responseBody.results[0].geometry.location)
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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

  render() {
    let markers = this.state.coords.map((coords) => {
      return(
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd}
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
        />
      )
    })
    return (
      <div>
        <div className='row'>
          <div className='four columns'>
            <h1>Bars</h1>
            {bars}
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

export default BarsIndexContainerChild;

// <Marker
//   lat={this.state.coords.lat}
//   lng={this.state.coords.lng}
//   draggable={true}
//   onDragEnd={this.onDragEnd}
// />

// <InfoWindow
//   lat={this.state.coords.lat}
//   lng={this.state.coords.lng}
//   content={'Test That Better Fucking Work'}
//   onCloseClick={this.onCloseClick} />

// let map = <iframe width="425"
//       height="350"
//       frameBorder="0"
//       scrolling="no"
//       marginHeight="0"
//       marginWidth="0"
//       src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc&q=1701+walnut+st,+Philadelphia,PA">
//     </iframe>
