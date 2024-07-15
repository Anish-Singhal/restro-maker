import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function UserType() {

    const [name, setName] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [address,setAddress] = useState('');
    const [rest_name, setRestName] = useState('');
    const [location,setLocation] = useState('');
    const [type,setType] = useState('user');
    
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleOwnerId = (event) => {
        setOwnerId(event.target.value);
    }
    const handleRestName = (event) => {
        setRestName(event.target.value);
    }
    const handleLocation = (event) => {
        setLocation(event.target.value);
    }
    const handleAddress = (event)=>{
        setAddress(event.target.value);
    }

    function Check_OwnerId(isvalid) {
        if (ownerId.length !== 0 && ownerId.length < 8) {
            isvalid = 0;
        }
        return isvalid;
    }
    function Check_RestName(isvalid) {
        if (rest_name.length !== 0) {
            isvalid = 0;
        }
        return isvalid;
    }

    const UserButtonClick = () => {
        setType('user');
    }
    const OwnerButtonClick = () => {
        setType('owner');
    }

    const CreateUserType = (event) => {
        // event.preventDefault();
        // const user = { name, password};
        // CreateNewUser(user).then((response) => {
        //   navigate('/login');
        // })
        // console.log(name,password);
    }
    
    return (
        <div className='background'>
            <div className="card mx-3 my-5 bg-light shadow rounded">
                <h2 style={{ alignSelf: 'center', paddingTop: 2 + "vh" }}>Select Profile</h2>
                <form className="card-body" autoComplete='off'>
                    <div className="d-flex justify-content-around align-items-center pb-3">
                        <button type="button" class={`btn ${type==='user'?'btn-success':'btn-outline-secondary'} btn-lg`} onClick={UserButtonClick}>User</button>
                        <h4>Or</h4>
                        <button type="button" class={`btn ${type==='owner'?'btn-success':'btn-outline-secondary'} btn-lg`} onClick={OwnerButtonClick}>Owner</button>
                    </div>
                    
                    {/* Horizontal line*/}
                    <hr className='border-2'></hr>

                    {/* Owner form */}
                    <div className='d-flex row'>
                        <div className="mx-3" style={{width:"31vw"}}>
                            <div className='py-3 text-center h4 text-primary'>{type.charAt(0).toLocaleUpperCase()+type.slice(1)} Details</div>
                            <div class="form-floating mb-3">
                                <input type="text" className='form-control' id="floatingInput"
                                    placeholder="Name" onChange={handleName} />
                                <label htmlFor="floatingInput">Name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" className='form-control' id="floatingInput"
                                    placeholder="Address" onChange={handleAddress} />
                                <label htmlFor="floatingInput">Address </label>
                            </div>
                            <select class="form-select mb-3" aria-label="Default select example">
                                <option selected>Select Gender</option>
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="2">Other</option>
                            </select>
                            {type==='owner' && <div className='rounded border border-1'>
                                <select class="form-select border-0 border-bottom rounded-0 rounded-top mb-1" aria-label="Default select example">
                                    <option selected>Select Identity Proof</option>
                                    <option value="1">Aadhar Card</option>
                                    <option value="2">Pan Card</option>
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
                                        <input type="text" className={`form-control ${Check_RestName(1) === 1 ? '' : 'is-invalid'}`} id="exampleFormControlInput1" placeholder="Enter Name" onChange={handleRestName}/>
                                    </div>
                                </div>
                                <div className="card-body bg-white shadow-sm pb-1">
                                    <div>
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Location</label>
                                        <input type="text" className='form-control' id="exampleFormControlInput1" placeholder="Enter Location" onChange={handleLocation}/>
                                    </div>
                                </div>
                                <div className="card-body bg-white shadow-sm rounded-bottom">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Timings</label>
                                        <input type="text" className='form-control' id="exampleFormControlInput1" placeholder="Enter Timings" onChange={handleLocation}/>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div className="d-grid gap-2 col-4 mx-auto my-4">
                        <NavLink to="/login" className="btn btn-primary btn-lg" onClick={CreateUserType}>Submit</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}