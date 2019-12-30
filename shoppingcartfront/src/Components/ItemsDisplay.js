import React from 'react'
import ItemCard from './ItemCard.js';

const ItemsDisplay = ({itemList, onAddCartClick}) => {
    return (
        <div>
            {itemList.map(item => (
                <ItemCard 
                key = {item.id}
                id = {item.id}
                name={item.name} 
                picture={item.picture} 
                price={item.price}
                displayButton = {true}
                AddCartClick = {onAddCartClick}
                />
            ))}
        </div>
    )
}

export default ItemsDisplay;