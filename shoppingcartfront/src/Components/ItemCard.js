import React from 'react'

const ItemCard = ({id, name, picture, price, displayButton, AddCartClick, amount, onRemoveFromCartClick}) => {
    return (
        <div className="bg-blue dib br1 pa2 ma1 bw shadow-5 tc">
            <img src={picture} alt="" width="150" height="100" className="grow"></img>
            <div>
                <h2>{name.replace(/^./, name[0].toUpperCase())}</h2>
                <p>${price}</p>
            </div>
            {displayButton &&
                <input 
                type="submit" 
                value="Add to Cart!"                
                onClick={() => AddCartClick(id)}
                />       
            }   
            {!displayButton &&
                <div>
                    <p>Amount in Cart: {amount}</p>
                    <p className="f5 link dim black underline pa3 pointer"
                    onClick={() => onRemoveFromCartClick(id)}>Remove from Cart</p>
                </div>
            }
            
            
        </div>
    )
}

export default ItemCard;