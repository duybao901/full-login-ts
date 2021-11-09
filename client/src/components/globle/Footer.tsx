import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className="footer">
            <h2 className="footer__heading heading heading--white">Coding <span>For</span> Life</h2>
            <div className="footer__content">
                <ul className='footer__socials footer__content-item'>
                    <li className="footer__socials-item">
                        <Link to='' className='item__link'>
                            <i className="ti ti-facebook"></i>
                        </Link>
                    </li>
                    <li className="footer__socials-item">
                        <Link to='' className='item__link'>
                            <i className="ti ti-twitter-alt"></i>
                        </Link>
                    </li>
                    <li className="footer__socials-item">
                        <Link to='' className='item__link'>
                            <i className="ti ti-instagram"></i>
                        </Link>
                    </li>
                    <li className="footer__socials-item">
                        <Link to='' className='item__link'>
                            <i className="ti ti-pinterest"></i>
                        </Link>
                    </li>
                </ul>
                <div className="footer__form footer__content-item">
                    <div className="footer__form-group">
                        <label>Enter your email here</label>
                        <input type='text' className="input-primary input-primary--white"></input>
                    </div>
                    <button className="footer__from-button btn-primary btn-primary--white">Subscribe Now</button>
                </div>
                <div className="footer__text footer__content-item">
                    <p>© 2023 by Coding for Life. <br />
                        Proudly created with DuyBao</p>
                </div>

            </div>
        </div>
    )
}

export default Footer
