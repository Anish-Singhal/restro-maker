import React,{useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import UserType from './UserType';
import { findDuplicateUser } from '../restaurant services/UserService';

export default function SignUp() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirm_pass,setConfirmPass] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [count,setCount] = useState(0);
  const [page,setPage] = useState(1);
  const [click,setClick] = useState(false);
  const [duplicate,setDuplicate] = useState(false);

  const navigate = useNavigate();

  function Check_duplicate(){
    if(username.length>=7){
      const user = username;
      findDuplicateUser(user).then((response)=>{
        if(response.data){
          setDuplicate(true);
        }
        else{
          setDuplicate(false);
        }
      })
    }
  }

  // Functions for handling input fields.
  const handleUsername = (event)=>{
    setUsername(event.target.value);
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value);
    if(click && confirm_pass.length===0){
      setClick(false);
    }
  }
  const handleConfirm = (event)=>{
    setConfirmPass(event.target.value);
    setClick(true);
  }

  const handlePhone = (event)=>{
    setPhone(event.target.value);
  }
  const handleEmail = (event)=>{
    setEmail(event.target.value);
  }

  // Functions to check the correct input format for each field and form validation.
  function Check_UserName(isvalid){
    if(username.length!==0 && username.length<8){
      isvalid=0;
    }
    Check_duplicate()
    return isvalid;
  }
  function Check_Password(isvalid){

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumeric = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if(password.length===0 || (password.length>7 && password.length<21 && hasLowercase && hasUppercase && hasNumeric && !hasSpecial)){
      isvalid=1;
    }
    else{
      isvalid=0;
    }
    return isvalid;
  }
  function Check_Confirm(isvalid){
    if(click){
      if(password!==confirm_pass){
        isvalid=0;
      }
    }
    return isvalid;
  }

  function Check_Phone(isvalid){
    const phone_num = /[^0-9]/.test(phone);
    if(phone.length!==0 && (phone.length!==10 || phone.charAt(0)==='0' || phone_num)){
      isvalid=0;
    }
    return isvalid;
  }
  function Check_Email(isvalid){
    const email_format = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    if(email.length!==0 && !email_format){
      isvalid=0;
    }
    return isvalid;
  }
  function Check_Length(isvalid){
    if(username.length===0 || password.length===0 || phone.length===0  || email.length===0){
      isvalid=0;
    }
    return isvalid;
  }
  function Check_Validation(){
    if(Check_UserName(1) && Check_Password(1) && Check_Confirm(1) && Check_Phone(1) && Check_Email(1) && Check_Length(1) && !duplicate){
      return 1;
    }
    return 0;
  }

  // Function to add the details of the user in the database.
  const CreateUser = (event)=>{
    setCount(count+1);
    // setPage(2);
    if(Check_Validation()){
      setPage(2);
    }
  }

   // Function for password eye icon to display or hide confirm password field.
  const [eye, setEye] = useState("eye-slash");
  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      setEye("eye");
    } else {
      passwordField.type = "password";
      setEye("eye-slash");
    }
  }

  // Function for password eye icon to display or hide confirm password field.
  const [eyeConfirm, setEyeConfirm] = useState("eye-slash");
  const toggleConfirmPasswordVisibility = () => {
    const confirmPasswordField = document.getElementById("confirm-password");
    if (confirmPasswordField.type === "password") {
      confirmPasswordField.type = "text";
      setEyeConfirm("eye");
    } else {
      confirmPasswordField.type = "password";
      setEyeConfirm("eye-slash");
    }
  }

  const GoToLogin = () =>{
    navigate("/login");
  }

  return (
    <div className='background'>
    {page===1 && <div className="card mx-auto bg-light" style={{width: 33+"vw", margin : '3vh 0'}}>

      {/* Back Button */}
      <div className='d-flex mt-1 mb-2'>
        <div className='bg-white rounded-circle mx-2 my-2'><i className="fa-solid fa-arrow-left px-2 py-2" onClick={GoToLogin}></i></div>
        <h5 style={{paddingTop:"2vh"}}>Back to Login Page</h5>
      </div>

      {/* Heading */}
      <h1 className='text-center'>Create Account</h1>

      <form className="card-body" autoComplete='off'>
        {/* Username */}
        <div className="form-floating mb-2">
          <input type="text" className={`form-control ${Check_UserName(1)===1?'':'is-invalid'} ${!duplicate?'':'is-invalid'}`} id="username" 
            placeholder="Full name" onChange={handleUsername} value={username}/>
          <label htmlFor="floatingInput">Username</label>
          {Check_UserName(1)===0 && <div id="passwordHelpBlock1" className="invalid-feedback px-2">
            Length should be greater than 8.
          </div>}
          {duplicate && <div id="passwordHelpBlock2" className="invalid-feedback px-2">
            This name is already used. Create another username.
          </div>}
        </div>

        {/* Password */}
        <div className="form-floating mb-2">
          <input type="password" className={`form-control ${Check_Password(1)===1?'':'is-invalid'}`} id="password" 
            placeholder="Password" onChange={handlePassword} value={password}/>
          <label htmlFor="floatingPassword">Create Password</label>
          <span className="toggle-password" style={{ position: "absolute", right: "2.5rem", top: "4.8vh", transform: "translateY(-50%)", cursor: "pointer", fontSize: "0.875rem", color: "#007bff" }} onClick={togglePasswordVisibility}><i className={`fa-solid fa-${eye}`} style={{color: "black"}}></i></span>
          {Check_Password && <div id="passwordHelpBlock" className="invalid-feedback px-2">
            Your password must be 8-20 characters long, contain letters and numbers only.<br/>
            It must contains at least one digit, one lowercase and one uppercase letter.
          </div>}
        </div>

        {/* Confirm Password */}
        <div className="form-floating mb-2">
          <input type="password" className={`form-control ${Check_Confirm(1)===1?'':'is-invalid'}`} id="confirm-password" 
            placeholder="ConfirmPassword" onChange={handleConfirm} value={confirm_pass}/>
          <label htmlFor="floatingPassword">Confirm Password</label>
          <span className="toggle-password" style={{ position: "absolute", right: "2.5rem", top: "4.8vh", transform: "translateY(-50%)", cursor: "pointer", fontSize: "0.875rem", color: "#007bff" }} onClick={toggleConfirmPasswordVisibility}><i className={`fa-solid fa-${eyeConfirm}`} style={{color: "black"}}></i></span>
          {click && <div id="passwordHelpBlock" className="invalid-feedback px-2">
            Should be same as above password.
          </div>}
        </div>

        {/* Phone Number */}
        <div className="form-floating mb-2">
          <input type='integer' className={`form-control ${Check_Phone(1)===1?'':'is-invalid'}`} id="phone" 
            placeholder="Phone Number" onChange={handlePhone} value={phone}/>
          <label htmlFor="floatingPassword">Phone Number</label>
          {Check_Phone && <div id="passwordHelpBlock" className="invalid-feedback px-2">
            Enter Valid phone number of 10 digit.
          </div>}
        </div>

        {/* Email */}
        <div className="form-floating mb-2">
          <input type="email" className={`form-control ${Check_Email(1)===1?'':'is-invalid'}`} id="email" 
            placeholder="name@example.com" onChange={handleEmail} value={email}/>
          <label htmlFor="floatingInput">Email address</label>
          {Check_Email && <div id="passwordHelpBlock" className="invalid-feedback px-2">
            Enter Valid Email.
          </div>}
        </div>

        {/* Next Button */}
        <div className="d-grid gap-2 col-6 mx-auto pt-3">
          <NavLink className="btn btn-primary fs-5" onClick={CreateUser}>Next</NavLink>
        </div>
        {count>0 && Check_Validation()===0 && <div id="passwordHelpBlock" className="text-danger my-2 text-center">
          All enteries must be filled and must be valid.
        </div>}
      </form>
    </div>}
    {page===2 && <UserType user={{username,password,phone,email}} page={page} setPage={setPage}/>}
    </div>
  )
}
