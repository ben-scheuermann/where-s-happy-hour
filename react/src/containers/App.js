import React from 'react';
import { Route, IndexRoute, Router, browserHistory, Redirect } from 'react-router';
import BarsIndexContainer from './BarsIndexContainer';
import BarShowContainer from './BarShowContainer';
import NavBar from '../components/NavBar';


const App = (props) => {
  return (
    // <BarsIndexContainer />
    // <h1>hello??</h1>
    <Router history={browserHistory} >
      <Route path='/' component={NavBar} >
        <IndexRoute component={BarsIndexContainer} />
        <Route path='/bars/:id' component={BarShowContainer} />
      </Route>
    </Router>
  )
}

export default App;
