import './Nav.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'

const Nav = (props) => {
    return (
        <nav>
            <h1></h1>
            <NavLink to='/' className='Nav'>Home</NavLink>
            <NavLink to='/favorites' className='Nav'>Favorites</NavLink>
            <NavLink to='/login' className='Nav'>Log In</NavLink>
            <NavLink to='/create-user' className='Nav'>Create Account</NavLink>
            {props.currentUser && <button className="sign-out-button" onClick={props.handleLogout}>Sign Out</button>}
        </nav>
    )
}

export default Nav

Nav.propTypes = {
    currentUser: PropTypes.object,
    handleLogout: PropTypes.func,
  }