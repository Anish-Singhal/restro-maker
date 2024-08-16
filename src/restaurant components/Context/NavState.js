import React, {useState} from "react";
import NavContext from "./navContext";

export default function NavState(props) {
  const [logstate,changeState]=useState(0);
  const [title,setTitle] = useState("home");

  return (
    <NavContext.Provider value={{logstate,changeState,title,setTitle}}>
        {props.children}
    </NavContext.Provider>
  )
}
