import React, { useState } from 'react'
import { FormSubmit } from '../../utils/Typescript'
import { loginSms } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'

const SmsPass = () => {
    const dispatch = useDispatch()
    const [phone, setPhone] = useState('+84327139346');

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(loginSms(phone))
    }

    return (
        <form action="" className="auth-page__form" onSubmit={onHandleSubmit}>

            <div className="auth-page__form-group">
                <label htmlFor="phone">Phone number</label>
                <input
                    className="input-primary input-primary--dark"
                    id='phone'
                    type="string"
                    value={phone}
                    placeholder="+84327139248"                    
                    onChange={(e) => setPhone(e.target.value)}
                ></input>
            </div>

            <button
                disabled={!phone ? true : false}
                className={`btn-primary btn-primary--black ${!phone && "btn-disabled"} auth-page__form-button1`}>
                Login
            </button>
        </form >
    )
}

export default SmsPass
