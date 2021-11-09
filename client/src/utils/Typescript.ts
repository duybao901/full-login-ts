import { ChangeEvent } from 'react'
import rootReducer from '../redux/reducers/index'

export type InputChange = ChangeEvent<HTMLInputElement>
export type FormSubmit = ChangeEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>
export interface IParams {
    page: string
    slug: string
}

export interface IUserLogin {
    account: string
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string
    cf_password: string
}


export interface IUser extends IUserRegister {
    avatar: string
    createdAt: string
    role: string
    type: string
    updatedAt: string
    __v: 0
    _id: string
}

export interface IUserProfile extends IUserRegister {
    avatar: string | File
}
