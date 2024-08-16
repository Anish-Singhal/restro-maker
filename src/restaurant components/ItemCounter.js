import React, { useState,useEffect,useRef} from 'react'
import { Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ItemCounter({item}) {
    
    const [itemCount, setItemCount] = useState(0);
    const [cartItems,setCartItems] = useState([]);

    const popoverRef = useRef(null);
    let popoverInstance = useRef(null);

    // useEffect(() => {

    //     const popoverElement = popoverRef.current;
    //     if (popoverElement) {
    //         if (!popoverInstance.current) {
    //             popoverInstance.current = new Popover(popoverElement, {
    //                 content: 'Order limit is 10',
    //                 trigger: 'manual',
    //                 placement: 'top',
    //             });
    //         }

    //         if (itemCount === 10) {
    //             popoverInstance.current.show();
    //             setTimeout(() => {
    //                 popoverInstance.current.hide();
    //             }, 2000);
    //         } 
    //         else {
    //             popoverInstance.current.hide();
    //         }
    //     }
    
    //     // Clean up function to destroy the popover when the component unmounts
    //     return () => {
    //         if (popoverInstance.current) {
    //         popoverInstance.current.dispose();
    //         popoverInstance.current = null;
    //         }
    //     };
    // }, [itemCount]);
  
    const increaseCount = () => {
        if(itemCount===1){
            setCartItems(...cartItems,item);
            console.log([...cartItems,item]);
        }
        if (itemCount < 10) {
            setItemCount(prevCount => prevCount + 1);
        }
    };
    
    const decreaseCount = () => {
        setItemCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
    };

    return (
        <div id={`counter-${item.item_id}`} className="ms-2">
        {!itemCount ? (
            <div>
                <button className="btn btn-outline-secondary ms-1" onClick={increaseCount}>+</button>
                <h5 className='my-2'>ADD</h5>
            </div>
            ) : (
            <div className="d-flex border border-black rounded border-1 ms-2 p-1">
                <button className="btn btn-danger btn-sm rounded" onClick={decreaseCount} style={{ height: '5vh', width: '5vh' }}>-</button>
                <h4 className="mx-2 my-auto">{itemCount}</h4>
                <button className="btn btn-success btn-sm rounded" onClick={increaseCount} style={{ height: '5vh', width: '5vh' }} ref={popoverRef}>+</button>
            </div>
        )}
        </div>
    )
}
