import React, { useState } from 'react'
import pancake from './buttermilk_pancakes.png'
import logo from './logo.png'
import { Link } from 'react-router-dom'

export default function Menu() {

  const [title,setTitle]=useState("all");

  const HandleClick = (event) => {
    event.target.style.color="black"
    let id = event.target.id;
    setTitle(id)
  }

  const changeColorIn = (e) =>{
    if(title!==e.target.id){
        e.target.style.color="red";
    }
  }
  const changeColorOut = (e) =>{
    e.target.style.color="black";
  }

  return (
    <div>
        <div className="container" style={{width : '80vw'}}>
            <div style={{textAlign : 'center', marginTop : '10vh'}}>
            <img src={logo} style={{height : '20vh', width : '15vw'}} alt="Restaurant Logo"/><br/>
            <h2 className='menu' style={{color : 'rgb(10, 26, 60)', margin : '3vh',marginBottom: "12vh"}}><span className='border-bottom border-5 px-2 border-warning'>Menu List</span></h2>
            <div className='d-flex justify-content-between align-items-center mt-5 px-5'>
                <span className="category-title fs-3 text-dark"><b>Food Categories</b></span>
                <div>
                    <button className="btn btn-success mx-1">Add</button>
                    <button className="btn btn-danger mx-1">Remove</button>
                </div>
            </div>
            <hr style={{border:"2px solid chartreuse"}}></hr>
                <nav className='d-flex justify-content-around my-4'>
                    <div><Link id="all" className={`category nav-link ${title==="all"?'border-secondary border-bottom border-2':''}`} onClick={HandleClick} onMouseOver={changeColorIn} onMouseOut={changeColorOut}>All</Link></div>
                    <div><Link id="breakfast" className={`category nav-link ${title==="breakfast"?'border-secondary border-bottom border-2':''}`} onClick={HandleClick} onMouseOver={changeColorIn} onMouseOut={changeColorOut}>Breakfast</Link></div>
                    <div><Link id="lunch" className={`category nav-link ${title==="lunch"?'border-secondary border-bottom border-2':''}`} onClick={HandleClick} onMouseOver={changeColorIn} onMouseOut={changeColorOut}>Lunch</Link></div>
                    <div><Link id="dinner" className={`category nav-link ${title==="dinner"?'border-secondary border-bottom border-2':''}`} onClick={HandleClick} onMouseOver={changeColorIn} onMouseOut={changeColorOut}>Shakes</Link></div>
                </nav>
            </div>
            <div className="row">
                <div className="d-flex col-6 my-4" style={{alignItems : 'center'}}>
                    <div>
                        <img src={pancake}  style={{height : '25vh', width : '15vw', border : '4px solid #c56967', borderRadius : '2%'}} alt="Buttermilk Pancakes" />
                    </div>
                    <div className="menu-item-details px-3">
                        <div className='d-flex justify-content-between'>
                            <span className="item">Buttermilk Pancakes</span>
                            <span className="price">$15.99</span>
                        </div>
                        <hr/>
                        <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                    </div>
                </div>

                <div className="d-flex col-6 my-4" style={{alignItems : 'center'}}>
                    <div>
                        <img src={pancake}  style={{height : '25vh', width : '15vw', border : '4px solid #c56967', borderRadius : '2%'}} alt="Buttermilk Pancakes" />
                    </div>
                    <div className="menu-item-details px-3">
                        <div className='d-flex justify-content-between'>
                            <span className="item">Buttermilk Pancakes</span>
                            <span className="price">$15.99</span>
                        </div>
                        <hr/>
                        <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                    </div>
                </div>

                <div className="d-flex col-6 my-4" style={{alignItems : 'center'}}>
                    <div>
                        <img src={pancake}  style={{height : '25vh', width : '15vw', border : '4px solid #c56967', borderRadius : '2%'}} alt="Buttermilk Pancakes" />
                    </div>
                    <div className="menu-item-details px-3">
                        <div className='d-flex justify-content-between'>
                            <span className="item">Buttermilk Pancakes</span>
                            <span className="price">$15.99</span>
                        </div>
                        <hr/>
                        <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                    </div>
                </div>

                <div className="d-flex col-6 my-4" style={{alignItems : 'center'}}>
                    <div>
                        <img src={pancake}  style={{height : '25vh', width : '15vw', border : '4px solid #c56967', borderRadius : '2%'}} alt="Buttermilk Pancakes" />
                    </div>
                    <div className="menu-item-details px-3">
                        <div className='d-flex justify-content-between'>
                            <span className="item">Buttermilk Pancakes</span>
                            <span className="price">$15.99</span>
                        </div>
                        <hr/>
                        <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                    </div>
                </div>

                <div className="d-flex col-6 my-4" style={{alignItems : 'center'}}>
                    <div>
                        <img src={pancake}  style={{height : '25vh', width : '15vw', border : '4px solid #c56967', borderRadius : '2%'}} alt="Buttermilk Pancakes" />
                    </div>
                    <div className="menu-item-details px-3">
                        <div className='d-flex justify-content-between'>
                            <span className="item">Buttermilk Pancakes</span>
                            <span className="price">$15.99</span>
                        </div>
                        <hr/>
                        <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                    </div>
                </div>

                <div className="d-flex col-6 my-4" style={{alignItems : 'center'}}>
                    <div>
                        <img src={pancake}  style={{height : '25vh', width : '15vw', border : '4px solid #c56967', borderRadius : '2%'}} alt="Buttermilk Pancakes" />
                    </div>
                    <div className="menu-item-details px-3">
                        <div className='d-flex justify-content-between'>
                            <span className="item">Buttermilk Pancakes</span>
                            <span className="price">$15.99</span>
                        </div>
                        <hr/>
                        <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                    </div>
                </div>

                <div className="d-flex col-6 my-4" style={{alignItems : 'center'}}>
                    <div>
                        <img src={pancake}  style={{height : '25vh', width : '15vw', border : '4px solid #c56967', borderRadius : '2%'}} alt="Buttermilk Pancakes" />
                    </div>
                    <div className="menu-item-details px-3">
                        <div className='d-flex justify-content-between'>
                            <span className="item">Buttermilk Pancakes</span>
                            <span className="price">$15.99</span>
                        </div>
                        <hr/>
                        <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
