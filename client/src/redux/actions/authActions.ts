
import { Dispatch } from 'react'
import { IUserLogin, IUserRegister } from '../../utils/Typescript'
import { getAPI, postAPI } from '../../utils/FetchData'
import { AUTH, IAuthType } from '../types/authTypes'
import { ALERT, IAlertType } from '../types/alertTypes'
import { validRegister, validPhone } from '../../utils/valid'

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const { account, password } = userLogin;
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await postAPI('login', { account, password })

        dispatch({
            type: AUTH,
            payload: { ...res.data }
        })
        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
        localStorage.setItem("firstLogin", 'dev-blog')

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const register = (userRegister: IUserRegister) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const errors = validRegister(userRegister);

    if (errors.length > 0) {
        return dispatch({ type: ALERT, payload: { errors } })
    } else {
        try {
            dispatch({ type: ALERT, payload: { loading: true } })

            const res = await postAPI('register', userRegister)

            dispatch({ type: ALERT, payload: { loading: false } })
            dispatch({ type: ALERT, payload: { success: res.data.msg } })
        } catch (err: any) {
            return dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
        }
    }
}

export const refrestToken = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin !== 'dev-blog') return;

    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await getAPI('refresh_token');

        dispatch({
            type: AUTH,
            payload: { ...res.data }
        })
        dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const logout = () => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        localStorage.removeItem('firstLogin')
        const res = await getAPI('logout');
        dispatch({
            type: AUTH,
            payload: {}
        })
        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const loginGoogle = (id_token: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {

    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await postAPI('login_google', { id_token })

        dispatch({
            type: AUTH,
            payload: { ...res.data }
        })
        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
        localStorage.setItem("firstLogin", 'dev-blog')
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}


export const loginSms = (phone: string) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {

    const valid = validPhone(phone)
    if (!valid) return

    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await postAPI('login_sms', { phone })

        if (!res.data.valid)
            verifySms(phone, dispatch)
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

const verifySms = async (phone: string, dispatch: Dispatch<IAuthType | IAlertType>) => {
    const code = prompt("Enter your code here.")
    if (!code) return;

    try {
        dispatch({ type: ALERT, payload: { loading: true } })

        const res = await postAPI('verify_sms', { phone, code })
        
        dispatch({ type: AUTH, payload: res.data })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
        localStorage.setItem('logged', 'devat-channel')
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })    
        setTimeout(() => {
            verifySms(phone, dispatch)
        },500)  
    }
}