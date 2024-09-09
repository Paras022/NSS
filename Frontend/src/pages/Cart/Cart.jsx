import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/storeContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { url ,cartItems, food_list, removeFromCart ,addToCart ,getTotalCartAmount ,removeOneCartItem } = useContext(StoreContext)
  const navigate = useNavigate();

  return (
    <>
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qunatity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item ,index) =>{
          if(cartItems[item._id]>0)
          {
            return(
              <>
              <div className="cart-items-title cart-items-item">
                <img src={ url + "/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price*cartItems[item._id]}</p>
                {/* <p onClick={()=>removeOneCartItem(item._id)} className='removeone'>-</p>
                <p onClick ={()=> addToCart(item._id)} className='addone'>+</p> */}
                <p  onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
              </>
            )
          }
        })}
      </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>₹{getTotalCartAmount()===0?0:20}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount() +20}</p>
              </div>
              
            </div>
            <button onClick={()=> navigate('/order')}>Proceed to Checkout</button>
          </div>

          <div className="cart-promocode">
            <div>
              <p>If you have promo code, enter it here!</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>

    </div>
    
    </>
  )
}

export default Cart