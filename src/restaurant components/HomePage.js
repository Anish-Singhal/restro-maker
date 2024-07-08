import React from 'react'
import logo from "./Card-2.png"
import Navbar from './Navbar'


export default function HomePage() {
    return (
        <>
        <Navbar/>
        <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
            <div className="card" style={{width: 18 +"rem", margin: 2+"rem"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Create Profile</h5>
                    <p className="card-text">Create a profile to get started. You can add your restaurants, menu card and other information.</p>
                    <a href="/login" className="btn btn-primary">Sign-in</a>
                </div>
            </div>
            <div className="card" style={{width: 18 +"rem", margin: 2+"rem"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">How to use</h5>
                    <p className="card-text">To know what this website provides, and manage multiple restaurants details - Click the button below.</p>
                    <a href="/" className="btn btn-primary">Read Content</a>
                </div>
            </div>
            <div className="card" style={{width: 18 +"rem", margin: 2+"rem"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Features</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="/" className="btn btn-primary">Explore</a>
                </div>
            </div>
        </div>
        </>
    )
}
