import React, { useContext ,useEffect,useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const PlaceOrder = () => {

    

  const {getTotalCartAmount ,token ,food_list , cartItems ,url} = useContext(StoreContext);

  const [deliveryData ,setDeliveryData ]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setDeliveryData(data =>({...data,[name]:value}))
  }

   const placeOrder = async (event) =>{
    event.preventDefault();
     let orderItems = [];
     food_list.map((item) =>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
     })
    
     let orderData ={
      adress:deliveryData,
      items:orderItems,
      amount:getTotalCartAmount() +2,
     }
   
     let response = await axios.post(url+"/api/orders/place" ,orderData ,{headers:{token}})

     if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
     }
     else{
      alert("Error")
     }
   }
   
  
   const navigate = useNavigate();
   useEffect(()=>{
    if(!token){
      toast("Please Sign in to procced");
     
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
   },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'> Delivery Information</p>
        <div className="multi-fields">
          <input required  name='firstName' onChange={onChangeHandler} value={deliveryData.firstName} type="text" placeholder='First Name' />
          <input required  name='lastName' onChange={onChangeHandler} value={deliveryData.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required  name='email' onChange={onChangeHandler} value={deliveryData.email} type="email" placeholder='Email adress' />
        <input required  name='street' onChange={onChangeHandler} value={deliveryData.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required  name='city' onChange={onChangeHandler} value={deliveryData.city} type="text" placeholder='city' />
          <input  required name='state' onChange={onChangeHandler} value={deliveryData.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input  required name='zipcode' onChange={onChangeHandler} value={deliveryData.zipcode} type="text" placeholder='Zip Code' />
          <input required  name='country' onChange={onChangeHandler} value={deliveryData.country} type="text" placeholder='Country' />
        </div>
        <input required  name='phone' onChange={onChangeHandler} value={deliveryData.phone} type="text" placeholder='Phone number' />
      </div>


      <div className="place-order-right">
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
            <button type='submit'>Proceed to Payment</button>
          </div>

      </div>
    </form>
  )
}

export default PlaceOrder