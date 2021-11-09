import React, { useState } from 'react'
import { RootStore } from '../../utils/Typescript'
import { useSelector } from 'react-redux'
import { InputChange, IUserProfile, FormSubmit } from '../../utils/Typescript'

const UserInfor = () => {
    const { auth } = useSelector((state: RootStore) => state)

    const initialState = {
        name: '',
        account: '',
        avatar: '',
        password: '',
        cf_password: ''
    }

    const [user, setUser] = useState<IUserProfile>(initialState)

    const { name, account, avatar, password, cf_password } = user

    const handleChangeAvatar = (e: InputChange) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;

        if (files) {
            const file = files[0]
            setUser({
                ...user,
                avatar: file
            })
        }
    }

    const handleChange = (e: InputChange) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
    }

    return (
        <form className="profile__infor" onSubmit={onHandleSubmit}>
            <div className="profile__infor-avatar">
                <img src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar} alt="avatar" />
                <input type='file' id='file_up' name='avatar' onChange={handleChangeAvatar} accept="image/*"></input>
            </div>

            <div className="form__control">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange} defaultValue={name} />
            </div>
            <div className="form__control">
                <label htmlFor="account">Account</label>
                <input type="text" name="account" id="account" onChange={handleChange} defaultValue={account}
                    disabled={auth.user?.type === 'login' ? true : false}
                />
            </div>
            <div className="form__control">
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" onChange={handleChange} defaultValue={password} />
            </div>
            <div className="form__control">
                <label htmlFor="cf_password">Confirm password</label>
                <input type="text" name="cf_password" id="cf_password" onChange={handleChange} defaultValue={cf_password} />
            </div>
            <div className="form__control">
                <button className='profile__button active' type="button">Update</button>
            </div>
        </form>
    )
}

export default UserInfor
