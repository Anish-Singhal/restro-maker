import React, {useState} from 'react'

export default function Textform(props) {
    const HandleOnChange = (event)=>{
        setText(event.target.value);
    }
    const UpdateToUpper = (event)=>{
        let newtext=text.toUpperCase();
        setText(newtext);
    }
    const UpdateTolower = (event)=>{
        let newtext=text.toLowerCase();
        setText(newtext);
    }
    const UpdateToClear = (event)=>{
        let newtext='';
        setText(newtext);
    }

    const [text,setText]=useState("Enter text here");
    // console.log(useState("State 1"));
    return(
        <>
        <div className={`container text-${props.mode==='light'?'dark':'light'}`}>
            <h1>{props.heading}</h1>
            <div className="mb-3">
            <textarea className="form-control" value={text} onChange={HandleOnChange} id="exampleFormControlTextarea1" rows="8"></textarea>
            </div>
            <button className={`btn btn-${props.mode==='light'?'primary':'dark'} mx-2`} onClick={UpdateToUpper}>Convert to Uppercase</button>
            <button className={`btn btn-${props.mode==='light'?'primary':'dark'} mx-2`}  onClick={UpdateTolower}>Convert to lowercase</button>
            <button className={`btn btn-${props.mode==='light'?'primary':'dark'} mx-2`}  onClick={UpdateToClear}>Clear text</button>
        </div>
        <div className={`container my-3 text-${props.mode==='light'?'dark':'light'}`}>
            <h2>Your text summary.</h2>
            <p>{text.split(" ").length} words, {text.length} characters</p>
            <p>Time to read text - {0.01*text.split(" ").length} Minutes</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
        </>
    )
}