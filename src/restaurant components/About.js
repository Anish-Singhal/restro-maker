import React,{ useContext} from 'react';
import './About.css';
import logo from "./Card-2.png"
import { useNavigate } from 'react-router-dom';
import navContext from './Context/navContext'

const About = () => {

  const navigate = useNavigate();
  const context = useContext(navContext);
  const {setTitle} = context;

  const GoToHome = () =>{
    setTitle("home");
    navigate("/");
  }

  return (
    <div className='rest_background'>
      <div className="container about-container rest">
      <h1 className="text-center text-dark mt-3"><span className='border-bottom border-5 px-2 border-warning'>About Us</span></h1>
        
        <div className="row about-section border border-2 rounded py-5 pe-5 bg-white">
          <div className="col-md-6">
            <img src={logo} className="img-fluid rounded about-image d-block mx-auto" alt="Our Story" />
          </div>
          <div className="col-md-6">
            <h2 className="text-secondary">Our Story</h2>
            <p>
              Welcome to Restro-Maker! Our journey began with a passion for delicious food and a dream to create a welcoming place for people to enjoy it. Founded in 2024, we have grown from a small family-run eatery to a beloved spot in the community.
            </p>
          </div>
        </div>
        
        <div className="row about-section border border-2 rounded py-5 ps-5 bg-white">
          <div className="col-md-6 order-md-2">
            <img src={logo} className="img-fluid rounded about-image mx-5" alt="Our Mission" />
          </div>
          <div className="col-md-6 order-md-1">
            <h2 className="text-secondary">Our Mission</h2>
            <p>
            Our mission is to provide a powerful, easy-to-use platform that allows restaurant managers to efficiently manage restaurants. We aim to simplify the management process, enabling our users to focus on delivering exceptional dining experiences.
            </p>
          </div>
        </div>
        
        <div className="row about-section">

          <div className="col-md-6">
            <div className="card bg-light mb-3">
              <div className="card-header text-white bg-dark mb-3 fs-3">How It Works</div>
              <div className="card-body">
                <img src={logo} className="img-fluid rounded about-image d-block mx-auto" alt="How It Works" />
                <p className="card-text mt-4">
                  Our platform is designed to be intuitive and user-friendly. Here's a brief overview of how it works:
                </p>
                <ul>
                  <li>Create an account or log in to your existing account.</li>
                  <li>Use the dashboard to add, edit, or delete restaurant details.</li>
                  <li>Manage your restaurant's menu, staff, and reservations.</li>
                  <li>Access analytics to track performance and make informed decisions.</li>
                </ul>
                <p>
                  Manage efficiently! Create and manage as many restaurants as you want.
                </p>
              </div>
            </div>
          </div>
      
          <div className="col-md-6 order-md-2">
            <div className="card bg-light mb-3">
              <div className="card-header text-white bg-dark mb-3 fs-3">Food Ordering steps</div>
              <div className="card-body">
                <img src={logo} className="img-fluid rounded about-image d-block mx-auto" alt="Ordering Food" />
                <p className="card-text mt-4">
                  Our platform also supports online food ordering to enhance customer convenience. Here's how you can place an order:
                </p>
                <ul>
                  <li>Browse the restaurant's menu on our website.</li>
                  <li>Select your favorite dishes and add them to the cart.</li>
                  <li>Choose your preferred payment method and complete the checkout process.</li>
                  <li>Receive an order confirmation and track the delivery status in real-time.</li>
                </ul>
                <p>
                  Enjoy your meal! Our goal is to provide a seamless and enjoyable ordering experience.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="row about-section">
          <div className="col">
            <div className="card shadow-sm">
              <img src={logo}  className="card-img-top about-image-2" alt="Meet the Team" />
              <div className="card-body">
                <h5 className="card-title text-secondary">Meet the Team</h5>
                <p className="card-text">
                Our dedicated team is here to support you. From our developers to our customer service representatives, everyone is committed to ensuring that our platform meets your needs and exceeds your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="d-grid gap-2 col-4 mx-auto py-4 my-5">
          <button className="btn btn-outline-warning btn-lg py-3 bg-light fs-4" type="button" onClick={GoToHome}><b>Return to homepage</b></button>
        </div>
      </div>
    </div>
  );
}

export default About;
