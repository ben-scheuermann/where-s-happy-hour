import React from 'react';
import { Route, IndexRoute, Router, browserHistory, Redirect } from 'react-router';
import BarsIndexContainer from './BarsIndexContainer';
import BarShowContainer from './BarShowContainer';
import NavBar from '../components/NavBar';


const App = (props) => {
  return (
    <Router history={browserHistory} >
      <Redirect from='/' to='/bars' />
      <Route path='/bars' component={NavBar} >
        <IndexRoute component={BarsIndexContainer} />
        <Route path='/bars/:id' component={BarShowContainer} />
      </Route>
    </Router>
  )
}

export default App;
