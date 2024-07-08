import React from 'react'

export default function Login() {
  return (
      <center><div class="box">
        <form method="post" id="form">
            <h2>Login Page</h2>
            <div class="input-box">
                <input type="text" id="Username" name="Username" placeholder="Username" required/>
                <i className="fa fa-user"></i>
            </div>
            <div class="input-box">
                <input type="password" id="Password" name="Password" placeholder="Password" required/>
                <i class="fa fa-lock"></i>
            </div>
            <div class="remember">
                <label><input type="checkbox" name="remember"/>Remember me</label>
                <a href="#">forgot password</a>
            </div>
            <br/>
            <button type="submit" class="btn_login">Login</button>
            <p class="register">Dont have an account?<a href="#">Register</a></p>
        </form>
    </div></center>
  )
}
