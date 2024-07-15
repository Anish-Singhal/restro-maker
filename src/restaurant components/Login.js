import React,{ useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserLogin } from '../restaurant services/UserService';
import Alert from './Alert';

export default function Login(props) {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [isValid,setIsValid] = useState(0);
  const [emptyName,setEmptyName] =useState(0);
  const [emptyPass,setEmptyPass] =useState(0);

  const navigate = useNavigate();

  // To show alert message on entering wrong inputs.
  const [alert,setAlert] = useState(null);
  const showAlert = ()=>{
    setAlert(true);
    setTimeout(()=>{
      setAlert(null);
    },2000);
  }

  // Function for password eye icon to display or hide password.
  const [eye, setEye] = useState("eye-slash");
  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById("floatingPassword");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      setEye("eye");
    } else {
      passwordField.type = "password";
      setEye("eye-slash");
    }
  }

  // Function to chech the credentails of the user.
  const ValidateLogin = (event) => {
    event.preventDefault();
    if(username.length===0){
      setEmptyName(1);
    }
    if(password.length===0){
      setEmptyPass(1);
    }
    if(username.length!==0 && password.length!==0){
      const user_login = {username,password};
      UserLogin(user_login).then((response)=>{
        props.changeState(1);
        navigate('/restaurant');
        setIsValid(1);
      }).catch(error=>{
        setIsValid(0);
        if(isValid===0){
          showAlert();
        }
      })
    }
  }

  // Functions for handling input fields.
  const handleUsername = (event)=>{
    setUsername(event.target.value);
    setEmptyName(0);
  }
  const handlePassword = (event)=>{
    setPassword(event.target.value);
    setEmptyPass(0);
  }

  return (
    <div className='background'>
      <center><div className="box rounded-3">
        <form method="post" id="form" autoComplete='off' style={{width:"85%"}}>
            <h2>Login Page</h2>

            {/* USERNAME */}
            <div className="mb-3">
              <input type="name" className={`form-control rounded-4 ${emptyName===1?'is-invalid':''}`} id="floatingInput" placeholder="Username" onChange={handleUsername}/>
              {emptyName===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-3 fs-6">
                *Required
              </div>}
            </div>

            {/* PASSWORD */}
            <div className="mb-3" style={{ position: "relative"}}>
              <input type="password" className={`form-control rounded-4 ${emptyPass===1?'is-invalid':''}`} id="floatingPassword" placeholder="Password" onChange={handlePassword} autoComplete='off'/>
              {emptyPass===0 && <span className="toggle-password" style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "1rem" }} onClick={togglePasswordVisibility}><i className={`fa-solid fa-${eye}`} style={{ color: "#373131" }}></i></span>}
              {emptyPass===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-3 fs-6">
                *Required
              </div>}
            </div>

            {/* Forget and Remember me */}
            <div className="remember">
                <label><input type="checkbox" name="remember"/> Remember me</label>
                <NavLink to="/password">forgot password</NavLink>
            </div>
            <br/>

            {/* Login and Alert Message */}
            <button type="submit" className="btn btn-primary btn_login w-50 rounded-5 mb-3" style={{backgroundColor : 'darkslateblue', border : '2px solid black'}} onClick={ValidateLogin} disabled={alert}><b>Login</b></button>
            <Alert alert={alert}/>

            {/* SignUp */}
            <p className="register">Don't have an account?<NavLink to="/signup" style={{padding:0.5+"vw"}}>Register</NavLink></p>
        </form>
      </div></center>
    </div>
  )
}
