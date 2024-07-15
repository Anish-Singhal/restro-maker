import './App.css';
import React, {useState} from 'react';
import Homepage from './restaurant components/HomePage';
import Login from './restaurant components/Login';
import RestaurantPage from './restaurant components/RestuarantList';
// import EditPage from './restaurant components/EditPage'
import SignUp from './restaurant components/SignUp';
import UserType from './restaurant components/UserType';
import ForgotPassword from './restaurant components/ForgotPassword';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  // const [mode,setMode] = useState('light');
  // const changeMode = ()=>{
  //   if(mode==='light'){
  //     setMode('dark');
  //     document.body.style.backgroundColor="rgb(0, 76, 95)";
  //   }
  //   else{
  //     setMode('light');
  //     document.body.style.backgroundColor="white";
  //   }
  // }
  const [logstate,changeState]=useState(0);

  return (
    <>
    <Router>
      <Routes>
        <Route exact path ='/' element={<Homepage  logstate={logstate} changeState={changeState}/>}></Route>
        <Route exact path ='/login' element={<Login logstate={logstate} changeState={changeState}/>}></Route>
        <Route exact path ='/signup' element={<SignUp logstate={logstate} changeState={changeState}/>}></Route>
        <Route exact path ='/userType' element={<UserType logstate={logstate} changeState={changeState}/>}/>
        <Route exact path ='/password' element={<ForgotPassword/>}></Route>
        <Route exact path ='/restaurant' element={<RestaurantPage/>}></Route>
        {/* <Route exact path ='/restaurant/edit' element={<EditPage/>}></Route> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
