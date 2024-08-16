import React, { useState } from 'react'
import { CreateNewUser } from '../restaurant services/UserService';
import { NavLink,useNavigate } from 'react-router-dom';

export default function UserType(props) {

    const [name, setName] = useState('');
    const [address,setAddress] = useState('');
    const [type,setType] = useState('user');
    const [ownerId, setOwnerId] = useState('');
    const [rest_name, setRestName] = useState('');
    const [location,setLocation] = useState('');
    const [emptyName,setEmptyName] = useState(0);
    const [emptyAddress,setEmptyAddress] = useState(0);
    const [emptyRestName,setEmptyRestName] = useState(0);
    const [emptyLocation,setEmptyLocation] = useState(0);
    const [emptyFoodType,setFoodType] = useState(0);

    const navigate = useNavigate(); 

    const handleName = (event) => {
        setName(event.target.value);
        setEmptyName(0);
    }
    const handleAddress = (event)=>{
        setAddress(event.target.value);
        setEmptyAddress(0);
    }
    const handleOwnerId = (event) => {
        setOwnerId(event.target.value);
    }
    const handleRestName = (event) => {
        setRestName(event.target.value);
        setEmptyRestName(0);
    }
    const handleLocation = (event) => {
        setLocation(event.target.value);
        setEmptyLocation(0);
    }

    const UserButtonClick = () => {
        setType('user');
        setEmptyName(0);
        setEmptyAddress(0);
        setEmptyRestName(0);
        setEmptyLocation(0);
    }
    const OwnerButtonClick = () => {
        setType('owner');
        setEmptyName(0);
        setEmptyAddress(0);
    }

    const CreateUserType = async (event) => {
        event.preventDefault();
        const username = props.user.username;
        const password = props.user.password;
        const phone = props.user.phone;
        const email = props.user.email;
        const gender = document.getElementById("gender").value;
        let foodType = "0";
        if(type==="owner"){
            foodType = document.getElementById("foodType").value;
        }
        const user_details = {username,password,phone,email,name,address,type,gender,ownerId}
        const restaurants =[{rest_name,location,foodType}]
        const owner_details = {username,password,phone,email,name,address,type,gender,ownerId,restaurants}
        console.log(user_details);
        console.log(owner_details);

        if(name.length===0){
            setEmptyName(1);
        }
        if(address.length===0){
            setEmptyAddress(1);
        }
        if(type==="owner"){
            if(rest_name.length===0){
                setEmptyRestName(1);
            }
            if(location.length===0){
                setEmptyLocation(1);
            }
            if(foodType==="0"){
                setFoodType(1);
            }
        }
        if(type==="user" && name.length!==0 && address.length!==0){
            CreateNewUser(user_details).then((response)=>{
                navigate('/login');
            })
        }
        else if(type==="owner" && name.length!==0 && address.length!==0 && rest_name.length!==0 && location.length!==0 && foodType!=="0"){
            CreateNewUser(owner_details).then((response)=>{
                navigate('/login');
            })
        }
    }

    const CheckFood = () => {
        let foodType = document.getElementById("foodType").value;
        if(foodType!=="0"){
            setFoodType(0);
        }
    }
    const GoToPrevious = () =>{
        props.setPage(1);
    }
    
    return (
        <div className='background'>
            <div className="card mx-3 my-3 bg-light shadow rounded">
                {/* Back Button */}
                <div className='d-flex mt-1'>
                    <div className='bg-white rounded-circle mx-2 my-2'><i className="fa-solid fa-arrow-left px-2 py-2" onClick={GoToPrevious}></i></div>
                    <h5 style={{paddingTop:"2vh"}}>Back to Previous Page</h5>
                </div>

                {/* Heading */}
                <h2 style={{ alignSelf: 'center', paddingTop: 3 + "vh"}}>Select Profile</h2>
                
                <form className="card-body" autoComplete='off'>
                    <div className="d-flex justify-content-around align-items-center pb-3">
                        <button type="button" className={`btn ${type==='user'?'btn-success':'btn-outline-secondary'} btn-lg`} onClick={UserButtonClick}>User</button>
                        <h4>Or</h4>
                        <button type="button" className={`btn ${type==='owner'?'btn-success':'btn-outline-secondary'} btn-lg`} onClick={OwnerButtonClick}>Owner</button>
                    </div>
                    
                    {/* Horizontal line*/}
                    <hr className='border-2'></hr>

                    {/* Owner form */}
                    <div className='d-flex row'>
                        <div className="mx-3" style={{width:"31vw"}}>
                            <div className='py-3 text-center h4 text-primary'>{type.charAt(0).toLocaleUpperCase()+type.slice(1)} Details</div>
                            <div className="form-floating mb-3">
                                <input type="text" className={`form-control ${emptyName===1?'is-invalid':''}`} id="floatingInput"
                                    placeholder="Name" onChange={handleName} />
                                <label htmlFor="floatingInput">Name</label>
                                {emptyName===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                    *Required
                                </div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className={`form-control ${emptyAddress===1?'is-invalid':''}`} id="floatingInput"
                                    placeholder="Address" onChange={handleAddress} />
                                <label htmlFor="floatingInput">Address </label>
                                {emptyAddress===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                    *Required
                                </div>}
                            </div>
                            <select defaultValue={'0'} className="form-select mb-3" aria-label="Default select example" id="gender">
                                <option value="0" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Other</option>
                            </select>
                            {type==='owner' && <div className='rounded border border-1'>
                                <select className="form-select border-0 border-bottom rounded-0 rounded-top mb-1" aria-label="Default select example">
                                    <option selected>Select Identity Proof</option>
                                    <option value="Aadhar">Aadhar Card</option>
                                    <option value="Pan">Pan Card</option>
                                </select>
                                <div className="form-floating">
                                    <input type="text" className="form-control border-0 border-top rounded-0 rounded-bottom" id="floatingInput" placeholder="Full name" onChange={handleOwnerId} />
                                    <label htmlFor="floatingInput">Identity Proof Number</label>
                                </div>
                            </div>}
                        </div>

                        {/* Restaurant form */}
                        {type==='owner' && <div className="mx-3" style={{width:"33vw"}}>
                            <div className='py-3 text-center h4 text-primary'>Enter Restaurant Details (required)</div>
                            <div className='card mb-4 rounded'>
                                <div className="card-body bg-white shadow-sm rounded-top pb-1">
                                    <div>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Restaurant Name</label>
                                        <input type="text" className={`form-control ${emptyRestName===1?'is-invalid':''}`} id="exampleFormControlInput1" placeholder="Enter Name" onChange={handleRestName}/>
                                        {emptyRestName===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                            *Required
                                        </div>}
                                    </div>
                                </div>
                                <div className="card-body bg-white shadow-sm pb-1">
                                    <div>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Location</label>
                                        <input type="text" className={`form-control ${emptyLocation===1?'is-invalid':''}`} id="exampleFormControlInput1" placeholder="Enter Location" onChange={handleLocation}/>
                                        {emptyLocation===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                            *Required
                                        </div>}
                                    </div>
                                </div>
                                <div className="card-body bg-white shadow-sm rounded-bottom">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Food Type</label>
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
                        </div>}
                    </div>

                    <div className="d-grid gap-2 col-4 mx-auto my-4">
                        <NavLink className="btn btn-primary btn-lg" onClick={CreateUserType}>Submit</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}