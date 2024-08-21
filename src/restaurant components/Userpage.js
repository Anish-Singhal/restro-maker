import React, { useEffect, useState, useContext } from 'react'
import "./Userpage.css"
import Navbar from './Navbar'
import logo from "./Card-2.png"
import { GetAllUserRestaurants } from '../restaurant services/UserService'
import { Link } from 'react-router-dom'
import navContext from './Context/navContext'

export default function UserPage() {

  const [restList,updateList] = useState([]);
  const context = useContext(navContext);
  const {logstate,setTitle} = context;
  const [searchedRestaurant,setSearchedRestaurant] = useState("");
  
  useEffect(()=>{
    GetAllUserRestaurants().then((response)=>{
      updateList(response.data);
      console.log(response.data);
    }).catch(error =>{
      console.error(error);
    })
    setTitle("none");
  },[setTitle])

  return (
    <div className="App">
      {/* <header className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Tomato.</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Mobile App</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact Us</a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fas fa-search"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fas fa-shopping-cart"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fas fa-user"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </header> */}
      <Navbar></Navbar>
      <main>
        <div className="container my-5" style={{width:"80%", height:"50%"}}>
          <section className="hero text-white py-5 ps-5" style={{ backgroundColor: '#ff6f3c' }}>
            <div className="row align-items-center">
              <div className="col-md-7 px-5">
                <h1>Order your favourite food here</h1>
                <p>Choose from a diverse variety of restaurants featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button className="btn btn-light">View Restaurants</button>
              </div>
              <div className="col-md-5">
                <img src={logo} alt="Delicious food" className="img-fluid rounded" style={{width:"80%"}}/>
              </div>
            </div>
          </section>
          <section className="explore-menu pt-5 text-center">
            <h2 style={{fontSize:"8vh",color:"GrayText"}}><u>Explore our restaurants</u></h2>
          </section>
          {/* <section className="top-dishes py-4">
            <h2 className="mb-4">Top restaurants near you</h2>
            <div className="row">
              <div className="col-md-3">
                <div className="card shadow-sm">
                  <img src={logo} className="card-img-top" alt="Greek Salad" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Greek salad</h5>
                    <p className="card-text">Food provides essential nutrients for overall health and well-being.</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span className="text-danger fs-5"><strong>$12</strong></span>
                    <button className="btn btn-primary" type="button"><b>View</b></button>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm">
                  <img src={logo} className="card-img-top" alt="Veg Salad" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Veg salad</h5>
                    <p className="card-text">Food provides essential nutrients for overall health and well-being.</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span className="text-danger fs-5"><strong>$18</strong></span>
                    <button className="btn btn-primary" type="button"><b>View</b></button>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm">
                  <img src={logo} className="card-img-top" alt="Clover Salad" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Clover Salad</h5>
                    <p className="card-text">Food provides essential nutrients for overall health and well-being.</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span className="text-danger fs-5"><strong>$16</strong></span>
                    <button className="btn btn-primary" type="button"><b>View</b></button>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card shadow-sm">
                  <img src={logo} className="card-img-top" alt="Chicken Salad" />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">Chicken Salad</h5>
                    <p className="card-text">Food provides essential nutrients for overall health and well-being.</p>
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span className="text-danger fs-5"><strong>$24</strong></span>
                    <button className="btn btn-primary" type="button"><b>View</b></button>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          
          {/* <section className="top-dishes py-4"></section> */}
          <div className='top-dishes row'>
            {
              restList.map(restaurants =>
                <div className="col-md-3 py-3" key={restaurants.rest_id}>
                  <div className="card shadow-sm">
                    <img src={logo} className="card-img-top" alt="..." />
                    <div className="card-body rounded">
                      <h5 className="card-title fw-bold">{restaurants.rest_name}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">{restaurants.location}</h6>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center bg-white">
                      {/* <span className="text-danger fs-5"><strong>$24</strong></span> */}
                      <span>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <span className="far fa-star text-warning star-custom"></span>
                        <i className="fas fa-star-half-alt text-warning"></i>
                        <i className="far fa-star text-warning"></i>
                      </span>
                      <Link to="/restaurant/view" state={{id:restaurants.rest_id, title:restaurants.rest_name,prev_loc:window.location.hash}} className="btn btn-primary" type="button"><b>View</b></Link>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>

      </main>
    </div>
  )
}
