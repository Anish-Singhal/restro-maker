import React,{ useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserLogin } from '../restaurant services/UserService';

export default function Login(props) {

  const [name,setName] = useState('');
  const [password,setPassword] = useState('');

  const navigate = useNavigate();

  const ValidateLogin = (event) => {
    event.preventDefault();
    const user_login = {name,password};
    UserLogin(user_login).then((response)=>{
      // console.log(response.data[0]);
      props.changeState(1);
      navigate('/restaurant');
    }).catch(error=>{
      console.log("Invalid Credentials");
    })
  }

  const handleName = (event)=>{
    setName(event.target.value);
  }

  const handlePassword = (event)=>{
    setPassword(event.target.value);
  }

  return (
    <div className='background'>
      <center><div className="box rounded-3">
        <form method="post" id="form" autoComplete='off'>
            <h2>Login Page</h2>
            <div className="mb-3">
              <input type="name" className="form-control rounded-4" id="floatingInput" 
                placeholder="Username" onChange={handleName}/>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control rounded-4" id="floatingPassword" 
                placeholder="Password" onChange={handlePassword}/>
            </div>
            <div className="remember">
                <label><input type="checkbox" name="remember"/> Remember me</label>
                <NavLink to="/">forgot password</NavLink>
            </div>
            <br/>
            <button type="submit" className="btn_login" onClick={ValidateLogin}>Login</button>
            <p className="register">Dont have an account?<NavLink to="/signup" style={{padding:0.5+"vw"}}>Register</NavLink></p>
        </form>
      </div></center>
    </div>
  )
}
