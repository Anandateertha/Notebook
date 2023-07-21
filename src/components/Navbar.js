import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = (props) => {

    let location = useLocation();
    const navigate = useNavigate()

    const [condition, setcondition] = useState({
        li:"/account",
        name:"Your Account"
    })


    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleClick=()=>{
        if (location.pathname==='/account') {
            setcondition({
                li:'/',
                name:'Your Account'
            })
        }
        else
        {
            setcondition({
                li:'/account',
                name:'Back to Notes'
            })
        }
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
                    <Link onFocus={handleClick} className="btn btn-primary mx-1" to={`${condition.li}`} role="button">{condition.name}</Link>
                    {!localStorage.getItem('token') ? <form className='d-flex'>
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className='btn btn-primary mx-1' to="/signup" role="button">Sign up</Link>
                    </form> : <button onClick={logout} className='btn btn-primary'>Log out</button>}
                </div>
            </div>
        </nav >
    )
}

Navbar.propTypes = {
    name: PropTypes.string
}

export default Navbar