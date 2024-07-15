import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar'
import { GetAllRestaurants } from '../restaurant services/UserService';
import logo from "./Card-2.png"

export default function RestaurantPage() {

  const [restList,updateList] = useState([]);
  
  useEffect(()=>{
    GetAllRestaurants().then((response)=>{
      updateList(response.data);
    }).catch(error =>{
      console.error(error);
    })
  },[])

  return (
    <div className='rest_background'>
      <Navbar/>
      <center><h1 style={{margin:10+"vh"}}>Your Restaurant List</h1></center>
      <div className='container row' style={{display:"flex",flexDirection:"horizontal",margin:2+"vw",flexWrap:"wrap"}}>
        {
          restList.map(restaurants =>
            <div className="col-3">
              <div className="card" key={restaurants.id} style={{width: 15+"rem", margin:2+"vw"}}>
              <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{restaurants.name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">{restaurants.location}</h6>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <NavLink to="/" className="card-link">View Details</NavLink>
                  <NavLink to={`/edit`} className="card-link">Edit Details</NavLink>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div>
        <button className="btn btn-primary mx-5 px-5" type="submit">Add Restaurant</button>
        <button className="btn btn-primary mx-3" type="submit">Remove Restaurant</button>
      </div>
    </div>
  )
}
