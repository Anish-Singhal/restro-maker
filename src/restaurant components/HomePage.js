import React, { useContext, useEffect } from 'react'
import logo from "./Card-2.png"
import Navbar from './Navbar'
import { NavLink } from 'react-router-dom'
import Footer from './Footer'
import navContext from './Context/navContext'
import restro_maker from "./Restro-maker.jpg"
import background from "./background3.JPG"

export default function HomePage(props) {

    const context = useContext(navContext);
    const {logstate,setTitle} = context;

    useEffect(()=>{
        setTitle("home");
    },[setTitle])

    return (
        <div className='background-home'>
        <img src={background} alt="background" style={{height:"135vh",width:"100vw",zIndex:"-1",position:"absolute",opacity:"0.9"}}></img>
        <div className='d-flex w-100' style={{backgroundColor:"rgb(0,0,0,0.4)"}}>
            <img src={restro_maker} alt="Restro-maker logo"  height="150px"/>
            <div className="w-100 fw-bold text-align-center">
                <h2 className="w-100 fs-1 fw-bold" style={{ color: "gold",textAlign:"center",  margin: "10px auto", textShadow:"-1px -1px 0 black, 1px -1px 0 black, 1px 1px 0 black,1px 1px 0 black" }}>Welcome to Restro Maker</h2>
                <p className="fs-4" style={{ color: "#fff", margin: "auto",textAlign:"center",width:"90%" }}>
                    Your one-stop solution for managing your restaurants. From creating profiles to organizing menus and placing orders, explore all the features we offer to streamline your business.
                </p>
            </div>
        </div>
        {/* <div>
            <img src={restro_maker} alt="Restro-maker logo"  height="240vh" className="my-0 rounded-top-0 rounded-end-circle mx-auto d-block" style={{zIndex:"2",position:"absolute",left:"-0.5vw",top:"-30px"}}/>
            <Navbar/>
        </div> */}

        <Navbar/>
        {/*logstate===0 && <div className="fw-bold fs-3 mt-5 alert alert-warning" role="alert">Login to access restaurants and other features.</div>*/}
        <div style={{display: "flex", alignItems:"center", justifyContent:"center", flexWrap: "wrap",height:"81vh"}}>
            <div className="card rounded" style={{maxWidth: 16 +"rem", margin: "0rem 2rem",border:"1px solid black"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body rounded">
                    <h5 className="card-title">Create Profile</h5>
                    <p className="card-text">Create a profile to get started. You can add your restaurants, menu card and other information.</p>
                    <NavLink to={logstate===0?"/login":"/restaurant"} className="btn btn-primary">{logstate===0?"Sign-in":"Edit Profile"}</NavLink>
                </div>
            </div>
            <div className="card" style={{maxWidth: 16 +"rem", margin: "0rem 2rem",border:"1px solid black"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body rounded">
                    <h5 className="card-title">How to use</h5>
                    <p className="card-text">To know what this website provides, and manage multiple restaurants details - Click the button below.</p>
                    <NavLink to="/about" className="btn btn-primary">Read Content</NavLink>
                </div>
            </div>
            <div className="card" style={{maxWidth: 16 +"rem", margin: "0rem 2rem",border:"1px solid black"}}>
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body rounded">
                    <h5 className="card-title">Features</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <NavLink to={logstate===0?"/login":"/orderpage"} className="btn btn-primary">Order Food</NavLink>
                </div>
            </div>
        </div>
        {logstate===1 && <Footer/>}
        </div>
    )
}
