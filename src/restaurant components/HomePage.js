import React from 'react'
import logo from "./Card-2.png"
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'


export default function HomePage(props) {

    return (
        <div className='background'>
        <Navbar/>
        <div style={{display: "flex", alignItems:"center", justifyContent:"center", flexWrap: "wrap"}}>
            <div className="card" style={{maxWidth: 18 +"rem", margin: 2+"rem"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Create Profile</h5>
                    <p className="card-text">Create a profile to get started. You can add your restaurants, menu card and other information.</p>
                    <NavLink to={props.logstate===0?"/login":"/restaurant"} className="btn btn-primary">{props.logstate===0?"Sign-in":"Edit Profile"}</NavLink>
                </div>
            </div>
            <div className="card" style={{maxWidth: 18 +"rem", margin: 2+"rem"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">How to use</h5>
                    <p className="card-text">To know what this website provides, and manage multiple restaurants details - Click the button below.</p>
                    <NavLink to="/" className="btn btn-primary">Read Content</NavLink>
                </div>
            </div>
            <div className="card" style={{maxWidth: 18 +"rem", margin: 2+"rem"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Features</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <NavLink to={props.logstate===0?"/login":"/restaurant"} className="btn btn-primary">Explore</NavLink>
                </div>
            </div>
        </div>
        </div>
    )
}
