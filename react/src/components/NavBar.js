import React from 'react';
import { Link } from 'react-router'
import BackButton from './BackButton'

const NavBar = props => {
  return(
    <div className='row'>
      <div className='eight columns offset-by-two'>
        <BackButton />
        <Link to='/bars' className="button">Home</Link>
        <a href='/users/sign_up' className="button">Sign Up</a>
        <a href='users/sign_in' className="button">Sign In</a>
        {props.children}
      </div>
      <div className='two columns'>
      </div>
    </div>
  )
}

export default NavBar;
