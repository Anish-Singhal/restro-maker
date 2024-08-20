import React, { useState } from 'react'
import "./Order.css"
import Navbar from './Navbar';

export default function Order(){
    const [cartItems,setCartItems] = useState([
        { id: 1, title: 'Greek Salad', price: 12, quantity: 2, imageUrl: 'path_to_greek_salad_image' },
        { id: 2, title: 'Peri Peri Rolls', price: 12, quantity: 3, imageUrl: 'path_to_peri_peri_rolls_image' }
    ]);

    const subtotal = 60;
    const deliveryFee = 5;
    const total = subtotal + deliveryFee;

    const removeItem = (id) => {
        // Implement remove functionality
    };

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
                        <tr key={item.id}>
                            <td><img src={item.imageUrl} alt={item.title} /></td>
                            <td>{item.title}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                            <td><a href="/" className="remove" onClick={() => removeItem(item.id)}>x</a></td>
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
                        <span>${subtotal}</span>
                    </div>
                    <div className="delivery-fee border-top border-2">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee}</span>
                    </div>
                    <div className="total border-top border-2">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <div>
                        <a href="/" className="my-2 checkout-button">PROCEED TO CHECKOUT</a>
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
