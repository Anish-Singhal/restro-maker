import React, {useState} from 'react'

export default function Textform(props) {
    const UpdateOnClick = (event)=>{
        let newtext=text.toUpperCase();
        setText(newtext);
    }
    const HandleOnChange = (event)=>{
        setText(event.target.value);
    }
    const [text,setText]=useState("Enter text here");
    // console.log(useState("State 1"));
    return(
        <>
        <div className='container'>
            <h1>{props.heading}</h1>
            <div className="mb-3">
            <textarea className="form-control" value={text} onChange={HandleOnChange} id="exampleFormControlTextarea1" rows="8"></textarea>
            </div>
            <button className="btn btn-primary" onClick={UpdateOnClick}>Convert to Uppercase</button>
        </div>
        <div className="container my-3">
            <h1>Your text summary.</h1>
            <p>{text.split(" ").length} words, {text.length} characters</p>
        </div>
        </>
    )
}