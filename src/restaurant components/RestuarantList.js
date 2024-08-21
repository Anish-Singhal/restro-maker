import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import { AddRestaurant, GetAllOwnerRestaurants, RemoveRestaurant } from '../restaurant services/UserService';
import logo from "./Card-2.png"
import navContext from './Context/navContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function RestaurantPage(props) {

  const [restList,updateList] = useState([]);
  const [showpage,setShowpage] = useState(false);
  const navigate = useNavigate();
  const [searchedRestaurant,setSearchedRestaurant] = useState("");
  const [response,setResponse] = useState(false);
  const [image,setImage] = useState({
    url:logo,
    file:null
  });

  const context = useContext(navContext);
  const {setTitle} = context;
  
  useEffect(()=>{
    GetAllOwnerRestaurants().then((response)=>{
      updateList(response.data);
      setResponse(true);
    }).catch(error =>{
      // console.log(error);
      if(error.code!=="ERR_NETWORK"){
        if(error.response.status===400 || error.response.status===401){
          navigate("/login");
        }
        else if(error.response.status===403){
          navigate("/")
        }
      }
    })
    setTimeout(()=>{
      setShowpage(true);
    })
    setTitle("restaurant")
  },[navigate,setTitle])

  const [rest_name, setRestName] = useState('');
  const [location,setLocation] = useState('');
  const [restfoodType,setFoodType] = useState(0);
  const [emptyRestName,setEmptyRestName] = useState(0);
  const [emptyLocation,setEmptyLocation] = useState(0);
  const [emptyFoodType,setEmptyFoodType] = useState(0);
  

  const handleRestName = (event) => {
    setRestName(event.target.value);
    setEmptyRestName(0);
  }
  const handleLocation = (event) => {
    setLocation(event.target.value);
    setEmptyLocation(0);
  }
  const handleRestImage = (event) => {
    if(event.target.files[0].type==="image/png" || event.target.files[0].type==="image/jpeg"){
      const reader = new FileReader();
      reader.onload = (r) => {
        setImage({
          url:r.target.result,
          file:event.target.files[0]
        })
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    else{
      toast.error("Invalid File!! Upload .jpg or .png file only.",{
        pauseOnHover: false,
      })
      setImage({
        url:null,
        file:null
      })
    }
  }

  const CreateNewRestaurant = (event) => {
    event.preventDefault();
    const foodtype = document.getElementById("foodType").value;
    const rest_details ={rest_name,location,foodtype}
    if(rest_name.length===0){
        setEmptyRestName(1);
    }
    if(location.length===0){
        setEmptyLocation(1);
    }
    if(foodtype==="0"){
        setEmptyFoodType(1);
    }
    if(checkValidation()){
      console.log(rest_details);
      AddRestaurant(rest_details).then((response)=>{
        updateList(response.data);
      }).catch(error =>{
        console.error(error);
      })
      ClearForm();
    }
  }

  const ClearForm = () => {
    setEmptyRestName(0);
    setEmptyLocation(0);
    setEmptyFoodType(0);
    setRestName('');
    setLocation('');
    setFoodType(0);
    document.getElementById("exampleFormControlInput1").value="";
    document.getElementById("exampleFormControlInput2").value="";
    document.getElementById("foodType").value="0";
  }

  const checkValidation = () => {
    // let foodType = document.getElementById("foodType").value;
    if(rest_name.length!==0 && location.length!==0 && restfoodType!==0){
      return true;
    }
    return false;
  }

  const CheckFood = () => {
    let foodType = document.getElementById("foodType").value;
    if(foodType!=="0"){
        setEmptyFoodType(0);
        setFoodType(foodType);
    }
  }

  // In your component function
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [showSelectMessage, setShowSelectMessage] = useState(false);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
    setShowSelectMessage(!showCheckboxes);
    setShowConfirmMessage(false);
    setSelectedRestaurants([]);
  };

  const handleSelectRestaurant = (id) => {
    setSelectedRestaurants((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((restaurantId) => restaurantId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemoveRestaurants = () => {
    if (selectedRestaurants.length === 0) {
      alert("Please select at least one restaurant to remove.");
      return;
    }
    setShowSelectMessage(false);
    setShowConfirmMessage(true);
  };

  const cancelRemoveRestaurants = () => {
    console.log("Removing restaurants with IDs:", selectedRestaurants);
    setShowCheckboxes(false);
    setShowConfirmMessage(false);
    setSelectedRestaurants([]);
    setShowSelectMessage(false);
  };

  const confirmRemoveRestaurants = () => {
    // Logic to remove the selected restaurants
    // console.log("Removing restaurants with IDs:", selectedRestaurants);
    const restaurantIds = selectedRestaurants;
    RemoveRestaurant({restaurantIds}).then((response)=>{
      updateList(response.data);
    }).catch(error =>{
      console.error(error);
    })
    // Reset state
    setShowCheckboxes(false);
    setShowConfirmMessage(false);
    setSelectedRestaurants([]);
  };
  const confirmNotRemoveRestaurants = () => {
    // console.log("Removing restaurants with IDs:", selectedRestaurants);
    setShowCheckboxes(false);
    setShowConfirmMessage(false);
    setSelectedRestaurants([]);
  };

  return (
    <div className='rest_background pt-1 pb-5'>
      <Navbar searchedRestaurant={searchedRestaurant} setSearchedRestaurant={setSearchedRestaurant}/>
      <center>
        <h1 className="text-decoration-underline" style={{margin:10+"vh",color:"#ffe28e",fontSize:"10vh",textShadow:"-1px -1px 0 black, 1px -1px 0 black, 1px 1px 0 black,1px 1px 0 black"}}>
          Your Restaurant List
        </h1>
      </center>
      {response && <div className='d-flex flex-row flex-wrap' style={{margin:2+"vw"}}>
        {
          restList.map(restaurants =>
            (searchedRestaurant==="" || restaurants.rest_name===searchedRestaurant) &&
            <div className="col-3" key={restaurants.rest_id}>
              <div className="card" style={{margin:2+"vw"}}>
                {showCheckboxes && (
                  <input
                    type="checkbox"
                    className="form-check-input"
                    style={{ position: "absolute", top: 10, left: 10, width: "4vh", height: "4vh" }}
                    checked={selectedRestaurants.includes(restaurants.rest_id)}
                    onChange={() => handleSelectRestaurant(restaurants.rest_id)}
                  />
                )}
                <img src={logo} className="card-img-top" alt="..." />
                <div className="card-body rounded">
                  <h5 className="card-title">{restaurants.rest_name}</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">{restaurants.location}</h6>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <div className='card-footer d-flex justify-content-around py-3'>
                  <NavLink to={`/restaurant/view`} state={{id:restaurants.rest_id, title:restaurants.rest_name,prev_loc:window.location.hash}} className="card-link"><button className="btn btn-secondary px-4" type="button"><b>View</b></button></NavLink>
                  <NavLink to={`/restaurant/menu`} state={{id:restaurants.rest_id, title:restaurants.rest_name}} className="card-link"><button className="btn btn-primary px-4" type="button"><b>Edit</b></button></NavLink>
                </div>
              </div>
            </div>
          )
        }
      {restList.length===0 && 
        (<div className='bg-light py-4 container'>
            <div className='fs-1 text-center text-danger fw-bold'>No Items Available</div>
            <p className="fs-1 text-center">Add Restaurants in your restaurant list to show here.</p>
        </div>)}
      </div>}
      {!response && <div className="d-flex justify-content-center bg-body-secondary mx-5 my-5 py-5 opacity-25">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}

      {showSelectMessage && (
        <div className="alert alert-info text-center fs-4" role="alert" style={{width:"90%", margin: "5vh auto"}}>
          Select the restaurants you want to remove
          <b><span className='px-5 mx-3 text-warning fs-3'>OR</span></b>
          <button className="btn btn-secondary mx-3 fs-5" onClick={cancelRemoveRestaurants}>Cancel Removal</button>
        </div>
      )}
      {showConfirmMessage && (
        <div className="alert alert-warning text-center fs-4" role="alert" style={{width:"90%", margin: "5vh auto"}}>
          Are you sure you want to remove the selected restaurants?
          <button className="btn btn-danger mx-3 fs-5" onClick={confirmRemoveRestaurants}>Yes, Remove</button>
          <button className="btn btn-primary mx-3 fs-5" onClick={confirmNotRemoveRestaurants}>No, Keep them</button>
        </div>
      )}


      <div className='d-flex flex-row flex-wrap justify-content-center py-5 mx-5 bg-dark'>
        {/* Add Restaurant Button */}
        <button className="btn btn-primary mx-5 px-5 fs-5"  data-bs-toggle="modal" data-bs-target="#exampleModal" type="button">Add Restaurant</button>

        {/* Add New Restaurant Form */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-3 mx-auto" id="exampleModalLabel" style={{paddingLeft:"2vw"}}>Create new Restaurant</h1>
                <button type="button" className="btn-close mx-0" data-bs-dismiss="modal" aria-label="Close" onClick={ClearForm}></button>
              </div>

              {/* Modal Body containing restaurant form */}
              <div className="modal-body">
                {/* Restaurant form */}
                <div className="mx-3" style={{width:"33vw"}}>
                    <div className='py-3 text-center h5 text-secondary'>Enter Restaurant Details (required)</div>
                    <div className='card mb-4 rounded'>
                        <div className="card-body bg-white shadow-sm rounded-top pb-1">
                            <div className='d-flex flex-column justify-content-center'>
                                <img src={image.url} alt="Invalid file/url uploaded" width="300" className='mt-3 rounded mx-auto d-block text-center px-5'/>
                                {image.file===null ? (<label htmlFor="exampleFormControlInput" className="form-label text-center my-3 fw-bold fs-5">Default Restaurant Image</label>
                                ):(
                                  <label htmlFor="exampleFormControlInput" className="form-label text-center my-3 fw-bold fs-5">Uploaded Restaurant Image</label>
                                )}
                                <input type="file" className={`form-control`} id="exampleFormControlInput" onChange={handleRestImage} autoComplete='off'/>
                                <ToastContainer style={{fontSize:"3vh" ,width:"20vw"}}></ToastContainer>
                            </div>
                        </div>
                        <div className="card-body bg-white shadow-sm rounded-top pb-1">
                            <div>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Restaurant Name</label>
                                <input type="text" className={`form-control ${emptyRestName===1?'is-invalid':''}`} id="exampleFormControlInput1" placeholder="Enter Name" onChange={handleRestName} autoComplete='off'/>
                                {emptyRestName===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                    *Required
                                </div>}
                            </div>
                        </div>
                        <div className="card-body bg-white shadow-sm pb-1">
                            <div>
                                <label htmlFor="exampleFormControlInput2" className="form-label">Location</label>
                                <input type="text" className={`form-control ${emptyLocation===1?'is-invalid':''}`} id="exampleFormControlInput2" placeholder="Enter Location" onChange={handleLocation} autoComplete='off'/>
                                {emptyLocation===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                    *Required
                                </div>}
                            </div>
                        </div>
                        <div className="card-body bg-white shadow-sm rounded-bottom">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput3" className="form-label">Food Type</label>
                                <select defaultValue={'0'} className={`form-select mb-3 ${emptyFoodType===1?'is-invalid':''}`}  onChange={CheckFood} aria-label="Default select example" id="foodType">
                                    <option value="0" disabled>Select Type</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                    <option value="Both">Both</option>
                                </select>
                                {emptyFoodType===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                    *Required
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ClearForm}>Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss={`${checkValidation()?"modal":""}`} onClick={CreateNewRestaurant}>Create</button>
              </div>
            </div>
          </div>
        </div>

        {/* Remove Restaurant Button */}
        <button className={`btn ${showCheckboxes ? "btn-warning" : "btn-danger"} mx-3 fs-5 ${showConfirmMessage? "disabled":""}`} type="button" onClick={showCheckboxes ? handleRemoveRestaurants : toggleCheckboxes} disabled={restList.length===0?true:false}>
          {showCheckboxes ? "Confirm Removal" : "Remove Restaurant"}
        </button>
      </div>
    </div>
  )
}
