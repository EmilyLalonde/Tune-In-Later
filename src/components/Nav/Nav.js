import './Nav.css'
import SearchForm from '../SearchForm/SearchForm';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

const Nav = (props) => {
    console.log('props', props)
    return (
        <nav>
            <h1></h1>
            {props.currentUser &&<h2 className="user-name"> Welcome, {props.currentUser.name}  </h2>}
            <NavLink to='/' className='Nav'>Home</NavLink>
            <NavLink to='/favorites' className='Nav'>Favorites</NavLink>
            <NavLink to='/login' className='Nav'>Log In</NavLink>
            <NavLink to='/create-user' className='Nav'>Create Account</NavLink>
            {props.currentUser && <button className="sign-out-button" onClick={props.handleLogout}>Sign Out</button>}
        </nav>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
})

export default connect(mapStateToProps)(Nav)