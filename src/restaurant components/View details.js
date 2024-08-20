import React, { useState, useEffect } from 'react'
import pancake from './buttermilk_pancakes.png'
import logo from './logo.png'
import Accordion from 'react-bootstrap/Accordion';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GetAllCategories, GetAllItems} from '../restaurant services/UserService';
import ItemCounter from './ItemCounter';

export default function ViewDetails() {

    const navigate = useNavigate();
    const location = useLocation();

    // const [title,setTitle]=useState("all");
    const [ItemList, setItemList] = useState([]);

    const [rest_id] = useState(location.state?.id);
    const [restaurantName] = useState(location.state?.title);
    const [categories, setCategories] = useState(["all"]);

    const [description] = useState("");
    const [address] = useState("");
    const [contactDetails] = useState("");

    const [foodTitle, setFoodTitle] = useState("all");

    useEffect(() => {
        if (rest_id === undefined) {
            navigate("/");
        }
        else {
            GetAllItems(rest_id).then((response) => {
                setItemList(response.data);
            }).catch(error => {
                console.error(error);
            })
            GetAllCategories(rest_id).then((response) => {
                if (response.data.indexOf(null) !== -1) {
                    (response.data).splice((response.data).indexOf(null), 1);
                }
                setCategories(["all", ...response.data]);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [rest_id, navigate])

    const HandleClick = (event) => {
        let id = event.target.id;
        if (id === "all") {
            event.target.style.color = "cadetblue";
        }
        else {
            event.target.style.color = "black";
        }
        setFoodTitle(id)
    }

    const changeColorIn = (e) => {
        if (foodTitle !== e.target.id) {
            e.target.style.color = "red";
        }
    }
    const changeColorOut = (e) => {
        if (e.target.id === "all") {
            e.target.style.color = "cadetblue";
        }
        else {
            e.target.style.color = "black";
        }
    }

    const GoToRestaurant = () => {
        navigate(location.state?.prev_loc);
    }
    const GoToCart = () => {
        navigate("/order");
    }

    return (
        <div>
            {/* Back Button */}
            <div className='d-flex mt-5 align-items-center' style={{ marginLeft: "12vw" }}>
                <div className='bg-secondary rounded-circle'><i className="fa-solid fa-arrow-left px-3 py-3 text-white" onClick={GoToRestaurant}></i></div>
                <h5 className='mx-2 fs-4'>Back to Previous Page</h5>
            </div>

            <div className="container" style={{ width: '80vw' }}>
                <div style={{ textAlign: 'center'}}>

                    {/* Image of restaurant */}
                    <img src={logo} style={{ height: '20vh', width: '15vw' }} alt="Restaurant Logo" /><br />

                    {/* Name of the restaurant */}
                    <div className='d-flex justify-content-between align-items-center mt-5 px-5'>
                        <span className="category-title fs-2 text-dark"><b>Restaurant Name</b></span>
                    </div>
                    <hr style={{ border: "2px solid #ffc107", marginTop: "2vh" }}></hr>
                    <div className={`container bg-light`}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex justify-content-center flex-grow-1'>
                                <h1 style={{ color: "brown", fontSize: "7vh" }}>{restaurantName}</h1>
                            </div>
                        </div>
                    </div>

                    <hr style={{ border: "2px solid #ffc107" }}></hr>

                    {/* Accordian section */}
                    {location.state?.prev_loc==="/orderpage" && <div className="container mt-5 py-3 border rounded" style={{ backgroundColor: "beige" }}>
                        <h2 className="text-start mb-4 mx-5 fs-2 text-dark"><b>Other Details</b></h2>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Address</Accordion.Header>
                                <Accordion.Body>
                                    <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                        <div style={{ color: `${address.length === 0 ? "#ff4500" : "black"}` }}>{address.length === 0 ? "No address available" : address.split('\n').map((line, index) => (
                                            <div key={index}>
                                                {line}
                                                <br />
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Contact Details</Accordion.Header>
                                <Accordion.Body>
                                    <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                        <div style={{ color: `${contactDetails.length === 0 ? "#ff4500" : "black"}` }}>{contactDetails.length === 0 ? "No contact details available" : contactDetails.split('\n').map((line, index) => (
                                            <div key={index}>
                                                {line}
                                                <br />
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Description</Accordion.Header>
                                <Accordion.Body>
                                    <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                        <div style={{ color: `${description.length === 0 ? "#ff4500" : "black"}` }}>
                                            {description.length === 0 ? "No description available" : description.split('\n').map((line, index) => (
                                                <div key={index}>
                                                    {line}
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>}

                    {/* Menu List */}
                    <h2 className='menu' style={{ color: 'rgb(10, 26, 60)', marginTop: '12vh' }}><span className='border-bottom border-5 px-2 border-warning'>Menu List</span></h2>
                
                </div>

                {/* Food Categories */}
                <div className='d-flex justify-content-between align-items-center mt-3 px-5'>
                    <span className="category-title fs-2 text-dark"><b>Food Categories</b></span>
                </div>
                <hr style={{ border: "2px solid chartreuse" }}></hr>

                {/* Different Food categories*/}
                <nav className='row my-4 pt-3 fw-bold'>
                    <div className={`d-flex col-12 mb-2 justify-content-center`} style={{ alignItems: 'center' }}>
                        <div id="all" className={`category ${foodTitle === "all" ? 'border-secondary border-bottom border-3' : ''}`}
                            onClick={HandleClick} onMouseOver={changeColorIn} onMouseOut={changeColorOut}
                            style={{ cursor: 'pointer', fontSize: '4vh', color: "cadetblue" }}>
                            ALL MENU ITEMS
                        </div>
                    </div>
                    {categories.slice(1).map(category => (
                        <div key={category} className={`d-flex col-3 my-3 justify-content-center`} style={{ alignItems: 'center' }}>
                            <div id={category} className={`category ${foodTitle === category ? 'border-secondary border-bottom border-2' : ''}`}
                                onClick={HandleClick} onMouseOver={changeColorIn} onMouseOut={changeColorOut}
                                style={{ cursor: 'pointer', color: foodTitle === category ? 'black' : '' }}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </div>
                        </div>
                    ))}
                </nav>


                <div className="row pb-5">
                    {ItemList.filter((item)=>{return item.restFoodType==="Veg" && (foodTitle==="all" || item.foodCategory===foodTitle)}).length>0 && <div className='fs-2 fw-bold mx-3 mb-3'>______________ Veg Items ______________</div>}
                    {ItemList.map(item =>
                        item.restFoodType==="Veg" && (foodTitle==="all" || item.foodCategory===foodTitle) && <div className="d-flex col-6 my-4" key={item.item_id} style={{alignItems:"center"}}>
                            <div>
                                <img src={pancake} style={{ height: '25vh',width:"15vw", border: '4px solid #c56967', borderRadius: '2%' }} alt="Buttermilk Pancakes" />
                            </div>
                            <div className="menu-item-details px-3">
                                <div className='d-flex justify-content-between' style={{width:"95%", alignItems:"center"}}>
                                    <div className='d-flex w-75'>  
                                        <div className="item">{item.item_name}</div>
                                    </div>
                                    <div className="price">Rs. {item.price}</div>
                                </div>
                                <hr/>
                                <div className='d-flex align-items-center'>
                                    <p className="description overflow-hidden" style={{ height: '16vh'}}>I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                                    {/* Plus button */}
                                    {location.state?.prev_loc==="/orderpage" && <ItemCounter item={item}/>}
                                </div>
                            </div>
                        </div>
                        )
                    }
                    {ItemList.filter((item)=>{return item.restFoodType==="Non-Veg" && (foodTitle==="all" || item.foodCategory===foodTitle)}).length>0 && <div className='fs-2 fw-bold mx-3 mb-3'>____________ Non-Veg Items ____________</div>}
                    {ItemList.map(item =>
                        item.restFoodType==="Non-Veg" && (foodTitle==="all" || item.foodCategory===foodTitle) && <div className="d-flex col-6 my-4" key={item.item_id} style={{alignItems:"center"}}>
                            <div>
                                <img src={pancake} style={{ height: '25vh',width:"15vw", border: '4px solid #c56967', borderRadius: '2%' }} alt="Buttermilk Pancakes" />
                            </div>
                            <div className="menu-item-details px-3">
                                <div className='d-flex justify-content-between' style={{width:"90%", alignItems:"center"}}>
                                    <div className='d-flex'>
                                        <div className="item">{item.item_name}</div>
                                    </div>
                                    <div className="price">Rs. {item.price}</div>
                                </div>
                                <hr/>
                                <div className='d-flex align-items-center'>
                                    <p className="description overflow-hidden" style={{ height: '16vh'}}>I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                                    {/* Plus button */}
                                    {location.state?.prev_loc==="/orderpage" && <ItemCounter item={item}/>}
                                </div>
                            </div>
                        </div>
                        )
                    }
                    {ItemList.filter((item)=>{return (foodTitle==="all" || item.foodCategory===foodTitle)}).length===0 && 
                    (<div className='bg-light py-4'>
                        <div className='fs-1 text-center text-danger fw-bold'>No Items Available</div>
                    </div>)}

                    {location.state?.prev_loc==="/orderpage" && ItemList.length>0 && <div className="d-grid py-4">
                        <button className="btn btn-success fs-3 col-3 mx-auto" type="button" onClick={GoToCart}><b>Go to Cart</b></button>
                    </div>}

                    {/* Accordian section */}
                    {location.state?.prev_loc==="/restaurant" && <div className="container mt-5 py-3 border rounded" style={{ backgroundColor: "beige" }}>
                        <h2 className="text-start mb-4 mx-5 fs-2 text-dark"><b>Other Details</b></h2>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Address</Accordion.Header>
                                <Accordion.Body>
                                    <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                        <div style={{ color: `${address.length === 0 ? "#ff4500" : "black"}` }}>{address.length === 0 ? "No address available" : address.split('\n').map((line, index) => (
                                            <div key={index}>
                                                {line}
                                                <br />
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Contact Details</Accordion.Header>
                                <Accordion.Body>
                                    <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                        <div style={{ color: `${contactDetails.length === 0 ? "#ff4500" : "black"}` }}>{contactDetails.length === 0 ? "No contact details available" : contactDetails.split('\n').map((line, index) => (
                                            <div key={index}>
                                                {line}
                                                <br />
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Description</Accordion.Header>
                                <Accordion.Body>
                                    <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                        <div style={{ color: `${description.length === 0 ? "#ff4500" : "black"}` }}>
                                            {description.length === 0 ? "No description available" : description.split('\n').map((line, index) => (
                                                <div key={index}>
                                                    {line}
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>}
                </div>
            </div>
        </div>
    )
}

