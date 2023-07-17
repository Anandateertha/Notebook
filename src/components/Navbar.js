import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = (props) => {

    let location = useLocation();
    let log=document.getElementById('log')

    if (location.pathname === '/') {
        log.innerText='Logout'
    }
    else
    {
        log.innerText='LogIn'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{props.name}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <Link className="btn btn-primary mx-1" to="/login" id='log' role="button">Login</Link>
                    <Link className={`btn btn-primary mx-1  ${location.pathname==='/'?"d-none":""}`} to="/signup" role="button">Sign up</Link>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    name: PropTypes.string
}

export default Navbar