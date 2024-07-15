import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className='background'>
      <nav className={`${window.location.pathname==="/"?'navbar-len':''} navbar navbar-expand-lg bg-body-tertiary`}>
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Restro-Maker</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Features
                </NavLink>
                <ul className="dropdown-menu mt-2">
                    <li><NavLink className="dropdown-item" to="/restaurant">Restaurants</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/signup">Sign Up Page</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/login">Login here</NavLink></li>
                </ul>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/">About</NavLink>
                </li>
                <li className="nav-item">   
                <NavLink className="nav-link" to="/">Help</NavLink>
                </li>
            </ul>
            <div className="dropdown">
                <span role="button" data-bs-toggle="dropdown" aria-expanded="false" className='mx-3 ms-5 ps-5 fa-2xl'><i className="fa-solid fa-circle-user"></i></span>

                <ul class="dropdown-menu mt-2">
                    <li><Link to="/" class="dropdown-item">Edit Profile &nbsp;&nbsp;<i class="fa-solid fa-pen"></i></Link></li>
                    <li><Link to="/" class="dropdown-item">Another action</Link></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><Link to="/" class="dropdown-item">Log Out &nbsp;&nbsp;<i class="fa-solid fa-arrow-right-from-bracket"></i></Link></li>
                </ul>
            </div>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
    </div>
  )
}
