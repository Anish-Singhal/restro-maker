import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

const Profile = () => {
  // State variables for user profile
  const [user, setUser] = useState({
    username: 'lucky.jesse',
    email: 'jesse@example.com',
    firstName: 'Lucky',
    lastName: 'Jesse',
    address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
    city: 'New York',
    country: 'United States',
    postalCode: '',
    aboutMe: 'A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.',
    friends: 22,
    photos: 10,
    comments: 89,
    title: 'Solution Manager - Creative Tim Officer',
    university: 'University of Computer Science',
    location: 'Bucharest, Romania',
  });

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-header">
          <h2>My account</h2>
          <button className="btn btn-primary">Settings</button>
        </div>
        <div className="card-body">
          <h5 className="section-title">User Information</h5>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={user.username}
                readOnly
              />
            </div>
            <div className="form-group col-md-6">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                readOnly
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                value={user.firstName}
                readOnly
              />
            </div>
            <div className="form-group col-md-6">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                value={user.lastName}
                readOnly
              />
            </div>
          </div>
          <h5 className="section-title">Contact Information</h5>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                value={user.address}
                readOnly
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={user.city}
                readOnly
              />
            </div>
            <div className="form-group col-md-4">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                value={user.country}
                readOnly
              />
            </div>
            <div className="form-group col-md-4">
              <label>Postal code</label>
              <input
                type="text"
                className="form-control"
                value={user.postalCode}
                readOnly
              />
            </div>
          </div>
          <h5 className="section-title">About Me</h5>
          <div className="form-group">
            <label>About Me</label>
            <textarea
              className="form-control"
              rows="3"
              value={user.aboutMe}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
      <div className="profile-summary">
        <div className="profile-picture">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-circle"
          />
        </div>
        <div className="profile-details">
          <button className="btn btn-info">Connect</button>
          <button className="btn btn-dark">Message</button>
          <div className="stats">
            <div>
              <span>{user.friends}</span>
              <p>Friends</p>
            </div>
            <div>
              <span>{user.photos}</span>
              <p>Photos</p>
            </div>
            <div>
              <span>{user.comments}</span>
              <p>Comments</p>
            </div>
          </div>
          <div className="info">
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <p>{user.location}</p>
            <p>{user.title}</p>
            <p>{user.university}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
