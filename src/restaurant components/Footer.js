import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <div className="bg-light" style={{width:"100vw",padding:"0 10vw"}}>
      <footer className="pt-5 pb-2">
            <div className="row">
            <div className="col-6 col-md-2 mb-3 text-center">
                <h5>User</h5>
                <ul className="nav flex-column">
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">Profile</NavLink></li>
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">Order Page</NavLink></li>
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">Restaurants</NavLink></li>
                </ul>
            </div>

            <div className="col-6 col-md-2 mb-3 text-center">
                <h5>Owner</h5>
                <ul className="nav flex-column">
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">Profile</NavLink></li>
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">Edit details</NavLink></li>
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">View details</NavLink></li>
                </ul>
            </div>

            <div className="col-6 col-md-2 mb-3 text-center">
                <h5>General</h5>
                <ul className="nav flex-column">
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">Login</NavLink></li>
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">About</NavLink></li>
                <li className="nav-item mb-2"><NavLink to="/" className="nav-link p-0 text-body-secondary">Contact</NavLink></li>
                </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
                <form>
                <h5>Subscribe to our website</h5>
                <p>Get monthly update of new and exciting restaurants along with their amazing dishes from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
                    <button className="btn btn-primary" type="button">Subscribe</button>
                </div>
                </form>
            </div>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>© 2024 Company, Inc. All rights reserved.</p>
            {/* <ul className="list-unstyled d-flex">
                <li className="ms-3"><NavLink className="link-body-emphasis" to="/"><svg className="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></NavLink></li>
                <li className="ms-3"><NavLink className="link-body-emphasis" to="/"><svg className="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></NavLink></li>
                <li className="ms-3"><NavLink className="link-body-emphasis" to="/"><svg className="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></NavLink></li>
            </ul> */}
            </div>
        </footer>
      </div>
    </div>
  )
}
