import React,{useState} from 'react'
import { CreateNewUser } from '../restaurant services/UserService';
import { NavLink } from 'react-router-dom';

export default function SignUp() {

  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [confirm_pass,setConfirmPass] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');

  const handleName = (event)=>{
    setName(event.target.value);
  }

  const handlePassword = (event)=>{
    setPassword(event.target.value);
  }
  const handleConfirm = (event)=>{
    setConfirmPass(event.target.value);
  }

  function Check(isvalid){
    if(password!==confirm_pass){
      isvalid='is-invalid';
    }
    else{
      isvalid='';
    }
    return isvalid;
  }

  const handlePhone = (event)=>{
    setPhone(event.target.value);
  }
  const handleEmail = (event)=>{
    setEmail(event.target.value);
  }
  const CreateUser = (event)=>{
    event.preventDefault();
    const user = {name,password,phone,email};
    CreateNewUser(user).then((response)=>{
      
    });
  }

  return (
    <div className='background'>
    <div className="card" style={{width: 33+"vw"}}>
      <h1 style={{alignSelf:'center', paddingTop: 2+"vh"}}>Create Account</h1>
      <form className="card-body" autoComplete='off'>
        <div className="form-floating mb-3">
          <input type="name" className="form-control" id="floatingInput" 
            placeholder="Full name" onChange={handleName}/>
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="floatingPassword" 
            placeholder="Password" onChange={handlePassword}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className={`form-control ${Check('')}`} id="floatingPassword2" 
            placeholder="ConfirmPassword" onChange={handleConfirm}/>
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type='integer' className="form-control" id="floatingPhone" 
            placeholder="Phone Number" onChange={handlePhone}/>
          <label htmlFor="floatingPassword">Phone Number</label>
        </div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingMail" 
            placeholder="name@example.com" onChange={handleEmail}/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <NavLink to="/login" className="btn btn-primary" onClick={CreateUser}>Submit and Continue</NavLink>
        </div>
      </form>
    </div>
    </div>
  )
}
