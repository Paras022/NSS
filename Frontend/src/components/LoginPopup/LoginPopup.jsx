import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"
const LoginPopup = ({ setShowLogin }) => {

    const {url ,setToken } = useContext(StoreContext)

    const [currentState, setCurrentState] = useState("Sign Up")
    const [data ,setData] = useState({
        name:"",
        email:"",
        password:""
    })


    // saves the input data into setdata 
    const onChangeHandler = (event) =>{
        const name = event.target.name 
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) =>{
            event.preventDefault()
            let newUrl = url;
            if(currentState == "login"){
                newUrl+="/api/user/login"
            }
            else{
                newUrl += "/api/user/register"
                
            }

            const response = await axios.post(newUrl ,data);

            if(response.data.token){
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token)
                setShowLogin(false)
            }
            else{
                alert(response.data.message)
                console.log(newUrl);
                setShowLogin(false)
            }
    }


    return (
        <div className='login-popup'>
            <form  onSubmit ={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "login" ? <></> : <input name ='name' onChange= {onChangeHandler} value ={data.name} type="text" placeholder='Your name' required />}

                    <input  name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <input  name ='password' onChange={onChangeHandler} value= {data.password} type="password" placeholder='password' required />
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing I agree to terms of use &  Privacy Policy</p>
                </div>
                {currentState === "login"
                    ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account?<span onClick={() => setCurrentState("login")}>Login here</span></p>
                }
                  <b>OR</b>
                <p>Login with test credentials<br></br>
                   email :paras02@gmail.com<br></br>
                   password:12345678</p>


            </form>
        </div>
    )
}

export default LoginPopup