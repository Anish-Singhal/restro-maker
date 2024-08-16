import React,{ useState,useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserLogin } from '../restaurant services/UserService';
import Alert from './Alert';
import navContext from './Context/navContext'
import background from "./background3.JPG"
import restro_maker from "./Restro-maker.jpg"

export default function Login(props) {

  const context = useContext(navContext);
  const {changeState} = context;

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
        // console.log(response.data.jwtToken);
        if(response.data!=="Credentials Invalid !!"){
          setIsValid(1);
          changeState(1);
          localStorage.setItem("token",response.data.jwtToken)
          navigate("/");
        }
        else{
          setIsValid(0);
          if(isValid===0){
            showAlert();
          }
        }

        // if(type==="owner"){
        //   navigate(`/restaurant/${username}`);
        // }
        // else{
        //   navigate("/user/home")
        // }
      }).catch(error =>{
        // console.error(error);
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

  const GoToHome = () =>{
    navigate("/");
  }

  return (
    <div className='background-login'>
      <img src={background} alt="background" style={{height:"120vh",width:"100vw",zIndex:"-1",position:"absolute",opacity:"0.7"}}></img>
      <div className='d-flex w-100' style={{backgroundColor:"rgb(0,0,0,0.4)",zIndex:"-1",opacity:"0.7"}}>
          <img src={restro_maker} alt="Restro-maker logo"  height="150px"/>
          <div className="w-100 fw-bold">
              <h2 className="w-100 fs-1 fw-bold" style={{ color: "gold",textAlign:"center",  margin: "10px auto", textShadow:"-1px -1px 0 black, 1px -1px 0 black, 1px 1px 0 black,1px 1px 0 black" }}>Welcome to Restro Maker</h2>
              <p className="fs-4" style={{ color: "#fff", margin: "auto",textAlign:"center",width:"90%" }}>
                  Your one-stop solution for managing your restaurants. From creating profiles to organizing menus and placing orders, explore all the features we offer to streamline your business.
              </p>
          </div>
      </div>

      <center><div className="box rounded-3 mt-5">

        {/* Back Button */}
        <div className='d-flex mt-1 mb-4'>
          <div className='bg-white rounded-circle'><i className="fa-solid fa-arrow-left px-2 py-2" onClick={GoToHome}></i></div>
          <h5 className='mx-2 my-1'>Back to Home Page</h5>
        </div>

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
