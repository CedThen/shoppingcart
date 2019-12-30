import React from 'react';
import ItemCard from './ItemCard.js';

const CartBar = ({cartList, onRemoveFromCartClick}) => {
    let cartArray = cartList.map(item => {
        return <ItemCard 
            key={item.id}
            id={item.id}
            name={item.name} 
            picture={item.picture} 
            price={item.price}
            displayButton={false}
            amount={item.amount}
            onRemoveFromCartClick={onRemoveFromCartClick}/>
    });
    function reduceCallback (acc, currentItem) {
        let itemTotal = parseFloat(currentItem.price) * parseFloat(currentItem.amount);
        return acc + itemTotal;
    }
    let cartTotal = 0;
    if(cartList.length > 0){
        cartTotal = cartList.reduce(reduceCallback, 0);        
    }
    return (
        <div className="ba">
            <h2 className="tc">Cart</h2>
            <p className="tc">Total is ${cartTotal.toFixed(2)}</p>
            {cartArray}
        </div>
    )
}

export default CartBar;