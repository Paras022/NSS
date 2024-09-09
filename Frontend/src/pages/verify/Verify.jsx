import React, { useContext, useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    console.log(success, orderId)
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async (req, res) => {
        const response = await axios.post(url + "/api/orders/verify", { success, orderId })
        if (response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
        console.log("here")
    }, [])
    return (
        <div className='verify'>
            <div className="spinner">

            </div>
        </div>
    )
}

export default Verify
