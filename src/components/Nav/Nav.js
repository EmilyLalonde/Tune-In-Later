import './Nav.css'
import SearchForm from '../SearchForm/SearchForm';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <h2>TuneIn!(Later)</h2>
            <NavLink to='/' className='Nav'>Home</NavLink>
            <NavLink to='/favorites' className='Nav'>Favorites</NavLink>
            <NavLink to='/login' className='Nav'>Log In</NavLink>
            <NavLink to='/logout' className='Nav'>Log Out</NavLink>
            <SearchForm />
        </nav>
    )
}

export default Nav