import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputChange, FormSubmit } from '../../utils/Typescript'
import { login } from '../../redux/actions/authActions'

const LoginPass = () => {

    const dispatch = useDispatch()
    const [user, setUser] = useState({ account: '', password: '' });
    const { account, password } = user;
    const [showPass, setShowPass] = useState(false)

    const onHandleChange = (e: InputChange) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(login(user))
    }

    return (
        <form action="" className="auth-page__form" onSubmit={onHandleSubmit}>

            <div className="auth-page__form-group">
                <label htmlFor="email">Email / Phone number</label>
                <input
                    className="input-primary input-primary--dark"
                    id='email'
                    type="text"
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
            <button
                disabled={(password && account) ? false : true}
                className={`btn-primary btn-primary--black ${(!account || !password) && "btn-disabled"}  auth-page__form-button`}
            >Login</button>


        </form >
    )
}

export default LoginPass
