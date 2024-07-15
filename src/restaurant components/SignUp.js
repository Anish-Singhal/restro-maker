import React,{useState} from 'react'
import { CreateNewUser } from '../restaurant services/UserService';
import { NavLink,useNavigate } from 'react-router-dom';

export default function SignUp() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirm_pass,setConfirmPass] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [count,setCount] = useState(0);

  const navigate = useNavigate(); 

  // Functions for handling input fields.
  const handleUsername = (event)=>{
    setUsername(event.target.value);
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value);
  }
  const handleConfirm = (event)=>{
    setConfirmPass(event.target.value);
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
    if(password!==confirm_pass){
      isvalid=0;
    }
    return isvalid;
  }
  function Check_Phone(isvalid){
    if(phone.length!==0 && phone.length!==10){
      isvalid=0;
    }
    return isvalid;
  }
  function Check_Email(isvalid){
    if(email.length!==0 && email.indexOf('@')===-1){
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
    if(Check_UserName(1) && Check_Password(1) && Check_Confirm(1) && Check_Phone(1) && Check_Email(1) && Check_Length(1)){
      return 1;
    }
    return 0;
  }

  // Function to add the details of the user in the database.
  const CreateUser = (event)=>{
    setCount(count+1);
    if(Check_Validation()){
      console.log("Hello");
      event.preventDefault();
      const user = {username,password,phone,email};
      CreateNewUser(user).then((response)=>{
        navigate('/userType');
      })
    }
  }

  return (
    <div className='background'>
    <div className="card mx-auto" style={{width: 33+"vw", margin : '3vh 0'}}>
      <h1 className='text-center pt-2'>Create Account</h1>
      <form className="card-body" autoComplete='off'>
        <div className="form-floating mb-2">
          <input type="text" className={`form-control ${Check_UserName(1)===1?'':'is-invalid'}`} id="floatingInput" 
            placeholder="Full name" onChange={handleUsername}/>
          <label htmlFor="floatingInput">Username</label>
          {Check_UserName && <div id="passwordHelpBlock" className="invalid-feedback">
            Length should be greater than 8.
          </div>}
        </div>
        <div className="form-floating mb-2">
          <input type="text" className={`form-control ${Check_Password(1)===1?'':'is-invalid'}`} id="floatingPassword" 
            placeholder="Password" onChange={handlePassword}/>
          <label htmlFor="floatingPassword">Create Password</label>
          {Check_Password && <div id="passwordHelpBlock" className="invalid-feedback">
            Your password must be 8-20 characters long, contain letters and numbers only.<br/>
            It must contains at least one digit, one lowercase and one uppercase letter.
          </div>}
        </div>
        <div className="form-floating mb-2">
          <input type="password" className={`form-control ${Check_Confirm(1)===1?'':'is-invalid'}`} id="floatingPassword2" 
            placeholder="ConfirmPassword" onChange={handleConfirm}/>
          <label htmlFor="floatingPassword">Confirm Password</label>
          {Check_Confirm && <div id="passwordHelpBlock" className="invalid-feedback">
            Should be same as above password.
          </div>}
        </div>
        <div className="form-floating mb-2">
          <input type='integer' className={`form-control ${Check_Phone(1)===1?'':'is-invalid'}`} id="floatingPhone" 
            placeholder="Phone Number" onChange={handlePhone}/>
          <label htmlFor="floatingPassword">Phone Number</label>
          {Check_Phone && <div id="passwordHelpBlock" className="invalid-feedback">
            Enter Valid phone number of 10 digit.
          </div>}
        </div>
        <div className="form-floating mb-2">
          <input type="email" className={`form-control ${Check_Email(1)===1?'':'is-invalid'}`} id="floatingMail" 
            placeholder="name@example.com" onChange={handleEmail}/>
          <label htmlFor="floatingInput">Email address</label>
          {Check_Email && <div id="passwordHelpBlock" className="invalid-feedback">
            Enter Valid Email.
          </div>}
        </div>
        <div className="d-grid gap-2 col-6 mx-auto pt-3">
          <NavLink className="btn btn-primary fs-5" onClick={CreateUser}>Next</NavLink>
        </div>
        {count>0 && Check_Validation()===0 && <div id="passwordHelpBlock" className="text-danger my-2 text-center">
          All enteries must be filled and must be valid.
        </div>}
      </form>
    </div>
    </div>
  )
}
