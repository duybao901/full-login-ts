import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputChange, FormSubmit } from '../../utils/Typescript'
import { register } from '../../redux/actions/authActions'

const RegisterForm = () => {

    const initialState = { name: "", account: "", password: "", cf_password: "" };

    const dispatch = useDispatch()
    const [userRegister, setUserRegister] = useState(initialState);
    const { name, account, password, cf_password } = userRegister;

    const [showPass, setShowPass] = useState(false)
    const [showCfPass, setShowCfPass] = useState(false)


    const onHandleChange = (e: InputChange) => {
        setUserRegister({
            ...userRegister,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(register(userRegister))
    }

    return (
        <form action="" className="auth-page__form" onSubmit={onHandleSubmit}>

            <div className="auth-page__form-group">
                <label htmlFor="name">Name</label>
                <input
                    className="input-primary input-primary--dark"
                    id='name'
                    type="text"
                    name='name'
                    value={name}
                    onChange={onHandleChange}
                ></input>
            </div>


            <div className="auth-page__form-group">
                <label htmlFor="account">Email / Phone number</label>
                <input
                    className="input-primary input-primary--dark"
                    id='account'
                    type="string"
                    name='account'
                    value={account}
                    onChange={onHandleChange}
                ></input>
            </div>

            <div className="auth-page__form-group">
                <label htmlFor="password">Passowrd</label>
                <div className="auth-page__form-pass">
                    <input
                        type={showPass ? "text" : "password"} className="input-primary input-primary--dark"
                        id='password'
                        name='password'
                        value={password}
                        onChange={onHandleChange}

                    ></input>
                    {password && <p className="group__showpass" onClick={() => setShowPass(!showPass)}>{showPass ? "hide" : "show"}</p>}
                </div>
            </div>

            <div className="auth-page__form-group">
                <label htmlFor="cf_password">Passowrd</label>
                <div className="auth-page__form-pass">
                    <input
                        type={showCfPass ? "text" : "password"} className="input-primary input-primary--dark"
                        id='cf_password'
                        name='cf_password'
                        value={cf_password}
                        onChange={onHandleChange}

                    ></input>
                    {cf_password && <p className="group__showpass" onClick={() => setShowCfPass(!showCfPass)}>{showCfPass ? "hide" : "show"}</p>}
                </div>
            </div>

            <button
                disabled={(password && account) ? false : true}
                className={`btn-primary btn-primary--black ${(!account || !password) && "btn-disabled"}  auth-page__form-button`}
            >Register</button>


        </form >
    )
}

export default RegisterForm
