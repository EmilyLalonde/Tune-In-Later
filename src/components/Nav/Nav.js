import './Nav.css'
import SearchForm from '../SearchForm/SearchForm';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
    console.log(props.currentUser)
    return (
        <nav>
            <h2>TuneIn!(Later)</h2>
            <NavLink to='/' className='Nav'>Home</NavLink>
            <NavLink to='/favorites' className='Nav'>Favorites</NavLink>
            <NavLink to='/login' className='Nav'>Log In</NavLink>
            <NavLink to='/create-user' className='Nav'>Create Account</NavLink>
            {props.currentUser && <button onClick={props.handleLogout}>Sign Out</button>}
            <SearchForm />
        </nav>
    )
}

export default Nav