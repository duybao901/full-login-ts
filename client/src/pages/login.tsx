import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import LoginPass from '../components/auth/LoginPass'
import SmsPass from '../components/auth/SmsPass'
import SocialLogin from '../components/auth/SocialLogin'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/Typescript'

const Login = () => {
    const { auth } = useSelector((state: RootStore) => state)
    const [sms, setSms] = useState(false)
    const history = useHistory()
    const handleChangeSms = () => {
        setSms(!sms)
    }

    useEffect(() => {
        if (auth.access_token) history.push('/')
    }, [auth.access_token, history])

    return (
        <div className="auth-page">
            <div className="Login">
                <h2 className="auth-page__heading">Login In</h2>
                <p className="auth-page__redirect">New to this site?
                    <Link to='/register'> Sign Up</Link>
                </p>

                {!sms ? <LoginPass /> : <SmsPass />}

                <div className="auth-page__forgot">
                    <Link to="/forgot" >Forgot password</Link>
                    <span onClick={handleChangeSms}>{sms ? "Sign in with password" : "Sign in with SMS"}</span>
                </div>

                <div className="auth-page-indicator">
                    <div className="line"></div>
                    <span className='text'>or</span>
                </div>
                <div className='social__login'>
                    <SocialLogin />
                </div>
            </div>

        </div>
    )
}


export default Login
