import React from 'react'
import { useDispatch } from 'react-redux'
import { ALERT } from '../../redux/types/alertTypes'
interface IProps {
    title: string
    body: string | string[]
    bgColor: string
}

const Toast = ({ title, body, bgColor }: IProps) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch({ type: ALERT, payload: {} })
    }

    return (
        <div
            className={`toast position-fixed `}
            style={{ position: "absolute", top: "20px", right: "20px" }}
            role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <div className="toast-title">
                    <div className={`toast-title-square ${bgColor}`}></div>
                    <strong className="mr-auto">{title}</strong>
                </div>
                <button onClick={handleClose} type="button" className="ml-2 mb-1 close text-right" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times; </span>
                </button>
            </div>
            <div className="toast-body">
                {
                    typeof (body) === 'string'
                        ? body
                        : <ul>
                            {
                                body.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))
                            }
                        </ul>
                }
            </div>
        </div>
    )
}

export default Toast
