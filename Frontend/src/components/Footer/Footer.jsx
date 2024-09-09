import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} className='footer-logo' alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolorum sed nihil tempore assumenda, neque perferendis beatae sunt incidunt porro. Inventore aut repellendus nam iure nobis eveniet quia rem voluptatum.</p>
                    <div className="footer-social-icons">
                            <img src={assets.facebook_icon} alt="" />
                            <img src={assets.twitter_icon} alt="" />
                            <img src={assets.linkedin_icon} alt="" />

                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in Touch</h2>
                    <ul>
                        <li>+91 9798790</li>
                        <li>newsharmasweets055@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className='footer-copyright'>Copyright 2024 NSS.com-All rights reserved</p>
        </div>
    )
}

export default Footer