import React, {useState} from "react";
import NavContext from "./navContext";

export default function NavState(props) {
  const [logstate,changeState] = useState(0);
  const [title,setTitle] = useState("home");
  const [cartItems,setCartItems] = useState([]);

  return (
    <NavContext.Provider value={{logstate,changeState,title,setTitle,cartItems,setCartItems}}>
        {props.children}
    </NavContext.Provider>
  )
}
