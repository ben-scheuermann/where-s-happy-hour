import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
// import GMap from './containers/MapTest';
// import App from './containers/MapContainer';

var initialCenter = { lng: -90.1056957, lat: 29.9717272 }

$(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
