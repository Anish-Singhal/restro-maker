import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar'
import { GetAllRestaurants } from '../restaurant services/UserService';

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
        <div style={{display:"flex",flexDirection:"horizontal",margin:2+"vw","flex-wrap":"wrap"}}>
        {
          restList.map(restaurants =>
            <div className="card" style={{width: 16+"rem",margin:2+"vw"}}>
            <div className="card-body">
              <h5 className="card-title">{restaurants.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{restaurants.location}</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <NavLink to="/" className="card-link">View Details</NavLink>
              <NavLink to="/" className="card-link">Edit Details</NavLink>
            </div>
            </div>
          )
        }
        </div>
    </div>
  )
}
