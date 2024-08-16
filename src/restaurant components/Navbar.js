import React, { useState,useContext,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SuggestAllRestaurants } from '../restaurant services/UserService';
import navContext from './Context/navContext'

export default function Navbar(props) {

  const context = useContext(navContext);
  const {logstate,changeState,title,setTitle} = context;
  const navigate = useNavigate();

  const [restaurantList,UpdateRestaurantList] = useState([]);
  const [selected,setSelected] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      changeState(1);
    }
  },[changeState])

  const HandleClick = (event) => {
    let id = event.target.id;
    setTitle(id)
  }

  const GetSuggestions = () =>{
    setSelected(false);
    if(document.getElementById("Search-box").value===""){
      props.setSearchedRestaurant("");
    }
    let name = document.getElementById("Search-box").value;
    if(name!==""){
      SuggestAllRestaurants(name).then((response)=>{
        UpdateRestaurantList(response.data);
      }).catch(error =>{
        console.error(error);
        UpdateRestaurantList([]);
      })
    }
    else{
      UpdateRestaurantList([]);
    }
  }

  const logout = ()=>{
    localStorage.removeItem("token")
    window.location.pathname="/";
    setTimeout(()=>{changeState(0)},300);
  }

  const HandleSearch = () =>{
    if(selected){
      props.setSearchedRestaurant(document.getElementById("Search-box").value);
    }
  }

  const GoToCart = () => {
    navigate("/order");
  }

  return (
    <div>
      <nav className={`ps-3 mt-5 navbar-len mx-auto navbar navbar-expand-lg bg-body-tertiary rounded border border-success ${(window.location.pathname.includes("order"))?"text-bg-dark":"bg-warning-subtle"}`} data-bs-theme={`${(window.location.pathname.includes("menu") || window.location.pathname.includes("order") || window.location.pathname.includes("userpage"))?"dark":""}`} style={{boxShadow:"10px 10px 15px rgba(0, 0, 0, 0.5)"}}>
        <div className="container-fluid" style={{fontSize:"3vh"}}>
            <NavLink className="navbar-brand" to="/">Restro-Maker</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink id="home" className={`nav-link ${title==="home"?'border-secondary border-bottom border-2':''}`} to="/" onClick={HandleClick}>Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink id="about" className={`nav-link ${title==="about"?'border-secondary border-bottom border-2':''}`}  to="/about" onClick={HandleClick}>About</NavLink>
                </li>
                <li className="nav-item">
                <NavLink id="restaurant" className={`nav-link ${title==="restaurant"?'border-secondary border-bottom border-2':''}`}  to="/restaurant" onClick={HandleClick}>Restaurants</NavLink>
                </li>
                <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Features
                </NavLink>
                <ul className="dropdown-menu">
                    {logstate===1 && <li><NavLink className="dropdown-item" to="/restaurant">Restaurants</NavLink></li>}
                    {logstate===1 && <li><NavLink className="dropdown-item" to="/orderpage">Order page</NavLink></li>}
                    {logstate===0 && <li><NavLink className="dropdown-item" to="/signup">Sign Up Page</NavLink></li>}
                    {logstate===0 && <li><NavLink className="dropdown-item" to="/login">Login here</NavLink></li>}
                </ul>
                </li>
            </ul>
            {/* {logstate===1 && } */}
            {logstate===1 && <div className="d-flex dropdown">
              <i className={`fa-solid fa-cart-shopping my-auto p-2 rounded-3 ${(window.location.pathname==="/orderpage" || window.location.pathname==="/order")?"text-white fs-3":""}`} style={{backgroundColor:"rgb(43,48,53,1)",color:"bisque",cursor:"pointer",fontSize:"3.8vh"}} onClick={GoToCart}></i>
                <span role="button" data-bs-toggle="dropdown" aria-expanded="false" className='mx-3 px-3 my-auto fa-2xl'><i className="fa-solid fa-circle-user"></i></span>
                <ul className="dropdown-menu">
                    <li><NavLink className="dropdown-item" to="/profile">Edit Profile &nbsp;&nbsp;<i className="fa-solid fa-pen"></i> </NavLink></li>
                    <li><NavLink className="dropdown-item" to="/login">View Profile </NavLink></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li className="dropdown-item " onClick={logout} style={{cursor:"pointer"}}>Log Out &nbsp;&nbsp;<i className="fa-solid fa-arrow-right-from-bracket"></i></li>
                </ul>
            </div>}
            {logstate===0 && <NavLink to="/login"><button className="btn btn-outline-primary" type="submit">Login / Sign-Up</button></NavLink>}
            {logstate===1 && (window.location.pathname==="/restaurant" || window.location.pathname==="/orderpage") && <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="Search-box" onChange={GetSuggestions}  autoComplete='off'/>
                <button className="btn btn-outline-success" type="button" onClick={HandleSearch}>Search</button>
                <div id="Search-options" className = {`d-flex flex-column position-absolute bg-white rounded mx-1 my-5 px-2 shadow overflow-y-scroll `} style={{width:"15vw", maxHeight:"24vh"}}>
                  {
                  restaurantList.map(restaurants =>
                    <DivItem key={restaurants.rest_id} value={restaurants} UpdateRestaurantList={UpdateRestaurantList} setSelected={setSelected}></DivItem>)
                  }
                </div>
            </form>}
            </div>
        </div>
        </nav>
    </div>
  )
}

function DivItem(props){
  const SelectRestaurant = () =>{
    document.getElementById("Search-box").value=document.getElementById(props.value.rest_id).innerHTML;
    props.setSelected(true);
    props.UpdateRestaurantList([]);
  }
  const changeColorIn = () =>{
    document.getElementById(props.value.rest_id).style.color="red";
  }
  const changeColorOut = () =>{
    document.getElementById(props.value.rest_id).style.color="black";
  }

  return <div className="py-1 mx-1" id={`${props.value.rest_id}`} onClick={SelectRestaurant} onMouseOver={changeColorIn} onMouseOut={changeColorOut} style={{cursor:"pointer"}}>{props.value.rest_name}</div>
}
