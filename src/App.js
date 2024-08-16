import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import Homepage from './restaurant components/HomePage';
import Login from './restaurant components/Login';
import RestaurantPage from './restaurant components/RestuarantList';
import SignUp from './restaurant components/SignUp';
import ForgotPassword from './restaurant components/ForgotPassword';
import Menu from './restaurant components/Menu';
import NavState from './restaurant components/Context/NavState';
import About from './restaurant components/About';
import ViewDetails from './restaurant components/View details';
import ScrollToTop from './restaurant components/ScrollToTop';
import UserPage from './restaurant components/Userpage';
import Order from './restaurant components/Order';
import Profile from './restaurant components/Profile';

function App() {

  return (
    <>
    <NavState>
      <Router>
      <ScrollToTop/>
        <Routes>
          <Route exact path ="/" element={<Homepage/>}></Route>
          <Route exact path ='/login' element={<Login/>}></Route>
          <Route exact path ='/signup' element={<SignUp/>}></Route>
          <Route exact path ='/password' element={<ForgotPassword/>}></Route>
          <Route exact path ='/about' element={<About/>}></Route>
          <Route exact path ='/restaurant' element={<RestaurantPage/>}></Route>
          <Route exact path ='/restaurant/menu' element={<Menu/>}/>
          <Route exact path ='/restaurant/view' element={<ViewDetails/>}/>
          <Route exact path ='/orderpage' element={<UserPage/>}/>
          <Route exact path ='/order' element={<Order/>}/>
          <Route exact path ='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </NavState>
    </>
  );
}

export default App;
