import React, { useState,useEffect,useRef,useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import navContext from './Context/navContext'

export default function ItemCounter({item}) {

    const context = useContext(navContext);
    const {cartItems,setCartItems} = context;

    const curr_item = cartItems.find(cartItem => cartItem.item_id === item.item_id)
    const [itemCount, setItemCount] = useState(curr_item === undefined ? 0 : curr_item.quantity);

    const popoverRef = useRef(null);
    let popoverInstance = useRef(null);

    useEffect(() => {
        const popoverElement = popoverRef.current;
        if (popoverElement) {
            if (!popoverInstance.current) {
                popoverInstance.current = new window.bootstrap.Popover(popoverElement, {
                    content: 'Order limit is 10',
                    trigger: 'manual',
                    placement: 'top',
                });
            }

            if (itemCount === 10) {
                popoverInstance.current.show();
                setTimeout(() => {
                    popoverInstance.current.hide();
                }, 2000);
            } 
            else {
                popoverInstance.current.hide();
            }
        }
    }, [itemCount]);
  
    const increaseCount = () => {
        if (itemCount < 10) {
            const newCount = itemCount + 1;
            setItemCount(newCount);
            
            setCartItems((prevItems) => {
                // Check if item is already in the cart
                const existingItem = prevItems.find(cartItem => cartItem.item_id === item.item_id);
                if (existingItem) {
                    // Update the count of the existing item
                    return prevItems.map(cartItem => 
                        cartItem.item_id === item.item_id 
                        ? { ...cartItem, quantity: newCount } 
                        : cartItem
                    );
                } 
                else {
                    // Add new item to the cart
                    return [...prevItems, { ...item, quantity: newCount }];
                }
            });
        }
        // console.log(cartItems);
    };
    
    const decreaseCount = () => {
        if (itemCount > 0) {
            const newCount = itemCount - 1;
            setItemCount(newCount);
            if(itemCount===1){
                setCartItems((prevList) =>
                    prevList.filter((listItem) => listItem.item_id !== item.item_id)
                );
            }
            else{
                setCartItems((prevItems) => {
                    return prevItems.map(cartItem => 
                        cartItem.item_id === item.item_id 
                        ? { ...cartItem, quantity: newCount } 
                        : cartItem
                    );
                })
            }
        }
        // console.log(cartItems);
    };

    return (
        <div id={`counter-${item.item_id}`} className="ms-2">
        {window.location.pathname !== "/order"? (cartItems.find(cartItem => cartItem.item_id === item.item_id) === undefined ? (
            <div>
                <button className="btn btn-outline-secondary ms-1" onClick={increaseCount}>+</button>
                <h5 className='my-2'>ADD</h5>
            </div>
            ) : (
            <div>
                <div className="d-flex border border-black rounded border-1 ms-2 p-1">
                    <button className="btn btn-outline-danger rounded p-0 border-2 fs-5 fw-bold pb-1 btn-sm" onClick={decreaseCount} style={{width: '6vh' }}>-</button>
                    <h4 className="mx-2 my-auto">{cartItems.find(cartItem => cartItem.item_id === item.item_id).quantity}</h4>
                    <button className="btn btn-outline-success rounded p-0 border-2 fs-5 fw-bold pb-1 btn-sm" onClick={increaseCount} ref={popoverRef} style={{width: '6vh' }}>+</button>
                </div>
                <h5 className='my-2 text-center'>ADDED</h5>
            </div>
        )):(
            <div>
                <div className="d-flex mb-1">
                    <button className="btn btn-outline-secondary p-0" onClick={decreaseCount} style={{ height: '5vh', width: '5vh' }}>-</button>
                    <p className="mx-2 my-auto">{cartItems.find(cartItem => cartItem.item_id === item.item_id).quantity}</p>
                    <button className="btn btn-outline-secondary p-0" onClick={increaseCount} ref={popoverRef} style={{ height: '5vh', width: '5vh' }}>+</button>
                </div>
            </div>
        )}
        </div>
    )
}