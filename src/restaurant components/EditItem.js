import React, { useState } from 'react';

export default function EditItem({item, categories, handleUpdate }){
    const [item_name, setItemName] = useState(item.item_name);
    const [emptyItemName,setEmptyItemName] = useState(0);
    const [price,setPrice] = useState(item.price);
    const [emptyPrice,setEmptyPrice] = useState(0);
    const [foodCategory,setFoodCategory] = useState(item.foodCategory?item.foodCategory:"0");
    const [restFoodType,setFoodType] = useState(item.restFoodType);
    const [description, setDescription] = useState(item.description);

    const handleItemName = (event) => {
        setItemName(event.target.value);
        setEmptyItemName(0);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
        setEmptyPrice(0);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const CheckFoodType = (event) => {
        const selectedType = event.target.value;
        setFoodType(selectedType);
    }
    const CheckFoodCategory = (event) => {
        const selectedCategory = event.target.value;
        setFoodCategory(selectedCategory);
    }

    // Fuction to clear form
    const ClearForm = () => {
        setEmptyItemName(0);
        setEmptyPrice(0);
        setItemName(item.item_name);
        setPrice(item.price);
        setFoodCategory(item.foodCategory?item.foodCategory:"0");
        setFoodType(item.restFoodType);
        setDescription(item.description)
        document.getElementById(`item_name-${item.item_id}`).value=item.item_name;
        document.getElementById(`price-${item.item_id}`).value=item.price;
        document.getElementById(`foodCategory-${item.item_id}`).value=item.foodCategory?item.foodCategory:"0";
        document.getElementById(`foodType-${item.item_id}`).value=item.restFoodType;
        document.getElementById(`description-${item.item_id}`).value="";
    }
    
    // Fuction to check Validations for different input fields in the form
    const checkValidation = () => {
        if(item_name.length!==0 && price.length!==0){
            return true;
        }
        return false;
    }

     // Function to add new item to the list
     const handleSaveChanges = (event) => {
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
        if(checkValidation()){
            console.log(item);
            // AddFoodItem(rest_id,item).then((response)=>{
            //     // console.log(response.data);
            //     setItemList(response.data);
            // }).catch(error =>{
            //     console.error(error);
            // })
            ClearForm();
        }
    }

    return (
        <>
        <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target={`#editModal-${item.item_id}`} style={{margin:10}}><b>Edit</b></button>

        <div className="modal fade" id={`editModal-${item.item_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel2">Edit Item</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ClearForm}></button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor={`item_name-${item.item_id}`} className="form-label">Item Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${emptyItemName===1?'is-invalid':''}`}
                                    id={`item_name-${item.item_id}`}
                                    name="item_name"
                                    value={item_name}
                                    onChange={handleItemName}
                                />
                                {emptyItemName===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                    *Required
                                </div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`price-${item.item_id}`} className="form-label">Price</label>
                                <input
                                    type="number"
                                    className={`form-control ${emptyPrice===1?'is-invalid':''}`}
                                    id={`price-${item.item_id}`}
                                    name="price"
                                    value={price}
                                    onChange={handlePrice}
                                />
                                {emptyPrice===1 && <div id="passwordHelpBlock" className="invalid-feedback d-flex mx-2 fs-6">
                                    *Required
                                </div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`foodType-${item.item_id}`} className="form-label">Food Type</label>
                                <select 
                                    defaultValue={restFoodType} 
                                    className={`form-select`} 
                                    onChange={CheckFoodType} 
                                    aria-label="Default select example" 
                                    id={`foodType-${item.item_id}`}>
                                    <option value="0" disabled>Select Type</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg">Non-Veg</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`foodCategory-${item.item_id}`} className="form-label">Food Category</label>
                                <select 
                                    defaultValue={foodCategory}
                                    className={`form-select`} onChange={CheckFoodCategory}
                                    aria-label="Default select example"
                                    id={`foodCategory-${item.item_id}`}
                                    >
                                    <option value="0" disabled>Select Category (Add categories for more options)</option>
                                    {categories.slice(1).map((category) => (
                                        <option key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`description-${item.item_id}`} className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id={`description-${item.item_id}`}
                                    name="description"
                                    value={item.description}
                                    onChange={handleDescription}
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ClearForm}>Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};