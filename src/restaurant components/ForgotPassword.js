import React, {useState} from "react";
import Alert from "./Alert";
import { ChangePassword,NewPassword } from "../restaurant services/UserService";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(props) {

  const [isValid, setIsValid] = useState(false);
  const [username,setUsername] = useState('');
  const [phone,setPhone] = useState('');
  const [emptyName,setEmptyName] =useState(0);
  const [emptyPhone,setEmptyPhone] =useState(0);
  const [new_password,setNewPassword] = useState('');
  const [confirm_pass,setConfirmPass] = useState('');

  const navigate = useNavigate();

  // To show alert message on entering wrong inputs.
  const [alert,setAlert] = useState(null);
  const showAlert = ()=>{
    setAlert(true);
    setTimeout(()=>{
      setAlert(null);
    },2300);
  }

  // Function for password eye icon to display or hide password.
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

  // Function to chech the credentails of the user.
  const checkValidation = (event) => {
    event.preventDefault();
    if(username.length===0){
      setEmptyName(1);
    }
    if(phone.length===0){
      setEmptyPhone(1);
    }
    if(username.length!==0 && phone.length!==0){
      let user_change_pass={username,phone}
      ChangePassword(user_change_pass).then((response)=>{
        setIsValid(true);
      }).catch(error=>{
        setIsValid(false);
        if(!isValid){
          showAlert();
        }
      })
    }
  }

  // Functions to check the correct input format for each field.
  function Check_Password(isvalid){
    const hasUppercase = /[A-Z]/.test(new_password);
    const hasLowercase = /[a-z]/.test(new_password);
    const hasNumeric = /\d/.test(new_password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(new_password);
    if(new_password.length===0 || (new_password.length>7 && new_password.length<21 && hasLowercase && hasUppercase && hasNumeric && !hasSpecial)){
      isvalid=1;
    }
    else{
      isvalid=0;
    }
    return isvalid;
  }
  function Check_Confirm(isvalid){
    if(new_password!==confirm_pass){
      isvalid=0;
    }
    return isvalid;
  }

  // Functions for handling input fields.
  const handleUsername = (event)=>{
    setUsername(event.target.value);
    setEmptyName(0);
  }
  const handlePhone = (event)=>{
    setPhone(event.target.value);
    setEmptyPhone(0);
  }
  const handleNewPassword = (event)=>{
    setNewPassword(event.target.value);
  }
  const handleConfirm = (event)=>{
    setConfirmPass(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    let password = new_password;
    let new_pass={username,password}
    NewPassword(new_pass).then((response)=>{
      console.log(response.data);
      navigate("/login");
    })
  };

  const GoToLogin = () =>{
    navigate("/login");
  }

  return (
    <div className="background text-center">
      <form className="container my-5 rounded" style={{ backgroundColor: "antiquewhite", borderRadius: "1rem", width: "28vw", padding: "4vh", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
        
        {/* Back Button */}
        <div className='d-flex mb-3'>
          <div className='bg-white rounded-circle'><i className="fa-solid fa-arrow-left" onClick={GoToLogin} style={{padding:"0.7vw 1.8vh"}}></i></div>
          <h5 style={{paddingTop:"0.5vh",marginLeft:"1vw"}}>Back to Login Page</h5>
        </div>

        {/* Heading */}
        <h1 className="mb-4" style={{ margin: "0.5rem 1rem", fontSize: "1.8rem" }}>{isValid?"Create New Password":"Login Details"}</h1>

        {/* Username */}
        <div className="form-floating mb-3">
          <input style={{ width: "90%", margin: "0 auto" }} disabled={isValid} type="text" className={`form-control rounded-2 ${emptyName===1?'is-invalid':''}`} id="username" placeholder="Enter your username"  onChange={handleUsername} autoComplete="off"/>
          <label style={{ margin: "0 5%" }} htmlFor="username">Username</label>
          {emptyName===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-4 fs-6">
            *Required
          </div>}
        </div>

        {/* Phone Number */}
        <div className="form-floating mb-3">
          <input style={{ width: "90%", margin: "0 auto" }} disabled={isValid} type="text" className={`form-control rounded-2 ${emptyPhone===1?'is-invalid':''}`} id="phone-number" placeholder="Enter your phone number"  onChange={handlePhone} autoComplete="off"/>
          <label style={{ margin: "0 5%" }} htmlFor="Password">Phone number</label>
          {emptyPhone===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-4 fs-6">
            *Required
          </div>}
        </div>

        {/* Reset Password Button */}
        {!isValid && <button type="submit" className="btn btn-primary my-2 mx-auto w-50 fs-6" disabled={alert} onClick={checkValidation}>Reset Password</button>}
        <Alert alert={alert}/>

        {/* Password */}
        {isValid && <div className="form-floating mb-3">
          <input style={{ width: "90%", margin: "0 auto"}} type="password" className={`form-control ${Check_Password(1)===1?'':'is-invalid'}`} id="password" placeholder="Enter new password" onChange={handleNewPassword} autoComplete="off"/>
          <label style={{ margin: "0 5%" }} htmlFor="New-password">Enter New Password</label>
          <span className="toggle-password" style={{ position: "absolute", right: "3rem", top: "4.8vh", transform: "translateY(-50%)", cursor: "pointer", fontSize: "0.875rem", color: "#007bff" }} onClick={togglePasswordVisibility}><i className={`fa-solid fa-${eye}`} style={{color: "black"}}></i></span>
          {Check_Password && <div id="passwordHelpBlock" className="invalid-feedback  w-auto text-start mx-3 px-2 fs-6">
            Your password must be 8-20 characters long, contain letters and numbers only. It must have at least one digit, one lowercase and one uppercase letter.
          </div>}
        </div>}

        {/* Confirm Password */}
        {isValid && <div className="form-floating mb-3">
          <input style={{ width: "90%", margin: "0 auto"}} type="password" className={`form-control ${Check_Confirm(1)===1?'':'is-invalid'}`} id="confirm-password" placeholder="Confirm your password" onChange={handleConfirm} autoComplete="off"/>
          <label style={{ margin: "0 5%" }} htmlFor="confirm-password">Confirm Password</label>
          <span className="toggle-password" style={{ position: "absolute", right: "3rem", top: "4.8vh", transform: "translateY(-50%)", cursor: "pointer", fontSize: "0.875rem", color: "#007bff" }} onClick={toggleConfirmPasswordVisibility}><i className={`fa-solid fa-${eyeConfirm}`} style={{color: "black"}}></i></span>
          {Check_Confirm && <div id="passwordHelpBlock" className="invalid-feedback text-start mx-3 px-2 fs-6">
            Should be same as above password.
          </div>}
        </div>}

        {/* Submit Button */}
        {isValid && <button type="submit" className="btn btn-primary my-2 fs-5" style={{ width: "90%", margin: "0 auto" }} onClick={handleSubmit}>Submit</button>}
      </form>
    </div>
  );
}


