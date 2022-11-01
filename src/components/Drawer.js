import React from "react"
import {Link} from 'react-router-dom'

export default function Drawer({handleToggleCart,  onRemove, itemsCart, setTotalPrice, totalPrice}) {

    return (
    <div onClick={handleToggleCart}  className="overlay ">
      <div onClick={(e) => { e.stopPropagation()}} className="drawer">
          <h2 className='d-flex justify-between mb-30'>
            Cart
            <img onClick={handleToggleCart} className='cu-p' src="/img/btn-remove.svg" alt="Remove" />
          </h2>
          {itemsCart.length ? 
            <div className="drawerContent">
              <div className="items">
                {itemsCart.map((obj) => (
                  <div className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                    <div className='mr-20 flex'>
                        <p className='mb-5'>{obj.title}</p>
                        <b>{obj.price}$</b>
                    </div>
                    <img onClick={() => onRemove(obj)} className='removeBtn' src="/img/btn-remove.svg" alt="Remove" />
                  </div>
                  ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li> 
                    <span>Subtotal</span>
                    <div></div>
                    <b>US ${totalPrice}</b>
                  </li>
                  
                </ul>
                <Link to='/checkout'>
                  <button className='greenButton' onClick={handleToggleCart}>Go to checkout <img src="/img/arrow.svg" alt="arrow" /></button>
                </Link>
                
              </div>
            </div>
          :
            <div className='emptyDrawer'>
              <img  src="/img/emptyDrawer.png" alt="cart" />
              <h1>Your cart is empty</h1>
              <span>Let's get shopping!</span>
              <button className='greenButton' onClick={handleToggleCart}>
                <img src="/img/arrow.svg" alt="arrow" />
                Start shopping!
              </button>
                      

            </div>
          }
        </div>
    </div>
    )
}

