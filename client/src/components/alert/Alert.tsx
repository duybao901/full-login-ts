import React from 'react'
import Loading from './Loading'
import Toast from './Toast'
import { RootStore } from '../../utils/Typescript'
import { useSelector } from 'react-redux'

export const Alert = () => {
    const { alert } = useSelector((state: RootStore) => state)
    const { loading } = alert
    return (
        <div className="alert">
            {loading && <Loading />}
            {
                alert.errors &&
                <Toast
                    title="Errors"
                    body={alert.errors}
                    bgColor="bg-danger"
                />
            }

            {
                alert.success &&
                <Toast
                    title="Success"
                    body={alert.success}
                    bgColor="bg-success"
                />
            }
        </div>
    )
}

export const alertSuccess = (body: string) => {
    return <div className="alert__success">
        <p>{body}</p>
    </div>
}

export const alertError = (body: string) => {
    return <div className="alert__error">
        <p>{body}</p>
    </div>
}