import './Nav.css'
import SearchForm from '../SearchForm/SearchForm';
import React from 'react'

const Nav = () => {
    return (
        <nav>
            <h2>TuneIn!(Later)</h2>
            <SearchForm />
        </nav>
    )
}

export default Nav