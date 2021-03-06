import React from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import BarShow from '../components/BarShow';
import ReviewShow from '../components/ReviewShow';
import FormContainer from './FormContainer';

const params = {v: '3.exp', key: 'AIzaSyBoKBYjQZEa8J51cde3e3WWBpZfbr8KSZc'};


class BarShowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: [],
      reviews: [],
      address: '',
      coords: [],
      website: ''
    }
    this.addNewReview = this.addNewReview.bind(this)
  }

  componentDidMount(){
    let barId = this.props.params.id
    let website
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
      if (responseData.website.includes("http")) {
        website = responseData.website
      } else {
        website = "http://" + responseData.website
      }
      this.setState({
        bar: responseData,
        address: responseData.address.replace(' ','+'),
        website: website
      })
    })

    fetch(`/api/v1/bars/${barId}/reviews`)
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
      this.setState({ reviews: responseData })
    })
  }

  aggregateReview(){
    setTimeout(function(){
      fetch(`/api/v1/bars/${this.state.bar.id}/reviews`)
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
        this.setState({ reviews: responseData })
      });
    }.bind(this), 100)
  }

  addNewReview(submission){
    let barId = this.props.params.id
    let jsonStringData = JSON.stringify(submission)
    fetch(`/api/v1/bars/${barId}/reviews`, {
      method: 'POST',
      body: jsonStringData
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
        reviews: responseBody
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    this.aggregateReview()
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
    let reviews = this.state.reviews.map((review) => {
      return (
        <ReviewShow
          key={review.id}
          id={review.id}
          description={review.description}
          drinkPrices={review.drink_price}
          atmosphere={review.atmosphere}
          barId={review.bar_id}
        />
      )
    })

    let barId = `${this.state.bar.id}`
    return (
      <div className="BarShowContainer">
        <div className='row'>
          <div className='twelve columns'>
            <BarShow
              key={this.state.bar.id}
              id={this.state.bar.id}
              name={this.state.bar.name}
              happyHourInfo={this.state.bar.happy_hour_info}
              address={this.state.bar.address}
              website={this.state.website}
              coords={this.state.coords}
              reviews={this.state.reviews}
              phoneNumber={this.state.bar.phone_number}
              town={this.state.bar.town}
            />
            <hr></hr>
            <div id='reviews'>
              <h3>Reviews</h3>
              {reviews}
              <h4>Add A Review</h4>
              <FormContainer addNewReview={this.addNewReview}/>
            </div>
            <hr></hr>
            <div id='map'>
              <h3>Map</h3>
              <Gmaps
                width={'600px'}
                height={'400px'}
                lat={this.state.bar.coords_lat}
                lng={this.state.bar.coords_lng}
                zoom={16}
                loadingMessage={'Map Loading...'}
                params={params}
                onMapCreated={this.onMapCreated}>
                <Marker
                  lat={this.state.bar.coords_lat}
                  lng={this.state.bar.coords_lng}
                  draggable={true}
                  onDragEnd={this.onDragEnd}
                />
              </Gmaps>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BarShowContainer;
