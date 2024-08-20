import React, { useState,useContext } from 'react'
import "./Order.css"
import Navbar from './Navbar';
import navContext from './Context/navContext'
import ItemCounter from './ItemCounter';
import { NavLink } from 'react-router-dom';

export default function Order(){

    const context = useContext(navContext);
    const {cartItems,setCartItems} = context;

    const subtotal = cartItems.reduce((accum, item) => accum + (item.price * item.quantity), 0);
    const deliveryFee = 50;
    const total = subtotal + deliveryFee;

    const removeItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.item_id !== id));
    };

    const changeColorIn = (e) => {
        e.target.style.color = "red";
    }

    const changeColorOut = (e) => {
        e.target.style.color = "black";
    }

    return (
        <>
        <Navbar></Navbar>
        <div className="container my-5">
            <table className="cart-table border border-1 table">
                <thead>
                    <tr>
                        <th>Items</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.item_id}>
                            <td><img src="images.jpg" alt={item.item_name}/></td>
                            <td>{item.item_name}</td>
                            <td>Rs. {item.price}</td>
                            <td><ItemCounter item={item}/></td>
                            <td>Rs. {item.price * item.quantity}</td>
                            <td><i className="fa-solid fa-trash" onClick={() => removeItem(item.item_id)} onMouseOver={changeColorIn} onMouseOut={changeColorOut}  style={{ cursor: 'pointer'}}></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='d-flex row my-5'>
                {/* <div className='col-1'></div> */}
                <div className="cart-totals col-4 fs-5 justify-content-center mx-4">
                    <div className='fw-bold fs-4'>Cart Total</div>
                    <div className="subtotal">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal}</span>
                    </div>
                    <div className="delivery-fee border-top border-2">
                        <span>Delivery Fee</span>
                        <span>Rs. {deliveryFee}</span>
                    </div>
                    <div className="total border-top border-2">
                        <span>Total</span>
                        <span>Rs. {total}</span>
                    </div>
                    <div>
                        <NavLink className="my-2 checkout-button">PROCEED TO CHECKOUT</NavLink>
                    </div>
                </div>
                <div className="flex-column promo-code col-7 align-items-center justify-content-start">
                    <div className='fs-5'>If you have a promo code, Enter it here</div>
                    <div className='my-2'>
                        <input type="text" placeholder="promo code"/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
