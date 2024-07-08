import './App.css';
import React, {useState} from 'react';
import Homepage from './restaurant components/HomePage';
import Login from './restaurant components/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
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
  const [login,logState]=useState(0);
  

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
