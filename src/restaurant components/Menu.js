import React, { useState,useEffect } from 'react'
import pancake from './buttermilk_pancakes.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddFoodItem, ChangeRestaurantName, GetAllCategories, GetAllItems, RemoveCategories, RemoveItems } from '../restaurant services/UserService';
import Accordion from 'react-bootstrap/Accordion';
import EditItem from './EditItem';
import logo from './logo.png'

export default function Menu() {

    const location = useLocation();
    const navigate = useNavigate();

    const [ItemList,setItemList] = useState([]);

    const [rest_id,setRest_ID] = useState(location.state?.id);
    const [restaurantName, setRestaurantName] = useState(location.state?.title);
    const [isEditing, setIsEditing] = useState(false);
    const [newRestaurantName, setNewRestaurantName] = useState(restaurantName);
    const [categories, setCategories] = useState(["all"]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(()=>{
        if(rest_id===undefined){
            navigate("/");
        }
        else{
            GetAllItems(rest_id).then((response)=>{
                setItemList(response.data);
            }).catch(error =>{
                console.error(error);
            })
            GetAllCategories(rest_id).then((response)=>{
                if(response.data.indexOf(null)!==-1){
                    (response.data).splice((response.data).indexOf(null),1);
                }
                setCategories(["all",...response.data]);
            }).catch(error =>{
                console.error(error);
            })
        }
    },[rest_id,navigate])

    // This is used to keep track of the selected food category.
    const [foodTitle, setFoodTitle] = useState("all");

    // Function to select a food category
    const HandleClick = (event) => {
        let id = event.target.id;
        if(id==="all"){
            event.target.style.color = "cadetblue";
        }
        else{
            event.target.style.color = "black";
        }
        setFoodTitle(id)
    }

    // Function to change color on hover a food category
    const changeColorIn = (e) => {
        if (foodTitle !== e.target.id) {
            e.target.style.color = "red";
        }
    }

    // Function to change color on moving out of a food category
    const changeColorOut = (e) => {
        if(e.target.id==="all"){
            e.target.style.color = "cadetblue";
        }
        else{
            e.target.style.color = "black";
        }
    }

    // These 3 functions are used to change the restaurant name
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleNameChange = (e) => {
        setNewRestaurantName(e.target.value);
    };
    const handleSaveClick = () => {
        const rest_name = newRestaurantName;
        ChangeRestaurantName({rest_id,rest_name}).then((response)=>{
            // console.log(response.data);
        }).catch(error =>{
            console.error(error);
        })
        setRestaurantName(newRestaurantName);
        setIsEditing(false);
    };

    // Functions to add new food category
    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory.toLowerCase())) {
            setCategories([...categories, newCategory.toLowerCase()]);
            setNewCategory("");
            setFoodTitle(newCategory.toLowerCase())
        }
        else if(categories.includes(newCategory.toLowerCase())){
            alert("Category already present");
        }
        else{
            alert("Enter category first.");
        }
    };
    const handleInputChange = (e) => {
        setNewCategory(e.target.value);
    };
    const handleRemoveCategory = (category) => {
       
        if (category !== "all") {
            const confirmDelete = window.confirm(`Are you sure you want to delete the category "${category}"?`);
            if (confirmDelete) {
                setCategories(categories.filter(cat => cat !== category));
                setFoodTitle("all");
            }
        } 
    };

    const [item_name, setItemName] = useState('');
    const [emptyItemName,setEmptyItemName] = useState(0);
    const [price,setPrice] = useState('');
    const [emptyPrice,setEmptyPrice] = useState(0);
    const [foodCategory,setFoodCategory] = useState("0");
    const [emptyFoodCategory,setEmptyFoodCategory] = useState(0);
    const [restFoodType,setFoodType] = useState("0");
    const [emptyFoodType,setEmptyFoodType] = useState(0);

    //Fuctions to enter the values in the form for new dish
    const handleItemName = (event) => {
        setItemName(event.target.value);
        setEmptyItemName(0);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
        setEmptyPrice(0);
    }

    // Function to add new item to the list
    const AddNewItem = (event) => {
        event.preventDefault();
        let item = {};
        if(foodCategory!=="0"){
            item = {item_name,foodCategory,restFoodType,price};
        }
        else{
            item = {item_name,restFoodType,price};
        }
        if(item_name.length===0){
            setEmptyItemName(1);
        }
        if(price.length===0){
            setEmptyPrice(1);
        }
        if(foodCategory==="0"){
            setEmptyFoodCategory(1);
        }
        if(restFoodType==="0"){
            setEmptyFoodType(1);
        }
        if(checkValidation()){
            console.log(item);
            AddFoodItem(rest_id,item).then((response)=>{
                // console.log(response.data);
                setItemList(response.data);
            }).catch(error =>{
                console.error(error);
            })
            ClearForm();
        }
    }

    // Fuction to clear form
    const ClearForm = () => {
        setEmptyItemName(0);
        setEmptyPrice(0);
        setEmptyFoodCategory(0);
        setEmptyFoodType(0);
        setItemName('');
        setPrice('');
        setFoodCategory("0");
        setFoodType("0")
        document.getElementById("exampleFormControlInput1").value="";
        document.getElementById("exampleFormControlInput2").value="";
        document.getElementById("foodCategory").value="0";
        document.getElementById("foodType").value="0";
    }
    
    // Fuction to check Validations for different input fields in the form
    const checkValidation = () => {
        if(item_name.length!==0 && price.length!==0 && restFoodType!=="0"){
            return true;
        }
        return false;
    }

    // Function to get the filled food category from the form. 
    const CheckFoodCategory = (event) => {
        const selectedCategory = event.target.value;
        setFoodCategory(selectedCategory);
        setEmptyFoodCategory(0);
    }

    const CheckFoodType = (event) => {
        const selectedType = event.target.value;
        setFoodType(selectedType);
        setEmptyFoodType(0);
    }

    // States and functions for removal of food items.  
    const [showCheckboxes2, setShowCheckboxes2] = useState(false);
    const [selectedFoodCategory, setSelectedFoodCategory] = useState([]);
    const [showSelectMessage2, setShowSelectMessage2] = useState(false);
    const [showConfirmMessage2, setShowConfirmMessage2] = useState(false);

    const toggleCheckboxes2 = () => {
        setShowCheckboxes2(!showCheckboxes2);
        setShowSelectMessage2(!showCheckboxes2);
        setShowConfirmMessage2(false);
        setSelectedFoodCategory([]);
    };

    const handleSelectedFoodCategory = (name) => {
        setSelectedFoodCategory((prevSelected) =>
        prevSelected.includes(name)
            ? prevSelected.filter((CategoryName) => CategoryName !== name)
            : [...prevSelected, name]
        );
    };

    const handleRemoveFoodCategory = () => {
        if (selectedFoodCategory.length === 0) {
            alert("Please select at least one restaurant to remove.");
            return;
        }
        setShowSelectMessage2(false);
        setShowConfirmMessage2(true);
    };

    const cancelRemoveFoodCategory = () => {
        // console.log("Removing restaurants with IDs:", selectedItems);
        setShowCheckboxes2(false);
        setShowConfirmMessage2(false);
        setSelectedFoodCategory([]);
        setShowSelectMessage2(false);
    };

    const confirmRemoveFoodCategory = () => {
        // console.log("Removing food items with IDs:", selectedFoodCategory);
        // Reset state
        // setSelectedFoodCategory(selectedFoodCategory)
        selectedFoodCategory.forEach((category)=>{categories.splice(categories.indexOf(category),1)})
        const itemsId = selectedFoodCategory;
            RemoveCategories(rest_id,{itemsId}).then((response)=>{
            // console.log(response.data);
            setItemList(response.data);
        }).catch(error =>{
            console.error(error);
        })
        setFoodTitle("all")
        setShowCheckboxes2(false);
        setShowConfirmMessage2(false);
        setSelectedFoodCategory([]);
    };
    const confirmNotRemoveFoodCategory = () => {
        // console.log("Removing food items with IDs:", selectedItems);
        setShowCheckboxes2(false);
        setShowConfirmMessage2(false);
        setSelectedFoodCategory([]);
    };

    // States and functions for removal of food items.  
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showSelectMessage, setShowSelectMessage] = useState(false);
    const [showConfirmMessage, setShowConfirmMessage] = useState(false);

    const toggleCheckboxes = () => {
        setShowCheckboxes(!showCheckboxes);
        setShowSelectMessage(!showCheckboxes);
        setShowConfirmMessage(false);
        setSelectedItems([]);
    };

    const handleSelectedItem = (id) => {
        setSelectedItems((prevSelected) =>
        prevSelected.includes(id)
            ? prevSelected.filter((restaurantId) => restaurantId !== id)
            : [...prevSelected, id]
        );
    };

    const handleRemoveItems = () => {
        if (selectedItems.length === 0) {
            alert("Please select at least one restaurant to remove.");
            return;
        }
        setShowSelectMessage(false);
        setShowConfirmMessage(true);
    };

    const cancelRemoveItems = () => {
        // console.log("Removing restaurants with IDs:", selectedItems);
        setShowCheckboxes(false);
        setShowConfirmMessage(false);
        setSelectedItems([]);
        setShowSelectMessage(false);
    };

    const confirmRemoveItems = () => {
        console.log("Removing food items with IDs:", selectedItems);
        // Reset state
        const itemsId = selectedItems;
            RemoveItems(rest_id,{itemsId}).then((response)=>{
            console.log(response.data);
            setItemList(response.data);
        }).catch(error =>{
            console.error(error);
        })
        setShowCheckboxes(false);
        setShowConfirmMessage(false);
        setSelectedItems([]);
    };
    const confirmNotRemoveItems = () => {
        console.log("Removing food items with IDs:", selectedItems);
        setShowCheckboxes(false);
        setShowConfirmMessage(false);
        setSelectedItems([]);
    };

    // State for description, address, and contact details
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [contactDetails, setContactDetails] = useState("");

    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isEditingContactDetails, setIsEditingContactDetails] = useState(false);

    const [newDescription, setNewDescription] = useState(description);
    const [newAddress, setNewAddress] = useState(address);
    const [newContactDetails, setNewContactDetails] = useState(contactDetails);

    const handleDescriptionKeyDown = (e) => {
        if (e.key === 'Enter') {
            setDescription((prevDescription) => prevDescription + '\n' + newDescription);
        }
    };

    const handleAddressKeyDown = (e) => {
        if (e.key === 'Enter') {
            setAddress((prevAddress) => prevAddress + '\n' + newAddress);
        }
    };

    const handleContactDetailsKeyDown = (e) => {
        if (e.key === 'Enter') {
            setContactDetails((prevContactDetails) => prevContactDetails + '\n' + newContactDetails);
        }
    };

    // Handle save functions
    const handleSaveDescription = () => {
        setDescription(newDescription);
        setIsEditingDescription(false);
    };

    const handleSaveAddress = () => {
        setAddress(newAddress);
        setIsEditingAddress(false);
    };

    const handleSaveContactDetails = () => {
        setContactDetails(newContactDetails);
        setIsEditingContactDetails(false);
    };

    // For edit item page
    const handleUpdateItem = (updatedItem) => {
        // Implement the logic to update the item in your ItemList
        // This might involve updating the state or making an API call
    };
    
    const GoToRestaurant = () =>{
        navigate("/restaurant");
    }

    return (
        <div>
            {/* Back Button */}
            <div className='d-flex mt-5 align-items-center' style={{marginLeft:"12vw"}}>
                <div className='bg-secondary rounded-circle'><i className="fa-solid fa-arrow-left px-3 py-3 text-white" onClick={GoToRestaurant}></i></div>
                <h5 className='mx-2 fs-4'>Back to Restaurant Page</h5>
            </div>
            {/* <Navbar></Navbar> */}
            <div className="container" style={{ width: '80vw' }}>
                <div style={{ textAlign: 'center' }}>

                    {/* Image of restaurant */}
                    <img src={logo} style={{ height: '20vh', width: '15vw' }} alt="Restaurant Logo" /><br/>

                    {/* Name of the restaurant */}
                    <div className='d-flex justify-content-between align-items-center mt-3 px-5'>
                        <span className="category-title fs-2 text-dark"><b>Restaurant Name</b></span>
                        <div>
                            {!isEditing ? (
                                <button className="btn btn-secondary" onClick={handleEditClick}>Edit</button>
                            ):(
                                <button className="btn btn-primary mx-3" onClick={handleSaveClick}>Save</button>
                            )}
                        </div>
                    </div>
                    <hr style={{border:"2px solid #ffc107",marginTop:"2vh"}}></hr>
                    <div className={`container ${isEditing?"":"bg-light"}`}>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex justify-content-center flex-grow-1'>
                                {isEditing ? (
                                    <div className='d-flex align-items-center'>
                                        <input type="text"
                                            value={newRestaurantName}
                                            onChange={handleNameChange}
                                            className="form-control"
                                            style={{ fontSize: "5vh", width:"50vw", marginLeft:"3vw"}}
                                        />
                                    </div>
                                ) : (
                                    <h1 style={{color:"brown", fontSize: "7vh"}}>{restaurantName}</h1>
                                    
                                )}
                            </div>
                        </div>
                    </div>

                    <hr style={{ border: "2px solid #ffc107" }}></hr>

                    {/* Accordian section */}
                    <div className="container mt-5 py-3 border rounded" style={{backgroundColor: "beige"}}>
                        <h2 className="text-start mb-4 mx-5 fs-2 text-dark"><b>Other Details</b></h2>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Address</Accordion.Header>
                                <Accordion.Body>
                                    {isEditingAddress ? (
                                        <div className='d-flex align-items-center'>
                                            <textarea type="text"
                                                value={newAddress}
                                                onChange={(e) => {setNewAddress(e.target.value)}}
                                                onKeyDown={handleAddressKeyDown}
                                                className="form-control my-auto"
                                                style={{width:"70vw", marginRight:"1vw"}}
                                            />
                                            <button className="btn btn-primary" onClick={handleSaveAddress}>Save</button>
                                        </div>
                                    ) : (
                                        <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                            <div style={{color:`${address.length===0?"#ff4500":"black"}`}}>{address.length===0?"No address available":address.split('\n').map((line, index) => (
                                                    <div key={index}>
                                                        {line}
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="btn btn-secondary" onClick={() => setIsEditingAddress(true)}>Edit</button>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Contact Details</Accordion.Header>
                                <Accordion.Body>
                                    {isEditingContactDetails ? (
                                        <div className='d-flex align-items-center'>
                                            <texarea type="text"
                                                value={newContactDetails}
                                                onChange={(e) => setNewContactDetails(e.target.value)}
                                                onKeyDown={handleContactDetailsKeyDown}
                                                className="form-control"
                                                style={{width:"70vw", marginRight:"1vw"}}
                                            />
                                            <button className="btn btn-primary" onClick={handleSaveContactDetails}>Save</button>
                                        </div>
                                    ) : (
                                        <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                            <div style={{color:`${contactDetails.length===0?"#ff4500":"black"}`}}>{contactDetails.length===0?"No contact details available":contactDetails.split('\n').map((line, index) => (
                                                    <div key={index}>
                                                        {line}
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="btn btn-secondary" onClick={() => setIsEditingContactDetails(true)}>Edit</button>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Description</Accordion.Header>
                                <Accordion.Body>
                                    {isEditingDescription ? (
                                        <div className='d-flex align-items-center'>
                                            <textarea type="text"
                                                value={newDescription}
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                onKeyDown={handleDescriptionKeyDown}
                                                className="form-control"
                                                style={{width:"70vw", marginRight:"1vw"}}
                                            />
                                            <button className="btn btn-primary" onClick={handleSaveDescription}>Save</button>
                                        </div>
                                    ) : (
                                        <div className='d-flex justify-content-between align-items-center text-start fs-5'>
                                            <div style={{color:`${description.length===0?"#ff4500":"black"}`}}>
                                                {description.length===0?"No description available": description.split('\n').map((line, index) => (
                                                    <div key={index}>
                                                        {line}
                                                        <br />
                                                    </div>
                                                ))}
                                                </div>
                                            <button className="btn btn-secondary" onClick={() => setIsEditingDescription(true)}>Edit</button>
                                        </div>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    
                    {/* Menu List */}
                    <h2 className='menu' style={{ color: 'rgb(10, 26, 60)', marginTop: '12vh' }}><span className='border-bottom border-5 px-2 border-warning'>Menu List</span></h2>
                
                </div>

                {/* Food Categories */}
                <div className='d-flex justify-content-between align-items-center mt-3 px-5'>
                    <span className="category-title fs-2 text-dark"><b>Food Categories</b></span>
                    <div className='d-flex align-items-center'>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={handleInputChange}
                            className="form-control d-inline-block mx-2"
                            style={{ width: "250px" }}
                            placeholder="Category (snacks, deserts, etc.)"
                        />
                        <button className="btn btn-success mx-1" onClick={handleAddCategory}>Add</button>
                        {/* <button className="btn btn-danger mx-1">Delete</button> */}
                        <button className={`btn ${showCheckboxes2 ? "btn-warning" : "btn-danger"} mx-1 ${showConfirmMessage2? "disabled":""}`} type="button" onClick={showCheckboxes2 ? handleRemoveFoodCategory : toggleCheckboxes2}>
                        {showCheckboxes2 ? "Confirm Deletion" : "Delete"}
                        </button>
                    </div>
                </div>
                <hr style={{ border: "2px solid chartreuse" }}></hr>

                {showSelectMessage2 && (
                    <div>
                        <div className="alert alert-info text-center fs-4" role="alert">
                            Select the categories you want to remove
                            <b><span className='px-5 mx-3 text-warning fs-3'>OR</span></b>
                            <button className="btn btn-secondary mx-3 fs-5" onClick={cancelRemoveFoodCategory}>Cancel Removal</button>
                        </div>
                        <div className="alert alert-warning text-center fs-4" role="alert">
                            All items of the selected category will get deleted on confirmation.
                        </div>
                    </div>
                )}
                {showConfirmMessage2 && (
                    <div>
                        <div className="alert alert-danger text-center fs-4" role="alert">
                            All items of the selected category will get deleted on confirmation.
                        </div>
                        <div className="alert alert-warning text-center fs-4" role="alert">
                            Are you sure you want to remove the selected categories?
                            <button className="btn btn-danger mx-3 fs-5" onClick={confirmRemoveFoodCategory}>Yes, Remove</button>
                            <button className="btn btn-primary mx-3 fs-5" onClick={confirmNotRemoveFoodCategory}>No, Keep them</button>
                        </div>
                    </div>
                )}

                {/* Different Food categories*/}
                <nav className='row my-4 pt-3 fw-bold'>
                    <div className={`d-flex col-12 mb-2 justify-content-center`} style={{alignItems: 'center' }}>
                        <div id="all" className={`category ${foodTitle === "all" ? 'border-secondary border-bottom border-3' : ''}`}
                            onClick={HandleClick} onMouseOver={changeColorIn} onMouseOut={changeColorOut}
                            style={{ cursor: 'pointer',fontSize:'4vh',color:"cadetblue" }}>
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
                            <div className='align-items-center my-auto'>
                                {showCheckboxes2 && (
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        style={{marginLeft:10, width: "3.5vh", height: "3.5vh"}}
                                        checked={selectedFoodCategory.includes(category)}
                                        onChange={() => handleSelectedFoodCategory(category)}
                                    />
                                )}
                            </div>
                            {/* <i className="fa-solid fa-trash px-3" role="button" onClick={() => handleRemoveCategory(category)}  onMouseOver={changeColorBin} onMouseOut={changeColorOut}></i> */}
                        </div>
                    ))}
                </nav>


                <div className="row">
                    {/* <div className="d-flex col-6 my-4" style={{ alignItems: 'center' }}>
                        <div>
                            <img src={pancake} style={{ height: '25vh', width: '15vw', border: '4px solid #c56967', borderRadius: '2%' }} alt="Buttermilk Pancakes" />
                        </div>
                        <div className="menu-item-details px-3">
                            <div className='d-flex justify-content-between'>
                                <span className="item">Buttermilk Pancakes</span>
                                <span className="price">$15.99</span>
                            </div>
                            <hr />
                            <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                        </div>
                    </div> */}

                    {ItemList.filter((item)=>{return item.restFoodType==="Veg" && (foodTitle==="all" || item.foodCategory===foodTitle)}).length>0 && <div className='fs-2 fw-bold mx-3 mb-3'>______________ Veg Items ______________</div>}
                    {ItemList.map(item =>
                        item.restFoodType==="Veg" && (foodTitle==="all" || item.foodCategory===foodTitle) && <div className="d-flex col-6 my-4" key={item.item_id} style={{alignItems:"center"}}>
                            <div>
                                <img src={pancake} style={{ height: '25vh',width:"15vw", border: '4px solid #c56967', borderRadius: '2%' }} alt="Buttermilk Pancakes" />
                            </div>
                            <div className="menu-item-details px-3">
                                <div className='d-flex justify-content-between' style={{width:"95%", alignItems:"center"}}>
                                    <div className='d-flex w-75'>  
                                        <div>
                                        {showCheckboxes && (
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                style={{marginRight:10, width: "4vh", height: "4vh"}}
                                                checked={selectedItems.includes(item.item_id)}
                                                onChange={() => handleSelectedItem(item.item_id)}
                                            />
                                        )}</div>
                                        <div className="item">{item.item_name}</div>
                                    </div>
                                    <div className="price">Rs. {item.price}</div>
                                </div>
                                <hr/>
                                <div className='d-flex align-items-center'>
                                    <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                                    <EditItem
                                        item={item}
                                        categories = {categories}
                                        handleUpdate={handleUpdateItem}
                                        // key={item.item_id}
                                        // value={item}
                                    />
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
                                        <div>
                                        {showCheckboxes && (
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                style={{marginRight:10, width: "4vh", height: "4vh"}}
                                                checked={selectedItems.includes(item.item_id)}
                                                onChange={() => handleSelectedItem(item.item_id)}
                                            />
                                        )}</div>
                                        <div className="item">{item.item_name}</div>
                                    </div>
                                    <div className="price">Rs. {item.price}</div>
                                </div>
                                <hr/>
                                <div className='d-flex align-items-center'>
                                    <p className="description">I'm baby woke mlkshk wolf bitters live-edge blue bottle hammock freegan copper mug whatever cold-pressed</p>
                                    <EditItem
                                        item={item}
                                        categories = {categories}
                                        handleUpdate={handleUpdateItem}
                                        // key={item.item_id}
                                        // value={item}
                                    />
                                </div>
                            </div>
                        </div>
                        )
                    }
                    {ItemList.filter((item)=>{return (foodTitle==="all" || item.foodCategory===foodTitle)}).length===0 && 
                    (<div className='bg-light py-4'>
                        <div className='fs-1 text-center text-danger fw-bold'>No Items Available</div>
                        <p className={`${foodTitle==="all"?"fs-1":"fs-2"} text-center`}>{foodTitle==="all"?"Add Items in your menu list to show here.":"Add at least 1 item or this category gets deleted next time you visit this 'Edit Restaurant' page"}</p>
                    </div>)}
                </div>


                {showSelectMessage && (
                    <div className="alert alert-info text-center fs-4" role="alert">
                    Select the restaurants you want to remove
                    <b><span className='px-5 mx-3 text-warning fs-3'>OR</span></b>
                    <button className="btn btn-secondary mx-3 fs-5" onClick={cancelRemoveItems}>Cancel Removal</button>
                    </div>
                )}
                {showConfirmMessage && (
                    <div className="alert alert-warning text-center fs-4" role="alert">
                    Are you sure you want to remove the selected restaurants?
                    <button className="btn btn-danger mx-3 fs-5" onClick={confirmRemoveItems}>Yes, Remove</button>
                    <button className="btn btn-primary mx-3 fs-5" onClick={confirmNotRemoveItems}>No, Keep them</button>
                    </div>
                )}


                <div className='d-flex flex-row flex-wrap justify-content-center my-5 py-5 bg-dark'>
                    {/* Add Food Item Button */}
                    <button className="btn btn-primary mx-5 px-5 fs-5"  data-bs-toggle="modal" data-bs-target="#exampleModal" type="button">Add Dishes</button>

                    {/*New Food Item Form */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3 mx-auto" id="exampleModalLabel" style={{paddingLeft:"2vw"}}>Add New Meal (or beverage)</h1>
                            <button type="button" className="btn-close mx-0" data-bs-dismiss="modal" aria-label="Close" onClick={ClearForm}></button>
                        </div>

                        {/* Modal Body containing item form */}
                        <div className="modal-body">
                            {/* Food Item details in form*/}
                            <div className="mx-3" style={{width:"33vw"}}>
                                <div className='py-3 text-center h5 text-secondary'>Food Item Details (required)</div>
                                <div className='card mb-4 rounded'>
                                    <div className="card-body bg-white shadow-sm rounded-top pb-1">
                                        <div>
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Item Name</label>
                                            <input type="text" className={`form-control ${emptyItemName===1?'is-invalid':''}`} id="exampleFormControlInput1" placeholder="Enter Item Name" onChange={handleItemName} autoComplete='off'/>
                                            {emptyItemName===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                                *Required
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="card-body bg-white shadow-sm pb-1">
                                        <div>
                                            <label htmlFor="exampleFormControlInput2" className="form-label">Price</label>
                                            <input type="number" className={`form-control ${emptyPrice===1?'is-invalid':''}`} id="exampleFormControlInput2" placeholder="Rs 00.00" onChange={handlePrice} autoComplete='off'/>
                                            {emptyPrice===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                                *Required
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="card-body bg-white shadow-sm pb-1">
                                        <div>
                                            <label htmlFor="exampleFormControlInput3" className="form-label">Food Type</label>
                                            <select defaultValue={'0'} className={`form-select ${emptyFoodType===1?'is-invalid':''}`}  onChange={CheckFoodType} aria-label="Default select example" id="foodType">
                                                <option value="0" disabled>Select Type</option>
                                                <option value="Veg">Veg</option>
                                                <option value="Non-Veg">Non-Veg</option>
                                            </select>
                                            {emptyFoodType===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                                *Required
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="card-body bg-white shadow-sm rounded-bottom">
                                        <div className='mb-3'>
                                            <label htmlFor="foodCategory" className="form-label">Food Category</label>
                                            <select value={foodCategory} className={`form-select`} onChange={CheckFoodCategory} aria-label="Default select example" id="foodCategory" >
                                                <option value="0" disabled>Select Category (Add categories for more options)</option>
                                                {categories.slice(1).map((category) => (
                                                    <option key={category} value={category}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* {emptyFoodCategory === 1 && (
                                                <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                                    *Required
                                                </div>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ClearForm}>Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss={`${checkValidation()?"modal":""}`} onClick={AddNewItem}>Add to list</button>
                        </div>
                        </div>
                    </div>
                    </div>

                    {/* Remove Restaurant Button */}
                    <button className={`btn ${showCheckboxes ? "btn-warning" : "btn-danger"} mx-3 px-5 fs-5 ${showConfirmMessage? "disabled":""}`} type="button" onClick={showCheckboxes ? handleRemoveItems : toggleCheckboxes} disabled={ItemList.filter((item)=>{return (foodTitle==="all" || item.foodCategory===foodTitle)}).length===0?true:false}>
                    {showCheckboxes ? "Confirm Removal" : "Remove Dishes"}
                    </button>
                </div>
            </div>
        </div>
    )
}
